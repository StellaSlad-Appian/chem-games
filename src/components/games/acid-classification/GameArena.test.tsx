import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import GameArena from './GameArena';
import { compoundByFormula } from '@/test-utils/registry';

const idle = { status: 'idle' as const, selected: null };

function renderArena(overrides: Partial<Parameters<typeof GameArena>[0]> = {}) {
  const onSelection = vi.fn();
  render(
    <GameArena
      currentChemical={compoundByFormula('HCl')}
      currentLevel={1}
      gameState="playing"
      feedback={idle}
      showChemicalName={false}
      onSelection={onSelection}
      {...overrides}
    />
  );
  return { onSelection };
}

describe('Acid classification GameArena', () => {
  it('renders the three vessels in the configured order', () => {
    renderArena();
    const names = screen.getAllByRole('button').map((b) => b.textContent?.trim());
    expect(names).toEqual(['Acid', 'Neutral', 'Base']);
  });

  it('maps each vessel to its chemical classification', () => {
    const { onSelection } = renderArena();
    fireEvent.click(screen.getByRole('button', { name: 'Acid' }));
    fireEvent.click(screen.getByRole('button', { name: 'Neutral' }));
    fireEvent.click(screen.getByRole('button', { name: 'Base' }));
    expect(onSelection.mock.calls.map((c) => c[0])).toEqual(['Acidic', 'Neutral', 'Basic']);
  });

  it('shows the formula and only reveals the name when asked', () => {
    const { rerender } = render(
      <GameArena
        currentChemical={compoundByFormula('H2SO4')}
        currentLevel={1}
        gameState="playing"
        feedback={idle}
        showChemicalName={false}
        onSelection={vi.fn()}
      />
    );
    expect(screen.getByTestId('molecule-bubble')).toHaveAttribute('data-formula', 'H2SO4');
    expect(screen.queryByText('Sulfuric Acid')).not.toBeInTheDocument();

    rerender(
      <GameArena
        currentChemical={compoundByFormula('H2SO4')}
        currentLevel={1}
        gameState="playing"
        feedback={idle}
        showChemicalName
        onSelection={vi.fn()}
      />
    );
    expect(screen.getByText('Sulfuric Acid')).toBeInTheDocument();
  });

  it('disables the vessels while feedback is showing', () => {
    renderArena({ feedback: { status: 'wrong', selected: 'Basic' } });
    screen.getAllByRole('button').forEach((b) => expect(b).toBeDisabled());
    expect(screen.getByText('wrong')).toBeInTheDocument();
  });

  it('disables the vessels and hides the arena from assistive tech when not playing', () => {
    const { onSelection } = renderArena({ gameState: 'paused' });
    screen.getAllByRole('button', { hidden: true }).forEach((b) => expect(b).toBeDisabled());
    fireEvent.click(screen.getByRole('button', { name: 'Acid', hidden: true }));
    expect(onSelection).not.toHaveBeenCalled();
  });

  it('renders no bubble without a current chemical', () => {
    renderArena({ currentChemical: undefined });
    expect(screen.queryByTestId('molecule-bubble')).not.toBeInTheDocument();
  });
});
