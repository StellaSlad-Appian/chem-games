-- supabase/migrations/20260919_create_collaborators.sql
--
-- The list of teachers who volunteered to help shape the site.
--
-- Why a table at all: the For Teachers page promises collaborators free access
-- to version 1.0 and version 2.0. Until now the only way to volunteer was the
-- feedback button, which lands in an inbox. An inbox is not a list, and a
-- promise made to people you cannot enumerate is a promise you cannot keep.
-- The whole point of this table is that "who do I owe 1.0 access to?" is one
-- SQL query.
--
-- What is different about this table, and why it is worth saying out loud:
-- **it holds directly identifying personal data.** Everything else this site
-- stores about a person is pseudonymous by construction — aliases are
-- generated and contain no real name — and the children's-data posture rests
-- on that. An email address with a school name beside it is not pseudonymous.
-- That is acceptable here because the people filling the form in are adults
-- volunteering deliberately, on consent they can withdraw, and the privacy
-- page describes the table, names consent as the basis, and gives a deletion
-- route that needs no account. Do not widen this table's purpose without
-- revisiting all three.
--
-- The write path is the one `20260914_feedback_rate_limit.sql` established,
-- for the same reason it was established: the open `with check (true)` policy
-- it replaced let anyone holding the public anon key insert anything.
--
--   * RLS is enabled with **no policies at all**, so PostgREST clients can
--     neither insert nor read. `public.submit_collaborator(...)` is the only
--     way in. It is SECURITY DEFINER, so it can count and insert while RLS
--     keeps clients out, and it therefore re-validates every input and sets
--     `user_id` from `auth.uid()` itself rather than trusting its caller.
--   * `client_hash` is a salted SHA-256 of the caller's IP, computed in the
--     server action. **The raw IP is never stored.**
--   * Indexes on (client_hash, updated_at desc) and (email) back the
--     rate-limit counts and the "have I already got this person?" lookup.
--   * Rate limits: at most 3 sign-ups per hour per signed-in user (or per
--     client hash when anonymous) and at most 10 per client hash per 24
--     hours. Lower than feedback's 5/20 because a person signs up once.
--   * `PT400` for invalid input, `PT429` for rate limiting; PostgREST maps a
--     `PTnnn` code to that HTTP status, so the server action can tell "your
--     email has a typo in it" from "slow down" without parsing a message.
--
-- Two decisions that are not in the feedback migration:
--
--   * **A unique index on `lower(email)`**, and an upsert rather than an
--     insert. A teacher who fills the form in twice — different browser, or
--     they forgot — should update their row, not become two rows that both
--     get emailed. `status` and `created_at` are deliberately *not* touched by
--     the upsert: a person already marked `contacted` does not revert to `new`
--     because they corrected their school name.
--   * **`updated_at`**, which the acceptance criteria do not ask for. It
--     exists because the rate limit counts rows and an upsert does not create
--     one: without it, the same address could be resubmitted without limit
--     forever, each submission slipping past a count that never moves. The
--     limits below count `updated_at`, so an update is throttled exactly like
--     an insert.
--
-- Every statement is idempotent so the file can be re-run from the Supabase
-- SQL editor.

create table if not exists public.collaborators (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  -- The only required field. Everything else helps me and costs them, so
  -- everything else may be null.
  email text not null check (char_length(email) between 3 and 254),

  name text check (char_length(name) <= 80),
  school text check (char_length(school) <= 120),
  country text check (char_length(country) <= 60),

  -- Free text, deliberately. School systems differ per locale and an enum
  -- would be wrong in four of them: "Year 9" is 3e in France, 3º de ESO in
  -- Spain, terza media in Italy, Klasse 9 in Germany, 8 класс in Russia.
  year_levels text check (char_length(year_levels) <= 120),

  subjects text check (char_length(subjects) <= 120),
  message text check (char_length(message) <= 1000),

  -- Which language they signed up in, so I write to them in it.
  locale text check (char_length(locale) <= 8),

  status text not null default 'new'
    check (status in ('new', 'contacted', 'active', 'declined')),

  -- Set server-side from auth.uid() by the function below, never from the
  -- client. Null is the normal case: a collaborator need not have an account.
  user_id uuid references auth.users (id) on delete set null,

  -- Salted SHA-256 of the caller's IP. Never the raw IP.
  client_hash text check (char_length(client_hash) <= 128)
);

-- Re-runnable on a table that predates a column, which is how the feedback
-- table grew its client_hash. Cheap, and it means this file stays the whole
-- description of the table rather than the first half of it.
alter table public.collaborators add column if not exists updated_at timestamptz not null default now();
alter table public.collaborators add column if not exists name text;
alter table public.collaborators add column if not exists school text;
alter table public.collaborators add column if not exists country text;
alter table public.collaborators add column if not exists year_levels text;
alter table public.collaborators add column if not exists subjects text;
alter table public.collaborators add column if not exists message text;
alter table public.collaborators add column if not exists locale text;
alter table public.collaborators add column if not exists client_hash text;

create index if not exists collaborators_client_hash_updated_at_idx
  on public.collaborators (client_hash, updated_at desc);

create index if not exists collaborators_email_idx
  on public.collaborators (email);

create index if not exists collaborators_user_id_updated_at_idx
  on public.collaborators (user_id, updated_at desc);

-- One row per person, case-insensitively: nobody types their address the same
-- way twice. This is what the upsert below infers its conflict target from, so
-- it has to exist before the function runs.
create unique index if not exists collaborators_email_lower_key
  on public.collaborators (lower(email));

create or replace function public.submit_collaborator(
  p_email text,
  p_name text,
  p_school text,
  p_country text,
  p_year_levels text,
  p_subjects text,
  p_message text,
  p_locale text,
  p_client_hash text
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
  v_email text := lower(btrim(coalesce(p_email, '')));
  v_name text := nullif(btrim(coalesce(p_name, '')), '');
  v_school text := nullif(btrim(coalesce(p_school, '')), '');
  v_country text := nullif(btrim(coalesce(p_country, '')), '');
  v_year_levels text := nullif(btrim(coalesce(p_year_levels, '')), '');
  v_subjects text := nullif(btrim(coalesce(p_subjects, '')), '');
  v_message text := nullif(btrim(coalesce(p_message, '')), '');
  v_locale text := nullif(btrim(coalesce(p_locale, '')), '');
  v_client_hash text := coalesce(p_client_hash, '');
  v_hourly_count integer;
  v_daily_count integer;
  v_id uuid;
begin
  -- Re-validate everything. This function is callable by anon directly, not
  -- only through the server action, so the server action's validation is a
  -- courtesy to the reader and this is the one that has to hold.
  --
  -- The email check is deliberately shape-only and permissive: one '@' with
  -- something either side, a dot in the domain, no whitespace, no angle
  -- brackets. A stricter pattern rejects real addresses, and the only thing
  -- that ever proves an address works is sending to it.
  if length(v_email) < 3
     or length(v_email) > 254
     or v_email !~ '^[^@[:space:]<>,;]+@[^@[:space:]<>,;]+\.[^@[:space:]<>,;]+$' then
    raise exception 'collaborator_invalid_email' using errcode = 'PT400';
  end if;

  if length(coalesce(v_name, '')) > 80
     or length(coalesce(v_school, '')) > 120
     or length(coalesce(v_country, '')) > 60
     or length(coalesce(v_year_levels, '')) > 120
     or length(coalesce(v_subjects, '')) > 120
     or length(coalesce(v_message, '')) > 1000 then
    raise exception 'collaborator_invalid_field' using errcode = 'PT400';
  end if;

  -- An unknown locale is not worth rejecting a sign-up over; it only decides
  -- which language I write back in, and I can ask. Drop it and carry on.
  if v_locale is not null and v_locale !~ '^[a-z]{2}(-[A-Za-z0-9]{2,8})?$' then
    v_locale := null;
  end if;

  if v_client_hash = '' or length(v_client_hash) > 128 then
    raise exception 'collaborator_invalid_client' using errcode = 'PT400';
  end if;

  -- Serialise concurrent submissions from the same client so two requests
  -- racing past the count cannot both slip under the limit.
  perform pg_advisory_xact_lock(hashtext(v_client_hash));

  -- Hourly limit: per signed-in user when authenticated, otherwise per client.
  if v_user_id is not null then
    select count(*) into v_hourly_count
      from public.collaborators
     where user_id = v_user_id
       and updated_at > now() - interval '1 hour';
  else
    select count(*) into v_hourly_count
      from public.collaborators
     where client_hash = v_client_hash
       and updated_at > now() - interval '1 hour';
  end if;

  if v_hourly_count >= 3 then
    raise exception 'collaborator_rate_limited'
      using errcode = 'PT429', hint = 'Hourly collaborator sign-up limit reached.';
  end if;

  -- Daily limit: always per client hash, whether or not the caller signed in.
  -- A staffroom behind one NAT is the case this has to survive, which is why
  -- 10 rather than 3.
  select count(*) into v_daily_count
    from public.collaborators
   where client_hash = v_client_hash
     and updated_at > now() - interval '24 hours';

  if v_daily_count >= 10 then
    raise exception 'collaborator_rate_limited'
      using errcode = 'PT429', hint = 'Daily collaborator sign-up limit reached.';
  end if;

  insert into public.collaborators (
    email, name, school, country, year_levels, subjects, message, locale,
    user_id, client_hash
  )
  values (
    v_email, v_name, v_school, v_country, v_year_levels, v_subjects, v_message,
    v_locale, v_user_id, v_client_hash
  )
  on conflict (lower(email)) do update set
    -- Last answer wins for the content, including back to null: a teacher who
    -- clears their school name meant to clear it.
    name = excluded.name,
    school = excluded.school,
    country = excluded.country,
    year_levels = excluded.year_levels,
    subjects = excluded.subjects,
    message = excluded.message,
    locale = excluded.locale,
    client_hash = excluded.client_hash,
    -- Only ever fills a gap. A row that already carries a user_id keeps it, so
    -- signing out and resubmitting cannot detach a sign-up from its account.
    user_id = coalesce(collaborators.user_id, excluded.user_id),
    updated_at = now()
    -- `status` and `created_at` are absent on purpose: someone already marked
    -- `contacted` must not revert to `new` because they fixed a typo.
  returning id into v_id;

  return v_id;
end;
$$;

revoke all on function public.submit_collaborator(
  text, text, text, text, text, text, text, text, text
) from public;
grant execute on function public.submit_collaborator(
  text, text, text, text, text, text, text, text, text
) to anon, authenticated;

-- The RPC above is the only write path. RLS is enabled and, with no policies
-- at all, PostgREST clients can neither insert nor read rows — including the
-- collaborator's own, which is the point: this list is not something the site
-- ever renders. A deletion request arrives by email and is served by hand.
alter table public.collaborators enable row level security;
