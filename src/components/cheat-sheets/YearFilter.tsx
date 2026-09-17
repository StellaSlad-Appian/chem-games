// src/components/cheat-sheets/YearFilter.tsx
'use client';

import type { YearLevel } from '@/core-engine/types/general';
import { useI18n } from '@/i18n/client';

// Values, not labels: these are compared against `sheet.yearLevel`, which is
// canonical English. The dictionary maps each one to its label.
const years: ('All' | YearLevel)[] = ['All', 'Year 7', 'Year 8', 'Year 9', 'Year 10', 'Senior'];

const LABEL_KEY = {
  All: 'all',
  'Year 7': 'Year 7',
  'Year 8': 'Year 8',
  'Year 9': 'Year 9',
  'Year 10': 'Year 10',
  Senior: 'Senior',
} as const;

export function YearFilter({
  selectedYear,
  onSelectYear,
}: {
  selectedYear: string;
  onSelectYear: (year: string) => void;
}) {
  const { t } = useI18n();
  return (
    <div
      className="flex flex-wrap items-center gap-2"
      role="group"
      aria-label={t.cheatSheets.filterA11y}
    >
      {years.map((year) => {
        const isActive = selectedYear === year;
        return (
          <button
            key={year}
            type="button"
            onClick={() => onSelectYear(year)}
            aria-pressed={isActive}
            className={`cursor-pointer rounded-xl px-4 py-2 text-xs font-black transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 ${
              isActive
                ? 'bg-blue-500 text-white shadow-md'
                : 'border border-(--border) bg-(--surface) text-muted hover:text-(--foreground)'
            }`}
          >
            {t.yearLevels[LABEL_KEY[year]]}
          </button>
        );
      })}
    </div>
  );
}