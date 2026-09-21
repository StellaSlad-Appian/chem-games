// e2e/cheat-sheet-diagrams.spec.ts
//
// One property, measured: **a cheat-sheet diagram is drawn 512 CSS px wide on
// every screen, and the page still reflows at 320.**
//
// The two are in tension, which is the whole reason this file exists. The
// files are 640 units wide and their text is held to a 20-unit floor by
// `scripts/cheat-sheet-diagrams.mts`, so 512 px is what turns that floor into
// 16 CSS px — the size
// `docs/feature-briefs/atomic-structure-redesign.md` §12.3 reasons about. The
// image used to be `w-full max-w-lg`, which gave it whatever the column had:
// 512 on a desktop and 236 on a 320 px phone, where the same text drew at 7.4
// CSS px. Pinning the width fixes the type and makes the image wider than its
// column, so the check that the *page* does not scroll sideways has to come
// with it — otherwise the cure is an accessibility regression.
//
// `docs/ACCESSIBILITY.md` requires 320 px (1.4.10), not 360. The 375 is an
// iPhone, which is what most of these readers actually hold.
//
// **The overhang check skips anything inside a clipping box on purpose.** The
// diagram's own `getBoundingClientRect()` reports all 512 px, hanging well
// past a 320 px viewport, and it is supposed to: it sits in an
// `overflow-x-auto` box that clips it, exactly as the lookup tables above it
// do. A generic "nothing overhangs" sweep — the one
// `e2e/explore-archive.spec.ts` runs over the explore pages — would flag it.
// If these pages are ever added to a sweep like that, it needs this exclusion.

import { expect, test, type Page } from '@playwright/test';
import { CHEAT_SHEETS } from '../src/lib/cheat-sheet-data';
import { path, waitForHydration } from './helpers';

/** `max-w-lg` / `min-w-lg`, the width the 20-unit text floor is sized for. */
const DRAWN_WIDTH = 512;

const SHEETS_WITH_DIAGRAMS = CHEAT_SHEETS.filter((sheet) =>
  sheet.sections.some((section) => section.image)
).map((sheet) => sheet.slug);

type Diagram = {
  file: string;
  imgWidth: number;
  boxClientWidth: number;
  boxScrollWidth: number;
};

const diagrams = (page: Page): Promise<Diagram[]> =>
  page.evaluate(() =>
    Array.from(document.querySelectorAll<HTMLImageElement>('img[src^="/cheat-sheets/"]')).map(
      (img) => {
        const box = img.parentElement!;
        return {
          file: img.getAttribute('src')!.split('/').pop()!,
          imgWidth: Math.round(img.getBoundingClientRect().width),
          boxClientWidth: box.clientWidth,
          boxScrollWidth: box.scrollWidth,
        };
      }
    )
  );

/**
 * Elements hanging past the viewport, ignoring those a scrolling ancestor
 * clips — see the note at the top of the file.
 */
const overhangingElements = (page: Page) =>
  page.evaluate(() => {
    const clipped = (node: Element): boolean => {
      for (let el = node.parentElement; el; el = el.parentElement) {
        if (getComputedStyle(el).overflowX !== 'visible') return true;
      }
      return false;
    };
    const out: Array<{ tag: string; className: string; right: number }> = [];
    for (const node of Array.from(document.body.querySelectorAll('*'))) {
      const rect = node.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) continue;
      if (rect.right <= window.innerWidth + 1) continue;
      if (clipped(node)) continue;
      out.push({
        tag: node.tagName.toLowerCase(),
        className: typeof node.className === 'string' ? node.className.slice(0, 80) : '',
        right: Math.ceil(rect.right),
      });
    }
    return out;
  });

test.describe('cheat-sheet diagrams', () => {
  test('there are sheets carrying diagrams to measure', () => {
    // If the data ever loses its images this file passes vacuously, which is
    // the failure mode a coverage-shaped test cannot see from the inside.
    expect(SHEETS_WITH_DIAGRAMS.length).toBeGreaterThan(0);
  });

  for (const slug of SHEETS_WITH_DIAGRAMS) {
    for (const width of [320, 375]) {
      test(`${slug}: every diagram is drawn ${DRAWN_WIDTH}px at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 740 });
        await page.goto(path(`/cheat-sheets/${slug}`));
        await waitForHydration(page);

        const found = await diagrams(page);
        expect(found.length).toBeGreaterThan(0);

        for (const diagram of found) {
          expect(diagram.imgWidth, `${diagram.file} is not drawn at ${DRAWN_WIDTH}px`).toBe(
            DRAWN_WIDTH
          );
          // The box is narrower than the diagram, and scrolls to reach the
          // rest of it. Without the second half the reader is simply shown a
          // cropped figure.
          expect(diagram.boxClientWidth).toBeLessThan(DRAWN_WIDTH);
          expect(diagram.boxScrollWidth).toBeGreaterThanOrEqual(DRAWN_WIDTH);
        }
      });

      test(`${slug}: the page does not scroll sideways at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 740 });
        await page.goto(path(`/cheat-sheets/${slug}`));
        await waitForHydration(page);

        expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
          width
        );

        const overhanging = await overhangingElements(page);
        expect(
          overhanging,
          `these elements hang past the ${width}px viewport:\n${JSON.stringify(overhanging, null, 2)}`
        ).toEqual([]);
      });
    }

    test(`${slug}: nothing pans on a desktop layout`, async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 900 });
      await page.goto(path(`/cheat-sheets/${slug}`));
      await waitForHydration(page);

      for (const diagram of await diagrams(page)) {
        expect(diagram.imgWidth).toBe(DRAWN_WIDTH);
        expect(diagram.boxScrollWidth, `${diagram.file} scrolls on a desktop layout`).toBe(
          diagram.boxClientWidth
        );
      }
    });
  }
});
