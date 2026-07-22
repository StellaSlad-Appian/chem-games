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