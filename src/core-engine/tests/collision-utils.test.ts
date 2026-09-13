import { describe, expect, it } from 'vitest';
import { getCollisionResult, isColliding } from '../utils/collision-utils';
import type { MoleculeInvader } from '../types/molecular-combat';

const projectileBox = { width: 24, height: 24 };
const invaderBox = { width: 60, height: 50 };

describe('isColliding', () => {
  it('detects overlapping boxes', () => {
    expect(isColliding({ x: 10, y: 10 }, projectileBox, { x: 0, y: 0 }, invaderBox)).toBe(true);
  });

  it('detects boxes that are apart horizontally', () => {
    expect(isColliding({ x: 100, y: 0 }, projectileBox, { x: 0, y: 0 }, invaderBox)).toBe(false);
  });

  it('detects boxes that are apart vertically', () => {
    expect(isColliding({ x: 0, y: 100 }, projectileBox, { x: 0, y: 0 }, invaderBox)).toBe(false);
  });

  it('treats touching edges as not colliding', () => {
    // Projectile starts exactly where the invader's right edge ends.
    expect(isColliding({ x: 60, y: 0 }, projectileBox, { x: 0, y: 0 }, invaderBox)).toBe(false);
  });

  it('widens the hit area by the margin', () => {
    expect(isColliding({ x: 60, y: 0 }, projectileBox, { x: 0, y: 0 }, invaderBox, 1)).toBe(true);
  });
});

describe('getCollisionResult', () => {
  const invader = (currentHealth: number): MoleculeInvader => ({
    id: 'inv',
    formula: 'H2SO4',
    x: 0,
    y: 0,
    type: 'acid',
    maxHealth: 3,
    currentHealth,
    isAlive: true,
    lastFired: 0,
  });

  it('subtracts damage and keeps the invader alive while health remains', () => {
    expect(getCollisionResult(invader(3), 1)).toEqual({ isDefeated: false, remainingHealth: 2 });
  });

  it('defeats the invader when health reaches zero', () => {
    expect(getCollisionResult(invader(1), 1)).toEqual({ isDefeated: true, remainingHealth: 0 });
  });

  it('never reports negative health', () => {
    expect(getCollisionResult(invader(1), 5)).toEqual({ isDefeated: true, remainingHealth: 0 });
  });

  it('floors fractional health', () => {
    expect(getCollisionResult(invader(2), 0.5)).toEqual({ isDefeated: false, remainingHealth: 1 });
  });
});
