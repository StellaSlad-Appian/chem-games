import { expect, test as setup } from '@playwright/test';
import { GAME_SLUGS } from './helpers';

/**
 * Runs once before the browser tests. Against `next dev`, every route is
 * compiled on its first request, which can take many seconds and makes the
 * first test on each page flaky (countdowns already running, clicks landing
 * on stale positions). Visiting each route here moves that cost out of the
 * timed tests. Against a production build this is a quick no-op.
 */
setup('compile every game route', async ({ page }) => {
  setup.setTimeout(5 * 60_000);
  await page.goto('/games');
  await expect(page.getByRole('heading', { level: 1, name: 'Games' })).toBeVisible();
  for (const slug of GAME_SLUGS) {
    await page.goto(`/games/${slug}`);
    await expect(page.locator('main.game-shell')).toBeVisible({ timeout: 120_000 });
  }
});
