// src/i18n/about.ts
//
// The About page's copy, one file per locale, loaded server-side only — the
// same arrangement as src/i18n/teachers.ts, and for the same reason: the
// shared dictionary is serialized into every page's RSC payload, and this is
// a page of prose with one reader.
//
// **English only, deliberately, and without a fallback.** The page is the
// site's personal, persuasive case for itself, so the English was settled
// first and translation follows once it is approved. Until a locale has its
// own file here:
//
//   - `/<locale>/about` is a 404 (the page calls `notFound()`),
//   - the footer shows no About link in that locale, and
//   - the For Teachers page shows no pointer to it.
//
// That is the rule src/i18n/teachers.ts states — a page rendered in English
// inside a German site is not a shipped translation — applied by leaving the
// page out rather than by throwing. It is also why the footer label and the
// metadata live in this catalogue rather than in the dictionary: a dictionary
// key must exist in all six locales, and five of them would be labels for a
// link that must not render.
//
// To add a locale: add src/i18n/about/<locale>.ts typed `AboutCopy`, register
// it in CATALOGUES, and the page, the footer link and the pointer all appear.
// All three read `aboutCopy()`, so there is nothing else to switch on.
//
// **Server-only.** Nothing here is marked `'use client'`, and nothing may
// import it from a client component.

import type { Locale } from './config';
import { en, type AboutCopy } from './about/en';

export type { AboutCopy };

const CATALOGUES: Partial<Record<Locale, AboutCopy>> = { en };

/** The About copy in `locale`, or `undefined` if that locale has no About page yet. */
export function aboutCopy(locale: Locale): AboutCopy | undefined {
  return CATALOGUES[locale];
}

/** Exposed for tests. */
export { en as ABOUT_EN, CATALOGUES as ABOUT_CATALOGUES };
