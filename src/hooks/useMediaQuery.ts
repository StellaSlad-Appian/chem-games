// src/hooks/useMediaQuery.ts
'use client';

import { useCallback, useSyncExternalStore } from 'react';

/**
 * A CSS media query as React state, read through `useSyncExternalStore` so it
 * can be used during render with no hydration mismatch and no
 * setState-in-an-effect (`useStoredValue` does the same for localStorage).
 *
 * The server snapshot is always `false`: there is no viewport on the server,
 * and guessing one is how you get a layout that flips after hydration. Every
 * caller must therefore be written so that `false` is the safe answer — for
 * the instructions modal that means the full text, which is correct
 * everywhere and merely long on a phone for one frame.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      if (typeof window === 'undefined' || !window.matchMedia) return () => {};
      const mql = window.matchMedia(query);
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    },
    [query]
  );

  return useSyncExternalStore(
    subscribe,
    () => {
      try {
        return window.matchMedia(query).matches;
      } catch {
        return false;
      }
    },
    () => false
  );
}

/**
 * Below Tailwind's `md`. This is a question about how much room there is, so
 * it is a width query — unlike `useInputMethod`, which asks what the player
 * is touching the screen *with* and must not use width. A touch laptop gets
 * the full instructions and the touch control list; a phone gets the short
 * ones. Keep the value in step with the `md` breakpoint in globals.css.
 */
export const COMPACT_SCREEN_QUERY = '(max-width: 767px)';

export const useIsCompactScreen = (): boolean => useMediaQuery(COMPACT_SCREEN_QUERY);
