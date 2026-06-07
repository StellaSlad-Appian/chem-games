import Link from "next/link";
import { Home, RefreshCw, Play, LogOut } from "lucide-react";
import { GameState } from '../../core-engine/types/general';

interface GameOverlayProps {
  gameState: GameState;
  score: number;
  onResume: () => void;
  onRestart: () => void;
}

export default function GameOverlay({ gameState, score, onResume, onRestart }: GameOverlayProps) {
  // If the game is actively playing, don't show any overlay
  if (gameState === 'playing') return null;

  return (
    <div
      className="absolute inset-0 backdrop-blur-md flex flex-col items-center justify-center z-50 rounded-3xl border-2 shadow-xl p-8 text-center transition-all duration-300"
      style={{ background: 'color-mix(in srgb, var(--background) 85%, transparent)', borderColor: 'var(--border)' }}
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

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
            <button onClick={onResume} className="flex-1 btn-primary">
              <Play className="w-5 h-5 fill-current" /> Resume Game
            </button>
            <Link href="/" className="flex-1 btn-danger-ghost">
              <LogOut className="w-5 h-5" /> Quit Game
            </Link>
          </div>
        </>
      )}

      {/* CASE B: GAME OVER — victory or failure */}
      {(gameState === 'failed' || gameState === 'victory') && (
        <>
          {gameState === 'failed' && (
            <h2 className="text-4xl md:text-5xl mb-4 text-correct" style={{ color: 'var(--wrong)' }}>
              💥 LAB MELTDOWN
            </h2>
          )}
          {gameState === 'victory' && (
            <h2 className="text-4xl md:text-5xl mb-4" style={{ color: 'var(--correct)' }}>
              🧪 RESEARCH COMPLETE!
            </h2>
          )}

          <p className="mb-6 text-lg" style={{ color: 'var(--muted)' }}>
            {gameState === 'victory'
              ? 'You successfully classified all chemicals.'
              : 'Critical life support failure.'}
          </p>

          {/* Final score card */}
          <div
            className="game-card px-8 py-4 font-bold text-xl mb-8"
            style={{ color: 'var(--foreground)' }}
          >
            Final Score: {score}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
            <button onClick={onRestart} className="flex-1 btn-primary">
              <RefreshCw className="w-5 h-5" /> Restart Protocol
            </button>
            <Link href="/" className="flex-1 btn-ghost">
              <Home className="w-5 h-5" /> Hub Menu
            </Link>
          </div>
        </>
      )}

      {/* CASE C: LEVEL UP INTERSTITIAL */}
      {gameState === 'levelUp' && (
        <>
          <h2 className="text-4xl md:text-5xl mb-2 text-blue-500">
            LEVEL CLEARED!
          </h2>
          <p className="mb-8 text-lg font-medium" style={{ color: 'var(--muted)' }}>
            Complexity increasing. Prepare for the next phase.
          </p>

          {/* onResume is reused here — in the parent it handles advancing to the next level */}
          <button onClick={onResume} className="w-full max-w-sm btn-primary py-4">
            <Play className="w-5 h-5 fill-current" /> Begin Next Level
          </button>
        </>
      )}
    </div>
  );
}