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

/**
 * The game's top bar — design A, "the site's own bar".
 *
 * It is the NavBar's language carried into the game: a white (--surface) bar
 * with a soft --border edge and the card shadow, no inner boxes, labels in
 * --muted micro-caps and the values in the role colours players learn —
 * progress green (--success), score amber (--accent). The task in the middle
 * is the visual centre: the subtitle as a blue eyebrow like the landing page's,
 * the target picked out in --link. Exit is the NavBar's sign-out button: a
 * quiet outline with red text, not a filled red block, because leaving is
 * one click away all game and should not shout.
 *
 * It follows the site theme like every other bar (the per-game override
 * still works: GameShell sets data-theme, and every colour here is a token).
 *
 * The three slots — progress, lives and timer | the task | hint, level and
 * score, exit — and their order are unchanged, because players rely on the
 * same controls being in the same place in every game (docs/ACCESSIBILITY.md
 * §5).
 */
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
    <header className="z-40 grid w-full grid-cols-1 items-center gap-3 rounded-2xl border border-(--border) bg-(--surface)/95 px-5 py-3 shadow-(--shadow-card) backdrop-blur-md select-none md:grid-cols-3 md:gap-4 md:px-6">

      {/* LEFT SLOT: PROGRESS, TIMER, LIVES */}
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:justify-start">
        <div className="min-w-30 text-left">
          <span className="mb-0.5 block text-[10px] font-bold uppercase tracking-wider text-(--muted)">
            {t.games.shared.progress}
          </span>
          <span className="text-sm font-black text-(--success)">
            {progressText}
          </span>
        </div>

        {showTimer && (
          <div className="flex h-11 items-center">
            <GameTimer timeLeft={timeLeft} />
          </div>
        )}

        {showLives && (
          <div className="flex h-11 items-center">
            <GameLives lives={lives} maxLives={maxLives} />
          </div>
        )}
      </div>

      {/* CENTER SLOT: THE TASK */}
      {showCenterTask ? (
        <div className="min-w-0 text-center">
          <span className="mb-0.5 block text-[10px] font-black uppercase tracking-widest text-(--link)">
            {gameSubtitle}
          </span>
          <h1 className="text-xl leading-snug font-black tracking-tight break-words text-(--foreground) md:text-2xl">
            {customTaskDescription ? (
              <span>{customTaskDescription}</span>
            ) : (
              <>
                {t.games.shared.find}{' '}
                <span className="text-(--link) underline decoration-(--link)/40 decoration-2 underline-offset-4">
                  {targetName || t.common.loading}
                </span>
              </>
            )}
          </h1>
        </div>
      ) : (
        <div className="hidden md:block" />
      )}

      {/* RIGHT SLOT: HINT, LEVEL & SCORE, EXIT */}
      <div className="flex flex-wrap items-center justify-center gap-4 md:justify-end md:gap-5">

        {onTriggerHint && (
          <button
            type="button"
            onClick={onTriggerHint}
            className="flex cursor-pointer items-center justify-center rounded-full p-2 text-(--hint) transition-all select-none hover:bg-(--hint-surface) active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--link)"
            title={t.games.shared.hintA11y}
            aria-label={t.games.shared.hintA11y}
          >
            <Lightbulb className="h-6 w-6" aria-hidden="true" />
          </button>
        )}

        {/* Pause, instructions, and settings are grouped in the shared game footer. */}
        <GameStats
          level={currentLevel}
          score={score}
        />

        <button
          onClick={handleExit}
          className="flex cursor-pointer items-center gap-1.5 rounded-xl border-2 border-(--border) bg-(--surface) px-3.5 py-2 text-xs font-black text-(--danger) transition-all select-none hover:border-(--danger) active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--link)"
          title={t.games.shared.exitA11y}
          aria-label={t.games.shared.exitA11y}
        >
          <LogOut className="h-4 w-4 stroke-[2.5]" aria-hidden="true" />
          <span>{t.games.shared.exit}</span>
        </button>
      </div>
    </header>
  );
}
