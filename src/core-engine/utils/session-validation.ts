// src/core-engine/utils/session-validation.ts
//
// Sanity limits for recorded game sessions.
//
// The browser reports its own score, level and duration, so recordGameSession()
// runs every payload through validateSessionInput() before it touches the
// database. supabase/migrations/20260914_game_session_guards.sql enforces the
// same score / level ceilings in a trigger for anyone who skips the action and
// inserts through PostgREST directly.
//
// The ceilings are deliberately generous (theoretical maximum x 2) so that a
// legitimate run is never rejected: the goal is "not trivially fakeable", not
// full anti-cheat. When a game's scoring or level count changes, update the
// entry here AND the seed in the migration (the unit test compares the two).

import type { GameName } from '../types/general';

export type SessionOutcome = 'victory' | 'failed' | 'abandoned';

export const SESSION_OUTCOMES: readonly SessionOutcome[] = ['victory', 'failed', 'abandoned'];

/** No session may claim to have lasted longer than this (6 hours). */
export const MAX_SESSION_DURATION_SECONDS = 6 * 60 * 60;

export interface GameSessionLimits {
  /** Highest level a session may report. */
  maxLevel: number;
  /**
   * Per-level ceiling: a session's (cumulative) score may never exceed
   * maxScorePerLevel * levelReached. Set to the largest score a single level
   * can award, times two.
   */
  maxScorePerLevel: number;
  /** Absolute ceiling on a session's score: the best possible full run, times two. */
  maxScore: number;
  /** Shortest duration (seconds) of a legitimate, non-abandoned session. */
  minDurationSeconds: number;
}

export const GAME_SESSION_LIMITS: Record<GameName, GameSessionLimits> = {
  // ACID_CLASSIFICATION_CONFIG: 5 levels, pointsPerLevelMultiplier 100 per
  // correct answer x level. The quota per level is
  // max(minPassingItems 3, compounds at that difficulty - 2) = 5 (the registry
  // has 7 compounds at each difficulty 1-5), and extra clicks are ignored while
  // the feedback animation runs, so a level awards at most 5 x 100 x level.
  //   largest single level: 5 x 100 x 5 = 2500  -> maxScorePerLevel 5000
  //   best full run: 500 x (1+2+3+4+5) = 7500   -> maxScore 15000
  // The fastest legitimate end is three wrong answers: two mistake
  // transitions (1200 ms) plus the fail delay (800 ms), about 3 s.
  'acid-classification': {
    maxLevel: 5,
    maxScorePerLevel: 5000,
    maxScore: 15000,
    minDurationSeconds: 2,
  },

  // FORMULA_BLASTER_CONFIG: 5 levels, targetsRequiredPerLevel 3, each target
  // needs a random quota of 3-5 hits and every hit scores
  // pointsPerLevelMultiplier 100 x level, so a level awards at most
  // 3 x 5 x 100 x level = 1500 x level.
  //   largest single level: 1500 x 5 = 7500     -> maxScorePerLevel 15000
  //   best full run: 1500 x (1+2+3+4+5) = 22500 -> maxScore 45000
  // A failed run only ends when the 45 s wave timer expires; a victory needs
  // at least 45 hits on bubbles that spawn no faster than every 450 ms.
  'formula-blaster': {
    maxLevel: 5,
    maxScorePerLevel: 15000,
    maxScore: 45000,
    minDurationSeconds: 10,
  },

  // NEUTRALISE_LEVEL_DATA configures 8 levels but the page keeps offering
  // "Begin Level N+1" for ever (levels past 8 reuse the level-1 rules), so the
  // cap allows 20. The arena awards 100 per defeated invader and a level has
  // maxWavesPerLevel 3 waves of getEnemiesPerWave(level) invaders:
  //   per level: 600, 900, 1200, then 1500 for levels 4-8, then 900 (level-1 rules)
  //   largest single level: 1500                  -> maxScorePerLevel 3000
  //   cumulative through level 20: 10200 + 12 x 900 = 21000 -> maxScore 42000
  // The session timer restarts on every level; a level cannot end in under a
  // few seconds because invaders drop at 0.18 px per tick.
  neutralise: {
    maxLevel: 20,
    maxScorePerLevel: 3000,
    maxScore: 42000,
    minDurationSeconds: 5,
  },

  // The arena awards a flat 150 per balanced equation, one equation per
  // level, and records the cumulative score after every level. There are 30
  // reactions; the page cycles through them ((level - 1) % 30) and never
  // ends, so the cap allows two full passes.
  //   largest single level: 150       -> maxScorePerLevel 300
  //   cumulative through level 60: 9000 -> maxScore 18000
  // Level 1 (H2 + O2 -> H2O) can honestly be balanced in a second or two.
  'reaction-balancer': {
    maxLevel: 60,
    maxScorePerLevel: 300,
    maxScore: 18000,
    minDurationSeconds: 1,
  },

  // LEWIS_STRUCTURES_CONFIG: 5 levels with roundsByLevel [3, 5, 5, 5, 6]. A
  // round awards pointsPerLevelMultiplier 100 x level plus the noHintBonus 50,
  // so a level awards at most rounds x (100 x level + 50):
  //   450, 1250, 1750, 2250, 3300 -> largest single level 3300 -> maxScorePerLevel 6600
  //   best full run: 9000                                      -> maxScore 18000
  // A run is recorded only at victory (29 rounds) or on exit (abandoned), so
  // a non-abandoned session cannot honestly be shorter than a few seconds.
  'lewis-structures': {
    maxLevel: 5,
    maxScorePerLevel: 6600,
    maxScore: 18000,
    minDurationSeconds: 5,
  },

  // Not built yet (the catalogue row is inactive and there is no page), so
  // these are placeholders.Revisit them, and the migration seed, when the
  // game ships.
  'bond-builder': {
    maxLevel: 10,
    maxScorePerLevel: 2000,
    maxScore: 20000,
    minDurationSeconds: 1,
  },
};

export interface ValidatedSession {
  gameId: GameName;
  score: number;
  levelReached: number;
  /** Whole-number percentage, or undefined when the game did not measure it. */
  accuracy?: number;
  timeSpentSeconds: number;
  outcome: SessionOutcome;
}

export type SessionValidationResult =
  | { ok: true; value: ValidatedSession }
  | { ok: false; reason: string };

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const isKnownGame = (value: unknown): value is GameName =>
  typeof value === 'string' && Object.prototype.hasOwnProperty.call(GAME_SESSION_LIMITS, value);

const isOutcome = (value: unknown): value is SessionOutcome =>
  typeof value === 'string' && (SESSION_OUTCOMES as readonly string[]).includes(value);

const reject = (reason: string): SessionValidationResult => ({ ok: false, reason });

/**
 * Checks an untrusted session payload against the game's limits. Pure: never
 * throws, never touches the database. On success the returned value is a
 * fresh object holding only the known fields.
 */
export function validateSessionInput(input: unknown): SessionValidationResult {
  if (!isRecord(input)) return reject('session payload must be an object');

  const { gameId, outcome, score, timeSpentSeconds, accuracy } = input;
  // The client interface makes the level optional; a missing level is level 1.
  const levelReached = input.levelReached === undefined ? 1 : input.levelReached;

  if (!isKnownGame(gameId)) return reject('gameId is not a known game');
  const limits = GAME_SESSION_LIMITS[gameId];

  if (!isOutcome(outcome)) return reject('outcome must be victory, failed or abandoned');

  if (!Number.isInteger(score)) return reject('score must be an integer');
  if (!Number.isInteger(levelReached)) return reject('levelReached must be an integer');
  if (!Number.isInteger(timeSpentSeconds)) return reject('timeSpentSeconds must be an integer');
  // Number.isInteger narrows at runtime only, so restate the types for TS.
  const scoreValue = score as number;
  const levelValue = levelReached as number;
  const durationValue = timeSpentSeconds as number;

  if (levelValue < 1) return reject('levelReached must be at least 1');
  if (levelValue > limits.maxLevel) {
    return reject(`levelReached ${levelValue} exceeds the maximum of ${limits.maxLevel} for ${gameId}`);
  }

  if (scoreValue < 0) return reject('score must not be negative');
  if (scoreValue > limits.maxScore) {
    return reject(`score ${scoreValue} exceeds the maximum of ${limits.maxScore} for ${gameId}`);
  }
  const perLevelCeiling = limits.maxScorePerLevel * levelValue;
  if (scoreValue > perLevelCeiling) {
    return reject(`score ${scoreValue} exceeds the ceiling of ${perLevelCeiling} for level ${levelValue} of ${gameId}`);
  }

  // An abandoned run may legitimately have lasted no time at all.
  const minDuration = outcome === 'abandoned' ? 0 : limits.minDurationSeconds;
  if (durationValue < minDuration) {
    return reject(`timeSpentSeconds ${durationValue} is below the minimum of ${minDuration} for ${gameId}`);
  }
  if (durationValue > MAX_SESSION_DURATION_SECONDS) {
    return reject(`timeSpentSeconds ${durationValue} exceeds the maximum of ${MAX_SESSION_DURATION_SECONDS}`);
  }

  let accuracyValue: number | undefined;
  if (accuracy !== undefined && accuracy !== null) {
    if (!Number.isInteger(accuracy) || (accuracy as number) < 0 || (accuracy as number) > 100) {
      return reject('accuracy must be an integer between 0 and 100');
    }
    accuracyValue = accuracy as number;
  }

  return {
    ok: true,
    value: {
      gameId,
      score: scoreValue,
      levelReached: levelValue,
      accuracy: accuracyValue,
      timeSpentSeconds: durationValue,
      outcome,
    },
  };
}
