import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { assignSpawnSlots, getValidXPosition, resetSpawnManager } from '../utils/spawn-manager';

const LANES = [12, 28, 44, 60, 76, 88] as const;

describe('assignSpawnSlots (batch spawning, Neutralise)', () => {
  it('returns no slots for a non-positive count', () => {
    expect(assignSpawnSlots(0, LANES)).toEqual([]);
    expect(assignSpawnSlots(-1, LANES)).toEqual([]);
  });

  it('places up to one entity per lane in the first row', () => {
    const slots = assignSpawnSlots(LANES.length, LANES, 0);
    expect(slots).toHaveLength(LANES.length);
    expect(slots.every((s) => s.row === 0)).toBe(true);
    expect(slots.map((s) => s.xPercent).sort((a, b) => a - b)).toEqual([...LANES]);
  });

  it('starts a new row once every lane in a row is taken', () => {
    const slots = assignSpawnSlots(LANES.length + 2, LANES, 0);
    const rows = slots.map((s) => s.row);
    expect(rows.filter((r) => r === 0)).toHaveLength(LANES.length);
    expect(rows.filter((r) => r === 1)).toHaveLength(2);

    const secondRowLanes = slots.filter((s) => s.row === 1).map((s) => s.xPercent);
    expect(new Set(secondRowLanes).size).toBe(2);
  });

  it('keeps jittered positions inside the 5–95% band', () => {
    const slots = assignSpawnSlots(LANES.length, LANES, 50);
    slots.forEach((s) => {
      expect(s.xPercent).toBeGreaterThanOrEqual(5);
      expect(s.xPercent).toBeLessThanOrEqual(95);
    });
  });

  it('keeps jitter within the requested amount', () => {
    const jitter = 2.5;
    const slots = assignSpawnSlots(LANES.length, LANES, jitter);
    slots.forEach((s) => {
      const nearest = Math.min(...LANES.map((lane) => Math.abs(lane - s.xPercent)));
      expect(nearest).toBeLessThanOrEqual(jitter + 1e-9);
    });
  });
});

describe('getValidXPosition (trickle spawning, Formula Blaster)', () => {
  const COOLDOWN = 800;

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01T00:00:00Z'));
    resetSpawnManager();
    // Always pick the first available lane and disable jitter for exact numbers.
    vi.spyOn(Math, 'random').mockReturnValue(0);
  });

  afterEach(() => {
    vi.useRealTimers();
    resetSpawnManager();
  });

  const next = () => {
    vi.advanceTimersByTime(1);
    return getValidXPosition(LANES, COOLDOWN, 0);
  };

  it('never reuses a lane that is still cooling down', () => {
    expect([next(), next(), next(), next(), next(), next()]).toEqual([...LANES]);
  });

  it('falls back to the least recently used lane when every lane is cooling down', () => {
    for (let i = 0; i < LANES.length; i++) next();
    expect(next()).toBe(12);
    expect(next()).toBe(28);
  });

  it('frees a lane again once its cooldown has elapsed', () => {
    expect(next()).toBe(12);
    expect(next()).toBe(28);

    vi.advanceTimersByTime(COOLDOWN - 100);
    expect(next()).toBe(44); // 12 and 28 are still cooling down

    vi.advanceTimersByTime(COOLDOWN);
    expect(next()).toBe(12); // oldest lane is available again
  });

  it('resetSpawnManager clears every cooldown', () => {
    next();
    next();
    resetSpawnManager();
    expect(next()).toBe(12);
  });
});
