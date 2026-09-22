// src/i18n/game-titles.ts
//
// Game titles come from two places and they disagree once the site is
// translated.
//
// The hub and the cheat sheets render titles from the dictionary. The
// leaderboards and the personal-score cards render `gameTitle` as it is stored
// in the Supabase `games` table (see src/lib/dashboard-data.ts), which is a
// single English column — there is no per-locale column and adding one is a
// schema change, not an i18n change.
//
// So: translate what we can identify by id, and fall back to whatever the
// database gave us for anything we do not know about (a game added to the DB
// but not yet to the dictionary). That keeps a new game visible in English
// rather than blank, and `src/i18n/game-titles.test.ts` asserts every GameName
// the app ships is covered.
//
// Follow-up for the user to decide before Phase 2: either keep this map as the
// source of truth for titles, or add a `games_i18n` table. See
// docs/i18n/README.md § Known gaps.

import type { GameName } from '@/core-engine/types/general';
import type { Dictionary } from './dictionaries/en';

type TitleKey = keyof Dictionary['gamesHub'];

const TITLE_KEYS: Record<GameName, TitleKey> = {
  'acid-classification': 'acidTitle',
  'formula-blaster': 'blasterTitle',
  neutralise: 'neutraliseTitle',
  'reaction-balancer': 'balancerTitle',
  'lewis-structures': 'lewisTitle',
  'bond-builder': 'bondsTitle',
};

export function gameTitle(t: Dictionary, gameId: string, fallback: string): string {
  const key = TITLE_KEYS[gameId as GameName];
  return key ? t.gamesHub[key] : fallback;
}

/**
 * The one-line description under each title, keyed the same way.
 *
 * Here rather than in `games-data.ts` for the reason at the top of that file:
 * the registry holds structure, and prose belongs to the dictionaries. A *key*
 * is not prose, and keeping it beside the title map means one file to touch
 * when a game is added rather than two.
 *
 * There is no fallback. Unlike a title, a description has no database column to
 * fall back to — a game the dictionary does not know simply has no blurb, and
 * `undefined` lets the card omit the paragraph rather than print a key name.
 */
const DESCRIPTION_KEYS: Partial<Record<GameName, keyof Dictionary['gamesHub']>> = {
  'acid-classification': 'acidDescription',
  'formula-blaster': 'blasterDescription',
  neutralise: 'neutraliseDescription',
  'reaction-balancer': 'balancerDescription',
  'lewis-structures': 'lewisDescription',
  'bond-builder': 'bondsDescription',
};

export function gameDescription(t: Dictionary, gameId: string): string | undefined {
  const key = DESCRIPTION_KEYS[gameId as GameName];
  return key ? t.gamesHub[key] : undefined;
}

export { TITLE_KEYS as GAME_TITLE_KEYS, DESCRIPTION_KEYS as GAME_DESCRIPTION_KEYS };
