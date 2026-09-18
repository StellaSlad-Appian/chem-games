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
import { isPluralForms, placeholdersIn } from '@/i18n/format';

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
        .filter((entry) => !entry.plural && !map.has(entry.path))
        .map((e) => e.path);
      const extra = entries
        .filter((entry) => !entry.plural && !englishMap.has(entry.path))
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
