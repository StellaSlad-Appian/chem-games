// src/core-engine/data/curriculum/countries/de-bw.ts
//
// Baden-Württemberg, Gymnasium. Source: docs/curriculum/countries/germany-baden-wuerttemberg.md, §8
// (generated from its placement tables, then reviewed).
//
// In 2026/27 every chemistry class (Kl. 8–12) is a G8 cohort on the Bildungsplan
// 2016 V2; the Kursstufe is Kl. 11–12 (J1/J2). The G9 plan (V3.0) enters from
// Kl. 8 in 2027/28 and makes Kl. 11 a compulsory organic-chemistry year from
// 2030/31: those rows are `planned`. The Kursstufe keeps its content and moves to
// Kl. 12–13 from 2031/32 (see `change.upcoming`), so its rows are not duplicated.
//
// Kl. 8–10 is one band in the plan; single-year placements inside it follow the
// 2017 Beispielcurricula and are `typical`. Researched across the whole plan,
// so every area but `nuclear` (taught in Physik) is covered.

import type { JurisdictionCurriculum } from '../../../types/curriculum';
import { at } from '../placement';

export const DE_BW: JurisdictionCurriculum = {
  code: 'DE-BW',
  country: 'DE',
  coveredAreas: [
    'matter', 'mixtures', 'atomic-structure', 'periodic-table', 'bonding', 'nomenclature', 'reactions',
    'stoichiometry', 'solutions', 'gases', 'acids-bases', 'redox', 'energetics', 'kinetics', 'equilibrium',
    'organic', 'polymers-materials', 'biochemistry', 'analytical', 'descriptive', 'applied',
    'skills-practical', 'skills-quantitative', 'skills-models', 'skills-inquiry',
  ],
  name: 'Germany — Baden-Württemberg (Gymnasium)',
  basis: 'Bildungsplan 2016 Gymnasium Chemie V2 (25.03.2022) for Kl. 8–10 and the Kursstufe (Basisfach, Leistungsfach); NwT profile; G9 plan V3.0 (08.04.2026) as planned.',
  researchedOn: '2026-09-25',
  report: 'docs/curriculum/countries/germany-baden-wuerttemberg.md',
  reviewedByTeacher: false,
  years: [
    { year: 7, localLabel: 'Klasse 7', localLabelEn: '7. Klasse', typicalAgeAtStart: 12, stage: 'Sekundarstufe I', delivery: 'none', note: 'No chemistry in G8 or G9 (Physik and Biologie only).' },
    { year: 8, localLabel: 'Klasse 8', localLabelEn: '8. Klasse', typicalAgeAtStart: 13, stage: 'Sekundarstufe I', delivery: 'separate', note: 'Chemie starts; G8 hours usually 2 (unverified).' },
    { year: 9, localLabel: 'Klasse 9', localLabelEn: '9. Klasse', typicalAgeAtStart: 14, stage: 'Sekundarstufe I', delivery: 'separate' },
    { year: 10, localLabel: 'Klasse 10', localLabelEn: '10. Klasse', typicalAgeAtStart: 15, stage: 'Sekundarstufe I', delivery: 'separate', note: 'Last G8 Sek I year; typically the organic-chemistry year.' },
    { year: 11, localLabel: 'J1', localLabelEn: 'Klasse 11 / Jahrgangsstufe 1', typicalAgeAtStart: 16, stage: 'Kursstufe (G8)', delivery: 'optional', note: 'Basisfach 3 h or Leistungsfach 5 h. From 2030/31 (G9) a compulsory Sek I year with organic chemistry.' },
    { year: 12, localLabel: 'J2', localLabelEn: 'Klasse 12 / Jahrgangsstufe 2', typicalAgeAtStart: 17, stage: 'Kursstufe (G8)', delivery: 'optional', note: 'G8 Abitur year; G9 J1 from 2031/32.' },
    { year: 13, localLabel: 'Klasse 13', localLabelEn: 'Klasse 13 (G9 only)', typicalAgeAtStart: 18, stage: 'Kursstufe (G9)', delivery: 'no-such-year', note: 'Only at the 44 G9 model schools in 2026/27; the general G9 Abitur year from 2032/33.' },
  ],
  tracks: {
    ga: 'Kursstufe Chemie as Basisfach (grundlegendes Niveau, 3 h)',
    ea: 'Kursstufe Chemie as Leistungsfach (erhöhtes Niveau, 5 h, written Abitur)',
    nwt: 'Profilfach Naturwissenschaft und Technik (naturwissenschaftliches Profil); only its chemistry-related standards',
  },
  change: {
    stability: 'moderate',
    reason: 'The return to G9 runs until 2033: a new Sek I plan from 2027/28 and a compulsory Kl. 11 from 2030/31; Kursstufe content is unchanged.',
    lastMajorRevision: { year: 2016, what: 'Bildungsplan 2016 (V2 in 2022); G9 plan V3.0 published 2026' },
    typicalIntervalYears: [8, 12],
    mechanism: 'ad-hoc',
    minorUpdates: 'Plan versions (V2 2022, V3.0 2026); yearly Abitur Facherlass.',
    upcoming: [
      { when: '2027-08', what: 'Chemie V3.0 (G9) starts in Kl. 8, then rises one year at a time', status: 'adopted' },
      { when: '2030-08', what: 'Compulsory Kl. 11 with organic chemistry for all (V3.0)', status: 'adopted' },
      { when: '2031-08', what: 'Kursstufe moves to Kl. 12/13 with unchanged content; no regular Abitur in 2032', status: 'adopted' },
      { when: '2033', what: 'First G9 Abitur', status: 'adopted' },
    ],
    recheckBy: '2027-09-30',
  },
  placements: {
    'particle-model': [at(8, 'develop', { status: 'typical', note: 'Stoffteilchenmodell; diffusion, Brownian motion (V2 3.2.1.2 (3)); builds on BNT Kl. 5/6' })],
    'states-of-matter': [at(8, 'develop', { status: 'typical', note: 'Aggregatzustände with the particle model' })],
    'physical-properties': [at(8, 'develop', { status: 'typical', note: 'Stoffeigenschaften: mp, bp, conductivity, solubility (3.2.1.1 (1))' })],
    density: [at(8, 'develop', { status: 'typical', note: 'Property (3.2.1.1 (1)) and calculation (3.2.2.2 (7))' })],
    'elements-compounds-mixtures': [at(8, 'develop', { status: 'typical', note: 'Ordnungsprinzip: Element, Verbindung, Reinstoff, Gemisch (3.2.1.1 (6))' })],
    'mixture-types': [at(8, 'develop', { status: 'typical', note: 'homogen/heterogen, Lösung, Legierung, Suspension, Emulsion, Rauch, Nebel' })],
    colloids: [at(8, 'intro', { status: 'typical', note: 'Suspension, Emulsion, Rauch, Nebel as classes only' })],
    'separation-techniques': [at(8, 'develop', { status: 'typical', note: 'Plan and carry out a separation (3.2.1.1 (4))' })],
    'subatomic-particles': [at(9, 'develop', { status: 'typical', note: 'Proton, Elektron, Neutron; Massenzahl (3.2.1.2 (5), (7))' })],
    'atomic-models-history': [
      at(9, 'develop', { status: 'typical', note: 'Rutherford experiment; Kern-Hülle and Schalen/Energiestufenmodell' }),
      at([11, 12], 'extend', { track: 'ea', note: 'Orbital model (LF 3.4.8 (1)); not in the written Abitur' }),
    ],
    isotopes: [at(9, 'intro', { status: 'unverified', note: 'Neutronenanzahl/Massenzahl are named; "Isotop" is not' })],
    'electron-shells': [at(9, 'develop', { status: 'typical', note: 'Schalenmodell/Energiestufenmodell, Außenelektronen, Edelgaskonfiguration' })],
    'electron-configuration': [at([11, 12], 'extend', { track: 'ea', note: '"energetischer Zustand der Elektronen … Orbitalmodell" (3.4.8 (1)); s/p/d not named' })],
    'periodic-table-structure': [at(9, 'develop', { status: 'typical', note: 'Hauptgruppe, Periode, Ordnungszahl (3.2.1.2 (7))' })],
    'periodic-table-history': [at(9, 'intro', { status: 'typical', note: '"Vorhersagen von Mendelejew"' })],
    'periodic-law-electronic': [at(9, 'develop', { status: 'typical', note: 'Atombau ↔ Stellung im PSE' })],
    'group-chemistry': [at(9, 'intro', { status: 'typical', note: 'Alkali metals and halogens in the Beispielcurricula; no group named in the standards' })],
    'periodic-trends': [at(9, 'intro', { status: 'typical', note: 'Ionisierungsenergie, Elektronegativität' })],
    'ionic-bonding': [at(9, 'develop', { status: 'typical', note: 'Ionenbindung, Ionengitter, properties of salts' })],
    'covalent-bonding': [at(9, 'develop', { status: 'typical', note: 'Elektronenpaarbindung, Edelgasregel, multiple bonds' })],
    'metallic-bonding': [at(9, 'develop', { status: 'typical', note: 'Elektronengasmodell' })],
    'bond-polarity': [at(9, 'develop', { status: 'typical', note: 'Elektronegativität, polar/unpolar; dipole molecules' })],
    'lewis-structures': [at(9, 'develop', { status: 'typical', note: '"Lewis-Schreibweise" (V2 3.2.1.3 (3)); V3.0 says Valenzstrichformel' })],
    'molecular-shape': [at(9, 'develop', { status: 'typical', note: 'Elektronenpaarabstoßungsmodell' })],
    'intermolecular-forces': [
      at([9, 10], 'develop', { status: 'typical', note: 'Water in Kl. 9; organic bp/solubility in Kl. 10; "Wechselwirkungen zwischen temporären/permanenten Dipolen, Wasserstoffbrücken"' }),
      at(11, 'develop', { status: 'planned', note: 'Applied to organic molecules (3.2.2.3)' }),
    ],
    'giant-structures': [at(9, 'develop', { status: 'typical', note: 'Ionengitter; assigning Stoffteilchen and bond type to substances; no network solids or allotropes named' })],
    hybridisation: [at([11, 12], 'extend', { track: 'ea', status: 'unverified', note: 'Orbital model applied to bonding (3.4.8 (1)); sp/sp²/sp³ not named' })],
    'chemical-symbols-formulas': [at(8, 'develop', { status: 'typical', note: 'Formelschreibweise; information content of a formula' })],
    'ionic-formulas': [at(9, 'develop', { status: 'typical', note: 'Verhältnisformeln via Edelgasregel (3.2.2.2 (4))' })],
    'polyatomic-ions': [at(9, 'intro', { status: 'typical', note: '"Ionengruppen"' })],
    'inorganic-nomenclature': [
      at([8, 10], 'intro', { status: 'unverified', note: 'Salt names are used but no naming standard exists in V2 (V3.0 LF adds salt nomenclature)' }),
      at([12, 13], 'extend', { track: 'ea', status: 'planned', note: 'LF 3.4.7 (3) adds "Nomenklatur von Salzen"' }),
    ],
    'organic-nomenclature': [
      at(10, 'develop', { status: 'typical', note: 'IUPAC for Alkane, Alkanole, Alkanale, Alkanone, Carbonsäuren (V2 3.2.1.2 (11))' }),
      at(11, 'develop', { status: 'planned', note: '+ Halogenkohlenwasserstoffe, simple multifunctional molecules' }),
    ],
    'physical-chemical-change': [at(8, 'develop', { status: 'typical', note: 'Merkmale chemischer Reaktionen; bonds broken and made' })],
    'conservation-of-mass': [at(8, 'develop', { status: 'typical', note: 'Mass and atom-number conservation' })],
    'writing-equations': [at(8, 'develop', { status: 'typical', note: 'Reaktionsgleichungen in Formelschreibweise' })],
    'balancing-equations': [at(8, 'develop', { status: 'typical' })],
    'reaction-types': [at([8, 10], 'develop', { note: 'Synthese/Analyse, redox and acid–base via Donator-Akzeptor' })],
    combustion: [at(8, 'develop', { status: 'typical', note: 'Reactions with O₂; fire-fighting' })],
    'relative-formula-mass': [at(8, 'develop', { status: 'typical', note: 'Atommasse, molare Masse' })],
    'mole-concept': [at([8, 10], 'develop', { note: 'Stoffmenge, Teilchenzahl, molare Masse (3.2.2.2 (7)); Kl. 8 in Beispielcurriculum 1, Kl. 9–10 in 2' })],
    'reacting-masses': [at(10, 'develop', { status: 'typical', note: 'Stoichiometry of alkane combustion (Beispielcurricula)' })],
    'empirical-formula': [
      at(8, 'intro', { status: 'typical', note: 'Massenverhältnis → Verhältnisformel (3.2.2.2 (2))' }),
      at(11, 'develop', { status: 'planned', note: '"Summenformel mithilfe des molaren Volumens experimentell ermitteln"' }),
    ],
    'dissolving-solubility': [at([8, 9], 'develop', { status: 'typical', note: 'Löslichkeit; Lösungsvorgang of salts (Hydratation)' })],
    'electrolytic-dissociation': [at(9, 'develop', { status: 'typical', note: 'Conductivity of salt solutions; ions in solution' })],
    'mass-concentration': [at([8, 10], 'develop', { note: 'Massenanteil' })],
    'molar-concentration': [at([9, 10], 'develop', { status: 'typical', note: 'Stoffmengenkonzentration' })],
    'molar-gas-volume': [
      at([8, 10], 'develop', { note: 'Molares Volumen (3.2.2.2 (7)); Avogadro in the Beispielcurricula' }),
      at(11, 'develop', { status: 'planned', note: 'Removed from the 8–10 list; used experimentally in Kl. 11' }),
    ],
    'acids-bases-indicators': [at([8, 9], 'develop', { status: 'typical', note: 'pH-Skala qualitative; plant dye, universal indicator, Thymolphthalein' })],
    neutralisation: [at(9, 'develop', { status: 'typical', note: 'Protonenübergang, Neutralisation' })],
    'acid-base-theories': [
      at(9, 'develop', { status: 'typical', note: 'Donator-Akzeptor-Prinzip (proton transfer)' }),
      at([11, 12], 'develop', { track: 'ga', note: 'Brønsted (3.3.2 (10))' }),
      at([11, 12], 'extend', { track: 'ea', note: 'Brønsted, conjugate pairs, water as an amphoteric particle' }),
    ],
    'ph-calculations': [
      at([11, 12], 'develop', { track: 'ga', note: 'pH definition, autoprotolysis, strong monoprotic acids and bases' }),
      at([11, 12], 'extend', { track: 'ea', note: '+ Näherungsverfahren for weak acids and bases' }),
    ],
    'strong-weak-acids': [
      at([11, 12], 'develop', { track: 'ga', note: 'Classify by pKS' }),
      at([11, 12], 'extend', { track: 'ea', note: 'pKS and pKB' }),
    ],
    'acid-dissociation-constants': [
      at([11, 12], 'develop', { track: 'ga', note: '"KS aus dem MWG ableiten", pKS' }),
      at([11, 12], 'extend', { track: 'ea', note: 'KS, pKS, pKB; weak-acid pH' }),
    ],
    buffers: [at([11, 12], 'extend', { track: 'ea', note: 'Henderson–Hasselbalch' })],
    'redox-oxygen': [at(8, 'develop', { status: 'typical', note: 'Oxidation/reduction with oxygen (Beispielcurricula Kl. 8)' })],
    'redox-electron-transfer': [
      at(9, 'develop', { status: 'typical', note: 'Donator-Akzeptor, Elektronenübergang' }),
      at([11, 12], 'develop', { track: 'ga', note: 'Electrolysis and galvanic cells as redox' }),
      at([11, 12], 'extend', { track: 'ea', note: 'Redoxpaare; Reduktions-/Oxidationsvermögen' }),
    ],
    'reactivity-series': [at([11, 12], 'develop', { track: 'ea', note: 'Metals in metal-salt solutions (3.4.7 (2))' })],
    'oxidation-states': [
      at(10, 'develop', { status: 'typical', note: 'Oxidationszahlen in the oxidation of alkanols (3.2.2.1 (11))' }),
      at([11, 12], 'extend', { track: 'ea', note: 'Identify and balance redox reactions (3.4.7 (3))' }),
      at(11, 'develop', { status: 'planned', note: 'In the oxidation series; no longer in the 8–10 band' }),
    ],
    'balancing-redox': [at([11, 12], 'extend', { track: 'ea', note: 'Redox equations via oxidation numbers' })],
    electrolysis: [
      at(9, 'intro', { status: 'typical', note: 'Electrolysis of a metal-salt solution as energy storage (3.2.2.3 (4))' }),
      at([11, 12], 'develop', { track: 'ga', note: 'Forced redox reaction' }),
      at([11, 12], 'extend', { track: 'ea', note: 'Zersetzungsspannung, Faraday-Gesetz, Überspannung' }),
    ],
    'electrochemical-cells': [
      at([11, 12], 'develop', { track: 'ga', note: 'Daniell cell; battery, accumulator, fuel cell' }),
      at([11, 12], 'extend', { track: 'ea', note: '+ measured cell voltages, lead-acid accumulator, double layer' }),
    ],
    'electrode-potentials': [
      at([11, 12], 'develop', { track: 'ga', note: 'Cell voltage from standard potentials' }),
      at([11, 12], 'extend', { track: 'ea', note: 'Standard hydrogen half-cell, predictions, Nernst equation' }),
    ],
    corrosion: [
      at([11, 12], 'develop', { track: 'ga', note: 'Corrosion and protection' }),
      at([11, 12], 'extend', { track: 'ea', note: 'Oxygen and acid corrosion, sacrificial anode' }),
    ],
    'exo-endothermic': [
      at(8, 'develop', { status: 'typical', note: 'exotherm/endotherm; "Reaktionsenergie"' }),
      at([11, 12], 'develop', { track: 'ga', note: '+ Brennwert, Heizwert' }),
      at([11, 12], 'develop', { track: 'ea', note: '+ Brennwert, Heizwert' }),
    ],
    'reaction-profiles': [at([8, 10], 'develop', { note: 'Energy states of reactants and products; Ea contrasted with endothermic energy demand; catalyst lowers Ea' })],
    'enthalpy-calorimetry': [
      at([11, 12], 'develop', { track: 'ga', note: 'Calorimetry, Reaktionsenthalpie' }),
      at([11, 12], 'develop', { track: 'ea', note: '+ open/closed/isolated systems' }),
    ],
    'hess-law': [
      at([11, 12], 'develop', { track: 'ga', note: '1. Hauptsatz, Reaktions- and Bildungsenthalpien' }),
      at([11, 12], 'develop', { track: 'ea', note: 'Same standard' }),
    ],
    'entropy-gibbs': [at([11, 12], 'extend', { track: 'ea', note: 'Entropy as microstates; 2nd law; Gibbs–Helmholtz calculations incl. T; metastability; Basisfach has none' })],
    'rate-factors': [
      at([8, 10], 'intro', { note: 'Zerteilungsgrad only (V2 3.2.2.1 (7))' }),
      at([11, 12], 'develop', { track: 'ga', note: 'Concentration, temperature, catalyst' }),
      at([11, 12], 'develop', { track: 'ea', note: 'Same, plus "Reaktionsrate"' }),
      at([8, 10], 'intro', { status: 'planned', note: 'Zerteilungsgrad and temperature (V3.0 3.1.3.1 (8)); from 2027/28' }),
    ],
    'collision-theory': [
      at([11, 12], 'develop', { track: 'ga', note: 'Stoßtheorie, RGT-Regel' }),
      at([11, 12], 'develop', { track: 'ea', note: 'Stoßtheorie, RGT-Regel, Reaktionsrate' }),
    ],
    catalysts: [
      at([8, 10], 'intro', { note: 'Catalysts lower the activation energy' }),
      at([11, 12], 'develop', { track: 'ga', note: 'Catalyst and rate; Haber–Bosch' }),
      at([11, 12], 'extend', { track: 'ea', note: 'Homogeneous and heterogeneous catalysis (3.4.1 (8))' }),
    ],
    'measuring-rate': [
      at([11, 12], 'develop', { track: 'ga', status: 'unverified', note: '"Reaktionsgeschwindigkeit … beschreiben"; Δc/Δt and graphs not stated' }),
      at([11, 12], 'develop', { track: 'ea', status: 'unverified', note: 'As for ga' }),
    ],
    'reversible-reactions': [
      at([8, 10], 'intro', { note: 'Umkehrbarkeit: Synthese und Analyse' }),
      at([11, 12], 'develop', { track: 'ga', note: 'Dynamic equilibrium, ester equilibrium, model experiment' }),
      at([11, 12], 'extend', { track: 'ea', note: 'Equilibrium as equal forward and back Reaktionsraten' }),
    ],
    'le-chatelier': [
      at([11, 12], 'develop', { track: 'ga', note: 'Experimental; Haber–Bosch conditions' }),
      at([11, 12], 'develop', { track: 'ea', note: 'Concentration, pressure, temperature; Haber–Bosch' }),
    ],
    'equilibrium-constant': [
      at([11, 12], 'develop', { track: 'ga', note: 'MWG, Kc — "beschreiben"' }),
      at([11, 12], 'extend', { track: 'ea', note: 'Calculations incl. equilibrium concentrations; measured Estergleichgewicht' }),
    ],
    'solubility-product': [at([11, 12], 'extend', { track: 'ea', note: 'KL, heterogeneous equilibrium' })],
    'organic-intro': [
      at(10, 'develop', { status: 'typical', note: 'Methan, Heptan, Ethen, Ethanol, Propanal, Propanon, Ethansäure, Ethansäureethylester' }),
      at(11, 'develop', { status: 'planned', note: 'V3.0 3.2.2.1 (1)–(3); from 2030/31' }),
    ],
    hydrocarbons: [
      at(10, 'develop', { status: 'typical', note: 'Alkanes and alkenes; substitution and addition; alkynes not named' }),
      at(11, 'develop', { status: 'planned', note: 'Alkanes, alkenes; SR and addition' }),
    ],
    'crude-oil-fuels': [
      at(10, 'intro', { status: 'typical', note: 'Benzin; Erdöl, fractional distillation and cracking in the Beispielcurricula' }),
      at(11, 'intro', { status: 'planned', note: '"Gewinnung organischer Stoffe (… fossile Brennstoffe …)"' }),
    ],
    'homologous-series': [
      at(10, 'develop', { status: 'typical', note: '"homologe Reihe der Alkane und Alkanole"' }),
      at(11, 'develop', { status: 'planned', note: 'Alkanes and alkanols' }),
    ],
    'functional-groups': [
      at(10, 'develop', { status: 'typical', note: 'Hydroxy, Aldehyd, Keto, Carboxy, Ester; C=C' }),
      at([11, 12], 'develop', { track: 'ga', note: 'Carbonyl and amino groups in Naturstoffe' }),
      at([11, 12], 'develop', { track: 'ea', note: 'Carbonyl, amino, ester groups in Naturstoffe and Kunststoffe' }),
      at(11, 'develop', { status: 'planned', note: '+ "Aminogruppe in Aminosäuren"' }),
    ],
    'oxygen-organics': [
      at(10, 'develop', { status: 'typical', note: 'Alkanole, Alkanale, Alkanone, Alkansäuren, Ester; esterification; oxidation series' }),
      at([11, 12], 'develop', { track: 'ga', note: 'Ester equilibrium; fats as esters' }),
      at([11, 12], 'extend', { track: 'ea', note: 'Esterification as a reversible reaction with mechanism; Halbacetal/Acetal' }),
      at(11, 'develop', { status: 'planned', note: 'Stepwise oxidation alkane → alkanol → alkanal/alkanone → alkanoic acid; esterification' }),
    ],
    'nitrogen-organics': [
      at([11, 12], 'intro', { track: 'ga', note: 'Only the amino group of amino acids and the peptide bond' }),
      at([11, 12], 'intro', { track: 'ea', note: 'L-α-amino acids, peptide bond formation and hydrolysis; no amines as a class' }),
      at(11, 'intro', { status: 'planned', note: 'Amino group in amino acids only' }),
    ],
    'aromatic-compounds': [at([11, 12], 'extend', { track: 'ea', note: 'Benzene: Kekulé, delocalisation, Mesomeriestabilisierung, SE' })],
    isomerism: [
      at(10, 'develop', { status: 'typical', note: 'Not a V2 standard; taught with alkanes (Beispielcurriculum 1)' }),
      at(11, 'develop', { status: 'planned', note: '"Strukturisomerie" (now official in V3.0)' }),
    ],
    'optical-isomerism': [
      at([11, 12], 'develop', { track: 'ga', note: 'Chiralität, Fischer and Haworth projections (3.3.3 (3))' }),
      at([11, 12], 'extend', { track: 'ea', note: 'Asymmetric C atom, Fischer projection, D/L' }),
    ],
    'organic-reaction-types': [
      at(10, 'develop', { status: 'typical', note: 'Substitution, addition, condensation (esterification), oxidation' }),
      at([11, 12], 'extend', { track: 'ea', note: 'Compare SE, SN, SR; polymerisation, polycondensation, polyaddition' }),
      at(11, 'develop', { status: 'planned', note: 'Substitution, addition, condensation (esterification)' }),
    ],
    'reaction-mechanisms': [
      at(10, 'develop', { status: 'typical', note: 'Radical substitution, alkane + halogen (V2 3.2.2.1 (10))' }),
      at([11, 12], 'intro', { track: 'ga', note: 'Electrophilic addition, only to explain the unsaturated-fat test' }),
      at([11, 12], 'extend', { track: 'ea', note: 'EA, SE (Arenium-Ion), esterification (Carbokation, nucleophiler Angriff), radical polymerisation; SN named only in the comparison' }),
      at(11, 'develop', { status: 'planned', note: 'Radical substitution' }),
    ],
    'polymers-intro': [
      at(10, 'intro', { status: 'typical', note: '"Aufbauprinzip von Polymeren an einem Beispiel"' }),
      at([11, 12], 'develop', { track: 'ga', note: 'Thermoplaste, Duromere, Elastomere and their structures' }),
      at([11, 12], 'extend', { track: 'ea', note: '+ degree of cross-linking, crystalline and amorphous regions, processing' }),
      at(11, 'intro', { status: 'planned', note: '"Polyethen oder Polyester"' }),
    ],
    'addition-polymerisation': [
      at([11, 12], 'develop', { track: 'ga', note: 'Principle of Polymerisation' }),
      at([11, 12], 'extend', { track: 'ea', note: 'Radical polymerisation mechanism; PE, PP, PVC, PS' }),
    ],
    'condensation-polymerisation': [
      at([11, 12], 'develop', { track: 'ga', note: 'Principle of Polykondensation' }),
      at([11, 12], 'extend', { track: 'ea', note: 'Polyester, polyamide, PLA; plus Polyaddition (polyurethane)' }),
    ],
    'plastics-and-recycling': [
      at([11, 12], 'develop', { track: 'ga', note: 'Werkstoff-/Rohstoffrecycling, energetische Verwertung, Kompostierung' }),
      at([11, 12], 'develop', { track: 'ea', note: 'Same, plus renewable feedstocks' }),
    ],
    alloys: [at(8, 'intro', { status: 'typical', note: '"Legierung" as a class of mixture' })],
    materials: [
      at([8, 9], 'intro', { status: 'typical', note: 'Nanoparticles; surface-to-volume ratio (V2 3.2.1.1 (7), 3.2.1.2 (4))' }),
      at([11, 12], 'extend', { track: 'ea', note: 'Nanomaterials, lotus effect (3.4.8 (2)–(3))' }),
      at([8, 10], 'develop', { track: 'nwt', note: 'NwT 3.2.3.1: properties and suitability of materials' }),
    ],
    'food-molecules': [
      at([11, 12], 'develop', { track: 'ga', note: 'Fats, carbohydrates, proteins: tests and functions' }),
      at([11, 12], 'extend', { track: 'ea', note: 'Fats vs carbohydrates as energy stores' }),
    ],
    carbohydrates: [
      at([11, 12], 'develop', { track: 'ga', note: 'Monosaccharides, Fischer/Haworth, disaccharides' }),
      at([11, 12], 'extend', { track: 'ea', note: 'Aldose/ketose, Halbacetal, α/β, glycosidic bond, starch, cellulose, reducing sugars' }),
    ],
    lipids: [
      at([11, 12], 'develop', { track: 'ga', note: 'Fat structure; saturated and unsaturated fatty acids; soaps not named' }),
      at([11, 12], 'develop', { track: 'ea', note: '+ hydrophobic/lipophilic, consistency, addition of halogens' }),
    ],
    'amino-acids-proteins': [
      at([11, 12], 'develop', { track: 'ga', note: 'Amino acids, dipeptide, Biuret' }),
      at([11, 12], 'extend', { track: 'ea', note: 'Primary to quaternary structure, denaturation, Ninhydrin' }),
    ],
    'nucleic-acids': [at([11, 12], 'intro', { track: 'ga', note: 'Classify and name functions only; not in the Leistungsfach' })],
    'photosynthesis-respiration': [at(10, 'intro', { status: 'typical', note: 'Carbon cycle in living nature (3.2.2.1 (12))' })],
    'gas-tests': [at(8, 'develop', { status: 'typical', note: 'O₂, CO₂, H₂, water' })],
    'ion-tests': [
      at([8, 10], 'develop', { note: 'Oxonium, hydroxide, bromide, chloride' }),
      at([11, 12], 'develop', { track: 'ga', note: 'Carbonate, ammonium, oxonium, hydroxide via acid–base' }),
      at([11, 12], 'develop', { track: 'ea', note: 'Ammonium, carbonate' }),
    ],
    'functional-group-tests': [
      at(10, 'develop', { status: 'typical', note: 'C=C and aldehyde group; test names not given (Bromwasser in Beispielcurriculum 1)' }),
      at([11, 12], 'develop', { track: 'ga', note: 'Unsaturated fatty acids, GOD, Benedict, Biuret' }),
      at([11, 12], 'extend', { track: 'ea', note: 'Benedict or Tollens (reducing sugars), Ninhydrin, Biuret, GOD' }),
      at(11, 'develop', { status: 'planned', note: 'C=C and aldehyde group' }),
    ],
    chromatography: [at([11, 12], 'extend', { track: 'ea', note: 'TLC of universal indicator, Rf' })],
    titration: [
      at([9, 10], 'develop', { status: 'typical', note: 'Acid–base titration (neutralisation)' }),
      at([11, 12], 'extend', { track: 'ea', note: 'Curves, equivalence and half-equivalence points, polyprotic acids, conductometry, iodometry' }),
      at(11, 'develop', { status: 'planned', note: 'Titration of a carboxylic acid' }),
    ],
    'air-oxygen-hydrogen': [at(8, 'develop', { status: 'typical', note: 'Composition of air; properties of O₂ and H₂' })],
    'water-chemistry': [at(9, 'develop', { status: 'typical', note: 'Density anomaly, high boiling point, hydrogen bonds' })],
    'inorganic-compound-classes': [at([8, 9], 'intro', { status: 'typical', note: 'Metall, Nichtmetall, Salz; acidic and alkaline solutions' })],
    'non-metals-chemistry': [at(8, 'intro', { status: 'typical', note: 'N₂, O₂, H₂, Cl₂, S, C in reactions' })],
    'metals-chemistry': [at(8, 'intro', { status: 'typical', note: 'Fe, Cu, Ag, Mg, Na' })],
    'transition-metals': [at([11, 12], 'extend', { track: 'ea', note: 'Koordinative Bindung in tests; Komplexverbindungen optional (3.4.8 (4))' })],
    'atmosphere-climate': [at([8, 10], 'develop', { note: 'Air and global CO₂ effects; carbon cycle' })],
    'chemical-safety': [
      at(8, 'develop', { status: 'typical', note: 'Gefahrenpiktogramme; ethanol dangers' }),
      at([11, 12], 'develop', { track: 'ea', note: 'Exposure–risk relation (aromatics)' }),
    ],
    'resources-sustainability': [
      at(8, 'intro', { status: 'typical', note: 'From raw material to product' }),
      at([11, 12], 'develop', { track: 'ga', note: 'Plastics evaluation and recycling' }),
      at([11, 12], 'develop', { track: 'ea', note: 'Renewable feedstocks (carbohydrates, plastics)' }),
      at([8, 10], 'develop', { track: 'nwt', note: 'NwT 3.2.3.4 Stoffströme und Stoffkreisläufe' }),
    ],
    'fuels-energy': [
      at(10, 'develop', { status: 'typical', note: 'CO₂ balance and Reaktionsenergie of H₂, CH₄, petrol' }),
      at([11, 12], 'develop', { track: 'ga', note: 'Brennwert, Heizwert, fuel cell, alternative energy carriers' }),
      at([11, 12], 'develop', { track: 'ea', note: 'Brennwert, Heizwert, fuel cells, batteries' }),
      at([8, 10], 'develop', { track: 'nwt', note: 'NwT 3.2.2.2 Energieversorgungssysteme' }),
      at(11, 'develop', { status: 'planned', note: 'CO₂ balance and Reaktionsenergie of fuels' }),
    ],
    'industrial-processes': [
      at(8, 'intro', { status: 'typical', note: 'Industrial production (Kochsalz, Eisen, Kupfer, Benzin)' }),
      at([11, 12], 'develop', { track: 'ga', note: 'Haber–Bosch' }),
      at([11, 12], 'develop', { track: 'ea', note: 'Haber–Bosch' }),
      at([8, 10], 'develop', { track: 'nwt', note: 'NwT 3.2.3.4: a chemical-technical process, e.g. bioethanol' }),
    ],
    'metal-extraction': [at(8, 'intro', { status: 'typical', note: 'Eisen or Kupfer as an example of production' })],
    'lab-safety': [
      at(8, 'develop', { status: 'typical', note: 'Gefahrenpiktogramme; safe experimenting' }),
      at([8, 10], 'develop', { status: 'planned', note: 'New unit 3.1.1: Gasbrenner, Gefahrenpiktogramme' }),
    ],
    'units-and-conversions': [at([8, 10], 'develop', { note: '"Größen und Einheiten korrekt nutzen"' })],
    'chemical-calculations': [
      at([11, 12], 'develop', { track: 'ga', note: 'Hess, pH, E°cell' }),
      at([11, 12], 'extend', { track: 'ea', note: 'Gibbs–Helmholtz, Kc and equilibrium concentrations, KL, weak-acid pH, HH, Nernst' }),
    ],
    'graphs-and-data': [at([8, 10], 'develop', { note: 'Process standard: tables and diagrams' })],
    'particle-diagrams': [at(8, 'develop', { status: 'typical', note: 'Particle-model drawings' })],
    'macro-micro-symbolic': [at([8, 10], 'develop', { note: 'Stoff- vs Teilchenebene (stated principle)' })],
    'molecular-models': [at(9, 'develop', { status: 'typical', note: 'EPA model; spatial representation' })],
    'structural-formulas': [
      at(10, 'develop', { status: 'typical', note: 'Structural formulas of organic molecules' }),
      at([11, 12], 'develop', { track: 'ga', note: 'Fischer and Haworth' }),
      at([11, 12], 'extend', { track: 'ea', note: 'Fischer ↔ Haworth; polymer repeat units' }),
      at(11, 'develop', { status: 'planned', note: 'Structural formulas in the oxidation series' }),
    ],
    'reference-tables': [at([8, 10], 'develop', { note: 'Periodic table as an information source' })],
    'scientific-method': [at([8, 10], 'develop', { note: 'Process standards: Erkenntnisgewinnung' })],
    'evaluating-experiments': [at([8, 10], 'develop', { note: 'Process standards' })],
    'scientific-communication': [at([8, 10], 'develop', { note: 'Process standards: Kommunikation, protocols' })],
    'nature-of-science': [
      at(9, 'develop', { status: 'typical', note: 'Rutherford, Mendelejew; models' }),
      at([11, 12], 'extend', { track: 'ea', note: 'History of science (3.4.8)' }),
    ],
    'socio-scientific-issues': [at([8, 10], 'develop', { note: 'Process standards: Bewertung' })],
    'geometric-isomerism': [at(11, 'develop', { status: 'planned', note: '"cis-trans-Isomerie"; E/Z not used' })],
  },
  outsideRange: [
    'Kl. 5/6: G8 cohorts met chemistry basics in the integrated BNT (not researched); G9 cohorts have Biologie instead.',
    'Kl. 13 exists in 2026/27 only at the 44 G9 model schools.',
  ],
};
