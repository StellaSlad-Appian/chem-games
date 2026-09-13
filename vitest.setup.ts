import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';
import { randomUUID } from 'node:crypto';

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

// jsdom implements <audio> but not playback. useSound() calls play() from
// several effects, so give it a resolved promise instead of "not implemented".
Object.defineProperty(window.HTMLMediaElement.prototype, 'play', {
  configurable: true,
  writable: true,
  value: () => Promise.resolve(),
});
Object.defineProperty(window.HTMLMediaElement.prototype, 'pause', {
  configurable: true,
  writable: true,
  value: () => undefined,
});
Object.defineProperty(window.HTMLMediaElement.prototype, 'load', {
  configurable: true,
  writable: true,
  value: () => undefined,
});

// useInputMethod() reads matchMedia('(pointer: coarse)'); jsdom has none.
// Tests that need a specific answer override window.matchMedia themselves.
if (typeof window.matchMedia !== 'function') {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => undefined,
      removeListener: () => undefined,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      dispatchEvent: () => false,
    }) as MediaQueryList;
}

// Formula Blaster and Neutralise mint ids with crypto.randomUUID().
if (typeof globalThis.crypto?.randomUUID !== 'function') {
  Object.defineProperty(globalThis.crypto, 'randomUUID', {
    configurable: true,
    value: randomUUID,
  });
}
