// src/app/[lang]/(main)/about/page.test.tsx
//
// The About page. It renders every section in English, links to the privacy
// and For Teachers pages with the locale prefix, cites each source by DOI, and
// — while it is English-only — is a 404 in every locale without a catalogue,
// rather than an English page inside a translated site.

import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { ReactElement } from 'react';
import { TestProviders } from '@/test-utils/render';
import { en } from '@/i18n/dictionaries/en';
import { LOCALES, type Locale } from '@/i18n/config';
import { ABOUT_CATALOGUES } from '@/i18n/about';
import { en as enAbout } from '@/i18n/about/en';

const notFound = vi.hoisted(() =>
  vi.fn(() => {
    throw new Error('NEXT_NOT_FOUND');
  })
);

vi.mock('next/navigation', async (importOriginal) => ({
  ...(await importOriginal<typeof import('next/navigation')>()),
  notFound,
}));

const AboutPage = (await import('./page')).default;
const { generateMetadata } = await import('./page');

const props = (lang: string): PageProps<'/[lang]/about'> => ({
  params: Promise.resolve({ lang }),
  searchParams: Promise.resolve({}),
});

async function renderPage(locale: Locale) {
  const ui = (await AboutPage(props(locale))) as ReactElement;
  return render(ui, {
    wrapper: ({ children }) => (
      <TestProviders locale={locale} dictionary={en}>
        {children}
      </TestProviders>
    ),
  });
}

beforeEach(() => {
  notFound.mockClear();
});

describe('About page', () => {
  it('renders every section heading in English, with one h1', async () => {
    await renderPage('en');

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByRole('heading', { level: 1, name: enAbout.heading })).toBeInTheDocument();
    for (const section of [
      enAbout.storyHeading,
      enAbout.helpHeading,
      enAbout.limitsHeading,
      enAbout.parentsHeading,
      enAbout.teachersHeading,
      enAbout.sourcesHeading,
    ]) {
      expect(screen.getByRole('heading', { level: 2, name: section })).toBeInTheDocument();
    }
  });

  it('says in so many words that the site itself has not been studied', async () => {
    // The page is allowed to persuade; this sentence is what keeps it honest.
    await renderPage('en');
    expect(screen.getByText(enAbout.limitsBody1)).toHaveTextContent(
      'no study of Games in Chemistry itself'
    );
  });

  it('links to the privacy and For Teachers pages with the locale prefix', async () => {
    await renderPage('en');
    expect(screen.getByRole('link', { name: enAbout.privacyLinkLabel })).toHaveAttribute(
      'href',
      '/en/privacy'
    );
    expect(screen.getByRole('link', { name: en.footer.teachers })).toHaveAttribute(
      'href',
      '/en/teachers'
    );
  });

  it('cites every source by DOI, opening in a new tab', async () => {
    await renderPage('en');
    for (const source of enAbout.sources) {
      expect(source.href).toMatch(/^https:\/\/doi\.org\/10\./);
      const anchor = screen.getByRole('link', { name: new RegExp(`^${escape(source.citation)}`) });
      expect(anchor).toHaveAttribute('href', source.href);
      expect(anchor).toHaveAttribute('target', '_blank');
      expect(anchor).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });

  it('takes its metadata from the About catalogue', async () => {
    await expect(generateMetadata(props('en'))).resolves.toEqual({
      title: enAbout.metaTitle,
      description: enAbout.metaDescription,
    });
  });

  describe('in a locale without an About catalogue', () => {
    const untranslated = LOCALES.filter((locale) => !ABOUT_CATALOGUES[locale]);

    it('there is at least one such locale while the page is English-only', () => {
      // When every locale is translated this list empties; delete this block.
      expect(untranslated.length).toBeGreaterThan(0);
    });

    it.each(untranslated)('is a 404 in %s, page and metadata alike', async (locale) => {
      await expect(renderPage(locale)).rejects.toThrow('NEXT_NOT_FOUND');
      await expect(generateMetadata(props(locale))).rejects.toThrow('NEXT_NOT_FOUND');
      expect(notFound).toHaveBeenCalled();
    });
  });
});

/** Escapes a copy string so it can go inside a RegExp. */
function escape(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
