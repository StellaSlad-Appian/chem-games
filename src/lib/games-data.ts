// src/lib/games-data.ts
//
// The one place that knows what games exist and what each one is about.
//
// Before this, `games/page.tsx` and the dashboard's teaser row each built their
// own array — same five games, different shapes, and the dashboard's three were
// a hand-picked subset that nothing kept in step with the hub. Both read this
// now.
//
// **Titles and descriptions are not here.** They are translated, so they stay in
// the dictionaries under `gamesHub`, and this file holds only the structure that
// is the same in every language: the route, the icon, the accent, and what the
// game is for. A registry that carried English prose would have to be six
// registries.

import { Beaker, FlaskConical, Orbit, Scale, TestTube, type LucideIcon } from 'lucide-react';
import type { CheatSheetCategory, GameName, YearLevel } from '@/core-engine/types/general';

/**
 * The accent each game is drawn in.
 *
 * A key, not a colour: the actual values are `--game-accent-*` in `globals.css`,
 * defined once per theme, because a Tailwind class like `text-violet-500` that
 * reads well on the light background is too dark on the dark one. Every game has
 * its own, so a row of cards is not five identical blue icons.
 */
export type GameAccent = 'violet' | 'sky' | 'emerald' | 'amber' | 'rose';

export interface GameTopic {
  /** Matches `GameName`, the `games` table, and the last segment of `href`. */
  slug: GameName;
  /** Unprefixed; `LocaleLink` adds the locale. */
  href: string;
  Icon: LucideIcon;
  accent: GameAccent;
  /**
   * Every year band the game is useful in, not just the earliest.
   *
   * Taken from the cheat sheets that name the game in `relatedGames`, rather
   * than invented here — `neutralise` is Year 9 and Year 10 because
   * `acids-and-bases` is Year 9 and `reaction-types` is Year 10. If you add a
   * sheet that links a game, check this still agrees with it.
   */
  yearLevels: YearLevel[];
  /**
   * The cheat-sheet categories this game practises, from the same links.
   *
   * Reusing `CheatSheetCategory` rather than inventing a parallel vocabulary
   * means the hub's filter and the cheat-sheet index name concepts the same way,
   * and the strings are already translated in `cheatSheetCategories`.
   */
  concepts: CheatSheetCategory[];
}

export const GAMES: GameTopic[] = [
  {
    slug: 'acid-classification',
    href: '/games/acid-classification',
    Icon: Beaker,
    accent: 'violet',
    // acids-and-bases (Year 9)
    yearLevels: ['Year 9'],
    concepts: ['Acids & Bases'],
  },
  {
    slug: 'formula-blaster',
    href: '/games/formula-blaster',
    Icon: FlaskConical,
    accent: 'sky',
    // chemical-formulas, polyatomic-ions, naming-compounds (all Year 10)
    yearLevels: ['Year 10'],
    concepts: ['Nomenclature'],
  },
  {
    slug: 'neutralise',
    href: '/games/neutralise',
    Icon: TestTube,
    accent: 'emerald',
    // acids-and-bases (Year 9); reaction-types, polyatomic-ions (Year 10)
    yearLevels: ['Year 9', 'Year 10'],
    concepts: ['Acids & Bases', 'Reactions', 'Nomenclature'],
  },
  {
    slug: 'reaction-balancer',
    href: '/games/reaction-balancer',
    Icon: Scale,
    accent: 'amber',
    // balancing-equations, reaction-types (Year 10); stoichiometry (Senior)
    yearLevels: ['Year 10', 'Senior'],
    concepts: ['Equations', 'Reactions', 'Stoichiometry'],
  },
  {
    slug: 'lewis-structures',
    href: '/games/lewis-structures',
    Icon: Orbit,
    accent: 'rose',
    // chemical-bonds (Year 10); lewis-structures (Senior)
    yearLevels: ['Year 10', 'Senior'],
    concepts: ['Bonding'],
  },
];

/**
 * The three the dashboard teases, in the order it shows them.
 *
 * Named rather than sliced, so changing the order of `GAMES` cannot silently
 * change what the dashboard promotes.
 */
export const TEASED_GAMES: GameName[] = [
  'acid-classification',
  'formula-blaster',
  'neutralise',
];

export const teasedGames = (): GameTopic[] =>
  TEASED_GAMES.map((slug) => {
    const game = GAMES.find((candidate) => candidate.slug === slug);
    if (!game) throw new Error(`TEASED_GAMES names "${slug}", which is not in GAMES.`);
    return game;
  });

/** Every year band that at least one game covers, in curriculum order. */
export const GAME_YEAR_LEVELS: YearLevel[] = (['Year 9', 'Year 10', 'Senior'] as const).filter(
  (year) => GAMES.some((game) => game.yearLevels.includes(year))
);

/** Every concept at least one game practises, in the order `GAMES` introduces them. */
export const GAME_CONCEPTS: CheatSheetCategory[] = GAMES.flatMap((game) => game.concepts).filter(
  (concept, index, all) => all.indexOf(concept) === index
);

/**
 * Tailwind classes per accent.
 *
 * Written out rather than built from a template, because Tailwind extracts
 * classes by scanning source text: `text-(--game-accent-${accent})` would
 * produce nothing at all. Every string below has to appear literally somewhere,
 * and here is the one place it does.
 *
 * - `text`: the accent as text or an icon (≥ 4.5:1 on every surface).
 * - `tint`: a 12% wash of the accent — the icon tile, the header's task panel.
 *   The accent itself stays ≥ 4.6:1 on it, --foreground ≥ 12:1, in both themes.
 * - `edge`: a soft accent border for a tinted panel.
 * - `fill`: the solid accent, for a stripe or bar that carries no text.
 */
export interface AccentClasses {
  text: string;
  hoverBorder: string;
  tint: string;
  edge: string;
  fill: string;
}

export const ACCENT_CLASSES: Record<GameAccent, AccentClasses> = {
  violet: {
    text: 'text-(--game-accent-violet)',
    hoverBorder: 'hover:border-(--game-accent-violet)',
    tint: 'bg-(--game-accent-violet)/12',
    edge: 'border-(--game-accent-violet)/40',
    fill: 'bg-(--game-accent-violet)',
  },
  sky: {
    text: 'text-(--game-accent-sky)',
    hoverBorder: 'hover:border-(--game-accent-sky)',
    tint: 'bg-(--game-accent-sky)/12',
    edge: 'border-(--game-accent-sky)/40',
    fill: 'bg-(--game-accent-sky)',
  },
  emerald: {
    text: 'text-(--game-accent-emerald)',
    hoverBorder: 'hover:border-(--game-accent-emerald)',
    tint: 'bg-(--game-accent-emerald)/12',
    edge: 'border-(--game-accent-emerald)/40',
    fill: 'bg-(--game-accent-emerald)',
  },
  amber: {
    text: 'text-(--game-accent-amber)',
    hoverBorder: 'hover:border-(--game-accent-amber)',
    tint: 'bg-(--game-accent-amber)/12',
    edge: 'border-(--game-accent-amber)/40',
    fill: 'bg-(--game-accent-amber)',
  },
  rose: {
    text: 'text-(--game-accent-rose)',
    hoverBorder: 'hover:border-(--game-accent-rose)',
    tint: 'bg-(--game-accent-rose)/12',
    edge: 'border-(--game-accent-rose)/40',
    fill: 'bg-(--game-accent-rose)',
  },
};

/** The registry entry for a game, or undefined for one not built yet (bond-builder). */
export const gameTopic = (slug: GameName): GameTopic | undefined =>
  GAMES.find((candidate) => candidate.slug === slug);
