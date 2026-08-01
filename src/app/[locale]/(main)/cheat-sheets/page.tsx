// src/app/cheat-sheets/page.tsx
import Link from 'next/link';
import { ArrowLeft, BookMarked } from 'lucide-react';
import { CheatSheetCard } from '@/components/cheat-sheets/CheatSheetCard';
import { CHEAT_SHEETS } from '@/lib/cheat-sheet-data';

export default function CheatSheetsPage() {
  return (
    <main className="min-h-screen bg-(--background) text-(--foreground) px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Navigation back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-muted transition hover:text-blue-500"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>

        {/* Header */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500 text-white">
                <BookMarked className="h-5 w-5" />
              </span>
              <h1 className="text-4xl font-black md:text-5xl">Lab Cheat Sheets</h1>
            </div>
            <p className="mt-2 text-base text-muted">
              Quick chemical formulas, reaction rules, and equation references grouped by year level.
            </p>
          </div>
        </div>

        {/* Grid of Cheat Sheets */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CHEAT_SHEETS.map((topic) => (
            <CheatSheetCard key={topic.slug} topic={topic} />
          ))}
        </div>
      </div>
    </main>
  );
}