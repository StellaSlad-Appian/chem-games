// src/hooks/useInputMethod.ts
'use client';

import { useEffect, useState } from 'react';

export type InputMethod = 'touch' | 'pointer';

/**
 * Detects the user's PRIMARY input mechanism using the `pointer` media
 * feature — 'coarse' means the main way they interact is a finger (phone,
 * tablet), 'fine' means a mouse/trackpad/stylus (laptop, desktop).
 *
 * This is deliberately NOT based on screen width or `ontouchstart in window`:
 * - Screen width alone misclassifies e.g. a small laptop window as "mobile".
 * - `ontouchstart in window` misclassifies touchscreen laptops as touch-first,
 *   even though their primary input is still a mouse/trackpad.
 *
 * Defaults to 'pointer' until mounted (safe for SSR — avoids a hydration
 * mismatch) and updates live if the primary input changes, e.g. a Bluetooth
 * mouse gets connected to a tablet mid-session.
 */
export function useInputMethod(): InputMethod {
  const [inputMethod, setInputMethod] = useState<InputMethod>('pointer');

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mql = window.matchMedia('(pointer: coarse)');
    setInputMethod(mql.matches ? 'touch' : 'pointer');

    const handleChange = (e: MediaQueryListEvent) => {
      setInputMethod(e.matches ? 'touch' : 'pointer');
    };

    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  return inputMethod;
}
