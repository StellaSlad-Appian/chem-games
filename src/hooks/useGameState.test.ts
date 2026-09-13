import { describe, expect, it } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useGameState } from './useGameState';

describe('useGameState', () => {
  it('starts playing at level 1 with score 0', () => {
    const { result } = renderHook(() => useGameState());
    expect(result.current.gameState).toBe('playing');
    expect(result.current.currentLevel).toBe(1);
    expect(result.current.score).toBe(0);
  });

  it('honours the initial level and score', () => {
    const { result } = renderHook(() => useGameState({ initialLevel: 3, initialScore: 250 }));
    expect(result.current.currentLevel).toBe(3);
    expect(result.current.score).toBe(250);
  });

  it('togglePause flips between playing and paused', () => {
    const { result } = renderHook(() => useGameState());
    act(() => result.current.togglePause());
    expect(result.current.gameState).toBe('paused');
    act(() => result.current.togglePause());
    expect(result.current.gameState).toBe('playing');
  });

  it.each(['failed', 'victory', 'levelUp'] as const)(
    'togglePause is ignored in the terminal state "%s"',
    (state) => {
      const { result } = renderHook(() => useGameState());
      act(() => result.current.setGameState(state));
      act(() => result.current.togglePause());
      expect(result.current.gameState).toBe(state);
    }
  );

  it('resetBase restores the initial values and resumes play', () => {
    const { result } = renderHook(() => useGameState({ initialLevel: 2, initialScore: 10 }));
    act(() => {
      result.current.setScore(900);
      result.current.setCurrentLevel(5);
      result.current.setGameState('failed');
    });
    act(() => result.current.resetBase());
    expect(result.current.score).toBe(10);
    expect(result.current.currentLevel).toBe(2);
    expect(result.current.gameState).toBe('playing');
  });
});
