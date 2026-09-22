// src/components/cheat-sheets/CheatSheetGrid.tsx
'use client';

import { useMemo, useState } from 'react';
import { CheatSheetCard } from './CheatSheetCard';
import { YearFilter, yearFilterOptions } from './YearFilter';
import type { CheatSheetTopic } from '@/core-engine/types/general';
import { useI18n } from '@/i18n/client';

export function CheatSheetGrid({ sheets }: { sheets: CheatSheetTopic[] }) {
  const { t, p } = useI18n();
  // The filter value stays the canonical English year level ('All', 'Year 9'),
  // because that is what `sheet.yearLevel` and the database hold. Only the
  // button labels are translated, in YearFilter.
  const [selectedYear, setSelectedYear] = useState<string>('All');

  // Only the years that have a sheet. Year 7 and Year 8 have none today, and
  // offering them meant two buttons whose only effect was an empty grid.
  const years = useMemo(() => yearFilterOptions(sheets), [sheets]);

  const visible =
    selectedYear === 'All' ? sheets : sheets.filter((sheet) => sheet.yearLevel === selectedYear);

  return (
    <>
      <div className="mt-8">
        <YearFilter years={years} selectedYear={selectedYear} onSelectYear={setSelectedYear} />
      </div>

      <p className="mt-4 text-xs font-bold text-(--muted)" aria-live="polite">
        {p(t.cheatSheets.count, visible.length)}
      </p>

      <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((topic) => (
          <CheatSheetCard key={topic.slug} topic={topic} />
        ))}
      </div>
    </>
  );
}
