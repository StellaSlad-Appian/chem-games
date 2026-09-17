// src/proxy.test.ts
//
// The point of this file is the first test: a locale redirect must not throw
// away the cookies Supabase's session refresh put on the response. Supabase
// rotates refresh tokens, so a dropped Set-Cookie signs the reader out on a
// request that happened to land on a refresh — intermittently, and only in
// production where sessions are old enough to refresh. `updateSession` is
// mocked so the test can hand the proxy a response that *did* refresh, which is
// otherwise very hard to reproduce.

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest, NextResponse } from 'next/server';
import { LOCALE_COOKIE } from './i18n/config';

const { updateSessionMock } = vi.hoisted(() => ({ updateSessionMock: vi.fn() }));
vi.mock('./lib/supabase/proxy', () => ({ updateSession: updateSessionMock }));

const { proxy } = await import('./proxy');

/** A `next()` response carrying a rotated Supabase auth cookie. */
function sessionResponseWithRefreshedCookies() {
  const response = NextResponse.next();
  response.cookies.set('sb-access-token', 'rotated-access', { path: '/', httpOnly: true });
  response.cookies.set('sb-refresh-token', 'rotated-refresh', { path: '/', httpOnly: true });
  return response;
}

function request(
  path: string,
  init: { acceptLanguage?: string; cookies?: Record<string, string> } = {}
) {
  const headers = new Headers();
  if (init.acceptLanguage) headers.set('accept-language', init.acceptLanguage);
  const cookiePairs = Object.entries(init.cookies ?? {});
  if (cookiePairs.length > 0) {
    headers.set('cookie', cookiePairs.map(([k, v]) => `${k}=${v}`).join('; '));
  }
  return new NextRequest(new URL(path, 'https://chemgames.test'), { headers });
}

const cookieValue = (response: NextResponse, name: string) =>
  response.cookies.get(name)?.value;

beforeEach(() => {
  updateSessionMock.mockReset();
  updateSessionMock.mockImplementation(async () => NextResponse.next());
});

describe('proxy: Supabase session composition', () => {
  it('carries refreshed auth cookies onto a locale redirect', async () => {
    updateSessionMock.mockImplementation(async () => sessionResponseWithRefreshedCookies());

    const response = await proxy(request('/games', { acceptLanguage: 'de' }));

    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toContain('/de/games');
    expect(cookieValue(response, 'sb-access-token')).toBe('rotated-access');
    expect(cookieValue(response, 'sb-refresh-token')).toBe('rotated-refresh');
  });

  it('returns the session response untouched on an already-localized path', async () => {
    const sessionResponse = sessionResponseWithRefreshedCookies();
    updateSessionMock.mockImplementation(async () => sessionResponse);

    const response = await proxy(
      request('/de/games', { cookies: { [LOCALE_COOKIE]: 'de' } })
    );

    expect(response).toBe(sessionResponse);
    expect(cookieValue(response, 'sb-access-token')).toBe('rotated-access');
  });

  it('always runs the session refresh, including on the unprefixed route handlers', async () => {
    await proxy(request('/auth/callback?code=abc'));
    expect(updateSessionMock).toHaveBeenCalledTimes(1);
  });
});

describe('proxy: locale routing', () => {
  it('redirects an unprefixed path to the negotiated locale', async () => {
    const response = await proxy(request('/games', { acceptLanguage: 'de-AT,de;q=0.9' }));
    expect(response.headers.get('location')).toContain('/de/games');
  });

  it('falls back to English for a language it does not publish', async () => {
    const response = await proxy(request('/games', { acceptLanguage: 'ja,ko;q=0.8' }));
    expect(response.headers.get('location')).toContain('/en/games');
  });

  it('lets the cookie override the browser language', async () => {
    const response = await proxy(
      request('/games', { acceptLanguage: 'en-US', cookies: { [LOCALE_COOKIE]: 'de' } })
    );
    expect(response.headers.get('location')).toContain('/de/games');
  });

  it('keeps the query string across the redirect', async () => {
    const response = await proxy(request('/auth?error=verification', { acceptLanguage: 'de' }));
    const location = response.headers.get('location') ?? '';
    expect(location).toContain('/de/auth');
    expect(location).toContain('error=verification');
  });

  it('remembers the chosen locale in a cookie', async () => {
    const response = await proxy(request('/games', { acceptLanguage: 'de' }));
    expect(cookieValue(response, LOCALE_COOKIE)).toBe('de');
  });

  it('writes the cookie when a reader lands on a prefixed URL with no cookie yet', async () => {
    const response = await proxy(request('/de/games'));
    expect(cookieValue(response, LOCALE_COOKIE)).toBe('de');
  });

  it('does not re-set the cookie when it already agrees with the path', async () => {
    const response = await proxy(
      request('/de/games', { cookies: { [LOCALE_COOKIE]: 'de' } })
    );
    expect(response.headers.get('set-cookie')).toBeNull();
  });

  it('leaves the route handlers unprefixed', async () => {
    for (const path of ['/auth/callback', '/account/export']) {
      const response = await proxy(request(path, { acceptLanguage: 'de' }));
      expect(response.status).not.toBe(307);
    }
  });

  it('varies on the inputs it negotiated with, so caches cannot cross-serve', async () => {
    const response = await proxy(request('/games', { acceptLanguage: 'de' }));
    expect(response.headers.get('vary')).toBe('Accept-Language, Cookie');
  });
});
