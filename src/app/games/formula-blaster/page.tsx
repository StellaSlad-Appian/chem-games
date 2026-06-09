// src/app/games/formula-blaster/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';

// Shared Components
import Header from '../../../components/games/GamesHeader';
import GameOverlay from '../../../components/games/GameOverlay';
import BlasterBubble from '../../../components/games/BlasterBubble';
import ErrorBanner from '../../../components/games/ErrorBanner';

// Core Engine
import { GameState } from '../../../core-engine/types/general';
import { Chemical } from '../../../core-engine/types/chemistry';
import { chemicalsDB } from '../../../core-engine/db';

interface BubbleData {
  id: string;
  formula: string;
  chemicalName: string;
  hint: string;
  xPos: number; 
  speed: number; 
  isCorrect: boolean;
}

const formatFormulaToSubscript = (formula: string): string => {
  const subscripts: Record<string, string> = {
    '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄',
    '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉'
  };
  return formula.split('').map(char => subscripts[char] || char).join('');
};

const generateChemicalHint = (chem: Chemical): string => {
  return `${chem.name} (${formatFormulaToSubscript(chem.formula)}) consists of ${chem.ions.join(' & ')} ions. Molar Mass: ${chem.molarMass} g/mol.`;
};

export default function FormulaBlasterPage() {
  const [gameState, setGameState] = useState<GameState>('playing');
  const [score, setScore] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  
  // Intra-level Objective Tracking
  const [correctInRound, setCorrectInRound] = useState(0);
  const [targetQuota, setTargetQuota] = useState(3); 
  const [completedTargetIds, setCompletedTargetIds] = useState<string[]>([]);
  const targetsRequiredPerLevel = 3;
  
  // Timers & Targets
  const [timeLeft, setTimeLeft] = useState(45);
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
    
    setCompletedTargetIds(currentCompleted); // Force sync here
    setTargetQuota(Math.floor(Math.random() * 3) + 3); 
    setCurrentTarget(randomTarget);
    setCorrectInRound(0);
    setBubbles([]); // Screen wipe
    setActiveHint(null);
    setTimeLeft(45); 
  };

  useEffect(() => {
    startNewMoleculeWave(currentLevel, []);
  }, [currentLevel]);

  // 🛡️ THE FIX: PROGRESSION WATCHER MOVED TO A SAFE USE-EFFECT
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

      const newBubble: BubbleData = {
        id: crypto.randomUUID(),
        formula: sourceChemical.formula,
        chemicalName: sourceChemical.name,
        hint: generateChemicalHint(sourceChemical), 
        xPos: Math.random() * 80 + 10, 
        speed: getRandomSpeedForLevel(currentLevel),
        isCorrect: sourceChemical.id === currentTarget.id,
      };

      setBubbles((prev) => [...prev, newBubble]);
    }, Math.max(1500 - currentLevel * 120, 850));

    return () => {
      if (spawnIntervalRef.current) clearInterval(spawnIntervalRef.current);
    };
  }, [gameState, currentTarget, bubbles, currentLevel]);

  // 4. INTERACTION SYSTEM
  const handleBubbleClick = (id: string, isCorrect: boolean, hint: string) => {
    if (gameState !== 'playing') return;

    if (isCorrect) {
      setScore((prev) => prev + (100 * currentLevel)); 
      setActiveHint(null); 
      setBubbles((prev) => prev.filter((b) => b.id !== id));
      
      // 🛡️ THE FIX: Only increment state here. No wave logic!
      setCorrectInRound((prev) => prev + 1); 
    } else {
      setActiveHint(hint); 
    }
  };

  const handleAnimationEnd = (id: string) => {
    setBubbles((prev) => prev.filter((b) => b.id !== id)); 
  };

  const togglePause = () => {
    if (gameState === 'failed' || gameState === 'victory' || gameState === 'levelUp') return;
    setGameState((prev) => (prev === 'playing' ? 'paused' : 'playing'));
  };

  const handleOverlayAdvance = () => {
    if (gameState === 'levelUp') {
      // 1. Reset Game Logic (Prevents level-skipping)
      setCorrectInRound(0);
      setCompletedTargetIds([]);
      
      // 2. Reset Visuals & Timers (Prevents UI flashing)
      setBubbles([]);
      setActiveHint(null);
      setTimeLeft(45);
      
      // 3. Trigger the next phase
      setCurrentLevel((prev) => prev + 1);
      setGameState('playing');
    } else {
      setGameState('playing');
    }
  };

  const handleFullReset = () => {
    setScore(0);
    setCurrentLevel(1);
    setGameState('playing');
    startNewMoleculeWave(1, []);
  };

  // Safe display for progress text
  const currentTargetPhase = Math.min(completedTargetIds.length + 1, targetsRequiredPerLevel);

  return (
    <main className="relative w-full h-screen bg-linear-to-b from-slate-900 to-slate-950 overflow-hidden select-none flex flex-col p-6">
      
      <Header
        gameTitle="Formula Blaster"
        gameSubtitle="TARGET MOLECULE OBJECTIVE"
        targetName={currentTarget?.name}
        // 🛡️ THE FIX: Restored UI visibility so you know exactly how many hits you need
        progressText={`Target ${currentTargetPhase}/3 • Hits: ${correctInRound}/${targetQuota}`}
        currentLevel={currentLevel}
        score={score}
        gameState={gameState}
        onTogglePause={togglePause}
        
        showTimer={true}
        timeLeft={timeLeft}
        showLives={false}
      />

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
    </main>
  );
}