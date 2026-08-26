// src/core-engine/data/games/neutralise-levels.ts

export const NEUTRALISE_LEVEL_DATA = [
  {
    level: 1,
    // 2 Strong Acids (HCl, H2SO4) | 2 Strong Bases (NaOH, KOH)
    compoundPoolIds: ['1', '2', '4', '5'],
  },
  {
    level: 2,
    // 2 Acids (HCl, HF) | 2 Bases (NaOH, NH3) | 1 Weak Acid (H2CO3)
    compoundPoolIds: ['1', '8', '9', '4', '11'],
  },
  {
    level: 3,
    // 2 Acids (H2SO4, H3PO4) | 3 Bases/Amphoterics (KOH, NH3, NaHCO3, Ba(OH)2)
    compoundPoolIds: ['2', '10', '5', '11', '16', '19'],
  },
  {
    level: 4,
    // 3 Acids (HNO2, H2SO3, HBr) | 3 Bases/Amphoterics (N2H4, LiOH, Na2HPO4)
    compoundPoolIds: ['18', '22', '25', '23', '24', '28'],
  },
  {
    level: 5,
    // 5 Acids (HCl, H3PO4, H2SO3, HClO4, H3BO3) | 5 Bases (NaOH, Ba(OH)2, N2H4, CsOH, NaHS)
    compoundPoolIds: ['1', '10', '22', '29', '32', '4', '19', '23', '31', '34'],
  },
];