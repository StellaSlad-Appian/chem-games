import { defineConfig, devices } from '@playwright/test';

// End-to-end tests. Run with `npm run e2e` (headless) or `npm run e2e:ui`.
// The config boots the Next.js app itself; locally it reuses a dev server
// that is already running on the same port.
const PORT = Number(process.env.PORT ?? 3000);
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
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: isCI ? 'npm run build && npm run start' : 'npm run dev',
    // Health-check a page that needs no Supabase credentials, so an already
    // running dev server is detected and reused instead of a second one
    // being launched (Next refuses to start twice in the same directory).
    url: `${baseURL}/games`,
    reuseExistingServer: !isCI,
    timeout: 180_000,
    stdout: 'ignore',
    stderr: 'pipe',
  },
});
