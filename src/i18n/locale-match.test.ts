// src/i18n/locale-match.test.ts
//
// These cover the code that exists instead of `negotiator` and
// `@formatjs/intl-localematcher` (see the note at the top of locale-match.ts).
// They are the justification for not taking those dependencies, so they need to
// be thorough about the header shapes browsers actually send.

import { describe, expect, it } from 'vitest';
import { matchLocale, parseAcceptLanguage, resolveLocale } from './locale-match';

describe('parseAcceptLanguage', () => {
  it('returns nothing for a missing header', () => {
    expect(parseAcceptLanguage(null)).toEqual([]);
    expect(parseAcceptLanguage(undefined)).toEqual([]);
    expect(parseAcceptLanguage('')).toEqual([]);
  });

  it('reads a single tag', () => {
    expect(parseAcceptLanguage('de')).toEqual(['de']);
  });

  it('orders by q-value, highest first', () => {
    expect(parseAcceptLanguage('en;q=0.5,de;q=0.9,fr;q=0.7')).toEqual(['de', 'fr', 'en']);
  });

  it('treats a missing q as 1', () => {
    expect(parseAcceptLanguage('de-AT,de;q=0.9,en;q=0.8')).toEqual(['de-at', 'de', 'en']);
  });

  it('keeps the browser order for equal q-values', () => {
    expect(parseAcceptLanguage('fr,de,en')).toEqual(['fr', 'de', 'en']);
  });

  it('drops q=0, which means "not acceptable"', () => {
    expect(parseAcceptLanguage('de;q=0,en;q=0.5')).toEqual(['en']);
  });

  it('tolerates whitespace and odd casing', () => {
    expect(parseAcceptLanguage('  DE-CH ; Q=0.8 ,  EN ')).toEqual(['en', 'de-ch']);
  });

  it('treats an unparseable q as not acceptable rather than as 1', () => {
    expect(parseAcceptLanguage('de;q=banana,en')).toEqual(['en']);
  });
});

describe('matchLocale', () => {
  it('prefers an exact match', () => {
    expect(matchLocale(['de', 'en'])).toBe('de');
  });

  it('falls back to the primary subtag', () => {
    expect(matchLocale(['de-AT'])).toBe('de');
    expect(matchLocale(['en-GB'])).toBe('en');
  });

  it('skips languages it does not support', () => {
    expect(matchLocale(['ja', 'ko', 'de'])).toBe('de');
  });

  it('returns the default when nothing matches', () => {
    expect(matchLocale(['ja', 'ko'])).toBe('en');
    expect(matchLocale([])).toBe('en');
  });

  it('resolves a wildcard to the default rather than an arbitrary locale', () => {
    expect(matchLocale(['*'])).toBe('en');
  });

  it('honours a custom supported set and fallback', () => {
    expect(matchLocale(['en'], ['de'], 'de')).toBe('de');
  });
});

describe('resolveLocale', () => {
  it('lets an explicit cookie choice beat the browser header', () => {
    expect(resolveLocale({ cookieLocale: 'de', acceptLanguage: 'en-US,en;q=0.9' })).toBe('de');
    expect(resolveLocale({ cookieLocale: 'en', acceptLanguage: 'de' })).toBe('en');
  });

  it('ignores a cookie holding an unsupported or junk value', () => {
    expect(resolveLocale({ cookieLocale: 'ja', acceptLanguage: 'de' })).toBe('de');
    expect(resolveLocale({ cookieLocale: '../etc/passwd', acceptLanguage: 'de' })).toBe('de');
  });

  it('negotiates from the header when there is no cookie', () => {
    expect(resolveLocale({ acceptLanguage: 'de-DE,de;q=0.9,en;q=0.5' })).toBe('de');
    expect(resolveLocale({ acceptLanguage: 'en-AU,en;q=0.9' })).toBe('en');
  });

  it('falls back to the default with neither signal', () => {
    expect(resolveLocale({})).toBe('en');
  });
});
