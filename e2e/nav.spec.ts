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
import { LOCALES } from '../src/i18n/config';
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
    for (const label of [
      en.nav.leaderboards,
      en.nav.games,
      en.nav.cheatSheets,
      en.nav.explore,
    ]) {
      await expect(panel.getByRole('link', { name: label })).toBeVisible();
    }

    // Profile is not one of them any more: it moved into the Settings popover's
    // Account section. Asserted here rather than only in the unit test because
    // the row and the panel read the same array, so this is the place a
    // regression would show up in both at once.
    await expect(panel.getByRole('link', { name: en.nav.profile })).toHaveCount(0);

    /*
     * And the reader can actually see them. `toBeVisible()` above is satisfied
     * by a non-empty bounding box and knows nothing about a clipping ancestor,
     * so it passed while the panel was 66px tall — sized to the blurred header
     * that was its containing block — with every link clipped out of sight.
     * The panel is full height, and the last link is inside the viewport.
     */
    const panelBox = await panel.boundingBox();
    expect(panelBox?.height).toBeGreaterThan(PHONE.height * 0.9);
    const lastLink = await panel.getByRole('link', { name: en.nav.explore }).boundingBox();
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
  /*
   * Every locale, every breakpoint that matters. Not "the widest language":
   * the comment in NavBar.tsx used to name German as the widest and it was
   * wrong — measured across the whole header row, English is, because it has
   * both the longest nav labels and the longest sign-in button. Guessing which
   * language is worst is exactly how the 1024px overflow survived for months,
   * so the loop runs all five.
   *
   * 320px because docs/ACCESSIBILITY.md requires it (1.4.10), not 360. 1024px
   * because that is where the horizontal row appears and therefore the tightest
   * width at which every nav label is on screen at once.
   *
   * Signed **out**, which is the wide case: the signed-out control is
   * "Log in / Register" (and its equivalents), which is longer than "Log out"
   * in all five languages. A signed-in header is strictly narrower, so a
   * signed-out pass covers it.
   */
  const WIDTHS = [320, 360, 768, 1024, 1280];

  for (const locale of LOCALES) {
    for (const width of WIDTHS) {
      test(`does not scroll sideways at ${width}px in ${locale}`, async ({ page }) => {
        await page.setViewportSize({ width, height: 740 });
        await page.goto(path('/', locale));
        await waitForHydration(page);

        expect(await scrollsSideways(page)).toBe(false);
      });
    }
  }

  for (const width of [320, 360]) {
    test(`does not scroll sideways with the panel open at ${width}px in German`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 740 });
      await page.goto(path('/', 'de'));
      await waitForHydration(page);

      await menuTrigger(page, de.nav.menuOpenA11y).click();
      await expect(page.getByRole('dialog', { name: de.nav.menuTitleA11y })).toBeVisible();
      expect(await scrollsSideways(page)).toBe(false);
    });
  }

  /*
   * The number behind the assertion above, reported rather than merely passed.
   *
   * `scrollWidth <= innerWidth` tells you the header fits; it does not tell you
   * by how much, and "fits with 2px to spare" is a regression waiting for the
   * next label. docs/feature-briefs/nav-profile-to-settings.md §3 asks for at
   * least ~20px spare at 1024px in every locale, so that is what this checks —
   * and it prints the measurement so the milestone table can be copied out of
   * the test output instead of retyped.
   */
  test('keeps real spare width in the 1024px header, in every locale', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 800 });
    const measurements: Array<Record<string, number | string>> = [];

    for (const locale of LOCALES) {
      await page.goto(path('/', locale));
      await waitForHydration(page);

      const measured = await page.evaluate(() => {
        const header = document.querySelector('header');
        // The flex row inside the header, which is what actually has to fit.
        const row = header?.firstElementChild as HTMLElement | null;
        if (!row) return null;
        const content = Array.from(row.children).reduce(
          (total, child) => total + (child as HTMLElement).getBoundingClientRect().width,
          0
        );
        const styles = getComputedStyle(row);
        const gaps = (row.children.length - 1) * parseFloat(styles.columnGap || '0');
        const padding = parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);
        return {
          content: Math.round(content + gaps + padding),
          viewport: window.innerWidth,
          scrollWidth: document.documentElement.scrollWidth,
        };
      });

      expect(measured).not.toBeNull();
      measurements.push({
        locale,
        content: measured!.content,
        spare: measured!.viewport - measured!.content,
      });

      expect(measured!.scrollWidth).toBeLessThanOrEqual(measured!.viewport);
      expect(measured!.viewport - measured!.content).toBeGreaterThanOrEqual(20);
    }

    // Shows up in the Playwright report, and in `--reporter=list` on failure.
    test.info().annotations.push({
      type: 'header widths at 1024px, signed out',
      description: JSON.stringify(measurements),
    });
  });
});

test.describe('account, now that Profile has left the row', () => {
  test('the settings popover reaches the profile pages', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(path('/'));
    await waitForHydration(page);

    // Signed out, the Account section shows the way in rather than an absence.
    await page.getByRole('banner').getByRole('button', { name: en.nav.settingsA11y }).click();
    await expect(page.getByText(en.settings.account)).toBeVisible();
    await expect(
      page.getByRole('link', { name: en.nav.login, exact: true }).last()
    ).toBeVisible();
  });
});

test.describe('desktop navigation', () => {
  test('keeps the visible row and hides the panel trigger', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(path('/'));
    await waitForHydration(page);

    const row = page.getByRole('navigation', { name: en.nav.sectionsA11y });
    await expect(row).toBeVisible();
    await expect(row.getByRole('link', { name: en.nav.cheatSheets })).toBeVisible();
    await expect(row.getByRole('link', { name: en.nav.explore })).toBeVisible();
    await expect(row.getByRole('link', { name: en.nav.profile })).toHaveCount(0);

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
