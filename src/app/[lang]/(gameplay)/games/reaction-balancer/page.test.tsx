/**
 * Scenario tests for the Reaction Balancer game flow (page level). The real
 * rules hook and arena run; reactions are balanced by typing the stored
 * answer coefficients, so the tests stay correct if the dataset changes. The
 * Supabase server action is mocked so the test can assert what gets recorded.
 */
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, screen, within } from '@testing-library/react';
import ReactionBalancerPage from './page';
import { renderWithProviders } from '@/test-utils/render';
import { REACTION_BALANCER_CONFIG as CFG } from '@/core-engine/config/games/reaction-balancer-config';
import { reactionBalancerMessages } from '@/i18n/game-messages/reaction-balancer';
import { en } from '@/i18n/dictionaries/en';

// Rendered in English, like every component test; the German rendering is
// asserted in the e2e suite against a real browser.
const M = reactionBalancerMessages(en, 'en');
import { getReaction } from '@/core-engine/data/reactions';
import { WATER_REACTION_ID, answerCoefficients, planBalancerLevel, type BalancerRound, type ParsedReaction } from '@/core-engine/utils/balancer-utils';
import { GUIDED_SEEN_KEY } from '@/hooks/useReactionBalancer';

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

const INTRO_KEY = 'hasSeenReactionBalancerInstructions';
const markIntroSeen = () => localStorage.setItem(INTRO_KEY, 'true');
const markGuideSeen = () => localStorage.setItem(GUIDED_SEEN_KEY, 'true');

// --------------------------------------------------------------------------
// DOM helpers
// --------------------------------------------------------------------------
const arena = () => screen.getByTestId('balancer-arena');
const input = (name: string, formula: string) => screen.getByLabelText(M.card.coefficient(name, formula)) as HTMLInputElement;
const card = (formula: string) => document.querySelector<HTMLElement>(`[data-testid="compound-card"][data-formula="${formula}"]`)!;
const coachText = () => screen.getByTestId('coach-panel').textContent ?? '';
const clickButton = (name: string | RegExp) => fireEvent.click(screen.getByRole('button', { name }));
const zero = () => 0;

/** Types the stored answer into each card until the round locks. */
function balance(parsed: ParsedReaction) {
  const answer = answerCoefficients(parsed);
  for (let i = 0; i < answer.length; i++) {
    if (screen.queryByTestId('round-complete')) break;
    if (answer[i] === 1) continue;
    const species = parsed.species[i];
    fireEvent.change(input(species.name, species.bare), { target: { value: String(answer[i]) } });
  }
  expect(screen.getByTestId('round-complete')).toBeInTheDocument();
}

/** Builds a Challenge equation from the picker, then balances it. */
function buildAndBalance(round: BalancerRound) {
  const target = round.parsed;
  target.reactants.forEach((s) => fireEvent.click(screen.getByRole('button', { name: M.challenge.addAs(s.name, s.bare, 'reactant') })));
  clickButton(M.challenge.products);
  target.products.forEach((s) => fireEvent.click(screen.getByRole('button', { name: M.challenge.addAs(s.name, s.bare, 'product') })));
  if (!screen.queryByTestId('round-complete')) balance(target);
  expect(screen.getByTestId('round-complete')).toBeInTheDocument();
}

/** Plays a whole level and presses "Finish level"; the plan is recomputed with the seeded rng the page uses. */
function playLevel(level: number) {
  const rounds = planBalancerLevel(level, CFG, zero);
  rounds.forEach((round, i) => {
    expect(arena()).toHaveAttribute('data-reaction', round.reaction.id);
    if (round.mode === 'challenge') buildAndBalance(round);
    else balance(round.parsed);
    clickButton(i === rounds.length - 1 ? M.ui.finishLevel : M.ui.nextReaction);
  });
}

const pointsForLevel = (level: number) =>
  CFG.levels.reactionsPerLevel * (CFG.mechanics.pointsPerLevelMultiplier * level + CFG.mechanics.lowestTermsBonus);

describe('Reaction Balancer page (game flow)', () => {
  beforeEach(() => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
  });

  it('opens the instructions on a first visit, freezes the cards, and remembers the dismissal', () => {
    renderWithProviders(<ReactionBalancerPage />);
    expect(screen.getByRole('heading', { name: M.instructions.title })).toBeInTheDocument();
    expect(screen.getByText(M.instructions.lead)).toBeInTheDocument();
    expect(screen.getByText(/The first hint is always free/)).toBeInTheDocument();
    expect(screen.getByText('Tab')).toBeInTheDocument();
    expect(input('water', 'H2O')).toBeDisabled();

    fireEvent.click(screen.getByRole('button', { name: 'GOT IT' }));
    expect(screen.queryByRole('heading', { name: M.instructions.title })).not.toBeInTheDocument();
    expect(localStorage.getItem(INTRO_KEY)).toBe('true');
    expect(input('water', 'H2O')).toBeEnabled();
  });

  it('skips the instructions once seen and shows water synthesis with the header copy', () => {
    markIntroSeen();
    markGuideSeen();
    renderWithProviders(<ReactionBalancerPage />);
    expect(screen.queryByRole('heading', { name: M.instructions.title })).not.toBeInTheDocument();
    expect(screen.getByText(M.header.progress(1, CFG.levels.reactionsPerLevel))).toBeInTheDocument();
    expect(screen.getByText(M.header.balance('Water Synthesis'))).toBeInTheDocument();
    expect(screen.getByText('Level 01')).toBeInTheDocument();
    expect(screen.getByText('Score 0')).toBeInTheDocument();
    expect(arena()).toHaveAttribute('data-reaction', WATER_REACTION_ID);
    expect(arena()).toHaveAttribute('data-phase', 'balance');
  });

  it('walks the guided first reaction once, step by step, and scores with the bonus', () => {
    markIntroSeen();
    renderWithProviders(<ReactionBalancerPage />);
    expect(coachText()).toContain(M.guided.steps[0]);
    expect(coachText()).toContain(M.guided.stepLabel(1, 4));
    clickButton(M.ui.nextStep);
    expect(coachText()).toContain('Press ▲ on');
    fireEvent.click(within(card('H2O')).getByRole('button', { name: M.card.increase('water') }));
    expect(coachText()).toContain('hydrogen changed');
    fireEvent.click(within(card('H2')).getByRole('button', { name: M.card.increase('hydrogen') }));
    const complete = screen.getByTestId('round-complete');
    expect(complete).toHaveTextContent('You just conserved mass');
    expect(screen.getByText(`Score ${CFG.mechanics.pointsPerLevelMultiplier + CFG.mechanics.lowestTermsBonus}`)).toBeInTheDocument();
    clickButton(M.ui.nextReaction);
    expect(localStorage.getItem(GUIDED_SEEN_KEY)).toBe('true');
    expect(screen.getByText(M.header.progress(2, CFG.levels.reactionsPerLevel))).toBeInTheDocument();
    expect(coachText()).not.toContain('Guided step');
  });

  it('the guide can be skipped and the coach takes over', () => {
    markIntroSeen();
    renderWithProviders(<ReactionBalancerPage />);
    clickButton(M.ui.skipGuide);
    expect(coachText()).toContain(M.coach.imbalance('Oxygen', 2, 1));
    expect(localStorage.getItem(GUIDED_SEEN_KEY)).toBe('true');
  });

  it('offers three hint tiers from the H key and the lightbulb and withholds the bonus after tier 2', () => {
    markIntroSeen();
    markGuideSeen();
    renderWithProviders(<ReactionBalancerPage />);
    fireEvent.keyDown(window, { key: 'h' });
    expect(screen.getByTestId('balancer-hint')).toHaveTextContent(M.hint.tier1('Oxygen'));
    fireEvent.click(screen.getByTitle('Get Hint'));
    expect(screen.getByTestId('balancer-hint')).toHaveTextContent(getReaction(WATER_REACTION_ID).hint as string);
    fireEvent.keyDown(window, { key: 'h' });
    expect(screen.getByTestId('balancer-hint')).toHaveTextContent('Put a 2 in front of H2O');
    expect(card('H2O').className).toContain('card-pulse');

    // H still works while a coefficient input has focus.
    input('water', 'H2O').focus();
    fireEvent.keyDown(input('water', 'H2O'), { key: 'h' });

    balance(planBalancerLevel(1, CFG, zero)[0].parsed);
    const complete = screen.getByTestId('round-complete');
    expect(complete).toHaveTextContent(M.success.points(CFG.mechanics.pointsPerLevelMultiplier));
    expect(complete).not.toHaveTextContent(M.success.bonus(CFG.mechanics.lowestTermsBonus));
    expect(screen.queryByTestId('balancer-hint')).not.toBeInTheDocument();
  });

  it('clears Level 1 into the level-up overlay and starts Level 2 with a new plan', () => {
    markIntroSeen();
    markGuideSeen();
    renderWithProviders(<ReactionBalancerPage />);
    playLevel(1);
    const dialog = screen.getByRole('dialog', { name: M.overlay.levelUp.title });
    expect(dialog).toHaveTextContent(M.overlay.levelUp.badge);
    expect(dialog).toHaveTextContent(M.overlay.levelUp.description(2, M.overlay.levelChanges[2]));
    expect(recordGameSessionMock).not.toHaveBeenCalled();
    expect(screen.getByText(`Score ${pointsForLevel(1)}`)).toBeInTheDocument();

    fireEvent.click(within(dialog).getByRole('button', { name: 'Begin Level 2' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByText('Level 02')).toBeInTheDocument();
    expect(screen.getByText(M.header.progress(1, CFG.levels.reactionsPerLevel))).toBeInTheDocument();
    expect(arena()).toHaveAttribute('data-reaction', planBalancerLevel(2, CFG, zero)[0].reaction.id);
    // Level 2: no next-row highlight.
    expect(screen.queryByText(new RegExp(M.ledger.nextUp))).not.toBeInTheDocument();
  });

  it('plays to victory, records one session, offers the Challenge as a second session, and opens the notebook', () => {
    markIntroSeen();
    markGuideSeen();
    renderWithProviders(<ReactionBalancerPage />);
    for (let level = 1; level < CFG.levels.maxLevel; level++) {
      playLevel(level);
      clickButton(`Begin Level ${level + 1}`);
    }
    // Level 4: the ledger is hidden until asked.
    expect(screen.queryByTestId('atom-ledger')).not.toBeInTheDocument();
    playLevel(CFG.levels.maxLevel);

    const expectedScore = [1, 2, 3, 4].reduce((sum, level) => sum + pointsForLevel(level), 0);
    const victory = screen.getByRole('dialog', { name: M.overlay.victory.title });
    expect(victory).toHaveTextContent(M.overlay.victory.description);
    expect(recordGameSessionMock).toHaveBeenCalledTimes(1);
    expect(recordGameSessionMock).toHaveBeenCalledWith(
      expect.objectContaining({ gameId: 'reaction-balancer', outcome: 'victory', score: expectedScore, levelReached: CFG.levels.maxLevel, accuracy: 100 })
    );

    fireEvent.click(within(victory).getByRole('button', { name: M.ui.tryChallenge }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByText('Level 05')).toBeInTheDocument();
    expect(screen.getByText(M.header.challengeProgress(1, CFG.levels.reactionsPerLevel))).toBeInTheDocument();
    expect(arena()).toHaveAttribute('data-phase', 'build');
    const rounds = planBalancerLevel(CFG.levels.challengeLevel, CFG, zero);
    expect(screen.getByTestId('challenge-prompt')).toHaveTextContent(rounds[0].reaction.prompt as string);

    // A wrong compound and a wrong side are both explained.
    const distractor = rounds[0].distractors[0];
    fireEvent.click(document.querySelector<HTMLElement>(`[data-testid="compound-tile"][data-formula="${distractor}"]`)!);
    expect(coachText()).toContain('is not part of this reaction');
    const product = rounds[0].parsed.products[0];
    fireEvent.click(screen.getByRole('button', { name: M.challenge.addAs(product.name, product.bare, 'reactant') }));
    expect(coachText()).toContain(M.challenge.wrongSide(product.name, 'product'));

    playLevel(CFG.levels.challengeLevel);
    const done = screen.getByRole('dialog', { name: M.overlay.challengeComplete.title });
    expect(done).toHaveTextContent(M.overlay.challengeComplete.description);
    expect(within(done).queryByRole('button', { name: M.ui.tryChallenge })).not.toBeInTheDocument();
    expect(recordGameSessionMock).toHaveBeenCalledTimes(2);
    expect(recordGameSessionMock).toHaveBeenLastCalledWith(
      expect.objectContaining({ outcome: 'victory', score: expectedScore + pointsForLevel(5), levelReached: CFG.levels.challengeLevel })
    );

    fireEvent.click(within(done).getByRole('button', { name: M.ui.openNotebook }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: M.notebook.header })).toBeInTheDocument();
    expect(screen.getAllByTestId('notebook-entry')).toHaveLength(CFG.levels.reactionsPerLevel * CFG.levels.challengeLevel);
    expect(screen.getAllByText(M.notebook.noHint).length).toBeGreaterThan(0);

    clickButton(M.ui.playAgain);
    expect(screen.getByText('Score 0')).toBeInTheDocument();
    expect(screen.getByText('Level 01')).toBeInTheDocument();
    expect(arena()).toHaveAttribute('data-reaction', WATER_REACTION_ID);
  }, 60_000);

  it('records an abandoned session on exit after at least one round', () => {
    markIntroSeen();
    markGuideSeen();
    renderWithProviders(<ReactionBalancerPage />);
    fireEvent.click(screen.getByTitle('Exit Game Session'));
    expect(recordGameSessionMock).not.toHaveBeenCalled();
    expect(pushMock).toHaveBeenCalledWith('/en/games');

    balance(planBalancerLevel(1, CFG, zero)[0].parsed);
    fireEvent.click(screen.getByTitle('Exit Game Session'));
    expect(recordGameSessionMock).toHaveBeenCalledWith(
      expect.objectContaining({ gameId: 'reaction-balancer', outcome: 'abandoned', levelReached: 1, accuracy: 100 })
    );
  });

  it('pauses from the footer or the P key and freezes the cards; modals never un-pause a paused game', () => {
    markIntroSeen();
    markGuideSeen();
    renderWithProviders(<ReactionBalancerPage />);
    expect(input('water', 'H2O')).toBeEnabled();

    fireEvent.click(screen.getByTitle('Pause Game'));
    const paused = screen.getByRole('dialog', { name: M.overlay.paused.title });
    expect(paused).toHaveTextContent(M.overlay.paused.description);
    fireEvent.click(within(paused).getByRole('button', { name: 'Resume Game' }));
    expect(input('water', 'H2O')).toBeEnabled();

    fireEvent.keyDown(window, { key: 'p' });
    expect(screen.getByRole('dialog', { name: M.overlay.paused.title })).toBeInTheDocument();
    fireEvent.click(screen.getByTitle('Settings'));
    expect(screen.queryByRole('dialog', { name: M.overlay.paused.title })).not.toBeInTheDocument();
    expect(screen.getByRole('switch', { name: M.ui.supportMode })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Close settings' }));
    expect(screen.getByRole('dialog', { name: M.overlay.paused.title })).toBeInTheDocument();
    fireEvent.keyDown(window, { key: 'p' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    fireEvent.click(screen.getByTitle('How to Play'));
    expect(input('water', 'H2O')).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'GOT IT' }));
    expect(input('water', 'H2O')).toBeEnabled();
  });

  it('Support mode keeps the coach and ledger on at Levels 3-4, persists, and records a null accuracy', () => {
    markIntroSeen();
    markGuideSeen();
    localStorage.setItem('chem-games-support-modes', JSON.stringify({ 'reaction-balancer': true }));
    renderWithProviders(<ReactionBalancerPage />);
    fireEvent.click(screen.getByTitle('Settings'));
    expect(screen.getByRole('switch', { name: M.ui.supportMode })).toHaveAttribute('aria-checked', 'true');
    fireEvent.click(screen.getByRole('button', { name: 'Close settings' }));

    for (let level = 1; level < 4; level++) {
      playLevel(level);
      clickButton(`Begin Level ${level + 1}`);
    }
    expect(screen.getByTestId('atom-ledger')).toBeInTheDocument();
    expect(coachText()).not.toBe('');
    balance(planBalancerLevel(4, CFG, zero)[0].parsed);
    fireEvent.click(screen.getByTitle('Exit Game Session'));
    expect(recordGameSessionMock).toHaveBeenLastCalledWith(expect.objectContaining({ outcome: 'abandoned', levelReached: 4, accuracy: undefined }));
  });

  it('without Support mode the coach waits to be asked from Level 3', () => {
    markIntroSeen();
    markGuideSeen();
    renderWithProviders(<ReactionBalancerPage />);
    playLevel(1);
    clickButton('Begin Level 2');
    playLevel(2);
    clickButton('Begin Level 3');
    expect(screen.getByTestId('coach-panel')).toBeEmptyDOMElement();
    expect(screen.getByTestId('observation')).toBeInTheDocument();
    fireEvent.keyDown(window, { key: 'h' });
    expect(coachText()).not.toBe('');
    expect(screen.getByTestId('balancer-hint')).toHaveAttribute('data-tier', '1');
  });
});
