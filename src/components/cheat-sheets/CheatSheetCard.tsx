// src/components/cheat-sheets/CheatSheetCard.tsx

import Link from 'next/link';
import { BookOpen, Sparkles } from 'lucide-react';
import type { CheatSheetTopic } from '@/core-engine/types/general';

export function CheatSheetCard({ topic }: { topic: CheatSheetTopic }) {
  const firstExample =
    topic.sections[0]?.examples && topic.sections[0].examples.length > 0
      ? topic.sections[0].examples[0]
      : null;

  return (
    <Link
      href={`/cheat-sheets/${topic.slug}`}
      className="group flex flex-col justify-between rounded-2xl border-2 border-[var(--border)] bg-[var(--surface)] p-6 shadow-md transition hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl"
    >
      <div>
        <div className="flex items-center justify-between gap-2">
          <span className={`inline-block rounded-full border px-3 py-1 text-xs font-black uppercase tracking-wider ${topic.colorTheme}`}>
            {topic.yearLevel}
          </span>
          <span className="text-xs font-bold text-(--muted)">{topic.category}</span>
        </div>

        <h3 className="mt-4 text-2xl font-black text-(--foreground) transition group-hover:text-blue-500">
          {topic.title}
        </h3>

        <p className="mt-2 text-sm text-(--muted)">{topic.summary}</p>

        {firstExample && (
          <div className="mt-4 rounded-xl border border-(--border) bg-(--background) p-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-[var(--muted)]">Example Formula</p>
            <p className="mt-1 font-mono text-xs font-bold text-blue-500">
              {firstExample.name}: {firstExample.formula}
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-[var(--border)] pt-4">
        <span className="flex items-center gap-1.5 text-xs font-black text-blue-500">
          <BookOpen className="h-4 w-4" /> Read reference
        </span>
        <Sparkles className="h-4 w-4 text-[var(--muted)] transition group-hover:rotate-12 group-hover:text-amber-400" />
      </div>
    </Link>
  );
}