import React from 'react';

interface ScoreBadgeProps {
  score: number;
}

export function ScoreBadge({ score }: ScoreBadgeProps) {
  return (
    <div 
      className="game-card px-10 py-4 font-black text-xl md:text-2xl rounded-2xl shadow-lg border-2 border-[var(--border)] bg-[var(--surface-2)] tracking-wide"
      style={{ color: 'var(--foreground)' }}
      role="status"
      aria-label={`Final Score: ${score}`}
    >
      Final Score: <span className="text-blue-500 font-extrabold">{score}</span>
    </div>
  );
}