/**
 * KNOWN ISSUES
 *
 * Behaviour that is wrong today, pinned down so it cannot regress further and
 * so that a fix is noticed. Every test here uses `it.fails`, which PASSES while
 * the bug exists. When you fix one, Vitest reports "Expected test to fail":
 * change that `it.fails` to `it` and move the test into the proper spec file.
 *
 * Background for each item: docs/TESTING.md, section "Known issues".
 */
import { describe, expect, it, vi } from 'vitest';
import { createElement } from 'react';
import { render } from '@testing-library/react';
import { generateComparativeError, parseFormulaAtoms } from '../utils/chemical-utils';
import { getLevelSpawns } from '../utils/level-manager';
import { NEUTRALISE_CONFIG, NEUTRALISE_LEVEL_DATA } from '../config/games/neutralise-config';
import { MONOATOMIC_IONS, POLYATOMIC_IONS } from '../data/ions';
import MoleculeText from '@/components/ui/MoleculeText';
import { compoundByFormula } from '@/test-utils/registry';
import { KNOWN_INCONSISTENT_IONIC_FORMULAS, parseFormulaWithGroups } from './helpers/formula';

describe('Known issues (expected to fail until fixed)', () => {
  it.fails('H2CO3, H3PO4 and H2SO3 declare ionic components that add up to their formula', () => {
    // Each lists every proton as an H+ cation but pairs it with an anion that
    // still carries hydrogen (HCO3-, H2PO4-, HSO3-), so the ions sum to extra
    // hydrogen and a positive net charge. Chemically the anions should be
    // CO3 2-, PO4 3- and SO3 2- (not yet in ions.ts). Once fixed, also remove
    // the formulas from KNOWN_INCONSISTENT_IONIC_FORMULAS in helpers/formula.ts.
    const chargeOf = (ionId: string) =>
      (MONOATOMIC_IONS.find((i) => i.id === ionId) ?? POLYATOMIC_IONS.find((i) => i.id === ionId))?.charge ?? NaN;
    const stillBroken: string[] = [];
    KNOWN_INCONSISTENT_IONIC_FORMULAS.forEach((formula) => {
      const { cations, anions } = compoundByFormula(formula).ionicComponents!;
      const net = [...cations, ...anions].reduce((sum, ref) => sum + chargeOf(ref.ionId) * ref.count, 0);
      if (net !== 0) stillBroken.push(`${formula} (net ${net})`);
    });
    expect(stillBroken).toEqual([]);
  });

  it.fails('MoleculeText renders a multi-digit ionic charge (Ca2+) as a superscript', () => {
    // parseFormula() consumes the digits after a symbol as a subscript before
    // it looks for a charge, so "Ca2+" renders as Ca₂⁺ instead of Ca²⁺.
    const { container } = render(createElement(MoleculeText, { formula: 'Ca2+' }));
    expect(container.querySelector('sup')?.textContent).toBe('2+');
  });

  it.fails('parseFormulaAtoms expands parenthesised groups such as Ba(OH)2 and Cu(NO3)2', () => {
    // Affects the "Show Atom Balance" scaffold in Reaction Balancer for the
    // reactions that contain brackets (Cu(NO3)2, Pb(NO3)2).
    for (const formula of ['Ba(OH)2', 'Cu(NO3)2', 'Pb(NO3)2']) {
      expect(parseFormulaAtoms(formula), formula).toEqual(parseFormulaWithGroups(formula));
    }
  });

  it.fails('generateComparativeError names the missing element instead of printing "undefined"', () => {
    // Registry elements only carry `symbol`, never `name`, so the Formula
    // Blaster error tooltip reads "Look for undefined (K) atoms instead."
    const msg = generateComparativeError(compoundByFormula('HCl'), compoundByFormula('KCl'));
    expect(msg).not.toContain('undefined');
  });

  it.fails('Neutralise can spawn as many enemies as the page waits for at every level', () => {
    // page.tsx waits for base + (level-1) * scaling enemies per wave, but
    // getLevelSpawns caps the wave at NEUTRALISE_LEVEL_DATA[level].maxEnemies.
    // From level 5 the wave can never complete.
    const { baseEnemiesPerWave, enemyScalingPerLevel } = NEUTRALISE_CONFIG.waves;
    NEUTRALISE_LEVEL_DATA.forEach((cfg) => {
      const enemiesPerWave = baseEnemiesPerWave + (cfg.level - 1) * enemyScalingPerLevel;
      expect(enemiesPerWave, `level ${cfg.level}`).toBeLessThanOrEqual(cfg.maxEnemies);
    });
  });

  it.fails('Neutralise invader type agrees with evaluateChemical for amphoteric compounds', () => {
    // level-manager types an invader as 'acid' whenever pKa is defined, so
    // NaHCO3 / Na2HPO4 / NaHS (all Basic per evaluateChemical) must be shot
    // with OH- in Neutralise while the classifier game teaches they are bases.
    vi.spyOn(Math, 'random').mockReturnValue(0);
    const bicarbonate = compoundByFormula('NaHCO3');
    const [invader] = getLevelSpawns(1, [bicarbonate.id], 3);
    expect(invader.formula).toBe('NaHCO3');
    expect(invader.type).toBe('base');
  });
});
