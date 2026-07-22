// src/lib/supabase/proxy.ts

import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { getSupabaseConfig } from './config';

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });
  try {
    const config = getSupabaseConfig();

    // Guard against unconfigured or null Supabase credentials
    if (!config) {
      return response;
    }

    const supabase = createServerClient(
      config.supabaseUrl,
      config.supabasePublishableKey,
      {
        cookies: {
          getAll: () => request.cookies.getAll(),
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            response = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    await supabase.auth.getUser();
  } catch {
    // Allow the app to run before credentials are supplied.
  }

  return response;
}