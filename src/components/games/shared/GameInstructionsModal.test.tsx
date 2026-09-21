/**
 * The shared "How to Play" modal, and the rule that decides which set of
 * instructions a player sees.
 *
 * The compact copy is not a nicety: the full instructions run to about forty
 * lines, which on a phone is several screens of scrolling before the first
 * tap. What matters here is that exactly one version renders — hiding the
 * other with CSS would leave a screen reader to read both.
 */
import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import GameInstructionsModal from './GameInstructionsModal';
import CompactInstructions from './CompactInstructions';
import { renderWithProviders } from '@/test-utils/render';

/** Pretends the viewport matches (or does not match) the compact query. */
function mockViewport(isCompact: boolean) {
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockImplementation((query: string) => ({
      matches: isCompact && query.includes('max-width'),
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
      onchange: null,
    }))
  );
}

afterEach(() => vi.unstubAllGlobals());

const open = (compact?: React.ReactNode) =>
  renderWithProviders(
    <GameInstructionsModal isOpen onClose={() => {}} title="How to Play: Test" compact={compact}>
      <p>The long instructions, all forty lines of them.</p>
    </GameInstructionsModal>
  );

describe('GameInstructionsModal', () => {
  it('shows the full instructions on a laptop', () => {
    mockViewport(false);
    open(<p>The short ones.</p>);
    expect(screen.getByText(/all forty lines/)).toBeInTheDocument();
    expect(screen.queryByText('The short ones.')).not.toBeInTheDocument();
  });

  it('shows the compact instructions on a phone, and only those', () => {
    mockViewport(true);
    open(<p>The short ones.</p>);
    expect(screen.getByText('The short ones.')).toBeInTheDocument();
    expect(screen.queryByText(/all forty lines/)).not.toBeInTheDocument();
  });

  it('falls back to the full instructions for a game with no compact copy', () => {
    mockViewport(true);
    open(undefined);
    expect(screen.getByText(/all forty lines/)).toBeInTheDocument();
  });

  it('is a labelled dialog that Escape closes', async () => {
    mockViewport(false);
    const onClose = vi.fn();
    renderWithProviders(
      <GameInstructionsModal isOpen onClose={onClose} title="How to Play: Test">
        <p>Body</p>
      </GameInstructionsModal>
    );
    expect(screen.getByRole('dialog', { name: 'How to Play: Test' })).toBeInTheDocument();
    await userEvent.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalled();
  });
});

describe('CompactInstructions', () => {
  const controls = [
    ['Tab', 'moves between cards'],
    ['H', 'hint'],
  ] as const;

  it('shows the lead, the bullets and one control list', () => {
    render(
      <CompactInstructions
        lead="Make the atoms match."
        bullets={['One', 'Two', 'Three']}
        controls={controls}
        controlsLabel="Keyboard & mouse"
        inputMethod="pointer"
      />
    );
    expect(screen.getByText('Make the atoms match.')).toBeInTheDocument();
    expect(screen.getByTestId('compact-bullets').children).toHaveLength(3);
    expect(screen.getByRole('list', { name: 'Keyboard & mouse' })).toBeInTheDocument();
    expect(screen.getByText('moves between cards')).toBeInTheDocument();
  });

  it('never shows more than three bullets, whatever it is handed', () => {
    render(
      <CompactInstructions
        lead="Lead"
        bullets={['One', 'Two', 'Three', 'Four', 'Five']}
        inputMethod="touch"
      />
    );
    expect(screen.getByTestId('compact-bullets').children).toHaveLength(3);
    expect(screen.queryByText('Four')).not.toBeInTheDocument();
  });

  it('leaves the controls section out for a game that has no keys', () => {
    render(<CompactInstructions lead="Lead" bullets={['One']} inputMethod="touch" />);
    expect(screen.queryByRole('list', { name: /keyboard/i })).not.toBeInTheDocument();
  });

  it('typesets a formula in a bullet', () => {
    render(
      <CompactInstructions lead="Lead" bullets={['Make 4 `H2O`.']} inputMethod="touch" />
    );
    // MoleculeText splits the formula into its parts, so the flat string is
    // gone and the subscript is its own node.
    expect(screen.queryByText('Make 4 H2O.')).not.toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});
