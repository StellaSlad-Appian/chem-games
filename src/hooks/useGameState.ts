// src/hooks/useGameState.ts
import { useState } from 'react';
import { GameState } from '../core-engine/types/general';

interface UseGameStateOptions {
  initialLevel?: number;
  initialScore?: number;
}

/**
 * Shared game state primitives used across all mini-games.
 * Centralises togglePause logic and prevents state duplication between pages.
 */
export function useGameState({ initialLevel = 1, initialScore = 0 }: UseGameStateOptions = {}) {
  const [gameState, setGameState]       = useState<GameState>('playing');
  const [score, setScore]               = useState(initialScore);
  const [currentLevel, setCurrentLevel] = useState(initialLevel);

  const TERMINAL_STATES: GameState[] = ['failed', 'victory', 'levelUp'];

  const togglePause = () => {
    if (TERMINAL_STATES.includes(gameState)) return;
    setGameState(prev => prev === 'playing' ? 'paused' : 'playing');
  };

  const resetBase = () => {
    setScore(initialScore);
    setCurrentLevel(initialLevel);
    setGameState('playing');
  };

  return {
    gameState, setGameState,
    score, setScore,
    currentLevel, setCurrentLevel,
    togglePause,
    resetBase,
  };
}