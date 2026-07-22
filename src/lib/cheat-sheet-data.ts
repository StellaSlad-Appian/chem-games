// src/lib/cheat-sheet-data.ts

import type { CheatSheetTopic } from '@/core-engine/types/general';

export const CHEAT_SHEETS: CheatSheetTopic[] = [
  {
    slug: 'states-of-matter',
    title: 'States of Matter',
    yearLevel: 'Year 7',
    category: 'Fundamentals',
    summary: 'Particle arrangement, energy levels, and phase changes in solids, liquids, and gases.',
    iconName: 'Shapes',
    colorTheme: 'border-blue-500 text-blue-500',
    keyTakeaways: [
      'Solids have fixed volume and shape with tightly packed particles.',
      'Liquids take the shape of their container but maintain fixed volume.',
      'Gases expand to fill any container with high particle movement.',
    ],
    formulaExamples: [
      { name: 'Water (Liquid)', formula: 'H2O (l)' },
      { name: 'Ice (Solid)', formula: 'H2O (s)' },
      { name: 'Steam (Gas)', formula: 'H2O (g)' },
    ],
    sections: [
      {
        heading: 'Phase Changes & States',
        content: 'Matter transitions between solid, liquid, and gas phases when kinetic energy (temperature) changes.',
        examples: [
          { name: 'Water (Liquid)', formula: 'H2O (l)' },
          { name: 'Ice (Solid)', formula: 'H2O (s)' },
          { name: 'Steam (Gas)', formula: 'H2O (g)' },
        ],
      },
    ],
  },
  {
    slug: 'acids-and-bases',
    title: 'Acids & Bases',
    yearLevel: 'Year 8',
    category: 'Acids & Bases',
    summary: 'Understanding the pH scale, proton donors (acids), and hydroxide release (bases).',
    iconName: 'TestTube',
    colorTheme: 'border-purple-500 text-purple-500',
    keyTakeaways: [
      'Acids have pH < 7 and release Hydrogen ions (H+).',
      'Bases have pH > 7 and release Hydroxide ions (OH-).',
      'Neutral substances (pure water) sit at pH 7.',
    ],
    formulaExamples: [
      { name: 'Hydrochloric Acid', formula: 'HCl' },
      { name: 'Sodium Hydroxide', formula: 'NaOH' },
      { name: 'Sulfuric Acid', formula: 'H2SO4' },
    ],
    sections: [
      {
        heading: 'Common Acids and Bases',
        content: 'Acids dissociate to produce H+ ions, while bases dissociate to yield OH- ions in water.',
        examples: [
          { name: 'Hydrochloric Acid', formula: 'HCl' },
          { name: 'Sodium Hydroxide', formula: 'NaOH' },
          { name: 'Sulfuric Acid', formula: 'H2SO4' },
        ],
      },
    ],
  },
  {
    slug: 'balancing-equations',
    title: 'Balancing Chemical Equations',
    yearLevel: 'Year 9',
    category: 'Equations',
    summary: 'Applying the Law of Conservation of Mass so atom counts match on both sides.',
    iconName: 'Scale',
    colorTheme: 'border-emerald-500 text-emerald-500',
    keyTakeaways: [
      'Matter cannot be created or destroyed in a chemical reaction.',
      'Adjust coefficients (big numbers in front), NEVER subscripts.',
      'Count atoms of each element on Reactant side vs. Product side.',
    ],
    formulaExamples: [
      { name: 'Unbalanced', formula: 'H2 + O2 -> H2O' },
      { name: 'Balanced', formula: '2H2 + O2 -> 2H2O' },
    ],
    sections: [
      {
        heading: 'Conservation of Mass',
        content: 'Both sides of a chemical equation must contain equal counts of every element.',
        examples: [
          { name: 'Unbalanced', formula: 'H2 + O2 -> H2O' },
          { name: 'Balanced', formula: '2H2 + O2 -> 2H2O' },
        ],
      },
    ],
  },
  {
    slug: 'reaction-types',
    title: 'Types of Chemical Reactions',
    yearLevel: 'Year 10',
    category: 'Reactions',
    summary: 'Identifying Synthesis, Decomposition, Combustion, and Neutralisation reactions.',
    iconName: 'Flame',
    colorTheme: 'border-amber-500 text-amber-500',
    keyTakeaways: [
      'Synthesis: A + B -> AB',
      'Decomposition: AB -> A + B',
      'Neutralisation: Acid + Base -> Salt + Water',
      'Combustion: Hydrocarbon + O2 -> CO2 + H2O',
    ],
    formulaExamples: [
      { name: 'Neutralisation', formula: 'HCl + NaOH -> NaCl + H2O' },
      { name: 'Combustion', formula: 'CH4 + 2O2 -> CO2 + 2H2O' },
    ],
    sections: [
      {
        heading: 'Reaction Examples',
        content: 'Chemical reactions fall into standard predictable patterns like synthesis or neutralisation.',
        examples: [
          { name: 'Neutralisation', formula: 'HCl + NaOH -> NaCl + H2O' },
          { name: 'Combustion', formula: 'CH4 + 2O2 -> CO2 + 2H2O' },
        ],
      },
    ],
  },
];

/** Helper query functions for App Router pages & tests */
export function getCheatSheetBySlug(slug: string): CheatSheetTopic | undefined {
  return CHEAT_SHEETS.find((sheet) => sheet.slug === slug);
}

export function getAllCheatSheetSlugs(): string[] {
  return CHEAT_SHEETS.map((sheet) => sheet.slug);
}