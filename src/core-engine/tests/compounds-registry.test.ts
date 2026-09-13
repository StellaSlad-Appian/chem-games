import { describe, expect, it } from 'vitest';
import { COMPOUNDS_REGISTRY } from '../data/compounds';
import { ELEMENTS_REGISTRY } from '../data/elements';
import { MONOATOMIC_IONS, POLYATOMIC_IONS } from '../data/ions';
import { ACID_CLASSIFICATION_CONFIG } from '../config/games/acid-classification-config';
import type { ChemicalComposition } from '../types/chemistry';
import { parseFormulaWithGroups } from './helpers/formula';

const toDict = (elements: ChemicalComposition[]) =>
  elements.reduce<Record<string, number>>((acc, { symbol, count }) => {
    acc[symbol] = (acc[symbol] ?? 0) + count;
    return acc;
  }, {});

const KNOWN_SYMBOLS = new Set(ELEMENTS_REGISTRY.map((e) => e.symbol));

describe('COMPOUNDS_REGISTRY integrity', () => {
  it('has unique ids, formulas and names', () => {
    const ids = COMPOUNDS_REGISTRY.map((c) => c.id);
    const formulas = COMPOUNDS_REGISTRY.map((c) => c.formula);
    const names = COMPOUNDS_REGISTRY.map((c) => c.name);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(formulas).size).toBe(formulas.length);
    expect(new Set(names).size).toBe(names.length);
  });

  it('uses only difficulty levels 1–5', () => {
    COMPOUNDS_REGISTRY.forEach((c) => {
      expect([1, 2, 3, 4, 5]).toContain(c.difficulty);
    });
  });

  it('has enough compounds at every level for the classifier quota', () => {
    const { maxLevel, minPassingItems } = ACID_CLASSIFICATION_CONFIG.levels;
    for (let level = 1; level <= maxLevel; level++) {
      const pool = COMPOUNDS_REGISTRY.filter((c) => c.difficulty === level);
      expect(pool.length, `difficulty ${level}`).toBeGreaterThanOrEqual(minPassingItems);
    }
  });

  it('declares element counts that match the formula string', () => {
    COMPOUNDS_REGISTRY.forEach((c) => {
      expect(toDict(c.elements), c.formula).toEqual(parseFormulaWithGroups(c.formula));
    });
  });

  it('only uses element symbols from ELEMENTS_REGISTRY', () => {
    COMPOUNDS_REGISTRY.forEach((c) => {
      c.elements.forEach(({ symbol }) => {
        expect(KNOWN_SYMBOLS.has(symbol), `${c.formula} uses ${symbol}`).toBe(true);
      });
    });
  });

  it('references only ion ids that exist and is charge-neutral', () => {
    const chargeOf = (ionId: string): number => {
      const ion = MONOATOMIC_IONS.find((i) => i.id === ionId) ?? POLYATOMIC_IONS.find((i) => i.id === ionId);
      if (!ion) throw new Error(`Unknown ion id ${ionId}`);
      return ion.charge;
    };

    const unbalanced: string[] = [];
    COMPOUNDS_REGISTRY.filter((c) => c.ionicComponents).forEach((c) => {
      const { cations, anions } = c.ionicComponents!;
      const net =
        cations.reduce((sum, ref) => sum + chargeOf(ref.ionId) * ref.count, 0) +
        anions.reduce((sum, ref) => sum + chargeOf(ref.ionId) * ref.count, 0);
      if (net !== 0) unbalanced.push(`${c.formula} (net ${net > 0 ? "+" : ""}${net})`);
    });
    expect(unbalanced).toEqual([]);
  });

  it('keeps pKa/pKb inside a physically plausible range', () => {
    COMPOUNDS_REGISTRY.forEach((c) => {
      if (c.pKa !== undefined) {
        expect(c.pKa, `${c.formula} pKa`).toBeGreaterThanOrEqual(-15);
        expect(c.pKa, `${c.formula} pKa`).toBeLessThanOrEqual(20);
      }
      if (c.pKb !== undefined) {
        expect(c.pKb, `${c.formula} pKb`).toBeGreaterThanOrEqual(-15);
        expect(c.pKb, `${c.formula} pKb`).toBeLessThanOrEqual(20);
      }
    });
  });

  it('has a positive molar mass for every compound', () => {
    COMPOUNDS_REGISTRY.forEach((c) => {
      expect(c.molarMass, c.formula).toBeGreaterThan(0);
    });
  });
});

describe('ion registries', () => {
  it('use unique ids across both registries', () => {
    const ids = [...MONOATOMIC_IONS, ...POLYATOMIC_IONS].map((i) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('polyatomic ions declare element counts that match their formula', () => {
    POLYATOMIC_IONS.forEach((ion) => {
      expect(ion.elements.length, ion.formula).toBeGreaterThan(0);
      expect(toDict(ion.elements), ion.formula).toEqual(parseFormulaWithGroups(ion.formula));
    });
  });

  it('monoatomic ions use known element symbols', () => {
    MONOATOMIC_IONS.forEach((ion) => {
      expect(KNOWN_SYMBOLS.has(ion.symbol), ion.name).toBe(true);
    });
  });
});
