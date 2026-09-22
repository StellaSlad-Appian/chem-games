// src/app/[lang]/(main)/explore/(tabs)/scientist/page.tsx
//
// Explore: the scientist tab.
//
// The other half of the week. The molecule and the chemist are still scheduled
// as a pair, still turn over on the same Monday 00:00 UTC boundary and still
// share a theme and usually a link target (explore.md AC-3, unchanged by §9).
// What changed is that the reader sees one at a time.
//
// ## Why this one has a segment and the molecule does not
//
// `/explore` *is* the molecule tab — a layout's `useSelectedLayoutSegment`
// returns `null` for its own route, so nothing needs a `/explore/molecule` to
// point at. The scientist has no such free slot and so gets a real segment,
// which stays English in every locale like every other segment on the site:
// `/de/explore/scientist`, not `/de/explore/forschende`.
//
// ## Revalidation
//
// The same literal 3600 as its two sibling tabs and for the same reason — see
// the header of `../page.tsx`, which documents the check against the shipped
// Next docs. The pair turns over weekly, so an hour is short enough that the
// new chemist appears promptly without a deploy.

import type { Metadata } from 'next';
import { ScientistCard } from '@/components/explore/ScientistCard';
import { DEFAULT_LOCALE, isLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { exploreLinkTarget, getExploreContent } from '@/i18n/explore';
import { formatShortDate } from '@/i18n/explore-dates';
import { localeAlternates } from '@/i18n/routing';

export const revalidate = 3600;

export async function generateMetadata(
  props: PageProps<'/[lang]/explore/scientist'>
): Promise<Metadata> {
  const { lang } = await props.params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const t = await getDictionary(locale);
  const alternates = localeAlternates('/explore/scientist');

  return {
    // `scientistHeading` rather than the tab's one-word label: a browser tab, a
    // bookmark and a search result all have room for the long form, and "Explore
    // | chem-games" on two of three tabs would make them indistinguishable.
    title: `${t.explore.scientistHeading} | ${t.meta.siteName}`,
    // Deliberately **not** the chemist's own prose. The entry changes every
    // Monday and this URL does not, so a description built from the current
    // entry would describe whoever happened to be showing when a crawler last
    // called. The permalinks are the pages that describe one person, and they
    // do exactly that (see `explore/scientists/[id]/page.tsx`).
    description: t.explore.intro,
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

export default async function ExploreScientistPage(
  props: PageProps<'/[lang]/explore/scientist'>
) {
  const { lang } = await props.params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const t = await getDictionary(locale);

  // One clock, as everywhere else in this feature — and the second reading on
  // this route tree, the first being the tab layout's. See `../layout.tsx`.
  const week = getExploreContent(locale, new Date());
  const scientistLink = exploreLinkTarget(locale, t, week.scientist.link);

  return (
    // Section content only. The `<main>`, the container, the `<h1>`, the intro
    // and the dateline all belong to `(tabs)/layout.tsx`.
    <div className="mt-8">
      <ScientistCard
        scientist={week.scientist}
        linkHref={scientistLink.href}
        linkTitle={scientistLink.title}
        verifiedOn={formatShortDate(locale, week.scientist.sourcesVerifiedOn)}
        t={t}
        headingId="explore-scientist"
      />
    </div>
  );
}
