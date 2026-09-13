import { expect, test, type Page } from '@playwright/test';
import { NEUTRALISE_CONFIG as CFG } from '../src/core-engine/config/games/neutralise-config';
import {
  footerButton,
  hitsNeededFor,
  ionKeyFor,
  openGame,
  overlay,
  parseTranslate,
} from './helpers';

const invaders = (page: Page) => page.getByTestId('invader');
const cannon = (page: Page) => page.getByTestId('player-cannon');
const arena = (page: Page) => page.getByTestId('neutralise-arena');
const LEVEL_1_ENEMIES = CFG.waves.baseEnemiesPerWave;

const invaderPosition = async (page: Page) =>
  parseTranslate(await invaders(page).first().evaluate((el) => (el as HTMLElement).style.transform));

test.describe('Neutralise', () => {
  test('first visit shows the instructions and keeps the game paused until GOT IT', async ({ page }) => {
    await openGame(page, 'neutralise', { showNeutraliseIntro: true });
    await expect(page.getByRole('heading', { name: 'How to Play: Neutralize!' })).toBeVisible();
    await expect(footerButton(page, 'Resume Game')).toBeVisible();

    await page.getByRole('button', { name: 'GOT IT' }).click();
    await expect(page.getByRole('heading', { name: 'How to Play: Neutralize!' })).toBeHidden();
    await expect(footerButton(page, 'Pause Game')).toBeVisible();
  });

  test('shows wave, lives and an H+ cannon; the 1 and 2 keys switch the ion', async ({ page }) => {
    await openGame(page, 'neutralise');
    await expect(page.getByText(`Wave 1/3 | Cleared 0/${LEVEL_1_ENEMIES}`)).toBeVisible();
    await expect(page.getByText('LIVES: 3/3').first()).toBeVisible();
    await expect(invaders(page)).toHaveCount(LEVEL_1_ENEMIES);

    await expect(cannon(page)).toHaveAttribute('data-ion', 'H-ion');
    await expect(cannon(page)).toContainText('H⁺');
    await page.keyboard.press('2');
    await expect(cannon(page)).toHaveAttribute('data-ion', 'OH-ion');
    await expect(cannon(page)).toContainText('OH⁻');
    await page.keyboard.press('1');
    await expect(cannon(page)).toHaveAttribute('data-ion', 'H-ion');
  });

  test('Space fires a projectile from the cannon', async ({ page }) => {
    await openGame(page, 'neutralise');
    await page.keyboard.press('Space');
    await expect(page.getByTestId('projectile').first()).toBeAttached({ timeout: 2_000 });
  });

  test('neutralising an invader with the matching ion scores 100', async ({ page }) => {
    await openGame(page, 'neutralise');
    const box = await arena(page).boundingBox();
    if (!box) throw new Error('Arena has no bounding box');

    const first = invaders(page).first();
    const formula = await first.getAttribute('data-formula');
    if (!formula) throw new Error('Invader has no formula');
    const startCount = await invaders(page).count();

    await page.keyboard.press(ionKeyFor(formula));
    const maxShots = hitsNeededFor(formula) + 6;
    for (let shot = 0; shot < maxShots; shot++) {
      if ((await invaders(page).count()) < startCount) break;
      const { x } = await invaderPosition(page);
      // Aim the cannon under the invader (its width is 60px) and fire.
      await page.mouse.move(box.x + x + 30, box.y + box.height - 40);
      await page.keyboard.press('Space');
      await page.waitForTimeout(350);
    }

    await expect(invaders(page)).toHaveCount(startCount - 1);
    // The page renders a desktop and a mobile header; only the first is visible.
    await expect(page.getByText(`Score ${CFG.mechanics.basePointsPerDefeat}`).first()).toBeVisible();
    await expect(page.getByText(`Wave 1/3 | Cleared 1/${LEVEL_1_ENEMIES}`)).toBeVisible();
  });

  test('pausing freezes the invaders and resuming lets them drop again', async ({ page }) => {
    await openGame(page, 'neutralise');
    await footerButton(page, 'Pause Game').click();
    await expect(overlay(page, 'Game Paused')).toBeVisible();

    const frozen = await invaderPosition(page);
    await page.waitForTimeout(1_000);
    expect(await invaderPosition(page)).toEqual(frozen);

    await overlay(page).getByRole('button', { name: 'Resume Game' }).click();
    await expect(overlay(page)).toBeHidden();
    await expect
      .poll(async () => (await invaderPosition(page)).y, { timeout: 5_000 })
      .toBeGreaterThan(frozen.y);
  });

  test('two invaders reaching the floor end the game; Try Again restarts', async ({ page }) => {
    await page.clock.install();
    await openGame(page, 'neutralise');
    await expect(invaders(page)).toHaveCount(LEVEL_1_ENEMIES);

    await page.clock.runFor(60_000);
    await expect(overlay(page, 'Game Over')).toBeVisible();
    await expect(page.getByText('LIVES: 1/3').first()).toBeVisible();

    await page.getByRole('button', { name: 'Try Again' }).click();
    await expect(overlay(page)).toBeHidden();
    await expect(page.getByText('LIVES: 3/3').first()).toBeVisible();
    await expect(page.getByText(`Wave 1/3 | Cleared 0/${LEVEL_1_ENEMIES}`)).toBeVisible();
  });
});
