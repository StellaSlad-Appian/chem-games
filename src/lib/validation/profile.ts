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

/**
 * The messages the validators below can return. Passed in by the server action
 * so this module stays pure; the English defaults keep every existing caller
 * and test working unchanged.
 */
export interface ProfileValidationMessages {
  /** Interpolates {min} and {max}. */
  aliasLength: string;
  aliasAtSign: string;
  yearLevelInvalid: string;
}

export const DEFAULT_PROFILE_VALIDATION_MESSAGES: ProfileValidationMessages = {
  aliasLength: 'Your alias must be between {min} and {max} characters.',
  aliasAtSign:
    'Your alias cannot contain an @ sign. Please choose a nickname, not an email address.',
  yearLevelInvalid: 'Please choose a year level from the list.',
};

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
export function validateAlias(
  raw: unknown,
  messages: ProfileValidationMessages = DEFAULT_PROFILE_VALIDATION_MESSAGES
): FieldResult<string> {
  const alias = asString(raw).trim();
  const length = codePointLength(alias);

  if (length < ALIAS_MIN_LENGTH || length > ALIAS_MAX_LENGTH) {
    return {
      ok: false,
      message: messages.aliasLength
        .replace('{min}', String(ALIAS_MIN_LENGTH))
        .replace('{max}', String(ALIAS_MAX_LENGTH)),
    };
  }
  if (alias.includes('@')) {
    return { ok: false, message: messages.aliasAtSign };
  }
  return { ok: true, value: alias };
}

/** Empty means "not set"; anything else must be one of YEAR_LEVEL_OPTIONS. */
export function validateYearLevel(
  raw: unknown,
  messages: ProfileValidationMessages = DEFAULT_PROFILE_VALIDATION_MESSAGES
): FieldResult<YearLevel | null> {
  const value = asString(raw).trim();
  if (value === '') return { ok: true, value: null };

  // The stored value stays canonical English ('Year 9'); only its label is
  // translated, in the `yearLevels` dictionary namespace. Translating the
  // value would break every existing row and the cheat-sheet year filter.
  const match = YEAR_LEVEL_OPTIONS.find((option) => option === value);
  if (!match) {
    return { ok: false, message: messages.yearLevelInvalid };
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

export function validateProfileForm(
  fields: ProfileFormFields,
  messages: ProfileValidationMessages = DEFAULT_PROFILE_VALIDATION_MESSAGES
): ProfileValidationResult {
  const alias = validateAlias(fields.alias, messages);
  if (!alias.ok) return alias;

  const yearLevel = validateYearLevel(fields.yearLevel, messages);
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
