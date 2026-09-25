// src/core-engine/data/curriculum/countries/mx.ts
//
// Mexico. Source: docs/curriculum/countries/mexico.md.
//
// Secundaria (Years 7–9) follows Plan de Estudio 2022 (Nueva Escuela Mexicana):
// chemistry is a named discipline only in 3º (Year 9). Upper secondary
// (Years 10–12) is mid-rollout: in 2026/27 Years 10–11 follow the 2025 MCCEMS
// model and Year 12 still the 2023 one. The untagged route there is the DGB
// bachillerato general, where chemistry sits inside the integrated science
// courses CNEyT I (Year 10) and CNEyT IV (Year 11).
//
// Topics that existed only in the 2023 CNEyT IV (collision theory, Le Chatelier,
// bond energy, nuclear processes) are left out: the cohort that took them is in
// Year 12 now and no current Year 11 student meets them. See `outsideRange`.

import type { JurisdictionCurriculum } from '../../../types/curriculum';
import { at } from '../placement';

const cch = { track: 'cch' } as const;
const elective = { track: 'dgb-elective' } as const;

export const MX: JurisdictionCurriculum = {
  code: 'MX',
  country: 'MX',
  name: 'Mexico',
  basis: 'SEP Plan de Estudio 2022 (NEM), Fase 6 programme; MCCEMS Modelo Educativo 2025 (Acuerdo 21/08/25) with DGB CNEyT programmes; CCH-UNAM as contrast.',
  researchedOn: '2026-09-24',
  report: 'docs/curriculum/countries/mexico.md',
  reviewedByTeacher: false,
  years: [
    { year: 7, localLabel: '1º de secundaria', localLabelEn: 'first year of secundaria', typicalAgeAtStart: 12, stage: 'Secundaria (Fase 6)', delivery: 'none', note: 'Biología only; touches nutrition and the C/N cycles.' },
    { year: 8, localLabel: '2º de secundaria', localLabelEn: 'second year of secundaria', typicalAgeAtStart: 13, stage: 'Secundaria (Fase 6)', delivery: 'integrated-science', note: 'Particle and atomic models inside Física.' },
    { year: 9, localLabel: '3º de secundaria', localLabelEn: 'third year of secundaria', typicalAgeAtStart: 14, stage: 'Secundaria (Fase 6)', delivery: 'separate', note: 'Química, 6 periods/week.' },
    { year: 10, localLabel: '1º de bachillerato', localLabelEn: 'bachillerato, semesters 1–2', typicalAgeAtStart: 15, stage: 'Educación Media Superior', delivery: 'integrated-science', note: 'CNEyT I (chemistry-heavy) and CNEyT II (energy).' },
    { year: 11, localLabel: '2º de bachillerato', localLabelEn: 'bachillerato, semesters 3–4', typicalAgeAtStart: 16, stage: 'Educación Media Superior', delivery: 'integrated-science', note: 'CNEyT IV "El poder de la química" is the main chemistry course.' },
    { year: 12, localLabel: '3º de bachillerato', localLabelEn: 'bachillerato, semesters 5–6', typicalAgeAtStart: 17, stage: 'Educación Media Superior', delivery: 'optional', note: 'Core is physics and biology; chemistry only as an elective.' },
    { year: 13, localLabel: '—', localLabelEn: 'does not exist', typicalAgeAtStart: 18, stage: 'none', delivery: 'no-such-year', note: 'Bachillerato ends after Year 12.' },
  ],
  tracks: {
    cch: 'Colegio de Ciencias y Humanidades (UNAM): separate Química I–II in Year 10',
    'dgb-elective': 'DGB optional chemistry-related electives, semesters 5–6',
  },
  change: {
    stability: 'high',
    reason: 'Secundaria content is stable since 2023, but upper-secondary frameworks changed in 2022, 2023, 2025 and 2026 and move chemistry between semesters.',
    lastMajorRevision: { year: 2025, what: 'MCCEMS Modelo Educativo 2025 / Bachillerato Nacional (Acuerdo 21/08/25)' },
    typicalIntervalYears: [5, 6],
    mechanism: 'ad-hoc',
    minorUpdates: 'Free textbooks reissued every year; DGB programmes reissued mid-plan (2025, 2026).',
    upcoming: [
      { when: '2027-08', what: 'The 2025 model reaches semesters 5–6 (Year 12)', status: 'adopted' },
      { when: '2029', what: 'Full evaluation of the 2025 upper-secondary model', status: 'planned' },
    ],
    recheckBy: '2027-08-01',
  },
  placements: {
    'particle-model': [at(8, 'intro', { note: 'In Física' })],
    'states-of-matter': [at(8, 'intro'), at(10, 'develop')],
    'physical-properties': [at(8, 'intro'), at(9, 'intro')],
    density: [at(8, 'intro'), at(10, 'develop')],
    'heat-and-temperature': [at(8, 'intro'), at(10, 'develop')],
    'elements-compounds-mixtures': [at(9, 'develop'), at(10, 'develop')],
    'mixture-types': [at(9, 'intro')],
    'separation-techniques': [at(9, 'develop'), at(10, 'develop')],
    'dissolving-solubility': [at(9, 'intro')],
    'mass-concentration': [at(9, 'intro', { note: '% m/m, % v/v, ppm' }), at(10, 'develop')],
    'atomic-models-history': [at(8, 'intro'), at(10, 'develop')],
    'subatomic-particles': [at(9, 'intro')],
    isotopes: [at(10, 'develop')],
    'electron-shells': [at(9, 'intro', { note: 'Bohr diagrams' })],
    'electron-configuration': [at(10, 'develop')],
    'periodic-table-structure': [at(9, 'intro', { note: '"Semimetales" for metalloids' })],
    'periodic-trends': [at(9, 'intro'), at(10, 'develop')],
    'ionic-bonding': [at(9, 'intro'), at(10, 'develop')],
    'covalent-bonding': [at(9, 'intro'), at(10, 'develop')],
    'bond-polarity': [at(10, 'develop')],
    'lewis-structures': [at(9, 'intro')],
    'intermolecular-forces': [at(10, 'develop', cch)],
    hybridisation: [at(12, 'extend', elective)],
    'chemical-symbols-formulas': [at(9, 'intro')],
    'inorganic-nomenclature': [at(10, 'develop', { ...cch, note: 'Stock names, traditional oxoacid names' })],
    'organic-nomenclature': [at(11, 'intro'), at(12, 'extend', elective)],
    'physical-chemical-change': [at(9, 'intro')],
    'conservation-of-mass': [at(9, 'intro')],
    'writing-equations': [at(9, 'intro'), at(11, 'develop')],
    'balancing-equations': [at(11, 'develop', { note: 'By inspection (tanteo)' })],
    'reaction-types': [at(11, 'develop')],
    combustion: [at(11, 'develop')],
    'mole-concept': [at(11, 'intro', { note: 'Not in secundaria at all' })],
    'reacting-masses': [at(10, 'develop', cch), at(12, 'extend', elective)],
    'ideal-gas-equation': [at(10, 'intro')],
    'electrolytic-dissociation': [at(10, 'develop', cch)],
    'acids-bases-indicators': [at(9, 'intro'), at(11, 'develop')],
    'acid-base-theories': [at(9, 'intro', { note: 'Arrhenius' }), at(11, 'develop', { note: 'Arrhenius, Brønsted–Lowry, Lewis' })],
    neutralisation: [at(9, 'intro')],
    'strong-weak-acids': [at(11, 'develop')],
    'oxidation-states': [at(9, 'intro'), at(10, 'develop', cch)],
    'redox-electron-transfer': [at(9, 'intro'), at(11, 'develop')],
    electrolysis: [at(10, 'intro', { ...cch, note: 'Electrolysis of water' })],
    'exo-endothermic': [at(9, 'intro')],
    'entropy-gibbs': [at(10, 'intro', { note: 'Laws of thermodynamics, as concepts' })],
    'reversible-reactions': [at(11, 'intro')],
    'equilibrium-constant': [at(11, 'intro')],
    'organic-intro': [at(11, 'intro')],
    'functional-groups': [at(11, 'intro'), at(10, 'develop', cch)],
    hydrocarbons: [at(10, 'develop', cch), at(12, 'extend', elective)],
    isomerism: [at(10, 'develop', cch)],
    'organic-reaction-types': [at(12, 'extend', elective)],
    'crude-oil-fuels': [at(12, 'extend', cch)],
    'polymers-intro': [at(11, 'intro')],
    'plastics-and-recycling': [at(12, 'develop', elective)],
    'food-molecules': [at(7, 'intro', { note: 'In Biología' }), at(9, 'intro')],
    carbohydrates: [at(11, 'develop')],
    lipids: [at(11, 'develop')],
    'amino-acids-proteins': [at(11, 'develop')],
    'nucleic-acids': [at(11, 'develop')],
    'photosynthesis-respiration': [at(11, 'develop')],
    'fission-fusion': [at(8, 'intro', { note: 'Nuclear energy as an energy source, in Física' })],
    'inorganic-compound-classes': [at(11, 'develop', { note: 'Basic and acidic oxides' })],
    'air-oxygen-hydrogen': [at(11, 'develop')],
    'metal-extraction': [at(12, 'extend', cch)],
    'atmosphere-climate': [at([7, 8], 'intro'), at(11, 'develop')],
    pollution: [at(9, 'intro')],
    'resources-sustainability': [at(9, 'intro')],
    'industrial-processes': [at(12, 'extend', cch)],
    'units-and-conversions': [at(8, 'intro')],
    'chemical-calculations': [at([10, 11], 'develop')],
    'particle-diagrams': [at(9, 'intro')],
    'molecular-models': [at(9, 'intro')],
    'macro-micro-symbolic': [at(10, 'develop', cch)],
    'scientific-method': [at([7, 8], 'intro'), at(9, 'develop')],
    'scientific-communication': [at(10, 'develop', { note: 'Divulgación in the Taller de Ciencias' })],
  },
  outsideRange: [
    'Only in the 2023 CNEyT IV, taken by the cohort now in Year 12: collision theory, Le Chatelier, bond energy, nuclear processes.',
    'Only in Aprendizajes Clave 2017 (legacy): factors affecting reaction rate in 3º secundaria.',
    'ENP-UNAM runs separate Química III (5º año) and IV; not modelled.',
  ],
};
