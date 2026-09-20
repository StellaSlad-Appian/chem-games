// scripts/molecule-images.mts
//
// Makes every Molecule of the Week picture in public/explore/molecules/.
//
//   npm run explore:images
//
// Three routes, in descending order of how much this file knows about the
// chemistry:
//
//   STRUCTURES  a SMILES string, drawn by OpenChemLib          (11 entries)
//   DIAGRAMS    a drawing function in this file                 (1 entry)
//   SOURCED     a public-domain file in assets/explore/,
//               recoloured and refitted                         (5 entries)
//
// Whatever is in none of the three keeps its placeholder, and the run prints
// it with the reason. Three do today: water, polypropylene, sodium sulfate.
//
// ## Why generated and not found on the internet
//
// Three reasons, in the order they would have bitten us.
//
// **Dark mode.** The card renders a plain `<img src>`, and the site's theme is
// a `data-theme` attribute, not `prefers-color-scheme`. An SVG loaded through
// `<img>` is its own document: it cannot see the attribute, cannot inherit
// `currentColor`, and cannot read a CSS variable from the page. So the picture
// has to be legible on white *and* on `#18181b` with no help at all. Structure
// diagrams found online are almost universally pure black on transparent,
// which is invisible on the dark card. Generating means the palette below is
// chosen once and holds for every entry.
//
// **Consistency.** Twenty found diagrams are twenty house styles — different
// bond lengths, fonts, stroke weights, some with explicit carbons. The page
// shows one per week, so the inconsistency reads as carelessness rather than
// variety.
//
// **Checkability.** A SMILES string can be verified by a machine; a picture
// cannot. `draw` below re-derives the molecular formula from the SMILES and
// fails the run if it disagrees with the entry, so a mistyped string cannot
// quietly ship a drawing of the wrong compound.
//
// ## Why only eleven come from a SMILES
//
// SMILES describes a molecule, and a depictor draws its skeleton. Nine of the
// pool are either not molecules or not *about* their skeleton, and a generated
// picture would contradict the prose on their own card — see
// `NOT_FROM_SMILES`, which keeps the reason whether or not the entry ended up
// with a picture from somewhere else.
//
// ## On the sourced files
//
// All public domain or CC0, and that is a constraint rather than luck: those
// are the only terms that allow a recolour with no attribution, and the card
// has nowhere to put an attribution line. Better-looking CC BY-SA candidates
// were left alone, and sodium chloride was drawn from scratch for that reason.
//
// ## Regenerating
//
// Output is deterministic and the run takes no network, so it works offline
// and in CI. Re-running it after an OpenChemLib upgrade will show any change
// in the depiction as a diff, which is the point.
//
// Runs on Node's built-in TypeScript type stripping, like
// scripts/i18n-review.mts, so it needs no loader: no enums, no namespaces, no
// parameter properties, and type-only imports must say `import type`.

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as OCL from 'openchemlib';
import sharp from 'sharp';
import { EXPLORE_MOLECULES } from '../src/lib/explore/molecules.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'public', 'explore', 'molecules');
const assetDir = join(root, 'assets', 'explore');

// --- The structures -------------------------------------------------------

interface Structure {
  /** SMILES, as resolved from the entry's own name — see `source`. */
  smiles: string;
  /**
   * The molecular formula this SMILES must produce.
   *
   * For the entries that carry their own `formula`, this is checked against
   * that too, so the table cannot drift from the shipped data. Sodium
   * bicarbonate lives in `COMPOUNDS_REGISTRY` and so carries no formula of
   * its own here; for that one this is a tripwire for this script alone,
   * never a second source of truth for anything the reader sees.
   */
  formula: string;
  /** Where the SMILES came from, so the next person can re-check it. */
  source: string;
  /**
   * Print the R/S label on the stereocentre.
   *
   * Off everywhere but limonene, where the card is *about* R and S and the
   * label is the point. Elsewhere it is jargon on a card written for a reader
   * of about twelve — cholesterol alone would carry eight of them.
   */
  cip?: boolean;
  /**
   * The CIP labels this structure must produce, in atom order, joined.
   *
   * Only set where the stereochemistry was written out by hand rather than
   * resolved from a name, because that is the case where a slip is both easy
   * and invisible: the wrong enantiomer draws perfectly happily.
   */
  mustBeCIP?: string;
  /**
   * Hand-placed 2D coordinates, `[x, y]` per atom in SMILES atom order, y up,
   * one bond length to the unit. Only for the molecules whose automatic layout
   * is not good enough; everything else is laid out by the depictor.
   *
   * This moves atoms, never bonds and never stereochemistry: the SMILES stays
   * the only statement of what the molecule *is*. `assertDepicts` below reads
   * the finished geometry back as a stranger would and fails if it no longer
   * describes the same compound.
   */
  layout?: readonly (readonly [number, number])[];
}

const STRUCTURES: Record<string, Structure> = {
  benzene: {
    smiles: 'c1ccccc1',
    formula: 'C6H6',
    source: 'CACTUS name lookup "benzene"; PubChem CID 241',
  },
  'citric-acid': {
    smiles: 'OC(=O)CC(O)(CC(O)=O)C(O)=O',
    formula: 'C6H8O7',
    source: 'CACTUS name lookup "citric acid"; PubChem CID 311',
  },
  'monosodium-glutamate': {
    // Drawn as what it is: a sodium ion and a glutamate ion, not a covalent
    // molecule. The L form, which is the one that tastes of anything.
    smiles: '[Na+].N[C@@H](CCC(O)=O)C([O-])=O',
    formula: 'C5H8NNaO4',
    source: 'CACTUS name lookup "monosodium glutamate"; PubChem CID 23672308',
  },
  'cfc-12': {
    smiles: 'FC(F)(Cl)Cl',
    formula: 'CCl2F2',
    source: 'CACTUS name lookup "dichlorodifluoromethane"; PubChem CID 6391',
  },
  cholesterol: {
    smiles: 'CC(C)CCC[C@@H](C)[C@H]1CC[C@H]2[C@@H]3CC=C4C[C@@H](O)CC[C@]4(C)[C@H]3CC[C@]12C',
    formula: 'C27H46O',
    source: 'CACTUS name lookup "cholesterol"; PubChem CID 5997',
  },
  'oleic-acid': {
    // The cis double bond is the whole reason the card exists, and `\C=C/`
    // is what puts the kink in the drawing.
    smiles: 'CCCCCCCC\\C=C/CCCCCCCC(O)=O',
    formula: 'C18H34O2',
    source: 'CACTUS name lookup "oleic acid"; PubChem CID 445639',
  },
  adenine: {
    smiles: 'Nc1ncnc2nc[nH]c12',
    formula: 'C5H5N5',
    source: 'CACTUS name lookup "adenine"; PubChem CID 190',
  },
  'sodium-bicarbonate': {
    smiles: '[Na+].OC([O-])=O',
    formula: 'CHNaO3',
    source: 'CACTUS name lookup "sodium bicarbonate"; PubChem CID 516892',
  },
  urea: {
    smiles: 'NC(N)=O',
    formula: 'CH4N2O',
    source: 'CACTUS name lookup "urea"; PubChem CID 1176',
  },
  limonene: {
    // (R)-limonene specifically. CACTUS returns the flat structure for every
    // spelling of the name — "limonene", "D-limonene" and "(R)-limonene" all
    // give `CC(=C)C1CCC(=CC1)C` with no stereocentre — and a flat drawing
    // would contradict a card whose entire chemistry section is about the two
    // mirror images and about the R form being the one in orange oil *and*
    // lemon oil. So the stereocentre is written out by hand, and `mustBeCIP`
    // below makes the run fail if it is ever the wrong one.
    smiles: 'CC(=C)[C@@H]1CCC(C)=CC1',
    formula: 'C10H16',
    source: 'Stereocentre written by hand; R confirmed by OpenChemLib CIP assignment',
    cip: true,
    mustBeCIP: 'R',
  },
  artemisinin: {
    smiles: 'C[C@@H]1CC[C@H]2[C@@H](C)C(=O)O[C@@H]3O[C@@]4(C)CC[C@@H]1[C@@]23OO4',
    formula: 'C15H22O5',
    source: 'CACTUS name lookup "artemisinin"; PubChem CID 68827',
    // The one molecule here the automatic layout cannot handle. Artemisinin
    // is a cage: carbon 17 and carbon 12 are bridgeheads joined by three
    // separate chains, and the depictor threads the three-carbon one straight
    // through the middle of the other two. Five bonds cross and the peroxide
    // is lost in the tangle, which is the part of the molecule the card is
    // about.
    //
    // Nothing else could supply the coordinates: PubChem's 2D records answer
    // 503 from here, and both CACTUS endpoints return 3D coordinates, which
    // project into something worse (26 crossings).
    //
    // So this is the arrangement chemists actually use for it — cyclohexane
    // right, lactone below, trioxane left, peroxide bridged across the top,
    // three-carbon bridge arcing over — with the coordinates worked out on a
    // unit grid rather than traced from anything.
    layout: [
      [0.902, 2.459], // 0  methyl on C1
      [0.902, 1.459], // 1
      [1.764, 0.972], // 2  ┐
      [1.764, 0.0], //   3  │ cyclohexane, right
      [0.861, -0.555], // 4 ┘
      [0.861, -1.528], // 5
      [1.734, -2.016], // 6  methyl on C5
      [0.0, -2.014], //  7  lactone carbonyl
      [0.0, -3.014], //  8  =O
      [-0.806, -1.597], // 9  lactone ring O
      [-0.875, -0.833], // 10 acetal CH
      [-1.667, -0.444], // 11 trioxane O
      [-1.917, 0.347], // 12 bridgehead
      [-2.916, 0.397], // 13 methyl on C12
      [-1.57, 1.25], //  14 ┐ three-carbon bridge,
      [-0.736, 1.389], // 15 ┘ arcing over the top
      [0.0, 0.972], //   16
      [0.0, 0.0], //     17 bridgehead, shared by all three rings
      [-0.528, 0.695], // 18 ┐ the peroxide
      [-1.334, 0.695], // 19 ┘
    ],
  },
};

/**
 * The nine the depictor is not allowed near, and why.
 *
 * Every one of these would draw something its own card says is wrong, or
 * nothing at all. Being here only rules the depictor out; seven of the nine
 * do have a picture, from `DIAGRAMS` or `SOURCED` below. The two that have
 * neither stay on their placeholder, and the run prints them.
 *
 * The reasons are kept even once a picture exists, because they are what stops
 * someone "fixing" the gap later by adding the SMILES that was wrong the first
 * time. Every molecule in the pool has to appear in here or in `STRUCTURES`,
 * so a twenty-first forces the decision rather than silently getting nothing.
 */
const NOT_FROM_SMILES: Record<string, string> = {
  // The three smallest are here for a different reason from the rest, and it
  // is worth being exact about it. OpenChemLib will not draw a bond to a
  // hydrogen: a molecule with one heavy atom collapses to the text "H2O",
  // "CH4", "H3N" however you build it — explicit-H SMILES, atoms added by
  // hand, `setHydrogenProtection`, a custom atom label. All were tried.
  //
  // That is the wrong picture anyway. All three cards are about *shape* —
  // 104.5 degrees, a squashed pyramid, a tetrahedron — and about the lone
  // pairs that cause it. A skeletal depictor draws neither, so even a working
  // depiction would be a formula the card already prints in text two lines
  // below. These want VSEPR diagrams with the lone pairs on them.
  water:
    'The card is about the bent shape, the 104.5 degree angle and the two ' +
    'lone pairs. A depictor draws no lone pairs and, for a one-heavy-atom ' +
    'molecule, no bonds either — it emits the text "H2O".',
  methane:
    'The card is about the tetrahedron, which is a 3D claim a skeletal ' +
    'drawing cannot make. The depictor emits the text "CH4".',
  ammonia:
    'The card is about the squashed pyramid and the spare pair that causes ' +
    'it and makes ammonia a base. The depictor emits the text "H3N".',

  'silicon-dioxide':
    'A continuous network. `O=[Si]=O` is gas-phase SiO2, which is exactly the ' +
    'picture the card spends a paragraph saying quartz is not.',
  'sodium-chloride':
    'An ionic lattice. SMILES gives two ions floating apart, which loses the ' +
    'one thing the card is about.',
  'lithium-cobalt-oxide':
    'A layered oxide. The card is about lithium moving between the layers, so ' +
    'the layers are the picture; disconnected ions are not.',
  kevlar:
    'A polymer. The drawing needs a bracketed repeat unit with an n, and the ' +
    'chains hydrogen-bonded to each other.',
  polypropylene:
    'A polymer. Same bracketed repeat unit, plus the tacticity the card ' +
    'depends on.',
  'sodium-sulfate':
    'The card is about storing heat in Glauber\'s salt, so the crystals earn ' +
    'the slot over any structure diagram — docs/EXPLORE_IMAGES.md says so too.',
};

// --- Palette --------------------------------------------------------------

/**
 * OpenChemLib's CPK colours, remapped to ones that survive both themes.
 *
 * The stock colours are tuned for a white background: chlorine is
 * `rgb(31,240,31)` and fluorine `rgb(144,224,80)`, both of which vanish on
 * white and glare on black. These replacements are the site's own tokens
 * where one fits — the three "theme-neutral" semantic colours in globals.css
 * are already trusted on both backgrounds — and slate-500 for everything
 * structural, which is the darkest tone that still reads on `#09090b`.
 *
 * An unmapped colour throws rather than falling back. A new molecule with,
 * say, bromine in it should force a deliberate choice here, not inherit a
 * default nobody looked at.
 */
const INK = '#64748b'; // slate-500: bonds, carbon, hydrogen, charges
/**
 * Chlorine and sodium, shared with the drawn diagrams below so that a chloride
 * ion is the same colour whether it was drawn by the depictor or by hand.
 *
 * Emerald-600 rather than the `--neutral-color` emerald-500 the games use:
 * emerald-500 measures 2.3:1 on white, which is fine for a filled shape and
 * too weak for a two-letter label. 600 clears 3:1 on both surfaces.
 */
const ION_CHLORIDE = '#059669';
const ION_SODIUM = '#a855f7'; // globals.css --amphoteric-color
const PALETTE: Record<string, string> = {
  'rgb(0,0,0)': INK,
  'rgb(255,13,13)': '#ef4444', // O — globals.css --acid-color
  'rgb(48,80,248)': '#3b82f6', // N — globals.css --base-color
  'rgb(31,240,31)': ION_CHLORIDE,
  'rgb(144,224,80)': '#0891b2', // F — cyan-600, kept clearly apart from Cl
  'rgb(171,92,242)': ION_SODIUM,
  'rgb(204,128,255)': ION_SODIUM, // Li
  'rgb(205,205,38)': '#ca8a04', // S — yellow-600
  'rgb(160,0,0)': INK, // OpenChemLib's stereo annotations
};

// --- Framing --------------------------------------------------------------

/**
 * OpenChemLib's default bond length in the user units it draws in.
 *
 * Measured, not documented: a benzene ring comes out 48 units tall, and a
 * hexagon is two bond lengths tall.
 */
const UNIT_BOND = 24;

/** The slot, from docs/EXPLORE_IMAGES.md and every entry's `image`. */
const BOX_W = 720;
const BOX_H = 400;

/**
 * The longest a bond is allowed to be on the finished card.
 *
 * The slot is 1.8:1 and most of these molecules are not, so fitting alone
 * leaves a compact one — benzene, urea — as a small mark in a wide empty
 * frame. Scaling to fit and capping here gives the small molecules a drawing
 * that fills the card without magnifying two atoms to the width of it.
 *
 * Tuned by eye against benzene at the top of the range and cholesterol at the
 * bottom. Raising it makes the small molecules bigger and changes nothing for
 * the large ones, which are limited by the frame long before this.
 */
const MAX_BOND_PX = 96;

/** Clear space around the structure, in the same units the depictor draws in. */
const PAD = 18;

// --- Generation -----------------------------------------------------------

/** Element counts from a formula string, so Hill order cannot cause a false alarm. */
function parseFormula(formula: string): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const [, el, n] of formula.matchAll(/([A-Z][a-z]?)(\d*)/g)) {
    if (!el) continue;
    counts[el] = (counts[el] ?? 0) + (n ? Number(n) : 1);
  }
  return counts;
}

function sameFormula(a: string, b: string): boolean {
  const x = parseFormula(a);
  const y = parseFormula(b);
  const keys = new Set([...Object.keys(x), ...Object.keys(y)]);
  return [...keys].every((k) => x[k] === y[k]);
}

/**
 * Moves the atoms to a hand-placed layout, then checks the drawing still says
 * what the SMILES says.
 *
 * Re-deriving the wedges is the whole job. A wedge means "towards you"
 * relative to the two bonds either side of it, so the same wedge on the same
 * bond can mean the opposite thing once the neighbours have moved. OpenChemLib
 * keeps the parities from the SMILES and `setStereoBondsFromParity` redraws the
 * wedges to suit the new geometry; skip that call and the picture quietly
 * becomes a different stereoisomer.
 *
 * The check is a round trip through a molfile, because that reads back only
 * what is actually on the page — coordinates and wedges, no memory of the
 * SMILES. It catches the skipped-recompute case. It passes a mirrored layout,
 * which is correct: that is the same compound drawn the other way round.
 * Nothing here can catch a layout that is merely ugly, which is what looking
 * at the output is for.
 */
function applyLayout(molecule: OCL.Molecule, layout: Structure['layout'], id: string): void {
  if (!layout) return;
  if (layout.length !== molecule.getAllAtoms()) {
    throw new Error(
      `${id}: the layout has ${layout.length} atoms, the molecule has ` +
        `${molecule.getAllAtoms()}. Atom order is SMILES order, heavy atoms only.`,
    );
  }

  const expected = molecule.getIDCode();
  layout.forEach(([x, y], atom) => {
    molecule.setAtomX(atom, x);
    // The depictor's y axis points down; the layout is written the way it is
    // read, with y up.
    molecule.setAtomY(atom, -y);
    molecule.setAtomZ(atom, 0);
  });
  molecule.setParitiesValid(0);
  molecule.ensureHelperArrays(OCL.Molecule.cHelperParities);
  molecule.setStereoBondsFromParity();

  const asDepicted = OCL.Molecule.fromMolfile(molecule.toMolfile()).getIDCode();
  if (asDepicted !== expected) {
    throw new Error(
      `${id}: read back off the page, the drawing is a different compound from ` +
        'the SMILES. The layout has moved a stereocentre.',
    );
  }
}

/** Every stereocentre's CIP label in atom order, joined — `'R'`, `'RSS'`, `''`. */
function cipLabels(molecule: OCL.Molecule): string {
  molecule.ensureHelperArrays(OCL.Molecule.cHelperCIP);
  let labels = '';
  for (let atom = 0; atom < molecule.getAllAtoms(); atom += 1) {
    const parity = molecule.getAtomCIPParity(atom);
    if (parity === OCL.Molecule.cAtomCIPParityRorM) labels += 'R';
    else if (parity === OCL.Molecule.cAtomCIPParitySorP) labels += 'S';
  }
  return labels;
}

/**
 * A viewBox of the slot's shape, centred on the content.
 *
 * Padding the box rather than stretching the drawing: the slot is 1.8:1 and
 * almost nothing here is, so the alternative is distortion. `minWidth` stops
 * a small drawing being magnified past the point where it looks silly.
 */
function slotViewBox(
  minX: number,
  minY: number,
  contentW: number,
  contentH: number,
  pad: number,
  minWidth: number,
): string {
  const width = Math.max(contentW + 2 * pad, (contentH + 2 * pad) * (BOX_W / BOX_H), minWidth);
  const height = (width * BOX_H) / BOX_W;
  const cx = minX + contentW / 2;
  const cy = minY + contentH / 2;
  return [cx - width / 2, cy - height / 2, width, height]
    .map((n) => Number(n.toFixed(2)))
    .join(' ');
}

/** Rewrites the depictor's output into the 720x400 slot, in our palette. */
function reframe(raw: string, id: string, smiles: string): string {
  const viewBox = raw.match(/viewBox="([-\d. ]+)"/);
  if (!viewBox) throw new Error(`${id}: the depictor produced no viewBox`);
  const [minX, minY, contentW, contentH] = viewBox[1].split(' ').map(Number);

  // Fit the content, then stop zooming once a bond would exceed MAX_BOND_PX.
  const box = slotViewBox(
    minX,
    minY,
    contentW,
    contentH,
    PAD,
    (UNIT_BOND * BOX_W) / MAX_BOND_PX,
  );

  // Everything between the depictor's own <style> block and </svg>: the lines,
  // polygons and text, with nothing of its root element or styling kept.
  const bodyStart = raw.indexOf('</style>');
  if (bodyStart === -1) throw new Error(`${id}: the depictor produced no <style> to cut at`);
  let body = raw.slice(bodyStart + '</style>'.length, raw.lastIndexOf('</svg>')).trim();

  body = body.replace(/rgb\([0-9, ]+\)/g, (colour) => {
    const mapped = PALETTE[colour];
    if (!mapped) {
      throw new Error(
        `${id}: ${colour} is not in PALETTE. Add it with a colour that reads on ` +
          'both #ffffff and #18181b, rather than letting it through unchecked.',
      );
    }
    return mapped;
  });

  return svgDocument(id, box, body, `SMILES: ${smiles}`);
}

/**
 * The one shape every file in the slot shares.
 *
 * The font stack is a system one on purpose: an SVG loaded through `<img>` is
 * its own document and never sees the page's DM Sans, so naming a web font
 * here would silently fall back to something different on every machine.
 */
function svgDocument(
  id: string,
  viewBox: string,
  body: string,
  note: string,
  namespaces: string[] = [],
): string {
  const extra = namespaces.length > 0 ? ` ${namespaces.join(' ')}` : '';
  return `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generated by scripts/molecule-images.mts. Do not edit by hand: the next
     run overwrites it. Change the script instead.
     ${note} -->
<svg xmlns="http://www.w3.org/2000/svg"${extra} viewBox="${viewBox}" width="${BOX_W}" height="${BOX_H}" id="${id}" role="img">
  <title>${id}</title>
  <style>
    #${id} text { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; }
    #${id} line { stroke-linecap: round; }
    #${id} polygon { stroke-linejoin: round; }
  </style>
${body}
</svg>
`;
}

// --- Drawn by hand --------------------------------------------------------

/**
 * Sodium chloride: the rock-salt lattice.
 *
 * The card opens "there are no sodium chloride molecules in a grain of salt",
 * so a depictor was never going to help — `[Na+].[Cl-]` draws two ions with a
 * gap between them, which is the picture the prose exists to argue against.
 * What the prose describes is 27 sites with the ions alternating along every
 * axis and each one surrounded by six of the other, so that is what this draws.
 *
 * Two things are to scale and worth keeping that way. The ions alternate
 * strictly, so no two of the same kind are ever neighbours — that is the
 * one-to-one ratio the card is about, visible rather than asserted. And the
 * radii are the real ones, 181 pm against 102 pm: chloride really is the big
 * one, which surprises people who expect the metal to be larger.
 *
 * The size difference is also what makes the picture work without colour.
 * Emerald and purple sit at almost the same luminance, so a red-green
 * colour-blind reader cannot separate them by hue — but a 1.8:1 difference in
 * radius is unmissable, and the key repeats it.
 */
function drawRockSalt(): string {
  const CELLS = 3;
  const SPACING = 92;
  /** One step away from the viewer, in screen units: back is up and to the right. */
  const DEPTH_X = 0.7;
  const DEPTH_Y = -0.42;
  const R_CHLORIDE = 34;
  const R_SODIUM = 20;

  const site = (i: number, j: number, k: number): [number, number] => [
    i * SPACING + k * SPACING * DEPTH_X,
    -j * SPACING + k * SPACING * DEPTH_Y,
  ];
  const isChloride = (i: number, j: number, k: number) => (i + j + k) % 2 === 0;
  const radius = (i: number, j: number, k: number) =>
    isChloride(i, j, k) ? R_CHLORIDE : R_SODIUM;
  const n = (v: number) => Number(v.toFixed(1));

  // Painter's algorithm: furthest first, and at equal depth the bonds before
  // the ions, so nothing in front is drawn over by something behind it.
  const items: { depth: number; isIon: boolean; svg: string }[] = [];

  for (let k = 0; k < CELLS; k += 1) {
    for (let j = 0; j < CELLS; j += 1) {
      for (let i = 0; i < CELLS; i += 1) {
        const [x, y] = site(i, j, k);

        for (const [di, dj, dk] of [
          [1, 0, 0],
          [0, 1, 0],
          [0, 0, 1],
        ]) {
          const [ni, nj, nk] = [i + di, j + dj, k + dk];
          if (ni >= CELLS || nj >= CELLS || nk >= CELLS) continue;
          const [x2, y2] = site(ni, nj, nk);
          // Stop each bond at the two ion surfaces rather than at their
          // centres, so it never draws a line across the face of an ion.
          const [dx, dy] = [x2 - x, y2 - y];
          const length = Math.hypot(dx, dy);
          const [ux, uy] = [dx / length, dy / length];
          const r1 = radius(i, j, k);
          const r2 = radius(ni, nj, nk);
          items.push({
            depth: k + dk / 2,
            isIon: false,
            svg:
              `<line x1="${n(x + ux * r1)}" y1="${n(y + uy * r1)}" ` +
              `x2="${n(x2 - ux * r2)}" y2="${n(y2 - uy * r2)}" ` +
              `stroke="${INK}" stroke-width="2.4" />`,
          });
        }

        items.push({
          depth: k,
          isIon: true,
          svg:
            `<circle cx="${n(x)}" cy="${n(y)}" r="${radius(i, j, k)}" ` +
            `fill="${isChloride(i, j, k) ? ION_CHLORIDE : ION_SODIUM}" ` +
            `stroke="${INK}" stroke-width="2" />`,
        });
      }
    }
  }

  items.sort((a, b) => b.depth - a.depth || Number(a.isIon) - Number(b.isIon));

  // Centre the lattice in the space the key leaves it.
  const span = (CELLS - 1) * SPACING;
  const midX = (span + span * DEPTH_X) / 2;
  const midY = (-span + span * DEPTH_Y) / 2;
  const dx = n(235 - midX);
  const dy = n(200 - midY);

  const label = (x: number, y: number, symbol: string, charge: string) =>
    `<text x="${x}" y="${y}" dominant-baseline="central" font-size="30" ` +
    `fill="${INK}">${symbol}<tspan font-size="20" dy="-10">${charge}</tspan></text>`;

  return svgDocument(
    'sodium-chloride',
    `0 0 ${BOX_W} ${BOX_H}`,
    `  <g transform="translate(${dx} ${dy})">
${items.map((item) => `    ${item.svg}`).join('\n')}
  </g>
  <circle cx="508" cy="165" r="${R_CHLORIDE}" fill="${ION_CHLORIDE}" stroke="${INK}" stroke-width="2" />
  ${label(560, 165, 'Cl', '−')}
  <circle cx="508" cy="250" r="${R_SODIUM}" fill="${ION_SODIUM}" stroke="${INK}" stroke-width="2" />
  ${label(560, 250, 'Na', '+')}`,
    'Rock-salt lattice, drawn by drawRockSalt().',
  );
}

/**
 * The entries drawn in code rather than from a SMILES.
 *
 * Each one is here because a depictor would draw something its own card
 * contradicts, and because the right picture is a specific illustration rather
 * than a structural formula.
 */
const DIAGRAMS: Record<string, () => string> = {
  'sodium-chloride': drawRockSalt,
};

// --- Taken from Wikimedia Commons -----------------------------------------

/**
 * A picture somebody else drew, kept under `assets/explore/` exactly as it was
 * downloaded and reprocessed into the slot on every run.
 *
 * Everything here is public domain or CC0, checked against Commons' own
 * metadata on 2026-09-20. That is not a coincidence: it is the only category
 * that can be recoloured and used with no attribution line, and the card has
 * nowhere to put one. Anything under CC BY-SA was left alone.
 *
 * The source file is committed rather than fetched at build time, so the run
 * stays offline and deterministic and so the licence audit has something to
 * look at.
 */
interface Sourced {
  /** Under `assets/explore/`. */
  file: string;
  page: string;
  licence: string;
  author: string;
  /** What this picture shows that the card asks for. */
  why: string;
  /**
   * Hex colour remap, applied to the whole file. Unmapped colours throw, for
   * the same reason `PALETTE` does — see the note there.
   */
  recolour?: Record<string, string>;
  /**
   * A fill for everything in the file that never names one.
   *
   * Two of these draw entirely in the default fill, which is black, which is
   * invisible on the dark card. There is no colour in the file to remap, so
   * the default has to be set instead.
   */
  defaultFill?: string;
  /** Editor leftovers to drop before the colour map ever sees them. */
  strip?: RegExp[];
  /** For a source whose root element gives width and height but no viewBox. */
  viewBox?: string;
}

const INKSCAPE_CRUFT: RegExp[] = [
  /<metadata[\s\S]*?<\/metadata>/g,
  /<sodipodi:namedview[\s\S]*?(?:\/>|<\/sodipodi:namedview>)/g,
  /<!--[\s\S]*?-->/g,
];

// WATER IS NOT HERE, AND IT IS NOT AN OVERSIGHT.
//
// File:Water-with-lone-pairs-3D-balls.png (public domain, Benjah-bmm27) was
// fitted into this slot on 2026-09-20 and pulled the same day: the chemistry
// in it is wrong. Recorded here so nobody finds it on Commons and adds it back
// — it is the obvious candidate, it is correctly licensed, and it is the only
// water picture there that survives the dark card.
//
// Measured off the file, taking the oxygen as the origin: the four electron
// domains project to bearings 222, 317, 45 and 125 degrees — four points about
// 90 degrees apart, near enough a square. The projected H-O-H angle is 94.4
// degrees and the projected lone-pair-O-lone-pair angle is 71.7.
//
// Be careful with that measurement in one direction: a genuinely tetrahedral
// model viewed down a two-fold axis projects to exactly this square, so the
// numbers on their own do not prove the underlying geometry is flat. What they
// do prove is what a reader sees, and that is the problem. On the card the
// lone pairs look pinched closer together than the hydrogens, while the prose
// two lines below says "the lone pairs take up more room than the bonding
// pairs, the molecule ends up bent at about 104.5 degrees". Picture and text
// contradict each other on the one point the card exists to make.
//
// A replacement needs the lone pairs visibly wider apart than the O-H bonds.
// Drawing it is probably easier than finding it.
const SOURCED: Record<string, Sourced> = {
  methane: {
    file: 'methane.svg',
    page: 'https://commons.wikimedia.org/wiki/File:Methane_tetrahedral.svg',
    licence: 'CC0',
    author: 'Hbf878',
    why: 'The tetrahedron, with a wedge and a hash to make it three-dimensional.',
    // Every path in this file relies on the default fill.
    defaultFill: INK,
  },
  ammonia: {
    file: 'ammonia.svg',
    page: 'https://commons.wikimedia.org/wiki/File:Ammonia-dimensions-from-Greenwood%26Earnshaw-2D.svg',
    licence: 'Public domain',
    author: 'Ben Mills, vectorised by Д. Ильин',
    why: "The lone pair drawn explicitly, and the 107.8 degrees the card's "
      + '"squashed pyramid" refers to. The 3D-balls version shows the pyramid '
      + 'but not the spare pair, which is the whole point of the card.',
    defaultFill: INK,
    recolour: {
      '#000': INK,
      '#f00': '#ef4444', // the dimension annotations
    },
  },
  kevlar: {
    file: 'kevlar.svg',
    page: 'https://commons.wikimedia.org/wiki/File:Kevlar_chemical_structure_H-bonds.svg',
    licence: 'CC0',
    author: 'Hbf878',
    why: 'The repeat unit and the hydrogen bonds between neighbouring chains '
      + '— both halves of what makes Kevlar strong.',
    defaultFill: INK,
    recolour: { '#000': INK },
  },
  'silicon-dioxide': {
    file: 'silicon-dioxide.svg',
    page: 'https://commons.wikimedia.org/wiki/File:SiO2_Quartz_extra-O.svg',
    licence: 'Public domain',
    author: 'Wimmel, derivative by Matt',
    why: 'The continuous network — every silicon to four oxygens, every oxygen '
      + 'bridging two silicons, repeating off the edge of the frame.',
    strip: INKSCAPE_CRUFT,
    viewBox: '0 0 287 158',
    recolour: {
      // Oxygen was pale blue and silicon red, which is backwards from every
      // other picture here, where red is oxygen. Swapped, and darkened: the
      // pale blue measured 2.3:1 on white.
      '#e1f1ff': '#fca5a5', // O, light stop
      '#b0daff': '#ef4444', // O, dark stop
      '#ffb9b9': '#fcd34d', // Si, light stop
      '#ff5353': '#d97706', // Si, dark stop
      '#828282': INK, // the bonds
      '#000000': INK, // outlines and the O / Si key
    },
  },
  'lithium-cobalt-oxide': {
    file: 'lithium-cobalt-oxide.png',
    page: 'https://commons.wikimedia.org/wiki/File:Lithium-cobalt-oxide-3D-polyhedra.png',
    licence: 'Public domain',
    author: 'Ben Mills',
    why: 'The layers with the lithium sitting between them, which is the thing '
      + 'the card says moves when the battery charges.',
  },
};

/** Recolours a source SVG and reframes it into the slot. */
function fitSourcedSvg(id: string, source: Sourced): string {
  let svg = readFileSync(join(assetDir, source.file), 'utf8');
  for (const pattern of source.strip ?? []) svg = svg.replace(pattern, '');

  const root = svg.match(/<svg[\s\S]*?>/);
  if (!root) throw new Error(`${id}: ${source.file} has no root <svg> element`);
  const viewBox = source.viewBox ?? root[0].match(/viewBox="([-\d.eE ]+)"/)?.[1];
  if (!viewBox) {
    throw new Error(
      `${id}: ${source.file} has no viewBox. Give the entry one, read off its ` +
        'root width and height.',
    );
  }
  const [minX, minY, w, h] = viewBox.trim().split(/\s+/).map(Number);

  let body = svg.slice(svg.indexOf(root[0]) + root[0].length, svg.lastIndexOf('</svg>'));
  body = body.replace(/#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b/g, (colour) => {
    const mapped = source.recolour?.[colour.toLowerCase()];
    if (!mapped) {
      throw new Error(
        `${id}: ${colour} in ${source.file} is not in its recolour map. Map it ` +
          'to something that reads on both #ffffff and #18181b.',
      );
    }
    return mapped;
  });
  if (source.defaultFill) body = `<g fill="${source.defaultFill}">${body}</g>`;

  // Carried over, not assumed. Replacing the root element drops whatever
  // prefixes the source declared, and a body that still uses one — `xlink:href`
  // on a `<use>`, say — becomes a file no renderer will open. `renders` below
  // is the backstop for the same class of mistake.
  const namespaces = root[0].match(/xmlns:[\w-]+="[^"]*"/g) ?? [];

  return svgDocument(
    id,
    slotViewBox(minX, minY, w, h, 0.05 * Math.max(w, h), 0),
    body,
    `From ${source.page} (${source.licence}, ${source.author}), recoloured.`,
    namespaces,
  );
}

/**
 * Renders a finished SVG and throws if it will not open.
 *
 * Cheap, and it earns its place: the first run of the sourced pipeline wrote
 * an ammonia file whose `<use xlink:href>` had lost its namespace declaration.
 * Nothing else here would have noticed — the file was valid text, the right
 * size, and completely blank in a browser.
 */
async function assertRenders(id: string, svg: string): Promise<void> {
  try {
    await sharp(Buffer.from(svg)).png().toBuffer();
  } catch (error) {
    throw new Error(`${id}: the SVG this script just wrote does not render. ${error}`);
  }
}

/**
 * Pads a source bitmap onto a transparent canvas of the slot's shape.
 *
 * Padded, never cropped: these are molecules on a transparent background, and
 * cropping one to 1.8:1 would cut atoms off. Twice the slot's size, as
 * docs/EXPLORE_IMAGES.md asks, so it stays sharp on a phone.
 */
async function fitSourcedPng(id: string, source: Sourced): Promise<void> {
  const [width, height] = [BOX_W * 2, BOX_H * 2];
  await sharp(join(assetDir, source.file))
    .resize(width, height, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(join(outDir, `${id}.png`));
}

function draw(id: string, structure: Structure, entryFormula: string | undefined): string {
  const molecule = OCL.Molecule.fromSmiles(structure.smiles);

  const derived = molecule.getMolecularFormula().formula;
  if (!sameFormula(derived, structure.formula)) {
    throw new Error(
      `${id}: the SMILES draws ${derived}, but the table says ${structure.formula}. ` +
        'One of the two is wrong, and shipping either would put the wrong ' +
        'molecule on the card.',
    );
  }
  if (entryFormula && !sameFormula(derived, entryFormula)) {
    throw new Error(
      `${id}: the SMILES draws ${derived}, but src/lib/explore/molecules.ts ` +
        `says ${entryFormula}.`,
    );
  }

  if (structure.mustBeCIP !== undefined && cipLabels(molecule) !== structure.mustBeCIP) {
    throw new Error(
      `${id}: the SMILES is ${cipLabels(molecule) || 'achiral'}, but it has to be ` +
        `${structure.mustBeCIP}. The mirror image draws just as happily, which ` +
        'is why this check exists.',
    );
  }

  applyLayout(molecule, structure.layout, id);

  const raw = molecule.toSVG(BOX_W, BOX_H, id, {
    autoCrop: true,
    autoCropMargin: 0,
    // "this enantiomer" and "abs" are OpenChemLib talking to a chemist. The
    // R/S label stays only where the card asks for it.
    suppressChiralText: true,
    suppressESR: true,
    suppressCIPParity: !structure.cip,
  });

  return reframe(raw, id, structure.smiles);
}

// --- Run ------------------------------------------------------------------

const ids = new Set(EXPLORE_MOLECULES.map((m) => m.id));

for (const id of [
  ...Object.keys(STRUCTURES),
  ...Object.keys(NOT_FROM_SMILES),
  ...Object.keys(DIAGRAMS),
  ...Object.keys(SOURCED),
]) {
  if (!ids.has(id)) {
    throw new Error(`${id} is listed here but is not in EXPLORE_MOLECULES. Stale entry?`);
  }
}

const undecided = [...ids].filter((id) => !STRUCTURES[id] && !NOT_FROM_SMILES[id]);
if (undecided.length > 0) {
  throw new Error(
    `No structure and no exemption for: ${undecided.join(', ')}. Add a SMILES to ` +
      'STRUCTURES, or say in NOT_FROM_SMILES why a depictor would draw the ' +
      'wrong thing.',
  );
}

for (const id of [...Object.keys(DIAGRAMS), ...Object.keys(SOURCED)]) {
  if (STRUCTURES[id]) {
    throw new Error(`${id} has both a SMILES and a picture of its own. Pick one.`);
  }
}

const made: string[] = [];

async function write(id: string, svg: string, how: string): Promise<void> {
  await assertRenders(id, svg);
  writeFileSync(join(outDir, `${id}.svg`), svg, 'utf8');
  made.push(`${id}.svg  (${how})`);
}

for (const entry of EXPLORE_MOLECULES) {
  const structure = STRUCTURES[entry.id];
  if (!structure) continue;
  await write(entry.id, draw(entry.id, structure, entry.formula), 'drawn from SMILES');
}

for (const [id, drawDiagram] of Object.entries(DIAGRAMS)) {
  await write(id, drawDiagram(), 'drawn in this script');
}

for (const [id, source] of Object.entries(SOURCED)) {
  if (source.file.endsWith('.svg')) {
    await write(id, fitSourcedSvg(id, source), `${source.licence}, ${source.author}, recoloured`);
  } else {
    await fitSourcedPng(id, source);
    made.push(`${id}.png  (${source.licence}, ${source.author})`);
  }
}

made.sort();
for (const line of made) console.log(`  ${line}`);

const placeholders = [...ids].filter(
  (id) => !STRUCTURES[id] && !DIAGRAMS[id] && !SOURCED[id],
);
console.log(`\n${made.length} of ${ids.size} pictures made.`);
console.log(`${placeholders.length} still on their placeholder:`);
for (const id of placeholders) {
  console.log(`  ${id}\n    ${NOT_FROM_SMILES[id]}`);
}
