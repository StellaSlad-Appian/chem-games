# Game Concept Brief: Reagent Bench (Functional Groups)

> **Superseded.** The chosen flagship for functional groups is
> [Synthesis Router](./synthesis-router.md) (reaction pathways — the strongest VCE Unit 4 fit).
> This file is kept as the record of the alternatives assessed: Reagent Bench (below),
> Spectrum Detective (IR/NMR peak assignment), Group Hunter (find groups in real drug
> molecules), and Property Lab (group → intermolecular force → boiling point). Spectrum Detective
> remains the recommended *second* organic game.

**Status:** Options record — not for build
**Proposed slug:** `reagent-bench` (MVP classifier could ship as `functional-groups`)
**Target concept(s):** Identifying organic functional groups (alkane/alkene/alkyne, alcohol,
aldehyde, ketone, carboxylic acid, ester, amine, haloalkane) from structure and from their
characteristic chemical tests.
**Target year level:** Senior (Year 11–12)
**Curriculum reference:** _TBD_

> Your list says "Functional groups **quiz**". A quiz is the anti-pattern the design framework
> warns about, so this brief offers two tiers: a cheap recognition MVP that reuses existing
> platform machinery, and the intrinsic game. **Also check the upstream `(game)Reagent` branch
> before starting — its name suggests someone is already building something like this.**

## Tier 1 — MVP: Functional Group Classifier (recognition, ~days)

`classifier-games-config.ts` already contains `ORGANIC_FUNCTIONAL_CONFIG` (alcohol / carboxylic
acid / hydrocarbon) that was never wired to a page. Generalise the Acid-Base Classification page
into a config-driven classifier and add an organic-molecule dataset with a structure renderer.
Honest framing: this is a recognition drill (like Formula Blaster), acceptable as a fluency layer
but not the game that teaches *why*. Expand categories to ≥ 6 groups.

## Tier 2 — the game: Reagent Bench (intrinsic)

### Johnstone's Triplet mapping

- **Macroscopic (primary):** the player drops test reagents on an unknown organic sample and
  observes what happens — colour change, fizzing, precipitate, silver mirror.
- **Submicroscopic:** after each test, the part of the molecule responsible is highlighted
  (the C=C that added Br₂; the –OH that was oxidised). The player's job is to *deduce* the
  functional group from macroscopic evidence, then confirm by selecting it.
- **Symbolic:** the structural formula is hidden at first (an "unknown"), then revealed and
  annotated with the group name and the reaction equation when the deduction is correct.

### Core loop

An unknown appears. The bench offers reagents, each with a real diagnostic outcome:

| Reagent / test | Positive result | Identifies |
|---|---|---|
| Bromine water | Orange → colourless | C=C / C≡C (unsaturation) |
| Acidified K₂Cr₂O₇, warm | Orange → green | Primary/secondary alcohol, aldehyde (oxidisable); tertiary alcohol and ketone: no change |
| Sodium metal | Fizzes (H₂) | –OH (alcohols, carboxylic acids) |
| NaHCO₃ solution | Fizzes (CO₂) | Carboxylic acid only |
| 2,4-DNP | Orange/yellow precipitate | Aldehyde or ketone (C=O) |
| Tollens' reagent | Silver mirror | Aldehyde (not ketone) |
| Universal indicator | Red/orange | Carboxylic acid (weak) |
| AgNO₃ (aq), warm, after NaOH hydrolysis | White/cream/yellow ppt | Haloalkane (Cl/Br/I) |

Each test costs "bench time" (a resource, not a countdown), so an efficient deduction (fewest
tests) scores higher — this rewards *reasoning about which test discriminates*, which is exactly
the classroom skill. The chemistry is the physics: results are computed from the molecule's
actual groups, so a tertiary alcohol genuinely fails the dichromate test.

### Win / lose conditions

- Round win: correct group identified. Bonus for minimal tests. Wrong identification → the
  molecule is revealed with the contradicting test highlighted ("Tollens' was negative, so it
  can't be an aldehyde").
- No hard fail; optional `maxMistakes`.

### Difficulty progression

| Level | Content | Scaffolding |
|---|---|---|
| 1 | Alkane vs alkene vs alcohol; 3 reagents | Reagent cards state what a positive means |
| 2 | + carboxylic acid, aldehyde, ketone | Reagent cards show test name only |
| 3 | Distinguish aldehyde/ketone, 1°/2°/3° alcohol | Player must pick discriminating test; hints cost points |
| 4 | Molecules with two groups (e.g. 4-hydroxybutanal) | Must identify both |
| 5 | Ester & amine (smell/pH/hydrolysis) + reasoning under a tests budget | No scaffolds |

### Known misconceptions to guard against

- "Ketones are oxidised like aldehydes" — Level 3 exists for this.
- "Bromine water tests for any organic compound" — alkanes show no change (in the dark).
- Treating a test as proof rather than evidence — the reveal always shows the *chain* of tests.
- Colour-only results (orange→green, orange→colourless) — pair every result with text and an
  icon (accessibility + red/green).

## Platform reuse

- Shared organic dataset with Organic Naming: `organic-molecules.ts` (structure, name,
  `functionalGroups[]`, class of alcohol). Design once.
- Test outcomes = pure function `runTest(molecule, reagent)` → unit-test the whole matrix.
- Classifier config/timing values from `classifier-games-config.ts`; `chem-btn` styles.
- Structure renderer: start with condensed/displayed formulas via `MoleculeText`; a skeletal
  SVG renderer is a later shared component (README roadmap item 4).

## Accessibility notes

Every test result has a text description and icon; reagent drop has a click alternative
(select reagent → select "apply"). No timer — the tests *budget* replaces it.

## Open questions for you

1. Ship Tier 1 first as a quick win, or go straight to Tier 2?
2. Which tests are in your syllabus? (Tollens'/2,4-DNP vary by curriculum.)
3. Include esters/amines/amides at all at this level?

## Languages

Not for build (options record). If the Tier 1 classifier ever ships as a fluency drill it
follows `docs/i18n/GAMES.md` like any game: a title per locale in this table (en *Reagent
Bench*; de proposal *Reagenzientisch* — *Bank* would read as a financial bank), the test names
and observations translated with the colours and reagents in each language, formulae untouched,
and the functional-group names from the glossary.
