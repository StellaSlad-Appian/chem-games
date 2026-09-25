// src/components/profile/EditProfileForm.tsx
'use client';

import { useActionState } from 'react';
import { ChevronDown } from 'lucide-react';
import { LocaleLink } from '@/components/layout/LocaleLink';
import { useI18n } from '@/i18n/client';
import { updateProfileAction, type ProfileActionState } from '@/lib/actions/profile-actions';
import { SwitchList, SwitchRow } from '@/components/ui/Switch';
import { ALIAS_MAX_LENGTH, ALIAS_MIN_LENGTH } from '@/lib/validation/profile';
import type { UserProfile } from '@/core-engine/types/general';

interface EditProfileFormProps {
  initialData: UserProfile;
}

const initialState: ProfileActionState = null;

const SECTION_HEADING = 'text-xs font-black uppercase tracking-wider text-(--foreground)';
const FIELD_LABEL = 'mb-2 block text-xs font-black uppercase tracking-wider text-(--muted)';
// A focus ring as well as the border change, so focus is visible on its own
// (docs/ACCESSIBILITY.md §4 rules out `outline-none` with nothing to replace it).
const FIELD =
  'w-full rounded-xl border border-(--border-strong) bg-(--surface) px-3.5 py-3 text-sm font-bold text-(--foreground) outline-none transition placeholder:font-medium placeholder:text-(--muted) hover:border-(--muted) focus:border-(--link) focus:ring-3 focus:ring-(--link)/25';

export function EditProfileForm({ initialData }: EditProfileFormProps) {
  const { t } = useI18n();
  const [state, formAction, isPending] = useActionState(updateProfileAction, initialState);

  // The stored value stays canonical English ('Year 9'); only the label is
  // translated, so existing rows and the cheat-sheet year filter keep working.
  const yearLevels = ['Year 7', 'Year 8', 'Year 9', 'Year 10', 'Senior'] as const;

  return (
    <form
      action={formAction}
      className="mx-auto flex w-full max-w-2xl flex-col gap-8 game-card p-6 md:p-8"
    >
      <div className="border-b border-(--border) pb-5">
        <h2 className="text-2xl font-black text-(--foreground) md:text-3xl">{t.profile.editHeading}</h2>
        <p className="mt-1 text-sm font-medium text-(--muted)">{t.profile.editIntro}</p>
      </div>

      {/* Identity: each field that can be hidden carries its own switch */}
      <section aria-labelledby="identity-heading" className="flex flex-col gap-5">
        <h3 id="identity-heading" className={SECTION_HEADING}>
          {t.profile.identityHeading}
        </h3>

        <div>
          <label htmlFor="alias" className={FIELD_LABEL}>
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
            className={FIELD}
          />
          <p id="alias-hint" className="mt-2 text-xs font-medium text-(--muted)">
            {t.profile.aliasHelp}
          </p>
        </div>

        <div>
          <label htmlFor="title" className={FIELD_LABEL}>
            {t.profile.customTitle}
          </label>
          <input
            id="title"
            name="title"
            type="text"
            defaultValue={initialData.title || ''}
            placeholder={t.profile.customTitlePlaceholder}
            maxLength={30}
            className={FIELD}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="country" className={FIELD_LABEL}>
              {t.profile.country}
            </label>
            <input
              id="country"
              name="country"
              type="text"
              defaultValue={initialData.country || ''}
              placeholder={t.profile.countryPlaceholder}
              maxLength={30}
              className={FIELD}
            />
            <SwitchRow
              name="showCountry"
              label={t.profileToggles.showCountry}
              defaultChecked={initialData.privacy.showCountry}
            />
          </div>

          <div>
            <label htmlFor="yearLevel" className={FIELD_LABEL}>
              {t.profile.academicLevel}
            </label>
            <div className="relative">
              <select
                id="yearLevel"
                name="yearLevel"
                defaultValue={initialData.yearLevel || ''}
                className={`${FIELD} appearance-none pr-10`}
              >
                <option value="">{t.profile.academicLevelPlaceholder}</option>
                {yearLevels.map((level) => (
                  <option key={level} value={level}>
                    {t.yearLevels[level]}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-(--muted)"
                aria-hidden="true"
              />
            </div>
            <SwitchRow
              name="showYearLevel"
              label={t.profileToggles.showYearLevel}
              defaultChecked={initialData.privacy.showYearLevel}
            />
          </div>
        </div>
      </section>

      {/* Lab notes */}
      <section className="flex flex-col gap-2 border-t border-(--border) pt-6">
        <label htmlFor="labNotes" className={`${SECTION_HEADING} mb-2`}>
          {t.profile.labNotesField}
        </label>
        <textarea
          id="labNotes"
          name="labNotes"
          defaultValue={initialData.labNotes}
          rows={3}
          maxLength={500}
          className={`${FIELD} resize-y`}
        />
        <SwitchRow
          name="showLabNotes"
          label={t.profileToggles.showLabNotes}
          defaultChecked={initialData.privacy.showLabNotes}
        />
      </section>

      {/* Public stats: one settings list */}
      <section aria-labelledby="visibility-heading" className="flex flex-col gap-3 border-t border-(--border) pt-6">
        <h3 id="visibility-heading" className={SECTION_HEADING}>
          {t.profile.visibilityHeading}
        </h3>
        <SwitchList className="rounded-xl border border-(--border) bg-(--surface-2) px-4">
          <SwitchRow
            name="showTotalSyntheses"
            label={t.profileToggles.showTotalSyntheses}
            defaultChecked={initialData.privacy.showTotalSyntheses}
          />
          <SwitchRow
            name="showCurrentStreak"
            label={t.profileToggles.showCurrentStreak}
            defaultChecked={initialData.privacy.showCurrentStreak}
          />
        </SwitchList>
      </section>

      {/* Feedback State */}
      {state?.message && (
        <p
          role="status"
          className={`rounded-xl border p-3 text-xs font-bold ${
            state.status === 'success'
              ? 'border-(--success)/30 bg-(--success-surface) text-(--success)'
              : 'border-(--danger)/30 bg-(--danger-surface) text-(--danger)'
          }`}
        >
          {state.message}
        </p>
      )}

      {/* Form Action Buttons */}
      <div className="mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
        <LocaleLink
          href="/profile"
          className="flex items-center justify-center rounded-xl border border-(--border) bg-(--surface) px-5 py-3 text-xs font-black uppercase tracking-wider text-(--foreground) transition hover:bg-(--surface-2)"
        >
          {t.common.cancel}
        </LocaleLink>
        <button
          type="submit"
          disabled={isPending}
          className="rounded-xl bg-(--action) px-6 py-3 text-xs font-black uppercase tracking-wider text-white shadow-md transition hover:bg-(--action-hover) disabled:opacity-60"
        >
          {isPending ? t.profile.saving : t.profile.save}
        </button>
      </div>
    </form>
  );
}
