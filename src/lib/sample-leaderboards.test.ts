// src/lib/sample-leaderboards.test.ts

import { describe, expect, it } from 'vitest';
import { SAMPLE_LEADERBOARDS, hasNoRealEntries } from './sample-leaderboards';
import type { GameLeaderboard } from '@/core-engine/types/general';

const board = (gameId: GameLeaderboard['gameId'], scores: number[]): GameLeaderboard => ({
  gameId,
  gameTitle: gameId,
  entries: scores.map((score, index) => ({
    id: `${gameId}-${index}`,
    alias: `player-${index}`,
    score,
    timestamp: '2026-09-20T00:00:00.000Z',
    rank: index + 1,
  })),
});

describe('hasNoRealEntries', () => {
  it('is true when there are no boards at all', () => {
    // Supabase unconfigured: the read returns []. That is "completely empty"
    // too, and it is the case a local checkout hits every time.
    expect(hasNoRealEntries([])).toBe(true);
  });

  it('is true when every board exists but is empty', () => {
    expect(hasNoRealEntries([board('neutralise', []), board('formula-blaster', [])])).toBe(true);
  });

  it('is false as soon as one game has one score', () => {
    // The guard that matters. A single real score has to switch the whole
    // thing off, or a real player ends up ranked against invented ones.
    expect(hasNoRealEntries([board('neutralise', []), board('formula-blaster', [10])])).toBe(false);
  });
});

describe('SAMPLE_LEADERBOARDS', () => {
  it('covers every game with a board', () => {
    expect(SAMPLE_LEADERBOARDS.length).toBeGreaterThan(0);
    for (const entry of SAMPLE_LEADERBOARDS) {
      expect(entry.entries.length).toBeGreaterThan(0);
    }
  });

  it('is sorted by score descending, so rank matches position', () => {
    for (const { gameId, entries } of SAMPLE_LEADERBOARDS) {
      const scores = entries.map((entry) => entry.score);
      expect(scores, gameId).toEqual([...scores].sort((a, b) => b - a));
      expect(
        entries.map((entry) => entry.rank),
        gameId
      ).toEqual(entries.map((_, index) => index + 1));
    }
  });

  it('carries dates the leaderboard can format', () => {
    // PublicLeaderboard slices the first ten characters and parses them as
    // UTC. A malformed timestamp renders as the raw string rather than
    // throwing, so nothing else here would catch it.
    for (const { entries } of SAMPLE_LEADERBOARDS) {
      for (const entry of entries) {
        expect(Number.isNaN(new Date(entry.timestamp).getTime())).toBe(false);
        expect(entry.timestamp.slice(0, 10)).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      }
    }
  });

  it('gives every entry a unique id', () => {
    const ids = SAMPLE_LEADERBOARDS.flatMap((board) => board.entries.map((entry) => entry.id));
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('uses aliases that cannot be mistaken for a real name', () => {
    // Deliberate: the board is presented as real, so the handles must read as
    // handles. Anything looking like "Firstname Lastname" would be inventing a
    // person rather than a placeholder.
    for (const { entries } of SAMPLE_LEADERBOARDS) {
      for (const entry of entries) {
        expect(entry.alias).not.toMatch(/\s/);
      }
    }
  });
});
