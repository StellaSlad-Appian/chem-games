'use client';

// The active mode's key.
//
// Every mode renders one, always — a badge that means nothing is worse than no
// badge. The swatch repeats the tone and the badge repeats the cell's text, so
// the row can be matched to the grid either way round.

import { useI18n } from '@/i18n/client';
import type { Dictionary } from '@/i18n/dictionaries/en';
import {
  legendRows,
  legendTone,
  type LegendKey,
  type ViewMode,
} from './view-modes';

/**
 * The legend text for one row.
 *
 * Every key but the eight outer-shell counts has a row of its own in the
 * dictionary. Those eight share one string with the count filled in, so that
 * a translator writes "Electrons in the outer shell: {n}" once rather than
 * eight near-identical sentences — and so the numeral sits after a colon,
 * where it governs nothing, which is what Russian needs.
 */
export function legendLabel(
  t: Dictionary,
  f: (template: string, values?: Record<string, string | number>) => string,
  key: LegendKey
): string {
  const outer = /^outer-([1-8])$/.exec(key);
  if (outer) return f(t.periodicTable.legend['outer-count'], { n: Number(outer[1]) });
  return t.periodicTable.legend[key as Exclude<LegendKey, `outer-${number}`>];
}

/** The badge a legend row should show, mirroring what the cells print. */
function legendBadge(t: Dictionary, mode: ViewMode, key: LegendKey): string {
  const outer = /^outer-([1-8])$/.exec(key);
  if (outer) return outer[1];

  switch (key) {
    case 'outer-none':
    case 'reactivity-none':
    case 'ion-none':
      return t.periodicTable.badge.none;
    case 'metal':
      return t.periodicTable.badge.metal;
    case 'non-metal':
    case 'other-non-metal':
      return t.periodicTable.badge.nonMetal;
    case 'metalloid':
      return t.periodicTable.badge.metalloid;
    case 'alkali-metal':
      return t.periodicTable.badge.alkali;
    case 'alkaline-earth':
      return t.periodicTable.badge.alkalineEarth;
    case 'transition-metal':
      return t.periodicTable.badge.transition;
    case 'post-transition-metal':
      return t.periodicTable.badge.postTransition;
    case 'lanthanide':
      return t.periodicTable.badge.lanthanide;
    case 'actinide':
      return t.periodicTable.badge.actinide;
    case 'halogen':
      return t.periodicTable.badge.halogen;
    case 'noble-gas':
      return t.periodicTable.badge.nobleGas;
    case 'natural':
      return t.periodicTable.badge.natural;
    case 'synthetic':
      return t.periodicTable.badge.synthetic;
    case 'reactivity-unreactive':
      return '0';
    case 'reactivity-low':
      return '1';
    case 'reactivity-moderate':
      return '2';
    case 'reactivity-high':
      return '3';
    case 'reactivity-very-high':
      return '4';
    case 'ion-positive':
      return '+';
    case 'ion-negative':
      return '−';
    default:
      // The five size bands. The cell prints a measurement, not a category, so
      // the swatch and the label carry the row on their own.
      return '';
  }
}

export function Legend({ mode }: { mode: ViewMode }) {
  const { t, f } = useI18n();
  const rows = legendRows(mode);

  const note =
    mode === 'reactivity'
      ? t.periodicTable.reactivityNote
      : mode === 'atomic-size'
        ? t.periodicTable.sizeNote
        : undefined;

  return (
    <div className="mt-4" data-testid="periodic-table-legend">
      <h4 className="text-xs font-black uppercase tracking-wider text-(--muted)">
        {t.periodicTable.legendHeading}
      </h4>
      <ul className="mt-2 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
        {rows.map((key) => {
          const badge = legendBadge(t, mode, key);
          return (
            <li key={key} className="flex items-start gap-2 text-xs text-(--foreground)">
              <span
                aria-hidden="true"
                style={{ background: `var(--pt-tone-${legendTone(key)})` }}
                className="mt-0.5 flex h-5 min-w-8 shrink-0 items-center justify-center rounded border border-(--border) px-1 text-[9px] font-black text-(--foreground)"
              >
                {badge}
              </span>
              <span>{legendLabel(t, f, key)}</span>
            </li>
          );
        })}
      </ul>
      {note && <p className="mt-2 text-xs text-(--muted)">{note}</p>}
    </div>
  );
}
