// src/core-engine/constants/chemical-labels.ts
import type { ChemicalClassification } from '@/core-engine/types/chemistry';

export const PH_CLASSIFICATIONS = {
  ACID: 'Acid',
  BASE: 'Base',
  NEUTRAL: 'Neutral',
  // Amphoteric is completely gone
} as const;

export const CLASSIFICATION_OPTIONS = [
  {
    label: PH_CLASSIFICATIONS.ACID,
    classification: 'Acidic' as ChemicalClassification,
    order: 0,
    iconType: 'droplet',
    colorClass: 'text-(--hue-rose)',
    bgHoverClass: 'hover:bg-rose-950/30',
  },
  {
    label: PH_CLASSIFICATIONS.NEUTRAL,
    classification: 'Neutral' as ChemicalClassification,
    order: 1,
    iconType: 'beaker',
    colorClass: 'text-(--hue-emerald)',
    bgHoverClass: 'hover:bg-emerald-950/30',
  },
  {
    label: PH_CLASSIFICATIONS.BASE,
    classification: 'Basic' as ChemicalClassification,
    order: 2,
    iconType: 'flask',
    colorClass: 'text-(--link)',
    bgHoverClass: 'hover:bg-blue-950/30',
  },
];