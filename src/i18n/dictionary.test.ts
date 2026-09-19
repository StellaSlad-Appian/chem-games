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
import { fr } from './dictionaries/fr';
import { es } from './dictionaries/es';
// `it` is vitest's test function here, so the dictionary is aliased.
import { it as itDictionary } from './dictionaries/it';
import { ru } from './dictionaries/ru';
import { DEFAULT_LOCALE, LOCALES, type Locale } from './config';
import {
  describePluralCompleteness,
  describeTranslationParity,
  flatten,
} from '@/test-utils/i18n-parity';

const dictionaries: Record<Locale, unknown> = { en, de, fr, es, it: itDictionary, ru };
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
    // A placeholder and a colon: German punctuates this exactly as English
    // does. French is why the string exists at all — it needs a no-break
    // space before the colon.
    /^cheatSheets\.exampleLabel$/,
    // Keyboard glyphs and single digits used as <kbd> labels. The first column
    // of an instructions key table is the physical key, so it never translates;
    // the second column, which says what the key does, always does.
    /^games\.neutralise\.(keyOneLabel|keyTwoLabel|keyArrowsLabel)$/,
    // Keyword lists are chosen per language, not translated; the German list
    // happens to be entirely different, so nothing is exempted here — this
    // entry exists to document that `meta.keywords` is intentionally NOT
    // compared as a translation of the English list.
  ],
  fr: [
    // Brand, product and company names.
    /^meta\.siteName$/,
    /^privacy\.processor(Supabase|Resend|Google)Label$/,
    // Words French spells exactly as English does.
    /^settings\.audio$/,
    /^profile\.alias$/,
    /^leaderboards\.points$/,
    /^games\.(shared\.score|overlay\.statScore)$/,
    // Chemistry terms that are the same word in both languages. Note that
    // French, unlike German, does translate "neutral" (neutre) — only "base"
    // coincides.
    /^chemistry\.base$/,
    // A category label that is the same word in both languages.
    /^cheatSheetCategories\.Nomenclature$/,
    // "Sources" is the French word for sources. Reaching for "Références" only
    // to make the two differ would name something slightly else — the section
    // lists where the entry's facts came from, not a bibliography.
    /^explore\.sourcesHeading$/,
    // Keyboard glyphs and single digits used as <kbd> labels. The first column
    // of an instructions key table is the physical key, so it never translates;
    // the second column, which says what the key does, always does.
    /^games\.neutralise\.(keyOneLabel|keyTwoLabel|keyArrowsLabel)$/,
    // As for German, `meta.keywords` is deliberately NOT exempted: the French
    // list is chosen for French search behaviour rather than translated, and it
    // happens to share no entry with the English one.
  ],
  es: [
    // Brand, product and company names.
    /^meta\.siteName$/,
    /^privacy\.processor(Supabase|Resend|Google)Label$/,
    // Words Spanish spells exactly as English does. "Idea" is the natural
    // Spanish for the feature-request category and is genuinely the same word;
    // the alternative (*Sugerencia*) would only have been chosen to dodge this
    // check, which is the one thing this allowlist exists to prevent.
    /^settings\.audio$/,
    /^profile\.alias$/,
    /^feedback\.categoryFeature$/,
    // Chemistry terms that are the same word in both languages. Note that
    // Spanish, like French and unlike German, does translate "neutral"
    // (neutro) — only "base" coincides.
    /^chemistry\.base$/,
    // A placeholder and a colon. Spanish punctuates this exactly as English
    // does — no space before the colon — so the two coincide. The key exists
    // only because French needs a no-break space there.
    /^cheatSheets\.exampleLabel$/,
    // Keyboard glyphs and single digits used as <kbd> labels. The first column
    // of an instructions key table is the physical key, so it never translates;
    // the second column, which says what the key does, always does.
    /^games\.neutralise\.(keyOneLabel|keyTwoLabel|keyArrowsLabel)$/,
    // As for the other two, `meta.keywords` is deliberately NOT exempted: the
    // Spanish list is chosen for Spanish search behaviour rather than
    // translated, and it shares no entry with the English one.
  ],
  it: [
    // Brand, product and company names.
    /^meta\.siteName$/,
    /^privacy\.processor(Supabase|Resend|Google)Label$/,
    // Words Italian spells exactly as English does. "Idea" is the natural
    // Italian for the feature-request category and "Password" is simply what
    // Italian calls a password (*parola d'ordine* is archaic); reaching for
    // *Proposta* or a paraphrase only to dodge this check is the one thing this
    // allowlist exists to prevent.
    /^settings\.audio$/,
    /^profile\.alias$/,
    /^auth\.password$/,
    /^feedback\.categoryFeature$/,
    /^privacy\.collectAccountLabel$/,
    // "Account" is what Italian calls an online account; *conto* is a bank and
    // *utenza* is a utility bill. Same decision, and same reason, as
    // `auth.password` above.
    /^settings\.account$/,
    // *Formula* is the Italian word for a chemical formula — identical to the
    // English by coincidence of Latin, not by omission. `formulaA11y` is the
    // same word inside a screen-reader label whose other two parts are
    // placeholders, so it coincides too.
    /^explore\.formula(Label|A11y)$/,
    // Chemistry terms that are the same word in both languages. Note that
    // Italian, like French and Spanish and unlike German, does translate
    // "neutral" (neutro) — only "base" coincides.
    /^chemistry\.base$/,
    // A placeholder and a colon. Italian punctuates this exactly as English
    // does — no space before the colon — so the two coincide. The key exists
    // only because French needs a no-break space there.
    /^cheatSheets\.exampleLabel$/,
    // Keyboard glyphs and single digits used as <kbd> labels. The first column
    // of an instructions key table is the physical key, so it never translates;
    // the second column, which says what the key does, always does.
    /^games\.neutralise\.(keyOneLabel|keyTwoLabel|keyArrowsLabel)$/,
    // As for the other three, `meta.keywords` is deliberately NOT exempted: the
    // Italian list is chosen for Italian search behaviour rather than
    // translated, and it shares no entry with the English one.
  ],
  ru: [
    // Brand and company names. Russian transliterates almost every loanword
    // (пароль, not "Password"), so these are the only Latin strings in the
    // dictionary — and they are names, not words.
    /^meta\.siteName$/,
    /^privacy\.processor(Supabase|Resend|Google)Label$/,
    // A placeholder and a colon. Russian punctuates this exactly as English
    // does — no space before the colon — so the two coincide. The key exists
    // only because French needs a no-break space there.
    /^cheatSheets\.exampleLabel$/,
    // Keyboard glyphs and single digits used as <kbd> labels. The first column
    // of an instructions key table is the physical key, so it never translates;
    // the second column, which says what the key does, always does.
    /^games\.neutralise\.(keyOneLabel|keyTwoLabel|keyArrowsLabel)$/,
    // Note what is NOT here, because each is a place the other five locales
    // needed an exemption and Russian does not. `settings.audio` is «Звук»;
    // `profile.alias` is «Псевдоним»; `auth.password` is «Пароль»; and
    // `chemistry.base` is **«Основание»**, never *база*, which in Russian
    // means a base of operations or a database. German, French, Spanish and
    // Italian all allowlist `chemistry.base`; Russian is the one locale where
    // it is a real translation, and getting it wrong would be the single most
    // visible chemistry error on the site.
    //
    // As for the other four, `meta.keywords` is deliberately NOT exempted: the
    // Russian list is chosen for Russian search behaviour rather than
    // translated, and it shares no entry with the English one.
  ],
};

describeTranslationParity('dictionary', {
  source: en,
  translations,
  identicalByDesign: IDENTICAL_BY_DESIGN,
});

// English is included deliberately: the source can lose a form as easily as a
// translation can, and a plural record left with only `other` satisfies every
// other gate in the file.
describePluralCompleteness('dictionary', dictionaries);

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

  it('holds no whole-page copy that only one Server Component reads', () => {
    // Same budget, different offender. The For Teachers page's prose lived
    // here briefly and was 8 KB of the German dictionary — a quarter of it —
    // riding along in the RSC payload of every game page for the sake of one
    // page nobody reaches mid-lesson. It now lives in src/i18n/teachers/,
    // loaded by that page alone (README § The dictionary is a budget).
    //
    // What legitimately stays behind is the site-wide part: the footer link
    // renders everywhere, and the metadata is read by generateMetadata.
    expect(Object.keys(en)).not.toContain('teachers');
    expect(en.footer.teachers).toBeTruthy();
    expect(en.meta.teachersTitle).toBeTruthy();
    expect(en.meta.teachersDescription).toBeTruthy();
  });
});
