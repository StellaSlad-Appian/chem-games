// src/lib/actions/account-actions.ts
'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export type AccountActionState = {
  status: 'error';
  message: string;
} | null;

const CONFIRMATION_WORD = 'DELETE';

/**
 * Permanently deletes the signed-in user's account.
 *
 * Calls the `delete_own_account()` database function (see
 * supabase/migrations/20260914_account_deletion.sql), which removes the row in
 * auth.users; profiles, game_sessions and game_progress cascade from it and
 * feedback.user_id is set to null. On success the session is signed out and the
 * user is sent to the home page.
 */
export async function deleteAccountAction(
  _prevState: AccountActionState,
  formData: FormData
): Promise<AccountActionState> {
  if (formData.get('confirmation') !== CONFIRMATION_WORD) {
    return {
      status: 'error',
      message: `Type ${CONFIRMATION_WORD} to confirm you want to delete your account.`,
    };
  }

  try {
    const supabase = await createClient();

    if (!supabase) {
      return {
        status: 'error',
        message: 'Account deletion is not available right now. Please try again later.',
      };
    }

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return {
        status: 'error',
        message: 'Please log in again before deleting your account.',
      };
    }

    const { error: deleteError } = await supabase.rpc('delete_own_account');

    if (deleteError) {
      console.error('Account deletion failed:', deleteError);
      return {
        status: 'error',
        message: 'We could not delete your account. Please try again later.',
      };
    }

    // The account is already gone at this point. Clearing the session cookies
    // can still fail (the auth server no longer knows the user), but the stale
    // cookie is useless either way, so log and carry on to the redirect.
    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) {
      console.error('Sign-out after account deletion failed:', signOutError);
    }
  } catch (err) {
    console.error('Unexpected error during account deletion:', err);
    return {
      status: 'error',
      message: 'We could not delete your account. Please try again later.',
    };
  }

  // redirect() throws by design, so it must stay outside the try/catch above.
  redirect('/?account=deleted');
}
