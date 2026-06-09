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

      {/* Level indicator */}
      <span className="text-sm font-bold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>
        LEVEL{' '}
        <span className="font-black text-blue-400"> {/* matches the Play icon's blue-500 */}
          {level.toString().padStart(2, '0')}
        </span>
      </span>

      {/* Score */}
      <span className="text-sm font-bold tracking-wider uppercase" style={{ color: 'var(--muted)' }}>
        SCORE{' '}
        <span className="font-black" style={{ color: 'var(--correct)' }}> {/* stays green */}
          {score.toString().padStart(4, '0')}
        </span>
      </span>

      {/* Pause / resume toggle */}
      <button
        onClick={onTogglePause}
        className="ml-1 p-2 rounded-lg transition-colors"
        style={{ background: 'var(--surface-2)' }}
        aria-label={isPaused ? 'Resume game' : 'Pause game'}
      >
        {isPaused
          ? <Play  className="w-5 h-5 text-blue-500" />
          : <Pause className="w-5 h-5" style={{ color: 'var(--muted)' }} />
        }
      </button>

    </div>
  );
}