'use client';

// The row of buttons that switches what the cells encode.
//
// Toggle buttons with `aria-pressed` rather than a radio group: a radio group
// takes arrow keys, and the arrow keys in this widget belong to the table. A
// pressed toggle is announced as "pressed" and reached with Tab, which is what
// this needs.
//
// No transition on the buttons or the cells. docs/ACCESSIBILITY.md §4 makes
// animation opt-in under `prefers-reduced-motion`, and a mode switch that
// cross-fades 118 cells is motion nobody asked for; not animating at all is
// simpler than animating conditionally.

import { useI18n } from '@/i18n/client';
import type { ViewMode } from './view-modes';

/** ViewMode -> the key its name lives under in `periodicTable.modes`. */
export const MODE_LABEL_KEY = {
  metals: 'metals',
  families: 'families',
  'outer-shell': 'outerShell',
  'atomic-size': 'atomicSize',
  reactivity: 'reactivity',
  'ion-formed': 'ionFormed',
  occurrence: 'occurrence',
} as const satisfies Record<ViewMode, string>;

export function ViewModeSwitch({
  modes,
  active,
  onChange,
}: {
  modes: readonly ViewMode[];
  active: ViewMode;
  onChange: (mode: ViewMode) => void;
}) {
  const { t } = useI18n();

  return (
    <div role="group" aria-label={t.periodicTable.modeLabel} className="mt-4">
      <p className="text-xs font-black uppercase tracking-wider text-(--muted)">
        {t.periodicTable.modeLabel}
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {modes.map((mode) => {
          const isActive = mode === active;
          return (
            <button
              key={mode}
              type="button"
              aria-pressed={isActive}
              onClick={() => onChange(mode)}
              className={[
                'min-h-11 rounded-xl border-2 px-3 py-1.5 text-xs font-black uppercase tracking-wider',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500',
                isActive
                  ? 'border-blue-500 bg-blue-500 text-white'
                  : 'border-(--border) bg-(--background) text-(--foreground) hover:border-blue-500',
              ].join(' ')}
            >
              {t.periodicTable.modes[MODE_LABEL_KEY[mode]]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
