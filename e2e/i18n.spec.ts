// e2e/i18n.spec.ts
//
// Browser coverage for the parts of the i18n system that only exist at the
// HTTP/navigation layer: the proxy's redirect and negotiation, the cookie that
// remembers a choice, the switcher, and that German actually renders on one
// page of each type (hub, game, cheat sheet).
//
// The unit tests in src/i18n and src/proxy.test.ts cover the logic; what these
// add is that the pieces are wired together in a real request.

import { expect, test, type Page } from '@playwright/test';
import { en } from '../src/i18n/dictionaries/en';
import { de } from '../src/i18n/dictionaries/de';
import { LOCALE_COOKIE } from '../src/i18n/config';
import { path, waitForHydration } from './helpers';

const htmlLang = (page: Page) => page.locator('html').getAttribute('lang');

test.describe('locale redirect', () => {
  test('an unprefixed URL lands on a prefixed one', async ({ page }) => {
    await page.goto('/games');
    await expect(page).toHaveURL(/\/en\/games$/);
    await expect(page.getByRole('heading', { level: 1, name: en.gamesHub.heading })).toBeVisible();
  });

  test('the root redirects too', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/en$/);
  });

  test('the query string survives the redirect', async ({ page }) => {
    await page.goto('/auth?error=verification');
    await expect(page).toHaveURL(/\/en\/auth\?error=verification$/);
    // The error code is translated on arrival rather than carried as prose.
    await expect(page.getByText(en.auth.errorVerification)).toBeVisible();
  });

  test('an unknown first segment 404s instead of being treated as a locale', async ({ page }) => {
    const response = await page.goto('/not-a-locale/games');
    expect(response?.status()).toBe(404);
  });
});

test.describe('Accept-Language negotiation', () => {
  test('a German browser is sent to the German site', async ({ browser }) => {
    const context = await browser.newContext({ locale: 'de-DE' });
    const page = await context.newPage();
    await page.goto('/games');

    await expect(page).toHaveURL(/\/de\/games$/);
    await expect(page.getByRole('heading', { level: 1, name: de.gamesHub.heading })).toBeVisible();
    expect(await htmlLang(page)).toBe('de');

    await context.close();
  });

  test('a regional variant resolves to its base language', async ({ browser }) => {
    const context = await browser.newContext({ locale: 'de-AT' });
    const page = await context.newPage();
    await page.goto('/games');
    await expect(page).toHaveURL(/\/de\/games$/);
    await context.close();
  });

  test('a language we do not publish falls back to English', async ({ browser }) => {
    const context = await browser.newContext({ locale: 'ja-JP' });
    const page = await context.newPage();
    await page.goto('/games');
    await expect(page).toHaveURL(/\/en\/games$/);
    await context.close();
  });

  test('an explicit cookie beats the browser language', async ({ browser }) => {
    const context = await browser.newContext({ locale: 'de-DE' });
    await context.addCookies([
      { name: LOCALE_COOKIE, value: 'en', url: 'http://localhost' },
    ]);
    const page = await context.newPage();
    await page.goto('/games');
    await expect(page).toHaveURL(/\/en\/games$/);
    await context.close();
  });
});

test.describe('html lang', () => {
  test('matches the locale in the URL', async ({ page }) => {
    await page.goto(path('/games'));
    expect(await htmlLang(page)).toBe('en');

    await page.goto(path('/games', 'de'));
    expect(await htmlLang(page)).toBe('de');
  });

  test('is set on a game page too, not just the marketing pages', async ({ page }) => {
    await page.goto(path('/games/reaction-balancer', 'de'));
    await expect(page.locator('main.game-shell')).toBeVisible();
    expect(await htmlLang(page)).toBe('de');
  });
});

test.describe('hreflang alternates', () => {
  test('every locale is advertised, plus x-default', async ({ page }) => {
    await page.goto(path('/games'));

    const hreflangs = await page
      .locator('link[rel="alternate"][hreflang]')
      .evaluateAll((links) => links.map((link) => link.getAttribute('hreflang')));

    expect(hreflangs).toEqual(expect.arrayContaining(['en', 'de', 'x-default']));
  });

  test('the canonical points at the locale being viewed', async ({ page }) => {
    await page.goto(path('/games', 'de'));
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toContain('/de');
  });
});

test.describe('language switcher', () => {
  test('moves the reader to the same page in the other language', async ({ page }) => {
    await page.goto(path('/cheat-sheets'));
    await expect(
      page.getByRole('heading', { level: 1, name: en.cheatSheets.heading })
    ).toBeVisible();
    await waitForHydration(page);

    await page.getByLabel(en.language.label).selectOption('de');

    await expect(page).toHaveURL(/\/de\/cheat-sheets$/);
    await expect(
      page.getByRole('heading', { level: 1, name: de.cheatSheets.heading })
    ).toBeVisible();
  });

  test('is reachable and operable from the keyboard', async ({ page }) => {
    await page.goto(path('/games'));
    await waitForHydration(page);
    const select = page.getByLabel(en.language.label);

    await select.focus();
    await expect(select).toBeFocused();
    await select.selectOption('de');
    await expect(page).toHaveURL(/\/de\/games$/);
  });

  test('remembers the choice for a later visit to an unprefixed URL', async ({ page }) => {
    await page.goto(path('/games'));
    await waitForHydration(page);
    await page.getByLabel(en.language.label).selectOption('de');
    await expect(page).toHaveURL(/\/de\/games$/);

    // A bookmark, a shared link, or just typing the bare domain.
    await page.goto('/cheat-sheets');
    await expect(page).toHaveURL(/\/de\/cheat-sheets$/);
  });

  test('is available inside a game, where there is no nav bar', async ({ page }) => {
    await page.goto(path('/games/reaction-balancer'));
    await expect(page.locator('main.game-shell')).toBeVisible();

    await page.locator('footer').getByTitle(en.games.shared.settings).click();
    await expect(page.getByLabel(en.language.label)).toBeVisible();
  });
});

test.describe('German rendering', () => {
  test('the hub', async ({ page }) => {
    await page.goto(path('/games', 'de'));
    await expect(page.getByRole('heading', { level: 1, name: de.gamesHub.heading })).toBeVisible();
    await expect(page.getByText(de.gamesHub.intro)).toBeVisible();
    await expect(
      page.getByRole('link', { name: new RegExp(de.gamesHub.neutraliseTitle) })
    ).toBeVisible();
  });

  test('a game, including its instructions modal', async ({ page }) => {
    await page.goto(path('/games/acid-classification', 'de'));
    await expect(page.locator('main.game-shell')).toBeVisible();

    // Header, footer and the classification vessels.
    await expect(page.getByText(de.games.acidClassification.task)).toBeVisible();
    await expect(
      page.getByRole('button', { name: de.chemistry.acid, exact: true })
    ).toBeVisible();

    await page.locator('footer').getByTitle(de.games.shared.howToPlay).click();
    await expect(
      page.getByRole('heading', { name: de.games.acidClassification.instructionsTitle })
    ).toBeVisible();
    await page.getByRole('button', { name: de.games.shared.gotIt }).click();
  });

  test('a cheat sheet, with its formulae left untranslated', async ({ page }) => {
    await page.goto(path('/cheat-sheets/acids-and-bases', 'de'));

    await expect(page.getByRole('heading', { level: 1, name: 'Säuren und Basen' })).toBeVisible();
    await expect(page.getByText(de.cheatSheets.keyConcepts)).toBeVisible();
    await expect(page.getByText(de.cheatSheets.watchOutFor)).toBeVisible();

    // Compound names are translated ("Hydrochloric acid" -> "Salzsäure")…
    await expect(page.getByText('Salzsäure (stark)')).toBeVisible();
    // …while the formulae they label are not.
    await expect(page.locator('body')).toContainText('NaOH');
    await expect(page.locator('body')).toContainText('CH3COOH');
  });

  test('the game overlay', async ({ page }) => {
    await page.goto(path('/games/reaction-balancer', 'de'));
    await expect(page.locator('main.game-shell')).toBeVisible();

    await page.locator('footer').getByTitle(de.games.shared.pause).click();
    const dialog = page.getByRole('dialog', { name: de.games.overlay.pausedTitle });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('link', { name: de.games.overlay.quitToHub })).toHaveAttribute(
      'href',
      '/de/games'
    );
  });
});

test.describe('auth under a locale prefix', () => {
  test('the sign-in page renders in German and links stay prefixed', async ({ page }) => {
    await page.goto(path('/auth', 'de'));

    await expect(page.getByRole('heading', { name: de.auth.loginTitle })).toBeVisible();
    await expect(page.getByLabel(de.auth.email)).toBeVisible();
    await expect(page.getByRole('link', { name: de.auth.backToGames })).toHaveAttribute(
      'href',
      '/de'
    );
  });

  test('switching to register keeps the locale', async ({ page }) => {
    await page.goto(path('/auth', 'de'));
    await page.getByRole('button', { name: de.auth.switchToRegisterAction }).click();
    await expect(page.getByRole('heading', { name: de.auth.registerTitle })).toBeVisible();
    await expect(page).toHaveURL(/\/de\/auth$/);
  });

  test('the OAuth callback keeps its unprefixed URL', async ({ page }) => {
    // No code and no Supabase credentials, so it takes the configuration
    // branch — what matters here is that the route still exists at the URL
    // registered with Supabase and sends the reader to a localized page.
    const response = await page.goto('/auth/callback', { waitUntil: 'commit' });
    expect(response?.url()).not.toContain('/en/auth/callback');
    await expect(page).toHaveURL(/\/(en|de)\/auth\?error=/);
  });
});
