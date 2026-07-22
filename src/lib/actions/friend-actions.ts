// src/lib/actions/friend-actions.ts
'use server';

import { createClient } from '@/lib/supabase/server';

export interface FriendActionResult {
  status: 'success' | 'error';
  message: string;
}

/**
 * Server Action to send a friend request to another ChemGames scientist.
 */
export async function sendFriendRequestAction(
  targetUserId: string
): Promise<FriendActionResult> {
  try {
    const supabase = await createClient();

    // 1. Guard against unconfigured or null Supabase instance
    if (!supabase) {
      return {
        status: 'error',
        message: 'Database service is currently unconfigured.',
      };
    }

    // 2. Validate session user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return {
        status: 'error',
        message: 'Please log in to add friends.',
      };
    }

    if (user.id === targetUserId) {
      return {
        status: 'error',
        message: 'You cannot send a friend request to yourself!',
      };
    }

    // 3. Create friend request record
    const { error: insertError } = await supabase.from('friendships').insert({
      user_id: user.id,
      friend_id: targetUserId,
      status: 'pending',
      created_at: new Date().toISOString(),
    });

    if (insertError) {
      console.error('⚠️ [ChemGames Friend Action Error]:', insertError.message);
      return {
        status: 'error',
        message: 'Failed to send friend request or request already exists.',
      };
    }

    return {
      status: 'success',
      message: 'Friend request sent successfully!',
    };
  } catch (err) {
    console.error('Unexpected error sending friend request:', err);
    return {
      status: 'error',
      message: 'An unexpected error occurred while sending the request.',
    };
  }
}