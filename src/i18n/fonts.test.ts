// src/i18n/fonts.test.ts
//
// One typeface, self-hosted, for every locale.
//
// The site used to load Bebas Neue and DM Sans with an `@import` from
// fonts.googleapis.com, and a second stylesheet (Oswald and Manrope) for
// Russian only, because neither Latin face had Cyrillic. Nunito has, so all of
// that went, and next/font now serves it from this origin.
//
// Nothing here can prove a glyph renders — that needs a browser, and
// e2e/i18n.spec.ts does the visible half. What this can prove is the two
// regressions that would go unnoticed:
//
//   * a web font request to a third party creeping back in, which sends every
//     reader's IP address to that party on every page load; and
//   * the CSS and the loader disagreeing about the variable name, which renders
//     as the *fallback* face rather than as an error.

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const read = (path: string) => readFileSync(join(process.cwd(), path), 'utf8');
const globalsCss = read('src/app/globals.css');
const rootLayout = read('src/app/[lang]/layout.tsx');

describe('the site typeface', () => {
  it('is loaded by next/font in the root layout and exposed as --font-nunito', () => {
    expect(rootLayout).toMatch(/import \{ Nunito \} from 'next\/font\/google'/);
    expect(rootLayout).toContain("variable: '--font-nunito'");
    // On <html>, so the variable is defined on the same element as `:root`,
    // where globals.css reads it.
    expect(rootLayout).toMatch(/<html [^>]*className=\{nunito\.variable\}/);
  });

  it('is what both font tokens resolve to, with a system fallback', () => {
    expect(globalsCss).toContain(
      '--font-body:    var(--font-nunito), ui-sans-serif, system-ui, sans-serif;'
    );
    expect(globalsCss).toContain('--font-display: var(--font-body);');
  });

  it('is the same face in every locale: no per-language override', () => {
    // Russian used to re-point both tokens under `html[lang='ru']`. Nunito
    // ships Cyrillic, so any such block now would only make one locale drift.
    expect(globalsCss).not.toMatch(/html\[lang=/);
  });

  it('is not overridden by the light theme', () => {
    // `[data-theme='light']` comes after `:root`, where the font tokens live,
    // so a font variable in it would win in light mode only.
    const lightBlock = /\[data-theme='light'\]\s*\{([^}]*)\}/.exec(globalsCss);
    expect(lightBlock).not.toBeNull();
    expect(lightBlock?.[1]).not.toContain('--font-');
  });
});

describe('third-party font requests', () => {
  it('never loads a font stylesheet from Google, anywhere in src', () => {
    // next/font downloads the files at build time. A runtime request to
    // fonts.googleapis.com or fonts.gstatic.com would hand the reader's IP
    // address to Google, which the privacy page does not list — and which a
    // German court has held to need consent (LG München I, 3 O 17493/20).
    // Matches a URL, not a mention: comments naming the domain are fine.
    const offenders = readdirSync(join(process.cwd(), 'src'), { recursive: true, encoding: 'utf8' })
      .filter((file) => /\.(css|tsx?|mts)$/.test(file) && !file.endsWith('fonts.test.ts'))
      .filter((file) => /https?:\/\/fonts\.(googleapis|gstatic)\.com/.test(read(join('src', file))));
    expect(offenders).toEqual([]);
  });
});
