// src/hooks/useStoredValue.ts
'use client';

import { useCallback, useSyncExternalStore } from 'react';

const listeners = new Set<() => void>();
const notify = () => listeners.forEach((l) => l());
const subscribe = (listener: () => void) => {
  listeners.add(listener);
  window.addEventListener('storage', listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', listener);
  };
};

/**
 * A localStorage string read through useSyncExternalStore, so a first-visit
 * flag can be read during render without a hydration mismatch or a
 * setState-in-effect (the server snapshot is always null).
 */
export function useStoredValue(key: string): [string | null, (value: string | null) => void] {
  const value = useSyncExternalStore(
    subscribe,
    () => {
      try {
        return window.localStorage.getItem(key);
      } catch {
        return null;
      }
    },
    () => null
  );
  const setValue = useCallback(
    (next: string | null) => {
      try {
        if (next === null) window.localStorage.removeItem(key);
        else window.localStorage.setItem(key, next);
      } catch {
        // Storage can be unavailable (private mode); the flag is a convenience only.
      }
      notify();
    },
    [key]
  );
  return [value, setValue];
}
