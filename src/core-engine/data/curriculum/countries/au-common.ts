// src/core-engine/data/curriculum/countries/au-common.ts
//
// Shared pieces of the Australian records. Australia has no national senior
// curriculum, so each state is its own record (docs/curriculum/ALIGNMENT.md §3).
// What they share is the year structure, and — for Queensland, South Australia,
// Tasmania and the ACT — the national Australian Curriculum v9 for Years 7–10,
// which those states teach as written.
//
// Source: docs/curriculum/countries/australia-curriculum-v9-7-10.md. v9 has no
// organic chemistry, energy diagrams, collision theory or equilibrium in
// Years 7–10; the placements below are all it has in the four covered areas.

import type { CountryYear, CurriculumArea, JurisdictionCurriculum } from '../../../types/curriculum';
import { at } from '../placement';

/** Senior Chemistry is an elective subject in every state, like England's A level. */
export const chemistry = { track: 'chemistry' } as const;

/** The areas the Australian research covered in depth (ALIGNMENT.md §3.4). */
export const AU_COVERED_AREAS: readonly CurriculumArea[] = ['organic', 'kinetics', 'energetics', 'equilibrium'];

export function australianYears(seniorStage: string, seniorNote: string): readonly CountryYear[] {
  const secondary = (year: 7 | 8 | 9 | 10) =>
    ({
      year,
      localLabel: `Year ${year}`,
      localLabelEn: `Year ${year}`,
      typicalAgeAtStart: year + 5,
      stage: 'Secondary (Years 7–10)',
      delivery: 'integrated-science',
    }) as const;
  return [
    secondary(7),
    secondary(8),
    secondary(9),
    secondary(10),
    { year: 11, localLabel: 'Year 11', localLabelEn: 'Year 11', typicalAgeAtStart: 16, stage: seniorStage, delivery: 'optional', note: seniorNote },
    { year: 12, localLabel: 'Year 12', localLabelEn: 'Year 12', typicalAgeAtStart: 17, stage: seniorStage, delivery: 'optional', note: seniorNote },
    { year: 13, localLabel: '—', localLabelEn: 'does not exist', typicalAgeAtStart: 18, stage: 'none', delivery: 'no-such-year', note: 'School ends after Year 12.' },
  ];
}

/** Australian Curriculum v9 Science, Years 7–10: the placements in the covered areas. */
export const AC9_YEARS_7_10: JurisdictionCurriculum['placements'] = {
  'exo-endothermic': [at(8, 'intro', { note: '"Indicators of energy change"; the terms themselves are in no content description' })],
  'rate-factors': [at(10, 'intro', { note: 'AC9S10U07: temperature, concentration, surface area, catalysts' })],
  catalysts: [at(10, 'intro', { note: 'As a rate factor, in the elaborations only' })],
};
