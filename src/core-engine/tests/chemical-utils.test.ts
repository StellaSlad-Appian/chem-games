import { describe, expect, it } from 'vitest';
import {
  areAtomInventoriesBalanced,
  calculateAtomInventory,
  calculateMoleculeHealth,
  evaluateChemical,
  generateChemicalHint,
  generateComparativeError,
  isNeutralizationCompatible,
  parseFormulaAtoms,
} from '../utils/chemical-utils';
import type { CompoundData } from '../types/chemistry';
import { COMPOUNDS_REGISTRY } from '../data/compounds';
import { reactions } from '../data/reactions';
import { compoundByFormula } from '@/test-utils/registry';
import { parseEquationSide, parseFormulaWithGroups } from './helpers/formula';

const stub = (overrides: Partial<CompoundData>): CompoundData => ({
  type: 'compound',
  id: 'stub',
  formula: 'X',
  name: 'Stub',
  difficulty: 1,
  molarMass: 1,
  stateAtRoomTemp: 'solid',
  elements: [],
  isHazardous: false,
  ...overrides,
});

describe('evaluateChemical', () => {
  it.each([
    ['HCl', 'Acidic'],
    ['H2SO4', 'Acidic'],
    ['HF', 'Acidic'],
    ['NaOH', 'Basic'],
    ['NH3', 'Basic'],
    ['Ba(OH)2', 'Basic'],
    ['NaCl', 'Neutral'],
    ['KNO3', 'Neutral'],
  ] as const)('classifies %s as %s', (formula, expected) => {
    expect(evaluateChemical(compoundByFormula(formula))).toBe(expected);
  });

  it('treats an exact pKa/pKb tie (water) as Neutral', () => {
    expect(evaluateChemical(compoundByFormula('H2O'))).toBe('Neutral');
  });

  it('lets the smaller dissociation constant win for amphoteric compounds', () => {
    expect(evaluateChemical(compoundByFormula('NaHCO3'))).toBe('Basic'); // pKb 7.65 < pKa 10.33
    expect(evaluateChemical(compoundByFormula('NaH2PO4'))).toBe('Acidic'); // pKa 7.2 < pKb 11.85
    expect(evaluateChemical(compoundByFormula('Na2HPO4'))).toBe('Basic'); // pKb 6.8 < pKa 12.35
  });

  it('ignores a dissociation constant above 14', () => {
    expect(evaluateChemical(compoundByFormula('NaHSO4'))).toBe('Acidic'); // pKb 17 is discarded
    expect(evaluateChemical(stub({ pKa: 15 }))).toBe('Neutral');
  });

  it('defaults to Neutral when no constants are given', () => {
    expect(evaluateChemical(stub({}))).toBe('Neutral');
  });
});

describe('calculateMoleculeHealth', () => {
  it.each([
    ['HCl', 1],
    ['H2SO4', 2],
    ['H3PO4', 3],
    ['NaOH', 1],
    ['Ba(OH)2', 2],
  ] as const)('%s needs %i neutralising ions', (formula, expected) => {
    expect(calculateMoleculeHealth(compoundByFormula(formula))).toBe(expected);
  });

  it('returns 1 for compounds without ionic components (NH3)', () => {
    expect(calculateMoleculeHealth(compoundByFormula('NH3'))).toBe(1);
  });

  it('returns 1 for neutral salts (NaCl)', () => {
    expect(calculateMoleculeHealth(compoundByFormula('NaCl'))).toBe(1);
  });

  it('counts only the protons listed as H+ cations (H3BO3 releases one)', () => {
    expect(calculateMoleculeHealth(compoundByFormula('H3BO3'))).toBe(1);
  });
});

describe('isNeutralizationCompatible', () => {
  it.each([
    ['acid', 'OH-ion', true],
    ['base', 'H-ion', true],
    ['acid', 'H-ion', false],
    ['base', 'OH-ion', false],
    ['neutral', 'H-ion', false],
    ['neutral', 'OH-ion', false],
  ] as const)('%s hit by %s -> %s', (compound, ion, expected) => {
    expect(isNeutralizationCompatible(compound, ion)).toBe(expected);
  });
});

describe('generateComparativeError', () => {
  it('just names the clicked compound when there is no target', () => {
    expect(generateComparativeError(compoundByFormula('HCl'), null)).toBe(
      "That's Hydrochloric Acid (HCl)!"
    );
  });

  it('points to an element the clicked compound is missing, by name', () => {
    expect(generateComparativeError(compoundByFormula('HCl'), compoundByFormula('KCl'))).toBe(
      "That's Hydrochloric Acid (HCl)! Look for Potassium (K) atoms instead."
    );
  });

  it('never prints "undefined" for any pair of registry compounds', () => {
    COMPOUNDS_REGISTRY.forEach((clicked) => {
      COMPOUNDS_REGISTRY.forEach((target) => {
        expect(generateComparativeError(clicked, target)).not.toContain('undefined');
      });
    });
  });

  it('asks to check atom counts when the elements match', () => {
    const water = stub({
      name: 'Water',
      formula: 'H2O',
      elements: [
        { symbol: 'H', count: 2 },
        { symbol: 'O', count: 1 },
      ],
    });
    const peroxide = stub({
      name: 'Hydrogen Peroxide',
      formula: 'H2O2',
      elements: [
        { symbol: 'H', count: 2 },
        { symbol: 'O', count: 2 },
      ],
    });
    expect(generateComparativeError(peroxide, water)).toBe(
      "That's Hydrogen Peroxide (H2O2)! Check the atom counts for Water."
    );
  });
});

describe('generateChemicalHint', () => {
  it('lists the element symbols of the compound', () => {
    expect(generateChemicalHint(compoundByFormula('H2O'))).toBe(
      'Water consists of the elements: H & O.'
    );
  });
});

describe('parseFormulaAtoms', () => {
  it.each([
    ['H2O', { H: 2, O: 1 }],
    ['CO2', { C: 1, O: 2 }],
    ['NaCl', { Na: 1, Cl: 1 }],
    ['C6H12O6', { C: 6, H: 12, O: 6 }],
    ['CH3COOH', { C: 2, H: 4, O: 2 }],
  ])('parses %s', (formula, expected) => {
    expect(parseFormulaAtoms(formula)).toEqual(expected);
  });

  it('ignores state symbols', () => {
    expect(parseFormulaAtoms('H2O(l)')).toEqual({ H: 2, O: 1 });
    expect(parseFormulaAtoms('NH3(aq)')).toEqual({ N: 1, H: 3 });
  });

  it.each([
    ['Ba(OH)2', { Ba: 1, O: 2, H: 2 }],
    ['Cu(NO3)2', { Cu: 1, N: 2, O: 6 }],
    ['Pb(NO3)2', { Pb: 1, N: 2, O: 6 }],
    ['Ca3(PO4)2', { Ca: 3, P: 2, O: 8 }],
    ['Mg(OH)2(s)', { Mg: 1, O: 2, H: 2 }],
  ])('expands bracketed groups: %s', (formula, expected) => {
    expect(parseFormulaAtoms(formula)).toEqual(expected);
  });

  it('agrees with the test parser for every balancer reaction', () => {
    reactions.forEach((reaction) => {
      reaction.equation
        .split('->')
        .flatMap((side) => parseEquationSide(side))
        .forEach(({ formula }) => {
          expect(parseFormulaAtoms(formula), formula).toEqual(parseFormulaWithGroups(formula));
        });
    });
  });

  it('returns an empty inventory for an empty string', () => {
    expect(parseFormulaAtoms('')).toEqual({});
  });
});

describe('calculateAtomInventory', () => {
  const compounds = [{ compoundId: 'H2' }, { compoundId: 'O2' }];

  it('treats a blank coefficient as 1', () => {
    expect(calculateAtomInventory(compounds, ['', ''])).toEqual({ H: 2, O: 2 });
  });

  it('multiplies atom counts by the coefficient', () => {
    expect(calculateAtomInventory(compounds, [2, 1])).toEqual({ H: 4, O: 2 });
  });

  it('sums the same element across compounds', () => {
    expect(calculateAtomInventory([{ compoundId: 'CO2' }, { compoundId: 'H2O' }], [1, 2])).toEqual({
      C: 1,
      O: 4,
      H: 4,
    });
  });
});

describe('areAtomInventoriesBalanced', () => {
  it('is true when every element matches', () => {
    expect(areAtomInventoriesBalanced({ H: 4, O: 2 }, { O: 2, H: 4 })).toBe(true);
  });

  it('is false when a count differs', () => {
    expect(areAtomInventoriesBalanced({ H: 2, O: 2 }, { H: 2, O: 1 })).toBe(false);
  });

  it('is false when an element is missing from one side', () => {
    expect(areAtomInventoriesBalanced({ H: 2, O: 1 }, { H: 2 })).toBe(false);
  });

  it('is false when both sides are empty', () => {
    expect(areAtomInventoriesBalanced({}, {})).toBe(false);
  });
});
