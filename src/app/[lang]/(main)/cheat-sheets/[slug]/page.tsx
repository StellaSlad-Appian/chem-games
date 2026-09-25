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
import { PannableBox } from '@/components/cheat-sheets/PannableBox';
import { ChemIcon } from '@/components/ui/ChemIcon';
import MoleculeText from '@/components/ui/MoleculeText';
import { LocaleLink } from '@/components/layout/LocaleLink';
import {
  PeriodicTableOccurrenceWidget,
  PeriodicTableWidget,
} from '@/components/periodic-table/PeriodicTableWidget';
import type {
  CheatSheetResource,
  CheatSheetTable,
  CheatSheetWidgetName,
} from '@/core-engine/types/general';
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
  'mt-8 game-card p-6 md:p-8';

/**
 * Widget name -> component, exactly as `ChemIcon`'s `ICON_REGISTRY` maps an
 * icon name (D4).
 *
 * The alternative this rejects is branching on the slug —
 * `if (slug === 'atomic-structure')`. That is unfindable, untyped, and it puts
 * page-specific chemistry in the route. A section opting in by name keeps the
 * sheet as data and keeps this file ignorant of which sheet is which.
 *
 * A name is structural metadata, so it is not in the translation overlay and
 * `cheat-sheets.test.ts` never sees it.
 */
const WIDGET_REGISTRY = {
  'periodic-table': PeriodicTableWidget,
  'periodic-table-occurrence': PeriodicTableOccurrenceWidget,
} satisfies Record<CheatSheetWidgetName, React.ComponentType<{ locale: Locale }>>;

function SectionWidget({ name, locale }: { name: CheatSheetWidgetName; locale: Locale }) {
  const Widget = WIDGET_REGISTRY[name];
  return <Widget locale={locale} />;
}

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
      {/*
        `min-w-[28rem]` is wider than the column below `sm`, so the table pans
        inside the box — and `PannableBox` is what says so, in the reader's
        language, and gives the box a tab stop while it can actually pan. The
        section diagrams further down use the same component for the same
        reason; see the note there.
      */}
      <PannableBox className="mt-3" boxClassName="rounded-2xl border border-(--border)">
        <table className="w-full min-w-[28rem] text-left text-sm">
          <thead className="bg-(--surface-2) text-[10px] font-black uppercase tracking-wider text-(--muted)">
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
              <tr key={rowIndex} className="border-t border-(--border) odd:bg-(--surface) even:bg-(--surface-2)">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-4 py-2.5 font-semibold text-(--foreground)">
                    {formulaColumns.has(cellIndex) ? (
                      <MoleculeText formula={cell} className="text-base text-(--link)" />
                    ) : (
                      cell
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </PannableBox>
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
              className="group flex h-full flex-col rounded-2xl border border-(--border) bg-(--surface-2) p-4 transition hover:border-(--link)"
            >
              <span className="flex items-center gap-2 text-sm font-black text-(--link)">
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
        className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-(--muted) transition hover:text-(--link)"
      >
        <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
        {t.cheatSheets.backToList}
      </LocaleLink>

      <header className="game-card p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="pill uppercase tracking-wider">
            {t.yearLevels[sheet.yearLevel]}
          </span>
          <span className="text-xs font-bold text-(--muted)">
            {t.cheatSheetCategories[sheet.category]}
          </span>
        </div>

        <div className="mt-6 flex items-center gap-4">
          <div className={`icon-tile h-14 w-14 rounded-2xl ${sheet.colorTheme}`}>
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
                className="rounded-xl bg-(--action) px-3 py-1.5 text-xs font-black uppercase tracking-wider text-white shadow-md transition hover:bg-(--action-hover)"
              >
                {game.title}
              </LocaleLink>
            ))}
          </div>
        )}
      </header>

      <section className={panelClass}>
        <PanelHeading icon={<Sparkles className="h-5 w-5 text-(--accent)" aria-hidden="true" />}>{t.cheatSheets.keyConcepts}</PanelHeading>
        <ul className="space-y-3">
          {sheet.keyTakeaways.map((takeaway, index) => (
            <li key={index} className="flex items-start gap-3 text-sm font-semibold text-(--foreground) md:text-base">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-(--success)" aria-hidden="true" />
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
              <div key={index} className="flex flex-col justify-between rounded-2xl border border-(--border) bg-(--surface-2) p-4">
                <span className="text-xs font-bold text-(--muted)">{item.name}</span>
                <MoleculeText formula={item.formula} className="mt-2 text-base font-bold text-(--link) md:text-lg" />
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
                   * The diagram is pinned at 512px and pans sideways inside
                   * this box when the column is narrower than that, exactly as
                   * the lookup tables above do. It is not free to shrink with
                   * the column, because below a certain width it stops being a
                   * diagram and becomes a grey smudge:
                   *
                   * The files are 640 units wide, and the generator holds their
                   * text to a 20-unit floor (scripts/cheat-sheet-diagrams.mts).
                   * At the 512px cap that is 16 CSS px — the figure
                   * docs/feature-briefs/atomic-structure-redesign.md §12.3
                   * sizes the type against. In the 236px column a 320px phone
                   * actually gave it, the same text drew at 7.4 CSS px, and no
                   * change to the SVG could fix that: the limiter is the
                   * column, not the file. Letting the image break out of the
                   * section padding instead would have bought 320px — 10 CSS
                   * px — which is not legible either.
                   *
                   * WCAG 1.4.10 exempts content that needs a two-dimensional
                   * layout from the no-sideways-scrolling rule, which is the
                   * same exemption the tables rely on. The page itself still
                   * reflows at 320px; only this box scrolls.
                   *
                   * `PannableBox` is the box. It tells the reader the figure
                   * continues past the edge — a 320px phone shows 236 of the
                   * 512, and the right-hand side of that slice is sometimes
                   * empty, so the clipping is not always visible in itself —
                   * and it makes the box a tab stop while it pans. The lookup
                   * tables above use the same component; an affordance here
                   * and not there would read as an inconsistency.
                   *
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
                  <PannableBox className="mt-3 max-w-lg">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={section.image.src}
                      alt={section.image.alt}
                      width={section.image.width}
                      height={section.image.height}
                      className="h-auto w-full min-w-lg max-w-lg rounded-2xl border border-(--border) bg-(--surface-2)"
                    />
                  </PannableBox>
                )}
                {section.widget && <SectionWidget name={section.widget} locale={locale} />}
                {section.examples && section.examples.length > 0 && (
                  <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {section.examples.map((example) => (
                      <div key={example.name} className="rounded-2xl border border-(--border) bg-(--surface-2) p-3">
                        <span className="text-xs font-bold text-(--muted)">{example.name}</span>
                        <MoleculeText formula={example.formula} className="mt-1 text-sm font-bold text-(--link)" />
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
          <PanelHeading icon={<AlertTriangle className="h-5 w-5 text-(--danger)" aria-hidden="true" />}>{t.cheatSheets.watchOutFor}</PanelHeading>
          <ul className="space-y-3">
            {sheet.commonMistakes.map((mistake, index) => (
              <li key={index} className="flex items-start gap-3 text-sm text-(--foreground)">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-(--danger)" aria-hidden="true" />
                <span>{mistake}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/*
        The whole panel, not just the two lists. A non-English sheet has no
        resources at all — every one of them is an English-language page, so
        src/i18n/cheat-sheets.ts withholds them — and `ResourceList` returning
        null for each list would have left a "Learn more" heading standing over
        nothing. An empty section reads as a page that failed to load; no
        section reads as a page that ends where it ends.
      */}
      {studentResources.length + teacherResources.length > 0 && (
        <section className={panelClass}>
          <PanelHeading icon={<BookOpen className="h-5 w-5 text-(--link)" aria-hidden="true" />}>{t.cheatSheets.learnMore}</PanelHeading>
          <ResourceList heading={t.cheatSheets.forStudents} resources={studentResources} t={t} />
          <ResourceList heading={t.cheatSheets.forTeachers} resources={teacherResources} t={t} />
        </section>
      )}

      {sheet.curriculumRef && (
        <p className="mt-6 text-xs text-(--muted)">
          <span className="font-black uppercase tracking-wider">{t.cheatSheets.curriculum}</span>
          {sheet.curriculumRef}
        </p>
      )}
    </main>
  );
}
