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

/**
 * Pre-generates static routes for all cheat sheets at build time.
 */
export async function generateStaticParams() {
  return CHEAT_SHEETS.map((sheet) => ({
    slug: sheet.slug,
  }));
}

/**
 * Dynamic metadata generator for SEO and tab titles.
 */
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
  // In Next.js 15, params is a Promise that must be awaited
  const { slug } = await params;
  const sheet = getCheatSheetBySlug(slug);

  if (!sheet) {
    notFound();
  }

  return (
    <main className="container mx-auto min-h-screen px-4 py-8 max-w-4xl">
      {/* Back Navigation */}
      <Link
        href="/cheat-sheets"
        className="inline-flex items-center gap-2 text-sm font-bold text-(--muted) hover:text-blue-500 transition mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Cheat Sheets
      </Link>

      {/* Header Banner */}
      <header className="rounded-3xl border-2 border-(--border) bg-(--surface) p-6 md:p-8 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className={`rounded-full border px-4 py-1 text-xs font-black uppercase tracking-wider ${sheet.colorTheme}`}>
            {sheet.yearLevel}
          </span>
          <span className="text-xs font-bold text-(--muted)">{sheet.category}</span>
        </div>

        <div className="mt-6 flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500">
            <ChemIcon name={sheet.iconName} className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-(--foreground)">{sheet.title}</h1>
            <p className="mt-1 text-sm md:text-base text-(--muted)">{sheet.summary}</p>
          </div>
        </div>
      </header>

      {/* Key Takeaways Section */}
      <section className="mt-8 rounded-3xl border-2 border-(--border) bg-(--surface) p-6 md:p-8 shadow-md">
        <div className="flex items-center gap-2 text-lg font-black text-(--foreground) mb-4">
          <Sparkles className="h-5 w-5 text-amber-400" />
          <h2>Key Concepts</h2>
        </div>
        <ul className="space-y-3">
          {sheet.keyTakeaways.map((takeaway, index) => (
            <li key={index} className="flex items-start gap-3 text-sm md:text-base font-medium">
              <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
              <span>{takeaway}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Formulas & Reaction Examples */}
      {sheet.formulaExamples && sheet.formulaExamples.length > 0 && (
        <section className="mt-8 rounded-3xl border-2 border-(--border) bg-(--surface) p-6 md:p-8 shadow-md">
          <h2 className="text-lg font-black text-(--foreground) mb-4">Example Formulas & Reactions</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {sheet.formulaExamples.map((item, index) => (
              <div
                key={index}
                className="rounded-2xl border border-(--border) bg-(--background) p-4 flex flex-col justify-between"
              >
                <span className="text-xs font-bold text-(--muted)">{item.name}</span>
                <MoleculeText formula={item.formula} className="mt-2 text-lg font-bold text-blue-500" />
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}