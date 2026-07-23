// src/app/games/formula-blaster/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, Lightbulb, X } from 'lucide-react';
import { useGameState } from '@/hooks/useGameState';
import { useSound } from '@/hooks/useSound';
import GameShell from '@/components/games/shared/GameShell';

// Shared Components
import Header from '@/components/games/shared/GamesHeader';
import GameOverlay from '@/components/games/shared/GameOverlay';
import BlasterBubble from '@/components/games/formula-blaster/BlasterBubble';
import GameSettingsModal from '@/components/games/shared/GameSettingsModal';
import GameFooter from '@/components/games/shared/GameFooter';
import GameInstructionsModal from '@/components/games/shared/GameInstructionsModal';

// Core Engine, Config & Utilities
import type { CompoundData } from '@/core-engine/types/chemistry';
import { COMPOUNDS_REGISTRY } from '@/core-engine/data/compounds';
import { FORMULA_BLASTER_CONFIG } from '@/core-engine/config/games/formula-blaster-config';
import {
  generateComparativeError,
  generateChemicalHint,
} from '@/core-engine/utils/chemical-utils';
import { getValidXPosition } from '@/core-engine/utils/spawn-manager';

interface BubbleData {
  id: string;
  compoundId: string;
  formula: string;
  chemicalName: string;
  xPos: number;
  speed: number;
  isCorrect: boolean;
  colorClass: string;
}

interface PositionedError {
  message: string;
  x: number;
  y: number;
}

export default function FormulaBlasterPage() {
  const router = useRouter();
  const { playSound } = useSound();

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

  // Typed numbers with explicit generics to prevent TS literal inference locks
  const [correctInRound, setCorrectInRound] = useState<number>(0);
  const [targetQuota, setTargetQuota] = useState<number>(3);
  const [timeLeft, setTimeLeft] = useState<number>(
    FORMULA_BLASTER_CONFIG.mechanics.baseWaveTimeSeconds
  );

  const [completedTargetIds, setCompletedTargetIds] = useState<string[]>([]);
  const targetsRequiredPerLevel = FORMULA_BLASTER_CONFIG.levels.targetsRequiredPerLevel;

  const [currentTarget, setCurrentTarget] = useState<CompoundData | null>(null);
  const [bubbles, setBubbles] = useState<BubbleData[]>([]);

  const [activeHint, setActiveHint] = useState<string | null>(null);
  const [activeError, setActiveError] = useState<PositionedError | null>(null);

  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isInstructionsOpen, setIsInstructionsOpen] = useState<boolean>(false);

  const maxLevel = FORMULA_BLASTER_CONFIG.levels.maxLevel;
  const spawnIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const consecutiveDistractors = useRef<number>(0);

  // Derive movement speed using central config physics values
  const getRandomSpeedForLevel = (level: number): number => {
    const {
      baseSpeed,
      speedLevelDecrement,
      minSpeed,
      baseVariance,
      varianceLevelDecrement,
      minVariance,
    } = FORMULA_BLASTER_CONFIG.physics;

    const speed = Math.max(baseSpeed - level * speedLevelDecrement, minSpeed);
    const variance = Math.max(baseVariance - level * varianceLevelDecrement, minVariance);

    return Math.random() * variance + speed;
  };

  // 1. WAVE COUNTDOWN ENGINE
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

  // 2. MOLECULE TARGETING SYSTEM
  const startNewMoleculeWave = (level: number, currentCompleted: string[]) => {
    if (!COMPOUNDS_REGISTRY || COMPOUNDS_REGISTRY.length === 0) return;

    let levelPool = COMPOUNDS_REGISTRY.filter((chem) => chem.difficulty === level);
    const uncompletedPool = levelPool.filter(
      (chem) => !currentCompleted.includes(chem.id)
    );

    if (uncompletedPool.length > 0) {
      levelPool = uncompletedPool;
    }

    if (levelPool.length === 0) return;

    const randomTarget = levelPool[Math.floor(Math.random() * levelPool.length)];

    setCompletedTargetIds(currentCompleted);
    setTargetQuota(Math.floor(Math.random() * 3) + 3);
    setCurrentTarget(randomTarget);
    setCorrectInRound(0);
    setBubbles([]);
    setActiveHint(null);
    setActiveError(null);
    setTimeLeft(FORMULA_BLASTER_CONFIG.mechanics.baseWaveTimeSeconds);
  };

  useEffect(() => {
    startNewMoleculeWave(currentLevel, []);
  }, [currentLevel]);

  // PROGRESSION WATCHER
  useEffect(() => {
    if (
      gameState === 'playing' &&
      correctInRound > 0 &&
      correctInRound >= targetQuota &&
      currentTarget
    ) {
      const updatedCompleted = [...completedTargetIds, currentTarget.id];

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
        if (spawnIntervalRef.current) clearInterval(spawnIntervalRef.current);
        startNewMoleculeWave(currentLevel, updatedCompleted);
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

  // 3. BUBBLE SPAWN ENGINE
  useEffect(() => {
    if (gameState !== 'playing' || !currentTarget) {
      if (spawnIntervalRef.current) clearInterval(spawnIntervalRef.current);
      return;
    }

    const currentLevelPool = COMPOUNDS_REGISTRY.filter(
      (chem) => chem.difficulty === currentLevel
    );

    const spawnBubble = () => {
      const PITY_THRESHOLD = FORMULA_BLASTER_CONFIG.mechanics.pityThreshold;
      const shouldBeCorrect =
        Math.random() > 0.8 || consecutiveDistractors.current >= PITY_THRESHOLD;

      let sourceChemical: CompoundData;

      if (shouldBeCorrect) {
        sourceChemical = currentTarget;
        consecutiveDistractors.current = 0;
      } else {
        consecutiveDistractors.current += 1;
        const distractors = currentLevelPool.filter((c) => c.id !== currentTarget.id);
        sourceChemical =
          distractors.length > 0
            ? distractors[Math.floor(Math.random() * distractors.length)]
            : COMPOUNDS_REGISTRY[Math.floor(Math.random() * COMPOUNDS_REGISTRY.length)];
      }

      const randomColor =
        FORMULA_BLASTER_CONFIG.visuals.spawnColorPool[
          Math.floor(Math.random() * FORMULA_BLASTER_CONFIG.visuals.spawnColorPool.length)
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

    // Instant initial wave burst so screen starts active
    for (let i = 0; i < FORMULA_BLASTER_CONFIG.mechanics.initialBurstCount; i++) {
      spawnBubble();
    }

    // Dynamic interval calculation from config values
    const currentSpawnInterval = Math.max(
      FORMULA_BLASTER_CONFIG.timing.baseSpawnIntervalMs -
        currentLevel * FORMULA_BLASTER_CONFIG.timing.spawnIntervalLevelDecrement,
      FORMULA_BLASTER_CONFIG.timing.minSpawnIntervalMs
    );

    spawnIntervalRef.current = setInterval(spawnBubble, currentSpawnInterval);

    return () => {
      if (spawnIntervalRef.current) clearInterval(spawnIntervalRef.current);
    };
  }, [gameState, currentTarget, currentLevel]);

  // Auto-dismiss positioned error banner
  useEffect(() => {
    if (!activeError) return;
    const timer = setTimeout(
      () => setActiveError(null),
      FORMULA_BLASTER_CONFIG.timing.errorTooltipDurationMs
    );
    return () => clearTimeout(timer);
  }, [activeError]);

  // 4. INTERACTION SYSTEM
  const handleBubbleClick = (
    id: string,
    isCorrect: boolean,
    compoundId: string,
    clickCoords: { x: number; y: number }
  ) => {
    if (gameState !== 'playing') return;

    if (isCorrect) {
      playSound('pop_01');
      setScore(
        (prev) => prev + FORMULA_BLASTER_CONFIG.mechanics.pointsPerLevelMultiplier * currentLevel
      );
      setBubbles((prev) => prev.filter((b) => b.id !== id));
      setCorrectInRound((prev) => prev + 1);
      setActiveError(null);
    } else {
      playSound('fizzle');
      const clickedChem = COMPOUNDS_REGISTRY.find((c) => c.id === compoundId);

      if (clickedChem) {
        const errorMsg = generateComparativeError(clickedChem, currentTarget);
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
    setActiveHint(generateChemicalHint(currentTarget));
  };

  const handleExitGame = () => {
    playSound('click');
    router.push('/');
  };

  const handleOpenSettings = () => {
    playSound('click');
    if (gameState === 'playing') {
      togglePause();
    }
    setIsSettingsOpen(true);
  };

  const handleAnimationEnd = (id: string) => {
    setBubbles((prev) => prev.filter((b) => b.id !== id));
  };

  const handleOverlayAdvance = () => {
    if (gameState === 'levelUp') {
      setCorrectInRound(0);
      setCompletedTargetIds([]);
      setBubbles([]);
      setActiveHint(null);
      setActiveError(null);
      setTimeLeft(FORMULA_BLASTER_CONFIG.mechanics.baseWaveTimeSeconds);
      setCurrentLevel((prev) => prev + 1);
      setGameState('playing');
    } else {
      setGameState('playing');
    }
  };

  const handleFullReset = () => {
    resetBase();
    setCorrectInRound(0);
    setCompletedTargetIds([]);
    setBubbles([]);
    setActiveHint(null);
    setActiveError(null);
    setTimeLeft(FORMULA_BLASTER_CONFIG.mechanics.baseWaveTimeSeconds);
    startNewMoleculeWave(1, []);
  };

  const currentTargetPhase = Math.min(
    completedTargetIds.length + 1,
    targetsRequiredPerLevel
  );

  return (
    <GameShell fullBleed themeScope="formula-blaster">
      <div className="px-4 md:px-6 lg:px-8">
        <Header
          gameSubtitle="TARGET MOLECULE"
          targetName={currentTarget?.name}
          progressText={`Target ${currentTargetPhase}/3 • Hits: ${correctInRound}/${targetQuota}`}
          currentLevel={currentLevel}
          score={score}
          onExit={handleExitGame}
          onTriggerHint={handleTriggerManualHint}
          showTimer={true}
          timeLeft={timeLeft}
          showLives={false}
        />
      </div>

      <div className="relative mt-4 flex-1 w-full h-full rounded-2xl border-2 border-[var(--border)] bg-[var(--surface)]/30 overflow-hidden">
        {activeHint && (
          <div className="absolute top-4 left-1/2 z-40 w-full max-w-md -translate-x-1/2 px-4">
            <div className="flex items-start justify-between gap-3 rounded-2xl border-2 border-blue-500/40 bg-[var(--surface)] p-4 shadow-xl backdrop-blur-md">
              <div className="flex items-start gap-3">
                <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
                <div className="space-y-1">
                  <h5 className="text-xs font-black uppercase tracking-wider text-blue-500">
                    Target Molecule Hint
                  </h5>
                  <p className="text-sm font-bold text-(--foreground)">
                    {activeHint}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveHint(null)}
                className="rounded-lg p-1 text-(--muted) hover:text-(--foreground)"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {activeError && (
          <div
            className="pointer-events-none fixed z-50 -translate-x-1/2 transition-all duration-200"
            style={{ left: `${activeError.x}px`, top: `${activeError.y}px` }}
          >
            <div className="flex items-center gap-2 rounded-xl border-2 border-rose-500/60 bg-[var(--surface)] px-3 py-2 text-xs font-black text-rose-500 shadow-xl backdrop-blur-md">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-500" />
              <span>{activeError.message}</span>
            </div>
          </div>
        )}

        {gameState === 'playing' &&
          bubbles.map((bubble) => (
            <BlasterBubble
              key={bubble.id}
              id={bubble.id}
              formula={bubble.formula}
              compoundId={bubble.compoundId}
              xPos={bubble.xPos}
              speed={bubble.speed}
              isCorrect={bubble.isCorrect}
              colorClass={bubble.colorClass}
              onClick={handleBubbleClick}
              onExpired={handleAnimationEnd}
            />
          ))}
      </div>

      <GameFooter
        onOpenSettings={handleOpenSettings}
        onOpenInstructions={() => setIsInstructionsOpen(true)}
        isPaused={gameState !== 'playing'}
        onTogglePause={togglePause}
      />

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

      <GameSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => {
          setIsSettingsOpen(false);
          if (gameState === 'paused') {
            togglePause();
          }
        }}
        gameId="formula-blaster"
      />

      <GameInstructionsModal
        isOpen={isInstructionsOpen}
        onClose={() => setIsInstructionsOpen(false)}
        title="How to Play: Formula Blaster"
      >
        <div className="space-y-4 text-sm font-medium text-(--muted)">
          <p>Find and pop bubbles matching the target molecule shown in the header.</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Click the correct formula to add a hit toward the current target.</li>
            <li>Use the lightbulb in the header if you need a clue about elemental breakdown.</li>
            <li>Tapping an incorrect molecule reveals what element you should look for instead.</li>
          </ul>
        </div>
      </GameInstructionsModal>
    </GameShell>
  );
}