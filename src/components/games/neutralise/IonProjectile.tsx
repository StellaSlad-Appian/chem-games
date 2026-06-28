// src/components/games/neutralise/ion-projectile.tsx
'use client';

import React from 'react';
import { Projectile } from '../../../core-engine/types/molecular-combat';
import MoleculeText from '../../ui/MoleculeText';

interface IonProjectileProps {
  projectile: Projectile;
}

export function IonProjectile({ projectile }: IonProjectileProps) {
  // Mapping the damage type to the display formula
  const formulaMap: Record<Projectile['damageType'], string> = {
    'H-ion': 'H+',
    'OH-ion': 'OH-'
  };

  return (
    <div
      style={{
        transform: `translate(${projectile.x}px, ${projectile.y}px)`,
      }}
      className="absolute top-0 left-0 w-8 h-8 flex items-center justify-center rounded-full border-2 bg-slate-900 shadow-md animate-pulse"
    >
      <MoleculeText 
        formula={formulaMap[projectile.damageType]} 
        className="text-xs font-black font-mono text-white"
      />
    </div>
  );
}