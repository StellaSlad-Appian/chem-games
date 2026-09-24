# Game Plan: Synthesis Router (Organic Reaction Pathways)

**Status:** Planned — approved direction, details need your review at the `YOU DECIDE` marks
**Slug (everywhere):** `synthesis-router`
**Concept:** `reaction-pathways` (parent `functional-groups`) — VCE Unit 4 AoS 1
**Cheat sheets:** `functional-groups` (primary), `organic-nomenclature`
**Year level:** Senior (Year 12)

## 1. Why this game

VCE Unit 4 AoS 1 asks students to "design reaction pathways" — exam questions show a flow chart
with blanks for reagents, conditions, or intermediates, and ask for percentage yield and atom
economy of a route. That is *exactly* a routing puzzle, so the game mechanic and the exam skill
are the same thing. It passes the intrinsic-mechanic test in `GAME_DESIGN_CHECKLIST.md`: strip
the chemistry and there is no game, because the functional groups define which moves exist.

## 2. Core loop

1. An **order** arrives: "Synthesise ethyl ethanoate from ethene. Budget: 4 steps."
2. The **bench** shows the current molecule (structure + name + functional-group highlight).
3. The **reagent shelf** offers reagents/conditions. The player applies one; the molecule
   transforms (or the reagent "does nothing", with a reason).
4. The **pathway track** records each step as a flow-chart node — the exact diagram used in
   exams.
5. Reaching the target ends the round. Score = base × efficiency (steps vs. shortest route) ×
   yield (product of per-step yields) × atom economy tier.

Later levels add branching (two starting materials that must be made separately then
combined — esterification), and *reverse* rounds (given the pathway, fill in the missing reagent
or intermediate — the most common exam format).

## 3. Johnstone's Triplet

| Level | In the game |
|---|---|
| Submicroscopic | Functional groups are highlighted on the structure; applying a reagent animates the bond change (C=C opens, –OH is replaced, C–H on the carbinol carbon leaves as oxidation) |
| Symbolic | Name, condensed/skeletal formula and the balanced step equation update together on every step; the pathway track is the symbolic flow chart |
| Macroscopic | Reagent bottles with real observations where they matter (bromine water decolourises, dichromate orange → green, ester smell), and the yield/atom-economy readouts as "how much product is in the flask" |

## 4. Chemistry scope (VCE Unit 4 AoS 1)

### Reaction rules (the edge table)

| # | From | Reagent / conditions | To | Type | Notes |
|---|---|---|---|---|---|
| R1 | alkene | H₂, Ni catalyst | alkane | addition (hydrogenation) | |
| R2 | alkene | X₂ (Cl₂/Br₂) | dihaloalkane | addition | Br₂ water decolourises |
| R3 | alkene | HX | haloalkane | addition | Position: symmetric alkenes only until Level 5 |
| R4 | alkene | H₂O, H₃PO₄ catalyst (or dilute H₂SO₄), heat | alcohol | addition (hydration) | |
| R5 | alkane | X₂, UV light | haloalkane | substitution | Mixture of products — flag as "low yield" |
| R6 | haloalkane | OH⁻ (NaOH aq), heat | alcohol | substitution | |
| R7 | haloalkane | NH₃ (excess) | primary amine | substitution | |
| R8 | primary alcohol | Cr₂O₇²⁻/H⁺ (or MnO₄⁻/H⁺), distil | aldehyde | oxidation | Mild/partial. **Enrichment:** aldehydes are named and drawn in VCE, but no key knowledge dot point covers partial oxidation or the distil-vs-reflux choice |
| R9 | primary alcohol | Cr₂O₇²⁻/H⁺, reflux | carboxylic acid | oxidation | Via aldehyde |
| R10 | aldehyde | Cr₂O₇²⁻/H⁺ | carboxylic acid | oxidation | |
| R11 | secondary alcohol | Cr₂O₇²⁻/H⁺ | ketone | oxidation | |
| R12 | tertiary alcohol | Cr₂O₇²⁻/H⁺ | *no reaction* | — | Deliberate trap |
| R13 | carboxylic acid + alcohol | conc. H₂SO₄ catalyst, reflux | ester + water | condensation (esterification) | Two inputs |
| R14 | ester | H⁺/H₂O or OH⁻, heat | carboxylic acid (or carboxylate) + alcohol | hydrolysis | Reverse of R13 |
| R15 | carboxylic acid + amine | heat | amide + water | condensation | > **YOU DECIDE:** confirm amide formation is in the current SD key knowledge. Check 2026-09-24: not in the key knowledge (evidence under §11, question 1) |
| R16 | alcohol | conc. H₂SO₄, heat | alkene | elimination (dehydration) | > **YOU DECIDE:** in scope? Often examined. Check 2026-09-24: in no key knowledge dot point (evidence under §11, question 1) |
| R17 | triglyceride (plant oil) + methanol | KOH or NaOH catalyst _(catalyst unverified)_ | biodiesel (methyl esters) + glycerol | transesterification | Verbatim VCE Unit 4 AoS 1 dot point; missing from rev 1. Needs a triglyceride node outside the C1–C4 molecule scope. Scores well on the green chemistry principle (renewable feedstock). > **YOU DECIDE:** which level — the check suggests a Level 4 or 5 "renewable feedstock" order |

Molecule scope for the MVP: C1–C4 straight chains + propan-2-ol / propanone / 2-methylpropan-2-ol
(the 1°/2°/3° contrast) — roughly 35 molecules. Everything is precomputed data; no naming engine.

### Scoring chemistry (VCE-specific)
- **Percentage yield** per step from config (e.g. addition 0.9, substitution 0.6, oxidation 0.7,
  esterification 0.65). Route yield = product of step yields. Teaches why fewer steps matter.
- **Atom economy** = M(desired product) / Σ M(reactants) × 100, computed from `molarMass`.
  Addition reactions score 100%; substitution/elimination score lower. Shown per step and for
  the route. This is a literal VCE calculation and rewards "green" routes.

## 5. Levels and scaffolding

| Level | Orders | Scaffolding |
|---|---|---|
| 1 — One step | alkene → alcohol, alkene → alkane, haloalkane → alcohol | Shelf shows only valid reagents; each card names the reaction type |
| 2 — Two steps | alkene → haloalkane → alcohol; alcohol → aldehyde → acid | Full shelf; hint button reveals the next functional group needed (not the reagent) |
| 3 — Choose the oxidation | 1° vs 2° vs 3° alcohols; distil vs reflux (enrichment, see R8) | No hints by default; tertiary trap active |
| 4 — Esters (two branches) | Make acid *and* alcohol from given starts, then combine | Pathway track supports two lanes merging |
| 5 — Optimise | Same target, scored on yield and atom economy; alternative routes exist | Route comparison shown after completion |
| 6 — Exam mode (reverse) | Pathway shown with blanks (reagent, condition, or intermediate); fill them in | Timerless; mirrors exam layout exactly |

## 6. Feedback design (low-stakes, diagnostic)

- Wrong reagent never ends the round. The molecule stays put and the feedback names the
  *group* that can't react: "Dichromate oxidises alcohols — this molecule is an alkane, it has
  no –OH." (`generateComparativeError` pattern.)
- A "dead end" (e.g. oxidising to a ketone when the target needs an acid) is allowed; the
  track shows the branch and offers **Undo** (free at Levels 1–2, costs yield at 5).
- Every step's balanced equation is written on the track, so the pathway doubles as revision
  notes; offer "Copy pathway as text" at the end (accessibility + study value).

## 7. Data model

```ts
// src/core-engine/data/organic-molecules.ts  (shared with Chain Namer / any spectra game)
export interface OrganicMolecule {
  id: string;                 // 'ethanol'
  name: string;               // IUPAC
  formula: string;            // 'CH3CH2OH' — rendered by MoleculeText
  molarMass: number;
  carbons: number;
  groups: FunctionalGroup[];  // ['alcohol']
  alcoholClass?: 1 | 2 | 3;
  skeletal?: string;          // optional SMILES-like string for a future SVG renderer
}

export type FunctionalGroup =
  | 'alkane' | 'alkene' | 'haloalkane' | 'alcohol' | 'aldehyde'
  | 'ketone' | 'carboxylic-acid' | 'ester' | 'amine' | 'amide';

// src/core-engine/data/organic-reactions.ts  (edges)
export interface OrganicReaction {
  id: string;                   // 'R4'
  type: 'addition' | 'substitution' | 'oxidation' | 'condensation' | 'hydrolysis' | 'elimination'
      | 'transesterification';
  reagent: ReagentId;           // 'H2O/H3PO4'
  conditions?: string;          // 'heat'
  inputs: string[];             // molecule ids (1 or 2)
  outputs: string[];            // molecule ids (1 or 2)
  yieldFraction: number;        // from config tier
  observation?: string;         // 'orange → green'
}
```

Molecules are nodes, reactions are edges: validation is "does an edge exist from the current
node(s) with this reagent". Shortest route (for scoring/hints) is a BFS over the graph. Reverse
rounds are generated by taking a known path and blanking one element. This is small (~35 nodes,
~60 edges) and fully unit-testable.

## 8. Architecture (follows `AGENT_INSTRUCTIONS.md`)

```
src/core-engine/data/organic-molecules.ts        nodes (shared dataset)
src/core-engine/data/organic-reactions.ts        edges
src/core-engine/data/games/synthesis-orders.ts   level → orders (start, target, budget)
src/core-engine/config/games/synthesis-router-config.ts
                                                  presets: yields per type, step budgets, scoring,
                                                  UAT tuning guide comment block
src/core-engine/utils/synthesis-utils.ts          applyReaction(), shortestRoute() (BFS),
                                                  routeYield(), atomEconomy()
src/core-engine/tests/synthesis.test.ts           every order is solvable; every edge balances
                                                  (atom counts in = out); 3° alcohols never oxidise
src/hooks/useSynthesisRouter.ts                   rules engine + state (mirror useReactionBalancer)
src/components/games/synthesis-router/
    GameArena.tsx        layout: bench | shelf | track
    MoleculeBench.tsx    structure + name + group highlight (MoleculeText for now)
    ReagentShelf.tsx     reagent cards (button + keyboard; no drag-only)
    PathwayTrack.tsx     flow-chart nodes with equations; two lanes at Level 4
    StepFeedback.tsx     diagnostic messages (FeedbackBanner styling)
src/app/(gameplay)/games/synthesis-router/page.tsx
supabase/migrations/<date>_add_synthesis_router.sql   games row + concept_games link
```

Registrations: `GameName`, `GameThemeScope`, `games` hub array, `SOUND_PATHS`
(`reaction-success`, `no-reaction` → fallbacks), `public.games` row, `concept_games`
(`reaction-pathways` primary), `cheat-sheet-data.ts` `GAME_LINKS` + `relatedGames` on the
functional-groups and organic-nomenclature sheets.

## 9. Accessibility (from `ACCESSIBILITY.md`)

- Reagent shelf: buttons, arrow-key navigable, `Enter` applies; `U` undo; no drag.
- Every observation has text ("bromine water: orange → colourless") and an icon; never colour
  alone.
- Live region announces each step: "Applied H₂O with H₃PO₄ catalyst. Ethene became ethanol."
- No timer; step budget replaces it.
- Pathway text export doubles as the screen-reader-friendly summary.

## 10. Milestones

1. **Data + engine (no UI):** molecules, reactions, orders, utils, tests green. Every order
   solvable within budget; every edge atom-balanced. ~2 days.
2. **Playable Level 1–2:** page + arena + shelf + track, feedback, session recording. ~3 days.
3. **Levels 3–4 + scoring:** 1°/2°/3° trap, esterification two-lane track, yield/atom economy. ~2 days.
4. **Level 5–6 + polish:** optimisation compare screen, reverse/exam mode, sounds, theme check,
   accessibility checklist, UAT presets. ~3 days.

## 11. Open questions for you

1. R15 (amides) and R16 (dehydration) — in or out for the current study design?
   > Evidence (check against the VCE Chemistry Study Design, Units 3–4 from 2024, the June 2024
   > sample exam and the 2023–2025 exam reports, on 2026-09-24):
   > - **R15 is not in the key knowledge.** The reaction list is: substitution to primary
   >   haloalkanes and primary alcohols, addition to alkenes, esterification, ester hydrolysis,
   >   pathways to primary amines and carboxylic acids, and transesterification to biodiesel.
   >   Amides are drawn ("primary amides") and identified by IR/NMR but not named, and the 2026
   >   Data Book dropped `-amide`. The amide link appears only as the **peptide link** in the
   >   condensation of amino acids to proteins. Options the check lists: keep an amide edge only
   >   as amino acid + amino acid → dipeptide + H₂O in a biomolecule level, or drop R15.
   > - **R16 is not in the key knowledge.** Dehydration is in no dot point, and not in the
   >   sample exam or any 2023–2025 report checked. Options: enrichment only, or omit.
2. Markovnikov (major/minor product) for unsymmetrical alkenes — Level 5 only, or out?
   > Evidence (same check):
   > - Neither the study design nor any 2023–2025 exam report (main and NHT) or the sample exam
   >   mentions Markovnikov's rule. The 2024 exam has no text layer and was not searched.
   > - The June 2024 sample exam treats but-1-ene + steam as giving two products, butan-1-ol
   >   and butan-2-ol, "structural isomers of each other"; its MC Q20 treats 1-hexene + HCl as a
   >   route that "could be used" to make 2-chlorohexane.
   > - So VCAA expects students to know that an unsymmetrical alkene gives **both** isomers, not
   >   a major/minor prediction. The check recommends that unsymmetrical additions (R3, R4)
   >   output both isomers — with a lower yield for the wanted one, or a separation step — and
   >   that "major product" rules are not taught as VCE content.
3. Should exam mode (Level 6) be a separate entry on the hub ("Pathway Practice") so students
   can go straight to it before the exam?
4. Structure display: condensed formulas via `MoleculeText` for the MVP, or wait for the shared
   skeletal SVG renderer? (Recommendation: ship condensed, upgrade later — the renderer is a
   platform component, not a game feature.)

## 12. Languages

Ships in every locale in `LOCALES` (`docs/i18n/GAMES.md`). English is the canonical text
above; each other locale is a translation of it, checked against `docs/i18n/glossary-<locale>.md`.
Resolve the table before `Approved`.

| Locale | Title | Kind | Hub description | Notes / alternative |
|---|---|---|---|---|
| en | Synthesis Router | — | Route a starting molecule to the target with the right reagents in the fewest steps. | Proposal. > YOU DECIDE |
| de | Syntheseplaner | adaptation | Führe das Ausgangsmolekül mit den richtigen Reagenzien in möglichst wenigen Schritten zum Ziel. | *Router* is a network device in German and *Route* reads as travel; *Syntheseplaner* (synthesis planner) says what the player does. Alternative: *Synthese-Route*. > YOU DECIDE |
| fr, es, it, ru | — | — | — | filled when the locale is added (`docs/i18n/README.md` § Adding a locale) |

**Terms to fix in each glossary before translating:** reaction pathway (de: *Syntheseweg* /
*Reaktionsweg*), reagent (*Reagenz*), catalyst, functional group and the group names (already
in the glossary), addition / substitution / oxidation / esterification / hydrolysis
(*Veresterung*, *Hydrolyse*), transesterification (*Umesterung*) and biodiesel, primary / secondary / tertiary alcohol, yield and **atom economy**
(*Atomökonomie*), the coined **reagent shelf**, **track** and **order**, *exam mode*.
**Chemistry names the game introduces:** every molecule in the new `organic-molecules.ts` —
name per locale by molecule id, following that language's IUPAC conventions (de esters are
*…säure…ester*, not *-oat*; see the glossary's naming table). The observation texts ("bromine
water: orange → colourless") name reagents and colours — both translated, the formulae not.
**Dataset prose to overlay:** molecule `name`, per-reaction `observation` and explanation, the
order descriptions, the pathway text export.
**Count-dependent strings:** "{n} steps", "{n} of {budget}".
