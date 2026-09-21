'use client';

// The panel under the table.
//
// `aria-live="polite"` and **not** a dialog: selecting an element announces the
// new contents without moving focus, so a keyboard reader can arrow across a
// period and hear each element without ever losing their place in the grid
// (docs/ACCESSIBILITY.md §4, and AC-6).
//
// The prev/next buttons step by atomic number. That is the linear path through
// all 118 that arrowing cannot give, because arrowing has to cross the gaps.

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useI18n } from '@/i18n/client';
import { electronArrangement, ionLabel } from '@/core-engine/data/periodic-table';
import type { PeriodicTableCell } from './cells';
import { legendLabel } from './Legend';
import type { LegendKey } from './view-modes';

/** ElementCategory -> the legend row that names that family. */
export const FAMILY_LEGEND_KEY = {
  'alkali-metal': 'alkali-metal',
  'alkaline-earth': 'alkaline-earth',
  'transition-metal': 'transition-metal',
  'post-transition-metal': 'post-transition-metal',
  lanthanide: 'lanthanide',
  actinide: 'actinide',
  metalloid: 'metalloid',
  halogen: 'halogen',
  'noble-gas': 'noble-gas',
  nonmetal: 'other-non-metal',
} as const satisfies Record<PeriodicTableCell['category'], LegendKey>;

const METAL_CLASS_LEGEND_KEY = {
  metal: 'metal',
  'non-metal': 'non-metal',
  metalloid: 'metalloid',
} as const satisfies Record<PeriodicTableCell['metalClass'], LegendKey>;

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-[10px] font-black uppercase tracking-wider text-(--muted)">{label}</dt>
      <dd className="mt-0.5 text-sm font-semibold break-words text-(--foreground)">{value}</dd>
    </div>
  );
}

export function ElementDetail({
  cell,
  onStep,
  hasPrevious,
  hasNext,
}: {
  cell: PeriodicTableCell;
  onStep: (atomicNumber: number) => void;
  hasPrevious: boolean;
  hasNext: boolean;
}) {
  const { t, f } = useI18n();
  const p = t.periodicTable;

  const stepButton =
    'flex h-11 w-11 items-center justify-center rounded-xl border-2 border-(--border) ' +
    'text-(--foreground) transition hover:border-blue-500 disabled:opacity-40 ' +
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500';

  return (
    <section
      aria-labelledby="periodic-table-detail-heading"
      className="mt-4 rounded-2xl border border-(--border) bg-(--background) p-4"
    >
      <div className="flex items-center justify-between gap-3">
        <h4
          id="periodic-table-detail-heading"
          className="text-xs font-black uppercase tracking-wider text-(--muted)"
        >
          {p.detailHeading}
        </h4>
        <div className="flex gap-2">
          <button
            type="button"
            className={stepButton}
            aria-label={p.previous}
            disabled={!hasPrevious}
            onClick={() => onStep(cell.atomicNumber - 1)}
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            className={stepButton}
            aria-label={p.next}
            disabled={!hasNext}
            onClick={() => onStep(cell.atomicNumber + 1)}
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/*
        The live region is the body, not the whole panel: the heading and the
        two buttons never change, and including them would make every step
        re-announce them.
      */}
      <div aria-live="polite" data-testid="element-detail">
        <p className="mt-3 text-xl font-black break-words text-(--foreground)">{cell.name}</p>
        <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3">
          <Field label={p.fields.symbol} value={cell.symbol} />
          <Field label={p.fields.atomicNumber} value={String(cell.atomicNumber)} />
          <Field label={p.fields.mass} value={cell.mass} />
          <Field label={p.fields.arrangement} value={electronArrangement(cell)} />
          <Field
            label={p.fields.group}
            value={cell.group === null ? p.values.fBlockGroup : String(cell.group)}
          />
          <Field label={p.fields.period} value={String(cell.period)} />
          <Field
            label={p.fields.metalClass}
            value={legendLabel(t, f, METAL_CLASS_LEGEND_KEY[cell.metalClass])}
          />
          <Field
            label={p.fields.family}
            value={legendLabel(t, f, FAMILY_LEGEND_KEY[cell.category])}
          />
          <Field
            label={p.fields.ion}
            value={ionLabel(cell.commonIonCharge) ?? p.badge.none}
          />
          <Field
            label={p.fields.occurrence}
            value={
              cell.occurrence === 'natural' ? p.legend.natural : p.legend.synthetic
            }
          />
        </dl>
      </div>
    </section>
  );
}
