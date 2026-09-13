# Game Concept Briefs

## What a brief is

The **template** (in [`../DOCS_NEEDED.md`](../DOCS_NEEDED.md) §1) is generic. A **brief** is one
filled-in copy per game. It captures the decisions an agent must not make on its own — which
chemistry concept, for whom, what the core loop is, and how the mechanic maps to Johnstone's
Triplet — so the agent can build without inventing pedagogy.

Who writes it: **you own it.** An agent (or I) can *draft* one, as done here, but the year level,
curriculum fit, and "is this the mechanic I actually want" call is yours. Each draft below has
`> YOU DECIDE:` callouts marking those points. Once you've resolved them, change the status line
to `Approved` and the brief becomes the agent's spec.

Workflow: draft → you review/edit → `Approved` → agent builds → brief stays in this folder as the
record of *why* the game works the way it does.

## Index

| Brief | Working title | Status | Effort | Reuses |
|---|---|---|---|---|
| [polyatomic-ions.md](./polyatomic-ions.md) | Ion Forge | Draft | Low | `ions.ts`, `compounds.ts` ionicComponents, `compounds.test.ts` |
| [inorganic-nomenclature.md](./inorganic-nomenclature.md) | Name Assembler | Draft | Low–Med | Same data as Ion Forge + `variableValenceStates` |
| [stoichiometry.md](./stoichiometry.md) | Mole Foundry | Draft | Medium | `reactions.ts`, `molarMass`, Reaction Balancer as prerequisite |
| [lewis-structures.md](./lewis-structures.md) | Octet Architect | Draft | Med–High | `elements.ts` valenceElectrons, Bond Builder types (**overlap — see brief**) |
| [functional-groups.md](./functional-groups.md) | Reagent Bench | Draft | Low (MVP) / Med | `ORGANIC_FUNCTIONAL_CONFIG` classifier config already exists; upstream `(game)Reagent` branch |
| [organic-naming.md](./organic-naming.md) | Carbon Chain Namer | Draft | High | New organic-molecule dataset (shared with Functional Groups) |

## Recommended build order and why

1. **Polyatomic Ions** — the data model already exists and is already unit-tested; smallest
   step from the current codebase, and it unblocks Nomenclature.
2. **Inorganic Nomenclature** — shares Ion Forge's data and much of its UI.
3. **Stoichiometry** — natural sequel to Reaction Balancer (which is in development).
4. **Lewis Structures** — decide first whether this *is* Bond Builder (see brief).
5. **Functional Groups** — MVP is nearly free via the classifier engine; the intrinsic
   "Reagent Bench" version is the real game. Check the upstream `(game)Reagent` branch first —
   someone may already be building it.
6. **Organic Naming** — highest effort (needs an organic molecule dataset and either a naming
   engine or a curated token-based approach); build last so it can reuse the organic dataset
   from Functional Groups.

## Overlaps you should resolve once, not per game

- **Organic Naming, Functional Groups** (and the screenshot's "Organic Chemistry & naming
  compounds") share one dataset: `src/core-engine/data/organic-molecules.ts` with structure,
  IUPAC name, functional group(s), and a renderable skeletal/condensed formula. Design it once.
- **Polyatomic Ions and Nomenclature** are two mechanics over the same ionic data. Don't fork.
- **Lewis Structures vs Bond Builder** — README lists Bond Builder as in development and
  `chemistry.ts` already has `BondOrder`/`ValenceConfig`/`BondConnection` types. Lewis Structures
  is either a mode of Bond Builder or a replacement for it; pick one.
- **Slug consistency**: `classifier-games-config.ts` uses ids like `acid-base-classifier` while
  `GameName` uses `acid-classification`. New games must use one slug everywhere (route, `GameName`,
  `GameThemeScope`, `public.games.id`, config `gameId`).

## Year-level labels

The platform's `YearLevel` type is `Year 7 | Year 8 | Year 9 | Year 10 | Senior`. Drafts use
those labels; the classifier config comments use "Grade 9–12". Confirm which curriculum you are
targeting (`DOCS_NEEDED.md` §2) and normalise.
