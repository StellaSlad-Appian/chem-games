'use client';

import { useState, useEffect, useMemo } from 'react';
import { Chemical, ChemicalClassification } from '../../core-engine/types/chemistry';
import { evaluateChemical } from '../../lib/chemical-utils';
import { chemicalsDB } from '../../core-engine/db';

const BASE_TIME_SECONDS = 60; 
const MAX_MISTAKES = 3;
const MAX_LEVEL = 5;

export default function ClassificationGame() {
  // Game State
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const [mistakes, setMistakes] = useState<number>(0);
  
  // Time and Execution State
  const [timeLeft, setTimeLeft] = useState<number>(BASE_TIME_SECONDS);
  const [gameState, setGameState] = useState<'playing' | 'paused' | 'failed' | 'victory'>('playing');

  // Filter chemicals by current level
  const currentLevelChemicals = useMemo(() => {
    return chemicalsDB.filter(chem => chem.difficulty === currentLevel);
  }, [currentLevel]);

  // Track the current chemical within the level's pool
  const [poolIndex, setPoolIndex] = useState<number>(0);

  // Robust Error Handling: Check if database has valid data
  if (!chemicalsDB || chemicalsDB.length === 0) {
    return <div className="p-8 text-center text-red-600 font-bold">Error: Chemical database failed to load.</div>;
  }

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

  const handleSelection = (selectedType: ChemicalClassification) => {
    if (gameState !== 'playing' || !currentChemical) return;

    const expectedType = evaluateChemical(currentChemical);

    if (selectedType === expectedType) {
      setScore((prev) => prev + (100 * currentLevel)); // Higher score for harder levels
      
      // Level progression logic
      if (poolIndex + 1 >= currentLevelChemicals.length) {
        if (currentLevel >= MAX_LEVEL) {
          setGameState('victory');
        } else {
          // Level up!
          setCurrentLevel((prev) => prev + 1);
          setPoolIndex(0);
          setTimeLeft(BASE_TIME_SECONDS - (currentLevel * 5)); // Gets slightly faster each level
        }
      } else {
        setPoolIndex((prev) => prev + 1);
      }
    } else {
      const newMistakes = mistakes + 1;
      setMistakes(newMistakes);
      if (newMistakes >= MAX_MISTAKES) {
        setGameState('failed');
      }
    }
  };

  const togglePause = () => {
    setGameState((prev) => (prev === 'playing' ? 'paused' : 'playing'));
  };

  // Safe formula renderer to avoid dangerouslySetInnerHTML
  const renderFormula = (formula: string) => {
    return formula.split(/(\d+)/).map((part, index) => {
      if (!isNaN(Number(part))) {
        return <sub key={index} className="text-4xl">{part}</sub>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-slate-50 border-4 border-slate-800 rounded-xl shadow-2xl overflow-hidden font-sans relative">
      
      {/* Top Bar Status */}
      <div className="bg-slate-200 border-b-2 border-slate-300 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-xl font-bold text-slate-700">LEVEL {currentLevel.toString().padStart(2, '0')}</div>
          <button 
            onClick={togglePause}
            disabled={gameState === 'failed' || gameState === 'victory'}
            className="px-4 py-1 bg-slate-400 text-white rounded hover:bg-slate-500 disabled:opacity-50"
          >
            {gameState === 'paused' ? 'RESUME' : 'PAUSE'}
          </button>
        </div>
        
        <div className="text-xl font-bold text-slate-700">SCORE: {score}</div>
        
        <div className={`text-3xl font-black tracking-tighter ${timeLeft < 10 ? 'text-red-600 animate-pulse' : 'text-slate-800'}`}>
          00:{timeLeft.toString().padStart(2, '0')}
        </div>
        
        <div className="flex flex-col items-end">
          <div className="flex gap-1 mb-1">
            {[...Array(MAX_MISTAKES)].map((_, i) => (
              <div key={i} className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${i < mistakes ? 'bg-red-500 border-red-600' : 'bg-slate-300 border-slate-400'}`}>
                <span className="text-white text-xs font-bold">X</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="relative h-[600px] flex flex-col items-center justify-between p-12 bg-slate-50">
        
        {/* Overlays */}
        {gameState !== 'playing' && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center z-50">
            {gameState === 'paused' && <h2 className="text-5xl font-black text-slate-800">PROTOCOL PAUSED</h2>}
            {gameState === 'failed' && <h2 className="text-5xl font-black text-red-600">EXPERIMENT FAILED</h2>}
            {gameState === 'victory' && <h2 className="text-5xl font-black text-green-600">RESEARCH COMPLETE!</h2>}
            
            {gameState !== 'paused' && (
              <>
                <p className="text-2xl text-slate-600 mt-4 mb-8">Final Score: {score}</p>
                <button onClick={() => window.location.reload()} className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700">
                  Restart Protocol
                </button>
              </>
            )}
          </div>
        )}

        {/* The Target Bubble */}
        <div className="relative flex-1 flex items-center justify-center w-full">
          {currentChemical && (
            <div className="w-80 h-80 rounded-full border-4 border-purple-300 bg-purple-50 flex items-center justify-center shadow-lg transition-all duration-300">
              <div className="text-7xl font-black text-slate-800 font-serif tracking-tight">
                 {renderFormula(currentChemical.formula)}
              </div>
            </div>
          )}
        </div>

        {/* Reagent Station */}
        <div className="w-full flex justify-center gap-8 items-end mt-12">
          <ReagentButton type="Acidic" colorClass="bg-red-500" onClick={() => handleSelection('Acidic')} />
          <ReagentButton type="Basic" colorClass="bg-blue-500" onClick={() => handleSelection('Basic')} />
          <ReagentButton type="Neutral" colorClass="bg-green-500" onClick={() => handleSelection('Neutral')} />
          {currentLevel >= 3 && ( // Amphoteric only appears level 3 and up
            <ReagentButton type="Amphoteric" colorClass="bg-purple-500" onClick={() => handleSelection('Amphoteric')} />
          )}
        </div>
      </div>
    </div>
  );
}

function ReagentButton({ type, colorClass, onClick }: { type: ChemicalClassification; colorClass: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-4 group cursor-pointer border-0 bg-transparent">
      <div className={`w-20 h-28 rounded-b-xl rounded-t-sm border-4 border-slate-700 shadow-inner flex items-end overflow-hidden transition-transform active:scale-95 group-hover:-translate-y-2`}>
         <div className={`w-full h-1/2 ${colorClass} opacity-90`} />
      </div>
      <span className="text-lg font-bold text-slate-700 uppercase">{type}</span>
    </button>
  );
}