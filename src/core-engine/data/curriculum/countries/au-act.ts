// src/core-engine/data/curriculum/countries/au-act.ts
//
// Australian Capital Territory: the Australian Curriculum for Years 7–10 (the
// version in use in 2026 is unverified; v9 assumed) and BSSS Chemistry T, the
// ACARA senior Chemistry course. Its four units may be taught in any order over
// Years 11–12, so every senior placement spans both years and is `typical`.
// Source: docs/curriculum/countries/australia-act.md, §3.

import type { JurisdictionCurriculum } from '../../../types/curriculum';
import { at } from '../placement';
import { AC9_YEARS_7_10, AU_COVERED_AREAS, australianYears } from './au-common';

const senior = [11, 12] as const;
const t = { track: 'chemistry', status: 'typical' } as const;

export const AU_ACT: JurisdictionCurriculum = {
  code: 'AU-ACT',
  country: 'AU',
  coveredAreas: AU_COVERED_AREAS,
  name: 'Australia — Australian Capital Territory',
  basis: 'Australian Curriculum Science (Years 7–10; version unverified); BSSS Chemistry T course (ACARA senior Chemistry, four units).',
  researchedOn: '2026-09-24',
  report: 'docs/curriculum/countries/australia-act.md',
  reviewedByTeacher: false,
  years: australianYears('Senior secondary (ACT SSC)', 'Chemistry T is an elective; its four units run in any order over Years 11–12. No external exam.'),
  tracks: { chemistry: 'BSSS Chemistry T (Units 1–4)' },
  change: {
    stability: 'stable',
    reason: 'The course is the ACARA senior Chemistry course, unchanged in substance since 2014; no replacement found.',
    lastMajorRevision: { year: 2014, what: 'BSSS Chemistry accredited on the ACARA senior curriculum' },
    typicalIntervalYears: [5, 10],
    mechanism: 'scheduled',
    minorUpdates: 'Course file re-issues (the current one is dated "from 2023").',
    upcoming: [],
    recheckBy: '2027-09-30',
  },
  placements: {
    ...AC9_YEARS_7_10,
    // ── Organic (Unit 4, hydrocarbons in Unit 1) ────────────────────────────
    hydrocarbons: [at(senior, 'intro', { ...t, note: 'Alkanes and alkenes (Unit 1)' })],
    'organic-nomenclature': [at(senior, 'develop', { ...t, note: 'IUPAC conventions; depth not stated' })],
    'functional-groups': [at(senior, 'develop', { ...t, note: 'Alcohols, carboxylic acids, esters, amines, amides; no aldehydes, ketones or haloalkanes' })],
    'oxygen-organics': [at(senior, 'develop', t)],
    'nitrogen-organics': [at(senior, 'develop', t)],
    'organic-reaction-types': [at(senior, 'intro', { ...t, note: 'Addition, condensation, oxidation; substitution not named' })],
    'reaction-pathways': [at(senior, 'develop', t)],
    'structural-formulas': [at(senior, 'develop', t)],
    'intermolecular-forces': [at(senior, 'develop', { ...t, note: 'Unit 2' })],
    'functional-group-tests': [at(senior, 'intro', { ...t, note: 'Acid–base and oxidation reactions; no reagents named' })],
    'ir-nmr-ms': [at(senior, 'develop', { ...t, note: 'IR, MS and X-ray crystallography; no NMR' })],
    chromatography: [at(senior, 'develop', { ...t, note: 'Unit 2: TLC, GC, HPLC' })],
    'yield-and-atom-economy': [at(senior, 'develop', { ...t, note: 'Percentage yield' })],
    'addition-polymerisation': [at(senior, 'develop', t)],
    'condensation-polymerisation': [at(senior, 'develop', t)],
    'amino-acids-proteins': [at(senior, 'develop', t)],
    // ── Energetics (Unit 1) ──────────────────────────────────────────────────
    'exo-endothermic': [...(AC9_YEARS_7_10['exo-endothermic'] ?? []), at(senior, 'develop', t)],
    'reaction-profiles': [at(senior, 'develop', { ...t, note: 'Unit 2' })],
    'enthalpy-calorimetry': [at(senior, 'intro', t)],
    'bond-energies': [at(senior, 'intro', { ...t, note: 'Qualitative' })],
    'fuels-energy': [at(senior, 'develop', t)],
    // ── Kinetics (Unit 2) ────────────────────────────────────────────────────
    'rate-factors': [...(AC9_YEARS_7_10['rate-factors'] ?? []), at(senior, 'develop', t)],
    'collision-theory': [at(senior, 'develop', t)],
    catalysts: [...(AC9_YEARS_7_10.catalysts ?? []), at(senior, 'develop', t)],
    'measuring-rate': [at(senior, 'develop', t)],
    // ── Equilibrium (Unit 3) ─────────────────────────────────────────────────
    'reversible-reactions': [at(senior, 'develop', t)],
    'equilibrium-constant': [at(senior, 'intro', { ...t, note: 'Qualitative only; Ka and Kw' })],
    'le-chatelier': [at(senior, 'develop', t)],
  },
};
