// src/i18n/config.ts
//
// The single list every other part of the i18n system reads. Adding a locale is
// meant to be: drop a dictionary in `src/i18n/dictionaries/`, add a cheat-sheet
// overlay in `src/i18n/cheat-sheets/`, and add the code here. Nothing else in
// the app hard-codes a language.

/**
 * Supported locales, default first. These are the URL prefixes (`/de/games`)
 * and the values written into the `<html lang>` attribute, so they must be
 * valid BCP 47 tags.
 *
 * Phase 1 ships English and German. Phase 2 adds 'fr', 'es', 'it', 'ru'.
 */
export const LOCALES = ['en', 'de'] as const;

export type Locale = (typeof LOCALES)[number];

/** Used when the request expresses no usable preference. */
export const DEFAULT_LOCALE: Locale = 'en';

/**
 * Name of the cookie that remembers the reader's choice. `NEXT_LOCALE` is the
 * conventional name for this pattern; it is a preference, not a credential, so
 * the language switcher sets it from the client.
 */
export const LOCALE_COOKIE = 'NEXT_LOCALE';

/** One year, matching how long the other stored preferences are kept. */
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/**
 * How each language is named in the switcher: in its own language, always. A
 * reader looking for German scans for "Deutsch", not for "German" — which they
 * may not be able to read, since the whole reason they are reaching for the
 * switcher is that the current language is wrong for them.
 */
export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  de: 'Deutsch',
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}
