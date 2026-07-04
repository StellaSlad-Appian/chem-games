// src/components/games/shared/GameStats.tsx
'use client';

import { Pause, Play } from 'lucide-react';

interface GameStatsProps {
  level: number;
  score: number;
  isPaused: boolean;
  // Add the '?' to make this prop optional
  onTogglePause?: () => void; 
}

export default function GameStats({ 
  level, 
  score, 
  isPaused, 
  onTogglePause 
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

      {/* CONDITIONAL PAUSE BUTTON */}
      {/* Only render this if onTogglePause is provided by the parent */}
      {onTogglePause && (
        <button
          onClick={onTogglePause}
          className="bg-slate-800 hover:bg-slate-700 text-white p-2.5 rounded-xl transition-all shadow-md active:scale-95 border-2 border-slate-700 cursor-pointer flex items-center justify-center"
          title={isPaused ? "Resume Game" : "Pause Game"}
        >
          {isPaused ? (
            <Play className="w-5 h-5 fill-emerald-400 text-emerald-400" />
          ) : (
            <Pause className="w-5 h-5 fill-amber-400 text-amber-400" />
          )}
        </button>
      )}
      
    </div>
  );
}