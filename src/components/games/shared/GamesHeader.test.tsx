import { describe, expect, it, vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import GamesHeader from './GamesHeader';
import { renderWithProviders } from '@/test-utils/render';

const { pushMock } = vi.hoisted(() => ({ pushMock: vi.fn() }));
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock, replace: vi.fn(), back: vi.fn() }),
}));

const baseProps = {
  gameSubtitle: 'TARGET MOLECULE',
  progressText: '3 / 5 Sorted',
  currentLevel: 2,
  score: 300,
};

describe('GamesHeader', () => {
  it('shows progress, level and score', () => {
    renderWithProviders(<GamesHeader {...baseProps} />);
    expect(screen.getByText('3 / 5 Sorted')).toBeInTheDocument();
    expect(screen.getByText('Level 02')).toBeInTheDocument();
    expect(screen.getByText('Score 300')).toBeInTheDocument();
  });

  it('shows the target name in the centre panel', () => {
    renderWithProviders(<GamesHeader {...baseProps} targetName="Water" />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Find: Water');
  });

  it('shows a custom task description instead of a target', () => {
    renderWithProviders(<GamesHeader {...baseProps} customTaskDescription="Acid, Base or Neutral?" />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Acid, Base or Neutral?');
    expect(screen.queryByText(/Find:/)).not.toBeInTheDocument();
  });

  it('only renders the hint button when a handler is given', () => {
    const { rerender } = renderWithProviders(<GamesHeader {...baseProps} />);
    expect(screen.queryByTitle('Get Hint')).not.toBeInTheDocument();

    const onTriggerHint = vi.fn();
    rerender(<GamesHeader {...baseProps} onTriggerHint={onTriggerHint} />);
    fireEvent.click(screen.getByTitle('Get Hint'));
    expect(onTriggerHint).toHaveBeenCalledTimes(1);
  });

  it('renders the timer and lives when enabled', () => {
    renderWithProviders(<GamesHeader {...baseProps} showTimer timeLeft={65} showLives lives={2} maxLives={3} />);
    expect(screen.getByText('01:05')).toBeInTheDocument();
    expect(screen.getByText('LIVES: 2/3')).toBeInTheDocument();
  });

  it('uses the custom exit handler when provided', () => {
    const onExit = vi.fn();
    renderWithProviders(<GamesHeader {...baseProps} onExit={onExit} />);
    fireEvent.click(screen.getByRole('button', { name: /Exit/ }));
    expect(onExit).toHaveBeenCalledTimes(1);
    expect(pushMock).not.toHaveBeenCalled();
  });

  it('returns to the games hub by default', () => {
    renderWithProviders(<GamesHeader {...baseProps} />);
    fireEvent.click(screen.getByRole('button', { name: /Exit/ }));
    expect(pushMock).toHaveBeenCalledWith('/en/games');
  });
});
