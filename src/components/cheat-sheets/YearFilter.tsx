// src/components/cheat-sheets/YearFilter.tsx
'use client';

import type { YearLevel } from '@/core-engine/types/general';

const years: ('All' | YearLevel)[] = ['All', 'Year 7', 'Year 8', 'Year 9', 'Year 10', 'Senior'];

export function YearFilter({
  selectedYear,
  onSelectYear,
}: {
  selectedYear: string;
  onSelectYear: (year: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {years.map((year) => {
        const isActive = selectedYear === year;
        return (
          <button
            key={year}
            type="button"
            onClick={() => onSelectYear(year)}
            className={`rounded-xl px-4 py-2 text-xs font-black transition ${
              isActive
                ? 'bg-blue-500 text-white shadow-md'
                : 'border border-(--border) bg-(--surface) text-muted hover:text-(--foreground)'
            }`}
          >
            {year}
          </button>
        );
      })}
    </div>
  );
}