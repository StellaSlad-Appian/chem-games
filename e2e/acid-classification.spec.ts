import { expect, test, type Page } from '@playwright/test';
import { ACID_CLASSIFICATION_CONFIG as CFG } from '../src/core-engine/config/games/acid-classification-config';
import {
  VESSEL_LABELS,
  compoundByFormula,
  compoundsAtDifficulty,
  correctVesselFor,
  footerButton,
  hintButton,
  openGame,
  overlay,
  wrongVesselFor,
} from './helpers';
import { en } from '../src/i18n/dictionaries/en';

const bubble = (page: Page) => page.getByTestId('molecule-bubble');
const vessel = (page: Page, label: string) => page.getByRole('button', { name: label, exact: true });
const quota = (level: number) =>
  Math.max(CFG.levels.minPassingItems, compoundsAtDifficulty(level).length - 2);

async function currentFormula(page: Page): Promise<string> {
  const formula = await bubble(page).getAttribute('data-formula');
  if (!formula) throw new Error('No compound displayed');
  return formula;
}

test.describe('Acid classification', () => {
  test.beforeEach(async ({ page }) => {
    await openGame(page, 'acid-classification');
  });

  test('starts with the prompt, three vessels and three lives', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Acid, Base or Neutral?');
    for (const label of VESSEL_LABELS) await expect(vessel(page, label)).toBeVisible();
    await expect(page.getByText('LIVES: 3/3')).toBeVisible();
    await expect(page.getByText('Level 01')).toBeVisible();
    await expect(page.getByText('Score 0')).toBeVisible();
    await expect(page.getByText(`0 / ${quota(1)} Sorted`)).toBeVisible();
  });

  test('a correct answer scores 100 and moves to the next compound', async ({ page }) => {
    const formula = await currentFormula(page);
    await vessel(page, correctVesselFor(formula)).click();
    await expect(page.getByText(`1 / ${quota(1)} Sorted`)).toBeVisible();
    await expect(page.getByText(`Score ${CFG.mechanics.pointsPerLevelMultiplier}`)).toBeVisible();
    await expect(bubble(page)).not.toHaveAttribute('data-formula', formula);
  });

  test('reaching the quota clears level 1 and starts level 2', async ({ page }) => {
    const target = quota(1);
    for (let i = 0; i < target; i++) {
      const formula = await currentFormula(page);
      await vessel(page, correctVesselFor(formula)).click();
      if (i < target - 1) {
        await expect(page.getByText(`${i + 1} / ${target} Sorted`)).toBeVisible();
      }
    }
    await expect(overlay(page, 'Level Cleared')).toBeVisible();
    await page.getByRole('button', { name: 'Begin Level 2' }).click();
    await expect(overlay(page)).toBeHidden();
    await expect(page.getByText('Level 02')).toBeVisible();
    await expect(page.getByText(`0 / ${quota(2)} Sorted`)).toBeVisible();
  });

  test('three mistakes end the game; Try Again resets lives and score', async ({ page }) => {
    for (let i = 0; i < CFG.mechanics.maxMistakes; i++) {
      const formula = await currentFormula(page);
      const wrong = vessel(page, wrongVesselFor(formula));
      await wrong.click();
      if (i < CFG.mechanics.maxMistakes - 1) {
        await expect(page.getByText(`LIVES: ${CFG.mechanics.maxMistakes - 1 - i}/3`)).toBeVisible();
        await expect(wrong).toBeEnabled();
      }
    }
    await expect(overlay(page, 'Game Over')).toBeVisible();
    await expect(page.getByText('LIVES: 0/3')).toBeVisible();

    await page.getByRole('button', { name: 'Try Again' }).click();
    await expect(overlay(page)).toBeHidden();
    await expect(page.getByText('LIVES: 3/3')).toBeVisible();
    await expect(page.getByText('Score 0')).toBeVisible();
  });

  test('the hint reveals the compound name', async ({ page }) => {
    const formula = await currentFormula(page);
    await hintButton(page).click();
    await expect(bubble(page)).toContainText(compoundByFormula(formula).name);
  });

  test('pause and resume from the footer; Escape also resumes', async ({ page }) => {
    await footerButton(page, 'Pause Game').click();
    await expect(overlay(page, 'Game Paused')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(overlay(page)).toBeHidden();

    await footerButton(page, 'Pause Game').click();
    await overlay(page).getByRole('button', { name: 'Resume Game' }).click();
    await expect(overlay(page)).toBeHidden();
    await expect(vessel(page, 'Acid')).toBeEnabled();
  });

  test('instructions and settings modals open and close', async ({ page }) => {
    await footerButton(page, 'How to Play').click();
    await expect(
      page.getByRole('heading', { name: en.games.acidClassification.instructionsTitle })
    ).toBeVisible();
    await page.getByRole('button', { name: en.games.shared.gotIt }).click();
    await expect(
      page.getByRole('heading', { name: en.games.acidClassification.instructionsTitle })
    ).toBeHidden();

    await footerButton(page, 'Settings').click();
    await expect(page.getByRole('heading', { name: /Game Settings/ })).toBeVisible();
    await page.getByLabel('Close settings').click();
    await expect(page.getByRole('heading', { name: /Game Settings/ })).toBeHidden();
  });
});
