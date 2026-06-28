// src/components/games/neutralize/ion-projectile.tsx
'use client';

import React from 'react';
// 1. Updated import to Projectile
import { Projectile } from '../../../core-engine/types/molecular-combat';

interface IonProjectileProps {
  projectile: Projectile; // 2. Updated interface reference
}

export function IonProjectile({ projectile }: IonProjectileProps) {
  
  // 3. Explicitly typed the map so TS knows exactly what keys to expect
  const symbolMap: Record<Projectile['damageType'], { text: string; color: string }> = {
    'H-ion': { text: 'H⁺', color: 'text-rose-400 bg-rose-950/80 border-rose-500' },
    'OH-ion': { text: 'OH⁻', color: 'text-indigo-300 bg-indigo-950/80 border-indigo-500' },
    'radical': { text: 'e⁻', color: 'text-amber-400 bg-amber-950/80 border-amber-500' },
  };

  const currentStyle = symbolMap[projectile.damageType];

  return (
    <div
      style={{
        transform: `translate(${projectile.x}px, ${projectile.y}px)`,
      }}
      className={`
        absolute top-0 left-0
        w-6 h-6 sm:w-7 sm:h-7
        flex items-center justify-center
        rounded-full border text-[10px] sm:text-xs font-black font-mono
        shadow-md animate-pulse
        ${currentStyle.color}
      `}
    >
      {currentStyle.text}
    </div>
  );
}