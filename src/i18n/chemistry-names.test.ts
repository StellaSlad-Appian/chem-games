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
import { LEWIS_MOLECULES } from '@/core-engine/data/lewis-molecules';
import { SPECIES_NAMES, reactions } from '@/core-engine/data/reactions';
import { DEFAULT_LOCALE, LOCALES } from './config';
import {
  chemistryNameOverlay,
  compoundName,
  elementName,
  ionName,
  localizeLewisMolecule,
  localizeReaction,
  speciesName,
  usesRegistryNames,
} from './chemistry-names';

const translatedLocales = LOCALES.filter((locale) => !usesRegistryNames(locale));

describe('English falls through to the registries', () => {
  it('has no overlay of its own to drift', () => {
    expect(chemistryNameOverlay(DEFAULT_LOCALE)).toEqual({
      elements: {},
      compounds: {},
      ions: {},
      species: {},
      reactions: {},
      lewisMolecules: {},
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
    //
    // Which names count as false friends is a property of the *pair* of
    // languages, not of translation in general. Na/Natrium and K/Kalium are the
    // textbook examples in German and are simply not false friends in French,
    // which says sodium and potassium exactly as English does. Listing them
    // globally would force a French translator to invent a wrong name to pass a
    // test, so the exemptions are per locale.
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
    /** Symbols whose name legitimately matches the English in this locale. */
    const SAME_AS_ENGLISH: Record<string, string[]> = {
      fr: ['Na', 'K'],
    };
    const exempt = new Set(SAME_AS_ENGLISH[locale] ?? []);
    const notTranslated = Object.entries(mustDiffer)
      .filter(([symbol]) => !exempt.has(symbol))
      .filter(([symbol, english]) => elementName(locale, symbol) === english)
      .map(([symbol]) => symbol);

    expect(notTranslated).toEqual([]);

    // An exemption is a positive claim — "French really does call Na *sodium*"
    // — so it is asserted rather than merely tolerated. If the overlay ever
    // gave one of these a different name, the entry would be silently
    // suppressing a real check; this fails instead and says to delete it.
    const staleElementExemptions = [...exempt].filter(
      (symbol) => elementName(locale, symbol) !== mustDiffer[symbol]
    );
    expect(staleElementExemptions).toEqual([]);

    // The compound names, on the other hand, should differ almost everywhere,
    // because German builds them by composition (Natriumhydroxid) and French
    // inverts the order and adds "de" (hydroxyde de sodium) where English uses
    // two words in the other order.
    //
    // One exception, documented the same way IDENTICAL_BY_DESIGN documents the
    // dictionary's: N2H4 is *hydrazine* in French as well as in English. The
    // check still runs on the other 34 compounds.
    const IDENTICAL_COMPOUNDS_BY_DESIGN: Record<string, string[]> = {
      fr: ['23'],
    };
    const allowed = new Set(IDENTICAL_COMPOUNDS_BY_DESIGN[locale] ?? []);
    const identicalCompounds = COMPOUNDS_REGISTRY.filter(
      (compound) => !allowed.has(compound.id) && compoundName(locale, compound) === compound.name
    ).map((compound) => compound.formula);
    expect(identicalCompounds).toEqual([]);

    // And the allowlist cannot rot: an entry that stops being identical is a
    // stale exemption, so it is asserted rather than merely tolerated.
    const staleExemptions = [...allowed].filter((id) => {
      const compound = COMPOUNDS_REGISTRY.find((c) => c.id === id);
      return !compound || compoundName(locale, compound) !== compound.name;
    });
    expect(staleExemptions).toEqual([]);
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

/**
 * The game datasets carry prose as well as names: a reaction's observation,
 * strategy hint and word equation; a molecule's hint and property line. Same
 * rule as above — the overlay is keyed by the dataset's own ids and has to be
 * complete against the live data, so adding a reaction in reactions.ts fails
 * this suite until every locale has it.
 */
describe.each(translatedLocales)('game data: %s', (locale) => {
  const overlay = chemistryNameOverlay(locale);

  it('names every species Reaction Balancer can put on a card', () => {
    const missing = Object.keys(SPECIES_NAMES).filter((bare) => !overlay.species[bare]);
    expect(missing).toEqual([]);
    expect(Object.keys(overlay.species).filter((bare) => !(bare in SPECIES_NAMES))).toEqual([]);
  });

  it('translates every reaction, and only the fields the reaction actually has', () => {
    const missing = reactions.filter((r) => !overlay.reactions[r.id]).map((r) => r.id);
    expect(missing).toEqual([]);

    const ids = new Set(reactions.map((r) => r.id));
    expect(Object.keys(overlay.reactions).filter((id) => !ids.has(id))).toEqual([]);

    // A reaction with no English hint or word equation must not gain one in
    // translation: the game checks for their absence to decide what to show.
    const shapeMismatch = reactions
      .filter((r) => {
        const t = overlay.reactions[r.id];
        return Boolean(t.hint) !== Boolean(r.hint) || Boolean(t.prompt) !== Boolean(r.prompt);
      })
      .map((r) => r.id);
    expect(shapeMismatch).toEqual([]);
  });

  it('translates every Lewis molecule', () => {
    const missing = LEWIS_MOLECULES.filter((m) => !overlay.lewisMolecules[m.id]).map((m) => m.id);
    expect(missing).toEqual([]);

    const ids = new Set(LEWIS_MOLECULES.map((m) => m.id));
    expect(Object.keys(overlay.lewisMolecules).filter((id) => !ids.has(id))).toEqual([]);
  });

  it('leaves no game-data string empty or copied from the English', () => {
    const copied: string[] = [];
    for (const reaction of reactions) {
      const t = overlay.reactions[reaction.id];
      for (const field of ['name', 'description', 'hint', 'prompt'] as const) {
        const source = reaction[field];
        const translated = t[field];
        if (!source) continue;
        expect(translated?.trim(), `${reaction.id}.${field}`).not.toBe('');
        if (translated === source) copied.push(`${reaction.id}.${field}`);
      }
    }
    for (const molecule of LEWIS_MOLECULES) {
      const t = overlay.lewisMolecules[molecule.id];
      for (const field of ['name', 'tier2Hint', 'propertyLine'] as const) {
        expect(t[field].trim(), `${molecule.id}.${field}`).not.toBe('');
        // Molecule names can legitimately match (Ethanol is Ethanol); the two
        // prose fields cannot.
        if (t[field] === molecule[field] && field !== 'name') copied.push(`${molecule.id}.${field}`);
      }
    }
    expect(copied).toEqual([]);
  });

  it('leaves equations, formulae and bond lines exactly as the dataset has them', () => {
    for (const reaction of reactions) {
      const translated = localizeReaction(locale, reaction);
      expect(translated.equation).toBe(reaction.equation);
      expect(translated.type).toBe(reaction.type);
      expect(translated.levels).toEqual(reaction.levels);
    }
    for (const molecule of LEWIS_MOLECULES) {
      const translated = localizeLewisMolecule(locale, molecule);
      expect(translated.formula).toBe(molecule.formula);
      expect(translated.bondLine).toBe(molecule.bondLine);
      expect(translated.atoms).toEqual(molecule.atoms);
      expect(translated.bonds).toEqual(molecule.bonds);
    }
  });
});

describe('game data falls through to the datasets in English', () => {
  it('returns the registry species name and leaves the reaction untouched', () => {
    expect(speciesName(DEFAULT_LOCALE, 'H2O')).toBe('water');
    expect(speciesName(DEFAULT_LOCALE, 'H2O(l)')).toBe('water');
    const reaction = reactions[0];
    expect(localizeReaction(DEFAULT_LOCALE, reaction)).toEqual(reaction);
    expect(localizeLewisMolecule(DEFAULT_LOCALE, LEWIS_MOLECULES[0])).toEqual(LEWIS_MOLECULES[0]);
  });

  it('strips a state symbol before looking a species up in a translated locale', () => {
    expect(speciesName('de', 'H2O(l)')).toBe(speciesName('de', 'H2O'));
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
