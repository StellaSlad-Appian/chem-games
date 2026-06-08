// src/app/games/formula-blaster/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import GameOverlay from '../../../components/games/GameOverlay';
import BlasterBubble from '../../../components/games/BlasterBubble';
import ErrorBanner from '../../../components/games/ErrorBanner'; // Ensure this matches your folder layout
import { GameState } from '../../../core-engine/types/general';
import { Chemical } from '../../../core-engine/types/chemistry';
import { chemicalsDB } from '../../../core-engine/db';

import GameStats from '../../../components/games/GameStats'; 
import GameTimer from '../../../components/games/GameTimer';

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

// AC 4.2: This hint generates dynamically for whatever chemical is clicked
const generateChemicalHint = (chem: Chemical): string => {
  return `${chem.name} (${formatFormulaToSubscript(chem.formula)}) consists of ${chem.ions.join(' & ')} ions. Molar Mass: ${chem.molarMass} g/mol.`;
};

export default function FormulaBlasterPage() {
  const [gameState, setGameState] = useState<GameState>('playing');
  const [score, setScore] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  
  // Quota progress for the CURRENT molecule target
  const [correctInRound, setCorrectInRound] = useState(0);
  const [targetQuota, setTargetQuota] = useState(3); 

  // 🎯 New Progression Trackers: 3 different molecules needed per level
  const [completedTargetIds, setCompletedTargetIds] = useState<string[]>([]);
  const targetsRequiredPerLevel = 3;
  
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

  // Countdown Clock Loop
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

  // AC 3.1 & AC 3.2: Pulls a random molecule, ensuring it hasn't been completed in this level yet
  const startNewMoleculeWave = (level: number, currentCompleted: string[]) => {
    if (!chemicalsDB || chemicalsDB.length === 0) return;
    
    // Filter by difficulty level
    let levelPool = chemicalsDB.filter(chem => chem.difficulty === level);
    
    // Try to exclude molecules already finished in this round so they get a fresh one
    const uncompletedPool = levelPool.filter(chem => !currentCompleted.includes(chem.id));
    if (uncompletedPool.length > 0) {
      levelPool = uncompletedPool;
    }

    if (levelPool.length === 0) return;

    const randomTarget = levelPool[Math.floor(Math.random() * levelPool.length)];
    
    setTargetQuota(Math.floor(Math.random() * 3) + 3); // Randomizes quota between 3 and 5 [cite: 14]
    setCurrentTarget(randomTarget);
    setCorrectInRound(0);
    setBubbles([]);
    setActiveHint(null);
    setTimeLeft(45); // Give fresh time for the new molecule round
  };

  // Run once when level mounts/changes
  useEffect(() => {
    startNewMoleculeWave(currentLevel, []);
    setCompletedTargetIds([]);
  }, [currentLevel]);

  // Bubble Spawning Wave Loop (AC 2.1 - AC 2.3)
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

  // Interactive Bubble Click Manager
  const handleBubbleClick = (id: string, isCorrect: boolean, hint: string) => {
    if (gameState !== 'playing') return;

    if (isCorrect) {
      setScore((prev) => prev + (100 * currentLevel)); // Instantaneous score updates [cite: 5, 15]
      setActiveHint(null); // Clear hint box automatically [cite: 22]
      setBubbles((prev) => prev.filter((b) => b.id !== id));

      setCorrectInRound((prevCorrect) => {
        const nextCorrect = prevCorrect + 1;
        
        // Did they clear the quota for this specific molecule? [cite: 16]
        if (nextCorrect >= targetQuota) {
          const updatedCompleted = [...completedTargetIds, currentTarget!.id];
          setCompletedTargetIds(updatedCompleted);

          // Check if they have cleared 3 distinct molecules total for this level
          if (updatedCompleted.length >= targetsRequiredPerLevel) {
            if (currentLevel >= maxLevel) {
              setGameState('victory');
            } else {
              setGameState('levelUp');
            }
          } else {
            // Quota reached for this molecule, but need more! Clean transition to next molecule [cite: 16]
            if (spawnIntervalRef.current) clearInterval(spawnIntervalRef.current);
            startNewMoleculeWave(currentLevel, updatedCompleted);
          }
        }
        return nextCorrect;
      });
    } else {
      setActiveHint(hint); // AC 4.1 & AC 4.3: Displays the incorrect bubble's identity string [cite: 18, 21]
    }
  };

  const handleAnimationEnd = (id: string) => {
    setBubbles((prev) => prev.filter((b) => b.id !== id)); // Prevent memory leaks [cite: 11]
  };

  const togglePause = () => {
    if (gameState === 'failed' || gameState === 'victory' || gameState === 'levelUp') return;
    setGameState((prev) => (prev === 'playing' ? 'paused' : 'playing'));
  };

  const handleOverlayAdvance = () => {
    if (gameState === 'levelUp') {
      setCurrentLevel((prev) => prev + 1);
      setGameState('playing');
    } else {
      setGameState('playing');
    }
  };

  const handleFullReset = () => {
    setScore(0);
    setCurrentLevel(1);
    setCompletedTargetIds([]);
    setGameState('playing');
    startNewWave(1);
  };

  return (
    <main className="relative w-full h-screen bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden select-none flex flex-col p-6">
      
      {/* HUD HEADER PANEL (AC 1.1) */}
      <header className="w-full bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xl z-40">
        
        {/* AC 1.2 Display Format */}
        <div>
          <span className="text-xs uppercase tracking-widest text-blue-400 font-bold block mb-0.5">
            Molecules Cleared: {completedTargetIds.length} / {targetsRequiredPerLevel}
          </span>
          <h1 className="text-xl md:text-2xl font-black text-white tracking-wide">
            Find: <span className="text-yellow-400 underline decoration-2">{currentTarget?.name || 'Loading...'}</span>
          </h1>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6">
          {/* Objective Progress Counter for current molecule */}
          <div className="text-center bg-slate-950/50 px-4 py-1 rounded-xl border border-slate-800/60 h-11 flex flex-col justify-center">
            <span className="text-[9px] uppercase text-slate-400 font-bold block leading-none mb-0.5">Current Target</span>
            <span className="text-xs font-black text-emerald-400 leading-none">{correctInRound} / {targetQuota}</span>
          </div>

          <GameTimer timeLeft={timeLeft} />
          <GameStats level={currentLevel} score={score} isPaused={gameState === 'paused'} onTogglePause={togglePause} />
        </div>
      </header>

      {/* FLOAT CANVAS FIELD AREA */}
      <div className="flex-1 relative w-full h-full mt-4 rounded-2xl bg-slate-950/30 border border-slate-900/50 overflow-hidden">
        <ErrorBanner hint={activeHint} onTimeout={() => setActiveHint(null)} />

        {gameState === 'playing' && bubbles.map((bubble) => (
          <BlasterBubble
            key={bubble.id}
            id={bubble.id}
            formula={formatFormulaToSubscript(bubble.formula)} // AC 1.4 Formatting Subscripts
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
        correctInRound={correctInRound}
        currentLevel={currentLevel}
        maxLevel={maxLevel}
        failReason="timeout"
        onResume={handleOverlayAdvance} 
        onRestart={handleFullReset}
      />
    </main>
  );
}