/**
 * Scenario tests for the Reaction Balancer game flow (page level).
 * The Supabase server action is mocked so the test can assert what gets
 * recorded without a database.
 */
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, screen, within } from '@testing-library/react';
import ReactionBalancerPage from './page';
import { renderWithProviders } from '@/test-utils/render';
import { reactions } from '@/core-engine/data/reactions';

const { pushMock, recordGameSessionMock } = vi.hoisted(() => ({
  pushMock: vi.fn(),
  recordGameSessionMock: vi.fn(async () => ({ success: true, highestScore: 0 })),
}));
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock, replace: vi.fn(), back: vi.fn() }),
}));
vi.mock('@/lib/actions/game-actions', () => ({
  recordGameSession: recordGameSessionMock,
}));

const input = (formula: string) => screen.getByLabelText(`Coefficient for ${formula}`) as HTMLInputElement;
const setCoefficient = (formula: string, value: string) =>
  fireEvent.change(input(formula), { target: { value } });
const checkAnswer = () => fireEvent.click(screen.getByRole('button', { name: 'Check Answer' }));

describe('Reaction Balancer page (game flow)', () => {
  it('starts at level 1 with the first reaction and no score', () => {
    renderWithProviders(<ReactionBalancerPage />);
    expect(screen.getByRole('heading', { name: reactions[0].name })).toBeInTheDocument();
    expect(screen.getByText('Level 01')).toBeInTheDocument();
    expect(screen.getByText('Score 0')).toBeInTheDocument();
  });

  it('balancing the equation scores 150, records the session and clears the level', () => {
    renderWithProviders(<ReactionBalancerPage />);
    setCoefficient('H2', '2');
    setCoefficient('H2O', '2');
    checkAnswer();

    expect(screen.getByRole('dialog', { name: 'Level Cleared' })).toBeInTheDocument();
    expect(screen.getByText('Score 150')).toBeInTheDocument();
    expect(recordGameSessionMock).toHaveBeenCalledWith(
      expect.objectContaining({
        gameId: 'reaction-balancer',
        score: 150,
        levelReached: 1,
        outcome: 'victory',
      })
    );

    fireEvent.click(screen.getByRole('button', { name: 'Begin Level 2' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: reactions[1].name })).toBeInTheDocument();
    expect(screen.getByText('Level 02')).toBeInTheDocument();
    expect(input('H2').value).toBe(''); // inputs reset for the new reaction
  });

  it('an unbalanced attempt keeps the game going and records nothing', () => {
    renderWithProviders(<ReactionBalancerPage />);
    setCoefficient('H2', '3');
    checkAnswer();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByText('Score 0')).toBeInTheDocument();
    expect(recordGameSessionMock).not.toHaveBeenCalled();
  });

  it('pausing disables the arena controls and resuming re-enables them', () => {
    renderWithProviders(<ReactionBalancerPage />);
    fireEvent.click(screen.getByTitle('Pause Game'));
    expect(screen.getByRole('dialog', { name: 'Game Paused' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Check Answer' })).toBeDisabled();

    fireEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Resume Game' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Check Answer' })).toBeEnabled();
  });

  it('the instructions modal pauses the arena while open', () => {
    renderWithProviders(<ReactionBalancerPage />);
    fireEvent.click(screen.getByTitle('How to Play'));
    expect(screen.getByRole('heading', { name: 'How to Play: Reaction Balancer' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Check Answer' })).toBeDisabled();

    fireEvent.click(screen.getByRole('button', { name: 'GOT IT' }));
    expect(screen.getByRole('button', { name: 'Check Answer' })).toBeEnabled();
  });

  it('Exit returns to the games hub', () => {
    renderWithProviders(<ReactionBalancerPage />);
    fireEvent.click(screen.getByRole('button', { name: /Exit/ }));
    expect(pushMock).toHaveBeenCalledWith('/games');
  });
});
