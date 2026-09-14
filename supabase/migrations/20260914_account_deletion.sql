-- supabase/migrations/20260914_account_deletion.sql
--
-- Self-service account deletion.
--
-- What changes:
--   Adds public.delete_own_account(), a SECURITY DEFINER function that deletes
--   the calling user's own row from auth.users. Only the `authenticated` role may
--   execute it, and it refuses to run without a session (auth.uid() is null).
--
-- Why:
--   The app lets a signed-in player delete their own account from
--   /profile/edit (see src/lib/actions/account-actions.ts, which calls
--   `supabase.rpc('delete_own_account')`). Deleting from auth.users needs
--   elevated rights, and this function is the standard Supabase pattern for
--   self-service deletion without shipping a service-role key to the web app.
--
-- What is removed:
--   Existing foreign keys cascade from auth.users, so one delete removes:
--     - public.profiles       (id       -> auth.users on delete cascade)
--     - public.game_sessions  (user_id  -> auth.users on delete cascade)
--     - public.game_progress  (user_id  -> auth.users on delete cascade)
--   and public.feedback keeps its rows but sets user_id to null
--     (user_id -> auth.users on delete set null), so feedback is anonymised.
--   The leaderboard_entries view joins game_sessions to profiles, so the
--   player's leaderboard entries disappear with those rows.
--
-- Fallback:
--   If the project's `postgres` role is not allowed to delete from auth.users
--   (some managed setups restrict the auth schema), this function will raise a
--   permission error. The fallback in that case is a Supabase Edge Function that
--   uses the service-role key and auth.admin.deleteUser(). That is NOT
--   implemented here.
--
-- Safe to re-run: uses create or replace, and grants/revokes are idempotent.

create or replace function public.delete_own_account()
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then
    raise exception 'not authenticated';
  end if;

  delete from auth.users where id = auth.uid();
end
$$;

revoke all on function public.delete_own_account() from public, anon;
grant execute on function public.delete_own_account() to authenticated;
