// src/components/periodic-table/PeriodicTableWidget.tsx
//
// The server half of the widget: the thing `WIDGET_REGISTRY` maps a name to.
//
// No `'use client'`. It runs on the server, builds the 118 localised rows and
// hands them to the island — which is the whole of D2 in one file. Keeping it
// separate from `PeriodicTable.tsx` is what lets the island stay a client
// component while `elementName()` and `Intl` stay on the server.

import { PeriodicTable } from './PeriodicTable';
import { periodicTableCells } from './cells';
import { YEAR_9_MODES, YEAR_10_MODES } from './view-modes';
import type { Locale } from '@/i18n/config';

export interface PeriodicTableWidgetProps {
  locale: Locale;
}

/** The Year 9 sheet: all six modes, no link out. */
export function PeriodicTableWidget({ locale }: PeriodicTableWidgetProps) {
  return <PeriodicTable cells={periodicTableCells(locale)} modes={YEAR_9_MODES} />;
}

/**
 * The Year 10 sheet: the same component gated to *natural or made* plus
 * metals, with a link back to the sheet that teaches the rest of the table.
 */
export function PeriodicTableOccurrenceWidget({ locale }: PeriodicTableWidgetProps) {
  return (
    <PeriodicTable
      cells={periodicTableCells(locale)}
      modes={YEAR_10_MODES}
      fullTableHref="/cheat-sheets/atomic-structure"
    />
  );
}
