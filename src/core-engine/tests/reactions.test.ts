import { describe, expect, it } from 'vitest';
import { reactions } from '../data/reactions';
import { ELEMENTS_REGISTRY } from '../data/elements';
import { gcd, parseEquationSide, tallySide } from './helpers/formula';

const KNOWN_SYMBOLS = new Set(ELEMENTS_REGISTRY.map((e) => e.symbol));
const BALANCER_MAX_LEVEL = 4;

const sides = (equation: string) => {
  const parts = equation.split('->');
  return { left: parseEquationSide(parts[0]), right: parseEquationSide(parts[1] ?? '') };
};

describe('Reaction Balancer answer key (reactions.ts)', () => {
  it('has unique ids and names', () => {
    const ids = reactions.map((r) => r.id);
    const names = reactions.map((r) => r.name);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(names).size).toBe(names.length);
  });

  it('writes every equation as "reactants -> products"', () => {
    reactions.forEach((r) => {
      expect(r.equation.split('->'), r.id).toHaveLength(2);
      const { left, right } = sides(r.equation);
      expect(left.length, r.id).toBeGreaterThan(0);
      expect(right.length, r.id).toBeGreaterThan(0);
    });
  });

  it.each(reactions.map((r) => [r.name, r.equation] as const))(
    '%s is balanced: %s',
    (_, equation) => {
      const { left, right } = sides(equation);
      expect(tallySide(left)).toEqual(tallySide(right));
    }
  );

  it('stores every answer in lowest terms (the canonical coefficients students learn)', () => {
    reactions.forEach((r) => {
      const { left, right } = sides(r.equation);
      const divisor = [...left, ...right].map((t) => t.coefficient).reduce(gcd);
      expect(divisor, r.equation).toBe(1);
    });
  });

  it('never writes an explicit coefficient of 1', () => {
    reactions.forEach((r) => {
      expect(r.equation, r.id).not.toMatch(/(^|[+>]\s*)1[A-Z(]/);
    });
  });

  it('uses only known element symbols', () => {
    reactions.forEach((r) => {
      const { left, right } = sides(r.equation);
      [...left, ...right].forEach(({ formula }) => {
        for (const symbol of formula.match(/[A-Z][a-z]?/g) ?? []) {
          expect(KNOWN_SYMBOLS.has(symbol), `${r.id}: ${formula} uses ${symbol}`).toBe(true);
        }
      });
    });
  });

  it('provides a hint, a description and an explicit Reaction Balancer level (0-4) for every reaction', () => {
    reactions.forEach((r) => {
      expect(r.hint, r.id).toBeTruthy();
      expect(r.description, r.id).toBeTruthy();
      const level = r.levels['reaction-balancer'];
      expect(Number.isInteger(level), `${r.id} level`).toBe(true);
      expect(level, `${r.id} level`).toBeGreaterThanOrEqual(0);
      expect(level, `${r.id} level`).toBeLessThanOrEqual(BALANCER_MAX_LEVEL);
    });
  });

  it('opens with the water synthesis reaction (level 1 of the game), written with state symbols', () => {
    expect(reactions[0].name).toBe('Water Synthesis');
    expect(reactions[0].equation).toBe('2H2(g) + O2(g) -> 2H2O(l)');
  });

  it('writes a state symbol on every species', () => {
    reactions.forEach((r) => {
      const { left, right } = sides(r.equation);
      [...left, ...right].forEach(({ formula }) => {
        expect(formula, `${r.id}: ${formula}`).toMatch(/\((s|l|g|aq)\)$/);
      });
    });
  });
});
