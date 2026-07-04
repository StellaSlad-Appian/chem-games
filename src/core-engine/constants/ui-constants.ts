// src/core-engine/constants/ui-constants.ts
// Used by the Views and Controllers
export const UI_LABELS = {
  SETTINGS: "Settings",
  INSTRUCTIONS: "How to Play",
  EXIT: "Exit",
  HINT: "Get Hint",
} as const;

export const ROUTES = {
  HOME: '/',
  ACID_GAME: '/games/acid-classification',
  NEUTRALIZE: '/games/neutralize',
  FORMULA_BLASTER: '/games/formula-blaster',
} as const;

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