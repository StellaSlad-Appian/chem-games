// src/app/[lang]/(main)/explore/molecules/[id]/page.test.tsx
//
// The permalink, with the clock pinned.
//
// The scientist route next door is the same file with the other pool, so the
// things that are genuinely shared — the heading tree, the hreflang set, the
// deferred-prose notice — are asserted here and spot-checked there rather than
// written out twice.
//
// What this file is really for is the **date sentence**. An entry runs again
// every twenty weeks, so there are three things a permalink can truthfully say
// and the page has to pick the right one. Each is pinned to a fixed week below.

import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { TestProviders } from '@/test-utils/render';
import { en } from '@/i18n/dictionaries/en';
import { ru } from '@/i18n/dictionaries/ru';
import { getDictionary } from '@/i18n/dictionaries';
import { DEFAULT_LOCALE, isLocale, LOCALES } from '@/i18n/config';
import { ROTATION_EPOCH } from '@/lib/explore/rotation';
import { schedulablePairs } from '@/lib/explore/archive';
import { EXPLORE_MOLECULES } from '@/lib/explore/molecules';

const notFound = vi.hoisted(() => vi.fn(() => {
  throw new Error('NEXT_NOT_FOUND');
}));

vi.mock('next/navigation', async (importOriginal) => ({
  ...(await importOriginal<typeof import('next/navigation')>()),
  notFound,
}));

const Page = (await import('./page')).default;
const { generateMetadata, generateStaticParams } = await import('./page');

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const midWeek = (n: number) => new Date(ROTATION_EPOCH + n * WEEK_MS + 3 * 24 * 60 * 60 * 1000);

const PAIRS = schedulablePairs();
const POOL = PAIRS.length;
/** The pair scheduled for rotation week 2, so its runs are weeks 2, 22, 42… */
const THIRD = PAIRS[2];

async function renderPage(lang: string, id: string) {
  const locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const dictionary = await getDictionary(locale);
  const ui = await Page({
    params: Promise.resolve({ lang, id }),
    searchParams: Promise.resolve({}),
  });
  return render(
    <TestProviders locale={locale} dictionary={dictionary}>
      {ui}
    </TestProviders>
  );
}

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(midWeek(37));
  notFound.mockClear();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('a molecule permalink', () => {
  it('exists for every molecule in the pool, not only the scheduled ones', async () => {
    const params = await generateStaticParams();
    expect(params.map((p) => p.id).sort()).toEqual(
      EXPLORE_MOLECULES.map((m) => m.id).sort()
    );
    // The point of the route: 20 permalinks, not 1.
    expect(params.length).toBe(EXPLORE_MOLECULES.length);
  });

  it('makes the entry’s own name the h1', async () => {
    await renderPage('en', 'benzene');

    const h1s = screen.getAllByRole('heading', { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent('Benzene');
    // And "Molecule of the Week" is an eyebrow, not a heading: on a page about
    // one molecule it labels the entry, it does not name a section.
    expect(
      screen.queryByRole('heading', { name: en.explore.moleculeHeading })
    ).not.toBeInTheDocument();
  });

  it('skips no heading level', async () => {
    const { container } = await renderPage('en', 'benzene');

    const levels = Array.from(container.querySelectorAll('h1,h2,h3,h4,h5,h6')).map((node) =>
      Number(node.tagName[1])
    );
    expect(levels[0]).toBe(1);
    for (let i = 1; i < levels.length; i += 1) {
      expect(levels[i] - levels[i - 1]).toBeLessThanOrEqual(1);
    }
  });

  it('renders the entry’s prose and its inward link', async () => {
    await renderPage('en', 'benzene');

    const molecule = EXPLORE_MOLECULES.find((m) => m.id === 'benzene')!;
    expect(screen.getByText(molecule.everyday)).toBeInTheDocument();
    expect(screen.getByText(molecule.chemistry)).toBeInTheDocument();

    const inward = screen
      .getAllByRole('link')
      .map((link) => link.getAttribute('href'))
      .filter((href): href is string => href !== null);
    expect(inward.some((href) => href.startsWith('/en/cheat-sheets/'))).toBe(true);
    expect(inward).toContain('/en/explore');
    expect(inward).toContain('/en/explore/archive');
  });

  it('links to the other half of its pair', async () => {
    await renderPage('en', THIRD.molecule.id);

    const pair = screen.getByRole('region', { name: en.explore.sameWeekHeading });
    const link = within(pair).getByRole('link');
    expect(link).toHaveAttribute(
      'href',
      `/en/explore/scientists/${THIRD.scientist.id}`
    );
  });

  // -------------------------------------------------------------------------
  // The date sentence — the part most likely to be wrong
  // -------------------------------------------------------------------------

  it('says "not yet" before the entry has ever run', async () => {
    // Week 1, asking about the pair due in week 2.
    vi.setSystemTime(midWeek(1));
    await renderPage('en', THIRD.molecule.id);

    expect(screen.getByText(/Not featured yet/)).toBeInTheDocument();
    expect(screen.queryByText(/Last featured/)).not.toBeInTheDocument();
  });

  it('names a single week only when the entry has run exactly once', async () => {
    vi.setSystemTime(midWeek(2));
    await renderPage('en', THIRD.molecule.id);

    expect(screen.getByText(/^Featured in the week of /)).toBeInTheDocument();
    expect(screen.queryByText(/comes round again/)).not.toBeInTheDocument();
  });

  it('names both weeks once the entry has run more than once', async () => {
    // **The trap.** Week 2 and week 22 are the same pair. A page read in week
    // 25 that said "Featured in the week of 19 January" would be pointing a
    // reader at a week five months before the one that actually happened.
    vi.setSystemTime(midWeek(POOL + 5));
    const { container } = await renderPage('en', THIRD.molecule.id);

    const text = container.textContent ?? '';
    expect(text).toMatch(/Last featured in the week of /);
    expect(text).toMatch(/comes round again in the week of /);
    // Two different dates, not the same one twice.
    const dates = text.match(/\d{1,2} \w+ \d{4}/g) ?? [];
    expect(new Set(dates).size).toBeGreaterThanOrEqual(2);
  });

  it('never dates a permalink with a <time> element', async () => {
    // A `<time datetime>` on a sentence holding two dates tells a crawler the
    // page is about one day. For an entry that runs every twenty weeks there is
    // no such day, so the page makes no machine-readable claim. The dateline on
    // /explore and the archive rows, which really are one week each, still do.
    const { container } = await renderPage('en', THIRD.molecule.id);
    expect(container.querySelectorAll('time')).toHaveLength(0);
  });

  it('formats its dates in the reader’s language, through formattingLocale', async () => {
    const { container } = await renderPage('de', THIRD.molecule.id);
    const text = container.textContent ?? '';

    expect(text).toContain('Zuletzt vorgestellt');
    // German month names, not English ones. The specific month depends on the
    // week, so the assertion is that no English month survived.
    expect(text).not.toMatch(/January|February|September|October/);
  });

  // -------------------------------------------------------------------------
  // Locales
  // -------------------------------------------------------------------------

  it('resolves in every locale', async () => {
    for (const locale of LOCALES) {
      const { unmount } = await renderPage(locale, 'benzene');
      expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
      unmount();
    }
  });

  it('carries the deferred-prose notice for Russian, as the week page does', async () => {
    // docs/feature-briefs/explore.md §0c. A permalink is the likeliest page for
    // a Russian reader to arrive at cold — from a search result or a shared
    // link — with no page above it to have explained anything.
    await renderPage('ru', 'benzene');
    expect(screen.getByText(ru.explore.untranslatedNotice)).toBeInTheDocument();
  });

  it('shows that notice in no other locale', async () => {
    for (const locale of LOCALES.filter((l) => l !== 'ru')) {
      const dictionary = await getDictionary(locale);
      const { unmount } = await renderPage(locale, 'benzene');
      expect(
        screen.queryByText(dictionary.explore.untranslatedNotice)
      ).not.toBeInTheDocument();
      unmount();
    }
  });

  it('calls notFound for an id that is not in the pool', async () => {
    await expect(renderPage('en', 'not-a-molecule')).rejects.toThrow('NEXT_NOT_FOUND');
    expect(notFound).toHaveBeenCalled();
  });

  it('falls back to English for an unknown language segment rather than throwing', async () => {
    await renderPage('klingon', 'benzene');
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });
});

describe('generateMetadata', () => {
  it('titles the page after the entry', async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ lang: 'en', id: 'benzene' }),
      searchParams: Promise.resolve({}),
    });

    expect(metadata.title).toContain('Benzene');
    expect(metadata.title).toContain(en.meta.siteName);
  });

  it('describes it from its own prose, in whole sentences', async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ lang: 'en', id: 'benzene' }),
      searchParams: Promise.resolve({}),
    });

    const molecule = EXPLORE_MOLECULES.find((m) => m.id === 'benzene')!;
    expect(typeof metadata.description).toBe('string');
    expect(molecule.everyday.startsWith(metadata.description as string)).toBe(true);
    expect(metadata.description).toMatch(/[.!?]$/);
  });

  it('rebuilds canonical and hreflang for this path, not the site root', async () => {
    // Metadata is shallowly merged between segments, so returning `alternates`
    // replaces the layout's whole object. Inheriting would give all 240 pages
    // the site root's canonical.
    const metadata = await generateMetadata({
      params: Promise.resolve({ lang: 'de', id: 'benzene' }),
      searchParams: Promise.resolve({}),
    });

    expect(metadata.alternates?.canonical).toBe('/de/explore/molecules/benzene');
    expect(metadata.alternates?.languages).toMatchObject({
      en: '/en/explore/molecules/benzene',
      de: '/de/explore/molecules/benzene',
      fr: '/fr/explore/molecules/benzene',
      es: '/es/explore/molecules/benzene',
      it: '/it/explore/molecules/benzene',
      ru: '/ru/explore/molecules/benzene',
      'x-default': '/en/explore/molecules/benzene',
    });
  });

  it('covers every locale in LOCALES, with no locale missing from the set', async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ lang: 'en', id: 'water' }),
      searchParams: Promise.resolve({}),
    });
    const languages = Object.keys(metadata.alternates?.languages ?? {});
    for (const locale of LOCALES) expect(languages).toContain(locale);
  });

  it('says so rather than titling a 404 after the site', async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ lang: 'en', id: 'not-a-molecule' }),
      searchParams: Promise.resolve({}),
    });
    expect(metadata.title).toBe(en.meta.exploreEntryNotFound);
  });

  it('adds no openGraph image while the pictures are placeholders', async () => {
    // An SVG that reads "PICTURE TO COME" is not something to hand a social
    // card: the platforms will not render an SVG anyway, and the one they would
    // render says the picture is missing. See the note on the route.
    const metadata = await generateMetadata({
      params: Promise.resolve({ lang: 'en', id: 'benzene' }),
      searchParams: Promise.resolve({}),
    });
    expect(metadata.openGraph?.images).toBeUndefined();
  });
});
