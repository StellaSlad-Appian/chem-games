// src/core-engine/data/ions.ts

import { MonoatomicIonData, PolyatomicIonData } from '../types/chemistry';

// ============================================================================
// MONOATOMIC IONS (Single elements with a net charge)
// ============================================================================
export const MONOATOMIC_IONS: MonoatomicIonData[] = [
  { type: 'monoatomic-ion', id: 1, symbol: 'H', charge: 1, name: 'Hydrogen Ion' },
  { type: 'monoatomic-ion', id: 2, symbol: 'Cl', charge: -1, name: 'Chloride' },
  { type: 'monoatomic-ion', id: 5, symbol: 'Na', charge: 1, name: 'Sodium Ion' },
  { type: 'monoatomic-ion', id: 7, symbol: 'K', charge: 1, name: 'Potassium Ion' },
  { type: 'monoatomic-ion', id: 8, symbol: 'F', charge: -1, name: 'Fluoride' },
  { type: 'monoatomic-ion', id: 11, symbol: 'Ca', charge: 2, name: 'Calcium Ion' },
  { type: 'monoatomic-ion', id: 12, symbol: 'Mg', charge: 2, name: 'Magnesium Ion' },
  { type: 'monoatomic-ion', id: 14, symbol: 'Ba', charge: 2, name: 'Barium Ion' },
  { type: 'monoatomic-ion', id: 15, symbol: 'Li', charge: 1, name: 'Lithium Ion' },
  { type: 'monoatomic-ion', id: 17, symbol: 'Br', charge: -1, name: 'Bromide' },
  { type: 'monoatomic-ion', id: 20, symbol: 'I', charge: -1, name: 'Iodide' },
  { type: 'monoatomic-ion', id: 21, symbol: 'Cs', charge: 1, name: 'Cesium Ion' }
];

// ============================================================================
// POLYATOMIC IONS (Molecules acting as a single charged unit)
// The 'elements' array tracks internal atom counts for the testing math.
// ============================================================================
export const POLYATOMIC_IONS: PolyatomicIonData[] = [
  { 
    type: 'polyatomic-ion', id: 3, formula: 'SO4', charge: -2, name: 'Sulfate', 
    elements: [{ symbol: 'S', count: 1 }, { symbol: 'O', count: 4 }] 
  },
  { 
    type: 'polyatomic-ion', id: 4, formula: 'NO3', charge: -1, name: 'Nitrate', 
    elements: [{ symbol: 'N', count: 1 }, { symbol: 'O', count: 3 }] 
  },
  { 
    type: 'polyatomic-ion', id: 6, formula: 'OH', charge: -1, name: 'Hydroxide', 
    elements: [{ symbol: 'O', count: 1 }, { symbol: 'H', count: 1 }] 
  },
  { 
    type: 'polyatomic-ion', id: 9, formula: 'HCO3', charge: -1, name: 'Bicarbonate', 
    elements: [{ symbol: 'H', count: 1 }, { symbol: 'C', count: 1 }, { symbol: 'O', count: 3 }] 
  },
  { 
    type: 'polyatomic-ion', id: 10, formula: 'H2PO4', charge: -1, name: 'Dihydrogen Phosphate', 
    elements: [{ symbol: 'H', count: 2 }, { symbol: 'P', count: 1 }, { symbol: 'O', count: 4 }] 
  },
  { 
    type: 'polyatomic-ion', id: 13, formula: 'NO2', charge: -1, name: 'Nitrite', 
    elements: [{ symbol: 'N', count: 1 }, { symbol: 'O', count: 2 }] 
  },
  { 
    type: 'polyatomic-ion', id: 16, formula: 'HSO3', charge: -1, name: 'Bisulfite', 
    elements: [{ symbol: 'H', count: 1 }, { symbol: 'S', count: 1 }, { symbol: 'O', count: 3 }] 
  },
  { 
    type: 'polyatomic-ion', id: 18, formula: 'HPO4', charge: -2, name: 'Hydrogen Phosphate', 
    elements: [{ symbol: 'H', count: 1 }, { symbol: 'P', count: 1 }, { symbol: 'O', count: 4 }] 
  },
  { 
    type: 'polyatomic-ion', id: 19, formula: 'ClO4', charge: -1, name: 'Perchlorate', 
    elements: [{ symbol: 'Cl', count: 1 }, { symbol: 'O', count: 4 }] 
  },
  { 
    type: 'polyatomic-ion', id: 22, formula: 'H2BO3', charge: -1, name: 'Dihydrogen Borate', 
    elements: [{ symbol: 'H', count: 2 }, { symbol: 'B', count: 1 }, { symbol: 'O', count: 3 }] 
  },
  { 
    type: 'polyatomic-ion', id: 23, formula: 'H3SiO4', charge: -1, name: 'Trihydrogen Silicate', 
    elements: [{ symbol: 'H', count: 3 }, { symbol: 'Si', count: 1 }, { symbol: 'O', count: 4 }] 
  },
  { 
    type: 'polyatomic-ion', id: 24, formula: 'HS', charge: -1, name: 'Hydrosulfide', 
    elements: [{ symbol: 'H', count: 1 }, { symbol: 'S', count: 1 }] 
  },
  { 
    type: 'polyatomic-ion', id: 25, formula: 'HSO4', charge: -1, name: 'Bisulfate', 
    elements: [{ symbol: 'H', count: 1 }, { symbol: 'S', count: 1 }, { symbol: 'O', count: 4 }] 
  }
];