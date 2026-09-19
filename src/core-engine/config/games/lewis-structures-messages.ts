// src/core-engine/config/games/lewis-structures-messages.ts
//
// Every string a player reads in Share to Fill, in English. This is the
// canonical text: each other locale is a file in
// src/i18n/game-messages/lewis-structures/ that `satisfies
// LewisStructuresMessages`, so a missing or misspelled key is a compile error.
//
// It is a per-game catalogue rather than a namespace in the shared dictionary
// because the dictionary is serialized into the RSC payload of *every* page —
// including pages with no game on them. This file is loaded by the Share to
// Fill page and nothing else. See docs/i18n/GAMES.md § Catalogue layout.
//
// The functions that turn these templates into the calls components make
// (`M.coach.loners(atom, n)`) live next to the loader, in
// src/i18n/game-messages/lewis-structures/index.ts. Keeping this file free of
// runtime imports is deliberate: scripts/i18n-review.mts reads it under Node's
// type stripping, which erases `import type` and resolves nothing else.
//
// Conventions whoever edits or translates this should know:
//   * Reading age ~12, one idea per sentence. Never a bare "wrong": every error
//     message says what is off and what to try.
//   * "Loner" is the game's own word for an unpaired outer electron. It is
//     introduced in the instructions and defined in the glossary, so each
//     locale picks a word of the same register rather than the textbook term —
//     German uses *Einzelelektron*, with *ungepaartes Elektron* as the formal
//     gloss and *einzeln* as the short canvas label.
//   * A formula inside `backticks` is typeset by MoleculeText, so write plain
//     ASCII. The parity test asserts it survives translation byte for byte.
//   * Interpolation is `{name}` and nothing else.
//   * A count-dependent string is a record keyed by CLDR plural category, never
//     a `…One` / `…Other` pair — see src/i18n/format.ts.
//   * Glossary words become tap-to-explain wherever they appear in running
//     text. Each locale lists its own word forms in `glossary.<entry>.matches`.
//     The matcher uses a JavaScript `\b`, which only knows ASCII letters, so a
//     match word must start and end with one — see docs/i18n/glossary-de.md.
//   * Terminology follows docs/i18n/glossary-<locale>.md.

import type { Translated } from '@/i18n/format';

export const LEWIS_STRUCTURES_MESSAGES = {
  header: {
    subtitle: 'Share to Fill',
    build: 'Build: {name} ({formula})',
    inspect: 'Check: {name} ({formula})',
    progress: 'Molecule {round}/{total}',
    marking: 'Drawing {round}/{total}',
  },

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
    /** Column 1 is the physical key and is never translated. */
    keyboard: [
      ['Tab', 'selects an atom'],
      ['← →', 'picks one of its loners'],
      ['Enter', 'starts a pair; Tab + Enter on another atom finishes it'],
      ['Esc', 'cancels'],
      ['H', 'hint'],
      ['P', 'pause'],
    ],
    touch: [
      ['Tap', 'a loner, then tap a loner on another atom.'],
      ['Tap', 'a shared pair to undo it.'],
    ],
    glossaryTitle: 'Words the game uses',
  },

  guided: {
    stepLabel: 'Guided step {step} of {total}',
    h2: [
      'Two hydrogen atoms. Each has 1 outer electron — a loner. Drag one onto the other.',
      "They now share a pair. Count around each H: 2. Hydrogen is full at 2 — that's a single bond, H–H.",
    ],
    h2oStep1: 'Oxygen has 6 outer electrons: two pairs (they stay put) and two loners (they pulse).',
    h2oStep2: 'Pair one oxygen loner with a hydrogen loner.',
    h2oStep2After: 'Oxygen now has 7 around it — one more to go.',
    h2oStep3: 'Pair the other oxygen loner with the other hydrogen.',
    h2oStep4:
      "Oxygen: 8. Each hydrogen: 2. Two shared pairs and two lone pairs — that's water, H–O–H.",
  },

  coach: {
    label: 'Coach',
    loners: {
      one: '{atom} still has {count} loner. Loners pair with loners on another atom.',
      other: '{atom} still has {count} loners. Loners pair with loners on another atom.',
    },
    needsMore: '{atom} has {count} of 8. It needs another shared pair — which atom still has a loner?',
    shareAgain:
      '{atom1} and {atom2} both still have a loner. They can share again — that makes a double bond.',
    complete: 'Every atom is full and no loners are left. This is {name}: {bonds}, {lonePairs}.',
    sameGroup:
      '{element} is in the same group as {analogue}, so it has the same number of outer electrons. Expect the same structure as {analogueMolecule}.',
    central: 'The atom with the most loners usually goes in the middle.',
    deadEnd:
      '{atom} has {count} of 8, but no other atom has a loner left to share. Tap a shared pair to undo it, then try a different partner.',
    isomer:
      'Every atom is full, but the atoms are joined up differently from {name}. Tap a shared pair to undo it and try another arrangement.',
  },

  /** Noun phrases counted inside a sentence, so each has its own plural. */
  counts: {
    sharedPairs: { one: '{count} shared pair', other: '{count} shared pairs' },
    lonePairs: { one: '{count} lone pair', other: '{count} lone pairs' },
    bonds: { one: '{count} bond', other: '{count} bonds' },
  },

  hint: {
    label: 'Hint',
    tierLabel: 'Hint {tier} of 3',
    tier1: 'Look for the atoms that still have pulsing dots.',
    // Tier 2 is the molecule's own hint, translated in chemistry-names/.
    tier3: 'Pair the loner on {atom1} with the loner on {atom2}.',
    tier3Undo: 'Tap the shared pair between {atom1} and {atom2} to undo it.',
    offerTier2: 'Still stuck? Press the lightbulb again for the strategy.',
    noMoreHints: 'That was the last hint. Every atom is full — press Next.',
    inspectTier1: 'Count the dots around each atom. Every atom should have 8 — hydrogen 2.',
    inspectTier2:
      'Check the atoms with the most bonds first. That is where extra or missing pairs hide.',
    inspectTier3: '{atom} has {count}. Tap it, then choose what is wrong.',
    inspectTier3Correct: "Every atom is full and nothing is left over — press 'This one is correct'.",
    inspectTier3Repair: 'Pair up the loners until every atom is full again.',
    inspectTier3CountBonds: {
      one: 'Every line between two atoms is one bond. There is {count}.',
      other: 'Every line between two atoms is one bond. There are {count}.',
    },
    inspectTier3CountLonePairs: {
      one: 'Every pair of dots that is not on a line is a lone pair. There is {count}.',
      other: 'Every pair of dots that is not on a line is a lone pair. There are {count}.',
    },
  },

  error: {
    label: 'Not that move',
    atomFull: "{atom} already has 8 — it can't share any more. Try an atom that still has a loner.",
    hydrogenFull: 'Hydrogen is full at 2. It can only share one pair.',
    sameAtom:
      "Those two dots are on the same atom — they're already a pair. A bond needs two different atoms.",
    pairedDot: 'That dot is already part of a pair. Only loners (the pulsing ones) can be shared.',
  },

  inspect: {
    classmate: 'Drawn by a classmate: {name}.',
    prompt: 'Tap the atom you think is wrong — or say the drawing is correct.',
    diagnosisPrompt: 'What is wrong with {atom}?',
    diagnosis: {
      tooMany: 'too many electrons around this atom',
      tooFew: 'too few — a lone pair is missing',
      hydrogenFull: 'hydrogen can only share one pair',
      needsDouble: 'these atoms need to share twice (a double bond)',
      leftover: 'an unpaired electron was left over',
      none: 'no error',
    },
    wrongAtom: "{atom} has {count} — that one's fine. Check an atom with too few or too many.",
    wrongDiagnosis: 'Not quite. Count the dots around {atom}: {count}. {explanation}',
    explainTooMany: '{atom} has more than {full} — an extra lone pair was drawn.',
    explainTooFew: '{atom} has fewer than 8 — a lone pair is missing.',
    explainHydrogenFull: 'Hydrogen has 4 — it can only share one pair.',
    explainNeedsDouble: '{atom1} and {atom2} each still have a loner — they need to share twice.',
    explainLeftover: '{atom} has a loner left over — an extra electron was drawn.',
    correctStructure: 'Right — every atom is full and nothing is left over.',
    missedCorrect:
      'This one is actually correct: every atom is full. Not every drawing has a mistake.',
    notCorrect:
      "Not quite — one atom isn't right. Count the dots around each atom and tap the one that's off.",
    repair: 'Now fix it: pair up the loners until every atom is full.',
    repaired: 'Fixed — every atom is full again.',
    countBonds: 'How many bonds are there? Tap each shared pair.',
    countLonePairs: "How many lone pairs? Tap each pair that isn't shared.",
    countWrong: 'You counted {given}; there are {actual}. The ones you missed are highlighted.',
    countWrongDouble:
      'You counted {given}; there are {actual}. The ones you missed are highlighted — a double bond counts as one bond but two shared pairs.',
    countRight: 'Yes — {counted}.',
    countLabel: 'Counted: {counted}',
  },

  success: {
    label: 'Complete',
    round: '{name} complete — {bondLine}.',
    bonus: 'No-hint bonus +{points}',
    points: '+{points}',
  },

  overlay: {
    levelUpBadge: 'All atoms full',
    levelUpTitle: 'Level cleared',
    levelUpSubtitle: 'Every loner paired',
    levelUpDescription: 'Level {level}: {changes}',
    levelChanges: {
      level2:
        "oxygen, nitrogen and carbon bring lone pairs that stay put, and every third molecule is a classmate's drawing to check.",
      level3: 'some atoms need to share twice — a double bond. The coach now waits until you ask.',
      level4: 'atoms start unplaced. You choose which one goes in the middle.',
      level5: 'marking mode — six classmate drawings, no coach, hint ladder only.',
    },
    victoryBadge: 'All objectives complete',
    victoryTitle: 'Lewis structures mastered',
    victorySubtitle: 'Every loner paired',
    victoryDescription: 'Open your marking sheet to look back over what you built.',
    pausedBadge: 'Session on hold',
    pausedTitle: 'Game Paused',
    pausedSubtitle: 'Nothing is timed.',
    pausedDescription: 'Your structure is exactly where you left it.',
  },

  notebook: {
    header: 'Your structures',
    markingHeader: 'Your marking sheet',
    columnMolecule: 'Molecule',
    columnBondLine: 'Bond-line',
    columnCounts: 'Bonds / lone pairs',
    columnHint: 'Hint tier',
    columnDiagnosis: 'Diagnosis',
    noHint: 'no hints',
    hintTier: 'tier {tier}',
    diagnosisRow: '{label}',
    diagnosisRowFirstTry: '{label} — first try',
    empty: 'No structures yet.',
  },

  glossary: {
    outerElectron: {
      term: 'outer (valence) electron',
      definition: 'an electron in the outside shell — the ones an atom shares',
      matches: ['outer electrons', 'outer electron', 'valence electrons', 'valence electron'],
    },
    loner: {
      term: 'loner (unpaired electron)',
      definition: 'an outer electron without a partner; only loners can be shared',
      matches: ['loners', 'loner', 'unpaired electrons', 'unpaired electron'],
    },
    lonePair: {
      term: 'lone pair',
      definition: 'two outer electrons that stay on one atom and are not shared',
      matches: ['lone pairs', 'lone pair'],
    },
    sharedPair: {
      term: 'shared pair / bond',
      definition: 'two electrons, one from each atom, shared between them — drawn as a line',
      matches: ['shared pairs', 'shared pair', 'bonds', 'bond'],
    },
    bondOrder: {
      term: 'single / double / triple bond',
      definition: 'one, two or three shared pairs between the same two atoms',
      matches: ['single bond', 'double bond', 'triple bond'],
    },
    octet: {
      term: 'octet',
      definition: 'eight outer electrons around an atom — full',
      matches: ['octet'],
    },
    duet: {
      term: 'duet',
      definition: 'two outer electrons around hydrogen — full',
      matches: ['duet'],
    },
    dot: {
      term: 'dot',
      definition: 'shows how many outer electrons, not where they are',
      matches: ['dots', 'dot'],
    },
  },

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
    hintButtonA11y: 'Get Hint',
    dismissHintA11y: 'Dismiss hint',
    coachRegionA11y: 'Coach messages',
    canvasLabelA11y: 'Dot structure of {name}',
    atomNameA11y: '{element}: {count} of {full}',
    atomCounterA11y: '{symbol}: {count} of {full}',
    atomLonerA11y: '{element}, loner {index} of {total}',
    atomLonePairA11y: '{element}, lone pair {index} of {total}',
    atomOrdinal: '{element} {ordinal}',
    lonerLabel: 'loner',
    atomFull: 'full',
    atomSelectedA11y: '{element} loner selected. Now choose a loner on another atom.',
    atomInspectTapA11y: '{element} — tap if this atom is wrong',
    bondSingleA11y: 'Single bond between {atom1} and {atom2}',
    bondDoubleA11y: 'Double bond between {atom1} and {atom2}',
    bondTripleA11y: 'Triple bond between {atom1} and {atom2}',
    bondUndoA11y: 'press to undo the last shared pair',
    bondCountA11y: 'press to count',
    bondCountedA11y: 'counted',
    livePaired: 'Shared pair made between {atom1} and {atom2}. {name1} now has {count1}; {name2} has {count2}.',
    liveUnpaired: 'Shared pair between {atom1} and {atom2} undone.',
    liveLocked: '{name} complete. The structure is locked.',
  },
} as const;

/**
 * The shape every locale must provide. Derived from the English so the two
 * cannot drift: adding a key above makes every other locale fail to compile
 * until it is translated.
 */
export type LewisStructuresMessages = Translated<typeof LEWIS_STRUCTURES_MESSAGES>;
