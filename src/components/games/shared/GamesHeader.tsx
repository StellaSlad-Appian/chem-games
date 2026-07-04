// src/components/games/shared/GamesHeader.tsx
'use client';

import { LogOut, Settings, Lightbulb } from 'lucide-react';
import GameStats from './GameStats'; 
import GameTimer from './GameTimer';
import GameLives from './GameLives';

interface HeaderProps {
  gameTitle: string;
  gameSubtitle: string;
  targetName?: string;
  
  progressText: string; 
  currentLevel: number;
  score: number;
  
  gameState: string;
  onTogglePause?: () => void;
  
  onExit?: () => void;
  onTriggerHint?: () => void;
  onOpenSettings?: () => void;
  
  showTimer?: boolean;
  timeLeft?: number;
  showLives?: boolean;
  lives?: number;
  maxLives?: number;

  showCenterTask?: boolean;        
  customTaskDescription?: string;
  showPauseButton?: boolean; // ⚙️ ADDED: Optional pause toggle
}

export default function GamesHeader({
  gameTitle,
  gameSubtitle,
  targetName,
  progressText,
  currentLevel,
  score,
  gameState,
  onTogglePause,
  onExit,
  onTriggerHint,
  onOpenSettings,
  showTimer = false,
  timeLeft = 0,
  showLives = false,
  lives = 3,
  maxLives = 3,
  showCenterTask = true,         
  customTaskDescription,
  showPauseButton = false // Defaults to false
}: HeaderProps) {
  return (
    <header className="w-full bg-slate-900/90 backdrop-blur-md border-2 border-slate-800 rounded-2xl px-6 py-4 md:px-8 grid grid-cols-1 md:grid-cols-3 items-center gap-4 shadow-2xl z-40 select-none">
      
      {/* LEFT SLOT: CONDITIONAL PROGRESS PANEL */}
      <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
        <div className="bg-slate-950/60 px-4 py-2 rounded-xl border border-slate-800 text-left min-w-30">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5">
            Progress
          </span>
          <span className="text-sm font-black text-emerald-400">
            {progressText}
          </span>
        </div>
        
        {showTimer && (
          <div className="bg-slate-950/60 p-1 rounded-xl border border-slate-800 text-white font-bold h-11 flex items-center">
            <GameTimer timeLeft={timeLeft} />
          </div>
        )}

        {showLives && (
          <div className="bg-slate-950/60 px-3 rounded-xl border border-slate-400 h-11 flex items-center">
            <GameLives lives={lives} maxLives={maxLives} />
          </div>
        )}
      </div>

      {/* CENTER SLOT: HERO TASK DISPLAY */}
      {showCenterTask ? (
        <div className="text-center bg-linear-to-r from-amber-500/10 via-amber-500/20 to-amber-500/10 border-2 border-amber-500/40 rounded-xl py-2 px-6 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
          <span className="text-[10px] uppercase tracking-widest text-amber-400 font-black block mb-0.5">
            {gameSubtitle}
          </span>
          <h1 className="text-xl md:text-2xl font-black text-white tracking-wide drop-shadow-md leading-snug">
            {customTaskDescription ? (
              <span className="text-yellow-300">{customTaskDescription}</span>
            ) : (
              <>
                Find: <span className="text-yellow-300 underline decoration-2 decoration-amber-400">{targetName || 'Loading...'}</span>
              </>
            )}
          </h1>
        </div>
      ) : (
        <div className="hidden md:block" />
      )}

      {/* RIGHT SLOT: GAME STATS & ACTIONS PANEL */}
      <div className="flex flex-wrap items-center justify-center md:justify-end gap-4 md:gap-6">
        
        <div className="flex items-center gap-3">
          {onTriggerHint && (
            <button
              onClick={onTriggerHint}
              className="p-2 text-amber-400/80 hover:text-amber-300 hover:bg-amber-400/10 active:scale-95 rounded-full transition-all flex items-center justify-center cursor-pointer select-none"
              title="Get Hint"
            >
              <Lightbulb className="w-6 h-6" />
            </button>
          )}

          {onOpenSettings && (
            <button
              onClick={onOpenSettings}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 active:scale-95 p-2 rounded-xl transition-all shadow-md flex items-center justify-center cursor-pointer select-none"
              title="Open Game Settings"
            >
              <Settings className="w-4 h-4 stroke-[2.5]" />
            </button>
          )}
        </div>

        {/* Game Stats - Only passes onTogglePause if showPauseButton is true */}
        <GameStats 
          level={currentLevel}
          score={score}
          isPaused={gameState === 'paused'}
          onTogglePause={showPauseButton ? onTogglePause : undefined}
        />

        {onExit && (
          <button
            onClick={onExit}
            className="bg-rose-600 hover:bg-rose-500 active:scale-95 text-white font-black text-xs px-3.5 py-2 rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer select-none ml-2"
            title="Exit Game Session"
          >
            <LogOut className="w-4 h-4 text-white! stroke-[2.5]" stroke="#ffffff" /> 
            <span className="text-white font-black">Exit</span>
          </button>
        )}
      </div>
    </header>
  );
}