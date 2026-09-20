// src/i18n/explore-dates.ts
//
// The two date formats Explore uses, in one place.
//
// They were inline in `explore/page.tsx` while there was one Explore page.
// There are now four — the week, the archive index and two permalink routes —
// and a date formatted a second way on one of them would look like a bug to a
// reader and be invisible to a test.
//
// `formattingLocale(locale)`, **never** the raw locale.
// `Intl.DateTimeFormat('en', …)` resolves to en-US and writes
// "September 21, 2026" on a site that spells things *neutralise*, cites the
// Victorian Curriculum and answers to the OAIC. See the comment on
// `FORMATTING_LOCALE` in src/i18n/config.ts; this is the map every feature that
// formats a date has to reach for.
//
// `timeZone: 'UTC'` because the week boundary is UTC (see `rotation.ts`).
// Without it a reader whose machine is behind UTC is shown the previous day's
// date on the Monday itself.

import { formattingLocale, type Locale } from './config';

/** A week's Monday, spelled out: "21 September 2026", "21. September 2026". */
export function formatWeekDate(locale: Locale, date: Date): string {
  return new Intl.DateTimeFormat(formattingLocale(locale), {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

/** A provenance date from an ISO string, abbreviated: "19 Sept 2026". */
export function formatShortDate(locale: Locale, isoDate: string): string {
  return new Intl.DateTimeFormat(formattingLocale(locale), {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${isoDate}T00:00:00Z`));
}

/** The `datetime` attribute for a `<time>`: an ISO calendar date, never localized. */
export const isoDay = (date: Date): string => date.toISOString().slice(0, 10);
