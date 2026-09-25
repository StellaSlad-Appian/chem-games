// src/components/games/shared/GamesHeader.tsx
'use client';

import { LogOut, Lightbulb } from 'lucide-react';
import { useRouter } from 'next/navigation';
import GameStats from './GameStats';
import GameTimer from './GameTimer';
import GameLives from './GameLives';
import { GameIcon } from '@/components/games/GameIcon';
import type { GameName } from '@/core-engine/types/general';
import { ACCENT_CLASSES, gameTopic, type AccentClasses } from '@/lib/games-data';
import { useI18n } from '@/i18n/client';
import { gameTitle } from '@/i18n/game-titles';
import { localizePath } from '@/i18n/routing';

interface HeaderProps {
  /**
   * Which game this is. It gives the header the game's own accent and icon —
   * the same ones its card on the hub wears. Optional only so a component
   * test can render the header bare; every game page passes it.
   */
  game?: GameName;
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

/** The site blue, for a header with no game (a component test). */
const SITE_ACCENT: AccentClasses = {
  text: 'text-(--link)',
  hoverBorder: 'hover:border-(--link)',
  tint: 'bg-(--info-surface)',
  edge: 'border-(--link)/40',
  fill: 'bg-(--link)',
};

/**
 * The game's top bar.
 *
 * It follows the site theme — a white (--surface) card on the tinted page in
 * light, navy in dark — but it is unmistakably *this game's* bar: a stripe of
 * the game's accent along the top, the game's icon and name at the left, and
 * the task in a panel tinted with the same accent. The accent and icon come
 * from `GAMES` in src/lib/games-data.ts, so they are the ones on the game's
 * hub card. It carries --shadow-lg, the strongest elevation below a modal, so
 * it stands clear of the page.
 *
 * Contrast: every accent is ≥ 4.6:1 as text on its own 12% tint and
 * --foreground ≥ 12:1, in both themes (see ACCENT_CLASSES). Progress stays
 * --success and the score --accent, the colours players already learn; the
 * game accent frames the bar and never replaces them.
 *
 * The three slots — the game, progress, lives and timer | the task | hint,
 * level and score, exit — keep their order and place, because players rely
 * on the same controls being in the same place in every game
 * (docs/ACCESSIBILITY.md §5). The per-game theme override still works:
 * GameShell sets data-theme, and every colour here is a token.
 */
export default function GamesHeader({
  game,
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

  const topic = game ? gameTopic(game) : undefined;
  const accent = topic ? ACCENT_CLASSES[topic.accent] : SITE_ACCENT;

  return (
    <header className="relative z-40 w-full overflow-hidden rounded-2xl border border-(--border) bg-(--surface) shadow-(--shadow-lg) select-none">
      {/* The game's colour, as a stripe along the top: decoration, never the only cue. */}
      <div aria-hidden="true" className={`h-1.5 w-full ${accent.fill}`} />

      <div className="grid grid-cols-1 items-center gap-3 px-5 py-3 md:grid-cols-3 md:gap-4 md:px-6">
        {/* LEFT SLOT: THE GAME, PROGRESS, TIMER, LIVES */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:justify-start">
          <div className="flex min-w-0 items-center gap-3">
            {game && <GameIcon slug={game} size="md" />}
            <div className="min-w-30 text-left">
              {game && (
                <span className="block truncate text-xs font-black text-(--foreground)">
                  {gameTitle(t, game, game)}
                </span>
              )}
              <span className="block text-[10px] font-bold uppercase tracking-wider text-(--muted)">
                {t.games.shared.progress}
              </span>
              <span className="text-sm font-black text-(--success)">
                {progressText}
              </span>
            </div>
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

        {/* CENTER SLOT: THE TASK, ON THE GAME'S TINT */}
        {showCenterTask ? (
          <div className={`min-w-0 rounded-xl border px-5 py-2 text-center ${accent.tint} ${accent.edge}`}>
            <span className={`mb-0.5 block text-[10px] font-black uppercase tracking-widest ${accent.text}`}>
              {gameSubtitle}
            </span>
            <h1 className="text-xl leading-snug font-black tracking-tight break-words text-(--foreground) md:text-2xl">
              {customTaskDescription ? (
                <span>{customTaskDescription}</span>
              ) : (
                <>
                  {t.games.shared.find}{' '}
                  <span className={`underline decoration-2 underline-offset-4 ${accent.text}`}>
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
            className="flex cursor-pointer items-center gap-1.5 rounded-xl border-2 border-(--border-strong) bg-(--surface) px-3.5 py-2 text-xs font-black text-(--danger) transition-all select-none hover:border-(--danger) active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--link)"
            title={t.games.shared.exitA11y}
            aria-label={t.games.shared.exitA11y}
          >
            <LogOut className="h-4 w-4 stroke-[2.5]" aria-hidden="true" />
            <span>{t.games.shared.exit}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
