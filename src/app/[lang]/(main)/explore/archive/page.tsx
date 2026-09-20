// src/app/[lang]/(main)/explore/archive/page.tsx
//
// The index: every pair in the rotation, in the order they come round.
//
// ## Rotation order, not months — and not "only what has been featured"
//
// The brief offered "grouped by month or by rotation order, whichever reads
// better once you see the data". Having seen the data, rotation order, for
// three reasons that only show up once you try the alternative:
//
//   1. **A pair recurs.** With a twenty-week cycle, benzene appears in January,
//      then June, then November. Grouped by month it is three rows for one
//      pair, and a reader scanning for "the benzene one" finds it three times
//      and cannot tell which is the real one. In rotation order it is one row,
//      dated by its most recent week.
//   2. **Rotation order is the editorial order.** `schedule.ts` alternates
//      `represents` deliberately, prefix by prefix, so reading the index top to
//      bottom is reading the schedule as it was curated. A month grid destroys
//      that and replaces it with an accident of the calendar.
//   3. **A month grouping is empty at launch**, and so is "every entry that has
//      been featured". At `weekIndex` 0 nothing has run. The index would be a
//      heading over nothing on the day the site most needs to be crawlable,
//      and would grow one row a week for five months. Listing the whole
//      rotation is complete from day one and is what makes all forty
//      permalinks reachable in one hop, which is the point of having an index.
//
// So this page lists the whole rotation and says of each row where it stands:
// the week it last ran, or — before its first — the week it is next due. The
// one row that is the current week is marked.
//
// ## These dates are derived, not recorded
//
// Read the header of src/lib/explore/archive.ts. Nothing writes down what ran
// when; this is where today's schedule *would* have put each pair. Appending a
// twenty-first pair rewrites every date on this page.
//
// ## No sitemap
//
// This route is deliberately the crawlable index, because the repo still has no
// `src/app/sitemap.ts` and building one was out of scope here. This page is the
// stand-in a crawler can follow; a sitemap is the separate, better answer.

import type { Metadata } from 'next';
import { Compass } from 'lucide-react';
import { LocaleLink } from '@/components/layout/LocaleLink';
import { ThisWeekBadge, WeekRow } from '@/components/explore/WeekRow';
import { DEFAULT_LOCALE, isLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { getExploreArchive } from '@/i18n/explore';
import { formatWeekDate, isoDay } from '@/i18n/explore-dates';
import { format } from '@/i18n/format';
import { localeAlternates } from '@/i18n/routing';

// The rows move every Monday, so the page needs a clock and an hour's cache —
// the same trade, for the same reason, as /explore. See the note on
// `revalidate` in the molecule permalink route.
export const revalidate = 3600;

export async function generateMetadata(
  props: PageProps<'/[lang]/explore/archive'>
): Promise<Metadata> {
  const { lang } = await props.params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const t = await getDictionary(locale);
  const alternates = localeAlternates('/explore/archive');

  return {
    title: `${t.explore.archiveHeading} | ${t.meta.siteName}`,
    description: t.explore.archiveIntro,
    // Rebuilt for this path: metadata is shallowly merged between segments, so
    // returning `alternates` replaces the root layout's whole object.
    alternates: {
      canonical: alternates[locale],
      languages: {
        ...alternates,
        'x-default': alternates[DEFAULT_LOCALE],
      },
    },
  };
}

export default async function ExploreArchivePage(props: PageProps<'/[lang]/explore/archive'>) {
  const { lang } = await props.params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const t = await getDictionary(locale);

  // One clock, as everywhere else in this feature.
  const rotation = getExploreArchive(locale, new Date());

  return (
    <main className="min-h-screen bg-(--background) px-4 py-8 text-(--foreground) md:px-8">
      <div className="mx-auto max-w-4xl">
        <LocaleLink
          href="/explore"
          className="mb-6 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-(--muted) transition hover:text-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
        >
          {t.explore.backToExplore}
        </LocaleLink>

        <header>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500 text-white">
              <Compass className="h-5 w-5" aria-hidden="true" />
            </span>
            {/* `min-w-0` / `break-words`: the German and Russian headings are
                long compounds, and at text-4xl in a 320px viewport an
                unbreakable one would push the document sideways. */}
            <h1 className="min-w-0 text-4xl font-black break-words md:text-5xl">
              {t.explore.archiveHeading}
            </h1>
          </div>
          <p className="mt-2 text-base text-(--muted)">{t.explore.archiveIntro}</p>
        </header>

        <ul className="mt-8 space-y-3">
          {rotation.map((entry) => {
            // The most recent week it ran, or — before its first — the week it
            // is next due. Both are a single real week, so both can carry a
            // `<time>`; it is only the *permalink's* two-date sentence that
            // cannot. See src/components/explore/EntryDates.tsx.
            const shown = entry.lastFeatured ?? entry.nextFeatured;
            return (
              <WeekRow
                key={entry.molecule.id}
                dateLabel={
                  entry.lastFeatured
                    ? format(t.explore.dateline, { date: formatWeekDate(locale, shown) })
                    : format(t.explore.featuredNever, {
                        date: formatWeekDate(locale, shown),
                      })
                }
                dateTime={isoDay(shown)}
                badge={
                  entry.isCurrentWeek ? (
                    <ThisWeekBadge label={t.explore.archiveThisWeek} />
                  ) : undefined
                }
                molecule={entry.molecule}
                scientist={entry.scientist}
              />
            );
          })}
        </ul>
      </div>
    </main>
  );
}
