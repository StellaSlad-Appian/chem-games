// src/core-engine/tests/periodic-table.test.ts
//
// The gate that makes src/core-engine/data/periodic-table.ts trustworthy.
//
// 118 hand-authored rows of chemistry is exactly the shape of data that goes
// wrong quietly: one wrong shell count renders as a plausible number in a cell
// and nobody notices for a year. So the file is checked against the registry
// it joins to, against arithmetic that must hold for every entry, and — for
// the twenty elements a Year 9 student is actually asked to learn — against a
// literal written out by hand from a separate source.
//
// **That literal is also where the deleted content went.** The sheet used to
// carry a twenty-row "first twenty elements" lookup table with each element's
// electron arrangement in it. The widget replaced it for all 118 elements, and
// the twenty rows live on here as an assertion instead of as prose that could
// drift away from the data the page renders.
//
// Source for FIRST_TWENTY: the Royal Society of Chemistry's periodic table
// (rsc.org/periodic-table), element by element, which is the "Learn more" link
// the atomic-structure sheet already gives students. It agrees with the VCAA
// Chemistry Data Book's table of the first twenty arrangements.

import { describe, expect, it } from 'vitest';
import {
  PERIODIC_TABLE,
  electronArrangement,
  ionLabel,
  periodicTableEntry,
  periodicTableEntryBySymbol,
} from '../data/periodic-table';
import { ELEMENTS_REGISTRY } from '../data/elements';
import { elementName } from '@/i18n/chemistry-names';
import { LOCALES } from '@/i18n/config';

/**
 * The electron arrangement of the first twenty elements, written out rather
 * than derived. If this disagrees with the data module, one of the two is
 * wrong and a person has to decide which — which is the whole point of
 * writing it twice.
 */
const FIRST_TWENTY: Record<number, number[]> = {
  1: [1],
  2: [2],
  3: [2, 1],
  4: [2, 2],
  5: [2, 3],
  6: [2, 4],
  7: [2, 5],
  8: [2, 6],
  9: [2, 7],
  10: [2, 8],
  11: [2, 8, 1],
  12: [2, 8, 2],
  13: [2, 8, 3],
  14: [2, 8, 4],
  15: [2, 8, 5],
  16: [2, 8, 6],
  17: [2, 8, 7],
  18: [2, 8, 8],
  19: [2, 8, 8, 1],
  20: [2, 8, 8, 2],
};

describe('periodic table — the set of entries', () => {
  it('has exactly 118 entries', () => {
    expect(PERIODIC_TABLE).toHaveLength(118);
  });

  it('covers atomic numbers 1 to 118 with no gap and no repeat', () => {
    const numbers = PERIODIC_TABLE.map((entry) => entry.atomicNumber);
    expect([...numbers].sort((a, b) => a - b)).toEqual(
      Array.from({ length: 118 }, (_, index) => index + 1)
    );
    expect(new Set(numbers).size).toBe(118);
  });

  it('is written in atomic-number order', () => {
    // Not required by anything that reads it, but a file meant to be read as a
    // table is only readable if it is in order, and a row inserted in the
    // wrong place is the first symptom of a copy-paste edit.
    const numbers = PERIODIC_TABLE.map((entry) => entry.atomicNumber);
    expect(numbers).toEqual([...numbers].sort((a, b) => a - b));
  });
});

describe('periodic table — the join to ELEMENTS_REGISTRY', () => {
  it('joins every entry to a registry element whose symbol matches', () => {
    for (const entry of PERIODIC_TABLE) {
      const element = ELEMENTS_REGISTRY.find(
        (candidate) => candidate.atomicNumber === entry.atomicNumber
      );
      expect(element, `no registry element with Z=${entry.atomicNumber}`).toBeDefined();
      expect(element?.symbol, `Z=${entry.atomicNumber}`).toBe(entry.symbol);
    }
  });

  it('leaves no registry element without an entry', () => {
    // The other direction. A 119th element added to the registry alone would
    // pass every assertion above and render as a hole in the table.
    for (const element of ELEMENTS_REGISTRY) {
      expect(
        periodicTableEntry(element.atomicNumber),
        `no periodic-table entry for ${element.symbol}`
      ).toBeDefined();
    }
  });

  it('gives every entry the atomic radius the registry already holds', () => {
    // The *Atomic size* mode reads `atomicRadius` from the registry rather
    // than duplicating it here, so the mode silently has nothing to draw if a
    // registry entry ever loses it.
    for (const element of ELEMENTS_REGISTRY) {
      expect(element.atomicRadius, `${element.symbol} has no atomicRadius`).toBeGreaterThan(0);
    }
  });

  it('looks an entry up by symbol', () => {
    expect(periodicTableEntryBySymbol('Na')?.atomicNumber).toBe(11);
    expect(periodicTableEntryBySymbol('Uue')).toBeUndefined();
  });
});

describe('periodic table — the shape of the table', () => {
  it('puts no two entries in the same group and period', () => {
    const seen = new Set<string>();
    for (const entry of PERIODIC_TABLE) {
      if (entry.group === null) continue; // the f-block rows sit outside the grid
      const key = `${entry.period}:${entry.group}`;
      expect(seen.has(key), `${entry.symbol} collides at ${key}`).toBe(false);
      seen.add(key);
    }
  });

  it('gives every entry a group of 1 to 18, or null', () => {
    for (const entry of PERIODIC_TABLE) {
      if (entry.group === null) continue;
      expect(entry.group, entry.symbol).toBeGreaterThanOrEqual(1);
      expect(entry.group, entry.symbol).toBeLessThanOrEqual(18);
    }
  });

  it('leaves the group null if and only if the entry is in the f-block', () => {
    for (const entry of PERIODIC_TABLE) {
      expect(entry.group === null, `${entry.symbol} block=${entry.block}`).toBe(
        entry.block === 'f'
      );
    }
  });

  it('makes both f-block rows fifteen wide', () => {
    for (const period of [6, 7]) {
      const row = PERIODIC_TABLE.filter(
        (entry) => entry.block === 'f' && entry.period === period
      );
      expect(row, `period ${period} f-block`).toHaveLength(15);
    }
  });

  it('gives every entry a period of 1 to 7', () => {
    for (const entry of PERIODIC_TABLE) {
      expect(entry.period, entry.symbol).toBeGreaterThanOrEqual(1);
      expect(entry.period, entry.symbol).toBeLessThanOrEqual(7);
    }
  });
});

describe('periodic table — electrons', () => {
  it('sums shells to the atomic number for every entry', () => {
    for (const entry of PERIODIC_TABLE) {
      const total = entry.shells.reduce((sum, count) => sum + count, 0);
      expect(total, `${entry.symbol} shells ${entry.shells.join(',')}`).toBe(entry.atomicNumber);
    }
  });

  it('never leaves an inner shell empty', () => {
    for (const entry of PERIODIC_TABLE) {
      expect(entry.shells.every((count) => count > 0), entry.symbol).toBe(true);
      expect(entry.shells.length, entry.symbol).toBeGreaterThan(0);
    }
  });

  it('matches the hand-checked arrangement for the first twenty elements', () => {
    for (const [atomicNumber, shells] of Object.entries(FIRST_TWENTY)) {
      const entry = periodicTableEntry(Number(atomicNumber));
      expect(entry?.shells, `Z=${atomicNumber}`).toEqual(shells);
    }
  });

  it('writes sodium as 2, 8, 1', () => {
    // The one arrangement the sheet's prose states in words, so it is pinned
    // on its own: prose and data disagreeing is the failure this catches.
    const sodium = periodicTableEntryBySymbol('Na');
    expect(sodium).toBeDefined();
    expect(electronArrangement(sodium!)).toBe('2, 8, 1');
  });

  it('leaves outerElectrons null across the d- and f-blocks', () => {
    for (const entry of PERIODIC_TABLE) {
      if (entry.block === 'd' || entry.block === 'f') {
        expect(entry.outerElectrons, `${entry.symbol} is ${entry.block}-block`).toBeNull();
      }
    }
  });

  it('gives every s- and p-block entry an outerElectrons count of 1 to 8', () => {
    for (const entry of PERIODIC_TABLE) {
      if (entry.block !== 's' && entry.block !== 'p') continue;
      expect(entry.outerElectrons, entry.symbol).not.toBeNull();
      expect(entry.outerElectrons!, entry.symbol).toBeGreaterThanOrEqual(1);
      expect(entry.outerElectrons!, entry.symbol).toBeLessThanOrEqual(8);
    }
  });

  it('gives helium two outer electrons, not eight', () => {
    // Helium sits in group 18 and the rest of that column has eight. Reading
    // the count off the group number would make this cell say 8, which is the
    // single most common mistake in a hand-built periodic table.
    expect(periodicTableEntryBySymbol('He')?.outerElectrons).toBe(2);
  });

  it('matches the group number across the s- and p-blocks, helium aside', () => {
    for (const entry of PERIODIC_TABLE) {
      if (entry.symbol === 'He') continue;
      if (entry.block === 's') {
        expect(entry.outerElectrons, entry.symbol).toBe(entry.group);
      } else if (entry.block === 'p') {
        expect(entry.outerElectrons, entry.symbol).toBe(entry.group! - 10);
      }
    }
  });

  it('reads nothing from valenceElectrons', () => {
    // AC-12, as arithmetic rather than as a grep. The registry's combining
    // numbers for these four disagree with the outer-shell count, so a data
    // module built from `valenceElectrons` could not produce this file.
    const combining = new Map(
      ELEMENTS_REGISTRY.map((element) => [element.symbol, element.valenceElectrons])
    );
    expect(combining.get('Cr')).toBe(3);
    expect(combining.get('Cu')).toBe(2);
    expect(combining.get('Au')).toBe(1);
    expect(combining.get('Cn')).toBe(12);

    // And the arrangement the widget shows for each of them is not that.
    expect(periodicTableEntryBySymbol('Cr')?.shells).toEqual([2, 8, 13, 1]);
    expect(periodicTableEntryBySymbol('Cu')?.shells).toEqual([2, 8, 18, 1]);
    expect(periodicTableEntryBySymbol('Au')?.shells).toEqual([2, 8, 18, 32, 18, 1]);
    expect(periodicTableEntryBySymbol('Cn')?.outerElectrons).toBeNull();
  });
});

describe('periodic table — families, ions and reactivity', () => {
  it('agrees with metalClass wherever the family implies one', () => {
    const IMPLIED: Partial<Record<string, string>> = {
      'alkali-metal': 'metal',
      'alkaline-earth': 'metal',
      'transition-metal': 'metal',
      lanthanide: 'metal',
      actinide: 'metal',
      'post-transition-metal': 'metal',
      metalloid: 'metalloid',
      'noble-gas': 'non-metal',
      halogen: 'non-metal',
      nonmetal: 'non-metal',
    };
    for (const entry of PERIODIC_TABLE) {
      expect(entry.metalClass, `${entry.symbol} is ${entry.category}`).toBe(
        IMPLIED[entry.category]
      );
    }
  });

  it('gives every f-block entry the family of its row', () => {
    for (const entry of PERIODIC_TABLE) {
      if (entry.block !== 'f') continue;
      expect(entry.category, entry.symbol).toBe(
        entry.period === 6 ? 'lanthanide' : 'actinide'
      );
    }
  });

  it('leaves commonIonCharge null across the d- and f-blocks and the noble gases', () => {
    for (const entry of PERIODIC_TABLE) {
      if (entry.block === 'd' || entry.block === 'f' || entry.category === 'noble-gas') {
        expect(entry.commonIonCharge, entry.symbol).toBeNull();
      }
    }
  });

  it('gives groups 1, 2 and 17 the charge the group number predicts', () => {
    // The pattern the *Ion formed* mode exists to show. Hydrogen is in group 1
    // and forms H+, so it is included; the noble gases form none.
    for (const entry of PERIODIC_TABLE) {
      if (entry.block === 'f' || entry.block === 'd') continue;
      if (entry.group === 1) expect(entry.commonIonCharge, entry.symbol).toBe(1);
      if (entry.group === 2) expect(entry.commonIonCharge, entry.symbol).toBe(2);
      // Tennessine has never been made in a weighable amount and has no
      // observed chemistry, so it carries no charge rather than a predicted one.
      if (entry.group === 17 && entry.symbol !== 'Ts') {
        expect(entry.commonIonCharge, entry.symbol).toBe(-1);
      }
    }
  });

  it('renders a charge with a real minus sign', () => {
    expect(ionLabel(1)).toBe('1+');
    expect(ionLabel(-2)).toBe('2−');
    expect(ionLabel(null)).toBeUndefined();
    expect(ionLabel(-1)).not.toContain('-');
  });

  it('leaves reactivity null outside groups 1, 2, 17 and 18', () => {
    const GRADED = new Set([1, 2, 17, 18]);
    for (const entry of PERIODIC_TABLE) {
      if (entry.group === null || !GRADED.has(entry.group)) {
        expect(entry.reactivity, entry.symbol).toBeNull();
      }
    }
  });

  it('grades every alkali metal, alkaline earth, halogen and noble gas', () => {
    const GRADED = new Set(['alkali-metal', 'alkaline-earth', 'halogen', 'noble-gas']);
    for (const entry of PERIODIC_TABLE) {
      if (!GRADED.has(entry.category)) continue;
      expect(entry.reactivity, entry.symbol).not.toBeNull();
    }
  });

  it('leaves hydrogen ungraded', () => {
    // Hydrogen sits in group 1 because of its one outer electron, not because
    // it is an alkali metal — it is a gas that does none of what lithium does
    // with water. Grading it on the group 1 scale would teach that it did.
    expect(periodicTableEntryBySymbol('H')?.reactivity).toBeNull();
  });

  it('makes group 1 more reactive down the group and group 17 less', () => {
    const ORDER = ['unreactive', 'low', 'moderate', 'high', 'very-high'];
    const rank = (symbol: string) =>
      ORDER.indexOf(periodicTableEntryBySymbol(symbol)!.reactivity!);

    const alkali = ['Li', 'Na', 'K', 'Rb', 'Cs', 'Fr'].map(rank);
    expect(alkali).toEqual([...alkali].sort((a, b) => a - b));
    expect(rank('Fr')).toBeGreaterThan(rank('Li'));

    const halogens = ['F', 'Cl', 'Br', 'I', 'At'].map(rank);
    expect(halogens).toEqual([...halogens].sort((a, b) => b - a));
    expect(rank('F')).toBeGreaterThan(rank('At'));
  });

  it('marks technetium, promethium and everything past uranium as synthetic', () => {
    for (const entry of PERIODIC_TABLE) {
      const expected =
        entry.atomicNumber === 43 || entry.atomicNumber === 61 || entry.atomicNumber > 92
          ? 'synthetic'
          : 'natural';
      expect(entry.occurrence, entry.symbol).toBe(expected);
    }
  });

  it('knows the two elements that are liquid at 25 °C', () => {
    const liquids = PERIODIC_TABLE.filter((entry) => entry.stateAt25C === 'liquid');
    expect(liquids.map((entry) => entry.symbol).sort()).toEqual(['Br', 'Hg']);
  });
});

describe('periodic table — every cell can be named in every locale', () => {
  it('names all 118 elements in all six locales', () => {
    // The widget's accessible name is built from `elementName(locale, symbol)`
    // (AC-5, AC-27). `chemistry-names.test.ts` asserts the overlays are
    // complete against the registry; this asserts it against the 118 symbols
    // the widget will actually ask for, which is the set that matters here.
    for (const locale of LOCALES) {
      for (const entry of PERIODIC_TABLE) {
        const name = elementName(locale, entry.symbol);
        expect(name, `${locale}/${entry.symbol}`).toBeTruthy();
        expect(name, `${locale}/${entry.symbol}`).not.toBe(entry.symbol);
      }
    }
  });
});
