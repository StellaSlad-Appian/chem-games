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
      data-testid="player-cannon"
      data-ion={activeMissile}
      className="absolute bottom-4 w-12 h-16 flex flex-col items-center justify-end transition-transform duration-75"
      style={{ transform: `translateX(${x}px) translateX(-50%)`, left: 0 }}
    >
      {/* Cannon Barrel */}
      <div className={`w-4 h-8 rounded-t-lg border-2 border-b-0 ${isAcid ? 'bg-(--ion-h) border-(--ion-h)' : 'bg-(--ion-oh) border-(--ion-oh)'}`} />
      
      {/* Cannon Base */}
      <div className="w-full h-8 bg-(--surface-2) border-2 border-(--border-strong) rounded-xl shadow-lg flex items-center justify-center font-mono text-xs font-black text-(--foreground)">
        {isAcid ? 'H⁺' : 'OH⁻'}
      </div>
    </div>
  );
}