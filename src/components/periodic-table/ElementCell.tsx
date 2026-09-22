'use client';

// One element, as one <td>'s button.
//
// The accessible name is the whole point of this file. A cell's visible
// content is two letters of Latin and three numbers; docs/ACCESSIBILITY.md §3
// requires a control whose only content is notation to carry the name of the
// thing — "Sodium, symbol Na, atomic number 11, group 1, period 3". So the
// button gets an `aria-label` and the visible text stays visible.

import { useI18n } from '@/i18n/client';
import type { CellBadge, Tone } from './view-modes';
import type { PeriodicTableCell } from './cells';

export interface ElementCellProps {
  cell: PeriodicTableCell;
  tone: Tone;
  badge: CellBadge;
  /** The one cell in the table with `tabIndex={0}` — see D7. */
  isFocusTarget: boolean;
  isSelected: boolean;
  /** The localised family name, for the f-block cells that have no group. */
  familyLabel: string;
  /** 44px targets on a touch device, 40px on a pointer one. Both clear 24px. */
  touch: boolean;
  onSelect: (atomicNumber: number) => void;
  registerRef: (atomicNumber: number, node: HTMLButtonElement | null) => void;
}

export function ElementCell({
  cell,
  tone,
  badge,
  isFocusTarget,
  isSelected,
  familyLabel,
  touch,
  onSelect,
  registerRef,
}: ElementCellProps) {
  const { t, f } = useI18n();

  const label =
    cell.group === null
      ? f(t.periodicTable.cellA11yFBlock, {
          name: cell.name,
          symbol: cell.symbol,
          n: cell.atomicNumber,
          family: familyLabel,
          period: cell.period,
        })
      : f(t.periodicTable.cellA11y, {
          name: cell.name,
          symbol: cell.symbol,
          n: cell.atomicNumber,
          group: cell.group,
          period: cell.period,
        });

  const badgeText = 'text' in badge ? badge.text : t.periodicTable.badge[badge.labelKey];

  return (
    <button
      type="button"
      ref={(node) => registerRef(cell.atomicNumber, node)}
      data-testid="element-cell"
      data-symbol={cell.symbol}
      data-atomic-number={cell.atomicNumber}
      aria-label={label}
      aria-pressed={isSelected}
      tabIndex={isFocusTarget ? 0 : -1}
      onClick={() => onSelect(cell.atomicNumber)}
      style={{ background: `var(--pt-tone-${tone})` }}
      className={[
        'flex w-full flex-col items-center justify-center gap-0 rounded-[3px] border px-0.5 py-1',
        'leading-none text-(--foreground) transition-none',
        touch ? 'min-h-11 min-w-11' : 'min-h-10 min-w-10',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--link)',
        isSelected
          ? 'border-(--foreground) ring-2 ring-(--link) ring-offset-0'
          : 'border-(--border)',
      ].join(' ')}
    >
      <span aria-hidden="true" className="text-[8px] font-bold text-(--foreground)/80">
        {cell.atomicNumber}
      </span>
      <span aria-hidden="true" className="text-[13px] font-black tracking-tight">
        {cell.symbol}
      </span>
      <span aria-hidden="true" className="text-[7px] tabular-nums text-(--foreground)/80">
        {cell.mass}
      </span>
      {/*
        The text carrier. Every mode prints one in every cell — it is the
        reason a mode is legible to a reader who cannot tell the tones apart,
        and view-modes.test.ts asserts all 118 of them are non-empty in all
        seven modes. Hidden from the accessible name because the label above
        already says what this cell is; the legend says what the badge means.
      */}
      <span
        aria-hidden="true"
        className="mt-0.5 min-h-[9px] text-[9px] font-black tabular-nums"
      >
        {badgeText}
      </span>
    </button>
  );
}
