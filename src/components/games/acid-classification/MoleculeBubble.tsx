// src/components/games/acid-classification/MoleculeBubble.tsx
'use client';

import React from 'react';
import MoleculeText from '../../ui/MoleculeText';

interface MoleculeBubbleProps {
  formula?: string;
  name?: string;
  feedbackStatus: 'correct' | 'wrong' | null;
  showName?: boolean;
}

export default function MoleculeBubble({ formula, name, feedbackStatus, showName = false }: MoleculeBubbleProps) {
  
  // Logic for dynamic font sizes remains here to preserve the "Classifier" feel
  const isLongFormula = formula ? formula.length > 5 : false;
  const formulaFontSizeClass = isLongFormula 
    ? "text-3xl md:text-4xl font-black tracking-normal px-4 break-all" 
    : "text-5xl md:text-6xl font-black tracking-tight px-2";

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Background Glow Ring - EXACTLY UNCHANGED */}
      <div
        className={`absolute w-64 h-64 md:w-80 md:h-80 rounded-full blur-2xl transition-all duration-500 ${
          feedbackStatus ? "opacity-30 scale-110" : "opacity-0"
        }`}
        style={{
          backgroundColor:
            feedbackStatus === "correct"
              ? "var(--game-success)"
              : feedbackStatus === "wrong"
              ? "var(--game-error)"
              : "var(--game-glow)",
        }}
      />

      {/* Main Orb - EXACTLY UNCHANGED */}
      <div
        className={`w-56 h-56 md:w-72 md:h-72 rounded-full border-4 flex flex-col items-center justify-center shadow-2xl relative backdrop-blur-md transform transition-all duration-300 ${
          feedbackStatus
            ? "scale-95"
            : "hover:scale-105"
        } ${
          feedbackStatus === "wrong"
            ? "shake-animation"
            : ""
        }`}
        style={{
          backgroundColor: "var(--game-highlight-surface)",
          borderColor:
            feedbackStatus === "correct"
              ? "var(--game-success)"
              : feedbackStatus === "wrong"
              ? "var(--game-error)"
              : "var(--game-highlight-border)",
        }}
      >
        {formula && (
          <>
            {/* Swapped renderFormula(formula) for the reusable MoleculeText component */}
            <h2
              className={formulaFontSizeClass}
              style={{
                color: "var(--game-panel-text)",
              }}
            >
              <MoleculeText 
                formula={formula} 
                subscriptClassName="text-[0.6em] leading-none font-bold align-baseline relative -bottom-[0.1em] opacity-95" 
              />
            </h2>

            {showName && (
              <p
                className="text-xs md:text-sm mt-2 font-medium opacity-80 max-w-[85%] text-center truncate px-2"
                style={{
                  color: "var(--game-panel-muted)",
                }}
              >
                {name}
              </p>
            )}
          </>
        )}

        {feedbackStatus && (
          <div
            className="absolute top-4 font-bold text-sm uppercase px-3 py-1 rounded-md"
            style={{
              backgroundColor:
                feedbackStatus === "correct"
                  ? "var(--game-success)"
                  : "var(--game-error)",
              color: "white",
            }}
          >
            {feedbackStatus}
          </div>
        )}
      </div>
    </div>
  );
}