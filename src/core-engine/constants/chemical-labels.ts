// src/core-engine/constants/chemical-labels.ts

export const PH_CLASSIFICATIONS = {
  ACID: 'Acid',
  BASE: 'Base',
  NEUTRAL: 'Neutral',
  // Amphoteric is completely gone
} as const;

export const CLASSIFICATION_OPTIONS = [
  {
    label: PH_CLASSIFICATIONS.ACID,
    iconType: 'droplet', 
    colorClass: 'text-rose-500',
    bgHoverClass: 'hover:bg-rose-950/30',
  },
  {
    label: PH_CLASSIFICATIONS.BASE,
    iconType: 'flask',
    colorClass: 'text-blue-500',
    bgHoverClass: 'hover:bg-blue-950/30',
  },
  {
    label: PH_CLASSIFICATIONS.NEUTRAL,
    iconType: 'beaker',
    colorClass: 'text-emerald-500',
    bgHoverClass: 'hover:bg-emerald-950/30',
  }
];