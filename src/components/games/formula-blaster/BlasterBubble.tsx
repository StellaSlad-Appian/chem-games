// src/components/games/formula-blaster/BlasterBubble.tsx
'use client';

import { useState } from 'react';
import MoleculeText from '../../ui/MoleculeText';

interface BlasterBubbleProps {
  id: string;
  formula: string;
  compoundId: string;
  xPos: number;
  speed: number;
  isCorrect: boolean;
  colorClass: string;
  isPaused: boolean;
  onClick: (
    id: string,
    isCorrect: boolean,
    compoundId: string,
    clickCoords: { x: number; y: number }
  ) => void;
  onExpired: (id: string) => void;
}

export default function BlasterBubble({
  id,
  formula,
  compoundId,
  xPos,
  speed,
  isCorrect,
  colorClass,
  isPaused,
  onClick,
  onExpired,
}: BlasterBubbleProps) {
  const [hasError, setHasError] = useState(false);

  const handleInteraction = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    e.preventDefault();

    // Capture click coordinates relative to viewport
    const rect = e.currentTarget.getBoundingClientRect();

    const clickCoords = {
      x: rect.left + rect.width / 2,
      y: rect.top,
    };

    if (!isCorrect) {
      setHasError(true);

      setTimeout(() => setHasError(false), 500);
    }

    onClick(
      id,
      isCorrect,
      compoundId,
      clickCoords
    );
  };

  return (
    <div
      onClick={handleInteraction}
      onAnimationEnd={(e) => {
        if (e.animationName.includes('floatUp')) {
          onExpired(id);
        }
      }}
      className="absolute bottom-0 z-10 cursor-pointer select-none touch-none will-change-transform flex items-center justify-center"
      style={{
        left: `${xPos}%`,
        animation: `floatUp ${speed}s linear forwards`,
        animationPlayState: isPaused ? 'paused' : 'running',
      }}
    >
      <div
        className={`h-20 w-20 rounded-full flex items-center justify-center border-2 shadow-md transition-all duration-150 md:h-28 md:w-28 ${
          hasError
            ? 'border-rose-500 bg-rose-950 text-rose-100 shadow-rose-500/40 animate-shake'
            : `bg-[var(--surface)] hover:scale-110 active:scale-95 ${colorClass}`
        }`}
      >
        <MoleculeText
          formula={formula}
          className="text-sm font-black tracking-wide md:text-xl"
        />
      </div>
    </div>
  );
}