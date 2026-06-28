// src/components/games/element-invaders/molecule-particle.tsx
'use client';

import React from 'react';
import { MoleculeInvader } from '../../../core-engine/types/molecular-combat';

interface MoleculeParticleProps {
  data: MoleculeInvader;
}

export function MoleculeParticle({ data }: MoleculeParticleProps) {
  if (!data.isAlive) return null;

  // Color schemes matching chemical acidity (Universal Indicator Concept)
  const themeStyles = {
    acid: 'bg-rose-500/90 border-rose-400 shadow-rose-500/50 text-white',
    base: 'bg-indigo-500/90 border-indigo-400 shadow-indigo-500/50 text-white',
    neutral: 'bg-emerald-500/90 border-emerald-400 shadow-emerald-500/50 text-slate-900',
  };

  return (
    <div
      style={{
        transform: `translate(${data.x}px, ${data.y}px)`,
      }}
      className={`
        absolute top-0 left-0
        /* Scalable shape: feels like a tightly packed molecular group */
        w-14 h-12 sm:w-16 sm:h-14
        flex flex-col items-center justify-center
        rounded-2xl border-2 shadow-lg font-mono
        transition-transform duration-75 ease-linear select-none
        ${themeStyles[data.type]}
      `}
    >
      {/* Outer spinning shell ring indicating chemical reactivity */}
      <div className="absolute -inset-1 border border-white/20 rounded-2xl animate-spin [animation-duration:8s]" />

      {/* Chemical Formula */}
      <span className="text-xs sm:text-sm font-black drop-shadow-xs">
        {data.formula}
      </span>

      {/* Tiny decorative atom bonds poking out slightly */}
      <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-inherit rounded-full border border-white/30" />
      <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-inherit rounded-full border border-white/30" />
    </div>
  );
}