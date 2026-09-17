// src/lib/actions/account-actions.ts
'use server';

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getRequestDictionary, getRequestLocale } from '@/i18n/server';
import { localizePath } from '@/i18n/routing';

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
  const t = await getRequestDictionary();

  // CONFIRMATION_WORD stays 'DELETE' in every locale: it is a literal the
  // reader types and this action compares byte for byte. Translating it would
  // mean the word shown and the word checked could drift apart on a
  // destructive, irreversible action.
  if (formData.get('confirmation') !== CONFIRMATION_WORD) {
    return {
      status: 'error',
      message: t.serverMessages.deleteConfirmRequired.replace('{word}', CONFIRMATION_WORD),
    };
  }

  try {
    const supabase = await createClient();

    if (!supabase) {
      return {
        status: 'error',
        message: t.serverMessages.deleteUnavailable,
      };
    }

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return {
        status: 'error',
        message: t.serverMessages.deleteLoginRequired,
      };
    }

    const { error: deleteError } = await supabase.rpc('delete_own_account');

    if (deleteError) {
      console.error('Account deletion failed:', deleteError);
      return {
        status: 'error',
        message: t.serverMessages.deleteFailed,
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
      message: t.serverMessages.deleteFailed,
    };
  }

  // redirect() throws by design, so it must stay outside the try/catch above.
  redirect(`${localizePath('/', await getRequestLocale())}?account=deleted`);
}
