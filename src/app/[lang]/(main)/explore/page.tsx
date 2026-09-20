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
import { ArrowRight, Compass } from 'lucide-react';
import { LocaleLink } from '@/components/layout/LocaleLink';
import { MoleculeCard } from '@/components/explore/MoleculeCard';
import { ScientistCard } from '@/components/explore/ScientistCard';
import { WeekRow } from '@/components/explore/WeekRow';
import { DEFAULT_LOCALE, isLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import {
  exploreLinkTarget,
  exploreProseIsUntranslated,
  getExploreContent,
  getExploreRecent,
} from '@/i18n/explore';
import { formatShortDate, formatWeekDate, isoDay } from '@/i18n/explore-dates';
import { format } from '@/i18n/format';
import { localeAlternates } from '@/i18n/routing';

export const revalidate = 3600;

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
  // function of this value, which is what lets every test pin a date — the
  // recent list below reads the same `now` rather than calling `new Date()` a
  // second time, so the current week and "last week" can never disagree.
  const now = new Date();
  const week = getExploreContent(locale, now);
  const recent = getExploreRecent(locale, now);

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
            <time dateTime={isoDay(week.weekStart)}>
              {format(t.explore.dateline, {
                date: formatWeekDate(locale, week.weekStart),
              })}
            </time>
          </p>

          {/*
            Shown only where the entries' prose has not been translated yet —
            currently Russian alone. Saying so is the price of shipping the page
            in five languages instead of holding it for a sixth: a reader who
            switched to Russian and met English prose with no explanation would
            reasonably read it as a bug. The notice is in their language even
            though what follows is not.
          */}
          {exploreProseIsUntranslated(locale) && (
            <p className="mt-4 rounded-xl border border-(--border) bg-(--surface) px-4 py-3 text-sm text-(--muted)">
              {t.explore.untranslatedNotice}
            </p>
          )}
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

        {/*
          The weeks before this one.

          Rendered only when there are any. At launch — and for anyone running
          the site with a clock before ROTATION_EPOCH — there is no history at
          all, and an empty "Recent weeks" heading over nothing is worse than no
          heading: it reads as a page that failed to load its own content.

          Ten rows at most, and that is a display limit and not a lifetime.
          Every entry that falls off this list keeps its permalink, keeps its
          place in the archive index, and comes round again on schedule. The
          link below goes to the index, which is the whole rotation.
        */}
        {recent.length > 0 && (
          <section aria-labelledby="explore-recent" className="mt-12">
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

        {/*
          Always shown, even with no history: the index lists the whole
          rotation, so it is worth reading on the day the site launches.
        */}
        <LocaleLink
          href="/explore/archive"
          className="group mt-8 inline-flex min-h-11 items-center gap-2 rounded-xl border-2 border-(--border) bg-(--surface) px-4 py-2.5 text-xs font-black uppercase tracking-wider text-(--foreground) transition hover:border-blue-500 hover:text-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
        >
          <span>{t.explore.archiveCta}</span>
          <ArrowRight
            className="h-4 w-4 shrink-0 transition group-hover:translate-x-1"
            aria-hidden="true"
          />
        </LocaleLink>
      </div>
    </main>
  );
}
