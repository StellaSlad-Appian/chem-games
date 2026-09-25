// src/core-engine/data/curriculum/countries/au-qld.ts
//
// Queensland: Australian Curriculum v9 for Years 7–10 (full implementation by
// 2027) and QCAA Chemistry 2025 v1.3 (Units 1–2 = Year 11 from 2025, Units 3–4
// = Year 12 from 2026). Only Units 3–4 are externally examined.
// Source: docs/curriculum/countries/australia-queensland.md, §3.

import type { JurisdictionCurriculum } from '../../../types/curriculum';
import { at } from '../placement';
import { AC9_YEARS_7_10, AU_COVERED_AREAS, australianYears, chemistry as c } from './au-common';

export const AU_QLD: JurisdictionCurriculum = {
  code: 'AU-QLD',
  country: 'AU',
  coveredAreas: AU_COVERED_AREAS,
  name: 'Australia — Queensland',
  basis: 'Australian Curriculum v9.0 Science (Years 7–10); QCAA Chemistry 2025 v1.3 General senior syllabus; QCAA formula and data book.',
  researchedOn: '2026-09-24',
  report: 'docs/curriculum/countries/australia-queensland.md',
  reviewedByTeacher: false,
  years: australianYears('Senior secondary (QCE)', 'QCE Chemistry is an elective: Units 1–2 in Year 11 (school-assessed), Units 3–4 in Year 12 (external exam 50 %).'),
  tracks: { chemistry: 'QCAA General Chemistry (Units 1–4)' },
  change: {
    stability: 'stable',
    reason: 'The 2025 syllabus has just reached Year 12; no replacement is announced.',
    lastMajorRevision: { year: 2025, what: 'Chemistry 2025 syllabus (replacing the 2019 syllabus)' },
    typicalIntervalYears: [5, 7],
    mechanism: 'scheduled',
    minorUpdates: 'Syllabus point versions (v1.3 in 2026, metadata only); formula and data book editions.',
    upcoming: [],
    recheckBy: '2027-09-30',
  },
  placements: {
    ...AC9_YEARS_7_10,
    // ── Organic (Year 12 Unit 4, introduced in Year 11 Unit 1) ──────────────
    hydrocarbons: [at(11, 'intro', { ...c, note: 'Alkanes and alkenes' }), at(12, 'develop', c)],
    'homologous-series': [at(12, 'develop', c)],
    'organic-nomenclature': [at(12, 'develop', { ...c, note: 'Up to C10 with methyl/ethyl branches' })],
    'functional-groups': [at(12, 'develop', c)],
    'oxygen-organics': [at(12, 'develop', { ...c, note: 'Alcohol oxidation with dichromate(VI)/manganate(VII); reversible esterification' })],
    'nitrogen-organics': [at(12, 'develop', { ...c, note: 'Amines and amides drawn, not named; amines as weak bases' })],
    isomerism: [at(12, 'develop', { ...c, note: 'Non-cyclic alkanes up to C6' })],
    'geometric-isomerism': [at(12, 'develop', { ...c, note: 'cis/trans, non-cyclic alkenes up to C6' })],
    'optical-isomerism': [at(12, 'develop', { ...c, note: 'Identify chiral carbons; draw optical isomers' })],
    'organic-reaction-types': [at(12, 'develop', { ...c, note: 'Addition (Markovnikov), elimination, substitution, redox; no mechanisms' })],
    'reaction-pathways': [at(12, 'develop', { ...c, note: 'Pathway map printed in the data book' })],
    'structural-formulas': [at(12, 'develop', { ...c, note: 'Empirical, molecular, structural; skeletal not named' })],
    'intermolecular-forces': [at(11, 'develop', c), at(12, 'develop', c)],
    'functional-group-tests': [at(11, 'intro', { ...c, note: 'Investigation' }), at(12, 'develop', { ...c, note: 'Bromine water, acidified dichromate(VI) and manganate(VII)' })],
    'ir-nmr-ms': [at(12, 'develop', { ...c, note: 'IR and MS only; no NMR' })],
    chromatography: [at(11, 'develop', c), at(12, 'develop', c)],
    'yield-and-atom-economy': [at(11, 'intro', c), at(12, 'develop', { ...c, note: 'Atom economy only as context (internal assessment at most)' })],
    'addition-polymerisation': [at(12, 'develop', c)],
    'condensation-polymerisation': [at(12, 'develop', c)],
    carbohydrates: [at(12, 'develop', c)],
    'amino-acids-proteins': [at(12, 'develop', c)],
    // ── Energetics (Year 11 Unit 1) ──────────────────────────────────────────
    'exo-endothermic': [...(AC9_YEARS_7_10['exo-endothermic'] ?? []), at(11, 'develop', c)],
    'reaction-profiles': [at(11, 'develop', { ...c, note: 'Enthalpy level diagrams' })],
    'enthalpy-calorimetry': [at(11, 'develop', { ...c, note: 'Q = mcΔT' })],
    'hess-law': [at(11, 'intro', { ...c, note: 'Suggested investigation only, not a science-understanding point' })],
    'bond-energies': [at(11, 'develop', { ...c, note: 'Average bond enthalpy table in the data book' })],
    'fuels-energy': [at(11, 'intro', { ...c, note: 'Context (science as a human endeavour)' })],
    // ── Kinetics (Year 11 Unit 2) ────────────────────────────────────────────
    'rate-factors': [...(AC9_YEARS_7_10['rate-factors'] ?? []), at(11, 'develop', c)],
    'collision-theory': [at(11, 'develop', c), at(12, 'develop', { ...c, note: 'Applied to forward and reverse reactions' })],
    catalysts: [...(AC9_YEARS_7_10.catalysts ?? []), at(11, 'develop', c)],
    'measuring-rate': [at(11, 'develop', { ...c, note: 'rate = Δ[P]/Δt' })],
    'maxwell-boltzmann': [at(11, 'develop', { ...c, note: 'Sketch curves with and without a catalyst; order of reaction not required' })],
    // ── Equilibrium (Year 12 Unit 3) ─────────────────────────────────────────
    'reversible-reactions': [at(12, 'develop', c)],
    'equilibrium-constant': [at(12, 'develop', { ...c, note: 'Quantitative Kc; Ka, Kb, Kw' })],
    'le-chatelier': [at(12, 'develop', { ...c, note: 'Includes the effect of a catalyst' })],
    'solubility-product': [at(12, 'develop', c)],
    'industrial-processes': [at(12, 'develop', { ...c, note: 'Haber and contact processes' })],
  },
};
