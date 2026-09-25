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
// ## Size, type, and the rules this script enforces
//
// **The scale is fixed and the size is measured.** The page draws every unit
// at 0.8 CSS px (`PX_PER_UNIT`), on every diagram and every screen. No slot
// declares its size: `measureSize` takes the canvas from what the slot draws,
// in every locale — each label where `label()` put it, each shape read back
// from the markup — plus a 16-unit margin, and the page's box is that canvas
// at 0.8. So a drawing 340 units wide gets a 272 px box, not a 512 px box with
// its right half empty, and a label that grows in translation grows the box
// with it rather than falling off it.
//
// `label()` is the only way text gets into a drawing, and it enforces:
//
// 1. **Labels are `BODY` units, weight 400: 14 CSS px, the size of the prose.**
//    A label has no size option, so it cannot drift.
// 2. **One focal item per slot may be larger or bold** — the Cl symbol and its
//    two numbers, `2, 8, 1`, the Te and I tiles. A focal label names its item,
//    and a drawing that names two different items fails. It may never be
//    smaller than `BODY`.
// 3. **Every label declares its room**, the width in units it is given, and
//    fails the run if its estimated width is wider — in *any* locale — or if
//    it starts left of or above the canvas. The estimate is per character
//    (see `advance()`), and each run prints the tightest label in each slot,
//    and the size and widest item of each canvas. A label may be allowed
//    more than one line (`lines`); it then wraps in its room, and fails if a
//    language needs more lines than the drawing left space for.
// 4. **A label's text comes from the strings table, a whole number, or an
//    element symbol**, and nothing else — `label()` does not take a bare
//    string, so an English literal cannot slip into a German drawing.
// 5. **One typeface.** There is no font option: every label is the page's own
//    sans-serif. The monospace a worked sum and two masses were once set in is
//    gone.
// 6. **In a `phone` slot, every label ends left of `PHONE`**, the part of the
//    drawing a phone shows before it is swiped, in every locale. Every slot
//    is one. A canvas no wider than 363 units (291 CSS px, the column of a
//    375 px phone) does not pan there at all.
//
// ## The rules that shape every drawing here
//
// 1. **No electron is a dot on a circular track.** `docs/AGENT_INSTRUCTIONS.md`
//    Part A names "rigid solar-system orbits / solid billiard-ball atoms" as an
//    anti-pattern that "embeds lasting misconceptions", and these are the
//    easiest thing on the site to get wrong that way. Electrons are a stipple
//    whose density falls off from the nucleus with no gap, or marks at
//    irregular angles inside a band — never evenly spaced on a line.
//    `05-energy-levels` is the one Bohr-style figure; it is there to *count*
//    electrons per level, and it carries the sentence saying so, as
//    `docs/CHEAT_SHEET_IMAGES.md` requires.
//
// 2. **Say the scale.** A nucleus is about 1/100,000 of an atom's *width*
//    (by volume it is about 10⁻¹⁵, which is why the word matters).
//    `01-inside-an-atom` says so in the picture. `05-energy-levels` says instead
//    that it is not a picture of an atom at all, which is the honest caveat
//    for a counting model and does not depend on how big its bands are drawn.
//
// 3. **Colour is never the only carrier.** Every distinction made with colour
//    is also made with fill, outline, position or a word.
//
// 4. **Name a part where it is.** A particle gets a short leader to one of its
//    kind and a word, never a key to decode. A proton is filled and a neutron
//    hollow in every figure on both atom sheets.
//
// 5. **No title, and no sentence the paragraph already says.** The section
//    heading sits directly above every diagram. About six short labels at
//    most, and a full sentence only where a caveat is required.
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
 * How many half-lives `07-decay-and-made-elements` marks: 100% down to 6.25%.
 *
 * Four, not three, because "after two half-lives it has all gone" is a common
 * belief, and a curve that stops at an eighth leaves room for it. The fifth
 * point is 1/16 and the curve runs on past it, still above the axis. Each
 * point is `0.5 ** n` of the start, computed here, and each percentage in the
 * strings is checked against it.
 *
 * The carbon-14 and uranium-238 half-lives the figure used to print are gone
 * from it: the paragraph above and the sheet's example cards give both.
 */
const HALF_LIVES_MARKED = 4;

/**
 * Sodium, for `05-energy-levels`.
 *
 * 2, 8, 1 is the arrangement the periodic-table widget gives for sodium, and
 * `src/core-engine/tests/periodic-table.test.ts` pins the first twenty. 11 is
 * its atomic number, and so the number of electrons in the neutral atom the
 * figure draws; the run checks that the levels add up to it. The neutrons are
 * not drawn: they have nothing to do with the electron arrangement.
 */
const SODIUM = { levels: [2, 8, 1], protons: 11 };
if (SODIUM.levels.reduce((sum, count) => sum + count, 0) !== SODIUM.protons) {
  throw new Error('SODIUM: the levels do not add up to the atomic number, so the atom is not neutral.');
}

/** The radius of the nucleus disc in `05-energy-levels`, in units. */
const NUCLEUS = 20;

/**
 * Hydrogen's three isotopes, for `03-isotopes-of-hydrogen`.
 *
 * One electron each, one proton each, and 0, 1, 2 neutrons. The name is the
 * mass-number form the rest of the sheet uses, filled from `1 + neutrons`, and
 * under it the traditional name a student meets in other books and in the
 * news (deuterium, "heavy water"). Hydrogen-1 and hydrogen-2 are stable;
 * hydrogen-3 is radioactive, a beta emitter with a half-life of about 12.3
 * years — which is the paragraph's "some isotopes are radioactive and some are
 * not", shown on one element.
 */
const HYDROGEN_ISOTOPES = [
  { neutrons: 0, nameKey: 'protium', stable: true },
  { neutrons: 1, nameKey: 'deuterium', stable: true },
  { neutrons: 2, nameKey: 'tritium', stable: false },
] as const;

/**
 * How much smaller a nucleus really is than its atom's width.
 *
 * `01-inside-an-atom` says it, which `docs/CHEAT_SHEET_IMAGES.md` requires
 * of slot 1. (03 draws three small atoms without it: its subject is what is
 * in the nucleus, not how big it is.) Written out in each locale's strings
 * (`1/100,000`, `1/100 000`, …) and checked against this.
 */
const SCALE = 100000;

// --- Type ------------------------------------------------------------------

/**
 * How many CSS px the page draws one unit at, on every diagram and every
 * screen. Written into the generated index, where the page reads it, so the
 * two cannot disagree.
 *
 * The scale is fixed and the width is not: each slot's canvas is as wide as
 * what it draws (see `measureSize`), and the page draws it `width × 0.8` CSS
 * px wide, so a small drawing gets a small box rather than a 512 px box with
 * its right half empty.
 */
const PX_PER_UNIT = 0.8;

/**
 * The size of every label, in drawing units.
 *
 * At `PX_PER_UNIT` that is 14 CSS px — `text-sm`, the size of the paragraph
 * directly above the diagram — and it is drawn at weight 400 like that
 * paragraph. The contrast that used to need bold large text now comes from
 * the per-theme `--diagram-*` colours.
 */
const BODY = 17.5;

/**
 * The right-hand edge of what a phone shows before the reader swipes, in units.
 *
 * A diagram wider than the column pans sideways inside it rather than
 * shrinking (`docs/CHEAT_SHEET_IMAGES.md`, *How wide the page draws it*). On a
 * 375 px phone the column is 291 px, which is 364 units; on a 320 px phone it
 * is 236 px, or 295. In a slot marked `phone`, every label must end left of
 * this line in every locale, and the run fails if one does not: a figure whose
 * labels are all off to the right is, on a phone, a picture with no labels.
 */
const PHONE = 360;

/**
 * The empty border every canvas keeps round what it draws, in units: the
 * drawings all start 16 units in from the left, so the right and the bottom
 * get the same.
 */
const MARGIN = 16;

/**
 * A label's em box above and below its baseline, as a share of its size —
 * the box a browser's `getBBox()` gives a line of text, and so the part of
 * the canvas a label needs. Measured in the page on 2026-09-25: DM Sans is
 * 1.075 and 0.25, Manrope 1.0625 and 0.30, and a `central` label is 0.66 and
 * 0.68 either side. These round the larger of each up.
 */
const EM_BOX = { ascent: 1.08, descent: 0.31, central: 0.69 };

/**
 * The space between two lines of one wrapped label, in units. 1.3 × `BODY`,
 * close to the paragraph's own line height.
 */
const LEADING = 23;

// There is one typeface. Every label inherits the page's own font — DM Sans,
// or Manrope on a Russian page — which only works because the SVG is inline;
// an `<img>` could not see it. The monospace a worked sum and two masses used
// to be set in made them look like code, so it is gone, and `label()` has no
// way to ask for another font.

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
 *
 * Measured again after the four atom diagrams were redrawn with labels in all
 * six languages — 195 lines of text, 34 of them Russian — the estimate was
 * never under, with medians of 6–8% over in the Latin locales and 10% over
 * in Russian, once the Cyrillic groups below were re-measured.
 */
const ADVANCE_GROUPS: [string, number][] = [
  // The no-break space and the narrow one a localised number is grouped with.
  ['  ', 0.27],
  [' ', 0.2],
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
  // Cyrillic, set in Manrope on a Russian page, measured in it on 2026-09-25:
  // each letter ten times over at 100 units, in the page, with
  // `getComputedTextLength()`. The values are Manrope's advance divided by the
  // Russian factor below (which is there for the Latin letters and digits a
  // Russian page also sets in Manrope), rounded up, and grouped so that no
  // letter is under its group. The one group this replaced guessed 0.8 for
  // `жшщюыфм` and their capitals, which was 15% over for `м` and `ы` and
  // under for `Ж`, `Ш`, `Щ` and `Ю`; every other letter fell to the 0.56 and
  // 0.68 defaults, a few per cent over on average.
  ['гкзтьух', 0.5],
  ['всчяэаъ', 0.53],
  ['ийплеёбнорд', 0.57],
  ['ц', 0.59],
  ['ыжмф', 0.68],
  ['шщю', 0.75],
  ['ГЕЁКЗБРУХЪЬВЯ', 0.6],
  ['ЧТЭАИЙНПЛ', 0.66],
  ['ФСЦОД', 0.7],
  ['ЫМ', 0.8],
  ['ЖШЩЮ', 0.88],
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

function estimateWidth(text: string, size: number, { bold, locale }: { bold?: boolean; locale: Locale }): number {
  const chars = Array.from(text.normalize('NFD').replace(/\p{M}/gu, ''));
  const ems = chars.reduce((sum, char) => sum + advance(char), 0);
  return ems * size * SAFETY * (bold ? 1.06 : 1) * (LOCALE_WIDTH[locale] ?? 1);
}

/**
 * Breaks `text` into lines no wider than `room`, at ordinary spaces only — so a
 * no-break space, which is what holds `100 000` or `Échelle non respectée :`
 * together, never becomes a line break. Every line but the last keeps its
 * trailing space, so the lines joined are the string again: that is what the
 * page's `textContent` is, and what the e2e spec matches.
 *
 * Greedy, except that a label which takes two lines breaks after a clause — a
 * comma, colon, semicolon, dash or `=` — when there is one with both halves
 * fitting. "A way to count electrons, / not a picture of an atom." reads as
 * two phrases; the greedy "… not a picture of / an atom." reads as a mistake.
 * That keeps the strings free of no-break spaces put there only to steer a
 * line break, in six languages, for a width only this script knows.
 *
 * Otherwise a label that wraps is balanced: it is wrapped again in the
 * narrowest room that still takes the same number of lines, so the last line
 * is not one stranded word ("… du diamètre de / l’atome.").
 */
function wrapLines(text: string, room: number, measure: (line: string) => number): string[] {
  const words = text.split(' ');
  const greedy = (width: number) => {
    const lines: string[] = [];
    let line = words[0];
    for (const word of words.slice(1)) {
      const candidate = `${line} ${word}`;
      if (measure(candidate) <= width) {
        line = candidate;
      } else {
        lines.push(`${line} `);
        line = word;
      }
    }
    lines.push(line);
    return lines;
  };
  const lines = greedy(room);
  if (lines.length === 1) return lines;

  if (lines.length === 2) {
    for (let split = words.length - 1; split > 0; split -= 1) {
      const head = words.slice(0, split).join(' ');
      const tail = words.slice(split).join(' ');
      if (/[,:;–—=]$/.test(head) && measure(head) <= room && measure(tail) <= room) return [`${head} `, tail];
    }
  }

  let [narrow, wide] = [0, room];
  while (wide - narrow > 1) {
    const middle = (narrow + wide) / 2;
    if (greedy(middle).length === lines.length) wide = middle;
    else narrow = middle;
  }
  return greedy(wide);
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
  /**
   * The most lines this label may wrap onto, each no wider than `room`, the
   * next one `LEADING` below. The drawing leaves space for all of them; a
   * language that needs more fails the run. Default 1: no wrapping.
   */
  lines?: number;
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

/** A rectangle in drawing units, and what drew it, for error messages. */
interface Extent {
  source: string;
  left: number;
  top: number;
  right: number;
  bottom: number;
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
  /**
   * How many lines a `BODY` label wraps onto in `room`, in this locale, so a
   * drawing can put what comes after it below its last line.
   */
  lineCount: (words: Words, room: number) => number;
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

function createPen(slot: Slot, locale: Locale, fits: Fit[], inked: Extent[], focalItems: Set<string>): Pen {
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
      const { room, anchor, fill, lines: maxLines = 1, central, rotate, focal } = options;
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

      const measure = (text: string) => estimateWidth(text.trimEnd(), size, { bold, locale });
      const lines = maxLines > 1 ? wrapLines(words.text, room, measure) : [words.text];
      if (lines.length > maxLines) {
        throw new Error(
          `${where(words.source)}: "${words.text}" needs ${lines.length} lines of ${room} units and ` +
            `has ${maxLines}. Give it more room or another line — docs/i18n/README.md §3a — before ` +
            'shortening a word.',
        );
      }
      lines.forEach((line, index) => {
        const width = measure(line);
        fits.push({ source: `${locale} ${words.source}`, width, room });
        if (width > room) {
          throw new Error(
            `${where(words.source)}: "${line.trimEnd()}" is about ${Math.round(width)} units wide and ` +
              `has ${room}. Re-flow or move it — docs/i18n/README.md §3a — before shortening a word.`,
          );
        }
        // Where the line's glyph box lands, which is what sizes the canvas
        // (see `measureSize`). Vertically it is the font's whole em box, as a
        // browser's getBBox() reports it, not just the letters.
        const baseline = y + index * LEADING;
        const [above, below] = central ? [EM_BOX.central, EM_BOX.central] : [EM_BOX.ascent, EM_BOX.descent];
        if (rotate) {
          // A quarter turn anticlockwise, for an axis label: the line runs
          // up the page from its anchor, and its em box lies across it.
          if (rotate !== 90 || lines.length > 1) {
            throw new Error(`${where(words.source)}: only a one-line label turned 90° is supported.`);
          }
          const start = anchor === 'middle' ? y + width / 2 : anchor === 'end' ? y + width : y;
          inked.push({
            source: `${locale} ${words.source}`,
            left: x - above * size,
            right: x + below * size,
            top: start - width,
            bottom: start,
          });
          if (slot.phone && x + below * size > PHONE) {
            throw new Error(`${where(words.source)}: an axis label right of the ${PHONE} units a phone shows.`);
          }
        } else {
          const left = anchor === 'middle' ? x - width / 2 : anchor === 'end' ? x - width : x;
          inked.push({
            source: `${locale} ${words.source}`,
            left,
            right: left + width,
            top: baseline - above * size,
            bottom: baseline + below * size,
          });
          if (slot.phone && left + width > PHONE) {
            throw new Error(
              `${where(words.source)}: "${line.trimEnd()}" ends at about ${Math.round(left + width)}, ` +
                `past the ${PHONE} units a phone shows before it is swiped. Move it left or under ` +
                'the thing it names.',
            );
          }
        }
      });

      const attributes = [
        `x="${n(x)}"`,
        `y="${n(y)}"`,
        anchor ? `text-anchor="${anchor}"` : '',
        central ? 'dominant-baseline="central"' : '',
        rotate ? `transform="rotate(${n(-rotate)} ${n(x)} ${n(y)})"` : '',
        `font-size="${size}"`,
        bold ? 'font-weight="700"' : '',
        paint(fill ?? TOKEN.ink),
      ].filter(Boolean);
      const content =
        lines.length === 1
          ? esc(words.text)
          : lines
              .map((line, index) => `<tspan x="${n(x)}" dy="${index === 0 ? 0 : LEADING}">${esc(line)}</tspan>`)
              .join('');
      return `<text ${attributes.join(' ')}>${content}</text>`;
    },

    lineCount(words, room) {
      return wrapLines(words.text, room, (text) => estimateWidth(text.trimEnd(), BODY, { locale })).length;
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

/**
 * An arrow from one point to another: a line, and a filled head drawn as a
 * path rather than a `<marker>`, so it needs no id and takes its colour from
 * the same token as the line.
 */
function arrow(x1: number, y1: number, x2: number, y2: number, head = 12): string {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const [cos, sin] = [Math.cos(angle), Math.sin(angle)];
  const [bx, by] = [x2 - head * cos, y2 - head * sin];
  const wing = head * 0.5;
  return (
    `<path d="M ${n(x1)} ${n(y1)} L ${n(bx)} ${n(by)}" ${paint('none', TOKEN.ink)} ` +
    'stroke-width="2.5" stroke-linecap="round" />' +
    `<path d="M ${n(x2)} ${n(y2)} L ${n(bx + wing * sin)} ${n(by - wing * cos)} ` +
    `L ${n(bx - wing * sin)} ${n(by + wing * cos)} Z" ${paint(TOKEN.ink)} />`
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
  /** Every label must end left of `PHONE`. */
  phone: boolean;
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
 * **The cloud is densest right against the nucleus, with no gap.** The first
 * version started its marks a fixed distance out and spread them by radius,
 * which left an empty ring round the nucleus, and a cloud with a hole in the
 * middle reads as a thick orbit — the picture this one exists to replace. Each
 * mark is now kept with a probability that falls exponentially with its
 * distance from the nucleus's edge, so every step outward is thinner than the
 * one before, all the way in.
 *
 * The particles are named where they are, with a leader to one proton and one
 * neutron, and not through a key: filled is a proton and hollow a neutron in
 * every figure on both atom sheets. Fill is also what survives a red-green
 * colour deficiency, which the red and grey alone would not.
 *
 * Seven nucleons, three of them protons — lithium-7, a real and stable nuclide.
 * The picture stands for any atom and does not name it (a sixth label for a
 * detail the paragraph never mentions); the alt text says so, and a student who
 * counts still finds a nucleus that could exist.
 *
 * The scale note is not a disclaimer bolted on afterwards; it is the reason the
 * picture is allowed to exist, and it says *width*, because by volume the ratio
 * is about 10⁻¹⁵. Here the nucleus is about a quarter of the cloud's width. At
 * 1/100,000 it would be 0.003 units across in this coordinate space — thinner
 * than any line the drawing can make.
 */
function drawInsideAnAtom(pen: Pen): string[] {
  const { t, label } = pen;
  const cx = 250;
  const cy = 176;
  /** The farthest a mark may be; the cloud has thinned to almost nothing well before. */
  const reach = 140;
  /** Just outside the cluster of nucleons (22 + 12 = 34), so no mark hides under a hollow neutron. */
  const clear = 37;
  /** How far out the density falls to 1/e of its value at the nucleus. */
  const falloff = 36;
  const rng = seeded(101);

  const marks: string[] = [];
  while (marks.length < 330) {
    const dx = (rng() * 2 - 1) * reach;
    const dy = (rng() * 2 - 1) * reach;
    const radius = Math.hypot(dx, dy);
    if (radius < clear || radius > reach) continue;
    const density = Math.exp(-(radius - clear) / falloff);
    if (rng() > density) continue;
    // Fainter as well as sparser outward. The floor is 0.3 and not lower:
    // below about 0.22 the outermost marks disappear on the dark theme, and a
    // cloud that ends abruptly is the edge this is avoiding, drawn by accident.
    marks.push(
      `<circle cx="${n(cx + dx)}" cy="${n(cy + dy)}" r="3.4" fill-opacity="${alpha(0.3 + 0.55 * density)}" />`,
    );
  }

  /** Two, three, two — a compact cluster rather than a ring of seven. Protons first. */
  const places = [
    [-11, -20],
    [11, -20],
    [-22, 0],
    [0, 0],
    [22, 0],
    [-11, 20],
    [11, 20],
  ] as const;
  const radius = 12;

  // The labels sit in a column on the left, right-aligned against their
  // leaders, because a phone shows the left of the drawing first (see
  // `PHONE`). The leaders cross the thin outer cloud to reach the nucleus.
  const column = 116;
  const leaderStart = column + 7;
  const [protonX, protonY] = [cx + places[2][0], cy + places[2][1]];
  const [neutronX, neutronY] = [cx + places[5][0], cy + places[5][1]];
  const edge = radius / Math.SQRT2;

  return [
    `<g ${paint(TOKEN.electron)}>${marks.join('')}</g>`,
    ...nucleons(cx, cy, radius, places, 3),

    label(16, 30, t('electronCloud'), { room: PHONE - 16, fill: TOKEN.electron }),
    leader(64, 40, 178, 116),

    // To the notch between the two top protons: the cluster, not one particle.
    label(column, cy - 56, t('nucleus'), { room: column - 16, anchor: 'end', central: true }),
    leader(leaderStart, cy - 56, cx - 4, cy - 33),

    label(column, cy, t('proton'), { room: column - 16, anchor: 'end', central: true, fill: TOKEN.proton }),
    leader(leaderStart, cy, protonX - radius, protonY),

    label(column, cy + 56, t('neutron'), { room: column - 16, anchor: 'end', central: true }),
    leader(leaderStart, cy + 56, neutronX - edge, neutronY + edge),

    label(16, 344, t('scale', { numbers: [SCALE] }), { room: PHONE - 16, lines: 3 }),
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
 * Each label says what its number *is*, as an equation, and sits on the side
 * of the notation its number is on: the mass number's above, the atomic
 * number's below, each joined to its number by a short vertical leader. That
 * keeps both in the left of the drawing, which is all a phone shows at first;
 * the old layout stacked them to the right of the symbol, where a phone cut
 * off every one. There are no arrowheads: a leader names a thing here, as in
 * every other figure on the sheet.
 *
 * The atomic number is in the proton colour, and so is its label. The
 * subtraction is worked out rather than asserted, so "mass number minus atomic
 * number" is visible as an operation and not as a fact to memorise.
 */
function drawAtomicAndMassNumber(pen: Pen): string[] {
  const { t, whole, symbol, label, lineCount } = pen;
  const mass = CHLORINE.lightMassNumber;
  const atomic = CHLORINE.protons;
  const neutrons = mass - atomic;
  const notation = { item: 'nuclide notation', bold: true };
  /** Where the two numbers end, right-aligned, and the symbol begins. */
  const numbersEnd = 104;
  /** Under the middle of the two-digit numbers: where both leaders run. */
  const stem = 80;
  const room = PHONE - 16;
  // The mass number's label may take two lines — only Russian does — and it
  // is its last line that sits on the leader, so the notation below never
  // moves. A label that wraps breaks after its "=" (see `wrapLines`).
  const massLabel = t('massNumber');
  const massLabelLast = 55;

  return [
    label(16, massLabelLast - (lineCount(massLabel, room) - 1) * LEADING, massLabel, { room, lines: 2 }),
    leader(stem, massLabelLast + 10, stem, 94),

    label(numbersEnd, 115, whole(mass), {
      room: 88,
      anchor: 'end',
      central: true,
      focal: { ...notation, size: 42 },
    }),
    label(numbersEnd, 173, whole(atomic), {
      room: 88,
      anchor: 'end',
      central: true,
      fill: TOKEN.proton,
      focal: { ...notation, size: 42 },
    }),
    label(numbersEnd + 8, 144, symbol('Cl'), { room: 130, central: true, focal: { ...notation, size: 84 } }),

    leader(stem, 194, stem, 220),
    label(16, 239, t('atomicNumber'), { room, fill: TOKEN.proton }),

    label(16, 285, t('subtraction', { values: { mass, atomic, neutrons } }), { room }),
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
 * **Three rows, not three columns.** Side by side, each atom's name had about
 * 110 units under it, and the German *Wasserstoff-3* needs 125: the layout
 * would not survive German, let alone the phone rule. Stacked, each row is the
 * atom in the middle and its words to the right of it, on three lines:
 * the name, the traditional name, and *stable* or *radioactive*, which is the
 * paragraph's point shown on one element.
 *
 * **The particles are named where they are, once each**, in a column on the
 * left with a leader to one of each — the electron and proton of hydrogen-1,
 * the neutron of hydrogen-2 — exactly as `01-inside-an-atom` names them, and
 * in the same colours: filled proton, hollow neutron. There is no key, and no
 * "1 proton" under each atom: the reader counts one filled circle in each row,
 * and 0, 1, 2 hollow ones, which is the comparison the figure is for.
 */
function drawIsotopesOfHydrogen(pen: Pen): string[] {
  const { t, label } = pen;
  /**
   * The particle labels end here, right-aligned, and their leaders start 6 on.
   * 85 units is the Russian «электрон».
   */
  const nameEnd = 101;
  const cx = 147;
  /**
   * The isotope's words start here, just clear of the band. The widest, the
   * Russian «радиоактивный» at about 145 units, ends by 344, so the canvas is
   * 360 units: 288 CSS px, which a 375 px phone shows without panning.
   */
  const wordsX = 199;
  const rows = [62, 172, 282];
  const band = 34;
  const nucleon = 12;
  /** One bearing per atom, unrelated to each other on purpose. Hydrogen-1's is up and left, towards its label. */
  const electronBearing = [150, 38, 292];
  /** And one radius each, off the middle of the band, for the same reason. */
  const electronRadius = [band - 4, band + 4, band - 2];
  const electronDot = 6.5;
  const parts: string[] = [];

  HYDROGEN_ISOTOPES.forEach((isotope, index) => {
    const cy = rows[index];

    // A soft band with no edge, and the one electron sitting off the middle of
    // it: a region the electron is likely to be in, which is the most a picture
    // this size can honestly say.
    parts.push(...softBand(cx, cy, band, 9));
    const [ex, ey] = at(cx, cy, electronBearing[index], electronRadius[index]);
    parts.push(dot(ex, ey, electronDot, TOKEN.electron));

    // Proton first, then the neutrons. Hydrogen-2's neutron is on the left,
    // where its label is.
    const places =
      isotope.neutrons === 0
        ? ([[0, 0]] as const)
        : isotope.neutrons === 1
          ? ([
              [nucleon, 0],
              [-nucleon, 0],
            ] as const)
          : ([
              [0, -nucleon],
              [-nucleon, 9],
              [nucleon, 9],
            ] as const);
    parts.push(...nucleons(cx, cy, nucleon, places, 1));

    parts.push(
      label(wordsX, cy - LEADING, t('isotopeName', { values: { mass: 1 + isotope.neutrons } }), {
        room: PHONE - wordsX,
        central: true,
      }),
      label(wordsX, cy, t(isotope.nameKey), { room: PHONE - wordsX, central: true, fill: TOKEN.inkMuted }),
      label(wordsX, cy + LEADING, t(isotope.stable ? 'stable' : 'radioactive'), {
        room: PHONE - wordsX,
        central: true,
      }),
    );

    if (index === 0) {
      const edge = electronDot / Math.SQRT2;
      const protonAt = at(cx, cy, 225, nucleon);
      parts.push(
        label(nameEnd, cy - 30, t('electron'), {
          room: nameEnd - 16,
          anchor: 'end',
          central: true,
          fill: TOKEN.electron,
        }),
        leader(nameEnd + 6, cy - 30, ex - edge, ey - edge * 0.4),
        label(nameEnd, cy + 16, t('proton'), {
          room: nameEnd - 16,
          anchor: 'end',
          central: true,
          fill: TOKEN.proton,
        }),
        leader(nameEnd + 6, cy + 16, protonAt[0], protonAt[1]),
      );
    }
    if (index === 1) {
      parts.push(
        label(nameEnd, cy, t('neutron'), { room: nameEnd - 16, anchor: 'end', central: true }),
        leader(nameEnd + 6, cy, cx - 2 * nucleon, cy),
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
 * where they are — and only if the picture itself says so. Hence the line
 * across the bottom, which is not optional and is the first thing to keep if
 * this figure is ever redrawn.
 *
 * **Each level is a band with a visible edge.** The first version drew only
 * soft, edgeless bands, to keep them from reading as tracks, and they were too
 * faint to tell which electron was in which level at 512 px — which is the
 * whole job of the figure. So each band is now a tinted ring with a solid
 * edge on both sides in the electron colour, which clears 3:1 as a graphic in
 * both themes; the tint and the stipple elsewhere do not, by design, so the
 * edges are what carry it. It still is not a solar system: the electrons sit
 * at irregular angles and at different depths inside a band, never on a line,
 * and the caption says in words what the figure is.
 *
 * **The single outer electron is marked**, with a ring round it and the
 * callout "outer level", because it is the one the paragraph is about.
 *
 * **The nucleus is a plain neutral disc with the symbol on it.** Its protons
 * are not drawn, so it is not a proton-coloured disc either — that would mix
 * the filled-proton convention of 01 and 03 with a nucleus drawn as a single
 * proton. `Na` also names the element, which the old figure never did.
 *
 * **No scale factor.** The old caveat said the nucleus was drawn about
 * 100,000 times too big, which was wrong for this drawing: a nucleus a fifth
 * or a sixth of the atom's width is drawn some 15,000–20,000 times too big,
 * and the factor moves every time a band does. The honest caveat for a
 * counting model is that it is not a picture of an atom at all, which covers
 * size too; `01-inside-an-atom` is where the sheet states the real scale. If a
 * scale remark ever comes back, compute it from `NUCLEUS` and the outer band
 * here rather than writing a number into the strings.
 *
 * The arrangement `2, 8, 1` is the focal item, and the total, 11 electrons,
 * sits beside it. The three "level n: x electrons" lines that used to repeat
 * it are gone.
 */
function drawEnergyLevels(pen: Pen): string[] {
  const { t, symbol, label } = pen;
  const cx = 146;
  const cy = 180;
  /** Each level's inner and outer radius, innermost first. */
  const bands = [
    [28, 48],
    [60, 94],
    [106, 130],
  ] as const;
  const rng = seeded(508);
  const parts: string[] = [];
  let outer: [number, number] = [cx, cy];

  bands.forEach(([inner, outerEdge], level) => {
    const mid = (inner + outerEdge) / 2;
    parts.push(
      `<circle cx="${n(cx)}" cy="${n(cy)}" r="${n(mid)}" ${paint('none', TOKEN.electron)} ` +
        `stroke-width="${n(outerEdge - inner)}" stroke-opacity="0.1" />`,
      ...[inner, outerEdge].map((radius) => ring(cx, cy, radius, TOKEN.electron, 1.5)),
    );
    const count = SODIUM.levels[level];
    for (let i = 0; i < count; i += 1) {
      // A base angle, then pushed off it far enough that the arrangement never
      // reads as evenly spaced, and a depth that differs inside the band. The
      // single outer electron is up and to the left, where its callout is.
      const base = count === 1 ? 128 : (360 * i) / count + 20;
      const bearing = base + (count === 1 ? 0 : (rng() - 0.5) * (300 / count));
      const depth = count === 1 ? 0 : (rng() - 0.5) * (outerEdge - inner - 14);
      const [x, y] = at(cx, cy, bearing, mid + depth);
      parts.push(dot(x, y, 6, TOKEN.electron));
      if (count === 1) outer = [x, y];
    }
  });

  const [first, second, third] = SODIUM.levels;
  const [ox, oy] = outer;
  const halo = 13;
  parts.push(
    // The nucleus: a neutral disc, tinted just enough to read as a thing, with
    // an edge in ink. Ink text over the 12% tint still clears 6:1.
    `<circle cx="${n(cx)}" cy="${n(cy)}" r="${NUCLEUS}" ${paint(TOKEN.ink, TOKEN.ink)} ` +
      'fill-opacity="0.12" stroke-width="2" />',
    label(cx, cy, symbol('Na'), { room: NUCLEUS * 2 - 6, anchor: 'middle', central: true }),

    ring(ox, oy, halo, TOKEN.ink, 2),
    label(16, 26, t('outerLevel'), { room: PHONE - 16 }),
    leader(40, 36, ox - halo * 0.6, oy - halo * 0.8),

    label(16, 362, t('arrangement', { values: { first, second, third } }), {
      room: 156,
      focal: { item: 'arrangement', size: 46, bold: true },
    }),
    label(184, 362, t('electrons', { values: { count: SODIUM.protons } }), { room: PHONE - 184 }),

    label(16, 402, t('countNote'), { room: PHONE - 16, lines: 2 }),
  );

  return parts;
}

// --- 06. Ordered by atomic number ------------------------------------------

/**
 * Tellurium and iodine, the pair that settled the argument.
 *
 * Two table cells side by side, laid out the way a real cell is, so that the
 * figure doubles as practice at reading one. Tellurium is on the left because
 * that is where the table puts it, and an arrow between the cells is the
 * table's order. The two symbols are the focal item.
 *
 * The two numbers in a cell are named once, on tellurium's: "atomic number"
 * in the proton colour for the red number, and "relative atomic mass" for the
 * other, which a Year 9 student would otherwise not know how to read. Both
 * numbers sit along the top of the cell so that both labels can come from
 * above, without a leader crossing the cell. The masses are in the prose's own
 * typeface, not the monospace they used to be set in.
 *
 * Under each cell, the point in four words: heavier but first, lighter but
 * second. The sentence that used to follow them said it a third time.
 */
function drawOrderedByAtomicNumber(pen: Pen): string[] {
  const { t, whole, symbol, label } = pen;
  const cellWidth = 136;
  const cellHeight = 112;
  const top = 80;
  /**
   * Iodine's cell is centred at 264. The German rank label under it is about
   * 158 units wide, so the drawing ends at 343, and at 360 with its margin:
   * 288 CSS px, inside the 291 px column of a 375 px phone, so it does not
   * pan there. Four units further right and it would, by a pixel.
   */
  const lefts = [16, 196];
  /** Inside a cell, less an 8-unit margin each side. */
  const inCell = cellWidth - 16;
  /** Where each cell's two numbers sit: left and right along the top. */
  const numberY = top + 26;
  const inset = 10;
  /** Leaders run from the labels above down to tellurium's two numbers. */
  const [numberLeader, massLeader] = [34, lefts[0] + cellWidth - inset - 26];

  const parts: string[] = [
    label(16, 24, t('atomicNumber'), { room: PHONE - 16, fill: TOKEN.proton }),
    leader(numberLeader, 32, numberLeader, numberY - 17),
    label(60, 52, t('relativeAtomicMass'), { room: PHONE - 60 }),
    leader(massLeader, 60, massLeader, numberY - 17),

    arrow(lefts[0] + cellWidth + 10, top + cellHeight / 2, lefts[1] - 10, top + cellHeight / 2),
  ];

  ORDER_PAIR.forEach((element, index) => {
    const left = lefts[index];
    const mid = left + cellWidth / 2;
    const [nameKey, massKey, rankKey] = element.keys;
    parts.push(
      frame(left, top, cellWidth, cellHeight),
      label(left + inset, numberY, whole(element.atomicNumber), { room: 40, fill: TOKEN.proton }),
      label(left + cellWidth - inset, numberY, t(massKey, { numbers: [element.mass] }), {
        room: inCell - 40,
        anchor: 'end',
      }),
      label(mid, top + 78, symbol(element.symbol), {
        room: inCell,
        anchor: 'middle',
        focal: { item: 'element symbols', size: 54, bold: true },
      }),
      label(mid, top + 102, t(nameKey), { room: inCell, anchor: 'middle' }),
      // Under the cell, on up to two lines, with the gap between cells as room.
      label(mid, top + cellHeight + 26, t(rankKey), { room: 160, anchor: 'middle', lines: 2 }),
    );
  });

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
 * The curve is a sampled exponential rather than straight segments, because
 * the point a student has to take away is that decay does not stop — it is
 * the same fraction again over the next interval, not the same amount. So it
 * is marked to four half-lives (`HALF_LIVES_MARKED`), 6.25%, and drawn on
 * past the last point, still above the axis.
 *
 * **The vertical axis says what is being counted: undecayed nuclei.** "How
 * much is left" fed the belief that the sample itself disappears; the atoms
 * that have decayed are still there, as another nuclide. It is a heading over
 * the top of the axis, read level, rather than a label turned up the side,
 * which is where a school graph puts it and what a phone can show whole.
 *
 * **The time axis is labelled under its numbers, from the left.** At the old
 * end-of-axis place it had 96 units, and the German *Halbwertszeiten* does not
 * fit in 96. Under the axis it has the whole width.
 *
 * Every percentage sits up and to the right of its point, where the falling
 * curve never is; the first sits level with its point, clear of the axis it
 * starts on. Each ends before the next one begins, so they cannot collide at
 * any height, and the last ends left of `PHONE`: the step between half-lives
 * is what makes that true, so it is set from `PHONE`, not guessed.
 */
function drawHalfLife(pen: Pen): string[] {
  const { t, whole, label } = pen;
  const originX = 30;
  /** The first point, at 100%, is this far below the top of the axis. */
  const axisTop = 40;
  const plotTop = 56;
  const plotHeight = 200;
  const baseline = plotTop + plotHeight;
  /** How far right of its point a percentage starts, and how far above it (after the first). */
  const [offset, lift] = [8, 19];
  /** The widest percentage, Russian `12,5 %`, is estimated at 61 units. */
  const percentRoom = 61;
  // The last percentage ends a margin short of `PHONE`, so the whole canvas is
  // at most 360 units — 288 CSS px, which a 375 px phone shows without panning.
  const step = Math.floor((PHONE - MARGIN - originX - offset - percentRoom) / HALF_LIVES_MARKED);
  if (percentRoom > step) throw new Error('07: a percentage would run into the next one.');
  /** Drawn on past the last point, so the curve is not seen to stop. */
  const lastTime = HALF_LIVES_MARKED + 0.4;
  const x = (time: number) => originX + step * time;
  const y = (fraction: number) => baseline - plotHeight * fraction;

  const samples: string[] = [];
  const sampleCount = 88;
  for (let i = 0; i <= sampleCount; i += 1) {
    const time = (lastTime * i) / sampleCount;
    samples.push(`${n(x(time))},${n(y(Math.pow(0.5, time)))}`);
  }

  const parts: string[] = [
    label(16, 24, t('axisAmount'), { room: PHONE - 16 }),
    `<path d="M ${originX} ${axisTop} L ${originX} ${baseline} L ${n(x(lastTime) + 14)} ${baseline}" ` +
      `${paint('none', TOKEN.ink)} stroke-width="2.5" stroke-linecap="round" ` +
      'stroke-linejoin="round" />',
    `<polyline points="${samples.join(' ')}" ${paint('none', TOKEN.accent)} ` +
      'stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />',
  ];

  for (let halfLives = 0; halfLives <= HALF_LIVES_MARKED; halfLives += 1) {
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
      // Percentages, because the axis is a share of what there was, and the
      // section's takeaway is written in shares. The string is the locale's
      // own (`12,5 %`); the number in it is checked against the curve.
      label(
        px + (halfLives === 0 ? offset + 6 : offset),
        halfLives === 0 ? py : py - lift,
        t(`percent${halfLives}`, { numbers: [fraction * 100] }),
        { room: percentRoom, central: true },
      ),
      label(px, baseline + 24, whole(halfLives), { room: 40, anchor: 'middle' }),
    );
  }

  // Two lines allowed, for the Spanish, whose half-life is four words long.
  parts.push(label(16, baseline + 52, t('axisTime'), { room: PHONE - 16, lines: 2 }));

  return parts;
}

// --- States of Matter (task 7) ---------------------------------------------

/**
 * The particles in `states-of-matter/01-particles-in-each-state`.
 *
 * **One radius for every particle in all three boxes.** "Particles expand when
 * heated" is one of the sheet's common mistakes, and a gas drawn with bigger
 * circles would teach it; there is one `radius`, and nothing else sets a
 * particle's size. The solid and the liquid hold the **same number** of
 * particles (`columns × rows`), because melting rearranges them and does not
 * make or lose any; the gas box shows a small sample, `gas`, since a gas's
 * particles are far apart.
 */
const PARTICLES = { radius: 8, solid: { columns: 9, rows: 4 }, gas: 5 } as const;

/**
 * Water, heated from ice to steam at atmospheric pressure, per gram, for
 * `states-of-matter/02-heating-curve`.
 *
 * The two latent heats are the school values: 334 J/g to melt ice at 0 °C and
 * 2260 J/g to boil water at 100 °C, a ratio of 6.8 to 1. The specific heat
 * capacities are the school values too, in J/(g·K): ice 2.1, water 4.18,
 * steam 2.0. (Ice's falls a little as it gets colder; at this size the
 * difference is under two units of the drawing.)
 *
 * `from` and `to` are where the drawn curve starts and ends. They are not
 * printed — the only numbers on the figure are 0 °C and 100 °C — and they are
 * wide on purpose: see `drawHeatingCurve`.
 */
const WATER_HEATING = {
  meltingPoint: 0,
  boilingPoint: 100,
  fusion: 334,
  vaporisation: 2260,
  heatCapacity: { ice: 2.1, water: 4.18, steam: 2.0 },
  from: -80,
  to: 180,
} as const;

/**
 * Three boxes, one above another, each with its state's name on its left:
 * a solid, a liquid and a gas, drawn with the same particle.
 *
 * **Rows, not three panels side by side.** Side by side, each box and its name
 * had about 100 units, and the Russian «газообразное» needs 127: the layout
 * would not survive Russian, or the phone rule. Stacked, the names share one
 * column on the left, which a phone always shows.
 *
 * - **Solid:** a regular block, every particle touching its neighbours, resting
 *   on the floor of its box but not filling it — a solid keeps its own shape.
 * - **Liquid:** the same number of particles, still touching, but jumbled and
 *   with gaps, lying across the bottom of the box. They are dropped one at a
 *   time, left to right in layers with a random gap, and each comes to rest on
 *   the first particle (or the floor) it meets — which is what makes them touch
 *   without overlapping, and irregular without looking scattered.
 * - **Gas:** a few particles, far apart, anywhere in the box, each with two
 *   short marks trailing behind it for its motion, in a random direction.
 *
 * Every position comes from `seeded()`, so the drawing is irregular and still
 * byte-stable.
 */
function drawParticlesInEachState(pen: Pen): string[] {
  const { t, label } = pen;
  const r = PARTICLES.radius;
  /** The names' column. The Russian «газообразное» is about 127 units. */
  const labelRoom = 128;
  const boxX = 16 + labelRoom + 12;
  // The box ends a margin short of `PHONE`, so the canvas is 360 units: 288
  // CSS px, which a 375 px phone shows without panning.
  const boxRight = PHONE - MARGIN - 1;
  const boxWidth = boxRight - boxX;
  const boxHeight = 100;
  const rowGap = 16;
  /** The inside of a box keeps this much clear of its outline. */
  const pad = 4;
  const count = PARTICLES.solid.columns * PARTICLES.solid.rows;
  const parts: string[] = [];

  const states = ['solid', 'liquid', 'gas'] as const;
  states.forEach((state, index) => {
    const boxY = 16 + index * (boxHeight + rowGap);
    const floor = boxY + boxHeight - pad - r;
    parts.push(
      frame(boxX, boxY, boxWidth, boxHeight),
      label(16, boxY + boxHeight / 2, t(state), { room: labelRoom, central: true }),
    );

    const centres: [number, number][] = [];
    if (state === 'solid') {
      const { columns, rows } = PARTICLES.solid;
      const left = boxX + (boxWidth - columns * 2 * r) / 2 + r;
      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          centres.push([left + column * 2 * r, floor - row * 2 * r]);
        }
      }
    } else if (state === 'liquid') {
      const random = seeded(0x5701);
      const [left, right] = [boxX + pad + r + 2, boxRight - pad - r - 2];
      const step = 0.5;
      const free = (px: number, py: number) =>
        py <= floor &&
        px >= left &&
        px <= right &&
        centres.every(([qx, qy]) => (px - qx) ** 2 + (py - qy) ** 2 >= 4 * r * r - 1e-6);
      // A particle falls until it lands, then rolls round the particle it
      // landed on for a short, random distance and sticks: far enough to
      // jumble the rows, not so far that they settle back into a lattice.
      const settle = (x: number, roll: number): [number, number] => {
        let [px, py] = [x, boxY + pad + r];
        for (;;) {
          if (free(px, py + step)) {
            py += step;
            continue;
          }
          const below = centres.find(([qx, qy]) => (px - qx) ** 2 + (py + step - qy) ** 2 < 4 * r * r);
          if (!below || roll <= 0) return [px, py];
          const side = below[0] < px ? 1 : -1;
          const angle = Math.atan2(py - below[1], px - below[0]) + (side * step) / (2 * r);
          const [nx, ny] = [below[0] + 2 * r * Math.cos(angle), below[1] + 2 * r * Math.sin(angle)];
          if (ny <= py || !free(nx, ny)) return [px, py];
          [px, py, roll] = [nx, ny, roll - step];
        }
      };
      // Each particle is dropped at the lowest of a few random places, so the
      // surface comes out roughly level, as a liquid's is, and not a heap.
      while (centres.length < count) {
        const tries = Array.from({ length: 6 }, () => settle(left + random() * (right - left), random() * 3 * r));
        centres.push(tries.reduce((lowest, place) => (place[1] > lowest[1] ? place : lowest)));
      }
      const top = Math.min(...centres.map(([, y]) => y)) - r;
      if (top < boxY + pad) throw new Error('01-particles: the liquid overflows its box.');
    } else {
      const random = seeded(0x5702);
      /** Room round each gas particle for its motion marks. */
      const clear = r + 14;
      const apart = 46;
      for (let tries = 0; centres.length < PARTICLES.gas; tries += 1) {
        if (tries > 5000) throw new Error('01-particles: no room for the gas particles.');
        const x = boxX + clear + random() * (boxWidth - 2 * clear);
        const y = boxY + clear + random() * (boxHeight - 2 * clear);
        if (centres.every(([qx, qy]) => Math.hypot(x - qx, y - qy) >= apart)) centres.push([x, y]);
      }
      for (const [x, y] of centres) {
        const heading = random() * 2 * Math.PI;
        const [cos, sin] = [Math.cos(heading), Math.sin(heading)];
        for (const side of [-3.5, 3.5]) {
          const [sx, sy] = [x - sin * side, y + cos * side];
          parts.push(
            `<path d="M ${n(sx - cos * (r + 3))} ${n(sy - sin * (r + 3))} L ${n(sx - cos * (r + 11))} ` +
              `${n(sy - sin * (r + 11))}" ${paint('none', TOKEN.inkMuted)} stroke-width="2" ` +
              'stroke-linecap="round" />',
          );
        }
      }
    }

    // One radius for all three: the check that the picture cannot teach
    // "particles expand when heated", made where the particles are drawn.
    for (const [x, y] of centres) parts.push(dot(x, y, r, TOKEN.accent));
  });

  return parts;
}

/**
 * The heating curve of water: temperature against **energy added**, not time,
 * from ice to steam.
 *
 * **Every length along the energy axis is to scale**, computed from
 * `WATER_HEATING`: the boiling plateau is 2260 / 334 = 6.8 times the melting
 * plateau, and each sloped stretch is its heat capacity times its rise in
 * temperature. Because both axes are to scale, the slopes show the warming
 * rates too: ice and steam need about half the energy per degree that liquid
 * water does, so they climb about twice as steeply. There are no numbers on
 * the energy axis; the only numbers are the two plateaus' temperatures.
 *
 * **Why the curve starts at −80 °C and ends at 180 °C** (neither is printed).
 * At the true scale, the 20 degrees of ice a textbook usually draws would be
 * 3 units wide: a vertical line, which reads as "no energy needed". The ice and
 * steam have to span 80 degrees each before their stretches are wide enough
 * to read as slopes, and they are drawn that far rather than stretched.
 *
 * The labels sit where the curve is not: *melting* under its plateau and
 * *solid* under that, beside the ice; *liquid* right of the water's slope;
 * *boiling* above its plateau; *gas* left of the steam's slope, above
 * *boiling*. Temperature is a heading over the axis, as on the half-life
 * curve, and energy is named under the axis.
 */
function drawHeatingCurve(pen: Pen): string[] {
  const { t, label } = pen;
  const water = WATER_HEATING;
  /** The tick values end 10 units left of the axis. The Russian `100 °C` is about 64. */
  const originX = 92;
  // The axis ends a margin short of `PHONE`, so the canvas is 360 units.
  const axisEnd = PHONE - MARGIN - 2;
  const curveEnd = axisEnd - 12;
  const plotTop = 52;
  const plotHeight = 236;
  const baseline = plotTop + plotHeight;

  const stretches = [
    water.heatCapacity.ice * (water.meltingPoint - water.from),
    water.fusion,
    water.heatCapacity.water * (water.boilingPoint - water.meltingPoint),
    water.vaporisation,
    water.heatCapacity.steam * (water.to - water.boilingPoint),
  ];
  const total = stretches.reduce((sum, energy) => sum + energy, 0);
  const x = (energy: number) => originX + ((curveEnd - originX) * energy) / total;
  const y = (celsius: number) => baseline - (plotHeight * (celsius - water.from)) / (water.to - water.from);

  const temperatures = [water.from, water.meltingPoint, water.meltingPoint, water.boilingPoint, water.boilingPoint, water.to];
  let added = 0;
  const corners = temperatures.map((celsius, index) => {
    if (index > 0) added += stretches[index - 1];
    return [x(added), y(celsius)] as const;
  });
  const [start, meltStart, meltEnd, boilStart, boilEnd, end] = corners;
  if (meltEnd[0] - meltStart[0] < 20 || meltStart[0] - start[0] < 10 || end[0] - boilEnd[0] < 10) {
    throw new Error('02-heating-curve: a stretch of the curve is too short to read.');
  }
  const [y0, y100] = [meltStart[1], boilStart[1]];

  const parts: string[] = [
    label(16, 24, t('axisTemperature'), { room: PHONE - 16 }),
    `<path d="M ${originX} ${plotTop - 14} L ${originX} ${baseline} L ${axisEnd} ${baseline}" ` +
      `${paint('none', TOKEN.ink)} stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />`,
  ];

  // The two temperatures, each with a dashed guide out to its plateau.
  for (const [celsius, plateau] of [
    [water.meltingPoint, meltStart],
    [water.boilingPoint, boilStart],
  ] as const) {
    const level = y(celsius);
    parts.push(
      `<path d="M ${originX} ${n(level)} L ${n(plateau[0])} ${n(level)}" ${paint('none', TOKEN.inkMuted)} ` +
        'stroke-width="2" stroke-dasharray="7 6" />',
      `<path d="M ${originX - 6} ${n(level)} L ${originX} ${n(level)}" ${paint('none', TOKEN.ink)} ` +
        'stroke-width="2.5" stroke-linecap="round" />',
      label(originX - 10, level, t('degrees', { values: { t: celsius } }), {
        room: originX - 10 - 16,
        anchor: 'end',
        central: true,
      }),
    );
  }

  parts.push(
    `<polyline points="${corners.map(([px, py]) => `${n(px)},${n(py)}`).join(' ')}" ` +
      `${paint('none', TOKEN.accent)} stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />`,
  );

  const waterMiddle = [(meltEnd[0] + boilStart[0]) / 2, (y0 + y100) / 2];
  parts.push(
    label(meltStart[0] + 6, y0 + 20, t('melting'), { room: PHONE - meltStart[0] - 6, central: true }),
    label(meltStart[0] + 6, y0 + 52, t('solid'), { room: PHONE - meltStart[0] - 6, central: true }),
    label(waterMiddle[0] + 14, waterMiddle[1], t('liquid'), { room: PHONE - waterMiddle[0] - 14, central: true }),
    label(boilStart[0] + 14, y100 - 16, t('boiling'), { room: boilEnd[0] - boilStart[0] - 28, central: true }),
    label(boilEnd[0] - 10, y100 - 52, t('gas'), {
      room: boilEnd[0] - 10 - boilStart[0],
      anchor: 'end',
      central: true,
    }),
    label(originX, baseline + 28, t('axisEnergy'), { room: axisEnd - originX }),
  );

  return parts;
}

// --- Lewis Structures (task 8) ---------------------------------------------
//
// Two slots on the `lewis-structures` sheet: four molecules as Lewis
// structures (01), and the five VSEPR shapes with their angles (02). Every
// structure is data first — atoms, bonds, lone pairs — and the checks below
// run on that data before anything is drawn, so a drawing with one lone pair
// too many or a missing electron fails the run rather than reaching a student.
//
// The conventions are Share to Fill's (`src/components/games/shared/AtomCanvas`),
// so a student meets one way of drawing a molecule on the site: a bond is a
// line, a double bond two parallel lines, and a lone pair is two filled dots
// on one of the four sides of its atom — never on a side that already has a
// bond. Two things differ, on purpose. The symbols stand on their own, without
// the game's ring round each atom, which is the game's fill meter and not part
// of a Lewis structure. And the dots are in the electron colour the atom sheets
// use for electrons, where the game uses the text colour: on a sheet the
// colour ties the dots to the word "electron", and position and shape still
// carry the meaning on their own. The shared pair is not drawn as dots on the
// line, as the game does while you build: the sheet says a bond is "drawn as a
// line", and a finished structure in a textbook is.

type LewisElement = 'H' | 'B' | 'C' | 'N' | 'O' | 'F';
type LewisSide = 'top' | 'right' | 'bottom' | 'left';

/**
 * Valence electrons: the last digit of the group number (H 1, B 13, C 14,
 * N 15, O 16, F 17), the rule the sheet's first takeaway states.
 */
const LEWIS_VALENCE: Record<LewisElement, number> = { H: 1, B: 3, C: 4, N: 5, O: 6, F: 7 };

/**
 * Electrons round a finished atom, bonding pairs included: 2 for hydrogen (a
 * duet), 8 for the rest (an octet) — except boron, which the sheet's own
 * "Exceptions to the octet" names: BF3 has 6.
 */
const LEWIS_FULL: Record<LewisElement, number> = { H: 2, B: 6, C: 8, N: 8, O: 8, F: 8 };

interface LewisAtom {
  element: LewisElement;
  /** Where slot 01 puts it, in bond lengths from the central atom; right and down are positive. */
  grid: readonly [number, number];
  /** Its lone pairs, each by the side of the atom it is drawn on, as in Share to Fill. */
  lonePairs: readonly LewisSide[];
}

interface LewisMolecule {
  /** As printed, with subscript digits. Checked against the atoms. */
  formula: string;
  /** Total valence electrons, written out so that the count has something to disagree with. */
  electrons: number;
  /** The central atom first. */
  atoms: readonly LewisAtom[];
  /** `[atom, atom, order]`. */
  bonds: readonly (readonly [number, number, 1 | 2])[];
}

const LEWIS_MOLECULES = {
  H2O: {
    formula: 'H₂O',
    electrons: 8,
    atoms: [
      { element: 'O', grid: [0, 0], lonePairs: ['top', 'bottom'] },
      { element: 'H', grid: [-1, 0], lonePairs: [] },
      { element: 'H', grid: [1, 0], lonePairs: [] },
    ],
    bonds: [
      [0, 1, 1],
      [0, 2, 1],
    ],
  },
  NH3: {
    formula: 'NH₃',
    electrons: 8,
    atoms: [
      { element: 'N', grid: [0, 0], lonePairs: ['top'] },
      { element: 'H', grid: [-1, 0], lonePairs: [] },
      { element: 'H', grid: [1, 0], lonePairs: [] },
      { element: 'H', grid: [0, 1], lonePairs: [] },
    ],
    bonds: [
      [0, 1, 1],
      [0, 2, 1],
      [0, 3, 1],
    ],
  },
  CO2: {
    formula: 'CO₂',
    electrons: 16,
    atoms: [
      { element: 'C', grid: [0, 0], lonePairs: [] },
      { element: 'O', grid: [-1, 0], lonePairs: ['top', 'bottom'] },
      { element: 'O', grid: [1, 0], lonePairs: ['top', 'bottom'] },
    ],
    bonds: [
      [0, 1, 2],
      [0, 2, 2],
    ],
  },
  CH4: {
    formula: 'CH₄',
    electrons: 8,
    atoms: [
      { element: 'C', grid: [0, 0], lonePairs: [] },
      { element: 'H', grid: [0, -1], lonePairs: [] },
      { element: 'H', grid: [1, 0], lonePairs: [] },
      { element: 'H', grid: [0, 1], lonePairs: [] },
      { element: 'H', grid: [-1, 0], lonePairs: [] },
    ],
    bonds: [
      [0, 1, 1],
      [0, 2, 1],
      [0, 3, 1],
      [0, 4, 1],
    ],
  },
  // Only slot 02 draws BF3, and it draws no fluorine lone pairs (see there);
  // they are here so that its 24 electrons add up.
  BF3: {
    formula: 'BF₃',
    electrons: 24,
    atoms: [
      { element: 'B', grid: [0, 0], lonePairs: [] },
      { element: 'F', grid: [0, -1], lonePairs: ['left', 'top', 'right'] },
      { element: 'F', grid: [-1, 0], lonePairs: ['top', 'left', 'bottom'] },
      { element: 'F', grid: [1, 0], lonePairs: ['top', 'right', 'bottom'] },
    ],
    bonds: [
      [0, 1, 1],
      [0, 2, 1],
      [0, 3, 1],
    ],
  },
} as const satisfies Record<string, LewisMolecule>;

type LewisFormula = keyof typeof LEWIS_MOLECULES;

const SUBSCRIPTS = '₀₁₂₃₄₅₆₇₈₉';

/** The side of `from` that a bond to `to` leaves by, in slot 01's grid. */
function lewisSide(from: LewisAtom, to: LewisAtom, where: string): LewisSide {
  const [dx, dy] = [to.grid[0] - from.grid[0], to.grid[1] - from.grid[1]];
  if (Math.abs(dx) + Math.abs(dy) !== 1) throw new Error(`${where}: a bond that is not one grid step long.`);
  return dx > 0 ? 'right' : dx < 0 ? 'left' : dy < 0 ? 'top' : 'bottom';
}

/**
 * Every Lewis structure the two slots draw, checked before anything is drawn:
 *
 * - the formula names exactly the atoms drawn;
 * - the valence electrons of those atoms add up to the molecule's stated total
 *   (CO2 16, H2O 8, NH3 8, CH4 8, BF3 24);
 * - bonding pairs and lone pairs together use every one of those electrons,
 *   no more and no fewer;
 * - every atom ends with a duet (H), six (B) or an octet (the rest), counting
 *   two electrons per bond order and two per lone pair;
 * - no lone pair sits on a side that has a bond, and no two share a side.
 *
 * So O in H2O has 2 lone pairs, N in NH3 has 1, each O in CO2 has 2 and C in
 * CO2 has none, because nothing else passes.
 */
function checkLewisMolecule(name: string, molecule: LewisMolecule): void {
  const where = `LEWIS_MOLECULES.${name}`;
  const wanted = new Map<string, number>();
  for (const [, element, digits] of molecule.formula.matchAll(/([A-Z][a-z]?)([₀-₉]*)/g)) {
    const count = digits ? Number([...digits].map((digit) => SUBSCRIPTS.indexOf(digit)).join('')) : 1;
    wanted.set(element, (wanted.get(element) ?? 0) + count);
  }
  const drawn = new Map<string, number>();
  for (const atom of molecule.atoms) drawn.set(atom.element, (drawn.get(atom.element) ?? 0) + 1);
  if ([...wanted].some(([element, count]) => drawn.get(element) !== count) || wanted.size !== drawn.size) {
    throw new Error(`${where}: the atoms are not ${molecule.formula}.`);
  }

  const valence = molecule.atoms.reduce((sum, atom) => sum + LEWIS_VALENCE[atom.element], 0);
  if (valence !== molecule.electrons) {
    throw new Error(`${where}: its atoms bring ${valence} valence electrons, not ${molecule.electrons}.`);
  }
  const bonding = 2 * molecule.bonds.reduce((sum, [, , order]) => sum + order, 0);
  const lone = 2 * molecule.atoms.reduce((sum, atom) => sum + atom.lonePairs.length, 0);
  if (bonding + lone !== molecule.electrons) {
    throw new Error(
      `${where}: ${bonding} electrons in bonds and ${lone} in lone pairs make ${bonding + lone}, ` +
        `not the ${molecule.electrons} it has.`,
    );
  }

  molecule.atoms.forEach((atom, index) => {
    const here = `${where} atom ${index} (${atom.element})`;
    const bonds = molecule.bonds.filter(([a, b]) => a === index || b === index);
    const around = 2 * bonds.reduce((sum, [, , order]) => sum + order, 0) + 2 * atom.lonePairs.length;
    if (around !== LEWIS_FULL[atom.element]) {
      throw new Error(`${here}: ${around} electrons round it, not ${LEWIS_FULL[atom.element]}.`);
    }
    const bonded = bonds.map(([a, b]) => lewisSide(atom, molecule.atoms[a === index ? b : a], here));
    const taken = [...bonded, ...atom.lonePairs];
    if (new Set(taken).size !== taken.length) {
      throw new Error(`${here}: two things on one side (${taken.join(', ')}).`);
    }
  });
}

for (const [name, molecule] of Object.entries(LEWIS_MOLECULES)) checkLewisMolecule(name, molecule);

/** Slot 01's molecules, in reading order, with the string that prints each formula. */
const LEWIS_DRAWN: readonly { formula: LewisFormula; key: string }[] = [
  { formula: 'H2O', key: 'water' },
  { formula: 'NH3', key: 'ammonia' },
  { formula: 'CO2', key: 'carbonDioxide' },
  { formula: 'CH4', key: 'methane' },
];

/**
 * The five shapes, from the sheet's VSEPR paragraph: electron regions round
 * the central atom (each bond counts once, whatever its order; each lone pair
 * once), how many of them are lone pairs, the shape that makes and its bond
 * angle.
 *
 * 180°, 120° and 109.5° are the geometry of 2, 3 and 4 regions. 107° and
 * 104.5° are measured (NH3 106.7°, H2O 104.5°), and they are the figures
 * school textbooks print: each lone pair squeezes the bonds a little closer,
 * which the run checks by requiring the angle to fall as lone pairs replace
 * bonds.
 *
 * `extra` are the bonds and lone pairs out of the page, as bearings in
 * degrees (0 right, 90 up). The two in the page are always drawn symmetric
 * about straight down, so the angle marked between them is the real angle.
 */
const VSEPR_SHAPES: readonly {
  key: string;
  formula: LewisFormula;
  regions: number;
  lonePairs: number;
  angle: number;
  extra: readonly { bearing: number; kind: 'plane' | 'wedge' | 'dash' | 'lobe' }[];
}[] = [
  { key: 'linear', formula: 'CO2', regions: 2, lonePairs: 0, angle: 180, extra: [] },
  { key: 'trigonalPlanar', formula: 'BF3', regions: 3, lonePairs: 0, angle: 120, extra: [{ bearing: 90, kind: 'plane' }] },
  {
    key: 'tetrahedral',
    formula: 'CH4',
    regions: 4,
    lonePairs: 0,
    angle: 109.5,
    extra: [
      { bearing: 55, kind: 'wedge' },
      { bearing: 125, kind: 'dash' },
    ],
  },
  // NH3 and H2O are CH4 with one and then two bonds replaced by a lone pair,
  // in the same places, so the three read as one family down the page.
  {
    key: 'trigonalPyramidal',
    formula: 'NH3',
    regions: 4,
    lonePairs: 1,
    angle: 107,
    extra: [
      { bearing: 55, kind: 'wedge' },
      { bearing: 125, kind: 'lobe' },
    ],
  },
  {
    key: 'bent',
    formula: 'H2O',
    regions: 4,
    lonePairs: 2,
    angle: 104.5,
    extra: [
      { bearing: 55, kind: 'lobe' },
      { bearing: 125, kind: 'lobe' },
    ],
  },
];

/** The string that prints each molecule's formula under its shape in slot 02. */
const VSEPR_FORMULA_KEY: Record<LewisFormula, string> = {
  CO2: 'carbonDioxide',
  BF3: 'boronTrifluoride',
  CH4: 'methane',
  NH3: 'ammonia',
  H2O: 'water',
};

/** The shape the sheet's paragraph gives for so many regions and so many lone pairs. */
const VSEPR_RULE: Record<string, string> = {
  '2/0': 'linear',
  '3/0': 'trigonalPlanar',
  '4/0': 'tetrahedral',
  '4/1': 'trigonalPyramidal',
  '4/2': 'bent',
};
const VSEPR_IDEAL: Record<number, number> = { 2: 180, 3: 120, 4: 109.5 };

for (const shape of VSEPR_SHAPES) {
  const where = `VSEPR_SHAPES.${shape.key}`;
  const molecule: LewisMolecule = LEWIS_MOLECULES[shape.formula];
  const neighbours = molecule.bonds.filter(([a, b]) => a === 0 || b === 0).length;
  const lonePairs = molecule.atoms[0].lonePairs.length;
  if (neighbours + lonePairs !== shape.regions || lonePairs !== shape.lonePairs) {
    throw new Error(
      `${where}: ${shape.formula}'s central atom has ${neighbours} bonds and ${lonePairs} lone pairs, ` +
        `not ${shape.regions} regions with ${shape.lonePairs} lone pairs.`,
    );
  }
  if (VSEPR_RULE[`${shape.regions}/${shape.lonePairs}`] !== shape.key) {
    throw new Error(`${where}: ${shape.regions} regions with ${shape.lonePairs} lone pairs is not ${shape.key}.`);
  }
  const ideal = VSEPR_IDEAL[shape.regions];
  if (shape.lonePairs === 0 ? shape.angle !== ideal : !(shape.angle < ideal)) {
    throw new Error(`${where}: ${shape.angle}° does not fit ${shape.regions} regions (${ideal}° ideal).`);
  }
  const drawnBonds = 2 + shape.extra.filter((item) => item.kind !== 'lobe').length;
  const drawnLobes = shape.extra.filter((item) => item.kind === 'lobe').length;
  if (drawnBonds !== neighbours || drawnLobes !== lonePairs) {
    throw new Error(`${where}: draws ${drawnBonds} bonds and ${drawnLobes} lobes for ${shape.formula}.`);
  }
}
// Lone pairs push harder than bonds: the more of them, the smaller the angle.
for (let index = 1; index < VSEPR_SHAPES.length; index += 1) {
  const [before, after] = [VSEPR_SHAPES[index - 1], VSEPR_SHAPES[index]];
  if (before.regions === after.regions && after.lonePairs > before.lonePairs && !(after.angle < before.angle)) {
    throw new Error(`VSEPR_SHAPES: ${after.key} has more lone pairs than ${before.key} and no smaller an angle.`);
  }
}

/** Every atom symbol in both slots: the one focal item, larger than a label. */
const LEWIS_SYMBOL = { item: 'atom symbols', size: 26 };

/** How far a bond line stops short of an atom's centre, clear of its symbol. */
const LEWIS_CLEAR = 14;

/** A bond of `order` lines between two points, each end stopping `LEWIS_CLEAR` short. */
function lewisBond(x1: number, y1: number, x2: number, y2: number, order: number): string {
  const length = Math.hypot(x2 - x1, y2 - y1);
  const [ux, uy] = [(x2 - x1) / length, (y2 - y1) / length];
  const offsets = order === 1 ? [0] : order === 2 ? [-4, 4] : [-7, 0, 7];
  const d = offsets
    .map((offset) => {
      const [px, py] = [-uy * offset, ux * offset];
      return (
        `M ${n(x1 + ux * LEWIS_CLEAR + px)} ${n(y1 + uy * LEWIS_CLEAR + py)} ` +
        `L ${n(x2 - ux * LEWIS_CLEAR + px)} ${n(y2 - uy * LEWIS_CLEAR + py)}`
      );
    })
    .join(' ');
  return `<path d="${d}" ${paint('none', TOKEN.ink)} stroke-width="3" stroke-linecap="round" />`;
}

/** A leader from `(x1, y1)` towards `(x2, y2)`, stopping `short` before it. */
function lewisLeader(x1: number, y1: number, x2: number, y2: number, short: number): string {
  const length = Math.hypot(x2 - x1, y2 - y1);
  const keep = (length - short) / length;
  return leader(x1, y1, x1 + (x2 - x1) * keep, y1 + (y2 - y1) * keep);
}

/** Checks that a label prints the molecule it stands under, in every locale. */
function lewisFormulaIn(words: Words, formula: LewisFormula, where: string): Words {
  if (!words.text.includes(LEWIS_MOLECULES[formula].formula)) {
    throw new Error(`${where}: "${words.text}" does not print ${LEWIS_MOLECULES[formula].formula}.`);
  }
  return words;
}

// --- 01. Four Lewis structures ----------------------------------------------

/**
 * H2O, NH3, CO2 and CH4, two by two, each with its formula underneath.
 *
 * **Laid out on the four sides of each atom, as Share to Fill lays them out**:
 * H–O–H in a row with O's two lone pairs above and below it, NH3 with its lone
 * pair on top, O=C=O with two pairs on each O and none on C, and CH4 as a
 * cross. A Lewis structure is a count, not a shape — the section below it,
 * with slot 02, is where shape comes in — so the square grid is honest here.
 *
 * **Two words, each named once, with a leader to one of its kind:** the lone
 * pair above water's oxygen, and a shared pair, one of ammonia's N–H lines,
 * using the sheet's own term for it. They sit above the molecules, stacked and
 * at opposite ends of the width, so that neither leader crosses the other's
 * words in any language.
 *
 * Every dot, line and pair comes from `LEWIS_MOLECULES`, which the run checks
 * above; the drawing cannot put a lone pair anywhere the data does not.
 */
function drawLewisStructures(pen: Pen): string[] {
  const { t, symbol, label } = pen;
  const bond = 56;
  /** A lone pair's two dots: this far from the atom's centre, this far either side of its middle. */
  const [orbit, halfGap, dotRadius] = [20, 5, 3.2];
  const cells = [
    [95, 118],
    [265, 118],
    [95, 298],
    [265, 298],
  ] as const;
  const sideVector: Record<LewisSide, readonly [number, number]> = {
    top: [0, -1],
    right: [1, 0],
    bottom: [0, 1],
    left: [-1, 0],
  };
  const parts: string[] = [];

  LEWIS_DRAWN.forEach(({ formula, key }, index) => {
    const [cx, cy] = cells[index];
    const molecule: LewisMolecule = LEWIS_MOLECULES[formula];
    const place = (atom: LewisAtom): [number, number] => [cx + atom.grid[0] * bond, cy + atom.grid[1] * bond];
    for (const [a, b, order] of molecule.bonds) {
      const [x1, y1] = place(molecule.atoms[a]);
      const [x2, y2] = place(molecule.atoms[b]);
      parts.push(lewisBond(x1, y1, x2, y2, order));
    }
    for (const atom of molecule.atoms) {
      const [x, y] = place(atom);
      parts.push(label(x, y, symbol(atom.element), { room: 30, anchor: 'middle', central: true, focal: LEWIS_SYMBOL }));
      for (const side of atom.lonePairs) {
        const [vx, vy] = sideVector[side];
        const [mx, my] = [x + vx * orbit, y + vy * orbit];
        parts.push(
          dot(mx - vy * halfGap, my + vx * halfGap, dotRadius, TOKEN.electron),
          dot(mx + vy * halfGap, my - vx * halfGap, dotRadius, TOKEN.electron),
        );
      }
    }
    parts.push(
      label(cx, cy + 92, lewisFormulaIn(t(key), formula, `${key} [${pen.locale}]`), { room: 150, anchor: 'middle' }),
    );
  });

  // The lone pair: water's top one. The shared pair: ammonia's right-hand N–H.
  const [waterX, waterY] = cells[0];
  const [ammoniaX, ammoniaY] = cells[1];
  /**
   * The shared-pair label ends here, right-aligned, and may start no further
   * left than 100 — where the lone pair's leader passes under it.
   */
  const sharedEnd = 344;
  parts.push(
    label(16, 24, t('lonePair'), { room: PHONE - 16, fill: TOKEN.electron }),
    lewisLeader(40, 32, waterX, waterY - orbit, 8),
    label(sharedEnd, 50, t('sharedPair'), { room: sharedEnd - 100, anchor: 'end' }),
    lewisLeader(320, 58, ammoniaX + bond / 2, ammoniaY, 6),
  );

  return parts;
}

// --- 02. The five VSEPR shapes ----------------------------------------------

/**
 * Linear, trigonal planar, tetrahedral, trigonal pyramidal and bent, two to a
 * row, each with one caption under it: its formula, and below that its shape
 * and its angle. The formula has a line of its own, so every caption reads the
 * same way whether or not its shape name has to wrap.
 *
 * **Drawn in 3D the way a textbook draws it.** A plain line is a bond in the
 * page, a solid wedge one coming out of it, a hashed wedge one going behind.
 * The two bonds in the page always open downwards, symmetric about straight
 * down, and a thin arc between them marks the angle the label gives — which
 * is the real angle, measured back from the drawn atoms in the run.
 *
 * **Lone pairs are lobes**, on NH3 and H2O's central atoms, each holding the
 * two dots slot 01 draws for a lone pair, so it is recognisably the same
 * thing, now taking up room. CH4, NH3 and H2O put their wedge, dash and lobes
 * in the same two places, so the eye sees a bond become a lone pair, and then
 * another. The lone pairs on CO2's oxygens and BF3's fluorines are not drawn:
 * they do not decide the shape, and every shape figure leaves them out.
 *
 * **Two columns and three rows** keeps the canvas inside the width a 375 px
 * phone shows, with every label under its molecule; the type is not shrunk.
 */
function drawVseprShapes(pen: Pen): string[] {
  const { t, symbol, label } = pen;
  const bond = 50;
  const cells = [
    [95, 92],
    [265, 92],
    [95, 310],
    [265, 310],
    [95, 528],
  ] as const;
  const arcRadius = 24;
  const parts: string[] = [];

  VSEPR_SHAPES.forEach((shape, index) => {
    const [cx, cy] = cells[index];
    const molecule: LewisMolecule = LEWIS_MOLECULES[shape.formula];
    const where = `${shape.key} [${pen.locale}]`;
    const bearings = [
      { bearing: 270 - shape.angle / 2, kind: 'plane' as const },
      { bearing: 270 + shape.angle / 2, kind: 'plane' as const },
      ...shape.extra,
    ];
    const outer = molecule.bonds.filter(([a, b]) => a === 0 || b === 0);
    const bonded = bearings.filter((item) => item.kind !== 'lobe');
    const placed: [number, number][] = [];

    bonded.forEach(({ bearing, kind }, slot) => {
      const [a, b, order] = outer[slot];
      const atom = molecule.atoms[a === 0 ? b : a];
      const [x, y] = at(cx, cy, bearing, bond);
      placed.push([x, y]);
      if (kind === 'plane') {
        parts.push(lewisBond(cx, cy, x, y, order));
      } else {
        const [dx, dy] = [(x - cx) / bond, (y - cy) / bond];
        const [start, end] = [LEWIS_CLEAR, bond - LEWIS_CLEAR];
        if (kind === 'wedge') {
          const [tipX, tipY] = [cx + dx * start, cy + dy * start];
          const [baseX, baseY] = [cx + dx * end, cy + dy * end];
          parts.push(
            `<path d="M ${n(tipX - dy)} ${n(tipY + dx)} L ${n(baseX - dy * 5.5)} ${n(baseY + dx * 5.5)} ` +
              `L ${n(baseX + dy * 5.5)} ${n(baseY - dx * 5.5)} L ${n(tipX + dy)} ${n(tipY - dx)} Z" ${paint(TOKEN.ink)} />`,
          );
        } else {
          const hashes = 6;
          const d = Array.from({ length: hashes }, (_, k) => {
            const along = start + ((end - start) * (k + 0.5)) / hashes;
            const half = 1.2 + (4.3 * (k + 0.5)) / hashes;
            const [mx, my] = [cx + dx * along, cy + dy * along];
            return `M ${n(mx - dy * half)} ${n(my + dx * half)} L ${n(mx + dy * half)} ${n(my - dx * half)}`;
          }).join(' ');
          parts.push(`<path d="${d}" ${paint('none', TOKEN.ink)} stroke-width="2" />`);
        }
      }
      parts.push(label(x, y, symbol(atom.element), { room: 30, anchor: 'middle', central: true, focal: LEWIS_SYMBOL }));
    });

    // The angle is measured back from where the two atoms in the page landed.
    const [[ax, ay], [bx, by]] = placed;
    const measured =
      (Math.acos(((ax - cx) * (bx - cx) + (ay - cy) * (by - cy)) / (Math.hypot(ax - cx, ay - cy) * Math.hypot(bx - cx, by - cy))) *
        180) /
      Math.PI;
    if (Math.abs(measured - shape.angle) > 0.5) {
      throw new Error(`${where}: the atoms in the page are ${measured.toFixed(1)}° apart, not ${shape.angle}°.`);
    }
    const arc: string[] = [];
    const steps = Math.ceil(shape.angle / 5);
    for (let step = 0; step <= steps; step += 1) {
      const [x, y] = at(cx, cy, 270 - shape.angle / 2 + (shape.angle * step) / steps, arcRadius);
      arc.push(`${n(x)},${n(y)}`);
    }
    parts.push(`<polyline points="${arc.join(' ')}" ${paint('none', TOKEN.inkMuted)} stroke-width="1.5" />`);

    // A lobe: a balloon from just outside the symbol, with the lone pair's two dots in it.
    for (const { bearing } of bearings.filter((item) => item.kind === 'lobe')) {
      const [dx, dy] = [Math.cos((bearing * Math.PI) / 180), -Math.sin((bearing * Math.PI) / 180)];
      const [base, half, width] = [LEWIS_CLEAR, 17, 13];
      const points = Array.from({ length: 40 }, (_, k) => {
        const theta = (2 * Math.PI * k) / 40;
        const along = base + half * (1 - Math.cos(theta));
        const across = width * Math.sin(theta) * Math.sqrt((1 - Math.cos(theta)) / 2);
        return `${n(cx + dx * along - dy * across)} ${n(cy + dy * along + dx * across)}`;
      });
      parts.push(
        `<path d="M ${points.join(' L ')} Z" ${paint(TOKEN.electron, TOKEN.electron)} fill-opacity="0.14" ` +
          'stroke-width="2" stroke-linejoin="round" />',
      );
      const [mx, my] = [cx + dx * (base + half * 1.2), cy + dy * (base + half * 1.2)];
      parts.push(dot(mx - dy * 5, my + dx * 5, 3.2, TOKEN.electron), dot(mx + dy * 5, my - dx * 5, 3.2, TOKEN.electron));
    }

    parts.push(label(cx, cy, symbol(molecule.atoms[0].element), { room: 30, anchor: 'middle', central: true, focal: LEWIS_SYMBOL }));
    // The caption: the formula, and under it the shape and its angle, on up to three lines.
    const formulaKey = VSEPR_FORMULA_KEY[shape.formula];
    parts.push(
      label(cx, cy + 68, lewisFormulaIn(t(formulaKey), shape.formula, where), { room: 164, anchor: 'middle' }),
      label(cx, cy + 91, t(shape.key, { numbers: [shape.angle] }), { room: 164, anchor: 'middle', lines: 3 }),
    );
  });

  return parts;
}

// --- Functional Groups (task 9) ---

/**
 * Real subscripts and superscripts in a label, for a reagent's formula.
 *
 * A formula in the strings table is written the way the rest of the site
 * writes one for `MoleculeText`: plain digits (`H2SO4`), a charge at the end
 * of its formula (`OH−`, `H+`), and a charge that has digits after a space
 * (`Cr2O7 2−`). In these strings that space is a **no-break space**, so the
 * charge can never be wrapped onto a line of its own. The strings stay exactly
 * what the page's `textContent` is, which is what the e2e spec matches.
 *
 * `label()` places, measures and wraps the label as usual — it measures every
 * digit at full size, so a label it passes fits with its small digits too —
 * and this redraws its content: each digit after an element symbol or a
 * bracket becomes a lowered `<tspan>`, and each charge a raised one, both at
 * `FORMULA_SMALL`. The shifts are `dy`, not `baseline-shift`, which Firefox
 * ignores in SVG. A word is left alone: only a whole term that parses as a
 * formula (`H3PO4`, `OH−`; not `Katalysator`, `(aq)` or `alcool`) is touched,
 * and one with no digit or charge (`HX`) comes out unchanged.
 */
const FORMULA_SMALL = 12.5;
const FORMULA_SUB = 4.5;
const FORMULA_SUP = -7;
/** How far the no-break space before a digit charge is pulled back, so `O₇²⁻` has no gap. */
const FORMULA_CHARGE_PULL = FORMULA_SMALL * 0.27;

const FORMULA_TERM = /^(?:(?:[A-Z][a-z]?|[()])\d*)+[+−-]?$/;
const DIGIT_CHARGE = /^\d+[+−-]$/;

interface FormulaRun {
  text: string;
  /** 0 on the line, 1 lowered, -1 raised. */
  shift: 0 | 1 | -1;
  /** Starts with the no-break space that joins a digit charge to its formula. */
  pulled?: boolean;
}

function formulaRuns(line: string): FormulaRun[] {
  const runs: FormulaRun[] = [];
  const push = (text: string, shift: FormulaRun['shift'], pulled = false) => {
    const last = runs[runs.length - 1];
    if (last && last.shift === shift && !pulled) last.text += text;
    else runs.push({ text, shift, pulled });
  };
  const tokens = line.split(/([  /,])/).filter((token) => token !== '');
  let previousWasFormula = false;
  tokens.forEach((token, index) => {
    if (token === NBSP && previousWasFormula && DIGIT_CHARGE.test(tokens[index + 1] ?? '')) {
      push(`${NBSP}${tokens[index + 1]}`, -1, true);
      tokens[index + 1] = '';
      return;
    }
    if (token === '') return;
    if (/[A-Z]/.test(token) && FORMULA_TERM.test(token)) {
      let afterSymbol = false;
      for (const char of token) {
        if (/\d/.test(char) && afterSymbol) push(char, 1);
        else if (/[+−-]/.test(char)) push(char === '-' ? '−' : char, -1);
        else {
          push(char, 0);
          afterSymbol = /[A-Za-z()]/.test(char);
        }
      }
      previousWasFormula = true;
      return;
    }
    push(token, 0);
    previousWasFormula = false;
  });
  return runs;
}

function unescapeXml(value: string): string {
  return value.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
}

/** `pen.label()`, with the formulae in its words set with real sub- and superscripts. */
function formulaLabel(pen: Pen, x: number, y: number, words: Words, options: LabelOptions): string {
  const drawn = pen.label(x, y, words, options);
  const match = /^(<text [^>]*>)([\s\S]*)<\/text>$/.exec(drawn);
  if (!match) throw new Error(`${words.source}: label() drew something formulaLabel() cannot read.`);
  const [, open, content] = match;
  const lines = content.startsWith('<tspan')
    ? [...content.matchAll(/<tspan x="([^"]+)" dy="([^"]+)">([^<]*)<\/tspan>/g)].map(([, lineX, , text]) => ({
        x: lineX,
        text: unescapeXml(text),
      }))
    : [{ x: null, text: unescapeXml(content) }];

  const offset = (shift: FormulaRun['shift']) => (shift === 1 ? FORMULA_SUB : shift === -1 ? FORMULA_SUP : 0);
  /** Where the pen is, below the current line's baseline. */
  let current = 0;
  const out: string[] = [];
  lines.forEach((line, index) => {
    formulaRuns(line.text).forEach((run, runIndex) => {
      const target = offset(run.shift);
      const lineStart = index > 0 && runIndex === 0;
      const dy = (lineStart ? LEADING : 0) + target - current;
      current = target;
      const attributes = [
        lineStart ? `x="${line.x}"` : '',
        dy !== 0 ? `dy="${n(dy)}"` : '',
        run.pulled ? `dx="${n(-FORMULA_CHARGE_PULL)}"` : '',
        run.shift !== 0 ? `font-size="${FORMULA_SMALL}"` : '',
      ].filter(Boolean);
      out.push(attributes.length ? `<tspan ${attributes.join(' ')}>${esc(run.text)}</tspan>` : esc(run.text));
    });
  });
  return `${open}${out.join('')}</text>`;
}

/**
 * An arrow along a path of straight segments, for a route that turns a corner.
 * The head is `arrow()`'s, on the last segment.
 */
function elbowArrow(points: readonly (readonly [number, number])[], head = 12): string {
  const [x1, y1] = points[points.length - 2];
  const [x2, y2] = points[points.length - 1];
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const [cos, sin] = [Math.cos(angle), Math.sin(angle)];
  const [bx, by] = [x2 - head * cos, y2 - head * sin];
  const wing = head * 0.5;
  const line = [...points.slice(0, -1), [bx, by] as const]
    .map(([px, py], index) => `${index === 0 ? 'M' : 'L'} ${n(px)} ${n(py)}`)
    .join(' ');
  return (
    `<path d="${line}" ${paint('none', TOKEN.ink)} stroke-width="2.5" stroke-linecap="round" ` +
    'stroke-linejoin="round" />' +
    `<path d="M ${n(x2)} ${n(y2)} L ${n(bx + wing * sin)} ${n(by - wing * cos)} ` +
    `L ${n(bx - wing * sin)} ${n(by + wing * cos)} Z" ${paint(TOKEN.ink)} />`
  );
}

/**
 * The reaction pathway, as a map: the groups in boxes, the reagents on the
 * arrows, and nothing else.
 *
 * **Top to bottom, down the left.** The spine is the one route a student must
 * know end to end — alkene, primary alcohol, aldehyde, carboxylic acid, ester
 * — in a column of boxes on the left, each arrow's reagent to the right of it.
 * A phone shows that column first, and it is the whole of the pathway. The
 * right-hand column holds what branches off it: the haloalkane, the detour an
 * alkene can take to the same alcohol, and the secondary alcohol beside the
 * primary one, whose one oxidation stops at a ketone.
 *
 * **Reagents only, and as a VCE student writes them.** H₂O with an H₃PO₄
 * catalyst for hydration (the steam-and-phosphoric-acid process; the prose
 * above says the same), HX, OH⁻(aq), acidified dichromate on every oxidation
 * arrow, and an alcohol with a concentrated H₂SO₄ catalyst for
 * esterification. Every formula has real sub- and superscripts
 * (`formulaLabel`). Heat and reflux are left to the prose.
 *
 * **Tertiary alcohols are left to the prose**, which says they do not
 * oxidise. A crossed-out stub needs a box, an arrow, a cross and a phrase, and
 * the only room for it is beside the esterification arrow, whose label then
 * has to wrap onto three lines in German and Russian.
 *
 * **The arrows into the primary alcohol are the school simplification**:
 * ethene gives ethanol and chloroethane gives ethanol. A longer alkene is
 * hydrated mostly to a secondary alcohol; the alt text does not claim
 * otherwise, and the sheet's level does not need it.
 *
 * The group names are the labels, so the ~6-label cap does not apply to the
 * boxes. No focal item: every box is as important as the next.
 */
function drawReactionMap(pen: Pen): string[] {
  const { t, label, lineCount } = pen;
  const boxHeight = 56;
  const left = { x: 16, width: 160 };
  const right = { x: 192, width: 150 };
  /** The spine's arrows run down here, with their reagents just right of them. */
  const spine = 44;
  const reagentX = spine + 12;
  /** The side column's arrow, and its reagent. */
  const side = right.x + 18;
  const sideReagentX = side + 12;
  const rows = { alkene: 16, haloalkane: 150, alcohol: 290, carbonyl: 398, acid: 506, ester: 634 };
  const gap = 4;

  const parts: string[] = [];

  const box = (column: { x: number; width: number }, top: number, key: string) => {
    const words = t(key);
    const room = column.width - 16;
    const count = lineCount(words, room);
    parts.push(
      frame(column.x, top, column.width, boxHeight),
      label(column.x + column.width / 2, top + boxHeight / 2 - ((count - 1) * LEADING) / 2, words, {
        room,
        anchor: 'middle',
        central: true,
        lines: 2,
      }),
    );
  };

  /** A reagent beside a vertical arrow, centred on the arrow's middle. */
  const reagent = (x: number, top: number, bottom: number, key: string, room: number, lines = 1) => {
    const words = t(key);
    const count = lineCount(words, room);
    const middle = (top + bottom) / 2 - ((count - 1) * LEADING) / 2;
    parts.push(formulaLabel(pen, x, middle, words, { room, central: true, lines }));
  };

  const bottom = (top: number) => top + boxHeight;

  // The spine: alkene, primary alcohol, aldehyde, carboxylic acid, ester.
  box(left, rows.alkene, 'alkene');
  box(left, rows.alcohol, 'primaryAlcohol');
  box(left, rows.carbonyl, 'aldehyde');
  box(left, rows.acid, 'carboxylicAcid');
  box(left, rows.ester, 'ester');

  // Hydration: the long arrow straight down, its reagent in the band under
  // the alkene, which nothing else crosses. The elbow to the haloalkane turns
  // down right of it, so the band runs from the arrow to the elbow.
  const elbowX = 296;
  parts.push(arrow(spine, bottom(rows.alkene) + gap, spine, rows.alcohol - gap));
  reagent(reagentX, bottom(rows.alkene) + 8, rows.haloalkane - 8, 'hydration', elbowX - 12 - reagentX, 2);

  // The detour: along and down to the haloalkane, then back to the alcohol.
  const alkeneMiddle = rows.alkene + boxHeight / 2;
  box(right, rows.haloalkane, 'haloalkane');
  parts.push(
    elbowArrow([
      [left.x + left.width + gap, alkeneMiddle],
      [elbowX, alkeneMiddle],
      [elbowX, rows.haloalkane - gap],
    ]),
  );
  const elbowMiddle = (left.x + left.width + elbowX) / 2;
  parts.push(
    formulaLabel(pen, elbowMiddle, alkeneMiddle - 12, t('addition'), {
      room: elbowX - left.x - left.width - 16,
      anchor: 'middle',
    }),
  );
  const [fromX, fromY] = [right.x + 20, bottom(rows.haloalkane) + gap];
  const [toX, toY] = [left.x + left.width - 20, rows.alcohol - gap];
  parts.push(arrow(fromX, fromY, toX, toY));
  parts.push(
    formulaLabel(pen, (fromX + toX) / 2 + 18, (fromY + toY) / 2, t('substitution'), {
      room: PHONE - 16 - ((fromX + toX) / 2 + 18),
      central: true,
    }),
  );

  // Oxidation, twice down the spine and once down the side.
  for (const [from, to] of [
    [rows.alcohol, rows.carbonyl],
    [rows.carbonyl, rows.acid],
  ] as const) {
    parts.push(arrow(spine, bottom(from) + gap, spine, to - gap));
    reagent(reagentX, bottom(from), to, 'oxidation', right.x - 6 - reagentX);
  }
  box(right, rows.alcohol, 'secondaryAlcohol');
  box(right, rows.carbonyl, 'ketone');
  parts.push(arrow(side, bottom(rows.alcohol) + gap, side, rows.carbonyl - gap));
  reagent(sideReagentX, bottom(rows.alcohol), rows.carbonyl, 'oxidation', PHONE - 16 - sideReagentX);

  // Esterification: the right-hand column is empty here, so the reagent has
  // the width of the drawing.
  parts.push(arrow(spine, bottom(rows.acid) + gap, spine, rows.ester - gap));
  reagent(reagentX, bottom(rows.acid), rows.ester, 'esterification', PHONE - 16 - reagentX, 2);

  return parts;
}

// --- Small diagrams A (task 10a) ---
//
// One small diagram on each of four sheets that had none: a carbon atom
// balancing twelve hydrogens (relative-formula-mass/01), 2H2 + O2 → 2H2O as
// particles with its atom counts (balancing-equations/01), the three bonding
// models (chemical-bonds/01), and the pH scale in universal-indicator colours
// (acids-and-bases/01). Each is drawn from a constant below, and each constant
// is checked before anything is drawn.

/**
 * One carbon atom against twelve hydrogen atoms, for
 * `relative-formula-mass/01-carbon-hydrogen-balance`.
 *
 * The relative masses are the standard atomic weights (C 12.011, H 1.008;
 * `src/core-engine/data/elements.ts` has the same), and the run checks that
 * twelve hydrogens really do come out level with one carbon: 12 × 1.008 is
 * within 1% of 12.011, and 12.011 / 1.008 rounds to 12. With the class-table
 * values the sheet uses, H 1 and C 12, the two pans are exactly equal.
 *
 * **Carbon is drawn larger than hydrogen, and nowhere near twelve times the
 * area.** The radii are in the ratio of the two atoms' covalent radii as a
 * school table gives them (C 77 pm, H 37 pm: about 2.1), so carbon has about
 * 4.4 times hydrogen's area, not 12. An atom's size says nothing about its
 * mass — a picture whose areas balanced would teach exactly that — and the
 * run fails if carbon is drawn at half of 12 times the area or more. The
 * drawing still says "not to scale", because nothing in it is: the atoms are
 * a hundred million times the size of the balance.
 */
const CARBON_HYDROGEN_BALANCE = {
  carbon: { symbol: 'C', relativeMass: 12.011, classMass: 12, radius: 23 },
  hydrogen: { symbol: 'H', relativeMass: 1.008, classMass: 1, radius: 11 },
  hydrogens: 12,
  /** The hydrogens' pile on their pan, bottom row first. */
  rows: [5, 4, 3],
} as const;
{
  const { carbon, hydrogen, hydrogens, rows } = CARBON_HYDROGEN_BALANCE;
  if (Math.round(carbon.relativeMass / hydrogen.relativeMass) !== hydrogens) {
    throw new Error('CARBON_HYDROGEN_BALANCE: carbon is not about twelve times as heavy as hydrogen.');
  }
  if (Math.abs(hydrogens * hydrogen.relativeMass - carbon.relativeMass) / carbon.relativeMass > 0.01) {
    throw new Error('CARBON_HYDROGEN_BALANCE: the twelve hydrogens are more than 1% off one carbon.');
  }
  if (hydrogens * hydrogen.classMass !== carbon.classMass) {
    throw new Error('CARBON_HYDROGEN_BALANCE: with the class-table masses the pans are not level.');
  }
  if (rows.reduce((sum, count) => sum + count, 0) !== hydrogens) {
    throw new Error('CARBON_HYDROGEN_BALANCE: the pile does not hold twelve hydrogens.');
  }
  const areaRatio = (carbon.radius / hydrogen.radius) ** 2;
  if (!(areaRatio > 1 && areaRatio < hydrogens / 2)) {
    throw new Error(
      `CARBON_HYDROGEN_BALANCE: carbon is drawn at ${areaRatio.toFixed(1)} times hydrogen's area. It must be ` +
        'larger, and nowhere near 12 times, or the picture says an atom\'s size is its mass.',
    );
  }
}

/**
 * The balance, level, with one carbon atom on the left pan and twelve
 * hydrogen atoms piled on the right.
 *
 * A two-pan balance hanging its pans from the ends of the beam, on one stand:
 * the picture the section's paragraph describes. The beam is drawn level
 * because the run has checked, above, that the two pans weigh the same; the
 * stand is between the pans, and each pan's strings clear the atoms on it.
 * Each atom is a ring with its symbol in it; under each pan, how many atoms
 * it holds. The only other words are the not-to-scale caveat.
 */
function drawCarbonHydrogenBalance(pen: Pen): string[] {
  const { t, symbol, whole, label } = pen;
  const { carbon, hydrogen, hydrogens, rows } = CARBON_HYDROGEN_BALANCE;
  const pivotX = 180;
  const beamY = 64;
  const arm = 86;
  /** The top of each pan, where the atoms rest. */
  const panY = 196;
  const panHalf = 68;
  const footY = 212;
  const [leftX, rightX] = [pivotX - arm, pivotX + arm];
  const parts: string[] = [];

  // The stand and its fulcrum, then the beam across it.
  parts.push(
    `<path d="M ${pivotX} ${beamY} L ${pivotX - 11} ${beamY + 18} L ${pivotX + 11} ${beamY + 18} Z" ${paint(TOKEN.ink)} />`,
    `<path d="M ${pivotX} ${beamY + 18} L ${pivotX} ${footY} M ${pivotX - 14} ${footY} L ${pivotX + 14} ${footY}" ` +
      `${paint('none', TOKEN.ink)} stroke-width="3" stroke-linecap="round" />`,
    `<path d="M ${leftX} ${beamY} L ${rightX} ${beamY}" ${paint('none', TOKEN.ink)} stroke-width="4" stroke-linecap="round" />`,
  );

  // Each pan hangs from its end of the beam on two strings.
  for (const x of [leftX, rightX]) {
    parts.push(
      `<path d="M ${x - panHalf + 2} ${panY} L ${x} ${beamY} L ${x + panHalf - 2} ${panY}" ` +
        `${paint('none', TOKEN.inkMuted)} stroke-width="1.5" stroke-linejoin="round" />`,
      `<path d="M ${x - panHalf} ${panY} L ${x + panHalf} ${panY} L ${x + panHalf - 12} ${panY + 12} ` +
        `L ${x - panHalf + 12} ${panY + 12} Z" ${paint('none', TOKEN.ink)} stroke-width="2.5" stroke-linejoin="round" />`,
    );
  }

  // One carbon atom, resting on the left pan.
  const carbonY = panY - 1.5 - carbon.radius;
  parts.push(
    ring(leftX, carbonY, carbon.radius, TOKEN.ink, 2.5),
    label(leftX, carbonY, symbol(carbon.symbol), { room: 2 * carbon.radius - 4, anchor: 'middle', central: true }),
  );

  // Twelve hydrogen atoms, piled in touching rows on the right pan.
  let drawn = 0;
  rows.forEach((count, row) => {
    const y = panY - 1.5 - hydrogen.radius - row * hydrogen.radius * Math.sqrt(3);
    for (let index = 0; index < count; index += 1) {
      const x = rightX + (index - (count - 1) / 2) * 2 * hydrogen.radius;
      parts.push(
        ring(x, y, hydrogen.radius, TOKEN.ink, 2),
        label(x, y, symbol(hydrogen.symbol), { room: 2 * hydrogen.radius - 2, anchor: 'middle', central: true }),
      );
      drawn += 1;
    }
  });
  if (drawn !== hydrogens) throw new Error(`01-carbon-hydrogen-balance: drew ${drawn} hydrogens, not ${hydrogens}.`);

  // What each pan holds, under it: the count, the figure's one focal item,
  // since 1 against 12 is the whole idea, and under it what is counted. The
  // count has a line of its own on purpose. Run together, "12
  // Wasserstoffatome" is wider than the room under a pan, and the wrap left
  // the 12 alone on a line as if by accident. A noun may be wider than its
  // pan — the German «Kohlenstoffatom» is — and still stops short of the
  // canvas edge and of the other pan's words. The caveat goes under both.
  const countY = panY + 44;
  const nounY = countY + 26;
  const labelRoom = 2 * (leftX - 16);
  const counts = { item: 'atom counts', size: 28, bold: true };
  parts.push(
    label(leftX, countY, whole(1), { room: 60, anchor: 'middle', focal: counts }),
    label(rightX, countY, whole(hydrogens), { room: 60, anchor: 'middle', focal: counts }),
    label(leftX, nounY, t('carbonAtom'), { room: labelRoom, anchor: 'middle', lines: 2 }),
    label(rightX, nounY, t('hydrogenAtoms'), { room: labelRoom, anchor: 'middle', lines: 2 }),
    label(16, nounY + LEADING + 32, t('notToScale'), { room: PHONE - 16 }),
  );

  return parts;
}

/**
 * 2H2 + O2 → 2H2O, for `balancing-equations/01-particle-equation`.
 *
 * Each species is its coefficient and its formula; the run reads the atoms
 * out of each formula, multiplies by the coefficient, and fails unless every
 * element has the same count on both sides. The counts printed under the
 * drawing are those computed numbers, and the particles drawn are those
 * formulas that many times — so the picture, the formula line and the tally
 * cannot disagree with one another or with the chemistry.
 */
const WATER_FORMATION = {
  reactants: [
    { key: 'hydrogen', coefficient: 2, formula: 'H2' },
    { key: 'oxygen', coefficient: 1, formula: 'O2' },
  ],
  products: [{ key: 'water', coefficient: 2, formula: 'H2O' }],
} as const;

/** Every element in a simple formula (no brackets, no charge) and how many of it. */
function atomsInFormula(formula: string): Map<string, number> {
  if (!/^(?:[A-Z][a-z]?\d*)+$/.test(formula)) throw new Error(`${formula}: not a formula this script can count.`);
  const atoms = new Map<string, number>();
  for (const [, element, count] of formula.matchAll(/([A-Z][a-z]?)(\d*)/g)) {
    atoms.set(element, (atoms.get(element) ?? 0) + (count ? Number(count) : 1));
  }
  return atoms;
}

/** The atoms on one side of an equation, element by element. */
function atomsOnSide(side: readonly { coefficient: number; formula: string }[]): Map<string, number> {
  const total = new Map<string, number>();
  for (const { coefficient, formula } of side) {
    for (const [element, count] of atomsInFormula(formula)) {
      total.set(element, (total.get(element) ?? 0) + coefficient * count);
    }
  }
  return total;
}

{
  const left = atomsOnSide(WATER_FORMATION.reactants);
  const right = atomsOnSide(WATER_FORMATION.products);
  for (const element of new Set([...left.keys(), ...right.keys()])) {
    if (left.get(element) !== right.get(element)) {
      throw new Error(
        `WATER_FORMATION: ${element} is ${left.get(element) ?? 0} on the left and ${right.get(element) ?? 0} ` +
          'on the right. The equation does not balance.',
      );
    }
  }
}

/**
 * How each molecule is drawn: its atoms, as element and offset from the
 * molecule's centre. Touching, not overlapping, so each atom reads as one. The
 * water's two hydrogens are 104.5° apart, as they are.
 */
const PARTICLE_RADIUS: Record<string, number> = { H: 11, O: 14 };
const PARTICLE_SHAPES: Record<string, readonly (readonly [string, number, number])[]> = {
  H2: [
    ['H', -PARTICLE_RADIUS.H, 0],
    ['H', PARTICLE_RADIUS.H, 0],
  ],
  O2: [
    ['O', -PARTICLE_RADIUS.O, 0],
    ['O', PARTICLE_RADIUS.O, 0],
  ],
  H2O: [
    ['O', 0, 0],
    ...[270 - 104.5 / 2, 270 + 104.5 / 2].map((bearing) => {
      const [x, y] = at(0, 0, bearing, PARTICLE_RADIUS.O + PARTICLE_RADIUS.H);
      return ['H', x, y] as const;
    }),
  ],
};
for (const [formula, shape] of Object.entries(PARTICLE_SHAPES)) {
  const drawn = new Map<string, number>();
  for (const [element] of shape) drawn.set(element, (drawn.get(element) ?? 0) + 1);
  const expected = atomsInFormula(formula);
  if (drawn.size !== expected.size || [...expected].some(([element, count]) => drawn.get(element) !== count)) {
    throw new Error(`PARTICLE_SHAPES: ${formula} is not drawn with the atoms its formula has.`);
  }
}

/**
 * `pen.label()` for a formula with a coefficient in front, `2H2O`, with its
 * subscripts lowered and set small as `formulaLabel()` sets them. (That one
 * reads a term that starts with a digit as a word, which is right for a
 * reagent and wrong here.) The words must be exactly the formula it is given,
 * so a string that drifts from the equation fails the run.
 */
function coefficientFormulaLabel(
  pen: Pen,
  x: number,
  y: number,
  words: Words,
  species: { coefficient: number; formula: string },
  options: LabelOptions,
): string {
  const expected = `${species.coefficient === 1 ? '' : species.coefficient}${species.formula}`;
  if (words.text !== expected) {
    throw new Error(`${words.source} [${pen.locale}]: "${words.text}" should be ${expected}, as in the equation.`);
  }
  const drawn = pen.label(x, y, words, options);
  const match = /^(<text [^>]*>)([^<]*)<\/text>$/.exec(drawn);
  if (!match) throw new Error(`${words.source}: label() drew something coefficientFormulaLabel() cannot read.`);
  const runs: { text: string; lowered: boolean }[] = [];
  let afterSymbol = false;
  for (const char of words.text) {
    const lowered = /\d/.test(char) && afterSymbol;
    if (!/\d/.test(char)) afterSymbol = true;
    const last = runs[runs.length - 1];
    if (last && last.lowered === lowered) last.text += char;
    else runs.push({ text: char, lowered });
  }
  let current = 0;
  const content = runs.map(({ text, lowered }) => {
    const target = lowered ? FORMULA_SUB : 0;
    const dy = target - current;
    current = target;
    const attributes = [dy !== 0 ? `dy="${n(dy)}"` : '', lowered ? `font-size="${FORMULA_SMALL}"` : ''].filter(Boolean);
    return attributes.length ? `<tspan ${attributes.join(' ')}>${esc(text)}</tspan>` : esc(text);
  });
  return `${match[1]}${content.join('')}</text>`;
}

/** A plus sign drawn as two strokes, for an equation or an ion's charge. */
function plusSign(x: number, y: number, half: number, stroke: Token, width = 2.5): string {
  return (
    `<path d="M ${n(x - half)} ${n(y)} L ${n(x + half)} ${n(y)} M ${n(x)} ${n(y - half)} L ${n(x)} ${n(y + half)}" ` +
    `${paint('none', stroke)} stroke-width="${width}" stroke-linecap="round" />`
  );
}

/** A minus sign drawn as one stroke, for an anion's charge. */
function minusSign(x: number, y: number, half: number, stroke: Token, width = 2): string {
  return (
    `<path d="M ${n(x - half)} ${n(y)} L ${n(x + half)} ${n(y)}" ${paint('none', stroke)} ` +
    `stroke-width="${width}" stroke-linecap="round" />`
  );
}

/**
 * The reactants and the products as particles, with the equation under them.
 *
 * **Every atom is a ring with its symbol in it**, hydrogen smaller than
 * oxygen (11 and 14 units, about their van der Waals radii), and oxygen
 * tinted in the proton red that is its colour in every molecular model; the
 * size and the symbol carry the difference, so the tint is never needed. The
 * coefficient is *how many molecules are drawn*, stacked: two H₂, one O₂, two
 * H₂O. That is the point of the picture — a coefficient makes more of the
 * molecule, and a subscript is part of it. "Reactants" and "products" head
 * the two sides, in each glossary's word for them.
 *
 * The atom-by-atom tally used to be drawn under the equation, but a table of
 * numbers in an SVG cannot line its columns up against a text baseline the
 * way an HTML `<table>` can, and it is not tallied by anything a screen
 * reader can navigate a row at a time. It is the cheat sheet's own
 * `CheatSheetTable` on this section now (src/lib/cheat-sheet-data.ts), a real
 * `<table>` next to this drawing rather than baked into it — this function
 * still checks that what it draws agrees with what that table (and the
 * equation) count, so the picture cannot drift from the numbers beside it.
 */
function drawParticleEquation(pen: Pen): string[] {
  const { t, symbol, label } = pen;
  const middleY = 96;
  const formulaY = 176;
  /** The centre of each species' column, left to right, and of each side. */
  const columns = { hydrogen: 44, oxygen: 136, water: 264 };
  const sides = { reactants: 90, products: 264 };
  const plusX = 88;
  const [arrowFrom, arrowTo] = [178, 218];
  /** How far apart two copies of one molecule are stacked. */
  const stack: Record<string, number> = { H2: 40, O2: 40, H2O: 48 };
  const parts: string[] = [];

  parts.push(
    label(sides.reactants, 24, t('reactants'), { room: 150, anchor: 'middle' }),
    label(sides.products, 24, t('products'), { room: 2 * (PHONE - 16 - sides.products), anchor: 'middle' }),
  );

  const drawnAtoms = { reactants: new Map<string, number>(), products: new Map<string, number>() };
  const species = [
    ...WATER_FORMATION.reactants.map((item) => ({ ...item, side: 'reactants' as const })),
    ...WATER_FORMATION.products.map((item) => ({ ...item, side: 'products' as const })),
  ];
  for (const item of species) {
    const x = columns[item.key];
    for (let copy = 0; copy < item.coefficient; copy += 1) {
      const y = middleY + (copy - (item.coefficient - 1) / 2) * stack[item.formula];
      for (const [element, dx, dy] of PARTICLE_SHAPES[item.formula]) {
        const radius = PARTICLE_RADIUS[element];
        parts.push(
          element === 'O'
            ? `<circle cx="${n(x + dx)}" cy="${n(y + dy)}" r="${radius}" ${paint(TOKEN.proton, TOKEN.proton)} ` +
                'fill-opacity="0.15" stroke-width="2.5" />'
            : ring(x + dx, y + dy, radius, TOKEN.ink, 2),
          label(x + dx, y + dy, symbol(element), { room: 2 * radius - 2, anchor: 'middle', central: true }),
        );
        const tally = drawnAtoms[item.side];
        tally.set(element, (tally.get(element) ?? 0) + 1);
      }
    }
    parts.push(coefficientFormulaLabel(pen, x, formulaY, t(item.key), item, { room: 84, anchor: 'middle' }));
  }

  // The plus and the arrow, once among the particles and once in the equation.
  for (const y of [middleY, formulaY - 6]) {
    parts.push(plusSign(plusX, y, 7, TOKEN.ink), arrow(arrowFrom, y, arrowTo, y));
  }

  // What was drawn must still be what the equation counts, even with the
  // tally itself drawn elsewhere (the cheat sheet's atom-count table, not
  // this picture) — this check is what would catch a drawing that drifted
  // from its own equation.
  const counted = { reactants: atomsOnSide(WATER_FORMATION.reactants), products: atomsOnSide(WATER_FORMATION.products) };
  for (const element of counted.reactants.keys()) {
    for (const side of ['reactants', 'products'] as const) {
      if (drawnAtoms[side].get(element) !== counted[side].get(element)) {
        throw new Error(`01-particle-equation: the ${side} show a different number of ${element} than the equation.`);
      }
    }
  }

  return parts;
}

/**
 * The three bonding models, for `chemical-bonds/01-bonding-models`.
 *
 * The ionic lattice is sodium chloride's pattern: a checkerboard of small
 * cations and large anions, in the ratio of Na⁺ to Cl⁻ (102 pm and 181 pm,
 * about 0.56), and as many of one as of the other, which the run checks — the
 * lattice is neutral, as NaCl is. The metal is a 1+ metal like sodium: one
 * delocalised electron per cation, so the run checks there are exactly as many
 * electrons in the sea as cations in the lattice.
 */
const BONDING_MODELS = {
  ionic: { columns: 6, rows: 5, pitch: 24, cationRadius: 7, anionRadius: 12.5, radiusRatio: 102 / 181 },
  metallic: { columns: 4, rows: 4, pitch: 34, cationRadius: 12, charge: 1 },
} as const;
{
  const { ionic, metallic } = BONDING_MODELS;
  const sites = ionic.columns * ionic.rows;
  if (sites % 2 !== 0) throw new Error('BONDING_MODELS: an odd number of ions cannot be half cations, half anions.');
  if (Math.abs(ionic.cationRadius / ionic.anionRadius - ionic.radiusRatio) > 0.05) {
    throw new Error('BONDING_MODELS: the ions are not drawn in the ratio of Na+ to Cl-.');
  }
  if (ionic.cationRadius + ionic.anionRadius >= ionic.pitch) {
    throw new Error('BONDING_MODELS: neighbouring ions overlap.');
  }
  if (2 * metallic.cationRadius >= metallic.pitch) throw new Error('BONDING_MODELS: neighbouring cations overlap.');
}

/**
 * Three boxes, one above another, each named on its left: an ionic lattice, a
 * molecule held by a shared pair, and metal cations in a sea of electrons.
 *
 * **Rows, not three panels side by side,** for the same reason as the states
 * of matter: stacked, the names share a column a phone always shows, and a
 * Russian «металлическая связь» can take two lines of it.
 *
 * - **Ionic:** alternating cations (small, red, a drawn +) and anions (large,
 *   blue, a drawn −), touching nothing, locked in a grid. Size and the sign
 *   carry the charge, so it survives any colour vision.
 * - **Covalent:** one H₂ molecule, its two atoms overlapping, and the two
 *   electrons of the shared pair in the overlap, named with a leader.
 * - **Metallic:** 1+ cations in a grid, and between them as many electrons,
 *   scattered, named with a leader to one of them.
 *
 * The two leaders come in level from the name column: to the covalent pair
 * through the point where the two atoms' outlines cross, and to the metal's
 * electron along the channel between two rows of cations, so neither crosses
 * anything on its way.
 */
function drawBondingModels(pen: Pen): string[] {
  const { t, symbol, label } = pen;
  const boxX = 184;
  const boxRight = PHONE - MARGIN - 1;
  const boxWidth = boxRight - boxX;
  const boxHeight = 150;
  const rowGap = 16;
  /** The names end here, right-aligned against their boxes. */
  const nameEnd = boxX - 12;
  const nameRoom = nameEnd - 16;
  /** Where a leader leaves the name column, and the height of the thing it names. */
  const leaderStart = boxX - 6;
  const pointerDrop = 80;
  const parts: string[] = [];

  (['ionic', 'covalent', 'metallic'] as const).forEach((model, index) => {
    const boxY = 16 + index * (boxHeight + rowGap);
    const pointerY = boxY + pointerDrop;
    parts.push(frame(boxX, boxY, boxWidth, boxHeight), label(nameEnd, boxY + 26, t(model), { room: nameRoom, anchor: 'end', lines: 2 }));

    if (model === 'ionic') {
      const { columns, rows, pitch, cationRadius, anionRadius } = BONDING_MODELS.ionic;
      const left = boxX + (boxWidth - columns * pitch) / 2 + pitch / 2;
      const top = boxY + (boxHeight - rows * pitch) / 2 + pitch / 2;
      let [cations, anions] = [0, 0];
      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const [x, y] = [left + column * pitch, top + row * pitch];
          if ((row + column) % 2 === 0) {
            parts.push(ring(x, y, cationRadius, TOKEN.proton, 2), plusSign(x, y, 3.5, TOKEN.proton, 2));
            cations += 1;
          } else {
            parts.push(ring(x, y, anionRadius, TOKEN.electron, 2), minusSign(x, y, 5.5, TOKEN.electron));
            anions += 1;
          }
        }
      }
      if (cations !== anions) throw new Error(`01-bonding-models: ${cations} cations and ${anions} anions; the lattice is not neutral.`);
    } else if (model === 'covalent') {
      // One H2: two atoms whose outlines cross, the shared pair where they overlap.
      const radius = 20;
      const apart = 30;
      const cx = boxX + 70;
      const tip = Math.sqrt(radius ** 2 - (apart / 2) ** 2);
      for (const side of [-1, 1]) {
        parts.push(
          ring(cx, pointerY + (side * apart) / 2, radius, TOKEN.ink, 2),
          label(cx, pointerY + side * (apart / 2 + 6), symbol('H'), { room: 24, anchor: 'middle', central: true }),
        );
      }
      parts.push(
        dot(cx - 5, pointerY, 3.2, TOKEN.electron),
        dot(cx + 5, pointerY, 3.2, TOKEN.electron),
        label(nameEnd, pointerY, t('sharedPair'), { room: nameRoom, anchor: 'end', central: true, lines: 3, fill: TOKEN.electron }),
        leader(leaderStart, pointerY, cx - tip + 2, pointerY),
      );
    } else {
      const { columns, rows, pitch, cationRadius, charge } = BONDING_MODELS.metallic;
      const left = boxX + (boxWidth - columns * pitch) / 2 + pitch / 2;
      // The rows sit so that the leader's height runs along the channel
      // between the second and third.
      const top = pointerY - pitch / 2 - pitch;
      const cations: [number, number][] = [];
      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) cations.push([left + column * pitch, top + row * pitch]);
      }
      if (top - cationRadius < boxY + 4 || top + (rows - 1) * pitch + cationRadius > boxY + boxHeight - 4) {
        throw new Error('01-bonding-models: the metal lattice does not fit its box.');
      }
      // The named electron sits in the channel, between the first two columns.
      const named: [number, number] = [left + pitch / 2, pointerY];
      const electrons: [number, number][] = [named];
      const random = seeded(0x10a3);
      for (let tries = 0; electrons.length < cations.length * charge; tries += 1) {
        if (tries > 20000) throw new Error('01-bonding-models: no room for the delocalised electrons.');
        const x = boxX + 9 + random() * (boxWidth - 18);
        const y = boxY + 9 + random() * (boxHeight - 18);
        const clearOfCations = cations.every(([cx, cy]) => Math.hypot(x - cx, y - cy) >= cationRadius + 7);
        const clearOfElectrons = electrons.every(([ex, ey]) => Math.hypot(x - ex, y - ey) >= 16);
        const clearOfLeader = !(x < named[0] + 8 && Math.abs(y - pointerY) < 9);
        if (clearOfCations && clearOfElectrons && clearOfLeader) electrons.push([x, y]);
      }
      if (electrons.length !== cations.length * charge) {
        throw new Error('01-bonding-models: the sea does not hold one electron per unit of cation charge.');
      }
      for (const [x, y] of cations) parts.push(ring(x, y, cationRadius, TOKEN.proton, 2), plusSign(x, y, 5, TOKEN.proton, 2));
      for (const [x, y] of electrons) parts.push(dot(x, y, 3.2, TOKEN.electron));
      parts.push(
        label(nameEnd, pointerY, t('delocalised'), { room: nameRoom, anchor: 'end', central: true, lines: 3, fill: TOKEN.electron }),
        leader(leaderStart, pointerY, named[0] - 7, pointerY),
      );
    }
  });

  return parts;
}

/**
 * The pH scale, for `acids-and-bases/01-ph-scale`: fifteen steps, 0 to 14,
 * in universal-indicator colours, and five everyday solutions at their pH.
 *
 * Each example's pH is checked against the sheet's own *pH scale landmarks*
 * table in `src/lib/cheat-sheet-data.ts`, which the run reads: the example
 * must be named in a row whose pH range includes it, so the bar and the table
 * under it cannot disagree. The pH values are typical ones — stomach acid
 * about 1, vinegar about 3, sodium hydrogencarbonate (baking soda) solution
 * about 8, a sodium hydroxide oven cleaner about 13 — and pure water is 7 at
 * 25 °C, which the run insists on.
 */
const PH_SCALE = {
  lowest: 0,
  highest: 14,
  examples: [
    { key: 'stomachAcid', pH: 1, tableWord: 'Stomach acid' },
    { key: 'vinegar', pH: 3, tableWord: 'Vinegar' },
    { key: 'pureWater', pH: 7, tableWord: 'Pure water' },
    { key: 'bakingSoda', pH: 8, tableWord: 'Baking soda' },
    { key: 'ovenCleaner', pH: 13, tableWord: 'Oven cleaner' },
  ],
} as const;

/**
 * The universal-indicator colours, one per whole pH, as `--diagram-ph-0` to
 * `--diagram-ph-14` in `src/app/globals.css`. **The one place a diagram's
 * colour is fixed**: an indicator's colour is a fact about the indicator, so
 * it is the same in both themes. None of them carries text, and none has to
 * clear a contrast ratio on its own: every step is outlined in `ink`, which
 * does, and its pH is printed beside it, so the scale reads without its
 * colours — for a red-green colour-blind reader, or in either theme.
 * `src/lib/cheat-sheet-diagrams.test.ts` measures each colour against both
 * backgrounds and fails if one under 3:1 is drawn without that outline.
 */
const INDICATOR = Array.from(
  { length: PH_SCALE.highest - PH_SCALE.lowest + 1 },
  (_, step) => `var(--diagram-ph-${PH_SCALE.lowest + step})`,
);
{
  const source = readFileSync(join(root, 'src', 'lib', 'cheat-sheet-data.ts'), 'utf8');
  const start = source.indexOf("heading: 'pH scale landmarks'");
  if (start < 0) throw new Error('PH_SCALE: the acids sheet has no "pH scale landmarks" table to check against.');
  const table = source.slice(start, source.indexOf('commonMistakes', start));
  const rows = [...table.matchAll(/\['(\d+)(?:–(\d+))?', '([^']+)'/g)];
  for (const { key, pH, tableWord } of PH_SCALE.examples) {
    const row = rows.find(([, , , examples]) => examples.toLowerCase().includes(tableWord.toLowerCase()));
    if (!row) throw new Error(`PH_SCALE: ${key} is not in the sheet's pH table.`);
    const [low, high] = [Number(row[1]), Number(row[2] ?? row[1])];
    if (pH < low || pH > high) throw new Error(`PH_SCALE: ${key} is drawn at pH ${pH}, but the table puts it at ${low}–${high}.`);
    if (pH < PH_SCALE.lowest || pH > PH_SCALE.highest) throw new Error(`PH_SCALE: ${key} is off the scale.`);
  }
  if (PH_SCALE.examples.find(({ key }) => key === 'pureWater')?.pH !== 7) {
    throw new Error('PH_SCALE: pure water is neutral, pH 7 at 25 °C.');
  }
}

/**
 * A vertical bar, pH 0 at the top, each step a block of its indicator colour
 * with its number printed to its left; each example to the right, level with
 * its pH, with a short tick from the bar.
 *
 * **Vertical, because the examples are words.** Across the page each pH step
 * would have about 22 units, the labels would have to be staggered above and
 * below the bar to fit, and pure water and baking soda — one step apart —
 * would still collide in German. Down the page every label has a line of its
 * own and the width of the drawing to the right of the bar, and the whole
 * figure is 360 units wide.
 */
function drawPhScale(pen: Pen): string[] {
  const { t, whole, label } = pen;
  const numbersEnd = 46;
  const barX = 56;
  const barWidth = 36;
  const top = 18;
  /** One pH step. More than a label's height, so neighbouring examples never touch. */
  const step = 25;
  const labelX = barX + barWidth + 18;
  const parts: string[] = [];
  const steps = PH_SCALE.highest - PH_SCALE.lowest + 1;

  for (let index = 0; index < steps; index += 1) {
    const y = top + index * step;
    parts.push(
      `<rect x="${barX}" y="${n(y)}" width="${barWidth}" height="${step}" ` +
        `style="fill:${INDICATOR[index]};stroke:${TOKEN.ink}" stroke-width="1.5" />`,
      label(numbersEnd, y + step / 2, whole(PH_SCALE.lowest + index), { room: 30, anchor: 'end', central: true }),
    );
  }
  parts.push(
    `<rect x="${barX}" y="${top}" width="${barWidth}" height="${steps * step}" ${paint('none', TOKEN.ink)} stroke-width="2" />`,
  );

  for (const { key, pH } of PH_SCALE.examples) {
    const y = top + (pH - PH_SCALE.lowest + 0.5) * step;
    parts.push(
      `<path d="M ${barX + barWidth + 2} ${n(y)} L ${labelX - 6} ${n(y)}" ${paint('none', TOKEN.ink)} ` +
        'stroke-width="2" stroke-linecap="round" />',
      label(labelX, y, t(key), { room: PHONE - 16 - labelX, central: true }),
    );
  }

  return parts;
}

// --- end of task 10a ---

// --- Small diagrams B (task 10b) ---
//
// Four small diagrams on four sheets: the cross-over for aluminium sulfate
// (`chemical-formulas`), which naming system a compound takes
// (`naming-compounds`), the mole map (`stoichiometry`), and the numbered chain
// of 3-methylpentan-2-ol (`organic-nomenclature`). The chemistry each one
// draws is data first, checked before anything is drawn, as the Lewis
// structures are.

/**
 * Aluminium sulfate, for `chemical-formulas/01-cross-over`.
 *
 * Al³⁺ and SO₄²⁻: the size of each charge becomes the other ion's subscript,
 * and the run checks the arithmetic the sheet's worked example does — the
 * cations bring 2 × (+3) = +6, the anions 3 × (−2) = −6, so the compound is
 * neutral — and that the ratio needs no simplifying (2 and 3 share no
 * factor), so the crossed-over formula is already the lowest ratio. Sulfate
 * is polyatomic and there are three of it, so it takes brackets. The formula
 * built from these numbers must be the one the section's example card
 * prints.
 */
const CROSS_OVER = {
  cation: { symbol: 'Al', charge: 3 },
  anion: { symbols: ['S', 'O'], oxygens: 4, charge: 2 },
  formula: 'Al2(SO4)3',
} as const;

function greatestCommonDivisor(a: number, b: number): number {
  return b === 0 ? a : greatestCommonDivisor(b, a % b);
}

const CROSS_OVER_COUNTS = { cations: CROSS_OVER.anion.charge, anions: CROSS_OVER.cation.charge };
if (CROSS_OVER_COUNTS.cations * CROSS_OVER.cation.charge !== CROSS_OVER_COUNTS.anions * CROSS_OVER.anion.charge) {
  throw new Error('CROSS_OVER: the charges do not balance, so the compound is not neutral.');
}
if (greatestCommonDivisor(CROSS_OVER_COUNTS.cations, CROSS_OVER_COUNTS.anions) !== 1) {
  throw new Error('CROSS_OVER: the crossed-over subscripts simplify, and the figure does not show that step.');
}
{
  const [first, second] = CROSS_OVER.anion.symbols;
  const anion = `${first}${second}${CROSS_OVER.anion.oxygens}`;
  const built = `${CROSS_OVER.cation.symbol}${CROSS_OVER_COUNTS.cations}(${anion})${CROSS_OVER_COUNTS.anions}`;
  if (built !== CROSS_OVER.formula) {
    throw new Error(`CROSS_OVER: the crossed-over charges give ${built}, not ${CROSS_OVER.formula}.`);
  }
}

/** The ions and the formula in `01-cross-over`: the slot's one focal item. */
const CROSS_OVER_FOCAL = { item: 'the formulae', size: 28 };

/**
 * How far along one line of text a run ends, in units: the script's estimate
 * without its safety margin. It is only used to aim the arrows at a digit,
 * and it overshoots the page's fonts by a few per cent, which moves an
 * arrow's end by a unit or two.
 */
function crossOverAdvance(text: string, size: number): number {
  return estimateWidth(text, size, { locale: 'en' }) / SAFETY;
}

interface CrossOverRun {
  text: string;
  /** 0 on the line, 1 a subscript, -1 a charge. */
  shift: 0 | 1 | -1;
}

/** How far a charge's no-break space is pulled back, so `Al³⁺` has no gap. */
const CROSS_OVER_PULL = BODY * 0.27;

/**
 * One formula as the site writes it — `Al 3+`, `SO4 2−`, `Al2(SO4)3`, a
 * charge after a no-break space — split into runs: symbols and brackets on
 * the line, a digit after them lowered, the charge raised.
 */
function crossOverRuns(text: string): CrossOverRun[] {
  const [formula, charge] = text.split(NBSP);
  const runs: CrossOverRun[] = [];
  let afterSymbol = false;
  for (const char of formula) {
    const shift = /\d/.test(char) && afterSymbol ? 1 : 0;
    const last = runs[runs.length - 1];
    if (last && last.shift === shift) last.text += char;
    else runs.push({ text: char, shift });
    afterSymbol = /[A-Za-z()]/.test(char);
  }
  // The charge keeps its no-break space, so the text is still the string.
  if (charge !== undefined) runs.push({ text: `${NBSP}${charge}`, shift: -1 });
  return runs;
}

/**
 * A formula at the focal size, with real subscripts and a real charge at the
 * body size, as one `<text>` so the browser sets its letters side by side.
 *
 * `label()` places and measures it as usual (every digit at the focal size,
 * so it overestimates, which is safe), and this redraws its content as
 * `<tspan>`s, painting any run named in `fills`. Returns the markup and, for
 * each run, where the middle of its first character lands, for the arrows.
 */
function crossOverFormula(
  pen: Pen,
  x: number,
  y: number,
  words: Words,
  anchor: 'start' | 'middle' | 'end',
  fills: Partial<Record<number, Token>> = {},
): { markup: string; firsts: number[] } {
  const big = CROSS_OVER_FOCAL.size;
  const runs = crossOverRuns(words.text);
  const visible = (run: CrossOverRun) => run.text.replace(NBSP, '');
  const widths = runs.map((run) => crossOverAdvance(visible(run), run.shift === 0 ? big : BODY));
  const total = widths.reduce((sum, width) => sum + width, 0);
  let cursor = anchor === 'start' ? x : anchor === 'end' ? x - total : x - total / 2;
  const firsts = runs.map((run, index) => {
    const first = cursor + crossOverAdvance(visible(run)[0], run.shift === 0 ? big : BODY) / 2;
    cursor += widths[index];
    return first;
  });

  const drawn = pen.label(x, y, words, { room: 200, anchor, focal: CROSS_OVER_FOCAL });
  const match = /^(<text [^>]*>)[^<]*<\/text>$/.exec(drawn);
  if (!match) throw new Error(`${words.source}: label() drew something crossOverFormula() cannot read.`);
  const offset = (shift: CrossOverRun['shift']) => (shift === 1 ? 6 : shift === -1 ? -13 : 0);
  let current = 0;
  const content = runs.map((run, index) => {
    const dy = offset(run.shift) - current;
    current = offset(run.shift);
    const fill = fills[index];
    const attributes = [
      dy !== 0 ? `dy="${n(dy)}"` : '',
      run.text.startsWith(NBSP) ? `dx="${n(-CROSS_OVER_PULL)}"` : '',
      run.shift !== 0 ? `font-size="${BODY}"` : '',
      fill ? paint(fill) : '',
    ].filter(Boolean);
    return attributes.length ? `<tspan ${attributes.join(' ')}>${esc(run.text)}</tspan>` : esc(run.text);
  });
  return { markup: `${match[1]}${content.join('')}</text>`, firsts };
}

/**
 * The cross-over.
 *
 * **Top**, each ion named: Al³⁺ and SO₄²⁻, the symbols at the focal size and
 * the charges as superscripts at the body size. **Bottom**, Al₂(SO₄)₃. Two
 * arrows cross between them, from each charge number to the subscript it
 * becomes. The cation's charge and the subscript it becomes are in the
 * proton colour (it is a positive charge), the anion's in the electron
 * colour; the arrows say the same thing without colour. Underneath, the two
 * products that show it is neutral, which the prose also works through.
 *
 * Each formula is one string, written the way the site writes formulae for
 * `MoleculeText`, and checked against `CROSS_OVER` in every locale.
 */
function drawCrossOver(pen: Pen): string[] {
  const { t, label } = pen;
  const { cation, anion } = CROSS_OVER;
  const where = `chemical-formulas/01-cross-over [${pen.locale}]`;
  const expect = (words: Words, wanted: string) => {
    if (words.text !== wanted) throw new Error(`${where} ${words.source}: "${words.text}", not "${wanted}".`);
    return words;
  };
  const anionFormula = `${anion.symbols.join('')}${anion.oxygens}`;

  // Top: the two ions, the cation from the left and the anion to a right edge,
  // so that the estimate's overshoot falls inside the drawing.
  const top = 84;
  const cationIon = crossOverFormula(
    pen,
    38,
    top,
    expect(t('cationFormula'), `${cation.symbol}${NBSP}${cation.charge}+`),
    'start',
    { 1: TOKEN.proton },
  );
  const anionIon = crossOverFormula(
    pen,
    262,
    top,
    expect(t('anionFormula'), `${anionFormula}${NBSP}${anion.charge}−`),
    'end',
    { 2: TOKEN.electron },
  );
  // Bottom: the formula they make. Runs: Al, 2, (SO, 4, ), 3.
  const bottom = 214;
  const compound = crossOverFormula(pen, 160, bottom, expect(t('formula'), CROSS_OVER.formula), 'middle', {
    1: TOKEN.electron,
    5: TOKEN.proton,
  });

  const [cationCharge, anionCharge] = [cationIon.firsts[1], anionIon.firsts[2]];
  const [cationCount, anionCount] = [compound.firsts[1], compound.firsts[5]];
  const [from, to] = [top + 12, bottom - 38];
  const parts = [
    label(cationIon.firsts[0] + 12, 32, t('cation'), { room: 120, anchor: 'middle' }),
    label(anionIon.firsts[0] + 25, 32, t('anion'), { room: 120, anchor: 'middle' }),
    cationIon.markup,
    anionIon.markup,
    compound.markup,
    // The two arrows cross: each charge number down to the subscript it becomes.
    arrow(cationCharge, from, anionCount, to),
    arrow(anionCharge, from, cationCount, to),
  ];

  // And the check that it is neutral, one line per ion.
  const middle = 160;
  const { cations, anions } = CROSS_OVER_COUNTS;
  parts.push(
    label(middle, 262, t('positive', { values: { count: cations, charge: cation.charge, total: cations * cation.charge } }), {
      room: 200,
      anchor: 'middle',
    }),
    label(middle, 290, t('negative', { values: { count: anions, charge: anion.charge, total: anions * anion.charge } }), {
      room: 200,
      anchor: 'middle',
    }),
  );
  return parts;
}

/**
 * Which naming system a compound takes, for `naming-compounds/01-which-system`.
 *
 * The sheet's first takeaway as a flowchart: metal and non-metal → ionic; two
 * non-metals → molecular; and, *under* two non-metals, H first and dissolved
 * in water → acid. The acid hangs off the molecular row on purpose: HCl and
 * H₂SO₄ are made of non-metals, and the flowchart should not suggest a third,
 * separate kind of substance.
 *
 * **Each result carries one example name, in the locale's own naming
 * system** — which is what the overlays adapt rather than translate. The
 * examples show it: *sodium chloride*, *Natriumchlorid*, *chlorure de
 * sodium*, *хлорид натрия*; *sulfur dioxide*, *оксид серы(IV)*; and German's
 * *Salzsäure*, which no rule would produce. The kinds of compound are the
 * words each overlay's own takeaway uses.
 */
function drawWhichNamingSystem(pen: Pen): string[] {
  const { t, label, lineCount } = pen;
  const condition = { x: 16, width: 116 };
  const result = { x: 162, width: 180 };
  const height = 64;
  const rows = [
    { top: 16, condition: 'metalNonMetal', kind: 'ionic', example: 'ionicExample' },
    { top: 104, condition: 'twoNonMetals', kind: 'molecular', example: 'molecularExample' },
    { top: 212, condition: 'hydrogenInWater', kind: 'acid', example: 'acidExample' },
  ];
  const parts: string[] = [];
  for (const row of rows) {
    const middle = row.top + height / 2;
    const words = t(row.condition);
    const room = condition.width - 10;
    const count = lineCount(words, room);
    parts.push(
      frame(condition.x, row.top, condition.width, height),
      label(condition.x + condition.width / 2, middle - ((count - 1) * LEADING) / 2, words, {
        room,
        anchor: 'middle',
        central: true,
        lines: 2,
      }),
      arrow(condition.x + condition.width + 4, middle, result.x - 4, middle),
      frame(result.x, row.top, result.width, height),
      label(result.x + 10, middle - 11, t(row.kind), { room: result.width - 14, central: true }),
      label(result.x + 10, middle + 12, t(row.example), {
        room: result.width - 14,
        central: true,
        fill: TOKEN.inkMuted,
      }),
    );
  }
  // An acid is a molecular compound first: the arrow down says "and if".
  const [molecular, acid] = [rows[1], rows[2]];
  const column = condition.x + condition.width / 2;
  parts.push(arrow(column, molecular.top + height + 4, column, acid.top - 4));
  return parts;
}

/**
 * A two-way arrow: one line, a head at each end. For the mole map, where
 * every conversion runs both ways.
 */
function moleMapArrow(x1: number, y1: number, x2: number, y2: number, head = 12): string {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const [cos, sin] = [Math.cos(angle), Math.sin(angle)];
  const wing = head * 0.5;
  const [ax, ay] = [x1 + head * cos, y1 + head * sin];
  const [bx, by] = [x2 - head * cos, y2 - head * sin];
  const tip = (px: number, py: number, qx: number, qy: number) =>
    `<path d="M ${n(px)} ${n(py)} L ${n(qx + wing * sin)} ${n(qy - wing * cos)} ` +
    `L ${n(qx - wing * sin)} ${n(qy + wing * cos)} Z" ${paint(TOKEN.ink)} />`;
  return (
    `<path d="M ${n(ax)} ${n(ay)} L ${n(bx)} ${n(by)}" ${paint('none', TOKEN.ink)} ` +
    'stroke-width="2.5" stroke-linecap="round" />' +
    tip(x2, y2, bx, by) +
    tip(x1, y1, ax, ay)
  );
}

/**
 * The symbols a mole-map formula sets as subscripts: N_A and V_m. In the
 * strings they are written plainly, `NA` and `Vm`, so that the string is
 * exactly the text the page shows; this lowers the second letter.
 */
const MOLE_MAP_SUBSCRIPTED = ['NA', 'Vm'];

/**
 * The formulae on the mole map's arrows, as `(quantity, formula)` string keys
 * in the order the rows run, each checked to be `n = …` with the quantity's
 * own symbol in it — so a formula cannot sit on the wrong arrow.
 */
const MOLE_MAP_ROWS = [
  { box: 'mass', formula: 'fromMass', symbols: ['m', 'M'] },
  { box: 'particles', formula: 'fromParticles', symbols: ['N', 'NA'] },
  { box: 'gasVolume', formula: 'fromGasVolume', symbols: ['V', 'Vm'] },
  { box: 'solution', formula: 'fromSolution', symbols: ['c', 'V'] },
] as const;

/** `pen.label()`, with `N_A` and `V_m` set with a real subscript. One line only. */
function moleMapFormula(pen: Pen, x: number, y: number, words: Words, options: LabelOptions): string {
  const drawn = pen.label(x, y, words, options);
  const match = /^(<text [^>]*>)([^<]*)<\/text>$/.exec(drawn);
  if (!match) throw new Error(`${words.source}: moleMapFormula() takes a one-line label.`);
  const [, open, content] = match;
  let out = content;
  for (const pair of MOLE_MAP_SUBSCRIPTED) {
    out = out.replace(
      new RegExp(`${pair[0]}${pair[1]}$`),
      `${pair[0]}<tspan dy="${FORMULA_SUB}" font-size="${FORMULA_SMALL}">${pair[1]}</tspan>`,
    );
  }
  return `${open}${out}</text>`;
}

/**
 * The mole map, for `stoichiometry/01-mole-map`, under the worked mass → mass
 * example.
 *
 * **Down the left**, the four things a question gives you: mass, particles,
 * gas volume, solution. Each has a two-way arrow to one tall box, the moles of
 * reactant, and its formula on the arrow — n = m/M, n = N/N_A, n = V/V_m,
 * n = cV — because every conversion runs both ways. **Down the right**, the
 * one step that is not a conversion: the mole ratio from the equation's
 * coefficients, from the moles of reactant to the moles of product. The same
 * four arrows take the product's moles back out, which the paragraph and the
 * worked example do; drawing them twice would double the figure to say it.
 *
 * Symbols only, no values: the molar volume is 24,8 L/mol at 100 kPa on most
 * sheets and 24,5 L/mol at 1013 hPa on the German one, and the map is the
 * same in both.
 */
function drawMoleMap(pen: Pen): string[] {
  const { t, label, lineCount } = pen;
  const box = { x: 16, width: 120, height: 56, pitch: 76 };
  const hub = { x: 220, width: 122 };
  const rowTop = (index: number) => 16 + index * box.pitch;
  const hubBottom = rowTop(MOLE_MAP_ROWS.length - 1) + box.height;
  const parts: string[] = [];

  const centred = (x: number, top: number, height: number, key: string, room: number, lines: number) => {
    const words = t(key);
    const count = lineCount(words, room);
    return label(x, top + height / 2 - ((count - 1) * LEADING) / 2, words, {
      room,
      anchor: 'middle',
      central: true,
      lines,
    });
  };

  MOLE_MAP_ROWS.forEach((row, index) => {
    const top = rowTop(index);
    const middle = top + box.height / 2;
    const formula = t(row.formula);
    const [quantity, constant] = row.symbols;
    if (!formula.text.startsWith('n = ') || !formula.text.includes(quantity) || !formula.text.includes(constant)) {
      throw new Error(`stoichiometry/01-mole-map [${pen.locale}] ${row.formula}: "${formula.text}" is not n from ${quantity}.`);
    }
    const [from, to] = [box.x + box.width + 4, hub.x - 4];
    parts.push(
      frame(box.x, top, box.width, box.height),
      centred(box.x + box.width / 2, top, box.height, row.box, box.width - 10, 2),
      moleMapArrow(from, middle, to, middle),
      moleMapFormula(pen, (from + to) / 2, middle - 14, formula, { room: to - from + 8, anchor: 'middle' }),
    );
  });

  // The moles of reactant, as tall as the four rows that lead into it.
  parts.push(
    frame(hub.x, rowTop(0), hub.width, hubBottom - rowTop(0)),
    centred(hub.x + hub.width / 2, rowTop(0), hubBottom - rowTop(0), 'reactantMoles', hub.width - 8, 4),
  );

  // The mole ratio, down to the moles of product.
  const productTop = hubBottom + 72;
  const productHeight = 84;
  const spine = hub.x + hub.width / 2;
  const ratio = t('moleRatio');
  const ratioRoom = spine - 14 - 16;
  const ratioLines = lineCount(ratio, ratioRoom);
  parts.push(
    arrow(spine, hubBottom + 4, spine, productTop - 4),
    label(spine - 14, (hubBottom + productTop) / 2 - ((ratioLines - 1) * LEADING) / 2, ratio, {
      room: ratioRoom,
      anchor: 'end',
      central: true,
      lines: 2,
    }),
    frame(hub.x, productTop, hub.width, productHeight),
    centred(hub.x + hub.width / 2, productTop, productHeight, 'productMoles', hub.width - 8, 3),
  );
  return parts;
}

/**
 * 3-methylpentan-2-ol, for `organic-nomenclature/01-numbered-chain`.
 *
 * The main chain is five carbons; the OH is on C2 and the methyl on C3. The
 * run checks what the worked example claims: the numbered chain is the
 * longest chain in the skeleton (the branch through the methyl is only four),
 * numbering from this end gives the OH the lower number (2, not 4), and the
 * name printed in each language carries those two numbers and the root for
 * five, filled from here.
 */
const NUMBERED_CHAIN: { readonly length: number; readonly hydroxylOn: number; readonly methylOn: number } = {
  length: 5,
  hydroxylOn: 2,
  methylOn: 3,
};

{
  const { length, hydroxylOn, methylOn } = NUMBERED_CHAIN;
  // The carbon skeleton as a graph: chain carbons 1..length, and the methyl
  // carbon, numbered length + 1, on its chain carbon.
  const methyl = length + 1;
  const neighbours = new Map<number, number[]>();
  const bond = (a: number, b: number) => {
    neighbours.set(a, [...(neighbours.get(a) ?? []), b]);
    neighbours.set(b, [...(neighbours.get(b) ?? []), a]);
  };
  for (let carbon = 1; carbon < length; carbon += 1) bond(carbon, carbon + 1);
  bond(methylOn, methyl);
  const longestFrom = (carbon: number, seen: Set<number>): number =>
    1 + Math.max(0, ...(neighbours.get(carbon) ?? []).filter((next) => !seen.has(next)).map((next) =>
      longestFrom(next, new Set([...seen, next]))));
  const longest = Math.max(...[...neighbours.keys()].map((carbon) => longestFrom(carbon, new Set([carbon]))));
  if (longest !== length) {
    throw new Error(`NUMBERED_CHAIN: the longest chain is ${longest} carbons, not the ${length} numbered.`);
  }
  if (hydroxylOn > length + 1 - hydroxylOn) {
    throw new Error('NUMBERED_CHAIN: numbered from the wrong end; the OH should get the lower number.');
  }
  if (methylOn === 1 || methylOn === length) {
    throw new Error('NUMBERED_CHAIN: a methyl on an end carbon only makes the chain longer.');
  }
}

/**
 * The skeletal structure, numbered.
 *
 * A zigzag of five vertices, each a carbon, with its number beside it in the
 * muted ink so the numbers read as annotations and not as atoms. The OH
 * stands at the end of a bond up from C2, written out as skeletal structures
 * do. The methyl is the bare line down from C3 — a line end is a carbon — and
 * its word sits beside it with no leader, because a leader here would be one
 * more line that could be read as a bond. The name underneath is the focal
 * item.
 */
function drawNumberedChain(pen: Pen): string[] {
  const { t, whole, label } = pen;
  const { length, hydroxylOn, methylOn } = NUMBERED_CHAIN;
  const bondLength = 48;
  const [dx, dy] = [bondLength * Math.cos(Math.PI / 6), bondLength * Math.sin(Math.PI / 6)];
  const [startX, low] = [48, 112];
  /** Odd carbons are the low vertices, even ones the high. */
  const carbon = (index: number): [number, number] => [startX + (index - 1) * dx, index % 2 === 1 ? low : low - dy];
  const bondPath = (points: [number, number][]) =>
    `<path d="${points.map(([x, y], index) => `${index === 0 ? 'M' : 'L'} ${n(x)} ${n(y)}`).join(' ')}" ` +
    `${paint('none', TOKEN.ink)} stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />`;

  const chain = Array.from({ length }, (_, index) => carbon(index + 1));
  const [hx, hy] = carbon(hydroxylOn);
  const [mx, my] = carbon(methylOn);
  if (hy >= low || my < low) {
    throw new Error('organic-nomenclature/01-numbered-chain: the OH must stand on a high vertex, the methyl hang from a low one.');
  }
  const hydroxylEnd = hy - bondLength;
  const methylEnd = my + bondLength;

  const parts: string[] = [
    bondPath(chain),
    bondPath([
      [hx, hy],
      [hx, hydroxylEnd + 12],
    ]),
    bondPath([
      [mx, my],
      [mx, methylEnd],
    ]),
    // The O of OH centred over its bond.
    label(hx - 7, hydroxylEnd, t('hydroxyl'), { room: 40, central: true }),
    label(mx + 10, methylEnd - 2, t('methyl'), { room: PHONE - 16 - (mx + 10), central: true }),
  ];

  // Each carbon's number: under it, except where the methyl hangs from C3,
  // whose number goes above, in the crook of the chain.
  chain.forEach(([x, y], index) => {
    const number = index + 1;
    const high = y < low;
    const [nx, ny] =
      number === 1 || number === length || high ? [x, y + 24] : [x, y - 24];
    parts.push(label(nx, ny, whole(number), { room: 24, anchor: 'middle', central: true, fill: TOKEN.inkMuted }));
  });

  const name = t('name', { values: { methylAt: methylOn, hydroxylAt: hydroxylOn } });
  if (!/pent|пент/i.test(name.text)) {
    throw new Error(`organic-nomenclature/01-numbered-chain [${pen.locale}]: "${name.text}" has no root for five carbons.`);
  }
  const middle = (chain[0][0] + chain[length - 1][0]) / 2;
  parts.push(
    label(middle, methylEnd + 44, name, {
      room: 2 * (middle - 16),
      anchor: 'middle',
      focal: { item: 'the name', size: BODY, bold: true },
    }),
  );
  return parts;
}

// --- end of task 10b ---

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
    // Every slot keeps its labels on the left, so every one is held to
    // `PHONE`. None declares a size: `measureSize` takes it from the drawing.
    ['atomic-structure', '01-inside-an-atom', true, drawInsideAnAtom],
    ['atomic-structure', '02-atomic-and-mass-number', true, drawAtomicAndMassNumber],
    ['isotopes-and-radioactivity', '03-isotopes-of-hydrogen', true, drawIsotopesOfHydrogen],
    ['atomic-structure', '05-energy-levels', true, drawEnergyLevels],
    ['atomic-structure', '06-ordered-by-atomic-number', true, drawOrderedByAtomicNumber],
    ['isotopes-and-radioactivity', '07-decay-and-made-elements', true, drawHalfLife],
    ['states-of-matter', '01-particles-in-each-state', true, drawParticlesInEachState],
    ['states-of-matter', '02-heating-curve', true, drawHeatingCurve],
    ['lewis-structures', '01-lewis-structures', true, drawLewisStructures],
    ['lewis-structures', '02-vsepr-shapes', true, drawVseprShapes],
    ['functional-groups', '01-reaction-map', true, drawReactionMap],
    ['relative-formula-mass', '01-carbon-hydrogen-balance', true, drawCarbonHydrogenBalance],
    ['balancing-equations', '01-particle-equation', true, drawParticleEquation],
    ['chemical-bonds', '01-bonding-models', true, drawBondingModels],
    ['acids-and-bases', '01-ph-scale', true, drawPhScale],
    ['chemical-formulas', '01-cross-over', true, drawCrossOver],
    ['naming-compounds', '01-which-system', true, drawWhichNamingSystem],
    ['stoichiometry', '01-mole-map', true, drawMoleMap],
    ['organic-nomenclature', '01-numbered-chain', true, drawNumberedChain],
  ] as const
).map(([sheet, id, phone, draw]) => ({
  sheet,
  id,
  key: `${sheet}/${id}`,
  phone,
  draw,
}));

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
    'One large cell — 17, Cl, Chlorine, 35.45 — with ' +
    'four leader lines out to labels: atomic number is 17 protons and is what ' +
    'makes it chlorine; symbol; name; relative atomic mass, an average over the ' +
    'isotopes, not a mass number and not a whole number. Along the bottom: mass ' +
    'number belongs to one atom, relative atomic mass belongs to the element. ' +
    'The brief calls this the highest-value of the ten. Note the 35.45 here ' +
    'against the rounded 35.5 the sheets use elsewhere — that difference is ' +
    'the point of the figure, ' +
    'and it needs a sentence on the sheet before it ships.',
  'atomic-structure/09-isotope-or-ion':
    'Two columns. ISOTOPE: Cl-35 to Cl-37, neutrons ' +
    'change, protons stay 17, electrons stay 17, still chlorine and still reacts ' +
    'the same. ION: Cl to Cl−, electrons change, protons stay 17, neutrons stay ' +
    'the same, still chlorine but now charged. Centred on the divider: protons ' +
    'never change, and changing them makes it a different element.',
  'atomic-structure/10-why-groups-form-ions':
    'Two rows. Sodium 2, 8, 1 loses 1 to give 2, 8 and ' +
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

const KNOWN_TOKENS = new Set<string>([...Object.values(TOKEN), ...INDICATOR]);

function assertClean(slot: Slot, locale: Locale, markup: string, size: Size): void {
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
  if (new RegExp(`<rect x="0" y="0" width="${size.width}" height="${size.height}"`).test(markup)) {
    throw new Error(`${where}: draws a rect over the whole canvas; the background stays transparent.`);
  }
  const bytes = Buffer.byteLength(markup, 'utf8');
  if (bytes > MAX_BYTES) throw new Error(`${where}: ${bytes} bytes, over the ${MAX_BYTES} ceiling.`);
}

interface Size {
  width: number;
  height: number;
}

/** The attributes of one element, by name. */
function attributesOf(element: string): Map<string, string> {
  return new Map([...element.matchAll(/([\w-]+)="([^"]*)"/g)].map(([, name, value]) => [name, value]));
}

/**
 * Where every shape in a drawing lands, read back from its markup.
 *
 * Labels are measured by `label()` as it places them, because only it knows
 * how wide their words are; everything else is read here, so a new shape
 * cannot be left out of the size by forgetting to report it. The drawings use
 * five elements and paths of straight lines only (`M`, `L`, `Z`); anything
 * else fails the run rather than being silently left out. A stroke reaches
 * half its width past the geometry.
 */
function shapeExtents(markup: string, source: string): Extent[] {
  const extents: Extent[] = [];
  const withoutText = markup.replace(/<text\b[\s\S]*?<\/text>/g, '');
  for (const [element, tag] of withoutText.matchAll(/<(\w+)\b[^>]*>/g)) {
    const a = attributesOf(element);
    const number = (name: string) => Number(a.get(name) ?? 0);
    const half = a.has('stroke-width') ? number('stroke-width') / 2 : 0;
    const box = (points: number[][], pad: number) => {
      const xs = points.map(([x]) => x);
      const ys = points.map(([, y]) => y);
      extents.push({
        source: `${source} <${tag}>`,
        left: Math.min(...xs) - pad,
        right: Math.max(...xs) + pad,
        top: Math.min(...ys) - pad,
        bottom: Math.max(...ys) + pad,
      });
    };
    const pairs = (list: string) => {
      const values = list.match(/-?\d+(?:\.\d+)?/g)!.map(Number);
      return Array.from({ length: values.length / 2 }, (_, i) => [values[2 * i], values[2 * i + 1]]);
    };
    if (tag === 'g') continue;
    if (tag === 'circle') {
      const [cx, cy, r] = [number('cx'), number('cy'), number('r')];
      box([[cx - r, cy - r], [cx + r, cy + r]], a.get('style')?.includes('stroke:') ? half : 0);
    } else if (tag === 'rect') {
      const [x, y] = [number('x'), number('y')];
      box([[x, y], [x + number('width'), y + number('height')]], half);
    } else if (tag === 'path') {
      const d = a.get('d')!;
      if (/[^MLZ\d\s.-]/.test(d)) throw new Error(`${source}: a path with more than M, L and Z: "${d}".`);
      box(pairs(d), half);
    } else if (tag === 'polyline') {
      box(pairs(a.get('points')!), half);
    } else {
      throw new Error(`${source}: <${tag}> is not a shape this script knows the size of.`);
    }
  }
  return extents;
}

/**
 * The canvas a slot needs: everything it draws in every locale, plus `MARGIN`.
 *
 * This is what makes the box hug the drawing. The page draws each slot at a
 * fixed `PX_PER_UNIT`, so the canvas size is the box size; a canvas declared
 * by hand would drift from its drawing the first time a label moved or a
 * translation grew. It is one size per slot, the largest any locale needs, so
 * the six languages share one layout and one box. Rounded up to a multiple of
 * 5 units so that the box is a whole number of CSS px.
 *
 * Nothing may start left of or above the canvas — a drawing is placed, not
 * cropped, and the 16-unit left margin is each drawing's own.
 */
function measureSize(slot: Slot, extents: Extent[]): Size {
  for (const extent of extents) {
    if (extent.left < 0 || extent.top < 0) {
      throw new Error(
        `${slot.key} ${extent.source}: starts at (${Math.round(extent.left)}, ${Math.round(extent.top)}), ` +
          'outside the canvas. Move it right or down.',
      );
    }
  }
  const up = (value: number) => Math.ceil((value + MARGIN) / 5) * 5;
  return {
    width: up(Math.max(...extents.map((extent) => extent.right))),
    height: up(Math.max(...extents.map((extent) => extent.bottom))),
  };
}

/**
 * Draws the slot in one locale, twice, and fails if the two differ.
 *
 * Cheap, and it is the check that matters: everything here is deterministic by
 * construction, and this is what stops a future edit — a `Date`, an unseeded
 * `Math.random`, an id from a counter — from quietly making the whole set churn
 * on every regeneration.
 */
function drawStable(slot: Slot, locale: Locale, fits: Fit[], inked: Extent[]): string {
  const draw = (record: Fit[], ink: Extent[]) =>
    slot.draw(createPen(slot, locale, record, ink, new Set())).join('\n');
  const first = draw(fits, inked);
  if (draw([], []) !== first) {
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
async function assertRenders(slot: Slot, locale: Locale, markup: string, size: Size): Promise<void> {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size.width} ${size.height}" ` +
    `width="${size.width}" height="${size.height}">${markup}</svg>`;
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

function indexModule(sizes: Map<string, Size>): string {
  const entries = SLOTS.map((slot) => {
    const { width, height } = sizes.get(slot.key)!;
    return `  '${slot.key}': { width: ${width}, height: ${height} },`;
  });
  return (
    `${BANNER}//\n` +
    '// Every generated cheat-sheet diagram and its size in drawing units, measured\n' +
    '// from what it draws. The page draws every diagram at CSS_PX_PER_UNIT, so this\n' +
    '// size is also the size of its box. The markup is per locale, in the sibling\n' +
    '// modules, loaded by src/lib/cheat-sheet-diagrams.ts.\n\n' +
    '/** CSS px per drawing unit, on every diagram: a 17.5-unit label is 14 CSS px. */\n' +
    `export const CSS_PX_PER_UNIT = ${PX_PER_UNIT};\n\n` +
    `export const CHEAT_SHEET_DIAGRAMS = {\n${entries.join('\n')}\n} as const;\n\n` +
    'export type CheatSheetDiagramId = keyof typeof CHEAT_SHEET_DIAGRAMS;\n'
  );
}

// --- Run -------------------------------------------------------------------

const checkOnly = process.argv.includes('--check');

assertStringsComplete();

const perLocale = new Map<Locale, Map<string, string>>(LOCALES.map((locale) => [locale, new Map()]));
const sizes = new Map<string, Size>();
for (const slot of SLOTS) {
  const fits: Fit[] = [];
  const extents: Extent[] = [];
  let bytes = 0;
  for (const locale of LOCALES) {
    const markup = drawStable(slot, locale, fits, extents);
    extents.push(...shapeExtents(markup, `[${locale}]`));
    perLocale.get(locale)!.set(slot.key, markup);
    bytes = Math.max(bytes, Buffer.byteLength(markup, 'utf8'));
  }
  const size = measureSize(slot, extents);
  sizes.set(slot.key, size);
  for (const locale of LOCALES) {
    const markup = perLocale.get(locale)!.get(slot.key)!;
    assertClean(slot, locale, markup, size);
    await assertRenders(slot, locale, markup, size);
  }
  const widest = extents.reduce((most, extent) => (extent.right > most.right ? extent : most));
  const tightest = fits.reduce((worst, fit) => (fit.width / fit.room > worst.width / worst.room ? fit : worst));
  console.log(
    `  ${slot.key}  ${size.width}×${size.height} (${n(size.width * PX_PER_UNIT)}×${n(size.height * PX_PER_UNIT)} px, ` +
      `widest: ${widest.source})  ${(bytes / 1024).toFixed(1)} KB  ` +
      `tightest label ${Math.round((100 * tightest.width) / tightest.room)}% of its room (${tightest.source})`,
  );
}

const outputs = new Map<string, string>([['index.ts', indexModule(sizes)]]);
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
