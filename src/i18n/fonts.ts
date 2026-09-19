// src/i18n/fonts.ts
//
// Which web fonts a locale needs, and where to get them.
//
// The site's two faces are loaded by an `@import` at the top of
// src/app/globals.css: **Bebas Neue** for display and **DM Sans** for body.
// Both ship `latin` and `latin-ext` and nothing else — verified against the
// Google Fonts API with a full Chrome UA, which is what decides the subsets
// you are served:
//
//   curl -s -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 \
//     (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" \
//     "https://fonts.googleapis.com/css2?family=Bebas+Neue" \
//     | grep -oE "/\* [a-z-]+ \*/" | sort -u
//   /* latin */ /* latin-ext */
//
// So a Cyrillic page in those faces renders entirely in the browser's
// fallback. For body text that is off-brand but legible. For headings it
// breaks the layout: Bebas Neue is a *condensed all-caps* face, the fallback
// is `sans-serif`, and every heading on the Russian site would come out at a
// different width and weight from the five languages the design is tuned for.
//
// A locale that needs a different family names it here, and
// src/app/globals.css re-points `--font-display` / `--font-body` under
// `html[lang="…"]`. Keeping the two halves in different files is deliberate:
// the CSS decides what a page *looks* like, this decides what it *downloads*.

import type { Locale } from './config';

/**
 * Oswald (condensed display) and Manrope (geometric body), the approved
 * replacements for Bebas Neue and DM Sans on a Cyrillic page. Both serve
 * `cyrillic` and `cyrillic-ext`, verified with the probe above.
 *
 * The weights mirror what the Latin faces are used at: Bebas Neue has a single
 * weight but the display face appears at several, and DM Sans is loaded at
 * 400/600/800. `display=swap` matches the existing import, so a slow font
 * never blanks the text.
 */
const CYRILLIC_STYLESHEET =
  'https://fonts.googleapis.com/css2?family=Oswald:wght@400..700&family=Manrope:wght@400..800&display=swap';

/**
 * Extra font stylesheets, by locale code. A locale with no entry is one the
 * default faces already cover.
 *
 * Keyed by `string` rather than `Locale` on purpose: the Russian entry has to
 * exist *before* `'ru'` joins `LOCALES`, because the whole point of this file
 * is that the fonts are ready when the translation starts. `fonts.test.ts`
 * asserts every key here is either a shipped locale or a planned one, so the
 * loose key cannot become a place typos hide.
 */
const EXTRA_FONT_STYLESHEETS: Readonly<Record<string, string>> = {
  ru: CYRILLIC_STYLESHEET,
};

/**
 * The extra stylesheet this locale needs, or `undefined` — which is the point.
 * `undefined` renders no `<link>` at all, so en/de/fr/es/it request no extra
 * stylesheet rather than requesting a larger shared one whose `unicode-range`
 * blocks they would never draw from.
 */
export function extraFontStylesheet(locale: Locale | string): string | undefined {
  return EXTRA_FONT_STYLESHEETS[locale];
}

/** Every locale code this file has fonts for. Exported for the test. */
export const LOCALES_WITH_EXTRA_FONTS = Object.keys(EXTRA_FONT_STYLESHEETS);
