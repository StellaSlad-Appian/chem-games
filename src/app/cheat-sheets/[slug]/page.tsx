// src/app/cheat-sheets/[slug]/page.tsx

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Sparkles } from 'lucide-react';
import { CHEAT_SHEETS, getCheatSheetBySlug } from '@/lib/cheat-sheet-data';
import { ChemIcon } from '@/components/ui/ChemIcon';
import MoleculeText from '@/components/ui/MoleculeText';

interface CheatSheetPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return CHEAT_SHEETS.map((sheet) => ({
    slug: sheet.slug,
  }));
}

export async function generateMetadata({ params }: CheatSheetPageProps) {
  const { slug } = await params;
  const sheet = getCheatSheetBySlug(slug);

  if (!sheet) {
    return { title: 'Topic Not Found - ChemGames' };
  }

  return {
    title: `${sheet.title} Cheat Sheet | ChemGames`,
    description: sheet.summary,
  };
}

export default async function CheatSheetDetailPage({ params }: CheatSheetPageProps) {
  const { slug } = await params;
  const sheet = getCheatSheetBySlug(slug);

  if (!sheet) {
    notFound();
  }

  return (
    <main className="container mx-auto min-h-screen max-w-4xl px-4 py-8 bg-[var(--background)] text-[var(--foreground)]">
      {/* Back Navigation */}
      <Link
        href="/cheat-sheets"
        className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--muted)] transition hover:text-blue-500"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Cheat Sheets
      </Link>

      {/* Header Banner */}
      <header className="rounded-3xl border-2 border-[var(--border)] bg-[var(--surface)] p-6 shadow-xl md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className={`rounded-full border px-4 py-1 text-xs font-black uppercase tracking-wider ${sheet.colorTheme}`}>
            {sheet.yearLevel}
          </span>
          <span className="text-xs font-bold text-[var(--muted)]">{sheet.category}</span>
        </div>

        <div className="mt-6 flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500">
            <ChemIcon name={sheet.iconName} className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-[var(--foreground)] md:text-4xl">{sheet.title}</h1>
            <p className="mt-1 text-sm font-medium text-[var(--muted)] md:text-base">{sheet.summary}</p>
          </div>
        </div>
      </header>

      {/* Key Takeaways Section */}
      <section className="mt-8 rounded-3xl border-2 border-[var(--border)] bg-[var(--surface)] p-6 shadow-md md:p-8">
        <div className="mb-4 flex items-center gap-2 text-lg font-black text-[var(--foreground)]">
          <Sparkles className="h-5 w-5 text-amber-400" />
          <h2>Key Concepts</h2>
        </div>
        <ul className="space-y-3">
          {sheet.keyTakeaways.map((takeaway, index) => (
            <li key={index} className="flex items-start gap-3 text-sm font-semibold text-[var(--foreground)] md:text-base">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
              <span>{takeaway}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Formulas & Reaction Examples */}
      {sheet.formulaExamples && sheet.formulaExamples.length > 0 && (
        <section className="mt-8 rounded-3xl border-2 border-[var(--border)] bg-[var(--surface)] p-6 shadow-md md:p-8">
          <h2 className="mb-4 text-lg font-black text-[var(--foreground)]">Example Formulas & Reactions</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {sheet.formulaExamples.map((item, index) => (
              <div
                key={index}
                className="flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-[var(--background)] p-4"
              >
                <span className="text-xs font-bold text-[var(--muted)]">{item.name}</span>
                <MoleculeText formula={item.formula} className="mt-2 text-base font-bold text-blue-500 md:text-lg" />
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}