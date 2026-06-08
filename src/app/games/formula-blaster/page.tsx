// src/app/games/formula-blaster/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import GameOverlay from '../../../components/games/GameOverlay';
import BlasterBubble from '../../../components/games/BlasterBubble';
import ErrorBanner from '../../../components/games/ErrorBanner';
import { GameState } from '../../../core-engine/types/general';

interface BubbleData {
  id: string;
  formula: string;
  chemicalName: string;
  hint: string;
  xPos: number; // percentage 0-100
  speed: number; // duration in seconds
  isCorrect: boolean;
}

// Mock compound database entry matching schema requirements
const COMPOUND_DB = [
  { name: 'Water', formula: 'H2O', hint: 'An oxide of hydrogen that is essential for life.' },
  { name: 'Carbon Dioxide', formula: 'CO2', hint: 'Product of respiration, contains two oxygen atoms.' },
  { name: 'Table Salt', formula: 'NaCl', hint: 'An ionic compound composed of sodium and chlorine.' },
  { name: 'Methane', formula: 'CH4', hint: 'The simplest alkane, main component of natural gas.' },
];

export default function FormulaBlasterPage() {
  const [gameState, setGameState] = useState<GameState>('playing');
  const [score, setScore] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [correctInRound, setCorrectInRound] = useState(0);
  const [targetQuota, setTargetQuota] = useState(3);
  
  // Game states specific to active target wave
  const [currentTarget, setCurrentTarget] = useState(COMPOUND_DB[0]);
  const [bubbles, setBubbles] = useState<BubbleData[]>([]);
  const [activeHint, setActiveHint] = useState<string | null>(null);

  const maxLevel = 5;
  const canvasRef = useRef<HTMLDivElement>(null);
  const spawnIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Initialize or Transition Waves (AC 3.1, AC 3.2)
  const startNewWave = () => {
    const randomTarget = COMPOUND_DB[Math.floor(Math.random() * COMPOUND_DB.length)];
    const randomQuota = Math.floor(Math.random() * 3) + 3; // Random quota 3 to 5 (AC 3.2)
    
    setCurrentTarget(randomTarget);
    setTargetQuota(randomQuota);
    setCorrectInRound(0);
    setBubbles([]);
    setActiveHint(null);
  };

  useEffect(() => {
    startNewWave();
  }, [currentLevel]);

  // 2. Continuous Wave Generator Engine (AC 2.1, AC 2.3)
  useEffect(() => {
    if (gameState !== 'playing') {
      if (spawnIntervalRef.current) clearInterval(spawnIntervalRef.current);
      return;
    }

    spawnIntervalRef.current = setInterval(() => {
      // Determine if this bubble should carry the correct formula target (AC 2.3)
      const shouldBeCorrect = Math.random() > 0.6 || bubbles.filter(b => b.isCorrect).length === 0;
      const compoundSource = shouldBeCorrect 
        ? currentTarget 
        : COMPOUND_DB.filter(c => c.name !== currentTarget.name)[Math.floor(Math.random() * (COMPOUND_DB.length - 1))];

      const newBubble: BubbleData = {
        id: crypto.randomUUID(),
        formula: compoundSource.formula,
        chemicalName: compoundSource.name,
        hint: compoundSource.hint,
        xPos: Math.random() * 85 + 5, // Keep within canvas padding boundaries (AC 2.2)
        speed: Math.random() * 3 + 4, // 4-7 seconds float time
        isCorrect: compoundSource.name === currentTarget.name,
      };

      setBubbles((prev) => [...prev, newBubble]);
    }, 1200);

    return () => {
      if (spawnIntervalRef.current) clearInterval(spawnIntervalRef.current);
    };
  }, [gameState, currentTarget, bubbles]);

  // 3. Handle Bubble Interactivity (AC 3.3, AC 4.1)
  const handleBubbleClick = (id: string, isCorrect: boolean, hint: string) => {
    if (gameState !== 'playing') return;

    if (isCorrect) {
      // Successful Target Match
      setScore((prev) => prev + 100);
      setCorrectInRound((prev) => {
        const nextCorrect = prev + 1;
        // Check if round target quota met (AC 3.4)
        if (nextCorrect >= targetQuota) {
          if (currentLevel >= maxLevel) {
            setGameState('victory');
          } else {
            setGameState('levelUp');
          }
        }
        return nextCorrect;
      });
      // Pop bubble & Clear active errors
      setBubbles((prev) => prev.filter((b) => b.id !== id));
      setActiveHint(null);
    } else {
      // Incorrect interaction -> Read error logic property (AC 4.2, AC 4.3)
      setActiveHint(hint);
    }
  };

  // 4. Memory Optimization: Sweep nodes passing top edge boundary (AC 2.4)
  const handleAnimationEnd = (id: string) => {
    setBubbles((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <main className="relative w-full h-screen bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden select-none flex flex-col p-6">
      
      {/* HUD LAYER (AC 1.1, AC 1.2, AC 1.3) */}
      <header className="w-full bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-2xl z-40">
        <div>
          <span className="text-xs uppercase tracking-widest text-blue-400 font-bold block mb-0.5">Active Objective</span>
          <h1 className="text-xl md:text-2xl font-black text-white tracking-wide">
            Find: <span className="text-yellow-400 underline decoration-2">{currentTarget.name}</span>
          </h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-center bg-slate-950/50 px-4 py-2 rounded-xl border border-slate-800/60">
            <span className="text-[10px] uppercase text-slate-400 font-bold block">Progress</span>
            <span className="text-sm font-black text-emerald-400">{correctInRound} / {targetQuota}</span>
          </div>
          <div className="text-center bg-slate-950/50 px-4 py-2 rounded-xl border border-slate-800/60">
            <span className="text-[10px] uppercase text-slate-400 font-bold block">Score</span>
            <span className="text-sm font-black text-blue-400">{score}</span>
          </div>
          <button 
            onClick={() => setGameState('paused')}
            className="p-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-all active:scale-95 border border-slate-700"
          >
            <Pause className="w-5 h-5 fill-current" />
          </button>
        </div>
      </header>

      {/* FLOAT CANVAS FIELD AREA (AC 2.1) */}
      <div ref={canvasRef} className="flex-1 relative w-full h-full mt-4 rounded-2xl bg-slate-950/30 border border-slate-900/50 overflow-hidden">
        
        {/* Interactive Error Feedback Toast Banner (AC 4.3, AC 4.4) */}
        <ErrorBanner hint={activeHint} onTimeout={() => setActiveHint(null)} />

        {/* Dynamic Bubble Streams */}
        {gameState === 'playing' && bubbles.map((bubble) => (
          <BlasterBubble
            key={bubble.id}
            id={bubble.id}
            formula={bubble.formula}
            xPos={bubble.xPos}
            speed={bubble.speed}
            isCorrect={bubble.isCorrect}
            hint={bubble.hint}
            onClick={handleBubbleClick}
            onExpired={handleAnimationEnd}
          />
        ))}
      </div>

      {/* GLOBAL CENTRALIZED OVERLAY CONTROL */}
      <GameOverlay
        gameState={gameState}
        score={score}
        correctInRound={correctInRound}
        currentLevel={currentLevel}
        maxLevel={maxLevel}
        failReason="timeout"
        onResume={() => setGameState('playing')}
        onRestart={() => {
          setScore(0);
          setCurrentLevel(1);
          setGameState('playing');
          startNewWave();
        }}
      />
    </main>
  );
}