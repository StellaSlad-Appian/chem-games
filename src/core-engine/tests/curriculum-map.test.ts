import { describe, expect, it } from 'vitest';
import {
  SCHOOL_YEARS,
  type CanonicalConcept,
  type ConceptId,
  type CurriculumArea,
  type JurisdictionCurriculum,
  type Placement,
} from '../types/curriculum';
import { CONCEPT_BY_ID, CONCEPTS } from '../data/curriculum/concepts';
import {
  CURRICULA,
  JURISDICTION_CODES,
  conceptsInYear,
  curriculumFor,
  firstYear,
  localYearLabel,
} from '../data/curriculum';
import { getCheatSheetBySlug } from '@/lib/cheat-sheet-data';

// Same pattern as the `concepts.id` check constraint in
// supabase/migrations/20260913_create_concepts.sql.
const DB_CONCEPT_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// Seeded in that migration. The canonical list must be able to point at them.
const SEEDED_DB_CONCEPTS = [
  'states-of-matter', 'acids-and-bases', 'chemical-bonding', 'lewis-structures', 'ionic-compounds',
  'polyatomic-ions', 'inorganic-nomenclature', 'balancing-equations', 'reaction-types', 'stoichiometry',
  'functional-groups', 'organic-nomenclature', 'reaction-pathways',
];

const conceptIds = new Set<string>(CONCEPTS.map((concept) => concept.id));

const recordOf = (code: (typeof JURISDICTION_CODES)[number]): JurisdictionCurriculum => {
  const record = CURRICULA[code];
  if (!record) throw new Error(`No record for ${code}`);
  return record;
};

const allPlacements = () =>
  JURISDICTION_CODES.flatMap((code) =>
    (Object.entries(recordOf(code).placements) as [ConceptId, readonly Placement[]][]).flatMap(
      ([concept, placements]) => placements.map((placement) => ({ code, concept, placement }))
    )
  );

const areaOf = (concept: string): CurriculumArea => {
  const entry = CONCEPT_BY_ID.get(concept);
  if (!entry) throw new Error(`Unknown concept ${concept}`);
  return entry.area;
};

// A record without `coveredAreas` claims to speak for every area, so it should
// place concepts in most of them. This catches a partial record that forgot to
// declare itself partial.
const MIN_AREAS_FOR_A_FULL_RECORD = 20;

describe('canonical concepts', () => {
  it('have unique ids that the concepts table would accept', () => {
    expect(conceptIds.size).toBe(CONCEPTS.length);
    for (const concept of CONCEPTS) expect(concept.id).toMatch(DB_CONCEPT_ID);
  });

  it('are each placed by at least one jurisdiction', () => {
    const placed = new Set(allPlacements().map(({ concept }) => concept));
    expect(CONCEPTS.filter((concept) => !placed.has(concept.id)).map((c) => c.id)).toEqual([]);
  });

  it('account for every concept the database was seeded with', () => {
    const covered = new Set(
      (CONCEPTS as readonly CanonicalConcept[]).flatMap((concept) => concept.legacy?.concepts ?? [])
    );
    expect(SEEDED_DB_CONCEPTS.filter((id) => !covered.has(id))).toEqual([]);
  });

  it('name only cheat sheets that exist', () => {
    const sheets = (CONCEPTS as readonly CanonicalConcept[]).flatMap((concept) => concept.legacy?.cheatSheets ?? []);
    expect(sheets.filter((slug) => !getCheatSheetBySlug(slug))).toEqual([]);
  });
});

describe.each(JURISDICTION_CODES)('%s', (code) => {
  const country = recordOf(code);

  it('describes each of Years 7–13 exactly once, in order', () => {
    expect(country.years.map((entry) => entry.year)).toEqual(SCHOOL_YEARS);
  });

  it('names its country consistently with its code', () => {
    if (code.includes('-')) expect(code.startsWith(`${country.country}-`)).toBe(true);
    else expect(country.country).toBe(code);
  });

  it('declares itself partial unless it places concepts across most areas', () => {
    const areas = new Set(Object.keys(country.placements).map(areaOf));
    if (country.coveredAreas === undefined) expect(areas.size).toBeGreaterThanOrEqual(MIN_AREAS_FOR_A_FULL_RECORD);
  });

  it('places at least one concept in every area it claims to cover', () => {
    const areas = new Set(Object.keys(country.placements).map(areaOf));
    expect((country.coveredAreas ?? []).filter((area) => !areas.has(area))).toEqual([]);
  });

  it('lists in alsoCovers only jurisdictions of its own country that have no record', () => {
    for (const covered of country.alsoCovers ?? []) {
      expect(covered.startsWith(`${country.country}-`)).toBe(true);
      expect(CURRICULA[covered]).toBeUndefined();
      expect(curriculumFor(covered)).toBe(country);
    }
  });

  it('only places known concepts', () => {
    expect(Object.keys(country.placements).filter((id) => !conceptIds.has(id))).toEqual([]);
  });

  it('has placements with ordered year ranges and known tracks', () => {
    for (const placement of Object.values(country.placements).flat()) {
      expect(placement.from).toBeLessThanOrEqual(placement.to);
      if (placement.track !== undefined) expect(Object.keys(country.tracks)).toContain(placement.track);
    }
  });

  it('places nothing current in a year that does not exist', () => {
    const missing = country.years.filter((entry) => entry.delivery === 'no-such-year').map((entry) => entry.year);
    const offenders = Object.entries(country.placements).filter(([, placements]) =>
      placements.some(
        (placement) =>
          placement.status !== 'planned' && missing.some((year) => placement.from <= year && year <= placement.to)
      )
    );
    expect(offenders.map(([concept]) => concept)).toEqual([]);
  });

  it('uses every track it declares', () => {
    const used = new Set(Object.values(country.placements).flat().map((placement) => placement.track));
    expect(Object.keys(country.tracks).filter((track) => !used.has(track))).toEqual([]);
  });

  it('has a re-check date after the research date', () => {
    expect(Date.parse(country.change.recheckBy)).toBeGreaterThan(Date.parse(country.researchedOn));
  });
});

describe('queries', () => {
  it('find the first year on the main route, ignoring tracks', () => {
    // The mole is Year 8 in Russia and Ukraine; Higher tier only at GCSE, so not on England's main route.
    expect(firstYear('RU', 'mole-concept')).toBe(8);
    expect(firstYear('UA', 'mole-concept')).toBe(8);
    expect(firstYear('GB', 'mole-concept')).toBeNull();
    expect(firstYear('GB', 'mole-concept', { track: 'higher' })).toBe(10);
  });

  it('leave planned reforms out unless asked', () => {
    expect(conceptsInYear('UA', 12, { track: 'all' })).toEqual([]);
    expect(conceptsInYear('UA', 12, { track: 'all', includePlanned: true }).length).toBeGreaterThan(0);
  });

  it('give local year labels', () => {
    expect(localYearLabel('FR', 7)).toBe('5e');
    expect(localYearLabel('ES', 12)).toBe('2º Bachillerato');
    expect(localYearLabel('DE-BY', 12)).toBe('Q12');
  });

  it('resolve a jurisdiction that follows another record', () => {
    // The Northern Territory uses South Australia's SACE.
    expect(curriculumFor('AU-NT')?.code).toBe('AU-SA');
    expect(firstYear('AU-NT', 'rate-factors')).toBe(10);
  });

  it('say unknown, not absent, outside the areas a partial record covers', () => {
    // Bavaria was researched for organic, kinetics, energetics and equilibrium only.
    expect(firstYear('DE-BY', 'mole-concept')).toBe('unknown');
    // A placement outside those areas is still a fact.
    expect(firstYear('DE-BY', 'organic-nomenclature')).toBe(9);
    // Inside them, no placement means not taught: no rate law in LehrplanPLUS.
    expect(firstYear('DE-BY', 'rate-laws')).toBeNull();
  });

  it('separate tracks and the main route in Germany and Australia', () => {
    // Enthalpy comes in the Oberstufe in Bavaria, on both courses; the NTG track meets it in Jgst. 10 Profil.
    expect(firstYear('DE-BY', 'enthalpy-calorimetry')).toBeNull();
    expect(firstYear('DE-BY', 'enthalpy-calorimetry', { track: 'ga' })).toBe(12);
    expect(firstYear('DE-BY', 'enthalpy-calorimetry', { track: 'ntg' })).toBe(10);
    // Kinetics is Year 11 in NSW but Year 12 in Victoria.
    expect(firstYear('AU-NSW', 'collision-theory', { track: 'chemistry' })).toBe(11);
    expect(firstYear('AU-VIC', 'collision-theory', { track: 'chemistry' })).toBe(12);
    // NSW adds geometric isomers only with the 2025 syllabus.
    expect(firstYear('AU-NSW', 'geometric-isomerism', { track: 'chemistry' })).toBeNull();
    expect(firstYear('AU-NSW', 'geometric-isomerism', { track: 'chemistry', includePlanned: true })).toBe(12);
  });
});
