// src/components/games/reaction-balancer/MassBeam.tsx
'use client';

import { useBalancerMessages } from '@/i18n/game-messages/reaction-balancer';

interface MassBeamProps {
  left: number;
  right: number;
}

const MAX_TILT_DEGREES = 12;

/**
 * "Relative mass in / out": a beam that tips towards the heavier side until
 * the equation balances. A supporting visual only (molar mass is not Year 10
 * content); the text readout carries the same information.
 */
export default function MassBeam({ left, right }: MassBeamProps) {
  const M = useBalancerMessages();
  const heavier = Math.max(left, right, 1);
  const tilt = Math.max(-MAX_TILT_DEGREES, Math.min(MAX_TILT_DEGREES, ((right - left) / heavier) * MAX_TILT_DEGREES));
  const level = Math.abs(right - left) < 0.05;
  const readout = `${M.beam.readout(left, right)} ${level ? M.beam.level : M.beam.tips(right > left ? 'right' : 'left')}`;

  return (
    <figure
      data-testid="mass-beam"
      data-level={level}
      className="flex w-full flex-col items-center rounded-2xl border-2 border-(--border) bg-(--surface-2) p-3"
    >
      <figcaption className="text-[10px] font-black uppercase tracking-wider text-(--muted)">{M.beam.label}</figcaption>
      <svg width="220" height="64" viewBox="0 0 220 64" role="img" aria-label={readout} className="mt-1">
        <polygon points="110,44 100,60 120,60" fill="var(--muted)" />
        <g className="beam-tilt" style={{ transform: `rotate(${tilt}deg)`, transformOrigin: '110px 42px' }}>
          <rect x="20" y="38" width="180" height="6" rx="3" fill="var(--foreground)" />
          <line x1="35" y1="44" x2="35" y2="52" stroke="var(--muted)" strokeWidth="2" />
          <line x1="185" y1="44" x2="185" y2="52" stroke="var(--muted)" strokeWidth="2" />
          <rect x="10" y="52" width="50" height="8" rx="4" fill={level ? 'var(--correct)' : 'var(--surface-2)'} stroke="var(--border)" strokeWidth="2" />
          <rect x="160" y="52" width="50" height="8" rx="4" fill={level ? 'var(--correct)' : 'var(--surface-2)'} stroke="var(--border)" strokeWidth="2" />
        </g>
        <text x="35" y="28" textAnchor="middle" fontSize="11" fontWeight="800" fill="var(--foreground)">
          {left}
        </text>
        <text x="185" y="28" textAnchor="middle" fontSize="11" fontWeight="800" fill="var(--foreground)">
          {right}
        </text>
      </svg>
      <p className="mt-1 text-center text-xs font-bold text-(--muted)">{readout}</p>
    </figure>
  );
}
