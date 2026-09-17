// src/i18n/dictionary.test.ts
//
// The automated quality gate for translations. TypeScript already refuses to
// compile a locale that is missing a key (`satisfies Dictionary` in de.ts), so
// these tests cover what the type system cannot see: empty strings, strings
// that were copied rather than translated, and interpolation placeholders that
// were dropped or renamed.
//
// These are the tests that make Phase 2 safe. Adding a locale means adding one
// line to LOCALES and one entry to `dictionaries`; everything below then runs
// against it automatically.

import { describe, expect, it } from 'vitest';
import { en } from './dictionaries/en';
import { de } from './dictionaries/de';
import { DEFAULT_LOCALE, LOCALES, type Locale } from './config';
import { placeholdersIn } from './format';

const dictionaries: Record<Locale, unknown> = { en, de };

type Entry = { path: string; value: string };

/** Every leaf string in a dictionary, as dot-paths (arrays use [index]). */
function flatten(value: unknown, prefix = ''): Entry[] {
  if (typeof value === 'string') return [{ path: prefix, value }];
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => flatten(item, `${prefix}[${index}]`));
  }
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, child]) =>
      flatten(child, prefix ? `${prefix}.${key}` : key)
    );
  }
  return [];
}

const entriesFor = (locale: Locale) => flatten(dictionaries[locale]);
const mapFor = (locale: Locale) =>
  new Map(entriesFor(locale).map((entry) => [entry.path, entry.value]));

const englishEntries = entriesFor(DEFAULT_LOCALE);
const englishMap = mapFor(DEFAULT_LOCALE);
const otherLocales = LOCALES.filter((locale) => locale !== DEFAULT_LOCALE);

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
    /^games\.reactionBalancer\.progress$/,
    /^games\.shared\.touchscreen$/,
    /^profile\.alias$/,
    // Chemistry terms that are the same word in both languages.
    /^chemistry\.(base|neutral)$/,
    // "OH⁻ (Base)" — the ion notation and the word "Base" are both unchanged.
    /^games\.neutralise\.keyTwoIon$/,
    // Keyboard glyphs and single digits used as <kbd> labels.
    /^games\.neutralise\.(keyOneLabel|keyTwoLabel|keyArrowsLabel)$/,
    // Placeholder-only strings whose visible text is a formula or a symbol.
    /^games\.reactionBalancer\.moleculeA11y$/,
    // Keyword lists are chosen per language, not translated; the German list
    // happens to be entirely different, so nothing is exempted here — this
    // entry exists to document that `meta.keywords` is intentionally NOT
    // compared as a translation of the English list.
  ],
};

const isIdenticalByDesign = (locale: Locale, path: string) =>
  (IDENTICAL_BY_DESIGN[locale] ?? []).some((pattern) => pattern.test(path));

describe.each(otherLocales)('dictionary: %s', (locale) => {
  const entries = entriesFor(locale);
  const map = mapFor(locale);

  it('has exactly the keys English has — no missing, no extra', () => {
    const missing = englishEntries.map((e) => e.path).filter((path) => !map.has(path));
    const extra = entries.map((e) => e.path).filter((path) => !englishMap.has(path));

    expect({ missing, extra }).toEqual({ missing: [], extra: [] });
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
        const source = placeholdersIn(entry.value).sort();
        const target = placeholdersIn(translated).sort();
        if (source.join(',') === target.join(',')) return null;
        return { path: entry.path, expected: source, actual: target };
      })
      .filter(Boolean);

    expect(mismatched).toEqual([]);
  });

  it('does not translate chemical formulae or element symbols into the copy', () => {
    // A cheap smoke test for the most damaging class of mistake: a translator
    // "helpfully" localising a formula. Any occurrence of a subscripted
    // formula must be byte-identical to the English one at the same key.
    const formulaLike = /\b(?:H2O|H2SO4|HNO3|NaCl|NaOH|CO2|NH3|CH4|OH-|H\+)\b/;
    const altered = englishEntries
      .filter((entry) => formulaLike.test(entry.value))
      .filter((entry) => {
        const translated = map.get(entry.path) ?? '';
        const inSource = entry.value.match(new RegExp(formulaLike, 'g')) ?? [];
        return inSource.some((formula) => !translated.includes(formula));
      })
      .map((entry) => entry.path);

    expect(altered).toEqual([]);
  });
});

describe('dictionary shape', () => {
  it('covers every locale in LOCALES', () => {
    expect(Object.keys(dictionaries).sort()).toEqual([...LOCALES].sort());
  });

  it('uses no placeholder syntax other than {name}', () => {
    // `${}` or `%s` would silently render as literal text.
    const suspicious = englishEntries
      .filter((entry) => /\$\{|%[sd]\b|\{\{/.test(entry.value))
      .map((entry) => entry.path);
    expect(suspicious).toEqual([]);
  });
});
