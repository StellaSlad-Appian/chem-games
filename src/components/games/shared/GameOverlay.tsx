'use client';

import { useEffect } from 'react';
import Link from "next/link";
import { Home, RefreshCw, Play, LogOut } from "lucide-react";
import { GameState } from '../../../core-engine/types/general';
import { ScoreBadge } from '../../ui/ScoreBadge';
import { LevelProgress } from '../../ui/LevelProgress';
import { useSound } from '../../../hooks/useSound';

export type FailReason = 'mistakes' | 'timeout' | null;

interface GameOverlayProps {
  gameState: GameState;
  score: number;
  correctInRound: number;   
  currentLevel: number;     
  maxLevel: number;         
  failReason: FailReason;   
  onResume: () => void;
  onRestart: () => void;
}

const SPACING = {
  title: "text-4xl md:text-5xl font-black mb-16 tracking-wide",
  subtitle: "text-base font-semibold mb-2",
  metaText: "text-sm mb-12 opacity-80",
  actionGroup: "w-full max-w-sm flex flex-col items-center mt-4",
  keyHint: "text-xs mb-3 opacity-60 tracking-wide",
};

const STATE_STYLES: Record<string, { bg: string; border: string }> = {
  paused:  { bg: 'color-mix(in srgb, #3b82f6 12%, var(--background) 88%)',       border: '#3b82f6' },
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
  const { playSound } = useSound(); // Destructure sound trigger method
  const stateStyle = STATE_STYLES[gameState] ?? STATE_STYLES.paused;

  // 👈 3. AUTOMATIC AMBIENT ENGINE: Trigger fanfares the millisecond an overlay state hits
  useEffect(() => {
    if (gameState === 'failed') {
      playSound('explosion'); // Plays dramatic defeat warning
    } else if (gameState === 'victory') {
      playSound('success-synthesis'); // Big win resolution
    } else if (gameState === 'levelUp') {
      playSound('lock-element'); // Quick interstitial level-up marker
    } else if (gameState === 'paused') {
      playSound('click'); // Subdued systemic cue confirming freeze state
    }
  }, [gameState, playSound]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code !== 'Space' && e.code !== 'Enter') return;
      if (document.activeElement?.tagName === 'BUTTON' || document.activeElement?.tagName === 'A') {
        return; 
      }

      e.preventDefault();
      playSound('click');
      if (gameState === 'paused' || gameState === 'levelUp') {
        onResume();
      } else if (gameState === 'failed' || gameState === 'victory') {
        onRestart();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [gameState, onResume, onRestart, playSound]);

  if (gameState === 'playing') {
    return null;
  }

  return (
    <div
      className="absolute inset-0 backdrop-blur-md flex flex-col items-center justify-center z-50 rounded-3xl border-2 shadow-xl p-8 text-center overlay-enter"
      style={{ background: stateStyle.bg, borderColor: stateStyle.border }}
    >
      {/* CASE A: GAME IS PAUSED */}
      {gameState === 'paused' && (
        <>
          <h2 className={SPACING.title} style={{ color: 'var(--foreground)' }}>
            GAME PAUSED
          </h2>
          <p className={`${SPACING.subtitle} text-sm md:text-base font-medium`} style={{ color: 'var(--muted)' }}>
            Your research progress is temporarily frozen.
          </p>
          <div className={`${SPACING.metaText} h-4`} /> 

          <div className={SPACING.actionGroup}>
            <p className={SPACING.keyHint} style={{ color: 'var(--muted)' }}>
              Press Space or Enter to resume
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
              <button
                onClick={() => { playSound('click'); onResume(); }}
                className="flex-1 flex items-center justify-center gap-2 font-extrabold py-3.5 px-4 rounded-xl transition-all active:scale-95 bg-blue-600 hover:bg-blue-700 text-white shadow-md"
              >
                <Play className="w-5 h-5 fill-current" /> Resume Game
              </button>
              <Link
                href="/"
                onClick={() => playSound('click')}
                className="flex-1 flex items-center justify-center gap-2 font-extrabold py-3.5 px-4 rounded-xl transition-all active:scale-95 border-2 border-red-400 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20"
              >
                <LogOut className="w-5 h-5" /> Quit Game
              </Link>
            </div>
          </div>
        </>
      )}

      {/* CASE B: FAILED */}
      {gameState === 'failed' && (
        <>
          <h2 className={SPACING.title} style={{ color: 'var(--wrong)' }}>
            💥 LAB MELTDOWN
          </h2>
          <p className={SPACING.subtitle} style={{ color: 'var(--wrong)' }}>
            {failReason === 'mistakes'
              ? 'Too many classification errors.'
              : 'Time ran out before reaching the quota.'}
          </p>
          <p className={SPACING.metaText} style={{ color: 'var(--muted)' }}>
            Level {currentLevel} of {maxLevel} · {correctInRound} correct this round
          </p>

          <ScoreBadge score={score} />
          <div className={SPACING.actionGroup}>
            <p className={SPACING.keyHint} style={{ color: 'var(--muted)' }}>
              Press Space or Enter to retry
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm mt-8">
              <button
                onClick={() => { playSound('click'); onRestart(); }}
                className="flex-1 flex items-center justify-center gap-2 font-extrabold py-3.5 px-4 rounded-xl transition-all active:scale-95 bg-blue-600 hover:bg-blue-700 text-white shadow-md"
              >
                <RefreshCw className="w-5 h-5" /> Try Again
              </button>
              <Link
                href="/"
                onClick={() => playSound('click')}
                className="flex-1 flex items-center justify-center gap-2 font-extrabold py-3.5 px-4 rounded-xl transition-all active:scale-95 border-2 hover:bg-(--surface-2)"
                style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
              >
                <Home className="w-5 h-5" /> Hub Menu
              </Link>
            </div>
          </div>
        </>
      )}

      {/* CASE C: VICTORY */}
      {gameState === 'victory' && (
        <>
          <h2 className={SPACING.title} style={{ color: 'var(--correct)' }}>
            🧪 RESEARCH COMPLETE!
          </h2>
          <p className={SPACING.subtitle} style={{ color: 'var(--foreground)' }}>
            Splendid sorting, Researcher!
          </p>
          <p className={SPACING.metaText} style={{ color: 'var(--muted)' }}>
            All {maxLevel} levels cleared · {correctInRound} correct in final round
          </p>

          <ScoreBadge score={score} />

          <div className={SPACING.actionGroup}>
            <p className={SPACING.keyHint} style={{ color: 'var(--muted)' }}>
              Press Space or Enter to restart
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm mt-8">
              <button
                onClick={() => { playSound('click'); onRestart(); }}
                className="flex-1 flex items-center justify-center gap-2 font-extrabold py-3.5 px-4 rounded-xl transition-all active:scale-95 bg-blue-600 hover:bg-blue-700 text-white shadow-md"
              >
                <RefreshCw className="w-5 h-5" /> Play Again
              </button>
              <Link
                href="/"
                onClick={() => playSound('click')}
                className="flex-1 flex items-center justify-center gap-2 font-extrabold py-3.5 px-4 rounded-xl transition-all active:scale-95 border-2 hover:bg-(--surface-2)"
                style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
              >
                <Home className="w-5 h-5" /> Hub Menu
              </Link>
            </div>
          </div> 
        </>
      )}

      {/* CASE D: LEVEL UP INTERSTITIAL */}
      {gameState === 'levelUp' && (
        <>
          <h2 className={`${SPACING.title} text-blue-500`}>
            LEVEL CLEARED!
          </h2>
          
          <LevelProgress currentLevel={currentLevel} maxLevel={maxLevel} />

          <p className={SPACING.subtitle} style={{ color: 'var(--muted)' }}>
            Level {currentLevel} → {currentLevel + 1}
          </p>
          <p className={SPACING.metaText} style={{ color: 'var(--muted)' }}>
            {correctInRound} correct · Complexity increasing
          </p>

          <div className={SPACING.actionGroup}>
            <p className={SPACING.keyHint} style={{ color: 'var(--muted)' }}>
              Press Space or Enter to continue
            </p>

            <button
              onClick={() => { playSound('click'); onResume(); }} // 👈 Injected click
              className="w-full max-w-sm flex items-center justify-center gap-2 font-extrabold py-4 px-4 rounded-xl transition-all active:scale-95 bg-blue-600 hover:bg-blue-700 text-white shadow-md"
            >
              <Play className="w-5 h-5 fill-current" /> Begin Level {currentLevel + 1}
            </button>
          </div>
        </>
      )}
    </div>
  );
}