// src/app/games/neutralize/page.tsx
'use client';

import { useState } from 'react';
import { useGameState } from '../../../hooks/useGameState';
import GameShell from '../../../components/games/shared/GameShell';
import Header from '../../../components/games/shared/GamesHeader';
import NeutralizeArena from '../../../components/games/neutralise/game-arena';

export default function NeutralizePage() {
  const { gameState, setGameState, score, setScore, currentLevel, togglePause } = useGameState();
  const [lives, setLives] = useState(3);

  const handlePlayerHit = () => {
    setLives(prev => {
      const newLives = prev - 1;
      if (newLives <= 0) setGameState('failed');
      return newLives;
    });
  };

  const handleEnemyDefeated = (points: number) => {
    setScore(prev => prev + points);
    // Add logic here to advance level if waves are cleared
  };

  return (
    <GameShell fullBleed>
      <div className="px-4 md:px-6 lg:px-8">
        <Header
          gameTitle="Neutralize!"
          gameSubtitle="DEFEND THE LAB"
          progressText={`Level ${currentLevel}`}
          currentLevel={currentLevel}
          score={score}
          gameState={gameState}
          onTogglePause={togglePause}
          showLives={true}
          lives={lives}
          maxLives={3}
          showTimer={false}
          showCenterTask={false}
        />
      </div>

      <div className="flex-1 w-full max-w-5xl mx-auto mt-4 px-4">
        {gameState === 'playing' && (
          <NeutralizeArena 
            level={currentLevel} 
            onEnemyDefeated={handleEnemyDefeated}
            onPlayerHit={handlePlayerHit}
          />
        )}
      </div>
    </GameShell>
  );
}