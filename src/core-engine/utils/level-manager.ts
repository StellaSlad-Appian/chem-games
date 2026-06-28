import { MoleculeInvader } from '../types/molecular-combat';
import { COMPOUNDS_REGISTRY } from '../data/compounds';
import { calculateMoleculeHealth } from './chemical-utils';

/**
 * Generalized Level Generator
 * @param count Number of invaders to spawn
 * @param compoundIds Array of IDs permitted for this level/wave
 */
export const getLevelSpawns = (count: number, compoundIds: string[]): MoleculeInvader[] => {
  
  // 1. Filter registry based on the permitted IDs for the current level
  const spawnPool = COMPOUNDS_REGISTRY.filter(c => compoundIds.includes(c.id));

  // Fallback: If no IDs match, default to a safe set of compounds
  const finalPool = spawnPool.length > 0 ? spawnPool : COMPOUNDS_REGISTRY.slice(0, 3);

  const invaders: MoleculeInvader[] = [];
  
  for (let i = 0; i < count; i++) {
    const randomCompound = finalPool[Math.floor(Math.random() * finalPool.length)];
    const health = calculateMoleculeHealth(randomCompound);
    
    invaders.push({
      id: `${randomCompound.id}-${i}-${Date.now()}`,
      formula: randomCompound.formula,
      x: 50 + Math.random() * 700, 
      y: -50 - (Math.random() * 200), 
      // Ensure type mapping is consistent
      type: randomCompound.pKa !== undefined ? 'acid' : 'base',
      maxHealth: health,
      currentHealth: health,
      isAlive: true,
      lastFired: Date.now(),
    });
  }
  
  return invaders;
};