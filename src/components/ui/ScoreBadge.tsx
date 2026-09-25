'use client';

import React from 'react';
import { useI18n } from '@/i18n/client';

interface ScoreBadgeProps {
  score: number;
}

export function ScoreBadge({ score }: ScoreBadgeProps) {
  const { t, f } = useI18n();
  return (
    <div
      // px-10 was tight enough that the longer German label ("Endpunktzahl")
      // pushed the badge past the overlay card on a 360px screen.
      className="game-card px-6 py-4 font-black text-lg md:px-10 md:text-2xl rounded-2xl shadow-lg border-2 border-(--border) bg-(--surface) tracking-wide"
      style={{ color: 'var(--foreground)' }}
      role="status"
      aria-label={f(t.games.shared.finalScoreA11y, { score })}
    >
      {t.games.shared.finalScore} <span className="text-(--link) font-extrabold">{score}</span>
    </div>
  );
}