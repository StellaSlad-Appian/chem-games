// e2e/latin-leakage.spec.ts
//
// Walks the visible text of a page and fails on English that was never
// translated.
//
// **Why this needs a browser.** Every gate in src/i18n reads the dictionaries
// and the catalogues. None of them can see a string that is not in a
// dictionary at all — a value rendered straight from a dataset, a date built
// in a page component, a label typed into JSX. All three of the
// untranslated-English strings that have shipped on this site were exactly
// that, and all three were found by a person looking at a rendered page:
//
//   * the `SYNTHESIS` reaction badge, rendered from `reaction.type`
//     (fixed in this branch, and this spec is the gate that would have
//     caught it);
//   * the privacy effective date, `'14 September 2026'` interpolated into a
//     translated sentence (fixed in this branch);
//   * the debug panel on the acid-classification arena (removed in 67cffd6).
//
// **Why Russian makes it urgent.** Latin script on a Cyrillic page is
// unmistakable to a reader and no more detectable to the current tests than
// it is today. A gate that works by script is trivial for Russian and, as it
// turns out, workable for the Latin locales too — which is why this runs
// against all four of them now rather than waiting.
//
// **How it decides.** It collects the visible text of a page, strips what
// must legitimately stay Latin, and fails on any remaining word that looks
// like English. "Looks like English" is deliberately a *wordlist*, not a
// pattern: a pattern over Latin script cannot tell German from English, and
// a gate that cannot be trusted is a gate that gets commented out. The list
// is small, common English function and UI words that appear in none of the
// four languages with the same spelling.

import { expect, test, type Page } from '@playwright/test';
import { ELEMENTS_REGISTRY } from '../src/core-engine/data/elements';
import { LOCALES, type Locale } from '../src/i18n/config';
import { path } from './helpers';

/**
 * Pages worth walking: one of each kind, in each locale. Deliberately not
 * every route — the point is coverage of page *shapes* (marketing, hub,
 * reference, legal, game arena), because leakage comes from a component, and
 * a component appears on every page of its kind.
 */
const PAGES: { name: string; appPath: string; settle?: string }[] = [
  { name: 'home', appPath: '/' },
  { name: 'games hub', appPath: '/games' },
  { name: 'cheat sheets', appPath: '/cheat-sheets' },
  { name: 'leaderboards', appPath: '/leaderboards' },
  { name: 'privacy', appPath: '/privacy' },
  {
    name: 'reaction balancer',
    appPath: '/games/reaction-balancer',
    settle: 'main.game-shell',
  },
];

/** Every locale but English; English leaking English is not a bug. */
const TRANSLATED: Locale[] = LOCALES.filter((locale) => locale !== 'en');

/**
 * A chemical formula: one or more **real** element symbols, each optionally
 * parenthesised and optionally followed by a count, optionally charged.
 *
 * Built from `ELEMENTS_REGISTRY` rather than from a shape like
 * `[A-Z][a-z]?\d*`, and the difference is not cosmetic. That shape matches
 * "SYNTHESIS" — S, Y, N, T, H, E, S, I, S all look like element symbols — so
 * it would have silently exempted the exact bug this file exists to catch.
 * The self-test at the bottom is what found that, which is the argument for
 * self-testing a gate.
 *
 * Longest symbol first, so `Na` is matched as sodium and not as `N` followed
 * by a stray `a`.
 */
const FORMULA_PATTERN = (() => {
  const symbols = ELEMENTS_REGISTRY.map((element) => element.symbol).sort(
    (a, b) => b.length - a.length
  );
  const group = `(?:\\(?(?:${symbols.join('|')})\\)?\\d*)`;
  return new RegExp(
    `(?<![\\p{L}\\p{N}])${group}+(?:\\s*[⁺⁻+-])?(?![\\p{L}\\p{N}])`,
    'gu'
  );
})();

/**
 * What legitimately stays Latin on a page in any language.
 *
 * Kept explicit and small on purpose. The temptation with a gate like this is
 * one broad pattern that makes every failure go away — at which point it
 * stops being a gate. Each entry below names a category and says why.
 */
const ALLOWED_PATTERNS: { why: string; pattern: RegExp }[] = [
  {
    why: 'Chemical formulae, from the real element symbols: H2O, NaOH, Ca(OH)2, CO2, OH⁻, H⁺.',
    pattern: FORMULA_PATTERN,
  },
  {
    why: 'State symbols, written in Latin in Russian chemistry exactly as here.',
    pattern: /\((?:s|l|g|aq)\)/g,
  },
  {
    why: 'pH, which no language expands.',
    pattern: /\bpH\b/g,
  },
  {
    why: 'IUPAC affixes and stems that are Latin in every language.',
    pattern: /\b(?:mono|di|tri|tetra|penta|hexa|hepta|octa|nona|deca|hydro|oxo|per|hypo)\b/gi,
  },
  {
    why: 'Brand, product and company names.',
    pattern: /\b(?:ChemGames|Supabase|Resend|Google|Vercel|Next\.js|GitHub)\b/g,
  },
  {
    why: 'Australian legal proper nouns, which the privacy page keeps in English by policy — see the header of privacy/page.tsx.',
    pattern:
      /\b(?:Privacy Act(?: 1988)?|Australian Privacy Principles?|OAIC|Office of the Australian Information Commissioner|Commonwealth)\b/g,
  },
  {
    why: 'Language names in the switcher, each written in its own language.',
    pattern: /\b(?:English|Deutsch|Français|Español|Italiano|Русский)\b/g,
  },
  {
    why: 'Anything a component marks as formula-bearing renders inside [data-formula]; this covers a stray case the selector misses.',
    pattern: /\bMoleculeText\b/g,
  },
];

/**
 * English words that would be a bug on a German, French, Spanish, Italian or
 * Russian page.
 *
 * A wordlist rather than a script rule, because four of the five locales are
 * themselves Latin-script: "Niveau" is not English and no pattern over
 * `\p{Script=Latin}` can say so.
 *
 * Chosen for the shape of the bugs that actually shipped: a dataset value
 * (`SYNTHESIS`), a date (`September`), and UI labels from a component that
 * never went through the dictionary.
 *
 * A word that is *also* a given language's own word is exempted per locale in
 * `ALSO_NATIVE` below rather than dropped from this list, so the gate stays
 * strong for the languages where the word really would be leakage. A false
 * positive is worse than a miss here: a gate that cries wolf gets deleted.
 */
const ENGLISH_WORDS = [
  // Reaction and dataset vocabulary — the SYNTHESIS class of bug. Note the
  // two reaction classes NOT here: "Combustion" is the French word too, and
  // "Redox" is the German, Spanish and Italian word. Both are recorded as
  // identical-by-design in game-messages.test.ts, so listing them would be
  // guaranteed false positives.
  'Synthesis',
  'Decomposition',
  'Replacement',
  'Precipitation',
  // Month names — the effective-date class of bug. German shares four of
  // them with English and exempts those in ALSO_NATIVE; French, Spanish and
  // Italian share none, which is why the date bug is catchable at all.
  'January',
  'February',
  'March',
  'April',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
  // Common UI verbs and nouns, the debug-panel class of bug.
  'Score',
  'Level',
  'Settings',
  'Loading',
  'Continue',
  'Back',
  'Close',
  'Next',
  'Play again',
  'Try again',
  'Search',
  'Sign in',
  'Sign out',
  'Log in',
  'Submit',
  'Cancel',
  'Recorded',
  'Effective date',
  'All rights reserved',
];

/**
 * Words from the list above that are also this language's own word, so
 * finding one is not evidence of anything.
 *
 * This mirrors `IDENTICAL_BY_DESIGN` in src/i18n/dictionary.test.ts, and not
 * by coincidence: the same three facts are already recorded there as
 * deliberate translation decisions. German writes *Level* and Spanish and
 * Italian write *Idea*; French writes *Score*. If a word is legitimately
 * identical in the dictionary, it is legitimately identical on the page.
 *
 * Every entry was found by running this gate, not by guessing — which is the
 * only way a list like this stays true. A false positive is worse than a
 * miss here, because a gate that cries wolf is a gate somebody deletes.
 */
const ALSO_NATIVE: Record<string, string[]> = {
  de: [
    // Established German loanwords, all three already allowlisted in
    // dictionary.test.ts as identical-by-design.
    'Level',
    'Score',
    'Settings',
    // German month names that coincide with the English. This is why the
    // effective-date bug has to be caught in French, Spanish or Italian: on
    // a German page "14. September 2026" is correct German, and no gate can
    // tell it from the English string that used to be there.
    'April',
    'August',
    'September',
    'November',
  ],
  fr: [
    // « le score » is ordinary French, recorded in dictionary.test.ts.
    'Score',
  ],
  es: [],
  it: [],
};

/**
 * The visible text of the page, one text node per line, with notation and
 * non-content elements skipped.
 *
 * `[data-formula]` is the marker a component sets on anything that is
 * notation rather than prose — the atom cards, the ledger rows, the equation
 * itself. Skipping those subtrees wholesale is better than pattern-matching
 * their contents, because the component already knows what they are.
 *
 * **One line per text node, and it matters.** The obvious implementation —
 * clone the body, remove the unwanted nodes, read `innerText` — is wrong in
 * a way that silently disables the whole gate: `innerText` is defined in
 * terms of layout, and a *detached* clone has none, so it degrades to
 * `textContent` and every block runs into the next. A page whose badge says
 * "Synthesis" between a button labelled "Beenden" and a heading
 * "Wasser-Synthese" comes back as `…BeendenSynthesisWasser-Synthese…`, in
 * which "Synthesis" is not a word and the word-boundary check correctly
 * refuses to match it.
 *
 * That was not a hypothetical: it is what this gate did on its first run,
 * and it reported the German arena clean while the untranslated badge was
 * on screen. Walking the text nodes and joining with newlines is both
 * layout-independent and honest about where one string ends.
 */
async function visibleText(page: Page): Promise<string> {
  return page.evaluate(() => {
    const SKIP = '[data-formula], script, style, noscript, svg, [aria-hidden="true"]';
    const lines: string[] = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = (node as Text).parentElement;
        if (!parent || parent.closest(SKIP)) return NodeFilter.FILTER_REJECT;
        return (node.textContent ?? '').trim()
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT;
      },
    });
    while (walker.nextNode()) lines.push((walker.currentNode.textContent ?? '').trim());
    return lines.join('\n');
  });
}

/** Strips everything that legitimately stays Latin, then looks for English. */
function englishIn(text: string, locale?: string): string[] {
  let remaining = text;
  for (const { pattern } of ALLOWED_PATTERNS) {
    remaining = remaining.replace(pattern, ' ');
  }
  const native = new Set(locale ? (ALSO_NATIVE[locale] ?? []) : []);
  const found = new Set<string>();
  for (const word of ENGLISH_WORDS) {
    if (native.has(word)) continue;
    // Unicode boundaries, not `\b`: the text around a match may be Cyrillic,
    // and `\b` is blind to it — the same trap GlossaryTerm.tsx had.
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`(?<![\\p{L}\\p{N}])${escaped}(?![\\p{L}\\p{N}])`, 'iu');
    if (re.test(remaining)) found.add(word);
  }
  return [...found].sort();
}

for (const locale of TRANSLATED) {
  test.describe(`untranslated English in ${locale}`, () => {
    for (const { name, appPath, settle } of PAGES) {
      test(`${name} has none`, async ({ page }) => {
        await page.goto(path(appPath, locale));
        if (settle) await expect(page.locator(settle)).toBeVisible();
        else await expect(page.locator('body')).toBeVisible();

        const leaked = englishIn(await visibleText(page), locale);
        expect(leaked, `English words visible on the ${locale} ${name} page`).toEqual([]);
      });
    }
  });
}

test.describe('the leakage check itself', () => {
  // Same reasoning as src/i18n/cyrillic.test.ts: a gate whose only assertion
  // is that a list is empty has never been seen to fail, and a gate that has
  // never failed may simply not work.
  test('finds the three bugs that actually shipped', () => {
    // The reaction badge, as it rendered before this branch.
    expect(englishIn('SYNTHESIS\nWasserbildung')).toEqual(['Synthesis']);
    // The privacy effective date, as it rendered on the German page.
    expect(englishIn('Gültig ab: 14 September 2026.')).toEqual(['September']);
    // A debug panel's labels.
    expect(englishIn('Score: 120 | Level 3')).toEqual(['Level', 'Score']);
  });

  test('passes clean German, French, Spanish and Italian', () => {
    expect(englishIn('Gültig ab: 14. September 2026.'.replace('September', 'Sept.'))).toEqual([]);
    expect(englishIn('Niveau 3 sur 5 • 12 bonnes réponses')).toEqual([]);
    expect(englishIn('Nivel 3 de 5 • Puntuación 120')).toEqual([]);
    expect(englishIn('Livello 3 di 5 • Punteggio 120')).toEqual([]);
  });

  test('lets formulae, state symbols and brand names through', () => {
    expect(englishIn('Wasser ist H2O(l), Natronlauge NaOH(aq). pH 7.')).toEqual([]);
    expect(englishIn('ChemGames verwendet Supabase, Resend und Google.')).toEqual([]);
  });

  test('works when the surrounding text is Cyrillic', () => {
    // The case the whole gate is being built for, and the one an ASCII `\b`
    // would get wrong: no Latin word character sits next to "September" here.
    expect(englishIn('Действует с: 14 September 2026 г.')).toEqual(['September']);
    expect(englishIn('Действует с: 14 сентября 2026 г.')).toEqual([]);
  });
});
