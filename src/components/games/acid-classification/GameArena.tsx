// src/components/games/acid-classification/GameArena.tsx
'use client';

import React from 'react';
import Vessel from './Vessel';
import MoleculeBubble from './MoleculeBubble';
import { CLASSIFICATION_OPTIONS } from '@/core-engine/constants/chemical-labels';
import { GAME_STATE, ANSWER_STATUS, AnswerStatus } from '@/core-engine/constants/ui-constants';
import type { CompoundData, ChemicalClassification } from '@/core-engine/types/chemistry';
import { useI18n } from '@/i18n/client';
import { compoundName } from '@/i18n/chemistry-names';
import type { Dictionary } from '@/i18n/dictionaries/en';

interface GameArenaProps {
  currentChemical: CompoundData | undefined;
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

// chemical-labels.ts stays the single source of truth for ordering and for the
// label -> ChemicalClassification mapping, so its English `label` doubles as
// the dictionary key here rather than being replaced by one.
const VESSEL_LABEL_KEY: Record<string, keyof Dictionary['chemistry']> = {
  Acid: 'acid',
  Neutral: 'neutral',
  Base: 'base',
};

export default function GameArena({
  currentChemical,
  gameState,
  feedback,
  showChemicalName,
  onSelection,
}: GameArenaProps) {
  const { t, locale } = useI18n();
  const isPlaying = gameState === GAME_STATE.PLAYING;

  return (
    <div 
      className={`
        relative flex h-full w-full flex-1 flex-col items-center justify-center overflow-hidden rounded-2xl 
        border-2 border-(--border) bg-(--surface)/30 p-6 z-10 transition-all duration-200
        ${!isPlaying ? 'pointer-events-none opacity-40 grayscale-[30%]' : 'opacity-100'}
      `}
      aria-hidden={!isPlaying}
    >

      {currentChemical && (
        <div className="mb-12">
          <span className="mb-2 block text-center text-xs font-black uppercase tracking-widest text-(--muted)">
            {t.games.acidClassification.arenaHeading}
          </span>
          <MoleculeBubble
            formula={currentChemical.formula}
            name={compoundName(locale, currentChemical)}
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
              label={t.chemistry[VESSEL_LABEL_KEY[option.label] ?? 'neutral']}
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