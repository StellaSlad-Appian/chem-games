// src/i18n/routing.test.ts

import { describe, expect, it } from 'vitest';
import {
  isUnprefixedPath,
  localeAlternates,
  localeFromPathname,
  localizePath,
  stripLocale,
} from './routing';
import { LOCALES } from './config';

describe('localeFromPathname', () => {
  it('finds a locale prefix', () => {
    expect(localeFromPathname('/de/games')).toBe('de');
    expect(localeFromPathname('/en')).toBe('en');
  });

  it('returns null when there is none', () => {
    expect(localeFromPathname('/games')).toBeNull();
    expect(localeFromPathname('/')).toBeNull();
    // A path segment that merely starts with a locale code is not a prefix.
    expect(localeFromPathname('/dentistry')).toBeNull();
  });
});

describe('stripLocale', () => {
  it('removes the prefix', () => {
    expect(stripLocale('/de/games/neutralise')).toBe('/games/neutralise');
    expect(stripLocale('/en/profile/edit')).toBe('/profile/edit');
  });

  it('turns a bare locale into the root', () => {
    expect(stripLocale('/de')).toBe('/');
  });

  it('leaves an unprefixed path alone', () => {
    expect(stripLocale('/games')).toBe('/games');
  });
});

describe('localizePath', () => {
  it('prefixes an app path', () => {
    expect(localizePath('/games', 'de')).toBe('/de/games');
    expect(localizePath('/', 'de')).toBe('/de');
  });

  it('is idempotent and re-prefixes rather than stacking', () => {
    expect(localizePath('/de/games', 'de')).toBe('/de/games');
    expect(localizePath('/en/games', 'de')).toBe('/de/games');
    expect(localizePath(localizePath('/games', 'de'), 'de')).toBe('/de/games');
  });

  it('keeps a hash on the root path', () => {
    expect(localizePath('/#leaderboards', 'de')).toBe('/de/#leaderboards');
  });

  it('never prefixes the route handlers, which need stable URLs', () => {
    expect(localizePath('/auth/callback', 'de')).toBe('/auth/callback');
    expect(localizePath('/account/export', 'de')).toBe('/account/export');
  });

  it('never prefixes framework or metadata paths', () => {
    for (const path of ['/_next/static/chunk.js', '/favicon.ico', '/robots.txt', '/api/x']) {
      expect(localizePath(path, 'de')).toBe(path);
    }
  });
});

describe('isUnprefixedPath', () => {
  it('matches the path itself and everything under it', () => {
    expect(isUnprefixedPath('/auth/callback')).toBe(true);
    expect(isUnprefixedPath('/auth/callback/extra')).toBe(true);
  });

  it('does not match a sibling that merely shares a prefix string', () => {
    // /auth is a real localized page; only /auth/callback is exempt.
    expect(isUnprefixedPath('/auth')).toBe(false);
    expect(isUnprefixedPath('/accounts')).toBe(false);
  });
});

describe('localeAlternates', () => {
  it('produces one URL per supported locale', () => {
    const alternates = localeAlternates('/cheat-sheets');
    expect(Object.keys(alternates).sort()).toEqual([...LOCALES].sort());
    expect(alternates.en).toBe('/en/cheat-sheets');
    expect(alternates.de).toBe('/de/cheat-sheets');
  });
});
