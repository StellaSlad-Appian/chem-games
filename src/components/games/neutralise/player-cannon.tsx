// src/components/games/neutralize/player-cannon.tsx
'use client';

import React from 'react';

interface PlayerCannonProps {
  x: number;
  activeMissile: 'H-ion' | 'OH-ion';
}

export function PlayerCannon({ x, activeMissile }: PlayerCannonProps) {
  const isAcid = activeMissile === 'H-ion';

  return (
    <div
      className="absolute bottom-4 w-12 h-16 flex flex-col items-center justify-end transition-transform duration-75"
      style={{ transform: `translateX(${x}px) translateX(-50%)`, left: 0 }}
    >
      {/* Cannon Barrel */}
      <div className={`w-4 h-8 rounded-t-lg border-2 border-b-0 ${isAcid ? 'bg-rose-500/80 border-rose-400' : 'bg-indigo-500/80 border-indigo-400'}`} />
      
      {/* Cannon Base */}
      <div className="w-full h-8 bg-slate-800 border-2 border-slate-600 rounded-xl shadow-lg flex items-center justify-center font-mono text-xs font-black text-white">
        {isAcid ? 'H⁺' : 'OH⁻'}
      </div>
    </div>
  );
}