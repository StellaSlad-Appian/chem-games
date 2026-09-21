# Diagrams on cheat sheets

Where the image files live, how to replace one, and what each slot is for.

---

## The short version

Every cheat-sheet section can carry one diagram. The image files sit under
`public/`, so **providing a diagram is replacing a file** — no code changes, no
rebuild of the data, no new entry anywhere.

The files that ship today are placeholders: a dashed frame saying what the
diagram should show. That is deliberate. The page has its final layout and its
final alt text from the first commit, so nothing shifts when a real diagram
arrives.

---

## Where to put the files

Open this folder:

```
C:\Users\stella.slad\Documents\GitHub\chem-games\public\cheat-sheets\atomic-structure\
C:\Users\stella.slad\Documents\GitHub\chem-games\public\cheat-sheets\isotopes-and-radioactivity\
```

Replace a file, keep the **same filename**, and the page picks it up. In the
repository the same folders are `public/cheat-sheets/atomic-structure/` and
`public/cheat-sheets/isotopes-and-radioactivity/`, and in the browser they are
served at `/cheat-sheets/<sheet-slug>/<file>`.

A new sheet gets its own folder under `public/cheat-sheets/<sheet-slug>/`.

### File format

- **SVG is preferred.** These are line diagrams; an SVG stays sharp at any size
  and on any screen, and stays small.
- **PNG works**, at roughly twice the listed pixel size so it is sharp on a
  high-density screen. If you supply a PNG, change the file extension in
  `src/lib/cheat-sheet-data.ts` to match — the `src` there names the file.
- Keep it under about 200 KB. These load on school wifi.
- **Do not bake the background into the image.** The page draws it on a surface
  that is white in the light theme and near-black in the dark one, so a
  transparent background with mid-grey lines works in both. A diagram with a
  white rectangle behind it will look like a sticker on the dark theme.

### Size

Each slot below lists a width and height. That is the file's intrinsic size, and
it is written into `src/lib/cheat-sheet-data.ts` so the browser can reserve the
space before the image loads — otherwise the text below jumps down as each
diagram arrives. **If your file is a different size, update `width` and `height`
in that file to match**, or the diagram will be stretched.

### How wide the page draws it

**Always 512 CSS px, at every screen size.** A 640-unit file is therefore always
drawn at 0.8×, and the 20-unit floor the diagrams hold their text to always
lands at 16 CSS px. That is the number
`docs/feature-briefs/atomic-structure-redesign.md` §12 sizes diagram type
against, and it is the reason it can be trusted: a diagram that is legible on
the desktop layout is legible everywhere.

It was not always so. The image used to be `w-full max-w-lg` — 512 px where
there was room for it, and whatever the column had otherwise. On a 320 px phone
the column is **236 px**, because the page gutter and the panel padding take 84
between them, and at 236 the same text drew at **7.4 CSS px**. Nothing that can
be done to an SVG fixes that; the limiter is the column, not the file. Letting
the image break out of the panel padding was considered and is not enough
either — it buys the full 320, which is 10 CSS px.

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
- **The 640-unit width is a ceiling, not a target.** A diagram that says what it
  has to say in 520 units, with the remainder as margin, needs less swiping.

There is no visible "scroll me" affordance, deliberately: the tables above it
have none either, and one of them without the other would read as an
inconsistency rather than a hint. If one is ever added it should be added to
both.

---

## The slots on *Atoms & the Periodic Table* — `atomic-structure`

In the order they appear on the page. **The sheet split in two on 2026-09-21**,
and three of the original seven diagrams went with the prose they belong to;
they are in the next table, in a folder of their own. The numbering is
deliberately not closed up, because the filenames did not change and renaming
them would break the "replacing a diagram is replacing a file" contract this
document exists to keep.

| # | File | Size | What it should show |
|---|---|---|---|
| 1 | `01-inside-an-atom.svg` | 640×360 | A nucleus of protons and neutrons, with a **probability cloud** around it — not electrons on circular tracks. Include a note about the true scale. |
| 2 | `02-atomic-and-mass-number.svg` | 640×320 | The Cl-35 notation: mass number 35 above atomic number 17, with arrows labelling 17 protons and 35 − 17 = 18 neutrons. |
| 5 | `05-energy-levels.svg` | 640×360 | Sodium drawn as 2, 8, 1 beside the periodic table with group 1 highlighted. |
| 6 | `06-ordered-by-atomic-number.svg` | 640×300 | Tellurium and iodine side by side: tellurium heavier, lower atomic number, placed first. |

The four sections the split added — groups and periods, metals and non-metals,
atomic size, and reactivity — carry **no diagram**. That is on purpose: the
redesign answers those four with an interactive periodic table, so a placeholder
here would be a slot nobody should fill.

## The slots on *Isotopes & Radioactivity* — `isotopes-and-radioactivity`

Served from `public/cheat-sheets/isotopes-and-radioactivity/`, and in the
browser from `/cheat-sheets/isotopes-and-radioactivity/<file>`.

| # | File | Size | What it should show |
|---|---|---|---|
| 3 | `03-isotopes-of-hydrogen.svg` | 640×280 | Three hydrogen atoms: 1 proton; 1 proton + 1 neutron; 1 proton + 2 neutrons. One electron on each. |
| 4 | `04-weighted-average.svg` | 640×300 | One bar, 75% chlorine-35 and 25% chlorine-37, with 35.5 marked nearer the 35 end. |
| 7 | `07-decay-and-made-elements.svg` | 640×320 | A half-life curve halving at each step, beside the bottom rows of the table with the synthetic elements highlighted. |

**Slot 7 now sits under the *Half-life* section.** The decay curve is what that
section is about and is the larger half of the file. Its alt text is unchanged
and still describes the whole file, including the made elements that a later
section goes on to explain. The redesign's diagram milestone splits this file in
two and renames it, which is when the second half gets a section of its own;
until then, one file under one section with an accurate alt is the honest
arrangement.

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

The alt text already on the page describes each diagram as specified above, so a
diagram that shows something else will disagree with what a screen-reader user is
told. If you change what a diagram shows, change the `alt` in
`src/lib/cheat-sheet-data.ts` **and** the `imageAlt` in each of
`src/i18n/cheat-sheets/{de,fr,es,it,ru}.ts`.

---

## Adding a diagram to a different sheet

1. Put the file in `public/cheat-sheets/<sheet-slug>/`.
2. In `src/lib/cheat-sheet-data.ts`, add `image` to that section:

   ```ts
   image: {
     src: '/cheat-sheets/<sheet-slug>/<file>.svg',
     width: 640,
     height: 360,
     alt: 'What the diagram shows, in a sentence.',
   },
   ```

3. Add `imageAlt` to the matching section in every
   `src/i18n/cheat-sheets/<locale>.ts`. The image is the same file in every
   language; only the alt text is translated. `cheat-sheets.test.ts` will not
   catch a missing `imageAlt` — it is optional in the type, because most
   sections have no image — so this one is on the reviewer.

`src` is a URL, so it is never translated. Neither is `width` or `height`.
