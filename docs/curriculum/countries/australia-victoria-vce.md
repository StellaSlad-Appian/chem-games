# Victoria: VCE Chemistry Units 1–4 (Years 11–12), all areas

**Purpose:** completes the Years 11–12 half of the Victorian record
(`src/core-engine/data/curriculum/countries/au-vic.ts`). That record currently covers only
organic chemistry, kinetics, energetics and equilibrium. This report places every other area of
VCE Chemistry, then repeats the four existing areas so that §8 lists every Years 11–12
placement in one table. Years 7–10 (Victorian Curriculum 2.0) are covered by a separate report.
The depth research on the four existing areas is in
[`australia-victoria.md`](./australia-victoria.md). It is reused here, not repeated.
**Research date:** 25 Sept 2026 (desk research by an agent, from primary VCAA sources).
**Review status:** not yet checked by a teacher who teaches VCE Chemistry in Victoria.

Primary sources:
- the VCE Chemistry Study Design: accredited for Units 1–2 from 2023 and Units 3–4 from 2024. The
  file is the one re-uploaded in February 2026. All key knowledge and the key science skills
  table were read in full for this report.
- the 2026 VCE Chemistry Data Book (Version 2, February 2026)
- the VCAA sample teaching plans for Units 1 and 2
- the VCAA "Teaching and learning" support page

URLs are in §10. Anything not confirmed from a primary source is marked **(unverified)**.

## What this means for chem-games

- **Year 11 (Units 1–2) holds almost all of the "general chemistry".** This includes:
  - bonding and structure, periodic trends and subshell configurations
  - the mole and empirical formulas
  - concentration, solubility and precipitation
  - gases (pV = nRT), acid–base chemistry with pH, and redox half-equations
  - titration and colorimetry
  
  Year 11 is school-assessed only, graded S/N, with no exam and no examiners' reports. The depth
  of Year 11 content is therefore set only by the wording of the key knowledge. There is no exam
  evidence to calibrate it.
- **Year 12 outside organic chemistry is electrochemistry, energetics, rates and equilibrium.**
  Electrochemistry covers galvanic cells, fuel cells, electrolysis, rechargeable cells, Faraday's
  laws and oxidation numbers, with half-equations in both acidic and basic conditions. Unit 3
  adds the limiting reactant and combustion gas stoichiometry at SLC.
- **Common topics that VCE does not teach at all:**
  - Ka/pKa, weak-acid pH, buffers and salt hydrolysis
  - Hess's law, entropy/Gibbs, Ksp and rate laws
  - kinetic molecular theory
  - atomic emission spectra (flame tests appear only as an optional activity)
  - atomic absorption spectroscopy (AAS), which is absent entirely
  - Greek-prefix naming of molecular compounds and acid naming
  - hybridisation and lattice energy
  - nuclear chemistry (none in the study)
  
  A game about any of these has no VCE home.
- **What VCE stresses that many curricula don't:**
  - green chemistry principles, UN SDGs and the linear-vs-circular economy, in every unit
  - critical elements and element recovery (Unit 1)
  - colorimetry/UV–vis with calibration curves already in Year 11
  - "green" hydrogen by PEM electrolysis and artificial photosynthesis (Unit 3)
  - Kw "at a given temperature" for pH
  - explicit significant-figure rules. The study design says "400 mL" has three significant
    figures.
- **Ionic naming is narrow:** only formulas and names of ionic compounds from ions, with seven
  named polyatomic ions plus transition-metal ions. The Data Book's ion table is much longer, for
  example MnO₄⁻, Cr₂O₇²⁻, CH₃COO⁻, S₂O₃²⁻ and C₆H₅O₇³⁻. A formula game can use the longer list as
  reference data, but only the seven are required knowledge.
- **The 2026 Data Book is the source for game data:**
  - an electrochemical series of 30 half-equations, F₂ (+2.89 V) down to Li⁺ (−3.04 V), all at SLC
  - a grid of qualitative solubilities (s / ss / i)
  - acid–base indicators with ranges and colours
  - colours of oxidising agents and their conjugate reducing agents
  - Vm = 24.8 L mol⁻¹ and c(water) = 4.18 J g⁻¹ K⁻¹
  
  The book gives **no pH or Kw formula**, so students must recall pH = −log[H₃O⁺] and Kw.
- **Coverage:** with this report, every area is placed for Years 11–12. Once the Years 7–10
  report is also merged, `coveredAreas` can be removed from `au-vic.ts` so that it defaults to all
  areas (§9).

---

## 1. Structure (brief; details in australia-victoria.md §1)

| Unit | Title (question) | Year (usual) | Assessment |
|---|---|---|---|
| 1 | How can the diversity of materials be explained? | 11 | School-based, S/N |
| 2 | How do chemical reactions shape the natural world? | 11 | School-based, S/N |
| 3 | How can design and innovation help to optimise chemical processes? | 12 | SAC 20% + exam |
| 4 | How are carbon-based compounds designed for purpose? | 12 | SAC 30% + exam; exam 50% |

- Each unit has AoS 1–2 (content) and, in Units 1, 2 and 4, an AoS 3 investigation.
- The **key science skills** apply across Units 1–4 and are examinable in the Unit 3–4 exam.
- The study design says only that Units 1–4 are "designed to the equivalent standard of the final
  two years of secondary education". The mapping Units 1–2 = Year 11 and Units 3–4 = Year 12 is
  normal practice **(unverified as a rule)**.
- Only Unit 3 has no prerequisite, and Units 3–4 must be taken as a sequence. Students can start
  Unit 3 without Units 1–2, so the Unit 3–4 exam assumes Unit 1–2 knowledge only informally
  **(unverified)**.

---

## 2. Content by unit and area of study (areas not in australia-victoria.md)

Paraphrased from the key knowledge. Short phrases in quotation marks are verbatim. Organic,
energetics, kinetics and equilibrium dot points are omitted; see australia-victoria.md §2.3–2.6.

### 2.1 Unit 1: *How can the diversity of materials be explained?* (Year 11)

**AoS 1: How do the chemical structures of materials explain their properties and reactions?**

*Elements and the periodic table*
- Definitions of element, isotope and ion. Notation: atomic number, mass number, and numbers of
  protons, neutrons and electrons.
- The periodic table as an organising tool:
  - Structure: "shell and subshell electronic configurations" and atomic radii.
  - Properties: electronegativity, first ionisation energy, metallic/non-metallic character and
    reactivity.
- Critical elements (e.g. He, P, rare-earth and post-transition metals, metalloids) and recycling
  to recover elements.

*Covalent substances*
- Lewis (electron dot), structural and molecular formulas for eleven molecules: H₂, O₂, Cl₂, N₂,
  HCl, CO₂, H₂O, NH₃, CH₄, C₂H₆ and C₂H₄.
- VSEPR shapes: linear, bent, pyramidal and tetrahedral, "excluding bond angles".
- Polarity from shape.
- Covalent bonds vs intermolecular forces (dispersion, dipole–dipole, hydrogen bonding).
- Properties of molecular substances: mp, bp, non-conduction.
- Diamond and graphite: structure, properties (heat and electrical conductivity, hardness) and
  uses.

*Reactions of metals*
- Metal properties (lustre, malleability, ductility, mp, conductivity) explained by metallic
  bonding and metallic crystals.
- An **experimentally determined reactivity series** from reactions with water, acids and oxygen.
- Metal recycling as a circular-economy example.

*Reactions of ionic compounds*
- Ionic properties (brittleness, hardness, mp, conductivity solid vs molten) explained by ionic
  bonding and crystal structure.
- Deducing the formula and name of an ionic compound from its ions, including the polyatomic ions
  NH₄⁺, OH⁻, NO₃⁻, HCO₃⁻, CO₃²⁻, SO₄²⁻ and PO₄³⁻.
- Electron transfer from metal to non-metal. Formulas with polyatomic and transition-metal ions.
- **Solubility tables to predict and identify precipitation reactions**, written as balanced full
  and ionic equations with (s), (l), (aq) and (g).

*Separation and identification*
- Like dissolves like: polar and non-polar solutes and solvents.
- **Chromatography** to find composition and purity, including Rf values.

The practicals named for the unit are:
- reactivity series
- chromatography
- precipitation to identify ionic compounds
- empirical formula
- polymer synthesis

Flame tests, ball-and-stick models and solubility-table identification of unknown ions are listed
only as optional learning contexts.

**AoS 2: How are materials quantified and classified?**
- Relative isotopic mass on the ¹²C = 12 scale. **Relative atomic mass from mass spectrometry**,
  with instrument details "not required".
- Avogadro's constant (6.02 × 10²³). Moles from the mass of a pure sample.
- Molar mass, % composition by mass of covalent compounds, and **empirical and molecular
  formulas**.
- Organic families, naming and isomers: see australia-victoria.md §2.3.
- Plant biomass as a renewable feedstock. Everyday organic products and their health and
  environmental hazards.
- **Polymers and society:**
  - addition vs condensation
  - addition polymers from alkenes
  - thermoplastic vs thermosetting
  - designing linear addition polymers
  - fossil-based plastics (HDPE, PVC, LDPE, PP, PS) vs bioplastics (PLA, Bio-PE, Bio-PP)
  - mechanical, chemical and organic recycling; compostability
  - condensation and hydrolysis in a circular economy

**AoS 3: How can chemical principles be applied to create a more sustainable future?** A
student-directed research investigation into the production or use of a material. Its key
knowledge covers:
- *Scientific evidence:*
  - primary vs secondary data
  - opinion, anecdote and evidence
  - quality of evidence and bias
  - logbooks
- *Sustainability:* green chemistry principles, sustainable development and the linear → circular
  economy.
- *Scientific communication:* terminology, effective communication, models and their limits,
  social, economic, legal and political factors, and referencing.

The example topics include nanomaterials, composites, glass and micro- and nanoplastics. They are
optional and are not key knowledge.

### 2.2 Unit 2: *How do chemical reactions shape the natural world?* (Year 11)

**AoS 1: How do chemicals interact with water?**

*Water as a unique chemical*
- Water in all three states at Earth's surface, and how much drinking water is available.
- Anomalous properties explained by hydrogen bonding:
  - bp trend of the Group 16 hydrides
  - ice less dense than liquid water
  - **specific heat capacity** "including units and symbols"
  - high **latent heat of vaporisation** and its effect on ocean temperature

*Acid–base (proton transfer) reactions*
- **Brønsted–Lowry**, including polyprotic acids and amphiprotic species. Full and ionic
  equations with states.
- Strong/weak vs concentrated/dilute, for both acids and bases.
- Neutralisation to salts:
  - acids with metal carbonates and hydroxides
  - antacids
- The logarithmic pH scale. **pH of strong acids and bases** using "Kw at a given temperature".
- Accuracy and precision compared across natural indicators, commercial indicators and pH meters.
- Applications, given as examples: natural acidity of rain vs acid rain; CO₂ in oceans and
  shell growth.

*Redox (electron transfer) reactions*
- Oxidising and reducing agents. Balanced **half and overall equations, including in acidic
  conditions**, with states.
- Reactivity series and **metal displacement** with redox equations.
- Applications, given as examples: **corrosion**, simple **primary cells**.

**AoS 2: How are chemicals measured and analysed?**

*Measuring solubility and concentration*
- Concentration in mol L⁻¹, g L⁻¹, %(m/v), %(v/v) and ppm, with conversions.
- Solubility tables and **solubility graphs**. Effect of temperature on the solubility of a solid,
  liquid or gas.
- Precipitation to remove impurities from water.

*Analysis for acids and bases*
- Volume–volume stoichiometry for solutions.
- Volumetric analysis:
  - indicators
  - **standard solutions** and **dilution**
  - **acid–base titration** "(excluding back titrations)"

*Measuring gases*
- CO₂, CH₄ and H₂O as greenhouse gases because they absorb IR. The natural vs enhanced greenhouse
  effect.
- Definition of gas pressure. **SLC = 25 °C and 100 kPa.**
- **pV = nRT**, with units limited to kPa, Pa, atm, mL, L, °C and K.
- Gas stoichiometry: moles, mass and volume. Molar volume or molar mass of a gas produced in a
  reaction.

*Analysis for salts*
- Sources of salts in water and soil, including minerals, heavy metals and organo-metallic
  substances.
- **Electrical conductivity** to assess salinity.
- Water of hydration (molar ratio).
- Mass–mass stoichiometry.
- **Colorimetry and/or UV–visible spectroscopy with a calibration curve** for ions or complexes.

**AoS 3: How do quantitative scientific investigations develop our understanding of chemical
reactions?** A student-adapted or student-designed investigation that must generate primary data.
Its key knowledge covers:
- methodology and data generation
- accuracy, precision, repeatability, reproducibility, resolution and validity
- health, safety and ethics
- the distinction between **aim, hypothesis, model, theory and law**
- observations that are consistent with, or challenge, models
- the characteristics of primary data, logbooks and limitations
- report conventions

### 2.3 Unit 3: *How can design and innovation help to optimise chemical processes?* (Year 12), non-energetics parts

**AoS 1: What are the current and future options for supplying energy?** (fuels, calorimetry and
food: see australia-victoria.md §2.5)
- **Limiting reactants.**
- Combustion stoichiometry at SLC: mass–mass, mass–volume, volume–volume. It includes the net mass
  or volume of CO₂, CH₄ and H₂O.
- Photosynthesis, respiration and fermentation, each with a given equation.
- *Primary galvanic cells and fuel cells:*
  - redox as simultaneous oxidation and reduction
  - **oxidation numbers** to identify the agents and the conjugate redox pairs
  - half-equations and the overall equation in **acidic and basic** conditions
  - general design of primary cells: electrode polarity, inert vs reactive electrodes,
    electrolyte ("details of specific cells not required")
  - the **electrochemical series**: its use and limitations, predicting reactions, and maximum
    cell voltage under standard conditions
  - fuel cells, including porous electrodes
  - **Faraday's laws** with stoichiometry: quantities, current or time
  - innovation in fuel cells: green chemistry principles of energy efficiency and renewable
    feedstocks

**AoS 2: How can the rate and yield of chemical reactions be optimised?** (rates and equilibrium:
see australia-victoria.md §2.5)
- *Production of chemicals using electrolysis:*
  - the electrochemical series and its limits for predicting products, molten or aqueous and with
    different electrode materials
  - equations at the anode and cathode, and the overall equation
  - design of commercial electrolytic cells: removing products, choosing electrodes, electrolyte
    and additives ("details of specific cells not required")
  - **rechargeable (secondary) cells**: discharging as galvanic, recharging as electrolytic, and
    the polarity in each mode
  - "green" hydrogen by **PEM electrolysis** powered by solar or wind, and by **artificial
    photosynthesis**, with equations in acidic conditions
  - Faraday's laws applied to electrolysis

### 2.4 Unit 4: *How are carbon-based compounds designed for purpose?* (Year 12), non-organic parts

Unit 4 is almost entirely organic (see australia-victoria.md §2.6). The parts in other areas are:
- **Biochemistry (AoS 1):**
  - hydrolysis of proteins, carbohydrates, fats and oils
  - condensation to proteins, starch, glycogen and lipids
- **Analytical (AoS 2):**
  - melting point, and simple and fractional distillation, for purity
  - degree of unsaturation with iodine
  - **redox titrations**, including excess and limiting reactants ("excluding back titrations")
  - HPLC, and MS/IR/¹³C and ¹H NMR
- **Medicinal chemistry (AoS 2):**
  - solvent extraction and distillation of plant compounds
  - enzymes: protein structure (primary to quaternary), denaturation by temperature, pH changes
    and zwitterions
  - competitive inhibition (lock and key)
- **Sustainability (AoS 1):** green chemistry principles of renewable feedstocks, catalysis and
  designing safer chemicals.
- **AoS 3:** the student-designed investigation and **scientific poster** (≤ 600 words), assessed
  in Unit 4. It may run across Units 3 and 4.

### 2.5 Key science skills (all units; examinable in Units 3–4)

Condensed from the study design table:
- **Aims and questions:** hypotheses, predictions, and independent, dependent and controlled
  variables.
- **Plan and conduct:** choose a methodology from case study, classification and identification,
  controlled experiment, fieldwork, literature review, modelling, product/process/system
  development or simulation. Consider sampling, sources of error and uncertainty.
- **Safety and ethics:** **risk assessments informed by safety data sheets (SDS)**, OHS
  guidelines and ethical conduct.
- **Generate, collate and record data:** logbook; schematic diagrams, flow charts, tables, bar
  charts, line graphs and **calibration curves**.
- **Analyse and evaluate:**
  - ratios, percentages, percentage change and mean
  - **significant figures**
  - linear and non-linear graphs
  - accuracy, precision, repeatability, reproducibility, resolution and validity
  - random and systematic errors
  - outliers
  - improving precision
- **Evidence-based arguments:** opinion vs evidence; whether evidence supports the hypothesis;
  limitations of conclusions.
- **Communicate:**
  - conventions and units
  - **models and their limitations**
  - critically evaluating media texts
  - applying **sustainability concepts** (green chemistry, SDGs, circular economy)
  - sociocultural, economic, political, legal and ethical factors
  - scientific reports and posters
  - referencing

The "Terms used in this study" section defines true value, accuracy, precision, repeatability,
reproducibility, resolution, validity, random and systematic errors, and mistakes. It says
uncertainty is **qualitative only** and gives the significant-figure rules.

---

## 3–7. (Not repeated)

Conventions and notation, command terms and the Data Book item list are in
australia-victoria.md §1.4, §4 and §5. The 2026 Data Book items relevant to the newly placed
areas are:
- chemical relationships: n = m/M, cV, V/Vm, N/NA; c(ppm); ρ = m/V; pV = nRT; Q = It; n(e⁻) = Q/F;
  E = VIt; E°cell
- physical constants: including the density of water
- unit conversions: 0 °C = 273 K; 100 kPa = 0.987 atm; litre and tonne
- metric prefixes
- acid–base indicators: nine entries, thymol blue counted twice
- colours of oxidising agents
- formulas and charges of ions: cations 1+ to 4+, anions 1− to 3−
- qualitative solubilities: an s/ss/i grid of about 16 cations × 9 anions
- the periodic table: shows electronegativity and relative atomic mass, **no electron
  configurations**
- the electrochemical series: 30 half-equations at SLC

---

## 8. Placements for the curriculum map

> Merged with the other Victorian table into `src/core-engine/data/curriculum/countries/au-vic.ts` (2026-09-25).

> Source for the Years 11–12 part of `src/core-engine/data/curriculum/countries/au-vic.ts`.

**Conventions:**
- Year 11 = Units 1–2 and Year 12 = Units 3–4 (usual practice; see §1). Every row has track
  `chemistry` (`c` in au-vic.ts), because VCE Chemistry is an elective.
- Status is `official` when a key knowledge dot point states the content. It is `typical` when
  the content is only:
  - named as a "for example" application inside a dot point, or
  - found in VCAA support material (the sample teaching plans), or
  - examined but not named (copied rows).
- Depth:
  - `develop` = the main teaching, with calculations or representations.
  - `intro` = a first, partial or qualitative treatment.
  - VCE is the only senior course, so `extend` is not used.
- The notes of rows copied unchanged from the current au-vic.ts start with **[au-vic]**. Rows
  **new in an organic, energetics, kinetics or equilibrium id**, not yet in au-vic.ts, start with
  **[new]**.
- Years 9–10 rows now in au-vic.ts (`exo-endothermic`, `rate-factors`, `catalysts` at Levels 9–10)
  are left to the Years 7–10 report and are not repeated here.

| concept id | from | to | depth | track | status | note |
|---|---|---|---|---|---|---|
| states-of-matter | 11 | 11 | develop | chemistry | official | Water in three states; latent heat of vaporisation; mp/bp from structure and bonding (U1 AoS 1, U2 AoS 1) |
| physical-properties | 11 | 11 | develop | chemistry | official | Properties of molecular, metallic, ionic and network (diamond/graphite) substances from structure (U1 AoS 1) |
| density | 11 | 11 | intro | chemistry | official | Ice vs liquid water only (U2 AoS 1); ρ = m/V is in the Data Book |
| heat-and-temperature | 11 | 11 | develop | chemistry | official | Specific heat capacity of water "including units and symbols"; latent heat of vaporisation (U2 AoS 1) |
| elements-compounds-mixtures | 11 | 11 | intro | chemistry | official | Definitions of element, isotope, ion (U1 AoS 1); purity via chromatography |
| separation-techniques | 11 | 11 | develop | chemistry | official | Chromatography (U1 AoS 1); precipitation to remove impurities from water (U2 AoS 2) |
| separation-techniques | 12 | 12 | develop | chemistry | official | Simple and fractional distillation, solvent extraction (U4 AoS 2) |
| subatomic-particles | 11 | 11 | develop | chemistry | official | Atomic number, mass number, p/n/e counts, ion notation (U1 AoS 1) |
| isotopes | 11 | 11 | develop | chemistry | official | Relative isotopic mass on the ¹²C scale; relative atomic mass from mass-spectrometry data (U1 AoS 2) |
| electron-shells | 11 | 11 | develop | chemistry | official | Shell configurations (U1 AoS 1) |
| electron-configuration | 11 | 11 | develop | chemistry | official | "shell and subshell electronic configurations"; extent (Z range, Cr/Cu, orbital diagrams) unverified |
| periodic-table-structure | 11 | 11 | develop | chemistry | official | "organisational tool"; Data Book table with electronegativities |
| group-chemistry | 11 | 11 | intro | chemistry | typical | Reactivity as a periodic trend; no group family named in key knowledge; Group 16 hydrides (U2) |
| periodic-trends | 11 | 11 | develop | chemistry | official | Atomic radius, electronegativity, first ionisation energy, metallic character, reactivity |
| periodic-law-electronic | 11 | 11 | develop | chemistry | official | Structure (shell and subshell configurations) ↔ position and properties |
| ionic-bonding | 11 | 11 | develop | chemistry | official | Electron transfer; crystal structure; brittleness, conductivity solid vs molten |
| covalent-bonding | 11 | 11 | develop | chemistry | official | Eleven named small molecules incl. N₂, CO₂, C₂H₄ |
| metallic-bonding | 11 | 11 | develop | chemistry | official | Metallic bonding and metallic crystals explain properties; no band theory |
| bond-polarity | 11 | 11 | develop | chemistry | official | Polar/non-polar character from shape; electronegativity trend |
| lewis-structures | 11 | 11 | develop | chemistry | official | Electron-dot structures of the eleven molecules; no resonance or formal charge |
| molecular-shape | 11 | 11 | develop | chemistry | official | Linear, bent, pyramidal, tetrahedral; "excluding bond angles" |
| intermolecular-forces | 11 | 11 | develop | chemistry | official | [au-vic] |
| intermolecular-forces | 12 | 12 | develop | chemistry | official | [au-vic] |
| giant-structures | 11 | 11 | develop | chemistry | official | Metallic crystals, ionic lattices, diamond and graphite; no other network solids or allotropes |
| chemical-symbols-formulas | 11 | 11 | develop | chemistry | official | Molecular and structural formulas; Data Book element names |
| ionic-formulas | 11 | 11 | develop | chemistry | official | Formulas from ions, incl. transition-metal ions |
| polyatomic-ions | 11 | 11 | develop | chemistry | official | NH₄⁺, OH⁻, NO₃⁻, HCO₃⁻, CO₃²⁻, SO₄²⁻, PO₄³⁻; the Data Book list is longer |
| inorganic-nomenclature | 11 | 11 | develop | chemistry | official | Ionic compounds only; no Greek-prefix molecular or acid naming |
| organic-nomenclature | 11 | 11 | develop | chemistry | official | [au-vic] Non-cyclic, up to C8 |
| organic-nomenclature | 12 | 12 | develop | chemistry | official | [au-vic] propan-1-ol and 1-propanol both accepted |
| writing-equations | 11 | 11 | develop | chemistry | official | Full and ionic equations with (s), (l), (aq), (g) |
| balancing-equations | 11 | 11 | develop | chemistry | official | Balanced equations required throughout U1–2 |
| reaction-types | 11 | 11 | develop | chemistry | official | Precipitation, acid–base (proton transfer), redox (electron transfer), displacement; synthesis/decomposition not used |
| combustion | 12 | 12 | develop | chemistry | official | [au-vic] Complete and incomplete |
| ionic-equations | 11 | 11 | develop | chemistry | official | Precipitation and acid–base ionic equations |
| relative-formula-mass | 11 | 11 | develop | chemistry | official | Molar mass; % composition by mass (U1 AoS 2) |
| mole-concept | 11 | 11 | develop | chemistry | official | NA = 6.02 × 10²³; moles from mass (U1 AoS 2) |
| reacting-masses | 11 | 11 | develop | chemistry | official | Mass–mass, gas, solution volume–volume stoichiometry (U2 AoS 2) |
| reacting-masses | 12 | 12 | develop | chemistry | official | Combustion stoichiometry at SLC; Faraday stoichiometry (U3) |
| limiting-reagent | 12 | 12 | develop | chemistry | official | U3 AoS 1; excess and limiting in redox titrations (U4 AoS 2) |
| yield-and-atom-economy | 12 | 12 | develop | chemistry | official | [au-vic] Both examined, including comparing routes |
| empirical-formula | 11 | 11 | develop | chemistry | official | Empirical and molecular formula from % composition; water of hydration (U2 AoS 2) |
| dissolving-solubility | 11 | 11 | develop | chemistry | official | Like dissolves like (U1); solubility curves, effect of temperature on solid/liquid/gas solubility (U2) |
| mass-concentration | 11 | 11 | develop | chemistry | official | g L⁻¹, %(m/v), %(v/v), ppm, with conversions |
| molar-concentration | 11 | 11 | develop | chemistry | official | mol L⁻¹; dilution; standard solutions |
| electrolytic-dissociation | 11 | 11 | intro | chemistry | official | Conductivity solid vs molten ionic compounds; conductivity for salinity; strong/weak ionisation |
| solubility-rules | 11 | 11 | develop | chemistry | official | Solubility tables predict precipitates (U1 AoS 1, U2 AoS 2); Data Book s/ss/i grid |
| gas-pressure | 11 | 11 | intro | chemistry | official | Definition of gas pressure; SLC 25 °C, 100 kPa |
| gas-laws | 11 | 11 | intro | chemistry | typical | Boyle/Charles not named; P–V–T relationships in the VCAA sample Unit 2 plan, via pV = nRT |
| molar-gas-volume | 11 | 11 | develop | chemistry | official | Molar volume or molar mass of a gas from a reaction; Vm = 24.8 L mol⁻¹ at SLC |
| molar-gas-volume | 12 | 12 | develop | chemistry | official | Combustion gas volumes at SLC (U3 AoS 1) |
| ideal-gas-equation | 11 | 11 | develop | chemistry | official | pV = nRT in kPa, Pa, atm, mL, L, °C, K; no partial pressures |
| acids-bases-indicators | 11 | 11 | develop | chemistry | official | Natural vs commercial indicators vs pH meters; Data Book indicator table |
| neutralisation | 11 | 11 | develop | chemistry | official | Salts from neutralisation; antacids |
| reactions-of-acids | 11 | 11 | develop | chemistry | official | With metal carbonates and hydroxides (U2 AoS 1); with metals (U1 reactivity series) |
| acid-base-theories | 11 | 11 | develop | chemistry | official | Brønsted–Lowry; polyprotic, amphiprotic; no Arrhenius or Lewis |
| ph-calculations | 11 | 11 | develop | chemistry | official | Strong acids and bases only, via "Kw at a given temperature"; no pH or Kw formula in the Data Book |
| strong-weak-acids | 11 | 11 | develop | chemistry | official | Strong/weak vs concentrated/dilute, acids and bases |
| reactivity-series | 11 | 11 | develop | chemistry | official | Determined experimentally (U1 AoS 1); displacement with redox equations (U2 AoS 1) |
| oxidation-states | 12 | 12 | develop | chemistry | official | Oxidation numbers identify agents and conjugate redox pairs (U3 AoS 1) |
| redox-electron-transfer | 11 | 11 | develop | chemistry | official | Oxidising and reducing agents; half and overall equations (U2 AoS 1) |
| redox-electron-transfer | 12 | 12 | develop | chemistry | official | Conjugate redox pairs (U3 AoS 1) |
| balancing-redox | 11 | 11 | develop | chemistry | official | Half-equations "including in acidic conditions" |
| balancing-redox | 12 | 12 | develop | chemistry | official | Acidic and basic conditions (U3 AoS 1) |
| electrolysis | 12 | 12 | develop | chemistry | official | Products from the electrochemical series (molten/aqueous, electrodes); commercial cells; green H₂ (PEM); Faraday's laws |
| electrochemical-cells | 11 | 11 | intro | chemistry | typical | "simple primary cells" named as an example application (U2 AoS 1) |
| electrochemical-cells | 12 | 12 | develop | chemistry | official | Primary galvanic, fuel (porous electrodes) and secondary cells; no specific cells |
| electrode-potentials | 12 | 12 | develop | chemistry | official | Electrochemical series (E⊖ at SLC): predictions, max cell voltage, limitations; no Nernst |
| corrosion | 11 | 11 | intro | chemistry | typical | Named as an example redox application (U2 AoS 1); sample plan corrosion practicals |
| exo-endothermic | 12 | 12 | develop | chemistry | official | [au-vic] |
| reaction-profiles | 12 | 12 | develop | chemistry | official | [au-vic] x-axis is reaction progress, not time |
| enthalpy-calorimetry | 11 | 11 | intro | chemistry | official | [au-vic] Specific heat capacity (Unit 2) |
| enthalpy-calorimetry | 12 | 12 | develop | chemistry | official | [au-vic] Solution calorimetry with calibration factor |
| bond-energies | 12 | 12 | intro | chemistry | official | [au-vic] Qualitative; bond-enthalpy tables removed from the 2026 Data Book |
| rate-factors | 12 | 12 | develop | chemistry | official | [au-vic] |
| collision-theory | 12 | 12 | develop | chemistry | official | [au-vic] |
| catalysts | 12 | 12 | develop | chemistry | official | [au-vic] |
| measuring-rate | 12 | 12 | intro | chemistry | official | [au-vic] Practical work; no Δc/Δt dot point |
| maxwell-boltzmann | 12 | 12 | develop | chemistry | typical | [au-vic] Examined (2024), not named in the study design |
| reversible-reactions | 12 | 12 | develop | chemistry | official | [au-vic] |
| equilibrium-constant | 12 | 12 | develop | chemistry | official | [au-vic] Kc with units; Q |
| le-chatelier | 12 | 12 | develop | chemistry | official | [au-vic] |
| organic-intro | 11 | 11 | intro | chemistry | official | [au-vic] Unit 1 AoS 2: five organic families |
| hydrocarbons | 11 | 11 | develop | chemistry | official | [au-vic] |
| homologous-series | 11 | 11 | develop | chemistry | official | [au-vic] |
| homologous-series | 12 | 12 | develop | chemistry | official | [au-vic] Trends within and between series |
| functional-groups | 11 | 11 | intro | chemistry | official | [au-vic] |
| functional-groups | 12 | 12 | develop | chemistry | official | [au-vic] At most two functional groups |
| oxygen-organics | 12 | 12 | develop | chemistry | official | [au-vic] 1°/2°/3° alcohol oxidation; esterification; transesterification to biodiesel |
| nitrogen-organics | 12 | 12 | develop | chemistry | official | [au-vic] Primary amines named; primary amides drawn, not named |
| aromatic-compounds | 12 | 12 | intro | chemistry | official | [new] Benzene's formulas and skeletal structure only (U4 AoS 1); no arene reactions |
| isomerism | 11 | 11 | develop | chemistry | official | [au-vic] Structural isomers up to C5 |
| geometric-isomerism | 12 | 12 | develop | chemistry | typical | [au-vic] cis/trans; examined (2023 report), not named in the study design |
| optical-isomerism | 12 | 12 | develop | chemistry | official | [au-vic] Chiral centres; enantiomers and drug action |
| organic-reaction-types | 12 | 12 | develop | chemistry | official | [au-vic] Equations and conditions, no mechanisms; no dehydration, no Markovnikov |
| reaction-pathways | 12 | 12 | develop | chemistry | official | [au-vic] Unit 4 Outcome 1: design reaction pathways |
| polymers-intro | 11 | 11 | develop | chemistry | official | [au-vic] |
| addition-polymerisation | 11 | 11 | develop | chemistry | official | [au-vic] |
| condensation-polymerisation | 11 | 11 | intro | chemistry | official | [au-vic] |
| condensation-polymerisation | 12 | 12 | develop | chemistry | official | Condensation to proteins, starch, glycogen and lipids; hydrolysis (U4 AoS 1) |
| plastics-and-recycling | 11 | 11 | develop | chemistry | official | Fossil-based vs bioplastics; mechanical, chemical, organic recycling; compostability (U1 AoS 2) |
| alloys | 11 | 11 | intro | chemistry | typical | Not in key knowledge; sample Unit 1 plan models alloy properties |
| food-molecules | 12 | 12 | develop | chemistry | official | [au-vic] Food energy 37/17/16 kJ g⁻¹ |
| carbohydrates | 12 | 12 | develop | chemistry | official | [au-vic] |
| lipids | 12 | 12 | develop | chemistry | official | [au-vic] |
| amino-acids-proteins | 12 | 12 | develop | chemistry | official | [au-vic] |
| photosynthesis-respiration | 12 | 12 | develop | chemistry | official | Equations for photosynthesis, respiration and fermentation are given (U3 AoS 1) |
| ion-tests | 11 | 11 | intro | chemistry | official | Identifying ions by precipitation with solubility tables (U1 AoS 1); flame tests optional only |
| chromatography | 11 | 11 | intro | chemistry | official | [au-vic] Rf |
| chromatography | 12 | 12 | develop | chemistry | official | [au-vic] HPLC |
| titration | 11 | 11 | develop | chemistry | official | Acid–base with indicators, standard solutions, dilution; no back titrations (U2 AoS 2) |
| titration | 12 | 12 | develop | chemistry | official | Redox titrations, excess and limiting; no back titrations (U4 AoS 2) |
| spectrophotometry | 11 | 11 | develop | chemistry | official | Colorimetry and/or UV–vis with a calibration curve (U2 AoS 2); Beer–Lambert not named |
| functional-group-tests | 12 | 12 | develop | chemistry | official | [au-vic] Bromine water, acidified dichromate, carbonate; no Tollens or Fehling |
| ir-nmr-ms | 11 | 11 | intro | chemistry | official | [new] Mass spectrometry of elements for relative atomic mass, no instrument detail (U1 AoS 2) |
| ir-nmr-ms | 12 | 12 | develop | chemistry | official | [au-vic] MS, IR, 13C and 1H NMR (n+1 rule) |
| water-chemistry | 11 | 11 | develop | chemistry | official | Anomalous properties via H-bonding; drinking-water distribution (U2 AoS 1); no hard water |
| metals-chemistry | 11 | 11 | intro | chemistry | official | Common properties; reactions of metals with water, acids and oxygen (U1 AoS 1) |
| transition-metals | 11 | 11 | intro | chemistry | official | Transition-metal ions in formulas; ions or complexes by colorimetry; no complex chemistry |
| atmosphere-climate | 11 | 11 | develop | chemistry | official | CO₂, CH₄, H₂O absorb IR; natural vs enhanced greenhouse effect (U2 AoS 2) |
| atmosphere-climate | 12 | 12 | develop | chemistry | official | Net greenhouse-gas mass or volume from combustion (U3 AoS 1) |
| pollution | 11 | 11 | intro | chemistry | official | Heavy metals and salts in water/soil; salinity (U2 AoS 2); acid rain, ocean acidification as examples |
| water-treatment | 11 | 11 | intro | chemistry | official | Precipitation to remove impurities from water (U2 AoS 2) |
| resources-sustainability | 11 | 11 | develop | chemistry | official | Critical elements; circular economy (metals, plastics); biomass feedstocks; green chemistry (U1) |
| resources-sustainability | 12 | 12 | develop | chemistry | official | Green chemistry principles in fuel cells, equilibrium and organic manufacture (U3–4) |
| fuels-energy | 12 | 12 | develop | chemistry | official | [au-vic] kJ g-1 and kJ mL-1; fossil fuels vs biofuels |
| industrial-processes | 12 | 12 | develop | chemistry | official | [au-vic] Rate vs yield; no named process |
| chemical-safety | 11 | 11 | intro | chemistry | official | Health and environmental hazards of everyday organic products (U1 AoS 2) |
| lab-safety | 11 | 12 | develop | chemistry | official | Risk assessments using SDS; OHS guidelines (key science skills) |
| measurement-technique | 11 | 12 | develop | chemistry | official | Accuracy, precision, resolution; volumetric glassware in titrations |
| preparing-solutions | 11 | 11 | develop | chemistry | official | Standard solutions and dilutions (U2 AoS 2) |
| preparing-substances | 11 | 11 | intro | chemistry | official | Collecting a gas from a reaction to find molar volume (U2 practicals) |
| organic-synthesis-techniques | 12 | 12 | develop | chemistry | official | [au-vic] Distillation, solvent extraction, melting point |
| units-and-conversions | 11 | 12 | develop | chemistry | official | Concentration and gas unit conversions; Data Book conversions and prefixes |
| significant-figures-uncertainty | 11 | 12 | develop | chemistry | official | Explicit s.f. rules ("400 mL" = 3 s.f.); qualitative uncertainty; random vs systematic error |
| graphs-and-data | 11 | 12 | develop | chemistry | official | Linear and non-linear graphs; calibration curves; temperature–time, concentration–time |
| chemical-calculations | 11 | 12 | develop | chemistry | official | Multi-step mole, gas, concentration, energy and Faraday calculations; Data Book use |
| macro-micro-symbolic | 11 | 12 | develop | chemistry | official | Every unit: symbols, formulas, equations to represent and explain observations |
| molecular-models | 11 | 12 | develop | chemistry | official | Modelling structures; explaining models and their limitations (key science skills) |
| structural-formulas | 11 | 11 | develop | chemistry | official | [au-vic] |
| structural-formulas | 12 | 12 | develop | chemistry | official | [au-vic] Skeletal formulas required |
| reference-tables | 11 | 12 | develop | chemistry | official | Data Book "an integral part of the study design"; solubility tables, electrochemical series |
| scientific-method | 11 | 12 | develop | chemistry | official | Aims, variables, hypotheses; U2 AoS 3 and U4 AoS 3 investigations |
| evaluating-experiments | 11 | 12 | develop | chemistry | official | Errors, outliers, limitations, improving precision (key science skills) |
| scientific-communication | 11 | 12 | develop | chemistry | official | Reports; U4 scientific poster (≤ 600 words); referencing |
| nature-of-science | 11 | 12 | develop | chemistry | official | Aim/hypothesis/model/theory/law (U2 AoS 3); evidence for or against models (U4 AoS 3); no history of science |
| socio-scientific-issues | 11 | 12 | develop | chemistry | official | Media texts; sociocultural, economic, political, legal, ethical factors; SDGs, circular economy |

**Not placed (absent from the VCE Chemistry key knowledge for Years 11–12):**
- matter: particle-model (assumed from Years 7–10)
- mixtures: mixture-types, colloids (emulsifiers appear only in a sample-plan research task)
- atomic-structure: atomic-models-history (Levels 9–10); atomic-spectra. Flame tests appear only
  as an optional learning context. There are no emission spectra or E = hν.
- periodic-table: periodic-table-history
- bonding: hybridisation, lattice-energy
- reactions: physical-chemical-change, conservation-of-mass (both Levels 7–10; used implicitly)
- gases: kinetic-molecular-theory
- acids-bases: acid-dissociation-constants, buffers, salt-hydrolysis
- redox: redox-oxygen. Oxidation is defined by electrons; U1 speaks only of metals' "ability to
  undergo oxidation" with oxygen, water and acids.
- energetics: hess-law, entropy-gibbs
- kinetics: rate-laws
- equilibrium: solubility-product
- organic: crude-oil-fuels (fossil fuels only as fuels, no refining), reaction-mechanisms
- polymers-materials: materials. Nanomaterials, composites and glass appear only as optional U1
  AoS 3 investigation examples.
- biochemistry: nucleic-acids
- nuclear: radioactivity, nuclear-equations, half-life, fission-fusion. The study design has no
  nuclear chemistry; whether VCE Physics teaches it was not checked.
- analytical: gas-tests. AAS is not a canonical id, but note it is absent too.
- descriptive: air-oxygen-hydrogen, inorganic-compound-classes, non-metals-chemistry. Green
  hydrogen is placed under electrolysis.
- applied: metal-extraction. Metals are "mined, refined" only in the recycling context, with no
  extraction chemistry.
- skills-models: particle-diagrams

**Areas fully covered for Years 11–12:**
- The whole study design was read for this report: every key knowledge dot point of Units 1–4,
  the key science skills table and "Terms used in this study".
- Every canonical area is therefore **fully covered for Years 11–12**:
  - content: matter, mixtures, atomic-structure, periodic-table, bonding, nomenclature,
    reactions, stoichiometry, solutions, gases, acids-bases, redox, energetics, kinetics,
    equilibrium, organic, polymers-materials, biochemistry, nuclear (covered, empty), analytical,
    descriptive, applied
  - skills: skills-practical, skills-quantitative, skills-models, skills-inquiry
- For Years 11–12 an absence means "not in VCE Chemistry".

## 9. Notes for the au-vic.ts update

- Rows marked [new] add to areas already in au-vic.ts:
  - `aromatic-compounds` 12 intro
  - `ir-nmr-ms` 11 intro
  - `condensation-polymerisation` 12 develop
  - `photosynthesis-respiration` 12 develop (biochemistry, not previously placed)
- `coveredAreas`:
  - After this report *and* the Years 7–10 report, drop `coveredAreas: AU_COVERED_AREAS` from
    AU_VIC so that it defaults to all areas.
  - Do not change `AU_COVERED_AREAS` itself: the other states still use it.
  - If the Years 7–10 report lands later, keep the four areas until both are in, because
    `coveredAreas` is not per year.
- `researchedOn` becomes `2026-09-25`. `report` could list both files, or this report could be
  merged into australia-victoria.md as new sections.
- `basis` needs no change.

## 10. Unverified or open points

1. **Units 1–2 = Year 11 and Units 3–4 = Year 12** is usual practice, not a rule (see §1).
   Students can take Units 1–2 in Year 10 or start at Unit 3.
2. **Depth of Year 11 content.** Units 1–2 have no external exam and no examiners' reports.
   For example:
   - the extent of subshell configurations is unknown: Z range, Cr/Cu exceptions, orbital-box
     diagrams
   - so is whether titration curves or pH at other temperatures are taught
   
   These are unverified.
3. **Is Unit 1–2 content examinable in the Unit 3–4 exam?** The specifications examine Unit 3–4
   key knowledge. Unit 1–2 skills (moles, pH, titration) are assumed in practice **(unverified)**.
4. **Gas laws and alloys** are placed as `typical` from the VCAA sample teaching plans only. The
   plans are dated 2022 and may not be current.
5. **"For example" items** (corrosion, simple primary cells, acid rain, ocean acidification) are
   `typical`. VCAA may treat them as required examples.
6. **Kw at a given temperature.** The study design mentions temperature dependence, but the 2026
   Data Book gives no Kw value or pH formula. How Kw at other temperatures is supplied (in the
   question?) is unverified.
7. **Nanomaterials, emission spectra, flame tests and AAS** are absent from key knowledge. They
   appear only as optional contexts (flame tests, nanomaterials) or not at all (AAS).
8. **The study design file** sits in a "2026-02" folder. Whether it contains amendments beyond
   the 2022 original was not compared with the original (as in australia-victoria.md §6).
9. The copied rows inherit the unverified points of australia-victoria.md §6.

## 11. Sources

**Read for this report (VCAA)**
- https://www.vcaa.vic.edu.au/sites/default/files/2026-02/2023ChemistrySD.docx (VCE Chemistry Study Design, full key knowledge, key science skills, "Terms used in this study")
- https://www.vcaa.vic.edu.au/sites/default/files/2026-02/2026-ChemistryDataBook_0.pdf (2026 Data Book, Version 2)
- https://www.vcaa.vic.edu.au/sites/default/files/Documents/vce/chemistry/supportmaterials/2022ChemistrySampleTeachingPlanUnit1.docx (sample teaching plan, Unit 1)
- https://www.vcaa.vic.edu.au/sites/default/files/Documents/vce/chemistry/supportmaterials/2022ChemistrySampleTeachingPlanUnit2.docx (sample teaching plan, Unit 2)
- https://www.vcaa.vic.edu.au/curriculum/vce-curriculum/vce-study-designs/chemistry/teaching-and-learning (support material index)

**Reused via australia-victoria.md (organic, energetics, kinetics, equilibrium rows)**
- https://www.vcaa.vic.edu.au/curriculum/vce-curriculum/vce-study-designs/chemistry/chemistry
- https://www.vcaa.vic.edu.au/sites/default/files/2025-04/chemistry_specs_w.docx (examination specifications)
- https://www.vcaa.vic.edu.au/sites/default/files/Documents/exams/chemistry/chemistry-sample-w.pdf (sample exam, June 2024)
- https://www.vcaa.vic.edu.au/sites/default/files/Documents/vce/chemistry/supportmaterials/2022ChemistrySampleTeachingPlanUnit3.docx
- https://www.vcaa.vic.edu.au/sites/default/files/Documents/vce/chemistry/supportmaterials/2022ChemistrySampleTeachingPlanUnit4.docx
- 2023–2025 examiners' reports and 2024–2026 NHT reports: see australia-victoria.md §7
