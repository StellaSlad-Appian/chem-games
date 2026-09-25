// src/core-engine/data/curriculum/countries/au-sa.ts
//
// South Australia, and the Northern Territory, which uses the same SACE
// subject outlines (NTCET) and the Australian Curriculum for Years 7–10.
// SACE Stage 1 Chemistry = Year 11, where the school chooses the topics
// (`typical`); Stage 2 Chemistry = Year 12.
// Source: docs/curriculum/countries/australia-sa-nt.md, §3.

import type { JurisdictionCurriculum } from '../../../types/curriculum';
import { at } from '../placement';
import { AC9_YEARS_7_10, AU_COVERED_AREAS, australianYears, chemistry as c } from './au-common';

/** Stage 1 topics are chosen by the school. */
const stage1 = { ...c, status: 'typical' } as const;

export const AU_SA: JurisdictionCurriculum = {
  code: 'AU-SA',
  country: 'AU',
  alsoCovers: ['AU-NT'],
  coveredAreas: AU_COVERED_AREAS,
  name: 'Australia — South Australia and Northern Territory',
  basis: 'Australian Curriculum v9.0 Science (Years 7–10; SA/NT adoption dates unverified); SACE Stage 1 Chemistry (2017) and Stage 2 Chemistry (2018), reissued 2025.',
  researchedOn: '2026-09-24',
  report: 'docs/curriculum/countries/australia-sa-nt.md',
  reviewedByTeacher: false,
  years: australianYears('Senior secondary (SACE / NTCET)', 'Chemistry is an elective: Stage 1 in Year 11 (school-assessed, topics chosen by the school), Stage 2 in Year 12 (exam 30 %).'),
  tracks: { chemistry: 'SACE Chemistry (Stage 1 and Stage 2)' },
  change: {
    stability: 'stable',
    reason: 'The outlines date from 2017/2018 and the 2025 reissue changed assessment only; the SACE renewal has not dated Chemistry yet.',
    lastMajorRevision: { year: 2018, what: 'Stage 2 Chemistry subject outline (Stage 1 from 2017)' },
    typicalIntervalYears: [8, 12],
    mechanism: 'scheduled',
    minorUpdates: 'Assessment design changes (2025); annual subject assessment advice.',
    upcoming: [{ when: '2028', what: 'SACE renewal "group 2" including Chemistry; date not set (inference)', status: 'planned' }],
    recheckBy: '2027-09-30',
  },
  placements: {
    ...AC9_YEARS_7_10,
    // ── Organic ──────────────────────────────────────────────────────────────
    hydrocarbons: [at(11, 'develop', { ...stage1, note: 'Stage 1 3.3' })],
    'organic-nomenclature': [at(11, 'develop', { ...stage1, note: 'Main chain up to C8, side chains up to C2' }), at(12, 'develop', c)],
    'functional-groups': [at(12, 'develop', { ...c, note: 'No haloalkanes' })],
    'oxygen-organics': [at(12, 'develop', { ...c, note: 'Alcohol oxidation with acidified dichromate; methyl and ethyl esters' })],
    'nitrogen-organics': [at(12, 'develop', { ...c, note: 'Primary amines named; amides drawn only' })],
    isomerism: [at(11, 'develop', { ...stage1, note: 'Hydrocarbons only' })],
    'organic-reaction-types': [at(11, 'intro', { ...stage1, note: 'Alkene addition' }), at(12, 'develop', { ...c, note: 'Condensation and hydrolysis; no substitution' })],
    'structural-formulas': [at(11, 'develop', stage1), at(12, 'develop', { ...c, note: 'Extended, condensed and skeletal' })],
    'intermolecular-forces': [at(11, 'develop', stage1), at(12, 'develop', c)],
    'functional-group-tests': [at(12, 'develop', { ...c, note: 'Acidified dichromate, Tollens, bromine or iodine' })],
    chromatography: [at(12, 'develop', { ...c, note: 'TLC, GC, HPLC, IC' })],
    'addition-polymerisation': [at(11, 'develop', stage1)],
    'condensation-polymerisation': [at(12, 'develop', c)],
    carbohydrates: [at(12, 'develop', c)],
    lipids: [at(12, 'develop', c)],
    'amino-acids-proteins': [at(12, 'develop', c)],
    // ── Energetics ───────────────────────────────────────────────────────────
    'exo-endothermic': [...(AC9_YEARS_7_10['exo-endothermic'] ?? []), at(11, 'develop', stage1), at(12, 'develop', c)],
    'reaction-profiles': [at(12, 'develop', c)],
    'enthalpy-calorimetry': [at(11, 'develop', { ...stage1, note: 'Enthalpy of solution; Q = mcΔT' }), at(12, 'develop', { ...c, note: 'Heating water with a fuel; ΔH = Q/n' })],
    'bond-energies': [at(11, 'intro', { ...stage1, note: 'Qualitative only' })],
    'fuels-energy': [at(12, 'develop', { ...c, note: 'Energy per mol, per g, per L; biofuels' })],
    combustion: [at(12, 'develop', c)],
    // ── Kinetics (Stage 2 2.1) ───────────────────────────────────────────────
    'rate-factors': [...(AC9_YEARS_7_10['rate-factors'] ?? []), at(12, 'develop', c)],
    'collision-theory': [at(12, 'develop', c)],
    catalysts: [...(AC9_YEARS_7_10.catalysts ?? []), at(12, 'develop', c)],
    'measuring-rate': [at(12, 'develop', { ...c, note: 'Slopes of amount- or concentration-time graphs' })],
    // ── Equilibrium (Stage 2 2.2–2.3) ────────────────────────────────────────
    'reversible-reactions': [at(12, 'develop', c)],
    'equilibrium-constant': [at(12, 'develop', { ...c, note: 'Kc, homogeneous systems only' })],
    'le-chatelier': [at(12, 'develop', c)],
    'industrial-processes': [at(12, 'develop', c)],
  },
};
