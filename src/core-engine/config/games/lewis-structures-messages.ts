// src/core-engine/config/games/lewis-structures-messages.ts
//
// Every string a player reads in Share to Fill. Keys follow the message
// catalogue in docs/game-briefs/lewis-structures.md (rev 3, plus the
// "Catalogue additions" section added during the build). Edit wording here;
// nothing player-facing is written in JSX.
//
// Reading age ~12, one idea per sentence, British spelling. Never a bare
// "wrong": every error message says what is off and what to try.

import type { LewisErrorType } from '@/core-engine/types/chemistry';

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

export const LEWIS_MESSAGES = {
  hub: {
    title: 'Share to Fill',
    description: 'Pair up the loners to build a molecule.',
  },

  header: {
    subtitle: 'Share to Fill',
    build: (name: string, formula: string) => `Build: ${name.toLowerCase()} (${formula})`,
    inspect: (name: string, formula: string) => `Check: ${name.toLowerCase()} (${formula})`,
    progress: (round: number, total: number) => `Molecule ${round}/${total}`,
    marking: (round: number, total: number) => `Drawing ${round}/${total}`,
  },

  // --- Instructions (auto-open on first play) -------------------------------
  instructions: {
    title: 'How to Play: Share to Fill',
    lead: 'Pair up the loners.',
    intro:
      'Every atom brings its outer electrons as dots. A dot on its own is a loner — it wants a partner. Two loners from two different atoms make a shared pair, which is a bond.',
    bullets: [
      'Drag a pulsing dot onto a pulsing dot on another atom (or tap one, then the other).',
      'An atom is full when it has 8 dots around it — hydrogen is full at 2.',
      "Share twice between the same two atoms and you've made a double bond.",
      'The structure locks itself when every atom is full and no loners are left. No button needed.',
      'Stuck? Press the lightbulb (or H). The first hint is always free.',
    ],
    disclaimer: 'The dots show how many outer electrons an atom has — not where they really are.',
    keyboardTitle: 'Keyboard & mouse',
    keyboard: [
      ['Tab', 'selects an atom'],
      ['← →', 'picks one of its loners'],
      ['Enter', 'starts a pair; Tab + Enter on another atom finishes it'],
      ['Esc', 'cancels'],
      ['H', 'hint'],
      ['P', 'pause'],
    ] as const,
    touchTitle: 'Touchscreen',
    touch: [
      ['Tap', 'a loner, then tap a loner on another atom.'],
      ['Tap', 'a shared pair to undo it.'],
    ] as const,
    glossaryTitle: 'Words the game uses',
  },

  // --- Guided first molecules (shown once each) -----------------------------
  guided: {
    stepLabel: (step: number, total: number) => `Guided step ${step} of ${total}`,
    h2: [
      'Two hydrogen atoms. Each has 1 outer electron — a loner. Drag one onto the other.',
      "They now share a pair. Count around each H: 2. Hydrogen is full at 2 — that's a single bond, H–H.",
    ],
    h2o: {
      step1: 'Oxygen has 6 outer electrons: two pairs (they stay put) and two loners (they pulse).',
      step2: 'Pair one oxygen loner with a hydrogen loner.',
      step2After: 'Oxygen now has 7 around it — one more to go.',
      step3: 'Pair the other oxygen loner with the other hydrogen.',
      step4: "Oxygen: 8. Each hydrogen: 2. Two shared pairs and two lone pairs — that's water, H–O–H.",
    },
  },

  // --- Coach panel -----------------------------------------------------------
  coach: {
    label: 'Coach',
    loners: (atom: string, n: number) =>
      `${atom} still has ${plural(n, 'loner', 'loners')}. Loners pair with loners on another atom.`,
    needsMore: (atom: string, count: number) =>
      `${atom} has ${count} of 8. It needs another shared pair — which atom still has a loner?`,
    shareAgain: (atom1: string, atom2: string) =>
      `${atom1} and ${atom2} both still have a loner. They can share again — that makes a double bond.`,
    complete: (name: string, bonds: number, lonePairs: number) =>
      `Every atom is full and no loners are left. This is ${name.toLowerCase()}: ${plural(bonds, 'shared pair', 'shared pairs')}, ${plural(lonePairs, 'lone pair', 'lone pairs')}.`,
    sameGroup: (element: string, analogue: string, analogueMolecule: string) =>
      `${element} is in the same group as ${analogue.toLowerCase()}, so it has the same number of outer electrons. Expect the same structure as ${analogueMolecule.toLowerCase()}.`,
    central: 'The atom with the most loners usually goes in the middle.',
    // Catalogue additions (see the brief): situations the build can reach that rev 3 did not name.
    deadEnd: (atom: string, count: number) =>
      `${atom} has ${count} of 8, but no other atom has a loner left to share. Tap a shared pair to undo it, then try a different partner.`,
    isomer: (name: string) =>
      `Every atom is full, but the atoms are joined up differently from ${name.toLowerCase()}. Tap a shared pair to undo it and try another arrangement.`,
  },

  // --- Hint ladder -------------------------------------------------------------
  hint: {
    label: 'Hint',
    tierLabel: (tier: number) => `Hint ${tier} of 3`,
    tier1: 'Look for the atoms that still have pulsing dots.',
    // tier2 comes from the molecule's `tier2Hint` in lewis-molecules.ts
    tier3: (atom1: string, atom2: string) => `Pair the loner on ${atom1.toLowerCase()} with the loner on ${atom2.toLowerCase()}.`,
    // Catalogue additions.
    tier3Undo: (atom1: string, atom2: string) =>
      `Tap the shared pair between ${atom1.toLowerCase()} and ${atom2.toLowerCase()} to undo it.`,
    offerTier2: 'Still stuck? Press the lightbulb again for the strategy.',
    noMoreHints: 'That was the last hint. Every atom is full — press Next.',
    inspect: {
      tier1: 'Count the dots around each atom. Every atom should have 8 — hydrogen 2.',
      tier2: 'Check the atoms with the most bonds first. That is where extra or missing pairs hide.',
      tier3: (atom: string, count: number) => `${atom} has ${count}. Tap it, then choose what is wrong.`,
      tier3Correct: "Every atom is full and nothing is left over — press 'This one is correct'.",
      tier3Repair: 'Pair up the loners until every atom is full again.',
      tier3Count: (kind: 'bonds' | 'lonePairs', actual: number) =>
        kind === 'bonds'
          ? `Every line between two atoms is one bond. There ${actual === 1 ? 'is' : 'are'} ${actual}.`
          : `Every pair of dots that is not on a line is a lone pair. There ${actual === 1 ? 'is' : 'are'} ${actual}.`,
    },
  },

  // --- Wrong or unproductive moves --------------------------------------------
  error: {
    label: 'Not that move',
    atomFull: (atom: string) =>
      `${atom} already has 8 — it can't share any more. Try an atom that still has a loner.`,
    hydrogenFull: 'Hydrogen is full at 2. It can only share one pair.',
    sameAtom: "Those two dots are on the same atom — they're already a pair. A bond needs two different atoms.",
    pairedDot: 'That dot is already part of a pair. Only loners (the pulsing ones) can be shared.',
  },

  // --- Inspect mode (fix a classmate's drawing) --------------------------------
  inspect: {
    classmate: (name: string) => `Drawn by a classmate: ${name.toLowerCase()}.`,
    prompt: "Tap the atom you think is wrong — or say the drawing is correct.",
    diagnosisPrompt: (atom: string) => `What is wrong with ${atom.toLowerCase()}?`,
    diagnosis: {
      tooMany: 'too many electrons around this atom',
      tooFew: 'too few — a lone pair is missing',
      hydrogenFull: 'hydrogen can only share one pair',
      needsDouble: 'these atoms need to share twice (a double bond)',
      leftover: 'an unpaired electron was left over',
      none: 'no error',
    } satisfies Record<LewisErrorType, string>,
    wrongAtom: (atom: string, count: number) =>
      `${atom} has ${count} — that one's fine. Check an atom with too few or too many.`,
    wrongDiagnosis: (atom: string, count: number, explanation: string) =>
      `Not quite. Count the dots around ${atom.toLowerCase()}: ${count}. ${explanation}`,
    explain: {
      tooMany: (atom: string, full: number) => `${atom} has more than ${full} — an extra lone pair was drawn.`,
      tooFew: (atom: string) => `${atom} has fewer than 8 — a lone pair is missing.`,
      hydrogenFull: 'Hydrogen has 4 — it can only share one pair.',
      needsDouble: (atom1: string, atom2: string) =>
        `${atom1} and ${atom2.toLowerCase()} each still have a loner — they need to share twice.`,
      leftover: (atom: string) => `${atom} has a loner left over — an extra electron was drawn.`,
    },
    correctStructure: 'Right — every atom is full and nothing is left over.',
    missedCorrect: 'This one is actually correct: every atom is full. Not every drawing has a mistake.',
    notCorrect: "Not quite — one atom isn't right. Count the dots around each atom and tap the one that's off.",
    repair: 'Now fix it: pair up the loners until every atom is full.',
    repaired: 'Fixed — every atom is full again.',
    countBonds: 'How many bonds are there? Tap each shared pair.',
    countLonePairs: "How many lone pairs? Tap each pair that isn't shared.",
    countWrong: (given: number, actual: number, mentionDouble: boolean) =>
      `You counted ${given}; there are ${actual}. The ones you missed are highlighted${
        mentionDouble ? ' — a double bond counts as one bond but two shared pairs.' : '.'
      }`,
    countRight: (kind: 'bonds' | 'lonePairs', actual: number) =>
      kind === 'bonds' ? `Yes — ${plural(actual, 'bond', 'bonds')}.` : `Yes — ${plural(actual, 'lone pair', 'lone pairs')}.`,
    countLabel: (kind: 'bonds' | 'lonePairs', n: number) =>
      kind === 'bonds' ? `Counted: ${plural(n, 'bond', 'bonds')}` : `Counted: ${plural(n, 'lone pair', 'lone pairs')}`,
  },

  // --- Success -----------------------------------------------------------------
  success: {
    label: 'Complete',
    round: (name: string, bondLine: string) => `${name} complete — ${bondLine}.`,
    bonus: (points: number) => `No-hint bonus +${points}`,
    points: (points: number) => `+${points}`,
  },

  // --- Overlays (GameOverlay customMessages) -----------------------------------
  overlay: {
    levelUp: {
      badge: 'All atoms full',
      title: 'Level cleared',
      subtitle: 'Every loner paired',
      description: (nextLevel: number, whatChanges: string) => `Level ${nextLevel}: ${whatChanges}`,
    },
    levelChanges: {
      2: 'oxygen, nitrogen and carbon bring lone pairs that stay put, and every third molecule is a classmate\'s drawing to check.',
      3: 'some atoms need to share twice — a double bond. The coach now waits until you ask.',
      4: 'atoms start unplaced. You choose which one goes in the middle.',
      5: 'marking mode — six classmate drawings, no coach, hint ladder only.',
    } as Record<number, string>,
    victory: {
      badge: 'All objectives complete',
      title: 'Lewis structures mastered',
      subtitle: 'Every loner paired',
      description: 'Open your marking sheet, or try Bond Builder next.',
    },
    paused: {
      badge: 'Session on hold',
      title: 'Game Paused',
      subtitle: 'Nothing is timed.',
      description: 'Your structure is exactly where you left it.',
    },
  },

  // --- End summary ---------------------------------------------------------------
  notebook: {
    header: 'Your structures',
    markingHeader: 'Your marking sheet',
    columns: {
      molecule: 'Molecule',
      bondLine: 'Bond-line',
      counts: 'Bonds / lone pairs',
      hint: 'Hint tier',
      diagnosis: 'Diagnosis',
    },
    noHint: 'no hints',
    hintTier: (tier: number) => `tier ${tier}`,
    diagnosisRow: (label: string, firstTry: boolean) => `${label}${firstTry ? ' — first try' : ''}`,
    empty: 'No structures yet.',
  },

  // --- Glossary (tap-to-explain) -------------------------------------------------
  glossary: {
    'outer (valence) electron': 'an electron in the outside shell — the ones an atom shares',
    'loner (unpaired electron)': 'an outer electron without a partner; only loners can be shared',
    'lone pair': 'two outer electrons that stay on one atom and are not shared',
    'shared pair / bond': 'two electrons, one from each atom, shared between them — drawn as a line',
    'single / double / triple bond': 'one, two or three shared pairs between the same two atoms',
    octet: 'eight outer electrons around an atom — full',
    duet: 'two outer electrons around hydrogen — full',
    dot: 'shows how many outer electrons, not where they are',
  } as Record<string, string>,
  /** Words in running text that open each glossary entry (tap-to-explain). */
  glossaryMatches: {
    'outer (valence) electron': ['outer electrons', 'outer electron', 'valence electrons', 'valence electron'],
    'loner (unpaired electron)': ['loners', 'loner', 'unpaired electrons', 'unpaired electron'],
    'lone pair': ['lone pairs', 'lone pair'],
    'shared pair / bond': ['shared pairs', 'shared pair', 'bonds', 'bond'],
    'single / double / triple bond': ['single bond', 'double bond', 'triple bond'],
    octet: ['octet'],
    duet: ['duet'],
    dot: ['dots', 'dot'],
  } as Record<string, string[]>,

  // --- Buttons, labels and accessible names ----------------------------------------
  ui: {
    nextMolecule: 'Next molecule',
    nextDrawing: 'Next drawing',
    finishLevel: 'Finish level',
    skipGuide: 'Skip guide',
    nextStep: 'Next',
    thisOneIsCorrect: 'This one is correct',
    doneCounting: 'Done counting',
    startRepair: 'Fix it',
    openMarkingSheet: 'Open marking sheet',
    closeMarkingSheet: 'Back',
    playAgain: 'Play again',
    supportMode: 'Support mode',
    supportModeHelp: 'Keeps the coach panel open on every level. Never lowers your accuracy.',
    hintButton: 'Get Hint',
    coachRegion: 'Coach messages',
    canvasLabel: (name: string) => `Dot structure of ${name.toLowerCase()}`,
    atom: {
      name: (elementName: string, count: number, full: number) => `${elementName}: ${count} of ${full}`,
      counter: (symbol: string, count: number, full: number) => `${symbol}: ${count} of ${full}`,
      loner: (elementName: string, index: number, total: number) => `${elementName}, loner ${index} of ${total}`,
      lonePair: (elementName: string, index: number, total: number) => `${elementName}, lone pair ${index} of ${total}`,
      lonerLabel: 'loner',
      full: 'full',
      selectedForPairing: (elementName: string) => `${elementName} loner selected. Now choose a loner on another atom.`,
      inspectTap: (elementName: string) => `${elementName} — tap if this atom is wrong`,
    },
    bond: {
      name: (a: string, b: string, order: number) =>
        `${order === 3 ? 'Triple' : order === 2 ? 'Double' : 'Single'} bond between ${a.toLowerCase()} and ${b.toLowerCase()}`,
      undo: 'press to undo the last shared pair',
      count: 'press to count',
      counted: 'counted',
    },
    live: {
      paired: (a: string, b: string, countA: number, countB: number) =>
        `Shared pair made between ${a.toLowerCase()} and ${b.toLowerCase()}. ${a} now has ${countA}; ${b} has ${countB}.`,
      unpaired: (a: string, b: string) => `Shared pair between ${a.toLowerCase()} and ${b.toLowerCase()} undone.`,
      locked: (name: string) => `${name} complete. The structure is locked.`,
    },
  },
} as const;

export type LewisMessages = typeof LEWIS_MESSAGES;

/** Element display names used in messages: "Oxygen", or "Hydrogen 1" / "Hydrogen 2" when a molecule has several. */
export const atomLabel = (elementName: string, ordinal?: number) =>
  ordinal ? `${elementName} ${ordinal}` : elementName;
