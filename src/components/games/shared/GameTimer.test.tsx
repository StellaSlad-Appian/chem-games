import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import GameTimer from './GameTimer';
import GameLives from './GameLives';
import { renderWithProviders } from '@/test-utils/render';

describe('GameTimer', () => {
  it('formats seconds as mm:ss', () => {
    renderWithProviders(<GameTimer timeLeft={45} />);
    expect(screen.getByText('00:45')).toBeInTheDocument();
  });

  it('rolls minutes over', () => {
    renderWithProviders(<GameTimer timeLeft={65} />);
    expect(screen.getByText('01:05')).toBeInTheDocument();
  });

  it('stays calm near zero: it is a bonus clock, not a deadline', () => {
    renderWithProviders(<GameTimer timeLeft={3} />);
    expect(screen.getByText('00:03')).not.toHaveClass('animate-pulse');
  });

  it('shows what the clock is for', () => {
    renderWithProviders(<GameTimer timeLeft={30} label="Speed bonus" />);
    expect(screen.getByText('Speed bonus')).toBeInTheDocument();
  });
});

describe('GameLives', () => {
  it('shows the remaining lives as text and one heart per max life', () => {
    const { container } = renderWithProviders(<GameLives lives={2} maxLives={3} />);
    expect(screen.getByText('LIVES: 2/3')).toBeInTheDocument();
    expect(container.querySelectorAll('svg')).toHaveLength(3);
  });

  it('fills only the remaining hearts', () => {
    const { container } = renderWithProviders(<GameLives lives={1} maxLives={3} />);
    const filled = Array.from(container.querySelectorAll('svg')).filter((svg) =>
      svg.classList.contains('fill-(--danger)')
    );
    expect(filled).toHaveLength(1);
  });
});
