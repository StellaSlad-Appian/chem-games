// src/app/games/neutralise/page.tsx
'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useGameState } from '@/hooks/useGameState';
import { useInputMethod } from '@/hooks/useInputMethod';

// Shared Layout & Overlays
import GameShell from '@/components/games/shared/GameShell';
import GamesHeader from '@/components/games/shared/GamesHeader';
import GameFooter from '@/components/games/shared/GameFooter';
import GameOverlay from '@/components/games/shared/GameOverlay';
import GameSettingsModal from '@/components/games/shared/GameSettingsModal';
import GameInstructionsModal from '@/components/games/shared/GameInstructionsModal';

// Neutralize Specific
import NeutralizeArena from '@/components/games/neutralise/GameArena';
import { NEUTRALISE_CONFIG } from '@/core-engine/config/games/neutralise-config';
import { recordGameSession } from '@/lib/actions/game-actions';

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
    resetBase,
  } = useGameState();

  const [lives, setLives] = useState<number>(3);
  const [enemiesCleared, setEnemiesCleared] = useState<number>(0);
  const [currentWave, setCurrentWave] = useState<number>(1);

  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isInstructionsOpen, setIsInstructionsOpen] = useState<boolean>(false);

  // Which control scheme to show in the instructions modal. Defaults to
  // whatever's detected (touch vs mouse/keyboard); `null` means "follow
  // detection", a non-null value means the person manually picked a tab —
  // covers edge cases like a tablet with a keyboard case, where detection
  // alone can't know which controls the person actually wants to read.
  const detectedInputMethod = useInputMethod();
  const [instructionsTabOverride, setInstructionsTabOverride] = useState<
    'touch' | 'pointer' | null
  >(null);
  const instructionsTab = instructionsTabOverride ?? detectedInputMethod;

  const enemiesPerWave = 
  NEUTRALISE_CONFIG.waves.baseEnemiesPerWave + 
  (currentLevel - 1) * NEUTRALISE_CONFIG.waves.enemyScalingPerLevel;
  const startTimeRef = useRef<number>(Date.now());

  // UX Decision: Auto-show instructions on first visit
  useEffect(() => {
    const hasSeenInstructions = localStorage.getItem('hasSeenNeutraliseInstructions');
    if (!hasSeenInstructions) {
      setIsInstructionsOpen(true);
      if (gameState === 'playing') togglePause();
    }
  }, [gameState, togglePause]);

  const handleCloseInstructions = useCallback(() => {
    setIsInstructionsOpen(false);
    localStorage.setItem('hasSeenNeutraliseInstructions', 'true');
    if (gameState !== 'playing') togglePause();
  }, [gameState, togglePause]);

  // Record session helper
  const handleSaveSession = useCallback(
  async (finalScore: number, outcome: 'victory' | 'failed') => {
    const timeSpentSeconds = Math.max(1, Math.floor((Date.now() - startTimeRef.current) / 1000));
    await recordGameSession({
      gameId: 'neutralise',
      score: finalScore,
      levelReached: currentLevel,
      timeSpentSeconds,
      outcome, // Sends 'failed' or 'victory'
    });
  },
  [currentLevel]
);

const handlePlayerHit = useCallback(() => {
  setLives((prev) => {
    const newLives = prev - 1;
    if (newLives <= 0) {
      setGameState('failed');
      handleSaveSession(score, 'failed'); // 👈 Fixed from 'defeat'
    }
    return newLives;
  });
  setEnemiesCleared((prev) => prev + 1);
}, [setGameState, handleSaveSession, score]);

  const handleEnemyDefeated = useCallback(
    (points: number) => {
      setScore((prev) => prev + points);
      setEnemiesCleared((prev) => prev + 1);
    },
    [setScore]
  );

  // Wave Transition & Game End Logic
  useEffect(() => {
    if (enemiesCleared >= enemiesPerWave) {
      if (currentWave < NEUTRALISE_CONFIG.waves.maxWavesPerLevel) {
        setCurrentWave((prev) => prev + 1);
        setEnemiesCleared(0);
      } else {
        setGameState('levelUp');
        handleSaveSession(score, 'victory');
      }
    }
  }, [enemiesCleared, enemiesPerWave, currentWave, setGameState, handleSaveSession, score]);

  const handleExit = useCallback(() => {
    router.push('/games');
  }, [router]);

  const handleResume = useCallback(() => {
    if (gameState === 'levelUp') {
      setCurrentLevel((prev) => prev + 1);
      setCurrentWave(1);
      setEnemiesCleared(0);
    }
    startTimeRef.current = Date.now();
    setGameState('playing');
  }, [gameState, setCurrentLevel, setGameState]);

  const handleRestart = useCallback(() => {
    setLives(3);
    setEnemiesCleared(0);
    setCurrentWave(1);
    startTimeRef.current = Date.now();
    resetBase();
  }, [resetBase]);

  const handleOpenSettings = useCallback(() => {
    if (gameState === 'playing') {
      togglePause();
    }
    setIsSettingsOpen(true);
  }, [gameState, togglePause]);

  return (
    <GameShell fullBleed themeScope="neutralise">
      <div className="px-4 md:px-6 lg:px-8">
        {/* Responsive Header */}
        <div className="hidden md:block">
          <GamesHeader
            gameSubtitle="OBJECTIVE: Neutralize acids with OH⁻ and bases with H⁺"
            progressText={`Wave ${currentWave}/3 | Cleared ${enemiesCleared}/${enemiesPerWave}`}
            currentLevel={currentLevel}
            score={score}
            onExit={handleExit}
            showLives={true}
            lives={lives}
            maxLives={3}
            showTimer={false}
            showCenterTask={false}
          />
        </div>
        <div className="block md:hidden">
          <GamesHeader
            gameSubtitle="NEUTRALIZE"
            progressText={`Wave ${currentWave}/3`}
            currentLevel={currentLevel}
            score={score}
            onExit={handleExit}
            showLives={true}
            lives={lives}
            maxLives={3}
            showTimer={false}
            showCenterTask={false}
          />
        </div>
      </div>

      <GameSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        gameId="neutralise"
      />

      <GameInstructionsModal
        isOpen={isInstructionsOpen}
        onClose={handleCloseInstructions}
        title="How to Play: Neutralize!"
      >
        <div className="space-y-4 text-sm font-medium text-(--muted)">
          <p className="font-bold text-(--foreground)">Defend the lab from incoming chemical hazards!</p>

          {/* Manual override — detection covers the common cases, but this
              lets anyone switch if it guesses wrong (e.g. tablet + keyboard). */}
          <div className="flex gap-2 rounded-lg bg-(--background) p-1 border border-(--border) w-fit">
            <button
              type="button"
              onClick={() => setInstructionsTabOverride('pointer')}
              className={`rounded-md px-3 py-1.5 text-xs font-bold transition-colors ${
                instructionsTab === 'pointer'
                  ? 'bg-(--surface) text-(--foreground) shadow-sm'
                  : 'text-(--muted)'
              }`}
            >
              Keyboard &amp; mouse
            </button>
            <button
              type="button"
              onClick={() => setInstructionsTabOverride('touch')}
              className={`rounded-md px-3 py-1.5 text-xs font-bold transition-colors ${
                instructionsTab === 'touch'
                  ? 'bg-(--surface) text-(--foreground) shadow-sm'
                  : 'text-(--muted)'
              }`}
            >
              Touchscreen
            </button>
          </div>

          {instructionsTab === 'pointer' ? (
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <kbd className="rounded bg-(--background) px-2 py-1 font-mono text-xs border border-(--border)">1</kbd>
                <span>Load <strong className="text-blue-500">H⁺ (Acid)</strong> to neutralize Bases.</span>
              </li>
              <li className="flex items-center gap-3">
                <kbd className="rounded bg-(--background) px-2 py-1 font-mono text-xs border border-(--border)">2</kbd>
                <span>Load <strong className="text-rose-500">OH⁻ (Base)</strong> to neutralize Acids.</span>
              </li>
              <li className="flex items-center gap-3">
                <kbd className="rounded bg-(--background) px-2 py-1 font-mono text-xs border border-(--border)">Space</kbd>
                <span>Fire your ion cannon! (Or click the arena).</span>
              </li>
              <li className="flex items-center gap-3">
                <kbd className="rounded bg-(--background) px-2 py-1 font-mono text-xs border border-(--border)">←/→</kbd>
                <span>Move the cannon (or move your mouse).</span>
              </li>
            </ul>
          ) : (
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <span className="rounded bg-(--background) px-2 py-1 font-mono text-xs border border-(--border)">Drag</span>
                <span>Slide your finger on the arena to aim the cannon.</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="rounded bg-(--background) px-2 py-1 font-mono text-xs border border-(--border)">Fire</span>
                <span>Tap the <strong>Fire</strong> button below the arena.</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="rounded bg-(--background) px-2 py-1 font-mono text-xs border border-(--border)">Switch</span>
                <span>Tap the ion button to toggle between H⁺ and OH⁻.</span>
              </li>
            </ul>
          )}
        </div>
      </GameInstructionsModal>

      <div className="relative mx-auto my-2 flex w-full max-w-5xl flex-1 min-h-0 flex-col justify-center px-4">
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
          isPaused={gameState !== 'playing' || isSettingsOpen || isInstructionsOpen}
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
