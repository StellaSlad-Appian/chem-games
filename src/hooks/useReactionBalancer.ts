// src/hooks/useReactionBalancer.ts
//
// The whole rules engine for Reaction Balancer in one hook, so the page stays
// thin. Chemistry decisions (counting atoms, lowest terms, which coefficient
// to suggest) are delegated to the pure functions in
// core-engine/utils/balancer-utils.ts; this hook owns the level plan, the
// coefficient state, the coach text, the hint ladder, the guided first
// reaction, the idle timers, the Challenge builder and the notebook.
'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { REACTION_BALANCER_CONFIG, type ReactionBalancerConfig } from '@/core-engine/config/games/reaction-balancer-config';
import { REACTION_BALANCER_MESSAGES } from '@/core-engine/config/games/reaction-balancer-messages';
import {
  WATER_REACTION_ID,
  allOnes,
  buildReaction,
  coefficientHint,
  compareLedgers,
  elementName,
  equationText,
  findSpecies,
  isBalanced,
  ledger,
  lowestTerms,
  nextElement,
  planBalancerLevel,
  relativeMass,
  type BalancerRound,
  type LedgerRow,
  type ParsedReaction,
  type RoundMode,
  type Side,
  type Species,
} from '@/core-engine/utils/balancer-utils';
import { useHintLadder } from './useHintLadder';
import { useStoredValue } from './useStoredValue';

const M = REACTION_BALANCER_MESSAGES;

export const GUIDED_SEEN_KEY = 'reactionBalancerGuidedSeen';

export type RoundPhase = 'build' | 'balance' | 'done';
export type CoachTone = 'coach' | 'error' | 'success' | 'guide';

export interface RoundResult {
  reactionId: string;
  name: string;
  /** The locked equation in lowest terms, with state symbols. */
  equation: string;
  hintTier: number;
  points: number;
  /** True when the first lock was already in lowest terms. */
  lowestTermsFirst: boolean;
  divisor: number;
  mode: RoundMode;
}

interface Feedback {
  text: string;
  tone: CoachTone;
  label: string;
}

interface RoundState {
  phase: RoundPhase;
  /** The reaction being balanced: the round's, or the one the player built (Challenge). */
  parsed: ParsedReaction;
  coefficients: number[];
  divisor: number;
  feedback: Feedback | null;
  /** Elements the last change fixed / broke, for the "that fixed X, but Y changed" line. */
  lastChange: { fixed: string[]; broken: string[] } | null;
  guideAdvanced: boolean;
  guideSkipped: boolean;
  coachRequested: boolean;
  offerTier2: boolean;
  ledgerOpened: boolean;
  moved: boolean;
  lastPoints: number;
  /** Challenge builder. */
  pickerSide: Side;
  placedReactants: string[];
  placedProducts: string[];
}

export interface UseReactionBalancerOptions {
  level: number;
  supportMode: boolean;
  isPaused: boolean;
  config?: ReactionBalancerConfig;
  rng?: () => number;
  onRoundScored?: (points: number) => void;
  onLevelCleared?: (level: number) => void;
}

export type CoefficientChange =
  | { ok: true; locked: boolean }
  | { ok: false; reason: 'zero' | 'max' | 'notANumber' | 'paused' };

// ---------------------------------------------------------------------------
// Pure helpers
// ---------------------------------------------------------------------------

const freshRoundState = (round: BalancerRound): RoundState => ({
  phase: round.mode === 'challenge' ? 'build' : 'balance',
  parsed: round.parsed,
  coefficients: allOnes(round.parsed),
  divisor: 1,
  feedback: null,
  lastChange: null,
  guideAdvanced: false,
  guideSkipped: false,
  coachRequested: false,
  offerTier2: false,
  ledgerOpened: false,
  moved: false,
  lastPoints: 0,
  pickerSide: 'reactant',
  placedReactants: [],
  placedProducts: [],
});

/**
 * Where the guided water script stands for a coefficient list [H2, O2, H2O]:
 * 0 waits for "Next", 1 waits for H2O = 2, 2 waits for H2 = 2, 3 is the lock.
 * Returns -1 when the player has left the script (any other coefficients).
 */
export function guideStepFor(coefficients: number[], advanced: boolean, balanced: boolean): number {
  const [h2, o2, h2o] = coefficients;
  const onScript = (h2 === 1 || h2 === 2) && o2 === 1 && (h2o === 1 || h2o === 2);
  if (!onScript) return -1;
  if (balanced) return 3;
  if (h2o === 2) return 2;
  return advanced ? 1 : 0;
}

const sameSet = (a: string[], b: string[]) => a.length === b.length && a.every((x) => b.includes(x));

// ---------------------------------------------------------------------------
// The hook
// ---------------------------------------------------------------------------

export function useReactionBalancer({
  level,
  supportMode,
  isPaused,
  config = REACTION_BALANCER_CONFIG,
  rng = Math.random,
  onRoundScored,
  onLevelCleared,
}: UseReactionBalancerOptions) {
  const [guidedSeen, setGuidedSeen] = useStoredValue(GUIDED_SEEN_KEY);

  const [plan, setPlan] = useState<{ level: number; rounds: BalancerRound[] }>(() => ({
    level,
    rounds: planBalancerLevel(level, config, rng),
  }));
  const [roundIndex, setRoundIndex] = useState(0);
  const [roundState, setRoundState] = useState<RoundState>(() => freshRoundState(plan.rounds[0]));
  const [results, setResults] = useState<RoundResult[]>([]);
  const [roundsPlayed, setRoundsPlayed] = useState(0);
  const [roundsWithoutTier3, setRoundsWithoutTier3] = useState(0);
  const [lastActivityAt, setLastActivityAt] = useState(() => Date.now());
  const [announcement, setAnnouncement] = useState('');
  const [lockAnnouncement, setLockAnnouncement] = useState('');
  const hints = useHintLadder(3);

  const round = plan.rounds[Math.min(roundIndex, plan.rounds.length - 1)];
  const { parsed, coefficients, phase } = roundState;
  const isChallenge = plan.level >= config.levels.challengeLevel;

  // The guided walk-through: Level 1, reaction 1 (water), once.
  const guided =
    plan.level === 1 &&
    round.index === 0 &&
    round.reaction.id === WATER_REACTION_ID &&
    guidedSeen !== 'true' &&
    !roundState.guideSkipped;

  const rows: LedgerRow[] = useMemo(() => ledger(parsed, coefficients), [parsed, coefficients]);
  const balanced = phase !== 'build' && isBalanced(parsed, coefficients);
  const nextUp = phase === 'build' ? null : nextElement(parsed, coefficients);
  const guideStep = guided ? guideStepFor(coefficients, roundState.guideAdvanced, balanced) : -1;

  // Scaffolding for this level (Support mode forces the Level 1-2 set).
  const scaffold = useMemo(() => {
    const lvl = plan.level;
    const ledgerByDefault = supportMode || lvl < config.visuals.ledgerHiddenFromLevel;
    return {
      clusters: supportMode || lvl <= config.visuals.showClustersUntilLevel,
      coachAlwaysOn: supportMode || lvl <= config.visuals.coachOnByDefaultUntilLevel,
      highlightNext: supportMode || lvl <= config.visuals.highlightNextElementUntilLevel,
      ledgerByDefault,
      /** Opening the ledger costs the bonus only where it is hidden by default. */
      ledgerCostsBonus: !ledgerByDefault,
      observation: lvl >= config.visuals.observationFromLevel,
    };
  }, [plan.level, supportMode, config]);

  const ledgerShown = scaffold.ledgerByDefault || roundState.ledgerOpened;

  // Any move restarts the idle timers and withdraws the "still stuck" offer.
  const touch = useCallback(() => {
    setLastActivityAt(Date.now());
    setRoundState((s) => (s.offerTier2 ? { ...s, offerTier2: false } : s));
  }, []);

  const update = useCallback((patch: Partial<RoundState>) => setRoundState((s) => ({ ...s, ...patch })), []);

  const startRound = useCallback(
    (nextPlan: { level: number; rounds: BalancerRound[] }, index: number) => {
      setRoundIndex(index);
      setRoundState(freshRoundState(nextPlan.rounds[index]));
      hints.reset();
      setAnnouncement('');
      setLockAnnouncement('');
      touch();
    },
    [hints, touch]
  );

  const startLevel = useCallback(
    (nextLevel: number, options: { resetRun?: boolean } = {}) => {
      const nextPlan = { level: nextLevel, rounds: planBalancerLevel(nextLevel, config, rng) };
      setPlan(nextPlan);
      if (options.resetRun) {
        setResults([]);
        setRoundsPlayed(0);
        setRoundsWithoutTier3(0);
      }
      startRound(nextPlan, 0);
    },
    [config, rng, startRound]
  );

  // ---------------------------------------------------------------- scoring
  const finishRound = useCallback(
    (reaction: ParsedReaction, locked: number[], divisor: number, ledgerOpened: boolean) => {
      const lowestFirst = divisor === 1;
      const bonusEarned = lowestFirst && !hints.usedPaidTier && !(ledgerOpened && scaffold.ledgerCostsBonus);
      const points = config.mechanics.pointsPerLevelMultiplier * plan.level + (bonusEarned ? config.mechanics.lowestTermsBonus : 0);
      const equation = equationText(reaction, locked);
      const result: RoundResult = {
        reactionId: round.reaction.id,
        name: round.reaction.name,
        equation,
        hintTier: hints.highestTierUsed,
        points,
        lowestTermsFirst: lowestFirst,
        divisor,
        mode: round.mode,
      };
      setResults((r) => [...r, result]);
      setRoundsPlayed((n) => n + 1);
      if (!hints.usedTier3) setRoundsWithoutTier3((n) => n + 1);
      setLockAnnouncement(M.ui.live.locked(equation));
      onRoundScored?.(points);
      return { points, bonusEarned };
    },
    [config, hints, plan.level, round, scaffold.ledgerCostsBonus, onRoundScored]
  );

  /** Applies a coefficient list; locks the round when it balances. */
  const applyCoefficients = useCallback(
    (next: number[], changedIndex: number): CoefficientChange => {
      const before = ledger(roundState.parsed, roundState.coefficients);
      const after = ledger(roundState.parsed, next);
      const change = compareLedgers(before, after);
      const species = roundState.parsed.species[changedIndex];
      const locked = isBalanced(roundState.parsed, next);
      const patch: Partial<RoundState> = { coefficients: next, feedback: null, moved: true, lastChange: change };
      if (locked) {
        hints.dismiss();
        const { coefficients: simplest, divisor } = lowestTerms(next);
        const { points } = finishRound(roundState.parsed, simplest, divisor, roundState.ledgerOpened);
        Object.assign(patch, { phase: 'done', coefficients: simplest, divisor, lastPoints: points });
      } else if (species) {
        const row = nextElement(roundState.parsed, next);
        const rowText = row ? M.ledger.row(elementName(row), after.find((r) => r.element === row)?.left ?? 0, after.find((r) => r.element === row)?.right ?? 0) : '';
        setAnnouncement(`${M.ui.live.changed(species.name, next[changedIndex])} ${rowText}`.trim());
      }
      update(patch);
      return { ok: true, locked };
    },
    [roundState, hints, finishRound, update]
  );

  // ---------------------------------------------------------------- coefficient actions
  const setCoefficient = useCallback(
    (index: number, value: number | ''): CoefficientChange => {
      if (isPaused || roundState.phase !== 'balance') return { ok: false, reason: 'paused' };
      touch();
      const species = roundState.parsed.species[index];
      if (!species) return { ok: false, reason: 'notANumber' };
      if (value === '' || !Number.isInteger(value)) {
        update({ feedback: { text: M.error.notANumber, tone: 'error', label: M.error.label } });
        return { ok: false, reason: 'notANumber' };
      }
      if (value < 1) {
        update({ feedback: { text: M.error.zero(species.bare), tone: 'error', label: M.error.label } });
        return { ok: false, reason: 'zero' };
      }
      if (value > config.mechanics.maxCoefficient) {
        update({ feedback: { text: M.error.max, tone: 'error', label: M.error.label } });
        return { ok: false, reason: 'max' };
      }
      if (value === roundState.coefficients[index]) return { ok: true, locked: false };
      const next = [...roundState.coefficients];
      next[index] = value;
      return applyCoefficients(next, index);
    },
    [isPaused, roundState, touch, update, config.mechanics.maxCoefficient, applyCoefficients]
  );

  const increment = useCallback((index: number) => setCoefficient(index, (roundState.coefficients[index] ?? 1) + 1), [setCoefficient, roundState.coefficients]);
  const decrement = useCallback((index: number) => setCoefficient(index, (roundState.coefficients[index] ?? 1) - 1), [setCoefficient, roundState.coefficients]);

  /** A tap on the formula itself (the subscripts): explain why they are locked. */
  const tapSubscript = useCallback(() => {
    if (isPaused || roundState.phase === 'done') return;
    touch();
    update({ feedback: { text: M.error.subscriptTap, tone: 'error', label: M.error.label } });
  }, [isPaused, roundState.phase, touch, update]);

  const toggleLedger = useCallback(() => {
    if (isPaused) return;
    touch();
    update({ ledgerOpened: !roundState.ledgerOpened });
  }, [isPaused, roundState.ledgerOpened, touch, update]);

  // ---------------------------------------------------------------- challenge builder
  const target = round.parsed;

  const pickSide = useCallback(
    (side: Side) => {
      if (isPaused || roundState.phase !== 'build') return;
      update({ pickerSide: side });
    },
    [isPaused, roundState.phase, update]
  );

  const addSpecies = useCallback(
    (bare: string, sideOverride?: Side): { ok: boolean; built: boolean } => {
      if (isPaused || roundState.phase !== 'build') return { ok: false, built: false };
      touch();
      const side = sideOverride ?? roundState.pickerSide;
      const inTarget = target.species.find((s) => s.bare === bare);
      const species = inTarget ?? findSpecies(bare);
      const name = species?.name ?? bare;
      if (!inTarget) {
        update({ feedback: { text: M.challenge.notInReaction(name), tone: 'error', label: M.error.label } });
        return { ok: false, built: false };
      }
      if (inTarget.side !== side) {
        update({ feedback: { text: M.challenge.wrongSide(name, inTarget.side), tone: 'error', label: M.error.label } });
        return { ok: false, built: false };
      }
      const placedReactants = side === 'reactant' && !roundState.placedReactants.includes(bare) ? [...roundState.placedReactants, bare] : roundState.placedReactants;
      const placedProducts = side === 'product' && !roundState.placedProducts.includes(bare) ? [...roundState.placedProducts, bare] : roundState.placedProducts;
      const targetReactants = target.reactants.map((s) => s.bare);
      const targetProducts = target.products.map((s) => s.bare);
      const built = sameSet(placedReactants, targetReactants) && sameSet(placedProducts, targetProducts);
      if (!built) {
        update({ placedReactants, placedProducts, feedback: null, moved: true });
        return { ok: true, built: false };
      }
      // The equation is complete: rebuild it in the player's order and start balancing.
      const bySide = (bares: string[], from: Species[]) => bares.map((b) => from.find((s) => s.bare === b) as Species);
      const builtReaction = buildReaction(target.id, bySide(placedReactants, target.reactants), bySide(placedProducts, target.products));
      const ones = allOnes(builtReaction);
      setAnnouncement(M.ui.live.built);
      hints.reset();
      if (isBalanced(builtReaction, ones)) {
        const { points } = finishRound(builtReaction, ones, 1, roundState.ledgerOpened);
        update({ placedReactants, placedProducts, parsed: builtReaction, coefficients: ones, phase: 'done', divisor: 1, feedback: null, lastPoints: points, moved: true });
        return { ok: true, built: true };
      }
      update({
        placedReactants,
        placedProducts,
        parsed: builtReaction,
        coefficients: ones,
        phase: 'balance',
        feedback: { text: M.challenge.built, tone: 'success', label: M.success.label },
        moved: true,
      });
      return { ok: true, built: true };
    },
    [isPaused, roundState, touch, target, update, hints, finishRound]
  );

  const removeSpecies = useCallback(
    (side: Side, bare: string) => {
      if (isPaused || roundState.phase !== 'build') return;
      touch();
      if (side === 'reactant') update({ placedReactants: roundState.placedReactants.filter((b) => b !== bare), feedback: null });
      else update({ placedProducts: roundState.placedProducts.filter((b) => b !== bare), feedback: null });
    },
    [isPaused, roundState, touch, update]
  );

  // ---------------------------------------------------------------- round flow
  const isLastRound = roundIndex >= plan.rounds.length - 1;

  const next = useCallback(() => {
    if (roundState.phase !== 'done') return;
    if (guided) setGuidedSeen('true');
    if (isLastRound) {
      onLevelCleared?.(plan.level);
      return;
    }
    startRound(plan, roundIndex + 1);
  }, [roundState.phase, guided, setGuidedSeen, isLastRound, onLevelCleared, plan, roundIndex, startRound]);

  const skipGuide = useCallback(() => {
    setGuidedSeen('true');
    update({ guideSkipped: true });
    touch();
  }, [setGuidedSeen, update, touch]);

  const nextGuideStep = useCallback(() => {
    update({ guideAdvanced: true });
    touch();
  }, [update, touch]);

  const dismissFeedback = useCallback(() => update({ feedback: null }), [update]);

  // ---------------------------------------------------------------- idle timers
  const { requestHint: openTier } = hints;
  useEffect(() => {
    if (isPaused || roundState.phase === 'done') return;
    const coachMs = config.mechanics.coachAfterSeconds * 1000;
    const stuckMs = config.mechanics.stuckAfterSeconds * 1000;
    const t1 = window.setTimeout(() => {
      // The coach opens itself with tier 1 (free).
      setRoundState((s) => (s.coachRequested ? s : { ...s, coachRequested: true }));
      openTier();
    }, coachMs);
    const t2 = window.setTimeout(() => setRoundState((s) => (s.offerTier2 ? s : { ...s, offerTier2: true })), stuckMs);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
    // The first timer must not fire twice for one idle stretch, so it keys on the activity stamp only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastActivityAt, isPaused, roundState.phase, config.mechanics.coachAfterSeconds, config.mechanics.stuckAfterSeconds]);

  // ---------------------------------------------------------------- hints
  const requestHint = useCallback(() => {
    if (isPaused || roundState.phase === 'done') return;
    hints.requestHint();
    update({ coachRequested: true, offerTier2: false, feedback: null });
    touch();
  }, [isPaused, roundState.phase, hints, update, touch]);

  const hint = useMemo(() => {
    const empty = { tier: 0, text: null as string | null, cardIndex: null as number | null };
    if (hints.tier === 0) return empty;
    if (phase === 'build') {
      if (hints.tier === 1) return { ...empty, tier: 1, text: M.hint.tier1Build };
      if (hints.tier === 2) return { ...empty, tier: 2, text: M.hint.tier2Build };
      const missing =
        target.reactants.find((s) => !roundState.placedReactants.includes(s.bare)) ??
        target.products.find((s) => !roundState.placedProducts.includes(s.bare));
      return { ...empty, tier: 3, text: missing ? M.hint.tier3Build(missing.name, missing.bare, missing.side) : M.hint.tier3Balanced };
    }
    if (hints.tier === 1) {
      const element = nextUp ?? nextElement(parsed, allOnes(parsed)) ?? parsed.elements[0];
      return { ...empty, tier: 1, text: M.hint.tier1(elementName(element)) };
    }
    if (hints.tier === 2) return { ...empty, tier: 2, text: round.reaction.hint ?? M.hint.tier1(elementName(parsed.elements[0])) };
    const move = coefficientHint(parsed, coefficients);
    if (!move) return { ...empty, tier: 3, text: M.hint.tier3Balanced };
    const text =
      move.direction === 'raise'
        ? M.hint.tier3(move.n, move.formula, elementName(move.thenCheck))
        : M.hint.tier3Lower(move.n, move.formula, elementName(move.thenCheck));
    return { ...empty, tier: 3, text, cardIndex: move.index };
  }, [hints.tier, phase, target, roundState.placedReactants, roundState.placedProducts, nextUp, parsed, coefficients, round.reaction.hint]);

  // ---------------------------------------------------------------- coach
  const coach = useMemo(() => {
    const { feedback, lastChange } = roundState;
    const label = M.coach.label;
    const tone = 'coach' as CoachTone;

    if (feedback) return { message: feedback.text, tone: feedback.tone, label: feedback.label, visible: true };

    if (phase === 'done') {
      if (guided) {
        const total = M.guided.steps.length;
        return { message: M.guided.steps[total - 1], tone: 'guide' as CoachTone, label: M.guided.stepLabel(total, total), visible: true };
      }
      const message =
        roundState.divisor > 1 ? M.coach.balancedNotLowest(roundState.divisor, equationText(parsed, coefficients)) : M.coach.balanced;
      return { message, tone: 'success' as CoachTone, label: M.success.label, visible: true };
    }

    if (phase === 'build') return { message: M.challenge.intro, tone, label: M.challenge.label, visible: true };

    if (guided && guideStep >= 0) {
      return {
        message: M.guided.steps[guideStep],
        tone: 'guide' as CoachTone,
        label: M.guided.stepLabel(guideStep + 1, M.guided.steps.length),
        visible: true,
      };
    }

    const visible = scaffold.coachAlwaysOn || roundState.coachRequested;
    if (lastChange && lastChange.fixed.length > 0 && lastChange.broken.length > 0) {
      return { message: M.coach.multiple(elementName(lastChange.fixed[0]), elementName(lastChange.broken[0])), tone, label, visible };
    }
    if (nextUp) {
      const row = rows.find((r) => r.element === nextUp);
      return { message: M.coach.imbalance(elementName(nextUp), row?.left ?? 0, row?.right ?? 0), tone, label, visible };
    }
    return { message: null, tone, label, visible: false };
  }, [roundState, phase, guided, guideStep, parsed, coefficients, scaffold.coachAlwaysOn, nextUp, rows]);

  // ---------------------------------------------------------------- derived
  const reactantCount = parsed.reactants.length;
  const massLeft = relativeMass(parsed.reactants, coefficients.slice(0, reactantCount));
  const massRight = relativeMass(parsed.products, coefficients.slice(reactantCount));
  const accuracy = supportMode || roundsPlayed === 0 ? null : Math.round((roundsWithoutTier3 / roundsPlayed) * 100);

  return {
    level: plan.level,
    isChallenge,
    round,
    roundIndex,
    roundCount: plan.rounds.length,
    isLastRound,
    phase,
    parsed,
    coefficients,
    rows,
    balanced,
    nextElement: nextUp,
    highlightElement: scaffold.highlightNext && phase === 'balance' ? nextUp : null,
    divisor: roundState.divisor,
    equation: equationText(parsed, coefficients),
    massLeft,
    massRight,
    scaffold,
    ledgerShown,
    ledgerOpened: roundState.ledgerOpened,
    observation: scaffold.observation ? round.reaction.description : null,
    guided,
    guideStep,
    guideTotal: M.guided.steps.length,
    offerTier2: roundState.offerTier2 && hints.tier < 2,
    coach,
    hint,
    hintsUsed: hints.highestTierUsed,
    usedPaidHint: hints.usedPaidTier,
    lastPoints: roundState.lastPoints,
    pickerSide: roundState.pickerSide,
    placedReactants: roundState.placedReactants,
    placedProducts: roundState.placedProducts,
    results,
    roundsPlayed,
    accuracy,
    announcement,
    lockAnnouncement,
    actions: {
      setCoefficient,
      increment,
      decrement,
      tapSubscript,
      toggleLedger,
      pickSide,
      addSpecies,
      removeSpecies,
      next,
      skipGuide,
      nextGuideStep,
      requestHint,
      dismissHint: hints.dismiss,
      dismissFeedback,
      startLevel,
    },
  };
}

export type ReactionBalancerGame = ReturnType<typeof useReactionBalancer>;
