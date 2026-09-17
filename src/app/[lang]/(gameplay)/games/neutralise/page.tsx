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

// Neutralise Specific
import NeutralizeArena from '@/components/games/neutralise/GameArena';
import { NEUTRALISE_CONFIG } from '@/core-engine/config/games/neutralise-config';
import { getEnemiesPerWave } from '@/core-engine/utils/level-manager';
import { recordGameSession } from '@/lib/actions/game-actions';
import { useI18n } from '@/i18n/client';
import { localizePath } from '@/i18n/routing';

export default function NeutralizePage() {
  const router = useRouter();
  const { t, f, locale } = useI18n();

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

  // Number of enemies successfully neutralised.
  const [enemiesCleared, setEnemiesCleared] = useState<number>(0);

  // Number of enemies that reached the ground.
  const [enemiesMissed, setEnemiesMissed] = useState<number>(0);

  const [currentWave, setCurrentWave] = useState<number>(1);

  const [isSettingsOpen, setIsSettingsOpen] =
    useState<boolean>(false);

  const [isInstructionsOpen, setIsInstructionsOpen] =
    useState<boolean>(false);

  // Tracks whether a modal caused the game to pause.
  // This prevents closing a modal from accidentally resuming
  // a game that was already paused before the modal opened.
  const pausedByModalRef = useRef(false);

  // Prevents the same game session from being saved more than once
  // when multiple state changes happen around game-over.
  const sessionSavedRef = useRef(false);

  // ------------------------------------------------------------
  // INPUT METHOD / INSTRUCTIONS
  // ------------------------------------------------------------

  const detectedInputMethod = useInputMethod();

  const [instructionsTabOverride, setInstructionsTabOverride] =
    useState<'touch' | 'pointer' | null>(null);

  const instructionsTab =
    instructionsTabOverride ?? detectedInputMethod;

  // ------------------------------------------------------------
  // GAME CONFIGURATION
  // ------------------------------------------------------------

  // Capped by the level's maxEnemies, exactly like the arena's spawner.
  const enemiesPerWave = getEnemiesPerWave(currentLevel);

  const enemiesProcessed =
    enemiesCleared + enemiesMissed;

  const startTimeRef = useRef<number>(Date.now());

  // ------------------------------------------------------------
  // FIRST-VISIT INSTRUCTIONS
  // ------------------------------------------------------------

  useEffect(() => {
    const hasSeenInstructions = localStorage.getItem(
      'hasSeenNeutraliseInstructions'
    );

    if (!hasSeenInstructions) {
      setIsInstructionsOpen(true);

      if (gameState === 'playing') {
        pausedByModalRef.current = true;
        togglePause();
      }
    }
  }, [gameState, togglePause]);

  // ------------------------------------------------------------
  // INSTRUCTIONS MODAL
  // ------------------------------------------------------------

  const handleOpenInstructions = useCallback(() => {
    if (gameState === 'playing') {
      pausedByModalRef.current = true;
      togglePause();
    }

    setIsInstructionsOpen(true);
  }, [gameState, togglePause]);

  const handleCloseInstructions = useCallback(() => {
    setIsInstructionsOpen(false);

    localStorage.setItem(
      'hasSeenNeutraliseInstructions',
      'true'
    );

    if (pausedByModalRef.current) {
      pausedByModalRef.current = false;
      togglePause();
    }
  }, [togglePause]);

  // ------------------------------------------------------------
  // SETTINGS MODAL
  // ------------------------------------------------------------

  const handleOpenSettings = useCallback(() => {
    if (gameState === 'playing') {
      pausedByModalRef.current = true;
      togglePause();
    }

    setIsSettingsOpen(true);
  }, [gameState, togglePause]);

  const handleCloseSettings = useCallback(() => {
    setIsSettingsOpen(false);

    if (pausedByModalRef.current) {
      pausedByModalRef.current = false;
      togglePause();
    }
  }, [togglePause]);

  // ------------------------------------------------------------
  // RECORD SESSION
  // ------------------------------------------------------------

  const handleSaveSession = useCallback(
    async (
      finalScore: number,
      outcome: 'victory' | 'failed'
    ) => {
      const timeSpentSeconds = Math.max(
        1,
        Math.floor(
          (Date.now() - startTimeRef.current) / 1000
        )
      );

      await recordGameSession({
        gameId: 'neutralise',
        score: finalScore,
        levelReached: currentLevel,
        timeSpentSeconds,
        outcome,
      });
    },
    [currentLevel]
  );

  // ------------------------------------------------------------
  // ENEMY REACHES GROUND
  // ------------------------------------------------------------

  const handlePlayerHit = useCallback(() => {
    // A missed enemy costs one life.
    //
    // IMPORTANT:
    // Do not call setGameState() or handleSaveSession() inside
    // this state updater. React state updater functions must stay
    // pure.
    setLives((prev) => Math.max(0, prev - 1));

    setEnemiesMissed((prev) => prev + 1);
  }, []);

  // ------------------------------------------------------------
  // HANDLE SECOND MISS / GAME OVER
  // ------------------------------------------------------------

  useEffect(() => {
    if (gameState !== 'playing') return;

    if (enemiesMissed >= 2 || lives <= 0) {
      // Always end the game; only the save is guarded, so a level-up that
      // already recorded this run cannot stop the game from ending.
      setGameState('failed');

      if (!sessionSavedRef.current) {
        sessionSavedRef.current = true;
        handleSaveSession(score, 'failed');
      }
    }
  }, [
    enemiesMissed,
    lives,
    gameState,
    setGameState,
    handleSaveSession,
    score,
  ]);

  // ------------------------------------------------------------
  // ENEMY SUCCESSFULLY DEFEATED
  // ------------------------------------------------------------

  const handleEnemyDefeated = useCallback(
    (points: number) => {
      setScore((prev) => prev + points);

      setEnemiesCleared((prev) => prev + 1);
    },
    [setScore]
  );

  // ------------------------------------------------------------
  // WAVE TRANSITION
  // ------------------------------------------------------------

  useEffect(() => {
    // Never advance a wave after the game has failed.
    if (gameState !== 'playing') return;

    // The wave is complete once every enemy has either:
    // - been successfully neutralised, or
    // - reached the ground.
    //
    // One miss is allowed.
    // The second miss is handled separately above and immediately
    // changes the game state to "failed".
    if (
      enemiesProcessed >= enemiesPerWave &&
      enemiesMissed < 2
    ) {
      if (
        currentWave <
        NEUTRALISE_CONFIG.waves.maxWavesPerLevel
      ) {
        setCurrentWave((prev) => prev + 1);

        // Reset wave-specific counters.
        setEnemiesCleared(0);
        setEnemiesMissed(0);
      } else {
        // Final wave completed successfully.
        setGameState('levelUp');

        if (!sessionSavedRef.current) {
          sessionSavedRef.current = true;
          handleSaveSession(score, 'victory');
        }
      }
    }
  }, [
    enemiesProcessed,
    enemiesPerWave,
    enemiesMissed,
    currentWave,
    gameState,
    setGameState,
    handleSaveSession,
    score,
  ]);

  // ------------------------------------------------------------
  // EXIT
  // ------------------------------------------------------------

  const handleExit = useCallback(() => {
    router.push(localizePath('/games', locale));
  }, [router, locale]);

  // ------------------------------------------------------------
  // OVERLAY RESUME
  // ------------------------------------------------------------

  const handleResume = useCallback(() => {
    if (gameState === 'levelUp') {
      setCurrentLevel((prev) => prev + 1);
      setCurrentWave(1);
      setEnemiesCleared(0);
      setEnemiesMissed(0);

      // The cleared level has been recorded; the next level's outcome
      // (another level-up or a game over) must be recorded as well.
      sessionSavedRef.current = false;
    }

    startTimeRef.current = Date.now();

    setGameState('playing');
  }, [
    gameState,
    setCurrentLevel,
    setGameState,
  ]);

  // ------------------------------------------------------------
  // RESTART
  // ------------------------------------------------------------

  const handleRestart = useCallback(() => {
    // This is a new game session, so allow a new session record.
    sessionSavedRef.current = false;

    setLives(3);
    setEnemiesCleared(0);
    setEnemiesMissed(0);
    setCurrentWave(1);

    startTimeRef.current = Date.now();

    resetBase();
  }, [resetBase]);

  // ------------------------------------------------------------
  // MODAL STATE
  // ------------------------------------------------------------

  const isModalOpen =
    isSettingsOpen || isInstructionsOpen;

  // ------------------------------------------------------------
  // RENDER
  // ------------------------------------------------------------

  return (
    <GameShell
      fullBleed
      themeScope="neutralise"
    >
      <div className="px-4 md:px-6 lg:px-8">
        {/* Desktop Header */}
        <div className="hidden md:block">
          <GamesHeader
            gameSubtitle={t.games.neutralise.subtitleFull}
            progressText={f(t.games.neutralise.progressFull, {
              wave: currentWave,
              cleared: enemiesCleared,
              total: enemiesPerWave,
            })}
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

        {/* Mobile Header */}
        <div className="block md:hidden">
          <GamesHeader
            gameSubtitle={t.games.neutralise.subtitleShort}
            progressText={f(t.games.neutralise.progressShort, { wave: currentWave })}
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

      {/* Settings */}
      <GameSettingsModal
        isOpen={isSettingsOpen}
        onClose={handleCloseSettings}
        gameId="neutralise"
      />

      {/* Instructions */}
      <GameInstructionsModal
        isOpen={isInstructionsOpen}
        onClose={handleCloseInstructions}
        title={t.games.neutralise.instructionsTitle}
      >
        <div className="space-y-4 text-sm font-medium text-(--muted)">
          <p className="font-bold text-(--foreground)">
            {t.games.neutralise.instructionsIntro}
          </p>

          {/* Control method selector */}
          <div className="flex gap-2 rounded-lg bg-(--background) p-1 border border-(--border) w-fit">
            <button
              type="button"
              onClick={() =>
                setInstructionsTabOverride('pointer')
              }
              className={`rounded-md px-3 py-1.5 text-xs font-bold transition-colors ${
                instructionsTab === 'pointer'
                  ? 'bg-(--surface) text-(--foreground) shadow-sm'
                  : 'text-(--muted)'
              }`}
            >
              {t.games.shared.keyboardAndMouse}
            </button>

            <button
              type="button"
              onClick={() =>
                setInstructionsTabOverride('touch')
              }
              className={`rounded-md px-3 py-1.5 text-xs font-bold transition-colors ${
                instructionsTab === 'touch'
                  ? 'bg-(--surface) text-(--foreground) shadow-sm'
                  : 'text-(--muted)'
              }`}
            >
              {t.games.shared.touchscreen}
            </button>
          </div>

          {instructionsTab === 'pointer' ? (
            <ul className="space-y-3">
              {[
                { key: t.games.neutralise.keyOneLabel, node: t.games.neutralise.keyOneText.split('{ion}') , ion: t.games.neutralise.keyOneIon, tone: 'text-blue-500' },
                { key: t.games.neutralise.keyTwoLabel, node: t.games.neutralise.keyTwoText.split('{ion}'), ion: t.games.neutralise.keyTwoIon, tone: 'text-rose-500' },
              ].map(({ key, node, ion, tone }) => (
                <li key={key} className="flex items-center gap-3">
                  <kbd className="shrink-0 rounded bg-(--background) px-2 py-1 font-mono text-xs border border-(--border)">
                    {key}
                  </kbd>
                  <span>
                    {node[0]}
                    <strong className={tone}>{ion}</strong>
                    {node[1]}
                  </span>
                </li>
              ))}

              <li className="flex items-center gap-3">
                <kbd className="shrink-0 rounded bg-(--background) px-2 py-1 font-mono text-xs border border-(--border)">
                  {t.games.neutralise.keySpaceLabel}
                </kbd>
                <span>{t.games.neutralise.keySpaceText}</span>
              </li>

              <li className="flex items-center gap-3">
                <kbd className="shrink-0 rounded bg-(--background) px-2 py-1 font-mono text-xs border border-(--border)">
                  {t.games.neutralise.keyArrowsLabel}
                </kbd>
                <span>{t.games.neutralise.keyArrowsText}</span>
              </li>
            </ul>
          ) : (
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <span className="shrink-0 rounded bg-(--background) px-2 py-1 font-mono text-xs border border-(--border)">
                  {t.games.neutralise.touchDragLabel}
                </span>
                <span>{t.games.neutralise.touchDragText}</span>
              </li>

              <li className="flex items-center gap-3">
                <span className="shrink-0 rounded bg-(--background) px-2 py-1 font-mono text-xs border border-(--border)">
                  {t.games.neutralise.touchFireLabel}
                </span>
                <span>
                  {t.games.neutralise.touchFireText.split('{button}')[0]}
                  <strong>{t.games.neutralise.fire}</strong>
                  {t.games.neutralise.touchFireText.split('{button}')[1]}
                </span>
              </li>

              <li className="flex items-center gap-3">
                <span className="shrink-0 rounded bg-(--background) px-2 py-1 font-mono text-xs border border-(--border)">
                  {t.games.neutralise.touchSwitchLabel}
                </span>
                <span>{t.games.neutralise.touchSwitchText}</span>
              </li>
            </ul>
          )}
        </div>
      </GameInstructionsModal>

      {/* Game area */}
      <div className="relative mx-auto my-2 flex w-full max-w-5xl flex-1 min-h-0 flex-col justify-center px-4">
        {/* Don't show the generic pause/game-over overlay while
            Settings or Instructions are open. The actual gameState
            remains "paused" underneath the modal. */}
        {!isModalOpen && (
          <GameOverlay
            gameState={gameState}
            score={score}
            correctInRound={enemiesCleared}
            currentLevel={currentLevel}
            maxLevel={10}
            failReason={
              enemiesMissed >= 2 || lives <= 0
                ? 'mistakes'
                : 'timeout'
            }
            onResume={handleResume}
            onRestart={handleRestart}
          />
        )}

        <NeutralizeArena
          level={currentLevel}
          wave={currentWave}
          enemyCount={enemiesPerWave}
          onEnemyDefeated={handleEnemyDefeated}
          onPlayerHit={handlePlayerHit}
          isPaused={
            gameState !== 'playing' ||
            isSettingsOpen ||
            isInstructionsOpen
          }
        />
      </div>

      {/* Footer */}
      <GameFooter
        onOpenSettings={handleOpenSettings}
        onOpenInstructions={handleOpenInstructions}
        isPaused={gameState !== 'playing'}
        onTogglePause={togglePause}
      />
    </GameShell>
  );
}