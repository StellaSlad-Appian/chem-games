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

// Core Engine & Utilities
import type { CompoundData } from '@/core-engine/types/chemistry';
import { COMPOUNDS_REGISTRY } from '@/core-engine/data/compounds';
import {
  generateComparativeError,
  generateChemicalHint,
} from '@/core-engine/utils/chemical-utils';

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

const SPAWN_COLOR_POOL = [
  'border-cyan-400 text-cyan-400 hover:border-cyan-300',
  'border-pink-500 text-pink-400 hover:border-pink-400',
  'border-amber-400 text-amber-400 hover:border-amber-300',
  'border-emerald-400 text-emerald-400 hover:border-emerald-300',
  'border-blue-500 text-blue-400 hover:border-blue-400',
];

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

  // Intra-level Objective Tracking
  const [correctInRound, setCorrectInRound] = useState(0);
  const [targetQuota, setTargetQuota] = useState(3);
  const [completedTargetIds, setCompletedTargetIds] = useState<string[]>([]);
  const targetsRequiredPerLevel = 3;

  // Timers, Colors & Targets
  const [timeLeft, setTimeLeft] = useState(45);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [currentTarget, setCurrentTarget] = useState<CompoundData | null>(null);
  const [bubbles, setBubbles] = useState<BubbleData[]>([]);

  // Separated Feedback States
  const [activeHint, setActiveHint] = useState<string | null>(null);
  const [activeError, setActiveError] = useState<PositionedError | null>(null);

  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isInstructionsOpen, setIsInstructionsOpen] = useState<boolean>(false);

  const maxLevel = 5;
  const spawnIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const consecutiveDistractors = useRef(0);

  const getRandomSpeedForLevel = (level: number): number => {
    const baseSpeed = Math.max(8.5 - level * 1.1, 3.2);
    const variance = Math.max(2.2 - level * 0.15, 1.2);
    return Math.random() * variance + baseSpeed;
  };

  // 1. WAVE COUNTDOWN ENGINE
  useEffect(() => {
    if (gameState !== 'playing') return;

    const clockInterval = setInterval(() => {
      setTimeLeft((prev) => {
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

  // 2. SPAWN COLOR ROTATOR ENGINE
  useEffect(() => {
    if (gameState !== 'playing') return;

    const colorClock = setInterval(() => {
      setCurrentColorIndex((prev) => (prev + 1) % SPAWN_COLOR_POOL.length);
    }, 2000);

    return () => clearInterval(colorClock);
  }, [gameState]);

  // 3. MOLECULE TARGETING SYSTEM
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
    setTimeLeft(45);
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

  // 4. BUBBLE SPAWN ENGINE
  useEffect(() => {
    if (gameState !== 'playing' || !currentTarget) {
      if (spawnIntervalRef.current) clearInterval(spawnIntervalRef.current);
      return;
    }

    const currentLevelPool = COMPOUNDS_REGISTRY.filter(
      (chem) => chem.difficulty === currentLevel
    );

    spawnIntervalRef.current = setInterval(() => {
      const PITY_THRESHOLD = 5;
      let shouldBeCorrect =
        Math.random() > 0.85 || bubbles.filter((b) => b.isCorrect).length === 0;

      if (consecutiveDistractors.current >= PITY_THRESHOLD) {
        shouldBeCorrect = true;
      }

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
            ? distractors[Math.floor(Math.random() * distractors.length)]
            : COMPOUNDS_REGISTRY[Math.floor(Math.random() * COMPOUNDS_REGISTRY.length)];
      }

      const newBubble: BubbleData = {
        id: crypto.randomUUID(),
        compoundId: sourceChemical.id,
        formula: sourceChemical.formula,
        chemicalName: sourceChemical.name,
        xPos: Math.random() * 80 + 10,
        speed: getRandomSpeedForLevel(currentLevel),
        isCorrect: sourceChemical.id === currentTarget.id,
        colorClass: SPAWN_COLOR_POOL[currentColorIndex],
      };

      setBubbles((prev) => [...prev, newBubble]);
    }, Math.max(1500 - currentLevel * 120, 850));

    return () => {
      if (spawnIntervalRef.current) clearInterval(spawnIntervalRef.current);
    };
  }, [gameState, currentTarget, bubbles, currentLevel, currentColorIndex]);

  // Auto-dismiss positioned error banner after 3 seconds
  useEffect(() => {
    if (!activeError) return;
    const timer = setTimeout(() => setActiveError(null), 3000);
    return () => clearTimeout(timer);
  }, [activeError]);

  // 5. INTERACTION SYSTEM
  const handleBubbleClick = (
    id: string,
    isCorrect: boolean,
    compoundId: string,
    clickCoords: { x: number; y: number }
  ) => {
    if (gameState !== 'playing') return;

    if (isCorrect) {
      playSound('pop_01');
      setScore((prev) => prev + 100 * currentLevel);
      setBubbles((prev) => prev.filter((b) => b.id !== id));
      setCorrectInRound((prev) => prev + 1);
      setActiveError(null);
    } else {
      playSound('fizzle');

      // Retrieve full clicked compound object from registry
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
      setTimeLeft(45);
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
    setTimeLeft(45);
    startNewMoleculeWave(1, []);
  };

  const currentTargetPhase = Math.min(
    completedTargetIds.length + 1,
    targetsRequiredPerLevel
  );

  return (
    <GameShell fullBleed themeScope="formula-blaster">
      {/* Header Container */}
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

      {/* Playfield Canvas */}
      <div className="relative mt-4 flex-1 w-full h-full rounded-2xl border-2 border-[var(--border)] bg-[var(--surface)]/30 overflow-hidden">
        {/* MANUAL HINT BANNER (Top Center) */}
        {activeHint && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 w-full max-w-md px-4">
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

        {/* CLICKED BUBBLE COMPARATIVE ERROR BANNER */}
        {activeError && (
          <div
            className="fixed z-50 -translate-x-1/2 pointer-events-none transition-all duration-200"
            style={{ left: `${activeError.x}px`, top: `${activeError.y}px` }}
          >
            <div className="flex items-center gap-2 rounded-xl border-2 border-rose-500/60 bg-[var(--surface)] px-3 py-2 text-xs font-black text-rose-500 shadow-xl backdrop-blur-md">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-500" />
              <span>{activeError.message}</span>
            </div>
          </div>
        )}

        {/* Floating Molecule Bubbles */}
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