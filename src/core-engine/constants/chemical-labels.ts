// src/core-engine/constants/chemical-labels.ts

import { Flame, Droplet, Beaker, Atom } from 'lucide-react';

export const PH_CLASSIFICATIONS = {
  ACIDIC: "Acidic",
  NEUTRAL: "Neutral",
  BASIC: "Basic",
  AMPHOTERIC: "Amphoteric",
} as const;

export type PHClassification = typeof PH_CLASSIFICATIONS[keyof typeof PH_CLASSIFICATIONS];

export const CLASSIFICATION_OPTIONS = [
  { label: PH_CLASSIFICATIONS.ACIDIC, icon: Flame, colorVar: '--acid-color' },
  { label: PH_CLASSIFICATIONS.NEUTRAL, icon: Droplet, colorVar: '--neutral-color' },
  { label: PH_CLASSIFICATIONS.BASIC, icon: Beaker, colorVar: '--base-color' },
  { label: PH_CLASSIFICATIONS.AMPHOTERIC, icon: Atom, colorVar: '--amphoteric-color' },
] as const;