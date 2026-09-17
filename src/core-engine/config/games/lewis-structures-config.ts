// src/core-engine/config/games/lewis-structures-config.ts

/*
 ==============================================================================
  USER ACCEPTANCE TESTING (UAT) TUNING GUIDE — Share to Fill (Lewis structures)
 ==============================================================================
 There is no timer and there are no lives in this game, so tuning is about how
 much help appears and when, and how the levels are paced.

 1. IF PLAYERS SAY: "I don't know what to do next / the coach disappeared!"
    Increase `mechanics.coachAlwaysOnUntilLevel` (e.g. 2 -> 3)
       Keeps the coach panel permanently open on more levels. (Support mode in
       Settings pins it on for every level regardless of this number.)
    Decrease `mechanics.coachAfterSeconds` (e.g. 30 -> 15)
       Opens the coach sooner when a player has not made a move.

 2. IF PLAYERS SAY: "I was stuck for ages before it offered real help."
    Decrease `mechanics.stuckAfterSeconds` (e.g. 90 -> 60)
       Offers hint tier 2 (the strategy) sooner.

 3. IF PLAYERS SAY: "Too many 'classmate drawing' rounds / not enough of them."
    Change `levels.inspectEveryNRounds` (e.g. 3 -> 4 for fewer, 2 for more)
       From Level 2, every Nth molecule is shown as a classmate's drawing to fix.
    Change `levels.roundsByLevel[4]` (e.g. 6 -> 4)
       How many drawings Level 5 (Marking mode) asks the player to check.

 4. IF PLAYERS SAY: "Every classmate drawing has a mistake, so I never say 'correct'."
    Decrease `mechanics.correctStructureRatio` (e.g. 6 -> 4)
       One drawing in N is actually correct.

 5. IF PLAYERS SAY: "The hints cost too much / hints feel free so I spam them."
    Change `mechanics.noHintBonus` (e.g. 50 -> 25)
       Bonus for finishing a molecule without asking for hint tier 2 or 3.
       Tier 1 is always free and never affects accuracy; only tier 3 does.

 6. IF PLAYERS SAY: "The dots stop pulsing / I can't tell which dots are loners."
    Increase `visuals.pulseUnpairedUntilLevel` (up to `levels.maxLevel`)
       Loners pulse until this level. Under prefers-reduced-motion they are
       outlined instead, at every level.
    Increase `visuals.showCountersUntilLevel` (e.g. 3 -> 5)
       Shows "O: 6 of 8" under every atom; after this level it appears on
       hover/focus only.

 The molecule order per level is NOT here — it lives in
 src/core-engine/data/lewis-molecules.ts (`level` / `order`), so a teacher can
 swap a molecule without touching these numbers.
 ==============================================================================
*/

// -------------------------------------------------------------
// OPTION 1: "Classroom" (RECOMMENDED DEFAULT — the brief's numbers)
// Coach on for Levels 1-2, one round per molecule, six drawings to mark.
// -------------------------------------------------------------
const OPTION_1_CLASSROOM = {
  gameId: 'lewis-structures',
  levels: {
    maxLevel: 5,
    /** Rounds per level: one per molecule at Levels 1-4, six drawings at Level 5. */
    roundsByLevel: [3, 5, 5, 5, 6],
    /** From `inspectFromLevel`, every Nth round is a classmate's drawing to fix. */
    inspectEveryNRounds: 3,
    inspectFromLevel: 2,
    /** The level that is entirely classmate drawings (Marking mode). */
    markingLevel: 5,
  },
  mechanics: {
    pointsPerLevelMultiplier: 100,
    noHintBonus: 50,
    coachAfterSeconds: 30,
    stuckAfterSeconds: 90,
    /** One classmate drawing in N is actually correct. */
    correctStructureRatio: 6,
    /** The coach panel is always open up to and including this level. */
    coachAlwaysOnUntilLevel: 2,
  },
  visuals: {
    pulseUnpairedUntilLevel: 5,
    showCountersUntilLevel: 3,
    /** Loner dots carry the word "loner" up to this level. */
    lonerLabelsUntilLevel: 1,
    /** From this level atoms start unplaced and the player picks the centre. */
    unplacedFromLevel: 4,
  },
} as const;

// -------------------------------------------------------------
// OPTION 2: "Gentle" (More support, shorter marking round)
// -------------------------------------------------------------
const OPTION_2_GENTLE = {
  gameId: 'lewis-structures',
  levels: {
    maxLevel: 5,
    roundsByLevel: [3, 5, 5, 5, 4],
    inspectEveryNRounds: 4,
    inspectFromLevel: 2,
    markingLevel: 5,
  },
  mechanics: {
    pointsPerLevelMultiplier: 100,
    noHintBonus: 50,
    coachAfterSeconds: 15,
    stuckAfterSeconds: 60,
    correctStructureRatio: 4,
    coachAlwaysOnUntilLevel: 3,
  },
  visuals: {
    pulseUnpairedUntilLevel: 5,
    showCountersUntilLevel: 5,
    lonerLabelsUntilLevel: 2,
    unplacedFromLevel: 4,
  },
} as const;

// -------------------------------------------------------------
// OPTION 3: "Exam prep" (Less scaffolding, more checking)
// -------------------------------------------------------------
const OPTION_3_EXAM_PREP = {
  gameId: 'lewis-structures',
  levels: {
    maxLevel: 5,
    roundsByLevel: [3, 5, 5, 5, 8],
    inspectEveryNRounds: 2,
    inspectFromLevel: 2,
    markingLevel: 5,
  },
  mechanics: {
    pointsPerLevelMultiplier: 100,
    noHintBonus: 75,
    coachAfterSeconds: 45,
    stuckAfterSeconds: 120,
    correctStructureRatio: 6,
    coachAlwaysOnUntilLevel: 1,
  },
  visuals: {
    pulseUnpairedUntilLevel: 3,
    showCountersUntilLevel: 2,
    lonerLabelsUntilLevel: 1,
    unplacedFromLevel: 3,
  },
} as const;

export const LEWIS_STRUCTURES_PRESETS = { OPTION_1_CLASSROOM, OPTION_2_GENTLE, OPTION_3_EXAM_PREP } as const;

// CHANGE THIS ONE EXPORT TO SWITCH PRESETS:
export const LEWIS_STRUCTURES_CONFIG = OPTION_1_CLASSROOM;

export type LewisStructuresConfig = typeof LEWIS_STRUCTURES_CONFIG;
