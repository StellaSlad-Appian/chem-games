// src/components/cheat-sheets/CheatSheetGrid.tsx
'use client';

import { useState } from 'react';
import { CheatSheetCard } from './CheatSheetCard';
import { YearFilter } from './YearFilter';
import type { CheatSheetTopic } from '@/core-engine/types/general';
import { useI18n } from '@/i18n/client';

export function CheatSheetGrid({ sheets }: { sheets: CheatSheetTopic[] }) {
  const { t, f } = useI18n();
  // The filter value stays the canonical English year level ('All', 'Year 9'),
  // because that is what `sheet.yearLevel` and the database hold. Only the
  // button labels are translated, in YearFilter.
  const [selectedYear, setSelectedYear] = useState<string>('All');

  const visible =
    selectedYear === 'All' ? sheets : sheets.filter((sheet) => sheet.yearLevel === selectedYear);

  return (
    <>
      <div className="mt-8">
        <YearFilter selectedYear={selectedYear} onSelectYear={setSelectedYear} />
      </div>

      <p className="mt-4 text-xs font-bold text-(--muted)" aria-live="polite">
        {f(visible.length === 1 ? t.cheatSheets.countOne : t.cheatSheets.countOther, {
          count: visible.length,
        })}
      </p>

      <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((topic) => (
          <CheatSheetCard key={topic.slug} topic={topic} />
        ))}
      </div>
    </>
  );
}
