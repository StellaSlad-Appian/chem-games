import { expect, test, type Page } from '@playwright/test';
import { lewisMessages } from '../src/i18n/game-messages/lewis-structures';
import { en } from '../src/i18n/dictionaries/en';
import { getLewisMolecule } from '../src/core-engine/data/lewis-molecules';
import { footerButton, hintButton, openGame, overlay } from './helpers';

/** These specs drive the default locale, so the copy they assert is English. */
const M = lewisMessages(en, 'en');


/** The first loner dot on an atom, by the canvas's data-atom-id. */
const loner = (page: Page, atomId: string) =>
  page.locator(`[data-atom-id="${atomId}"]`).getByRole('button', { name: /loner \d+ of \d+/ }).first();

const coach = (page: Page) => page.getByTestId('coach-panel');
const arena = (page: Page) => page.getByTestId('lewis-arena');

test.describe('Share to Fill (Lewis structures)', () => {
  test('first visit shows the instructions, which pause the canvas until dismissed', async ({ page }) => {
    await openGame(page, 'lewis-structures', { showLewisIntro: true });
    await expect(page.getByRole('heading', { name: M.instructions.title })).toBeVisible();
    await expect(page.getByText(M.instructions.bullets[0])).toBeVisible();
    await expect(loner(page, 'a0')).toHaveCount(0);
    await page.getByRole('button', { name: 'GOT IT' }).click();
    await expect(page.getByRole('heading', { name: M.instructions.title })).toBeHidden();
    await expect(loner(page, 'a0')).toBeVisible();
    expect(await page.evaluate(() => window.localStorage.getItem('hasSeenLewisStructuresInstructions'))).toBe('true');
  });

  test('level 1 opens with hydrogen; tapping loner then loner makes the bond and locks the structure', async ({ page }) => {
    await openGame(page, 'lewis-structures');
    await expect(page.getByText(M.header.build('Hydrogen', 'H2'))).toBeVisible();
    await expect(page.getByText(M.header.progress(1, 3))).toBeVisible();
    await expect(page.getByText('H: 1 of 2').first()).toBeVisible();

    await loner(page, 'a0').click();
    await loner(page, 'a1').click();

    await expect(page.getByTestId('round-complete')).toContainText(M.success.round('Hydrogen', 'H-H'));
    await expect(page.getByText('H: 2 of 2').first()).toBeVisible();
    await expect(page.getByText(`Score ${100 + 50}`)).toBeVisible();
    await expect(arena(page)).toHaveAttribute('data-phase', 'done');
  });

  test('dragging a loner onto another atom also makes the bond', async ({ page }) => {
    await openGame(page, 'lewis-structures');
    await loner(page, 'a0').dragTo(page.locator('[data-atom-id="a1"]'));
    await expect(page.getByTestId('round-complete')).toBeVisible();
  });

  test('a lone-pair dot is refused with a diagnostic and the hint ladder climbs to a concrete move', async ({ page }) => {
    await openGame(page, 'lewis-structures');
    await loner(page, 'a0').click();
    await loner(page, 'a1').click();
    await page.getByRole('button', { name: M.ui.nextMolecule }).click();
    await expect(page.getByText(M.header.build('Chlorine', 'Cl2'))).toBeVisible();

    await page.locator('[data-atom-id="a0"]').getByRole('button', { name: /lone pair/ }).first().click();
    await expect(coach(page)).toContainText(M.error.pairedDot);

    await hintButton(page).click();
    await expect(page.getByTestId('lewis-hint')).toContainText(M.hint.tier1);
    await page.keyboard.press('h');
    await expect(page.getByTestId('lewis-hint')).toContainText(getLewisMolecule('cl2').tier2Hint);
    await page.keyboard.press('h');
    await expect(page.getByTestId('lewis-hint')).toContainText(M.hint.tier3('Chlorine 1', 'Chlorine 2'));
  });

  test('the structure can be built with the keyboard alone', async ({ page }) => {
    await openGame(page, 'lewis-structures');
    await loner(page, 'a0').focus();
    await page.keyboard.press('Enter');
    await expect(loner(page, 'a0')).toHaveAttribute('aria-pressed', 'true');
    await page.keyboard.press('Tab');
    await expect(loner(page, 'a1')).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.getByTestId('round-complete')).toBeVisible();
  });

  test('clearing level 1 shows the level-up overlay and level 2 starts with water', async ({ page }) => {
    await openGame(page, 'lewis-structures');
    for (const [a, b] of [
      ['a0', 'a1'],
      ['a0', 'a1'],
      ['a0', 'a1'],
    ]) {
      await loner(page, a).click();
      await loner(page, b).click();
      await page.getByRole('button', { name: new RegExp(`${M.ui.nextMolecule}|${M.ui.finishLevel}`) }).click();
    }
    await expect(overlay(page, M.overlay.levelUp.title)).toBeVisible();
    await page.getByRole('button', { name: 'Begin Level 2' }).click();
    await expect(overlay(page)).toBeHidden();
    await expect(page.getByText(M.header.build('Water', 'H2O'))).toBeVisible();
    await expect(page.getByText('Level 02')).toBeVisible();
  });

  test('pausing from the footer freezes the canvas; resuming restores it', async ({ page }) => {
    await openGame(page, 'lewis-structures');
    await footerButton(page, 'Pause Game').click();
    await expect(overlay(page, M.overlay.paused.title)).toBeVisible();
    await expect(loner(page, 'a0')).toHaveCount(0);
    await overlay(page).getByRole('button', { name: 'Resume Game' }).click();
    await expect(overlay(page)).toBeHidden();
    await expect(loner(page, 'a0')).toBeVisible();
  });

  test('settings offers Support mode and it persists', async ({ page }) => {
    await openGame(page, 'lewis-structures');
    await footerButton(page, 'Settings').click();
    const toggle = page.getByRole('switch', { name: M.ui.supportMode });
    await expect(toggle).toHaveAttribute('aria-checked', 'false');
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-checked', 'true');
    expect(await page.evaluate(() => window.localStorage.getItem('chem-games-support-modes'))).toContain('lewis-structures');
  });
});
