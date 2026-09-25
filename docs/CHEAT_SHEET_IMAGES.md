# Diagrams on cheat sheets

How a cheat-sheet diagram gets onto the page, how to change one or its words,
and what each slot is for.

---

## The short version

Every cheat-sheet section can carry one diagram, in one of two ways.

**Generated (all six diagrams on the two atom sheets).** A drawing function in
`scripts/cheat-sheet-diagrams.mts`, with its words in
`scripts/cheat-sheet-diagram-strings.mts`:

```
npm run cheat-sheets:diagrams              write the modules
npm run cheat-sheets:diagrams -- --check   fail if a module on disk is stale
```

The script draws every slot once per locale and writes TypeScript modules to
`src/generated/cheat-sheet-diagrams/` (`index.ts` plus one per locale). The page
draws the slot **inline**, as SVG, in the reader's language and theme. Changing
one is editing the drawing function or its strings and re-running the script,
never editing the generated modules — the next run overwrites them, and each
says so at the top.

**Hand-made (any other sheet).** Drop a file into `public/cheat-sheets/<slug>/`
and point the section at it with `src`. The page shows it with a plain `<img>`,
the same file in every language. It cannot follow the light/dark toggle — see
*Hand-made files* below.

The script is where the house rules are enforced rather than merely written
down. It refuses a label that is not the body size, more than one large or bold
"focal" item per diagram, a label wider than the room it was given in any
language, a missing string in any language, a number in a string that no longer
matches the chemistry, a literal colour, a `<style>` block, an id that is not
unique on the page, and a baked background. It parses every drawing, draws each
one twice and compares so that a regeneration never churns the repository, and
prints how many strings are still marked `TODO translate`. The reasoning is in
the script's own header.

Slots 8, 9 and 10 from the redesign brief are **not** built: the sections that
would carry them have not been written. Their specifications are in the script,
in `NOT_YET_WRITTEN`, and the run prints them.

---

## Type, colour and contrast

A generated diagram is **inline SVG**, so it sees the page's CSS: its colours
are custom properties that change with `[data-theme]`, and its text is set in
the page's own font (DM Sans, or Manrope on a Russian page).

That is what allows the type scale. **Labels are 17.5 units at weight 400**,
which at the 0.8 CSS px per unit the page draws every diagram at is **14 CSS
px regular — the size and weight of the paragraph above it**. One **focal
item** per diagram may be larger and bold: the Cl symbol and its two numbers,
`2, 8, 1`, the Te and I symbols. Nothing else may.

The colours are these tokens in `src/app/globals.css`, each with a value per
theme, measured against `--diagram-bg` (the page background: `#f8fafc` light,
`#09090b` dark). Text tokens clear 4.5:1 and graphic tokens 3:1 in both
themes, so no label needs to be bold or large to be legible:

| Token | Used for | Dark | Light |
|---|---|---|---|
| `--diagram-ink` | labels, leaders, frames, axes (text) | `#a1a1aa` 7.76:1 | `#475569` 7.24:1 |
| `--diagram-ink-muted` | rules, guide lines; secondary text | `#8b8b94` 5.89:1 | `#64748b` 4.55:1 |
| `--diagram-proton` | a proton, and the number that counts them (text) | `#f87171` 7.19:1 | `#dc2626` 4.62:1 |
| `--diagram-electron` | an electron, its band, its label (text) | `#60a5fa` 7.83:1 | `#2563eb` 4.94:1 |
| `--diagram-neutron` | a neutron's outline (graphic) | `#a1a1aa` 7.76:1 | `#475569` 7.24:1 |
| `--diagram-accent` | a plotted line (graphic) | `#60a5fa` 7.83:1 | `#2563eb` 4.94:1 |
| `--diagram-ph-0` … `--diagram-ph-14` | the universal-indicator colours on the pH scale (graphic, **fixed**) | one value each, set once for both themes | the same |

`--diagram-ink` is the prose's own `--muted`, so a label is never louder than
the paragraph it illustrates. `src/lib/cheat-sheet-diagrams.test.ts` re-measures
every value on each `npm test`, and `e2e/cheat-sheet-diagrams.spec.ts` checks in
a browser that the colours change with the theme and still clear 4.5:1.

Adding a colour is adding a token to both theme blocks in `globals.css`, with
its measured ratios, to `TOKEN` in the script, and to `THRESHOLD` in that test.

**The indicator colours are the one exception**, and the only fixed colours in
any diagram: an indicator's colour is a fact about the indicator, so each is
set once and the light theme does not override it. They carry no text, and
most cannot clear 3:1 on both backgrounds (the yellows fail on light, the
violets on dark; `globals.css` lists every ratio). So every step of the bar is
outlined in `--diagram-ink` and has its pH printed beside it, and the scale
reads without its colours, in either theme and for a red-green colour-blind
reader. They are `INDICATOR` in the script, not `TOKEN`, and
`cheat-sheet-diagrams.test.ts` holds them to that rule instead of a threshold:
set once, and any step under 3:1 on either background outlined.

---

## A diagram's words, in six languages

Every word and number inside a generated diagram is in
`scripts/cheat-sheet-diagram-strings.mts`: one table per slot, with an entry
per locale. Its header is the full guide; in short:

- **Localise, not translate.** Write each label as a chemistry teacher in that
  country would, with the terms in `docs/i18n/glossary-<lang>.md`, and follow
  `docs/i18n/README.md` §4 for numbers: a decimal comma in de, fr, es, it and ru,
  a no-break space before `%` in de, fr, es and ru (`12,5 %`), and none in it
  (`12,5%`).
- **Every locale has every key.** A missing one fails the run; nothing falls
  back to English.
- **`{name}` is a whole number the script fills in** from its chemistry
  constants. Keep the placeholder, and put it wherever the sentence needs it.
  **Any other number is written out in the string**, in the locale's format; the
  script reads it back with that locale's separators and fails if it no longer
  equals the constant.
- **Every label has a fixed amount of room.** The script estimates each label's
  width and fails when one overflows, naming slot, locale and key, and each run
  prints the tightest label per slot. Read README §3a before shortening a word:
  the measurement constrains the layout that made the slot, not the vocabulary.
- A line marked `// TODO translate (task 5/6)` is still the English. Remove the
  marker with the translation; the run prints how many are left.

Then run `npm run cheat-sheets:diagrams` and commit the regenerated modules.

The diagram's **accessible name** is not in this file. It is the section's
`alt` in `src/lib/cheat-sheet-data.ts`, or its `imageAlt` in each
`src/i18n/cheat-sheets/<locale>.ts`, which the page puts on the `<svg>` as
`aria-label`. The drawing itself has no `<title>` or `<desc>`, so there is no
second, English name to disagree with it.

---

## How wide the page draws it

**At a fixed scale, not a fixed width: 0.8 CSS px per unit, on every screen.**
Every 17.5-unit label therefore lands at 14 CSS px, and a diagram that is
legible on the desktop layout is legible everywhere. The scale is
`CSS_PX_PER_UNIT` in the generated index, written by the script, so the page and
the script cannot disagree about it.

**The size is measured, not declared.** No slot says how big it is. The script
takes each canvas from what the slot draws, in all six languages — every label
where it was placed, every shape read back from the markup — adds a 16-unit
margin on the right and at the bottom (the drawings keep 16 on the left
themselves), and rounds up to a multiple of 5 units so the box is a whole
number of CSS px. The page draws the `<svg>` at that size × 0.8, and the
`<svg>`'s own border and background are the box, so the box ends where the
drawing does and sits at the left of the column. It is one size per slot, the
largest any language needs, so all six share one layout. A label that grows in
translation grows the box; nothing is hand-guessed that could drift.
`e2e/cheat-sheet-diagrams.spec.ts` checks the same thing in a browser, in every
locale, against the real glyphs: nothing is cut off, and the widest language
reaches the right-hand edge less the margin.

A diagram wider than the column pans rather than shrinking, because the column
is the limiter. On a 320 px phone the column is **236 px** — the page gutter
and the panel padding take 84 between them — and a 400-unit drawing shrunk to
fit would put its labels at **10 CSS px**. Nothing that can be done to a
drawing fixes that. So it keeps its scale and **pans sideways inside its own
box**, exactly as the lookup tables on the same page do. WCAG 1.4.10 exempts
content that needs a two-dimensional layout from the no-sideways-scrolling
rule, which is the exemption the tables already rely on; the page itself still
reflows at 320 px with no horizontal scrollbar.

Three things follow for anyone drawing one of these:

- **Put nothing load-bearing in the right-hand side alone.** A phone shows the
  left of the drawing first, and a reader who does not swipe sees only that. A
  diagram that reads left-to-right, or whose right-hand side repeats a pattern
  the left has already established, survives this; one whose conclusion is
  bottom-right does not.
- **The script enforces the left-hand rule.** A slot marked `phone` fails the
  run if any label, in any language, ends right of `PHONE` (360 units, what a
  375 px phone shows before a swipe).
- **Narrow is better than wide.** A canvas of 363 units or less (291 CSS px,
  the column on a 375 px phone) does not pan there at all, and `PannableBox`
  then shows no hint and adds no tab stop. The script prints each canvas's size
  and its widest item on every run, so a drawing a few units over is easy to
  pull back in.

Both the diagram and the lookup tables carry a **visible "scroll me"
affordance**: a line of text under the box reading *Scroll sideways to see the
rest* (`cheatSheets.panHint`, translated into all six languages), which fades
out once the box is scrolled to its end.
`src/components/cheat-sheets/PannableBox.tsx` is the component; it also makes
the box a keyboard tab stop while, and only while, it actually pans.

**The affordance does not excuse the rule above it.** A hint tells a reader
there is more; it does not make them swipe, and it does nothing for the reader
who swipes once and stops. The left of the drawing still has to carry it.

---

## The slots on *Atoms & the Periodic Table* — `atomic-structure`

In the order they appear on the page. The key is what a section's
`image.diagram` names, and what the strings table is keyed by. **The sheet
split in two on 2026-09-21**, and three of the original seven diagrams went
with the prose they belong to; they are in the next table. The numbering is
deliberately not closed up: the numbers are names, not positions.

| # | Key | Size | What it should show |
|---|---|---|---|
| 1 | `atomic-structure/01-inside-an-atom` | 400×415 | A nucleus of three filled protons and four hollow neutrons, in a **probability cloud** that is densest against the nucleus and thins out with no gap and no edge — not electrons on circular tracks. Leaders name the electron cloud, the nucleus, one proton and one neutron. One note: not to scale, the nucleus is about 1/100,000 of the atom's *width*. |
| 2 | `atomic-structure/02-atomic-and-mass-number` | 355×310 | The Cl-35 notation: mass number 35 above atomic number 17. "mass number = protons + neutrons" above it and "atomic number = protons" below it, each joined to its number by a leader, and 35 − 17 = 18 neutrons underneath. |
| 5 | `atomic-structure/05-energy-levels` | 335×450 | Sodium as a counting model: a neutral nucleus disc marked Na, three bands with visible edges holding 2, 8 and 1 electrons, the outer electron circled and labelled "outer level", then the focal `2, 8, 1` and "11 electrons", and the line "A way to count electrons, not a picture of an atom." No scale factor: see the script. |
| 6 | `atomic-structure/06-ordered-by-atomic-number` | 360×265 | Tellurium and iodine as two table cells with an arrow for the table's order; "atomic number" and "relative atomic mass" named once, on tellurium's cell; "heavier, but first" and "lighter, but second" under the cells. |

The four sections the split added — groups and periods, metals and non-metals,
atomic size, and reactivity — carry **no diagram**. That is on purpose: the
redesign answers those four with an interactive periodic table, so a placeholder
here would be a slot nobody should fill.

## The slots on *Isotopes & Radioactivity* — `isotopes-and-radioactivity`

| # | Key | Size | What it should show |
|---|---|---|---|
| 3 | `isotopes-and-radioactivity/03-isotopes-of-hydrogen` | 360×345 | Hydrogen-1, -2 and -3 in three rows: one filled proton and one electron in each, and 0, 1 and 2 hollow neutrons. Beside each atom its name, its traditional name (protium, deuterium, tritium) and *stable* or *radioactive*. The electron, the proton and the neutron are each named once, with a leader, from a column on the left. |
| 7 | `isotopes-and-radioactivity/07-decay-and-made-elements` | 360×355 | A decay curve of **undecayed nuclei** against time in half-lives, marked at 100%, 50%, 25%, 12.5% and 6.25% and drawn on past the fourth half-life, never reaching the axis. No title, and no half-lives of named isotopes: the paragraph and the example cards give those. |

**Slot 7 sits under the *Half-life* section, and is now the curve alone.** The
synthetic elements that were the other half of it have moved to the periodic
table widget's *natural or made* view mode. The redesign brief also wanted it
renamed to `07-half-life`; it was not, because the name is the key the data,
the strings and the page share, and renaming it buys nothing that the section
heading above the diagram does not already give.

**Slot 4 is gone, with the section it belonged to.** The owner removed *Why
relative atomic mass is rarely a whole number* from the sheet on 2026-09-22, and
the diagram went with it. It was the weighted-average figure: a 75 / 25 chlorine
bar over a separate mass scale with 35.5 marked a quarter of the way from 35. It
is in git if the section ever comes back; `CHLORINE` is still in the script,
because slot 8 uses it too.

The three sections the split added — the three kinds of radiation, the
65,000-year dating section, and the medical and industrial applications —
carry **no diagram** yet.

## The slot on *Functional Groups* — `functional-groups`

| # | Key | Size | What it should show |
|---|---|---|---|
| 1 | `functional-groups/01-reaction-map` | 360×710 | The reaction pathway as a map, top to bottom. Down the left: alkene → primary alcohol (H₂O, H₃PO₄ catalyst) → aldehyde (Cr₂O₇²⁻/H⁺) → carboxylic acid (Cr₂O₇²⁻/H⁺) → ester (alcohol, H₂SO₄ catalyst). On the right: alkene → haloalkane (HX) → the same primary alcohol (OH⁻ (aq)), and secondary alcohol → ketone (Cr₂O₇²⁻/H⁺) beside the primary alcohol. Group names in boxes, reagents only on the arrows, with real sub- and superscripts (`formulaLabel` in the script). Tertiary alcohols are left to the prose. |

### One rule these diagrams must follow

`docs/AGENT_INSTRUCTIONS.md` Part A names **"rigid solar-system orbits / solid
billiard-ball atoms"** as an anti-pattern that "embeds lasting misconceptions".
This sheet is where that bites hardest, and the diagrams are the part most
likely to break it.

- Electrons are drawn as a **region of probability**, not as dots on a circle.
- A Bohr-style ring diagram may appear **only** if it is labelled as a model
  that is useful and not true. Slot 5 is the one place that is appropriate,
  because it is about counting electrons per level rather than about where they
  are.
- Say the scale. A nucleus is about 1/100,000 of the atom's width, and no
  diagram that fits on a page can show that honestly. Slot 1 carries the note.

**These three are now the diagrams' own job, and that is a change.** Until
2026-09-22 both atom sheets ended with common-mistakes bullets that did the work
instead — *"Drawing electrons on circular tracks, like planets"* and *"Believing
the pictures about size … including the ones on this sheet"*. The owner removed
them from *Atoms & the Periodic Table* and *Isotopes & Radioactivity* in all six
languages, deliberately: **a figure that has to be apologised for in a bullet at
the bottom of the sheet is a figure worth redrawing.** A reader meets the picture
long before the bullet, and most never reach the bullet at all.

So the caveat belongs **on the figure** from here on — a printed note, a scale
break, a label saying a ring is a way to count and not a place to stand — not in
the prose underneath. Improving the two atom diagrams to carry their own caveats
is an open item in [`TODO.md`](./TODO.md) § Atoms cheat sheet; the work is in
`scripts/cheat-sheet-diagrams.mts`, and nothing on the page needs to change for
it.

The alt text on the page describes each diagram as specified above, and it is
the diagram's accessible name, so a diagram that shows something else will
disagree with what a screen-reader user is told. If you change what a diagram
shows, change the `alt` in `src/lib/cheat-sheet-data.ts` **and** the `imageAlt`
in each of `src/i18n/cheat-sheets/{de,fr,es,it,ru}.ts`.

## The slots on *States of Matter* — `states-of-matter`

| # | Key | Size | What it should show |
|---|---|---|---|
| 1 | `states-of-matter/01-particles-in-each-state` | 360×365 | Three boxes stacked, each named on its left: *solid*, a regular touching block resting on the floor of its box; *liquid*, the same number of particles, touching but jumbled, with gaps, across the bottom of the box; *gas*, five particles far apart, each with two short motion marks. **One particle radius in all three** (`PARTICLES.radius`), because "particles expand when heated" is one of the sheet's common mistakes. Under the new first section, *Particles in each state*. |
| 2 | `states-of-matter/02-heating-curve` | 360×340 | Water's heating curve: temperature against **energy added** (not time), ice to steam. Plateaus labelled *melting* at 0 °C and *boiling* at 100 °C, the only two numbers; slopes labelled *solid*, *liquid* and *gas*. The energy axis is to scale and unnumbered: the boiling plateau is 2260 / 334 = 6.8 times the melting one, and ice and steam climb about twice as steeply as water. The curve runs from −80 °C to 180 °C (not printed) so that the ice and steam stretches are wide enough to read as slopes. Under *Heating and cooling curves*. |

Both are drawn from `PARTICLES` and `WATER_HEATING` in the script; the reasoning
is in the doc comments of `drawParticlesInEachState` and `drawHeatingCurve`.

## The slots on *Lewis Structures* — `lewis-structures`

| # | Key | Size | What it should show |
|---|---|---|---|
| 1 | `lewis-structures/01-lewis-structures` | 360×415 | Under *Year 10 essentials*: H₂O, NH₃, CO₂ and CH₄ as Lewis structures, two by two, each with its formula underneath. Bonds are lines (CO₂'s are double), lone pairs are two dots in the electron colour on a free side of their atom, laid out as Share to Fill lays them out: O in H₂O has 2, N in NH₃ has 1, each O in CO₂ has 2 and C none. One leader to "lone pair" and one to "shared pair" (the sheet's term for a bond). |
| 2 | `lewis-structures/02-vsepr-shapes` | 360×665 | Under *From Lewis structure to shape (VSEPR)*: CO₂ linear 180°, BF₃ trigonal planar 120°, CH₄ tetrahedral 109.5°, NH₃ trigonal pyramidal 107°, H₂O bent 104.5°, two to a row. Solid and hashed wedges for 3D; the central atom's lone pairs as lobes holding two dots; an arc marking the angle between the two bonds in the page; under each, its formula and then its shape and angle. |

**The chemistry is checked before anything is drawn.** Every structure is data
in `LEWIS_MOLECULES` in the script, and the run fails unless the formula names
the atoms drawn, the atoms' valence electrons add up to the stated total (CO₂
16, H₂O 8, NH₃ 8, CH₄ 8, BF₃ 24), bonds and lone pairs use exactly those
electrons, every atom ends with a duet, an octet or (boron) six, and no lone
pair sits on a bonded side. Slot 2 also checks each shape against the sheet's
rule (regions and lone pairs → shape), that the angle falls as lone pairs
replace bonds, and that the two atoms drawn in the page really are the stated
angle apart.

## The slot on *Relative Atomic & Formula Mass* — `relative-formula-mass`

| # | Key | Size | What it should show |
|---|---|---|---|
| 1 | `relative-formula-mass/01-carbon-hydrogen-balance` | 360×345 | Under *What "relative" actually means*: a two-pan balance, level, with one carbon atom (a ring marked C) on the left pan and twelve hydrogen atoms (smaller rings marked H, in rows of 5, 4 and 3) on the right. Under each pan its count, **1** and **12**, the focal item, and under that *carbon atom* / *hydrogen atoms* (the noun in the form that goes with its count); under both, the glossary's *not to scale*. The count has a line of its own because, run together, the German *12 Wasserstoffatome* is wider than the room under a pan. Carbon's radius is 2.1 × hydrogen's (their covalent radii), so about 4.4 times the area — larger, and nowhere near 12 ×, because size is not mass. The run checks that 12 × 1.008 is within 1% of 12.011, that the class-table masses (H 1, C 12) balance exactly, and that carbon is drawn at under half of 12 times hydrogen's area. |

## The slot on *Balancing Chemical Equations* — `balancing-equations`

| # | Key | Size | What it should show |
|---|---|---|---|
| 1 | `balancing-equations/01-particle-equation` | 325×270 | Under *A method that always works*: 2H₂ + O₂ → 2H₂O as particles — two H₂ stacked, a plus, one O₂, an arrow, two H₂O stacked — each atom a ring with its symbol, O larger and tinted. *Reactants* and *products* over the two sides, the equation under the particles with real subscripts, and under that the tally: H 4 \| 4, O 2 \| 2, a rule under the arrow. The run reads the atoms out of each formula, fails unless every element balances, prints the counts it computed, and checks that the particles drawn are those counts. |

## The slot on *Chemical Bonds & Structure* — `chemical-bonds`

| # | Key | Size | What it should show |
|---|---|---|---|
| 1 | `chemical-bonds/01-bonding-models` | 360×515 | Under *Why ionic compounds conduct only when molten or dissolved*: three boxes stacked, named on their left with each country's school name for the bond. *Ionic*: a 6 × 5 checkerboard of small cations (a drawn +) and large anions (a drawn −), in the Na⁺ : Cl⁻ radius ratio, 15 of each. *Covalent*: one H₂ molecule, its atoms overlapping, the two electrons of the *shared pair* in the overlap, named with a leader. *Metallic*: 16 cations (1+) in a grid and 16 electrons scattered between them, *delocalised electrons*, named with a leader along the channel between two rows. The run checks the lattice is neutral and the sea holds one electron per unit of cation charge. |

## The slot on *Acids & Bases* — `acids-and-bases`

| # | Key | Size | What it should show |
|---|---|---|---|
| 1 | `acids-and-bases/01-ph-scale` | 330×410 | Under the new first section, *The pH scale*: a vertical bar, pH 0 at the top to 14 at the bottom, one block per whole pH in the universal-indicator colours (`INDICATOR`, above), each outlined in ink with its number printed to its left. Five examples level with their pH, with a short tick: stomach acid 1, vinegar 3, pure water 7, baking soda 8, oven cleaner 13. The run reads the sheet's *pH scale landmarks* table and fails unless each example is named in a row whose range includes its pH, and unless pure water is 7. |

---

## Adding a diagram to a sheet

### Generated (preferred)

1. In `scripts/cheat-sheet-diagrams.mts`, write a drawing function and add the
   slot to `SLOTS` as `[<sheet slug>, <NN-name>, phone, draw]`. Number a new
   sheet's slots from 01. There is no size to give: the script measures the
   canvas from the drawing. Start the drawing 16 units in from the left and
   the top, and keep every label left of `PHONE`.
2. In `scripts/cheat-sheet-diagram-strings.mts`, add a table under
   `'<sheet slug>/<NN-name>'` with every key in all six locales.
3. Run `npm run cheat-sheets:diagrams`, and commit the strings, the script and
   `src/generated/cheat-sheet-diagrams/`.
4. In `src/lib/cheat-sheet-data.ts`, add `image` to the section:

   ```ts
   image: {
     diagram: '<sheet slug>/<NN-name>',
     alt: 'What the diagram shows, in a sentence.',
   },
   ```

   `diagram` is typed by the generated index, so a key that does not exist is
   a type error. Its size comes from the script; do not repeat it here.
5. Add `imageAlt` to the matching section in every
   `src/i18n/cheat-sheets/<locale>.ts`. `cheat-sheets.test.ts` will not catch a
   missing `imageAlt` — it is optional in the type, because most sections have
   no image — so this one is on the reviewer.

### Hand-made files

For a picture the script cannot draw, the old contract still holds: whatever is
at the filename is what the page shows.

1. Put the file in `public/cheat-sheets/<sheet-slug>/` (served at
   `/cheat-sheets/<sheet-slug>/<file>`).
2. Add `image: { src, width, height, alt }` to the section, with `width` and
   `height` the file's intrinsic size — the browser reserves that space before
   it loads, and a wrong size stretches it — and `imageAlt` in each overlay as
   above.

Keep in mind what a file loaded through `<img>` cannot do. It is **its own
document**: it cannot see `[data-theme]`, read a `--diagram-*` token, or use the
page's font, and its text is the same language on every page. So:

- **SVG is preferred**, under about 200 KB. A PNG works at roughly twice its
  listed size, with `src` naming the `.png`.
- **Do not bake the background into the image.** The page draws it on
  `--diagram-bg`, near-white in one theme and near-black in the other; a white
  rectangle behind it is a sticker on the dark theme.
- **Keep text to numbers and symbols**, since it cannot be translated, and
  make what text there is large and bold enough to pass as WCAG large text on
  both backgrounds: no single colour reaches 4.5:1 on both, and slate-500
  `#64748b` (4.55:1 light, 4.18:1 dark) is about the best a neutral can do.
  That constraint is the reason the atom diagrams moved to the generated route.
