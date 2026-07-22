// src/lib/supabase/client.ts

import { createBrowserClient } from '@supabase/ssr';
import { getSupabaseConfig } from './config';

/**
 * Creates a browser-side Supabase client instance.
 * Returns null if Supabase environment variables are missing.
 */
export function createClient() {
  const config = getSupabaseConfig();

  // Guard against null/unconfigured environment variables
  if (!config) {
    return null;
  }

  return createBrowserClient(
    config.supabaseUrl,
    config.supabasePublishableKey
  );
}
