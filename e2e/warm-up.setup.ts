import { expect, test as setup } from '@playwright/test';
import { GAME_SLUGS, path } from './helpers';
import { LOCALES } from '../src/i18n/config';

/**
 * Runs once before the browser tests. Against `next dev`, every route is
 * compiled on its first request, which can take many seconds and makes the
 * first test on each page flaky (countdowns already running, clicks landing
 * on stale positions). Visiting each route here moves that cost out of the
 * timed tests. Against a production build this is a quick no-op.
 *
 * **Warm every route in every locale, not just the default.** `[lang]` is a
 * dynamic segment, so the route itself compiles once for all locales — this
 * file used to say that was the end of it, and it is not. `getDictionary()` is
 * a *dynamic import per locale* (`src/i18n/dictionaries.ts`), deliberately, so
 * that a chunk only pulls the locales it renders. That chunk is therefore
 * compiled and loaded on that locale's **first** request, and warming
 * `/en/cheat-sheets` does nothing for it.
 *
 * That cost is what made the three language-switcher tests fail under parallel
 * load and pass on their own: they were the first tests to render a German
 * page. `router.replace('/de/…')` is a transition, and the URL does not move
 * until the destination's RSC payload arrives, so the German dictionary's first
 * compile sat inside a 10s `toHaveURL` budget. Measured with six workers on a
 * cold cache: the URL moved after 8.1s, against ~350ms once warm. The handler
 * itself had already run both times — it had written the NEXT_LOCALE cookie
 * within 372ms — so this was never about React not having attached `onChange`.
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
  const routes = [
    '/',
    '/games',
    '/cheat-sheets',
    '/cheat-sheets/acids-and-bases',
    '/teachers',
    '/auth',
    // Explore and its archive. The three archive routes are separate compiles,
    // and leaving them out is what made the permalink specs fail in de, fr, es
    // and it while passing in en: six workers hit a brand-new route at once,
    // one of them paid the compile and the others were served a document whose
    // <html> had no `lang` yet. Warming the two dynamic segments warms the
    // route, not the entry — any id compiles the same page.
    '/explore',
    '/explore/archive',
    '/explore/molecules/benzene',
    '/explore/scientists/kathleen-lonsdale',
    ...GAME_SLUGS.map((slug) => `/games/${slug}`),
  ];

  for (const locale of LOCALES) {
    for (const route of routes) {
      const response = await page.request.get(path(route, locale), { timeout: 120_000 });
      expect(response.status(), `${route} should compile in ${locale}`).toBeLessThan(500);
    }
  }
});
