import { Heart } from "lucide-react";

interface GameLivesProps {
  lives: number;
  maxLives: number;
}

export default function GameLives({ lives, maxLives }: GameLivesProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs uppercase text-slate-400 font-medium mr-2">
        LIVES: {lives}/{maxLives}
      </span>
      {[...Array(maxLives)].map((_, i) => {
        // If the index is less than remaining lives, it's a full heart. Otherwise, an empty shell.
        const isAlive = i < lives;
        return (
          <Heart 
            key={i} 
            className={`w-6 h-6 transition-all duration-300 ${
              isAlive 
                ? "text-red-500 fill-red-500 scale-100" 
                : "text-slate-200 dark:text-zinc-800 fill-transparent scale-90"
            }`} 
          />
        );
      })}
    </div>
  );
}