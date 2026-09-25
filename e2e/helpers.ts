import { expect, type Locator, type Page } from '@playwright/test';
import { COMPOUNDS_REGISTRY } from '../src/core-engine/data/compounds';
import { DEFAULT_LOCALE, type Locale } from '../src/i18n/config';
import { localizePath } from '../src/i18n/routing';
import { calculateMoleculeHealth, evaluateChemical } from '../src/core-engine/utils/chemical-utils';
import type { ChemicalClassification, CompoundData } from '../src/core-engine/types/chemistry';

export type GameSlug =
  | 'acid-classification'
  | 'formula-blaster'
  | 'neutralise'
  | 'reaction-balancer'
  | 'lewis-structures';

/**
 * Every route is locale-prefixed now, so the specs navigate to explicit
 * prefixed URLs rather than relying on the proxy's redirect. Going through
 * `/games` would work — the proxy sends it to `/en/games` — but it costs an
 * extra request per navigation and makes a failure ambiguous between "the
 * redirect broke" and "the page broke". `e2e/i18n.spec.ts` is where the
 * redirect itself is tested.
 */
export const path = (appPath: string, locale: Locale = DEFAULT_LOCALE): string =>
  localizePath(appPath, locale);

export const GAME_SLUGS: GameSlug[] = [
  'acid-classification',
  'formula-blaster',
  'neutralise',
  'reaction-balancer',
  'lewis-structures',
];

/**
 * Navigates to a game and waits for its shell. Neutralise, Share to Fill and
 * Reaction Balancer show a first-visit instructions modal; it is skipped
 * unless `showNeutraliseIntro` / `showLewisIntro` / `showBalancerIntro` is
 * set. The guided first rounds of Share to Fill and Reaction Balancer are
 * skipped too unless `showLewisGuide` / `showBalancerGuide` is set.
 */
export async function openGame(
  page: Page,
  slug: GameSlug,
  options: {
    showNeutraliseIntro?: boolean;
    showLewisIntro?: boolean;
    showLewisGuide?: boolean;
    showBalancerIntro?: boolean;
    showBalancerGuide?: boolean;
    locale?: Locale;
  } = {}
): Promise<void> {
  if (slug === 'neutralise' && !options.showNeutraliseIntro) {
    await page.addInitScript(() => {
      window.localStorage.setItem('hasSeenNeutraliseInstructions', 'true');
    });
  }
  if (slug === 'reaction-balancer') {
    const { showBalancerIntro = false, showBalancerGuide = false } = options;
    await page.addInitScript(
      ({ intro, guide }) => {
        if (!intro) window.localStorage.setItem('hasSeenReactionBalancerInstructions', 'true');
        if (!guide) window.localStorage.setItem('reactionBalancerGuidedSeen', 'true');
      },
      { intro: showBalancerIntro, guide: showBalancerGuide }
    );
  }
  if (slug === 'lewis-structures') {
    const { showLewisIntro = false, showLewisGuide = false } = options;
    await page.addInitScript(
      ({ intro, guide }) => {
        if (!intro) window.localStorage.setItem('hasSeenLewisStructuresInstructions', 'true');
        if (!guide) window.localStorage.setItem('lewisStructuresGuidedSeen', JSON.stringify(['h2', 'h2o']));
      },
      { intro: showLewisIntro, guide: showLewisGuide }
    );
  }
  await page.goto(path(`/games/${slug}`, options.locale));
  await expect(page.locator('main.game-shell')).toBeVisible();
  if (slug === 'lewis-structures') {
    // The `.atom-move` class is added in a client-side effect, so its presence
    // means the canvas has hydrated and its buttons have handlers.
    await page.locator('[data-testid="atom"].atom-move').first().waitFor({ state: 'attached' });
  }
}

/**
 * Waits until `GameSettingsProvider` has read the stored preferences.
 *
 * It renders its children inside a wrapper that carries `invisible` until its
 * mount effect has run, so the class disappearing means the settings have been
 * applied — and until it does, the page is literally invisible, so waiting for
 * it is what a reader experiences anyway.
 *
 * This is a wait on *that* provider, not a general hydration barrier. A control
 * whose only behaviour is a React handler needs a signal of its own: Playwright
 * dispatches a DOM event, and if React has not attached the listener yet the
 * event goes nowhere and the test fails with no visible cause. The language
 * <select> publishes one — see `languageSwitcher()`.
 */
export async function waitForHydration(page: Page): Promise<void> {
  await expect(page.locator('div.invisible')).toHaveCount(0);
}

/**
 * The language <select>, once React owns it.
 *
 * `LanguageSwitcher` sets `data-hydrated` in the same render that attaches its
 * `onChange`, so the attribute cannot appear before `selectOption()` would
 * actually do anything. That is a real precondition; the `div.invisible` wait
 * it replaced was a sibling component's state that merely correlated with it.
 *
 * It is **not** why the three switcher specs are flaky under parallel load.
 * With this wait satisfied the handler still runs — it writes the NEXT_LOCALE
 * cookie within ~370ms — and the URL still takes seconds to follow, because
 * `router.replace()` is a transition that does not commit, and so does not move
 * the URL, until the destination's RSC payload arrives. See
 * `src/components/layout/LanguageSwitcher.tsx`.
 */
export async function languageSwitcher(page: Page, label: string): Promise<Locator> {
  const select = page.getByLabel(label);
  await expect(select).toHaveAttribute('data-hydrated', 'true');
  return select;
}

/**
 * How long to give the URL to catch up with a language change.
 *
 * Deliberately far above the 10s `expect.timeout` in `playwright.config.ts`,
 * and it is not papering over a race. The switcher's handler writes the
 * NEXT_LOCALE cookie in ~370ms; what takes the remaining time is
 * `router.replace()`, a transition that does not move the URL until the
 * destination locale's RSC payload has been fetched, and under parallel load
 * on a dev server that payload is queued behind every other worker's
 * compile. Serially these specs have never failed. The failure is load, not
 * logic, so the fix is a budget rather than a retry.
 *
 * Use `expectLocaleUrl()` rather than this constant directly.
 */
export const LOCALE_SWITCH_TIMEOUT = 30_000;

/** Assert the URL followed a language change, with the budget above. */
export function expectLocaleUrl(page: Page, url: RegExp): Promise<void> {
  return expect(page).toHaveURL(url, { timeout: LOCALE_SWITCH_TIMEOUT });
}

/** The pause / level-up / game-over card (role="dialog", labelled by its title). */
export const overlay = (page: Page, name?: string): Locator =>
  name ? page.getByRole('dialog', { name }) : page.getByRole('dialog');

export type FooterButtonTitle = 'How to Play' | 'Pause Game' | 'Resume Game' | 'Settings';
export const footerButton = (page: Page, title: FooterButtonTitle): Locator =>
  page.locator('footer').getByTitle(title);

export const hintButton = (page: Page): Locator => page.getByTitle('Get Hint');

// ---------------------------------------------------------------------------
// Reflow (WCAG 1.4.10)
//
// Two checks, and they catch different failures. Use both.
//
// `scrollsSideways()` is the classic one, and on its own it is **not enough**:
// a flex row that is over-full does not scroll, it *compresses*, so the
// document's scrollWidth never moves and the assertion passes while the row is
// unreadable. That is how the German header shipped needing 1033px in a 1024px
// viewport with every locale green (docs/TODO.md, `e2e/nav.spec.ts`).
//
// `overhangingElements()` is what sees that case: it asks every element for its
// own right edge, so a compressed row whose `shrink-0` child hangs past the
// viewport is reported by name.
//
// A third tool, forcing `width: max-content` on a row, belongs only where
// nothing may shrink or wrap — `e2e/nav.spec.ts` has it, and
// `e2e/explore-archive.spec.ts` explains at length why it is the wrong tool on
// a page of truncating links.
// ---------------------------------------------------------------------------

/** True when the document is wider than the window — WCAG 1.4.10's failure. */
export const scrollsSideways = (page: Page): Promise<boolean> =>
  page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);

/** Every element whose right edge is past the viewport, with what it is. */
export const overhangingElements = (
  page: Page
): Promise<Array<{ tag: string; className: string; right: number }>> =>
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

/** Both reflow checks at once, with a failure message that names the offenders. */
export async function expectNoOverflow(page: Page): Promise<void> {
  expect(await scrollsSideways(page)).toBe(false);
  const overhanging = await overhangingElements(page);
  expect(
    overhanging,
    `these elements hang past the viewport:
${JSON.stringify(overhanging, null, 2)}`
  ).toEqual([]);
}

// ---------------------------------------------------------------------------
// Contrast (WCAG 1.4.3)
// ---------------------------------------------------------------------------

/**
 * WCAG relative luminance and contrast, over two `rgb(...)` strings. A string
 * of source rather than a function because it runs inside `page.evaluate`,
 * which cannot close over anything from this file.
 */
export const CONTRAST = `
  (a, b) => {
    const parse = (s) => s.match(/\\d+/g).slice(0, 3).map(Number);
    const lum = (rgb) => {
      const [r, g, bl] = rgb.map((v) => {
        const c = v / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * bl;
    };
    const [x, y] = [lum(parse(a)), lum(parse(b))].sort((p, q) => q - p);
    return (x + 0.05) / (y + 0.05);
  }
`;

/**
 * Waits for running CSS transitions to land. An explicit theme is applied
 * after hydration, and every `transition` on the page then animates from the
 * device theme's colours to the chosen one's: measured mid-way, a light button
 * reads as grey-on-grey. Only transitions — `animate-pulse` and friends never
 * finish.
 */
async function settleTransitions(page: Page): Promise<void> {
  await page.evaluate(() =>
    Promise.all(
      document
        .getAnimations()
        .filter((animation) => animation instanceof CSSTransition)
        .map((animation) => animation.finished.catch(() => undefined))
    )
  );
}

export interface ContrastFailure {
  text: string;
  ratio: number;
  needs: number;
  color: string;
  background: string;
  element: string;
}

/**
 * Every piece of visible text inside `scope` whose computed colour, against the
 * background actually behind it, misses WCAG AA: 4.5:1, or 3:1 for large text
 * (24px, or 18.66px bold).
 *
 * `CONTRAST` above expects `rgb(...)`, and a Tailwind v4 class like
 * `bg-(--x)/10` computes to `color-mix(...)`, `oklab(...)` or
 * `color(srgb ...)`. So every colour is first painted onto a 1×1 canvas and
 * read back as sRGB bytes, which the browser does for any colour syntax it
 * can render. The background is found by walking up from the text and
 * compositing each translucent layer over the first opaque one, the way the
 * page is actually painted; the text colour and any ancestor `opacity` are then
 * composited over that.
 *
 * Deliberately not measured, as WCAG itself exempts them: text inside
 * `aria-hidden` decoration, disabled controls, and invisible or clipped
 * (sr-only) text. Gradient layers are treated as transparent — every gradient
 * on the site is a wash of 18% or less over an opaque surface, and the tints
 * are checked at their full strength by the token ratios in globals.css.
 */
export async function contrastFailures(page: Page, scope = 'body'): Promise<ContrastFailure[]> {
  await settleTransitions(page);
  return page.evaluate(
    ([scopeSelector, contrastSource]) => {
      const contrast = eval(contrastSource) as (a: string, b: string) => number;
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 1;
      const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
      const rgba = (css: string): [number, number, number, number] => {
        ctx.clearRect(0, 0, 1, 1);
        ctx.fillStyle = '#000';
        ctx.fillStyle = css;
        ctx.fillRect(0, 0, 1, 1);
        const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
        return [r, g, b, a / 255];
      };
      const over = (top: number[], bottom: number[]) => {
        const a = top[3];
        return [0, 1, 2].map((i) => top[i] * a + bottom[i] * (1 - a)).concat(1);
      };
      const background = (node: Element) => {
        const layers: number[][] = [];
        for (let el: Element | null = node; el; el = el.parentElement) {
          const layer = rgba(getComputedStyle(el).backgroundColor);
          if (layer[3] > 0) layers.push(layer);
          if (layer[3] >= 1) break;
        }
        // Nothing opaque up to <html>: the canvas behind it is --background,
        // which <body> paints, so start from white only as a last resort.
        let result = [255, 255, 255, 1];
        for (const layer of layers.reverse()) result = over(layer, result);
        return result;
      };
      const opacity = (node: Element) => {
        let value = 1;
        for (let el: Element | null = node; el; el = el.parentElement) {
          value *= Number(getComputedStyle(el).opacity);
        }
        return value;
      };
      const rgb = (c: number[]) => `rgb(${c.slice(0, 3).map(Math.round).join(', ')})`;

      const root = document.querySelector(scopeSelector);
      if (!root) throw new Error(`No element matches ${scopeSelector}`);
      const failures = [];
      const seen = new Set<Element>();
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      for (let text = walker.nextNode(); text; text = walker.nextNode()) {
        const node = text.parentElement;
        if (!node || seen.has(node) || !text.textContent?.trim()) continue;
        seen.add(node);
        if (node.closest('[aria-hidden="true"], :disabled, script, style, noscript')) continue;
        const box = node.getBoundingClientRect();
        const style = getComputedStyle(node);
        if (box.width <= 1 || box.height <= 1 || style.visibility !== 'visible') continue;
        const alpha = opacity(node);
        if (alpha === 0) continue;

        const bg = background(node);
        const fg = rgba(style.color);
        const ink = over([fg[0], fg[1], fg[2], fg[3] * alpha], bg);
        const size = parseFloat(style.fontSize);
        const large = size >= 24 || (size >= 18.66 && Number(style.fontWeight) >= 700);
        const needs = large ? 3 : 4.5;
        const ratio = contrast(rgb(ink), rgb(bg));
        if (ratio + 0.005 < needs) {
          failures.push({
            text: text.textContent.trim().slice(0, 40),
            ratio: Math.round(ratio * 100) / 100,
            needs,
            color: rgb(ink),
            background: rgb(bg),
            element: `${node.tagName.toLowerCase()}.${String(node.className).slice(0, 80)}`,
          });
        }
      }
      return failures;
    },
    [scope, CONTRAST] as const
  );
}

/**
 * A non-text control's contrast (WCAG 1.4.11): its `color` — which is what an
 * icon's `currentColor` strokes with — against the background behind it,
 * composited the same way `contrastFailures` does.
 */
export async function uiContrast(target: Locator): Promise<number> {
  await settleTransitions(target.page());
  return target.evaluate(
    (node, contrastSource) => {
      const contrast = eval(contrastSource) as (a: string, b: string) => number;
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 1;
      const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
      const rgba = (css: string) => {
        ctx.clearRect(0, 0, 1, 1);
        ctx.fillStyle = '#000';
        ctx.fillStyle = css;
        ctx.fillRect(0, 0, 1, 1);
        const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
        return [r, g, b, a / 255];
      };
      const over = (top: number[], bottom: number[]) =>
        [0, 1, 2].map((i) => top[i] * top[3] + bottom[i] * (1 - top[3])).concat(1);
      const layers: number[][] = [];
      for (let el: Element | null = node; el; el = el.parentElement) {
        const layer = rgba(getComputedStyle(el).backgroundColor);
        if (layer[3] > 0) layers.push(layer);
        if (layer[3] >= 1) break;
      }
      let bg = [255, 255, 255, 1];
      for (const layer of layers.reverse()) bg = over(layer, bg);
      const ink = over(rgba(getComputedStyle(node).color), bg);
      const rgb = (c: number[]) => `rgb(${c.slice(0, 3).map(Math.round).join(', ')})`;
      return contrast(rgb(ink), rgb(bg));
    },
    CONTRAST
  );
}

/** `contrastFailures`, as an assertion that names every offender. */
export async function expectReadable(page: Page, scope = 'body', label = scope): Promise<void> {
  const failures = await contrastFailures(page, scope);
  expect(failures, `${label}: text below WCAG AA contrast\n${JSON.stringify(failures, null, 2)}`).toEqual([]);
}

export function compoundByFormula(formula: string): CompoundData {
  const compound = COMPOUNDS_REGISTRY.find((c) => c.formula === formula);
  if (!compound) throw new Error(`No compound with formula "${formula}"`);
  return compound;
}

export function compoundByName(name: string): CompoundData {
  const compound = COMPOUNDS_REGISTRY.find((c) => c.name === name);
  if (!compound) throw new Error(`No compound named "${name}"`);
  return compound;
}

export const compoundsAtDifficulty = (level: number): CompoundData[] =>
  COMPOUNDS_REGISTRY.filter((c) => c.difficulty === level);

const VESSEL_LABEL: Record<ChemicalClassification, string> = {
  Acidic: 'Acid',
  Basic: 'Base',
  Neutral: 'Neutral',
  Amphoteric: 'Neutral',
};
export const VESSEL_LABELS = ['Acid', 'Neutral', 'Base'] as const;

export const correctVesselFor = (formula: string): string =>
  VESSEL_LABEL[evaluateChemical(compoundByFormula(formula))];

export function wrongVesselFor(formula: string): string {
  const correct = correctVesselFor(formula);
  const wrong = VESSEL_LABELS.find((label) => label !== correct);
  if (!wrong) throw new Error('No wrong vessel available');
  return wrong;
}

/**
 * Neutralise types an invader by evaluateChemical (see level-manager.ts).
 * Acids are neutralised by OH- (key 2), bases by H+ (key 1).
 */
export const ionKeyFor = (formula: string): '1' | '2' =>
  evaluateChemical(compoundByFormula(formula)) === 'Acidic' ? '2' : '1';

export const hitsNeededFor = (formula: string): number =>
  calculateMoleculeHealth(compoundByFormula(formula));

export function parseTranslate(transform: string): { x: number; y: number } {
  const m = transform.match(/translate\(([-\d.]+)px,\s*([-\d.]+)px\)/);
  if (!m) throw new Error(`No translate() in "${transform}"`);
  return { x: parseFloat(m[1]), y: parseFloat(m[2]) };
}

export const mmss = (seconds: number): string =>
  `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
