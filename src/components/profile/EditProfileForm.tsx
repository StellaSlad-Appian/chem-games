// src/components/profile/EditProfileForm.tsx
'use client';

import { useActionState } from 'react';
import { LocaleLink } from '@/components/layout/LocaleLink';
import { useI18n } from '@/i18n/client';
import { updateProfileAction, type ProfileActionState } from '@/lib/actions/profile-actions';
import { BlockToggle } from '@/components/ui/BlockToggle';
import { ALIAS_MAX_LENGTH, ALIAS_MIN_LENGTH } from '@/lib/validation/profile';
import type { UserProfile } from '@/core-engine/types/general';

interface EditProfileFormProps {
  initialData: UserProfile;
}

const initialState: ProfileActionState = null;

export function EditProfileForm({ initialData }: EditProfileFormProps) {
  const { t } = useI18n();
  const [state, formAction, isPending] = useActionState(updateProfileAction, initialState);

  // The stored value stays canonical English ('Year 9'); only the label is
  // translated, so existing rows and the cheat-sheet year filter keep working.
  const yearLevels = ['Year 7', 'Year 8', 'Year 9', 'Year 10', 'Senior'] as const;

  return (
    <form
      action={formAction}
      className="mx-auto flex w-full max-w-2xl flex-col gap-6 rounded-2xl border-2 border-[var(--border)] bg-[var(--surface)] p-6 shadow-md md:p-8"
    >
      <div className="border-b border-[var(--border)] pb-4">
        <h2 className="text-2xl font-black text-(--foreground)">{t.profile.editHeading}</h2>
        <p className="mt-1 text-sm font-medium text-(--muted)">{t.profile.editIntro}</p>
      </div>

      {/* Identity Block */}
      <div className="flex flex-col gap-4 rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
        <h3 className="text-xs font-black uppercase tracking-wider text-(--foreground)">
          {t.profile.identityHeading}
        </h3>

        <div>
          <label htmlFor="alias" className="mb-2 block text-xs font-black uppercase tracking-wider text-(--muted)">
            {t.profile.alias}
          </label>
          <input
            id="alias"
            name="alias"
            type="text"
            defaultValue={initialData.alias}
            placeholder={t.profile.aliasPlaceholder}
            minLength={ALIAS_MIN_LENGTH}
            maxLength={ALIAS_MAX_LENGTH}
            required
            autoComplete="off"
            aria-describedby="alias-hint"
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 text-sm font-bold text-(--foreground) outline-none transition focus:border-blue-500"
          />
          <p id="alias-hint" className="mt-2 text-xs font-medium text-(--muted)">
            {t.profile.aliasHelp}
          </p>
        </div>

        <div>
          <label htmlFor="title" className="mb-2 block text-xs font-black uppercase tracking-wider text-(--muted)">
            {t.profile.customTitle}
          </label>
          <input
            id="title"
            name="title"
            type="text"
            defaultValue={initialData.title || ''}
            placeholder={t.profile.customTitlePlaceholder}
            maxLength={30}
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 text-sm font-bold text-(--foreground) outline-none transition focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="country" className="mb-2 block text-xs font-black uppercase tracking-wider text-(--muted)">
            {t.profile.country}
          </label>
          <input
            id="country"
            name="country"
            type="text"
            defaultValue={initialData.country || ''}
            placeholder={t.profile.countryPlaceholder}
            maxLength={30}
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 text-sm font-bold text-(--foreground) outline-none transition focus:border-blue-500"
          />
          <div className="mt-4">
            <BlockToggle
              name="showCountry"
              label={t.profileToggles.showCountry}
              defaultChecked={initialData.privacy.showCountry}
            />
          </div>
        </div>

        <div className="border-t border-[var(--border)] pt-4 mt-2">
          <label htmlFor="yearLevel" className="mb-2 block text-xs font-black uppercase tracking-wider text-(--muted)">
            {t.profile.academicLevel}
          </label>
          <select
            id="yearLevel"
            name="yearLevel"
            defaultValue={initialData.yearLevel || ''}
            className="w-full appearance-none rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 text-sm font-bold text-(--foreground) outline-none transition focus:border-blue-500"
          >
            <option value="">{t.profile.academicLevelPlaceholder}</option>
            {yearLevels.map((level) => (
              <option key={level} value={level}>
                {t.yearLevels[level]}
              </option>
            ))}
          </select>
          
          <div className="mt-4">
            <BlockToggle
              name="showYearLevel"
              label={t.profileToggles.showYearLevel}
              defaultChecked={initialData.privacy.showYearLevel}
            />
          </div>
        </div>
      </div>

      {/* Lab Notes Block */}
      <div className="flex flex-col gap-3 rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
        <label htmlFor="labNotes" className="text-xs font-black uppercase tracking-wider text-(--foreground)">
          {t.profile.labNotesField}
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
            label={t.profileToggles.showLabNotes}
            defaultChecked={initialData.privacy.showLabNotes}
          />
        </div>
      </div>

      {/* Game Stats Block */}
      <div className="flex flex-col gap-4 rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
        <h3 className="text-xs font-black uppercase tracking-wider text-(--foreground)">
          {t.profile.visibilityHeading}
        </h3>
        
        <BlockToggle
          name="showTotalSyntheses"
          label={t.profileToggles.showTotalSyntheses}
          defaultChecked={initialData.privacy.showTotalSyntheses}
        />
        
        <BlockToggle
          name="showAccuracy"
          label={t.profileToggles.showAccuracy}
          defaultChecked={initialData.privacy.showAccuracy}
        />
        
        <BlockToggle
          name="showCurrentStreak"
          label={t.profileToggles.showCurrentStreak}
          defaultChecked={initialData.privacy.showCurrentStreak}
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

      {/* Form Action Buttons */}
      <div className="mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
        <LocaleLink
          href="/profile"
          className="flex items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-xs font-black uppercase tracking-wider text-(--foreground) transition hover:bg-[var(--background)]"
        >
          {t.common.cancel}
        </LocaleLink>
        <button
          type="submit"
          disabled={isPending}
          className="rounded-xl bg-blue-500 px-6 py-3 text-xs font-black uppercase tracking-wider text-white shadow-md transition hover:bg-blue-600 disabled:opacity-60"
        >
          {isPending ? t.profile.saving : t.profile.save}
        </button>
      </div>
    </form>
  );
}
