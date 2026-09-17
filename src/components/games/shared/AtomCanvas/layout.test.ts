import { describe, expect, it } from 'vitest';
import { getLewisMolecule, LEWIS_MOLECULES } from '@/core-engine/data/lewis-molecules';
import { createCompleteStructure, createStructure } from '@/core-engine/utils/lewis-utils';
import { layoutAtoms } from './layout';

const near = (a: number, b: number) => Math.abs(a - b) < 1e-6;

describe('layoutAtoms', () => {
  it('places every atom of every molecule with no two atoms on the same spot', () => {
    for (const molecule of LEWIS_MOLECULES) {
      const structure = createCompleteStructure(molecule);
      const { positions, width, height } = layoutAtoms(structure.atoms, structure.bonds, { rootId: 'a0' });
      expect(Object.keys(positions).sort(), molecule.id).toEqual(structure.atoms.map((a) => a.id).sort());
      const points = Object.values(positions);
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const d = Math.hypot(points[i].x - points[j].x, points[i].y - points[j].y);
          expect(d, `${molecule.id} atoms ${i} and ${j}`).toBeGreaterThan(0.5);
        }
      }
      expect(width).toBeGreaterThanOrEqual(0);
      expect(height).toBeGreaterThanOrEqual(0);
      points.forEach((p) => {
        expect(p.x).toBeGreaterThanOrEqual(-1e-9);
        expect(p.y).toBeGreaterThanOrEqual(-1e-9);
      });
    }
  });

  it('draws water in a line with oxygen in the middle and keeps a bond one unit long', () => {
    const water = createCompleteStructure(getLewisMolecule('h2o'));
    const { positions } = layoutAtoms(water.atoms, water.bonds, { rootId: 'a0' });
    expect(near(positions.a0.x, 1) && near(positions.a0.y, positions.a1.y)).toBe(true);
    expect(Math.hypot(positions.a1.x - positions.a0.x, positions.a1.y - positions.a0.y)).toBeCloseTo(1);
    expect(Math.hypot(positions.a2.x - positions.a0.x, positions.a2.y - positions.a0.y)).toBeCloseTo(1);
  });

  it('continues a chain straight on and hangs hydrogens off it (ethanol is C-C-O-H)', () => {
    const ethanol = createCompleteStructure(getLewisMolecule('c2h5oh'));
    const { positions } = layoutAtoms(ethanol.atoms, ethanol.bonds, { rootId: 'a0' });
    expect(positions.a1.x).toBeGreaterThan(positions.a0.x);
    expect(positions.a2.x).toBeGreaterThan(positions.a1.x);
    expect(positions.a8.x).toBeGreaterThan(positions.a2.x);
    expect(near(positions.a0.y, positions.a1.y) && near(positions.a1.y, positions.a2.y)).toBe(true);
  });

  it('puts unbonded atoms in centred rows before any pair is made', () => {
    const methane = createStructure(getLewisMolecule('ch4'));
    const { positions, height } = layoutAtoms(methane.atoms, []);
    expect(height).toBe(0);
    const xs = methane.atoms.map((a) => positions[a.id].x).sort((a, b) => a - b);
    for (let i = 1; i < xs.length; i++) expect(xs[i] - xs[i - 1]).toBeCloseTo(0.9);
  });

  it('keeps unbonded atoms in a tray under the bonded ones once building has started', () => {
    const methane = createStructure(getLewisMolecule('ch4'));
    const bonds = [{ id: 'b0', sourceNodeId: 'a0', targetNodeId: 'a1', order: 1 as const }];
    const { positions } = layoutAtoms(methane.atoms, bonds, { rootId: 'a0' });
    const bondedY = Math.max(positions.a0.y, positions.a1.y);
    ['a2', 'a3', 'a4'].forEach((id) => expect(positions[id].y).toBeGreaterThan(bondedY));
    expect(positions.a2.y).toBe(positions.a3.y);
  });

  it('centres the largest component on the preferred root', () => {
    const co2 = createStructure(getLewisMolecule('co2'));
    const bonds = [
      { id: 'b0', sourceNodeId: 'a0', targetNodeId: 'a1', order: 1 as const },
      { id: 'b1', sourceNodeId: 'a0', targetNodeId: 'a2', order: 1 as const },
    ];
    const { positions } = layoutAtoms(co2.atoms, bonds, { rootId: 'a0' });
    expect(positions.a0.x).toBeCloseTo(1);
    expect(new Set([positions.a1.x, positions.a2.x])).toEqual(new Set([0, 2]));
  });
});
