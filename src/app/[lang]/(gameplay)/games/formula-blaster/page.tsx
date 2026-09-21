// src/app/games/formula-blaster/page.tsx
'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';

import { useGameState } from '@/hooks/useGameState';
import { useSound } from '@/hooks/useSound';
import GameShell from '@/components/games/shared/GameShell';

// Shared Components
import Header from '@/components/games/shared/GamesHeader';
import GameOverlay from '@/components/games/shared/GameOverlay';
import GameSettingsModal from '@/components/games/shared/GameSettingsModal';
import GameFooter from '@/components/games/shared/GameFooter';
import GameInstructionsModal from '@/components/games/shared/GameInstructionsModal';
import { BlasterCompactInstructions } from '@/components/games/shared/CompactGameInstructions';

// Formula Blaster
import GameArena, {
  BubbleData,
  PositionedError,
} from '@/components/games/formula-blaster/GameArena';

// Core Engine, Config & Utilities
import type { CompoundData } from '@/core-engine/types/chemistry';
import { COMPOUNDS_REGISTRY } from '@/core-engine/data/compounds';
import { FORMULA_BLASTER_CONFIG } from '@/core-engine/config/games/formula-blaster-config';
import {
  generateComparativeError,
  generateChemicalHint,
} from '@/core-engine/utils/chemical-utils';
import {
  getValidXPosition,
  resetSpawnManager,
} from '@/core-engine/utils/spawn-manager';
import { recordGameSession } from '@/lib/actions/game-actions';
import { useI18n } from '@/i18n/client';
import { compoundName, elementName } from '@/i18n/chemistry-names';
import { localizePath } from '@/i18n/routing';
import type { ChemicalFeedbackCopy } from '@/core-engine/utils/chemical-utils';

export default function FormulaBlasterPage() {
  const router = useRouter();
  const { t, f, locale } = useI18n();
  const { playSound } = useSound();

  // Templates plus the name lookups the engine needs. Formulae and element
  // symbols are passed through untranslated; only the names are localized.
  // Memoised because it is read from event handlers on a hot path.
  const feedbackCopy: ChemicalFeedbackCopy = useMemo(
    () => ({
      hint: t.games.formulaBlaster.hintTemplate,
      wrongPick: t.games.formulaBlaster.wrongPick,
      wrongPickLookFor: t.games.formulaBlaster.wrongPickLookFor,
      wrongPickCheckCounts: t.games.formulaBlaster.wrongPickCheckCounts,
      compoundName: (compound) => compoundName(locale, compound),
      elementName: (element) => elementName(locale, element.symbol),
    }),
    [t, locale]
  );

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

  const [correctInRound, setCorrectInRound] = useState<number>(0);

  const [targetQuota, setTargetQuota] = useState<number>(3);

  const [timeLeft, setTimeLeft] = useState<number>(
    FORMULA_BLASTER_CONFIG.mechanics.baseWaveTimeSeconds
  );

  const [completedTargetIds, setCompletedTargetIds] = useState<string[]>([]);

  const targetsRequiredPerLevel =
    FORMULA_BLASTER_CONFIG.levels.targetsRequiredPerLevel;

  const [currentTarget, setCurrentTarget] =
    useState<CompoundData | null>(null);

  const [bubbles, setBubbles] = useState<BubbleData[]>([]);

  const [activeHint, setActiveHint] = useState<string | null>(null);

  const [activeError, setActiveError] =
    useState<PositionedError | null>(null);

  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  const [isInstructionsOpen, setIsInstructionsOpen] =
    useState<boolean>(false);

  const maxLevel = FORMULA_BLASTER_CONFIG.levels.maxLevel;

  const spawnIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const consecutiveDistractors = useRef<number>(0);

  // Tracks whether the currently open modal caused the pause.
  // This prevents closing a modal from accidentally resuming
  // a game that was already paused before the modal opened.
  const pausedByModalRef = useRef(false);

  // Session recording: when the run started, whether it has been saved,
  // and the hit / miss tally behind the accuracy figure.
  const startTimeRef = useRef<number>(0);
  const sessionSavedRef = useRef(false);
  const totalHitsRef = useRef(0);
  const wrongClicksRef = useRef(0);

  // The clock starts when the page mounts (set in an effect: render must stay pure).
  useEffect(() => {
    startTimeRef.current = Date.now();
  }, []);

  // ------------------------------------------------------------
  // MOVEMENT SPEED
  // ------------------------------------------------------------

  const getRandomSpeedForLevel = (level: number): number => {
    const {
      baseSpeed,
      speedLevelDecrement,
      minSpeed,
      baseVariance,
      varianceLevelDecrement,
      minVariance,
    } = FORMULA_BLASTER_CONFIG.physics;

    const speed = Math.max(
      baseSpeed - level * speedLevelDecrement,
      minSpeed
    );

    const variance = Math.max(
      baseVariance - level * varianceLevelDecrement,
      minVariance
    );

    return Math.random() * variance + speed;
  };

  // ------------------------------------------------------------
  // 1. WAVE COUNTDOWN ENGINE
  // ------------------------------------------------------------

  useEffect(() => {
    if (gameState !== 'playing') return;

    const clockInterval = setInterval(() => {
      setTimeLeft((prev: number) => {
        if (prev <= 1) {
          clearInterval(clockInterval);
          playSound('explosion');
          setGameState('failed');
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(clockInterval);
  }, [gameState, playSound, setGameState]);

  // ------------------------------------------------------------
  // 2. MOLECULE TARGETING SYSTEM
  // ------------------------------------------------------------

  const startNewMoleculeWave = (
    level: number,
    currentCompleted: string[]
  ) => {
    if (!COMPOUNDS_REGISTRY || COMPOUNDS_REGISTRY.length === 0) {
      return;
    }

    let levelPool = COMPOUNDS_REGISTRY.filter(
      (chem) => chem.difficulty === level
    );

    const uncompletedPool = levelPool.filter(
      (chem) => !currentCompleted.includes(chem.id)
    );

    if (uncompletedPool.length > 0) {
      levelPool = uncompletedPool;
    }

    if (levelPool.length === 0) return;

    const randomTarget =
      levelPool[Math.floor(Math.random() * levelPool.length)];

    resetSpawnManager();

    setCompletedTargetIds(currentCompleted);
    setTargetQuota(Math.floor(Math.random() * 3) + 3);
    setCurrentTarget(randomTarget);
    setCorrectInRound(0);
    setBubbles([]);
    setActiveHint(null);
    setActiveError(null);

    setTimeLeft(
      FORMULA_BLASTER_CONFIG.mechanics.baseWaveTimeSeconds
    );
  };

  useEffect(() => {
    startNewMoleculeWave(currentLevel, []);
  }, [currentLevel]);

  // ------------------------------------------------------------
  // PROGRESSION WATCHER
  // ------------------------------------------------------------

  useEffect(() => {
    if (
      gameState === 'playing' &&
      correctInRound > 0 &&
      correctInRound >= targetQuota &&
      currentTarget
    ) {
      const updatedCompleted = [
        ...completedTargetIds,
        currentTarget.id,
      ];

      if (updatedCompleted.length >= targetsRequiredPerLevel) {
        setCompletedTargetIds(updatedCompleted);

        if (currentLevel >= maxLevel) {
          playSound('success-synthesis');
          setGameState('victory');
        } else {
          playSound('lock-element');
          setGameState('levelUp');
        }
      } else {
        if (spawnIntervalRef.current) {
          clearInterval(spawnIntervalRef.current);
        }

        startNewMoleculeWave(
          currentLevel,
          updatedCompleted
        );
      }
    }
  }, [
    correctInRound,
    targetQuota,
    gameState,
    currentTarget,
    currentLevel,
    completedTargetIds,
    maxLevel,
    targetsRequiredPerLevel,
    playSound,
    setGameState,
  ]);

  // ------------------------------------------------------------
  // 3. BUBBLE SPAWN ENGINE
  // ------------------------------------------------------------

  useEffect(() => {
    if (gameState !== 'playing' || !currentTarget) {
      if (spawnIntervalRef.current) {
        clearInterval(spawnIntervalRef.current);
      }

      return;
    }

    const currentLevelPool = COMPOUNDS_REGISTRY.filter(
      (chem) => chem.difficulty === currentLevel
    );

    const spawnBubble = () => {
      const PITY_THRESHOLD =
        FORMULA_BLASTER_CONFIG.mechanics.pityThreshold;

      const shouldBeCorrect =
        Math.random() > 0.8 ||
        consecutiveDistractors.current >= PITY_THRESHOLD;

      let sourceChemical: CompoundData;

      if (shouldBeCorrect) {
        sourceChemical = currentTarget;
        consecutiveDistractors.current = 0;
      } else {
        consecutiveDistractors.current += 1;

        const distractors = currentLevelPool.filter(
          (c) => c.id !== currentTarget.id
        );

        sourceChemical =
          distractors.length > 0
            ? distractors[
                Math.floor(Math.random() * distractors.length)
              ]
            : COMPOUNDS_REGISTRY[
                Math.floor(Math.random() * COMPOUNDS_REGISTRY.length)
              ];
      }

      const randomColor =
        FORMULA_BLASTER_CONFIG.visuals.spawnColorPool[
          Math.floor(
            Math.random() *
              FORMULA_BLASTER_CONFIG.visuals.spawnColorPool.length
          )
        ];

      const newBubble: BubbleData = {
        id: crypto.randomUUID(),
        compoundId: sourceChemical.id,
        formula: sourceChemical.formula,
        chemicalName: sourceChemical.name,
        xPos: getValidXPosition(
          FORMULA_BLASTER_CONFIG.lanes,
          FORMULA_BLASTER_CONFIG.timing.laneCooldownMs
        ),
        speed: getRandomSpeedForLevel(currentLevel),
        isCorrect: sourceChemical.id === currentTarget.id,
        colorClass: randomColor,
      };

      setBubbles((prev) => [...prev, newBubble]);
    };

    // Initial burst
    for (
      let i = 0;
      i < FORMULA_BLASTER_CONFIG.mechanics.initialBurstCount;
      i++
    ) {
      spawnBubble();
    }

    const currentSpawnInterval = Math.max(
      FORMULA_BLASTER_CONFIG.timing.baseSpawnIntervalMs -
        currentLevel *
          FORMULA_BLASTER_CONFIG.timing.spawnIntervalLevelDecrement,
      FORMULA_BLASTER_CONFIG.timing.minSpawnIntervalMs
    );

    spawnIntervalRef.current = setInterval(
      spawnBubble,
      currentSpawnInterval
    );

    return () => {
      if (spawnIntervalRef.current) {
        clearInterval(spawnIntervalRef.current);
      }
    };
  }, [gameState, currentTarget, currentLevel]);

  // ------------------------------------------------------------
  // 4. AUTO-DISMISS ERROR
  // ------------------------------------------------------------

  useEffect(() => {
    if (!activeError) return;

    const timer = setTimeout(
      () => setActiveError(null),
      FORMULA_BLASTER_CONFIG.timing.errorTooltipDurationMs
    );

    return () => clearTimeout(timer);
  }, [activeError]);

  // ------------------------------------------------------------
  // 4b. RECORD THE RUN (once, when it ends)
  // ------------------------------------------------------------

  useEffect(() => {
    if (gameState !== 'failed' && gameState !== 'victory') return;
    if (sessionSavedRef.current) return;
    sessionSavedRef.current = true;

    const answered = totalHitsRef.current + wrongClicksRef.current;
    void recordGameSession({
      gameId: 'formula-blaster',
      score,
      levelReached: currentLevel,
      accuracy:
        answered > 0
          ? Math.round((totalHitsRef.current / answered) * 100)
          : undefined,
      timeSpentSeconds: Math.max(
        1,
        Math.floor((Date.now() - startTimeRef.current) / 1000)
      ),
      outcome: gameState,
    });
  }, [gameState, score, currentLevel]);

  // ------------------------------------------------------------
  // 5. INTERACTION SYSTEM
  // ------------------------------------------------------------

  const handleBubbleClick = (
    id: string,
    isCorrect: boolean,
    compoundId: string,
    clickCoords: { x: number; y: number }
  ) => {
    if (gameState !== 'playing') return;

    if (isCorrect) {
      playSound('pop_01');
      totalHitsRef.current += 1;

      setScore(
        (prev) =>
          prev +
          FORMULA_BLASTER_CONFIG.mechanics.pointsPerLevelMultiplier *
            currentLevel
      );

      setBubbles((prev) =>
        prev.filter((b) => b.id !== id)
      );

      setCorrectInRound((prev) => prev + 1);
      setActiveError(null);
    } else {
      playSound('fizzle');
      wrongClicksRef.current += 1;

      const clickedChem = COMPOUNDS_REGISTRY.find(
        (c) => c.id === compoundId
      );

      if (clickedChem) {
        const errorMsg = generateComparativeError(
          clickedChem,
          currentTarget,
          feedbackCopy
        );

        setActiveError({
          message: errorMsg,
          x: clickCoords.x,
          y: Math.max(clickCoords.y - 60, 20),
        });
      }
    }
  };

  const handleTriggerManualHint = () => {
    if (gameState !== 'playing' || !currentTarget) return;

    playSound('click');

    setActiveHint(generateChemicalHint(currentTarget, feedbackCopy));
  };

  const handleExitGame = () => {
    playSound('click');
    // The games hub, not the dashboard. Leaving a game means leaving *this*
    // game, and the next thing a player wants is another one — three of the
    // five already did this; these two did not.
    router.push(localizePath('/games', locale));
  };

  // ------------------------------------------------------------
  // MODAL PAUSE HANDLERS
  // ------------------------------------------------------------

  const handleOpenSettings = () => {
    playSound('click');

    if (gameState === 'playing') {
      pausedByModalRef.current = true;
      togglePause();
    }

    setIsSettingsOpen(true);
  };

  const handleCloseSettings = () => {
    setIsSettingsOpen(false);

    if (pausedByModalRef.current) {
      pausedByModalRef.current = false;
      togglePause();
    }
  };

  const handleOpenInstructions = () => {
    playSound('click');

    if (gameState === 'playing') {
      pausedByModalRef.current = true;
      togglePause();
    }

    setIsInstructionsOpen(true);
  };

  const handleCloseInstructions = () => {
    setIsInstructionsOpen(false);

    if (pausedByModalRef.current) {
      pausedByModalRef.current = false;
      togglePause();
    }
  };

  // ------------------------------------------------------------
  // BUBBLE LIFECYCLE
  // ------------------------------------------------------------

  const handleAnimationEnd = (id: string) => {
    setBubbles((prev) =>
      prev.filter((b) => b.id !== id)
    );
  };

  // ------------------------------------------------------------
  // OVERLAY / LEVEL PROGRESSION
  // ------------------------------------------------------------

  const handleOverlayAdvance = () => {
    if (gameState === 'levelUp') {
      setCorrectInRound(0);
      setCompletedTargetIds([]);
      setBubbles([]);
      setActiveHint(null);
      setActiveError(null);

      setTimeLeft(
        FORMULA_BLASTER_CONFIG.mechanics.baseWaveTimeSeconds
      );

      setCurrentLevel((prev) => prev + 1);
      setGameState('playing');
    } else {
      setGameState('playing');
    }
  };

  const handleFullReset = () => {
    resetBase();
    resetSpawnManager();

    // A new run gets its own session record and a fresh tally.
    sessionSavedRef.current = false;
    startTimeRef.current = Date.now();
    totalHitsRef.current = 0;
    wrongClicksRef.current = 0;

    setCorrectInRound(0);
    setCompletedTargetIds([]);
    setBubbles([]);
    setActiveHint(null);
    setActiveError(null);

    setTimeLeft(
      FORMULA_BLASTER_CONFIG.mechanics.baseWaveTimeSeconds
    );

    startNewMoleculeWave(1, []);
  };

  const currentTargetPhase = Math.min(
    completedTargetIds.length + 1,
    targetsRequiredPerLevel
  );

  const isModalOpen =
    isSettingsOpen || isInstructionsOpen;

  return (
    <GameShell
      fullBleed
      themeScope="formula-blaster"
    >
      <div className="px-4 md:px-6 lg:px-8">
        <Header
          gameSubtitle={t.games.formulaBlaster.subtitle}
          targetName={currentTarget ? compoundName(locale, currentTarget) : undefined}
          progressText={f(t.games.formulaBlaster.progress, {
            phase: currentTargetPhase,
            hits: correctInRound,
            quota: targetQuota,
          })}
          currentLevel={currentLevel}
          score={score}
          onExit={handleExitGame}
          onTriggerHint={handleTriggerManualHint}
          showTimer={true}
          timeLeft={timeLeft}
          showLives={false}
        />
      </div>

      <GameArena
        bubbles={bubbles}
        activeHint={activeHint}
        activeError={activeError}
        isPaused={gameState !== 'playing'}
        onDismissHint={() => setActiveHint(null)}
        onBubbleClick={handleBubbleClick}
        onBubbleExpired={handleAnimationEnd}
      />

      <GameFooter
        onOpenSettings={handleOpenSettings}
        onOpenInstructions={handleOpenInstructions}
        isPaused={gameState !== 'playing'}
        onTogglePause={togglePause}
      />

      {!isModalOpen && (
        <GameOverlay
          gameState={gameState}
          score={score}
          correctInRound={completedTargetIds.length}
          currentLevel={currentLevel}
          maxLevel={maxLevel}
          failReason="timeout"
          onResume={handleOverlayAdvance}
          onRestart={handleFullReset}
        />
      )}

      <GameSettingsModal
        isOpen={isSettingsOpen}
        onClose={handleCloseSettings}
        gameId="formula-blaster"
      />

      <GameInstructionsModal
        isOpen={isInstructionsOpen}
        onClose={handleCloseInstructions}
        title={t.games.formulaBlaster.instructionsTitle}
        compact={<BlasterCompactInstructions />}
      >
        <div className="space-y-4 text-sm font-medium text-(--muted)">
          <p>{t.games.formulaBlaster.instructionsIntro}</p>

          <ul className="list-disc space-y-2 pl-5">
            <li>{t.games.formulaBlaster.instructionsBullet1}</li>
            <li>{t.games.formulaBlaster.instructionsBullet2}</li>
            <li>{t.games.formulaBlaster.instructionsBullet3}</li>
          </ul>
        </div>
      </GameInstructionsModal>
    </GameShell>
  );
}