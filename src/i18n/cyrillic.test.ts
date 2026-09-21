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
import { ru } from './dictionaries/ru';
import { ru as balancerRu } from './game-messages/reaction-balancer/ru';
import { ru as lewisRu } from './game-messages/lewis-structures/ru';
import {
  describeFinding,
  latinRunsIn,
  stringsWithoutCyrillic,
  typographyFindings,
} from '@/test-utils/i18n-russian';

/**
 * The Russian sources.
 *
 * The three that ship to a reader's browser, which is what this file is for.
 * The cheat-sheet and chemistry-name overlays are deliberately **not** here:
 * they are server-only, they are mostly notation, and putting them under the
 * Latin-run rule would mean allowlisting several hundred formula-bearing
 * keys — at which point the allowlist stops being evidence of anything. Their
 * completeness and their untranslatable parts are gated by
 * cheat-sheets.test.ts and chemistry-names.test.ts instead.
 *
 * The For Teachers catalogue (src/i18n/teachers/ru.ts) is **not** here for the
 * same reason plus one of its own. It is server-only, like the two overlays.
 * And its copy names "WCAG 2.2" and "version 1.0 / 2.0": the decimal check
 * below is `(?<![Latin\d])\d+\.\d`, so each of those reads as a decimal point
 * where Russian wants a comma. Admitting the file would mean exempting them,
 * and the exemption is broader than the thing it buys — the decimal gate is
 * the one that catches «pH равен 1.5», which is a real mistake a translator
 * makes. The typography rules are applied by hand in that file instead, and
 * its header says so. Its parity, placeholders and year band are gated by
 * teachers.test.ts.
 */
const RUSSIAN_SOURCES: Record<string, unknown> = {
  dictionary: ru,
  'reaction-balancer': balancerRu,
  'lewis-structures': lewisRu,
};

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
 * Every entry below was found by running the gate, not by guessing, and each
 * falls into one of the categories above. Nothing here is a category the list
 * invented for its own convenience.
 */
const LATIN_BY_DESIGN: RegExp[] = [
  // --- Brand, product and company names ----------------------------------
  // "ChemGames" is the product; it is never translated and never
  // transliterated, so every string that names it carries a Latin run.
  // Supabase, Resend and Google are companies.
  //
  // "Bond Builder" used to be here too, in `overlay.victoryDescription`: the
  // won-game overlay recommended a game that was never written and 404s. The
  // card and the recommendation are both gone, so the Russian line has no
  // Latin in it any more and the entry was removed rather than left standing.
  // An allowlist entry outliving its reason is a hole, not a comment — the
  // next English string to land on that key would pass unnoticed.
  /^meta\.(siteName|title|privacyTitle|privacyDescription|teachersTitle|teachersDescription|cheatSheetTitle|cheatSheetNotFound|exploreEntryNotFound)$/,
  /^footer\.(tagline|copyright)$/,
  /^feedback\.(heading|sentBody)$/,
  /^profile\.dataIntro$/,
  /^auth\.(registerTitle|switchToRegisterPrompt|checkInbox|continueWithGoogle)$/,
  // Also names two dotfiles, which are filenames rather than words.
  /^auth\.unconfiguredNotice$/,
  // whoWeAreBody carries the data controller's own name, which is a person's.
  /^privacy\.(intro|whoWeAreBody|collectAccountBody|cookiesBody1|childrenBody1)$/,
  /^privacy\.processor(Supabase|Resend|Google)(Label|Body)$/,

  // --- An example email address -------------------------------------------
  // `collaboratorEmailInvalid` shows the reader what an address looks like,
  // and an email address is written in Latin in Russian exactly as it is in
  // English — there is no Cyrillic form of one to write instead. The rest of
  // the string is Russian; only the example is not.
  /^serverMessages\.collaboratorEmailInvalid$/,

  // --- A file format and a transport protocol -----------------------------
  // Russian writes both in Latin: «файл JSON», «по HTTPS».
  /^profile\.exportBody$/,
  /^privacy\.processorsTransport$/,

  // --- Australian legal proper nouns --------------------------------------
  // The Privacy Act 1988, the Australian Privacy Principles and the OAIC keep
  // their English names by policy — the same decision the privacy page itself
  // records and the Latin-leakage e2e gate allowlists. Translating the name of
  // a statute makes it impossible to look up.
  /^privacy\.legalBody[12]$/,

  // --- Keyboard glyphs ----------------------------------------------------
  // The legend printed on a physical key, which is Latin on every keyboard a
  // Russian reader owns. The first column of an instructions key table is
  // always the key; the second column, which says what it does, is Russian.
  /^games\.neutralise\.(keyOneLabel|keyTwoLabel|keyArrowsLabel)$/,
  /^games\.overlay\.keyHint(Resume|Retry)$/,
  /^instructions\.keyboard\[\d+\]\[0\]$/,
  // Same decision, in a sentence rather than a table cell: the periodic
  // table's keyboard hint names Home, End, Page Up, Page Down and Enter, and
  // those are the legends printed on the keys of every keyboard a Russian
  // reader owns. The rest of the sentence is Russian.
  /^periodicTable\.keyboardHint$/,

  // --- Pure notation, with no words in it ---------------------------------
  // Strings whose entire visible content is placeholders, punctuation or
  // international notation. There is nothing in them that could be Cyrillic,
  // and each is already recorded as identical-by-design in dictionary.test.ts
  // or game-messages.test.ts for exactly the same reason.
  /^cheatSheets\.exampleLabel$/,
  /^success\.points$/,
  /^challenge\.tileA11y$/,
  /^glossary\.stateSymbols\.term$/,
  /^notebook\.diagnosisRow$/,
  /^ui\.atomOrdinal$/,
  // An em dash: the periodic table's shared "no value here" badge, printed in
  // the cells of the three modes that have one. There is no Russian in it to
  // write, and dictionary.test.ts records it as identical-by-design for the
  // same reason.
  /^periodicTable\.badge\.none$/,

  // Note what is NOT here. No formula-bearing string needed an entry: Russian
  // chemistry writes `H2O`, `2H2 + O2 -> 2H2O` and `NaOH` exactly as English
  // does, and the Latin-run floor of three letters lets every one of them
  // through untouched, because a digit breaks the run. The one place a
  // formula would have tripped the gate is a four-letter symbol run like
  // `NaOH` standing alone in prose, and no Russian string has one.
];

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

  it('ignores interpolation placeholders, which no reader ever sees', () => {
    // Regression. `{element}`, `{count}` and `{full}` are identifiers in the
    // source: `format()` substitutes them long before the string reaches a
    // page. Counting them as Latin runs made the gate report 40 findings the
    // first time it ran against real Russian files — every a11y label, every
    // coach line — and the only way to silence it would have been an
    // allowlist covering most of the catalogue.
    expect(latinRunsIn({ x: '{element}: {count} из {full}' })).toEqual([]);
    expect(latinRunsIn({ x: 'Общая пара: {atom1} и {atom2}.' })).toEqual([]);

    // ...and a real English word standing next to one is still caught, which
    // is the half that matters.
    expect(paths(latinRunsIn({ x: 'Уровень {level} complete' }))).toEqual(['x']);
  });

  it('does not flag an -енный adjective that is correctly spelled with е', () => {
    // Regression, and the more dangerous of the two. A blanket
    // `[а-я]енн(ый|ая|…)` rule is not true of Russian: only participles with
    // a stressed ending take ё. It fired on six correct words for every real
    // one — and one of the six was **неспаренный электрон**, the formal term
    // glossary-ru.md is built on, which made the required terminology
    // unshippable.
    expect(
      typographyFindings({
        a: 'остался неспаренный электрон',
        b: 'Пропущенные подсвечены.',
        c: 'полученные значки',
        d: 'Отправленные отзывы остаются.',
        e: 'современный учебник',
      })
    ).toEqual([]);

    // The participles that really do take ё are still caught, one by one.
    expect(paths(typographyFindings({ f: 'приведенный пример' }))).toEqual(['f']);
    expect(paths(typographyFindings({ g: 'определенный ответ' }))).toEqual(['g']);
    expect(paths(typographyFindings({ h: 'неподеленная пара' }))).toEqual(['h']);
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
