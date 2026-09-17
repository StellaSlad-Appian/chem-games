import { expect, test, type Page } from '@playwright/test';
import { REACTION_BALANCER_MESSAGES as M } from '../src/core-engine/config/games/reaction-balancer-messages';
import { getReaction } from '../src/core-engine/data/reactions';
import { WATER_REACTION_ID, answerCoefficients, parseReaction } from '../src/core-engine/utils/balancer-utils';
import { footerButton, hintButton, openGame, overlay } from './helpers';

const coefficient = (page: Page, name: string, formula: string) => page.getByLabel(M.card.coefficient(name, formula), { exact: true });
const card = (page: Page, formula: string) => page.locator(`[data-testid="compound-card"][data-formula="${formula}"]`);
const increase = (page: Page, formula: string, name: string) => card(page, formula).getByRole('button', { name: M.card.increase(name) });
const decrease = (page: Page, formula: string, name: string) => card(page, formula).getByRole('button', { name: M.card.decrease(name) });
const ledgerRow = (page: Page, element: string) => page.locator(`[data-testid="ledger-row"][data-element="${element}"]`);
const coach = (page: Page) => page.getByTestId('coach-panel');
const arena = (page: Page) => page.getByTestId('balancer-arena');

test.describe('Reaction Balancer', () => {
  test('first visit shows the instructions, which freeze the cards until dismissed', async ({ page }) => {
    await openGame(page, 'reaction-balancer', { showBalancerIntro: true });
    await expect(page.getByRole('heading', { name: M.instructions.title })).toBeVisible();
    await expect(page.getByText(M.instructions.lead)).toBeVisible();
    await expect(page.getByText('Tab')).toBeVisible();
    await expect(coefficient(page, 'water', 'H2O')).toBeDisabled();
    await page.getByRole('button', { name: 'GOT IT' }).click();
    await expect(page.getByRole('heading', { name: M.instructions.title })).toBeHidden();
    await expect(coefficient(page, 'water', 'H2O')).toBeEnabled();
    expect(await page.evaluate(() => window.localStorage.getItem('hasSeenReactionBalancerInstructions'))).toBe('true');
  });

  test('level 1 opens with water synthesis; ▲ on water then ▲ on hydrogen locks the equation', async ({ page }) => {
    await openGame(page, 'reaction-balancer');
    await expect(page.getByText(M.header.balance('Water Synthesis'))).toBeVisible();
    await expect(page.getByText(M.header.progress(1, 3))).toBeVisible();
    await expect(arena(page)).toHaveAttribute('data-reaction', WATER_REACTION_ID);
    await expect(ledgerRow(page, 'O')).toContainText(M.ledger.needsMore(1, 'right'));
    await expect(ledgerRow(page, 'O')).toContainText(M.ledger.nextUp);
    await expect(coach(page)).toContainText(M.coach.imbalance('Oxygen', 2, 1));
    await expect(page.getByTestId('mass-beam')).toHaveAttribute('data-level', 'false');

    await increase(page, 'H2O', 'water').click();
    await expect(coefficient(page, 'water', 'H2O')).toHaveValue('2');
    await expect(ledgerRow(page, 'O')).toContainText(M.ledger.balancedRow);
    await expect(ledgerRow(page, 'H')).toContainText(M.ledger.needsMore(2, 'left'));
    await expect(coach(page)).toContainText(M.coach.multiple('Oxygen', 'Hydrogen'));
    await expect(card(page, 'H2O').getByTestId('particle-clusters')).toHaveAttribute('data-count', '2');

    await increase(page, 'H2', 'hydrogen').click();
    await expect(page.getByTestId('round-complete')).toContainText('Balanced!');
    await expect(page.getByTestId('round-complete')).toContainText(M.coach.balanced);
    await expect(page.getByText(`Score ${100 + 50}`)).toBeVisible();
    await expect(arena(page)).toHaveAttribute('data-phase', 'done');
    await expect(page.getByTestId('mass-beam')).toHaveAttribute('data-level', 'true');
    await expect(coefficient(page, 'water', 'H2O')).toBeDisabled();
  });

  test('the guided first reaction walks four steps and never reappears', async ({ page }) => {
    await openGame(page, 'reaction-balancer', { showBalancerGuide: true });
    await expect(coach(page)).toContainText(M.guided.stepLabel(1, 4));
    await expect(coach(page)).toContainText('Oxygen needs fixing');
    // Scoped to the coach strip: the Next.js dev-tools button is also named "…Next…".
    await coach(page).getByRole('button', { name: M.ui.nextStep }).click();
    await expect(coach(page)).toContainText('Press ▲ on');
    await increase(page, 'H2O', 'water').click();
    await expect(coach(page)).toContainText('hydrogen changed');
    await increase(page, 'H2', 'hydrogen').click();
    await expect(page.getByTestId('round-complete')).toContainText('You just conserved mass');
    await page.getByRole('button', { name: M.ui.nextReaction }).click();
    expect(await page.evaluate(() => window.localStorage.getItem('reactionBalancerGuidedSeen'))).toBe('true');
    await expect(coach(page)).not.toContainText('Guided step');
  });

  test('typing and the keyboard alone balance the equation', async ({ page }) => {
    await openGame(page, 'reaction-balancer');
    await coefficient(page, 'hydrogen', 'H2').fill('2');
    await expect(ledgerRow(page, 'H')).toContainText(M.ledger.needsMore(2, 'right'));
    await coefficient(page, 'water', 'H2O').focus();
    await page.keyboard.press('ArrowUp');
    await expect(page.getByTestId('round-complete')).toBeVisible();
  });

  test('a zero, a huge number and a subscript tap are each explained', async ({ page }) => {
    await openGame(page, 'reaction-balancer');
    await decrease(page, 'O2', 'oxygen').click();
    await expect(coach(page)).toContainText("A coefficient can't be 0");
    await expect(coach(page)).toContainText(M.error.label);

    await coefficient(page, 'oxygen', 'O2').fill('40');
    await expect(coach(page)).toContainText(M.error.max);

    await card(page, 'H2O').getByRole('button', { name: M.card.formulaTap('water') }).click();
    await expect(coach(page)).toContainText('Subscripts are locked');
  });

  test('the hint ladder climbs from which-element to strategy to one coefficient, pulsing the card', async ({ page }) => {
    await openGame(page, 'reaction-balancer');
    await hintButton(page).click();
    await expect(page.getByTestId('balancer-hint')).toContainText(M.hint.tier1('Oxygen'));
    await page.keyboard.press('h');
    await expect(page.getByTestId('balancer-hint')).toContainText(getReaction(WATER_REACTION_ID).hint as string);
    await page.keyboard.press('h');
    await expect(page.getByTestId('balancer-hint')).toContainText('Put a 2 in front of');
    await expect(card(page, 'H2O')).toHaveClass(/card-pulse/);
    await page.getByRole('button', { name: M.ui.dismissHint }).click();
    await expect(page.getByTestId('balancer-hint')).toBeHidden();
  });

  test('clearing level 1 shows the level-up overlay and level 2 loads a new reaction', async ({ page }) => {
    await openGame(page, 'reaction-balancer');
    for (let i = 0; i < 3; i++) {
      const id = (await arena(page).getAttribute('data-reaction')) as string;
      await balanceCurrent(page, id);
      await page.getByRole('button', { name: new RegExp(`${M.ui.nextReaction}|${M.ui.finishLevel}`) }).click();
    }
    await expect(overlay(page, M.overlay.levelUp.title)).toBeVisible();
    await expect(overlay(page)).toContainText(M.overlay.levelUp.badge);
    await page.getByRole('button', { name: 'Begin Level 2' }).click();
    await expect(overlay(page)).toBeHidden();
    await expect(page.getByText('Level 02')).toBeVisible();
    await expect(page.getByText(M.header.progress(1, 3))).toBeVisible();
  });

  test('pausing from the footer freezes the cards; resuming restores them', async ({ page }) => {
    await openGame(page, 'reaction-balancer');
    await footerButton(page, 'Pause Game').click();
    await expect(overlay(page, M.overlay.paused.title)).toBeVisible();
    await expect(coefficient(page, 'water', 'H2O')).toBeDisabled();
    await overlay(page).getByRole('button', { name: 'Resume Game' }).click();
    await expect(overlay(page)).toBeHidden();
    await expect(coefficient(page, 'water', 'H2O')).toBeEnabled();
  });

  test('settings offers Support mode and it persists', async ({ page }) => {
    await openGame(page, 'reaction-balancer');
    await footerButton(page, 'Settings').click();
    const toggle = page.getByRole('switch', { name: M.ui.supportMode });
    await expect(toggle).toHaveAttribute('aria-checked', 'false');
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-checked', 'true');
    expect(await page.evaluate(() => window.localStorage.getItem('chem-games-support-modes'))).toContain('reaction-balancer');
  });
});

/** Types the stored answer for the reaction on screen until it locks. */
async function balanceCurrent(page: Page, reactionId: string): Promise<void> {
  const parsed = parseReaction(getReaction(reactionId));
  const answer = answerCoefficients(parsed);
  for (let i = 0; i < answer.length; i++) {
    if (await page.getByTestId('round-complete').isVisible()) break;
    if (answer[i] === 1) continue;
    await coefficient(page, parsed.species[i].name, parsed.species[i].bare).fill(String(answer[i]));
  }
  await expect(page.getByTestId('round-complete')).toBeVisible();
}
