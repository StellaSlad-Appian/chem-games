// src/app/[lang]/(main)/teachers/page.test.tsx
//
// The "For Teachers" page. Required by docs/TEACHERS_PAGE.md § 7: it renders
// in English and in one other locale, every section heading is present, the
// link targets are right, the support section appears only when
// NEXT_PUBLIC_SUPPORT_URL is set, and the metadata comes from the dictionary.
//
// The page is an async Server Component, so it is awaited and its returned
// element handed to Testing Library. It still has to go through
// `TestProviders`, because every internal link is a `LocaleLink`, which is a
// client component and reads `useI18n()` — that is also what makes the locale
// prefix in the asserted hrefs real rather than hard-coded.

import { render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { ReactElement } from 'react';
import TeachersPage, { generateMetadata } from './page';
import { TestProviders } from '@/test-utils/render';
import { getCheatSheets } from '@/i18n/cheat-sheets';
import { de } from '@/i18n/dictionaries/de';
import { en } from '@/i18n/dictionaries/en';
import type { Dictionary } from '@/i18n/dictionaries/en';
import type { Locale } from '@/i18n/config';
import { en as enTeachers } from '@/i18n/teachers/en';
import { de as deTeachers } from '@/i18n/teachers/de';

const SUPPORT_URL = 'https://example.test/support-chemgames';

const props = (lang: string): PageProps<'/[lang]/teachers'> => ({
  params: Promise.resolve({ lang }),
  searchParams: Promise.resolve({}),
});

/** Renders the awaited page inside the providers the app gives it. */
async function renderPage(locale: Locale, dictionary: Dictionary = en) {
  const ui = (await TeachersPage(props(locale))) as ReactElement;
  return render(ui, {
    wrapper: ({ children }) => (
      <TestProviders locale={locale} dictionary={dictionary}>
        {children}
      </TestProviders>
    ),
  });
}

const heading = (name: string) => screen.getByRole('heading', { name });
const link = (name: string | RegExp) => screen.getByRole('link', { name });

describe('For Teachers page', () => {
  it('renders every section heading in English, with one h1', async () => {
    await renderPage('en');
    const t = enTeachers;

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(heading(t.heading)).toBeInTheDocument();

    for (const section of [
      t.betaHeading,
      t.whatHeading,
      t.onSiteHeading,
      t.languagesHeading,
      t.privacyHeading,
      t.accessibilityHeading,
      t.collaborateHeading,
      t.feedbackHeading,
    ]) {
      expect(screen.getByRole('heading', { level: 2, name: section })).toBeInTheDocument();
    }
  });

  it('states the year band, the five shipping locales and the beta', async () => {
    await renderPage('en');

    // The band is load-bearing (review-notes.ts) and must be on the page.
    expect(screen.getByText(/Year 9–10, ages 14–16/)).toBeInTheDocument();
    // The five locales that actually ship — and not Russian, which does not.
    expect(
      screen.getByText(/English, German, French, Spanish and Italian/)
    ).toBeInTheDocument();
    expect(screen.getByText(enTeachers.languagesBody3)).toBeInTheDocument();
    expect(screen.getByText(enTeachers.betaBody)).toBeInTheDocument();
  });

  it('is honest about accessibility rather than claiming conformance', async () => {
    await renderPage('en');

    // "target", not "compliant": docs/ACCESSIBILITY.md § 2 still lists gaps.
    expect(screen.getByText(/WCAG 2.2 level AA. That is a target/)).toBeInTheDocument();
    // The gaps are named, with the game titles filled from `gamesHub`.
    expect(
      screen.getByText(new RegExp(`${en.gamesHub.blasterTitle} needs a pointer`))
    ).toBeInTheDocument();
  });

  it('names version 1.0 and version 2.0 explicitly, and says everything is free now', async () => {
    await renderPage('en');

    expect(screen.getByText(enTeachers.collaborateThanks)).toHaveTextContent(
      'version 1.0 and version 2.0'
    );
    expect(screen.getByText(enTeachers.collaborateFreeNow)).toBeInTheDocument();
    // The collaborator route is the existing feedback widget, named by the
    // category label a reader can actually see on it.
    expect(
      screen.getByText(new RegExp(`“${en.feedback.categoryFeature}” category`))
    ).toBeInTheDocument();
  });

  it('links to /privacy under the active locale', async () => {
    await renderPage('en');
    expect(link(enTeachers.privacyLinkLabel)).toHaveAttribute('href', '/en/privacy');
  });

  it('links to each shipped game, and to no game that has no page', async () => {
    await renderPage('en');

    const expected: Array<[string, string]> = [
      [en.gamesHub.acidTitle, '/en/games/acid-classification'],
      [en.gamesHub.blasterTitle, '/en/games/formula-blaster'],
      [en.gamesHub.neutraliseTitle, '/en/games/neutralise'],
      [en.gamesHub.balancerTitle, '/en/games/reaction-balancer'],
      [en.gamesHub.lewisTitle, '/en/games/lewis-structures'],
    ];
    for (const [title, href] of expected) {
      expect(link(title)).toHaveAttribute('href', href);
    }

    // Chemical Bonds was a placeholder card with no route behind it. Both it
    // and the hub card are gone, so nothing here may link to the game route —
    // a teacher planning a lesson should see only games that exist.
    //
    // Asserted on the href rather than on the words, because the cheat sheet
    // called "Chemical Bonds & Structure" is a real, translated page about the
    // same topic and does legitimately link from here. The topic is taught;
    // the game was never written.
    const gameLinks = screen
      .getAllByRole('link')
      .map((anchor) => anchor.getAttribute('href') ?? '');
    expect(gameLinks.filter((href) => href.includes('/games/chemical-bonds'))).toEqual([]);
    expect(gameLinks).toContain('/en/cheat-sheets/chemical-bonds');
  });

  it('links every cheat sheet to its own page', async () => {
    await renderPage('en');
    const sheets = getCheatSheets('en');

    expect(sheets.length).toBeGreaterThan(0);
    for (const sheet of sheets) {
      expect(link(sheet.title)).toHaveAttribute('href', `/en/cheat-sheets/${sheet.slug}`);
    }
  });

  it('renders in German, with German links', async () => {
    await renderPage('de', de);

    expect(screen.getByRole('heading', { level: 1, name: deTeachers.heading })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: deTeachers.collaborateHeading })
    ).toBeInTheDocument();
    // The band in the German school system, never "Oberstufe" (ages 16–19).
    expect(screen.getByText(/Klasse 9–10/)).toBeInTheDocument();
    expect(document.body.textContent).not.toContain('Oberstufe');

    expect(link(deTeachers.privacyLinkLabel)).toHaveAttribute('href', '/de/privacy');
    expect(link(de.gamesHub.lewisTitle)).toHaveAttribute('href', '/de/games/lewis-structures');
    expect(screen.queryByText(enTeachers.betaBody)).toBeNull();
  });

  describe('the support section', () => {
    it('is absent entirely when NEXT_PUBLIC_SUPPORT_URL is unset', async () => {
      vi.stubEnv('NEXT_PUBLIC_SUPPORT_URL', undefined);
      await renderPage('en');

      expect(
        screen.queryByRole('heading', { name: enTeachers.supportHeading })
      ).toBeNull();
      expect(screen.queryByRole('link', { name: /support page/i })).toBeNull();
    });

    it('appears, and opens the hosted page safely in a new tab, when it is set', async () => {
      vi.stubEnv('NEXT_PUBLIC_SUPPORT_URL', SUPPORT_URL);
      await renderPage('en');

      const section = screen
        .getByRole('heading', { level: 2, name: enTeachers.supportHeading })
        .closest('section');
      expect(section).not.toBeNull();

      const supportLink = within(section as HTMLElement).getByRole('link');
      expect(supportLink).toHaveAttribute('href', SUPPORT_URL);
      expect(supportLink).toHaveAttribute('target', '_blank');
      expect(supportLink).toHaveAttribute('rel', 'noopener noreferrer');
      expect(supportLink).toHaveAccessibleName(
        new RegExp(enTeachers.supportLinkLabel, 'i')
      );

      // No payment form is ever embedded: the link leaves, nothing collects.
      expect(document.querySelector('form')).toBeNull();
      expect(document.querySelector('input')).toBeNull();
    });
  });

  describe('metadata', () => {
    it('comes from the dictionary, per locale', async () => {
      await expect(generateMetadata(props('en'))).resolves.toEqual({
        title: en.meta.teachersTitle,
        description: en.meta.teachersDescription,
      });
      await expect(generateMetadata(props('de'))).resolves.toEqual({
        title: de.meta.teachersTitle,
        description: de.meta.teachersDescription,
      });
    });
  });
});
