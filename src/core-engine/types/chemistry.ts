export type ChemicalClassification = 'Acidic' | 'Basic' | 'Neutral' | 'Amphoteric';
export type PhysicalState = 'solid' | 'liquid' | 'gas';

export interface Chemical {
  id: string;
  formula: string;
  name: string;
  pKa?: number;
  pKb?: number;
  difficulty: 1 | 2 | 3 | 4 | 5;             // Tracks level progression
  molarMass: number;                          // For future stoichiometry games (g/mol)
  stateAtRoomTemp: PhysicalState;            // For visual synthesis simulations
  ions: string[];                            // For ionic equation/solubility games
  hazardClasses: string[];                    // For lab safety mini-games
}