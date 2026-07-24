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

      {/* Identity Block */}
      <div className="flex flex-col gap-4 rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
        <h3 className="text-xs font-black uppercase tracking-wider text-(--foreground)">
          Scientist Identity
        </h3>
        
        <div>
          <label htmlFor="title" className="mb-2 block text-xs font-black uppercase tracking-wider text-(--muted)">
            Custom Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            defaultValue={initialData.title || ''}
            placeholder="e.g. Research Chemist"
            maxLength={30}
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 text-sm font-bold text-(--foreground) outline-none transition focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="country" className="mb-2 block text-xs font-black uppercase tracking-wider text-(--muted)">
            Country / Region
          </label>
          <input
            id="country"
            name="country"
            type="text"
            defaultValue={initialData.country || ''}
            placeholder="e.g. Australia"
            maxLength={30}
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 text-sm font-bold text-(--foreground) outline-none transition focus:border-blue-500"
          />
          <div className="mt-4">
            <BlockToggle
              name="showCountry"
              label="Show Country on Profile"
              defaultChecked={initialData.privacy.showCountry}
            />
          </div>
        </div>

        <div className="border-t border-[var(--border)] pt-4 mt-2">
          <label htmlFor="yearLevel" className="mb-2 block text-xs font-black uppercase tracking-wider text-(--muted)">
            Academic Level
          </label>
          <select
            id="yearLevel"
            name="yearLevel"
            defaultValue={initialData.yearLevel || ''}
            className="w-full appearance-none rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 text-sm font-bold text-(--foreground) outline-none transition focus:border-blue-500"
          >
            <option value="">Select your year level...</option>
            <option value="Year 7">Year 7</option>
            <option value="Year 8">Year 8</option>
            <option value="Year 9">Year 9</option>
            <option value="Year 10">Year 10</option>
            <option value="Senior">Senior</option>
          </select>
          
          <div className="mt-4">
            <BlockToggle
              name="showYearLevel"
              label="Make Academic Level Public"
              defaultChecked={initialData.privacy.showYearLevel}
            />
          </div>
        </div>
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
        <div className="mt-4">
          <BlockToggle
            name="showLabNotes"
            label="Make Lab Notes Public"
            defaultChecked={initialData.privacy.showLabNotes}
          />
        </div>
      </div>

      {/* Game Stats Block */}
      <div className="flex flex-col gap-4 rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
        <h3 className="text-xs font-black uppercase tracking-wider text-(--foreground)">Game Stats Visibility</h3>
        
        <BlockToggle
          name="showTotalSyntheses"
          label="Show Total Syntheses Count"
          defaultChecked={initialData.privacy.showTotalSyntheses}
        />
        
        <BlockToggle
          name="showAccuracy"
          label="Show Answer Accuracy %"
          defaultChecked={initialData.privacy.showAccuracy}
        />
        
        <BlockToggle
          name="showCurrentStreak"
          label="Show Daily Play Streak"
          defaultChecked={initialData.privacy.showCurrentStreak}
        />
      </div>

      {/* Feedback State */}
      {state?.message && (
        <p
          role="status"
          className={`rounded-xl border p-3 text-xs font-bold ${
            state.success
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
