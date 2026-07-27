// src/lib/chemical-utils.ts
import { CompoundData, ChemicalClassification } from '@/core-engine/types/chemistry';

/**
 * Evaluates the classification of a chemical based on its dissociation constants.
 * Compounds lacking explicit pKa/pKb metrics default correctly to neutral salts.
 * **/

export function evaluateChemical(chemical: CompoundData): ChemicalClassification {
  const hasAcidProps = chemical.pKa !== undefined && chemical.pKa <= 14;
  const hasBaseProps = chemical.pKb !== undefined && chemical.pKb <= 14;

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