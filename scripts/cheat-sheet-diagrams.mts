// scripts/cheat-sheet-diagrams.mts
//
// Makes every diagram on the atomic-structure and isotopes-and-radioactivity
// cheat sheets, under public/cheat-sheets/.
//
//   npm run cheat-sheets:diagrams              write the files
//   npm run cheat-sheets:diagrams -- --check   write nothing; fail if a file on
//                                              disk differs from this script
//
// A sibling of scripts/molecule-images.mts, and built the same way: one drawing
// function per picture, returning an SVG string. That script's DIAGRAMS route —
// `drawRockSalt`, `drawWater`, `drawGlauberCycle` — is the model. Nothing here
// comes from a depictor, because none of these seven is a molecule: they are
// nuclei, a probability cloud, a proportion bar, a decay curve and two
// comparison figures. OpenChemLib is a devDependency, it depicts molecules from
// SMILES, and it is deliberately not imported.
//
// ## Why generated, and not drawn by hand or found
//
// Three reasons, all of which `molecule-images.mts` argues at more length.
//
// **Dark mode.** The page renders a plain `<img src>`, and the site's theme is
// a `data-theme` attribute, not `prefers-color-scheme`. An SVG loaded through
// `<img>` is its own document: it cannot see that attribute, cannot inherit
// `currentColor` and cannot read a CSS variable from the page. So each file has
// to be legible on `#f8fafc` *and* on `#09090b` with no help at all, and a
// media query inside it would desync for anyone who picks light while their OS
// is dark. Generating means the palette is chosen once, in
// `scripts/diagram-palette.mts`, and holds for every picture on the site.
//
// **Checkability.** The numbers on these *are* the lesson: 17 protons, 18
// neutrons, 2-8-1, 75%, 35.5, 5730 years. In a hand-drawn file a wrong one is
// invisible until a student has learnt it. Here each is a named constant next
// to the source it was checked against, and the arithmetic that has to agree is
// computed rather than typed — see `CHLORINE`.
//
// **Type size.** The page draws a 640-wide file into a `max-w-lg` (512px)
// column, so everything renders at about 0.8x. `label()` refuses to emit text
// below the threshold; a hand-drawn file can only be audited for that
// afterwards, and the placeholders these replace failed it.
//
// ## The three rules that shape every drawing here
//
// 1. **No electron is a dot on a circular track.** `docs/AGENT_INSTRUCTIONS.md`
//    Part A names "rigid solar-system orbits / solid billiard-ball atoms" as an
//    anti-pattern that "embeds lasting misconceptions", and these seven are the
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
//    is also made with fill, outline, hatch or a word. There is exactly one
//    usable grey — see the note in `diagram-palette.mts` — so "a lighter grey"
//    is not available as a second channel, and nothing here pretends it is.
//
// ## Determinism
//
// Running this twice with no source change must produce byte-identical files; a
// previous commit on this repository exists solely to stop generated pictures
// churning on every regeneration. So: no timestamps, no counters in ids — every
// id is derived from the slot's own name — no locale-dependent number
// formatting, fixed attribute order, and `n()` on every computed coordinate.
// The scattered marks come from `seeded()`, a fixed-seed integer PRNG, which is
// reproducible on every platform and Node version; that is what makes
// "irregular" and "reproducible" compatible. Every run draws each file twice
// and compares, and `--check` compares against what is on disk.
//
// Runs on Node's built-in TypeScript type stripping, like its siblings, so it
// needs no loader: no enums, no namespaces, no parameter properties, and an
// explicit extension on every relative import.

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { ACID_RED, BASE_BLUE, INK } from './diagram-palette.mts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'public', 'cheat-sheets');

// --- The chemistry, and where each number was checked ----------------------

/**
 * Chlorine's two stable isotopes.
 *
 * **The abundances are rounded, and that is the decision** — open question 2 in
 * §16 of the redesign brief, which asks whether the prose or the diagram moves.
 * Neither does. The measured figures are 75.76% and 24.24% (IUPAC
 * representative isotopic composition; the brief quotes the same pair as
 * 75.8 / 24.2), and the diagram prints them. What it *draws* is 75 / 25,
 * because:
 *
 * - the sheet's prose already says chlorine "is about three-quarters
 *   chlorine-35 and one-quarter chlorine-37", and its common-mistakes list says
 *   "chlorine-35 is three times as common as chlorine-37". Both sentences are
 *   75 / 25 exactly, both are true of 75.76%, and both ship in six languages.
 *   Moving the diagram to 75 / 25 changes no prose in any of them; moving the
 *   prose to "about 76%" would have changed two sentences in six.
 * - 75 / 25 makes the arithmetic on the figure come out *exactly* at the 35.5
 *   the rest of the sheet states. 75.8 / 24.2 gives 35.484, which would have
 *   put an approximation under an equals sign in the one figure whose whole
 *   subject is that the average is not what you would guess.
 *
 * The masses are mass numbers, not isotope masses, for the same reason: it is
 * the arithmetic a Year 10 student is asked to do. Real isotope masses
 * (34.96885 and 36.96590) against real abundances give 35.45 — the standard
 * atomic weight, and the value `src/core-engine/data/elements.ts` carries — but
 * 35.5 is what the VCAA data book, both these sheets and the exam use.
 */
const CHLORINE = {
  protons: 17,
  lightMassNumber: 35,
  heavyMassNumber: 37,
  /** Drawn and labelled as this, and stated on the figure to be rounded. */
  lightAbundance: 0.75,
  /** Printed beside the rounded pair so the rounding is visible, not implied. */
  measured: '75.8% and 24.2%',
  /** What the rest of both sheets says chlorine's relative atomic mass is. */
  relativeAtomicMass: 35.5,
};

/**
 * The pair that shows the table is ordered by protons and not by mass.
 *
 * Checked against `src/core-engine/data/elements.ts` — Te is Z 52 at 127.60,
 * I is Z 53 at 126.90 — and against §12.5 of the redesign brief, which states
 * the same four numbers.
 */
const ORDER_PAIR = [
  { symbol: 'Te', name: 'Tellurium', atomicNumber: 52, mass: '127.60', rank: 'heavier, but first' },
  { symbol: 'I', name: 'Iodine', atomicNumber: 53, mass: '126.90', rank: 'lighter, but second' },
];

/**
 * The two isotopes `07-decay-and-made-elements` names, and their half-lives.
 *
 * Carbon-14 and uranium-238 rather than any other pair: the Victorian
 * Curriculum elaboration for VC2S10U06 names these two specifically. Both
 * numbers are the ones the sheet's own prose and `formulaExamples` already
 * give — "about 5730 years" and "about 4.5 billion years".
 */
const HALF_LIVES = [
  'Carbon-14: one half-life is 5730 years.',
  'Uranium-238: one half-life is 4.5 billion years.',
];

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
  { name: 'hydrogen-1', neutrons: 0 },
  { name: 'hydrogen-2', neutrons: 1 },
  { name: 'hydrogen-3', neutrons: 2 },
];

/**
 * How much smaller a nucleus really is than its atom, written both ways round.
 *
 * Every figure here that puts a nucleus inside an atom says one of these, which
 * `docs/CHEAT_SHEET_IMAGES.md` requires and the sheet's own common-mistakes
 * list repeats: "if the nucleus were a pea, the atom would be a sports field".
 */
const SCALE_FRACTION = '1/100,000';
const SCALE_FACTOR = '100,000';

// --- Type, and the size rule it enforces -----------------------------------

/**
 * The smallest text allowed, in the 640-wide coordinate space.
 *
 * The page draws these into a `max-w-lg` (512px) column, so a 640-wide file
 * renders at about 0.8x and 20 units is about 16 CSS px. The placeholders these
 * replace used 12 to 14, which landed at about 11.
 */
const MIN_TEXT = 20;

/**
 * The smallest size allowed at anything under weight 700.
 *
 * No single grey clears 4.5:1 against both a near-white and a near-black
 * background, so diagram text cannot meet the normal-text contrast threshold
 * and has to qualify as WCAG *large* text and clear 3:1 instead. Large means
 * 24 units here, or 20 at weight 700 — 18.66 CSS px bold, and 20 units draws
 * at 16.
 *
 * The brief only asks for this on text carrying a load-bearing number or
 * label, and this file applies it to every glyph. That is on purpose. The page
 * around these diagrams can afford a per-theme colour — globals.css gives
 * `--muted` a different value in each theme and clears 7:1 both ways — and an
 * `<img>`-loaded SVG cannot. Leaving a sentence at 20 units unbold would be
 * `INK` at 4.18:1 on the dark theme at 16 CSS px, which is below what the
 * paragraph directly above the diagram manages. Sorting labels into
 * load-bearing and not would also have been a judgement call made once per
 * label and never checked again; this way the rule is mechanical.
 */
const MIN_LARGE = 24;

/**
 * A system font stack, on purpose.
 *
 * An SVG loaded through `<img>` is its own document and never sees the page's
 * Nunito, so naming a web font here would silently fall back to something
 * different on every machine. The redesign brief's preamble suggests
 * `DM Sans, ui-sans-serif, system-ui, sans-serif`; the first name in it can
 * never resolve, so it is dropped rather than left in to look deliberate.
 *
 * Single quotes around the two-word family names, not double. These go into an
 * XML attribute rather than into a `<style>` block the way `molecule-images.mts`
 * writes them, and a double quote inside a double-quoted attribute makes a file
 * no renderer will open — which is how this was found.
 */
const SANS = "system-ui, -apple-system, 'Segoe UI', sans-serif";
const MONO = "ui-monospace, 'Cascadia Mono', Menlo, Consolas, monospace";

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

/**
 * A fixed-seed integer PRNG (mulberry32).
 *
 * Every scattered mark in these files comes from here. It is all `Math.imul`
 * and bit operations on a 32-bit integer, so the sequence is identical on every
 * platform and every Node version — which is the only reason a diagram can be
 * both irregular, as the pedagogy requires, and byte-stable, as the repository
 * requires. Each drawing seeds its own so that adding one cannot shift another.
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

interface TextOptions {
  size: number;
  bold?: boolean;
  /** Default `start`, as in SVG. */
  anchor?: 'start' | 'middle' | 'end';
  fill?: string;
  mono?: boolean;
  /** Centre the glyphs on `y` rather than sitting them on it. */
  central?: boolean;
  /** Degrees anticlockwise about `(x, y)`, for an axis label. */
  rotate?: number;
}

/**
 * The only way text gets into any of these files.
 *
 * It throws rather than quietly shrinking, because the failure being prevented
 * is a diagram that looks fine at 640 and is unreadable at the size the page
 * actually draws it — which is exactly what the placeholders did.
 */
function label(x: number, y: number, content: string, options: TextOptions): string {
  const { size, bold, anchor, fill, mono, central, rotate } = options;
  if (size < MIN_TEXT) {
    throw new Error(
      `"${content}" is set at ${size}, below the ${MIN_TEXT} floor. The page ` +
        'draws these at about 0.8x, so it would land under 16 CSS px.',
    );
  }
  if (size < MIN_LARGE && !bold) {
    throw new Error(
      `"${content}" is set at ${size} and is not bold. Below ${MIN_LARGE} it ` +
        'only counts as large text at weight 700, and there is no grey that ' +
        'clears the normal-text threshold on both themes.',
    );
  }
  const attributes = [
    `x="${n(x)}"`,
    `y="${n(y)}"`,
    anchor ? `text-anchor="${anchor}"` : '',
    central ? 'dominant-baseline="central"' : '',
    rotate ? `transform="rotate(${n(-rotate)} ${n(x)} ${n(y)})"` : '',
    `font-family="${mono ? MONO : SANS}"`,
    `font-size="${size}"`,
    bold ? 'font-weight="700"' : '',
    `fill="${fill ?? INK}"`,
  ].filter(Boolean);
  return `<text ${attributes.join(' ')}>${esc(content)}</text>`;
}

/** A straight leader from a label to the thing it names. */
function leader(x1: number, y1: number, x2: number, y2: number): string {
  return (
    `<path d="M ${n(x1)} ${n(y1)} L ${n(x2)} ${n(y2)}" fill="none" stroke="${INK}" ` +
    'stroke-width="2" stroke-linecap="round" />'
  );
}

/** A filled circle: a proton, or one electron's mark. */
function dot(x: number, y: number, radius: number, fill: string, opacity?: number): string {
  const fade = opacity === undefined ? '' : ` fill-opacity="${alpha(opacity)}"`;
  return `<circle cx="${n(x)}" cy="${n(y)}" r="${n(radius)}" fill="${fill}"${fade} />`;
}

/** A hollow circle: a neutron. Fill against outline is the non-colour half of the pair. */
function ring(x: number, y: number, radius: number, stroke: string, width = 3): string {
  return (
    `<circle cx="${n(x)}" cy="${n(y)}" r="${n(radius)}" fill="none" ` +
    `stroke="${stroke}" stroke-width="${width}" />`
  );
}

/** A rounded frame, for the boxed asides. */
function frame(x: number, y: number, width: number, height: number): string {
  return (
    `<rect x="${n(x)}" y="${n(y)}" width="${n(width)}" height="${n(height)}" rx="16" ` +
    `fill="none" stroke="${INK}" stroke-width="2" />`
  );
}

/**
 * A band an electron is somewhere in, with no crisp edge anywhere on it.
 *
 * Five overlapping strokes on a bell profile, not one wide stroke. A single
 * stroke has a hard inner and a hard outer edge, and a hard edge is exactly
 * what turns "a region where the electron probably is" back into the circular
 * track these figures exist to avoid — the first draft of `05-energy-levels`
 * looked like a solar system for precisely that reason.
 */
function softBand(cx: number, cy: number, radius: number, halfWidth: number): string[] {
  // Nine and not five: at five the individual strokes are still visible as
  // concentric rings on the dark theme, which is the thing being avoided.
  const rings = 9;
  const spread = halfWidth * 0.8;
  return Array.from({ length: rings }, (_, index) => {
    const offset = ((index - (rings - 1) / 2) / ((rings - 1) / 2)) * spread;
    const opacity = 0.05 + 0.13 * (1 - Math.abs(offset) / spread);
    return (
      `<circle cx="${n(cx)}" cy="${n(cy)}" r="${n(radius + offset)}" fill="none" ` +
      `stroke="${BASE_BLUE}" stroke-width="${n((halfWidth * 2 * 1.6) / rings)}" ` +
      `stroke-opacity="${alpha(opacity)}" />`
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
      ? dot(cx + dx, cy + dy, radius, ACID_RED)
      : ring(cx + dx, cy + dy, radius, INK, 3),
  );
}

interface Slot {
  /** The file's base name, and the prefix on every id inside it. */
  id: string;
  /** Folder under `public/cheat-sheets/`, which is the sheet's slug. */
  sheet: string;
  width: number;
  height: number;
  /** The file's `<title>`. */
  title: string;
  /**
   * The file's `<desc>`, and the sentence the `alt` in
   * `src/lib/cheat-sheet-data.ts` — and the `imageAlt` in all five overlays —
   * has to describe. Kept here so that changing what a picture shows and
   * changing what a screen-reader user is told are one edit, in one place.
   */
  desc: string;
  draw: (slot: Slot) => string;
}

/**
 * The one shape every file here shares.
 *
 * `role="img"` with a `<title>` and a `<desc>`, both named by
 * `aria-labelledby`. The page also sets `alt` on the `<img>`, which is what a
 * screen reader announces there; these are for anyone who opens the file on its
 * own. Ids carry the slot name so that two of these pasted into one document
 * still have unique ids, and so that no id is ever a counter.
 *
 * No `<rect>` covering the canvas. The page draws this on a surface that is
 * `#f8fafc` in the light theme and `#09090b` in the dark one, and a baked
 * background would be a white sticker on the dark theme.
 */
function svgDocument(slot: Slot, body: string[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generated by scripts/cheat-sheet-diagrams.mts. Do not edit by hand: the
     next run overwrites it. Change the script instead. -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${slot.width} ${slot.height}" width="${slot.width}" height="${slot.height}" role="img" aria-labelledby="${slot.id}-title ${slot.id}-desc">
  <title id="${slot.id}-title">${esc(slot.title)}</title>
  <desc id="${slot.id}-desc">${esc(slot.desc)}</desc>
${body.map((part) => `  ${part}`).join('\n')}
</svg>
`;
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
 * this coordinate space — thinner than any line the file can draw, and a good
 * deal thinner than one pixel once the page has scaled it.
 */
function drawInsideAnAtom(slot: Slot): string {
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

  return svgDocument(slot, [
    `<g fill="${BASE_BLUE}">${marks.join('')}</g>`,
    ...nucleons(cx, cy, 12, places, 3),

    label(336, 66, 'Electrons', { size: 27, bold: true, fill: BASE_BLUE }),
    label(336, 94, 'are somewhere in this', { size: 21, bold: true }),
    label(336, 120, 'fuzzy region — never', { size: 21, bold: true }),
    label(336, 146, 'on a track or an orbit.', { size: 21, bold: true }),

    label(336, 190, 'Nucleus', { size: 27, bold: true, fill: ACID_RED }),
    label(336, 218, 'protons and neutrons,', { size: 21, bold: true }),
    label(336, 244, 'and nearly all the mass.', { size: 21, bold: true }),

    dot(118, 290, 13, ACID_RED),
    label(142, 290, 'filled = proton', { size: 21, bold: true, central: true }),
    ring(338, 290, 13, INK),
    label(362, 290, 'hollow = neutron', { size: 21, bold: true, central: true }),

    label(320, 326, 'Nothing here is to scale. A real nucleus is about', {
      size: 21,
      bold: true,
      anchor: 'middle',
    }),
    label(320, 350, `${SCALE_FRACTION} of the atom — far too small to draw.`, {
      size: 21,
      bold: true,
      anchor: 'middle',
    }),
  ]);
}

// --- 02. Atomic number and mass number -------------------------------------

/**
 * The nuclide symbol, taken apart.
 *
 * The two numbers sit where the notation puts them — mass number above atomic
 * number, both to the left of the symbol — because the point of the figure is
 * that a student can read the notation when they meet it in an exam. §1.6 of
 * the redesign brief is about exactly that mismatch.
 *
 * The atomic number is in the proton colour and the subtraction is worked out
 * rather than asserted, so "mass number minus atomic number" is visible as an
 * operation and not as a fact to memorise.
 */
function drawAtomicAndMassNumber(slot: Slot): string {
  const mass = CHLORINE.lightMassNumber;
  const atomic = CHLORINE.protons;
  const neutrons = mass - atomic;

  return svgDocument(slot, [
    label(320, 34, 'Atomic number and mass number', {
      size: 23,
      bold: true,
      anchor: 'middle',
    }),

    // The symbol sits left, both annotations stack on the right, and the
    // subtraction runs across the bottom. The obvious arrangement — one label
    // up and one down, with the sum boxed beside the symbol — puts the lower
    // leader through either the "Cl" or the box's corner, whichever way it is
    // routed. Both leaders approaching from the same side has neither problem
    // and reads in the order a student asks the questions in.
    label(188, 120, String(mass), { size: 42, bold: true, anchor: 'end', central: true }),
    label(188, 172, String(atomic), {
      size: 42,
      bold: true,
      anchor: 'end',
      central: true,
      fill: ACID_RED,
    }),
    label(196, 146, 'Cl', { size: 84, bold: true, central: true }),

    leader(194, 112, 326, 96),
    label(340, 88, `mass number ${mass}`, { size: 24, bold: true }),
    label(340, 116, 'protons + neutrons', { size: 21, bold: true }),

    leader(194, 180, 326, 196),
    label(340, 190, `atomic number ${atomic}`, {
      size: 24,
      bold: true,
      fill: ACID_RED,
    }),
    label(340, 218, `${atomic} protons, which is`, { size: 21, bold: true }),
    label(340, 244, 'what makes it chlorine', { size: 21, bold: true }),

    `<path d="M 150 268 L 490 268" fill="none" stroke="${INK}" stroke-width="2" ` +
      'stroke-opacity="0.45" stroke-linecap="round" />',
    label(320, 300, `${mass} − ${atomic} = ${neutrons} neutrons`, {
      size: 28,
      bold: true,
      anchor: 'middle',
      mono: true,
    }),
  ]);
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
function drawIsotopesOfHydrogen(slot: Slot): string {
  const centres = [107, 320, 533];
  const cy = 138;
  const band = 44;
  /** One bearing per atom, unrelated to each other on purpose. */
  const electronBearing = [58, 143, 291];
  /** And one radius each, off the middle of the band, for the same reason. */
  const electronRadius = [band - 6, band + 5, band - 3];
  const parts: string[] = [
    label(320, 30, 'All three are hydrogen: 1 proton, 1 electron.', {
      size: 22,
      bold: true,
      anchor: 'middle',
    }),
    label(320, 58, 'Filled = proton, hollow = neutron, outer mark = electron.', {
      size: 20,
      bold: true,
      anchor: 'middle',
    }),
  ];

  HYDROGEN_ISOTOPES.forEach((isotope, index) => {
    const cx = centres[index];

    // A soft band with no edge, and the one electron sitting off the middle of
    // it: a region the electron is likely to be in, which is the most a picture
    // this size can honestly say.
    parts.push(...softBand(cx, cy, band, 11));
    const [ex, ey] = at(cx, cy, electronBearing[index], electronRadius[index]);
    parts.push(dot(ex, ey, 6.5, BASE_BLUE));

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
      label(cx, 218, isotope.name, { size: 25, bold: true, anchor: 'middle' }),
      label(cx, 246, '1 proton', { size: 20, bold: true, anchor: 'middle' }),
    );
    if (isotope.neutrons > 0) {
      parts.push(
        label(cx, 270, `${isotope.neutrons} neutron${isotope.neutrons > 1 ? 's' : ''}`, {
          size: 20,
          bold: true,
          anchor: 'middle',
        }),
      );
    }
  });

  return svgDocument(slot, parts);
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
 * read off the list beside it, which is the operation the figure is for.
 *
 * The periodic table that §12.1 originally put beside the sodium atom is gone —
 * the interactive widget does that job now, and a static table at this size was
 * unreadable anyway.
 */
function drawEnergyLevels(slot: Slot): string {
  const cx = 150;
  const cy = 110;
  const radii = [30, 55, 80];
  const rng = seeded(508);
  const parts: string[] = [];

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
      parts.push(dot(x, y, 6, BASE_BLUE));
    }
  });

  parts.push(
    dot(cx, cy, 17, ACID_RED),
    ring(cx, cy, 17, INK, 2),
    label(cx, 230, `${SODIUM.protons} protons, ${SODIUM.neutrons} neutrons`, {
      size: 20,
      bold: true,
      anchor: 'middle',
    }),

    label(296, 52, SODIUM.levels.join(', '), { size: 46, bold: true }),
    label(296, 82, 'outer level last', { size: 21, bold: true }),
    ...SODIUM.levels.map((count, level) =>
      label(296, 126 + level * 30, `level ${level + 1}: ${count} electron${count > 1 ? 's' : ''}`, {
        size: 21,
        bold: true,
      }),
    ),

    // The rule is not decoration. Without it the nucleus label above reads as
    // the first line of the caveat below, which is how the first draft looked.
    `<path d="M 40 248 L 600 248" fill="none" stroke="${INK}" stroke-width="2" ` +
      'stroke-opacity="0.4" stroke-linecap="round" />',
    label(320, 270, 'A way to count electrons, not a picture of an atom.', {
      size: 20,
      bold: true,
      anchor: 'middle',
    }),
    label(320, 292, `The nucleus is drawn about ${SCALE_FACTOR} times too big.`, {
      size: 20,
      bold: true,
      anchor: 'middle',
    }),
  );

  return svgDocument(slot, parts);
}

// --- 06. Ordered by atomic number ------------------------------------------

/**
 * Tellurium and iodine, the pair that settled the argument.
 *
 * Two table cells side by side, laid out the way a real cell is, so that the
 * figure doubles as practice at reading one. Tellurium is on the left because
 * that is where the table puts it, and the two lines underneath say why in the
 * order a reader will ask: heavier, and yet first.
 *
 * The atomic numbers are in the proton colour, and the line under the heading
 * says in words what that number counts, so the colour is never carrying the
 * meaning alone.
 */
function drawOrderedByAtomicNumber(slot: Slot): string {
  const cellWidth = 190;
  const cellHeight = 146;
  const lefts = [108, 342];
  const parts: string[] = [
    label(320, 30, 'Ordered by atomic number, not by mass', {
      size: 23,
      bold: true,
      anchor: 'middle',
    }),
    label(320, 58, 'The small number counts the protons.', { size: 20, bold: true, anchor: 'middle' }),
  ];

  ORDER_PAIR.forEach((element, index) => {
    const left = lefts[index];
    const mid = left + cellWidth / 2;
    parts.push(
      frame(left, 76, cellWidth, cellHeight),
      label(left + 16, 108, String(element.atomicNumber), {
        size: 26,
        bold: true,
        fill: ACID_RED,
      }),
      label(mid, 154, element.symbol, { size: 54, bold: true, anchor: 'middle' }),
      label(mid, 186, element.name, { size: 21, bold: true, anchor: 'middle' }),
      label(mid, 210, element.mass, {
        size: 23,
        bold: true,
        anchor: 'middle',
        mono: true,
      }),
      label(mid, 250, element.rank, { size: 21, bold: true, anchor: 'middle' }),
    );
  });

  parts.push(
    label(320, 282, `${ORDER_PAIR[0].name} has one proton fewer, so it goes first.`, {
      size: 21,
      bold: true,
      anchor: 'middle',
    }),
  );

  return svgDocument(slot, parts);
}

// --- 07. Half-life ---------------------------------------------------------

/**
 * The decay curve, and only the decay curve.
 *
 * §12.1 of the redesign brief splits this file in two and renames it to
 * `07-half-life.svg`. The rename did not happen and is not worth doing: the
 * filename is the contract `docs/CHEAT_SHEET_IMAGES.md` is built on, and the
 * synthetic elements that were the other half of the old specification have
 * moved to the periodic-table widget's "natural or made" view mode. So the
 * filename stays and the content is the curve alone.
 *
 * The curve is a sampled exponential rather than four straight segments,
 * because the point a student has to take away is that decay does not stop —
 * it is the same fraction again over the next interval, not the same amount.
 * It is drawn past the third half-life for the same reason.
 *
 * Carbon-14 and uranium-238 rather than any other pair: the Victorian
 * Curriculum elaboration for VC2S10U06 names those two.
 */
function drawHalfLife(slot: Slot): string {
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
    label(320, 32, 'Half-life: half of what is left, every time', {
      size: 23,
      bold: true,
      anchor: 'middle',
    }),

    `<path d="M ${originX} 48 L ${originX} ${baseline} L ${n(x(lastTime) + 22)} ${baseline}" ` +
      `fill="none" stroke="${INK}" stroke-width="2.5" stroke-linecap="round" ` +
      'stroke-linejoin="round" />',
    label(66, 123, 'how much is left', { size: 20, bold: true, anchor: 'middle', rotate: 90 }),

    `<polyline points="${samples.join(' ')}" fill="none" stroke="${BASE_BLUE}" ` +
      'stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />',
  ];

  [0, 1, 2, 3].forEach((halfLives) => {
    const fraction = Math.pow(0.5, halfLives);
    const px = x(halfLives);
    const py = y(fraction);
    if (halfLives > 0) {
      parts.push(
        `<path d="M ${n(px)} ${n(py)} L ${n(px)} ${baseline}" fill="none" stroke="${INK}" ` +
          'stroke-width="2" stroke-dasharray="7 6" />',
      );
    }
    parts.push(
      dot(px, py, 6, INK),
      // Percentages, because the axis is a fraction of what there was and a
      // fraction is what the section's takeaway is written in.
      //
      // Lifted clear of the curve except at the start. By the second half-life
      // the curve is shallow enough to run straight through a label placed
      // level with its own point, which is how the first draft read; at time
      // zero it is steep, so level is the only placement that does not collide
      // with the heading above.
      label(px + 15, halfLives === 0 ? py : py - 19, `${n(fraction * 100)}%`, {
        size: 21,
        bold: true,
        central: true,
      }),
      label(px, 226, String(halfLives), { size: 22, bold: true, anchor: 'middle' }),
    );
  });

  parts.push(
    label(536, 226, 'half-lives', { size: 20, bold: true }),
    label(320, 250, 'After 3 half-lives, an eighth is left.', {
      size: 22,
      bold: true,
      anchor: 'middle',
    }),
    frame(50, 262, 540, 52),
    ...HALF_LIVES.map((line, index) =>
      label(320, 284 + index * 23, line, {
        size: 20,
        bold: true,
        anchor: 'middle',
      }),
    ),
  );

  return svgDocument(slot, parts);
}

// --- The slots -------------------------------------------------------------

const SLOTS: Slot[] = [
  {
    id: '01-inside-an-atom',
    sheet: 'atomic-structure',
    width: 640,
    height: 360,
    title: 'Inside an atom',
    desc:
      'A nucleus of three filled protons and four hollow neutrons at the centre, ' +
      'surrounded by a fuzzy cloud of small marks that thins out towards the edge ' +
      'and shows where the electrons are likely to be. A key names filled as ' +
      'proton and hollow as neutron, and a note says nothing is to scale: a real ' +
      'nucleus is about 1/100,000 of the atom.',
    draw: drawInsideAnAtom,
  },
  {
    id: '02-atomic-and-mass-number',
    sheet: 'atomic-structure',
    width: 640,
    height: 320,
    title: 'Atomic number and mass number',
    desc:
      'The symbol for chlorine-35 with the mass number 35 written above the atomic ' +
      'number 17, and arrows labelling each: the mass number is protons plus ' +
      'neutrons, and the atomic number is 17 protons, which is what makes it ' +
      'chlorine. A box works out 35 minus 17 as 18 neutrons.',
    draw: drawAtomicAndMassNumber,
  },
  {
    id: '03-isotopes-of-hydrogen',
    sheet: 'isotopes-and-radioactivity',
    width: 640,
    height: 280,
    title: 'The three isotopes of hydrogen',
    desc:
      'Three hydrogen atoms side by side: one proton, one proton and one neutron, ' +
      'and one proton and two neutrons. Each has a single electron, drawn as one ' +
      'mark in a soft band around the nucleus rather than as a dot on a circle.',
    draw: drawIsotopesOfHydrogen,
  },
  {
    id: '05-energy-levels',
    sheet: 'atomic-structure',
    width: 640,
    height: 300,
    title: 'Sodium: 2, 8, 1',
    desc:
      'A sodium nucleus of 11 protons and 12 neutrons, surrounded by three soft ' +
      'bands holding 2, 8 and 1 electrons as marks at irregular angles rather than ' +
      'dots on circles. Beside it the arrangement 2, 8, 1 with the outer level ' +
      'last, and the count in each level. Across the bottom: a way to count ' +
      'electrons, not a picture of an atom, and the nucleus is drawn about 100,000 ' +
      'times too big.',
    draw: drawEnergyLevels,
  },
  {
    id: '06-ordered-by-atomic-number',
    sheet: 'atomic-structure',
    width: 640,
    height: 300,
    title: 'Ordered by atomic number, not by mass',
    desc:
      'Tellurium and iodine side by side as two periodic-table cells. Tellurium is ' +
      'atomic number 52 at 127.60 and iodine is 53 at 126.90, so tellurium is the ' +
      'heavier of the two and the table still places it first.',
    draw: drawOrderedByAtomicNumber,
  },
  {
    id: '07-decay-and-made-elements',
    sheet: 'isotopes-and-radioactivity',
    width: 640,
    height: 320,
    title: 'Half-life',
    desc:
      'A decay curve falling from 100 per cent to 50, 25 and 12.5 per cent at one, ' +
      'two and three half-lives, with a dashed line down to the axis at each. ' +
      'After three half-lives an eighth is left. One half-life is 5730 years for ' +
      'carbon-14 and about 4.5 billion years for uranium-238.',
    draw: drawHalfLife,
  },
];

/**
 * Slots 8, 9 and 10 from §12.1 of the redesign brief, which are **not** built
 * here.
 *
 * The sections that would carry them have not been written — they are milestone
 * M5 — and a file with no section is an orphan nobody will ever notice is
 * wrong. Their specifications are kept here rather than left in the design doc
 * so that whoever writes those sections has the brief next to the machinery,
 * and so that adding one is adding an entry to `SLOTS` and a drawing function.
 *
 * All three are energy-level or comparison figures, so they reuse everything
 * above: `nucleons`, `label`, `frame`, and for 09 and 10 the same soft-band
 * treatment as `drawEnergyLevels`, including its bottom line.
 */
const NOT_YET_WRITTEN: Record<string, string> = {
  '08-reading-a-table-cell.svg':
    '640×300, atomic-structure. One large cell — 17, Cl, Chlorine, 35.45 — with ' +
    'four leader lines out to labels: atomic number is 17 protons and is what ' +
    'makes it chlorine; symbol; name; relative atomic mass, an average over the ' +
    'isotopes, not a mass number and not a whole number. Along the bottom: mass ' +
    'number belongs to one atom, relative atomic mass belongs to the element. ' +
    'The brief calls this the highest-value of the ten. Note the 35.45 here ' +
    'against the rounded 35.5 the sheets use elsewhere — that difference is ' +
    'the point of the figure, ' +
    'and it needs a sentence on the sheet before it ships.',
  '09-isotope-or-ion.svg':
    '640×340, atomic-structure. Two columns. ISOTOPE: Cl-35 to Cl-37, neutrons ' +
    'change, protons stay 17, electrons stay 17, still chlorine and still reacts ' +
    'the same. ION: Cl to Cl−, electrons change, protons stay 17, neutrons stay ' +
    'the same, still chlorine but now charged. Centred on the divider: protons ' +
    'never change, and changing them makes it a different element.',
  '10-why-groups-form-ions.svg':
    '640×340, atomic-structure. Two rows. Sodium 2, 8, 1 loses 1 to give 2, 8 and ' +
    'Na+; group 1 loses 1 to make 1+. Chlorine 2, 8, 7 gains 1 to give 2, 8, 8 ' +
    'and Cl−; group 17 gains 1 to make 1−. A bottom line: group 18 already has a ' +
    'full outer level, so it does neither. Same band treatment as slot 05, and ' +
    'the same "a way to count electrons" line once at the bottom.',
};

// --- Checks ----------------------------------------------------------------

/** The ceiling from `docs/CHEAT_SHEET_IMAGES.md`. These load on school wifi. */
const MAX_BYTES = 200 * 1024;

/**
 * Things that must never appear in one of these files.
 *
 * The first is the one that would look fine in every test and be wrong for a
 * real reader: a media query inside an `<img>`-loaded SVG cannot see the site's
 * `data-theme`, so it would invert for anyone who picks light while their OS is
 * dark. The rest are the house rules — no script, no foreign object, no
 * external reference, no embedded raster.
 */
const FORBIDDEN: { pattern: RegExp; why: string }[] = [
  {
    pattern: /prefers-color-scheme/,
    why: 'the site switches themes with a data-theme attribute, so a media query desyncs',
  },
  { pattern: /<script/i, why: 'no scripting in a file the page loads through <img>' },
  { pattern: /<foreignObject/i, why: 'does not render inside an <img>' },
  { pattern: /<image\b/i, why: 'no embedded or referenced raster' },
  { pattern: /xlink:href|\bhref=/i, why: 'no external reference' },
  { pattern: /data:/i, why: 'no embedded raster' },
];

function assertClean(slot: Slot, svg: string): void {
  for (const { pattern, why } of FORBIDDEN) {
    if (pattern.test(svg)) {
      throw new Error(`${slot.id}: matches ${pattern} — ${why}.`);
    }
  }
  for (const required of ['role="img"', `<title id="${slot.id}-title">`, `<desc id="${slot.id}-desc">`]) {
    if (!svg.includes(required)) throw new Error(`${slot.id}: has no ${required}.`);
  }
  // A rect the size of the canvas would be a baked background, which is a white
  // sticker on the dark theme.
  const covering = new RegExp(`<rect x="0" y="0" width="${slot.width}" height="${slot.height}"`);
  if (covering.test(svg)) {
    throw new Error(
      `${slot.id}: draws a rect over the whole canvas. The background has to stay ` +
        'transparent — the page is #f8fafc in one theme and #09090b in the other.',
    );
  }
  const bytes = Buffer.byteLength(svg, 'utf8');
  if (bytes > MAX_BYTES) {
    throw new Error(`${slot.id}: ${bytes} bytes, over the ${MAX_BYTES} ceiling.`);
  }
}

/**
 * Draws the file a second time and fails if it came out differently.
 *
 * Cheap, and it is the check that matters: everything here is deterministic by
 * construction, and this is what stops a future edit — a `Date`, an unseeded
 * `Math.random`, an id from a counter — from quietly making the whole set churn
 * on every regeneration.
 */
function assertStable(slot: Slot): string {
  const first = slot.draw(slot);
  const second = slot.draw(slot);
  if (first !== second) {
    throw new Error(
      `${slot.id}: drawn twice in one run, it came out differently. Something in ` +
        'the drawing is not deterministic, and every regeneration will churn.',
    );
  }
  return first;
}

/**
 * Renders the finished SVG and throws if it will not open.
 *
 * Borrowed from `molecule-images.mts`, where it earned its place by catching a
 * file that was valid text, the right size, and completely blank in a browser.
 */
async function assertRenders(slot: Slot, svg: string): Promise<void> {
  try {
    await sharp(Buffer.from(svg)).png().toBuffer();
  } catch (error) {
    throw new Error(`${slot.id}: the SVG this script just wrote does not render. ${error}`);
  }
}

// --- Run -------------------------------------------------------------------

const checkOnly = process.argv.includes('--check');
const stale: string[] = [];

for (const slot of SLOTS) {
  const svg = assertStable(slot);
  assertClean(slot, svg);
  await assertRenders(slot, svg);

  const path = join(outDir, slot.sheet, `${slot.id}.svg`);
  const onDisk = (() => {
    try {
      return readFileSync(path, 'utf8');
    } catch {
      return null;
    }
  })();

  if (checkOnly) {
    if (onDisk !== svg) stale.push(`${slot.sheet}/${slot.id}.svg`);
  } else if (onDisk !== svg) {
    writeFileSync(path, svg, 'utf8');
  }

  const kb = (Buffer.byteLength(svg, 'utf8') / 1024).toFixed(1);
  const state = onDisk === svg ? 'unchanged' : checkOnly ? 'DIFFERS' : 'written';
  console.log(
    `  ${slot.sheet}/${slot.id}.svg  ${slot.width}×${slot.height}  ${kb} KB  (${state})`,
  );
}

if (checkOnly && stale.length > 0) {
  console.error(
    `\n${stale.length} file(s) on disk differ from this script:\n  ${stale.join('\n  ')}\n` +
      'Run `npm run cheat-sheets:diagrams` and commit the result.',
  );
  process.exit(1);
}

console.log(`\n${SLOTS.length} of ${SLOTS.length} diagrams made.`);
console.log(`${Object.keys(NOT_YET_WRITTEN).length} specified but not built, for want of a section:`);
for (const [file, why] of Object.entries(NOT_YET_WRITTEN)) {
  console.log(`  ${file}\n    ${why}`);
}
