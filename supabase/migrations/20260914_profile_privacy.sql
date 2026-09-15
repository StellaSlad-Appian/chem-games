-- Profile privacy: neutral aliases, owner-only reads, column-level writes,
-- and stats aggregation in the database.
--
-- Applied by hand in the Supabase SQL editor. Every statement is idempotent
-- (if not exists / create or replace / drop ... if exists), so re-running the
-- whole file is safe. After it has run once, also run
-- supabase/scripts/reset_existing_aliases.sql (a one-off) and then validate
-- the alias constraint as described in section 3.
--
-- What changes and why (the product is used by Year 7-10 students):
--
-- 1. profiles.max_streak and profiles.last_played_at are added. The server
--    action read and wrote both, but no migration created them, so on a schema
--    built from these files the profile stats update silently never ran.
-- 2. The signup trigger stops copying the Google full_name or the part of the
--    email before the "@" into alias. alias is shown on the public leaderboard,
--    so real names and email prefixes must never become public by default.
--    New accounts get a neutral random alias such as "Curious Argon 4821"; the
--    user can change it on /profile/edit.
-- 3. alias gains a format check (2-40 characters, no "@", no leading or
--    trailing whitespace), added NOT VALID so existing rows do not block the
--    migration.
-- 4. The "Profiles are publicly readable" policy let anyone holding the anon
--    key read every column of every profile (lab notes, country, year level,
--    accuracy, streak, account type...) regardless of the show_* toggles, which
--    were only honoured in the UI. A profile is now readable only by its owner.
--    Other users' profiles are read through the public_profiles view, which
--    applies the toggles in SQL and never exposes account_type, is_active,
--    updated_at or the toggles themselves.
-- 5. UPDATE is granted column by column. The row policy stopped users editing
--    other people's rows, but a signed-in user could still set their own
--    account_type = 'admin', is_active, current_streak, accuracy,
--    total_syntheses or badges through PostgREST.
-- 6. Stats aggregation (daily streak, max_streak, running-average accuracy,
--    total_syntheses, last_played_at) moves from the server action into an
--    AFTER INSERT trigger on game_sessions, which after (5) is the only path
--    that can write those columns. game_sessions gains an accuracy column so
--    the per-run value is stored too.

-- ---------------------------------------------------------------------------
-- 1. Columns the stats logic needs
-- ---------------------------------------------------------------------------

alter table public.profiles
  add column if not exists max_streak integer not null default 0 check (max_streak >= 0),
  add column if not exists last_played_at timestamptz;

-- ---------------------------------------------------------------------------
-- 2. Neutral random aliases for new accounts
-- ---------------------------------------------------------------------------

-- "<Adjective> <Element> <4 digits>", e.g. "Curious Argon 4821". Retries a few
-- times if the alias is already taken. SECURITY DEFINER because the owner-only
-- select policy below would otherwise hide other rows from the existence
-- check. Not derived from the email or OAuth metadata in any way.
create or replace function public.generate_profile_alias()
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  adjectives constant text[] := array[
    'Curious', 'Bright', 'Steady', 'Swift', 'Clever', 'Quiet', 'Bold', 'Gentle',
    'Keen', 'Lucky', 'Nimble', 'Patient', 'Sharp', 'Calm', 'Eager', 'Merry',
    'Witty', 'Brave', 'Cosmic', 'Radiant', 'Stellar', 'Tidy', 'Vivid', 'Zesty'
  ];
  elements constant text[] := array[
    'Hydrogen', 'Helium', 'Lithium', 'Boron', 'Carbon', 'Nitrogen', 'Oxygen',
    'Fluorine', 'Neon', 'Sodium', 'Magnesium', 'Silicon', 'Chlorine', 'Argon',
    'Potassium', 'Calcium', 'Titanium', 'Iron', 'Cobalt', 'Nickel', 'Copper',
    'Zinc', 'Krypton', 'Silver', 'Tin', 'Iodine', 'Xenon', 'Platinum', 'Gold', 'Radon'
  ];
  candidate text;
begin
  for attempt in 1..10 loop
    candidate := adjectives[1 + floor(random() * array_length(adjectives, 1))::int]
      || ' ' || elements[1 + floor(random() * array_length(elements, 1))::int]
      || ' ' || lpad(floor(random() * 10000)::int::text, 4, '0');

    if not exists (select 1 from public.profiles where alias = candidate) then
      return candidate;
    end if;
  end loop;

  -- 24 x 30 x 10000 = 7.2 million combinations, so ten collisions in a row is
  -- practically impossible. alias has no unique constraint, so a duplicate
  -- would be cosmetic rather than an error.
  return candidate;
end;
$$;

-- Nothing in the app needs to call the generator over the API.
revoke execute on function public.generate_profile_alias() from public, anon, authenticated;

-- Replaces the version from 202607180001_create_profiles.sql, which used
-- coalesce(raw_user_meta_data ->> 'full_name', split_part(email, '@', 1)).
-- The on_auth_user_created trigger created there keeps pointing at this
-- function, so it does not need to be recreated.
create or replace function public.create_profile_for_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, alias)
  values (new.id, public.generate_profile_alias())
  on conflict (id) do nothing;
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- 3. Alias format check
-- ---------------------------------------------------------------------------

-- 2-40 characters, no "@" (so an email address can never be an alias), no
-- leading or trailing whitespace. Added NOT VALID so rows created by the old
-- trigger (e.g. "Paul Pallaghy", "stella.slad") do not break the migration;
-- new inserts and updates are checked immediately. Guarded by a lookup in
-- pg_constraint rather than drop/re-add so re-running this file never turns a
-- validated constraint back into a NOT VALID one.
--
-- To validate it later (after supabase/scripts/reset_existing_aliases.sql has
-- rewritten the old aliases):
--   alter table public.profiles validate constraint profiles_alias_format;
do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'profiles_alias_format'
      and conrelid = 'public.profiles'::regclass
  ) then
    alter table public.profiles
      add constraint profiles_alias_format check (
        char_length(alias) between 2 and 40
        and position('@' in alias) = 0
        and alias !~ '^\s'
        and alias !~ '\s$'
      ) not valid;
  end if;
end
$$;

-- ---------------------------------------------------------------------------
-- 4. Owner-only reads
-- ---------------------------------------------------------------------------

drop policy if exists "Profiles are publicly readable" on public.profiles;
drop policy if exists "Users can read their own profile" on public.profiles;
create policy "Users can read their own profile"
  on public.profiles for select using ((select auth.uid()) = id);

-- The leaderboard_entries view (security_invoker = false) still reads alias as
-- its owner, so leaderboards are unaffected.

-- ---------------------------------------------------------------------------
-- 5. public_profiles: the privacy-filtered read path for other users
-- ---------------------------------------------------------------------------

-- Same pattern as leaderboard_entries: the view runs as its owner so callers
-- can read it without access to the protected table. security_barrier stops a
-- caller's own predicates from being evaluated before the is_active filter.
-- Toggle-gated columns come back null when the owner has them switched off.
create or replace view public.public_profiles
with (security_invoker = false, security_barrier = true)
as
select
  id,
  alias,
  title,
  favorite_element,
  favorite_compound,
  badges,
  case when show_country then country end as country,
  case when show_year_level then year_level end as year_level,
  case when show_lab_notes then lab_notes end as lab_notes,
  case when show_total_syntheses then total_syntheses end as total_syntheses,
  case when show_accuracy then accuracy end as accuracy,
  case when show_current_streak then current_streak end as current_streak,
  case when show_joined_date then created_at end as created_at
from public.profiles
where is_active;

grant select on public.public_profiles to anon, authenticated;

comment on view public.public_profiles is
  'The only way to read other users'' profiles. public.profiles itself is readable only by its owner. '
  'The view runs as its owner and applies the show_* privacy toggles in SQL (a hidden column is null), '
  'so any public profile page must read from here. Never add account_type, is_active, updated_at or '
  'the show_* flags to this view.';

-- ---------------------------------------------------------------------------
-- 6. Column-level UPDATE grants
-- ---------------------------------------------------------------------------

-- Revoking the table-level privilege also clears any column privileges, so
-- this pair is safe to re-run. The row-level policy
-- "Users can update their profile" is kept and still applies on top.
revoke update on public.profiles from anon, authenticated;
grant update (
  alias,
  title,
  country,
  year_level,
  lab_notes,
  favorite_element,
  favorite_compound,
  show_lab_notes,
  show_total_syntheses,
  show_joined_date,
  show_year_level,
  show_country,
  show_accuracy,
  show_current_streak,
  updated_at
) on public.profiles to authenticated;

-- ---------------------------------------------------------------------------
-- 7. Stats aggregation in the database
-- ---------------------------------------------------------------------------

alter table public.game_sessions
  add column if not exists accuracy integer
    check (accuracy is null or (accuracy between 0 and 100));

-- Reproduces the "Update User Profile Aggregates" block that used to live in
-- src/lib/actions/game-actions.ts. SECURITY DEFINER because the inserting user
-- no longer holds UPDATE on the stat columns. The game_sessions insert policy
-- guarantees new.user_id is the caller, so only the caller's profile changes.
--
-- Streak days are UTC calendar days (the app server also ran in UTC): playing
-- again the same day keeps the streak, playing on the next day extends it,
-- any longer gap restarts it at 1.
create or replace function public.apply_game_session_to_profile()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  played_at constant timestamptz := now();
  today constant date := (played_at at time zone 'UTC')::date;
  prev_streak integer;
  prev_max_streak integer;
  prev_accuracy integer;
  prev_total integer;
  prev_played_at timestamptz;
  last_day date;
  next_streak integer;
  next_accuracy integer;
begin
  select current_streak, max_streak, accuracy, total_syntheses, last_played_at
    into prev_streak, prev_max_streak, prev_accuracy, prev_total, prev_played_at
  from public.profiles
  where id = new.user_id
  for update;

  if not found then
    -- Account without a profile row (created before the signup trigger):
    -- nothing to aggregate, and the session row itself is still saved.
    return new;
  end if;

  last_day := (prev_played_at at time zone 'UTC')::date;
  if last_day is null then
    next_streak := 1;
  elsif last_day = today then
    next_streak := greatest(coalesce(prev_streak, 0), 1);
  elsif last_day = today - 1 then
    next_streak := coalesce(prev_streak, 0) + 1;
  else
    next_streak := 1;
  end if;

  -- Running average. A missing (or 0) stored value is replaced outright,
  -- otherwise the new run is averaged with the stored value.
  next_accuracy := prev_accuracy;
  if new.accuracy is not null then
    if prev_accuracy is null or prev_accuracy = 0 then
      next_accuracy := new.accuracy;
    else
      next_accuracy := round((prev_accuracy + new.accuracy) / 2.0)::integer;
    end if;
  end if;

  update public.profiles
  set current_streak = next_streak,
      max_streak = greatest(coalesce(prev_max_streak, 0), next_streak),
      accuracy = next_accuracy,
      total_syntheses = coalesce(prev_total, 0)
        + case when new.outcome = 'victory' then 1 else 0 end,
      last_played_at = played_at,
      updated_at = played_at
  where id = new.user_id;

  return new;
end;
$$;

drop trigger if exists game_sessions_apply_to_profile on public.game_sessions;
create trigger game_sessions_apply_to_profile
  after insert on public.game_sessions
  for each row execute procedure public.apply_game_session_to_profile();
