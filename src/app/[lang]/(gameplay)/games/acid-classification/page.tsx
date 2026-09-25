// src/app/games/acid-classification/page.tsx
'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { useRouter } from 'next/navigation';

// Shared Components
import Header from '@/components/games/shared/GamesHeader';
import GameShell from '@/components/games/shared/GameShell';
import GameOverlay, { FailReason } from '@/components/games/shared/GameOverlay';
import GameSettingsModal from '@/components/games/shared/GameSettingsModal'; 
import GameFooter from '@/components/games/shared/GameFooter';
import GameInstructionsModal from '@/components/games/shared/GameInstructionsModal';
import { AcidCompactInstructions } from '@/components/games/shared/CompactGameInstructions';
import GameArena from '@/components/games/acid-classification/GameArena';
import { useI18n } from '@/i18n/client';
import { localizePath } from '@/i18n/routing';

// Core Engine & Config
import { ANSWER_STATUS, GAME_STATE, AnswerStatus } from '@/core-engine/constants/ui-constants';
import { CompoundData, ChemicalClassification } from '@/core-engine/types/chemistry';
import { evaluateChemical } from '@/core-engine/utils/chemical-utils';
import { COMPOUNDS_REGISTRY } from '@/core-engine/data/compounds';
import { ACID_CLASSIFICATION_CONFIG } from '@/core-engine/config/games/acid-classification-config';
import { useSound } from '@/hooks/useSound';
import { recordGameSession } from '@/lib/actions/game-actions';

export default function ClassificationGame() {
  const router = useRouter();
  const { t, f, locale } = useI18n();
  const { playSound } = useSound();

  // The tuning numbers stay in the config; only the copy moved to the
  // dictionary, so a teacher still edits wording in one place per locale.
  const instructionSteps = useMemo(
    () => [
      {
        highlight: t.games.acidClassification.stepIdentifyLabel,
        text: t.games.acidClassification.stepIdentifyText,
      },
      {
        highlight: t.games.acidClassification.stepClassifyLabel,
        text: t.games.acidClassification.stepClassifyText,
      },
      {
        highlight: t.games.acidClassification.stepHintLabel,
        text: t.games.acidClassification.stepHintText,
      },
      {
        highlight: t.games.acidClassification.stepCarefulLabel,
        text: t.games.acidClassification.stepCarefulText,
      },
    ],
    [t]
  );

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
  
  const [feedback, setFeedback] = useState<{ status: AnswerStatus; selected: ChemicalClassification | null }>({
    status: ANSWER_STATUS.IDLE,
    selected: null,
  });

  const [currentLevelChemicals, setCurrentLevelChemicals] = useState<CompoundData[]>([]);

  // Correct answers across the whole run (correctInRound resets per level);
  // together with `mistakes` this gives the accuracy saved with the session.
  const [totalCorrect, setTotalCorrect] = useState<number>(0);
  const startTimeRef = useRef<number>(0);
  // Prevents the same run from being recorded twice.
  const sessionSavedRef = useRef(false);
  // True while a modal is the *reason* the game is paused, so closing it
  // resumes — and closing a modal opened over an already-paused game does not.
  // Same pattern as formula-blaster and neutralise.
  const pausedByModalRef = useRef(false);

  // The clock starts when the page mounts (set in an effect: render must stay pure).
  useEffect(() => {
    startTimeRef.current = Date.now();
  }, []);

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

  // Record the run once it reaches a terminal state. By then `score`,
  // `totalCorrect` and `mistakes` hold their final values.
  useEffect(() => {
    if (gameState !== GAME_STATE.FAILED && gameState !== GAME_STATE.VICTORY) return;
    if (sessionSavedRef.current) return;
    sessionSavedRef.current = true;

    const answered = totalCorrect + mistakes;
    void recordGameSession({
      gameId: 'acid-classification',
      score,
      levelReached: currentLevel,
      accuracy: answered > 0 ? Math.round((totalCorrect / answered) * 100) : undefined,
      timeSpentSeconds: Math.max(1, Math.floor((Date.now() - startTimeRef.current) / 1000)),
      outcome: gameState === GAME_STATE.VICTORY ? 'victory' : 'failed',
    });
  }, [gameState, score, currentLevel, totalCorrect, mistakes]);

  const handleTriggerManualHint = () => {
    if (gameState !== GAME_STATE.PLAYING || !currentChemical) return;
    playSound('click');
    setShowChemicalName(true);
  };

  const handleExitGame = () => {
    playSound('click');
    // The games hub, not the dashboard. Leaving a game means leaving *this*
    // game, and the next thing a player wants is another one — three of the
    // five already did this; these two did not.
    router.push(localizePath('/games', locale));
  };

  const handleOpenSettings = () => {
    playSound('click');
    if (gameState === GAME_STATE.PLAYING) {
      pausedByModalRef.current = true;
      togglePause();
    }
    setIsSettingsOpen(true);
  };

  const handleCloseSettings = () => {
    setIsSettingsOpen(false);
    if (pausedByModalRef.current) {
      pausedByModalRef.current = false;
      togglePause();
    }
  };

  const handleOpenInstructions = () => {
    playSound('click');
    if (gameState === GAME_STATE.PLAYING) {
      pausedByModalRef.current = true;
      togglePause();
    }
    setIsInstructionsOpen(true);
  };

  const handleCloseInstructions = () => {
    setIsInstructionsOpen(false);
    if (pausedByModalRef.current) {
      pausedByModalRef.current = false;
      togglePause();
    }
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
        setTotalCorrect((prev) => prev + 1);
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
    setTotalCorrect(0);
    setFailReason(null);
    setFeedback({ status: ANSWER_STATUS.IDLE, selected: null });
    // A new run gets its own session record.
    sessionSavedRef.current = false;
    startTimeRef.current = Date.now();
  };

  if (!COMPOUNDS_REGISTRY || COMPOUNDS_REGISTRY.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center font-bold text-(--danger)">
        {t.games.acidClassification.registryError}
      </div>
    );
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
          gameSubtitle={t.games.acidClassification.subtitle}
          progressText={f(t.games.acidClassification.progress, {
            correct: correctInRound,
            quota: targetQuota,
          })}
          currentLevel={currentLevel}
          score={score}
          onExit={handleExitGame}
          onTriggerHint={handleTriggerManualHint}
          customTaskDescription={t.games.acidClassification.task}
          showTimer={false} 
          showLives={true}  
          lives={currentLives}
          maxLives={ACID_CLASSIFICATION_CONFIG.mechanics.maxMistakes}
        />
      </div>

      <GameSettingsModal 
        isOpen={isSettingsOpen} 
        onClose={handleCloseSettings}
        gameId="acid-classification"
      />

      <GameInstructionsModal 
        isOpen={isInstructionsOpen} 
        onClose={handleCloseInstructions}
        title={t.games.acidClassification.instructionsTitle}
        compact={<AcidCompactInstructions />}
      >
        <div className="space-y-4 font-mono text-(--muted)">
          <p>{t.games.acidClassification.instructionsSubtitle}</p>
          <ul className="list-disc space-y-2 pl-4">
            {instructionSteps.map((step, idx) => (
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
          gameState={gameState}
          feedback={feedback}
          showChemicalName={showChemicalName}
          onSelection={handleSelection}
        />
      </div>

      <GameFooter 
        onOpenSettings={handleOpenSettings}
        onOpenInstructions={handleOpenInstructions}
        isPaused={gameState !== GAME_STATE.PLAYING}
        onTogglePause={togglePause}
      />
      
    </GameShell>
  );
}