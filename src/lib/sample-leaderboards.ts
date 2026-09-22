// src/lib/sample-leaderboards.ts
//
// ⚠️ SEEDED DATA. None of this was played. It stands in for the public
// leaderboards while the real ones are empty, and it is presented to the reader
// exactly like a real board — no banner, no "sample" tag. That is a deliberate
// product decision by the owner (2026-09-22), not an oversight, so do not go
// looking for the label that is missing.
//
// What that means for you:
//
//   * **It is replaced the moment one real score exists.** `getPublicLeaderboards`
//     substitutes this only when every game's entry list is empty. A single
//     recorded session anywhere makes the whole thing disappear — it never
//     merges with real scores, so nobody is ever ranked against an invention.
//   * **The aliases are invented and deliberately unlike real ones.** They are
//     element- and apparatus-themed handles, not names, so they cannot collide
//     with a real student's alias or read as a classmate.
//   * **Do not import this anywhere else.** It exists for one call site. Using it
//     in a test that means to assert on real data will make that test lie.
//
// The dates are fixed, not relative to `now`. A board whose "recorded" dates
// creep forward every day is a board that is obviously generated, and a fixed
// window also keeps snapshots and screenshots stable.

import type { GameLeaderboard, GameName, LeaderboardEntry } from '@/core-engine/types/general';

/** Scores in descending order, so `rank` matches position without sorting. */
function entries(
  gameId: GameName,
  rows: Array<[alias: string, score: number, date: string]>
): LeaderboardEntry[] {
  return rows.map(([alias, score, date], index) => ({
    id: `sample-${gameId}-${index + 1}`,
    alias,
    score,
    timestamp: `${date}T00:00:00.000Z`,
    rank: index + 1,
  }));
}

/**
 * One board per game, in the order the tabs show them.
 *
 * Scores are inside each game's plausible range rather than round numbers:
 * acid-classification awards `level × 100` per correct answer over five levels,
 * so a strong run lands in the low thousands, and the spread between first and
 * fifth is the kind a real board shows rather than a neat arithmetic sequence.
 */
export const SAMPLE_LEADERBOARDS: GameLeaderboard[] = [
  {
    gameId: 'acid-classification',
    gameTitle: 'Acid or Base?',
    entries: entries('acid-classification', [
      ['TitrationTiger', 4820, '2026-09-18'],
      ['LitmusLoop', 4510, '2026-09-15'],
      ['pHantom', 4180, '2026-09-19'],
      ['BeakerBandit', 3760, '2026-09-11'],
      ['BufferZone', 3390, '2026-09-20'],
    ]),
  },
  {
    gameId: 'formula-blaster',
    gameTitle: 'Formula Blaster',
    entries: entries('formula-blaster', [
      ['SubscriptSniper', 6240, '2026-09-17'],
      ['ValenceVolley', 5890, '2026-09-20'],
      ['IonInbound', 5305, '2026-09-13'],
      ['BracketBreaker', 4970, '2026-09-16'],
      ['SaltShaker', 4415, '2026-09-19'],
    ]),
  },
  {
    gameId: 'neutralise',
    gameTitle: 'Neutralise!',
    entries: entries('neutralise', [
      ['AlkaliAce', 7130, '2026-09-19'],
      ['HydroxideHawk', 6720, '2026-09-14'],
      ['CannonCarbonate', 6085, '2026-09-18'],
      ['SpectatorIon', 5640, '2026-09-12'],
      ['WaveRider', 5120, '2026-09-21'],
    ]),
  },
  {
    gameId: 'reaction-balancer',
    gameTitle: 'Reaction Balancer',
    entries: entries('reaction-balancer', [
      ['CoefficientKid', 5480, '2026-09-20'],
      ['MoleWrangler', 5125, '2026-09-16'],
      ['ArrowAligner', 4790, '2026-09-18'],
      ['StoichStar', 4260, '2026-09-13'],
      ['MassConserved', 3915, '2026-09-21'],
    ]),
  },
  {
    gameId: 'lewis-structures',
    gameTitle: 'Share to Fill',
    entries: entries('lewis-structures', [
      ['LonePairLuna', 3970, '2026-09-19'],
      ['OctetOtter', 3640, '2026-09-15'],
      ['DoubleBondDee', 3285, '2026-09-17'],
      ['DotDiagram', 2960, '2026-09-12'],
      ['ShellSeeker', 2635, '2026-09-20'],
    ]),
  },
];

/**
 * True when not one game has a single real entry.
 *
 * Deliberately "every board is empty" rather than "this board is empty": a game
 * that nobody has played yet, on a site where the others have scores, should
 * show its own empty state and say so. Inventing scores for that one game would
 * be inventing them alongside real ones.
 */
export const hasNoRealEntries = (leaderboards: GameLeaderboard[]): boolean =>
  leaderboards.every((leaderboard) => leaderboard.entries.length === 0);
