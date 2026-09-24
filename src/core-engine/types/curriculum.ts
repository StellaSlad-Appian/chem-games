// src/core-engine/types/curriculum.ts
//
// Types for the cross-country curriculum map: which chemistry concepts and
// skills each country teaches in which school year.
//
// The map is data about *curricula*, not about this site's content. It does not
// replace `YearLevel` (the Victorian bands the cheat sheets and games are tagged
// with) — docs/curriculum/CROSS_COUNTRY_MAP.md explains how the two relate and
// how to migrate from one to the other.
//
// Year numbering is each country's own. "Year 7" means the country's seventh
// school year counting its first year of primary as Year 1 — 5e in France,
// 1º ESO in Spain, 7 класс in Russia. It is deliberately NOT normalised by age,
// so the same number can mean a child a year or two older or younger in another
// country. `CountryYear.typicalAgeAtStart` records the age for information only.

import type { CONCEPTS } from '../data/curriculum/concepts';

/** The school years the map covers. */
export type SchoolYear = 7 | 8 | 9 | 10 | 11 | 12;

export const SCHOOL_YEARS: readonly SchoolYear[] = [7, 8, 9, 10, 11, 12];

/** ISO 3166-1 alpha-2. `GB` is the United Kingdom (England unless a track says otherwise). */
export type CountryCode = 'AR' | 'ES' | 'FR' | 'GB' | 'IL' | 'IT' | 'MX' | 'RU' | 'UA' | 'US';

/**
 * Topic areas. Every concept sits in exactly one. The first nineteen are
 * content, the last four are skills.
 */
export type CurriculumArea =
  | 'matter'
  | 'mixtures'
  | 'atomic-structure'
  | 'periodic-table'
  | 'bonding'
  | 'nomenclature'
  | 'reactions'
  | 'stoichiometry'
  | 'solutions'
  | 'gases'
  | 'acids-bases'
  | 'redox'
  | 'energetics'
  | 'kinetics'
  | 'equilibrium'
  | 'organic'
  | 'polymers-materials'
  | 'biochemistry'
  | 'nuclear'
  | 'analytical'
  | 'descriptive'
  | 'applied'
  | 'skills-practical'
  | 'skills-quantitative'
  | 'skills-models'
  | 'skills-inquiry';

export interface CanonicalConcept {
  /**
   * Kebab-case, and it must satisfy the `concepts.id` check constraint in
   * supabase/migrations/20260913_create_concepts.sql, so a concept can be
   * inserted into that table unchanged. Where an existing concept id already
   * means the same thing it is reused (see `legacy`).
   */
  id: string;
  area: CurriculumArea;
  kind: 'concept' | 'skill';
  /** English working title. Not user-facing copy — not translated. */
  title: string;
  /** What is in scope, so two people tag the same content the same way. */
  scope: string;
  /**
   * Where this concept already exists on the site. `concepts` are rows of the
   * `concepts` table; `cheatSheets` are slugs in src/lib/cheat-sheet-data.ts.
   * Used by the migration, see docs/curriculum/CROSS_COUNTRY_MAP.md §6.
   */
  legacy?: { concepts?: readonly string[]; cheatSheets?: readonly string[] };
}

export type ConceptId = (typeof CONCEPTS)[number]['id'];

/**
 * How far a year takes a concept.
 * - intro: first meeting, qualitative, often inside integrated science.
 * - develop: the main teaching of it, with the usual calculations/representations.
 * - extend: beyond the common core — advanced track, exam-level depth, or university-style.
 */
export type Depth = 'intro' | 'develop' | 'extend';

/**
 * How firm the placement is.
 * - official: the national document puts it in this year (or band).
 * - typical: the document sets a band; this is where schools or exam boards usually put it.
 * - planned: part of a reform not yet in force in 2026/27.
 * - unverified: the country report could not confirm it from a primary source.
 */
export type PlacementStatus = 'official' | 'typical' | 'planned' | 'unverified';

export interface Placement {
  from: SchoolYear;
  to: SchoolYear;
  depth: Depth;
  /** A key of the country's `tracks`. Absent means every student on the main route. */
  track?: string;
  status: PlacementStatus;
  note?: string;
}

export type ChemistryDelivery =
  /** A subject called chemistry. */
  | 'separate'
  /** Physics-and-chemistry as one subject (France, Spain). */
  | 'combined-physical-science'
  /** A strand of general or integrated science. */
  | 'integrated-science'
  /** Only some students take it. */
  | 'optional'
  | 'none'
  /** The year does not exist in this system. */
  | 'no-such-year';

export interface CountryYear {
  year: SchoolYear;
  /** As a local teacher would write it: '5e', '2º ESO', '8 класс', 'כיתה ח'. */
  localLabel: string;
  /** Romanised or English gloss, for readers who don't read the local script. */
  localLabelEn: string;
  typicalAgeAtStart: number;
  stage: string;
  delivery: ChemistryDelivery;
  note?: string;
}

export type Stability = 'stable' | 'moderate' | 'high';

export interface CurriculumChange {
  /** ISO date or year, e.g. '2027-09' or '2028'. */
  when: string;
  what: string;
  status: 'adopted' | 'planned' | 'draft';
}

export interface ChangeCadence {
  stability: Stability;
  /** One line: why the rating. */
  reason: string;
  lastMajorRevision: { year: number; what: string };
  /** Years between major revisions, historically. */
  typicalIntervalYears: readonly [number, number];
  mechanism: 'scheduled' | 'ad-hoc' | 'mixed';
  /** The smaller, more frequent changes (exam specs, yearly focus lists…). */
  minorUpdates: string;
  upcoming: readonly CurriculumChange[];
  /** When this country's data should next be re-checked (ISO date). */
  recheckBy: string;
}

export interface CountryCurriculum {
  code: CountryCode;
  name: string;
  /** Which documents the data describes, one line. */
  basis: string;
  /** Research date of the underlying report (ISO date). */
  researchedOn: string;
  /** Path of the country report, relative to the repo root. */
  report: string;
  reviewedByTeacher: boolean;
  years: readonly CountryYear[];
  /** Track keys used in placements → human description. */
  tracks: Readonly<Record<string, string>>;
  change: ChangeCadence;
  /**
   * Absence of a concept means the national documents for Years 7–12 do not
   * include it — not that no school ever teaches it.
   */
  placements: Readonly<Partial<Record<ConceptId, readonly Placement[]>>>;
  /** Content that falls just outside 7–12 and matters for games (Year 13, Grade 6). */
  outsideRange?: readonly string[];
}
