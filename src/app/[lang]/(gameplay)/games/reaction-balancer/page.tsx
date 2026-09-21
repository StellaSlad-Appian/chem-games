// src/app/[lang]/(gameplay)/games/reaction-balancer/page.tsx
'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGameState } from '@/hooks/useGameState';
import { useInputMethod, type InputMethod } from '@/hooks/useInputMethod';
import { useReactionBalancer } from '@/hooks/useReactionBalancer';
import { useStoredValue } from '@/hooks/useStoredValue';
import { useSupportMode } from '@/context/game-settings-context';

// Shared layout & overlays
import GameShell from '@/components/games/shared/GameShell';
import GamesHeader from '@/components/games/shared/GamesHeader';
import GameFooter from '@/components/games/shared/GameFooter';
import GameOverlay from '@/components/games/shared/GameOverlay';
import GameSettingsModal from '@/components/games/shared/GameSettingsModal';
import GameInstructionsModal from '@/components/games/shared/GameInstructionsModal';

// Reaction Balancer specific
import ReactionBalancerArena from '@/components/games/reaction-balancer/GameArena';
import BalancerInstructions, {
  BalancerCompactInstructions,
} from '@/components/games/reaction-balancer/Instructions';
import BalancerNotebook from '@/components/games/reaction-balancer/Notebook';
import { REACTION_BALANCER_CONFIG } from '@/core-engine/config/games/reaction-balancer-config';
import { useBalancerMessages } from '@/i18n/game-messages/reaction-balancer';
import { GAME_CONTROLS } from '@/core-engine/constants/ui-constants';
import { recordGameSession } from '@/lib/actions/game-actions';
import { useI18n } from '@/i18n/client';
import { localizePath } from '@/i18n/routing';

const CFG = REACTION_BALANCER_CONFIG;
const GAME_ID = 'reaction-balancer' as const;
const INSTRUCTIONS_SEEN_KEY = 'hasSeenReactionBalancerInstructions';

export default function ReactionBalancerPage() {
  const router = useRouter();
  const M = useBalancerMessages();
  const { locale } = useI18n();
  const { gameState, setGameState, score, setScore, currentLevel, setCurrentLevel, togglePause, resetBase } = useGameState();
  const [supportMode] = useSupportMode(GAME_ID);

  // ------------------------------------------------------------ modals
  // The first-visit flag is read through useSyncExternalStore so the modal is
  // open on the very first render (no effect, no flash of the game).
  const [instructionsSeen, setInstructionsSeen] = useStoredValue(INSTRUCTIONS_SEEN_KEY);
  const [instructionsDismissed, setInstructionsDismissed] = useState(false);
  const [instructionsManual, setInstructionsManual] = useState(false);
  const isInstructionsOpen = instructionsManual || (instructionsSeen !== 'true' && !instructionsDismissed);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showNotebook, setShowNotebook] = useState(false);
  const [challengeDone, setChallengeDone] = useState(false);

  const detectedInputMethod = useInputMethod();
  const [instructionsTabOverride, setInstructionsTabOverride] = useState<InputMethod | null>(null);
  const instructionsTab = instructionsTabOverride ?? detectedInputMethod;

  // While a modal is open the arena is frozen without touching gameState, so a
  // game that was already paused stays paused when the modal closes and a
  // playing game never gets double-paused.
  const isModalOpen = isSettingsOpen || isInstructionsOpen;
  const isPaused = gameState !== 'playing' || isModalOpen;

  // ------------------------------------------------------------ session
  const startTimeRef = useRef<number | null>(null);
  const sessionSavedRef = useRef(false);
  useEffect(() => {
    startTimeRef.current ??= Date.now();
  }, []);
  const secondsPlayed = () => Math.floor((Date.now() - (startTimeRef.current ?? Date.now())) / 1000);

  // ------------------------------------------------------------ rules engine
  const handleRoundScored = useCallback((points: number) => setScore((s) => s + points), [setScore]);

  const handleLevelCleared = useCallback(
    (level: number) => {
      if (level >= CFG.levels.challengeLevel) setChallengeDone(true);
      setGameState(level >= CFG.levels.maxLevel ? 'victory' : 'levelUp');
    },
    [setGameState]
  );

  const game = useReactionBalancer({
    level: currentLevel,
    supportMode,
    isPaused,
    onRoundScored: handleRoundScored,
    onLevelCleared: handleLevelCleared,
  });
  const { startLevel } = game.actions;

  // One session per run: at victory (and again after the optional Challenge),
  // or on exit as 'abandoned'.
  useEffect(() => {
    if (gameState !== 'victory' || sessionSavedRef.current) return;
    sessionSavedRef.current = true;
    const timeSpentSeconds = Math.max(1, secondsPlayed());
    void recordGameSession({
      gameId: GAME_ID,
      score,
      levelReached: currentLevel,
      accuracy: game.accuracy ?? undefined,
      timeSpentSeconds,
      outcome: 'victory',
    });
  }, [gameState, score, currentLevel, game.accuracy]);

  const handleExit = useCallback(() => {
    if (!sessionSavedRef.current && game.roundsPlayed > 0) {
      sessionSavedRef.current = true;
      const timeSpentSeconds = Math.max(0, secondsPlayed());
      void recordGameSession({
        gameId: GAME_ID,
        score,
        levelReached: currentLevel,
        accuracy: game.accuracy ?? undefined,
        timeSpentSeconds,
        outcome: 'abandoned',
      });
    }
    router.push(localizePath('/games', locale));
  }, [game.roundsPlayed, game.accuracy, score, currentLevel, router, locale]);

  // ------------------------------------------------------------ overlay flow
  const handleResume = useCallback(() => {
    if (gameState === 'levelUp') {
      const nextLevel = currentLevel + 1;
      setCurrentLevel(nextLevel);
      startLevel(nextLevel);
    }
    setGameState('playing');
  }, [gameState, currentLevel, setCurrentLevel, startLevel, setGameState]);

  const handleRestart = useCallback(() => {
    sessionSavedRef.current = false;
    startTimeRef.current = Date.now();
    setShowNotebook(false);
    setChallengeDone(false);
    resetBase();
    startLevel(1, { resetRun: true });
  }, [resetBase, startLevel]);

  const handleStartChallenge = useCallback(() => {
    // The Challenge, if played, is a second session.
    sessionSavedRef.current = false;
    startTimeRef.current = Date.now();
    setCurrentLevel(CFG.levels.challengeLevel);
    startLevel(CFG.levels.challengeLevel);
    setGameState('playing');
  }, [setCurrentLevel, startLevel, setGameState]);

  // ------------------------------------------------------------ modals
  const handleOpenInstructions = useCallback(() => setInstructionsManual(true), []);
  const handleCloseInstructions = useCallback(() => {
    setInstructionsManual(false);
    setInstructionsDismissed(true);
    setInstructionsSeen('true');
  }, [setInstructionsSeen]);
  const handleOpenSettings = useCallback(() => setIsSettingsOpen(true), []);
  const handleCloseSettings = useCallback(() => setIsSettingsOpen(false), []);

  // ------------------------------------------------------------ keyboard: H hint, P pause
  const { requestHint } = game.actions;
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (isModalOpen || event.ctrlKey || event.metaKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      // Letters typed into an ordinary text field are for that field; the
      // coefficient inputs are numeric, so H and P are safe to take from them.
      if (target && /^(textarea|select)$/i.test(target.tagName)) return;
      if (target instanceof HTMLInputElement && target.inputMode !== 'numeric') return;
      const key = event.key.toLowerCase();
      if (key === 'h' && gameState === 'playing') {
        event.preventDefault();
        requestHint();
      } else if (key === GAME_CONTROLS.PAUSE && (gameState === 'playing' || gameState === 'paused')) {
        event.preventDefault();
        togglePause();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isModalOpen, gameState, requestHint, togglePause]);

  // ------------------------------------------------------------ header copy
  const progressText = game.isChallenge
    ? M.header.challengeProgress(game.roundIndex + 1, game.roundCount)
    : M.header.progress(game.roundIndex + 1, game.roundCount);
  const taskText = game.isChallenge ? M.header.build(game.round.reaction.name) : M.header.balance(game.round.reaction.name);

  const overlayMessages = {
    paused: M.overlay.paused,
    levelUp: {
      ...M.overlay.levelUp,
      description: M.overlay.levelUp.description(currentLevel + 1, M.overlay.levelChanges[currentLevel + 1] ?? ''),
    },
    victory: challengeDone ? M.overlay.challengeComplete : M.overlay.victory,
  };

  const victoryActions =
    gameState === 'victory'
      ? [
          ...(challengeDone ? [] : [{ label: M.ui.tryChallenge, onClick: handleStartChallenge }]),
          { label: M.ui.openNotebook, onClick: () => setShowNotebook(true) },
        ]
      : undefined;

  return (
    <GameShell fullBleed themeScope={GAME_ID}>
      <div className="px-0 md:px-2">
        <GamesHeader
          gameSubtitle={M.header.subtitle}
          progressText={progressText}
          currentLevel={currentLevel}
          score={score}
          onExit={handleExit}
          onTriggerHint={gameState === 'playing' ? game.actions.requestHint : undefined}
          showLives={false}
          showTimer={false}
          showCenterTask
          customTaskDescription={taskText}
        />
      </div>

      <div className="relative mx-auto my-4 flex w-full max-w-5xl flex-1 flex-col justify-start">
        {!isModalOpen && !showNotebook && (
          <GameOverlay
            gameState={gameState}
            score={score}
            correctInRound={game.results.length}
            currentLevel={currentLevel}
            maxLevel={CFG.levels.maxLevel}
            onResume={handleResume}
            onRestart={handleRestart}
            customMessages={overlayMessages}
            extraActions={victoryActions}
          />
        )}

        {showNotebook ? (
          <BalancerNotebook results={game.results} onBack={() => setShowNotebook(false)} onPlayAgain={handleRestart} />
        ) : (
          <ReactionBalancerArena game={game} isPaused={isPaused} />
        )}
      </div>

      <GameFooter
        onOpenSettings={handleOpenSettings}
        onOpenInstructions={handleOpenInstructions}
        isPaused={gameState !== 'playing'}
        onTogglePause={togglePause}
      />

      {/* Modals come after the footer so they paint above it at the same z-index. */}
      <GameSettingsModal
        isOpen={isSettingsOpen}
        onClose={handleCloseSettings}
        gameId={GAME_ID}
        supportMode={{ label: M.ui.supportMode, description: M.ui.supportModeHelp }}
      />

      <GameInstructionsModal
        isOpen={isInstructionsOpen}
        onClose={handleCloseInstructions}
        title={M.instructions.title}
        compact={<BalancerCompactInstructions tab={instructionsTab} />}
      >
        <BalancerInstructions tab={instructionsTab} onTabChange={setInstructionsTabOverride} />
      </GameInstructionsModal>
    </GameShell>
  );
}
