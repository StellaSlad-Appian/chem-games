import { describe, expect, it, vi } from 'vitest';
import { getLevelSpawns } from '../utils/level-manager';
import { NEUTRALISE_LEVEL_DATA } from '../config/games/neutralise-config';
import { calculateMoleculeHealth, evaluateChemical } from '../utils/chemical-utils';
import { compoundByFormula, compoundById } from '@/test-utils/registry';

const LEVEL_1 = NEUTRALISE_LEVEL_DATA[0];

describe('getLevelSpawns', () => {
  it("caps the wave at the level's maxEnemies", () => {
    const invaders = getLevelSpawns(LEVEL_1.maxEnemies + 5, LEVEL_1.compoundPoolIds, 1);
    expect(invaders).toHaveLength(LEVEL_1.maxEnemies);
  });

  it('spawns exactly the requested count when it is under the cap', () => {
    expect(getLevelSpawns(1, LEVEL_1.compoundPoolIds, 1)).toHaveLength(1);
  });

  it('only draws from the requested compound pool', () => {
    const allowed = new Set(LEVEL_1.compoundPoolIds.map((id) => compoundById(id).formula));
    for (let run = 0; run < 20; run++) {
      getLevelSpawns(LEVEL_1.maxEnemies, LEVEL_1.compoundPoolIds, 1).forEach((invader) => {
        expect(allowed.has(invader.formula)).toBe(true);
      });
    }
  });

  it('starts each invader alive, at full health, at the origin, with health from the registry', () => {
    getLevelSpawns(LEVEL_1.maxEnemies, LEVEL_1.compoundPoolIds, 1).forEach((invader) => {
      expect(invader.isAlive).toBe(true);
      expect(invader.x).toBe(0);
      expect(invader.y).toBe(0);
      expect(invader.currentHealth).toBe(invader.maxHealth);
      expect(invader.maxHealth).toBe(calculateMoleculeHealth(compoundByFormula(invader.formula)));
    });
  });

  it('gives every invader a unique id', () => {
    const ids = getLevelSpawns(LEVEL_1.maxEnemies, LEVEL_1.compoundPoolIds, 1).map((i) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('falls back to the level-1 rules for an unknown level', () => {
    expect(getLevelSpawns(99, LEVEL_1.compoundPoolIds, 999)).toHaveLength(LEVEL_1.maxEnemies);
  });

  it('falls back to every non-neutral compound when no pool id matches', () => {
    const invaders = getLevelSpawns(3, ['does-not-exist'], 1);
    expect(invaders).toHaveLength(3);
    invaders.forEach((invader) => {
      expect(evaluateChemical(compoundByFormula(invader.formula))).not.toBe('Neutral');
    });
  });

  it('never spawns a neutral compound even if the pool asks for one', () => {
    const salt = compoundByFormula('NaCl');
    expect(evaluateChemical(salt)).toBe('Neutral');
    getLevelSpawns(3, [salt.id], 1).forEach((invader) => {
      expect(invader.formula).not.toBe('NaCl');
    });
  });

  it('marks strong acids and strong bases with the matching ion type', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    const [acid] = getLevelSpawns(1, [compoundByFormula('HCl').id], 1);
    expect(acid.formula).toBe('HCl');
    expect(acid.type).toBe('acid');

    const [base] = getLevelSpawns(1, [compoundByFormula('NaOH').id], 1);
    expect(base.formula).toBe('NaOH');
    expect(base.type).toBe('base');
  });
});
