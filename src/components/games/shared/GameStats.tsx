// src/components/games/shared/GameStats.tsx
'use client';

import { useI18n } from '@/i18n/client';

interface GameStatsProps {
  level: number;
  score: number;
}

export default function GameStats({
  level,
  score,
}: GameStatsProps) {
  const { t, f } = useI18n();
  return (
    <div className="flex flex-wrap items-center justify-end gap-3">
      
      {/* SCORE & LEVEL DISPLAY */}
      <div className="min-w-30 text-right">
        <span className="mb-0.5 block text-[10px] font-bold uppercase tracking-wider text-(--muted)">
          {f(t.games.shared.levelValue, { level: level.toString().padStart(2, '0') })}
        </span>
        <span className="text-sm font-black text-(--accent)">
          {f(t.games.shared.scoreValue, { score })}
        </span>
      </div>
    </div>
  );
}
