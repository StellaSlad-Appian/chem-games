// src/core-engine/config/games/reaction-balancer-config.ts

/*
 ==============================================================================
  USER ACCEPTANCE TESTING (UAT) TUNING GUIDE — Reaction Balancer
 ==============================================================================
 There is no timer and there are no lives. The win condition is conservation
 of atoms, computed from the compounds, so tuning is about how much help
 appears and when, how long a level is, and how far a player can push a
 coefficient before the game suggests smaller numbers.

 1. IF PLAYERS SAY: "I don't know what to change / the coach disappeared!"
    Increase `visuals.coachOnByDefaultUntilLevel` (e.g. 2 -> 3)
       Keeps the coach strip open on more levels. (Support mode in Settings
       pins it on for every level regardless of this number.)
    Decrease `mechanics.coachAfterSeconds` (e.g. 30 -> 15)
       Opens the coach sooner when nobody has touched a coefficient.

 2. IF PLAYERS SAY: "I was stuck for ages before it offered real help."
    Decrease `mechanics.stuckAfterSeconds` (e.g. 90 -> 60)
       Offers hint tier 2 (the strategy) sooner.

 3. IF PLAYERS SAY: "Levels are too long / too short."
    Change `levels.reactionsPerLevel` (e.g. 3 -> 4 or 2)
       Reactions to balance before the level-up card. Every difficulty pool
       in reactions.ts has at least this many playable reactions (a unit
       test checks).

 4. IF PLAYERS SAY: "I keep typing 20 and 30 and it still isn't balanced."
    Decrease `mechanics.maxCoefficient` (e.g. 12 -> 10)
       Above this the game refuses the number and says to aim for the
       simplest ratio. Reactions whose answer needs a bigger coefficient
       (Octane Combustion needs 25) are left out of the level pools.

 5. IF PLAYERS SAY: "The particle clusters are noise / I want them for longer."
    Change `visuals.showClustersUntilLevel` (e.g. 2 -> 3)
       Clusters (one per coefficient) show on the cards up to this level;
       after it the cards show the formula only.

 6. IF PLAYERS SAY: "Level 4 is a wall without the ledger."
    Increase `visuals.ledgerHiddenFromLevel` (e.g. 4 -> 5)
       The ledger stays open until this level. It can always be opened with
       the toggle, at the cost of the lowest-terms bonus.

 7. IF PLAYERS SAY: "Hints feel free so I spam them / hints cost too much."
    Change `mechanics.lowestTermsBonus` (e.g. 50 -> 25)
       Bonus for locking in lowest terms without hint tier 2 or 3 (and, at
       Level 4, without opening the ledger). Tier 1 is always free and never
       affects accuracy; only tier 3 does.

 8. IF PLAYERS SAY: "The Challenge picker has too many / too few wrong compounds."
    Change `levels.challengeDistractors` (e.g. 3 -> 2)
       Extra compounds shown in the Level 5 compound picker.

 Which reaction is on which level is NOT here — it follows the `difficulty`
 tag in src/core-engine/data/reactions.ts (`levels.difficultyByLevel` maps
 level -> tag), so a teacher can move a reaction without touching numbers.
 Level 1, reaction 1 is always Water Synthesis (the guided walk-through).
 ==============================================================================
*/

// -------------------------------------------------------------
// OPTION 1: "Classroom" (RECOMMENDED DEFAULT — the brief's numbers)
// -------------------------------------------------------------
const OPTION_1_CLASSROOM = {
  gameId: 'reaction-balancer',
  levels: {
    /** Reactions to lock before the level-up card. */
    reactionsPerLevel: 3,
    /** Victory after this level. */
    maxLevel: 4,
    /** The optional Challenge (word equations); offered on the victory card, never required. */
    challengeLevel: 5,
    /** Which reactions.ts `difficulty` feeds each level (index = level - 1). */
    difficultyByLevel: ['intro', 'beginner', 'intermediate', 'advanced'],
    /** Wrong compounds mixed into the Challenge compound picker. */
    challengeDistractors: 3,
  },
  mechanics: {
    /** A locked equation scores this x level. */
    pointsPerLevelMultiplier: 100,
    /** Extra for locking in lowest terms without hint tier 2/3 (or the Level 4 ledger). */
    lowestTermsBonus: 50,
    /** Seconds without a coefficient change before the coach opens itself (tier 1). */
    coachAfterSeconds: 30,
    /** Seconds without a change before tier 2 is offered. */
    stuckAfterSeconds: 90,
    /** Highest coefficient a player may enter. */
    maxCoefficient: 12,
  },
  visuals: {
    /** Particle clusters on the cards up to this level; formula only after. */
    showClustersUntilLevel: 2,
    /** Coach strip always open up to this level; on request (lightbulb) after. */
    coachOnByDefaultUntilLevel: 2,
    /** The ledger row to balance next is highlighted up to this level. */
    highlightNextElementUntilLevel: 1,
    /** From this level the ledger starts hidden (toggle costs the bonus). */
    ledgerHiddenFromLevel: 4,
    /** From this level the macroscopic observation line shows. */
    observationFromLevel: 3,
  },
} as const;

// -------------------------------------------------------------
// OPTION 2: "Gentle" (More support, shorter wait for help)
// -------------------------------------------------------------
const OPTION_2_GENTLE = {
  gameId: 'reaction-balancer',
  levels: {
    reactionsPerLevel: 3,
    maxLevel: 4,
    challengeLevel: 5,
    difficultyByLevel: ['intro', 'beginner', 'intermediate', 'advanced'],
    challengeDistractors: 2,
  },
  mechanics: {
    pointsPerLevelMultiplier: 100,
    lowestTermsBonus: 50,
    coachAfterSeconds: 15,
    stuckAfterSeconds: 45,
    maxCoefficient: 10,
  },
  visuals: {
    showClustersUntilLevel: 3,
    coachOnByDefaultUntilLevel: 3,
    highlightNextElementUntilLevel: 2,
    ledgerHiddenFromLevel: 5,
    observationFromLevel: 3,
  },
} as const;

// -------------------------------------------------------------
// OPTION 3: "Exam prep" (Less scaffolding, longer levels)
// -------------------------------------------------------------
const OPTION_3_EXAM_PREP = {
  gameId: 'reaction-balancer',
  levels: {
    reactionsPerLevel: 4,
    maxLevel: 4,
    challengeLevel: 5,
    difficultyByLevel: ['intro', 'beginner', 'intermediate', 'advanced'],
    challengeDistractors: 4,
  },
  mechanics: {
    pointsPerLevelMultiplier: 100,
    lowestTermsBonus: 75,
    coachAfterSeconds: 45,
    stuckAfterSeconds: 120,
    maxCoefficient: 12,
  },
  visuals: {
    showClustersUntilLevel: 1,
    coachOnByDefaultUntilLevel: 1,
    highlightNextElementUntilLevel: 1,
    ledgerHiddenFromLevel: 3,
    observationFromLevel: 2,
  },
} as const;

export const REACTION_BALANCER_PRESETS = { OPTION_1_CLASSROOM, OPTION_2_GENTLE, OPTION_3_EXAM_PREP } as const;

// CHANGE THIS ONE EXPORT TO SWITCH PRESETS:
export const REACTION_BALANCER_CONFIG = OPTION_1_CLASSROOM;

export type ReactionBalancerConfig = typeof REACTION_BALANCER_CONFIG;
