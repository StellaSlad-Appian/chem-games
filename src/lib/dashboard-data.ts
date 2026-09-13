// src/lib/dashboard-data.ts
//
// Server-side reads for the dashboard and leaderboards. Every function degrades
// to empty data when Supabase is unconfigured or a query fails, so pages still
// render (with their empty states) instead of crashing.

import { createClient } from '@/lib/supabase/server';
import type {
  GameLeaderboard,
  GameName,
  LeaderboardEntry,
  PersonalScore,
} from '@/core-engine/types/general';

type SupabaseServerClient = NonNullable<Awaited<ReturnType<typeof createClient>>>;

interface GameRow {
  id: GameName;
  title: string;
  icon: string;
  theme_color: string;
}

interface LeaderboardRow {
  game_id: GameName;
  alias: string;
  score: number;
  completed_at: string;
  global_rank: number;
}

const DEFAULT_LEADERBOARD_SIZE = 10;

/** Active games from the catalogue, in display order. */
async function getActiveGames(supabase: SupabaseServerClient): Promise<GameRow[]> {
  const { data, error } = await supabase
    .from('games')
    .select('id, title, icon, theme_color')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (error || !data) {
    console.error('Error loading games catalogue:', error);
    return [];
  }

  return data as GameRow[];
}

/**
 * Primary concept title per game, from concept_games -> concepts.
 * Returns an empty map if the concepts migration has not been applied yet.
 */
async function getPrimaryConceptTitles(
  supabase: SupabaseServerClient
): Promise<Partial<Record<GameName, string>>> {
  const { data, error } = await supabase
    .from('concept_games')
    .select('game_id, concepts ( title )')
    .eq('role', 'primary');

  if (error || !data) {
    return {};
  }

  const titles: Partial<Record<GameName, string>> = {};
  for (const row of data as unknown as { game_id: GameName; concepts: { title: string } | null }[]) {
    if (row.concepts?.title && !titles[row.game_id]) {
      titles[row.game_id] = row.concepts.title;
    }
  }
  return titles;
}

/**
 * Public leaderboards for every active game, read from the `leaderboard_entries`
 * view (best victory score per player, ranked with ties). Games with no
 * victories yet are included with an empty list so their tab still appears.
 */
export async function getPublicLeaderboards(
  entriesPerGame: number = DEFAULT_LEADERBOARD_SIZE
): Promise<GameLeaderboard[]> {
  const supabase = await createClient();
  if (!supabase) return [];

  const games = await getActiveGames(supabase);
  if (games.length === 0) return [];

  const { data, error } = await supabase
    .from('leaderboard_entries')
    .select('game_id, alias, score, completed_at, global_rank')
    .in('game_id', games.map((game) => game.id))
    .lte('global_rank', entriesPerGame)
    .order('game_id', { ascending: true })
    .order('global_rank', { ascending: true });

  if (error) {
    console.error('Error loading leaderboard entries:', error);
  }

  const entriesByGame = new Map<GameName, LeaderboardEntry[]>();
  for (const row of (data ?? []) as LeaderboardRow[]) {
    const entry: LeaderboardEntry = {
      id: `${row.game_id}-${row.global_rank}-${row.alias}`,
      alias: row.alias,
      score: row.score,
      timestamp: row.completed_at,
      rank: row.global_rank,
    };
    const list = entriesByGame.get(row.game_id) ?? [];
    list.push(entry);
    entriesByGame.set(row.game_id, list);
  }

  return games.map((game) => ({
    gameId: game.id,
    gameTitle: game.title,
    entries: entriesByGame.get(game.id) ?? [],
  }));
}

/**
 * The signed-in user's best victory score and global rank for every active game.
 * Rank is computed the same way as the leaderboard view: 1 + number of players
 * whose best score is higher (so ties share a rank).
 */
export async function getPersonalScores(userId: string): Promise<PersonalScore[]> {
  const supabase = await createClient();
  if (!supabase) return [];

  const [games, conceptTitles, sessionsResult] = await Promise.all([
    getActiveGames(supabase),
    getPrimaryConceptTitles(supabase),
    supabase
      .from('game_sessions')
      .select('game_id, score')
      .eq('user_id', userId)
      .eq('outcome', 'victory')
      .order('score', { ascending: false }),
  ]);

  if (sessionsResult.error) {
    console.error('Error loading personal game sessions:', sessionsResult.error);
  }

  const bestByGame = new Map<GameName, number>();
  for (const row of (sessionsResult.data ?? []) as { game_id: GameName; score: number }[]) {
    if (!bestByGame.has(row.game_id)) bestByGame.set(row.game_id, row.score);
  }

  return Promise.all(
    games.map(async (game): Promise<PersonalScore> => {
      const highestScore = bestByGame.get(game.id) ?? null;
      let globalRank: number | null = null;

      if (highestScore !== null) {
        const { count, error } = await supabase
          .from('leaderboard_entries')
          .select('*', { count: 'exact', head: true })
          .eq('game_id', game.id)
          .gt('score', highestScore);

        if (!error && count !== null) {
          globalRank = count + 1;
        }
      }

      return {
        gameId: game.id,
        gameTitle: game.title,
        highestScore,
        globalRank,
        themeColor: game.theme_color,
        icon: game.icon,
        conceptTitle: conceptTitles[game.id] ?? null,
      };
    })
  );
}
