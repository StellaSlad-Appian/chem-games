// scripts/diagram-palette.mts
//
// The colours `scripts/molecule-images.mts` draws with, and the measurement
// that earns each one its place. That script writes the Molecule of the Week
// pictures in public/explore/, which a page loads through `<img src>`.
//
// This is a module, not a runnable script: importing it must have no effect.
// (`molecule-images.mts` runs its whole pipeline at the top level, so these
// could not simply live there and be imported elsewhere.) Colours only one
// route in that script uses — the element colours the depictor needs, the
// stops in the quartz recolour — stay in the script next to their own reasons.
//
// `scripts/cheat-sheet-diagrams.mts` used these too until 2026-09-25. Its
// diagrams are now inline SVG and take their colours from the per-theme
// `--diagram-*` tokens in `src/app/globals.css`, so nothing here applies to
// them.
//
// ## Why one list, measured once
//
// An SVG loaded through `<img>` is its own document: it cannot see the site's
// `data-theme` attribute, cannot inherit `currentColor` and cannot read a CSS
// variable from the page. So one file has to be legible on the light surface
// *and* on the dark one with no help at all, and a
// `@media (prefers-color-scheme)` block inside it would be worse than useless —
// the site switches themes on an attribute, so the query would desync for
// anyone who picks light while their OS is dark.
//
// Every colour here clears the threshold on all four surfaces a picture can
// land on:
//
//   explore card      #ffffff   /  #18181b
//   cheat sheet       #f8fafc   /  #09090b   (globals.css --background)
//
// The cheat-sheet pair stays in the list because a hand-made cheat-sheet file
// (docs/CHEAT_SHEET_IMAGES.md, *Hand-made files*) is under the same constraint.
//
// ## The threshold, and why it is 3:1 and not 4.5:1
//
// No single grey clears 4.5:1 against both a near-white and a near-black
// background; that is arithmetic, not an oversight. The best a neutral can
// manage on the darker of the two is about 4.2:1, and it gets there only by
// sitting in the middle, which is where `INK` sits. So diagram text is drawn
// large enough to qualify as WCAG *large* text and is held to 3:1 instead.
// The ratios in each comment below are against `#f8fafc` and `#09090b`, which
// is the harder of the two pairs for everything here.
//
// ## Adding one
//
// Measure it against both cheat-sheet surfaces *and* both explore surfaces
// before adding it, and write the numbers down here. An unmapped colour throws
// in `molecule-images.mts` rather than falling back, and that is deliberate: a
// new colour should be a decision somebody made, not a default nobody looked
// at.
//
// Two colours that look obvious and are not, recorded so they are not tried
// again. `docs/feature-briefs/atomic-structure-redesign.md` §12.4 suggests
// `#9aa3b2` for emphasis text and `#a1a1aa` for neutrons. Both measure 2.4:1
// on `#f8fafc`: they fail on the light theme, which is the one most students
// will be reading. There is no room for a second grey — see `INK` — so
// emphasis is carried by weight, and a neutron is told apart from a proton by
// fill and by a symbol rather than by a greyer grey.
//
// Runs on Node's built-in TypeScript type stripping, like its importer,
// so: no enums, no namespaces, no parameter properties, `import type` for
// types, and an explicit extension on every relative import.

/**
 * slate-500. Bonds, outlines, body text, anything structural.
 *
 * 4.55:1 on `#f8fafc`, 4.18:1 on `#09090b` — the most a neutral can manage
 * across the pair, and the reason there is only one grey in this file.
 */
export const INK = '#64748b';

/**
 * globals.css `--acid-color`, red-500. Oxygen in a structure; a proton or a
 * positive charge in a diagram.
 *
 * 3.60:1 light, 5.29:1 dark.
 */
export const ACID_RED = '#ef4444';

/**
 * globals.css `--base-color`, blue-500. Nitrogen in a structure; an electron
 * or a negative charge in a diagram.
 *
 * 3.52:1 light, 5.41:1 dark.
 */
export const BASE_BLUE = '#3b82f6';

/**
 * globals.css `--amphoteric-color`, purple-500. Sodium and lithium.
 *
 * 3.78:1 light, 5.03:1 dark.
 */
export const AMPHOTERIC_PURPLE = '#a855f7';

/**
 * emerald-600. Chlorine and chloride.
 *
 * 3.60:1 light, 5.28:1 dark. Emerald-600 rather than the `--neutral-color`
 * emerald-500 the games use: emerald-500 measures 2.3:1 on white, which is
 * fine for a filled shape and too weak for a two-letter label. 600 clears 3:1
 * on both surfaces.
 */
export const EMERALD = '#059669';
