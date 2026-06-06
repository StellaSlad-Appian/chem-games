import { Play, Pause } from "lucide-react";

interface GameStatsProps {
  level: number;
  score: number;
  isPaused: boolean;
  onTogglePause: () => void;
}

export default function GameStats({ level, score, isPaused, onTogglePause }: GameStatsProps) {
  return (
    <div className="flex items-center gap-4 md:gap-6">
      <span className="text-slate-400">
        LEVEL <span className="text-slate-800 dark:text-white font-black">{level.toString().padStart(2, "0")}</span>
      </span>
      <span className="text-slate-400">
        SCORE: <span className="font-black text-emerald-500">{score.toString().padStart(4, "0")}</span>
      </span>
      
      <button 
        onClick={onTogglePause} 
        className="ml-2 p-2 bg-slate-100 dark:bg-zinc-800 rounded-lg hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors"
      >
        {isPaused ? <Play className="w-5 h-5 text-blue-500" /> : <Pause className="w-5 h-5 text-slate-500" />}
      </button>
    </div>
  );
}