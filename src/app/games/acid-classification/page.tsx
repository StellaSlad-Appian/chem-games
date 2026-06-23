// src/app/games/acid-classification/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useGameState } from '../../../hooks/useGameState';
import { useRouter } from 'next/navigation';
import { Beaker, Flame, Droplet, Atom } from "lucide-react";

// Shared Components
import MoleculeBubble from '../../../components/games/acid-classification/MoleculeBubble';
import Header from '../../../components/games/shared/GamesHeader';
import GameShell from '../../../components/games/shared/GameShell';
import GameOverlay, { FailReason } from '../../../components/games/shared/GameOverlay';
import GameSettingsModal from '../../../components/games/shared/GameSettingsModal'; 

// Core Engine
import { CompoundData, ChemicalClassification } from '@/src/core-engine/types/chemistry';
import { evaluateChemical } from '@/src/core-engine/utils/chemical-utils';
import { COMPOUNDS_REGISTRY } from '@/src/core-engine/data/compounds';
import { useSound } from '../../../hooks/useSound';

const MAX_MISTAKES = 3;
const MAX_LEVEL = 5;

export default function ClassificationGame() {
  const router = useRouter();
  
  // --- AUDIO SYSTEM INTEGRATION ---
  const { playSound } = useSound();

  // --- USER'S GAME ENGINE STATE ---
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

  const [mistakes, setMistakes] = useState<number>(0);
  const [poolIndex, setPoolIndex] = useState<number>(0);
  const [correctInRound, setCorrectInRound] = useState<number>(0);
  const [failReason, setFailReason] = useState<FailReason>(null);
  const [showChemicalName, setShowChemicalName] = useState<boolean>(false);
  
  // ⚙️ Wires up visibility tracker state for the settings overlay module
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  
  const poolIndexRef = useRef(poolIndex);
  useEffect(() => { poolIndexRef.current = poolIndex; }, [poolIndex]);

  // --- UI ANIMATION STATE ---
  const [feedback, setFeedback] = useState<{ status: 'correct' | 'wrong' | null; selected: string | null }>({
    status: null,
    selected: null,
  });

  const [currentLevelChemicals, setCurrentLevelChemicals] = useState<CompoundData[]>([]);

  // 🧪 Dynamic Quota Hook: Calculate passing bar safely based on active pool size
  const targetQuota = Math.max(3, currentLevelChemicals.length - 2);

  useEffect(() => {
    if (!COMPOUNDS_REGISTRY) return;
    const filtered = COMPOUNDS_REGISTRY.filter(chem => chem.difficulty === currentLevel);
    setCurrentLevelChemicals([...filtered].sort(() => Math.random() - 0.5));
  }, [currentLevel]);

  const currentChemical = currentLevelChemicals[poolIndex];

  // 🔄 Automatically hide the hint when transitioning to a new chemical card
  useEffect(() => {
    setShowChemicalName(false);
  }, [currentChemical]);

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

  // --- NEW ACTIONS HANDLERS FOR THE UNIFIED HEADER COMPONENT ---
  const handleTriggerManualHint = () => {
    if (gameState !== 'playing' || !currentChemical) return;
    playSound('click');
    // Uses the existing boolean flag to reveal the IUPAC / common name under the formula
    setShowChemicalName(true);
  };

  const handleExitGame = () => {
    playSound('click');
    router.push('/');
  };

  // ⚙️ Clean Action Handler: Pauses gameplay safely if configuration deck is requested
  const handleOpenSettings = () => {
    playSound('click');
    if (gameState === 'playing') {
      togglePause();
    }
    setIsSettingsOpen(true);
  };

  const handleSelection = (selectedType: ChemicalClassification) => {
    if (gameState !== 'playing' || !currentChemical || feedback.status !== null) return;

    const expectedType = evaluateChemical(currentChemical);
    const isCorrect = selectedType === expectedType;

    if (isCorrect) {
      setFeedback({ status: 'correct', selected: selectedType });
      playSound('success-synthesis');
      
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
            playSound('success-synthesis');
          } else {
            setGameState('levelUp');
            playSound('lock-element');
          }
        } else {
          setPoolIndex((prev) => prev + 1);
        }
      }, 1200);

    } else {
      const newMistakes = mistakes + 1;
      setMistakes(newMistakes);
      setFeedback({ status: 'wrong', selected: selectedType });
      
      // Check if this mistake ends the game
      if (newMistakes >= MAX_MISTAKES) {
        playSound('fizzle'); // Play mistake sound instantly
        setTimeout(() => {
          setFailReason('mistakes');
          setGameState('failed');
          playSound('explosion'); // Terminal failure gets the loud explosion
        }, 800);
      } else {
        playSound('fizzle'); // Gentle reaction fizzle for non-terminal mistake
        setTimeout(() => setFeedback({ status: null, selected: null }), 1200);
      }
    }
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
    resetBase();
    setMistakes(0);
    setPoolIndex(0);
    setCorrectInRound(0);
    setFailReason(null);
    setFeedback({ status: null, selected: null });
  };

  if (!COMPOUNDS_REGISTRY || COMPOUNDS_REGISTRY.length === 0) {
    return <div className="min-h-screen flex items-center justify-center text-red-500 font-bold">Error: Compounds Registry not found.</div>;
  }

  // Calculate remaining lives for the Header
  const currentLives = MAX_MISTAKES - mistakes;

  return (
    <GameShell>
      
      {/* 🛡️ THE NEW UNIFIED HEADER COMPONENT */}
      <div className="px-4 md:px-6 lg:px-8">
        <Header
          gameTitle="Chemical Classifier"
          gameSubtitle="CLASSIFY MOLECULE"
          progressText={`${correctInRound} / ${targetQuota} Sorted`}
          currentLevel={currentLevel}
          score={score}
          gameState={gameState}
          onTogglePause={togglePause}
          onExit={handleExitGame}
          onTriggerHint={handleTriggerManualHint}
          onOpenSettings={handleOpenSettings} 
          customTaskDescription="Acid, Base or Neutral?"          
          showTimer={false} 
          showLives={true}  
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

        {/* ⚙️ Mount settings modal layer directly within safe tracking dimensions */}
        <GameSettingsModal 
          isOpen={isSettingsOpen} 
          onClose={() => setIsSettingsOpen(false)} 
        />

        <MoleculeBubble
          formula={currentChemical?.formula}
          name={currentChemical?.name}
          feedbackStatus={feedback.status}
          showName={showChemicalName}
        />
      </div>

      {/* LOWER NAVIGATION PLATFORM */}
      <div className={`w-full max-w-4xl grid gap-3 md:gap-6 mb-4 z-10 ${currentLevel >= 3 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-3'}`}>
        <button onClick={() => handleSelection("Acidic")} disabled={gameState !== "playing" || feedback.status !== null}
          className={`flex flex-col items-center p-6 rounded-2xl border-2 transition-all group ${feedback.selected === "Acidic" && feedback.status === "correct" ? "bg-emerald-50 border-emerald-500" : feedback.selected === "Acidic" && feedback.status === "wrong" ? "bg-red-50 border-red-500" : "bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 hover:border-red-400 hover:shadow-md active:scale-98"}`}>
          <div
            className="p-3 rounded-xl mb-2 group-hover:scale-110 transition-transform"
            style={{
              backgroundColor: 'var(--chem-acid-surface)',
              color: 'var(--chem-acid-accent)',
            }}
          >
            <Flame className="w-8 h-8 md:w-10 md:h-10" />
          </div>

          <span
            className="font-extrabold text-xs md:text-sm tracking-wider uppercase"
            style={{
              color: 'var(--chem-acid-accent)',
            }}
          >
            Acidic
          </span>
        </button>

        <button onClick={() => handleSelection("Neutral")} disabled={gameState !== "playing" || feedback.status !== null}
          className={`flex flex-col items-center p-6 rounded-2xl border-2 transition-all group ${feedback.selected === "Neutral" && feedback.status === "correct" ? "bg-emerald-50 border-emerald-500" : feedback.selected === "Neutral" && feedback.status === "wrong" ? "bg-red-50 border-red-500" : "bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 hover:border-emerald-400 hover:shadow-md active:scale-98"}`}>
          <div
            className="p-3 rounded-xl mb-2 group-hover:scale-110 transition-transform"
            style={{
              backgroundColor: "var(--chem-neutral-surface)",
              color: "var(--chem-neutral-accent)",
            }}
          >
            <Droplet className="w-8 h-8 md:w-10 md:h-10" />
          </div>
          <span
            className="font-extrabold text-xs md:text-sm tracking-wider uppercase"
            style={{
              color: "var(--chem-neutral-accent)",
            }}
          >
            Neutral
          </span>
        </button>

        <button onClick={() => handleSelection("Basic")} disabled={gameState !== "playing" || feedback.status !== null}
          className={`flex flex-col items-center p-6 rounded-2xl border-2 transition-all group ${feedback.selected === "Basic" && feedback.status === "correct" ? "bg-emerald-50 border-emerald-500" : feedback.selected === "Basic" && feedback.status === "wrong" ? "bg-red-50 border-red-500" : "bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 hover:border-blue-400 hover:shadow-md active:scale-98"}`}>
          <div
            className="p-3 rounded-xl mb-2 group-hover:scale-110 transition-transform"
            style={{
              backgroundColor: "var(--chem-base-surface)",
              color: "var(--chem-base-accent)",
            }}
          >
            <Beaker className="w-8 h-8 md:w-10 md:h-10" />
          </div>
          <span className="font-extrabold text-xs md:text-sm tracking-wider uppercase"
          style={{
            color: "var(--chem-base-accent)",
          }}
          >Basic</span>
        </button>

        {currentLevel >= 3 && (
          <button onClick={() => handleSelection("Amphoteric")} disabled={gameState !== "playing" || feedback.status !== null}
            className={`flex flex-col items-center p-6 rounded-2xl border-2 transition-all group ${feedback.selected === "Amphoteric" && feedback.status === "correct" ? "bg-emerald-50 border-emerald-500" : feedback.selected === "Amphoteric" && feedback.status === "wrong" ? "bg-red-50 border-red-500" : "bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 hover:border-purple-400 hover:shadow-md active:scale-98"}`}>
            <div
              className="p-3 rounded-xl mb-2 group-hover:scale-110 transition-transform"
              style={{
                backgroundColor: "var(--chem-amphoteric-surface)",
                color: "var(--chem-amphoteric-accent)",
              }}
            >
              <Atom className="w-8 h-8 md:w-10 md:h-10" />
            </div>

            <span
              className="font-extrabold text-xs md:text-sm tracking-wider uppercase"
              style={{
                color: "var(--chem-amphoteric-accent)",
              }}
            >
              Amphoteric
            </span>
          </button>
        )}
      </div>
    </GameShell>
  );
}