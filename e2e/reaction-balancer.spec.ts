import { expect, test, type Page } from '@playwright/test';
import { reactions } from '../src/core-engine/data/reactions';
import { footerButton, openGame, overlay } from './helpers';

const coefficient = (page: Page, formula: string) =>
  page.getByLabel(`Coefficient for ${formula}`, { exact: true });
const checkAnswer = (page: Page) => page.getByRole('button', { name: 'Check Answer' });

test.describe('Reaction Balancer', () => {
  test.beforeEach(async ({ page }) => {
    await openGame(page, 'reaction-balancer');
  });

  test('level 1 presents Water Synthesis with one coefficient input per compound', async ({ page }) => {
    await expect(page.getByRole('heading', { name: reactions[0].name })).toBeVisible();
    for (const formula of ['H2', 'O2', 'H2O']) {
      await expect(coefficient(page, formula)).toBeVisible();
      await expect(coefficient(page, formula)).toHaveValue('');
    }
    await expect(page.getByText('Level 01')).toBeVisible();
    await expect(page.getByText('Score 0')).toBeVisible();
  });

  test('entering the balanced coefficients clears the level and loads the next reaction', async ({ page }) => {
    await coefficient(page, 'H2').fill('2');
    await coefficient(page, 'H2O').fill('2');
    await checkAnswer(page).click();

    await expect(overlay(page, 'Level Cleared')).toBeVisible();
    await expect(page.getByText('Score 150')).toBeVisible();

    await page.getByRole('button', { name: 'Begin Level 2' }).click();
    await expect(overlay(page)).toBeHidden();
    await expect(page.getByRole('heading', { name: reactions[1].name })).toBeVisible();
    await expect(page.getByText('Level 02')).toBeVisible();
    await expect(coefficient(page, 'H2')).toHaveValue('');
  });

  test('an unbalanced attempt does not clear the level', async ({ page }) => {
    await coefficient(page, 'H2').fill('3');
    await checkAnswer(page).click();
    await page.waitForTimeout(500);
    await expect(overlay(page)).toBeHidden();
    await expect(page.getByText('Score 0')).toBeVisible();
  });

  test('the atom balance scaffold can be toggled and reports a balanced equation', async ({ page }) => {
    await page.getByRole('button', { name: 'Show Atom Balance' }).click();
    await expect(page.getByText('Atom Balance', { exact: true })).toBeVisible();
    await expect(page.getByText(/All atoms are balanced/)).toBeHidden();

    await coefficient(page, 'H2').fill('2');
    await coefficient(page, 'H2O').fill('2');
    await expect(page.getByText(/All atoms are balanced/)).toBeVisible();

    await page.getByRole('button', { name: 'Hide Atom Balance' }).click();
    await expect(page.getByText('Atom Balance', { exact: true })).toBeHidden();
  });

  test('coefficient inputs only accept whole numbers from 1 to 99', async ({ page }) => {
    const input = coefficient(page, 'H2');
    await input.fill('0');
    await expect(input).toHaveValue('');
    await input.fill('abc');
    await expect(input).toHaveValue('');
    await input.fill('100');
    await expect(input).toHaveValue('');
    await input.fill('7');
    await expect(input).toHaveValue('7');
  });

  test('pausing disables the controls and resuming re-enables them', async ({ page }) => {
    await footerButton(page, 'Pause Game').click();
    await expect(overlay(page, 'Game Paused')).toBeVisible();
    await expect(checkAnswer(page)).toBeDisabled();

    await overlay(page).getByRole('button', { name: 'Resume Game' }).click();
    await expect(overlay(page)).toBeHidden();
    await expect(checkAnswer(page)).toBeEnabled();
  });
});
