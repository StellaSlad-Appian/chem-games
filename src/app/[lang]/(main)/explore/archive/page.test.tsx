// src/app/[lang]/(main)/explore/archive/page.test.tsx
//
// The index. What matters here is that it is **complete** — every pair, once
// each, both permalinks on every row — because that is the whole reason the
// page exists: forty entries reachable in one hop, from a URL a crawler can
// follow, while the repo still has no sitemap.
//
// And that it is complete **from the first week**. The version of this page
// that listed "everything that has been featured" would be a heading over
// nothing on launch day and would grow one row a week for five months.

import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { TestProviders } from '@/test-utils/render';
import { en } from '@/i18n/dictionaries/en';
import { getDictionary } from '@/i18n/dictionaries';
import { DEFAULT_LOCALE, isLocale, LOCALES } from '@/i18n/config';
import { ROTATION_EPOCH } from '@/lib/explore/rotation';
import { schedulablePairs } from '@/lib/explore/archive';

const Page = (await import('./page')).default;
const { generateMetadata } = await import('./page');

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const midWeek = (n: number) => new Date(ROTATION_EPOCH + n * WEEK_MS + 3 * 24 * 60 * 60 * 1000);
const POOL = schedulablePairs().length;

async function renderPage(lang: string) {
  const locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const dictionary = await getDictionary(locale);
  const ui = await Page({
    params: Promise.resolve({ lang }),
    searchParams: Promise.resolve({}),
  });
  return render(
    <TestProviders locale={locale} dictionary={dictionary}>
      {ui}
    </TestProviders>
  );
}

const rows = () => screen.getAllByRole('listitem');

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(midWeek(37));
});

afterEach(() => {
  vi.useRealTimers();
});

describe('the Explore archive', () => {
  it('lists every pair in the rotation, once each', async () => {
    await renderPage('en');
    expect(rows()).toHaveLength(POOL);
  });

  it('is just as complete in the first week, when nothing has run yet', async () => {
    vi.setSystemTime(midWeek(0));
    await renderPage('en');

    expect(rows()).toHaveLength(POOL);
    // Nineteen of the twenty are still to come, and the page says so rather
    // than dating them in a past that has not happened.
    expect(screen.getAllByText(/Not featured yet/)).toHaveLength(POOL - 1);
  });

  it('links both permalinks on every row, with no duplicates anywhere', async () => {
    await renderPage('en');

    const hrefs = rows().flatMap((row) =>
      Array.from(row.querySelectorAll('a')).map((a) => a.getAttribute('href'))
    );

    expect(hrefs).toHaveLength(POOL * 2);
    expect(new Set(hrefs).size).toBe(hrefs.length);
    expect(hrefs.filter((h) => h?.startsWith('/en/explore/molecules/'))).toHaveLength(POOL);
    expect(hrefs.filter((h) => h?.startsWith('/en/explore/scientists/'))).toHaveLength(POOL);
  });

  it('keeps the locale on every link', async () => {
    await renderPage('ru');
    const hrefs = screen
      .getAllByRole('link')
      .map((a) => a.getAttribute('href'))
      .filter((href): href is string => href !== null);

    expect(hrefs.length).toBeGreaterThan(0);
    expect(hrefs.every((href) => href.startsWith('/ru/'))).toBe(true);
  });

  it('marks exactly one row as the current week', async () => {
    await renderPage('en');
    const marked = screen.getAllByText(en.explore.archiveThisWeek);
    expect(marked).toHaveLength(1);

    // …and it is the row whose date is this week's Monday.
    const row = marked[0].closest('li')!;
    expect(within(row).getByText(/Week of/).closest('time')).toHaveAttribute(
      'datetime',
      new Date(ROTATION_EPOCH + 37 * WEEK_MS).toISOString().slice(0, 10)
    );
  });

  it('marks no row as the current week before the epoch', async () => {
    vi.setSystemTime(midWeek(-2));
    await renderPage('en');

    expect(rows()).toHaveLength(POOL);
    expect(screen.queryByText(en.explore.archiveThisWeek)).not.toBeInTheDocument();
  });

  it('has one h1 and renders in every locale', async () => {
    for (const locale of LOCALES) {
      const dictionary = await getDictionary(locale);
      const { unmount } = await renderPage(locale);
      const h1s = screen.getAllByRole('heading', { level: 1 });
      expect(h1s).toHaveLength(1);
      expect(h1s[0]).toHaveTextContent(dictionary.explore.archiveHeading);
      unmount();
    }
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
