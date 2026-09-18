// src/core-engine/config/games/lewis-structures-messages.ts
//
// Every string a player reads in Share to Fill, assembled for one locale.
//
// The wording itself lives in src/i18n/dictionaries/<locale>.ts under
// `games.lewisStructures`, so every language has it and the i18n gates run
// against it. What is left here is the shape: which sentence takes which
// values, which count picks which plural form, and how an atom is named.
//
// Reading age ~12, one idea per sentence. Never a bare "wrong": every error
// message says what is off and what to try.
//
// Two things a translator decides that English hides:
//   * "Loner" is the game's own word for an unpaired outer electron. Each
//     locale picks a word of the same playful register and glosses it.
//   * Names inside a sentence are lower-cased in English and not in German.
//     That is `nameInSentence()`, not `.toLowerCase()`.

import { useMemo } from 'react';
import { useI18n } from '@/i18n/client';
import { nameInSentence } from '@/i18n/chemistry-names';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries/en';
import { format as f, formatPlural } from '@/i18n/format';
import type { LewisErrorType } from '@/core-engine/types/chemistry';

export type CountKind = 'bonds' | 'lonePairs';

export function lewisMessages(t: Dictionary, locale: Locale) {
  const d = t.games.lewisStructures;
  const inSentence = (name: string) => nameInSentence(locale, name);
  const sharedPairs = (n: number) => formatPlural(locale, d.counts.sharedPairs, n);
  const lonePairs = (n: number) => formatPlural(locale, d.counts.lonePairs, n);
  const bonds = (n: number) => formatPlural(locale, d.counts.bonds, n);
  const counted = (kind: CountKind, n: number) => (kind === 'bonds' ? bonds(n) : lonePairs(n));

  return {
    header: {
      subtitle: d.header.subtitle,
      build: (name: string, formula: string) =>
        f(d.header.build, { name: inSentence(name), formula }),
      inspect: (name: string, formula: string) =>
        f(d.header.inspect, { name: inSentence(name), formula }),
      progress: (round: number, total: number) => f(d.header.progress, { round, total }),
      marking: (round: number, total: number) => f(d.header.marking, { round, total }),
    },

    instructions: {
      title: d.instructions.title,
      lead: d.instructions.lead,
      intro: d.instructions.intro,
      bullets: d.instructions.bullets,
      disclaimer: d.instructions.disclaimer,
      keyboardTitle: t.games.shared.keyboardAndMouse,
      keyboard: d.instructions.keyboard,
      touchTitle: t.games.shared.touchscreen,
      touch: d.instructions.touch,
      glossaryTitle: d.instructions.glossaryTitle,
    },

    guided: {
      stepLabel: (step: number, total: number) => f(d.guided.stepLabel, { step, total }),
      h2: d.guided.h2,
      h2o: {
        step1: d.guided.h2oStep1,
        step2: d.guided.h2oStep2,
        step2After: d.guided.h2oStep2After,
        step3: d.guided.h2oStep3,
        step4: d.guided.h2oStep4,
      },
    },

    coach: {
      label: d.coach.label,
      loners: (atom: string, n: number) => formatPlural(locale, d.coach.loners, n, { atom }),
      needsMore: (atom: string, count: number) => f(d.coach.needsMore, { atom, count }),
      shareAgain: (atom1: string, atom2: string) => f(d.coach.shareAgain, { atom1, atom2 }),
      complete: (name: string, bondCount: number, lonePairCount: number) =>
        f(d.coach.complete, {
          name: inSentence(name),
          bonds: sharedPairs(bondCount),
          lonePairs: lonePairs(lonePairCount),
        }),
      sameGroup: (element: string, analogue: string, analogueMolecule: string) =>
        f(d.coach.sameGroup, {
          element,
          analogue: inSentence(analogue),
          analogueMolecule: inSentence(analogueMolecule),
        }),
      central: d.coach.central,
      deadEnd: (atom: string, count: number) => f(d.coach.deadEnd, { atom, count }),
      isomer: (name: string) => f(d.coach.isomer, { name: inSentence(name) }),
    },

    hint: {
      label: t.games.shared.hint,
      tierLabel: (tier: number) => f(d.hint.tierLabel, { tier }),
      tier1: d.hint.tier1,
      // Tier 2 is the molecule's own hint, from lewis-molecules.ts via the overlay.
      tier3: (atom1: string, atom2: string) =>
        f(d.hint.tier3, { atom1: inSentence(atom1), atom2: inSentence(atom2) }),
      tier3Undo: (atom1: string, atom2: string) =>
        f(d.hint.tier3Undo, { atom1: inSentence(atom1), atom2: inSentence(atom2) }),
      offerTier2: d.hint.offerTier2,
      noMoreHints: d.hint.noMoreHints,
      inspect: {
        tier1: d.hint.inspectTier1,
        tier2: d.hint.inspectTier2,
        tier3: (atom: string, count: number) => f(d.hint.inspectTier3, { atom, count }),
        tier3Correct: d.hint.inspectTier3Correct,
        tier3Repair: d.hint.inspectTier3Repair,
        tier3Count: (kind: CountKind, actual: number) =>
          formatPlural(
            locale,
            kind === 'bonds' ? d.hint.inspectTier3CountBonds : d.hint.inspectTier3CountLonePairs,
            actual
          ),
      },
    },

    error: {
      label: d.error.label,
      atomFull: (atom: string) => f(d.error.atomFull, { atom }),
      hydrogenFull: d.error.hydrogenFull,
      sameAtom: d.error.sameAtom,
      pairedDot: d.error.pairedDot,
    },

    inspect: {
      classmate: (name: string) => f(d.inspect.classmate, { name: inSentence(name) }),
      prompt: d.inspect.prompt,
      diagnosisPrompt: (atom: string) =>
        f(d.inspect.diagnosisPrompt, { atom: inSentence(atom) }),
      diagnosis: d.inspect.diagnosis satisfies Record<LewisErrorType, string>,
      wrongAtom: (atom: string, count: number) => f(d.inspect.wrongAtom, { atom, count }),
      wrongDiagnosis: (atom: string, count: number, explanation: string) =>
        f(d.inspect.wrongDiagnosis, { atom: inSentence(atom), count, explanation }),
      explain: {
        tooMany: (atom: string, full: number) => f(d.inspect.explainTooMany, { atom, full }),
        tooFew: (atom: string) => f(d.inspect.explainTooFew, { atom }),
        hydrogenFull: d.inspect.explainHydrogenFull,
        needsDouble: (atom1: string, atom2: string) =>
          f(d.inspect.explainNeedsDouble, { atom1, atom2: inSentence(atom2) }),
        leftover: (atom: string) => f(d.inspect.explainLeftover, { atom }),
      },
      correctStructure: d.inspect.correctStructure,
      missedCorrect: d.inspect.missedCorrect,
      notCorrect: d.inspect.notCorrect,
      repair: d.inspect.repair,
      repaired: d.inspect.repaired,
      countBonds: d.inspect.countBonds,
      countLonePairs: d.inspect.countLonePairs,
      countWrong: (given: number, actual: number, mentionDouble: boolean) =>
        f(mentionDouble ? d.inspect.countWrongDouble : d.inspect.countWrong, { given, actual }),
      countRight: (kind: CountKind, actual: number) =>
        f(d.inspect.countRight, { counted: counted(kind, actual) }),
      countLabel: (kind: CountKind, n: number) =>
        f(d.inspect.countLabel, { counted: counted(kind, n) }),
    },

    success: {
      label: d.success.label,
      round: (name: string, bondLine: string) => f(d.success.round, { name, bondLine }),
      bonus: (points: number) => f(d.success.bonus, { points }),
      points: (points: number) => f(d.success.points, { points }),
    },

    overlay: {
      levelUp: {
        badge: d.overlay.levelUpBadge,
        title: d.overlay.levelUpTitle,
        subtitle: d.overlay.levelUpSubtitle,
        description: (nextLevel: number, whatChanges: string) =>
          f(d.overlay.levelUpDescription, { level: nextLevel, changes: whatChanges }),
      },
      levelChanges: {
        2: d.overlay.levelChanges.level2,
        3: d.overlay.levelChanges.level3,
        4: d.overlay.levelChanges.level4,
        5: d.overlay.levelChanges.level5,
      } as Record<number, string>,
      victory: {
        badge: d.overlay.victoryBadge,
        title: d.overlay.victoryTitle,
        subtitle: d.overlay.victorySubtitle,
        description: d.overlay.victoryDescription,
      },
      paused: {
        badge: d.overlay.pausedBadge,
        title: d.overlay.pausedTitle,
        subtitle: d.overlay.pausedSubtitle,
        description: d.overlay.pausedDescription,
      },
    },

    notebook: {
      header: d.notebook.header,
      markingHeader: d.notebook.markingHeader,
      columns: {
        molecule: d.notebook.columnMolecule,
        bondLine: d.notebook.columnBondLine,
        counts: d.notebook.columnCounts,
        hint: d.notebook.columnHint,
        diagnosis: d.notebook.columnDiagnosis,
      },
      noHint: d.notebook.noHint,
      hintTier: (tier: number) => f(d.notebook.hintTier, { tier }),
      diagnosisRow: (label: string, firstTry: boolean) =>
        f(firstTry ? d.notebook.diagnosisRowFirstTry : d.notebook.diagnosisRow, { label }),
      empty: d.notebook.empty,
    },

    glossary: Object.fromEntries(
      Object.values(d.glossary).map((entry) => [entry.term, entry.definition])
    ) as Record<string, string>,
    glossaryMatches: Object.fromEntries(
      Object.values(d.glossary).map((entry) => [entry.term, [...entry.matches]])
    ) as Record<string, string[]>,

    ui: {
      nextMolecule: d.ui.nextMolecule,
      nextDrawing: d.ui.nextDrawing,
      finishLevel: d.ui.finishLevel,
      skipGuide: d.ui.skipGuide,
      nextStep: d.ui.nextStep,
      thisOneIsCorrect: d.ui.thisOneIsCorrect,
      doneCounting: d.ui.doneCounting,
      startRepair: d.ui.startRepair,
      openMarkingSheet: d.ui.openMarkingSheet,
      closeMarkingSheet: d.ui.closeMarkingSheet,
      playAgain: d.ui.playAgain,
      supportMode: d.ui.supportMode,
      supportModeHelp: d.ui.supportModeHelp,
      hintButton: d.ui.hintButtonA11y,
      dismissHint: d.ui.dismissHintA11y,
      coachRegion: d.ui.coachRegionA11y,
      canvasLabel: (name: string) => f(d.ui.canvasLabelA11y, { name: inSentence(name) }),
      atom: {
        name: (elementName: string, count: number, full: number) =>
          f(d.ui.atomNameA11y, { element: elementName, count, full }),
        counter: (symbol: string, count: number, full: number) =>
          f(d.ui.atomCounterA11y, { symbol, count, full }),
        loner: (elementName: string, index: number, total: number) =>
          f(d.ui.atomLonerA11y, { element: elementName, index, total }),
        lonePair: (elementName: string, index: number, total: number) =>
          f(d.ui.atomLonePairA11y, { element: elementName, index, total }),
        lonerLabel: d.ui.lonerLabel,
        full: d.ui.atomFull,
        selectedForPairing: (elementName: string) =>
          f(d.ui.atomSelectedA11y, { element: elementName }),
        inspectTap: (elementName: string) => f(d.ui.atomInspectTapA11y, { element: elementName }),
      },
      bond: {
        name: (a: string, b: string, order: number) =>
          f(
            order === 3 ? d.ui.bondTripleA11y : order === 2 ? d.ui.bondDoubleA11y : d.ui.bondSingleA11y,
            { atom1: inSentence(a), atom2: inSentence(b) }
          ),
        undo: d.ui.bondUndoA11y,
        count: d.ui.bondCountA11y,
        counted: d.ui.bondCountedA11y,
      },
      live: {
        paired: (a: string, b: string, countA: number, countB: number) =>
          f(d.ui.livePaired, {
            atom1: inSentence(a),
            atom2: inSentence(b),
            name1: a,
            name2: b,
            count1: countA,
            count2: countB,
          }),
        unpaired: (a: string, b: string) =>
          f(d.ui.liveUnpaired, { atom1: inSentence(a), atom2: inSentence(b) }),
        locked: (name: string) => f(d.ui.liveLocked, { name }),
      },
    },

    /**
     * Element display names used in messages: "Oxygen", or "Hydrogen 1" /
     * "Hydrogen 2" when a molecule has several of the same element.
     */
    atomLabel: (elementName: string, ordinal?: number) =>
      ordinal ? f(d.ui.atomOrdinal, { element: elementName, ordinal }) : elementName,
  };
}

export type LewisMessages = ReturnType<typeof lewisMessages>;

/**
 * The catalogue for the active locale. Client components and hooks only —
 * `useI18n()` throws outside the provider rather than falling back to English.
 */
export function useLewisMessages(): LewisMessages {
  const { t, locale } = useI18n();
  return useMemo(() => lewisMessages(t, locale), [t, locale]);
}
