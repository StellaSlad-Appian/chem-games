import { describe, expect, it, vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import ReactionBalancerArena from './GameArena';
import { renderWithProviders } from '@/test-utils/render';
import { reactions } from '@/core-engine/data/reactions';

function renderArena(level = 1, isPaused = false) {
  const onReactionComplete = vi.fn();
  renderWithProviders(
    <ReactionBalancerArena level={level} onReactionComplete={onReactionComplete} isPaused={isPaused} />
  );
  return { onReactionComplete };
}

const input = (formula: string) => screen.getByLabelText(`Coefficient for ${formula}`) as HTMLInputElement;
const setCoefficient = (formula: string, value: string) =>
  fireEvent.change(input(formula), { target: { value } });
const checkAnswer = () => fireEvent.click(screen.getByRole('button', { name: 'Check Answer' }));

describe('Reaction Balancer GameArena', () => {
  it('shows the level-1 reaction with one coefficient input per compound', () => {
    renderArena();
    expect(screen.getByRole('heading', { name: 'Water Synthesis' })).toBeInTheDocument();
    expect(input('H2')).toBeInTheDocument();
    expect(input('O2')).toBeInTheDocument();
    expect(input('H2O')).toBeInTheDocument();
    expect(screen.getAllByRole('textbox')).toHaveLength(3);
  });

  it('awards 150 points for the correct coefficients (blank counts as 1)', () => {
    const { onReactionComplete } = renderArena();
    setCoefficient('H2', '2');
    setCoefficient('H2O', '2');
    checkAnswer();
    expect(onReactionComplete).toHaveBeenCalledWith(150);
  });

  it('rejects an unbalanced attempt', () => {
    const { onReactionComplete } = renderArena();
    checkAnswer();
    expect(onReactionComplete).not.toHaveBeenCalled();

    setCoefficient('H2', '3');
    setCoefficient('H2O', '2');
    checkAnswer();
    expect(onReactionComplete).not.toHaveBeenCalled();
  });

  it('only accepts whole numbers from 1 to 99', () => {
    renderArena();
    setCoefficient('H2', '0');
    expect(input('H2').value).toBe('');
    setCoefficient('H2', 'abc');
    expect(input('H2').value).toBe('');
    setCoefficient('H2', '100');
    expect(input('H2').value).toBe('');
    setCoefficient('H2', '7');
    expect(input('H2').value).toBe('7');
    setCoefficient('H2', '');
    expect(input('H2').value).toBe('');
  });

  it('toggles the atom balance scaffold', () => {
    renderArena();
    expect(screen.queryByText('Atom Balance')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Show Atom Balance' }));
    expect(screen.getByText('Atom Balance')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Hide Atom Balance' }));
    expect(screen.queryByText('Atom Balance')).not.toBeInTheDocument();
  });

  it('reports a balanced inventory once the coefficients are right', () => {
    renderArena();
    fireEvent.click(screen.getByRole('button', { name: 'Show Atom Balance' }));
    expect(screen.queryByText(/All atoms are balanced/)).not.toBeInTheDocument();
    setCoefficient('H2', '2');
    setCoefficient('H2O', '2');
    expect(screen.getByText(/All atoms are balanced/)).toBeInTheDocument();
  });

  it('disables inputs and controls while paused', () => {
    const { onReactionComplete } = renderArena(1, true);
    expect(input('H2')).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Check Answer' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Show Atom Balance' })).toBeDisabled();
    checkAnswer();
    expect(onReactionComplete).not.toHaveBeenCalled();
  });

  it('loads the reaction for the requested level and wraps around the list', () => {
    renderArena(2);
    expect(screen.getByRole('heading', { name: reactions[1].name })).toBeInTheDocument();
  });

  it('wraps back to the first reaction after the last one', () => {
    renderArena(reactions.length + 1);
    expect(screen.getByRole('heading', { name: reactions[0].name })).toBeInTheDocument();
  });
});
