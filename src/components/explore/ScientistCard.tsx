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
}: {
  scientist: LocalizedScientist;
  linkHref: string;
  linkTitle: string;
  /** Already formatted with `Intl` by the page — never assembled here. */
  verifiedOn: string;
  t: Dictionary;
  headingId: string;
}) {
  return (
    <section
      aria-labelledby={headingId}
      className="rounded-3xl border-2 border-(--border) bg-(--surface) p-6 shadow-md md:p-8"
    >
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
          <Microscope className="h-4 w-4" aria-hidden="true" />
        </span>
        <h2
          id={headingId}
          className="text-xs font-black uppercase tracking-widest text-(--muted)"
        >
          {t.explore.scientistHeading}
        </h2>
      </div>

      <div className="mt-4 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <h3 className="text-3xl font-black text-(--foreground) md:text-4xl">{scientist.name}</h3>
        {/* Dates, so never translated and never in an overlay. */}
        <p className="shrink-0 font-mono text-sm font-bold text-(--muted)">
          {scientist.lifespan}
        </p>
      </div>

      {scientist.image && (
        // See the note on MoleculeCard. The alt is built from the name, which is
        // never translated, so this one string reads the same in every locale
        // apart from the word in front of it.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={scientist.image.src}
          alt={format(t.explore.scientistImageA11y, { name: scientist.name })}
          width={scientist.image.width}
          height={scientist.image.height}
          className="mt-6 h-auto w-full rounded-2xl border border-(--border) bg-(--background)"
        />
      )}

      <div className="mt-6 space-y-5">
        <div>
          <h4 className="text-[10px] font-black uppercase tracking-widest text-(--muted)">
            {t.explore.workHeading}
          </h4>
          <p className="mt-1.5 text-sm leading-relaxed text-(--foreground) md:text-base">
            {scientist.work}
          </p>
        </div>
        <div>
          <h4 className="text-[10px] font-black uppercase tracking-widest text-(--muted)">
            {t.explore.legacyHeading}
          </h4>
          <p className="mt-1.5 text-sm leading-relaxed text-(--foreground) md:text-base">
            {scientist.legacy}
          </p>
        </div>
      </div>

      {scientist.credit && (
        <div className="mt-6 rounded-2xl border border-(--border) bg-(--background) p-4">
          <h4 className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-(--muted)">
            <Scale className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {t.explore.creditHeading}
          </h4>
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
      />
    </section>
  );
}
