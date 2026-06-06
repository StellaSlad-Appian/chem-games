import Link from "next/link";
import { Home, RefreshCw, Play, LogOut } from "lucide-react";

interface GameOverlayProps {
  gameState: 'playing' | 'paused' | 'failed' | 'victory';
  score: number;
  onResume: () => void;
  onRestart: () => void;
}

export default function GameOverlay({ gameState, score, onResume, onRestart }: GameOverlayProps) {
  // If the game is actively playing, don't show any overlay
  if (gameState === 'playing') return null;

  return (
    <div className="absolute inset-0 bg-slate-50/80 dark:bg-zinc-950/80 backdrop-blur-md flex flex-col items-center justify-center z-50 rounded-3xl border-2 border-slate-200 dark:border-zinc-800 shadow-xl p-8 text-center transition-all duration-300">
      
      {/* CASE A: GAME IS PAUSED */}
      {gameState === 'paused' && (
        <>
          <h2 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-zinc-100 mb-2 tracking-wide">
            GAME PAUSED
          </h2>
          <p className="text-slate-400 dark:text-zinc-500 mb-8 text-sm md:text-base font-medium">
            Your research progress is temporarily frozen.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
            <button 
              onClick={onResume} 
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-blue-500/20 active:scale-95 transition-all"
            >
              <Play className="w-5 h-5 fill-current" /> Resume Game
            </button>
            <Link 
              href="/" 
              className="flex-1 border-2 border-red-200 dark:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-950/20 text-red-600 dark:text-red-400 font-extrabold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <LogOut className="w-5 h-5" /> Quit Game
            </Link>
          </div>
        </>
      )}

      {/* CASE B: GAME OVER (VICTORY OR FAILURE) */}
      {(gameState === 'failed' || gameState === 'victory') && (
        <>
          {gameState === 'failed' && <h2 className="text-4xl md:text-5xl font-black text-red-500 mb-4">💥 LAB MELTDOWN</h2>}
          {gameState === 'victory' && <h2 className="text-4xl md:text-5xl font-black text-emerald-500 mb-4">🧪 RESEARCH COMPLETE!</h2>}
          
          <p className="text-slate-500 mb-6 text-lg">
            {gameState === 'victory' ? "You successfully classified all chemicals." : "Critical life support failure."}
          </p>
          
          <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl font-bold text-xl mb-8 border-2 border-slate-100 dark:border-zinc-800">
            Final Score: {score}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
            <button 
              onClick={onRestart} 
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
            >
              <RefreshCw className="w-5 h-5" /> Restart Protocol
            </button>
            <Link 
              href="/" 
              className="flex-1 border-2 border-slate-200 dark:border-zinc-700 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-zinc-800 active:scale-95 transition-all"
            >
              <Home className="w-5 h-5" /> Hub Menu
            </Link>
          </div>
        </>
      )}
    </div>
  );
}