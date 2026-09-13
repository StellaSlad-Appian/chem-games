# Game Concept Brief: Ion Forge (Polyatomic Ions)

**Status:** Draft — needs your review
**Proposed slug:** `ion-forge`
**Target concept(s):** Polyatomic ions — recognising name ↔ formula ↔ charge; combining cations and
anions in the ratio that gives a neutral compound; when to use brackets.
**Target year level:** Year 10 → Senior
> YOU DECIDE: is this introduced at Year 10 in your curriculum, or Year 11? Level 4 (transition
> metals) may be Senior-only.
**Curriculum reference:** _TBD_

## Johnstone's Triplet mapping

- **Submicroscopic (what the player manipulates):** individual ions with visible charges
  (Na⁺, SO₄²⁻, NH₄⁺). The player adds ions to a "forge" one at a time.
- **Macroscopic (what they see happen):** the forge shows a running net charge meter. When the
  net charge hits exactly 0, the ions lock into a crystal lattice and a salt "precipitates"
  (crystal grows, chime). Non-zero charge = ions repel/jitter, no crystal.
- **Symbolic (updates live):** the formula builds itself as ions are added, with correct
  subscripts and brackets: adding a second NO₃⁻ to Ca²⁺ turns `CaNO3` into `Ca(NO3)2` in the
  same frame. This is the key sync — students *watch* the bracket rule happen.

## Core loop

The header names a target compound (e.g. "Aluminium sulfate"). The player picks ions from a
tray and drops them into the forge until the net charge is zero **and** the formula matches the
target. Charge balance is the physics: a lattice physically cannot form with net charge ≠ 0.

Reverse mode (later levels): the target is given as a formula; the player must pick the
correctly *named* ions (nitrate vs nitrite, sulfate vs sulfite) — recognition is embedded in
the build, not asked as a question.

## Win / lose conditions

- Round win: formula matches target with net charge 0. Score scales with level; bonus for zero
  wrong ions added.
- No hard lose state. Adding a wrong ion gives a diagnostic ("SO₃²⁻ is *sulfite* — sulfate has
  one more oxygen") and can be removed. Optional mistake cap via `classifier-games-config`-style
  `maxMistakes` if you want lives.
> YOU DECIDE: lives or purely mastery-based? Platform precedent supports both.

## Difficulty progression (what gets harder, what scaffolding fades)

| Level | Content | Scaffolding |
|---|---|---|
| 1 | Monoatomic pairs (NaCl, MgO, CaCl₂) | Ion charges shown on tray; charge meter animated |
| 2 | One polyatomic ion, no brackets (NaNO₃, K₂SO₄, NH₄Cl) | Charges shown; ion names shown |
| 3 | Brackets required (Mg(OH)₂, Ca(NO₃)₂, Al₂(SO₄)₃, (NH₄)₂CO₃) | Names shown, charges hidden until hover |
| 4 | Variable-valence metals with Roman numerals (Fe₂(SO₄)₃ vs FeSO₄, Cu(NO₃)₂) | No hints by default; hint button explains oxidation state |
| 5 | Reverse mode — match name-only targets with similar-sounding ions (chlorate/chlorite/hypochlorite/perchlorate) | None |

## Known misconceptions to guard against

- "Subscript applies only to the last atom" — the bracket animation must clearly group the whole
  ion.
- "Charge is a property of the compound" — the lattice is neutral; show charges disappearing
  into the lattice, not persisting.
- "Polyatomic ions break apart in a compound" — the ion moves as one rigid unit in the forge.
- Sulfate/sulfite, nitrate/nitrite naming — make these deliberate distractors.

## Platform reuse

- `src/core-engine/data/ions.ts` (`MONOATOMIC_IONS`, `POLYATOMIC_IONS` with `charge`) and
  `compounds.ts` `ionicComponents { cations, anions }` — the target list can be *derived* from
  compounds that have `ionicComponents`, so every target is already validated by
  `compounds.test.ts`.
- `elements.ts` `variableValenceStates` for Level 4.
- `MoleculeText` handles `Ca(NO3)2` and `SO4 2-` rendering already.
- Formula generation from ion counts is a pure function → put it in `core-engine/utils` and
  unit-test it (bracket rule, Roman numerals).

## Accessibility notes

Drag-to-forge must have tap-tap and keyboard equivalents (number keys pick tray slots, Enter
adds, Backspace removes last ion). Charge meter needs a text readout ("net charge +1"), not just
a colour bar.

## Open questions for you

1. Ion tray size per level (4? 6?) — affects cognitive load.
2. Should Roman-numeral naming (Level 4) be here or in the Nomenclature game only?
3. Extend `ions.ts` to ~40 ions (currently 25)? Which ones does your syllabus list?
