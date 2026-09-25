// src/components/explore/EntryLink.tsx
//
// A compact link to one entry's permalink.
//
// The same row is wanted in three places — the recent list under the current
// week, the archive index, and the "from the same week" link on the other
// entry's permalink — so it is one component, not three near-identical blocks
// of Tailwind. It is deliberately *not* a card: `MoleculeCard` and
// `ScientistCard` render an entry in full, and putting a second full card on a
// permalink would make the page mostly about the other entry.
//
// What it shows is the name plus the one piece of notation that identifies it:
// the formula for a molecule, the lifespan for a person. Both are structure
// rather than prose, so both are already right in every locale.
//
// ## What a screen reader hears
//
// The name, and only the name. The formula is `aria-hidden` here, unlike on the
// card, where it carries an accessible name built from `explore.formulaA11y`.
// That is not an oversight: `MoleculeText` types subscripts that are read as
// bare digits, so the card has to spell the formula out — but in a list the
// name has already identified the row, and "Benzene, Benzene formula C6H6" is
// noise. The card is where the formula is information; a row is where it is a
// glance.

import { FlaskConical, Microscope } from 'lucide-react';
import { LocaleLink } from '@/components/layout/LocaleLink';
import MoleculeText from '@/components/ui/MoleculeText';
import type { LocalizedMolecule, LocalizedScientist } from '@/i18n/explore';

/** `/explore/molecules/benzene` — unprefixed; `LocaleLink` adds the language. */
export const moleculeHref = (id: string): string => `/explore/molecules/${id}`;
export const scientistHref = (id: string): string => `/explore/scientists/${id}`;

/**
 * Where the reader was when they clicked, carried in the URL.
 *
 * Only the archive sets it, and only so the permalink's back link can offer
 * the way back the reader actually came — "Back to Archive", to the archive —
 * instead of dropping them on /explore, which is a different page they were
 * not on.
 *
 * In the URL rather than inferred from `Referer`, because a header is not
 * there on a client-side navigation, is stripped by some privacy settings,
 * and cannot survive the reader sharing the link. A query parameter is
 * visible, shareable and testable. It is also a *hint*: anything unrecognised
 * falls back to Explore, so a hand-edited URL cannot produce a broken link.
 */
export type EntryOrigin = 'archive';

const withOrigin = (href: string, from?: EntryOrigin): string =>
  from ? `${href}?from=${from}` : href;

/**
 * `min-h-11` is a 44px tap target, which docs/ACCESSIBILITY.md requires and
 * which matters more here than anywhere else on the page: these rows are a list
 * of small links, read on a phone, with a second link right beside them.
 */
const rowClass =
  'group flex min-h-11 min-w-0 flex-1 items-center gap-2 rounded-xl border border-(--border) bg-(--background) px-3 py-2 transition hover:border-(--link) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--link)';

/*
 * `min-w-0` on the flex item and `truncate` on the name: a long compound name
 * in German must shorten rather than push the row — and therefore the
 * document — past a 320px viewport. The full name is still the link's
 * accessible name, because it is the element's text content.
 */
const nameClass =
  'min-w-0 flex-1 truncate text-sm font-bold text-(--foreground) group-hover:text-(--link)';

export function MoleculeEntryLink({
  molecule,
  from,
}: {
  molecule: LocalizedMolecule;
  from?: EntryOrigin;
}) {
  return (
    <LocaleLink href={withOrigin(moleculeHref(molecule.id), from)} className={rowClass}>
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-(--info-surface) text-(--link)">
        <FlaskConical className="h-3.5 w-3.5" aria-hidden="true" />
      </span>
      <span className={nameClass}>{molecule.name}</span>
      <span aria-hidden="true" className="hidden shrink-0 sm:block">
        <MoleculeText formula={molecule.formula} className="font-mono text-xs text-(--muted)" />
      </span>
    </LocaleLink>
  );
}

export function ScientistEntryLink({
  scientist,
  from,
}: {
  scientist: LocalizedScientist;
  from?: EntryOrigin;
}) {
  return (
    <LocaleLink href={withOrigin(scientistHref(scientist.id), from)} className={rowClass}>
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-(--hue-emerald)/10 text-(--hue-emerald)">
        <Microscope className="h-3.5 w-3.5" aria-hidden="true" />
      </span>
      <span className={nameClass}>{scientist.name}</span>
      {/* A date, so never translated. Hidden below `sm` for room, not for meaning. */}
      <span className="hidden shrink-0 font-mono text-xs text-(--muted) sm:block">
        {scientist.lifespan}
      </span>
    </LocaleLink>
  );
}
