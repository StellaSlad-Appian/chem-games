import { expect, test, type Page } from '@playwright/test';
import { FORMULA_BLASTER_CONFIG as CFG } from '../src/core-engine/config/games/formula-blaster-config';
import { compoundByName, footerButton, hintButton, openGame, overlay } from './helpers';

const bubbles = (page: Page) => page.getByTestId('blaster-bubble');
const timer = (page: Page) => page.locator('header').getByText(/^\d{2}:\d{2}$/);
const targetBubble = (page: Page, formula: string) =>
  page.locator(`[data-testid="blaster-bubble"][data-formula="${formula}"]`);
const otherBubble = (page: Page, formula: string) =>
  page.locator(`[data-testid="blaster-bubble"]:not([data-formula="${formula}"])`);

async function targetFormula(page: Page): Promise<string> {
  const heading = page.locator('header h1');
  await expect(heading).toContainText('Find:');
  const name = ((await heading.textContent()) ?? '').replace('Find:', '').trim();
  return compoundByName(name).formula;
}

/**
 * Bubbles float away in a few seconds and keep moving while the click is being
 * delivered, so a coordinate-based click can miss on a slow (dev-server) run.
 * Dispatch the click straight to the bubble element instead, and re-check a
 * few times in case it expired between locating and clicking.
 */
async function clickUntil(page: Page, locator: ReturnType<Page['locator']>, done: () => Promise<boolean>) {
  for (let attempt = 0; attempt < 6; attempt++) {
    await expect(locator.first()).toBeAttached({ timeout: 20_000 });
    await locator.first().dispatchEvent('click').catch(() => undefined);
    await page.waitForTimeout(300);
    if (await done()) return;
  }
  throw new Error('Could not pop the bubble after several attempts');
}

test.describe('Formula Blaster', () => {
  test('shows the target, a running countdown and spawning bubbles', async ({ page }) => {
    await openGame(page, 'formula-blaster');
    await expect(page.locator('header h1')).toContainText('Find:');
    // Starts from the configured wave time and counts down (a slow first
    // load may already have consumed a few seconds).
    await expect(timer(page)).toHaveText(/^00:[0-4]\d$/);
    await expect(bubbles(page).first()).toBeAttached();

    const before = await timer(page).textContent();
    await expect(timer(page)).not.toHaveText(before ?? '', { timeout: 3_000 });
    await expect(page.getByText(/Target 1\/3 • Hits: 0\/\d/)).toBeVisible();
  });

  test('popping a target bubble counts a hit and scores', async ({ page }) => {
    await openGame(page, 'formula-blaster');
    const formula = await targetFormula(page);
    await clickUntil(page, targetBubble(page, formula), () =>
      page.getByText(/Hits: [1-9]\//).isVisible()
    );
    await expect(page.getByText(`Score ${CFG.mechanics.pointsPerLevelMultiplier}`)).toBeVisible();
  });

  test('popping a wrong bubble shows a comparative error and does not score', async ({ page }) => {
    await openGame(page, 'formula-blaster');
    const formula = await targetFormula(page);
    await clickUntil(page, otherBubble(page, formula), () =>
      page.getByTestId('blaster-error').isVisible()
    );
    await expect(page.getByTestId('blaster-error')).toContainText("That's");
    await expect(page.getByText('Score 0')).toBeVisible();
  });

  test('the hint describes the elements of the target', async ({ page }) => {
    await openGame(page, 'formula-blaster');
    await hintButton(page).click();
    await expect(page.getByTestId('blaster-hint')).toContainText('consists of the elements');
    await page.getByRole('button', { name: 'Dismiss hint' }).click();
    await expect(page.getByTestId('blaster-hint')).toBeHidden();
  });

  test('pausing freezes the countdown', async ({ page }) => {
    await openGame(page, 'formula-blaster');
    await footerButton(page, 'Pause Game').click();
    await expect(overlay(page, 'Game Paused')).toBeVisible();

    const frozen = (await timer(page).textContent()) ?? '';
    await page.waitForTimeout(2_500);
    await expect(timer(page)).toHaveText(frozen);

    await overlay(page).getByRole('button', { name: 'Resume Game' }).click();
    await expect(overlay(page)).toBeHidden();
    await expect(timer(page)).not.toHaveText(frozen, { timeout: 3_000 });
  });

  test('running out of time only ends the speed bonus, never the game', async ({ page }) => {
    await page.clock.install();
    await openGame(page, 'formula-blaster');
    await expect(bubbles(page).first()).toBeAttached();
    await page.clock.runFor((CFG.mechanics.baseWaveTimeSeconds + 1) * 1000);
    await expect(timer(page)).toHaveText('00:00');
    await expect(page.locator('header').getByText('Speed bonus')).toBeVisible();
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await expect(bubbles(page).first()).toBeAttached();
  });
});
