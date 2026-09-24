# Chemistry concepts by school year, across ten countries

**Purpose:** one map of when chemistry concepts and skills are taught in Years 7–12 in ten countries, so games and cheat sheets can be tagged once and shown to students in any of them. It also describes how the site's current year tags would move over to it.
**Countries:** United States, United Kingdom (England), France, Spain, Italy, Russia, Ukraine, Israel, Mexico, Argentina.
**Research date:** 24 Sept 2026. One agent per country did desk research from official sources. No teacher from any of these countries has reviewed the results yet.

| What | Where |
|---|---|
| One report per country: system, year-by-year concepts and skills, notation, how often the curriculum changes, sources | [`countries/`](./countries/) — [US](./countries/us.md), [UK](./countries/uk.md), [France](./countries/france.md), [Spain](./countries/spain.md), [Italy](./countries/italy.md), [Russia](./countries/russia.md), [Ukraine](./countries/ukraine.md), [Israel](./countries/israel.md), [Mexico](./countries/mexico.md), [Argentina](./countries/argentina.md) |
| The map as typed data | [`src/core-engine/data/curriculum/`](../../src/core-engine/data/curriculum/): `concepts.ts` (160 canonical concepts and skills), `countries/*.ts` (one file per country), `index.ts` (registry and queries) |
| Types | [`src/core-engine/types/curriculum.ts`](../../src/core-engine/types/curriculum.ts) |
| Consistency tests | [`src/core-engine/tests/curriculum-map.test.ts`](../../src/core-engine/tests/curriculum-map.test.ts) |

Germany is not one of the ten. It is covered separately, for the upper years only, in [`bavaria-gymnasium-chemie.md`](./bavaria-gymnasium-chemie.md) and [`germany-sek2-overview.md`](./germany-sek2-overview.md).

---

## 1. What the map says, in brief

- **Chemistry arrives at very different times.** Ukraine has a chemistry subject from Year 7, and Russia from Year 8. Mexico has one only in Year 9, and Spain, Israel and Italy's liceo only in Years 10–12. Elsewhere chemistry sits inside integrated science or physics-and-chemistry. For Year 7 in particular, "chemistry" means the particle model, mixtures and physical vs chemical change almost everywhere, and nothing at all in Spain (Madrid), Russia and Mexico.
- **The same concept can land four or five years apart.** Balancing equations is Year 7 in Ukraine, Year 8 in Russia and Argentina, Year 9 in Spain, Year 10 in the US and France, and Year 11 in Italy's liceo and Mexico. The mole is Year 8 in Russia and Ukraine, Year 9 in Spain, and Year 10–11 elsewhere. In England it is **Higher tier only**, so many GCSE students never meet it. Section 4 lists the widest gaps.
- **Russia and Ukraine teach organic before general chemistry.** In both, Year 10 is almost entirely organic chemistry. Orbitals, pH, equilibrium and electrolysis come in Year 11.
- **After Year 9 the track matters more than the year.** From Year 10 almost every country splits students. Examples: GCSE Combined vs separate Chemistry and Foundation vs Higher tier; France's spécialité physique-chimie; Spain's option subjects; Russia's базовый vs углублённый; Israel's 5-unit major vs one intro year; Argentina's orientación. Knowing a student is in "Year 11" says little without the track, so the data records a track on every placement that needs one.
- **Several systems set a band, not a year.** Examples: NGSS (Grades 6–8 and 9–12), England's key stages, France's cycle 4, Spain's 1º–3º ESO, Italy's bienni. Placements inside a band are marked `typical`: where schools or exam boards usually put them, not what the document requires.
- **Year numbers are not ages.** See §2. By age, a Russian Year 8 student meeting the mole (age 14) and an English Higher-tier Year 10 student meeting it (age 14) are the same age.

## 2. Year numbers, local labels and ages

**The rule used everywhere in the map:** "Year N" is the country's own Nth school year, counting its first year of primary school as Year 1. Years are **not** shifted to line up by age. Each year keeps its local label, as a teacher there would write it.

| Year | US | GB | FR | ES | IT | RU | UA | IL | MX | AR |
|---|---|---|---|---|---|---|---|---|---|---|
| 7 | Grade 7 (12) | Year 7 (11) | 5e (12) | 1º ESO (12) | 2ª media (12) | 7 класс (13) | 7 клас (12) | כיתה ז (12) | 1º de secundaria (12) | 1º año ES (12) |
| 8 | Grade 8 (13) | Year 8 (12) | 4e (13) | 2º ESO (13) | 3ª media (13) | 8 класс (14) | 8 клас (13) | כיתה ח (13) | 2º de secundaria (13) | 2º año ES (13) |
| 9 | Grade 9 (14) | Year 9 (13) | 3e (14) | 3º ESO (14) | 1º anno (14) | 9 класс (15) | 9 клас (14) | כיתה ט (14) | 3º de secundaria (14) | 3º año ES (14) |
| 10 | Grade 10 (15) | Year 10 (14) | 2de (15) | 4º ESO (15) | 2º anno (15) | 10 класс (16) | 10 клас (15) | כיתה י (15) | 1º de bachillerato (15) | 4º año ES (15) |
| 11 | Grade 11 (16) | Year 11 (15) | 1re (16) | 1º Bachillerato (16) | 3º anno (16) | 11 класс (17) | 11 клас (16) | כיתה יא (16) | 2º de bachillerato (16) | 5º año ES (16) |
| 12 | Grade 12 (17) | Year 12 (16) | Terminale (17) | 2º Bachillerato (17) | 4º anno (17) | — (none) | 12 клас (reform, 2029/30) | כיתה יב (17) | 3º de bachillerato (17) | 6º año ES (17) |

The number in brackets is the typical age on the first day of that school year.

**About age differences.** Under this rule most of the ten countries line up: a Year 7 student is about 12 at the start of the year. There are two exceptions, each one year out:

- **England is a year younger.** Children do a Reception year, at age 4–5, before Year 1. So an English Year 9 student is the age of an American Grade 8 or a French 4e student.
- **Russia is a year older.** Children usually start 1 класс at 7. Russian school also ends after 11 класс, so there is no Year 12. Ukraine starts at 6 and is adding a Year 12 through its current reform.

Two smaller points:

- **Argentina's school year runs March to December**, so "2026/27" there means school year 2026.
- **Labels are not always numbers.** France counts down (5e is Year 7). Italy and Spain restart the count at each school stage (Italy's Year 9 is "1º anno"). Scotland's S1 is Year 8 under this rule, because P1 is Year 1.

So comparing by year number makes England look a year ahead of where it is by age, and Russia a year behind. The site's current tags are Victorian (Australian): Foundation comes before Year 1, so Victorian Year 7 follows the same rule and is also about age 12.

**How chemistry is delivered each year** (`CountryYear.delivery`):

| Year | US | GB | FR | ES | IT | RU | UA | IL | MX | AR |
|---|---|---|---|---|---|---|---|---|---|---|
| 7 | integrated | integrated | phys-chem | none | integrated | none | chemistry | integrated | none | integrated |
| 8 | integrated | integrated | phys-chem | phys-chem | integrated | chemistry | chemistry | integrated | integrated | phys-chem |
| 9 | integrated | integrated | phys-chem | phys-chem | integrated | chemistry | chemistry | integrated | chemistry | phys-chem |
| 10 | optional | integrated | phys-chem | optional | integrated | chemistry | chemistry | optional | integrated | optional |
| 11 | optional | integrated | optional | optional | integrated | chemistry | chemistry | optional | integrated | chemistry |
| 12 | optional | optional | optional | optional | integrated | no Year 12 | no Year 12 (yet) | optional | optional | optional |

"integrated" = a strand of a general science subject; "phys-chem" = one physics-and-chemistry subject; "chemistry" = a subject called chemistry; "optional" = only students who choose it. Spain's "none" is the Madrid pattern. Russia's Year 7 has particle ideas in physics, which the map records.

## 3. How often these curricula change

Every country report has a section 1a with a dated timeline of revisions. The summary:

| Country | Stability | Last major revision | Usual gap between major revisions (years) | How it happens | Next known change | Re-check by |
|---|---|---|---|---|---|---|
| United States | stable | 2013 (NGSS) | 5–10 (state cycles; often slips past 10) | mixed | 2028: new NAEP Science Framework assessment | 2028-09 |
| United Kingdom (England) | moderate | 2014 (NC), GCSE 2016, A level 2015 | 5–14 | ad hoc | spring 2027: revised National Curriculum published; first teaching Sept 2028; GCSEs 2029/30; A levels 2031/32 | 2027-06 |
| France | moderate | 2019 (lycée) | 7–10 | ad hoc | 2027: new 6e sciences; about 2028: year-by-year cycle 4 physique-chimie (draft) | 2027-09 |
| Spain | moderate | 2022 (LOMLOE) | 7–8 (one new education law per change of government) | ad hoc | yearly PAU guidance; no national revision tabled | 2027-06 |
| Italy | moderate | 2010 (Gelmini) | 13–17 | ad hoc | 2026–2031: new tecnici (from 2026), new liceo texts (draft, from 2027), new primo ciclo (phasing in) | 2027-09 |
| Russia | moderate | 2021–23 (ФГОС, federal programmes) | 5–10, getting shorter | ad hoc | Sept 2027: new ФГОС СОО for Years 10–11 | 2027-09 |
| Ukraine | **high** | 2020 (NUS standard) | 7–10 | ad hoc (reform- and war-driven) | Sept 2027: profile school starts; Year 12 from 2029/30 | 2027-09 |
| Israel | moderate | 2016 (grades 1–9); 2014/15 (70-30 high school) | 15–20 | ad hoc | yearly exam focus list (מיקוד) | 2027-08 |
| Mexico | **high** (upper secondary) | 2025 (MCCEMS) | 5–6 (one per six-year presidential term) | ad hoc | Aug 2027: 2025 model reaches Year 12 | 2027-08 |
| Argentina | stable | 2012 (NAP); PBA designs 2006–2011 | 11–15 | ad hoc | new PBA design, 2027 at the earliest (draft) | 2027-03 |

What this means for the site:

- **Nobody revises on a fixed cycle.** Only some US states have a statutory review interval, and those intervals often slip. Everywhere else revisions follow political reform: a new education law, a new minister, a new government. So the data can't be refreshed on a timetable; it needs a watch on announcements. Each country file has a `change.recheckBy` date and a list of `upcoming` changes.
- **Content churns much less than structure.** Every report says the core sequence has barely changed in 15–30 years: particles → atoms → periodic table → bonding → mole → acids, bases and redox → energetics, rates and equilibrium → organic. What moves is which year or track a topic sits in, how many hours it gets and what the exam covers. Concept ids will stay stable; placements are what needs maintaining.
- **Exam-level detail changes every year** in Russia (ФИПИ specifications), Israel (the focus list), Spain (PAU guidance) and the US (AP clarifications). The map records what is taught, not what is examined this year. A game should not promise "this is on your exam".
- **2027–2030 is a busy window.** England, Russia, Ukraine, Italy, France and Mexico all have changes landing then. Most re-check dates fall in 2027 for that reason.

## 4. Where the countries disagree most

The concepts whose first year on the main route (untagged placements only) differs by four or more years between countries:

| Concept | Range | First year by country |
|---|---|---|
| Concentration by mass | 7–12 | GB 10, FR 10, ES 9, IT 12, RU 8, UA 7, MX 9, AR 8 |
| Naming inorganic compounds | 7–11 | US 10, GB 7, ES 9, IT 11, RU 8, UA 8, AR 9 |
| Balancing equations | 7–11 | US 10, GB 9, FR 10, ES 9, IT 11, RU 8, UA 7, MX 11, AR 8 |
| Combustion | 7–11 | US 10, GB 8, FR 8, UA 8, IL 8, MX 11, AR 7 |
| Oxidation states | 8–12 | US 10, IT 12, RU 8, UA 8, MX 9, AR 9 |
| Redox as electron transfer | 8–12 | US 10, IT 12, RU 8, UA 9, MX 9, AR 9 |
| Factors affecting reaction rate | 8–12 | US 10, GB 11, ES 9, IT 12, RU 9, UA 8, AR 9 |
| Catalysts | 8–12 | GB 9, IT 12, RU 9, UA 8 |

For games this means a fixed "Year 10" tag cannot be right everywhere. Tag by concept and let the country and track decide the year.

## 5. The map: first year each concept is met

How to read a cell:

- **`8`** — first met in Year 8 on the main route, which every student in that system takes. For the US that is the typical college-prep sequence; for Spain, the Madrid pattern; for Italy, the liceo scientifico; for Mexico, the DGB bachillerato; for Argentina, Provincia de Buenos Aires.
- **`~8`** — the document sets a band, and Year 8 is where schools *typically* put it.
- **`10 (9)`** — Year 10 on the main route, but a track reaches it earlier, in Year 9 (for example Italy's istituti tecnici).
- **`(10)`** — only on a track (advanced level, an option subject, the Higher tier, A level…), first in Year 10.
- **`·`** — not in that country's national documents for Years 7–12. It may be taught before Year 7 or in another subject, or the report may simply not list it.

Depth (intro / develop / extend), the exact track and later years are in the data files and the country reports. This table shows first appearance only.

| Concept | US | GB | FR | ES | IT | RU | UA | IL | MX | AR |
|---|---|---|---|---|---|---|---|---|---|---|
| **Matter & particles** | | | | | | | | | | |
| Particle model of matter <sub>particle-model</sub> | ~7 | 7 | 7 | ~8 | 7 | 7 | 7 | 7 | 8 | 7 |
| States of matter and changes of state <sub>states-of-matter</sub> | ~7 | 7 | 7 | ~8 | 7 | 7 | · | 7 | 8 | 7 |
| Physical properties of substances <sub>physical-properties</sub> | ~7 | · | · | ~8 | (9) | 8 | 7 | 7 | 8 | 7 |
| Density <sub>density</sub> | · | · | ~8 | · | (9) | · | · | (7) | 8 | · |
| Heat and temperature <sub>heat-and-temperature</sub> | ~7 | · | · | ~8 | 7 | · | · | · | 8 | (10) |
| Elements, compounds and mixtures <sub>elements-compounds-mixtures</sub> | ~7 | 7 | 7 | ~8 | 9 | 8 | 7 | 8 | 9 | 7 |
| **Mixtures & separation** | | | | | | | | | | |
| Types of mixture <sub>mixture-types</sub> | (7) | 7 | 10 | ~8 | 7 | 8 | 7 | 8 | 9 | 7 |
| Separation techniques <sub>separation-techniques</sub> | (11) | ~7 | (11) | ~8 | ~9 | 8 | 7 | 8 | 9 | 7 |
| Colloids and disperse systems <sub>colloids</sub> | · | · | · | ~8 | · | 11 | 7 | · | · | · |
| **Atomic structure** | | | | | | | | | | |
| Protons, neutrons and electrons <sub>subatomic-particles</sub> | ~10 | ~9 | ~9 | ~9 | ~10 (9) | 8 | ~7 | 8 | 9 | 8 |
| History of atomic models <sub>atomic-models-history</sub> | ~10 | ~8 | · | ~8 | 10 | · | · | · | 8 | (10) |
| Isotopes and relative atomic mass <sub>isotopes</sub> | ~10 | ~10 | 10 | ~9 | ~10 (9) | 8 | 8 | (9) | 10 | 9 |
| Electron shells <sub>electron-shells</sub> | ~10 | ~10 | · | · | · | 8 | 8 | (10) | 9 | 9 |
| Orbitals and electron configuration <sub>electron-configuration</sub> | ~10 | (12) | 10 | (10) | ~11 (9) | 11 (8) | 11 | (12) | 10 | (12) |
| Atomic spectra and light <sub>atomic-spectra</sub> | ~10 | · | · | (11) | (9) | · | · | (12) | · | · |
| **Periodic table** | | | | | | | | | | |
| Reading the periodic table <sub>periodic-table-structure</sub> | ~10 | ~9 | ~8 | ~8 | ~7 | 8 | 7 | 8 | 9 | 8 |
| Development of the periodic table <sub>periodic-table-history</sub> | · | ~9 | · | (11) | 10 | · | · | · | · | · |
| Chemical families (groups) <sub>group-chemistry</sub> | ~10 | ~10 | 10 | · | · | · | 8 | (10) | · | · |
| Periodic trends <sub>periodic-trends</sub> | ~10 | (12) | (11) | (11) | ~11 | 8 | ~8 | (10) | 9 | (12) |
| Periodic table from electron structure <sub>periodic-law-electronic</sub> | ~10 | · | 10 | (10) | · | 11 | 8 | · | · | · |
| **Bonding & structure** | | | | | | | | | | |
| Ionic bonding <sub>ionic-bonding</sub> | ~10 | ~10 | 10 | ~9 | ~11 (9) | 8 | 8 | 9 | 9 | 9 |
| Covalent bonding <sub>covalent-bonding</sub> | ~10 | ~10 | 10 | ~9 | ~7 | 8 | 8 | 9 | 9 | 9 |
| Metallic bonding <sub>metallic-bonding</sub> | ~10 | ~10 | · | ~9 | ~11 (9) | 9 | ~8 | (10) | · | (12) |
| Electronegativity and polarity <sub>bond-polarity</sub> | ~10 | (12) | (11) | (11) | ~11 (9) | 8 | 8 | (10) | 10 | 9 |
| Lewis structures <sub>lewis-structures</sub> | ~10 | · | 10 | (11) | · | · | 8 | (10) | 9 | 9 |
| Molecular shape (VSEPR) <sub>molecular-shape</sub> | ~10 | (12) | (11) | (12) | ~11 (9) | (10) | · | (10) | · | 9 |
| Intermolecular forces <sub>intermolecular-forces</sub> | ~10 | (12) | (11) | (11) | ~11 (9) | 11 (9) | 8 | (10) | (10) | 11 (10) |
| Structure types and properties <sub>giant-structures</sub> | ~10 | ~10 | (11) | (11) | · | 9 | 8 | 8 | · | · |
| Hybridisation and σ/π bonds <sub>hybridisation</sub> | (11) | · | · | (12) | · | (10) | · | (12) | (12) | (12) |
| Lattice energy and Born–Haber cycles <sub>lattice-energy</sub> | · | · | · | (12) | · | · | · | · | · | · |
| **Formulas & nomenclature** | | | | | | | | | | |
| Symbols and formulas <sub>chemical-symbols-formulas</sub> | (7) | ~8 | ~8 | ~8 | 10 | 8 | 7 | 8 | 9 | 8 |
| Writing formulas from charges or valence <sub>ionic-formulas</sub> | ~10 | ~10 | 10 | ~9 | ~11 (9) | 8 | · | (10) | · | · |
| Polyatomic ions <sub>polyatomic-ions</sub> | ~10 | · | ~10 | (10) | · | · | · | · | · | · |
| Naming inorganic compounds <sub>inorganic-nomenclature</sub> | ~10 | ~7 | · | ~9 | ~11 (9) | 8 | 8 | · | (10) | 9 |
| Naming organic compounds <sub>organic-nomenclature</sub> | (11) | (12) | (11) | (10) | (9) | 10 | 10 | · | 11 | 11 (10) |
| **Reactions & equations** | | | | | | | | | | |
| Physical vs chemical change <sub>physical-chemical-change</sub> | ~7 | ~8 | 7 | ~8 | 7 | 8 | 7 | 7 | 9 | 8 (7) |
| Conservation of mass <sub>conservation-of-mass</sub> | ~7 | ~8 | 7 | ~9 | 10 | 8 | ~7 | 7 | 9 | 8 |
| Word and symbol equations <sub>writing-equations</sub> | (8) | ~8 | 8 | ~9 | 9 | 8 | ~7 | 8 | 9 | · |
| Balancing equations <sub>balancing-equations</sub> | ~10 | ~9 | 10 | ~9 | ~11 (9) | 8 | ~7 | (9) | 11 | 8 |
| Types of reaction <sub>reaction-types</sub> | ~10 | ~8 | · | (10) | ~11 (9) | 8 | 8 | 8 | 11 | · |
| Combustion <sub>combustion</sub> | ~10 | ~8 | ~8 | (10) | · | · | 8 | 8 | 11 | 7 |
| Ionic equations <sub>ionic-equations</sub> | (11) | (10) | 10 | · | · | 9 | 9 | (10) | · | · |
| **Stoichiometry & the mole** | | | | | | | | | | |
| Relative atomic and formula mass <sub>relative-formula-mass</sub> | · | ~10 | · | ~9 | · | 8 | ~7 | · | · | · |
| The mole <sub>mole-concept</sub> | ~10 | (10) | 10 | ~9 | ~10 (9) | 8 | 8 | (10) | 11 | 11 (10) |
| Calculations from equations <sub>reacting-masses</sub> | ~10 | (10) | (11) | ~9 | ~11 (9) | 8 | 8 | (11) | (10) | 11 (10) |
| Limiting reagent <sub>limiting-reagent</sub> | ~10 | (10) | 10 | (11) | · | · | · | · | · | 11 (10) |
| Yield, purity and atom economy <sub>yield-and-atom-economy</sub> | ~10 | (10) | (11) | (10) | · | 11 (10) | ~8 | · | · | 11 (10) |
| Empirical and molecular formulas <sub>empirical-formula</sub> | ~10 | ~10 | · | (11) | · | (8) | 8 | · | · | · |
| **Solutions & concentration** | | | | | | | | | | |
| Dissolving and solubility <sub>dissolving-solubility</sub> | ~10 (7) | 7 | ~7 | ~9 | 7 | 8 | 9 | 8 | 9 | 8 |
| Concentration by mass <sub>mass-concentration</sub> | · | ~10 | 10 | ~9 | ~12 (9) | 8 | ~7 | · | 9 | 8 |
| Molar concentration and dilution <sub>molar-concentration</sub> | ~10 | (10) | (11) | (10) | ~12 (9) | (8) | (11) | (11) | · | 11 (10) |
| Electrolytes and dissociation <sub>electrolytic-dissociation</sub> | ~10 | · | · | · | · | 9 | 9 | · | (10) | · |
| Solubility rules and precipitation <sub>solubility-rules</sub> | ~10 | · | · | · | · | · | · | (10) | · | · |
| **Gases** | | | | | | | | | | |
| Gas pressure (particle explanation) <sub>gas-pressure</sub> | · | 7 | (11) | · | 7 | · | · | 7 | · | 8 |
| Gas laws <sub>gas-laws</sub> | ~10 | · | (11) | ~9 | ~11 (9) | · | · | · | · | 8 |
| Avogadro's law and molar volume <sub>molar-gas-volume</sub> | ~10 | (10) | (11) | (11) | (9) | 8 | 8 | (11) | · | · |
| Ideal gas equation <sub>ideal-gas-equation</sub> | ~10 | (12) | (12) | (11) | (9) | · | · | (11) | 10 | 8 |
| Kinetic molecular theory <sub>kinetic-molecular-theory</sub> | ~10 | · | · | ~8 | (9) | · | · | · | · | · |
| **Acids, bases & salts** | | | | | | | | | | |
| Acids, alkalis and indicators <sub>acids-bases-indicators</sub> | (8) | ~7 | ~9 | · | ~7 | 8 | 9 | (8) | 9 | 9 |
| Neutralisation and salts <sub>neutralisation</sub> | ~10 | ~9 | 10 | (10) | · | 8 | 9 | (11) | 9 | (12) |
| Reactions of acids <sub>reactions-of-acids</sub> | · | ~9 | ~8 | · | · | 8 | · | (9) | · | · |
| Acid–base theories <sub>acid-base-theories</sub> | ~10 | · | (12) | (12) | ~12 (9) | · | · | (11) | 9 | 10 |
| pH and [H⁺] <sub>ph-calculations</sub> | ~10 | (10) | (12) | (12) | ~12 (9) | (9) | · | · | · | (11) |
| Strong and weak acids <sub>strong-weak-acids</sub> | ~10 | (10) | (12) | (12) | ~12 (9) | · | · | · | 11 | · |
| Ka, Kb and pKa <sub>acid-dissociation-constants</sub> | (11) | · | (12) | (12) | · | · | · | (12) | · | (11) |
| Buffers <sub>buffers</sub> | (11) | · | (12) | (12) | (9) | · | · | · | · | (11) |
| Salt hydrolysis <sub>salt-hydrolysis</sub> | · | · | · | (12) | (9) | 9 | 11 | · | · | · |
| **Redox & electrochemistry** | | | | | | | | | | |
| Oxidation and reduction as oxygen transfer <sub>redox-oxygen</sub> | · | ~8 | · | · | · | · | · | · | · | · |
| Reactivity (activity) series <sub>reactivity-series</sub> | · | ~9 | · | · | · | 8 | ~9 | (11) | · | · |
| Oxidation states <sub>oxidation-states</sub> | ~10 | (12) | · | (12) | ~12 (9) | 8 | ~8 | (11) | 9 | 9 |
| Redox as electron transfer <sub>redox-electron-transfer</sub> | ~10 | (10) | (11) | (12) | ~12 (9) | 8 | ~9 | (11) | 9 | 9 |
| Balancing redox equations <sub>balancing-redox</sub> | · | · | (11) | (12) | (9) | 9 | (11) | (11) | · | (11) |
| Electrolysis <sub>electrolysis</sub> | (11) | ~10 | (12) | (12) | (9) | (9) | (11) | 8 | (10) | (11) |
| Electrochemical cells <sub>electrochemical-cells</sub> | (11) | (10) | (12) | (10) | ~12 (9) | · | 11 | · | · | 8 |
| Electrode potentials <sub>electrode-potentials</sub> | (11) | · | · | (12) | (11) | · | · | · | · | · |
| Corrosion and its prevention <sub>corrosion</sub> | · | (11) | ~8 | (12) | (9) | 9 | (11) | (11) | · | 8 |
| **Energetics** | | | | | | | | | | |
| Exothermic and endothermic reactions <sub>exo-endothermic</sub> | ~7 | ~8 | 10 | (10) | (9) | 8 | 8 | (8) | 9 | 9 (7) |
| Energy profiles and activation energy <sub>reaction-profiles</sub> | ~10 | ~10 | · | (12) | · | (11) | · | (11) | · | · |
| Bond energies <sub>bond-energies</sub> | ~10 | (10) | 10 | (12) | · | · | · | 9 | · | 9 |
| Enthalpy change and calorimetry <sub>enthalpy-calorimetry</sub> | ~10 | (12) | (11) | (11) | ~12 | 11 | (11) | (11) | · | 9 |
| Hess's law <sub>hess-law</sub> | (11) | (12) | · | (11) | · | (9) | · | (11) | · | · |
| Entropy and Gibbs energy <sub>entropy-gibbs</sub> | (11) | · | · | (12) | (11) | · | · | (12) | 10 | · |
| **Kinetics** | | | | | | | | | | |
| Factors affecting reaction rate <sub>rate-factors</sub> | ~10 | ~11 | (12) | ~9 | ~12 (9) | 9 | 8 | (10) | · | 9 |
| Collision theory <sub>collision-theory</sub> | ~10 | ~11 | · | (10) | · | · | · | (11) | · | 10 |
| Catalysts <sub>catalysts</sub> | (11) | ~9 | (12) | (12) | ~12 (9) | 9 | 8 | (11) | · | (11) |
| Measuring and calculating rate <sub>measuring-rate</sub> | · | ~11 | (12) | · | · | 11 | (11) | · | · | · |
| Rate equations <sub>rate-laws</sub> | (11) | · | (12) | (12) | (11) | (9) | · | (12) | · | · |
| Maxwell–Boltzmann distribution <sub>maxwell-boltzmann</sub> | · | (12) | · | · | · | · | · | · | · | · |
| **Equilibrium** | | | | | | | | | | |
| Reversible reactions and dynamic equilibrium <sub>reversible-reactions</sub> | ~10 | ~11 | (11) | (12) | ~12 (9) | 9 | 11 | (12) | 11 | 11 (10) |
| Le Chatelier's principle <sub>le-chatelier</sub> | ~10 | (11) | · | (12) | ~12 (9) | 11 (9) | 11 | (12) | · | 10 |
| Equilibrium constant <sub>equilibrium-constant</sub> | (11) | (12) | (12) | (12) | ~12 (9) | (11) | (11) | (12) | 11 | 11 (10) |
| Solubility product <sub>solubility-product</sub> | (11) | · | · | (12) | (9) | · | · | · | · | (11) |
| **Organic chemistry** | | | | | | | | | | |
| Introduction to carbon compounds <sub>organic-intro</sub> | ~9 | · | · | (10) | ~11 | 9 | 9 | 9 | 11 | · |
| Hydrocarbons <sub>hydrocarbons</sub> | · | ~11 | · | · | (9) | 10 | 9 | (10) | (10) | · |
| Crude oil and its processing <sub>crude-oil-fuels</sub> | · | ~11 | · | · | · | 9 | (10) | (9) | (12) | 11 (10) |
| Homologous series <sub>homologous-series</sub> | · | ~11 | · | (11) | · | 10 | 9 | · | · | · |
| Functional groups <sub>functional-groups</sub> | (11) | (11) | (11) | (11) | ~11 | 10 | 10 | (10) | 11 (10) | 11 (10) |
| Alcohols, acids and esters <sub>oxygen-organics</sub> | · | (11) | (11) | · | · | 10 | 9 | (10) | · | · |
| Amines and amides <sub>nitrogen-organics</sub> | · | · | (12) | · | · | (10) | 10 | · | · | · |
| Benzene and aromatic compounds <sub>aromatic-compounds</sub> | · | · | · | · | · | 10 | 10 | · | · | · |
| Structural isomerism <sub>isomerism</sub> | · | · | (12) | (12) | · | 10 | 9 | (10) | (10) | 11 (10) |
| Stereoisomerism <sub>stereoisomerism</sub> | · | (12) | · | (12) | (11) | · | · | (11) | · | (12) |
| Organic reaction types <sub>organic-reaction-types</sub> | · | (12) | (12) | (12) | · | 10 | 9 | (11) | (12) | (12) |
| Reaction mechanisms <sub>reaction-mechanisms</sub> | · | (12) | (12) | · | (11) | (10) | · | (12) | · | (12) |
| Multi-step synthesis <sub>reaction-pathways</sub> | · | · | (12) | · | · | · | · | · | · | · |
| **Polymers & materials** | | | | | | | | | | |
| Polymers <sub>polymers-intro</sub> | ~10 | (11) | (12) | (12) | (11) | 10 | ~9 | 9 | 11 | (12) |
| Addition polymerisation <sub>addition-polymerisation</sub> | · | (11) | · | · | · | 10 | ~9 | (12) | · | (12) |
| Condensation polymerisation <sub>condensation-polymerisation</sub> | · | (11) | · | · | · | 10 | 10 | (12) | · | 11 (10) |
| Plastics and recycling <sub>plastics-and-recycling</sub> | · | · | · | (12) | · | (10) | 10 | (10) | (12) | · |
| Alloys <sub>alloys</sub> | · | ~10 | · | · | 7 | 11 | 11 | (10) | · | · |
| Ceramics, glass, composites and nanomaterials <sub>materials</sub> | ~7 | ~9 | · | · | 7 | 9 | 11 | · | · | 7 |
| **Biochemistry** | | | | | | | | | | |
| Food molecules <sub>food-molecules</sub> | ~7 | · | · | · | ~7 | · | · | 9 | 7 | · |
| Carbohydrates <sub>carbohydrates</sub> | · | (11) | · | · | (11) | 10 | 9 | (12) | 11 | 11 (10) |
| Fats, oils and soaps <sub>lipids</sub> | · | · | (11) | · | (11) | 10 | 9 | (11) | 11 | 11 (10) |
| Amino acids and proteins <sub>amino-acids-proteins</sub> | · | (11) | (12) | · | (11) | 10 | 9 | (12) | 11 | 11 (10) |
| Nucleic acids <sub>nucleic-acids</sub> | · | (11) | · | · | (11) | · | · | (12) | 11 | · |
| Photosynthesis and respiration (chemical view) <sub>photosynthesis-respiration</sub> | ~7 | · | (11) | · | · | 10 | · | 9 | 11 | (12) |
| **Nuclear chemistry** | | | | | | | | | | |
| Radioactivity <sub>radioactivity</sub> | ~10 | · | 10 | · | · | (8) | ~8 | (9) | · | 9 |
| Nuclear equations <sub>nuclear-equations</sub> | ~10 | · | 10 | · | · | · | · | (10) | · | · |
| Half-life and decay <sub>half-life</sub> | · | · | (11) | · | · | · | · | · | · | · |
| Fission, fusion and nucleosynthesis <sub>fission-fusion</sub> | ~10 | · | 10 | · | · | · | · | (9) | 8 | 9 |
| **Analytical & instrumental** | | | | | | | | | | |
| Tests for gases <sub>gas-tests</sub> | · | ~9 | 8 | · | · | 8 | · | 7 | · | 7 |
| Tests for ions <sub>ion-tests</sub> | · | (11) | · | · | · | 9 | 9 | · | · | · |
| Chromatography <sub>chromatography</sub> | (11) | ~7 | 10 | · | (11) | · | 7 | · | · | · |
| Titration <sub>titration</sub> | ~10 | (10) | (11) | (12) | (11) | · | · | (12) | · | · |
| Colorimetry and UV–vis spectroscopy <sub>spectrophotometry</sub> | (11) | · | 10 | · | (11) | · | · | (12) | · | · |
| IR, NMR and mass spectrometry <sub>ir-nmr-ms</sub> | (11) | (12) | (11) | · | (11) | · | · | · | · | · |
| **Inorganic / descriptive** | | | | | | | | | | |
| Air, oxygen and hydrogen <sub>air-oxygen-hydrogen</sub> | · | · | ~7 | · | · | 8 | ~8 | 7 | 11 | · |
| Water <sub>water-chemistry</sub> | (8) | · | · | · | · | 8 | 9 | 7 | · | 7 |
| Classes of inorganic compounds <sub>inorganic-compound-classes</sub> | · | · | · | · | · | 8 | 9 | · | 11 | (10) |
| Chemistry of the non-metals <sub>non-metals-chemistry</sub> | · | · | · | · | · | 9 | 11 | · | · | · |
| Chemistry of the metals <sub>metals-chemistry</sub> | · | · | · | · | · | 9 | 11 | · | · | · |
| Transition metals and complexes <sub>transition-metals</sub> | · | (10) | · | · | (11) | (9) | · | · | · | · |
| **Industrial, environmental & applied** | | | | | | | | | | |
| Atmosphere and climate change <sub>atmosphere-climate</sub> | ~9 | ~8 | 7 | · | 8 | 8 | 8 | 8 | 7 | (10) |
| Pollution <sub>pollution</sub> | · | ~11 | 7 | · | · | 8 | 11 | (9) | 9 | · |
| Water treatment <sub>water-treatment</sub> | · | ~11 | 7 | · | · | · | · | 8 | · | 7 |
| Resources and sustainability <sub>resources-sustainability</sub> | · | ~8 | (12) | · | (11) | (9) | ~7 | 7 | 9 | 7 |
| Fuels and energy sources <sub>fuels-energy</sub> | · | · | (11) | ~8 | 8 | · | · | · | · | · |
| Industrial processes <sub>industrial-processes</sub> | ~10 | (11) | · | (11) | (11) | 9 | 11 | · | (12) | 11 (10) |
| Extracting metals <sub>metal-extraction</sub> | · | ~9 | · | · | · | 11 | 11 | · | (12) | 11 (10) |
| Chemical safety in everyday life <sub>chemical-safety</sub> | · | · | · | · | · | 9 | ~7 | · | · | · |
| **Skills: practical** | | | | | | | | | | |
| Lab safety and equipment <sub>lab-safety</sub> | 7 | 7 | 7 | ~8 | 7 | 8 | 7 | 7 | · | 7 |
| Measuring mass, volume and temperature <sub>measurement-technique</sub> | 7 | 7 | · | · | · | · | · | 7 | · | 7 |
| Preparing solutions <sub>preparing-solutions</sub> | · | · | 10 | · | (9) | 8 | 9 | · | · | (11) |
| Preparing salts and gases <sub>preparing-substances</sub> | · | ~10 | · | · | · | 8 | · | · | · | · |
| Organic synthesis techniques <sub>organic-synthesis-techniques</sub> | · | (12) | 10 | · | · | · | · | · | · | · |
| **Skills: quantitative** | | | | | | | | | | |
| Units, conversions and scientific notation <sub>units-and-conversions</sub> | ~10 | 7 | 7 | ~8 | 9 | · | · | · | 8 | · |
| Significant figures and uncertainty <sub>significant-figures-uncertainty</sub> | ~10 | 10 | 10 | ~9 | 9 | · | · | · | · | 7 |
| Tables, graphs and data analysis <sub>graphs-and-data</sub> | ~7 | 7 | · | ~8 | 7 | · | · | · | · | 8 |
| Multi-step chemical calculations <sub>chemical-calculations</sub> | (11) | (12) | (12) | (12) | ~11 | 8 | 10 | (11) | 10 | 11 (10) |
| **Skills: models & representations** | | | | | | | | | | |
| Particle diagrams <sub>particle-diagrams</sub> | ~7 | 7 | 7 | ~8 | 7 | · | · | 7 | 9 | 8 |
| Macro, micro and symbolic levels <sub>macro-micro-symbolic</sub> | (11) | · | 10 | · | · | · | · | 7 | (10) | 10 |
| Molecular models <sub>molecular-models</sub> | ~7 | 10 | (11) | (12) | (11) | 8 | 7 | · | 9 | 9 |
| Structural formulas <sub>structural-formulas</sub> | · | 10 | (11) | · | · | 10 | · | (10) | · | (10) |
| Using reference tables <sub>reference-tables</sub> | · | · | · | · | · | 8 | 9 | · | · | · |
| **Skills: inquiry & communication** | | | | | | | | | | |
| Hypotheses, variables and fair tests <sub>scientific-method</sub> | 7 | 7 | 7 | ~8 | 7 | 7 | 7 | 7 | 7 | 7 |
| Evaluating experiments <sub>evaluating-experiments</sub> | ~10 | 10 | 10 | (10) | · | · | · | (11) | · | · |
| Reports and argument <sub>scientific-communication</sub> | 7 | 10 | 10 | ~9 | 9 | 8 | 7 | (10) | 10 | 10 |
| History and nature of science <sub>nature-of-science</sub> | · | · | · | ~8 | 9 | · | · | · | · | 7 |
| Chemistry and society <sub>socio-scientific-issues</sub> | · | · | · | ~8 | · | 10 | · | · | · | 10 |


### What the canonical list leaves out

Almost every row of the reports' concept indices maps to one of the 160 ids. The mapping was done by hand, so a row that only restates a broader one was folded into it. The notable exceptions are below. They are too narrow or too country-specific to deserve an id yet:

- **Colligative properties.** Italy (liceo, typical Year 12), Argentina (CABA Years 10 and 12; PBA Ciencias Naturales Year 11).
- **Earth science: Earth structure, the rock cycle, minerals.** In England's KS3 chemistry strand and in Italy's Scienze. Other countries teach it outside chemistry.
- **Where the elements come from.** France, cycle 4. The later nucleosynthesis content maps to `fission-fusion`.
- **Conductimetry and the Kohlrausch law.** France, Terminale.
- **Python programming for chemistry.** France, Years 10–12. It is written into the programme, but it is a computing skill, not a chemistry concept.
- **"Critical use of AI".** Only in Italy's draft liceo text. It is recorded as a `planned` placement of `socio-scientific-issues`.

Add an id when a second country turns up, or when a game or cheat sheet needs one.

---

## 6. How this differs from the site's current data, and how to migrate

### 6.1 What exists today

| Structure | Where | What it holds |
|---|---|---|
| `YearLevel` = `'Year 7' \| 'Year 8' \| 'Year 9' \| 'Year 10' \| 'Senior'` | `src/core-engine/types/general.ts` | Victorian (Australian) bands. Canonical English values; each locale translates only the label. |
| `CheatSheetTopic.yearLevel` (one per sheet) and `curriculumRef` (free text, VCAA) | `src/lib/cheat-sheet-data.ts` | 15 sheets, Year 9 to Senior |
| `GameTopic.yearLevels` and `concepts: CheatSheetCategory[]` | `src/lib/games-data.ts` | Year bands copied from the sheets that link each game |
| `CheatSheetCategory` (9 strands) | `general.ts` | Fundamentals, Reactions, Acids & Bases, Equations, Thermodynamics, Organic, Bonding, Nomenclature, Stoichiometry |
| `concepts`, `cheat_sheets`, `concept_games`, `concept_cheat_sheets` tables | `supabase/migrations/20260913_create_concepts.sql`, [`../DATABASE_CONCEPTS.md`](../DATABASE_CONCEPTS.md) | 13 seeded concepts, each with one `year_level` (check-constrained to the five values), a `strand` (the 9 categories) and a VCAA `curriculum_ref`, plus `parent_id` for nesting |
| `profiles.year_level` (unconstrained text; the app validates against `YEAR_LEVEL_OPTIONS`) and `profiles.country` (free text, ≤ 30 characters) | `supabase/migrations/202607180001_create_profiles.sql`, `src/lib/validation/profile.ts` | What a student says about themselves |
| `yearLevels` dictionary labels | `src/i18n/dictionaries/*.ts` | Per-**locale** labels for the five values |

### 6.2 What is different in the new structure

| Today | The map | Why it matters |
|---|---|---|
| One curriculum (Victoria), implied | `CountryCode` on everything; 10 countries | A year label means nothing without the country. |
| Five bands, with 11 and 12 merged as "Senior" | `SchoolYear` 7–12, plus a `track` | "Senior" hides the Year 11 / Year 12 split and every track split. |
| One year per sheet or concept | A list of `Placement`s per concept per country, each `{from, to, depth, track?, status}` | The same concept is met more than once at rising depth, often on different tracks. |
| 9 strands, 13 concepts | 26 areas, 160 canonical concepts (`concepts.ts`) | The old concepts are too coarse to place: `acids-and-bases` spans Year 7 indicators and Year 12 buffers. |
| `curriculumRef` free text | `status` (official / typical / planned / unverified), plus a report and a `basis` per country | Says how firm a placement is and where it comes from. |
| Nothing about change | `change` per country: stability, cadence, upcoming reforms, `recheckBy` | Placements have a shelf life (see §3). |
| Year labels per locale | `CountryYear.localLabel` per **country** | Spanish is spoken in ES, MX and AR, whose year labels all differ. Russian-speaking users may be in RU or UA. |

Two things in today's data conflict with the new rule:

- **The Italian locale's year labels are off by one.** `it.ts` maps `Year 7` to "1ª media" by age. Under the country's own count, 1ª media is Year 6 and Year 7 is 2ª media. The French and Spanish locale labels happen to agree with the rule. German and Russian number their years the same way as the site. This only bites once year tags mean "the country's Year N". Until then the labels are an approximation by age, and their code comments say so.
- **Ids.** Nine canonical ids *are* existing `concepts.id` values: `states-of-matter`, `lewis-structures`, `polyatomic-ions`, `inorganic-nomenclature`, `balancing-equations`, `reaction-types`, `functional-groups`, `organic-nomenclature`, `reaction-pathways`. Four existing concepts are too coarse and split into several canonical ids: `acids-and-bases`, `chemical-bonding`, `ionic-compounds`, `stoichiometry`. Every canonical id satisfies the `concepts.id` check constraint, and a test enforces it.

### 6.3 Crosswalk: current content to canonical concepts

The crosswalk is recorded in code as `legacy` on each canonical concept, and a test checks that every seeded DB concept and every named cheat sheet exists.

| Current | Canonical concepts |
|---|---|
| DB `acids-and-bases` / sheet `acids-and-bases` | `acids-bases-indicators`, `neutralisation`, `acid-base-theories`, `strong-weak-acids`, `reactions-of-acids` |
| DB `chemical-bonding` / sheet `chemical-bonds` | `ionic-bonding`, `covalent-bonding`, `metallic-bonding`, `giant-structures` |
| DB `ionic-compounds` / sheet `chemical-formulas` | `ionic-formulas`, `chemical-symbols-formulas` |
| DB `stoichiometry` / sheet `stoichiometry` | `mole-concept`, `reacting-masses`, `limiting-reagent`, `yield-and-atom-economy` |
| DB `functional-groups` / sheet `functional-groups` | `functional-groups`, `homologous-series`, `organic-reaction-types`, `ir-nmr-ms`, `structural-formulas` |
| DB `reaction-pathways` | `reaction-pathways`, `organic-reaction-types` |
| sheet `atomic-structure` | `subatomic-particles` |
| sheet `isotopes-and-radioactivity` | `isotopes`, `radioactivity`, `nuclear-equations` |
| sheet `relative-formula-mass` | `relative-formula-mass` |
| sheet `balancing-equations` | `balancing-equations`, `writing-equations` |
| sheet `lewis-structures` | `lewis-structures`, `molecular-shape` |
| sheet `organic-nomenclature` | `organic-nomenclature`, `structural-formulas` |
| All other DB concepts and sheets | The canonical concept with the same id |

A proposed tagging for the five games is below. Each cell is the earliest year in which any of the game's concepts is met; brackets mean a track only. This is what "Year 9", "Year 10" and "Senior" become once the country is known:

| Game (proposed concepts) | Site tag today | US | GB | FR | ES | IT | RU | UA | IL | MX | AR |
|---|---|---|---|---|---|---|---|---|---|---|---|
| acid-classification (`acids-bases-indicators`, `strong-weak-acids`) | Year 9 | 10 (8) | 7 | 9 | (12) | 7 | 8 | 9 | (8) | 9 | 9 |
| formula-blaster (`ionic-formulas`, `polyatomic-ions`, `inorganic-nomenclature`) | Year 10 | 10 | 7 | 10 | 9 | 11 (9) | 8 | 8 | (10) | (10) | 9 |
| neutralise (`neutralisation`, `reactions-of-acids`, `polyatomic-ions`) | Year 9–10 | 10 | 9 | 8 | (10) | · | 8 | 9 | (9) | 9 | (12) |
| reaction-balancer (`balancing-equations`, `reaction-types`, `reacting-masses`) | Year 10, Senior | 10 | 8 | 10 | 9 | 11 (9) | 8 | 7 | 8 | 11 (10) | 8 |
| lewis-structures (`covalent-bonding`, `lewis-structures`, `molecular-shape`) | Year 10, Senior | 10 | 10 | 10 | 9 | 7 | 8 | 8 | 9 | 9 | 9 |

"Earliest" flatters some cells. For example, England's formula-blaster reads 7 because basic naming is in KS3, though ionic formulas are Year 10. A real feature should use the game's *main* concept, or the latest of its concepts, rather than the minimum.

### 6.4 Migration steps

Each step can ship alone, and none of them breaks the one before.

1. **Done: data and docs, no runtime use.** The map lives in `src/core-engine/data/curriculum/`, nothing imports it yet, and the tests keep it consistent. `YearLevel` is untouched.
   **Testing:** the 67 tests in `src/core-engine/tests/curriculum-map.test.ts` are not needed until phase 2, because they check reference data that nothing reads yet. They can be left out of targeted runs; see [`../TESTING.md`](../TESTING.md), "What runs where". Run them again whenever the curriculum data itself is edited.
2. **Tag content with canonical concepts.** Add `conceptIds: ConceptId[]` to `CheatSheetTopic` and `GameTopic`, filled from the crosswalk above. Keep `yearLevel`/`yearLevels` and `CheatSheetCategory`: they still drive the filters. Add a test that every tagged id exists. Nothing user-visible changes.
3. **Put Australia into the map.** The site's existing tags are Victorian, so adding `AU` as an eleventh country (Victorian Curriculum 2.0 Levels 7–10, VCE Units 1–4) makes every current `YearLevel` a query over the map instead of a hand-maintained value. Only after that can `yearLevel` be *derived* rather than stored. This needs one more research pass.
4. **Database (optional; keep the data in code by default).** The map is static, reviewed, version-controlled reference data, so code is the right home for it until an admin UI needs to edit it. If reporting needs it in SQL:
   - Insert the 160 canonical concepts into `concepts`. Keep the 9 shared ids. Make the 4 coarse ones parents: set `parent_id` on their canonical children and keep them for `user_concept_progress` history.
   - Replace the `strand` check with the 26 areas, or add an `area` column and keep `strand` for the old UI.
   - Drop the `year_level` check on `concepts` and `cheat_sheets` in favour of a `concept_placements (country, concept_id, from_year, to_year, depth, track, status)` table generated from the TypeScript. Do not hand-edit it.
5. **Profiles.** Add `profiles.curriculum_country` (nullable, check-constrained to the supported ISO codes) and `profiles.school_year` (smallint, 1–13). Keep the free-text `country`: it is a display field and must not be parsed. Backfill:
   - `school_year` from `year_level` where it is `'Year N'`;
   - `'Senior'` becomes NULL, because it is ambiguous between 11 and 12;
   - `curriculum_country` stays NULL. Do not infer it from `country` text or from the locale.

   Ask students on their next profile edit. Put `curriculum_country` under the same privacy rules as `country` (`show_country`).
6. **UI.** The cheat-sheet and games year filters become "Year in your country". The year buttons come from `conceptsInYear(country, year, { track })`, and their labels from `localYearLabel()`. Where the country is unknown, keep the current Victorian bands. A track picker is needed from Year 10 on, but only for countries that have tracks.
7. **Retire `YearLevel`** once nothing stores it. `YEAR_LEVEL_OPTIONS` and the `yearLevels` dictionaries go with it. Fix or delete the "mapped by age" comments in `fr.ts`, `es.ts` and `it.ts`.

### 6.5 Keeping the map current

- **When a reform lands**, update that country's file and its report, bump `researchedOn` and move `recheckBy`. The test fails if `recheckBy` is not after `researchedOn`.
- **The earliest dates** are Argentina (Mar 2027), England and Spain (Jun 2027), Israel and Mexico (Aug 2027), and France, Italy, Russia and Ukraine (Sep 2027). A scheduled check, or a date in `docs/TODO.md`, would stop them slipping.
- **A teacher from each country should review their file** before it drives anything a student sees. `reviewedByTeacher` is `false` for all ten.

## 7. Caveats

- **This is desk research by agents.** Several official sites blocked automated access: France's ministry HTML pages, Israel's ministry sites (read through the Internet Archive), Ukraine's mon.gov.ua, parts of Mexico's SEP and UNAM, California's education department, and CCEA in Northern Ireland. Each report lists what it could not verify.
- **"Typical" placements are judgement.** They follow exam-board order (England), the *repères* (France), Madrid (Spain), or two school plans (Italy).
- **An absent concept means "not in the national documents found for Years 7–12".** It does not mean "never taught". For example, Ukraine's report does not list states of matter, which is probably covered in the Years 5–6 integrated course.
- **Depth labels are relative to each country.** Russia's "intro" to the mole in Year 8 is more quantitative than Mexico's "intro" in Year 11.
- **Mexico leaves out on purpose** the topics that existed only in its 2023 upper-secondary model, because no current Year 11 student meets them.
