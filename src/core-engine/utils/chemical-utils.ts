// src/lib/chemical-utils.ts
import { CompoundData, ChemicalClassification } from '@/core-engine/types/chemistry';

/**
 * Evaluates the classification of a chemical based on its dissociation constants.
 * Compounds lacking explicit pKa/pKb metrics default correctly to neutral salts.
 * **/

export function evaluateChemical(chemical: CompoundData): ChemicalClassification {
  const hasAcidProps = chemical.pKa !== undefined && chemical.pKa <= 14;
  const hasBaseProps = chemical.pKb !== undefined && chemical.pKb <= 14;

  // Amphoteric compounds carry both pKa and pKb — the SMALLER of the two
  // indicates which tendency actually dominates (lower pKa = stronger
  // acid, lower pKb = stronger base). A fixed cutoff like "pKa < 7" is
  // just a rough proxy for this comparison and gets it wrong whenever
  // both values sit on the same side of the cutoff.
  if (hasAcidProps && hasBaseProps) {
    if (chemical.pKa! < chemical.pKb!) return 'Acidic';
    if (chemical.pKb! < chemical.pKa!) return 'Basic';
    return 'Neutral'; // genuine tie, e.g. water (pKa = pKb = 14.0) — treated
                       // as neutral rather than a separate Amphoteric bucket,
                       // since neither game's UI currently supports that case
  }

  if (hasAcidProps) {
    return 'Acidic';
  }

  if (hasBaseProps) {
    return 'Basic';
  }

  return 'Neutral';
}

/**
 * Determines the number of neutralization equivalents (shots required).
 * Looks at the number of H+ or OH- ions the compound can produce.
 */
export function calculateMoleculeHealth(compound: CompoundData): number {
  if (!compound.ionicComponents) return 1;

  const classification = evaluateChemical(compound);

  if (classification === 'Acidic') {
    // ionId: '1' represents H+ in your compounds.ts registry
    const protonComponent = compound.ionicComponents.cations.find(c => c.ionId === '1');
    return protonComponent ? protonComponent.count : 1;
  } 
  
  if (classification === 'Basic') {
    // ionId: '6' represents OH- in your compounds.ts registry
    const hydroxideComponent = compound.ionicComponents.anions.find(a => a.ionId === '6');
    return hydroxideComponent ? hydroxideComponent.count : 1;
  }

  return 1;
}

export const isNeutralizationCompatible = (
  compoundType: 'acid' | 'base' | 'neutral', // Added 'neutral' here
  projectileType: 'H-ion' | 'OH-ion'
): boolean => {
  // Neutral molecules are never neutralized by ions in this game
  if (compoundType === 'neutral') return false; 

  if (compoundType === 'acid' && projectileType === 'OH-ion') return true;
  if (compoundType === 'base' && projectileType === 'H-ion') return true;
  return false;
};

// Formula Blaster

/**
 * Generates dynamic comparative error feedback when a student clicks an incorrect compound.
 * Compares the clicked distractor against the current target compound to highlight missing elements.
 */
export function generateComparativeError(
  clickedChem: CompoundData,
  targetChem: CompoundData | null
): string {
  if (!targetChem) {
    return `That's ${clickedChem.name} (${clickedChem.formula})!`;
  }

  const clickedSymbols = new Set(clickedChem.elements.map((e) => e.symbol));
  const missingInClicked = targetChem.elements.filter(
    (e) => !clickedSymbols.has(e.symbol)
  );

  if (missingInClicked.length > 0) {
    const keyElement = missingInClicked[0];
    return `That's ${clickedChem.name} (${clickedChem.formula})! Look for ${keyElement.name} (${keyElement.symbol}) atoms instead.`;
  }

  return `That's ${clickedChem.name} (${clickedChem.formula})! Check the atom counts for ${targetChem.name}.`;
}

/**
 * Generates a general hint describing the elemental makeup of a compound.
 */
export function generateChemicalHint(chem: CompoundData): string {
  const elementSymbols = chem.elements.map((e) => e.symbol).join(' & ');
  return `${chem.name} consists of the elements: ${elementSymbols}.`;
}

// Reaction Balancer

/**
 * Parses a chemical formula into an atom inventory.
 *
 * Examples:
 *   H2O  -> { H: 2, O: 1 }
 *   CO2  -> { C: 1, O: 2 }
 *   NaCl -> { Na: 1, Cl: 1 }
 *
 * State symbols such as (s), (l), (g) and (aq)
 * are ignored because they are not elements.
 */
export function parseFormulaAtoms(
  formula: string
): Record<string, number> {
  const cleanFormula = formula.replace(/\([a-z]{1,2}\)/g, '');

  const regex = /([A-Z][a-z]*)(\d*)/g;
  const counts: Record<string, number> = {};

  let match: RegExpExecArray | null;

  while ((match = regex.exec(cleanFormula)) !== null) {
    const element = match[1];
    const quantity = match[2]
      ? parseInt(match[2], 10)
      : 1;

    counts[element] =
      (counts[element] || 0) + quantity;
  }

  return counts;
}

/**
 * Calculates the total number of atoms of each element
 * across a collection of compounds.
 *
 * An empty coefficient is treated as 1, matching the
 * Reaction Balancer input behaviour.
 */
export function calculateAtomInventory(
  compounds: { compoundId: string }[],
  coefficients: (number | '')[]
): Record<string, number> {
  const inventory: Record<string, number> = {};

  compounds.forEach((compound, index) => {
    const coefficient =
      typeof coefficients[index] === 'number'
        ? coefficients[index]
        : 1;

    const atoms = parseFormulaAtoms(
      compound.compoundId
    );

    Object.entries(atoms).forEach(
      ([element, count]) => {
        inventory[element] =
          (inventory[element] || 0) +
          count * coefficient;
      }
    );
  });

  return inventory;
}

/**
 * Determines whether two atom inventories are balanced.
 */
export function areAtomInventoriesBalanced(
  left: Record<string, number>,
  right: Record<string, number>
): boolean {
  const elements = Array.from(
    new Set([
      ...Object.keys(left),
      ...Object.keys(right),
    ])
  );

  if (elements.length === 0) {
    return false;
  }

  return elements.every(
    (element) =>
      (left[element] || 0) ===
      (right[element] || 0)
  );
}