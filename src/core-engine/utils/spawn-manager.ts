// src/core-engine/utils/spawn-manager.ts

interface SpawnTracker {
  [lane: number]: number; // Maps lane percentage to last spawn timestamp
}

const laneCooldowns: SpawnTracker = {};

/**
 * Returns a collision-free horizontal X position based on active lane cooldowns.
 */
export function getValidXPosition(
  laneList: readonly number[],
  cooldownMs: number = 800,
  jitterAmount: number = 2.5
): number {
  const now = Date.now();

  // Find lanes that aren't on active cooldown
  const availableLanes = laneList.filter((lane) => {
    const lastSpawn = laneCooldowns[lane] || 0;
    return now - lastSpawn > cooldownMs;
  });

  let chosenLane: number;

  if (availableLanes.length > 0) {
    chosenLane = availableLanes[Math.floor(Math.random() * availableLanes.length)];
  } else {
    // Fallback: pick the least recently used lane
    chosenLane = laneList.reduce((oldest, lane) => {
      const t1 = laneCooldowns[oldest] || 0;
      const t2 = laneCooldowns[lane] || 0;
      return t1 < t2 ? oldest : lane;
    }, laneList[0]);
  }

  // Record spawn timestamp
  laneCooldowns[chosenLane] = now;

  // Add small visual jitter so bubbles don't look rigidly aligned
  const jitter = (Math.random() - 0.5) * jitterAmount * 2;
  return Math.min(Math.max(chosenLane + jitter, 5), 95);
}

export function resetSpawnManager(): void {
  for (const key in laneCooldowns) {
    delete laneCooldowns[key];
  }
}