// src/lib/explore/molecules.test.ts
//
// AC-5's data-integrity half: a molecule that is already in the compounds
// registry must reference it rather than restate it, and nothing denormalized
// may disagree with the registry.
//
// Written in the style of src/core-engine/tests/compounds.test.ts: derive the
// answer from the registry, compare, and name every mismatch rather than
// stopping at the first.

import { describe, expect, it } from 'vitest';
import { COMPOUNDS_REGISTRY } from '@/core-engine/data/compounds';
import { LOCALES } from '@/i18n/config';
import { localizeMolecule } from '@/i18n/explore';
import { EXPLORE_MOLECULES } from './molecules';
import { EXPLORE_SCIENTISTS } from './scientists';

const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

describe('ids', () => {
  it('are slug-shaped, so an archive URL can be built from them later', () => {
    const bad = [...EXPLORE_MOLECULES, ...EXPLORE_SCIENTISTS]
      .map((entry) => entry.id)
      .filter((id) => !ID_PATTERN.test(id));
    expect(bad).toEqual([]);
  });

  it('are unique within each pool', () => {
    const moleculeIds = EXPLORE_MOLECULES.map((m) => m.id);
    const scientistIds = EXPLORE_SCIENTISTS.map((s) => s.id);
    expect(new Set(moleculeIds).size).toBe(moleculeIds.length);
    expect(new Set(scientistIds).size).toBe(scientistIds.length);
  });
});

describe('registry species', () => {
  it('reference the registry instead of restating it', () => {
    // The rule, both ways round. With a compoundId: no name and no formula of
    // its own, because a second copy is a second thing that can go stale.
    // Without one: it must carry both, or the card renders blank.
    const offences = EXPLORE_MOLECULES.flatMap((molecule) => {
      if (molecule.compoundId) {
        return [
          ...(molecule.name ? [`${molecule.id}: has compoundId and a name`] : []),
          ...(molecule.formula ? [`${molecule.id}: has compoundId and a formula`] : []),
        ];
      }
      return [
        ...(molecule.name ? [] : [`${molecule.id}: no compoundId and no name`]),
        ...(molecule.formula ? [] : [`${molecule.id}: no compoundId and no formula`]),
      ];
    });
    expect(offences).toEqual([]);
  });

  it('name a compound the registry actually holds', () => {
    const ids = new Set(COMPOUNDS_REGISTRY.map((compound) => compound.id));
    const missing = EXPLORE_MOLECULES.filter(
      (molecule) => molecule.compoundId && !ids.has(molecule.compoundId)
    ).map((molecule) => `${molecule.id} -> ${molecule.compoundId}`);
    expect(missing).toEqual([]);
  });

  it('render the registry’s formula, byte for byte, in every locale', () => {
    // This is the assertion that makes referencing worth the indirection: the
    // formula on the page is the registry's string, so the two can never
    // disagree, in any language.
    const mismatches: string[] = [];
    for (const molecule of EXPLORE_MOLECULES) {
      if (!molecule.compoundId) continue;
      const compound = COMPOUNDS_REGISTRY.find((entry) => entry.id === molecule.compoundId)!;
      for (const locale of LOCALES) {
        const rendered = localizeMolecule(locale, molecule);
        if (rendered.formula !== compound.formula) {
          mismatches.push(`${molecule.id} (${locale}): ${rendered.formula} !== ${compound.formula}`);
        }
      }
    }
    expect(mismatches).toEqual([]);
  });

  it('take the English name from the registry rather than from the entry', () => {
    const mismatches: string[] = [];
    for (const molecule of EXPLORE_MOLECULES) {
      if (!molecule.compoundId) continue;
      const compound = COMPOUNDS_REGISTRY.find((entry) => entry.id === molecule.compoundId)!;
      const rendered = localizeMolecule('en', molecule);
      if (rendered.name !== compound.name) {
        mismatches.push(`${molecule.id}: ${rendered.name} !== ${compound.name}`);
      }
    }
    expect(mismatches).toEqual([]);
  });
});

describe('formulae', () => {
  it('are plain ASCII, so MoleculeText can typeset them', () => {
    // Unicode subscripts render as ordinary digits to many screen readers, and
    // docs/STYLE_GUIDE.md says to write formulae as ASCII and let MoleculeText
    // do the typography. This catches a well-meaning "H₂O" in a data file.
    const unicode = EXPLORE_MOLECULES.filter(
      (molecule) => molecule.formula && /[₀-₉⁰-ⁿ]/.test(molecule.formula)
    ).map((molecule) => `${molecule.id}: ${molecule.formula}`);
    expect(unicode).toEqual([]);
  });

  it('are never empty on a rendered card', () => {
    const empty = LOCALES.flatMap((locale) =>
      EXPLORE_MOLECULES.filter((molecule) => !localizeMolecule(locale, molecule).formula.trim()).map(
        (molecule) => `${molecule.id} (${locale})`
      )
    );
    expect(empty).toEqual([]);
  });
});

describe('sources', () => {
  it.each([...EXPLORE_MOLECULES, ...EXPLORE_SCIENTISTS].map((e) => [e.id, e] as const))(
    '%s carries at least one source with a real URL',
    (_id, entry) => {
      expect(entry.sources.length).toBeGreaterThanOrEqual(1);
      for (const source of entry.sources) {
        expect(source.label.trim()).not.toBe('');
        expect(source.url).toMatch(/^https:\/\//);
      }
    }
  );
});
