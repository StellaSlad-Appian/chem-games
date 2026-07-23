// src/core-engine/config/formula-blaster-config.ts

export const FORMULA_BLASTER_CONFIG = {
  levels: {
    maxLevel: 5 as number,
    targetsRequiredPerLevel: 3 as number,
  },
  mechanics: {
    baseWaveTimeSeconds: 45 as number,
    pointsPerLevelMultiplier: 100 as number,
    pityThreshold: 5 as number,
    initialBurstCount: 4 as number,
  },
  lanes: [12, 28, 44, 60, 76, 88] as number[],
  timing: {
    errorTooltipDurationMs: 3000 as number,
    minSpawnIntervalMs: 500 as number,
    baseSpawnIntervalMs: 900 as number,
    spawnIntervalLevelDecrement: 100 as number,
    laneCooldownMs: 800 as number,
  },
  physics: {
    baseSpeed: 6.5 as number,
    speedLevelDecrement: 0.8 as number,
    minSpeed: 2.5 as number,
    baseVariance: 1.5 as number,
    varianceLevelDecrement: 0.1 as number,
    minVariance: 0.8 as number,
  },
  visuals: {
    spawnColorPool: [
      'border-cyan-400 text-cyan-400 hover:border-cyan-300',
      'border-pink-500 text-pink-400 hover:border-pink-400',
      'border-amber-400 text-amber-400 hover:border-amber-300',
      'border-emerald-400 text-emerald-400 hover:border-emerald-300',
      'border-blue-500 text-blue-400 hover:border-blue-400',
    ],
  },
} as const;