/**
 * The Reaction Balancer rules engine in isolation: the guided first
 * reaction, coach text, error diagnostics, the hint ladder, lowest terms,
 * scaffolding per level, the idle timers and the Challenge builder.
 */
import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { REACTION_BALANCER_CONFIG as CFG } from '@/core-engine/config/games/reaction-balancer-config';
import { reactionBalancerMessages } from '@/i18n/game-messages/reaction-balancer';
import { en } from '@/i18n/dictionaries/en';
import { TestProviders } from '@/test-utils/render';
import { getReaction } from '@/core-engine/data/reactions';
import { WATER_REACTION_ID, answerCoefficients, planBalancerLevel } from '@/core-engine/utils/balancer-utils';
import { GUIDED_SEEN_KEY, guideStepFor, useReactionBalancer, type UseReactionBalancerOptions } from './useReactionBalancer';

// The hook reads its copy from the i18n provider, so the assertions below are
// against the English dictionary. German rendering is covered by the e2e suite.
const M = reactionBalancerMessages(en, 'en');

const zero = () => 0;

function setup(overrides: Partial<UseReactionBalancerOptions> = {}) {
  const onRoundScored = vi.fn();
  const onLevelCleared = vi.fn();
  const hook = renderHook(
    () =>
      useReactionBalancer({ level: 1, supportMode: false, isPaused: false, rng: zero, onRoundScored, onLevelCleared, ...overrides }),
    { wrapper: TestProviders }
  );
  return { ...hook, onRoundScored, onLevelCleared };
}

const markGuideSeen = () => localStorage.setItem(GUIDED_SEEN_KEY, 'true');

/** Solves the current round with no hints, straight from the answer key. */
function playCurrentRound(result: { current: ReturnType<typeof useReactionBalancer> }) {
  const answer = answerCoefficients(result.current.parsed);
  for (let i = 0; i < answer.length && result.current.phase !== 'done'; i++) {
    if (result.current.coefficients[i] !== answer[i]) {
      act(() => {
        result.current.actions.setCoefficient(i, answer[i]);
      });
    }
  }
  expect(result.current.phase).toBe('done');
}

describe('guideStepFor', () => {
  it('follows the water script and leaves it when the player wanders off', () => {
    expect(guideStepFor([1, 1, 1], false, false)).toBe(0);
    expect(guideStepFor([1, 1, 1], true, false)).toBe(1);
    expect(guideStepFor([1, 1, 2], true, false)).toBe(2);
    expect(guideStepFor([2, 1, 2], true, true)).toBe(3);
    expect(guideStepFor([1, 2, 1], true, false)).toBe(-1);
    expect(guideStepFor([3, 1, 2], true, false)).toBe(-1);
  });
});

describe('useReactionBalancer: guided first reaction', () => {
  it('opens on water with the first guide step, then waits for each move', () => {
    const { result } = setup();
    expect(result.current.round.reaction.id).toBe(WATER_REACTION_ID);
    expect(result.current.phase).toBe('balance');
    expect(result.current.coefficients).toEqual([1, 1, 1]);
    expect(result.current.guided).toBe(true);
    expect(result.current.guideStep).toBe(0);
    expect(result.current.coach).toMatchObject({ message: M.guided.steps[0], tone: 'guide', visible: true, label: M.guided.stepLabel(1, 4) });

    act(() => result.current.actions.nextGuideStep());
    expect(result.current.coach.message).toBe(M.guided.steps[1]);

    act(() => {
      result.current.actions.increment(2); // H2O -> 2
    });
    expect(result.current.coefficients).toEqual([1, 1, 2]);
    expect(result.current.coach.message).toBe(M.guided.steps[2]);

    let change: ReturnType<typeof result.current.actions.setCoefficient> | undefined;
    act(() => {
      change = result.current.actions.setCoefficient(0, 2); // H2 -> 2
    });
    expect(change).toEqual({ ok: true, locked: true });
    expect(result.current.phase).toBe('done');
    expect(result.current.balanced).toBe(true);
    expect(result.current.coach.message).toBe(M.guided.steps[3]);
    expect(result.current.lastPoints).toBe(CFG.mechanics.pointsPerLevelMultiplier + CFG.mechanics.lowestTermsBonus);
    expect(result.current.results).toHaveLength(1);
    expect(result.current.results[0]).toMatchObject({ equation: '2H2(g) + O2(g) -> 2H2O(l)', hintTier: 0, lowestTermsFirst: true, divisor: 1 });
    expect(result.current.lockAnnouncement).toBe(M.ui.live.locked('2H2(g) + O2(g) -> 2H2O(l)'));

    act(() => result.current.actions.next());
    expect(localStorage.getItem(GUIDED_SEEN_KEY)).toBe('true');
    expect(result.current.roundIndex).toBe(1);
    expect(result.current.guided).toBe(false);
  });

  it('can be skipped, after which the coach names the unbalanced row', () => {
    const { result } = setup();
    act(() => result.current.actions.skipGuide());
    expect(result.current.guided).toBe(false);
    expect(localStorage.getItem(GUIDED_SEEN_KEY)).toBe('true');
    expect(result.current.coach.message).toBe(M.coach.imbalance('Oxygen', 2, 1));
    expect(result.current.coach.visible).toBe(true);
  });

  it('never shows again once seen', () => {
    markGuideSeen();
    const { result } = setup();
    expect(result.current.guided).toBe(false);
    expect(result.current.coach.message).toBe(M.coach.imbalance('Oxygen', 2, 1));
  });
});

describe('useReactionBalancer: coefficients and diagnostics', () => {
  beforeEach(markGuideSeen);

  it('explains a zero, a too-big number, a non-number and a subscript tap, and never says "wrong"', () => {
    const { result } = setup();
    let change: ReturnType<typeof result.current.actions.setCoefficient> | undefined;
    act(() => {
      change = result.current.actions.decrement(0);
    });
    expect(change).toEqual({ ok: false, reason: 'zero' });
    expect(result.current.coach).toMatchObject({ message: M.error.zero('H2'), tone: 'error', label: M.error.label });

    act(() => {
      change = result.current.actions.setCoefficient(0, CFG.mechanics.maxCoefficient + 1);
    });
    expect(change).toEqual({ ok: false, reason: 'max' });
    expect(result.current.coach.message).toBe(M.error.max);

    act(() => {
      change = result.current.actions.setCoefficient(0, '');
    });
    expect(change).toEqual({ ok: false, reason: 'notANumber' });
    expect(result.current.coach.message).toBe(M.error.notANumber);

    act(() => result.current.actions.tapSubscript());
    expect(result.current.coach.message).toBe(M.error.subscriptTap);
    expect(result.current.coefficients).toEqual([1, 1, 1]);

    [M.error.zero('H2'), M.error.max, M.error.notANumber, M.error.subscriptTap].forEach((text) => {
      expect(text.toLowerCase()).not.toMatch(/^wrong|^incorrect/);
    });
  });

  it('says what a change fixed and what it broke, and announces the change', () => {
    const { result } = setup();
    act(() => {
      result.current.actions.setCoefficient(2, 2);
    });
    expect(result.current.coach.message).toBe(M.coach.multiple('Oxygen', 'Hydrogen'));
    expect(result.current.rows).toEqual([
      expect.objectContaining({ element: 'H', left: 2, right: 4, balanced: false }),
      expect.objectContaining({ element: 'O', left: 2, right: 2, balanced: true }),
    ]);
    expect(result.current.announcement).toContain(M.ui.live.changed('water', 2));
    expect(result.current.announcement).toContain(M.ledger.row('Hydrogen', 2, 4));
    expect(result.current.equation).toBe('H2(g) + O2(g) -> 2H2O(l)');
  });

  it('locks any valid multiple, simplifies it and withholds the lowest-terms bonus', () => {
    const { result } = setup();
    act(() => {
      result.current.actions.setCoefficient(0, 4);
    });
    act(() => {
      result.current.actions.setCoefficient(1, 2);
    });
    act(() => {
      result.current.actions.setCoefficient(2, 4);
    });
    expect(result.current.phase).toBe('done');
    expect(result.current.divisor).toBe(2);
    expect(result.current.coefficients).toEqual([2, 1, 2]);
    expect(result.current.coach.message).toBe(M.coach.balancedNotLowest(2, '2H2(g) + O2(g) -> 2H2O(l)'));
    expect(result.current.lastPoints).toBe(CFG.mechanics.pointsPerLevelMultiplier);
    expect(result.current.results[0]).toMatchObject({ lowestTermsFirst: false, divisor: 2 });
  });

  it('ignores moves while paused or once locked', () => {
    const { result, rerender } = renderHook(
      ({ isPaused }: { isPaused: boolean }) => useReactionBalancer({ level: 1, supportMode: false, isPaused, rng: zero }),
      { initialProps: { isPaused: true }, wrapper: TestProviders }
    );
    let change: ReturnType<typeof result.current.actions.setCoefficient> | undefined;
    act(() => {
      change = result.current.actions.setCoefficient(2, 2);
    });
    expect(change).toEqual({ ok: false, reason: 'paused' });
    expect(result.current.coefficients).toEqual([1, 1, 1]);

    rerender({ isPaused: false });
    act(() => {
      result.current.actions.setCoefficient(2, 2);
    });
    act(() => {
      result.current.actions.setCoefficient(0, 2);
    });
    expect(result.current.phase).toBe('done');
    act(() => {
      change = result.current.actions.setCoefficient(0, 3);
    });
    expect(change).toEqual({ ok: false, reason: 'paused' });
    expect(result.current.coefficients).toEqual([2, 1, 2]);
  });
});

describe('useReactionBalancer: hint ladder', () => {
  beforeEach(markGuideSeen);

  it('climbs which-element, strategy, one coefficient; tier 2 costs the bonus, tier 3 the accuracy', () => {
    const { result } = setup();
    expect(result.current.hint.tier).toBe(0);
    act(() => result.current.actions.requestHint());
    expect(result.current.hint).toMatchObject({ tier: 1, text: M.hint.tier1('Oxygen'), cardIndex: null });
    act(() => result.current.actions.requestHint());
    expect(result.current.hint).toMatchObject({ tier: 2, text: getReaction(WATER_REACTION_ID).hint });
    act(() => result.current.actions.requestHint());
    expect(result.current.hint).toMatchObject({ tier: 3, text: M.hint.tier3(2, 'H2O', 'Hydrogen'), cardIndex: 2 });
    expect(result.current.usedPaidHint).toBe(true);

    act(() => {
      result.current.actions.setCoefficient(2, 2);
    });
    // The hint follows the state: now hydrogen needs fixing via H2.
    expect(result.current.hint).toMatchObject({ tier: 3, text: M.hint.tier3(2, 'H2', 'Hydrogen'), cardIndex: 0 });
    act(() => {
      result.current.actions.setCoefficient(0, 2);
    });
    expect(result.current.hint.tier).toBe(0);
    expect(result.current.lastPoints).toBe(CFG.mechanics.pointsPerLevelMultiplier);
    expect(result.current.results[0].hintTier).toBe(3);
    expect(result.current.accuracy).toBe(0);
  });

  it('tier 1 is free: the bonus and the accuracy survive it', () => {
    const { result } = setup();
    act(() => result.current.actions.requestHint());
    act(() => result.current.actions.dismissHint());
    expect(result.current.hint.tier).toBe(0);
    act(() => {
      result.current.actions.setCoefficient(2, 2);
    });
    act(() => {
      result.current.actions.setCoefficient(0, 2);
    });
    expect(result.current.lastPoints).toBe(CFG.mechanics.pointsPerLevelMultiplier + CFG.mechanics.lowestTermsBonus);
    expect(result.current.accuracy).toBe(100);
  });

  it('suggests lowering a coefficient that overshoots', () => {
    const { result } = setup();
    act(() => {
      result.current.actions.setCoefficient(2, 2); // water is right ...
    });
    act(() => {
      result.current.actions.setCoefficient(0, 3); // ... but hydrogen overshoots
    });
    act(() => result.current.actions.requestHint());
    act(() => result.current.actions.requestHint());
    act(() => result.current.actions.requestHint());
    expect(result.current.hint.text).toBe(M.hint.tier3Lower(2, 'H2', 'Hydrogen'));
  });
});

describe('useReactionBalancer: idle timers', () => {
  beforeEach(() => {
    markGuideSeen();
    vi.useFakeTimers();
  });
  afterEach(() => vi.useRealTimers());

  it('opens the coach with tier 1 after coachAfterSeconds and offers tier 2 after stuckAfterSeconds', () => {
    const { result } = setup({ level: 3 });
    act(() => result.current.actions.startLevel(3));
    expect(result.current.coach.visible).toBe(false);
    act(() => {
      vi.advanceTimersByTime(CFG.mechanics.coachAfterSeconds * 1000 + 10);
    });
    expect(result.current.coach.visible).toBe(true);
    expect(result.current.hint.tier).toBe(1);
    expect(result.current.offerTier2).toBe(false);
    act(() => {
      vi.advanceTimersByTime((CFG.mechanics.stuckAfterSeconds - CFG.mechanics.coachAfterSeconds) * 1000 + 10);
    });
    expect(result.current.offerTier2).toBe(true);
    // Any move withdraws the offer.
    act(() => {
      result.current.actions.increment(0);
    });
    expect(result.current.offerTier2).toBe(false);
  });

  it('does not run while paused', () => {
    const { result } = setup({ level: 3, isPaused: true });
    act(() => result.current.actions.startLevel(3));
    act(() => {
      vi.advanceTimersByTime(CFG.mechanics.stuckAfterSeconds * 1000 + 10);
    });
    expect(result.current.coach.visible).toBe(false);
    expect(result.current.offerTier2).toBe(false);
  });
});

describe('useReactionBalancer: scaffolding by level', () => {
  beforeEach(markGuideSeen);

  it('Level 1 highlights the next row; Level 2 does not; Level 3 hides the clusters and the coach until asked', () => {
    const { result } = setup();
    expect(result.current.highlightElement).toBe('O');
    expect(result.current.scaffold.clusters).toBe(true);
    expect(result.current.observation).toBeNull();

    act(() => result.current.actions.startLevel(2));
    expect(result.current.level).toBe(2);
    expect(result.current.highlightElement).toBeNull();
    expect(result.current.scaffold.clusters).toBe(true);
    expect(result.current.coach.visible).toBe(true);

    act(() => result.current.actions.startLevel(3));
    expect(result.current.scaffold.clusters).toBe(false);
    expect(result.current.coach.visible).toBe(false);
    expect(result.current.coach.message).not.toBeNull();
    expect(result.current.observation).toBe(result.current.round.reaction.description);
    act(() => result.current.actions.requestHint());
    expect(result.current.coach.visible).toBe(true);
  });

  it('Level 4 hides the ledger; opening it costs the bonus', () => {
    const { result } = setup();
    act(() => result.current.actions.startLevel(4));
    expect(result.current.ledgerShown).toBe(false);
    expect(result.current.scaffold.ledgerCostsBonus).toBe(true);
    act(() => result.current.actions.toggleLedger());
    expect(result.current.ledgerShown).toBe(true);
    const answer = answerCoefficients(result.current.parsed);
    // Coefficients are applied one per act so each sees the latest state.
    for (let i = 0; i < answer.length && result.current.phase !== 'done'; i++) {
      if (result.current.coefficients[i] !== answer[i]) {
        act(() => {
          result.current.actions.setCoefficient(i, answer[i]);
        });
      }
    }
    expect(result.current.phase).toBe('done');
    expect(result.current.lastPoints).toBe(CFG.mechanics.pointsPerLevelMultiplier * 4);
  });

  it('Support mode forces the Level 1-2 scaffolding everywhere and records no accuracy', () => {
    const { result } = setup({ supportMode: true });
    act(() => result.current.actions.startLevel(4));
    expect(result.current.ledgerShown).toBe(true);
    expect(result.current.scaffold.clusters).toBe(true);
    expect(result.current.highlightElement).not.toBeNull();
    expect(result.current.coach.visible).toBe(true);
    act(() => result.current.actions.requestHint());
    act(() => result.current.actions.requestHint());
    act(() => result.current.actions.requestHint());
    const answer = answerCoefficients(result.current.parsed);
    for (let i = 0; i < answer.length && result.current.phase !== 'done'; i++) {
      if (result.current.coefficients[i] !== answer[i]) {
        act(() => {
          result.current.actions.setCoefficient(i, answer[i]);
        });
      }
    }
    expect(result.current.phase).toBe('done');
    expect(result.current.accuracy).toBeNull();
  });

  it('withholds accuracy for the whole session once Support mode has been on, until a restart', () => {
    const { result, rerender } = renderHook(
      ({ supportMode }: { supportMode: boolean }) => useReactionBalancer({ level: 1, supportMode, isPaused: false, rng: zero }),
      { wrapper: TestProviders, initialProps: { supportMode: true } }
    );
    // Switched off before the round is finished: the run was still supported.
    rerender({ supportMode: false });
    playCurrentRound(result);
    expect(result.current.roundsPlayed).toBe(1);
    expect(result.current.accuracy).toBeNull();

    // A restart is a new session, and this one never had support.
    act(() => result.current.actions.startLevel(1, { resetRun: true }));
    playCurrentRound(result);
    expect(result.current.accuracy).toBe(100);
  });

  it('switching Support mode on mid-session withholds accuracy the session had earned', () => {
    const { result, rerender } = renderHook(
      ({ supportMode }: { supportMode: boolean }) => useReactionBalancer({ level: 1, supportMode, isPaused: false, rng: zero }),
      { wrapper: TestProviders, initialProps: { supportMode: false } }
    );
    playCurrentRound(result);
    expect(result.current.accuracy).toBe(100);
    rerender({ supportMode: true });
    rerender({ supportMode: false });
    expect(result.current.accuracy).toBeNull();
  });

  it('the Challenge is a new session: its accuracy starts from zero rounds but the notebook keeps the run', () => {
    const { result } = setup();
    playCurrentRound(result);
    expect(result.current.roundsPlayed).toBe(1);
    expect(result.current.results).toHaveLength(1);

    act(() => result.current.actions.startLevel(CFG.levels.challengeLevel, { newSession: true }));
    expect(result.current.roundsPlayed).toBe(0);
    expect(result.current.accuracy).toBeNull();
    expect(result.current.results).toHaveLength(1);
  });

  it('finishing the last round of a level reports the level; the plan resets with the run', () => {
    const { result, onLevelCleared, onRoundScored } = setup();
    const rounds = planBalancerLevel(1, CFG, zero);
    rounds.forEach((round, i) => {
      expect(result.current.round.reaction.id).toBe(round.reaction.id);
      const answer = answerCoefficients(round.parsed);
      for (let j = 0; j < answer.length && result.current.phase !== 'done'; j++) {
        if (result.current.coefficients[j] !== answer[j]) {
          act(() => {
            result.current.actions.setCoefficient(j, answer[j]);
          });
        }
      }
      expect(result.current.phase).toBe('done');
      expect(result.current.isLastRound).toBe(i === rounds.length - 1);
      act(() => result.current.actions.next());
    });
    expect(onLevelCleared).toHaveBeenCalledWith(1);
    expect(onRoundScored).toHaveBeenCalledTimes(rounds.length);
    expect(result.current.roundsPlayed).toBe(rounds.length);
    act(() => result.current.actions.startLevel(1, { resetRun: true }));
    expect(result.current.results).toEqual([]);
    expect(result.current.roundsPlayed).toBe(0);
  });
});

describe('useReactionBalancer: Challenge level', () => {
  beforeEach(markGuideSeen);

  it('builds the equation from the picker with diagnostics for wrong compounds and wrong sides, then balances', () => {
    const { result } = setup({ level: CFG.levels.challengeLevel });
    expect(result.current.isChallenge).toBe(true);
    expect(result.current.phase).toBe('build');
    expect(result.current.coach.message).toBe(M.challenge.intro);
    const target = result.current.round.parsed;
    const distractor = result.current.round.distractors[0];

    let outcome: ReturnType<typeof result.current.actions.addSpecies> | undefined;
    act(() => {
      outcome = result.current.actions.addSpecies(distractor);
    });
    expect(outcome).toEqual({ ok: false, built: false });
    expect(result.current.coach.message).toContain('is not part of this reaction');

    const product = target.products[0];
    act(() => {
      outcome = result.current.actions.addSpecies(product.bare, 'reactant');
    });
    expect(outcome).toEqual({ ok: false, built: false });
    expect(result.current.coach.message).toBe(M.challenge.wrongSide(product.name, 'product'));

    target.reactants.forEach((s) => {
      act(() => {
        result.current.actions.addSpecies(s.bare, 'reactant');
      });
    });
    act(() => result.current.actions.pickSide('product'));
    target.products.forEach((s) => {
      act(() => {
        outcome = result.current.actions.addSpecies(s.bare);
      });
    });
    expect(outcome).toEqual({ ok: true, built: true });
    expect(result.current.phase === 'balance' || result.current.phase === 'done').toBe(true);
    expect(result.current.parsed.species.map((s) => s.bare)).toEqual(target.species.map((s) => s.bare));
    expect(result.current.ledgerShown).toBe(false);

    const answer = answerCoefficients(result.current.parsed);
    for (let i = 0; i < answer.length && result.current.phase !== 'done'; i++) {
      if (result.current.coefficients[i] !== answer[i]) {
        act(() => {
          result.current.actions.setCoefficient(i, answer[i]);
        });
      }
    }
    expect(result.current.phase).toBe('done');
    expect(result.current.results[0]).toMatchObject({ mode: 'challenge', points: CFG.mechanics.pointsPerLevelMultiplier * 5 + CFG.mechanics.lowestTermsBonus });
  });

  it('offers build-phase hints and lets a placed compound be removed', () => {
    const { result } = setup({ level: CFG.levels.challengeLevel });
    const target = result.current.round.parsed;
    act(() => result.current.actions.requestHint());
    expect(result.current.hint.text).toBe(M.hint.tier1Build);
    act(() => result.current.actions.requestHint());
    expect(result.current.hint.text).toBe(M.hint.tier2Build);
    act(() => result.current.actions.requestHint());
    const first = target.reactants[0];
    expect(result.current.hint.text).toBe(M.hint.tier3Build(first.name, first.bare, 'reactant'));

    act(() => {
      result.current.actions.addSpecies(first.bare, 'reactant');
    });
    expect(result.current.placedReactants).toEqual([first.bare]);
    act(() => result.current.actions.removeSpecies('reactant', first.bare));
    expect(result.current.placedReactants).toEqual([]);
  });
});
