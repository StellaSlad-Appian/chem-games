import { describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useInputMethod } from './useInputMethod';

type ChangeListener = (event: MediaQueryListEvent) => void;

function mockPointerQuery(initialMatches: boolean) {
  const listeners = new Set<ChangeListener>();
  const mql = {
    matches: initialMatches,
    media: '(pointer: coarse)',
    onchange: null,
    addListener: () => undefined,
    removeListener: () => undefined,
    addEventListener: (_type: string, listener: ChangeListener) => listeners.add(listener),
    removeEventListener: (_type: string, listener: ChangeListener) => listeners.delete(listener),
    dispatchEvent: () => false,
  };
  window.matchMedia = vi.fn(() => mql as unknown as MediaQueryList);

  return {
    listeners,
    change(matches: boolean) {
      mql.matches = matches;
      listeners.forEach((listener) => listener({ matches } as MediaQueryListEvent));
    },
  };
}

describe('useInputMethod', () => {
  it('reports "pointer" when the primary input is fine (mouse/trackpad)', () => {
    mockPointerQuery(false);
    const { result } = renderHook(() => useInputMethod());
    expect(result.current).toBe('pointer');
  });

  it('reports "touch" when the primary input is coarse (finger)', () => {
    mockPointerQuery(true);
    const { result } = renderHook(() => useInputMethod());
    expect(result.current).toBe('touch');
  });

  it('updates live when the primary input changes', () => {
    const query = mockPointerQuery(false);
    const { result } = renderHook(() => useInputMethod());
    expect(result.current).toBe('pointer');

    act(() => query.change(true));
    expect(result.current).toBe('touch');
  });

  it('removes its listener on unmount', () => {
    const query = mockPointerQuery(false);
    const { unmount } = renderHook(() => useInputMethod());
    expect(query.listeners.size).toBe(1);
    unmount();
    expect(query.listeners.size).toBe(0);
  });
});
