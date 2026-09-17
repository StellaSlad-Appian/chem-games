// src/components/cheat-sheets/CheatSheetCard.tsx

'use client';

import { BookOpen, Sparkles } from 'lucide-react';
import { ChemIcon } from '@/components/ui/ChemIcon';
import MoleculeText from '@/components/ui/MoleculeText';
import { LocaleLink } from '@/components/layout/LocaleLink';
import type { CheatSheetTopic } from '@/core-engine/types/general';
import { useI18n } from '@/i18n/client';

export function CheatSheetCard({ topic }: { topic: CheatSheetTopic }) {
  const { t } = useI18n();
  const firstExample =
    topic.formulaExamples?.[0] ?? topic.sections?.[0]?.examples?.[0] ?? null;

  return (
    <LocaleLink
      href={`/cheat-sheets/${topic.slug}`}
      className="group flex flex-col justify-between rounded-2xl border-2 border-(--border) bg-(--surface) p-6 shadow-md transition hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl"
    >
      <div>
        {/* Header badges */}
        <div className="flex items-center justify-between gap-2">
          <span
            className={`inline-block rounded-full border px-3 py-1 text-xs font-black uppercase tracking-wider ${topic.colorTheme}`}
          >
            {t.yearLevels[topic.yearLevel]}
          </span>
          <span className="text-xs font-bold text-(--muted)">
            {topic.category}
          </span>
        </div>

        {/* Icon & Title */}
        <div className="mt-4 flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 transition group-hover:bg-blue-500 group-hover:text-white">
            <ChemIcon name={topic.iconName} className="h-5 w-5" />
          </div>
          <h3 className="text-2xl font-black text-(--foreground) transition group-hover:text-blue-500">
            {topic.title}
          </h3>
        </div>

        {/* Summary */}
        <p className="mt-3 text-sm text-(--muted)">{topic.summary}</p>

        {/* Formula Example Preview */}
        {firstExample && (
          <div className="mt-4 rounded-xl border border-(--border) bg-(--background) p-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-(--muted)">
              {t.cheatSheets.exampleFormula}
            </p>
            <div className="mt-1 flex items-center gap-1.5 text-xs font-bold text-blue-500">
              <span>{firstExample.name}:</span>
              <MoleculeText
                formula={firstExample.formula}
                className="font-mono text-sm"
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between border-t border-(--border) pt-4">
        <span className="flex items-center gap-1.5 text-xs font-black text-blue-500">
          <BookOpen className="h-4 w-4 shrink-0" aria-hidden="true" /> {t.cheatSheets.readReference}
        </span>
        <Sparkles
          className="h-4 w-4 shrink-0 text-(--muted) transition group-hover:rotate-12 group-hover:text-amber-400"
          aria-hidden="true"
        />
      </div>
    </LocaleLink>
  );
}