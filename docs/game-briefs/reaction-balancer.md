# Game Concept Brief: Reaction Balancer (redesign)

**Status:** Approved — 2026-09-16 (example of a finalised brief; re-date if you change anything)
**Slug (everywhere):** `reaction-balancer` — already in `GameName`, `GameThemeScope`, the route,
`games.id` (inactive) and `concept_games` (`balancing-equations`, primary)
**Concept:** `balancing-equations` (primary); `stoichiometry` lists it as `prerequisite`
**Cheat sheets:** `balancing-equations` (primary), `reaction-types`
**Target year level:** Year 10 (Victorian Curriculum Science Level 10); Levels 4–5 stretch into
VCE Unit 1–2 territory
**Curriculum reference:** Victorian Curriculum Science Level 10 — "chemical reactions … can be
represented by balanced chemical equations"; VCE Chemistry Unit 1 AoS 1 / Unit 2 AoS 1 (writing
balanced equations with state symbols)

## Why redesign the existing game

The current build (`src/components/games/reaction-balancer/GameArena.tsx`) works, but fails four
of our own checks:

1. **Triplet sync** — atom counts are hidden behind an opt-in "Show Atom Balance" button and
   correctness is only revealed on "Check Answer". The framework requires the symbolic and
   particle views to update on every coefficient change.
2. **Chemical accuracy of validation** — answers are compared to the coefficient string parsed
   from `reactions.ts`, not to conservation of atoms. `4H2 + 2O2 → 4H2O` is marked wrong.
   Also `parseFormulaAtoms` ignores brackets (`Ba(OH)2` counts 1 O, 1 H), and seven reactions
   in the dataset are already balanced at all-1 coefficients so "Check" instantly passes.
3. **Scaffolding** — "level" is `reactions[(level − 1) % length]`; the dataset's `difficulty`
   field is ignored and nothing fades.
4. **Platform contract** — no `reaction-balancer-config.ts` (150 points and `maxLevel: 10`
   are hard-coded), `themeScope="neutralise"`, `gameId={"reaction-balancer" as any}`, an unused
   duplicate rules hook (`useReactionBalancer.ts`), and `recordGameSession(... 'victory')` fires
   after *every* reaction, inflating `total_syntheses`.

## Johnstone's Triplet mapping

| Level | In the game |
|---|---|
| Submicroscopic | Each compound card shows its molecules as particle clusters (atoms as coloured circles, one cluster per coefficient). Raising a coefficient adds a cluster; the **atom ledger** under the arrow shows, per element, reactant count vs product count and animates the difference |
| Symbolic | The equation with coefficients and state symbols is the primary object; it re-renders on every change. On balance, the equation locks and the lowest-whole-number form is shown (if the player used a multiple, it says so and simplifies) |
| Macroscopic | A **mass balance** beam under the ledger: total reactant mass vs product mass (from `molarMass`), tipping until equal — conservation of mass made visible. From Level 3, a one-line observation for the reaction type (gas bubbles, precipitate, flame) drawn from `reactions.ts` `description` |

## Core loop

A reaction appears unbalanced (all coefficients blank = 1) with the ledger showing red
imbalances per element. The player adjusts coefficients with ▲/▼ (or typing, or keyboard); the
ledger, particle clusters and mass beam update in the same render. When every element's counts
match, the equation locks, the beam levels, a chime plays, and the round ends — **there is no
"Check Answer" button**. Points scale with level and with whether the answer was already in
lowest terms.

The chemistry is the physics: the win condition *is* conservation of mass, computed from the
compounds' compositions, so any valid balanced form wins.

## Win / lose conditions

- **Round win:** all element counts equal, all coefficients ≥ 1. Bonus if lowest whole-number
  ratio on first lock; otherwise the game simplifies and explains ("divided by 2").
- **Level pass:** `reactionsPerLevel` (default 3) rounds; then `levelUp` overlay.
- **No lives, no timer.** A "stuck" state is offered after `hintAfterSeconds` (default 45) of
  no lock: the hint names the element to balance next ("Start with carbon — it appears in the
  fewest compounds") — never the coefficient.
- **Session recording:** one `recordGameSession` call at victory (all levels) or when the
  player exits (`'abandoned'`), with `levelReached` and `accuracy` = locks without hints ÷ rounds.

## Difficulty progression

| Level | Reactions (from `reactions.ts` `difficulty`) | Scaffolding |
|---|---|---|
| 1 | `intro` — two-element synthesis/decomposition (`H2 + O2`, `Na + Cl2`, `CaCO3 →`) | Ledger, particle clusters and mass beam all visible; the element to balance next is highlighted |
| 2 | `beginner` — three elements, no brackets (`CH4 + O2`, `Fe + O2`) | Ledger and clusters visible; no next-element highlight |
| 3 | `intermediate` — polyatomic ions as units, brackets (`Ca(OH)2 + HCl`, `Al2(SO4)3`) | Ledger visible; clusters collapse to formula only; observation line appears |
| 4 | `advanced` — combustion of larger hydrocarbons, double displacement with 4 compounds | Ledger hidden by default (toggle available, costs the lowest-terms bonus) |
| 5 | Mixed review; equations shown with state symbols to be written by the player from a description ("solid calcium carbonate decomposes on heating") | No scaffolds; hint button only |

Config lives in `src/core-engine/config/games/reaction-balancer-config.ts` with the named-preset
+ UAT-tuning-guide convention: `levels.reactionsPerLevel`, `levels.maxLevel`,
`mechanics.pointsPerLevelMultiplier`, `mechanics.lowestTermsBonus`, `mechanics.hintAfterSeconds`,
`mechanics.maxCoefficient` (default 12), `visuals.showClustersUntilLevel`.

## Known misconceptions to guard against

- Changing subscripts to balance — subscripts are not editable; the card shows why
  (`H2O2` is a different substance, hydrogen peroxide) if the player asks via hint.
- "Coefficient applies to the first atom only" — clusters make it visibly multiply the whole
  molecule; `2Ca(OH)2` shows 4 H in the ledger.
- Mass "disappearing" when a gas forms — the mass beam stays level when balanced, and the
  observation line names the gas.
- Balancing by trial to a huge multiple — `maxCoefficient` caps it and the simplify step teaches
  lowest terms.

## Platform reuse

- `reactions.ts` (31 reactions, already tagged `intro/beginner/intermediate/advanced`) — fix the
  seven already-balanced entries by storing the *unbalanced* skeleton and the balanced answer
  separately, or drop them; add state symbols to every equation.
- Composition from `compounds.ts` `elements` where the compound exists; otherwise a shared
  `parseFormulaAtoms()` in `core-engine/utils` that handles brackets — unit-test it against
  every formula in `reactions.ts` (this also fixes known issue #2 in `docs/TESTING.md`).
- `isBalanced()` pure function → tests: every reaction's stored answer balances; every
  reaction's all-1 state does **not** (except by design); scalar multiples balance.
- Delete `src/hooks/useReactionBalancer.ts` and `neutralise-levels.ts` if still unused;
  move the rules into `useReactionBalancer` for real and keep `GameArena.tsx` presentational.
- Shared UI: `GameShell` (`themeScope="reaction-balancer"`), `GamesHeader` with
  `progressText="Reaction 2/3"`, `GameOverlay` with `customMessages` for level-up
  ("Mass conserved!"), `GameFooter`, both modals. Sounds: `equation-balanced`,
  `equation-error` (already mapped), add `coefficient-tick` → fallback `click`.
- `MoleculeText` renders coefficients, brackets and state symbols already.

## Accessibility (from `ACCESSIBILITY.md`)

- Coefficient controls are `<button>`s plus a numeric `<input>`; keyboard: Tab between
  compounds, ↑/↓ change, `H` hint, `P` pause.
- Ledger rows have text ("Oxygen: 2 left, 1 right"), not just colour; the mass beam has a
  text readout.
- Live region announces "balanced" and each hint. No timer; `hintAfterSeconds` only *offers*.
- Particle clusters are decorative (`aria-hidden`) — the ledger is the accessible equivalent.

## Definition of done (beyond the generic checklist)

- [ ] `npx vitest run reaction-balancer` green, including the new `isBalanced`/parser specs
      and the promoted known-issue #2 test.
- [ ] Every reaction in Levels 1–4 solvable without hints in a manual playthrough; Level 5
      descriptions reviewed for chemical accuracy.
- [ ] `games.is_active = true` for `reaction-balancer` in a new migration; hub card and dashboard
      card show it; one `game_sessions` row per full run in Supabase.
- [ ] `docs/TESTING.md` known issues #2 and the "seven already-balanced reactions" observation
      removed once fixed.
