// src/lib/explore/rotation.ts
//
// Which week is it, and which pair does that week show?
//
// Everything here is a pure function of a `Date` you pass in. There is no
// `new Date()` in this module, no clock, no I/O and no import of anything that
// has one: the page passes `new Date()` once, and every test passes a fixed
// date. That is what makes "the week turned over and the wrong entry appeared"
// a testable claim rather than something you can only find out on a Monday.
//
// ## The boundary is Monday 00:00 UTC
//
// UTC rather than the reader's local time, for three reasons:
//
//   1. The page is statically rendered and revalidated (see the page's
//      `revalidate`), so there is one rendered page shared by every reader.
//      There is no "the reader's Monday" to honour — a local-time boundary
//      would just mean the cached page disagrees with whoever requested it.
//   2. A local boundary makes every test of it flaky, because the answer then
//      depends on the machine's zone.
//   3. UTC has no daylight saving, so "a week" is always exactly 7 × 24 hours
//      and the arithmetic below never needs a calendar.
//
// The only thing the reader sees is the dateline, which names the Monday this
// week started on.

/** Milliseconds in a week. UTC has no DST, so this is exact. */
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

/**
 * Week 0 of the rotation: Monday 5 January 2026, 00:00:00 UTC — the first
 * Monday of 2026.
 *
 * The value is arbitrary but it must never change: moving it re-numbers every
 * week and therefore re-shuffles which entry every future week shows. If a
 * different anchor is ever wanted, change the schedule order instead.
 */
export const ROTATION_EPOCH = Date.UTC(2026, 0, 5);

/**
 * Whole weeks from the epoch. Negative before it, which is deliberate: the
 * function must answer for any date rather than clamping, and `selectIndex()`
 * below is what turns the answer into a safe array index.
 */
export function weekIndex(now: Date): number {
  return Math.floor((now.getTime() - ROTATION_EPOCH) / WEEK_MS);
}

/** The Monday 00:00 UTC that the week containing `now` began on. */
export function weekStart(now: Date): Date {
  return new Date(ROTATION_EPOCH + weekIndex(now) * WEEK_MS);
}

/**
 * The index into a pool of `length` entries for the week containing `now`.
 *
 * `((i % n) + n) % n` rather than `i % n`, because JavaScript's `%` keeps the
 * sign of the left operand: a date before the epoch would otherwise produce a
 * negative index and an `undefined` entry — an empty section, which AC-4 says
 * must never happen.
 *
 * Throws on an empty pool. A pool of size 0 has no right answer, and returning
 * `undefined` would push the failure into the page, where it renders as a blank
 * card instead of a build that fails.
 */
export function selectIndex(now: Date, length: number): number {
  if (!Number.isInteger(length) || length < 1) {
    throw new Error(
      `explore rotation: the pool must hold at least one entry, got ${length}. ` +
        'A pool of any size >= 1 works; the cycle length is the pool size.'
    );
  }
  const index = weekIndex(now);
  return ((index % length) + length) % length;
}

/**
 * The entry a pool shows in the week containing `now`.
 *
 * The cycle length is the pool length, so a pool of 1 shows the same entry
 * every week and a pool of 20 repeats after 20 weeks.
 *
 * **Appending to a pool changes which entry a given future week shows.** That
 * is accepted rather than worked around (AC-4): the alternative is pinning
 * entries to absolute week numbers, which means a gap in the schedule renders
 * nothing at all. Editorial content moving a week later is harmless; a blank
 * section is not.
 */
export function selectForWeek<T>(pool: readonly T[], now: Date): T {
  return pool[selectIndex(now, pool.length)];
}
