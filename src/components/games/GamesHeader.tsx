// src/components/games/GamesHeader.tsx
'use client';

import React from 'react';
import GameStats from './GameStats'; 
import GameTimer from './GameTimer';
import GameLives from './GameLives';

interface HeaderProps {
  gameTitle: string;
  gameSubtitle: string;
  targetName: string | undefined;
  
  // Progress indicators
  progressText: string; 
  currentLevel: number;
  score: number;
  
  // State Toggles (What each game needs)
  gameState: string;
  onTogglePause: () => void;
  
  // Conditional Component Flag Injectors
  showTimer?: boolean;
  timeLeft?: number;
  showLives?: boolean;
  lives?: number;
  maxLives?: number;
}

export default function Header({
  gameTitle,
  gameSubtitle,
  targetName,
  progressText,
  currentLevel,
  score,
  gameState,
  onTogglePause,
  showTimer = false,
  timeLeft = 0,
  showLives = false,
  lives = 3,
  maxLives = 3
}: HeaderProps) {
  return (
    <header className="w-full bg-slate-900/90 backdrop-blur-md border-2 border-slate-800 rounded-2xl p-4 grid grid-cols-1 md:grid-cols-3 items-center gap-4 shadow-2xl z-40 select-none">
      
      {/* LEFT SLOT: CONDITIONAL PROGRESS PANEL (TRACKERS, TIMERS, LIVES) */}
      <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
        {/* Dynamic Progress Indicator */}
        <div className="bg-slate-950/60 px-4 py-2 rounded-xl border border-slate-800 text-left min-w-30">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5">
            Progress
          </span>
          <span className="text-sm font-black text-emerald-400">
            {progressText}
          </span>
        </div>
        
        {/* Render Timer conditionally if requested */}
        {showTimer && (
          <div className="bg-slate-950/60 p-1 rounded-xl border border-slate-800 text-white font-bold h-11 flex items-center">
            <GameTimer timeLeft={timeLeft} />
          </div>
        )}

        {/* Render Lives conditionally if requested */}
        {showLives && (
          <div className="bg-slate-950/60 px-3 rounded-xl border border-slate-800 h-11 flex items-center">
            <GameLives lives={lives} maxLives={maxLives} />
          </div>
        )}
      </div>

      {/* CENTER SLOT: HERO TASK DISPLAY (Always centered, highly prominent) */}
      <div className="text-center bg-linear-to-r from-amber-500/10 via-amber-500/20 to-amber-500/10 border-2 border-amber-500/40 rounded-xl py-2 px-6 shadow-[0_0_15px_rgba(245,158,11,0.15)] animate-pulse">
        <span className="text-[10px] uppercase tracking-widest text-amber-400 font-black block mb-0.5">
          {gameSubtitle}
        </span>
        <h1 className="text-2xl md:text-3xl font-black text-white tracking-wide drop-shadow-md">
          Find: <span className="text-yellow-300 underline decoration-2 decoration-amber-400">{targetName || 'Loading...'}</span>
        </h1>
      </div>

      {/* RIGHT SLOT: FIXED STATS PANEL & PAUSE ANCHOR */}
      <div className="flex items-center justify-center md:justify-end gap-4">
        <GameStats 
          level={currentLevel}
          score={score}
          isPaused={gameState === 'paused'}
          onTogglePause={onTogglePause}
        />
      </div>
    </header>
  );
}