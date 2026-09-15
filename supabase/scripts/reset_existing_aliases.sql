-- ONE-OFF data fix. Run by hand in the Supabase SQL editor, once, AFTER
-- supabase/migrations/20260914_profile_privacy.sql. It lives outside
-- supabase/migrations on purpose: it rewrites data and must not be replayed.
--
-- Why: until that migration the signup trigger copied the Google full_name or
-- the part of the email address before the "@" into profiles.alias, and alias
-- is shown on the public leaderboard. The product is used by school students,
-- so every existing alias is replaced with a neutral generated one such as
-- "Curious Argon 4821", using the same generator new accounts now get
-- (public.generate_profile_alias). Users can pick a new alias afterwards on
-- /profile/edit.
--
-- Rows are updated one statement at a time so each generator call sees the
-- aliases already assigned earlier in this run.

do $$
declare
  p record;
  changed integer := 0;
begin
  for p in select id from public.profiles order by created_at loop
    update public.profiles
    set alias = public.generate_profile_alias(),
        updated_at = now()
    where id = p.id;
    changed := changed + 1;
  end loop;
  raise notice 'Reset % profile alias(es).', changed;
end
$$;

-- Every alias now satisfies the format check added NOT VALID by the migration,
-- so it can be validated (a no-op if it has already been validated).
alter table public.profiles validate constraint profiles_alias_format;
