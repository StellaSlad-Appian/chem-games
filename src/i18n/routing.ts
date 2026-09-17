// src/i18n/routing.ts
//
// Pure helpers for moving between "a path as the app writes it" (`/games`) and
// "a path as the browser sees it" (`/de/games`). Shared by the proxy, the
// language switcher and the OAuth callback, so it must stay free of Next.js
// server imports.

import { isLocale, LOCALES, type Locale } from './config';

/**
 * Paths that must never gain a locale prefix.
 *
 * Route handlers are the important entry here. `/auth/callback` is registered
 * as a redirect URL in the Supabase dashboard and `/account/export` is linked
 * as a file download, so both have to keep answering on a stable, unprefixed
 * URL. They live outside `src/app/[lang]/` for the same reason. The rest are
 * framework and metadata paths that have no localized variant.
 */
export const UNPREFIXED_PATHS = [
  '/auth/callback',
  '/account/export',
  '/api',
  '/_next',
  '/favicon.ico',
  '/robots.txt',
  '/sitemap.xml',
] as const;

export function isUnprefixedPath(pathname: string): boolean {
  return UNPREFIXED_PATHS.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

/** The locale a path is already prefixed with, or null if it has none. */
export function localeFromPathname(pathname: string): Locale | null {
  const first = pathname.split('/')[1];
  return isLocale(first) ? first : null;
}

/** `/de/games` -> `/games`. A bare `/de` becomes `/`. */
export function stripLocale(pathname: string): string {
  const locale = localeFromPathname(pathname);
  if (!locale) return pathname;
  const rest = pathname.slice(`/${locale}`.length);
  return rest === '' ? '/' : rest;
}

/**
 * `/games` -> `/de/games`. Idempotent: an already-prefixed path is re-prefixed
 * with the new locale rather than gaining a second prefix.
 *
 * Every locale is prefixed, including the default. A visible `/en` costs one
 * redirect from `/` but means there is exactly one URL shape to reason about in
 * the proxy, in `hreflang` alternates and in tests — no "sometimes prefixed"
 * special case, which is where this pattern usually goes wrong.
 */
export function localizePath(pathname: string, locale: Locale): string {
  if (isUnprefixedPath(pathname)) return pathname;
  const base = stripLocale(pathname);
  return base === '/' ? `/${locale}` : `/${locale}${base}`;
}

/** Every locale's URL for one unprefixed path — used for `hreflang` alternates. */
export function localeAlternates(pathname: string): Record<Locale, string> {
  return Object.fromEntries(
    LOCALES.map((locale) => [locale, localizePath(pathname, locale)])
  ) as Record<Locale, string>;
}
