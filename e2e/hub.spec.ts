import { expect, test } from '@playwright/test';
import { GAME_SLUGS, openGame, path } from './helpers';

const HUB_CARDS: Array<[RegExp, string]> = [
  [/Acid or Base\?/, '/en/games/acid-classification'],
  [/Formula Blaster/, '/en/games/formula-blaster'],
  [/Neutralise!/, '/en/games/neutralise'],
  [/Reaction Balancer/, '/en/games/reaction-balancer'],
];

test.describe('Games hub', () => {
  test('lists every playable game with a link to it', async ({ page }) => {
    await page.goto(path('/games'));
    await expect(page.getByRole('heading', { level: 1, name: 'Games' })).toBeVisible();
    for (const [title, href] of HUB_CARDS) {
      await expect(page.getByRole('link', { name: title })).toHaveAttribute('href', href);
    }
  });

  for (const slug of GAME_SLUGS) {
    test(`${slug} renders its game shell with header and footer controls`, async ({ page }) => {
      await openGame(page, slug);
      await expect(page.locator('header').first()).toBeVisible();
      await expect(page.locator('footer').getByTitle(/Pause Game|Resume Game/)).toBeVisible();
      await expect(page.locator('footer').getByTitle('How to Play')).toBeVisible();
      await expect(page.locator('footer').getByTitle('Settings')).toBeVisible();
    });
  }
});
