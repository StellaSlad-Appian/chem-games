// src/components/explore/MoleculeCard.tsx

import { FlaskConical } from 'lucide-react';
import MoleculeText from '@/components/ui/MoleculeText';
import { InwardLink } from './InwardLink';
import { SourceList } from './SourceList';
import { format } from '@/i18n/format';
import type { Dictionary } from '@/i18n/dictionaries';
import type { LocalizedMolecule } from '@/i18n/explore';

/**
 * Molecule of the Week.
 *
 * Presentational and nothing else: every chemistry fact on this card arrives as
 * a prop from `src/lib/explore/molecules.ts`, and every word of chrome from the
 * `explore` namespace of the dictionary. There is no formula, no name and no
 * sentence written in this file — docs/AGENT_INSTRUCTIONS.md Part B is explicit
 * that chemistry does not live in components, and it is the rule that stops a
 * fact existing in two places and disagreeing with itself.
 *
 * The formula is typeset by the shared `MoleculeText` rather than hand-written
 * `<sub>` tags, and it is given an accessible name that includes the compound's
 * name: screen readers do not read a subscript as chemistry, so "H2O" alone is
 * announced as "H two O" at best and "H2O" as one word at worst.
 */
export function MoleculeCard({
  molecule,
  linkHref,
  linkTitle,
  verifiedOn,
  t,
  headingId,
  standalone = false,
}: {
  molecule: LocalizedMolecule;
  linkHref: string;
  linkTitle: string;
  /** Already formatted with `Intl` by the page — never assembled here. */
  verifiedOn: string;
  t: Dictionary;
  headingId: string;
  /**
   * True on the entry's own permalink, where this card *is* the page.
   *
   * A prop rather than a second component, because everything that makes the
   * card — the formula's accessible name, the picture slot, the inward link,
   * the sources — is identical in both places. Only two things change, and both
   * are about the document rather than the content:
   *
   *   * **The name becomes the `<h1>`.** On /explore two cards sit side by side
   *     under one page heading, so "Molecule of the Week" is the h2 that tells
   *     you which section you are in and the name is an h3 inside it. On a
   *     permalink the page is about one molecule, so its name is the heading of
   *     the page and "Molecule of the Week" is an eyebrow above it — a `<p>`,
   *     not a heading, because it is a label and not a section.
   *   * **Everything below moves up with it**, so the tree is h1 → h2 and never
   *     skips a level.
   *
   * The section's accessible name follows the same logic: "Benzene" on a
   * permalink, "Molecule of the Week" beside a second card that is not.
   */
  standalone?: boolean;
}) {
  const LabelTag = standalone ? 'p' : 'h2';
  const NameTag = standalone ? 'h1' : 'h3';
  const SubTag = standalone ? 'h2' : 'h4';

  return (
    <section
      aria-labelledby={headingId}
      className="rounded-3xl border-2 border-(--border) bg-(--surface) p-6 shadow-md md:p-8"
    >
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
          <FlaskConical className="h-4 w-4" aria-hidden="true" />
        </span>
        <LabelTag
          id={standalone ? undefined : headingId}
          className="text-xs font-black uppercase tracking-widest text-(--muted)"
        >
          {t.explore.moleculeHeading}
        </LabelTag>
      </div>

      <div className="mt-4 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        {/*
          `min-w-0` and `break-words`: this is a flex item at text-3xl, and a
          flex item's automatic minimum size is its longest unbreakable word.
          Without them a long name pushes the whole page past a 320px viewport,
          which is the WCAG 1.4.10 failure docs/ACCESSIBILITY.md forbids and
          which the cheat-sheet detail page already hit.
        */}
        <NameTag
          id={standalone ? headingId : undefined}
          className="min-w-0 text-3xl font-black break-words text-(--foreground) md:text-4xl"
        >
          {molecule.name}
        </NameTag>
        {/*
          The accessible name is a sibling rather than an `aria-label` on
          MoleculeText, because MoleculeText renders a plain <span> and takes no
          ARIA props. Screen readers do not read a subscript as chemistry — "H2O"
          is announced as one word, or as "H two O" — so the name of the compound
          has to be in the announcement, and the typeset version is hidden from
          the accessibility tree so it is not read twice.
        */}
        <p className="shrink-0 sm:text-right">
          {/* The visible label is decorative for a screen reader: the sr-only
              name below already says "…, formula …". */}
          <span
            aria-hidden="true"
            className="block text-[10px] font-black uppercase tracking-widest text-(--muted)"
          >
            {t.explore.formulaLabel}
          </span>
          <span className="sr-only">
            {format(t.explore.formulaA11y, {
              name: molecule.name,
              formula: molecule.formula,
            })}
          </span>
          <span aria-hidden="true">
            <MoleculeText
              formula={molecule.formula}
              className="font-mono text-2xl font-bold text-blue-500"
            />
          </span>
        </p>
      </div>

      {molecule.image && (
        /*
          A plain <img>, not next/image: these are small static files served
          from public/, and next/image would add a config surface for nothing.
          width/height are the file's intrinsic size, so the prose below does
          not jump when the picture arrives.

          Providing a picture is replacing the file at `src` — no code changes.
          docs/EXPLORE_IMAGES.md has the folder and the slot list.
        */
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={molecule.image.src}
          alt={format(t.explore.moleculeImageA11y, { name: molecule.name })}
          width={molecule.image.width}
          height={molecule.image.height}
          className="mt-6 h-auto w-full rounded-2xl border border-(--border) bg-(--background)"
        />
      )}

      <div className="mt-6 space-y-5">
        <div>
          <SubTag className="text-[10px] font-black uppercase tracking-widest text-(--muted)">
            {t.explore.everydayHeading}
          </SubTag>
          <p className="mt-1.5 text-sm leading-relaxed text-(--foreground) md:text-base">
            {molecule.everyday}
          </p>
        </div>
        <div>
          <SubTag className="text-[10px] font-black uppercase tracking-widest text-(--muted)">
            {t.explore.chemistryHeading}
          </SubTag>
          <p className="mt-1.5 text-sm leading-relaxed text-(--foreground) md:text-base">
            {molecule.chemistry}
          </p>
        </div>
      </div>

      <InwardLink pattern={t.explore.moleculeCta} href={linkHref} title={linkTitle} />

      <SourceList
        heading={t.explore.sourcesHeading}
        sources={molecule.sources}
        note={t.explore.sourcesNote}
        verifiedOn={verifiedOn}
        opensInNewTab={t.common.opensInNewTab}
        headingTag={SubTag}
      />
    </section>
  );
}
