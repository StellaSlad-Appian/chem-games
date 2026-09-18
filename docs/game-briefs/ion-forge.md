# Game Concept Brief: Ion Forge (Ionic Compounds — Formulas & Names)

**Status:** Draft — needs your review
**Proposed slug:** `ion-forge`
**Supersedes:** the separate *Polyatomic Ions* and *Inorganic Nomenclature* briefs. Polyatomic
ions are not a standalone topic in the Victorian curriculum (Year 10 Science; VCE Unit 1 AoS 1
"ionic compounds") — they are content inside formula-writing and naming, so here they are
Levels 2–5 content in both modes rather than a game of their own. The ion *lookup table* lives
in Cheat Sheets, not in a game.
**Target concept(s):** Writing formulas of ionic compounds by charge balance (incl. brackets for
polyatomic ions and Roman numerals for variable-charge metals); IUPAC naming of ionic compounds;
binary molecular (Greek prefix) and acid naming as a contrast at the top levels.
**Target year level:** Year 10 → Senior (VCE Unit 1)
> YOU DECIDE: Mode B Levels 4–5 (molecular prefixes, acids) may be Senior-only. Confirm against
> the VCE Unit 1 key knowledge.
**Curriculum reference:** Victorian Curriculum Science Level 10 (chemical sciences); VCE Chemistry
Unit 1 AoS 1 — _confirm exact dot points_.

## Two modes, one engine

| | Mode A — **Build the formula** | Mode B — **Build the name** |
|---|---|---|
| Given | Compound name ("aluminium sulfate") | Formula + particle view (`Al2(SO4)3`) |
| Player does | Drops ions from a tray into the forge until net charge = 0 | Assembles name tokens (stem, numeral, suffix) in IUPAC order |
| Physics | A lattice cannot form with net charge ≠ 0 | Tokens are validated against the structure (charge, count, bonding type) |
| Live symbolic | Formula writes itself, brackets appear on the 2nd polyatomic ion | Each token highlights what it names in the particle view |

Both modes share the token/ion tray component, the ion data, and the formula/name generators.

## Johnstone's Triplet mapping

- **Submicroscopic:** ions with visible charges (Na⁺, SO₄²⁻, Fe³⁺) moved as rigid units. A
  running net-charge meter shows the sum.
- **Macroscopic:** at net charge 0 the ions lock into a lattice and a crystal "precipitates"
  (growth animation, chime); unbalanced ions jitter and repel. In Mode B a reagent-bottle label
  prints when the name is right.
- **Symbolic (live):** Mode A — formula with correct subscripts/brackets updates on every ion
  added or removed (`CaNO3` → `Ca(NO3)2` in the same frame). Mode B — `(III)` pulls three Cl⁻
  into the lattice; picking `(II)` visibly leaves it unbalanced; `tetra-` highlights four atoms.

## Core loop

**Mode A:** target name in the header → pick ions → net charge 0 **and** formula matches →
crystal forms. Wrong ions get a structural diagnostic ("SO₃²⁻ is *sulfite* — sulfate has one
more oxygen") and can be removed.
**Mode B:** compound shown → assemble the name → tokens that don't apply are rejected with a
reason tied to the structure ("This is a metal + non-metal compound — Greek prefixes are only
for two non-metals").

## Win / lose conditions

- Round win: exact match. Bonus for zero rejected ions/tokens.
- Level pass: `minPassingItems` (reuse `classifier-games-config` values).
- No hard fail by default; optional `maxMistakes` lives via config.
> YOU DECIDE: lives or purely mastery-based? Platform precedent supports both.

## Difficulty progression

| Level | Mode A content | Mode B content | Scaffolding |
|---|---|---|---|
| 1 | Monoatomic pairs: NaCl, MgO, CaCl₂, Al₂O₃ | Binary ionic, fixed-charge metals → `-ide` | Charges shown on tray; bonding type labelled |
| 2 | One polyatomic ion, no brackets: NaNO₃, K₂SO₄, NH₄Cl | Ionic with polyatomic ions; `-ate`/`-ite` distractors | Charges + ion names shown |
| 3 | Brackets required: Mg(OH)₂, Ca(NO₃)₂, Al₂(SO₄)₃, (NH₄)₂CO₃ | Same compounds, name from formula | Charges hidden until hover |
| 4 | Variable-charge metals: FeSO₄ vs Fe₂(SO₄)₃, Cu(NO₃)₂, PbO₂ | Roman numerals deduced from anion charge | Hint explains oxidation state |
| 5 | Reverse recognition: chlorate/chlorite/hypochlorite/perchlorate, sulfate/sulfite | Contrast: binary molecular (CO₂, N₂O₄, PCl₅) with prefixes and the `mono-` rule; acids (HCl → hydrochloric, H₂SO₄ → sulfuric, H₂SO₃ → sulfurous) | None |

## Known misconceptions to guard against

- "The subscript applies only to the last atom" — bracket animation must group the whole ion.
- "Charge is a property of the compound" — charges disappear into the neutral lattice.
- "Polyatomic ions break apart" — ions move as one unit.
- Using Greek prefixes for ionic compounds ("calcium dichloride") — count is implied by charge.
- Dropping `mono-` on the second element (carbon *mon*oxide); `-ite`/`-ate` = fewer/more oxygen,
  not smaller/larger charge; acids: `-ate → -ic`, `-ite → -ous`, `hydro-` only for binary acids.
- Spelling: IUPAC *sulfur/sulfate*, *aluminium*; the platform already uses *neutralise*.

## Platform reuse

- `src/core-engine/data/ions.ts` (`MONOATOMIC_IONS`, `POLYATOMIC_IONS`) and `compounds.ts`
  `ionicComponents { cations, anions }` — targets can be *derived* from compounds that have
  `ionicComponents`, so every target is already validated by `compounds.test.ts`.
  Extend `ions.ts` to the VCE data-book list (ammonium, carbonate, phosphate, chromate,
  dichromate, permanganate, ethanoate, cyanide, chlorate, hypochlorite… — currently missing).
- `elements.ts` `variableValenceStates` for Level 4.
- `MoleculeText` already renders `Ca(NO3)2` and `SO4 2-`.
- Pure functions in `core-engine/utils`, each unit-tested: `buildIonicFormula(ions)` (cross-over,
  brackets), `nameCompound(compound)` (ionic / molecular / acid systems, Roman numerals). Add a
  name cross-check to `compounds.test.ts`.
- New shared component: `components/games/shared/TokenTray.tsx` (drag *and* tap-tap *and*
  keyboard), reusable by Chain Namer.
- Cheat sheet: link to `/cheat-sheets/polyatomic-ions` from the hint button.

## Accessibility notes

Tray → forge must work by tap-tap and keyboard (number keys pick tray slots, Enter adds,
Backspace removes). Net-charge meter has a text readout ("net charge +1"). Highlights in Mode B
have text equivalents ("tetra- → 4 oxygen atoms"). No timer.

## Open questions for you

1. Tray size per level (4? 6?) — cognitive load.
2. Include hydrates (CuSO₄·5H₂O) as a Senior extension?
3. Should Mode B Level 5 (molecular/acid naming) be here or deferred to a later "Covalent Namer"?

## Languages

Ships in every locale in `LOCALES` (`docs/i18n/GAMES.md`). English is the canonical text
above; each other locale is a translation of it, checked against `docs/i18n/glossary-<locale>.md`.
Resolve the table before `Approved`.

| Locale | Title | Kind | Hub description | Notes / alternative |
|---|---|---|---|---|
| en | Ion Forge | — | Forge formulas and names from ions that balance. | Proposal. > YOU DECIDE |
| de | Ionenschmiede | translation | Schmiede Formeln und Namen aus Ionen, deren Ladungen sich ausgleichen. | A natural compound with the same forge image. Alternative: keep *Ion Forge*. > YOU DECIDE |
| fr, es, it, ru | — | — | — | filled when the locale is added (`docs/i18n/README.md` § Adding a locale) |

**Mode B is naming, so it is designed per language, not translated.** The English rules the
game teaches (*-ide*, *-ate/-ite*, *hypo-/per-*, Roman numerals, *mono-/di-/tri-* for
molecular compounds, hydrate prefixes) have different forms in each language (de: *-id*,
*-at/-it*, *Kupfer(II)-sulfat*, *Pentahydrat*; the Romance languages put the anion first
(*chlorure de sodium*, *cloruro de sodio*); Russian puts the cation in the genitive after the
anion (*хлорид натрия*)). Each locale's token tray, answer key and diagnostics therefore come
from a per-locale naming dataset, keyed by compound id, and the naming rules are reviewed by a
chemistry teacher who teaches in that language (`docs/i18n/GAMES.md` check 3).
**Terms to fix in each glossary before translating:** cation / anion, polyatomic ion (de:
*mehratomiges Ion*), formula of an ionic compound (de: *Verhältnisformel* — not *Molekülformel*),
charge balance, the coined **forge** and **tray**, transition-metal charge (Roman numeral),
hydrate, net charge.
**Chemistry names the game introduces:** none beyond `ions.ts` (already in the overlays) and
the compounds it forms — every formed compound needs an id and a name per locale.
**Dataset prose to overlay:** the Mode B rule explanations and diagnostic explanations per
compound; the tray labels.
**Count-dependent strings:** "net charge {n}", "{n} oxygen atoms".
