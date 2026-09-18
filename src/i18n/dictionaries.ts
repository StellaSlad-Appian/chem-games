// src/i18n/dictionaries.ts
//
// Server-side dictionary loading, following the pattern in
// node_modules/next/dist/docs/01-app/02-guides/internationalization.md.
//
// The guide opens this module with `import 'server-only'`. That package is not
// a dependency of this project and the brief asked for no new ones, so the
// boundary is enforced by convention instead: this module is imported from
// layouts, pages and route handlers only. Client components read the same
// strings through `useI18n()` in ./client, which receives the dictionary the
// root layout already loaded — they never import this file.
//
// Each entry is a dynamic import, so a build only pulls the locales it renders
// into a given chunk rather than bundling all of them into every route.

import type { Dictionary } from './dictionaries/en';
import { DEFAULT_LOCALE, isLocale, type Locale } from './config';

const loaders: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import('./dictionaries/en').then((module) => module.en),
  de: () => import('./dictionaries/de').then((module) => module.de),
  fr: () => import('./dictionaries/fr').then((module) => module.fr),
  es: () => import('./dictionaries/es').then((module) => module.es),
};

/**
 * Loads the dictionary for a locale.
 *
 * `lang` arrives from the route as a plain `string`; anything unsupported falls
 * back to English rather than throwing. Pages that should 404 on a bad locale
 * check `isLocale()` first and call `notFound()` — the layout deliberately does
 * not, because a layout that throws takes the 404 page down with it.
 */
export async function getDictionary(lang: string): Promise<Dictionary> {
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  return loaders[locale]();
}

export type { Dictionary };
