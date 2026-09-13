// src/core-engine/utils/level-manager.ts
// just for neutralise game

import { MoleculeInvader } from '../types/molecular-combat';
import { COMPOUNDS_REGISTRY } from '../data/compounds';
import { calculateMoleculeHealth, evaluateChemical } from './chemical-utils';
import {
  NEUTRALISE_CONFIG,
  NEUTRALISE_LEVEL_DATA,
  type NeutraliseLevelConfig,
} from '../config/games/neutralise-config';

/** Rules for a level; unknown levels fall back to the level-1 rules. */
export const resolveLevelConfig = (level: number): NeutraliseLevelConfig =>
  NEUTRALISE_LEVEL_DATA.find((l) => l.level === level) ?? NEUTRALISE_LEVEL_DATA[0];

/**
 * How many enemies a wave contains at a given level: the config ramp
 * (baseEnemiesPerWave + scaling per level) capped by the level's maxEnemies,
 * which is the same cap getLevelSpawns applies. The page and the arena must
 * both use this so a wave can always be completed.
 */
export const getEnemiesPerWave = (level: number): number => {
  const { baseEnemiesPerWave, enemyScalingPerLevel } = NEUTRALISE_CONFIG.waves;
  const ramp = baseEnemiesPerWave + (level - 1) * enemyScalingPerLevel;
  return Math.max(1, Math.min(ramp, resolveLevelConfig(level).maxEnemies));
};

/**
 * Generates initial spawn data for a wave of invaders based on level rules.
 */
export const getLevelSpawns = (
  count: number,
  compoundIds: string[],
  level: number = 1
): MoleculeInvader[] => {
  const levelConfig = resolveLevelConfig(level);

  // Restrict count according to central level maxEnemies setting
  const actualCount = Math.min(count, levelConfig.maxEnemies);

  const nonNeutralRegistry = COMPOUNDS_REGISTRY.filter(
    (c) => evaluateChemical(c) !== 'Neutral'
  );

  const spawnPool = nonNeutralRegistry.filter((c) => compoundIds.includes(c.id));
  const finalPool = spawnPool.length > 0 ? spawnPool : nonNeutralRegistry;

  if (finalPool.length === 0) {
    throw new Error('getLevelSpawns: no non-neutral compounds available in COMPOUNDS_REGISTRY.');
  }

  const invaders: MoleculeInvader[] = [];

  for (let i = 0; i < actualCount; i++) {
    const randomCompound = finalPool[Math.floor(Math.random() * finalPool.length)];
    const health = calculateMoleculeHealth(randomCompound);

    invaders.push({
      id: `${randomCompound.id}-${i}-${Date.now()}`,
      formula: randomCompound.formula,
      x: 0,
      y: 0,
      // Pool compounds are never neutral, so anything not acidic is a base.
      // Uses the same classification the Acid/Base game teaches, so amphoteric
      // compounds (NaHCO3, Na2HPO4, NaHS) are neutralised by the matching ion.
      type: evaluateChemical(randomCompound) === 'Acidic' ? 'acid' : 'base',
      maxHealth: health,
      currentHealth: health,
      isAlive: true,
      lastFired: Date.now(),
    });
  }

  return invaders;
};