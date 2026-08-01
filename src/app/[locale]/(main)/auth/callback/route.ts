// src/app/auth/callback/route.ts

import { NextResponse } from 'next/server';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') ?? '/';

  // Guard: Ensure Supabase environment variables exist
  if (!isSupabaseConfigured()) {
    return NextResponse.redirect(
      new URL('/auth?error=configuration', requestUrl.origin)
    );
  }

  if (code) {
    const supabase = await createClient();

    // Guard: Prevent errors if server client fails to initialize
    if (!supabase) {
      return NextResponse.redirect(
        new URL('/auth?error=configuration', requestUrl.origin)
      );
    }

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Prevent open-redirect vulnerabilities by validating path format
      const safeNext = next.startsWith('/') ? next : '/';
      return NextResponse.redirect(new URL(safeNext, requestUrl.origin));
    }
  }

  // Fallback redirect on exchange failure
  return NextResponse.redirect(
    new URL('/auth?error=verification', requestUrl.origin)
  );
}