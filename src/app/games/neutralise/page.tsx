// src/app/games/neutralise/page.tsx
'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGameState } from '../../../hooks/useGameState';

// Shared Layout & Overlays
import GameShell from '../../../components/games/shared/GameShell';
import GamesHeader from '../../../components/games/shared/GamesHeader';
import GameFooter from '../../../components/games/shared/GameFooter';
import GameOverlay from '../../../components/games/shared/GameOverlay';
import GameSettingsModal from '../../../components/games/shared/GameSettingsModal';
import GameInstructionsModal from '../../../components/games/shared/GameInstructionsModal';

// Neutralize Specific
import NeutralizeArena from '../../../components/games/neutralise/GameArena';
import { NEUTRALISE_CONFIG } from '../../../core-engine/config/games/neutralise-config';

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
  
  // FIX: Using enemiesCleared to track both defeated and missed enemies
  const [enemiesCleared, setEnemiesCleared] = useState(0);
  const [currentWave, setCurrentWave] = useState(1);
  
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);

  const enemiesPerWave = NEUTRALISE_CONFIG.waves.maxEnemiesPerWave;

  const handlePlayerHit = useCallback(() => {
    setLives(prev => {
      const newLives = prev - 1;
      if (newLives <= 0) setGameState('failed');
      return newLives;
    });
    // Record that an enemy left the board, even if it wasn't defeated
    setEnemiesCleared(prev => prev + 1);
  }, [setGameState]);

  const handleEnemyDefeated = useCallback((points: number) => {
    setScore(prev => prev + points);
    setEnemiesCleared(prev => prev + 1);
  }, [setScore]);

  // Wave Transition Logic
  useEffect(() => {
    if (enemiesCleared >= enemiesPerWave) {
      if (currentWave < NEUTRALISE_CONFIG.waves.maxWavesPerLevel) {
        setCurrentWave(prev => prev + 1);
        setEnemiesCleared(0); // Reset for the new wave
      } else {
        setGameState('levelUp');
      }
    }
  }, [enemiesCleared, enemiesPerWave, currentWave, setGameState]);

  const handleExit = useCallback(() => {
    router.push('/games'); 
  }, [router]);

  const handleResume = useCallback(() => {
    if (gameState === 'levelUp') {
      setCurrentLevel(prev => prev + 1);
      setCurrentWave(1); 
      setEnemiesCleared(0);
    }
    setGameState('playing');
  }, [gameState, setCurrentLevel, setGameState]);

  const handleRestart = useCallback(() => {
    setLives(3);
    setEnemiesCleared(0);
    setCurrentWave(1); 
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
        <GamesHeader
          gameTitle="Neutralize!"
          gameSubtitle="DEFEND THE LAB"
          progressText={`Wave ${currentWave}/3 | Cleared ${enemiesCleared}/${enemiesPerWave}`}
          currentLevel={currentLevel}
          score={score}
          gameState={gameState}
          onExit={handleExit} 
          showLives={true}
          lives={lives}
          maxLives={3}
          showTimer={false}
          showCenterTask={false}
          showPauseButton={false} // Pause is handled in the footer for this game
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

      {/* FIXED WRAPPER: min-h-0 strictly enforces flex containment */}
      <div className="relative flex-1 min-h-0 w-full max-w-5xl mx-auto my-2 px-4 flex flex-col justify-center">
        <GameOverlay
          gameState={isSettingsOpen || isInstructionsOpen ? 'playing' : gameState}
          score={score}
          correctInRound={enemiesCleared}
          currentLevel={currentLevel}
          maxLevel={10}
          failReason={lives <= 0 ? 'mistakes' : 'timeout'}
          onResume={handleResume}
          onRestart={handleRestart}
        />

        <NeutralizeArena 
          level={currentLevel} 
          wave={currentWave}
          enemyCount={enemiesPerWave}
          onEnemyDefeated={handleEnemyDefeated}
          onPlayerHit={handlePlayerHit}
          isPaused={gameState !== 'playing' || isSettingsOpen} 
        />
      </div>

      <GameFooter 
        onOpenSettings={handleOpenSettings}
        onOpenInstructions={() => setIsInstructionsOpen(true)}
        isPaused={gameState !== 'playing'}
        onTogglePause={togglePause}
      />
      
    </GameShell>
  );
}