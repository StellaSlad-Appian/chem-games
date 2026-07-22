// src/components/profile/EditProfileForm.tsx
'use client';

import { useActionState } from 'react';
import { updateProfileAction, type ProfileActionState } from '@/lib/actions/profile-actions';
import { BlockToggle } from '@/components/ui/BlockToggle';
import type { UserProfile } from '@/core-engine/types/general';

interface EditProfileFormProps {
  initialData: UserProfile;
}

const initialState: ProfileActionState = null;

export function EditProfileForm({ initialData }: EditProfileFormProps) {
  const [state, formAction, isPending] = useActionState(updateProfileAction, initialState);

  return (
    <form
      action={formAction}
      className="mx-auto flex w-full max-w-2xl flex-col gap-6 rounded-2xl border-2 border-[var(--border)] bg-[var(--surface)] p-6 shadow-md md:p-8"
    >
      <div className="border-b border-[var(--border)] pb-4">
        <h2 className="text-2xl font-black text-(--foreground)">Configure Equipment</h2>
        <p className="mt-1 text-sm font-medium text-(--muted)">
          Customize your laboratory preferences and public stats visibility.
        </p>
      </div>

      {/* Lab Notes Block */}
      <div className="flex flex-col gap-3 rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
        <label htmlFor="labNotes" className="text-xs font-black uppercase tracking-wider text-(--foreground)">
          Lab Notes (Bio)
        </label>
        <textarea
          id="labNotes"
          name="labNotes"
          defaultValue={initialData.labNotes}
          rows={3}
          maxLength={500}
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 text-sm font-bold text-(--foreground) outline-none transition focus:border-blue-500"
        />
        <div className="mt-2">
          <BlockToggle
            name="showLabNotes"
            label="Make Lab Notes Public"
            defaultChecked={initialData.privacy.showLabNotes}
          />
        </div>
      </div>

      {/* Game Stats Block */}
      <div className="flex flex-col gap-3 rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
        <h3 className="text-xs font-black uppercase tracking-wider text-(--foreground)">Game Stats</h3>
        <BlockToggle
          name="showTotalSyntheses"
          label="Show Total Syntheses Count"
          defaultChecked={initialData.privacy.showTotalSyntheses}
        />
      </div>

      {/* Feedback State */}
      {state?.message && (
        <p
          role="status"
          className={`rounded-xl border p-3 text-xs font-bold ${
            state.status === 'success'
              ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500'
              : 'border-rose-500/20 bg-rose-500/10 text-rose-500'
          }`}
        >
          {state.message}
        </p>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isPending}
        className="mt-2 rounded-xl bg-blue-500 p-4 text-xs font-black uppercase tracking-wider text-white shadow-md transition hover:bg-blue-600 disabled:opacity-60"
      >
        {isPending ? 'Saving...' : 'Save Configuration'}
      </button>
    </form>
  );
}