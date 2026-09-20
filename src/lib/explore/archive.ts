// src/lib/explore/archive.ts
//
// Which weeks have already happened, and when a given entry ran.
//
// Everything here is a pure function of a `Date` you pass in, for the same
// reason `rotation.ts` is: the page passes `new Date()` once and every test
// pins a date. There is no clock in this file and no import of anything that
// has one.
//
// ## The archive is DERIVED, not RECORDED
//
// **Read this before trusting a date on any archive page.** Nothing anywhere
// writes down "in week 14 the site showed benzene". These functions compute
// what the rotation *would have shown*, by running today's schedule backwards
// through the same `weekIndex % pool.length` the live page uses forwards.
//
// That distinction is not academic. `rotation.ts` and `schedule.ts` both record
// that **appending a pair changes which pair a given week shows** (AC-4). So
// adding a twenty-first pair silently rewrites every date this module reports
// about the past. If the site ran for a year and then grew its pool, the
// archive would claim a history that never happened.
//
// It is still the right trade for this feature, and the alternative was
// considered and rejected rather than overlooked:
//
//   * A real record means a database table written once a week — a migration, a
//     job that must actually run, a row that can be missing, and a page that
//     has to render when it is. That is a much larger change and the brief says
//     not to build one without asking.
//   * What the archive is *for* is making 40 entries reachable and indexable
//     instead of hiding 39 of them behind one URL. That works whether or not
//     last March's dates are the ones that really appeared.
//   * The permalinks — the durable part — do not depend on the dates at all.
//     An entry's URL is its id, which never moves.
//
// So: **the dates here are a schedule, not a log.** If a real log is ever
// wanted, it is `explore_weeks(week_index, molecule_id, scientist_id)` written
// on the Monday, and this module becomes its reader. Until then, do not add a
// second source of truth for which weeks have happened — derive it here.
//
// ## Before the epoch there is no history
//
// `weekIndex` goes negative before `ROTATION_EPOCH` and is deliberately not
// clamped. A week only counts as past if its index is `>= 0`, so at week 0 the
// recent list is empty, at week 1 it holds one row, and it reaches ten in week
// ten. All four cases are tested; the launch case is the empty one.

import {
  rotationIndexForWeek,
  weekIndex,
  weekStartOfIndex,
} from './rotation';
import { EXPLORE_MOLECULES } from './molecules';
import { EXPLORE_SCIENTISTS } from './scientists';
import { EXPLORE_SCHEDULE } from './schedule';
import type { ExploreMolecule, ExploreScientist } from './types';

/**
 * How many past weeks the list under the current week shows.
 *
 * **A display limit, never a lifetime.** An entry that falls off this list
 * keeps its permalink, keeps its place in the archive index and keeps coming
 * round every `cycleWeeks` weeks. Nothing in this feature expires; this number
 * only decides how long one list is.
 */
export const RECENT_WEEKS_LIMIT = 10;

/** Which of the two pools an entry came from. Used by the permalink routes. */
export type ExploreEntryKind = 'molecule' | 'scientist';

/** A schedulable week of the rotation, with its position in the cycle. */
export interface ScheduledPair {
  /** Position in the rotation: `weekIndex % cycleWeeks` selects this pair. */
  rotationIndex: number;
  molecule: ExploreMolecule;
  scientist: ExploreScientist;
}

/**
 * The pairs the rotation can actually show, in order.
 *
 * Moved here from `src/i18n/explore.ts` so that the live page, the recent list,
 * the archive index and every permalink all count the same pool. Two copies of
 * this filter would be two different cycle lengths, and the dates would
 * disagree about the past while both looked right on their own page.
 *
 * Only entries that are still active can be scheduled. Retiring an entry with
 * `isActive: false` therefore drops its whole week rather than leaving half a
 * page — the pair is the unit of meaning. Its permalink keeps working: the
 * routes enumerate the pools, not this list.
 */
export function schedulablePairs(): ScheduledPair[] {
  const molecules = new Map(
    EXPLORE_MOLECULES.filter((m) => m.isActive).map((m) => [m.id, m] as const)
  );
  const scientists = new Map(
    EXPLORE_SCIENTISTS.filter((s) => s.isActive).map((s) => [s.id, s] as const)
  );

  const pairs: ScheduledPair[] = [];
  for (const pair of EXPLORE_SCHEDULE) {
    const molecule = molecules.get(pair.moleculeId);
    const scientist = scientists.get(pair.scientistId);
    // `rotationIndex` is the position in *this* list, not in EXPLORE_SCHEDULE:
    // a retired pair is removed from the cycle, so everything after it moves up.
    if (molecule && scientist) {
      pairs.push({ rotationIndex: pairs.length, molecule, scientist });
    }
  }
  return pairs;
}

/** One past week of the rotation. */
export interface ArchiveWeek {
  /** Whole weeks since the epoch. Always `>= 0` here. */
  weekIndex: number;
  /** Monday 00:00 UTC that week began on. */
  weekStart: Date;
  pair: ScheduledPair;
}

/**
 * The most recent past weeks, newest first, with no pair repeated.
 *
 * Past means *strictly before* the week containing `now` — the current week is
 * already on the page above this list, and showing it twice is how a reader
 * learns to distrust a date.
 *
 * ## Why this de-duplicates, when arithmetic says it cannot
 *
 * The rotation wraps every `cycleWeeks` weeks, so "eleven weeks ago" and
 * "thirty-one weeks ago" are the same pair. With twenty pairs and a limit of
 * ten that can never bite: any ten consecutive weeks map to ten consecutive
 * values of `weekIndex % 20`, which are ten different pairs.
 *
 * The guard is here because that is an accident of two numbers, not a property
 * of the design. Retire enough entries — or set the limit above the pool size —
 * and consecutive weeks start repeating, at which point the honest list is
 * "the ten most recent pairs" rather than "the ten most recent weeks with four
 * of them the same". Each pair therefore appears once, dated by its *most
 * recent* run, which is the one a reader would be looking for.
 *
 * The loop is bounded whatever the numbers are: `cycleWeeks` consecutive weeks
 * always cover the whole pool, so it stops after at most `min(limit, pool)`
 * iterations rather than walking back to the epoch.
 */
export function recentWeeks(now: Date, limit: number = RECENT_WEEKS_LIMIT): ArchiveWeek[] {
  const pairs = schedulablePairs();
  if (pairs.length === 0 || limit < 1) return [];

  const current = weekIndex(now);
  const weeks: ArchiveWeek[] = [];
  const seen = new Set<number>();

  for (
    let week = current - 1;
    week >= 0 && weeks.length < limit && seen.size < pairs.length;
    week -= 1
  ) {
    const rotationIndex = rotationIndexForWeek(week, pairs.length);
    if (seen.has(rotationIndex)) continue;
    seen.add(rotationIndex);
    weeks.push({
      weekIndex: week,
      weekStart: weekStartOfIndex(week),
      pair: pairs[rotationIndex],
    });
  }

  return weeks;
}

/**
 * When one pair runs: everything a permalink or an archive row needs to be
 * honest about dates.
 *
 * ## What a permalink says about dates, and why
 *
 * An entry does not have "a week". It has a week *every `cycleWeeks` weeks*,
 * forever, and by the time anyone reads its page it may have run five times. So
 * a permalink never writes "Week of 21 September 2026" as though that were the
 * entry's date — that sentence is false the second time round, and it is the
 * single most likely thing for this feature to get wrong.
 *
 * What it says instead is the two facts that are true whenever you read it:
 *
 *   * **`lastFeatured`** — the most recent Monday this pair ran, or `null` if
 *     it has not run yet. This is what the page dates itself by, and what the
 *     `<time datetime>` carries.
 *   * **`nextFeatured`** — the next Monday it will run. Always a real date,
 *     because the rotation has no end.
 *
 * and `timesFeatured` decides which sentence is used: not yet, once, or more
 * than once. Only the "once" case may say simply "featured in the week of X",
 * because only then is that the whole truth.
 *
 * Every date here is subject to the derived-not-recorded warning at the top of
 * this file: it is where the rotation puts this pair today, not a log of where
 * it was.
 */
export interface EntryRotation {
  pair: ScheduledPair;
  /** The length of the cycle, in weeks — today, the size of the active pool. */
  cycleWeeks: number;
  /** Runs from the epoch up to and including the current week. Zero before its first. */
  timesFeatured: number;
  /** Monday of its most recent run, or null when it has not run yet. */
  lastFeatured: Date | null;
  /** Monday of its next run. Always set: the rotation never ends. */
  nextFeatured: Date;
  /** True when its most recent run is the week the reader is in. */
  isCurrentWeek: boolean;
}

/** The pair an entry belongs to, or null if it is not in the active rotation. */
export function pairForEntry(kind: ExploreEntryKind, id: string): ScheduledPair | null {
  const pairs = schedulablePairs();
  const match = pairs.find((pair) =>
    kind === 'molecule' ? pair.molecule.id === id : pair.scientist.id === id
  );
  return match ?? null;
}

/**
 * When a pair runs, relative to `now`.
 *
 * Split from `pairForEntry` so the archive index can ask about all twenty pairs
 * without looking each one up by id.
 */
export function rotationFor(pair: ScheduledPair, now: Date, cycleWeeks: number): EntryRotation {
  const current = weekIndex(now);
  const first = pair.rotationIndex;

  // Runs are weeks `first`, `first + cycle`, `first + 2 * cycle`, … and only
  // weeks `>= 0` count, because there is no history before the epoch.
  const runsSoFar = current < first ? 0 : Math.floor((current - first) / cycleWeeks) + 1;
  const lastIndex = runsSoFar === 0 ? null : first + (runsSoFar - 1) * cycleWeeks;
  const nextIndex = lastIndex === null ? first : lastIndex + cycleWeeks;

  return {
    pair,
    cycleWeeks,
    timesFeatured: runsSoFar,
    lastFeatured: lastIndex === null ? null : weekStartOfIndex(lastIndex),
    nextFeatured: weekStartOfIndex(nextIndex),
    isCurrentWeek: lastIndex === current,
  };
}

/** `rotationFor`, looked up by entry id. Null when the entry is not scheduled. */
export function entryRotation(
  kind: ExploreEntryKind,
  id: string,
  now: Date
): EntryRotation | null {
  const pairs = schedulablePairs();
  const pair = pairs.find((candidate) =>
    kind === 'molecule' ? candidate.molecule.id === id : candidate.scientist.id === id
  );
  return pair ? rotationFor(pair, now, pairs.length) : null;
}

/**
 * Every pair in the rotation, most recently featured first, with its dates.
 *
 * This is the archive index's data. It is the **whole rotation**, not only the
 * weeks that have already happened — see the note in the archive page for why.
 *
 * ## Why this is not in rotation order, which is what it was
 *
 * Rotation order is the order `schedule.ts` was curated in, and the first
 * version of this listed the pairs that way. Then the dates went on screen and
 * the column read: 25 May, 1 June, … 14 September (**this week**), 4 May,
 * 11 May, 18 May. All six dates are true — the pairs after the current one in
 * the cycle last ran *before* the wrap — and the whole column looks broken. A
 * reader does not know the rotation wrapped; they see a sorted list that is not
 * sorted.
 *
 * So the rows are ordered by the date they carry:
 *
 *   * pairs that have run, most recent week first — the current week is the
 *     top row, which is also where its "this week" marker wants to be;
 *   * then pairs that have not run yet, soonest first.
 *
 * In the site's first weeks that is a short list of what has been, followed by
 * what is coming. After one full cycle it is simply the whole rotation, newest
 * first, and it reads as the extension of the recent list that it is.
 *
 * The curated order is not lost — it is `EXPLORE_SCHEDULE`, and
 * `rotationIndex` still carries it — it is just not what an index wants.
 */
export function archiveRotation(now: Date): EntryRotation[] {
  const pairs = schedulablePairs();
  return pairs
    .map((pair) => rotationFor(pair, now, pairs.length))
    .sort((a, b) => {
      // Run before not-yet-run.
      if ((a.lastFeatured === null) !== (b.lastFeatured === null)) {
        return a.lastFeatured === null ? 1 : -1;
      }
      // Both have run: newest week first.
      if (a.lastFeatured && b.lastFeatured) {
        return b.lastFeatured.getTime() - a.lastFeatured.getTime();
      }
      // Neither has: soonest first, which before the epoch is rotation order.
      return a.nextFeatured.getTime() - b.nextFeatured.getTime();
    });
}
