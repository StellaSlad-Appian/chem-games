// src/components/explore/WeekRow.tsx
//
// One week of the rotation, as a row: a dateline and both permalinks.
//
// Shared by the recent list under the current week and by the archive index,
// because they are the same row with a different date on it. The pair is the
// unit of meaning (explore.md AC-3), so a row never shows one half of one.
//
// ## Why the two links stack below `sm`
//
// They are a flex row of two links with a formula or a lifespan on each. At
// 320px, side by side, either the names truncate to nothing or the row goes
// over — and an over-full flex row *compresses* rather than scrolling, so it
// passes a naive `scrollWidth` check while being unreadable (explore.md §0).
// `flex-col sm:flex-row` is the fix that does not depend on measuring anything.

import type { ReactNode } from 'react';
import { MoleculeEntryLink, ScientistEntryLink } from './EntryLink';
import type { LocalizedMolecule, LocalizedScientist } from '@/i18n/explore';

export function WeekRow({
  dateLabel,
  dateTime,
  badge,
  molecule,
  scientist,
}: {
  /** Already formatted by the page with `Intl` — never assembled here. */
  dateLabel: string;
  /**
   * The ISO day for `<time datetime>`, or undefined for a row with no date to
   * point at. Omitted rather than faked: a `<time>` with no machine-readable
   * value is worse than a plain paragraph.
   */
  dateTime?: string;
  /** "This week", on the one row that is the current week. */
  badge?: ReactNode;
  molecule: LocalizedMolecule;
  scientist: LocalizedScientist;
}) {
  return (
    <li className="rounded-2xl border border-(--border) bg-(--surface) p-3">
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-[11px] font-black uppercase tracking-wider text-(--muted)">
          {dateTime ? <time dateTime={dateTime}>{dateLabel}</time> : dateLabel}
        </p>
        {badge}
      </div>
      <div className="mt-2 flex flex-col gap-2 sm:flex-row">
        {/* `from="archive"` on both: this component is only ever rendered by
            the archive page, so every row in it is a row the reader reached
            from the archive, and the permalink should offer the way back
            there. If WeekRow is ever reused elsewhere, this has to become a
            prop — a row on some other page would be lying about where the
            reader came from. */}
        <MoleculeEntryLink molecule={molecule} from="archive" />
        <ScientistEntryLink scientist={scientist} from="archive" />
      </div>
    </li>
  );
}

/** The marker on the row a reader is currently living in. */
export function ThisWeekBadge({ label }: { label: string }) {
  return (
    <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[11px] font-black uppercase tracking-wider text-(--link)">
      {label}
    </span>
  );
}
