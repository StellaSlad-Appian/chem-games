// src/lib/chem-text.ts
//
// Finds the chemical formulae in a line of prose, so ChemText can typeset
// them ("sulfate SO4 2− vs sulfite SO3 2−", "ammonium, NH4+") and leave every
// other character of the sentence exactly as it was written.
//
// The cheat-sheet prose is in six languages and full of things that look a
// little like formulae and are not: Spanish "NO", Italian "I", "pH", group
// numbers ("Gruppe 1 → +1"), isotope names ("U-238", "Kohlenstoff-14"), IUPAC
// names ("propan-2-ol"), arithmetic ("2 × 1 + 16 = 18"), units, and suffixes
// ("-ate", "„Per-…-at“"). So the rule is narrow on purpose:
//
//   1. A word is split into punctuation before it, a *core*, and punctuation
//      after it. The core may be followed by a hyphenated compound
//      ("H+-Konzentration", "CO2-Molekül"), but by nothing else: "U-238",
//      "Cl-35" and "Kohlenstoff-12" are rejected outright.
//   2. The core must read cleanly through MoleculeText's own parser
//      (src/components/ui/formula-parser.ts) — every symbol a real element
//      symbol (checked against ELEMENTS_REGISTRY), brackets balanced, nothing
//      left over as a plain character.
//   3. It must contain a digit or a charge. "CO", "HCl", "Fe" stay plain: they
//      would render identically anyway, and demanding a digit is what keeps
//      "NO", "I", "In" and "As" out.
//   4. A separate charge word ("2−", "3+") right after a formula word, with a
//      single space between, joins it: "SO4 2−", "Fe 3+" — MoleculeText's
//      convention for a charge with digits.
//   5. A run of formula words joined by "+" and at least one "→" is one
//      equation ("Mg + 2HCl → MgCl2 + H2"), so the "Mg" in it is typeset with
//      the rest; it needs one member with a digit or charge, so "A + B → AB"
//      and "Group 2 → +2" never qualify.
//
// Anything already written with Unicode sub/superscripts (H₂O, Cr₂O₇²⁻) is
// not matched by rule 2 and is left alone.

import { ELEMENTS_REGISTRY } from '@/core-engine/data/elements';
import { parseFormula } from '@/components/ui/formula-parser';

export type ChemTextSegment =
  | { type: 'text'; value: string }
  | { type: 'formula'; value: string };

const ELEMENT_SYMBOLS: ReadonlySet<string> = new Set(ELEMENTS_REGISTRY.map((e) => e.symbol));

/** "−" is U+2212, the minus the prose uses; "-" is MoleculeText's ASCII one. */
const SIGN = '+\\-\u2212';
const HYPHENS = '-\u2011';

/**
 * Punctuation that may come before a formula: brackets and quotes, a bond
 * dash ("–NH2"), an elided article ("l’NO2"), or the "n(" / "m(" of an amount
 * or a mass ("n(H2O)").
 */
const PREFIX = new RegExp(
  `^(?:[(\\[„“"«‘'–—]|\\p{Ll}+[’'](?=[\\dA-Z(])|\\p{Ll}\\((?=[\\dA-Z]))*`,
  'u'
);

/** The widest run of characters a formula core can be made of. */
const CORE = new RegExp(`^\\d*(?:[A-Z][a-z]?|[()]|\\d+)+(?:\\d*[${SIGN}])?`);

/** Punctuation that may follow a formula. */
const SUFFIX = /^[)\].,;:!?…»“”"’']*$/;

/** A hyphenated compound: "-Konzentration", "-Molekül". */
const COMPOUND = new RegExp(`^[${HYPHENS}]\\p{L}`, 'u');

/** A charge written as its own word, "2−" or "3+", with trailing punctuation. */
const CHARGE_WORD = new RegExp(`^(\\d+[${SIGN}])([)\\].,;:!?…»“”"’']*)$`);

const OPERATORS = new Set(['+', '→', '->']);
const ARROWS = new Set(['→', '->']);

/** One space between two words of a formula; a no-break space counts. */
function isSpace(gap: string | undefined): boolean {
  return gap !== undefined && /^[ \u00a0\u202f]$/.test(gap);
}

interface Unit {
  prefix: string;
  core: string;
  /** Plain text after the core: punctuation or a compound's "-Wort". */
  suffix: string;
  /** Reads as a formula: valid symbols only, at least one element. */
  shaped: boolean;
  /** Has a digit or a charge, so typesetting it changes how it looks. */
  qualifies: boolean;
  /** Index of the last word this unit consumed (a joined charge is a second word). */
  lastWord: number;
}

function count(text: string, ch: string): number {
  return text.split(ch).length - 1;
}

/**
 * Whether `core` is a formula MoleculeText can typeset: every token one the
 * parser recognises, every symbol a real element, and at least one element.
 */
function classifyCore(core: string): { shaped: boolean; qualifies: boolean } {
  const no = { shaped: false, qualifies: false };
  if (count(core, '(') !== count(core, ')')) return no;
  let depth = 0;
  for (const ch of core) {
    if (ch === '(') depth++;
    if (ch === ')' && --depth < 0) return no;
  }

  const tokens = parseFormula(core);
  let elements = 0;
  let qualifies = false;
  for (const [index, token] of tokens.entries()) {
    switch (token.type) {
      case 'symbol':
        if (token.value === '(' || token.value === ')') break;
        if (!ELEMENT_SYMBOLS.has(token.value)) return no;
        elements++;
        break;
      case 'coefficient':
        if (index !== 0) return no;
        qualifies = true;
        break;
      case 'subscript':
      case 'superscript':
        qualifies = true;
        break;
      case 'state':
        break;
      case 'text':
        // Only the space MoleculeText puts between "SO4" and "2−".
        if (token.value !== ' ') return no;
        break;
      default:
        return no;
    }
  }
  // "()" and a lone charge are not formulae.
  if (elements === 0) return no;
  return { shaped: true, qualifies };
}

/** Whether the "(" that opens `core` is closed by its very last character. */
function closesAtEnd(core: string): boolean {
  let depth = 0;
  for (let k = 0; k < core.length; k++) {
    if (core[k] === '(') depth++;
    if (core[k] === ')') depth--;
    if (depth === 0) return k === core.length - 1;
  }
  return false;
}

/** Splits one word into prefix / core / suffix, or returns undefined. */
function splitWord(word: string): { prefix: string; core: string; suffix: string } | undefined {
  let prefix = word.match(PREFIX)?.[0] ?? '';
  let rest = word.slice(prefix.length);
  // The prefix may have taken the "(" that opens a group ("(NH4)2SO4").
  // Hand leading "(" back; the balancing below returns any that are not
  // part of the formula.
  while (prefix.endsWith('(') && !/\p{Ll}\($/u.test(prefix)) {
    prefix = prefix.slice(0, -1);
    rest = `(${rest}`;
  }

  const match = rest.match(CORE);
  if (!match) return undefined;
  let core = match[0];
  let remainder = rest.slice(core.length);

  // "OH-Gruppe", "CO2-Molekül": the hyphen starts a compound, it is not a charge.
  if (/\p{L}/u.test(remainder[0] ?? '') && HYPHENS.includes(core.at(-1) ?? '')) {
    remainder = core.at(-1) + remainder;
    core = core.slice(0, -1);
  }

  // A ")" that closes a bracket opened before the formula is punctuation.
  while (count(core, ')') > count(core, '(') && core.endsWith(')')) {
    remainder = `)${remainder}`;
    core = core.slice(0, -1);
  }
  // A "(" that is never closed inside the formula is punctuation too.
  while (count(core, '(') > count(core, ')') && core.startsWith('(')) {
    prefix += '(';
    core = core.slice(1);
  }

  // "(H2O)" in "bent (H2O)." is a formula in prose brackets, not a group.
  while (core.startsWith('(') && closesAtEnd(core)) {
    prefix += '(';
    remainder = `)${remainder}`;
    core = core.slice(1, -1);
  }

  if (!core) return undefined;
  if (SUFFIX.test(remainder) || COMPOUND.test(remainder)) {
    return { prefix, core, suffix: remainder };
  }
  return undefined;
}

/**
 * Reads the unit that starts at `words[i]`, joining a charge word after it
 * ("SO4" + "2−") when the two are separated by a single space.
 */
function readUnit(words: string[], i: number): Unit | undefined {
  const split = splitWord(words[i]);
  if (!split) return undefined;
  let { core, suffix } = split;
  let lastWord = i;

  const gap = words[i + 1];
  const next = words[i + 2];
  if (suffix === '' && isSpace(gap) && next !== undefined) {
    const charge = next.match(CHARGE_WORD);
    if (charge) {
      const joined = `${core} ${charge[1]}`;
      if (classifyCore(joined).shaped) {
        core = joined;
        suffix = charge[2];
        lastWord = i + 2;
      }
    }
  }

  const { shaped, qualifies } = classifyCore(core);
  return { prefix: split.prefix, core, suffix, shaped, qualifies, lastWord };
}

/**
 * Splits prose into plain text and formula segments. Joining the values
 * back together gives the input exactly.
 */
export function segmentChemText(text: string): ChemTextSegment[] {
  // Words and the whitespace between them, alternating; words at even indices.
  const words = text.split(/(\s+)/);
  const segments: ChemTextSegment[] = [];
  let plain = '';

  const pushText = (value: string) => {
    plain += value;
  };
  const pushFormula = (value: string) => {
    if (plain) segments.push({ type: 'text', value: plain });
    plain = '';
    segments.push({ type: 'formula', value });
  };

  let i = 0;
  while (i < words.length) {
    if (i % 2 === 1) {
      pushText(words[i]);
      i++;
      continue;
    }

    const first = readUnit(words, i);
    if (!first || !first.shaped) {
      pushText(words[i]);
      i++;
      continue;
    }

    // Try to extend into an equation: unit (op unit)+, single spaces only.
    const run: Unit[] = [first];
    const ops: string[] = [];
    let end = first.lastWord;
    while (run.at(-1)!.suffix === '') {
      const op = words[end + 2];
      if (!isSpace(words[end + 1]) || !op || !OPERATORS.has(op) || !isSpace(words[end + 3])) break;
      const unit = readUnit(words, end + 4);
      if (!unit || !unit.shaped || unit.prefix !== '') break;
      ops.push(op);
      run.push(unit);
      end = unit.lastWord;
    }
    // An equation needs an arrow somewhere; drop members after the last one
    // only if there is none at all ("CO2 + H2O" is two formulae, not one).
    const isEquation =
      run.length > 1 && ops.some((op) => ARROWS.has(op)) && run.some((u) => u.qualifies);
    const last = isEquation ? run.at(-1)! : first;

    if (isEquation || first.qualifies) {
      // The formula is the words themselves, minus the punctuation around
      // them, so every space and character of the source survives.
      const source = words.slice(i, last.lastWord + 1).join('');
      pushText(first.prefix);
      pushFormula(source.slice(first.prefix.length, source.length - last.suffix.length));
      pushText(last.suffix);
      i = last.lastWord + 1;
      continue;
    }

    pushText(words[i]);
    i++;
  }
  if (plain) segments.push({ type: 'text', value: plain });
  return segments;
}

/** The formulae ChemText would typeset in `text`, in order. */
export function detectFormulas(text: string): string[] {
  return segmentChemText(text)
    .filter((segment) => segment.type === 'formula')
    .map((segment) => segment.value);
}
