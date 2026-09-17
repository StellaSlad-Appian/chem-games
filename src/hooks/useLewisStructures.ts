// src/hooks/useLewisStructures.ts
//
// The whole rules engine for Share to Fill in one hook, so the page stays
// thin (the useReactionBalancer pattern). Chemistry decisions are delegated to
// the pure functions in core-engine/utils/lewis-utils.ts; this hook owns the
// round plan, the inspect-mode state machine, the coach text, the hint ladder
// and the notebook.
'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { LEWIS_STRUCTURES_CONFIG, type LewisStructuresConfig } from '@/core-engine/config/games/lewis-structures-config';
import { LEWIS_MESSAGES, atomLabel } from '@/core-engine/config/games/lewis-structures-messages';
import { LEWIS_MOLECULES, atomId as makeAtomId, getLewisMolecule, moleculesForLevel } from '@/core-engine/data/lewis-molecules';
import type { LewisDiagnosis, LewisErrorType, LewisMoleculeData, LewisStructure } from '@/core-engine/types/chemistry';
import {
  applicableMutations,
  bondLineText,
  countAround,
  countBonds,
  countLonePairs,
  countSharedPairs,
  createCompleteStructure,
  createStructure,
  fullCount,
  generateFlawedStructure,
  getAtom,
  getElementName,
  isComplete,
  matchesTarget,
  nextMove,
  pairAtoms,
  prepareRepair,
  unpairBond,
  type PairRejection,
} from '@/core-engine/utils/lewis-utils';
import { useHintLadder } from './useHintLadder';
import { useStoredValue } from './useStoredValue';

const M = LEWIS_MESSAGES;

export const GUIDED_SEEN_KEY = 'lewisStructuresGuidedSeen';
export const GUIDED_MOLECULES = ['h2', 'h2o'] as const;

export type RoundMode = 'build' | 'inspect';
export type RoundPhase = 'build' | 'pickAtom' | 'pickDiagnosis' | 'repair' | 'countBonds' | 'countLonePairs' | 'done';
export type CoachTone = 'coach' | 'error' | 'success' | 'guide';

export interface LewisRound {
  index: number;
  molecule: LewisMoleculeData;
  mode: RoundMode;
  /** Inspect rounds: the classmate's error (type 'none' when the drawing is correct). */
  diagnosis: LewisDiagnosis;
  /** Inspect rounds: the drawing as first shown. */
  drawing: LewisStructure;
}

export interface RoundResult {
  moleculeId: string;
  name: string;
  formula: string;
  bondLine: string;
  bonds: number;
  lonePairs: number;
  hintTier: number;
  mode: RoundMode;
  structure: LewisStructure;
  points: number;
  diagnosisLabel?: string;
  firstTryDiagnosis?: boolean;
}

interface CountFeedback {
  kind: 'bonds' | 'lonePairs';
  given: number;
  actual: number;
  missedBonds: string[];
  missedPairs: string[];
}

interface Feedback {
  text: string;
  tone: CoachTone;
  label: string;
}

interface RoundState {
  structure: LewisStructure;
  phase: RoundPhase;
  /** Guided rounds only: how far the script has advanced. */
  guideStep: number;
  guideSkipped: boolean;
  markedAtomId: string | null;
  diagnosisAttempts: number;
  selectedBondIds: string[];
  selectedLonePairs: string[];
  countFeedback: CountFeedback | null;
  feedback: Feedback | null;
  coachRequested: boolean;
  offerTier2: boolean;
  /** Set on the first pairing; the same-group opener shows until then. */
  moved: boolean;
  lastPoints: number;
}

export interface UseLewisStructuresOptions {
  level: number;
  supportMode: boolean;
  isPaused: boolean;
  config?: LewisStructuresConfig;
  rng?: () => number;
  onRoundScored?: (points: number) => void;
  onLevelCleared?: (level: number) => void;
}

// ---------------------------------------------------------------------------
// Pure helpers
// ---------------------------------------------------------------------------

const shuffle = <T>(items: T[], rng: () => number): T[] => {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
};

const pick = <T>(items: T[], rng: () => number): T => items[Math.floor(rng() * items.length) % items.length];

function makeInspectRound(index: number, molecule: LewisMoleculeData, correct: boolean, rng: () => number): LewisRound {
  if (correct) {
    return { index, molecule, mode: 'inspect', diagnosis: { type: 'none', atomIds: [] }, drawing: createCompleteStructure(molecule) };
  }
  const mutation = pick(applicableMutations(molecule), rng);
  const { structure, diagnosis } = generateFlawedStructure(molecule, mutation, rng);
  return { index, molecule, mode: 'inspect', diagnosis, drawing: structure };
}

/** The rounds of a level: one per molecule, with classmate drawings interleaved; Level 5 is all drawings. */
export function planLevel(level: number, config: LewisStructuresConfig, rng: () => number): LewisRound[] {
  const { levels, mechanics } = config;
  if (level >= levels.markingLevel) {
    const count = levels.roundsByLevel[Math.min(level, levels.maxLevel) - 1] ?? 6;
    const molecules = shuffle(LEWIS_MOLECULES, rng).slice(0, count);
    const correctIndex = Math.floor(rng() * molecules.length) % molecules.length;
    return molecules.map((molecule, index) => makeInspectRound(index, molecule, index === correctIndex, rng));
  }
  return moleculesForLevel(level).map((molecule, index) => {
    const inspect = level >= levels.inspectFromLevel && (index + 1) % levels.inspectEveryNRounds === 0;
    if (!inspect) {
      return { index, molecule, mode: 'build' as const, diagnosis: { type: 'none', atomIds: [] }, drawing: createStructure(molecule) };
    }
    const correct = Math.floor(rng() * mechanics.correctStructureRatio) === 0;
    return makeInspectRound(index, molecule, correct, rng);
  });
}

const freshRoundState = (round: LewisRound): RoundState => ({
  structure: round.mode === 'build' ? createStructure(round.molecule) : round.drawing,
  phase: round.mode === 'build' ? 'build' : 'pickAtom',
  guideStep: 0,
  guideSkipped: false,
  markedAtomId: null,
  diagnosisAttempts: 0,
  selectedBondIds: [],
  selectedLonePairs: [],
  countFeedback: null,
  feedback: null,
  coachRequested: false,
  offerTier2: false,
  moved: false,
  lastPoints: 0,
});

/** "Oxygen", or "Oxygen 2" when the molecule has more than one of that element. */
export function describeAtom(structure: LewisStructure, id: string): string {
  const atom = getAtom(structure, id);
  const sameElement = structure.atoms.filter((a) => a.element === atom.element);
  const ordinal = sameElement.findIndex((a) => a.id === id) + 1;
  return atomLabel(getElementName(atom.element), sameElement.length > 1 ? ordinal : undefined);
}

const explanationFor = (structure: LewisStructure, diagnosis: LewisDiagnosis): string => {
  const [first, second] = diagnosis.atomIds;
  switch (diagnosis.type) {
    case 'tooMany':
      return M.inspect.explain.tooMany(describeAtom(structure, first), fullCount(getAtom(structure, first).element));
    case 'tooFew':
      return M.inspect.explain.tooFew(describeAtom(structure, first));
    case 'hydrogenFull':
      return M.inspect.explain.hydrogenFull;
    case 'needsDouble':
      return M.inspect.explain.needsDouble(describeAtom(structure, first), describeAtom(structure, second));
    case 'leftover':
      return M.inspect.explain.leftover(describeAtom(structure, first));
    default:
      return M.inspect.correctStructure;
  }
};

/** The coach's reading of a build-mode structure, in priority order. */
export function buildCoachText(structure: LewisStructure, molecule: LewisMoleculeData): string | null {
  if (isComplete(structure)) {
    return matchesTarget(structure, molecule)
      ? M.coach.complete(molecule.name, countBonds(structure), countLonePairs(structure))
      : M.coach.isomer(molecule.name);
  }
  const shareAgain = structure.bonds.find(
    (b) => getAtom(structure, b.sourceNodeId).unpaired > 0 && getAtom(structure, b.targetNodeId).unpaired > 0
  );
  if (shareAgain) {
    return M.coach.shareAgain(describeAtom(structure, shareAgain.sourceNodeId), describeAtom(structure, shareAgain.targetNodeId));
  }
  const withLoners = [...structure.atoms]
    .filter((a) => a.unpaired > 0)
    .sort((a, b) => b.unpaired - a.unpaired || Number(a.element === 'H') - Number(b.element === 'H'));
  const short = structure.atoms.find((a) => countAround(structure, a.id) < fullCount(a.element));
  // A loner can only pair with a loner on another atom. When every remaining
  // loner sits on one atom (or none is left) the drawing has wandered off the
  // target and a shared pair must be undone.
  if (withLoners.length <= 1 && short) {
    return M.coach.deadEnd(describeAtom(structure, short.id), countAround(structure, short.id));
  }
  if (withLoners.length > 0) {
    return M.coach.loners(describeAtom(structure, withLoners[0].id), withLoners[0].unpaired);
  }
  return null;
}

// ---------------------------------------------------------------------------
// The hook
// ---------------------------------------------------------------------------

export function useLewisStructures({
  level,
  supportMode,
  isPaused,
  config = LEWIS_STRUCTURES_CONFIG,
  rng = Math.random,
  onRoundScored,
  onLevelCleared,
}: UseLewisStructuresOptions) {
  const [guidedSeenRaw, setGuidedSeenRaw] = useStoredValue(GUIDED_SEEN_KEY);
  const guidedSeen = useMemo<string[]>(() => {
    try {
      const parsed = guidedSeenRaw ? (JSON.parse(guidedSeenRaw) as unknown) : [];
      return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === 'string') : [];
    } catch {
      return [];
    }
  }, [guidedSeenRaw]);

  // The plan is keyed by the level it was made for; startLevel() replaces it.
  const [plan, setPlan] = useState<{ level: number; rounds: LewisRound[] }>(() => ({
    level,
    rounds: planLevel(level, config, rng),
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
  // Guided rounds are the first molecule of Levels 1 and 2, once each. The
  // "seen" flag comes from localStorage through useSyncExternalStore, so this
  // is derived every render rather than fixed when the round starts.
  const guided =
    round.mode === 'build' &&
    round.index === 0 &&
    (GUIDED_MOLECULES as readonly string[]).includes(round.molecule.id) &&
    !guidedSeen.includes(round.molecule.id) &&
    !roundState.guideSkipped;
  const guideStep = guided ? roundState.guideStep : -1;

  // Any move restarts the idle timers and withdraws the "still stuck" offer.
  const touch = useCallback(() => {
    setLastActivityAt(Date.now());
    setRoundState((s) => (s.offerTier2 ? { ...s, offerTier2: false } : s));
  }, []);

  const update = useCallback((patch: Partial<RoundState>) => setRoundState((s) => ({ ...s, ...patch })), []);

  const startRound = useCallback(
    (nextPlan: { level: number; rounds: LewisRound[] }, index: number) => {
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
      const nextPlan = { level: nextLevel, rounds: planLevel(nextLevel, config, rng) };
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
    (finalStructure: LewisStructure, extra: Partial<RoundResult> = {}) => {
      const usedPaid = hints.usedPaidTier;
      const usedTier3 = hints.usedTier3;
      const points = config.mechanics.pointsPerLevelMultiplier * plan.level + (usedPaid ? 0 : config.mechanics.noHintBonus);
      const result: RoundResult = {
        moleculeId: round.molecule.id,
        name: round.molecule.name,
        formula: round.molecule.formula,
        bondLine: round.molecule.bondLine,
        bonds: countBonds(finalStructure),
        lonePairs: countLonePairs(finalStructure),
        hintTier: hints.highestTierUsed,
        mode: round.mode,
        structure: finalStructure,
        points,
        ...extra,
      };
      setResults((r) => [...r, result]);
      setRoundsPlayed((n) => n + 1);
      if (!usedTier3) setRoundsWithoutTier3((n) => n + 1);
      setLockAnnouncement(M.ui.live.locked(round.molecule.name));
      onRoundScored?.(points);
      return points;
    },
    [config, hints, plan.level, round, onRoundScored]
  );

  // ---------------------------------------------------------------- build actions
  const rejectionText = (reason: PairRejection, atomIdRejected: string, structure: LewisStructure) => {
    switch (reason) {
      case 'atomFull':
        return M.error.atomFull(describeAtom(structure, atomIdRejected));
      case 'hydrogenFull':
        return M.error.hydrogenFull;
      case 'sameAtom':
        return M.error.sameAtom;
      default:
        return M.error.pairedDot;
    }
  };

  const pair = useCallback(
    (sourceId: string, targetId: string) => {
      if (isPaused || !(roundState.phase === 'build' || roundState.phase === 'repair')) return { ok: false as const };
      touch();
      const result = pairAtoms(roundState.structure, sourceId, targetId);
      if (!result.ok) {
        update({ feedback: { text: rejectionText(result.error, result.atomId, roundState.structure), tone: 'error', label: M.error.label } });
        return { ok: false as const, error: result.error };
      }
      const next = result.structure;
      const a = describeAtom(next, sourceId);
      const b = describeAtom(next, targetId);
      setAnnouncement(M.ui.live.paired(a, b, countAround(next, sourceId), countAround(next, targetId)));
      const complete = isComplete(next) && matchesTarget(next, round.molecule);
      const patch: Partial<RoundState> = { structure: next, feedback: null, moved: true, countFeedback: null };
      if (guided) {
        // H2: the one pair ends the script. H2O: steps 2 and 3 each wait for a pair.
        patch.guideStep = guideStepAfterPairs(round.molecule.id, countSharedPairs(next));
      }
      if (complete) {
        hints.dismiss();
        if (roundState.phase === 'build') {
          patch.phase = 'done';
          patch.lastPoints = finishRound(next);
        } else {
          patch.phase = 'countBonds';
          patch.feedback = { text: `${M.inspect.repaired} ${M.inspect.countBonds}`, tone: 'success', label: M.success.label };
        }
      }
      update(patch);
      return { ok: true as const, complete };
    },
    [isPaused, roundState, touch, update, round, guided, finishRound, hints]
  );

  const unpair = useCallback(
    (bondId: string) => {
      if (isPaused || !(roundState.phase === 'build' || roundState.phase === 'repair')) return;
      touch();
      const bond = roundState.structure.bonds.find((b) => b.id === bondId);
      if (!bond) return;
      const next = unpairBond(roundState.structure, bondId);
      setAnnouncement(M.ui.live.unpaired(describeAtom(next, bond.sourceNodeId), describeAtom(next, bond.targetNodeId)));
      update({ structure: next, feedback: null, countFeedback: null });
    },
    [isPaused, roundState, touch, update]
  );

  const reject = useCallback(
    (reason: 'pairedDot' | 'sameAtom', atomIdRejected: string) => {
      if (isPaused) return;
      touch();
      update({ feedback: { text: rejectionText(reason, atomIdRejected, roundState.structure), tone: 'error', label: M.error.label } });
    },
    [isPaused, roundState.structure, touch, update]
  );

  // ---------------------------------------------------------------- inspect actions
  const tapAtom = useCallback(
    (id: string) => {
      if (isPaused || roundState.phase !== 'pickAtom') return;
      touch();
      const { diagnosis } = round;
      const structure = roundState.structure;
      if (diagnosis.type === 'none') {
        update({ feedback: { text: M.inspect.missedCorrect, tone: 'error', label: M.error.label } });
        return;
      }
      if (!diagnosis.atomIds.includes(id)) {
        update({ feedback: { text: M.inspect.wrongAtom(describeAtom(structure, id), countAround(structure, id)), tone: 'error', label: M.error.label } });
        return;
      }
      update({ markedAtomId: id, phase: 'pickDiagnosis', feedback: null });
    },
    [isPaused, roundState, round, touch, update]
  );

  const sayCorrect = useCallback(() => {
    if (isPaused || roundState.phase !== 'pickAtom') return;
    touch();
    if (round.diagnosis.type === 'none') {
      update({
        phase: 'countBonds',
        feedback: { text: `${M.inspect.correctStructure} ${M.inspect.countBonds}`, tone: 'success', label: M.success.label },
        diagnosisAttempts: roundState.diagnosisAttempts + 1,
      });
      return;
    }
    update({ feedback: { text: M.inspect.notCorrect, tone: 'error', label: M.error.label }, diagnosisAttempts: roundState.diagnosisAttempts + 1 });
  }, [isPaused, roundState, round, touch, update]);

  const pickDiagnosis = useCallback(
    (type: LewisErrorType) => {
      if (isPaused || roundState.phase !== 'pickDiagnosis' || !roundState.markedAtomId) return;
      touch();
      const attempts = roundState.diagnosisAttempts + 1;
      const structure = roundState.structure;
      if (type !== round.diagnosis.type) {
        update({
          diagnosisAttempts: attempts,
          feedback: {
            text: M.inspect.wrongDiagnosis(
              describeAtom(structure, roundState.markedAtomId),
              countAround(structure, roundState.markedAtomId),
              explanationFor(structure, round.diagnosis)
            ),
            tone: 'error',
            label: M.error.label,
          },
        });
        return;
      }
      update({
        diagnosisAttempts: attempts,
        structure: prepareRepair(structure, round.diagnosis),
        phase: 'repair',
        feedback: { text: M.inspect.repair, tone: 'coach', label: M.coach.label },
        markedAtomId: null,
      });
    },
    [isPaused, roundState, round, touch, update]
  );

  const toggleBond = useCallback(
    (bondId: string) => {
      if (isPaused || roundState.phase !== 'countBonds') return;
      touch();
      const selected = roundState.selectedBondIds.includes(bondId)
        ? roundState.selectedBondIds.filter((b) => b !== bondId)
        : [...roundState.selectedBondIds, bondId];
      update({ selectedBondIds: selected, countFeedback: null, feedback: null });
    },
    [isPaused, roundState, touch, update]
  );

  const toggleLonePair = useCallback(
    (atomIdToggled: string, index: number) => {
      if (isPaused || roundState.phase !== 'countLonePairs') return;
      touch();
      const key = `${atomIdToggled}:${index}`;
      const selected = roundState.selectedLonePairs.includes(key)
        ? roundState.selectedLonePairs.filter((k) => k !== key)
        : [...roundState.selectedLonePairs, key];
      update({ selectedLonePairs: selected, countFeedback: null, feedback: null });
    },
    [isPaused, roundState, touch, update]
  );

  const submitCount = useCallback(() => {
    if (isPaused) return;
    touch();
    const structure = roundState.structure;
    const hasDouble = structure.bonds.some((b) => b.order > 1);
    if (roundState.phase === 'countBonds') {
      const actual = countBonds(structure);
      const given = roundState.selectedBondIds.length;
      if (given !== actual) {
        const missed = structure.bonds.filter((b) => !roundState.selectedBondIds.includes(b.id)).map((b) => b.id);
        update({
          countFeedback: { kind: 'bonds', given, actual, missedBonds: missed, missedPairs: [] },
          feedback: { text: M.inspect.countWrong(given, actual, hasDouble), tone: 'error', label: M.error.label },
        });
        return;
      }
      update({
        phase: 'countLonePairs',
        countFeedback: null,
        feedback: { text: `${M.inspect.countRight('bonds', actual)} ${M.inspect.countLonePairs}`, tone: 'success', label: M.success.label },
      });
      return;
    }
    if (roundState.phase === 'countLonePairs') {
      const actual = countLonePairs(structure);
      const given = roundState.selectedLonePairs.length;
      if (given !== actual) {
        const missed: string[] = [];
        structure.atoms.forEach((a) => {
          for (let i = 0; i < a.lonePairs; i++) {
            const key = `${a.id}:${i}`;
            if (!roundState.selectedLonePairs.includes(key)) missed.push(key);
          }
        });
        update({
          countFeedback: { kind: 'lonePairs', given, actual, missedBonds: [], missedPairs: missed },
          feedback: { text: M.inspect.countWrong(given, actual, false), tone: 'error', label: M.error.label },
        });
        return;
      }
      const points = finishRound(structure, {
        diagnosisLabel: M.inspect.diagnosis[round.diagnosis.type],
        firstTryDiagnosis: roundState.diagnosisAttempts <= 1,
      });
      update({ phase: 'done', countFeedback: null, feedback: null, lastPoints: points });
    }
  }, [isPaused, roundState, round, touch, update, finishRound]);

  // ---------------------------------------------------------------- round flow
  const isLastRound = roundIndex >= plan.rounds.length - 1;

  const next = useCallback(() => {
    if (roundState.phase !== 'done') return;
    if (guided) {
      setGuidedSeenRaw(JSON.stringify(Array.from(new Set([...guidedSeen, round.molecule.id]))));
    }
    if (isLastRound) {
      onLevelCleared?.(plan.level);
      return;
    }
    startRound(plan, roundIndex + 1);
  }, [roundState.phase, guided, setGuidedSeenRaw, guidedSeen, round, isLastRound, onLevelCleared, plan, roundIndex, startRound]);

  const skipGuide = useCallback(() => {
    setGuidedSeenRaw(JSON.stringify(Array.from(new Set([...guidedSeen, round.molecule.id]))));
    update({ guideSkipped: true });
    touch();
  }, [setGuidedSeenRaw, guidedSeen, round, update, touch]);

  const nextGuideStep = useCallback(() => {
    update({ guideStep: roundState.guideStep + 1 });
    touch();
  }, [roundState.guideStep, update, touch]);

  const dismissFeedback = useCallback(() => update({ feedback: null }), [update]);

  // ---------------------------------------------------------------- idle timers
  useEffect(() => {
    if (isPaused || roundState.phase === 'done') return;
    const coachMs = config.mechanics.coachAfterSeconds * 1000;
    const stuckMs = config.mechanics.stuckAfterSeconds * 1000;
    const t1 = window.setTimeout(() => setRoundState((s) => (s.coachRequested ? s : { ...s, coachRequested: true })), coachMs);
    const t2 = window.setTimeout(() => setRoundState((s) => (s.offerTier2 ? s : { ...s, offerTier2: true })), stuckMs);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [lastActivityAt, isPaused, roundState.phase, config.mechanics.coachAfterSeconds, config.mechanics.stuckAfterSeconds]);

  // ---------------------------------------------------------------- hints
  const requestHint = useCallback(() => {
    if (isPaused || roundState.phase === 'done') return;
    hints.requestHint();
    // A hint answers the last wrong move; the error strip gives way to the coach.
    update({ coachRequested: true, offerTier2: false, feedback: null });
    touch();
  }, [isPaused, roundState.phase, hints, update, touch]);

  const hint = useMemo(() => {
    const { structure, phase } = roundState;
    const empty = { tier: 0, text: null as string | null, atomIds: [] as string[], bondIds: [] as string[] };
    if (hints.tier === 0) return empty;
    const inspecting = phase === 'pickAtom' || phase === 'pickDiagnosis';
    if (hints.tier === 1) return { ...empty, tier: 1, text: inspecting ? M.hint.inspect.tier1 : M.hint.tier1 };
    if (hints.tier === 2) return { ...empty, tier: 2, text: inspecting ? M.hint.inspect.tier2 : round.molecule.tier2Hint };
    // Tier 3: one concrete move.
    if (inspecting) {
      if (round.diagnosis.type === 'none') return { ...empty, tier: 3, text: M.hint.inspect.tier3Correct };
      const [id] = round.diagnosis.atomIds;
      return { ...empty, tier: 3, text: M.hint.inspect.tier3(describeAtom(structure, id), countAround(structure, id)), atomIds: round.diagnosis.atomIds };
    }
    if (phase === 'countBonds') return { ...empty, tier: 3, text: M.hint.inspect.tier3Count('bonds', countBonds(structure)) };
    if (phase === 'countLonePairs') return { ...empty, tier: 3, text: M.hint.inspect.tier3Count('lonePairs', countLonePairs(structure)) };
    const move = nextMove(structure, round.molecule);
    if (!move) return { ...empty, tier: 3, text: M.hint.noMoreHints };
    if (move.kind === 'pair') {
      return { ...empty, tier: 3, text: M.hint.tier3(describeAtom(structure, move.atomIds[0]), describeAtom(structure, move.atomIds[1])), atomIds: [...move.atomIds] };
    }
    const bond = structure.bonds.find((b) => b.id === move.bondId);
    if (!bond) return { ...empty, tier: 3, text: M.hint.noMoreHints };
    return {
      ...empty,
      tier: 3,
      text: M.hint.tier3Undo(describeAtom(structure, bond.sourceNodeId), describeAtom(structure, bond.targetNodeId)),
      bondIds: [bond.id],
    };
  }, [hints.tier, roundState, round]);

  // ---------------------------------------------------------------- coach
  const coach = useMemo(() => {
    const { structure, phase, feedback } = roundState;
    const molecule = round.molecule;
    const alwaysOn = supportMode || plan.level <= config.mechanics.coachAlwaysOnUntilLevel;
    const marking = plan.level >= config.levels.markingLevel && !supportMode;

    if (feedback) return { message: feedback.text, tone: feedback.tone, label: feedback.label, visible: true };

    if (guided && guideStep >= 0 && phase !== 'done') {
      const steps = guideTexts(molecule.id, guideStep);
      if (steps) return { message: steps, tone: 'guide' as CoachTone, label: M.guided.stepLabel(guideStep + 1, guideTotal(molecule.id)), visible: true };
    }

    switch (phase) {
      case 'pickAtom':
        return { message: `${M.inspect.classmate(molecule.name)} ${M.inspect.prompt}`, tone: 'coach' as CoachTone, label: M.coach.label, visible: true };
      case 'pickDiagnosis':
        return {
          message: M.inspect.diagnosisPrompt(roundState.markedAtomId ? describeAtom(structure, roundState.markedAtomId) : ''),
          tone: 'coach' as CoachTone,
          label: M.coach.label,
          visible: true,
        };
      case 'countBonds':
        return { message: M.inspect.countBonds, tone: 'coach' as CoachTone, label: M.coach.label, visible: true };
      case 'countLonePairs':
        return { message: M.inspect.countLonePairs, tone: 'coach' as CoachTone, label: M.coach.label, visible: true };
      case 'done':
        // A guided round ends on the script's last line ("...that's a single bond, H–H.").
        return guided
          ? { message: guideTexts(molecule.id, guideTotal(molecule.id) - 1), tone: 'guide' as CoachTone, label: M.guided.stepLabel(guideTotal(molecule.id), guideTotal(molecule.id)), visible: true }
          : { message: null, tone: 'success' as CoachTone, label: M.success.label, visible: false };
      default:
        break;
    }

    // Build or repair: the coach names the next thing to look at.
    const visible = !marking && (alwaysOn || roundState.coachRequested);
    if (phase === 'repair') {
      return roundState.moved
        ? { message: buildCoachText(structure, molecule), tone: 'coach' as CoachTone, label: M.coach.label, visible: visible || supportMode }
        : { message: M.inspect.repair, tone: 'coach' as CoachTone, label: M.coach.label, visible: true };
    }
    if (!roundState.moved && molecule.sameGroupAs) {
      const analogue = getLewisMolecule(molecule.sameGroupAs);
      const element = getElementName(molecule.atoms[molecule.centralAtomIndex]);
      const analogueElement = getElementName(analogue.atoms[analogue.centralAtomIndex]);
      return { message: M.coach.sameGroup(element, analogueElement, analogue.name), tone: 'coach' as CoachTone, label: M.coach.label, visible };
    }
    if (!roundState.moved && plan.level >= config.visuals.unplacedFromLevel) {
      // The level's teaching point: shown even when the coach is otherwise on request.
      return { message: M.coach.central, tone: 'coach' as CoachTone, label: M.coach.label, visible: !marking };
    }
    return { message: buildCoachText(structure, molecule), tone: 'coach' as CoachTone, label: M.coach.label, visible };
  }, [roundState, round, supportMode, plan.level, config, guided, guideStep]);

  // ---------------------------------------------------------------- derived
  const canvasMode = ((): 'build' | 'inspect' | 'countBonds' | 'countLonePairs' | 'readonly' => {
    switch (roundState.phase) {
      case 'build':
      case 'repair':
        return 'build';
      case 'pickAtom':
      case 'pickDiagnosis':
        return 'inspect';
      case 'countBonds':
        return 'countBonds';
      case 'countLonePairs':
        return 'countLonePairs';
      default:
        return 'readonly';
    }
  })();

  const accuracy = supportMode || roundsPlayed === 0 ? null : Math.round((roundsWithoutTier3 / roundsPlayed) * 100);

  const symbolic = useMemo(() => {
    const { structure } = roundState;
    return {
      bondLines: bondLineText(structure),
      atoms: structure.atoms.map((a) => ({
        id: a.id,
        element: a.element,
        count: countAround(structure, a.id),
        full: fullCount(a.element),
        bonds: structure.bonds.filter((b) => b.sourceNodeId === a.id || b.targetNodeId === a.id).length,
        lonePairs: a.lonePairs,
      })),
    };
  }, [roundState]);

  return {
    level: plan.level,
    round,
    roundIndex,
    roundCount: plan.rounds.length,
    isLastRound,
    structure: roundState.structure,
    phase: roundState.phase,
    canvasMode,
    guided,
    guideStep,
    guideTotal: guided ? guideTotal(round.molecule.id) : 0,
    markedAtomId: roundState.markedAtomId,
    selectedBondIds: roundState.selectedBondIds,
    selectedLonePairs: roundState.selectedLonePairs,
    countFeedback: roundState.countFeedback,
    lastPoints: roundState.lastPoints,
    offerTier2: roundState.offerTier2 && hints.tier < 2,
    coach,
    hint,
    hintsUsed: hints.highestTierUsed,
    symbolic,
    results,
    roundsPlayed,
    accuracy,
    announcement,
    lockAnnouncement,
    actions: {
      pair,
      unpair,
      reject,
      tapAtom,
      sayCorrect,
      pickDiagnosis,
      toggleBond,
      toggleLonePair,
      submitCount,
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

// ---------------------------------------------------------------------------
// Guided scripts
// ---------------------------------------------------------------------------

/** Number of displayed guide steps for a molecule. */
export function guideTotal(moleculeId: string): number {
  return moleculeId === 'h2' ? M.guided.h2.length : moleculeId === 'h2o' ? 4 : 0;
}

/** Where the script stands once `sharedPairs` pairs have been made. */
export function guideStepAfterPairs(moleculeId: string, sharedPairs: number): number {
  if (moleculeId === 'h2') return Math.min(1, sharedPairs);
  if (moleculeId === 'h2o') return Math.min(3, 1 + sharedPairs);
  return 0;
}

/** The guide text for a step, or null when the script has ended. */
export function guideTexts(moleculeId: string, step: number): string | null {
  if (moleculeId === 'h2') return M.guided.h2[step] ?? null;
  if (moleculeId === 'h2o') {
    const { step1, step2, step2After, step3, step4 } = M.guided.h2o;
    switch (step) {
      case 0:
        return step1;
      case 1:
        return step2;
      case 2:
        return `${step2After} ${step3}`;
      case 3:
        return step4;
      default:
        return null;
    }
  }
  return null;
}

/** Helper for tests and the page header: the atom id of a molecule's central atom. */
export const centralAtomId = (molecule: LewisMoleculeData) => makeAtomId(molecule.centralAtomIndex);
