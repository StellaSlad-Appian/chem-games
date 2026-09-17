// src/i18n/server.ts
//
// Locale lookup for code that runs on the server but has no route params:
// Server Actions and the two route handlers outside `[lang]`.
//
// Server Actions are posted to the URL of the page that used them, so the
// locale is in that URL — but Next does not hand it to the action. The cookie
// is the supported way across this boundary, and the proxy keeps it in step
// with the path on every localized request, so it is reliable rather than a
// best guess.

import { cookies } from 'next/headers';
import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale, type Locale } from './config';
import { getDictionary, type Dictionary } from './dictionaries';

export async function getRequestLocale(): Promise<Locale> {
  try {
    const store = await cookies();
    const value = store.get(LOCALE_COOKIE)?.value;
    return isLocale(value) ? value : DEFAULT_LOCALE;
  } catch {
    // `cookies()` throws outside a request scope (for example when a Server
    // Action module is imported by a unit test). English is the right answer
    // there, not a crash.
    return DEFAULT_LOCALE;
  }
}

export async function getRequestDictionary(): Promise<Dictionary> {
  return getDictionary(await getRequestLocale());
}
