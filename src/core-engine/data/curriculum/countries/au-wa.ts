// src/core-engine/data/curriculum/countries/au-wa.ts
//
// Western Australia: the WA version of Australian Curriculum v9 for Years 7–10
// (mandatory from 2026; only the 2024 consultation draft was read, so those
// placements are `unverified`) and SCSA Chemistry ATAR (Year 11 syllabus new
// for 2026, content assumed unchanged; Year 12 from 2024).
// Source: docs/curriculum/countries/australia-wa.md, §3.

import type { JurisdictionCurriculum } from '../../../types/curriculum';
import { at } from '../placement';
import { AU_COVERED_AREAS, australianYears, chemistry as c } from './au-common';

const draft = { status: 'unverified', note: 'WA Years 7–10 consultation draft (2024)' } as const;

export const AU_WA: JurisdictionCurriculum = {
  code: 'AU-WA',
  country: 'AU',
  coveredAreas: AU_COVERED_AREAS,
  name: 'Australia — Western Australia',
  basis: 'Western Australian Curriculum Science (v9-based, draft read); SCSA Chemistry ATAR Year 11 (2026) and Year 12 (2024) syllabuses; SCSA data booklet.',
  researchedOn: '2026-09-24',
  report: 'docs/curriculum/countries/australia-wa.md',
  reviewedByTeacher: false,
  years: australianYears('Senior secondary (WACE)', 'Chemistry ATAR is an elective: Units 1–2 in Year 11, Units 3–4 in Year 12 (WACE exam).'),
  tracks: { chemistry: 'SCSA Chemistry ATAR (Units 1–4)' },
  change: {
    stability: 'moderate',
    reason: 'A new Year 11 syllabus started in 2026 and a Year 12 refresh appears to follow.',
    lastMajorRevision: { year: 2024, what: 'Chemistry ATAR Year 12 syllabus effective 1 January 2024' },
    typicalIntervalYears: [5, 8],
    mechanism: 'scheduled',
    minorUpdates: 'Syllabus rationale/capability rewrites (2026); data booklet editions; examiners’ reports.',
    upcoming: [{ when: '2027', what: 'Year 12 ATAR syllabus refresh (unverified)', status: 'planned' }],
    recheckBy: '2027-03-31',
  },
  placements: {
    // ── Organic ──────────────────────────────────────────────────────────────
    hydrocarbons: [at(11, 'develop', { ...c, note: 'Alkanes and alkenes' })],
    'homologous-series': [at(11, 'develop', { ...c, note: 'Implicit; the term is not used' }), at(12, 'develop', c)],
    'organic-nomenclature': [at(11, 'develop', { ...c, note: 'Straight and simple branched alkanes and alkenes C1–C8' }), at(12, 'develop', { ...c, note: 'Functional-group compounds up to C8' })],
    'aromatic-compounds': [at(11, 'intro', { ...c, note: 'Substitution reactions of benzene, qualitative' })],
    'functional-groups': [at(12, 'develop', { ...c, note: 'No haloalkanes' })],
    'oxygen-organics': [at(12, 'develop', { ...c, note: 'Alcohol oxidation with observations; esterification; saponification' })],
    'nitrogen-organics': [at(12, 'develop', { ...c, note: 'Amines and amides named' })],
    isomerism: [at(12, 'develop', { ...c, note: 'Chain and position' })],
    'geometric-isomerism': [at(12, 'develop', { ...c, note: 'cis-trans' })],
    'organic-reaction-types': [at(11, 'intro', { ...c, note: 'Addition, substitution, combustion' }), at(12, 'develop', { ...c, note: 'Addition, condensation, oxidation; no Markovnikov, no elimination' })],
    'reaction-pathways': [at(12, 'develop', { ...c, note: 'Sequences, e.g. ethene → ethanol → ethyl ethanoate' })],
    'structural-formulas': [at(11, 'develop', { ...c, note: 'Condensed or showing bonds' }), at(12, 'develop', c)],
    'intermolecular-forces': [at(11, 'develop', c), at(12, 'develop', c)],
    'functional-group-tests': [at(12, 'develop', { ...c, note: 'Bromine water, acidified permanganate (2024 exam)' })],
    chromatography: [at(11, 'develop', { ...c, note: 'TLC, GC, HPLC' })],
    'yield-and-atom-economy': [at(12, 'develop', { ...c, note: 'Yield; atom economy only in the glossary' })],
    'addition-polymerisation': [at(12, 'develop', c)],
    'condensation-polymerisation': [at(12, 'develop', c)],
    lipids: [at(12, 'develop', { ...c, note: 'Triglycerides, soaps and detergents, biodiesel' })],
    'amino-acids-proteins': [at(12, 'develop', c)],
    // ── Energetics (Year 11 Unit 1) ──────────────────────────────────────────
    'exo-endothermic': [at(8, 'intro', draft), at(11, 'develop', { ...c, note: 'Thermochemical equations' })],
    'reaction-profiles': [at(11, 'develop', c), at(12, 'develop', { ...c, note: 'Transition state; used for temperature effects on equilibrium' })],
    'enthalpy-calorimetry': [at(11, 'intro', { ...c, note: 'Inquiry only; q = mcΔT not stated' })],
    'bond-energies': [at(11, 'intro', { ...c, note: 'Qualitative; no bond-enthalpy data' })],
    'fuels-energy': [at(11, 'develop', { ...c, note: 'Energy output and suitability of fuels (examinable)' })],
    combustion: [at(11, 'develop', c)],
    // ── Kinetics (Year 11 Unit 2, repeated in Year 12 Unit 3) ────────────────
    'rate-factors': [at(10, 'intro', draft), at(11, 'develop', c), at(12, 'develop', c)],
    'collision-theory': [at(11, 'develop', c), at(12, 'develop', c)],
    catalysts: [at(11, 'develop', c), at(12, 'develop', c)],
    'measuring-rate': [at(11, 'develop', c)],
    // ── Equilibrium (Year 12 Unit 3) ─────────────────────────────────────────
    'reversible-reactions': [at(12, 'develop', c)],
    'equilibrium-constant': [at(12, 'intro', { ...c, note: 'Expressions and qualitative position only; no Kc calculations' })],
    'le-chatelier': [at(12, 'develop', { ...c, note: 'Includes adding a catalyst' })],
    'industrial-processes': [at(12, 'develop', { ...c, note: 'Haber, Contact, biodiesel' })],
  },
};
