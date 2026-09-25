// src/components/games/shared/GameShell.tsx
'use client';

import { GameThemeScope, useGameTheme } from '../../../context/game-settings-context';

interface GamesShellProps {
  children: React.ReactNode;
  fullBleed?: boolean;
  themeScope?: GameThemeScope;
}

/**
 * Canonical layout wrapper for all mini-games.
 * Establishes root z-index to prevent interactive elements bleeding through overlays.
 */
export default function GamesShell({
  children,
  fullBleed = false,
  themeScope,
}: GamesShellProps) {
  useGameTheme(themeScope);
  return (
    <main
      className={`
        game-shell
        relative w-full min-h-screen flex flex-col overflow-hidden select-none z-0
        ${fullBleed ? 'p-6' : 'p-4 md:p-6 items-center justify-between'}
      `}
    >
      {/* Explicitly pushes the background down to allow sibling overlays to sit at z-50 */}
      <div className="absolute inset-0 pointer-events-none bg-(--background) -z-10" />
      
      {children}
    </main>
  );
}