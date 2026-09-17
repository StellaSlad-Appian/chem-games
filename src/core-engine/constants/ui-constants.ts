// src/core-engine/constants/ui-constants.ts
// Used by the Views and Controllers.
//
// Player-facing strings are NOT defined here any more — they live in
// src/i18n/dictionaries/<locale>.ts so every language has them. What remains is
// the state machine's vocabulary (keys, status values), which is internal and
// never rendered. The shared-chrome labels that used to sit in `UI_LABELS` are
// now `games.shared.*`, and `DEFAULT_OVERLAY_MESSAGES` is now
// `games.overlay.*`, assembled by GameOverlay itself.

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

// The default overlay copy is assembled from the active dictionary in
// src/components/games/shared/GameOverlay.tsx. A game that wants to name the
// chemistry it just achieved still passes `customMessages` of this shape.