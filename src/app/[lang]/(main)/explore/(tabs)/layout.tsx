// src/app/[lang]/(main)/explore/(tabs)/layout.tsx
//
// The shared header for the three Explore tabs.
//
// ## Why this is a route group and not `explore/layout.tsx`
//
// A layout at `explore/layout.tsx` would wrap `explore/molecules/[id]` and
// `explore/scientists/[id]` as well, and give every permalink a tab strip and
// an "Explore" `<h1>` — which is precisely the heading the `standalone` mode of
// the cards exists to avoid, because on a permalink the entry's own name is the
// `h1`. A route group opts the three tabs into this layout and leaves the forty
// permalinks out of it (route-groups.md: the folder name in parentheses "should
// not be included in the route's URL path"), so `/explore/archive` keeps the
// address and the inbound links the archive shipped with.
//
// ## The URL segments stay English in every locale
//
// `/de/explore/scientist`, not `/de/entdecken/forschende` — the rule at the top
// of `(tabs)/page.tsx`, unchanged by this file. One route shape to reason
// about, and a link that survives being pasted into a chat in another language.
//
// ## Revalidation
//
// `export const revalidate = 3600`, the same hour as each of the three pages
// below it and for the same reason: this layout now reads the clock too, for
// the dateline and for the two entry names on the strip, so it has exactly the
// same staleness as the pages. The route segment config is checked against the
// shipped docs per AGENTS.md — caching-without-cache-components.md § "Route
// segment config `revalidate`" documents it for "a layout or page", and in Next
// 16 the export is removed only when Cache Components is enabled, which this
// app does not do (there is no `cacheComponents` in next.config.ts). The
// literal 3600 rather than `60 * 60` because the same doc requires the value to
// be statically analysable.
//
// ## Two clocks, and why that is allowed to stand
//
// `explore/(tabs)/page.tsx` used to be the only place in the feature that
// called `new Date()`. It is now the second: this layout takes its own reading,
// because a layout cannot pass data to its children (layout.md § "Fetching
// Data" — "Layouts cannot pass data to their `children`") and the alternatives
// are worse than the duplication. Threading the value would mean a context
// provider, which makes the week's content a client concern, or a search param,
// which puts a timestamp in every URL.
//
// The two readings can only disagree across a Monday 00:00 UTC boundary, in the
// millisecond window between the layout rendering and the page rendering, and
// the hourly `revalidate` already bounds how stale either of them may be. The
// visible failure would be a pill naming last week's molecule above this week's
// card, for at most one render of one cached response.
//
// Both stay testable the way they were: neither derives anything from the clock
// itself, both hand `now` straight to `getExploreContent`, and `vi.setSystemTime`
// pins the pair together.

import { Compass } from 'lucide-react';
import { ExploreTabs } from '@/components/explore/ExploreTabs';
import { DEFAULT_LOCALE, isLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { getExploreContent } from '@/i18n/explore';
import { formatWeekDate, isoDay } from '@/i18n/explore-dates';
import { format } from '@/i18n/format';

export const revalidate = 3600;

export default async function ExploreTabsLayout(props: LayoutProps<'/[lang]/explore'>) {
  const { lang } = await props.params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const t = await getDictionary(locale);

  // See "Two clocks" above. The page below takes its own reading.
  const week = getExploreContent(locale, new Date());

  return (
    /*
      The `<main>` and the page container live here, once, for all three tabs.
      Each tab page renders section content only and must not open a second
      `<main>` — the (main) group's layout already wraps everything in one, and
      a third landmark would be one more than a screen reader should be offered.

      `max-w-4xl`, not the `lg:max-w-6xl` the two-column grid needed. With one
      card per tab there is no second column to make room for, and 896px is what
      the permalinks already use for exactly the same card — so a molecule looks
      the same width whether it is reached through the tab or through its own
      URL, and the archive rows keep the measure they shipped with.
    */
    <main className="min-h-screen bg-(--background) px-4 py-8 text-(--foreground) md:px-8">
      <div className="mx-auto max-w-4xl">
        <header>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-(--action) text-white">
              <Compass className="h-5 w-5" aria-hidden="true" />
            </span>
            {/*
              `text-3xl`, down from `text-4xl md:text-5xl`.

              48px was right when "Explore" was the only headline on the page.
              Under a tab strip it is wayfinding — the reader already knows
              where they are — and at its old size it competed with an entry
              name of nearly the same size 150px below it. `min-w-0` /
              `break-words` because "Entdecken" is one unbreakable word and
              this is a flex item; «Мир открытий» has its own space to wrap
              on, but the classes stay for German and any narrower viewport.
            */}
            <h1 className="min-w-0 text-3xl font-black break-words">{t.explore.heading}</h1>
          </div>
          <p className="mt-2 text-base text-(--muted)">{t.explore.intro}</p>

          <ExploreTabs
            t={t}
            moleculeName={week.molecule.name}
            scientistName={week.scientist.name}
            dateline={format(t.explore.dateline, {
              date: formatWeekDate(locale, week.weekStart),
            })}
            datelineIso={isoDay(week.weekStart)}
          />
        </header>

        {props.children}
      </div>
    </main>
  );
}
