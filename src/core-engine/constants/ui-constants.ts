// src/core-engine/constants/ui-constants.ts
// Used by the Views and Controllers
export const UI_LABELS = {
  SETTINGS: "Settings",
  INSTRUCTIONS: "How to Play",
  EXIT: "Exit",
  HINT: "Get Hint",
} as const;

// export const ROUTES = {
//   HOME: '/',
//   ACID_GAME: '/games/acid-classification',
//   NEUTRALIZE: '/games/neutralise',
//   FORMULA_BLASTER: '/games/formula-blaster',
// } as const;

export const GAME_CONTROLS = {
  PAUSE: 'p',
  FIRE: ' ',
} as const;

export const ANSWER_STATUS = {
  IDLE: 'idle',
  CORRECT: 'correct',
  WRONG: 'wrong',
} as const;

export type AnswerStatus = typeof ANSWER_STATUS[keyof typeof ANSWER_STATUS] | null;

// Keeping it separate from the broad Game State
export const GAME_STATE = {
  PLAYING: 'playing',
  PAUSED: 'paused',
  LEVEL_UP: 'levelUp',
  FAILED: 'failed',
  VICTORY: 'victory',
} as const;

export interface OverlayMessageConfig {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
}

// 🎯 Shared Default Messages for Overlay States across all ChemGames
export const DEFAULT_OVERLAY_MESSAGES: Record<string, OverlayMessageConfig> = {
  paused: {
    badge: 'Session on hold',
    title: 'Game Paused',
    subtitle: 'Take a quick lab break.',
    description: 'Your experiment is frozen exactly where you left it.',
  },
  failed: {
    badge: 'Experiment ended',
    title: 'Game Over',
    subtitle: 'Your reaction fizzled!',
    description: 'Review the formulas and try the run again.',
  },
  victory: {
    badge: 'All objectives complete',
    title: 'Research Complete',
    subtitle: 'Lab Mastered!',
    description: 'Splendid work, Researcher! You cleared all levels.',
  },
  levelUp: {
    badge: 'Objective secured',
    title: 'Level Cleared',
    subtitle: 'Batch complete!',
    description: 'Ready to take on higher level challenges?',
  },
};