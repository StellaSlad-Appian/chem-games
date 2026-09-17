// src/i18n/game-titles.test.ts

import { describe, expect, it } from 'vitest';
import { en } from './dictionaries/en';
import { de } from './dictionaries/de';
import { GAME_TITLE_KEYS, gameTitle } from './game-titles';

// Kept in step with the GameName union by hand, and asserted below: a new game
// slug added to the union without a title key here fails this test rather than
// silently rendering the English database value forever.
const EXPECTED_GAMES = [
  'acid-classification',
  'formula-blaster',
  'neutralise',
  'reaction-balancer',
  'bond-builder',
] as const;

describe('gameTitle', () => {
  it('maps every game the app ships', () => {
    expect(Object.keys(GAME_TITLE_KEYS).sort()).toEqual([...EXPECTED_GAMES].sort());
  });

  it('prefers the dictionary over the value stored in Supabase', () => {
    expect(gameTitle(de, 'neutralise', 'Neutralise!')).toBe(de.gamesHub.neutraliseTitle);
    expect(gameTitle(de, 'neutralise', 'Neutralise!')).not.toBe('Neutralise!');
  });

  it('falls back to the database title for a game it does not know', () => {
    expect(gameTitle(en, 'some-future-game', 'Some Future Game')).toBe('Some Future Game');
  });

  it('resolves to a non-empty string for every game, in every locale', () => {
    for (const gameId of EXPECTED_GAMES) {
      expect(gameTitle(en, gameId, 'fallback').trim()).not.toBe('');
      expect(gameTitle(de, gameId, 'fallback').trim()).not.toBe('');
    }
  });
});
