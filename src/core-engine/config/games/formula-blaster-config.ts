// src/core-engine/config/formula-blaster-config.ts

export const FORMULA_BLASTER_CONFIG = {
  levels: {
    // Maximum level progression available in the game
    maxLevel: 5,
    // Number of sequential target molecules required to clear a level
    targetsRequiredPerLevel: 3,
  },
  mechanics: {
    // Base countdown timer in seconds per molecule wave
    baseWaveTimeSeconds: 45,
    // Points awarded per correct bubble pop multiplied by the current level
    pointsPerLevelMultiplier: 100,
    // Minimum consecutive distractors before triggering a guaranteed correct target bubble (Pity mechanic)
    pityThreshold: 5,
    // Number of bubbles to instantly spawn at the start of a wave to prevent empty screens
    initialBurstCount: 4,
  },
  timing: {
    // Duration in milliseconds that the comparative error tooltip stays visible after a wrong click
    errorTooltipDurationMs: 3000,
    // The absolute fastest a bubble can spawn in milliseconds (prevents impossible difficulty)
    minSpawnIntervalMs: 500,
    // The starting spawn interval at level 1
    baseSpawnIntervalMs: 900,
    // How many milliseconds to subtract from the spawn interval per level increase
    spawnIntervalLevelDecrement: 100,
  },
  physics: {
    // Base movement speed for CSS transition durations (lower is faster)
    baseSpeed: 6.5,
    // How much speed is subtracted per level to make bubbles faster
    speedLevelDecrement: 0.8,
    // The absolute minimum speed duration allowed
    minSpeed: 2.5,
    // Base random variance added to speed to keep movement unpredictable
    baseVariance: 1.5,
    // How much the variance shrinks as levels get harder
    varianceLevelDecrement: 0.1,
    // Minimum allowable variance
    minVariance: 0.8,
  },
  visuals: {
    // Rotating color pool for spawned bubbles using simpler Tailwind classes
    spawnColorPool: [
      'border-cyan-400 text-cyan-400 hover:border-cyan-300',
      'border-pink-500 text-pink-400 hover:border-pink-400',
      'border-amber-400 text-amber-400 hover:border-amber-300',
      'border-emerald-400 text-emerald-400 hover:border-emerald-300',
      'border-blue-500 text-blue-400 hover:border-blue-400',
    ],
  }
} as const;