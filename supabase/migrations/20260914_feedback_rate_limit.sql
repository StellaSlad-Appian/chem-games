-- supabase/migrations/20260914_feedback_rate_limit.sql
--
-- Harden the public.feedback table against flooding.
--
-- Before this migration the table had an insert policy of `with check (true)`,
-- so anyone holding the public anon key could insert unlimited rows straight
-- through PostgREST, with any `type`/`message` and no record of who sent it.
--
-- What changes:
--   * `client_hash text` is added. The server action stores a salted SHA-256
--     of the caller's IP here (never the raw IP) so anonymous submissions can
--     be throttled per client.
--   * Indexes on (client_hash, created_at desc) and (user_id, created_at desc)
--     back the rate-limit counts.
--   * `public.submit_feedback(...)` becomes the only write path. It runs as
--     SECURITY DEFINER so it can count and insert while RLS keeps clients out;
--     it re-validates the input, enforces at most 5 submissions per hour per
--     signed-in user (or per client hash when anonymous) and at most 20 per
--     client hash per 24 hours, and records `user_id = auth.uid()` itself so
--     the caller cannot spoof it.
--   * The open insert policy is dropped. RLS stays enabled with no client
--     policies, so direct inserts and selects via PostgREST are denied.
--
-- Rate-limit rejections raise SQLSTATE 'PT429' and invalid input raises
-- 'PT400'; PostgREST maps `PTnnn` codes to that HTTP status, and the server
-- action checks the code to show a generic "too many submissions" message.
--
-- Every statement is idempotent so the file can be re-run safely from the
-- Supabase SQL editor.

alter table public.feedback
  add column if not exists client_hash text;

create index if not exists feedback_client_hash_created_at_idx
  on public.feedback (client_hash, created_at desc);

create index if not exists feedback_user_id_created_at_idx
  on public.feedback (user_id, created_at desc);

create or replace function public.submit_feedback(
  p_type text,
  p_message text,
  p_page_url text,
  p_client_hash text
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
  v_message text := btrim(coalesce(p_message, ''));
  v_page_url text := coalesce(p_page_url, '/');
  v_client_hash text := coalesce(p_client_hash, '');
  v_hourly_count integer;
  v_daily_count integer;
  v_id uuid;
begin
  -- Re-validate everything: the function is callable by anon directly, not
  -- only through the server action.
  if p_type is null or p_type not in ('bug', 'chemistry', 'feature') then
    raise exception 'feedback_invalid_type' using errcode = 'PT400';
  end if;

  if length(v_message) < 1 or length(v_message) > 2000 then
    raise exception 'feedback_invalid_message' using errcode = 'PT400';
  end if;

  if v_client_hash = '' or length(v_client_hash) > 128 then
    raise exception 'feedback_invalid_client' using errcode = 'PT400';
  end if;

  -- Keep only site-relative paths (a single leading '/', so neither '//host'
  -- nor '/\host'); anything else collapses to '/'. chr(92) is a backslash,
  -- spelled out so the literal does not depend on standard_conforming_strings.
  if v_page_url = ''
     or length(v_page_url) > 300
     or left(v_page_url, 1) <> '/'
     or left(v_page_url, 2) in ('//', '/' || chr(92)) then
    v_page_url := '/';
  end if;

  -- Serialise concurrent submissions from the same client so two requests
  -- racing past the count cannot both slip under the limit.
  perform pg_advisory_xact_lock(hashtext(v_client_hash));

  -- Hourly limit: per signed-in user when authenticated, otherwise per client.
  if v_user_id is not null then
    select count(*) into v_hourly_count
      from public.feedback
     where user_id = v_user_id
       and created_at > now() - interval '1 hour';
  else
    select count(*) into v_hourly_count
      from public.feedback
     where client_hash = v_client_hash
       and created_at > now() - interval '1 hour';
  end if;

  if v_hourly_count >= 5 then
    raise exception 'feedback_rate_limited'
      using errcode = 'PT429', hint = 'Hourly feedback limit reached.';
  end if;

  -- Daily limit: always per client hash, whether or not the caller signed in.
  select count(*) into v_daily_count
    from public.feedback
   where client_hash = v_client_hash
     and created_at > now() - interval '24 hours';

  if v_daily_count >= 20 then
    raise exception 'feedback_rate_limited'
      using errcode = 'PT429', hint = 'Daily feedback limit reached.';
  end if;

  insert into public.feedback (type, message, page_url, user_id, client_hash)
  values (p_type, v_message, v_page_url, v_user_id, v_client_hash)
  returning id into v_id;

  return v_id;
end;
$$;

revoke all on function public.submit_feedback(text, text, text, text) from public;
grant execute on function public.submit_feedback(text, text, text, text) to anon, authenticated;

-- The RPC above is now the only write path. RLS stays enabled and, with no
-- remaining policies, PostgREST clients can neither insert nor read rows.
alter table public.feedback enable row level security;
drop policy if exists "Anyone can submit feedback" on public.feedback;
