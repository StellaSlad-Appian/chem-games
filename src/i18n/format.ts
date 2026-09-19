// src/i18n/format.ts
//
// The one interpolation primitive the dictionaries use. Keeping it to a single
// `{name}` syntax is what makes the placeholder-parity test in
// `src/i18n/dictionary.test.ts` possible: a translator who drops or renames a
// placeholder fails the suite instead of shipping a literal "{count}" to a
// student.
//
// It also holds the `Intl` wrappers the UI formats numbers through, so that no
// component has to remember that a percent sign takes a no-break space in
// French, German and Russian but not in English.

import { formattingLocale, type Locale } from './config';

/**
 * A percentage, punctuated the way the reader's language punctuates one.
 *
 * `Intl.NumberFormat` is the only thing that knows German and French put a
 * no-break space before the `%` where English does not — `85 %` against
 * `85%` — and that Russian does too. It was `${n}%` in template literals,
 * which is right for exactly one of the site's five languages.
 *
 * Not for CSS. A percentage in a `style` attribute (`width: 42%`) is a length
 * and must stay machine-readable: localised, a decimal comma would make the
 * declaration invalid and the bar would not draw.
 */
export function formatPercent(locale: Locale, value: number, fractionDigits = 0): string {
  return new Intl.NumberFormat(formattingLocale(locale), {
    style: 'percent',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value / 100);
}

/** Placeholder names a string uses, in the order they first appear. */
export function placeholdersIn(template: string): string[] {
  const names = new Set<string>();
  for (const match of template.matchAll(/\{(\w+)\}/g)) names.add(match[1]);
  return [...names];
}

/**
 * Substitutes `{name}` placeholders. An unknown placeholder is left verbatim
 * rather than replaced with "undefined", so a mistake shows up as an obviously
 * broken string in review instead of a plausible-looking wrong one.
 */
export function format(
  template: string,
  values: Record<string, string | number> = {}
): string {
  return template.replace(/\{(\w+)\}/g, (whole, name: string) =>
    name in values ? String(values[name]) : whole
  );
}

// ---------------------------------------------------------------------------
// Plurals
// ---------------------------------------------------------------------------
//
// A count-dependent string is a record keyed by CLDR plural category, and the
// category is chosen by `Intl.PluralRules` for the active locale — never by a
// `count === 1` ternary.
//
// This matters because the number of forms is a property of the language, not
// of the string. English and German have two; Russian has four (1 книга,
// 2 книги, 5 книг, 1.5 книги), Polish three, Arabic six. A `one`/`other` pair
// is wrong roughly two thirds of the time in Russian, and the mistake is
// invisible to every other test we have, because both forms are present and
// neither is empty.
//
// A locale only supplies the categories its language actually uses: `other` is
// required, the rest are optional, and `dictionary.test.ts` enforces exactly
// that rather than plain key parity. `Intl.PluralRules` ships with Node and
// every browser we support, so this needs no dependency.

/** The CLDR plural categories, in the order the spec lists them. */
export const PLURAL_CATEGORIES = ['zero', 'one', 'two', 'few', 'many', 'other'] as const;
export type PluralCategory = (typeof PLURAL_CATEGORIES)[number];

/**
 * A count-dependent string. `other` is the only required form: it is the one
 * every language has, and it is what a missing category falls back to.
 */
export type PluralForms = { other: string } & Partial<Record<PluralCategory, string>>;

const isPluralCategory = (key: string): key is PluralCategory =>
  (PLURAL_CATEGORIES as readonly string[]).includes(key);

/**
 * Whether a value is a plural record: every key is a CLDR category and `other`
 * is present. The `Translated<>` type below applies the same rule, so a record
 * shaped this way is automatically treated as a plural everywhere — there is no
 * marker to remember to add.
 */
export function isPluralForms(value: unknown): value is PluralForms {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const keys = Object.keys(value as object);
  return (
    keys.length > 0 &&
    keys.every((key) => isPluralCategory(key)) &&
    typeof (value as Record<string, unknown>).other === 'string'
  );
}

/**
 * The type-level twin of `isPluralForms()` above. They live in one file because
 * they have to agree: a record the runtime treats as a plural and the type does
 * not would compile and then render the wrong form.
 */
type IsPluralForms<T> = [keyof T] extends [PluralCategory]
  ? 'other' extends keyof T
    ? true
    : false
  : false;

/**
 * Widens the literal types `as const` produced back to `string`, recursively,
 * so a translation is not required to be byte-identical to the English source
 * to type-check.
 *
 * This is what turns an English source object into the shape every other locale
 * must satisfy — `Dictionary` in dictionaries/en.ts, and each game's
 * `<Game>Messages` in src/core-engine/config/games/.
 *
 * Plural records are the one exception to "every locale has exactly the same
 * keys": how many forms a count-dependent string has is a property of the
 * language, not of the string. Only `other` is required; a locale supplies the
 * categories it actually uses. English and German need `one` and `other`;
 * Russian will add `few` and `many` to the same keys without touching the
 * English source.
 */
export type Translated<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly Translated<U>[]
    : IsPluralForms<T> extends true
      ? PluralForms
      : { readonly [K in keyof T]: Translated<T[K]> };

const rulesByLocale = new Map<string, Intl.PluralRules>();
const rulesFor = (locale: string): Intl.PluralRules => {
  let rules = rulesByLocale.get(locale);
  if (!rules) {
    rules = new Intl.PluralRules(locale);
    rulesByLocale.set(locale, rules);
  }
  return rules;
};

/** The form `count` selects in `locale`, falling back to `other`. */
export function selectPlural(locale: string, forms: PluralForms, count: number): string {
  return forms[rulesFor(locale).select(count)] ?? forms.other;
}

/**
 * Picks the plural form and interpolates it. `{count}` is filled in for you,
 * because every count-dependent string wants it; pass `values` for anything
 * else the sentence needs.
 */
export function formatPlural(
  locale: string,
  forms: PluralForms,
  count: number,
  values: Record<string, string | number> = {}
): string {
  return format(selectPlural(locale, forms, count), { count, ...values });
}
