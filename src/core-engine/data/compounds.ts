// src/core-engine/data/compounds.ts

import { CompoundData } from '../types/chemistry';

export const COMPOUNDS_REGISTRY: CompoundData[] = [
  // ==========================================
  // LEVEL 1: Basic Foundations (Strong Acids/Bases & Iconic Salts)
  // ==========================================
  { 
    type: 'compound', id: '1', formula: 'HCl', name: 'Hydrochloric Acid', 
    pKa: -6.3, difficulty: 1, molarMass: 36.46, stateAtRoomTemp: 'gas', 
    elements: [{ symbol: 'H', count: 1 }, { symbol: 'Cl', count: 1 }],
    ionicComponents: { cations: [{ ionId: '1', count: 1 }], anions: [{ ionId: '2', count: 1 }] },
    isHazardous: true 
  },
  { 
    type: 'compound', id: '2', formula: 'H2SO4', name: 'Sulfuric Acid', 
    pKa: -3.0, difficulty: 1, molarMass: 98.08, stateAtRoomTemp: 'liquid', 
    elements: [{ symbol: 'H', count: 2 }, { symbol: 'S', count: 1 }, { symbol: 'O', count: 4 }],
    ionicComponents: { cations: [{ ionId: '1', count: 2 }], anions: [{ ionId: '3', count: 1 }] },
    isHazardous: true 
  },
  { 
    type: 'compound', id: '3', formula: 'HNO3', name: 'Nitric Acid', 
    pKa: -1.4, difficulty: 1, molarMass: 63.01, stateAtRoomTemp: 'liquid', 
    elements: [{ symbol: 'H', count: 1 }, { symbol: 'N', count: 1 }, { symbol: 'O', count: 3 }],
    ionicComponents: { cations: [{ ionId: '1', count: 1 }], anions: [{ ionId: '4', count: 1 }] },
    isHazardous: true 
  },
  { 
    type: 'compound', id: '4', formula: 'NaOH', name: 'Sodium Hydroxide', 
    pKb: -0.56, difficulty: 1, molarMass: 39.99, stateAtRoomTemp: 'solid', 
    elements: [{ symbol: 'Na', count: 1 }, { symbol: 'O', count: 1 }, { symbol: 'H', count: 1 }],
    ionicComponents: { cations: [{ ionId: '5', count: 1 }], anions: [{ ionId: '6', count: 1 }] },
    isHazardous: true 
  },
  { 
    type: 'compound', id: '5', formula: 'KOH', name: 'Potassium Hydroxide', 
    pKb: -0.7, difficulty: 1, molarMass: 56.11, stateAtRoomTemp: 'solid', 
    elements: [{ symbol: 'K', count: 1 }, { symbol: 'O', count: 1 }, { symbol: 'H', count: 1 }],
    ionicComponents: { cations: [{ ionId: '7', count: 1 }], anions: [{ ionId: '6', count: 1 }] },
    isHazardous: true 
  },
  { 
    type: 'compound', id: '6', formula: 'NaCl', name: 'Sodium Chloride', 
    difficulty: 1, molarMass: 58.44, stateAtRoomTemp: 'solid', 
    elements: [{ symbol: 'Na', count: 1 }, { symbol: 'Cl', count: 1 }],
    ionicComponents: { cations: [{ ionId: '5', count: 1 }], anions: [{ ionId: '2', count: 1 }] },
    isHazardous: false 
  },
  { 
    type: 'compound', id: '7', formula: 'KCl', name: 'Potassium Chloride', 
    difficulty: 1, molarMass: 74.55, stateAtRoomTemp: 'solid', 
    elements: [{ symbol: 'K', count: 1 }, { symbol: 'Cl', count: 1 }],
    ionicComponents: { cations: [{ ionId: '7', count: 1 }], anions: [{ ionId: '2', count: 1 }] },
    isHazardous: false 
  },

  // ==========================================
  // LEVEL 2: Intermediate Concepts (Common Weak Acids/Bases & Earth Salts)
  // ==========================================
  { 
    type: 'compound', id: '8', formula: 'HF', name: 'Hydrofluoric Acid', 
    pKa: 3.2, difficulty: 2, molarMass: 20.01, stateAtRoomTemp: 'gas', 
    elements: [{ symbol: 'H', count: 1 }, { symbol: 'F', count: 1 }],
    ionicComponents: { cations: [{ ionId: '1', count: 1 }], anions: [{ ionId: '8', count: 1 }] },
    isHazardous: true 
  },
  { 
    type: 'compound', id: '9', formula: 'H2CO3', name: 'Carbonic Acid', 
    pKa: 6.35, difficulty: 2, molarMass: 62.03, stateAtRoomTemp: 'liquid', 
    elements: [{ symbol: 'H', count: 2 }, { symbol: 'C', count: 1 }, { symbol: 'O', count: 3 }],
    ionicComponents: { cations: [{ ionId: '1', count: 2 }], anions: [{ ionId: '9', count: 1 }] },
    isHazardous: false 
  },
  { 
    type: 'compound', id: '10', formula: 'H3PO4', name: 'Phosphoric Acid', 
    pKa: 2.15, difficulty: 2, molarMass: 98.00, stateAtRoomTemp: 'solid', 
    elements: [{ symbol: 'H', count: 3 }, { symbol: 'P', count: 1 }, { symbol: 'O', count: 4 }],
    ionicComponents: { cations: [{ ionId: '1', count: 3 }], anions: [{ ionId: '10', count: 1 }] },
    isHazardous: true 
  },
  { 
    type: 'compound', id: '11', formula: 'NH3', name: 'Ammonia', 
    pKb: 4.75, difficulty: 2, molarMass: 17.03, stateAtRoomTemp: 'gas', 
    elements: [{ symbol: 'N', count: 1 }, { symbol: 'H', count: 3 }],
    isHazardous: true 
  },
  { 
    type: 'compound', id: '12', formula: 'CaCl2', name: 'Calcium Chloride', 
    difficulty: 2, molarMass: 110.98, stateAtRoomTemp: 'solid', 
    elements: [{ symbol: 'Ca', count: 1 }, { symbol: 'Cl', count: 2 }],
    ionicComponents: { cations: [{ ionId: '11', count: 1 }], anions: [{ ionId: '2', count: 2 }] },
    isHazardous: true 
  },
  { 
    type: 'compound', id: '13', formula: 'MgCl2', name: 'Magnesium Chloride', 
    difficulty: 2, molarMass: 95.21, stateAtRoomTemp: 'solid', 
    elements: [{ symbol: 'Mg', count: 1 }, { symbol: 'Cl', count: 2 }],
    ionicComponents: { cations: [{ ionId: '12', count: 1 }], anions: [{ ionId: '2', count: 2 }] },
    isHazardous: false 
  },
  { 
    type: 'compound', id: '14', formula: 'Na2SO4', name: 'Sodium Sulfate', 
    difficulty: 2, molarMass: 142.04, stateAtRoomTemp: 'solid', 
    elements: [{ symbol: 'Na', count: 2 }, { symbol: 'S', count: 1 }, { symbol: 'O', count: 4 }],
    ionicComponents: { cations: [{ ionId: '5', count: 2 }], anions: [{ ionId: '3', count: 1 }] },
    isHazardous: false 
  },

  // ==========================================
  // LEVEL 3: Amphoteric Introduction (Dual Behaviours & Alkaline Earths)
  // ==========================================
  { 
    type: 'compound', id: '15', formula: 'H2O', name: 'Water', 
    pKa: 14.0, pKb: 14.0, difficulty: 3, molarMass: 18.02, stateAtRoomTemp: 'liquid', 
    elements: [{ symbol: 'H', count: 2 }, { symbol: 'O', count: 1 }],
    isHazardous: false 
  },
  { 
    type: 'compound', id: '16', formula: 'NaHCO3', name: 'Sodium Bicarbonate', 
    pKa: 10.33, pKb: 7.65, difficulty: 3, molarMass: 84.01, stateAtRoomTemp: 'solid', 
    elements: [{ symbol: 'Na', count: 1 }, { symbol: 'H', count: 1 }, { symbol: 'C', count: 1 }, { symbol: 'O', count: 3 }],
    ionicComponents: { cations: [{ ionId: '5', count: 1 }], anions: [{ ionId: '9', count: 1 }] },
    isHazardous: false 
  },
  { 
    type: 'compound', id: '17', formula: 'KHCO3', name: 'Potassium Bicarbonate', 
    pKa: 10.33, pKb: 7.65, difficulty: 3, molarMass: 100.12, stateAtRoomTemp: 'solid', 
    elements: [{ symbol: 'K', count: 1 }, { symbol: 'H', count: 1 }, { symbol: 'C', count: 1 }, { symbol: 'O', count: 3 }],
    ionicComponents: { cations: [{ ionId: '7', count: 1 }], anions: [{ ionId: '9', count: 1 }] },
    isHazardous: false 
  },
  { 
    type: 'compound', id: '18', formula: 'HNO2', name: 'Nitrous Acid', 
    pKa: 3.39, difficulty: 3, molarMass: 47.01, stateAtRoomTemp: 'liquid', 
    elements: [{ symbol: 'H', count: 1 }, { symbol: 'N', count: 1 }, { symbol: 'O', count: 2 }],
    ionicComponents: { cations: [{ ionId: '1', count: 1 }], anions: [{ ionId: '13', count: 1 }] },
    isHazardous: true 
  },
  { 
    type: 'compound', id: '19', formula: 'Ba(OH)2', name: 'Barium Hydroxide', 
    pKb: 0.64, difficulty: 3, molarMass: 171.34, stateAtRoomTemp: 'solid', 
    elements: [{ symbol: 'Ba', count: 1 }, { symbol: 'O', count: 2 }, { symbol: 'H', count: 2 }],
    ionicComponents: { cations: [{ ionId: '14', count: 1 }], anions: [{ ionId: '6', count: 2 }] },
    isHazardous: true 
  },
  { 
    type: 'compound', id: '20', formula: 'KNO3', name: 'Potassium Nitrate', 
    difficulty: 3, molarMass: 101.10, stateAtRoomTemp: 'solid', 
    elements: [{ symbol: 'K', count: 1 }, { symbol: 'N', count: 1 }, { symbol: 'O', count: 3 }],
    ionicComponents: { cations: [{ ionId: '7', count: 1 }], anions: [{ ionId: '4', count: 1 }] },
    isHazardous: true 
  },
  { 
    type: 'compound', id: '21', formula: 'LiCl', name: 'Lithium Chloride', 
    difficulty: 3, molarMass: 42.39, stateAtRoomTemp: 'solid', 
    elements: [{ symbol: 'Li', count: 1 }, { symbol: 'Cl', count: 1 }],
    ionicComponents: { cations: [{ ionId: '15', count: 1 }], anions: [{ ionId: '2', count: 1 }] },
    isHazardous: true 
  },

  // ==========================================
  // LEVEL 4: Expert Challenge (Oxidation Salts & Polyprotic Steps)
  // ==========================================
  { 
    type: 'compound', id: '22', formula: 'H2SO3', name: 'Sulfurous Acid', 
    pKa: 1.85, difficulty: 4, molarMass: 82.07, stateAtRoomTemp: 'liquid', 
    elements: [{ symbol: 'H', count: 2 }, { symbol: 'S', count: 1 }, { symbol: 'O', count: 3 }],
    ionicComponents: { cations: [{ ionId: '1', count: 2 }], anions: [{ ionId: '16', count: 1 }] },
    isHazardous: true 
  },
  { 
    type: 'compound', id: '23', formula: 'N2H4', name: 'Hydrazine', 
    pKb: 5.77, difficulty: 4, molarMass: 32.05, stateAtRoomTemp: 'liquid', 
    elements: [{ symbol: 'N', count: 2 }, { symbol: 'H', count: 4 }],
    isHazardous: true 
  },
  { 
    type: 'compound', id: '24', formula: 'LiOH', name: 'Lithium Hydroxide', 
    pKb: -0.36, difficulty: 4, molarMass: 23.95, stateAtRoomTemp: 'solid', 
    elements: [{ symbol: 'Li', count: 1 }, { symbol: 'O', count: 1 }, { symbol: 'H', count: 1 }],
    ionicComponents: { cations: [{ ionId: '15', count: 1 }], anions: [{ ionId: '6', count: 1 }] },
    isHazardous: true 
  },
  { 
    type: 'compound', id: '25', formula: 'HBr', name: 'Hydrobromic Acid', 
    pKa: -9.0, difficulty: 4, molarMass: 80.91, stateAtRoomTemp: 'gas', 
    elements: [{ symbol: 'H', count: 1 }, { symbol: 'Br', count: 1 }],
    ionicComponents: { cations: [{ ionId: '1', count: 1 }], anions: [{ ionId: '17', count: 1 }] },
    isHazardous: true 
  },
  { 
    type: 'compound', id: '26', formula: 'NaNO3', name: 'Sodium Nitrate', 
    difficulty: 4, molarMass: 84.99, stateAtRoomTemp: 'solid', 
    elements: [{ symbol: 'Na', count: 1 }, { symbol: 'N', count: 1 }, { symbol: 'O', count: 3 }],
    ionicComponents: { cations: [{ ionId: '5', count: 1 }], anions: [{ ionId: '4', count: 1 }] },
    isHazardous: true 
  },
  { 
    type: 'compound', id: '27', formula: 'NaH2PO4', name: 'Sodium Dihydrogen Phosphate', 
    pKa: 7.2, pKb: 11.85, difficulty: 4, molarMass: 119.98, stateAtRoomTemp: 'solid', 
    elements: [{ symbol: 'Na', count: 1 }, { symbol: 'H', count: 2 }, { symbol: 'P', count: 1 }, { symbol: 'O', count: 4 }],
    ionicComponents: { cations: [{ ionId: '5', count: 1 }], anions: [{ ionId: '10', count: 1 }] },
    isHazardous: false 
  },
  { 
    type: 'compound', id: '28', formula: 'Na2HPO4', name: 'Disodium Hydrogen Phosphate', 
    pKa: 12.35, pKb: 6.8, difficulty: 4, molarMass: 141.96, stateAtRoomTemp: 'solid', 
    elements: [{ symbol: 'Na', count: 2 }, { symbol: 'H', count: 1 }, { symbol: 'P', count: 1 }, { symbol: 'O', count: 4 }],
    ionicComponents: { cations: [{ ionId: '5', count: 2 }], anions: [{ ionId: '18', count: 1 }] },
    isHazardous: false 
  },

  // ==========================================
  // LEVEL 5: Master Protocol (Extreme Dissociations & Rare Compounds)
  // ==========================================
  { 
    type: 'compound', id: '29', formula: 'HClO4', name: 'Perchloric Acid', 
    pKa: -10.0, difficulty: 5, molarMass: 100.46, stateAtRoomTemp: 'liquid', 
    elements: [{ symbol: 'H', count: 1 }, { symbol: 'Cl', count: 1 }, { symbol: 'O', count: 4 }],
    ionicComponents: { cations: [{ ionId: '1', count: 1 }], anions: [{ ionId: '19', count: 1 }] },
    isHazardous: true 
  },
  { 
    type: 'compound', id: '30', formula: 'HI', name: 'Hydroiodic Acid', 
    pKa: -9.3, difficulty: 5, molarMass: 127.91, stateAtRoomTemp: 'gas', 
    elements: [{ symbol: 'H', count: 1 }, { symbol: 'I', count: 1 }],
    ionicComponents: { cations: [{ ionId: '1', count: 1 }], anions: [{ ionId: '20', count: 1 }] },
    isHazardous: true 
  },
  { 
    type: 'compound', id: '31', formula: 'CsOH', name: 'Cesium Hydroxide', 
    pKb: -1.7, difficulty: 5, molarMass: 149.91, stateAtRoomTemp: 'solid', 
    elements: [{ symbol: 'Cs', count: 1 }, { symbol: 'O', count: 1 }, { symbol: 'H', count: 1 }],
    ionicComponents: { cations: [{ ionId: '21', count: 1 }], anions: [{ ionId: '6', count: 1 }] },
    isHazardous: true 
  },
  { 
    type: 'compound', id: '32', formula: 'H3BO3', name: 'Boric Acid', 
    pKa: 9.24, difficulty: 5, molarMass: 61.83, stateAtRoomTemp: 'solid', 
    elements: [{ symbol: 'H', count: 3 }, { symbol: 'B', count: 1 }, { symbol: 'O', count: 3 }],
    ionicComponents: { cations: [{ ionId: '1', count: 1 }], anions: [{ ionId: '22', count: 1 }] },
    isHazardous: true 
  },
  { 
    type: 'compound', id: '33', formula: 'H4SiO4', name: 'Silicic Acid', 
    pKa: 9.82, difficulty: 5, molarMass: 96.11, stateAtRoomTemp: 'solid', 
    elements: [{ symbol: 'H', count: 4 }, { symbol: 'Si', count: 1 }, { symbol: 'O', count: 4 }],
    ionicComponents: { cations: [{ ionId: '1', count: 1 }], anions: [{ ionId: '23', count: 1 }] },
    isHazardous: false 
  },
  { 
    type: 'compound', id: '34', formula: 'NaHS', name: 'Sodium Hydrosulfide', 
    pKa: 13.0, pKb: 6.95, difficulty: 5, molarMass: 56.06, stateAtRoomTemp: 'solid', 
    elements: [{ symbol: 'Na', count: 1 }, { symbol: 'H', count: 1 }, { symbol: 'S', count: 1 }],
    ionicComponents: { cations: [{ ionId: '5', count: 1 }], anions: [{ ionId: '24', count: 1 }] },
    isHazardous: true 
  },
  { 
    type: 'compound', id: '35', formula: 'NaHSO4', name: 'Sodium Bisulfate', 
    pKa: 1.99, pKb: 17.0, difficulty: 5, molarMass: 120.06, stateAtRoomTemp: 'solid', 
    elements: [{ symbol: 'Na', count: 1 }, { symbol: 'H', count: 1 }, { symbol: 'S', count: 1 }, { symbol: 'O', count: 4 }],
    ionicComponents: { cations: [{ ionId: '5', count: 1 }], anions: [{ ionId: '25', count: 1 }] },
    isHazardous: true 
  }
];