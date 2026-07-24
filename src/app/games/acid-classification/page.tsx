// src/app/games/acid-classification/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { useRouter } from 'next/navigation';

// Shared Components
import Header from '@/components/games/shared/GamesHeader';
import GameShell from '@/components/games/shared/GameShell';
import GameOverlay, { FailReason } from '@/components/games/shared/GameOverlay';
import GameSettingsModal from '@/components/games/shared/GameSettingsModal'; 
import GameFooter from '@/components/games/shared/GameFooter';
import GameInstructionsModal from '@/components/games/shared/GameInstructionsModal';
import GameArena from '@/components/games/acid-classification/GameArena';

// Core Engine & Config
import { ANSWER_STATUS, GAME_STATE, AnswerStatus } from '@/core-engine/constants/ui-constants';
import { CompoundData, ChemicalClassification } from '@/core-engine/types/chemistry';
import { evaluateChemical } from '@/core-engine/utils/chemical-utils';
import { COMPOUNDS_REGISTRY } from '@/core-engine/data/compounds';
import { ACID_CLASSIFICATION_CONFIG } from '@/core-engine/config/games/acid-classification-config';
import { useSound } from '@/hooks/useSound';

export default function ClassificationGame() {
  const router = useRouter();
  const { playSound } = useSound();

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
  
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isInstructionsOpen, setIsInstructionsOpen] = useState<boolean>(false);
  
  const [feedback, setFeedback] = useState<{ status: AnswerStatus; selected: string | null }>({
      status: ANSWER_STATUS.IDLE,
      selected: null,
  });

  const [currentLevelChemicals, setCurrentLevelChemicals] = useState<CompoundData[]>([]);

  const targetQuota = Math.max(ACID_CLASSIFICATION_CONFIG.levels.minPassingItems, currentLevelChemicals.length - 2);

  useEffect(() => {
    if (!COMPOUNDS_REGISTRY) return;
    const filtered = COMPOUNDS_REGISTRY.filter(chem => chem.difficulty === currentLevel);
    setCurrentLevelChemicals([...filtered].sort(() => Math.random() - 0.5));
  }, [currentLevel]);

  const currentChemical = currentLevelChemicals[poolIndex];

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
    return <div className="flex min-h-screen items-center justify-center font-bold text-red-500">Error: Compounds Registry not found.</div>;
  }

  const currentLives = ACID_CLASSIFICATION_CONFIG.mechanics.maxMistakes - mistakes;

  return (
    <GameShell themeScope="acid-classification">
      
      {/* Overlay is now at the top of the shell to prevent being trapped under sibling z-indexes */}
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

      <div className="mx-auto w-full max-w-5xl px-4 md:px-6 lg:px-8">
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
        title={ACID_CLASSIFICATION_CONFIG.instructions.title}
      >
        <div className="space-y-4 font-mono text-(--muted)">
          <p>{ACID_CLASSIFICATION_CONFIG.instructions.subtitle}</p>
          <ul className="list-disc space-y-2 pl-4">
            {ACID_CLASSIFICATION_CONFIG.instructions.steps.map((step, idx) => (
              <li key={idx}>
                <strong className="text-(--foreground)">{step.highlight}</strong> {step.text}
              </li>
            ))}
          </ul>
        </div>
      </GameInstructionsModal>

      {/* Extracted GameArena Component */}
      <div className="relative mx-auto my-8 flex min-h-0 w-full max-w-3xl flex-1 flex-col items-center justify-center">
        <GameArena 
          currentChemical={currentChemical}
          currentLevel={currentLevel}
          gameState={gameState}
          feedback={feedback}
          showChemicalName={showChemicalName}
          onSelection={handleSelection}
        />
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