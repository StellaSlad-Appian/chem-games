/**
 * The Reaction Balancer arena in isolation: cards, ledger text, the mass
 * beam, diagnostics and the lock, driven by the real rules hook.
 */
import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, screen, within } from '@testing-library/react';
import ReactionBalancerArena from './GameArena';
import { renderWithProviders } from '@/test-utils/render';
import { reactionBalancerMessages } from '@/core-engine/config/games/reaction-balancer-messages';
import { en } from '@/i18n/dictionaries/en';

// Rendered in English, like every component test; the German rendering is
// asserted in the e2e suite against a real browser.
const M = reactionBalancerMessages(en, 'en');
import { GUIDED_SEEN_KEY, useReactionBalancer } from '@/hooks/useReactionBalancer';

function Harness({ level = 1, isPaused = false, supportMode = false }: { level?: number; isPaused?: boolean; supportMode?: boolean }) {
  const game = useReactionBalancer({ level, supportMode, isPaused, rng: () => 0 });
  return <ReactionBalancerArena game={game} isPaused={isPaused} />;
}

const renderArena = (props: { level?: number; isPaused?: boolean; supportMode?: boolean } = {}) => renderWithProviders(<Harness {...props} />);

const input = (name: string, formula: string) => screen.getByLabelText(M.card.coefficient(name, formula)) as HTMLInputElement;
const card = (formula: string) => document.querySelector<HTMLElement>(`[data-testid="compound-card"][data-formula="${formula}"]`)!;
const coach = () => screen.getByTestId('coach-panel');
const ledgerRow = (element: string) => document.querySelector<HTMLElement>(`[data-testid="ledger-row"][data-element="${element}"]`)!;

describe('Reaction Balancer GameArena', () => {
  beforeEach(() => localStorage.setItem(GUIDED_SEEN_KEY, 'true'));

  it('shows water synthesis as three cards with the ledger in words and the beam readout', () => {
    renderArena();
    expect(screen.getByRole('heading', { name: 'Water Synthesis' })).toBeInTheDocument();
    expect(input('hydrogen', 'H2')).toBeInTheDocument();
    expect(input('oxygen', 'O2')).toBeInTheDocument();
    expect(input('water', 'H2O')).toBeInTheDocument();
    expect(screen.getAllByTestId('compound-card')).toHaveLength(3);
    expect(input('water', 'H2O').value).toBe(''); // a coefficient of 1 is left blank
    expect(ledgerRow('H')).toHaveTextContent('Hydrogen');
    expect(ledgerRow('H')).toHaveTextContent(M.ledger.balancedRow);
    expect(ledgerRow('O')).toHaveTextContent(M.ledger.needsMore(1, 'right'));
    expect(ledgerRow('O')).toHaveTextContent(M.ledger.nextUp); // Level 1 highlight
    expect(ledgerRow('O')).toHaveAttribute('data-balanced', 'false');
    expect(screen.getByTestId('mass-beam')).toHaveAttribute('data-level', 'false');
    expect(screen.getByTestId('mass-beam')).toHaveTextContent('Relative mass');
    expect(coach()).toHaveTextContent(M.coach.imbalance('Oxygen', 2, 1));
    expect(screen.getByTestId('equation-text')).toHaveTextContent('H2(g) + O2(g) → H2O(l)');
  });

  it('▲ / ▼ and typing update the ledger, clusters and equation in the same render', () => {
    renderArena();
    fireEvent.click(within(card('H2O')).getByRole('button', { name: M.card.increase('water') }));
    expect(input('water', 'H2O').value).toBe('2');
    expect(ledgerRow('O')).toHaveTextContent(M.ledger.balancedRow);
    expect(ledgerRow('H')).toHaveTextContent(M.ledger.needsMore(2, 'left'));
    expect(within(card('H2O')).getByTestId('particle-clusters')).toHaveAttribute('data-count', '2');
    expect(screen.getByTestId('equation-text')).toHaveTextContent('H2(g) + O2(g) → 2H2O(l)');
    expect(coach()).toHaveTextContent(M.coach.multiple('Oxygen', 'Hydrogen'));

    fireEvent.click(within(card('H2O')).getByRole('button', { name: M.card.decrease('water') }));
    expect(input('water', 'H2O').value).toBe('');

    fireEvent.change(input('hydrogen', 'H2'), { target: { value: '2' } });
    expect(ledgerRow('H')).toHaveTextContent(M.ledger.needsMore(2, 'right'));

    fireEvent.keyDown(input('water', 'H2O'), { key: 'ArrowUp' });
    expect(input('water', 'H2O').value).toBe('2');
    expect(screen.getByTestId('round-complete')).toBeInTheDocument();
  });

  it('explains a zero, a too-big number, a stray letter and a subscript tap', () => {
    renderArena();
    fireEvent.click(within(card('O2')).getByRole('button', { name: M.card.decrease('oxygen') }));
    expect(coach()).toHaveTextContent("A coefficient can't be 0");
    expect(coach()).toHaveTextContent('O2');
    expect(coach().querySelector('[data-tone="error"]')).not.toBeNull();

    fireEvent.change(input('oxygen', 'O2'), { target: { value: '99' } });
    expect(coach()).toHaveTextContent(M.error.max);
    expect(input('oxygen', 'O2').value).toBe('99'); // the typed text stays until blur
    fireEvent.blur(input('oxygen', 'O2'));
    expect(input('oxygen', 'O2').value).toBe('');

    fireEvent.change(input('oxygen', 'O2'), { target: { value: 'x' } });
    expect(coach()).toHaveTextContent(M.error.notANumber);

    fireEvent.click(within(card('H2O')).getByRole('button', { name: M.card.formulaTap('water') }));
    expect(coach()).toHaveTextContent('Subscripts are locked');
    expect(coach()).toHaveTextContent('H2O2');
    expect(coach().textContent?.toLowerCase().startsWith('not that move')).toBe(true);
  });

  it('locks the equation, shows the balanced form, the points and Next; the cards freeze', () => {
    renderArena();
    fireEvent.change(input('hydrogen', 'H2'), { target: { value: '2' } });
    fireEvent.change(input('water', 'H2O'), { target: { value: '2' } });
    const complete = screen.getByTestId('round-complete');
    expect(complete).toHaveTextContent('Balanced!');
    expect(complete).toHaveTextContent('2H2(g) + O2(g) → 2H2O(l)');
    expect(complete).toHaveTextContent(M.coach.balanced);
    expect(complete).toHaveTextContent(M.success.points(150));
    expect(complete).toHaveTextContent(M.success.bonus(50));
    expect(screen.getByRole('button', { name: M.ui.nextReaction })).toHaveFocus();
    expect(input('hydrogen', 'H2')).toBeDisabled();
    expect(screen.getByTestId('ledger-all-balanced')).toBeInTheDocument();
    expect(screen.getByTestId('mass-beam')).toHaveAttribute('data-level', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('The equation is locked');
  });

  it('simplifies a multiple on lock and explains the common factor', () => {
    renderArena();
    fireEvent.change(input('hydrogen', 'H2'), { target: { value: '4' } });
    fireEvent.change(input('oxygen', 'O2'), { target: { value: '2' } });
    fireEvent.change(input('water', 'H2O'), { target: { value: '4' } });
    const complete = screen.getByTestId('round-complete');
    expect(complete).toHaveTextContent('every coefficient can be divided by 2');
    expect(input('hydrogen', 'H2').value).toBe('2');
    expect(complete).not.toHaveTextContent(M.success.bonus(50));
  });

  it('disables every control while paused', () => {
    renderArena({ isPaused: true });
    expect(input('hydrogen', 'H2')).toBeDisabled();
    expect(within(card('H2O')).getByRole('button', { name: M.card.increase('water') })).toBeDisabled();
    fireEvent.change(input('water', 'H2O'), { target: { value: '2' } });
    expect(ledgerRow('O')).toHaveTextContent(M.ledger.needsMore(1, 'right'));
  });

  it('Level 3 shows the observation and formula-only cards; Level 4 hides the ledger behind a toggle', () => {
    renderArena({ level: 3 });
    expect(screen.getByTestId('observation')).toBeInTheDocument();
    expect(screen.queryByTestId('particle-clusters')).not.toBeInTheDocument();
    expect(screen.getByTestId('atom-ledger')).toBeInTheDocument();
    expect(coach()).toBeEmptyDOMElement();
  });

  it('Level 4 hides the ledger behind a toggle that names its cost', () => {
    renderArena({ level: 4 });
    expect(screen.queryByTestId('atom-ledger')).not.toBeInTheDocument();
    expect(screen.getByText(M.ledger.showCost)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: M.ledger.show }));
    expect(screen.getByTestId('atom-ledger')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: M.ledger.hide })).toHaveAttribute('aria-pressed', 'true');
  });

  it('Support mode keeps the ledger, clusters and coach on at Level 4', () => {
    renderArena({ level: 4, supportMode: true });
    expect(screen.getByTestId('atom-ledger')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: M.ledger.show })).not.toBeInTheDocument();
    expect(screen.getAllByTestId('particle-clusters').length).toBeGreaterThan(0);
    expect(coach()).not.toBeEmptyDOMElement();
  });

  it('the Challenge level opens with the word equation and a compound picker', () => {
    renderArena({ level: 5 });
    expect(screen.getByTestId('challenge-prompt')).toBeInTheDocument();
    expect(screen.getByTestId('compound-picker')).toBeInTheDocument();
    expect(screen.queryByTestId('compound-card')).not.toBeInTheDocument();
    expect(coach()).toHaveTextContent(M.challenge.intro);
    const tiles = screen.getAllByTestId('compound-tile');
    expect(tiles.length).toBeGreaterThan(3);
  });
});
