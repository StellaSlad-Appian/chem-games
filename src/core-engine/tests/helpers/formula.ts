// Test-only formula helpers. Unlike parseFormulaAtoms() in chemical-utils,
// this parser expands parenthesised groups (Ba(OH)2, Cu(NO3)2) so the data
// integrity specs can verify every registry entry and reaction answer key.

export function parseFormulaWithGroups(formula: string): Record<string, number> {
  const clean = formula.replace(/\((s|l|g|aq)\)/g, '');
  let i = 0;

  const readNumber = (): number => {
    const m = clean.slice(i).match(/^\d+/);
    if (!m) return 1;
    i += m[0].length;
    return parseInt(m[0], 10);
  };

  const parseGroup = (): Record<string, number> => {
    const counts: Record<string, number> = {};
    while (i < clean.length) {
      const ch = clean[i];
      if (ch === '(') {
        i += 1;
        const inner = parseGroup();
        const multiplier = readNumber();
        for (const [symbol, count] of Object.entries(inner)) {
          counts[symbol] = (counts[symbol] ?? 0) + count * multiplier;
        }
      } else if (ch === ')') {
        i += 1;
        return counts;
      } else {
        const m = clean.slice(i).match(/^[A-Z][a-z]?/);
        if (!m) throw new Error(`Unexpected character "${ch}" in formula "${formula}"`);
        i += m[0].length;
        counts[m[0]] = (counts[m[0]] ?? 0) + readNumber();
      }
    }
    return counts;
  };

  return parseGroup();
}

export interface EquationTerm {
  coefficient: number;
  formula: string;
}

/** Splits one side of "2H2 + O2 -> 2H2O" into coefficient/formula pairs. */
export function parseEquationSide(side: string): EquationTerm[] {
  return side
    .split('+')
    .map((term) => term.trim())
    .filter(Boolean)
    .map((term) => {
      const m = term.match(/^(\d*)(.+)$/);
      if (!m) throw new Error(`Cannot parse equation term "${term}"`);
      return { coefficient: m[1] ? parseInt(m[1], 10) : 1, formula: m[2] };
    });
}

/** Total atoms per element for one side of an equation. */
export function tallySide(terms: EquationTerm[]): Record<string, number> {
  const totals: Record<string, number> = {};
  for (const { coefficient, formula } of terms) {
    for (const [symbol, count] of Object.entries(parseFormulaWithGroups(formula))) {
      totals[symbol] = (totals[symbol] ?? 0) + count * coefficient;
    }
  }
  return totals;
}

// Compounds whose ionic breakdown is known to disagree with their formula
// (all protons listed as H+ AND a still-protonated anion). Excluded here so
// the check keeps guarding every other compound; the bug itself is pinned in
// src/core-engine/tests/known-issues.test.ts.
export const KNOWN_INCONSISTENT_IONIC_FORMULAS = new Set(['H2CO3', 'H3PO4', 'H2SO3']);

export function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}
