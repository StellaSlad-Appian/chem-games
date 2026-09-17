import { defineConfig, devices } from '@playwright/test';

// End-to-end tests. Run with `npm run e2e` (headless) or `npm run e2e:ui`.
// The config boots the Next.js app itself on a dedicated port, so it never
// collides with a dev server of this or another project on :3000. To test an
// app you already have running, point PLAYWRIGHT_BASE_URL at it.
const PORT = Number(process.env.PLAYWRIGHT_PORT ?? 3210);
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? `http://localhost:${PORT}`;
const isCI = Boolean(process.env.CI);

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 2 : undefined,
  // A dev server compiles each route on first visit, so allow generous time.
  timeout: isCI ? 60_000 : 90_000,
  expect: { timeout: 10_000 },
  reporter: isCI
    ? [
        ['list'],
        ['html', { open: 'never' }],
        ['junit', { outputFile: 'test-results/playwright-junit.xml' }],
      ]
    : [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'off',
  },
  projects: [
    // Compiles every game route once (matters for `next dev`) before the tests run.
    { name: 'warm-up', testMatch: /warm-up\.setup\.ts/ },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testIgnore: /\.setup\.ts$/,
      dependencies: ['warm-up'],
    },
  ],
  webServer: {
    command: isCI
      ? `npm run build && npx next start -p ${PORT}`
      : `npx next dev -p ${PORT}`,
    // Health-check a page that needs no Supabase credentials, so a server
    // already running at baseURL is detected and reused. The locale prefix is
    // explicit so the check hits the page rather than the proxy's redirect.
    url: `${baseURL}/en/games`,
    reuseExistingServer: !isCI,
    timeout: 180_000,
    stdout: 'ignore',
    stderr: 'pipe',
  },
});
