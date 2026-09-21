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
   * the sources — is identical in both places. What changes is about the
   * document rather than the content:
   *
   *   * **The eyebrow is permalink-only.** "Molecule of the Week" answers
   *     *what am I looking at*. Inside `/explore` the active pill in the tab
   *     strip above answers it already, and repeating it is one more band of
   *     chrome between the reader and the entry. On a permalink nothing else
   *     says the page is a curated Explore entry rather than a generic
   *     molecule page, so it stays — as a `<p>`, because it is a label and not
   *     a section.
   *   * **The name is the heading either way.** `<h1>` on a permalink, where
   *     the page is about one molecule; `<h2>` in a tab, under the `(tabs)`
   *     layout's "Explore" `<h1>`. `aria-labelledby` points at the name in
   *     both cases, which names the section "Benzene" rather than "Molecule of
   *     the Week" — a better name in a landmark list, because it says *which*
   *     entry.
   *   * **Everything below moves with it**, so the tree never skips a level:
   *     h1 name → h2 "Where you meet it" on a permalink, h2 name → h3 in a tab.
   *
   * Dropping the eyebrow inside the tabs is what collapses the old
   * `LabelTag`/`NameTag`/`SubTag` triple to a pair. The heading-level rule it
   * encoded is unchanged; only its premise is — two cards no longer sit side by
   * side under one page heading. (explore.md §9, "The eyebrow")
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
      {/* The `FlaskConical` badge goes with the eyebrow. In a tab it lives on
          the Molecule pill instead, where it gives the strip its identity;
          here, with nothing left to label, it would sit undersized beside a
          30px heading. */}
      {standalone && (
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
            <FlaskConical className="h-4 w-4" aria-hidden="true" />
          </span>
          <p className="text-xs font-black uppercase tracking-widest text-(--muted)">
            {t.explore.moleculeHeading}
          </p>
        </div>
      )}

      <div
        className={`flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4 ${
          standalone ? 'mt-4' : ''
        }`}
      >
        {/*
          `min-w-0` and `break-words`: this is a flex item at text-3xl, and a
          flex item's automatic minimum size is its longest unbreakable word.
          Without them a long name pushes the whole page past a 320px viewport,
          which is the WCAG 1.4.10 failure docs/ACCESSIBILITY.md forbids and
          which the cheat-sheet detail page already hit.
        */}
        <NameTag
          id={headingId}
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

      {/*
        Picture beside the prose from `lg`, stacked below it.

        This, and not the tabs, is what actually answers the complaint the
        redesign started from: a structure diagram told to fill the card was
        several hundred pixels tall on a laptop and pushed everything worth
        reading below the fold. **Unconditional, not behind a prop** — the
        permalinks are `max-w-4xl` with no second column to borrow from and
        want it more than the tabs do (explore.md §9, "The pictures").

        `minmax(0,5fr)_minmax(0,7fr)` rather than `5fr 7fr`: a grid track's
        automatic minimum is its longest unbreakable word, so a long formula or
        an unbroken compound name blows a bare `fr` column out and pushes the
        page past 320px. Same failure the `min-w-0` notes above guard against.
      */}
      <div
        className={`mt-6 grid items-start gap-6 ${
          molecule.image ? 'lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]' : ''
        }`}
      >
        {molecule.image && (
          /*
            A plain <img>, not next/image: these are small static files served
            from public/, and next/image would add a config surface for nothing.
            width/height are the file's intrinsic size, so the prose does not
            jump when the picture arrives.

            `max-h-80` + `object-contain`: the cap is what stops a tall portrait
            stretching its column, and `object-contain` is what stops the cap
            cropping the diagram instead of shrinking it. Both are needed —
            a height cap on its own would crop, which on a structure diagram
            means silently deleting chemistry.

            Providing a picture is replacing the file at `src` — no code changes.
            docs/EXPLORE_IMAGES.md has the folder and the slot list.
          */
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={molecule.image.src}
            alt={format(t.explore.moleculeImageA11y, { name: molecule.name })}
            width={molecule.image.width}
            height={molecule.image.height}
            className="max-h-80 w-full min-w-0 rounded-2xl border border-(--border) bg-(--background) object-contain"
          />
        )}

        {/* The picture is optional on every entry, so with no picture the prose
            takes the whole width rather than leaving an empty column beside it:
            there is only one column to take when the grid has no second track. */}
        <div className="min-w-0 space-y-5">
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
