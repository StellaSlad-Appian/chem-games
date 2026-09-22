// src/core-engine/data/periodic-table.ts
//
// What the periodic-table widget teaches about each of the 118 elements.
//
// This module **joins** to ELEMENTS_REGISTRY by atomic number; it does not
// replace it. Symbol, name, relative atomic mass and atomic radius stay there
// and are read from there. What is here is the teaching data the registry has
// no business carrying: where the element sits in the table, what family it
// belongs to, how its electrons are arranged, and what it does.
//
// Two rules the data obeys, both of them load-bearing:
//
//  1. **`valenceElectrons` is never read.** It is the common combining number
//     the games need — chromium 3, copper 2, gold 1, copernicium 12 — and not
//     a count of outer-shell electrons. `shells` below is authored fresh, and
//     src/core-engine/tests/periodic-table.test.ts checks the first twenty
//     against a hand-written literal. Those twenty are the content of the
//     twenty-element lookup table the widget replaced.
//
//  2. **A field is `null` where the honest answer at this level is "it is not
//     a simple one".** `outerElectrons` across the d- and f-blocks,
//     `commonIonCharge` for the same plus the noble gases, `reactivity`
//     outside groups 1, 2, 17 and 18. A guessed number that renders as a fact
//     is worse than a greyed cell with a legend entry saying why.
//
// `shells` is the ground-state electron count per principal shell, outer shell
// last. It was produced by filling the subshells in Madelung order and then
// applying the ~22 documented ground-state exceptions — Cr, Cu, Nb, Mo, Ru, Rh,
// Pd, Ag, La, Ce, Gd, Pt, Au, Ac, Th, Pa, U, Np, Cm, Lr, Ds, Rg — so chromium
// comes out [2, 8, 13, 1] rather than the [2, 8, 12, 2] a naive fill gives.
//
// **How it was checked, stated plainly rather than by citing a book nobody
// opened.** Two independent derivations had to agree: the values here, and the
// hand-written literal for the first twenty in periodic-table.test.ts. The test
// also proves the arithmetic that has to hold whatever the source — every row
// sums to its atomic number, no inner shell is empty, and the counts agree with
// the group number across the s- and p-blocks. Nothing here was copied from a
// published table, and no table was fetched to confirm it; a reviewer with the
// RSC's periodic table or the CRC Handbook open can settle any one row in a
// few seconds, and the arrangements a Year 9 student is examined on are the
// twenty that are asserted twice.
//
// Beyond roentgenium the configurations are computed predictions in every
// published table too. Nothing on either sheet renders a claim that rests on
// them: the *Outer shell* mode greys the whole d-block, and no mode reads a
// superheavy element's shell counts.
//
// The metal / non-metal / metalloid line follows the seven elements usually
// drawn along the staircase — B, Si, Ge, As, Sb, Te, Po — which is the set the
// Royal Society of Chemistry's table (linked from this sheet under "Learn
// more") marks as semi-metals, with astatine left as a halogen. No definition
// of "metalloid" is official; IUPAC declines to give one. Following the table
// the sheet already sends students to is what leaves them with one story
// rather than two, and the sheet marks the whole idea as an extension because
// the curriculum says only "metallic and non-metallic properties".

import type { PeriodicTableEntry } from '../types/chemistry';

/**
 * One entry per element, in atomic-number order.
 *
 * Deliberately a flat literal rather than anything computed. It is chemistry
 * data: it should read as a table, diff as a table, and be correctable one
 * line at a time.
 */
export const PERIODIC_TABLE: PeriodicTableEntry[] = [
  // Period 1
  { atomicNumber: 1, symbol: 'H', group: 1, period: 1, block: 's', category: 'nonmetal', metalClass: 'non-metal', shells: [1], outerElectrons: 1, commonIonCharge: 1, reactivity: null, stateAt25C: 'gas', occurrence: 'natural' }, // Hydrogen
  { atomicNumber: 2, symbol: 'He', group: 18, period: 1, block: 's', category: 'noble-gas', metalClass: 'non-metal', shells: [2], outerElectrons: 2, commonIonCharge: null, reactivity: 'unreactive', stateAt25C: 'gas', occurrence: 'natural' }, // Helium
  // Period 2
  { atomicNumber: 3, symbol: 'Li', group: 1, period: 2, block: 's', category: 'alkali-metal', metalClass: 'metal', shells: [2, 1], outerElectrons: 1, commonIonCharge: 1, reactivity: 'moderate', stateAt25C: 'solid', occurrence: 'natural' }, // Lithium
  { atomicNumber: 4, symbol: 'Be', group: 2, period: 2, block: 's', category: 'alkaline-earth', metalClass: 'metal', shells: [2, 2], outerElectrons: 2, commonIonCharge: 2, reactivity: 'low', stateAt25C: 'solid', occurrence: 'natural' }, // Beryllium
  { atomicNumber: 5, symbol: 'B', group: 13, period: 2, block: 'p', category: 'metalloid', metalClass: 'metalloid', shells: [2, 3], outerElectrons: 3, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Boron
  { atomicNumber: 6, symbol: 'C', group: 14, period: 2, block: 'p', category: 'nonmetal', metalClass: 'non-metal', shells: [2, 4], outerElectrons: 4, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Carbon
  { atomicNumber: 7, symbol: 'N', group: 15, period: 2, block: 'p', category: 'nonmetal', metalClass: 'non-metal', shells: [2, 5], outerElectrons: 5, commonIonCharge: -3, reactivity: null, stateAt25C: 'gas', occurrence: 'natural' }, // Nitrogen
  { atomicNumber: 8, symbol: 'O', group: 16, period: 2, block: 'p', category: 'nonmetal', metalClass: 'non-metal', shells: [2, 6], outerElectrons: 6, commonIonCharge: -2, reactivity: null, stateAt25C: 'gas', occurrence: 'natural' }, // Oxygen
  { atomicNumber: 9, symbol: 'F', group: 17, period: 2, block: 'p', category: 'halogen', metalClass: 'non-metal', shells: [2, 7], outerElectrons: 7, commonIonCharge: -1, reactivity: 'very-high', stateAt25C: 'gas', occurrence: 'natural' }, // Fluorine
  { atomicNumber: 10, symbol: 'Ne', group: 18, period: 2, block: 'p', category: 'noble-gas', metalClass: 'non-metal', shells: [2, 8], outerElectrons: 8, commonIonCharge: null, reactivity: 'unreactive', stateAt25C: 'gas', occurrence: 'natural' }, // Neon
  // Period 3
  { atomicNumber: 11, symbol: 'Na', group: 1, period: 3, block: 's', category: 'alkali-metal', metalClass: 'metal', shells: [2, 8, 1], outerElectrons: 1, commonIonCharge: 1, reactivity: 'high', stateAt25C: 'solid', occurrence: 'natural' }, // Sodium
  { atomicNumber: 12, symbol: 'Mg', group: 2, period: 3, block: 's', category: 'alkaline-earth', metalClass: 'metal', shells: [2, 8, 2], outerElectrons: 2, commonIonCharge: 2, reactivity: 'moderate', stateAt25C: 'solid', occurrence: 'natural' }, // Magnesium
  { atomicNumber: 13, symbol: 'Al', group: 13, period: 3, block: 'p', category: 'post-transition-metal', metalClass: 'metal', shells: [2, 8, 3], outerElectrons: 3, commonIonCharge: 3, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Aluminium
  { atomicNumber: 14, symbol: 'Si', group: 14, period: 3, block: 'p', category: 'metalloid', metalClass: 'metalloid', shells: [2, 8, 4], outerElectrons: 4, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Silicon
  { atomicNumber: 15, symbol: 'P', group: 15, period: 3, block: 'p', category: 'nonmetal', metalClass: 'non-metal', shells: [2, 8, 5], outerElectrons: 5, commonIonCharge: -3, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Phosphorus
  { atomicNumber: 16, symbol: 'S', group: 16, period: 3, block: 'p', category: 'nonmetal', metalClass: 'non-metal', shells: [2, 8, 6], outerElectrons: 6, commonIonCharge: -2, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Sulfur
  { atomicNumber: 17, symbol: 'Cl', group: 17, period: 3, block: 'p', category: 'halogen', metalClass: 'non-metal', shells: [2, 8, 7], outerElectrons: 7, commonIonCharge: -1, reactivity: 'high', stateAt25C: 'gas', occurrence: 'natural' }, // Chlorine
  { atomicNumber: 18, symbol: 'Ar', group: 18, period: 3, block: 'p', category: 'noble-gas', metalClass: 'non-metal', shells: [2, 8, 8], outerElectrons: 8, commonIonCharge: null, reactivity: 'unreactive', stateAt25C: 'gas', occurrence: 'natural' }, // Argon
  // Period 4
  { atomicNumber: 19, symbol: 'K', group: 1, period: 4, block: 's', category: 'alkali-metal', metalClass: 'metal', shells: [2, 8, 8, 1], outerElectrons: 1, commonIonCharge: 1, reactivity: 'high', stateAt25C: 'solid', occurrence: 'natural' }, // Potassium
  { atomicNumber: 20, symbol: 'Ca', group: 2, period: 4, block: 's', category: 'alkaline-earth', metalClass: 'metal', shells: [2, 8, 8, 2], outerElectrons: 2, commonIonCharge: 2, reactivity: 'high', stateAt25C: 'solid', occurrence: 'natural' }, // Calcium
  { atomicNumber: 21, symbol: 'Sc', group: 3, period: 4, block: 'd', category: 'transition-metal', metalClass: 'metal', shells: [2, 8, 9, 2], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Scandium
  { atomicNumber: 22, symbol: 'Ti', group: 4, period: 4, block: 'd', category: 'transition-metal', metalClass: 'metal', shells: [2, 8, 10, 2], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Titanium
  { atomicNumber: 23, symbol: 'V', group: 5, period: 4, block: 'd', category: 'transition-metal', metalClass: 'metal', shells: [2, 8, 11, 2], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Vanadium
  { atomicNumber: 24, symbol: 'Cr', group: 6, period: 4, block: 'd', category: 'transition-metal', metalClass: 'metal', shells: [2, 8, 13, 1], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Chromium
  { atomicNumber: 25, symbol: 'Mn', group: 7, period: 4, block: 'd', category: 'transition-metal', metalClass: 'metal', shells: [2, 8, 13, 2], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Manganese
  { atomicNumber: 26, symbol: 'Fe', group: 8, period: 4, block: 'd', category: 'transition-metal', metalClass: 'metal', shells: [2, 8, 14, 2], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Iron
  { atomicNumber: 27, symbol: 'Co', group: 9, period: 4, block: 'd', category: 'transition-metal', metalClass: 'metal', shells: [2, 8, 15, 2], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Cobalt
  { atomicNumber: 28, symbol: 'Ni', group: 10, period: 4, block: 'd', category: 'transition-metal', metalClass: 'metal', shells: [2, 8, 16, 2], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Nickel
  { atomicNumber: 29, symbol: 'Cu', group: 11, period: 4, block: 'd', category: 'transition-metal', metalClass: 'metal', shells: [2, 8, 18, 1], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Copper
  { atomicNumber: 30, symbol: 'Zn', group: 12, period: 4, block: 'd', category: 'transition-metal', metalClass: 'metal', shells: [2, 8, 18, 2], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Zinc
  { atomicNumber: 31, symbol: 'Ga', group: 13, period: 4, block: 'p', category: 'post-transition-metal', metalClass: 'metal', shells: [2, 8, 18, 3], outerElectrons: 3, commonIonCharge: 3, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Gallium
  { atomicNumber: 32, symbol: 'Ge', group: 14, period: 4, block: 'p', category: 'metalloid', metalClass: 'metalloid', shells: [2, 8, 18, 4], outerElectrons: 4, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Germanium
  { atomicNumber: 33, symbol: 'As', group: 15, period: 4, block: 'p', category: 'metalloid', metalClass: 'metalloid', shells: [2, 8, 18, 5], outerElectrons: 5, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Arsenic
  { atomicNumber: 34, symbol: 'Se', group: 16, period: 4, block: 'p', category: 'nonmetal', metalClass: 'non-metal', shells: [2, 8, 18, 6], outerElectrons: 6, commonIonCharge: -2, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Selenium
  { atomicNumber: 35, symbol: 'Br', group: 17, period: 4, block: 'p', category: 'halogen', metalClass: 'non-metal', shells: [2, 8, 18, 7], outerElectrons: 7, commonIonCharge: -1, reactivity: 'moderate', stateAt25C: 'liquid', occurrence: 'natural' }, // Bromine
  { atomicNumber: 36, symbol: 'Kr', group: 18, period: 4, block: 'p', category: 'noble-gas', metalClass: 'non-metal', shells: [2, 8, 18, 8], outerElectrons: 8, commonIonCharge: null, reactivity: 'unreactive', stateAt25C: 'gas', occurrence: 'natural' }, // Krypton
  // Period 5
  { atomicNumber: 37, symbol: 'Rb', group: 1, period: 5, block: 's', category: 'alkali-metal', metalClass: 'metal', shells: [2, 8, 18, 8, 1], outerElectrons: 1, commonIonCharge: 1, reactivity: 'very-high', stateAt25C: 'solid', occurrence: 'natural' }, // Rubidium
  { atomicNumber: 38, symbol: 'Sr', group: 2, period: 5, block: 's', category: 'alkaline-earth', metalClass: 'metal', shells: [2, 8, 18, 8, 2], outerElectrons: 2, commonIonCharge: 2, reactivity: 'high', stateAt25C: 'solid', occurrence: 'natural' }, // Strontium
  { atomicNumber: 39, symbol: 'Y', group: 3, period: 5, block: 'd', category: 'transition-metal', metalClass: 'metal', shells: [2, 8, 18, 9, 2], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Yttrium
  { atomicNumber: 40, symbol: 'Zr', group: 4, period: 5, block: 'd', category: 'transition-metal', metalClass: 'metal', shells: [2, 8, 18, 10, 2], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Zirconium
  { atomicNumber: 41, symbol: 'Nb', group: 5, period: 5, block: 'd', category: 'transition-metal', metalClass: 'metal', shells: [2, 8, 18, 12, 1], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Niobium
  { atomicNumber: 42, symbol: 'Mo', group: 6, period: 5, block: 'd', category: 'transition-metal', metalClass: 'metal', shells: [2, 8, 18, 13, 1], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Molybdenum
  { atomicNumber: 43, symbol: 'Tc', group: 7, period: 5, block: 'd', category: 'transition-metal', metalClass: 'metal', shells: [2, 8, 18, 13, 2], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'synthetic' }, // Technetium
  { atomicNumber: 44, symbol: 'Ru', group: 8, period: 5, block: 'd', category: 'transition-metal', metalClass: 'metal', shells: [2, 8, 18, 15, 1], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Ruthenium
  { atomicNumber: 45, symbol: 'Rh', group: 9, period: 5, block: 'd', category: 'transition-metal', metalClass: 'metal', shells: [2, 8, 18, 16, 1], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Rhodium
  { atomicNumber: 46, symbol: 'Pd', group: 10, period: 5, block: 'd', category: 'transition-metal', metalClass: 'metal', shells: [2, 8, 18, 18], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Palladium
  { atomicNumber: 47, symbol: 'Ag', group: 11, period: 5, block: 'd', category: 'transition-metal', metalClass: 'metal', shells: [2, 8, 18, 18, 1], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Silver
  { atomicNumber: 48, symbol: 'Cd', group: 12, period: 5, block: 'd', category: 'transition-metal', metalClass: 'metal', shells: [2, 8, 18, 18, 2], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Cadmium
  { atomicNumber: 49, symbol: 'In', group: 13, period: 5, block: 'p', category: 'post-transition-metal', metalClass: 'metal', shells: [2, 8, 18, 18, 3], outerElectrons: 3, commonIonCharge: 3, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Indium
  { atomicNumber: 50, symbol: 'Sn', group: 14, period: 5, block: 'p', category: 'post-transition-metal', metalClass: 'metal', shells: [2, 8, 18, 18, 4], outerElectrons: 4, commonIonCharge: 2, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Tin
  { atomicNumber: 51, symbol: 'Sb', group: 15, period: 5, block: 'p', category: 'metalloid', metalClass: 'metalloid', shells: [2, 8, 18, 18, 5], outerElectrons: 5, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Antimony
  { atomicNumber: 52, symbol: 'Te', group: 16, period: 5, block: 'p', category: 'metalloid', metalClass: 'metalloid', shells: [2, 8, 18, 18, 6], outerElectrons: 6, commonIonCharge: -2, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Tellurium
  { atomicNumber: 53, symbol: 'I', group: 17, period: 5, block: 'p', category: 'halogen', metalClass: 'non-metal', shells: [2, 8, 18, 18, 7], outerElectrons: 7, commonIonCharge: -1, reactivity: 'low', stateAt25C: 'solid', occurrence: 'natural' }, // Iodine
  { atomicNumber: 54, symbol: 'Xe', group: 18, period: 5, block: 'p', category: 'noble-gas', metalClass: 'non-metal', shells: [2, 8, 18, 18, 8], outerElectrons: 8, commonIonCharge: null, reactivity: 'unreactive', stateAt25C: 'gas', occurrence: 'natural' }, // Xenon
  // Period 6
  { atomicNumber: 55, symbol: 'Cs', group: 1, period: 6, block: 's', category: 'alkali-metal', metalClass: 'metal', shells: [2, 8, 18, 18, 8, 1], outerElectrons: 1, commonIonCharge: 1, reactivity: 'very-high', stateAt25C: 'solid', occurrence: 'natural' }, // Caesium
  { atomicNumber: 56, symbol: 'Ba', group: 2, period: 6, block: 's', category: 'alkaline-earth', metalClass: 'metal', shells: [2, 8, 18, 18, 8, 2], outerElectrons: 2, commonIonCharge: 2, reactivity: 'very-high', stateAt25C: 'solid', occurrence: 'natural' }, // Barium
  // The lanthanides — the first f-block row, 15 wide, group `null`.
  { atomicNumber: 57, symbol: 'La', group: null, period: 6, block: 'f', category: 'lanthanide', metalClass: 'metal', shells: [2, 8, 18, 18, 9, 2], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Lanthanum
  { atomicNumber: 58, symbol: 'Ce', group: null, period: 6, block: 'f', category: 'lanthanide', metalClass: 'metal', shells: [2, 8, 18, 19, 9, 2], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Cerium
  { atomicNumber: 59, symbol: 'Pr', group: null, period: 6, block: 'f', category: 'lanthanide', metalClass: 'metal', shells: [2, 8, 18, 21, 8, 2], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Praseodymium
  { atomicNumber: 60, symbol: 'Nd', group: null, period: 6, block: 'f', category: 'lanthanide', metalClass: 'metal', shells: [2, 8, 18, 22, 8, 2], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Neodymium
  { atomicNumber: 61, symbol: 'Pm', group: null, period: 6, block: 'f', category: 'lanthanide', metalClass: 'metal', shells: [2, 8, 18, 23, 8, 2], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'synthetic' }, // Promethium
  { atomicNumber: 62, symbol: 'Sm', group: null, period: 6, block: 'f', category: 'lanthanide', metalClass: 'metal', shells: [2, 8, 18, 24, 8, 2], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Samarium
  { atomicNumber: 63, symbol: 'Eu', group: null, period: 6, block: 'f', category: 'lanthanide', metalClass: 'metal', shells: [2, 8, 18, 25, 8, 2], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Europium
  { atomicNumber: 64, symbol: 'Gd', group: null, period: 6, block: 'f', category: 'lanthanide', metalClass: 'metal', shells: [2, 8, 18, 25, 9, 2], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Gadolinium
  { atomicNumber: 65, symbol: 'Tb', group: null, period: 6, block: 'f', category: 'lanthanide', metalClass: 'metal', shells: [2, 8, 18, 27, 8, 2], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Terbium
  { atomicNumber: 66, symbol: 'Dy', group: null, period: 6, block: 'f', category: 'lanthanide', metalClass: 'metal', shells: [2, 8, 18, 28, 8, 2], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Dysprosium
  { atomicNumber: 67, symbol: 'Ho', group: null, period: 6, block: 'f', category: 'lanthanide', metalClass: 'metal', shells: [2, 8, 18, 29, 8, 2], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Holmium
  { atomicNumber: 68, symbol: 'Er', group: null, period: 6, block: 'f', category: 'lanthanide', metalClass: 'metal', shells: [2, 8, 18, 30, 8, 2], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Erbium
  { atomicNumber: 69, symbol: 'Tm', group: null, period: 6, block: 'f', category: 'lanthanide', metalClass: 'metal', shells: [2, 8, 18, 31, 8, 2], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Thulium
  { atomicNumber: 70, symbol: 'Yb', group: null, period: 6, block: 'f', category: 'lanthanide', metalClass: 'metal', shells: [2, 8, 18, 32, 8, 2], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Ytterbium
  { atomicNumber: 71, symbol: 'Lu', group: null, period: 6, block: 'f', category: 'lanthanide', metalClass: 'metal', shells: [2, 8, 18, 32, 9, 2], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Lutetium
  { atomicNumber: 72, symbol: 'Hf', group: 4, period: 6, block: 'd', category: 'transition-metal', metalClass: 'metal', shells: [2, 8, 18, 32, 10, 2], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Hafnium
  { atomicNumber: 73, symbol: 'Ta', group: 5, period: 6, block: 'd', category: 'transition-metal', metalClass: 'metal', shells: [2, 8, 18, 32, 11, 2], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Tantalum
  { atomicNumber: 74, symbol: 'W', group: 6, period: 6, block: 'd', category: 'transition-metal', metalClass: 'metal', shells: [2, 8, 18, 32, 12, 2], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Tungsten
  { atomicNumber: 75, symbol: 'Re', group: 7, period: 6, block: 'd', category: 'transition-metal', metalClass: 'metal', shells: [2, 8, 18, 32, 13, 2], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Rhenium
  { atomicNumber: 76, symbol: 'Os', group: 8, period: 6, block: 'd', category: 'transition-metal', metalClass: 'metal', shells: [2, 8, 18, 32, 14, 2], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Osmium
  { atomicNumber: 77, symbol: 'Ir', group: 9, period: 6, block: 'd', category: 'transition-metal', metalClass: 'metal', shells: [2, 8, 18, 32, 15, 2], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Iridium
  { atomicNumber: 78, symbol: 'Pt', group: 10, period: 6, block: 'd', category: 'transition-metal', metalClass: 'metal', shells: [2, 8, 18, 32, 17, 1], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Platinum
  { atomicNumber: 79, symbol: 'Au', group: 11, period: 6, block: 'd', category: 'transition-metal', metalClass: 'metal', shells: [2, 8, 18, 32, 18, 1], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Gold
  { atomicNumber: 80, symbol: 'Hg', group: 12, period: 6, block: 'd', category: 'transition-metal', metalClass: 'metal', shells: [2, 8, 18, 32, 18, 2], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'liquid', occurrence: 'natural' }, // Mercury
  { atomicNumber: 81, symbol: 'Tl', group: 13, period: 6, block: 'p', category: 'post-transition-metal', metalClass: 'metal', shells: [2, 8, 18, 32, 18, 3], outerElectrons: 3, commonIonCharge: 1, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Thallium
  { atomicNumber: 82, symbol: 'Pb', group: 14, period: 6, block: 'p', category: 'post-transition-metal', metalClass: 'metal', shells: [2, 8, 18, 32, 18, 4], outerElectrons: 4, commonIonCharge: 2, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Lead
  { atomicNumber: 83, symbol: 'Bi', group: 15, period: 6, block: 'p', category: 'post-transition-metal', metalClass: 'metal', shells: [2, 8, 18, 32, 18, 5], outerElectrons: 5, commonIonCharge: 3, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Bismuth
  { atomicNumber: 84, symbol: 'Po', group: 16, period: 6, block: 'p', category: 'metalloid', metalClass: 'metalloid', shells: [2, 8, 18, 32, 18, 6], outerElectrons: 6, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Polonium
  { atomicNumber: 85, symbol: 'At', group: 17, period: 6, block: 'p', category: 'halogen', metalClass: 'non-metal', shells: [2, 8, 18, 32, 18, 7], outerElectrons: 7, commonIonCharge: -1, reactivity: 'low', stateAt25C: 'solid', occurrence: 'natural' }, // Astatine
  { atomicNumber: 86, symbol: 'Rn', group: 18, period: 6, block: 'p', category: 'noble-gas', metalClass: 'non-metal', shells: [2, 8, 18, 32, 18, 8], outerElectrons: 8, commonIonCharge: null, reactivity: 'unreactive', stateAt25C: 'gas', occurrence: 'natural' }, // Radon
  // Period 7
  { atomicNumber: 87, symbol: 'Fr', group: 1, period: 7, block: 's', category: 'alkali-metal', metalClass: 'metal', shells: [2, 8, 18, 32, 18, 8, 1], outerElectrons: 1, commonIonCharge: 1, reactivity: 'very-high', stateAt25C: 'solid', occurrence: 'natural' }, // Francium
  { atomicNumber: 88, symbol: 'Ra', group: 2, period: 7, block: 's', category: 'alkaline-earth', metalClass: 'metal', shells: [2, 8, 18, 32, 18, 8, 2], outerElectrons: 2, commonIonCharge: 2, reactivity: 'very-high', stateAt25C: 'solid', occurrence: 'natural' }, // Radium
  // The actinides — the second f-block row, 15 wide, group `null`.
  { atomicNumber: 89, symbol: 'Ac', group: null, period: 7, block: 'f', category: 'actinide', metalClass: 'metal', shells: [2, 8, 18, 32, 18, 9, 2], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Actinium
  { atomicNumber: 90, symbol: 'Th', group: null, period: 7, block: 'f', category: 'actinide', metalClass: 'metal', shells: [2, 8, 18, 32, 18, 10, 2], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Thorium
  { atomicNumber: 91, symbol: 'Pa', group: null, period: 7, block: 'f', category: 'actinide', metalClass: 'metal', shells: [2, 8, 18, 32, 20, 9, 2], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Protactinium
  { atomicNumber: 92, symbol: 'U', group: null, period: 7, block: 'f', category: 'actinide', metalClass: 'metal', shells: [2, 8, 18, 32, 21, 9, 2], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'natural' }, // Uranium
  { atomicNumber: 93, symbol: 'Np', group: null, period: 7, block: 'f', category: 'actinide', metalClass: 'metal', shells: [2, 8, 18, 32, 22, 9, 2], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'synthetic' }, // Neptunium
  { atomicNumber: 94, symbol: 'Pu', group: null, period: 7, block: 'f', category: 'actinide', metalClass: 'metal', shells: [2, 8, 18, 32, 24, 8, 2], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'synthetic' }, // Plutonium
  { atomicNumber: 95, symbol: 'Am', group: null, period: 7, block: 'f', category: 'actinide', metalClass: 'metal', shells: [2, 8, 18, 32, 25, 8, 2], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'synthetic' }, // Americium
  { atomicNumber: 96, symbol: 'Cm', group: null, period: 7, block: 'f', category: 'actinide', metalClass: 'metal', shells: [2, 8, 18, 32, 25, 9, 2], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'synthetic' }, // Curium
  { atomicNumber: 97, symbol: 'Bk', group: null, period: 7, block: 'f', category: 'actinide', metalClass: 'metal', shells: [2, 8, 18, 32, 27, 8, 2], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'synthetic' }, // Berkelium
  { atomicNumber: 98, symbol: 'Cf', group: null, period: 7, block: 'f', category: 'actinide', metalClass: 'metal', shells: [2, 8, 18, 32, 28, 8, 2], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'synthetic' }, // Californium
  { atomicNumber: 99, symbol: 'Es', group: null, period: 7, block: 'f', category: 'actinide', metalClass: 'metal', shells: [2, 8, 18, 32, 29, 8, 2], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'synthetic' }, // Einsteinium
  { atomicNumber: 100, symbol: 'Fm', group: null, period: 7, block: 'f', category: 'actinide', metalClass: 'metal', shells: [2, 8, 18, 32, 30, 8, 2], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'synthetic' }, // Fermium
  { atomicNumber: 101, symbol: 'Md', group: null, period: 7, block: 'f', category: 'actinide', metalClass: 'metal', shells: [2, 8, 18, 32, 31, 8, 2], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'synthetic' }, // Mendelevium
  { atomicNumber: 102, symbol: 'No', group: null, period: 7, block: 'f', category: 'actinide', metalClass: 'metal', shells: [2, 8, 18, 32, 32, 8, 2], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'synthetic' }, // Nobelium
  { atomicNumber: 103, symbol: 'Lr', group: null, period: 7, block: 'f', category: 'actinide', metalClass: 'metal', shells: [2, 8, 18, 32, 32, 8, 3], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'synthetic' }, // Lawrencium
  { atomicNumber: 104, symbol: 'Rf', group: 4, period: 7, block: 'd', category: 'transition-metal', metalClass: 'metal', shells: [2, 8, 18, 32, 32, 10, 2], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'synthetic' }, // Rutherfordium
  { atomicNumber: 105, symbol: 'Db', group: 5, period: 7, block: 'd', category: 'transition-metal', metalClass: 'metal', shells: [2, 8, 18, 32, 32, 11, 2], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'synthetic' }, // Dubnium
  { atomicNumber: 106, symbol: 'Sg', group: 6, period: 7, block: 'd', category: 'transition-metal', metalClass: 'metal', shells: [2, 8, 18, 32, 32, 12, 2], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'synthetic' }, // Seaborgium
  { atomicNumber: 107, symbol: 'Bh', group: 7, period: 7, block: 'd', category: 'transition-metal', metalClass: 'metal', shells: [2, 8, 18, 32, 32, 13, 2], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'synthetic' }, // Bohrium
  { atomicNumber: 108, symbol: 'Hs', group: 8, period: 7, block: 'd', category: 'transition-metal', metalClass: 'metal', shells: [2, 8, 18, 32, 32, 14, 2], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'synthetic' }, // Hassium
  { atomicNumber: 109, symbol: 'Mt', group: 9, period: 7, block: 'd', category: 'transition-metal', metalClass: 'metal', shells: [2, 8, 18, 32, 32, 15, 2], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'synthetic' }, // Meitnerium
  { atomicNumber: 110, symbol: 'Ds', group: 10, period: 7, block: 'd', category: 'transition-metal', metalClass: 'metal', shells: [2, 8, 18, 32, 32, 17, 1], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'synthetic' }, // Darmstadtium
  { atomicNumber: 111, symbol: 'Rg', group: 11, period: 7, block: 'd', category: 'transition-metal', metalClass: 'metal', shells: [2, 8, 18, 32, 32, 18, 1], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'synthetic' }, // Roentgenium
  { atomicNumber: 112, symbol: 'Cn', group: 12, period: 7, block: 'd', category: 'transition-metal', metalClass: 'metal', shells: [2, 8, 18, 32, 32, 18, 2], outerElectrons: null, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'synthetic' }, // Copernicium
  { atomicNumber: 113, symbol: 'Nh', group: 13, period: 7, block: 'p', category: 'post-transition-metal', metalClass: 'metal', shells: [2, 8, 18, 32, 32, 18, 3], outerElectrons: 3, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'synthetic' }, // Nihonium
  { atomicNumber: 114, symbol: 'Fl', group: 14, period: 7, block: 'p', category: 'post-transition-metal', metalClass: 'metal', shells: [2, 8, 18, 32, 32, 18, 4], outerElectrons: 4, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'synthetic' }, // Flerovium
  { atomicNumber: 115, symbol: 'Mc', group: 15, period: 7, block: 'p', category: 'post-transition-metal', metalClass: 'metal', shells: [2, 8, 18, 32, 32, 18, 5], outerElectrons: 5, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'synthetic' }, // Moscovium
  { atomicNumber: 116, symbol: 'Lv', group: 16, period: 7, block: 'p', category: 'post-transition-metal', metalClass: 'metal', shells: [2, 8, 18, 32, 32, 18, 6], outerElectrons: 6, commonIonCharge: null, reactivity: null, stateAt25C: 'solid', occurrence: 'synthetic' }, // Livermorium
  { atomicNumber: 117, symbol: 'Ts', group: 17, period: 7, block: 'p', category: 'halogen', metalClass: 'non-metal', shells: [2, 8, 18, 32, 32, 18, 7], outerElectrons: 7, commonIonCharge: null, reactivity: 'low', stateAt25C: 'solid', occurrence: 'synthetic' }, // Tennessine
  { atomicNumber: 118, symbol: 'Og', group: 18, period: 7, block: 'p', category: 'noble-gas', metalClass: 'non-metal', shells: [2, 8, 18, 32, 32, 18, 8], outerElectrons: 8, commonIonCharge: null, reactivity: 'unreactive', stateAt25C: 'solid', occurrence: 'synthetic' }, // Oganesson
];

const BY_ATOMIC_NUMBER = new Map<number, PeriodicTableEntry>(
  PERIODIC_TABLE.map((entry) => [entry.atomicNumber, entry])
);

/** The entry for an atomic number, or `undefined` outside 1–118. */
export function periodicTableEntry(atomicNumber: number): PeriodicTableEntry | undefined {
  return BY_ATOMIC_NUMBER.get(atomicNumber);
}

const BY_SYMBOL = new Map<string, PeriodicTableEntry>(
  PERIODIC_TABLE.map((entry) => [entry.symbol, entry])
);

/** The entry for an element symbol, or `undefined` if there is none. */
export function periodicTableEntryBySymbol(symbol: string): PeriodicTableEntry | undefined {
  return BY_SYMBOL.get(symbol);
}

/**
 * The electron arrangement as a student writes it: `2, 8, 1`.
 *
 * The separator is a comma and a space in every locale the site ships. Shell
 * counts are small integers below 33, so no locale groups them and none needs
 * a decimal mark — unlike relative atomic mass, which the widget formats
 * through `Intl` because Russian writes 35,45.
 */
export function electronArrangement(entry: PeriodicTableEntry): string {
  return entry.shells.join(', ');
}

/**
 * `1+`, `2−`, or `undefined` where the table predicts no simple ion.
 *
 * The minus is U+2212 MINUS SIGN, not a hyphen. It is the character the sheet
 * already uses for a charge ("−1" in the subatomic-particle table), it is what
 * a mathematical operator is, and several screen readers read a hyphen here as
 * "dash" or skip it altogether.
 */
export function ionLabel(charge: number | null): string | undefined {
  if (charge === null || charge === 0) return undefined;
  return `${Math.abs(charge)}${charge > 0 ? '+' : '−'}`;
}

// The *shape* of the drawn table — how many columns it has, which rows are
// pulled out underneath — is deliberately not here. It is presentation, and it
// lives in src/components/periodic-table/layout.ts, derived from the `group`,
// `period` and `block` above rather than stated a second time. A second
// statement of it is a second thing to keep in step.
