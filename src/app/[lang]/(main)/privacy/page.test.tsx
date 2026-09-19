// src/app/[lang]/(main)/privacy/page.test.tsx
//
// The privacy page had no test before the collaborator list existed, and it
// gets one now for one reason: docs/COLLABORATORS.md § 0 makes the privacy
// entry a precondition of shipping the sign-up form, and a precondition that
// nothing checks is a precondition that survives exactly one refactor.
//
// So this is deliberately narrow. It asserts the page renders and that the
// collaborator entry is on it, in two locales, with all five things § 0 asks
// for: what is collected, why, the lawful basis, how long it is kept, and a
// deletion route that works without an account. The rest of the page is
// covered by the dictionary parity gates, which is where its copy lives.

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { ReactElement } from 'react';
import PrivacyPage from './page';
import { TestProviders } from '@/test-utils/render';
import { de } from '@/i18n/dictionaries/de';
import { en } from '@/i18n/dictionaries/en';
import type { Dictionary } from '@/i18n/dictionaries/en';
import type { Locale } from '@/i18n/config';

const props = (lang: string): PageProps<'/[lang]'> => ({
  params: Promise.resolve({ lang }),
  searchParams: Promise.resolve({}),
});

async function renderPage(locale: Locale, dictionary: Dictionary) {
  const ui = (await PrivacyPage(props(locale))) as ReactElement;
  return render(ui, {
    wrapper: ({ children }) => (
      <TestProviders locale={locale} dictionary={dictionary}>
        {children}
      </TestProviders>
    ),
  });
}

describe('the collaborator entry on the privacy page', () => {
  it('describes the table, its basis, its retention and its deletion route', async () => {
    await renderPage('en', en);
    const p = en.privacy;

    expect(
      screen.getByRole('heading', { level: 2, name: p.collaboratorsHeading })
    ).toBeInTheDocument();

    // What is collected, and that only the address is required.
    expect(screen.getByText(p.collectCollaboratorBody)).toBeInTheDocument();
    // Why.
    expect(screen.getByText(p.collaboratorsWhy)).toBeInTheDocument();
    // The lawful basis, named as consent rather than described.
    expect(screen.getByText(p.collaboratorsBasis)).toHaveTextContent(/consent/i);
    // What it is and is not used for.
    expect(screen.getByText(p.collaboratorsUse)).toBeInTheDocument();
    // How long it is kept.
    expect(screen.getByText(p.collaboratorsRetention)).toBeInTheDocument();
  });

  it('gives a deletion route that needs no account, as a mailto link', async () => {
    await renderPage('en', en);

    const sentence = screen
      .getByRole('heading', { level: 2, name: en.privacy.collaboratorsHeading })
      .closest('section');
    expect(sentence).not.toBeNull();

    const mailto = (sentence as HTMLElement).querySelector('a[href^="mailto:"]');
    expect(mailto).not.toBeNull();
    expect((sentence as HTMLElement).textContent).toMatch(/do not need an account/i);
  });

  it('is there in German too, not only in English', async () => {
    await renderPage('de', de);

    expect(
      screen.getByRole('heading', { level: 2, name: de.privacy.collaboratorsHeading })
    ).toBeInTheDocument();
    expect(screen.getByText(de.privacy.collaboratorsBasis)).toBeInTheDocument();
    expect(screen.queryByText(en.privacy.collaboratorsBasis)).toBeNull();
  });
});
