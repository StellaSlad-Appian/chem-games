// src/core-engine/data/curriculum/countries/au-vic.ts
//
// Victoria: Victorian Curriculum 2.0 Science (Levels 7–10) and the VCE
// Chemistry Study Design (Units 1–2 = Year 11 from 2023, Units 3–4 = Year 12
// from 2024). Source: docs/curriculum/countries/australia-victoria.md, §3.
//
// This is the site's current tag set (`YearLevel`), so it is the first
// Australian record to be completed across all areas (ALIGNMENT.md §3.4). Until
// then it covers organic chemistry, kinetics, energetics and equilibrium.

import type { JurisdictionCurriculum } from '../../../types/curriculum';
import { at } from '../placement';
import { AU_COVERED_AREAS, australianYears, chemistry as c } from './au-common';

/** Victorian Curriculum 2.0 sets Levels 9–10 as one band. */
const levels9to10 = [9, 10] as const;

export const AU_VIC: JurisdictionCurriculum = {
  code: 'AU-VIC',
  country: 'AU',
  coveredAreas: AU_COVERED_AREAS,
  name: 'Australia — Victoria',
  basis: 'Victorian Curriculum F–10 Version 2.0 Science (Levels 9–10); VCAA VCE Chemistry Study Design (Units 1–2 from 2023, Units 3–4 from 2024); 2026 VCE Data Book.',
  researchedOn: '2026-09-24',
  report: 'docs/curriculum/countries/australia-victoria.md',
  reviewedByTeacher: false,
  years: australianYears('Senior secondary (VCE)', 'VCE Chemistry is an elective: Units 1–2 in Year 11, Units 3–4 in Year 12.'),
  tracks: { chemistry: 'VCE Chemistry (Units 1–4)' },
  change: {
    stability: 'stable',
    reason: 'The study design is new (2023/2024); VCAA lists it with no end date and no replacement is announced.',
    lastMajorRevision: { year: 2023, what: 'VCE Chemistry Study Design, Units 1–2 from 2023 and Units 3–4 from 2024' },
    typicalIntervalYears: [5, 7],
    mechanism: 'scheduled',
    minorUpdates: 'VCE Data Book changes (bond enthalpies and the -amide row removed for 2026); exam specifications.',
    upcoming: [],
    recheckBy: '2027-06-30',
  },
  placements: {
    // ── Organic ──────────────────────────────────────────────────────────────
    'organic-intro': [at(11, 'intro', { ...c, note: 'Unit 1 AoS 2: five organic families' })],
    hydrocarbons: [at(11, 'develop', c)],
    'homologous-series': [at(11, 'develop', c), at(12, 'develop', { ...c, note: 'Trends within and between series' })],
    'organic-nomenclature': [at(11, 'develop', { ...c, note: 'Non-cyclic, up to C8' }), at(12, 'develop', { ...c, note: 'propan-1-ol and 1-propanol both accepted' })],
    'functional-groups': [at(11, 'intro', c), at(12, 'develop', { ...c, note: 'At most two functional groups' })],
    'oxygen-organics': [at(12, 'develop', { ...c, note: '1°/2°/3° alcohol oxidation; esterification; transesterification to biodiesel' })],
    'nitrogen-organics': [at(12, 'develop', { ...c, note: 'Primary amines named; primary amides drawn, not named' })],
    isomerism: [at(11, 'develop', { ...c, note: 'Structural isomers up to C5' })],
    'geometric-isomerism': [at(12, 'develop', { ...c, status: 'typical', note: 'cis/trans; examined (2023 report), not named in the study design' })],
    'optical-isomerism': [at(12, 'develop', { ...c, note: 'Chiral centres; enantiomers and drug action' })],
    'organic-reaction-types': [at(12, 'develop', { ...c, note: 'Equations and conditions, no mechanisms; no dehydration, no Markovnikov' })],
    'reaction-pathways': [at(12, 'develop', { ...c, note: 'Unit 4 Outcome 1: design reaction pathways' })],
    'organic-synthesis-techniques': [at(12, 'develop', { ...c, note: 'Distillation, solvent extraction, melting point' })],
    'structural-formulas': [at(11, 'develop', c), at(12, 'develop', { ...c, note: 'Skeletal formulas required' })],
    'intermolecular-forces': [at(11, 'develop', c), at(12, 'develop', c)],
    'functional-group-tests': [at(12, 'develop', { ...c, note: 'Bromine water, acidified dichromate, carbonate; no Tollens or Fehling' })],
    'ir-nmr-ms': [at(12, 'develop', { ...c, note: 'MS, IR, 13C and 1H NMR (n+1 rule)' })],
    chromatography: [at(11, 'intro', { ...c, note: 'Rf' }), at(12, 'develop', { ...c, note: 'HPLC' })],
    'yield-and-atom-economy': [at(12, 'develop', { ...c, note: 'Both examined, including comparing routes' })],
    'polymers-intro': [at(11, 'develop', c)],
    'addition-polymerisation': [at(11, 'develop', c)],
    'condensation-polymerisation': [at(11, 'intro', c)],
    carbohydrates: [at(12, 'develop', c)],
    lipids: [at(12, 'develop', c)],
    'amino-acids-proteins': [at(12, 'develop', c)],
    // ── Energetics ───────────────────────────────────────────────────────────
    'exo-endothermic': [at(levels9to10, 'intro'), at(12, 'develop', c)],
    'reaction-profiles': [at(12, 'develop', { ...c, note: 'x-axis is reaction progress, not time' })],
    'enthalpy-calorimetry': [at(11, 'intro', { ...c, note: 'Specific heat capacity (Unit 2)' }), at(12, 'develop', { ...c, note: 'Solution calorimetry with calibration factor' })],
    'bond-energies': [at(12, 'intro', { ...c, note: 'Qualitative; bond-enthalpy tables removed from the 2026 Data Book' })],
    'fuels-energy': [at(12, 'develop', { ...c, note: 'kJ g-1 and kJ mL-1; fossil fuels vs biofuels' })],
    combustion: [at(12, 'develop', { ...c, note: 'Complete and incomplete' })],
    'food-molecules': [at(12, 'develop', { ...c, note: 'Food energy 37/17/16 kJ g-1' })],
    // ── Kinetics ─────────────────────────────────────────────────────────────
    'rate-factors': [at(levels9to10, 'intro'), at(12, 'develop', c)],
    'collision-theory': [at(12, 'develop', c)],
    catalysts: [at(levels9to10, 'intro'), at(12, 'develop', c)],
    'measuring-rate': [at(12, 'intro', { ...c, note: 'Practical work; no Δc/Δt dot point' })],
    'maxwell-boltzmann': [at(12, 'develop', { ...c, status: 'typical', note: 'Examined (2024), not named in the study design' })],
    // ── Equilibrium ──────────────────────────────────────────────────────────
    'reversible-reactions': [at(12, 'develop', c)],
    'equilibrium-constant': [at(12, 'develop', { ...c, note: 'Kc with units; Q' })],
    'le-chatelier': [at(12, 'develop', c)],
    'industrial-processes': [at(12, 'develop', { ...c, note: 'Rate vs yield; no named process' })],
  },
};
