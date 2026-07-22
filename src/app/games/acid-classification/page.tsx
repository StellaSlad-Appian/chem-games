// src/app/games/acid-classification/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { useRouter } from 'next/navigation';
import { Beaker, Flame, Droplet, Atom } from "lucide-react";

// Shared Components
import ClassificationButton from '@/components/games/acid-classification/ClassificationButton';
import MoleculeBubble from '@/components/games/acid-classification/MoleculeBubble';
import Header from '@/components/games/shared/GamesHeader';
import GameShell from '@/components/games/shared/GameShell';
import GameOverlay, { FailReason } from '@/components/games/shared/GameOverlay';
import GameSettingsModal from '@/components/games/shared/GameSettingsModal'; 
import GameFooter from '@/components/games/shared/GameFooter';
import GameInstructionsModal from '@/components/games/shared/GameInstructionsModal';

// Core Engine & Config
import { PH_CLASSIFICATIONS, CLASSIFICATION_OPTIONS } from '@/core-engine/constants/chemical-labels';
import { ANSWER_STATUS, GAME_STATE, AnswerStatus } from '@/core-engine/constants/ui-constants';
import { CompoundData, ChemicalClassification } from '@/core-engine/types/chemistry';
import { evaluateChemical } from '@/core-engine/utils/chemical-utils';
import { COMPOUNDS_REGISTRY } from '@/core-engine/data/compounds';
import { ACID_CLASSIFICATION_CONFIG } from '@/core-engine/config/games/acid-classification-config';
import { useSound } from '@/hooks/useSound';

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
      status: ANSWER_STATUS.IDLE,
      selected: null,
  });

  const [currentLevelChemicals, setCurrentLevelChemicals] = useState<CompoundData[]>([]);

  // 🧪 Dynamic Quota Hook: Calculate passing bar safely based on active pool size
  const targetQuota = Math.max(ACID_CLASSIFICATION_CONFIG.levels.minPassingItems, currentLevelChemicals.length - 2);

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
    if (gameState !== GAME_STATE.PLAYING || !currentChemical) return;
    playSound('click');
    setShowChemicalName(true);
  };

  const handleExitGame = () => {
    playSound('click');
    router.push('/');
  };

  const handleOpenSettings = () => {
    playSound('click');
    if (gameState === GAME_STATE.PLAYING) {
      togglePause();
    }
    setIsSettingsOpen(true);
  };

  const handleSelection = (selectedType: ChemicalClassification) => {
    if (gameState !== GAME_STATE.PLAYING || !currentChemical || feedback.status !== ANSWER_STATUS.IDLE) return;

    const expectedType = evaluateChemical(currentChemical);
    const isCorrect = selectedType === expectedType;

    if (isCorrect) {
      setFeedback({ status: ANSWER_STATUS.CORRECT, selected: selectedType });
      playSound('success-synthesis');
      
      setTimeout(() => {
        setScore((prev) => prev + (ACID_CLASSIFICATION_CONFIG.mechanics.pointsPerLevelMultiplier * currentLevel));
        const newCorrect = correctInRound + 1;
        setCorrectInRound(newCorrect);
        setFeedback({ status: ANSWER_STATUS.IDLE, selected: null });

        if (newCorrect >= targetQuota) {
          if (currentLevel >= ACID_CLASSIFICATION_CONFIG.levels.maxLevel) {
            setGameState(GAME_STATE.VICTORY);
            playSound('success-synthesis');
          } else {
            setGameState(GAME_STATE.LEVEL_UP);
            playSound('lock-element');
          }
        } else {
          setPoolIndex((prev) => prev + 1);
        }
      }, ACID_CLASSIFICATION_CONFIG.timing.successTransitionMs);

    } else {
      const newMistakes = mistakes + 1;
      setMistakes(newMistakes);
      setFeedback({ status: ANSWER_STATUS.WRONG, selected: selectedType });
      
      if (newMistakes >= ACID_CLASSIFICATION_CONFIG.mechanics.maxMistakes) {
        playSound('fizzle'); 
        setTimeout(() => {
          setFailReason('mistakes');
          setGameState(GAME_STATE.FAILED);
          playSound('explosion'); 
        }, ACID_CLASSIFICATION_CONFIG.timing.failStateDelayMs);
      } else {
        playSound('fizzle'); 
        setTimeout(() => setFeedback({ status: ANSWER_STATUS.IDLE, selected: null }), ACID_CLASSIFICATION_CONFIG.timing.mistakeTransitionMs);
      }
    }
  };

  const handleOverlayAdvance = () => {
    if (gameState === GAME_STATE.LEVEL_UP) {
      setCurrentLevel((prev) => prev + 1);
      setPoolIndex(0);
      setCorrectInRound(0);
      setFailReason(null);
      setGameState(GAME_STATE.PLAYING);
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
    setFeedback({ status: ANSWER_STATUS.IDLE, selected: null });
  };

  if (!COMPOUNDS_REGISTRY || COMPOUNDS_REGISTRY.length === 0) {
    return <div className="min-h-screen flex items-center justify-center text-red-500 font-bold">Error: Compounds Registry not found.</div>;
  }

  const currentLives = ACID_CLASSIFICATION_CONFIG.mechanics.maxMistakes - mistakes;

  return (
    <GameShell themeScope="acid-classification">
      
      <div className="px-4 md:px-6 lg:px-8 w-full max-w-5xl mx-auto">
        <Header
          gameSubtitle="CLASSIFY MOLECULE"
          progressText={`${correctInRound} / ${targetQuota} Sorted`}
          currentLevel={currentLevel}
          score={score}
          onExit={handleExitGame}
          onTriggerHint={handleTriggerManualHint}
          customTaskDescription="Acid, Base or Neutral?"          
          showTimer={false} 
          showLives={true}  
          lives={currentLives}
          maxLives={ACID_CLASSIFICATION_CONFIG.mechanics.maxMistakes}
        />
      </div>

      <GameSettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)}
        gameId="acid-classification"
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

      <div className="flex-1 min-h-0 w-full flex flex-col items-center justify-center my-4 relative max-w-3xl z-0 mx-auto">
        
        <GameOverlay
          gameState={isSettingsOpen || isInstructionsOpen ? GAME_STATE.PLAYING : gameState}
          score={score}
          correctInRound={correctInRound}
          currentLevel={currentLevel}
          maxLevel={ACID_CLASSIFICATION_CONFIG.levels.maxLevel}
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

      <div className={`w-full max-w-4xl grid gap-3 md:gap-6 mb-4 z-10 mx-auto px-4 md:px-0 ${currentLevel >= 3 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-3'}`}>
        {CLASSIFICATION_OPTIONS.map((option: { label: string; icon: any; colorVar: string }) => {
          if (option.label === PH_CLASSIFICATIONS.AMPHOTERIC && currentLevel < 3) return null;

          return (
            <ClassificationButton
              key={option.label}
              label={option.label}
              icon={option.icon}
              colorVar={option.colorVar}
              status={feedback.selected === option.label ? feedback.status : ANSWER_STATUS.IDLE}
              onClick={() => handleSelection(option.label as any)}
              disabled={gameState !== GAME_STATE.PLAYING || feedback.status !== ANSWER_STATUS.IDLE}
            />
          );
        })}
      </div>

      <GameFooter 
        onOpenSettings={handleOpenSettings}
        onOpenInstructions={() => setIsInstructionsOpen(true)}
        isPaused={gameState !== GAME_STATE.PLAYING}
        onTogglePause={togglePause}
      />
      
    </GameShell>
  );
}