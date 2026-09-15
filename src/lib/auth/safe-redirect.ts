// src/lib/auth/safe-redirect.ts

/**
 * Turn an untrusted `next` value (typically a query parameter) into a
 * redirect target that is guaranteed to stay on `origin`.
 *
 * Returns the same-origin path (`pathname + search + hash`) when `next` is a
 * plain absolute path, and `'/'` for everything else:
 *
 * - non-strings, the empty string and relative paths;
 * - absolute URLs such as `https://evil.example` or `javascript:alert(1)`;
 * - protocol-relative URLs such as `//evil.example`;
 * - backslash variants such as `/\evil.example`, which the WHATWG parser
 *   treats like `//` for special schemes;
 * - anything containing control characters: the parser strips tabs and
 *   newlines, so `/\t/evil` would otherwise resolve to `//evil`.
 *
 * A final `url.origin === origin` check catches anything the syntactic
 * rules miss, so the result can be handed to `new URL(result, origin)`
 * without ever leaving the site.
 */
export function safeRedirectPath(
  next: string | null | undefined,
  origin: string
): string {
  if (typeof next !== 'string') return '/';
  if (next.charAt(0) !== '/') return '/';

  const second = next.charAt(1);
  if (second === '/' || second === '\\') return '/';

  if (hasControlCharacters(next)) return '/';

  let url: URL;
  try {
    url = new URL(next, origin);
  } catch {
    return '/';
  }

  if (url.origin !== origin) return '/';

  return url.pathname + url.search + url.hash;
}

function hasControlCharacters(value: string): boolean {
  for (let i = 0; i < value.length; i += 1) {
    const code = value.charCodeAt(i);
    if (code < 0x20 || code === 0x7f) return true;
  }
  return false;
}
