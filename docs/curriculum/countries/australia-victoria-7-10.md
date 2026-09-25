# Victoria, Years 7–10: Victorian Curriculum F–10 Version 2.0 Science, full-area placement

**Purpose:** a full-area placement of Victoria's Years 7–10 chemistry for the curriculum map
(`src/core-engine/data/curriculum/countries/au-vic.ts`), so that the site's Victorian year tags
(`YearLevel` in cheat sheets and games) can be derived from the map rather than typed by hand.
It complements `docs/curriculum/countries/australia-victoria.md`, whose Levels 7–10 coverage
was limited to organic chemistry, kinetics, energetics and equilibrium. VCE Chemistry
(Years 11–12) is being researched separately.
**Research date:** 25 Sept 2026 (desk research by an agent, from primary sources).
**Review status:** not checked by a teacher who teaches Years 7–10 science in Victoria.

**Method:** every Levels 7–8 and Levels 9–10 content description and elaboration (all strands and
sub-strands) was extracted from the page data of the official VCAA F–10 site, not from search
snippets. The year split inside each band comes from VCAA's own two example curriculum area
plans for secondary Science, published 20 Aug 2026. The Victorian Curriculum 1.0 codes were read
from the 1.0 site so that outdated references on chem-games can be matched to 2.0.

## What this means for chem-games

- **Years 7–10 chemistry in Version 2.0 is narrow.** It covers:
  - Levels 7–8: the particle model, mixtures and separation, elements, compounds and
    formulas as representations, physical vs chemical change with gas tests, and resources.
  - Levels 9–10: atoms and radioactivity, the periodic table, conservation of mass with simple
    balanced equations, reaction types with exo/endo and rate factors, and the carbon cycle
    and climate.
- **Topics with no Version 2.0 content description in Years 7–10:**
  - no bonding of any kind: ionic, covalent, metallic, Lewis structures or shapes
  - no ions or ionic formulas, polyatomic ions, or naming of compounds
  - no relative formula mass, moles or concentration calculations
  - acids and bases only in elaborations: no pH, no acid–base theory
  - no activation energy, energy profiles or collision theory
  - no equilibrium and no organic chemistry
- **Six of the site's eleven non-Senior cheat sheets teach content that has no Version 2.0
  home in Years 7–10:**
  - acids-and-bases, chemical-bonds, chemical-formulas, polyatomic-ions and naming-compounds are
    VCE Unit 1–2 content tagged Year 9 or 10
  - relative-formula-mass already says so honestly
  - Two games inherit the problem: Formula Blaster (Year 10) and Share to Fill / lewis-structures
    (Year 10).
- **states-of-matter is in the wrong band.** It is tagged Year 9, but its content is
  VC2S8U05 (Levels 7–8). Both VCAA example plans teach it in **Year 7**. The site has no
  Year 7 or Year 8 content even though `YearLevel` allows both.
- **The two VCAA example plans agree on some single years and disagree on others:**
  - They agree: atoms and radioactivity (VC2S10U06) in **Year 9**; reaction types, exo/endo and
    rates (VC2S10U09) in **Year 10**.
  - They disagree on the periodic table (VC2S10U07): Year 10 in one plan, Year 9 in the other.
  - The site tags atomic-structure (VC2S10U07) Year 9 and isotopes (VC2S10U06) Year 10. Both
    tags are inside the band. The isotopes tag is the opposite of both VCAA plans, which teach
    VC2S10U06 in Year 9.
- **Most curriculum references on the site are free text.** Seven sheets cite "Victorian
  Curriculum Science Level 10" with no code. That is the Version 1.0 way of referring to it:
  1.0 content was also banded 9–10, so there was never a "Level 10" content list. Only
  atomic-structure and isotopes cite Version 2.0 codes, and both codes are correct.

---

## 1. What applies in 2026

- **Version 2.0 Science is mandatory in Victorian government schools from 2026.** The
  Department of Education policy (last updated 20 April 2026) lists Science among the areas
  where "full implementation is required from 2026". English and Mathematics were required
  from 2025.
- **Sector timing:** VCAA says the Department and the Victorian Catholic Education Authority
  decide when their schools implement revised areas, and "independent schools are responsible
  for their own implementation timelines". The Catholic sector's Science date was not checked
  **(unverified)**.
- **Version 1.0:** VCAA's Version 2.0 page gives no single retirement date for Version 1.0 as
  a whole. The 1.0 site (victoriancurriculum.vcaa.vic.edu.au) is still online. For government
  schools in 2026, 2.0 Science is the curriculum.
- **Relation to the Australian Curriculum:** Version 2.0 is Victoria's adaptation of ACARA
  v9.0 (see australia-victoria.md §0).
- **Support material:**
  - VCAA published Science curriculum planning examples for secondary on 20 Aug 2026:
    - a curriculum area map for Levels 9–10
    - two curriculum area plans for Years 7–10
    - a teaching and learning unit and an assessment task for Levels 9–10
  - The Department publishes Victorian Lesson Plans (VLPs) for Science on its Arc platform,
    and funds Stile and Education Perfect: Science for Levels 7–10.

## 2. Structure

- **Levels and bands:**
  - Levels map to year levels (Level 7 = Year 7), in two-year bands: **Levels 7 and 8** and
    **Levels 9 and 10**.
  - Each band has one set of content descriptions and one achievement standard ("by the end
    of Level 8 / Level 10").
  - There is no separate Year 7, 8, 9 or 10 list. Codes run VC2S8… for the 7–8 band and
    VC2S10… for the 9–10 band.
- **Strands (per band):**
  - **Science Understanding (U)**, in four sub-strands: biological, chemical, Earth and space,
    and physical sciences. Each band has U01–U17.
  - **Science as a Human Endeavour (H):** H01–H04.
  - **Science Inquiry (I):** I01–I08.
  - Content descriptions are stems ("Students learn that: …"). Elaborations are optional
    illustrations.
- **Delivery:** Science is **one integrated subject** in Years 7–10. Chemistry is the chemical
  sciences sub-strand (four content descriptions per band), plus chemistry-flavoured Earth and
  space and inquiry content. In the VCAA example plans, each year runs about 9–11 units
  across all four sub-strands, of which 1–3 are chemistry.
- **Hours:**
  - Not mandated. The Department policy says time allocations are not mandated outside
    Mathematics (about 200 min a week in Years 7–10) and English.
  - The VCAA example plans lay units out over 18-week semesters but give no weekly hours.
  - Typical school practice (often 3–4 periods a week) **(unverified)**.
- **Assessment:** school-based. There is no external exam in Years 7–10. NAPLAN does not
  test Science.

---

## 3. Content by band (chemistry-relevant content descriptions)

Paraphrased; the codes are verbatim. "El." marks content that appears only in elaborations.

### 3.1 Levels 7 and 8

**Chemical sciences**
- **VC2S8U05:** the particle and kinetic theories of matter describe the arrangement and
  motion of particles, including the attraction between them. They explain melting point,
  boiling point, density, compressibility, gas pressure, viscosity, diffusion, sublimation and
  expansion and contraction.
  - El.: state-change models; comparing attractive forces in solid, liquid and gas.
  - El.: how heat absorbed or released changes particle motion.
  - El.: a density column.
- **VC2S8U06:** pure substances (elements, compounds) vs impure substances (mixtures,
  including solutions), modelled with the particle model. Homogeneous vs heterogeneous
  mixtures. Separation by filtration, decantation, evaporation, crystallisation, magnetic
  separation, distillation and chromatography.
  - El.: dilute, concentrated, saturated and supersaturated solutions.
  - El.: paper chromatography of inks or dyes.
  - El.: First Peoples' separation techniques, including steam distilling.
  - El.: water purification; separating crude oil into its components.
- **VC2S8U07:** atomic theory explains the difference between elements, compounds and
  mixtures. They can be shown as 2D and 3D models, elements as symbols, and molecules and
  compounds as chemical formulas.
  - El.: Mendeleev's first periodic table compared with today's.
  - El.: why mixtures are given as percentages.
  - El.: solutions, suspensions and colloids.
- **VC2S8U08:** physical vs chemical change. A chemical change is identified by a colour
  change, a temperature change, a gas (with laboratory preparation and testing of O₂, CO₂
  and H₂) or a precipitate.
  - El.: identifying "mystery powders" with iodine solution, vinegar, water and universal
    indicator.

**Earth and space sciences**
- **VC2S8U09:** renewable vs non-renewable resources. The benefits and risks of resource
  extraction and energy production.
  - El.: hydrogen-powered vehicles; desalination; depletion of fossil fuels.
- VC2S8U11 (the rock cycle, mining of ores and minerals): geology, not placed as chemistry.

**Physical sciences**
- **VC2S8U15:** forms of energy (thermal, chemical…). Conduction, convection and radiation.
  Energy efficiency.
- VC2S8U16: household energy audit.

**Science as a Human Endeavour**
- **VC2S8H01:** models change with new evidence. El.: different forms of the periodic table.
- **VC2S8H02:** multidisciplinary endeavours and worldviews. El.: rapid chemical tests for
  drugs in sport.
- **VC2S8H03:** responses to socio-scientific issues. El.: gas warfare and the Chemical
  Weapons Convention; biodegradable packaging.
- **VC2S8H04:** science communication. El.: separating household waste, recycling, promoting
  biodegradable materials.

**Science Inquiry**
- **VC2S8I01:** questions, predictions and hypotheses. El.: a balloon's volume as it is heated
  and cooled.
- **VC2S8I02:** reproducible investigations; variables; managing risk. El.: the fire triangle
  and safe practice with heat.
- **VC2S8I03:** equipment and precision. El.: reading the meniscus; units, signs and
  exponential notation.
- **VC2S8I04:** representations. El.: symbolic representations of chemical and physical
  changes.
- **VC2S8I05:** patterns and anomalies. El.: temperature changes from reacting different
  proportions of chemicals.
- **VC2S8I06:** assumptions, sources of error.
- **VC2S8I07:** evidence-based arguments.
- **VC2S8I08:** communicating.

**Achievement standard, chemistry sentences (end of Level 8):**
- use particle and kinetic theories to explain substances
- distinguish pure substances and mixtures, and design separations
- classify and represent matter as elements, compounds or mixtures
- distinguish physical and chemical changes
- distinguish renewable and non-renewable resources

### 3.2 Levels 9 and 10

**Chemical sciences**
- **VC2S10U06:** the model of the atom changed with the discovery of electrons, protons and
  neutrons. Natural radioactive decay turns unstable atoms into stable ones.
  - El.: masses and charges of the three particles.
  - El.: isotopes as atoms with different neutron numbers.
  - El.: decay "in simple terms": Rn-222 α, I-131 β, Co-60 γ.
  - El.: defining half-life (C-14, U-238); decay simulations.
  - El.: radiocarbon and optically stimulated luminescence dating (at least 65,000 years).
  - El.: medical and industrial uses.
- **VC2S10U07:** the organisation of the periodic table relates to the structure and
  properties of atoms. Patterns and trends: rows and periods, metallic and non-metallic
  properties, atomic size and reactivity.
  - El.: groups and periods.
  - El.: reacting elements with oxygen, water and acids to see group similarity.
  - El.: physical properties of metals and non-metals.
  - El.: the Bohr model and electron shells; outer-shell patterns.
  - El.: flame tests and emission spectra.
- **VC2S10U08:** chemical reactions obey the Law of Conservation of Mass and rearrange atoms.
  They are modelled with representations including word and *simple* balanced equations.
  - El.: reactants and products; closed vs open systems.
  - El.: symbol equations "that are easy to balance".
  - El.: why most elements are not found uncombined.
  - El.: green chemistry principles.
- **VC2S10U09:** reactions include synthesis, decomposition and displacement, and are
  exothermic or endothermic. Rates depend on temperature, concentration, surface area of solid
  reactants, and catalysts.
  - El.: predicting products.
  - El.: synthesis: metals + oxygen, water, sodium chloride.
  - El.: decomposition to extract metals.
  - El.: displacement **such as metal and acid, neutralisation and precipitation** (VCAA's
    broad use of "displacement").
  - El.: hot and cold packs.
  - El.: First Peoples' fermentation to ethanol, pyrolysis to charcoal, calcination to
    plaster and pigments, and cycad detoxification (a rate context).

**Earth and space sciences**
- **VC2S10U10:** the carbon cycle: photosynthesis, respiration, fire, weathering, vulcanism,
  **combustion of fossil fuels**, and how they change Earth's four systems.
  - El.: the greenhouse effect.
  - El.: carbon capture and storage.
  - El.: pesticides leaching into waterways.
- **VC2S10U11:** modelling climate change; mitigation through power generation, manufacturing,
  transport, food and consumption. El.: carbon footprint.
- VC2S10U13 (the universe): El. uses stellar spectra to identify elements (context only).

**Physical sciences (energy, used for skills and applied rows)**
- **VC2S10U14:** wave and particle models of energy transfer (conduction, convection,
  radiation). El.: particle-model explanation of conduction and convection.
- **VC2S10U15:** conservation of energy and efficiency. El.: efficiency of electricity from
  coal, gas and other sources.
- **VC2S10U16:** AC and DC generation, including combustion of oil, gas and coal, nuclear
  power, photovoltaic cells and batteries. El.: fission vs fusion.

**Science as a Human Endeavour**
- **VC2S10H01:** knowledge is contestable and refined.
  - El.: the Curies' new elements.
  - El.: how the periodic table has been disputed and refined.
- **VC2S10H02:** technology and science advance each other.
  - El.: modelling atmospheric pollution.
  - El.: lighter, stronger alloys.
- **VC2S10H03:** socio-scientific issues and a sustainable future.
- **VC2S10H04:** society's values steer research. El.: why manufacturers adopt green
  chemistry.

**Science Inquiry**
- **VC2S10I01:** El.: how surface area, concentration and temperature affect rate.
- **VC2S10I02:** valid, reproducible, safe investigations. El.: hazards of chemicals in
  reaction experiments.
- **VC2S10I03:** precision and sample size.
  - El.: uncertainty when reading between scale marks.
  - El.: the number of trials for the effect of temperature on the Zn + dilute H₂SO₄ rate.
- **VC2S10I04:** representations, including descriptive statistics.
  - El.: phenolphthalein and Na₂CO₃ to model disease spread.
  - El.: comparing molecular models with word and balanced equations.
- **VC2S10I05:** El.: half-life data; periodic-table patterns vs graphs of melting and
  boiling points.
- **VC2S10I06:** evaluating validity. El.: random vs systematic errors.
- **VC2S10I07:** arguments.
- **VC2S10I08:** communicating.

**Achievement standard, chemistry sentences (end of Level 10):**
- explain how ideas about atomic structure changed, and model radioactive decay
- describe periodic-table patterns and trends
- demonstrate conservation of mass, and write word and balanced equations
- classify energy changes as exothermic or endothermic
- predict products and the effect of changing reaction conditions
- explain the carbon cycle; describe climate trends and propose mitigation

### 3.3 Where VCAA's two example plans put the chemistry (for `typical` rows)

Both plans are "one way" to implement the curriculum (VCAA's wording), not a rule.
CAP1 = *Science curriculum area plan – secondary school example*. CAP2 = the same, built on the
Department's VLPs. CAM = the Levels 9–10 curriculum area map example, which matches CAP1's
units.

| Content | CAP1 | CAP2 (VLP) | Agreement |
|---|---|---|---|
| VC2S8U05 particle model | Y7 (7.3, gas pressure, density) and Y8 (8.1) | Y7 (7.4 States of matter) | first taught in Y7 |
| VC2S8U06 mixtures, separation | Y7 (7.7) | Y7 (7.7) | **Y7** |
| VC2S8U07 elements, compounds, formulas | Y8 (8.8) | Y7 (7.7) | split |
| VC2S8U08 physical/chemical change, gas tests | Y8 (8.5) | Y8 (8.7) | **Y8** |
| VC2S8U09 resources | Y7 (7.6) | Y7 (7.6) | **Y7** |
| VC2S10U06 atoms, radioactivity | Y9 (9.4, 9.9) | Y9 (9.3, "ions, isotopes") | **Y9** |
| VC2S10U07 periodic table | Y10 (10.1) | Y9 (9.5) | split |
| VC2S10U08 conservation of mass, equations | Y9 (9.7), also Y10 (10.5) in the CAM | Y10 (10.4) | split |
| VC2S10U09 reaction types, exo/endo, rates | Y10 (10.5, 10.10) | Y10 (10.4) | **Y10** |
| VC2S10U10 carbon cycle | Y9 (9.1); the CAM also maps it to 10.5 | Y9 (9.7) | mostly Y9 |
| VC2S10U11 climate change | Y10 (10.4); the CAM also maps AS sentence 16 to 9.1 | Y9 (9.7) | split |

---

## 8. Placements for the curriculum map

> Merged with the other Victorian table into `src/core-engine/data/curriculum/countries/au-vic.ts` (2026-09-25).

> These tables are the proposed Years 7–10 part of `src/core-engine/data/curriculum/countries/au-vic.ts`.

**Conventions:**
- `official`: named in a content description, the achievement standard, or the band
  description. Spans the whole band (7–8 or 9–10).
- `typical`, as a **single year**: both VCAA example plans (CAP1 and CAP2, 20 Aug 2026) teach
  that content description in the same year. The band is still the official fact.
- `typical`, as a **band**: appears **only in elaborations**, which are optional, or in
  VCAA's example units, not in a content description.
- `unverified`: the document is ambiguous about whether it is taught.
- **Track** is blank throughout: Years 7–10 Science is compulsory for all.

**Changes to the three existing 9–10 rows in `au-vic.ts`:**
- `exo-endothermic`, `rate-factors` and `catalysts` are now `at([9,10], 'intro')` official.
  Both VCAA plans put VC2S10U09 in Year 10, so they become **typical, Year 10** below.
- If you prefer to keep only official facts, keep the band rows. The note then records "Year 10
  in both VCAA example plans".

### 8.1 Years

| year | local label | typical age at start | stage | delivery | note |
|---|---|---|---|---|---|
| 7 | Year 7 | 12 | Secondary (Years 7–10) | integrated-science | Level 7; first year of the Levels 7–8 band. VC2 Science compulsory from 2026 in government schools. No mandated hours. |
| 8 | Year 8 | 13 | Secondary (Years 7–10) | integrated-science | Level 8; achievement standard "by the end of Level 8". |
| 9 | Year 9 | 14 | Secondary (Years 7–10) | integrated-science | Level 9; first year of the Levels 9–10 band; no separate Level 9 content. |
| 10 | Year 10 | 15 | Secondary (Years 7–10) | integrated-science | Level 10; some students start VCE Units 1–2 early (see the VCE report). |

These agree with `australianYears()` in `au-common.ts`.

### 8.2 Placements, Years 7–10 (VC2, in force 2026)

| concept id | from | to | depth | track | status | note |
|---|---|---|---|---|---|---|
| particle-model | 7 | 8 | develop | | official | VC2S8U05, VC2S8U06 ("modelled using the particle model"); both VCAA plans start it in Y7, and CAP1 revisits it in Y8 |
| states-of-matter | 7 | 8 | develop | | official | VC2S8U05: melting, boiling, sublimation; both plans start in Y7 (CAP2 unit "States of matter"); heating curves not named |
| physical-properties | 7 | 8 | develop | | official | VC2S8U05: melting/boiling point, density, viscosity, compressibility |
| density | 7 | 7 | develop | | typical | VC2S8U05 names density; density column (El.); both plans Y7 (CAP1 7.3 "explain density"); no ρ = m/V calculation named |
| heat-and-temperature | 7 | 8 | intro | | official | VC2S8U15: thermal energy; conduction, convection, radiation (physics); El. VC2S8U05: heat absorbed or released changes particle motion |
| heat-and-temperature | 9 | 10 | develop | | official | VC2S10U14: energy transfer by conduction, convection and radiation explained with the particle model (physics) |
| elements-compounds-mixtures | 7 | 8 | develop | | official | VC2S8U06, VC2S8U07; CAP2 Y7, CAP1 Y8 |
| mixture-types | 7 | 7 | develop | | typical | VC2S8U06: homogeneous/heterogeneous, solutions; both plans Y7 |
| separation-techniques | 7 | 7 | develop | | typical | VC2S8U06: filtration, decantation, evaporation, crystallisation, magnetic separation, distillation, chromatography; both plans Y7 |
| colloids | 7 | 8 | intro | | typical | El. VC2S8U07: solutions, suspensions and colloids as classes only |
| subatomic-particles | 9 | 9 | develop | | typical | VC2S10U06 (band 9–10 official); both plans Y9; mass and charge (El.); atomic/mass number not named; ions only in the VLP unit (CAP2 9.3) |
| atomic-models-history | 9 | 9 | develop | | typical | VC2S10U06: model changed with the discovery of e⁻, p⁺, n; both plans Y9 |
| isotopes | 9 | 9 | intro | | typical | El. VC2S10U06: neutron number, unstable isotopes; relative atomic mass not in 7–10 (VCE Unit 1) |
| electron-shells | 9 | 10 | intro | | typical | El. VC2S10U07: Bohr model, electron shells, outer-shell patterns; not in the content description itself |
| atomic-spectra | 9 | 10 | intro | | typical | El. VC2S10U07: flame tests and emission spectra; El. VC2S10U13: stellar spectra |
| periodic-table-structure | 9 | 10 | develop | | official | VC2S10U07: groups/periods, metals and non-metals; CAP1 Y10, CAP2 Y9 |
| periodic-table-history | 7 | 8 | intro | | typical | El. VC2S8U07 (Mendeleev's first table); El. VC2S8H01 (different forms of the table) |
| periodic-table-history | 9 | 10 | intro | | typical | El. VC2S10H01: how the table was disputed and refined; CAP2 9.5 "evaluate the development of the periodic table" |
| group-chemistry | 9 | 10 | intro | | typical | El. VC2S10U07: same-group similarity through reactions with oxygen, water and acids; no group named |
| periodic-trends | 9 | 10 | intro | | official | VC2S10U07: atomic size, reactivity, metallic and non-metallic properties; ionisation energy and electronegativity not named |
| periodic-law-electronic | 9 | 10 | intro | | official | VC2S10U07: organisation related to atomic structure; El.: patterns of outer-shell electrons |
| chemical-symbols-formulas | 7 | 8 | develop | | official | VC2S8U07: symbols for elements, formulas for molecules and compounds; CAP2 Y7, CAP1 Y8 |
| physical-chemical-change | 8 | 8 | develop | | typical | VC2S8U08 (band 7–8 official); both plans Y8 |
| physical-chemical-change | 9 | 10 | develop | | official | VC2S10U08: reactions "involve the rearrangement of atoms" |
| conservation-of-mass | 9 | 10 | develop | | official | VC2S10U08; closed vs open systems (El.); CAP1 Y9 (9.7) and Y10 (10.5), CAP2 Y10 |
| writing-equations | 9 | 10 | develop | | official | VC2S10U08: word and symbol equations; reactants and products; state symbols not named |
| balancing-equations | 9 | 10 | develop | | official | VC2S10U08: "simple" balanced equations; El.: equations "easy to balance" |
| reaction-types | 10 | 10 | develop | | typical | VC2S10U09 (band official): synthesis, decomposition, displacement; both plans Y10; neutralisation and precipitation are classed as displacement |
| combustion | 7 | 8 | intro | | typical | El. VC2S8I02: the fire triangle (heat, fuel, oxygen) |
| combustion | 9 | 10 | intro | | official | VC2S10U10: combustion of fossil fuels in the carbon cycle; El. VC2S10U09: metals with oxygen; complete/incomplete not named |
| dissolving-solubility | 7 | 7 | intro | | typical | VC2S8U06 names solutions; El.: dilute, concentrated, saturated, supersaturated; both plans Y7; no solubility curves |
| mass-concentration | 7 | 8 | intro | | typical | El. VC2S8U07: "why mixtures are represented by percentages"; no calculation named |
| gas-pressure | 7 | 7 | intro | | typical | VC2S8U05 names gas pressure and compressibility (band official); both plans Y7 (CAP1 7.3); El. VC2S8I01: a balloon heated and cooled |
| kinetic-molecular-theory | 7 | 8 | intro | | official | VC2S8U05 names "the particle and kinetic theories of matter"; no gas laws |
| acids-bases-indicators | 8 | 8 | intro | | typical | El. VC2S8U08: universal indicator and vinegar in a mystery-powder test (VC2S8U08 is Y8 in both plans); no pH scale, no acid/base content description |
| neutralisation | 10 | 10 | intro | | typical | El. VC2S10U09: neutralisation as a "displacement" reaction; VC2S10U09 is Y10 in both plans |
| reactions-of-acids | 9 | 10 | intro | | typical | El. VC2S10U09 (metal + acid); El. VC2S10U07 (elements with acids); El. VC2S10I03 (Zn + dilute H₂SO₄). 1.0 had it in a content description (VCSSU126); 2.0 does not |
| reactivity-series | 9 | 10 | intro | | typical | El. VC2S10U07 (reactivity of elements), El. VC2S10U09 (displacement, metal + acid); CAP1 10.1 "reactivity of different metals"; no series named |
| exo-endothermic | 10 | 10 | intro | | typical | VC2S10U09 (band official); hot and cold packs (El.); both plans Y10; no ΔH. In 7–8: "a temperature change" as a sign of reaction (VC2S8U08) |
| rate-factors | 10 | 10 | intro | | typical | VC2S10U09 (band official): temperature, concentration, surface area, catalysts; both plans Y10 (CAP1 10.10) |
| catalysts | 10 | 10 | intro | | typical | VC2S10U09 names catalysts (band official); both plans Y10 |
| measuring-rate | 10 | 10 | intro | | typical | El. VC2S10I01, VC2S10I03 (number of trials); CAP1 10.10 "collect and represent data to compare reaction rates"; no rate calculation |
| crude-oil-fuels | 7 | 7 | intro | | typical | El. VC2S8U06: separation of crude oil into components (simulation or video); U06 is Y7 in both plans |
| plastics-and-recycling | 7 | 8 | intro | | typical | El. VC2S8H03 and VC2S8H04: biodegradable packaging, household waste separation, recycling; no polymer chemistry |
| materials | 7 | 8 | intro | | typical | El. VC2S8U08: how a substance's properties affect its production or use; El. VC2S8H03: new building materials |
| food-molecules | 8 | 8 | intro | | typical | El. VC2S8U08: iodine test distinguishes corn starch in the mystery-powder task; marginal |
| photosynthesis-respiration | 9 | 9 | intro | | typical | VC2S10U10 names photosynthesis and respiration (band official); both plans Y9; chemical equations not named |
| radioactivity | 9 | 9 | develop | | typical | VC2S10U06 (band official); alpha, beta, gamma (El.); both plans Y9 |
| nuclear-equations | 9 | 10 | intro | | unverified | El. VC2S10U06 describes decay "in simple terms" (Rn-222 → α); writing or balancing nuclear equations is not stated |
| half-life | 9 | 9 | intro | | typical | El. VC2S10U06, VC2S10I05; CAP1 9.9 "What is a half-life?"; both plans Y9 |
| fission-fusion | 9 | 10 | intro | | typical | El. VC2S10U16 (physics): fission vs fusion as energy sources |
| gas-tests | 8 | 8 | develop | | typical | VC2S8U08: laboratory preparation and testing of O₂, CO₂, H₂ (band official); both plans Y8 |
| ion-tests | 9 | 10 | intro | | typical | El. VC2S10U07: flame tests only |
| chromatography | 7 | 7 | intro | | typical | VC2S8U06 names chromatography (band official); paper chromatography (El.); both plans Y7; no Rf |
| air-oxygen-hydrogen | 8 | 8 | intro | | typical | VC2S8U08: preparing and testing O₂ and H₂; both plans Y8 |
| metals-chemistry | 9 | 10 | intro | | typical | El. VC2S10U07: reactions with oxygen, water and acids; properties of metals and non-metals |
| atmosphere-climate | 9 | 10 | develop | | official | VC2S10U10 (carbon cycle, greenhouse effect El.) and VC2S10U11 (climate change); U10 Y9 in both plans, U11 split |
| pollution | 9 | 10 | intro | | typical | El. VC2S10U10 (pesticides leaching into waterways); El. VC2S10H02 (modelling atmospheric pollution); no acid rain or ozone |
| water-treatment | 7 | 7 | intro | | typical | El. VC2S8U06 (purifying water), El. VC2S8U09 (desalination); both content descriptions Y7 in both plans |
| resources-sustainability | 7 | 7 | develop | | typical | VC2S8U09 (band official); both plans Y7 |
| resources-sustainability | 9 | 10 | intro | | typical | El. VC2S10U08 and VC2S10H04: green chemistry principles (waste, energy use) |
| fuels-energy | 7 | 7 | intro | | typical | VC2S8U09: renewable vs non-renewable energy production (band official); El.: hydrogen vehicles, fossil-fuel depletion; both plans Y7 |
| fuels-energy | 9 | 10 | intro | | official | VC2S10U10 (fossil-fuel combustion), VC2S10U11 (power generation), VC2S10U16 (combustion of oil, gas, coal); no energy-per-gram values |
| metal-extraction | 10 | 10 | intro | | typical | El. VC2S10U09: decomposition to extract metals; CAP1 10.5: displacement to extract and recycle metals; U09 Y10 in both plans |
| lab-safety | 7 | 8 | develop | | official | VC2S8I02: recognising and managing risks; CAP1 opens Year 7 with "Why is safety the first step in Science?" (7.1) |
| lab-safety | 9 | 10 | develop | | official | VC2S10I02: safe investigations, risk assessments; El.: hazards of chemicals in reaction experiments |
| measurement-technique | 7 | 8 | develop | | official | VC2S8I03: equipment and precision; El.: reading a meniscus |
| measurement-technique | 9 | 10 | develop | | official | VC2S10I03: precision, calibration (El.), sample size |
| preparing-substances | 8 | 8 | intro | | typical | VC2S8U08: laboratory preparation of O₂, CO₂, H₂ (band official); both plans Y8; no salt preparation |
| units-and-conversions | 7 | 8 | intro | | official | Band description: appropriate units; El. VC2S8I03: standard units, exponential notation |
| units-and-conversions | 9 | 10 | develop | | official | Band description: units for proportional relationships; El. VC2S10U13: scientific notation |
| significant-figures-uncertainty | 7 | 8 | intro | | official | VC2S8I03 (precision), VC2S8I06 (sources of error); significant figures not named |
| significant-figures-uncertainty | 9 | 10 | develop | | official | VC2S10I03, VC2S10I06 ("areas of uncertainty"); El.: random vs systematic errors, reading between scale marks |
| graphs-and-data | 7 | 8 | develop | | official | VC2S8I04, VC2S8I05 |
| graphs-and-data | 9 | 10 | develop | | official | VC2S10I04 (including descriptive statistics), VC2S10I05 |
| particle-diagrams | 7 | 8 | develop | | official | VC2S8U06 ("modelled using the particle model"); El. VC2S8U05, VC2S8U06: particle representations of pure substances and mixtures |
| macro-micro-symbolic | 7 | 8 | intro | | official | Band description: sub-microscopic interactions determine macroscopic properties |
| macro-micro-symbolic | 9 | 10 | develop | | official | Band description (macroscopic and microscopic levels); El. VC2S10I04: molecular models vs word and balanced equations |
| molecular-models | 7 | 8 | develop | | official | VC2S8U07: 2D and 3D models of elements, compounds and mixtures |
| molecular-models | 9 | 10 | develop | | official | VC2S10U08: a range of representations; El. VC2S10U09: molecular models |
| reference-tables | 9 | 10 | intro | | typical | Using the periodic table for patterns (VC2S10U07; CAP1 10.1 "use data on element properties"); no data book |
| scientific-method | 7 | 8 | develop | | official | VC2S8I01, VC2S8I02 |
| scientific-method | 9 | 10 | develop | | official | VC2S10I01, VC2S10I02 |
| evaluating-experiments | 7 | 8 | develop | | official | VC2S8I06 |
| evaluating-experiments | 9 | 10 | develop | | official | VC2S10I06 |
| scientific-communication | 7 | 8 | develop | | official | VC2S8I07, VC2S8I08 |
| scientific-communication | 9 | 10 | develop | | official | VC2S10I07, VC2S10I08 |
| nature-of-science | 7 | 8 | develop | | official | VC2S8H01, VC2S8H02 |
| nature-of-science | 9 | 10 | develop | | official | VC2S10H01, VC2S10H02; VC2S10U06 (history of atomic models) |
| socio-scientific-issues | 7 | 8 | develop | | official | VC2S8H03, VC2S8H04 |
| socio-scientific-issues | 9 | 10 | develop | | official | VC2S10H03, VC2S10H04 |

### 8.3 Not placed (absent from Levels 7–10)

These concepts are in no content description, elaboration, band description or achievement
standard of Levels 7–8 or 9–10.

- **atomic-structure:** electron-configuration
- **bonding (the whole area):**
  - ionic-bonding, covalent-bonding, metallic-bonding, bond-polarity, lewis-structures,
    molecular-shape, intermolecular-forces, giant-structures, hybridisation, lattice-energy
  - VC2S8U05 speaks only of "attraction between particles". VC2S10U09's elaboration names the
    formation of sodium chloride as a synthesis, without bonding.
- **nomenclature:**
  - ionic-formulas, polyatomic-ions, inorganic-nomenclature, organic-nomenclature
  - Salt names such as zinc sulfate appear in elaborations only as reagents.
- **reactions:** ionic-equations
- **stoichiometry (the whole area):** relative-formula-mass, mole-concept, reacting-masses,
  limiting-reagent, yield-and-atom-economy, empirical-formula
- **solutions:**
  - molar-concentration, electrolytic-dissociation, solubility-rules
  - A precipitate is a sign of reaction (VC2S8U08) and a "displacement" example (VC2S10U09).
    There is no prediction from solubility tables.
- **gases:** gas-laws, molar-gas-volume, ideal-gas-equation
- **acids-bases:** acid-base-theories, ph-calculations, strong-weak-acids,
  acid-dissociation-constants, buffers, salt-hydrolysis. "Extracellular pH" appears only in a
  biology elaboration of VC2S10U02.
- **redox:**
  - redox-oxygen, oxidation-states, redox-electron-transfer, balancing-redox, electrolysis,
    electrochemical-cells, electrode-potentials, corrosion
  - Rusting appears only as an example of chemical change: in Levels 5–6 (VC2S6U04) and in
    the CAP1 unit 8.5 question.
  - Batteries appear only as DC sources (VC2S10U16).
- **energetics:** reaction-profiles, bond-energies, enthalpy-calorimetry, hess-law,
  entropy-gibbs
- **kinetics:** collision-theory (not named, nor in either VCAA plan), rate-laws,
  maxwell-boltzmann
- **equilibrium (the whole area):** reversible-reactions, le-chatelier, equilibrium-constant,
  solubility-product. Levels 5–6 VC2S6U04 has reversible vs irreversible *changes* (dissolving,
  melting), which is not chemical equilibrium.
- **organic:**
  - organic-intro, hydrocarbons, homologous-series, functional-groups, oxygen-organics,
    nitrogen-organics, aromatic-compounds, isomerism, geometric-isomerism, optical-isomerism,
    organic-reaction-types, reaction-mechanisms, reaction-pathways
  - Fermentation to ethanol appears only as a First Peoples' reaction context (El. VC2S10U09).
- **polymers-materials:**
  - polymers-intro, addition-polymerisation, condensation-polymerisation
  - alloys: only a context in El. VC2S10H02 ("super-strong, lighter alloys"). Not placed.
- **biochemistry:** carbohydrates, lipids, amino-acids-proteins, nucleic-acids. DNA is in
  VC2S10U04 as biology, not chemistry.
- **analytical:** titration, spectrophotometry, functional-group-tests, ir-nmr-ms
- **descriptive:** water-chemistry, inorganic-compound-classes, non-metals-chemistry,
  transition-metals
- **applied:** industrial-processes, chemical-safety. Hazards of chemicals appear only as lab
  safety (VC2S10I02).
- **skills:** preparing-solutions, organic-synthesis-techniques, chemical-calculations,
  structural-formulas

### 8.4 Coverage

- **All 26 areas were swept in full for Years 7–10.** Every content description and elaboration
  in both bands (U01–U17, H01–H04, I01–I08) was extracted from the VCAA page data and checked
  against every canonical concept. So for Years 7–10, a concept with no row above is *absent*,
  not *unknown*.
- Areas with **no** Years 7–10 placement at all: `bonding`, `stoichiometry`, `equilibrium`,
  `organic`, `redox` (apart from an elaboration-level `reactivity-series`) and `biochemistry`
  (apart from marginal rows). These are real absences.
- **`coveredAreas`:**
  - `au-vic.ts` currently uses the shared `AU_COVERED_AREAS` (organic, kinetics, energetics,
    equilibrium).
  - Once the VCE (Years 11–12) sweep is also full-area, give Victoria its own record with **no
    `coveredAreas` field**, meaning all areas.
  - Until then, the Years 7–10 rows above can be added without changing `coveredAreas`: they are
    facts either way.
- **`basis` suggestion:** "Victorian Curriculum F–10 Version 2.0 Science (Levels 7–10); VCAA
  secondary Science planning examples (Aug 2026); VCAA VCE Chemistry Study Design …".
- **`outsideRange` suggestion:** "Levels 5–6 (VC2S6U03, VC2S6U04): particle model of the three
  states, mixtures and solutions, reversible vs irreversible changes (rusting, cooking)."

---

## 9. Checks against the site's current tags

Both checkouts were read: `chem-games` on branch cheatsheet-review and
`chem-games-organic-plan` on branch curriculum-alignment. `yearLevel`, `curriculumRef` and
`yearLevels` are the same in both; the last commit to `cheat-sheet-data.ts` is `4a3b6e5` in each.

**Version 1.0 → 2.0 code equivalents.** This is my own mapping; no official VCAA crosswalk for
Science was found.

| 1.0 code (Levels 7–8 / 9–10) | 1.0 content (paraphrase) | 2.0 equivalent |
|---|---|---|
| VCSSU095 | mixtures, solutions, separation | VC2S8U06 |
| VCSSU096 | states of matter by particle model | VC2S8U05 |
| VCSSU097 | elements, compounds, mixtures by particle model | VC2S8U07 |
| VCSSU098 | chemical change forms new substances | VC2S8U08 |
| VCSSU100 | renewable vs non-renewable resources | VC2S8U09 |
| VCSSU122 | atoms of p, n, e; natural radioactivity | VC2S10U06 |
| VCSSU123 | periodic table from atomic structure | VC2S10U07 |
| VCSSU124 | rearranging atoms; conservation of mass | VC2S10U08 |
| VCSSU125 | reaction types, rates, balanced equations | VC2S10U09, plus VC2S10U08 for equations |
| VCSSU126 | combustion and **reactions of acids**, energy transfer (El.: exo/endo; acids with metals, bases, carbonates) | VC2S10U09 (exo/endo; acids **only in elaborations**) and VC2S10U10 (combustion in the carbon cycle). Acids have no 2.0 content description |
| VCSSU128 | carbon cycle, global systems | VC2S10U10, VC2S10U11 |

**Cheat sheets**

| slug | yearLevel | curriculumRef (as written) | Verdict against VC2 |
|---|---|---|---|
| atomic-structure | Year 9 | VC2S10U07, with a band caveat | **Consistent.** The code is current and the quote is correct. Year 9 is inside the band and matches CAP2 (9.5); CAP1 has it in Year 10. The sheet also teaches the three subatomic particles, which is VC2S10U06: that content is Year 9 in both plans, so Year 9 suits the sheet. Its note that atomic/mass number and ion formation are "this site's extension" is accurate for the content descriptions; CAP2's VLP unit 9.3 does mention ions. |
| isotopes-and-radioactivity | Year 10 | VC2S10U06, with a band caveat | **Code correct, year questionable.** Year 10 is within the band, but **both** VCAA plans teach VC2S10U06 in **Year 9** (CAP1 9.4 and 9.9; CAP2 9.3 "Atoms and radioactivity"). The site pairs atomic-structure (U07) in Year 9 with isotopes (U06) in Year 10, the reverse of CAP1's order. Recommend **Year 9**. "Relative atomic mass is VCE Unit 1" is correct. |
| states-of-matter | Year 9 | "particle model (Levels 7–8), revisited in Year 9–10 chemical sciences" (no code) | **Inconsistent.** 2.0 code: **VC2S8U05** (1.0: VCSSU096). The claim that it is revisited in 9–10 chemical sciences is not supported: no 9–10 chemical-sciences content description covers states. The only 9–10 echo is the physics VC2S10U14 (conduction and convection by the particle model). Both VCAA plans teach it in **Year 7**. Recommend `Year 7` (or Years 7–8). Heating curves and "temperature = average kinetic energy" go beyond VC2S8U05. State symbols are VCE Unit 1. |
| acids-and-bases | Year 9 | "Level 10 (chemical reactions incl. acids); VCE Unit 2 AoS 1 (Brønsted–Lowry)" | **Inconsistent.** "Level 10 … incl. acids" is the 1.0 content description **VCSSU126**, and the tag (Year 9) contradicts its own reference (Level 10). In 2.0, acids appear **only in elaborations**: El. VC2S10U09 (metal + acid, neutralisation) and El. VC2S8U08 (universal indicator). The sheet's core (proton donors, H₃O⁺, the log pH scale, strong vs weak) is VCE Unit 2 AoS 1. Recommend `Senior`, or Year 10 flagged as pre-VCE extension citing El. VC2S10U09. |
| balancing-equations | Year 10 | "Level 10; VCE Unit 1–2 (writing balanced equations with states)" | **Consistent, but cite the code.** 2.0: **VC2S10U08**, band 9–10 (1.0: VCSSU124/125). CAP1 teaches it in Year 9 (9.7) and again in Year 10 (10.5); CAP2 in Year 10. So Year 10 is fine and Year 9 is also defensible. VC2 asks only for "simple" equations that are easy to balance. The "always include state symbols" rule and balancing polyatomic ions as units are VCE-level. |
| reaction-types | Year 10 | "Level 10; VCE Unit 2 AoS 1–2" | **Consistent, cite the code.** 2.0: **VC2S10U09** (synthesis, decomposition, displacement), plus VC2S10U10 for combustion; 1.0: VCSSU125/126. Both plans Year 10. Note that VCAA's elaborations class metal + acid, neutralisation and precipitation all as "displacement"; the sheet's single vs double displacement split is not VC2 language. Complete/incomplete combustion is VCE Unit 3. |
| chemical-bonds | Year 10 | "Level 10; VCE Unit 1 AoS 1" | **Inconsistent.** No 2.0 equivalent, and no 1.0 one either (VCSSU122–126 and their elaborations have no bonding). The content is **VCE Unit 1 AoS 1**. Recommend `Senior`, or Year 10 explicitly labelled as pre-VCE extension, as relative-formula-mass already does. |
| chemical-formulas | Year 10 | "Level 10; VCE Unit 1 AoS 1" | **Inconsistent.** No 2.0 equivalent: VC2S8U07 (Levels 7–8) has formulas only as representations, and there are no ion charges in Years 7–10. Deriving ionic formulas from charges is VCE Unit 1 AoS 1. Recommend `Senior` or labelled extension. |
| polyatomic-ions | Year 10 | "VCE Unit 1 AoS 1 … data book" | **Inconsistent tag.** The reference itself is VCE-only, yet the tag is Year 10. No VC2 Years 7–10 content. Recommend `Senior`. |
| naming-compounds | Year 10 | "VCE Unit 1 AoS 1 (IUPAC naming of ionic and covalent compounds)" | **Inconsistent tag.** No VC2 Years 7–10 content (salt names occur only incidentally in elaborations). Also, australia-victoria.md §8.2 found that Greek-prefix molecular naming and acid naming are **not** in Unit 1 key knowledge, so part of the reference is doubtful. The VCE check is in the parallel report. |
| relative-formula-mass | Year 10 | "Not in the Victorian Curriculum F–10 … formally VCE Unit 1" | **Consistent and accurate.** VC2 Years 7–10 has no Ar or Mr (confirmed). Year 10 as "pre-VCE extension" is a site choice that the reference states openly. This is the model the other VCE-content sheets could follow. |
| stoichiometry | Senior | "VCE Unit 2 AoS 1–2 (the mole …); Unit 3 AoS 2 (yield)" | Senior is right: nothing in Years 7–10. **The VCE units look wrong** (for the parallel VCE agent to confirm): australia-victoria.md puts the mole in Unit 1 AoS 2, limiting reactants in Unit 3 AoS 1, and % yield in Unit 4 AoS 1. |
| lewis-structures | Senior | "VCE Unit 1 AoS 1 (covalent bonding, Lewis structures, VSEPR)" | Senior is right; nothing in Years 7–10. But the sheet has a section headed **"Year 10 essentials"**, which has no VC2 basis. |
| organic-nomenclature | Senior | "VCE Unit 4 AoS 1" | Senior is right; no organic chemistry in Years 7–10. Unit 1 AoS 2 also has naming; see the VCE report. |
| functional-groups | Senior | "VCE Unit 4 AoS 1 … AoS 2" | Senior is right; nothing in Years 7–10. |

**Games** (`yearLevels` are derived from the linked sheets, per the comment in `games-data.ts`)

| game | yearLevels | Verdict |
|---|---|---|
| acid-classification (Acid or Base?) | Year 9 | **Inconsistent.** Players classify formulas as acid, base, neutral **or amphoteric**. No VC2 Years 7–10 content description covers this. Amphiprotic species and Brønsted–Lowry are VCE Unit 2 AoS 1. The Year 9 tag comes from acids-and-bases, which is itself mis-tagged. At most, Year 10 elaboration-level (El. VC2S10U09); more accurately `Senior`. |
| formula-blaster | Year 10 | **Inconsistent.** All three source sheets (chemical-formulas, polyatomic-ions, naming-compounds) are VCE Unit 1 content with no VC2 Years 7–10 home. `Senior`, or Year 10 as labelled extension. |
| neutralise | Year 9, Year 10 | **Partly consistent.** Neutralisation exists in Years 7–10 only as an elaboration of VC2S10U09, which both VCAA plans teach in Year 10. The H⁺/OH⁻ ion framing is VCE Unit 2. Year 10 is defensible as elaboration-level; Year 9 rests on the mis-tagged acids sheet. |
| reaction-balancer | Year 10, Senior | **Consistent.** VC2S10U08 (band 9–10) plus VCE. Adding **Year 9** would also be justified: CAP1 teaches equations in Year 9, unit 9.7. |
| lewis-structures (Share to Fill) | Year 10, Senior | **Year 10 is inconsistent.** It comes from chemical-bonds (Year 10), which has no VC2 home. Senior (VCE Unit 1 AoS 1) holds. |

**Summary of §9:**
- **Consistent (4 sheets):** atomic-structure, balancing-equations, reaction-types,
  relative-formula-mass.
- **Code right, year against both VCAA plans:** isotopes-and-radioactivity.
- **Wrong band:** states-of-matter (should be Year 7 or 7–8).
- **VCE content tagged Year 9 or 10 with no VC2 7–10 home:** acids-and-bases, chemical-bonds,
  chemical-formulas, polyatomic-ions, naming-compounds.
- **Games:** formula-blaster, lewis-structures (Year 10), and acid-classification (Year 9)
  inherit these mis-tags.
- **Outdated references:** the "Level 10" references on five sheets are Version 1.0-style, with
  no code, and should cite VC2S10U08 or VC2S10U09. acids-and-bases can cite only an
  elaboration, and chemical-bonds and chemical-formulas cannot cite any 2.0 code.

---

## 10. Unverified points

1. **Catholic-sector implementation date** for VC2 Science (VCEA decides). Not checked.
   Independent schools set their own timelines (VCAA).
2. **Actual weekly hours** for Science in Years 7–10. Not mandated. Typical practice was not
   researched.
3. **How representative the two VCAA example plans are.** VCAA calls them one way to implement
   the curriculum. The Department-funded Stile and Education Perfect scopes and sequences
   would be a useful third data point for the `typical` rows:
   - Stile's VIC v2.0 scope-and-sequence PDF exceeded the fetch size limit and was **not
     read**.
   - The Arc VLP guidance pages were not read directly; CAP2 stands in for them.
4. **nuclear-equations:** whether Years 9–10 teachers write α/β decay equations. The
   elaboration says only "in simple terms".
5. **1.0 → 2.0 code mapping** in §9 is my own. No official VCAA Science crosswalk was found.
6. **Marginal elaboration-only rows** (food-molecules, materials, pollution, plastics-and-recycling,
   fission-fusion) rest on single elaborations. A teacher may judge them too thin to place.
7. **CAP2 unit contents** are known only from their one-line descriptions, not from the
   underlying VLPs. That VC2S10U09 rates are inside CAP2 10.4 "Chemical reactions" is inferred
   from the unit description.
8. **The VCE unit claims in §9** (stoichiometry, naming-compounds, lewis-structures) come from
   australia-victoria.md and are for the parallel VCE agent to confirm.

## 11. Sources

**Victorian Curriculum F–10 Version 2.0 (VCAA)**
- https://f10.vcaa.vic.edu.au/learning-areas/science/curriculum. All Levels 7–8 and 9–10
  content descriptions, elaborations, band descriptions and achievement standards, read from
  the page's embedded data (`__NEXT_DATA__`) on 25 Sept 2026. Levels 5–6 were read from the
  same page for `outsideRange`.
- https://f10.vcaa.vic.edu.au/resource-hub/science-curriculum-planning-examples-secondary
  (resource page updated 20 Aug 2026)
- https://f10.vcaa.vic.edu.au/sites/default/files/2026/CAP1-Science-VC2-Secondary-example_20-08-2026.docx
- https://f10.vcaa.vic.edu.au/sites/default/files/2026/CAP2-Science-VC2-Seconday-example-VLP_20-08-2026.docx
  (the "Seconday" typo is in VCAA's filename)
- https://f10.vcaa.vic.edu.au/sites/default/files/2026/CAM-Science-VC2-Secondary-9-10-example_20-08-2026.docx
- https://www.vcaa.vic.edu.au/curriculum/foundation-10-version-2/victorian-curriculum-f-10-version-20
  (sector implementation responsibility)

**Department of Education (Victoria)**
- https://www2.education.vic.gov.au/pal/curriculum-programs/policy: Science "full
  implementation is required from 2026"; time allocations not mandated outside Mathematics and
  English; last updated 20 April 2026.
- https://www2.education.vic.gov.au/pal/curriculum-programs/guidance/victorian-lesson-plans
  (VLPs in Science)

**Victorian Curriculum Version 1.0 (for the §9 code mapping)**
- https://victoriancurriculum.vcaa.vic.edu.au/science/curriculum/f-10?y=7-8&s=science-understanding&s=science-inquiry-skills&layout=2
- https://victoriancurriculum.vcaa.vic.edu.au/science/curriculum/f-10?y=9-10&s=science-understanding&s=science-inquiry-skills&layout=2
- https://victoriancurriculum.vcaa.vic.edu.au/Curriculum/ContentDescription/VCSSU095 (and
  VCSSU096, 097, 098, 122, 123, 124, 125, 126, for the elaborations)

**Not read**
- https://stileapp.com/static/Stile_VIC_v2.0_Scope_and_Sequence_2026_1.1.pdf (over the fetch
  size limit)

**Repository files checked**
- `src/lib/cheat-sheet-data.ts`
- `src/lib/games-data.ts`
- `src/i18n/dictionaries/en.ts` (game descriptions)
- `src/core-engine/data/curriculum/concepts.ts`
- `src/core-engine/data/curriculum/countries/au-vic.ts`
- `src/core-engine/data/curriculum/countries/au-common.ts`
- `docs/curriculum/countries/australia-victoria.md`
- `docs/curriculum/countries/germany-baden-wuerttemberg.md` §8 (format)
