// src/components/profile/AccountDangerZone.tsx
'use client';

import { useActionState, useState } from 'react';
import { AlertTriangle, Download } from 'lucide-react';
import { deleteAccountAction, type AccountActionState } from '@/lib/actions/account-actions';

const CONFIRMATION_WORD = 'DELETE';
const initialState: AccountActionState = null;

export function AccountDangerZone() {
  const [state, formAction, isPending] = useActionState(deleteAccountAction, initialState);
  const [confirmation, setConfirmation] = useState('');
  const isConfirmed = confirmation === CONFIRMATION_WORD;

  return (
    <section
      aria-labelledby="account-data-heading"
      className="mx-auto flex w-full max-w-2xl flex-col gap-6 rounded-2xl border-2 border-(--border) bg-(--surface) p-6 shadow-md md:p-8"
    >
      <div className="border-b border-(--border) pb-4">
        <h2 id="account-data-heading" className="text-2xl font-black text-(--foreground)">
          Your Data
        </h2>
        <p className="mt-1 text-sm font-medium text-(--muted)">
          Download a copy of what ChemGames stores about you, or delete your account.
        </p>
      </div>

      {/* Export block */}
      <div className="flex flex-col gap-4 rounded-xl border border-(--border) bg-(--background) p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xs font-black uppercase tracking-wider text-(--foreground)">
            Download my data
          </h3>
          <p className="mt-1 text-sm font-medium text-(--muted)">
            A JSON file with your account details, profile, game sessions and progress.
          </p>
        </div>
        {/* A plain anchor (not <Link>) because the target is a file download, not a page. */}
        <a
          href="/account/export"
          download="chemgames-data.json"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-(--border) bg-(--surface) px-5 py-3 text-xs font-black uppercase tracking-wider text-(--foreground) shadow-sm transition hover:border-blue-500 hover:text-blue-500"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          Download my data
        </a>
      </div>

      {/* Delete block */}
      <form
        action={formAction}
        className="flex flex-col gap-4 rounded-xl border-2 border-rose-500/40 bg-rose-500/5 p-4"
      >
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" aria-hidden="true" />
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-rose-500">
              Delete account
            </h3>
            <p className="mt-1 text-sm font-medium text-(--muted)">
              This permanently and immediately removes your account, profile, scores, progress
              and leaderboard entries. It cannot be undone.
            </p>
          </div>
        </div>

        <div>
          <label
            htmlFor="delete-confirmation"
            className="mb-2 block text-xs font-black uppercase tracking-wider text-(--muted)"
          >
            Type {CONFIRMATION_WORD} to confirm
          </label>
          <input
            id="delete-confirmation"
            name="confirmation"
            type="text"
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            value={confirmation}
            onChange={(event) => setConfirmation(event.target.value)}
            placeholder={CONFIRMATION_WORD}
            className="w-full rounded-xl border border-(--border) bg-(--surface) p-3 text-sm font-bold text-(--foreground) outline-none transition focus:border-rose-500"
          />
        </div>

        {state?.message && (
          <p
            role="alert"
            className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 text-xs font-bold text-rose-500"
          >
            {state.message}
          </p>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!isConfirmed || isPending}
            className="cursor-pointer rounded-xl bg-rose-600 px-6 py-3 text-xs font-black uppercase tracking-wider text-white shadow-md transition-all duration-150 hover:bg-rose-500 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? 'Deleting...' : 'Delete my account'}
          </button>
        </div>
      </form>
    </section>
  );
}
