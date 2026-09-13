# Game Concept Brief: Name Assembler (Inorganic Nomenclature)

**Status:** Draft — needs your review
**Proposed slug:** `name-assembler`
**Target concept(s):** IUPAC naming of inorganic compounds: ionic (incl. Roman numerals and
polyatomic ions), binary molecular/covalent (Greek prefixes), and acids (hydro-/-ic/-ous).
**Target year level:** Year 10 → Senior
> YOU DECIDE: does "Nomenclature" in your list mean inorganic only, or both inorganic and organic?
> This brief is inorganic; organic naming is [organic-naming.md](./organic-naming.md).
**Curriculum reference:** _TBD_

## Johnstone's Triplet mapping

- **Symbolic (primary):** the name is assembled from tokens — stems (`iron`, `sulf-`),
  oxidation-state numerals (`(III)`), Greek prefixes (`di-`, `tetra-`), suffixes (`-ide`,
  `-ate`, `-ite`, `-ic acid`).
- **Submicroscopic (live-linked):** the compound is displayed as its particles. Every token the
  player places *highlights what it refers to*: `tetra-` lights up four oxygen atoms; `(III)`
  shows Fe³⁺ and pulls in three Cl⁻ to balance; choosing `(II)` instead visibly leaves the
  charge unbalanced. The name is "read off" the structure rather than memorised.
- **Macroscopic:** light touch — a label prints on a reagent bottle when the name is correct
  (the "lab" framing already used across the platform).

## Core loop

A compound appears (formula + particle view). The player builds its name from a token tray in
order: prefix/cation → numeral (if needed) → anion stem → suffix. Tokens that don't apply are
rejected with a reason tied to the structure ("This is a metal + non-metal compound — Greek
prefixes are only used for two non-metals"). Reverse rounds: name given, build the formula
(shares the Ion Forge mechanic).

The chemistry *is* the rule engine: the token tray is generated from the compound's bonding
type (ionic vs molecular vs acid), so choosing the wrong naming system is the central mistake
the game teaches you to avoid.

## Win / lose conditions

- Round win: full name assembled correctly. Bonus for no rejected tokens.
- Level pass: `minPassingItems` correct (reuse classifier config values).
- Low stakes: rejected tokens don't end the round; optional `maxMistakes` lives.

## Difficulty progression

| Level | Content | Scaffolding |
|---|---|---|
| 1 | Binary ionic, fixed-charge metals (NaCl, MgO, Al₂O₃) → `-ide` | Bonding type labelled ("ionic"); tray contains only valid tokens |
| 2 | Ionic with polyatomic ions (Na₂SO₄, KNO₃, Ca(OH)₂) | Bonding type labelled; distractor suffixes appear (-ite/-ate) |
| 3 | Variable-charge metals (FeCl₃, Cu₂O, PbO₂) → Roman numerals | Charge of anion shown; player must deduce cation charge |
| 4 | Binary molecular (CO₂, N₂O₄, PCl₅, SF₆) → Greek prefixes, mono- rule | Player must identify bonding type themselves (metal/non-metal shown on periodic-table glyphs) |
| 5 | Acids (HCl → hydrochloric, H₂SO₄ → sulfuric, H₂SO₃ → sulfurous, HNO₂ → nitrous) + mixed review | No labels; all naming systems in the tray |

## Known misconceptions to guard against

- Using Greek prefixes for ionic compounds ("dichloride" for CaCl₂) — the highlight shows the
  count is *implied* by charge balance, not stated.
- Dropping `mono-` on the second element (carbon *mon*oxide) — enforce; explain the first-element
  exception.
- `-ite`/`-ate` meaning "fewer/more oxygen", not "smaller/bigger charge".
- Acid names: `-ate → -ic`, `-ite → -ous`, `hydro-` only for binary acids.
- Spelling convention: use IUPAC `sulfur`/`sulfate` (not *sulphur*) consistently — and *aluminium*
  (British/IUPAC) — confirm.
> YOU DECIDE: British/IUPAC spellings? The platform already uses *neutralise*.

## Platform reuse

- All ionic content comes from `ions.ts` + `compounds.ts` (`ionicComponents` tells you it's
  ionic; absence + non-metals only → molecular; `pKa` present + H-first formula → acid).
- Roman-numeral logic shared with Ion Forge Level 4 — write it once in `core-engine/utils`.
- Token tray = same drag/tap component as Ion Forge; consider a shared
  `components/games/shared/TokenTray.tsx`.
- Name-generation is a pure function `nameCompound(compound)` → unit-test it against every
  compound in the registry (add a `name` cross-check to `compounds.test.ts`).

## Accessibility notes

Token assembly must work via keyboard (tab to token, Enter to place, Backspace to remove).
Highlighting on the particle view must be accompanied by a text description ("tetra- → 4 oxygen
atoms") for screen readers.

## Open questions for you

1. Include hydrates (CuSO₄·5H₂O) or peroxides? Probably Senior-only extension.
2. Should wrong-system tokens even appear at Level 1 (pure scaffolding) or always (discovery)?
3. Is a "speed round" (timed) wanted for fluency, given the anti-pattern guidance on timers?
