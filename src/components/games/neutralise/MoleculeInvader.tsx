// src/components/games/neutralise/MoleculeInvader.tsx
'use client';

import { MoleculeInvader } from '../../../core-engine/types/molecular-combat';
import MoleculeText from '../../ui/MoleculeText';

interface MoleculeParticleProps {
  data: MoleculeInvader;
}

export function MoleculeParticle({ data }: MoleculeParticleProps) {
  // Clamp the health percentage between 0 and 100 to prevent overflow/negative bars
  const healthPercentage = Math.max(0, Math.min(100, (data.currentHealth / data.maxHealth) * 100));

  return (
    <div
      style={{
        transform: `translate(${data.x}px, ${data.y}px)`,
        transition: 'transform 0.05s linear'
      }}
      data-testid="invader"
      data-formula={data.formula}
      data-health={data.currentHealth}
      className="absolute top-0 left-0 w-16 h-16 flex items-center justify-center rounded-2xl bg-(--surface-2) border-2 border-(--border-strong) shadow-xl"
    >
      <MoleculeText 
        formula={data.formula} 
        className="text-xl font-bold text-(--foreground) tracking-tight"
      />
      
      {/* Health Bar Container */}
      <div className="absolute -bottom-2 w-10 h-1 bg-(--border) rounded-full overflow-hidden">
        <div 
          className="h-full bg-(--success) transition-all duration-300 ease-out"
          style={{ width: `${healthPercentage}%` }}
        />
      </div>
    </div>
  );
}