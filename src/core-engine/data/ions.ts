// src/core-engine/data/ions.ts

import { MonoatomicIonData, PolyatomicIonData } from '../types/chemistry';

// ============================================================================
// MONOATOMIC IONS (Single elements with a net charge)
// ============================================================================
export const MONOATOMIC_IONS: MonoatomicIonData[] = [
  { type: 'monoatomic-ion', id: '1', symbol: 'H', charge: 1, name: 'Hydrogen Ion' },
  { type: 'monoatomic-ion', id: '2', symbol: 'Cl', charge: -1, name: 'Chloride' },
  { type: 'monoatomic-ion', id: '5', symbol: 'Na', charge: 1, name: 'Sodium Ion' },
  { type: 'monoatomic-ion', id: '7', symbol: 'K', charge: 1, name: 'Potassium Ion' },
  { type: 'monoatomic-ion', id: '8', symbol: 'F', charge: -1, name: 'Fluoride' },
  { type: 'monoatomic-ion', id: '11', symbol: 'Ca', charge: 2, name: 'Calcium Ion' },
  { type: 'monoatomic-ion', id: '12', symbol: 'Mg', charge: 2, name: 'Magnesium Ion' },
  { type: 'monoatomic-ion', id: '14', symbol: 'Ba', charge: 2, name: 'Barium Ion' },
  { type: 'monoatomic-ion', id: '15', symbol: 'Li', charge: 1, name: 'Lithium Ion' },
  { type: 'monoatomic-ion', id: '17', symbol: 'Br', charge: -1, name: 'Bromide' },
  { type: 'monoatomic-ion', id: '20', symbol: 'I', charge: -1, name: 'Iodide' },
  { type: 'monoatomic-ion', id: '21', symbol: 'Cs', charge: 1, name: 'Caesium Ion' }
];

// ============================================================================
// POLYATOMIC IONS (Molecules acting as a single charged unit)
// The 'elements' array tracks internal atom counts for the testing math.
// ============================================================================
export const POLYATOMIC_IONS: PolyatomicIonData[] = [
  { 
    type: 'polyatomic-ion', id: '3', formula: 'SO4', charge: -2, name: 'Sulfate', 
    elements: [{ symbol: 'S', count: 1 }, { symbol: 'O', count: 4 }] 
  },
  { 
    type: 'polyatomic-ion', id: '4', formula: 'NO3', charge: -1, name: 'Nitrate', 
    elements: [{ symbol: 'N', count: 1 }, { symbol: 'O', count: 3 }] 
  },
  { 
    type: 'polyatomic-ion', id: '6', formula: 'OH', charge: -1, name: 'Hydroxide', 
    elements: [{ symbol: 'O', count: 1 }, { symbol: 'H', count: 1 }] 
  },
  { 
    type: 'polyatomic-ion', id: '9', formula: 'HCO3', charge: -1, name: 'Bicarbonate', 
    elements: [{ symbol: 'H', count: 1 }, { symbol: 'C', count: 1 }, { symbol: 'O', count: 3 }] 
  },
  { 
    type: 'polyatomic-ion', id: '10', formula: 'H2PO4', charge: -1, name: 'Dihydrogen Phosphate', 
    elements: [{ symbol: 'H', count: 2 }, { symbol: 'P', count: 1 }, { symbol: 'O', count: 4 }] 
  },
  { 
    type: 'polyatomic-ion', id: '13', formula: 'NO2', charge: -1, name: 'Nitrite', 
    elements: [{ symbol: 'N', count: 1 }, { symbol: 'O', count: 2 }] 
  },
  { 
    type: 'polyatomic-ion', id: '16', formula: 'HSO3', charge: -1, name: 'Bisulfite', 
    elements: [{ symbol: 'H', count: 1 }, { symbol: 'S', count: 1 }, { symbol: 'O', count: 3 }] 
  },
  { 
    type: 'polyatomic-ion', id: '18', formula: 'HPO4', charge: -2, name: 'Hydrogen Phosphate', 
    elements: [{ symbol: 'H', count: 1 }, { symbol: 'P', count: 1 }, { symbol: 'O', count: 4 }] 
  },
  { 
    type: 'polyatomic-ion', id: '19', formula: 'ClO4', charge: -1, name: 'Perchlorate', 
    elements: [{ symbol: 'Cl', count: 1 }, { symbol: 'O', count: 4 }] 
  },
  { 
    type: 'polyatomic-ion', id: '22', formula: 'H2BO3', charge: -1, name: 'Dihydrogen Borate', 
    elements: [{ symbol: 'H', count: 2 }, { symbol: 'B', count: 1 }, { symbol: 'O', count: 3 }] 
  },
  { 
    type: 'polyatomic-ion', id: '23', formula: 'H3SiO4', charge: -1, name: 'Trihydrogen Silicate', 
    elements: [{ symbol: 'H', count: 3 }, { symbol: 'Si', count: 1 }, { symbol: 'O', count: 4 }] 
  },
  { 
    type: 'polyatomic-ion', id: '24', formula: 'HS', charge: -1, name: 'Hydrosulfide', 
    elements: [{ symbol: 'H', count: 1 }, { symbol: 'S', count: 1 }] 
  },
  {
    type: 'polyatomic-ion', id: '25', formula: 'HSO4', charge: -1, name: 'Bisulfate',
    elements: [{ symbol: 'H', count: 1 }, { symbol: 'S', count: 1 }, { symbol: 'O', count: 4 }]
  },
  // --- Remaining ions from the VCAA VCE Chemistry Data Book polyatomic ion table ---
  {
    type: 'polyatomic-ion', id: '26', formula: 'NH4', charge: 1, name: 'Ammonium',
    elements: [{ symbol: 'N', count: 1 }, { symbol: 'H', count: 4 }]
  },
  {
    type: 'polyatomic-ion', id: '27', formula: 'CO3', charge: -2, name: 'Carbonate',
    elements: [{ symbol: 'C', count: 1 }, { symbol: 'O', count: 3 }]
  },
  {
    type: 'polyatomic-ion', id: '28', formula: 'SO3', charge: -2, name: 'Sulfite',
    elements: [{ symbol: 'S', count: 1 }, { symbol: 'O', count: 3 }]
  },
  {
    type: 'polyatomic-ion', id: '29', formula: 'PO4', charge: -3, name: 'Phosphate',
    elements: [{ symbol: 'P', count: 1 }, { symbol: 'O', count: 4 }]
  },
  {
    type: 'polyatomic-ion', id: '30', formula: 'CH3COO', charge: -1, name: 'Ethanoate (acetate)',
    elements: [{ symbol: 'C', count: 2 }, { symbol: 'H', count: 3 }, { symbol: 'O', count: 2 }]
  },
  {
    type: 'polyatomic-ion', id: '31', formula: 'CN', charge: -1, name: 'Cyanide',
    elements: [{ symbol: 'C', count: 1 }, { symbol: 'N', count: 1 }]
  },
  {
    type: 'polyatomic-ion', id: '32', formula: 'ClO', charge: -1, name: 'Hypochlorite',
    elements: [{ symbol: 'Cl', count: 1 }, { symbol: 'O', count: 1 }]
  },
  {
    type: 'polyatomic-ion', id: '33', formula: 'ClO2', charge: -1, name: 'Chlorite',
    elements: [{ symbol: 'Cl', count: 1 }, { symbol: 'O', count: 2 }]
  },
  {
    type: 'polyatomic-ion', id: '34', formula: 'ClO3', charge: -1, name: 'Chlorate',
    elements: [{ symbol: 'Cl', count: 1 }, { symbol: 'O', count: 3 }]
  },
  {
    type: 'polyatomic-ion', id: '35', formula: 'MnO4', charge: -1, name: 'Permanganate',
    elements: [{ symbol: 'Mn', count: 1 }, { symbol: 'O', count: 4 }]
  },
  {
    type: 'polyatomic-ion', id: '36', formula: 'CrO4', charge: -2, name: 'Chromate',
    elements: [{ symbol: 'Cr', count: 1 }, { symbol: 'O', count: 4 }]
  },
  {
    type: 'polyatomic-ion', id: '37', formula: 'Cr2O7', charge: -2, name: 'Dichromate',
    elements: [{ symbol: 'Cr', count: 2 }, { symbol: 'O', count: 7 }]
  },
  {
    type: 'polyatomic-ion', id: '38', formula: 'S2O3', charge: -2, name: 'Thiosulfate',
    elements: [{ symbol: 'S', count: 2 }, { symbol: 'O', count: 3 }]
  },
  {
    type: 'polyatomic-ion', id: '39', formula: 'O2', charge: -2, name: 'Peroxide',
    elements: [{ symbol: 'O', count: 2 }]
  },
  {
    type: 'polyatomic-ion', id: '40', formula: 'C2O4', charge: -2, name: 'Oxalate',
    elements: [{ symbol: 'C', count: 2 }, { symbol: 'O', count: 4 }]
  }
];
