'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from "next/link";
import { Heart, Home, RefreshCw, Beaker, Flame, Droplet, Atom, Pause, Play } from "lucide-react";
import { Chemical, ChemicalClassification } from '../../../core-engine/types/chemistry';
import { evaluateChemical } from '../../../lib/chemical-utils';
import { chemicalsDB } from '../../../core-engine/db';

const BASE_TIME_SECONDS = 60; 
const MAX_MISTAKES = 3;
const MAX_LEVEL = 5;

export default function ClassificationGame() {
  // --- USER'S GAME ENGINE STATE ---
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const [mistakes, setMistakes] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(BASE_TIME_SECONDS);
  const [gameState, setGameState] = useState<'playing' | 'paused' | 'failed' | 'victory'>('playing');
  const [poolIndex, setPoolIndex] = useState<number>(0);

  // --- UI ANIMATION STATE ---
  const [feedback, setFeedback] = useState<{ status: 'correct' | 'wrong' | null; selected: string | null }>({
    status: null,
    selected: null,
  });

  // Database filtering logic
  const currentLevelChemicals = useMemo(() => {
    if (!chemicalsDB) return [];
    return chemicalsDB.filter(chem => chem.difficulty === currentLevel);
  }, [currentLevel]);

  const currentChemical = currentLevelChemicals[poolIndex];

  // Timer Effect
  useEffect(() => {
    if (gameState !== 'playing') return;
    if (timeLeft <= 0) {
      setGameState('failed');
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, gameState]);

  // Format seconds into MM:SS for clean UI
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Safe formula renderer (Adapted to fit mobile UI scaling)
  const renderFormula = (formula: string) => {
    return formula.split(/(\d+)/).map((part, index) => {
      if (!isNaN(Number(part)) && part !== "") {
        return <sub key={index} className="text-3xl md:text-5xl">{part}</sub>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  // Merged Selection Logic with Visual Delays
  const handleSelection = (selectedType: ChemicalClassification) => {
    if (gameState !== 'playing' || !currentChemical || feedback.status !== null) return;

    const expectedType = evaluateChemical(currentChemical);
    const isCorrect = selectedType === expectedType;

    // 1. Trigger Visual Feedback Immediately
    if (isCorrect) {
      setScore((prev) => prev + (100 * currentLevel));
      setFeedback({ status: 'correct', selected: selectedType });
    } else {
      const newMistakes = mistakes + 1;
      setMistakes(newMistakes);
      setFeedback({ status: 'wrong', selected: selectedType });
      
      if (newMistakes >= MAX_MISTAKES) {
        setTimeout(() => setGameState('failed'), 800); // Wait for the red flash, then end game
        return;
      }
    }

    // 2. Delay the logic progression so the user can see the animation
    setTimeout(() => {
      setFeedback({ status: null, selected: null });
      
      // Advance logic after feedback
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
    setMistakes(0);
    setTimeLeft(BASE_TIME_SECONDS);
    setPoolIndex(0);
    setGameState('playing');
    setFeedback({ status: null, selected: null });
  };

  if (!chemicalsDB || chemicalsDB.length === 0) {
    return <div className="min-h-screen flex items-center justify-center text-red-500 font-bold">Error: Chemical DB not found.</div>;
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-800 dark:text-zinc-100 flex flex-col items-center justify-between p-4 md:p-6 select-none relative overflow-hidden">
      
      {/* TOP HEADER PANEL */}
      <div className="w-full max-w-5xl bg-white dark:bg-zinc-900 border-2 border-slate-200/80 dark:border-zinc-800 shadow-sm rounded-2xl p-4 flex flex-wrap gap-4 items-center justify-between text-sm md:text-base font-bold tracking-wide z-10">
        <div className="flex items-center gap-4 md:gap-6">
          <span className="text-slate-400">LEVEL <span className="text-slate-800 dark:text-white font-black">{currentLevel.toString().padStart(2, "0")}</span></span>
          <span className="text-slate-400">SCORE: <span className="font-black text-emerald-500">{score.toString().padStart(4, "0")}</span></span>
          
          <button onClick={togglePause} className="ml-2 p-2 bg-slate-100 dark:bg-zinc-800 rounded-lg hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors">
            {gameState === 'paused' ? <Play className="w-5 h-5 text-blue-500" /> : <Pause className="w-5 h-5 text-slate-500" />}
          </button>
        </div>

        <div className="text-center">
          <div className="text-xs uppercase tracking-widest text-slate-400 font-medium mb-0.5">Game ends at {MAX_MISTAKES} mistakes</div>
          <div className={`text-3xl md:text-4xl font-black font-mono transition-colors ${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-slate-700 dark:text-zinc-200'}`}>
            TIMER: {formatTime(timeLeft)}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs uppercase text-slate-400 font-medium mr-2">Mistakes: {mistakes}/{MAX_MISTAKES}</span>
          {[...Array(MAX_MISTAKES)].map((_, i) => (
            <Heart 
              key={i} 
              className={`w-6 h-6 transition-all duration-300 ${i < mistakes ? "text-slate-200 dark:text-zinc-800 fill-transparent scale-90" : "text-red-500 fill-red-500 scale-100"}`} 
            />
          ))}
        </div>
      </div>

      {/* CENTRAL DISPLAY PORT & OVERLAYS */}
      <div className="flex-1 w-full flex flex-col items-center justify-center my-6 relative max-w-3xl z-0">
        
        {/* Game State Overlays */}
        {gameState !== 'playing' && (
          <div className="absolute inset-0 bg-slate-50/80 dark:bg-zinc-950/80 backdrop-blur-md flex flex-col items-center justify-center z-50 rounded-3xl border-2 border-slate-200 dark:border-zinc-800 shadow-xl p-8 text-center">
            {gameState === 'paused' && <h2 className="text-4xl md:text-5xl font-black text-blue-500 mb-4">PROTOCOL PAUSED</h2>}
            {gameState === 'failed' && <h2 className="text-4xl md:text-5xl font-black text-red-500 mb-4">💥 LAB MELTDOWN</h2>}
            {gameState === 'victory' && <h2 className="text-4xl md:text-5xl font-black text-emerald-500 mb-4">🧪 RESEARCH COMPLETE!</h2>}
            
            {gameState !== 'paused' && (
              <>
                <p className="text-slate-500 mb-6 text-lg">{gameState === 'victory' ? "You successfully classified all chemicals." : "Too many structural errors detected."}</p>
                <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl font-bold text-xl mb-8 border-2 border-slate-100 dark:border-zinc-800">Final Score: {score}</div>
                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
                  <button onClick={resetGame} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all">
                    <RefreshCw className="w-5 h-5" /> Restart Protocol
                  </button>
                  <Link href="/" className="flex-1 border-2 border-slate-200 dark:border-zinc-700 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-zinc-800 active:scale-95 transition-all">
                    <Home className="w-5 h-5" /> Hub Menu
                  </Link>
                </div>
              </>
            )}
            
            {gameState === 'paused' && (
              <button onClick={togglePause} className="mt-4 px-8 py-3 bg-blue-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 active:scale-95 transition-all">
                <Play className="w-5 h-5" /> Resume
              </button>
            )}
          </div>
        )}

        {/* The Molecule Bubble */}
        <div className="relative flex flex-col items-center justify-center">
          <div className={`absolute w-64 h-64 md:w-80 md:h-80 rounded-full blur-2xl opacity-20 dark:opacity-30 transition-all duration-500 ${
            feedback.status === "correct" ? "bg-emerald-500 scale-110" : 
            feedback.status === "wrong" ? "bg-red-500 scale-110" : "bg-purple-500 animate-pulse"
          }`} />

          <div className={`w-56 h-56 md:w-72 md:h-72 rounded-full border-4 flex flex-col items-center justify-center shadow-2xl relative bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md transform transition-all duration-300 ${
            feedback.status === "correct" ? "border-emerald-500 scale-95" : 
            feedback.status === "wrong" ? "border-red-500 scale-95 shake-animation" : "border-purple-300 dark:border-purple-900 hover:scale-105"
          }`}>
            {currentChemical && (
              <>
                <h2 className="text-5xl md:text-7xl font-black tracking-tight font-serif text-slate-800 dark:text-white">
                  {renderFormula(currentChemical.formula)}
                </h2>
                <p className="text-xs md:text-sm text-slate-400 mt-2 font-medium opacity-80">{currentChemical.name}</p>
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

      {/* LOWER NAVIGATION PLATFORM (Dynamic Grid based on level) */}
      <div className={`w-full max-w-4xl grid gap-3 md:gap-6 mb-4 z-10 ${currentLevel >= 3 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-3'}`}>
        
        <button onClick={() => handleSelection("Acidic")} disabled={gameState !== "playing" || feedback.status !== null}
          className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all group ${feedback.selected === "Acidic" && feedback.status === "correct" ? "bg-emerald-50 border-emerald-500" : feedback.selected === "Acidic" && feedback.status === "wrong" ? "bg-red-50 border-red-500" : "bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 hover:border-red-400 hover:shadow-md active:scale-98"}`}>
          <div className="p-3 bg-red-50 dark:bg-red-950/40 rounded-xl text-red-500 mb-2 group-hover:scale-110 transition-transform">
            <Flame className="w-8 h-8 md:w-10 md:h-10" />
          </div>
          <span className="font-extrabold text-xs md:text-sm tracking-wider uppercase">Acidic</span>
        </button>

        <button onClick={() => handleSelection("Basic")} disabled={gameState !== "playing" || feedback.status !== null}
          className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all group ${feedback.selected === "Basic" && feedback.status === "correct" ? "bg-emerald-50 border-emerald-500" : feedback.selected === "Basic" && feedback.status === "wrong" ? "bg-red-50 border-red-500" : "bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 hover:border-blue-400 hover:shadow-md active:scale-98"}`}>
          <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl text-blue-500 mb-2 group-hover:scale-110 transition-transform">
            <Beaker className="w-8 h-8 md:w-10 md:h-10" />
          </div>
          <span className="font-extrabold text-xs md:text-sm tracking-wider uppercase">Basic</span>
        </button>

        <button onClick={() => handleSelection("Neutral")} disabled={gameState !== "playing" || feedback.status !== null}
          className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all group ${feedback.selected === "Neutral" && feedback.status === "correct" ? "bg-emerald-50 border-emerald-500" : feedback.selected === "Neutral" && feedback.status === "wrong" ? "bg-red-50 border-red-500" : "bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 hover:border-emerald-400 hover:shadow-md active:scale-98"}`}>
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl text-emerald-500 mb-2 group-hover:scale-110 transition-transform">
            <Droplet className="w-8 h-8 md:w-10 md:h-10" />
          </div>
          <span className="font-extrabold text-xs md:text-sm tracking-wider uppercase">Neutral</span>
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