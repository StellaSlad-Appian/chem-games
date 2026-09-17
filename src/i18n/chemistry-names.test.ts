// src/i18n/chemistry-names.test.ts
//
// Completeness rather than key parity: the English names are the registries
// themselves, so there is nothing to compare key-for-key. What must hold is
// that every element, compound and ion the app can actually display has a name
// in every non-default locale — otherwise a German reader meets a stray
// "Sodium Hydroxide" in the middle of a German sentence.
//
// Because these iterate the live registries, adding a compound in
// src/core-engine/data/ fails this suite until it is named in every locale.

import { describe, expect, it } from 'vitest';
import { COMPOUNDS_REGISTRY } from '@/core-engine/data/compounds';
import { ELEMENTS_REGISTRY } from '@/core-engine/data/elements';
import { MONOATOMIC_IONS, POLYATOMIC_IONS } from '@/core-engine/data/ions';
import { DEFAULT_LOCALE, LOCALES } from './config';
import {
  chemistryNameOverlay,
  compoundName,
  elementName,
  ionName,
  usesRegistryNames,
} from './chemistry-names';

const translatedLocales = LOCALES.filter((locale) => !usesRegistryNames(locale));

describe('English falls through to the registries', () => {
  it('has no overlay of its own to drift', () => {
    expect(chemistryNameOverlay(DEFAULT_LOCALE)).toEqual({
      elements: {},
      compounds: {},
      ions: {},
    });
  });

  it('returns the registry name', () => {
    expect(elementName(DEFAULT_LOCALE, 'Na')).toBe('Sodium');
    expect(compoundName(DEFAULT_LOCALE, { id: '4', name: 'Sodium Hydroxide' })).toBe(
      'Sodium Hydroxide'
    );
  });
});

describe.each(translatedLocales)('chemistry names: %s', (locale) => {
  const overlay = chemistryNameOverlay(locale);

  it('names every element in the registry', () => {
    const missing = ELEMENTS_REGISTRY.filter((element) => !overlay.elements[element.symbol]).map(
      (element) => element.symbol
    );
    expect(missing).toEqual([]);
  });

  it('names every compound in the registry', () => {
    const missing = COMPOUNDS_REGISTRY.filter((compound) => !overlay.compounds[compound.id]).map(
      (compound) => `${compound.id} (${compound.formula})`
    );
    expect(missing).toEqual([]);
  });

  it('names every ion in the registry', () => {
    const ions = [...MONOATOMIC_IONS, ...POLYATOMIC_IONS];
    const missing = ions.filter((ion) => !overlay.ions[ion.id]).map((ion) => `${ion.id} ${ion.name}`);
    expect(missing).toEqual([]);
  });

  it('has no overlay entry for an identifier the registries do not have', () => {
    const elementSymbols = new Set(ELEMENTS_REGISTRY.map((e) => e.symbol));
    const compoundIds = new Set(COMPOUNDS_REGISTRY.map((c) => c.id));
    const ionIds = new Set([...MONOATOMIC_IONS, ...POLYATOMIC_IONS].map((i) => i.id));

    expect(Object.keys(overlay.elements).filter((s) => !elementSymbols.has(s))).toEqual([]);
    expect(Object.keys(overlay.compounds).filter((id) => !compoundIds.has(id))).toEqual([]);
    expect(Object.keys(overlay.ions).filter((id) => !ionIds.has(id))).toEqual([]);
  });

  it('actually translates the names that differ between languages', () => {
    // A guard against an overlay filled in by copying the English column.
    //
    // Counting identical names would be the wrong check: most element names
    // *are* the same in English and German (Helium, Lithium, Neon, Argon,
    // Titanium/Titan aside, the whole Latin-derived tail), so a high overlap is
    // correct chemistry rather than a sign of laziness. What matters is that
    // the well-known false friends were handled.
    const mustDiffer: Record<string, string> = {
      Na: 'Sodium',
      K: 'Potassium',
      N: 'Nitrogen',
      O: 'Oxygen',
      C: 'Carbon',
      H: 'Hydrogen',
      Fe: 'Iron',
      Cu: 'Copper',
      Pb: 'Lead',
      W: 'Tungsten',
      Hg: 'Mercury',
      Ag: 'Silver',
      Sn: 'Tin',
      S: 'Sulfur',
    };
    const notTranslated = Object.entries(mustDiffer)
      .filter(([symbol, english]) => elementName(locale, symbol) === english)
      .map(([symbol]) => symbol);

    expect(notTranslated).toEqual([]);

    // The compound names, on the other hand, should differ almost everywhere,
    // because German builds them by composition (Natriumhydroxid) where
    // English uses two words.
    const identicalCompounds = COMPOUNDS_REGISTRY.filter(
      (compound) => compoundName(locale, compound) === compound.name
    ).map((compound) => compound.formula);
    expect(identicalCompounds).toEqual([]);
  });

  it('never returns an empty name', () => {
    for (const element of ELEMENTS_REGISTRY) {
      expect(elementName(locale, element.symbol).trim()).not.toBe('');
    }
    for (const compound of COMPOUNDS_REGISTRY) {
      expect(compoundName(locale, compound).trim()).not.toBe('');
    }
    for (const ion of [...MONOATOMIC_IONS, ...POLYATOMIC_IONS]) {
      expect(ionName(locale, ion).trim()).not.toBe('');
    }
  });
});

describe('fallbacks', () => {
  it('falls back to the symbol for an element that is not in the registry', () => {
    expect(elementName('de', 'Zz')).toBe('Zz');
  });

  it('falls back to the registry name for a compound with no id', () => {
    expect(compoundName('de', { name: 'Mystery Compound' })).toBe('Mystery Compound');
  });
});
