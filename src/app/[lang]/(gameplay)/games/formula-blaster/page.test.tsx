/**
 * Scenario tests for the Formula Blaster game flow (page level).
 * Math.random is pinned to 0.9 so every spawned bubble is the current target
 * (the spawner picks a target bubble when random > 0.8). Individual tests
 * re-pin it when they need a distractor.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, screen, within } from '@testing-library/react';
import FormulaBlasterPage from './page';
import { renderWithProviders } from '@/test-utils/render';
import { FORMULA_BLASTER_CONFIG as CFG } from '@/core-engine/config/games/formula-blaster-config';
import { compoundByName } from '@/test-utils/registry';

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

const LEVEL_1_SPAWN_INTERVAL = Math.max(
  CFG.timing.baseSpawnIntervalMs - CFG.timing.spawnIntervalLevelDecrement,
  CFG.timing.minSpawnIntervalMs
);
const mmss = (seconds: number) =>
  `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
const FULL_TIMER = mmss(CFG.mechanics.baseWaveTimeSeconds);

const advance = (ms: number) => act(() => vi.advanceTimersByTime(ms));
const bubbles = () => screen.queryAllByTestId('blaster-bubble');
const targetName = () =>
  (screen.getByRole('heading', { level: 1 }).textContent ?? '').replace('Find:', '').trim();
const targetFormula = () => compoundByName(targetName()).formula;
const progress = () => {
  const text = screen.getByText(/Hits: \d+\/\d+/).textContent ?? '';
  const m = text.match(/Target (\d+)\/(\d+) • Hits: (\d+)\/(\d+)/);
  if (!m) throw new Error(`Unexpected progress text "${text}"`);
  return { target: Number(m[1]), hits: Number(m[3]), quota: Number(m[4]) };
};

const popTarget = () => {
  const formula = targetFormula();
  let candidates = bubbles().filter((b) => b.getAttribute('data-formula') === formula);
  let attempts = 0;
  while (candidates.length === 0 && attempts < 10) {
    advance(LEVEL_1_SPAWN_INTERVAL);
    candidates = bubbles().filter((b) => b.getAttribute('data-formula') === formula);
    attempts += 1;
  }
  if (candidates.length === 0) throw new Error(`No ${formula} bubble spawned`);
  fireEvent.click(candidates[0]);
};

const completeCurrentTarget = () => {
  const { quota } = progress();
  for (let i = 0; i < quota; i++) popTarget();
};

describe('Formula Blaster page (game flow)', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(Math, 'random').mockReturnValue(0.9);
    renderWithProviders(<FormulaBlasterPage />);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('starts a wave with a target, a full timer and an initial burst of bubbles', () => {
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Find:');
    expect(targetName()).not.toBe('');
    expect(screen.getByText(FULL_TIMER)).toBeInTheDocument();
    expect(bubbles()).toHaveLength(CFG.mechanics.initialBurstCount);
    expect(progress()).toMatchObject({ target: 1, hits: 0 });
    expect(screen.getByText('Level 01')).toBeInTheDocument();
    expect(screen.getByText('Score 0')).toBeInTheDocument();
  });

  it('the countdown ticks once per second', () => {
    advance(1000);
    expect(screen.getByText(mmss(CFG.mechanics.baseWaveTimeSeconds - 1))).toBeInTheDocument();
  });

  it('keeps spawning bubbles on the level interval', () => {
    const before = bubbles().length;
    advance(LEVEL_1_SPAWN_INTERVAL);
    expect(bubbles().length).toBe(before + 1);
  });

  it('popping the target bubble counts a hit and scores level × 100', () => {
    popTarget();
    expect(screen.getByText(`Score ${CFG.mechanics.pointsPerLevelMultiplier}`)).toBeInTheDocument();
    expect(progress().hits).toBe(1);
    expect(bubbles()).toHaveLength(CFG.mechanics.initialBurstCount - 1);
  });

  it('after the quota the next target starts; after three targets the level is cleared', () => {
    const firstTarget = targetName();
    completeCurrentTarget();
    expect(progress()).toMatchObject({ target: 2, hits: 0 });
    expect(targetName()).not.toBe(firstTarget);

    completeCurrentTarget();
    expect(progress()).toMatchObject({ target: 3, hits: 0 });

    completeCurrentTarget();
    expect(screen.getByRole('dialog', { name: 'Level Cleared' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Begin Level 2' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByText('Level 02')).toBeInTheDocument();
    expect(screen.getByText(FULL_TIMER)).toBeInTheDocument();
    expect(progress()).toMatchObject({ target: 1, hits: 0 });
    expect(recordGameSessionMock).not.toHaveBeenCalled(); // only terminal states are recorded
  });

  it('records a victory once after clearing every level', () => {
    let expectedScore = 0;
    for (let level = 1; level <= CFG.levels.maxLevel; level++) {
      for (let target = 0; target < CFG.levels.targetsRequiredPerLevel; target++) {
        expectedScore += progress().quota * CFG.mechanics.pointsPerLevelMultiplier * level;
        completeCurrentTarget();
      }
      if (level < CFG.levels.maxLevel) {
        fireEvent.click(screen.getByRole('button', { name: `Begin Level ${level + 1}` }));
      }
    }

    expect(screen.getByRole('dialog', { name: 'Research Complete' })).toBeInTheDocument();
    expect(screen.getByText(`Score ${expectedScore}`)).toBeInTheDocument();
    expect(recordGameSessionMock).toHaveBeenCalledTimes(1);
    expect(recordGameSessionMock).toHaveBeenCalledWith(
      expect.objectContaining({
        gameId: 'formula-blaster',
        outcome: 'victory',
        score: expectedScore,
        levelReached: CFG.levels.maxLevel,
        accuracy: 100,
      })
    );
  });

  it('a wrong bubble shows a comparative error and does not score', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.1); // next spawn is a distractor
    advance(LEVEL_1_SPAWN_INTERVAL);
    const formula = targetFormula();
    const distractor = bubbles().find((b) => b.getAttribute('data-formula') !== formula);
    if (!distractor) throw new Error('No distractor bubble spawned');

    fireEvent.click(distractor);
    expect(screen.getByTestId('blaster-error')).toHaveTextContent(/^That's /);
    expect(screen.getByText('Score 0')).toBeInTheDocument();
    expect(progress().hits).toBe(0);

    advance(CFG.timing.errorTooltipDurationMs + 10);
    expect(screen.queryByTestId('blaster-error')).not.toBeInTheDocument();
  });

  it('ends the game when the wave timer runs out and records the failed run; Try Again restarts', () => {
    popTarget(); // one hit, so the run has a score and an accuracy
    vi.spyOn(Math, 'random').mockReturnValue(0.1);
    advance(LEVEL_1_SPAWN_INTERVAL);
    const distractor = bubbles().find((b) => b.getAttribute('data-formula') !== targetFormula());
    if (!distractor) throw new Error('No distractor bubble spawned');
    fireEvent.click(distractor); // one miss

    advance(CFG.mechanics.baseWaveTimeSeconds * 1000 + 10);
    expect(screen.getByRole('dialog', { name: 'Game Over' })).toBeInTheDocument();
    expect(screen.getByText('Time ran out before reaching the quota.')).toBeInTheDocument();
    expect(recordGameSessionMock).toHaveBeenCalledTimes(1);
    expect(recordGameSessionMock).toHaveBeenCalledWith(
      expect.objectContaining({
        gameId: 'formula-blaster',
        outcome: 'failed',
        score: CFG.mechanics.pointsPerLevelMultiplier,
        levelReached: 1,
        accuracy: 50,
      })
    );

    fireEvent.click(screen.getByRole('button', { name: 'Try Again' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByText(FULL_TIMER)).toBeInTheDocument();
    expect(screen.getByText('Score 0')).toBeInTheDocument();
    expect(screen.getByText('Level 01')).toBeInTheDocument();

    // A second run that times out with no answers is recorded separately.
    advance(CFG.mechanics.baseWaveTimeSeconds * 1000 + 10);
    expect(recordGameSessionMock).toHaveBeenCalledTimes(2);
    expect(recordGameSessionMock).toHaveBeenLastCalledWith(
      expect.objectContaining({ outcome: 'failed', score: 0, accuracy: undefined })
    );
  });

  it('pausing freezes the countdown and the spawner', () => {
    fireEvent.click(screen.getByTitle('Pause Game'));
    expect(screen.getByRole('dialog', { name: 'Game Paused' })).toBeInTheDocument();
    const bubbleCount = bubbles().length;

    advance(3000);
    expect(screen.getByText(FULL_TIMER)).toBeInTheDocument();
    expect(bubbles()).toHaveLength(bubbleCount);

    fireEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Resume Game' }));
    advance(1000);
    expect(screen.getByText(mmss(CFG.mechanics.baseWaveTimeSeconds - 1))).toBeInTheDocument();
  });

  it('the hint names the elements of the target', () => {
    fireEvent.click(screen.getByTitle('Get Hint'));
    expect(screen.getByTestId('blaster-hint')).toHaveTextContent(
      `${targetName()} consists of the elements:`
    );
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss hint' }));
    expect(screen.queryByTestId('blaster-hint')).not.toBeInTheDocument();
  });

  it('opening the instructions pauses the game and closing resumes it', () => {
    fireEvent.click(screen.getByTitle('How to Play'));
    expect(screen.getByRole('heading', { name: 'How to Play: Formula Blaster' })).toBeInTheDocument();
    expect(screen.getByTitle('Resume Game')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'GOT IT' }));
    expect(screen.queryByRole('heading', { name: 'How to Play: Formula Blaster' })).not.toBeInTheDocument();
    expect(screen.getByTitle('Pause Game')).toBeInTheDocument();
  });

  it('Exit leaves the game', () => {
    fireEvent.click(screen.getByRole('button', { name: /Exit/ }));
    // The games hub, not the dashboard: leaving a game means leaving this
    // game, and every other game already did this.
    expect(pushMock).toHaveBeenCalledWith('/en/games');
  });
});
