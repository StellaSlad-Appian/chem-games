// src/i18n/locale-match.ts
//
// Accept-Language negotiation with no dependencies.
//
// The Next.js internationalization guide reaches for `negotiator` +
// `@formatjs/intl-localematcher` for this step. Both were deliberately left
// out: the whole of RFC 9110 §12.5.4 that we actually need is "split on commas,
// read the q-value, sort descending", and matching a short, closed list of
// language-only tags ('en', 'de', …) needs nothing more than a primary-subtag
// comparison. Adding two runtime dependencies to avoid ~40 lines that are
// covered by unit tests was not a good trade.
//
// If the supported set ever grows region-specific variants that must be told
// apart (e.g. 'pt-BR' vs 'pt-PT', or 'zh-Hans' vs 'zh-Hant'), revisit this:
// proper RFC 4647 lookup with script/region fallback is where a library starts
// to earn its place.

import { DEFAULT_LOCALE, isLocale, LOCALES, type Locale } from './config';

interface LanguageRange {
  tag: string;
  quality: number;
}

/**
 * Parses an `Accept-Language` header into language tags ordered by preference,
 * most preferred first. Ranges with `q=0` are dropped: per the spec they mean
 * "not acceptable", not "acceptable but last".
 */
export function parseAcceptLanguage(header: string | null | undefined): string[] {
  if (!header) return [];

  const ranges: LanguageRange[] = [];

  for (const part of header.split(',')) {
    const [rawTag, ...params] = part.trim().split(';');
    const tag = rawTag.trim().toLowerCase();
    if (!tag) continue;

    // Default quality is 1 when no q parameter is present.
    let quality = 1;
    for (const param of params) {
      const [key, value] = param.split('=').map((s) => s.trim().toLowerCase());
      if (key !== 'q') continue;
      const parsed = Number.parseFloat(value);
      quality = Number.isFinite(parsed) ? parsed : 0;
    }

    if (quality <= 0) continue;
    ranges.push({ tag, quality });
  }

  // Array.prototype.sort is stable in every engine we target, so equal
  // q-values keep the order the browser sent them in — which is the order the
  // reader put them in, in their OS language settings.
  return ranges.sort((a, b) => b.quality - a.quality).map((range) => range.tag);
}

/**
 * Picks the best supported locale for a list of requested language tags.
 *
 * Matching is, in order: an exact tag match, then a primary-subtag match
 * (`de-AT` and `de-CH` both resolve to `de`), then the fallback. A wildcard
 * range (`*`) resolves to the fallback rather than to an arbitrary locale.
 */
export function matchLocale(
  requested: readonly string[],
  supported: readonly Locale[] = LOCALES,
  fallback: Locale = DEFAULT_LOCALE
): Locale {
  for (const tag of requested) {
    if (tag === '*') return fallback;

    const normalized = tag.toLowerCase();
    const exact = supported.find((locale) => locale.toLowerCase() === normalized);
    if (exact) return exact;

    const primary = normalized.split('-')[0];
    const byPrimary = supported.find((locale) => locale.toLowerCase().split('-')[0] === primary);
    if (byPrimary) return byPrimary;
  }

  return fallback;
}

/**
 * Resolves the locale for a request that carries no locale in its path.
 *
 * An explicit choice always wins: the cookie is only ever written by the
 * language switcher, so if it holds a supported locale the reader picked it and
 * we must not second-guess them with `Accept-Language`.
 */
export function resolveLocale(options: {
  cookieLocale?: string | null;
  acceptLanguage?: string | null;
}): Locale {
  if (isLocale(options.cookieLocale)) return options.cookieLocale;
  return matchLocale(parseAcceptLanguage(options.acceptLanguage));
}
