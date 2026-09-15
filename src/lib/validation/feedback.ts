// src/lib/validation/feedback.ts
//
// Pure, framework-free validation for the feedback form. It runs inside the
// server action, so nothing here may trust the shape of `input`: a server
// action is a public HTTP endpoint and callers can send anything.

export const FEEDBACK_TYPES = ['bug', 'chemistry', 'feature'] as const;
export type FeedbackType = (typeof FEEDBACK_TYPES)[number];

export const FEEDBACK_MESSAGE_MAX_LENGTH = 2000;
export const FEEDBACK_PAGE_URL_MAX_LENGTH = 300;
export const DEFAULT_FEEDBACK_PAGE_URL = '/';

export interface ValidatedFeedback {
  type: FeedbackType;
  message: string;
  pageUrl: string;
}

export type FeedbackValidationResult =
  | { ok: true; value: ValidatedFeedback }
  | { ok: false; error: string };

export function isFeedbackType(value: unknown): value is FeedbackType {
  return typeof value === 'string' && (FEEDBACK_TYPES as readonly string[]).includes(value);
}

// A page URL is only kept when it is a site-relative path: it must start with
// exactly one '/', so protocol-relative ('//evil.example') and backslash
// ('/\evil.example') forms are rejected, and it may not contain whitespace.
const PAGE_URL_PATTERN = /^\/(?![/\\])\S*$/;

// C0 control characters (U+0000-U+001F) and DEL (U+007F) have no place in a
// path and would only serve to confuse whoever reads the notification email.
function hasControlCharacters(value: string): boolean {
  for (const char of value) {
    const code = char.codePointAt(0) ?? 0;
    if (code < 0x20 || code === 0x7f) return true;
  }
  return false;
}

// Anything that is not a safe site-relative path collapses to '/'.
export function normalisePageUrl(value: unknown): string {
  if (typeof value !== 'string') return DEFAULT_FEEDBACK_PAGE_URL;
  if (value.length > FEEDBACK_PAGE_URL_MAX_LENGTH) return DEFAULT_FEEDBACK_PAGE_URL;
  if (!PAGE_URL_PATTERN.test(value) || hasControlCharacters(value)) {
    return DEFAULT_FEEDBACK_PAGE_URL;
  }
  return value;
}

// The honeypot field is filled by bots and never by the real form. Any
// non-empty string (or any non-string value at all) counts as filled.
export function isHoneypotFilled(value: unknown): boolean {
  if (value === undefined || value === null) return false;
  if (typeof value === 'string') return value.length > 0;
  return true;
}

export function validateFeedback(input: unknown): FeedbackValidationResult {
  if (typeof input !== 'object' || input === null) {
    return { ok: false, error: 'Please choose a category and enter a message.' };
  }

  const { type, message, pageUrl } = input as Record<string, unknown>;

  if (!isFeedbackType(type)) {
    return { ok: false, error: 'Please choose a valid feedback category.' };
  }

  if (typeof message !== 'string') {
    return { ok: false, error: 'Please enter a message.' };
  }

  const trimmedMessage = message.trim();
  if (trimmedMessage.length === 0) {
    return { ok: false, error: 'Please enter a message.' };
  }
  if (trimmedMessage.length > FEEDBACK_MESSAGE_MAX_LENGTH) {
    return {
      ok: false,
      error: `Message is too long (maximum ${FEEDBACK_MESSAGE_MAX_LENGTH} characters).`,
    };
  }

  return {
    ok: true,
    value: {
      type,
      message: trimmedMessage,
      pageUrl: normalisePageUrl(pageUrl),
    },
  };
}
