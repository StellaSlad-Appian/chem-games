// src/hooks/useHintLadder.ts
'use client';

import { useCallback, useState } from 'react';

/**
 * Three-tier hint ladder shared by the text-first games: tier 1 (what to
 * look at) is always free, tier 2 (the strategy) and tier 3 (one concrete
 * move) cost the round's no-hint bonus, and only tier 3 counts against the
 * recorded accuracy. Reset it at the start of every round.
 */
export function useHintLadder(maxTier = 3) {
  const [tier, setTier] = useState(0);
  const [highestTierUsed, setHighestTierUsed] = useState(0);

  const requestHint = useCallback(() => {
    setTier((current) => {
      const next = Math.min(maxTier, current + 1);
      setHighestTierUsed((highest) => Math.max(highest, next));
      return next;
    });
  }, [maxTier]);

  const dismiss = useCallback(() => setTier(0), []);

  const reset = useCallback(() => {
    setTier(0);
    setHighestTierUsed(0);
  }, []);

  return {
    /** The tier currently shown (0 = none). */
    tier,
    /** The highest tier opened this round. */
    highestTierUsed,
    /** True once tier 2 or 3 has been opened: the no-hint bonus is gone. */
    usedPaidTier: highestTierUsed >= 2,
    /** True once tier 3 has been opened: the round no longer counts toward accuracy. */
    usedTier3: highestTierUsed >= maxTier,
    requestHint,
    dismiss,
    reset,
  };
}
