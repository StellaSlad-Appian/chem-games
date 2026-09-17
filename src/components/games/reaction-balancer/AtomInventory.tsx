'use client';

import { useMemo } from 'react';

import {
  calculateAtomInventory,
} from '@/core-engine/utils/chemical-utils';
import { useI18n } from '@/i18n/client';

interface ParsedCompound {
  compoundId: string;
}

interface AtomInventoryProps {
  reactants: ParsedCompound[];
  products: ParsedCompound[];
  reactantCoeffs: (number | '')[];
  productCoeffs: (number | '')[];
}

interface AtomDotProps {
  element: string;
}

const atomStyles: Record<
  string,
  {
    bg: string;
    border: string;
    text: string;
  }
> = {
  H: {
    bg: '#f1f5f9',
    border: '#cbd5e1',
    text: '#0f172a',
  },
  C: {
    bg: '#475569',
    border: '#94a3b8',
    text: '#ffffff',
  },
  N: {
    bg: '#3b82f6',
    border: '#93c5fd',
    text: '#ffffff',
  },
  O: {
    bg: '#ef4444',
    border: '#fca5a5',
    text: '#ffffff',
  },
  S: {
    bg: '#facc15',
    border: '#fde68a',
    text: '#0f172a',
  },
  Cl: {
    bg: '#22c55e',
    border: '#86efac',
    text: '#ffffff',
  },
  Na: {
    bg: '#a855f7',
    border: '#d8b4fe',
    text: '#ffffff',
  },
  K: {
    bg: '#9333ea',
    border: '#c084fc',
    text: '#ffffff',
  },
  Mg: {
    bg: '#10b981',
    border: '#6ee7b7',
    text: '#ffffff',
  },
  Ca: {
    bg: '#f97316',
    border: '#fdba74',
    text: '#ffffff',
  },
  Al: {
    bg: '#94a3b8',
    border: '#e2e8f0',
    text: '#0f172a',
  },
  Fe: {
    bg: '#ea580c',
    border: '#fdba74',
    text: '#ffffff',
  },
  Cu: {
    bg: '#c2410c',
    border: '#fb923c',
    text: '#ffffff',
  },
  Ag: {
    bg: '#cbd5e1',
    border: '#f8fafc',
    text: '#0f172a',
  },
  I: {
    bg: '#8b5cf6',
    border: '#c4b5fd',
    text: '#ffffff',
  },
  Pb: {
    bg: '#64748b',
    border: '#cbd5e1',
    text: '#ffffff',
  },
};

function AtomDot({
  element,
}: AtomDotProps) {
  const style =
    atomStyles[element] ?? {
      bg: '#06b6d4',
      border: '#67e8f9',
      text: '#ffffff',
    };

  return (
    <span
      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[7px] font-black shadow-sm"
      style={{
        backgroundColor: style.bg,
        borderColor: style.border,
        color: style.text,
      }}
      title={element}
      aria-hidden="true"
    >
      {element}
    </span>
  );
}

function AtomDots({
  element,
  count,
}: {
  element: string;
  count: number;
}) {
  const visibleCount = Math.min(
    count,
    8
  );

  const remaining = Math.max(
    count - visibleCount,
    0
  );

  return (
    <div className="flex min-h-8 flex-wrap items-center justify-center gap-1">
      {Array.from({
        length: visibleCount,
      }).map((_, index) => (
        <AtomDot
          key={`${element}-${index}`}
          element={element}
        />
      ))}

      {remaining > 0 && (
        <span className="ml-1 text-[9px] font-bold text-[var(--muted)]">
          +{remaining}
        </span>
      )}
    </div>
  );
}

function BalanceScale({
  element,
  leftCount,
  rightCount,
  balanced,
}: {
  element: string;
  leftCount: number;
  rightCount: number;
  balanced: boolean;
}) {
  const { t, f } = useI18n();
  const balanceState: 'left-heavy' | 'balanced' | 'right-heavy' =
    balanced
      ? 'balanced'
      : leftCount > rightCount
        ? 'left-heavy'
        : 'right-heavy';

  const statusColor =
    balanceState === 'balanced'
      ? '#34d399'
      : '#fbbf24';

  /*
   * Three explicit visual states:
   *
   * balanced:
   *        ─────────
   *
   * left-heavy:
   *        \────────
   *
   * right-heavy:
   *        ────────/
   *
   * In a physical balance, the side with more atoms
   * must be LOWER.
   */

  const beamTransform =
    balanceState === 'left-heavy'
      ? 'rotate(-8 130 47)'
      : balanceState === 'right-heavy'
        ? 'rotate(8 130 47)'
        : 'rotate(0 130 47)';

  return (
    <div className="relative flex h-28 w-full min-w-[260px] items-center justify-center overflow-hidden rounded-xl border border-slate-700/80 bg-slate-950/40 px-2">
      <svg
        width="260"
        height="112"
        viewBox="0 0 260 112"
        role="img"
        aria-label={f(t.games.reactionBalancer.atomBalanceA11y, {
          element,
          left: leftCount,
          right: rightCount,
        })}
      >
        {/* Element */}
        <text
          x="130"
          y="16"
          textAnchor="middle"
          fill="white"
          fontSize="16"
          fontWeight="800"
        >
          {element}
        </text>

        {/* Fulcrum */}
        <polygon
          points="130,88 119,104 141,104"
          fill="#64748b"
        />

        {/* Complete balance assembly */}
        <g
          transform={beamTransform}
          style={{
            transition:
              'transform 250ms ease-in-out',
            transformOrigin: '130px 47px',
          }}
        >
          {/* Beam */}
          <rect
            x="48"
            y="43"
            width="164"
            height="7"
            rx="3.5"
            fill="#94a3b8"
          />

          {/* Left suspension */}
          <line
            x1="66"
            y1="49"
            x2="66"
            y2="65"
            stroke="#64748b"
            strokeWidth="2"
          />

          {/* Right suspension */}
          <line
            x1="194"
            y1="49"
            x2="194"
            y2="65"
            stroke="#64748b"
            strokeWidth="2"
          />

          {/* Left pan */}
          <rect
            x="36"
            y="65"
            width="60"
            height="18"
            rx="9"
            fill="#1e293b"
            stroke="#475569"
            strokeWidth="2"
          />

          {/* Right pan */}
          <rect
            x="164"
            y="65"
            width="60"
            height="18"
            rx="9"
            fill="#1e293b"
            stroke="#475569"
            strokeWidth="2"
          />
        </g>

        {/* Centre status */}
        <circle
          cx="130"
          cy="45"
          r="13"
          fill="#0f172a"
          stroke={statusColor}
          strokeWidth="2"
        />

        <text
          x="130"
          y="45"
          textAnchor="middle"
          dominantBaseline="central"
          fill={statusColor}
          fontSize="13"
          fontWeight="900"
        >
          {balanceState === 'balanced'
            ? '✓'
            : '≠'}
        </text>
      </svg>

      {/* Left atom representation */}
      <div className="pointer-events-none absolute left-7 top-[70px] flex w-14 justify-center">
        <AtomDots
          element={element}
          count={leftCount}
        />
      </div>

      {/* Right atom representation */}
      <div className="pointer-events-none absolute right-7 top-[70px] flex w-14 justify-center">
        <AtomDots
          element={element}
          count={rightCount}
        />
      </div>
    </div>
  );
}

export default function AtomInventory({
  reactants,
  products,
  reactantCoeffs,
  productCoeffs,
}: AtomInventoryProps) {
  const { t, f } = useI18n();
  const {
    leftAtoms,
    rightAtoms,
    allElements,
    allBalanced,
  } = useMemo(() => {
    const left =
      calculateAtomInventory(
        reactants,
        reactantCoeffs
      );

    const right =
      calculateAtomInventory(
        products,
        productCoeffs
      );

    const elements = Array.from(
      new Set([
        ...Object.keys(left),
        ...Object.keys(right),
      ])
    ).sort();

    const balanced =
      elements.length > 0 &&
      elements.every(
        (element) =>
          (left[element] || 0) ===
          (right[element] || 0)
      );

    return {
      leftAtoms: left,
      rightAtoms: right,
      allElements: elements,
      allBalanced: balanced,
    };
  }, [
    reactants,
    products,
    reactantCoeffs,
    productCoeffs,
  ]);

  return (
    <div
      className={`mt-6 w-full max-w-xl rounded-2xl border-2 p-4 shadow-xl transition-all sm:p-5 ${
        allBalanced
          ? 'border-emerald-500/40 bg-emerald-500/5 shadow-emerald-500/10'
          : 'border-slate-700 bg-slate-900/70'
      }`}
    >
      {/* Header */}
      <div className="mb-5 text-center">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[var(--muted)]">
          {t.games.reactionBalancer.atomBalance}
        </h3>

        <div className="mt-3 flex items-center justify-center gap-12 text-[9px] font-black uppercase tracking-[0.2em] text-[var(--muted)]">
          <span>{t.games.reactionBalancer.reactants}</span>
          <span>{t.games.reactionBalancer.products}</span>
        </div>

        <p className="mt-2 text-xs text-[var(--muted)]">
          {t.games.reactionBalancer.scaleHint}
        </p>
      </div>

      {/* Element scales */}
      <div className="space-y-3">
        {allElements.map((element) => {
          const leftCount =
            leftAtoms[element] || 0;

          const rightCount =
            rightAtoms[element] || 0;

          return (
            <BalanceScale
              key={element}
              element={element}
              leftCount={leftCount}
              rightCount={rightCount}
              balanced={
                leftCount === rightCount
              }
            />
          );
        })}
      </div>

      {/* Success state */}
      {allBalanced && (
        <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 px-3 py-2 text-center">
          <span className="text-sm font-black text-emerald-400">
            ✓ {t.games.reactionBalancer.balanced}
          </span>
        </div>
      )}
    </div>
  );
}