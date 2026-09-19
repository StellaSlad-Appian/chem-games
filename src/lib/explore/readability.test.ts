// src/lib/explore/readability.test.ts
//
// The Explore entries are read by Year 10 students, and the first draft of the
// English came in at Flesch–Kincaid grade 9.4 — at their grade level rather
// than comfortably below it, and three grades above the reading age ~12 that
// docs/AGENT_INSTRUCTIONS.md asks of the games. Measuring it showed the cause
// was sentence length, not vocabulary: 36 sentences ran over 30 words, the
// longest 46, while four-syllable words were rare and mostly unavoidable
// (molecule, carboxylic). Splitting those 36 took the English to FK 8.4 without
// losing a single fact.
//
// This test keeps it there. It is the only automated readability gate the repo
// has, and it exists because the alternative — "remember to keep sentences
// short" in a brief — did not survive first contact with 200 prose blocks.
//
// ## Why the limit differs per language
//
// A flat 30-word rule would be wrong for the Romance locales: French, Spanish
// and Italian need more words for the same idea, so an identical limit would
// force choppy, unidiomatic prose — worse writing, not easier reading. The
// limits below are the English 30 scaled by each locale's measured length
// ratio against the English pool (fr 1.125, es 1.110, it 1.088, de 0.946), so
// every language is held to the same standard rather than the same number.
//
// Re-derive the ratios if the pool grows a lot; do not simply raise a limit
// because a new entry fails. The failure message names the entry and the
// sentence, and splitting it is nearly always the right fix.

import { describe, expect, it } from 'vitest';
import { EXPLORE_MOLECULES } from './molecules';
import { EXPLORE_SCIENTISTS } from './scientists';
import { EXPLORE_OVERLAY_DE } from '@/i18n/explore/de';
import { EXPLORE_OVERLAY_FR } from '@/i18n/explore/fr';
import { EXPLORE_OVERLAY_ES } from '@/i18n/explore/es';
import { EXPLORE_OVERLAY_IT } from '@/i18n/explore/it';
import { LOCALES, type Locale } from '@/i18n/config';
import type { ExploreOverlay } from '@/i18n/explore';

/** Maximum words in one sentence, per locale. See the header for the derivation. */
const MAX_SENTENCE_WORDS: Record<Locale, number> = {
  en: 30,
  de: 28,
  fr: 34,
  es: 33,
  it: 33,
};

/**
 * Splits prose into sentences.
 *
 * The lookbehind alone would break German and Italian dates — "Am 8. April
 * 1982", "il 4. secolo" — so a one- or two-digit number followed by a full stop
 * and a letter is masked first. The digit run is capped at two deliberately: a
 * year ("Sony nel 1991. Yoshino ha diviso…") is a real sentence break, and an
 * earlier version of this splitter that allowed any digit run silently glued
 * three pairs of sentences together and reported them as over-long.
 */
function sentences(text: string): string[] {
  return text
    .replace(/(?<!\d)(\d{1,2})\.(\s+\p{L})/gu, '$1\uE000$2')
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.replace(/\uE000/g, '.').trim())
    .filter((s) => s.length > 1);
}

const wordCount = (sentence: string): number => sentence.split(/\s+/).filter(Boolean).length;

/** Every prose field in one locale, labelled so a failure says where to look. */
function prose(locale: Locale): Array<{ where: string; text: string }> {
  // Typed as ExploreOverlay so the id lookups below are index signatures
  // rather than the literal shapes each file happens to have; `en` has no
  // overlay and reads the English pool directly.
  const overlays: Partial<Record<Locale, ExploreOverlay>> = {
    de: EXPLORE_OVERLAY_DE,
    fr: EXPLORE_OVERLAY_FR,
    es: EXPLORE_OVERLAY_ES,
    it: EXPLORE_OVERLAY_IT,
  };
  const overlay = overlays[locale];

  const out: Array<{ where: string; text: string }> = [];

  for (const molecule of EXPLORE_MOLECULES) {
    for (const field of ['everyday', 'chemistry'] as const) {
      const text = overlay ? overlay.molecules[molecule.id]?.[field] : molecule[field];
      if (text) out.push({ where: `molecules.${molecule.id}.${field}`, text });
    }
  }

  for (const scientist of EXPLORE_SCIENTISTS) {
    for (const field of ['work', 'legacy', 'credit'] as const) {
      const text = overlay ? overlay.scientists[scientist.id]?.[field] : scientist[field];
      if (text) out.push({ where: `scientists.${scientist.id}.${field}`, text });
    }
  }

  return out;
}

describe('Explore prose stays readable', () => {
  for (const locale of LOCALES) {
    it(`${locale}: no sentence runs longer than ${MAX_SENTENCE_WORDS[locale]} words`, () => {
      const limit = MAX_SENTENCE_WORDS[locale];
      const tooLong: string[] = [];

      for (const { where, text } of prose(locale)) {
        for (const sentence of sentences(text)) {
          const words = wordCount(sentence);
          if (words > limit) tooLong.push(`${where} (${words} words): ${sentence}`);
        }
      }

      expect(
        tooLong,
        `These sentences are longer than ${limit} words, which is this locale's limit.\n` +
          `Split them at a natural joint rather than raising the limit — sentence length is ` +
          `what sets the reading grade here, and every fact fits in two sentences as ` +
          `comfortably as one.\n\n${tooLong.join('\n\n')}`
      ).toEqual([]);
    });
  }

  it('the English pool reads at or below Year 10 level', () => {
    // Flesch–Kincaid, on the English only: the formula's syllable counting is
    // tuned for English and means nothing applied to German compounds.
    const text = prose('en')
      .map(({ text: t }) => t)
      .join(' ')
      .replace(/`/g, '');

    const words = text.split(/\s+/).filter(Boolean);
    const sentenceCount = sentences(text).length;
    const syllables = words.reduce((total, word) => {
      const w = word.toLowerCase().replace(/[^a-z]/g, '');
      if (!w) return total;
      if (w.length <= 3) return total + 1;
      const trimmed = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '').replace(/^y/, '');
      return total + (trimmed.match(/[aeiouy]{1,2}/g)?.length || 1);
    }, 0);

    const grade =
      0.39 * (words.length / sentenceCount) + 11.8 * (syllables / words.length) - 15.59;

    // 10.0 is Year 10 grade level. Passing means the average student in the
    // target year can read this without it being work; the pool currently sits
    // near 8.4, so there is real headroom before this fails.
    expect(grade).toBeLessThan(10);
  });
});
