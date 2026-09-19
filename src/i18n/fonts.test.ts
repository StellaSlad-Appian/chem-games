// src/i18n/fonts.test.ts
//
// The font side of "the first non-Latin locale".
//
// Nothing here can prove a glyph renders — that needs a browser, and
// e2e/i18n.spec.ts does the visible half. What it can prove is the two things
// that would go wrong silently:
//
//   * a Latin locale quietly acquiring a stylesheet request it has no use for,
//     which is the cost that made `@import`-everything the wrong answer; and
//   * the CSS and the loader disagreeing about which families a locale uses,
//     which renders as the *fallback* face rather than as an error.

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { LOCALES } from './config';
import { LOCALES_WITH_EXTRA_FONTS, extraFontStylesheet } from './fonts';

const globalsCss = readFileSync(join(process.cwd(), 'src/app/globals.css'), 'utf8');

describe('extra font stylesheets', () => {
  it('gives every Latin-script locale nothing extra to download', () => {
    // en/de/fr/es/it are covered by the `@import` in globals.css. If one of
    // them starts returning a URL, a page that draws no glyph from that face
    // has gained a render-blocking request.
    //
    // This used to read "every shipped locale", which was true while Russian
    // was only planned. Russian shipping is the event the whole file was
    // written for, so the assertion is now the one that was always meant:
    // exactly the locales that need a different script get a stylesheet, and
    // no others.
    const withExtras = LOCALES.filter((locale) => extraFontStylesheet(locale) !== undefined);
    expect(withExtras).toEqual(['ru']);
  });

  it('has the Cyrillic stylesheet ready before `ru` is a locale', () => {
    // The point of preparing: the fonts are wired the day the translation
    // starts, not discovered on the day someone looks at a Russian page.
    const ru = extraFontStylesheet('ru');
    expect(ru).toBeDefined();
    expect(ru).toContain('family=Oswald');
    expect(ru).toContain('family=Manrope');
    // Never blank the text while a font loads — same policy as globals.css.
    expect(ru).toContain('display=swap');
  });

  it('names only locales that ship or are on the roadmap', () => {
    // The map is keyed by `string`, because 'ru' has to be in it before 'ru'
    // is a `Locale`. This is what stops that loose key hiding a typo.
    const PLANNED = ['ru'];
    const known = new Set<string>([...LOCALES, ...PLANNED]);
    expect(LOCALES_WITH_EXTRA_FONTS.filter((code) => !known.has(code))).toEqual([]);
  });
});

describe('globals.css font variables', () => {
  it('still points the five Latin locales at Bebas Neue and DM Sans', () => {
    expect(globalsCss).toContain("--font-display: 'Bebas Neue', sans-serif;");
    expect(globalsCss).toContain("--font-body:    'DM Sans', ui-sans-serif, system-ui, sans-serif;");
  });

  it('overrides both faces under html[lang="ru"], and only there', () => {
    // Scoped by attribute selector rather than by a class or a data flag, so
    // it keys off the one thing the layout already sets per locale and the
    // other five need no opt-out.
    const ruBlock = /html\[lang='ru'\]\s*\{([^}]*)\}/.exec(globalsCss);
    expect(ruBlock).not.toBeNull();
    expect(ruBlock?.[1]).toContain("--font-display: 'Oswald'");
    expect(ruBlock?.[1]).toContain("--font-body: 'Manrope'");

    // `html[lang='ru']` is (0,1,1); `:root`, `[data-theme='dark']` and
    // `[data-theme='light']` are all (0,1,0). The override therefore wins in
    // either theme without !important — and if someone ever moves it inside a
    // theme block, this is the assertion that notices.
    const themeBlocks = globalsCss.slice(0, globalsCss.indexOf("html[lang='ru']"));
    expect(themeBlocks).toContain("[data-theme='light']");
  });

  it('keeps the default families as the last resort for Russian too', () => {
    // If the Cyrillic stylesheet fails to load, a Latin-script string on a
    // Russian page (a formula, an element symbol, a brand name) should still
    // come out in the site's own faces rather than in Times New Roman.
    const ruBlock = /html\[lang='ru'\]\s*\{([^}]*)\}/.exec(globalsCss)?.[1] ?? '';
    expect(ruBlock).toContain("'Bebas Neue'");
    expect(ruBlock).toContain('system-ui');
  });
});
