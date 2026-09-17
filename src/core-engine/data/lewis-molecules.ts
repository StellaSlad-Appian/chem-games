// src/core-engine/data/lewis-molecules.ts
//
// The 18 covalent molecules for Share to Fill (docs/game-briefs/lewis-structures.md,
// "Difficulty progression"). Order within a level is deliberate: molecules are
// sorted by familiarity, and the two "same group, same structure" rounds
// (H2S after H2O, PH3 after NH3) make the periodic-table point explicitly.
//
// To swap a molecule, edit `level` / `order` here — the config file holds only
// tuning numbers. Atom 0 is the central atom unless `centralAtomIndex` says
// otherwise; hydrogen is never central.

import type { BondConnection, BondOrder, LewisMoleculeData } from '../types/chemistry';

export const atomId = (index: number): string => `a${index}`;

type BondSpec = [from: number, to: number, order?: BondOrder];

const bonds = (specs: BondSpec[]): BondConnection[] =>
  specs.map(([from, to, order = 1], index) => ({
    id: `b${index}`,
    sourceNodeId: atomId(from),
    targetNodeId: atomId(to),
    order,
  }));

type MoleculeSpec = Omit<LewisMoleculeData, 'bonds' | 'centralAtomIndex'> & {
  bonds: BondSpec[];
  centralAtomIndex?: number;
};

const molecule = (spec: MoleculeSpec): LewisMoleculeData => ({
  ...spec,
  centralAtomIndex: spec.centralAtomIndex ?? 0,
  bonds: bonds(spec.bonds),
});

export const LEWIS_MOLECULES: LewisMoleculeData[] = [
  // ---------------------------------------------------------------- Level 1
  molecule({
    id: 'h2',
    name: 'Hydrogen',
    formula: 'H2',
    atoms: ['H', 'H'],
    bonds: [[0, 1]],
    level: 1,
    order: 1,
    tier2Hint: 'Each hydrogen has one loner. Two loners from two atoms make one shared pair.',
    bondLine: 'H-H',
    propertyLine: 'Hydrogen — the lightest gas there is. The two atoms share one pair and both are full at 2.',
  }),
  molecule({
    id: 'cl2',
    name: 'Chlorine',
    formula: 'Cl2',
    atoms: ['Cl', 'Cl'],
    bonds: [[0, 1]],
    level: 1,
    order: 2,
    tier2Hint: 'Chlorine has 7 outer electrons: three pairs and one loner. Each chlorine shares its one loner.',
    bondLine: 'Cl-Cl',
    propertyLine: 'Chlorine — a yellow-green gas. Each chlorine keeps three lone pairs and shares one pair.',
  }),
  molecule({
    id: 'hcl',
    name: 'Hydrogen chloride',
    formula: 'HCl',
    atoms: ['Cl', 'H'],
    bonds: [[0, 1]],
    level: 1,
    order: 3,
    tier2Hint: 'Hydrogen has one loner and chlorine has one loner, so they share exactly one pair.',
    bondLine: 'H-Cl',
    propertyLine: 'Hydrogen chloride — a gas that dissolves in water to make hydrochloric acid.',
  }),

  // ---------------------------------------------------------------- Level 2
  molecule({
    id: 'h2o',
    name: 'Water',
    formula: 'H2O',
    atoms: ['O', 'H', 'H'],
    bonds: [[0, 1], [0, 2]],
    level: 2,
    order: 1,
    tier2Hint: 'Oxygen has two loners, so it shares with both hydrogens. Its two pairs stay put.',
    bondLine: 'H-O-H',
    propertyLine:
      'Water — a liquid at room temperature; the bent shape you\'ll meet next year comes from those two lone pairs.',
  }),
  molecule({
    id: 'nh3',
    name: 'Ammonia',
    formula: 'NH3',
    atoms: ['N', 'H', 'H', 'H'],
    bonds: [[0, 1], [0, 2], [0, 3]],
    level: 2,
    order: 2,
    tier2Hint: 'Nitrogen has three loners and one pair, so it shares with all three hydrogens.',
    bondLine: 'H-N(-H)-H',
    propertyLine: 'Ammonia — a sharp-smelling gas used to make fertiliser. Nitrogen keeps one lone pair.',
  }),
  molecule({
    id: 'ch4',
    name: 'Methane',
    formula: 'CH4',
    atoms: ['C', 'H', 'H', 'H', 'H'],
    bonds: [[0, 1], [0, 2], [0, 3], [0, 4]],
    level: 2,
    order: 3,
    tier2Hint: 'Carbon has four loners, so it will share with all four hydrogens.',
    bondLine: 'H-C(-H)(-H)-H',
    propertyLine: 'Methane — natural gas. Carbon has no lone pairs at all: every outer electron is shared.',
  }),
  molecule({
    id: 'h2s',
    name: 'Hydrogen sulfide',
    formula: 'H2S',
    atoms: ['S', 'H', 'H'],
    bonds: [[0, 1], [0, 2]],
    level: 2,
    order: 4,
    tier2Hint: 'Sulfur is in the same group as oxygen, so it also has two loners and two pairs — build it like water.',
    bondLine: 'H-S-H',
    propertyLine: 'Hydrogen sulfide — the rotten-egg gas. Same structure as water because sulfur sits under oxygen.',
    sameGroupAs: 'h2o',
  }),
  molecule({
    id: 'ph3',
    name: 'Phosphine',
    formula: 'PH3',
    atoms: ['P', 'H', 'H', 'H'],
    bonds: [[0, 1], [0, 2], [0, 3]],
    level: 2,
    order: 5,
    tier2Hint: 'Phosphorus is in the same group as nitrogen, so it has three loners — build it like ammonia.',
    bondLine: 'H-P(-H)-H',
    propertyLine: 'Phosphine — a gas that glows faintly in air. Same structure as ammonia because phosphorus sits under nitrogen.',
    sameGroupAs: 'nh3',
  }),

  // ---------------------------------------------------------------- Level 3
  molecule({
    id: 'o2',
    name: 'Oxygen',
    formula: 'O2',
    atoms: ['O', 'O'],
    bonds: [[0, 1, 2]],
    level: 3,
    order: 1,
    tier2Hint: 'Each oxygen has two loners. After one shared pair both still have a loner — share again for a double bond.',
    bondLine: 'O=O',
    propertyLine: 'Oxygen — the gas we breathe. Two shared pairs between the atoms make a double bond.',
  }),
  molecule({
    id: 'co2',
    name: 'Carbon dioxide',
    formula: 'CO2',
    atoms: ['C', 'O', 'O'],
    bonds: [[0, 1, 2], [0, 2, 2]],
    level: 3,
    order: 2,
    tier2Hint: 'Carbon has four loners and each oxygen has two, so carbon shares twice with each oxygen.',
    bondLine: 'O=C=O',
    propertyLine: 'Carbon dioxide — the gas from burning and breathing. Two double bonds, and no lone pairs on carbon.',
  }),
  molecule({
    id: 'n2',
    name: 'Nitrogen',
    formula: 'N2',
    atoms: ['N', 'N'],
    bonds: [[0, 1, 3]],
    level: 3,
    order: 3,
    tier2Hint: 'Each nitrogen has three loners. Share all three between the same two atoms for a triple bond.',
    bondLine: 'N≡N',
    propertyLine: 'Nitrogen — most of the air. The triple bond is so strong that nitrogen barely reacts.',
  }),
  molecule({
    id: 'c2h4',
    name: 'Ethene',
    formula: 'C2H4',
    atoms: ['C', 'C', 'H', 'H', 'H', 'H'],
    bonds: [[0, 1, 2], [0, 2], [0, 3], [1, 4], [1, 5]],
    level: 3,
    order: 4,
    tier2Hint: 'Each carbon shares with two hydrogens, then the carbons still have two loners each — share twice between them.',
    bondLine: 'H2C=CH2',
    propertyLine: 'Ethene — the gas that ripens fruit and makes polythene. Its carbon=carbon double bond is what reacts.',
  }),
  molecule({
    id: 'c2h2',
    name: 'Ethyne',
    formula: 'C2H2',
    atoms: ['C', 'C', 'H', 'H'],
    bonds: [[0, 1, 3], [0, 2], [1, 3]],
    level: 3,
    order: 5,
    tier2Hint: 'Each carbon shares one pair with a hydrogen; the three loners left on each carbon make a triple bond.',
    bondLine: 'H-C≡C-H',
    propertyLine: 'Ethyne (acetylene) — the welding-torch gas. A triple bond between the carbons.',
  }),

  // ---------------------------------------------------------------- Level 4
  molecule({
    id: 'c2h6',
    name: 'Ethane',
    formula: 'C2H6',
    atoms: ['C', 'C', 'H', 'H', 'H', 'H', 'H', 'H'],
    bonds: [[0, 1], [0, 2], [0, 3], [0, 4], [1, 5], [1, 6], [1, 7]],
    level: 4,
    order: 1,
    tier2Hint: 'The two carbons share one pair with each other; each carbon then shares its other three loners with three hydrogens.',
    bondLine: 'CH3-CH3',
    propertyLine: 'Ethane — found in natural gas. Every bond is single and no atom has a lone pair.',
  }),
  molecule({
    id: 'ccl4',
    name: 'Tetrachloromethane',
    formula: 'CCl4',
    atoms: ['C', 'Cl', 'Cl', 'Cl', 'Cl'],
    bonds: [[0, 1], [0, 2], [0, 3], [0, 4]],
    level: 4,
    order: 2,
    tier2Hint: 'Carbon has the most loners (four), so it goes in the middle and shares one pair with each chlorine.',
    bondLine: 'Cl-C(-Cl)(-Cl)-Cl',
    propertyLine: 'Tetrachloromethane — once a dry-cleaning solvent. Each chlorine keeps three lone pairs.',
  }),
  molecule({
    id: 'ch3cl',
    name: 'Chloromethane',
    formula: 'CH3Cl',
    atoms: ['C', 'Cl', 'H', 'H', 'H'],
    bonds: [[0, 1], [0, 2], [0, 3], [0, 4]],
    level: 4,
    order: 3,
    tier2Hint: 'Carbon has four loners, so it is central: three pairs shared with hydrogens and one with chlorine.',
    bondLine: 'CH3-Cl',
    propertyLine: 'Chloromethane — methane with one hydrogen swapped for chlorine. Chlorine keeps three lone pairs.',
  }),
  molecule({
    id: 'h2o2',
    name: 'Hydrogen peroxide',
    formula: 'H2O2',
    atoms: ['O', 'O', 'H', 'H'],
    bonds: [[0, 1], [0, 2], [1, 3]],
    level: 4,
    order: 4,
    tier2Hint: 'Hydrogen can only share once, so the two oxygens must share with each other, then each takes a hydrogen.',
    bondLine: 'H-O-O-H',
    propertyLine: 'Hydrogen peroxide — the bleach in hair dye. The oxygen-oxygen single bond breaks easily.',
  }),
  molecule({
    id: 'c2h5oh',
    name: 'Ethanol',
    formula: 'C2H5OH',
    atoms: ['C', 'C', 'O', 'H', 'H', 'H', 'H', 'H', 'H'],
    bonds: [[0, 1], [1, 2], [0, 3], [0, 4], [0, 5], [1, 6], [1, 7], [2, 8]],
    level: 4,
    order: 5,
    tier2Hint: 'Chain the two carbons and the oxygen (C-C-O), then give each carbon its hydrogens and the oxygen one hydrogen.',
    bondLine: 'CH3-CH2-OH',
    propertyLine: 'Ethanol — the alcohol in drinks and hand sanitiser. The O-H end is what makes it mix with water.',
  }),
];

export const getLewisMolecule = (id: string): LewisMoleculeData => {
  const found = LEWIS_MOLECULES.find((m) => m.id === id);
  if (!found) throw new Error(`Unknown Lewis molecule "${id}"`);
  return found;
};

/** Molecules for a build level, in the order they are played. */
export const moleculesForLevel = (level: number): LewisMoleculeData[] =>
  LEWIS_MOLECULES.filter((m) => m.level === level).sort((a, b) => a.order - b.order);
