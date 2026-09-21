// src/app/[lang]/(main)/explore/(tabs)/archive/page.test.tsx
//
// The archive tab. What matters here is unchanged by the tab strip: the
// rotation is **complete** — every pair, once each, both permalinks on every
// row — because that is the whole reason the page exists, with forty entries
// reachable in one hop from a URL a crawler can follow while the repo still
// has no sitemap. And it is complete **from the first week**; the version that
// listed "everything that has been featured" would be a heading over nothing on
// launch day and would grow one row a week for five months.
//
// What the tab strip did change, and what the tests below now have to say:
//
//   * The page has no `<h1>` of its own. The layout's "Explore" is the only
//     one on the document, and `archiveHeading` demoted to `<h2>`.
//   * The **recent-weeks list moved here** from the foot of /explore, above
//     the rotation. So this file inherits the recent list's tests, including
//     the small-numbers cases — 0, 1, 9 — which are the ones a build tests on
//     a Tuesday in month six and never sees again.
//
// The two lists are not redundant, and the helpers below are scoped to their
// own sections because of it: the recent list is what ran week by week and
// repeats a pair that has run twice, the rotation is every pair once. An
// unscoped `getAllByRole('listitem')` would now count both and mean neither.

import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { screen, within } from '@testing-library/react';
import { renderExploreTab } from '@/test-utils/explore-tabs';
import { en } from '@/i18n/dictionaries/en';
import { de } from '@/i18n/dictionaries/de';
import { getDictionary } from '@/i18n/dictionaries';
import { LOCALES } from '@/i18n/config';
import { ROTATION_EPOCH } from '@/lib/explore/rotation';
import { schedulablePairs } from '@/lib/explore/archive';
import type { ExplorePair } from '@/lib/explore/types';

const { schedule } = vi.hoisted(() => ({
  schedule: { override: null as ExplorePair[] | null },
}));

vi.mock('@/lib/explore/schedule', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/explore/schedule')>();
  return {
    get EXPLORE_SCHEDULE() {
      return schedule.override ?? actual.EXPLORE_SCHEDULE;
    },
  };
});

vi.mock('next/navigation', async (importOriginal) => {
  const actual = await importOriginal<typeof import('next/navigation')>();
  return { ...actual, useSelectedLayoutSegment: () => 'archive' };
});

const { EXPLORE_SCHEDULE } = await import('@/lib/explore/schedule');
const Page = (await import('./page')).default;
const { generateMetadata } = await import('./page');

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const midWeek = (n: number) => new Date(ROTATION_EPOCH + n * WEEK_MS + 3 * 24 * 60 * 60 * 1000);
/** Monday 00:00 UTC of week `n`, so no test has to count days in February. */
const mondayOfWeek = (n: number) => new Date(ROTATION_EPOCH + n * WEEK_MS);
const POOL = schedulablePairs().length;

const renderPage = (lang: string) => renderExploreTab(Page, lang);

/**
 * The rows of one list or the other, never both.
 *
 * Both sections are named in the reader's language, so the heading is a
 * parameter: looking for the English name on a German page finds nothing and
 * reports it as "no rows", which would pass a length check by accident.
 */
const rotationRows = (heading: string = en.explore.archiveHeading) =>
  within(screen.getByRole('region', { name: heading })).getAllByRole('listitem');

const recentRows = (heading: string = en.explore.recentHeading) => {
  const section = screen.queryByRole('region', { name: heading });
  return section === null ? [] : within(section).getAllByRole('listitem');
};

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(midWeek(37));
});

afterEach(() => {
  schedule.override = null;
  vi.useRealTimers();
});

describe('the archive tab', () => {
  it('lists every pair in the rotation, once each', async () => {
    await renderPage('en');
    expect(rotationRows()).toHaveLength(POOL);
  });

  it('is just as complete in the first week, when nothing has run yet', async () => {
    vi.setSystemTime(midWeek(0));
    await renderPage('en');

    expect(rotationRows()).toHaveLength(POOL);
    // Nineteen of the twenty are still to come, and the page says so rather
    // than dating them in a past that has not happened.
    expect(screen.getAllByText(/Not featured yet/)).toHaveLength(POOL - 1);
  });

  it('gives a <time> only to rotation rows that have actually run', async () => {
    // A `datetime` on "Not featured yet. First up in the week of X" would tell
    // a crawler the row *is* that day. Only "Week of X" is a date.
    //
    // Counted inside the rotation section rather than on the document: the
    // layout's dateline is a `<time>` too, and so is every row of the recent
    // list above. Scoping is what keeps this counting the thing it names.
    vi.setSystemTime(midWeek(0));
    const first = await renderPage('en');

    // Week 0: one pair has run — this week's — and nineteen have not.
    expect(
      within(first.container)
        .getByRole('region', { name: en.explore.archiveHeading })
        .querySelectorAll('li time')
    ).toHaveLength(1);

    // …and after a full cycle every row has a date to point at.
    vi.setSystemTime(midWeek(37));
    const later = await renderPage('en');
    expect(
      within(later.container)
        .getByRole('region', { name: en.explore.archiveHeading })
        .querySelectorAll('li time')
    ).toHaveLength(POOL);
  });

  it('links both permalinks on every rotation row, with no duplicates', async () => {
    await renderPage('en');

    const hrefs = rotationRows().flatMap((row) =>
      Array.from(row.querySelectorAll('a')).map((a) => a.getAttribute('href'))
    );

    expect(hrefs).toHaveLength(POOL * 2);
    expect(new Set(hrefs).size).toBe(hrefs.length);
    expect(hrefs.filter((h) => h?.startsWith('/en/explore/molecules/'))).toHaveLength(POOL);
    expect(hrefs.filter((h) => h?.startsWith('/en/explore/scientists/'))).toHaveLength(POOL);
  });

  it('keeps the locale on every link, the tab strip included', async () => {
    await renderPage('ru');
    const hrefs = screen
      .getAllByRole('link')
      .map((a) => a.getAttribute('href'))
      .filter((href): href is string => href !== null);

    expect(hrefs.length).toBeGreaterThan(0);
    expect(hrefs.every((href) => href.startsWith('/ru/'))).toBe(true);
    expect(hrefs).toContain('/ru/explore');
    expect(hrefs).toContain('/ru/explore/scientist');
  });

  it('marks exactly one rotation row as the current week', async () => {
    await renderPage('en');
    const marked = screen.getAllByText(en.explore.archiveThisWeek);
    expect(marked).toHaveLength(1);

    // …and it is the row whose date is this week's Monday.
    const row = marked[0].closest('li')!;
    expect(within(row).getByText(/Week of/).closest('time')).toHaveAttribute(
      'datetime',
      mondayOfWeek(37).toISOString().slice(0, 10)
    );
  });

  it('marks no row as the current week before the epoch', async () => {
    vi.setSystemTime(midWeek(-2));
    await renderPage('en');

    expect(rotationRows()).toHaveLength(POOL);
    expect(screen.queryByText(en.explore.archiveThisWeek)).not.toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// What the tab strip changed
// ---------------------------------------------------------------------------

describe('the archive tab under the shared header', () => {
  it('has no h1 of its own, and demotes its heading to h2', async () => {
    await renderPage('en');

    const h1s = screen.getAllByRole('heading', { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent(en.explore.heading);

    expect(
      screen.getByRole('heading', { level: 2, name: en.explore.archiveHeading })
    ).toBeInTheDocument();
  });

  it('drops its own intro and its own way back', async () => {
    // The layout carries the intro, and the strip is a better way back than a
    // single link because it also says where else there is to go.
    await renderPage('en');

    expect(screen.queryByText(en.explore.archiveIntro)).not.toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: en.explore.backToExplore })
    ).not.toBeInTheDocument();
    // …and the way back is on the strip.
    expect(screen.getByRole('link', { name: /Molecule/ })).toHaveAttribute(
      'href',
      '/en/explore'
    );
  });

  it('marks its own pill as the current page and no other', async () => {
    await renderPage('en');

    const nav = screen.getByRole('navigation', { name: en.explore.tabsA11y });
    const current = within(nav).getAllByRole('link', { current: 'page' });
    expect(current).toHaveLength(1);
    expect(current[0]).toHaveAttribute('href', '/en/explore/archive');
  });

  it('shows the same single dateline as the entry tabs', async () => {
    // True on this tab too: the reader is browsing history, and the strip says
    // which week they are actually in — the same thing the badged row says
    // further down, which is why one dateline serves all three tabs.
    const { container } = await renderPage('en');

    const header = container.querySelector('header')!;
    expect(within(header).getAllByText(/Week of/)).toHaveLength(1);
    expect(within(header).getByText(/Week of/).closest('time')).toHaveAttribute(
      'datetime',
      mondayOfWeek(37).toISOString().slice(0, 10)
    );
  });

  it('opens no second main and skips no heading level', async () => {
    const { container } = await renderPage('en');

    expect(container.querySelectorAll('main')).toHaveLength(1);
    const levels = Array.from(container.querySelectorAll('h1,h2,h3,h4,h5,h6')).map((node) =>
      Number(node.tagName[1])
    );
    expect(levels[0]).toBe(1);
    for (let i = 1; i < levels.length; i += 1) {
      expect(levels[i] - levels[i - 1]).toBeLessThanOrEqual(1);
    }
  });

  it.each(LOCALES)('renders in %s with one h1 and the whole rotation', async (locale) => {
    const dictionary = await getDictionary(locale);
    const { unmount } = await renderPage(locale);

    const h1s = screen.getAllByRole('heading', { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent(dictionary.explore.heading);
    expect(rotationRows(dictionary.explore.archiveHeading)).toHaveLength(POOL);
    unmount();
  });
});

// ---------------------------------------------------------------------------
// The recent list, moved here from /explore
// ---------------------------------------------------------------------------
//
// The cases that matter are the small ones. Ten rows is what the page looks
// like forever after week ten, and it is the case that works by accident; 0, 1
// and 9 are the ones a build tests on a Tuesday in month six and never sees
// again. At week 0 there is no history at all, and the section must not render
// a heading over nothing — which matters more on this tab than it did on
// /explore, because history is this tab's whole promise.

describe('the recent list', () => {
  it('sits above the full rotation, not below it', async () => {
    // Newest-first is the order the whole feature reads in, and a reader who
    // opened the history tab wants last week before they want week nineteen of
    // the cycle.
    const { container } = await renderPage('en');

    const headings = Array.from(container.querySelectorAll('h2')).map((h) => h.textContent);
    expect(headings).toEqual([en.explore.recentHeading, en.explore.archiveHeading]);
  });

  it.each([
    [0, 0],
    [1, 1],
    [9, 9],
    [10, 10],
    // Past the wrap: still ten, because ten is the display limit and the
    // rotation has twenty pairs. This is the case that proves the limit is not
    // "everything that has happened".
    [37, 10],
  ])('shows %i past weeks as %i rows', async (week, expected) => {
    // Mid-week rather than on the Monday itself, so the answer does not depend
    // on a boundary the rest of the suite already covers.
    vi.setSystemTime(midWeek(week));

    await renderPage('en');
    expect(recentRows()).toHaveLength(expected);
  });

  it('renders no heading at all in the first week, rather than an empty list', async () => {
    vi.setSystemTime(mondayOfWeek(0));
    await renderPage('en');

    // The failure this guards against is a section that renders its heading and
    // an empty <ul>, which reads as a page that failed to load. The rotation
    // below is still complete, which is the point of having both lists.
    expect(
      screen.queryByRole('region', { name: en.explore.recentHeading })
    ).not.toBeInTheDocument();
    expect(screen.queryByText(en.explore.recentHeading)).not.toBeInTheDocument();
    expect(rotationRows()).toHaveLength(POOL);
  });

  it('never shows the same entry twice across a rotation wrap', async () => {
    // Week 37 is seventeen weeks past the first wrap of a twenty-week cycle,
    // so "eleven weeks ago" and "thirty-one weeks ago" are genuinely the same
    // pair. The list must pick one of them, not both.
    vi.setSystemTime(midWeek(37));
    await renderPage('en');

    const hrefs = recentRows().flatMap((row) =>
      Array.from(row.querySelectorAll('a')).map((a) => a.getAttribute('href'))
    );
    expect(hrefs.length).toBe(20); // ten rows, two permalinks each
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it('never repeats the current week in the list of past ones', async () => {
    vi.setSystemTime(midWeek(37));
    const { container } = await renderPage('en');

    const thisWeek = mondayOfWeek(37).toISOString().slice(0, 10);
    const recentDates = recentRows().map((row) =>
      row.querySelector('time')?.getAttribute('datetime')
    );

    expect(recentDates.length).toBeGreaterThan(0);
    expect(recentDates).not.toContain(thisWeek);
    // …and the header above names it, exactly once.
    const header = container.querySelector('header')!;
    expect(within(header).getByText(/Week of/).closest('time')).toHaveAttribute(
      'datetime',
      thisWeek
    );
  });

  it('links every row to both permalinks, with the locale kept', async () => {
    vi.setSystemTime(midWeek(12));
    await renderPage('de');

    const rows = recentRows(de.explore.recentHeading);
    expect(rows.length).toBeGreaterThan(0);

    for (const row of rows) {
      const hrefs = Array.from(row.querySelectorAll('a')).map((a) => a.getAttribute('href'));
      expect(hrefs).toHaveLength(2);
      expect(hrefs[0]).toMatch(/^\/de\/explore\/molecules\/[a-z0-9-]+$/);
      expect(hrefs[1]).toMatch(/^\/de\/explore\/scientists\/[a-z0-9-]+$/);
    }
  });

  it('shrinks with the pool rather than repeating a pair', async () => {
    // Three pairs and ten slots: the honest answer is three rows, not ten with
    // seven duplicates. Nothing in the live schedule exercises this, which is
    // exactly why it is worth a test — the de-duplication is a property of the
    // design, not of the numbers that happen to be in the file today.
    schedule.override = EXPLORE_SCHEDULE.slice(0, 3);
    vi.setSystemTime(midWeek(37));

    await renderPage('en');
    expect(recentRows()).toHaveLength(3);
  });
});

describe('generateMetadata', () => {
  it('rebuilds canonical and hreflang for this path', async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ lang: 'es' }),
      searchParams: Promise.resolve({}),
    });

    expect(metadata.alternates?.canonical).toBe('/es/explore/archive');
    expect(metadata.alternates?.languages).toMatchObject({
      en: '/en/explore/archive',
      ru: '/ru/explore/archive',
      'x-default': '/en/explore/archive',
    });
  });

  it('keeps the URL the archive shipped with', async () => {
    // The whole reason for the route group: `(tabs)` contributes no segment,
    // so every inbound link to /explore/archive still resolves and every
    // alternate is the address it was before the file moved.
    const metadata = await generateMetadata({
      params: Promise.resolve({ lang: 'en' }),
      searchParams: Promise.resolve({}),
    });

    expect(metadata.alternates?.canonical).toBe('/en/explore/archive');
    expect(JSON.stringify(metadata.alternates?.languages)).not.toContain('tabs');
  });

  it('is localized', async () => {
    const english = await generateMetadata({
      params: Promise.resolve({ lang: 'en' }),
      searchParams: Promise.resolve({}),
    });
    const german = await generateMetadata({
      params: Promise.resolve({ lang: 'de' }),
      searchParams: Promise.resolve({}),
    });

    expect(english.title).toContain(en.explore.archiveHeading);
    expect(german.description).not.toBe(english.description);
  });
});
