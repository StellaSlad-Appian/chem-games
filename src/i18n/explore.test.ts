// src/i18n/explore.test.ts
//
// AC-8. The Explore entries are overlays onto the English structure, so the
// five parity gates that guard the dictionary and the game catalogues guard
// these too — they are the same gates, imported from the same place, because a
// source that only got half of them is exactly the kind of thing nobody notices
// until a student reads a card in French and half of it is in English.
//
// On top of those, two things are specific to this content and worth their own
// assertions:
//
//   1. **A molecule's `name` must be present in an overlay exactly when it is
//      present in the English.** Five of the twenty are in COMPOUNDS_REGISTRY
//      and take their translated name from `chemistry-names/<locale>.ts`; an
//      overlay that "helpfully" adds a name for one of those creates a second
//      translation of the same compound, in a second file, free to disagree.
//   2. **Notation survives.** The shared parity check knows a handful of common
//      formulae; this content also carries `O3`, `N2`, `H2` and a whole balanced
//      equation in its prose, and a translator reaching for "2 Sauerstoff" in
//      the middle of an equation is the single most damaging mistake available
//      here.

import { describe, expect, it } from 'vitest';
import { describeTranslationParity } from '@/test-utils/i18n-parity';
import { EXPLORE_MOLECULES } from '@/lib/explore/molecules';
import { EXPLORE_SCIENTISTS } from '@/lib/explore/scientists';
import { DEFAULT_LOCALE, LOCALES, type Locale } from './config';
import { getDictionary } from './dictionaries';
import {
  EXPLORE_OVERLAYS,
  exploreLinkTarget,
  getExploreContent,
  localizeMolecule,
  localizeScientist,
  usesEnglishExploreProse,
  type ExploreOverlay,
} from './explore';

const translatedLocales = LOCALES.filter(
  (locale) => locale !== DEFAULT_LOCALE
) as Exclude<Locale, 'en'>[];

/**
 * The English, shaped exactly like an overlay.
 *
 * Built rather than written out, so it cannot drift from the pool: adding a
 * molecule adds a required key to every locale on the next run.
 */
const ENGLISH_OVERLAY: ExploreOverlay = {
  molecules: Object.fromEntries(
    EXPLORE_MOLECULES.map((molecule) => [
      molecule.id,
      {
        ...(molecule.name === undefined ? {} : { name: molecule.name }),
        everyday: molecule.everyday,
        chemistry: molecule.chemistry,
      },
    ])
  ),
  scientists: Object.fromEntries(
    EXPLORE_SCIENTISTS.map((scientist) => [
      scientist.id,
      {
        work: scientist.work,
        legacy: scientist.legacy,
        ...(scientist.credit === undefined ? {} : { credit: scientist.credit }),
      },
    ])
  ),
};

describeTranslationParity('explore', {
  source: ENGLISH_OVERLAY,
  translations: Object.fromEntries(
    translatedLocales.map((locale) => [locale, EXPLORE_OVERLAYS[locale]])
  ),
  /**
   * The only strings that may match the English, and they are all the *name*
   * of a molecule that the language in question genuinely spells the same way.
   *
   * Every one is listed individually, never as a pattern over a whole
   * namespace: the prose must always differ, and an exemption that covered
   * `molecules\..*` would silently excuse an untranslated paragraph.
   *
   * This list exists because the first drafts did the thing it is meant to
   * prevent. Three names came back glossed — "Kevlar (Aramid)",
   * "Artemisinin (Qinghaosu)", "Urea (carbamida)" — not because a German or
   * Spanish reader needs the gloss on a card heading, but because a bare
   * "Kevlar" would have failed this check. That is a worse outcome than the
   * check being relaxed: it puts a parenthesis on the page to satisfy a test.
   * The names are now plain and listed here.
   */
  identicalByDesign: {
    // A registered trade mark. Nobody translates a trade mark.
    de: [/^molecules\.kevlar\.name$/, /^molecules\.artemisinin\.name$/],
    fr: [/^molecules\.kevlar\.name$/],
    // *Carbamida* exists in Spanish and nobody says it.
    es: [/^molecules\.kevlar\.name$/, /^molecules\.urea\.name$/],
    // Italian happens to spell four of them exactly as English does — benzene,
    // urea and limonene are all straight from the same Latin and Greek roots.
    it: [
      /^molecules\.benzene\.name$/,
      /^molecules\.kevlar\.name$/,
      /^molecules\.urea\.name$/,
      /^molecules\.limonene\.name$/,
    ],
  },
});

describe('every locale has an overlay', () => {
  it('covers every locale in LOCALES except the default', () => {
    const missing = translatedLocales.filter((locale) => !EXPLORE_OVERLAYS[locale]);
    expect(missing).toEqual([]);
  });

  it('leaves English reading from the source data', () => {
    expect(usesEnglishExploreProse(DEFAULT_LOCALE)).toBe(true);
    for (const locale of translatedLocales) {
      expect(usesEnglishExploreProse(locale)).toBe(false);
    }
  });
});

describe.each(translatedLocales)('explore overlay shape: %s', (locale) => {
  const overlay = EXPLORE_OVERLAYS[locale]!;

  it('supplies a molecule name exactly when the English has one', () => {
    const wrong = EXPLORE_MOLECULES.filter((molecule) => {
      const hasEnglishName = molecule.name !== undefined;
      const hasOverlayName = overlay.molecules[molecule.id]?.name !== undefined;
      return hasEnglishName !== hasOverlayName;
    }).map((molecule) =>
      molecule.name === undefined
        ? `${molecule.id}: overlay adds a name, but the registry owns it (compoundId ${molecule.compoundId})`
        : `${molecule.id}: overlay is missing the name`
    );
    expect(wrong).toEqual([]);
  });

  it('supplies a credit line exactly when the English has one', () => {
    const wrong = EXPLORE_SCIENTISTS.filter(
      (scientist) =>
        (scientist.credit !== undefined) !==
        (overlay.scientists[scientist.id]?.credit !== undefined)
    ).map((scientist) => scientist.id);
    expect(wrong).toEqual([]);
  });

  it('never translates a person’s name', () => {
    const renamed = EXPLORE_SCIENTISTS.filter(
      (scientist) => localizeScientist(locale, scientist).name !== scientist.name
    ).map((scientist) => scientist.id);
    expect(renamed).toEqual([]);
  });

  it('never translates a lifespan', () => {
    const changed = EXPLORE_SCIENTISTS.filter(
      (scientist) => localizeScientist(locale, scientist).lifespan !== scientist.lifespan
    ).map((scientist) => scientist.id);
    expect(changed).toEqual([]);
  });

  it('renders the same formula as the English, byte for byte', () => {
    const changed = EXPLORE_MOLECULES.filter(
      (molecule) =>
        localizeMolecule(locale, molecule).formula !== localizeMolecule('en', molecule).formula
    ).map((molecule) => molecule.id);
    expect(changed).toEqual([]);
  });

  it('keeps every source label and URL untouched', () => {
    // Source labels are the names of English-language institutions and papers;
    // translating "Science History Institute" makes it harder to find, not
    // easier. There is no place in the overlay for them, and this proves it.
    for (const molecule of EXPLORE_MOLECULES) {
      expect(localizeMolecule(locale, molecule).sources).toEqual(molecule.sources);
    }
    for (const scientist of EXPLORE_SCIENTISTS) {
      expect(localizeScientist(locale, scientist).sources).toEqual(scientist.sources);
    }
  });

  // The notation the shared FORMULA_LIKE check does not know about.
  const NOTATION = [
    'CH4 + 2O2 -> CO2 + 2H2O',
    'CH4',
    'CO2',
    'H2O',
    'NH3',
    'NaCl',
    'O3',
    'N2',
    'H2',
  ];

  it('carries every formula written into the prose through unchanged', () => {
    const lost: string[] = [];

    const check = (id: string, field: string, english: string, translated: string) => {
      for (const token of NOTATION) {
        if (english.includes(token) && !translated.includes(token)) {
          lost.push(`${id}.${field}: lost "${token}"`);
        }
      }
    };

    for (const molecule of EXPLORE_MOLECULES) {
      const target = overlay.molecules[molecule.id];
      if (!target) continue;
      check(molecule.id, 'everyday', molecule.everyday, target.everyday);
      check(molecule.id, 'chemistry', molecule.chemistry, target.chemistry);
    }
    for (const scientist of EXPLORE_SCIENTISTS) {
      const target = overlay.scientists[scientist.id];
      if (!target) continue;
      check(scientist.id, 'work', scientist.work, target.work);
      check(scientist.id, 'legacy', scientist.legacy, target.legacy);
    }

    expect(lost).toEqual([]);
  });

  it('writes no Unicode subscripts, which screen readers read as plain digits', () => {
    const offenders: string[] = [];
    const scan = (id: string, value: string) => {
      if (/[₀-₉]/.test(value)) offenders.push(id);
    };
    for (const [id, entry] of Object.entries(overlay.molecules)) {
      scan(`molecule:${id}`, `${entry.name ?? ''} ${entry.everyday} ${entry.chemistry}`);
    }
    for (const [id, entry] of Object.entries(overlay.scientists)) {
      scan(`scientist:${id}`, `${entry.work} ${entry.legacy} ${entry.credit ?? ''}`);
    }
    expect(offenders).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// The resolver
// ---------------------------------------------------------------------------

const FIXED_WEEK = new Date('2026-09-21T00:00:00.000Z');

describe('getExploreContent', () => {
  it.each(LOCALES)('returns a whole pair for %s', (locale) => {
    const week = getExploreContent(locale, FIXED_WEEK);

    expect(week.weekStart.toISOString()).toBe('2026-09-21T00:00:00.000Z');
    for (const value of [
      week.molecule.name,
      week.molecule.formula,
      week.molecule.everyday,
      week.molecule.chemistry,
      week.scientist.name,
      week.scientist.lifespan,
      week.scientist.work,
      week.scientist.legacy,
    ]) {
      expect(value.trim()).not.toBe('');
    }
  });

  it('shows the same pair to every locale, only in different words', () => {
    const ids = LOCALES.map((locale) => {
      const week = getExploreContent(locale, FIXED_WEEK);
      return `${week.molecule.id}/${week.scientist.id}`;
    });
    expect(new Set(ids).size).toBe(1);
  });

  it('shows a different pair the following week', () => {
    const thisWeek = getExploreContent('en', FIXED_WEEK);
    const nextWeek = getExploreContent('en', new Date('2026-09-28T00:00:00.000Z'));
    expect(nextWeek.molecule.id).not.toBe(thisWeek.molecule.id);
  });

  it('does not change within a week', () => {
    const monday = getExploreContent('en', FIXED_WEEK);
    const sunday = getExploreContent('en', new Date('2026-09-27T23:59:59.999Z'));
    expect(sunday.molecule.id).toBe(monday.molecule.id);
    expect(sunday.scientist.id).toBe(monday.scientist.id);
  });

  it('never leaks the scheduling metadata into what the page receives', () => {
    // `represents` is not on `LocalizedScientist` at all, so the card cannot
    // render it even by accident. Asserted at runtime as well as in the type,
    // because a future `...scientist` spread would satisfy the type and break
    // the promise.
    const week = getExploreContent('en', FIXED_WEEK);
    expect(Object.keys(week.scientist)).not.toContain('represents');
  });
});

describe('exploreLinkTarget', () => {
  it.each(LOCALES)('names the destination in %s', async (locale) => {
    const t = await getDictionary(locale);

    for (const molecule of EXPLORE_MOLECULES) {
      const target = exploreLinkTarget(locale, t, molecule.link);
      expect(target.href.startsWith('/')).toBe(true);
      expect(target.title.trim()).not.toBe('');
    }
    for (const scientist of EXPLORE_SCIENTISTS) {
      const target = exploreLinkTarget(locale, t, scientist.link);
      expect(target.href.startsWith('/')).toBe(true);
      expect(target.title.trim()).not.toBe('');
    }
  });

  it('throws on a cheat sheet that does not exist, rather than rendering a 404 link', async () => {
    const t = await getDictionary('en');
    expect(() => exploreLinkTarget('en', t, { kind: 'cheat-sheet', slug: 'not-a-sheet' })).toThrow(
      /not in CHEAT_SHEETS/
    );
  });

  it('throws on a game that exists but is not active', async () => {
    const t = await getDictionary('en');
    // `bond-builder` is in the GameName union and has no playable page.
    expect(() => exploreLinkTarget('en', t, { kind: 'game', game: 'bond-builder' })).toThrow(
      /GAME_LINKS/
    );
  });
});
