// src/components/periodic-table/cells.ts
//
// The server's half of the widget (D2).
//
// The cheat-sheet page is a statically generated Server Component and stays
// one. It builds the localised rows here — element names come from
// `elementName(locale, symbol)`, masses are formatted with `Intl` — and hands
// the finished array to the one `'use client'` island, which owns nothing but
// `selected` and `viewMode`.
//
// Two things follow from that, and both are the point:
//
//  - every element's **name** lands in the initial HTML, so `i18n.spec.ts` and
//    `latin-leakage.spec.ts` keep working and the page stays static;
//  - **no dictionary of 118 names ships to the client**, which is what a fully
//    client-side widget would have needed.
//
// The payload is 118 rows of short fields — a few kilobytes over the wire.

import { ELEMENTS_REGISTRY } from '@/core-engine/data/elements';
import { PERIODIC_TABLE } from '@/core-engine/data/periodic-table';
import type { PeriodicTableEntry } from '@/core-engine/types/chemistry';
import { elementName } from '@/i18n/chemistry-names';
import { formattingLocale, type Locale } from '@/i18n/config';

/**
 * One element, ready to render: the teaching data plus the two fields that
 * depend on the reader's language.
 */
export interface PeriodicTableCell extends PeriodicTableEntry {
  /** Localised. Sodium is «Натрий» in Russian and *Natrium* in German. */
  name: string;
  /**
   * The relative atomic mass, already formatted for the locale. Russian writes
   * `35,45`, not `35.45` — so this is a string and never a raw JS number
   * interpolated into JSX. src/i18n/number-format.test.ts is the standing
   * reminder of what happens when a number goes out unformatted.
   */
  mass: string;
  /** Picometres, from the registry. The *Atomic size* mode's quantity. */
  atomicRadius: number;
}

const MASS_BY_ATOMIC_NUMBER = new Map(
  ELEMENTS_REGISTRY.map((element) => [element.atomicNumber, element.mass])
);

const SYMBOL_BY_ATOMIC_NUMBER = new Map(
  ELEMENTS_REGISTRY.map((element) => [element.atomicNumber, element.symbol])
);

const RADIUS_BY_ATOMIC_NUMBER = new Map(
  ELEMENTS_REGISTRY.map((element) => [element.atomicNumber, element.atomicRadius ?? 0])
);

/** All 118 cells, localised. Called once per page render on the server. */
export function periodicTableCells(locale: Locale): PeriodicTableCell[] {
  const massFormat = new Intl.NumberFormat(formattingLocale(locale), {
    maximumFractionDigits: 4,
  });

  return PERIODIC_TABLE.map((entry) => ({
    ...entry,
    name: elementName(locale, SYMBOL_BY_ATOMIC_NUMBER.get(entry.atomicNumber) ?? entry.symbol),
    mass: massFormat.format(MASS_BY_ATOMIC_NUMBER.get(entry.atomicNumber) ?? 0),
    atomicRadius: RADIUS_BY_ATOMIC_NUMBER.get(entry.atomicNumber) ?? 0,
  }));
}

/**
 * The element the widget opens on, and the one the detail panel shows when
 * there is no JavaScript to change it.
 *
 * Sodium, because it is the arrangement the sheet's prose states in words —
 * 2, 8, 1 — so a reader who cannot click still sees the page's own example
 * worked out in the panel.
 */
export const DEFAULT_SELECTED = 11;
