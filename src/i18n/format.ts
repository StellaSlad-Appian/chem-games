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

// There is deliberately no plural() helper here.
//
// The two count-dependent strings on the site pick their form with a ternary at
// the call site over a `…One` / `…Other` key pair, which is correct for English
// and German and wrong for Russian — Russian has three forms chosen by a rule on
// the last one and two digits. A helper here would only hard-code the two-form
// assumption in one more place and make it look solved.
//
// When Russian lands, those entries become a record keyed by CLDR plural
// category and the call sites use `Intl.PluralRules`. Both call sites are listed
// in docs/i18n/README.md § Plurals so the change is mechanical — and it has to
// happen before the Russian dictionary is written, not after.
