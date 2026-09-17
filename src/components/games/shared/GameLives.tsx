'use client';

import { Heart } from 'lucide-react';
import { useI18n } from '@/i18n/client';

interface GameLivesProps {
  lives: number;
  maxLives: number;
}

export default function GameLives({ lives, maxLives }: GameLivesProps) {
  const { t, f } = useI18n();
  return (
    <div className="flex items-center gap-2">
      <span
        className="text-xs uppercase font-medium mr-2 whitespace-nowrap"
        style={{ color: 'var(--game-highlight-border)' }}
      >
        {f(t.games.shared.lives, { lives, max: maxLives })}
      </span>
      {[...Array(maxLives)].map((_, i) => {
        // Below remaining lives = full heart, otherwise empty shell
        const isAlive = i < lives;
        return (
          <Heart
            key={i}
            className={`w-6 h-6 transition-all duration-300 ${
              isAlive
                ? 'text-red-500 fill-red-500 scale-100'
                : 'fill-transparent scale-90'
            }`}
            style={isAlive ? undefined : { color: 'var(--border)' }}
          />
        );
      })}
    </div>
  );
}