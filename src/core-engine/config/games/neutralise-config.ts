// src/core-engine/config/games/neutralise-config.ts

/*
 ==============================================================================
 🧪 USER ACCEPTANCE TESTING (UAT) TUNING GUIDE
 ==============================================================================
 Key parameters to tweak based on player feedback:

 1. IF PLAYERS SAY: "The enemies drop too fast / I don't have time to read!"
    👉 Increase `invaders.verticalGap` (e.g., 180 -> 220)
    👉 Decrease `invaders.baseDropSpeed` (e.g., 0.25 -> 0.18)

 2. IF PLAYERS SAY: "Level 1 is overwhelming / too many targets at once!"
    👉 Decrease `waves.baseEnemiesPerWave` (e.g., 3 -> 2)
    👉 Decrease `waves.enemyScalingPerLevel` (e.g., 1 -> 0.5)

 3. IF PLAYERS SAY: "My shots are missing when they should hit!"
    👉 Increase `player.projectileSpeed` magnitude (e.g., -9 -> -12)

 4. IF PLAYERS SAY: "It's too easy / I'm getting bored!"
    👉 Decrease `invaders.verticalGap` (e.g., 180 -> 140)
    👉 Increase `invaders.baseDropSpeed` (e.g., 0.25 -> 0.35)
 ==============================================================================
*/

export interface NeutraliseLevelConfig {
  level: number;
  maxEnemies: number;
  speedMultiplier: number;
  compoundPoolIds: string[];
}

export const NEUTRALISE_LEVEL_DATA: NeutraliseLevelConfig[] = [
  {
    level: 1,
    maxEnemies: 3,
    speedMultiplier: 1.0,
    compoundPoolIds: ['1', '2', '4', '5'],
  },
  {
    level: 2,
    maxEnemies: 4,
    speedMultiplier: 1.2,
    compoundPoolIds: ['1', '8', '9', '4', '11'],
  },
  {
    level: 3,
    maxEnemies: 4,
    speedMultiplier: 1.45,
    // Ba(OH)2 (ID 19) temporarily removed
    compoundPoolIds: ['2', '10', '5', '11', '16'],
  },
  {
    level: 4,
    maxEnemies: 5,
    speedMultiplier: 1.7,
    compoundPoolIds: ['18', '22', '25', '23', '24', '28'],
  },
  {
    level: 5,
    maxEnemies: 5, // Capped at 5 enemies max
    speedMultiplier: 2.0,
    compoundPoolIds: ['1', '10', '22', '29', '32', '4', '23', '31', '34'],
  },
  {
    level: 6,
    maxEnemies: 5, // Capped at 5 enemies max
    speedMultiplier: 2.2,
    compoundPoolIds: ['2', '10', '5', '11', '16'],
  },
  {
    level: 7,
    maxEnemies: 5, // Capped at 5 enemies max
    speedMultiplier: 2.4,
    compoundPoolIds: ['1', '10', '22', '29', '32', '4', '23', '31', '34'],
  },
  {
    level: 8,
    maxEnemies: 5, // Capped at 5 enemies max
    speedMultiplier: 2.6,
    compoundPoolIds: ['18', '22', '25', '23', '24', '28'],
  },
];

// -------------------------------------------------------------
// OPTION 1: "Gradual Onboarding"
// -------------------------------------------------------------
export const OPTION_1_GRADUAL = {
  arena: { width: 800, height: 500, padding: 20, bottomBoundary: 450 },
  player: {
    projectileSpeed: -9,
    projectileDimensions: { width: 24, height: 24 },
  },
  invaders: {
    baseDropSpeed: 0.25,
    speedMultiplierPerLevel: 0.05,
    verticalGap: 180,
    dimensions: { width: 60, height: 50 },
  },
  lanes: [12, 28, 44, 60, 76, 88],
  waves: {
    maxWavesPerLevel: 3,
    baseEnemiesPerWave: 3,
    enemyScalingPerLevel: 1,
  },
  engine: { tickRate: 1000 / 60 },
  mechanics: { basePointsPerDefeat: 100 },
} as const;

// -------------------------------------------------------------
// OPTION 2: "Arcade Action" (Tighter Spacing / Faster Streams)
// -------------------------------------------------------------
export const OPTION_2_ARCADE = {
  arena: { width: 800, height: 500, padding: 20, bottomBoundary: 450 },
  player: {
    projectileSpeed: -10,
    projectileDimensions: { width: 24, height: 24 },
  },
  invaders: {
    baseDropSpeed: 0.35,
    speedMultiplierPerLevel: 0.08,
    verticalGap: 140,
    dimensions: { width: 60, height: 50 },
  },
  lanes: [12, 28, 44, 60, 76, 88],
  waves: {
    maxWavesPerLevel: 3,
    baseEnemiesPerWave: 4,
    enemyScalingPerLevel: 1,
  },
  engine: { tickRate: 1000 / 60 },
  mechanics: { basePointsPerDefeat: 100 },
} as const;

// -------------------------------------------------------------
// OPTION 3: "Focused Precision" (Wide Spacing / Methodical)
// -------------------------------------------------------------
export const OPTION_3_PRECISION = {
  arena: { width: 800, height: 500, padding: 20, bottomBoundary: 450 },
  player: {
    projectileSpeed: -8,
    projectileDimensions: { width: 24, height: 24 },
  },
  invaders: {
    baseDropSpeed: 0.20,
    speedMultiplierPerLevel: 0.04,
    verticalGap: 200,
    dimensions: { width: 60, height: 50 },
  },
  lanes: [12, 28, 44, 60, 76, 88],
  waves: {
    maxWavesPerLevel: 3,
    baseEnemiesPerWave: 3,
    enemyScalingPerLevel: 1,
  },
  engine: { tickRate: 1000 / 60 },
  mechanics: { basePointsPerDefeat: 100 },
} as const;

// -------------------------------------------------------------
// OPTION 4: "Beginner Friendly" (Slower drop rate, smooth scaling)
// -------------------------------------------------------------
export const OPTION_4_BEGINNER = {
  arena: { width: 800, height: 500, padding: 20, bottomBoundary: 450 },
  player: {
    projectileSpeed: -9,
    projectileDimensions: { width: 24, height: 24 },
  },
  invaders: {
    baseDropSpeed: 0.18,
    speedMultiplierPerLevel: 0.04,
    verticalGap: 220,
    dimensions: { width: 60, height: 50 },
  },
  lanes: [12, 28, 44, 60, 76, 88],
  waves: {
    maxWavesPerLevel: 3,
    baseEnemiesPerWave: 2,
    enemyScalingPerLevel: 1,
  },
  engine: { tickRate: 1000 / 60 },
  mechanics: { basePointsPerDefeat: 100 },
} as const;

// Export default preset:
export const NEUTRALISE_CONFIG = OPTION_4_BEGINNER;