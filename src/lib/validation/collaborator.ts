// src/lib/validation/collaborator.ts
//
// Pure, framework-free validation for the teacher collaborator sign-up. It
// runs inside the server action, so nothing here may trust the shape of
// `input`: a server action is a public HTTP endpoint and callers can send
// anything. Same contract as src/lib/validation/feedback.ts, and the same
// reason for it.
//
// The caps below mirror the check constraints in
// supabase/migrations/20260919_create_collaborators.sql. They are exported so
// the form can set `maxLength` from the same numbers rather than from a
// literal that drifts.
//
// Only the email address is required. Every other field helps the maintainer
// and costs the teacher, so every other field may be blank, and a blank one
// becomes `null` rather than an empty string — a column full of '' is a column
// you cannot ask "did anyone say?" of.

export const COLLABORATOR_EMAIL_MAX_LENGTH = 254;
export const COLLABORATOR_NAME_MAX_LENGTH = 80;
export const COLLABORATOR_SCHOOL_MAX_LENGTH = 120;
export const COLLABORATOR_COUNTRY_MAX_LENGTH = 60;
export const COLLABORATOR_YEAR_LEVELS_MAX_LENGTH = 120;
export const COLLABORATOR_SUBJECTS_MAX_LENGTH = 120;
export const COLLABORATOR_MESSAGE_MAX_LENGTH = 1000;

export interface ValidatedCollaborator {
  email: string;
  name: string | null;
  school: string | null;
  country: string | null;
  yearLevels: string | null;
  subjects: string | null;
  message: string | null;
}

export type CollaboratorValidationResult =
  | { ok: true; value: ValidatedCollaborator }
  | { ok: false; error: string; field: CollaboratorField };

/** Which input the error belongs to, so the form can point at it. */
export type CollaboratorField =
  | 'email'
  | 'name'
  | 'school'
  | 'country'
  | 'yearLevels'
  | 'subjects'
  | 'message';

/**
 * The messages this validator can return. Passing them in keeps the module
 * pure and framework-free — it still has no idea locales exist — while letting
 * the server action hand it translated copy, exactly as the feedback validator
 * does. The English defaults mean every test here keeps working unchanged.
 *
 * Every message says what was wrong *and* what to do about it, per
 * docs/ACCESSIBILITY.md § Understandable. "Invalid input" is not acceptable.
 */
export interface CollaboratorValidationMessages {
  emailRequired: string;
  emailInvalid: string;
  /** Interpolates {max}. Used for every field's length cap, including the email. */
  tooLong: string;
}

export const DEFAULT_COLLABORATOR_VALIDATION_MESSAGES: CollaboratorValidationMessages = {
  emailRequired: 'Please enter an email address, so there is somewhere to write back to.',
  emailInvalid:
    'That does not look like an email address. It needs an @ and a domain after it — for example name@school.edu.au.',
  tooLong: 'That is longer than this field allows (maximum {max} characters). Please shorten it.',
};

/**
 * Deliberately shape-only, and permissive with it: one `@` with something
 * either side, a dot in the domain, and no whitespace or address-list
 * punctuation. The same expression the SQL function applies, on purpose.
 *
 * A stricter pattern is a worse pattern here. Real addresses contain `+`,
 * apostrophes and non-ASCII letters, school domains are long and odd, and the
 * only thing that ever proves an address works is sending to it. Rejecting a
 * teacher's real address is a worse failure than accepting a typo that bounces.
 */
const EMAIL_PATTERN = /^[^@\s<>,;]+@[^@\s<>,;]+\.[^@\s<>,;]+$/;

/** Number of Unicode code points, which is what Postgres char_length() counts. */
const codePointLength = (value: string): number => Array.from(value).length;

/** FormData and a JSON body can both hand us a non-string; treat it as absent. */
const asString = (raw: unknown): string => (typeof raw === 'string' ? raw : '');

/** Trimmed, or null when there is nothing left after trimming. */
export function optionalText(raw: unknown): string | null {
  const trimmed = asString(raw).trim();
  return trimmed.length === 0 ? null : trimmed;
}

export function isCollaboratorEmail(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  const email = value.trim();
  return (
    codePointLength(email) <= COLLABORATOR_EMAIL_MAX_LENGTH && EMAIL_PATTERN.test(email)
  );
}

/** The optional fields, paired with the cap the error message quotes. */
const OPTIONAL_FIELDS = [
  ['name', COLLABORATOR_NAME_MAX_LENGTH],
  ['school', COLLABORATOR_SCHOOL_MAX_LENGTH],
  ['country', COLLABORATOR_COUNTRY_MAX_LENGTH],
  ['yearLevels', COLLABORATOR_YEAR_LEVELS_MAX_LENGTH],
  ['subjects', COLLABORATOR_SUBJECTS_MAX_LENGTH],
  ['message', COLLABORATOR_MESSAGE_MAX_LENGTH],
] as const satisfies ReadonlyArray<
  readonly [Exclude<CollaboratorField, 'email'>, number]
>;

/**
 * One length message for every field rather than seven field-specific ones.
 *
 * "What was wrong and what to do" (docs/ACCESSIBILITY.md § Understandable) is
 * carried here by *where* the message appears, not by naming the field in it:
 * the form renders it under the offending input and points that input's
 * `aria-describedby` at it, so a screen reader reads the label and the error
 * together. Seven near-identical sentences in six languages would be seven
 * more chances for one of them to be translated differently, for no gain a
 * reader can perceive.
 */
const tooLong = (messages: CollaboratorValidationMessages, max: number): string =>
  messages.tooLong.replace('{max}', String(max));

export function validateCollaborator(
  input: unknown,
  messages: CollaboratorValidationMessages = DEFAULT_COLLABORATOR_VALIDATION_MESSAGES
): CollaboratorValidationResult {
  if (typeof input !== 'object' || input === null) {
    return { ok: false, error: messages.emailRequired, field: 'email' };
  }

  const raw = input as Record<string, unknown>;
  const email = asString(raw.email).trim();

  if (email.length === 0) {
    return { ok: false, error: messages.emailRequired, field: 'email' };
  }
  // Length before shape, so a pasted paragraph is told it is too long rather
  // than that it is not an email address, which it also is not.
  if (codePointLength(email) > COLLABORATOR_EMAIL_MAX_LENGTH) {
    return {
      ok: false,
      error: tooLong(messages, COLLABORATOR_EMAIL_MAX_LENGTH),
      field: 'email',
    };
  }
  if (!EMAIL_PATTERN.test(email)) {
    return { ok: false, error: messages.emailInvalid, field: 'email' };
  }

  const value: ValidatedCollaborator = {
    // Stored lower-cased, because the unique index is on lower(email) and a
    // row whose stored case differs from the one the index matched is a
    // needless surprise when you read the table.
    email: email.toLowerCase(),
    name: null,
    school: null,
    country: null,
    yearLevels: null,
    subjects: null,
    message: null,
  };

  for (const [field, max] of OPTIONAL_FIELDS) {
    const text = optionalText(raw[field]);
    if (text !== null && codePointLength(text) > max) {
      return { ok: false, error: tooLong(messages, max), field };
    }
    value[field] = text;
  }

  return { ok: true, value };
}
