import { Chemical } from '../types/chemistry';
// everything needs to be updated!!

export const chemicalsDB: Chemical[] = [
  // ==========================================
  // LEVEL 1: Basic Foundations (Strong Acids/Bases & Iconic Salts)
  // ==========================================
  { 
    id: '1', formula: 'HCl', name: 'Hydrochloric Acid', pKa: -6.3, 
    difficulty: 1, molarMass: 36.46, stateAtRoomTemp: 'gas', 
    ions: ['H+', 'Cl-'], hazardClasses: ['Corrosive']
  },
  { 
    id: '2', formula: 'H2SO4', name: 'Sulfuric Acid', pKa: -3.0, 
    difficulty: 1, molarMass: 98.08, stateAtRoomTemp: 'liquid', 
    ions: ['H+', 'SO42-'], hazardClasses: ['Corrosive'] 
  },
  { 
    id: '3', formula: 'HNO3', name: 'Nitric Acid', pKa: -1.4, 
    difficulty: 1, molarMass: 63.01, stateAtRoomTemp: 'liquid', 
    ions: ['H+', 'NO3-'], hazardClasses: ['Corrosive', 'Oxidizer'] 
  },
  { 
    id: '4', formula: 'NaOH', name: 'Sodium Hydroxide', pKb: -0.56, 
    difficulty: 1, molarMass: 39.99, stateAtRoomTemp: 'solid', 
    ions: ['Na+', 'OH-'], hazardClasses: ['Corrosive'] 
  },
  { 
    id: '5', formula: 'KOH', name: 'Potassium Hydroxide', pKb: -0.7, 
    difficulty: 1, molarMass: 56.11, stateAtRoomTemp: 'solid', 
    ions: ['K+', 'OH-'], hazardClasses: ['Corrosive'] 
  },
  { 
    id: '6', formula: 'NaCl', name: 'Sodium Chloride', 
    difficulty: 1, molarMass: 58.44, stateAtRoomTemp: 'solid', 
    ions: ['Na+', 'Cl-'], hazardClasses: ['None'] 
  },
  { 
    id: '7', formula: 'KCl', name: 'Potassium Chloride', 
    difficulty: 1, molarMass: 74.55, stateAtRoomTemp: 'solid', 
    ions: ['K+', 'Cl-'], hazardClasses: ['None'] 
  },

  // ==========================================
  // LEVEL 2: Intermediate Concepts (Common Weak Acids/Bases & Earth Salts)
  // ==========================================
  { 
    id: '8', formula: 'HF', name: 'Hydrofluoric Acid', pKa: 3.2, 
    difficulty: 2, molarMass: 20.01, stateAtRoomTemp: 'gas', 
    ions: ['H+', 'F-'], hazardClasses: ['Toxic', 'Corrosive'] 
  },
  { 
    id: '9', formula: 'H2CO3', name: 'Carbonic Acid', pKa: 6.35, 
    difficulty: 2, molarMass: 62.03, stateAtRoomTemp: 'liquid', 
    ions: ['H+', 'HCO3-'], hazardClasses: ['None'] 
  },
  { 
    id: '10', formula: 'H3PO4', name: 'Phosphoric Acid', pKa: 2.15, 
    difficulty: 2, molarMass: 98.00, stateAtRoomTemp: 'solid', 
    ions: ['H+', 'H2PO4-'], hazardClasses: ['Corrosive'] 
  },
  { 
    id: '11', formula: 'NH3', name: 'Ammonia', pKb: 4.75, 
    difficulty: 2, molarMass: 17.03, stateAtRoomTemp: 'gas', 
    ions: ['NH4+', 'OH-'], hazardClasses: ['Toxic', 'Corrosive'] 
  },
  { 
    id: '12', formula: 'CaCl2', name: 'Calcium Chloride', 
    difficulty: 2, molarMass: 110.98, stateAtRoomTemp: 'solid', 
    ions: ['Ca2+', 'Cl-'], hazardClasses: ['Irritant'] 
  },
  { 
    id: '13', formula: 'MgCl2', name: 'Magnesium Chloride', 
    difficulty: 2, molarMass: 95.21, stateAtRoomTemp: 'solid', 
    ions: ['Mg2+', 'Cl-'], hazardClasses: ['None'] 
  },
  { 
    id: '14', formula: 'Na2SO4', name: 'Sodium Sulfate', 
    difficulty: 2, molarMass: 142.04, stateAtRoomTemp: 'solid', 
    ions: ['Na+', 'SO42-'], hazardClasses: ['None'] 
  },

  // ==========================================
  // LEVEL 3: Amphoteric Introduction (Dual Behaviours & Alkaline Earths)
  // ==========================================
  { 
    id: '15', formula: 'H2O', name: 'Water', pKa: 14.0, pKb: 14.0, 
    difficulty: 3, molarMass: 18.02, stateAtRoomTemp: 'liquid', 
    ions: ['H+', 'OH-'], hazardClasses: ['None'] 
  },
  { 
    id: '16', formula: 'NaHCO3', name: 'Sodium Bicarbonate', pKa: 10.33, pKb: 7.65, 
    difficulty: 3, molarMass: 84.01, stateAtRoomTemp: 'solid', 
    ions: ['Na+', 'HCO3-'], hazardClasses: ['None'] 
  },
  { 
    id: '17', formula: 'KHCO3', name: 'Potassium Bicarbonate', pKa: 10.33, pKb: 7.65, 
    difficulty: 3, molarMass: 100.12, stateAtRoomTemp: 'solid', 
    ions: ['K+', 'HCO3-'], hazardClasses: ['None'] 
  },
  { 
    id: '18', formula: 'HNO2', name: 'Nitrous Acid', pKa: 3.39, 
    difficulty: 3, molarMass: 47.01, stateAtRoomTemp: 'liquid', 
    ions: ['H+', 'NO2-'], hazardClasses: ['Toxic'] 
  },
  { 
    id: '19', formula: 'Ba(OH)2', name: 'Barium Hydroxide', pKb: 0.64, 
    difficulty: 3, molarMass: 171.34, stateAtRoomTemp: 'solid', 
    ions: ['Ba2+', 'OH-'], hazardClasses: ['Toxic', 'Corrosive'] 
  },
  { 
    id: '20', formula: 'KNO3', name: 'Potassium Nitrate', 
    difficulty: 3, molarMass: 101.10, stateAtRoomTemp: 'solid', 
    ions: ['K+', 'NO3-'], hazardClasses: ['Oxidizer'] 
  },
  { 
    id: '21', formula: 'LiCl', name: 'Lithium Chloride', 
    difficulty: 3, molarMass: 42.39, stateAtRoomTemp: 'solid', 
    ions: ['Li+', 'Cl-'], hazardClasses: ['Irritant'] 
  },

  // ==========================================
  // LEVEL 4: Expert Challenge (Oxidation Salts & Polyprotic Steps)
  // ==========================================
  { 
    id: '22', formula: 'H2SO3', name: 'Sulfurous Acid', pKa: 1.85, 
    difficulty: 4, molarMass: 82.07, stateAtRoomTemp: 'liquid', 
    ions: ['H+', 'HSO3-'], hazardClasses: ['Corrosive'] 
  },
  { 
    id: '23', formula: 'N2H4', name: 'Hydrazine', pKb: 5.77, 
    difficulty: 4, molarMass: 32.05, stateAtRoomTemp: 'liquid', 
    ions: ['N2H5+', 'OH-'], hazardClasses: ['Toxic', 'Flammable'] 
  },
  { 
    id: '24', formula: 'LiOH', name: 'Lithium Hydroxide', pKb: -0.36, 
    difficulty: 4, molarMass: 23.95, stateAtRoomTemp: 'solid', 
    ions: ['Li+', 'OH-'], hazardClasses: ['Corrosive'] 
  },
  { 
    id: '25', formula: 'HBr', name: 'Hydrobromic Acid', pKa: -9.0, 
    difficulty: 4, molarMass: 80.91, stateAtRoomTemp: 'gas', 
    ions: ['H+', 'Br-'], hazardClasses: ['Corrosive'] 
  },
  { 
    id: '26', formula: 'NaNO3', name: 'Sodium Nitrate', 
    difficulty: 4, molarMass: 84.99, stateAtRoomTemp: 'solid', 
    ions: ['Na+', 'NO3-'], hazardClasses: ['Oxidizer'] 
  },
  { 
    id: '27', formula: 'NaH2PO4', name: 'Sodium Dihydrogen Phosphate', pKa: 7.2, pKb: 11.85, 
    difficulty: 4, molarMass: 119.98, stateAtRoomTemp: 'solid', 
    ions: ['Na+', 'H2PO4-'], hazardClasses: ['None'] 
  },
  { 
    id: '28', formula: 'Na2HPO4', name: 'Disodium Hydrogen Phosphate', pKa: 12.35, pKb: 6.8, 
    difficulty: 4, molarMass: 141.96, stateAtRoomTemp: 'solid', 
    ions: ['Na+', 'HPO42-'], hazardClasses: ['None'] 
  },

  // ==========================================
  // LEVEL 5: Master Protocol (Extreme Dissociations & Rare Compounds)
  // ==========================================
  { 
    id: '29', formula: 'HClO4', name: 'Perchloric Acid', pKa: -10.0, 
    difficulty: 5, molarMass: 100.46, stateAtRoomTemp: 'liquid', 
    ions: ['H+', 'ClO4-'], hazardClasses: ['Oxidizer', 'Corrosive'] 
  },
  { 
    id: '30', formula: 'HI', name: 'Hydroiodic Acid', pKa: -9.3, 
    difficulty: 5, molarMass: 127.91, stateAtRoomTemp: 'gas', 
    ions: ['H+', 'I-'], hazardClasses: ['Corrosive'] 
  },
  { 
    id: '31', formula: 'CsOH', name: 'Cesium Hydroxide', pKb: -1.7, 
    difficulty: 5, molarMass: 149.91, stateAtRoomTemp: 'solid', 
    ions: ['Cs+', 'OH-'], hazardClasses: ['Corrosive', 'Toxic'] 
  },
  { 
    id: '32', formula: 'H3BO3', name: 'Boric Acid', pKa: 9.24, 
    difficulty: 5, molarMass: 61.83, stateAtRoomTemp: 'solid', 
    ions: ['H+', 'H2BO3-'], hazardClasses: ['Toxic'] 
  },
  { 
    id: '33', formula: 'H4SiO4', name: 'Silicic Acid', pKa: 9.82, 
    difficulty: 5, molarMass: 96.11, stateAtRoomTemp: 'solid', 
    ions: ['H+', 'H3SiO4-'], hazardClasses: ['None'] 
  },
  { 
    id: '34', formula: 'NaHS', name: 'Sodium Hydrosulfide', pKa: 13.0, pKb: 6.95, 
    difficulty: 5, molarMass: 56.06, stateAtRoomTemp: 'solid', 
    ions: ['Na+', 'HS-'], hazardClasses: ['Corrosive', 'Toxic'] 
  },
  { 
    id: '35', formula: 'NaHSO4', name: 'Sodium Bisulfate', pKa: 1.99, pKb: 17.0, 
    difficulty: 5, molarMass: 120.06, stateAtRoomTemp: 'solid', 
    ions: ['Na+', 'HSO4-'], hazardClasses: ['Corrosive'] 
  }
];