// src/i18n/count-strings.test.ts
//
// The strings that interpolate a number but are *not* plural records.
//
// A plural record is safe: `Intl.PluralRules` picks the form, and the
// build-time gate in i18n-parity.ts makes sure every form the language needs
// exists. A string like `'{count} correct'` is not a record, so it has one
// form and that form has to be right at every count. English gets away with
// it because "correct" does not inflect.
//
// Italian did not. Seven strings came out of the Italian pass where a Romance
// past participle or adjective agrees with its count and the English source
// simply does not inflect:
//
//   "{count} corrette"  is wrong at 1          (should be *corretta*)
//   "Ne hai contati {given}"  is wrong at 1    (should be *contato*)
//
// They compile. They pass every parity gate — no missing key, nothing empty,
// nothing identical to the English, every placeholder intact. They are
// ungrammatical on screen and only a human reading a rendered page finds
// them. Spanish hit the same class; the fix both used is the colon label
// ("risposte esatte: {count}"), which is invariant.
//
// **Russian is worse.** It has three plural forms *and* the numeral governs
// the case of the noun that follows it: 1 ответ, 2 ответа, 5 ответов. There
// is no single phrasing of "{count} correct" that is right at every count
// unless the count sits somewhere that needs no agreement.
//
// So this test pins the set. It does not check the wording — it cannot, in
// six languages. What it does is make the set *closed*: add a new
// count-interpolating non-plural string and this fails, and whoever added it
// has to either phrase it invariantly or make it a plural record. The
// alternative is what happened with Italian, where nobody knew the list
// existed until a translator hit the seventh instance.
//
// docs/i18n/GAMES.md § Count-bearing strings is the rule this enforces.

import { describe, expect, it } from 'vitest';
import { en } from './dictionaries/en';
import { REACTION_BALANCER_MESSAGES } from '@/core-engine/config/games/reaction-balancer-messages';
import { LEWIS_STRUCTURES_MESSAGES } from '@/core-engine/config/games/lewis-structures-messages';
import { flatten, pluralRoot } from '@/test-utils/i18n-parity';
import { placeholdersIn } from './format';

/**
 * Placeholders that are filled with a number.
 *
 * Listed rather than inferred, because the name is the only evidence there
 * is: `{name}` and `{element}` take strings, `{count}` and `{n}` take
 * numbers, and nothing in the type of a template string says which. A
 * placeholder added to the English source and not listed here is invisible to
 * this gate — so the test below also asserts the list stays exhaustive by
 * failing on any *unknown* placeholder name, which forces the decision.
 */
const NUMERIC_PLACEHOLDERS = new Set([
  'count',
  'n',
  'k',
  'given',
  'actual',
  'counted',
  'level',
  'max',
  'next',
  'correct',
  'left',
  'right',
  'round',
  'total',
  'step',
  'tier',
  'points',
  'full',
  'cleared',
  'count1',
  'count2',
  'hits',
  'index',
  'lives',
  'min',
  'ordinal',
  'phase',
  'quota',
  'score',
  'wave',
  // A year, not a count: nothing agrees with it, and note that it is rendered
  // with plain String() rather than through Intl on purpose — "2 026" is not
  // a year in any locale.
  'year',
  // A column and a row of the periodic table. Both are labels rather than
  // counts — "group 17" names the column, it does not count seventeen of
  // anything — but they are numerals, and a numeral in Russian governs the
  // case of whatever follows it whether it is counting or not. Listing them
  // here is what puts the strings that carry them under the rule below.
  'group',
  'period',
]);

/** Placeholders known to take a string, so the list above stays honest. */
const TEXT_PLACEHOLDERS = new Set([
  'name',
  'atom',
  'atom1',
  'atom2',
  'element',
  'elementInSentence',
  'formula',
  'equation',
  'explanation',
  'fixed',
  'broken',
  'date',
  // The second date in an Explore permalink's "last featured … comes round
  // again …" sentence. Deliberately not called `next`, which is in the numeric
  // list above: this is an `Intl`-formatted date, nothing agrees with it, and
  // naming it `next` would have quietly enrolled the string in COUNT_BEARING.
  'nextDate',
  'email',
  'link',
  'alias',
  'game',
  'topic',
  'title',
  'language',
  'error',
  'reason',
  'value',
  'analogue',
  'analogueMolecule',
  'bondLine',
  'button',
  // Prose describing what a level adds, not a number of anything.
  'changes',
  'compound',
  'elements',
  'ion',
  'label',
  'name1',
  'name2',
  'symbol',
  'target',
  'word',
  // Worth singling out: these two are filled with an *already selected*
  // plural string ("2 shared pairs"), not with a number. The plural is
  // resolved before interpolation, so the surrounding sentence never has to
  // agree with a count it cannot see — which is the same trick, at one
  // remove, that the colon label pulls.
  'bonds',
  'lonePairs',
  // The localised name of an element's family, filled into the accessible
  // name of an f-block cell — "Lanthanum, symbol La, atomic number 57,
  // Lanthanide, period 6". A noun in apposition, governing nothing.
  'family',
]);

const SOURCES: Record<string, unknown> = {
  dictionary: en,
  'reaction-balancer': REACTION_BALANCER_MESSAGES,
  'lewis-structures': LEWIS_STRUCTURES_MESSAGES,
};

/** Every non-plural English string that interpolates at least one number. */
function countBearingKeys(): string[] {
  const found: string[] = [];
  for (const [source, tree] of Object.entries(SOURCES)) {
    for (const entry of flatten(tree)) {
      if (entry.plural) continue; // a plural record handles its own counts
      const numeric = placeholdersIn(entry.value).filter((p) => NUMERIC_PLACEHOLDERS.has(p));
      if (numeric.length > 0) found.push(`${source}:${entry.path}`);
    }
  }
  return found.sort();
}

/**
 * The count-interpolating non-plural strings, as of the Russian preparation
 * pass. **Every entry here must be phrased so that nothing in it agrees with
 * the number** — see docs/i18n/GAMES.md § Count-bearing strings.
 *
 * Adding a key to this list is a decision, not a formality: it says "this
 * sentence can be written invariantly in Russian", and if it cannot, the
 * string should be a plural record instead.
 */
const COUNT_BEARING = [
  'dictionary:footer.copyright',
  'dictionary:games.acidClassification.progress',
  'dictionary:games.formulaBlaster.progress',
  'dictionary:games.neutralise.progressFull',
  'dictionary:games.neutralise.progressShort',
  'dictionary:games.overlay.beginLevel',
  'dictionary:games.overlay.levelOfMax',
  'dictionary:games.overlay.levelUpProgress',
  'dictionary:games.overlay.statRoundValue',
  'dictionary:games.shared.finalScoreA11y',
  'dictionary:games.shared.levelProgressA11y',
  'dictionary:games.shared.levelValue',
  'dictionary:games.shared.lives',
  'dictionary:games.shared.scoreValue',
  // The periodic table. All five are phrased so that nothing agrees with the
  // numeral: the two cell labels are comma-separated appositions
  // ("…, атомный номер 11, группа 1, период 3"), the two header labels are a
  // noun followed by a bare numeral, and the legend row puts its count after
  // a colon — the invariant shape docs/i18n/GAMES.md § Count-bearing strings
  // prescribes.
  'dictionary:periodicTable.cellA11y',
  'dictionary:periodicTable.cellA11yFBlock',
  'dictionary:periodicTable.groupHeaderA11y',
  'dictionary:periodicTable.legend.outer-count',
  'dictionary:periodicTable.periodHeaderA11y',
  'dictionary:serverMessages.aliasLength',
  'dictionary:serverMessages.collaboratorTooLong',
  'dictionary:serverMessages.feedbackMessageTooLong',
  'lewis-structures:coach.deadEnd',
  'lewis-structures:coach.needsMore',
  'lewis-structures:guided.stepLabel',
  'lewis-structures:header.marking',
  'lewis-structures:header.progress',
  'lewis-structures:hint.inspectTier3',
  'lewis-structures:hint.tierLabel',
  'lewis-structures:inspect.countLabel',
  'lewis-structures:inspect.countRight',
  'lewis-structures:inspect.countWrong',
  'lewis-structures:inspect.countWrongDouble',
  'lewis-structures:inspect.explainTooMany',
  'lewis-structures:inspect.wrongAtom',
  'lewis-structures:inspect.wrongDiagnosis',
  'lewis-structures:notebook.hintTier',
  'lewis-structures:overlay.levelUpDescription',
  'lewis-structures:success.bonus',
  'lewis-structures:success.points',
  'lewis-structures:ui.atomCounterA11y',
  'lewis-structures:ui.atomLonePairA11y',
  'lewis-structures:ui.atomLonerA11y',
  'lewis-structures:ui.atomNameA11y',
  'lewis-structures:ui.atomOrdinal',
  'lewis-structures:ui.livePaired',
  'reaction-balancer:beam.readout',
  'reaction-balancer:coach.balancedNotLowest',
  'reaction-balancer:coach.imbalance',
  'reaction-balancer:guided.stepLabel',
  'reaction-balancer:header.challengeProgress',
  'reaction-balancer:header.progress',
  'reaction-balancer:hint.tier3',
  'reaction-balancer:hint.tier3Lower',
  'reaction-balancer:hint.tierLabel',
  'reaction-balancer:ledger.needsMoreLeft',
  'reaction-balancer:ledger.needsMoreRight',
  'reaction-balancer:ledger.row',
  'reaction-balancer:notebook.hintTier',
  'reaction-balancer:notebook.simplified',
  'reaction-balancer:overlay.levelUpDescription',
  'reaction-balancer:success.bonus',
  'reaction-balancer:success.points',
  'reaction-balancer:ui.liveChanged',
];

describe('count-bearing strings', () => {
  it('is exactly the documented set', () => {
    // If this fails with an *extra* key, a new string interpolates a count
    // without being a plural record. Decide which it should be, then either
    // rephrase it invariantly and add it here, or make it a plural.
    //
    // If it fails with a *missing* key, a string was removed or turned into a
    // plural — delete the line.
    expect(countBearingKeys()).toEqual(COUNT_BEARING);
  });

  it('classifies every placeholder in the English sources', () => {
    // Keeps NUMERIC_PLACEHOLDERS honest. A new placeholder called `{amount}`
    // would otherwise slip past the test above entirely, and the gate would
    // go on reporting a set that is quietly no longer the whole set.
    const unclassified = new Set<string>();
    for (const tree of Object.values(SOURCES)) {
      for (const entry of flatten(tree)) {
        for (const placeholder of placeholdersIn(entry.value)) {
          if (!NUMERIC_PLACEHOLDERS.has(placeholder) && !TEXT_PLACEHOLDERS.has(placeholder)) {
            unclassified.add(placeholder);
          }
        }
      }
    }
    expect([...unclassified].sort()).toEqual([]);
  });

  it('keeps every plural record out of the list', () => {
    // The two mechanisms must not overlap: a string in COUNT_BEARING is one
    // the language cannot inflect for, and a plural record is one it can.
    const pluralRoots = new Set<string>();
    for (const [source, tree] of Object.entries(SOURCES)) {
      for (const entry of flatten(tree)) {
        if (entry.plural) pluralRoots.add(`${source}:${pluralRoot(entry.path)}`);
      }
    }
    expect(COUNT_BEARING.filter((key) => pluralRoots.has(key))).toEqual([]);
    // ...and there really are plural records, so this is not vacuous.
    expect(pluralRoots.size).toBeGreaterThan(0);
  });
});
