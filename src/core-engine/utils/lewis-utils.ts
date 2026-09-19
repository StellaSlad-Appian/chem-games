// src/core-engine/utils/lewis-utils.ts
//
// Pure rules for Share to Fill (Lewis structures). Nothing here touches React
// or the DOM; every function returns a new structure and never mutates its
// input, so the hook and the tests can treat structures as values.
//
// The chemistry is the physics: an atom can only share an unpaired electron,
// a shared pair counts toward both atoms, hydrogen is full at 2 and everything
// else at 8.

import { ELEMENTS_REGISTRY } from '../data/elements';
import { atomId } from '../data/lewis-molecules';
import type {
  BondConnection,
  BondOrder,
  LewisAtomState,
  LewisDiagnosis,
  LewisErrorType,
  LewisMoleculeData,
  LewisStructure,
} from '../types/chemistry';

// ---------------------------------------------------------------------------
// Elements
// ---------------------------------------------------------------------------

export function getElementName(symbol: string): string {
  return ELEMENTS_REGISTRY.find((e) => e.symbol === symbol)?.name ?? symbol;
}

export function getValenceElectrons(symbol: string): number {
  const element = ELEMENTS_REGISTRY.find((e) => e.symbol === symbol);
  if (!element) throw new Error(`Unknown element "${symbol}"`);
  return element.valenceElectrons;
}

/**
 * Unpaired outer electrons for a Year 10 main-group non-metal:
 * H 1, C 4, N 3, O 2, halogens 1 — derived, not memorised.
 */
export function getUnpairedElectrons(valence: number): number {
  return valence < 4 ? valence : 8 - valence;
}

/** Electrons an atom needs around it to be full: a duet for hydrogen, an octet otherwise. */
export const fullCount = (element: string): number => (element === 'H' ? 2 : 8);

export function createAtom(id: string, element: string): LewisAtomState {
  const valence = getValenceElectrons(element);
  const unpaired = getUnpairedElectrons(valence);
  return { id, element, valence, lonePairs: (valence - unpaired) / 2, unpaired };
}

// ---------------------------------------------------------------------------
// Structures
// ---------------------------------------------------------------------------

/** The starting point of a build round: every atom with its own electrons, no bonds. */
export function createStructure(molecule: LewisMoleculeData): LewisStructure {
  return {
    atoms: molecule.atoms.map((element, index) => createAtom(atomId(index), element)),
    bonds: [],
  };
}

/** The finished molecule: every target bond formed, unpaired electrons used up accordingly. */
export function createCompleteStructure(molecule: LewisMoleculeData): LewisStructure {
  let structure = createStructure(molecule);
  for (const bond of molecule.bonds) {
    for (let i = 0; i < bond.order; i++) {
      const result = pairAtoms(structure, bond.sourceNodeId, bond.targetNodeId);
      if (!result.ok) {
        throw new Error(`Molecule ${molecule.id} cannot be built by pairing unpaired electrons (${result.error})`);
      }
      structure = result.structure;
    }
  }
  return structure;
}

export const getAtom = (structure: LewisStructure, id: string): LewisAtomState => {
  const atom = structure.atoms.find((a) => a.id === id);
  if (!atom) throw new Error(`No atom "${id}" in structure`);
  return atom;
};

export const bondsOn = (structure: LewisStructure, id: string): BondConnection[] =>
  structure.bonds.filter((b) => b.sourceNodeId === id || b.targetNodeId === id);

export const bondBetween = (structure: LewisStructure, a: string, b: string): BondConnection | undefined =>
  structure.bonds.find(
    (bond) =>
      (bond.sourceNodeId === a && bond.targetNodeId === b) ||
      (bond.sourceNodeId === b && bond.targetNodeId === a)
  );

export const otherEnd = (bond: BondConnection, id: string): string =>
  bond.sourceNodeId === id ? bond.targetNodeId : bond.sourceNodeId;

/** Shared pairs on an atom (a double bond counts as two). */
export const sharedPairsOn = (structure: LewisStructure, id: string): number =>
  bondsOn(structure, id).reduce((sum, b) => sum + b.order, 0);

/** Electrons drawn around an atom: lone pairs, unpaired electrons and every shared pair. */
export function countAround(structure: LewisStructure, id: string): number {
  const atom = getAtom(structure, id);
  return atom.lonePairs * 2 + atom.unpaired + sharedPairsOn(structure, id) * 2;
}

export const isFull = (structure: LewisStructure, id: string): boolean =>
  countAround(structure, id) === fullCount(getAtom(structure, id).element);

/** True when every atom can be reached from every other through shared pairs. */
export function isConnected(structure: LewisStructure): boolean {
  if (structure.atoms.length <= 1) return true;
  const seen = new Set<string>([structure.atoms[0].id]);
  const queue = [structure.atoms[0].id];
  while (queue.length) {
    const current = queue.shift() as string;
    for (const bond of bondsOn(structure, current)) {
      const next = otherEnd(bond, current);
      if (!seen.has(next)) {
        seen.add(next);
        queue.push(next);
      }
    }
  }
  return seen.size === structure.atoms.length;
}

/**
 * The round-win condition: every atom full (H = 2, others = 8), nothing unpaired left
 * anywhere, and every atom connected to the molecule.
 */
export function isComplete(structure: LewisStructure): boolean {
  return (
    structure.atoms.every((atom) => atom.unpaired === 0 && isFull(structure, atom.id)) &&
    isConnected(structure)
  );
}

export const countBonds = (structure: LewisStructure): number => structure.bonds.length;
export const countSharedPairs = (structure: LewisStructure): number =>
  structure.bonds.reduce((sum, b) => sum + b.order, 0);
export const countLonePairs = (structure: LewisStructure): number =>
  structure.atoms.reduce((sum, a) => sum + a.lonePairs, 0);
export const countUnpaired = (structure: LewisStructure): number =>
  structure.atoms.reduce((sum, a) => sum + a.unpaired, 0);

// ---------------------------------------------------------------------------
// Pairing (build mode)
// ---------------------------------------------------------------------------

export type PairRejection = 'sameAtom' | 'atomFull' | 'hydrogenFull' | 'pairedDot';

export type PairResult =
  | { ok: true; structure: LewisStructure; bondId: string }
  | { ok: false; error: PairRejection; atomId: string };

/** Deterministic: the lowest `b<n>` not already used in this structure. */
const nextBondId = (structure: LewisStructure): string => {
  let n = 0;
  while (structure.bonds.some((b) => b.id === `b${n}`)) n++;
  return `b${n}`;
};

/**
 * Shares one unpaired electron from `sourceId` with one on `targetId`. A second
 * pairing between the same two atoms raises the bond order (double, triple).
 */
export function pairAtoms(structure: LewisStructure, sourceId: string, targetId: string): PairResult {
  if (sourceId === targetId) return { ok: false, error: 'sameAtom', atomId: sourceId };
  const source = getAtom(structure, sourceId);
  const target = getAtom(structure, targetId);

  if (source.unpaired === 0) return rejectNoLoner(structure, source);
  if (target.unpaired === 0) return rejectNoLoner(structure, target);

  const atoms = structure.atoms.map((atom) =>
    atom.id === sourceId || atom.id === targetId ? { ...atom, unpaired: atom.unpaired - 1 } : atom
  );

  const existing = bondBetween(structure, sourceId, targetId);
  if (existing) {
    const order = Math.min(3, existing.order + 1) as BondOrder;
    return {
      ok: true,
      bondId: existing.id,
      structure: {
        atoms,
        bonds: structure.bonds.map((b) => (b.id === existing.id ? { ...b, order } : b)),
      },
    };
  }

  const bondId = nextBondId(structure);
  return {
    ok: true,
    bondId,
    structure: {
      atoms,
      bonds: [...structure.bonds, { id: bondId, sourceNodeId: sourceId, targetNodeId: targetId, order: 1 }],
    },
  };
}

function rejectNoLoner(structure: LewisStructure, atom: LewisAtomState): PairResult {
  if (countAround(structure, atom.id) >= fullCount(atom.element)) {
    return { ok: false, error: atom.element === 'H' ? 'hydrogenFull' : 'atomFull', atomId: atom.id };
  }
  return { ok: false, error: 'pairedDot', atomId: atom.id };
}

/** Undoes one shared pair: both atoms get their electron back, unpaired. */
export function unpairBond(structure: LewisStructure, bondId: string): LewisStructure {
  const bond = structure.bonds.find((b) => b.id === bondId);
  if (!bond) return structure;
  const atoms = structure.atoms.map((atom) =>
    atom.id === bond.sourceNodeId || atom.id === bond.targetNodeId
      ? { ...atom, unpaired: atom.unpaired + 1 }
      : atom
  );
  const bonds =
    bond.order > 1
      ? structure.bonds.map((b) => (b.id === bondId ? { ...b, order: (b.order - 1) as BondOrder } : b))
      : structure.bonds.filter((b) => b.id !== bondId);
  return { atoms, bonds };
}

// ---------------------------------------------------------------------------
// Matching the target molecule
// ---------------------------------------------------------------------------

/**
 * Finds a one-to-one mapping from the structure's atoms onto the molecule's
 * atoms that preserves elements and, for every bond drawn so far, lands on a
 * target bond of at least that order (`exact`: of the same order, with no
 * target bond left undrawn). Graphs are tiny (≤ 9 atoms), so backtracking is
 * fine.
 */
function findEmbedding(
  structure: LewisStructure,
  molecule: LewisMoleculeData,
  exact: boolean
): Map<string, string> | null {
  const targetOrder = new Map<string, number>();
  for (const bond of molecule.bonds) {
    targetOrder.set(`${bond.sourceNodeId}|${bond.targetNodeId}`, bond.order);
    targetOrder.set(`${bond.targetNodeId}|${bond.sourceNodeId}`, bond.order);
  }
  if (exact && countSharedPairs(structure) !== molecule.bonds.reduce((s, b) => s + b.order, 0)) {
    return null;
  }

  const targetIds = molecule.atoms.map((_, i) => atomId(i));
  // Heavy atoms first: they carry the constraints and prune early.
  const order = [...structure.atoms].sort((a, b) => Number(a.element === 'H') - Number(b.element === 'H'));
  const mapping = new Map<string, string>();
  const used = new Set<string>();

  const fits = (atom: LewisAtomState, candidate: string): boolean => {
    for (const bond of bondsOn(structure, atom.id)) {
      const neighbour = mapping.get(otherEnd(bond, atom.id));
      if (!neighbour) continue;
      const target = targetOrder.get(`${candidate}|${neighbour}`) ?? 0;
      if (exact ? target !== bond.order : target < bond.order) return false;
    }
    return true;
  };

  const search = (index: number): boolean => {
    if (index === order.length) return true;
    const atom = order[index];
    for (let i = 0; i < targetIds.length; i++) {
      const candidate = targetIds[i];
      if (used.has(candidate) || molecule.atoms[i] !== atom.element || !fits(atom, candidate)) continue;
      mapping.set(atom.id, candidate);
      used.add(candidate);
      if (search(index + 1)) return true;
      mapping.delete(atom.id);
      used.delete(candidate);
    }
    return false;
  };

  return search(0) ? mapping : null;
}

/** True when the drawn bonds are exactly the molecule's bonds (up to relabelling). */
export const matchesTarget = (structure: LewisStructure, molecule: LewisMoleculeData): boolean =>
  findEmbedding(structure, molecule, true) !== null;

/** True when everything drawn so far could still become the molecule. */
export const isOnTrack = (structure: LewisStructure, molecule: LewisMoleculeData): boolean =>
  findEmbedding(structure, molecule, false) !== null;

export type NextMove =
  | { kind: 'pair'; atomIds: [string, string] }
  | { kind: 'undo'; bondId: string }
  | null;

/**
 * One concrete step toward the target (hint tier 3): a pair of atoms whose
 * unpaired electrons should be shared, or, when the drawing has wandered off the target,
 * the shared pair to undo. Null once the structure matches.
 */
export function nextMove(structure: LewisStructure, molecule: LewisMoleculeData): NextMove {
  if (matchesTarget(structure, molecule)) return null;
  const mapping = findEmbedding(structure, molecule, false);
  if (mapping) {
    const reverse = new Map<string, string>();
    mapping.forEach((target, current) => reverse.set(target, current));
    // Prefer the pair the coach would name: heavy atoms first, central first.
    for (const bond of molecule.bonds) {
      const a = reverse.get(bond.sourceNodeId);
      const b = reverse.get(bond.targetNodeId);
      if (!a || !b) continue;
      const drawn = bondBetween(structure, a, b)?.order ?? 0;
      if (drawn < bond.order && getAtom(structure, a).unpaired > 0 && getAtom(structure, b).unpaired > 0) {
        return { kind: 'pair', atomIds: [a, b] };
      }
    }
    return null;
  }
  for (const bond of structure.bonds) {
    if (isOnTrack(unpairBond(structure, bond.id), molecule)) return { kind: 'undo', bondId: bond.id };
  }
  return { kind: 'undo', bondId: structure.bonds[0]?.id ?? '' };
}

// ---------------------------------------------------------------------------
// Inspect mode: diagnosing and generating classmate drawings
// ---------------------------------------------------------------------------

/**
 * Reads a drawing and names its single error. Checks run in priority order so
 * every generated flaw has one deterministic diagnosis:
 *   hydrogen sharing twice → a downgraded multiple bond → a stray electron →
 *   too many → too few → none.
 */
export function diagnose(structure: LewisStructure): LewisDiagnosis {
  const hydrogen = structure.atoms.find((a) => a.element === 'H' && sharedPairsOn(structure, a.id) > 1);
  if (hydrogen) return { type: 'hydrogenFull', atomIds: [hydrogen.id] };

  const halfBond = structure.bonds.find(
    (b) => getAtom(structure, b.sourceNodeId).unpaired > 0 && getAtom(structure, b.targetNodeId).unpaired > 0
  );
  if (halfBond) return { type: 'needsDouble', atomIds: [halfBond.sourceNodeId, halfBond.targetNodeId] };

  const loner = structure.atoms.find((a) => a.unpaired > 0);
  if (loner) return { type: 'leftover', atomIds: [loner.id] };

  const tooMany = structure.atoms.find((a) => countAround(structure, a.id) > fullCount(a.element));
  if (tooMany) return { type: 'tooMany', atomIds: [tooMany.id] };

  const tooFew = structure.atoms.find((a) => countAround(structure, a.id) < fullCount(a.element));
  if (tooFew) return { type: 'tooFew', atomIds: [tooFew.id] };

  return { type: 'none', atomIds: [] };
}

export type LewisMutation = Exclude<LewisErrorType, 'none'>;

export const LEWIS_MUTATIONS: readonly LewisMutation[] = [
  'tooFew',
  'tooMany',
  'leftover',
  'hydrogenFull',
  'needsDouble',
];

const heavyAtoms = (structure: LewisStructure) => structure.atoms.filter((a) => a.element !== 'H');

/** Which classmate errors can be injected into this molecule. */
export function applicableMutations(molecule: LewisMoleculeData): LewisMutation[] {
  const complete = createCompleteStructure(molecule);
  const result: LewisMutation[] = [];
  if (heavyAtoms(complete).some((a) => a.lonePairs > 0)) result.push('tooFew');
  // An extra pair or a stray dot can be drawn on any atom, hydrogen included.
  result.push('tooMany', 'leftover');
  if (hydrogensWithPairedPartner(complete).length > 0) result.push('hydrogenFull');
  if (complete.bonds.some((b) => b.order > 1)) result.push('needsDouble');
  return result;
}

const hydrogensWithPairedPartner = (structure: LewisStructure) =>
  structure.atoms.filter((a) => {
    if (a.element !== 'H') return false;
    const [bond] = bondsOn(structure, a.id);
    return bond !== undefined && getAtom(structure, otherEnd(bond, a.id)).lonePairs > 0;
  });

const pick = <T>(items: T[], rng: () => number): T => items[Math.floor(rng() * items.length) % items.length];

/**
 * A "drawn by a classmate" version of the molecule with exactly one known
 * error. `diagnose()` of the result is the returned diagnosis (unit-tested for
 * every molecule and every applicable mutation).
 */
export function generateFlawedStructure(
  molecule: LewisMoleculeData,
  errorType: LewisMutation,
  rng: () => number = Math.random
): { structure: LewisStructure; diagnosis: LewisDiagnosis } {
  const complete = createCompleteStructure(molecule);
  if (!applicableMutations(molecule).includes(errorType)) {
    throw new Error(`Mutation "${errorType}" is not applicable to ${molecule.id}`);
  }
  const update = (id: string, change: Partial<LewisAtomState>): LewisAtomState[] =>
    complete.atoms.map((a) => (a.id === id ? { ...a, ...change } : a));

  switch (errorType) {
    case 'tooFew': {
      const atom = pick(heavyAtoms(complete).filter((a) => a.lonePairs > 0), rng);
      return {
        structure: { ...complete, atoms: update(atom.id, { lonePairs: atom.lonePairs - 1 }) },
        diagnosis: { type: 'tooFew', atomIds: [atom.id] },
      };
    }
    case 'tooMany': {
      const atom = pick(complete.atoms, rng);
      return {
        structure: { ...complete, atoms: update(atom.id, { lonePairs: atom.lonePairs + 1 }) },
        diagnosis: { type: 'tooMany', atomIds: [atom.id] },
      };
    }
    case 'leftover': {
      const atom = pick(complete.atoms, rng);
      return {
        structure: { ...complete, atoms: update(atom.id, { unpaired: atom.unpaired + 1 }) },
        diagnosis: { type: 'leftover', atomIds: [atom.id] },
      };
    }
    case 'hydrogenFull': {
      // The classmate turned a lone pair on hydrogen's partner into a second
      // shared pair with the same hydrogen (H=X): hydrogen now has 4.
      const hydrogen = pick(hydrogensWithPairedPartner(complete), rng);
      const [bond] = bondsOn(complete, hydrogen.id);
      const partner = getAtom(complete, otherEnd(bond, hydrogen.id));
      return {
        structure: {
          atoms: update(partner.id, { lonePairs: partner.lonePairs - 1 }),
          bonds: complete.bonds.map((b) => (b.id === bond.id ? { ...b, order: (b.order + 1) as BondOrder } : b)),
        },
        diagnosis: { type: 'hydrogenFull', atomIds: [hydrogen.id] },
      };
    }
    case 'needsDouble': {
      const bond = pick(complete.bonds.filter((b) => b.order > 1), rng);
      const structure = unpairBond(complete, bond.id);
      return { structure, diagnosis: { type: 'needsDouble', atomIds: [bond.sourceNodeId, bond.targetNodeId] } };
    }
  }
}

/**
 * Gives an atom back its own electrons: removes every shared pair on it and
 * lets the partners keep theirs unpaired, so the player can re-pair with the
 * build-mode tools. Partners are re-normalised against their true valence so
 * an electron the classmate invented (or lost) disappears with the reset.
 */
export function resetAtoms(structure: LewisStructure, atomIds: string[]): LewisStructure {
  const reset = new Set(atomIds);
  const touched = new Set(atomIds);
  const bonds = structure.bonds.filter((bond) => {
    const touches = reset.has(bond.sourceNodeId) || reset.has(bond.targetNodeId);
    if (touches) {
      touched.add(bond.sourceNodeId);
      touched.add(bond.targetNodeId);
    }
    return !touches;
  });
  const next: LewisStructure = { atoms: structure.atoms, bonds };
  const atoms = structure.atoms.map((atom) => (touched.has(atom.id) ? normaliseAtom(atom, sharedPairsOn(next, atom.id)) : atom));
  return { atoms, bonds };
}

/** An atom's own lone pairs and unpaired electrons given how many pairs it currently shares. */
function normaliseAtom(atom: LewisAtomState, sharedPairs: number): LewisAtomState {
  const fresh = createAtom(atom.id, atom.element);
  let lonePairs = fresh.lonePairs;
  let unpaired = fresh.unpaired - sharedPairs;
  while (unpaired < 0 && lonePairs > 0) {
    lonePairs -= 1;
    unpaired += 2;
  }
  return { ...fresh, lonePairs, unpaired: Math.max(0, unpaired) };
}

/** The structure the player repairs after naming the error correctly. */
export function prepareRepair(structure: LewisStructure, diagnosis: LewisDiagnosis): LewisStructure {
  if (diagnosis.type === 'none' || diagnosis.type === 'needsDouble') return structure;
  return resetAtoms(structure, diagnosis.atomIds);
}

// ---------------------------------------------------------------------------
// Symbolic notation
// ---------------------------------------------------------------------------

export const BOND_SYMBOL: Record<BondOrder, string> = { 1: '-', 2: '=', 3: '≡' };

/** The two ends of a bond with the heavier atom first, so "C-H" never reads "H-C". */
export function bondEnds(structure: LewisStructure, bond: BondConnection): [LewisAtomState, LewisAtomState] {
  const a = getAtom(structure, bond.sourceNodeId);
  const b = getAtom(structure, bond.targetNodeId);
  return a.element === 'H' && b.element !== 'H' ? [b, a] : [a, b];
}

/** Every drawn bond as "O-H", "C=O" — the live bond-line readout. */
export function bondLineText(structure: LewisStructure): string[] {
  return structure.bonds.map((bond) => {
    const [a, b] = bondEnds(structure, bond);
    return `${a.element}${BOND_SYMBOL[bond.order]}${b.element}`;
  });
}
