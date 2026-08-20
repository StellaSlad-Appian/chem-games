'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import MoleculeText from '@/components/ui/MoleculeText';
import { reactions } from '@/core-engine/data/reactions';
import { useSound } from '@/hooks/useSound';

interface ReactionBalancerArenaProps {
  level: number;
  onReactionComplete: (points: number) => void;
  isPaused: boolean;
}

export default function ReactionBalancerArena({
  level,
  onReactionComplete,
  isPaused,
}: ReactionBalancerArenaProps) {
  const { playSound } = useSound();
  
  // 1. Fetch the correct reaction data based on the current level
  const currentReactionData = useMemo(() => {
    return reactions[(level - 1) % reactions.length];
  }, [level]);

  // 2. Parse the equation string (e.g., "2H2 + O2 -> 2H2O") into UI state objects
  const parsedReaction = useMemo(() => {
    const parseCompound = (raw: string) => {
      // Regex captures leading numbers (coefficient) and the rest (molecule formula)
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

  // 3. Track the user's current coefficient inputs
  const [reactantCoeffs, setReactantCoeffs] = useState<number[]>([]);
  const [productCoeffs, setProductCoeffs] = useState<number[]>([]);

  // 4. Reset all inputs to '1' when the level changes
  useEffect(() => {
    setReactantCoeffs(parsedReaction.reactants.map(() => 1));
    setProductCoeffs(parsedReaction.products.map(() => 1));
  }, [parsedReaction]);

  const updateReactant = (index: number, delta: number) => {
    if (isPaused) return;
    playSound('click');
    setReactantCoeffs((prev) => {
      const next = [...prev];
      next[index] = Math.max(1, next[index] + delta);
      return next;
    });
  };

  const updateProduct = (index: number, delta: number) => {
    if (isPaused) return;
    playSound('click');
    setProductCoeffs((prev) => {
      const next = [...prev];
      next[index] = Math.max(1, next[index] + delta);
      return next;
    });
  };

  const checkBalance = useCallback(() => {
    const reactantsCorrect = reactantCoeffs.every(
      (val, idx) => val === parsedReaction.reactants[idx].targetCoefficient
    );
    const productsCorrect = productCoeffs.every(
      (val, idx) => val === parsedReaction.products[idx].targetCoefficient
    );

    if (reactantsCorrect && productsCorrect) {
      playSound('equation-balanced');
      onReactionComplete(150);
    } else {
      playSound('equation-error');
    }
  }, [reactantCoeffs, productCoeffs, parsedReaction, playSound, onReactionComplete]);

  return (
    <div className="flex min-h-[350px] flex-1 flex-col items-center justify-center rounded-2xl border-2 border-[var(--border)] bg-[var(--surface)] p-6 shadow-xl">
      
      {/* Category Badge */}
      <div className="mb-2 text-center">
        <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-500">
          {currentReactionData.type}
        </span>
      </div>
      
      <h2 className="mb-2 text-xl font-bold text-[var(--foreground)]">{currentReactionData.name}</h2>
      <p className="mb-8 text-center text-sm text-[var(--muted)]">{currentReactionData.description}</p>

      {/* Interactive Chemical Equation Row */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-2xl font-black">
        {/* Reactants */}
        {parsedReaction.reactants.map((r, i) => (
          <div key={`r-${r.compoundId}-${i}`} className="flex items-center gap-2">
            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => updateReactant(i, 1)}
                className="rounded bg-slate-700 px-2 py-0.5 text-xs text-white hover:bg-slate-600"
              >
                ▲
              </button>
              <span className="my-1 font-mono text-3xl text-amber-400">{reactantCoeffs[i]}</span>
              <button
                type="button"
                onClick={() => updateReactant(i, -1)}
                className="rounded bg-slate-700 px-2 py-0.5 text-xs text-white hover:bg-slate-600"
              >
                ▼
              </button>
            </div>
            <MoleculeText formula={r.compoundId} className="text-2xl text-[var(--foreground)]" />
            {i < parsedReaction.reactants.length - 1 && <span className="text-[var(--muted)]">+</span>}
          </div>
        ))}

        <span className="mx-2 text-3xl font-extrabold text-blue-500">➔</span>

        {/* Products */}
        {parsedReaction.products.map((p, i) => (
          <div key={`p-${p.compoundId}-${i}`} className="flex items-center gap-2">
            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => updateProduct(i, 1)}
                className="rounded bg-slate-700 px-2 py-0.5 text-xs text-white hover:bg-slate-600"
              >
                ▲
              </button>
              <span className="my-1 font-mono text-3xl text-amber-400">{productCoeffs[i]}</span>
              <button
                type="button"
                onClick={() => updateProduct(i, -1)}
                className="rounded bg-slate-700 px-2 py-0.5 text-xs text-white hover:bg-slate-600"
              >
                ▼
              </button>
            </div>
            <MoleculeText formula={p.compoundId} className="text-2xl text-[var(--foreground)]" />
            {i < parsedReaction.products.length - 1 && <span className="text-[var(--muted)]">+</span>}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={checkBalance}
        disabled={isPaused}
        className="mt-10 rounded-xl bg-blue-600 px-8 py-3 font-mono text-lg font-bold text-white shadow-lg transition-transform active:scale-95 hover:bg-blue-500"
      >
        Check Balance
      </button>
    </div>
  );
}