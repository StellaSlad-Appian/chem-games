// src/core-engine/config/games/reaction-balancer-messages.ts
//
// Every string a player reads in Reaction Balancer, in English. This is the
// canonical text: each other locale is a file in
// src/i18n/game-messages/reaction-balancer/ that `satisfies
// ReactionBalancerMessages`, so a missing or misspelled key is a compile error.
//
// It is a per-game catalogue rather than a namespace in the shared dictionary
// because the dictionary is serialized into the RSC payload of *every* page —
// including pages with no game on them. This file is loaded by the Reaction
// Balancer page and nothing else. See docs/i18n/GAMES.md § Catalogue layout.
//
// The functions that turn these templates into the calls components make
// (`M.coach.imbalance(element, left, right)`) live next to the loader, in
// src/i18n/game-messages/reaction-balancer/index.ts. Keeping this file free of
// runtime imports is deliberate: scripts/i18n-review.mts reads it under Node's
// type stripping, which erases `import type` and resolves nothing else.
//
// Conventions whoever edits or translates this should know:
//   * Reading age ~12, one idea per sentence. Never a bare "wrong": every error
//     message says what is off and what to try.
//   * A formula or equation inside `backticks` is typeset by MoleculeText
//     (real subscripts, arrows and state symbols), so write plain ASCII:
//     `H2O`, `2H2(g) + O2(g) -> 2H2O(l)`. Never Unicode subscripts. The parity
//     test asserts these come through byte-identical in every locale.
//   * Text inside **double stars** is bold.
//   * Interpolation is `{name}` and nothing else.
//   * A count-dependent string is a record keyed by CLDR plural category, never
//     a `…One` / `…Other` pair — see src/i18n/format.ts.
//   * Glossary words become tap-to-explain wherever they appear in running
//     text. Each locale lists its own word forms in `glossary.<entry>.matches`.
//     The matcher uses `\p{L}` lookarounds under the `u` flag, so a match word
//     must start and end with a letter in any script — see
//     docs/i18n/glossary-de.md.
//   * Terminology follows docs/i18n/glossary-<locale>.md.

import type { Translated } from '@/i18n/format';
import type { ReactionType } from '@/core-engine/data/reactions';

export const REACTION_BALANCER_MESSAGES = {
  header: {
    subtitle: 'Reaction Balancer',
    balance: 'Balance: {name}',
    build: 'Build and balance: {name}',
    progress: 'Reaction {round}/{total}',
    challengeProgress: 'Challenge {round}/{total}',
  },

  instructions: {
    title: 'How to Play: Reaction Balancer',
    lead: 'Make the atoms match.',
    intro:
      'In a chemical reaction atoms are rearranged, never made or lost — so both sides of the arrow must have the same number of each atom.',
    bullets: [
      'The **big numbers** in front of a formula are coefficients. You change those.',
      'The **small numbers** inside a formula are subscripts. They are locked — changing them would make a different substance.',
      'The **atom ledger** under the arrow counts each element on the left and right. Make every row equal and the equation locks.',
      'Stuck? Press the **lightbulb** (or H). The first hint is always free.',
    ],
    arrow: 'The arrow means "makes" or "becomes", not "equals".',
    /** Column 1 is the physical key and is never translated. */
    keyboard: [
      ['Tab', 'moves between compounds'],
      ['↑ / ↓', 'change a coefficient'],
      ['0–9', 'type a number directly'],
      ['H', 'hint'],
      ['P', 'pause'],
    ],
    touch: [
      ['Tap', '▲ / ▼ on a card to change a coefficient.'],
      ['Tap', 'the number to type one.'],
    ],
    glossaryTitle: 'Words the game uses',
  },

  /** The guided walk-through of the first reaction, `2H2 + O2 -> 2H2O`. */
  guided: {
    stepLabel: 'Guided step {step} of {total}',
    steps: [
      'Look at the ledger. Hydrogen: 2 on the left, 2 on the right — balanced. Oxygen: 2 on the left, 1 on the right. Oxygen needs fixing.',
      "We can't change the small 2 in `O2` — that would make a different substance. So add more water instead. Press ▲ on `H2O`.",
      'Oxygen is now 2 and 2. But look — hydrogen changed: 2 on the left, 4 on the right. Balancing one element can unbalance another. Press ▲ on `H2`.',
      'Every row matches: 4 H and 2 O on each side. The equation is balanced — `2H2 + O2 -> 2H2O`. You just conserved mass.',
    ],
  },

  coach: {
    label: 'Coach',
    imbalance:
      '{element}: {left} on the left, {right} on the right. Which compound with {elementInSentence} could you change?',
    multiple:
      'That fixed {fixed}, but {broken} changed. Balancing one element can unbalance another — check {broken} next.',
    balanced: 'Every row matches. Mass is conserved.',
    balancedNotLowest:
      'Balanced — and every coefficient can be divided by {k}. The simplest form is `{equation}`.',
  },

  hint: {
    label: 'Hint',
    tierLabel: 'Hint {tier} of 3',
    tier1: 'Start with the element that appears in the fewest compounds. Here that is {element}.',
    // Tier 2 is the reaction's own hint, translated in chemistry-names/.
    tier3: 'Put a {n} in front of `{formula}`. Then check {element} again.',
    tier3Lower: 'Take `{formula}` back to {n}. Then check {element} again.',
    tier3Balanced: 'Every row already matches — the equation is balanced.',
    tier1Build:
      'Read the description again. It names every substance you start with and every substance that is made.',
    tier2Build:
      'Substances before "reacts", "burns" or "decomposes" are reactants. Substances after "to form", "produce" or "into" are products.',
    tier3BuildReactant: 'Add {name} (`{formula}`) as a reactant.',
    tier3BuildProduct: 'Add {name} (`{formula}`) as a product.',
  },
  stuck: {
    offer: 'Want a bigger hint? Press the lightbulb again.',
  },

  error: {
    label: 'Not that move',
    zero: "A coefficient can't be 0 — that would remove `{formula}` from the reaction.",
    max: 'Coefficients this big are a sign to try smaller numbers. Aim for the simplest ratio.',
    subscriptTap:
      'Subscripts are locked. `H2O2` is hydrogen peroxide, not water — change the big number instead.',
    notANumber: 'Coefficients are whole numbers from 1 upwards. Type a number, or use ▲ and ▼.',
  },

  /** The Challenge level: build the equation from a word equation first. */
  challenge: {
    label: 'Challenge',
    intro: 'Read the description, then build the equation before you balance it.',
    pickerLabel: 'Compounds',
    sideLabel: 'Add to',
    reactants: 'Reactants',
    products: 'Products',
    placeholderReactant: 'add a reactant',
    placeholderProduct: 'add a product',
    notInReaction:
      '{name} is not part of this reaction. Read the description again — which substances does it name?',
    wrongSideProduct:
      '{name} is made in this reaction, so it belongs on the right of the arrow — it is a product.',
    wrongSideReactant:
      '{name} is used up in this reaction, so it belongs on the left of the arrow — it is a reactant.',
    built: 'That is the equation. Now balance it.',
    addAsReactantA11y: 'Add {name}, {formula}, as a reactant',
    addAsProductA11y: 'Add {name}, {formula}, as a product',
    removeA11y: 'Remove {name}, {formula}',
    tileA11y: '{name}, {formula}',
  },

  success: {
    label: 'Balanced',
    round: 'Balanced! `{equation}`',
    points: '+{points}',
    bonus: 'Lowest-terms bonus +{points}',
  },

  overlay: {
    levelUpBadge: 'Mass conserved',
    levelUpTitle: 'Level cleared',
    levelUpSubtitle: 'Every atom accounted for',
    levelUpDescription: 'Level {level} adds {changes}.',
    /** What each level adds, following the reaction levels in reactions.ts. */
    levelChanges: {
      level2: 'reactions where fixing one element unbalances another, and the next-row highlight is gone',
      level3:
        'polyatomic ions, the first brackets and four-compound reactions; the coach waits until you ask and the clusters give way to formulas',
      level4:
        'bigger hydrocarbons and four-compound double displacements; the ledger stays hidden until you open it',
    },
    victoryBadge: 'All objectives complete',
    victoryTitle: 'Balancing mastered',
    victorySubtitle: 'Every atom accounted for',
    victoryDescription: 'Try the Challenge level, or open your lab notebook.',
    challengeBadge: 'Challenge complete',
    challengeTitle: 'Equations built and balanced',
    challengeSubtitle: 'From words to symbols',
    challengeDescription: 'Open your lab notebook to see every equation you balanced.',
    pausedBadge: 'Session on hold',
    pausedTitle: 'Game Paused',
    pausedSubtitle: 'Nothing is timed.',
    pausedDescription: 'Your coefficients are exactly where you left them.',
  },

  notebook: {
    header: 'Your balanced equations',
    columnHint: 'Hint tier',
    columnPoints: 'Points',
    noHint: 'no hints',
    hintTier: 'tier {tier}',
    lowestTerms: 'lowest terms first go',
    simplified: 'simplified by {k}',
    challenge: 'built from words',
    empty: 'No equations yet.',
  },

  ledger: {
    title: 'Atom ledger',
    left: 'Left',
    right: 'Right',
    statusA11y: 'Status',
    row: '{element}: {left} left, {right} right',
    balancedRow: 'balanced',
    needsMoreLeft: '{count} more needed on the left',
    needsMoreRight: '{count} more needed on the right',
    allBalanced: 'Every row matches.',
    show: 'Show atom ledger',
    hide: 'Hide atom ledger',
    showCost: 'Opening the ledger on this level costs the lowest-terms bonus.',
    nextUp: 'balance this row next',
  },
  beam: {
    label: 'Relative mass in / out',
    readout: 'Relative mass: {left} in, {right} out.',
    level: 'The beam is level.',
    tipsLeft: 'The beam tips to the left.',
    tipsRight: 'The beam tips to the right.',
  },
  card: {
    coefficientA11y: 'Coefficient for {name}, {formula}',
    increaseA11y: 'Add one {name}',
    decreaseA11y: 'Remove one {name}',
    formulaTapA11y: '{name} — the subscripts are locked',
    clustersA11y: { one: '{count} molecule of {name}', other: '{count} molecules of {name}' },
    reactants: 'Reactants',
    products: 'Products',
  },

  /**
   * Tap-to-explain vocabulary. `term` is the pop-over heading, `matches`
   * are the words in running text that open it — so the matches must be
   * the exact word forms this locale's copy actually uses.
   */
  glossary: {
    coefficient: {
      term: 'coefficient',
      definition: 'the big number in front of a formula; it multiplies the whole molecule',
      matches: ['coefficients', 'coefficient'],
    },
    subscript: {
      term: 'subscript',
      definition: 'the small number inside a formula; it says how many atoms are in one molecule',
      matches: ['subscripts', 'subscript'],
    },
    reactant: {
      term: 'reactant',
      definition: 'what you start with (left of the arrow)',
      matches: ['reactants', 'reactant'],
    },
    product: {
      term: 'product',
      definition: 'what is made (right of the arrow)',
      matches: ['products', 'product'],
    },
    conserved: {
      term: 'conserved',
      definition: 'kept the same — atoms are never made or lost in a reaction',
      matches: ['conserved', 'conserve'],
    },
    stateSymbols: {
      term: '(s) (l) (g) (aq)',
      definition: 'solid, liquid, gas, dissolved in water',
      matches: ['state symbols', 'state symbol'],
    },
  },

  ui: {
    nextReaction: 'Next reaction',
    finishLevel: 'Finish level',
    skipGuide: "I've done this before",
    nextStep: 'Next',
    tryChallenge: 'Try the Challenge level',
    openNotebook: 'Open lab notebook',
    closeNotebook: 'Back',
    playAgain: 'Play again',
    supportMode: 'Support mode',
    supportModeHelp:
      'Keeps the coach strip and the ledger on at every level. Never lowers your accuracy.',
    hintButtonA11y: 'Get Hint',
    dismissHintA11y: 'Dismiss hint',
    coachRegionA11y: 'Coach messages',
    observation: 'What you would see',
    equationLabelA11y: 'Equation for {name}',
    liveChanged: '{name} is now {n}.',
    liveLocked: 'Balanced. {equation}. The equation is locked.',
    liveBuilt: 'Equation built. Now balance it.',
  },

  /**
   * The reaction-class badge above the equation.
   *
   * Keyed by the `ReactionType` union in src/core-engine/data/reactions.ts,
   * so adding a ninth class is a compile error in all five catalogues rather
   * than a badge that silently renders the raw English value — which is
   * exactly what it did before this namespace existed. GameArena rendered
   * `{round.reaction.type}` straight from the dataset, so every non-English
   * page read "SYNTHESIS" (the badge is CSS-uppercased) above a fully
   * translated equation. One of three untranslated-English strings that
   * shipped and were found only by a human looking at a rendered page.
   *
   * Sentence case here, uppercased by CSS: the class names are common nouns,
   * not proper ones, and a locale that should not shout has only to change
   * the rule.
   */
  reactionType: {
    Synthesis: 'Synthesis',
    Decomposition: 'Decomposition',
    'Single Replacement': 'Single Replacement',
    'Double Replacement': 'Double Replacement',
    Combustion: 'Combustion',
    'Acid-Base': 'Acid-Base',
    Redox: 'Redox',
    Precipitation: 'Precipitation',
  },
} as const;

/**
 * The shape every locale must provide. Derived from the English so the two
 * cannot drift: adding a key above makes every other locale fail to compile
 * until it is translated.
 */
export type ReactionBalancerMessages = Translated<typeof REACTION_BALANCER_MESSAGES>;

/**
 * Ties the badge labels to the dataset's own union, in the type system rather
 * than in a comment. A reaction class added to `ReactionType` without a label
 * fails to compile here; a label for a class that no longer exists fails too.
 *
 * Written as a standalone assertion rather than by typing the object above as
 * `Record<ReactionType, string>`, because that annotation would widen the
 * literal types `as const` produces and `Translated<>` needs them.
 */
const _reactionTypeLabelsAreExhaustive: Record<
  ReactionType,
  string
> = REACTION_BALANCER_MESSAGES.reactionType;
void _reactionTypeLabelsAreExhaustive;
