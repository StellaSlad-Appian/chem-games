// src/i18n/explore-dates.test.ts
//
// The date helpers, and the gate that would have caught the bug they were
// extracted during.
//
// ## The doubled full stop
//
// `Intl.DateTimeFormat('ru', { month: 'long', … })` writes «19 сентября 2026 г.»
// — a long date that already ends in an abbreviation's own full stop. Every
// Russian Explore string that interpolated a date and then closed the sentence
// rendered «… 2026 г..» on the live page, in every week, and **nothing failed**:
//
//   * the parity gates see a non-empty, translated, correctly-placeholdered
//     string, which it is;
//   * `cyrillic.test.ts` checks typography, but for ellipses, quotation marks
//     and ё — not for a doubled stop;
//   * no test anywhere rendered a dictionary pattern with a real date in it.
//
// It was found by looking at the rendered page in Russian at 320px. The test
// below is the gate that was missing: it interpolates a real date into every
// `explore` string that takes one, in every locale, and fails on any doubled
// punctuation. It is locale-general on purpose — Russian is the locale that has
// the problem today, and the next locale with an abbreviated era or an ordinal
// marker would have it tomorrow.

import { describe, expect, it } from 'vitest';
import { formatShortDate, formatWeekDate, isoDay } from './explore-dates';
import { format, placeholdersIn } from './format';
import { getDictionary } from './dictionaries';
import { LOCALES, type Locale } from './config';
import { flatten } from '@/test-utils/i18n-parity';

/** A Monday, mid-year, with a long month name in every locale. */
const MONDAY = new Date('2026-09-21T00:00:00.000Z');

describe('formatWeekDate', () => {
  it('formats through formattingLocale, not the raw locale', async () => {
    // `Intl.DateTimeFormat('en')` resolves to en-US and writes
    // "September 21, 2026" on a site that spells things *neutralise*.
    expect(formatWeekDate('en', MONDAY)).toBe('21 September 2026');
    expect(formatWeekDate('en', MONDAY)).not.toContain(',');
  });

  it('is in the reader’s language', () => {
    const rendered = LOCALES.map((locale) => formatWeekDate(locale, MONDAY));
    // Six locales, and no two of them spell September the same way by accident.
    expect(new Set(rendered).size).toBeGreaterThan(3);
    expect(formatWeekDate('de', MONDAY)).toContain('September');
    expect(formatWeekDate('fr', MONDAY)).toContain('septembre');
    expect(formatWeekDate('ru', MONDAY)).toContain('сентября');
  });

  it('reads the week in UTC, so the Monday is not the Sunday before it', () => {
    // Without `timeZone: 'UTC'` a machine behind UTC renders the previous day
    // on the Monday itself, which is the one day the dateline has to be right.
    expect(formatWeekDate('en', MONDAY)).toContain('21');
    expect(isoDay(MONDAY)).toBe('2026-09-21');
  });
});

describe('formatShortDate', () => {
  it('turns an ISO provenance date into the reader’s short form', () => {
    expect(formatShortDate('en', '2026-09-19')).toContain('2026');
    expect(formatShortDate('en', '2026-09-19')).toContain('19');
  });
});

describe('a date dropped into a dictionary pattern', () => {
  // Every `explore` string that interpolates a date, in every locale, with a
  // real formatted date in it.
  it.each(LOCALES)('leaves no doubled punctuation in %s', async (locale: Locale) => {
    const t = await getDictionary(locale);
    const week = formatWeekDate(locale, MONDAY);
    const short = formatShortDate(locale, '2026-09-19');

    const offenders: string[] = [];

    for (const entry of flatten(t.explore)) {
      const placeholders = placeholdersIn(entry.value);
      if (!placeholders.includes('date') && !placeholders.includes('nextDate')) continue;

      for (const sample of [week, short]) {
        const rendered = format(entry.value, {
          date: sample,
          nextDate: formatWeekDate(locale, new Date('2027-02-08T00:00:00.000Z')),
        });

        // «… 2026 г..» — an abbreviation's stop plus the sentence's own.
        if (/\.\./.test(rendered)) offenders.push(`explore.${entry.path}: ${rendered}`);
        // The same mistake with the other marks a locale might end on.
        if (/[,;:]\s*[.,;:]/.test(rendered)) offenders.push(`explore.${entry.path}: ${rendered}`);
      }
    }

    expect(
      offenders,
      'A date already ends in punctuation in some locales — Russian writes ' +
        '«19 сент. 2026 г.» — so a pattern that closes the sentence itself ' +
        'renders two stops. Drop the pattern’s own punctuation in that locale ' +
        'rather than changing how the date is formatted.\n\n' +
        offenders.join('\n')
    ).toEqual([]);
  });
});
