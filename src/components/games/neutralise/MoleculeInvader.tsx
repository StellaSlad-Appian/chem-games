// src/components/games/neutralise/molecule-invader.tsx
'use client';

import { MoleculeInvader } from '../../../core-engine/types/molecular-combat';
import MoleculeText from '../../ui/MoleculeText';

interface MoleculeParticleProps {
  data: MoleculeInvader;
}

export function MoleculeParticle({ data }: MoleculeParticleProps) {
  return (
    <div
      style={{
        transform: `translate(${data.x}px, ${data.y}px)`,
        transition: 'transform 0.05s linear' // Smooth movement
      }}
      className="absolute top-0 left-0 w-16 h-16 flex items-center justify-center rounded-2xl bg-slate-800 border-2 border-slate-600 shadow-xl"
    >
      <MoleculeText 
        formula={data.formula} 
        className="text-xl font-bold text-white tracking-tight"
      />
      {/* Optional: Add a simple health bar below the text */}
      <div className="absolute -bottom-2 w-10 h-1 bg-slate-900 rounded-full overflow-hidden">
        <div 
          className="h-full bg-emerald-500 transition-all duration-300"
          style={{ width: `${(data.currentHealth / data.maxHealth) * 100}%` }}
        />
      </div>
    </div>
  );
}