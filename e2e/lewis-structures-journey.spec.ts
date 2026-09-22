/**
 * Long-form browser journeys for Share to Fill: a full run to victory, and the
 * accessibility variants (reduced motion, dark theme, phone + touch).
 *
 * The run reads each drawing back from the DOM and uses the game's own pure
 * functions (diagnose / nextMove) to choose the next click, so it needs no
 * seeded randomness and stays correct if the dataset changes.
 */
import { expect, test, type Locator, type Page } from '@playwright/test';
import { LEWIS_STRUCTURES_CONFIG as CFG } from '../src/core-engine/config/games/lewis-structures-config';
import { lewisMessages } from '../src/i18n/game-messages/lewis-structures';
import { en } from '../src/i18n/dictionaries/en';
import { getLewisMolecule } from '../src/core-engine/data/lewis-molecules';
import type { BondOrder, LewisMoleculeData, LewisStructure } from '../src/core-engine/types/chemistry';
import { createAtom, diagnose, matchesTarget, nextMove, pairAtoms } from '../src/core-engine/utils/lewis-utils';
import { expectNoOverflow, openGame, overlay } from './helpers';

/** These specs drive the default locale, so the copy they assert is English. */
const M = lewisMessages(en, 'en');


const arena = (page: Page) => page.getByTestId('lewis-arena');
const atom = (page: Page, id: string) => page.locator(`[data-atom-id="${id}"]`);
const loner = (page: Page, id: string): Locator => atom(page, id).getByRole('button', { name: /unpaired electron \d+ of \d+/ }).first();

/** The structure as currently drawn on the canvas. */
async function readStructure(page: Page): Promise<LewisStructure> {
  const raw = await page.evaluate(() => {
    const root = document.querySelector('[data-testid="lewis-arena"]') as HTMLElement;
    const atoms = Array.from(root.querySelectorAll<HTMLElement>('[data-atom-id]')).map((el) => ({
      id: el.dataset.atomId as string,
      element: el.dataset.element as string,
      loners: el.querySelectorAll('[data-testid="loner"]').length,
      lonePairs: el.querySelectorAll('[data-testid="lone-pair"]').length,
    }));
    const bonds = Array.from(root.querySelectorAll<SVGGElement>('[data-testid="bond-line"]')).map((g) => ({
      id: g.dataset.bondId as string,
      source: g.dataset.source as string,
      target: g.dataset.target as string,
      order: Number(g.dataset.order),
    }));
    return { atoms, bonds };
  });
  return {
    atoms: raw.atoms.map((a) => ({ ...createAtom(a.id, a.element), lonePairs: a.lonePairs, unpaired: a.loners })),
    bonds: raw.bonds.map((b) => ({ id: b.id, sourceNodeId: b.source, targetNodeId: b.target, order: b.order as BondOrder })),
  };
}

async function buildToTarget(page: Page, state: LewisStructure, molecule: LewisMoleculeData): Promise<void> {
  for (let step = 0; step < 30 && !matchesTarget(state, molecule); step++) {
    const move = nextMove(state, molecule);
    if (move?.kind !== 'pair') throw new Error(`unexpected move for ${molecule.id}: ${JSON.stringify(move)}`);
    await loner(page, move.atomIds[0]).click();
    await loner(page, move.atomIds[1]).click();
    const result = pairAtoms(state, move.atomIds[0], move.atomIds[1]);
    if (!result.ok) throw new Error(result.error);
    state = result.structure;
  }
}

async function countAll(page: Page): Promise<void> {
  // Each click renames the button to "— counted", so always take the first one left.
  const remaining = page.getByRole('button', { name: /press to count$/ });
  for (let i = 0; i < 20 && (await remaining.count()) > 0; i++) await remaining.first().click();
  await page.getByRole('button', { name: M.ui.doneCounting }).click();
}

/** Plays whatever round is on screen and returns its mode. */
async function playRound(page: Page): Promise<'build' | 'inspect'> {
  const molecule = getLewisMolecule((await arena(page).getAttribute('data-molecule')) as string);
  const phase = await arena(page).getAttribute('data-phase');
  if (phase === 'build') {
    await buildToTarget(page, await readStructure(page), molecule);
    await expect(page.getByTestId('round-complete')).toBeVisible();
    return 'build';
  }
  expect(phase).toBe('pickAtom');
  const diagnosis = diagnose(await readStructure(page));
  if (diagnosis.type === 'none') {
    await page.getByRole('button', { name: M.ui.thisOneIsCorrect }).click();
  } else {
    await atom(page, diagnosis.atomIds[0]).getByRole('button').click();
    await page.getByRole('button', { name: M.inspect.diagnosis[diagnosis.type] }).click();
    await expect(arena(page)).toHaveAttribute('data-phase', 'repair');
    await buildToTarget(page, await readStructure(page), molecule);
  }
  await expect(arena(page)).toHaveAttribute('data-phase', 'countBonds');
  await countAll(page);
  await expect(arena(page)).toHaveAttribute('data-phase', 'countLonePairs');
  await countAll(page);
  await expect(page.getByTestId('round-complete')).toBeVisible();
  return 'inspect';
}

test.describe('Share to Fill journeys', () => {
  test('plays every level to victory and opens the marking sheet', async ({ page }) => {
    test.setTimeout(300_000);
    await openGame(page, 'lewis-structures');

    for (let level = 1; level <= CFG.levels.maxLevel; level++) {
      const rounds = CFG.levels.roundsByLevel[level - 1];
      await expect(page.getByText(`Level ${String(level).padStart(2, '0')}`)).toBeVisible();
      for (let i = 0; i < rounds; i++) {
        const mode = await playRound(page);
        const last = i === rounds - 1;
        await page.getByRole('button', { name: last ? M.ui.finishLevel : mode === 'inspect' ? M.ui.nextDrawing : M.ui.nextMolecule }).click();
      }
      if (level < CFG.levels.maxLevel) {
        await expect(overlay(page, M.overlay.levelUp.title)).toBeVisible();
        await page.screenshot({ path: `test-results/lewis-level-${level}-cleared.png` });
        await page.getByRole('button', { name: `Begin Level ${level + 1}` }).click();
      }
    }

    const victory = overlay(page, M.overlay.victory.title);
    await expect(victory).toBeVisible();
    await expect(victory).toContainText(M.overlay.victory.description);
    await page.screenshot({ path: 'test-results/lewis-victory.png' });
    await victory.getByRole('button', { name: M.ui.openMarkingSheet }).click();
    await expect(page.getByRole('heading', { name: M.notebook.markingHeader })).toBeVisible();
    const total = CFG.levels.roundsByLevel.reduce((a, b) => a + b, 0);
    await expect(page.getByTestId('notebook-entry')).toHaveCount(total);
    await page.screenshot({ path: 'test-results/lewis-marking-sheet.png', fullPage: true });
  });

  test('under prefers-reduced-motion the loners do not pulse and the game still plays', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await openGame(page, 'lewis-structures');
    const dot = loner(page, 'a0').locator('.loner-pulse');
    await expect(dot).toHaveCount(1);
    expect(await dot.evaluate((el) => getComputedStyle(el).animationName)).toBe('none');
    await loner(page, 'a0').click();
    await loner(page, 'a1').click();
    await expect(page.getByTestId('round-complete')).toBeVisible();
  });

  test('dark theme renders the arena with the dark tokens', async ({ page }) => {
    await page.addInitScript(() => window.localStorage.setItem('chem-games-theme', 'dark'));
    await openGame(page, 'lewis-structures');
    expect(await page.evaluate(() => document.documentElement.dataset.theme)).toBe('dark');
    await loner(page, 'a0').click();
    await page.screenshot({ path: 'test-results/lewis-dark.png', fullPage: true });
    await page.getByRole('button', { name: 'Settings' }).click();
    await page.screenshot({ path: 'test-results/lewis-dark-settings.png' });
  });

  test.describe('phone with touch', () => {
    test.use({ viewport: { width: 375, height: 812 }, hasTouch: true, isMobile: true });

    test('reflows without horizontal scroll, enlarges the dots, and pairs by tap', async ({ page }) => {
      await openGame(page, 'lewis-structures', { showLewisIntro: true });
      await page.screenshot({ path: 'test-results/lewis-phone-instructions.png' });
      await page.getByRole('button', { name: 'GOT IT' }).tap();
      // Not a bare scrollWidth check: an over-full flex row compresses rather
      // than scrolling, so that assertion passes while the row overhangs.
      // `expectNoOverflow` runs both halves — see ./helpers.
      await expectNoOverflow(page);
      const box = await loner(page, 'a0').boundingBox();
      expect(box?.width ?? 0).toBeGreaterThanOrEqual(44);
      expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
      await loner(page, 'a0').tap();
      await loner(page, 'a1').tap();
      await expect(page.getByTestId('round-complete')).toBeVisible();
      await page.screenshot({ path: 'test-results/lewis-phone.png', fullPage: true });
    });
  });
});
