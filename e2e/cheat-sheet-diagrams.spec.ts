// e2e/cheat-sheet-diagrams.spec.ts
//
// Two properties of the boxes on a cheat-sheet detail page that pan sideways.
//
// **One: a cheat-sheet diagram is drawn at 0.8 CSS px per unit on every
// screen, in a box that hugs the drawing, and the page still reflows at 320.**
//
// The scale and the reflow are in tension, which is the whole reason this file
// exists. `scripts/cheat-sheet-diagrams.mts` sets every label at 17.5 units,
// so 0.8 px per unit is what makes a label 14 CSS px — the size of the
// paragraph above it. Left to shrink with the column, a 400-unit diagram on a
// 320 px phone would get 236 px and the same label 10 CSS px. Fixing the scale
// fixes the type and makes some diagrams wider than their column, so the check
// that the *page* does not scroll sideways has to come with it — otherwise the
// cure is an accessibility regression.
//
// The width is not fixed: the script measures each canvas from what it draws,
// so the box ends where the drawing does. That is checked here in a browser,
// in every locale, against the real glyphs rather than the script's estimate:
// nothing is cut off, and nothing leaves an empty strip down the right.
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
// **Three: a generated diagram is inline SVG in the reader's language and
// theme.** Its words come from `scripts/cheat-sheet-diagram-strings.mts`, so
// the German page is checked against that table's German entries rather than
// against a literal, and its colours are `--diagram-*` custom properties that
// have to change when the theme does — the thing an `<img>` could not do.
//
// **The overhang check skips anything inside a clipping box on purpose.** A
// wide diagram's own `getBoundingClientRect()` reports its full width, hanging
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
import { DIAGRAM_STRINGS } from '../scripts/cheat-sheet-diagram-strings.mts';
import { CSS_PX_PER_UNIT } from '../src/generated/cheat-sheet-diagrams';
import { LOCALES } from '../src/i18n/config';

/**
 * The most a drawing may stop short of its canvas's right-hand edge, in units:
 * the script's 16-unit margin, its rounding up to 5, and what its per-letter
 * estimate overshoots the real glyphs by on the widest label (about 8%).
 */
const RIGHT_SLACK = 48;

/**
 * A generated section diagram, drawn inline. (A hand-made file would be an
 * `<img>`; no sheet has one, and it is pinned at 512 px, not measured.)
 */
const DIAGRAM = 'svg[data-diagram]';

const SHEETS_WITH_DIAGRAMS = CHEAT_SHEETS.filter((sheet) =>
  sheet.sections.some((section) => section.image)
).map((sheet) => sheet.slug);

type Diagram = {
  file: string;
  /** The canvas, in units. */
  canvas: { width: number; height: number };
  /** The drawing inside it, in units, as the browser lays out the real glyphs. */
  drawn: { left: number; top: number; right: number; bottom: number };
  /** CSS px inside the border. */
  contentWidth: number;
  contentHeight: number;
  /** CSS px, border included: what the reader sees as the box. */
  outerWidth: number;
  boxClientWidth: number;
  boxScrollWidth: number;
};

const diagrams = (page: Page): Promise<Diagram[]> =>
  page.evaluate(
    (selector) =>
      Array.from(document.querySelectorAll<SVGSVGElement>(selector)).map((svg) => {
        const box = svg.parentElement!;
        const style = getComputedStyle(svg);
        const rect = svg.getBoundingClientRect();
        const bbox = svg.getBBox();
        const border = (side: string) => parseFloat(style.getPropertyValue(`border-${side}-width`));
        return {
          file: svg.getAttribute('data-diagram')!,
          canvas: { width: svg.viewBox.baseVal.width, height: svg.viewBox.baseVal.height },
          drawn: {
            left: bbox.x,
            top: bbox.y,
            right: bbox.x + bbox.width,
            bottom: bbox.y + bbox.height,
          },
          contentWidth: rect.width - border('left') - border('right'),
          contentHeight: rect.height - border('top') - border('bottom'),
          outerWidth: rect.width,
          boxClientWidth: box.clientWidth,
          boxScrollWidth: box.scrollWidth,
        };
      }),
    DIAGRAM
  );

/** Drawn at the fixed scale, in both directions. */
const expectAtScale = (diagram: Diagram) => {
  expect(diagram.contentWidth, `${diagram.file} is not drawn at ${CSS_PX_PER_UNIT} px per unit`).toBeCloseTo(
    diagram.canvas.width * CSS_PX_PER_UNIT,
    1
  );
  expect(diagram.contentHeight, `${diagram.file} is stretched`).toBeCloseTo(
    diagram.canvas.height * CSS_PX_PER_UNIT,
    1
  );
};

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
  page.evaluate(
    (diagram) =>
      Array.from(document.querySelectorAll<Element>(`table[class*="min-w-"], ${diagram}`)).map(
        (content) => {
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
        }
      ),
    DIAGRAM
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

  // A box hugs its drawing now, so on a 375 px phone some diagrams fit the
  // column outright. Those must look like any other figure: no hint, no tab
  // stop. The ones that do not fit still say so.
  test(`${BOTH_KINDS}: at 375px a diagram that fits has no affordance, and one that does not has it`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 740 });
    await page.goto(path(`/cheat-sheets/${BOTH_KINDS}`));
    await waitForHydration(page);

    const settled = await settledPanBoxes(page, (await panBoxes(page)).length);
    const fitting = settled.filter((box) => box.kind === 'diagram' && !box.pans);
    expect(fitting.length, 'no diagram fits a 375px phone, so this checks nothing').toBeGreaterThan(0);

    for (const box of settled) {
      if (box.pans) {
        expect(box.tabIndex, `a ${box.kind} that pans is not a tab stop`).toBe('0');
        expect(box.hint).toBe(en.cheatSheets.panHint);
      } else {
        expect(box.tabIndex, `a ${box.kind} that fits is a tab stop`).toBeNull();
        expect(box.role).toBeNull();
        expect(box.label).toBeNull();
        expect(box.hint, `a ${box.kind} that fits shows a hint`).toBeNull();
      }
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
      page.evaluate(
        ({ target, diagram }) => {
          const box = document.querySelector(diagram)!.parentElement!;
          box.scrollLeft = target === 'end' ? box.scrollWidth : 0;
        },
        { target: to, diagram: DIAGRAM }
      );

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
      test(`${slug}: every diagram keeps its scale at ${width}px, and pans only if wider than the column`, async ({
        page,
      }) => {
        await page.setViewportSize({ width, height: 740 });
        await page.goto(path(`/cheat-sheets/${slug}`));
        await waitForHydration(page);

        const found = await diagrams(page);
        expect(found.length).toBeGreaterThan(0);

        for (const diagram of found) {
          expectAtScale(diagram);
          if (diagram.outerWidth > diagram.boxClientWidth + 1) {
            // Wider than the column: the box scrolls to reach the rest of it.
            // Without this the reader is simply shown a cropped figure.
            expect(diagram.boxScrollWidth, `${diagram.file} is cropped, not panned`).toBeGreaterThanOrEqual(
              Math.floor(diagram.outerWidth)
            );
          } else {
            expect(diagram.boxScrollWidth, `${diagram.file} fits and still scrolls`).toBe(
              diagram.boxClientWidth
            );
          }
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
        expectAtScale(diagram);
        expect(diagram.boxScrollWidth, `${diagram.file} scrolls on a desktop layout`).toBe(
          diagram.boxClientWidth
        );
      }
    });

    // The script sizes each canvas from its estimate of the glyphs; this is the
    // same claim against the glyphs a browser actually lays out, in every
    // locale, since the canvas is the largest any of them needs.
    test(`${slug}: every box hugs its drawing, in every locale`, async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 900 });
      const furthest = new Map<string, { right: number; width: number }>();

      for (const locale of LOCALES) {
        await page.goto(path(`/cheat-sheets/${slug}`, locale));
        await page.evaluate(() => document.fonts.ready);
        for (const diagram of await diagrams(page)) {
          const { drawn, canvas, file } = diagram;
          const where = `${file} [${locale}]`;
          // Nothing is cut off at any edge.
          expect(drawn.left, `${where} is cut off on the left`).toBeGreaterThanOrEqual(0);
          expect(drawn.top, `${where} is cut off at the top`).toBeGreaterThanOrEqual(0);
          expect(drawn.right, `${where} is cut off on the right`).toBeLessThanOrEqual(canvas.width);
          expect(drawn.bottom, `${where} is cut off at the bottom`).toBeLessThanOrEqual(canvas.height);
          const seen = furthest.get(file);
          if (!seen || drawn.right > seen.right) furthest.set(file, { right: drawn.right, width: canvas.width });
        }
      }

      expect(furthest.size).toBeGreaterThan(0);
      // And the widest locale reaches the right-hand edge, less the margin:
      // the box ends where the drawing does, with no empty strip beyond it.
      for (const [file, { right, width }] of furthest) {
        expect(right, `${file} leaves ${Math.round(width - right)} empty units on the right`).toBeGreaterThanOrEqual(
          width - RIGHT_SLACK
        );
      }
    });
  }
});

/** A `{name}` placeholder is filled with a whole number by the script. */
const asPattern = (entry: string) =>
  new RegExp(`^${entry.replace(/[.*+?^$()|[\]\\]/g, '\\$&').replace(/\{\w+\}/g, '\\d+')}$`);

type Rgb = [number, number, number];

const parseRgb = (css: string): Rgb => {
  const match = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(css);
  if (!match) throw new Error(`not an rgb() colour: ${css}`);
  return [Number(match[1]), Number(match[2]), Number(match[3])];
};

const contrast = (a: Rgb, b: Rgb): number => {
  const luminance = (rgb: Rgb) => {
    const [r, g, b] = rgb.map((v) => {
      const c = v / 255;
      return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
};

test.describe('generated diagrams: language and theme', () => {
  const GENERATED = CHEAT_SHEETS.filter((sheet) =>
    sheet.sections.some((section) => section.image && 'diagram' in section.image)
  ).map((sheet) => sheet.slug);

  test('there are generated diagrams to check', () => {
    expect(GENERATED.length).toBeGreaterThan(0);
  });

  for (const slug of GENERATED) {
    test(`${slug}: /de draws every diagram from its German strings`, async ({ page }) => {
      // Until the German labels are written the German entries equal the
      // English ones, so this compares with the strings table and not with a
      // literal: the claim is that the page draws the `de` entry, whatever
      // it currently says.
      await page.goto(path(`/cheat-sheets/${slug}`, 'de'));

      const found = await page.evaluate(() =>
        Array.from(document.querySelectorAll('svg[data-diagram]')).map((svg) => ({
          id: svg.getAttribute('data-diagram')!,
          label: svg.getAttribute('aria-label'),
          role: svg.getAttribute('role'),
          texts: Array.from(svg.querySelectorAll('text')).map((text) => text.textContent ?? ''),
        }))
      );
      expect(found.length).toBeGreaterThan(0);

      const sheet = CHEAT_SHEETS.find((candidate) => candidate.slug === slug)!;
      for (const diagram of found) {
        const table = DIAGRAM_STRINGS[diagram.id];
        expect(table, `no strings table for ${diagram.id}`).toBeDefined();
        for (const [key, entry] of Object.entries(table.de)) {
          expect(
            diagram.texts.some((text) => asPattern(entry).test(text)),
            `${diagram.id} does not draw de.${key} ("${entry}")`
          ).toBe(true);
        }

        // The accessible name is the section's translated alt, not anything
        // English inside the drawing.
        expect(diagram.role).toBe('img');
        const section = sheet.sections.find(
          (candidate) =>
            candidate.image && 'diagram' in candidate.image && candidate.image.diagram === diagram.id
        )!;
        expect(diagram.label).toBeTruthy();
        expect(diagram.label, `${diagram.id} is named in English on /de`).not.toBe(section.image!.alt);
      }

      // Ids inside inline SVG share the page's id space.
      const ids = await page.evaluate(() =>
        Array.from(document.querySelectorAll('[id]')).map((element) => element.id)
      );
      expect(ids.length, 'an id on this page is used twice').toBe(new Set(ids).size);
    });
  }

  test('a diagram follows the theme toggle', async ({ page }) => {
    await page.addInitScript(() => window.localStorage.setItem('chem-games-theme', 'light'));
    await page.goto(path(`/cheat-sheets/${GENERATED[0]}`));
    await expect.poll(() => page.evaluate(() => document.documentElement.dataset.theme)).toBe('light');

    const colours = () =>
      page.evaluate(() => {
        const svg = document.querySelector('svg[data-diagram]')!;
        return {
          background: getComputedStyle(svg).backgroundColor,
          text: Array.from(svg.querySelectorAll('text')).map((text) => getComputedStyle(text).fill),
        };
      });

    const light = await colours();
    // What the settings toggle does: flip the attribute in place, no reload.
    await page.evaluate(() => {
      document.documentElement.dataset.theme = 'dark';
    });
    const dark = await colours();

    expect(dark.background).not.toBe(light.background);
    expect(dark.text[0]).not.toBe(light.text[0]);
    // Every label clears normal-text contrast in both themes, which is what
    // lets it be regular weight at 14 px.
    for (const { background, text } of [light, dark]) {
      for (const fill of new Set(text)) {
        expect(contrast(parseRgb(fill), parseRgb(background)), `${fill} on ${background}`).toBeGreaterThanOrEqual(4.5);
      }
    }
  });
});
