// e2e/explore.spec.ts
//
// What only a real browser can tell you about /explore.
//
// The unit tests already prove the content is complete, the rotation is right
// and the page renders both cards — running that again through Playwright would
// be slower and prove nothing new. What is left is the part that lives outside
// the component tree: the route actually exists in every locale, `<html lang>`
// matches the URL, the header links reach it and keep the language, an inward
// link lands on a page that really renders, and nothing scrolls sideways on a
// phone in the language whose text is longest.

import { expect, test, type Page } from '@playwright/test';
import { LOCALES } from '../src/i18n/config';
import { getDictionary } from '../src/i18n/dictionaries';
import { path, waitForHydration } from './helpers';

const PHONE = { width: 360, height: 740 };

/** True when the document is wider than the window — WCAG 1.4.10's failure. */
const scrollsSideways = (page: Page) =>
  page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);

test.describe('the Explore page', () => {
  for (const locale of LOCALES) {
    test(`loads at /${locale}/explore, in ${locale}`, async ({ page }) => {
      const t = await getDictionary(locale);

      await page.goto(path('/explore', locale));
      await waitForHydration(page);

      // The URL segment stays English in every locale, like /cheat-sheets.
      await expect(page).toHaveURL(new RegExp(`/${locale}/explore$`));
      await expect(page.locator('html')).toHaveAttribute('lang', locale);

      await expect(page.getByRole('heading', { level: 1, name: t.explore.heading })).toBeVisible();
      await expect(
        page.getByRole('region', { name: t.explore.moleculeHeading })
      ).toBeVisible();
      await expect(
        page.getByRole('region', { name: t.explore.scientistHeading })
      ).toBeVisible();

      // Exactly one dateline: the two sections share a clock.
      await expect(page.locator('time')).toHaveCount(1);
    });
  }

  test('does not leave English prose behind in another language', async ({ page }) => {
    const en = await getDictionary('en');

    await page.goto(path('/explore', 'de'));
    await waitForHydration(page);

    // The section headings are the cheapest tell: if the page is wired to the
    // wrong dictionary these are the first thing to come back English.
    await expect(page.getByText(en.explore.moleculeHeading, { exact: true })).toHaveCount(0);
    await expect(page.getByText(en.explore.scientistHeading, { exact: true })).toHaveCount(0);
    await expect(page.getByText(en.explore.heading, { exact: true })).toHaveCount(0);
  });
});

test.describe('getting there', () => {
  test('the header row navigates to Explore and keeps the locale', async ({ page }) => {
    const t = await getDictionary('de');

    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(path('/', 'de'));
    await waitForHydration(page);

    await page
      .getByRole('navigation', { name: t.nav.sectionsA11y })
      .getByRole('link', { name: t.nav.explore })
      .click();

    await expect(page).toHaveURL(/\/de\/explore$/);
    await expect(page.getByRole('heading', { level: 1, name: t.explore.heading })).toBeVisible();
  });

  test('the phone panel reaches it too', async ({ page }) => {
    const t = await getDictionary('en');

    await page.setViewportSize(PHONE);
    await page.goto(path('/'));
    await waitForHydration(page);

    await page
      .getByRole('banner')
      .getByRole('button', { name: t.nav.menuOpenA11y, exact: true })
      .click();

    const panel = page.getByRole('dialog', { name: t.nav.menuTitleA11y });
    await panel.getByRole('link', { name: t.nav.explore }).click();

    await expect(page).toHaveURL(/\/en\/explore$/);
    // And the panel is not still sitting over the page it navigated to.
    await expect(page.getByRole('dialog', { name: t.nav.menuTitleA11y })).toBeHidden();
  });

  test('the dashboard links there as well', async ({ page }) => {
    // Belt and braces: the panel is new code and the dashboard is where a
    // phone reader already is.
    const t = await getDictionary('en');

    await page.setViewportSize(PHONE);
    await page.goto(path('/'));
    await waitForHydration(page);

    // `.first()` rather than an exact selector: the section deliberately shows
    // the same call to action twice — once beside the heading and once on the
    // card — so that a reader who has scrolled past the heading still has one.
    // Both go to the same place, and asserting on a unique match here would be
    // asserting that the duplication does not exist.
    await page
      .locator('#explore')
      .getByRole('link', { name: t.home.exploreLink })
      .first()
      .click();

    await expect(page).toHaveURL(/\/en\/explore$/);
  });

  test('the language switcher keeps you on Explore', async ({ page }) => {
    const en = await getDictionary('en');
    const fr = await getDictionary('fr');

    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(path('/explore'));
    await waitForHydration(page);

    const switcher = page.getByLabel(en.language.label);
    await expect(switcher).toHaveAttribute('data-hydrated', 'true');
    await switcher.selectOption('fr');

    await expect(page).toHaveURL(/\/fr\/explore$/, { timeout: 15_000 });
    await expect(page.getByRole('heading', { level: 1, name: fr.explore.heading })).toBeVisible();
  });
});

test.describe('the inward links', () => {
  test('each card reaches a page that really renders', async ({ page }) => {
    const t = await getDictionary('en');

    await page.goto(path('/explore'));
    await waitForHydration(page);

    for (const heading of [t.explore.moleculeHeading, t.explore.scientistHeading]) {
      const section = page.getByRole('region', { name: heading });
      const link = section
        .getByRole('link')
        .filter({ hasNot: page.locator('[href^="https://"]') })
        .first();

      const href = await link.getAttribute('href');
      expect(href).toMatch(/^\/en\/(cheat-sheets|games)\//);

      await page.goto(href!);
      // Whatever it is, it has a heading and it is not the 404 page.
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await expect(page.getByText('404')).toHaveCount(0);

      await page.goto(path('/explore'));
      await waitForHydration(page);
    }
  });
});

test.describe('reflow', () => {
  // 320px is what docs/ACCESSIBILITY.md requires (1.4.10), not 360. Every
  // locale, because the Explore cards carry the longest prose on the site and
  // German runs about 30% longer than the English.
  for (const locale of LOCALES) {
    for (const width of [320, 360]) {
      test(`does not scroll sideways at ${width}px in ${locale}`, async ({ page }) => {
        await page.setViewportSize({ width, height: 740 });
        await page.goto(path('/explore', locale));
        await waitForHydration(page);

        expect(await scrollsSideways(page)).toBe(false);
      });
    }
  }

  test('does not clip the formula out of its card at 320px', async ({ page }) => {
    // The formula sits opposite the molecule name in a row that becomes a
    // column below `sm`. A long name plus a long formula is exactly the pair
    // that would overflow, and an overflowing formula is worse than a wrapped
    // one because the charge or the subscript is what falls off the end.
    const t = await getDictionary('de');

    await page.setViewportSize({ width: 320, height: 740 });
    await page.goto(path('/explore', 'de'));
    await waitForHydration(page);

    const card = page.getByRole('region', { name: t.explore.moleculeHeading });
    const cardBox = (await card.boundingBox())!;
    expect(cardBox.x + cardBox.width).toBeLessThanOrEqual(320);
  });
});
