// src/core-engine/utils/balancer-utils.ts
//
// The pure rules of Reaction Balancer. Nothing here knows about React or the
// message catalogue: the hook (useReactionBalancer) turns these answers into
// coach text. The win condition is conservation of atoms (`isBalanced`),
// computed from each species' composition, so any valid balanced form wins;
// the stored answer in reactions.ts is only consulted for the tier-3 hint.

import type { ReactionBalancerConfig } from '../config/games/reaction-balancer-config';
import { ELEMENTS_REGISTRY } from '../data/elements';
import {
  bareFormula,
  getReaction,
  reactions,
  speciesName,
  type ChemicalReaction,
  type ReactionDifficulty,
} from '../data/reactions';
import { parseFormulaAtoms } from './chemical-utils';

export type Side = 'reactant' | 'product';

export interface Species {
  /** As written in reactions.ts, with the state symbol: 'H2O(l)'. */
  formula: string;
  /** Without the state symbol: 'H2O'. */
  bare: string;
  state: 's' | 'l' | 'g' | 'aq' | null;
  /** Everyday name from SPECIES_NAMES: 'water'. */
  name: string;
  composition: Record<string, number>;
  /** Coefficient in the stored (lowest-terms) answer. */
  answer: number;
  side: Side;
}

export interface ParsedReaction {
  id: string;
  reactants: Species[];
  products: Species[];
  /** Reactants then products, the order the coefficient array follows. */
  species: Species[];
  /** Elements in order of first appearance, left to right. */
  elements: string[];
}

export interface LedgerRow {
  element: string;
  name: string;
  left: number;
  right: number;
  balanced: boolean;
}

/** The guided walk-through reaction (Level 1, reaction 1). */
export const WATER_REACTION_ID = 'rxn_01';

// ---------------------------------------------------------------------------
// Element names
// ---------------------------------------------------------------------------

/** IUPAC / Australian spellings where the registry uses the US form. */
const ELEMENT_NAME_OVERRIDES: Record<string, string> = { Al: 'Aluminium', S: 'Sulfur' };

/** "Oxygen", "Aluminium"; falls back to the symbol. */
export function elementName(symbol: string): string {
  return ELEMENT_NAME_OVERRIDES[symbol] ?? ELEMENTS_REGISTRY.find((e) => e.symbol === symbol)?.name ?? symbol;
}

const elementMass = (symbol: string): number => ELEMENTS_REGISTRY.find((e) => e.symbol === symbol)?.mass ?? 0;

// ---------------------------------------------------------------------------
// Parsing
// ---------------------------------------------------------------------------

const STATE = /\((s|l|g|aq)\)$/;

function parseTerm(term: string, side: Side): Species {
  const match = term.trim().match(/^(\d*)(.+)$/);
  if (!match) throw new Error(`Cannot parse equation term "${term}"`);
  const formula = match[2].trim();
  const state = formula.match(STATE)?.[1] as Species['state'] | undefined;
  return {
    formula,
    bare: bareFormula(formula),
    state: state ?? null,
    name: speciesName(formula),
    composition: parseFormulaAtoms(formula),
    answer: match[1] ? parseInt(match[1], 10) : 1,
    side,
  };
}

/** Splits '2H2(g) + O2(g) -> 2H2O(l)' into species with compositions. */
export function parseReaction(reaction: ChemicalReaction): ParsedReaction {
  const [left, right] = reaction.equation.split('->');
  if (right === undefined) throw new Error(`Reaction ${reaction.id} has no arrow`);
  const sideTerms = (side: string) => side.split('+').map((t) => t.trim()).filter(Boolean);
  const reactants = sideTerms(left).map((t) => parseTerm(t, 'reactant'));
  const products = sideTerms(right).map((t) => parseTerm(t, 'product'));
  const species = [...reactants, ...products];
  const elements: string[] = [];
  species.forEach((s) => Object.keys(s.composition).forEach((e) => !elements.includes(e) && elements.push(e)));
  return { id: reaction.id, reactants, products, species, elements };
}

/** A reaction rebuilt from a player's own choice of species (Challenge level). */
export function buildReaction(id: string, reactants: Species[], products: Species[]): ParsedReaction {
  const species = [...reactants, ...products];
  const elements: string[] = [];
  species.forEach((s) => Object.keys(s.composition).forEach((e) => !elements.includes(e) && elements.push(e)));
  return { id, reactants, products, species, elements };
}

/** Every coefficient at 1: the state a reaction is shown in. */
export const allOnes = (parsed: ParsedReaction): number[] => parsed.species.map(() => 1);

/** The stored answer's coefficients, in species order. */
export const answerCoefficients = (parsed: ParsedReaction): number[] => parsed.species.map((s) => s.answer);

// ---------------------------------------------------------------------------
// Counting
// ---------------------------------------------------------------------------

/** Atoms per element for one side, given the coefficients of those species. */
export function tally(species: Species[], coefficients: number[]): Record<string, number> {
  const totals: Record<string, number> = {};
  species.forEach((s, i) => {
    const coefficient = coefficients[i] ?? 1;
    Object.entries(s.composition).forEach(([element, count]) => {
      totals[element] = (totals[element] ?? 0) + count * coefficient;
    });
  });
  return totals;
}

const splitCoefficients = (parsed: ParsedReaction, coefficients: number[]) => ({
  left: coefficients.slice(0, parsed.reactants.length),
  right: coefficients.slice(parsed.reactants.length),
});

/** One row per element: counts on each side and whether they match. */
export function ledger(parsed: ParsedReaction, coefficients: number[]): LedgerRow[] {
  const { left, right } = splitCoefficients(parsed, coefficients);
  const leftTotals = tally(parsed.reactants, left);
  const rightTotals = tally(parsed.products, right);
  return parsed.elements.map((element) => {
    const l = leftTotals[element] ?? 0;
    const r = rightTotals[element] ?? 0;
    return { element, name: elementName(element), left: l, right: r, balanced: l === r };
  });
}

/** Conservation of atoms: every element's count matches and every coefficient is at least 1. */
export function isBalanced(parsed: ParsedReaction, coefficients: number[]): boolean {
  if (parsed.species.length === 0 || coefficients.length !== parsed.species.length) return false;
  if (coefficients.some((c) => !Number.isInteger(c) || c < 1)) return false;
  return ledger(parsed, coefficients).every((row) => row.balanced);
}

/** True when the reaction is unbalanced with every coefficient at 1, i.e. there is something to do. */
export const needsBalancing = (reaction: ChemicalReaction): boolean => {
  const parsed = parseReaction(reaction);
  return !isBalanced(parsed, allOnes(parsed));
};

/** Which rows a change fixed and which it broke, for the "that fixed X, but Y changed" coach line. */
export function compareLedgers(before: LedgerRow[], after: LedgerRow[]): { fixed: string[]; broken: string[] } {
  const fixed: string[] = [];
  const broken: string[] = [];
  after.forEach((row) => {
    const previous = before.find((b) => b.element === row.element);
    if (!previous) return;
    if (!previous.balanced && row.balanced) fixed.push(row.element);
    if (previous.balanced && !row.balanced) broken.push(row.element);
  });
  return { fixed, broken };
}

/** Relative mass of one side (sum of coefficient x molar mass), to one decimal place. */
export function relativeMass(species: Species[], coefficients: number[]): number {
  const total = species.reduce((sum, s, i) => {
    const molar = Object.entries(s.composition).reduce((m, [element, count]) => m + elementMass(element) * count, 0);
    return sum + molar * (coefficients[i] ?? 1);
  }, 0);
  return Math.round(total * 10) / 10;
}

// ---------------------------------------------------------------------------
// Lowest terms
// ---------------------------------------------------------------------------

export const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));

/** The common factor of a coefficient list (1 when it is already in lowest terms). */
export const commonFactor = (coefficients: number[]): number =>
  coefficients.length === 0 ? 1 : coefficients.reduce((acc, c) => gcd(acc, c));

/** Divides every coefficient by their common factor. */
export function lowestTerms(coefficients: number[]): { coefficients: number[]; divisor: number } {
  const divisor = commonFactor(coefficients);
  if (divisor <= 1) return { coefficients: [...coefficients], divisor: 1 };
  return { coefficients: coefficients.map((c) => c / divisor), divisor };
}

/** '2H2(g) + O2(g) -> 2H2O(l)' for MoleculeText; a coefficient of 1 is not written. */
export function equationText(parsed: ParsedReaction, coefficients: number[], options: { states?: boolean } = {}): string {
  const { states = true } = options;
  const term = (s: Species, i: number) => `${coefficients[i] === 1 ? '' : coefficients[i]}${states ? s.formula : s.bare}`;
  const left = parsed.reactants.map((s, i) => term(s, i)).join(' + ');
  const right = parsed.products.map((s, i) => term(s, parsed.reactants.length + i)).join(' + ');
  return `${left} -> ${right}`;
}

// ---------------------------------------------------------------------------
// Hints
// ---------------------------------------------------------------------------

/**
 * The order to balance elements in: fewest compounds first (the classroom
 * rule), oxygen last, hydrogen second last, then left-to-right.
 */
export function elementPriority(parsed: ParsedReaction): string[] {
  const appearances = (element: string) => parsed.species.filter((s) => s.composition[element]).length;
  const rank = (element: string) => (element === 'O' ? 2 : element === 'H' ? 1 : 0);
  return [...parsed.elements].sort((a, b) => {
    const byCount = appearances(a) - appearances(b);
    if (byCount !== 0) return byCount;
    const byRank = rank(a) - rank(b);
    if (byRank !== 0) return byRank;
    return parsed.elements.indexOf(a) - parsed.elements.indexOf(b);
  });
}

/** The element to look at next (first unbalanced by priority), or null when everything matches. */
export function nextElement(parsed: ParsedReaction, coefficients: number[]): string | null {
  const rows = ledger(parsed, coefficients);
  return elementPriority(parsed).find((element) => !rows.find((r) => r.element === element)?.balanced) ?? null;
}

export interface CoefficientHint {
  /** Index into `parsed.species`. */
  index: number;
  formula: string;
  name: string;
  /** The coefficient to set. */
  n: number;
  /** Whether the move raises or lowers the current coefficient. */
  direction: 'raise' | 'lower';
  /** The element to check after the move. */
  thenCheck: string;
}

/**
 * Tier 3: one concrete coefficient. Aims at the stored lowest-terms answer:
 * among the compounds containing the next element to fix, the first whose
 * coefficient is below the answer (else the first above it).
 */
export function coefficientHint(parsed: ParsedReaction, coefficients: number[]): CoefficientHint | null {
  const element = nextElement(parsed, coefficients);
  if (!element) return null;
  const candidates = parsed.species
    .map((s, index) => ({ s, index }))
    .filter(({ s, index }) => s.composition[element] && coefficients[index] !== s.answer);
  if (candidates.length === 0) return null;
  const pick = candidates.find(({ s, index }) => coefficients[index] < s.answer) ?? candidates[0];
  const next = [...coefficients];
  next[pick.index] = pick.s.answer;
  return {
    index: pick.index,
    formula: pick.s.bare,
    name: pick.s.name,
    n: pick.s.answer,
    direction: coefficients[pick.index] < pick.s.answer ? 'raise' : 'lower',
    thenCheck: nextElement(parsed, next) ?? element,
  };
}

// ---------------------------------------------------------------------------
// Level plans
// ---------------------------------------------------------------------------

export type RoundMode = 'balance' | 'challenge';

export interface BalancerRound {
  index: number;
  reaction: ChemicalReaction;
  parsed: ParsedReaction;
  mode: RoundMode;
  /** Challenge rounds: wrong compounds mixed into the picker (bare formulas). */
  distractors: string[];
}

const answerFits = (reaction: ChemicalReaction, maxCoefficient: number) =>
  parseReaction(reaction).species.every((s) => s.answer <= maxCoefficient);

/** Reactions a balancing level may draw from: right difficulty, unbalanced at all-1, answer within reach. */
export function reactionsForDifficulty(difficulty: ReactionDifficulty, config: ReactionBalancerConfig): ChemicalReaction[] {
  return reactions.filter(
    (r) => r.difficulty === difficulty && needsBalancing(r) && answerFits(r, config.mechanics.maxCoefficient)
  );
}

/** Reactions the Challenge level may draw from: those with a word equation, answer within reach. */
export function challengePool(config: ReactionBalancerConfig): ChemicalReaction[] {
  return reactions.filter((r) => Boolean(r.prompt) && answerFits(r, config.mechanics.maxCoefficient));
}

const shuffle = <T>(items: T[], rng: () => number): T[] => {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1)) % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
};

/** Every distinct bare formula in the dataset, with its display formula (first state seen). */
function allSpecies(): Species[] {
  const seen = new Map<string, Species>();
  reactions.forEach((r) => parseReaction(r).species.forEach((s) => !seen.has(s.bare) && seen.set(s.bare, s)));
  return [...seen.values()];
}

/**
 * The rounds of a level. Levels 1-4 draw `reactionsPerLevel` reactions from
 * the level's difficulty pool (Level 1 always opens with Water Synthesis);
 * the Challenge level draws from the word-equation pool and adds distractor
 * compounds for the picker.
 */
export function planBalancerLevel(level: number, config: ReactionBalancerConfig, rng: () => number = Math.random): BalancerRound[] {
  const { levels } = config;
  if (level >= levels.challengeLevel) {
    const pool = shuffle(challengePool(config), rng).slice(0, levels.reactionsPerLevel);
    const everything = allSpecies();
    return pool.map((reaction, index) => {
      const parsed = parseReaction(reaction);
      const own = new Set(parsed.species.map((s) => s.bare));
      const distractors = shuffle(
        everything.filter((s) => !own.has(s.bare)),
        rng
      )
        .slice(0, levels.challengeDistractors)
        .map((s) => s.bare);
      return { index, reaction, parsed, mode: 'challenge' as const, distractors };
    });
  }
  const difficulty = levels.difficultyByLevel[Math.min(level, levels.maxLevel) - 1];
  let pool = reactionsForDifficulty(difficulty, config);
  if (level === 1) {
    const water = getReaction(WATER_REACTION_ID);
    pool = [water, ...shuffle(pool.filter((r) => r.id !== water.id), rng)];
  } else {
    pool = shuffle(pool, rng);
  }
  return pool.slice(0, levels.reactionsPerLevel).map((reaction, index) => ({
    index,
    reaction,
    parsed: parseReaction(reaction),
    mode: 'balance' as const,
    distractors: [],
  }));
}

/** Look a species up by bare formula across the dataset (Challenge picker tiles). */
export function findSpecies(bare: string): Species | undefined {
  return allSpecies().find((s) => s.bare === bare);
}
