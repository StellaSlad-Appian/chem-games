// src/lib/validation/profile.ts
//
// Pure validation for the profile edit form. No Next.js or Supabase imports, so
// it is unit-testable and safe to import from both the server action and the
// client form. The limits mirror the check constraints on public.profiles
// (supabase/migrations/202607180001_create_profiles.sql and
// 20260914_profile_privacy.sql).

import type { YearLevel } from '@/core-engine/types/general';

export const ALIAS_MIN_LENGTH = 2;
export const ALIAS_MAX_LENGTH = 40;
export const TITLE_MAX_LENGTH = 30;
export const COUNTRY_MAX_LENGTH = 30;
export const LAB_NOTES_MAX_LENGTH = 500;

/** Exactly the <option> values offered by EditProfileForm.tsx ('' means unset). */
export const YEAR_LEVEL_OPTIONS = [
  'Year 7',
  'Year 8',
  'Year 9',
  'Year 10',
  'Senior',
] as const satisfies readonly YearLevel[];

export interface ValidatedProfileFields {
  alias: string;
  title: string | null;
  country: string | null;
  yearLevel: YearLevel | null;
  labNotes: string;
}

export type FieldResult<T> = { ok: true; value: T } | { ok: false; message: string };

export type ProfileValidationResult = FieldResult<ValidatedProfileFields>;

/** FormData.get() returns string | File | null; anything but a string is treated as empty. */
const asString = (raw: unknown): string => (typeof raw === 'string' ? raw : '');

/** Number of Unicode code points, which is what Postgres char_length() counts. */
const codePointLength = (value: string): number => Array.from(value).length;

/** Truncate to `max` code points (never splits a surrogate pair). */
export function capLength(value: string, max: number): string {
  const chars = Array.from(value);
  return chars.length <= max ? value : chars.slice(0, max).join('');
}

/**
 * The alias is public (leaderboards), so it must never look like an email
 * address: trimmed, 2-40 characters, no '@'.
 */
export function validateAlias(raw: unknown): FieldResult<string> {
  const alias = asString(raw).trim();
  const length = codePointLength(alias);

  if (length < ALIAS_MIN_LENGTH || length > ALIAS_MAX_LENGTH) {
    return {
      ok: false,
      message: `Your alias must be between ${ALIAS_MIN_LENGTH} and ${ALIAS_MAX_LENGTH} characters.`,
    };
  }
  if (alias.includes('@')) {
    return {
      ok: false,
      message: 'Your alias cannot contain an @ sign. Please choose a nickname, not an email address.',
    };
  }
  return { ok: true, value: alias };
}

/** Empty means "not set"; anything else must be one of YEAR_LEVEL_OPTIONS. */
export function validateYearLevel(raw: unknown): FieldResult<YearLevel | null> {
  const value = asString(raw).trim();
  if (value === '') return { ok: true, value: null };

  const match = YEAR_LEVEL_OPTIONS.find((option) => option === value);
  if (!match) {
    return { ok: false, message: 'Please choose a year level from the list.' };
  }
  return { ok: true, value: match };
}

/** Trim and cap an optional free-text field; empty becomes null. */
export function normaliseOptionalText(raw: unknown, max: number): string | null {
  const value = capLength(asString(raw).trim(), max);
  return value === '' ? null : value;
}

/** Trim and cap a required free-text field; empty stays ''. */
export function normaliseText(raw: unknown, max: number): string {
  return capLength(asString(raw).trim(), max);
}

export interface ProfileFormFields {
  alias: unknown;
  title: unknown;
  country: unknown;
  yearLevel: unknown;
  labNotes: unknown;
}

export function validateProfileForm(fields: ProfileFormFields): ProfileValidationResult {
  const alias = validateAlias(fields.alias);
  if (!alias.ok) return alias;

  const yearLevel = validateYearLevel(fields.yearLevel);
  if (!yearLevel.ok) return yearLevel;

  return {
    ok: true,
    value: {
      alias: alias.value,
      title: normaliseOptionalText(fields.title, TITLE_MAX_LENGTH),
      country: normaliseOptionalText(fields.country, COUNTRY_MAX_LENGTH),
      yearLevel: yearLevel.value,
      labNotes: normaliseText(fields.labNotes, LAB_NOTES_MAX_LENGTH),
    },
  };
}
