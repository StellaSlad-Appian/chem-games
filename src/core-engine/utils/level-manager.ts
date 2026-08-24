// src/core-engine/utils/level-manager.ts
// just for neutralise game

import { MoleculeInvader } from '../types/molecular-combat';
import { COMPOUNDS_REGISTRY } from '../data/compounds';
import { calculateMoleculeHealth, evaluateChemical } from './chemical-utils';
import { NEUTRALISE_LEVEL_DATA } from '../config/games/neutralise-config';

/**
 * Generates initial spawn data for a wave of invaders based on level rules.
 */
export const getLevelSpawns = (
  count: number,
  compoundIds: string[],
  level: number = 1
): MoleculeInvader[] => {
  const levelConfig =
    NEUTRALISE_LEVEL_DATA.find((l) => l.level === level) || NEUTRALISE_LEVEL_DATA[0];

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
      type: randomCompound.pKa !== undefined ? 'acid' : 'base',
      maxHealth: health,
      currentHealth: health,
      isAlive: true,
      lastFired: Date.now(),
    });
  }

  return invaders;
};