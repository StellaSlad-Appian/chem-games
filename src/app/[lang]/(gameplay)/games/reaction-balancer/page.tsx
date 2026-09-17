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
import { useI18n } from '@/i18n/client';
import { localizePath } from '@/i18n/routing';

export default function ReactionBalancerPage() {
  const router = useRouter();
  const { t, f, locale } = useI18n();
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
          gameSubtitle={t.games.reactionBalancer.subtitle}
          progressText={f(t.games.reactionBalancer.progress, { level: currentLevel })}
          currentLevel={currentLevel}
          score={score}
          onExit={() => router.push(localizePath('/games', locale))}
          showLives={false}
          showTimer={false}
          showCenterTask={false}
        />
      </div>

      <GameSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        gameId="reaction-balancer"
      />

      <GameInstructionsModal
        isOpen={isInstructionsOpen}
        onClose={() => setIsInstructionsOpen(false)}
        title={t.games.reactionBalancer.instructionsTitle}
      >
        <p className="text-sm text-[var(--muted)]">
          {t.games.reactionBalancer.instructionsBody.split('{arrows}')[0]}
          <strong>▲ / ▼</strong>
          {t.games.reactionBalancer.instructionsBody.split('{arrows}')[1]}
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