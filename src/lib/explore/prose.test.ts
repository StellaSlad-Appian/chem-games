// src/lib/explore/prose.test.ts
//
// The meta-description builder. Small, but it runs over 240 permalinks in six
// languages, and the failure mode is a search result that stops mid-clause.

import { describe, expect, it } from 'vitest';
import { openingSentences, sentences } from './prose';
import { EXPLORE_MOLECULES } from './molecules';
import { EXPLORE_SCIENTISTS } from './scientists';

describe('sentences', () => {
  it('splits on sentence-ending punctuation', () => {
    expect(sentences('One thing. Two things! Three?')).toEqual([
      'One thing.',
      'Two things!',
      'Three?',
    ]);
  });

  it('does not split a German or Italian ordinal date', () => {
    // "Am 8. April 1982" is one sentence. A naive lookbehind makes it two, and
    // then the description ends at "Am 8." — the same trap readability.test.ts
    // documents, and the reason both files mask the digit first.
    expect(sentences('Am 8. April 1982 gelang es. Danach ging es schnell.')).toEqual([
      'Am 8. April 1982 gelang es.',
      'Danach ging es schnell.',
    ]);
  });

  it('still treats a year followed by a capital as a real break', () => {
    expect(sentences('Sony nel 1991. Yoshino ha diviso il premio.')).toHaveLength(2);
  });
});

describe('openingSentences', () => {
  it('takes the first sentence alone when it already says enough', () => {
    const text =
      'Citric acid is what makes a lemon sharp, and it is around five per cent of lemon juice by weight. It is also the sour coating on sweets.';
    expect(openingSentences(text)).toBe(
      'Citric acid is what makes a lemon sharp, and it is around five per cent of lemon juice by weight.'
    );
  });

  it('adds a second sentence when the first is too short to be a description', () => {
    expect(openingSentences('It is a gas. It is made from nitrogen and hydrogen.')).toBe(
      'It is a gas. It is made from nitrogen and hydrogen.'
    );
  });

  it('never adds a third, however short they are', () => {
    expect(openingSentences('One. Two. Three. Four.')).toBe('One. Two.');
  });

  it('returns prose with no punctuation unchanged rather than empty', () => {
    expect(openingSentences('  a heading with no full stop  ')).toBe(
      'a heading with no full stop'
    );
  });

  it('never ends mid-word for any entry in the pool', () => {
    // The whole point: a description is whole sentences or it is nothing. No
    // ellipsis, no truncation, and nothing longer than about two sentences.
    for (const molecule of EXPLORE_MOLECULES) {
      const description = openingSentences(molecule.everyday);
      expect(description, molecule.id).toMatch(/[.!?]$/);
      expect(molecule.everyday.startsWith(description), molecule.id).toBe(true);
    }
    for (const scientist of EXPLORE_SCIENTISTS) {
      const description = openingSentences(scientist.work);
      expect(description, scientist.id).toMatch(/[.!?]$/);
      expect(scientist.work.startsWith(description), scientist.id).toBe(true);
    }
  });

  it('keeps every entry’s description a sensible length for a search result', () => {
    const lengths = [...EXPLORE_MOLECULES, ...EXPLORE_SCIENTISTS].map((entry) =>
      openingSentences('everyday' in entry ? entry.everyday : entry.work).length
    );
    // Not a hard SEO rule — search engines truncate what they like — but a
    // 400-character "description" is a paragraph, and a 20-character one says
    // nothing. Both would mean the sentence-picking had gone wrong.
    for (const length of lengths) {
      expect(length).toBeGreaterThan(30);
      expect(length).toBeLessThan(320);
    }
  });
});
