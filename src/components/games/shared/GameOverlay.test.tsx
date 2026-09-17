import { describe, expect, it, vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import GameOverlay from './GameOverlay';
import { renderWithProviders } from '@/test-utils/render';
import type { GameState } from '@/core-engine/types/general';

function renderOverlay(gameState: GameState, extra: Partial<Parameters<typeof GameOverlay>[0]> = {}) {
  const onResume = vi.fn();
  const onRestart = vi.fn();
  renderWithProviders(
    <GameOverlay
      gameState={gameState}
      score={250}
      correctInRound={2}
      currentLevel={1}
      maxLevel={5}
      onResume={onResume}
      onRestart={onRestart}
      {...extra}
    />
  );
  return { onResume, onRestart };
}

describe('GameOverlay', () => {
  it('renders nothing while the game is playing', () => {
    renderOverlay('playing');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('shows the pause card with live stats and resumes on click', () => {
    const { onResume } = renderOverlay('paused');
    expect(screen.getByRole('dialog', { name: 'Game Paused' })).toBeInTheDocument();
    expect(screen.getByText('1 / 5')).toBeInTheDocument();
    expect(screen.getByText('250')).toBeInTheDocument();
    expect(screen.getByText('2 correct')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Resume Game' }));
    expect(onResume).toHaveBeenCalledTimes(1);
  });

  it('shows game over with the final score and restarts on click', () => {
    const { onRestart } = renderOverlay('failed');
    expect(screen.getByRole('dialog', { name: 'Game Over' })).toBeInTheDocument();
    expect(screen.getByText('Level 1 of 5 • 2 correct')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Try Again' }));
    expect(onRestart).toHaveBeenCalledTimes(1);
  });

  it('explains a timeout', () => {
    renderOverlay('failed', { failReason: 'timeout' });
    expect(screen.getByText('Time ran out before reaching the quota.')).toBeInTheDocument();
  });

  it('offers the next level after a level-up', () => {
    const { onResume } = renderOverlay('levelUp');
    expect(screen.getByRole('dialog', { name: 'Level Cleared' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Begin Level 2' }));
    expect(onResume).toHaveBeenCalledTimes(1);
  });

  it('celebrates a victory and offers a replay', () => {
    renderOverlay('victory');
    expect(screen.getByRole('dialog', { name: 'Research Complete' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Try Again' })).toBeInTheDocument();
  });

  it('resumes on Escape while paused', () => {
    const { onResume } = renderOverlay('paused');
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onResume).toHaveBeenCalledTimes(1);
  });

  it('restarts on Enter after a game over when nothing focusable has focus', () => {
    const { onRestart } = renderOverlay('failed');
    (document.activeElement as HTMLElement | null)?.blur();
    fireEvent.keyDown(window, { code: 'Enter' });
    expect(onRestart).toHaveBeenCalledTimes(1);
  });

  it('always offers a way back to the games hub', () => {
    renderOverlay('failed');
    expect(screen.getByRole('link', { name: 'Quit to Hub' })).toHaveAttribute('href', '/en/games');
  });

  it('uses custom copy when provided', () => {
    renderOverlay('paused', {
      customMessages: {
        paused: { badge: 'Hold', title: 'Beaker Down', subtitle: 'Breathe', description: 'Custom text' },
      },
    });
    expect(screen.getByRole('dialog', { name: 'Beaker Down' })).toBeInTheDocument();
    expect(screen.getByText('Custom text')).toBeInTheDocument();
  });
});
