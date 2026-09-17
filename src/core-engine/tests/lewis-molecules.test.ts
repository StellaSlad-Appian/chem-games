/**
 * Data-integrity checks for the Share to Fill molecule set
 * (src/core-engine/data/lewis-molecules.ts). The answer key for the game is
 * the bond graph of each molecule, so every molecule must be buildable by
 * pairing loners, and the hand-checked bond / lone-pair counts must match.
 */
import { describe, expect, it } from 'vitest';
import { ELEMENTS_REGISTRY } from '../data/elements';
import { LEWIS_MOLECULES, atomId, getLewisMolecule, moleculesForLevel } from '../data/lewis-molecules';
import {
  countBonds,
  countLonePairs,
  countSharedPairs,
  createCompleteStructure,
  getUnpairedElectrons,
  getValenceElectrons,
  isComplete,
  matchesTarget,
} from '../utils/lewis-utils';

/** Element counts from an ASCII formula such as C2H5OH (no brackets needed here). */
function parseFormula(formula: string): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const [, symbol, digits] of formula.matchAll(/([A-Z][a-z]?)(\d*)/g)) {
    counts[symbol] = (counts[symbol] ?? 0) + (digits ? Number(digits) : 1);
  }
  return counts;
}

/** Hand table from the brief's Definition of done: bonds and lone pairs per molecule (a double bond counts once). */
const HAND_COUNTS: Record<string, { bonds: number; sharedPairs: number; lonePairs: number }> = {
  h2: { bonds: 1, sharedPairs: 1, lonePairs: 0 },
  cl2: { bonds: 1, sharedPairs: 1, lonePairs: 6 },
  hcl: { bonds: 1, sharedPairs: 1, lonePairs: 3 },
  h2o: { bonds: 2, sharedPairs: 2, lonePairs: 2 },
  nh3: { bonds: 3, sharedPairs: 3, lonePairs: 1 },
  ch4: { bonds: 4, sharedPairs: 4, lonePairs: 0 },
  h2s: { bonds: 2, sharedPairs: 2, lonePairs: 2 },
  ph3: { bonds: 3, sharedPairs: 3, lonePairs: 1 },
  o2: { bonds: 1, sharedPairs: 2, lonePairs: 4 },
  co2: { bonds: 2, sharedPairs: 4, lonePairs: 4 },
  n2: { bonds: 1, sharedPairs: 3, lonePairs: 2 },
  c2h4: { bonds: 5, sharedPairs: 6, lonePairs: 0 },
  c2h2: { bonds: 3, sharedPairs: 5, lonePairs: 0 },
  c2h6: { bonds: 7, sharedPairs: 7, lonePairs: 0 },
  ccl4: { bonds: 4, sharedPairs: 4, lonePairs: 12 },
  ch3cl: { bonds: 4, sharedPairs: 4, lonePairs: 3 },
  h2o2: { bonds: 3, sharedPairs: 3, lonePairs: 4 },
  c2h5oh: { bonds: 8, sharedPairs: 8, lonePairs: 2 },
};

const LEVEL_ORDER: Record<number, string[]> = {
  1: ['h2', 'cl2', 'hcl'],
  2: ['h2o', 'nh3', 'ch4', 'h2s', 'ph3'],
  3: ['o2', 'co2', 'n2', 'c2h4', 'c2h2'],
  4: ['c2h6', 'ccl4', 'ch3cl', 'h2o2', 'c2h5oh'],
};

describe('LEWIS_MOLECULES', () => {
  it('holds the 18 approved molecules with unique ids', () => {
    expect(LEWIS_MOLECULES).toHaveLength(18);
    expect(new Set(LEWIS_MOLECULES.map((m) => m.id)).size).toBe(18);
    expect(Object.keys(HAND_COUNTS).sort()).toEqual(LEWIS_MOLECULES.map((m) => m.id).sort());
  });

  it('plays the levels in the order the brief specifies', () => {
    for (const [level, ids] of Object.entries(LEVEL_ORDER)) {
      expect(moleculesForLevel(Number(level)).map((m) => m.id)).toEqual(ids);
    }
    LEWIS_MOLECULES.forEach((m) => expect(m.level, m.id).toBeGreaterThanOrEqual(1));
    LEWIS_MOLECULES.forEach((m) => expect(m.level, m.id).toBeLessThanOrEqual(4));
  });

  it('uses only registry elements and formulas that match the atom list', () => {
    const symbols = new Set(ELEMENTS_REGISTRY.map((e) => e.symbol));
    for (const molecule of LEWIS_MOLECULES) {
      molecule.atoms.forEach((symbol) => expect(symbols.has(symbol), `${molecule.id} ${symbol}`).toBe(true));
      const fromAtoms: Record<string, number> = {};
      molecule.atoms.forEach((s) => (fromAtoms[s] = (fromAtoms[s] ?? 0) + 1));
      expect(parseFormula(molecule.formula), molecule.id).toEqual(fromAtoms);
    }
  });

  it('references real atoms in its bonds, never twice for the same pair, and never a hydrogen as central', () => {
    for (const molecule of LEWIS_MOLECULES) {
      const ids = molecule.atoms.map((_, i) => atomId(i));
      const seen = new Set<string>();
      for (const bond of molecule.bonds) {
        expect(ids, `${molecule.id} ${bond.id}`).toContain(bond.sourceNodeId);
        expect(ids, `${molecule.id} ${bond.id}`).toContain(bond.targetNodeId);
        expect(bond.sourceNodeId).not.toBe(bond.targetNodeId);
        const key = [bond.sourceNodeId, bond.targetNodeId].sort().join('|');
        expect(seen.has(key), `${molecule.id} duplicate bond ${key}`).toBe(false);
        seen.add(key);
      }
      if (molecule.atoms.some((a) => a !== 'H')) {
        expect(molecule.atoms[molecule.centralAtomIndex], molecule.id).not.toBe('H');
      }
    }
  });

  it('completes every molecule by pairing loners, and the result is the target', () => {
    for (const molecule of LEWIS_MOLECULES) {
      const structure = createCompleteStructure(molecule);
      expect(isComplete(structure), molecule.id).toBe(true);
      expect(matchesTarget(structure, molecule), molecule.id).toBe(true);
    }
  });

  it('matches the hand-checked bond, shared-pair and lone-pair counts', () => {
    for (const molecule of LEWIS_MOLECULES) {
      const structure = createCompleteStructure(molecule);
      expect(
        { bonds: countBonds(structure), sharedPairs: countSharedPairs(structure), lonePairs: countLonePairs(structure) },
        molecule.id
      ).toEqual(HAND_COUNTS[molecule.id]);
    }
  });

  it('derives the unpaired electrons the brief tabulates for H, C, N, O, Cl, S and P', () => {
    const table: Record<string, number> = { H: 1, C: 4, N: 3, O: 2, Cl: 1, S: 2, P: 3 };
    for (const [symbol, unpaired] of Object.entries(table)) {
      expect(getUnpairedElectrons(getValenceElectrons(symbol)), symbol).toBe(unpaired);
    }
  });

  it('pairs the same-group rounds with a molecule of the same shape', () => {
    const withAnalogue = LEWIS_MOLECULES.filter((m) => m.sameGroupAs);
    expect(withAnalogue.map((m) => m.id)).toEqual(['h2s', 'ph3']);
    for (const molecule of withAnalogue) {
      const analogue = getLewisMolecule(molecule.sameGroupAs as string);
      expect(analogue.level).toBeLessThanOrEqual(molecule.level);
      expect(analogue.atoms.length).toBe(molecule.atoms.length);
      expect(analogue.bonds.map((b) => [b.sourceNodeId, b.targetNodeId, b.order])).toEqual(
        molecule.bonds.map((b) => [b.sourceNodeId, b.targetNodeId, b.order])
      );
    }
  });

  it('ships a strategy hint, a bond-line and a property line for every molecule', () => {
    for (const molecule of LEWIS_MOLECULES) {
      expect(molecule.tier2Hint.length, molecule.id).toBeGreaterThan(20);
      expect(molecule.bondLine.length, molecule.id).toBeGreaterThan(2);
      expect(molecule.propertyLine.length, molecule.id).toBeGreaterThan(20);
    }
  });
});
