// src/test-utils/i18n-parity.ts
//
// The checks every translated source has to pass, in one place.
//
// TypeScript already refuses to compile a locale that is missing a key
// (`satisfies Dictionary`, `satisfies <Game>Messages`), so these cover what the
// type system cannot see: empty strings, strings that were copied rather than
// translated, placeholders that were dropped or renamed, and formulae a
// translator "helpfully" localised.
//
// They are shared because there is now more than one translated source: the UI
// dictionary in src/i18n/dictionaries/, and one message catalogue per game in
// src/core-engine/config/games/ + src/i18n/game-messages/. A catalogue that
// only got half the gates would be exactly the kind of thing nobody notices
// until a student sees a literal "{count}".
//
// These are the tests that make Phase 2 safe: adding a locale means adding one
// line to LOCALES and one file per source; everything here then runs against it
// automatically.

import { describe, expect, it } from 'vitest';
import { isPluralForms, placeholdersIn, type PluralCategory } from '@/i18n/format';

export type Entry = { path: string; value: string; plural?: boolean };

/**
 * Every leaf string in a translated source, as dot-paths (arrays use [index]).
 *
 * A plural record's forms are flagged, because they are the one place where
 * locales legitimately differ in which keys they carry: `other` is required,
 * every other CLDR category is optional. Russian adds `few` and `many` to the
 * same key and must not read as "extra keys".
 */
export function flatten(value: unknown, prefix = '', inPlural = false): Entry[] {
  if (typeof value === 'string') return [{ path: prefix, value, plural: inPlural }];
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => flatten(item, `${prefix}[${index}]`, false));
  }
  if (value && typeof value === 'object') {
    const plural = isPluralForms(value);
    return Object.entries(value).flatMap(([key, child]) =>
      flatten(child, prefix ? `${prefix}.${key}` : key, plural)
    );
  }
  return [];
}

/** `games.x.count.one` -> `games.x.count`. */
export const pluralRoot = (path: string) => path.slice(0, path.lastIndexOf('.'));

/**
 * A glossary match word — `glossary.loner.matches[3]`.
 *
 * **Exempt from the key-parity check in both directions**, and for exactly the
 * reason plural forms are: *how many of these a term needs is a property of
 * the language, not of the string.* `matches` is the list of word forms that
 * open a tap-to-explain pop-over, the matcher does not stem, and a language
 * supplies one entry per inflected form its own copy uses. English needs two
 * for *lone pair* (singular and plural). Russian needs four for
 * *неподелённая пара*, because the copy uses the nominative, the genitive
 * singular, the genitive plural and the accusative — six cases is not an
 * excess, it is the language.
 *
 * Positional array parity made that impossible: `flatten()` gives every array
 * element its own path, so a fifth Russian form reads as an "extra key". The
 * five Latin locales never noticed, because each of them happens to need the
 * same count English does. docs/i18n/README.md and GAMES.md both already tell
 * the Russian pass to expect longer lists than any previous language; this is
 * the gate catching up with the documented design rather than a relaxation of
 * it.
 *
 * What still holds, so this cannot become a way of switching coverage off:
 * every match word is still checked for emptiness; `game-messages.test.ts`
 * still asserts each one starts and ends with a letter; it still asserts that
 * a term linked in the English running text is linked in the translation's;
 * and it now asserts no locale ships an empty `matches` list.
 */
const isGlossaryMatch = (path: string) =>
  /(?:^|\.)glossary\.[^.]+\.matches\[\d+\]$/.test(path);

/**
 * A cheap smoke test for the most damaging class of mistake: a translator
 * localising a formula. Any occurrence of one of these in the English must
 * appear byte-identical in the translation at the same key.
 */
const FORMULA_LIKE = /\b(?:H2O|H2SO4|HNO3|NaCl|NaOH|CO2|NH3|CH4|OH-|H\+)\b/;

export interface ParityOptions {
  /** The canonical English source. */
  source: unknown;
  /** The other locales' versions, keyed by locale code. English is not one. */
  translations: Record<string, unknown>;
  /**
   * Keys whose translation is legitimately identical to the English, per
   * locale. Every entry is a deliberate decision, and the suite fails if one of
   * them stops being identical — so the list cannot quietly rot into a way of
   * silencing the check.
   */
  identicalByDesign?: Record<string, RegExp[]>;
}

/**
 * Runs the five parity gates for one translated source against every locale.
 * Call it at the top level of a test file, once per source.
 */
export function describeTranslationParity(label: string, options: ParityOptions): void {
  const { source, translations, identicalByDesign = {} } = options;

  const englishEntries = flatten(source);
  const englishMap = new Map(englishEntries.map((entry) => [entry.path, entry.value]));
  const locales = Object.keys(translations).sort();

  const isIdenticalByDesign = (locale: string, path: string) =>
    (identicalByDesign[locale] ?? []).some((pattern) => pattern.test(path));

  describe.each(locales)(`${label}: %s`, (locale) => {
    const entries = flatten(translations[locale]);
    const map = new Map(entries.map((entry) => [entry.path, entry.value]));

    it('has exactly the keys English has — no missing, no extra', () => {
      // Plural forms are exempt in both directions: a locale supplies the CLDR
      // categories its language uses. `other` is covered by the test below.
      const missing = englishEntries
        .filter((entry) => !entry.plural && !isGlossaryMatch(entry.path) && !map.has(entry.path))
        .map((e) => e.path);
      const extra = entries
        .filter(
          (entry) =>
            !entry.plural && !isGlossaryMatch(entry.path) && !englishMap.has(entry.path)
        )
        .map((e) => e.path);

      expect({ missing, extra }).toEqual({ missing: [], extra: [] });
    });

    it('gives every plural record an `other` form, and no form English does not have a record for', () => {
      const englishPluralRoots = new Set(
        englishEntries.filter((e) => e.plural).map((e) => pluralRoot(e.path))
      );
      const localePluralRoots = new Set(
        entries.filter((e) => e.plural).map((e) => pluralRoot(e.path))
      );

      // Every plural in English is a plural here, and vice versa: only the set
      // of forms may differ, never whether the key is count-dependent at all.
      expect([...localePluralRoots].sort()).toEqual([...englishPluralRoots].sort());

      const withoutOther = [...localePluralRoots].filter((root) => !map.has(`${root}.other`));
      expect(withoutOther).toEqual([]);
    });

    it('has no empty or whitespace-only values', () => {
      const empty = entries.filter((entry) => entry.value.trim() === '').map((e) => e.path);
      expect(empty).toEqual([]);
    });

    it('has no values left byte-identical to the English source', () => {
      const untranslated = entries
        .filter((entry) => englishMap.get(entry.path) === entry.value)
        .map((entry) => entry.path)
        .filter((path) => !isIdenticalByDesign(locale, path));

      expect(untranslated).toEqual([]);
    });

    it('keeps every interpolation placeholder, with the same names', () => {
      const mismatched = englishEntries
        .map((entry) => {
          const translated = map.get(entry.path);
          if (translated === undefined) return null;
          const expected = placeholdersIn(entry.value).sort();
          const actual = placeholdersIn(translated).sort();
          if (expected.join(',') === actual.join(',')) return null;
          return { path: entry.path, expected, actual };
        })
        .filter(Boolean);

      expect(mismatched).toEqual([]);
    });

    it('does not translate chemical formulae or element symbols into the copy', () => {
      const altered = englishEntries
        .filter((entry) => FORMULA_LIKE.test(entry.value))
        .filter((entry) => {
          const translated = map.get(entry.path) ?? '';
          const inSource = entry.value.match(new RegExp(FORMULA_LIKE, 'g')) ?? [];
          return inSource.some((formula) => !translated.includes(formula));
        })
        .map((entry) => entry.path);

      expect(altered).toEqual([]);
    });
  });
}

// ---------------------------------------------------------------------------
// Plural completeness — a build-time gate, deliberately stricter than runtime
// ---------------------------------------------------------------------------
//
// `selectPlural()` in format.ts falls back to `other` when a locale has not
// supplied the category a count selects, and `plural.test.ts` pins that: a
// half-translated page should render a slightly wrong sentence, not the word
// "undefined". That is the right runtime behaviour and it is not changing.
//
// But it means a Russian dictionary shipped with only `one` and `other` — the
// shape a translator copying en.ts would naturally produce — is *grammatically
// wrong on almost every count* and nothing anywhere fails. 2 books, 5 books
// and 25 books would all read "2 книги / 5 книги / 25 книги", and the parity
// gates above are all satisfied: no key is missing, nothing is empty, nothing
// is identical to the English, every placeholder survives.
//
// So the two disagree on purpose. Runtime degrades; the build refuses.

/**
 * The largest count any string on this site interpolates, with three orders
 * of magnitude of headroom.
 *
 * It has to be a number rather than "all of them", because CLDR categories are
 * defined over every numeric value and some are unreachable in practice. The
 * real counts here are topics on a cheat-sheet grid, bonds and lone pairs in a
 * Lewis structure, molecules in an equation, correct answers in a round — all
 * in the low tens.
 *
 * This is what keeps the gate honest in both directions:
 *
 *   * French, Spanish and Italian *declare* a `many` category, but the
 *     smallest integer that selects it is **1,000,000** (checked, not
 *     assumed — it is the compact-decimal rule, "1,5 million de livres").
 *     Requiring the three shipped Romance locales to invent a millions form
 *     for "{count} topics" would be noise, and noise is how a gate gets
 *     switched off.
 *   * Russian reaches `few` at 2 and `many` at 5. Those are ordinary counts
 *     on an ordinary page, so Russian must supply both.
 */
const PLAUSIBLE_COUNT_CEILING = 1000;

/**
 * The CLDR categories a locale must supply, derived from `Intl.PluralRules`
 * rather than written down.
 *
 * Derived, because a hard-coded table is a second source of truth that goes
 * stale silently: CLDR moves, ICU ships with Node, and the one thing worse
 * than no gate is a gate asserting last year's rules.
 *
 * `other` is always required even where no count selects it — Russian is the
 * example, since every integer there is `one`, `few` or `many` and only a
 * fraction (1.5) is `other`. It is the type's only required form and the
 * fallback the runtime leans on, so a record without it is broken regardless.
 */
export function requiredPluralCategories(locale: string): PluralCategory[] {
  const rules = new Intl.PluralRules(locale);
  const reachable = new Set<string>(['other']);
  for (let n = 0; n <= PLAUSIBLE_COUNT_CEILING; n++) reachable.add(rules.select(n));
  return [...reachable].sort() as PluralCategory[];
}

/** Every category `Intl.PluralRules` says this locale has, reachable or not. */
const declaredPluralCategories = (locale: string): string[] =>
  [...new Intl.PluralRules(locale).resolvedOptions().pluralCategories].sort();

/**
 * Asserts every plural record in every locale carries exactly the forms its
 * language needs. Call it once per translated source, with English included —
 * English is as capable of losing a form as anything else.
 */
export function describePluralCompleteness(
  label: string,
  catalogues: Record<string, unknown>
): void {
  const locales = Object.keys(catalogues).sort();

  describe.each(locales)(`${label}: %s plural completeness`, (locale) => {
    const records = () => {
      const byRoot = new Map<string, Set<string>>();
      for (const entry of flatten(catalogues[locale])) {
        if (!entry.plural) continue;
        const root = pluralRoot(entry.path);
        const forms = byRoot.get(root) ?? new Set<string>();
        forms.add(entry.path.slice(root.length + 1));
        byRoot.set(root, forms);
      }
      return byRoot;
    };

    it('supplies every CLDR category a real count can select', () => {
      const required = requiredPluralCategories(locale);
      const incomplete = [...records()]
        .map(([root, forms]) => ({
          root,
          missing: required.filter((category) => !forms.has(category)),
        }))
        .filter((record) => record.missing.length > 0);

      // Failure reads as e.g. [{ root: 'cheatSheets.count', missing: ['few','many'] }]
      expect(incomplete).toEqual([]);
    });

    it('supplies no category the language does not have', () => {
      // The other direction, and the cheaper bug: a `two` in a Russian record,
      // or a typo like `mny`, is dead weight the runtime silently ignores.
      const declared = new Set(declaredPluralCategories(locale));
      const surplus = [...records()]
        .map(([root, forms]) => ({
          root,
          surplus: [...forms].filter((category) => !declared.has(category)).sort(),
        }))
        .filter((record) => record.surplus.length > 0);

      expect(surplus).toEqual([]);
    });
  });
}
