// src/components/explore/ExploreTabs.test.tsx
//
// The tab strip on its own, with the route segment faked.
//
// `useSelectedLayoutSegment` needs an App Router context that jsdom has no way
// to provide, so it is mocked — and mocking it is the point rather than a
// workaround: the three values it can return (`null`, `'scientist'`,
// `'archive'`) are the whole contract between the router and this component,
// and driving them directly is how each one gets exercised without three
// navigations.
//
// What is asserted here and nowhere else: that `null` selects the molecule tab.
// That is the load-bearing claim of the whole route structure — it is why
// `/explore` can *be* the molecule tab instead of redirecting to a fourth URL —
// and it is the one thing that would break silently if someone "tidied" the
// comparison into a truthiness check.

import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { TestProviders } from '@/test-utils/render';
import { en } from '@/i18n/dictionaries/en';
import { de } from '@/i18n/dictionaries/de';
import { ru } from '@/i18n/dictionaries/ru';
import { getDictionary, type Dictionary } from '@/i18n/dictionaries';
import { LOCALES, type Locale } from '@/i18n/config';

const { segment } = vi.hoisted(() => ({ segment: { value: null as string | null } }));

vi.mock('next/navigation', async (importOriginal) => {
  const actual = await importOriginal<typeof import('next/navigation')>();
  return { ...actual, useSelectedLayoutSegment: () => segment.value };
});

const { ExploreTabs } = await import('./ExploreTabs');

const MOLECULE = 'Polypropylene';
const SCIENTIST = 'Giulio Natta';

function renderStrip({
  locale = 'en' as Locale,
  // `Dictionary`, not `typeof en`: the English file is a `const` object, so
  // its type is a wall of string *literals* and no other locale is assignable
  // to it. Every other test in the repo that takes a dictionary does the same.
  dictionary = en as Dictionary,
  ...props
}: Partial<{
  locale: Locale;
  dictionary: Dictionary;
  moleculeName: string;
  scientistName: string;
}> = {}) {
  return render(
    <TestProviders locale={locale} dictionary={dictionary}>
      <ExploreTabs
        t={dictionary}
        moleculeName={props.moleculeName ?? MOLECULE}
        scientistName={props.scientistName ?? SCIENTIST}
        dateline="Week of 21 September 2026"
        datelineIso="2026-09-21"
      />
    </TestProviders>
  );
}

const strip = (name: string = en.explore.tabsA11y) =>
  screen.getByRole('navigation', { name });

beforeEach(() => {
  segment.value = null;
});

describe('the Explore tab strip', () => {
  it('is a named navigation landmark holding three links', () => {
    renderStrip();

    const links = within(strip()).getAllByRole('link');
    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      '/en/explore',
      '/en/explore/scientist',
      '/en/explore/archive',
    ]);
  });

  it('is not the ARIA tabs pattern', () => {
    // `role="tablist"` would promise a screen reader that the panels are in
    // this document and that arrow keys move between them. They are three
    // separate URLs, so both promises would be false — and the links would
    // leave the link rotor. This assertion is the guard on that decision.
    const { container } = renderStrip();

    expect(container.querySelector('[role="tablist"]')).toBeNull();
    expect(container.querySelector('[role="tab"]')).toBeNull();
    expect(container.querySelector('[role="tabpanel"]')).toBeNull();
  });

  it.each([
    [null, '/en/explore'],
    ['scientist', '/en/explore/scientist'],
    ['archive', '/en/explore/archive'],
  ])('marks the %s segment as the current page', (value, href) => {
    segment.value = value;
    renderStrip();

    const current = within(strip()).getAllByRole('link', { current: 'page' });
    expect(current).toHaveLength(1);
    expect(current[0]).toHaveAttribute('href', href);
  });

  it('treats a null segment as the molecule tab, not as "nothing selected"', () => {
    // The load-bearing claim: /explore *is* the molecule tab. A truthiness
    // check on the segment would leave the strip with no current page here,
    // and the reader with no idea which of the three they are on.
    segment.value = null;
    renderStrip();

    const molecule = within(strip()).getByRole('link', { name: /Molecule/ });
    expect(molecule).toHaveAttribute('aria-current', 'page');
    expect(within(strip()).getByRole('link', { name: /Scientist/ })).not.toHaveAttribute(
      'aria-current'
    );
  });

  it('carries this week’s two entry names as the subtitles', () => {
    renderStrip();

    const [molecule, scientist] = within(strip()).getAllByRole('link');
    expect(molecule).toHaveTextContent(MOLECULE);
    expect(scientist).toHaveTextContent(SCIENTIST);
    // The archive has no entry of its own, so it borrows the call to action
    // rather than showing a blank second line beside two that have one.
    expect(within(strip()).getAllByRole('link')[2]).toHaveTextContent(en.explore.archiveCta);
  });

  it('shows whatever names it is handed, rather than fetching its own', () => {
    // The layout above is a Server Component and does the reading; this is a
    // client component and must never grow a fetch of its own, or the whole
    // of src/i18n/explore.ts — the largest body of prose on the site — lands
    // in the client bundle.
    renderStrip({ moleculeName: 'Ethanoic acid', scientistName: 'Alice Ball' });

    expect(screen.getByText('Ethanoic acid')).toBeInTheDocument();
    expect(screen.getByText('Alice Ball')).toBeInTheDocument();
  });

  it('never bolds the entry name, on the active pill or any other', () => {
    // The repeat only reads as a glitch if the small copy takes weight. See
    // explore.md §9 and the comment on the subtitle span.
    segment.value = null;
    renderStrip();

    const subtitle = screen.getByText(MOLECULE);
    expect(subtitle.className).toContain('font-normal');
    expect(subtitle.className).toContain('text-(--muted)');
    expect(subtitle.className).not.toMatch(/font-(bold|black|semibold)/);
  });

  it('renders the dateline once, as a machine-readable time', () => {
    const { container } = renderStrip();

    const times = container.querySelectorAll('time');
    expect(times).toHaveLength(1);
    expect(times[0]).toHaveAttribute('datetime', '2026-09-21');
  });

  it('gives every pill a 44px floor and a visible focus ring', () => {
    // docs/ACCESSIBILITY.md § Pointer & touch and § Keyboard. Asserted on the
    // class rather than a measured box because jsdom computes no layout — this
    // is a guard against the utility being dropped, which is how it would go.
    renderStrip();

    for (const link of within(strip()).getAllByRole('link')) {
      expect(link.className).toContain('min-h-11');
      expect(link.className).toContain('focus-visible:outline-2');
    }
  });

  it.each(LOCALES)('names the strip and its three pills in %s', async (locale) => {
    const dictionary = await getDictionary(locale);
    const { unmount } = renderStrip({ locale, dictionary });

    const nav = screen.getByRole('navigation', { name: dictionary.explore.tabsA11y });
    const labels = within(nav)
      .getAllByRole('link')
      .map((link) => link.textContent ?? '');

    expect(labels[0]).toContain(dictionary.explore.tabMolecule);
    expect(labels[1]).toContain(dictionary.explore.tabScientist);
    expect(labels[2]).toContain(dictionary.explore.tabArchive);
    unmount();
  });

  it('keeps the reader’s locale on all three hrefs', () => {
    renderStrip({ locale: 'de', dictionary: de });

    expect(
      within(strip(de.explore.tabsA11y))
        .getAllByRole('link')
        .map((link) => link.getAttribute('href'))
    ).toEqual(['/de/explore', '/de/explore/scientist', '/de/explore/archive']);
  });

  it('uses the long section headings nowhere', () => {
    // The pills exist because the headings are too long for them. If someone
    // wires `moleculeHeading` back in, three pills stop fitting a phone in
    // German and Russian and nothing else would catch it.
    renderStrip({ locale: 'ru', dictionary: ru });

    const nav = strip(ru.explore.tabsA11y);
    expect(nav.textContent).not.toContain(ru.explore.moleculeHeading);
    expect(nav.textContent).not.toContain(ru.explore.scientistHeading);
    expect(nav.textContent).not.toContain(ru.explore.archiveHeading);
  });
});
