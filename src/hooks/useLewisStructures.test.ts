/**
 * The round plan behind Share to Fill: one round per molecule at Levels 1-4
 * with classmate drawings interleaved from Level 2, and a marking level made
 * entirely of drawings with exactly one correct one. The interactive flow is
 * covered by the page test.
 */
import { describe, expect, it } from 'vitest';
import { LEWIS_STRUCTURES_CONFIG as CFG } from '@/core-engine/config/games/lewis-structures-config';
import { lewisMessages } from '@/core-engine/config/games/lewis-structures-messages';
import { elementName } from '@/i18n/chemistry-names';
import { en } from '@/i18n/dictionaries/en';
import { getLewisMolecule, moleculesForLevel } from '@/core-engine/data/lewis-molecules';
import { createStructure, diagnose, isComplete, pairAtoms } from '@/core-engine/utils/lewis-utils';
import { buildCoachText, describeAtom, guideStepAfterPairs, guideTexts, guideTotal, planLevel, type LewisText } from './useLewisStructures';

// The helpers below take their copy explicitly, so the assertions say which
// language they are written in. Rendering in German is covered by the e2e suite.
const M = lewisMessages(en, 'en');
const text: LewisText = { M, elementName: (symbol) => elementName('en', symbol) };

/** A deterministic rng that walks through the unit interval. */
const rngFrom = (seed: number) => {
  let x = seed;
  return () => {
    x = (x * 9301 + 49297) % 233280;
    return x / 233280;
  };
};

describe('planLevel', () => {
  it('plays one round per molecule at Levels 1-4, matching roundsByLevel', () => {
    for (let level = 1; level < CFG.levels.markingLevel; level++) {
      const rounds = planLevel(level, CFG, rngFrom(level));
      expect(rounds.map((r) => r.molecule.id), `level ${level}`).toEqual(moleculesForLevel(level).map((m) => m.id));
      expect(rounds, `level ${level}`).toHaveLength(CFG.levels.roundsByLevel[level - 1]);
    }
  });

  it('keeps Level 1 as pure build rounds and interleaves a drawing every third round from Level 2', () => {
    expect(planLevel(1, CFG, rngFrom(1)).every((r) => r.mode === 'build')).toBe(true);
    for (let level = CFG.levels.inspectFromLevel; level < CFG.levels.markingLevel; level++) {
      const rounds = planLevel(level, CFG, rngFrom(level));
      rounds.forEach((round, i) => {
        expect(round.mode, `level ${level} round ${i + 1}`).toBe((i + 1) % CFG.levels.inspectEveryNRounds === 0 ? 'inspect' : 'build');
      });
    }
  });

  it('gives every inspect round a drawing whose diagnosis matches what diagnose() finds', () => {
    for (let seed = 1; seed <= 12; seed++) {
      for (let level = 2; level <= CFG.levels.maxLevel; level++) {
        for (const round of planLevel(level, CFG, rngFrom(seed)).filter((r) => r.mode === 'inspect')) {
          const found = diagnose(round.drawing);
          expect(found.type, `${round.molecule.id} seed ${seed}`).toBe(round.diagnosis.type);
          expect(isComplete(round.drawing)).toBe(round.diagnosis.type === 'none');
        }
      }
    }
  });

  it('marking mode is six drawings from the whole set with exactly one correct one', () => {
    for (let seed = 1; seed <= 12; seed++) {
      const rounds = planLevel(CFG.levels.markingLevel, CFG, rngFrom(seed));
      expect(rounds).toHaveLength(CFG.levels.roundsByLevel[CFG.levels.markingLevel - 1]);
      expect(rounds.every((r) => r.mode === 'inspect')).toBe(true);
      expect(rounds.filter((r) => r.diagnosis.type === 'none'), `seed ${seed}`).toHaveLength(1);
      expect(new Set(rounds.map((r) => r.molecule.id)).size).toBe(rounds.length);
    }
  });
});

describe('coach text', () => {
  const water = getLewisMolecule('h2o');
  const co2 = getLewisMolecule('co2');

  it('names the atom with the most loners, numbering repeated elements', () => {
    const start = createStructure(water);
    expect(buildCoachText(start, water, text)).toBe(M.coach.loners('Oxygen', 2));
    expect(describeAtom(start, 'a1', text)).toBe('Hydrogen 1');
    expect(describeAtom(start, 'a2', text)).toBe('Hydrogen 2');
  });

  it('suggests sharing again when two bonded atoms both keep a loner', () => {
    const o2 = getLewisMolecule('o2');
    const once = pairAtoms(createStructure(o2), 'a0', 'a1');
    if (!once.ok) throw new Error(once.error);
    expect(buildCoachText(once.structure, o2, text)).toBe(M.coach.shareAgain('Oxygen 1', 'Oxygen 2'));
  });

  it('explains a dead end and an isomer instead of leaving the player stuck', () => {
    let s = createStructure(co2);
    for (const [a, b] of [
      ['a1', 'a2'],
      ['a0', 'a1'],
      ['a0', 'a2'],
    ] as const) {
      const r = pairAtoms(s, a, b);
      if (!r.ok) throw new Error(r.error);
      s = r.structure;
    }
    expect(buildCoachText(s, co2, text)).toBe(M.coach.deadEnd('Carbon', 6));

    const ethanol = getLewisMolecule('c2h5oh');
    let ether = createStructure(ethanol);
    for (const [a, b] of [
      ['a0', 'a2'],
      ['a1', 'a2'],
      ['a0', 'a3'],
      ['a0', 'a4'],
      ['a0', 'a5'],
      ['a1', 'a6'],
      ['a1', 'a7'],
      ['a1', 'a8'],
    ] as const) {
      const r = pairAtoms(ether, a, b);
      if (!r.ok) throw new Error(r.error);
      ether = r.structure;
    }
    expect(buildCoachText(ether, ethanol, text)).toBe(M.coach.isomer('Ethanol'));
  });

  it('announces completion with the bond and lone-pair counts', () => {
    let s = createStructure(water);
    for (const [a, b] of [
      ['a0', 'a1'],
      ['a0', 'a2'],
    ] as const) {
      const r = pairAtoms(s, a, b);
      if (!r.ok) throw new Error(r.error);
      s = r.structure;
    }
    expect(buildCoachText(s, water, text)).toBe(M.coach.complete('Water', 2, 2));
  });
});

describe('guided scripts', () => {
  it('follows the brief step for step: H2 has two lines, H2O four, and pairs advance them', () => {
    expect(guideTotal('h2', M)).toBe(2);
    expect(guideTotal('h2o', M)).toBe(4);
    expect(guideTotal('nh3', M)).toBe(0);
    expect(guideTexts('h2', 0, M)).toBe(M.guided.h2[0]);
    expect(guideStepAfterPairs('h2', 1)).toBe(1);
    expect(guideTexts('h2o', 1, M)).toBe(M.guided.h2o.step2);
    expect(guideStepAfterPairs('h2o', 1)).toBe(2);
    expect(guideTexts('h2o', 2, M)).toBe(`${M.guided.h2o.step2After} ${M.guided.h2o.step3}`);
    expect(guideStepAfterPairs('h2o', 2)).toBe(3);
    expect(guideTexts('h2o', 3, M)).toBe(M.guided.h2o.step4);
    expect(guideTexts('h2o', 4, M)).toBeNull();
  });
});
