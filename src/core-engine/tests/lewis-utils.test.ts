/**
 * The Share to Fill rules engine (src/core-engine/utils/lewis-utils.ts).
 * Covers the brief's Definition of done: every molecule completes under
 * isComplete, every generated classmate drawing is diagnosed correctly and is
 * never accidentally valid, and a correctly diagnosed drawing can always be
 * repaired by pairing loners.
 */
import { describe, expect, it } from 'vitest';
import { LEWIS_MOLECULES, getLewisMolecule } from '../data/lewis-molecules';
import type { LewisStructure } from '../types/chemistry';
import {
  LEWIS_MUTATIONS,
  applicableMutations,
  bondLineText,
  countAround,
  createAtom,
  createCompleteStructure,
  createStructure,
  diagnose,
  generateFlawedStructure,
  getUnpairedElectrons,
  isComplete,
  isConnected,
  isOnTrack,
  matchesTarget,
  nextMove,
  pairAtoms,
  prepareRepair,
  resetAtoms,
  unpairBond,
} from '../utils/lewis-utils';

const pair = (structure: LewisStructure, a: string, b: string): LewisStructure => {
  const result = pairAtoms(structure, a, b);
  if (!result.ok) throw new Error(`pair ${a}-${b} rejected: ${result.error}`);
  return result.structure;
};

const rejection = (structure: LewisStructure, a: string, b: string) => {
  const result = pairAtoms(structure, a, b);
  return result.ok ? null : result.error;
};

/** Deterministic rng sequence so a test can drive `pick()` through every candidate. */
const rngFrom = (values: number[]) => {
  let i = 0;
  return () => values[i++ % values.length];
};

describe('valence bookkeeping', () => {
  it('derives unpaired electrons as v when v < 4, else 8 - v', () => {
    expect([1, 2, 3, 4, 5, 6, 7].map(getUnpairedElectrons)).toEqual([1, 2, 3, 4, 3, 2, 1]);
  });

  it('gives every atom its own lone pairs and loners at the start of a round', () => {
    const water = createStructure(getLewisMolecule('h2o'));
    expect(water.bonds).toEqual([]);
    expect(water.atoms.map((a) => [a.element, a.lonePairs, a.unpaired])).toEqual([
      ['O', 2, 2],
      ['H', 0, 1],
      ['H', 0, 1],
    ]);
    expect(countAround(water, 'a0')).toBe(6);
    expect(countAround(water, 'a1')).toBe(1);
  });
});

describe('pairAtoms', () => {
  it('shares one loner from each atom and counts the pair toward both', () => {
    const water = createStructure(getLewisMolecule('h2o'));
    const once = pair(water, 'a0', 'a1');
    expect(once.bonds).toHaveLength(1);
    expect(once.bonds[0].order).toBe(1);
    expect(countAround(once, 'a0')).toBe(7);
    expect(countAround(once, 'a1')).toBe(2);
    expect(isComplete(once)).toBe(false);

    const twice = pair(once, 'a2', 'a0');
    expect(countAround(twice, 'a0')).toBe(8);
    expect(isComplete(twice)).toBe(true);
    expect(matchesTarget(twice, getLewisMolecule('h2o'))).toBe(true);
    // The input structures were never mutated.
    expect(water.bonds).toEqual([]);
    expect(once.bonds[0].order).toBe(1);
  });

  it('refuses a pair within one atom, onto a full hydrogen, or onto a full octet', () => {
    const water = createStructure(getLewisMolecule('h2o'));
    expect(rejection(water, 'a0', 'a0')).toBe('sameAtom');
    const done = pair(pair(water, 'a0', 'a1'), 'a0', 'a2');
    const extra = { ...done, atoms: [...done.atoms, createAtom('a3', 'H')] };
    expect(rejection(extra, 'a3', 'a1')).toBe('hydrogenFull');
    expect(rejection(extra, 'a3', 'a0')).toBe('atomFull');
  });

  it('reports a paired dot when the atom has no loner but is not full either', () => {
    const structure: LewisStructure = {
      atoms: [{ ...createAtom('a0', 'O'), lonePairs: 2, unpaired: 0 }, createAtom('a1', 'H')],
      bonds: [],
    };
    expect(rejection(structure, 'a1', 'a0')).toBe('pairedDot');
    expect(rejection(structure, 'a0', 'a1')).toBe('pairedDot');
  });

  it('turns a second pairing between the same atoms into a double bond, and unpairing steps it back down', () => {
    const oxygen = createStructure(getLewisMolecule('o2'));
    const single = pair(oxygen, 'a0', 'a1');
    const double = pair(single, 'a1', 'a0');
    expect(double.bonds).toHaveLength(1);
    expect(double.bonds[0].order).toBe(2);
    expect(isComplete(double)).toBe(true);
    expect(bondLineText(double)).toEqual(['O=O']);

    const backToSingle = unpairBond(double, double.bonds[0].id);
    expect(backToSingle.bonds[0].order).toBe(1);
    expect(backToSingle.atoms.every((a) => a.unpaired === 1)).toBe(true);
    const apart = unpairBond(backToSingle, backToSingle.bonds[0].id);
    expect(apart.bonds).toEqual([]);
    expect(apart.atoms.every((a) => a.unpaired === 2)).toBe(true);
  });
});

describe('isComplete', () => {
  it('requires every atom to be connected, not just full', () => {
    const twoH2: LewisStructure = {
      atoms: ['a0', 'a1', 'a2', 'a3'].map((id) => createAtom(id, 'H')),
      bonds: [],
    };
    const paired = pair(pair(twoH2, 'a0', 'a1'), 'a2', 'a3');
    expect(paired.atoms.every((a) => a.unpaired === 0)).toBe(true);
    expect(isConnected(paired)).toBe(false);
    expect(isComplete(paired)).toBe(false);
  });

  it('is false for a dead end where no loner is left but an atom is short', () => {
    const co2 = getLewisMolecule('co2');
    let s = createStructure(co2);
    s = pair(s, 'a1', 'a2'); // O-O: chemically possible, but not carbon dioxide
    s = pair(s, 'a0', 'a1');
    s = pair(s, 'a0', 'a2');
    expect(s.atoms.map((a) => a.unpaired)).toEqual([2, 0, 0]);
    expect(isComplete(s)).toBe(false);
    expect(isOnTrack(s, co2)).toBe(false);
    const move = nextMove(s, co2);
    expect(move?.kind).toBe('undo');
    if (move?.kind === 'undo') {
      const undone = unpairBond(s, move.bondId);
      expect(isOnTrack(undone, co2)).toBe(true);
      const bond = s.bonds.find((b) => b.id === move.bondId);
      expect([bond?.sourceNodeId, bond?.targetNodeId].sort()).toEqual(['a1', 'a2']);
    }
  });
});

describe('matchesTarget', () => {
  it('accepts ethanol built with the carbons swapped', () => {
    const ethanol = getLewisMolecule('c2h5oh');
    let s = createStructure(ethanol);
    // a1 becomes the CH3 carbon and a0 the carbon bonded to oxygen.
    s = pair(s, 'a0', 'a1');
    s = pair(s, 'a0', 'a2');
    s = pair(s, 'a1', 'a3');
    s = pair(s, 'a1', 'a4');
    s = pair(s, 'a1', 'a5');
    s = pair(s, 'a0', 'a6');
    s = pair(s, 'a0', 'a7');
    s = pair(s, 'a2', 'a8');
    expect(isComplete(s)).toBe(true);
    expect(matchesTarget(s, ethanol)).toBe(true);
  });

  it('rejects a complete isomer (dimethyl ether is not ethanol)', () => {
    const ethanol = getLewisMolecule('c2h5oh');
    let s = createStructure(ethanol);
    s = pair(s, 'a0', 'a2');
    s = pair(s, 'a1', 'a2');
    for (const h of ['a3', 'a4', 'a5']) s = pair(s, 'a0', h);
    for (const h of ['a6', 'a7', 'a8']) s = pair(s, 'a1', h);
    expect(isComplete(s)).toBe(true);
    expect(matchesTarget(s, ethanol)).toBe(false);
    expect(nextMove(s, ethanol)?.kind).toBe('undo');
  });

  it('names the next pair to make for a partly built molecule', () => {
    const water = getLewisMolecule('h2o');
    const move = nextMove(createStructure(water), water);
    expect(move?.kind).toBe('pair');
    if (move?.kind === 'pair') expect(move.atomIds).toContain('a0');
    expect(nextMove(createCompleteStructure(water), water)).toBeNull();
  });
});

describe('diagnose', () => {
  it('finds no error in any correct molecule', () => {
    for (const molecule of LEWIS_MOLECULES) {
      expect(diagnose(createCompleteStructure(molecule)), molecule.id).toEqual({ type: 'none', atomIds: [] });
    }
  });

  it('offers at least two classmate errors for every molecule', () => {
    for (const molecule of LEWIS_MOLECULES) {
      const mutations = applicableMutations(molecule);
      expect(mutations.length, molecule.id).toBeGreaterThanOrEqual(2);
      mutations.forEach((m) => expect(LEWIS_MUTATIONS).toContain(m));
    }
    expect(applicableMutations(getLewisMolecule('ch4'))).not.toContain('tooFew');
    expect(applicableMutations(getLewisMolecule('h2o'))).toContain('hydrogenFull');
    expect(applicableMutations(getLewisMolecule('co2'))).toContain('needsDouble');
    expect(applicableMutations(getLewisMolecule('cl2'))).not.toContain('hydrogenFull');
  });

  it('refuses a mutation the molecule cannot carry', () => {
    expect(() => generateFlawedStructure(getLewisMolecule('ch4'), 'tooFew')).toThrow(/not applicable/);
  });
});

describe('generateFlawedStructure', () => {
  // Enough rng values to reach every candidate atom/bond in the largest molecule.
  const seeds = [0, 0.2, 0.45, 0.7, 0.99];

  it('every mutation is detectable: diagnose() returns the injected error and atoms', () => {
    for (const molecule of LEWIS_MOLECULES) {
      for (const mutation of applicableMutations(molecule)) {
        for (const seed of seeds) {
          const { structure, diagnosis } = generateFlawedStructure(molecule, mutation, rngFrom([seed]));
          const found = diagnose(structure);
          expect(found.type, `${molecule.id} ${mutation} ${seed}`).toBe(mutation);
          expect([...found.atomIds].sort(), `${molecule.id} ${mutation} ${seed}`).toEqual([...diagnosis.atomIds].sort());
          expect(diagnosis.type).toBe(mutation);
        }
      }
    }
  });

  it('no mutation is accidentally valid', () => {
    for (const molecule of LEWIS_MOLECULES) {
      const complete = createCompleteStructure(molecule);
      for (const mutation of applicableMutations(molecule)) {
        for (const seed of seeds) {
          const { structure } = generateFlawedStructure(molecule, mutation, rngFrom([seed]));
          expect(isComplete(structure), `${molecule.id} ${mutation} ${seed}`).toBe(false);
          expect(diagnose(structure).type, `${molecule.id} ${mutation} ${seed}`).not.toBe('none');
          expect(structure, `${molecule.id} ${mutation} ${seed} unchanged`).not.toEqual(complete);
        }
      }
    }
  });

  it('never touches the correct structure it starts from', () => {
    const molecule = getLewisMolecule('h2o');
    const before = createCompleteStructure(molecule);
    generateFlawedStructure(molecule, 'tooFew', () => 0);
    expect(createCompleteStructure(molecule)).toEqual(before);
  });

  it('every diagnosed drawing can be repaired by pairing loners until it is the molecule', () => {
    for (const molecule of LEWIS_MOLECULES) {
      for (const mutation of applicableMutations(molecule)) {
        for (const seed of seeds) {
          const { structure, diagnosis } = generateFlawedStructure(molecule, mutation, rngFrom([seed]));
          let repaired = prepareRepair(structure, diagnosis);
          // Every atom is consistent with its own valence again.
          for (const atom of repaired.atoms) {
            const own = createAtom(atom.id, atom.element);
            expect(atom.lonePairs * 2 + atom.unpaired, `${molecule.id} ${mutation} ${atom.id} electrons`).toBeLessThanOrEqual(own.valence);
          }
          for (let step = 0; step < 20 && !matchesTarget(repaired, molecule); step++) {
            const move = nextMove(repaired, molecule);
            expect(move?.kind, `${molecule.id} ${mutation} ${seed} step ${step}`).toBe('pair');
            if (move?.kind !== 'pair') break;
            repaired = pair(repaired, move.atomIds[0], move.atomIds[1]);
          }
          expect(isComplete(repaired), `${molecule.id} ${mutation} ${seed}`).toBe(true);
          expect(matchesTarget(repaired, molecule), `${molecule.id} ${mutation} ${seed}`).toBe(true);
        }
      }
    }
  });

  it('prepareRepair leaves a downgraded double bond alone and resets the other errors', () => {
    const co2 = getLewisMolecule('co2');
    const half = generateFlawedStructure(co2, 'needsDouble', () => 0);
    expect(prepareRepair(half.structure, half.diagnosis)).toBe(half.structure);

    const water = getLewisMolecule('h2o');
    const full = generateFlawedStructure(water, 'hydrogenFull', () => 0);
    const reset = prepareRepair(full.structure, full.diagnosis);
    const hydrogen = reset.atoms.find((a) => a.id === full.diagnosis.atomIds[0]);
    expect(hydrogen?.unpaired).toBe(1);
    expect(reset.atoms.find((a) => a.element === 'O')).toMatchObject({ lonePairs: 2, unpaired: 1 });
    expect(reset.bonds).toHaveLength(1);
  });
});

describe('resetAtoms', () => {
  it('returns shared electrons to the partners as loners', () => {
    const methane = createCompleteStructure(getLewisMolecule('ch4'));
    const reset = resetAtoms(methane, ['a1']);
    expect(reset.bonds).toHaveLength(3);
    expect(reset.atoms.find((a) => a.id === 'a0')).toMatchObject({ lonePairs: 0, unpaired: 1 });
    expect(reset.atoms.find((a) => a.id === 'a1')).toMatchObject({ lonePairs: 0, unpaired: 1 });
    expect(reset.atoms.find((a) => a.id === 'a2')).toMatchObject({ lonePairs: 0, unpaired: 0 });
  });
});
