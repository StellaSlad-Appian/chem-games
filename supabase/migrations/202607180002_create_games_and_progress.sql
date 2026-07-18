-- Game catalogue, player progress, and completed-game records.
-- The current game IDs match the routes in src/app/games.

create table if not exists public.games (
  id text primary key check (id ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  title text not null check (char_length(title) between 1 and 100),
  description text not null default '' check (char_length(description) <= 500),
  icon text not null default '🧪' check (char_length(icon) <= 16),
  theme_color text not null default '#3b82f6' check (theme_color ~ '^#[0-9A-Fa-f]{6}$'),
  is_active boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.game_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  game_id text not null references public.games(id) on delete restrict,
  highest_score integer not null default 0 check (highest_score >= 0),
  highest_level integer not null default 1 check (highest_level >= 1),
  last_played_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, game_id)
);

create table if not exists public.game_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  game_id text not null references public.games(id) on delete restrict,
  score integer not null check (score >= 0),
  level_reached integer not null default 1 check (level_reached >= 1),
  outcome text not null check (outcome in ('victory', 'failed', 'abandoned')),
  duration_seconds integer check (duration_seconds is null or duration_seconds >= 0),
  completed_at timestamptz not null default now()
);

create index if not exists game_progress_game_id_idx
  on public.game_progress (game_id);
create index if not exists game_sessions_user_id_completed_at_idx
  on public.game_sessions (user_id, completed_at desc);
create index if not exists game_sessions_leaderboard_idx
  on public.game_sessions (game_id, score desc, completed_at asc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists games_set_updated_at on public.games;
create trigger games_set_updated_at
  before update on public.games
  for each row execute procedure public.set_updated_at();

drop trigger if exists game_progress_set_updated_at on public.game_progress;
create trigger game_progress_set_updated_at
  before update on public.game_progress
  for each row execute procedure public.set_updated_at();

alter table public.games enable row level security;
alter table public.game_progress enable row level security;
alter table public.game_sessions enable row level security;

create policy "Active games are publicly readable"
  on public.games for select using (is_active);

create policy "Users can read their own progress"
  on public.game_progress for select using ((select auth.uid()) = user_id);
create policy "Users can create their own progress"
  on public.game_progress for insert with check ((select auth.uid()) = user_id);
create policy "Users can update their own progress"
  on public.game_progress for update
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Users can read their own game sessions"
  on public.game_sessions for select using ((select auth.uid()) = user_id);
create policy "Users can record their own game sessions"
  on public.game_sessions for insert with check ((select auth.uid()) = user_id);

-- Public leaderboard data intentionally exposes only a player's alias and best score,
-- not their user ID or full session history. The view runs as its owner so visitors can
-- read leaderboard entries without access to the protected source tables.
create or replace view public.leaderboard_entries
with (security_invoker = false)
as
with player_bests as (
  select
    sessions.game_id,
    profiles.alias,
    sessions.score,
    sessions.completed_at,
    row_number() over (
      partition by sessions.game_id, sessions.user_id
      order by sessions.score desc, sessions.completed_at asc
    ) as player_rank
  from public.game_sessions as sessions
  join public.profiles as profiles on profiles.id = sessions.user_id
  where sessions.outcome = 'victory'
),
best_scores as (
  select game_id, alias, score, completed_at
  from player_bests
  where player_rank = 1
)
select
  game_id,
  alias,
  score,
  completed_at,
  rank() over (partition by game_id order by score desc, completed_at asc) as global_rank
from best_scores;

grant select on public.leaderboard_entries to anon, authenticated;

insert into public.games (id, title, description, icon, theme_color, display_order)
values
  ('acid-classification', 'Acid or Base?', 'Sort compounds as acids, bases, or neutral.', '⚗️', '#c084fc', 1),
  ('formula-blaster', 'Formula Blaster', 'Identify chemical formulas before time runs out.', '🧪', '#60a5fa', 2),
  ('neutralise', 'Neutralise!', 'Neutralise incoming ions with the right counter-ion.', '☄️', '#34d399', 3)
on conflict (id) do update set
  title = excluded.title,
  description = excluded.description,
  icon = excluded.icon,
  theme_color = excluded.theme_color,
  display_order = excluded.display_order;
