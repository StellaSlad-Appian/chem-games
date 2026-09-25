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
which at the 512 px the page draws a 640-unit diagram is **14 CSS px regular —
the size and weight of the paragraph above it**. One **focal item** per diagram
may be larger and bold: the Cl symbol and its two numbers, `2, 8, 1`, the Te
and I symbols. Nothing else may.

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

`--diagram-ink` is the prose's own `--muted`, so a label is never louder than
the paragraph it illustrates. `src/lib/cheat-sheet-diagrams.test.ts` re-measures
every value on each `npm test`, and `e2e/cheat-sheet-diagrams.spec.ts` checks in
a browser that the colours change with the theme and still clear 4.5:1.

Adding a colour is adding a token to both theme blocks in `globals.css`, with
its measured ratios, to `TOKEN` in the script, and to `THRESHOLD` in that test.

---

## A diagram's words, in six languages

Every word and number inside a generated diagram is in
`scripts/cheat-sheet-diagram-strings.mts`: one table per slot, with an entry
per locale. Its header is the full guide; in short:

- **Localise, not translate.** Write each label as a chemistry teacher in that
  country would, with the terms in `docs/i18n/glossary-<lang>.md`, and follow
  `docs/i18n/README.md` §4 for numbers: a decimal comma in de, fr, es, it and ru,
  a no-break space before `%` in de, fr and ru (`12,5 %`).
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

**Always 512 CSS px, at every screen size.** A 640-unit diagram is therefore
always drawn at 0.8×, and its 17.5-unit labels always land at 14 CSS px. A
diagram that is legible on the desktop layout is legible everywhere.

It pans rather than shrinking because the column is the limiter. On a 320 px
phone the column is **236 px** — the page gutter and the panel padding take 84
between them — and at 236 the same label would draw at **6.5 CSS px**. Nothing
that can be done to a drawing fixes that.

So below the `sm` breakpoint the diagram keeps its 512 px and **pans sideways
inside its own box**, exactly as the lookup tables on the same page do. A phone
reader sees 236 px of the diagram at a time and swipes for the rest. WCAG 1.4.10
exempts content that needs a two-dimensional layout from the
no-sideways-scrolling rule, which is the exemption the tables already rely on;
the page itself still reflows at 320 px with no horizontal scrollbar.

Two things follow for anyone drawing one of these:

- **Put nothing load-bearing in the right-hand third alone.** A phone shows the
  left 236 px first, and a reader who does not swipe sees only that. A diagram
  that reads left-to-right, or whose right-hand side repeats a pattern the left
  has already established, survives this; one whose conclusion is bottom-right
  does not.
- **The script enforces the left-hand rule on the four atom diagrams.** A slot
  marked `phone` fails the run if any label, in any language, ends right of
  `PHONE` (360 units, what a 375 px phone shows before a swipe). The drawing
  is still 640 units wide, so on a desktop these four sit in the left of
  their box; that is the price of every label being readable on a phone.
- **The 640-unit width is a ceiling, not a target.** A diagram that says what it
  has to say in 520 units, with the remainder as margin, needs less swiping.

Both the diagram and the lookup tables carry a **visible "scroll me"
affordance**: a line of text under the box reading *Scroll sideways to see the
rest* (`cheatSheets.panHint`, translated into all six languages), which fades
out once the box is scrolled to its end.
`src/components/cheat-sheets/PannableBox.tsx` is the component; it also makes
the box a keyboard tab stop while, and only while, it actually pans.

**The affordance does not excuse the rule above it.** A hint tells a reader
there is more; it does not make them swipe, and it does nothing for the reader
who swipes once and stops. The left 236 px still has to carry the diagram.

---

## The slots on *Atoms & the Periodic Table* — `atomic-structure`

In the order they appear on the page. The key is what a section's
`image.diagram` names, and what the strings table is keyed by. **The sheet
split in two on 2026-09-21**, and three of the original seven diagrams went
with the prose they belong to; they are in the next table. The numbering is
deliberately not closed up: the numbers are names, not positions.

| # | Key | Size | What it should show |
|---|---|---|---|
| 1 | `atomic-structure/01-inside-an-atom` | 640×404 | A nucleus of three filled protons and four hollow neutrons, in a **probability cloud** that is densest against the nucleus and thins out with no gap and no edge — not electrons on circular tracks. Leaders name the electron cloud, the nucleus, one proton and one neutron. One note: not to scale, the nucleus is about 1/100,000 of the atom's *width*. |
| 2 | `atomic-structure/02-atomic-and-mass-number` | 640×304 | The Cl-35 notation: mass number 35 above atomic number 17. "mass number = protons + neutrons" above it and "atomic number = protons" below it, each joined to its number by a leader, and 35 − 17 = 18 neutrons underneath. |
| 5 | `atomic-structure/05-energy-levels` | 640×436 | Sodium as a counting model: a neutral nucleus disc marked Na, three bands with visible edges holding 2, 8 and 1 electrons, the outer electron circled and labelled "outer level", then the focal `2, 8, 1` and "11 electrons", and the line "A way to count electrons, not a picture of an atom." No scale factor: see the script. |
| 6 | `atomic-structure/06-ordered-by-atomic-number` | 640×256 | Tellurium and iodine as two table cells with an arrow for the table's order; "atomic number" and "relative atomic mass" named once, on tellurium's cell; "heavier, but first" and "lighter, but second" under the cells. |

The four sections the split added — groups and periods, metals and non-metals,
atomic size, and reactivity — carry **no diagram**. That is on purpose: the
redesign answers those four with an interactive periodic table, so a placeholder
here would be a slot nobody should fill.

## The slots on *Isotopes & Radioactivity* — `isotopes-and-radioactivity`

| # | Key | Size | What it should show |
|---|---|---|---|
| 3 | `isotopes-and-radioactivity/03-isotopes-of-hydrogen` | 640×280 | Three hydrogen atoms: 1 proton; 1 proton + 1 neutron; 1 proton + 2 neutrons. One electron on each. |
| 7 | `isotopes-and-radioactivity/07-decay-and-made-elements` | 640×320 | A half-life curve halving at each step, with 100%, 50%, 25% and 12.5% marked, and carbon-14 and uranium-238 named underneath. |

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

---

## Adding a diagram to a sheet

### Generated (preferred)

1. In `scripts/cheat-sheet-diagrams.mts`, write a drawing function and add the
   slot to `SLOTS` as `[<sheet slug>, <NN-name>, width, height, draw]`. Number a
   new sheet's slots from 01.
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
