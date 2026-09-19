// src/i18n/teachers.test.ts
//
// The quality gate for the For Teachers catalogue, which holds every sentence
// on the site's only adults-facing page.
//
// It gets the same parity checks as the shared dictionary and the game
// catalogues — empty values, strings left identical to the English, dropped
// placeholders, formulae altered in translation — from
// src/test-utils/i18n-parity.ts. Moving the copy out of the dictionary must not
// move it out of the gates; that is the whole reason the helper is shared.
//
// On top of that: a loader that must cover every locale in LOCALES, and the
// one thing this page can get wrong that no other page can — naming the year
// band with a term that means ages 16–19.

import { describe, expect, it } from 'vitest';
import { LOCALES } from './config';
import { teachersCopy, TEACHERS_EN } from './teachers';
import { de } from './teachers/de';
import { fr } from './teachers/fr';
import { es } from './teachers/es';
// `it` is vitest's test function here, so the Italian catalogue is aliased.
import { it as itTeachers } from './teachers/it';
import { ru } from './teachers/ru';
import { describeTranslationParity, flatten } from '@/test-utils/i18n-parity';

/**
 * Keys whose translation is legitimately identical to the English.
 *
 * Empty on purpose, and worth stating: this page's copy is continuous prose
 * with no key tables, no bare placeholders and no loanword labels, so nothing
 * in it has a defensible reason to come through untranslated. If an entry ever
 * needs to go here it needs a sentence saying why, like the ones in
 * game-messages.test.ts.
 */
const IDENTICAL_BY_DESIGN: Record<string, RegExp[]> = {
  // `formOptional` is the word beside every field the sign-up form does not
  // require. German borrowed it whole: *optional* is the ordinary German
  // adjective, it is what a German form says, and the alternatives
  // (*freiwillig*, *fakultativ*) are respectively about volunteering and
  // about school subjects. Identical because the language is, not because
  // anybody skipped it — the other four locales each have their own word
  // (facultatif / opcional / facoltativo / необязательно).
  de: [/^formOptional$/],
};

describeTranslationParity('teachers catalogue', {
  source: TEACHERS_EN,
  translations: { de, fr, es, it: itTeachers, ru },
  identicalByDesign: IDENTICAL_BY_DESIGN,
});

describe('teachers catalogue loader', () => {
  it('has a catalogue for every locale in LOCALES', () => {
    // Adding a locale must break here until its file exists.
    for (const locale of LOCALES) {
      expect(() => teachersCopy(locale)).not.toThrow();
      expect(teachersCopy(locale)).toBeTruthy();
    }
  });

  it('serves English for `en` and something else for every other locale', () => {
    expect(teachersCopy('en')).toBe(TEACHERS_EN);
    for (const locale of LOCALES.filter((l) => l !== 'en')) {
      expect(teachersCopy(locale)).not.toBe(TEACHERS_EN);
    }
  });

  it('throws rather than falling back to English for a locale it has no file for', () => {
    // A silent fallback is how a half-translated page ships unnoticed.
    expect(() => teachersCopy('xx' as never)).toThrow(/catalogue/i);
  });
});

describe('year band', () => {
  /**
   * The site is Year 9–10, ages 14–16. Each of these words names ages 16–19 in
   * its own country, and the German one was already shipped wrong once in
   * meta.keywords and corrected (src/i18n/review-notes.ts). This page talks
   * about the year band more than any other, to an audience that would notice,
   * so the mistake gets a test rather than a comment.
   */
  const WRONG_BAND: Record<string, RegExp> = {
    de: /Oberstufe/i,
    fr: /lyc[ée]e/i,
    es: /bachillerato/i,
    it: /\bliceo\b/i,
    // «Старшие классы» is 10–11 класс, ages 16–18: the Russian name for
    // exactly the band the other four patterns catch. This site is 8–9 класс.
    // Note the lookaround rather than a `\b` — `\b` is defined against
    // [A-Za-z0-9_], so it never matches at a Cyrillic boundary. That is the
    // same trap the glossary matcher and the ё gate each hit once.
    ru: /(?<!\p{L})старш\p{L}*\s+класс|10–11\s*класс/iu,
  };

  const CATALOGUES: Record<string, unknown> = { de, fr, es, it: itTeachers, ru };

  it.each(Object.keys(WRONG_BAND))('does not name the 16–19 band in %s', (locale) => {
    const offenders = flatten(CATALOGUES[locale])
      .filter((entry) => WRONG_BAND[locale].test(entry.value))
      .map((entry) => entry.path);

    expect(offenders).toEqual([]);
  });
});
