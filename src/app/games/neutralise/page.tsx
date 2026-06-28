// src/app/games/neutralize/page.tsx
'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useGameState } from '../../../hooks/useGameState';
import GameShell from '../../../components/games/shared/GameShell';
import Header from '../../../components/games/shared/GamesHeader';
import GameFooter from '../../../components/games/shared/GameFooter';
import GameOverlay from '../../../components/games/shared/GameOverlay';
import GameSettingsModal from '../../../components/games/shared/GameSettingsModal';
import GameInstructionsModal from '../../../components/games/shared/GameInstructionsModal';
import NeutralizeArena from '../../../components/games/neutralise/GameArena';

export default function NeutralizePage() {
  const router = useRouter();
  const { 
    gameState, 
    setGameState, 
    score, 
    setScore, 
    currentLevel, 
    setCurrentLevel,
    togglePause, 
    resetBase 
  } = useGameState();
  
  const [lives, setLives] = useState(3);
  const [enemiesDefeated, setEnemiesDefeated] = useState(0);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);

  // Calculate total enemies needed to clear the current level
  const enemiesToWin = 5 + ((currentLevel - 1) * 2); 

  const handlePlayerHit = useCallback(() => {
    setLives(prev => {
      const newLives = prev - 1;
      if (newLives <= 0) setGameState('failed');
      return newLives;
    });
  }, [setGameState]);

  const handleEnemyDefeated = useCallback((points: number) => {
    setScore(prev => prev + points);
    setEnemiesDefeated(prev => {
      const newCount = prev + 1;
      if (newCount >= enemiesToWin) {
        setGameState('levelUp'); 
      }
      return newCount;
    });
  }, [enemiesToWin, setGameState, setScore]);

  const handleExit = useCallback(() => {
    router.push('/games'); 
  }, [router]);

  const handleResume = useCallback(() => {
    if (gameState === 'levelUp') {
      setCurrentLevel(prev => prev + 1);
      setEnemiesDefeated(0);
    }
    setGameState('playing');
  }, [gameState, setCurrentLevel, setGameState]);

  const handleRestart = useCallback(() => {
    setLives(3);
    setEnemiesDefeated(0);
    resetBase();
  }, [resetBase]);

  const handleOpenSettings = useCallback(() => {
    if (gameState === 'playing') {
      togglePause();
    }
    setIsSettingsOpen(true);
  }, [gameState, togglePause]);

  return (
    <GameShell fullBleed>
      <div className="px-4 md:px-6 lg:px-8">
        <Header
          gameTitle="Neutralize!"
          gameSubtitle="DEFEND THE LAB"
          progressText={`Defeated ${enemiesDefeated}/${enemiesToWin}`}
          currentLevel={currentLevel}
          score={score}
          gameState={gameState}
          onTogglePause={togglePause}
          onExit={handleExit} 
          showLives={true}
          lives={lives}
          maxLives={3}
          showTimer={false}
          showCenterTask={false}
        />
      </div>

      <GameSettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />

      <GameInstructionsModal 
        isOpen={isInstructionsOpen} 
        onClose={() => setIsInstructionsOpen(false)}
        title="How to Play: Neutralize!"
      >
        <div className="space-y-4 font-mono text-slate-300">
          <p>Defend the lab from incoming chemical compounds!</p>
          <ul className="list-disc pl-4 space-y-2">
            <li><strong>Switch Ammo:</strong> Right-click or press 1/2 to toggle between Acid (H⁺) and Base (OH⁻) cannons.</li>
            <li><strong>Neutralize:</strong> Match your ammo type to the chemical's property (e.g., use OH⁻ to neutralize an acid).</li>
            <li><strong>Fire:</strong> Use Left-Click, Tap, or Spacebar to launch ions.</li>
            <li><strong>Stay Alert:</strong> Some compounds are hazardous—don't let them hit the barrier!</li>
          </ul>
        </div>
      </GameInstructionsModal>

      <div className="relative flex-1 w-full max-w-5xl mx-auto mt-4 px-4">
        <GameOverlay
          gameState={isSettingsOpen || isInstructionsOpen ? 'playing' : gameState}
          score={score}
          correctInRound={enemiesDefeated}
          currentLevel={currentLevel}
          maxLevel={10}
          failReason={lives <= 0 ? 'mistakes' : 'timeout'}
          onResume={handleResume}
          onRestart={handleRestart}
        />

        <NeutralizeArena 
          level={currentLevel} 
          onEnemyDefeated={handleEnemyDefeated}
          onPlayerHit={handlePlayerHit}
          isPaused={gameState !== 'playing' || isSettingsOpen || isInstructionsOpen} 
        />
      </div>

      <GameFooter 
        onOpenSettings={handleOpenSettings}
        onOpenInstructions={() => setIsInstructionsOpen(true)}
      />
    </GameShell>
  );
}