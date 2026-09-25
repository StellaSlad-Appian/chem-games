// scripts/cheat-sheet-diagrams.mts
//
// Makes every generated diagram on the cheat sheets, once per locale, as
// TypeScript modules under src/generated/cheat-sheet-diagrams/.
//
//   npm run cheat-sheets:diagrams              write the modules
//   npm run cheat-sheets:diagrams -- --check   write nothing; fail if a module
//                                              on disk differs from this script
//
// A sibling of scripts/molecule-images.mts, and built the same way: one drawing
// function per picture, returning SVG. Nothing here comes from a depictor,
// because none of these is a molecule: they are nuclei, a probability cloud, a
// decay curve and two comparison figures. OpenChemLib is a devDependency, it
// depicts molecules from SMILES, and it is deliberately not imported.
//
// The words and numbers inside every drawing live in
// `scripts/cheat-sheet-diagram-strings.mts`, one table per slot with an entry
// for each of the six locales. Its header says how to write one.
//
// ## Why the output is inline SVG, and why it is a TypeScript module
//
// The page draws these **inline**, inside an `<svg>` element it renders
// itself, and not through `<img src>`. An `<img>` SVG is a document of its own:
// it cannot see the site's `data-theme` attribute or read a CSS variable, so it
// had to be legible on the light page and the dark one with a single colour —
// and no grey reaches 4.5:1 on both. The old files got round that by making
// every glyph WCAG *large* text, bold and at least 20 units, which is why the
// diagrams used to be louder than the paragraph explaining them. Inline, every
// colour is a CSS custom property (`--diagram-*` in `src/app/globals.css`)
// with a value per theme, and each value clears the normal-text or
// graphic-contrast threshold in its own theme. So the labels can be regular
// weight at the size of the prose.
//
// Inline also lets the text be the reader's language: this script draws each
// slot six times and the page shows the reader's locale.
//
// The output is a TypeScript module per locale — `en.ts`, `de.ts`, … each
// mapping a slot to the markup that goes *inside* its `<svg>` — plus
// `index.ts`, which lists the slots and their sizes. Three reasons for a module
// rather than files under `public/`:
//
// - The page is a Server Component, prerendered by `generateStaticParams`. An
//   import is resolved by the bundler at build time, so nothing reads `public/`
//   (or the file system at all) when the page is rendered, on any host.
// - The loader in `src/lib/cheat-sheet-diagrams.ts` imports one locale's
//   module dynamically, the same way `src/i18n/dictionaries.ts` loads a
//   dictionary, so a German page only ever pulls German markup. None of it is
//   client JavaScript: the markup reaches the browser inside the prerendered
//   HTML and the RSC payload, and only for the diagrams on that page.
// - The page owns the outer `<svg>`: its size, its classes, and its accessible
//   name, which is the translated `alt` from the cheat-sheet data. So nothing
//   in the markup has to be English, and there is no `<title>` or `<desc>`.
//
// The page puts the markup in with `dangerouslySetInnerHTML`. That is safe
// because it is generated here, at build time, from strings in this repository
// and never from user input — and every string still goes through `esc()`.
//
// ## Type, and the rules this script enforces
//
// The page draws a 640-unit-wide drawing into a 512 CSS px box, so every unit
// is 0.8 CSS px. `label()` is the only way text gets into a drawing, and it
// enforces:
//
// 1. **Labels are `BODY` units, weight 400: 14 CSS px, the size of the prose.**
//    A label has no size option, so it cannot drift.
// 2. **One focal item per slot may be larger or bold** — the Cl symbol and its
//    two numbers, `2, 8, 1`, the Te and I tiles. A focal label names its item,
//    and a drawing that names two different items fails. It may never be
//    smaller than `BODY`.
// 3. **Every label declares its room**, the width in units it is given, and
//    fails the run if its estimated width is wider — in *any* locale — or if it
//    runs off the canvas. The estimate is per character (see `advance()`), and
//    each run prints the tightest label in each slot.
// 4. **A label's text comes from the strings table, a whole number, or an
//    element symbol**, and nothing else — `label()` does not take a bare
//    string, so an English literal cannot slip into a German drawing.
//
// ## The three rules that shape every drawing here
//
// 1. **No electron is a dot on a circular track.** `docs/AGENT_INSTRUCTIONS.md`
//    Part A names "rigid solar-system orbits / solid billiard-ball atoms" as an
//    anti-pattern that "embeds lasting misconceptions", and these are the
//    easiest thing on the site to get wrong that way. Electrons are a stipple
//    whose density falls off, or marks at irregular angles inside a soft band —
//    never evenly spaced on a line. `05-energy-levels` is the one Bohr-style
//    figure; it is there to *count* electrons per level, and it carries the
//    sentence saying so, as `docs/CHEAT_SHEET_IMAGES.md` requires.
//
// 2. **Say the scale.** A nucleus is about 1/100,000 of an atom's width. Both
//    figures here that put a nucleus inside an atom say in the picture that the
//    scale is wrong.
//
// 3. **Colour is never the only carrier.** Every distinction made with colour
//    is also made with fill, outline, position or a word.
//
// ## Determinism
//
// Running this twice with no source change must produce byte-identical
// modules; a previous commit on this repository exists solely to stop
// generated pictures churning on every regeneration. So: no timestamps, no
// counters in ids — every id is derived from the slot's own name — no
// locale-dependent number formatting in code (a localised number is part of
// its string), fixed attribute order, and `n()` on every computed coordinate.
// The scattered marks come from `seeded()`, a fixed-seed integer PRNG, which is
// reproducible on every platform and Node version; that is what makes
// "irregular" and "reproducible" compatible. Every run draws each slot twice in
// each locale and compares, and `--check` compares against what is on disk.
//
// Runs on Node's built-in TypeScript type stripping, like its siblings, so it
// needs no loader: no enums, no namespaces, no parameter properties, and an
// explicit extension on every relative import.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { LOCALES, type Locale } from '../src/i18n/config.ts';
import { DIAGRAM_STRINGS } from './cheat-sheet-diagram-strings.mts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'src', 'generated', 'cheat-sheet-diagrams');
const stringsFile = join(root, 'scripts', 'cheat-sheet-diagram-strings.mts');

// --- The chemistry, and where each number was checked ----------------------

/**
 * Chlorine-35, for `02-atomic-and-mass-number`.
 *
 * The masses are mass numbers, not isotope masses: it is the arithmetic a Year
 * 10 student is asked to do. The abundances are kept for slot 8 (see
 * `NOT_YET_WRITTEN`), which is the figure that needs them.
 *
 * **The abundances are rounded, and that is the decision** — open question 2 in
 * §16 of the redesign brief. The measured figures are 75.76% and 24.24% (IUPAC
 * representative isotopic composition); the sheet's prose says "about
 * three-quarters" and "three times as common", both of which are 75 / 25, and
 * 75 / 25 makes the weighted average come out at exactly the 35.5 both sheets
 * and the VCAA data book use. Real isotope masses against real abundances give
 * 35.45, the standard atomic weight `src/core-engine/data/elements.ts` carries.
 */
const CHLORINE = {
  protons: 17,
  lightMassNumber: 35,
  heavyMassNumber: 37,
  lightAbundance: 0.75,
  measured: '75.8% and 24.2%',
  relativeAtomicMass: 35.5,
};

/**
 * The pair that shows the table is ordered by protons and not by mass.
 *
 * Checked against `src/core-engine/data/elements.ts` — Te is Z 52 at 127.60,
 * I is Z 53 at 126.90 — and against §12.5 of the redesign brief, which states
 * the same four numbers. The masses are printed from the strings table, in
 * each locale's own decimal format, and checked against these.
 */
const ORDER_PAIR = [
  { symbol: 'Te', atomicNumber: 52, mass: 127.6, keys: ['telluriumName', 'telluriumMass', 'telluriumRank'] },
  { symbol: 'I', atomicNumber: 53, mass: 126.9, keys: ['iodineName', 'iodineMass', 'iodineRank'] },
] as const;

/**
 * The two isotopes `07-decay-and-made-elements` names, and their half-lives.
 *
 * Carbon-14 and uranium-238 rather than any other pair: the Victorian
 * Curriculum elaboration for VC2S10U06 names these two specifically. Both
 * numbers are the ones the sheet's own prose and `formulaExamples` already
 * give — "about 5730 years" and "about 4.5 billion years". The sentences are
 * in the strings table; the numbers each one has to contain are here.
 */
const HALF_LIVES = [
  { key: 'carbon', numbers: [14, 5730] },
  { key: 'uranium', numbers: [238, 4.5] },
] as const;

/**
 * Sodium, for `05-energy-levels`.
 *
 * 2, 8, 1 is what the atomic-structure sheet's own "first twenty elements"
 * table gives for sodium. 11 protons is its atomic number; 12 neutrons is
 * sodium-23, its only stable isotope, so 23 − 11.
 */
const SODIUM = { levels: [2, 8, 1], protons: 11, neutrons: 12 };

/**
 * Hydrogen's three isotopes, for `03-isotopes-of-hydrogen`.
 *
 * One electron each, one proton each, and 0, 1, 2 neutrons. The names are the
 * mass-number form the rest of the sheet uses rather than protium / deuterium
 * / tritium, which neither sheet introduces.
 */
const HYDROGEN_ISOTOPES = [
  { neutrons: 0, countKey: null },
  { neutrons: 1, countKey: 'oneNeutron' },
  { neutrons: 2, countKey: 'twoNeutrons' },
] as const;

/**
 * How much smaller a nucleus really is than its atom's width.
 *
 * Every figure here that puts a nucleus inside an atom says it, which
 * `docs/CHEAT_SHEET_IMAGES.md` requires. Written out in each locale's strings
 * (`1/100,000`, `1/100 000`, …) and checked against this.
 */
const SCALE = 100000;

// --- Type ------------------------------------------------------------------

/**
 * The size of every label, in the 640-wide coordinate space.
 *
 * The page draws a 640-wide diagram 512 CSS px wide, so 17.5 units is 14 CSS
 * px — `text-sm`, the size of the paragraph directly above the diagram — and
 * it is drawn at weight 400 like that paragraph. The contrast that used to
 * need bold large text now comes from the per-theme `--diagram-*` colours.
 */
const BODY = 17.5;

/**
 * Monospace, for a worked sum whose columns matter. Everything else inherits
 * the page's own font — DM Sans, or Manrope on a Russian page — which only
 * works because the SVG is inline; an `<img>` could not see it.
 */
const MONO = "ui-monospace, 'Cascadia Mono', Menlo, Consolas, monospace";

/**
 * The colours, as the CSS custom properties `src/app/globals.css` defines for
 * both themes. The measured ratios are next to the values there;
 * `src/lib/cheat-sheet-diagrams.test.ts` re-measures them and fails if a
 * token is used here but not defined in both themes.
 */
const TOKEN = {
  /** Labels, leaders, frames, axes. Text: 4.5:1 in both themes. */
  ink: 'var(--diagram-ink)',
  /** Rules and guide lines; also secondary text. Text: 4.5:1. */
  inkMuted: 'var(--diagram-ink-muted)',
  /** A proton, and the atomic number that counts them. Text: 4.5:1. */
  proton: 'var(--diagram-proton)',
  /** A neutron's outline. Graphic: 3:1. */
  neutron: 'var(--diagram-neutron)',
  /** An electron, its band, and the label naming them. Text: 4.5:1. */
  electron: 'var(--diagram-electron)',
  /** A plotted line. Graphic: 3:1. */
  accent: 'var(--diagram-accent)',
} as const;

type Token = (typeof TOKEN)[keyof typeof TOKEN];

// --- Small helpers ---------------------------------------------------------

/** One fixed decimal place on every computed coordinate, so nothing churns. */
function n(value: number): number {
  return Number(value.toFixed(1));
}

/** Two fixed places, for opacities, where one is a visible step. */
function alpha(value: number): number {
  return Number(value.toFixed(2));
}

/** XML-escapes text content. Nothing here needs more than these three. */
function esc(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** A `style` attribute painting with theme tokens. */
function paint(fill: Token | 'none', stroke?: Token): string {
  const parts = [`fill:${fill}`];
  if (stroke) parts.push(`stroke:${stroke}`);
  return `style="${parts.join(';')}"`;
}

/**
 * A fixed-seed integer PRNG (mulberry32).
 *
 * Every scattered mark in these drawings comes from here. It is all
 * `Math.imul` and bit operations on a 32-bit integer, so the sequence is
 * identical on every platform and every Node version — which is the only
 * reason a diagram can be both irregular, as the pedagogy requires, and
 * byte-stable, as the repository requires. Each drawing seeds its own so that
 * adding one cannot shift another, and the seed does not depend on the locale,
 * so the six drawings of one slot differ in their words and nothing else.
 */
function seeded(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// --- How wide a label is ---------------------------------------------------

/**
 * Advance widths in em, for DM Sans at weight 400, grouped by shape.
 *
 * An estimate, not a measurement: the script has no font to measure with, and
 * the page's font is only known in the browser. On 2026-09-25 every label on
 * the page was measured with `getComputedTextLength()`, in DM Sans (/en) and
 * Manrope (/ru), and against those 132 the estimate — with `SAFETY` — was
 * never under, with a median of 9% over; it overshoots most on large bold
 * digits and capitals. That is enough to catch the failure that matters, a
 * translation half as long again as the room it was drawn for. Accents are
 * stripped first, so `é` measures as `e`.
 */
const ADVANCE_GROUPS: [string, number][] = [
  [' ', 0.27],
  ['.,:;\'’!|', 0.25],
  ['iljı', 0.25],
  ['I', 0.29],
  ['frt', 0.36],
  ['()[]/', 0.36],
  ['-‐', 0.4],
  ['szcJ', 0.5],
  ['0123456789', 0.58],
  ['=+−×<>–', 0.6],
  ['mw', 0.8],
  ['MW%—', 0.9],
  ['ßkvxy', 0.52],
  // Cyrillic, set in Manrope on a Russian page; the locale factor below adds
  // Manrope's extra width.
  ['жшщюыфмЖШЩЮЫФМ', 0.8],
];
const ADVANCE = new Map<string, number>();
for (const [chars, width] of ADVANCE_GROUPS) {
  for (const char of chars) ADVANCE.set(char, width);
}

function advance(char: string): number {
  const known = ADVANCE.get(char);
  if (known !== undefined) return known;
  if (/[a-zа-яё]/.test(char)) return 0.56;
  if (/[A-ZА-ЯЁ]/.test(char)) return 0.68;
  return 0.6;
}

/** Rounds the estimate up, so a label it passes really fits. */
const SAFETY = 1.04;

/** Manrope, the Russian page font, is wider than DM Sans. */
const LOCALE_WIDTH: Partial<Record<Locale, number>> = { ru: 1.06 };

function estimateWidth(
  text: string,
  size: number,
  { bold, mono, locale }: { bold?: boolean; mono?: boolean; locale: Locale },
): number {
  const chars = Array.from(text.normalize('NFD').replace(/\p{M}/gu, ''));
  const ems = mono ? chars.length * 0.6 : chars.reduce((sum, char) => sum + advance(char), 0);
  return ems * size * SAFETY * (bold ? 1.06 : 1) * (mono ? 1 : (LOCALE_WIDTH[locale] ?? 1));
}

// --- Numbers inside strings ------------------------------------------------

/** The no-break space README §4 puts before `%`, and its narrow form. */
const NBSP = String.fromCharCode(0xa0);
const NNBSP = String.fromCharCode(0x202f);

/** Thousands and decimal separators, per locale, for reading a number back. */
const SEPARATORS: Record<Locale, { thousands: string[]; decimal: string }> = {
  en: { thousands: [','], decimal: '.' },
  de: { thousands: ['.', ' ', NBSP, NNBSP], decimal: ',' },
  fr: { thousands: [' ', NBSP, NNBSP], decimal: ',' },
  es: { thousands: ['.', ' ', NBSP, NNBSP], decimal: ',' },
  it: { thousands: ['.', ' ', NBSP, NNBSP], decimal: ',' },
  ru: { thousands: [' ', NBSP, NNBSP], decimal: ',' },
};

const NUMBER_TOKEN = new RegExp(`\\d+(?:[.,${NBSP}${NNBSP} ]\\d+)*`, 'g');

/** Every number written in `text`, read with `locale`'s separators. */
function numbersIn(text: string, locale: Locale): number[] {
  const { thousands, decimal } = SEPARATORS[locale];
  return (text.match(NUMBER_TOKEN) ?? []).map((token) => {
    let plain = token;
    for (const separator of thousands) plain = plain.split(separator).join('');
    return Number(plain.replace(decimal, '.'));
  });
}

// --- Drawing context -------------------------------------------------------

/** Words for a label. Only `t()`, `whole()` and `symbol()` make one. */
interface Words {
  readonly source: string;
  readonly text: string;
}

interface LabelOptions {
  /** The width, in units, this label is given. The run fails past it. */
  room: number;
  /** Default `start`, as in SVG. */
  anchor?: 'start' | 'middle' | 'end';
  fill?: Token;
  mono?: boolean;
  /** Centre the glyphs on `y` rather than sitting them on it. */
  central?: boolean;
  /** Degrees anticlockwise about `(x, y)`, for an axis label. */
  rotate?: number;
  /**
   * Makes this label part of the slot's one focal item, which alone may be
   * larger than `BODY` or bold. `item` names it; a second name fails the run.
   */
  focal?: { item: string; size: number; bold?: boolean };
}

interface Fit {
  source: string;
  width: number;
  room: number;
}

interface Pen {
  locale: Locale;
  /** A string from this slot's table, with `{name}` filled and numbers checked. */
  t: (key: string, options?: { values?: Record<string, number>; numbers?: readonly number[] }) => Words;
  /** A whole number drawn on its own, which is the same in every locale. */
  whole: (value: number) => Words;
  /** An element symbol, which no locale changes. */
  symbol: (value: string) => Words;
  label: (x: number, y: number, words: Words, options: LabelOptions) => string;
  /** An id unique on the page, derived from the slot's name. */
  id: (name: string) => string;
}

/** Whole numbers under 1000 have no separator to localise. */
function localeFreeWhole(value: number, where: string): string {
  if (!Number.isInteger(value) || value < 0 || value > 999) {
    throw new Error(
      `${where}: ${value} is not a whole number under 1000, so how it is written ` +
        "depends on the locale. Write it into each locale's string instead, and " +
        'check it with `numbers`.',
    );
  }
  return String(value);
}

function createPen(slot: Slot, locale: Locale, fits: Fit[], focalItems: Set<string>): Pen {
  const table = DIAGRAM_STRINGS[slot.key];
  const strings = table[locale];
  const english = table.en;

  const where = (source: string) => `${slot.key} [${locale}] ${source}`;

  return {
    locale,

    t(key, { values = {}, numbers = [] } = {}) {
      const raw = strings[key];
      if (raw === undefined) throw new Error(`${where(key)}: no such string.`);
      const text = raw.replace(/\{(\w+)\}/g, (_, name: string) => {
        if (!(name in values)) throw new Error(`${where(key)}: nothing fills {${name}}.`);
        return localeFreeWhole(values[name], where(key));
      });
      for (const name of Object.keys(values)) {
        if (!raw.includes(`{${name}}`)) {
          throw new Error(`${where(key)}: the string has lost its {${name}} placeholder.`);
        }
      }
      // An untranslated copy of the English is read as English.
      const readAs: Locale = raw === english[key] ? 'en' : locale;
      const found = numbersIn(text, readAs);
      for (const expected of numbers) {
        if (!found.some((value) => Math.abs(value - expected) < 1e-9)) {
          throw new Error(
            `${where(key)}: "${text}" should contain ${expected}, written the ${readAs} way; ` +
              `it reads as ${found.join(', ') || 'no number at all'}.`,
          );
        }
      }
      return { source: key, text };
    },

    whole(value) {
      const text = localeFreeWhole(value, where(`whole(${value})`));
      return { source: text, text };
    },

    symbol(value) {
      if (!/^[A-Z][a-z]?$/.test(value)) throw new Error(`${where(value)}: not an element symbol.`);
      return { source: value, text: value };
    },

    label(x, y, words, options) {
      const { room, anchor, fill, mono, central, rotate, focal } = options;
      const size = focal ? focal.size : BODY;
      const bold = focal?.bold ?? false;
      if (focal) {
        if (size < BODY) {
          throw new Error(`${where(words.source)}: focal text at ${size}, below the ${BODY} body size.`);
        }
        focalItems.add(focal.item);
        if (focalItems.size > 1) {
          throw new Error(
            `${slot.key}: more than one focal item (${[...focalItems].join(', ')}). ` +
              'Only one thing in a diagram may be large or bold; everything else is a label.',
          );
        }
      }

      const width = estimateWidth(words.text, size, { bold, mono, locale });
      fits.push({ source: `${locale} ${words.source}`, width, room });
      if (width > room) {
        throw new Error(
          `${where(words.source)}: "${words.text}" is about ${Math.round(width)} units wide and ` +
            `has ${room}. Re-flow or move it — docs/i18n/README.md §3a — before shortening a word.`,
        );
      }
      if (!rotate) {
        const left = anchor === 'middle' ? x - width / 2 : anchor === 'end' ? x - width : x;
        if (left < 0 || left + width > slot.width) {
          throw new Error(
            `${where(words.source)}: "${words.text}" runs off the ${slot.width}-wide canvas ` +
              `(about ${Math.round(left)} to ${Math.round(left + width)}).`,
          );
        }
      }

      const attributes = [
        `x="${n(x)}"`,
        `y="${n(y)}"`,
        anchor ? `text-anchor="${anchor}"` : '',
        central ? 'dominant-baseline="central"' : '',
        rotate ? `transform="rotate(${n(-rotate)} ${n(x)} ${n(y)})"` : '',
        mono ? `font-family="${MONO}"` : '',
        `font-size="${size}"`,
        bold ? 'font-weight="700"' : '',
        paint(fill ?? TOKEN.ink),
      ].filter(Boolean);
      return `<text ${attributes.join(' ')}>${esc(words.text)}</text>`;
    },

    id(name) {
      return `${slot.id}-${name}`;
    },
  };
}

// --- Shapes ----------------------------------------------------------------

/** A straight leader from a label to the thing it names. */
function leader(x1: number, y1: number, x2: number, y2: number): string {
  return (
    `<path d="M ${n(x1)} ${n(y1)} L ${n(x2)} ${n(y2)}" ${paint('none', TOKEN.ink)} ` +
    'stroke-width="2" stroke-linecap="round" />'
  );
}

/** A horizontal rule between parts of a figure. */
function rule(x1: number, x2: number, y: number): string {
  return (
    `<path d="M ${n(x1)} ${n(y)} L ${n(x2)} ${n(y)}" ${paint('none', TOKEN.inkMuted)} ` +
    'stroke-width="2" stroke-linecap="round" />'
  );
}

/** A filled circle: a proton, or one electron's mark. */
function dot(x: number, y: number, radius: number, fill: Token, opacity?: number): string {
  const fade = opacity === undefined ? '' : ` fill-opacity="${alpha(opacity)}"`;
  return `<circle cx="${n(x)}" cy="${n(y)}" r="${n(radius)}" ${paint(fill)}${fade} />`;
}

/** A hollow circle: a neutron. Fill against outline is the non-colour half of the pair. */
function ring(x: number, y: number, radius: number, stroke: Token, width = 3): string {
  return (
    `<circle cx="${n(x)}" cy="${n(y)}" r="${n(radius)}" ${paint('none', stroke)} ` +
    `stroke-width="${width}" />`
  );
}

/** A rounded frame, for the boxed asides. */
function frame(x: number, y: number, width: number, height: number): string {
  return (
    `<rect x="${n(x)}" y="${n(y)}" width="${n(width)}" height="${n(height)}" rx="16" ` +
    `${paint('none', TOKEN.ink)} stroke-width="2" />`
  );
}

/**
 * A band an electron is somewhere in, with no crisp edge anywhere on it.
 *
 * Nine overlapping strokes on a bell profile, not one wide stroke. A single
 * stroke has a hard inner and a hard outer edge, and a hard edge is exactly
 * what turns "a region where the electron probably is" back into the circular
 * track these figures exist to avoid — the first draft of `05-energy-levels`
 * looked like a solar system for precisely that reason. At five strokes the
 * individual rings still showed on the dark theme.
 */
function softBand(cx: number, cy: number, radius: number, halfWidth: number): string[] {
  const rings = 9;
  const spread = halfWidth * 0.8;
  return Array.from({ length: rings }, (_, index) => {
    const offset = ((index - (rings - 1) / 2) / ((rings - 1) / 2)) * spread;
    const opacity = 0.05 + 0.13 * (1 - Math.abs(offset) / spread);
    return (
      `<circle cx="${n(cx)}" cy="${n(cy)}" r="${n(radius + offset)}" ${paint('none', TOKEN.electron)} ` +
      `stroke-width="${n((halfWidth * 2 * 1.6) / rings)}" stroke-opacity="${alpha(opacity)}" />`
    );
  });
}

/** Screen coordinates from a bearing in degrees: 0 is right, 90 is up. */
function at(cx: number, cy: number, bearing: number, radius: number): [number, number] {
  const t = (bearing * Math.PI) / 180;
  return [cx + radius * Math.cos(t), cy - radius * Math.sin(t)];
}

/**
 * A cluster of nucleons, filled for protons and hollow for neutrons.
 *
 * `places` is a fixed hand-placed packing rather than anything computed, so
 * that a nucleus of three looks like a nucleus and not like three circles a
 * loop happened to leave somewhere. Protons come first in the list.
 */
function nucleons(
  cx: number,
  cy: number,
  radius: number,
  places: readonly (readonly [number, number])[],
  protonCount: number,
): string[] {
  return places.map(([dx, dy], index) =>
    index < protonCount
      ? dot(cx + dx, cy + dy, radius, TOKEN.proton)
      : ring(cx + dx, cy + dy, radius, TOKEN.neutron, 3),
  );
}

interface Slot {
  /** The slot's name, and the prefix on every id inside it. */
  id: string;
  /** The sheet's slug. */
  sheet: string;
  /** `<sheet>/<id>`: the key in the strings table, the data and the output. */
  key: string;
  width: number;
  height: number;
  draw: (pen: Pen) => string[];
}

// --- 01. Inside an atom ----------------------------------------------------

/**
 * A nucleus, a probability cloud, and the admission that neither is to scale.
 *
 * The single diagram on this site most likely to teach the misconception it
 * exists to prevent. So the electrons are a stipple and nothing else: a few
 * hundred marks whose density falls off with distance, no ring, no track, and
 * deliberately **no outer boundary** — an edge would be a claim that the atom
 * stops somewhere, which is the next misconception along.
 *
 * The nucleons are drawn one by one because telling them apart is what the
 * section is about, and they are distinguished three ways at once: filled
 * against hollow, red against grey, and a key that spells both out. Fill is the
 * one of the three that survives a red-green colour deficiency.
 *
 * Seven nucleons, three of them protons — lithium-7, a real and stable nuclide.
 * Nothing in the picture names it, but a student who counts should not find a
 * nucleus that could not exist.
 *
 * The scale note is not a disclaimer bolted on afterwards; it is the reason the
 * picture is allowed to exist. Here the nucleus is about a third of the cloud's
 * radius. At 1/100,000 of the atom's width it would be 0.0024 units across in
 * this coordinate space — thinner than any line the drawing can make.
 */
function drawInsideAnAtom(pen: Pen): string[] {
  const { t, label } = pen;
  const cx = 168;
  const cy = 146;
  const cloud = 118;
  /** Marks start outside the nucleus, so the two never overlap. */
  const clear = 50;
  const rng = seeded(101);

  const marks: string[] = [];
  for (let i = 0; i < 280; i += 1) {
    const radius = clear + (cloud - clear) * Math.pow(rng(), 0.6);
    const [x, y] = at(cx, cy, rng() * 360, radius);
    // Thins towards the edge rather than stopping at one, for the same reason
    // there is no boundary circle. The floor is 0.22 and not lower: below that
    // the outermost marks disappear entirely on the dark theme, and a cloud
    // that ends abruptly is the edge this is avoiding, drawn by accident.
    const fade = 1 - Math.pow((radius - clear) / (cloud - clear), 1.8);
    marks.push(
      `<circle cx="${n(x)}" cy="${n(y)}" r="3.4" fill-opacity="${alpha(0.22 + 0.58 * fade)}" />`,
    );
  }

  /** Two, three, two — a compact cluster rather than a ring of seven. */
  const places = [
    [-11, -20],
    [11, -20],
    [-22, 0],
    [0, 0],
    [22, 0],
    [-11, 20],
    [11, 20],
  ] as const;

  /** The column to the right of the cloud: 336 to a 16-unit margin. */
  const column = 288;

  return [
    `<g ${paint(TOKEN.electron)}>${marks.join('')}</g>`,
    ...nucleons(cx, cy, 12, places, 3),

    label(336, 66, t('electrons'), { room: column, fill: TOKEN.electron }),
    label(336, 94, t('electronsLine1'), { room: column }),
    label(336, 120, t('electronsLine2'), { room: column }),
    label(336, 146, t('electronsLine3'), { room: column }),

    label(336, 190, t('nucleus'), { room: column, fill: TOKEN.proton }),
    label(336, 218, t('nucleusLine1'), { room: column }),
    label(336, 244, t('nucleusLine2'), { room: column }),

    dot(118, 290, 13, TOKEN.proton),
    // Up to the neutron's ring, which starts at 325.
    label(142, 290, t('keyProton'), { room: 170, central: true }),
    ring(338, 290, 13, TOKEN.neutron),
    label(362, 290, t('keyNeutron'), { room: 262, central: true }),

    label(320, 326, t('scaleLine1'), { room: 600, anchor: 'middle' }),
    label(320, 350, t('scaleLine2', { numbers: [SCALE] }), { room: 600, anchor: 'middle' }),
  ];
}

// --- 02. Atomic number and mass number -------------------------------------

/**
 * The nuclide symbol, taken apart.
 *
 * The two numbers sit where the notation puts them — mass number above atomic
 * number, both to the left of the symbol — because the point of the figure is
 * that a student can read the notation when they meet it in an exam. §1.6 of
 * the redesign brief is about exactly that mismatch. The notation is the focal
 * item: the only large text in the figure.
 *
 * The atomic number is in the proton colour and the subtraction is worked out
 * rather than asserted, so "mass number minus atomic number" is visible as an
 * operation and not as a fact to memorise.
 */
function drawAtomicAndMassNumber(pen: Pen): string[] {
  const { t, whole, symbol, label } = pen;
  const mass = CHLORINE.lightMassNumber;
  const atomic = CHLORINE.protons;
  const neutrons = mass - atomic;
  const notation = { item: 'nuclide notation', bold: true };
  /** The column the two annotations share: 340 to a 16-unit margin. */
  const column = 284;

  return [
    label(320, 34, t('title'), { room: 600, anchor: 'middle' }),

    // The symbol sits left, both annotations stack on the right, and the
    // subtraction runs across the bottom. The obvious arrangement — one label
    // up and one down, with the sum boxed beside the symbol — puts the lower
    // leader through either the "Cl" or the box's corner, whichever way it is
    // routed. Both leaders approaching from the same side has neither problem
    // and reads in the order a student asks the questions in.
    label(188, 120, whole(mass), {
      room: 120,
      anchor: 'end',
      central: true,
      focal: { ...notation, size: 42 },
    }),
    label(188, 172, whole(atomic), {
      room: 120,
      anchor: 'end',
      central: true,
      fill: TOKEN.proton,
      focal: { ...notation, size: 42 },
    }),
    label(196, 146, symbol('Cl'), { room: 130, central: true, focal: { ...notation, size: 84 } }),

    leader(194, 112, 326, 96),
    label(340, 88, t('massNumber', { values: { mass } }), { room: column }),
    label(340, 116, t('massNumberMeaning'), { room: column }),

    leader(194, 180, 326, 196),
    label(340, 190, t('atomicNumber', { values: { atomic } }), { room: column, fill: TOKEN.proton }),
    label(340, 218, t('atomicLine1', { values: { atomic } }), { room: column }),
    label(340, 244, t('atomicLine2'), { room: column }),

    rule(150, 490, 268),
    label(320, 300, t('subtraction', { values: { mass, atomic, neutrons } }), {
      room: 600,
      anchor: 'middle',
      mono: true,
    }),
  ];
}

// --- 03. The three isotopes of hydrogen ------------------------------------

/**
 * One proton every time, and a different number of neutrons each time.
 *
 * Hydrogen is the only element whose isotopes can be drawn honestly at this
 * size — one proton, one electron — which is why the section uses it. The
 * electron is a single mark inside a soft band rather than a dot on a circle,
 * and the three marks sit at three unrelated angles so that no reader can take
 * the band for a track with a position on it.
 *
 * The key line at the top names fill and position rather than colour, so it
 * still works for a reader who cannot separate the red from the grey.
 */
function drawIsotopesOfHydrogen(pen: Pen): string[] {
  const { t, label } = pen;
  const centres = [107, 320, 533];
  /** Each atom's column: the 213 between centres, less a margin. */
  const column = 200;
  const cy = 138;
  const band = 44;
  /** One bearing per atom, unrelated to each other on purpose. */
  const electronBearing = [58, 143, 291];
  /** And one radius each, off the middle of the band, for the same reason. */
  const electronRadius = [band - 6, band + 5, band - 3];
  const parts: string[] = [
    label(320, 30, t('title'), { room: 600, anchor: 'middle' }),
    label(320, 58, t('key'), { room: 600, anchor: 'middle' }),
  ];

  HYDROGEN_ISOTOPES.forEach((isotope, index) => {
    const cx = centres[index];

    // A soft band with no edge, and the one electron sitting off the middle of
    // it: a region the electron is likely to be in, which is the most a picture
    // this size can honestly say.
    parts.push(...softBand(cx, cy, band, 11));
    const [ex, ey] = at(cx, cy, electronBearing[index], electronRadius[index]);
    parts.push(dot(ex, ey, 6.5, TOKEN.electron));

    // Proton first, then the neutrons around it.
    const places =
      isotope.neutrons === 0
        ? ([[0, 0]] as const)
        : isotope.neutrons === 1
          ? ([
              [-12, 0],
              [12, 0],
            ] as const)
          : ([
              [0, -12],
              [-12, 9],
              [12, 9],
            ] as const);
    parts.push(...nucleons(cx, cy, 12, places, 1));

    parts.push(
      label(cx, 218, t('isotopeName', { values: { mass: 1 + isotope.neutrons } }), {
        room: column,
        anchor: 'middle',
      }),
      label(cx, 246, t('oneProton', { numbers: [1] }), { room: column, anchor: 'middle' }),
    );
    if (isotope.countKey) {
      parts.push(
        label(cx, 270, t(isotope.countKey, { numbers: [isotope.neutrons] }), {
          room: column,
          anchor: 'middle',
        }),
      );
    }
  });

  return parts;
}

// --- 05. Sodium's energy levels --------------------------------------------

/**
 * The one Bohr-style figure on either sheet, and the only one allowed.
 *
 * `docs/CHEAT_SHEET_IMAGES.md` permits a ring diagram in exactly one place —
 * where it is being used to *count* electrons per level rather than to say
 * where they are — and only if the picture itself says so. Hence the two lines
 * across the bottom, which are not optional and are the first thing to keep if
 * this figure is ever redrawn.
 *
 * Three things keep it from becoming a solar system. The levels are wide faint
 * bands, not lines. The electron marks sit at irregular angles and at slightly
 * different radii within their band, so no two are ever symmetric about
 * anything. And the bands are unlabelled in the drawing itself: the counts are
 * read off the list beside it, which is the operation the figure is for. The
 * arrangement `2, 8, 1` is the focal item.
 *
 * The periodic table that §12.1 originally put beside the sodium atom is gone —
 * the interactive widget does that job now, and a static table at this size was
 * unreadable anyway.
 */
function drawEnergyLevels(pen: Pen): string[] {
  const { t, label } = pen;
  const cx = 150;
  const cy = 110;
  const radii = [30, 55, 80];
  const rng = seeded(508);
  const parts: string[] = [];
  /** The list beside the atom: 296 to a 16-unit margin. */
  const column = 328;

  radii.forEach((radius, level) => {
    parts.push(...softBand(cx, cy, radius, 10));
    const count = SODIUM.levels[level];
    for (let i = 0; i < count; i += 1) {
      // A base angle, then pushed off it far enough that the arrangement never
      // reads as evenly spaced. The single outer electron gets a bearing that
      // is not on any axis.
      const base = count === 1 ? 62 : (360 * i) / count;
      const bearing = base + (rng() - 0.5) * (count === 1 ? 0 : 320 / count);
      const [x, y] = at(cx, cy, bearing, radius + (rng() - 0.5) * 10);
      parts.push(dot(x, y, 6, TOKEN.electron));
    }
  });

  const [first, second, third] = SODIUM.levels;
  parts.push(
    dot(cx, cy, 17, TOKEN.proton),
    ring(cx, cy, 17, TOKEN.ink, 2),
    // Under the atom, and clear of the list at 296.
    label(cx, 230, t('nucleusCounts', { values: { protons: SODIUM.protons, neutrons: SODIUM.neutrons } }), {
      room: 272,
      anchor: 'middle',
    }),

    label(296, 52, t('arrangement', { values: { first, second, third } }), {
      room: column,
      focal: { item: 'arrangement', size: 46, bold: true },
    }),
    label(296, 82, t('outerLast'), { room: column }),
    ...SODIUM.levels.map((count, level) =>
      label(296, 126 + level * 30, t(`level${level + 1}`, { values: { count }, numbers: [level + 1] }), {
        room: column,
      }),
    ),

    // The rule is not decoration. Without it the nucleus label above reads as
    // the first line of the caveat below, which is how the first draft looked.
    rule(40, 600, 248),
    label(320, 270, t('countNote'), { room: 600, anchor: 'middle' }),
    label(320, 292, t('scaleNote', { numbers: [SCALE] }), { room: 600, anchor: 'middle' }),
  );

  return parts;
}

// --- 06. Ordered by atomic number ------------------------------------------

/**
 * Tellurium and iodine, the pair that settled the argument.
 *
 * Two table cells side by side, laid out the way a real cell is, so that the
 * figure doubles as practice at reading one. Tellurium is on the left because
 * that is where the table puts it, and the two lines underneath say why in the
 * order a reader will ask: heavier, and yet first. The two symbols are the
 * focal item.
 *
 * The atomic numbers are in the proton colour, and the line under the heading
 * says in words what that number counts, so the colour is never carrying the
 * meaning alone.
 */
function drawOrderedByAtomicNumber(pen: Pen): string[] {
  const { t, whole, symbol, label } = pen;
  const cellWidth = 190;
  const cellHeight = 146;
  const lefts = [108, 342];
  /** Inside a cell, less an 8-unit margin each side. */
  const inCell = cellWidth - 16;
  const parts: string[] = [
    label(320, 30, t('title'), { room: 600, anchor: 'middle' }),
    label(320, 58, t('subtitle'), { room: 600, anchor: 'middle' }),
  ];

  ORDER_PAIR.forEach((element, index) => {
    const left = lefts[index];
    const mid = left + cellWidth / 2;
    const [nameKey, massKey, rankKey] = element.keys;
    parts.push(
      frame(left, 76, cellWidth, cellHeight),
      label(left + 16, 108, whole(element.atomicNumber), { room: 80, fill: TOKEN.proton }),
      label(mid, 154, symbol(element.symbol), {
        room: inCell,
        anchor: 'middle',
        focal: { item: 'element symbols', size: 54, bold: true },
      }),
      label(mid, 186, t(nameKey), { room: inCell, anchor: 'middle' }),
      label(mid, 210, t(massKey, { numbers: [element.mass] }), { room: inCell, anchor: 'middle', mono: true }),
      // Under the cell, where the gap between the two cells is room too.
      label(mid, 250, t(rankKey), { room: 226, anchor: 'middle' }),
    );
  });

  parts.push(label(320, 282, t('conclusion'), { room: 600, anchor: 'middle' }));

  return parts;
}

// --- 07. Half-life ---------------------------------------------------------

/**
 * The decay curve, and only the decay curve.
 *
 * §12.1 of the redesign brief splits this slot in two and renames it to
 * `07-half-life`. The rename did not happen: the synthetic elements that were
 * the other half of the old specification have moved to the periodic-table
 * widget's "natural or made" view mode, and the name is the key the data, the
 * strings and the page all share. So the name stays and the content is the
 * curve alone.
 *
 * The curve is a sampled exponential rather than four straight segments,
 * because the point a student has to take away is that decay does not stop —
 * it is the same fraction again over the next interval, not the same amount.
 * It is drawn past the third half-life for the same reason.
 */
function drawHalfLife(pen: Pen): string[] {
  const { t, whole, label } = pen;
  const originX = 90;
  const step = 138;
  const baseline = 198;
  const plotHeight = 140;
  /** Drawn past three half-lives, so the curve is not seen to stop. */
  const lastTime = 3.3;
  const x = (time: number) => originX + step * time;
  const y = (fraction: number) => baseline - plotHeight * fraction;

  const samples: string[] = [];
  const sampleCount = 66;
  for (let i = 0; i <= sampleCount; i += 1) {
    const time = (lastTime * i) / sampleCount;
    samples.push(`${n(x(time))},${n(y(Math.pow(0.5, time)))}`);
  }

  const parts: string[] = [
    label(320, 32, t('title'), { room: 600, anchor: 'middle' }),

    `<path d="M ${originX} 48 L ${originX} ${baseline} L ${n(x(lastTime) + 22)} ${baseline}" ` +
      `${paint('none', TOKEN.ink)} stroke-width="2.5" stroke-linecap="round" ` +
      'stroke-linejoin="round" />',
    // Along the axis, whose length is its room.
    label(66, 123, t('axisAmount'), { room: 150, anchor: 'middle', rotate: 90 }),

    `<polyline points="${samples.join(' ')}" ${paint('none', TOKEN.accent)} ` +
      'stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />',
  ];

  [0, 1, 2, 3].forEach((halfLives) => {
    const fraction = Math.pow(0.5, halfLives);
    const px = x(halfLives);
    const py = y(fraction);
    if (halfLives > 0) {
      parts.push(
        `<path d="M ${n(px)} ${n(py)} L ${n(px)} ${baseline}" ${paint('none', TOKEN.inkMuted)} ` +
          'stroke-width="2" stroke-dasharray="7 6" />',
      );
    }
    parts.push(
      dot(px, py, 6, TOKEN.ink),
      // Percentages, because the axis is a fraction of what there was and a
      // fraction is what the section's takeaway is written in. The string is
      // the locale's own (`12,5 %`); the number in it is checked against the
      // curve.
      //
      // Lifted clear of the curve except at the start. By the second half-life
      // the curve is shallow enough to run straight through a label placed
      // level with its own point, which is how the first draft read; at time
      // zero it is steep, so level is the only placement that does not collide
      // with the heading above. Room runs to the next point, less a margin.
      label(px + 15, halfLives === 0 ? py : py - 19, t(`percent${halfLives}`, { numbers: [fraction * 100] }), {
        room: halfLives === 3 ? 100 : step - 30,
        central: true,
      }),
      label(px, 226, whole(halfLives), { room: 40, anchor: 'middle' }),
    );
  });

  parts.push(
    label(536, 226, t('axisTime'), { room: 96 }),
    label(320, 250, t('eighth', { numbers: [3] }), { room: 600, anchor: 'middle' }),
    frame(50, 262, 540, 52),
    ...HALF_LIVES.map((line, index) =>
      label(320, 284 + index * 23, t(line.key, { numbers: line.numbers }), {
        room: 520,
        anchor: 'middle',
      }),
    ),
  );

  return parts;
}

// --- The slots -------------------------------------------------------------

/**
 * Every generated diagram. `key` is what `src/lib/cheat-sheet-data.ts` names in
 * a section's `image.diagram`, and what the strings table is keyed by.
 *
 * What each one shows is described, for a screen reader, by that section's
 * `alt` in `src/lib/cheat-sheet-data.ts` and `imageAlt` in each overlay. The
 * page uses that as the drawing's accessible name, so a change to what a
 * drawing shows is a change to those six sentences too.
 */
const SLOTS: Slot[] = (
  [
    ['atomic-structure', '01-inside-an-atom', 640, 360, drawInsideAnAtom],
    ['atomic-structure', '02-atomic-and-mass-number', 640, 320, drawAtomicAndMassNumber],
    ['isotopes-and-radioactivity', '03-isotopes-of-hydrogen', 640, 280, drawIsotopesOfHydrogen],
    ['atomic-structure', '05-energy-levels', 640, 300, drawEnergyLevels],
    ['atomic-structure', '06-ordered-by-atomic-number', 640, 300, drawOrderedByAtomicNumber],
    ['isotopes-and-radioactivity', '07-decay-and-made-elements', 640, 320, drawHalfLife],
  ] as const
).map(([sheet, id, width, height, draw]) => ({ sheet, id, key: `${sheet}/${id}`, width, height, draw }));

/**
 * Slots 8, 9 and 10 from §12.1 of the redesign brief, which are **not** built
 * here.
 *
 * The sections that would carry them have not been written — they are milestone
 * M5 — and a drawing with no section is an orphan nobody will ever notice is
 * wrong. Their specifications are kept here rather than left in the design doc
 * so that whoever writes those sections has the brief next to the machinery,
 * and so that adding one is adding an entry to `SLOTS`, a drawing function and
 * a strings table.
 *
 * All three are energy-level or comparison figures, so they reuse everything
 * above: `nucleons`, `label`, `frame`, and for 09 and 10 the same soft-band
 * treatment as `drawEnergyLevels`, including its bottom line.
 */
const NOT_YET_WRITTEN: Record<string, string> = {
  'atomic-structure/08-reading-a-table-cell':
    '640×300. One large cell — 17, Cl, Chlorine, 35.45 — with ' +
    'four leader lines out to labels: atomic number is 17 protons and is what ' +
    'makes it chlorine; symbol; name; relative atomic mass, an average over the ' +
    'isotopes, not a mass number and not a whole number. Along the bottom: mass ' +
    'number belongs to one atom, relative atomic mass belongs to the element. ' +
    'The brief calls this the highest-value of the ten. Note the 35.45 here ' +
    'against the rounded 35.5 the sheets use elsewhere — that difference is ' +
    'the point of the figure, ' +
    'and it needs a sentence on the sheet before it ships.',
  'atomic-structure/09-isotope-or-ion':
    '640×340. Two columns. ISOTOPE: Cl-35 to Cl-37, neutrons ' +
    'change, protons stay 17, electrons stay 17, still chlorine and still reacts ' +
    'the same. ION: Cl to Cl−, electrons change, protons stay 17, neutrons stay ' +
    'the same, still chlorine but now charged. Centred on the divider: protons ' +
    'never change, and changing them makes it a different element.',
  'atomic-structure/10-why-groups-form-ions':
    '640×340. Two rows. Sodium 2, 8, 1 loses 1 to give 2, 8 and ' +
    'Na+; group 1 loses 1 to make 1+. Chlorine 2, 8, 7 gains 1 to give 2, 8, 8 ' +
    'and Cl−; group 17 gains 1 to make 1−. A bottom line: group 18 already has a ' +
    'full outer level, so it does neither. Same band treatment as slot 05, and ' +
    'the same "a way to count electrons" line once at the bottom.',
};

// --- Checks ----------------------------------------------------------------

/** The ceiling from `docs/CHEAT_SHEET_IMAGES.md`, per drawing. */
const MAX_BYTES = 200 * 1024;

/**
 * Things that must never appear in a drawing.
 *
 * This markup goes straight into the page, so these are stricter than they
 * were for an `<img>`. A `<style>` block would style the whole page, not the
 * drawing. A literal colour would ignore the theme; every colour is a token.
 * The rest are the house rules — no script, no foreign object, no external
 * reference, no embedded raster — and no `<title>` or `<desc>`, whose English
 * would sit beside the translated accessible name the page gives the drawing.
 */
const FORBIDDEN: { pattern: RegExp; why: string }[] = [
  { pattern: /<style/i, why: 'a <style> block inside inline SVG styles the whole page' },
  { pattern: /prefers-color-scheme/, why: 'the site switches themes with a data-theme attribute' },
  { pattern: /(?:fill|stroke|color)\s*[:=]\s*"?\s*(?:#|rgb|hsl)/i, why: 'a literal colour ignores the theme; use a TOKEN' },
  { pattern: /\b(?:fill|stroke)="/, why: 'paint through paint() and a TOKEN, not an attribute' },
  { pattern: /<script|\bon[a-z]+=/i, why: 'no scripting' },
  { pattern: /<foreignObject/i, why: 'no foreign content' },
  { pattern: /<image\b/i, why: 'no embedded or referenced raster' },
  { pattern: /xlink:href|\bhref=/i, why: 'no external reference' },
  { pattern: /data:/i, why: 'no embedded raster' },
  { pattern: /<title|<desc/i, why: "the page names the drawing, in the reader's language" },
];

const KNOWN_TOKENS = new Set<string>(Object.values(TOKEN));

function assertClean(slot: Slot, locale: Locale, markup: string): void {
  const where = `${slot.key} [${locale}]`;
  for (const { pattern, why } of FORBIDDEN) {
    if (pattern.test(markup)) throw new Error(`${where}: matches ${pattern} — ${why}.`);
  }
  for (const [token] of markup.matchAll(/var\(--[\w-]+\)/g)) {
    if (!KNOWN_TOKENS.has(token)) throw new Error(`${where}: ${token} is not a TOKEN.`);
  }
  // Ids are unique on the page only if every one carries the slot's name.
  const ids = [...markup.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  for (const id of ids) {
    if (!id.startsWith(`${slot.id}-`)) throw new Error(`${where}: id "${id}" is not from pen.id().`);
  }
  if (new Set(ids).size !== ids.length) throw new Error(`${where}: an id is used twice.`);
  for (const [, ref] of markup.matchAll(/url\(#([^)]+)\)/g)) {
    if (!ids.includes(ref)) throw new Error(`${where}: url(#${ref}) points at nothing.`);
  }
  // A rect the size of the canvas would be a baked background, which is a
  // light sticker on the dark theme; the page gives the drawing its surface.
  if (new RegExp(`<rect x="0" y="0" width="${slot.width}" height="${slot.height}"`).test(markup)) {
    throw new Error(`${where}: draws a rect over the whole canvas; the background stays transparent.`);
  }
  const bytes = Buffer.byteLength(markup, 'utf8');
  if (bytes > MAX_BYTES) throw new Error(`${where}: ${bytes} bytes, over the ${MAX_BYTES} ceiling.`);
}

/**
 * Draws the slot in one locale, twice, and fails if the two differ.
 *
 * Cheap, and it is the check that matters: everything here is deterministic by
 * construction, and this is what stops a future edit — a `Date`, an unseeded
 * `Math.random`, an id from a counter — from quietly making the whole set churn
 * on every regeneration.
 */
function drawStable(slot: Slot, locale: Locale, fits: Fit[]): string {
  const draw = (record: Fit[]) => slot.draw(createPen(slot, locale, record, new Set())).join('\n');
  const first = draw(fits);
  if (draw([]) !== first) {
    throw new Error(
      `${slot.key} [${locale}]: drawn twice in one run, it came out differently. Something ` +
        'in the drawing is not deterministic, and every regeneration will churn.',
    );
  }
  return first;
}

/** Every slot has a table, and every locale has exactly the English keys. */
function assertStringsComplete(): void {
  const keys = new Set<string>();
  for (const slot of SLOTS) {
    if (keys.has(slot.key)) throw new Error(`${slot.key}: two slots with one name.`);
    keys.add(slot.key);
  }
  for (const key of Object.keys(DIAGRAM_STRINGS)) {
    if (!keys.has(key)) throw new Error(`Strings for ${key}, which is not a slot.`);
  }
  for (const slot of SLOTS) {
    const table = DIAGRAM_STRINGS[slot.key];
    if (!table?.en) throw new Error(`${slot.key}: no strings table.`);
    const english = Object.keys(table.en);
    for (const locale of LOCALES) {
      if (!table[locale]) throw new Error(`${slot.key}: no ${locale} strings. Nothing falls back to English.`);
      const theirs = Object.keys(table[locale]);
      const missing = english.filter((key) => !theirs.includes(key));
      const extra = theirs.filter((key) => !english.includes(key));
      if (missing.length || extra.length) {
        const problems = [
          missing.length ? `missing ${missing.join(', ')}` : '',
          extra.length ? `not in English: ${extra.join(', ')}` : '',
        ];
        throw new Error(
          `${slot.key} [${locale}]: ${problems.filter(Boolean).join('; ')}. Nothing falls back to English.`,
        );
      }
      for (const [key, value] of Object.entries(table[locale])) {
        if (!value.trim()) throw new Error(`${slot.key} [${locale}] ${key}: empty.`);
      }
    }
  }
}

/**
 * Renders a finished drawing and throws if it will not open.
 *
 * Borrowed from `molecule-images.mts`, where it earned its place by catching a
 * file that was valid text, the right size, and completely blank in a browser.
 * The tokens mean nothing to the renderer, so this proves the markup parses,
 * not what it looks like — screenshots of the page do that.
 */
async function assertRenders(slot: Slot, locale: Locale, markup: string): Promise<void> {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${slot.width} ${slot.height}" ` +
    `width="${slot.width}" height="${slot.height}">${markup}</svg>`;
  try {
    await sharp(Buffer.from(svg)).png().toBuffer();
  } catch (error) {
    throw new Error(`${slot.key} [${locale}]: the markup this script just made does not render. ${error}`);
  }
}

/** How many strings still carry the marker, per locale. */
function countTodos(): Map<string, number> {
  const counts = new Map<string, number>();
  let locale = '';
  for (const line of readFileSync(stringsFile, 'utf8').split('\n')) {
    const header = /^\s{4}([a-z]{2}): \{/.exec(line);
    if (header) locale = header[1];
    if (locale && /^\s{6}\w+: .*\/\/ TODO translate \(task 5\/6\)\s*$/.test(line)) {
      counts.set(locale, (counts.get(locale) ?? 0) + 1);
    }
  }
  return counts;
}

// --- Output ----------------------------------------------------------------

const BANNER =
  '// Generated by scripts/cheat-sheet-diagrams.mts from\n' +
  '// scripts/cheat-sheet-diagram-strings.mts. Do not edit by hand: the next run\n' +
  '// overwrites it. Change the script or the strings instead.\n';

/** A single-quoted TypeScript string, one per line of markup, so a diff reads. */
function quote(line: string): string {
  if (/[\n\r]/.test(line)) throw new Error(`A line of markup contains a line break: ${line}`);
  return `'${line.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
}

function localeModule(locale: Locale, markup: Map<string, string>): string {
  const entries = SLOTS.map((slot) => {
    const lines = markup.get(slot.key)!.split('\n').map((line) => `    ${quote(line)},`);
    return `  '${slot.key}': [\n${lines.join('\n')}\n  ].join('\\n'),`;
  });
  return (
    `${BANNER}//\n` +
    `// The ${locale} markup for every generated diagram: what goes inside its <svg>.\n` +
    '// The page supplies the <svg> itself, its size and its translated accessible\n' +
    '// name. Built from strings in this repository, never from user input, and\n' +
    "// every string in it went through the script's esc().\n\n" +
    "import type { CheatSheetDiagramId } from './index';\n\n" +
    `export const markup: Record<CheatSheetDiagramId, string> = {\n${entries.join('\n')}\n};\n`
  );
}

function indexModule(): string {
  const entries = SLOTS.map(
    (slot) => `  '${slot.key}': { width: ${slot.width}, height: ${slot.height} },`,
  );
  return (
    `${BANNER}//\n` +
    '// Every generated cheat-sheet diagram and its size in drawing units. The page\n' +
    '// draws a 640-unit diagram 512 CSS px wide. The markup is per locale, in the\n' +
    '// sibling modules, loaded by src/lib/cheat-sheet-diagrams.ts.\n\n' +
    `export const CHEAT_SHEET_DIAGRAMS = {\n${entries.join('\n')}\n} as const;\n\n` +
    'export type CheatSheetDiagramId = keyof typeof CHEAT_SHEET_DIAGRAMS;\n'
  );
}

// --- Run -------------------------------------------------------------------

const checkOnly = process.argv.includes('--check');

assertStringsComplete();

const perLocale = new Map<Locale, Map<string, string>>(LOCALES.map((locale) => [locale, new Map()]));
for (const slot of SLOTS) {
  const fits: Fit[] = [];
  let bytes = 0;
  for (const locale of LOCALES) {
    const markup = drawStable(slot, locale, fits);
    assertClean(slot, locale, markup);
    await assertRenders(slot, locale, markup);
    perLocale.get(locale)!.set(slot.key, markup);
    bytes = Math.max(bytes, Buffer.byteLength(markup, 'utf8'));
  }
  const tightest = fits.reduce((worst, fit) => (fit.width / fit.room > worst.width / worst.room ? fit : worst));
  console.log(
    `  ${slot.key}  ${slot.width}×${slot.height}  ${(bytes / 1024).toFixed(1)} KB  ` +
      `tightest label ${Math.round((100 * tightest.width) / tightest.room)}% of its room (${tightest.source})`,
  );
}

const outputs = new Map<string, string>([['index.ts', indexModule()]]);
for (const locale of LOCALES) outputs.set(`${locale}.ts`, localeModule(locale, perLocale.get(locale)!));

const stale: string[] = [];
const written: string[] = [];
mkdirSync(outDir, { recursive: true });
for (const [file, content] of outputs) {
  const path = join(outDir, file);
  let onDisk: string | null = null;
  try {
    // A Windows checkout with core.autocrlf has CRLF on disk and LF in git;
    // either is the same module.
    onDisk = readFileSync(path, 'utf8').replace(/\r\n/g, '\n');
  } catch {
    onDisk = null;
  }
  if (onDisk === content) continue;
  if (checkOnly) {
    stale.push(file);
  } else {
    writeFileSync(path, content, 'utf8');
    written.push(file);
  }
}

const todos = countTodos();
const todoTotal = [...todos.values()].reduce((sum, count) => sum + count, 0);

if (checkOnly && stale.length > 0) {
  console.error(
    `\n${stale.length} module(s) in src/generated/cheat-sheet-diagrams differ from this script:\n  ` +
      `${stale.join('\n  ')}\nRun \`npm run cheat-sheets:diagrams\` and commit the result.`,
  );
  process.exit(1);
}

console.log(
  `\n${SLOTS.length} diagrams × ${LOCALES.length} locales drawn. ` +
    (checkOnly
      ? 'Every module in src/generated/cheat-sheet-diagrams matches.'
      : `${written.length} of ${outputs.size} modules in src/generated/cheat-sheet-diagrams written` +
        (written.length ? `: ${written.join(', ')}.` : ' (all unchanged).')),
);
console.log(
  `${todoTotal} string(s) still marked "TODO translate (task 5/6)"` +
    (todoTotal ? `: ${[...todos].map(([locale, count]) => `${locale} ${count}`).join(', ')}.` : '.'),
);
console.log(`${Object.keys(NOT_YET_WRITTEN).length} specified but not built, for want of a section:`);
for (const [key, why] of Object.entries(NOT_YET_WRITTEN)) {
  console.log(`  ${key}\n    ${why}`);
}
