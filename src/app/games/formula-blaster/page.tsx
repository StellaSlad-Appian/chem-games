// src/app/games/formula-blaster/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useGameState } from '../../../hooks/useGameState';
import GameShell from '../../../components/games/GameShell';
import { useRouter } from 'next/navigation';

// Shared Components
import Header from '../../../components/games/GamesHeader';
import GameOverlay from '../../../components/games/GameOverlay';
import BlasterBubble from '../../../components/games/BlasterBubble';
import ErrorBanner from '../../../components/games/ErrorBanner';

// Core Engine
import { GameState } from '../../../core-engine/types/general';
import { Chemical } from '../../../core-engine/types/chemistry';
import { chemicalsDB } from '../../../core-engine/data/compounds';

interface BubbleData {
  id: string;
  formula: string;
  chemicalName: string;
  hint: string;
  xPos: number; 
  speed: number; 
  isCorrect: boolean;
  colorClass: string; // 🌈 Stored color signature ensuring object appearance permanence
}

// Global Neon Color Rotation Array Parameters
const SPAWN_COLOR_POOL = [
  'border-cyan-400 text-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.25)] hover:border-cyan-300',
  'border-pink-500 text-pink-400 shadow-[0_0_12px_rgba(236,72,153,0.25)] hover:border-pink-400',
  'border-amber-400 text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.25)] hover:border-amber-300',
  'border-emerald-400 text-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.25)] hover:border-emerald-300',
  'border-blue-500 text-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.25)] hover:border-blue-400'
];

const formatFormulaToSubscript = (formula: string): string => {
  const subscripts: Record<string, string> = {
    '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄',
    '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉'
  };
  return formula.split('').map(char => subscripts[char] || char).join('');
};

const generateChemicalHint = (chem: Chemical): string => {
  return `${chem.name} consists of ${chem.ions.join(' & ')} ions.`;
};

export default function FormulaBlasterPage() {
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
  
  // Intra-level Objective Tracking
  const [correctInRound, setCorrectInRound] = useState(0);
  const [targetQuota, setTargetQuota] = useState(3); 
  const [completedTargetIds, setCompletedTargetIds] = useState<string[]>([]);
  const targetsRequiredPerLevel = 3;
  
  // Timers, Colors & Targets
  const [timeLeft, setTimeLeft] = useState(45);
  const [currentColorIndex, setCurrentColorIndex] = useState(0); // 🕒 Tracks active generation color state
  const [currentTarget, setCurrentTarget] = useState<Chemical | null>(null);
  const [bubbles, setBubbles] = useState<BubbleData[]>([]);
  const [activeHint, setActiveHint] = useState<string | null>(null);

  const maxLevel = 5;
  const spawnIntervalRef = useRef<NodeJS.Timeout | null>(null);

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
          setGameState('failed');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(clockInterval);
  }, [gameState]);

  // 🟢 UX ADDITION: SPAWN COLOR ROTATOR ENGINE (Fires every 2 seconds)
  useEffect(() => {
    if (gameState !== 'playing') return;

    const colorClock = setInterval(() => {
      setCurrentColorIndex((prevIndex) => (prevIndex + 1) % SPAWN_COLOR_POOL.length);
    }, 2000);

    return () => clearInterval(colorClock);
  }, [gameState]);

  // 2. MOLECULE TARGETING SYSTEM
  const startNewMoleculeWave = (level: number, currentCompleted: string[]) => {
    if (!chemicalsDB || chemicalsDB.length === 0) return;
    
    let levelPool = chemicalsDB.filter(chem => chem.difficulty === level);
    const uncompletedPool = levelPool.filter(chem => !currentCompleted.includes(chem.id));
    
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
    setTimeLeft(45); 
  };

  useEffect(() => {
    startNewMoleculeWave(currentLevel, []);
  }, [currentLevel]);

  // PROGRESSION WATCHER
  useEffect(() => {
    if (gameState === 'playing' && correctInRound > 0 && correctInRound >= targetQuota && currentTarget) {
      const updatedCompleted = [...completedTargetIds, currentTarget.id];

      if (updatedCompleted.length >= targetsRequiredPerLevel) {
        setCompletedTargetIds(updatedCompleted);
        if (currentLevel >= maxLevel) {
          setGameState('victory');
        } else {
          setGameState('levelUp');
        }
      } else {
        if (spawnIntervalRef.current) clearInterval(spawnIntervalRef.current);
        startNewMoleculeWave(currentLevel, updatedCompleted);
      }
    }
  }, [correctInRound, targetQuota, gameState, currentTarget, currentLevel, completedTargetIds, maxLevel, targetsRequiredPerLevel]);

  // 3. BUBBLE SPAWN ENGINE
  useEffect(() => {
    if (gameState !== 'playing' || !currentTarget) {
      if (spawnIntervalRef.current) clearInterval(spawnIntervalRef.current);
      return;
    }

    const currentLevelPool = chemicalsDB.filter(chem => chem.difficulty === currentLevel);

    spawnIntervalRef.current = setInterval(() => {
      const shouldBeCorrect = Math.random() > 0.65 || bubbles.filter(b => b.isCorrect).length === 0;
      let sourceChemical: Chemical;

      if (shouldBeCorrect) {
        sourceChemical = currentTarget;
      } else {
        const distractors = currentLevelPool.filter(c => c.id !== currentTarget.id);
        sourceChemical = distractors.length > 0 
          ? distractors[Math.floor(Math.random() * distractors.length)]
          : chemicalsDB[Math.floor(Math.random() * chemicalsDB.length)];
      }

      // Stamping the active color right at the moment of creation
      const newBubble: BubbleData = {
        id: crypto.randomUUID(),
        formula: sourceChemical.formula,
        chemicalName: sourceChemical.name,
        hint: generateChemicalHint(sourceChemical), 
        xPos: Math.random() * 80 + 10, 
        speed: getRandomSpeedForLevel(currentLevel),
        isCorrect: sourceChemical.id === currentTarget.id,
        colorClass: SPAWN_COLOR_POOL[currentColorIndex] 
      };

      setBubbles((prev) => [...prev, newBubble]);
    }, Math.max(1500 - currentLevel * 120, 850));

    return () => {
      if (spawnIntervalRef.current) clearInterval(spawnIntervalRef.current);
    };
  }, [gameState, currentTarget, bubbles, currentLevel, currentColorIndex]); // Added color tracking dependency channel

  // 4. INTERACTION SYSTEM
  const handleBubbleClick = (id: string, isCorrect: boolean, hint: string) => {
    if (gameState !== 'playing') return;

    if (isCorrect) {
      setScore((prev) => prev + (100 * currentLevel)); 
      setActiveHint(null); 
      setBubbles((prev) => prev.filter((b) => b.id !== id));
      setCorrectInRound((prev) => prev + 1); 
    } else {
      if (currentTarget) {
        setActiveHint(`Looking for: ${generateChemicalHint(currentTarget)}`);
      }
    }
  };

  const handleTriggerManualHint = () => {
    if (gameState !== 'playing' || !currentTarget) return;
    setActiveHint(`Looking for: ${generateChemicalHint(currentTarget)}`);
  };

  const handleExitGame = () => {
    router.push('/');
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
    setTimeLeft(45);

    startNewMoleculeWave(1, []);
  };

  const currentTargetPhase = Math.min(completedTargetIds.length + 1, targetsRequiredPerLevel);

  return (
    <GameShell fullBleed>
      <div className="px-4 md:px-6 lg:px-8">
        <Header
          gameTitle="Formula Blaster"
          gameSubtitle="TARGET MOLECULE"
          targetName={currentTarget?.name}
          progressText={`Target ${currentTargetPhase}/3 • Hits: ${correctInRound}/${targetQuota}`}
          currentLevel={currentLevel}
          score={score}
          gameState={gameState}
          onTogglePause={togglePause}
          onExit={handleExitGame}
          onTriggerHint={handleTriggerManualHint}
          showTimer={true}
          timeLeft={timeLeft}
          showLives={false}
        />
      </div>

      {/* FLOAT CANVAS FIELD AREA */}
      <div className="flex-1 relative w-full h-full mt-4 rounded-2xl bg-slate-950/30 border border-slate-900/50 overflow-hidden">
        <ErrorBanner hint={activeHint} onTimeout={() => setActiveHint(null)} />

        {gameState === 'playing' && bubbles.map((bubble) => (
          <BlasterBubble
            key={bubble.id}
            id={bubble.id}
            formula={formatFormulaToSubscript(bubble.formula)}
            xPos={bubble.xPos}
            speed={bubble.speed}
            isCorrect={bubble.isCorrect}
            hint={bubble.hint}
            colorClass={bubble.colorClass} 
            onClick={handleBubbleClick}
            onExpired={handleAnimationEnd}
          />
        ))}
      </div>

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
    </GameShell>
  );
}