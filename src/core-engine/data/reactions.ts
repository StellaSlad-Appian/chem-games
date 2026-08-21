export type ReactionType = 
  | 'Synthesis' 
  | 'Decomposition' 
  | 'Single Replacement' 
  | 'Double Replacement' 
  | 'Combustion' 
  | 'Acid-Base' 
  | 'Redox' 
  | 'Precipitation';

export interface ChemicalReaction {
  id: string;
  name: string;
  equation: string;
  type: ReactionType;
  description: string;
}

export const reactions: ChemicalReaction[] = [
  {
    id: "rxn_01",
    name: "Water Synthesis",
    equation: "2H2 + O2 -> 2H2O",
    type: "Synthesis",
    description: "The explosive combination of hydrogen and oxygen gas to form water."
  },
  {
    id: "rxn_02",
    name: "Cellular Respiration",
    equation: "C6H12O6 + 6O2 -> 6CO2 + 6H2O",
    type: "Combustion",
    description: "The breakdown of glucose in cells to release energy, producing carbon dioxide and water."
  },
  {
    id: "rxn_03",
    name: "Photosynthesis",
    equation: "6CO2 + 6H2O -> C6H12O6 + 6O2",
    type: "Synthesis",
    description: "The process by which plants convert carbon dioxide and water into glucose and oxygen."
  },
  {
    id: "rxn_04",
    name: "Methane Combustion",
    equation: "CH4 + 2O2 -> CO2 + 2H2O",
    type: "Combustion",
    description: "The burning of natural gas (methane) in the presence of oxygen."
  },
  {
    id: "rxn_05",
    name: "Haber Process",
    equation: "N2 + 3H2 -> 2NH3",
    type: "Synthesis",
    description: "The industrial synthesis of ammonia from nitrogen and hydrogen gases."
  },
  {
    id: "rxn_06",
    name: "Hydrogen Peroxide Decomposition",
    equation: "2H2O2 -> 2H2O + O2",
    type: "Decomposition",
    description: "The breakdown of hydrogen peroxide into water and oxygen gas, often catalyzed by manganese dioxide."
  },
  {
    id: "rxn_07",
    name: "Hydrochloric Acid Neutralization",
    equation: "HCl + NaOH -> NaCl + H2O",
    type: "Acid-Base",
    description: "A strong acid reacting with a strong base to produce table salt and water."
  },
  {
    id: "rxn_08",
    name: "Iron Rusting",
    equation: "4Fe + 3O2 -> 2Fe2O3",
    type: "Synthesis",
    description: "The oxidation of iron to form iron(III) oxide, commonly known as rust."
  },
  {
    id: "rxn_09",
    name: "Thermite Reaction",
    equation: "Fe2O3 + 2Al -> 2Fe + Al2O3",
    type: "Single Replacement",
    description: "A highly exothermic reaction between aluminum and iron oxide, yielding molten iron."
  },
  {
    id: "rxn_10",
    name: "Limestone Decomposition",
    equation: "CaCO3 -> CaO + CO2",
    type: "Decomposition",
    description: "The thermal decomposition of calcium carbonate to produce quicklime and carbon dioxide."
  },
  {
    id: "rxn_11",
    name: "Baking Soda and Vinegar",
    equation: "NaHCO3 + CH3COOH -> CH3COONa + H2O + CO2",
    type: "Acid-Base",
    description: "The classic reaction producing sodium acetate, water, and carbon dioxide bubbles."
  },
  {
    id: "rxn_12",
    name: "Magnesium in Sulfuric Acid",
    equation: "Mg + H2SO4 -> MgSO4 + H2",
    type: "Single Replacement",
    description: "Magnesium metal reacting with a strong acid to release hydrogen gas."
  },
  {
    id: "rxn_13",
    name: "Silver Chloride Precipitation",
    equation: "AgNO3 + NaCl -> AgCl + NaNO3",
    type: "Precipitation",
    description: "The formation of a solid white silver chloride precipitate from two aqueous solutions."
  },
  {
    id: "rxn_14",
    name: "Propane Combustion",
    equation: "C3H8 + 5O2 -> 3CO2 + 4H2O",
    type: "Combustion",
    description: "The burning of propane gas, commonly used in outdoor grills."
  },
  {
    id: "rxn_15",
    name: "Contact Process (Step 2)",
    equation: "2SO2 + O2 -> 2SO3",
    type: "Synthesis",
    description: "The oxidation of sulfur dioxide to sulfur trioxide in the manufacture of sulfuric acid."
  },
  {
    id: "rxn_16",
    name: "Ostwald Process (Step 1)",
    equation: "4NH3 + 5O2 -> 4NO + 6H2O",
    type: "Redox",
    description: "The catalytic oxidation of ammonia, a key step in producing nitric acid."
  },
  {
    id: "rxn_17",
    name: "Sodium in Water",
    equation: "2Na + 2H2O -> 2NaOH + H2",
    type: "Single Replacement",
    description: "The vigorous reaction of alkali metal sodium with water, producing alkaline solution and hydrogen."
  },
  {
    id: "rxn_18",
    name: "Ethanol Combustion",
    equation: "C2H5OH + 3O2 -> 2CO2 + 3H2O",
    type: "Combustion",
    description: "The complete combustion of alcohol to produce carbon dioxide and water."
  },
  {
    id: "rxn_19",
    name: "Ozone Formation",
    equation: "3O2 -> 2O3",
    type: "Synthesis",
    description: "The conversion of diatomic oxygen into ozone, often triggered by UV light or electrical discharge."
  },
  {
    id: "rxn_20",
    name: "Carbonic Acid Decomposition",
    equation: "H2CO3 -> H2O + CO2",
    type: "Decomposition",
    description: "The breakdown of carbonic acid that gives carbonated beverages their fizz."
  },
  {
    id: "rxn_21",
    name: "Copper and Silver Nitrate",
    equation: "Cu + 2AgNO3 -> Cu(NO3)2 + 2Ag",
    type: "Single Replacement",
    description: "Copper displaces silver from its salt, growing silver crystals and turning the solution blue."
  },
  {
    id: "rxn_22",
    name: "Golden Rain Reaction",
    equation: "Pb(NO3)2 + 2KI -> PbI2 + 2KNO3",
    type: "Double Replacement",
    description: "The formation of a bright yellow precipitate of lead(II) iodide."
  },
  {
    id: "rxn_23",
    name: "Bleach Synthesis",
    equation: "Cl2 + 2NaOH -> NaCl + NaClO + H2O",
    type: "Redox",
    description: "Chlorine gas reacting with cold sodium hydroxide to form sodium hypochlorite (bleach)."
  },
  {
    id: "rxn_24",
    name: "Aluminum Chloride Synthesis",
    equation: "2Al + 3Cl2 -> 2AlCl3",
    type: "Synthesis",
    description: "The direct combination of aluminum metal and chlorine gas."
  },
  {
    id: "rxn_25",
    name: "Hydrogen Chloride Synthesis",
    equation: "H2 + Cl2 -> 2HCl",
    type: "Synthesis",
    description: "The photochemical reaction of hydrogen and chlorine gases."
  },
  {
    id: "rxn_26",
    name: "Water Electrolysis",
    equation: "2H2O -> 2H2 + O2",
    type: "Decomposition",
    description: "Using an electric current to split water back into hydrogen and oxygen gases."
  },
  {
    id: "rxn_27",
    name: "Octane Combustion",
    equation: "2C8H18 + 25O2 -> 16CO2 + 18H2O",
    type: "Combustion",
    description: "The burning of a primary component of gasoline inside a combustion engine."
  },
  {
    id: "rxn_28",
    name: "Ammonium Chloride Formation",
    equation: "NH3 + HCl -> NH4Cl",
    type: "Synthesis",
    description: "Ammonia and hydrogen chloride gases reacting to form a white smoke of ammonium chloride."
  },
  {
    id: "rxn_29",
    name: "Magnesium Combustion",
    equation: "2Mg + O2 -> 2MgO",
    type: "Synthesis",
    description: "Magnesium burning with a blinding white light to form magnesium oxide."
  },
  {
    id: "rxn_30",
    name: "Incomplete Carbon Combustion",
    equation: "2C + O2 -> 2CO",
    type: "Synthesis",
    description: "The burning of carbon in a limited supply of oxygen, producing toxic carbon monoxide."
  }
];