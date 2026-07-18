import { type NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/config';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') ?? '/';
  if (!isSupabaseConfigured()) return NextResponse.redirect(new URL('/auth?error=configuration', requestUrl.origin));
  if (code) {
    const { error } = await (await createClient()).auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(new URL(next.startsWith('/') ? next : '/', requestUrl.origin));
  }
  return NextResponse.redirect(new URL('/auth?error=verification', requestUrl.origin));
}
