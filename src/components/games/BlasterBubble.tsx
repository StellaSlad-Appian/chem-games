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
      className="absolute bottom-0 cursor-pointer select-none touch-none will-change-transform flex items-center justify-center z-10"
      style={{
        left: `${xPos}%`,
        width: '96px',
        height: '96px',
        animation: `floatUp ${speed}s linear forwards`,
      }}
    >
      {/* 🚀 Dynamic Scoped Style block to smoothly cycle line colors without causing re-renders */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes borderLineCycle {
          0% { border-color: #22d3ee; color: #22d3ee; box-shadow: 0 0 12px rgba(34,211,238,0.3); }
          33% { border-color: #ec4899; color: #ec4899; box-shadow: 0 0 12px rgba(236,72,153,0.3); }
          66% { border-color: #3b82f6; color: #3b82f6; box-shadow: 0 0 12px rgba(59,130,246,0.3); }
          100% { border-color: #22d3ee; color: #22d3ee; box-shadow: 0 0 12px rgba(34,211,238,0.3); }
        }
        .animate-bubble-line {
          animation: borderLineCycle 4s linear infinite;
        }
      `}} />

      {/* Visual Inner Circular Bubble Component - Updated with solid bg-slate-800 to prevent transparency blending */}
      <div
        className={`w-[72px] h-[72px] rounded-full flex items-center justify-center border-2 shadow-xl transition-all duration-150
          ${hasError 
            ? 'shake-animation border-red-500 bg-red-950 text-red-100 shadow-[0_0_15px_rgba(239,68,68,0.4)]' 
            : 'animate-bubble-line bg-slate-800 hover:scale-110 hover:border-cyan-300 hover:text-cyan-100 active:scale-95'
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