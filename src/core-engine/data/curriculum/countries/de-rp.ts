// src/core-engine/data/curriculum/countries/de-rp.ts
//
// Rheinland-Pfalz, Gymnasium (G9). Source: docs/curriculum/countries/germany-rheinland-pfalz.md, §8
// (generated from its placement tables, then reviewed).
//
// Sek I: Lehrplan Naturwissenschaftliche Fächer (2014), chemistry as 12
// Themenfelder in a binding order but without years; single-year placements
// are `typical`. Oberstufe (Mainzer Studienstufe, MSS): Lehrplan Chemie (2022),
// units ordered freely across Jgst. 11–13, so MSS placements span 11–13 apart
// from the fixed Integrationsphase in 11/1. `ga` is the Grundkurs, `ea` the
// Leistungskurs; Fundamentum content is placed once per course.
//
// Not modelled: the few all-day G8 schools (G8GTS), where everything runs one
// year earlier (Sek I in 7–9, MSS in 10–12); see the report's §8.3.
// Researched across the whole plan, so every area but `nuclear` (taught in
// Physik) is covered.

import type { JurisdictionCurriculum } from '../../../types/curriculum';
import { at } from '../placement';

export const DE_RP: JurisdictionCurriculum = {
  code: 'DE-RP',
  country: 'DE',
  coveredAreas: [
    'matter', 'mixtures', 'atomic-structure', 'periodic-table', 'bonding', 'nomenclature', 'reactions',
    'stoichiometry', 'solutions', 'gases', 'acids-bases', 'redox', 'energetics', 'kinetics', 'equilibrium',
    'organic', 'polymers-materials', 'biochemistry', 'analytical', 'descriptive', 'applied',
    'skills-practical', 'skills-quantitative', 'skills-models', 'skills-inquiry',
  ],
  name: 'Germany — Rheinland-Pfalz (Gymnasium)',
  basis: 'Lehrplan Naturwissenschaftliche Fächer Sek I (2014, chemistry Themenfelder); Lehrplan Chemie für die gymnasiale Oberstufe (MSS, 2022), Grund- and Leistungskurs.',
  researchedOn: '2026-09-25',
  report: 'docs/curriculum/countries/germany-rheinland-pfalz.md',
  reviewedByTeacher: false,
  years: [
    { year: 7, localLabel: 'Klasse 7', localLabelEn: '7. Klasse', typicalAgeAtStart: 12, stage: 'Sekundarstufe I', delivery: 'separate', note: 'School-dependent: many G9 schools start chemistry in Kl. 8 (at least 6 hours over Kl. 7–10; split unverified).' },
    { year: 8, localLabel: 'Klasse 8', localLabelEn: '8. Klasse', typicalAgeAtStart: 13, stage: 'Sekundarstufe I', delivery: 'separate' },
    { year: 9, localLabel: 'Klasse 9', localLabelEn: '9. Klasse', typicalAgeAtStart: 14, stage: 'Sekundarstufe I', delivery: 'separate' },
    { year: 10, localLabel: 'Klasse 10', localLabelEn: '10. Klasse', typicalAgeAtStart: 15, stage: 'Sekundarstufe I', delivery: 'separate', note: 'Last Sek I year.' },
    { year: 11, localLabel: 'MSS 11', localLabelEn: 'Jahrgangsstufe 11 (Einführungs- and start of Qualifikationsphase)', typicalAgeAtStart: 16, stage: 'Mainzer Studienstufe', delivery: 'optional', note: 'Grundkurs (about 3 h) or Leistungskurs (about 5 h); 11/1 begins with the Integrationsphase.' },
    { year: 12, localLabel: 'MSS 12', localLabelEn: 'Jahrgangsstufe 12', typicalAgeAtStart: 17, stage: 'Mainzer Studienstufe', delivery: 'optional' },
    { year: 13, localLabel: 'MSS 13', localLabelEn: 'Jahrgangsstufe 13 (Abitur)', typicalAgeAtStart: 18, stage: 'Mainzer Studienstufe', delivery: 'optional', note: 'Written Abitur in January, at Leistungskurs level only.' },
  ],
  tracks: {
    ga: 'MSS Chemie Grundkurs (about 3 h)',
    ea: 'MSS Chemie Leistungskurs (about 5 h, written Abitur)',
  },
  change: {
    stability: 'stable',
    reason: 'The MSS Lehrplan dates from 2022 (first Abitur 2025) and no new Sek I or MSS Lehrplan is announced.',
    lastMajorRevision: { year: 2022, what: 'Lehrplan Chemie für die gymnasiale Oberstufe (MSS)' },
    typicalIntervalYears: [8, 12],
    mechanism: 'ad-hoc',
    minorUpdates: 'Yearly Abitur circulars; the Sek I Lehrplan (2014) may be revised for the 2024 KMK standards (unverified).',
    upcoming: [],
    recheckBy: '2027-09-30',
  },
  placements: {
    'particle-model': [at([7, 8], 'intro', { status: 'typical', note: 'TF 1 simple atom model (mass, size, sphere); builds on the Nawi 5/6 particle model' })],
    'states-of-matter': [at([7, 8], 'intro', { status: 'typical', note: 'Review only; taught in Nawi 5/6 (TF 5 "Teilchen, Aggregatzustand")' })],
    'physical-properties': [
      at([7, 8], 'intro', { status: 'typical', note: 'TF 2 melting temperature, conductivity, solubility, brittleness; TF 4 conductivity, density' }),
      at(11, 'develop', { track: 'ga', note: 'Integrationsphase "Struktur und Eigenschaften" (alkanes vs alkanols)' }),
      at(11, 'develop', { track: 'ea', note: 'Integrationsphase "Struktur und Eigenschaften" (alkanes vs alkanols)' }),
    ],
    density: [at(8, 'intro', { status: 'typical', note: 'TF 4 Fachbegriff "Dichte"' })],
    'elements-compounds-mixtures': [at([7, 8], 'intro', { status: 'typical', note: 'TF 1 element, compound; TF 2 Gemisch/Reinstoff' })],
    'mixture-types': [at(8, 'intro', { status: 'typical', note: 'TF 2 Gemisch, Lösung' })],
    'separation-techniques': [at(8, 'intro', { status: 'typical', note: 'TF 2 Kochsalz from brine; V: extraction, chromatography, distillation' })],
    colloids: [
      at([11, 13], 'develop', { track: 'ga', note: 'W 16.1 Tenside: Tyndall effect, micelles, emulsions' }),
      at([11, 13], 'develop', { track: 'ea', note: 'W 16.1 Tenside: Tyndall effect, micelles, emulsions' }),
    ],
    'subatomic-particles': [at(8, 'develop', { status: 'typical', note: 'TF 2 "differenziertes Atommodell": nucleus (p, n), shell (e)' })],
    'atomic-models-history': [at([7, 8], 'intro', { status: 'typical', note: 'TF 1 simple model (Dalton features deliberately omitted), TF 2 nucleus–shell' })],
    isotopes: [at([11, 13], 'extend', { track: 'ea', note: 'W 1.3 mass spectrometry only; radioactivity is Physics' })],
    'electron-shells': [
      at(8, 'intro', { status: 'typical', note: 'TF 2 V / TF 3 "Aufenthaltsbereich für Elektronen ist in sich gegliedert"' }),
      at(11, 'develop', { track: 'ga', note: 'Integrationsphase: Energiestufenmodell, ionisation energies' }),
      at(11, 'develop', { track: 'ea', note: 'Integrationsphase: Energiestufenmodell, ionisation energies' }),
    ],
    'electron-configuration': [
      at(11, 'develop', { track: 'ga', status: 'unverified', note: 'Integrationsphase "Aufbau des PSE: Elektronenkonfiguration"; level (shells vs s/p) unclear' }),
      at(11, 'develop', { track: 'ea', status: 'unverified', note: 'Integrationsphase "Aufbau des PSE: Elektronenkonfiguration"; level (shells vs s/p) unclear' }),
      at([11, 13], 'extend', { track: 'ea', note: 'W 8.7 Orbitalmodell: atomic orbitals, quantum numbers, Kästchenschema' }),
    ],
    'atomic-spectra': [
      at([11, 13], 'develop', { track: 'ga', note: 'W 1.5 Spektroskopie (excitation, emission/absorption), 6.1 colour (GK W / LK WP)' }),
      at([11, 13], 'develop', { track: 'ea', note: 'W 1.5 Spektroskopie (excitation, emission/absorption), 6.1 colour (GK W / LK WP)' }),
    ],
    'periodic-table-structure': [at([7, 8], 'intro', { status: 'typical', note: 'TF 1 PSE, element symbols' })],
    'group-chemistry': [at(10, 'intro', { status: 'unverified', note: 'Only as a TF 9 V option ("Elementfamilien" via mineral water)' })],
    'periodic-trends': [
      at(11, 'develop', { track: 'ga', note: 'Integrationsphase: ionisation energies, electronegativity' }),
      at(11, 'develop', { track: 'ea', note: 'Integrationsphase: ionisation energies, electronegativity' }),
    ],
    'periodic-law-electronic': [
      at(11, 'develop', { track: 'ga', note: 'Integrationsphase "Aufbau des PSE: Elektronenkonfiguration und Atommasse"' }),
      at(11, 'develop', { track: 'ea', note: 'Integrationsphase "Aufbau des PSE: Elektronenkonfiguration und Atommasse"' }),
    ],
    'ionic-bonding': [
      at(8, 'develop', { status: 'typical', note: 'TF 2 ions, ionic bonding, ion lattice, octet rule' }),
      at(11, 'develop', { track: 'ga', note: 'Integrationsphase review (Ionengruppe, Verhältnisformel)' }),
      at(11, 'develop', { track: 'ea', note: 'Integrationsphase review (Ionengruppe, Verhältnisformel)' }),
    ],
    'covalent-bonding': [
      at(8, 'develop', { status: 'typical', note: 'TF 3 Elektronenpaarbindung (H₂, O₂, H₂O, CH₄)' }),
      at(11, 'develop', { track: 'ga', note: 'Integrationsphase single and multiple bonds' }),
      at(11, 'develop', { track: 'ea', note: 'Integrationsphase single and multiple bonds' }),
    ],
    'metallic-bonding': [
      at(8, 'intro', { status: 'typical', note: 'TF 4 metal lattice with mobile electrons' }),
      at(11, 'develop', { track: 'ga', note: 'Integrationsphase Elektronengasmodell' }),
      at(11, 'develop', { track: 'ea', note: 'Integrationsphase Elektronengasmodell' }),
    ],
    'bond-polarity': [
      at(9, 'intro', { status: 'typical', note: 'TF 5 polar/unpolar, dipole; EN only as a V option' }),
      at(11, 'develop', { track: 'ga', note: 'Integrationsphase EN, partial charge, dipole' }),
      at(11, 'develop', { track: 'ea', note: 'Integrationsphase EN, partial charge, dipole' }),
    ],
    'lewis-structures': [
      at([8, 9], 'intro', { status: 'typical', note: 'TF 3 electron-pair bonds with molecule models; "Lewis" not named in Sek I' }),
      at(11, 'develop', { track: 'ga', note: 'Integrationsphase "Lewis-… Formel, Formalladungen"' }),
      at(11, 'develop', { track: 'ea', note: 'Integrationsphase "Lewis-… Formel, Formalladungen"' }),
    ],
    'molecular-shape': [
      at(9, 'intro', { status: 'typical', note: 'EPA model only as a V option (TF 3, TF 5)' }),
      at(11, 'develop', { track: 'ga', note: 'Integrationsphase Molekülgeometrie' }),
      at(11, 'develop', { track: 'ea', note: 'Integrationsphase Molekülgeometrie' }),
    ],
    'intermolecular-forces': [
      at(9, 'intro', { status: 'typical', note: 'TF 5 polarity and solubility; H-bonds and Van der Waals as V' }),
      at(11, 'develop', { track: 'ga', note: 'Integrationsphase: temporary and permanent dipoles, H-bonds, ion–dipole; boiling points' }),
      at(11, 'develop', { track: 'ea', note: 'Integrationsphase: temporary and permanent dipoles, H-bonds, ion–dipole; boiling points' }),
    ],
    'giant-structures': [at(8, 'intro', { status: 'typical', note: 'TF 2 ion lattice, TF 4 metal lattice' })],
    hybridisation: [at([11, 13], 'extend', { track: 'ea', note: 'W 8.7: sp/sp²/sp³, σ/π, MO theory, band model' })],
    'chemical-symbols-formulas': [at([7, 8], 'intro', { status: 'typical', note: 'TF 1 Elementsymbol, Formel' })],
    'ionic-formulas': [
      at(8, 'intro', { status: 'typical', note: 'TF 2 V Verhältnisformeln' }),
      at(11, 'develop', { track: 'ga', note: 'Integrationsphase Verhältnisformel' }),
      at(11, 'develop', { track: 'ea', note: 'Integrationsphase Verhältnisformel' }),
    ],
    'polyatomic-ions': [
      at(9, 'intro', { status: 'typical', note: 'TF 6 Oxonium-Kation, Hydroxid-Anion' }),
      at([11, 13], 'develop', { track: 'ga', note: '1.4 ion tests (carbonate, ammonium…)' }),
      at([11, 13], 'develop', { track: 'ea', note: '1.4 ion tests (carbonate, ammonium…)' }),
    ],
    'inorganic-nomenclature': [
      at([7, 8], 'intro', { status: 'typical', note: 'TF 1 "Stoffe werden in der Chemie nach klaren Regeln benannt" (Natriumchlorid)' }),
      at([11, 13], 'extend', { track: 'ea', note: '9.1 IUPAC names of complexes (LK P)' }),
    ],
    'organic-nomenclature': [
      at(9, 'intro', { status: 'typical', note: 'TF 5 names of the first ten alkanes; systematic naming explicitly omitted' }),
      at(11, 'develop', { track: 'ga', note: 'Integrationsphase "IUPAC-Nomenklatur"' }),
      at(11, 'develop', { track: 'ea', note: 'Integrationsphase "IUPAC-Nomenklatur"' }),
      at([11, 13], 'develop', { track: 'ga', note: '8.1, 8.2 (priority rules), 3.1–3.3 (aldehydes, ketones, acids, esters)' }),
      at([11, 13], 'develop', { track: 'ea', note: '8.1, 8.2 (priority rules), 3.1–3.3 (aldehydes, ketones, acids, esters)' }),
      at([11, 13], 'extend', { track: 'ea', note: '8.2 R/S (CIP)' }),
    ],
    'physical-chemical-change': [at([7, 8], 'intro', { status: 'typical', note: 'TF 1 signs of a chemical reaction' })],
    'conservation-of-mass': [at([7, 8], 'intro', { status: 'typical', note: 'TF 1, explained by conserved atoms' })],
    'writing-equations': [at([7, 8], 'intro', { status: 'typical', note: 'TF 1 Edukt/Produkt; TF 3 Reaktionsgleichung' })],
    'balancing-equations': [
      at(8, 'develop', { status: 'typical', note: 'TF 3, TF 4 equations (coefficients as a V competence)' }),
      at(11, 'develop', { track: 'ga', note: 'Integrationsphase "Reaktionsgleichungen auf Stoff-, Teilchen- und Formelebene"' }),
      at(11, 'develop', { track: 'ea', note: 'Integrationsphase "Reaktionsgleichungen auf Stoff-, Teilchen- und Formelebene"' }),
    ],
    'reaction-types': [at(8, 'intro', { status: 'typical', note: 'TF 3 analysis/synthesis, combustion; TF 6 neutralisation' })],
    combustion: [
      at(8, 'develop', { status: 'typical', note: 'TF 3 combustion, fire triangle, fuels' }),
      at([11, 13], 'develop', { track: 'ga', note: '8.1 complete and incomplete combustion of alkanes' }),
      at([11, 13], 'develop', { track: 'ea', note: '8.1 complete and incomplete combustion of alkanes' }),
    ],
    'ionic-equations': [at(9, 'intro', { status: 'typical', note: 'TF 6 H₃O⁺ + OH⁻ → 2 H₂O' })],
    'relative-formula-mass': [
      at(11, 'develop', { track: 'ga', note: 'Integrationsphase molar mass; not in the Sek I Lehrplan' }),
      at(11, 'develop', { track: 'ea', note: 'Integrationsphase molar mass; not in the Sek I Lehrplan' }),
    ],
    'mole-concept': [
      at(11, 'develop', { track: 'ga', note: 'Integrationsphase Stoffmenge; not in the Sek I Lehrplan' }),
      at(11, 'develop', { track: 'ea', note: 'Integrationsphase Stoffmenge; not in the Sek I Lehrplan' }),
    ],
    'reacting-masses': [
      at(11, 'develop', { track: 'ga', note: 'Integrationsphase "chemisches Rechnen", used through later Bausteine' }),
      at(11, 'develop', { track: 'ea', note: 'Integrationsphase "chemisches Rechnen", used through later Bausteine' }),
    ],
    'yield-and-atom-economy': [
      at([9, 10], 'intro', { status: 'typical', note: 'TF 8 Ausbeute' }),
      at([11, 13], 'develop', { track: 'ga', note: '7.5 optimising yield (Haber–Bosch etc.)' }),
      at([11, 13], 'develop', { track: 'ea', note: '7.5 optimising yield (Haber–Bosch etc.)' }),
    ],
    'dissolving-solubility': [at([8, 9], 'intro', { status: 'typical', note: 'TF 2 solubility of salts; TF 5 solvents' })],
    'mass-concentration': [
      at(10, 'intro', { status: 'typical', note: 'TF 9 Konzentration, Grenzwert' }),
      at(11, 'develop', { track: 'ga', note: 'Integrationsphase Massenkonzentration' }),
      at(11, 'develop', { track: 'ea', note: 'Integrationsphase Massenkonzentration' }),
    ],
    'molar-concentration': [
      at(11, 'develop', { track: 'ga', note: 'Integrationsphase Stoffmengenkonzentration' }),
      at(11, 'develop', { track: 'ea', note: 'Integrationsphase Stoffmengenkonzentration' }),
    ],
    'electrolytic-dissociation': [at(8, 'intro', { status: 'typical', note: 'TF 2 conductivity of salt solutions and melts' })],
    'molar-gas-volume': [
      at(11, 'develop', { track: 'ga', note: 'Integrationsphase molares Volumen' }),
      at(11, 'develop', { track: 'ea', note: 'Integrationsphase molares Volumen' }),
    ],
    'acids-bases-indicators': [at(9, 'develop', { status: 'typical', note: 'TF 6 indicators, pH scale' })],
    neutralisation: [
      at(9, 'develop', { status: 'typical', note: 'TF 6 neutralisation on the model and formula level' }),
      at([11, 13], 'develop', { track: 'ga', note: '1.2 / 15.5 neutralisation, neutral point, titration' }),
      at([11, 13], 'develop', { track: 'ea', note: '1.2 / 15.5 neutralisation, neutral point, titration' }),
    ],
    'reactions-of-acids': [at(9, 'intro', { status: 'typical', note: 'TF 6 reactions with limestone and base metals' })],
    'acid-base-theories': [
      at(9, 'intro', { status: 'typical', note: 'TF 6 Protonenübertragung, Donator-Akzeptor-Prinzip' }),
      at([11, 13], 'develop', { track: 'ga', note: '15.1 Brønsted, conjugate pairs, Ampholyt' }),
      at([11, 13], 'develop', { track: 'ea', note: '15.1 Brønsted, conjugate pairs, Ampholyt' }),
      at([11, 13], 'extend', { track: 'ea', note: '9.1 Lewis acids and bases (complexes)' }),
    ],
    'ph-calculations': [
      at(9, 'intro', { status: 'typical', note: 'TF 6 V: pH steps as factor 10' }),
      at([11, 13], 'develop', { track: 'ga', note: '15.1, 15.2 KW, pH/pOH, strong acids and bases' }),
      at([11, 13], 'develop', { track: 'ea', note: '15.1, 15.2 KW, pH/pOH, strong acids and bases' }),
    ],
    'strong-weak-acids': [
      at([11, 13], 'develop', { track: 'ga', note: '15.2 acid strength via KS/pKS' }),
      at([11, 13], 'develop', { track: 'ea', note: '15.2 acid strength via KS/pKS' }),
    ],
    'acid-dissociation-constants': [
      at([11, 13], 'develop', { track: 'ga', note: '15.2 KS, pKS, KB, pKB (no weak-acid pH calculation); Sek I explicitly excludes pKS' }),
      at([11, 13], 'extend', { track: 'ea', note: '15.2 pH of weak acids and bases; 15.3 indicator equation' }),
    ],
    buffers: [
      at([11, 13], 'intro', { track: 'ga', note: '15.4 definition, qualitative action only' }),
      at([11, 13], 'extend', { track: 'ea', note: '15.4 Henderson–Hasselbalch, buffer range and capacity' }),
    ],
    'salt-hydrolysis': [at([11, 13], 'extend', { track: 'ea', note: '15.2 pH of salt solutions' })],
    'redox-oxygen': [at(8, 'intro', { status: 'typical', note: 'TF 4 metal oxides, their formation and decomposition; rust (G option)' })],
    'reactivity-series': [at([8, 10], 'intro', { status: 'typical', note: 'TF 4 V noble/base metals; TF 12 Redoxreihe' })],
    'oxidation-states': [
      at([11, 13], 'develop', { track: 'ga', note: '4.1 Oxidationszahlen; not in the Sek I Lehrplan' }),
      at([11, 13], 'develop', { track: 'ea', note: '4.1 Oxidationszahlen; not in the Sek I Lehrplan' }),
    ],
    'redox-electron-transfer': [
      at(10, 'develop', { status: 'typical', note: 'TF 12 oxidation/reduction as electron transfer, donor–acceptor (TF 4 V first)' }),
      at([11, 13], 'develop', { track: 'ga', note: '4.1 redox couples' }),
      at([11, 13], 'develop', { track: 'ea', note: '4.1 redox couples' }),
    ],
    'balancing-redox': [
      at([11, 13], 'develop', { track: 'ga', note: '4.1 in acidic and alkaline solution; organic redox via 3.1, 3.2' }),
      at([11, 13], 'develop', { track: 'ea', note: '4.1 in acidic and alkaline solution; organic redox via 3.1, 3.2' }),
      at([11, 13], 'extend', { track: 'ea', note: '4.1 comproportionation and disproportionation' }),
    ],
    electrolysis: [
      at([11, 13], 'develop', { track: 'ga', note: '4.3 electrolysis cells, electrolytic extraction' }),
      at([11, 13], 'develop', { track: 'ea', note: '4.3 electrolysis cells, electrolytic extraction' }),
      at([11, 13], 'extend', { track: 'ea', note: '4.3 Faraday\'s laws, decomposition voltage, overpotential' }),
    ],
    'electrochemical-cells': [
      at(10, 'intro', { status: 'typical', note: 'TF 12 galvanic element, battery, accumulator' }),
      at([11, 13], 'develop', { track: 'ga', note: '4.2 galvanic cells; 4.4 primary and secondary cells, fuel cell' }),
      at([11, 13], 'develop', { track: 'ea', note: '4.2 galvanic cells; 4.4 primary and secondary cells, fuel cell' }),
    ],
    'electrode-potentials': [
      at([11, 13], 'develop', { track: 'ga', note: '4.2 standard hydrogen half-cell, standard potentials, Spannungsreihe' }),
      at([11, 13], 'develop', { track: 'ea', note: '4.2 standard hydrogen half-cell, standard potentials, Spannungsreihe' }),
      at([11, 13], 'extend', { track: 'ea', note: '4.2 concentration cell, Nernst incl. pH dependence' }),
    ],
    corrosion: [
      at(8, 'intro', { status: 'typical', note: 'TF 4 G option: rusting' }),
      at([11, 13], 'develop', { track: 'ga', note: '4.5 acid and oxygen corrosion, active and passive protection' }),
      at([11, 13], 'develop', { track: 'ea', note: '4.5 acid and oxygen corrosion, active and passive protection' }),
    ],
    'exo-endothermic': [
      at(8, 'develop', { status: 'typical', note: 'TF 3 exotherm/endotherm, Reaktionsenergie (no ΔH)' }),
      at([11, 13], 'develop', { track: 'ga', note: '5.2 ΔrH, enthalpy diagrams' }),
      at([11, 13], 'develop', { track: 'ea', note: '5.2 ΔrH, enthalpy diagrams' }),
    ],
    'reaction-profiles': [
      at(8, 'intro', { status: 'typical', note: 'TF 3 energy diagrams with activation energy; TF 8 catalysts lower Ea' }),
      at([11, 13], 'develop', { track: 'ga', note: '7.2 catalysis; 5.2 enthalpy diagrams' }),
      at([11, 13], 'develop', { track: 'ea', note: '7.2 catalysis; 5.2 enthalpy diagrams' }),
    ],
    'bond-energies': [
      at([11, 13], 'develop', { track: 'ga', note: '5.2 estimating ΔrH°m from bond enthalpies' }),
      at([11, 13], 'develop', { track: 'ea', note: '5.2 estimating ΔrH°m from bond enthalpies' }),
    ],
    'enthalpy-calorimetry': [
      at(8, 'intro', { status: 'typical', note: 'TF 3 Brennwert tables' }),
      at([11, 13], 'develop', { track: 'ga', note: '5.2 ΔrH, calorimetry' }),
      at([11, 13], 'develop', { track: 'ea', note: '5.2 ΔrH, calorimetry' }),
    ],
    'hess-law': [
      at([11, 13], 'develop', { track: 'ga', note: '5.2 "Satz von HESS, Enthalpiezyklus", ΔfH°m' }),
      at([11, 13], 'develop', { track: 'ea', note: '5.2 "Satz von HESS, Enthalpiezyklus", ΔfH°m' }),
    ],
    'entropy-gibbs': [at([11, 13], 'extend', { track: 'ea', note: '5.2 Additum: 2nd law, ΔrS°m, ΔrG, Gibbs–Helmholtz, ΔfG°m. Not in the GK; ΔG°–K only optional' })],
    'rate-factors': [
      at([9, 10], 'intro', { status: 'typical', note: 'TF 8 G option: particle size, pre-heating, catalyst' }),
      at([11, 13], 'develop', { track: 'ga', note: '7.2 temperature (RGT-Regel), concentration, pressure, Zerteilungsgrad, catalyst' }),
      at([11, 13], 'develop', { track: 'ea', note: '7.2 temperature (RGT-Regel), concentration, pressure, Zerteilungsgrad, catalyst' }),
    ],
    'collision-theory': [
      at([11, 13], 'develop', { track: 'ga', note: '7.2 "vereinfachte Betrachtung der Kollisions- bzw. Stoßtheorie"' }),
      at([11, 13], 'develop', { track: 'ea', note: '7.2 "vereinfachte Betrachtung der Kollisions- bzw. Stoßtheorie"' }),
    ],
    catalysts: [
      at([8, 10], 'intro', { status: 'typical', note: 'TF 3 activation energy; TF 8 "Katalysator" (Fachbegriff)' }),
      at([11, 13], 'develop', { track: 'ga', note: '7.2 homogeneous and heterogeneous catalysis' }),
      at([11, 13], 'develop', { track: 'ea', note: '7.2 homogeneous and heterogeneous catalysis' }),
    ],
    'measuring-rate': [
      at([11, 13], 'develop', { track: 'ga', note: '7.2 rate as change of concentration per time' }),
      at([11, 13], 'extend', { track: 'ea', note: '7.2 interpreting concentration–time diagrams; tangent and secant rates only optional' }),
    ],
    'rate-laws': [
      at([11, 13], 'develop', { track: 'ga', note: '7.2 simplified Geschwindigkeitsgesetz; Kc = k_hin/k_rück for elementary reactions (7.3). Order, Zeitgesetze, Arrhenius only optional' }),
      at([11, 13], 'develop', { track: 'ea', note: '7.2 simplified Geschwindigkeitsgesetz; Kc = k_hin/k_rück for elementary reactions (7.3). Order, Zeitgesetze, Arrhenius only optional' }),
    ],
    'maxwell-boltzmann': [at([11, 13], 'extend', { track: 'ea', note: '7.2 Additum "Mindestenergie, Energieverteilungskurven nach BOLTZMANN"' })],
    'reversible-reactions': [
      at([8, 10], 'intro', { status: 'typical', note: 'TF 3, TF 4 "prinzipiell umkehrbar"; TF 12 accumulator reactions reversible' }),
      at([11, 13], 'develop', { track: 'ga', note: '7.1 dynamic equilibrium; kinetic interpretation (7.2)' }),
      at([11, 13], 'develop', { track: 'ea', note: '7.1 dynamic equilibrium; kinetic interpretation (7.2)' }),
    ],
    'le-chatelier': [
      at([11, 13], 'develop', { track: 'ga', note: '7.1 qualitative; 7.3 mathematical interpretation; 7.5 applied' }),
      at([11, 13], 'develop', { track: 'ea', note: '7.1 qualitative; 7.3 mathematical interpretation; 7.5 applied' }),
    ],
    'equilibrium-constant': [
      at([11, 13], 'develop', { track: 'ga', note: '7.3 Kc derived from rate constants; simple c_Gl/Kc calculations. Kp and c₀-based calculations only optional' }),
      at([11, 13], 'develop', { track: 'ea', note: '7.3 Kc derived from rate constants; simple c_Gl/Kc calculations. Kp and c₀-based calculations only optional' }),
    ],
    'solubility-product': [at([11, 13], 'extend', { track: 'ea', note: '7.4 KL, pKL (LK P)' })],
    'organic-intro': [at([8, 9], 'intro', { status: 'typical', note: 'TF 3 methane; TF 5 Kohlenstoffverbindungen, C–C electron-pair bonds' })],
    hydrocarbons: [
      at([8, 9], 'intro', { status: 'typical', note: 'TF 3 methane and hydrogen as fuels; TF 5 alkanes as solvents; no alkenes as a class' }),
      at([11, 13], 'develop', { track: 'ga', note: '8.1 alkanes, 8.2 alkenes and alkynes' }),
      at([11, 13], 'develop', { track: 'ea', note: '8.1 alkanes, 8.2 alkenes and alkynes' }),
    ],
    'crude-oil-fuels': [
      at([8, 10], 'intro', { status: 'typical', note: 'TF 3 fuels; TF 11 fossil energy carriers' }),
      at([11, 13], 'develop', { track: 'ga', note: 'W 8.5: refining, octane and cetane numbers' }),
      at([11, 13], 'develop', { track: 'ea', note: 'W 8.5: refining, octane and cetane numbers' }),
    ],
    'homologous-series': [
      at(9, 'intro', { status: 'typical', note: 'TF 5 first ten alkanes, property trends with molecule size' }),
      at([11, 13], 'develop', { track: 'ga', note: '8.1, 8.2, 3.1, 3.2 homologous series' }),
      at([11, 13], 'develop', { track: 'ea', note: '8.1, 8.2, 3.1, 3.2 homologous series' }),
    ],
    'functional-groups': [
      at(9, 'intro', { status: 'typical', note: 'TF 5 funktionelle Gruppe, Alkanole' }),
      at([11, 13], 'develop', { track: 'ga', note: '3.1–3.3 aldehyde, keto, carboxy, ester groups; halogenoalkanes' }),
      at([11, 13], 'develop', { track: 'ea', note: '3.1–3.3 aldehyde, keto, carboxy, ester groups; halogenoalkanes' }),
    ],
    'oxygen-organics': [
      at(9, 'intro', { status: 'typical', note: 'TF 5 alkanols (ethanol) as solvents; carboxylic acids in TF 6 per the G8GTS Richtlinien (unverified)' }),
      at([11, 13], 'develop', { track: 'ga', note: '3.1 oxidation of alkanols, 3.2 alkanoic acids, 3.3 esterification' }),
      at([11, 13], 'develop', { track: 'ea', note: '3.1 oxidation of alkanols, 3.2 alkanoic acids, 3.3 esterification' }),
      at([11, 13], 'extend', { track: 'ea', note: '3.3 addition–elimination mechanism, acidic and alkaline ester hydrolysis' }),
    ],
    'nitrogen-organics': [at([11, 13], 'extend', { track: 'ea', note: 'W 8.4 basicity of aniline; amides only optional' })],
    'aromatic-compounds': [
      at([11, 13], 'develop', { track: 'ga', note: 'W 8.3 Aromaten I (Kekulé, mesomerism, Hückel, one SEAr)' }),
      at([11, 13], 'develop', { track: 'ea', note: '8.3 compulsory for the LK' }),
      at([11, 13], 'extend', { track: 'ea', note: 'W 8.4 directing effects, I/M effects, phenol acidity' }),
    ],
    isomerism: [
      at(11, 'develop', { track: 'ga', note: 'Integrationsphase Konstitutionsisomerie; Sek I explicitly skips isomers' }),
      at(11, 'develop', { track: 'ea', note: 'Integrationsphase Konstitutionsisomerie; Sek I explicitly skips isomers' }),
      at([11, 13], 'extend', { track: 'ea', note: '8.1 Konformationsisomerie, sawhorse/Newman' }),
    ],
    'geometric-isomerism': [
      at([11, 13], 'develop', { track: 'ga', note: '8.2 "Konfigurationsisomerie (geometrische Isomerie)", priority rules (E/Z); applied again in WP 10 Lipide' }),
      at([11, 13], 'develop', { track: 'ea', note: '8.2 "Konfigurationsisomerie (geometrische Isomerie)", priority rules (E/Z); applied again in WP 10 Lipide' }),
    ],
    'optical-isomerism': [
      at([11, 13], 'extend', { track: 'ea', note: '8.2 chiral halogenoalkanes, enantiomers, R/S (CIP)' }),
      at([11, 13], 'intro', { track: 'ga', status: 'unverified', note: 'Only Fischer projections of monosaccharides (WP 11.1); chirality not named for the GK' }),
    ],
    'organic-reaction-types': [
      at([11, 13], 'develop', { track: 'ga', note: 'Substitution, addition, oxidation, condensation, hydrolysis, polymerisation (8.1, 8.2, 3.x, 13.1)' }),
      at([11, 13], 'develop', { track: 'ea', note: 'Substitution, addition, oxidation, condensation, hydrolysis, polymerisation (8.1, 8.2, 3.x, 13.1)' }),
      at([11, 13], 'extend', { track: 'ea', note: 'Elimination (8.2)' }),
    ],
    'reaction-mechanisms': [
      at([11, 13], 'develop', { track: 'ga', note: 'Radical substitution, electrophilic addition (halogens), radical polymerisation; SEAr only if W 8.3 is taken' }),
      at([11, 13], 'extend', { track: 'ea', note: '+ Markovnikov, hydration, elimination, acyl addition–elimination, SEAr; SN at halogenoalkanes (W 8.6); azo coupling, nucleophilic addition (WP)' }),
    ],
    'polymers-intro': [
      at(9, 'develop', { status: 'typical', note: 'TF 7 monomer, polymer, macromolecule, thermoplastics, elastomers, thermosets' }),
      at([11, 13], 'develop', { track: 'ga', note: '13.2 structure and properties, cross-linking' }),
      at([11, 13], 'develop', { track: 'ea', note: '13.2 structure and properties, cross-linking' }),
    ],
    'addition-polymerisation': [
      at(9, 'intro', { status: 'typical', note: 'TF 7 PE/PP from monomers with a multiple bond; "keine Reaktionsmechanismen"' }),
      at([11, 13], 'develop', { track: 'ga', note: '13.1 mechanism of radical polymerisation' }),
      at([11, 13], 'develop', { track: 'ea', note: '13.1 mechanism of radical polymerisation' }),
    ],
    'condensation-polymerisation': [
      at(9, 'intro', { status: 'typical', note: 'TF 7 monomers "mit mehreren funktionellen Gruppen"' }),
      at([11, 13], 'develop', { track: 'ga', note: '13.1 polycondensation (polyesters, polyamides)' }),
      at([11, 13], 'develop', { track: 'ea', note: '13.1 polycondensation (polyesters, polyamides)' }),
      at([11, 13], 'extend', { track: 'ea', note: '13.1 optional LK Additum: polyester and polyamide mechanisms' }),
    ],
    'plastics-and-recycling': [
      at(9, 'intro', { status: 'typical', note: 'TF 7 life-cycle assessment, paper vs plastic bag' }),
      at([11, 13], 'develop', { track: 'ga', note: '13.4 recycling types, bioplastics, micro- and nanoplastics' }),
      at([11, 13], 'develop', { track: 'ea', note: '13.4 recycling types, bioplastics, micro- and nanoplastics' }),
    ],
    materials: [
      at(9, 'intro', { status: 'typical', note: 'TF 7 composites, high-tech materials' }),
      at([11, 13], 'develop', { track: 'ga', note: 'W 14 nanomaterials' }),
      at([11, 13], 'develop', { track: 'ea', note: '14.1–14.3 compulsory for the LK' }),
    ],
    carbohydrates: [
      at(9, 'intro', { status: 'typical', note: 'TF 7 V option: starch and cellulose compared with plastics' }),
      at([11, 13], 'develop', { track: 'ga', note: 'WP 11: Fischer and Haworth projections, glycosidic bond, reducing sugars' }),
      at([11, 13], 'develop', { track: 'ea', note: 'WP 11: Fischer and Haworth projections, glycosidic bond, reducing sugars' }),
      at([11, 13], 'extend', { track: 'ea', note: 'WP 11: nucleophilic addition (hemiacetal), acetal formation' }),
    ],
    lipids: [
      at([11, 13], 'develop', { track: 'ga', note: 'WP 10 fats, fatty acids, key numbers; W 16 soaps and tensides' }),
      at([11, 13], 'develop', { track: 'ea', note: 'WP 10 fats, fatty acids, key numbers; W 16 soaps and tensides' }),
      at([11, 13], 'extend', { track: 'ea', note: '3.3 saponification and transesterification mechanism' }),
    ],
    'amino-acids-proteins': [
      at([11, 13], 'develop', { track: 'ga', note: 'WP 12 amino acids, peptide bond, structure levels, denaturation' }),
      at([11, 13], 'develop', { track: 'ea', note: 'WP 12 amino acids, peptide bond, structure levels, denaturation' }),
      at([11, 13], 'extend', { track: 'ea', note: 'WP 12 zwitterion, isoelectric point, peptide-bond mesomerism' }),
    ],
    'gas-tests': [at(8, 'intro', { status: 'typical', note: 'TF 3 G option: tests for CO₂, O₂, H₂, water' })],
    'ion-tests': [
      at(10, 'intro', { status: 'typical', note: 'TF 9 ion analysis in water' }),
      at([11, 13], 'develop', { track: 'ga', note: '1.4 chloride, bromide, carbonate, ammonium; flame colour' }),
      at([11, 13], 'develop', { track: 'ea', note: '1.4 chloride, bromide, carbonate, ammonium; flame colour' }),
    ],
    'functional-group-tests': [
      at([11, 13], 'develop', { track: 'ga', note: '3.1 Fehling, Benedict, Tollens; 8.2 test for multiple bonds; 1.4; WP 12.2 Biuret, Xanthoprotein; WP 11.2 reducing sugars' }),
      at([11, 13], 'develop', { track: 'ea', note: '3.1 Fehling, Benedict, Tollens; 8.2 test for multiple bonds; 1.4; WP 12.2 Biuret, Xanthoprotein; WP 11.2 reducing sugars' }),
    ],
    chromatography: [
      at(10, 'intro', { status: 'typical', note: 'TF 9 Chromatographie (Fachbegriff); TF 2 V option' }),
      at([11, 13], 'develop', { track: 'ea', note: '1.1 (LK P): phases, Rf, retention time, two methods' }),
    ],
    titration: [
      at(10, 'intro', { status: 'typical', note: 'TF 9 Maßanalyse' }),
      at([11, 13], 'develop', { track: 'ga', note: '1.2 acid–base titration of monoprotic acids' }),
      at([11, 13], 'develop', { track: 'ea', note: '1.2 acid–base titration of monoprotic acids' }),
      at([11, 13], 'extend', { track: 'ea', note: '1.2 polyprotic acids, titration-curve calculations, pH electrode, redox titration' }),
    ],
    spectrophotometry: [
      at(10, 'intro', { status: 'typical', note: 'TF 9 Kolorimetrie' }),
      at([11, 13], 'develop', { track: 'ga', note: 'W 1.5 UV/VIS photometry, calibration line' }),
      at([11, 13], 'develop', { track: 'ea', note: 'W 1.5 UV/VIS photometry, calibration line' }),
      at([11, 13], 'extend', { track: 'ea', note: 'W 1.5 Lambert–Beer' }),
    ],
    'ir-nmr-ms': [at([11, 13], 'extend', { track: 'ea', note: 'W 1.3 mass spectrometry only; IR only an optional Vertiefung' })],
    'air-oxygen-hydrogen': [at(8, 'intro', { status: 'typical', note: 'TF 3 hydrogen as an energy carrier, oxygen in combustion' })],
    'water-chemistry': [at([9, 10], 'intro', { status: 'typical', note: 'TF 5 water as a solvent; TF 9 water analysis' })],
    'metals-chemistry': [at(8, 'intro', { status: 'typical', note: 'TF 4 metals, ores, extraction' })],
    'transition-metals': [at([11, 13], 'extend', { track: 'ea', note: '9.1 complexes (LK P); W 9.2 chelates, stability constants' })],
    'atmosphere-climate': [
      at(10, 'develop', { status: 'typical', note: 'TF 11 carbon cycle, greenhouse effect, modelling' }),
      at([11, 13], 'develop', { track: 'ga', note: '17.1 greenhouse gases, climate change, ocean acidification' }),
      at([11, 13], 'develop', { track: 'ea', note: '17.1 greenhouse gases, climate change, ocean acidification' }),
    ],
    pollution: [
      at([9, 10], 'intro', { status: 'typical', note: 'TF 6 acids and alkalis in the environment; TF 10 hazardous substances' }),
      at([11, 13], 'develop', { track: 'ga', note: '17.1 one more issue (ozone hole, smog, microplastics); W 17.2 environmental analysis' }),
      at([11, 13], 'develop', { track: 'ea', note: '17.1 one more issue (ozone hole, smog, microplastics); W 17.2 environmental analysis' }),
    ],
    'resources-sustainability': [
      at([8, 9], 'intro', { status: 'typical', note: 'TF 4 metal recycling; TF 7 life-cycle assessment' }),
      at([11, 13], 'develop', { track: 'ga', note: '13.4, 17.1, 4.4' }),
      at([11, 13], 'develop', { track: 'ea', note: '13.4, 17.1, 4.4' }),
    ],
    'fuels-energy': [
      at(8, 'develop', { status: 'typical', note: 'TF 3 Heizen und Antreiben; TF 11, TF 12 (10)' }),
      at([11, 13], 'develop', { track: 'ga', note: '5.1 energy carriers; 17.1 alternative fuels; W 8.5' }),
      at([11, 13], 'develop', { track: 'ea', note: '5.1 energy carriers; 17.1 alternative fuels; W 8.5' }),
    ],
    'industrial-processes': [
      at([9, 10], 'intro', { status: 'typical', note: 'TF 8 Vom Reagenzglas zum Reaktor' }),
      at([11, 13], 'develop', { track: 'ga', note: '7.5 Haber–Bosch, contact or Ostwald process' }),
      at([11, 13], 'develop', { track: 'ea', note: '7.5 Haber–Bosch, contact or Ostwald process' }),
    ],
    'metal-extraction': [
      at(8, 'develop', { status: 'typical', note: 'TF 4 ore to metal (blast furnace, copper)' }),
      at([11, 13], 'develop', { track: 'ga', note: '4.3 electrolytic extraction (Al, Zn, Cl₂)' }),
      at([11, 13], 'develop', { track: 'ea', note: '4.3 electrolytic extraction (Al, Zn, Cl₂)' }),
    ],
    'chemical-safety': [
      at([7, 8], 'intro', { status: 'typical', note: 'TF 1 researching hazards, labelling, disposal' }),
      at(10, 'develop', { status: 'typical', note: 'TF 10 Gefährliche Stoffe: LD50, AGW, BGW' }),
    ],
    'lab-safety': [at([7, 8], 'intro', { status: 'typical', note: 'TF 1 hazard labels; safe handling of acids (TF 6)' })],
    'measurement-technique': [at(10, 'intro', { status: 'typical', note: 'TF 9 Messgenauigkeit, Nachweisgrenze' })],
    'preparing-solutions': [
      at([11, 13], 'develop', { track: 'ga', status: 'typical', note: '1.2 Maßlösung (Titerlösung); Integrationsphase concentrations' }),
      at([11, 13], 'develop', { track: 'ea', status: 'typical', note: '1.2 Maßlösung (Titerlösung); Integrationsphase concentrations' }),
    ],
    'units-and-conversions': [
      at(11, 'develop', { track: 'ga', note: 'Integrationsphase chemisches Rechnen, quantity equations' }),
      at(11, 'develop', { track: 'ea', note: 'Integrationsphase chemisches Rechnen, quantity equations' }),
    ],
    'significant-figures-uncertainty': [at(10, 'intro', { status: 'typical', note: 'TF 9 measurement accuracy' })],
    'graphs-and-data': [
      at(10, 'intro', { status: 'typical', note: 'TF 9 switching between measurements, diagrams and tables; TF 11 modelled vs measured data' }),
      at([11, 13], 'develop', { track: 'ga', note: '7.2 rate data; 1.2 titration curves; 1.5 calibration line' }),
      at([11, 13], 'develop', { track: 'ea', note: '7.2 rate data; 1.2 titration curves; 1.5 calibration line' }),
    ],
    'chemical-calculations': [
      at([11, 13], 'develop', { track: 'ga', note: 'Kc, pH of strong acids, ΔH, Hess' }),
      at([11, 13], 'extend', { track: 'ea', note: '+ weak-acid pH, H-H, Nernst, Faraday, ΔG, KL' }),
    ],
    'particle-diagrams': [at([7, 8], 'intro', { status: 'typical', note: 'TF 1, TF 2 particle-level explanations' })],
    'macro-micro-symbolic': [
      at([7, 10], 'develop', { note: 'The Sek I Lehrplan\'s organising line: "Wechsel zwischen Stoff- und Teilchenebene"' }),
      at([11, 13], 'develop', { track: 'ga', note: 'Standard S 6: "unterscheiden konsequent zwischen Stoff- und Teilchenebene"' }),
      at([11, 13], 'develop', { track: 'ea', note: 'Standard S 6: "unterscheiden konsequent zwischen Stoff- und Teilchenebene"' }),
    ],
    'molecular-models': [at(8, 'intro', { status: 'typical', note: 'TF 2 NaCl lattice models; TF 3 molecule models' })],
    'structural-formulas': [
      at(9, 'intro', { status: 'typical', note: 'TF 7 "vereinfachte chemische Formeln" (V: structural formulas in TF 5)' }),
      at(11, 'develop', { track: 'ga', note: 'Integrationsphase molecular, Lewis, skeletal and condensed formulas' }),
      at(11, 'develop', { track: 'ea', note: 'Integrationsphase molecular, Lewis, skeletal and condensed formulas' }),
      at([11, 13], 'extend', { track: 'ea', note: '8.1 Newman/sawhorse; WP 11.1 Fischer and Haworth (also GK WP)' }),
    ],
    'reference-tables': [
      at([11, 13], 'develop', { track: 'ga', status: 'typical', note: 'IQB formula collection allowed in the Abitur' }),
      at([11, 13], 'develop', { track: 'ea', status: 'typical', note: 'IQB formula collection allowed in the Abitur' }),
    ],
    'scientific-method': [at([7, 10], 'develop', { note: 'Sek I competences: hypothesis-led experiments, planning investigations' })],
    'evaluating-experiments': [
      at([11, 13], 'develop', { track: 'ga', note: 'Erkenntnisgewinnungskompetenz standards' }),
      at([11, 13], 'develop', { track: 'ea', note: 'Erkenntnisgewinnungskompetenz standards' }),
    ],
    'scientific-communication': [at([7, 10], 'develop', { note: 'Sek I competences: recording, presenting, switching representations' })],
    'nature-of-science': [
      at([7, 8], 'intro', { status: 'typical', note: 'TF 1 V option: the model concept' }),
      at([11, 13], 'develop', { track: 'ga', note: '8.3 Kekulé, Robinson; W 6.4 history of dyes' }),
      at([11, 13], 'develop', { track: 'ea', note: '8.3 Kekulé, Robinson; W 6.4 history of dyes' }),
    ],
    'socio-scientific-issues': [
      at(10, 'develop', { status: 'typical', note: 'TF 10–12 benefit/risk analysis, sustainability judgements' }),
      at([11, 13], 'develop', { track: 'ga', note: 'Bewertungskompetenz; 13.4, 14.3, 17.1' }),
      at([11, 13], 'develop', { track: 'ea', note: 'Bewertungskompetenz; 13.4, 14.3, 17.1' }),
    ],
  },
  outsideRange: [
    'Kl. 5–6: integrated Naturwissenschaften (particle model, states of matter, mixtures and separation, substance properties).',
    'G8GTS schools: everything one year earlier (Sek I Kl. 7–9, MSS Kl. 10–12).',
  ],
};
