'use client';

import { useMemo } from 'react';
import { parseFormulaAtoms } from '@/core-engine/utils/chemical-utils';
import { useI18n } from '@/i18n/client';

interface ParticlePreviewProps {
  formula: string;
  coefficient: number | '';
}

const atomStyles: Record<string, string> = {
  H: 'bg-slate-100 text-slate-900 border-slate-300',
  C: 'bg-slate-700 text-white border-slate-500',
  O: 'bg-red-500 text-white border-red-300',
  N: 'bg-blue-500 text-white border-blue-300',
  S: 'bg-yellow-400 text-slate-900 border-yellow-200',
  Cl: 'bg-green-500 text-white border-green-300',
  Na: 'bg-purple-500 text-white border-purple-300',
  K: 'bg-purple-600 text-white border-purple-300',
  Ca: 'bg-orange-500 text-white border-orange-300',
  Mg: 'bg-emerald-500 text-white border-emerald-300',
  Ag: 'bg-slate-300 text-slate-900 border-slate-100',
  Cu: 'bg-orange-700 text-white border-orange-400',
  Fe: 'bg-orange-600 text-white border-orange-300',
  Pb: 'bg-slate-500 text-white border-slate-300',
  I: 'bg-violet-500 text-white border-violet-300',
};

function AtomDot({
  element,
}: {
  element: string;
}) {
  return (
    <span
      className={`flex h-5 w-5 items-center justify-center rounded-full border text-[8px] font-black shadow-sm sm:h-6 sm:w-6 sm:text-[9px] ${
        atomStyles[element] ??
        'bg-cyan-500 text-white border-cyan-300'
      }`}
      title={element}
      aria-label={element}
    >
      {element}
    </span>
  );
}

export default function ParticlePreview({
  formula,
  coefficient,
}: ParticlePreviewProps) {
  const { t, f } = useI18n();
  const atoms = useMemo(() => {
    const parsed =
      parseFormulaAtoms(formula);

    return Object.entries(parsed).flatMap(
      ([element, count]) =>
        Array.from(
          { length: count },
          () => element
        )
    );
  }, [formula]);

  const moleculeCount =
    typeof coefficient === 'number'
      ? coefficient
      : 1;

  // Avoid filling the screen with dozens of
  // individual molecule clusters.
  const visibleMolecules = Math.min(
    moleculeCount,
    4
  );

  const remainingMolecules =
    moleculeCount - visibleMolecules;

  return (
    <div className="mt-2 w-full">
      <div
        className="flex min-h-14 items-center justify-center rounded-lg border border-slate-700/70 bg-slate-950/50 px-2 py-2"
        aria-label={f(
          moleculeCount === 1
            ? t.games.reactionBalancer.particleCountOneA11y
            : t.games.reactionBalancer.particleCountOtherA11y,
          { count: moleculeCount, formula }
        )}
      >
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {Array.from({
            length: visibleMolecules,
          }).map((_, moleculeIndex) => (
            <div
              key={moleculeIndex}
              className="flex min-h-9 min-w-9 items-center justify-center gap-0.5 rounded-full border border-slate-700 bg-slate-900/90 px-1.5 py-1 shadow-inner transition-all duration-200"
            >
              {atoms.map(
                (element, atomIndex) => (
                  <AtomDot
                    key={`${moleculeIndex}-${element}-${atomIndex}`}
                    element={element}
                  />
                )
              )}
            </div>
          ))}

          {remainingMolecules > 0 && (
            <span className="ml-1 whitespace-nowrap text-[9px] font-bold text-[var(--muted)]">
              +{remainingMolecules} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
}