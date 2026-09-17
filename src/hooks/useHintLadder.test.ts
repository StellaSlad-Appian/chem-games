import { describe, expect, it } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useHintLadder } from './useHintLadder';

describe('useHintLadder', () => {
  it('climbs one tier per request and stops at the top', () => {
    const { result } = renderHook(() => useHintLadder(3));
    expect(result.current.tier).toBe(0);
    act(() => result.current.requestHint());
    expect(result.current.tier).toBe(1);
    expect(result.current.usedPaidTier).toBe(false);
    act(() => result.current.requestHint());
    expect(result.current.tier).toBe(2);
    expect(result.current.usedPaidTier).toBe(true);
    expect(result.current.usedTier3).toBe(false);
    act(() => result.current.requestHint());
    act(() => result.current.requestHint());
    expect(result.current.tier).toBe(3);
    expect(result.current.usedTier3).toBe(true);
  });

  it('remembers the highest tier opened after the card is dismissed, until the round resets', () => {
    const { result } = renderHook(() => useHintLadder());
    act(() => result.current.requestHint());
    act(() => result.current.requestHint());
    act(() => result.current.dismiss());
    expect(result.current.tier).toBe(0);
    expect(result.current.highestTierUsed).toBe(2);
    expect(result.current.usedPaidTier).toBe(true);
    act(() => result.current.reset());
    expect(result.current.highestTierUsed).toBe(0);
    expect(result.current.usedPaidTier).toBe(false);
  });
});
