import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from './lib/supabase/proxy';
import { LOCALE_COOKIE, LOCALE_COOKIE_MAX_AGE, type Locale } from './i18n/config';
import { resolveLocale } from './i18n/locale-match';
import { isUnprefixedPath, localeFromPathname, localizePath } from './i18n/routing';

/**
 * Proxy (Next 16's renamed middleware — see
 * node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md).
 *
 * Two jobs, in this order:
 *
 *  1. Refresh the Supabase auth session. `updateSession` returns a
 *     `NextResponse.next()` carrying any rotated auth cookies in its
 *     `Set-Cookie` headers.
 *  2. Send requests without a locale prefix to the locale we picked for them.
 *
 * The order matters and so does how the two compose. Supabase uses refresh
 * token rotation: when `updateSession` refreshes, the old token is already
 * spent server-side and the replacement exists *only* in the response it built.
 * Returning a bare `NextResponse.redirect(...)` here would throw those cookies
 * away and sign the reader out — intermittently, on exactly the requests that
 * happened to land on a token refresh, which is the worst kind of bug to
 * reproduce. So the redirect is built by copying every cookie off the session
 * response first. `src/proxy.test.ts` asserts that directly.
 */
export async function proxy(request: NextRequest) {
  const sessionResponse = await updateSession(request);
  const { pathname } = request.nextUrl;

  // Route handlers and framework paths keep their unprefixed URLs.
  // /auth/callback in particular is registered as a redirect target in the
  // Supabase dashboard; prefixing it would break the OAuth handshake.
  if (isUnprefixedPath(pathname)) return sessionResponse;

  const pathLocale = localeFromPathname(pathname);
  if (pathLocale) {
    // Already localized. Remember the locale so a later visit to an unprefixed
    // URL (a shared link, a bookmark to "/") lands in the same language. Only
    // written when it differs, to avoid a Set-Cookie on every single request.
    if (request.cookies.get(LOCALE_COOKIE)?.value !== pathLocale) {
      sessionResponse.cookies.set(LOCALE_COOKIE, pathLocale, {
        path: '/',
        maxAge: LOCALE_COOKIE_MAX_AGE,
        sameSite: 'lax',
      });
    }
    return sessionResponse;
  }

  const locale = resolveLocale({
    cookieLocale: request.cookies.get(LOCALE_COOKIE)?.value,
    acceptLanguage: request.headers.get('accept-language'),
  });

  return localeRedirect(request, locale, sessionResponse);
}

/**
 * Builds a redirect to the localized URL that preserves everything the session
 * response set. Cookies are copied rather than headers wholesale: a `next()`
 * response carries internal `x-middleware-*` headers that must not travel with
 * a redirect.
 */
function localeRedirect(
  request: NextRequest,
  locale: Locale,
  sessionResponse: NextResponse
): NextResponse {
  const url = request.nextUrl.clone();
  url.pathname = localizePath(url.pathname, locale);

  const redirect = NextResponse.redirect(url);

  for (const cookie of sessionResponse.cookies.getAll()) {
    redirect.cookies.set(cookie);
  }

  redirect.cookies.set(LOCALE_COOKIE, locale, {
    path: '/',
    maxAge: LOCALE_COOKIE_MAX_AGE,
    sameSite: 'lax',
  });

  // Caches must not hand one reader's negotiated language to another.
  redirect.headers.set('Vary', 'Accept-Language, Cookie');

  return redirect;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
