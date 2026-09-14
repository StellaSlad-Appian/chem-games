import { describe, expect, it } from 'vitest';
import { safeRedirectPath } from './safe-redirect';

const origin = 'https://chem-games.example';

// Built at runtime so the source file itself stays free of control bytes.
const NUL = String.fromCharCode(0x00);
const DEL = String.fromCharCode(0x7f);

describe('safeRedirectPath', () => {
  it('keeps a plain same-origin path', () => {
    expect(safeRedirectPath('/profile', origin)).toBe('/profile');
  });

  it('keeps the search string and hash of a same-origin path', () => {
    expect(safeRedirectPath('/games?x=1#y', origin)).toBe('/games?x=1#y');
  });

  it('returns "/" for the root path', () => {
    expect(safeRedirectPath('/', origin)).toBe('/');
  });

  it('works with an origin that carries a port', () => {
    expect(safeRedirectPath('/profile', 'http://localhost:3000')).toBe(
      '/profile'
    );
  });

  it('rejects protocol-relative URLs', () => {
    expect(safeRedirectPath('//evil.example', origin)).toBe('/');
    expect(safeRedirectPath('//evil.example/path?x=1', origin)).toBe('/');
  });

  it('rejects the backslash form of a protocol-relative URL', () => {
    expect(safeRedirectPath('/\\evil.example', origin)).toBe('/');
    expect(safeRedirectPath('/\\/evil.example', origin)).toBe('/');
  });

  it('rejects absolute URLs on another host', () => {
    expect(safeRedirectPath('https://evil.example', origin)).toBe('/');
    expect(safeRedirectPath('https://evil.example/profile', origin)).toBe('/');
  });

  it('rejects absolute URLs even when they point at the same origin', () => {
    // Only paths are accepted; an absolute URL fails the leading-slash rule.
    expect(safeRedirectPath(`${origin}/profile`, origin)).toBe('/');
  });

  it('rejects javascript: URLs', () => {
    expect(safeRedirectPath('javascript:alert(1)', origin)).toBe('/');
  });

  it('rejects relative paths', () => {
    expect(safeRedirectPath('profile', origin)).toBe('/');
    expect(safeRedirectPath('./profile', origin)).toBe('/');
  });

  it.each([
    ['an empty string', ''],
    ['null', null],
    ['undefined', undefined],
  ])('falls back to "/" for %s', (_label, value) => {
    expect(safeRedirectPath(value, origin)).toBe('/');
  });

  it('rejects paths containing control characters', () => {
    // The URL parser strips tabs and newlines, so without this check
    // '/\t/evil' would resolve to '//evil'.
    expect(safeRedirectPath('/\t/evil', origin)).toBe('/');
    expect(safeRedirectPath('/\n/evil', origin)).toBe('/');
    expect(safeRedirectPath('/\r/evil', origin)).toBe('/');
    expect(safeRedirectPath('/profile' + NUL, origin)).toBe('/');
    expect(safeRedirectPath('/profile' + DEL, origin)).toBe('/');
  });

  it('keeps a percent-encoded double slash as a same-origin path', () => {
    expect(safeRedirectPath('/%2F%2Fevil.example', origin)).toBe(
      '/%2F%2Fevil.example'
    );
  });

  it('allows a double slash inside the query string', () => {
    expect(safeRedirectPath('/auth/callback?next=//x', origin)).toBe(
      '/auth/callback?next=//x'
    );
  });
});
