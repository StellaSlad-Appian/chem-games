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
    // 2 Strong Acids (HCl, H2SO4) | 2 Strong Bases (NaOH, KOH)
    compoundPoolIds: ['1', '2', '4', '5'],
  },
  {
    level: 2,
    maxEnemies: 4,
    speedMultiplier: 1.2,
    // 2 Acids (HCl, HF) | 2 Bases (NaOH, NH3) | 1 Weak Acid (H2CO3)
    compoundPoolIds: ['1', '8', '9', '4', '11'],
  },
  {
    level: 3,
    maxEnemies: 4,
    speedMultiplier: 1.45,
    // 2 Acids (H2SO4, H3PO4) | 3 Bases/Amphoterics (KOH, NH3, NaHCO3)
    // Ba(OH)2 (ID 19) temporarily removed
    compoundPoolIds: ['2', '10', '5', '11', '16'],
  },
  {
    level: 4,
    maxEnemies: 5,
    speedMultiplier: 1.7,
    // 3 Acids (HNO2, H2SO3, HBr) | 3 Bases/Amphoterics (N2H4, LiOH, Na2HPO4)
    compoundPoolIds: ['18', '22', '25', '23', '24', '28'],
  },
  {
    level: 5,
    maxEnemies: 5,
    speedMultiplier: 2.0,
    // 5 Acids (HCl, H3PO4, H2SO3, HClO4, H3BO3) | 4 Bases (NaOH, N2H4, CsOH, NaHS)
    compoundPoolIds: ['1', '10', '22', '29', '32', '4', '23', '31', '34'],
  },
  {
    level: 6,
    maxEnemies: 5,
    speedMultiplier: 2.2,
    // 2 Acids (H2SO4, H3PO4) | 3 Bases/Amphoterics (KOH, NH3, NaHCO3)
    compoundPoolIds: ['2', '10', '5', '11', '16'],
  },
  {
    level: 7,
    maxEnemies: 6,
    speedMultiplier: 2.4,
    // 5 Acids (HCl, H3PO4, H2SO3, HClO4, H3BO3) | 4 Bases (NaOH, N2H4, CsOH, NaHS)
    compoundPoolIds: ['1', '10', '22', '29', '32', '4', '23', '31', '34'],
  },
  {
    level: 8,
    maxEnemies: 6,
    speedMultiplier: 2.6,
    // 3 Acids (HNO2, H2SO3, HBr) | 3 Bases/Amphoterics (N2H4, LiOH, Na2HPO4)
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
// OPTION 4: "Beginner Friendly" (Fewer enemies, more reaction time)
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

// CHANGE THIS EXPORT TO SWITCH PRESETS:
export const NEUTRALISE_CONFIG = OPTION_4_BEGINNER;