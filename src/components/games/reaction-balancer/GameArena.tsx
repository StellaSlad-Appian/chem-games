'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { reactions } from '@/core-engine/data/reactions';
import { useSound } from '@/hooks/useSound';
import CoefficientInput from './CoefficientInput';
import AtomInventory from './AtomInventory';

interface ReactionBalancerArenaProps {
  level: number;
  onReactionComplete: (points: number) => void;
  isPaused: boolean;
}

// Utility to parse strings like "H2O" into { H: 2, O: 1 }
function parseFormulaAtoms(formula: string): Record<string, number> {
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

export default function ReactionBalancerArena({
  level,
  onReactionComplete,
  isPaused,
}: ReactionBalancerArenaProps) {
  const { playSound } = useSound();
  
  const currentReactionData = useMemo(() => {
    return reactions[(level - 1) % reactions.length];
  }, [level]);

  const parsedReaction = useMemo(() => {
    const parseCompound = (raw: string) => {
      const match = raw.trim().match(/^(\d*)(.*)$/);
      const coeffStr = match?.[1];
      const compoundId = match?.[2] || raw.trim();
      return {
        compoundId,
        targetCoefficient: coeffStr ? parseInt(coeffStr, 10) : 1,
      };
    };

    const [reactantsStr, productsStr] = currentReactionData.equation.split('->');
    
    return {
      reactants: reactantsStr.split('+').map(parseCompound),
      products: productsStr.split('+').map(parseCompound),
    };
  }, [currentReactionData.equation]);

  const [reactantCoeffs, setReactantCoeffs] = useState<(number | '')[]>([]);
  const [productCoeffs, setProductCoeffs] = useState<(number | '')[]>([]);

  useEffect(() => {
    setReactantCoeffs(parsedReaction.reactants.map(() => ''));
    setProductCoeffs(parsedReaction.products.map(() => ''));
  }, [parsedReaction]);

  const updateReactant = (index: number, val: number | '') => {
    if (isPaused) return;
    playSound('click');
    setReactantCoeffs((prev) => {
      const next = [...prev];
      next[index] = val;
      return next;
    });
  };

  const updateProduct = (index: number, val: number | '') => {
    if (isPaused) return;
    playSound('click');
    setProductCoeffs((prev) => {
      const next = [...prev];
      next[index] = val;
      return next;
    });
  };

  // Compute if the equation is currently balanced to dynamically update button style
  const isCurrentlyBalanced = useMemo(() => {
    const left: Record<string, number> = {};
    const right: Record<string, number> = {};

    parsedReaction.reactants.forEach((r, i) => {
      const coeff = typeof reactantCoeffs[i] === 'number' ? (reactantCoeffs[i] as number) : 1;
      const atoms = parseFormulaAtoms(r.compoundId);
      Object.entries(atoms).forEach(([elem, count]) => {
        left[elem] = (left[elem] || 0) + (count * coeff);
      });
    });

    parsedReaction.products.forEach((p, i) => {
      const coeff = typeof productCoeffs[i] === 'number' ? (productCoeffs[i] as number) : 1;
      const atoms = parseFormulaAtoms(p.compoundId);
      Object.entries(atoms).forEach(([elem, count]) => {
        right[elem] = (right[elem] || 0) + (count * coeff);
      });
    });

    const allElements = Array.from(new Set([...Object.keys(left), ...Object.keys(right)]));
    if (allElements.length === 0) return false;

    return allElements.every(elem => left[elem] === right[elem]);
  }, [parsedReaction, reactantCoeffs, productCoeffs]);

  const checkBalance = useCallback(() => {
    const reactantsCorrect = reactantCoeffs.every(
      (val, idx) => (val === '' ? 1 : val) === parsedReaction.reactants[idx].targetCoefficient
    );
    const productsCorrect = productCoeffs.every(
      (val, idx) => (val === '' ? 1 : val) === parsedReaction.products[idx].targetCoefficient
    );

    if (reactantsCorrect && productsCorrect) {
      playSound('equation-balanced');
      onReactionComplete(150);
    } else {
      playSound('equation-error');
    }
  }, [reactantCoeffs, productCoeffs, parsedReaction, playSound, onReactionComplete]);

  return (
    <div className="flex min-h-[350px] flex-1 flex-col items-center justify-center rounded-2xl border-2 border-[var(--border)] bg-[var(--surface)] p-4 sm:p-6 shadow-xl">
      
      <div className="mb-2 text-center">
        <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-500">
          {currentReactionData.type}
        </span>
      </div>
      
      <h2 className="mb-2 text-xl font-bold text-[var(--foreground)]">{currentReactionData.name}</h2>
      <p className="mb-8 text-center text-sm text-[var(--muted)]">{currentReactionData.description}</p>

      {/* Interactive Chemical Equation Row */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 w-full text-2xl font-black">
        
        {/* Reactants */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
          {parsedReaction.reactants.map((r, i) => (
            <div key={`r-${r.compoundId}-${i}`} className="flex items-center gap-2 sm:gap-4">
              {i > 0 && <span className="text-3xl text-[var(--muted)]">+</span>}
              <CoefficientInput 
                formula={r.compoundId} 
                value={reactantCoeffs[i] ?? ''} 
                onChange={(val) => updateReactant(i, val)}
                disabled={isPaused}
              />
            </div>
          ))}
        </div>

        <span className="mx-2 text-3xl font-extrabold text-blue-500 md:rotate-0 rotate-90 my-2 md:my-0">➔</span>

        {/* Products */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
          {parsedReaction.products.map((p, i) => (
            <div key={`p-${p.compoundId}-${i}`} className="flex items-center gap-2 sm:gap-4">
              {i > 0 && <span className="text-3xl text-[var(--muted)]">+</span>}
              <CoefficientInput 
                formula={p.compoundId} 
                value={productCoeffs[i] ?? ''} 
                onChange={(val) => updateProduct(i, val)}
                disabled={isPaused}
              />
            </div>
          ))}
        </div>
      </div>

      <AtomInventory 
        reactants={parsedReaction.reactants}
        products={parsedReaction.products}
        reactantCoeffs={reactantCoeffs}
        productCoeffs={productCoeffs}
      />

      <button
        type="button"
        onClick={checkBalance}
        disabled={isPaused}
        className={`mt-8 rounded-xl px-8 py-3 font-mono text-lg font-bold text-white shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 ${
          isCurrentlyBalanced 
            ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20 animate-pulse' 
            : 'bg-blue-600 hover:bg-blue-500'
        }`}
      >
        Check Balance
      </button>
    </div>
  );
}