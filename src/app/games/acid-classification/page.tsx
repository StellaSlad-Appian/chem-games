// src/app/games/acid-classification/page.tsx
'use client';

import { useState } from 'react';
import { GameState } from '../../../core-engine/types/general';

// 🔄 Import the new unified Header and Overlay
import Header from '../../../components/games/GamesHeader';
import GameOverlay from '../../../components/games/GameOverlay';

export default function AcidClassificationPage() {
  const [gameState, setGameState] = useState<GameState>('playing');
  const [score, setScore] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  
  // Game 1 uses lives instead of a timer
  const [lives, setLives] = useState(3);
  const maxLives = 3;
  const maxLevel = 5;

  // Placeholder states for Game 1's specific sorting logic
  const [sortedItemsCount, setSortedItemsCount] = useState(0);
  const [totalItemsInLevel, setTotalItemsInLevel] = useState(10);
  const [activeCategory, setActiveCategory] = useState("Strong Acids");

  // NOTE: All timer-related standard state (timeLeft) and useEffects have been deleted!

  const handleCorrectMatch = () => {
    if (gameState !== 'playing') return;
    
    setScore((prev) => prev + 150);
    setSortedItemsCount((prev) => {
      const nextCount = prev + 1;
      if (nextCount >= totalItemsInLevel) {
        if (currentLevel >= maxLevel) {
          setGameState('victory');
        } else {
          setGameState('levelUp');
        }
      }
      return nextCount;
    });
  };

  const handleIncorrectMatch = () => {
    if (gameState !== 'playing') return;

    // Lose a life for an incorrect classification
    setLives((prev) => {
      const nextLives = prev - 1;
      if (nextLives <= 0) {
        setGameState('failed');
      }
      return nextLives;
    });
  };

  const togglePause = () => {
    if (gameState === 'failed' || gameState === 'victory' || gameState === 'levelUp') return;
    setGameState((prev) => (prev === 'playing' ? 'paused' : 'playing'));
  };

  const handleLevelUpAdvance = () => {
    setCurrentLevel((prev) => prev + 1);
    setSortedItemsCount(0); // Reset intra-level progress
    setGameState('playing');
  };

  const handleFullReset = () => {
    setScore(0);
    setCurrentLevel(1);
    setLives(3);
    setSortedItemsCount(0);
    setGameState('playing');
  };

  return (
    <main className="w-full min-h-screen bg-linear-to-b from-slate-900 to-slate-950 p-6 flex flex-col gap-6">
      
      {/* 🛡️ NEW UNIFIED HEADER */}
      <Header
        gameTitle="Chemical Classifier"
        gameSubtitle="CLASSIFY INTO GROUP"
        targetName={activeCategory} 
        progressText={`${sortedItemsCount} / ${totalItemsInLevel} Sorted`}
        currentLevel={currentLevel}
        score={score}
        gameState={gameState}
        onTogglePause={togglePause}
        
        // Config options: Game 1 uses LIVES, but NO TIMER!
        showTimer={false}
        showLives={true}
        lives={lives}
        maxLives={maxLives}
      />

      {/* GAME WORKSPACE AREA */}
      <div className="flex-1 w-full rounded-2xl border-2 border-dashed border-slate-700 bg-slate-900/50 flex flex-col items-center justify-center p-12 shadow-inner">
        {gameState === 'playing' && (
          <div className="text-center space-y-6">
            <h2 className="text-xl font-medium text-slate-300">Sorting Board Placeholder</h2>
            <div className="flex gap-4 justify-center">
              <button 
                onClick={handleCorrectMatch} 
                className="px-6 py-3 bg-emerald-600/80 border border-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-500 transition-colors shadow-lg"
              >
                Correct Sort (+150 Score)
              </button>
              <button 
                onClick={handleIncorrectMatch} 
                className="px-6 py-3 bg-red-600/80 border border-red-500 text-white font-bold rounded-xl hover:bg-red-500 transition-colors shadow-lg"
              >
                Wrong Sort (-1 Life)
              </button>
            </div>
          </div>
        )}
      </div>

      {/* OVERLAY COMPONENT MANAGER */}
      <GameOverlay
        gameState={gameState}
        score={score}
        correctInRound={sortedItemsCount}
        currentLevel={currentLevel}
        maxLevel={maxLevel}
        failReason="mistakes" // Game 1 failure is strictly due to losing all 3 lives
        onResume={handleLevelUpAdvance} 
        onRestart={handleFullReset}
      />
    </main>
  );
}