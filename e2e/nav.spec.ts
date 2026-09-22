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
import { path, scrollsSideways, waitForHydration } from './helpers';

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
   * How much room the header actually has at `lg`, which the loop above cannot
   * tell you.
   *
   * **`scrollWidth <= innerWidth` is not enough, and this is the trap.** The
   * header row is a flex container whose `<nav>` can shrink, so an over-full
   * row does not scroll — it compresses. Measured the naive way, the German
   * header passed every reflow check while genuinely being 1033px of content
   * in a 1024px viewport.
   *
   * Forcing `width: max-content` for the measurement is what makes the real
   * number visible: nothing can shrink, so the row reports the width it would
   * need. docs/feature-briefs/nav-profile-to-settings.md §3 asks for ~20px
   * spare at 1024px in every locale, and that target only means anything
   * against this measurement.
   *
   * The measurement is printed either way, so the milestone table can be read
   * off the run rather than retyped.
   */
  test('has real headroom in the 1024px header, in every locale', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 800 });
    const measurements: Array<Record<string, number | string>> = [];

    for (const locale of LOCALES) {
      await page.goto(path('/', locale));
      await waitForHydration(page);

      const measured = await page.evaluate(() => {
        const row = document.querySelector('header')?.firstElementChild as HTMLElement | null;
        if (!row) return null;
        // Temporarily stop the row shrinking, so it reports what it needs.
        const previous = row.style.width;
        row.style.width = 'max-content';
        const natural = Math.ceil(row.getBoundingClientRect().width);
        row.style.width = previous;
        return {
          natural,
          viewport: window.innerWidth,
          scrollWidth: document.documentElement.scrollWidth,
        };
      });

      expect(measured).not.toBeNull();
      measurements.push({
        locale,
        natural: measured!.natural,
        spare: measured!.viewport - measured!.natural,
      });
    }

    test.info().annotations.push({
      type: 'header natural widths at 1024px, signed out',
      description: JSON.stringify(measurements),
    });

    const tooTight = measurements.filter((row) => (row.spare as number) < 20);
    expect(
      tooTight,
      `These locales have under 20px of headroom in the 1024px header: ` +
        `${JSON.stringify(measurements)}. Shorten a nav label or tighten the row ` +
        `— do not lower this threshold, and do not trust scrollWidth here, ` +
        `because flex-shrink hides an over-full row from it.`
    ).toEqual([]);
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
