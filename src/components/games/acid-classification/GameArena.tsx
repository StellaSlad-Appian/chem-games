// src/components/games/acid-classification/GameArena.tsx
'use client';

import React from 'react';
import Vessel from './Vessel';
import MoleculeBubble from './MoleculeBubble';
import { CLASSIFICATION_OPTIONS } from '@/core-engine/constants/chemical-labels';
import { GAME_STATE, ANSWER_STATUS, AnswerStatus } from '@/core-engine/constants/ui-constants';
import type { CompoundData, ChemicalClassification } from '@/core-engine/types/chemistry';
import { evaluateChemical } from '@/core-engine/utils/chemical-utils';

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

// Sorted once per render off the `order` field defined alongside each option
// in chemical-labels.ts — that file is the single source of truth for both
// the label -> ChemicalClassification mapping and on-screen ordering.
const orderedOptions = [...CLASSIFICATION_OPTIONS].sort((a, b) => a.order - b.order);

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
        relative flex h-full w-full flex-1 flex-col items-center justify-center overflow-hidden rounded-2xl 
        border-2 border-[var(--border)] bg-[var(--surface)]/30 p-6 z-10 transition-all duration-200
        ${!isPlaying ? 'pointer-events-none opacity-40 grayscale-[30%]' : 'opacity-100'}
      `}
      aria-hidden={!isPlaying}
    >

      {/* debugging */}
      {process.env.NODE_ENV === 'development' && (
        <div className="my-4 w-full max-w-md rounded-xl border border-amber-500/50 bg-amber-500/10 p-3 font-mono text-xs text-amber-300">
          <p className="font-bold uppercase tracking-wider">🐛 Debug State</p>
          <p>Formula: {currentChemical?.formula || 'N/A'}</p>
          <p>Expected Type: {currentChemical ? evaluateChemical(currentChemical) : 'N/A'}</p>
          <p>Last Selected: {feedback.selected || 'None'}</p>
          <p>Status: {feedback.status}</p>
        </div>
      )}

      {currentChemical && (
        <div className="mb-12">
          <span className="mb-2 block text-center text-xs font-black uppercase tracking-widest text-[var(--muted)]">
            Classify Compound
          </span>
          <MoleculeBubble
            formula={currentChemical.formula}
            name={currentChemical.name}
            feedbackStatus={feedback.status ?? ANSWER_STATUS.IDLE}
            showName={showChemicalName}
          />
        </div>
      )}

      <div className="mx-auto grid w-full max-w-3xl grid-cols-1 gap-6 px-4 sm:grid-cols-3">
        {orderedOptions.map((option) => {
          const isSelected = feedback.selected === option.classification;

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
              onClick={() => onSelection(option.classification)}
              disabled={!isPlaying || (feedback.status !== null && feedback.status !== ANSWER_STATUS.IDLE)}
            />
          );
        })}
      </div>
    </div>
  );
}