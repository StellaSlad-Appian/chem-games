// src/app/[lang]/(main)/explore/molecules/[id]/page.tsx
//
// One molecule, on a URL that never expires.
//
// ## Why this route exists
//
// Before it, forty entries shared one URL and thirty-nine of them were
// invisible: unlinkable, unshareable and uncrawlable, for the five months
// between one appearance and the next. `explore.md` §7 named per-entry
// permalinks as the out-of-scope item where the real value was.
//
// **Nothing here expires.** The ten-row list on /explore is a display limit;
// this page is the lifetime. An entry that ran in the site's first week still
// resolves, still renders, and still says where it sits in the rotation.
//
// ## Why the id is the segment
//
// `id` is already stable, already locale-independent and already the filename
// of the entry's picture (docs/EXPLORE_IMAGES.md). So `/de/explore/molecules/
// sodium-sulfate` is the German page for the same entry, a link survives being
// pasted into a chat in another language, and there is no per-locale routing
// table — exactly as `/de/cheat-sheets/acids-and-bases` already works.
//
// ## Static generation, and why `revalidate` is still here
//
// `generateStaticParams` returns the **whole pool**, not the scheduled part of
// it, so every entry is prerendered in every locale. The `lang` values come
// from the root layout's own `generateStaticParams` and Next combines the two —
// node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-static-params.md,
// "the child generateStaticParams function is executed once for each set of
// params the parent generates".
//
// The page still needs a clock, because "last featured" moves every Monday, so
// `revalidate = 3600` matches /explore: prerendered at build, refreshed within
// the hour, never rendered per request. The route segment config is checked
// against the shipped docs per AGENTS.md — in Next 16 `revalidate` is removed
// only when Cache Components is enabled, and this app does not enable it (there
// is no `cacheComponents` in next.config.ts). The value is the literal 3600
// because the same doc requires it to be statically analysable.

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { LocaleLink } from '@/components/layout/LocaleLink';
import { MoleculeCard } from '@/components/explore/MoleculeCard';
import { EntryDates } from '@/components/explore/EntryDates';
import { ScientistEntryLink } from '@/components/explore/EntryLink';
import { moleculeHref } from '@/components/explore/EntryLink';
import { DEFAULT_LOCALE, isLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import {
  exploreLinkTarget,
  exploreProseIsUntranslated,
  findLocalizedMolecule,
  getEntryRotation,
  exploreMoleculeIds,
} from '@/i18n/explore';
import { formatShortDate } from '@/i18n/explore-dates';
import { openingSentences } from '@/lib/explore/prose';
import { localeAlternates } from '@/i18n/routing';

export const revalidate = 3600;

export async function generateStaticParams() {
  // Every molecule in the pool, including any retired with `isActive: false`.
  // A permalink that stopped resolving when an entry left the rotation would be
  // the one thing this route exists to prevent.
  return exploreMoleculeIds().map((id) => ({ id }));
}

export async function generateMetadata(
  props: PageProps<'/[lang]/explore/molecules/[id]'>
): Promise<Metadata> {
  const { lang, id } = await props.params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const t = await getDictionary(locale);
  const molecule = findLocalizedMolecule(locale, id);

  if (!molecule) return { title: t.meta.exploreEntryNotFound };

  const alternates = localeAlternates(moleculeHref(id));

  return {
    title: `${molecule.name} | ${t.explore.heading} | ${t.meta.siteName}`,
    // The entry's own prose, in whole sentences. Writing a separate description
    // would be 40 entries × six languages of copy that goes stale the moment a
    // paragraph is edited — see src/lib/explore/prose.ts.
    description: openingSentences(molecule.everyday),
    // Metadata merges between segments but does **not** deep-merge, so
    // returning `alternates` here replaces the root layout's whole object. It
    // has to be rebuilt for this path or every locale would inherit the site
    // root's canonical. Checked against the shipped docs: generate-metadata.md,
    // "Metadata objects exported from multiple segments … are **shallowly**
    // merged".
    alternates: {
      canonical: alternates[locale],
      languages: {
        ...alternates,
        'x-default': alternates[DEFAULT_LOCALE],
      },
    },
    // No `openGraph.images`. Every picture slot currently holds a placeholder
    // SVG — a dashed frame reading "PICTURE TO COME" — and two things are wrong
    // with sharing it: SVG is not a format Facebook, X or LinkedIn will render
    // as a preview image at all, and the one they would render says the picture
    // is missing. A card with no image beats a card with a broken one. Worth
    // revisiting the day real raster pictures land (docs/EXPLORE_IMAGES.md).
  };
}

export default async function MoleculePermalinkPage(
  props: PageProps<'/[lang]/explore/molecules/[id]'>
) {
  const { lang, id } = await props.params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const t = await getDictionary(locale);

  const molecule = findLocalizedMolecule(locale, id);
  if (!molecule) notFound();

  // The only clock on this page, passed down. Everything below is a pure
  // function of it, so a test can pin a date and see every sentence change.
  const rotation = getEntryRotation(locale, 'molecule', id, new Date());
  const link = exploreLinkTarget(locale, t, molecule.link);

  return (
    <main className="min-h-screen bg-(--background) px-4 py-8 text-(--foreground) md:px-8">
      <div className="mx-auto max-w-4xl">
        <LocaleLink
          href="/explore"
          className="mb-6 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-(--muted) transition hover:text-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
          {t.explore.backToExplore}
        </LocaleLink>

        {/*
          The same notice the week page carries, for the same reason and in the
          same place — above the English prose rather than below it. A permalink
          is the *likeliest* page for a Russian reader to arrive at cold, from a
          search result or a shared link, with no page above it to have
          explained anything. Leaving it off here would have been the easy
          oversight: docs/feature-briefs/explore.md §0c is about the reader, not
          about one route.
        */}
        {exploreProseIsUntranslated(locale) && (
          <p className="mb-6 rounded-xl border border-(--border) bg-(--surface) px-4 py-3 text-sm text-(--muted)">
            {t.explore.untranslatedNotice}
          </p>
        )}

        <MoleculeCard
          molecule={molecule}
          linkHref={link.href}
          linkTitle={link.title}
          verifiedOn={formatShortDate(locale, molecule.sourcesVerifiedOn)}
          t={t}
          headingId="explore-entry"
          standalone
        />

        {rotation && <EntryDates rotation={rotation} locale={locale} t={t} />}

        {/*
          The other half of the week. The molecule and the scientist are
          scheduled as a pair and usually share a destination, so the pair is
          the unit of meaning — a permalink that did not link to its partner
          would break the one relationship the schedule encodes.
        */}
        {rotation && (
          <section aria-labelledby="explore-pair" className="mt-8">
            <h2
              id="explore-pair"
              className="text-xs font-black uppercase tracking-widest text-(--muted)"
            >
              {t.explore.sameWeekHeading}
            </h2>
            <div className="mt-3 flex">
              <ScientistEntryLink scientist={rotation.scientist} />
            </div>
          </section>
        )}

        <LocaleLink
          href="/explore/archive"
          className="mt-8 inline-flex min-h-11 items-center rounded-xl border-2 border-(--border) bg-(--surface) px-4 py-2.5 text-xs font-black uppercase tracking-wider text-(--foreground) transition hover:border-blue-500 hover:text-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
        >
          {t.explore.archiveCta}
        </LocaleLink>
      </div>
    </main>
  );
}
