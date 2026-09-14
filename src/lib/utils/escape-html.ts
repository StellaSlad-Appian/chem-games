// src/lib/utils/escape-html.ts
//
// Minimal HTML escaping for values interpolated into server-rendered HTML
// strings (for example the feedback notification email). React escapes JSX
// automatically; this is for the places where we build markup by hand.

const HTML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

const HTML_ESCAPE_PATTERN = /[&<>"']/g;

export function escapeHtml(value: string): string {
  return value.replace(HTML_ESCAPE_PATTERN, (char) => HTML_ESCAPES[char]);
}
