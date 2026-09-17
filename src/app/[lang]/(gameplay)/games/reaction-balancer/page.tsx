'use client';

import { useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useGameState } from '@/hooks/useGameState';
import GameShell from '@/components/games/shared/GameShell';
import GamesHeader from '@/components/games/shared/GamesHeader';
import GameFooter from '@/components/games/shared/GameFooter';
import GameOverlay from '@/components/games/shared/GameOverlay';
import GameSettingsModal from '@/components/games/shared/GameSettingsModal';
import GameInstructionsModal from '@/components/games/shared/GameInstructionsModal';
import ReactionBalancerArena from '@/components/games/reaction-balancer/GameArena';
import { recordGameSession } from '@/lib/actions/game-actions';

export default function ReactionBalancerPage() {
  const router = useRouter();
  const { gameState, setGameState, score, setScore, currentLevel, setCurrentLevel, togglePause, resetBase } = useGameState();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);
  const startTimeRef = useRef(Date.now());

  const handleSaveSession = useCallback(
    async (finalScore: number, outcome: 'victory' | 'failed') => {
      const timeSpentSeconds = Math.max(1, Math.floor((Date.now() - startTimeRef.current) / 1000));
      await recordGameSession({
        gameId: 'reaction-balancer',
        score: finalScore,
        levelReached: currentLevel,
        timeSpentSeconds,
        outcome,
      });
    },
    [currentLevel]
  );

  const handleReactionComplete = useCallback(
    (points: number) => {
      setScore((prev) => prev + points);
      setGameState('levelUp');
      handleSaveSession(score + points, 'victory');
    },
    [setScore, setGameState, handleSaveSession, score]
  );

  return (
    <GameShell fullBleed themeScope="neutralise">
      <div className="px-4 md:px-8">
        <GamesHeader
          gameSubtitle="OBJECTIVE: Adjust coefficients until total atoms balance on both sides"
          progressText={`Level ${currentLevel}`}
          currentLevel={currentLevel}
          score={score}
          onExit={() => router.push('/games')}
          showLives={false}
          showTimer={false}
          showCenterTask={false}
        />
      </div>

      <GameSettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} gameId={"reaction-balancer" as any} />

      <GameInstructionsModal isOpen={isInstructionsOpen} onClose={() => setIsInstructionsOpen(false)} title="How to Play: Reaction Balancer">
        <p className="text-sm text-[var(--muted)]">
          Use the <strong>▲ / ▼</strong> arrows above each compound to adjust its stoichiometric coefficient until the number of atoms for each element is equal on both sides of the arrow.
        </p>
      </GameInstructionsModal>

      <div className="relative mx-auto my-4 flex w-full max-w-4xl flex-1 flex-col justify-center px-4">
        <GameOverlay
          gameState={isSettingsOpen || isInstructionsOpen ? 'playing' : gameState}
          score={score}
          correctInRound={1}
          currentLevel={currentLevel}
          maxLevel={10}
          onResume={() => {
            setCurrentLevel((prev) => prev + 1);
            setGameState('playing');
          }}
          onRestart={() => {
            resetBase();
            setGameState('playing');
          }}
        />

        <ReactionBalancerArena
          level={currentLevel}
          onReactionComplete={handleReactionComplete}
          isPaused={gameState !== 'playing' || isSettingsOpen || isInstructionsOpen}
        />
      </div>

      <GameFooter
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenInstructions={() => setIsInstructionsOpen(true)}
        isPaused={gameState !== 'playing'}
        onTogglePause={togglePause}
      />
    </GameShell>
  );
}