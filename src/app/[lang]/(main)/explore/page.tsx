// src/app/[lang]/(main)/explore/page.tsx
//
// Explore: one molecule and one chemist, changing together every Monday.
//
// A Server Component under the `(main)` group, so it gets the NavBar and the
// footer and none of the entry prose reaches the client bundle — which matters
// here more than on most pages, because the entries are the largest body of
// text on the site.
//
// ## The URL segment stays English in every locale
//
// `/de/explore`, not `/de/entdecken`, exactly as `/de/cheat-sheets` is not
// `/de/spickzettel`. One route shape to reason about, links that survive being
// pasted into a chat in another language, and no per-locale routing table.
//
// ## Revalidation
//
// `export const revalidate = 3600` — the route segment config documented in
// node_modules/next/dist/docs/01-app/02-guides/caching-without-cache-components.md.
// Checked against the shipped docs rather than from memory, per AGENTS.md: in
// Next 16 that export is removed only *when Cache Components is enabled*, and
// this app does not enable it (there is no `cacheComponents` in next.config.ts),
// so it is the current and correct API here. The same doc requires the value to
// be statically analysable, which is why it is the literal 3600 and not
// `60 * 60`.
//
// One hour rather than one week, deliberately: the page must be able to turn
// over without a deploy, and an hour is short enough that the new week appears
// promptly and long enough that the page is worth caching at all.

import type { Metadata } from 'next';
import { Compass } from 'lucide-react';
import { MoleculeCard } from '@/components/explore/MoleculeCard';
import { ScientistCard } from '@/components/explore/ScientistCard';
import { DEFAULT_LOCALE, formattingLocale, isLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import {
  exploreLinkTarget,
  getExploreContent,
} from '@/i18n/explore';
import { format } from '@/i18n/format';
import { localeAlternates } from '@/i18n/routing';

export const revalidate = 3600;

/**
 * The dateline and the source dates, in the reader's language.
 *
 * `Intl`, never a hand-built string: "Week of 21 September" is
 * "Woche vom 21. September" in German and "Semana del 21 de septiembre" in
 * Spanish, and the difference is not something a template can be talked into.
 * `timeZone: 'UTC'` because the week boundary is UTC — without it a reader
 * whose machine is behind UTC would be shown the previous day's date on the
 * Monday itself.
 *
 * `formattingLocale(locale)`, not `locale`: `Intl.DateTimeFormat('en')` resolves to
 * en-US and writes "September 21, 2026" on a site that otherwise writes British
 * English. See the comment on `FORMATTING_LOCALE` in src/i18n/config.ts.
 */
function formatWeekDate(locale: Locale, date: Date): string {
  return new Intl.DateTimeFormat(formattingLocale(locale), {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

function formatShortDate(locale: Locale, isoDate: string): string {
  return new Intl.DateTimeFormat(formattingLocale(locale), {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${isoDate}T00:00:00Z`));
}

export async function generateMetadata(
  props: PageProps<'/[lang]/explore'>
): Promise<Metadata> {
  const { lang } = await props.params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const t = await getDictionary(locale);
  const alternates = localeAlternates('/explore');

  return {
    title: `${t.explore.heading} | ${t.meta.siteName}`,
    description: t.explore.intro,
    // Metadata merges between segments but does not deep-merge, so returning
    // `alternates` here *replaces* the root layout's whole alternates object.
    // It has to be rebuilt for this path or the page would inherit the site
    // root's canonical, which would be wrong for every locale at once.
    alternates: {
      canonical: alternates[locale],
      languages: {
        ...alternates,
        'x-default': alternates[DEFAULT_LOCALE],
      },
    },
  };
}

export default async function ExplorePage(props: PageProps<'/[lang]/explore'>) {
  const { lang } = await props.params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const t = await getDictionary(locale);

  // The only clock in the whole feature. Everything downstream is a pure
  // function of this value, which is what lets every test pin a date.
  const week = getExploreContent(locale, new Date());

  const moleculeLink = exploreLinkTarget(locale, t, week.molecule.link);
  const scientistLink = exploreLinkTarget(locale, t, week.scientist.link);

  return (
    <main className="min-h-screen bg-(--background) px-4 py-8 text-(--foreground) md:px-8">
      <div className="mx-auto max-w-4xl lg:max-w-6xl">
        <header>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500 text-white">
              <Compass className="h-5 w-5" aria-hidden="true" />
            </span>
            <h1 className="text-4xl font-black md:text-5xl">{t.explore.heading}</h1>
          </div>
          <p className="mt-2 text-base text-(--muted)">{t.explore.intro}</p>

          {/*
            One dateline for both sections. Two would mean the reader cannot
            tell what is new — which is the whole reason the molecule and the
            scientist rotate together rather than on their own clocks.
          */}
          <p className="mt-4 inline-block rounded-full border border-(--border) bg-(--surface) px-4 py-1.5 text-xs font-black uppercase tracking-wider text-(--muted)">
            <time dateTime={week.weekStart.toISOString().slice(0, 10)}>
              {format(t.explore.dateline, {
                date: formatWeekDate(locale, week.weekStart),
              })}
            </time>
          </p>
        </header>

        {/*
          Side by side from lg, stacked below it. The two cards are a pair —
          the molecule and the scientist share a theme and usually a link
          target — so on a wide screen they should be readable together
          rather than one scrolled past to reach the other.

          `items-start` so a short card does not stretch to match a tall one,
          which would leave a panel of empty surface under its own text.
        */}
        <div className="mt-8 grid items-start gap-8 lg:grid-cols-2">
          <MoleculeCard
            molecule={week.molecule}
            linkHref={moleculeLink.href}
            linkTitle={moleculeLink.title}
            verifiedOn={formatShortDate(locale, week.molecule.sourcesVerifiedOn)}
            t={t}
            headingId="explore-molecule"
          />
          <ScientistCard
            scientist={week.scientist}
            linkHref={scientistLink.href}
            linkTitle={scientistLink.title}
            verifiedOn={formatShortDate(locale, week.scientist.sourcesVerifiedOn)}
            t={t}
            headingId="explore-scientist"
          />
        </div>
      </div>
    </main>
  );
}
