// src/components/games/shared/GamesHeader.tsx
'use client';

import { LogOut, Lightbulb } from 'lucide-react';
import { useRouter } from 'next/navigation';
import GameStats from './GameStats';
import GameTimer from './GameTimer';
import GameLives from './GameLives';
import { useI18n } from '@/i18n/client';
import { localizePath } from '@/i18n/routing';

interface HeaderProps {
  gameSubtitle: string;
  targetName?: string;

  progressText: string;
  currentLevel: number;
  score: number;

  onExit?: () => void;
  onTriggerHint?: () => void;

  showTimer?: boolean;
  timeLeft?: number;
  showLives?: boolean;
  lives?: number;
  maxLives?: number;

  showCenterTask?: boolean;
  customTaskDescription?: string;
}

export default function GamesHeader({
  gameSubtitle,
  targetName,
  progressText,
  currentLevel,
  score,
  onExit,
  onTriggerHint,
  showTimer = false,
  timeLeft = 0,
  showLives = false,
  lives = 3,
  maxLives = 3,
  showCenterTask = true,
  customTaskDescription,
}: HeaderProps) {
  const router = useRouter();
  const { t, locale } = useI18n();

  // Use the game's custom exit behaviour if provided.
  // Otherwise, return to the Games Hub.
  const handleExit = onExit ?? (() => router.push(localizePath('/games', locale)));

  return (
    <header className="w-full bg-slate-900/90 backdrop-blur-md border-2 border-slate-800 rounded-2xl px-6 py-4 md:px-8 grid grid-cols-1 md:grid-cols-3 items-center gap-4 shadow-2xl z-40 select-none">

      {/* LEFT SLOT: CONDITIONAL PROGRESS PANEL */}
      <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
        <div className="bg-slate-950/60 px-4 py-2 rounded-xl border border-slate-800 text-left min-w-30">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-0.5">
            {t.games.shared.progress}
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
                {t.games.shared.find}{' '}
                <span className="text-yellow-300 underline decoration-2 decoration-amber-400">
                  {targetName || t.common.loading}
                </span>
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
              type="button"
              onClick={onTriggerHint}
              className="p-2 text-amber-400/80 hover:text-amber-300 hover:bg-amber-400/10 active:scale-95 rounded-full transition-all flex items-center justify-center cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
              title={t.games.shared.hintA11y}
              aria-label={t.games.shared.hintA11y}
            >
              <Lightbulb className="w-6 h-6" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Pause, instructions, and settings are grouped in the shared game footer. */}
        <GameStats
          level={currentLevel}
          score={score}
        />

        <button
          onClick={handleExit}
          className="bg-rose-600 hover:bg-rose-500 active:scale-95 text-white font-black text-xs px-3.5 py-2 rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer select-none ml-2"
          title={t.games.shared.exitA11y}
          aria-label={t.games.shared.exitA11y}
        >
          <LogOut
            className="w-4 h-4 text-white! stroke-[2.5]"
            stroke="#ffffff"
            aria-hidden="true"
          />
          <span className="text-white font-black">{t.games.shared.exit}</span>
        </button>
      </div>
    </header>
  );
}
