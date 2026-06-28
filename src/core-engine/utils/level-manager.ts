import { MoleculeInvader } from '../types/molecular-combat';
import { COMPOUNDS_REGISTRY } from '../data/compounds';

export const getLevelSpawns = (level: number): MoleculeInvader[] => {
  // 1. Get compounds that match the current level difficulty
  // Cap at 5 for levels > 5
  const targetDifficulty = Math.min(level, 5);
  const pool = COMPOUNDS_REGISTRY.filter(c => c.difficulty === targetDifficulty);

  // Fallback if no compounds match
  const spawnPool = pool.length > 0 ? pool : COMPOUNDS_REGISTRY;

  const numEnemies = 3 + Math.floor(level / 2);
  const invaders: MoleculeInvader[] = [];

  // Pick one random compound from the pool for this specific wave
  const randomCompound = spawnPool[Math.floor(Math.random() * spawnPool.length)];

  for (let i = 0; i < numEnemies; i++) {
    invaders.push({
      id: `${randomCompound.id}-${i}-${Date.now()}`,
      formula: randomCompound.formula,
      x: 100 + (i * 150),
      y: 50 + (Math.random() * 50),
      // Use the registry data to determine type
      type: randomCompound.pKa !== undefined ? 'acid' : (randomCompound.pKb !== undefined ? 'base' : 'neutral'),
      maxHealth: Math.ceil(level / 2),
      currentHealth: Math.ceil(level / 2),
      isAlive: true,
      lastFired: Date.now(),
    });
  }

  return invaders;
};