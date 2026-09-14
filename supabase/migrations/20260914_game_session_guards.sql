-- supabase/migrations/20260914_game_session_guards.sql
--
-- Server-side guards for game_sessions.
--
-- Why: recordGameSession() now validates every payload against
-- GAME_SESSION_LIMITS (src/core-engine/utils/session-validation.ts), but the
-- RLS insert policy still lets any signed-in user insert any row for their own
-- user_id straight through PostgREST with the anon key and their JWT. The same
-- ceilings are therefore enforced here, where they cannot be skipped.
--
-- What changes
--   * public.games gains max_score / max_level, seeded for every game in the
--     catalogue. Keep the values in sync with GAME_SESSION_LIMITS (a unit test
--     compares the two).
--   * A BEFORE INSERT trigger on public.game_sessions
--       - stamps completed_at = now() (leaderboard ties are broken by it, so
--         the client must not choose it);
--       - pins user_id to auth.uid() for end-user inserts;
--       - refuses more than 30 sessions per user in 10 minutes;
--       - refuses duration_seconds < 1 unless the run was abandoned;
--       - refuses score / level_reached above the game's ceiling.
--
-- Notes
--   * The function is not security definer, so the games lookup runs under the
--     caller's RLS. "Active games are publicly readable" hides inactive rows,
--     which means a session for an inactive (unlaunched) game is rejected too.
--   * Missing limits fail closed: a new game needs values here AND an entry in
--     GAME_SESSION_LIMITS before its sessions are accepted.
--   * Re-importing historical rows (e.g. game_sessions_rows.sql) through the
--     SQL editor will hit these guards. Disable the trigger first:
--       alter table public.game_sessions disable trigger game_sessions_guard;
--     and enable it again afterwards.
--
-- Safe to re-run.

alter table public.games add column if not exists max_score integer;
alter table public.games add column if not exists max_level integer;

-- Keep in sync with GAME_SESSION_LIMITS in src/core-engine/utils/session-validation.ts.
-- Rows are (id, max_score, max_level); only games already in the catalogue are updated.
update public.games as g
set max_score = v.max_score,
    max_level = v.max_level
from (values
  ('acid-classification', 15000, 5),
  ('formula-blaster', 45000, 5),
  ('neutralise', 42000, 20),
  ('reaction-balancer', 18000, 60),
  ('bond-builder', 20000, 10)
) as v(id, max_score, max_level)
where g.id = v.id;

create or replace function public.guard_game_session_insert()
returns trigger
language plpgsql
set search_path = public
as $$
declare
  caller_id uuid := auth.uid();
  game_max_score integer;
  game_max_level integer;
  recent_sessions integer;
begin
  -- The client never chooses the timestamp.
  new.completed_at := now();

  -- Belt and braces on top of the RLS policy: an end user's row is always their own.
  if caller_id is not null then
    new.user_id := caller_id;
  end if;

  select count(*) into recent_sessions
  from public.game_sessions
  where user_id = new.user_id
    and completed_at > now() - interval '10 minutes';
  if recent_sessions >= 30 then
    raise exception 'Too many sessions recorded recently';
  end if;

  if coalesce(new.duration_seconds, 0) < 1 and new.outcome <> 'abandoned' then
    raise exception 'Session duration too short';
  end if;

  select max_score, max_level into game_max_score, game_max_level
  from public.games
  where id = new.game_id;
  if game_max_score is null or game_max_level is null then
    raise exception 'No session limits for game %', new.game_id;
  end if;
  if new.score > game_max_score then
    raise exception 'Score exceeds the limit for game %', new.game_id;
  end if;
  if new.level_reached > game_max_level then
    raise exception 'Level exceeds the limit for game %', new.game_id;
  end if;

  return new;
end;
$$;

drop trigger if exists game_sessions_guard on public.game_sessions;
create trigger game_sessions_guard
  before insert on public.game_sessions
  for each row execute procedure public.guard_game_session_insert();
