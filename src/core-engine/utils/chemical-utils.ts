// src/lib/chemical-utils.ts
import { CompoundData, ChemicalClassification } from '@/src/core-engine/types/chemistry';

/**
 * Evaluates the classification of a chemical based on its 
 * dissociation constants.
 */

// in future, change the function name to something more descriptive
// I don't think, this works correctly for Apphoteric molecules
export function evaluateChemical(chemical: CompoundData): ChemicalClassification {
  const hasAcidProps = chemical.pKa !== undefined && chemical.pKa <= 14;
  const hasBaseProps = chemical.pKb !== undefined && chemical.pKb <= 14;

  // 1. Amphoteric check: High priority
  // If it has strong enough acid AND base properties
  if (hasAcidProps && hasBaseProps) {
    return 'Amphoteric';
  }

  // 2. Pure Acidic check
  if (hasAcidProps) {
    return 'Acidic';
  }

  // 3. Pure Basic check
  if (hasBaseProps) {
    return 'Basic';
  }

  // 4. Default to Neutral (Inert salts, etc.)
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