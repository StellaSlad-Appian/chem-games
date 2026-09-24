// src/core-engine/data/curriculum/index.ts
//
// The cross-country curriculum map: registry and the few queries a feature is
// likely to need. Nothing in the app reads this yet; see
// docs/curriculum/CROSS_COUNTRY_MAP.md for what it is for and how the site's
// existing `YearLevel` tags would migrate to it.

import type {
  ConceptId,
  CountryCode,
  CountryCurriculum,
  Placement,
  SchoolYear,
} from '../../types/curriculum';
import { AR } from './countries/ar';
import { ES } from './countries/es';
import { FR } from './countries/fr';
import { GB } from './countries/gb';
import { IL } from './countries/il';
import { IT } from './countries/it';
import { MX } from './countries/mx';
import { RU } from './countries/ru';
import { UA } from './countries/ua';
import { US } from './countries/us';

export { CONCEPTS, CONCEPT_BY_ID } from './concepts';

export const COUNTRY_CURRICULA: Readonly<Record<CountryCode, CountryCurriculum>> = {
  AR, ES, FR, GB, IL, IT, MX, RU, UA, US,
};

export const COUNTRY_CODES = Object.keys(COUNTRY_CURRICULA) as CountryCode[];

/**
 * Which placements count.
 * - 'main': only untagged placements — what every student on the main route meets.
 * - 'all': every track.
 * - a track key: the main route plus that track, which is what a student on it meets.
 */
export type TrackFilter = 'main' | 'all' | string;

const matchesTrack = (placement: Placement, filter: TrackFilter): boolean =>
  filter === 'all' || placement.track === undefined || placement.track === filter;

/** Planned placements describe a reform, not what is taught now. Excluded unless asked for. */
const isCurrent = (placement: Placement, includePlanned: boolean): boolean =>
  includePlanned || placement.status !== 'planned';

interface QueryOptions {
  track?: TrackFilter;
  includePlanned?: boolean;
}

export function placementsOf(
  country: CountryCode,
  concept: ConceptId,
  { track = 'all', includePlanned = false }: QueryOptions = {}
): Placement[] {
  return (COUNTRY_CURRICULA[country].placements[concept] ?? []).filter(
    (placement) => matchesTrack(placement, track) && isCurrent(placement, includePlanned)
  );
}

/** The earliest year a concept is met in a country, or null if the documents don't include it. */
export function firstYear(
  country: CountryCode,
  concept: ConceptId,
  options: QueryOptions = { track: 'main' }
): SchoolYear | null {
  const years = placementsOf(country, concept, options).map((placement) => placement.from);
  return years.length === 0 ? null : (Math.min(...years) as SchoolYear);
}

/** Every concept taught in a given year, with the placement that puts it there. */
export function conceptsInYear(
  country: CountryCode,
  year: SchoolYear,
  { track = 'main', includePlanned = false }: QueryOptions = {}
): { concept: ConceptId; placement: Placement }[] {
  const entries = Object.entries(COUNTRY_CURRICULA[country].placements) as [ConceptId, readonly Placement[]][];
  return entries.flatMap(([concept, placements]) =>
    placements
      .filter(
        (placement) =>
          placement.from <= year &&
          year <= placement.to &&
          matchesTrack(placement, track) &&
          isCurrent(placement, includePlanned)
      )
      .map((placement) => ({ concept, placement }))
  );
}

/** '2º ESO', '8 класс', 'כיתה ח'. */
export function localYearLabel(country: CountryCode, year: SchoolYear): string {
  const entry = COUNTRY_CURRICULA[country].years.find((candidate) => candidate.year === year);
  if (!entry) throw new Error(`${country} has no entry for Year ${year}.`);
  return entry.localLabel;
}
