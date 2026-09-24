// src/core-engine/data/curriculum/index.ts
//
// The curriculum map: registry and the few queries a feature is likely to
// need. Nothing in the app reads this yet; see docs/curriculum/CROSS_COUNTRY_MAP.md
// for what it is for and how the site's existing `YearLevel` tags would
// migrate to it, and docs/curriculum/ALIGNMENT.md for why Germany and Australia
// are keyed by state.
//
// Performance rule (ALIGNMENT.md §5.1): a page needs one jurisdiction, so never
// import `CURRICULA` into a client component. Resolve on the server, or import
// the one record.

import type {
  ConceptId,
  JurisdictionCode,
  JurisdictionCurriculum,
  Placement,
  SchoolYear,
} from '../../types/curriculum';
import { CONCEPT_BY_ID } from './concepts';
import { AR } from './countries/ar';
import { AU_ACT } from './countries/au-act';
import { AU_NSW } from './countries/au-nsw';
import { AU_QLD } from './countries/au-qld';
import { AU_SA } from './countries/au-sa';
import { AU_TAS } from './countries/au-tas';
import { AU_VIC } from './countries/au-vic';
import { AU_WA } from './countries/au-wa';
import { DE_BY } from './countries/de-by';
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

/** One record per curriculum. Jurisdictions that follow another's record (`alsoCovers`) have no key. */
export const CURRICULA: Readonly<Partial<Record<JurisdictionCode, JurisdictionCurriculum>>> = {
  AR, ES, FR, GB, IL, IT, MX, RU, UA, US,
  'AU-ACT': AU_ACT,
  'AU-NSW': AU_NSW,
  'AU-QLD': AU_QLD,
  'AU-SA': AU_SA,
  'AU-TAS': AU_TAS,
  'AU-VIC': AU_VIC,
  'AU-WA': AU_WA,
  'DE-BY': DE_BY,
};

/** The jurisdictions that have a record of their own. */
export const JURISDICTION_CODES = Object.keys(CURRICULA) as JurisdictionCode[];

const ALSO_COVERED: ReadonlyMap<JurisdictionCode, JurisdictionCode> = new Map(
  JURISDICTION_CODES.flatMap((code) => (CURRICULA[code]?.alsoCovers ?? []).map((covered) => [covered, code] as const))
);

/** The record a jurisdiction follows: its own, or the one that lists it in `alsoCovers`. Null if none is researched yet. */
export function curriculumFor(code: JurisdictionCode): JurisdictionCurriculum | null {
  const own = CURRICULA[code];
  if (own) return own;
  const host = ALSO_COVERED.get(code);
  return host === undefined ? null : (CURRICULA[host] ?? null);
}

function requireCurriculum(code: JurisdictionCode): JurisdictionCurriculum {
  const record = curriculumFor(code);
  if (!record) throw new Error(`No curriculum record covers ${code} yet.`);
  return record;
}

/**
 * Whether the record speaks for this concept at all. A placement always counts.
 * Otherwise, a record researched for only some areas (`coveredAreas`) knows
 * nothing about the others, so no placement there means "not researched", not
 * "not taught".
 */
export function isKnown(code: JurisdictionCode, concept: ConceptId): boolean {
  const { coveredAreas, placements } = requireCurriculum(code);
  if (coveredAreas === undefined || placements[concept] !== undefined) return true;
  const entry = CONCEPT_BY_ID.get(concept);
  if (!entry) throw new Error(`Unknown concept ${concept}.`);
  return coveredAreas.includes(entry.area);
}

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
  code: JurisdictionCode,
  concept: ConceptId,
  { track = 'all', includePlanned = false }: QueryOptions = {}
): Placement[] {
  return (requireCurriculum(code).placements[concept] ?? []).filter(
    (placement) => matchesTrack(placement, track) && isCurrent(placement, includePlanned)
  );
}

/**
 * The earliest year a concept is met in a jurisdiction; null if the documents
 * don't include it; 'unknown' if the record was not researched for its area.
 */
export function firstYear(
  code: JurisdictionCode,
  concept: ConceptId,
  options: QueryOptions = { track: 'main' }
): SchoolYear | null | 'unknown' {
  if (!isKnown(code, concept)) return 'unknown';
  const years = placementsOf(code, concept, options).map((placement) => placement.from);
  return years.length === 0 ? null : (Math.min(...years) as SchoolYear);
}

/**
 * Every concept taught in a given year, with the placement that puts it there.
 * For a record with `coveredAreas`, other concepts may be taught that year too:
 * the record lists only what it has researched.
 */
export function conceptsInYear(
  code: JurisdictionCode,
  year: SchoolYear,
  { track = 'main', includePlanned = false }: QueryOptions = {}
): { concept: ConceptId; placement: Placement }[] {
  const entries = Object.entries(requireCurriculum(code).placements) as [ConceptId, readonly Placement[]][];
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

/** '2º ESO', '8 класс', 'כיתה ח', 'Jgst. 10'. */
export function localYearLabel(code: JurisdictionCode, year: SchoolYear): string {
  const entry = requireCurriculum(code).years.find((candidate) => candidate.year === year);
  if (!entry) throw new Error(`${code} has no entry for Year ${year}.`);
  return entry.localLabel;
}
