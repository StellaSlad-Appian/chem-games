// src/app/[lang]/(main)/explore/(tabs)/page.test.tsx
//
// The molecule tab, rendered inside the layout it now lives under.
//
// `/explore` is the molecule tab: no redirect, no `/explore/molecule`, and the
// layout's `useSelectedLayoutSegment` returns `null` here. So the mock below is
// pinned to `null`, and that is not a convenience — it is the route structure
// under test. If the strip stopped treating `null` as the molecule tab, this
// page would render with no pill marked current and nothing else would notice.
//
// ## The clocks
//
// There are two readings now: the layout takes one for the dateline and the
// two names on the strip, the page takes one for the card. A layout cannot
// pass data to its children (layout.md § "Fetching Data"), and the alternatives
// — a context provider, a timestamp in the URL — are worse than the
// duplication. Neither derives anything from the clock itself, so
// `vi.setSystemTime` still pins the pair together and the whole document stays
// deterministic; the cross-check below is what proves the two agree.

import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { screen, within } from '@testing-library/react';
import { renderExploreTab } from '@/test-utils/explore-tabs';
import { en } from '@/i18n/dictionaries/en';
import { de } from '@/i18n/dictionaries/de';
import { formattingLocale } from '@/i18n/config';
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

// `null` is the segment the layout sees at /explore — see the header.
vi.mock('next/navigation', async (importOriginal) => {
  const actual = await importOriginal<typeof import('next/navigation')>();
  return { ...actual, useSelectedLayoutSegment: () => null };
});

const { EXPLORE_SCHEDULE } = await import('@/lib/explore/schedule');
const ExplorePage = (await import('./page')).default;
const { generateMetadata } = await import('./page');

// A Wednesday inside the week that begins Monday 21 September 2026.
const MID_WEEK = new Date('2026-09-23T11:00:00.000Z');

const renderPage = (lang: string) => renderExploreTab(ExplorePage, lang);

/** The week's molecule name, which is both the card's heading and its label. */
const moleculeName = () => screen.getAllByRole('heading', { level: 2 })[0].textContent!;

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(MID_WEEK);
});

afterEach(() => {
  schedule.override = null;
  vi.useRealTimers();
});

describe('the molecule tab', () => {
  it('renders one h1 — the layout’s — with the card beneath it', async () => {
    await renderPage('en');

    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent(en.explore.heading);

    // The card's landmark is named by the entry, not by "Molecule of the Week":
    // the eyebrow is permalink-only now, and the entry's name is the better
    // accessible name anyway because it says *which* entry (explore.md §9).
    expect(screen.getByRole('region', { name: moleculeName() })).toBeInTheDocument();
  });

  it('opens no second main', async () => {
    // The layout owns it. A tab page that opened its own would give the
    // document a third main landmark — the (main) group's layout supplies the
    // outer one — which is one more than a screen reader should be offered.
    const { container } = await renderPage('en');
    expect(container.querySelectorAll('main')).toHaveLength(1);
  });

  it('drops the eyebrow, and does not skip a heading level doing it', async () => {
    const { container } = await renderPage('en');

    // h1 Explore, h2 the entry's name, h3 for its sections. Four levels for one
    // card became three when the eyebrow left.
    const levels = Array.from(container.querySelectorAll('h1,h2,h3,h4,h5,h6')).map((node) =>
      Number(node.tagName[1])
    );
    expect(levels[0]).toBe(1);
    for (let i = 1; i < levels.length; i += 1) {
      expect(levels[i] - levels[i - 1]).toBeLessThanOrEqual(1);
    }

    // The eyebrow is gone from the document, not merely demoted. It is still on
    // the permalink, which is where it earns its place.
    expect(screen.queryByText(en.explore.moleculeHeading)).not.toBeInTheDocument();
    expect(container.querySelectorAll('h4')).toHaveLength(0);
  });

  it('shows the scientist’s name but not the scientist’s card', async () => {
    // The one real cost of tabs is that the chemist is behind a click, and the
    // name on the inactive pill is the whole mitigation. Both halves matter:
    // the name is present, the card is not.
    await renderPage('en');

    const nav = screen.getByRole('navigation', { name: en.explore.tabsA11y });
    const scientistPill = within(nav).getByRole('link', { name: /Scientist/ });
    expect(scientistPill).toHaveAttribute('href', '/en/explore/scientist');
    // The pill says more than its own label: the chemist's name is under it.
    expect(scientistPill.textContent).not.toBe(en.explore.tabScientist);

    // …and only the molecule's card is on the page.
    expect(screen.getAllByRole('region')).toHaveLength(1);
  });

  it('marks the molecule pill as the current page and no other', async () => {
    await renderPage('en');

    const nav = screen.getByRole('navigation', { name: en.explore.tabsA11y });
    const current = within(nav).getAllByRole('link', { current: 'page' });
    expect(current).toHaveLength(1);
    expect(current[0]).toHaveAttribute('href', '/en/explore');
  });

  it('agrees with the strip about which molecule this week is', async () => {
    // The two clock readings, cross-checked. In production they can disagree
    // only across a Monday midnight boundary; here they must not disagree at
    // all, because that agreement is what makes the repeated name on the active
    // pill read as confirmation rather than as a bug.
    await renderPage('en');

    const nav = screen.getByRole('navigation', { name: en.explore.tabsA11y });
    expect(within(nav).getAllByRole('link')[0]).toHaveTextContent(moleculeName());
  });

  it('shows one dateline, on the tab row, naming the Monday the week began on', async () => {
    const { container } = await renderPage('en');

    // 21 September 2026 is the Monday of the week containing MID_WEEK. Day
    // first, because English formats through en-AU — `Intl.DateTimeFormat('en')`
    // resolves to en-US and would write "September 21, 2026" on a site that
    // spells things *neutralise*. See FORMATTING_LOCALE in src/i18n/config.ts.
    const header = container.querySelector('header')!;
    const dateline = within(header).getByText(/Week of/);
    expect(dateline).toHaveTextContent('Week of 21 September 2026');
    expect(dateline.closest('time')).toHaveAttribute('datetime', '2026-09-21');

    // Once on the whole document, not once per section. The dateline moved onto
    // the strip precisely so it would stop being a band of its own, and the
    // recent list that used to repeat the pattern moved to the archive tab.
    expect(container.querySelectorAll('time')).toHaveLength(1);
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
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(de.explore.heading);
  });

  it('gives the card a link that goes somewhere inside the site', async () => {
    await renderPage('en');

    const section = screen.getByRole('region', { name: moleculeName() });
    const inward = within(section)
      .getAllByRole('link')
      .map((link) => link.getAttribute('href'))
      .filter((href): href is string => href !== null)
      .filter((href) => href.startsWith('/en/cheat-sheets/') || href.startsWith('/en/games/'));

    expect(inward.length).toBeGreaterThanOrEqual(1);
  });

  it('keeps the locale on every internal link, the tab strip included', async () => {
    await renderPage('de');

    const links = screen
      .getAllByRole('link')
      .map((link) => link.getAttribute('href'))
      .filter((href): href is string => href !== null && href.startsWith('/'));

    expect(links.length).toBeGreaterThan(0);
    expect(links.every((href) => href.startsWith('/de'))).toBe(true);
    expect(links).toContain('/de/explore/scientist');
    expect(links).toContain('/de/explore/archive');
  });

  it('never renders the scheduling metadata', async () => {
    // The words a `represents` leak would most plausibly produce. A smoke test,
    // not a proof — the proof is that `LocalizedScientist` has no such field —
    // but it is what would fail if someone added a badge "because it would be
    // nice to show the balance". It matters more now than it did: the strip
    // renders the chemist's name on a page that is not theirs.
    const { container } = await renderPage('en');
    const text = container.textContent ?? '';

    for (const word of ['woman', 'Woman', 'represents', 'female', 'Female']) {
      expect(text).not.toContain(word);
    }
  });

  it('renders a formula that a screen reader can make sense of', async () => {
    await renderPage('en');

    const section = screen.getByRole('region', { name: moleculeName() });
    // The accessible name pairs the compound's name with its formula, because
    // subscripts are not read as chemistry.
    expect(section.textContent).toContain(moleculeName());
  });

  it('floats the picture into the prose rather than putting it in a column', async () => {
    // The change that actually answers the complaint the redesign started from.
    // Asserted on the classes rather than a measured box, because jsdom
    // computes no layout — the browser check lives in e2e/explore.spec.ts.
    const { container } = await renderPage('en');

    const image = container.querySelector('section img');
    expect(image).not.toBeNull();

    // Floated from `sm`, so the prose wraps down its side and then runs full
    // width underneath it. Below `sm` there is no float at all: a 40% float in
    // a 320px viewport leaves the text a ribbon.
    expect(image!.className).toContain('sm:float-left');

    // The structure diagrams are landscape, so this one takes the wider of the
    // two widths. The narrow one is for portraits — see the scientist tab.
    expect(image!.className).toContain('sm:w-2/5');

    // Width is the only constraint on a float. Capping its height would make
    // `object-contain` letterbox the picture and the prose would then wrap
    // around a band of dead space, so neither class belongs here any more.
    expect(image!.className).not.toContain('max-h-80');
    expect(image!.className).not.toContain('object-contain');

    // A float needs a plain block to live in: a grid or flex parent ignores it
    // outright, and the prose would stop wrapping.
    const figureParent = image!.parentElement!;
    expect(figureParent.className).not.toContain('grid');
    expect(figureParent.className).not.toContain('flex');

    // And it has to be ended, or a picture taller than its own text hangs out
    // of the card with the inward link and sources wrapping up its side.
    expect(figureParent.querySelector('.clear-both')).not.toBeNull();
  });

  it('still renders with a pool of one', async () => {
    schedule.override = [EXPLORE_SCHEDULE[0]];

    await renderPage('en');

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByRole('region', { name: moleculeName() })).toBeInTheDocument();
  });

  it('shows that single pair whatever week it is', async () => {
    schedule.override = [EXPLORE_SCHEDULE[0]];

    await renderPage('en');
    const first = screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent);

    vi.setSystemTime(new Date('2027-04-05T00:00:00.000Z'));
    const { container } = await renderPage('en');
    const later = Array.from(container.querySelectorAll('h2')).map((h) => h.textContent);

    expect(later).toEqual(first);
  });

  it('falls back to English for an unknown language segment rather than throwing', async () => {
    // A layout and a page must never throw on a bad segment: the 404 page
    // renders inside them. Doubly true now that there are two of them in this
    // tree, either of which could be the one that throws.
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

  it('is unchanged by the move into the route group', async () => {
    // `(tabs)` contributes nothing to the URL, so the canonical and every
    // alternate stay exactly what they were before the file moved. This is the
    // assertion that fails if the group ever stops being a group.
    const metadata = await generateMetadata({ params: Promise.resolve({ lang: 'ru' }), searchParams: Promise.resolve({}) });

    expect(metadata.alternates?.canonical).toBe('/ru/explore');
    expect(JSON.stringify(metadata.alternates?.languages)).not.toContain('tabs');
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
