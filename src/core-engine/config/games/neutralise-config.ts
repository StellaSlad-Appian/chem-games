export const NEUTRALISE_CONFIG = {
  arena: {
    width: 800,
    height: 500,
    padding: 20,
    bottomBoundary: 450, // Where the invaders cause "player hit"
  },
  player: {
    projectileSpeed: -8,
    projectileDimensions: { width: 24, height: 24 },
  },
  invaders: {
    baseDropSpeed: 0.2,
    speedMultiplierPerLevel: 0.05,
    dimensions: { width: 60, height: 50 },
  },
  waves: {
    maxWavesPerLevel: 3,
    maxEnemiesPerWave: 5,
  },
  engine: {
    tickRate: 1000 / 60, // 60 FPS
  },
  mechanics: {
    basePointsPerDefeat: 100,
  }
};