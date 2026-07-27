// src/core-engine/config/games/neutralise-config.ts

/*
 ==============================================================================
 🧪 USER ACCEPTANCE TESTING (UAT) TUNING GUIDE
 ==============================================================================
 When testing with players (students/teachers on laptops or tablets), these
 are the key parameters you'll want to tweak based on user feedback:

 1. IF PLAYERS SAY: "The enemies drop too fast / I don't have time to read!"
    👉 Increase `invaders.verticalGap` (e.g., 180 -> 220)
       Spaces out enemy rows vertically, giving players more reaction time.
    👉 Decrease `invaders.baseDropSpeed` (e.g., 0.25 -> 0.18)
       Slows down overall falling speed across all levels.

 2. IF PLAYERS SAY: "Level 1 is overwhelming / too many targets at once!"
    👉 Decrease `waves.baseEnemiesPerWave` (e.g., 3 -> 2)
       Reduces initial enemy count on Level 1.
    👉 Decrease `waves.enemyScalingPerLevel` (e.g., 1 -> 0.5)
       Slows down how many enemies get added per level.

 3. IF PLAYERS SAY: "My shots are missing when they should hit!"
    👉 Increase `player.projectileSpeed` magnitude (e.g., -9 -> -12)
       Makes ion lasers travel faster upward so players don't have to lead targets.

 4. IF PLAYERS SAY: "It's too easy / I'm getting bored!"
    👉 Decrease `invaders.verticalGap` (e.g., 180 -> 140)
    👉 Increase `invaders.baseDropSpeed` (e.g., 0.25 -> 0.35)
 ==============================================================================
*/

// -------------------------------------------------------------
// OPTION 1: "Gradual Onboarding"
// -------------------------------------------------------------
const OPTION_1_GRADUAL = {
  arena: { width: 800, height: 500, padding: 20, bottomBoundary: 450 },
  player: {
    projectileSpeed: -9 as number,
    projectileDimensions: { width: 24 as number, height: 24 as number },
  },
  invaders: {
    baseDropSpeed: 0.25 as number,
    speedMultiplierPerLevel: 0.05 as number,
    verticalGap: 180 as number,
    dimensions: { width: 60 as number, height: 50 as number },
  },
  lanes: [12, 28, 44, 60, 76, 88] as number[],
  waves: {
    maxWavesPerLevel: 3 as number,
    baseEnemiesPerWave: 3 as number,
    enemyScalingPerLevel: 1 as number,
  },
  engine: { tickRate: 1000 / 60 as number },
  mechanics: { basePointsPerDefeat: 100 as number },
} as const;

// -------------------------------------------------------------
// OPTION 2: "Arcade Action" (Tighter Spacing / Faster Streams)
// -------------------------------------------------------------
const OPTION_2_ARCADE = {
  arena: { width: 800, height: 500, padding: 20, bottomBoundary: 450 },
  player: {
    projectileSpeed: -10 as number,
    projectileDimensions: { width: 24 as number, height: 24 as number },
  },
  invaders: {
    baseDropSpeed: 0.35 as number,
    speedMultiplierPerLevel: 0.08 as number,
    verticalGap: 140 as number,
    dimensions: { width: 60 as number, height: 50 as number },
  },
  lanes: [12, 28, 44, 60, 76, 88] as number[],
  waves: {
    maxWavesPerLevel: 3 as number,
    baseEnemiesPerWave: 4 as number,
    enemyScalingPerLevel: 1 as number,
  },
  engine: { tickRate: 1000 / 60 as number },
  mechanics: { basePointsPerDefeat: 100 as number },
} as const;

// -------------------------------------------------------------
// OPTION 3: "Focused Precision" (Wide Spacing / Methodical)
// -------------------------------------------------------------
const OPTION_3_PRECISION = {
  arena: { width: 800, height: 500, padding: 20, bottomBoundary: 450 },
  player: {
    projectileSpeed: -8 as number,
    projectileDimensions: { width: 24 as number, height: 24 as number },
  },
  invaders: {
    baseDropSpeed: 0.20 as number,
    speedMultiplierPerLevel: 0.04 as number,
    verticalGap: 200 as number,
    dimensions: { width: 60 as number, height: 50 as number },
  },
  lanes: [12, 28, 44, 60, 76, 88] as number[],
  waves: {
    maxWavesPerLevel: 3 as number,
    baseEnemiesPerWave: 3 as number,
    enemyScalingPerLevel: 1 as number,
  },
  engine: { tickRate: 1000 / 60 as number },
  mechanics: { basePointsPerDefeat: 100 as number },
} as const;

// -------------------------------------------------------------
// OPTION 4: "Beginner Friendly" (Fewer enemies, more reaction time)
// Level 1 → 2 enemies, Level 2 → 3, Level 3 → 4, etc.
// -------------------------------------------------------------
const OPTION_4_BEGINNER = {
  arena: { width: 800, height: 500, padding: 20, bottomBoundary: 450 },
  player: {
    projectileSpeed: -9 as number,
    projectileDimensions: { width: 24 as number, height: 24 as number },
  },
  invaders: {
    baseDropSpeed: 0.18 as number,
    speedMultiplierPerLevel: 0.04 as number,
    verticalGap: 220 as number,
    dimensions: { width: 60 as number, height: 50 as number },
  },
  lanes: [12, 28, 44, 60, 76, 88] as number[],
  waves: {
    maxWavesPerLevel: 3 as number,
    baseEnemiesPerWave: 2 as number, // Level 1 starts with just 2 enemies
    enemyScalingPerLevel: 1 as number, // +1 enemy per level thereafter
  },
  engine: { tickRate: 1000 / 60 as number },
  mechanics: { basePointsPerDefeat: 100 as number },
} as const;

// CHANGE THIS EXPORT TO SWITCH PRESETS:
export const NEUTRALISE_CONFIG = OPTION_4_BEGINNER;