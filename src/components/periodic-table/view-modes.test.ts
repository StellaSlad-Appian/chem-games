// src/components/periodic-table/view-modes.test.ts
//
// The accessibility rule, enforced as arithmetic.
//
// "Colour is never the only carrier" (docs/ACCESSIBILITY.md §3) is the kind of
// requirement that is true on the day it is written and quietly false two
// modes later. Here it is a test over 7 modes × 118 elements: every one of the
// 826 cells prints something, and every legend key a mode can return has a row
// in the English dictionary. A mode added without a badge fails this file
// before anyone opens a browser.

import { describe, expect, it } from 'vitest';
import {
  VIEW_MODES,
  YEAR_9_MODES,
  YEAR_10_MODES,
  describeCell,
  legendRows,
  legendTone,
  type LegendKey,
} from './view-modes';
import { PERIODIC_TABLE } from '@/core-engine/data/periodic-table';
import { ELEMENTS_REGISTRY } from '@/core-engine/data/elements';
import { en } from '@/i18n/dictionaries/en';

const badgeText = (badge: ReturnType<typeof describeCell>['badge']): string =>
  'text' in badge ? badge.text : en.periodicTable.badge[badge.labelKey];

const legendText = (key: LegendKey): string | undefined => {
  if (/^outer-[1-8]$/.test(key)) return en.periodicTable.legend['outer-count'];
  return (en.periodicTable.legend as Record<string, string>)[key];
};

describe('view modes — the badge is never missing', () => {
  it.each(VIEW_MODES)('prints a non-empty badge in all 118 cells in %s', (mode) => {
    const empty = PERIODIC_TABLE.filter(
      (entry) => badgeText(describeCell(entry, mode).badge).trim() === ''
    ).map((entry) => entry.symbol);
    expect(empty).toEqual([]);
  });

  it.each(VIEW_MODES)('keeps every badge short enough for a cell in %s', (mode) => {
    // A cell is about 40 CSS px wide at 9px type. Five characters is the
    // practical ceiling; past that the badge wraps and the row grows.
    const tooLong = PERIODIC_TABLE.map((entry) => badgeText(describeCell(entry, mode).badge))
      .filter((badge) => badge.length > 5);
    expect([...new Set(tooLong)]).toEqual([]);
  });
});

describe('view modes — the legend', () => {
  it.each(VIEW_MODES)('has an English legend row for every key %s can return', (mode) => {
    const missing = [
      ...new Set(PERIODIC_TABLE.map((entry) => describeCell(entry, mode).legendKey)),
    ].filter((key) => !legendText(key));
    expect(missing).toEqual([]);
  });

  it.each(VIEW_MODES)('has an English legend row for every row %s lists', (mode) => {
    expect(legendRows(mode).filter((key) => !legendText(key))).toEqual([]);
  });

  it.each(VIEW_MODES)('lists exactly the keys %s actually uses', (mode) => {
    // Both directions. A legend row nothing uses is clutter; a cell with no
    // legend row is colour nobody can decode.
    const used = new Set(PERIODIC_TABLE.map((entry) => describeCell(entry, mode).legendKey));
    const listed = new Set(legendRows(mode));
    expect([...used].filter((key) => !listed.has(key)).sort()).toEqual([]);
    expect([...listed].filter((key) => !used.has(key)).sort()).toEqual([]);
  });

  it('gives every legend row the tone its cells carry', () => {
    for (const mode of VIEW_MODES) {
      for (const entry of PERIODIC_TABLE) {
        const view = describeCell(entry, mode);
        expect(legendTone(view.legendKey), `${mode}/${entry.symbol}`).toBe(view.tone);
      }
    }
  });
});

describe('view modes — what each one encodes', () => {
  const bySymbol = (symbol: string) =>
    PERIODIC_TABLE.find((entry) => entry.symbol === symbol)!;

  it('greys the d- and f-blocks in the outer-shell mode rather than showing a number', () => {
    // AC-14. Iron does not have two outer electrons, and the widget must not
    // say it does.
    for (const symbol of ['Fe', 'Cu', 'Au', 'Cn', 'La', 'U']) {
      const view = describeCell(bySymbol(symbol), 'outer-shell');
      expect(view.tone, symbol).toBe('none');
      expect(view.legendKey, symbol).toBe('outer-none');
      expect(badgeText(view.badge), symbol).toBe(en.periodicTable.badge.none);
    }
  });

  it('prints the outer count for the s- and p-blocks', () => {
    expect(badgeText(describeCell(bySymbol('Na'), 'outer-shell').badge)).toBe('1');
    expect(badgeText(describeCell(bySymbol('Cl'), 'outer-shell').badge)).toBe('7');
    expect(badgeText(describeCell(bySymbol('He'), 'outer-shell').badge)).toBe('2');
  });

  it('shows one tone per column in the outer-shell mode', () => {
    // The lesson: group 17 is one colour all the way down. If this ever
    // stopped holding, the mode would be teaching the opposite of §1.1.
    const halogens = ['F', 'Cl', 'Br', 'I', 'At'].map(
      (symbol) => describeCell(bySymbol(symbol), 'outer-shell').tone
    );
    expect(new Set(halogens).size).toBe(1);
  });

  it('prints the radius in picometres in the atomic-size mode', () => {
    const sodium = ELEMENTS_REGISTRY.find((element) => element.symbol === 'Na')!;
    expect(badgeText(describeCell(bySymbol('Na'), 'atomic-size').badge)).toBe(
      String(sodium.atomicRadius)
    );
  });

  it('bands atomic size so the trend runs down and to the left', () => {
    const band = (symbol: string) => describeCell(bySymbol(symbol), 'atomic-size').legendKey;
    expect(band('He')).toBe('size-smallest');
    expect(band('Fr')).toBe('size-largest');
    // Across a period, atoms shrink: sodium is larger than chlorine.
    const order = ['size-smallest', 'size-small', 'size-medium', 'size-large', 'size-largest'];
    expect(order.indexOf(band('Na'))).toBeGreaterThan(order.indexOf(band('Cl')));
  });

  it('ranks reactivity 0 to 4 and dashes everything ungraded', () => {
    expect(badgeText(describeCell(bySymbol('Ne'), 'reactivity').badge)).toBe('0');
    expect(badgeText(describeCell(bySymbol('Cs'), 'reactivity').badge)).toBe('4');
    expect(badgeText(describeCell(bySymbol('Fe'), 'reactivity').badge)).toBe(
      en.periodicTable.badge.none
    );
  });

  it('writes an ion with a real minus sign and a sign-carrying tone', () => {
    expect(badgeText(describeCell(bySymbol('Na'), 'ion-formed').badge)).toBe('1+');
    expect(badgeText(describeCell(bySymbol('O'), 'ion-formed').badge)).toBe('2−');
    expect(describeCell(bySymbol('Na'), 'ion-formed').tone).toBe('cation');
    expect(describeCell(bySymbol('O'), 'ion-formed').tone).toBe('anion');
    expect(describeCell(bySymbol('Ar'), 'ion-formed').legendKey).toBe('ion-none');
  });

  it('separates metals, non-metals and metalloids', () => {
    expect(describeCell(bySymbol('Fe'), 'metals').legendKey).toBe('metal');
    expect(describeCell(bySymbol('Si'), 'metals').legendKey).toBe('metalloid');
    expect(describeCell(bySymbol('O'), 'metals').legendKey).toBe('non-metal');
  });

  it('marks the made elements', () => {
    expect(describeCell(bySymbol('Tc'), 'occurrence').legendKey).toBe('synthetic');
    expect(describeCell(bySymbol('U'), 'occurrence').legendKey).toBe('natural');
    expect(describeCell(bySymbol('Og'), 'occurrence').legendKey).toBe('synthetic');
  });
});

describe('view modes — the two sheets', () => {
  it('gives the Year 9 sheet the six modes §4.7 settled on', () => {
    expect([...YEAR_9_MODES]).toEqual([
      'metals',
      'families',
      'outer-shell',
      'atomic-size',
      'reactivity',
      'ion-formed',
    ]);
    // *State at 25 °C* was cut. This is the assertion that stops it coming
    // back by accident.
    expect(YEAR_9_MODES).not.toContain('occurrence');
    expect(VIEW_MODES).not.toContain('state');
  });

  it('gates the Year 10 sheet to natural-or-made plus metals', () => {
    expect([...YEAR_10_MODES]).toEqual(['occurrence', 'metals']);
  });

  it('names every mode in the English dictionary', () => {
    const named = Object.keys(en.periodicTable.modes);
    expect(named).toHaveLength(VIEW_MODES.length);
  });
});
