// src/app/(main)/account/export/route.ts
//
// GET /account/export
// Returns everything ChemGames stores about the signed-in user as a JSON
// download. All reads go through the user's own cookie-scoped Supabase client,
// so row level security limits the result to their own rows.

import { createClient } from '@/lib/supabase/server';

const NO_STORE = { 'Cache-Control': 'no-store' } as const;

function errorResponse(message: string, status: number) {
  return Response.json({ error: message }, { status, headers: NO_STORE });
}

function providersOf(appMetadata: Record<string, unknown> | undefined): string[] {
  const providers = appMetadata?.providers;
  if (Array.isArray(providers)) {
    return providers.filter((provider): provider is string => typeof provider === 'string');
  }
  const provider = appMetadata?.provider;
  return typeof provider === 'string' ? [provider] : [];
}

export async function GET() {
  const supabase = await createClient();

  if (!supabase) {
    return errorResponse('Data export is not available right now.', 503);
  }

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return errorResponse('You need to be signed in to download your data.', 401);
  }

  const [profileResult, sessionsResult, progressResult] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', user.id).maybeSingle(),
    supabase
      .from('game_sessions')
      .select('*')
      .eq('user_id', user.id)
      .order('completed_at', { ascending: false }),
    supabase.from('game_progress').select('*').eq('user_id', user.id).order('game_id'),
  ]);

  const failed = [profileResult, sessionsResult, progressResult].find((result) => result.error);
  if (failed?.error) {
    console.error('Data export query failed:', failed.error);
    return errorResponse('We could not prepare your data export. Please try again later.', 500);
  }

  const payload = {
    exportedAt: new Date().toISOString(),
    account: {
      id: user.id,
      email: user.email ?? null,
      providers: providersOf(user.app_metadata),
    },
    profile: profileResult.data,
    gameSessions: sessionsResult.data ?? [],
    gameProgress: progressResult.data ?? [],
  };

  return new Response(JSON.stringify(payload, null, 2), {
    status: 200,
    headers: {
      ...NO_STORE,
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Disposition': 'attachment; filename="chemgames-data.json"',
    },
  });
}
