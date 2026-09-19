// src/test-utils/i18n-russian.ts
//
// The checks that only make sense for a Cyrillic locale, as plain functions.
//
// They live here, apart from the test that runs them, for one reason: Russian
// does not exist yet. A gate written ahead of its subject and left to sit
// dormant is a gate nobody ever proves works — and the first time it runs for
// real is the worst possible time to discover it never could have failed.
// Written this way, `cyrillic.test.ts` exercises every one of them against a
// fixture today and applies the same functions to the real files the day they
// land.
//
// What they are for: every other gate in src/i18n was written against a Latin
// locale and quietly assumes one. The parity gates catch a string left
// *byte-identical* to the English; they do not catch one that was edited
// slightly and left in English — "Reaction Balancer" → "Reaction Balancer!"
// passes everything. In a Latin language that is hard to see mechanically. In
// Russian it is trivial: the string has no Cyrillic in it.
//
// Three untranslated-English strings have already shipped here and were each
// found by a person looking at a rendered page: the `SYNTHESIS` reaction
// badge, the privacy effective date, and a debug panel.

import { flatten, type Entry } from './i18n-parity';

/** One thing that is wrong with one string. */
export interface Finding {
  path: string;
  value: string;
  detail: string;
}

const CYRILLIC = /\p{Script=Cyrillic}/u;

/**
 * Runs of three or more Latin letters.
 *
 * Three is a deliberate floor, and it is a trade with a known cost. Below it
 * sit the things Russian chemistry writes in Latin and writes constantly —
 * element symbols (Na, He, Mg), the state symbols `(s) (l) (g) (aq)`, `pH` —
 * and exempting each of those by key would be dozens of allowlist entries
 * for no gain.
 *
 * **What it therefore misses: a one- or two-letter English word left behind,
 * such as the "of" in "Уровень 3 of 5".** That is a real gap, stated here
 * rather than hidden, and `cyrillic.test.ts` pins it as a known limit so
 * nobody assumes coverage this does not have. It is a narrow gap: all three
 * untranslated-English strings that have actually shipped on this site
 * (`SYNTHESIS`, `14 September 2026`, the debug panel's labels) are well over
 * three letters, as is every whole phrase left untranslated.
 */
const LATIN_RUN = /\p{Script=Latin}{3,}/gu;

/**
 * An interpolation placeholder: `{count}`, `{elementInSentence}`.
 *
 * **Removed before the Latin-run check, and that is not a convenience.** A
 * placeholder name is an identifier in the source, never text a reader sees:
 * `format()` has substituted it long before the string reaches a page. Left
 * in, it is a Latin run of three or more letters in almost every interpolated
 * string, so the gate reported 40 findings on its first real run — every
 * a11y label, every coach line, every progress readout — and the only way to
 * make it quiet would have been an allowlist covering most of the catalogue.
 * That is the shape of a gate nobody keeps.
 *
 * Found the first time this gate ran against real Russian files; the fixture
 * in cyrillic.test.ts had none, so nothing exercised it before.
 */
const PLACEHOLDER = /\{[a-zA-Z0-9_]+\}/g;

const find = (entries: Entry[], test: (value: string) => string | null): Finding[] =>
  entries.flatMap((entry) => {
    const detail = test(entry.value);
    return detail === null ? [] : [{ path: entry.path, value: entry.value, detail }];
  });

/** Strings with no Cyrillic in them at all. */
export function stringsWithoutCyrillic(tree: unknown): Finding[] {
  return find(flatten(tree), (value) =>
    CYRILLIC.test(value) ? null : 'no Cyrillic character'
  );
}

/**
 * Runs of Latin letters inside otherwise-Russian copy.
 *
 * Stricter than the check above and the one that catches a *partly*
 * translated string: "Уровень 3 of 5" has Cyrillic in it and passes the first
 * check cleanly.
 */
export function latinRunsIn(tree: unknown): Finding[] {
  return find(flatten(tree), (value) => {
    const runs = value.replace(PLACEHOLDER, ' ').match(LATIN_RUN);
    return runs ? `Latin run(s): ${runs.join(', ')}` : null;
  });
}

// ---------------------------------------------------------------------------
// Typography
// ---------------------------------------------------------------------------
//
// Four conventions a translator working inside an English-shaped file gets
// wrong by reflex, none of which any existing gate can see. Cheap regexes,
// because the alternative is a reviewer reading a thousand table rows.

/**
 * Words where folding ё to е is a real hazard rather than a style choice.
 *
 * Russian print often writes е for ё, and for adult readers that is
 * defensible. For a chemistry site read by fourteen-year-olds it is not: ё is
 * always the stressed vowel, and it is the difference between *заряжённый*
 * and a word a learner will mispronounce. Listed rather than ruled, because
 * "should this е be ё" is not a question a regex can answer in general — only
 * for words this site cannot avoid.
 */
const FOLDED_YO: [RegExp, string][] = [
  [/заряженн/u, 'заряженный → заряжённый'],
  [/твердый|твердое|твердая|твердые/u, 'твердый → твёрдый'],
  // Participles that really do take ё. Each is listed, because the general
  // rule that used to stand here — `[а-я]енн(ый|ая|ое|ые|ого|ому)(?!\p{L})`
  // — is **not true of Russian**, and it fired on the Russian copy the first
  // day there was any. Most -енный adjectives are correctly spelled with е:
  // *неспаренный*, *пропущенный*, *полученный*, *отправленный*,
  // *современный*, *обыкновенный*. Only participles whose ending is stressed
  // take ё. The blanket rule flagged six correct words for every real one,
  // and one of the six was **неспаренный электрон** — the formal term this
  // locale's glossary is built on, so the rule as written made the required
  // terminology unshippable.
  //
  // This is the design the file's own header states ("listed rather than
  // ruled, because 'should this е be ё' is not a question a regex can answer
  // in general — only for words this site cannot avoid"). The general rule was
  // the one thing in the file that departed from it.
  //
  // Note the `(?!\p{L})` rather than a `\b`. `\b` is defined against
  // `[A-Za-z0-9_]`, so there is no boundary after a Cyrillic "й" and
  // `/-енный\b/` matches nothing at all — the same bug this branch fixes in
  // GlossaryTerm.tsx, met again while writing the gate for it.
  [
    /(привед|определ|раздел|соедин|раствор|провед|неподел|вовлеч|отнес)енн(ый|ая|ое|ые|ого|ому|ых|ыми)(?!\p{L})/u,
    '-енный participle → -ённый',
  ],
  // Words other than participles that this site cannot avoid and that a
  // translator working from an English-shaped file folds by reflex.
  [/(?<!\p{L})учен(ый|ые|ых|ым|ыми)(?!\p{L})/u, 'ученый → учёный'],
  [/(?<!\p{L})\p{L}*счет(?!\p{L})|(?<!\p{L})счета(?!\p{L})/u, 'счет → счёт'],
  [/(?<!\p{L})еще(?!\p{L})/u, 'еще → ещё'],
  [/желт(ый|ая|ое|ые|ого|о-)/u, 'желтый → жёлтый'],
  [/зелен(ый|ая|ое|ые|ого|о-)/u, 'зеленый → зелёный'],
  [/теплый|теплая|теплое|теплой|теплые/u, 'теплый → тёплый'],
  [/решетк/u, 'решетка → решётка'],
];

export const RUSSIAN_TYPOGRAPHY: { label: string; check: (value: string) => string | null }[] = [
  {
    label: 'quotes with « » rather than " "',
    // Russian's primary quotation marks are guillemets, with „ “ nested
    // inside. A straight ASCII double quote is the tell that a string was
    // typed rather than typeset. The French dictionary already follows the
    // same rule for its own « », so the pattern is established here.
    check: (value) => (/["“”]/u.test(value) ? 'straight or English quotation marks' : null),
  },
  {
    label: 'writes an ellipsis as one character',
    // … (U+2026), not three periods, which break at a line end.
    check: (value) => (value.includes('...') ? 'three periods instead of …' : null),
  },
  {
    label: 'writes ё rather than folding it to е',
    check: (value) => {
      const hit = FOLDED_YO.find(([pattern]) => pattern.test(value));
      return hit ? hit[1] : null;
    },
  },
  {
    label: 'uses a comma as the decimal separator',
    // 1,5 not 1.5. Formulae are exempt by construction: the lookbehind
    // ignores a digit-dot-digit that follows a Latin letter, so `H2O` and a
    // version number are not decimals.
    check: (value) =>
      /(?<![\p{Script=Latin}\d])\d+\.\d/u.test(value) ? 'decimal point instead of comma' : null,
  },
];

/** Every typography finding in a tree, across all four checks. */
export function typographyFindings(tree: unknown): Finding[] {
  const entries = flatten(tree);
  return RUSSIAN_TYPOGRAPHY.flatMap(({ label, check }) =>
    find(entries, check).map((finding) => ({ ...finding, detail: `${label}: ${finding.detail}` }))
  );
}

/** A finding, formatted for an assertion message. */
export const describeFinding = (f: Finding) => `${f.path} — ${f.detail} — ${JSON.stringify(f.value)}`;
