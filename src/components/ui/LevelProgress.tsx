'use client';

import React from 'react';
import { useI18n } from '@/i18n/client';

interface LevelProgressProps {
  currentLevel: number;
  maxLevel: number;
}

export function LevelProgress({ currentLevel, maxLevel }: LevelProgressProps) {
  const { t, f } = useI18n();
  return (
    <div
      className="flex items-center justify-center gap-2 mb-8"
      role="img"
      aria-label={f(t.games.shared.levelProgressA11y, { level: currentLevel, max: maxLevel })}
    >
      {Array.from({ length: maxLevel }).map((_, i) => (
        <div
          key={i}
          className="h-2 w-8 rounded-full transition-all duration-300"
          style={{
            background: i < currentLevel ? '#3b82f6' : 'var(--border)',
          }}
        />
      ))}
    </div>
  );
}