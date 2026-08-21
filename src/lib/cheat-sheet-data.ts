// src/lib/cheat-sheet-data.ts

import type { CheatSheetTopic } from '@/core-engine/types/general';

export const CHEAT_SHEETS: CheatSheetTopic[] = [
  {
    slug: 'states-of-matter',
    title: 'States of Matter',
    yearLevel: 'Year 9', // Adjusted per request, though typically Levels 5-8 in Vic Curriculum
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
    yearLevel: 'Year 9',
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
    yearLevel: 'Year 10',
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
  // --- NEW CHEAT SHEETS BELOW ---
  {
    slug: 'chemical-bonds',
    title: 'Chemical Bonds & Structure',
    yearLevel: 'Year 9',
    category: 'Fundamentals', // Assumes 'Fundamentals' is valid for Bond Builder
    summary: 'Understanding how atoms share or transfer electrons to form stable compounds.',
    iconName: 'Atom', 
    colorTheme: 'border-cyan-500 text-cyan-500',
    keyTakeaways: [
      'Covalent Bonds: Non-metals share electrons to achieve a full outer shell.',
      'Ionic Bonds: Metals transfer electrons to non-metals, creating oppositely charged ions.',
      'Valence electrons determine an element’s reactivity and bonding capacity.',
    ],
    formulaExamples: [
      { name: 'Covalent Compound', formula: 'CO2 (Carbon Dioxide)' },
      { name: 'Ionic Compound', formula: 'NaCl (Sodium Chloride)' },
    ],
    sections: [
      {
        heading: 'Achieving Stability',
        content: 'Atoms bond to reach a stable, noble-gas electron configuration. The periodic table group indicates the number of valence electrons available for bonding.',
        examples: [
          { name: 'Water (Covalent)', formula: 'H2O' },
          { name: 'Magnesium Oxide (Ionic)', formula: 'MgO' },
        ],
      },
    ],
  },
  {
    slug: 'chemical-formulas',
    title: 'Writing Chemical Formulas',
    yearLevel: 'Year 10',
    category: 'Equations',
    summary: 'Translating chemical names into standardized symbolic formulas.',
    iconName: 'Zap', // Used Zap for 'Blaster', update to matching ChemIconName if needed
    colorTheme: 'border-rose-500 text-rose-500',
    keyTakeaways: [
      'The symbol of the metal (cation) is always written before the non-metal (anion).',
      'Use subscripts to indicate the number of atoms (e.g., the 2 in H2O).',
      'Polyatomic ions act as a single unit and need brackets if there is more than one (e.g., Ca(OH)2).',
    ],
    formulaExamples: [
      { name: 'Calcium Carbonate', formula: 'CaCO3' },
      { name: 'Aluminium Oxide', formula: 'Al2O3' },
    ],
    sections: [
      {
        heading: 'Balancing Charges',
        content: 'In an ionic compound, the total positive charge must perfectly balance the total negative charge to create a neutral molecule.',
        examples: [
          { name: 'Copper(II) Sulfate', formula: 'CuSO4' },
          { name: 'Iron(III) Chloride', formula: 'FeCl3' },
        ],
      },
    ],
  }
];

/** Helper query functions for App Router pages & tests */
export function getCheatSheetBySlug(slug: string): CheatSheetTopic | undefined {
  return CHEAT_SHEETS.find((sheet) => sheet.slug === slug);
}

export function getAllCheatSheetSlugs(): string[] {
  return CHEAT_SHEETS.map((sheet) => sheet.slug);
}