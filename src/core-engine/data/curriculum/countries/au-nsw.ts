// src/core-engine/data/curriculum/countries/au-nsw.ts
//
// New South Wales: Science 7–10 (Stage 5 = Years 9–10; the 2023 syllabus for
// Years 7 and 9 in 2026, the 2018 one for Years 8 and 10 until 2027) and the
// Chemistry Stage 6 Syllabus (2017) for Years 11–12, HSC until 2028.
// Source: docs/curriculum/countries/australia-nsw.md, §3.
//
// The Chemistry 11–12 Syllabus (2025) is first taught to Year 11 in 2028 and
// removes Hess's law, entropy and Gibbs energy. What it adds is placed as
// `planned`; what it removes cannot be expressed as a placement, so the notes
// say so and `change.upcoming` records it.

import type { JurisdictionCurriculum } from '../../../types/curriculum';
import { at } from '../placement';
import { AU_COVERED_AREAS, australianYears, chemistry as c } from './au-common';

const stage5 = [9, 10] as const;
const from2028 = { ...c, status: 'planned' } as const;
const removedFrom2028 = 'Removed in the 2025 syllabus (Year 11 from 2028)';

export const AU_NSW: JurisdictionCurriculum = {
  code: 'AU-NSW',
  country: 'AU',
  coveredAreas: AU_COVERED_AREAS,
  name: 'Australia — New South Wales',
  basis: 'NESA Science 7–10 Syllabus (2023, phased in; 2018 for Years 8 and 10 in 2026); Chemistry Stage 6 Syllabus (2017); Chemistry 11–12 Syllabus (2025) as planned.',
  researchedOn: '2026-09-24',
  report: 'docs/curriculum/countries/australia-nsw.md',
  reviewedByTeacher: false,
  years: australianYears('Stage 6 (HSC)', 'HSC Chemistry is an elective: Modules 1–4 in Year 11, Modules 5–8 in Year 12.'),
  tracks: { chemistry: 'HSC Chemistry (Stage 6)' },
  change: {
    stability: 'moderate',
    reason: 'A new senior syllabus is adopted for 2028 and the 7–10 syllabus is mid-rollout.',
    lastMajorRevision: { year: 2017, what: 'Chemistry Stage 6 Syllabus (first HSC 2019)' },
    typicalIntervalYears: [8, 12],
    mechanism: 'ad-hoc',
    minorUpdates: 'HSC data sheet and exam format; NESA assessment guidance.',
    upcoming: [
      { when: '2027', what: 'Science 7–10 Syllabus (2023) reaches Years 8 and 10', status: 'adopted' },
      { when: '2028-01', what: 'Chemistry 11–12 Syllabus (2025) first taught in Year 11; drops Hess, entropy and Gibbs; adds geometric isomers and ester naming', status: 'adopted' },
      { when: '2029', what: 'First HSC under the 2025 syllabus', status: 'adopted' },
    ],
    recheckBy: '2027-10-31',
  },
  placements: {
    // ── Organic (Stage 5; Year 12 Module 7–8) ───────────────────────────────
    hydrocarbons: [at(stage5, 'intro', { note: 'Straight-chain alkanes C1–C8 (2023 syllabus)' }), at(12, 'develop', c)],
    'crude-oil-fuels': [at(stage5, 'intro')],
    'homologous-series': [at(12, 'develop', { ...c, note: 'Up to C8: alkanes, alkenes, alkynes, alcohols, acids' })],
    'organic-nomenclature': [
      at(stage5, 'intro', { note: 'Simple compounds; straight-chain alkanes' }),
      at(12, 'develop', { ...c, note: 'Up to C8 with methyl/ethyl branches; propan-1-ol style' }),
    ],
    'functional-groups': [at(12, 'develop', c)],
    'oxygen-organics': [at(12, 'develop', { ...c, note: 'Oxidation of 1° and 2° alcohols; esterification by reflux' })],
    'nitrogen-organics': [at(12, 'develop', { ...c, note: 'Amines and amides named (dropped in 2028)' })],
    isomerism: [at(12, 'develop', { ...c, note: 'Chain, position and functional-group isomers' })],
    'geometric-isomerism': [at(12, 'develop', { ...from2028, note: '"Geometric isomers of alkenes and alkynes"' })],
    'organic-reaction-types': [at(12, 'develop', { ...c, note: 'Addition, substitution, dehydration, oxidation; no mechanisms' })],
    'reaction-pathways': [at(12, 'develop', { ...c, note: 'Flow charts, including multi-step' })],
    'structural-formulas': [at(12, 'develop', { ...c, note: 'Structural and molecular; skeletal named from 2028' })],
    'intermolecular-forces': [at(11, 'develop', c), at(12, 'develop', c)],
    'functional-group-tests': [at(12, 'develop', { ...c, note: 'C=C, hydroxyl, carboxylic acid; reagents not named (Module 8)' })],
    'ir-nmr-ms': [at(12, 'develop', { ...c, note: 'IR, MS, 1H and 13C NMR' })],
    'yield-and-atom-economy': [at(12, 'develop', { ...c, note: 'Yield; atom economy not named' })],
    'addition-polymerisation': [at(12, 'develop', c)],
    'condensation-polymerisation': [at(12, 'develop', c)],
    lipids: [at(12, 'develop', { ...c, note: 'Soaps and detergents' })],
    // ── Energetics (Year 11 Module 4) ────────────────────────────────────────
    'exo-endothermic': [at(stage5, 'intro'), at(11, 'develop', c)],
    'reaction-profiles': [at(11, 'develop', c)],
    'enthalpy-calorimetry': [at(11, 'develop', { ...c, note: 'q = mcΔT; c(water) in J kg-1 K-1 on the data sheet' })],
    'hess-law': [at(11, 'develop', { ...c, note: removedFrom2028 })],
    'bond-energies': [at(11, 'develop', { ...c, note: 'Bond energy data; no table on the data sheet' })],
    'entropy-gibbs': [at(11, 'develop', { ...c, note: `ΔG° = ΔH° − TΔS° on the formula sheet. ${removedFrom2028}` })],
    'fuels-energy': [at(11, 'develop', { ...c, note: 'Heat of combustion' }), at(12, 'develop', { ...c, note: 'Biofuels' })],
    combustion: [at(stage5, 'intro', { note: 'Complete and incomplete' }), at(11, 'develop', c)],
    // ── Kinetics (Year 11 Modules 3–4) ───────────────────────────────────────
    'rate-factors': [at(stage5, 'intro'), at(11, 'develop', c)],
    'collision-theory': [at(11, 'develop', c)],
    catalysts: [at(11, 'develop', c)],
    'measuring-rate': [at(stage5, 'intro', { note: 'Graphing rate data (2023 syllabus)' }), at(11, 'intro', { ...c, note: 'Qualitative; no Δc/Δt calculation' })],
    // ── Equilibrium (Year 12 Module 5) ───────────────────────────────────────
    'reversible-reactions': [at(12, 'develop', c)],
    'equilibrium-constant': [at(12, 'develop', { ...c, note: 'Keq for homogeneous solution reactions; Q from 2028' })],
    'le-chatelier': [at(12, 'develop', c)],
    'solubility-product': [at(12, 'develop', c)],
    'industrial-processes': [at(12, 'develop', { ...from2028, note: 'Industrial compromise made explicit' })],
  },
};
