// src/i18n/game-messages.test.ts
//
// The quality gate for the per-game message catalogues, which hold every
// player-facing sentence for Reaction Balancer and Share to Fill.
//
// They get the same five checks as the shared dictionary — empty values,
// strings left identical to the English, dropped placeholders, plural forms,
// formulae altered in translation — from src/test-utils/i18n-parity.ts. Moving
// the copy out of the dictionary must not move it out of the gates.
//
// On top of that, two things only a catalogue has: a loader that must cover
// every locale in LOCALES, and a glossary whose match words have to be findable
// by a JavaScript `\b`.

import { describe, expect, it } from 'vitest';
import { LOCALES } from './config';
import { REACTION_BALANCER_MESSAGES } from '@/core-engine/config/games/reaction-balancer-messages';
import { LEWIS_STRUCTURES_MESSAGES } from '@/core-engine/config/games/lewis-structures-messages';
import { gameMessages as balancerMessagesFor } from './game-messages/reaction-balancer';
import { gameMessages as lewisMessagesFor } from './game-messages/lewis-structures';
import { de as balancerDe } from './game-messages/reaction-balancer/de';
import { de as lewisDe } from './game-messages/lewis-structures/de';
import { fr as balancerFr } from './game-messages/reaction-balancer/fr';
import { fr as lewisFr } from './game-messages/lewis-structures/fr';
import { describeTranslationParity, flatten } from '@/test-utils/i18n-parity';

/**
 * Keys whose translation is legitimately identical to the English. Carried over
 * from the dictionary's allowlist when this copy moved; every entry is still
 * asserted, so it cannot rot into a way of silencing the check.
 */
const BALANCER_IDENTICAL_BY_DESIGN = {
  de: [
    // "Coach" and "Challenge" are established German gaming loanwords, and both
    // name a thing in the game, so they read the same way in both languages.
    /^coach\.label$/,
    /^challenge\.label$/,
    /^header\.challengeProgress$/,
    // The first column of an instructions key table is the physical key, so it
    // never translates; the second column, which says what the key does, always
    // does.
    /^instructions\.keyboard\[\d+\]\[0\]$/,
    // Strings whose whole visible content is placeholders, punctuation or
    // international notation: there is nothing in them to translate.
    /^success\.points$/,
    /^challenge\.tileA11y$/,
    /^glossary\.stateSymbols\.term$/,
  ],
  fr: [
    // "Coach" is an established French loanword and names a thing in the
    // game, so it reads the same way in both languages. "Challenge" is not:
    // French has « Défi » and uses it, so challenge.label is a real
    // translation here where the German one was not.
    /^coach\.label$/,
    /^instructions\.keyboard\[\d+\]\[0\]$/,
    /^success\.points$/,
    /^challenge\.tileA11y$/,
    /^glossary\.stateSymbols\.term$/,
    // "coefficient" is spelled identically in French and English, so the
    // glossary term and both of its match words coincide. This is the
    // distinction the whole game teaches, so it is worth being explicit
    // that the French really is "coefficient" and not an oversight.
    /^glossary\.coefficient\.(term|matches\[\d+\])$/,
    // "Points" as a column heading.
    /^notebook\.columnPoints$/,
  ],
};

const LEWIS_IDENTICAL_BY_DESIGN = {
  de: [
    /^coach\.label$/,
    /^instructions\.keyboard\[\d+\]\[0\]$/,
    /^success\.points$/,
    /^overlay\.levelUpDescription$/,
    /^notebook\.diagnosisRow$/,
    /^ui\.atomOrdinal$/,
  ],
  fr: [
    /^coach\.label$/,
    /^instructions\.keyboard\[\d+\]\[0\]$/,
    /^success\.points$/,
    /^notebook\.diagnosisRow$/,
    /^ui\.atomOrdinal$/,
    // "octet", "duet" and "point(s)" are the same words in French. The
    // duet in particular is worth noting: German had to coin one, while
    // French school chemistry already teaches « la règle du duet ».
    /^glossary\.(octet|duet)\.(term|matches\[\d+\])$/,
    /^glossary\.dot\.matches\[\d+\]$/,
  ],
};

describeTranslationParity('reaction-balancer catalogue', {
  source: REACTION_BALANCER_MESSAGES,
  translations: { de: balancerDe, fr: balancerFr },
  identicalByDesign: BALANCER_IDENTICAL_BY_DESIGN,
});

describeTranslationParity('lewis-structures catalogue', {
  source: LEWIS_STRUCTURES_MESSAGES,
  translations: { de: lewisDe, fr: lewisFr },
  identicalByDesign: LEWIS_IDENTICAL_BY_DESIGN,
});

/**
 * The catalogues are two unrelated shapes, so these walk them structurally.
 * Every key they name is asserted to exist by the parity block above.
 */
type GlossaryEntry = { term: string; definition: string; matches: readonly string[] };
const glossaryOf = (catalogue: unknown): Record<string, GlossaryEntry> =>
  (catalogue as { glossary: Record<string, GlossaryEntry> }).glossary;

const GAMES = [
  {
    slug: 'reaction-balancer',
    load: balancerMessagesFor as (locale: string) => unknown,
    english: REACTION_BALANCER_MESSAGES as unknown,
  },
  {
    slug: 'lewis-structures',
    load: lewisMessagesFor as (locale: string) => unknown,
    english: LEWIS_STRUCTURES_MESSAGES as unknown,
  },
] as const;

describe.each(GAMES)('$slug catalogue loader', ({ load, english }) => {
  it('has a catalogue for every locale in LOCALES', () => {
    // A game that plays in English only is not done — docs/i18n/GAMES.md § The
    // rule. Adding a locale must break here until its file exists.
    for (const locale of LOCALES) {
      expect(() => load(locale)).not.toThrow();
      expect(load(locale)).toBeTruthy();
    }
  });

  it('serves English for `en` and something else for every other locale', () => {
    expect(load('en')).toBe(english);
    for (const locale of LOCALES.filter((l) => l !== 'en')) {
      expect(load(locale)).not.toBe(english);
    }
  });

  it('throws rather than falling back to English for a locale it has no file for', () => {
    // A silent fallback is how a half-translated game ships unnoticed.
    // 'xx' rather than a real language code: this used to say 'fr', which
    // stopped being a locale-with-no-file the moment French shipped. A code
    // that is not in the Phase 2 roadmap cannot be overtaken the same way.
    expect(() => load('xx')).toThrow(/catalogue/i);
  });
});

describe.each(GAMES)('$slug glossary match words', ({ load }) => {
  it.each([...LOCALES])(
    'start and end with an ASCII letter in %s, so the matcher can find them',
    (locale) => {
      // GlossaryTerm.tsx finds a term with a JavaScript `\b`, which only knows
      // ASCII letters: a word that begins with "Ä" or ends with "ß" would never
      // match, and the tap-to-explain chip would silently never appear.
      // Umlauts *inside* a word are fine — see docs/i18n/glossary-de.md.
      const offenders = Object.entries(glossaryOf(load(locale))).flatMap(([key, entry]) =>
        entry.matches
          .filter((word) => !/^[A-Za-z].*[A-Za-z]$/.test(word))
          .map((word) => `${key}: "${word}"`)
      );

      expect(offenders).toEqual([]);
    }
  );

  it.each([...LOCALES].filter((locale) => locale !== 'en'))(
    'cover the %s running text wherever the English list covers the English text',
    (locale) => {
      // The point of `matches` is that a word in running text becomes a
      // tap-to-explain chip. Each locale writes its own inflections, so a term
      // that is linked in the English copy and unlinked in the translation is
      // the failure mode: the German sentence uses a form the German match list
      // does not have. Terms that are only listed in the glossary panel and
      // never written in running text (octet, duet) are linked in neither, and
      // are not what this is looking for.
      const missing = Object.keys(glossaryOf(load('en'))).filter(
        (key) => linksInRunningText('en', key) && !linksInRunningText(locale, key)
      );

      expect(missing).toEqual([]);
    }
  );

  /** Whether this locale's copy, outside the glossary itself, uses one of the term's match words. */
  function linksInRunningText(locale: string, key: string): boolean {
    const catalogue = load(locale);
    const entry = glossaryOf(catalogue)[key];
    const runningText = flatten(catalogue)
      .filter((line) => !line.path.startsWith('glossary.'))
      .map((line) => line.value)
      .join('\n');

    return entry.matches.some((word) =>
      new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(runningText)
    );
  }
});
