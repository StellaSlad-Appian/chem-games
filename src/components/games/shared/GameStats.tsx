// src/components/games/shared/GameStats.tsx
'use client';

interface GameStatsProps {
  level: number;
  score: number;
}

export default function GameStats({ 
  level, 
  score,
}: GameStatsProps) {
  return (
    <div className="flex flex-wrap items-center justify-end gap-3">
      
      {/* SCORE & LEVEL DISPLAY */}
      <div className="bg-slate-950/60 px-4 py-2 rounded-xl border border-slate-800 text-right min-w-30">
        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5">
          Level {level.toString().padStart(2, '0')}
        </span>
        <span className="text-sm font-black text-amber-400">
          Score {score}
        </span>
      </div>
    </div>
  );
}
