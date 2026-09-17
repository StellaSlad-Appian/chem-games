import { expect, test } from '@playwright/test';

/**
 * The hardening headers that `headers()` in next.config.ts attaches to every
 * route, keyed by the lower-cased names Playwright reports. /games needs no
 * Supabase credentials, so the check works against a bare `next dev` as well
 * as the production build CI runs.
 */
const EXPECTED_HEADERS: Record<string, string> = {
  'strict-transport-security': 'max-age=63072000; includeSubDomains; preload',
  'x-content-type-options': 'nosniff',
  'x-frame-options': 'DENY',
  'referrer-policy': 'strict-origin-when-cross-origin',
  'permissions-policy':
    'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()',
  'cross-origin-opener-policy': 'same-origin',
};

test.describe('Security headers', () => {
  test('every page response carries the hardening headers', async ({ page }) => {
    const response = await page.request.get('/en/games');
    expect(response.ok()).toBe(true);

    const headers = response.headers();
    for (const [name, value] of Object.entries(EXPECTED_HEADERS)) {
      expect.soft(headers[name], `${name} header`).toBe(value);
    }
  });

  test('does not advertise the framework through x-powered-by', async ({ page }) => {
    const response = await page.request.get('/en/games');
    expect(response.ok()).toBe(true);
    expect(response.headers()['x-powered-by']).toBeUndefined();
  });

  // The locale redirect is produced by the proxy, not by the filesystem route,
  // so it is worth checking separately that next.config's headers() still
  // attaches to it — a redirect without HSTS or nosniff is a real gap.
  test('the locale redirect itself carries the hardening headers', async ({ page }) => {
    const response = await page.request.get('/games', { maxRedirects: 0 });
    expect(response.status()).toBe(307);

    const headers = response.headers();
    for (const [name, value] of Object.entries(EXPECTED_HEADERS)) {
      expect.soft(headers[name], `${name} header on the redirect`).toBe(value);
    }
  });
});
