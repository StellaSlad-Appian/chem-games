'use client';

import { useMemo } from 'react';

interface ParsedCompound {
  compoundId: string;
}

interface AtomInventoryProps {
  reactants: ParsedCompound[];
  products: ParsedCompound[];
  reactantCoeffs: (number | '')[];
  productCoeffs: (number | '')[];
}

// Utility to parse strings like "H2O" into { H: 2, O: 1 }
function parseFormulaAtoms(formula: string): Record<string, number> {
  // Strip state symbols (s, l, g, aq) so they aren't counted as atoms
  const cleanFormula = formula.replace(/\([a-z]{1,2}\)/g, '');
  const regex = /([A-Z][a-z]*)(\d*)/g;
  let match;
  const counts: Record<string, number> = {};
  
  while ((match = regex.exec(cleanFormula)) !== null) {
    const elem = match[1];
    const qty = match[2] ? parseInt(match[2], 10) : 1;
    counts[elem] = (counts[elem] || 0) + qty;
  }
  return counts;
}

export default function AtomInventory({ reactants, products, reactantCoeffs, productCoeffs }: AtomInventoryProps) {
  const { leftAtoms, rightAtoms, allElements } = useMemo(() => {
    const left: Record<string, number> = {};
    const right: Record<string, number> = {};

    reactants.forEach((r, i) => {
      const coeff = typeof reactantCoeffs[i] === 'number' ? (reactantCoeffs[i] as number) : 1;
      const atoms = parseFormulaAtoms(r.compoundId);
      Object.entries(atoms).forEach(([elem, count]) => {
        left[elem] = (left[elem] || 0) + (count * coeff);
      });
    });

    products.forEach((p, i) => {
      const coeff = typeof productCoeffs[i] === 'number' ? (productCoeffs[i] as number) : 1;
      const atoms = parseFormulaAtoms(p.compoundId);
      Object.entries(atoms).forEach(([elem, count]) => {
        right[elem] = (right[elem] || 0) + (count * coeff);
      });
    });

    const elements = Array.from(new Set([...Object.keys(left), ...Object.keys(right)])).sort();
    return { leftAtoms: left, rightAtoms: right, allElements: elements };
  }, [reactants, products, reactantCoeffs, productCoeffs]);

  return (
    <div className="w-full max-w-lg mt-6 rounded-2xl border-2 border-[var(--border)] bg-slate-900/50 p-4 sm:p-6 backdrop-blur-md">
      <h3 className="mb-3 text-center text-[10px] sm:text-xs font-black uppercase tracking-widest text-[var(--muted)]">
        Atom Inventory
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
        {allElements.map(atom => {
          const leftCount = leftAtoms[atom] || 0;
          const rightCount = rightAtoms[atom] || 0;
          const isBalanced = leftCount === rightCount;

          return (
            <div key={atom} className="flex items-center justify-between rounded-xl bg-slate-950/50 px-4 py-2 border border-[var(--border)]">
              <span className={`text-lg font-black w-6 text-center ${isBalanced ? 'text-emerald-400' : 'text-amber-400'}`}>
                {leftCount}
              </span>
              <span className="text-lg font-black text-white px-4 border-x border-[var(--border)]">
                {atom}
              </span>
              <span className={`text-lg font-black w-6 text-center ${isBalanced ? 'text-emerald-400' : 'text-amber-400'}`}>
                {rightCount}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}