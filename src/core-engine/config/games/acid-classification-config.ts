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

  // 🎯 Modal Instructions Copy
  instructions: {
    title: 'How to Play: Chemical Classifier',
    subtitle: 'Analyze the chemical formula and identify its properties!',
    steps: [
      { highlight: 'Identify:', text: 'Look at the compound shown in the center bubble.' },
      { highlight: 'Classify:', text: 'Select whether it is an Acid, Base, Neutral, or Amphoteric substance.' },
      { highlight: 'Need a Hint?', text: 'Click the lightbulb icon in the header to reveal the chemical name.' },
      { highlight: 'Careful:', text: '3 mistakes and the beaker breaks!' },
    ],
  }
}