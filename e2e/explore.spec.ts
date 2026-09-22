// e2e/explore.spec.ts
//
// What only a real browser can tell you about the three Explore tabs.
//
// The unit tests already prove the content is complete, the rotation is right,
// the heading tree holds and the right pill carries `aria-current` — running
// that again through Playwright would be slower and prove nothing new. What is
// left is the part that lives outside the component tree: the three routes
// really exist in every locale, `(tabs)` really contributes nothing to a URL,
// `<html lang>` matches, clicking a pill really navigates and keeps the
// language, the card really fits a laptop screen, and the strip really fits a
// 320px phone in the widest languages.
//
// ## Measuring the strip
//
// `scrollWidth <= innerWidth` cannot see an over-full flex row, because the row
// compresses instead of overflowing. The strip is a `flex-wrap` row of three
// pills that are *allowed* to wrap, so the quantity that matters is not the
// strip's width but **the widest single pill**: a pill wider than the viewport
// is one that cannot wrap its way out of trouble, and that is the failure mode
// German, Spanish and Russian would produce. Each pill is measured at
// `width: max-content`, the way `e2e/nav.spec.ts` forces the real number out of
// a row that would otherwise compress.
//
// Plus the check `scrollWidth` genuinely cannot make: every element's right
// edge against the viewport, which sees a compressed row whose `shrink-0` child
// still hangs over the edge.

import { expect, test, type Page } from '@playwright/test';
import { LOCALES, type Locale } from '../src/i18n/config';
import { getDictionary } from '../src/i18n/dictionaries';
import { getExploreContent } from '../src/i18n/explore';
import { path, scrollsSideways, waitForHydration } from './helpers';

const PHONE = { width: 360, height: 740 };
const LAPTOP = { width: 1440, height: 900 };


/** Every element whose right edge is past the viewport, with what it is. */
const overhangingElements = (page: Page) =>
  page.evaluate(() => {
    const out: Array<{ tag: string; className: string; right: number }> = [];
    for (const node of Array.from(document.body.querySelectorAll('*'))) {
      const box = node.getBoundingClientRect();
      // Zero-sized and off-screen-by-design nodes (sr-only) are not overhang.
      if (box.width === 0 || box.height === 0) continue;
      if (box.right > window.innerWidth + 1) {
        out.push({
          tag: node.tagName.toLowerCase(),
          className: typeof node.className === 'string' ? node.className.slice(0, 80) : '',
          right: Math.ceil(box.right),
        });
      }
    }
    return out;
  });

/**
 * This week's pair, in the reader's language.
 *
 * The same function the layout calls, so the names the strip renders and the
 * names asserted here come from one place rather than from a fixture that
 * would go stale every Monday. The browser's clock and this process's can
 * differ only across a Monday 00:00 UTC boundary, which is the same window the
 * app itself lives with.
 */
const thisWeek = (locale: Locale) => getExploreContent(locale, new Date());

/** The tab strip, which is a named navigation landmark and not a tablist. */
const tabs = (page: Page, label: string) => page.getByRole('navigation', { name: label });

const TABS = [
  ['/explore', ''],
  ['/explore/scientist', '/scientist'],
  ['/explore/archive', '/archive'],
] as const;

test.describe('the three tabs', () => {
  for (const locale of LOCALES) {
    test(`all three resolve in ${locale}, under one shared header`, async ({ page }) => {
      const t = await getDictionary(locale);

      for (const [appPath, suffix] of TABS) {
        await page.goto(path(appPath, locale));
        await waitForHydration(page);

        // The URL segments stay English in every locale, and `(tabs)` is a
        // route group, so it appears in none of them.
        await expect(page).toHaveURL(new RegExp(`/${locale}/explore${suffix}$`));
        await expect(page).not.toHaveURL(/tabs/);
        await expect(page.locator('html')).toHaveAttribute('lang', locale);

        // One heading for all three tabs, and it is the layout's.
        await expect(
          page.getByRole('heading', { level: 1, name: t.explore.heading })
        ).toBeVisible();
        await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);

        // One dateline, on the strip's row, on every tab.
        await expect(page.locator('header time')).toHaveCount(1);
        await expect(tabs(page, t.explore.tabsA11y)).toBeVisible();
      }
    });
  }

  test('each tab marks its own pill as the current page', async ({ page }) => {
    const t = await getDictionary('en');

    for (const [appPath] of TABS) {
      await page.goto(path(appPath));
      await waitForHydration(page);

      const current = tabs(page, t.explore.tabsA11y).locator('[aria-current="page"]');
      await expect(current).toHaveCount(1);
      await expect(current).toHaveAttribute('href', path(appPath));
    }
  });

  test('/explore is the molecule tab, with no redirect and no fourth URL', async ({ page }) => {
    // The load-bearing claim of the whole route structure. A redirect would
    // show up as a changed URL; a fourth page would answer 200 below.
    const response = await page.goto(path('/explore'));
    expect(response?.status()).toBe(200);
    await expect(page).toHaveURL(/\/en\/explore$/);

    const missing = await page.goto(path('/explore/molecule'));
    expect(missing?.status()).toBe(404);
  });

  test('is a nav, not the ARIA tabs pattern', async ({ page }) => {
    // Three separate documents. `role="tablist"` would promise a screen reader
    // that the panels are in this one and that arrow keys move between them.
    await page.goto(path('/explore'));
    await waitForHydration(page);

    await expect(
      page.locator('[role="tablist"], [role="tab"], [role="tabpanel"]')
    ).toHaveCount(0);
  });

  test('the pills carry this week’s two entry names', async ({ page }) => {
    const t = await getDictionary('en');
    const week = thisWeek('en');

    await page.goto(path('/explore'));
    await waitForHydration(page);

    const strip = tabs(page, t.explore.tabsA11y);
    await expect(strip.getByRole('link').nth(0)).toContainText(week.molecule.name);
    await expect(strip.getByRole('link').nth(1)).toContainText(week.scientist.name);
    // The archive has no entry of its own and borrows the old call to action.
    await expect(strip.getByRole('link').nth(2)).toContainText(t.explore.archiveCta);

    // The chemist is behind a click, and the name in the pill is the whole
    // mitigation: on this tab it is the only place the name appears.
    await expect(page.getByRole('heading', { level: 2 }).first()).toHaveText(
      week.molecule.name
    );
  });

  test('clicking a pill navigates, keeps the language, and leaves the header alone', async ({
    page,
  }) => {
    const t = await getDictionary('de');
    const week = thisWeek('de');

    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(path('/explore', 'de'));
    await waitForHydration(page);

    const strip = tabs(page, t.explore.tabsA11y);

    /*
     * The generous timeouts are the same allowance the language switcher gets
     * in `getting there` below, and for the same reason, spelled out in
     * `languageSwitcher()` in e2e/helpers.ts: a Link click is a React
     * transition that does not commit — and so does not move the URL — until
     * the destination's RSC payload arrives. Under `next dev` the first visit
     * to a route pays its compile inside that window, and /explore/scientist
     * is a brand-new route, so it is the slowest first click on the site.
     *
     * The warm-up project exists to pay that cost up front, but it only runs
     * when the whole suite does; running this spec on its own skips it, which
     * is exactly how this assertion was first seen to fail at the default 10s.
     */
    await strip.getByRole('link').nth(1).click();
    await expect(page).toHaveURL(/\/de\/explore\/scientist$/, { timeout: 30_000 });
    await expect(page.getByRole('heading', { level: 2 }).first()).toHaveText(
      week.scientist.name
    );
    await expect(
      page.getByRole('heading', { level: 1, name: t.explore.heading })
    ).toBeVisible();

    await strip.getByRole('link').nth(2).click();
    await expect(page).toHaveURL(/\/de\/explore\/archive$/, { timeout: 30_000 });

    await strip.getByRole('link').nth(0).click();
    await expect(page).toHaveURL(/\/de\/explore$/, { timeout: 30_000 });
  });

  test('does not leave English chrome behind in another language', async ({ page }) => {
    const en = await getDictionary('en');
    const de = await getDictionary('de');

    await page.goto(path('/explore', 'de'));
    await waitForHydration(page);

    // The pill labels are the cheapest tell now that the card eyebrows are
    // gone: if the page is wired to the wrong dictionary these come back
    // English first.
    await expect(tabs(page, de.explore.tabsA11y)).toContainText(de.explore.tabMolecule);
    await expect(page.getByText(en.explore.heading, { exact: true })).toHaveCount(0);
    await expect(page.getByText(en.explore.tabArchive, { exact: true })).toHaveCount(0);
    await expect(page.getByRole('navigation', { name: en.explore.tabsA11y })).toHaveCount(0);
  });

  test('carries its own canonical and hreflang on every tab, moved ones included', async ({
    page,
  }) => {
    for (const [appPath, suffix] of TABS) {
      await page.goto(path(appPath, 'de'));

      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        new RegExp(`/de/explore${suffix}$`)
      );
      for (const locale of LOCALES) {
        await expect(
          page.locator(`link[rel="alternate"][hreflang="${locale}"]`)
        ).toHaveAttribute('href', new RegExp(`/${locale}/explore${suffix}$`));
      }
      await expect(
        page.locator('link[rel="alternate"][hreflang="x-default"]')
      ).toHaveAttribute('href', new RegExp(`/en/explore${suffix}$`));
    }
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

  /**
   * The regression guard for the shape of the section, which the test above
   * cannot give: its `.first()` is satisfied by any number of Explore
   * sections, and for two days there were three.
   *
   * `1618358` moved the section to the end of the dashboard by cutting it and
   * pasting it back one nesting level too deep — inside the `<div>` of a game
   * teaser card, which is itself a `LocaleLink`. It compiled, it type-checked,
   * and the section still rendered, so every existing test passed. What it
   * cost was an `<a href="/explore">` inside an `<a href="/games/...">`, which
   * no browser will parse: the parser reparents the inner anchor, the client
   * tree stops matching the server's, and **hydration failed for the whole
   * dashboard** — the site's landing page, in every language.
   *
   * So the two things asserted here are the two things that were wrong, and
   * neither is specific to Explore. A duplicated `id` and an anchor inside an
   * anchor are what mis-nesting looks like from the outside, whatever gets
   * mis-nested next.
   */
  test('the dashboard has one Explore section, outside the game cards', async ({ page }) => {
    await page.goto(path('/'));
    await waitForHydration(page);

    await expect(page.locator('#explore')).toHaveCount(1);

    // A section, not a descendant of one of the teaser links.
    expect(
      await page.evaluate(() => Boolean(document.querySelector('#games #explore')))
    ).toBe(false);

    const nested = await page.evaluate(() =>
      Array.from(document.querySelectorAll('a a')).map((a) => a.getAttribute('href'))
    );
    expect(nested, `these links sit inside another link:\n${JSON.stringify(nested)}`).toEqual([]);
  });

  test('the language switcher keeps you on the tab you are on', async ({ page }) => {
    const en = await getDictionary('en');
    const fr = await getDictionary('fr');

    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(path('/explore/scientist'));
    await waitForHydration(page);

    const switcher = page.getByLabel(en.language.label);
    await expect(switcher).toHaveAttribute('data-hydrated', 'true');
    await switcher.selectOption('fr');

    // A moved route keeps its place in the switcher's mapping, which it would
    // not if `(tabs)` had leaked into the URL.
    await expect(page).toHaveURL(/\/fr\/explore\/scientist$/, { timeout: 15_000 });
    await expect(page.getByRole('heading', { level: 1, name: fr.explore.heading })).toBeVisible();
  });
});

test.describe('the inward links', () => {
  test('each entry tab reaches a page that really renders', async ({ page }) => {
    for (const appPath of ['/explore', '/explore/scientist']) {
      await page.goto(path(appPath));
      await waitForHydration(page);

      // The card is the one region on an entry tab, and its inward link is the
      // first internal link inside it.
      const section = page.getByRole('region').first();
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
    }
  });
});

test.describe('the card above the fold', () => {
  test('the molecule fits a 1440x900 laptop, picture beside the prose', async ({ page }) => {
    // The complaint the whole redesign started from: a structure diagram told
    // to fill the card pushed everything worth reading off the screen.
    await page.setViewportSize(LAPTOP);
    await page.goto(path('/explore'));
    await waitForHydration(page);

    const picture = page.locator('section img').first();
    const box = await picture.boundingBox();
    if (box) {
      // Capped at `max-h-80`, and beside the prose rather than above it.
      expect(box.height).toBeLessThanOrEqual(321);

      const prose = page.getByRole('region').first().locator('p').first();
      const proseBox = (await prose.boundingBox())!;
      expect(proseBox.x).toBeGreaterThan(box.x + box.width - 1);
    }

    // The entry's heading and the start of its prose — the things the reader
    // came for — are on screen without scrolling.
    const heading = page.getByRole('heading', { level: 2 }).first();
    const headingBox = (await heading.boundingBox())!;
    expect(headingBox.y + headingBox.height).toBeLessThan(LAPTOP.height);

    const everyday = page.getByRole('region').first().locator('p').first();
    const everydayBox = (await everyday.boundingBox())!;
    expect(everydayBox.y).toBeLessThan(LAPTOP.height);
  });
});

test.describe('reflow', () => {
  // 320px is what docs/ACCESSIBILITY.md requires (1.4.10), not 360. Every
  // locale, because the Explore cards carry the longest prose on the site,
  // German runs about 30% longer than the English, and the Spanish and Italian
  // pills carry a two-word doublet where the other four carry one word.
  for (const locale of LOCALES) {
    for (const width of [320, 360]) {
      test(`does not scroll sideways at ${width}px in ${locale}`, async ({ page }) => {
        await page.setViewportSize({ width, height: 740 });

        for (const [appPath] of TABS) {
          await page.goto(path(appPath, locale));
          await waitForHydration(page);

          expect(await scrollsSideways(page), `${appPath} scrolls sideways`).toBe(false);

          const overhanging = await overhangingElements(page);
          expect(
            overhanging,
            `${appPath} in ${locale}: these hang past the ${width}px viewport:\n${JSON.stringify(
              overhanging,
              null,
              2
            )}`
          ).toEqual([]);
        }
      });
    }
  }

  for (const locale of LOCALES) {
    test(`no single tab pill needs more than the 320px viewport in ${locale}`, async ({
      page,
    }) => {
      // The measurement `scrollWidth` cannot make. The strip is allowed to wrap
      // to two rows on a phone — that is the design — so the strip's own width
      // says nothing about whether it fits. What would break the page is one
      // pill whose natural width exceeds the viewport, because a pill cannot
      // wrap its way out of being too wide on its own. `max-content` forces the
      // real number out, the way e2e/nav.spec.ts does for the header row.
      const t = await getDictionary(locale);

      await page.setViewportSize({ width: 320, height: 740 });
      await page.goto(path('/explore', locale));
      await waitForHydration(page);

      const measurements = await page.evaluate((label) => {
        const nav = document.querySelector(`nav[aria-label="${label}"]`)!;
        return Array.from(nav.querySelectorAll('a')).map((node) => {
          const element = node as HTMLElement;
          const previous = element.style.width;
          element.style.width = 'max-content';
          const natural = Math.ceil(element.getBoundingClientRect().width);
          element.style.width = previous;
          return { natural, viewport: window.innerWidth };
        });
      }, t.explore.tabsA11y);

      expect(measurements).toHaveLength(3);
      const widest = Math.max(...measurements.map((m) => m.natural));
      test.info().annotations.push({
        type: `widest pill at 320px, ${locale}`,
        description: `${widest}px in a ${measurements[0].viewport}px viewport`,
      });
      // The content column is the viewport less the page's two 16px gutters.
      expect(widest).toBeLessThanOrEqual(measurements[0].viewport - 32);
    });
  }

  test('the strip wraps rather than truncating the names', async ({ page }) => {
    // Mobile is where the chemist is hardest to stumble across, so it is the
    // worst place to drop the hint that they exist. The name must still be
    // there at 320px, which means the strip goes to two rows rather than
    // clipping — and every pill still holds its two lines and its 44px target.
    const t = await getDictionary('de');
    const week = thisWeek('de');

    await page.setViewportSize({ width: 320, height: 740 });
    await page.goto(path('/explore', 'de'));
    await waitForHydration(page);

    const strip = tabs(page, t.explore.tabsA11y);
    await expect(strip).toContainText(week.scientist.name);

    for (const pill of await strip.getByRole('link').all()) {
      const box = (await pill.boundingBox())!;
      expect(box.height).toBeGreaterThanOrEqual(44);
      expect(box.x + box.width).toBeLessThanOrEqual(320);
    }
  });

  test('does not clip the formula out of its card at 320px', async ({ page }) => {
    // The formula sits opposite the molecule name in a row that becomes a
    // column below `sm`. A long name plus a long formula is exactly the pair
    // that would overflow, and an overflowing formula is worse than a wrapped
    // one because the charge or the subscript is what falls off the end.
    await page.setViewportSize({ width: 320, height: 740 });
    await page.goto(path('/explore', 'de'));
    await waitForHydration(page);

    const card = page.getByRole('region').first();
    const cardBox = (await card.boundingBox())!;
    expect(cardBox.x + cardBox.width).toBeLessThanOrEqual(320);
  });
});

test.describe('keyboard', () => {
  test('the strip is reachable and operable with the keyboard alone', async ({ page }) => {
    const t = await getDictionary('en');

    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(path('/explore'));
    await waitForHydration(page);

    const scientistPill = tabs(page, t.explore.tabsA11y).getByRole('link').nth(1);

    // Tab forward from the top of the document until the pill has focus. The
    // bound is generous but finite: an unreachable control is the failure, and
    // it shows up as the loop running out rather than as a hang.
    let reached = false;
    for (let i = 0; i < 40 && !reached; i += 1) {
      await page.keyboard.press('Tab');
      reached = await scientistPill.evaluate((node) => node === document.activeElement);
    }
    expect(reached, 'the scientist pill was never reached by Tab').toBe(true);

    // Focus is visible: an outline, not one removed with `outline-none`.
    const outline = await scientistPill.evaluate((node) => getComputedStyle(node).outlineStyle);
    expect(outline).not.toBe('none');

    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/\/en\/explore\/scientist$/);
  });
});
