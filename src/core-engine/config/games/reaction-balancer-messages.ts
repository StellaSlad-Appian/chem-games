// src/core-engine/config/games/reaction-balancer-messages.ts
//
// Every string a player reads in Reaction Balancer. Keys follow the message
// catalogue in docs/game-briefs/reaction-balancer.md (rev 2, plus the
// "Catalogue additions" section added during the build). Edit wording here;
// nothing player-facing is written in JSX.
//
// Conventions a teacher editing this file should know:
//   * Reading age ~12, one idea per sentence, British spelling. Never a bare
//     "wrong": every error message says what is off and what to try.
//   * A formula or equation inside `backticks` is typeset by MoleculeText
//     (real subscripts, arrows and state symbols), so write plain ASCII:
//     `H2O`, `2H2(g) + O2(g) -> 2H2O(l)`. Never Unicode subscripts.
//   * Text inside **double stars** is bold.
//   * Glossary words (coefficient, subscript, reactant, product, conserved,
//     the state symbols) become tap-to-explain automatically wherever they
//     appear in running text.

const eq = (equation: string) => `\`${equation}\``;

export const REACTION_BALANCER_MESSAGES = {
  hub: {
    title: 'Reaction Balancer',
    description: 'Make the atoms match on both sides of the arrow.',
  },

  header: {
    subtitle: 'Reaction Balancer',
    balance: (name: string) => `Balance: ${name}`,
    build: (name: string) => `Build and balance: ${name}`,
    progress: (round: number, total: number) => `Reaction ${round}/${total}`,
    challengeProgress: (round: number, total: number) => `Challenge ${round}/${total}`,
  },

  // --- Instructions (auto-open on first play) -------------------------------
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
    keyboardTitle: 'Keyboard & mouse',
    keyboard: [
      ['Tab', 'moves between compounds'],
      ['↑ / ↓', 'change a coefficient'],
      ['0–9', 'type a number directly'],
      ['H', 'hint'],
      ['P', 'pause'],
    ] as const,
    touchTitle: 'Touchscreen',
    touch: [
      ['Tap', '▲ / ▼ on a card to change a coefficient.'],
      ['Tap', 'the number to type one.'],
    ] as const,
    glossaryTitle: 'Words the game uses',
  },

  // --- Guided first reaction (Level 1, reaction 1: H2 + O2 -> H2O) ---------
  guided: {
    stepLabel: (step: number, total: number) => `Guided step ${step} of ${total}`,
    steps: [
      'Look at the ledger. Hydrogen: 2 on the left, 2 on the right — balanced. Oxygen: 2 on the left, 1 on the right. Oxygen needs fixing.',
      "We can't change the small 2 in `O2` — that would make a different substance. So add more water instead. Press ▲ on `H2O`.",
      'Oxygen is now 2 and 2. But look — hydrogen changed: 2 on the left, 4 on the right. Balancing one element can unbalance another. Press ▲ on `H2`.',
      'Every row matches: 4 H and 2 O on each side. The equation is balanced — `2H2 + O2 -> 2H2O`. You just conserved mass.',
    ] as const,
  },

  // --- Coach strip -------------------------------------------------------------
  coach: {
    label: 'Coach',
    imbalance: (element: string, left: number, right: number) =>
      `${element}: ${left} on the left, ${right} on the right. Which compound with ${element.toLowerCase()} could you change?`,
    multiple: (fixed: string, broken: string) =>
      `That fixed ${fixed.toLowerCase()}, but ${broken.toLowerCase()} changed. Balancing one element can unbalance another — check ${broken.toLowerCase()} next.`,
    balanced: 'Every row matches. Mass is conserved.',
    balancedNotLowest: (k: number, equation: string) =>
      `Balanced — and every coefficient can be divided by ${k}. The simplest form is ${eq(equation)}.`,
  },

  // --- Hint ladder -------------------------------------------------------------
  hint: {
    label: 'Hint',
    tierLabel: (tier: number) => `Hint ${tier} of 3`,
    tier1: (element: string) =>
      `Start with the element that appears in the fewest compounds. Here that is ${element.toLowerCase()}.`,
    // tier2 is the reaction's `hint` in reactions.ts
    tier3: (n: number, formula: string, element: string) =>
      `Put a ${n} in front of ${eq(formula)}. Then check ${element.toLowerCase()} again.`,
    // Catalogue additions (see the brief).
    tier3Lower: (n: number, formula: string, element: string) =>
      `Take ${eq(formula)} back to ${n}. Then check ${element.toLowerCase()} again.`,
    tier3Balanced: 'Every row already matches — the equation is balanced.',
    tier1Build: 'Read the description again. It names every substance you start with and every substance that is made.',
    tier2Build: 'Substances before "reacts", "burns" or "decomposes" are reactants. Substances after "to form", "produce" or "into" are products.',
    tier3Build: (name: string, formula: string, side: 'reactant' | 'product') =>
      `Add ${name} (${eq(formula)}) as a ${side}.`,
  },
  stuck: {
    offer: 'Want a bigger hint? Press the lightbulb again.',
  },

  // --- Wrong or unproductive moves --------------------------------------------
  error: {
    label: 'Not that move',
    zero: (formula: string) => `A coefficient can't be 0 — that would remove ${eq(formula)} from the reaction.`,
    max: 'Coefficients this big are a sign to try smaller numbers. Aim for the simplest ratio.',
    subscriptTap: 'Subscripts are locked. `H2O2` is hydrogen peroxide, not water — change the big number instead.',
    // Catalogue addition.
    notANumber: 'Coefficients are whole numbers from 1 upwards. Type a number, or use ▲ and ▼.',
  },

  // --- Challenge level (build the equation from a word equation) ---------------
  // Catalogue additions: the brief names the mechanic but not its copy.
  challenge: {
    label: 'Challenge',
    intro: 'Read the description, then build the equation before you balance it.',
    prompt: (text: string) => text,
    pickerLabel: 'Compounds',
    sideLabel: 'Add to',
    reactants: 'Reactants',
    products: 'Products',
    placeholder: (side: 'reactant' | 'product') => (side === 'reactant' ? 'add a reactant' : 'add a product'),
    notInReaction: (name: string) =>
      `${name} is not part of this reaction. Read the description again — which substances does it name?`,
    wrongSide: (name: string, side: 'reactant' | 'product') =>
      side === 'product'
        ? `${name} is made in this reaction, so it belongs on the right of the arrow — it is a product.`
        : `${name} is used up in this reaction, so it belongs on the left of the arrow — it is a reactant.`,
    built: 'That is the equation. Now balance it.',
    addAs: (name: string, formula: string, side: 'reactant' | 'product') => `Add ${name}, ${formula}, as a ${side}`,
    remove: (name: string, formula: string) => `Remove ${name}, ${formula}`,
    tile: (name: string, formula: string) => `${name}, ${formula}`,
  },

  // --- Success -----------------------------------------------------------------
  success: {
    label: 'Balanced',
    round: (equation: string) => `Balanced! ${eq(equation)}`,
    points: (points: number) => `+${points}`,
    bonus: (points: number) => `Lowest-terms bonus +${points}`,
  },

  // --- Overlays (GameOverlay customMessages) -----------------------------------
  overlay: {
    levelUp: {
      badge: 'Mass conserved',
      title: 'Level cleared',
      subtitle: 'Every atom accounted for',
      description: (nextLevel: number, whatChanges: string) => `Level ${nextLevel} adds ${whatChanges}.`,
    },
    // Catalogue additions: what each level adds, following the reaction levels in reactions.ts.
    levelChanges: {
      2: 'reactions where fixing one element unbalances another, and the next-row highlight is gone',
      3: 'polyatomic ions, the first brackets and four-compound reactions; the coach waits until you ask and the clusters give way to formulas',
      4: 'bigger hydrocarbons and four-compound double displacements; the ledger stays hidden until you open it',
    } as Record<number, string>,
    victory: {
      badge: 'All objectives complete',
      title: 'Balancing mastered',
      subtitle: 'Every atom accounted for',
      description: 'Try the Challenge level, or open your lab notebook.',
    },
    // Catalogue addition.
    challengeComplete: {
      badge: 'Challenge complete',
      title: 'Equations built and balanced',
      subtitle: 'From words to symbols',
      description: 'Open your lab notebook to see every equation you balanced.',
    },
    paused: {
      badge: 'Session on hold',
      title: 'Game Paused',
      subtitle: 'Nothing is timed.',
      description: 'Your coefficients are exactly where you left them.',
    },
  },

  // --- End summary ---------------------------------------------------------------
  notebook: {
    header: 'Your balanced equations',
    columns: {
      reaction: 'Reaction',
      hint: 'Hint tier',
      points: 'Points',
    },
    noHint: 'no hints',
    hintTier: (tier: number) => `tier ${tier}`,
    lowestTerms: 'lowest terms first go',
    simplified: (k: number) => `simplified by ${k}`,
    challenge: 'built from words',
    empty: 'No equations yet.',
  },

  // --- Ledger, beam and cards (accessible text) ------------------------------------
  ledger: {
    title: 'Atom ledger',
    left: 'Left',
    right: 'Right',
    row: (element: string, left: number, right: number) => `${element}: ${left} left, ${right} right`,
    balancedRow: 'balanced',
    needsMore: (n: number, side: 'left' | 'right') => `${n} more needed on the ${side}`,
    allBalanced: 'Every row matches.',
    show: 'Show atom ledger',
    hide: 'Hide atom ledger',
    showCost: 'Opening the ledger on this level costs the lowest-terms bonus.',
    nextUp: 'balance this row next',
  },
  beam: {
    label: 'Relative mass in / out',
    readout: (left: number, right: number) => `Relative mass: ${left} in, ${right} out.`,
    level: 'The beam is level.',
    tips: (side: 'left' | 'right') => `The beam tips to the ${side}.`,
  },
  card: {
    coefficient: (name: string, formula: string) => `Coefficient for ${name}, ${formula}`,
    increase: (name: string) => `Add one ${name}`,
    decrease: (name: string) => `Remove one ${name}`,
    formulaTap: (name: string) => `${name} — the subscripts are locked`,
    clusters: (n: number, name: string) => `${n} ${n === 1 ? 'molecule' : 'molecules'} of ${name}`,
    reactants: 'Reactants',
    products: 'Products',
  },

  // --- Glossary (tap-to-explain) -------------------------------------------------
  glossary: {
    coefficient: 'the big number in front of a formula; it multiplies the whole molecule',
    subscript: 'the small number inside a formula; it says how many atoms are in one molecule',
    reactant: 'what you start with (left of the arrow)',
    product: 'what is made (right of the arrow)',
    conserved: 'kept the same — atoms are never made or lost in a reaction',
    '(s) (l) (g) (aq)': 'solid, liquid, gas, dissolved in water',
  } as Record<string, string>,
  /** Words in running text that open each glossary entry (tap-to-explain). */
  glossaryMatches: {
    coefficient: ['coefficients', 'coefficient'],
    subscript: ['subscripts', 'subscript'],
    reactant: ['reactants', 'reactant'],
    product: ['products', 'product'],
    conserved: ['conserved', 'conserve'],
    '(s) (l) (g) (aq)': ['state symbols', 'state symbol'],
  } as Record<string, string[]>,

  // --- Buttons, labels and accessible names ----------------------------------------
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
    supportModeHelp: 'Keeps the coach strip and the ledger on at every level. Never lowers your accuracy.',
    hintButton: 'Get Hint',
    dismissHint: 'Dismiss hint',
    coachRegion: 'Coach messages',
    observation: 'What you would see',
    equationLabel: (name: string) => `Equation for ${name}`,
    live: {
      changed: (name: string, n: number) => `${name} is now ${n}.`,
      locked: (equation: string) => `Balanced. ${equation}. The equation is locked.`,
      built: 'Equation built. Now balance it.',
    },
  },
} as const;

export type ReactionBalancerMessages = typeof REACTION_BALANCER_MESSAGES;
