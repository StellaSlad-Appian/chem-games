// src/components/games/lewis-structures/Notebook.tsx
'use client';

import AtomCanvas from '@/components/games/shared/AtomCanvas';
import MoleculeText from '@/components/ui/MoleculeText';
import { LEWIS_MESSAGES } from '@/core-engine/config/games/lewis-structures-messages';
import type { RoundResult } from '@/hooks/useLewisStructures';
import { CANVAS_LABELS } from './GameArena';

const M = LEWIS_MESSAGES;

interface NotebookProps {
  results: RoundResult[];
  /** Level 5 ends with a marking sheet; earlier summaries are "Your structures". */
  marking?: boolean;
  onBack: () => void;
  onPlayAgain?: () => void;
}

/**
 * The end summary: every molecule with its dot structure, bond-line, counts
 * and the hint tier used — something a student can copy into revision notes
 * and a teacher can read at a glance.
 */
export default function LewisNotebook({ results, marking = false, onBack, onPlayAgain }: NotebookProps) {
  return (
    <section
      aria-labelledby="lewis-notebook-title"
      data-testid="lewis-notebook"
      className="w-full rounded-2xl border-2 border-(--border) bg-(--surface) p-4 shadow-xl md:p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="lewis-notebook-title" className="text-3xl font-black text-(--foreground)">
          {marking ? M.notebook.markingHeader : M.notebook.header}
        </h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onBack}
            className="cursor-pointer rounded-xl border-2 border-(--border) bg-(--background) px-4 py-2 text-xs font-black uppercase tracking-wider text-(--foreground) transition hover:border-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
          >
            {M.ui.closeMarkingSheet}
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
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((result, index) => (
            <li
              key={`${result.moleculeId}-${index}`}
              className="rounded-xl border border-(--border) bg-(--background) p-3"
              data-testid="notebook-entry"
            >
              <p className="text-lg font-black text-(--foreground)">
                <MoleculeText formula={result.formula} />
                <span className="ml-2 text-xs font-bold text-(--muted)">{result.name}</span>
              </p>
              <AtomCanvas
                structure={result.structure}
                mode="readonly"
                compact
                label={M.ui.canvasLabel(result.name)}
                labels={CANVAS_LABELS}
                showCounters="hover"
                pulseLoners={false}
              />
              <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-xs">
                <dt className="font-bold text-(--muted)">{M.notebook.columns.bondLine}</dt>
                <dd className="font-mono font-bold text-(--foreground)">{result.bondLine}</dd>
                <dt className="font-bold text-(--muted)">{M.notebook.columns.counts}</dt>
                <dd className="font-bold text-(--foreground)">
                  {result.bonds} / {result.lonePairs}
                </dd>
                <dt className="font-bold text-(--muted)">{M.notebook.columns.hint}</dt>
                <dd className="font-bold text-(--foreground)">
                  {result.hintTier === 0 ? M.notebook.noHint : M.notebook.hintTier(result.hintTier)}
                </dd>
                {result.diagnosisLabel && (
                  <>
                    <dt className="font-bold text-(--muted)">{M.notebook.columns.diagnosis}</dt>
                    <dd className="font-bold text-(--foreground)">
                      {M.notebook.diagnosisRow(result.diagnosisLabel, result.firstTryDiagnosis === true)}
                    </dd>
                  </>
                )}
              </dl>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
