// src/components/cheat-sheets/YearFilter.test.tsx

import { describe, expect, it } from 'vitest';
import { yearFilterOptions } from './YearFilter';
import { CHEAT_SHEETS } from '@/lib/cheat-sheet-data';
import type { CheatSheetTopic, YearLevel } from '@/core-engine/types/general';

/** The fields `yearFilterOptions` reads; the rest of the topic is irrelevant. */
function sheetAt(yearLevel: YearLevel): CheatSheetTopic {
  return { yearLevel } as CheatSheetTopic;
}

describe('yearFilterOptions', () => {
  it('offers only the years that have a sheet', () => {
    expect(yearFilterOptions([sheetAt('Year 9'), sheetAt('Senior')])).toEqual([
      'All',
      'Year 9',
      'Senior',
    ]);
  });

  it('keeps the canonical order regardless of the order the sheets arrive in', () => {
    const shuffled = [sheetAt('Senior'), sheetAt('Year 10'), sheetAt('Year 7'), sheetAt('Year 9')];
    expect(yearFilterOptions(shuffled)).toEqual([
      'All',
      'Year 7',
      'Year 9',
      'Year 10',
      'Senior',
    ]);
  });

  it('does not repeat a year that several sheets share', () => {
    const options = yearFilterOptions([sheetAt('Year 10'), sheetAt('Year 10'), sheetAt('Year 10')]);
    expect(options).toEqual(['All', 'Year 10']);
  });

  it('still offers All when nothing matches, so the reader is never stranded', () => {
    expect(yearFilterOptions([])).toEqual(['All']);
  });

  it('offers Year 7 and Year 8 as soon as a sheet exists for them', () => {
    // The guard against this fix rotting into a hardcoded exclusion: the two
    // years are absent because no sheet claims them, not because they are
    // special-cased anywhere.
    const options = yearFilterOptions([sheetAt('Year 7'), sheetAt('Year 8')]);
    expect(options).toEqual(['All', 'Year 7', 'Year 8']);
  });

  describe('against the live sheet data', () => {
    const options = yearFilterOptions(CHEAT_SHEETS);

    it('offers no year that would produce an empty grid', () => {
      for (const year of options) {
        if (year === 'All') continue;
        expect(
          CHEAT_SHEETS.filter((sheet) => sheet.yearLevel === year).length,
          `the ${year} filter is offered but matches no sheet`
        ).toBeGreaterThan(0);
      }
    });

    it('offers every year that has a sheet', () => {
      for (const sheet of CHEAT_SHEETS) {
        expect(options, `${sheet.slug} is ${sheet.yearLevel}, which is not offered`).toContain(
          sheet.yearLevel
        );
      }
    });

    it('does not offer Year 7 or Year 8 today', () => {
      // Descriptive, not prescriptive. If this fails because a Year 7 or Year 8
      // sheet was written, delete the assertion -- the two above are the ones
      // that encode the actual rule.
      expect(options).not.toContain('Year 7');
      expect(options).not.toContain('Year 8');
    });
  });
});
