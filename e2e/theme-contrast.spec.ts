// e2e/theme-contrast.spec.ts
//
// Text contrast, measured on what the browser actually painted, in both
// themes and by both ways of getting there.
//
// The tokens in src/app/globals.css carry their ratios in comments, and those
// comments are arithmetic on hex values. What they cannot see is a component
// that uses the wrong token, a translucent tint over a surface nobody measured,
// or a class that never made it into the stylesheet. This spec walks every
// visible piece of text on the page and checks it against the background
// behind it (see `contrastFailures` in e2e/helpers.ts for exactly how).
//
// "Both ways" matters because the site has two paths into each theme
// (globals.css, the Themes note): Device, which follows prefers-color-scheme
// through the media-query copy of the light block, and an explicit choice in
// Settings, which puts `data-theme` on <html>. The explicit runs emulate the
// *opposite* OS preference, so they also prove the choice beats the device.

import { expect, test, type Page } from '@playwright/test';
import { en } from '../src/i18n/dictionaries/en';
import {
  expectNoOverflow,
  expectReadable,
  footerButton,
  openGame,
  overlay,
  path,
  uiContrast,
  waitForHydration,
  type GameSlug,
} from './helpers';

type Theme = 'light' | 'dark';

const MODES: { name: string; theme: Theme; device: Theme; stored: Theme | null }[] = [
  { name: 'light (device)', theme: 'light', device: 'light', stored: null },
  { name: 'dark (device)', theme: 'dark', device: 'dark', stored: null },
  { name: 'light (chosen, dark device)', theme: 'light', device: 'dark', stored: 'light' },
  { name: 'dark (chosen, light device)', theme: 'dark', device: 'light', stored: 'dark' },
];

const PAGES = [
  '/',
  '/games',
  '/leaderboards',
  '/cheat-sheets',
  '/cheat-sheets/acids-and-bases',
  '/explore',
  '/teachers',
  // /profile redirects here when nobody is signed in, which is every e2e run.
  '/auth',
];

const GAMES: GameSlug[] = ['acid-classification', 'reaction-balancer'];

async function useTheme(page: Page, device: Theme, stored: Theme | null) {
  await page.emulateMedia({ colorScheme: device });
  await page.addInitScript((value) => {
    if (value) window.localStorage.setItem('chem-games-theme', value);
    else window.localStorage.removeItem('chem-games-theme');
    // Silence the games; nothing here listens.
    window.localStorage.setItem('chem-games-muted', 'true');
  }, stored);
}

/** The theme the page is really in, read from what the CSS resolved. */
const paintedTheme = (page: Page) =>
  page.evaluate(() => getComputedStyle(document.documentElement).colorScheme);

for (const { name, theme, device, stored } of MODES) {
  test.describe(`contrast in ${name}`, () => {
    test.beforeEach(async ({ page }) => {
      await useTheme(page, device, stored);
    });

    test('site pages', async ({ page }) => {
      test.setTimeout(180_000);
      for (const route of PAGES) {
        await page.goto(path(route));
        await waitForHydration(page);
        expect(await paintedTheme(page), route).toBe(theme);
        await expectReadable(page, 'body', `${route} (${name})`);
      }
    });

    test('the header settings popover', async ({ page }) => {
      await page.goto(path('/'));
      await waitForHydration(page);
      await page.getByRole('banner').getByRole('button', { name: en.nav.settingsA11y }).click();
      await expect(page.getByTestId('settings-panel')).toBeVisible();
      await expectReadable(page, '[data-testid="settings-panel"]', `settings popover (${name})`);
    });

    test('the phone navigation panel', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto(path('/'));
      await waitForHydration(page);
      await page.getByRole('banner').getByRole('button', { name: en.nav.menuOpenA11y, exact: true }).click();
      await expect(page.locator('#site-nav-panel')).toBeVisible();
      await expectReadable(page, '#site-nav-panel', `nav panel (${name})`);
    });

    for (const slug of GAMES) {
      test(`${slug}: header, footer and every popup`, async ({ page }) => {
        await openGame(page, slug);
        await waitForHydration(page);
        expect(await paintedTheme(page)).toBe(theme);

        await expectReadable(page, 'main.game-shell header', `${slug} header (${name})`);
        // The footer is icons only: WCAG 1.4.11 asks 3:1 of each against what
        // is behind it.
        for (const title of ['How to Play', 'Pause Game', 'Settings'] as const) {
          expect(await uiContrast(footerButton(page, title).locator('svg')), `${title} (${name})`).toBeGreaterThanOrEqual(3);
        }

        await footerButton(page, 'Pause Game').click();
        await expect(overlay(page)).toBeVisible();
        await expectReadable(page, '[role="dialog"]', `${slug} pause overlay (${name})`);
        await page.keyboard.press('Escape');
        await expect(overlay(page)).toBeHidden();

        await footerButton(page, 'Settings').click();
        await expect(page.getByTestId('settings-panel')).toBeVisible();
        await expectReadable(page, '[data-testid="settings-panel"]', `${slug} settings (${name})`);
        await page.keyboard.press('Escape');
        await expect(page.getByTestId('settings-panel')).toBeHidden();

        await footerButton(page, 'How to Play').click();
        await expect(overlay(page)).toBeVisible();
        await expectReadable(page, '[role="dialog"]', `${slug} instructions (${name})`);
      });
    }
  });
}

test.describe('the per-game theme override', () => {
  test('keeps a game dark on a light site', async ({ page }) => {
    await useTheme(page, 'light', 'light');
    await page.addInitScript(() => {
      window.localStorage.setItem('chem-games-game-themes', JSON.stringify({ 'acid-classification': 'dark' }));
    });

    await page.goto(path('/games'));
    await waitForHydration(page);
    expect(await paintedTheme(page)).toBe('light');

    await openGame(page, 'acid-classification');
    await waitForHydration(page);
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    expect(await paintedTheme(page)).toBe('dark');
    await expectReadable(page, 'main.game-shell header', 'overridden game header');
  });
});

test.describe('the game header at 320px', () => {
  test.use({ viewport: { width: 320, height: 720 } });

  for (const slug of GAMES) {
    test(`${slug} reflows without scrolling sideways`, async ({ page }) => {
      await openGame(page, slug);
      await waitForHydration(page);
      await expectNoOverflow(page);
    });
  }
});
