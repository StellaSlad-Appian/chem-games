// src/core-engine/config/games/classifier-games-config.ts

/*
 ==============================================================================
  CLASSIFIER GAMES - UAT TUNING GUIDE
 ==============================================================================
 These core parameters drive ALL classification games across your platform.

 1. IF PLAYERS SAY: "The game feels too unforgiving / I lose too quickly!"
    Increase `mechanics.maxMistakes` (e.g., 3 -> 5)

 2. IF PLAYERS SAY: "Levels drag on too long!"
    Decrease `levels.minPassingItems` (e.g., 5 -> 3)

 3. IF PLAYERS SAY: "Feedback disappears too fast / I can't read why I was wrong!"
    Increase `timing.mistakeTransitionMs` (e.g., 1200 -> 2000)

 4. IF PLAYERS SAY: "The game feels laggy / waiting too long after correct picks!"
    Decrease `timing.successTransitionMs` (e.g., 1000 -> 600)
 ==============================================================================
*/

const OPTION_1_BALANCED = {
  levels: { maxLevel: 5, minPassingItems: 4 },
  mechanics: { maxMistakes: 3, pointsPerLevelMultiplier: 100 },
  timing: { successTransitionMs: 1000, mistakeTransitionMs: 1500, failStateDelayMs: 800 },
} as const;

export const OPTION_2_LEARNING = {
  levels: { maxLevel: 5, minPassingItems: 3 },
  mechanics: { maxMistakes: 5, pointsPerLevelMultiplier: 100 },
  timing: { successTransitionMs: 1200, mistakeTransitionMs: 2000, failStateDelayMs: 1000 },
} as const;

export const OPTION_3_ARCADE = {
  levels: { maxLevel: 5, minPassingItems: 5 },
  mechanics: { maxMistakes: 3, pointsPerLevelMultiplier: 150 },
  timing: { successTransitionMs: 600, mistakeTransitionMs: 1200, failStateDelayMs: 600 },
} as const;

// Active shared mechanics preset across all classifier games
const ACTIVE_BASE_CONFIG = OPTION_1_BALANCED;

// -------------------------------------------------------------
// 1. ACID & BASE CLASSIFIER (Grade 9–10)
// -------------------------------------------------------------
export const ACID_CLASSIFICATION_CONFIG = {
  ...ACTIVE_BASE_CONFIG,
  gameId: 'acid-base-classifier',
  title: 'Acid & Base Classifier',
  categories: [
    {
      id: 'acid',
      label: 'Acidic',
      description: 'pH < 7 (Releases H⁺ ions)',
      colorClass: 'border-rose-500 text-rose-400 bg-rose-500/10 hover:bg-rose-500/20',
      iconName: 'FlaskConical',
    },
    {
      id: 'base',
      label: 'Basic / Alkaline',
      description: 'pH > 7 (Releases OH⁻ ions)',
      colorClass: 'border-blue-500 text-blue-400 bg-blue-500/10 hover:bg-blue-500/20',
      iconName: 'TestTube',
    },
    {
      id: 'neutral',
      label: 'Neutral',
      description: 'pH = 7 (Pure H₂O, Salts)',
      colorClass: 'border-emerald-500 text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20',
      iconName: 'Droplet',
    },
  ] as const,
} as const;

// -------------------------------------------------------------
// 2. CHEMICAL BONDING CLASSIFIER (Grade 9–10)
// -------------------------------------------------------------
export const BONDING_CLASSIFICATION_CONFIG = {
  ...ACTIVE_BASE_CONFIG,
  gameId: 'bonding-classifier',
  title: 'Chemical Bonding Classifier',
  categories: [
    {
      id: 'ionic',
      label: 'Ionic',
      description: 'Metal + Non-Metal (Transfer of e⁻)',
      colorClass: 'border-amber-500 text-amber-400 bg-amber-500/10 hover:bg-amber-500/20',
      iconName: 'Zap',
    },
    {
      id: 'covalent',
      label: 'Covalent',
      description: 'Non-Metal + Non-Metal (Sharing of e⁻)',
      colorClass: 'border-cyan-500 text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20',
      iconName: 'Share2',
    },
    {
      id: 'metallic',
      label: 'Metallic',
      description: 'Metal + Metal (Delocalized e⁻ sea)',
      colorClass: 'border-purple-500 text-purple-400 bg-purple-500/10 hover:bg-purple-500/20',
      iconName: 'Grid',
    },
  ] as const,
} as const;

// -------------------------------------------------------------
// 3. REACTION TYPES CLASSIFIER (Grade 11)
// -------------------------------------------------------------
export const REACTION_TYPE_CONFIG = {
  ...ACTIVE_BASE_CONFIG,
  gameId: 'reaction-type-classifier',
  title: 'Reaction Type Classifier',
  categories: [
    {
      id: 'synthesis',
      label: 'Synthesis',
      description: 'A + B → AB',
      colorClass: 'border-emerald-500 text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20',
      iconName: 'PlusCircle',
    },
    {
      id: 'decomposition',
      label: 'Decomposition',
      description: 'AB → A + B',
      colorClass: 'border-rose-500 text-rose-400 bg-rose-500/10 hover:bg-rose-500/20',
      iconName: 'MinusCircle',
    },
    {
      id: 'combustion',
      label: 'Combustion',
      description: 'Fuel + O₂ → CO₂ + H₂O',
      colorClass: 'border-orange-500 text-orange-400 bg-orange-500/10 hover:bg-orange-500/20',
      iconName: 'Flame',
    },
    {
      id: 'replacement',
      label: 'Replacement',
      description: 'Single/Double Displacement',
      colorClass: 'border-blue-500 text-blue-400 bg-blue-500/10 hover:bg-blue-500/20',
      iconName: 'Repeat',
    },
  ] as const,
} as const;

// -------------------------------------------------------------
// 4. STATES OF MATTER CLASSIFIER (Grade 9)
// -------------------------------------------------------------
export const STATES_CLASSIFICATION_CONFIG = {
  ...ACTIVE_BASE_CONFIG,
  gameId: 'states-of-matter-classifier',
  title: 'States of Matter Classifier',
  categories: [
    {
      id: 'solid',
      label: 'Solid',
      description: 'Fixed shape & volume',
      colorClass: 'border-indigo-500 text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20',
      iconName: 'Box',
    },
    {
      id: 'liquid',
      label: 'Liquid',
      description: 'Adapts shape, fixed volume',
      colorClass: 'border-sky-500 text-sky-400 bg-sky-500/10 hover:bg-sky-500/20',
      iconName: 'Waves',
    },
    {
      id: 'gas',
      label: 'Gas',
      description: 'Fills any container volume',
      colorClass: 'border-teal-500 text-teal-400 bg-teal-500/10 hover:bg-teal-500/20',
      iconName: 'Wind',
    },
  ] as const,
} as const;

// -------------------------------------------------------------
// 5. ELECTROLYTE STRENGTH CLASSIFIER (Grade 11–12)
// -------------------------------------------------------------
export const ELECTROLYTE_CLASSIFICATION_CONFIG = {
  ...ACTIVE_BASE_CONFIG,
  gameId: 'electrolyte-classifier',
  title: 'Electrolyte Strength Classifier',
  categories: [
    {
      id: 'strong',
      label: 'Strong Electrolyte',
      description: '100% dissociation into ions',
      colorClass: 'border-emerald-500 text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20',
      iconName: 'Zap',
    },
    {
      id: 'weak',
      label: 'Weak Electrolyte',
      description: 'Partial dissociation (< 5%)',
      colorClass: 'border-amber-500 text-amber-400 bg-amber-500/10 hover:bg-amber-500/20',
      iconName: 'ZapOff',
    },
    {
      id: 'non',
      label: 'Non-Electrolyte',
      description: 'Does not form ions in water',
      colorClass: 'border-rose-500 text-rose-400 bg-rose-500/10 hover:bg-rose-500/20',
      iconName: 'ShieldAlert',
    },
  ] as const,
} as const;

// -------------------------------------------------------------
// 6. FUNCTIONAL GROUPS CLASSIFIER (Grade 12 / Organic)
// -------------------------------------------------------------
export const ORGANIC_FUNCTIONAL_CONFIG = {
  ...ACTIVE_BASE_CONFIG,
  gameId: 'functional-group-classifier',
  title: 'Organic Functional Group Classifier',
  categories: [
    {
      id: 'alcohol',
      label: 'Alcohol',
      description: 'Hydroxyl group (-OH)',
      colorClass: 'border-cyan-500 text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20',
      iconName: 'Droplets',
    },
    {
      id: 'carboxylic',
      label: 'Carboxylic Acid',
      description: 'Carboxyl group (-COOH)',
      colorClass: 'border-rose-500 text-rose-400 bg-rose-500/10 hover:bg-rose-500/20',
      iconName: 'FlaskConical',
    },
    {
      id: 'hydrocarbon',
      label: 'Hydrocarbon',
      description: 'Alkanes, Alkenes, Alkynes',
      colorClass: 'border-amber-500 text-amber-400 bg-amber-500/10 hover:bg-amber-500/20',
      iconName: 'Flame',
    },
  ] as const,
} as const;

// -------------------------------------------------------------
// 7. MOLECULAR POLARITY CLASSIFIER (Grade 11–12)
// -------------------------------------------------------------
export const POLARITY_CLASSIFICATION_CONFIG = {
  ...ACTIVE_BASE_CONFIG,
  gameId: 'molecular-polarity-classifier',
  title: 'Molecular Polarity Classifier',
  categories: [
    {
      id: 'polar',
      label: 'Polar Molecule',
      description: 'Asymmetric dipole moment',
      colorClass: 'border-blue-500 text-blue-400 bg-blue-500/10 hover:bg-blue-500/20',
      iconName: 'Compass',
    },
    {
      id: 'nonpolar',
      label: 'Non-Polar Molecule',
      description: 'Symmetrical / dipoles cancel',
      colorClass: 'border-emerald-500 text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20',
      iconName: 'Circle',
    },
    {
      id: 'ionic_network',
      label: 'Ionic Network',
      description: 'Crystalline lattice structure',
      colorClass: 'border-purple-500 text-purple-400 bg-purple-500/10 hover:bg-purple-500/20',
      iconName: 'Grid',
    },
  ] as const,
} as const;

// -------------------------------------------------------------
// 8. THERMOCHEMISTRY ENTHALPY CLASSIFIER (Grade 11)
// -------------------------------------------------------------
export const THERMOCHEMISTRY_CONFIG = {
  ...ACTIVE_BASE_CONFIG,
  gameId: 'thermochemistry-classifier',
  title: 'Endothermic vs Exothermic Classifier',
  categories: [
    {
      id: 'exothermic',
      label: 'Exothermic',
      description: 'Releases heat (ΔH < 0)',
      colorClass: 'border-orange-500 text-orange-400 bg-orange-500/10 hover:bg-orange-500/20',
      iconName: 'Flame',
    },
    {
      id: 'endothermic',
      label: 'Endothermic',
      description: 'Absorbs heat (ΔH > 0)',
      colorClass: 'border-sky-500 text-sky-400 bg-sky-500/10 hover:bg-sky-500/20',
      iconName: 'Snowflake',
    },
  ] as const,
} as const;