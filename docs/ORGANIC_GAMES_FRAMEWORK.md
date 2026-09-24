# Framework Plan: Organic Chemistry & Energetics Games (German Oberstufe focus)

**Status:** Draft. Needs your review at every `YOU DECIDE` mark. Not buildable until `Approved`
(`BUILD_PLAN.md` §0 rule 1).
**Owner / reviewer:** Stella (pedagogy owner).
**Last updated:** 2026-09-24
**Scope:** the shared foundation that every organic chemistry, kinetics and thermodynamics game
is built on, for German students in **Klasse 10–12**, with **Bavaria (LehrplanPLUS, G9) as the
pilot curriculum**. It covers:
- functional groups and nomenclature
- basic kinetics
- basic thermodynamics

**Companion documents:**
- [`curriculum/bavaria-gymnasium-chemie.md`](./curriculum/bavaria-gymnasium-chemie.md): what
  Bavaria teaches, where and at which level, with sources.
- [`curriculum/germany-sek2-overview.md`](./curriculum/germany-sek2-overview.md): the KMK
  standards and five other Länder compared. It also holds the skill ids (O/K/T/G), the
  misconception list (M1–M35) and a German–English glossary of about 110 terms that this plan
  uses.
- Existing briefs this plan absorbs: [`game-briefs/organic-naming.md`](./game-briefs/organic-naming.md),
  [`game-briefs/synthesis-router.md`](./game-briefs/synthesis-router.md),
  [`game-briefs/functional-groups.md`](./game-briefs/functional-groups.md).

This is a framework plan, not a game brief. It fixes the shared data model, engines, UI parts
and curriculum tagging. It also proposes a catalogue of games and an order to build them. Each
game still gets its own brief (template: `DOCS_NEEDED.md` §1) before it is built.

---

## 1. Why a framework, and why now

1. **Three organic briefs already share one dataset that does not exist yet.** Chain Namer,
   Synthesis Router and the functional-groups options all assume
   `src/core-engine/data/organic-molecules.ts` and a skeletal-formula renderer
   (game-briefs README, "Overlaps to keep resolved"). Designing that dataset once, properly, is
   the precondition for all of them.
2. **Kinetics and thermodynamics have no content at all.** There is no energy diagram, no
   particle simulation, no graph component and no thermochemical data. The unwired
   `THERMOCHEMISTRY_CONFIG` in `classifier-games-config.ts` is an exo/endo sorter. This plan
   supersedes it; do not wire it up.
3. **The platform's curriculum model is Australian only.** `YearLevel` is
   `Year 7…Year 10 | Senior`, and `concepts.curriculum_ref` holds VCAA codes. German content
   depends on the Land, the track (NTG or not) and the course level (gA/eA), and a single year
   tag cannot express that. See §3.
4. **German naming is its own content.** The organic-naming brief already notes that the answer
   key is a per-locale dataset. Bavaria adds rules of its own: locant before the suffix
   (*Propan-2-ol*), E/Z not cis/trans, trivial names alongside systematic ones, and
   *Reaktionsenergie* before *Enthalpie*.

---

## 2. What the curriculum actually asks for (summary)

Full detail and sources are in the two curriculum documents. Here is the part that shapes the
framework.

### 2.1 Where "Klasse 10–12" lands in Bavaria

| Bavarian stage | Who | Organic | Energetics / kinetics |
|---|---|---|---|
| Jgst. 9 (NTG: 8–9) | all | alkane names; *Reaktionsenergie*, *Aktivierungsenergie*, *Katalyse* (qualitative, energy diagrams) | first seeds |
| **Jgst. 10** (NTG: 9) | all | **branched alkanes, *Konstitutionsisomerie*, IUPAC names; alkenes/alkynes, E/Z; functional groups (alcohols, aldehydes, ketones, carboxylic acids); intermolecular forces → boiling point/solubility** | *Reaktionsenergie* only |
| Jgst. 10 | all | oxidation numbers; **redox series of the alcohols** (1°/2°/3°); Fehling/Tollens/Schiff; **ester condensation and hydrolysis mechanism** | NTG Profil: heat of neutralisation |
| Jgst. 11 | **NTG only** | chirality, Fischer, carbohydrates, proteins; ester/amide mechanism; simple retrosynthesis | none |
| **Jgst. 12** (gA and eA) | all Oberstufe chemistry students | tests for functional groups (LB3); **radical substitution, electrophilic addition** (LB5); eA adds SN, aromatics, I/M effects | **LB5: systems, *Reaktionsenthalpie*, calorimetry, Hess. LB6: rate, *Stoßtheorie*, Maxwell–Boltzmann, *RGT-Regel*, catalysis. LB7: equilibrium, MWG, Le Chatelier. LB8: entropy, Gibbs–Helmholtz (gA qualitative, eA quantitative)** |

**Consequences:**
- The organic games are **Klasse 10 games** (Year 10 on the hub).
- The kinetics and thermodynamics games are **Jgst. 12 games** (Senior / Oberstufe).
- Klasse 11 matters only for NTG students and adds the biomolecule and chirality topics, which
  are out of scope here (§11).

### 2.2 The Germany-wide safe core

The KMK standards and every Land checked agree on this core (ids from the overview document):

| Strand | Core (gA, all Länder) | Advanced only (eA / LK) | Enrichment (not in any core) |
|---|---|---|---|
| **Kinetics** | K1 v = Δc/Δt from data · K2 factors · K3 collision theory · K4 energy profile, Ea vs ΔH · K5 catalyst (lower Ea, regenerated, no equilibrium shift) · K6 fair-test experiments | v = k·c (Berlin only), autocatalysis | reaction order, Arrhenius, half-life. **Maxwell–Boltzmann is core in Bavaria only** |
| **Thermodynamics** | T1 exo/endo and sign · T2 systems · T3 first law, ΔH at constant p · T4 calorimetry · T5 Hess · T6 ΔrH° from ΔfH° · T7 enthalpy diagrams · T8 bond breaking costs energy | ΔS°, ΔG = ΔH − TΔS, *T*Grenz (Bavaria: qualitative at gA) | none |
| **Equilibrium** (adjacent) | G1 dynamic equilibrium · G2 Kc expression · G3 Le Chatelier (only T changes K) · G4 catalyst · G5 Haber–Bosch | ICE tables, quadratic solutions, *K*L | none |
| **Organic** | O1 homologous series · O2 naming branched alkanes · O3 functional groups and suffixes · O4 formula types · O5 constitutional isomers and intermolecular forces · O6 1°/2°/3° alcohol oxidation · O7 radical substitution and electrophilic addition | SN1/SN2, SE, aromatics (ester mechanism is gA in Bavaria and Hessen) | none |

**Bavaria-specific additions to the skill list:**
- **O8:** E/Z isomerism (Jgst. 10)
- **O9:** tests for functional groups (12 LB3)
- **O10:** ester condensation/hydrolysis mechanism (Jgst. 10)
- **K7:** Maxwell–Boltzmann distribution and the minimum energy (12 LB6)
- **T9:** entropy and Gibbs–Helmholtz, qualitative (12 LB8 gA)
- **T10:** Gibbs–Helmholtz, quantitative (eA)

---

## 3. Architecture overview

The framework has five layers. Each layer only depends on the ones below it.

| Layer | What it is | Pieces |
|---|---|---|
| **Games** | one brief per game, built as today | `src/app/[lang]/(gameplay)/games/<slug>` + a `use<Game>` hook |
| **Shared game UI** | new components | `StructureView`, `TokenTray`, `EnergyDiagram`, `ParticleBox`, `DataChart` (c–t graph, histogram), `EquationCards` |
| **Engines** | pure functions, no React | organic graph, energetics, kinetics simulation |
| **Data** | datasets checked by tests | organic molecules, per-locale names, thermochemical values, reactions |
| **Curriculum** | tags only; no game logic here | skills, anchors (BY/KMK/VCE), misconceptions, player curriculum profile |

**Platform pieces reused unchanged:**
- `GameShell`, `useGameState`, `useHintLadder`, `CoachPanel`, `GlossaryTerm`, `RichMessage`
- support mode, `<game>-messages.ts` catalogues per locale, `recordGameSession`

These foundations are numbered **OF1–OF9** (organic framework) to keep them apart from the
existing F1–F9 in `BUILD_PLAN.md` §4.

### OF1: Curriculum layer (skills, anchors, profile)

The German curriculum cannot be expressed as a year level, so the framework adds a tagging layer
alongside `YearLevel`. `YearLevel` itself stays, and the hub keeps using it.

```ts
// src/core-engine/curriculum/types.ts
export type CurriculumId = 'de-by-gym' | 'de-kmk-ahr' | 'de-nw' | 'de-ni' | 'de-bw' | 'de-be' | 'de-he' | 'au-vce';
export type CourseLevel = 'gA' | 'eA';                  // alias GK/LK, Basisfach/Leistungsfach
export type SkillId = `O${number}` | `K${number}` | `T${number}` | `G${number}`;

export interface CurriculumAnchor {
  curriculum: CurriculumId;
  stage: string;                 // 'Jgst. 10', 'EF', 'Q1', 'Unit 4'
  track?: 'NTG' | 'non-NTG';     // Bavaria only
  level?: CourseLevel;           // absent = both / Sek I
  unit: string;                  // 'LB3', 'Inhaltsfeld 2', 'AoS 1'
  status: 'core' | 'advanced' | 'enrichment';
}

export interface Skill {
  id: SkillId;
  strand: 'organic' | 'kinetics' | 'thermodynamics' | 'equilibrium';
  anchors: CurriculumAnchor[];
  misconceptions: MisconceptionId[];   // 'M1'…'M35' from the overview doc
  vocabStage: 'sek1' | 'sek2';          // drives Reaktionsenergie vs Reaktionsenthalpie (§6)
}
```

- **Games declare skills per level**, for example Chain Namer L2 → `['O2']`, and Collision Lab
  L4 → `['K3', 'K7']`. A test asserts that every level's skills exist and that every core skill
  in §2.2 is covered by at least one planned level.
- **Player curriculum profile:** "Bundesland · Zweig (NTG/anderer) · Kurs (gA/eA)", chosen once,
  stored with `useStoredValue` (localStorage), and changeable in settings.
  - It hides eA-only levels for gA students, labelled "eA / Leistungsfach" rather than silently
    removed.
  - It switches vocabulary stage and name variants.
  - It never gates anything hard: a student can always open any level.
- **Database:** nothing is needed for the MVP. Later, a `curriculum_anchors` table could replace
  the single VCAA `curriculum_ref`. That table would be keyed to `concepts`, not to games, so
  the teachers page can say "covers LehrplanPLUS 10 LB3".
- **Misconceptions as data:** `misconceptions.ts` holds M1–M35 with their source status
  ([V]/[L]/[U]). Distractors and diagnostic feedback reference them by id, so a teacher can see
  which misconception a round targets.

> **YOU DECIDE:** should the profile be per device (localStorage, no personal data) or also
> saved on the account (`profiles.curriculum` column, a new data field under the privacy
> controller's review)? Recommendation: device only for the MVP.

### OF2: Organic structure engine (molecular graph)

Every organic molecule is a **graph**, not a formula string. This one decision is what lets a
single dataset drive naming, highlighting, isomer comparison, functional-group detection and
reactions.

```ts
// src/core-engine/types/organic.ts
export interface OrganicAtom { id: number; el: 'C' | 'O' | 'N' | 'Cl' | 'Br' | 'I' | 'F'; charge?: number }
export interface OrganicBond { a: number; b: number; order: 1 | 2 | 3; stereo?: 'E' | 'Z' }
export interface OrganicGraph { atoms: OrganicAtom[]; bonds: OrganicBond[] }   // hydrogens implicit

export interface OrganicMolecule {
  id: string;                          // 'propan-2-ol' — stable, locale-free
  graph: OrganicGraph;
  coords?: [number, number][];         // precomputed 2D layout for rings (OF3)
  smiles: string;                      // documentation + script input only
  groups: FunctionalGroup[];           // DERIVED by detectGroups(), stored for review
  alcoholClass?: 1 | 2 | 3;
  trivialNameIds?: string[];           // 'isopropanol' → per-locale overlay
  molarMass: number;                   // DERIVED, asserted in tests
}
```

This extends the `OrganicMolecule` sketched in `synthesis-router.md` §7 and replaces that
sketch. The `formula` and `carbons` fields become derived values.

**Pure functions**, in `src/core-engine/utils/organic-*.ts` (flat, matching the existing
`utils/` convention):

| Function | Used by |
|---|---|
| `molecularFormula(g)`, `condensedFormula(g)`, `molarMass(g)` | all; the Summenformel and Halbstrukturformel views |
| `implicitHydrogens(g)`, `validateValence(g)` | dataset tests; player-built structures |
| `detectGroups(g)` → hydroxy, carbonyl (aldehyde/ketone), carboxy, ester, amino, halogen, C=C, C≡C, with the atom ids that form each group | highlighting, Reagent Bench results, classifier |
| `longestChains(g)`, `numberChain(g, chain)` → all candidate main chains and both numbering directions | Chain Namer feedback: "there is a longer chain", "lower locants from the other end" |
| `canonicalKey(g)` → canonical string for acyclic graphs (tree hashing); for rings, a precomputed key from the dataset script | Isomer Hunt duplicate detection; "the same molecule, rotated" (M33) |
| `alcoholClass(g, atomId)`, `oxidationNumber(g, atomId)` | redox series of alcohols (O6), oxidation-number rounds |

The graph is small (≤ about 12 heavy atoms in school scope), so brute-force algorithms are fine
and easy to test.

### OF3: `StructureView` (the shared renderer)

This is the "shared molecular visualisation component" every organic brief is waiting for.
`AtomCanvas` is built for Lewis structures (a central atom laid out radially) and does not
cover chains, so `StructureView` is a separate component. It shares `AtomCanvas`'s token
conventions.

- **Formula modes**, matching LehrplanPLUS 10 LB1:
  - *Summenformel*
  - *Halbstrukturformel*
  - *Valenzstrichformel* (all bonds, all H)
  - *Skelettformel*
  - *Keilstrichformel*, for the E/Z and later chirality work
  - A game can lock the mode or offer a toggle; converting between formula types is itself a
    curriculum skill (O4).
- **Layout:**
  - Acyclic molecules use our own zig-zag layout (deterministic, and 95 % of school scope).
  - Rings and anything irregular use `coords` precomputed at build time by extending the
    existing OpenChemLib script (`scripts/molecule-images.mts`).
  - **OpenChemLib stays a devDependency.** Nothing parses SMILES at runtime.
- **Interaction hooks:**
  - highlight a set of atoms or bonds (the chain, a functional group)
  - show locant numbers along a chain in either direction
  - make atoms and bonds selectable ("tap the carbonyl carbon")
  - an `aria-label` text equivalent generated from the graph ("Hauptkette: Kohlenstoff-Atome 1–5")
- **Not in the MVP:** curly-arrow mechanisms (OF9, later), free drawing, 3D.

> **YOU DECIDE:** the default formula mode per game. Recommendation: Halbstrukturformel with a
> Skelettformel toggle for Klasse 10; Skelettformel by default in Jgst. 12.

### OF4: Names as per-locale data, plus a German name generator as test oracle

- **Answer keys are data:** `src/i18n/organic-names/<locale>.ts` maps molecule id to
  `{ systematic: Token[]; accepted: string[]; trivial?: string }`.
  - Tokens drive `TokenTray` (locants, multipliers, substituents, stem, unsaturation, suffix).
  - `accepted` holds the variants the key accepts. In German that means *Propan-2-ol* and
    *2-Propanol*; *Ethylethanoat*, *Ethansäureethylester* and *Essigsäureethylester*; and
    *Konstitutions-* and *Strukturisomer*.
- **Canonical form shown to Bavarian students:** the ISB form (*Propan-2-ol*,
  *Hex-2-en-1,4-diol*, *3-Oxopentanal*), following the ISB priority table (Carbonsäure > Aldehyd
  > Keton > Alkohol > Alken > Alkin > Halogen > Alkan).
- **Test oracle:** a rule-based generator for the restricted school grammar
  (`utils/organic-naming-de.ts` and `-en.ts`) covers acyclic molecules up to C10 with one
  principal characteristic group, halogen and alkyl substituents, E/Z, and the ISB priority
  order.
  - It is **not** used at runtime at first. It runs in tests to prove that every hand-written
    answer key is correct.
  - It enables later "name any structure you built" rounds (Isomer Hunt, Chain Namer Mode B).
  - This resolves the curated-vs-engine question in `organic-naming.md`: **curated data at
    runtime, with the engine as the checker.** It keeps the MVP small and still catches errors
    in the answer key.

> **YOU DECIDE:** which ester name is canonical for German: *Ethansäureethylester* (BW, common
> in Bavaria) or *Ethylethanoat*? Recommendation: *…säure…ester* shown, both accepted.

### OF5: Energetics engine and thermochemical data

Pure functions in `src/core-engine/utils/energetics.ts`:

| Function | Skill |
|---|---|
| `calorimetryHeat(m, c, ΔT)`, `molarEnthalpyFromCalorimetry(Q, n)` | T4 |
| `enthalpyFromFormation(reaction, table)` (Σν·ΔfH° products − reactants; elements in their standard state = 0) | T6 |
| `combineEquations(cards)` (reverse = flip the sign, scale = multiply ΔH, sum = cancel species) and `isTargetReached(sum, target)` | T5 |
| `bondEnthalpyEstimate(graphBefore, graphAfter)`, reusing OF2 graphs | T8 |
| `entropyFromTable`, `gibbs(ΔH, ΔS, T)` (with the J/kJ unit trap handled explicitly), `crossoverTemperature` | T9/T10 |
| `meanRate(series, t1, t2)`, `tangentRate(series, t)`, `rgtFactor(T1, T2, rate1, rate2)` | K1, K2 |

- **Data:** `src/core-engine/data/thermo-data.ts` holds ΔfH°, S° and average bond enthalpies for
  the species the games use (about 40), with **one cited source for the whole table**.
- **Checks:** a test re-balances every reaction with the existing balancer utilities and
  checks each ΔH against a literature value within a tolerance.

> **YOU DECIDE:** the source of the thermochemical values. Students check answers against their
> Bavarian *Formelsammlung*, whose values differ slightly from NIST/CRC. Options: (a) one
> open reference table cited in the file, with a tolerance on answers; (b) match a
> Formelsammlung's values (check the licence of the table as a whole before copying it).
> Recommendation: (a), accepting ±2 % or ±1 kJ/mol, with a note in the instructions.

### OF6: Kinetics simulation engine (`ParticleBox`)

The heart of the kinetics games: a small, **seeded, deterministic** 2D particle simulation.
Nothing in the codebase does this today: `collision-utils.ts` is hitbox detection for Neutralise
and is not reusable here.

- **Engine** (`utils/particle-sim.ts`, pure, stepped with fixed dt):
  - hard-disc particles of A and B (+ an optional catalyst surface or catalyst particles)
  - temperature sets the speed distribution
  - a collision reacts if its energy along the line of centres is ≥ Ea (lowered on a catalyst
    surface) and, optionally, if its orientation is right
  - it records counts over time
- **Views:**
  - `ParticleBox` (canvas; reduced-motion mode shows snapshots plus the chart only)
  - `DataChart` for the c–t curve, with secant and tangent tools
  - a live **Maxwell–Boltzmann histogram** with an Ea line and the shaded fraction above it (K7)
- **Calibration test:** with a fixed seed, raising T by 10 K gives a rate ratio in the range
  2–4 (the RGT rule emerges instead of being scripted). Doubling [A] roughly doubles the initial
  rate. A catalyst changes the rate but not the final equilibrium composition when the
  reversible mode is on (M1, G4).
- **Model limits stated in the game:** a model, not reality (2D, hard spheres). This is itself
  a Bavarian LB1 competence ("Modelle … reflektieren").
- **Performance:** at most about 300 particles, an `requestAnimationFrame` loop that pauses with
  `isPaused`, and a Web Worker only if profiling shows a need.

### OF7: Shared UI kit

| Component | Purpose | Notes |
|---|---|---|
| `TokenTray` | assemble names from tokens | shared with Ion Forge (already planned there); keyboard-first |
| `EnergyDiagram` | draw and read energy profiles: reactant level, transition state, product level; optional catalysed path | draggable handles plus numeric input for accessibility; labels switch *Reaktionsenergie* ↔ Δ*r*H by `vocabStage` |
| `EquationCards` | Hess cycles: cards that flip, scale and stack | uses `MoleculeText` and balancer utilities |
| `DataChart` | c–t curves, histograms, bar charts | SVG; decimal comma in `de`; text table fallback |
| `LabBench` (later) | virtual test tubes for Reagent Bench and the calorimeter | observations always as text plus icon, never colour alone |

### OF8: Progress by skill

Today progress is per game (`game_progress`). Round results will carry the skills and
misconceptions they touched (`{ skills: SkillId[], misconceptionHit?: MisconceptionId }`) in
memory, so the end-of-game summary can say "Lowest locants: 5/5 · Alphabetical order: 2/4".

> **YOU DECIDE:** should per-skill results be persisted (a new `user_skill_progress` table, or a
> JSON column on `game_sessions`)? This is new learning-analytics data about minors, so it
> needs the privacy controller's review (`PRIVACY_GDPR_DRAFT.md`).
> Recommendation: in-session only for the MVP; persist later if teachers ask for it.

### OF9 (later): Mechanism layer

Curly-arrow mechanisms cover these steps:
- radical substitution: start, chain, termination
- electrophilic addition: Br₂ + alkene
- ester condensation (Jgst. 10)
- SN and SE (eA)

This needs electron-pair and arrow interaction on `StructureView`. It is a large piece of work,
so it is built after the first games prove the renderer.

---

## 4. Game catalogue (proposed)

Working titles are English. German titles are decided in each game's brief ("Languages" table).
**Each row becomes its own brief**; nothing here is buildable yet.

| # | Working title | Core mechanic (why it is a game, not a quiz) | Johnstone focus | Skills | Bavaria anchor | Reuses | Size |
|---|---|---|---|---|---|---|---|
| **G1** | **Chain Namer** (existing brief, retargeted) | build the name from tokens; the structure highlights exactly what each token names, and a wrong stem shows the longer chain you missed | symbolic ↔ submicro | O1, O2, O3, O8 | 10 LB2/LB3 (NTG 9) | OF2–OF4, OF7 | M |
| **G2** | **Isomer Hunt** (new) | build every constitutional isomer of C₅H₁₂, C₆H₁₄, C₄H₈, C₄H₁₀O…; a rotated or bent duplicate is caught and overlaid ("same molecule"); each new find must be named | submicro | O5, O2, O8 | 10 LB2 | OF2 `canonicalKey`, OF4 | M |
| **G3** | **Boiling Point Ladder** (from the functional-groups options record, "Property Lab") | order molecules by boiling point or solubility, then justify each with the force involved (London / dipole–dipole / H-bonds); a thermometer and distillation make the macro level concrete | macro ↔ submicro | O5, O3 | 10 LB3 | OF2, OF3 | S |
| **G4** | **Reagent Bench** (revived: Bavaria's 12 LB3 and 10 LB5 tests are exactly this game) | identify an unknown by choosing discriminating tests (*Bromwasser*, *Fehling*, *Tollens*, *Schiff*, *DNPH*, *BTB*, dichromate/permanganate); results are computed from `detectGroups` | macro → symbolic | O3, O6, O9 | 10 LB5; 12 LB3 | OF2, OF7 `LabBench` | M |
| **G5** | **Synthesis Router** (existing brief, German edge set) | route start → target with reagents; with a Bavarian profile the edge table becomes SR, AE, alcohol oxidation, ester condensation and hydrolysis (SN only for eA) | symbolic | O6, O7, O10 | 10 LB5/LB6; 12 LB5 | OF2–OF3 | M–L |
| **G6** | **Energy Hill** (new) | build or repair energy profiles to match an observation ("needs a match to start, then gets hot"); add a catalyst path; separate Ea from ΔH | symbolic ↔ macro | K4, K5, T1, T7 | 9 LB3 (qualitative); 12 LB5/LB6 | OF7 `EnergyDiagram` | S |
| **G7** | **Collision Lab** (new, flagship for kinetics) | predict → run → explain: set c, T, *Zerteilungsgrad* and catalyst to hit a target rate or time; read mean and instantaneous rate from your own c–t curve; watch the Maxwell–Boltzmann tail cross Ea | submicro ↔ symbolic | K1–K7 | 12 LB6 | OF5, OF6, OF7 `DataChart` | L |
| **G8** | **Hess Puzzle** (new) | reach a target equation by flipping, scaling and stacking given equations; ΔH follows every move; a second mode computes ΔrH° from ΔfH° | symbolic | T5, T6, T3 | 12 LB5 | OF5, OF7 `EquationCards` | S–M |
| **G9** | **Calorimeter** (new) | run virtual calorimetry experiments (neutralisation, dissolving salts, combustion); compute ΔrH and account for heat loss | macro → symbolic | T4, T1, T2 | 10 NTG Profil; 12 LB5 | OF5, OF7 | S |
| G10 | **Spontaneity Quadrant** (later) | sort processes by the signs of ΔH and ΔS, then predict at which T they run; eA computes ΔG and *T*Grenz | symbolic | T9, T10 | 12 LB8 | OF5 | S |
| G11 | **Equilibrium Lab** (later, adjacent) | the `ParticleBox` in reversible mode: disturb it, watch Q approach K, and test Le Chatelier and the catalyst rule | submicro ↔ symbolic | G1–G5 | 12 LB7 | OF6 | M |
| G12 | **Arrow Pusher** (later) | complete mechanisms with curly arrows | submicro | O7, O10 (+ eA SN/SE) | 10 LB6; 12 LB5 | OF9 | L |

**Deliberately not a game:**
- A standalone "name 30 molecules" drill. The ISB warns against nomenclature as an end in itself,
  so naming appears inside G1, G2, G4 and G5, in context.
- The unwired `ORGANIC_FUNCTIONAL_CONFIG` classifier. G4 replaces it.

> **YOU DECIDE:**
> 1. Accept this catalogue as the organic and energetics roadmap? It changes two decisions in
>    `game-briefs/README.md`: Reagent Bench is revived (it was superseded for VCE), and Synthesis
>    Router moves behind Chain Namer for German students.
> 2. Is equilibrium (G11) in scope? You asked for kinetics and thermodynamics. Equilibrium sits
>    next to them in Jgst. 12 and reuses OF6 almost for free.
> 3. Mechanisms (G12): in scope for this framework, or later?

---

## 5. Build order (phases)

Each phase ends with a milestone report (`BUILD_PLAN.md` §6). Sizes are relative:
S = days, M = about 1–2 weeks, L = more.

| Phase | Deliverables | Acceptance (summary) |
|---|---|---|
| **P0: decisions** | these three documents reviewed; every `YOU DECIDE` resolved; the Bavarian doc checked by a teacher | status `Approved`; teacher sign-off noted in the curriculum doc |
| **P1: foundations** (M) | OF1 curriculum layer (data, profile picker, skill tests); OF2 graph engine; `organic-molecules.ts` with about 80 molecules (C1–C10 alkanes, branched isomer sets, alkenes/alkynes with E/Z, the four Klasse 10 functional groups, esters, halogenoalkanes); OF4 German + English answer keys with generator-as-oracle tests; OF3 `StructureView` (Halbstruktur + Skelett, highlight, locants) | every molecule passes `validateValence`; derived formula and molar mass match; `detectGroups` matches the tagged groups; the generator reproduces every German and English answer key; the renderer has a text alternative; nothing player-facing yet |
| **P2: first games** (M) | **G1 Chain Namer** (Mode A) and **G6 Energy Hill**, the cheapest proof of each half | the brief's definition of done; both in every locale (or the exception in §7) |
| **P3: kinetics and thermodynamics** (L) | OF5, OF6, `DataChart`, `EquationCards`; **G7 Collision Lab**, **G8 Hess Puzzle** | simulation calibration tests (RGT, concentration, catalyst); every Hess target solvable; answers checked with a tolerance |
| **P4: organic breadth** (M–L) | **G2 Isomer Hunt**, **G4 Reagent Bench**, **G3 Boiling Point Ladder**, **G5 Synthesis Router** (German edge set) | complete isomer sets proven by an enumeration script; every test result derived from `detectGroups` |
| **P5: advanced / eA** (L) | G9 Calorimeter, G10 Spontaneity, G11 Equilibrium, OF9 + G12 Arrow Pusher | as their briefs specify |

The existing order in `BUILD_PLAN.md` §3 still applies: foundations F1–F9 and the approved
games come first. P1 can start in parallel only once the Phase F milestone is signed off.

> **YOU DECIDE:** P2 pairs one organic game with one energetics game so that both halves are
> proven early. The alternative is to finish organic first (P1 → G1 → G2 → G4). Which do you
> prefer?

---

## 6. German-specific rules every game follows

These go into `docs/i18n/glossary-de.md` and each game's catalogue review (`GAMES.md` check 3):

1. **Locants and names** follow the ISB (*Propan-2-ol*, *But-2-en*, *2,2-Dimethylpropan*); the
   variants listed in OF4 are accepted as answers.
2. **E/Z, never cis/trans**, in German.
3. **Vocabulary stage:**
   - `sek1` (Klasse 9–10): *Reaktionsenergie*, *exotherm/endotherm*, *Aktivierungsenergie*;
     never *Enthalpie* or ΔH.
   - `sek2` (Jgst. 12): Δ*r*H°, *Reaktionsenthalpie*, *freie Enthalpie*, *exergon/endergon*.
   - Energy Hill (G6) runs in both stages.
4. **Stoffebene vs Teilchenebene:** "Ethanol siedet bei 78 °C", but
   "Ethanol-Moleküle bilden Wasserstoffbrücken". Feedback text is reviewed for this in every
   catalogue.
5. **Preferred terms:**
   - *Kohlenstoffdioxid*
   - *Oxonium-Ion*
   - *K*S/p*K*S
   - *Elektronenpaarabstoßungsmodell*
   - *London-Dispersions-* under *Van-der-Waals-Wechselwirkungen*
   - *Zerteilungsgrad*
   - *RGT-Regel*
   - *Aminocarbonsäure*
6. **Numbers:** decimal comma, units with a thin space (`kJ · mol⁻¹` or `kJ/mol`; pick one in
   the glossary), and T in K for Gibbs.
7. **Entropy wording:** "Maß für die Verteilung von Energie und Teilchen" (Bavaria). Do not mark
   "Unordnung" as wrong (Hessen teaches it); use it only as a distractor for the *definition*.
8. **Operators:** instructions and exam-style rounds use IQB operators correctly (*nennen*,
   *beschreiben*, *erklären*, *erläutern*, *berechnen*, *beurteilen*, *bewerten*), because
   students meet exactly these in the Abitur.

---

## 7. Languages

`BUILD_PLAN.md` §0 rule 5 says every game ships in every locale. For this framework that splits
in two:

- **Energetics and kinetics games (G6–G11)** translate like any other game. The chemistry is
  numbers and diagrams. Normal rule.
- **Naming-heavy games (G1, G2, G5)** need a **per-locale answer key** checked by a chemistry
  teacher who teaches in that language: French, Spanish, Italian and Russian naming differ
  structurally. The German key is the pilot, so this is the biggest per-locale cost in the whole
  platform (the organic-naming brief already flags it).

> **YOU DECIDE:** allow the naming games to ship in `de` + `en` first, with the other locales
> following as their answer keys are reviewed? This would be a documented exception to rule 5.
> The alternative is to hold the naming games until all six keys exist.

**English content** for these games follows IUPAC English, as the existing organic cheat sheets
do.
- The Bavarian profile affects German only.
- An English-speaking student on the VCE profile gets the VCE edge table and conventions from
  the existing briefs.
- The framework serves both through the curriculum profile (OF1).

---

## 8. Platform impacts and conflicts to resolve

| Item | Impact |
|---|---|
| **Audience band** | `TEACHERS_PAGE.md` sets the site's target as Year 9–10 and says German copy must never say "Oberstufe". The kinetics and thermodynamics games are Jgst. 12 content. **YOU DECIDE:** widen the stated audience to "Klasse 9–12 / Oberstufe", or present the Jgst. 12 games as a separate "Oberstufe" section. |
| **`YearLevel`** | Unchanged. Organic games are `Year 10` (and `Senior` where they include Jgst. 12 levels); energetics games are `Senior`. The Bavarian detail lives in OF1, not in `YearLevel`. German labels stay `Klasse 10` and `Oberstufe`. |
| **`CheatSheetCategory`** | `Organic` and `Thermodynamics` exist. **Kinetics** needs a new category (or "Energetik & Kinetik"). New cheat sheets are likely: *Reaktionsgeschwindigkeit*, *Energetik*, *Isomerie*, *Nachweisreaktionen*. |
| **`concepts` seeds** | Existing: `functional-groups`, `organic-nomenclature`, `reaction-pathways`. New: `isomerism`, `intermolecular-forces`, `energetics`, `reaction-rates` (and `chemical-equilibrium` if G11). One migration per phase. |
| **Game registration** | Every new slug touches the usual registration points (`GAME_DESIGN_CHECKLIST.md` §2: `GameName`, `GameThemeScope`, `game-titles.ts`, `GAME_SESSION_LIMITS`, `e2e/helpers.ts`, `games` row, `GAME_LINKS`/`relatedGames`, `games-data.ts`). Note that `AGENT_INSTRUCTIONS.md` step 11 is stale: the hub list now lives in `src/lib/games-data.ts`. Fix that when P2 starts. |
| **Bundle size** | The engines are small pure TypeScript. The only heavy dependency candidate (OpenChemLib) stays build-time only. |
| **Accessibility** | Every canvas (`ParticleBox`, `EnergyDiagram` drag) has a keyboard and numeric path and a text readout. The simulation has a reduced-motion mode. No timers; step or energy budgets replace them (as in the existing briefs). |

---

## 9. File layout (proposed)

```
src/core-engine/curriculum/
    types.ts            skills.ts             misconceptions.ts
    anchors-by-gym.ts   anchors-kmk.ts        anchors-vce.ts      profile.ts
src/core-engine/types/organic.ts
src/core-engine/data/organic-molecules.ts     (generated isomer sets checked in, from the script)
src/core-engine/data/thermo-data.ts
src/core-engine/utils/organic-graph.ts        organic-groups.ts   organic-chains.ts
src/core-engine/utils/organic-canonical.ts    organic-naming-de.ts  organic-naming-en.ts
src/core-engine/utils/energetics.ts           particle-sim.ts
src/core-engine/tests/organic-*.test.ts       energetics.test.ts  particle-sim.test.ts  curriculum.test.ts
src/i18n/organic-names/<locale>.ts            (answer keys by molecule id)
src/components/games/shared/StructureView/    TokenTray/  EnergyDiagram/  EquationCards/  DataChart/  ParticleBox/
scripts/organic-dataset.mts                   (enumerate isomers, precompute ring coords, validate — OpenChemLib, dev only)
```

---

## 10. Testing strategy

Follows `docs/TESTING.md`; targeted tests by default, the full Playwright suite before a merge.

- **Dataset invariants (Vitest):**
  - every graph passes the valence check
  - derived formula and molar mass agree with the stored values
  - `detectGroups` agrees with the tagged groups
  - canonical keys are unique across the dataset
  - every isomer set is complete, checked against the enumeration script
  - every molecule has a name in every shipped locale (as `chemistry-names.test.ts` does today)
- **Name oracle:** the generator reproduces every `de` and `en` answer key. A mismatch fails the
  build, and a human decides whether the key or the generator is wrong.
- **Energetics:** every Hess puzzle is solvable; ΔH values agree with the table within a
  tolerance; there are unit tests for the J/kJ and °C/K traps.
- **Simulation:** runs are seeded and deterministic; the calibration assertions from OF6 hold;
  a catalyst never changes the final composition in reversible mode.
- **Curriculum:** every skill a game level references exists; every core skill in §2.2 is
  covered by at least one planned level (reported, not failing, until P4).
- **E2E:** one Playwright spec per game, per locale, using `data-testid` hooks, as the existing
  games do.

---

## 11. Out of scope for this framework

- Biomolecules, chirality and Fischer/Haworth projections (NTG 11, Jgst. 13).
- Polymers and dyes (Jgst. 13).
- Acid–base equilibria and buffers.
- Electrochemistry beyond the ΔG link.
- Spectroscopy (the "Spectrum Detective" option in `functional-groups.md` remains a later
  candidate).
- Rate laws, reaction order and Arrhenius: enrichment at most (Berlin LK only).

---

## 12. Open questions (consolidated)

1. Curriculum profile: stored per device only, or also on the account? (OF1)
2. Default formula mode per stage. (OF3)
3. Canonical German ester name. (OF4)
4. Source of the thermochemical data, and the answer tolerance. (OF5)
5. Persist per-skill progress? Needs a privacy review. (OF8)
6. Accept the catalogue; equilibrium (G11) and mechanisms (G12) in or out? (§4)
7. P2 pairing (organic + energetics) or organic first? (§5)
8. Naming games in `de` + `en` first, as an exception to "every locale"? (§7)
9. Audience band: widen to Klasse 9–12, or a separate Oberstufe section? (§8)
10. Who reviews the Bavarian curriculum document: a Bavarian chemistry teacher, ideally one
    who teaches both NTG and non-NTG classes?
11. Other Länder: Bavaria first, then KMK core tagging for all. Nine Länder are not yet
    researched (Saxony, Thuringia, Saxony-Anhalt, Mecklenburg-Western Pomerania,
    Schleswig-Holstein, Hamburg, Bremen, Rhineland-Palatinate, Saarland). Research them when
    teachers from those Länder show interest?
