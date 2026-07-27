// src/core-engine/utils/spawn-manager.ts

export interface SpawnSlot {
  xPercent: number; // 0-100, position along arena width
  row: number;       // 0-indexed vertical row within this wave
}

/**
 * BATCH spawning — for games that place a whole wave of entities at once
 * (e.g. Neutralise). Pure and stateless: since the batch is generated
 * synchronously in one pass, slots only need to avoid colliding with each
 * other within this call.
 *
 * Invaders are laid out in rows of up to `laneList.length` each: no two
 * entities in the same row ever share a lane (horizontal safety), and
 * different rows are always separated by the caller's vertical gap
 * (vertical safety) — both guaranteed by construction, not by chance.
 */
export function assignSpawnSlots(
  count: number,
  laneList: readonly number[],
  jitterAmount: number = 2.5
): SpawnSlot[] {
  if (count <= 0) return [];

  const slots: SpawnSlot[] = [];
  const lanesPerRow = laneList.length;

  for (let row = 0; row * lanesPerRow < count; row++) {
    const remaining = count - row * lanesPerRow;
    const invadersThisRow = Math.min(lanesPerRow, remaining);

    const shuffledLanes = [...laneList].sort(() => Math.random() - 0.5);

    for (let i = 0; i < invadersThisRow; i++) {
      const jitter = (Math.random() - 0.5) * jitterAmount * 2;
      const xPercent = Math.min(Math.max(shuffledLanes[i] + jitter, 5), 95);
      slots.push({ xPercent, row });
    }
  }

  return slots;
}

// Tracks last-used timestamp per lane, for TRICKLE spawning below.
const laneCooldowns: Record<number, number> = {};

/**
 * TRICKLE spawning — for games that spawn one entity at a time on an
 * interval (e.g. Formula Blaster's bubbles). Unlike assignSpawnSlots, this
 * genuinely needs to remember state *between* calls, since each call
 * represents a spawn separated in real time from the last — a lane that
 * was just used a moment ago should stay clear for `cooldownMs` before
 * being reused, so bubbles don't stack on top of each other as they spawn.
 */
export function getValidXPosition(
  laneList: readonly number[],
  cooldownMs: number = 800,
  jitterAmount: number = 2.5
): number {
  const now = Date.now();

  const availableLanes = laneList.filter((lane) => {
    const lastSpawn = laneCooldowns[lane] || 0;
    return now - lastSpawn > cooldownMs;
  });

  let chosenLane: number;

  if (availableLanes.length > 0) {
    chosenLane = availableLanes[Math.floor(Math.random() * availableLanes.length)];
  } else {
    // Every lane is on cooldown — fall back to the least-recently-used one.
    // Safe here (unlike the old Neutralise batch usage) because trickle
    // spawns are spread out in time, not all landing in the same instant.
    chosenLane = laneList.reduce((oldest, lane) => {
      const t1 = laneCooldowns[oldest] || 0;
      const t2 = laneCooldowns[lane] || 0;
      return t1 < t2 ? oldest : lane;
    }, laneList[0]);
  }

  laneCooldowns[chosenLane] = now;

  const jitter = (Math.random() - 0.5) * jitterAmount * 2;
  return Math.min(Math.max(chosenLane + jitter, 5), 95);
}

/** Clears trickle-spawn cooldown state. Call when a trickle-spawning game/level/wave resets. */
export function resetSpawnManager(): void {
  for (const key in laneCooldowns) {
    delete laneCooldowns[key];
  }
}