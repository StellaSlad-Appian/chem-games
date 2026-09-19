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
    expect(sectionOrder).toEqual([en.explore.moleculeHeading, en.explore.scientistHeading]);
  });

  it('shows one dateline, naming the Monday the week began on', async () => {
    await renderPage('en');

    // 21 September 2026 is the Monday of the week containing MID_WEEK. Day
    // first, because English formats through en-GB — `Intl.DateTimeFormat('en')`
    // resolves to en-US and would write "September 21, 2026" on a site that
    // spells things *neutralise*. See FORMATTING_LOCALE in src/i18n/config.ts.
    const dateline = screen.getByText(/Week of/);
    expect(dateline).toHaveTextContent('Week of 21 September 2026');
    expect(dateline.closest('time')).toHaveAttribute('datetime', '2026-09-21');

    // One clock, not two: exactly one dateline on the page.
    expect(screen.getAllByText(/Week of/)).toHaveLength(1);
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
