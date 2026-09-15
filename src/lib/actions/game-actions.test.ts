/**
 * recordGameSession() must reject implausible payloads before touching the
 * database and must never hand a raw database error back to the browser.
 * The Supabase server client is replaced by a small fake.
 */
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { recordGameSession, type RecordSessionInput } from './game-actions';
import { GAME_SESSION_LIMITS } from '@/core-engine/utils/session-validation';

const { createClientMock } = vi.hoisted(() => ({ createClientMock: vi.fn() }));
vi.mock('@/lib/supabase/server', () => ({ createClient: createClientMock }));

interface FakeOptions {
  insertError?: { message: string; code?: string } | null;
  user?: { id: string } | null;
}

const fakeSupabase = ({ insertError = null, user = { id: 'user-1' } }: FakeOptions = {}) => {
  const insert = vi.fn(async () => ({ error: insertError }));
  const from = vi.fn((table: string) => {
    switch (table) {
      case 'game_sessions':
        return { insert };
      case 'game_progress':
        return {
          select: () => ({ eq: () => ({ eq: () => ({ maybeSingle: async () => ({ data: null }) }) }) }),
          upsert: async () => ({ error: null }),
        };
      case 'profiles':
        return {
          select: () => ({ eq: () => ({ single: async () => ({ data: null }) }) }),
          update: () => ({ eq: async () => ({ error: null }) }),
        };
      default:
        throw new Error(`Unexpected table ${table}`);
    }
  });
  return {
    client: { auth: { getUser: async () => ({ data: { user }, error: null }) }, from },
    insert,
  };
};

const validSession: RecordSessionInput = {
  gameId: 'acid-classification',
  score: 500,
  levelReached: 1,
  accuracy: 100,
  timeSpentSeconds: 30,
  outcome: 'victory',
};

describe('recordGameSession', () => {
  beforeEach(() => {
    createClientMock.mockReset();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('rejects an implausible score before touching the database', async () => {
    const result = await recordGameSession({
      ...validSession,
      score: GAME_SESSION_LIMITS['acid-classification'].maxScore + 1,
    });
    expect(result).toEqual({ success: false, error: 'Invalid session data' });
    expect(createClientMock).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('Rejected game session:', expect.stringContaining('score'));
  });

  it('rejects a session for a game that is not in the catalogue', async () => {
    const result = await recordGameSession({ ...validSession, gameId: 'made-up-game' as never });
    expect(result).toEqual({ success: false, error: 'Invalid session data' });
    expect(createClientMock).not.toHaveBeenCalled();
  });

  it('saves a valid session as the signed-in user', async () => {
    const fake = fakeSupabase();
    createClientMock.mockResolvedValue(fake.client);

    const result = await recordGameSession(validSession);
    expect(result).toEqual({ success: true, highestScore: 500 });
    expect(fake.insert).toHaveBeenCalledWith(
      expect.objectContaining({
        user_id: 'user-1',
        game_id: 'acid-classification',
        score: 500,
        level_reached: 1,
        outcome: 'victory',
        duration_seconds: 30,
      })
    );
  });

  it('returns a generic message when the insert fails and logs the details server-side', async () => {
    const insertError = {
      message: 'new row violates row-level security policy for table "game_sessions"',
      code: '42501',
    };
    const fake = fakeSupabase({ insertError });
    createClientMock.mockResolvedValue(fake.client);

    const result = await recordGameSession(validSession);
    expect(result).toEqual({ success: false, error: 'Could not save the game session' });
    expect(JSON.stringify(result)).not.toContain('row-level security');
    expect(console.error).toHaveBeenCalledWith('Error inserting game_session:', insertError);
  });

  it('refuses to save when nobody is signed in', async () => {
    const fake = fakeSupabase({ user: null });
    createClientMock.mockResolvedValue(fake.client);

    const result = await recordGameSession(validSession);
    expect(result).toEqual({ success: false, error: 'User must be authenticated to save scores' });
    expect(fake.insert).not.toHaveBeenCalled();
  });
});
