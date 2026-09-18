// src/app/[lang]/(gameplay)/games/lewis-structures/page.tsx
'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGameState } from '@/hooks/useGameState';
import { useInputMethod, type InputMethod } from '@/hooks/useInputMethod';
import { useLewisStructures } from '@/hooks/useLewisStructures';
import { useStoredValue } from '@/hooks/useStoredValue';
import { useSupportMode } from '@/context/game-settings-context';

// Shared layout & overlays
import GameShell from '@/components/games/shared/GameShell';
import GamesHeader from '@/components/games/shared/GamesHeader';
import GameFooter from '@/components/games/shared/GameFooter';
import GameOverlay from '@/components/games/shared/GameOverlay';
import GameSettingsModal from '@/components/games/shared/GameSettingsModal';
import GameInstructionsModal from '@/components/games/shared/GameInstructionsModal';

// Share to Fill specific
import LewisStructuresArena from '@/components/games/lewis-structures/GameArena';
import LewisInstructions from '@/components/games/lewis-structures/Instructions';
import LewisNotebook from '@/components/games/lewis-structures/Notebook';
import { LEWIS_STRUCTURES_CONFIG } from '@/core-engine/config/games/lewis-structures-config';
import { useLewisMessages } from '@/core-engine/config/games/lewis-structures-messages';
import { GAME_CONTROLS } from '@/core-engine/constants/ui-constants';
import { recordGameSession } from '@/lib/actions/game-actions';
import { useI18n } from '@/i18n/client';
import { localizePath } from '@/i18n/routing';

const CFG = LEWIS_STRUCTURES_CONFIG;
const GAME_ID = 'lewis-structures' as const;
const INSTRUCTIONS_SEEN_KEY = 'hasSeenLewisStructuresInstructions';

export default function LewisStructuresPage() {
  const router = useRouter();
  const M = useLewisMessages();
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

  const detectedInputMethod = useInputMethod();
  const [instructionsTabOverride, setInstructionsTabOverride] = useState<InputMethod | null>(null);
  const instructionsTab = instructionsTabOverride ?? detectedInputMethod;

  // While a modal is open the arena is frozen without touching gameState, so a
  // game that was already paused stays paused when the modal closes and a
  // playing game never gets double-paused.
  const isModalOpen = isSettingsOpen || isInstructionsOpen;
  const isPaused = gameState !== 'playing' || isModalOpen;

  // ------------------------------------------------------------ session
  // Stamped on mount (an effect, so render stays pure) and on every restart.
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
      setGameState(level >= CFG.levels.maxLevel ? 'victory' : 'levelUp');
    },
    [setGameState]
  );

  const game = useLewisStructures({
    level: currentLevel,
    supportMode,
    isPaused,
    onRoundScored: handleRoundScored,
    onLevelCleared: handleLevelCleared,
  });
  const { startLevel } = game.actions;

  // One session per run: at victory, or on exit as 'abandoned'.
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
    resetBase();
    startLevel(1, { resetRun: true });
  }, [resetBase, startLevel]);

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
      if (target && /^(input|textarea|select)$/i.test(target.tagName)) return;
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
  const marking = currentLevel >= CFG.levels.markingLevel;
  const progressText = marking
    ? M.header.marking(game.roundIndex + 1, game.roundCount)
    : M.header.progress(game.roundIndex + 1, game.roundCount);
  const taskText =
    game.round.mode === 'inspect'
      ? M.header.inspect(game.round.molecule.name, game.round.molecule.formula)
      : M.header.build(game.round.molecule.name, game.round.molecule.formula);

  const overlayMessages = {
    paused: M.overlay.paused,
    levelUp: {
      ...M.overlay.levelUp,
      description: M.overlay.levelUp.description(currentLevel + 1, M.overlay.levelChanges[currentLevel + 1] ?? ''),
    },
    victory: M.overlay.victory,
  };

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
            extraAction={gameState === 'victory' ? { label: M.ui.openMarkingSheet, onClick: () => setShowNotebook(true) } : undefined}
          />
        )}

        {showNotebook ? (
          <LewisNotebook results={game.results} marking={marking} onBack={() => setShowNotebook(false)} onPlayAgain={handleRestart} />
        ) : (
          <LewisStructuresArena game={game} level={currentLevel} isPaused={isPaused} />
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

      <GameInstructionsModal isOpen={isInstructionsOpen} onClose={handleCloseInstructions} title={M.instructions.title}>
        <LewisInstructions tab={instructionsTab} onTabChange={setInstructionsTabOverride} />
      </GameInstructionsModal>
    </GameShell>
  );
}
