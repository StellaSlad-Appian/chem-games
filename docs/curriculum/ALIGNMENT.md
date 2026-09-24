# Aligning the curriculum map and the organic games framework

**Status:** Approved (§7, 2026-09-24/25). §6 steps 1–3 implemented on 2026-09-25; see §6.1 for
where the implementation differs from the proposal.
**Date:** 2026-09-24
**Covers:** two curriculum models that were written at the same time, on the same day, without
knowing about each other:

| | Curriculum map | Organic games framework |
|---|---|---|
| Docs | [`CROSS_COUNTRY_MAP.md`](./CROSS_COUNTRY_MAP.md), [`countries/`](./countries/) | [`../ORGANIC_GAMES_FRAMEWORK.md`](../ORGANIC_GAMES_FRAMEWORK.md) (OF1), [`countries/germany-bavaria.md`](./countries/germany-bavaria.md), [`germany-sek2-overview.md`](./germany-sek2-overview.md), [`australia-overview.md`](./australia-overview.md) and the eight `countries/australia-*.md` |
| Code | `src/core-engine/types/curriculum.ts`, `src/core-engine/data/curriculum/` (160 concepts, 10 country files, 67 tests) | none yet; OF1 is a proposal |
| Unit of content | **canonical concept** (`hess-law`, `maxwell-boltzmann`) across all of chemistry | **skill id** (`T5`, `K7`) for organic, kinetics, thermodynamics, equilibrium only |
| Unit of place | **country** (ISO alpha-2), plus `track` | **curriculum** (`de-by-gym`, `au-vic`…), plus `track` and `level` (gA/eA) |
| Where a topic sits | `Placement {from, to, depth, track?, status}` in school years 7–12 | `CurriculumAnchor {stage, unit, track?, level?, status}` with local unit names |
| Coverage | 10 countries, Years 7–12, all topics | Germany (Bavaria in depth, 5 Länder compared) and all 8 Australian jurisdictions, Years 9–13, four strands |

They must become one model before any game or filter reads either of them. Otherwise every game
would be tagged twice, and the two tags would drift apart.

---

## 1. Recommendation in one paragraph

**The curriculum map is the single curriculum model.**
- The framework's skill ids (O/K/T/G) are retired as curriculum tags. Every one of them maps onto
  canonical concepts (§2), and a few new canonical ids are added where the German and
  Australian research shows a real split (§2.3).
- Germany and Australia join the map as **sub-national jurisdiction records**, using ISO 3166-2
  codes such as `DE-BY` and `AU-VIC` (§3). They are not added as single countries, because each
  state is its own school system.
- The framework keeps only what is not about curricula:
  - the misconception list, re-keyed to canonical concepts
  - per-game learning objectives, which sit below a concept and live in each game's brief
  - the vocabulary stage, which becomes a query over the map instead of a stored flag (§4)
- The player profile and the database follow the map's migration plan, renamed from *country*
  to *jurisdiction* (§5).

---

## 2. Crosswalk: framework skill ids → canonical concepts

"=" means the canonical concept covers exactly this. "⊂" means the skill is part of a broader
concept. "new" means a proposed new canonical id (§2.3).

### 2.1 Core skills (from `germany-sek2-overview.md` §3 and the framework §2.2)

| Skill | Framework meaning | Canonical concept(s) | Fit |
|---|---|---|---|
| O1 | homologous series | `homologous-series` | = |
| O2 | naming branched alkanes | `organic-nomenclature` (+ `hydrocarbons`) | ⊂ |
| O3 | functional groups + suffixes | `functional-groups` + `organic-nomenclature` | = (two concepts) |
| O4 | formula types | `structural-formulas` (skill) | = |
| O5 | constitutional isomers; IMF → boiling point, solubility | `isomerism` + `intermolecular-forces` | = (two concepts) |
| O6 | 1°/2°/3° alcohol oxidation | `oxygen-organics` (+ `oxidation-states` for the Bavarian oxidation-number work) | ⊂ |
| O7 | radical substitution, electrophilic addition | `organic-reaction-types` (products only, as in Australia) or `reaction-mechanisms` (curly arrows, as in Germany) | split by depth, see note 1 |
| O8 | E/Z (cis/trans) isomerism | `stereoisomerism` → **new `geometric-isomerism`** | §2.3 |
| O9 | functional-group tests | **new `functional-group-tests`** | §2.3 |
| O10 | esterification / hydrolysis (+ mechanism) | `oxygen-organics`; the Bavarian mechanism also `reaction-mechanisms` | ⊂ |
| K1 | rate from data | `measuring-rate` (+ skill `graphs-and-data`) | = |
| K2 | factors affecting rate | `rate-factors` | = |
| K3 | collision theory | `collision-theory` | = |
| K4 | energy profile, Ea vs ΔH | `reaction-profiles` | = |
| K5 | catalysts | `catalysts` | = |
| K6 | rate experiments | `measuring-rate` + skill `scientific-method` | ⊂ |
| K7 | Maxwell–Boltzmann | `maxwell-boltzmann` | = |
| (rate law) | order, k, Arrhenius | `rate-laws` | = |
| T1 | exo/endo, sign of ΔH | `exo-endothermic` | = |
| T2 | open/closed/isolated systems | none; folded into `exo-endothermic` and `reversible-reactions` | see note 2 |
| T3 | first law, enthalpy | `enthalpy-calorimetry` | ⊂ |
| T4 | calorimetry | `enthalpy-calorimetry` | ⊂ |
| T5 | Hess's law | `hess-law` | = |
| T6 | ΔrH° from ΔfH° | `hess-law` (its scope already includes formation enthalpies) | ⊂ |
| T7 | enthalpy diagrams | `reaction-profiles` | ⊂ |
| T8 | bond enthalpies | `bond-energies` | = |
| T9 | entropy, Gibbs (qualitative) | `entropy-gibbs` at depth `develop` | depth |
| T10 | Gibbs (quantitative) | `entropy-gibbs` at depth `extend` | depth |
| G1 | dynamic equilibrium | `reversible-reactions` | = |
| G2 | K expression / calculation | `equilibrium-constant` | = |
| G3 | Le Chatelier | `le-chatelier` | = |
| G4 | catalyst does not shift equilibrium | `catalysts` + `le-chatelier` | a misconception, not a concept (§4.1) |
| G5 | industrial compromise | `industrial-processes` | = |

### 2.2 Extra skills (from `australia-overview.md` §4)

| Skill | Meaning | Canonical concept(s) |
|---|---|---|
| O11 | reaction pathways / synthesis flow charts | `reaction-pathways` |
| O12 | percentage yield | `yield-and-atom-economy` |
| O13 | atom economy, green chemistry | `yield-and-atom-economy` + `resources-sustainability` |
| O14 | addition and condensation polymers | `addition-polymerisation`, `condensation-polymerisation` |
| O15 | IR and mass spectrometry | `ir-nmr-ms` |
| O16 | ¹H and ¹³C NMR | `ir-nmr-ms` (split deferred, §3.5) |
| O17 | chromatography | `chromatography` |
| O18 | chirality / optical isomers | **new `optical-isomerism`** (§2.3) |
| O19 | biomolecules | `carbohydrates`, `lipids`, `amino-acids-proteins` |
| O20 | haloalkane substitution, Markovnikov, elimination | `organic-reaction-types` (note per jurisdiction) |
| O21 | biofuels: fermentation, hydration, transesterification | `fuels-energy` + `oxygen-organics` |
| T11 | fuels: energy content, complete vs incomplete combustion | `fuels-energy` + `combustion` |
| T12 | food energy | `food-molecules` (note: Victoria only) |
| T13 | energy transformation efficiency | `fuels-energy` |
| T14 | enthalpy of solution | `exo-endothermic` |

**Notes:**
1. **O7 depends on depth.** In Germany, radical substitution and electrophilic addition are
   taught *with mechanisms* at gA (Bavaria 12 LB5). In Australia they are taught as reaction
   types with products and conditions, never with curly arrows. The map's two ids already
   separate exactly this, so Bavaria places both and Australian states place only
   `organic-reaction-types`.
2. **T2 has no concept of its own.** No curriculum researched places "systems" separately from
   the topic it serves. Under the map's granularity rule (an id only where some country places
   it differently from its neighbours), it does not earn an id.

### 2.3 Proposed new canonical ids

The map's rule for new ids is: add one when a second country turns up, or when a game or cheat
sheet needs one (`CROSS_COUNTRY_MAP.md`, "What the canonical list leaves out"). Three pass that
test.

| New id | Area | Scope | Why it passes |
|---|---|---|---|
| `functional-group-tests` | analytical | Bromine water, acidified dichromate/permanganate, carbonate, Tollens, Fehling, Schiff, 2,4-DNP: identifying organic families by their reactions. | Placed by Bavaria (10 LB5, 12 LB3), every Australian state (tests differ by state), England (A level). The map has only `ion-tests`. Reagent Bench (framework G4) targets it directly. |
| `geometric-isomerism` | organic | cis/trans and E/Z isomers of alkenes. | **Split from `stereoisomerism`.** Bavaria places E/Z in Jgst. 10 but chirality in NTG 11 / eA 13. Victoria and Queensland place both in Year 12. WA and NSW (2028) have cis/trans without chirality. The map already needs the split: Israel places cis/trans in Year 11 and optical isomers in Year 12 under the one id. One id cannot hold those placements. |
| `optical-isomerism` | organic | Chiral centres, enantiomers, optical activity; Fischer projections and D/L; R/S at the extended level. | The other half of the same split. |

> **Decided 2026-09-24 (Stella): split `stereoisomerism`.** Adopted as recommended. Keep the id
> `stereoisomerism` as a parent (the map has no parent field yet, so as a documented umbrella
> with no placements of its own), and move the existing placements to the two new ids. Five
> country files place it:
> - three say which half they mean: England "E/Z isomerism", Spain "cis–trans", and Israel,
>   which has one of each
> - two need their reports re-read to decide: Italy, and Argentina's CABA placement
>
> This is the only change that touches existing country data. Ids are "permanent once referenced
> from the database", and nothing references this one yet, so now is the cheapest time.

---

## 3. Germany and Australia as jurisdictions

### 3.1 Why not one record per country

The map models sub-national variation as a **track** in two places: `caba` in Argentina and `tx`
(Texas) in the US. That works because each country has a national main route and one region
deviates from it. It does not work for Germany or Australia:

- **There is no national main route in the senior years.**
  - In Germany the KMK standards set only the Abitur end-state, with no year placements.
  - In Australia each state writes and examines its own senior course.
- **Placement differs on the main route itself, not just for a subset of students.** Kinetics
  and energetics are Year 11 in NSW, Queensland, WA and ACT, but Year 12 in Victoria, SA/NT and
  Tasmania.
- **Tracks would have to combine two axes.** Bavaria needs state × NTG × gA/eA. Tracks already
  strain at two axes (England's `separate-higher`).
- **A single `AU` record would be wrong for most students.** The map's §6.4 step 3 proposed
  "AU = Victorian Curriculum 2.0 + VCE". That describes about a quarter of Australian students.
  A NSW student would get Victorian placements.

### 3.2 Proposal: ISO 3166-2 jurisdiction codes

Extend the map's key from `CountryCode` to `JurisdictionCode`. The ten existing countries stay
as they are; `AU` and `DE` enter only through their subdivisions.

```ts
// src/core-engine/types/curriculum.ts (proposed)
export type CountryCode = 'AR' | 'AU' | 'DE' | 'ES' | 'FR' | 'GB' | 'IL' | 'IT' | 'MX' | 'RU' | 'UA' | 'US';
export type JurisdictionCode =
  | Exclude<CountryCode, 'AU' | 'DE'>                     // national records, as today
  | 'AU-VIC' | 'AU-NSW' | 'AU-QLD' | 'AU-WA' | 'AU-SA' | 'AU-TAS' | 'AU-ACT'
  | 'DE-BY';                                              // more Länder when researched

export interface CountryCurriculum {          // rename to JurisdictionCurriculum in the same change
  code: JurisdictionCode;
  country: CountryCode;                       // for grouping and for the profile's country picker
  alsoCovers?: readonly JurisdictionCode[];   // AU-SA also covers the Northern Territory (SACE / NTCET)
  coveredAreas?: readonly CurriculumArea[];   // absent = all areas; see §3.4
  // …everything else unchanged
}
```

- **The Northern Territory** uses SACE for the senior years, and the Australian Curriculum for
  Years 7–10 as SA does. It needs no record of its own: `AU-SA` with
  `alsoCovers: ['AU-NT']`. That also needs `'AU-NT'` in the union.
- **The Years 7–10 records:**
  - QLD, SA, TAS and ACT use the national Australian Curriculum v9 directly. Their Years 7–10
    placements come from one shared constant, `AC9_YEARS_7_10`, built from
    [`countries/australia-curriculum-v9-7-10.md`](./countries/australia-curriculum-v9-7-10.md)
    and spread into each record.
  - VIC (Victorian Curriculum 2.0), NSW (Science 7–10, 2023) and WA (its v9 version) use their
    own adaptations.
- **Year numbering needs no change.** Germany (Klasse 1 = first school year) and Australia (Year 1
  after Foundation) already follow the map's rule. Local labels are "Jgst. 10" / "10. Klasse" and
  "Year 10"; Tasmania's senior courses are labelled by course level, not year.

### 3.3 Tracks and depth for the new records

| Jurisdiction | Tracks | How the framework's levels map |
|---|---|---|
| `DE-BY` | `ntg` (science track: chemistry from Jgst. 8, one year ahead in 8–10, chemistry in Jgst. 11); `ga` and `ea` (Oberstufe chemistry, Jgst. 12–13) | core at gA → track `ga`, depth `develop`. eA only → track `ea`, depth `extend`. Non-NTG Jgst. 11 has delivery `none`. |
| `AU-*` | `chemistry` (the senior Chemistry subject: VCE, HSC, QCE, WACE ATAR, SACE, TASC, BSSS). WA adds `general` (Chemistry General). TAS adds `physical-sciences` (Level 3, where hydrocarbon naming sits). | Years 11–12 placements carry `chemistry`, because senior chemistry is an elective, as England's `a-level` is. Years 7–10 are the main route. |

**Status values:**
- NSW's 2025 syllabus becomes `planned` placements (first taught 2028). The map already models
  reforms this way.
- SA Stage 1 topics that the school chooses become `typical`, with a note.
- Anything marked "(unverified)" in the research becomes `unverified`.

### 3.4 A coverage field, because the research is partial

The German and Australian research covers four areas in depth: organic, kinetics, energetics and
equilibrium. It lists other units by title only. The map's rule is that "absence of a concept
means the national documents … do not include it". A partial record would therefore claim that
Victoria does not teach acids, bonding or the mole. That is false, and `conceptsInYear` would
report it as fact.

Add `coveredAreas` (above). Queries treat a concept in an uncovered area as *unknown*, not
*absent*. A test asserts that a record without `coveredAreas` places concepts in at least 20
areas, which catches a partial record that forgot to declare itself.

> **Decided 2026-09-24 (Stella): add partial records now, then complete `AU-VIC` first.** The options were:
> - **(a)** Add the eight records now with `coveredAreas` = organic, kinetics, energetics,
>   equilibrium (+ `polymers-materials`, `analytical`, `biochemistry` where the research covered
>   them). Complete them later.
> - **(b)** Run one more research pass per jurisdiction for the other areas first. This is the
>   "one more research pass" that step 3 of the map already expects.
>
> Recommendation: (a) for `DE-BY` and all `AU-*` now, then (b) for **`AU-VIC` first**. It is
> the site's current tag set, and step 3 of the migration (deriving `YearLevel` from the map)
> needs a complete Victorian record.

### 3.5 Year 13

Bavaria's Jgst. 13 holds acid–base equilibria, polymers, dyes and eA chirality. England's Year 13
and Italy's 5º anno are also real chemistry years. Today they sit in `outsideRange` as free text.

> **Decided 2026-09-24 (Stella): extend `SchoolYear` to 13.** Three of eleven systems
> now have a chemistry Year 13. Free text cannot be queried, and a Bavarian eA student would
> otherwise have no year for half of their Oberstufe content. The map's tests check years
> against each record's `years`, so the change is contained.
>
> **Decided 2026-09-24 (Stella): split `ir-nmr-ms` only when a spectroscopy game is briefed.** NMR is placed separately from IR/MS in Victoria and NSW
> (NMR) versus Queensland, Tasmania and ACT (IR and MS only). The same is true of England's A
> level (NMR in Year 13). Recommendation: split into `ir-ms` and `nmr` only when a spectroscopy
> game is briefed. Until then, a note on each placement is enough.

---

## 4. What the framework keeps, and in what form

### 4.1 Misconceptions: kept, re-keyed

M1–M35 (`germany-sek2-overview.md` §4) describe content, not curricula. They stay as their own
registry:

```ts
// src/core-engine/data/misconceptions.ts (proposed; framework OF1)
export interface Misconception {
  id: `M${number}`;
  concepts: readonly ConceptId[];       // was: SkillId[]. M1 → ['catalysts', 'le-chatelier']
  statement: string;                    // English working text; player-facing copy lives in catalogues
  source: 'V' | 'L' | 'U';              // verified / literature / practitioner, as in the research
  jurisdictionNote?: string;            // e.g. M16 "entropy = disorder" is taught in Hessen
}
```

### 4.2 Learning objectives: below a concept, owned by the game

The framework used skill ids for two things: curriculum placement (now the map's job) and
per-round feedback such as "Lowest locants: 5/5" (OF8). The second needs finer grain than any
curriculum places; no country places "the lowest-locant rule" apart from naming. So:

- **Each game brief defines objectives**, for example `chain-namer:longest-chain` and
  `chain-namer:lowest-locants`. Each objective is linked to one canonical concept.
- **Game levels are tagged with `conceptIds`.** This is exactly the map's migration step 2
  (`conceptIds: ConceptId[]` on `GameTopic`). The hub, the filters and the teacher page read
  concepts; only the end-of-game summary reads objectives.
- **The O/K/T/G ids stay only in the research documents**, as the column labels of their §3
  tables. Those documents get a line pointing at this crosswalk. No code uses them.

### 4.3 Vocabulary stage: derived, not stored

The framework's `vocabStage` (Bavarian *Reaktionsenergie* before Jgst. 12, *Reaktionsenthalpie*
from Jgst. 12) becomes a query:

```ts
const usesEnthalpy = (profile) =>
  (firstYear(profile.jurisdiction, 'enthalpy-calorimetry', { track: profile.track }) ?? Infinity) <= profile.year;
```

For `DE-BY` this gives Jgst. 12. For Victoria it gives Year 12 (Unit 3), and for NSW Year 11
(Module 4). The same rule serves English ("energy change" vs "enthalpy change"), and it needs
no hand-kept per-curriculum flag.

### 4.4 Framework sections that change

| Framework section | Change |
|---|---|
| OF1 Curriculum layer | Rewritten: the map is the curriculum layer. `CurriculumId`, `CurriculumAnchor`, `Skill` and `SkillId` are dropped. What remains is the misconception registry, objectives per game, and the derived vocabulary stage. |
| §2.2 skill tables | Kept as the research summary, with canonical ids added beside the skill ids. |
| OF8 progress by skill | Becomes progress by concept (reportable to teachers) plus objectives (in-game only). The privacy question is unchanged. |
| §8 `YearLevel` row | Follows the map's migration steps 2–7 instead of "unchanged". |
| Game catalogue (§4) | Each game's "Skills" column becomes canonical concepts. There is no change to the games themselves. |

---

## 5. Player profile and database

The framework proposed a device-only profile (Bundesland · Zweig · Kurs). Step 5 of the map
proposed `profiles.curriculum_country` + `profiles.school_year` in the database. Merged:

- **One shape everywhere:** `{ jurisdiction: JurisdictionCode; year: SchoolYear; track?: string }`.
  - The picker asks for the country, then the state or Land where the country has jurisdictions,
    then the year, then the track where the jurisdiction has tracks for that year. For Bavaria
    that means NTG from Jgst. 8 and gA/eA from Jgst. 12.
  - For Australia, the picker should never offer a bare "Australia" when the state is unknown.
- **Device first:** stored with `useStoredValue`, as the framework proposed. This needs no new
  personal data and works signed out.
- **Database later, as step 5 of the map, with one rename:** `profiles.curriculum_jurisdiction`
  (check-constrained to `JurisdictionCode`) instead of `curriculum_country`, plus
  `school_year` and `curriculum_track`. The same privacy rules apply as for `country`.

> **Decided 2026-09-24 (Stella): agreed, device first, database copy later.** It overrides both earlier proposals in two small
> ways: "jurisdiction" replaces "country" in the map, and the framework's device-only profile
> gains an optional account copy. Recommendation: yes, with the database copy deferred until a
> feature needs it across devices (for example a teacher dashboard).

### 5.1 Performance

Measured 2026-09-24: the whole map today (160 concepts, 10 countries, query code) is about
150 KB of source, or about 32 KB gzipped including comments. One country file is about 3 KB
gzipped. The eight new records would add roughly 25 KB gzipped of source. Nothing reads the map
yet, so its current runtime cost is zero. It stays small if two rules are kept when features
start using it:

- **A page loads one jurisdiction, not the registry.** Resolve placements in a server component,
  or dynamically import only the student's record. Never import `COUNTRY_CURRICULA` into a client
  component.
- **`scope` and `title` in `concepts.ts` are editor text.** Keep them out of client bundles; a page
  needs only ids.

Queries filter a handful of placements per concept, so they cost microseconds and can be
memoised per page. The device profile is one browser-storage read, like the existing game
settings. The later account copy is extra columns on a profile row the site already reads, so it
adds no request.

---

## 6. Changes this would make (after approval)

In order; each step ships alone.

1. **Types and ids.**
   - Add `JurisdictionCode`, `country`, `alsoCovers` and `coveredAreas` to
     `types/curriculum.ts`.
   - Extend `SchoolYear` to 13.
   - Add `functional-group-tests`, `geometric-isomerism` and `optical-isomerism` to
     `concepts.ts`.
   - Move the five countries' `stereoisomerism` placements to the new ids (Italy and Argentina
     after re-reading their reports).
   - Update `curriculum-map.test.ts` for the new fields: the partial-coverage rule, `alsoCovers`
     codes that are valid, and every new id placed.
2. **Records.**
   - Add `countries/de-by.ts`, the shared constant `au-ac9-7-10.ts`, and `au-vic.ts`, `au-nsw.ts`,
     `au-qld.ts`, `au-wa.ts`, `au-sa.ts`, `au-tas.ts` and `au-act.ts`, built from the research
     documents' §3 tables through this crosswalk.
   - Each record gets `reviewedByTeacher: false` and a `recheckBy` date.
   - Early re-check dates: NSW before Term 1 2028; WA in 2027 for the Year 12 refresh.
3. **Docs.**
   - Move the German and Australian research documents into `countries/` next to the other ten
     (`countries/germany-bavaria.md`, `countries/australia-victoria.md`, …) and fix the links.
   - Add a pointer line to this crosswalk in each research document's §3.
   - Update `CROSS_COUNTRY_MAP.md` (§6.4 step 3 now points here; the country count and tables
     gain the new rows).
   - Rewrite framework OF1 and §8 as in §4.4.
4. **Framework data.** When framework phase P1 starts, add `data/misconceptions.ts` keyed to
   concepts. There is no `skills.ts`.

### 6.1 What was implemented (2026-09-25), and where it differs

- **Types** (`types/curriculum.ts`): `SchoolYear` 7–13, `CountryCode` with `AU` and `DE`,
  `JurisdictionCode` (including `AU-NT`, `DE-BW`, `DE-RP`), `JurisdictionCurriculum` with
  `country`, `alsoCovers` and `coveredAreas`. The registry is `CURRICULA` / `JURISDICTION_CODES`,
  with `curriculumFor()` resolving `AU-NT` to `AU-SA` and `isKnown()` for partial records;
  `firstYear()` returns `'unknown'` where a record has not been researched.
- **Concepts:** `functional-group-tests`, `geometric-isomerism`, `optical-isomerism` added.
  **Differs:** `stereoisomerism` was removed rather than kept as an umbrella. Nothing referenced
  it, the map has no parent field, and an id with no placements would fail the "placed by at
  least one jurisdiction" test. Its five placements moved: England, Spain → geometric; Israel →
  both; Italy (technical CMB: "E/Z and R/S") → both; Argentina (CABA "chirality", PBA Fischer
  projections) → optical.
- **Year 13:** every existing record has a Year 13 row (`no-such-year` except England and Italy).
  England's and Italy's Year 13 content is still text in `outsideRange`, not yet placed.
- **Coverage rule. Differs:** a placement always counts as known, even outside `coveredAreas`.
  Bavaria's organic naming sits in the map's `nomenclature` area and its functional-group tests in
  `analytical`; forbidding those placements would have thrown away researched facts. Only the
  *absence* of a placement outside the covered areas means "unknown".
- **Records:** `de-by.ts`, `au-common.ts` (Australian year rows and the Years 7–10 v9 placements),
  `au-vic.ts`, `au-nsw.ts`, `au-qld.ts`, `au-wa.ts`, `au-sa.ts` (covers `AU-NT`), `au-tas.ts`,
  `au-act.ts`. Bavaria models NTG as a track on top of the non-NTG main route, and places content
  common to gA and eA once per course.
- **Tests:** 190 in `curriculum-map.test.ts` (was 67), including coverage, `alsoCovers`, country
  codes and the new queries.
- **Docs:** the per-jurisdiction research documents moved to `countries/` and every link was
  rewritten; each §3 table points at its record.
- **Not yet done:** framework OF1 rewrite is limited to a pointer (§4.4); `AU-VIC` still needs the
  full-area pass; England's and Italy's Year 13 content is not placed.

Steps 1–3 touch only reference data that nothing in the app reads yet (map step 1), so there is
no user-visible change and no migration risk. Per [`../TESTING.md`](../TESTING.md), the map's
tests run whenever its data is edited.

---

## 7. Decisions

**Made on 2026-09-24 and 2026-09-25:**
1. Split `stereoisomerism` into `geometric-isomerism` and `optical-isomerism`. (§2.3)
2. Add partial jurisdiction records now with `coveredAreas`, then complete `AU-VIC` next. (§3.4)
3. (a) Extend `SchoolYear` to 13. (b) Split `ir-nmr-ms` only when a spectroscopy game is
   briefed. (§3.5)
4. The merged player profile: jurisdiction · year · track; device first, database copy later,
   only when a feature needs it across devices, after the privacy review. (§5)
5. Other German Länder: add **Baden-Württemberg (`DE-BW`)** and **Rheinland-Pfalz (`DE-RP`)**
   next, because Stella knows teachers there who can review them. BW has partial research in
   `germany-sek2-overview.md`; RP has none yet, so both get a research pass in the Bavarian
   document's shape first. NRW, Niedersachsen, Berlin/Brandenburg and Hessen wait until a teacher
   from that Land is involved. (Decided 2026-09-25. Done the same day: `de-bw.ts` and `de-rp.ts`,
   from [`countries/germany-baden-wuerttemberg.md`](./countries/germany-baden-wuerttemberg.md) and
   [`countries/germany-rheinland-pfalz.md`](./countries/germany-rheinland-pfalz.md), both researched
   across every area except nuclear.)
