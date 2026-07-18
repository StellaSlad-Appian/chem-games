'use client';

import { GameThemeScope, useGameTheme } from '../../../context/game-settings-context';

interface GameShellProps {
  children: React.ReactNode;
  fullBleed?: boolean;
  themeScope?: GameThemeScope;
}

/**
 * Canonical layout wrapper for all mini-games.
 * Owns background, padding and base flex direction.
 */
export default function GameShell({
  children,
  fullBleed = false,
  themeScope,
}: GameShellProps) {
  useGameTheme(themeScope);
  return (
    <main
      className={`
        game-shell
        relative w-full min-h-screen flex flex-col overflow-hidden select-none
        ${fullBleed
          ? 'p-6'
          : 'p-4 md:p-6 items-center justify-between'}
      `}
    >
      {children}
    </main>
  );
}
