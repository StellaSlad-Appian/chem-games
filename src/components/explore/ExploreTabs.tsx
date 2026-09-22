// src/components/explore/ExploreTabs.tsx
'use client';

import { FlaskConical, Library, Microscope } from 'lucide-react';
import { useSelectedLayoutSegment } from 'next/navigation';
import { LocaleLink } from '@/components/layout/LocaleLink';
import type { Dictionary } from '@/i18n/dictionaries';

/**
 * The three-way sub-navigation across the top of Explore.
 *
 * ## This is navigation between documents, not the ARIA tabs pattern
 *
 * It looks like tabs and it is called tabs, and it is deliberately **not**
 * `role="tablist"` / `role="tab"` / `role="tabpanel"`. Those roles promise a
 * screen reader that the panels are already in this document and that arrow
 * keys will move between them without leaving the page. Neither is true here:
 * each pill is a link to a separate URL with its own metadata, its own
 * `hreflang` set and its own place in the browser's history. Announcing them as
 * tabs would mean announcing a lie, and it would also take the links out of the
 * link rotor a screen-reader user navigates with.
 *
 * So it is a plain `<nav>` with an accessible name and `aria-current="page"` on
 * the one that is active — the same pattern as the site NavBar, which is what
 * it is.
 *
 * ## How the active tab is known
 *
 * `useSelectedLayoutSegment`, called from a client component imported into
 * `explore/(tabs)/layout.tsx`, returns the route segment **one level below that
 * layout** — checked against
 * node_modules/next/dist/docs/01-app/03-api-reference/04-functions/use-selected-layout-segment.md,
 * whose own table shows `app/dashboard/layout.js` at `/dashboard` returning
 * `null`. That `null` is the whole reason `/explore` can *be* the molecule tab
 * instead of redirecting to a fourth URL: there is no `/explore/molecule` page,
 * no duplicate content, and nothing to canonicalise.
 *
 * `(tabs)` is a route group, so it contributes no segment of its own and the
 * three values are `null`, `'scientist'` and `'archive'`.
 *
 * ## Why the entry names are props
 *
 * The layout above is a Server Component and already reads `getExploreContent`
 * for its dateline, so the two names arrive here as plain, already-localised
 * strings. Nothing is fetched on the client, and the whole of
 * `src/i18n/explore.ts` — the largest body of prose on the site — stays out of
 * the client bundle.
 */
export function ExploreTabs({
  t,
  moleculeName,
  scientistName,
  dateline,
  datelineIso,
}: {
  t: Dictionary;
  /** This week's molecule, already localised by the layout. */
  moleculeName: string;
  /** This week's scientist. Names are never translated; the prose about them is. */
  scientistName: string;
  /** Already formatted with `Intl` by the layout — never assembled here. */
  dateline: string;
  /** The ISO day of the Monday the week began, for `<time datetime>`. */
  datelineIso: string;
}) {
  const segment = useSelectedLayoutSegment();

  const tabs = [
    {
      // `null` is /explore itself: the layout's own route. See above.
      segment: null,
      href: '/explore',
      label: t.explore.tabMolecule,
      subtitle: moleculeName,
      Icon: FlaskConical,
    },
    {
      segment: 'scientist',
      href: '/explore/scientist',
      label: t.explore.tabScientist,
      subtitle: scientistName,
      Icon: Microscope,
    },
    {
      segment: 'archive',
      href: '/explore/archive',
      label: t.explore.tabArchive,
      // The archive has no entry of its own, so it borrows the call to action
      // the page used to carry at its foot. A pill with a blank second line
      // beside two that have one looks unfinished rather than different.
      subtitle: t.explore.archiveCta,
      Icon: Library,
    },
  ];

  return (
    /*
      One row: the strip, then the dateline pushed to the far end of it.

      **No background and no border across the width.** The strip sits directly
      under the site NavBar, and the moment it gains a bar of its own the page
      reads as having two menus. Free-standing pills on the page background,
      left-aligned to the content column, is what makes it read as part of the
      page — which is what it is (explore.md §9, "The one way this goes wrong").

      `flex-wrap` rather than a horizontal scroller or a responsive variant: on
      a phone the strip becomes two rows, and both the names and the subtitles
      survive. Mobile is where the chemist is hardest to stumble across, so it
      is the worst place to drop the hint that they exist.
    */
    <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3">
      <nav
        aria-label={t.explore.tabsA11y}
        className="flex min-w-0 flex-wrap items-stretch gap-2"
      >
        {tabs.map((tab) => {
          const isActive = tab.segment === segment;
          return (
            <LocaleLink
              key={tab.href}
              href={tab.href}
              aria-current={isActive ? 'page' : undefined}
              /*
                `rounded-xl` and `border-2`, lifted wholesale from the archive
                call to action this strip replaces — so the active state here is
                literally that button's existing hover state and the strip looks
                native without a new colour being invented for it.

                Not `rounded-full`: a pill radius on a two-line box reads as a
                mistake rather than as a pill.

                `min-h-11` is the 44px target docs/ACCESSIBILITY.md asks for on
                touch; two lines of content put it well past that anyway, and
                the floor is what matters when a subtitle is short.
              */
              className={`flex min-h-11 min-w-0 max-w-full flex-col justify-center gap-0.5 rounded-xl border-2 bg-(--surface) px-3 py-2 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--link) ${
                isActive
                  ? 'border-(--link)'
                  : 'border-(--border) hover:border-(--link)'
              }`}
            >
              <span
                className={`flex items-center gap-1.5 text-xs font-black uppercase tracking-wider ${
                  isActive ? 'text-(--link)' : 'text-(--foreground)'
                }`}
              >
                <tab.Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                {/* `min-w-0` / `break-words`: the Spanish and Italian labels are
                    a fixed doublet ("Científica o científico") and the pill has
                    to be allowed to break it rather than push the page sideways
                    at 320px. */}
                <span className="min-w-0 break-words">{tab.label}</span>
              </span>
              {/*
                **Uniformly muted, on the active pill as well.**

                The name under the active pill is the same name as the card
                heading 100px below it, at roughly 2.3x the size and in a
                different colour. That gap is what makes the pair read as
                confirmation rather than as a stutter, and it survives only
                while the small one stays small and grey. Bolding it on
                selection — the obvious thing to reach for — is exactly what
                turns a deliberate echo into a glitch. explore.md §9 has the
                reasoning and the one-line retreat if it reads wrong anyway.
              */}
              <span className="min-w-0 text-[13px] leading-snug font-normal break-words text-(--muted)">
                {tab.subtitle}
              </span>
            </LocaleLink>
          );
        })}
      </nav>

      {/*
        The dateline, on the strip's row rather than in a band of its own.

        It is true on all three tabs: the two entry tabs *are* this week, and on
        the archive it reads as "this is the week you are in" while the reader
        browses history — which is the same thing the badged row down the page
        says. It renders here once, in the layout, instead of being duplicated
        into each tab.

        `sm:ml-auto` rather than `ml-auto`: below `sm` the strip has already
        wrapped to two rows, and pushing the dateline to the right edge of a
        320px phone would strand it opposite nothing.
      */}
      <p className="text-xs font-black tracking-wider text-(--muted) uppercase sm:ml-auto">
        <time dateTime={datelineIso}>{dateline}</time>
      </p>
    </div>
  );
}
