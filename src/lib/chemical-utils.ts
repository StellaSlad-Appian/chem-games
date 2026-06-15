// src/lib/chemical-utils.ts
import { CompoundData, ChemicalClassification } from '@/src/core-engine/types/chemistry';

/**
 * Evaluates the classification of a chemical based on its 
 * dissociation constants.
 */
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