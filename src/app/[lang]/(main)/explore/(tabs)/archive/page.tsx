// src/app/[lang]/(main)/explore/(tabs)/archive/page.tsx
//
// The index: every pair in the rotation, most recent first.
//
// ## What the tab strip took, and what it gave back
//
// This page used to open with its own `<h1>`, its own intro paragraph and a
// "Back to Explore" link. All three are done better one level up now: the
// `(tabs)` layout owns the heading and the intro, and the strip is a better way
// back than a single link because it also says where else there is to go. So
// the page starts at `<h2>` and every level below it shifts with it.
//
// In exchange it gained the **recent-weeks list** that used to sit at the foot
// of `/explore`. It belongs here: it is history, and this is the history tab.
// On the molecule tab it was a third thing below the card, and the card is what
// that tab is for.
//
// The two lists are not redundant. The recent list is *what ran, week by week,
// newest first* and it is short; the rotation below is *every pair, once each*
// and it is complete. A pair that ran three times appears once in the rotation
// and up to three times in the recent list, which is the honest answer to two
// different questions.
//
// ## Not months, and not "only what has been featured"
//
// The brief offered "grouped by month or by rotation order, whichever reads
// better once you see the data". Two things about a month grouping only show up
// once you try it:
//
//   1. **A pair recurs.** With a twenty-week cycle, benzene appears in January,
//      then June, then November. Grouped by month it is three rows for one
//      pair, and a reader scanning for "the benzene one" finds it three times
//      and cannot tell which is the real one. Here it is one row, dated by its
//      most recent week.
//   2. **A month grouping is empty at launch**, and so is "every entry that has
//      been featured". At `weekIndex` 0 nothing has run. The index would be a
//      heading over nothing on the day the site most needs to be crawlable, and
//      would grow one row a week for five months. Listing the whole rotation is
//      complete from day one and is what makes all forty permalinks reachable
//      in one hop, which is the point of having an index.
//
// ## And not rotation order either, which is what this was
//
// Rotation order is the curated order — `schedule.ts` alternates `represents`
// prefix by prefix — and it was the obvious answer until the dates were on
// screen. The German page at 320px read: 25 May, 1 June, … 14 September
// (**this week**), 4 May, 11 May, 18 May. Every one of those is true, because
// the pairs after the current one in the cycle last ran before the wrap, and
// the whole column looks broken — a reader cannot see that the rotation
// wrapped, only that a sorted list is not sorted.
//
// So the rows are ordered by the date they carry: what has run, newest week
// first, then what has not, soonest first. `archiveRotation` does the sorting
// and carries the same note. The curated order is still in `schedule.ts`,
// which is where it belongs.
//
// Each row says where it stands: the week it last ran, or — before its first —
// the week it is next due. The one row that is the current week is marked, and
// it is the top row.
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
import { ThisWeekBadge, WeekRow } from '@/components/explore/WeekRow';
import { DEFAULT_LOCALE, isLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { getExploreArchive, getExploreRecent } from '@/i18n/explore';
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

  // One clock for both lists on this page — and the second reading on this
  // route tree, the first being the tab layout's. See `../layout.tsx`.
  const now = new Date();
  const recent = getExploreRecent(locale, now);
  const rotation = getExploreArchive(locale, now);

  return (
    // Section content only: the `<main>`, the container, the `<h1>`, the intro
    // and the dateline all belong to `(tabs)/layout.tsx`.
    <>
      {/*
        The weeks before this one, moved here from the foot of /explore.

        Rendered only when there are any. At launch — and for anyone running
        the site with a clock before ROTATION_EPOCH — there is no history at
        all, and an empty "Recent weeks" heading over nothing is worse than no
        heading: it reads as a page that failed to load its own content. That
        is truer here than it was on /explore, because this tab's whole promise
        is history.

        Ten rows at most, and that is a display limit and not a lifetime. Every
        entry that falls off this list keeps its permalink, keeps its place in
        the rotation below, and comes round again on schedule.
      */}
      {recent.length > 0 && (
        <section aria-labelledby="explore-recent" className="mt-8">
          <h2
            id="explore-recent"
            className="text-xs font-black uppercase tracking-widest text-(--muted)"
          >
            {t.explore.recentHeading}
          </h2>
          <ul className="mt-4 space-y-3">
            {recent.map((past) => (
              <WeekRow
                key={isoDay(past.weekStart)}
                dateLabel={format(t.explore.dateline, {
                  date: formatWeekDate(locale, past.weekStart),
                })}
                dateTime={isoDay(past.weekStart)}
                molecule={past.molecule}
                scientist={past.scientist}
              />
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="explore-rotation" className="mt-12">
        {/* `min-w-0` / `break-words`: the German and Russian headings are long
            compounds, and an unbreakable one in a 320px viewport would push the
            document sideways. Less pressing at `text-xl` than it was at
            `text-4xl`, and kept because the compounds have not got shorter. */}
        <h2
          id="explore-rotation"
          className="min-w-0 text-xl font-black break-words"
        >
          {t.explore.archiveHeading}
        </h2>

        <ul className="mt-4 space-y-3">
          {rotation.map((entry) => {
            // The most recent week it ran, or — before its first — the week it
            // is next due.
            //
            // Only a row that has actually run carries a `<time>`, and it reads
            // "Week of X" and nothing else: the element's content is then the
            // date, which is what `<time>` is for. A row that has not run yet
            // reads "Not featured yet. First up in the week of X", and wrapping
            // that sentence in a `datetime` would be telling a crawler the row
            // *is* that day. Same judgement as the permalink, one step milder —
            // see src/components/explore/EntryDates.tsx.
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
                dateTime={entry.lastFeatured ? isoDay(shown) : undefined}
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
      </section>
    </>
  );
}
