// scripts/i18n-review.ts
//
// Generates docs/i18n/<locale>-review.md for every translated locale: every
// translated UI string side by side with its English source, plus a confidence
// rating and a note. That includes the two games whose copy lives in a per-game
// catalogue rather than in the dictionary — a reviewer should not have to know
// where a string is stored.
//
//   npm run i18n:review
//
// Generated rather than hand-written for one reason: a hand-written table of a
// thousand rows is stale the first time anybody edits a string, and a stale
// review table is worse than no table, because it looks like the strings were
// reviewed. The judgement in it — the confidence column, the notes and the
// prose assessment at the end — is hand-written in src/i18n/review-notes.ts.
// Only the mechanical part is generated.
//
// A property worth preserving: because the table is read from the
// dictionaries, an *unchanged* review file proves no copy changed. Adding a
// locale here must therefore leave the other locales' files byte-identical,
// which is why each locale's header is written out in full rather than
// assembled from fragments that a rewording could shift.
//
// Runs on Node's built-in TypeScript type stripping (Node >= 22.6), so it needs
// no loader and no new dependency. Keep it free of anything the stripper
// refuses: no enums, no namespaces, no parameter properties, and type-only
// imports must say `import type`.

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { en } from '../src/i18n/dictionaries/en.ts';
import { de } from '../src/i18n/dictionaries/de.ts';
import { fr } from '../src/i18n/dictionaries/fr.ts';
import { REACTION_BALANCER_MESSAGES } from '../src/core-engine/config/games/reaction-balancer-messages.ts';
import { LEWIS_STRUCTURES_MESSAGES } from '../src/core-engine/config/games/lewis-structures-messages.ts';
import { de as balancerDe } from '../src/i18n/game-messages/reaction-balancer/de.ts';
import { de as lewisDe } from '../src/i18n/game-messages/lewis-structures/de.ts';
import { fr as balancerFr } from '../src/i18n/game-messages/reaction-balancer/fr.ts';
import { fr as lewisFr } from '../src/i18n/game-messages/lewis-structures/fr.ts';
import { es } from '../src/i18n/dictionaries/es.ts';
import { es as balancerEs } from '../src/i18n/game-messages/reaction-balancer/es.ts';
import { es as lewisEs } from '../src/i18n/game-messages/lewis-structures/es.ts';
import { REVIEW_NOTES, REVIEW_SUMMARY } from '../src/i18n/review-notes.ts';
import type { Confidence } from '../src/i18n/review-notes.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

type Entry = [path: string, value: string];

/** Every leaf string as a dot-path; arrays get an [index] segment. */
function flatten(value: unknown, prefix = ''): Entry[] {
  if (typeof value === 'string') return [[prefix, value]];
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

/**
 * The most specific note whose prefix matches. An unmatched path is reported as
 * medium with a generic note rather than silently omitted — an unrated string
 * should look unrated.
 */
function noteFor(locale: string, path: string): { confidence: Confidence; note: string } {
  const rules = REVIEW_NOTES[locale] ?? [];
  let best: (typeof rules)[number] | null = null;
  for (const rule of rules) {
    if (!path.startsWith(rule.prefix)) continue;
    if (!best || rule.prefix.length > best.prefix.length) best = rule;
  }
  return best ?? { confidence: 'medium', note: 'No specific note; reviewed as ordinary UI copy.' };
}

/**
 * Markdown table cells cannot contain a raw pipe or newline. Both no-break
 * spaces are marked: German needs U+00A0 before a unit and inside "z. B.";
 * French needs U+202F before ; ! ? and inside « », and U+00A0 before :. All of
 * them are invisible in a table and all of them matter to the reviewer.
 */
const cell = (value: string) =>
  value
    .replace(/\|/g, '\\|')
    .replace(/\n/g, ' ')
    .replace(/[  ]/g, '·');

/**
 * The two games whose copy lives in a per-game catalogue rather than in the
 * dictionary (docs/i18n/GAMES.md § Catalogue layout). They are mounted back at
 * the dot-paths they used to have, so `review-notes.ts` prefixes, this table
 * and the links into it all keep pointing at the same keys — where a string
 * *lives* changed; which string a reviewer is looking at did not.
 */
const CATALOGUE_SOURCES = [
  ['games.reactionBalancer', REACTION_BALANCER_MESSAGES],
  ['games.lewisStructures', LEWIS_STRUCTURES_MESSAGES],
] as const;

interface LocaleInput {
  dictionary: unknown;
  catalogues: readonly unknown[];
  /** Full header, so adding a locale cannot reflow another locale's file. */
  header: (total: number, counts: Record<Confidence, number>) => string;
}

const LOCALES_TO_REVIEW: Record<string, LocaleInput> = {
  de: {
    dictionary: de,
    catalogues: [balancerDe, lewisDe],
    header: (total, counts) => `<!--
  GENERATED FILE - do not edit by hand.
  Regenerate with:  npm run i18n:review
  The confidence ratings, the notes and the assessment at the end come from
  src/i18n/review-notes.ts; edit them there. Everything else is read from the
  dictionaries, so this table cannot drift from what the site actually says.
-->

# German translation review

Every UI string on the site, with its English source and its German
translation, so a native speaker or a chemistry teacher can review the German
without reading any code.

**${total} strings** — ${counts.high} high confidence,
${counts.medium} medium, ${counts.low} low.

The confidence column is a judgement about *this* translation, not about German
in general:

- **high** — ordinary UI copy, or a term fixed in [\`glossary-de.md\`](./glossary-de.md). Low risk.
- **medium** — correct as far as I can tell, but a native speaker may prefer a
  different word, or the register may be slightly off for a 14-year-old. Worth a
  read; not urgent.
- **low** — I am genuinely unsure. Please have a native speaker or a chemistry
  teacher check these before the German site goes in front of students.

The chemistry names and the cheat-sheet prose are **not** in this table — they
are keyed by registry identifier rather than by dictionary path, and they are
assessed as bodies of work in [the section at the end](#chemistry-names--srci18nchemistry-namesdets).

A note on reading the table: \`·\` marks a non-breaking space, which German
typography needs before units and inside "z. B." and which is otherwise
invisible here.

---

## UI strings

`,
  },
  fr: {
    dictionary: fr,
    catalogues: [balancerFr, lewisFr],
    header: (total, counts) => `<!--
  GENERATED FILE - do not edit by hand.
  Regenerate with:  npm run i18n:review
  The confidence ratings, the notes and the assessment at the end come from
  src/i18n/review-notes.ts; edit them there. Everything else is read from the
  dictionaries, so this table cannot drift from what the site actually says.
-->

# French translation review

Every UI string on the site, with its English source and its French
translation, so a native speaker or a chemistry teacher can review the French
without reading any code.

**${total} strings** — ${counts.high} high confidence,
${counts.medium} medium, ${counts.low} low.

The confidence column is a judgement about *this* translation, not about French
in general:

- **high** — ordinary UI copy, or a term fixed in [\`glossary-fr.md\`](./glossary-fr.md). Low risk.
- **medium** — correct as far as I can tell, but a native speaker may prefer a
  different word, or the register may be slightly off for a 14-year-old. Worth a
  read; not urgent.
- **low** — I am genuinely unsure. Please have a native speaker or a chemistry
  teacher check these before the French site goes in front of students.

The chemistry names and the cheat-sheet prose are **not** in this table — they
are keyed by registry identifier rather than by dictionary path, and they are
assessed as bodies of work in [the section at the end](#chemistry-names--srci18nchemistry-namesfrts).

**The first thing to decide** is the one that touches every other row: the site
addresses the reader as **tu**. French school material often uses *vous*. That
decision is argued at the top of [\`glossary-fr.md\`](./glossary-fr.md); if it
goes the other way, almost every imperative below changes.

A note on reading the table: \`·\` marks a no-break space. French typography
needs a narrow one (U+202F) before \`;\` \`!\` \`?\` and inside \`« »\`, and a full
one (U+00A0) before \`:\`. Both are otherwise invisible here.

---

## UI strings

`,
  },
  es: {
    dictionary: es,
    catalogues: [balancerEs, lewisEs],
    header: (total, counts) => `<!--
  GENERATED FILE - do not edit by hand.
  Regenerate with:  npm run i18n:review
  The confidence ratings, the notes and the assessment at the end come from
  src/i18n/review-notes.ts; edit them there. Everything else is read from the
  dictionaries, so this table cannot drift from what the site actually says.
-->

# Spanish translation review

Every UI string on the site, with its English source and its Spanish
translation, so a native speaker or a chemistry teacher can review the Spanish
without reading any code.

**${total} strings** — ${counts.high} high confidence,
${counts.medium} medium, ${counts.low} low.

The confidence column is a judgement about *this* translation, not about Spanish
in general:

- **high** — ordinary UI copy, or a term fixed in [\`glossary-es.md\`](./glossary-es.md). Low risk.
- **medium** — correct as far as I can tell, but a native speaker may prefer a
  different word, or the register may be slightly off for a 14-year-old. Worth a
  read; not urgent.
- **low** — I am genuinely unsure. Please have a native speaker or a chemistry
  teacher check these before the Spanish site goes in front of students.

The chemistry names and the cheat-sheet prose are **not** in this table — they
are keyed by registry identifier rather than by dictionary path, and they are
assessed as bodies of work in [the section at the end](#chemistry-names--srci18nchemistry-namesests).

**The first thing to decide** is the one that touches every other row: this is
**es-ES**, peninsular Spanish. There is no variety-neutral Spanish, so shipping
under a plain \`es\` tag is still a choice, and roughly nine Spanish speakers in
ten are not in Spain. The decision is argued at the top of
[\`glossary-es.md\`](./glossary-es.md), which also lists the eight words that
would have to change for es-419 — *ajustar* vs *balancear* for balancing an
equation, and *chuleta* vs *acordeón* / *torpedo* / *machete* for a cheat sheet,
being the two a reader would notice first. Everything else was deliberately
written in wording both sides accept.

A note on reading the table: Spanish needs none of the no-break-space marking
German and French do, so a \`·\` will not appear. What to watch for instead is
the opening \`¿\` and \`¡\` — mandatory in Spanish, and an error rather than a
style choice when missing.

---

## UI strings

`,
  },
};

const sourceEntries = [
  ...flatten(en),
  ...CATALOGUE_SOURCES.flatMap(([prefix, english]) => flatten(english, prefix)),
];

for (const [locale, input] of Object.entries(LOCALES_TO_REVIEW)) {
  const targetMap = new Map([
    ...flatten(input.dictionary),
    ...input.catalogues.flatMap((translated, index) =>
      flatten(translated, CATALOGUE_SOURCES[index][0])
    ),
  ]);

  const counts: Record<Confidence, number> = { high: 0, medium: 0, low: 0 };
  for (const [path] of sourceEntries) counts[noteFor(locale, path).confidence] += 1;

  const byNamespace = new Map<string, Entry[]>();
  for (const entry of sourceEntries) {
    const namespace = entry[0].split(/[.[]/)[0];
    const bucket = byNamespace.get(namespace);
    if (bucket) bucket.push(entry);
    else byNamespace.set(namespace, [entry]);
  }

  const columnTitle = locale === 'de' ? 'German' : 'French';
  const sections = [...byNamespace].map(([namespace, entries]) => {
    const rows = entries.map(([path, english]) => {
      const translated = targetMap.get(path) ?? '**(MISSING)**';
      const { confidence, note } = noteFor(locale, path);
      return `| \`${path}\` | ${cell(english)} | ${cell(translated)} | ${confidence} | ${cell(note)} |`;
    });
    return [
      `### \`${namespace}\``,
      '',
      `| Key | English | ${columnTitle} | Confidence | Notes |`,
      '|---|---|---|---|---|',
      ...rows,
      '',
    ].join('\n');
  });

  const outputPath = join(root, `docs/i18n/${locale}-review.md`);
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(
    outputPath,
    input.header(sourceEntries.length, counts) +
      sections.join('\n') +
      (REVIEW_SUMMARY[locale] ?? ''),
    'utf8'
  );

  console.log(
    `Wrote docs/i18n/${locale}-review.md — ${sourceEntries.length} strings ` +
      `(${counts.high} high / ${counts.medium} medium / ${counts.low} low)`
  );
}
