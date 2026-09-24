// src/components/layout/NavBar.test.tsx
//
// One array in `NavBar` feeds both the horizontal row and the phone panel, so
// this file guards that array rather than the markup around it.
//
// `NavPanel.test.tsx` keeps its own copy of the list as a fixture, which is
// what lets it test the dialog contract in isolation. The cost of a fixture is
// that it can drift from the thing it stands for, so the last test here asserts
// the two agree — otherwise Explore could be removed from the real nav and the
// panel's suite would go on passing against a list nobody ships.

import { describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { NavBar } from './NavBar';
import { renderWithProviders } from '@/test-utils/render';
import { en } from '@/i18n/dictionaries/en';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
  usePathname: () => '/en',
}));

const navRow = () => screen.getByRole('navigation', { name: en.nav.sectionsA11y });

describe('NavBar', () => {
  it('links to every content destination, locale-prefixed', () => {
    renderWithProviders(<NavBar isAuthenticated={false} />);

    // `/en/#games` is what LocaleLink builds; next/link normalises the slash
    // before a fragment away, so that is what the DOM carries.
    const expected: Array<[string, string]> = [
      [en.nav.games, '/en#games'],
      [en.nav.leaderboards, '/en#leaderboards'],
      [en.nav.cheatSheets, '/en/cheat-sheets'],
      [en.nav.explore, '/en/explore'],
    ];

    for (const [label, href] of expected) {
      expect(screen.getByRole('link', { name: label })).toHaveAttribute('href', href);
    }
  });

  it('no longer carries Profile in the row', () => {
    // Profile moved into the Settings popover's Account section. The key still
    // exists and the dashboard still has a `#profile` section, so the thing to
    // assert is the absence of the *nav link*, not the absence of the string.
    renderWithProviders(<NavBar isAuthenticated />);

    expect(
      screen.queryByRole('link', { name: en.nav.profile })
    ).not.toBeInTheDocument();
  });

  it('gives the row exactly four destinations', () => {
    // A fifth would put English back over the 1024px viewport it only just
    // fits inside — see the measurement comment in NavBar.tsx.
    renderWithProviders(<NavBar isAuthenticated={false} />);

    expect(navRow().querySelectorAll('a')).toHaveLength(4);
  });

  it('shows the same destinations in the row and in the phone panel', () => {
    renderWithProviders(<NavBar isAuthenticated={false} />);

    const rowLabels = Array.from(navRow().querySelectorAll('a')).map((a) =>
      a.textContent?.trim()
    );

    // Games first: it is what the site is for.
    expect(rowLabels).toEqual([
      en.nav.games,
      en.nav.leaderboards,
      en.nav.cheatSheets,
      en.nav.explore,
    ]);
  });
});
