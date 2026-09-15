import { describe, expect, it } from 'vitest';
import { escapeHtml } from './escape-html';

describe('escapeHtml', () => {
  it('escapes the five HTML-significant characters', () => {
    expect(escapeHtml('&')).toBe('&amp;');
    expect(escapeHtml('<')).toBe('&lt;');
    expect(escapeHtml('>')).toBe('&gt;');
    expect(escapeHtml('"')).toBe('&quot;');
    expect(escapeHtml("'")).toBe('&#39;');
  });

  it('escapes every occurrence, not just the first', () => {
    expect(escapeHtml('<<>>')).toBe('&lt;&lt;&gt;&gt;');
    expect(escapeHtml('a & b & c')).toBe('a &amp; b &amp; c');
  });

  it('neutralises markup and event handlers', () => {
    expect(escapeHtml('<script>alert("x")</script>')).toBe(
      '&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;'
    );
    expect(escapeHtml(`<img src=x onerror='fetch("https://evil.example")'>`)).toBe(
      '&lt;img src=x onerror=&#39;fetch(&quot;https://evil.example&quot;)&#39;&gt;'
    );
  });

  it('does not double-escape already escaped text', () => {
    // The ampersand of an existing entity is escaped again, which is the
    // correct behaviour for a value that should be shown literally.
    expect(escapeHtml('&lt;')).toBe('&amp;lt;');
  });

  it('leaves safe text, unicode and whitespace untouched', () => {
    expect(escapeHtml('')).toBe('');
    expect(escapeHtml('H₂O + NaOH → NaOH·H₂O')).toBe('H₂O + NaOH → NaOH·H₂O');
    expect(escapeHtml('line one\nline two\ttabbed')).toBe('line one\nline two\ttabbed');
    expect(escapeHtml('plain text 123 /path?query=1#frag')).toBe('plain text 123 /path?query=1#frag');
  });
});
