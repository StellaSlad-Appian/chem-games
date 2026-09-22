// src/components/periodic-table/view-modes.ts
//
// What a cell looks like in a given view mode, as a pure function.
//
// `describeCell(entry, mode)` returns a tone (a CSS custom-property suffix), a
// badge (the text the cell prints) and a legend key (which row of the legend
// this cell belongs to). It renders nothing, reads no context and knows no
// locale, which is what makes view-modes.test.ts able to assert the
// accessibility rule — **every mode prints a badge in every one of the 118
// cells** — without mounting a component.
//
// Colour is never the only carrier. That is not a style preference here; it is
// docs/ACCESSIBILITY.md §3 and the reason the badge is part of the return type
// rather than something the component adds if it remembers to.
//
// Atomic radius is read from ELEMENTS_REGISTRY, which already carries it for
// all 118 elements. It is not duplicated into periodic-table.ts.

import { ELEMENTS_REGISTRY } from '@/core-engine/data/elements';
import type { PeriodicTableEntry } from '@/core-engine/types/chemistry';
import { ionLabel } from '@/core-engine/data/periodic-table';

/**
 * The view modes, in the order the switch presents them.
 *
 * This list is §4.7 of the redesign, which supersedes the six proposed in §6
 * D6: *atomic size* and *reactivity* are named in VC2S10U07's content
 * description itself, and *state at 25 °C* was cut for not earning its place.
 */
export const VIEW_MODES = [
  'metals',
  'families',
  'outer-shell',
  'atomic-size',
  'reactivity',
  'ion-formed',
  'occurrence',
] as const;

export type ViewMode = (typeof VIEW_MODES)[number];

/**
 * The Year 9 sheet (VC2S10U07). Six modes; *natural or made* belongs to the
 * decay story and is not on this sheet.
 */
export const YEAR_9_MODES: readonly ViewMode[] = [
  'metals',
  'families',
  'outer-shell',
  'atomic-size',
  'reactivity',
  'ion-formed',
];

/**
 * The Year 10 sheet (VC2S10U06). The same component, gated to the mode that
 * sheet teaches plus metals for orientation, with a link back to the Year 9
 * sheet for the rest.
 */
export const YEAR_10_MODES: readonly ViewMode[] = ['occurrence', 'metals'];

/**
 * What a cell prints.
 *
 * Either text that is the same in every language — a digit, `1+`, an atomic
 * radius — or a key into `periodicTable.badge` in the dictionary, for the
 * abbreviations that are words and therefore translate. Keeping the two apart
 * is what stops a number being run through a translation lookup and a word
 * being rendered raw.
 */
export type CellBadge = { readonly text: string } | { readonly labelKey: BadgeKey };

export type BadgeKey =
  | 'metal'
  | 'nonMetal'
  | 'metalloid'
  | 'alkali'
  | 'alkalineEarth'
  | 'transition'
  | 'postTransition'
  | 'lanthanide'
  | 'actinide'
  | 'halogen'
  | 'nobleGas'
  | 'natural'
  | 'synthetic'
  | 'none';

/**
 * A row of the legend, and the group of cells that belongs to it.
 *
 * Every value `describeCell` can return is one of these, which is what
 * view-modes.test.ts checks against the English dictionary: a legend row with
 * no cells is clutter, and a cell with no legend row is unexplained colour.
 */
export type LegendKey =
  | 'metal'
  | 'non-metal'
  | 'metalloid'
  | 'alkali-metal'
  | 'alkaline-earth'
  | 'transition-metal'
  | 'post-transition-metal'
  | 'lanthanide'
  | 'actinide'
  | 'halogen'
  | 'noble-gas'
  | 'other-non-metal'
  | 'outer-1'
  | 'outer-2'
  | 'outer-3'
  | 'outer-4'
  | 'outer-5'
  | 'outer-6'
  | 'outer-7'
  | 'outer-8'
  | 'outer-none'
  | 'size-smallest'
  | 'size-small'
  | 'size-medium'
  | 'size-large'
  | 'size-largest'
  | 'reactivity-unreactive'
  | 'reactivity-low'
  | 'reactivity-moderate'
  | 'reactivity-high'
  | 'reactivity-very-high'
  | 'reactivity-none'
  | 'ion-positive'
  | 'ion-negative'
  | 'ion-none'
  | 'natural'
  | 'synthetic';

/**
 * The name of a `--pt-tone-*` custom property in src/app/globals.css.
 *
 * A name, not a colour: no component in this folder holds a hex value, and
 * both themes are defined in one place where they can be checked against each
 * other.
 */
export type Tone =
  | 'metal'
  | 'non-metal'
  | 'metalloid'
  | 'alkali-metal'
  | 'alkaline-earth'
  | 'transition-metal'
  | 'post-transition-metal'
  | 'lanthanide'
  | 'actinide'
  | 'halogen'
  | 'noble-gas'
  | 'nonmetal'
  | 'natural'
  | 'synthetic'
  | 'cation'
  | 'anion'
  | 'seq-1'
  | 'seq-2'
  | 'seq-3'
  | 'seq-4'
  | 'seq-5'
  | 'seq-6'
  | 'seq-7'
  | 'seq-8'
  | 'none';

export interface CellView {
  tone: Tone;
  badge: CellBadge;
  legendKey: LegendKey;
}

/** Atomic radius in picometres, by atomic number, from the registry. */
const RADIUS = new Map<number, number>(
  ELEMENTS_REGISTRY.flatMap((element) =>
    element.atomicRadius === undefined ? [] : [[element.atomicNumber, element.atomicRadius]]
  )
);

/**
 * Size bands in picometres.
 *
 * Absolute bands rather than a rank over the 118, because the lesson
 * VC2S10U07 asks for is the *shape* of the trend — small at the top right,
 * large at the bottom left — and a rank flattens the fact that the drop across
 * period 2 is far steeper than the drop across period 6.
 */
const SIZE_BANDS: readonly { readonly max: number; readonly key: LegendKey; readonly tone: Tone }[] = [
  { max: 100, key: 'size-smallest', tone: 'seq-1' },
  { max: 150, key: 'size-small', tone: 'seq-3' },
  { max: 200, key: 'size-medium', tone: 'seq-4' },
  { max: 250, key: 'size-large', tone: 'seq-6' },
  { max: Infinity, key: 'size-largest', tone: 'seq-8' },
];

const FAMILY: Record<
  PeriodicTableEntry['category'],
  { tone: Tone; badge: BadgeKey; legendKey: LegendKey }
> = {
  'alkali-metal': { tone: 'alkali-metal', badge: 'alkali', legendKey: 'alkali-metal' },
  'alkaline-earth': { tone: 'alkaline-earth', badge: 'alkalineEarth', legendKey: 'alkaline-earth' },
  'transition-metal': { tone: 'transition-metal', badge: 'transition', legendKey: 'transition-metal' },
  'post-transition-metal': {
    tone: 'post-transition-metal',
    badge: 'postTransition',
    legendKey: 'post-transition-metal',
  },
  lanthanide: { tone: 'lanthanide', badge: 'lanthanide', legendKey: 'lanthanide' },
  actinide: { tone: 'actinide', badge: 'actinide', legendKey: 'actinide' },
  metalloid: { tone: 'metalloid', badge: 'metalloid', legendKey: 'metalloid' },
  halogen: { tone: 'halogen', badge: 'halogen', legendKey: 'halogen' },
  'noble-gas': { tone: 'noble-gas', badge: 'nobleGas', legendKey: 'noble-gas' },
  nonmetal: { tone: 'nonmetal', badge: 'nonMetal', legendKey: 'other-non-metal' },
};

const METAL_CLASS: Record<
  PeriodicTableEntry['metalClass'],
  { tone: Tone; badge: BadgeKey; legendKey: LegendKey }
> = {
  metal: { tone: 'metal', badge: 'metal', legendKey: 'metal' },
  'non-metal': { tone: 'non-metal', badge: 'nonMetal', legendKey: 'non-metal' },
  metalloid: { tone: 'metalloid', badge: 'metalloid', legendKey: 'metalloid' },
};

const REACTIVITY: Record<
  NonNullable<PeriodicTableEntry['reactivity']>,
  { tone: Tone; rank: number; legendKey: LegendKey }
> = {
  unreactive: { tone: 'seq-1', rank: 0, legendKey: 'reactivity-unreactive' },
  low: { tone: 'seq-3', rank: 1, legendKey: 'reactivity-low' },
  moderate: { tone: 'seq-4', rank: 2, legendKey: 'reactivity-moderate' },
  high: { tone: 'seq-6', rank: 3, legendKey: 'reactivity-high' },
  'very-high': { tone: 'seq-8', rank: 4, legendKey: 'reactivity-very-high' },
};

const OUTER_TONE: readonly Tone[] = [
  'seq-1',
  'seq-2',
  'seq-3',
  'seq-4',
  'seq-5',
  'seq-6',
  'seq-7',
  'seq-8',
];

const OUTER_LEGEND: readonly LegendKey[] = [
  'outer-1',
  'outer-2',
  'outer-3',
  'outer-4',
  'outer-5',
  'outer-6',
  'outer-7',
  'outer-8',
];

/** The cell that says "there is no value here", shared by three modes. */
const NO_VALUE = { tone: 'none', badge: { labelKey: 'none' } } as const;

/** How one cell should look in one mode. Pure; renders nothing. */
export function describeCell(entry: PeriodicTableEntry, mode: ViewMode): CellView {
  switch (mode) {
    case 'metals': {
      const { tone, badge, legendKey } = METAL_CLASS[entry.metalClass];
      return { tone, badge: { labelKey: badge }, legendKey };
    }

    case 'families': {
      const { tone, badge, legendKey } = FAMILY[entry.category];
      return { tone, badge: { labelKey: badge }, legendKey };
    }

    case 'outer-shell': {
      // Null across the d- and f-blocks, on purpose. See periodic-table.ts.
      if (entry.outerElectrons === null) {
        return { ...NO_VALUE, legendKey: 'outer-none' };
      }
      return {
        tone: OUTER_TONE[entry.outerElectrons - 1],
        // A digit, so it needs no translation in any locale the site ships.
        badge: { text: String(entry.outerElectrons) },
        legendKey: OUTER_LEGEND[entry.outerElectrons - 1],
      };
    }

    case 'atomic-size': {
      const radius = RADIUS.get(entry.atomicNumber);
      if (radius === undefined) return { ...NO_VALUE, legendKey: 'size-medium' };
      const band = SIZE_BANDS.find((candidate) => radius < candidate.max) ?? SIZE_BANDS[4];
      // The radius itself in picometres: the quantity VC2S10U07 names, printed
      // rather than encoded. Integers below 1000, so no locale groups them.
      return { tone: band.tone, badge: { text: String(radius) }, legendKey: band.key };
    }

    case 'reactivity': {
      if (entry.reactivity === null) {
        return { ...NO_VALUE, legendKey: 'reactivity-none' };
      }
      const { tone, rank, legendKey } = REACTIVITY[entry.reactivity];
      // 0 to 4, *within the group*. The legend says so; see the note on
      // `Reactivity` in types/chemistry.ts for why it cannot mean more.
      return { tone, badge: { text: String(rank) }, legendKey };
    }

    case 'ion-formed': {
      const label = ionLabel(entry.commonIonCharge);
      if (label === undefined) {
        return { ...NO_VALUE, legendKey: 'ion-none' };
      }
      return {
        tone: entry.commonIonCharge! > 0 ? 'cation' : 'anion',
        badge: { text: label },
        legendKey: entry.commonIonCharge! > 0 ? 'ion-positive' : 'ion-negative',
      };
    }

    case 'occurrence': {
      return entry.occurrence === 'natural'
        ? { tone: 'natural', badge: { labelKey: 'natural' }, legendKey: 'natural' }
        : { tone: 'synthetic', badge: { labelKey: 'synthetic' }, legendKey: 'synthetic' };
    }
  }
}

/**
 * The legend rows for a mode, in reading order.
 *
 * Fixed per mode rather than derived from the 118 entries, so a legend row
 * never disappears because the data happens not to use it — and
 * view-modes.test.ts asserts in both directions that the two agree.
 */
export function legendRows(mode: ViewMode): readonly LegendKey[] {
  switch (mode) {
    case 'metals':
      return ['metal', 'metalloid', 'non-metal'];
    case 'families':
      return [
        'alkali-metal',
        'alkaline-earth',
        'transition-metal',
        'lanthanide',
        'actinide',
        'post-transition-metal',
        'metalloid',
        'other-non-metal',
        'halogen',
        'noble-gas',
      ];
    case 'outer-shell':
      return [...OUTER_LEGEND, 'outer-none'];
    case 'atomic-size':
      return ['size-smallest', 'size-small', 'size-medium', 'size-large', 'size-largest'];
    case 'reactivity':
      return [
        'reactivity-unreactive',
        'reactivity-low',
        'reactivity-moderate',
        'reactivity-high',
        'reactivity-very-high',
        'reactivity-none',
      ];
    case 'ion-formed':
      return ['ion-positive', 'ion-negative', 'ion-none'];
    case 'occurrence':
      return ['natural', 'synthetic'];
  }
}

/** The tone a legend row's swatch should carry, so the key matches the grid. */
export function legendTone(key: LegendKey): Tone {
  switch (key) {
    case 'outer-none':
    case 'reactivity-none':
    case 'ion-none':
      return 'none';
    case 'outer-1':
    case 'outer-2':
    case 'outer-3':
    case 'outer-4':
    case 'outer-5':
    case 'outer-6':
    case 'outer-7':
    case 'outer-8':
      return OUTER_TONE[Number(key.slice(-1)) - 1];
    case 'size-smallest':
    case 'size-small':
    case 'size-medium':
    case 'size-large':
    case 'size-largest':
      return SIZE_BANDS.find((band) => band.key === key)!.tone;
    case 'reactivity-unreactive':
      return 'seq-1';
    case 'reactivity-low':
      return 'seq-3';
    case 'reactivity-moderate':
      return 'seq-4';
    case 'reactivity-high':
      return 'seq-6';
    case 'reactivity-very-high':
      return 'seq-8';
    case 'ion-positive':
      return 'cation';
    case 'ion-negative':
      return 'anion';
    case 'non-metal':
      return 'non-metal';
    case 'other-non-metal':
      return 'nonmetal';
    default:
      // Every remaining key is named after its tone: the metal classes, the
      // eight families and the two occurrences.
      return key as Tone;
  }
}
