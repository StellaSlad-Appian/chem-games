// src/lib/explore/archive.test.ts
//
// The arithmetic behind the archive, with the clock pinned.
//
// Two things here are worth more than the rest of the file put together:
//
//   1. **The small cases.** 0, 1 and 9 past weeks happen once each, in the
//      site's first two months, and then never again. Ten is the case that
//      works by accident. Every one of them is pinned below.
//   2. **The wrap.** With twenty pairs, week 11 and week 31 are the same pair.
//      A recent list that shows both is showing a reader the same entry twice
//      and dating one of them wrongly, and an entry page that says "the week of
//      X" is lying the second time round.

import { describe, expect, it } from 'vitest';
import {
  archiveRotation,
  entryRotation,
  pairForEntry,
  recentWeeks,
  RECENT_WEEKS_LIMIT,
  rotationFor,
  schedulablePairs,
} from './archive';
import { ROTATION_EPOCH, weekIndex } from './rotation';
import { EXPLORE_SCHEDULE } from './schedule';

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

/** Monday 00:00 UTC of week `n`; negative `n` is before the epoch. */
const mondayOfWeek = (n: number) => new Date(ROTATION_EPOCH + n * WEEK_MS);
/** A Thursday inside week `n`, so nothing depends on a boundary instant. */
const midWeek = (n: number) => new Date(ROTATION_EPOCH + n * WEEK_MS + 3 * 24 * 60 * 60 * 1000);

const POOL = schedulablePairs().length;

describe('schedulablePairs', () => {
  it('is the whole schedule while every entry is active', () => {
    expect(POOL).toBe(EXPLORE_SCHEDULE.length);
  });

  it('numbers the pairs by their position in the cycle, with no gaps', () => {
    expect(schedulablePairs().map((pair) => pair.rotationIndex)).toEqual(
      Array.from({ length: POOL }, (_, i) => i)
    );
  });

  it('agrees with the live page about which pair a week shows', () => {
    // The one invariant that matters across the whole feature: the archive and
    // the page derive the week from the same list. If this ever fails, the
    // recent list and the card above it are counting different pools.
    for (const week of [0, 1, 7, 19, 20, 41]) {
      const pairs = schedulablePairs();
      const expected = pairs[weekIndex(midWeek(week)) % pairs.length];
      const rotation = rotationFor(expected, midWeek(week), pairs.length);
      expect(rotation.isCurrentWeek).toBe(true);
    }
  });
});

describe('recentWeeks', () => {
  it.each([
    [0, 0],
    [1, 1],
    [2, 2],
    [9, 9],
    [10, 10],
    [11, 10],
    [200, 10],
  ])('at week %i returns %i past weeks', (week, expected) => {
    expect(recentWeeks(midWeek(week))).toHaveLength(expected);
  });

  it('returns nothing before the epoch rather than negative weeks', () => {
    // `weekIndex` deliberately goes negative rather than clamping, so this is
    // the guard that stops a negative week number reaching `weekStartOfIndex`
    // and producing dates in 2025 on a page about a rotation that had not
    // started.
    for (const week of [-1, -5, -60]) {
      expect(recentWeeks(midWeek(week))).toEqual([]);
    }
  });

  it('is newest first, and never includes the current week', () => {
    const current = weekIndex(midWeek(30));
    const weeks = recentWeeks(midWeek(30));

    expect(weeks.map((w) => w.weekIndex)).toEqual([
      current - 1,
      current - 2,
      current - 3,
      current - 4,
      current - 5,
      current - 6,
      current - 7,
      current - 8,
      current - 9,
      current - 10,
    ]);
  });

  it('dates every row to a Monday 00:00 UTC', () => {
    for (const week of recentWeeks(midWeek(40))) {
      expect(week.weekStart.getUTCDay()).toBe(1);
      expect(week.weekStart.toISOString()).toMatch(/T00:00:00\.000Z$/);
      expect(week.weekStart.getTime()).toBe(mondayOfWeek(week.weekIndex).getTime());
    }
  });

  it('shows no pair twice, across a wrap or anywhere else', () => {
    // Week 37 is seventeen weeks past the first wrap, so the ten-week window
    // straddles it: weeks 27–36 are rotation indices 7–16 and 0–6, and any
    // duplicate would mean the modulo went wrong.
    for (const week of [10, 20, 21, 37, 120]) {
      const ids = recentWeeks(midWeek(week)).map((w) => w.pair.rotationIndex);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it('caps at the pool size when the pool is smaller than the limit', () => {
    // Not reachable with twenty pairs and a limit of ten, and that is the
    // point: the de-duplication is a property of the design rather than of the
    // two numbers currently in the files. A limit above the pool proves it.
    const weeks = recentWeeks(midWeek(200), POOL + 5);
    expect(weeks).toHaveLength(POOL);
    expect(new Set(weeks.map((w) => w.pair.rotationIndex)).size).toBe(POOL);
  });

  it('refuses a nonsense limit rather than looping to the epoch', () => {
    expect(recentWeeks(midWeek(50), 0)).toEqual([]);
    expect(recentWeeks(midWeek(50), -3)).toEqual([]);
  });

  it('shows the ten most recent weeks, not the ten oldest', () => {
    const weeks = recentWeeks(midWeek(100));
    expect(weeks[0].weekIndex).toBe(99);
    expect(weeks.at(-1)!.weekIndex).toBe(90);
    expect(RECENT_WEEKS_LIMIT).toBe(10);
  });
});

describe('entryRotation — what a permalink may say about dates', () => {
  const first = schedulablePairs()[0];
  const third = schedulablePairs()[2];

  it('finds an entry by either half of its pair', () => {
    expect(pairForEntry('molecule', first.molecule.id)?.rotationIndex).toBe(0);
    expect(pairForEntry('scientist', first.scientist.id)?.rotationIndex).toBe(0);
    expect(pairForEntry('molecule', 'not-a-molecule')).toBeNull();
  });

  it('says "not yet" before an entry has ever run', () => {
    // Week 1, asking about the pair scheduled for week 2. Nothing has happened
    // to it, so the page must not date it in the past.
    const rotation = entryRotation('molecule', third.molecule.id, midWeek(1))!;

    expect(rotation.timesFeatured).toBe(0);
    expect(rotation.lastFeatured).toBeNull();
    expect(rotation.nextFeatured.getTime()).toBe(mondayOfWeek(2).getTime());
    expect(rotation.isCurrentWeek).toBe(false);
  });

  it('counts the current week as a run, and marks it', () => {
    const rotation = entryRotation('molecule', third.molecule.id, midWeek(2))!;

    expect(rotation.timesFeatured).toBe(1);
    expect(rotation.lastFeatured!.getTime()).toBe(mondayOfWeek(2).getTime());
    expect(rotation.isCurrentWeek).toBe(true);
    // Still has a next: the rotation never ends, which is why a permalink can
    // always name one.
    expect(rotation.nextFeatured.getTime()).toBe(mondayOfWeek(2 + POOL).getTime());
  });

  it('reports a second run as a second run, not as a first', () => {
    // **The trap.** Week 2 and week 22 are the same pair. A permalink read in
    // week 25 that said "featured in the week of 19 January" would be telling a
    // reader about a week five months before the one that actually happened.
    const rotation = entryRotation('molecule', third.molecule.id, midWeek(POOL + 5))!;

    expect(rotation.timesFeatured).toBe(2);
    expect(rotation.lastFeatured!.getTime()).toBe(mondayOfWeek(2 + POOL).getTime());
    expect(rotation.nextFeatured.getTime()).toBe(mondayOfWeek(2 + 2 * POOL).getTime());
  });

  it('counts every run, for four cycles', () => {
    for (let cycle = 0; cycle < 4; cycle += 1) {
      const rotation = entryRotation('scientist', first.scientist.id, midWeek(cycle * POOL))!;
      expect(rotation.timesFeatured).toBe(cycle + 1);
    }
  });

  it('never claims a run before the epoch', () => {
    const rotation = entryRotation('molecule', first.molecule.id, midWeek(-3))!;

    expect(rotation.timesFeatured).toBe(0);
    expect(rotation.lastFeatured).toBeNull();
    // The rotation's own week 0, not a week three weeks ago.
    expect(rotation.nextFeatured.getTime()).toBe(mondayOfWeek(0).getTime());
  });

  it('gives both halves of a pair the same dates', () => {
    // They are scheduled together, so a reader who opens the molecule and then
    // its chemist must not be told two different things about the same week.
    const now = midWeek(63);
    const molecule = entryRotation('molecule', first.molecule.id, now)!;
    const scientist = entryRotation('scientist', first.scientist.id, now)!;

    expect(scientist.lastFeatured).toEqual(molecule.lastFeatured);
    expect(scientist.nextFeatured).toEqual(molecule.nextFeatured);
    expect(scientist.timesFeatured).toBe(molecule.timesFeatured);
  });

  it('is null for an id that is not in the rotation', () => {
    expect(entryRotation('molecule', 'not-a-molecule', midWeek(5))).toBeNull();
  });
});

describe('archiveRotation', () => {
  it('lists the whole rotation, once each, in order', () => {
    const rows = archiveRotation(midWeek(37));

    expect(rows).toHaveLength(POOL);
    expect(rows.map((row) => row.pair.rotationIndex)).toEqual(
      Array.from({ length: POOL }, (_, i) => i)
    );
  });

  it('marks exactly one row as the current week', () => {
    for (const week of [0, 5, 19, 20, 41, 137]) {
      const marked = archiveRotation(midWeek(week)).filter((row) => row.isCurrentWeek);
      expect(marked).toHaveLength(1);
    }
  });

  it('marks none before the epoch, and dates every row in the future', () => {
    const rows = archiveRotation(midWeek(-2));

    expect(rows.filter((row) => row.isCurrentWeek)).toHaveLength(0);
    for (const row of rows) {
      expect(row.lastFeatured).toBeNull();
      expect(row.timesFeatured).toBe(0);
      expect(row.nextFeatured.getTime()).toBeGreaterThanOrEqual(ROTATION_EPOCH);
    }
  });

  it('is complete from the first week, which is what makes it an index', () => {
    // The reason this page lists the rotation rather than "everything that has
    // been featured": at week 0 the latter is empty, and an index nobody can
    // follow is not an index.
    expect(archiveRotation(midWeek(0))).toHaveLength(POOL);
  });
});
