// src/components/ui/formula-parser.ts
//
// MoleculeText's parser, in a module of its own so that ChemText
// (src/lib/chem-text.ts) can run prose through exactly the same rules the
// renderer uses: a token ChemText calls a formula is one this parser reads
// without falling back to plain characters.

import type { FormulaToken } from '@/core-engine/types/chemistry';

/**
 * Deterministically parses a chemical equation/formula string into typed tokens.
 */
export function parseFormula(input: string): FormulaToken[] {
  if (!input) return [];

  const tokens: FormulaToken[] = [];
  const terms = input.trim().split(/\s+/);

  terms.forEach((term, index) => {
    if (index > 0) {
      tokens.push({ type: 'text', value: ' ' });
    }

    // Reaction arrows & addition operators
    if (term === '+' || term === '->' || term === '→') {
      tokens.push({
        type: 'operator',
        value: term === '->' ? '→' : term,
      });
      return;
    }

    let i = 0;

    // 1. Extract Leading Stoichiometric Coefficient (e.g., '2' in '2H2O')
    const coeffMatch = term.match(/^(\d+)(?=[A-Za-z\(])/);
    if (coeffMatch) {
      tokens.push({ type: 'coefficient', value: coeffMatch[1] });
      i += coeffMatch[1].length;
    }

    // 2. Parse chemical symbols, states, ionic charges, and subscripts
    while (i < term.length) {
      // Physical state indicators: (s), (l), (g), (aq)
      const stateMatch = term.slice(i).match(/^\((s|l|g|aq)\)/);
      if (stateMatch) {
        tokens.push({ type: 'state', value: stateMatch[0] });
        i += stateMatch[0].length;
        continue;
      }

      // Ionic Charges: e.g., 2+, +, -, 2− (the typographic minus, U+2212,
      // which is what the cheat-sheet prose writes)
      const chargeMatch = term.slice(i).match(/^(\d*[+\-\u2212])/);
      if (
        chargeMatch &&
        (i + chargeMatch[0].length === term.length ||
          term[i + chargeMatch[0].length] === '(')
      ) {
        tokens.push({ type: 'superscript', value: chargeMatch[0] });
        i += chargeMatch[0].length;
        continue;
      }

      // Atomic Symbols or Brackets: e.g., H, O, Fe, (, )
      const symbolMatch = term.slice(i).match(/^([A-Z][a-z]?|\(|\))/);
      if (symbolMatch) {
        tokens.push({ type: 'symbol', value: symbolMatch[0] });
        i += symbolMatch[0].length;

        // A monatomic ion written as "Ca2+" or "O2-" is one symbol followed by
        // its charge, so the digits are the charge, not a subscript. Polyatomic
        // ions keep their subscripts (NH4+); put a space before a charge that
        // has digits (SO4 2-) so it is not read as a count.
        const symbolStart = i - symbolMatch[0].length;
        const afterCoefficient = coeffMatch ? coeffMatch[1].length : 0;
        if (symbolStart === afterCoefficient && /^\d*[+\-\u2212]$/.test(term.slice(i))) {
          continue;
        }

        // Subscripts following element or bracket: e.g., H2, (SO4)3
        const subMatch = term.slice(i).match(/^(\d+)/);
        if (subMatch) {
          tokens.push({ type: 'subscript', value: subMatch[1] });
          i += subMatch[1].length;
        }
        continue;
      }

      // Fallback safety
      tokens.push({ type: 'text', value: term[i] });
      i++;
    }
  });

  return tokens;
}
