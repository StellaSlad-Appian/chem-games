// src/lib/dashboard-data.ts

import { createClient } from '@/lib/supabase/server';
import type { PersonalScore, GameLeaderboard, GameName } from '@/core-engine/types/general';

const GAME_METADATA: Record<GameName, { title: string; color: string; icon: string }> = {
  'acid-classification': { title: 'Acid or Base?', color: '#a855f7', icon: '🧪' },
  'formula-blaster': { title: 'Formula Blaster', color: '#3b82f6', icon: '💥' },
  'neutralise': { title: 'Neutralise!', color: '#10b981', icon: '⚡' },
};

/**
 * Fetches the user's highest score for every active game from Supabase.
 */
export async function getPersonalScores(userId: string): Promise<PersonalScore[]> {
  const supabase = await createClient();
  if (!supabase) return [];

  // Fetch all victory scores for the user
  const { data, error } = await supabase
    .from('game_sessions')
    .select('game_id, score')
    .eq('user_id', userId)
    .eq('outcome', 'victory')
    .order('score', { ascending: false });

  if (error || !data) return [];

  const activeGames: GameName[] = ['acid-classification', 'formula-blaster', 'neutralise'];

  return activeGames.map((gameId) => {
    const meta = GAME_METADATA[gameId] || { title: gameId, color: '#3b82f6', icon: '🎮' };
    const userScoresForGame = data.filter((s) => s.game_id === gameId);
    const highestScore = userScoresForGame.length > 0 ? userScoresForGame[0].score : null;

    return {
      gameId,
      gameTitle: meta.title,
      highestScore,
      globalRank: null, // Can be extended to join with leaderboards
      themeColor: meta.color,
      icon: meta.icon,
    };
  });
}

// Fallback / Mock Data matching actual active games (3 total)
export const personalScores: PersonalScore[] = [
  { gameId: 'acid-classification', gameTitle: 'Acid or Base?', highestScore: 820, globalRank: 14, themeColor: '#a855f7', icon: '🧪' },
  { gameId: 'formula-blaster', gameTitle: 'Formula Blaster', highestScore: 640, globalRank: 27, themeColor: '#3b82f6', icon: '💥' },
  { gameId: 'neutralise', gameTitle: 'Neutralise!', highestScore: null, globalRank: null, themeColor: '#10b981', icon: '⚡' },
];

export const publicLeaderboards: GameLeaderboard[] = [
  {
    gameId: 'acid-classification',
    gameTitle: 'Acid or Base?',
    entries: [
      { id: '1', alias: 'A. Curie', score: 1280, timestamp: '2026-07-17' },
      { id: '2', alias: 'Molecule Maven', score: 1120, timestamp: '2026-07-16' },
      { id: '3', alias: 'Ion Pilot', score: 980, timestamp: '2026-07-15' },
    ],
  },
  {
    gameId: 'formula-blaster',
    gameTitle: 'Formula Blaster',
    entries: [
      { id: '4', alias: 'Formula Fox', score: 940, timestamp: '2026-07-17' },
      { id: '5', alias: 'Lab Rat', score: 860, timestamp: '2026-07-16' },
    ],
  },
  {
    gameId: 'neutralise',
    gameTitle: 'Neutralise!',
    entries: [
      { id: '6', alias: 'Base Defender', score: 760, timestamp: '2026-07-16' },
      { id: '7', alias: 'pH Pro', score: 715, timestamp: '2026-07-14' },
    ],
  },
];
