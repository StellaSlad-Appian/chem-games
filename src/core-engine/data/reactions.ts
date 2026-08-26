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
  equation: string;
  type: ReactionType;
  description: string;
  difficulty: ReactionDifficulty;
  hint?: string;
}

export const reactions: ChemicalReaction[] = [
  {
    id: 'rxn_01',
    name: 'Water Synthesis',
    equation: '2H2 + O2 -> 2H2O',
    type: 'Synthesis',
    difficulty: 'intro',
    hint: 'Start by looking at hydrogen.',
    description:
      'The combination of hydrogen and oxygen to form water.',
  },

  {
    id: 'rxn_25',
    name: 'Hydrogen Chloride Synthesis',
    equation: 'H2 + Cl2 -> 2HCl',
    type: 'Synthesis',
    difficulty: 'intro',
    hint: 'Count hydrogen and chlorine atoms.',
    description:
      'Hydrogen and chlorine combine to form hydrogen chloride.',
  },

  {
    id: 'rxn_10',
    name: 'Limestone Decomposition',
    equation: 'CaCO3 -> CaO + CO2',
    type: 'Decomposition',
    difficulty: 'intro',
    hint: 'Start with calcium and carbon.',
    description:
      'Calcium carbonate breaks down to form calcium oxide and carbon dioxide.',
  },

  {
    id: 'rxn_19',
    name: 'Ozone Formation',
    equation: '3O2 -> 2O3',
    type: 'Synthesis',
    difficulty: 'intro',
    hint: 'There are only oxygen atoms to balance.',
    description:
      'Diatomic oxygen can be converted into ozone.',
  },

  {
    id: 'rxn_26',
    name: 'Water Electrolysis',
    equation: '2H2O -> 2H2 + O2',
    type: 'Decomposition',
    difficulty: 'beginner',
    hint: 'Balance hydrogen before oxygen.',
    description:
      'An electric current splits water into hydrogen and oxygen.',
  },

  {
    id: 'rxn_29',
    name: 'Magnesium Combustion',
    equation: '2Mg + O2 -> 2MgO',
    type: 'Synthesis',
    difficulty: 'beginner',
    hint: 'Magnesium is already balanced. Check oxygen.',
    description:
      'Magnesium reacts with oxygen to form magnesium oxide.',
  },

  {
    id: 'rxn_05',
    name: 'Haber Process',
    equation: 'N2 + 3H2 -> 2NH3',
    type: 'Synthesis',
    difficulty: 'beginner',
    hint: 'Balance nitrogen first.',
    description:
      'Nitrogen and hydrogen combine to produce ammonia.',
  },

  {
    id: 'rxn_06',
    name: 'Hydrogen Peroxide Decomposition',
    equation: '2H2O2 -> 2H2O + O2',
    type: 'Decomposition',
    difficulty: 'beginner',
    hint: 'Hydrogen is already balanced. Focus on oxygen.',
    description:
      'Hydrogen peroxide breaks down into water and oxygen.',
  },

  {
    id: 'rxn_08',
    name: 'Iron Rusting',
    equation: '4Fe + 3O2 -> 2Fe2O3',
    type: 'Synthesis',
    difficulty: 'intermediate',
    hint: 'Balance iron first, then oxygen.',
    description:
      'Iron reacts with oxygen to form iron(III) oxide.',
  },

  {
    id: 'rxn_04',
    name: 'Methane Combustion',
    equation: 'CH4 + 2O2 -> CO2 + 2H2O',
    type: 'Combustion',
    difficulty: 'intermediate',
    hint: 'For combustion, try carbon first, then hydrogen, then oxygen.',
    description:
      'Methane burns in oxygen to produce carbon dioxide and water.',
  },

  {
    id: 'rxn_12',
    name: 'Magnesium in Sulfuric Acid',
    equation: 'Mg + H2SO4 -> MgSO4 + H2',
    type: 'Single Replacement',
    difficulty: 'intermediate',
    hint: 'Look for elements that already match.',
    description:
      'Magnesium reacts with sulfuric acid to release hydrogen gas.',
  },

  {
    id: 'rxn_17',
    name: 'Sodium in Water',
    equation: '2Na + 2H2O -> 2NaOH + H2',
    type: 'Single Replacement',
    difficulty: 'intermediate',
    hint: 'Balance sodium and hydrogen carefully.',
    description:
      'Sodium reacts vigorously with water to produce sodium hydroxide and hydrogen.',
  },

  {
    id: 'rxn_18',
    name: 'Ethanol Combustion',
    equation: 'C2H5OH + 3O2 -> 2CO2 + 3H2O',
    type: 'Combustion',
    difficulty: 'intermediate',
    hint: 'Balance carbon, then hydrogen, then oxygen.',
    description:
      'Ethanol burns in oxygen to produce carbon dioxide and water.',
  },

  {
    id: 'rxn_15',
    name: 'Contact Process (Step 2)',
    equation: '2SO2 + O2 -> 2SO3',
    type: 'Synthesis',
    difficulty: 'intermediate',
    hint: 'Sulfur is already balanced.',
    description:
      'Sulfur dioxide is oxidised to sulfur trioxide.',
  },

  {
    id: 'rxn_07',
    name: 'Hydrochloric Acid Neutralization',
    equation: 'HCl + NaOH -> NaCl + H2O',
    type: 'Acid-Base',
    difficulty: 'intermediate',
    hint: 'Try counting each element one at a time.',
    description:
      'Hydrochloric acid reacts with sodium hydroxide to produce sodium chloride and water.',
  },

  {
    id: 'rxn_13',
    name: 'Silver Chloride Precipitation',
    equation: 'AgNO3 + NaCl -> AgCl + NaNO3',
    type: 'Precipitation',
    difficulty: 'intermediate',
    hint: 'Compare each element on both sides.',
    description:
      'Silver chloride forms as a precipitate when these solutions react.',
  },

  {
    id: 'rxn_14',
    name: 'Propane Combustion',
    equation: 'C3H8 + 5O2 -> 3CO2 + 4H2O',
    type: 'Combustion',
    difficulty: 'advanced',
    hint: 'For combustion, balance carbon first, then hydrogen, then oxygen.',
    description:
      'Propane burns in oxygen to produce carbon dioxide and water.',
  },

  {
    id: 'rxn_11',
    name: 'Baking Soda and Vinegar',
    equation:
      'NaHCO3 + CH3COOH -> CH3COONa + H2O + CO2',
    type: 'Acid-Base',
    difficulty: 'advanced',
    hint: 'Start with elements that appear in only one compound on each side.',
    description:
      'Baking soda reacts with acetic acid to produce sodium acetate, water and carbon dioxide.',
  },

  {
    id: 'rxn_21',
    name: 'Copper and Silver Nitrate',
    equation:
      'Cu + 2AgNO3 -> Cu(NO3)2 + 2Ag',
    type: 'Single Replacement',
    difficulty: 'advanced',
    hint: 'Look for the elements whose coefficients are easiest to determine first.',
    description:
      'Copper displaces silver from silver nitrate.',
  },

  {
    id: 'rxn_22',
    name: 'Golden Rain Reaction',
    equation:
      'Pb(NO3)2 + 2KI -> PbI2 + 2KNO3',
    type: 'Double Replacement',
    difficulty: 'advanced',
    hint: 'Count each element, including the repeated nitrate groups.',
    description:
      'A reaction producing a bright yellow lead iodide precipitate.',
  },

  {
    id: 'rxn_27',
    name: 'Octane Combustion',
    equation:
      '2C8H18 + 25O2 -> 16CO2 + 18H2O',
    type: 'Combustion',
    difficulty: 'advanced',
    hint:
      'Balance carbon first, hydrogen second and oxygen last.',
    description:
      'Octane burns in oxygen to produce carbon dioxide and water.',
  },

  {
    id: 'rxn_16',
    name: 'Ostwald Process (Step 1)',
    equation:
      '4NH3 + 5O2 -> 4NO + 6H2O',
    type: 'Redox',
    difficulty: 'advanced',
    hint:
      'Balance nitrogen and hydrogen before tackling oxygen.',
    description:
      'Ammonia is oxidised as part of the industrial production of nitric acid.',
  },

  {
    id: 'rxn_23',
    name: 'Bleach Synthesis',
    equation:
      'Cl2 + 2NaOH -> NaCl + NaClO + H2O',
    type: 'Redox',
    difficulty: 'advanced',
    hint:
      'Start with chlorine, then balance sodium and hydrogen.',
    description:
      'Chlorine reacts with sodium hydroxide to produce sodium chloride, sodium hypochlorite and water.',
  },

  {
    id: 'rxn_24',
    name: 'Aluminum Chloride Synthesis',
    equation:
      '2Al + 3Cl2 -> 2AlCl3',
    type: 'Synthesis',
    difficulty: 'advanced',
    hint:
      'Balance aluminium first, then chlorine.',
    description:
      'Aluminium reacts directly with chlorine to form aluminium chloride.',
  },

  {
    id: 'rxn_28',
    name: 'Ammonium Chloride Formation',
    equation:
      'NH3 + HCl -> NH4Cl',
    type: 'Synthesis',
    difficulty: 'beginner',
    hint:
      'Compare nitrogen, hydrogen and chlorine.',
    description:
      'Ammonia and hydrogen chloride react to form ammonium chloride.',
  },

  {
    id: 'rxn_30',
    name: 'Incomplete Carbon Combustion',
    equation:
      '2C + O2 -> 2CO',
    type: 'Synthesis',
    difficulty: 'beginner',
    hint:
      'Start with carbon, then oxygen.',
    description:
      'Carbon burns in a limited supply of oxygen to form carbon monoxide.',
  },

  {
    id: 'rxn_02',
    name: 'Cellular Respiration',
    equation:
      'C6H12O6 + 6O2 -> 6CO2 + 6H2O',
    type: 'Combustion',
    difficulty: 'advanced',
    hint:
      'Balance carbon first, then hydrogen, then oxygen.',
    description:
      'Glucose reacts with oxygen during cellular respiration to produce carbon dioxide and water.',
  },

  {
    id: 'rxn_03',
    name: 'Photosynthesis',
    equation:
      '6CO2 + 6H2O -> C6H12O6 + 6O2',
    type: 'Synthesis',
    difficulty: 'advanced',
    hint:
      'Compare carbon first, then hydrogen, then oxygen.',
    description:
      'Plants use carbon dioxide and water to produce glucose and oxygen.',
  },

  {
    id: 'rxn_09',
    name: 'Thermite Reaction',
    equation:
      'Fe2O3 + 2Al -> 2Fe + Al2O3',
    type: 'Single Replacement',
    difficulty: 'advanced',
    hint:
      'Start with iron and aluminium.',
    description:
      'Aluminium reacts with iron oxide to produce iron and aluminium oxide.',
  },

  {
    id: 'rxn_20',
    name: 'Carbonic Acid Decomposition',
    equation:
      'H2CO3 -> H2O + CO2',
    type: 'Decomposition',
    difficulty: 'beginner',
    hint:
      'Compare hydrogen, carbon and oxygen.',
    description:
      'Carbonic acid breaks down into water and carbon dioxide.',
  },
];