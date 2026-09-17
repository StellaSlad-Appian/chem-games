import { expect, type Locator, type Page } from '@playwright/test';
import { COMPOUNDS_REGISTRY } from '../src/core-engine/data/compounds';
import { calculateMoleculeHealth, evaluateChemical } from '../src/core-engine/utils/chemical-utils';
import type { ChemicalClassification, CompoundData } from '../src/core-engine/types/chemistry';

export type GameSlug =
  | 'acid-classification'
  | 'formula-blaster'
  | 'neutralise'
  | 'reaction-balancer'
  | 'lewis-structures';

export const GAME_SLUGS: GameSlug[] = [
  'acid-classification',
  'formula-blaster',
  'neutralise',
  'reaction-balancer',
  'lewis-structures',
];

/**
 * Navigates to a game and waits for its shell. Neutralise, Share to Fill and
 * Reaction Balancer show a first-visit instructions modal; it is skipped
 * unless `showNeutraliseIntro` / `showLewisIntro` / `showBalancerIntro` is
 * set. The guided first rounds of Share to Fill and Reaction Balancer are
 * skipped too unless `showLewisGuide` / `showBalancerGuide` is set.
 */
export async function openGame(
  page: Page,
  slug: GameSlug,
  options: {
    showNeutraliseIntro?: boolean;
    showLewisIntro?: boolean;
    showLewisGuide?: boolean;
    showBalancerIntro?: boolean;
    showBalancerGuide?: boolean;
  } = {}
): Promise<void> {
  if (slug === 'neutralise' && !options.showNeutraliseIntro) {
    await page.addInitScript(() => {
      window.localStorage.setItem('hasSeenNeutraliseInstructions', 'true');
    });
  }
  if (slug === 'reaction-balancer') {
    const { showBalancerIntro = false, showBalancerGuide = false } = options;
    await page.addInitScript(
      ({ intro, guide }) => {
        if (!intro) window.localStorage.setItem('hasSeenReactionBalancerInstructions', 'true');
        if (!guide) window.localStorage.setItem('reactionBalancerGuidedSeen', 'true');
      },
      { intro: showBalancerIntro, guide: showBalancerGuide }
    );
  }
  if (slug === 'lewis-structures') {
    const { showLewisIntro = false, showLewisGuide = false } = options;
    await page.addInitScript(
      ({ intro, guide }) => {
        if (!intro) window.localStorage.setItem('hasSeenLewisStructuresInstructions', 'true');
        if (!guide) window.localStorage.setItem('lewisStructuresGuidedSeen', JSON.stringify(['h2', 'h2o']));
      },
      { intro: showLewisIntro, guide: showLewisGuide }
    );
  }
  await page.goto(`/games/${slug}`);
  await expect(page.locator('main.game-shell')).toBeVisible();
  if (slug === 'lewis-structures') {
    // The `.atom-move` class is added in a client-side effect, so its presence
    // means the canvas has hydrated and its buttons have handlers.
    await page.locator('[data-testid="atom"].atom-move').first().waitFor({ state: 'attached' });
  }
}

/** The pause / level-up / game-over card (role="dialog", labelled by its title). */
export const overlay = (page: Page, name?: string): Locator =>
  name ? page.getByRole('dialog', { name }) : page.getByRole('dialog');

export type FooterButtonTitle = 'How to Play' | 'Pause Game' | 'Resume Game' | 'Settings';
export const footerButton = (page: Page, title: FooterButtonTitle): Locator =>
  page.locator('footer').getByTitle(title);

export const hintButton = (page: Page): Locator => page.getByTitle('Get Hint');

export function compoundByFormula(formula: string): CompoundData {
  const compound = COMPOUNDS_REGISTRY.find((c) => c.formula === formula);
  if (!compound) throw new Error(`No compound with formula "${formula}"`);
  return compound;
}

export function compoundByName(name: string): CompoundData {
  const compound = COMPOUNDS_REGISTRY.find((c) => c.name === name);
  if (!compound) throw new Error(`No compound named "${name}"`);
  return compound;
}

export const compoundsAtDifficulty = (level: number): CompoundData[] =>
  COMPOUNDS_REGISTRY.filter((c) => c.difficulty === level);

const VESSEL_LABEL: Record<ChemicalClassification, string> = {
  Acidic: 'Acid',
  Basic: 'Base',
  Neutral: 'Neutral',
  Amphoteric: 'Neutral',
};
export const VESSEL_LABELS = ['Acid', 'Neutral', 'Base'] as const;

export const correctVesselFor = (formula: string): string =>
  VESSEL_LABEL[evaluateChemical(compoundByFormula(formula))];

export function wrongVesselFor(formula: string): string {
  const correct = correctVesselFor(formula);
  const wrong = VESSEL_LABELS.find((label) => label !== correct);
  if (!wrong) throw new Error('No wrong vessel available');
  return wrong;
}

/**
 * Neutralise types an invader by evaluateChemical (see level-manager.ts).
 * Acids are neutralised by OH- (key 2), bases by H+ (key 1).
 */
export const ionKeyFor = (formula: string): '1' | '2' =>
  evaluateChemical(compoundByFormula(formula)) === 'Acidic' ? '2' : '1';

export const hitsNeededFor = (formula: string): number =>
  calculateMoleculeHealth(compoundByFormula(formula));

export function parseTranslate(transform: string): { x: number; y: number } {
  const m = transform.match(/translate\(([-\d.]+)px,\s*([-\d.]+)px\)/);
  if (!m) throw new Error(`No translate() in "${transform}"`);
  return { x: parseFloat(m[1]), y: parseFloat(m[2]) };
}

export const mmss = (seconds: number): string =>
  `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
