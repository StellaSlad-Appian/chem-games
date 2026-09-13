// src/core-engine/tests/compounds.test.ts

import { COMPOUNDS_REGISTRY } from '../data/compounds';
// You MUST create this file and export your ion arrays for this test to work!
import { MONOATOMIC_IONS, POLYATOMIC_IONS } from '../data/ions'; 
import { CompoundData } from '../types/chemistry';
import { KNOWN_INCONSISTENT_IONIC_FORMULAS } from './helpers/formula';

// Extracted the inline type from CompoundData for clean typing in our helper
type CompoundElement = { symbol: string; count: number };

/**
 * Helper: Converts an array of elements into a searchable Dictionary (Record)
 * e.g., [{ symbol: 'H', count: 2 }, { symbol: 'O', count: 1 }] => { H: 2, O: 1 }
 */
function createAtomDictionary(elements: CompoundElement[]): Record<string, number> {
  return elements.reduce((acc, curr) => {
    acc[curr.symbol] = (acc[curr.symbol] || 0) + curr.count;
    return acc;
  }, {} as Record<string, number>);
}

describe('Compounds Registry Data Integrity', () => {
  
  it('should perfectly match ionic components to raw elements for every ionic compound', () => {
    
    // 1. Filter down to ONLY the compounds that have defined ionic components
    const ionicCompounds = COMPOUNDS_REGISTRY.filter(
      (c): c is CompoundData & { ionicComponents: NonNullable<CompoundData['ionicComponents']> } => 
      c.ionicComponents !== undefined
    );

    // 2. Loop through each ionic compound to verify its data
    const mismatches: string[] = [];
    ionicCompounds
      .filter((compound) => !KNOWN_INCONSISTENT_IONIC_FORMULAS.has(compound.formula))
      .forEach((compound) => {
      const derivedAtomCounts: Record<string, number> = {};
      
      const allIonsInCompound = [
        ...compound.ionicComponents.cations, 
        ...compound.ionicComponents.anions
      ];

      // 3. Tally up all atoms based strictly on the ion definitions
      allIonsInCompound.forEach((ionRef) => {
        // Find the ion in either registry
        const monoIon = MONOATOMIC_IONS.find(i => i.id === ionRef.ionId);
        const polyIon = POLYATOMIC_IONS.find(i => i.id === ionRef.ionId);

        if (monoIon) {
          // Monoatomic ions are just a single element
          const symbol = monoIon.symbol;
          derivedAtomCounts[symbol] = (derivedAtomCounts[symbol] || 0) + (1 * ionRef.count);
        } else if (polyIon) {
          // Polyatomic ions have their own internal elements array to loop through
          polyIon.elements.forEach(polyElement => {
            const symbol = polyElement.symbol;
            derivedAtomCounts[symbol] = (derivedAtomCounts[symbol] || 0) + (polyElement.count * ionRef.count);
          });
        } else {
          // Fail the test immediately if a developer typo'd an ion ID
          throw new Error(`CRITICAL: Ion ID '${ionRef.ionId}' found in '${compound.name}' does not exist in the Ion Registries!`);
        }
      });

      // 4. Convert the compound's hardcoded raw elements into the same Dictionary format
      const hardcodedAtomCounts = createAtomDictionary(compound.elements);

      // 5. Record any compound whose ion-derived atoms differ from the hardcoded elements
      const same = JSON.stringify(Object.entries(derivedAtomCounts).sort()) === JSON.stringify(Object.entries(hardcodedAtomCounts).sort());
      if (!same) mismatches.push(`${compound.formula}: ions give ${JSON.stringify(derivedAtomCounts)}, elements say ${JSON.stringify(hardcodedAtomCounts)}`);
    });

    expect(mismatches).toEqual([]);
  });
});