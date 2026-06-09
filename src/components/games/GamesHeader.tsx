// src/components/games/GamesHeader.tsx
'use client';

import { LogOut } from 'lucide-react'; 
import GameStats from './GameStats'; 
import GameTimer from './GameTimer';
import GameLives from './GameLives';

interface HeaderProps {
  gameTitle: string;
  gameSubtitle: string;
  targetName?: string | undefined;
  
  // Progress indicators
  progressText: string; 
  currentLevel: number;
  score: number;
  
  // State Toggles
  gameState: string;
  onTogglePause: () => void;
  
  // Action Handlers
  onExit?: () => void;
  onTriggerHint?: () => void;
  
  // Conditional Component Flag Injectors
  showTimer?: boolean;
  timeLeft?: number;
  showLives?: boolean;
  lives?: number;
  maxLives?: number;

  // Configuration Flexibility
  showCenterTask?: boolean;        
  customTaskDescription?: string;  
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
  onExit,
  onTriggerHint,
  showTimer = false,
  timeLeft = 0,
  showLives = false,
  lives = 3,
  maxLives = 3,
  showCenterTask = true,         
  customTaskDescription
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

      {/* RIGHT SLOT: VISUALLY DISTANCED ACTIONS PANEL & GAME STATS CONTROLS */}
      {/* 🚀 Changed overall layout gap to gap-6 (mobile) and md:gap-8 (desktop) */}
      <div className="flex flex-wrap items-center justify-center md:justify-end gap-6 md:gap-8">
        
        {/* 🛠️ Isolated Action Buttons wrapper ensures Hint and Exit stay close together */}
        <div className="flex items-center gap-3">
          {onTriggerHint && (
            <button
              onClick={onTriggerHint}
              disabled={gameState !== 'playing'}
              className="bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:pointer-events-none active:scale-95 text-slate-950 font-black text-xs px-3.5 py-2 rounded-xl transition-all shadow-md flex items-center gap-1 cursor-pointer select-none"
              title="Get Target Molecule Hint"
            >
              <span>💡</span> Hint
            </button>
          )}
          
          {onExit && (
            <button
              onClick={onExit}
              className="bg-rose-600 hover:bg-rose-500 active:scale-95 text-white font-black text-xs px-3.5 py-2 rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer select-none"
              title="Exit Game Session"
            >
              <LogOut className="w-4 h-4 text-white! stroke-[2.5]" stroke="#ffffff" /> 
              <span className="text-white font-black">Exit</span>
            </button>
          )}
        </div>

        {/* This component will now sit visibly apart due to the outer container spacing rules */}
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