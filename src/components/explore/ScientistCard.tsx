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
        Picture beside the prose from `lg`, stacked below it — see the long note
        on the same block in `MoleculeCard`, including why the tracks are
        `minmax(0,…)` and not bare `fr`.

        The cap matters more here than it does on a molecule: a scientist's
        picture is a portrait, so it is the tall one, and it is the half of the
        pool still mostly without pictures — which means this has to be right
        on the day a real photograph lands rather than tested only against
        placeholders.
      */}
      <div
        className={`mt-6 grid items-start gap-6 ${
          scientist.image ? 'lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]' : ''
        }`}
      >
        {scientist.image && (
          // The alt is built from the name, which is never translated, so this
          // one string reads the same in every locale apart from the word in
          // front of it.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={scientist.image.src}
            alt={format(t.explore.scientistImageA11y, { name: scientist.name })}
            width={scientist.image.width}
            height={scientist.image.height}
            className="max-h-80 w-full min-w-0 rounded-2xl border border-(--border) bg-(--background) object-contain"
          />
        )}

        {/* No picture: the prose takes the whole width rather than leaving an
            empty column beside it. */}
        <div className="min-w-0 space-y-5">
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
