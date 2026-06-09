'use client';

import { useState, useEffect, useRef } from 'react';
import { Beaker, Flame, Droplet, Atom } from "lucide-react";

// Shared Components
import Header from '../../../components/games/GamesHeader';
import GameOverlay, { FailReason } from '../../../components/games/GameOverlay';

// Core Engine
import { Chemical, ChemicalClassification } from '../../../core-engine/types/chemistry';
import { GameState } from '../../../core-engine/types/general';
import { evaluateChemical } from '../../../lib/chemical-utils';
import { chemicalsDB } from '../../../core-engine/db';

const MAX_MISTAKES = 3;
const MAX_LEVEL = 5;

export default function ClassificationGame() {
  // --- USER'S GAME ENGINE STATE ---
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const [mistakes, setMistakes] = useState<number>(0);
  const [gameState, setGameState] = useState<GameState>('playing');
  const [poolIndex, setPoolIndex] = useState<number>(0);
  const [correctInRound, setCorrectInRound] = useState<number>(0);
  const [failReason, setFailReason] = useState<FailReason>(null);
  const [showChemicalName, setShowChemicalName] = useState<boolean>(false);
  
  const poolIndexRef = useRef(poolIndex);
  useEffect(() => { poolIndexRef.current = poolIndex; }, [poolIndex]);

  // --- UI ANIMATION STATE ---
  const [feedback, setFeedback] = useState<{ status: 'correct' | 'wrong' | null; selected: string | null }>({
    status: null,
    selected: null,
  });

  const [currentLevelChemicals, setCurrentLevelChemicals] = useState<Chemical[]>([]);

  // 🧪 Dynamic Quota Hook: Calculate passing bar safely based on active pool size
  const targetQuota = Math.max(3, currentLevelChemicals.length - 2);

  useEffect(() => {
    if (!chemicalsDB) return;
    const filtered = chemicalsDB.filter(chem => chem.difficulty === currentLevel);
    setCurrentLevelChemicals([...filtered].sort(() => Math.random() - 0.5));
  }, [currentLevel]);

  const currentChemical = currentLevelChemicals[poolIndex];

  // Synchronized Formula Rendering logic
  const renderFormula = (formula: string) => {
    return formula.split(/(\d+)/).map((part, index) => {
      if (/\d+/.test(part)) {
        return (
          <sub key={index} className="bottom-[-0.1em] text-[0.65em] leading-none font-bold opacity-90">
            {part}
          </sub>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  const handleSelection = (selectedType: ChemicalClassification) => {
    if (gameState !== 'playing' || !currentChemical || feedback.status !== null) return;

    const expectedType = evaluateChemical(currentChemical);
    const isCorrect = selectedType === expectedType;

    if (isCorrect) {
      setFeedback({ status: 'correct', selected: selectedType });
      
      // Wait for animation to finish before updating score and advancing
      setTimeout(() => {
        setScore((prev) => prev + (100 * currentLevel));
        const newCorrect = correctInRound + 1;
        setCorrectInRound(newCorrect);
        setFeedback({ status: null, selected: null });

        // Quota-Based Progression Check
        if (newCorrect >= targetQuota) {
          if (currentLevel >= MAX_LEVEL) {
            setGameState('victory');
          } else {
            setGameState('levelUp');
          }
        } else {
          setPoolIndex((prev) => prev + 1);
        }
      }, 1200);

    } else {
      const newMistakes = mistakes + 1;
      setMistakes(newMistakes);
      setFeedback({ status: 'wrong', selected: selectedType });
      
      if (newMistakes >= MAX_MISTAKES) {
        setTimeout(() => {
          setFailReason('mistakes');
          setGameState('failed');
        }, 800);
      } else {
        setTimeout(() => setFeedback({ status: null, selected: null }), 1200);
      }
    }
  };

  const togglePause = () => {
    if (gameState === 'failed' || gameState === 'victory' || gameState === 'levelUp') return;
    setGameState((prev) => (prev === 'playing' ? 'paused' : 'playing'));
  };

  const handleOverlayAdvance = () => {
    if (gameState === 'levelUp') {
      setCurrentLevel((prev) => prev + 1);
      setPoolIndex(0);
      setCorrectInRound(0);
      setFailReason(null);
      setGameState('playing');
    } else {
      togglePause();
    }
  };

  const resetGame = () => {
    setCurrentLevel(1);
    setScore(0);
    setMistakes(0);
    setPoolIndex(0);
    setCorrectInRound(0);
    setFailReason(null);
    setGameState('playing');
    setFeedback({ status: null, selected: null });
  };

  if (!chemicalsDB || chemicalsDB.length === 0) {
    return <div className="min-h-screen flex items-center justify-center text-red-500 font-bold">Error: Chemical DB not found.</div>;
  }

  // Calculate remaining lives for the Header
  const currentLives = MAX_MISTAKES - mistakes;

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-800 dark:text-zinc-100 flex flex-col items-center justify-between p-4 md:p-6 select-none relative overflow-hidden">
      
      {/* 🛡️ THE NEW UNIFIED HEADER COMPONENT */}
      <div className="w-full max-w-5xl z-10">
        <Header
          gameTitle="Chemical Classifier"
          gameSubtitle="CLASSIFY MOLECULE"
          targetName={currentChemical?.name || "Loading..."}
          progressText={`${correctInRound} / ${targetQuota} Sorted`}
          currentLevel={currentLevel}
          score={score}
          gameState={gameState}
          onTogglePause={togglePause}
          
          showTimer={false} // Timer disabled!
          showLives={true}  // Lives enabled!
          lives={currentLives}
          maxLives={MAX_MISTAKES}
        />
      </div>

      {/* CENTRAL DISPLAY PORT & OVERLAYS */}
      <div className="flex-1 w-full flex flex-col items-center justify-center my-6 relative max-w-3xl z-0">
        
        <GameOverlay
          gameState={gameState}
          score={score}
          correctInRound={correctInRound}
          currentLevel={currentLevel}
          maxLevel={MAX_LEVEL}
          failReason={failReason}
          onResume={handleOverlayAdvance} 
          onRestart={resetGame}
        />

        <div className="relative flex flex-col items-center justify-center">
          <div className={`absolute w-64 h-64 md:w-80 md:h-80 rounded-full blur-2xl opacity-20 dark:opacity-30 transition-all duration-500 ${
            feedback.status === "correct" ? "bg-emerald-500 scale-110" : 
            feedback.status === "wrong" ? "bg-red-500 scale-110" : "bg-purple-500 glow-pulse"
          }`} />

          <div className={`w-56 h-56 md:w-72 md:h-72 rounded-full border-4 flex flex-col items-center justify-center shadow-2xl relative bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md transform transition-all duration-300 ${
            feedback.status === "correct" ? "border-emerald-500 scale-95" : 
            feedback.status === "wrong" ? "border-red-500 scale-95 shake-animation" : "border-purple-300 dark:border-purple-900 hover:scale-105"
          }`}>
            {currentChemical && (
              <>
                <h2 className="text-5xl md:text-7xl font-black tracking-tight font-serif text-slate-800 dark:text-white flex items-baseline">
                  {renderFormula(currentChemical.formula)}
                </h2>
                {showChemicalName && (
                  <p className="text-xs md:text-sm text-slate-400 mt-2 font-medium opacity-80">{currentChemical.name}</p>
                )}
              </>
            )}
            
            {feedback.status && (
              <div className={`absolute top-4 font-bold text-sm uppercase px-3 py-1 rounded-full ${feedback.status === "correct" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
                {feedback.status}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* LOWER NAVIGATION PLATFORM */}
      <div className={`w-full max-w-4xl grid gap-3 md:gap-6 mb-4 z-10 ${currentLevel >= 3 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-3'}`}>
        <button onClick={() => handleSelection("Acidic")} disabled={gameState !== "playing" || feedback.status !== null}
          className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all group ${feedback.selected === "Acidic" && feedback.status === "correct" ? "bg-emerald-50 border-emerald-500" : feedback.selected === "Acidic" && feedback.status === "wrong" ? "bg-red-50 border-red-500" : "bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 hover:border-red-400 hover:shadow-md active:scale-98"}`}>
          <div className="p-3 bg-red-50 dark:bg-red-950/40 rounded-xl text-red-500 mb-2 group-hover:scale-110 transition-transform">
            <Flame className="w-8 h-8 md:w-10 md:h-10" />
          </div>
          <span className="font-extrabold text-xs md:text-sm tracking-wider uppercase">Acidic</span>
        </button>

        <button onClick={() => handleSelection("Neutral")} disabled={gameState !== "playing" || feedback.status !== null}
          className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all group ${feedback.selected === "Neutral" && feedback.status === "correct" ? "bg-emerald-50 border-emerald-500" : feedback.selected === "Neutral" && feedback.status === "wrong" ? "bg-red-50 border-red-500" : "bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 hover:border-emerald-400 hover:shadow-md active:scale-98"}`}>
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl text-emerald-500 mb-2 group-hover:scale-110 transition-transform">
            <Droplet className="w-8 h-8 md:w-10 md:h-10" />
          </div>
          <span className="font-extrabold text-xs md:text-sm tracking-wider uppercase">Neutral</span>
        </button>

        <button onClick={() => handleSelection("Basic")} disabled={gameState !== "playing" || feedback.status !== null}
          className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all group ${feedback.selected === "Basic" && feedback.status === "correct" ? "bg-emerald-50 border-emerald-500" : feedback.selected === "Basic" && feedback.status === "wrong" ? "bg-red-50 border-red-500" : "bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 hover:border-blue-400 hover:shadow-md active:scale-98"}`}>
          <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl text-blue-500 mb-2 group-hover:scale-110 transition-transform">
            <Beaker className="w-8 h-8 md:w-10 md:h-10" />
          </div>
          <span className="font-extrabold text-xs md:text-sm tracking-wider uppercase">Basic</span>
        </button>

        {currentLevel >= 3 && (
          <button onClick={() => handleSelection("Amphoteric")} disabled={gameState !== "playing" || feedback.status !== null}
            className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all group ${feedback.selected === "Amphoteric" && feedback.status === "correct" ? "bg-emerald-50 border-emerald-500" : feedback.selected === "Amphoteric" && feedback.status === "wrong" ? "bg-red-50 border-red-500" : "bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 hover:border-purple-400 hover:shadow-md active:scale-98"}`}>
            <div className="p-3 bg-purple-50 dark:bg-purple-950/40 rounded-xl text-purple-500 mb-2 group-hover:scale-110 transition-transform">
              <Atom className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <span className="font-extrabold text-xs md:text-sm tracking-wider uppercase">Amphoteric</span>
          </button>
        )}
      </div>
    </main>
  );
}