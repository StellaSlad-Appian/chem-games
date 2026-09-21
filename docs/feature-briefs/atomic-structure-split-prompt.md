# Agent prompt: split *Atoms, Isotopes & the Periodic Table* into two sheets

Copy everything below the line into a fresh agent session. It assumes nothing
from any prior conversation.

Context for whoever is handing it over: this is **milestone M4** of
[`atomic-structure-redesign.md`](./atomic-structure-redesign.md), and it is
deliberately the *first* milestone to be executed even though it is numbered
fourth. The interactive periodic table (M1–M3) and the diagrams (M7) are
separate prompts and do not block this one. Splitting first means the widget
lands on a sheet that already has the right scope.

---

You are splitting one cheat sheet into two in **chem-games**, a Next.js 16 +
React 19 + Tailwind 4 + Supabase site of chemistry mini-games and reference
sheets for secondary-school students, aligned to the Victorian Curriculum and
VCE. Create a branch named `feature/cheat-sheet-atomic-structure-split`.

## Before you write anything

1. **Read `AGENTS.md` at the repo root and obey it.** This is not the Next.js in
   your training data. Read the relevant guide in `node_modules/next/dist/docs/`
   before touching any framework API.
2. **Read `docs/feature-briefs/atomic-structure-redesign.md` §4 in full.** That
   section is the specification for this task. §4.5 is the allocation table,
   §4.6 is the content the curriculum requires that neither sheet has yet, §4.8
   is the Explore re-pointing, and §4.9 is the two sheets at a glance. Where
   this prompt and §4 disagree, §4 wins — tell the user about the disagreement.
3. **Read `docs/AGENT_INSTRUCTIONS.md`.** Part A is the pedagogical contract and
   applies to reference content as much as to games. The anti-patterns table
   matters more here than anywhere else on the site.
4. **Read `docs/i18n/README.md` and `docs/i18n/GAMES.md`.** The every-locale
   rule applies: a sheet that exists in English only is not done.
5. **Read the code you are changing, and match it rather than improving on it:**
   - `src/lib/cheat-sheet-data.ts` — the `CHEAT_SHEETS` array. The
     `atomic-structure` entry is what you are splitting.
   - `src/core-engine/types/general.ts` — `CheatSheetTopic` and its parts.
   - `src/i18n/cheat-sheets.ts` — the overlay pattern, and the comment at the
     top explaining why structure stays English and only prose is overlaid.
   - `src/i18n/cheat-sheets/{de,fr,es,it,ru}.ts` — the five overlays.
   - `src/i18n/cheat-sheets.test.ts` — **the gate.** Overlay arrays must line up
     with the English row for row. If they do not, the suite fails.
   - `supabase/migrations/20260913_create_concepts.sql` — the registry and
     concept-link pattern, and its header comment.
   - `docs/feature-briefs/explore-scientists.md` — §3 has the twelve theme-A
     scientists whose links move.

## What the split is, and why

The Victorian Curriculum F–10 **Version 2.0** bands Levels 9 and 10 together —
there is no separate Level 9 or Level 10 Science content description. But within
that band, atomic structure sits in **two** content descriptions, and that is
the line to split on:

- **VC2S10U07** — "the organisation of the elements in the periodic table is
  related to the structure and properties of atoms; patterns and trends include
  the significance of rows and periods, metallic and non-metallic properties,
  atomic size and reactivity"
- **VC2S10U06** — "the model of the atom changed following the discovery of
  electrons, protons and neutrons; natural radioactive decay results in a change
  from unstable to stable atoms"

Both codes and all their elaborations are quoted in §4.2 of the redesign doc.
**Do not re-derive them and do not invent any others.** If you need a code that
is not in §4.2, fetch it from
<https://f10.vcaa.vic.edu.au/learning-areas/science/curriculum> and say in your
report that you did.

### The two sheets

| | Sheet A | Sheet B |
|---|---|---|
| `slug` | `atomic-structure` — **unchanged** | `isotopes-and-radioactivity` |
| `title` | Atoms & the Periodic Table | Isotopes & Radioactivity |
| `yearLevel` | `'Year 9'` | `'Year 10'` |
| `category` | `'Fundamentals'` | `'Fundamentals'` |
| Primary code | VC2S10U07 | VC2S10U06 |

Sheet A keeps the slug because twelve Explore entries, a `concepts` row and any
external link point at it. Nothing may 404.

### The honesty requirement on `curriculumRef`

Both sheets sit in the **same** Levels 9–10 band. The `yearLevel` field takes
one value, so Year 9 and Year 10 are *this site's sequencing*, not a curriculum
boundary. Each sheet's `curriculumRef` must cite its code **and** say this in a
clause. A teacher who checks will find the band, and must not conclude the site
got it wrong.

## What to do

### 1. Move the content (§4.5 is the allocation table)

**Stays on Sheet A:** "What an atom is made of"; the three-subatomic-particles
table; "Atomic number and mass number"; "Electrons, energy levels and the shape
of the table"; "Ordered by atomic number, not by mass". Plus the PhET *Build an
Atom* resource, and the `commonMistakes` on orbits, scale, and atomic-vs-mass
number.

**Moves to Sheet B:** "Isotopes"; "Why relative atomic mass is rarely a whole
number"; "Unstable nuclei, and elements that had to be made" (split into two
sections there). Plus the PhET *Isotopes and Atomic Mass* resource, and the
`commonMistakes` on relative atomic mass being a count.

**Both:** the model-versus-reality and scale `commonMistakes` entries. This is
the sheet-level pedagogical contract and each sheet needs its own copy.

**Deleted:** nothing. The "first twenty elements" table is deleted by the
*widget* milestone, not by this one — **leave it in place on Sheet A**, and
leave its five overlay counterparts in place too. Deleting it here would strand
the widget milestone.

Give Sheet B a one-line recap of atomic number and mass number so it can stand
alone. That is the only duplication allowed.

### 2. Add what the curriculum requires and neither sheet has (§4.6)

**Sheet A** — VC2S10U07 names these in the content description itself or its
elaborations, and the current sheet covers none of them:

- Groups are columns, periods are rows, and what each predicts.
- **Metallic and non-metallic properties** — conductivity, lustre,
  malleability, state. (Metalloids and the staircase are an *extension*; include
  them, labelled as such — the word "metalloid" is not in V2.0.)
- **Atomic size** as a trend across a period and down a group.
- **Reactivity** as a trend, and specifically that elements in the same group
  react similarly with **oxygen, water and acids**.
- The outer-shell pattern via the **Bohr model**, explicitly labelled as a model
  that is useful and not true.

**Sheet B** — VC2S10U06's elaborations name these examples specifically. Use
*these*, not substitutes you prefer:

- Decay types with the curriculum's own examples: **radon-222** emitting an
  alpha particle, **iodine-131** a beta particle, **cobalt-60** gamma radiation.
- Half-life with real timescales: **carbon-14** and **uranium-238**.
- **Radiocarbon and other dating methods, including optically stimulated
  luminescence, establishing that Aboriginal and Torres Strait Islander Peoples
  have been present on the Australian continent for at least 65,000 years.**
  This is a cross-curriculum priority elaboration. Write it as its own short
  section, with care and with a source. **Flag it in your report as needing
  human review before merge** — do not treat it as ordinary prose.
- Applications in medicine and industry: diagnosing and treating cancer;
  checking for faults in materials used in aircraft and spacecraft.

### 3. Mark the extensions honestly (§4.3)

These terms appear **nowhere** in V2.0 F–10 Science, elaborations included:
`atomic number`, `mass number`, `relative atomic mass`, `metalloid`, `valence`.
They stay — you cannot teach isotopes without them — but neither sheet may imply
they are Year 9/10 curriculum content. Relative atomic mass is VCE Unit 1; say
so where it appears.

One term the research *did* settle: VC2S10U07 says "**electron shells**"
explicitly. Keep *energy level* as the honest term and name *shell* as the
curriculum's word, in one clause. Do not quietly switch to "shell" throughout.

### 4. The database

Add a **new** migration — never edit an existing one — following
`20260913_create_concepts.sql`:

- a row in `public.cheat_sheets` for `isotopes-and-radioactivity`, idempotent
  with `on conflict (slug) do update set …`;
- an update to the `atomic-structure` row's title;
- a `public.concepts` row for the new sheet's concept, with a `strand` matching
  its `category` — the `strand` constraint and the `CheatSheetCategory` union
  have to agree;
- the `concept_cheat_sheets` link with `is_primary` true.

**Ask the user** whether the Year 10 sheet gets its own concept row or links to
the Year 9 concept — `is_primary` makes both expressible, and §16 of the
redesign doc has this as an open question.

The pages render from TypeScript and must still render with Supabase
unconfigured. Do not make either sheet read the table.

### 5. Re-point the Explore scientists (§4.8)

Eleven of the twelve theme-A scientists in `explore-scientists.md` §3 are
isotope, decay or synthetic-element stories and now belong to Sheet B. **Henry
Moseley** stays on Sheet A. **Glenn Seaborg** is arguable — redrawing the
table's bottom rows is a periodic-table story about synthetic elements — so put
him where you can defend it and say which you chose and why.

Update the link targets in `explore-scientists.md` and anywhere the Explore
entry data names the sheet. Do **not** schedule any Explore entries; that is
editorial work with its own balance rules.

### 6. Every locale

`LOCALES` is `['en', 'de', 'fr', 'es', 'it', 'ru']` — **six**. Both sheets ship
in all of them in this milestone.

- English is canonical in `src/lib/cheat-sheet-data.ts`. Every other locale gets
  an overlay entry in `src/i18n/cheat-sheets/<locale>.ts`.
- Sheet B needs a **complete new overlay entry** in each of the five files.
  Sheet A's existing entries need the moved sections removed and the new ones
  added — in the same order as the English.
- **The overlay carries prose only.** `formulaExampleNames`, `exampleNames` and
  table `rows` are positional and must line up element for element.
  `cheat-sheets.test.ts` fails if they do not.
- Translate against `docs/i18n/glossary-<locale>.md`, and **add every new term
  to the glossary before you translate the prose**. This split introduces:
  *group*, *period*, *metal*, *non-metal*, *metalloid*, *noble gas*, *halogen*,
  *alkali metal*, *atomic size*, *reactivity*, *alpha/beta/gamma*, *half-life*,
  *radioactive decay*, *synthetic element*.
- **Russian has specific rules** at the top of `src/i18n/dictionaries/ru.ts`,
  enforced by `src/test-utils/i18n-russian.ts`: « » quotes with no inner spaces,
  em dash with spaces, **decimal comma**, **ё written out**, formulae and
  element symbols left in Latin, and no past-tense verb whose subject is the
  reader. Read that header before writing a word of it.
- Add `review-notes.ts` entries, run `npm run i18n:review`, and commit the
  regenerated `docs/i18n/<locale>-review.md`.
- Do the four language checks in `docs/i18n/GAMES.md` per locale and report
  them. Flag anything uncertain as `low` confidence. No native speaker has
  reviewed any locale on this site; do not imply otherwise.

## Rules of engagement

- Reading age ~12, one idea per sentence, **every sentence under 30 words**.
- Do **not** add a dependency. Do **not** add to `ICON_REGISTRY` — Sheet B needs
  an `iconName` from the existing union (`keyof typeof ICON_REGISTRY` in
  `src/components/ui/ChemIcon.tsx`).
- Do **not** hardcode colours; use the custom properties in
  `src/app/globals.css`.
- Do **not** put chemistry facts in components. The sheets are data.
- Do **not** delete the "first twenty elements" table (see §1 above).
- **Grep before adding a type** — this repo already carries competing
  near-duplicate shapes for reaction data.
- Lint with `npm run lint -- src e2e`, **not** over the repo root — build output
  from sibling worktrees pollutes it. The master baseline is 21 problems, all
  pre-existing; add none.
- Next 16 refuses a second dev server in one directory, and another session may
  already hold port 3000. If `npm run e2e` collides, start your own on a free
  port and pass `PLAYWRIGHT_BASE_URL=http://localhost:<port>`. If the dev server
  loops or Turbopack panics after a merge, `rm -rf .next` first.
- Targeted tests while you work: `npm run typecheck`, the scoped Vitest files,
  and one e2e spec. Run the full Playwright suite once, at the end.
- **Look at the rendered pages**, in light and dark, at 320px and at desktop, in
  at least English and Russian — Cyrillic sets wider. Playwright's
  `toBeVisible()` is satisfied by a bounding box and knows nothing about a
  clipping ancestor; a whole spec once passed here against clipped content.
- Commit in coherent steps. End each commit message with:
  `Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>`
- There is no `gh` in this environment. Do not try to open a PR; print the
  compare link and let the user open it.

## Definition of done

- [ ] `npm run lint -- src e2e`, `npm run typecheck`, `npm test`,
      `npm run build` all pass; `npm run e2e` passes.
- [ ] Both sheets render at `/{en,de,fr,es,it,ru}/cheat-sheets/atomic-structure`
      and `/{en,de,fr,es,it,ru}/cheat-sheets/isotopes-and-radioactivity`, and
      both appear in the index grid under the right year filter.
- [ ] `/cheat-sheets/atomic-structure` still resolves in every locale — no 404,
      no redirect.
- [ ] `cheat-sheets.test.ts` passes: every overlay lines up row for row, for
      both sheets, in all five locales.
- [ ] Each `curriculumRef` cites its code (VC2S10U07, VC2S10U06) and states that
      both sheets sit in the Levels 9–10 band.
- [ ] Everything in §4.6 is present: Sheet A has groups/periods, metal vs
      non-metal properties, atomic size and reactivity; Sheet B has the three
      named decay examples, carbon-14 and uranium-238, the dating section and
      the medical/industrial applications.
- [ ] Every extension term is marked as an extension, not as curriculum content.
- [ ] The migration is idempotent; both pages render with Supabase unconfigured.
- [ ] The "first twenty elements" table is still present on Sheet A.
- [ ] No horizontal scroll at 320px in any locale, on either sheet.
- [ ] `explore-scientists.md` and any Explore entry data point at the sheet that
      now teaches each scientist's science.
- [ ] The milestone report names: where you put Seaborg and why; the new
      glossary terms per locale; the four language checks per locale with
      low-confidence items flagged; the 65,000-year section flagged for human
      review; and anything you decided that this prompt did not cover.

## Stop and ask

- If the Year 10 concept row question (step 4) blocks the migration.
- If `cheat-sheets.test.ts` cannot be satisfied without changing its assertions
  — changing the gate is not in scope for this task.
- Before writing the 65,000-year section, if you cannot find a source you can
  cite.
