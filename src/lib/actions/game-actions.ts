// src/lib/actions/game-actions.ts
'use server';

import { createClient } from '@/lib/supabase/server';
import type { GameName } from '@/core-engine/types/general';

export interface RecordSessionInput {
  gameId: GameName;
  score: number;
  accuracy?: number; // e.g. 85 for 85%
  timeSpentSeconds: number;
  outcome: 'victory' | 'defeat' | 'abandoned';
}

export async function recordGameSession(input: RecordSessionInput) {
  try {
    const supabase = await createClient();
    if (!supabase) return { success: false, error: 'Database unconfigured' };

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return { success: false, error: 'User must be authenticated to save scores' };
    }

    // 1. Save the individual session event
    const { error: sessionError } = await supabase
      .from('game_sessions')
      .insert({
        user_id: user.id,
        game_id: input.gameId,
        score: input.score,
        accuracy: input.accuracy ?? null,
        time_spent_seconds: input.timeSpentSeconds,
        outcome: input.outcome,
        completed_at: new Date().toISOString(),
      });

    if (sessionError) {
      console.error('Error inserting game_session:', sessionError);
      return { success: false, error: sessionError.message };
    }

    // 2. Upsert cumulative progress for this specific game
    const { data: existingProgress } = await supabase
      .from('game_progress')
      .select('*')
      .eq('user_id', user.id)
      .eq('game_id', input.gameId)
      .maybeSingle();

    const previousHighScore = existingProgress?.high_score ?? 0;
    const previousTotalPlayed = existingProgress?.total_played ?? 0;
    const newHighScore = Math.max(previousHighScore, input.score);

    const { error: progressError } = await supabase
      .from('game_progress')
      .upsert({
        user_id: user.id,
        game_id: input.gameId,
        high_score: newHighScore,
        total_played: previousTotalPlayed + 1,
        last_played_at: new Date().toISOString(),
      }, { onConflict: 'user_id,game_id' });

    if (progressError) {
      console.error('Error upserting game_progress:', progressError);
    }

    // 3. Increment profile-level aggregate (total_syntheses) safely
    if (input.outcome === 'victory') {
      try {
        await supabase.rpc('increment_total_syntheses', { user_id_param: user.id });
      } catch {
        // Fallback gracefully if SQL RPC function isn't defined yet
      }
    }

    return { success: true, highScore: newHighScore };
  } catch (err) {
    console.error('Unexpected game action error:', err);
    return { success: false, error: 'Unexpected server error' };
  }
}
