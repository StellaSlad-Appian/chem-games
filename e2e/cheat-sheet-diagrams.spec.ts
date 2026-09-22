// e2e/cheat-sheet-diagrams.spec.ts
//
// Two properties of the boxes on a cheat-sheet detail page that pan sideways.
//
// **One: a cheat-sheet diagram is drawn 512 CSS px wide on every screen, and
// the page still reflows at 320.**
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
// **Two: a box that pans says so, and can be panned from a keyboard — and a
// box that does not pan does neither.** That is `PannableBox`, and the checks
// for it live here rather than in a file of their own because the diagrams are
// half the subject: the affordance covers the lookup tables too, deliberately
// and in the same commit, since one without the other reads as an
// inconsistency rather than a hint. A separate spec would have measured the
// diagrams in one place and the tables in another and lost exactly that.
// `atomic-structure` is the sheet that carries both, so it is where the
// affordance is measured on both kinds of box at once.
//
// The conditional half matters as much as the affordance. `tabIndex={0}` on a
// desktop layout is a tab stop that scrolls nothing — a stop every keyboard
// user pays for on every table on the page — so `nothing carries a tab stop on
// a desktop layout` is not a formality.
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
import { en } from '../src/i18n/dictionaries/en';
import { de } from '../src/i18n/dictionaries/de';
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

/**
 * A `PannableBox`, found by what it holds rather than by a test attribute: the
 * `min-w-[28rem]` table of a lookup table, or a diagram. The box is the
 * scrolling element and its parent is the wrapper that carries the hint line.
 */
type PanBox = {
  kind: 'table' | 'diagram';
  pans: boolean;
  tabIndex: string | null;
  role: string | null;
  label: string | null;
  /** The hint line's text, or null while no hint is rendered at all. */
  hint: string | null;
  /** '1' while the box can still be scrolled right, '0' at the end of it. */
  hintOpacity: string | null;
};

const panBoxes = (page: Page): Promise<PanBox[]> =>
  page.evaluate(() =>
    Array.from(
      document.querySelectorAll<HTMLElement>(
        'table[class*="min-w-"], img[src^="/cheat-sheets/"]'
      )
    ).map((content) => {
      const box = content.parentElement!;
      const hint = box.parentElement!.querySelector('p[aria-hidden="true"]');
      return {
        kind: content.tagName === 'TABLE' ? ('table' as const) : ('diagram' as const),
        pans: box.scrollWidth - box.clientWidth > 1,
        tabIndex: box.getAttribute('tabindex'),
        role: box.getAttribute('role'),
        label: box.getAttribute('aria-label'),
        hint: hint?.textContent?.trim() ?? null,
        hintOpacity: hint ? getComputedStyle(hint).opacity : null,
      };
    })
  );

/**
 * The boxes once the component has measured them.
 *
 * Measuring happens in an effect, so every assertion about the affordance has
 * to be able to wait: `waitForHydration` clears on a sibling component's
 * state and can win the race against this one. Polling on "the diagram box has
 * decided" rather than on a timeout also covers the second measurement, the
 * one a late-decoding SVG triggers through the `ResizeObserver`.
 */
const settledPanBoxes = async (page: Page, expected: number): Promise<PanBox[]> => {
  await expect
    .poll(async () => (await panBoxes(page)).filter((box) => box.pans === (box.tabIndex === '0')))
    .toHaveLength(expected);
  return panBoxes(page);
};

test.describe('cheat-sheet pan affordance', () => {
  // The one sheet carrying both a lookup table and a diagram, so both kinds of
  // box are measured against the same expectation in the same run.
  const BOTH_KINDS = 'atomic-structure';

  test('there is a sheet carrying both a table and a diagram', () => {
    const sheet = CHEAT_SHEETS.find((candidate) => candidate.slug === BOTH_KINDS);
    expect(sheet?.tables?.length ?? 0).toBeGreaterThan(0);
    expect(sheet?.sections.some((section) => section.image)).toBe(true);
  });

  test(`${BOTH_KINDS}: every box that pans says so at 320px`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 740 });
    await page.goto(path(`/cheat-sheets/${BOTH_KINDS}`));
    await waitForHydration(page);

    const boxes = await panBoxes(page);
    const settled = await settledPanBoxes(page, boxes.length);

    // Both kinds, or the test is measuring one of them twice.
    expect(new Set(settled.map((box) => box.kind))).toEqual(new Set(['table', 'diagram']));

    for (const box of settled) {
      expect(box.pans, `a ${box.kind} does not pan at 320px, so it has nothing to say`).toBe(true);
      expect(box.tabIndex, `${box.kind} is not a tab stop`).toBe('0');
      expect(box.role).toBe('group');
      // The visible hint and the box's accessible name are the same string on
      // purpose: one key, so the two cannot drift apart.
      expect(box.label).toBe(en.cheatSheets.panHint);
      expect(box.hint).toBe(en.cheatSheets.panHint);
      expect(box.hintOpacity).toBe('1');
    }
  });

  // This expectation is also what the server-rendered HTML says before the
  // component has measured anything, so on its own it would pass against a
  // page that never hydrated. The 320px tests above are what prove the
  // measurement runs; this one is about what it decides.
  test(`${BOTH_KINDS}: nothing carries a tab stop on a desktop layout`, async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(path(`/cheat-sheets/${BOTH_KINDS}`));
    await waitForHydration(page);

    const boxes = await panBoxes(page);
    const settled = await settledPanBoxes(page, boxes.length);
    expect(settled.length).toBeGreaterThan(0);

    for (const box of settled) {
      expect(box.pans, `a ${box.kind} still pans at 1280px`).toBe(false);
      expect(box.tabIndex, `${box.kind} is a tab stop that scrolls nothing`).toBeNull();
      expect(box.role).toBeNull();
      expect(box.label).toBeNull();
      expect(box.hint, `${box.kind} shows a hint with nothing to hint at`).toBeNull();
    }
  });

  test(`${BOTH_KINDS}: the hint goes at the end of the scroll and the tab stop stays`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 740 });
    await page.goto(path(`/cheat-sheets/${BOTH_KINDS}`));
    await waitForHydration(page);
    await settledPanBoxes(page, (await panBoxes(page)).length);

    const scrollFirstDiagram = (to: 'end' | 'start') =>
      page.evaluate((target) => {
        const box = document.querySelector<HTMLImageElement>('img[src^="/cheat-sheets/"]')!
          .parentElement!;
        box.scrollLeft = target === 'end' ? box.scrollWidth : 0;
      }, to);

    const firstDiagram = async () =>
      (await panBoxes(page)).find((box) => box.kind === 'diagram')!;

    await scrollFirstDiagram('end');
    // `transition-opacity` means the fade is not instant, so this polls rather
    // than reading once.
    await expect.poll(async () => (await firstDiagram()).hintOpacity).toBe('0');
    // The box still pans — backwards — so taking the tab stop away here would
    // strand a keyboard reader at the right-hand edge of the figure.
    expect((await firstDiagram()).tabIndex).toBe('0');

    await scrollFirstDiagram('start');
    await expect.poll(async () => (await firstDiagram()).hintOpacity).toBe('1');
  });

  test(`${BOTH_KINDS}: the hint is translated`, async ({ page }) => {
    // The affordance's whole cost was a dictionary key. This is the check that
    // the key is actually read, rather than the English being inlined at the
    // component — which nothing else here would catch.
    expect(de.cheatSheets.panHint).not.toBe(en.cheatSheets.panHint);

    await page.setViewportSize({ width: 320, height: 740 });
    await page.goto(path(`/cheat-sheets/${BOTH_KINDS}`, 'de'));
    await waitForHydration(page);

    const settled = await settledPanBoxes(page, (await panBoxes(page)).length);
    expect(settled.length).toBeGreaterThan(0);
    for (const box of settled) {
      expect(box.label).toBe(de.cheatSheets.panHint);
      expect(box.hint).toBe(de.cheatSheets.panHint);
    }
  });
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
