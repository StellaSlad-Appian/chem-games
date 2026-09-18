// src/components/games/reaction-balancer/Notebook.tsx
'use client';

import MoleculeText from '@/components/ui/MoleculeText';
import { useBalancerMessages } from '@/i18n/game-messages/reaction-balancer';
import type { RoundResult } from '@/hooks/useReactionBalancer';


interface NotebookProps {
  results: RoundResult[];
  onBack: () => void;
  onPlayAgain?: () => void;
}

/**
 * The lab notebook: every locked equation with the hint tier used, so a
 * student can copy it into revision notes and a teacher can see at a glance
 * where help was needed.
 */
export default function BalancerNotebook({ results, onBack, onPlayAgain }: NotebookProps) {
  const M = useBalancerMessages();
  return (
    <section
      aria-labelledby="balancer-notebook-title"
      data-testid="balancer-notebook"
      className="w-full rounded-2xl border-2 border-(--border) bg-(--surface) p-4 shadow-xl md:p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="balancer-notebook-title" className="text-3xl font-black text-(--foreground)">
          {M.notebook.header}
        </h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onBack}
            className="cursor-pointer rounded-xl border-2 border-(--border) bg-(--background) px-4 py-2 text-xs font-black uppercase tracking-wider text-(--foreground) transition hover:border-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
          >
            {M.ui.closeNotebook}
          </button>
          {onPlayAgain && (
            <button
              type="button"
              onClick={onPlayAgain}
              className="cursor-pointer rounded-xl bg-blue-500 px-4 py-2 text-xs font-black uppercase tracking-wider text-white shadow-md transition hover:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
            >
              {M.ui.playAgain}
            </button>
          )}
        </div>
      </div>

      {results.length === 0 ? (
        <p className="mt-4 text-sm font-medium text-(--muted)">{M.notebook.empty}</p>
      ) : (
        <ol className="mt-4 space-y-2">
          {results.map((result, index) => (
            <li key={`${result.reactionId}-${index}`} className="rounded-xl border border-(--border) bg-(--background) p-3" data-testid="notebook-entry">
              <p className="text-xs font-bold text-(--muted)">
                {index + 1}. {result.name}
                {result.mode === 'challenge' && <span className="ml-2 rounded-full border border-(--border) px-2 py-0.5">{M.notebook.challenge}</span>}
              </p>
              <p className="mt-1 text-lg font-black text-(--foreground)">
                <MoleculeText formula={result.equation} />
              </p>
              <dl className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs">
                <div className="flex gap-1">
                  <dt className="font-bold text-(--muted)">{M.notebook.columns.hint}:</dt>
                  <dd className="font-bold text-(--foreground)">{result.hintTier === 0 ? M.notebook.noHint : M.notebook.hintTier(result.hintTier)}</dd>
                </div>
                <div className="flex gap-1">
                  <dt className="font-bold text-(--muted)">{M.notebook.columns.points}:</dt>
                  <dd className="font-bold text-(--foreground)">{result.points}</dd>
                </div>
                <div>
                  <dd className="font-bold text-(--foreground)">{result.lowestTermsFirst ? M.notebook.lowestTerms : M.notebook.simplified(result.divisor)}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
