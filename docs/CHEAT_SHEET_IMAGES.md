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
```

Replace a file, keep the **same filename**, and the page picks it up. In the
repository the same folder is `public/cheat-sheets/atomic-structure/`, and in
the browser it is served at `/cheat-sheets/atomic-structure/<file>`.

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

The page scales the image down to fit; it never scales it up past its own width.

---

## The slots on *Atoms, Isotopes & the Periodic Table*

In the order they appear on the page.

| # | File | Size | What it should show |
|---|---|---|---|
| 1 | `01-inside-an-atom.svg` | 640×360 | A nucleus of protons and neutrons, with a **probability cloud** around it — not electrons on circular tracks. Include a note about the true scale. |
| 2 | `02-atomic-and-mass-number.svg` | 640×320 | The Cl-35 notation: mass number 35 above atomic number 17, with arrows labelling 17 protons and 35 − 17 = 18 neutrons. |
| 3 | `03-isotopes-of-hydrogen.svg` | 640×280 | Three hydrogen atoms: 1 proton; 1 proton + 1 neutron; 1 proton + 2 neutrons. One electron on each. |
| 4 | `04-weighted-average.svg` | 640×300 | One bar, 75% chlorine-35 and 25% chlorine-37, with 35.5 marked nearer the 35 end. |
| 5 | `05-energy-levels.svg` | 640×360 | Sodium drawn as 2, 8, 1 beside the periodic table with group 1 highlighted. |
| 6 | `06-ordered-by-atomic-number.svg` | 640×300 | Tellurium and iodine side by side: tellurium heavier, lower atomic number, placed first. |
| 7 | `07-decay-and-made-elements.svg` | 640×320 | A half-life curve halving at each step, beside the bottom rows of the table with the synthetic elements highlighted. |

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
