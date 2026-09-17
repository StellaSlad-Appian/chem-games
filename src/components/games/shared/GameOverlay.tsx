// src/components/games/shared/GameOverlay.tsx
'use client';

import { useCallback, useEffect, useRef, type KeyboardEvent as ReactKeyboardEvent, type RefObject } from 'react';
import { LocaleLink } from '@/components/layout/LocaleLink';
import { FlaskConical, LogOut, Pause, Play, RefreshCw, Trophy } from 'lucide-react';
import { GameState } from '@/core-engine/types/general';
import { ScoreBadge } from '@/components/ui/ScoreBadge';
import { LevelProgress } from '@/components/ui/LevelProgress';
import { useSound } from '@/hooks/useSound';
import { OverlayMessageConfig } from '@/core-engine/constants/ui-constants';
import { useI18n } from '@/i18n/client';
import type { Dictionary } from '@/i18n/dictionaries/en';

/**
 * The per-state overlay copy, assembled from the dictionary. `customMessages`
 * still wins where a game passes one, so a game can name the chemistry it just
 * achieved ("Mass conserved") instead of a generic "Level 2!".
 */
function overlayMessages(t: Dictionary): Record<string, OverlayMessageConfig> {
  const o = t.games.overlay;
  return {
    paused: {
      badge: o.pausedBadge,
      title: o.pausedTitle,
      subtitle: o.pausedSubtitle,
      description: o.pausedDescription,
    },
    failed: {
      badge: o.failedBadge,
      title: o.failedTitle,
      subtitle: o.failedSubtitle,
      description: o.failedDescription,
    },
    victory: {
      badge: o.victoryBadge,
      title: o.victoryTitle,
      subtitle: o.victorySubtitle,
      description: o.victoryDescription,
    },
    levelUp: {
      badge: o.levelUpBadge,
      title: o.levelUpTitle,
      subtitle: o.levelUpSubtitle,
      description: o.levelUpDescription,
    },
  };
}

export type FailReason = 'mistakes' | 'timeout' | null;

interface GameOverlayProps {
  gameState: GameState;
  score: number;
  correctInRound: number;
  currentLevel: number;
  maxLevel: number;
  failReason?: FailReason;
  onResume: () => void;
  onRestart: () => void;
  customMessages?: Partial<Record<string, OverlayMessageConfig>>;
  /** An optional third button (e.g. "Open marking sheet") shown on the victory card. */
  extraAction?: { label: string; onClick: () => void };
  /** Several extra buttons (e.g. "Try the Challenge level" and "Open lab notebook"). */
  extraActions?: { label: string; onClick: () => void }[];
}

const STATE_STYLES: Record<Exclude<GameState, 'playing'>, { accent: string }> = {
  paused: { accent: 'text-blue-500' },
  failed: { accent: 'text-rose-500' },
  victory: { accent: 'text-emerald-500' },
  levelUp: { accent: 'text-amber-500' },
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
  customMessages,
  extraAction,
  extraActions,
}: GameOverlayProps) {
  const { t, f, locale } = useI18n();
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

  const textConfig = customMessages?.[gameState] ?? overlayMessages(t)[gameState];

  const keyHint =
    gameState === 'paused' || gameState === 'levelUp'
      ? t.games.overlay.keyHintResume
      : t.games.overlay.keyHintRetry;

  return (
    <div className="fixed inset-0 z-100 grid place-items-center overflow-y-auto bg-slate-950/80 p-4 backdrop-blur-md sm:p-6">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="game-overlay-title"
        aria-describedby="game-overlay-description"
        onKeyDown={handleTabKey}
        className="w-full max-w-md rounded-2xl border-2 border-(--border) bg-(--surface) p-6 text-center shadow-xl md:p-8"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-(--border) bg-(--background)">
          {gameState === 'paused' && <Pause className={`h-7 w-7 ${stateStyle.accent}`} aria-hidden="true" />}
          {gameState === 'failed' && <FlaskConical className={`h-7 w-7 ${stateStyle.accent}`} aria-hidden="true" />}
          {gameState === 'victory' && <Trophy className={`h-7 w-7 ${stateStyle.accent}`} aria-hidden="true" />}
          {gameState === 'levelUp' && <Trophy className={`h-7 w-7 ${stateStyle.accent}`} aria-hidden="true" />}
        </div>

        <p className={`mb-1 text-xs font-black uppercase tracking-wider ${stateStyle.accent}`}>
          {textConfig?.badge}
        </p>

        <h2 id="game-overlay-title" className="text-3xl font-black tracking-tight text-(--foreground) sm:text-4xl">
          {textConfig?.title}
        </h2>

        <p className="mt-1 text-sm font-black text-blue-500 uppercase tracking-wide">
          {textConfig?.subtitle}
        </p>

        <p id="game-overlay-description" className="mt-2 text-xs font-bold text-(--muted) leading-relaxed">
          {gameState === 'failed' && failReason === 'timeout'
            ? t.games.overlay.timeoutDescription
            : textConfig?.description}
        </p>

        {gameState === 'paused' && (
          <div className="my-6 grid grid-cols-3 gap-2 rounded-xl border border-(--border) bg-(--background) p-3 text-left">
            <OverlayStat label={t.games.overlay.statLevel} value={`${currentLevel} / ${maxLevel}`} />
            <OverlayStat label={t.games.overlay.statScore} value={score.toLocaleString(locale)} />
            <OverlayStat
              label={t.games.overlay.statRound}
              value={f(t.games.overlay.statRoundValue, { count: correctInRound })}
            />
          </div>
        )}

        {(gameState === 'failed' || gameState === 'victory') && (
          <div className="my-6 rounded-xl border border-(--border) bg-(--background) p-4 text-center">
            <p className="text-xs font-bold text-(--muted) uppercase tracking-wider">
              {f(t.games.overlay.levelOfMax, {
                level: currentLevel,
                max: maxLevel,
                correct: correctInRound,
              })}
            </p>
            <div className="mt-2 flex justify-center">
              <ScoreBadge score={score} />
            </div>
          </div>
        )}

        {gameState === 'levelUp' && (
          <div className="my-6 rounded-xl border border-(--border) bg-(--background) p-4 text-center">
            <LevelProgress currentLevel={currentLevel} maxLevel={maxLevel} />
            <p className="mt-3 text-xs font-bold text-(--muted)">
              {f(t.games.overlay.levelUpProgress, {
                level: currentLevel,
                next: currentLevel + 1,
                correct: correctInRound,
              })}
            </p>
          </div>
        )}

        <ActionButtons
          gameState={gameState}
          primaryRef={primaryActionRef}
          primaryLabel={
            gameState === 'paused'
              ? t.games.overlay.resume
              : gameState === 'levelUp'
                ? f(t.games.overlay.beginLevel, { level: currentLevel + 1 })
                : t.games.overlay.tryAgain
          }
          quitLabel={t.games.overlay.quitToHub}
          onPrimary={gameState === 'failed' || gameState === 'victory' ? restart : resume}
        />

        {[...(extraAction ? [extraAction] : []), ...(extraActions ?? [])].map((action) => (
          <button
            key={action.label}
            type="button"
            onClick={action.onClick}
            className="mt-2 w-full cursor-pointer rounded-xl border border-(--border) bg-(--background) px-4 py-3 text-xs font-black uppercase tracking-wider text-(--foreground) shadow-sm transition hover:border-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
          >
            {action.label}
          </button>
        ))}

        <p className="mt-4 text-xs font-medium text-(--muted)">{keyHint}</p>
      </div>
    </div>
  );
}

function OverlayStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-lg bg-[var(--surface)] p-2">
      <span className="block text-[10px] font-bold uppercase tracking-wider text-(--muted)">{label}</span>
      <span className="mt-0.5 block truncate text-sm font-black text-(--foreground)" title={value}>{value}</span>
    </div>
  );
}

function ActionButtons({
  gameState,
  primaryRef,
  primaryLabel,
  quitLabel,
  onPrimary,
}: {
  gameState: GameState;
  primaryRef: RefObject<HTMLButtonElement | null>;
  primaryLabel: string;
  quitLabel: string;
  onPrimary: () => void;
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <button
        ref={primaryRef}
        onClick={onPrimary}
        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-500 px-4 py-3 text-xs font-black uppercase tracking-wider text-white shadow-md transition hover:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
      >
        {gameState === 'paused' || gameState === 'levelUp' ? (
          <Play className="h-4 w-4 shrink-0 fill-current" aria-hidden="true" />
        ) : (
          <RefreshCw className="h-4 w-4 shrink-0" aria-hidden="true" />
        )}
        {primaryLabel}
      </button>

      <LocaleLink
        href="/games"
        className="flex items-center justify-center gap-2 rounded-xl border border-(--border) bg-(--background) px-4 py-3 text-xs font-black uppercase tracking-wider text-(--foreground) shadow-sm transition hover:border-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
      >
        <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" /> {quitLabel}
      </LocaleLink>
    </div>
  );
}
