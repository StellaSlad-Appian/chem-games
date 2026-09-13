// src/components/cheat-sheets/CheatSheetGrid.tsx
'use client';

import { useState } from 'react';
import { CheatSheetCard } from './CheatSheetCard';
import { YearFilter } from './YearFilter';
import type { CheatSheetTopic } from '@/core-engine/types/general';

export function CheatSheetGrid({ sheets }: { sheets: CheatSheetTopic[] }) {
  const [selectedYear, setSelectedYear] = useState<string>('All');

  const visible =
    selectedYear === 'All' ? sheets : sheets.filter((sheet) => sheet.yearLevel === selectedYear);

  return (
    <>
      <div className="mt-8">
        <YearFilter selectedYear={selectedYear} onSelectYear={setSelectedYear} />
      </div>

      <p className="mt-4 text-xs font-bold text-(--muted)" aria-live="polite">
        {visible.length} {visible.length === 1 ? 'topic' : 'topics'}
      </p>

      <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((topic) => (
          <CheatSheetCard key={topic.slug} topic={topic} />
        ))}
      </div>
    </>
  );
}
