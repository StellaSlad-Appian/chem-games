// src/components/games/GamesBrowser.tsx
'use client';

import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { GameCard } from './GameCard';
import { YearFilter, yearFilterOptionsFrom } from '@/components/cheat-sheets/YearFilter';
import { GAMES } from '@/lib/games-data';
import type { YearLevel } from '@/core-engine/types/general';
import { gameDescription, gameTitle } from '@/i18n/game-titles';
import { useI18n } from '@/i18n/client';

/**
 * Folds a string for searching: lowercase, accents stripped.
 *
 * Without the fold, a French reader typing "equations" finds nothing because
 * the concept is "Équations", and a German typing "saure" misses "Säuren". NFD
 * splits a letter from its accent and the range strips the accent, which is the
 * standard trick and works for every Latin locale here. Russian has no accents
 * to strip and is unaffected — `toLowerCase()` alone does the work there.
 */
const fold = (value: string): string =>
  value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();

export function GamesBrowser() {
  const { t } = useI18n();
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [query, setQuery] = useState('');

  // Canonical English year values, like the cheat-sheet grid: these are
  // compared against `game.yearLevels`, and only the button labels translate.
  const years = useMemo(
    () => yearFilterOptionsFrom(GAMES.flatMap((game) => game.yearLevels)),
    []
  );

  /**
   * What each game is searchable by, built once per locale.
   *
   * Title, description and the translated concept names all go in, so "acids"
   * finds Neutralise even though the word is in neither its title nor its
   * blurb. The slug goes in too, which costs nothing and means a URL pasted
   * into the box still finds its game.
   */
  const haystacks = useMemo(() => {
    const map = new Map<string, string>();
    for (const game of GAMES) {
      const concepts = game.concepts.map((concept) => t.cheatSheetCategories[concept]);
      map.set(
        game.slug,
        fold([gameTitle(t, game.slug, game.slug), gameDescription(t, game.slug) ?? '', ...concepts, game.slug].join(' '))
      );
    }
    return map;
  }, [t]);

  const folded = fold(query);
  const visible = GAMES.filter((game) => {
    const matchesYear = selectedYear === 'All' || game.yearLevels.includes(selectedYear as YearLevel);
    const matchesQuery = folded === '' || (haystacks.get(game.slug) ?? '').includes(folded);
    return matchesYear && matchesQuery;
  });

  const clear = () => {
    setSelectedYear('All');
    setQuery('');
  };

  return (
    <>
      <div className="mt-8 flex flex-col gap-4">
        <div className="relative">
          <Search
            className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-(--muted)"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label={t.gamesHub.searchLabel}
            placeholder={t.gamesHub.searchPlaceholder}
            className="w-full rounded-xl border border-(--border) bg-(--surface) py-2.5 pr-3 pl-9 text-sm font-medium text-(--foreground) placeholder:text-(--muted) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--link)"
          />
        </div>
        <YearFilter
          years={years}
          selectedYear={selectedYear}
          onSelectYear={setSelectedYear}
          label={t.gamesHub.filterA11y}
        />
      </div>

      {visible.length === 0 ? (
        /*
          A dead end needs a way out. The year buttons only ever offer a year
          some game has, so an empty grid here is always the search term's
          doing — but the two combine, so the reset clears both.
        */
        <div
          className="mt-8 rounded-xl border border-dashed border-(--border) bg-(--surface-2) p-8 text-center"
          aria-live="polite"
        >
          <p className="font-black">{t.gamesHub.noResultsTitle}</p>
          <p className="mt-1 text-sm text-(--muted)">{t.gamesHub.noResultsBody}</p>
          <button
            type="button"
            onClick={clear}
            className="mt-4 inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-(--action) px-4 py-2 text-xs font-black text-white transition hover:bg-(--action-hover) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--link)"
          >
            <X className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {t.gamesHub.clearFilters}
          </button>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((game) => (
            <GameCard key={game.slug} slug={game.slug} />
          ))}
        </div>
      )}

    </>
  );
}
