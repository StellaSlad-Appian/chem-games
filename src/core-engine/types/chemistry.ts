// src/core-engine/types/chemistry.ts

export type ChemicalClassification = 'Acidic' | 'Basic' | 'Neutral' | 'Amphoteric';
export type PhysicalState = 'solid' | 'liquid' | 'gas';
export type ShortPhysicalState = 's' | 'l' | 'g' | 'aq';

export type ElementCategory =
  | 'nonmetal'
  | 'noble-gas'
  | 'alkali-metal'
  | 'alkaline-earth'
  | 'metalloid'
  | 'halogen'
  | 'transition-metal'
  | 'post-transition-metal';

export type FormulaTokenType =
  | 'text'
  | 'coefficient'
  | 'symbol'
  | 'subscript'
  | 'superscript'
  | 'operator'
  | 'state';

export interface FormulaToken {
  type: FormulaTokenType;
  value: string;
}

export interface ChemicalComposition {
  symbol: string;
  name?: string; // e.g. "Carbon", "Hydrogen", "Oxygen"
  count: number;
}

export interface ElementData {
  type: 'element';
  symbol: string;
  name: string;
  atomicNumber: number;
  mass: number;
  valenceElectrons: number;
  category?: ElementCategory;
  atomicRadius?: number;
  variableValenceStates?: number[];
}

export interface MonoatomicIonData {
  type: 'monoatomic-ion';
  id: string;
  symbol: string;
  charge: number;
  name: string;
}

export interface PolyatomicIonData {
  type: 'polyatomic-ion';
  id: string;
  formula: string;
  charge: number;
  name: string;
  elements: ChemicalComposition[];
}

export interface IonReference {
  ionId: string;
  count: number;
}

export interface CompoundData {
  type: 'compound';
  id: string;
  formula: string;
  name: string;
  pKa?: number;
  pKb?: number;
  difficulty: 1 | 2 | 3 | 4 | 5;
  molarMass: number;
  stateAtRoomTemp: PhysicalState;
  elements: ChemicalComposition[];
  ionicComponents?: {
    cations: IonReference[];
    anions: IonReference[];
  };
  isHazardous: boolean;
}

export type GameParticle =
  | ElementData
  | MonoatomicIonData
  | PolyatomicIonData
  | CompoundData;

export type ReactionType =
  | 'synthesis'
  | 'decomposition'
  | 'combustion'
  | 'single-replacement'
  | 'double-replacement'
  | 'neutralisation';

export interface ChemicalReaction {
  id: string;
  type: ReactionType;
  reactants: { particle: GameParticle; count: number }[];
  products: { particle: GameParticle; count: number }[];
  isBalanced: boolean;
  unbalancedFormula: string;
  balancedFormula: string;
}

// --- Reaction Balancer Types ---
export interface ReactionParticipant {
  compoundId: string;
  defaultCoefficient?: number; // Starting state on UI (usually 1 or 0)
  targetCoefficient: number;   // Correct stoichiometric coefficient
}

export interface BalancerReaction {
  id: string;
  title: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  reactants: ReactionParticipant[];
  products: ReactionParticipant[];
  description?: string;
}

// --- Bond Builder Types ---
export type BondOrder = 1 | 2 | 3; // Single, Double, Triple bond

export interface ValenceConfig {
  valenceElectrons: number;
  maxBonds: number;
  preferredGeometry?: 'linear' | 'bent' | 'trigonal-planar' | 'tetrahedral';
}

export interface BondConnection {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
  order: BondOrder;
}
// --- Lewis Structures (Share to Fill) Types ---
// Shared with Bond Builder through AtomCanvas: an atom carries its own outer
// electrons as lone pairs and unpaired electrons; every shared
// pair is one unit of a BondConnection's order.

/** One atom as drawn on the canvas, with its outer electrons. */
export interface LewisAtomState {
  id: string;
  /** Element symbol, e.g. 'O'. */
  element: string;
  /** Outer (valence) electrons the element brings — from ELEMENTS_REGISTRY. */
  valence: number;
  /** Pairs of electrons that stay on this atom. */
  lonePairs: number;
  /** Unpaired electrons — the only ones that can be shared. */
  unpaired: number;
}

/** The live state of a dot structure: atoms plus the shared pairs between them. */
export interface LewisStructure {
  atoms: LewisAtomState[];
  bonds: BondConnection[];
}

/**
 * A covalent molecule the game can ask for. `atoms` are element symbols in
 * canvas order; `bonds` reference atom ids of the form `a<index>`.
 */
export interface LewisMoleculeData {
  id: string;
  name: string;
  /** Plain ASCII formula for MoleculeText, e.g. 'C2H5OH'. */
  formula: string;
  atoms: string[];
  bonds: BondConnection[];
  /** Index into `atoms` of the atom the drawing is built around. */
  centralAtomIndex: number;
  /** Game level (1-4) the molecule is first built in; Level 5 draws from all. */
  level: number;
  /** Position within the level, 1-based. */
  order: number;
  /** Hint tier 2: the strategy for this molecule, in words. */
  tier2Hint: string;
  /** Canonical bond-line drawing, e.g. 'H-O-H' or 'O=C=O'. */
  bondLine: string;
  /** One macroscopic sentence shown when the molecule completes. */
  propertyLine: string;
  /** Molecule id whose structure this one mirrors (drives coach.sameGroup). */
  sameGroupAs?: string;
}

/** What is wrong with a classmate's drawing (inspect mode). */
export type LewisErrorType =
  | 'tooMany'
  | 'tooFew'
  | 'hydrogenFull'
  | 'needsDouble'
  | 'leftover'
  | 'none';

export interface LewisDiagnosis {
  type: LewisErrorType;
  /** Ids of the atoms the error sits on (empty for 'none'). */
  atomIds: string[];
}
