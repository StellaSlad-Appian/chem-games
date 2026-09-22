// src/components/games/GamesBrowser.test.tsx

import { describe, expect, it } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { GamesBrowser } from './GamesBrowser';
import { renderWithProviders } from '@/test-utils/render';
import { GAMES } from '@/lib/games-data';
import { de } from '@/i18n/dictionaries/de';
import { en } from '@/i18n/dictionaries/en';

/** Card titles currently on screen, in order. */
const visibleTitles = () =>
  screen.getAllByRole('heading', { level: 3 }).map((heading) => heading.textContent);

const searchBox = (label: string) => screen.getByLabelText(label);

describe('GamesBrowser', () => {
  it('lists every game before anything is filtered', () => {
    renderWithProviders(<GamesBrowser />);
    expect(visibleTitles()).toHaveLength(GAMES.length);
  });

  it('offers only the year levels a game actually has', () => {
    renderWithProviders(<GamesBrowser />);
    const years = screen
      .getAllByRole('button', { pressed: false })
      .concat(screen.getAllByRole('button', { pressed: true }))
      .map((button) => button.textContent);

    // No Year 7 or Year 8 button: nothing would come back, and a filter that
    // can only return nothing is a dead end rather than a filter.
    expect(years).toEqual(
      expect.arrayContaining([en.yearLevels.all, en.yearLevels['Year 9'], en.yearLevels['Year 10']])
    );
    expect(years).not.toContain(en.yearLevels['Year 7']);
    expect(years).not.toContain(en.yearLevels['Year 8']);
  });

  it('filters to the games taught in a year, keeping one that spans two', () => {
    renderWithProviders(<GamesBrowser />);
    fireEvent.click(screen.getByRole('button', { name: en.yearLevels['Year 9'] }));

    // Neutralise is Year 9 *and* Year 10, so a Year 9 filter must keep it.
    expect(visibleTitles()).toEqual([en.gamesHub.acidTitle, en.gamesHub.neutraliseTitle]);
  });

  it('searches the concepts, not just the title and blurb', () => {
    renderWithProviders(<GamesBrowser />);
    fireEvent.change(searchBox(en.gamesHub.searchLabel), {
      target: { value: en.cheatSheetCategories.Nomenclature },
    });

    // "Nomenclature" appears in neither game's title nor its description; it
    // is only in `concepts`. This is the assertion that would fail if the
    // haystack were built from the visible copy alone.
    expect(visibleTitles()).toEqual([en.gamesHub.blasterTitle, en.gamesHub.neutraliseTitle]);
  });

  it('combines the year filter and the search', () => {
    renderWithProviders(<GamesBrowser />);
    fireEvent.click(screen.getByRole('button', { name: en.yearLevels['Year 10'] }));
    fireEvent.change(searchBox(en.gamesHub.searchLabel), {
      target: { value: en.cheatSheetCategories.Nomenclature },
    });

    expect(visibleTitles()).toEqual([en.gamesHub.blasterTitle, en.gamesHub.neutraliseTitle]);
  });

  it('offers a way out of an empty result', () => {
    renderWithProviders(<GamesBrowser />);
    fireEvent.change(searchBox(en.gamesHub.searchLabel), { target: { value: 'zzzz' } });

    expect(screen.queryAllByRole('heading', { level: 3 })).toHaveLength(0);
    expect(screen.getByText(en.gamesHub.noResultsTitle)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: en.gamesHub.clearFilters }));
    expect(visibleTitles()).toHaveLength(GAMES.length);
    expect(searchBox(en.gamesHub.searchLabel)).toHaveValue('');
  });

  it('matches a German search typed without the umlaut', () => {
    renderWithProviders(<GamesBrowser />, { locale: 'de', dictionary: de });

    // "saure" for "Säure". Without the NFD fold in `fold()` this returns
    // nothing, and a German reader has to type the umlaut to find the game
    // whose title starts with one.
    fireEvent.change(searchBox(de.gamesHub.searchLabel), { target: { value: 'saure' } });
    expect(visibleTitles()).toEqual([de.gamesHub.acidTitle, de.gamesHub.neutraliseTitle]);
  });
});
