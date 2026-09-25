// src/core-engine/data/curriculum/countries/au-tas.ts
//
// Tasmania: Australian Curriculum v9 for Years 7–10 (government schools from
// 2023) and TASC courses for Years 11–12, which are set by course level, not
// year. Hydrocarbon naming sits in Physical Sciences Level 3 (usually Year 11);
// everything else in Chemistry Level 4, CHM415115 (usually Year 12). The years
// are therefore `typical`.
// Source: docs/curriculum/countries/australia-tas.md, §3.

import type { JurisdictionCurriculum } from '../../../types/curriculum';
import { at } from '../placement';
import { AC9_YEARS_7_10, AU_COVERED_AREAS, australianYears } from './au-common';

const ch4 = { track: 'chemistry', status: 'typical' } as const;
const ps3 = { track: 'physical-sciences', status: 'typical' } as const;

export const AU_TAS: JurisdictionCurriculum = {
  code: 'AU-TAS',
  country: 'AU',
  coveredAreas: AU_COVERED_AREAS,
  name: 'Australia — Tasmania',
  basis: 'Australian Curriculum v9.0 Science (Years 7–10); TASC Physical Sciences Level 3 and Chemistry Level 4 (CHM415115, current for 2026).',
  researchedOn: '2026-09-24',
  report: 'docs/curriculum/countries/australia-tas.md',
  reviewedByTeacher: false,
  years: australianYears('Years 11–12 (TCE)', 'TASC courses by level: Physical Sciences Level 3 usually in Year 11, Chemistry Level 4 usually in Year 12.'),
  tracks: {
    chemistry: 'TASC Chemistry Level 4 (CHM415115), usually Year 12',
    'physical-sciences': 'TASC Physical Sciences Level 3, usually Year 11',
  },
  change: {
    stability: 'stable',
    reason: 'Accreditation was renewed from 2026 with no end date, and Chemistry is not on the list of courses revised for 2027.',
    lastMajorRevision: { year: 2015, what: 'Chemistry Level 4 course (CHM415115; year from the course code, unverified)' },
    typicalIntervalYears: [5, 10],
    mechanism: 'scheduled',
    minorUpdates: 'Course document corrections (Sept 2026); exam information sheet versions (v2, Feb 2026).',
    upcoming: [],
    recheckBy: '2027-09-30',
  },
  placements: {
    ...AC9_YEARS_7_10,
    // ── Organic ──────────────────────────────────────────────────────────────
    hydrocarbons: [at(11, 'develop', ps3)],
    'organic-nomenclature': [at(11, 'develop', { ...ps3, note: 'Stems up to C10; halogen substituents' })],
    isomerism: [at(11, 'develop', { ...ps3, note: 'From a molecular formula' })],
    'functional-group-tests': [at(11, 'intro', { ...ps3, note: 'Bromine test' }), at(12, 'intro', { ...ch4, note: 'Carbonate and oxidation behaviour; no Tollens or Fehling' })],
    'functional-groups': [at(12, 'develop', { ...ch4, note: 'All eight families, simple only' })],
    'oxygen-organics': [at(12, 'develop', { ...ch4, note: '1°/2°/3° alcohol oxidation; esters and their hydrolysis' })],
    'nitrogen-organics': [at(12, 'develop', { ...ch4, note: 'Simple amines and amides' })],
    'aromatic-compounds': [at(12, 'intro', { ...ch4, note: 'Benzene structure only' })],
    'organic-reaction-types': [at(12, 'develop', { ...ch4, note: 'Substitution; addition incl. asymmetric addition' })],
    'reaction-pathways': [at(12, 'develop', { ...ch4, note: 'Flowchart on the information sheet' })],
    'structural-formulas': [at(11, 'develop', ps3), at(12, 'develop', ch4)],
    'intermolecular-forces': [at(12, 'develop', ch4)],
    'ir-nmr-ms': [at(12, 'develop', { ...ch4, note: 'MS and IR; no NMR' })],
    'yield-and-atom-economy': [at(12, 'develop', { ...ch4, note: 'Percentage yield and purity' })],
    'addition-polymerisation': [at(12, 'develop', ch4)],
    'condensation-polymerisation': [at(12, 'develop', ch4)],
    // ── Energetics ───────────────────────────────────────────────────────────
    'exo-endothermic': [...(AC9_YEARS_7_10['exo-endothermic'] ?? []), at(12, 'develop', ch4)],
    'reaction-profiles': [at(12, 'develop', ch4)],
    'enthalpy-calorimetry': [at(12, 'develop', { ...ch4, note: 'E = mcΔT; calibration factor; latent heat' })],
    'hess-law': [at(12, 'develop', ch4)],
    'bond-energies': [at(12, 'develop', { ...ch4, note: 'Calculation; table given in the question' })],
    'entropy-gibbs': [at(12, 'intro', { ...ch4, note: 'Only as a driving force of equilibrium; no Gibbs energy' })],
    'fuels-energy': [at(12, 'develop', { ...ch4, note: 'Heat of combustion in kJ g-1' })],
    // ── Kinetics ─────────────────────────────────────────────────────────────
    'rate-factors': [...(AC9_YEARS_7_10['rate-factors'] ?? []), at(12, 'develop', ch4)],
    'collision-theory': [at(12, 'develop', ch4)],
    catalysts: [...(AC9_YEARS_7_10.catalysts ?? []), at(12, 'develop', ch4)],
    'measuring-rate': [at(12, 'develop', { ...ch4, note: 'Average rate' })],
    'maxwell-boltzmann': [at(12, 'develop', { ...ch4, note: 'Kinetic-energy distribution, not named' })],
    // ── Equilibrium ──────────────────────────────────────────────────────────
    'reversible-reactions': [at(12, 'develop', ch4)],
    'equilibrium-constant': [at(12, 'develop', { ...ch4, note: 'Kc with units; Q' })],
    'le-chatelier': [at(12, 'develop', { ...ch4, note: 'Including its limitations and adding a catalyst' })],
    'industrial-processes': [at(12, 'intro', ch4)],
  },
};
