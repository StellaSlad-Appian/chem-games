// src/lib/actions/game-actions.ts
'use server';

import { createClient } from '@/lib/supabase/server';
import type { GameName } from '@/core-engine/types/general';

export interface RecordSessionInput {
  gameId: GameName;
  score: number;
  levelReached?: number;
  accuracy?: number; // e.g. 85 for 85%
  timeSpentSeconds: number;
  outcome: 'victory' | 'failed' | 'abandoned'; // Matched schema check!
}

export async function recordGameSession(input: RecordSessionInput) {
  try {
    const supabase = await createClient();
    if (!supabase) return { success: false, error: 'Database unconfigured' };

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return { success: false, error: 'User must be authenticated to save scores' };
    }

    // Sanitize score to ensure check constraint score >= 0
    const sanitizedScore = Math.max(0, Math.floor(input.score));
    const levelReached = Math.max(1, input.levelReached ?? 1);

    // 1. Save individual game session
    const { error: sessionError } = await supabase
      .from('game_sessions')
      .insert({
        user_id: user.id,
        game_id: input.gameId,
        score: sanitizedScore,
        level_reached: levelReached,
        outcome: input.outcome, // Must be 'victory', 'failed', or 'abandoned'
        duration_seconds: Math.max(0, input.timeSpentSeconds),
        // Integer 0-100 or null; the game_sessions trigger folds it into the profile's running average.
        accuracy:
          typeof input.accuracy === 'number' && Number.isFinite(input.accuracy)
            ? Math.min(100, Math.max(0, Math.round(input.accuracy)))
            : null,
        completed_at: new Date().toISOString(),
      });

    if (sessionError) {
      console.error('Error inserting game_session:', sessionError);
      return { success: false, error: sessionError.message };
    }

    // 2. Upsert per-game progress
    const { data: existingProgress } = await supabase
      .from('game_progress')
      .select('highest_score, highest_level')
      .eq('user_id', user.id)
      .eq('game_id', input.gameId)
      .maybeSingle();

    const previousHighestScore = existingProgress?.highest_score ?? 0;
    const previousHighestLevel = existingProgress?.highest_level ?? 1;

    const newHighestScore = Math.max(previousHighestScore, sanitizedScore);
    const newHighestLevel = Math.max(previousHighestLevel, levelReached);

    const { error: progressError } = await supabase
      .from('game_progress')
      .upsert({
        user_id: user.id,
        game_id: input.gameId,
        highest_score: newHighestScore,
        highest_level: newHighestLevel,
        last_played_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id,game_id' });

    if (progressError) {
      console.error('Error upserting game_progress:', progressError);
    }

    // Profile aggregates (streak, max streak, accuracy, syntheses, last played) are
    // maintained by the game_sessions trigger; see supabase/migrations/20260914_profile_privacy.sql.

    return { success: true, highestScore: newHighestScore };
  } catch (err) {
    console.error('Unexpected game action error:', err);
    return { success: false, error: 'Unexpected server error' };
  }
}
