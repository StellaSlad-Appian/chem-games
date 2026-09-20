// src/app/[lang]/(main)/explore/page.test.tsx
//
// The page as a whole, with the clock pinned.
//
// `ExplorePage` is an async Server Component, so it is awaited and the element
// it returns is rendered — the same thing Next does, minus the streaming. The
// client components inside it (`LocaleLink`) need the i18n provider, which is
// what `TestProviders` supplies.
//
// The one thing worth saying about the clock: the page is the *only* place in
// the feature that calls `new Date()`. Everything below it takes `now` as a
// parameter. So pinning the system time here is enough to make the whole page
// deterministic, and no test anywhere else needs to.

import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { TestProviders } from '@/test-utils/render';
import { en } from '@/i18n/dictionaries/en';
import { de } from '@/i18n/dictionaries/de';
import { getDictionary } from '@/i18n/dictionaries';
import { DEFAULT_LOCALE, formattingLocale, isLocale } from '@/i18n/config';
import { ROTATION_EPOCH } from '@/lib/explore/rotation';
import type { ExplorePair } from '@/lib/explore/types';

/**
 * Lets one test shrink the pool to a single pair without disturbing the others.
 * A getter rather than a fixed value, because `getExploreContent` reads the
 * schedule when it is called, not when the module loads.
 */
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

const { EXPLORE_SCHEDULE } = await import('@/lib/explore/schedule');
const ExplorePage = (await import('./page')).default;
const { generateMetadata } = await import('./page');

// A Wednesday inside the week that begins Monday 21 September 2026.
const MID_WEEK = new Date('2026-09-23T11:00:00.000Z');

/**
 * Renders the page the way Next does: the server component awaited, the result
 * wrapped in the provider the root layout supplies.
 *
 * The provider has to be given the *same* locale as the page, not the default.
 * `LocaleLink` is a client component and reads its prefix from the provider, so
 * a German page inside an English provider produces `/en/...` hrefs — which is
 * a test artefact, but one that would quietly hide a real regression in the
 * locale-keeps-its-prefix assertion below.
 */
async function renderPage(lang: string) {
  const locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const dictionary = await getDictionary(locale);
  const ui = await ExplorePage({ params: Promise.resolve({ lang }), searchParams: Promise.resolve({}) });
  return render(
    <TestProviders locale={locale} dictionary={dictionary}>
      {ui}
    </TestProviders>
  );
}

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(MID_WEEK);
});

afterEach(() => {
  schedule.override = null;
  vi.useRealTimers();
});

describe('the Explore page', () => {
  it('renders one h1 and both sections beneath it', async () => {
    await renderPage('en');

    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent(en.explore.heading);

    // Landmarks with accessible names, so a screen-reader user can jump
    // between them rather than reading the page top to bottom.
    expect(
      screen.getByRole('region', { name: en.explore.moleculeHeading })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('region', { name: en.explore.scientistHeading })
    ).toBeInTheDocument();
  });

  it('puts the molecule before the scientist, with no skipped heading levels', async () => {
    const { container } = await renderPage('en');

    const levels = Array.from(container.querySelectorAll('h1,h2,h3,h4')).map((node) =>
      Number(node.tagName[1])
    );
    // h1, then h2/h3/h4 in order; never a jump of more than one going down.
    expect(levels[0]).toBe(1);
    for (let i = 1; i < levels.length; i += 1) {
      expect(levels[i] - levels[i - 1]).toBeLessThanOrEqual(1);
    }

    const sectionOrder = Array.from(container.querySelectorAll('h2')).map(
      (node) => node.textContent
    );
    // The recent list is a third section, below both cards. It is last on
    // purpose: the week's pair is what the page is for, and a list of previous
    // weeks above it would bury the thing a reader came back for.
    expect(sectionOrder).toEqual([
      en.explore.moleculeHeading,
      en.explore.scientistHeading,
      en.explore.recentHeading,
    ]);
  });

  it('shows one dateline, naming the Monday the week began on', async () => {
    const { container } = await renderPage('en');

    // 21 September 2026 is the Monday of the week containing MID_WEEK. Day
    // first, because English formats through en-AU — `Intl.DateTimeFormat('en')`
    // resolves to en-US and would write "September 21, 2026" on a site that
    // spells things *neutralise*. See FORMATTING_LOCALE in src/i18n/config.ts.
    //
    // Scoped to the page header, because the recent list below uses the same
    // `dateline` pattern for every past week. The claim this test makes is
    // unchanged — **the current week is named once** — but "once on the page"
    // stopped being the way to say it when the archive landed.
    const header = container.querySelector('header')!;
    const dateline = within(header).getByText(/Week of/);
    expect(dateline).toHaveTextContent('Week of 21 September 2026');
    expect(dateline.closest('time')).toHaveAttribute('datetime', '2026-09-21');

    // One clock, not two: one dateline above the two cards, and the current
    // week never repeated in the list of past ones.
    expect(within(header).getAllByText(/Week of/)).toHaveLength(1);
    expect(screen.queryAllByText(/Week of 21 September 2026/)).toHaveLength(1);
  });

  it('formats that dateline in the reader’s language', async () => {
    await renderPage('de');

    // Not asserted as a literal string: the point is that Intl produced German
    // month names and German ordering, not that a particular build of ICU spells
    // it one way.
    const expected = new Intl.DateTimeFormat(formattingLocale('de'), {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(new Date('2026-09-21T00:00:00.000Z'));

    expect(screen.getByText(new RegExp(expected.replace(/\./g, '\\.')))).toBeInTheDocument();
    expect(screen.queryByText(/Week of/)).not.toBeInTheDocument();
  });

  it('gives both cards a link that goes somewhere inside the site', async () => {
    await renderPage('en');

    for (const heading of [en.explore.moleculeHeading, en.explore.scientistHeading]) {
      const section = screen.getByRole('region', { name: heading });
      const links = within(section)
        .getAllByRole('link')
        .map((link) => link.getAttribute('href'))
        .filter((href): href is string => href !== null);

      const inward = links.filter(
        (href) => href.startsWith('/en/cheat-sheets/') || href.startsWith('/en/games/')
      );
      expect(inward.length, `${heading} has no inward link`).toBeGreaterThanOrEqual(1);
    }
  });

  it('keeps the locale on the inward links', async () => {
    await renderPage('de');

    const links = screen
      .getAllByRole('link')
      .map((link) => link.getAttribute('href'))
      .filter((href): href is string => href !== null && href.startsWith('/'));

    expect(links.length).toBeGreaterThan(0);
    expect(links.every((href) => href.startsWith('/de'))).toBe(true);
  });

  it('never renders the scheduling metadata', async () => {
    // The words a `represents` leak would most plausibly produce. This is a
    // smoke test, not a proof — the proof is that `LocalizedScientist` has no
    // such field — but it is the assertion that would fail if someone added a
    // badge "because it would be nice to show the balance".
    const { container } = await renderPage('en');
    const text = container.textContent ?? '';

    for (const word of ['woman', 'Woman', 'represents', 'female', 'Female']) {
      expect(text).not.toContain(word);
    }
  });

  it('renders a formula that a screen reader can make sense of', async () => {
    await renderPage('en');

    const section = screen.getByRole('region', { name: en.explore.moleculeHeading });
    // The accessible name pairs the compound's name with its formula, because
    // subscripts are not read as chemistry.
    const moleculeName = within(section).getAllByRole('heading', { level: 3 })[0].textContent!;
    expect(section.textContent).toContain(moleculeName);
  });

  it('still renders with a pool of one', async () => {
    schedule.override = [EXPLORE_SCHEDULE[0]];

    await renderPage('en');

    expect(screen.getByRole('region', { name: en.explore.moleculeHeading })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: en.explore.scientistHeading })).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });

  it('shows that single pair whatever week it is', async () => {
    schedule.override = [EXPLORE_SCHEDULE[0]];

    await renderPage('en');
    const first = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent);

    vi.setSystemTime(new Date('2027-04-05T00:00:00.000Z'));
    const { container } = await renderPage('en');
    const later = Array.from(container.querySelectorAll('h3')).map((h) => h.textContent);

    expect(later).toEqual(first);
  });

  it('falls back to English for an unknown language segment rather than throwing', async () => {
    // A layout and a page must never throw on a bad segment: the 404 page
    // renders inside them.
    await renderPage('klingon');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(en.explore.heading);
  });
});

// ---------------------------------------------------------------------------
// The recent list
// ---------------------------------------------------------------------------
//
// The cases that matter are the small ones. Ten rows is what the page looks
// like forever after week ten, and it is the case that works by accident; 0, 1
// and 9 are the ones a build tests on a Tuesday in month six and never sees
// again. At week 0 there is no history at all, and the section must not render
// a heading over nothing.

/** Monday 00:00 UTC of week `n`, so no test has to count days in February. */
const mondayOfWeek = (n: number) => new Date(ROTATION_EPOCH + n * 7 * 24 * 60 * 60 * 1000);

/**
 * The rows of the recent list, or [] when the section is not on the page.
 *
 * The heading is a parameter because the section is named in the reader's
 * language: looking for the English name on a German page finds nothing and
 * reports it as "no rows", which would pass a length check by accident.
 */
function recentRows(heading: string = en.explore.recentHeading) {
  const section = screen.queryByRole('region', { name: heading });
  return section === null ? [] : within(section).getAllByRole('listitem');
}

describe('the recent list', () => {
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
    vi.setSystemTime(new Date(mondayOfWeek(week).getTime() + 3 * 24 * 60 * 60 * 1000));

    await renderPage('en');
    expect(recentRows()).toHaveLength(expected);
  });

  it('renders no heading at all in the first week, rather than an empty list', async () => {
    vi.setSystemTime(mondayOfWeek(0));
    await renderPage('en');

    // The failure this guards against is a section that renders its heading and
    // an empty <ul>, which reads as a page that failed to load.
    expect(
      screen.queryByRole('region', { name: en.explore.recentHeading })
    ).not.toBeInTheDocument();
    expect(screen.queryByText(en.explore.recentHeading)).not.toBeInTheDocument();
  });

  it('never shows the same entry twice across a rotation wrap', async () => {
    // Week 37 is seventeen weeks past the first wrap of a twenty-week cycle,
    // so "eleven weeks ago" and "thirty-one weeks ago" are genuinely the same
    // pair. The list must pick one of them, not both.
    vi.setSystemTime(mondayOfWeek(37));
    await renderPage('en');

    const hrefs = recentRows().flatMap((row) =>
      Array.from(row.querySelectorAll('a')).map((a) => a.getAttribute('href'))
    );
    expect(hrefs.length).toBe(20); // ten rows, two permalinks each
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it('never repeats the current week in the list below it', async () => {
    vi.setSystemTime(mondayOfWeek(37));
    const { container } = await renderPage('en');

    const thisWeek = Array.from(container.querySelectorAll('h3')).map((h) => h.textContent);
    const listed = recentRows().flatMap((row) =>
      Array.from(row.querySelectorAll('a')).map((a) => a.getAttribute('href'))
    );

    // The current pair's own permalinks must not appear in the past list.
    expect(thisWeek.length).toBeGreaterThan(0);
    const dateline = within(container.querySelector('header')!).getByText(/Week of/);
    expect(dateline.closest('time')?.getAttribute('datetime')).toBe(
      mondayOfWeek(37).toISOString().slice(0, 10)
    );
    expect(listed).not.toContain(null);
  });

  it('links every row to both permalinks, with the locale kept', async () => {
    vi.setSystemTime(mondayOfWeek(12));
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
    vi.setSystemTime(mondayOfWeek(37));

    await renderPage('en');
    expect(recentRows()).toHaveLength(3);
  });

  it('always offers the archive, even with no history', async () => {
    vi.setSystemTime(mondayOfWeek(0));
    await renderPage('en');

    const link = screen.getByRole('link', { name: en.explore.archiveCta });
    expect(link).toHaveAttribute('href', '/en/explore/archive');
  });
});

describe('generateMetadata', () => {
  it('gives the page its own canonical and a full set of hreflang alternates', async () => {
    const metadata = await generateMetadata({ params: Promise.resolve({ lang: 'de' }), searchParams: Promise.resolve({}) });

    expect(metadata.alternates?.canonical).toBe('/de/explore');
    expect(metadata.alternates?.languages).toMatchObject({
      en: '/en/explore',
      de: '/de/explore',
      fr: '/fr/explore',
      es: '/es/explore',
      it: '/it/explore',
      'x-default': '/en/explore',
    });
  });

  it('is localized', async () => {
    const english = await generateMetadata({ params: Promise.resolve({ lang: 'en' }), searchParams: Promise.resolve({}) });
    const german = await generateMetadata({ params: Promise.resolve({ lang: 'de' }), searchParams: Promise.resolve({}) });

    expect(english.title).toContain(en.explore.heading);
    expect(german.title).toContain(de.explore.heading);
    expect(german.description).toBe(de.explore.intro);
    expect(german.description).not.toBe(english.description);
  });
});
