# Agent prompt: generate the cheat-sheet diagrams from a script

Copy everything below the line into a fresh agent session. It assumes nothing
from any prior conversation.

Context for whoever is handing it over: this is **milestone M7** of
[`atomic-structure-redesign.md`](./atomic-structure-redesign.md). It is
independent of the periodic-table widget (M1–M3, its own prompt) and touches
disjoint files — `scripts/` and `public/` here, `src/components/periodic-table/`
there — so the two can run in parallel. The only shared file is
`src/lib/cheat-sheet-data.ts`, and this prompt only touches image `width`,
`height` and `alt` on existing sections.

---

You are replacing seven placeholder diagrams with real ones in **chem-games**, a
Next.js 16 + React 19 + Tailwind 4 site of chemistry mini-games and reference
sheets for secondary-school students. Create a branch named
`feature/cheat-sheet-diagrams`.

The seven diagrams sit on two cheat sheets and are currently dashed grey boxes
reading "DIAGRAM TO COME". A student loading either page today sees a wall of
prose interrupted by placeholders.

## Before you write anything

1. **Read `AGENTS.md` at the repo root and obey it.** This is not the Next.js in
   your training data.
2. **Read `scripts/molecule-images.mts` end to end.** This is the model for what
   you are building, and its header already argues the case for generating
   rather than sourcing pictures. Pay attention to:
   - the three routes (STRUCTURES / DIAGRAMS / SOURCED) and which one you are
     copying — **DIAGRAMS**, the hand-written `drawRockSalt`, `drawWater`,
     `drawPolypropylene`, `drawGlauberCycle` functions that return SVG strings;
   - `PALETTE`, `INK`, `OXYGEN`, `ION_CHLORIDE`, `ION_SODIUM` and the comments
     recording *why* each value was chosen;
   - how the run reports what is still on a placeholder, and why.
3. **Read `docs/CHEAT_SHEET_IMAGES.md`** — the file-format contract, the folder
   layout, and the rule about Bohr diagrams.
4. **Read `docs/feature-briefs/atomic-structure-redesign.md` §12.** §12.1 is the
   inventory, §12.3 the two constraints the placeholders get wrong, §12.5 the
   per-diagram specifications. Treat §12.5 as the brief for each drawing
   function, not as text to paste anywhere.
5. **Read `docs/AGENT_INSTRUCTIONS.md` Part A**, in particular the anti-patterns
   table. These seven diagrams are the single easiest thing on the site to get
   pedagogically wrong.

## What to build

`scripts/cheat-sheet-diagrams.mts`, a sibling of `molecule-images.mts`, run by a
new `npm run` script (follow the naming of `explore:images`). One drawing
function per slot, writing SVG to the paths below.

**OpenChemLib is already a devDependency and you will not need it.** It depicts
molecules from SMILES, and none of these seven is a molecule — they are nuclei,
probability clouds, a proportion bar, a decay curve and two comparison figures.
What you are copying from `molecule-images.mts` is the *script*, its palette and
its checking, not the depictor. **Do not add a dependency.**

### The seven slots

| # | Folder under `public/cheat-sheets/` | File | Size | Work |
|---|---|---|---|---|
| 1 | `atomic-structure/` | `01-inside-an-atom.svg` | 640×360 | draw |
| 2 | `atomic-structure/` | `02-atomic-and-mass-number.svg` | 640×320 | draw |
| 3 | `isotopes-and-radioactivity/` | `03-isotopes-of-hydrogen.svg` | 640×280 | draw |
| 4 | `isotopes-and-radioactivity/` | `04-weighted-average.svg` | 640×**340** | draw, **size changes** |
| 5 | `atomic-structure/` | `05-energy-levels.svg` | 640×**300** | draw, **size changes** |
| 6 | `atomic-structure/` | `06-ordered-by-atomic-number.svg` | 640×300 | draw |
| 7 | `isotopes-and-radioactivity/` | `07-decay-and-made-elements.svg` | 640×320 | draw |

Slots 8, 9 and 10 in §12.1 are **out of scope**: the sections that would carry
them have not been written yet (they are milestone M5). Do not emit orphan
files. Do leave the script's structure obviously extensible, and record the
three specs as comments or a `TODO` map so the next person does not have to
re-read the design doc.

**Slot 7 keeps its filename.** §12.1 originally said to rename it to
`07-half-life.svg`; that rename did not happen and is not worth doing now.
Draw only the decay curve — the synthetic-elements half of the old spec moves
to the periodic table widget's *natural or made* view mode.

## The four things that make these diagrams hard

### 1. One palette, both themes, no media query

Reuse the constants from `molecule-images.mts` — `INK = '#64748b'` and friends —
rather than inventing new ones. They are already measured against both surfaces,
and the reasoning is in that file: "emerald-500 measures 2.3:1 on white, which
is fine for a filled shape and too weak for a two-letter label. 600 clears 3:1
on both surfaces."

If you need a colour that file does not have — a neutron grey, a positive
accent — add it there or in a shared module, with the same kind of comment
recording the measured contrast against **both** `#f8fafc` and `#09090b`. An
unmapped colour should be a deliberate choice, not an inherited default.

**Never use a `@media (prefers-color-scheme)` block inside an SVG.** The site
switches themes with a `data-theme` attribute, so a media query would desync for
anyone who picks light while their OS is dark. Transparent background, no `rect`
covering the canvas.

### 2. Text has to survive being scaled to 0.8×

The page renders these into a `max-w-lg` (512px) column, so a 640-wide file
draws at about 0.8×. The existing placeholders use 12–14px, which lands at ~11
CSS px.

Worse, **no single grey meets 4.5:1 against both a near-white and a near-black
background** — it is arithmetically impossible. So diagram text must qualify as
*large* text and clear the 3:1 threshold instead: **≥20px in the 640-wide
coordinate space, and ≥24px (or 20px at `font-weight: 700`) for anything
carrying a load-bearing number or label.**

### 3. The misconception these diagrams exist not to embed

`AGENT_INSTRUCTIONS.md` Part A names "rigid solar-system orbits / solid
billiard-ball atoms" as an anti-pattern that "embeds lasting misconceptions".

- Electrons are **never** dots on a circular track. Where position matters, draw
  a soft region of probability — a blurred or stippled band, marks at irregular
  angles — not points on a line.
- A Bohr-style ring diagram may appear **only** where it is being used to *count*
  electrons per level, and only if the diagram itself carries the words "a way
  to count electrons, not a picture of an atom". That is slot 5.
- **Say the scale.** A nucleus is about 1/100,000 of the atom's width. Slot 1
  carries that note; any diagram implying a nucleus-to-atom size relationship
  needs it.

### 4. Every number must be right, and must agree with the prose

Check each against a source, and check it against what the sheet already says:

- **Slot 4 has a known conflict to resolve.** §12.5 specifies the bar at
  75.8% / 24.2% (the standard chlorine-35 / chlorine-37 abundances), but the
  prose on the sheet says "about three-quarters". Pick one and make both agree —
  either move the prose to "about 76%" or draw 75/25 and say the figures are
  rounded. This is open question 2 in §16; **say in your report which you chose**.
- Slot 6: tellurium 127.60 / Z 52, iodine 126.90 / Z 53.
- Slot 7: carbon-14's half-life is 5730 years. The Victorian Curriculum
  elaboration for VC2S10U06 names carbon-14 and uranium-238 specifically, so
  prefer those over other examples.

## The coupling that is easy to miss

Three slots change what they show, and two change size. Both have consequences
outside `public/`:

- **Changing a size** means updating `width` and `height` on that section's
  `image` in `src/lib/cheat-sheet-data.ts`. They exist to reserve space before
  the image loads; if they disagree with the file, the diagram is stretched and
  the text below jumps as it arrives.
- **Changing what a diagram shows** means updating the `alt` in
  `src/lib/cheat-sheet-data.ts` **and** the `imageAlt` in all five of
  `src/i18n/cheat-sheets/{de,fr,es,it,ru}.ts`. A diagram that disagrees with its
  alt text is worse than a missing diagram, because a screen-reader user is told
  something that is not there. `cheat-sheets.test.ts` will **not** catch a stale
  `imageAlt` — it is optional in the type — so this one is on you.

Specifically: slot 4 gains the arithmetic, slot 5 loses the periodic table
beside the sodium atom, slot 7 loses the synthetic elements. Their current alt
text describes the old specification in six languages.

## Make the output stable

The run must be idempotent: running it twice with no source change must produce
byte-identical files. A previous commit on this repo exists solely to stop the
generated pictures churning on every regeneration, so this is a known trap.

No timestamps, no random or counter-based ids, no locale-dependent number
formatting, stable attribute order, and a fixed number of decimal places on
computed coordinates. Add a check to the run, or a test, that regenerating
leaves `git status` clean.

## Rules of engagement

- Do not add a dependency.
- Do not hardcode colours in the drawing functions — go through the palette.
- Keep each file under 200 KB; these load on school wifi. No `<script>`, no
  `<foreignObject>`, no external references, no embedded raster.
- Every file needs `role="img"` with a `<title>` and `<desc>`.
- Lint with `npm run lint -- src e2e`, **not** over the repo root: build output
  from in-repo worktrees under `.claude/worktrees/` pollutes it. The master
  baseline is 21 problems, all pre-existing; add none. Note the script lives in
  `scripts/`, which that lint invocation does not cover — check how
  `molecule-images.mts` is linted, and match it.
- Another session may hold port 3000, and `next dev` refuses a second server in
  one directory. Check what is listening first and use a free port. If routes
  404 or Turbopack reports an internal error, `rm -rf .next` and restart.
- **Look at the rendered pages** — both sheets, light and dark, 320px and
  desktop. Open each SVG on `#f8fafc` and on `#09090b`; anything that vanishes
  fails. Read them at the size they actually render, on a phone.
- Commit in coherent steps. End each commit message with:
  `Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>`
- There is no `gh` CLI. Do not open a PR; print the compare link.

## Definition of done

- [ ] `npm run lint -- src e2e`, `npm run typecheck`, `npm test`,
      `npm run build` pass; `npm run e2e` passes.
- [ ] The new script regenerates all seven files, and running it twice leaves
      `git status` clean.
- [ ] No placeholder remains on either sheet. Every file is under 200 KB, has a
      transparent background, and contains no `prefers-color-scheme` block.
- [ ] Every diagram is legible rendered into a 512px column on a phone; no text
      below 20px in the 640-wide coordinate space.
- [ ] No diagram shows electrons as dots on a circular track. Slot 5 carries the
      "a way to count electrons, not a picture of an atom" line; slot 1 carries
      the scale note.
- [ ] `width`, `height` and `alt` in `src/lib/cheat-sheet-data.ts` describe the
      files that actually shipped, and `imageAlt` in all five overlays matches.
- [ ] The report names: the chlorine abundance figure you chose and what you
      changed to match; every number you checked and against what; and anything
      you decided that this prompt did not cover.

## Stop and ask

- If resolving the chlorine abundance conflict would need prose changes beyond
  one sentence.
- If a §12.5 specification cannot be drawn legibly at its stated size.
- Before adding any dependency, or any colour you cannot measure.
