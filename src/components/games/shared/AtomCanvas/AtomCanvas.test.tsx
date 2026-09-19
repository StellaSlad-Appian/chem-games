/**
 * The shared atom canvas in isolation: every dot is a named button, pairing
 * works by tap-tap and by keyboard, wrong dots are rejected with a reason,
 * and the inspect / count modes expose atoms, bonds and lone pairs as
 * pressable controls.
 */
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '@/test-utils/render';
import { getLewisMolecule } from '@/core-engine/data/lewis-molecules';
import { createCompleteStructure, createStructure, getElementName, pairAtoms } from '@/core-engine/utils/lewis-utils';
import type { LewisStructure } from '@/core-engine/types/chemistry';
import AtomCanvas, { type AtomCanvasLabels, type AtomCanvasProps } from './AtomCanvas';

const labels: AtomCanvasLabels = {
  elementName: (symbol) => getElementName(symbol),
  atomName: (name, count, full) => `${name}: ${count} of ${full}`,
  counter: (symbol, count, full) => `${symbol}: ${count} of ${full}`,
  loner: (name, i, n) => `${name}, unpaired electron ${i} of ${n}`,
  lonePair: (name, i, n) => `${name}, lone pair ${i} of ${n}`,
  lonerLabel: 'unpaired electron',
  bondName: (a, b, order) => `${order === 2 ? 'Double' : 'Single'} bond between ${a.toLowerCase()} and ${b.toLowerCase()}`,
  bondUndo: 'press to undo',
  bondCount: 'press to count',
  counted: 'counted',
  inspectTap: (name) => `${name} — tap if this atom is wrong`,
};

const water = getLewisMolecule('h2o');

function renderCanvas(structure: LewisStructure, props: Partial<AtomCanvasProps> = {}) {
  const handlers = {
    onPair: vi.fn(),
    onReject: vi.fn(),
    onUnpair: vi.fn(),
    onSelectLoner: vi.fn(),
    onAtomTap: vi.fn(),
    onToggleBond: vi.fn(),
    onToggleLonePair: vi.fn(),
  };
  renderWithProviders(
    <AtomCanvas structure={structure} mode="build" label="Dot structure of water" labels={labels} {...handlers} {...props} />
  );
  return handlers;
}

const loner = (name: string, i: number, n: number) =>
  screen.getByRole('button', { name: `${name}, unpaired electron ${i} of ${n}` });

describe('AtomCanvas (build mode)', () => {
  it('names every atom, loner and lone pair, and shows the text counters', () => {
    renderCanvas(createStructure(water));
    expect(screen.getByRole('group', { name: 'Dot structure of water' })).toBeInTheDocument();
    expect(screen.getByRole('group', { name: 'Oxygen: 6 of 8' })).toBeInTheDocument();
    expect(screen.getAllByRole('group', { name: 'Hydrogen: 1 of 2' })).toHaveLength(2);
    expect(loner('Oxygen', 1, 2)).toBeInTheDocument();
    expect(loner('Oxygen', 2, 2)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Oxygen, lone pair 1 of 2' })).toHaveAttribute('tabindex', '-1');
    expect(screen.getByText('O: 6 of 8')).toBeInTheDocument();
    expect(screen.getAllByText('H: 1 of 2')).toHaveLength(2);
  });

  it('gives each atom exactly one tab stop (its active loner)', () => {
    renderCanvas(createStructure(water));
    expect(loner('Oxygen', 1, 2)).toHaveAttribute('tabindex', '0');
    expect(loner('Oxygen', 2, 2)).toHaveAttribute('tabindex', '-1');
    screen.getAllByRole('button', { name: 'Hydrogen, unpaired electron 1 of 1' }).forEach((b) => expect(b).toHaveAttribute('tabindex', '0'));
  });

  it('pairs by tapping a loner on one atom and then a loner on another', () => {
    const { onPair, onSelectLoner } = renderCanvas(createStructure(water));
    const [h1] = screen.getAllByRole('button', { name: 'Hydrogen, unpaired electron 1 of 1' });
    fireEvent.click(h1);
    expect(onSelectLoner).toHaveBeenCalledWith('a1');
    expect(h1).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(loner('Oxygen', 2, 2));
    expect(onPair).toHaveBeenCalledWith('a1', 'a0');
    expect(onSelectLoner).toHaveBeenLastCalledWith(null);
  });

  it('rejects a second loner on the same atom and any lone-pair dot', () => {
    const { onPair, onReject } = renderCanvas(createStructure(water));
    fireEvent.click(loner('Oxygen', 1, 2));
    fireEvent.click(loner('Oxygen', 2, 2));
    expect(onReject).toHaveBeenCalledWith('sameAtom', 'a0');
    expect(onPair).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Oxygen, lone pair 1 of 2' }));
    expect(onReject).toHaveBeenCalledWith('pairedDot', 'a0');
  });

  it('supports the keyboard map: arrows pick a loner, Enter pairs, Escape cancels', () => {
    const { onPair, onSelectLoner } = renderCanvas(createStructure(water));
    const first = loner('Oxygen', 1, 2);
    first.focus();
    fireEvent.keyDown(first, { key: 'ArrowRight' });
    expect(document.activeElement).toBe(loner('Oxygen', 2, 2));
    expect(loner('Oxygen', 2, 2)).toHaveAttribute('tabindex', '0');
    expect(first).toHaveAttribute('tabindex', '-1');

    // Enter / Space on a button fires click, which starts the pair.
    fireEvent.click(loner('Oxygen', 2, 2));
    expect(onSelectLoner).toHaveBeenCalledWith('a0');
    fireEvent.keyDown(screen.getByRole('group', { name: 'Dot structure of water' }), { key: 'Escape' });
    expect(onSelectLoner).toHaveBeenLastCalledWith(null);
    expect(loner('Oxygen', 2, 2)).toHaveAttribute('aria-pressed', 'false');

    fireEvent.click(loner('Oxygen', 2, 2));
    fireEvent.click(screen.getAllByRole('button', { name: 'Hydrogen, unpaired electron 1 of 1' })[1]);
    expect(onPair).toHaveBeenCalledWith('a0', 'a2');
  });

  it('offers an undo button on every shared pair', () => {
    const paired = pairAtoms(createStructure(water), 'a0', 'a1');
    if (!paired.ok) throw new Error('pair failed');
    const { onUnpair } = renderCanvas(paired.structure);
    const undo = screen.getByRole('button', { name: 'Single bond between oxygen and hydrogen — press to undo' });
    fireEvent.click(undo);
    expect(onUnpair).toHaveBeenCalledWith(paired.bondId);
    expect(screen.getByTestId('bond-line')).toHaveAttribute('data-order', '1');
  });

  it('pulses loners by default and draws them static when asked', () => {
    const { unmount } = renderWithProviders(
      <AtomCanvas structure={createStructure(water)} mode="build" label="c" labels={labels} onPair={vi.fn()} />
    );
    expect(loner('Oxygen', 1, 2).querySelector('.loner-pulse')).not.toBeNull();
    unmount();
    renderWithProviders(
      <AtomCanvas structure={createStructure(water)} mode="build" label="c" labels={labels} onPair={vi.fn()} pulseLoners={false} />
    );
    expect(loner('Oxygen', 1, 2).querySelector('.loner-pulse')).toBeNull();
  });

  // The Level 1 vocabulary scaffold. It is one legend above the board, not a
  // label stamped beside each dot: the dots are 50 px apart and the formal term
  // is 102-134 px wide depending on the language, so a per-dot label could not
  // survive translation. See AtomCanvas.tsx and docs/i18n/README.md.
  it('names the pulsing dot once in a legend, and only when asked', () => {
    const { unmount } = renderWithProviders(
      <AtomCanvas structure={createStructure(water)} mode="build" label="c" labels={labels} onPair={vi.fn()} lonerLabels />
    );
    const legend = screen.getByTestId('unpaired-legend');
    expect(legend).toHaveTextContent('unpaired electron');
    // Exactly one, however many unpaired dots the molecule has.
    expect(screen.getAllByTestId('unpaired-legend')).toHaveLength(1);
    expect(screen.getAllByTestId('loner').length).toBeGreaterThan(1);
    unmount();

    renderCanvas(createStructure(water));
    expect(screen.queryByTestId('unpaired-legend')).not.toBeInTheDocument();
  });

  it('renders nothing interactive when disabled, read-only or compact', () => {
    renderCanvas(createStructure(water), { disabled: true });
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.getAllByTestId('loner')).toHaveLength(4);
  });
});

describe('AtomCanvas (inspect and count modes)', () => {
  it('makes every atom a button in inspect mode and reports taps', () => {
    const { onAtomTap } = renderCanvas(createCompleteStructure(water), { mode: 'inspect', markedAtomId: 'a0' });
    const oxygen = screen.getByRole('button', { name: 'Oxygen: 8 of 8 — Oxygen — tap if this atom is wrong' });
    expect(oxygen).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(screen.getAllByRole('button', { name: /Hydrogen: 2 of 2/ })[0]);
    expect(onAtomTap).toHaveBeenCalledWith('a1');
    expect(screen.queryByRole('button', { name: /unpaired electron/ })).not.toBeInTheDocument();
  });

  it('counts bonds by pressing each shared pair', () => {
    const complete = createCompleteStructure(water);
    const { onToggleBond } = renderCanvas(complete, { mode: 'countBonds', selectedBondIds: [complete.bonds[0].id] });
    const counted = screen.getByRole('button', { name: 'Single bond between oxygen and hydrogen — counted' });
    expect(counted).toHaveAttribute('aria-pressed', 'true');
    const other = screen.getByRole('button', { name: 'Single bond between oxygen and hydrogen — press to count' });
    fireEvent.click(other);
    expect(onToggleBond).toHaveBeenCalledWith(complete.bonds[1].id);
  });

  it('counts lone pairs by pressing each pair and highlights the ones missed', () => {
    const complete = createCompleteStructure(water);
    const { onToggleLonePair } = renderCanvas(complete, {
      mode: 'countLonePairs',
      selectedLonePairs: ['a0:0'],
      highlightLonePairs: ['a0:1'],
    });
    expect(screen.getByRole('button', { name: 'Oxygen, lone pair 1 of 2 — counted' })).toHaveAttribute('aria-pressed', 'true');
    const second = screen.getByRole('button', { name: 'Oxygen, lone pair 2 of 2 — press to count' });
    expect(second).toHaveAttribute('tabindex', '0');
    fireEvent.click(second);
    expect(onToggleLonePair).toHaveBeenCalledWith('a0', 1);
  });
});
