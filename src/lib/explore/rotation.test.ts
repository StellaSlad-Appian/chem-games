// src/lib/explore/rotation.test.ts
//
// AC-4. Every case here passes a fixed date, because that is the whole point of
// the module taking `now` as a parameter.

import { describe, expect, it } from 'vitest';
import {
  ROTATION_EPOCH,
  selectForWeek,
  selectIndex,
  weekIndex,
  weekStart,
} from './rotation';

const at = (iso: string) => new Date(iso);

describe('weekIndex', () => {
  it('is 0 at the epoch instant', () => {
    expect(weekIndex(new Date(ROTATION_EPOCH))).toBe(0);
    expect(weekIndex(at('2026-01-05T00:00:00.000Z'))).toBe(0);
  });

  it('stays 0 for the whole epoch week', () => {
    expect(weekIndex(at('2026-01-05T00:00:00.001Z'))).toBe(0);
    expect(weekIndex(at('2026-01-08T13:45:00.000Z'))).toBe(0);
    expect(weekIndex(at('2026-01-11T23:59:59.999Z'))).toBe(0);
  });

  // The boundary, stated the way AC-4 states it: the last instant of Sunday and
  // the first instant of Monday are different weeks.
  it('turns over at Monday 00:00 UTC and not a millisecond earlier', () => {
    expect(weekIndex(at('2026-01-11T23:59:59.999Z'))).toBe(0);
    expect(weekIndex(at('2026-01-12T00:00:00.000Z'))).toBe(1);
  });

  it('counts whole weeks forward', () => {
    expect(weekIndex(at('2026-01-12T00:00:00.000Z'))).toBe(1);
    expect(weekIndex(at('2026-09-21T00:00:00.000Z'))).toBe(37);
    expect(weekIndex(at('2027-01-04T00:00:00.000Z'))).toBe(52);
  });

  it('goes negative before the epoch rather than clamping', () => {
    expect(weekIndex(at('2026-01-04T23:59:59.999Z'))).toBe(-1);
    expect(weekIndex(at('2025-12-29T00:00:00.000Z'))).toBe(-1);
    expect(weekIndex(at('2025-12-28T23:59:59.999Z'))).toBe(-2);
  });

  // A UTC boundary is immune to daylight saving by construction; this pins it
  // so nobody "helpfully" reintroduces a local-time calculation later. The EU
  // moved its clocks on Sunday 29 March 2026 and the US on Sunday 8 March 2026;
  // neither is a Monday, so neither may shift a week boundary.
  it('is unaffected by daylight saving transitions', () => {
    expect(weekIndex(at('2026-03-29T00:30:00.000Z'))).toBe(weekIndex(at('2026-03-27T00:30:00.000Z')));
    expect(weekIndex(at('2026-03-08T07:30:00.000Z'))).toBe(weekIndex(at('2026-03-06T07:30:00.000Z')));

    // And the week still turns over on the Monday either side of the change.
    expect(weekIndex(at('2026-03-30T00:00:00.000Z'))).toBe(
      weekIndex(at('2026-03-29T00:00:00.000Z')) + 1
    );
  });

  // 2028 is a leap year: 29 February 2028 falls on a Tuesday, so the week that
  // contains it is one week long like any other and the extra day must not
  // shift anything.
  it('handles a leap day without gaining or losing a week', () => {
    const beforeLeapWeek = weekIndex(at('2028-02-28T00:00:00.000Z')); // Monday
    expect(weekIndex(at('2028-02-29T12:00:00.000Z'))).toBe(beforeLeapWeek);
    expect(weekIndex(at('2028-03-05T23:59:59.999Z'))).toBe(beforeLeapWeek);
    expect(weekIndex(at('2028-03-06T00:00:00.000Z'))).toBe(beforeLeapWeek + 1);

    // 2028-01-03 is the first Monday of 2028; two whole years of weeks from the
    // epoch is 104 weeks, and 2026-01-05 + 104 weeks lands there exactly.
    expect(weekIndex(at('2028-01-03T00:00:00.000Z'))).toBe(104);
  });
});

describe('weekStart', () => {
  it('is the Monday 00:00 UTC of the containing week', () => {
    expect(weekStart(at('2026-09-24T18:03:11.000Z')).toISOString()).toBe(
      '2026-09-21T00:00:00.000Z'
    );
    expect(weekStart(at('2026-09-21T00:00:00.000Z')).toISOString()).toBe(
      '2026-09-21T00:00:00.000Z'
    );
    expect(weekStart(at('2026-09-20T23:59:59.999Z')).toISOString()).toBe(
      '2026-09-14T00:00:00.000Z'
    );
  });

  it('always lands on a Monday, for a year of sampled dates', () => {
    for (let day = 0; day < 365; day += 1) {
      const now = new Date(Date.UTC(2026, 0, 1) + day * 24 * 60 * 60 * 1000);
      expect(weekStart(now).getUTCDay()).toBe(1);
      expect(weekStart(now).getTime() % 1000).toBe(0);
    }
  });
});

describe('selectIndex', () => {
  it('wraps past the end of the pool', () => {
    expect(selectIndex(at('2026-01-05T00:00:00.000Z'), 20)).toBe(0);
    expect(selectIndex(at('2026-05-18T00:00:00.000Z'), 20)).toBe(19); // week 19
    expect(selectIndex(at('2026-05-25T00:00:00.000Z'), 20)).toBe(0); // week 20 wraps
    expect(selectIndex(at('2026-06-01T00:00:00.000Z'), 20)).toBe(1);
  });

  it('never returns a negative index before the epoch', () => {
    for (let week = -60; week < 0; week += 1) {
      const now = new Date(ROTATION_EPOCH + week * 7 * 24 * 60 * 60 * 1000);
      const index = selectIndex(now, 20);
      expect(index).toBeGreaterThanOrEqual(0);
      expect(index).toBeLessThan(20);
    }
  });

  it('works for a pool of one', () => {
    expect(selectIndex(at('2026-01-05T00:00:00.000Z'), 1)).toBe(0);
    expect(selectIndex(at('2029-11-13T09:00:00.000Z'), 1)).toBe(0);
  });

  it('refuses an empty pool rather than returning undefined later', () => {
    expect(() => selectIndex(at('2026-01-05T00:00:00.000Z'), 0)).toThrow(/at least one entry/);
    expect(() => selectIndex(at('2026-01-05T00:00:00.000Z'), -1)).toThrow(/at least one entry/);
  });
});

describe('selectForWeek', () => {
  const pool = ['a', 'b', 'c'] as const;

  it('cycles with a period equal to the pool length', () => {
    const weeks = Array.from({ length: 7 }, (_, week) =>
      selectForWeek(pool, new Date(ROTATION_EPOCH + week * 7 * 24 * 60 * 60 * 1000))
    );
    expect(weeks).toEqual(['a', 'b', 'c', 'a', 'b', 'c', 'a']);
  });

  it('always returns an entry — never undefined — across four years of weeks', () => {
    for (let week = -104; week < 104; week += 1) {
      const now = new Date(ROTATION_EPOCH + week * 7 * 24 * 60 * 60 * 1000);
      expect(pool).toContain(selectForWeek(pool, now));
    }
  });

  it('shows the same entry for every instant within one week', () => {
    const monday = at('2026-02-02T00:00:00.000Z');
    const sunday = at('2026-02-08T23:59:59.999Z');
    expect(selectForWeek(pool, monday)).toBe(selectForWeek(pool, sunday));
  });
});
