import { describe, expect, it } from 'vitest';
import { NEUTRALISE_CONFIG, NEUTRALISE_LEVEL_DATA } from '../config/games/neutralise-config';
import { FORMULA_BLASTER_CONFIG } from '../config/games/formula-blaster-config';
import { ACID_CLASSIFICATION_CONFIG } from '../config/games/acid-classification-config';
import { CLASSIFICATION_OPTIONS } from '../constants/chemical-labels';
import { COMPOUNDS_REGISTRY } from '../data/compounds';
import { evaluateChemical } from '../utils/chemical-utils';
import { compoundById, compoundsAtDifficulty } from '@/test-utils/registry';

const expectLanesInsideArena = (lanes: readonly number[]) => {
  lanes.forEach((lane, i) => {
    expect(lane).toBeGreaterThanOrEqual(5);
    expect(lane).toBeLessThanOrEqual(95);
    if (i > 0) expect(lane).toBeGreaterThan(lanes[i - 1]);
  });
};

describe('Neutralise level data', () => {
  it('numbers levels contiguously from 1', () => {
    expect(NEUTRALISE_LEVEL_DATA.map((l) => l.level)).toEqual(
      NEUTRALISE_LEVEL_DATA.map((_, i) => i + 1)
    );
  });

  it('references only compounds that exist', () => {
    NEUTRALISE_LEVEL_DATA.forEach((level) => {
      level.compoundPoolIds.forEach((id) => {
        expect(() => compoundById(id), `level ${level.level} id ${id}`).not.toThrow();
      });
    });
  });

  it('uses only non-neutral compounds (neutral ones are silently dropped by getLevelSpawns)', () => {
    NEUTRALISE_LEVEL_DATA.forEach((level) => {
      level.compoundPoolIds.forEach((id) => {
        const compound = compoundById(id);
        expect(evaluateChemical(compound), `level ${level.level}: ${compound.formula}`).not.toBe('Neutral');
      });
    });
  });

  it('includes at least one acid and one base per level so both ions matter', () => {
    NEUTRALISE_LEVEL_DATA.forEach((level) => {
      const kinds = new Set(level.compoundPoolIds.map((id) => evaluateChemical(compoundById(id))));
      expect(kinds.has('Acidic'), `level ${level.level} has an acid`).toBe(true);
      expect(kinds.has('Basic'), `level ${level.level} has a base`).toBe(true);
    });
  });

  it('spawns at least one enemy per level and never slows down at higher levels', () => {
    NEUTRALISE_LEVEL_DATA.forEach((level, i) => {
      expect(level.maxEnemies, `level ${level.level}`).toBeGreaterThanOrEqual(1);
      if (i > 0) {
        expect(level.speedMultiplier).toBeGreaterThanOrEqual(NEUTRALISE_LEVEL_DATA[i - 1].speedMultiplier);
      }
    });
  });
});

describe('Neutralise physics config', () => {
  it('keeps lanes inside the arena and in ascending order', () => {
    expectLanesInsideArena(NEUTRALISE_CONFIG.lanes);
  });

  it('fires projectiles upwards on a positive tick rate', () => {
    expect(NEUTRALISE_CONFIG.player.projectileSpeed).toBeLessThan(0);
    expect(NEUTRALISE_CONFIG.engine.tickRate).toBeGreaterThan(0);
  });

  it('gives invaders room to drop and rows room to breathe', () => {
    expect(NEUTRALISE_CONFIG.arena.bottomBoundary).toBeLessThan(NEUTRALISE_CONFIG.arena.height);
    expect(NEUTRALISE_CONFIG.invaders.verticalGap).toBeGreaterThan(
      NEUTRALISE_CONFIG.invaders.dimensions.height
    );
    expect(NEUTRALISE_CONFIG.invaders.baseDropSpeed).toBeGreaterThan(0);
  });

  it('has at least one enemy and one wave per level', () => {
    expect(NEUTRALISE_CONFIG.waves.baseEnemiesPerWave).toBeGreaterThanOrEqual(1);
    expect(NEUTRALISE_CONFIG.waves.maxWavesPerLevel).toBeGreaterThanOrEqual(1);
  });
});

describe('Formula Blaster config', () => {
  it('has a target and at least one distractor available for every level', () => {
    for (let level = 1; level <= FORMULA_BLASTER_CONFIG.levels.maxLevel; level++) {
      expect(compoundsAtDifficulty(level).length, `difficulty ${level}`).toBeGreaterThanOrEqual(2);
    }
  });

  it('keeps spawn intervals and speeds above their floors', () => {
    const { timing, physics } = FORMULA_BLASTER_CONFIG;
    expect(timing.minSpawnIntervalMs).toBeGreaterThan(0);
    expect(timing.baseSpawnIntervalMs).toBeGreaterThanOrEqual(timing.minSpawnIntervalMs);
    expect(physics.minSpeed).toBeGreaterThan(0);
    expect(physics.baseSpeed).toBeGreaterThanOrEqual(physics.minSpeed);
    expect(physics.minVariance).toBeGreaterThan(0);
  });

  it('keeps lanes inside the arena and in ascending order', () => {
    expectLanesInsideArena(FORMULA_BLASTER_CONFIG.lanes);
  });

  it('requires at least one target per level, a positive pity threshold and a colour pool', () => {
    expect(FORMULA_BLASTER_CONFIG.levels.targetsRequiredPerLevel).toBeGreaterThanOrEqual(1);
    expect(FORMULA_BLASTER_CONFIG.mechanics.pityThreshold).toBeGreaterThanOrEqual(1);
    expect(FORMULA_BLASTER_CONFIG.mechanics.initialBurstCount).toBeGreaterThanOrEqual(1);
    expect(FORMULA_BLASTER_CONFIG.mechanics.baseWaveTimeSeconds).toBeGreaterThan(0);
    expect(FORMULA_BLASTER_CONFIG.visuals.spawnColorPool.length).toBeGreaterThan(0);
  });
});

describe('Acid classification config', () => {
  it('has enough compounds at every level to meet the passing quota', () => {
    const { maxLevel, minPassingItems } = ACID_CLASSIFICATION_CONFIG.levels;
    for (let level = 1; level <= maxLevel; level++) {
      const quota = Math.max(minPassingItems, compoundsAtDifficulty(level).length - 2);
      expect(compoundsAtDifficulty(level).length, `difficulty ${level}`).toBeGreaterThanOrEqual(quota);
    }
  });

  it('allows at least one mistake and uses positive transition timings', () => {
    expect(ACID_CLASSIFICATION_CONFIG.mechanics.maxMistakes).toBeGreaterThanOrEqual(1);
    expect(ACID_CLASSIFICATION_CONFIG.mechanics.pointsPerLevelMultiplier).toBeGreaterThan(0);
    Object.values(ACID_CLASSIFICATION_CONFIG.timing).forEach((ms) => expect(ms).toBeGreaterThan(0));
  });

  it('offers a vessel for every classification the registry can produce', () => {
    const offered = new Set(CLASSIFICATION_OPTIONS.map((o) => o.classification));
    COMPOUNDS_REGISTRY.forEach((c) => {
      expect(offered.has(evaluateChemical(c)), c.formula).toBe(true);
    });
  });

  it('orders the vessels Acid → Neutral → Base', () => {
    const ordered = [...CLASSIFICATION_OPTIONS].sort((a, b) => a.order - b.order).map((o) => o.label);
    expect(ordered).toEqual(['Acid', 'Neutral', 'Base']);
  });

  // The instructions copy moved out of the config and into the i18n
  // dictionaries so it exists in every language. Its presence and parity across
  // locales is asserted in src/i18n/dictionary.test.ts; what belongs here is
  // that the config still carries only tuning numbers.
  it('keeps only tuning values in the config', () => {
    expect(ACID_CLASSIFICATION_CONFIG.levels.maxLevel).toBeGreaterThan(0);
    expect(ACID_CLASSIFICATION_CONFIG).not.toHaveProperty('instructions');
  });
});
