// src/app/auth/callback/route.ts

import { NextResponse } from 'next/server';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') ?? '/';

  if (!isSupabaseConfigured()) {
    return NextResponse.redirect(
      new URL('/auth?error=configuration', requestUrl.origin)
    );
  }

  if (code) {
    const supabase = await createClient();

    // Guard against null Supabase client instance
    if (!supabase) {
      return NextResponse.redirect(
        new URL('/auth?error=configuration', requestUrl.origin)
      );
    }

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(
        new URL(next.startsWith('/') ? next : '/', requestUrl.origin)
      );
    }
  }

  return NextResponse.redirect(
    new URL('/auth?error=verification', requestUrl.origin)
  );
}