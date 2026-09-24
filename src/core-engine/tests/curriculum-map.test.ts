import { describe, expect, it } from 'vitest';
import { SCHOOL_YEARS, type CanonicalConcept, type ConceptId, type Placement } from '../types/curriculum';
import { CONCEPTS } from '../data/curriculum/concepts';
import {
  COUNTRY_CODES,
  COUNTRY_CURRICULA,
  conceptsInYear,
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

const allPlacements = () =>
  COUNTRY_CODES.flatMap((code) =>
    (Object.entries(COUNTRY_CURRICULA[code].placements) as [ConceptId, readonly Placement[]][]).flatMap(
      ([concept, placements]) => placements.map((placement) => ({ code, concept, placement }))
    )
  );

describe('canonical concepts', () => {
  it('have unique ids that the concepts table would accept', () => {
    expect(conceptIds.size).toBe(CONCEPTS.length);
    for (const concept of CONCEPTS) expect(concept.id).toMatch(DB_CONCEPT_ID);
  });

  it('are each placed by at least one country', () => {
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

describe.each(COUNTRY_CODES)('%s', (code) => {
  const country = COUNTRY_CURRICULA[code];

  it('describes each of Years 7–12 exactly once, in order', () => {
    expect(country.years.map((entry) => entry.year)).toEqual(SCHOOL_YEARS);
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
  });
});
