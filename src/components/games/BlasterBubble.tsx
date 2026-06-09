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
  colorClass: string; // 🧪 Accept the permanent color stamp passed from the generator
  onClick: (id: string, isCorrect: boolean, hint: string) => void;
  onExpired: (id: string) => void;
}

const renderSubscripts = (formulaStr: string) => {
  return formulaStr.split(/(\d+)/).map((part, index) => {
    if (/\d+/.test(part)) {
      return (
        <sub key={index} className="bottom-[-0.2em] text-[0.75em] leading-none font-bold">
          {part}
        </sub>
      );
    }
    return part;
  });
};

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
        width: '96px',
        height: '96px',
        animation: `floatUp ${speed}s linear forwards`,
      }}
    >
      {/* Visual Inner Circular Bubble Component - Locks style variant safely inside the template */}
      <div
        className={`w-18 h-18 rounded-full flex items-center justify-center border-2 shadow-xl transition-all duration-150
          ${hasError 
            ? 'shake-animation border-red-500 bg-red-950 text-red-100 shadow-[0_0_15px_rgba(239,68,68,0.4)]' 
            : `bg-slate-800/95 hover:scale-110 hover:text-white active:scale-95 ${colorClass}`
          }
        `}
      >
        <span className="text-sm font-black tracking-wide select-none">
          {renderSubscripts(formula)}
        </span>
      </div>
    </div>
  );
}