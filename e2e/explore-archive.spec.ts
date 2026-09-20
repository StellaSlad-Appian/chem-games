// e2e/explore-archive.spec.ts
//
// What only a real browser can tell you about the permalinks and the index.
//
// The unit tests already prove the arithmetic, the heading tree, the hreflang
// set and the three date sentences, with the clock pinned. Running that again
// through Playwright would be slower and prove nothing new. What is left is
// what lives outside the component tree: 240 routes really exist and really
// prerender, `<html lang>` matches the URL, the links between the three pages
// actually go somewhere, and nothing overhangs a 320px phone.
//
// ## Two measurement traps, both of which cost a day on this feature before
//
// **`toBeVisible()` knows nothing about a clipping ancestor.** It is satisfied
// by a non-empty bounding box, and a whole spec once passed against a panel
// rendering 66px tall with its content clipped out of sight. So the checks
// below assert the card is *tall enough to hold its own prose* and that a
// paragraph inside it sits within the card's box — not that it is "visible".
//
// **`scrollWidth <= innerWidth` cannot see an over-full flex row**, because the
// row compresses instead of overflowing. `e2e/nav.spec.ts` forces
// `width: max-content` to make the real number visible, and that is the right
// tool *there*, where nothing in the header may shrink or wrap.
//
// It is the wrong tool on these pages, and it is worth saying why rather than
// copying it. Everything here is meant to give way: the prose wraps, the entry
// names `truncate`, the card heading is `break-words`. `max-content` on a row
// of truncating links reports the width the names would need if they were never
// truncated — a number that is large by design and says nothing about whether
// the page fits. Two checks replace it:
//
//   * **Nothing overhangs the viewport.** Every element's right edge, not the
//     document's scrollWidth. A compressed row still overhangs if one of its
//     children is `shrink-0`, so this sees what scrollWidth misses.
//   * **The natural width of what cannot shrink.** In a row of entry links that
//     is the icons, the formula and the lifespan — everything except the names,
//     which are allowed to truncate. Hiding the names and measuring
//     `max-content` gives the floor the row genuinely needs, which is the
//     quantity the nav check is about.

import { expect, test, type Page } from '@playwright/test';
import { LOCALES } from '../src/i18n/config';
import { getDictionary } from '../src/i18n/dictionaries';
import { findLocalizedMolecule } from '../src/i18n/explore';
import { EXPLORE_MOLECULES } from '../src/lib/explore/molecules';
import { EXPLORE_SCIENTISTS } from '../src/lib/explore/scientists';
import { path, waitForHydration } from './helpers';

const NARROW = { width: 320, height: 740 };

const scrollsSideways = (page: Page) =>
  page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);

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

test.describe('the permalinks', () => {
  for (const locale of LOCALES) {
    test(`a molecule resolves at /${locale}/explore/molecules/benzene`, async ({ page }) => {
      const t = await getDictionary(locale);
      // **The entry's prose in *this* locale**, not the English it is written
      // in. Looking for `EXPLORE_MOLECULES[…].everyday` here passed in English
      // and Russian — Russian's prose is deferred, so it is the English — and
      // timed out in German, French, Spanish and Italian, which is precisely
      // the four locales that have an overlay. The test was wrong and the page
      // was right, which is the good way round: it means the German page really
      // is in German.
      const molecule = findLocalizedMolecule(locale, 'benzene')!;

      await page.goto(path('/explore/molecules/benzene', locale));
      await waitForHydration(page);

      await expect(page).toHaveURL(new RegExp(`/${locale}/explore/molecules/benzene$`));
      await expect(page.locator('html')).toHaveAttribute('lang', locale);

      // The entry's own name is the h1 — the same in every locale for this one,
      // because Italian and English both spell it "Benzene", but a heading all
      // the same rather than "Molecule of the Week" repeated 20 times.
      const heading = page.getByRole('heading', { level: 1 });
      await expect(heading).toHaveCount(1);

      // Not `toBeVisible()`. The card must be tall enough to actually hold the
      // entry, and the prose must sit inside it.
      const card = page.getByRole('region').filter({ has: heading });
      const cardBox = (await card.boundingBox())!;
      expect(cardBox.height).toBeGreaterThan(400);

      const prose = page.getByText(molecule.everyday);
      const proseBox = (await prose.boundingBox())!;
      expect(proseBox.height).toBeGreaterThan(0);
      expect(proseBox.y).toBeGreaterThanOrEqual(cardBox.y);
      expect(proseBox.y + proseBox.height).toBeLessThanOrEqual(cardBox.y + cardBox.height + 1);

      // The way back, and the way on.
      await expect(page.getByRole('link', { name: t.explore.backToExplore })).toHaveCount(1);
    });
  }

  test('a scientist resolves, and links to the molecule it was paired with', async ({ page }) => {
    const t = await getDictionary('en');

    await page.goto(path('/explore/scientists/kathleen-lonsdale'));
    await waitForHydration(page);

    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Kathleen Lonsdale');

    const pair = page.getByRole('region', { name: t.explore.sameWeekHeading });
    const link = pair.getByRole('link');
    await expect(link).toHaveAttribute('href', '/en/explore/molecules/benzene');

    await link.click();
    await expect(page).toHaveURL(/\/en\/explore\/molecules\/benzene$/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Benzene');
  });

  test('every entry in the pool has a page, sampled across both pools', async ({ page }) => {
    // Not all 40 — that is 40 navigations for a claim `generateStaticParams`
    // already makes. A sample from each end of each pool catches a route that
    // only prerenders the first few.
    const ids = [
      ...[EXPLORE_MOLECULES[0], EXPLORE_MOLECULES.at(-1)!].map(
        (m) => `/explore/molecules/${m.id}`
      ),
      ...[EXPLORE_SCIENTISTS[0], EXPLORE_SCIENTISTS.at(-1)!].map(
        (s) => `/explore/scientists/${s.id}`
      ),
    ];

    for (const appPath of ids) {
      await page.goto(path(appPath));
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await expect(page.getByText('404')).toHaveCount(0);
    }
  });

  test('an id that is not in the pool is a 404, not a blank card', async ({ page }) => {
    const response = await page.goto(path('/explore/molecules/not-a-molecule'));
    expect(response?.status()).toBe(404);
  });

  test('renders a permalink in Russian, chrome and prose alike', async ({ page }) => {
    /*
     * This test used to assert a notice saying the entry prose was still
     * English — explore.md §0c, when Russian content was deferred. The Russian
     * prose landed while the archive was being built, so the notice is gone and
     * what is worth checking is the opposite: that a permalink, the page a
     * Russian reader is likeliest to arrive at cold from a search result, is
     * Russian the whole way down.
     */
    const ru = await getDictionary('ru');

    await page.goto(path('/explore/molecules/benzene', 'ru'));
    await waitForHydration(page);

    await expect(page.getByRole('link', { name: ru.explore.backToExplore })).toHaveCount(1);
    await expect(page.getByText(ru.explore.everydayHeading)).toBeVisible();
    // The formula stays Latin, as Russian chemistry writes it.
    await expect(page.locator('main')).toContainText('C6H6');
  });

  test('carries its own canonical and a full set of hreflang alternates', async ({ page }) => {
    await page.goto(path('/explore/molecules/water', 'de'));

    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      /\/de\/explore\/molecules\/water$/
    );

    for (const locale of LOCALES) {
      await expect(
        page.locator(`link[rel="alternate"][hreflang="${locale}"]`)
      ).toHaveAttribute('href', new RegExp(`/${locale}/explore/molecules/water$`));
    }
    await expect(
      page.locator('link[rel="alternate"][hreflang="x-default"]')
    ).toHaveAttribute('href', /\/en\/explore\/molecules\/water$/);
  });
});

test.describe('the recent list and the index', () => {
  test('the recent list links reach a permalink that really renders', async ({ page }) => {
    const t = await getDictionary('en');

    await page.goto(path('/explore'));
    await waitForHydration(page);

    const list = page.getByRole('region', { name: t.explore.recentHeading });
    const rows = list.getByRole('listitem');
    const count = await rows.count();
    // Ten unless the site is being run in its first ten weeks, which no CI run
    // will be — the epoch is January 2026.
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThanOrEqual(10);

    const href = await rows.first().getByRole('link').first().getAttribute('href');
    expect(href).toMatch(/^\/en\/explore\/(molecules|scientists)\//);

    await page.goto(href!);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByText('404')).toHaveCount(0);
  });

  test('the archive lists the whole rotation and every row links both ways', async ({ page }) => {
    const t = await getDictionary('en');

    await page.goto(path('/explore'));
    await waitForHydration(page);
    await page.getByRole('link', { name: t.explore.archiveCta }).first().click();

    await expect(page).toHaveURL(/\/en\/explore\/archive$/);
    await expect(
      page.getByRole('heading', { level: 1, name: t.explore.archiveHeading })
    ).toBeVisible();

    const rows = page.getByRole('listitem');
    await expect(rows).toHaveCount(20);

    const hrefs = await page.getByRole('listitem').getByRole('link').evaluateAll((links) =>
      links.map((link) => link.getAttribute('href'))
    );
    expect(hrefs).toHaveLength(40);
    expect(new Set(hrefs).size).toBe(40);

    // Exactly one row is marked as this week.
    await expect(page.getByText(t.explore.archiveThisWeek, { exact: true })).toHaveCount(1);
  });

  test('the archive keeps the language when you switch it', async ({ page }) => {
    const en = await getDictionary('en');
    const it = await getDictionary('it');

    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(path('/explore/archive'));
    await waitForHydration(page);

    const switcher = page.getByLabel(en.language.label);
    await expect(switcher).toHaveAttribute('data-hydrated', 'true');
    await switcher.selectOption('it');

    await expect(page).toHaveURL(/\/it\/explore\/archive$/, { timeout: 15_000 });
    await expect(
      page.getByRole('heading', { level: 1, name: it.explore.archiveHeading })
    ).toBeVisible();
  });
});

test.describe('reflow', () => {
  // 320px is what docs/ACCESSIBILITY.md requires (1.4.10), not 360. Every
  // locale, because the entries carry the longest prose on the site and the
  // German and Russian headings are the longest compounds.
  const PAGES = [
    '/explore/archive',
    '/explore/molecules/monosodium-glutamate',
    '/explore/scientists/johanna-dobereiner',
  ];

  for (const locale of LOCALES) {
    for (const appPath of PAGES) {
      test(`${appPath} does not scroll sideways at 320px in ${locale}`, async ({ page }) => {
        await page.setViewportSize(NARROW);
        await page.goto(path(appPath, locale));
        await waitForHydration(page);

        expect(await scrollsSideways(page)).toBe(false);

        // The check scrollWidth cannot make: a compressed row whose
        // non-shrinking child still hangs over the edge.
        const overhanging = await overhangingElements(page);
        expect(
          overhanging,
          `these elements hang past the 320px viewport:\n${JSON.stringify(overhanging, null, 2)}`
        ).toEqual([]);
      });
    }
  }

  test('an entry row needs less than the viewport for the parts that cannot shrink', async ({
    page,
  }) => {
    // The `max-content` measurement, applied to the quantity it can actually
    // see.
    //
    // **Measured at 640px, not 320.** This is the `sm` breakpoint, and it is
    // the only width where the row is under any horizontal pressure at all:
    // below it the two links stack and the formula and the lifespan are
    // `hidden`, so a 320px measurement would be measuring an icon and some
    // padding and would pass whatever happened. At `sm` the two links sit side
    // by side with a formula on one and a lifespan on the other.
    //
    // The names are hidden for the measurement because they `truncate` by
    // design — `max-content` on a truncating element reports the width it would
    // need if it never truncated, which is large on purpose and says nothing.
    // What is left is what genuinely cannot shrink, and that is the floor the
    // row needs. German is the widest of the six languages.
    await page.setViewportSize({ width: 640, height: 740 });
    await page.goto(path('/explore/archive', 'de'));
    await waitForHydration(page);

    const measurements = await page.evaluate(() => {
      const results: Array<{ natural: number; viewport: number }> = [];
      // The flex row holding both links, not each link on its own: the two
      // compete for the same line, so the pair is what has to fit.
      for (const row of Array.from(document.querySelectorAll('li > div:last-child'))) {
        const element = row as HTMLElement;
        const names = Array.from(element.querySelectorAll('span')).filter((span) =>
          span.className.includes('truncate')
        );
        const previousDisplay = names.map((span) => span.style.display);
        for (const span of names) span.style.display = 'none';

        const previousWidth = element.style.width;
        element.style.width = 'max-content';
        const natural = Math.ceil(element.getBoundingClientRect().width);
        element.style.width = previousWidth;
        names.forEach((span, i) => {
          span.style.display = previousDisplay[i];
        });

        results.push({ natural, viewport: window.innerWidth });
      }
      return results;
    });

    expect(measurements.length).toBeGreaterThan(0);
    const widest = Math.max(...measurements.map((m) => m.natural));
    test.info().annotations.push({
      type: 'entry row natural width at 640px, de',
      description: `widest ${widest}px in a ${measurements[0].viewport}px viewport`,
    });
    // Enough spare that the names have somewhere to go: a row whose fixed parts
    // fill the viewport leaves nothing for the thing the row is actually for.
    expect(widest).toBeLessThan(measurements[0].viewport / 2);
  });

  test('the archive rows are not clipped out of sight', async ({ page }) => {
    // `toBeVisible()` would pass on a row rendering 4px tall inside an
    // `overflow-hidden` parent. The rows carry two 44px tap targets, so a row
    // shorter than that is clipped whatever Playwright says about it.
    await page.setViewportSize(NARROW);
    await page.goto(path('/explore/archive'));
    await waitForHydration(page);

    const rows = page.getByRole('listitem');
    for (const row of await rows.all()) {
      const box = (await row.boundingBox())!;
      expect(box.height).toBeGreaterThan(88);
      expect(box.x + box.width).toBeLessThanOrEqual(NARROW.width);
    }
  });
});
