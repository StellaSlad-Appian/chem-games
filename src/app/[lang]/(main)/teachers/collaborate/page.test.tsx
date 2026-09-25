// src/app/[lang]/(main)/teachers/collaborate/page.test.tsx
//
// The teacher-collaborator sign-up page. Required by docs/COLLABORATORS.md § 6:
// the form renders, is fully labelled, offers a no-account deletion route, and
// ships in German too. Moved here, along with the tests below, when the form
// moved off the main For Teachers page (docs/TEACHERS_PAGE.md's layout notes).
//
// Same rendering shape as teachers/page.test.tsx: an async Server Component
// awaited and handed to Testing Library through `TestProviders`, because every
// internal link is a `LocaleLink`.

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { ReactElement } from 'react';
import TeachersCollaboratePage, { generateMetadata } from './page';
import { TestProviders } from '@/test-utils/render';
import { de } from '@/i18n/dictionaries/de';
import { en } from '@/i18n/dictionaries/en';
import type { Dictionary } from '@/i18n/dictionaries/en';
import type { Locale } from '@/i18n/config';
import { en as enTeachers } from '@/i18n/teachers/en';
import { de as deTeachers } from '@/i18n/teachers/de';

const props = (lang: string): PageProps<'/[lang]/teachers/collaborate'> => ({
  params: Promise.resolve({ lang }),
  searchParams: Promise.resolve({}),
});

/** Renders the awaited page inside the providers the app gives it. */
async function renderPage(locale: Locale, dictionary: Dictionary = en) {
  const ui = (await TeachersCollaboratePage(props(locale))) as ReactElement;
  return render(ui, {
    wrapper: ({ children }) => (
      <TestProviders locale={locale} dictionary={dictionary}>
        {children}
      </TestProviders>
    ),
  });
}

describe('The teacher-collaborator sign-up page', () => {
  it('renders one h1 and the form at h2, since the h1 is the only thing above it', async () => {
    await renderPage('en');

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole('heading', { level: 1, name: enTeachers.collaborateHeading })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: enTeachers.formHeading })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
  });

  it('links back to the main For Teachers page', async () => {
    await renderPage('en');
    expect(screen.getByRole('link', { name: new RegExp(enTeachers.backToTeachers) })).toHaveAttribute(
      'href',
      '/en/teachers'
    );
  });

  it('renders the catalogue copy, which the client component never imports', async () => {
    await renderPage('en');

    // Every one of these is a prop the Server Component passed down. If the
    // form ever imported the catalogue itself these would still pass, which
    // is why src/i18n/teachers-boundary.test.ts exists as well.
    expect(screen.getByText(enTeachers.formIntro)).toBeInTheDocument();
    expect(screen.getByText(enTeachers.formUse)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: new RegExp(enTeachers.formSubmit, 'i') })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(new RegExp(enTeachers.formYearLevelsLabel, 'i'))).toBeInTheDocument();
  });

  it('offers a deletion route that needs no account', async () => {
    await renderPage('en');
    // docs/COLLABORATORS.md § 0: on the form, not only in the privacy page.
    const mailto = screen
      .getAllByRole('link')
      .find((anchor) => anchor.getAttribute('href')?.startsWith('mailto:'));
    expect(mailto).toBeDefined();
    expect(enTeachers.formDelete).toContain('{email}');
  });

  it('no longer tells a teacher to use the feedback button instead', async () => {
    await renderPage('en');
    expect(
      screen.queryByText(new RegExp(`“${en.feedback.categoryFeature}” category`))
    ).toBeNull();
  });

  it('renders in German too, with the form heading still one level below the h1', async () => {
    await renderPage('de', de);

    expect(
      screen.getByRole('heading', { level: 1, name: deTeachers.collaborateHeading })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: deTeachers.formHeading })
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(new RegExp(deTeachers.formEmailLabel, 'i'))
    ).toBeInTheDocument();
    expect(screen.getByText(deTeachers.formUse)).toBeInTheDocument();
    expect(screen.queryByText(enTeachers.formUse)).toBeNull();
  });

  describe('metadata', () => {
    it('comes from the per-page catalogue, per locale', async () => {
      await expect(generateMetadata(props('en'))).resolves.toEqual({
        title: enTeachers.collaborateMetaTitle,
        description: enTeachers.collaborateMetaDescription,
      });
      await expect(generateMetadata(props('de'))).resolves.toEqual({
        title: deTeachers.collaborateMetaTitle,
        description: deTeachers.collaborateMetaDescription,
      });
    });
  });
});
