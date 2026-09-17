// src/app/auth/callback/route.ts
//
// Deliberately NOT under src/app/[lang]/. This URL is registered as a redirect
// target in the Supabase dashboard and is what `AuthForm` sends as
// `emailRedirectTo` / `redirectTo`, so it has to keep answering on the stable,
// unprefixed path. `isUnprefixedPath()` in src/i18n/routing.ts keeps the proxy
// from rewriting it.
//
// Everything it redirects *to*, on the other hand, is a page, so it gets the
// locale prefix. The locale comes from the cookie the proxy maintains: the
// reader was on a localized page when they started signing in, so the cookie
// is already set to the language they were reading.

import { NextResponse } from 'next/server';
import { safeRedirectPath } from '@/lib/auth/safe-redirect';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import { createClient } from '@/lib/supabase/server';
import { getRequestLocale } from '@/i18n/server';
import { localizePath } from '@/i18n/routing';
import type { Locale } from '@/i18n/config';

function redirectTo(path: string, locale: Locale, origin: string) {
  // localizePath only ever prefixes the pathname, so a query string has to be
  // kept separate from it.
  const [pathname, search = ''] = path.split('?');
  const localized = localizePath(pathname, locale);
  return NextResponse.redirect(
    new URL(search ? `${localized}?${search}` : localized, origin)
  );
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') ?? '/';
  const locale = await getRequestLocale();

  // Guard: Ensure Supabase environment variables exist
  if (!isSupabaseConfigured()) {
    return redirectTo('/auth?error=configuration', locale, requestUrl.origin);
  }

  if (code) {
    const supabase = await createClient();

    // Guard: Prevent errors if server client fails to initialize
    if (!supabase) {
      return redirectTo('/auth?error=configuration', locale, requestUrl.origin);
    }

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Prevent open redirects: only a same-origin path is accepted, so
      // '//evil.example' and '/\evil.example' fall back to '/'.
      const safeNext = safeRedirectPath(next, requestUrl.origin);
      // safeRedirectPath already returns pathname + search + hash, and
      // localizePath is idempotent, so a `next` that already carries a locale
      // prefix is not double-prefixed.
      return redirectTo(safeNext, locale, requestUrl.origin);
    }
  }

  // Fallback redirect on exchange failure
  return redirectTo('/auth?error=verification', locale, requestUrl.origin);
}
