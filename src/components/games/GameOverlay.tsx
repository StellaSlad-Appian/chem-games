'use client';

import { useEffect } from 'react';
import Link from "next/link";
import { Home, RefreshCw, Play, LogOut } from "lucide-react";
import { GameState } from '../../core-engine/types/general';

// --- Issue 5: failReason tells the player WHY they lost ---
export type FailReason = 'mistakes' | 'timeout' | null;

interface GameOverlayProps {
  gameState: GameState;
  score: number;
  correctInRound: number;   // Issue 4: how many correct this round
  currentLevel: number;     // Issue 3: progress context
  maxLevel: number;         // Issue 3: progress context
  failReason: FailReason;   // Issue 5: why the player failed
  onResume: () => void;
  onRestart: () => void;
}

// Issue 1: per-state backdrop tint config
const STATE_STYLES: Record<string, { bg: string; border: string }> = {
  paused:  { bg: 'color-mix(in srgb, var(--background) 88%, transparent)',       border: 'var(--border)' },
  failed:  { bg: 'color-mix(in srgb, #ef4444 12%, var(--background) 88%)',       border: '#ef4444' },
  victory: { bg: 'color-mix(in srgb, #10b981 12%, var(--background) 88%)',       border: '#10b981' },
  levelUp: { bg: 'color-mix(in srgb, #3b82f6 12%, var(--background) 88%)',       border: '#3b82f6' },
};

export default function GameOverlay({
  gameState,
  score,
  correctInRound,
  currentLevel,
  maxLevel,
  failReason,
  onResume,
  onRestart,
}: GameOverlayProps) {
  // If the game is actively playing, don't show any overlay
  if (gameState === 'playing') return null;

  const stateStyle = STATE_STYLES[gameState] ?? STATE_STYLES.paused;

  // Issue 7: keyboard support — Space/Enter triggers the primary action
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code !== 'Space' && e.code !== 'Enter') return;
      e.preventDefault();
      if (gameState === 'paused' || gameState === 'levelUp') {
        onResume();
      } else if (gameState === 'failed' || gameState === 'victory') {
        onRestart();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [gameState, onResume, onRestart]);

  return (
    // Issue 2: overlay-enter animation via CSS keyframe defined in globals.css
    <div
      className="absolute inset-0 backdrop-blur-md flex flex-col items-center justify-center z-50 rounded-3xl border-2 shadow-xl p-8 text-center overlay-enter"
      style={{ background: stateStyle.bg, borderColor: stateStyle.border }}
    >

      {/* CASE A: GAME IS PAUSED */}
      {gameState === 'paused' && (
        <>
          <h2 className="text-4xl md:text-5xl mb-2" style={{ color: 'var(--foreground)' }}>
            GAME PAUSED
          </h2>
          <p className="mb-8 text-sm md:text-base font-medium" style={{ color: 'var(--muted)' }}>
            Your research progress is temporarily frozen.
          </p>

          {/* Issue 7: hint that Space also works */}
          <p className="text-xs mb-6 opacity-50" style={{ color: 'var(--muted)' }}>
            Press Space or Enter to resume
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
            <button
              onClick={onResume}
              className="flex-1 flex items-center justify-center gap-2 font-extrabold py-3.5 px-4 rounded-xl transition-all active:scale-95 bg-blue-600 hover:bg-blue-700 text-white shadow-md"
            >
              <Play className="w-5 h-5 fill-current" /> Resume Game
            </button>
            <Link
              href="/"
              className="flex-1 flex items-center justify-center gap-2 font-extrabold py-3.5 px-4 rounded-xl transition-all active:scale-95 border-2 border-red-400 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20"
            >
              <LogOut className="w-5 h-5" /> Quit Game
            </Link>
          </div>
        </>
      )}

      {/* CASE B: FAILED */}
      {gameState === 'failed' && (
        <>
          <h2 className="text-4xl md:text-5xl mb-3" style={{ color: 'var(--wrong)' }}>
            💥 LAB MELTDOWN
          </h2>

          {/* Issue 5: actionable failure reason */}
          <p className="mb-3 text-base font-semibold" style={{ color: 'var(--wrong)' }}>
            {failReason === 'mistakes'
              ? 'Too many classification errors.'
              : 'Time ran out before reaching the quota.'}
          </p>

          {/* Issue 4: score context */}
          <p className="mb-6 text-sm" style={{ color: 'var(--muted)' }}>
            Level {currentLevel} of {maxLevel} · {correctInRound} correct this round
          </p>

          <div
            className="game-card px-8 py-4 font-bold text-xl mb-8"
            style={{ color: 'var(--foreground)' }}
          >
            Final Score: {score}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
            <button
              onClick={onRestart}
              className="flex-1 flex items-center justify-center gap-2 font-extrabold py-3.5 px-4 rounded-xl transition-all active:scale-95 bg-blue-600 hover:bg-blue-700 text-white shadow-md"
            >
              <RefreshCw className="w-5 h-5" /> Try Again
            </button>
            <Link
              href="/"
              className="flex-1 flex items-center justify-center gap-2 font-extrabold py-3.5 px-4 rounded-xl transition-all active:scale-95 border-2 hover:bg-[var(--surface-2)]"
              style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
            >
              <Home className="w-5 h-5" /> Hub Menu
            </Link>
          </div>
        </>
      )}

      {/* CASE C: VICTORY */}
      {gameState === 'victory' && (
        <>
          <h2 className="text-4xl md:text-5xl mb-3" style={{ color: 'var(--correct)' }}>
            🧪 RESEARCH COMPLETE!
          </h2>

          {/* Issue 4: score context on victory */}
          <p className="mb-6 text-sm" style={{ color: 'var(--muted)' }}>
            All {maxLevel} levels cleared · {correctInRound} correct in final round
          </p>

          <div
            className="game-card px-8 py-4 font-bold text-xl mb-8"
            style={{ color: 'var(--foreground)' }}
          >
            Final Score: {score}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
            <button
              onClick={onRestart}
              className="flex-1 flex items-center justify-center gap-2 font-extrabold py-3.5 px-4 rounded-xl transition-all active:scale-95 bg-blue-600 hover:bg-blue-700 text-white shadow-md"
            >
              <RefreshCw className="w-5 h-5" /> Play Again
            </button>
            <Link
              href="/"
              className="flex-1 flex items-center justify-center gap-2 font-extrabold py-3.5 px-4 rounded-xl transition-all active:scale-95 border-2 hover:bg-[var(--surface-2)]"
              style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
            >
              <Home className="w-5 h-5" /> Hub Menu
            </Link>
          </div>
        </>
      )}

      {/* CASE D: LEVEL UP INTERSTITIAL */}
      {gameState === 'levelUp' && (
        <>
          <h2 className="text-4xl md:text-5xl mb-3 text-blue-500">
            LEVEL CLEARED!
          </h2>

          {/* Issue 3: level progress indicator */}
          <div className="flex items-center gap-2 mb-6">
            {Array.from({ length: maxLevel }).map((_, i) => (
              <div
                key={i}
                className="h-2 w-8 rounded-full transition-all duration-300"
                style={{
                  background: i < currentLevel ? '#3b82f6' : 'var(--border)',
                  transform: i === currentLevel - 1 ? 'scaleY(1.5)' : 'scaleY(1)',
                }}
              />
            ))}
          </div>

          <p className="mb-2 text-lg font-medium" style={{ color: 'var(--muted)' }}>
            Level {currentLevel} → {currentLevel + 1}
          </p>
          <p className="mb-8 text-sm" style={{ color: 'var(--muted)' }}>
            {correctInRound} correct · Complexity increasing
          </p>

          {/* Issue 7: hint that Space also works */}
          <p className="text-xs mb-4 opacity-50" style={{ color: 'var(--muted)' }}>
            Press Space or Enter to continue
          </p>

          {/* onResume is reused here — in the parent it handles advancing to the next level */}
          <button
            onClick={onResume}
            className="w-full max-w-sm flex items-center justify-center gap-2 font-extrabold py-4 px-4 rounded-xl transition-all active:scale-95 bg-blue-600 hover:bg-blue-700 text-white shadow-md"
          >
            <Play className="w-5 h-5 fill-current" /> Begin Level {currentLevel + 1}
          </button>
        </>
      )}
    </div>
  );
}