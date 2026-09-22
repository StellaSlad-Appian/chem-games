// src/app/[lang]/(main)/explore/(tabs)/scientist/page.test.tsx
//
// The scientist tab: new in this change, and the half of the pair that is now
// behind a click.
//
// Most of what could be asserted about the chemist's content is already
// asserted about `ScientistCard` and about the permalink, and re-asserting it
// here would only prove that the same component renders the same way twice.
// What is new and only true here is the routing: this is the one tab with a
// segment of its own, and it must come up under the same header as the other
// two with its own pill marked current and no `<h1>` of its own.
//
// The `represents` check is repeated rather than inherited, and deliberately.
// This is the page where the scheduling metadata would be most tempting to
// show, because it is the only page that is *about* the chemist — and it is the
// one page in the feature where showing it would do the most harm.

import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { screen, within } from '@testing-library/react';
import { renderExploreTab } from '@/test-utils/explore-tabs';
import { en } from '@/i18n/dictionaries/en';
import { de } from '@/i18n/dictionaries/de';
import { getDictionary } from '@/i18n/dictionaries';
import { LOCALES } from '@/i18n/config';

vi.mock('next/navigation', async (importOriginal) => {
  const actual = await importOriginal<typeof import('next/navigation')>();
  return { ...actual, useSelectedLayoutSegment: () => 'scientist' };
});

const Page = (await import('./page')).default;
const { generateMetadata } = await import('./page');

// A Wednesday inside the week that begins Monday 21 September 2026.
const MID_WEEK = new Date('2026-09-23T11:00:00.000Z');

const renderPage = (lang: string) => renderExploreTab(Page, lang);

/** The week's chemist, which is both the card's heading and its label. */
const scientistName = () => screen.getAllByRole('heading', { level: 2 })[0].textContent!;

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(MID_WEEK);
});

afterEach(() => {
  vi.useRealTimers();
});

describe('the scientist tab', () => {
  it('renders under the same h1 as the other two tabs', async () => {
    const { container } = await renderPage('en');

    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent(en.explore.heading);
    // Not "Scientist of the Week" as the page heading: the tab is a section of
    // Explore, not a page of its own.
    expect(headings[0]).not.toHaveTextContent(en.explore.scientistHeading);
    expect(container.querySelectorAll('main')).toHaveLength(1);
  });

  it('marks its own pill as the current page and no other', async () => {
    await renderPage('en');

    const nav = screen.getByRole('navigation', { name: en.explore.tabsA11y });
    const current = within(nav).getAllByRole('link', { current: 'page' });
    expect(current).toHaveLength(1);
    expect(current[0]).toHaveAttribute('href', '/en/explore/scientist');
  });

  it('shows the chemist’s card, named by the chemist', async () => {
    await renderPage('en');

    const section = screen.getByRole('region', { name: scientistName() });
    expect(within(section).getByText(en.explore.workHeading)).toBeInTheDocument();
    expect(within(section).getByText(en.explore.legacyHeading)).toBeInTheDocument();
    // One card, not two: the molecule has a tab of its own.
    expect(screen.getAllByRole('region')).toHaveLength(1);
  });

  it('drops the eyebrow and skips no heading level', async () => {
    const { container } = await renderPage('en');

    const levels = Array.from(container.querySelectorAll('h1,h2,h3,h4,h5,h6')).map((node) =>
      Number(node.tagName[1])
    );
    expect(levels[0]).toBe(1);
    for (let i = 1; i < levels.length; i += 1) {
      expect(levels[i] - levels[i - 1]).toBeLessThanOrEqual(1);
    }
    expect(screen.queryByText(en.explore.scientistHeading)).not.toBeInTheDocument();
  });

  it('agrees with the strip about who this week is', async () => {
    // The layout and the page each read the clock. They must name the same
    // chemist, or the active pill contradicts the card underneath it.
    await renderPage('en');

    const nav = screen.getByRole('navigation', { name: en.explore.tabsA11y });
    expect(within(nav).getAllByRole('link')[1]).toHaveTextContent(scientistName());
  });

  it('carries the same single dateline as the other tabs', async () => {
    const { container } = await renderPage('en');

    expect(container.querySelectorAll('time')).toHaveLength(1);
    const header = container.querySelector('header')!;
    expect(within(header).getByText(/Week of/).closest('time')).toHaveAttribute(
      'datetime',
      '2026-09-21'
    );
  });

  it('never renders the scheduling metadata', async () => {
    // Half of the twenty chemists are there because the schedule is balanced,
    // and being marked out as "the woman" is the bias the section exists to
    // correct. `LocalizedScientist` has no such field; this is the assertion
    // that fails if someone reaches past it.
    const { container } = await renderPage('en');
    const text = container.textContent ?? '';

    for (const word of ['woman', 'Woman', 'represents', 'female', 'Female']) {
      expect(text).not.toContain(word);
    }
  });

  it('floats the picture into the prose, narrower when it is a portrait', async () => {
    // A chemist's picture is the tall one, which is exactly why a fixed column
    // is wrong for it: in a column a portrait holds the text in a ribbon for
    // its whole height, where a float lets the text past its chin and then
    // back out to full width underneath.
    const { container } = await renderPage('en');

    const image = container.querySelector('section img') as HTMLImageElement | null;
    if (image) {
      // The float lives on the <figure>, not the <img>. It moved there when
      // the licence credit arrived: the credit has to travel with the
      // picture it credits, and a <figcaption> outside the floated box
      // would wrap into the prose on its own.
      const figure = image.closest('figure')!;
      expect(figure).not.toBeNull();
      expect(figure.className).toContain('sm:float-left');

      // The width is picked from the file's own dimensions, so the rule has
      // to be checked against whichever shape this slot currently holds.
      // Most are portraits now that the placeholders are gone; the landscape
      // branch still covers the ones that are not, such as a manuscript.
      const isPortrait = Number(image.getAttribute('height')) > Number(image.getAttribute('width'));
      expect(figure.className).toContain(isPortrait ? 'sm:w-1/3' : 'sm:w-2/5');

      // Height is never capped on a float — `object-contain` would letterbox
      // it and the prose would wrap around the dead space.
      expect(image.className).not.toContain('max-h-80');

      expect(figure.parentElement!.className).not.toContain('grid');
      // A licence line wrapping around the photograph it credits is the
      // thing `clear-both` prevents.
      expect(figure.parentElement!.querySelector('.clear-both')).not.toBeNull();
    }
    // With no picture there is simply no float to wrap, so the prose fills the
    // width on its own — half the chemists still have no picture at all, so
    // this is the common case and not the edge one. The prose container must
    // stay a plain block either way: give it a grid, a flex or an
    // `overflow-hidden` and it stops wrapping the float when a picture does
    // arrive, which is the failure that would only show up on the day someone
    // drops a photograph in.
    const prose = screen.getByText(en.explore.workHeading).closest('div')!.parentElement!;
    expect(prose.className).not.toContain('grid');
    expect(prose.className).not.toContain('flex');
    expect(prose.className).not.toContain('overflow-hidden');
  });

  it('keeps the locale on every internal link', async () => {
    await renderPage('de');

    const links = screen
      .getAllByRole('link')
      .map((link) => link.getAttribute('href'))
      .filter((href): href is string => href !== null && href.startsWith('/'));

    expect(links.length).toBeGreaterThan(0);
    expect(links.every((href) => href.startsWith('/de'))).toBe(true);
    expect(links).toContain('/de/explore');
  });

  it.each(LOCALES)('renders in %s with one h1 and one card', async (locale) => {
    const dictionary = await getDictionary(locale);
    const { unmount } = await renderPage(locale);

    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent(dictionary.explore.heading);
    expect(screen.getAllByRole('region')).toHaveLength(1);
    unmount();
  });

  it('falls back to English for an unknown language segment rather than throwing', async () => {
    await renderPage('klingon');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(en.explore.heading);
  });
});

describe('generateMetadata', () => {
  it('carries its own canonical and a full set of hreflang alternates', async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ lang: 'de' }),
      searchParams: Promise.resolve({}),
    });

    expect(metadata.alternates?.canonical).toBe('/de/explore/scientist');
    expect(metadata.alternates?.languages).toMatchObject({
      en: '/en/explore/scientist',
      de: '/de/explore/scientist',
      fr: '/fr/explore/scientist',
      es: '/es/explore/scientist',
      it: '/it/explore/scientist',
      ru: '/ru/explore/scientist',
      'x-default': '/en/explore/scientist',
    });
  });

  it('is titled distinctly from the molecule tab', async () => {
    // Both tabs live under one `<h1>`, so if both took `explore.heading` as
    // their title a bookmark, a browser tab and a search result would all be
    // unable to tell them apart. The long section heading is the right length
    // in all three of those places, even though it is too long for a pill.
    const metadata = await generateMetadata({
      params: Promise.resolve({ lang: 'en' }),
      searchParams: Promise.resolve({}),
    });

    expect(metadata.title).toContain(en.explore.scientistHeading);
    expect(metadata.title).not.toBe(`${en.explore.heading} | ${en.meta.siteName}`);
  });

  it('describes the section rather than this week’s chemist', async () => {
    // The URL does not change when the entry does, so a description built from
    // whoever is currently showing would describe the wrong person for most of
    // the twenty weeks a crawler's copy is alive. The permalinks are the pages
    // that describe one person.
    const metadata = await generateMetadata({
      params: Promise.resolve({ lang: 'de' }),
      searchParams: Promise.resolve({}),
    });

    expect(metadata.description).toBe(de.explore.intro);
  });
});
