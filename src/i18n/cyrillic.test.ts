// src/i18n/cyrillic.test.ts
//
// The Russian-specific gates: is the copy actually in Cyrillic, and is it
// typeset the way Russian is typeset?
//
// Russian does not exist yet, so this file does two things at once. It runs
// every check against a **fixture** that contains each mistake deliberately,
// which proves the checks work today rather than the day they first matter.
// And it runs the same checks against `RUSSIAN_SOURCES`, which is empty now
// and filled by the Russian pass — with a tripwire that fails if 'ru' joins
// LOCALES and this file was not updated.
//
// The checks themselves are in src/test-utils/i18n-russian.ts. See its header
// for why they exist: the parity gates catch a string left byte-identical to
// the English and cannot catch one that was edited slightly and left in
// English, which is the commoner mistake and the one all three of this site's
// shipped untranslated-English bugs were.

import { describe, expect, it } from 'vitest';
import { LOCALES } from './config';
import {
  describeFinding,
  latinRunsIn,
  stringsWithoutCyrillic,
  typographyFindings,
} from '@/test-utils/i18n-russian';

/**
 * The Russian sources, once they exist.
 *
 * The Russian pass fills this in at the same time as it adds the files:
 *
 *   import { ru } from './dictionaries/ru';
 *   import { ru as balancerRu } from './game-messages/reaction-balancer/ru';
 *   import { ru as lewisRu } from './game-messages/lewis-structures/ru';
 *
 *   const RUSSIAN_SOURCES: Record<string, unknown> = {
 *     dictionary: ru,
 *     'reaction-balancer': balancerRu,
 *     'lewis-structures': lewisRu,
 *   };
 */
const RUSSIAN_SOURCES: Record<string, unknown> = {};

/**
 * Keys whose Russian is legitimately Latin, mirroring the
 * `IDENTICAL_BY_DESIGN` pattern in dictionary.test.ts: explicit, per-key and
 * commented, never a broad pattern.
 *
 * The categories that will genuinely qualify, and nothing else:
 *
 *   * **Chemical formulae and element symbols.** `H2O`, `NaOH`,
 *     `(s) (l) (g) (aq)`, `pH`. Russian chemistry writes formulae in Latin
 *     exactly as English does. Element *names* are Cyrillic (кислород) — only
 *     the symbols are not.
 *   * **Brand and company names.** ChemGames, Supabase, Resend, Google.
 *   * **Keyboard glyphs.** The first column of an instructions key table is
 *     the physical key: `Tab`, `H`, `P`.
 *   * **Loanwords Russian writes in Latin.** Much rarer than in Italian or
 *     German: Russian transliterates almost everything (пароль, not
 *     "Password"), so an entry here needs a real argument behind it.
 *
 * Empty until the files land. Inventing exemptions for strings that do not
 * exist is how an allowlist turns into a way of switching the gate off.
 */
const LATIN_BY_DESIGN: RegExp[] = [];

const allowed = (path: string) => LATIN_BY_DESIGN.some((pattern) => pattern.test(path));
const sourceNames = Object.keys(RUSSIAN_SOURCES);

describe('Russian gates', () => {
  it('activate when ru is added to LOCALES', () => {
    // The tripwire. Without it these gates stay silently empty forever, which
    // is the failure mode of every test written ahead of its subject.
    const shipped = (LOCALES as readonly string[]).includes('ru');
    const problem =
      shipped && sourceNames.length === 0
        ? "'ru' is in LOCALES but RUSSIAN_SOURCES is empty — import the three ru files at the top of src/i18n/cyrillic.test.ts"
        : null;
    expect(problem).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// The checks, proven against a fixture
// ---------------------------------------------------------------------------

describe('the Cyrillic and typography checks themselves', () => {
  // A miniature Russian catalogue with one instance of each mistake, so every
  // gate below has been seen to fail at least once. Without this the whole
  // file is an assertion that `[] === []`.
  const BAD = {
    untranslated: 'Reaction Balancer',
    halfTranslated: 'Уровень 3 из 5 • 12 correct',
    straightQuotes: 'Нажми "Далее", чтобы продолжить.',
    englishQuotes: 'Нажми “Далее”, чтобы продолжить.',
    dottedEllipsis: 'Подожди...',
    foldedYo: 'заряженная частица',
    foldedSolid: 'твердый осадок',
    foldedParticiple: 'приведенный пример',
    decimalPoint: 'pH равен 1.5',
  };

  const GOOD = {
    plain: 'Каждая строка совпадает. Масса сохраняется.',
    guillemets: 'Нажми «Далее», чтобы продолжить.',
    ellipsis: 'Подожди…',
    yo: 'заряжённая частица',
    solid: 'твёрдый осадок',
    participle: 'приведённый пример',
    decimalComma: 'pH равен 1,5',
    // Two-letter Latin runs stay legal: element symbols and pH.
    symbol: 'Натрий (Na) реагирует с водой.',
    ph: 'Измерь pH раствора.',
    // A real formula. Three-plus Latin letters, so the Russian pass will have
    // to allowlist the keys that carry one — which is the point of making the
    // allowlist explicit rather than a pattern.
    formula: 'Формула — NaOH.',
  };

  const paths = (findings: { path: string }[]) => findings.map((f) => f.path).sort();

  it('finds a string with no Cyrillic in it', () => {
    expect(paths(stringsWithoutCyrillic(BAD))).toEqual(['untranslated']);
    expect(stringsWithoutCyrillic(GOOD)).toEqual([]);
  });

  it('finds a half-translated string that the Cyrillic check passes', () => {
    // The case the presence check cannot see: the string has Cyrillic in it
    // and is still wrong. This is `games.overlay.statRoundValue` with its
    // English tail left on.
    expect(stringsWithoutCyrillic({ x: BAD.halfTranslated })).toEqual([]);
    expect(paths(latinRunsIn(BAD))).toEqual(['halfTranslated', 'untranslated']);
  });

  it('does NOT catch a one- or two-letter English word — a known limit', () => {
    // Pinned, not fixed. The Latin-run floor is three letters so that element
    // symbols, state symbols and pH need no allowlist entry, and the cost is
    // that "Уровень 3 of 5" reads as clean. Stated here so nobody assumes
    // coverage this gate does not have; see i18n-russian.ts § LATIN_RUN.
    //
    // If this ever starts failing, the floor was lowered — check that the
    // formula and state-symbol keys got allowlisted at the same time.
    expect(latinRunsIn({ x: 'Уровень 3 of 5' })).toEqual([]);
  });

  it('lets an element symbol and pH through, and stops a formula', () => {
    // Two Latin letters or fewer is deliberate: it covers Na, He, Mg and pH
    // without an allowlist entry each.
    expect(latinRunsIn({ a: GOOD.symbol, b: GOOD.ph })).toEqual([]);
    expect(paths(latinRunsIn({ c: GOOD.formula }))).toEqual(['c']);
  });

  it('finds every typography mistake', () => {
    expect(paths(typographyFindings(BAD))).toEqual([
      'decimalPoint',
      'dottedEllipsis',
      'englishQuotes',
      'foldedParticiple',
      'foldedSolid',
      'foldedYo',
      'straightQuotes',
      // "Reaction Balancer" has no typography fault; it fails the Cyrillic
      // check instead. Listing what is *absent* here is as much the point as
      // listing what is present.
    ]);
  });

  it('passes correctly typeset Russian', () => {
    expect(typographyFindings(GOOD)).toEqual([]);
  });

  it('does not mistake a formula subscript for a decimal', () => {
    // The decimal check has to ignore anything that follows a Latin letter,
    // or `H2O` and every version number in the copy would fail it.
    expect(typographyFindings({ a: 'Вода — H2O.', b: 'Версия v1.2' })).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// The same checks, against the real files
// ---------------------------------------------------------------------------

describe.each(sourceNames)('%s: Russian copy', (source) => {
  const tree = RUSSIAN_SOURCES[source];

  it('is in Cyrillic', () => {
    const findings = stringsWithoutCyrillic(tree).filter((f) => !allowed(f.path));
    expect(findings.map(describeFinding)).toEqual([]);
  });

  it('has no run of Latin letters outside a formula or a brand name', () => {
    const findings = latinRunsIn(tree).filter((f) => !allowed(f.path));
    expect(findings.map(describeFinding)).toEqual([]);
  });

  it('is typeset as Russian', () => {
    const findings = typographyFindings(tree).filter((f) => !allowed(f.path));
    expect(findings.map(describeFinding)).toEqual([]);
  });
});
