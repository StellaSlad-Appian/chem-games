import { expect, test as setup } from '@playwright/test';
import { GAME_SLUGS, path } from './helpers';

/**
 * Runs once before the browser tests. Against `next dev`, every route is
 * compiled on its first request, which can take many seconds and makes the
 * first test on each page flaky (countdowns already running, clicks landing
 * on stale positions). Visiting each route here moves that cost out of the
 * timed tests. Against a production build this is a quick no-op.
 *
 * Note that `[lang]` is a dynamic segment, so a route compiles once for every
 * locale rather than once per locale — warming `/en/cheat-sheets` also warms
 * `/de/cheat-sheets`. What did need adding is the route *patterns* the i18n
 * spec is the first to reach: the cheat sheets, the dashboard and the auth
 * page had no browser coverage before, so their first compile landed inside a
 * timed test and made the suite flaky under parallel load.
 */
setup('compile every route', async ({ page }) => {
  setup.setTimeout(5 * 60_000);

  await page.goto(path('/games'));
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible({ timeout: 120_000 });

  for (const slug of GAME_SLUGS) {
    await page.goto(path(`/games/${slug}`));
    await expect(page.locator('main.game-shell')).toBeVisible({ timeout: 120_000 });
  }

  // Server-side compile only: these need no rendered assertion, and a plain
  // request cannot be aborted by a client-side navigation the way goto() can.
  for (const route of ['/', '/cheat-sheets', '/cheat-sheets/acids-and-bases', '/auth']) {
    const response = await page.request.get(path(route), { timeout: 120_000 });
    expect(response.status(), `${route} should compile`).toBeLessThan(500);
  }
});
