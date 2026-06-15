export type ChemicalClassification = 'Acidic' | 'Basic' | 'Neutral' | 'Amphoteric';
export type PhysicalState = 'solid' | 'liquid' | 'gas';

export interface ElementData{
  type: 'element';
  symbol: string;
  name: string;
  atomicNumber: number;
  mass: number;
  valenceElectrons: number;
  atomicRadius?: number;
  // optional property for more complex/specific games - redox reactions
  variableValenceStates?: number[];
}

export interface MonoatomicIonData {
  type: 'monoatomic-ion';
  id: number;
  symbol: string;
  charge: number;
  name: string;
}

export interface PolyatomicIonData {
  type: 'polyatomic-ion';
  id: number;
  formula: string;
  charge: number;
  name: string;
  elements: {symbol: string; count: number}[];
}

export interface IonReference{
  ionId: number;
  count: number;
}

// old version - delete after updating compounds.ts
export interface Chemical {
  id: string;
  formula: string;
  name: string;
  pKa?: number;
  pKb?: number;
  // Tracks level progression. replace in future, sincethis can be different for different games
  difficulty: 1 | 2 | 3 | 4 | 5;             
  // For future stoichiometry games (g/mol), possibly not needed since we could derive from elements
  molarMass: number;                          
  stateAtRoomTemp: PhysicalState;            // For visual synthesis simulations

  // to do:
  // 1. add elements (array of type element)
  // 2. change ions to a more complex type as well
  ions: string[];                            // For ionic equation/solubility games
  hazardClasses: string[];                  // For lab safety mini-games
}

// new version
export interface CompoundData {
  type: 'compound';
  id: string;
  formula: string;
  name: string;
  pKa?: number;
  pKb?: number;
  // Tracks level progression. replace in future, sincethis can be different for different games
  difficulty: 1 | 2 | 3 | 4 | 5;             
  // For future stoichiometry games (g/mol), possibly not needed since we could derive from elements
  molarMass: number;                          
  stateAtRoomTemp: PhysicalState;            // For visual synthesis simulations
  elements: {symbol: string; count: number}[];
  // optional, only presentif the compound is ionic and can dissociate
  ionicComponents?: {
    cations: IonReference[];
    anions: IonReference[];
  }
  isHazardous: boolean;                   // For lab safety mini-games
}

// Master Union Type
export type GameParticle =
| ElementData
| MonoatomicIonData
| PolyatomicIonData
| Chemical

// replace Chemical with CompoundData

