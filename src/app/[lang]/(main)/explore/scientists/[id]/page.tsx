// src/app/[lang]/(main)/explore/scientists/[id]/page.tsx
//
// One chemist, on a URL that never expires.
//
// The molecule route next door carries the full reasoning — why the id is the
// segment, why `generateStaticParams` returns the whole pool rather than the
// scheduled part of it, why `revalidate` is still needed on a static page, and
// why there is no `openGraph.images`. This file is the same shape with the
// other pool and the other card.
//
// The one thing specific to this side: **nothing here renders `represents`**,
// and `LocalizedScientist` does not carry it, so a permalink cannot leak the
// scheduling metadata even by accident. `explore.md` AC-7 and the note at the
// top of `ScientistCard` are why that matters.

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { LocaleLink } from '@/components/layout/LocaleLink';
import { ScientistCard } from '@/components/explore/ScientistCard';
import { MoleculeEntryLink, scientistHref } from '@/components/explore/EntryLink';
import { DEFAULT_LOCALE, isLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import {
  exploreLinkTarget,
  exploreScientistIds,
  findLocalizedScientist,
  getEntryRotation,
} from '@/i18n/explore';
import { formatShortDate } from '@/i18n/explore-dates';
import { openingSentences } from '@/lib/explore/prose';
import { localeAlternates } from '@/i18n/routing';

export const revalidate = 3600;

export async function generateStaticParams() {
  return exploreScientistIds().map((id) => ({ id }));
}

export async function generateMetadata(
  props: PageProps<'/[lang]/explore/scientists/[id]'>
): Promise<Metadata> {
  const { lang, id } = await props.params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const t = await getDictionary(locale);
  const scientist = findLocalizedScientist(locale, id);

  if (!scientist) return { title: t.meta.exploreEntryNotFound };

  const alternates = localeAlternates(scientistHref(id));

  return {
    // A person's name is never translated, so the title differs between locales
    // only in the words around it — which is correct, and is the same thing the
    // card does.
    title: `${scientist.name} | ${t.explore.heading} | ${t.meta.siteName}`,
    description: openingSentences(scientist.work),
    // Rebuilt for this path: metadata is shallowly merged, so returning
    // `alternates` replaces the layout's whole object. See the molecule route.
    alternates: {
      canonical: alternates[locale],
      languages: {
        ...alternates,
        'x-default': alternates[DEFAULT_LOCALE],
      },
    },
  };
}

export default async function ScientistPermalinkPage(
  props: PageProps<'/[lang]/explore/scientists/[id]'>
) {
  const { lang, id } = await props.params;
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const t = await getDictionary(locale);

  const scientist = findLocalizedScientist(locale, id);
  if (!scientist) notFound();

  const rotation = getEntryRotation(locale, 'scientist', id, new Date());
  const link = exploreLinkTarget(locale, t, scientist.link);

  return (
    <main className="min-h-screen bg-(--background) px-4 py-8 text-(--foreground) md:px-8">
      <div className="mx-auto max-w-4xl">
        <LocaleLink
          href="/explore"
          className="mb-6 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-(--muted) transition hover:text-(--link) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--link)"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
          {t.explore.backToExplore}
        </LocaleLink>


        <ScientistCard
          scientist={scientist}
          linkHref={link.href}
          linkTitle={link.title}
          verifiedOn={formatShortDate(locale, scientist.sourcesVerifiedOn)}
          t={t}
          headingId="explore-entry"
          standalone
        />

        {rotation && (
          <section aria-labelledby="explore-pair" className="mt-8">
            <h2
              id="explore-pair"
              className="text-xs font-black uppercase tracking-widest text-(--muted)"
            >
              {t.explore.sameWeekHeading}
            </h2>
            <div className="mt-3 flex">
              <MoleculeEntryLink molecule={rotation.molecule} />
            </div>
          </section>
        )}

        <LocaleLink
          href="/explore/archive"
          className="mt-8 inline-flex min-h-11 items-center rounded-xl border-2 border-(--border) bg-(--surface) px-4 py-2.5 text-xs font-black uppercase tracking-wider text-(--foreground) transition hover:border-(--link) hover:text-(--link) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--link)"
        >
          {t.explore.archiveCta}
        </LocaleLink>
      </div>
    </main>
  );
}
