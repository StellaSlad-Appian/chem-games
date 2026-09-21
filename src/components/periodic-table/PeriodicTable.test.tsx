// src/components/periodic-table/PeriodicTable.test.tsx
//
// The behaviour §13 asks a component test to pin: the roving tab stop, arrow
// navigation, Enter updating the panel, a mode switch changing the badges and
// the legend, and a cell's accessible name carrying the element's *name* and
// not only its symbol.
//
// Rendered in English by default and once in Russian, because the two things
// most likely to regress quietly are both locale-dependent: the name in the
// accessible label, and the decimal comma in the mass.

import { describe, expect, it } from 'vitest';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, TestProviders } from '@/test-utils/render';
import { render } from '@testing-library/react';
import { PeriodicTable } from './PeriodicTable';
import { periodicTableCells } from './cells';
import { YEAR_9_MODES, YEAR_10_MODES } from './view-modes';
import { en } from '@/i18n/dictionaries/en';
import { ru } from '@/i18n/dictionaries/ru';

const CELLS = periodicTableCells('en');

const renderTable = (modes = YEAR_9_MODES) =>
  renderWithProviders(<PeriodicTable cells={CELLS} modes={modes} />);

const cellFor = (symbol: string): HTMLButtonElement =>
  document.querySelector(`[data-symbol="${symbol}"]`) as HTMLButtonElement;

describe('PeriodicTable — the table', () => {
  it('renders all 118 elements as buttons inside one table', () => {
    renderTable();
    expect(screen.getAllByTestId('element-cell')).toHaveLength(118);
    expect(screen.getAllByRole('table')).toHaveLength(1);
  });

  it('gives the table a caption, group headers and period headers', () => {
    renderTable();
    expect(screen.getByRole('table', { name: en.periodicTable.caption })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Group 17' })).toBeInTheDocument();
    expect(screen.getByRole('rowheader', { name: 'Period 3' })).toBeInTheDocument();
  });

  it('leaves an empty cell at each of the table’s gaps', () => {
    renderTable();
    // Period 1 has hydrogen in group 1 and helium in group 18 — sixteen gaps
    // between them, plus the row header, makes 19 cells in that row.
    const row = screen.getAllByRole('row')[1];
    expect(within(row).getAllByTestId('element-cell')).toHaveLength(2);
    expect(row.querySelectorAll('td')).toHaveLength(18);
  });

  it('shows symbol, atomic number and relative atomic mass in every cell', () => {
    renderTable();
    const sodium = cellFor('Na');
    expect(sodium).toHaveTextContent('Na');
    expect(sodium).toHaveTextContent('11');
    expect(sodium).toHaveTextContent('22.99');
  });

  it('names a cell by the element, not only by the symbol', () => {
    // AC-5. Two letters of Latin is notation, and docs/ACCESSIBILITY.md §3
    // says a control whose only content is notation carries the name too.
    renderTable();
    expect(cellFor('Na')).toHaveAccessibleName(
      'Sodium, symbol Na, atomic number 11, group 1, period 3'
    );
  });

  it('names an f-block cell by its family, since it has no group', () => {
    renderTable();
    expect(cellFor('U')).toHaveAccessibleName(
      'Uranium, symbol U, atomic number 92, Actinide, period 7'
    );
  });
});

describe('PeriodicTable — keyboard', () => {
  it('has exactly one tab stop, wherever the focus has moved to', async () => {
    const user = userEvent.setup({ delay: null });
    renderTable();
    const tabbable = () =>
      screen.getAllByTestId('element-cell').filter((cell) => cell.tabIndex === 0);

    expect(tabbable()).toHaveLength(1);
    expect(tabbable()[0]).toBe(cellFor('Na'));

    cellFor('Na').focus();
    await user.keyboard('{ArrowRight}');
    expect(tabbable()).toHaveLength(1);
    expect(tabbable()[0]).toBe(cellFor('Mg'));
  });

  it('moves between neighbours with the arrow keys and skips the gaps', async () => {
    const user = userEvent.setup({ delay: null });
    renderTable();

    cellFor('Na').focus();
    await user.keyboard('{ArrowUp}');
    expect(cellFor('Li')).toHaveFocus();

    await user.keyboard('{ArrowRight}');
    // Beryllium is next along period 2; the gap between it and boron is not a
    // place the focus may land.
    expect(cellFor('Be')).toHaveFocus();
    await user.keyboard('{ArrowRight}');
    expect(cellFor('B')).toHaveFocus();
  });

  it('stays put at the edges rather than wrapping', async () => {
    const user = userEvent.setup({ delay: null });
    renderTable();
    cellFor('H').focus();
    await user.keyboard('{ArrowLeft}');
    expect(cellFor('H')).toHaveFocus();
    await user.keyboard('{ArrowUp}');
    expect(cellFor('H')).toHaveFocus();
  });

  it('runs Home and End along a period', async () => {
    const user = userEvent.setup({ delay: null });
    renderTable();
    cellFor('S').focus();
    await user.keyboard('{Home}');
    expect(cellFor('Na')).toHaveFocus();
    await user.keyboard('{End}');
    expect(cellFor('Ar')).toHaveFocus();
  });

  it('runs Page Up and Page Down along a group', async () => {
    const user = userEvent.setup({ delay: null });
    renderTable();
    cellFor('Na').focus();
    await user.keyboard('{PageDown}');
    expect(cellFor('Fr')).toHaveFocus();
    await user.keyboard('{PageUp}');
    expect(cellFor('H')).toHaveFocus();
  });

  it('updates the detail panel on Enter, without moving focus off the cell', async () => {
    const user = userEvent.setup({ delay: null });
    renderTable();

    cellFor('Na').focus();
    await user.keyboard('{ArrowUp}{Enter}');

    const panel = screen.getByTestId('element-detail');
    expect(within(panel).getByText('Lithium')).toBeInTheDocument();
    expect(within(panel).getByText('2, 1')).toBeInTheDocument();
    expect(cellFor('Li')).toHaveFocus();
  });

  it('selects on Space as well as Enter', async () => {
    const user = userEvent.setup({ delay: null });
    renderTable();
    cellFor('Cl').focus();
    await user.keyboard(' ');
    expect(within(screen.getByTestId('element-detail')).getByText('Chlorine')).toBeInTheDocument();
  });
});

describe('PeriodicTable — the detail panel', () => {
  it('opens on sodium and announces politely without being a dialog', () => {
    renderTable();
    const panel = screen.getByTestId('element-detail');
    expect(panel).toHaveAttribute('aria-live', 'polite');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(within(panel).getByText('Sodium')).toBeInTheDocument();
    expect(within(panel).getByText('2, 8, 1')).toBeInTheDocument();
  });

  it('shows every field AC-3 lists', () => {
    renderTable();
    const panel = screen.getByTestId('element-detail');
    for (const label of Object.values(en.periodicTable.fields)) {
      expect(within(panel).getByText(label)).toBeInTheDocument();
    }
    expect(within(panel).getByText('Alkali metal')).toBeInTheDocument();
    expect(within(panel).getByText('1+')).toBeInTheDocument();
    expect(within(panel).getByText('Found in nature')).toBeInTheDocument();
  });

  it('steps by atomic number, which is the path arrowing cannot give', async () => {
    const user = userEvent.setup({ delay: null });
    renderTable();
    await user.click(screen.getByRole('button', { name: en.periodicTable.next }));
    expect(
      within(screen.getByTestId('element-detail')).getByText('Magnesium')
    ).toBeInTheDocument();
  });

  it('disables the step buttons at the ends of the range', async () => {
    const user = userEvent.setup({ delay: null });
    renderTable();
    await user.click(cellFor('H'));
    expect(screen.getByRole('button', { name: en.periodicTable.previous })).toBeDisabled();
    await user.click(cellFor('Og'));
    expect(screen.getByRole('button', { name: en.periodicTable.next })).toBeDisabled();
  });

  it('says a d-block element forms no single ion rather than inventing one', async () => {
    const user = userEvent.setup({ delay: null });
    renderTable();
    await user.click(cellFor('Fe'));
    const panel = screen.getByTestId('element-detail');
    expect(within(panel).getByText('2, 8, 14, 2')).toBeInTheDocument();
    expect(within(panel).getByText(en.periodicTable.badge.none)).toBeInTheDocument();
  });
});

describe('PeriodicTable — view modes', () => {
  it('starts in the first mode the sheet unlocks', () => {
    renderTable();
    expect(
      screen.getByRole('button', { name: en.periodicTable.modes.metals })
    ).toHaveAttribute('aria-pressed', 'true');
  });

  it('changes the badges and the legend when the mode changes', async () => {
    const user = userEvent.setup({ delay: null });
    renderTable();
    const legend = () => screen.getByTestId('periodic-table-legend');

    expect(cellFor('Na')).toHaveTextContent(en.periodicTable.badge.metal);
    expect(within(legend()).getByText(en.periodicTable.legend.metal)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: en.periodicTable.modes.outerShell }));

    expect(cellFor('Na')).toHaveTextContent('1');
    expect(within(legend()).getByText('Electrons in the outer shell: 1')).toBeInTheDocument();
    expect(
      within(legend()).queryByText(en.periodicTable.legend.metal)
    ).not.toBeInTheDocument();
  });

  it('renders a legend whose rows match the mode', async () => {
    // Deliberately two modes, not six. Re-rendering 118 cells under jsdom is
    // about a second a switch, and the exhaustive version of this assertion
    // costs nothing where it belongs: view-modes.test.ts checks the rows of
    // all seven modes without rendering anything, and the e2e spec walks all
    // six in a real browser.
    const user = userEvent.setup({ delay: null });
    renderTable();
    const legend = () => screen.getByTestId('periodic-table-legend');

    expect(within(legend()).getAllByRole('listitem')).toHaveLength(3);

    await user.click(screen.getByRole('button', { name: en.periodicTable.modes.families }));
    expect(within(legend()).getAllByRole('listitem')).toHaveLength(10);
  });

  it('offers only the two modes the Year 10 sheet unlocks', () => {
    renderWithProviders(
      <PeriodicTable cells={CELLS} modes={YEAR_10_MODES} fullTableHref="/cheat-sheets/atomic-structure" />
    );
    expect(
      screen.getByRole('button', { name: en.periodicTable.modes.occurrence })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: en.periodicTable.modes.families })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: en.periodicTable.fullTableLink })
    ).toHaveAttribute('href', '/en/cheat-sheets/atomic-structure');
  });
});

describe('PeriodicTable — Russian', () => {
  it('names cells in Cyrillic and writes the mass with a decimal comma', () => {
    render(<PeriodicTable cells={periodicTableCells('ru')} modes={YEAR_9_MODES} />, {
      wrapper: ({ children }) => (
        <TestProviders locale="ru" dictionary={ru}>
          {children}
        </TestProviders>
      ),
    });

    // AC-28: `35,45`, not `35.45`. The mass is formatted on the server and
    // arrives as a string, so nothing here can un-format it.
    expect(cellFor('Cl')).toHaveTextContent('35,45');
    expect(cellFor('Na').getAttribute('aria-label')).toContain('Натрий');
    // The symbol stays Latin, which is what Russian chemistry does.
    expect(cellFor('Na')).toHaveTextContent('Na');
  });
});
