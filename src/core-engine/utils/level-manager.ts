// src/core-engine/utils/level-manager.ts

import { MoleculeInvader } from '../types/molecular-combat';
import { COMPOUNDS_REGISTRY } from '../data/compounds';
import { calculateMoleculeHealth, evaluateChemical } from './chemical-utils';

/**
 * Generalized Level Generator
 * @param count Number of invaders to spawn
 * @param compoundIds Array of IDs permitted for this level/wave
 */
export const getLevelSpawns = (count: number, compoundIds: string[]): MoleculeInvader[] => {

  // Neutral compounds are excluded up front: isNeutralizationCompatible()
  // always returns false for 'neutral', so a neutral invader can never be
  // defeated by any projectile — spawning one would create an unwinnable
  // wave, not just an easier/harder one.
  const nonNeutralRegistry = COMPOUNDS_REGISTRY.filter(
    (c) => evaluateChemical(c) !== 'Neutral'
  );

  const spawnPool = nonNeutralRegistry.filter(c => compoundIds.includes(c.id));

  // Fallback: if this level's configured pool has no non-neutral
  // compounds, fall back to the FULL non-neutral registry.
  const finalPool = spawnPool.length > 0 ? spawnPool : nonNeutralRegistry;

  if (finalPool.length === 0) {
    throw new Error(
      'getLevelSpawns: no non-neutral compounds available in COMPOUNDS_REGISTRY. ' +
      'Neutralise cannot spawn any defeatable invaders.'
    );
  }

  const invaders: MoleculeInvader[] = [];

  for (let i = 0; i < count; i++) {
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