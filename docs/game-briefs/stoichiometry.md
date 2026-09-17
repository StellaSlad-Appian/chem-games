# Game Concept Brief: Mole Foundry (Stoichiometry)

**Status:** Draft — needs your review
**Proposed slug:** `mole-foundry`
**Target concept(s):** Mole ratios from balanced equations; mass ↔ mole conversion via molar
mass; limiting reagent and excess; theoretical vs percent yield.
**Target year level:** Senior (Year 11). Level 1–2 could be late Year 10.
> YOU DECIDE: does your syllabus do limiting reagents and percent yield at this level?
**Curriculum reference:** _TBD_

## Johnstone's Triplet mapping

- **Symbolic:** the balanced equation is fixed on screen (e.g. `2H2 + O2 -> 2H2O`), with the
  player's chosen quantities shown beneath each species in mol and g, and a live calculation
  strip (`n = m / M`, ratio arrows).
- **Submicroscopic:** each reactant hopper shows the particles the player has loaded (grouped
  in ratio bundles — e.g. every 2 H₂ pair with 1 O₂). Leftover particles that can't find a
  partner stay visibly unreacted in the hopper: **that is the limiting-reagent concept made
  physical.**
- **Macroscopic:** pressing *React* runs the reaction; product mass appears on a balance
  readout; unreacted excess is dumped into a "waste" bin with its mass. Target mass shown as a
  fill line on the product vessel.

## Core loop

An order comes in: "Deliver 36.0 g of water." The player loads reactants (by mass or moles,
depending on level) into hoppers using +/− controls or a slider, watching the live particle
bundling and calculation strip, then reacts. Score depends on hitting the target mass within
tolerance **and** minimising excess (waste). The mole ratio and molar masses *are* the physics:
you cannot get more product than the limiting reagent allows, and over-loading shows as waste.

## Win / lose conditions

- Round win: product mass within ±2% of target (tolerance from config). Star rating: ≤5% waste.
- No hard fail; a miss shows a diagnostic comparing the player's ratio with the equation's
  ("You loaded 3 mol H₂ for 1 mol O₂ — the equation needs 2:1, so 1 mol H₂ was left over").
- Optional resource budget per level (limited total reactant mass) to make efficiency matter.
> YOU DECIDE: is a budget/lives mechanic wanted, or pure mastery?

## Difficulty progression

| Level | Content | Scaffolding |
|---|---|---|
| 1 | Particle counting: load *molecules* to match a ratio (no mass) — `2H2 + O2`, `N2 + 3H2` | Ratio bundles animate; calculation strip fully worked |
| 2 | Moles → mass: target given in g, inputs in mol; molar masses shown | Calculation strip shows `m = n × M` with numbers filled |
| 3 | Mass → moles → mass across the equation (both conversions) | Strip shows formulas only; player fills numbers |
| 4 | Limiting reagent: two reactants pre-loaded with unequal amounts; predict product mass, identify excess | Hopper leftovers visible; strip hidden |
| 5 | Percent yield: reaction has a yield < 100% (config per reaction); player must over-order to hit target | No scaffolds; hint button explains yield |

## Known misconceptions to guard against

- "Coefficients are masses" — the particle view makes coefficients visibly *counts*.
- "The reactant with the smaller mass is limiting" — Level 4 pairs a small-mass reactant with a
  low molar mass to break this.
- "Mass isn't conserved because there's less product than reactant" — the waste bin + product
  masses always sum to the input mass (show the sum).
- Units: keep g, mol, g/mol labelled everywhere.

## Platform reuse

- `reactions.ts` has 31 reactions with equations; extend entries with `molarMass` lookups via
  `compounds.ts` (35 compounds — check coverage; add missing species).
- Coefficient parsing already exists in `MoleculeText`'s tokenizer; equation → composition maps
  exist in `useReactionBalancer.ts` (`Compound.composition`). Reuse, don't rewrite — and fix the
  duplicate type situation noted in `AGENT_INSTRUCTIONS.md` while you're there.
- Reaction Balancer is the prerequisite game; consider linking "balance it first" as Level 0.

## Accessibility notes

Sliders need +/− buttons and direct numeric input. The waste/product visual needs text readouts.
No timer.

## Open questions for you

1. Significant figures: enforce 3 s.f. or accept any precision within tolerance?
2. Include gas volumes at STP/SLC (22.4/24.8 L/mol) as a Level 6? Region-dependent.
3. Which reactions matter most for your exams (combustion, thermal decomposition, metal + acid)?

## Languages

Ships in every locale in `LOCALES` (`docs/i18n/GAMES.md`). English is the canonical text
above; each other locale is a translation of it, checked against `docs/i18n/glossary-<locale>.md`.
Resolve the table before `Approved`.

| Locale | Title | Kind | Hub description | Notes / alternative |
|---|---|---|---|---|
| en | Mole Foundry | — | Turn grams into moles, moles into product — and see what limits the yield. | Proposal. > YOU DECIDE |
| de | Mol-Gießerei | translation | Rechne Gramm in Mol um, Mol in Produkt – und sieh, was die Ausbeute begrenzt. | *Gießerei* keeps the foundry image but is an unfamiliar word for a 16-year-old; alternative *Molwerk*. > YOU DECIDE |
| fr, es, it, ru | — | — | — | filled when the locale is added (`docs/i18n/README.md` § Adding a locale) |

**Terms to fix in each glossary before translating:** amount of substance / mole / molar mass
(de: *Stoffmenge* / *Mol* / *molare Masse* — already fixed), Avogadro's number (de:
*Avogadro-Konstante*), limiting reagent / excess, theoretical / actual / percentage yield
(*theoretische / tatsächliche / prozentuale Ausbeute*), significant figures, gas volume at
STP/SLC if Level 6 is kept (the conditions and the 22.4 / 24.8 L/mol values are region-dependent
in *content*, not only in language — decide per locale with the open question above).
**Chemistry names the game introduces:** none beyond `reactions.ts` and `compounds.ts` — overlay
any new species by id.
**Dataset prose to overlay:** reaction names and the per-reaction hint text.
**Count-dependent strings:** "{n} mol", "{n} g of {compound}" (units stay, the sentence around
them is per locale; decimal comma in every planned locale except possibly `es`).
