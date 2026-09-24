// src/core-engine/data/curriculum/placement.ts
//
// A shorthand for writing placements, so a country file reads as a table:
//
//   'mole-concept': [at(10, 'intro'), at(11, 'develop', { track: 'spe-pc' })],
//
// instead of four-key objects on every line.

import type { Depth, Placement, PlacementStatus, SchoolYear } from '../../types/curriculum';

interface PlacementOptions {
  track?: string;
  status?: PlacementStatus;
  note?: string;
}

export function at(
  years: SchoolYear | readonly [SchoolYear, SchoolYear],
  depth: Depth,
  { track, status = 'official', note }: PlacementOptions = {}
): Placement {
  const [from, to] = typeof years === 'number' ? [years, years] : years;
  return {
    from,
    to,
    depth,
    status,
    ...(track === undefined ? {} : { track }),
    ...(note === undefined ? {} : { note }),
  };
}

/** Placement inside a grade band the document does not split: where schools usually put it. */
export const typical = { status: 'typical' } as const;
