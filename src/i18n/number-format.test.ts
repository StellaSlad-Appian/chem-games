// src/i18n/number-format.test.ts
//
// Dates, numbers and percentages are the quiet half of localisation: nothing
// about them is a *string*, so no parity gate in this directory can see them,
// and a page can be word-perfect in five languages while writing every date
// the American way.
//
// Three of these were live on the site. The privacy page's effective date was
// the literal English "14 September 2026", so the German page read "Gültig ab:
// 14 September 2026". The leaderboard formatted with a bare `en`, which CLDR
// resolves to en-US, so an Australian site wrote "Sep 14, 2026". And two
// percentages were `${n}%` template literals, which is correct punctuation in
// exactly one of the five languages.

import { describe, expect, it } from 'vitest';
import { LOCALES, formattingLocale } from './config';
import { formatPercent } from './format';

describe('formattingLocale', () => {
  it('covers every shipped locale', () => {
    for (const locale of LOCALES) expect(formattingLocale(locale)).toBeTruthy();
  });

  it('formats English as Australian, not American', () => {
    // A bare `en` is en-US in CLDR. This site spells *neutralise*, cites the
    // Victorian Curriculum and answers to the OAIC, so its dates are
    // day-first. This is the assertion that catches someone "simplifying"
    // FORMATTING_LOCALE back to the locale code.
    expect(formattingLocale('en')).toBe('en-AU');

    const date = new Date('2026-09-14T00:00:00Z');
    const long = (tag: string) =>
      new Intl.DateTimeFormat(tag, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
      }).format(date);

    expect(long(formattingLocale('en'))).toBe('14 September 2026');
    expect(long('en')).toBe('September 14, 2026'); // what it used to render
  });

  it('gives each locale its own date order and month name', () => {
    const date = new Date('2026-09-14T00:00:00Z');
    const long = (locale: (typeof LOCALES)[number]) =>
      new Intl.DateTimeFormat(formattingLocale(locale), {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
      }).format(date);

    expect(long('de')).toBe('14. September 2026');
    expect(long('fr')).toBe('14 septembre 2026');
    expect(long('es')).toBe('14 de septiembre de 2026');
    expect(long('it')).toBe('14 settembre 2026');

    // And the reason this file exists: Russian needs a Cyrillic month name and
    // a trailing "г.", neither of which any amount of translated copy supplies.
    expect(
      new Intl.DateTimeFormat('ru', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
      }).format(date)
    ).toBe('14 сентября 2026 г.');
  });

  it('gives each locale its own thousands and decimal separators', () => {
    expect((12345.6).toLocaleString(formattingLocale('en'))).toBe('12,345.6');
    expect((12345.6).toLocaleString(formattingLocale('de'))).toBe('12.345,6');
    expect((12345.6).toLocaleString(formattingLocale('it'))).toBe('12.345,6');
    // Russian: a no-break space for thousands (U+00A0 — French uses the
    // *narrow* no-break space U+202F for the same job, which is the kind of
    // detail no translator should be asked to get right by hand) and a comma
    // for the decimal. Task 6's typography gate asserts the comma from the
    // copy's side.
    expect((12345.6).toLocaleString('ru')).toBe('12 345,6');
    expect((12345.6).toLocaleString('fr')).toBe('12 345,6');
  });
});

describe('formatPercent', () => {
  it('puts no space before the sign in English', () => {
    expect(formatPercent('en', 85)).toBe('85%');
  });

  it('puts a no-break space before the sign where the language wants one', () => {
    // U+00A0, not a plain space. This is the whole point: `${85}%` is wrong
    // in four of the six languages this site will ship, and it looks fine in
    // review either way, because the difference is one invisible character.
    expect(formatPercent('de', 85)).toBe('85 %');
    expect(formatPercent('fr', 85)).toBe('85 %');
    expect(new Intl.NumberFormat('ru', { style: 'percent' }).format(0.85)).toBe('85 %');
  });

  it('rounds to whole percent by default and keeps 0 at 0', () => {
    expect(formatPercent('en', 0)).toBe('0%');
    expect(formatPercent('en', 100)).toBe('100%');
  });
});
