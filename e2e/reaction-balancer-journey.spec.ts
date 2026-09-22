/**
 * Long-form browser journeys for Reaction Balancer: a full run to victory
 * and through the optional Challenge, plus the accessibility variants
 * (reduced motion, dark theme, phone + touch).
 *
 * The run reads each reaction's id from the arena and types the stored
 * answer, so it needs no seeded randomness and stays correct if a level's
 * pool changes.
 */
import { expect, test, type Page } from '@playwright/test';
import { REACTION_BALANCER_CONFIG as CFG } from '../src/core-engine/config/games/reaction-balancer-config';
import { reactionBalancerMessages } from '../src/i18n/game-messages/reaction-balancer';
import { en } from '../src/i18n/dictionaries/en';
import { getReaction } from '../src/core-engine/data/reactions';
import { answerCoefficients, parseReaction } from '../src/core-engine/utils/balancer-utils';
import { expectNoOverflow, openGame, overlay } from './helpers';

/** These specs drive the default locale, so the copy they assert is English. */
const M = reactionBalancerMessages(en, 'en');


const arena = (page: Page) => page.getByTestId('balancer-arena');
const coefficient = (page: Page, name: string, formula: string) => page.getByLabel(M.card.coefficient(name, formula), { exact: true });
const card = (page: Page, formula: string) => page.locator(`[data-testid="compound-card"][data-formula="${formula}"]`);

async function balanceCurrent(page: Page): Promise<void> {
  const id = (await arena(page).getAttribute('data-reaction')) as string;
  const parsed = parseReaction(getReaction(id));
  const answer = answerCoefficients(parsed);
  for (let i = 0; i < answer.length; i++) {
    if (await page.getByTestId('round-complete').isVisible()) break;
    if (answer[i] === 1) continue;
    await coefficient(page, parsed.species[i].name, parsed.species[i].bare).fill(String(answer[i]));
  }
  await expect(page.getByTestId('round-complete')).toBeVisible();
}

async function buildCurrent(page: Page): Promise<void> {
  const id = (await arena(page).getAttribute('data-reaction')) as string;
  const target = parseReaction(getReaction(id));
  for (const s of target.reactants) await page.getByRole('button', { name: M.challenge.addAs(s.name, s.bare, 'reactant') }).click();
  await page.getByRole('button', { name: M.challenge.products }).click();
  for (const s of target.products) await page.getByRole('button', { name: M.challenge.addAs(s.name, s.bare, 'product') }).click();
}

async function playLevel(page: Page, level: number): Promise<void> {
  await expect(page.getByText(`Level ${String(level).padStart(2, '0')}`)).toBeVisible();
  for (let i = 0; i < CFG.levels.reactionsPerLevel; i++) {
    if ((await arena(page).getAttribute('data-phase')) === 'build') {
      await buildCurrent(page);
    }
    if (!(await page.getByTestId('round-complete').isVisible())) await balanceCurrent(page);
    const last = i === CFG.levels.reactionsPerLevel - 1;
    await page.getByRole('button', { name: last ? M.ui.finishLevel : M.ui.nextReaction }).click();
  }
}

test.describe('Reaction Balancer journeys', () => {
  test('plays every level to victory, then the Challenge, and opens the lab notebook', async ({ page }) => {
    test.setTimeout(300_000);
    await openGame(page, 'reaction-balancer');

    for (let level = 1; level <= CFG.levels.maxLevel; level++) {
      await playLevel(page, level);
      if (level < CFG.levels.maxLevel) {
        await expect(overlay(page, M.overlay.levelUp.title)).toBeVisible();
        await page.screenshot({ path: `test-results/balancer-level-${level}-cleared.png` });
        await page.getByRole('button', { name: `Begin Level ${level + 1}` }).click();
      }
    }

    const victory = overlay(page, M.overlay.victory.title);
    await expect(victory).toBeVisible();
    await expect(victory).toContainText(M.overlay.victory.description);
    await page.screenshot({ path: 'test-results/balancer-victory.png' });

    await victory.getByRole('button', { name: M.ui.tryChallenge }).click();
    await expect(overlay(page)).toBeHidden();
    await expect(page.getByTestId('challenge-prompt')).toBeVisible();
    await page.screenshot({ path: 'test-results/balancer-challenge.png', fullPage: true });
    await playLevel(page, CFG.levels.challengeLevel);

    const done = overlay(page, M.overlay.challengeComplete.title);
    await expect(done).toBeVisible();
    await done.getByRole('button', { name: M.ui.openNotebook }).click();
    await expect(page.getByRole('heading', { name: M.notebook.header })).toBeVisible();
    await expect(page.getByTestId('notebook-entry')).toHaveCount(CFG.levels.reactionsPerLevel * CFG.levels.challengeLevel);
    await page.screenshot({ path: 'test-results/balancer-notebook.png', fullPage: true });
  });

  test('under prefers-reduced-motion the hinted card does not pulse and the game still plays', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await openGame(page, 'reaction-balancer');
    await page.keyboard.press('h');
    await page.keyboard.press('h');
    await page.keyboard.press('h');
    const pulsing = card(page, 'H2O');
    await expect(pulsing).toHaveClass(/card-pulse/);
    expect(await pulsing.evaluate((el) => getComputedStyle(el).animationName)).toBe('none');
    await balanceCurrent(page);
  });

  test('dark theme renders the arena with the dark tokens', async ({ page }) => {
    await page.addInitScript(() => window.localStorage.setItem('chem-games-theme', 'dark'));
    await openGame(page, 'reaction-balancer');
    expect(await page.evaluate(() => document.documentElement.dataset.theme)).toBe('dark');
    await card(page, 'H2O').getByRole('button', { name: M.card.increase('water') }).click();
    await page.screenshot({ path: 'test-results/balancer-dark.png', fullPage: true });
    await page.getByRole('button', { name: 'Settings' }).click();
    await page.screenshot({ path: 'test-results/balancer-dark-settings.png' });
  });

  test.describe('phone with touch', () => {
    test.use({ viewport: { width: 375, height: 812 }, hasTouch: true, isMobile: true });

    test('reflows without horizontal scroll, enlarges the arrows, and balances by tap', async ({ page }) => {
      await openGame(page, 'reaction-balancer', { showBalancerIntro: true });
      await page.screenshot({ path: 'test-results/balancer-phone-instructions.png' });
      await page.getByRole('button', { name: 'GOT IT' }).tap();
      // Not a bare scrollWidth check: an over-full flex row compresses rather
      // than scrolling, so that assertion passes while the row overhangs.
      // `expectNoOverflow` runs both halves — see ./helpers.
      await expectNoOverflow(page);
      const up = card(page, 'H2O').getByRole('button', { name: M.card.increase('water') });
      const box = await up.boundingBox();
      expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
      await up.tap();
      await card(page, 'H2').getByRole('button', { name: M.card.increase('hydrogen') }).tap();
      await expect(page.getByTestId('round-complete')).toBeVisible();
      await page.screenshot({ path: 'test-results/balancer-phone.png', fullPage: true });
    });
  });
});
