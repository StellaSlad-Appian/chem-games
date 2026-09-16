# Game Concept Briefs

## What a brief is

The **template** (in [`../DOCS_NEEDED.md`](../DOCS_NEEDED.md) §1) is generic. A **brief** is one
filled-in copy per game. It captures the decisions an agent must not make on its own — which
chemistry concept, for whom, what the core loop is, and how the mechanic maps to Johnstone's
Triplet — so the agent can build without inventing pedagogy.

Who writes it: **you own it.** An agent (or I) can *draft* one, as done here, but the year level,
curriculum fit, and "is this the mechanic I actually want" call is yours. Each draft has
`> YOU DECIDE:` callouts marking those points. Once you've resolved them, change the status line
to `Approved` and the brief becomes the agent's spec.

Workflow: draft → you review/edit → `Approved` → agent builds → brief stays in this folder as the
record of *why* the game works the way it does.

## Index

| Brief | Working title | Status | Effort | Concept (DB) | Reuses |
|---|---|---|---|---|---|
| [reaction-balancer.md](./reaction-balancer.md) | Reaction Balancer — redesign of the existing game | **Approved (example of a finalised brief)** | Medium | `balancing-equations` | `reactions.ts`, `compounds.ts`, existing arena components |
| [ion-forge.md](./ion-forge.md) | Ion Forge — formulas & names of ionic compounds (polyatomic ions are Levels 2–5 content) | Draft | Low–Med | `ionic-compounds`, `inorganic-nomenclature`, `polyatomic-ions` | `ions.ts` (now the full VCE set), `compounds.ts` ionicComponents, `compounds.test.ts` |
| [stoichiometry.md](./stoichiometry.md) | Mole Foundry | Draft | Medium | `stoichiometry` | `reactions.ts`, `molarMass`, Reaction Balancer as prerequisite |
| [lewis-structures.md](./lewis-structures.md) | Share to Fill — build (pair the loners) + inspect (fix a classmate's drawing); Year 10, covalent only, 18 molecules | **Approved** (rev 3) | Medium | `lewis-structures` | `elements.ts` valenceElectrons; builds the shared `AtomCanvas` that Bond Builder reuses (separate games) |
| [synthesis-router.md](./synthesis-router.md) | Synthesis Router — organic reaction pathways | **Planned** (full plan) | Medium–High | `reaction-pathways` | New shared `organic-molecules.ts`; `functional-groups` cheat sheet |
| [functional-groups.md](./functional-groups.md) | Reagent Bench + the four alternatives considered | Options record | — | `functional-groups` | Kept as the record of why Synthesis Router was chosen |
| [organic-naming.md](./organic-naming.md) | Carbon Chain Namer | Draft | High | `organic-nomenclature` | Same organic dataset as Synthesis Router |

## Recommended build order and why

1. **Ion Forge** — the data model already exists and is already unit-tested; smallest step from
   the current codebase. Two modes over one engine.
2. **Stoichiometry** — natural sequel to Reaction Balancer (which is in development).
3. **Synthesis Router** — flagship organic game; its dataset (`organic-molecules.ts`) is then
   reused by everything organic.
4. **Lewis Structures / Bond Builder** — separate games; build the shared canvas component
   once, then both.
5. **Organic Naming** — highest effort; reuses the organic dataset and Ion Forge's token tray.

## Decisions already made

- **Polyatomic ions are not a standalone game.** They are content in Ion Forge, a cheat-sheet
  lookup table (`/cheat-sheets/polyatomic-ions`, generated from `ions.ts`), and a data dimension
  other games draw on. In the DB they are a child concept of `ionic-compounds`.
- **Functional groups are taught through Synthesis Router**, not a quiz. The classifier config
  that already exists (`ORGANIC_FUNCTIONAL_CONFIG`) can still ship as a fluency drill if wanted.
- **Lewis Structures and Bond Builder are separate games** with shared `core-engine` types
  (`BondOrder`, `BondConnection`, `ValenceConfig`, `valenceElectrons`), a shared
  `validateStructure()` util, and one shared atom/bond canvas in `components/games/shared/`.

## Overlaps to keep resolved

- **Synthesis Router, Organic Naming** (and any spectra game) share one dataset:
  `src/core-engine/data/organic-molecules.ts`. Design it once (see the plan's §7).
- **Slug consistency**: `classifier-games-config.ts` uses ids like `acid-base-classifier` while
  `GameName` and `games.id` use `acid-classification`. New games use one slug everywhere (route,
  `GameName`, `GameThemeScope`, `public.games.id`, `concept_games`, config `gameId`).

## Year-level labels

The platform's `YearLevel` type is `Year 7 | Year 8 | Year 9 | Year 10 | Senior`; the same five
values are now enforced by the `concepts` and `cheat_sheets` tables. VCE Units 1–4 map to
`Senior`.
