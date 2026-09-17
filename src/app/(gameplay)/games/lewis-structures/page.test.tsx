/**
 * Scenario tests for the Share to Fill game flow (page level). The real
 * canvas, hook and rules engine run; molecules are built by clicking loner
 * buttons in the order the pure `nextMove()` helper recommends, so the tests
 * stay correct if a molecule's dataset changes.
 */
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, screen, within } from '@testing-library/react';
import LewisStructuresPage from './page';
import { renderWithProviders } from '@/test-utils/render';
import { LEWIS_STRUCTURES_CONFIG as CFG } from '@/core-engine/config/games/lewis-structures-config';
import { LEWIS_MESSAGES as M } from '@/core-engine/config/games/lewis-structures-messages';
import { getLewisMolecule, moleculesForLevel } from '@/core-engine/data/lewis-molecules';
import type { LewisMoleculeData, LewisStructure } from '@/core-engine/types/chemistry';
import { createStructure, matchesTarget, nextMove, pairAtoms, prepareRepair } from '@/core-engine/utils/lewis-utils';
import { GUIDED_SEEN_KEY, planLevel, type LewisRound } from '@/hooks/useLewisStructures';

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

const INTRO_KEY = 'hasSeenLewisStructuresInstructions';
const markIntroSeen = () => localStorage.setItem(INTRO_KEY, 'true');
const markGuidesSeen = () => localStorage.setItem(GUIDED_SEEN_KEY, JSON.stringify(['h2', 'h2o']));

// --------------------------------------------------------------------------
// DOM helpers
// --------------------------------------------------------------------------
const arena = () => screen.getByTestId('lewis-arena');
/** A loner dot button ("Oxygen, loner 1 of 2"), never a glossary word. */
const LONER = /loner \d+ of \d+/;
const atomEl = (id: string) => {
  const el = arena().querySelector<HTMLElement>(`[data-atom-id="${id}"]`);
  if (!el) throw new Error(`No atom ${id} on the canvas`);
  return el;
};
const clickLoner = (id: string) => fireEvent.click(within(atomEl(id)).getAllByRole('button', { name: LONER })[0]);
const pairIds = (a: string, b: string) => {
  clickLoner(a);
  clickLoner(b);
};
const coachText = () => screen.getByTestId('coach-panel').textContent ?? '';
const clickButton = (name: string | RegExp) => fireEvent.click(screen.getByRole('button', { name }));

/** Pairs loners on the canvas until the molecule matches its target. */
function buildToTarget(state: LewisStructure, molecule: LewisMoleculeData): LewisStructure {
  for (let step = 0; step < 30 && !matchesTarget(state, molecule); step++) {
    const move = nextMove(state, molecule);
    if (move?.kind !== 'pair') throw new Error(`Unexpected move for ${molecule.id}: ${JSON.stringify(move)}`);
    pairIds(move.atomIds[0], move.atomIds[1]);
    const result = pairAtoms(state, move.atomIds[0], move.atomIds[1]);
    if (!result.ok) throw new Error(`pair rejected: ${result.error}`);
    state = result.structure;
  }
  return state;
}

/** Plays one round from its start to the "Next" button (not pressed). */
function playRound(round: LewisRound) {
  const { molecule } = round;
  expect(arena()).toHaveAttribute('data-molecule', molecule.id);
  if (round.mode === 'build') {
    buildToTarget(createStructure(molecule), molecule);
  } else {
    if (round.diagnosis.type === 'none') {
      clickButton(M.ui.thisOneIsCorrect);
    } else {
      fireEvent.click(within(atomEl(round.diagnosis.atomIds[0])).getByRole('button'));
      clickButton(M.inspect.diagnosis[round.diagnosis.type]);
      buildToTarget(prepareRepair(round.drawing, round.diagnosis), molecule);
    }
    // Count every bond, then every lone pair.
    screen.queryAllByRole('button', { name: /press to count$/ }).forEach((b) => fireEvent.click(b));
    clickButton(M.ui.doneCounting);
    screen.queryAllByRole('button', { name: /press to count$/ }).forEach((b) => fireEvent.click(b));
    clickButton(M.ui.doneCounting);
  }
  expect(screen.getByTestId('round-complete')).toBeInTheDocument();
}

const nextButtonName = (round: LewisRound, last: boolean) =>
  last ? M.ui.finishLevel : round.mode === 'inspect' ? M.ui.nextDrawing : M.ui.nextMolecule;

/** Plays a whole level and presses "Finish level". The plan is recomputed with the same seeded rng the page uses. */
function playLevel(level: number) {
  const rounds = planLevel(level, CFG, () => 0);
  rounds.forEach((round, i) => {
    playRound(round);
    clickButton(nextButtonName(round, i === rounds.length - 1));
  });
}

describe('Share to Fill page (game flow)', () => {
  beforeEach(() => {
    // Deterministic plans: no interleaved drawing has an error at Levels 2-4,
    // Level 5's first drawing is the correct one and the rest use the first
    // applicable mutation on the first candidate atom.
    vi.spyOn(Math, 'random').mockReturnValue(0);
  });

  it('opens the instructions on a first visit, freezes the canvas, and remembers the dismissal', () => {
    renderWithProviders(<LewisStructuresPage />);
    expect(screen.getByRole('heading', { name: M.instructions.title })).toBeInTheDocument();
    expect(screen.getByText(M.instructions.bullets[0])).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: LONER })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'GOT IT' }));
    expect(screen.queryByRole('heading', { name: M.instructions.title })).not.toBeInTheDocument();
    expect(localStorage.getItem(INTRO_KEY)).toBe('true');
    expect(screen.getAllByRole('button', { name: LONER }).length).toBeGreaterThan(0);
  });

  it('skips the instructions once seen and shows the first molecule with the header copy', () => {
    markIntroSeen();
    renderWithProviders(<LewisStructuresPage />);
    expect(screen.queryByRole('heading', { name: M.instructions.title })).not.toBeInTheDocument();
    expect(screen.getByText(M.header.progress(1, 3))).toBeInTheDocument();
    expect(screen.getByText(M.header.build('Hydrogen', 'H2'))).toBeInTheDocument();
    expect(screen.getByText('Level 01')).toBeInTheDocument();
    expect(screen.getByText('Score 0')).toBeInTheDocument();
    expect(arena()).toHaveAttribute('data-molecule', 'h2');
  });

  it('runs the guided H2 script once: the lock shows the final step and scores with the bonus', () => {
    markIntroSeen();
    renderWithProviders(<LewisStructuresPage />);
    expect(coachText()).toContain(M.guided.h2[0]);
    pairIds('a0', 'a1');
    expect(screen.getByTestId('round-complete')).toHaveTextContent(M.guided.h2[1]);
    expect(screen.getByText(M.success.round('Hydrogen', 'H-H'))).toBeInTheDocument();
    expect(screen.getByText(`Score ${CFG.mechanics.pointsPerLevelMultiplier + CFG.mechanics.noHintBonus}`)).toBeInTheDocument();
    clickButton(M.ui.nextMolecule);
    expect(JSON.parse(localStorage.getItem(GUIDED_SEEN_KEY) ?? '[]')).toContain('h2');
    expect(screen.getByText(M.header.progress(2, 3))).toBeInTheDocument();
    expect(arena()).toHaveAttribute('data-molecule', 'cl2');
    // The coach now names the atom with loners instead of the guide.
    expect(coachText()).toContain(M.coach.loners('Chlorine 1', 1));
  });

  it('shows the paired-dot and same-atom diagnostics and undoes a shared pair', () => {
    markIntroSeen();
    markGuidesSeen();
    renderWithProviders(<LewisStructuresPage />);
    pairIds('a0', 'a1');
    clickButton(M.ui.nextMolecule); // -> Cl2
    fireEvent.click(within(atomEl('a0')).getAllByRole('button', { name: /lone pair/ })[0]);
    expect(coachText()).toContain(M.error.pairedDot);
    expect(coachText()).not.toMatch(/^wrong/i);

    clickLoner('a0');
    clickLoner('a0');
    expect(coachText()).toContain(M.error.sameAtom);

    pairIds('a0', 'a1');
    expect(screen.getByTestId('round-complete')).toBeInTheDocument();
  });

  it('offers three hint tiers from the H key and withholds the bonus after tier 2', () => {
    markIntroSeen();
    markGuidesSeen();
    renderWithProviders(<LewisStructuresPage />);
    pairIds('a0', 'a1');
    clickButton(M.ui.nextMolecule); // -> Cl2
    const cl2 = getLewisMolecule('cl2');

    fireEvent.keyDown(window, { key: 'h' });
    expect(screen.getByTestId('lewis-hint')).toHaveTextContent(M.hint.tier1);
    fireEvent.keyDown(window, { key: 'h' });
    expect(screen.getByTestId('lewis-hint')).toHaveTextContent(cl2.tier2Hint);
    fireEvent.keyDown(window, { key: 'h' });
    expect(screen.getByTestId('lewis-hint')).toHaveTextContent(M.hint.tier3('Chlorine 1', 'Chlorine 2'));

    pairIds('a0', 'a1');
    const complete = screen.getByTestId('round-complete');
    expect(complete).toHaveTextContent(M.success.points(CFG.mechanics.pointsPerLevelMultiplier));
    expect(complete).not.toHaveTextContent(M.success.bonus(CFG.mechanics.noHintBonus));
    expect(screen.queryByTestId('lewis-hint')).not.toBeInTheDocument();
  });

  it('clears Level 1 into the level-up overlay and starts Level 2 with the guided water round', () => {
    markIntroSeen();
    renderWithProviders(<LewisStructuresPage />);
    playLevel(1);
    const dialog = screen.getByRole('dialog', { name: M.overlay.levelUp.title });
    expect(dialog).toHaveTextContent(M.overlay.levelUp.description(2, M.overlay.levelChanges[2]));
    expect(recordGameSessionMock).not.toHaveBeenCalled();

    fireEvent.click(within(dialog).getByRole('button', { name: 'Begin Level 2' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByText('Level 02')).toBeInTheDocument();
    expect(screen.getByText(M.header.progress(1, 5))).toBeInTheDocument();
    expect(arena()).toHaveAttribute('data-molecule', 'h2o');
    expect(coachText()).toContain(M.guided.h2o.step1);
    clickButton(M.ui.nextStep);
    expect(coachText()).toContain(M.guided.h2o.step2);
    pairIds('a0', 'a1');
    expect(coachText()).toContain(M.guided.h2o.step2After);
    expect(coachText()).toContain(M.guided.h2o.step3);
    pairIds('a0', 'a2');
    expect(screen.getByTestId('round-complete')).toHaveTextContent(M.guided.h2o.step4);
  });

  it('interleaves a classmate drawing at Level 2: wrong taps and counts are explained, a correct drawing can be confirmed', () => {
    markIntroSeen();
    markGuidesSeen();
    renderWithProviders(<LewisStructuresPage />);
    playLevel(1);
    clickButton('Begin Level 2');
    const rounds = planLevel(2, CFG, () => 0);
    expect(rounds[2]).toMatchObject({ mode: 'inspect', molecule: { id: 'ch4' }, diagnosis: { type: 'none' } });
    playRound(rounds[0]);
    clickButton(M.ui.nextMolecule);
    playRound(rounds[1]);
    clickButton(M.ui.nextMolecule);

    expect(screen.getByText(M.header.inspect('Methane', 'CH4'))).toBeInTheDocument();
    expect(coachText()).toContain(M.inspect.prompt);
    fireEvent.click(within(atomEl('a0')).getByRole('button'));
    expect(coachText()).toContain(M.inspect.missedCorrect);

    clickButton(M.ui.thisOneIsCorrect);
    expect(coachText()).toContain(M.inspect.correctStructure);
    clickButton(M.ui.doneCounting);
    expect(coachText()).toContain(M.inspect.countWrong(0, 4, false));
    screen.getAllByRole('button', { name: /press to count$/ }).forEach((b) => fireEvent.click(b));
    expect(screen.getByTestId('count-readout')).toHaveTextContent(M.inspect.countLabel('bonds', 4));
    clickButton(M.ui.doneCounting);
    expect(coachText()).toContain(M.inspect.countRight('bonds', 4));
    clickButton(M.ui.doneCounting);
    expect(screen.getByTestId('round-complete')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: M.ui.nextDrawing })).toBeInTheDocument();
  });

  it('opens the same-group rounds with the periodic-table coach line', () => {
    markIntroSeen();
    markGuidesSeen();
    renderWithProviders(<LewisStructuresPage />);
    playLevel(1);
    clickButton('Begin Level 2');
    const rounds = planLevel(2, CFG, () => 0);
    for (let i = 0; i < 3; i++) {
      playRound(rounds[i]);
      clickButton(nextButtonName(rounds[i], false));
    }
    expect(arena()).toHaveAttribute('data-molecule', 'h2s');
    expect(coachText()).toContain(M.coach.sameGroup('Sulfur', 'Oxygen', 'Water'));
  });

  it('plays through to victory, records one session with accuracy, and offers the marking sheet', () => {
    markIntroSeen();
    markGuidesSeen();
    renderWithProviders(<LewisStructuresPage />);
    for (let level = 1; level < CFG.levels.maxLevel; level++) {
      playLevel(level);
      clickButton(`Begin Level ${level + 1}`);
    }
    // Level 5: every drawing is a classmate's; the first is correct, the rest need a repair.
    const rounds = planLevel(CFG.levels.maxLevel, CFG, () => 0);
    expect(rounds.every((r) => r.mode === 'inspect')).toBe(true);
    expect(rounds.filter((r) => r.diagnosis.type === 'none')).toHaveLength(1);
    expect(screen.getByText(M.header.marking(1, rounds.length))).toBeInTheDocument();
    // No coach in marking mode until asked.
    expect(coachText()).toContain(M.inspect.prompt);

    rounds.forEach((round, i) => {
      if (round.diagnosis.type !== 'none' && i === 1) {
        // A wrong diagnosis is explained and can be retried.
        fireEvent.click(within(atomEl(round.diagnosis.atomIds[0])).getByRole('button'));
        const wrongType = round.diagnosis.type === 'tooFew' ? 'tooMany' : 'tooFew';
        clickButton(M.inspect.diagnosis[wrongType]);
        expect(coachText()).toContain('Not quite. Count the dots around');
        clickButton(M.inspect.diagnosis[round.diagnosis.type]);
        buildToTarget(prepareRepair(round.drawing, round.diagnosis), round.molecule);
        screen.queryAllByRole('button', { name: /press to count$/ }).forEach((b) => fireEvent.click(b));
        clickButton(M.ui.doneCounting);
        screen.queryAllByRole('button', { name: /press to count$/ }).forEach((b) => fireEvent.click(b));
        clickButton(M.ui.doneCounting);
        expect(screen.getByTestId('round-complete')).toBeInTheDocument();
      } else {
        playRound(round);
      }
      clickButton(nextButtonName(round, i === rounds.length - 1));
    });

    const totalRounds = CFG.levels.roundsByLevel.reduce((a, b) => a + b, 0);
    const expectedScore = CFG.levels.roundsByLevel.reduce(
      (sum, rounds, i) => sum + rounds * (CFG.mechanics.pointsPerLevelMultiplier * (i + 1) + CFG.mechanics.noHintBonus),
      0
    );
    const victory = screen.getByRole('dialog', { name: M.overlay.victory.title });
    expect(victory).toHaveTextContent(M.overlay.victory.description);
    expect(recordGameSessionMock).toHaveBeenCalledTimes(1);
    expect(recordGameSessionMock).toHaveBeenCalledWith(
      expect.objectContaining({
        gameId: 'lewis-structures',
        outcome: 'victory',
        score: expectedScore,
        levelReached: CFG.levels.maxLevel,
        accuracy: 100,
      })
    );

    fireEvent.click(within(victory).getByRole('button', { name: M.ui.openMarkingSheet }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: M.notebook.markingHeader })).toBeInTheDocument();
    expect(screen.getAllByTestId('notebook-entry')).toHaveLength(totalRounds);
    expect(screen.getAllByText(/first try/).length).toBeGreaterThan(0);

    clickButton(M.ui.playAgain);
    expect(screen.getByText('Score 0')).toBeInTheDocument();
    expect(screen.getByText('Level 01')).toBeInTheDocument();
    expect(arena()).toHaveAttribute('data-molecule', 'h2');
  }, 30_000);

  it('records an abandoned session on exit after at least one round', () => {
    markIntroSeen();
    markGuidesSeen();
    renderWithProviders(<LewisStructuresPage />);
    fireEvent.click(screen.getByTitle('Exit Game Session'));
    expect(recordGameSessionMock).not.toHaveBeenCalled();
    expect(pushMock).toHaveBeenCalledWith('/games');

    pairIds('a0', 'a1');
    fireEvent.click(screen.getByTitle('Exit Game Session'));
    expect(recordGameSessionMock).toHaveBeenCalledWith(
      expect.objectContaining({ gameId: 'lewis-structures', outcome: 'abandoned', levelReached: 1, accuracy: 100 })
    );
  });

  it('pauses from the footer or the P key and freezes the canvas; modals never un-pause a paused game', () => {
    markIntroSeen();
    markGuidesSeen();
    renderWithProviders(<LewisStructuresPage />);
    expect(screen.getAllByRole('button', { name: LONER }).length).toBeGreaterThan(0);

    fireEvent.click(screen.getByTitle('Pause Game'));
    const paused = screen.getByRole('dialog', { name: M.overlay.paused.title });
    expect(paused).toHaveTextContent(M.overlay.paused.description);
    expect(screen.queryByRole('button', { name: LONER })).not.toBeInTheDocument();
    fireEvent.click(within(paused).getByRole('button', { name: 'Resume Game' }));
    expect(screen.getAllByRole('button', { name: LONER }).length).toBeGreaterThan(0);

    fireEvent.keyDown(window, { key: 'p' });
    expect(screen.getByRole('dialog', { name: M.overlay.paused.title })).toBeInTheDocument();
    // Opening and closing Settings while paused leaves the game paused.
    fireEvent.click(screen.getByTitle('Settings'));
    expect(screen.queryByRole('dialog', { name: M.overlay.paused.title })).not.toBeInTheDocument();
    expect(screen.getByRole('switch', { name: M.ui.supportMode })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Close settings' }));
    expect(screen.getByRole('dialog', { name: M.overlay.paused.title })).toBeInTheDocument();
    fireEvent.keyDown(window, { key: 'p' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    // Instructions from the footer freeze the canvas and closing them restores it.
    fireEvent.click(screen.getByTitle('How to Play'));
    expect(screen.queryByRole('button', { name: LONER })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'GOT IT' }));
    expect(screen.getAllByRole('button', { name: LONER }).length).toBeGreaterThan(0);
  });

  it('Support mode keeps the coach on at Level 3 and persists, and records a null accuracy', () => {
    markIntroSeen();
    markGuidesSeen();
    localStorage.setItem('chem-games-support-modes', JSON.stringify({ 'lewis-structures': true }));
    renderWithProviders(<LewisStructuresPage />);
    fireEvent.click(screen.getByTitle('Settings'));
    expect(screen.getByRole('switch', { name: M.ui.supportMode })).toHaveAttribute('aria-checked', 'true');
    fireEvent.click(screen.getByRole('button', { name: 'Close settings' }));

    playLevel(1);
    clickButton('Begin Level 2');
    playLevel(2);
    clickButton('Begin Level 3');
    expect(arena()).toHaveAttribute('data-molecule', 'o2');
    expect(coachText()).toContain(M.coach.loners('Oxygen 1', 2));

    pairIds('a0', 'a1');
    fireEvent.click(screen.getByTitle('Exit Game Session'));
    expect(recordGameSessionMock).toHaveBeenLastCalledWith(
      expect.objectContaining({ outcome: 'abandoned', levelReached: 3, accuracy: undefined })
    );
  });

  it('without Support mode the coach waits to be asked from Level 3', () => {
    markIntroSeen();
    markGuidesSeen();
    renderWithProviders(<LewisStructuresPage />);
    playLevel(1);
    clickButton('Begin Level 2');
    playLevel(2);
    clickButton('Begin Level 3');
    expect(arena()).toHaveAttribute('data-molecule', 'o2');
    expect(screen.getByTestId('coach-panel')).toBeEmptyDOMElement();
    fireEvent.keyDown(window, { key: 'h' });
    expect(coachText()).toContain(M.coach.loners('Oxygen 1', 2));
    // Sharing once leaves a loner on each oxygen: the coach introduces "share again".
    pairIds('a0', 'a1');
    expect(coachText()).toContain(M.coach.shareAgain('Oxygen 1', 'Oxygen 2'));
  });
});

// The Level 4 molecules are built from unplaced atoms: the canvas lays out the drawn bonds.
describe('Share to Fill page (Level 4 layout)', () => {
  it('starts Level 4 with the central-atom coach line and lays atoms out as they bond', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    markIntroSeen();
    markGuidesSeen();
    renderWithProviders(<LewisStructuresPage />);
    for (let level = 1; level < 4; level++) {
      playLevel(level);
      clickButton(`Begin Level ${level + 1}`);
    }
    expect(arena()).toHaveAttribute('data-molecule', moleculesForLevel(4)[0].id);
    expect(coachText()).toContain(M.coach.central);
    expect(screen.getByTestId('atom-canvas')).toBeInTheDocument();
  });
});
