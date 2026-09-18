// src/i18n/dictionary.test.ts
//
// The automated quality gate for the shared UI dictionary. The five parity
// checks themselves live in src/test-utils/i18n-parity.ts, because the game
// message catalogues need exactly the same ones — see game-messages.test.ts.
//
// What is here is what is specific to the dictionary: the allowlist of strings
// that are identical in both languages on purpose, the placeholder-syntax rule,
// and the assertion that the dictionary has stayed UI-sized.

import { describe, expect, it } from 'vitest';
import { en } from './dictionaries/en';
import { de } from './dictionaries/de';
import { DEFAULT_LOCALE, LOCALES, type Locale } from './config';
import { describeTranslationParity, flatten } from '@/test-utils/i18n-parity';

const dictionaries: Record<Locale, unknown> = { en, de };
const translations = Object.fromEntries(
  LOCALES.filter((locale) => locale !== DEFAULT_LOCALE).map((locale) => [
    locale,
    dictionaries[locale],
  ])
);

/**
 * Keys whose translation is legitimately identical to the English.
 *
 * Every entry here is a deliberate decision, not an oversight, and the test
 * fails if one of them stops being identical — so the list cannot quietly rot
 * into a way of silencing the check.
 */
const IDENTICAL_BY_DESIGN: Record<string, RegExp[]> = {
  de: [
    // Brand, product and company names.
    /^meta\.siteName$/,
    /^feedback\.(trigger|heading)$/,
    /^privacy\.collectFeedbackLabel$/,
    /^privacy\.processor(Supabase|Resend|Google)Label$/,
    // Loanwords German uses unchanged.
    /^settings\.audio$/,
    /^leaderboards\.highScore$/,
    /^games\.shared\.(level|levelValue)$/,
    /^games\.overlay\.statLevel$/,
    /^games\.shared\.touchscreen$/,
    /^profile\.alias$/,
    // Chemistry terms that are the same word in both languages.
    /^chemistry\.(base|neutral)$/,
    // "OH⁻ (Base)" — the ion notation and the word "Base" are both unchanged.
    /^games\.neutralise\.keyTwoIon$/,
    // Keyboard glyphs and single digits used as <kbd> labels. The first column
    // of an instructions key table is the physical key, so it never translates;
    // the second column, which says what the key does, always does.
    /^games\.neutralise\.(keyOneLabel|keyTwoLabel|keyArrowsLabel)$/,
    // Keyword lists are chosen per language, not translated; the German list
    // happens to be entirely different, so nothing is exempted here — this
    // entry exists to document that `meta.keywords` is intentionally NOT
    // compared as a translation of the English list.
  ],
};

describeTranslationParity('dictionary', {
  source: en,
  translations,
  identicalByDesign: IDENTICAL_BY_DESIGN,
});

describe('dictionary shape', () => {
  it('covers every locale in LOCALES', () => {
    expect(Object.keys(dictionaries).sort()).toEqual([...LOCALES].sort());
  });

  it('uses no placeholder syntax other than {name}', () => {
    // `${}` or `%s` would silently render as literal text.
    const suspicious = flatten(en)
      .filter((entry) => /\$\{|%[sd]\b|\{\{/.test(entry.value))
      .map((entry) => entry.path);
    expect(suspicious).toEqual([]);
  });

  it('holds no per-game copy beyond what shared components read', () => {
    // The root layout hands the whole dictionary to I18nProvider, so every byte
    // here is serialized into the RSC payload of *every* page — including pages
    // with no game on them. A game's own copy belongs in its catalogue under
    // src/i18n/game-messages/ (docs/i18n/GAMES.md § Catalogue layout).
    //
    // `games.shared` and `games.overlay` stay: shared components read them and
    // a per-game copy would duplicate them. The three older games' namespaces
    // are a follow-up (README § What goes where), not an invitation to add a
    // fourth.
    const ALLOWED = new Set([
      'shared',
      'overlay',
      'acidClassification',
      'formulaBlaster',
      'neutralise',
    ]);

    expect(Object.keys(en.games).filter((key) => !ALLOWED.has(key))).toEqual([]);
  });
});
