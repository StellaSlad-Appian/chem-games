import { useState, useMemo, useCallback } from 'react';
import type { GameState, GameFeedback } from '@/core-engine/types/general';

export interface Compound {
  formula: string;
  composition: Record<string, number>;
}

export interface ReactionLevel {
  id: number;
  taskDescription: string;
  reactants: Compound[];
  products: Compound[];
  hint: string;
}

// Sample workshop levels for high school chemistry
const LEVELS: ReactionLevel[] = [
  {
    id: 1,
    taskDescription: "Synthesize Water",
    reactants: [{ formula: 'H2(g)', composition: { H: 2 } }, { formula: 'O2(g)', composition: { O: 2 } }],
    products: [{ formula: 'H2O(l)', composition: { H: 2, O: 1 } }],
    hint: "Notice that oxygen comes in pairs on the left. You'll need an even number of water molecules.",
  },
  {
    id: 2,
    taskDescription: "Methane Combustion",
    reactants: [{ formula: 'CH4(g)', composition: { C: 1, H: 4 } }, { formula: 'O2(g)', composition: { O: 2 } }],
    products: [{ formula: 'CO2(g)', composition: { C: 1, O: 2 } }, { formula: 'H2O(g)', composition: { H: 2, O: 1 } }],
    hint: "Balance Carbon first, then Hydrogen, and leave Oxygen for last.",
  }
];

export function useReactionBalancer() {
  const [levelIndex, setLevelIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<GameState>('playing');
  const [feedback, setFeedback] = useState<GameFeedback | null>(null);

  const currentLevel = LEVELS[levelIndex];

  // Store coefficients. We allow empty strings so the user can clear the input.
  const [coefficients, setCoefficients] = useState<(number | '')[]>(
    new Array(currentLevel.reactants.length + currentLevel.products.length).fill('')
  );

  const updateCoefficient = (index: number, val: number | '') => {
    setCoefficients(prev => {
      const newCoeffs = [...prev];
      newCoeffs[index] = val;
      return newCoeffs;
    });
    setFeedback(null); // Clear errors on user input
  };

  // Calculate atom totals dynamically
  const { leftAtoms, rightAtoms, isBalanced } = useMemo(() => {
    const left: Record<string, number> = {};
    const right: Record<string, number> = {};
    let allBalanced = true;

    // Tally Reactants (treat empty string as 1)
    currentLevel.reactants.forEach((compound, i) => {
      const coeff = typeof coefficients[i] === 'number' ? (coefficients[i] as number) : 1;
      Object.entries(compound.composition).forEach(([atom, count]) => {
        left[atom] = (left[atom] || 0) + (count * coeff);
      });
    });

    // Tally Products
    const productOffset = currentLevel.reactants.length;
    currentLevel.products.forEach((compound, i) => {
      const coeff = typeof coefficients[productOffset + i] === 'number' ? (coefficients[productOffset + i] as number) : 1;
      Object.entries(compound.composition).forEach(([atom, count]) => {
        right[atom] = (right[atom] || 0) + (count * coeff);
      });
    });

    // Check Balance
    const allElements = new Set([...Object.keys(left), ...Object.keys(right)]);
    allElements.forEach(atom => {
      if (left[atom] !== right[atom]) allBalanced = false;
    });

    return { leftAtoms: left, rightAtoms: right, isBalanced: allBalanced };
  }, [currentLevel, coefficients]);

  const handleCheckAnswer = useCallback(() => {
    if (isBalanced) {
      setScore(s => s + 500);
      setGameState(levelIndex === LEVELS.length - 1 ? 'victory' : 'levelUp');
    } else {
      setFeedback({ type: 'error', message: 'The atoms are not balanced yet. Check the inventory!' });
    }
  }, [isBalanced, levelIndex]);

  const triggerHint = () => setFeedback({ type: 'hint', message: currentLevel.hint });
  const dismissFeedback = () => setFeedback(null);
  
  const nextLevel = () => {
    if (levelIndex < LEVELS.length - 1) {
      setLevelIndex(i => i + 1);
      setCoefficients(new Array(LEVELS[levelIndex + 1].reactants.length + LEVELS[levelIndex + 1].products.length).fill(''));
      setGameState('playing');
    }
  };

  const restartGame = () => {
    setLevelIndex(0);
    setScore(0);
    setCoefficients(new Array(LEVELS[0].reactants.length + LEVELS[0].products.length).fill(''));
    setGameState('playing');
  };

  return {
    currentLevel,
    levelNumber: levelIndex + 1,
    maxLevel: LEVELS.length,
    score,
    gameState,
    setGameState,
    feedback,
    triggerHint,
    dismissFeedback,
    coefficients,
    updateCoefficient,
    leftAtoms,
    rightAtoms,
    isBalanced,
    handleCheckAnswer,
    nextLevel,
    restartGame
  };
}