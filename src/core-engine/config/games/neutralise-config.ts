// src/core-engine/config/games/neutralise-config.ts

export const NEUTRALISE_CONFIG = {
  arena: {
    width: 800,
    height: 500,
    padding: 20,
    bottomBoundary: 450, // Where invaders cause "player hit"
  },
  player: {
    projectileSpeed: -8 as number,
    projectileDimensions: { width: 24 as number, height: 24 as number },
  },
  invaders: {
    baseDropSpeed: 0.2 as number,
    speedMultiplierPerLevel: 0.05 as number,
    dimensions: { width: 60 as number, height: 50 as number },
  },
  // Horizontal lanes (percentage across the arena width)
  lanes: [10, 26, 42, 58, 74, 90] as number[],
  timing: {
    baseSpawnIntervalMs: 2000 as number,
    minSpawnIntervalMs: 800 as number,
    spawnIntervalLevelDecrement: 150 as number,
    laneCooldownMs: 1200 as number, // Safe delay before re-using the same column
  },
  waves: {
    maxWavesPerLevel: 3 as number,
    maxEnemiesPerWave: 5 as number,
  },
  engine: {
    tickRate: 1000 / 60 as number, // 60 FPS
  },
  mechanics: {
    basePointsPerDefeat: 100 as number,
  },
} as const;