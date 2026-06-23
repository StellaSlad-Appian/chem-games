// src/components/games/BlasterBubble.tsx
'use client';

import { useState } from 'react';
import MoleculeText from '../../ui/MoleculeText';

interface BlasterBubbleProps {
  id: string;
  formula: string;
  xPos: number;
  speed: number;
  isCorrect: boolean;
  hint: string;
  colorClass: string; 
  onClick: (id: string, isCorrect: boolean, hint: string) => void;
  onExpired: (id: string) => void;
}

export default function BlasterBubble({
  id,
  formula,
  xPos,
  speed,
  isCorrect,
  hint,
  colorClass, 
  onClick,
  onExpired,
}: BlasterBubbleProps) {
  const [hasError, setHasError] = useState(false);

  const handleInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!isCorrect) {
      setHasError(true);
      setTimeout(() => setHasError(false), 500);
    }
    onClick(id, isCorrect, hint);
  };

  return (
    <div
      onClick={handleInteraction}
      onAnimationEnd={(e) => {
        if (e.animationName.includes('floatUp')) {
          onExpired(id);
        }
      }}
      className="absolute bottom-0 cursor-pointer select-none touch-none will-change-transform flex items-center justify-center z-10"
      style={{
        left: `${xPos}%`,
        // Responsive dimensions: Base 20 (80px), MD 28 (112px)
        width: '80px',
        height: '80px',
        animation: `floatUp ${speed}s linear forwards`,
      }}
    >
      {/* SIZING UPGRADE: Increased to md:w-28 md:h-28 to ensure targets are 
        comfortable for mouse/thumb interactions.
      */}
      <div
        className={`w-full h-full md:w-28 md:h-28 rounded-full flex items-center justify-center border-2 shadow-xl transition-all duration-150
          ${hasError 
            ? 'shake-animation border-red-500 bg-red-950 text-red-100 shadow-[0_0_15px_rgba(239,68,68,0.4)]' 
            : `bg-slate-800/95 hover:scale-110 hover:text-white active:scale-95 ${colorClass}`
          }
        `}
      >
        <MoleculeText 
          formula={formula} 
          className="text-sm md:text-xl font-black tracking-wide select-none"
        />
      </div>
    </div>
  );
}