// src/core-engine/data/curriculum/countries/au-vic.ts
//
// Victoria: Victorian Curriculum F–10 Version 2.0 Science (Levels 7–8 and 9–10,
// required in government schools from 2026) and the VCE Chemistry Study Design
// (Units 1–2 = Year 11 from 2023, Units 3–4 = Year 12 from 2024).
// Sources: docs/curriculum/countries/australia-victoria-7-10.md §8 and
// docs/curriculum/countries/australia-victoria-vce.md §8 (generated from their
// placement tables, then reviewed); organic chemistry, kinetics, energetics and
// equilibrium in depth in docs/curriculum/countries/australia-victoria.md.
//
// A full record (no `coveredAreas`): every area was researched for Years 7–12,
// so a concept with no placement is not taught. This is the site's current tag
// set, so `YearLevel` can now be derived from it (CROSS_COUNTRY_MAP.md §6.4 step 3).
//
// The Victorian Curriculum sets two-year bands. Where both of VCAA's example
// Years 7–10 plans (August 2026) put a topic in the same year, it is placed in
// that year as `typical`; otherwise it spans the band as `official`.

import type { JurisdictionCurriculum } from '../../../types/curriculum';
import { at } from '../placement';
import { australianYears, chemistry as c } from './au-common';

export const AU_VIC: JurisdictionCurriculum = {
  code: 'AU-VIC',
  country: 'AU',
  name: 'Australia — Victoria',
  basis: 'Victorian Curriculum F–10 Version 2.0 Science (Levels 7–10, with VCAA example plans 2026); VCAA VCE Chemistry Study Design (Units 1–2 from 2023, Units 3–4 from 2024); 2026 VCE Data Book.',
  researchedOn: '2026-09-25',
  report: 'docs/curriculum/countries/australia-victoria.md',
  reviewedByTeacher: false,
  years: australianYears('Senior secondary (VCE)', 'VCE Chemistry is an elective: Units 1–2 in Year 11, Units 3–4 in Year 12.'),
  tracks: { chemistry: 'VCE Chemistry (Units 1–4)' },
  change: {
    stability: 'stable',
    reason: 'Victorian Curriculum 2.0 Science is new (required from 2026) and the VCE study design dates from 2023/2024; no replacement is announced.',
    lastMajorRevision: { year: 2023, what: 'VCE Chemistry Study Design (Units 1–2 from 2023, Units 3–4 from 2024); Victorian Curriculum 2.0 Science from 2026' },
    typicalIntervalYears: [5, 7],
    mechanism: 'scheduled',
    minorUpdates: 'VCE Data Book changes (bond enthalpies and the -amide row removed for 2026); exam specifications; VCAA example plans.',
    upcoming: [],
    recheckBy: '2027-06-30',
  },
  placements: {
    'particle-model': [at([7, 8], 'develop', { note: 'VC2S8U05, VC2S8U06 ("modelled using the particle model"); both VCAA plans start it in Y7, and CAP1 revisits it in Y8' })],
    'states-of-matter': [
      at([7, 8], 'develop', { note: 'VC2S8U05: melting, boiling, sublimation; both plans start in Y7 (CAP2 unit "States of matter"); heating curves not named' }),
      at(11, 'develop', { ...c, note: 'Water in three states; latent heat of vaporisation; mp/bp from structure and bonding (U1 AoS 1, U2 AoS 1)' }),
    ],
    'physical-properties': [
      at([7, 8], 'develop', { note: 'VC2S8U05: melting/boiling point, density, viscosity, compressibility' }),
      at(11, 'develop', { ...c, note: 'Properties of molecular, metallic, ionic and network (diamond/graphite) substances from structure (U1 AoS 1)' }),
    ],
    density: [
      at(7, 'develop', { status: 'typical', note: 'VC2S8U05 names density; density column (El.); both plans Y7 (CAP1 7.3 "explain density"); no ρ = m/V calculation named' }),
      at(11, 'intro', { ...c, note: 'Ice vs liquid water only (U2 AoS 1); ρ = m/V is in the Data Book' }),
    ],
    'heat-and-temperature': [
      at([7, 8], 'intro', { note: 'VC2S8U15: thermal energy; conduction, convection, radiation (physics); El. VC2S8U05: heat absorbed or released changes particle motion' }),
      at([9, 10], 'develop', { note: 'VC2S10U14: energy transfer by conduction, convection and radiation explained with the particle model (physics)' }),
      at(11, 'develop', { ...c, note: 'Specific heat capacity of water "including units and symbols"; latent heat of vaporisation (U2 AoS 1)' }),
    ],
    'elements-compounds-mixtures': [
      at([7, 8], 'develop', { note: 'VC2S8U06, VC2S8U07; CAP2 Y7, CAP1 Y8' }),
      at(11, 'intro', { ...c, note: 'Definitions of element, isotope, ion (U1 AoS 1); purity via chromatography' }),
    ],
    'mixture-types': [at(7, 'develop', { status: 'typical', note: 'VC2S8U06: homogeneous/heterogeneous, solutions; both plans Y7' })],
    'separation-techniques': [
      at(7, 'develop', { status: 'typical', note: 'VC2S8U06: filtration, decantation, evaporation, crystallisation, magnetic separation, distillation, chromatography; both plans Y7' }),
      at(11, 'develop', { ...c, note: 'Chromatography (U1 AoS 1); precipitation to remove impurities from water (U2 AoS 2)' }),
      at(12, 'develop', { ...c, note: 'Simple and fractional distillation, solvent extraction (U4 AoS 2)' }),
    ],
    colloids: [at([7, 8], 'intro', { status: 'typical', note: 'El. VC2S8U07: solutions, suspensions and colloids as classes only' })],
    'subatomic-particles': [
      at(9, 'develop', { status: 'typical', note: 'VC2S10U06 (band 9–10 official); both plans Y9; mass and charge (El.); atomic/mass number not named; ions only in the VLP unit (CAP2 9.3)' }),
      at(11, 'develop', { ...c, note: 'Atomic number, mass number, p/n/e counts, ion notation (U1 AoS 1)' }),
    ],
    'atomic-models-history': [at(9, 'develop', { status: 'typical', note: 'VC2S10U06: model changed with the discovery of e⁻, p⁺, n; both plans Y9' })],
    isotopes: [
      at(9, 'intro', { status: 'typical', note: 'El. VC2S10U06: neutron number, unstable isotopes; relative atomic mass not in 7–10 (VCE Unit 1)' }),
      at(11, 'develop', { ...c, note: 'Relative isotopic mass on the ¹²C scale; relative atomic mass from mass-spectrometry data (U1 AoS 2)' }),
    ],
    'electron-shells': [
      at([9, 10], 'intro', { status: 'typical', note: 'El. VC2S10U07: Bohr model, electron shells, outer-shell patterns; not in the content description itself' }),
      at(11, 'develop', { ...c, note: 'Shell configurations (U1 AoS 1)' }),
    ],
    'atomic-spectra': [at([9, 10], 'intro', { status: 'typical', note: 'El. VC2S10U07: flame tests and emission spectra; El. VC2S10U13: stellar spectra' })],
    'periodic-table-structure': [
      at([9, 10], 'develop', { note: 'VC2S10U07: groups/periods, metals and non-metals; CAP1 Y10, CAP2 Y9' }),
      at(11, 'develop', { ...c, note: '"organisational tool"; Data Book table with electronegativities' }),
    ],
    'periodic-table-history': [
      at([7, 8], 'intro', { status: 'typical', note: 'El. VC2S8U07 (Mendeleev\'s first table); El. VC2S8H01 (different forms of the table)' }),
      at([9, 10], 'intro', { status: 'typical', note: 'El. VC2S10H01: how the table was disputed and refined; CAP2 9.5 "evaluate the development of the periodic table"' }),
    ],
    'group-chemistry': [
      at([9, 10], 'intro', { status: 'typical', note: 'El. VC2S10U07: same-group similarity through reactions with oxygen, water and acids; no group named' }),
      at(11, 'intro', { ...c, status: 'typical', note: 'Reactivity as a periodic trend; no group family named in key knowledge; Group 16 hydrides (U2)' }),
    ],
    'periodic-trends': [
      at([9, 10], 'intro', { note: 'VC2S10U07: atomic size, reactivity, metallic and non-metallic properties; ionisation energy and electronegativity not named' }),
      at(11, 'develop', { ...c, note: 'Atomic radius, electronegativity, first ionisation energy, metallic character, reactivity' }),
    ],
    'periodic-law-electronic': [
      at([9, 10], 'intro', { note: 'VC2S10U07: organisation related to atomic structure; El.: patterns of outer-shell electrons' }),
      at(11, 'develop', { ...c, note: 'Structure (shell and subshell configurations) ↔ position and properties' }),
    ],
    'chemical-symbols-formulas': [
      at([7, 8], 'develop', { note: 'VC2S8U07: symbols for elements, formulas for molecules and compounds; CAP2 Y7, CAP1 Y8' }),
      at(11, 'develop', { ...c, note: 'Molecular and structural formulas; Data Book element names' }),
    ],
    'physical-chemical-change': [
      at(8, 'develop', { status: 'typical', note: 'VC2S8U08 (band 7–8 official); both plans Y8' }),
      at([9, 10], 'develop', { note: 'VC2S10U08: reactions "involve the rearrangement of atoms"' }),
    ],
    'conservation-of-mass': [at([9, 10], 'develop', { note: 'VC2S10U08; closed vs open systems (El.); CAP1 Y9 (9.7) and Y10 (10.5), CAP2 Y10' })],
    'writing-equations': [
      at([9, 10], 'develop', { note: 'VC2S10U08: word and symbol equations; reactants and products; state symbols not named' }),
      at(11, 'develop', { ...c, note: 'Full and ionic equations with (s), (l), (aq), (g)' }),
    ],
    'balancing-equations': [
      at([9, 10], 'develop', { note: 'VC2S10U08: "simple" balanced equations; El.: equations "easy to balance"' }),
      at(11, 'develop', { ...c, note: 'Balanced equations required throughout U1–2' }),
    ],
    'reaction-types': [
      at(10, 'develop', { status: 'typical', note: 'VC2S10U09 (band official): synthesis, decomposition, displacement; both plans Y10; neutralisation and precipitation are classed as displacement' }),
      at(11, 'develop', { ...c, note: 'Precipitation, acid–base (proton transfer), redox (electron transfer), displacement; synthesis/decomposition not used' }),
    ],
    combustion: [
      at([7, 8], 'intro', { status: 'typical', note: 'El. VC2S8I02: the fire triangle (heat, fuel, oxygen)' }),
      at([9, 10], 'intro', { note: 'VC2S10U10: combustion of fossil fuels in the carbon cycle; El. VC2S10U09: metals with oxygen; complete/incomplete not named' }),
      at(12, 'develop', { ...c, note: 'Complete and incomplete' }),
    ],
    'dissolving-solubility': [
      at(7, 'intro', { status: 'typical', note: 'VC2S8U06 names solutions; El.: dilute, concentrated, saturated, supersaturated; both plans Y7; no solubility curves' }),
      at(11, 'develop', { ...c, note: 'Like dissolves like (U1); solubility curves, effect of temperature on solid/liquid/gas solubility (U2)' }),
    ],
    'mass-concentration': [
      at([7, 8], 'intro', { status: 'typical', note: 'El. VC2S8U07: "why mixtures are represented by percentages"; no calculation named' }),
      at(11, 'develop', { ...c, note: 'g L⁻¹, %(m/v), %(v/v), ppm, with conversions' }),
    ],
    'gas-pressure': [
      at(7, 'intro', { status: 'typical', note: 'VC2S8U05 names gas pressure and compressibility (band official); both plans Y7 (CAP1 7.3); El. VC2S8I01: a balloon heated and cooled' }),
      at(11, 'intro', { ...c, note: 'Definition of gas pressure; SLC 25 °C, 100 kPa' }),
    ],
    'kinetic-molecular-theory': [at([7, 8], 'intro', { note: 'VC2S8U05 names "the particle and kinetic theories of matter"; no gas laws' })],
    'acids-bases-indicators': [
      at(8, 'intro', { status: 'typical', note: 'El. VC2S8U08: universal indicator and vinegar in a mystery-powder test (VC2S8U08 is Y8 in both plans); no pH scale, no acid/base content description' }),
      at(11, 'develop', { ...c, note: 'Natural vs commercial indicators vs pH meters; Data Book indicator table' }),
    ],
    neutralisation: [
      at(10, 'intro', { status: 'typical', note: 'El. VC2S10U09: neutralisation as a "displacement" reaction; VC2S10U09 is Y10 in both plans' }),
      at(11, 'develop', { ...c, note: 'Salts from neutralisation; antacids' }),
    ],
    'reactions-of-acids': [
      at([9, 10], 'intro', { status: 'typical', note: 'El. VC2S10U09 (metal + acid); El. VC2S10U07 (elements with acids); El. VC2S10I03 (Zn + dilute H₂SO₄). 1.0 had it in a content description (VCSSU126); 2.0 does not' }),
      at(11, 'develop', { ...c, note: 'With metal carbonates and hydroxides (U2 AoS 1); with metals (U1 reactivity series)' }),
    ],
    'reactivity-series': [
      at([9, 10], 'intro', { status: 'typical', note: 'El. VC2S10U07 (reactivity of elements), El. VC2S10U09 (displacement, metal + acid); CAP1 10.1 "reactivity of different metals"; no series named' }),
      at(11, 'develop', { ...c, note: 'Determined experimentally (U1 AoS 1); displacement with redox equations (U2 AoS 1)' }),
    ],
    'exo-endothermic': [
      at(10, 'intro', { status: 'typical', note: 'VC2S10U09 (band official); hot and cold packs (El.); both plans Y10; no ΔH. In 7–8: "a temperature change" as a sign of reaction (VC2S8U08)' }),
      at(12, 'develop', c),
    ],
    'rate-factors': [
      at(10, 'intro', { status: 'typical', note: 'VC2S10U09 (band official): temperature, concentration, surface area, catalysts; both plans Y10 (CAP1 10.10)' }),
      at(12, 'develop', c),
    ],
    catalysts: [
      at(10, 'intro', { status: 'typical', note: 'VC2S10U09 names catalysts (band official); both plans Y10' }),
      at(12, 'develop', c),
    ],
    'measuring-rate': [
      at(10, 'intro', { status: 'typical', note: 'El. VC2S10I01, VC2S10I03 (number of trials); CAP1 10.10 "collect and represent data to compare reaction rates"; no rate calculation' }),
      at(12, 'intro', { ...c, note: 'Practical work; no Δc/Δt dot point' }),
    ],
    'crude-oil-fuels': [at(7, 'intro', { status: 'typical', note: 'El. VC2S8U06: separation of crude oil into components (simulation or video); U06 is Y7 in both plans' })],
    'plastics-and-recycling': [
      at([7, 8], 'intro', { status: 'typical', note: 'El. VC2S8H03 and VC2S8H04: biodegradable packaging, household waste separation, recycling; no polymer chemistry' }),
      at(11, 'develop', { ...c, note: 'Fossil-based vs bioplastics; mechanical, chemical, organic recycling; compostability (U1 AoS 2)' }),
    ],
    materials: [at([7, 8], 'intro', { status: 'typical', note: 'El. VC2S8U08: how a substance\'s properties affect its production or use; El. VC2S8H03: new building materials' })],
    'food-molecules': [
      at(8, 'intro', { status: 'typical', note: 'El. VC2S8U08: iodine test distinguishes corn starch in the mystery-powder task; marginal' }),
      at(12, 'develop', { ...c, note: 'Food energy 37/17/16 kJ g-1' }),
    ],
    'photosynthesis-respiration': [
      at(9, 'intro', { status: 'typical', note: 'VC2S10U10 names photosynthesis and respiration (band official); both plans Y9; chemical equations not named' }),
      at(12, 'develop', { ...c, note: 'Equations for photosynthesis, respiration and fermentation are given (U3 AoS 1)' }),
    ],
    radioactivity: [at(9, 'develop', { status: 'typical', note: 'VC2S10U06 (band official); alpha, beta, gamma (El.); both plans Y9' })],
    'nuclear-equations': [at([9, 10], 'intro', { status: 'unverified', note: 'El. VC2S10U06 describes decay "in simple terms" (Rn-222 → α); writing or balancing nuclear equations is not stated' })],
    'half-life': [at(9, 'intro', { status: 'typical', note: 'El. VC2S10U06, VC2S10I05; CAP1 9.9 "What is a half-life?"; both plans Y9' })],
    'fission-fusion': [at([9, 10], 'intro', { status: 'typical', note: 'El. VC2S10U16 (physics): fission vs fusion as energy sources' })],
    'gas-tests': [at(8, 'develop', { status: 'typical', note: 'VC2S8U08: laboratory preparation and testing of O₂, CO₂, H₂ (band official); both plans Y8' })],
    'ion-tests': [
      at([9, 10], 'intro', { status: 'typical', note: 'El. VC2S10U07: flame tests only' }),
      at(11, 'intro', { ...c, note: 'Identifying ions by precipitation with solubility tables (U1 AoS 1); flame tests optional only' }),
    ],
    chromatography: [
      at(7, 'intro', { status: 'typical', note: 'VC2S8U06 names chromatography (band official); paper chromatography (El.); both plans Y7; no Rf' }),
      at(11, 'intro', { ...c, note: 'Rf' }),
      at(12, 'develop', { ...c, note: 'HPLC' }),
    ],
    'air-oxygen-hydrogen': [at(8, 'intro', { status: 'typical', note: 'VC2S8U08: preparing and testing O₂ and H₂; both plans Y8' })],
    'metals-chemistry': [
      at([9, 10], 'intro', { status: 'typical', note: 'El. VC2S10U07: reactions with oxygen, water and acids; properties of metals and non-metals' }),
      at(11, 'intro', { ...c, note: 'Common properties; reactions of metals with water, acids and oxygen (U1 AoS 1)' }),
    ],
    'atmosphere-climate': [
      at([9, 10], 'develop', { note: 'VC2S10U10 (carbon cycle, greenhouse effect El.) and VC2S10U11 (climate change); U10 Y9 in both plans, U11 split' }),
      at(11, 'develop', { ...c, note: 'CO₂, CH₄, H₂O absorb IR; natural vs enhanced greenhouse effect (U2 AoS 2)' }),
      at(12, 'develop', { ...c, note: 'Net greenhouse-gas mass or volume from combustion (U3 AoS 1)' }),
    ],
    pollution: [
      at([9, 10], 'intro', { status: 'typical', note: 'El. VC2S10U10 (pesticides leaching into waterways); El. VC2S10H02 (modelling atmospheric pollution); no acid rain or ozone' }),
      at(11, 'intro', { ...c, note: 'Heavy metals and salts in water/soil; salinity (U2 AoS 2); acid rain, ocean acidification as examples' }),
    ],
    'water-treatment': [
      at(7, 'intro', { status: 'typical', note: 'El. VC2S8U06 (purifying water), El. VC2S8U09 (desalination); both content descriptions Y7 in both plans' }),
      at(11, 'intro', { ...c, note: 'Precipitation to remove impurities from water (U2 AoS 2)' }),
    ],
    'resources-sustainability': [
      at(7, 'develop', { status: 'typical', note: 'VC2S8U09 (band official); both plans Y7' }),
      at([9, 10], 'intro', { status: 'typical', note: 'El. VC2S10U08 and VC2S10H04: green chemistry principles (waste, energy use)' }),
      at(11, 'develop', { ...c, note: 'Critical elements; circular economy (metals, plastics); biomass feedstocks; green chemistry (U1)' }),
      at(12, 'develop', { ...c, note: 'Green chemistry principles in fuel cells, equilibrium and organic manufacture (U3–4)' }),
    ],
    'fuels-energy': [
      at(7, 'intro', { status: 'typical', note: 'VC2S8U09: renewable vs non-renewable energy production (band official); El.: hydrogen vehicles, fossil-fuel depletion; both plans Y7' }),
      at([9, 10], 'intro', { note: 'VC2S10U10 (fossil-fuel combustion), VC2S10U11 (power generation), VC2S10U16 (combustion of oil, gas, coal); no energy-per-gram values' }),
      at(12, 'develop', { ...c, note: 'kJ g-1 and kJ mL-1; fossil fuels vs biofuels' }),
    ],
    'metal-extraction': [at(10, 'intro', { status: 'typical', note: 'El. VC2S10U09: decomposition to extract metals; CAP1 10.5: displacement to extract and recycle metals; U09 Y10 in both plans' })],
    'lab-safety': [
      at([7, 8], 'develop', { note: 'VC2S8I02: recognising and managing risks; CAP1 opens Year 7 with "Why is safety the first step in Science?" (7.1)' }),
      at([9, 10], 'develop', { note: 'VC2S10I02: safe investigations, risk assessments; El.: hazards of chemicals in reaction experiments' }),
      at([11, 12], 'develop', { ...c, note: 'Risk assessments using SDS; OHS guidelines (key science skills)' }),
    ],
    'measurement-technique': [
      at([7, 8], 'develop', { note: 'VC2S8I03: equipment and precision; El.: reading a meniscus' }),
      at([9, 10], 'develop', { note: 'VC2S10I03: precision, calibration (El.), sample size' }),
      at([11, 12], 'develop', { ...c, note: 'Accuracy, precision, resolution; volumetric glassware in titrations' }),
    ],
    'preparing-substances': [
      at(8, 'intro', { status: 'typical', note: 'VC2S8U08: laboratory preparation of O₂, CO₂, H₂ (band official); both plans Y8; no salt preparation' }),
      at(11, 'intro', { ...c, note: 'Collecting a gas from a reaction to find molar volume (U2 practicals)' }),
    ],
    'units-and-conversions': [
      at([7, 8], 'intro', { note: 'Band description: appropriate units; El. VC2S8I03: standard units, exponential notation' }),
      at([9, 10], 'develop', { note: 'Band description: units for proportional relationships; El. VC2S10U13: scientific notation' }),
      at([11, 12], 'develop', { ...c, note: 'Concentration and gas unit conversions; Data Book conversions and prefixes' }),
    ],
    'significant-figures-uncertainty': [
      at([7, 8], 'intro', { note: 'VC2S8I03 (precision), VC2S8I06 (sources of error); significant figures not named' }),
      at([9, 10], 'develop', { note: 'VC2S10I03, VC2S10I06 ("areas of uncertainty"); El.: random vs systematic errors, reading between scale marks' }),
      at([11, 12], 'develop', { ...c, note: 'Explicit s.f. rules ("400 mL" = 3 s.f.); qualitative uncertainty; random vs systematic error' }),
    ],
    'graphs-and-data': [
      at([7, 8], 'develop', { note: 'VC2S8I04, VC2S8I05' }),
      at([9, 10], 'develop', { note: 'VC2S10I04 (including descriptive statistics), VC2S10I05' }),
      at([11, 12], 'develop', { ...c, note: 'Linear and non-linear graphs; calibration curves; temperature–time, concentration–time' }),
    ],
    'particle-diagrams': [at([7, 8], 'develop', { note: 'VC2S8U06 ("modelled using the particle model"); El. VC2S8U05, VC2S8U06: particle representations of pure substances and mixtures' })],
    'macro-micro-symbolic': [
      at([7, 8], 'intro', { note: 'Band description: sub-microscopic interactions determine macroscopic properties' }),
      at([9, 10], 'develop', { note: 'Band description (macroscopic and microscopic levels); El. VC2S10I04: molecular models vs word and balanced equations' }),
      at([11, 12], 'develop', { ...c, note: 'Every unit: symbols, formulas, equations to represent and explain observations' }),
    ],
    'molecular-models': [
      at([7, 8], 'develop', { note: 'VC2S8U07: 2D and 3D models of elements, compounds and mixtures' }),
      at([9, 10], 'develop', { note: 'VC2S10U08: a range of representations; El. VC2S10U09: molecular models' }),
      at([11, 12], 'develop', { ...c, note: 'Modelling structures; explaining models and their limitations (key science skills)' }),
    ],
    'reference-tables': [
      at([9, 10], 'intro', { status: 'typical', note: 'Using the periodic table for patterns (VC2S10U07; CAP1 10.1 "use data on element properties"); no data book' }),
      at([11, 12], 'develop', { ...c, note: 'Data Book "an integral part of the study design"; solubility tables, electrochemical series' }),
    ],
    'scientific-method': [
      at([7, 8], 'develop', { note: 'VC2S8I01, VC2S8I02' }),
      at([9, 10], 'develop', { note: 'VC2S10I01, VC2S10I02' }),
      at([11, 12], 'develop', { ...c, note: 'Aims, variables, hypotheses; U2 AoS 3 and U4 AoS 3 investigations' }),
    ],
    'evaluating-experiments': [
      at([7, 8], 'develop', { note: 'VC2S8I06' }),
      at([9, 10], 'develop', { note: 'VC2S10I06' }),
      at([11, 12], 'develop', { ...c, note: 'Errors, outliers, limitations, improving precision (key science skills)' }),
    ],
    'scientific-communication': [
      at([7, 8], 'develop', { note: 'VC2S8I07, VC2S8I08' }),
      at([9, 10], 'develop', { note: 'VC2S10I07, VC2S10I08' }),
      at([11, 12], 'develop', { ...c, note: 'Reports; U4 scientific poster (≤ 600 words); referencing' }),
    ],
    'nature-of-science': [
      at([7, 8], 'develop', { note: 'VC2S8H01, VC2S8H02' }),
      at([9, 10], 'develop', { note: 'VC2S10H01, VC2S10H02; VC2S10U06 (history of atomic models)' }),
      at([11, 12], 'develop', { ...c, note: 'Aim/hypothesis/model/theory/law (U2 AoS 3); evidence for or against models (U4 AoS 3); no history of science' }),
    ],
    'socio-scientific-issues': [
      at([7, 8], 'develop', { note: 'VC2S8H03, VC2S8H04' }),
      at([9, 10], 'develop', { note: 'VC2S10H03, VC2S10H04' }),
      at([11, 12], 'develop', { ...c, note: 'Media texts; sociocultural, economic, political, legal, ethical factors; SDGs, circular economy' }),
    ],
    'electron-configuration': [at(11, 'develop', { ...c, note: '"shell and subshell electronic configurations"; extent (Z range, Cr/Cu, orbital diagrams) unverified' })],
    'ionic-bonding': [at(11, 'develop', { ...c, note: 'Electron transfer; crystal structure; brittleness, conductivity solid vs molten' })],
    'covalent-bonding': [at(11, 'develop', { ...c, note: 'Eleven named small molecules incl. N₂, CO₂, C₂H₄' })],
    'metallic-bonding': [at(11, 'develop', { ...c, note: 'Metallic bonding and metallic crystals explain properties; no band theory' })],
    'bond-polarity': [at(11, 'develop', { ...c, note: 'Polar/non-polar character from shape; electronegativity trend' })],
    'lewis-structures': [at(11, 'develop', { ...c, note: 'Electron-dot structures of the eleven molecules; no resonance or formal charge' })],
    'molecular-shape': [at(11, 'develop', { ...c, note: 'Linear, bent, pyramidal, tetrahedral; "excluding bond angles"' })],
    'intermolecular-forces': [
      at(11, 'develop', c),
      at(12, 'develop', c),
    ],
    'giant-structures': [at(11, 'develop', { ...c, note: 'Metallic crystals, ionic lattices, diamond and graphite; no other network solids or allotropes' })],
    'ionic-formulas': [at(11, 'develop', { ...c, note: 'Formulas from ions, incl. transition-metal ions' })],
    'polyatomic-ions': [at(11, 'develop', { ...c, note: 'NH₄⁺, OH⁻, NO₃⁻, HCO₃⁻, CO₃²⁻, SO₄²⁻, PO₄³⁻; the Data Book list is longer' })],
    'inorganic-nomenclature': [at(11, 'develop', { ...c, note: 'Ionic compounds only; no Greek-prefix molecular or acid naming' })],
    'organic-nomenclature': [
      at(11, 'develop', { ...c, note: 'Non-cyclic, up to C8' }),
      at(12, 'develop', { ...c, note: 'propan-1-ol and 1-propanol both accepted' }),
    ],
    'ionic-equations': [at(11, 'develop', { ...c, note: 'Precipitation and acid–base ionic equations' })],
    'relative-formula-mass': [at(11, 'develop', { ...c, note: 'Molar mass; % composition by mass (U1 AoS 2)' })],
    'mole-concept': [at(11, 'develop', { ...c, note: 'NA = 6.02 × 10²³; moles from mass (U1 AoS 2)' })],
    'reacting-masses': [
      at(11, 'develop', { ...c, note: 'Mass–mass, gas, solution volume–volume stoichiometry (U2 AoS 2)' }),
      at(12, 'develop', { ...c, note: 'Combustion stoichiometry at SLC; Faraday stoichiometry (U3)' }),
    ],
    'limiting-reagent': [at(12, 'develop', { ...c, note: 'U3 AoS 1; excess and limiting in redox titrations (U4 AoS 2)' })],
    'yield-and-atom-economy': [at(12, 'develop', { ...c, note: 'Both examined, including comparing routes' })],
    'empirical-formula': [at(11, 'develop', { ...c, note: 'Empirical and molecular formula from % composition; water of hydration (U2 AoS 2)' })],
    'molar-concentration': [at(11, 'develop', { ...c, note: 'mol L⁻¹; dilution; standard solutions' })],
    'electrolytic-dissociation': [at(11, 'intro', { ...c, note: 'Conductivity solid vs molten ionic compounds; conductivity for salinity; strong/weak ionisation' })],
    'solubility-rules': [at(11, 'develop', { ...c, note: 'Solubility tables predict precipitates (U1 AoS 1, U2 AoS 2); Data Book s/ss/i grid' })],
    'gas-laws': [at(11, 'intro', { ...c, status: 'typical', note: 'Boyle/Charles not named; P–V–T relationships in the VCAA sample Unit 2 plan, via pV = nRT' })],
    'molar-gas-volume': [
      at(11, 'develop', { ...c, note: 'Molar volume or molar mass of a gas from a reaction; Vm = 24.8 L mol⁻¹ at SLC' }),
      at(12, 'develop', { ...c, note: 'Combustion gas volumes at SLC (U3 AoS 1)' }),
    ],
    'ideal-gas-equation': [at(11, 'develop', { ...c, note: 'pV = nRT in kPa, Pa, atm, mL, L, °C, K; no partial pressures' })],
    'acid-base-theories': [at(11, 'develop', { ...c, note: 'Brønsted–Lowry; polyprotic, amphiprotic; no Arrhenius or Lewis' })],
    'ph-calculations': [at(11, 'develop', { ...c, note: 'Strong acids and bases only, via "Kw at a given temperature"; no pH or Kw formula in the Data Book' })],
    'strong-weak-acids': [at(11, 'develop', { ...c, note: 'Strong/weak vs concentrated/dilute, acids and bases' })],
    'oxidation-states': [at(12, 'develop', { ...c, note: 'Oxidation numbers identify agents and conjugate redox pairs (U3 AoS 1)' })],
    'redox-electron-transfer': [
      at(11, 'develop', { ...c, note: 'Oxidising and reducing agents; half and overall equations (U2 AoS 1)' }),
      at(12, 'develop', { ...c, note: 'Conjugate redox pairs (U3 AoS 1)' }),
    ],
    'balancing-redox': [
      at(11, 'develop', { ...c, note: 'Half-equations "including in acidic conditions"' }),
      at(12, 'develop', { ...c, note: 'Acidic and basic conditions (U3 AoS 1)' }),
    ],
    electrolysis: [at(12, 'develop', { ...c, note: 'Products from the electrochemical series (molten/aqueous, electrodes); commercial cells; green H₂ (PEM); Faraday\'s laws' })],
    'electrochemical-cells': [
      at(11, 'intro', { ...c, status: 'typical', note: '"simple primary cells" named as an example application (U2 AoS 1)' }),
      at(12, 'develop', { ...c, note: 'Primary galvanic, fuel (porous electrodes) and secondary cells; no specific cells' }),
    ],
    'electrode-potentials': [at(12, 'develop', { ...c, note: 'Electrochemical series (E⊖ at SLC): predictions, max cell voltage, limitations; no Nernst' })],
    corrosion: [at(11, 'intro', { ...c, status: 'typical', note: 'Named as an example redox application (U2 AoS 1); sample plan corrosion practicals' })],
    'reaction-profiles': [at(12, 'develop', { ...c, note: 'x-axis is reaction progress, not time' })],
    'enthalpy-calorimetry': [
      at(11, 'intro', { ...c, note: 'Specific heat capacity (Unit 2)' }),
      at(12, 'develop', { ...c, note: 'Solution calorimetry with calibration factor' }),
    ],
    'bond-energies': [at(12, 'intro', { ...c, note: 'Qualitative; bond-enthalpy tables removed from the 2026 Data Book' })],
    'collision-theory': [at(12, 'develop', c)],
    'maxwell-boltzmann': [at(12, 'develop', { ...c, status: 'typical', note: 'Examined (2024), not named in the study design' })],
    'reversible-reactions': [at(12, 'develop', c)],
    'equilibrium-constant': [at(12, 'develop', { ...c, note: 'Kc with units; Q' })],
    'le-chatelier': [at(12, 'develop', c)],
    'organic-intro': [at(11, 'intro', { ...c, note: 'Unit 1 AoS 2: five organic families' })],
    hydrocarbons: [at(11, 'develop', c)],
    'homologous-series': [
      at(11, 'develop', c),
      at(12, 'develop', { ...c, note: 'Trends within and between series' }),
    ],
    'functional-groups': [
      at(11, 'intro', c),
      at(12, 'develop', { ...c, note: 'At most two functional groups' }),
    ],
    'oxygen-organics': [at(12, 'develop', { ...c, note: '1°/2°/3° alcohol oxidation; esterification; transesterification to biodiesel' })],
    'nitrogen-organics': [at(12, 'develop', { ...c, note: 'Primary amines named; primary amides drawn, not named' })],
    'aromatic-compounds': [at(12, 'intro', { ...c, note: '[new] Benzene\'s formulas and skeletal structure only (U4 AoS 1); no arene reactions' })],
    isomerism: [at(11, 'develop', { ...c, note: 'Structural isomers up to C5' })],
    'geometric-isomerism': [at(12, 'develop', { ...c, status: 'typical', note: 'cis/trans; examined (2023 report), not named in the study design' })],
    'optical-isomerism': [at(12, 'develop', { ...c, note: 'Chiral centres; enantiomers and drug action' })],
    'organic-reaction-types': [at(12, 'develop', { ...c, note: 'Equations and conditions, no mechanisms; no dehydration, no Markovnikov' })],
    'reaction-pathways': [at(12, 'develop', { ...c, note: 'Unit 4 Outcome 1: design reaction pathways' })],
    'polymers-intro': [at(11, 'develop', c)],
    'addition-polymerisation': [at(11, 'develop', c)],
    'condensation-polymerisation': [
      at(11, 'intro', c),
      at(12, 'develop', { ...c, note: 'Condensation to proteins, starch, glycogen and lipids; hydrolysis (U4 AoS 1)' }),
    ],
    alloys: [at(11, 'intro', { ...c, status: 'typical', note: 'Not in key knowledge; sample Unit 1 plan models alloy properties' })],
    carbohydrates: [at(12, 'develop', c)],
    lipids: [at(12, 'develop', c)],
    'amino-acids-proteins': [at(12, 'develop', c)],
    titration: [
      at(11, 'develop', { ...c, note: 'Acid–base with indicators, standard solutions, dilution; no back titrations (U2 AoS 2)' }),
      at(12, 'develop', { ...c, note: 'Redox titrations, excess and limiting; no back titrations (U4 AoS 2)' }),
    ],
    spectrophotometry: [at(11, 'develop', { ...c, note: 'Colorimetry and/or UV–vis with a calibration curve (U2 AoS 2); Beer–Lambert not named' })],
    'functional-group-tests': [at(12, 'develop', { ...c, note: 'Bromine water, acidified dichromate, carbonate; no Tollens or Fehling' })],
    'ir-nmr-ms': [
      at(11, 'intro', { ...c, note: '[new] Mass spectrometry of elements for relative atomic mass, no instrument detail (U1 AoS 2)' }),
      at(12, 'develop', { ...c, note: 'MS, IR, 13C and 1H NMR (n+1 rule)' }),
    ],
    'water-chemistry': [at(11, 'develop', { ...c, note: 'Anomalous properties via H-bonding; drinking-water distribution (U2 AoS 1); no hard water' })],
    'transition-metals': [at(11, 'intro', { ...c, note: 'Transition-metal ions in formulas; ions or complexes by colorimetry; no complex chemistry' })],
    'industrial-processes': [at(12, 'develop', { ...c, note: 'Rate vs yield; no named process' })],
    'chemical-safety': [at(11, 'intro', { ...c, note: 'Health and environmental hazards of everyday organic products (U1 AoS 2)' })],
    'preparing-solutions': [at(11, 'develop', { ...c, note: 'Standard solutions and dilutions (U2 AoS 2)' })],
    'organic-synthesis-techniques': [at(12, 'develop', { ...c, note: 'Distillation, solvent extraction, melting point' })],
    'chemical-calculations': [at([11, 12], 'develop', { ...c, note: 'Multi-step mole, gas, concentration, energy and Faraday calculations; Data Book use' })],
    'structural-formulas': [
      at(11, 'develop', c),
      at(12, 'develop', { ...c, note: 'Skeletal formulas required' }),
    ],
  },
};
