// src/i18n/format.ts
//
// The one interpolation primitive the dictionaries use. Keeping it to a single
// `{name}` syntax is what makes the placeholder-parity test in
// `src/i18n/dictionary.test.ts` possible: a translator who drops or renames a
// placeholder fails the suite instead of shipping a literal "{count}" to a
// student.

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

/**
 * Chooses between a singular and a plural form.
 *
 * English and German share the same two-form rule (one vs. everything else), so
 * a pair of strings is enough for Phase 1. It deliberately is *not* enough for
 * Phase 2: Russian needs three forms (one / few / many) and picks between them
 * with a rule on the last one and two digits. When Russian lands, replace the
 * call sites with `Intl.PluralRules(locale).select(count)` over a
 * `Record<Intl.LDMLPluralRule, string>` shaped dictionary entry — see
 * `docs/i18n/README.md` § Plurals. Every current call site is listed there so
 * the migration is mechanical.
 */
export function plural(count: number, forms: { one: string; other: string }): string {
  return count === 1 ? forms.one : forms.other;
}
