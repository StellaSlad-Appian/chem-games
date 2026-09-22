// src/components/periodic-table/layout.ts
//
// The shape of the table, as a grid of atomic numbers and holes.
//
// Nine rows of eighteen: the seven periods, then the two f-block rows drawn
// underneath. A `null` is a gap, and the gaps are content — the shape of the
// table is part of what it teaches, which is why D1 rejects laying this out
// with `display: grid` and an empty `<td>` is an honest gap rather than a
// missing one.
//
// Keyboard navigation reads the same grid, so "the cell to the left" and "the
// cell above" mean the same thing to the eye and to the arrow keys.

import type { PeriodicTableEntry } from '@/core-engine/types/chemistry';

export const GROUP_COUNT = 18;

/** One drawn row: the seven periods, then the lanthanides and the actinides. */
export interface TableRow {
  /** The period this row belongs to. Both f-block rows keep their period. */
  period: number;
  /** `'main'` for the seven periods; the two f-block rows name their family. */
  kind: 'main' | 'lanthanide' | 'actinide';
  /** Eighteen slots. `null` is a gap in the table. */
  cells: (number | null)[];
}

/**
 * Where the f-block rows start, counting from 1.
 *
 * Column 3 is the slot the two rows are lifted out of — every published table
 * draws them starting under group 3, and drawing them anywhere else would make
 * the pull-out arbitrary.
 */
const F_BLOCK_OFFSET = 2;

/** The nine rows, built from the data rather than hard-coded. */
export function buildRows(entries: readonly PeriodicTableEntry[]): TableRow[] {
  const rows: TableRow[] = [];

  for (const period of [1, 2, 3, 4, 5, 6, 7]) {
    const cells: (number | null)[] = Array.from({ length: GROUP_COUNT }, () => null);
    for (const entry of entries) {
      if (entry.period !== period || entry.group === null) continue;
      cells[entry.group - 1] = entry.atomicNumber;
    }
    rows.push({ period, kind: 'main', cells });
  }

  for (const [period, kind] of [
    [6, 'lanthanide'],
    [7, 'actinide'],
  ] as const) {
    const row = entries
      .filter((entry) => entry.block === 'f' && entry.period === period)
      .sort((a, b) => a.atomicNumber - b.atomicNumber)
      .map((entry) => entry.atomicNumber);
    const cells: (number | null)[] = Array.from({ length: GROUP_COUNT }, () => null);
    row.forEach((atomicNumber, index) => {
      cells[F_BLOCK_OFFSET + index] = atomicNumber;
    });
    rows.push({ period, kind, cells });
  }

  return rows;
}

/** Where an element sits in the grid, or `undefined` if it is not drawn. */
export function findPosition(
  rows: readonly TableRow[],
  atomicNumber: number
): { row: number; column: number } | undefined {
  for (let row = 0; row < rows.length; row++) {
    const column = rows[row].cells.indexOf(atomicNumber);
    if (column !== -1) return { row, column };
  }
  return undefined;
}

export type NavKey =
  | 'ArrowLeft'
  | 'ArrowRight'
  | 'ArrowUp'
  | 'ArrowDown'
  | 'Home'
  | 'End'
  | 'PageUp'
  | 'PageDown';

/**
 * The element a navigation key moves to, or `undefined` to stay put.
 *
 * Gaps are skipped rather than landed on: arrowing left from boron reaches
 * beryllium, which is what the eye does. Nothing wraps — running off the end of
 * a period and reappearing at the start of the next one is disorientating when
 * you cannot see the table, and the detail panel's prev/next buttons already
 * give a linear path through all 118.
 */
export function navigate(
  rows: readonly TableRow[],
  from: number,
  key: NavKey
): number | undefined {
  const at = findPosition(rows, from);
  if (!at) return undefined;

  const inRow = (rowIndex: number) =>
    rows[rowIndex].cells.flatMap((cell, column) => (cell === null ? [] : [{ cell, column }]));
  const inColumn = (column: number) =>
    rows.flatMap((row, rowIndex) =>
      row.cells[column] === null ? [] : [{ cell: row.cells[column]!, row: rowIndex }]
    );

  switch (key) {
    case 'ArrowLeft': {
      const candidates = inRow(at.row).filter((entry) => entry.column < at.column);
      return candidates.at(-1)?.cell;
    }
    case 'ArrowRight': {
      return inRow(at.row).find((entry) => entry.column > at.column)?.cell;
    }
    case 'Home': {
      return inRow(at.row).at(0)?.cell;
    }
    case 'End': {
      return inRow(at.row).at(-1)?.cell;
    }
    case 'ArrowUp': {
      const candidates = inColumn(at.column).filter((entry) => entry.row < at.row);
      return candidates.at(-1)?.cell;
    }
    case 'ArrowDown': {
      return inColumn(at.column).find((entry) => entry.row > at.row)?.cell;
    }
    case 'PageUp': {
      return inColumn(at.column).at(0)?.cell;
    }
    case 'PageDown': {
      return inColumn(at.column).at(-1)?.cell;
    }
  }
}

const NAV_KEYS = new Set<string>([
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'ArrowDown',
  'Home',
  'End',
  'PageUp',
  'PageDown',
]);

export const isNavKey = (key: string): key is NavKey => NAV_KEYS.has(key);
