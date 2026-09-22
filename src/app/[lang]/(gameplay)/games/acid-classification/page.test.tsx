/**
 * Scenario tests for the Acid classification game flow (page level).
 * Runs the real page with fake timers and a fixed Math.random so the
 * compound order is deterministic (registry order within each difficulty).
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, screen, within } from '@testing-library/react';
import ClassificationGame from './page';
import { renderWithProviders } from '@/test-utils/render';
import { ACID_CLASSIFICATION_CONFIG as CFG } from '@/core-engine/config/games/acid-classification-config';
import { evaluateChemical } from '@/core-engine/utils/chemical-utils';
import { compoundByFormula, compoundsAtDifficulty } from '@/test-utils/registry';
import { en } from '@/i18n/dictionaries/en';

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

type VesselLabel = 'Acid' | 'Neutral' | 'Base';
const VESSELS: VesselLabel[] = ['Acid', 'Neutral', 'Base'];
const LABEL_FOR: Record<string, VesselLabel> = { Acidic: 'Acid', Basic: 'Base', Neutral: 'Neutral' };

const quotaFor = (level: number) =>
  Math.max(CFG.levels.minPassingItems, compoundsAtDifficulty(level).length - 2);

const currentFormula = () => {
  const formula = screen.getByTestId('molecule-bubble').getAttribute('data-formula');
  if (!formula) throw new Error('No compound is displayed');
  return formula;
};
const correctLabel = () => LABEL_FOR[evaluateChemical(compoundByFormula(currentFormula()))];
const wrongLabel = () => {
  const correct = correctLabel();
  const wrong = VESSELS.find((label) => label !== correct);
  if (!wrong) throw new Error('No wrong vessel available');
  return wrong;
};
const vessel = (label: VesselLabel) => screen.getByRole('button', { name: label, hidden: true });
const advance = (ms: number) => act(() => vi.advanceTimersByTime(ms));

const answerCorrectly = () => {
  fireEvent.click(vessel(correctLabel()));
  advance(CFG.timing.successTransitionMs + 10);
};
const answerWrongly = () => {
  fireEvent.click(vessel(wrongLabel()));
  advance(CFG.timing.mistakeTransitionMs + 10);
};

describe('Acid classification page (game flow)', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(Math, 'random').mockReturnValue(0.5); // stable shuffle
    renderWithProviders(<ClassificationGame />);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('starts at level 1 with full lives, no score and the classify prompt', () => {
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Acid, Base or Neutral?');
    expect(screen.getByText('LIVES: 3/3')).toBeInTheDocument();
    expect(screen.getByText('Level 01')).toBeInTheDocument();
    expect(screen.getByText('Score 0')).toBeInTheDocument();
    expect(screen.getByText(`0 / ${quotaFor(1)} Sorted`)).toBeInTheDocument();
    VESSELS.forEach((label) => expect(vessel(label)).toBeEnabled());
  });

  it('awards level × 100 points for a correct answer and shows the next compound', () => {
    const before = currentFormula();
    fireEvent.click(vessel(correctLabel()));
    expect(screen.getByText('correct')).toBeInTheDocument();
    VESSELS.forEach((label) => expect(vessel(label)).toBeDisabled());

    advance(CFG.timing.successTransitionMs + 10);
    expect(screen.getByText(`Score ${CFG.mechanics.pointsPerLevelMultiplier}`)).toBeInTheDocument();
    expect(screen.getByText(`1 / ${quotaFor(1)} Sorted`)).toBeInTheDocument();
    expect(currentFormula()).not.toBe(before);
  });

  it('clears the level once the quota is met and continues at level 2', () => {
    const quota = quotaFor(1);
    for (let i = 0; i < quota; i++) answerCorrectly();

    expect(screen.getByRole('dialog', { name: 'Level Cleared' })).toBeInTheDocument();
    expect(screen.getByText(`Score ${quota * CFG.mechanics.pointsPerLevelMultiplier}`)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Begin Level 2' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByText('Level 02')).toBeInTheDocument();
    expect(screen.getByText(`0 / ${quotaFor(2)} Sorted`)).toBeInTheDocument();
    expect(screen.getByText('LIVES: 3/3')).toBeInTheDocument();
    expect(recordGameSessionMock).not.toHaveBeenCalled(); // only terminal states are recorded
  });

  it('records a victory once after clearing the final level', () => {
    let expectedScore = 0;
    for (let level = 1; level <= CFG.levels.maxLevel; level++) {
      const quota = quotaFor(level);
      for (let i = 0; i < quota; i++) answerCorrectly();
      expectedScore += quota * CFG.mechanics.pointsPerLevelMultiplier * level;
      if (level < CFG.levels.maxLevel) {
        fireEvent.click(screen.getByRole('button', { name: `Begin Level ${level + 1}` }));
      }
    }

    expect(screen.getByRole('dialog', { name: 'Research Complete' })).toBeInTheDocument();
    expect(screen.getByText(`Score ${expectedScore}`)).toBeInTheDocument();
    expect(recordGameSessionMock).toHaveBeenCalledTimes(1);
    expect(recordGameSessionMock).toHaveBeenCalledWith(
      expect.objectContaining({
        gameId: 'acid-classification',
        outcome: 'victory',
        score: expectedScore,
        levelReached: CFG.levels.maxLevel,
        accuracy: 100,
        timeSpentSeconds: expect.any(Number),
      })
    );
  });

  it('loses a life per wrong answer and ends the game after three; Try Again resets', () => {
    answerWrongly();
    expect(screen.getByText('LIVES: 2/3')).toBeInTheDocument();
    answerWrongly();
    expect(screen.getByText('LIVES: 1/3')).toBeInTheDocument();

    fireEvent.click(vessel(wrongLabel()));
    advance(CFG.timing.failStateDelayMs + 10);
    expect(screen.getByRole('dialog', { name: 'Game Over' })).toBeInTheDocument();
    expect(screen.getByText('LIVES: 0/3')).toBeInTheDocument();
    expect(recordGameSessionMock).toHaveBeenCalledTimes(1);
    expect(recordGameSessionMock).toHaveBeenCalledWith(
      expect.objectContaining({
        gameId: 'acid-classification',
        outcome: 'failed',
        score: 0,
        levelReached: 1,
        accuracy: 0,
      })
    );

    fireEvent.click(screen.getByRole('button', { name: 'Try Again' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByText('LIVES: 3/3')).toBeInTheDocument();
    expect(screen.getByText('Score 0')).toBeInTheDocument();
    expect(screen.getByText('Level 01')).toBeInTheDocument();
    expect(screen.getByText(`0 / ${quotaFor(1)} Sorted`)).toBeInTheDocument();

    // The new run is recorded separately: one correct answer, then three mistakes.
    answerCorrectly();
    for (let i = 0; i < CFG.mechanics.maxMistakes - 1; i++) answerWrongly();
    fireEvent.click(vessel(wrongLabel()));
    advance(CFG.timing.failStateDelayMs + 10);
    expect(recordGameSessionMock).toHaveBeenCalledTimes(2);
    expect(recordGameSessionMock).toHaveBeenLastCalledWith(
      expect.objectContaining({
        outcome: 'failed',
        score: CFG.mechanics.pointsPerLevelMultiplier,
        accuracy: 25,
      })
    );
  });

  it('ignores extra clicks while the feedback animation is showing', () => {
    fireEvent.click(vessel(correctLabel()));
    fireEvent.click(vessel(wrongLabel())); // disabled, must not count
    advance(CFG.timing.successTransitionMs + 10);
    expect(screen.getByText(`Score ${CFG.mechanics.pointsPerLevelMultiplier}`)).toBeInTheDocument();
    expect(screen.getByText('LIVES: 3/3')).toBeInTheDocument();
  });

  it('the hint reveals the compound name', () => {
    const name = compoundByFormula(currentFormula()).name;
    expect(screen.queryByText(name)).not.toBeInTheDocument();
    fireEvent.click(screen.getByTitle('Get Hint'));
    expect(screen.getByText(name)).toBeInTheDocument();
  });

  it('pauses from the footer and resumes from the overlay', () => {
    fireEvent.click(screen.getByTitle('Pause Game'));
    expect(screen.getByRole('dialog', { name: 'Game Paused' })).toBeInTheDocument();
    expect(vessel('Acid')).toBeDisabled();

    fireEvent.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Resume Game' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(vessel('Acid')).toBeEnabled();
  });

  it('opening the settings pauses the game', () => {
    fireEvent.click(screen.getByTitle('Settings'));
    expect(screen.getByRole('heading', { name: /Game Settings/ })).toBeInTheDocument();
    expect(screen.getByTitle('Resume Game')).toBeInTheDocument();
  });

  // The bug: opening Settings paused, closing it left the game paused, so the
  // player was dropped straight onto the pause overlay they never asked for.
  it('closing the settings resumes the game', () => {
    fireEvent.click(screen.getByTitle('Settings'));
    expect(screen.getByTitle('Resume Game')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: en.settings.closeA11y }));
    expect(screen.queryByRole('heading', { name: /Game Settings/ })).not.toBeInTheDocument();
    expect(screen.getByTitle('Pause Game')).toBeInTheDocument();
    expect(vessel('Acid')).toBeEnabled();
  });

  // The other half of the same guard: a modal opened over an already-paused
  // game must not resume it on the way out.
  it('closing the settings over an already-paused game leaves it paused', () => {
    fireEvent.click(screen.getByTitle('Pause Game'));
    fireEvent.click(screen.getByTitle('Settings'));
    fireEvent.click(screen.getByRole('button', { name: en.settings.closeA11y }));

    expect(screen.getByRole('dialog', { name: 'Game Paused' })).toBeInTheDocument();
    expect(vessel('Acid')).toBeDisabled();
  });

  it('the instructions modal shows the configured steps', () => {
    fireEvent.click(screen.getByTitle('How to Play'));
    expect(
      screen.getByRole('heading', { name: en.games.acidClassification.instructionsTitle })
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: en.games.shared.gotIt }));
    expect(
      screen.queryByRole('heading', { name: en.games.acidClassification.instructionsTitle })
    ).not.toBeInTheDocument();
  });

  it('Exit leaves the game', () => {
    fireEvent.click(screen.getByRole('button', { name: /Exit/ }));
    // The games hub, not the dashboard: leaving a game means leaving this
    // game, and every other game already did this.
    expect(pushMock).toHaveBeenCalledWith('/en/games');
  });
});
