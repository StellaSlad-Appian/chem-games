// src/components/explore/EntryDates.tsx
//
// What a permalink says about dates.
//
// **This is the thing this feature was most likely to get wrong, so it is worth
// reading the whole comment.**
//
// An entry does not have "a week". The rotation wraps every `cycleWeeks` weeks,
// so by the time anyone reads a permalink the pair may have run five times, and
// "Week of 21 September 2026" — the sentence the page above it uses, correctly,
// about the current week — is simply false on a permalink the second time round.
// "Eleven weeks ago" and "thirty-one weeks ago" are the same pair.
//
// So there are three sentences and the page picks by how many times the entry
// has actually run:
//
//   * **never** — the pool is bigger than the number of weeks since the epoch,
//     or the site has just launched. It says so, and names the first week it is
//     due. Nothing is claimed about a past that has not happened.
//   * **once** — and only here may the page name a single week without
//     qualification, because that is the whole truth.
//   * **more than once** — the most recent week it ran, *and* the next week it
//     runs. Two dates, because one would be a lie by omission: a reader who
//     found this page from a link a friend sent in March needs to know both
//     that it has been and that it will be again.
//
// ## Why there is no `<time>` element here
//
// A `<time datetime="2026-09-21">` on a sentence containing two dates says the
// page is *about* that day, and a crawler would read it as a publication date.
// The honest machine-readable statement about an entry that runs every twenty
// weeks is no statement at all. `<time>` is used where a row really is one
// week — the current-week dateline, the recent list and the archive rows — and
// not here.
//
// ## And the dates are derived, not recorded
//
// Every date below is where today's schedule *would have put* this pair, not a
// log of where it was. Appending a pair changes all of them. See the header of
// src/lib/explore/archive.ts, which is where that decision is written down.

import { CalendarClock } from 'lucide-react';
import { format } from '@/i18n/format';
import type { Dictionary } from '@/i18n/dictionaries';
import type { LocalizedRotationEntry } from '@/i18n/explore';
import { formatWeekDate } from '@/i18n/explore-dates';
import type { Locale } from '@/i18n/config';

export function EntryDates({
  rotation,
  locale,
  t,
}: {
  rotation: LocalizedRotationEntry;
  locale: Locale;
  t: Dictionary;
}) {
  const { timesFeatured, lastFeatured, nextFeatured } = rotation;

  // `lastFeatured` is null exactly when `timesFeatured` is 0 — see
  // `rotationFor` in lib/explore/archive.ts, where the two are computed
  // together — so the branches below never read it as a date it does not have.
  const sentence =
    timesFeatured === 0 || lastFeatured === null
      ? format(t.explore.featuredNever, { date: formatWeekDate(locale, nextFeatured) })
      : timesFeatured === 1
        ? format(t.explore.featuredOnce, { date: formatWeekDate(locale, lastFeatured) })
        : format(t.explore.featuredAgain, {
            date: formatWeekDate(locale, lastFeatured),
            nextDate: formatWeekDate(locale, nextFeatured),
          });

  return (
    <p className="mt-6 flex items-start gap-2 rounded-2xl border border-(--border) bg-(--surface) px-4 py-3 text-sm text-(--muted)">
      <CalendarClock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <span>{sentence}</span>
    </p>
  );
}
