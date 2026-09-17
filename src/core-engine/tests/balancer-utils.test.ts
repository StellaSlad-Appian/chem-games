/**
 * The Reaction Balancer rules (core-engine/utils/balancer-utils.ts) against
 * the full reactions.ts dataset: parsing with state symbols, conservation of
 * atoms as the win condition, lowest terms, the hint algorithm and the level
 * plans. The stored answers are cross-checked with the independent test
 * parser in ./helpers/formula.ts.
 */
import { describe, expect, it } from 'vitest';
import { REACTION_BALANCER_CONFIG as CFG } from '../config/games/reaction-balancer-config';
import { SPECIES_NAMES, balancerLevel, getReaction, reactions, speciesName } from '../data/reactions';
import {
  WATER_REACTION_ID,
  allOnes,
  answerCoefficients,
  buildReaction,
  challengePool,
  coefficientHint,
  commonFactor,
  compareLedgers,
  elementName,
  elementPriority,
  equationText,
  findSpecies,
  fitsCoefficientCap,
  isBalanced,
  ledger,
  lowestTerms,
  needsBalancing,
  nextElement,
  parseReaction,
  planBalancerLevel,
  reactionsForLevel,
  relativeMass,
} from '../utils/balancer-utils';

const BALANCER_LEVELS = [1, 2, 3, 4] as const;
import { parseEquationSide, parseFormulaWithGroups } from './helpers/formula';

const water = parseReaction(getReaction(WATER_REACTION_ID));

/** Reactions that are already balanced with every coefficient at 1. */
const TRIVIAL = [
  'Limestone Decomposition',
  'Magnesium in Sulfuric Acid',
  'Hydrochloric Acid Neutralization',
  'Silver Chloride Precipitation',
  'Baking Soda and Vinegar',
  'Ammonium Chloride Formation',
  'Carbonic Acid Decomposition',
];

describe('parseReaction', () => {
  it('splits water synthesis into species with states, names, compositions and answers', () => {
    expect(water.reactants.map((s) => s.formula)).toEqual(['H2(g)', 'O2(g)']);
    expect(water.products.map((s) => s.formula)).toEqual(['H2O(l)']);
    expect(water.species.map((s) => s.bare)).toEqual(['H2', 'O2', 'H2O']);
    expect(water.species.map((s) => s.state)).toEqual(['g', 'g', 'l']);
    expect(water.species.map((s) => s.name)).toEqual(['hydrogen', 'oxygen', 'water']);
    expect(water.species.map((s) => s.answer)).toEqual([2, 1, 2]);
    expect(water.species[2].composition).toEqual({ H: 2, O: 1 });
    expect(water.elements).toEqual(['H', 'O']);
  });

  it('every species in the dataset carries a state symbol', () => {
    reactions.forEach((r) => {
      parseReaction(r).species.forEach((s) => {
        expect(s.state, `${r.id}: ${s.formula}`).not.toBeNull();
      });
    });
  });

  it('every species has an everyday name in SPECIES_NAMES', () => {
    reactions.forEach((r) => {
      parseReaction(r).species.forEach((s) => {
        expect(SPECIES_NAMES[s.bare], `${r.id}: ${s.bare}`).toBeTruthy();
        expect(speciesName(s.formula)).toBe(SPECIES_NAMES[s.bare]);
      });
    });
  });

  it('compositions agree with the independent test parser for every species', () => {
    reactions.forEach((r) => {
      parseReaction(r).species.forEach((s) => {
        expect(s.composition, `${r.id}: ${s.formula}`).toEqual(parseFormulaWithGroups(s.formula));
      });
    });
  });

  it('keeps the coefficient order reactants-then-products, matching parseEquationSide', () => {
    reactions.forEach((r) => {
      const [left, right] = r.equation.split('->');
      const expected = [...parseEquationSide(left), ...parseEquationSide(right)].map((t) => t.coefficient);
      expect(answerCoefficients(parseReaction(r)), r.id).toEqual(expected);
    });
  });

  it('names elements in British/IUPAC spelling', () => {
    expect(elementName('Al')).toBe('Aluminium');
    expect(elementName('S')).toBe('Sulfur');
    expect(elementName('O')).toBe('Oxygen');
    expect(elementName('Xx')).toBe('Xx');
  });
});

describe('isBalanced (conservation of atoms)', () => {
  it.each(reactions.map((r) => [r.name, r] as const))('%s: the stored answer balances', (_, reaction) => {
    const parsed = parseReaction(reaction);
    expect(isBalanced(parsed, answerCoefficients(parsed))).toBe(true);
  });

  it('is unbalanced at all-1 for every reaction except the seven trivially balanced ones', () => {
    reactions.forEach((r) => {
      expect(needsBalancing(r), r.name).toBe(!TRIVIAL.includes(r.name));
    });
    expect(reactions.filter((r) => !needsBalancing(r)).map((r) => r.name).sort()).toEqual([...TRIVIAL].sort());
  });

  it('accepts any scalar multiple of the answer, and lowestTerms simplifies it back', () => {
    reactions.forEach((r) => {
      const parsed = parseReaction(r);
      const answer = answerCoefficients(parsed);
      [2, 3].forEach((k) => {
        const multiple = answer.map((c) => c * k);
        expect(isBalanced(parsed, multiple), `${r.id} x${k}`).toBe(true);
        expect(lowestTerms(multiple), `${r.id} x${k}`).toEqual({ coefficients: answer, divisor: k });
      });
    });
  });

  it('never accepts a zero, a fraction or the wrong number of coefficients', () => {
    expect(isBalanced(water, [0, 0, 0])).toBe(false);
    expect(isBalanced(water, [2, 1, 2, 1])).toBe(false);
    expect(isBalanced(water, [1, 0.5, 1])).toBe(false);
    expect(isBalanced(water, [])).toBe(false);
  });

  it('a wrong coefficient for the water synthesis is not balanced', () => {
    expect(isBalanced(water, [3, 1, 2])).toBe(false);
    expect(isBalanced(water, [2, 2, 2])).toBe(false);
  });
});

describe('lowestTerms and commonFactor', () => {
  it('finds the common factor and divides it out', () => {
    expect(commonFactor([2, 1, 2])).toBe(1);
    expect(commonFactor([4, 2, 4])).toBe(2);
    expect(commonFactor([6, 9])).toBe(3);
    expect(lowestTerms([6, 3, 9])).toEqual({ coefficients: [2, 1, 3], divisor: 3 });
    expect(lowestTerms([2, 1, 2])).toEqual({ coefficients: [2, 1, 2], divisor: 1 });
    expect(lowestTerms([])).toEqual({ coefficients: [], divisor: 1 });
  });
});

describe('ledger and compareLedgers', () => {
  it('counts each element on each side and says which rows match', () => {
    expect(ledger(water, [1, 1, 1])).toEqual([
      { element: 'H', name: 'Hydrogen', left: 2, right: 2, balanced: true },
      { element: 'O', name: 'Oxygen', left: 2, right: 1, balanced: false },
    ]);
    expect(ledger(water, [2, 1, 2]).every((row) => row.balanced)).toBe(true);
  });

  it('expands brackets: 2Ca(OH)2 has 4 H', () => {
    const goldenRain = parseReaction(getReaction('rxn_22'));
    const rows = ledger(goldenRain, allOnes(goldenRain));
    expect(rows.find((r) => r.element === 'N')).toMatchObject({ left: 2, right: 1 });
    expect(rows.find((r) => r.element === 'O')).toMatchObject({ left: 6, right: 3 });
  });

  it('reports what a change fixed and what it broke', () => {
    const before = ledger(water, [1, 1, 1]);
    const after = ledger(water, [1, 1, 2]);
    expect(compareLedgers(before, after)).toEqual({ fixed: ['O'], broken: ['H'] });
    expect(compareLedgers(after, ledger(water, [2, 1, 2]))).toEqual({ fixed: ['H'], broken: [] });
  });
});

describe('elementPriority and nextElement', () => {
  it('orders by fewest compounds, then leaves hydrogen and oxygen for last', () => {
    const methane = parseReaction(getReaction('rxn_04'));
    expect(elementPriority(methane)).toEqual(['C', 'H', 'O']);
    expect(elementPriority(water)).toEqual(['H', 'O']);
    const sodium = parseReaction(getReaction('rxn_17')); // 2Na + 2H2O -> 2NaOH + H2
    expect(elementPriority(sodium)[0]).toBe('Na');
  });

  it('names the first unbalanced element by that order, or null when balanced', () => {
    expect(nextElement(water, [1, 1, 1])).toBe('O');
    expect(nextElement(water, [1, 1, 2])).toBe('H');
    expect(nextElement(water, [2, 1, 2])).toBeNull();
  });
});

describe('coefficientHint (tier 3)', () => {
  it('suggests raising water to 2, then checking hydrogen', () => {
    expect(coefficientHint(water, [1, 1, 1])).toEqual({
      index: 2,
      formula: 'H2O',
      name: 'water',
      n: 2,
      direction: 'raise',
      thenCheck: 'H',
    });
    expect(coefficientHint(water, [1, 1, 2])).toMatchObject({ formula: 'H2', n: 2, direction: 'raise' });
    expect(coefficientHint(water, [2, 1, 2])).toBeNull();
  });

  it('suggests lowering a coefficient that overshoots the answer', () => {
    expect(coefficientHint(water, [3, 1, 2])).toMatchObject({ formula: 'H2', n: 2, direction: 'lower' });
  });

  it('leads from all-1 to a balanced equation for every playable reaction', () => {
    const playable = [...BALANCER_LEVELS.flatMap((level) => reactionsForLevel(level)), ...challengePool()];
    playable.forEach((r) => {
      const parsed = parseReaction(r);
      let coefficients = allOnes(parsed);
      let steps = 0;
      while (!isBalanced(parsed, coefficients)) {
        const hint = coefficientHint(parsed, coefficients);
        expect(hint, `${r.id} at [${coefficients}]`).not.toBeNull();
        coefficients = coefficients.map((c, i) => (i === hint!.index ? hint!.n : c));
        expect(++steps, r.id).toBeLessThanOrEqual(parsed.species.length + 1);
      }
      expect(lowestTerms(coefficients).divisor, r.id).toBe(1);
    });
  });
});

describe('relativeMass', () => {
  it('is equal on both sides only when the equation is balanced', () => {
    const left = (c: number[]) => relativeMass(water.reactants, c.slice(0, 2));
    const right = (c: number[]) => relativeMass(water.products, c.slice(2));
    expect(left([2, 1, 2])).toBeCloseTo(36.0, 0);
    expect(left([2, 1, 2])).toBe(right([2, 1, 2]));
    expect(left([1, 1, 1])).not.toBe(right([1, 1, 1]));
  });
});

describe('equationText', () => {
  it('writes the equation with states and omits coefficients of 1', () => {
    expect(equationText(water, [1, 1, 1])).toBe('H2(g) + O2(g) -> H2O(l)');
    expect(equationText(water, [2, 1, 2])).toBe('2H2(g) + O2(g) -> 2H2O(l)');
    expect(equationText(water, [2, 1, 2], { states: false })).toBe('2H2 + O2 -> 2H2O');
  });

  it('round-trips every stored equation', () => {
    reactions.forEach((r) => {
      const parsed = parseReaction(r);
      expect(equationText(parsed, answerCoefficients(parsed)), r.id).toBe(r.equation);
    });
  });
});

describe('buildReaction (Challenge)', () => {
  it('builds a reaction from chosen species in the player order', () => {
    const built = buildReaction('custom', [water.reactants[1], water.reactants[0]], water.products);
    expect(built.species.map((s) => s.bare)).toEqual(['O2', 'H2', 'H2O']);
    expect(isBalanced(built, [1, 2, 2])).toBe(true);
    expect(built.elements).toEqual(['O', 'H']);
  });

  it('findSpecies resolves any bare formula in the dataset', () => {
    expect(findSpecies('H2O')).toMatchObject({ bare: 'H2O', name: 'water' });
    expect(findSpecies('Cu(NO3)2')).toMatchObject({ name: 'copper(II) nitrate' });
    expect(findSpecies('Xe')).toBeUndefined();
  });
});

describe('reaction levels (reactions.ts `levels.reaction-balancer`)', () => {
  it('every reaction carries an explicit level from 0 to maxLevel', () => {
    reactions.forEach((r) => {
      const level = balancerLevel(r);
      expect(Number.isInteger(level) && level >= 0 && level <= CFG.levels.maxLevel, `${r.id}: ${level}`).toBe(true);
    });
  });

  it('every reaction on a level needs balancing and fits the coefficient cap', () => {
    BALANCER_LEVELS.forEach((level) => {
      reactionsForLevel(level).forEach((r) => {
        expect(needsBalancing(r), `${r.id} on level ${level} is already balanced`).toBe(true);
        expect(fitsCoefficientCap(r, CFG.mechanics.maxCoefficient), `${r.id} on level ${level} needs a coefficient above ${CFG.mechanics.maxCoefficient}`).toBe(true);
      });
    });
  });

  it('a reaction is left out of the game only because it needs no balancing or exceeds the cap', () => {
    const excluded = reactionsForLevel(0);
    expect(excluded.map((r) => r.name).sort()).toEqual([...TRIVIAL, 'Octane Combustion'].sort());
    excluded.forEach((r) => {
      expect(!needsBalancing(r) || !fitsCoefficientCap(r, CFG.mechanics.maxCoefficient), r.id).toBe(true);
    });
  });

  it('every balancing level has at least reactionsPerLevel reactions', () => {
    BALANCER_LEVELS.forEach((level) => {
      expect(reactionsForLevel(level).length, `level ${level}`).toBeGreaterThanOrEqual(CFG.levels.reactionsPerLevel);
    });
  });

  it('places the brief\'s examples where its level table says', () => {
    const levelOf = (name: string) => balancerLevel(reactions.find((r) => r.name === name)!);
    expect(levelOf('Water Synthesis')).toBe(1);
    expect(levelOf('Sodium Chloride Synthesis')).toBe(1);
    expect(levelOf('Methane Combustion')).toBe(2);
    expect(levelOf('Iron Rusting')).toBe(2);
    expect(levelOf('Calcium Hydroxide Neutralisation')).toBe(3);
    expect(levelOf('Copper and Silver Nitrate')).toBe(3);
    expect(levelOf('Propane Combustion')).toBe(4);
    expect(levelOf('Golden Rain Reaction')).toBe(4);
    expect(levelOf('Aluminium in Sulfuric Acid')).toBe(4);
  });
});

describe('level plans', () => {
  it('the Challenge pool is every level-1+ reaction with a word equation, and there are enough of them', () => {
    const pool = challengePool();
    expect(pool.length).toBeGreaterThanOrEqual(CFG.levels.reactionsPerLevel);
    pool.forEach((r) => {
      expect(r.prompt, r.id).toBeTruthy();
      expect(balancerLevel(r), r.id).toBeGreaterThanOrEqual(1);
    });
    reactions.filter((r) => balancerLevel(r) === 0).forEach((r) => expect(pool).not.toContain(r));
  });

  it('every Challenge prompt names every reactant and product', () => {
    challengePool().forEach((r) => {
      const prompt = (r.prompt ?? '').toLowerCase();
      parseReaction(r).species.forEach((s) => {
        // "hydrogen gas" names H2; "water" or "water vapour" names H2O; salts by their full name.
        const key = s.name.replace(/\(.*?\)/g, '').trim().split(' ').pop() as string;
        expect(prompt, `${r.id}: ${s.name}`).toContain(key);
      });
    });
  });

  it('Level 1 always opens with water synthesis and has reactionsPerLevel balance rounds', () => {
    const plan = planBalancerLevel(1, CFG, () => 0.7);
    expect(plan).toHaveLength(CFG.levels.reactionsPerLevel);
    expect(plan[0].reaction.id).toBe(WATER_REACTION_ID);
    plan.forEach((round, i) => {
      expect(round.index).toBe(i);
      expect(round.mode).toBe('balance');
      expect(round.distractors).toEqual([]);
      expect(needsBalancing(round.reaction)).toBe(true);
    });
    expect(new Set(plan.map((r) => r.reaction.id)).size).toBe(plan.length);
  });

  it('Levels 2-4 draw from their own level without repeats', () => {
    [2, 3, 4].forEach((level) => {
      const plan = planBalancerLevel(level, CFG, () => 0.3);
      expect(plan).toHaveLength(CFG.levels.reactionsPerLevel);
      plan.forEach((round) => expect(balancerLevel(round.reaction)).toBe(level));
      expect(new Set(plan.map((r) => r.reaction.id)).size).toBe(plan.length);
    });
  });

  it('the Challenge level uses word-equation rounds with distractors from outside the reaction', () => {
    const plan = planBalancerLevel(CFG.levels.challengeLevel, CFG, () => 0.5);
    expect(plan).toHaveLength(CFG.levels.reactionsPerLevel);
    plan.forEach((round) => {
      expect(round.mode).toBe('challenge');
      expect(round.reaction.prompt).toBeTruthy();
      expect(round.distractors).toHaveLength(CFG.levels.challengeDistractors);
      const own = round.parsed.species.map((s) => s.bare);
      round.distractors.forEach((bare) => {
        expect(own).not.toContain(bare);
        expect(findSpecies(bare)).toBeDefined();
      });
    });
  });

  it('is deterministic for a fixed rng', () => {
    const a = planBalancerLevel(3, CFG, () => 0).map((r) => r.reaction.id);
    const b = planBalancerLevel(3, CFG, () => 0).map((r) => r.reaction.id);
    expect(a).toEqual(b);
  });
});
