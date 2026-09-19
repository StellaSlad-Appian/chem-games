// e2e/nav.spec.ts
//
// The header's navigation, at the width where it was missing.
//
// The unit tests in src/components/layout/NavPanel.test.tsx cover the dialog
// behaviour; what these add is the part that only exists in a real browser: the
// Tailwind breakpoints actually hide and show the right thing, the panel's link
// performs a real navigation with the locale intact, and the header does not
// push the page sideways at 320px in the widest language.

import { expect, test, type Page } from '@playwright/test';
import { en } from '../src/i18n/dictionaries/en';
import { de } from '../src/i18n/dictionaries/de';
import { path, waitForHydration } from './helpers';

const PHONE = { width: 360, height: 740 };

/**
 * Scoped to the header and matched exactly, for a reason worth keeping: the
 * feedback widget's button is "Feedback-Menü öffnen" in German, and Playwright
 * matches an accessible name by substring unless told otherwise — so the
 * unscoped, inexact locator finds two buttons in German and one in English,
 * which is the sort of difference that makes a spec pass in the language it was
 * written in and fail in every other.
 */
const menuTrigger = (page: Page, label: string) =>
  page.getByRole('banner').getByRole('button', { name: label, exact: true });

/** True when the document is wider than the window — WCAG 1.4.10's failure. */
const scrollsSideways = (page: Page) =>
  page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);

test.describe('phone navigation', () => {
  test.use({ viewport: PHONE });

  test('the panel carries the destinations the header row cannot show', async ({ page }) => {
    await page.goto(path('/'));
    await waitForHydration(page);

    // The row itself is display:none below lg; that is the gap the panel fills.
    await expect(page.getByRole('navigation', { name: en.nav.sectionsA11y })).toBeHidden();

    await menuTrigger(page, en.nav.menuOpenA11y).click();

    const panel = page.getByRole('dialog', { name: en.nav.menuTitleA11y });
    await expect(panel).toBeVisible();
    for (const label of [en.nav.profile, en.nav.leaderboards, en.nav.games, en.nav.cheatSheets]) {
      await expect(panel.getByRole('link', { name: label })).toBeVisible();
    }

    /*
     * And the reader can actually see them. `toBeVisible()` above is satisfied
     * by a non-empty bounding box and knows nothing about a clipping ancestor,
     * so it passed while the panel was 66px tall — sized to the blurred header
     * that was its containing block — with every link clipped out of sight.
     * The panel is full height, and the last link is inside the viewport.
     */
    const panelBox = await panel.boundingBox();
    expect(panelBox?.height).toBeGreaterThan(PHONE.height * 0.9);
    const lastLink = await panel.getByRole('link', { name: en.nav.cheatSheets }).boundingBox();
    expect(lastLink!.y + lastLink!.height).toBeLessThanOrEqual(PHONE.height);
  });

  test('reaches the cheat sheets, which nothing else on a phone links to', async ({ page }) => {
    await page.goto(path('/'));
    await waitForHydration(page);

    await menuTrigger(page, en.nav.menuOpenA11y).click();
    await page
      .getByRole('dialog', { name: en.nav.menuTitleA11y })
      .getByRole('link', { name: en.nav.cheatSheets })
      .click();

    await expect(page).toHaveURL(/\/en\/cheat-sheets$/);
    // And the panel is not still sitting over the page it navigated to.
    await expect(page.getByRole('dialog', { name: en.nav.menuTitleA11y })).toBeHidden();
  });

  test('closes on Escape, with focus back on the trigger', async ({ page }) => {
    await page.goto(path('/'));
    await waitForHydration(page);

    const trigger = menuTrigger(page, en.nav.menuOpenA11y);
    await trigger.click();
    await expect(page.getByRole('dialog', { name: en.nav.menuTitleA11y })).toBeVisible();

    await page.keyboard.press('Escape');

    await expect(page.getByRole('dialog', { name: en.nav.menuTitleA11y })).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test('opens in German too, and the links keep the language', async ({ page }) => {
    await page.goto(path('/', 'de'));
    await waitForHydration(page);

    await menuTrigger(page, de.nav.menuOpenA11y).click();

    const panel = page.getByRole('dialog', { name: de.nav.menuTitleA11y });
    await expect(panel.getByRole('link', { name: de.nav.cheatSheets })).toHaveAttribute(
      'href',
      '/de/cheat-sheets'
    );
  });
});

test.describe('header reflow', () => {
  // 320px is what docs/ACCESSIBILITY.md requires (1.4.10), not 360. German is
  // the widest of the five languages in the header — it is the language the
  // breakpoint comments in NavBar.tsx were measured in.
  for (const width of [320, 360]) {
    test(`does not scroll sideways at ${width}px in German`, async ({ page }) => {
      await page.setViewportSize({ width, height: 740 });
      await page.goto(path('/', 'de'));
      await waitForHydration(page);

      expect(await scrollsSideways(page)).toBe(false);

      // Nor with the panel open over it.
      await menuTrigger(page, de.nav.menuOpenA11y).click();
      await expect(page.getByRole('dialog', { name: de.nav.menuTitleA11y })).toBeVisible();
      expect(await scrollsSideways(page)).toBe(false);
    });
  }
});

test.describe('desktop navigation', () => {
  test('keeps the visible row and hides the panel trigger', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(path('/'));
    await waitForHydration(page);

    const row = page.getByRole('navigation', { name: en.nav.sectionsA11y });
    await expect(row).toBeVisible();
    await expect(row.getByRole('link', { name: en.nav.cheatSheets })).toBeVisible();

    // Above lg the row shows everything, so the panel would only be a second
    // way to reach what is already on screen.
    await expect(menuTrigger(page, en.nav.menuOpenA11y)).toBeHidden();
    // Scoped to the header: the dashboard's profile card links to /auth with
    // the same words.
    await expect(
      page.getByRole('banner').getByRole('link', { name: en.nav.login })
    ).toBeVisible();
  });
});
