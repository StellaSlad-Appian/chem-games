/**
 * Scenario tests for the Neutralise game flow (page level).
 * The arena (physics loop) is replaced by a stub with two buttons so the
 * wave / lives / level bookkeeping can be driven deterministically. The real
 * arena engine is covered in components/games/neutralise/GameArena.test.tsx.
 */
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import NeutralizePage from './page';
import { renderWithProviders } from '@/test-utils/render';
import { NEUTRALISE_CONFIG as CFG } from '@/core-engine/config/games/neutralise-config';
import { getEnemiesPerWave } from '@/core-engine/utils/level-manager';

const { pushMock, recordGameSessionMock } = vi.hoisted(() => ({
  pushMock: vi.fn(),
  recordGameSessionMock: vi.fn(async () => ({ success: true, highestScore: 0 })),
}));
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock, replace: vi.fn(), back: vi.fn() }),
  // The settings modal embeds the language switcher, which reads the path.
  usePathname: () => '/en',
}));
vi.mock('@/lib/actions/game-actions', () => ({
  recordGameSession: recordGameSessionMock,
}));
vi.mock('@/components/games/neutralise/GameArena', () => ({
  default: (props: {
    level: number;
    wave: number;
    enemyCount: number;
    isPaused: boolean;
    onEnemyDefeated: (points: number) => void;
    onPlayerHit: () => void;
  }) => (
    <div
      data-testid="mock-arena"
      data-paused={String(props.isPaused)}
      data-level={props.level}
      data-wave={props.wave}
      data-enemies={props.enemyCount}
    >
      <button type="button" onClick={() => props.onEnemyDefeated(CFG.mechanics.basePointsPerDefeat)}>
        defeat enemy
      </button>
      <button type="button" onClick={props.onPlayerHit}>
        enemy reaches ground
      </button>
    </div>
  ),
}));

// Same helper the page uses: the config ramp capped by the level's maxEnemies.
const enemiesAt = (level: number) => getEnemiesPerWave(level);
const POINTS = CFG.mechanics.basePointsPerDefeat;

const arena = () => screen.getByTestId('mock-arena');
const defeat = () => fireEvent.click(screen.getByRole('button', { name: 'defeat enemy' }));
const miss = () => fireEvent.click(screen.getByRole('button', { name: 'enemy reaches ground' }));
const markIntroSeen = () => localStorage.setItem('hasSeenNeutraliseInstructions', 'true');
const lives = (n: number) => screen.getAllByText(`LIVES: ${n}/3`)[0];

describe('Neutralise page (game flow)', () => {
  it('shows the instructions on a first visit and pauses until they are dismissed', () => {
    renderWithProviders(<NeutralizePage />);
    expect(screen.getByRole('heading', { name: 'How to Play: Neutralize!' })).toBeInTheDocument();
    expect(arena()).toHaveAttribute('data-paused', 'true');

    fireEvent.click(screen.getByRole('button', { name: 'GOT IT' }));
    expect(screen.queryByRole('heading', { name: 'How to Play: Neutralize!' })).not.toBeInTheDocument();
    expect(localStorage.getItem('hasSeenNeutraliseInstructions')).toBe('true');
    expect(arena()).toHaveAttribute('data-paused', 'false');
  });

  it('skips the instructions once they have been seen', () => {
    markIntroSeen();
    renderWithProviders(<NeutralizePage />);
    expect(screen.queryByRole('heading', { name: 'How to Play: Neutralize!' })).not.toBeInTheDocument();
    expect(arena()).toHaveAttribute('data-paused', 'false');
  });

  it('shows the wave, cleared count, lives and hands the arena the enemy count', () => {
    markIntroSeen();
    renderWithProviders(<NeutralizePage />);
    expect(screen.getByText(`Wave 1/3 | Cleared 0/${enemiesAt(1)}`)).toBeInTheDocument();
    expect(lives(3)).toBeInTheDocument();
    expect(arena()).toHaveAttribute('data-enemies', String(enemiesAt(1)));
    expect(arena()).toHaveAttribute('data-level', '1');
    expect(arena()).toHaveAttribute('data-wave', '1');
  });

  it('advances waves as enemies are cleared and levels up after the final wave', () => {
    markIntroSeen();
    renderWithProviders(<NeutralizePage />);
    const perWave = enemiesAt(1);

    for (let i = 0; i < perWave; i++) defeat();
    expect(screen.getByText(`Wave 2/3 | Cleared 0/${perWave}`)).toBeInTheDocument();
    expect(screen.getAllByText(`Score ${perWave * POINTS}`)[0]).toBeInTheDocument();
    expect(arena()).toHaveAttribute('data-wave', '2');

    for (let i = 0; i < perWave; i++) defeat();
    expect(screen.getByText(`Wave 3/3 | Cleared 0/${perWave}`)).toBeInTheDocument();

    for (let i = 0; i < perWave; i++) defeat();
    expect(screen.getByRole('dialog', { name: 'Level Cleared' })).toBeInTheDocument();
    expect(recordGameSessionMock).toHaveBeenCalledWith(
      expect.objectContaining({
        gameId: 'neutralise',
        outcome: 'victory',
        score: perWave * POINTS * CFG.waves.maxWavesPerLevel,
        levelReached: 1,
      })
    );

    fireEvent.click(screen.getByRole('button', { name: 'Begin Level 2' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getAllByText('Level 02')[0]).toBeInTheDocument();
    expect(screen.getByText(`Wave 1/3 | Cleared 0/${enemiesAt(2)}`)).toBeInTheDocument();
    expect(arena()).toHaveAttribute('data-level', '2');
    expect(arena()).toHaveAttribute('data-enemies', String(enemiesAt(2)));
  });

  it('keeps recording after a level-up: the next level can still end and be saved', () => {
    markIntroSeen();
    renderWithProviders(<NeutralizePage />);
    const level1Score = enemiesAt(1) * POINTS * CFG.waves.maxWavesPerLevel;

    for (let i = 0; i < enemiesAt(1) * CFG.waves.maxWavesPerLevel; i++) defeat();
    expect(screen.getByRole('dialog', { name: 'Level Cleared' })).toBeInTheDocument();
    expect(recordGameSessionMock).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByRole('button', { name: 'Begin Level 2' }));

    // Two misses on level 2 must still end the game and record it.
    miss();
    miss();
    expect(screen.getByRole('dialog', { name: 'Game Over' })).toBeInTheDocument();
    expect(recordGameSessionMock).toHaveBeenCalledTimes(2);
    expect(recordGameSessionMock).toHaveBeenLastCalledWith(
      expect.objectContaining({ gameId: 'neutralise', outcome: 'failed', score: level1Score, levelReached: 2 })
    );

    // And a second cleared level is recorded as its own victory.
    fireEvent.click(screen.getByRole('button', { name: 'Try Again' }));
    for (let i = 0; i < enemiesAt(1) * CFG.waves.maxWavesPerLevel; i++) defeat();
    fireEvent.click(screen.getByRole('button', { name: 'Begin Level 2' }));
    for (let i = 0; i < enemiesAt(2) * CFG.waves.maxWavesPerLevel; i++) defeat();
    expect(screen.getByRole('dialog', { name: 'Level Cleared' })).toBeInTheDocument();
    expect(recordGameSessionMock).toHaveBeenCalledTimes(4);
    expect(recordGameSessionMock).toHaveBeenLastCalledWith(
      expect.objectContaining({ outcome: 'victory', levelReached: 2 })
    );
  });

  it('tolerates one miss per wave but ends the game on the second; Try Again resets', () => {
    markIntroSeen();
    renderWithProviders(<NeutralizePage />);
    const perWave = enemiesAt(1);

    miss();
    expect(lives(2)).toBeInTheDocument();
    for (let i = 0; i < perWave - 1; i++) defeat();
    expect(screen.getByText(`Wave 2/3 | Cleared 0/${perWave}`)).toBeInTheDocument();

    miss();
    miss();
    expect(screen.getByRole('dialog', { name: 'Game Over' })).toBeInTheDocument();
    expect(lives(0)).toBeInTheDocument();
    expect(recordGameSessionMock).toHaveBeenCalledWith(
      expect.objectContaining({ gameId: 'neutralise', outcome: 'failed' })
    );

    fireEvent.click(screen.getByRole('button', { name: 'Try Again' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(lives(3)).toBeInTheDocument();
    expect(screen.getByText(`Wave 1/3 | Cleared 0/${perWave}`)).toBeInTheDocument();
    expect(screen.getAllByText('Score 0')[0]).toBeInTheDocument();
    expect(arena()).toHaveAttribute('data-paused', 'false');
  });

  it('opening the settings pauses the arena and closing it resumes', () => {
    markIntroSeen();
    renderWithProviders(<NeutralizePage />);
    fireEvent.click(screen.getByTitle('Settings'));
    expect(arena()).toHaveAttribute('data-paused', 'true');
    expect(screen.queryByRole('dialog', { name: 'Game Paused' })).not.toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Close settings'));
    expect(arena()).toHaveAttribute('data-paused', 'false');
  });

  it('closing a modal does not resume a game the player paused manually', () => {
    markIntroSeen();
    renderWithProviders(<NeutralizePage />);
    fireEvent.click(screen.getByTitle('Pause Game'));
    expect(screen.getByRole('dialog', { name: 'Game Paused' })).toBeInTheDocument();

    fireEvent.click(screen.getByTitle('Settings'));
    fireEvent.click(screen.getByLabelText('Close settings'));
    expect(arena()).toHaveAttribute('data-paused', 'true');
    expect(screen.getByRole('dialog', { name: 'Game Paused' })).toBeInTheDocument();
  });

  it('Exit returns to the games hub', () => {
    markIntroSeen();
    renderWithProviders(<NeutralizePage />);
    fireEvent.click(screen.getAllByRole('button', { name: /Exit/ })[0]);
    expect(pushMock).toHaveBeenCalledWith('/en/games');
  });
});
