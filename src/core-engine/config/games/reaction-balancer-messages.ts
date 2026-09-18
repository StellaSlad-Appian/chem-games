// src/core-engine/config/games/reaction-balancer-messages.ts
//
// Every string a player reads in Reaction Balancer, assembled for one locale.
//
// The wording itself is NOT here any more: it lives in
// src/i18n/dictionaries/<locale>.ts under `games.reactionBalancer`, so every
// language has it and the parity, placeholder and formula gates in
// src/i18n/dictionary.test.ts run against it. What is left here is the shape —
// which sentence takes which values, and how a count or a side is turned into
// the right form — so the components keep calling `M.coach.imbalance(...)` and
// nothing player-facing is written in JSX.
//
// Conventions whoever edits the dictionary should know:
//   * Reading age ~12, one idea per sentence. Never a bare "wrong": every error
//     message says what is off and what to try.
//   * A formula or equation inside `backticks` is typeset by MoleculeText
//     (real subscripts, arrows and state symbols), so write plain ASCII:
//     `H2O`, `2H2(g) + O2(g) -> 2H2O(l)`. Never Unicode subscripts.
//   * Text inside **double stars** is bold.
//   * Glossary words become tap-to-explain wherever they appear in running
//     text. Each locale lists its own word forms in `glossary.<entry>.matches`.

import { useMemo } from 'react';
import { useI18n } from '@/i18n/client';
import { nameInSentence } from '@/i18n/chemistry-names';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries/en';
import { format as f, formatPlural } from '@/i18n/format';

export type MessageSide = 'reactant' | 'product';

/**
 * Builds the catalogue for one locale. Takes the whole dictionary because a
 * couple of strings (the instructions tab titles) are shared with the other
 * games and are read from `games.shared` rather than duplicated per game.
 */
export function reactionBalancerMessages(t: Dictionary, locale: Locale) {
  const d = t.games.reactionBalancer;
  /** A chemistry name dropped into the middle of a sentence. */
  const inSentence = (name: string) => nameInSentence(locale, name);

  return {
    header: {
      subtitle: d.header.subtitle,
      balance: (name: string) => f(d.header.balance, { name }),
      build: (name: string) => f(d.header.build, { name }),
      progress: (round: number, total: number) => f(d.header.progress, { round, total }),
      challengeProgress: (round: number, total: number) =>
        f(d.header.challengeProgress, { round, total }),
    },

    instructions: {
      title: d.instructions.title,
      lead: d.instructions.lead,
      intro: d.instructions.intro,
      bullets: d.instructions.bullets,
      arrow: d.instructions.arrow,
      keyboardTitle: t.games.shared.keyboardAndMouse,
      keyboard: d.instructions.keyboard,
      touchTitle: t.games.shared.touchscreen,
      touch: d.instructions.touch,
      glossaryTitle: d.instructions.glossaryTitle,
    },

    guided: {
      stepLabel: (step: number, total: number) => f(d.guided.stepLabel, { step, total }),
      steps: d.guided.steps,
    },

    coach: {
      label: d.coach.label,
      imbalance: (element: string, left: number, right: number) =>
        f(d.coach.imbalance, { element, elementInSentence: inSentence(element), left, right }),
      multiple: (fixed: string, broken: string) =>
        f(d.coach.multiple, { fixed: inSentence(fixed), broken: inSentence(broken) }),
      balanced: d.coach.balanced,
      balancedNotLowest: (k: number, equation: string) =>
        f(d.coach.balancedNotLowest, { k, equation }),
    },

    hint: {
      label: d.hint.label,
      tierLabel: (tier: number) => f(d.hint.tierLabel, { tier }),
      tier1: (element: string) => f(d.hint.tier1, { element: inSentence(element) }),
      // Tier 2 is the reaction's own hint, from reactions.ts via the overlay.
      tier3: (n: number, formula: string, element: string) =>
        f(d.hint.tier3, { n, formula, element: inSentence(element) }),
      tier3Lower: (n: number, formula: string, element: string) =>
        f(d.hint.tier3Lower, { n, formula, element: inSentence(element) }),
      tier3Balanced: d.hint.tier3Balanced,
      tier1Build: d.hint.tier1Build,
      tier2Build: d.hint.tier2Build,
      tier3Build: (name: string, formula: string, side: MessageSide) =>
        f(side === 'reactant' ? d.hint.tier3BuildReactant : d.hint.tier3BuildProduct, {
          name,
          formula,
        }),
    },
    stuck: {
      offer: d.stuck.offer,
    },

    error: {
      label: d.error.label,
      zero: (formula: string) => f(d.error.zero, { formula }),
      max: d.error.max,
      subscriptTap: d.error.subscriptTap,
      notANumber: d.error.notANumber,
    },

    challenge: {
      label: d.challenge.label,
      intro: d.challenge.intro,
      /** The word equation comes from reactions.ts, already translated. */
      prompt: (text: string) => text,
      pickerLabel: d.challenge.pickerLabel,
      sideLabel: d.challenge.sideLabel,
      reactants: d.challenge.reactants,
      products: d.challenge.products,
      placeholder: (side: MessageSide) =>
        side === 'reactant' ? d.challenge.placeholderReactant : d.challenge.placeholderProduct,
      notInReaction: (name: string) => f(d.challenge.notInReaction, { name }),
      wrongSide: (name: string, side: MessageSide) =>
        f(side === 'product' ? d.challenge.wrongSideProduct : d.challenge.wrongSideReactant, {
          name,
        }),
      built: d.challenge.built,
      addAs: (name: string, formula: string, side: MessageSide) =>
        f(side === 'reactant' ? d.challenge.addAsReactantA11y : d.challenge.addAsProductA11y, {
          name,
          formula,
        }),
      remove: (name: string, formula: string) => f(d.challenge.removeA11y, { name, formula }),
      tile: (name: string, formula: string) => f(d.challenge.tileA11y, { name, formula }),
    },

    success: {
      label: d.success.label,
      round: (equation: string) => f(d.success.round, { equation }),
      points: (points: number) => f(d.success.points, { points }),
      bonus: (points: number) => f(d.success.bonus, { points }),
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
      } as Record<number, string>,
      victory: {
        badge: d.overlay.victoryBadge,
        title: d.overlay.victoryTitle,
        subtitle: d.overlay.victorySubtitle,
        description: d.overlay.victoryDescription,
      },
      challengeComplete: {
        badge: d.overlay.challengeBadge,
        title: d.overlay.challengeTitle,
        subtitle: d.overlay.challengeSubtitle,
        description: d.overlay.challengeDescription,
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
      columns: {
        hint: d.notebook.columnHint,
        points: d.notebook.columnPoints,
      },
      noHint: d.notebook.noHint,
      hintTier: (tier: number) => f(d.notebook.hintTier, { tier }),
      lowestTerms: d.notebook.lowestTerms,
      simplified: (k: number) => f(d.notebook.simplified, { k }),
      challenge: d.notebook.challenge,
      empty: d.notebook.empty,
    },

    ledger: {
      title: d.ledger.title,
      left: d.ledger.left,
      right: d.ledger.right,
      status: d.ledger.statusA11y,
      row: (element: string, left: number, right: number) =>
        f(d.ledger.row, { element, left, right }),
      balancedRow: d.ledger.balancedRow,
      needsMore: (n: number, side: 'left' | 'right') =>
        f(side === 'left' ? d.ledger.needsMoreLeft : d.ledger.needsMoreRight, { count: n }),
      allBalanced: d.ledger.allBalanced,
      show: d.ledger.show,
      hide: d.ledger.hide,
      showCost: d.ledger.showCost,
      nextUp: d.ledger.nextUp,
    },
    beam: {
      label: d.beam.label,
      readout: (left: number, right: number) => f(d.beam.readout, { left, right }),
      level: d.beam.level,
      tips: (side: 'left' | 'right') => (side === 'left' ? d.beam.tipsLeft : d.beam.tipsRight),
    },
    card: {
      coefficient: (name: string, formula: string) => f(d.card.coefficientA11y, { name, formula }),
      increase: (name: string) => f(d.card.increaseA11y, { name }),
      decrease: (name: string) => f(d.card.decreaseA11y, { name }),
      formulaTap: (name: string) => f(d.card.formulaTapA11y, { name }),
      clusters: (n: number, name: string) => formatPlural(locale, d.card.clustersA11y, n, { name }),
      reactants: d.card.reactants,
      products: d.card.products,
    },

    /** Tap-to-explain vocabulary, in this locale's own word forms. */
    glossary: Object.fromEntries(
      Object.values(d.glossary).map((entry) => [entry.term, entry.definition])
    ) as Record<string, string>,
    glossaryMatches: Object.fromEntries(
      Object.values(d.glossary).map((entry) => [entry.term, [...entry.matches]])
    ) as Record<string, string[]>,

    ui: {
      nextReaction: d.ui.nextReaction,
      finishLevel: d.ui.finishLevel,
      skipGuide: d.ui.skipGuide,
      nextStep: d.ui.nextStep,
      tryChallenge: d.ui.tryChallenge,
      openNotebook: d.ui.openNotebook,
      closeNotebook: d.ui.closeNotebook,
      playAgain: d.ui.playAgain,
      supportMode: d.ui.supportMode,
      supportModeHelp: d.ui.supportModeHelp,
      hintButton: d.ui.hintButtonA11y,
      dismissHint: d.ui.dismissHintA11y,
      coachRegion: d.ui.coachRegionA11y,
      observation: d.ui.observation,
      equationLabel: (name: string) => f(d.ui.equationLabelA11y, { name }),
      live: {
        changed: (name: string, n: number) => f(d.ui.liveChanged, { name, n }),
        locked: (equation: string) => f(d.ui.liveLocked, { equation }),
        built: d.ui.liveBuilt,
      },
    },
  };
}

export type ReactionBalancerMessages = ReturnType<typeof reactionBalancerMessages>;

/**
 * The catalogue for the active locale. Client components and hooks only —
 * `useI18n()` throws outside the provider rather than falling back to English.
 */
export function useBalancerMessages(): ReactionBalancerMessages {
  const { t, locale } = useI18n();
  return useMemo(() => reactionBalancerMessages(t, locale), [t, locale]);
}
