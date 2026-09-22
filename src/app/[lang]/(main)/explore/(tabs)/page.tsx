// src/app/[lang]/(main)/explore/(tabs)/page.tsx
//
// Explore: the molecule tab, and the page `/explore` itself resolves to.
//
// A Server Component under the `(main)` group, so it gets the NavBar and the
// footer and none of the entry prose reaches the client bundle — which matters
// here more than on most pages, because the entries are the largest body of
// text on the site.
//
// ## `/explore` *is* the molecule tab
//
// There is no `/explore/molecule` and no redirect to one. A layout's
// `useSelectedLayoutSegment` returns `null` for its own route, which is exactly
// the signal the strip needs, and it keeps the section at three URLs with no
// duplicate content to canonicalise. The file sits in the `(tabs)` route group,
// which contributes nothing to the URL — see the header of `layout.tsx`.
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
import { MoleculeCard } from '@/components/explore/MoleculeCard';
import { DEFAULT_LOCALE, isLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { exploreLinkTarget, getExploreContent } from '@/i18n/explore';
import { formatShortDate } from '@/i18n/explore-dates';
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

  // The second of the feature's two clock readings — the tab layout above takes
  // the first, for the dateline and for the two names on the strip. A layout
  // cannot pass data to its children, so this is a reading and not a prop; the
  // two can only disagree across a Monday 00:00 UTC boundary, and the hourly
  // `revalidate` bounds the staleness either way. Full reasoning in `layout.tsx`.
  //
  // Everything downstream is still a pure function of this value, which is what
  // lets a test pin a date and see the whole page change.
  const now = new Date();
  const week = getExploreContent(locale, now);

  const moleculeLink = exploreLinkTarget(locale, t, week.molecule.link);

  return (
    /*
      Section content only: no `<main>`, no page container, no `<h1>` and no
      dateline. All four belong to `(tabs)/layout.tsx` now, which renders them
      once for all three tabs.

      The scientist is no longer beside this card — it has a tab of its own, and
      the strip above carries its name, so a reader knows who is there without
      navigating. explore.md §9 has why that trade is the right one, and why the
      recent-weeks list moved to the archive tab rather than staying here.
    */
    <div className="mt-8">
      <MoleculeCard
        molecule={week.molecule}
        linkHref={moleculeLink.href}
        linkTitle={moleculeLink.title}
        verifiedOn={formatShortDate(locale, week.molecule.sourcesVerifiedOn)}
        t={t}
        headingId="explore-molecule"
      />
    </div>
  );
}
