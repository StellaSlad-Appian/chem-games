// src/components/cheat-sheets/CheatSheetCard.tsx

'use client';

import { BookOpen, Sparkles } from 'lucide-react';
import { ChemIcon } from '@/components/ui/ChemIcon';
import MoleculeText from '@/components/ui/MoleculeText';
import { LocaleLink } from '@/components/layout/LocaleLink';
import type { CheatSheetTopic } from '@/core-engine/types/general';
import { useI18n } from '@/i18n/client';

export function CheatSheetCard({ topic }: { topic: CheatSheetTopic }) {
  const { t, f } = useI18n();
  const firstExample =
    topic.formulaExamples?.[0] ?? topic.sections?.[0]?.examples?.[0] ?? null;

  return (
    <LocaleLink
      href={`/cheat-sheets/${topic.slug}`}
      className="group flex flex-col justify-between game-card card-lift p-6 hover:border-(--link)"
    >
      <div>
        {/*
          The dashboard's card anatomy, shared with the game and Explore cards:
          the icon on a tile of the item's colour top left, a neutral pill top
          right, then the title. The sheet's hue lives on the tile only; the
          year is the same neutral pill as every other label on the site.
        */}
        <div className="flex items-start justify-between gap-2">
          <span className={`icon-tile ${topic.colorTheme}`} aria-hidden="true">
            <ChemIcon name={topic.iconName} className="h-5 w-5" />
          </span>
          <span className="pill uppercase tracking-wider">{t.yearLevels[topic.yearLevel]}</span>
        </div>

        <h3 className="mt-4 hyphens-auto break-words text-xl font-black text-(--foreground) transition group-hover:text-(--link)">
          {topic.title}
        </h3>
        <p className="mt-1 text-xs font-bold text-(--muted)">{t.cheatSheetCategories[topic.category]}</p>

        {/* Summary */}
        <p className="mt-2 hyphens-auto text-sm text-(--muted)">{topic.summary}</p>

        {/* Formula Example Preview */}
        {firstExample && (
          <div className="panel mt-4 p-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-(--muted)">
              {t.cheatSheets.exampleFormula}
            </p>
            <div className="mt-1 flex items-center gap-1.5 text-xs font-bold text-(--link)">
              <span>{f(t.cheatSheets.exampleLabel, { name: firstExample.name })}</span>
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
        <span className="flex items-center gap-1.5 text-xs font-black text-(--link)">
          <BookOpen className="h-4 w-4 shrink-0" aria-hidden="true" /> {t.cheatSheets.readReference}
        </span>
        <Sparkles
          className="h-4 w-4 shrink-0 text-(--muted) transition group-hover:rotate-12 group-hover:text-(--accent)"
          aria-hidden="true"
        />
      </div>
    </LocaleLink>
  );
}