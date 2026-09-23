// src/app/[lang]/(main)/explore/scientists/[id]/page.test.tsx
//
// The other permalink. The molecule route's spec covers what the two share —
// the heading tree, the three date sentences, the hreflang set, the Russian
// notice — so this file asserts the shape once and then spends its length on
// what is specific to this side:
//
//   * **`represents` must never reach the page.** The field exists so
//     `schedule.test.ts` can prove the schedule stays balanced; rendering it,
//     as a label or a badge or a filter, is the bias the section exists to
//     correct. There are now 120 more pages where that could leak.
//   * A person's name is never translated, in any locale.

import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { TestProviders } from '@/test-utils/render';
import { en } from '@/i18n/dictionaries/en';
import { getDictionary } from '@/i18n/dictionaries';
import { DEFAULT_LOCALE, isLocale, LOCALES } from '@/i18n/config';
import { ROTATION_EPOCH } from '@/lib/explore/rotation';
import { schedulablePairs } from '@/lib/explore/archive';
import { EXPLORE_SCIENTISTS } from '@/lib/explore/scientists';

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
const THIRD = PAIRS[2];

async function renderPage(
  lang: string,
  id: string,
  searchParams: Record<string, string> = {}
) {
  const locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  const dictionary = await getDictionary(locale);
  const ui = await Page({
    params: Promise.resolve({ lang, id }),
    searchParams: Promise.resolve(searchParams),
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

describe('a scientist permalink', () => {
  it('exists for every scientist in the pool', async () => {
    const params = await generateStaticParams();
    expect(params.map((p) => p.id).sort()).toEqual(
      EXPLORE_SCIENTISTS.map((s) => s.id).sort()
    );
  });

  it('makes the person’s name the h1, and skips no heading level', async () => {
    const { container } = await renderPage('en', 'kathleen-lonsdale');

    const h1s = screen.getAllByRole('heading', { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent('Kathleen Lonsdale');

    const levels = Array.from(container.querySelectorAll('h1,h2,h3,h4,h5,h6')).map((node) =>
      Number(node.tagName[1])
    );
    expect(levels[0]).toBe(1);
    for (let i = 1; i < levels.length; i += 1) {
      expect(levels[i] - levels[i - 1]).toBeLessThanOrEqual(1);
    }
  });

  it('never renders the scheduling metadata, for any entry in any locale', async () => {
    // The proof is that `LocalizedScientist` has no such field; this is the
    // assertion that would fail if someone added a badge "because it would be
    // nice to show the balance". Every entry, because a per-entry page is
    // exactly where showing it looks tempting.
    //
    // **Not a bare word search.** /explore's own spec scans for "woman" and
    // gets away with it because it renders one pair. Over all twenty, the word
    // occurs honestly in the prose and in a source label — Lonsdale's entry
    // cites "Chemistry World — Woman of substance", and says she was among the
    // first two women elected to the Royal Society. Failing on those would
    // teach whoever hit it to delete the sentence, which is the opposite of the
    // point. What a leak would actually look like is the field's *value*
    // standing alone in an element, so that is what is checked.
    const values = new Set(['woman', 'man', 'other']);

    for (const locale of LOCALES) {
      for (const scientist of EXPLORE_SCIENTISTS) {
        const { container, unmount } = await renderPage(locale, scientist.id);

        expect(container.textContent ?? '', `${locale}/${scientist.id}`).not.toContain(
          'represents'
        );

        const badges = Array.from(container.querySelectorAll('*'))
          .map((node) => (node.textContent ?? '').trim().toLowerCase())
          .filter((text) => values.has(text));
        expect(badges, `${locale}/${scientist.id} renders 'represents'`).toEqual([]);

        unmount();
      }
    }
  });

  it('never translates the name or the lifespan', async () => {
    for (const locale of LOCALES) {
      const { unmount } = await renderPage(locale, 'kathleen-lonsdale');
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Kathleen Lonsdale'
      );
      expect(screen.getByText('1903–1971')).toBeInTheDocument();
      unmount();
    }
  });

  it('links to the molecule it was paired with', async () => {
    await renderPage('en', THIRD.scientist.id);

    const pair = screen.getByRole('region', { name: en.explore.sameWeekHeading });
    expect(within(pair).getByRole('link')).toHaveAttribute(
      'href',
      `/en/explore/molecules/${THIRD.molecule.id}`
    );
  });

  it('says nothing about the rotation, exactly as its molecule does not', async () => {
    // The two are scheduled together and must stay consistent: neither
    // permalink carries the rotation box any more. See the fuller note in
    // the molecule permalink's test.
    vi.setSystemTime(midWeek(2));
    const { container } = await renderPage('en', THIRD.scientist.id);
    const text = container.textContent ?? '';

    expect(text).not.toMatch(/Featured in the week of/);
    expect(text).not.toMatch(/Last featured/);
    expect(text).not.toMatch(/comes round again/);
    expect(text).not.toMatch(/Not featured yet/);
  });

  it('offers the way back the reader actually came', async () => {
    // A reader who opened this from the archive should be sent back to the
    // archive, not dropped on /explore — a page they were never on, and one
    // that does not have the row they were reading.
    const fromArchive = await renderPage('en', 'tu-youyou', { from: 'archive' });
    const back = fromArchive.container.querySelector('a[href^="/en/explore"]')!;
    expect(back.getAttribute('href')).toBe('/en/explore/archive');
    expect(back.textContent).toContain(en.explore.backToArchive);
    fromArchive.unmount();

    // Arriving any other way — the weekly page, a shared link, a search
    // result — still goes to Explore.
    const direct = await renderPage('en', 'tu-youyou');
    const plain = direct.container.querySelector('a[href^="/en/explore"]')!;
    expect(plain.getAttribute('href')).toBe('/en/explore');
    expect(plain.textContent).toContain(en.explore.backToExplore);
    direct.unmount();
  });

  it('ignores a `from` it does not recognise', async () => {
    // The parameter is a hint from our own markup, not input to trust. A
    // hand-edited or stale value must not produce a broken back link.
    const { container } = await renderPage('en', 'tu-youyou', { from: 'nonsense' });
    const back = container.querySelector('a[href^="/en/explore"]')!;
    expect(back.getAttribute('href')).toBe('/en/explore');
  });

  it('calls notFound for an id that is not in the pool', async () => {
    await expect(renderPage('en', 'not-a-person')).rejects.toThrow('NEXT_NOT_FOUND');
    expect(notFound).toHaveBeenCalled();
  });
});

describe('generateMetadata', () => {
  it('titles the page after the person and rebuilds the alternates', async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ lang: 'it', id: 'tu-youyou' }),
      searchParams: Promise.resolve({}),
    });

    expect(metadata.title).toContain('Tu Youyou');
    expect(metadata.alternates?.canonical).toBe('/it/explore/scientists/tu-youyou');
    expect(metadata.alternates?.languages).toMatchObject({
      ru: '/ru/explore/scientists/tu-youyou',
      'x-default': '/en/explore/scientists/tu-youyou',
    });
  });

  it('describes the page from the entry’s own prose', async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ lang: 'en', id: 'tu-youyou' }),
      searchParams: Promise.resolve({}),
    });
    const scientist = EXPLORE_SCIENTISTS.find((s) => s.id === 'tu-youyou')!;
    expect(scientist.work.startsWith(metadata.description as string)).toBe(true);
  });

  it('says so rather than titling a 404 after the site', async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ lang: 'en', id: 'not-a-person' }),
      searchParams: Promise.resolve({}),
    });
    expect(metadata.title).toBe(en.meta.exploreEntryNotFound);
  });
});
