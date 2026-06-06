'use client';

import { useState, useEffect, useMemo } from 'react';
import { Chemical, ChemicalClassification } from '../../core-engine/types/chemistry';
import { evaluateChemical } from '../../lib/chemical-utils';
import { chemicalsDB } from '../../core-engine/db';

// Import components
import MoleculeBubble from '../../components/games/MoleculeBubble';
import GameStats from '../../components/games/GameStats';
import GameTimer from '../../components/games/GameTimer';
import GameLives from '../../components/games/GameLives';
import Vessel from '../../components/games/Vessel';
import GameOverlay from '../../components/games/GameOverlay';

const BASE_TIME_SECONDS = 60; 
const MAX_LIVES = 3; // Changed from MAX_MISTAKES
const MAX_LEVEL = 5;

export default function ClassificationGame() {
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const [lives, setLives] = useState<number>(MAX_LIVES); // Starting at 3, counting down
  const [timeLeft, setTimeLeft] = useState<number>(BASE_TIME_SECONDS);
  const [gameState, setGameState] = useState<'playing' | 'paused' | 'failed' | 'victory'>('playing');
  const [poolIndex, setPoolIndex] = useState<number>(0);

  // Feature toggle for settings menu later
  const [showChemicalName, setShowChemicalName] = useState<boolean>(false);

  const [feedback, setFeedback] = useState<{ status: 'correct' | 'wrong' | null; selected: string | null }>({
    status: null,
    selected: null,
  });


  //--- GAME LOGIC ---
  const currentLevelChemicals = useMemo(() => {
    if (!chemicalsDB) return [];
    return chemicalsDB.filter(chem => chem.difficulty === currentLevel);
  }, [currentLevel]);

  const currentChemical = currentLevelChemicals[poolIndex];

  useEffect(() => {
    if (gameState !== 'playing') return;
    if (timeLeft <= 0) {
      setGameState('failed');
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, gameState]);

  const renderFormula = (formula: string) => {
    return formula.split(/(\d+)/).map((part, index) => {
      if (!isNaN(Number(part)) && part !== "") {
        return <sub key={index} className="text-3xl md:text-5xl">{part}</sub>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  const handleSelection = (selectedType: ChemicalClassification) => {
    if (gameState !== 'playing' || !currentChemical || feedback.status !== null) return;

    const expectedType = evaluateChemical(currentChemical);
    const isCorrect = selectedType === expectedType;

    if (isCorrect) {
      setScore((prev) => prev + (100 * currentLevel));
      setFeedback({ status: 'correct', selected: selectedType });
    } else {
      const newLives = lives - 1; // Decrement lives
      setLives(newLives);
      setFeedback({ status: 'wrong', selected: selectedType });
      
      if (newLives <= 0) {
        setTimeout(() => setGameState('failed'), 800);
        return;
      }
    }

    setTimeout(() => {
      setFeedback({ status: null, selected: null });
      if (isCorrect) {
        if (poolIndex + 1 >= currentLevelChemicals.length) {
          if (currentLevel >= MAX_LEVEL) {
            setGameState('victory');
          } else {
            setCurrentLevel((prev) => prev + 1);
            setPoolIndex(0);
            setTimeLeft(BASE_TIME_SECONDS - (currentLevel * 5)); 
          }
        } else {
          setPoolIndex((prev) => prev + 1);
        }
      }
    }, 1200);
  };

  const togglePause = () => {
    if (gameState === 'failed' || gameState === 'victory') return;
    setGameState((prev) => (prev === 'playing' ? 'paused' : 'playing'));
  };

  const resetGame = () => {
    setCurrentLevel(1);
    setScore(0);
    setLives(MAX_LIVES);
    setTimeLeft(BASE_TIME_SECONDS);
    setPoolIndex(0);
    setGameState('playing');
    setFeedback({ status: null, selected: null });
  };

  if (!chemicalsDB || chemicalsDB.length === 0) {
    return <div className="min-h-screen flex items-center justify-center text-red-500 font-bold">Error: Chemical DB not found.</div>;
  }

  // Helper to determine status for a specific vessel
  const getVesselStatus = (type: string) => {
    if (feedback.selected === type) return feedback.status as 'correct' | 'wrong';
    return 'idle';
  };


  // --- RENDER UI ---
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-800 dark:text-zinc-100 flex flex-col items-center justify-between p-4 md:p-6 select-none relative overflow-hidden">
      
      {/* 1. TOP DASHBOARD BAR */}
      <div className="w-full max-w-5xl bg-white dark:bg-zinc-900 border-2 border-slate-200/80 dark:border-zinc-800 shadow-sm rounded-2xl p-4 flex flex-wrap gap-4 items-center justify-between z-10">
        <GameStats level={currentLevel} score={score} isPaused={gameState === 'paused'} onTogglePause={togglePause} />
        <GameTimer timeLeft={timeLeft} />
        <GameLives lives={lives} maxLives={MAX_LIVES} />
      </div>

      {/* 2. CENTRAL DISPLAY PORT & OVERLAYS*/}
      <div className="flex-1 w-full flex flex-col items-center justify-center my-6 relative max-w-3xl z-0">
      {/* Game Overlay */}
      <GameOverlay 
        gameState={gameState} 
        score={score} 
        onResume={togglePause} 
        onRestart={resetGame} 
      />

      {/* Handles the active chemical formula graphics */}
        <MoleculeBubble 
          formula={currentChemical?.formula}
          name={currentChemical?.name}
          feedbackStatus={feedback.status}
          showName={showChemicalName}
        />
      </div>

      {/* 3. COMPONENT-DRIVEN LOWER NAVIGATION */}
      <div className={`w-full max-w-4xl grid gap-3 md:gap-6 mb-4 z-10 ${currentLevel >= 3 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-3'}`}>
        
        <Vessel 
          type="flask" 
          label="Acidic" 
          colorClass="text-red-500" 
          bgHoverClass="hover:border-red-400 group-hover:bg-red-50/50"
          status={getVesselStatus("Acidic")}
          disabled={gameState !== "playing" || feedback.status !== null}
          onClick={() => handleSelection("Acidic")} 
        />

        <Vessel 
          type="beaker" 
          label="Basic" 
          colorClass="text-blue-500" 
          bgHoverClass="hover:border-blue-400 group-hover:bg-blue-50/50"
          status={getVesselStatus("Basic")}
          disabled={gameState !== "playing" || feedback.status !== null}
          onClick={() => handleSelection("Basic")} 
        />

        <Vessel 
          type="droplet" 
          label="Neutral" 
          colorClass="text-emerald-500" 
          bgHoverClass="hover:border-emerald-400 group-hover:bg-emerald-50/50"
          status={getVesselStatus("Neutral")}
          disabled={gameState !== "playing" || feedback.status !== null}
          onClick={() => handleSelection("Neutral")} 
        />

        {currentLevel >= 3 && (
          <Vessel 
            type="atom" 
            label="Amphoteric" 
            colorClass="text-purple-500" 
            bgHoverClass="hover:border-purple-400 group-hover:bg-purple-50/50"
            status={getVesselStatus("Amphoteric")}
            disabled={gameState !== "playing" || feedback.status !== null}
            onClick={() => handleSelection("Amphoteric")} 
          />
        )}
      </div>

      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-8px) rotate(-1deg); }
          40%, 80% { transform: translateX(8px) rotate(1deg); }
        }
        .shake-animation {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
    </main>
  );
}
