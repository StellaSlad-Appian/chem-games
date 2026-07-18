'use client';

import { useCallback, useEffect, useRef, type KeyboardEvent as ReactKeyboardEvent, type RefObject } from 'react';
import Link from 'next/link';
import { FlaskConical, LogOut, Pause, Play, RefreshCw, Trophy } from 'lucide-react';
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

const STATE_STYLES: Record<Exclude<GameState, 'playing'>, { accent: string; label: string }> = {
  paused: { accent: 'text-blue-300', label: 'Game paused' },
  failed: { accent: 'text-rose-300', label: 'Game over' },
  victory: { accent: 'text-emerald-300', label: 'Research complete' },
  levelUp: { accent: 'text-blue-300', label: 'Level cleared' },
};

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

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
  const { playSound } = useSound();
  const dialogRef = useRef<HTMLDivElement>(null);
  const primaryActionRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const stateStyle = gameState === 'playing' ? null : STATE_STYLES[gameState];

  useEffect(() => {
    if (gameState === 'playing') return;

    restoreFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const frame = window.requestAnimationFrame(() => primaryActionRef.current?.focus());

    return () => {
      window.cancelAnimationFrame(frame);
      restoreFocusRef.current?.focus();
      restoreFocusRef.current = null;
    };
  }, [gameState]);

  useEffect(() => {
    if (gameState === 'failed') {
      playSound('explosion');
    } else if (gameState === 'victory') {
      playSound('success-synthesis');
    } else if (gameState === 'levelUp') {
      playSound('lock-element');
    } else if (gameState === 'paused') {
      playSound('click');
    }
  }, [gameState, playSound]);

  const resume = useCallback(() => {
    playSound('click');
    onResume();
  }, [onResume, playSound]);

  const restart = useCallback(() => {
    playSound('click');
    onRestart();
  }, [onRestart, playSound]);

  useEffect(() => {
    const handleKey = (event: globalThis.KeyboardEvent) => {
      if (gameState === 'playing') return;

      if (event.key === 'Escape' && (gameState === 'paused' || gameState === 'levelUp')) {
        event.preventDefault();
        resume();
        return;
      }

      if (event.code !== 'Space' && event.code !== 'Enter') return;
      if (document.activeElement?.matches(FOCUSABLE_SELECTOR)) return;

      event.preventDefault();
      if (gameState === 'paused' || gameState === 'levelUp') {
        resume();
      } else {
        restart();
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [gameState, restart, resume]);

  if (gameState === 'playing' || !stateStyle) return null;

  const handleTabKey = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab') return;

    const focusable = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR) ?? []);
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const keyHint = gameState === 'paused' || gameState === 'levelUp'
    ? 'Press Escape, Space, or Enter to continue'
    : 'Press Space or Enter to try again';

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-slate-950/70 p-4 backdrop-blur-sm sm:p-6">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="game-overlay-title"
        aria-describedby="game-overlay-description"
        onKeyDown={handleTabKey}
        className="overlay-enter w-full max-w-lg rounded-3xl border border-white/15 bg-slate-900/95 p-6 text-center shadow-2xl shadow-black/50 sm:p-8"
      >
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
          {gameState === 'paused' && <Pause className={`h-7 w-7 ${stateStyle.accent}`} aria-hidden="true" />}
          {gameState === 'failed' && <FlaskConical className={`h-7 w-7 ${stateStyle.accent}`} aria-hidden="true" />}
          {gameState === 'victory' && <Trophy className={`h-7 w-7 ${stateStyle.accent}`} aria-hidden="true" />}
          {gameState === 'levelUp' && <Trophy className={`h-7 w-7 ${stateStyle.accent}`} aria-hidden="true" />}
        </div>

        {gameState === 'paused' && (
          <>
            <p className={`mb-2 text-xs font-black uppercase tracking-[0.2em] ${stateStyle.accent}`}>Session on hold</p>
            <h2 id="game-overlay-title" className="text-4xl font-black text-white sm:text-5xl">Game paused</h2>
            <p id="game-overlay-description" className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-300">
              Your experiment is frozen exactly where you left it.
            </p>
            <div className="my-6 grid grid-cols-3 gap-2 rounded-2xl border border-slate-700 bg-slate-950/60 p-3 text-left">
              <OverlayStat label="Level" value={`${currentLevel} / ${maxLevel}`} />
              <OverlayStat label="Score" value={score.toLocaleString()} />
              <OverlayStat label="Round" value={`${correctInRound} correct`} />
            </div>
            <ActionButtons primaryRef={primaryActionRef} primaryLabel="Resume game" onPrimary={resume} />
          </>
        )}

        {gameState === 'failed' && (
          <>
            <p className={`mb-2 text-xs font-black uppercase tracking-[0.2em] ${stateStyle.accent}`}>Experiment ended</p>
            <h2 id="game-overlay-title" className="text-4xl font-black text-white sm:text-5xl">Lab meltdown</h2>
            <p id="game-overlay-description" className="mt-3 text-sm leading-6 text-slate-300">
              {failReason === 'mistakes' ? 'Too many classification errors.' : 'Time ran out before reaching the quota.'}
            </p>
            <p className="mt-3 text-sm text-slate-400">Level {currentLevel} of {maxLevel} · {correctInRound} correct this round</p>
            <div className="my-6"><ScoreBadge score={score} /></div>
            <ActionButtons primaryRef={primaryActionRef} primaryLabel="Try again" onPrimary={restart} />
          </>
        )}

        {gameState === 'victory' && (
          <>
            <p className={`mb-2 text-xs font-black uppercase tracking-[0.2em] ${stateStyle.accent}`}>All objectives complete</p>
            <h2 id="game-overlay-title" className="text-4xl font-black text-white sm:text-5xl">Research complete</h2>
            <p id="game-overlay-description" className="mt-3 text-sm leading-6 text-slate-300">Splendid sorting, Researcher!</p>
            <p className="mt-3 text-sm text-slate-400">All {maxLevel} levels cleared · {correctInRound} correct in the final round</p>
            <div className="my-6"><ScoreBadge score={score} /></div>
            <ActionButtons primaryRef={primaryActionRef} primaryLabel="Play again" onPrimary={restart} />
          </>
        )}

        {gameState === 'levelUp' && (
          <>
            <p className={`mb-2 text-xs font-black uppercase tracking-[0.2em] ${stateStyle.accent}`}>Objective secured</p>
            <h2 id="game-overlay-title" className="text-4xl font-black text-white sm:text-5xl">Level cleared</h2>
            <div className="my-6"><LevelProgress currentLevel={currentLevel} maxLevel={maxLevel} /></div>
            <p id="game-overlay-description" className="text-sm leading-6 text-slate-300">Level {currentLevel} → {currentLevel + 1} · {correctInRound} correct</p>
            <div className="mt-6">
              <button ref={primaryActionRef} onClick={resume} className="btn-primary w-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300">
                <Play className="h-5 w-5 fill-current" /> Begin level {currentLevel + 1}
              </button>
            </div>
          </>
        )}

        <p className="mt-5 text-xs font-medium text-slate-500">{keyHint}</p>
      </div>
    </div>
  );
}

function OverlayStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-xl bg-slate-900 px-2 py-2">
      <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">{label}</span>
      <span className="mt-0.5 block truncate text-sm font-black text-slate-100" title={value}>{value}</span>
    </div>
  );
}

function ActionButtons({
  primaryRef,
  primaryLabel,
  onPrimary,
}: {
  primaryRef: RefObject<HTMLButtonElement | null>;
  primaryLabel: string;
  onPrimary: () => void;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button ref={primaryRef} onClick={onPrimary} className="btn-primary flex-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300">
        {primaryLabel === 'Resume game' ? <Play className="h-5 w-5 fill-current" /> : <RefreshCw className="h-5 w-5" />} {primaryLabel}
      </button>
      <Link href="/" className="btn-danger-ghost flex-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-300">
        <LogOut className="h-5 w-5" /> Quit to hub
      </Link>
    </div>
  );
}
