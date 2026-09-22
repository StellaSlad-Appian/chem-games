'use client';

// The interactive periodic table.
//
// **A real `<table>` (D1).** One `<tr>` per period, eighteen `<td>` each, an
// empty `<td>` at every gap, `<th scope="col">` group numbers, `<th scope="row">`
// period numbers and a `<caption>`. There is deliberately no `display: grid`
// anywhere near it: overriding `display` on a table element drops table
// semantics from the accessibility tree in Chromium and WebKit, and
// `table-layout: fixed` over eighteen equal columns lays it out identically
// with nothing overridden. The gaps are content — the shape of the table is
// part of what it teaches — so an empty `<td>` is an honest gap.
//
// **A thin island (D2).** The server built the localised rows; this component
// owns exactly two pieces of state, `selected` and `viewMode`, plus the roving
// focus target. With JavaScript disabled the table still renders in full with
// symbol, atomic number and relative atomic mass in every cell, and the detail
// panel shows sodium. Clicking does nothing. That is strictly more than the
// twenty-row list it replaced, and it is a stated degradation rather than a
// bug.
//
// **One tab stop (D7).** Exactly one cell carries `tabIndex={0}`; the rest are
// `-1`. 118 tab stops before the next paragraph is a keyboard trap in all but
// name.
//
// **The grid scrolls, the page does not (D8).** Eighteen columns at the 24px
// minimum target size is 432px, wider than a 320px viewport, so the grid gets
// its own `overflow-x-auto` region. WCAG 1.4.10 exempts content that needs a
// two-dimensional layout, and the exemption covers the grid, not the page.

import { useCallback, useId, useMemo, useRef, useState } from 'react';
import { useI18n } from '@/i18n/client';
import { useInputMethod } from '@/hooks/useInputMethod';
import { LocaleLink } from '@/components/layout/LocaleLink';
import { ElementCell } from './ElementCell';
import { ElementDetail, FAMILY_LEGEND_KEY } from './ElementDetail';
import { Legend, legendLabel } from './Legend';
import { ViewModeSwitch } from './ViewModeSwitch';
import { GROUP_COUNT, buildRows, isNavKey, navigate } from './layout';
import { describeCell, type ViewMode } from './view-modes';
import { DEFAULT_SELECTED, type PeriodicTableCell } from './cells';

export interface PeriodicTableProps {
  /** All 118, localised, built on the server. */
  cells: PeriodicTableCell[];
  /** Which modes this sheet unlocks. The Year 10 sheet passes two. */
  modes: readonly ViewMode[];
  /** Shown under the table when the widget is gated. */
  fullTableHref?: string;
}

export function PeriodicTable({ cells, modes, fullTableHref }: PeriodicTableProps) {
  const { t, f } = useI18n();
  const touch = useInputMethod() === 'touch';
  const hintId = useId();

  const [viewMode, setViewMode] = useState<ViewMode>(modes[0]);
  const [selected, setSelected] = useState(DEFAULT_SELECTED);
  const [focusTarget, setFocusTarget] = useState(DEFAULT_SELECTED);

  const byAtomicNumber = useMemo(
    () => new Map(cells.map((cell) => [cell.atomicNumber, cell])),
    [cells]
  );
  const rows = useMemo(() => buildRows(cells), [cells]);

  const buttons = useRef(new Map<number, HTMLButtonElement>());
  const registerRef = useCallback((atomicNumber: number, node: HTMLButtonElement | null) => {
    if (node) buttons.current.set(atomicNumber, node);
    else buttons.current.delete(atomicNumber);
  }, []);

  /**
   * Moves the roving focus. Focus is applied imperatively because the roving
   * pattern *is* imperative: React re-renders the new `tabIndex`, but only
   * `.focus()` moves the caret, and doing it in an effect would fire on mount
   * and steal focus from the top of the page.
   */
  const moveFocus = useCallback((atomicNumber: number) => {
    setFocusTarget(atomicNumber);
    buttons.current.get(atomicNumber)?.focus();
  }, []);

  /**
   * Keeps the roving target on whatever actually has focus.
   *
   * The roving pattern normally guarantees this on its own — only one cell is
   * tabbable, so only one cell can be reached. It does not guarantee it when
   * focus arrives by some other route: a screen reader's virtual cursor
   * activating a cell, the browser's find-on-page, or a `.focus()` from a
   * test. Without this, the next arrow key would move relative to a cell the
   * reader is not on, which is the sort of bug that only shows up for the
   * people who cannot see where the focus went.
   */
  const onFocusCapture = (event: React.FocusEvent<HTMLTableSectionElement>) => {
    const target = (event.target as HTMLElement).closest<HTMLElement>('[data-atomic-number]');
    const atomicNumber = Number(target?.dataset.atomicNumber);
    if (atomicNumber && atomicNumber !== focusTarget) setFocusTarget(atomicNumber);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLTableSectionElement>, from: number) => {
    if (!isNavKey(event.key)) return;
    const next = navigate(rows, from, event.key);
    if (next === undefined) {
      // Still swallow the key: Page Up at the top of a group must not scroll
      // the page out from under a reader who is inside the grid.
      event.preventDefault();
      return;
    }
    event.preventDefault();
    moveFocus(next);
  };

  const selectedCell = byAtomicNumber.get(selected) ?? cells[0];

  const step = useCallback(
    (atomicNumber: number) => {
      if (!byAtomicNumber.has(atomicNumber)) return;
      setSelected(atomicNumber);
      moveFocus(atomicNumber);
    },
    [byAtomicNumber, moveFocus]
  );

  const select = useCallback((atomicNumber: number) => {
    setSelected(atomicNumber);
    setFocusTarget(atomicNumber);
  }, []);

  return (
    <div className="mt-4">
      <ViewModeSwitch modes={modes} active={viewMode} onChange={setViewMode} />

      <p id={hintId} className="mt-4 text-xs text-(--muted)">
        {t.periodicTable.scrollHint} {t.periodicTable.keyboardHint}
      </p>

      {/*
        The scroll region is scoped to the grid and nothing else, which is what
        keeps the page itself from scrolling sideways at 320px. `min-w-0` on
        the wrapper is load-bearing for the same reason it is in the page
        header: without it a block whose content is 900px wide can still push
        its ancestors open.
      */}
      <div className="mt-2 min-w-0 overflow-x-auto rounded-2xl border border-(--border) bg-(--surface) p-2">
        <table
          aria-describedby={hintId}
          className="w-max table-fixed border-separate border-spacing-[2px]"
        >
          <caption className="sr-only">{t.periodicTable.caption}</caption>
          <thead>
            <tr>
              {/* The corner. Not a header of anything, so not a <th>. */}
              <td />
              {Array.from({ length: GROUP_COUNT }, (_, index) => index + 1).map((group) => (
                <th
                  key={group}
                  scope="col"
                  aria-label={f(t.periodicTable.groupHeaderA11y, { group })}
                  className="pb-1 text-center text-[9px] font-bold text-(--muted)"
                >
                  {group}
                </th>
              ))}
            </tr>
          </thead>
          <tbody
            onFocusCapture={onFocusCapture}
            onKeyDown={(event) => onKeyDown(event, focusTarget)}
          >
            {rows.map((row) => {
              /*
               * §6 D1 asks for a spacer row above the f-block. It gets a gap
               * instead, as top padding on the lanthanide row's cells. A
               * literal `<tr>` of empty `<td>`s is a row in the accessibility
               * tree, and a screen reader walking the table down a column would
               * meet it and announce it — an empty row that exists for the
               * sighted layout is exactly the kind of thing D1 chose a real
               * `<table>` to avoid. The gap is the same size either way.
               */
              const gap = row.kind === 'lanthanide' ? 'pt-4' : '';
              const rowLabel =
                row.kind === 'main'
                  ? f(t.periodicTable.periodHeaderA11y, { period: row.period })
                  : legendLabel(t, f, row.kind);
              return (
                <tr key={`${row.kind}-${row.period}`}>
                  <th
                    scope="row"
                    aria-label={rowLabel}
                    className={`pr-1 text-right text-[9px] font-bold text-(--muted) ${gap}`}
                  >
                    {/*
                      The two f-block rows are not a period of their own, so
                      numbering them 6 and 7 a second time would be a lie about
                      the shape of the table. They carry their family's badge,
                      and the row header's accessible name is the family's full
                      name — which is also what a cell in those rows says in
                      place of a group.
                    */}
                    {row.kind === 'main'
                      ? row.period
                      : t.periodicTable.badge[
                          row.kind === 'lanthanide' ? 'lanthanide' : 'actinide'
                        ]}
                  </th>
                  {row.cells.map((atomicNumber, column) => {
                    if (atomicNumber === null) return <td key={column} className={gap} />;
                    const cell = byAtomicNumber.get(atomicNumber);
                    if (!cell) return <td key={column} className={gap} />;
                    const view = describeCell(cell, viewMode);
                    return (
                      <td key={column} className={`p-0 align-top ${gap}`}>
                        <ElementCell
                          cell={cell}
                          tone={view.tone}
                          badge={view.badge}
                          isFocusTarget={atomicNumber === focusTarget}
                          isSelected={atomicNumber === selected}
                          familyLabel={legendLabel(t, f, FAMILY_LEGEND_KEY[cell.category])}
                          touch={touch}
                          onSelect={select}
                          registerRef={registerRef}
                        />
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Legend mode={viewMode} />

      <ElementDetail
        cell={selectedCell}
        onStep={step}
        hasPrevious={byAtomicNumber.has(selectedCell.atomicNumber - 1)}
        hasNext={byAtomicNumber.has(selectedCell.atomicNumber + 1)}
      />

      {fullTableHref && (
        <p className="mt-3 text-sm">
          <LocaleLink
            href={fullTableHref}
            className="font-bold text-blue-500 underline underline-offset-2 hover:text-blue-600"
          >
            {t.periodicTable.fullTableLink}
          </LocaleLink>
        </p>
      )}
    </div>
  );
}

export default PeriodicTable;
