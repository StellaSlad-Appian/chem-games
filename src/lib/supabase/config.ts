// src/lib/supabase/config.ts

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const rawAnonKey = 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

// Normalize URL (strip trailing slashes to prevent PGRST125 errors)
const supabaseUrl = rawUrl ? rawUrl.replace(/\/+$/, '') : undefined;
const supabasePublishableKey = rawAnonKey;

/**
 * Check if Supabase credentials are correctly set up in .env.local
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && supabasePublishableKey);
}

/**
 * Returns Supabase credentials or null if unconfigured,
 * avoiding uncaught process crashes during local development.
 */
export function getSupabaseConfig() {
  if (!isSupabaseConfigured()) {
    console.warn(
      '⚠️ [ChemGames] Supabase is not configured. Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY.'
    );
    return null;
  }

  return {
    supabaseUrl: supabaseUrl as string,
    supabasePublishableKey: supabasePublishableKey as string,
  };
}