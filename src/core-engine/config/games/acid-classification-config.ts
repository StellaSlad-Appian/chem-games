// src/core-engine/config/games/acid-classification-config.ts

export const ACID_CLASSIFICATION_CONFIG = {
  levels: {
    // Maximum level progression available in the game
    maxLevel: 5,
    // Minimum correct answers required to clear a level's active pool
    minPassingItems: 3,
  },
  mechanics: {
    // Maximum number of mistakes allowed before failing the game
    maxMistakes: 3,
    // Base score multiplier awarded per correct classification multiplied by current level
    pointsPerLevelMultiplier: 100,
  },
  timing: {
    // Delay in milliseconds after a correct answer before proceeding
    successTransitionMs: 1200,
    // Delay in milliseconds after a wrong answer before clearing feedback state
    mistakeTransitionMs: 1200,
    // Delay in milliseconds before triggering the game over screen on max mistakes
    failStateDelayMs: 800,
  },

  // The modal instructions copy used to live here. It moved to the i18n
  // dictionaries so it exists in every language:
  // src/i18n/dictionaries/<locale>.ts -> games.acidClassification.
  // Tuning numbers stay here; only player-facing wording moved.
}