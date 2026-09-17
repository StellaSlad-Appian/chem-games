// src/i18n/plural.test.ts
//
// The plural mechanism, tested against languages the site does not ship yet.
//
// That is the point. A two-form design looks perfectly correct as long as the
// only locales in the suite are English and German, which both have two forms —
// the bug only appears when Russian is added, by which time the Russian
// dictionary has already been written against the wrong shape. These tests fail
// the moment the selection goes back to `count === 1`, so the design cannot
// regress quietly between now and then.

import { describe, expect, it } from 'vitest';
import {
  PLURAL_CATEGORIES,
  formatPlural,
  isPluralForms,
  selectPlural,
  type PluralForms,
} from './format';
import { en } from './dictionaries/en';
import { de } from './dictionaries/de';

describe('selectPlural', () => {
  const englishTopics: PluralForms = en.cheatSheets.count;

  it('picks one and other for English', () => {
    expect(selectPlural('en', englishTopics, 1)).toBe('{count} topic');
    expect(selectPlural('en', englishTopics, 0)).toBe('{count} topics');
    expect(selectPlural('en', englishTopics, 2)).toBe('{count} topics');
  });

  it('picks one and other for German', () => {
    expect(selectPlural('de', de.cheatSheets.count, 1)).toBe('{count} Thema');
    expect(selectPlural('de', de.cheatSheets.count, 3)).toBe('{count} Themen');
  });

  // The case a `one` / `other` pair gets wrong. Russian picks by the last one
  // and two digits, so 1 and 21 share a form, 2-4 and 22-24 share another, and
  // 5-20 share a third. A two-form design gets 2, 5 and 25 all wrong.
  it('picks one, few and many for Russian', () => {
    const books: PluralForms = {
      one: '{count} книга',
      few: '{count} книги',
      many: '{count} книг',
      other: '{count} книги',
    };
    const form = (n: number) => selectPlural('ru', books, n);

    expect(form(1)).toBe('{count} книга');
    expect(form(21)).toBe('{count} книга');
    expect(form(2)).toBe('{count} книги');
    expect(form(24)).toBe('{count} книги');
    expect(form(5)).toBe('{count} книг');
    expect(form(11)).toBe('{count} книг');
    expect(form(25)).toBe('{count} книг');

    // And the thing a two-form design cannot express at all: 1 and 2 differ,
    // and so do 2 and 5, so no pair of forms covers them.
    expect(new Set([form(1), form(2), form(5)]).size).toBe(3);
  });

  it('picks two for Welsh, a category neither English nor German has', () => {
    const cats: PluralForms = { one: 'un gath', two: 'ddwy gath', other: '{count} cath' };
    expect(selectPlural('cy', cats, 2)).toBe('ddwy gath');
    expect(selectPlural('cy', cats, 7)).toBe('{count} cath');
  });

  it('falls back to other for a category the locale has not supplied', () => {
    // A Russian dictionary part-way through translation: `many` is missing, so
    // the reader gets `other` rather than "undefined".
    const partial: PluralForms = { one: '{count} книга', other: '{count} книги' };
    expect(selectPlural('ru', partial, 5)).toBe('{count} книги');
  });

  it('uses only one form for a language that has only one', () => {
    const forms: PluralForms = { other: '{count} 冊' };
    expect(selectPlural('ja', forms, 1)).toBe('{count} 冊');
    expect(selectPlural('ja', forms, 9)).toBe('{count} 冊');
  });
});

describe('formatPlural', () => {
  it('fills in {count} without being asked', () => {
    expect(formatPlural('en', en.cheatSheets.count, 1)).toBe('1 topic');
    expect(formatPlural('en', en.cheatSheets.count, 12)).toBe('12 topics');
    expect(formatPlural('de', de.cheatSheets.count, 1)).toBe('1 Thema');
  });

  it('interpolates the rest of the sentence too', () => {
    const forms: PluralForms = {
      one: '{atom} still has {count} loner.',
      other: '{atom} still has {count} loners.',
    };
    expect(formatPlural('en', forms, 1, { atom: 'Oxygen' })).toBe('Oxygen still has 1 loner.');
    expect(formatPlural('en', forms, 2, { atom: 'Oxygen' })).toBe('Oxygen still has 2 loners.');
  });
});

describe('isPluralForms', () => {
  it('recognises a record keyed only by CLDR categories with an other form', () => {
    expect(isPluralForms({ one: 'a', other: 'b' })).toBe(true);
    expect(isPluralForms({ other: 'b' })).toBe(true);
    expect(isPluralForms({ one: 'a', few: 'b', many: 'c', other: 'd' })).toBe(true);
  });

  it('rejects anything else, so an ordinary namespace is never treated as a plural', () => {
    expect(isPluralForms({ one: 'a' })).toBe(false); // no `other`
    expect(isPluralForms({ other: 'a', title: 'b' })).toBe(false); // a non-category key
    expect(isPluralForms({})).toBe(false);
    expect(isPluralForms('other')).toBe(false);
    expect(isPluralForms(['other'])).toBe(false);
    expect(isPluralForms(null)).toBe(false);
  });

  it('covers every category Intl.PluralRules can return', () => {
    // If CLDR ever grew a category, this is where it would show up: the runtime
    // list and the type in dictionaries/en.ts are written from this one.
    expect([...PLURAL_CATEGORIES].sort()).toEqual(['few', 'many', 'one', 'other', 'two', 'zero']);
    for (const locale of ['en', 'de', 'ru', 'cy', 'ar', 'pl', 'ja']) {
      const seen = new Set<string>();
      for (let n = 0; n <= 120; n++) seen.add(new Intl.PluralRules(locale).select(n));
      for (const category of seen) expect(PLURAL_CATEGORIES).toContain(category);
    }
  });
});
