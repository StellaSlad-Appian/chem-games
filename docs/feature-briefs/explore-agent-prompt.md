# Agent prompt: build the Explore page

Copy everything below the line into a fresh agent session on the
`feature/explore-page` branch. It assumes nothing from this conversation.

Resolve the `YOU DECIDE` callouts in [`explore.md`](./explore.md) first — the
prompt's defaults are the recommendations there, and an unresolved decision will
be implemented as the default.

---

You are adding a new page to **chem-games**, a Next.js 16 + React 19 + Tailwind 4
+ Supabase site of chemistry mini-games and cheat sheets for secondary students.
Work on the branch `feature/explore-page`.

## Before you write any code

1. **Read `AGENTS.md` at the repo root and obey it.** This is not the Next.js in
   your training data. Read the relevant guide in `node_modules/next/dist/docs/`
   before using any framework API — routing, metadata, caching and revalidation
   especially. If the shipped docs and your memory disagree, the shipped docs
   win. Heed deprecation notices.
2. **Read `docs/feature-briefs/explore.md`.** It is the brief. Its §6 acceptance
   criteria are your definition of done, and you report against them by number.
3. **Read these, and follow them rather than inventing conventions:**
   `docs/AGENT_INSTRUCTIONS.md` Part B (the platform contract — file layout,
   registries, gotchas), `docs/i18n/README.md`, `docs/i18n/GAMES.md`
   (the every-locale rule and the four language checks),
   `docs/i18n/glossary-{de,fr,es,it}.md`, `docs/ACCESSIBILITY.md`,
   `docs/STYLE_GUIDE.md`, `docs/TESTING.md`.
4. **Read the code you are about to imitate**, and imitate it rather than
   improving on it:
   - `src/lib/cheat-sheet-data.ts` + `src/i18n/cheat-sheets.ts` +
     `src/i18n/cheat-sheets/de.ts` — the canonical-English-plus-overlay pattern
     you are copying for all three content types.
   - `src/i18n/cheat-sheets.test.ts` and `src/i18n/chemistry-names.test.ts` —
     the overlay parity gates you are copying.
   - `src/app/[lang]/(main)/cheat-sheets/page.tsx` and its `[slug]/page.tsx` —
     page shape, `getDictionary`, `isLocale`/`DEFAULT_LOCALE` fallback, and how
     `generateMetadata` does canonical + `hreflang` alternates.
   - `src/components/layout/NavBar.tsx` — including the two comments about
     header width in German; they are measurements, not decoration.
   - `supabase/migrations/20260913_create_concepts.sql` — the registry-table,
     RLS and idempotent-seed pattern for the migration.
   - `src/core-engine/tests/compounds.test.ts` — the "denormalized data must
     match the registry" test pattern.

## What you are building

A page at `/explore` (English URL segment in every locale, like `/cheat-sheets`)
with three sections that all rotate together, weekly, on **Monday 00:00 UTC**:

1. **Molecule of the Week** — one everyday or industrial molecule: formula, name,
   where the reader meets it in real life, the chemistry that makes it work, and
   a link into a cheat sheet or game.
2. **Scientist of the Week** — one chemist or chemistry-adjacent scientist: what
   they did, why it mattered, and a link into a cheat sheet, game or concept.
3. **Did you know?** — three to five short facts, each sourced.

It ships in **every locale in `LOCALES`** (`en`, `de`, `fr`, `es`, `it`) in this
same milestone. A page that is English-only is not done.

## Non-negotiable design decisions (do not relitigate these)

- **Weekly, not daily**, for all three sections, under one dateline.
- **Prose lives in TypeScript, not in the database.** `src/lib/explore/` is
  canonical English; `src/i18n/explore/<locale>.ts` are prose overlays keyed by
  the same ids, resolved with a registry fallback the way `chemistry-names.ts`
  does. The migration you write creates registry tables only; the page must
  render identically with Supabase unconfigured.
- **Entry prose must not go into the shared dictionary.** The root layout hands
  the whole dictionary to `I18nProvider`, so every byte is in the RSC payload of
  every page, and `dictionary.test.ts` asserts a size budget. Only page chrome
  (headings, labels, the accessible names, the dateline pattern) goes in the
  dictionary, under a new `explore` namespace.
- **Rotation is a pure function of `now`**, in its own module, no I/O.
  `pool[weekIndex(now) % pool.length]`. The page passes `new Date()`; every test
  passes a fixed date. UTC boundary, documented epoch constant.
- **Every molecule and scientist card links inward** to a cheat sheet, game or
  concept. A card with no inward link is the wrong entry — replace it.
- **Gender is scheduling metadata and is never rendered.** No "female scientist"
  label, no badge, no separate list.
- **Formulae, symbols, ids, slugs, dates and URLs are never translated** and never
  appear in an overlay file.
- **No molecular structure diagrams in v1.**

## Content to write

Launch pool: **12 molecules, 12 scientists, 24 facts** (override only if the
brief's `YOU DECIDE` was resolved differently).

**Molecules.** Pick ones that land on cheat sheets the site already has —
`states-of-matter`, `acids-and-bases`, `balancing-equations`, `reaction-types`,
`chemical-bonds`, `chemical-formulas`, `polyatomic-ions`, `naming-compounds`,
`stoichiometry`, `lewis-structures`, `organic-nomenclature`, `functional-groups`.
Reuse `src/core-engine/data/compounds.ts` / `elements.ts` by id wherever the
species is already there; never restate a formula that a registry already holds.
English body 120–180 words, reading age ~12, one idea per sentence.

**Scientists.** Twelve entries, six `represents: 'woman'` and six
`represents: 'man'`, in a curated schedule that strictly alternates. Choose
internationally, not just anglophone: the site publishes in German, French,
Spanish, Italian and soon Russian, and a pool of Anglo-American names reads in
those languages as a translated American site. Include at least one scientist
associated with each shipping language area.

Write every entry to the same shape and the same length band, and **lead with the
science**. Do not make every woman's entry a story about being overlooked and
every man's a story about discovery — that pattern teaches exactly the bias this
section exists to counter. Credit history is an optional field available to any
entry, used sparingly (at most 3 of 12), and a test will check it is not
concentrated on one group.

**Facts.** Twenty-four, ≤ 30 English words each, each with a source URL. Do not
ship the common chemistry myths (glass does not flow at room temperature;
"chemical-free" is not a thing; the tongue has no taste map). Accuracy bar is
`AGENT_INSTRUCTIONS.md` Part A: 100% correct, and nothing that plants a
misconception a teacher will later have to undo.

**Every entry carries** `writtenOn`, `reviewedOn`, `sourcesVerifiedOn` (ISO
dates), at least one `{ label, url }` source, and `isActive`.

**Translations** are made against `docs/i18n/glossary-<locale>.md`. Any new term
— chemical, biographical or a coined section title — goes into the glossary
*before* you translate the prose. Do not translate by reflex: adapt register to
a 14-year-old reader in each language, and use each language's own chemical
naming conventions.

## Files you will touch

Expected shape; verify against the repo before creating anything, and reuse an
existing module if one already fits.

```
src/app/[lang]/(main)/explore/page.tsx        the page (Server Component) + generateMetadata
src/app/[lang]/(main)/explore/page.test.tsx   flow test
src/components/explore/*.tsx                  section components (small, presentational)
src/lib/explore/molecules.ts                  canonical English + structure
src/lib/explore/scientists.ts                 canonical English + schedule
src/lib/explore/facts.ts                      canonical English
src/lib/explore/rotation.ts                   pure weekIndex/select + epoch constant
src/lib/explore/rotation.test.ts
src/lib/explore/schedule.test.ts              the AC-7 fairness invariants
src/lib/explore/freshness.test.ts             the AC-9 3.5-year gate
src/i18n/explore.ts                           getExploreContent(locale, now) + overlay types
src/i18n/explore/{de,fr,es,it}.ts             prose overlays
src/i18n/explore.test.ts                      overlay parity gate
src/i18n/dictionaries/{en,de,fr,es,it}.ts     nav.explore + the explore chrome namespace
src/i18n/review-notes.ts                      confidence notes for the new namespace
src/components/layout/NavBar.tsx              the fifth nav entry
src/app/[lang]/(main)/page.tsx                a dashboard entry point (nav is hidden below lg)
supabase/migrations/<date>_create_explore.sql registry tables + idempotent seed
e2e/explore.spec.ts                           locale + navigation + 360px journey
docs/feature-briefs/explore.md                update with whatever the build proved wrong
```

## Rules of engagement

- **Do not** add a dependency, a state library, an i18n library, a date library,
  or a second test runner. `Intl` covers the date formatting.
- **Do not** hardcode colours; use the custom properties in `src/app/globals.css`.
- **Do not** edit an existing migration; add a new one.
- **Do not** put chemistry facts inside components. Data in the data modules,
  copy in the dictionary or the content modules, JSX renders them.
- **Grep before you add a type.** `AGENT_INSTRUCTIONS.md` records that this repo
  already has competing near-duplicate shapes for reaction data. Do not add
  another.
- Lint with `npm run lint -- src e2e`, not over the repo root.
- If something in the brief turns out to be wrong against the real code, say so
  and propose the change — do not silently build something else.

## Report when done

Against the AC numbers in `docs/feature-briefs/explore.md` §6, one line each,
plus:

- The header width measurements from AC-2 at 360 / 768 / 1024 / 1280px in the
  widest language, and whether the fifth nav item fits.
- The four `docs/i18n/GAMES.md` language checks per locale, with anything you
  are unsure about flagged as `low` confidence rather than quietly shipped.
- The full list of the 12 molecules, 12 scientists and 24 facts, so the owner can
  review the editorial choices without reading the diff.
- Anything you had to decide that the brief did not cover.
