// src/components/games/acid-classification/GameArena.tsx
'use client';

import React from 'react';
import Vessel from './Vessel';
import { CLASSIFICATION_OPTIONS } from '@/core-engine/constants/chemical-labels';
import { GAME_STATE, ANSWER_STATUS, AnswerStatus } from '@/core-engine/constants/ui-constants';
import type { CompoundData, ChemicalClassification } from '@/core-engine/types/chemistry';

interface GameArenaProps {
  currentChemical: CompoundData | undefined;
  currentLevel: number;
  gameState: string;
  feedback: {
    status: AnswerStatus | null;
    selected: string | null;
  };
  showChemicalName: boolean;
  onSelection: (selectedType: ChemicalClassification) => void;
}

export default function GameArena({
  currentChemical,
  currentLevel,
  gameState,
  feedback,
  showChemicalName,
  onSelection,
}: GameArenaProps) {
  const isPlaying = gameState === GAME_STATE.PLAYING;

  return (
    <div 
      className={`
        relative flex flex-1 flex-col items-center justify-center p-6 w-full h-full 
        rounded-2xl border-2 border-[var(--border)] bg-[var(--surface)]/30 overflow-hidden z-10
        transition-all duration-200
        ${!isPlaying ? 'pointer-events-none opacity-40 grayscale-[30%]' : 'opacity-100'}
      `}
      aria-hidden={!isPlaying}
    >
      {currentChemical && (
        <div className="mb-12 text-center h-28">
          <span className="text-xs font-black uppercase tracking-widest text-[var(--muted)]">Classify Compound</span>
          <h2 className="mt-2 text-4xl md:text-5xl font-black text-[var(--foreground)] font-mono">
            {currentChemical.formula}
          </h2>
          {showChemicalName && (
            <p className="mt-2 text-sm font-bold text-blue-400 animate-in fade-in slide-in-from-top-1">
              {currentChemical.name}
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl px-4">
        {CLASSIFICATION_OPTIONS.map((option) => {
          const isSelected = feedback.selected === option.label;
          
          // QA FIX: Safely fallback to "idle" if feedback.status is null, 
          // and cast to the strict literal union expected by VesselProps.
          const resolvedStatus = (isSelected && feedback.status) 
            ? (feedback.status as "idle" | "correct" | "wrong") 
            : "idle";

          return (
            <Vessel
              key={option.label}
              type={option.iconType as 'flask' | 'beaker' | 'droplet'}
              label={option.label}
              colorClass={option.colorClass}
              status={resolvedStatus}
              onClick={() => onSelection(option.label as ChemicalClassification)}
              // Prevent interactions if game is paused or engine is processing an answer
              disabled={!isPlaying || (feedback.status !== null && feedback.status !== ANSWER_STATUS.IDLE)}
            />
          );
        })}
      </div>
    </div>
  );
}