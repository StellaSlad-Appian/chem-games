// src/components/games/acid-classification/GameArena.tsx
'use client';

import React from 'react';
import Vessel from './Vessel';
import { CLASSIFICATION_OPTIONS } from '@/core-engine/constants/chemical-labels';
import type { CompoundData, ChemicalClassification } from '@/core-engine/types/chemistry';

interface GameArenaProps {
  currentTarget: CompoundData | null;
  selectedStatus: 'idle' | 'correct' | 'wrong';
  activeSelection: string | null;
  onSelectClassification: (classificationLabel: ChemicalClassification) => void;
  isPlaying: boolean;
  feedbackStatus: string;
}

export default function GameArena({
  currentTarget,
  selectedStatus,
  activeSelection,
  onSelectClassification,
  isPlaying,
  feedbackStatus,
}: GameArenaProps) {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center p-6 w-full h-full rounded-2xl border-2 border-[var(--border)] bg-[var(--surface)]/30 overflow-hidden">
      {currentTarget && (
        <div className="mb-12 text-center">
          <span className="text-xs font-black uppercase tracking-widest text-[var(--muted)]">Classify Compound</span>
          <h2 className="mt-2 text-4xl md:text-5xl font-black text-[var(--foreground)] font-mono">
            {currentTarget.formula}
          </h2>
          <p className="mt-1 text-sm font-bold text-blue-500">{currentTarget.name}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl px-4">
        {CLASSIFICATION_OPTIONS.map((option) => {
          const isSelected = activeSelection === option.label;
          const status = isSelected ? selectedStatus : 'idle';

          return (
            <Vessel
              key={option.label}
              type={option.iconType as 'flask' | 'beaker' | 'droplet'}
              label={option.label}
              colorClass={option.colorClass}
              status={status}
              onClick={() => onSelectClassification(option.label as ChemicalClassification)}
              disabled={!isPlaying || feedbackStatus !== 'IDLE'}
            />
          );
        })}
      </div>
    </div>
  );
}