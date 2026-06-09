// src/components/games/GameShell.tsx

interface GameShellProps {
  children: React.ReactNode;
  fullBleed?: boolean;
}

/**
 * Canonical layout wrapper for all mini-games.
 * Owns background, padding and base flex direction.
 */
export default function GameShell({
  children,
  fullBleed = false,
}: GameShellProps) {
  return (
    <main
      className={`
        relative w-full min-h-screen flex flex-col overflow-hidden select-none
        bg-linear-to-b from-slate-900 to-slate-950 text-zinc-100
        ${fullBleed
          ? 'p-6'
          : 'p-4 md:p-6 items-center justify-between'}
      `}
    >
      {children}
    </main>
  );
}