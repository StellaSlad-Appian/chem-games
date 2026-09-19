# Agent prompt: the Atoms, Isotopes & the Periodic Table cheat sheet

Copy everything below the line into a fresh agent session. It assumes nothing
from any prior conversation.

Context for whoever is handing it over: this sheet is the site's only missing
foundational topic, and it unblocks the twelve Explore scientists in theme A of
[`explore-scientists.md`](./explore-scientists.md) — every one of them is
currently unschedulable because there is nowhere honest to link them.

---

You are adding one new cheat sheet to **chem-games**, a Next.js 16 + React 19 +
Tailwind 4 + Supabase site of chemistry mini-games and reference sheets for
secondary-school students, aligned to the Victorian Curriculum and VCE. Create a
branch named `feature/cheat-sheet-atomic-structure`.

## Before you write anything

1. **Read `AGENTS.md` at the repo root and obey it.** This is not the Next.js in
   your training data. Read the relevant guide in `node_modules/next/dist/docs/`
   before touching any framework API.
2. **Read `docs/AGENT_INSTRUCTIONS.md`.** Part A is the pedagogical contract and
   applies to reference content as much as to games — in particular the
   anti-patterns table, which matters more for this sheet than for anything else
   on the site (see "The misconception this sheet exists to prevent" below).
   Part B is the platform contract.
3. **Read `docs/i18n/README.md` and `docs/i18n/GAMES.md`.** The every-locale rule
   applies: a sheet that exists in English only is not done.
4. **Read the code you are extending, and match it rather than improving on it:**
   - `src/lib/cheat-sheet-data.ts` — the `CHEAT_SHEETS` array you are adding to.
     Read two existing sheets end to end; `states-of-matter` is the closest in
     level and `lewis-structures` the closest in subject.
   - `src/core-engine/types/general.ts` — `CheatSheetTopic` and its parts.
   - `src/i18n/cheat-sheets.ts` and `src/i18n/cheat-sheets/de.ts` — the overlay
     pattern, and the comment at the top of `cheat-sheets.ts` explaining why the
     structure stays English and only prose is overlaid.
   - `src/i18n/cheat-sheets.test.ts` — the gate. Overlay arrays must line up with
     the English **row for row**; if they do not, the build fails.
   - `supabase/migrations/20260913_create_concepts.sql` — the registry and
     concept-link pattern, and its header comment explaining why sheet *content*
     stays in TypeScript while the table is a registry keyed by slug.

## What to build

One new entry in `CHEAT_SHEETS` with:

```
slug:        'atomic-structure'
category:    'Fundamentals'
yearLevel:   confirm against the Victorian Curriculum before you commit to it.
             Atomic structure and the periodic table sit around Year 8–9;
             isotopes and relative atomic mass push into Year 10. Pick the level
             the *whole sheet* serves and say why in the milestone report.
iconName:    a ChemIconName — the union is `keyof typeof ICON_REGISTRY` in
             src/components/ui/ChemIcon.tsx. Use an existing one; do not add to
             the registry for this.
```

`category` must be one of the nine values in the `CheatSheetCategory` union, and
the same string is checked by the `strand` constraint on `public.concepts` — they
have to agree.

### What the sheet has to teach

Enough that each of these twelve Explore entries can honestly link to it. This
is the acceptance test for scope, not a list of sections:

| | |
|---|---|
| Marie Skłodowska-Curie | isolating an element from a mixture by its radioactivity |
| Irène Joliot-Curie | making an isotope that does not occur in nature |
| Lise Meitner | why a nucleus splitting releases energy, and where the mass went |
| Ida Noddack | discovering an element; predicting fission |
| Marguerite Perey | the last element found in nature |
| Darleane Hoffman | doing chemistry on single atoms |
| Frederick Soddy | isotopes: same element, different mass, same chemistry |
| Francis Aston | separating isotopes by mass |
| Henry Moseley | the table is ordered by **atomic number**, not by mass |
| Glenn Seaborg | the actinides, and redrawing the table's bottom rows |
| Yuri Oganessian | synthesising elements that do not exist in nature |
| Emilio Segrè | technetium — the first element made rather than found |

So the sheet needs, at minimum: protons, neutrons and electrons and where they
sit; atomic number and mass number, and which one defines the element; isotopes
and why they share chemistry; relative atomic mass as a weighted average;
electron arrangement and why it drives the periodic pattern; groups, periods and
what they predict; and a short, honest paragraph on radioactive decay and
synthetic elements.

**It does not need**: orbital shapes beyond s/p at the level the year demands,
quantum numbers, or nuclear binding-energy arithmetic. If you find yourself
writing a formula a Year 10 will not meet, cut it.

### The misconception this sheet exists to prevent

`docs/AGENT_INSTRUCTIONS.md` Part A names **"rigid solar-system orbits / solid
billiard-ball atoms"** as an anti-pattern that "embeds lasting misconceptions",
and asks for "electron density clouds / probability models, with explicit scale
disclaimers". This sheet is where that rule earns its place — it is the single
easiest page on the site to get wrong.

Concretely:

- Electrons occupy **regions of probability**, not tracks. Do not write "orbit",
  "shell" as a physical sphere, or draw circles with dots on them.
- **Say the scale out loud.** A nucleus is roughly 1/100,000 of the atom's width;
  almost all of an atom is empty. Every textbook picture, including any this
  sheet uses, is wrong about scale, and saying so is part of the content.
- "Electron shell" and "energy level" are fine as *names for energy levels* when
  the sheet says that is what they are.
- Bohr diagrams may appear as an explicitly labelled **model that is useful and
  not true**, never as a picture of an atom.
- One entry in `commonMistakes` covers this directly, in a student's words.

Chemical accuracy is absolute: correct symbols, correct atomic numbers, correct
isotope masses and abundances, correct decay products.

### Content fields

- **`keyTakeaways`** — 4–6, each a full sentence a student could revise from.
- **`sections`** — the body. `content` is prose; `examples` are
  `FormulaExample` objects (`name`, `formula`, optional `description`) and are
  rendered with `MoleculeText`, so the formula goes there and never inline in
  the prose.
- **`tables`** — this sheet wants at least two: the subatomic particles (charge,
  relative mass, location) and a first-twenty-elements reference (symbol, atomic
  number, electron arrangement). `formulaColumns` marks which column indices
  render as chemical notation.
- **`commonMistakes`** — including the model/reality one above, plus the two
  that actually cost marks: confusing atomic number with mass number, and
  treating relative atomic mass as a count of anything.
- **`resources`** — reuse the shared `VCAA_DATA_BOOK`, `VCAA_STUDY_DESIGN`,
  `KHAN_HS_CHEM` and `LIBRETEXTS` consts already in that file rather than
  writing new ones, and mark `audience` where it differs.
- **`curriculumRef`** — the real Victorian Curriculum or VCE reference, verified.
- **`relatedGames`** — only a game that genuinely practises this. If none does,
  leave it out; an empty honest field beats a stretched link.

Reading age ~12, one idea per sentence. **Keep every sentence under 30 words** —
`src/lib/explore/readability.test.ts` enforces that for the Explore entries and
the reasoning applies here; the gate does not cover cheat sheets yet, so this one
is on you.

## Every locale

`LOCALES` is `['en', 'de', 'fr', 'es', 'it', 'ru']` — **six**, and Russian is the
newest. The sheet ships in all of them in this milestone.

- English is canonical in `src/lib/cheat-sheet-data.ts`. Every other locale adds
  an overlay entry in `src/i18n/cheat-sheets/<locale>.ts`.
- **The overlay carries prose only.** Slug, icon, colour theme, year level,
  category, formulae, element symbols, URLs and the structural metadata are not
  in it. `formulaExampleNames`, `exampleNames` and table `rows` are positional:
  they must line up with the English arrays element for element, and
  `cheat-sheets.test.ts` fails if they do not.
- Translate against `docs/i18n/glossary-<locale>.md`, and **add any new term to
  the glossary before you translate the prose**. This sheet introduces a lot:
  *nuclide*, *mass number*, *relative atomic mass*, *electron arrangement*,
  *energy level*, *half-life*, *synthetic element*. Several have a school word
  that differs from the IUPAC word in a given language — record which you chose
  and why.
- **Russian has specific rules** set out at the top of `src/i18n/dictionaries/ru.ts`
  and enforced by `src/test-utils/i18n-russian.ts`: « » quotes with no inner
  spaces, em dash with spaces, decimal comma, **ё written out**, formulae and
  element symbols left in Latin, and no past-tense verb whose subject is the
  reader. Read that header before writing a word of it.
- Add `review-notes.ts` entries for the new namespace in every locale, run
  `npm run i18n:review`, and commit the regenerated `docs/i18n/<locale>-review.md`.
- Do the four language checks in `docs/i18n/GAMES.md` per locale and report them.
  Flag anything you are unsure of as `low` confidence rather than shipping it
  quietly. No native speaker has reviewed any locale on this site; do not imply
  otherwise.

## Database registration

Add a **new** migration — never edit an existing one — following
`20260913_create_concepts.sql`:

- a row in `public.cheat_sheets` (slug, title, year_level, category), idempotent
  with `on conflict (slug) do update set …`;
- a row in `public.concepts` for the concept this sheet primarily teaches, with
  the matching `strand`;
- the `concept_cheat_sheets` link, `is_primary` true;
- a `concept_games` link only if a game genuinely practises it.

The page renders from TypeScript and must still render with Supabase
unconfigured. Do not make the sheet read the table.

## Then: unblock the Explore entries

Once the sheet exists, the twelve theme-A scientists can be scheduled.
**Do not schedule them** — that is editorial work with its own balance rules
(`explore-scientists.md` §3, and the AC-7 invariants in
`docs/feature-briefs/explore.md`). Instead:

- remove the `†` markers from the theme-A rows in `explore-scientists.md` §3 and
  update the counts in §2 and §4, which currently read "92 ready, 12 blocked";
- note in §2 that the blocking sheet now exists;
- leave the launch twenty alone.

## Rules of engagement

- Do **not** add a dependency, and do not add to `ICON_REGISTRY` for this.
- Do **not** hardcode colours; use the custom properties in
  `src/app/globals.css`.
- Do **not** put chemistry facts in components. The sheet is data.
- **Grep before adding a type** — `AGENT_INSTRUCTIONS.md` records that this repo
  already carries competing near-duplicate shapes for reaction data.
- Lint with `npm run lint -- src e2e`, not over the repo root. The master
  baseline is 21 problems, all pre-existing; add none.
- Next 16 refuses a second dev server in one directory. If `npm run e2e`
  collides, start your own on a free port and pass
  `PLAYWRIGHT_BASE_URL=http://localhost:<port>`.
- **Look at the rendered page**, in light and dark, at 320px and at desktop, in
  at least English and Russian — Cyrillic sets wider and this sheet has wide
  tables. A lesson from the last feature: Playwright's `toBeVisible()` is
  satisfied by a bounding box and knows nothing about a clipping ancestor, so a
  whole spec once passed against content that was clipped out of sight.
- Commit in coherent steps. End each message with:
  `Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>`

## Definition of done

- [ ] `npm run lint -- src e2e`, `npm run typecheck`, `npm test`,
      `npm run build` all pass; `npm run e2e` passes.
- [ ] The sheet renders at `/{en,de,fr,es,it,ru}/cheat-sheets/atomic-structure`
      and appears in the index grid with the right year filter and category.
- [ ] `cheat-sheets.test.ts` passes — every overlay lines up row for row.
- [ ] A migration exists and is idempotent; the page renders with Supabase
      unconfigured.
- [ ] No horizontal scroll at 320px in any locale, including the tables.
- [ ] Every one of the twelve scientists above could honestly link here, and the
      `†` markers and counts in `explore-scientists.md` are updated.
- [ ] The milestone report names: the year level you chose and why, the new
      glossary terms per locale, the four language checks per locale with
      low-confidence items flagged, and anything you decided that this prompt
      did not cover.
