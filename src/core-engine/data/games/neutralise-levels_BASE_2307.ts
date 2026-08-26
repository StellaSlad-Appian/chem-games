// src/core-engine/data/games/neutralise-levels.ts

export const NEUTRALISE_LEVEL_DATA = [
  { level: 1, compoundPoolIds: ['1', '2', '3'] },
  { level: 2, compoundPoolIds: ['1', '2', '3', '4'] },
  { level: 3, compoundPoolIds: ['2', '4', '5', '9'] },   // swapped '6' (NaCl, neutral) → '9' (H2CO3, acidic)
  { level: 4, compoundPoolIds: ['3', '5', '10', '11'] }, // swapped '6','7' (neutral) → '10' (H3PO4, acidic), '11' (NH3, basic)
  { level: 5, compoundPoolIds: ['1', '2', '3', '4', '5', '9', '10'] }, // dropped '6','7', added '9','10' to keep 7 total
];