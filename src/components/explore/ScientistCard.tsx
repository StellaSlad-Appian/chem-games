// src/components/explore/ScientistCard.tsx

import { Microscope, Scale } from 'lucide-react';
import { InwardLink } from './InwardLink';
import { format } from '@/i18n/format';
import { SourceList } from './SourceList';
import type { Dictionary } from '@/i18n/dictionaries';
import type { LocalizedScientist } from '@/i18n/explore';

/**
 * Scientist of the Week.
 *
 * **There is nothing here that renders `represents`, and there must never be.**
 * The field exists so a test can prove the schedule stays balanced; putting it
 * on screen — as a label, a badge, a filter or a colour — is the bias the
 * section is trying to correct, because being marked out as "the woman" is
 * itself the thing. `LocalizedScientist` does not even carry the field, so this
 * is a shape guarantee and not only a promise.
 *
 * The optional credit line renders last, visibly separate, and only when the
 * entry has one. The body above it always leads with the science.
 */
export function ScientistCard({
  scientist,
  linkHref,
  linkTitle,
  verifiedOn,
  t,
  headingId,
  standalone = false,
}: {
  scientist: LocalizedScientist;
  linkHref: string;
  linkTitle: string;
  /** Already formatted with `Intl` by the page — never assembled here. */
  verifiedOn: string;
  t: Dictionary;
  headingId: string;
  /**
   * True on the entry's own permalink, where this card *is* the page. See the
   * long note on the same prop in `MoleculeCard`: the eyebrow and its icon are
   * permalink-only, the name is the heading either way (`<h1>` here, `<h2>`
   * under the tab layout's "Explore"), `aria-labelledby` points at the name,
   * and everything inside moves with it so the heading tree never skips a
   * level.
   */
  standalone?: boolean;
}) {
  const NameTag = standalone ? 'h1' : 'h2';
  const SubTag = standalone ? 'h2' : 'h3';

  return (
    <section
      aria-labelledby={headingId}
      className="rounded-3xl border-2 border-(--border) bg-(--surface) p-6 shadow-md md:p-8"
    >
      {/* The microscope badge goes with the eyebrow — inside the tabs it lives
          on the Scientist pill instead. See the note in `MoleculeCard`. */}
      {standalone && (
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
            <Microscope className="h-4 w-4" aria-hidden="true" />
          </span>
          <p className="text-xs font-black uppercase tracking-widest text-(--muted)">
            {t.explore.scientistHeading}
          </p>
        </div>
      )}

      <div
        className={`flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4 ${
          standalone ? 'mt-4' : ''
        }`}
      >
        {/* `min-w-0` / `break-words`: see the note on the same line in MoleculeCard. */}
        <NameTag
          id={headingId}
          className="min-w-0 text-3xl font-black break-words text-(--foreground) md:text-4xl"
        >
          {scientist.name}
        </NameTag>
        {/* Dates, so never translated and never in an overlay. */}
        <p className="shrink-0 font-mono text-sm font-bold text-(--muted)">
          {scientist.lifespan}
        </p>
      </div>

      {/*
        The portrait floats into the top-left of the prose — see the long note
        on the same block in `MoleculeCard` for why a float and not a column,
        and why this container must stay a plain block.

        It matters more here than on a molecule. A portrait is the tall shape,
        and in a fixed column a tall picture holds the text in a narrow ribbon
        for its whole height; floated, the text wraps past the chin of the
        photograph and then runs full width underneath it. This is also the
        half of the pool still mostly on placeholders, so the orientation rule
        below has to be right on the day a real photograph lands rather than
        tested only against the 720×400 placeholder, which is landscape and so
        is *not* representative of what will replace it.
      */}
      <div className="mt-6">
        {scientist.image && (
          // The alt is built from the name, which is never translated, so this
          // one string reads the same in every locale apart from the word in
          // front of it.
          //
          // Which string depends on what the picture is *of*. Most entries
          // carry a portrait; a few carry a picture of the person's work
          // instead, because no free portrait of them exists. Calling a
          // photograph of a 1902 manuscript "Picture: Gilbert N. Lewis" would
          // be a lie told to exactly the readers who cannot see it to check —
          // so `subject` picks the string, and the two are translated
          // separately in all six locales.
          // A `<figure>`, and the float moved onto it from the picture, so the
          // credit below travels with the picture it credits instead of
          // wrapping into the prose on its own. `<figcaption>` is what ties
          // the two together for a screen reader.
          <figure
            className={`mb-4 sm:float-left sm:mr-6 sm:mb-3 ${
              scientist.image.height > scientist.image.width
                ? 'sm:w-1/3 sm:max-w-[210px]'
                : 'sm:w-2/5 sm:max-w-sm'
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={scientist.image.src}
              alt={format(
                scientist.image.subject === 'work'
                  ? t.explore.scientistWorkImageA11y
                  : t.explore.scientistImageA11y,
                { name: scientist.name },
              )}
              width={scientist.image.width}
              height={scientist.image.height}
              className="h-auto w-full rounded-2xl border border-(--border) bg-(--background)"
            />
            {scientist.image.credit && (
              /*
                The licence credit, and it is not optional decoration: most of
                the free photographs of 20th-century chemists are CC BY or CC
                BY-SA, and both require the credit to reach the reader. This
                line is the condition on which the picture above may be shown
                at all. An entry whose licence asks for nothing — a
                public-domain file — still names the photographer here, which
                costs one line and is the same courtesy the sources list pays.

                Assembled from fields rather than stored as a sentence: every
                piece is a proper name or a URL, so there is nothing here to
                translate, and docs/i18n/README.md forbids building a sentence
                out of parts in any case. The separators are the card's, not
                the data's.
              */
              <figcaption className="mt-1.5 text-[11px] leading-snug text-(--muted)">
                <span>{scientist.image.credit.author}</span>
                {' · '}
                {scientist.image.credit.licenceUrl ? (
                  <a
                    href={scientist.image.credit.licenceUrl}
                    target="_blank"
                    rel="noopener noreferrer license"
                    className="underline decoration-dotted underline-offset-2 transition hover:text-(--link) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--link)"
                  >
                    {scientist.image.credit.licence}
                    <span className="sr-only"> {t.common.opensInNewTab}</span>
                  </a>
                ) : (
                  // Public domain: a statement, not a licence, so there are no
                  // terms to link to.
                  <span>{scientist.image.credit.licence}</span>
                )}
                {' · '}
                <a
                  href={scientist.image.credit.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-dotted underline-offset-2 transition hover:text-(--link) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--link)"
                >
                  {t.explore.imageSourceLabel}
                  <span className="sr-only"> {t.common.opensInNewTab}</span>
                </a>
              </figcaption>
            )}
          </figure>
        )}

        {/* A bare `<div>`: anything that establishes a block formatting context
            here would sit beside the float instead of wrapping it. With no
            picture there is no float, and the prose fills the width. */}
        <div className="space-y-5">
          <div>
            <SubTag className="text-[10px] font-black uppercase tracking-widest text-(--muted)">
              {t.explore.workHeading}
            </SubTag>
            <p className="mt-1.5 text-sm leading-relaxed text-(--foreground) md:text-base">
              {scientist.work}
            </p>
          </div>
          <div>
            <SubTag className="text-[10px] font-black uppercase tracking-widest text-(--muted)">
              {t.explore.legacyHeading}
            </SubTag>
            <p className="mt-1.5 text-sm leading-relaxed text-(--foreground) md:text-base">
              {scientist.legacy}
            </p>
          </div>
        </div>

        {/*
          Ends the float — see the same note in `MoleculeCard`. It matters more
          on this card, because the block immediately below is the attribution
          credit, and a licence line wrapping around the very photograph it is
          crediting would be both ugly and slightly absurd.
        */}
        <div className="clear-both" />
      </div>

      {scientist.credit && (
        <div className="mt-6 rounded-2xl border border-(--border) bg-(--background) p-4">
          <SubTag className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-(--muted)">
            <Scale className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {t.explore.creditHeading}
          </SubTag>
          <p className="mt-1.5 text-sm leading-relaxed text-(--muted)">{scientist.credit}</p>
        </div>
      )}

      <InwardLink pattern={t.explore.scientistCta} href={linkHref} title={linkTitle} />

      <SourceList
        heading={t.explore.sourcesHeading}
        sources={scientist.sources}
        note={t.explore.sourcesNote}
        verifiedOn={verifiedOn}
        opensInNewTab={t.common.opensInNewTab}
        headingTag={SubTag}
      />
    </section>
  );
}
