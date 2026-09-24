// src/core-engine/data/curriculum/concepts.ts
//
// The canonical list of chemistry concepts and skills that the country maps
// point at. It was built from the ten country reports in docs/curriculum/countries/.
// The rows of their concept indices map onto these ids; the few that don't are
// listed in docs/curriculum/CROSS_COUNTRY_MAP.md §5.
//
// Granularity rule: one id per thing a game or cheat sheet could reasonably
// target on its own, and that at least one country places in a different year
// from its neighbours. "Acids and bases" is too coarse (pH is Year 7 in one
// country and Year 12 in another); "the Henderson–Hasselbalch equation" is too
// fine (no country separates it from buffers).
//
// Ids are permanent once referenced from the database. Rename the title, not
// the id.

import type { CanonicalConcept } from '../../types/curriculum';

export const CONCEPTS = [
  // ── Matter & particles ─────────────────────────────────────────────────────
  {
    id: 'particle-model', area: 'matter', kind: 'concept', title: 'Particle model of matter',
    scope: 'Matter is made of tiny moving particles; diffusion; particle explanation of properties.',
  },
  {
    id: 'states-of-matter', area: 'matter', kind: 'concept', title: 'States of matter and changes of state',
    scope: 'Solid, liquid, gas; melting, boiling, condensing, sublimation; particle explanation; heating curves.',
    legacy: { concepts: ['states-of-matter'], cheatSheets: ['states-of-matter'] },
  },
  {
    id: 'physical-properties', area: 'matter', kind: 'concept', title: 'Physical properties of substances',
    scope: 'Melting/boiling point, solubility, conductivity as characteristic properties; identifying substances; intensive vs extensive.',
  },
  {
    id: 'density', area: 'matter', kind: 'concept', title: 'Density',
    scope: 'ρ = m/V, measuring and using density to identify substances.',
  },
  {
    id: 'heat-and-temperature', area: 'matter', kind: 'concept', title: 'Heat and temperature',
    scope: 'Temperature as average particle kinetic energy; heat as energy transfer; thermal equilibrium; specific heat (qualitative).',
  },
  {
    id: 'elements-compounds-mixtures', area: 'matter', kind: 'concept', title: 'Elements, compounds and mixtures',
    scope: 'Pure substance vs mixture; element vs compound; simple vs compound substances; atoms vs molecules; species vs entity.',
  },

  // ── Mixtures & separation ──────────────────────────────────────────────────
  {
    id: 'mixture-types', area: 'mixtures', kind: 'concept', title: 'Types of mixture',
    scope: 'Homogeneous and heterogeneous mixtures, solutions vs suspensions, alloys as mixtures, air as a mixture.',
  },
  {
    id: 'separation-techniques', area: 'mixtures', kind: 'concept', title: 'Separation techniques',
    scope: 'Filtration, evaporation, crystallisation, (fractional) distillation, decanting, extraction; choosing a method; purity.',
  },
  {
    id: 'colloids', area: 'mixtures', kind: 'concept', title: 'Colloids and disperse systems',
    scope: 'Suspensions, emulsions, aerosols, gels; Tyndall effect; coagulation.',
  },

  // ── Atomic structure ───────────────────────────────────────────────────────
  {
    id: 'subatomic-particles', area: 'atomic-structure', kind: 'concept', title: 'Protons, neutrons and electrons',
    scope: 'Nucleus and electrons; relative mass and charge; atomic number and mass number; ions as charged atoms.',
    legacy: { cheatSheets: ['atomic-structure'] },
  },
  {
    id: 'atomic-models-history', area: 'atomic-structure', kind: 'concept', title: 'History of atomic models',
    scope: 'Dalton, Thomson, Rutherford, Bohr, Chadwick, quantum model; how evidence changed the model.',
  },
  {
    id: 'isotopes', area: 'atomic-structure', kind: 'concept', title: 'Isotopes and relative atomic mass',
    scope: 'Isotope notation; weighted-average relative atomic mass.',
    legacy: { cheatSheets: ['isotopes-and-radioactivity'] },
  },
  {
    id: 'electron-shells', area: 'atomic-structure', kind: 'concept', title: 'Electron shells',
    scope: 'Shell (energy level) arrangements such as 2,8,8 for the first 20 elements; valence electrons; Bohr diagrams.',
  },
  {
    id: 'electron-configuration', area: 'atomic-structure', kind: 'concept', title: 'Orbitals and electron configuration',
    scope: 's/p/d subshells, orbital notation, Aufbau, Pauli, Hund; quantum numbers at the extended level.',
  },
  {
    id: 'atomic-spectra', area: 'atomic-structure', kind: 'concept', title: 'Atomic spectra and light',
    scope: 'Emission/absorption spectra, flame colours as evidence of energy levels, E = hν, photoelectron spectroscopy.',
  },

  // ── Periodic table ─────────────────────────────────────────────────────────
  {
    id: 'periodic-table-structure', area: 'periodic-table', kind: 'concept', title: 'Reading the periodic table',
    scope: 'Symbols, atomic number, groups and periods, metals / non-metals / metalloids, using the table as a look-up tool.',
  },
  {
    id: 'periodic-table-history', area: 'periodic-table', kind: 'concept', title: 'Development of the periodic table',
    scope: 'Döbereiner, Newlands, Mendeleev and predicted elements; the periodic law as a historical idea.',
  },
  {
    id: 'group-chemistry', area: 'periodic-table', kind: 'concept', title: 'Chemical families (groups)',
    scope: 'Alkali metals, alkaline-earth metals, halogens, noble gases; trends in reactivity down a group.',
  },
  {
    id: 'periodic-trends', area: 'periodic-table', kind: 'concept', title: 'Periodic trends',
    scope: 'Atomic and ionic radius, ionisation energy, electronegativity, metallic character across periods and down groups.',
  },
  {
    id: 'periodic-law-electronic', area: 'periodic-table', kind: 'concept', title: 'Periodic table from electron structure',
    scope: 'Position from electron arrangement; s/p/d blocks; why elements in a group behave alike.',
  },

  // ── Bonding & structure ────────────────────────────────────────────────────
  {
    id: 'ionic-bonding', area: 'bonding', kind: 'concept', title: 'Ionic bonding',
    scope: 'Electron transfer, ion formation, the octet idea, ionic lattices and their properties.',
    legacy: { concepts: ['chemical-bonding'], cheatSheets: ['chemical-bonds'] },
  },
  {
    id: 'covalent-bonding', area: 'bonding', kind: 'concept', title: 'Covalent bonding',
    scope: 'Shared pairs, single/double/triple bonds, valence (valency), dot-and-cross diagrams, simple molecules.',
    legacy: { concepts: ['chemical-bonding'], cheatSheets: ['chemical-bonds'] },
  },
  {
    id: 'metallic-bonding', area: 'bonding', kind: 'concept', title: 'Metallic bonding',
    scope: 'Sea of delocalised electrons; conductivity and malleability; band theory at the extended level.',
    legacy: { concepts: ['chemical-bonding'], cheatSheets: ['chemical-bonds'] },
  },
  {
    id: 'bond-polarity', area: 'bonding', kind: 'concept', title: 'Electronegativity and polarity',
    scope: 'Electronegativity differences, polar and non-polar bonds, polar molecules, bond type from ΔEN.',
  },
  {
    id: 'lewis-structures', area: 'bonding', kind: 'concept', title: 'Lewis structures',
    scope: 'Electron-dot structures of molecules and ions; lone pairs; resonance and formal charge at the extended level.',
    legacy: { concepts: ['lewis-structures'], cheatSheets: ['lewis-structures'] },
  },
  {
    id: 'molecular-shape', area: 'bonding', kind: 'concept', title: 'Molecular shape (VSEPR)',
    scope: 'Predicting shapes and bond angles from electron pairs; RPECV in Spanish.',
    legacy: { cheatSheets: ['lewis-structures'] },
  },
  {
    id: 'intermolecular-forces', area: 'bonding', kind: 'concept', title: 'Intermolecular forces',
    scope: 'Dispersion, dipole–dipole, hydrogen bonds; explaining boiling points and solubility.',
  },
  {
    id: 'giant-structures', area: 'bonding', kind: 'concept', title: 'Structure types and properties',
    scope: 'Giant ionic, giant covalent (network), simple molecular, metallic lattices; carbon allotropes; crystalline vs amorphous.',
    legacy: { cheatSheets: ['chemical-bonds'] },
  },
  {
    id: 'hybridisation', area: 'bonding', kind: 'concept', title: 'Hybridisation and σ/π bonds',
    scope: 'sp, sp², sp³; sigma and pi bonds; molecular-orbital ideas at the extended level.',
  },
  {
    id: 'lattice-energy', area: 'bonding', kind: 'concept', title: 'Lattice energy and Born–Haber cycles',
    scope: 'Energy of forming an ionic lattice; Born–Haber cycle calculations.',
  },

  // ── Formulas & nomenclature ────────────────────────────────────────────────
  {
    id: 'chemical-symbols-formulas', area: 'nomenclature', kind: 'concept', title: 'Symbols and formulas',
    scope: 'Element symbols, what a formula means, counting atoms, formulas of common simple substances.',
    legacy: { cheatSheets: ['chemical-formulas'] },
  },
  {
    id: 'ionic-formulas', area: 'nomenclature', kind: 'concept', title: 'Writing formulas from charges or valence',
    scope: 'Formulas of ionic compounds from ion charges; formulas from valence (Russia/Ukraine); electroneutrality.',
    legacy: { concepts: ['ionic-compounds'], cheatSheets: ['chemical-formulas'] },
  },
  {
    id: 'polyatomic-ions', area: 'nomenclature', kind: 'concept', title: 'Polyatomic ions',
    scope: 'Names, formulas and charges of common polyatomic ions (sulfate, nitrate, carbonate, ammonium…).',
    legacy: { concepts: ['polyatomic-ions'], cheatSheets: ['polyatomic-ions'] },
  },
  {
    id: 'inorganic-nomenclature', area: 'nomenclature', kind: 'concept', title: 'Naming inorganic compounds',
    scope: 'Binary and ternary compounds, acids, bases and salts; prefixes, Stock numbers, accepted traditional names.',
    legacy: { concepts: ['inorganic-nomenclature'], cheatSheets: ['naming-compounds'] },
  },
  {
    id: 'organic-nomenclature', area: 'nomenclature', kind: 'concept', title: 'Naming organic compounds',
    scope: 'IUPAC names of hydrocarbons and functional-group compounds; locants; trivial names that stay in use.',
    legacy: { concepts: ['organic-nomenclature'], cheatSheets: ['organic-nomenclature'] },
  },

  // ── Chemical reactions & equations ─────────────────────────────────────────
  {
    id: 'physical-chemical-change', area: 'reactions', kind: 'concept', title: 'Physical vs chemical change',
    scope: 'Signs of a chemical reaction; reversible physical changes; reaction as rearrangement of atoms.',
  },
  {
    id: 'conservation-of-mass', area: 'reactions', kind: 'concept', title: 'Conservation of mass',
    scope: 'Mass and atoms are conserved; Lavoisier, Proust and the laws of chemical combination.',
  },
  {
    id: 'writing-equations', area: 'reactions', kind: 'concept', title: 'Word and symbol equations',
    scope: 'Reactants and products; word equations; symbol equations with state symbols (unbalanced).',
    legacy: { cheatSheets: ['balancing-equations'] },
  },
  {
    id: 'balancing-equations', area: 'reactions', kind: 'concept', title: 'Balancing equations',
    scope: 'Coefficients by inspection; conservation of atoms in a symbol equation.',
    legacy: { concepts: ['balancing-equations'], cheatSheets: ['balancing-equations'] },
  },
  {
    id: 'reaction-types', area: 'reactions', kind: 'concept', title: 'Types of reaction',
    scope: 'Synthesis, decomposition, single and double displacement, combustion, precipitation, neutralisation; multi-criteria classification.',
    legacy: { concepts: ['reaction-types'], cheatSheets: ['reaction-types'] },
  },
  {
    id: 'combustion', area: 'reactions', kind: 'concept', title: 'Combustion',
    scope: 'Burning in oxygen; complete and incomplete combustion; fire triangle.',
  },
  {
    id: 'ionic-equations', area: 'reactions', kind: 'concept', title: 'Ionic equations',
    scope: 'Full and net ionic equations; spectator ions; ion-exchange reactions.',
  },

  // ── Stoichiometry & the mole ───────────────────────────────────────────────
  {
    id: 'relative-formula-mass', area: 'stoichiometry', kind: 'concept', title: 'Relative atomic and formula mass',
    scope: 'Ar and Mr; percentage by mass of an element in a compound.',
    legacy: { cheatSheets: ['relative-formula-mass'] },
  },
  {
    id: 'mole-concept', area: 'stoichiometry', kind: 'concept', title: 'The mole',
    scope: 'Amount of substance, Avogadro constant, molar mass, n = m/M.',
    legacy: { concepts: ['stoichiometry'], cheatSheets: ['stoichiometry'] },
  },
  {
    id: 'reacting-masses', area: 'stoichiometry', kind: 'concept', title: 'Calculations from equations',
    scope: 'Mole ratios, reacting masses, gas volumes from equations; the French tableau d\'avancement.',
    legacy: { concepts: ['stoichiometry'], cheatSheets: ['stoichiometry'] },
  },
  {
    id: 'limiting-reagent', area: 'stoichiometry', kind: 'concept', title: 'Limiting reagent',
    scope: 'Limiting and excess reactants; maximum advancement.',
    legacy: { concepts: ['stoichiometry'], cheatSheets: ['stoichiometry'] },
  },
  {
    id: 'yield-and-atom-economy', area: 'stoichiometry', kind: 'concept', title: 'Yield, purity and atom economy',
    scope: 'Percentage yield, impurities, atom economy.',
    legacy: { cheatSheets: ['stoichiometry'] },
  },
  {
    id: 'empirical-formula', area: 'stoichiometry', kind: 'concept', title: 'Empirical and molecular formulas',
    scope: 'Formula from percentage composition or combustion data; empirical vs molecular formula.',
  },

  // ── Solutions & concentration ──────────────────────────────────────────────
  {
    id: 'dissolving-solubility', area: 'solutions', kind: 'concept', title: 'Dissolving and solubility',
    scope: 'Solute, solvent, solution; saturated and unsaturated; solubility curves; factors affecting dissolving.',
  },
  {
    id: 'mass-concentration', area: 'solutions', kind: 'concept', title: 'Concentration by mass',
    scope: 'Mass fraction of solute, % m/m, % m/v, g/L (g/dm³), ppm; preparing a solution of given mass concentration.',
  },
  {
    id: 'molar-concentration', area: 'solutions', kind: 'concept', title: 'Molar concentration and dilution',
    scope: 'mol/L (mol/dm³), c = n/V, dilution calculations.',
  },
  {
    id: 'electrolytic-dissociation', area: 'solutions', kind: 'concept', title: 'Electrolytes and dissociation',
    scope: 'Electrolytes vs non-electrolytes; dissociation into ions; strong and weak electrolytes.',
  },
  {
    id: 'solubility-rules', area: 'solutions', kind: 'concept', title: 'Solubility rules and precipitation',
    scope: 'Predicting precipitates; solubility tables.',
  },

  // ── Gases ──────────────────────────────────────────────────────────────────
  {
    id: 'gas-pressure', area: 'gases', kind: 'concept', title: 'Gas pressure (particle explanation)',
    scope: 'Pressure from particle collisions; compressibility; qualitative effects of volume and temperature.',
  },
  {
    id: 'gas-laws', area: 'gases', kind: 'concept', title: 'Gas laws',
    scope: 'Boyle, Charles, Gay-Lussac, combined gas law.',
  },
  {
    id: 'molar-gas-volume', area: 'gases', kind: 'concept', title: 'Avogadro\'s law and molar volume',
    scope: 'Equal volumes contain equal numbers of particles; molar volume (22,4 L at STP / 24 dm³ at RTP); relative gas density.',
  },
  {
    id: 'ideal-gas-equation', area: 'gases', kind: 'concept', title: 'Ideal gas equation',
    scope: 'pV = nRT; partial pressures; real-gas deviation at the extended level.',
  },
  {
    id: 'kinetic-molecular-theory', area: 'gases', kind: 'concept', title: 'Kinetic molecular theory',
    scope: 'Assumptions of the kinetic model of gases and its use to explain the gas laws.',
  },

  // ── Acids, bases & salts ───────────────────────────────────────────────────
  {
    id: 'acids-bases-indicators', area: 'acids-bases', kind: 'concept', title: 'Acids, alkalis and indicators',
    scope: 'Everyday acids and bases; indicators; the pH scale as a qualitative 0–14 scale.',
    legacy: { concepts: ['acids-and-bases'], cheatSheets: ['acids-and-bases'] },
  },
  {
    id: 'neutralisation', area: 'acids-bases', kind: 'concept', title: 'Neutralisation and salts',
    scope: 'Acid + base → salt + water; making salts; naming the salt formed.',
    legacy: { concepts: ['acids-and-bases'], cheatSheets: ['acids-and-bases'] },
  },
  {
    id: 'reactions-of-acids', area: 'acids-bases', kind: 'concept', title: 'Reactions of acids',
    scope: 'Acids with metals, carbonates, metal oxides and hydroxides; acidic and basic oxides.',
    legacy: { cheatSheets: ['acids-and-bases', 'reaction-types'] },
  },
  {
    id: 'acid-base-theories', area: 'acids-bases', kind: 'concept', title: 'Acid–base theories',
    scope: 'Arrhenius, Brønsted–Lowry (conjugate pairs, amphiprotic species), Lewis.',
    legacy: { concepts: ['acids-and-bases'], cheatSheets: ['acids-and-bases'] },
  },
  {
    id: 'ph-calculations', area: 'acids-bases', kind: 'concept', title: 'pH and [H⁺]',
    scope: 'pH = −log[H⁺]/[H₃O⁺]; Kw; converting between pH and concentration.',
  },
  {
    id: 'strong-weak-acids', area: 'acids-bases', kind: 'concept', title: 'Strong and weak acids',
    scope: 'Degree of dissociation; strong vs weak vs concentrated vs dilute.',
    legacy: { cheatSheets: ['acids-and-bases'] },
  },
  {
    id: 'acid-dissociation-constants', area: 'acids-bases', kind: 'concept', title: 'Ka, Kb and pKa',
    scope: 'Acid and base dissociation constants; weak-acid pH calculations; predominance diagrams.',
  },
  {
    id: 'buffers', area: 'acids-bases', kind: 'concept', title: 'Buffers',
    scope: 'How buffers resist pH change; Henderson–Hasselbalch; buffer calculations.',
  },
  {
    id: 'salt-hydrolysis', area: 'acids-bases', kind: 'concept', title: 'Salt hydrolysis',
    scope: 'Why some salt solutions are acidic or basic.',
  },

  // ── Redox & electrochemistry ───────────────────────────────────────────────
  {
    id: 'redox-oxygen', area: 'redox', kind: 'concept', title: 'Oxidation and reduction as oxygen transfer',
    scope: 'Oxidation as gain of oxygen, reduction as loss; rusting and burning as oxidation.',
  },
  {
    id: 'reactivity-series', area: 'redox', kind: 'concept', title: 'Reactivity (activity) series',
    scope: 'Ordering metals by reactivity; displacement reactions; the Beketov series.',
  },
  {
    id: 'oxidation-states', area: 'redox', kind: 'concept', title: 'Oxidation states',
    scope: 'Assigning oxidation numbers; using them to spot redox.',
  },
  {
    id: 'redox-electron-transfer', area: 'redox', kind: 'concept', title: 'Redox as electron transfer',
    scope: 'Oxidising and reducing agents; half-equations; redox couples (Ox/Red).',
  },
  {
    id: 'balancing-redox', area: 'redox', kind: 'concept', title: 'Balancing redox equations',
    scope: 'Electron-balance and ion-electron (half-equation) methods, including acidic/basic media.',
  },
  {
    id: 'electrolysis', area: 'redox', kind: 'concept', title: 'Electrolysis',
    scope: 'Electrolysis of melts and solutions; products at electrodes; Faraday\'s laws at the extended level.',
  },
  {
    id: 'electrochemical-cells', area: 'redox', kind: 'concept', title: 'Electrochemical cells',
    scope: 'Galvanic cells, batteries, fuel cells, salt bridge; cell voltage qualitatively.',
  },
  {
    id: 'electrode-potentials', area: 'redox', kind: 'concept', title: 'Electrode potentials',
    scope: 'Standard electrode potentials, E°cell, predicting spontaneity; Nernst at the extended level.',
  },
  {
    id: 'corrosion', area: 'redox', kind: 'concept', title: 'Corrosion and its prevention',
    scope: 'Rusting conditions; barrier and sacrificial protection.',
  },

  // ── Energetics & thermodynamics ────────────────────────────────────────────
  {
    id: 'exo-endothermic', area: 'energetics', kind: 'concept', title: 'Exothermic and endothermic reactions',
    scope: 'Energy released or absorbed; temperature change; thermochemical equations with +Q.',
  },
  {
    id: 'reaction-profiles', area: 'energetics', kind: 'concept', title: 'Energy profiles and activation energy',
    scope: 'Energy level diagrams; activation energy; effect of a catalyst on the profile.',
  },
  {
    id: 'bond-energies', area: 'energetics', kind: 'concept', title: 'Bond energies',
    scope: 'Bond breaking absorbs energy, bond making releases it; calculating reaction energy from bond energies.',
  },
  {
    id: 'enthalpy-calorimetry', area: 'energetics', kind: 'concept', title: 'Enthalpy change and calorimetry',
    scope: 'ΔH notation; q = mcΔT; molar enthalpy of reaction; calorific value.',
  },
  {
    id: 'hess-law', area: 'energetics', kind: 'concept', title: 'Hess\'s law',
    scope: 'Enthalpy cycles; enthalpies of formation and combustion.',
  },
  {
    id: 'entropy-gibbs', area: 'energetics', kind: 'concept', title: 'Entropy and Gibbs energy',
    scope: 'Entropy, the second law, ΔG = ΔH − TΔS, spontaneity; ΔG° = −RT ln K.',
  },

  // ── Kinetics ───────────────────────────────────────────────────────────────
  {
    id: 'rate-factors', area: 'kinetics', kind: 'concept', title: 'Factors affecting reaction rate',
    scope: 'Temperature, concentration, pressure, surface area, catalyst — qualitatively.',
  },
  {
    id: 'collision-theory', area: 'kinetics', kind: 'concept', title: 'Collision theory',
    scope: 'Successful collisions need enough energy and the right orientation; explaining the rate factors.',
  },
  {
    id: 'catalysts', area: 'kinetics', kind: 'concept', title: 'Catalysts',
    scope: 'What catalysts do; homogeneous and heterogeneous; enzymes as catalysts.',
  },
  {
    id: 'measuring-rate', area: 'kinetics', kind: 'concept', title: 'Measuring and calculating rate',
    scope: 'Rate from graphs and tangents; mean rate; half-reaction time.',
  },
  {
    id: 'rate-laws', area: 'kinetics', kind: 'concept', title: 'Rate equations',
    scope: 'Rate law, order, rate constant, half-life, rate-determining step, Arrhenius.',
  },
  {
    id: 'maxwell-boltzmann', area: 'kinetics', kind: 'concept', title: 'Maxwell–Boltzmann distribution',
    scope: 'Energy distribution of particles and how temperature and catalysts change the fraction above Ea.',
  },

  // ── Equilibrium ────────────────────────────────────────────────────────────
  {
    id: 'reversible-reactions', area: 'equilibrium', kind: 'concept', title: 'Reversible reactions and dynamic equilibrium',
    scope: 'Reactions that go both ways; dynamic equilibrium; total vs non-total transformations.',
  },
  {
    id: 'le-chatelier', area: 'equilibrium', kind: 'concept', title: 'Le Chatelier\'s principle',
    scope: 'Predicting the effect of concentration, pressure and temperature changes on an equilibrium.',
  },
  {
    id: 'equilibrium-constant', area: 'equilibrium', kind: 'concept', title: 'Equilibrium constant',
    scope: 'Kc, Kp, Q; law of mass action; ICE / reaction-table calculations.',
  },
  {
    id: 'solubility-product', area: 'equilibrium', kind: 'concept', title: 'Solubility product',
    scope: 'Ksp, solubility equilibria, common-ion effect.',
  },

  // ── Organic chemistry ──────────────────────────────────────────────────────
  {
    id: 'organic-intro', area: 'organic', kind: 'concept', title: 'Introduction to carbon compounds',
    scope: 'Why carbon forms so many compounds; organic vs inorganic; methane, ethanol, acetic acid as first examples.',
  },
  {
    id: 'hydrocarbons', area: 'organic', kind: 'concept', title: 'Hydrocarbons',
    scope: 'Alkanes, alkenes, alkynes; saturated and unsaturated; their typical reactions.',
  },
  {
    id: 'crude-oil-fuels', area: 'organic', kind: 'concept', title: 'Crude oil and its processing',
    scope: 'Crude oil, natural gas, coal; fractional distillation; cracking and reforming.',
  },
  {
    id: 'homologous-series', area: 'organic', kind: 'concept', title: 'Homologous series',
    scope: 'General formulas; trends in physical properties along a series.',
    legacy: { concepts: ['functional-groups'], cheatSheets: ['functional-groups'] },
  },
  {
    id: 'functional-groups', area: 'organic', kind: 'concept', title: 'Functional groups',
    scope: 'Recognising alcohol, aldehyde, ketone, carboxylic acid, ester, amine, amide, halogenoalkane groups.',
    legacy: { concepts: ['functional-groups'], cheatSheets: ['functional-groups'] },
  },
  {
    id: 'oxygen-organics', area: 'organic', kind: 'concept', title: 'Alcohols, acids and esters',
    scope: 'Properties and reactions of alcohols, aldehydes/ketones, carboxylic acids and esters; esterification.',
  },
  {
    id: 'nitrogen-organics', area: 'organic', kind: 'concept', title: 'Amines and amides',
    scope: 'Amines, amides, aniline; basicity of amines.',
  },
  {
    id: 'aromatic-compounds', area: 'organic', kind: 'concept', title: 'Benzene and aromatic compounds',
    scope: 'Structure of benzene, arenes, phenol; substitution reactions of arenes.',
  },
  {
    id: 'isomerism', area: 'organic', kind: 'concept', title: 'Structural isomerism',
    scope: 'Chain, position and functional-group isomers; Butlerov\'s theory of structure.',
  },
  // `stereoisomerism` was split in two on 2026-09-25 (docs/curriculum/ALIGNMENT.md §2.3):
  // curricula place geometric and optical isomerism in different years.
  {
    id: 'geometric-isomerism', area: 'organic', kind: 'concept', title: 'Geometric (cis/trans, E/Z) isomerism',
    scope: 'cis/trans and E/Z isomers of alkenes and other rigid structures; conditions for them to exist.',
  },
  {
    id: 'optical-isomerism', area: 'organic', kind: 'concept', title: 'Optical isomerism and chirality',
    scope: 'Chiral centres, enantiomers, optical activity; Fischer projections and D/L; R/S at the extended level.',
  },
  {
    id: 'organic-reaction-types', area: 'organic', kind: 'concept', title: 'Organic reaction types',
    scope: 'Addition, substitution, elimination, oxidation, condensation, hydrolysis — recognising and predicting products.',
    legacy: { concepts: ['reaction-pathways'], cheatSheets: ['functional-groups'] },
  },
  {
    id: 'reaction-mechanisms', area: 'organic', kind: 'concept', title: 'Reaction mechanisms',
    scope: 'Curly arrows; radical substitution, electrophilic addition, nucleophilic substitution (SN1/SN2), elimination.',
  },
  {
    id: 'reaction-pathways', area: 'organic', kind: 'concept', title: 'Multi-step synthesis',
    scope: 'Planning sequences of reactions between functional groups; transformation chains; protecting groups.',
    legacy: { concepts: ['reaction-pathways'] },
  },

  // ── Polymers & materials ───────────────────────────────────────────────────
  {
    id: 'polymers-intro', area: 'polymers-materials', kind: 'concept', title: 'Polymers',
    scope: 'Monomer, polymer, repeat unit; natural and synthetic polymers; plastics, rubbers, fibres.',
  },
  {
    id: 'addition-polymerisation', area: 'polymers-materials', kind: 'concept', title: 'Addition polymerisation',
    scope: 'Forming polymers from alkenes; drawing repeat units.',
  },
  {
    id: 'condensation-polymerisation', area: 'polymers-materials', kind: 'concept', title: 'Condensation polymerisation',
    scope: 'Polyesters and polyamides; polycondensation.',
  },
  {
    id: 'plastics-and-recycling', area: 'polymers-materials', kind: 'concept', title: 'Plastics and recycling',
    scope: 'Environmental impact of plastics; recycling and biodegradability.',
  },
  {
    id: 'alloys', area: 'polymers-materials', kind: 'concept', title: 'Alloys',
    scope: 'Why alloys are harder than pure metals; common alloys.',
  },
  {
    id: 'materials', area: 'polymers-materials', kind: 'concept', title: 'Ceramics, glass, composites and nanomaterials',
    scope: 'Building materials, glass, ceramics, composites, nanoparticles; choosing a material for a use.',
  },

  // ── Biochemistry ───────────────────────────────────────────────────────────
  {
    id: 'food-molecules', area: 'biochemistry', kind: 'concept', title: 'Food molecules',
    scope: 'Carbohydrates, fats, proteins as nutrients and energy sources; food tests.',
  },
  {
    id: 'carbohydrates', area: 'biochemistry', kind: 'concept', title: 'Carbohydrates',
    scope: 'Glucose, sucrose, starch, cellulose; ring structures and glycosidic bonds at the extended level.',
  },
  {
    id: 'lipids', area: 'biochemistry', kind: 'concept', title: 'Fats, oils and soaps',
    scope: 'Fatty acids (saturated, cis/trans), triglycerides, saponification, soaps and surfactants.',
  },
  {
    id: 'amino-acids-proteins', area: 'biochemistry', kind: 'concept', title: 'Amino acids and proteins',
    scope: 'Amino acids, peptide bond, protein structure, enzymes.',
  },
  {
    id: 'nucleic-acids', area: 'biochemistry', kind: 'concept', title: 'Nucleic acids',
    scope: 'DNA and RNA as polymers; the genetic code in chemical terms.',
  },
  {
    id: 'photosynthesis-respiration', area: 'biochemistry', kind: 'concept', title: 'Photosynthesis and respiration (chemical view)',
    scope: 'Word and symbol equations; energy storage and release; metabolism at the extended level.',
  },

  // ── Nuclear chemistry ──────────────────────────────────────────────────────
  {
    id: 'radioactivity', area: 'nuclear', kind: 'concept', title: 'Radioactivity',
    scope: 'Alpha, beta and gamma radiation, their properties and hazards; radiation protection.',
    legacy: { cheatSheets: ['isotopes-and-radioactivity'] },
  },
  {
    id: 'nuclear-equations', area: 'nuclear', kind: 'concept', title: 'Nuclear equations',
    scope: 'Balancing mass and atomic numbers; changes in Z and A on decay.',
    legacy: { cheatSheets: ['isotopes-and-radioactivity'] },
  },
  {
    id: 'half-life', area: 'nuclear', kind: 'concept', title: 'Half-life and decay',
    scope: 'Half-life, activity, exponential decay, radiometric dating.',
  },
  {
    id: 'fission-fusion', area: 'nuclear', kind: 'concept', title: 'Fission, fusion and nucleosynthesis',
    scope: 'Nuclear energy; the origin of the elements in stars.',
  },

  // ── Analytical & instrumental ──────────────────────────────────────────────
  {
    id: 'gas-tests', area: 'analytical', kind: 'concept', title: 'Tests for gases',
    scope: 'Tests for hydrogen, oxygen, carbon dioxide, chlorine, ammonia, water.',
  },
  {
    id: 'ion-tests', area: 'analytical', kind: 'concept', title: 'Tests for ions',
    scope: 'Flame tests, hydroxide precipitates, carbonate, halide and sulfate tests; qualitative analysis schemes.',
  },
  {
    id: 'chromatography', area: 'analytical', kind: 'concept', title: 'Chromatography',
    scope: 'Paper and thin-layer chromatography; Rf values; column/gas chromatography at the extended level.',
  },
  {
    id: 'titration', area: 'analytical', kind: 'concept', title: 'Titration',
    scope: 'Acid–base titration technique and calculations; equivalence point; titration curves; redox titrations.',
  },
  {
    id: 'spectrophotometry', area: 'analytical', kind: 'concept', title: 'Colorimetry and UV–vis spectroscopy',
    scope: 'Absorbance, colour, Beer–Lambert law, calibration curves.',
  },
  {
    id: 'functional-group-tests', area: 'analytical', kind: 'concept', title: 'Tests for functional groups',
    scope: 'Identifying organic families by their reactions: bromine water, acidified dichromate or permanganate, carbonate, Tollens, Fehling, Schiff, 2,4-DNP.',
  },
  {
    id: 'ir-nmr-ms', area: 'analytical', kind: 'concept', title: 'IR, NMR and mass spectrometry',
    scope: 'Identifying functional groups and structures from spectra; mass spectra of elements and compounds.',
    legacy: { cheatSheets: ['functional-groups'] },
  },

  // ── Inorganic / descriptive chemistry ──────────────────────────────────────
  {
    id: 'air-oxygen-hydrogen', area: 'descriptive', kind: 'concept', title: 'Air, oxygen and hydrogen',
    scope: 'Composition of air; preparation and properties of oxygen, ozone and hydrogen.',
  },
  {
    id: 'water-chemistry', area: 'descriptive', kind: 'concept', title: 'Water',
    scope: 'Properties of water, water as a solvent, hard and soft water.',
  },
  {
    id: 'inorganic-compound-classes', area: 'descriptive', kind: 'concept', title: 'Classes of inorganic compounds',
    scope: 'Oxides, bases, acids and salts as classes; amphoterism; genetic links and transformation chains.',
  },
  {
    id: 'non-metals-chemistry', area: 'descriptive', kind: 'concept', title: 'Chemistry of the non-metals',
    scope: 'Halogens, sulfur, nitrogen, phosphorus, carbon, silicon and their main compounds.',
  },
  {
    id: 'metals-chemistry', area: 'descriptive', kind: 'concept', title: 'Chemistry of the metals',
    scope: 'Alkali and alkaline-earth metals, aluminium, iron and their compounds.',
  },
  {
    id: 'transition-metals', area: 'descriptive', kind: 'concept', title: 'Transition metals and complexes',
    scope: 'Variable oxidation states, coloured compounds, catalytic activity, coordination compounds.',
  },

  // ── Industrial, environmental & applied ────────────────────────────────────
  {
    id: 'atmosphere-climate', area: 'applied', kind: 'concept', title: 'Atmosphere and climate change',
    scope: 'Evolution and composition of the atmosphere; greenhouse effect; carbon cycle; carbon footprint.',
  },
  {
    id: 'pollution', area: 'applied', kind: 'concept', title: 'Pollution',
    scope: 'Air pollutants, acid rain, ozone depletion, ocean acidification; exposure limits.',
  },
  {
    id: 'water-treatment', area: 'applied', kind: 'concept', title: 'Water treatment',
    scope: 'Potable water, desalination, waste-water treatment.',
  },
  {
    id: 'resources-sustainability', area: 'applied', kind: 'concept', title: 'Resources and sustainability',
    scope: 'Finite resources, recycling, life-cycle assessment, green chemistry.',
  },
  {
    id: 'fuels-energy', area: 'applied', kind: 'concept', title: 'Fuels and energy sources',
    scope: 'Fossil fuels vs biofuels vs hydrogen; energy released by fuels; renewable vs non-renewable.',
  },
  {
    id: 'industrial-processes', area: 'applied', kind: 'concept', title: 'Industrial processes',
    scope: 'Haber and contact processes, fertilisers, chemical industry, yield vs rate compromises.',
  },
  {
    id: 'metal-extraction', area: 'applied', kind: 'concept', title: 'Extracting metals',
    scope: 'Ores, reduction with carbon, electrolytic extraction, metallurgy, phytomining and bioleaching.',
  },
  {
    id: 'chemical-safety', area: 'applied', kind: 'concept', title: 'Chemical safety in everyday life',
    scope: 'Household chemicals, hazard labels, first aid, safe handling outside the lab.',
  },

  // ── Skills — practical ─────────────────────────────────────────────────────
  {
    id: 'lab-safety', area: 'skills-practical', kind: 'skill', title: 'Lab safety and equipment',
    scope: 'Safety rules, hazard pictograms, naming and using basic glassware and the Bunsen burner.',
  },
  {
    id: 'measurement-technique', area: 'skills-practical', kind: 'skill', title: 'Measuring mass, volume and temperature',
    scope: 'Choosing and reading instruments; volumetric glassware.',
  },
  {
    id: 'preparing-solutions', area: 'skills-practical', kind: 'skill', title: 'Preparing solutions',
    scope: 'Making a solution of given concentration; dilution with volumetric glassware.',
  },
  {
    id: 'preparing-substances', area: 'skills-practical', kind: 'skill', title: 'Preparing salts and gases',
    scope: 'Preparing a soluble or insoluble salt; making and collecting gases.',
  },
  {
    id: 'organic-synthesis-techniques', area: 'skills-practical', kind: 'skill', title: 'Organic synthesis techniques',
    scope: 'Heating under reflux, distillation, purification and melting-point checks.',
  },

  // ── Skills — quantitative ──────────────────────────────────────────────────
  {
    id: 'units-and-conversions', area: 'skills-quantitative', kind: 'skill', title: 'Units, conversions and scientific notation',
    scope: 'SI units, unit conversion, standard form, proportional reasoning, rearranging formulas.',
  },
  {
    id: 'significant-figures-uncertainty', area: 'skills-quantitative', kind: 'skill', title: 'Significant figures and uncertainty',
    scope: 'Significant figures, measurement uncertainty, random and systematic error, mean and spread.',
  },
  {
    id: 'graphs-and-data', area: 'skills-quantitative', kind: 'skill', title: 'Tables, graphs and data analysis',
    scope: 'Plotting and reading graphs, gradients and tangents, spotting trends and anomalies.',
  },
  {
    id: 'chemical-calculations', area: 'skills-quantitative', kind: 'skill', title: 'Multi-step chemical calculations',
    scope: 'Combining mole, concentration, gas and energy calculations; logarithms for pH; data booklet use.',
  },

  // ── Skills — models & representations ──────────────────────────────────────
  {
    id: 'particle-diagrams', area: 'skills-models', kind: 'skill', title: 'Particle diagrams',
    scope: 'Drawing and interpreting particle pictures of substances, mixtures and reactions.',
  },
  {
    id: 'macro-micro-symbolic', area: 'skills-models', kind: 'skill', title: 'Macro, micro and symbolic levels',
    scope: 'Moving between observations, particle explanations and formulas; the Israeli "levels of understanding".',
  },
  {
    id: 'molecular-models', area: 'skills-models', kind: 'skill', title: 'Molecular models',
    scope: 'Ball-and-stick and space-filling models, 3D software, crystal models; limitations of models.',
  },
  {
    id: 'structural-formulas', area: 'skills-models', kind: 'skill', title: 'Structural formulas',
    scope: 'Displayed, condensed, skeletal and wedge formulas; Haworth/Fischer projections at the extended level.',
    legacy: { cheatSheets: ['functional-groups', 'organic-nomenclature'] },
  },
  {
    id: 'reference-tables', area: 'skills-models', kind: 'skill', title: 'Using reference tables',
    scope: 'Periodic table, solubility table, activity series, data booklet.',
  },

  // ── Skills — inquiry & communication ───────────────────────────────────────
  {
    id: 'scientific-method', area: 'skills-inquiry', kind: 'skill', title: 'Hypotheses, variables and fair tests',
    scope: 'Asking questions, hypothesising, controlling variables, planning an investigation.',
  },
  {
    id: 'evaluating-experiments', area: 'skills-inquiry', kind: 'skill', title: 'Evaluating experiments',
    scope: 'Judging methods and results, identifying errors, suggesting improvements.',
  },
  {
    id: 'scientific-communication', area: 'skills-inquiry', kind: 'skill', title: 'Reports and argument',
    scope: 'Lab reports, claim–evidence–reasoning, oral defence, reading scientific texts.',
  },
  {
    id: 'nature-of-science', area: 'skills-inquiry', kind: 'skill', title: 'History and nature of science',
    scope: 'How models change with evidence; key experiments; who did the science.',
  },
  {
    id: 'socio-scientific-issues', area: 'skills-inquiry', kind: 'skill', title: 'Chemistry and society',
    scope: 'Evaluating information sources; debating ethical, environmental and economic questions.',
  },
] as const satisfies readonly CanonicalConcept[];

export const CONCEPT_BY_ID: ReadonlyMap<string, CanonicalConcept> = new Map(
  CONCEPTS.map((concept) => [concept.id, concept])
);
