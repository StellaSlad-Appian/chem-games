// src/components/games/reaction-balancer/ParticleClusters.tsx
'use client';

import { useMemo } from 'react';

interface ParticleClustersProps {
  composition: Record<string, number>;
  /** The coefficient: one cluster per molecule. */
  count: number;
  /** Accessible summary, e.g. "2 molecules of water". */
  label: string;
}

/**
 * Atom colours are chemistry identity, not theme: the same element is always
 * the same colour in light and dark (docs/STYLE_GUIDE.md §2). The clusters
 * are decorative — the atom ledger is the accessible equivalent — so the
 * palette lives here rather than in globals.css.
 */
const ATOM_STYLES: Record<string, { bg: string; text: string }> = {
  H: { bg: '#e2e8f0', text: '#0f172a' },
  C: { bg: '#475569', text: '#ffffff' },
  N: { bg: '#3b82f6', text: '#ffffff' },
  O: { bg: '#ef4444', text: '#ffffff' },
  S: { bg: '#facc15', text: '#0f172a' },
  Cl: { bg: '#22c55e', text: '#ffffff' },
  Na: { bg: '#a855f7', text: '#ffffff' },
  K: { bg: '#9333ea', text: '#ffffff' },
  Mg: { bg: '#10b981', text: '#ffffff' },
  Ca: { bg: '#f97316', text: '#ffffff' },
  Al: { bg: '#94a3b8', text: '#0f172a' },
  Fe: { bg: '#ea580c', text: '#ffffff' },
  Cu: { bg: '#c2410c', text: '#ffffff' },
  Ag: { bg: '#cbd5e1', text: '#0f172a' },
  I: { bg: '#8b5cf6', text: '#ffffff' },
  Pb: { bg: '#64748b', text: '#ffffff' },
};
const FALLBACK_STYLE = { bg: '#06b6d4', text: '#ffffff' };

const MAX_VISIBLE_CLUSTERS = 6;

export default function ParticleClusters({ composition, count, label }: ParticleClustersProps) {
  const atoms = useMemo(
    () => Object.entries(composition).flatMap(([element, n]) => Array.from({ length: n }, () => element)),
    [composition]
  );
  const visible = Math.min(Math.max(count, 1), MAX_VISIBLE_CLUSTERS);
  const remaining = Math.max(count - visible, 0);

  return (
    <div
      className="flex min-h-10 flex-wrap items-center justify-center gap-1"
      aria-hidden="true"
      title={label}
      data-testid="particle-clusters"
      data-count={count}
    >
      {Array.from({ length: visible }).map((_, cluster) => (
        <span
          key={cluster}
          className="flex items-center gap-0.5 rounded-full border border-(--border) bg-(--background) px-1 py-0.5"
        >
          {atoms.map((element, i) => {
            const style = ATOM_STYLES[element] ?? FALLBACK_STYLE;
            return (
              <span
                key={`${cluster}-${i}`}
                className="flex h-4 w-4 items-center justify-center rounded-full text-[7px] font-black"
                style={{ backgroundColor: style.bg, color: style.text }}
              >
                {element}
              </span>
            );
          })}
        </span>
      ))}
      {remaining > 0 && <span className="text-[10px] font-bold text-(--muted)">+{remaining}</span>}
    </div>
  );
}
