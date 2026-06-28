// src/types/molecular-combat.ts

// src/core-engine/types/molecular-combat.ts

export interface MoleculeInvader {
  id: string;
  formula: string;
  x: number; 
  y: number; 
  type: 'acid' | 'base' | 'neutral';
  maxHealth: number;      // Added: Total H+ or OH- needed
  currentHealth: number; // Added: Tracks remaining hits
  isAlive: boolean;
  lastFired: number; 
}

export interface Projectile {
  id: string;
  x: number;
  y: number;
  damageType: 'H-ion' | 'OH-ion' | 'radical';
  speed: number;
  isPlayerOwned: boolean; // Added: Differentiates who fired it
}