'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { reactions } from '@/core-engine/data/reactions';
import { useSound } from '@/hooks/useSound';

import ReactionMoleculeCard from './ReactionMoleculeCard';
import AtomInventory from './AtomInventory';
import { useI18n } from '@/i18n/client';

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
  const { t } = useI18n();
  const { playSound } = useSound();

  /*
   * ---------------------------------------------------------
   * Reaction selection
   * ---------------------------------------------------------
   *
   * Keep the current level-selection behaviour for now.
   */
  const currentReactionData = useMemo(() => {
    return reactions[
      (level - 1) % reactions.length
    ];
  }, [level]);

  /*
   * ---------------------------------------------------------
   * Parse equation
   * ---------------------------------------------------------
   */

  const parsedReaction = useMemo(() => {
    const parseCompound = (raw: string) => {
      const match = raw
        .trim()
        .match(/^(\d*)(.*)$/);

      const coefficientString =
        match?.[1] ?? '';

      const compoundId =
        match?.[2]?.trim() ||
        raw.trim();

      return {
        compoundId,
        targetCoefficient:
          coefficientString !== ''
            ? parseInt(
                coefficientString,
                10
              )
            : 1,
      };
    };

    const [
      reactantsString,
      productsString,
    ] =
      currentReactionData.equation.split(
        '->'
      );

    return {
      reactants: reactantsString
        .split('+')
        .map(parseCompound),

      products: productsString
        .split('+')
        .map(parseCompound),
    };
  }, [currentReactionData.equation]);

  /*
   * ---------------------------------------------------------
   * Coefficient state
   * ---------------------------------------------------------
   */

  const [reactantCoeffs, setReactantCoeffs] =
    useState<(number | '')[]>([]);

  const [productCoeffs, setProductCoeffs] =
    useState<(number | '')[]>([]);

  /*
   * Controls whether the Atom Balance scaffold
   * is visible.
   */
  const [showBalance, setShowBalance] =
    useState(false);

  useEffect(() => {
    setReactantCoeffs(
      parsedReaction.reactants.map(() => '')
    );

    setProductCoeffs(
      parsedReaction.products.map(() => '')
    );

    // Every new reaction starts with the
    // balance scaffold hidden.
    setShowBalance(false);
  }, [parsedReaction]);

  /*
   * ---------------------------------------------------------
   * Input handlers
   * ---------------------------------------------------------
   */

  const updateReactant = useCallback(
    (index: number, value: number | '') => {
      if (isPaused) {
        return;
      }

      playSound('click');

      setReactantCoeffs((previous) => {
        const next = [...previous];
        next[index] = value;
        return next;
      });
    },
    [isPaused, playSound]
  );

  const updateProduct = useCallback(
    (index: number, value: number | '') => {
      if (isPaused) {
        return;
      }

      playSound('click');

      setProductCoeffs((previous) => {
        const next = [...previous];
        next[index] = value;
        return next;
      });
    },
    [isPaused, playSound]
  );

  /*
   * ---------------------------------------------------------
   * Answer validation
   * ---------------------------------------------------------
   */

  const checkBalance = useCallback(() => {
    const reactantsCorrect =
      reactantCoeffs.every(
        (value, index) =>
          (value === ''
            ? 1
            : value) ===
          parsedReaction.reactants[index]
            .targetCoefficient
      );

    const productsCorrect =
      productCoeffs.every(
        (value, index) =>
          (value === ''
            ? 1
            : value) ===
          parsedReaction.products[index]
            .targetCoefficient
      );

    if (
      reactantsCorrect &&
      productsCorrect
    ) {
      playSound('equation-balanced');
      onReactionComplete(150);
      return;
    }

    playSound('equation-error');
  }, [
    reactantCoeffs,
    productCoeffs,
    parsedReaction,
    playSound,
    onReactionComplete,
  ]);

  /*
   * ---------------------------------------------------------
   * Render
   * ---------------------------------------------------------
   */

  return (
    <div className="flex min-h-[350px] flex-1 flex-col items-center rounded-2xl border-2 border-[var(--border)] bg-[var(--surface)] p-4 shadow-xl sm:p-6">

      {/* Header */}
      <div className="mb-4 text-center">
        <span className="rounded-full bg-blue-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-blue-400">
          {currentReactionData.type}
        </span>

        <h2 className="mt-3 text-2xl font-black text-[var(--foreground)] sm:text-3xl">
          {currentReactionData.name}
        </h2>

        <p className="mx-auto mt-1 max-w-xl text-sm leading-relaxed text-[var(--muted)]">
          {currentReactionData.description}
        </p>
      </div>

      {/* Compact instruction */}
      <p className="mb-6 text-center text-sm font-bold text-blue-300">
        {t.games.reactionBalancer.prompt}
      </p>

      {/* Reaction */}
      <div className="w-full max-w-5xl">
        <div className="relative grid grid-cols-1 items-start gap-6 md:grid-cols-2 md:gap-12">

          {/* Reactants */}
          <section className="min-w-0">
            <div className="mb-3 text-center">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--muted)]">
                {t.games.reactionBalancer.reactants}
              </span>
            </div>

            <div className="flex min-h-[220px] flex-wrap items-center justify-center gap-2">
              {parsedReaction.reactants.map(
                (reactant, index) => (
                  <div
                    key={`reactant-${reactant.compoundId}-${index}`}
                    className="flex items-center gap-2"
                  >
                    {index > 0 && (
                      <span
                        className="text-2xl font-black text-[var(--muted)]"
                        aria-hidden="true"
                      >
                        +
                      </span>
                    )}

                    <ReactionMoleculeCard
                      formula={
                        reactant.compoundId
                      }
                      coefficient={
                        reactantCoeffs[index] ??
                        ''
                      }
                      onChange={(value) =>
                        updateReactant(
                          index,
                          value
                        )
                      }
                      disabled={isPaused}
                    />
                  </div>
                )
              )}
            </div>
          </section>

          {/* Products */}
          <section className="min-w-0">
            <div className="mb-3 text-center">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--muted)]">
                {t.games.reactionBalancer.products}
              </span>
            </div>

            <div className="flex min-h-[220px] flex-wrap items-center justify-center gap-2">
              {parsedReaction.products.map(
                (product, index) => (
                  <div
                    key={`product-${product.compoundId}-${index}`}
                    className="flex items-center gap-2"
                  >
                    {index > 0 && (
                      <span
                        className="text-2xl font-black text-[var(--muted)]"
                        aria-hidden="true"
                      >
                        +
                      </span>
                    )}

                    <ReactionMoleculeCard
                      formula={
                        product.compoundId
                      }
                      coefficient={
                        productCoeffs[index] ??
                        ''
                      }
                      onChange={(value) =>
                        updateProduct(
                          index,
                          value
                        )
                      }
                      disabled={isPaused}
                    />
                  </div>
                )
              )}
            </div>
          </section>

          {/* Reaction arrow */}
          <div
            className="
              pointer-events-none
              flex items-center justify-center
              md:absolute
              md:left-1/2
              md:top-[calc(50%+12px)]
              md:-translate-x-1/2
              md:-translate-y-1/2
            "
            aria-hidden="true"
          >
            <span className="text-4xl font-light text-blue-400">
              →
            </span>
          </div>
        </div>
      </div>

      {/* Optional atom-balance scaffold */}
      {showBalance && (
        <AtomInventory
          reactants={parsedReaction.reactants}
          products={parsedReaction.products}
          reactantCoeffs={reactantCoeffs}
          productCoeffs={productCoeffs}
        />
      )}

      {/* Controls */}
      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() =>
            setShowBalance(
              (visible) => !visible
            )
          }
          disabled={isPaused}
          className="rounded-xl border border-slate-600 bg-slate-900 px-5 py-3 text-sm font-bold text-slate-200 shadow-lg transition-all hover:border-slate-500 hover:bg-slate-800 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {showBalance
            ? t.games.reactionBalancer.hideAtomBalance
            : t.games.reactionBalancer.showAtomBalance}
        </button>

        <button
          type="button"
          onClick={checkBalance}
          disabled={isPaused}
          className="rounded-xl bg-blue-600 px-8 py-3 font-mono text-lg font-bold text-white shadow-lg shadow-blue-500/10 transition-all hover:bg-blue-500 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {t.games.reactionBalancer.checkAnswer}
        </button>
      </div>

      <p className="mt-3 text-center text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">
        {t.games.reactionBalancer.editableHint}
      </p>
    </div>
  );
}