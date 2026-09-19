// src/lib/explore/freshness.test.ts
//
// AC-9. A build that goes red on a date is a reminder mechanism, not an
// accident — but only if the message says so. Whoever hits this in 2030 will
// have no idea what it is unless the failure explains itself, and the thing
// they will do with an unexplained red test is delete it.
//
// So every assertion here fails with the entry ids and the sentence that tells
// the reader what to do about them.

import { describe, expect, it } from 'vitest';
import { EXPLORE_MOLECULES } from './molecules';
import { EXPLORE_SCIENTISTS } from './scientists';
import type { ExploreProvenance } from './types';

/**
 * 3.5 years, not 4.
 *
 * The owner's mark is four years. Failing at 3.5 leaves half a year of runway
 * to actually do the review, instead of a surprise red build on the morning it
 * becomes overdue.
 */
const MAX_AGE_YEARS = 3.5;
const MAX_AGE_MS = MAX_AGE_YEARS * 365.25 * 24 * 60 * 60 * 1000;

interface Dated extends ExploreProvenance {
  id: string;
}

const ALL: Dated[] = [...EXPLORE_MOLECULES, ...EXPLORE_SCIENTISTS];

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function overdue(field: 'reviewedOn' | 'sourcesVerifiedOn', now: Date): string[] {
  return ALL.filter((entry) => entry.isActive)
    .filter((entry) => now.getTime() - Date.parse(entry[field]) > MAX_AGE_MS)
    .map((entry) => `${entry.id} (${field} ${entry[field]})`);
}

describe('every entry carries its dates', () => {
  it.each(ALL.map((entry) => [entry.id, entry] as const))(
    '%s has three ISO dates and an isActive flag',
    (_id, entry) => {
      expect(entry.writtenOn).toMatch(ISO_DATE);
      expect(entry.reviewedOn).toMatch(ISO_DATE);
      expect(entry.sourcesVerifiedOn).toMatch(ISO_DATE);
      expect(typeof entry.isActive).toBe('boolean');
    }
  );

  it('never claims to have been reviewed before it was written', () => {
    const impossible = ALL.filter(
      (entry) =>
        Date.parse(entry.reviewedOn) < Date.parse(entry.writtenOn) ||
        Date.parse(entry.sourcesVerifiedOn) < Date.parse(entry.writtenOn)
    ).map((entry) => entry.id);
    expect(impossible).toEqual([]);
  });

  it('is not dated in the future', () => {
    const now = Date.now();
    const future = ALL.filter((entry) => Date.parse(entry.writtenOn) > now).map((e) => e.id);
    expect(future).toEqual([]);
  });
});

describe('the 3.5-year review clock', () => {
  it('has no active entry whose chemistry is overdue for a re-read', () => {
    const stale = overdue('reviewedOn', new Date());
    expect(
      stale,
      stale.length === 0
        ? ''
        : [
            '',
            `These Explore entries have not been reviewed in ${MAX_AGE_YEARS} years:`,
            ...stale.map((entry) => `  - ${entry}`),
            '',
            'This test is a deliberate reminder, not a bug. Re-read each entry against',
            'its sources: check the chemistry is still correct, that nothing has been',
            'superseded, and that the entry still reads at about age 12. Then set',
            '`reviewedOn` to today in src/lib/explore/molecules.ts or scientists.ts.',
            'If an entry is no longer worth keeping, set `isActive: false` instead —',
            'that retires it without disturbing its id or the archive URLs.',
            'Do not raise MAX_AGE_YEARS to make this pass.',
            '',
          ].join('\n')
    ).toEqual([]);
  });

  it('has no active entry whose source links are overdue for a check', () => {
    const stale = overdue('sourcesVerifiedOn', new Date());
    expect(
      stale,
      stale.length === 0
        ? ''
        : [
            '',
            `These Explore entries' source URLs have not been checked in ${MAX_AGE_YEARS} years:`,
            ...stale.map((entry) => `  - ${entry}`),
            '',
            'Open every `sources` URL on those entries. A link that 404s or has been',
            'redirected to a marketing page is worse than no link, because the entry',
            'still claims to be sourced. Replace what has rotted, then set',
            '`sourcesVerifiedOn` to today.',
            '',
          ].join('\n')
    ).toEqual([]);
  });

  // The clock itself, tested against a fixed date rather than by waiting four
  // years to find out whether it works.
  it('would fire on an entry that is four years old', () => {
    const fourYearsOn = new Date(Date.parse('2026-09-19') + 4 * 365.25 * 24 * 60 * 60 * 1000);
    expect(overdue('reviewedOn', fourYearsOn).length).toBeGreaterThan(0);
  });

  it('would not fire on an entry that is three years old', () => {
    const threeYearsOn = new Date(Date.parse('2026-09-19') + 3 * 365.25 * 24 * 60 * 60 * 1000);
    expect(overdue('reviewedOn', threeYearsOn)).toEqual([]);
  });

  it('ignores retired entries, which is what isActive is for', () => {
    const longAgo: Dated = {
      id: 'retired-example',
      writtenOn: '2000-01-01',
      reviewedOn: '2000-01-01',
      sourcesVerifiedOn: '2000-01-01',
      sources: [{ label: 'example', url: 'https://example.org' }],
      isActive: false,
    };
    // Same predicate, applied directly, so the exemption is tested rather than
    // assumed from the absence of a failure.
    const isOverdue =
      longAgo.isActive && Date.now() - Date.parse(longAgo.reviewedOn) > MAX_AGE_MS;
    expect(isOverdue).toBe(false);
  });
});
