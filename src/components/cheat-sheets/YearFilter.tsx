// src/components/cheat-sheets/YearFilter.tsx
'use client';

import type { CheatSheetTopic, YearLevel } from '@/core-engine/types/general';
import { useI18n } from '@/i18n/client';

export type YearFilterOption = 'All' | YearLevel;

// Values, not labels: these are compared against `sheet.yearLevel`, which is
// canonical English. The dictionary maps each one to its label.
//
// This is the ORDER, not the offer. Which of these a reader actually sees is
// derived from the sheets that exist — see `yearFilterOptions`.
const YEAR_ORDER: YearFilterOption[] = ['All', 'Year 7', 'Year 8', 'Year 9', 'Year 10', 'Senior'];

/**
 * The year buttons to show, given the sheets on the page.
 *
 * Only years that have at least one sheet are offered. A filter that can return
 * nothing is not a filter, it is a dead end: pressing "Year 7" emptied the grid
 * and told the reader the site had no Year 7 content in the least helpful way
 * available — after a click, with no way to tell a filter miss from a broken
 * page.
 *
 * Derived rather than hardcoded so it cannot go stale in either direction. The
 * day a Year 7 sheet is added the button appears on its own, and the day the
 * last Year 9 sheet is retitled to something else the button leaves. That also
 * means there is nothing here to remember to update, which is the part a
 * hardcoded list gets wrong.
 *
 * 'All' is always offered, even with one year present, because it is the reset
 * and its absence would strand a reader on whatever they last pressed.
 *
 * Note this is NOT the same list as `YEAR_LEVEL_OPTIONS` in
 * src/lib/validation/profile.ts. A student in Year 7 can say so on their
 * profile whether or not any sheet is written for them yet; that list is about
 * the reader, this one is about the content.
 */
export function yearFilterOptions(sheets: readonly CheatSheetTopic[]): YearFilterOption[] {
  return yearFilterOptionsFrom(sheets.map((sheet) => sheet.yearLevel));
}

/**
 * The same offer, from bare year levels rather than from sheets.
 *
 * The games hub needs this: a game carries `yearLevels` (plural — `neutralise`
 * is both Year 9 and Year 10), so there is no single `.yearLevel` to read. The
 * rule above is unchanged and is worth keeping in one place, because "only
 * offer a filter that can return something" is the part that is easy to lose.
 */
export function yearFilterOptionsFrom(levels: Iterable<YearLevel>): YearFilterOption[] {
  const present = new Set<string>(levels);
  return YEAR_ORDER.filter((year) => year === 'All' || present.has(year));
}

const LABEL_KEY = {
  All: 'all',
  'Year 7': 'Year 7',
  'Year 8': 'Year 8',
  'Year 9': 'Year 9',
  'Year 10': 'Year 10',
  Senior: 'Senior',
} as const;

export function YearFilter({
  years,
  selectedYear,
  onSelectYear,
  label,
}: {
  /** From `yearFilterOptions`, so the offer follows the sheets that exist. */
  years: readonly YearFilterOption[];
  selectedYear: string;
  onSelectYear: (year: string) => void;
  /**
   * Accessible name for the button group. Defaults to the cheat-sheet wording,
   * which is where this component started; the games hub passes its own, so a
   * screen-reader user on that page is not told they are filtering sheets.
   */
  label?: string;
}) {
  const { t } = useI18n();
  return (
    <div
      className="flex flex-wrap items-center gap-2"
      role="group"
      aria-label={label ?? t.cheatSheets.filterA11y}
    >
      {years.map((year) => {
        const isActive = selectedYear === year;
        return (
          <button
            key={year}
            type="button"
            onClick={() => onSelectYear(year)}
            aria-pressed={isActive}
            className={`cursor-pointer rounded-xl px-4 py-2 text-xs font-black transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--link) ${
              isActive
                ? 'bg-(--action) text-white shadow-md'
                : 'border border-(--border) bg-(--surface) text-muted hover:text-(--foreground)'
            }`}
          >
            {t.yearLevels[LABEL_KEY[year]]}
          </button>
        );
      })}
    </div>
  );
}