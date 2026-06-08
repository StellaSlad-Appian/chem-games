// src/app/games/formula-blaster/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import GameOverlay from '../../../components/games/GameOverlay';
import BlasterBubble from '../../../components/games/BlasterBubble';
import ErrorBanner from '../../../components/games/ErrorBanner';
import { GameState } from '../../../core-engine/types/general';
import { Chemical } from '../../../core-engine/types/chemistry';
import { chemicalsDB } from '../../../core-engine/db';
// 🔄 Reusing only GameStats and GameTimer as requested
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

// 🔤 AC 1.4: Formats flat database text formulas to use authentic subscript typography characters
const formatFormulaToSubscript = (formula: string): string => {
  const subscripts: Record<string, string> = {
    '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄',
    '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉'
  };
  return formula.split('').map(char => subscripts[char] || char).join('');
};

// 🧠 AC 4.2: Fallback reader parsing provided chemistry fields into clean educational error strings
const generateChemicalHint = (chem: Chemical): string => {
  const hazards = chem.hazardClasses.filter(h => h !== 'None');
  const hazardText = hazards.length > 0 ? `Hazards: ${hazards.join(', ')}.` : 'Chemically stable compound.';
  return `Contains ions: ${chem.ions.join(' & ')} | Molar Mass: ${chem.molarMass} g/mol | ${hazardText}`;
};

export default function FormulaBlasterPage() {
  const [gameState, setGameState] = useState<GameState>('playing');
  const [score, setScore] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [correctInRound, setCorrectInRound] = useState(0);
  
  // ⏱️ Wave countdown clock configuration (Resets to 45 seconds each time a target switches)
  const [timeLeft, setTimeLeft] = useState(45);

  const [currentTarget, setCurrentTarget] = useState<Chemical | null>(null);
  const [bubbles, setBubbles] = useState<BubbleData[]>([]);
  const [activeHint, setActiveHint] = useState<string | null>(null);

  const maxLevel = 5;
  const spawnIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [targetQuota, setTargetQuota] = useState(3); 

  // Adjusts bubble speed coefficients based on active level tier
  const getRandomSpeedForLevel = (level: number): number => {
    const baseSpeed = Math.max(8.5 - level * 1.1, 3.2);
    const variance = Math.max(2.2 - level * 0.15, 1.2);
    return Math.random() * variance + baseSpeed;
  };

  // ⏰ Per-Wave Countdown Clock Loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const clockInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(clockInterval);
          setGameState('failed'); // Triggers failure overlay cleanly on timeout
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(clockInterval);
  }, [gameState]);

  // 🎯 AC 3.1 & AC 3.2: Initiating a fresh wave objective targeting system
  const startNewWave = (level: number) => {
    if (!chemicalsDB || chemicalsDB.length === 0) return;
    
    const levelPool = chemicalsDB.filter(chem => chem.difficulty === level);
    if (levelPool.length === 0) return;

    const randomTarget = levelPool[Math.floor(Math.random() * levelPool.length)];
    
    setTargetQuota(Math.floor(Math.random() * 3) + 3); // Randomizes quota cleanly between 3 and 5 [cite: 14]
    setCurrentTarget(randomTarget);
    setCorrectInRound(0);
    setBubbles([]);
    setActiveHint(null);
    setTimeLeft(45); // Fully tops up countdown budget for the new assignment loop
  };

  useEffect(() => {
    startNewWave(currentLevel);
  }, [currentLevel]);

  // 🚀 Continuous Wave Generator Loop (AC 2.1 - AC 2.3)
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
        hint: generateChemicalHint(sourceChemical), // Safe custom data bridge to comply with AC 4.2 [cite: 20]
        xPos: Math.random() * 80 + 10, // Avoids overlapping edge clippings [cite: 9]
        speed: getRandomSpeedForLevel(currentLevel),
        isCorrect: sourceChemical.id === currentTarget.id,
      };

      setBubbles((prev) => [...prev, newBubble]);
    }, Math.max(1500 - currentLevel * 120, 850));

    return () => {
      if (spawnIntervalRef.current) clearInterval(spawnIntervalRef.current);
    };
  }, [gameState, currentTarget, bubbles, currentLevel]);

  // 💥 Interactive Bubble Interaction Handling (AC 3.3, AC 3.4 & AC 4.1)
  const handleBubbleClick = (id: string, isCorrect: boolean, hint: string) => {
    if (gameState !== 'playing') return;

    if (isCorrect) {
      setScore((prev) => prev + (100 * currentLevel)); // AC 1.3 instantaneous updates [cite: 5]
      setCorrectInRound((prev) => {
        const nextCorrect = prev + 1;
        if (nextCorrect >= targetQuota) {
          if (currentLevel >= maxLevel) {
            setGameState('victory');
          } else {
            setGameState('levelUp');
          }
        }
        return nextCorrect;
      });
      setBubbles((prev) => prev.filter((b) => b.id !== id));
      setActiveHint(null); // AC 4.4: Immediately clear error banner upon hitting the objective [cite: 22]
    } else {
      setActiveHint(hint); // AC 4.1 & AC 4.3: Localized shake feedback alongside hint banner projections [cite: 18, 21]
    }
  };

  // 🗑️ AC 2.4 Escape Boundary Handling
  const handleAnimationEnd = (id: string) => {
    // Component unmount logic safely fires without any life point deduction tracking
    setBubbles((prev) => prev.filter((b) => b.id !== id)); 
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
    setGameState('playing');
    startNewWave(1);
  };

  return (
    <main className="relative w-full h-screen bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden select-none flex flex-col p-6">
      
      {/* 🛡️ HUD HEADER PANEL (AC 1.1 Fixed Layout Positioning) */}
      <header className="w-full bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xl z-40">
        
        {/* AC 1.2 Target Assignment String Format */}
        <div>
          <span className="text-xs uppercase tracking-widest text-blue-400 font-bold block mb-0.5">Active Target</span>
          <h1 className="text-xl md:text-2xl font-black text-white tracking-wide">
            Find: <span className="text-yellow-400 underline decoration-2">{currentTarget?.name || 'Loading...'}</span>
          </h1>
        </div>

        {/* Modular Layout Integration Framework */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          
          {/* Wave Progression Quota Counter Chip */}
          <div className="text-center bg-slate-950/50 px-4 py-1 rounded-xl border border-slate-800/60 h-11 flex flex-col justify-center">
            <span className="text-[9px] uppercase text-slate-400 font-bold block leading-none mb-0.5">Progress</span>
            <span className="text-xs font-black text-emerald-400 leading-none">{correctInRound} / {targetQuota}</span>
          </div>

          {/* ⏱️ Clean context routing for your custom resetting shared timer component */}
          <GameTimer timeLeft={timeLeft} />

          {/* 📊 Clean integration of your shared game loop metrics dashboard */}
          <GameStats 
            level={currentLevel}
            score={score}
            isPaused={gameState === 'paused'}
            onTogglePause={togglePause}
          />
        </div>
      </header>

      {/* FLOAT CANVAS FIELD AREA */}
      <div className="flex-1 relative w-full h-full mt-4 rounded-2xl bg-slate-950/30 border border-slate-900/50 overflow-hidden">
        <ErrorBanner hint={activeHint} onTimeout={() => setActiveHint(null)} />

        {gameState === 'playing' && bubbles.map((bubble) => (
          <BlasterBubble
            key={bubble.id}
            id={bubble.id}
            formula={formatFormulaToSubscript(bubble.formula)} // Safely maps clean string typographic formatting 
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
        failReason="timeout" // Game 2 failure triggers strictly due to running out of wave clock time budget
        onResume={handleOverlayAdvance} 
        onRestart={handleFullReset}
      />
    </main>
  );
}
