// src/app/games/acid-classification/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useGameState } from '../../../hooks/useGameState';
import { useRouter } from 'next/navigation';
import { Beaker, Flame, Droplet, Atom } from "lucide-react";

// Shared Components
import ClassificationButton from '../../..//components/games/acid-classification/ClassificationButton';
import MoleculeBubble from '../../../components/games/acid-classification/MoleculeBubble';
import Header from '../../../components/games/shared/GamesHeader';
import GameShell from '../../../components/games/shared/GameShell';
import GameOverlay, { FailReason } from '../../../components/games/shared/GameOverlay';
import GameSettingsModal from '../../../components/games/shared/GameSettingsModal'; 
import GameFooter from '../../../components/games/shared/GameFooter';
import GameInstructionsModal from '../../../components/games/shared/GameInstructionsModal';

// Core Engine
import { PH_CLASSIFICATIONS, CLASSIFICATION_OPTIONS } from '@/src/core-engine/constants/chemical-labels';
import { ANSWER_STATUS, GAME_STATE, AnswerStatus } from '@/src/core-engine/constants/ui-constants';
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
  
  // ⚙️ UI Modals State
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isInstructionsOpen, setIsInstructionsOpen] = useState<boolean>(false);
  
  const poolIndexRef = useRef(poolIndex);
  useEffect(() => { poolIndexRef.current = poolIndex; }, [poolIndex]);

  // --- UI ANIMATION STATE ---
  const [feedback, setFeedback] = useState<{ status: AnswerStatus; selected: string | null }>({
      status: ANSWER_STATUS.IDLE, // CHANGE THIS FROM null TO ANSWER_STATUS.IDLE
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

  const handleTriggerManualHint = () => {
    if (gameState !== 'playing' || !currentChemical) return;
    playSound('click');
    setShowChemicalName(true);
  };

  const handleExitGame = () => {
    playSound('click');
    router.push('/');
  };

  const handleOpenSettings = () => {
    playSound('click');
    if (gameState === 'playing') {
      togglePause();
    }
    setIsSettingsOpen(true);
  };

  const handleSelection = (selectedType: ChemicalClassification) => {
  // Use GAME_STATE constant
    if (gameState !== GAME_STATE.PLAYING || !currentChemical || feedback.status !== ANSWER_STATUS.IDLE) return;

    const expectedType = evaluateChemical(currentChemical);
    const isCorrect = selectedType === expectedType;

    if (isCorrect) {
      // Use ANSWER_STATUS constant
      setFeedback({ status: ANSWER_STATUS.CORRECT, selected: selectedType });
      playSound('success-synthesis');
      
      setTimeout(() => {
        setScore((prev) => prev + (100 * currentLevel));
        const newCorrect = correctInRound + 1;
        setCorrectInRound(newCorrect);
        // Use ANSWER_STATUS.IDLE for resetting
        setFeedback({ status: ANSWER_STATUS.IDLE, selected: null });

        if (newCorrect >= targetQuota) {
          if (currentLevel >= MAX_LEVEL) {
            setGameState(GAME_STATE.VICTORY);
            playSound('success-synthesis');
          } else {
            setGameState(GAME_STATE.LEVEL_UP);
            playSound('lock-element');
          }
        } else {
          setPoolIndex((prev) => prev + 1);
        }
      }, 1200);

    } else {
      const newMistakes = mistakes + 1;
      setMistakes(newMistakes);
      // Use ANSWER_STATUS constant
      setFeedback({ status: ANSWER_STATUS.WRONG, selected: selectedType });
      
      if (newMistakes >= MAX_MISTAKES) {
        playSound('fizzle'); 
        setTimeout(() => {
          setFailReason('mistakes');
          setGameState(GAME_STATE.FAILED);
          playSound('explosion'); 
        }, 800);
      } else {
        playSound('fizzle'); 
        setTimeout(() => setFeedback({ status: ANSWER_STATUS.IDLE, selected: null }), 1200);
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

  const currentLives = MAX_MISTAKES - mistakes;

  return (
    <GameShell>
      
      {/* HEADER COMPONENT (Pause logic removed, shifted to Footer) */}
      <div className="px-4 md:px-6 lg:px-8 w-full max-w-5xl mx-auto">
        <Header
          gameTitle="Chemical Classifier"
          gameSubtitle="CLASSIFY MOLECULE"
          progressText={`${correctInRound} / ${targetQuota} Sorted`}
          currentLevel={currentLevel}
          score={score}
          gameState={gameState}
          onExit={handleExitGame}
          onTriggerHint={handleTriggerManualHint}
          customTaskDescription="Acid, Base or Neutral?"          
          showTimer={false} 
          showLives={true}  
          lives={currentLives}
          maxLives={MAX_MISTAKES}
        />
      </div>

      <GameSettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />

      <GameInstructionsModal 
        isOpen={isInstructionsOpen} 
        onClose={() => setIsInstructionsOpen(false)}
        title="How to Play: Chemical Classifier"
      >
        <div className="space-y-4 font-mono text-slate-300">
          <p>Analyze the chemical formula and identify its properties!</p>
          <ul className="list-disc pl-4 space-y-2">
            <li><strong>Identify:</strong> Look at the compound shown in the center bubble.</li>
            <li><strong>Classify:</strong> Select whether it is an Acid, Base, Neutral, or Amphoteric substance.</li>
            <li><strong>Need a Hint?</strong> Click the lightbulb icon in the header to reveal the chemical's name.</li>
            <li><strong>Careful:</strong> 3 mistakes and the beaker breaks!</li>
          </ul>
        </div>
      </GameInstructionsModal>

      {/* CENTRAL DISPLAY PORT & OVERLAYS - Added min-h-0 to prevent flex overflow */}
      <div className="flex-1 min-h-0 w-full flex flex-col items-center justify-center my-4 relative max-w-3xl z-0 mx-auto">
        
        <GameOverlay
          gameState={isSettingsOpen || isInstructionsOpen ? 'playing' : gameState}
          score={score}
          correctInRound={correctInRound}
          currentLevel={currentLevel}
          maxLevel={MAX_LEVEL}
          failReason={failReason}
          onResume={handleOverlayAdvance} 
          onRestart={resetGame}
        />

        <MoleculeBubble
          formula={currentChemical?.formula}
          name={currentChemical?.name}
          feedbackStatus={feedback.status}
          showName={showChemicalName}
        />
      </div>

      {/* LOWER NAVIGATION PLATFORM */}
      <div className={`w-full max-w-4xl grid gap-3 md:gap-6 mb-4 z-10 mx-auto px-4 md:px-0 ${currentLevel >= 3 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-3'}`}>
        {CLASSIFICATION_OPTIONS.map((option: { label: string; icon: any; colorVar: string }) => {
          // Hide Amphoteric before level 3
          if (option.label === PH_CLASSIFICATIONS.AMPHOTERIC && currentLevel < 3) return null;

          return (
            <ClassificationButton
              key={option.label}
              label={option.label}
              icon={option.icon}
              colorVar={option.colorVar} // Use colorVar instead of accentColor
              status={feedback.selected === option.label ? feedback.status : ANSWER_STATUS.IDLE}
              onClick={() => handleSelection(option.label as any)}
              disabled={gameState !== GAME_STATE.PLAYING || feedback.status !== ANSWER_STATUS.IDLE} // Updated guard
            />
          );
        })}
      </div>

      {/* FOOTER COMPONENT */}
      <GameFooter 
        onOpenSettings={handleOpenSettings}
        onOpenInstructions={() => setIsInstructionsOpen(true)}
        isPaused={gameState !== 'playing'}
        onTogglePause={togglePause}
      />
      
    </GameShell>
  );
}