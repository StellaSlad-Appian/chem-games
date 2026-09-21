// src/core-engine/types/chemistry.ts

export type ChemicalClassification = 'Acidic' | 'Basic' | 'Neutral' | 'Amphoteric';
export type PhysicalState = 'solid' | 'liquid' | 'gas';
export type ShortPhysicalState = 's' | 'l' | 'g' | 'aq';

/**
 * The family a cell belongs to in the *Families* view mode of the periodic
 * table widget.
 *
 * `lanthanide` and `actinide` were added when that widget landed. The union
 * was written for `ElementData.category`, which no registry entry has ever
 * set and nothing reads, so the two new members break nothing — and without
 * them the thirty f-block elements would have had to borrow
 * `transition-metal`, which is the label the two rows are pulled out of the
 * table precisely to avoid.
 */
export type ElementCategory =
  | 'nonmetal'
  | 'noble-gas'
  | 'alkali-metal'
  | 'alkaline-earth'
  | 'metalloid'
  | 'halogen'
  | 'transition-metal'
  | 'post-transition-metal'
  | 'lanthanide'
  | 'actinide';

/**
 * Metal, non-metal or metalloid — the first thing VC2S10U07 asks a student to
 * read off the table, and a separate axis from `ElementCategory`: astatine is
 * a `halogen` and a `non-metal`, silicon is a `metalloid` on both.
 */
export type MetalClass = 'metal' | 'non-metal' | 'metalloid';

/**
 * How vigorously an element reacts, **compared with the rest of its own
 * group**. It is not a cross-group scale: "high" for sodium and "high" for
 * chlorine describe two unrelated reactions, and the legend says so.
 *
 * Only groups 1, 2, 17 and 18 have one at this level, which is exactly what
 * VC2S10U07 asks for. Everything else is `null` rather than a number invented
 * to fill the column — the same decision, and the same reason, as
 * `PeriodicTableEntry.outerElectrons`.
 */
export type Reactivity = 'unreactive' | 'low' | 'moderate' | 'high' | 'very-high';

/**
 * What the periodic-table widget teaches about one element, keyed by atomic
 * number and **joined** to `ELEMENTS_REGISTRY` rather than replacing it. The
 * registry stays the source of symbol, name, relative atomic mass and atomic
 * radius; `src/core-engine/tests/periodic-table.test.ts` asserts the join is
 * total in both directions.
 *
 * It is a separate shape because `ElementData` is load-bearing for five games.
 * Teaching-only fields on it invite a game to read them.
 *
 * > **Nothing here is derived from `ElementData.valenceElectrons`.** That field
 * > is the common combining number the games need, not a count of outer-shell
 * > electrons — the registry has chromium at 3, gold at 1 and copernicium at
 * > 12. `shells` is authored fresh and checked against a hand-written literal
 * > for the first twenty elements.
 */
export interface PeriodicTableEntry {
  /** Joins to `ELEMENTS_REGISTRY`. 1–118, no gap and no repeat. */
  atomicNumber: number;
  /**
   * The registry's symbol, repeated here on purpose: it makes the 118 literals
   * below readable as chemistry rather than as a column of numbers, and the
   * integrity test uses it to prove the join lands on the element the line
   * claims it does. It is never rendered from here — the cell reads the
   * registry.
   */
  symbol: string;
  /** 1–18. `null` for the f-block, and only for the f-block. */
  group: number | null;
  period: number;
  block: 's' | 'p' | 'd' | 'f';
  category: ElementCategory;
  metalClass: MetalClass;
  /** School electron arrangement, outer shell last: sodium is `[2, 8, 1]`. */
  shells: number[];
  /**
   * Electrons in the outer shell — `null` across the d- and f-blocks rather
   * than guessed, because "the outer shell" is not a simple count there. The
   * *Outer shell* view mode greys those cells and the legend says why. That is
   * the honest Year 9 answer, and it stops the sheet asserting that iron has
   * two outer electrons.
   */
  outerElectrons: number | null;
  /**
   * The charge of the ion this element forms, or `null` where the table does
   * not predict one: the noble gases, the elements that form no simple
   * monatomic ion, and the whole d- and f-blocks, whose metals form more than
   * one. The pattern the mode teaches is a group-number pattern, and it stops
   * at the transition metals.
   */
  commonIonCharge: number | null;
  /** Within its own group. `null` outside groups 1, 2, 17 and 18. */
  reactivity: Reactivity | null;
  stateAt25C: PhysicalState;
  /**
   * `synthetic` for technetium, promethium and everything past uranium — the
   * line school chemistry draws. Several of those do occur in trace amounts;
   * none of them is where a student would meet the element.
   */
  occurrence: 'natural' | 'synthetic';
}

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
