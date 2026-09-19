// src/i18n/teachers.ts
//
// The For Teachers page's copy, one file per locale, loaded by that page alone.
//
// Why it is not in the shared dictionary, which is where it started:
// src/app/[lang]/layout.tsx hands the *whole* dictionary to `I18nProvider`, so
// every byte of it is serialized into the RSC payload of **every** page —
// game pages, the cheat-sheet index, everything. This namespace was 8 KB of
// prose that exactly one Server Component reads, riding along on every route.
// docs/i18n/README.md § "The dictionary is a budget, and a game will eat it"
// describes the same problem and the same fix for the game catalogues.
//
// Only the three strings that really are site-wide stayed behind:
// `footer.teachers` (the footer link renders on every page) and
// `meta.teachersTitle` / `meta.teachersDescription`.
//
// **Server-only.** Nothing here is marked `'use client'` and nothing may import
// it from a client component: doing so would put the copy straight back into
// the bundle this move took it out of. The page is an async Server Component,
// so it calls `teachersCopy(locale)` directly. The same arrangement as
// src/i18n/cheat-sheets.ts.

import { LOCALE_LABELS, type Locale } from './config';
import { en, type TeachersCopy } from './teachers/en';
import { de } from './teachers/de';
import { fr } from './teachers/fr';
import { es } from './teachers/es';
import { it } from './teachers/it';
import { ru } from './teachers/ru';

export type { TeachersCopy };

/**
 * One file per locale in `LOCALES`, no exceptions. `Record<Locale, …>` makes
 * adding a locale to `LOCALES` a compile error here until its file exists —
 * the same gate the game catalogues use, for the same reason: a page that
 * renders in English inside a German site is not a shipped translation.
 */
const CATALOGUES: Record<Locale, TeachersCopy> = { en, de, fr, es, it, ru };

/**
 * The For Teachers copy in `locale`. Throws rather than falling back to
 * English, because a silent fallback is how a half-translated page ships
 * unnoticed.
 */
export function teachersCopy(locale: Locale): TeachersCopy {
  const catalogue = CATALOGUES[locale];
  if (!catalogue) {
    throw new Error(
      `No For Teachers catalogue for locale "${locale}" (${LOCALE_LABELS[locale] ?? '?'}). ` +
        'Add src/i18n/teachers/<locale>.ts — see docs/i18n/README.md § Adding a string.'
    );
  }
  return catalogue;
}

/** Exposed for the parity test and the review generator. */
export { en as TEACHERS_EN, CATALOGUES as TEACHERS_CATALOGUES };
