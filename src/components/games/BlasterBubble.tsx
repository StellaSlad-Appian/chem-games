// src/components/games/BlasterBubble.tsx
'use client';

import { useState } from 'react';

interface BlasterBubbleProps {
  id: string;
  formula: string;
  xPos: number;
  speed: number;
  isCorrect: boolean;
  hint: string;
  onClick: (id: string, isCorrect: boolean, hint: string) => void;
  onExpired: (id: string) => void;
}

// Safe Typographic parsing for subscripts without inline styling overhead (AC 1.4)
const renderSubscripts = (formulaStr: string) => {
  return formulaStr.split(/(\d+)/).map((part, index) => {
    if (/\d+/.test(part)) {
      return <sub key={index} className="bottom-[-0.2em] text-[0.75em] leading-none font-bold">{part}</sub>;
    }
Part return part;
  });
};

export default function BlasterBubble({
  id,
  formula,
  xPos,
  speed,
  isCorrect,
  hint,
  onClick,
  onExpired,
}: BlasterBubbleProps) {
  const [hasError, setHasError] = useState(false);

  const handleInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!isCorrect) {
      setHasError(true);
      // Automatically snap shake state off after animation finishes cycles (AC 4.1)
      setTimeout(() => setHasError(false), 500);
    }
    onClick(id, isCorrect, hint);
  };

  return (
    <div
      onClick={handleInteraction}
      onAnimationEnd={(e) => {
        // Only trigger boundary cleanups on the vertical floating animation channel
        if (e.animationName.includes('floatUp')) {
          onExpired(id);
        }
      }}
      className={`absolute bottom-0 cursor-pointer select-none touch-none will-change-transform rounded-full flex items-center justify-center border shadow-lg backdrop-blur-[2px] transition-all
        ${hasError ? 'shake-animation border-red-500 bg-red-950/40 text-red-200' : 'border-blue-400/40 bg-blue-500/10 hover:bg-blue-400/20 text-blue-100 hover:scale-105 active:scale-90'}
      `}
      style={{
        left: `${xPos}%`,
        width: '72px',
        height: '72px',
        animation: `floatUp ${speed}s linear forwards`,
      }}
    >
      <span className="text-sm font-black tracking-wide select-none">
        {renderSubscripts(formula)}
      </span>
    </div>
  );
}