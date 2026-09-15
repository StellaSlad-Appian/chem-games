/**
 * GAME_SESSION_LIMITS must be loose enough that every legitimate run passes
 * and tight enough that a made-up score is rejected. The derivation tests
 * recompute the theoretical maxima from the real game configs, so changing a
 * game's scoring or level count fails here until the limits (and the SQL seed
 * in supabase/migrations/20260914_game_session_guards.sql) are updated.
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  GAME_SESSION_LIMITS,
  MAX_SESSION_DURATION_SECONDS,
  validateSessionInput,
} from '../utils/session-validation';
import type { GameName } from '../types/general';
import { ACID_CLASSIFICATION_CONFIG } from '../config/games/acid-classification-config';
import { FORMULA_BLASTER_CONFIG } from '../config/games/formula-blaster-config';
import { NEUTRALISE_CONFIG, NEUTRALISE_LEVEL_DATA } from '../config/games/neutralise-config';
import { getEnemiesPerWave } from '../utils/level-manager';
import { reactions } from '../data/reactions';
import { compoundsAtDifficulty } from '@/test-utils/registry';

// Every id in the GameName union. The Exhaustive check fails to compile when
// the union gains a member that is missing from this list.
const GAME_CATALOGUE = [
  'neutralise',
  'formula-blaster',
  'acid-classification',
  'reaction-balancer',
  'bond-builder',
] as const satisfies readonly GameName[];
type MissingFromCatalogue = Exclude<GameName, (typeof GAME_CATALOGUE)[number]>;
const catalogueIsExhaustive: MissingFromCatalogue extends never ? true : false = true;

const MIGRATION = resolve(process.cwd(), 'supabase/migrations/20260914_game_session_guards.sql');

/** The (id, max_score, max_level) rows seeded by the migration. */
const seededLimits = () => {
  const sql = readFileSync(MIGRATION, 'utf8');
  const seeded: Record<string, { maxScore: number; maxLevel: number }> = {};
  for (const match of sql.matchAll(/\('([a-z0-9-]+)',\s*(\d+),\s*(\d+)\)/g)) {
    seeded[match[1]] = { maxScore: Number(match[2]), maxLevel: Number(match[3]) };
  }
  return seeded;
};

/**
 * Checks a game's limits against the most a level can award: the cumulative
 * score at every level must fit under maxScorePerLevel * level, and the
 * ceilings must be exactly the theoretical maximum times two.
 */
const expectDerivedFrom = (gameId: GameName, gainForLevel: (level: number) => number) => {
  const limits = GAME_SESSION_LIMITS[gameId];
  let cumulative = 0;
  let largestGain = 0;
  for (let level = 1; level <= limits.maxLevel; level++) {
    const gain = gainForLevel(level);
    cumulative += gain;
    largestGain = Math.max(largestGain, gain);
    expect(cumulative, `${gameId} level ${level}`).toBeLessThanOrEqual(limits.maxScorePerLevel * level);
  }
  expect(limits.maxScorePerLevel, `${gameId} maxScorePerLevel`).toBe(largestGain * 2);
  expect(limits.maxScore, `${gameId} maxScore`).toBe(cumulative * 2);
};

const validFor = (gameId: GameName, overrides: Record<string, unknown> = {}) => ({
  gameId,
  score: GAME_SESSION_LIMITS[gameId].maxScorePerLevel,
  levelReached: 1,
  accuracy: 100,
  timeSpentSeconds: GAME_SESSION_LIMITS[gameId].minDurationSeconds,
  outcome: 'victory',
  ...overrides,
});

const expectRejected = (input: unknown, reason: RegExp) => {
  const result = validateSessionInput(input);
  expect(result.ok).toBe(false);
  if (!result.ok) expect(result.reason).toMatch(reason);
};

describe('GAME_SESSION_LIMITS', () => {
  it('has an entry for every game in the catalogue', () => {
    expect(catalogueIsExhaustive).toBe(true);
    expect(Object.keys(GAME_SESSION_LIMITS).sort()).toEqual([...GAME_CATALOGUE].sort());
    GAME_CATALOGUE.forEach((gameId) => {
      const limits = GAME_SESSION_LIMITS[gameId];
      expect(Number.isInteger(limits.maxLevel) && limits.maxLevel >= 1, `${gameId} maxLevel`).toBe(true);
      expect(Number.isInteger(limits.maxScore) && limits.maxScore >= 1, `${gameId} maxScore`).toBe(true);
      expect(
        Number.isInteger(limits.maxScorePerLevel) && limits.maxScorePerLevel >= 1,
        `${gameId} maxScorePerLevel`
      ).toBe(true);
    });
  });

  it('never accepts a non-abandoned session shorter than the DB trigger allows (1 s)', () => {
    GAME_CATALOGUE.forEach((gameId) => {
      expect(GAME_SESSION_LIMITS[gameId].minDurationSeconds, gameId).toBeGreaterThanOrEqual(1);
    });
  });

  it('matches the ceilings seeded by the game_session_guards migration', () => {
    const seeded = seededLimits();
    expect(Object.keys(seeded).sort()).toEqual([...GAME_CATALOGUE].sort());
    GAME_CATALOGUE.forEach((gameId) => {
      const { maxScore, maxLevel } = GAME_SESSION_LIMITS[gameId];
      expect(seeded[gameId], gameId).toEqual({ maxScore, maxLevel });
    });
  });

  it('acid-classification: quota x 100 x level per level, over the configured levels', () => {
    const { levels, mechanics } = ACID_CLASSIFICATION_CONFIG;
    expect(GAME_SESSION_LIMITS['acid-classification'].maxLevel).toBe(levels.maxLevel);
    expectDerivedFrom('acid-classification', (level) => {
      const quota = Math.max(levels.minPassingItems, compoundsAtDifficulty(level).length - 2);
      return quota * mechanics.pointsPerLevelMultiplier * level;
    });
  });

  it('formula-blaster: 3 targets x up to 5 hits x 100 x level per level', () => {
    const { levels, mechanics } = FORMULA_BLASTER_CONFIG;
    // The page draws each target's quota as Math.floor(Math.random() * 3) + 3.
    const MAX_HITS_PER_TARGET = 5;
    expect(GAME_SESSION_LIMITS['formula-blaster'].maxLevel).toBe(levels.maxLevel);
    expectDerivedFrom(
      'formula-blaster',
      (level) => levels.targetsRequiredPerLevel * MAX_HITS_PER_TARGET * mechanics.pointsPerLevelMultiplier * level
    );
  });

  it('neutralise: 3 waves x enemies per wave x 100 per level, beyond the configured levels', () => {
    const { waves, mechanics } = NEUTRALISE_CONFIG;
    // The page never declares victory, so allow more levels than are configured.
    expect(GAME_SESSION_LIMITS.neutralise.maxLevel).toBeGreaterThan(NEUTRALISE_LEVEL_DATA.length);
    expectDerivedFrom(
      'neutralise',
      (level) => waves.maxWavesPerLevel * getEnemiesPerWave(level) * mechanics.basePointsPerDefeat
    );
  });

  it('reaction-balancer: 150 per balanced equation, two passes through the reactions', () => {
    // The arena calls onReactionComplete(150) once per level.
    const POINTS_PER_EQUATION = 150;
    expect(GAME_SESSION_LIMITS['reaction-balancer'].maxLevel).toBe(reactions.length * 2);
    expectDerivedFrom('reaction-balancer', () => POINTS_PER_EQUATION);
  });
});

describe('validateSessionInput', () => {
  it('accepts a representative session for every game and returns a clean copy', () => {
    GAME_CATALOGUE.forEach((gameId) => {
      const input = validFor(gameId, { extra: 'ignored' });
      const result = validateSessionInput(input);
      expect(result.ok, gameId).toBe(true);
      if (!result.ok) return;
      expect(result.value).toEqual({
        gameId,
        score: input.score,
        levelReached: 1,
        accuracy: 100,
        timeSpentSeconds: input.timeSpentSeconds,
        outcome: 'victory',
      });
      expect(result.value).not.toBe(input);
      expect(result.value).not.toHaveProperty('extra');
    });
  });

  it('accepts the top of every range', () => {
    const limits = GAME_SESSION_LIMITS['formula-blaster'];
    const result = validateSessionInput(
      validFor('formula-blaster', {
        score: limits.maxScore,
        levelReached: limits.maxLevel,
        timeSpentSeconds: MAX_SESSION_DURATION_SECONDS,
        accuracy: 0,
        outcome: 'failed',
      })
    );
    expect(result.ok).toBe(true);
  });

  it('treats a missing level as level 1 and a missing or null accuracy as unmeasured', () => {
    const base = validFor('neutralise');
    const noLevel = validateSessionInput({ ...base, levelReached: undefined, accuracy: undefined });
    expect(noLevel).toEqual({ ok: true, value: expect.objectContaining({ levelReached: 1, accuracy: undefined }) });
    const nullAccuracy = validateSessionInput({ ...base, accuracy: null });
    expect(nullAccuracy.ok && nullAccuracy.value.accuracy).toBeUndefined();
  });

  it('rejects payloads that are not objects', () => {
    expectRejected(null, /object/);
    expectRejected(undefined, /object/);
    expectRejected('acid-classification', /object/);
    expectRejected(42, /object/);
  });

  it('rejects unknown, missing and prototype-key game ids', () => {
    expectRejected(validFor('neutralise', { gameId: 'made-up-game' }), /gameId/);
    expectRejected(validFor('neutralise', { gameId: undefined }), /gameId/);
    expectRejected(validFor('neutralise', { gameId: 42 }), /gameId/);
    expectRejected(validFor('neutralise', { gameId: 'constructor' }), /gameId/);
    expectRejected(validFor('neutralise', { gameId: 'toString' }), /gameId/);
  });

  it('rejects an outcome outside victory / failed / abandoned', () => {
    expectRejected(validFor('neutralise', { outcome: 'won' }), /outcome/);
    expectRejected(validFor('neutralise', { outcome: undefined }), /outcome/);
    expectRejected(validFor('neutralise', { outcome: 1 }), /outcome/);
  });

  it('rejects scores that are not finite non-negative integers', () => {
    expectRejected(validFor('neutralise', { score: 1.5 }), /score/);
    expectRejected(validFor('neutralise', { score: Number.NaN }), /score/);
    expectRejected(validFor('neutralise', { score: Number.POSITIVE_INFINITY }), /score/);
    expectRejected(validFor('neutralise', { score: '100' }), /score/);
    expectRejected(validFor('neutralise', { score: undefined }), /score/);
    expectRejected(validFor('neutralise', { score: -1 }), /negative/);
  });

  it('rejects a score above the game ceiling', () => {
    const { maxScore, maxLevel } = GAME_SESSION_LIMITS['acid-classification'];
    expectRejected(
      validFor('acid-classification', { score: maxScore + 1, levelReached: maxLevel }),
      /exceeds the maximum/
    );
  });

  it('rejects a score that is too high for the level reached', () => {
    const { maxScorePerLevel } = GAME_SESSION_LIMITS['acid-classification'];
    expectRejected(
      validFor('acid-classification', { score: maxScorePerLevel * 2 + 1, levelReached: 2 }),
      /ceiling .* level 2/
    );
    const atCeiling = validateSessionInput(
      validFor('acid-classification', { score: maxScorePerLevel * 2, levelReached: 2 })
    );
    expect(atCeiling.ok).toBe(true);
  });

  it('rejects levels outside 1..maxLevel or that are not integers', () => {
    const { maxLevel } = GAME_SESSION_LIMITS['formula-blaster'];
    expectRejected(validFor('formula-blaster', { levelReached: 0 }), /levelReached/);
    expectRejected(validFor('formula-blaster', { levelReached: -3 }), /levelReached/);
    expectRejected(validFor('formula-blaster', { levelReached: maxLevel + 1 }), /levelReached .* exceeds/);
    expectRejected(validFor('formula-blaster', { levelReached: 2.5 }), /levelReached/);
    expectRejected(validFor('formula-blaster', { levelReached: '2' }), /levelReached/);
    expectRejected(validFor('formula-blaster', { levelReached: null }), /levelReached/);
  });

  it('rejects durations that are not integers, too short, or longer than six hours', () => {
    const { minDurationSeconds } = GAME_SESSION_LIMITS['formula-blaster'];
    expectRejected(validFor('formula-blaster', { timeSpentSeconds: 12.5 }), /timeSpentSeconds/);
    expectRejected(validFor('formula-blaster', { timeSpentSeconds: '30' }), /timeSpentSeconds/);
    expectRejected(validFor('formula-blaster', { timeSpentSeconds: undefined }), /timeSpentSeconds/);
    expectRejected(validFor('formula-blaster', { timeSpentSeconds: minDurationSeconds - 1 }), /below the minimum/);
    expectRejected(validFor('formula-blaster', { timeSpentSeconds: -1 }), /below the minimum/);
    expectRejected(
      validFor('formula-blaster', { timeSpentSeconds: MAX_SESSION_DURATION_SECONDS + 1 }),
      /exceeds the maximum/
    );
  });

  it('allows a zero duration only for an abandoned run', () => {
    expectRejected(validFor('neutralise', { timeSpentSeconds: 0, outcome: 'victory' }), /below the minimum/);
    expectRejected(validFor('neutralise', { timeSpentSeconds: 0, outcome: 'failed' }), /below the minimum/);
    expect(validateSessionInput(validFor('neutralise', { timeSpentSeconds: 0, outcome: 'abandoned' })).ok).toBe(true);
    expectRejected(validFor('neutralise', { timeSpentSeconds: -1, outcome: 'abandoned' }), /below the minimum/);
  });

  it('rejects an accuracy outside 0-100 or that is not an integer', () => {
    expectRejected(validFor('neutralise', { accuracy: -1 }), /accuracy/);
    expectRejected(validFor('neutralise', { accuracy: 101 }), /accuracy/);
    expectRejected(validFor('neutralise', { accuracy: 50.5 }), /accuracy/);
    expectRejected(validFor('neutralise', { accuracy: '50' }), /accuracy/);
    expectRejected(validFor('neutralise', { accuracy: Number.NaN }), /accuracy/);
  });
});
