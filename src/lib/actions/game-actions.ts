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

    // 1. Save individual game session event
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

    // 2. Upsert cumulative per-game progress
    const { data: existingProgress } = await supabase
      .from('game_progress')
      .select('*')
      .eq('user_id', user.id)
      .eq('game_id', input.gameId)
      .maybeSingle();

    const previousHighScore = existingProgress?.high_score ?? 0;
    const previousTotalPlayed = existingProgress?.total_played ?? 0;
    const newHighScore = Math.max(previousHighScore, input.score);

    await supabase
      .from('game_progress')
      .upsert({
        user_id: user.id,
        game_id: input.gameId,
        high_score: newHighScore,
        total_played: previousTotalPlayed + 1,
        last_played_at: new Date().toISOString(),
      }, { onConflict: 'user_id,game_id' });

    // 3. Update User Profile Aggregates (Streak, Accuracy, Syntheses)
    const { data: profile } = await supabase
      .from('profiles')
      .select('current_streak, max_streak, accuracy, total_syntheses, last_played_at')
      .eq('id', user.id)
      .single();

    if (profile) {
      const now = new Date();
      const lastPlayed = profile.last_played_at ? new Date(profile.last_played_at) : null;
      
      let newStreak = profile.current_streak || 0;
      
      if (!lastPlayed) {
        newStreak = 1;
      } else {
        const diffInDays = Math.floor((now.getTime() - lastPlayed.getTime()) / (1000 * 3600 * 24));
        const isSameDay = now.toDateString() === lastPlayed.toDateString();

        if (isSameDay) {
          // Played again today, streak stays the same
          newStreak = profile.current_streak || 1;
        } else if (diffInDays === 1) {
          // Played yesterday, increment streak
          newStreak = (profile.current_streak || 0) + 1;
        } else {
          // Missed a day or more, reset streak
          newStreak = 1;
        }
      }

      const newMaxStreak = Math.max(profile.max_streak || 0, newStreak);

      // Recalculate average overall accuracy if provided
      let updatedAccuracy = profile.accuracy;
      if (input.accuracy !== undefined) {
        // Simple rolling weighted average or smoothed update
        updatedAccuracy = profile.accuracy === 0 || profile.accuracy === null
          ? input.accuracy
          : Math.round((profile.accuracy + input.accuracy) / 2);
      }

      const updatedSyntheses = input.outcome === 'victory'
        ? (profile.total_syntheses || 0) + 1
        : (profile.total_syntheses || 0);

      await supabase
        .from('profiles')
        .update({
          current_streak: newStreak,
          max_streak: newMaxStreak,
          accuracy: updatedAccuracy,
          total_syntheses: updatedSyntheses,
          last_played_at: now.toISOString(),
          updated_at: now.toISOString(),
        })
        .eq('id', user.id);
    }

    return { success: true, highScore: newHighScore };
  } catch (err) {
    console.error('Unexpected game action error:', err);
    return { success: false, error: 'Unexpected server error' };
  }
}
