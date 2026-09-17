// src/components/games/shared/AtomCanvas/layout.ts
//
// Pure geometry for the atom canvas: where each atom sits, in "bond units"
// (one bond = 1). The component scales units to pixels. Used by Share to Fill
// and reusable by Bond Builder.

import type { BondConnection, LewisAtomState } from '@/core-engine/types/chemistry';

export interface UnitPoint {
  x: number;
  y: number;
}

export interface CanvasLayout {
  /** Position of every atom, translated so the bounding box starts at (0, 0). */
  positions: Record<string, UnitPoint>;
  width: number;
  height: number;
}

const toRad = (deg: number) => (deg * Math.PI) / 180;

/** Angles for a root's k neighbours: right first, then evenly around. */
function rootAngles(k: number): number[] {
  if (k <= 1) return [0];
  if (k === 2) return [0, 180];
  if (k === 3) return [0, 120, 240];
  if (k === 4) return [0, 90, 180, 270];
  return Array.from({ length: k }, (_, i) => (360 / k) * i);
}

/** Angles for a non-root atom's m children, continuing away from its parent. */
function branchAngles(incoming: number, m: number): number[] {
  if (m <= 1) return [incoming];
  if (m === 2) return [incoming - 60, incoming + 60];
  if (m === 3) return [incoming, incoming - 60, incoming + 60];
  const spread = 150;
  return Array.from({ length: m }, (_, i) => incoming - spread / 2 + (spread / (m - 1)) * i);
}

interface LayoutOptions {
  /** Preferred centre of the main component (the molecule's central atom). */
  rootId?: string;
}

/**
 * Lays out a graph as a radial tree per connected component. Bonded
 * components sit side by side; atoms with no bonds go to a tray row
 * underneath, or, when nothing is bonded yet, into centred rows.
 */
export function layoutAtoms(atoms: LewisAtomState[], bonds: BondConnection[], options: LayoutOptions = {}): CanvasLayout {
  const neighbours = new Map<string, string[]>();
  atoms.forEach((a) => neighbours.set(a.id, []));
  for (const bond of bonds) {
    neighbours.get(bond.sourceNodeId)?.push(bond.targetNodeId);
    neighbours.get(bond.targetNodeId)?.push(bond.sourceNodeId);
  }
  const element = (id: string) => atoms.find((a) => a.id === id)?.element ?? '';
  const isHeavy = (id: string) => element(id) !== 'H';
  const indexOf = (id: string) => atoms.findIndex((a) => a.id === id);

  // Connected components, in atom order.
  const seen = new Set<string>();
  const components: string[][] = [];
  for (const atom of atoms) {
    if (seen.has(atom.id)) continue;
    const component: string[] = [];
    const queue = [atom.id];
    seen.add(atom.id);
    while (queue.length) {
      const id = queue.shift() as string;
      component.push(id);
      for (const next of neighbours.get(id) ?? []) {
        if (!seen.has(next)) {
          seen.add(next);
          queue.push(next);
        }
      }
    }
    components.push(component);
  }

  const bonded = components.filter((c) => c.length > 1);
  const loose = components.filter((c) => c.length === 1).map((c) => c[0]);

  // Largest component first; the preferred root's component wins ties.
  bonded.sort((a, b) => {
    if (b.length !== a.length) return b.length - a.length;
    const aHasRoot = options.rootId && a.includes(options.rootId) ? 1 : 0;
    const bHasRoot = options.rootId && b.includes(options.rootId) ? 1 : 0;
    return bHasRoot - aHasRoot;
  });

  const positions: Record<string, UnitPoint> = {};
  let cursorX = 0;
  let mainHeight = 0;

  for (const component of bonded) {
    const root =
      options.rootId && component.includes(options.rootId)
        ? options.rootId
        : [...component].sort(
            (a, b) =>
              (neighbours.get(b)?.length ?? 0) - (neighbours.get(a)?.length ?? 0) ||
              Number(isHeavy(b)) - Number(isHeavy(a)) ||
              indexOf(a) - indexOf(b)
          )[0];

    const local: Record<string, UnitPoint> = { [root]: { x: 0, y: 0 } };
    const placed = new Set<string>([root]);
    const sortChildren = (ids: string[]) =>
      [...ids].sort((a, b) => Number(isHeavy(b)) - Number(isHeavy(a)) || indexOf(a) - indexOf(b));

    const place = (id: string, incoming: number | null) => {
      const children = sortChildren((neighbours.get(id) ?? []).filter((n) => !placed.has(n)));
      children.forEach((c) => placed.add(c));
      const angles = incoming === null ? rootAngles(children.length) : branchAngles(incoming, children.length);
      children.forEach((child, i) => {
        const angle = angles[i];
        local[child] = {
          x: local[id].x + Math.cos(toRad(angle)),
          y: local[id].y + Math.sin(toRad(angle)),
        };
      });
      children.forEach((child, i) => place(child, angles[i]));
    };
    place(root, null);

    const xs = Object.values(local).map((p) => p.x);
    const ys = Object.values(local).map((p) => p.y);
    const minX = Math.min(...xs);
    const minY = Math.min(...ys);
    for (const [id, p] of Object.entries(local)) {
      positions[id] = { x: p.x - minX + cursorX, y: p.y - minY };
    }
    cursorX += Math.max(...xs) - minX + 1.4;
    mainHeight = Math.max(mainHeight, Math.max(...ys) - minY);
  }

  if (loose.length > 0) {
    const spacing = 0.9;
    if (bonded.length === 0) {
      // Nothing joined yet: centred rows of up to five atoms.
      const perRow = 5;
      const rows = Math.ceil(loose.length / perRow);
      loose.forEach((id, i) => {
        const row = Math.floor(i / perRow);
        const inRow = row === rows - 1 ? loose.length - row * perRow : perRow;
        const col = i % perRow;
        positions[id] = { x: (col - (inRow - 1) / 2) * spacing, y: row * 1.1 };
      });
    } else {
      // A tray row underneath the bonded atoms, centred.
      const mainWidth = Math.max(0, cursorX - 1.4);
      loose.forEach((id, i) => {
        positions[id] = { x: mainWidth / 2 + (i - (loose.length - 1) / 2) * spacing, y: mainHeight + 1.3 };
      });
    }
  }

  const xs = Object.values(positions).map((p) => p.x);
  const ys = Object.values(positions).map((p) => p.y);
  const minX = xs.length ? Math.min(...xs) : 0;
  const minY = ys.length ? Math.min(...ys) : 0;
  for (const p of Object.values(positions)) {
    p.x -= minX;
    p.y -= minY;
  }
  return {
    positions,
    width: xs.length ? Math.max(...xs) - minX : 0,
    height: ys.length ? Math.max(...ys) - minY : 0,
  };
}
