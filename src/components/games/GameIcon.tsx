// src/components/games/GameIcon.tsx
'use client';

import { Gamepad2 } from 'lucide-react';
import type { GameName } from '@/core-engine/types/general';
import { ACCENT_CLASSES, gameTopic } from '@/lib/games-data';

const SIZES = {
  // The tile and the glyph inside it, together, so every use lines up.
  // md is the plain .icon-tile (2.5rem); the utilities resize it (they win
  // over the components layer .icon-tile lives in).
  sm: { tile: 'icon-tile h-8 w-8 rounded-lg', icon: 'h-4 w-4' },
  md: { tile: 'icon-tile', icon: 'h-5 w-5' },
  lg: { tile: 'icon-tile h-12 w-12', icon: 'h-6 w-6' },
} as const;

/**
 * A game's mark: its line icon in its accent, on a tile tinted with that same
 * accent. The one way a game is shown with a picture, everywhere — the hub and
 * dashboard cards, the leaderboard tabs, personal high scores, the profile and
 * the game's own header — so the same game always wears the same icon.
 *
 * Both come from `GAMES` in src/lib/games-data.ts. The `games.icon` emoji and
 * `games.theme_color` columns in the database are no longer shown anywhere.
 *
 * It takes a slug, not a `GameTopic`, for the reason `GameCard` does: server
 * components render it, and a component (`Icon`) cannot cross that boundary.
 *
 * Decorative (`aria-hidden`): every place that shows it also prints the game's
 * name, so the icon is never the only way to tell the games apart.
 */
export function GameIcon({
  slug,
  size = 'md',
  className = '',
}: {
  slug: GameName;
  size?: keyof typeof SIZES;
  className?: string;
}) {
  const game = gameTopic(slug);
  const { tile, icon } = SIZES[size];
  if (!game) {
    // A game in the database that has no registry entry yet (bond-builder).
    return (
      <span aria-hidden="true" className={`bg-(--surface-2) text-(--muted) ${tile} ${className}`}>
        <Gamepad2 className={icon} />
      </span>
    );
  }
  const accent = ACCENT_CLASSES[game.accent];
  return (
    <span aria-hidden="true" className={`${accent.tint} ${accent.text} ${tile} ${className}`}>
      <game.Icon className={icon} />
    </span>
  );
}
