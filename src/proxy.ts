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
    //
    // Only do this for a real document navigation. Next's router prefetches
    // every visible link (see node_modules/next/dist/docs/01-app/02-guides/
    // prefetching.md), and those prefetches are ordinary GETs against the
    // *previous* page's links — they don't reflect where the reader is now.
    // If the reader switches language while a prefetch of an old-locale link
    // is still in flight, that prefetch can land here after the switcher has
    // already written the new locale, and re-stamp the cookie back to the
    // stale locale (the exact race this comment is here to prevent).
    //
    // The obvious signal would be the `rsc` / `next-router-prefetch` /
    // `next-router-state-tree` request headers Next's router sets on every
    // prefetch, soft navigation, and server-action data request (see
    // node_modules/next/dist/client/components/app-router-headers.js,
    // FLIGHT_HEADERS). But Proxy never sees them: Next explicitly deletes
    // every FLIGHT_HEADERS entry from the request before invoking Proxy
    // ("Headers should only be stripped for middleware", see
    // node_modules/next/dist/server/web/adapter.js) — confirmed by logging
    // the headers Proxy actually receives against a production build, where
    // `rsc` was already gone.
    //
    // `sec-fetch-dest` survives, because it's browser-standard fetch
    // metadata, not a Next-defined header, so Next has no reason to strip
    // it. Chrome and Firefox set it to `document` for an address-bar load, a
    // link click's navigation, or this function's own redirect, and to
    // `empty` for a `fetch()` call — which is what the router's prefetches
    // and soft navigations are under the hood. It isn't sent by every
    // client (very old browsers, non-browser clients), so a missing header
    // falls back to the pre-fix behaviour of remembering the locale, rather
    // than guessing wrong in either direction.
    const secFetchDest = request.headers.get('sec-fetch-dest');
    const isRouterRequest = secFetchDest !== null && secFetchDest !== 'document';
    if (!isRouterRequest && request.cookies.get(LOCALE_COOKIE)?.value !== pathLocale) {
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
