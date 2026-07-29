// src/core-engine/config/games/formula-blaster-config.ts

/*
 ==============================================================================
  USER ACCEPTANCE TESTING (UAT) TUNING GUIDE
 ==============================================================================
 When testing with players (students/teachers on laptops or tablets), these 
 are the key parameters you'll want to tweak based on user feedback:

 1. IF PLAYERS SAY: "The bubbles float away too fast / I can't read formulas!"
    Increase `physics.baseSpeed` (e.g., 7.2 -> 8.5)
       Remember: In this engine, HIGHER numbers = SLOWER travel duration!
    Increase `physics.minSpeed` (e.g., 3.2 -> 4.5)
       Prevents high levels from becoming unreadably fast.

 2. IF PLAYERS SAY: "The screen feels empty / I'm waiting for targets!"
    Decrease `timing.baseSpawnIntervalMs` (e.g., 650 -> 450)
       Spawns new bubbles more frequently to keep the playing field busy.
    Increase `mechanics.initialBurstCount` (e.g., 3 -> 4)
       Spawns more bubbles immediately when the round begins.

 3. IF PLAYERS SAY: "I can never find the target formula / Too many wrong options!"
    Lower `mechanics.pityThreshold` (e.g., 5 -> 3)
       Guarantees a correct target bubble spawns sooner after distractor streaks.

 4. IF PLAYERS SAY: "The game ends too quickly / I ran out of time!"
    Increase `mechanics.baseWaveTimeSeconds` (e.g., 45 -> 60)
       Gives students extra time to find required molecules before wave timeout.
 ==============================================================================
*/

// -------------------------------------------------------------
// OPTION 1: "Smooth Flow" (RECOMMENDED DEFAULT)
// Balanced speed (~10% slower) with rapid trickle spawns.
// -------------------------------------------------------------
const OPTION_1_SMOOTH = {
  levels: { maxLevel: 5, targetsRequiredPerLevel: 3 },
  mechanics: { baseWaveTimeSeconds: 45, pointsPerLevelMultiplier: 100, pityThreshold: 5, initialBurstCount: 3 },
  lanes: [12, 28, 44, 60, 76, 88],
  timing: { errorTooltipDurationMs: 3000, minSpawnIntervalMs: 400, baseSpawnIntervalMs: 650, spawnIntervalLevelDecrement: 50, laneCooldownMs: 600 },
  physics: { baseSpeed: 7.2, speedLevelDecrement: 0.7, minSpeed: 3.2, baseVariance: 1.5, varianceLevelDecrement: 0.1, minVariance: 0.8 },
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

// -------------------------------------------------------------
// OPTION 2: "Arcade Rapid" (Packed Screen / High Energy)
// -------------------------------------------------------------
const OPTION_2_ARCADE = {
  levels: { maxLevel: 5, targetsRequiredPerLevel: 3 },
  mechanics: { baseWaveTimeSeconds: 45, pointsPerLevelMultiplier: 100, pityThreshold: 5, initialBurstCount: 4 },
  lanes: [12, 28, 44, 60, 76, 88],
  timing: { errorTooltipDurationMs: 3000, minSpawnIntervalMs: 350, baseSpawnIntervalMs: 500, spawnIntervalLevelDecrement: 40, laneCooldownMs: 500 },
  physics: { baseSpeed: 7.6, speedLevelDecrement: 0.6, minSpeed: 3.5, baseVariance: 1.2, varianceLevelDecrement: 0.1, minVariance: 0.8 },
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

// -------------------------------------------------------------
// OPTION 3: "Focused Precision" (Slightly Slower Baseline)
// -------------------------------------------------------------
const OPTION_3_PRECISION = {
  levels: { maxLevel: 5, targetsRequiredPerLevel: 3 },
  mechanics: { baseWaveTimeSeconds: 45, pointsPerLevelMultiplier: 100, pityThreshold: 5, initialBurstCount: 3 },
  lanes: [12, 28, 44, 60, 76, 88],
  timing: { errorTooltipDurationMs: 3000, minSpawnIntervalMs: 450, baseSpawnIntervalMs: 750, spawnIntervalLevelDecrement: 60, laneCooldownMs: 700 },
  physics: { baseSpeed: 6.9, speedLevelDecrement: 0.75, minSpeed: 3.0, baseVariance: 1.5, varianceLevelDecrement: 0.1, minVariance: 0.8 },
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

// CHANGE THIS ONE EXPORT TO SWITCH PRESETS:
export const FORMULA_BLASTER_CONFIG = OPTION_3_PRECISION;
