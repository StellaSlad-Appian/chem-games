// src/app/[lang]/(main)/cheat-sheets/[slug]/page.tsx

import { notFound } from 'next/navigation';
import {
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  Gamepad2,
  Sparkles,
} from 'lucide-react';
import { CHEAT_SHEETS, GAME_LINKS } from '@/lib/cheat-sheet-data';
import { ChemIcon } from '@/components/ui/ChemIcon';
import MoleculeText from '@/components/ui/MoleculeText';
import { LocaleLink } from '@/components/layout/LocaleLink';
import type { CheatSheetResource, CheatSheetTable } from '@/core-engine/types/general';
import { getCheatSheet, getGlobalTeacherResources } from '@/i18n/cheat-sheets';
import { getDictionary, type Dictionary } from '@/i18n/dictionaries';
import { gameTitle } from '@/i18n/game-titles';
import { format } from '@/i18n/format';
import { DEFAULT_LOCALE, isLocale, type Locale } from '@/i18n/config';

/**
 * Only the slugs are produced here. The `lang` values come from the
 * `generateStaticParams` on the root layout, and Next combines the two — see
 * node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-static-params.md
 * ("the child generateStaticParams function is executed once for each set of
 * params the parent generates"). Slugs are locale-independent by design: a
 * German reader still visits /de/cheat-sheets/acids-and-bases, which keeps
 * links shareable across languages.
 */
export async function generateStaticParams() {
  return CHEAT_SHEETS.map((sheet) => ({
    slug: sheet.slug,
  }));
}

export async function generateMetadata(props: PageProps<'/[lang]/cheat-sheets/[slug]'>) {
  const { lang, slug } = await props.params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const t = await getDictionary(locale);
  const sheet = getCheatSheet(locale, slug);

  if (!sheet) {
    return { title: t.meta.cheatSheetNotFound };
  }

  return {
    title: format(t.meta.cheatSheetTitle, { title: sheet.title }),
    description: sheet.summary,
  };
}

const panelClass =
  'mt-8 rounded-3xl border-2 border-(--border) bg-(--surface) p-6 shadow-md md:p-8';

function PanelHeading({ icon, children }: { icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <h2 className="mb-4 flex items-center gap-2 text-lg font-black text-(--foreground)">
      {icon}
      {children}
    </h2>
  );
}

function LookupTable({ table }: { table: CheatSheetTable }) {
  const formulaColumns = new Set(table.formulaColumns ?? []);
  return (
    <div className="mt-6 first:mt-0">
      <h3 className="text-sm font-black uppercase tracking-wider text-(--muted)">{table.heading}</h3>
      {table.caption && <p className="mt-1 text-xs text-(--muted)">{table.caption}</p>}
      <div className="mt-3 overflow-x-auto rounded-2xl border border-(--border)">
        <table className="w-full min-w-[28rem] text-left text-sm">
          <thead className="bg-(--background) text-[10px] font-black uppercase tracking-wider text-(--muted)">
            <tr>
              {table.columns.map((column) => (
                <th key={column} scope="col" className="px-4 py-3">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-t border-(--border) odd:bg-(--surface) even:bg-(--background)">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-4 py-2.5 font-semibold text-(--foreground)">
                    {formulaColumns.has(cellIndex) ? (
                      <MoleculeText formula={cell} className="text-base text-blue-500" />
                    ) : (
                      cell
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ResourceList({
  heading,
  resources,
  t,
}: {
  heading: string;
  resources: CheatSheetResource[];
  t: Dictionary;
}) {
  if (resources.length === 0) return null;
  return (
    <div className="mt-6 first:mt-0">
      <h3 className="text-sm font-black uppercase tracking-wider text-(--muted)">{heading}</h3>
      <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {resources.map((resource) => (
          <li key={resource.url}>
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col rounded-2xl border border-(--border) bg-(--background) p-4 transition hover:border-blue-500"
            >
              <span className="flex items-center gap-2 text-sm font-black text-blue-500">
                {resource.label}
                <ExternalLink className="h-3.5 w-3.5 opacity-60 transition group-hover:opacity-100" aria-hidden="true" />
                <span className="sr-only">{t.common.opensInNewTab}</span>
              </span>
              <span className="mt-1 text-xs text-(--muted)">{resource.description}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function CheatSheetDetailPage(
  props: PageProps<'/[lang]/cheat-sheets/[slug]'>
) {
  const { lang, slug } = await props.params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const t = await getDictionary(locale);
  const sheet = getCheatSheet(locale, slug);

  if (!sheet) {
    notFound();
  }

  const studentResources = (sheet.resources ?? []).filter((r) => r.audience !== 'teacher');
  const teacherResources = [
    ...(sheet.resources ?? []).filter((r) => r.audience === 'teacher'),
    ...getGlobalTeacherResources(locale),
  ];
  const relatedGames = (sheet.relatedGames ?? [])
    .map((gameId) => {
      const link = GAME_LINKS[gameId];
      return link ? { ...link, title: gameTitle(t, gameId, link.title) } : undefined;
    })
    .filter((game): game is { title: string; href: string } => Boolean(game));

  return (
    <main className="container mx-auto min-h-screen max-w-4xl px-4 py-8 bg-(--background) text-(--foreground)">
      <LocaleLink
        href="/cheat-sheets"
        className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-(--muted) transition hover:text-blue-500"
      >
        <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
        {t.cheatSheets.backToList}
      </LocaleLink>

      <header className="rounded-3xl border-2 border-(--border) bg-(--surface) p-6 shadow-xl md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className={`rounded-full border px-4 py-1 text-xs font-black uppercase tracking-wider ${sheet.colorTheme}`}>
            {t.yearLevels[sheet.yearLevel]}
          </span>
          <span className="text-xs font-bold text-(--muted)">
            {t.cheatSheetCategories[sheet.category]}
          </span>
        </div>

        <div className="mt-6 flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-500">
            <ChemIcon name={sheet.iconName} className="h-8 w-8" aria-hidden="true" />
          </div>
          {/*
            `min-w-0` is load-bearing. This is a flex item, and a flex item's
            automatic minimum size is its min-content width — the longest
            unbreakable word in the title, set at text-3xl. Without it the whole
            page grows to fit that word and scrolls sideways at 320px, which
            docs/ACCESSIBILITY.md forbids (1.4.10). It did: German
            "Periodensystem" and "Aggregatzustände", and English "Stoichiometry",
            each pushed the document past the viewport on their own sheets.
            `break-words` then handles the case where one word is still wider
            than the column it has been given.
          */}
          <div className="min-w-0">
            <h1 className="text-3xl font-black break-words text-(--foreground) md:text-4xl">
              {sheet.title}
            </h1>
            <p className="mt-1 text-sm font-medium break-words text-(--muted) md:text-base">
              {sheet.summary}
            </p>
          </div>
        </div>

        {relatedGames.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-(--muted)">
              <Gamepad2 className="h-4 w-4 shrink-0" aria-hidden="true" /> {t.cheatSheets.practiseThis}
            </span>
            {relatedGames.map((game) => (
              <LocaleLink
                key={game.href}
                href={game.href}
                className="rounded-xl bg-blue-500 px-3 py-1.5 text-xs font-black uppercase tracking-wider text-white shadow-md transition hover:bg-blue-600"
              >
                {game.title}
              </LocaleLink>
            ))}
          </div>
        )}
      </header>

      <section className={panelClass}>
        <PanelHeading icon={<Sparkles className="h-5 w-5 text-amber-400" aria-hidden="true" />}>{t.cheatSheets.keyConcepts}</PanelHeading>
        <ul className="space-y-3">
          {sheet.keyTakeaways.map((takeaway, index) => (
            <li key={index} className="flex items-start gap-3 text-sm font-semibold text-(--foreground) md:text-base">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" aria-hidden="true" />
              <span>{takeaway}</span>
            </li>
          ))}
        </ul>
      </section>

      {sheet.formulaExamples && sheet.formulaExamples.length > 0 && (
        <section className={panelClass}>
          <PanelHeading>{t.cheatSheets.exampleFormulas}</PanelHeading>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {sheet.formulaExamples.map((item, index) => (
              <div key={index} className="flex flex-col justify-between rounded-2xl border border-(--border) bg-(--background) p-4">
                <span className="text-xs font-bold text-(--muted)">{item.name}</span>
                <MoleculeText formula={item.formula} className="mt-2 text-base font-bold text-blue-500 md:text-lg" />
              </div>
            ))}
          </div>
        </section>
      )}

      {sheet.tables && sheet.tables.length > 0 && (
        <section className={panelClass}>
          <PanelHeading>{t.cheatSheets.lookupTables}</PanelHeading>
          {sheet.tables.map((table) => (
            <LookupTable key={table.heading} table={table} />
          ))}
        </section>
      )}

      {sheet.sections.length > 0 && (
        <section className={panelClass}>
          <PanelHeading>{t.cheatSheets.goingDeeper}</PanelHeading>
          <div className="space-y-6">
            {sheet.sections.map((section) => (
              <article key={section.heading}>
                <h3 className="text-base font-black text-(--foreground)">{section.heading}</h3>
                <p className="mt-2 text-sm leading-relaxed text-(--muted)">{section.content}</p>
                {section.image && (
                  /*
                   * A plain <img>, not next/image. These are small static SVGs
                   * served straight from public/ — there is nothing for the
                   * optimiser to do to an SVG, and next/image would add a
                   * config surface (remotePatterns, dangerouslyAllowSVG) for no
                   * gain. width/height are the file's intrinsic size and are
                   * set so the paragraph below does not jump when the diagram
                   * arrives.
                   *
                   * Replacing a diagram is replacing the file at `src`; no code
                   * changes. See docs/CHEAT_SHEET_IMAGES.md.
                   */
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={section.image.src}
                    alt={section.image.alt}
                    width={section.image.width}
                    height={section.image.height}
                    className="mt-3 h-auto w-full max-w-lg rounded-2xl border border-(--border) bg-(--background)"
                  />
                )}
                {section.examples && section.examples.length > 0 && (
                  <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {section.examples.map((example) => (
                      <div key={example.name} className="rounded-2xl border border-(--border) bg-(--background) p-3">
                        <span className="text-xs font-bold text-(--muted)">{example.name}</span>
                        <MoleculeText formula={example.formula} className="mt-1 text-sm font-bold text-blue-500" />
                      </div>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {sheet.commonMistakes && sheet.commonMistakes.length > 0 && (
        <section className={panelClass}>
          <PanelHeading icon={<AlertTriangle className="h-5 w-5 text-rose-500" aria-hidden="true" />}>{t.cheatSheets.watchOutFor}</PanelHeading>
          <ul className="space-y-3">
            {sheet.commonMistakes.map((mistake, index) => (
              <li key={index} className="flex items-start gap-3 text-sm text-(--foreground)">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" aria-hidden="true" />
                <span>{mistake}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className={panelClass}>
        <PanelHeading icon={<BookOpen className="h-5 w-5 text-blue-500" aria-hidden="true" />}>{t.cheatSheets.learnMore}</PanelHeading>
        <ResourceList heading={t.cheatSheets.forStudents} resources={studentResources} t={t} />
        <ResourceList heading={t.cheatSheets.forTeachers} resources={teacherResources} t={t} />
      </section>

      {sheet.curriculumRef && (
        <p className="mt-6 text-xs text-(--muted)">
          <span className="font-black uppercase tracking-wider">{t.cheatSheets.curriculum}</span>
          {sheet.curriculumRef}
        </p>
      )}
    </main>
  );
}
