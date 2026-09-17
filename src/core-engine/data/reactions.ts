// src/core-engine/data/reactions.ts
//
// The Reaction Balancer answer key. Every equation is written balanced, in
// lowest terms, with state symbols on every species (docs/game-briefs/
// reaction-balancer.md, "Platform reuse"). The game never compares a player's
// coefficients to these strings: it checks conservation of atoms, so any
// valid balanced form wins. The stored coefficients are only used for the
// tier-3 hint and the notebook.
//
// `difficulty` decides which level a reaction appears on (see
// reaction-balancer-config.ts `levels.difficultyByLevel`). Reactions that are
// already balanced with every coefficient at 1 (Limestone Decomposition,
// Magnesium in Sulfuric Acid, ...) stay here for the cheat sheets and the
// Challenge level's word equations, but the balancing levels skip them
// (`needsBalancing()` in core-engine/utils/balancer-utils.ts).
//
// `prompt` is the word equation a Challenge round shows before the player
// builds the equation from the compound picker. Only reactions with a prompt
// are in the Challenge pool; every prompt names every reactant and product.

export type ReactionType =
  | 'Synthesis'
  | 'Decomposition'
  | 'Single Replacement'
  | 'Double Replacement'
  | 'Combustion'
  | 'Acid-Base'
  | 'Redox'
  | 'Precipitation';

export type ReactionDifficulty =
  | 'intro'
  | 'beginner'
  | 'intermediate'
  | 'advanced';

export interface ChemicalReaction {
  id: string;
  name: string;
  /** Balanced, lowest terms, with state symbols: '2H2(g) + O2(g) -> 2H2O(l)'. */
  equation: string;
  type: ReactionType;
  /** One line a player reads at Level 3+ as the macroscopic observation. */
  description: string;
  difficulty: ReactionDifficulty;
  /** The strategy hint (hint tier 2). */
  hint?: string;
  /** Challenge level: the word equation the player builds the equation from. */
  prompt?: string;
}

export const reactions: ChemicalReaction[] = [
  {
    id: 'rxn_01',
    name: 'Water Synthesis',
    equation: '2H2(g) + O2(g) -> 2H2O(l)',
    type: 'Synthesis',
    difficulty: 'intro',
    hint: 'Hydrogen already matches. Balance oxygen by adding water, then check hydrogen again.',
    description:
      'Hydrogen burns in oxygen with a pale blue flame and a pop, forming water.',
    prompt: 'Hydrogen gas burns in oxygen gas to form liquid water.',
  },

  {
    id: 'rxn_25',
    name: 'Hydrogen Chloride Synthesis',
    equation: 'H2(g) + Cl2(g) -> 2HCl(g)',
    type: 'Synthesis',
    difficulty: 'intro',
    hint: 'Count hydrogen and chlorine atoms. Both come in pairs on the left.',
    description:
      'Hydrogen and chlorine combine to form hydrogen chloride, a sharp-smelling gas.',
    prompt: 'Hydrogen gas reacts with chlorine gas to form hydrogen chloride gas.',
  },

  {
    id: 'rxn_10',
    name: 'Limestone Decomposition',
    equation: 'CaCO3(s) -> CaO(s) + CO2(g)',
    type: 'Decomposition',
    difficulty: 'intro',
    hint: 'Start with calcium and carbon.',
    description:
      'Calcium carbonate breaks down on strong heating, giving off carbon dioxide gas.',
    prompt: 'Solid calcium carbonate decomposes on heating into solid calcium oxide and carbon dioxide gas.',
  },

  {
    id: 'rxn_19',
    name: 'Ozone Formation',
    equation: '3O2(g) -> 2O3(g)',
    type: 'Synthesis',
    difficulty: 'intro',
    hint: 'There is only oxygen to balance. Find the smallest number both 2 and 3 go into.',
    description:
      'Diatomic oxygen is converted into ozone, the gas with a sharp smell after a thunderstorm.',
  },

  {
    id: 'rxn_26',
    name: 'Water Electrolysis',
    equation: '2H2O(l) -> 2H2(g) + O2(g)',
    type: 'Decomposition',
    difficulty: 'beginner',
    hint: 'Balance oxygen first by adding water, then fix hydrogen.',
    description:
      'An electric current splits water; bubbles of hydrogen and oxygen gas form at the electrodes.',
    prompt: 'An electric current splits liquid water into hydrogen gas and oxygen gas.',
  },

  {
    id: 'rxn_29',
    name: 'Magnesium Combustion',
    equation: '2Mg(s) + O2(g) -> 2MgO(s)',
    type: 'Synthesis',
    difficulty: 'beginner',
    hint: 'Magnesium is already balanced. Check oxygen.',
    description:
      'Magnesium burns in oxygen with a brilliant white flame, leaving a white powder.',
    prompt: 'Magnesium metal burns in oxygen gas to form solid magnesium oxide.',
  },

  {
    id: 'rxn_05',
    name: 'Haber Process',
    equation: 'N2(g) + 3H2(g) -> 2NH3(g)',
    type: 'Synthesis',
    difficulty: 'beginner',
    hint: 'Balance nitrogen first, then hydrogen.',
    description:
      'Nitrogen and hydrogen combine to produce ammonia gas under high pressure.',
    prompt: 'Nitrogen gas and hydrogen gas combine to produce ammonia gas.',
  },

  {
    id: 'rxn_06',
    name: 'Hydrogen Peroxide Decomposition',
    equation: '2H2O2(aq) -> 2H2O(l) + O2(g)',
    type: 'Decomposition',
    difficulty: 'beginner',
    hint: 'Hydrogen is already balanced. Focus on oxygen.',
    description:
      'Hydrogen peroxide breaks down into water and oxygen; the solution fizzes as the gas escapes.',
  },

  {
    id: 'rxn_08',
    name: 'Iron Rusting',
    equation: '4Fe(s) + 3O2(g) -> 2Fe2O3(s)',
    type: 'Synthesis',
    difficulty: 'intermediate',
    hint: 'Balance iron first, then oxygen.',
    description:
      'Iron reacts slowly with oxygen to form iron(III) oxide, the orange-brown flakes of rust.',
  },

  {
    id: 'rxn_04',
    name: 'Methane Combustion',
    equation: 'CH4(g) + 2O2(g) -> CO2(g) + 2H2O(g)',
    type: 'Combustion',
    difficulty: 'intermediate',
    hint: 'For combustion, try carbon first, then hydrogen, then oxygen.',
    description:
      'Methane burns in oxygen with a blue flame, producing carbon dioxide and water vapour.',
    prompt: 'Methane gas burns in oxygen gas to produce carbon dioxide gas and water vapour.',
  },

  {
    id: 'rxn_12',
    name: 'Magnesium in Sulfuric Acid',
    equation: 'Mg(s) + H2SO4(aq) -> MgSO4(aq) + H2(g)',
    type: 'Single Replacement',
    difficulty: 'intermediate',
    hint: 'Look for elements that already match.',
    description:
      'Magnesium fizzes in sulfuric acid as bubbles of hydrogen gas escape.',
    prompt: 'Magnesium metal reacts with sulfuric acid solution to give magnesium sulfate solution and hydrogen gas.',
  },

  {
    id: 'rxn_17',
    name: 'Sodium in Water',
    equation: '2Na(s) + 2H2O(l) -> 2NaOH(aq) + H2(g)',
    type: 'Single Replacement',
    difficulty: 'intermediate',
    hint: 'Balance hydrogen with water and hydrogen gas first, then check sodium.',
    description:
      'Sodium fizzes across the surface of water, releasing hydrogen gas and leaving an alkaline solution.',
    prompt: 'Sodium metal reacts with liquid water to produce sodium hydroxide solution and hydrogen gas.',
  },

  {
    id: 'rxn_18',
    name: 'Ethanol Combustion',
    equation: 'C2H5OH(l) + 3O2(g) -> 2CO2(g) + 3H2O(g)',
    type: 'Combustion',
    difficulty: 'intermediate',
    hint: 'Balance carbon, then hydrogen, then oxygen.',
    description:
      'Ethanol burns with a clean blue flame to produce carbon dioxide and water vapour.',
  },

  {
    id: 'rxn_15',
    name: 'Contact Process (Step 2)',
    equation: '2SO2(g) + O2(g) -> 2SO3(g)',
    type: 'Synthesis',
    difficulty: 'intermediate',
    hint: 'Sulfur is already balanced. Check oxygen.',
    description:
      'Sulfur dioxide is oxidised to sulfur trioxide over a catalyst on the way to making sulfuric acid.',
  },

  {
    id: 'rxn_07',
    name: 'Hydrochloric Acid Neutralization',
    equation: 'HCl(aq) + NaOH(aq) -> NaCl(aq) + H2O(l)',
    type: 'Acid-Base',
    difficulty: 'intermediate',
    hint: 'Try counting each element one at a time.',
    description:
      'Hydrochloric acid reacts with sodium hydroxide to produce sodium chloride and water; the mixture warms up.',
  },

  {
    id: 'rxn_13',
    name: 'Silver Chloride Precipitation',
    equation: 'AgNO3(aq) + NaCl(aq) -> AgCl(s) + NaNO3(aq)',
    type: 'Precipitation',
    difficulty: 'intermediate',
    hint: 'Compare each element on both sides.',
    description:
      'A white precipitate of silver chloride forms the moment the two clear solutions mix.',
  },

  {
    id: 'rxn_14',
    name: 'Propane Combustion',
    equation: 'C3H8(g) + 5O2(g) -> 3CO2(g) + 4H2O(g)',
    type: 'Combustion',
    difficulty: 'advanced',
    hint: 'For combustion, balance carbon first, then hydrogen, then oxygen.',
    description:
      'Propane burns in oxygen with a hot blue flame, producing carbon dioxide and water vapour.',
    prompt: 'Propane gas burns in oxygen gas to produce carbon dioxide gas and water vapour.',
  },

  {
    id: 'rxn_11',
    name: 'Baking Soda and Vinegar',
    equation:
      'NaHCO3(s) + CH3COOH(aq) -> CH3COONa(aq) + H2O(l) + CO2(g)',
    type: 'Acid-Base',
    difficulty: 'advanced',
    hint: 'Start with elements that appear in only one compound on each side.',
    description:
      'Baking soda fizzes in vinegar as carbon dioxide gas escapes, leaving sodium acetate in solution.',
  },

  {
    id: 'rxn_21',
    name: 'Copper and Silver Nitrate',
    equation:
      'Cu(s) + 2AgNO3(aq) -> Cu(NO3)2(aq) + 2Ag(s)',
    type: 'Single Replacement',
    difficulty: 'advanced',
    hint: 'Balance the nitrate groups as a unit, then check silver.',
    description:
      'Copper displaces silver from silver nitrate: silver crystals grow on the copper and the solution turns blue.',
  },

  {
    id: 'rxn_22',
    name: 'Golden Rain Reaction',
    equation:
      'Pb(NO3)2(aq) + 2KI(aq) -> PbI2(s) + 2KNO3(aq)',
    type: 'Double Replacement',
    difficulty: 'advanced',
    hint: 'Count each element, including the repeated nitrate groups.',
    description:
      'Bright yellow lead iodide precipitates out and settles like golden rain.',
  },

  {
    id: 'rxn_27',
    name: 'Octane Combustion',
    equation:
      '2C8H18(l) + 25O2(g) -> 16CO2(g) + 18H2O(g)',
    type: 'Combustion',
    difficulty: 'advanced',
    hint:
      'Balance carbon first, hydrogen second and oxygen last.',
    description:
      'Octane burns in oxygen to produce carbon dioxide and water vapour, the reaction inside a petrol engine.',
  },

  {
    id: 'rxn_16',
    name: 'Ostwald Process (Step 1)',
    equation:
      '4NH3(g) + 5O2(g) -> 4NO(g) + 6H2O(g)',
    type: 'Redox',
    difficulty: 'advanced',
    hint:
      'Balance nitrogen and hydrogen before tackling oxygen.',
    description:
      'Ammonia is oxidised over a hot platinum catalyst as the first step in making nitric acid.',
  },

  {
    id: 'rxn_23',
    name: 'Bleach Synthesis',
    equation:
      'Cl2(g) + 2NaOH(aq) -> NaCl(aq) + NaClO(aq) + H2O(l)',
    type: 'Redox',
    difficulty: 'advanced',
    hint:
      'Start with chlorine, then balance sodium and hydrogen.',
    description:
      'Chlorine gas is absorbed by sodium hydroxide solution to make household bleach.',
  },

  {
    id: 'rxn_24',
    name: 'Aluminium Chloride Synthesis',
    equation:
      '2Al(s) + 3Cl2(g) -> 2AlCl3(s)',
    type: 'Synthesis',
    difficulty: 'advanced',
    hint:
      'Balance aluminium first, then chlorine.',
    description:
      'Aluminium glows as it reacts directly with chlorine to form white aluminium chloride.',
    prompt: 'Aluminium metal reacts with chlorine gas to form solid aluminium chloride.',
  },

  {
    id: 'rxn_28',
    name: 'Ammonium Chloride Formation',
    equation:
      'NH3(g) + HCl(g) -> NH4Cl(s)',
    type: 'Synthesis',
    difficulty: 'beginner',
    hint:
      'Compare nitrogen, hydrogen and chlorine.',
    description:
      'Ammonia and hydrogen chloride gases meet and a white smoke of ammonium chloride forms.',
  },

  {
    id: 'rxn_30',
    name: 'Incomplete Carbon Combustion',
    equation:
      '2C(s) + O2(g) -> 2CO(g)',
    type: 'Synthesis',
    difficulty: 'beginner',
    hint:
      'Start with carbon, then oxygen.',
    description:
      'Carbon burns in a limited supply of oxygen to form carbon monoxide, a colourless poisonous gas.',
    prompt: 'Solid carbon burns in a limited supply of oxygen gas to form carbon monoxide gas.',
  },

  {
    id: 'rxn_02',
    name: 'Cellular Respiration',
    equation:
      'C6H12O6(aq) + 6O2(g) -> 6CO2(g) + 6H2O(l)',
    type: 'Combustion',
    difficulty: 'advanced',
    hint:
      'Balance carbon first, then hydrogen, then oxygen.',
    description:
      'Glucose reacts with oxygen in living cells, releasing energy along with carbon dioxide and water.',
  },

  {
    id: 'rxn_03',
    name: 'Photosynthesis',
    equation:
      '6CO2(g) + 6H2O(l) -> C6H12O6(aq) + 6O2(g)',
    type: 'Synthesis',
    difficulty: 'advanced',
    hint:
      'Compare carbon first, then hydrogen, then oxygen.',
    description:
      'Plants use light energy to turn carbon dioxide and water into glucose, releasing oxygen.',
  },

  {
    id: 'rxn_09',
    name: 'Thermite Reaction',
    equation:
      'Fe2O3(s) + 2Al(s) -> 2Fe(l) + Al2O3(s)',
    type: 'Single Replacement',
    difficulty: 'advanced',
    hint:
      'Start with iron and aluminium.',
    description:
      'Aluminium rips oxygen from iron oxide in a shower of sparks, leaving molten iron.',
  },

  {
    id: 'rxn_20',
    name: 'Carbonic Acid Decomposition',
    equation:
      'H2CO3(aq) -> H2O(l) + CO2(g)',
    type: 'Decomposition',
    difficulty: 'beginner',
    hint:
      'Compare hydrogen, carbon and oxygen.',
    description:
      'Carbonic acid breaks down into water and carbon dioxide, which is why fizzy drinks go flat.',
  },
];

/**
 * Everyday names for every species in `reactions`, keyed by the bare formula
 * (no state symbol). Used for accessible names ("Coefficient for water, H2O"),
 * the Challenge compound picker and the coach. A unit test checks the map
 * covers every formula above.
 */
export const SPECIES_NAMES: Record<string, string> = {
  H2: 'hydrogen',
  O2: 'oxygen',
  H2O: 'water',
  Cl2: 'chlorine',
  HCl: 'hydrogen chloride',
  CaCO3: 'calcium carbonate',
  CaO: 'calcium oxide',
  CO2: 'carbon dioxide',
  O3: 'ozone',
  Mg: 'magnesium',
  MgO: 'magnesium oxide',
  N2: 'nitrogen',
  NH3: 'ammonia',
  H2O2: 'hydrogen peroxide',
  Fe: 'iron',
  Fe2O3: 'iron(III) oxide',
  CH4: 'methane',
  H2SO4: 'sulfuric acid',
  MgSO4: 'magnesium sulfate',
  Na: 'sodium',
  NaOH: 'sodium hydroxide',
  C2H5OH: 'ethanol',
  SO2: 'sulfur dioxide',
  SO3: 'sulfur trioxide',
  NaCl: 'sodium chloride',
  AgNO3: 'silver nitrate',
  AgCl: 'silver chloride',
  NaNO3: 'sodium nitrate',
  C3H8: 'propane',
  NaHCO3: 'sodium hydrogen carbonate',
  CH3COOH: 'acetic acid',
  CH3COONa: 'sodium acetate',
  Cu: 'copper',
  'Cu(NO3)2': 'copper(II) nitrate',
  Ag: 'silver',
  'Pb(NO3)2': 'lead(II) nitrate',
  KI: 'potassium iodide',
  PbI2: 'lead(II) iodide',
  KNO3: 'potassium nitrate',
  C8H18: 'octane',
  NO: 'nitrogen monoxide',
  NaClO: 'sodium hypochlorite',
  Al: 'aluminium',
  AlCl3: 'aluminium chloride',
  Al2O3: 'aluminium oxide',
  NH4Cl: 'ammonium chloride',
  C: 'carbon',
  CO: 'carbon monoxide',
  C6H12O6: 'glucose',
  H2CO3: 'carbonic acid',
};

/** Strips a trailing state symbol: 'H2O(l)' -> 'H2O'. */
export const bareFormula = (formula: string): string => formula.replace(/\((s|l|g|aq)\)$/, '');

/** The everyday name of a species, by formula (state symbol optional); falls back to the formula. */
export const speciesName = (formula: string): string => SPECIES_NAMES[bareFormula(formula)] ?? bareFormula(formula);

/** Find a reaction by id; throws so a typo in a level plan fails loudly. */
export function getReaction(id: string): ChemicalReaction {
  const reaction = reactions.find((r) => r.id === id);
  if (!reaction) throw new Error(`Unknown reaction "${id}"`);
  return reaction;
}
