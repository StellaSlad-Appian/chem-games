// src/i18n/chemistry-names/fr.ts
//
// French names for the chemistry registries.
//
// This is kept apart from the UI dictionary on purpose. The English names are
// already the canonical data in src/core-engine/data/, so duplicating them into
// an `en` dictionary would create a second source of truth that can drift from
// the registry. Instead each non-default locale supplies an *overlay*, keyed by
// the registry's own identifiers, and `src/i18n/chemistry-names.test.ts` asserts
// the overlay is complete against the live registries.
//
// What is NOT here, and must never be: formulae (H2SO4), element symbols (Na),
// state symbols ((aq), (s)) and charges. Those are international notation.
// Names are translated; notation is not.
//
// Three things French does that neither English nor German does, all of them
// fixed in docs/i18n/glossary-fr.md:
//
//   * Compounds compose **anion first, then `de` + cation**:
//     *hydroxyde de sodium*, not German's single word *Natriumhydroxid* and not
//     English's cation-first *sodium hydroxide*.
//   * The **element** and the **simple substance** have different names:
//     H is *hydrogène* but H2 is *dihydrogène*; likewise *dioxygène*,
//     *diazote*, *dichlore*. This is taught from 3e and a French reader
//     notices its absence. ELEMENT_NAMES_FR holds the element names;
//     SPECIES_NAMES_FR and LEWIS_MOLECULE_TEXT_FR hold the *di-* forms.
//   * Binary acids take *-hydrique* (HCl *acide chlorhydrique*), and the
//     -ous/-ic pair becomes *-eux*/*-ique* (*acide nitreux* / *acide nitrique*).

/**
 * All 118 elements, keyed by symbol. Verified one at a time rather than
 * pattern-matched from the English, because French differs in ways a
 * transliteration would miss — Nitrogen/**azote** above all, plus
 * Tungsten/tungstène, Lead/plomb, Tin/étain, Gold/or, Silver/argent.
 *
 * Note the two that do **not** differ: Na is *sodium* and K is *potassium* in
 * French, exactly as in English. German's Natrium/Kalium made those the
 * textbook false friends, and chemistry-names.test.ts was written around that;
 * see the note in docs/i18n/glossary-fr.md.
 *
 * Spellings follow French IUPAC usage: césium (not caesium), soufre, azote,
 * étain, iode, bismuth, silicium, tungstène, molybdène.
 */
export const ELEMENT_NAMES_FR: Record<string, string> = {
  H: 'Hydrogène',
  He: 'Hélium',
  Li: 'Lithium',
  Be: 'Béryllium',
  B: 'Bore',
  C: 'Carbone',
  N: 'Azote',
  O: 'Oxygène',
  F: 'Fluor',
  Ne: 'Néon',
  Na: 'Sodium',
  Mg: 'Magnésium',
  Al: 'Aluminium',
  Si: 'Silicium',
  P: 'Phosphore',
  S: 'Soufre',
  Cl: 'Chlore',
  Ar: 'Argon',
  K: 'Potassium',
  Ca: 'Calcium',
  Sc: 'Scandium',
  Ti: 'Titane',
  V: 'Vanadium',
  Cr: 'Chrome',
  Mn: 'Manganèse',
  Fe: 'Fer',
  Co: 'Cobalt',
  Ni: 'Nickel',
  Cu: 'Cuivre',
  Zn: 'Zinc',
  Ga: 'Gallium',
  Ge: 'Germanium',
  As: 'Arsenic',
  Se: 'Sélénium',
  Br: 'Brome',
  Kr: 'Krypton',
  Rb: 'Rubidium',
  Sr: 'Strontium',
  Y: 'Yttrium',
  Zr: 'Zirconium',
  Nb: 'Niobium',
  Mo: 'Molybdène',
  Tc: 'Technétium',
  Ru: 'Ruthénium',
  Rh: 'Rhodium',
  Pd: 'Palladium',
  Ag: 'Argent',
  Cd: 'Cadmium',
  In: 'Indium',
  Sn: 'Étain',
  Sb: 'Antimoine',
  Te: 'Tellure',
  I: 'Iode',
  Xe: 'Xénon',
  Cs: 'Césium',
  Ba: 'Baryum',
  La: 'Lanthane',
  Ce: 'Cérium',
  Pr: 'Praséodyme',
  Nd: 'Néodyme',
  Pm: 'Prométhium',
  Sm: 'Samarium',
  Eu: 'Europium',
  Gd: 'Gadolinium',
  Tb: 'Terbium',
  Dy: 'Dysprosium',
  Ho: 'Holmium',
  Er: 'Erbium',
  Tm: 'Thulium',
  Yb: 'Ytterbium',
  Lu: 'Lutécium',
  Hf: 'Hafnium',
  Ta: 'Tantale',
  W: 'Tungstène',
  Re: 'Rhénium',
  Os: 'Osmium',
  Ir: 'Iridium',
  Pt: 'Platine',
  Au: 'Or',
  Hg: 'Mercure',
  Tl: 'Thallium',
  Pb: 'Plomb',
  Bi: 'Bismuth',
  Po: 'Polonium',
  At: 'Astate',
  Rn: 'Radon',
  Fr: 'Francium',
  Ra: 'Radium',
  Ac: 'Actinium',
  Th: 'Thorium',
  Pa: 'Protactinium',
  U: 'Uranium',
  Np: 'Neptunium',
  Pu: 'Plutonium',
  Am: 'Américium',
  Cm: 'Curium',
  Bk: 'Berkélium',
  Cf: 'Californium',
  Es: 'Einsteinium',
  Fm: 'Fermium',
  Md: 'Mendélévium',
  No: 'Nobélium',
  Lr: 'Lawrencium',
  Rf: 'Rutherfordium',
  Db: 'Dubnium',
  Sg: 'Seaborgium',
  Bh: 'Bohrium',
  Hs: 'Hassium',
  Mt: 'Meitnérium',
  Ds: 'Darmstadtium',
  Rg: 'Roentgenium',
  Cn: 'Copernicium',
  Nh: 'Nihonium',
  Fl: 'Flérovium',
  Mc: 'Moscovium',
  Lv: 'Livermorium',
  Ts: 'Tennesse',
  Og: 'Oganesson',
};

/**
 * Compound names, keyed by the registry id.
 *
 * French composes them anion-first with `de`: *hydroxyde de sodium*,
 * *chlorure de calcium*. Binary acids take *-hydrique* (HCl acide
 * chlorhydrique, HF acide fluorhydrique, HBr acide bromhydrique, HI acide
 * iodhydrique); the -ous/-ic pair becomes -eux/-ique (HNO2 acide nitreux vs
 * HNO3 acide nitrique, H2SO3 acide sulfureux vs H2SO4 acide sulfurique).
 *
 * `'23'` is the one name that is spelled identically in both languages —
 * N2H4 is *hydrazine* in French too — and it is exempted by name in
 * chemistry-names.test.ts rather than being disguised.
 */
export const COMPOUND_NAMES_FR: Record<string, string> = {
  '1': 'Acide chlorhydrique',
  '2': 'Acide sulfurique',
  '3': 'Acide nitrique',
  '4': 'Hydroxyde de sodium',
  '5': 'Hydroxyde de potassium',
  '6': 'Chlorure de sodium',
  '7': 'Chlorure de potassium',
  '8': 'Acide fluorhydrique',
  '9': 'Acide carbonique',
  '10': 'Acide phosphorique',
  '11': 'Ammoniac',
  '12': 'Chlorure de calcium',
  '13': 'Chlorure de magnésium',
  '14': 'Sulfate de sodium',
  '15': 'Eau',
  '16': 'Hydrogénocarbonate de sodium',
  '17': 'Hydrogénocarbonate de potassium',
  '18': 'Acide nitreux',
  '19': 'Hydroxyde de baryum',
  '20': 'Nitrate de potassium',
  '21': 'Chlorure de lithium',
  '22': 'Acide sulfureux',
  '23': 'Hydrazine',
  '24': 'Hydroxyde de lithium',
  '25': 'Acide bromhydrique',
  '26': 'Nitrate de sodium',
  '27': 'Dihydrogénophosphate de sodium',
  '28': 'Hydrogénophosphate de disodium',
  '29': 'Acide perchlorique',
  '30': 'Acide iodhydrique',
  '31': 'Hydroxyde de césium',
  '32': 'Acide borique',
  '33': 'Acide silicique',
  '34': 'Hydrogénosulfure de sodium',
  '35': 'Hydrogénosulfate de sodium',
};

/**
 * Ion names, keyed by the registry id (monoatomic and polyatomic ids do not
 * overlap, so one map covers both).
 *
 * French uses the systematic *hydrogéno-* prefix where the English data still
 * uses the older *bi-*: bicarbonate is hydrogénocarbonate, bisulfate is
 * hydrogénosulfate, bisulfite is hydrogénosulfite. A monoatomic cation is
 * named *ion* + the element (*ion sodium*), which is why those read as two
 * words where the anions are one.
 */
export const ION_NAMES_FR: Record<string, string> = {
  '1': 'Ion hydrogène',
  '2': 'Chlorure',
  '3': 'Sulfate',
  '4': 'Nitrate',
  '5': 'Ion sodium',
  '6': 'Hydroxyde',
  '7': 'Ion potassium',
  '8': 'Fluorure',
  '9': 'Hydrogénocarbonate',
  '10': 'Dihydrogénophosphate',
  '11': 'Ion calcium',
  '12': 'Ion magnésium',
  '13': 'Nitrite',
  '14': 'Ion baryum',
  '15': 'Ion lithium',
  '16': 'Hydrogénosulfite',
  '17': 'Bromure',
  '18': 'Hydrogénophosphate',
  '19': 'Perchlorate',
  '20': 'Iodure',
  '21': 'Ion césium',
  '22': 'Dihydrogénoborate',
  '23': 'Trihydrogénosilicate',
  '24': 'Hydrogénosulfure',
  '25': 'Hydrogénosulfate',
  '26': 'Ammonium',
  '27': 'Carbonate',
  '28': 'Sulfite',
  '29': 'Phosphate',
  '30': 'Éthanoate (acétate)',
  '31': 'Cyanure',
  '32': 'Hypochlorite',
  '33': 'Chlorite',
  '34': 'Chlorate',
  '35': 'Permanganate',
  '36': 'Chromate',
  '37': 'Dichromate',
  '38': 'Thiosulfate',
  '39': 'Peroxyde',
  '40': 'Oxalate',
};

/**
 * Everyday species names for Reaction Balancer, keyed by bare formula exactly
 * as `SPECIES_NAMES` in src/core-engine/data/reactions.ts is.
 *
 * This is where French's element/simple-substance distinction shows up most:
 * H2 is **dihydrogène**, O2 **dioxygène**, N2 **diazote**, Cl2 **dichlore**.
 * The bare element names (hydrogène, oxygène) are in ELEMENT_NAMES_FR and are
 * what the atom ledger shows — which is correct, because the ledger counts
 * *atoms* and a card names a *substance*.
 *
 * Note HCl: the substance is **chlorure d'hydrogène**, and that is what a
 * compound card shows. French calls its aqueous solution **acide
 * chlorhydrique**, so the reaction descriptions below say that where the
 * reaction is happening in water — the same distinction German draws with
 * Chlorwasserstoff / Salzsäure and English loses.
 */
export const SPECIES_NAMES_FR: Record<string, string> = {
  H2: 'Dihydrogène',
  O2: 'Dioxygène',
  H2O: 'Eau',
  Cl2: 'Dichlore',
  HCl: 'Chlorure d’hydrogène',
  CaCO3: 'Carbonate de calcium',
  CaO: 'Oxyde de calcium',
  CO2: 'Dioxyde de carbone',
  O3: 'Ozone',
  Mg: 'Magnésium',
  MgO: 'Oxyde de magnésium',
  N2: 'Diazote',
  NH3: 'Ammoniac',
  H2O2: 'Peroxyde d’hydrogène',
  Fe: 'Fer',
  Fe2O3: 'Oxyde de fer(III)',
  CH4: 'Méthane',
  H2SO4: 'Acide sulfurique',
  MgSO4: 'Sulfate de magnésium',
  Na: 'Sodium',
  NaOH: 'Hydroxyde de sodium',
  C2H5OH: 'Éthanol',
  SO2: 'Dioxyde de soufre',
  SO3: 'Trioxyde de soufre',
  NaCl: 'Chlorure de sodium',
  AgNO3: 'Nitrate d’argent',
  AgCl: 'Chlorure d’argent',
  NaNO3: 'Nitrate de sodium',
  C3H8: 'Propane',
  NaHCO3: 'Hydrogénocarbonate de sodium',
  CH3COOH: 'Acide éthanoïque',
  CH3COONa: 'Éthanoate de sodium',
  Cu: 'Cuivre',
  'Cu(NO3)2': 'Nitrate de cuivre(II)',
  Ag: 'Argent',
  'Pb(NO3)2': 'Nitrate de plomb(II)',
  KI: 'Iodure de potassium',
  PbI2: 'Iodure de plomb(II)',
  KNO3: 'Nitrate de potassium',
  C8H18: 'Octane',
  NO: 'Monoxyde d’azote',
  NaClO: 'Hypochlorite de sodium',
  Al: 'Aluminium',
  AlCl3: 'Chlorure d’aluminium',
  Al2O3: 'Oxyde d’aluminium',
  'Al2(SO4)3': 'Sulfate d’aluminium',
  'Ca(OH)2': 'Hydroxyde de calcium',
  CaCl2: 'Chlorure de calcium',
  NH4Cl: 'Chlorure d’ammonium',
  C: 'Carbone',
  CO: 'Monoxyde de carbone',
  C6H12O6: 'Glucose',
  H2CO3: 'Acide carbonique',
};

/**
 * Reaction prose, keyed by the id in reactions.ts. Equations, state symbols and
 * level assignments are not here: they are notation and rules, not copy.
 *
 * `hint` is the tier-2 strategy hint; `prompt` is the word equation a Défi
 * round shows. A reaction with no English prompt must not gain a French one, so
 * only the reactions that have one are listed with one.
 *
 * The prompts deliberately use the verbs the catalogue's tier-2 build hint
 * names — « réagit », « brûle », « se décompose » on the left, « pour former »,
 * « produit », « donne » on the right — so that hint is actually usable.
 */
export const REACTION_TEXT_FR: Record<
  string,
  { name: string; description: string; hint?: string; prompt?: string }
> = {
  rxn_01: {
    name: 'Synthèse de l’eau',
    hint: 'L’hydrogène est déjà bon. Équilibre l’oxygène en ajoutant de l’eau, puis revérifie l’hydrogène.',
    description:
      'Le dihydrogène brûle dans le dioxygène avec une flamme bleu pâle et une détonation ; il se forme de l’eau.',
    prompt: 'Le dihydrogène brûle dans le dioxygène pour former de l’eau liquide.',
  },
  rxn_25: {
    name: 'Synthèse du chlorure d’hydrogène',
    hint: 'Compte les atomes d’hydrogène et de chlore. À gauche, les deux vont par paires.',
    description:
      'Le dihydrogène et le dichlore se combinent en chlorure d’hydrogène, un gaz à l’odeur piquante.',
    prompt: 'Le dihydrogène réagit avec le dichlore pour former du chlorure d’hydrogène gazeux.',
  },
  rxn_31: {
    name: 'Synthèse du chlorure de sodium',
    hint: 'À gauche, le chlore va par paires. Fais-en deux chlorures de sodium, puis revérifie le sodium.',
    description:
      'Le sodium brûle dans le dichlore avec une flamme jaune vif ; il reste du chlorure de sodium blanc – le sel de table.',
    prompt: 'Le sodium métallique brûle dans le dichlore pour donner du chlorure de sodium solide.',
  },
  rxn_29: {
    name: 'Combustion du magnésium',
    hint: 'Le magnésium est déjà équilibré. Regarde l’oxygène.',
    description:
      'Le magnésium brûle dans le dioxygène avec une flamme blanche éblouissante ; il reste une poudre blanche.',
    prompt: 'Le magnésium métallique brûle dans le dioxygène pour donner de l’oxyde de magnésium solide.',
  },
  rxn_30: {
    name: 'Combustion incomplète du carbone',
    hint: 'Commence par le carbone, puis passe à l’oxygène.',
    description:
      'Quand le dioxygène manque, le carbone brûle en monoxyde de carbone, un gaz incolore et toxique.',
    prompt:
      'Le carbone solide brûle dans une petite quantité de dioxygène pour donner du monoxyde de carbone gazeux.',
  },
  rxn_24: {
    name: 'Synthèse du chlorure d’aluminium',
    hint: 'Équilibre d’abord l’aluminium, puis le chlore.',
    description:
      'L’aluminium rougeoie quand il réagit directement avec le dichlore pour donner du chlorure d’aluminium blanc.',
    prompt:
      'L’aluminium métallique réagit avec le dichlore pour former du chlorure d’aluminium solide.',
  },
  rxn_19: {
    name: 'Formation de l’ozone',
    hint: 'Il n’y a que l’oxygène à équilibrer. Cherche le plus petit nombre divisible à la fois par 2 et par 3.',
    description:
      'Le dioxygène se transforme en ozone – le gaz à l’odeur piquante qu’on sent après un orage.',
  },
  rxn_05: {
    name: 'Procédé Haber-Bosch',
    hint: 'Équilibre d’abord l’azote, puis l’hydrogène.',
    description:
      'Le diazote et le dihydrogène se combinent sous haute pression pour donner de l’ammoniac gazeux.',
    prompt: 'Le diazote et le dihydrogène se combinent pour former de l’ammoniac gazeux.',
  },
  rxn_26: {
    name: 'Électrolyse de l’eau',
    hint: 'Équilibre d’abord l’oxygène en ajoutant de l’eau, puis corrige l’hydrogène.',
    description:
      'Un courant électrique décompose l’eau ; des bulles de dihydrogène et de dioxygène montent aux électrodes.',
    prompt:
      'Un courant électrique décompose l’eau liquide pour donner du dihydrogène et du dioxygène.',
  },
  rxn_06: {
    name: 'Décomposition du peroxyde d’hydrogène',
    hint: 'L’hydrogène est déjà équilibré. Concentre-toi sur l’oxygène.',
    description:
      'Le peroxyde d’hydrogène se décompose en eau et en dioxygène ; la solution mousse pendant que le gaz s’échappe.',
  },
  rxn_08: {
    name: 'Rouille du fer',
    hint: 'Équilibre d’abord le fer, puis l’oxygène.',
    description:
      'Le fer réagit lentement avec le dioxygène pour donner de l’oxyde de fer(III) – les paillettes orange-brun qu’on appelle la rouille.',
  },
  rxn_04: {
    name: 'Combustion du méthane',
    hint: 'Pour une combustion, prends d’abord le carbone, puis l’hydrogène, et l’oxygène en dernier.',
    description:
      'Le méthane brûle dans le dioxygène avec une flamme bleue et donne du dioxyde de carbone et de la vapeur d’eau.',
    prompt:
      'Le méthane brûle dans le dioxygène pour former du dioxyde de carbone et de la vapeur d’eau.',
  },
  rxn_15: {
    name: 'Procédé de contact (étape 2)',
    hint: 'Le soufre est déjà équilibré. Regarde l’oxygène.',
    description:
      'Le dioxyde de soufre est oxydé en trioxyde de soufre sur un catalyseur – une étape intermédiaire vers l’acide sulfurique.',
  },
  rxn_17: {
    name: 'Le sodium dans l’eau',
    hint: 'Équilibre d’abord l’hydrogène entre l’eau et le dihydrogène, puis vérifie le sodium.',
    description:
      'Le sodium file en crépitant à la surface de l’eau, libère du dihydrogène et laisse une solution basique.',
    prompt:
      'Le sodium métallique réagit avec l’eau liquide pour donner une solution d’hydroxyde de sodium et du dihydrogène.',
  },
  rxn_32: {
    name: 'Neutralisation de l’hydroxyde de calcium',
    hint: 'Traite le groupe hydroxyde comme une unité. Équilibre d’abord le chlore, puis vérifie l’hydrogène et l’oxygène.',
    description:
      'L’eau de chaux est neutralisée par l’acide chlorhydrique ; le mélange s’échauffe et l’indicateur change de couleur.',
    prompt:
      'Une solution d’hydroxyde de calcium réagit avec l’acide chlorhydrique pour donner une solution de chlorure de calcium et de l’eau.',
  },
  rxn_18: {
    name: 'Combustion de l’éthanol',
    hint: 'Équilibre d’abord le carbone, puis l’hydrogène, puis l’oxygène.',
    description:
      'L’éthanol brûle avec une flamme bleue propre et donne du dioxyde de carbone et de la vapeur d’eau.',
  },
  rxn_09: {
    name: 'Réaction aluminothermique',
    hint: 'Commence par le fer et l’aluminium.',
    description:
      'L’aluminium arrache son oxygène à l’oxyde de fer – une pluie d’étincelles, et il reste du fer liquide.',
  },
  rxn_16: {
    name: 'Procédé Ostwald (étape 1)',
    hint: 'Équilibre l’azote et l’hydrogène avant de t’occuper de l’oxygène.',
    description:
      'L’ammoniac est oxydé sur du platine chaud – la première étape de la fabrication de l’acide nitrique.',
  },
  rxn_21: {
    name: 'Le cuivre et le nitrate d’argent',
    hint: 'Équilibre les groupes nitrate comme une unité, puis vérifie l’argent.',
    description:
      'Le cuivre déplace l’argent du nitrate d’argent : des cristaux d’argent poussent sur le cuivre et la solution devient bleue.',
  },
  rxn_23: {
    name: 'Fabrication de l’eau de Javel',
    hint: 'Commence par le chlore, puis équilibre le sodium et l’hydrogène.',
    description:
      'Le dichlore est absorbé par une solution d’hydroxyde de sodium ; il se forme l’eau de Javel du placard à balais.',
  },
  rxn_14: {
    name: 'Combustion du propane',
    hint: 'Pour une combustion, équilibre d’abord le carbone, puis l’hydrogène, puis l’oxygène.',
    description:
      'Le propane brûle dans le dioxygène avec une flamme bleue très chaude et donne du dioxyde de carbone et de la vapeur d’eau.',
    prompt:
      'Le propane brûle dans le dioxygène pour former du dioxyde de carbone et de la vapeur d’eau.',
  },
  rxn_22: {
    name: 'La pluie d’or',
    hint: 'Compte chaque élément séparément – y compris les groupes nitrate, qui apparaissent plusieurs fois.',
    description:
      'De l’iodure de plomb jaune vif précipite et retombe en paillettes, comme une pluie d’or.',
  },
  rxn_33: {
    name: 'L’aluminium dans l’acide sulfurique',
    hint: 'Traite le sulfate comme une unité : trois sulfates à droite, donc trois molécules d’acide à gauche. Vérifie ensuite l’aluminium et l’hydrogène.',
    description:
      'L’aluminium se dissout lentement dans l’acide sulfurique tiède en faisant des bulles ; du dihydrogène s’échappe et le sulfate d’aluminium reste en solution.',
    prompt:
      'L’aluminium métallique réagit avec l’acide sulfurique pour donner une solution de sulfate d’aluminium et du dihydrogène.',
  },
  rxn_02: {
    name: 'Respiration cellulaire',
    hint: 'Équilibre d’abord le carbone, puis l’hydrogène, puis l’oxygène.',
    description:
      'Le glucose réagit avec le dioxygène dans les cellules ; de l’énergie est libérée et il se forme du dioxyde de carbone et de l’eau.',
  },
  rxn_03: {
    name: 'Photosynthèse',
    hint: 'Compare d’abord le carbone, puis l’hydrogène, puis l’oxygène.',
    description:
      'Grâce à la lumière, les plantes fabriquent du glucose à partir du dioxyde de carbone et de l’eau, et libèrent du dioxygène.',
  },
  rxn_10: {
    name: 'Décomposition du calcaire',
    hint: 'Commence par le calcium et le carbone.',
    description:
      'Le carbonate de calcium se décompose quand on le chauffe fortement et dégage du dioxyde de carbone.',
  },
  rxn_12: {
    name: 'Le magnésium dans l’acide sulfurique',
    hint: 'Cherche les éléments qui sont déjà bons.',
    description:
      'Le magnésium se dissout dans l’acide sulfurique pendant que des bulles de dihydrogène remontent.',
  },
  rxn_07: {
    name: 'Neutralisation de l’acide chlorhydrique',
    hint: 'Compte les éléments un par un.',
    description:
      'L’acide chlorhydrique réagit avec l’hydroxyde de sodium pour donner du chlorure de sodium et de l’eau ; le mélange s’échauffe.',
  },
  rxn_13: {
    name: 'Précipitation du chlorure d’argent',
    hint: 'Compare chaque élément des deux côtés.',
    description:
      'À l’instant où les deux solutions limpides se rencontrent, un précipité blanc de chlorure d’argent apparaît.',
  },
  rxn_11: {
    name: 'Bicarbonate et vinaigre',
    hint: 'Commence par les éléments qui n’apparaissent que dans un seul composé de chaque côté.',
    description:
      'Le bicarbonate mousse dans le vinaigre, du dioxyde de carbone s’échappe et l’éthanoate de sodium reste en solution.',
  },
  rxn_28: {
    name: 'Formation du chlorure d’ammonium',
    hint: 'Compare l’azote, l’hydrogène et le chlore.',
    description:
      'L’ammoniac et le chlorure d’hydrogène se rencontrent à l’état gazeux ; il se forme une fumée blanche de chlorure d’ammonium.',
  },
  rxn_20: {
    name: 'Décomposition de l’acide carbonique',
    hint: 'Compare l’hydrogène, le carbone et l’oxygène.',
    description:
      'L’acide carbonique se décompose en eau et en dioxyde de carbone – c’est pour cela qu’une boisson gazeuse s’évente.',
  },
  rxn_27: {
    name: 'Combustion de l’octane',
    hint: 'Équilibre d’abord le carbone, puis l’hydrogène, et l’oxygène en dernier.',
    description:
      'L’octane brûle dans le dioxygène et donne du dioxyde de carbone et de la vapeur d’eau – la réaction d’un moteur à essence.',
  },
};

/**
 * Lewis molecule prose, keyed by the id in lewis-molecules.ts. `bondLine` and
 * `formula` stay untranslated: they are notation.
 *
 * « Solitaire » is the French for the game's coined "loner"; it is introduced
 * in the instructions and defined in the glossary, exactly as the English is.
 * « Doublet non liant » and « doublet liant » are the glossary's lone/bonding
 * pair, and the names follow French IUPAC — **éthène** and **éthyne** rather
 * than the older ethylene/acetylene, **phosphine**, **tétrachlorométhane**.
 */
export const LEWIS_MOLECULE_TEXT_FR: Record<
  string,
  { name: string; tier2Hint: string; propertyLine: string }
> = {
  h2: {
    name: 'Dihydrogène',
    tier2Hint:
      'Chaque hydrogène a un solitaire. Deux solitaires venant de deux atomes forment un doublet liant.',
    propertyLine:
      'Le dihydrogène – le gaz le plus léger qui existe. Les deux atomes partagent un doublet et sont donc complets à 2 tous les deux.',
  },
  cl2: {
    name: 'Dichlore',
    tier2Hint:
      'Le chlore a 7 électrons externes : trois doublets et un solitaire. Chaque chlore partage ce seul solitaire.',
    propertyLine:
      'Le dichlore – un gaz jaune-vert. Chaque chlore garde trois doublets non liants et en partage un.',
  },
  hcl: {
    name: 'Chlorure d’hydrogène',
    tier2Hint:
      'L’hydrogène a un solitaire et le chlore a un solitaire : ils partagent donc exactement un doublet.',
    propertyLine:
      'Le chlorure d’hydrogène – un gaz qui se dissout dans l’eau ; la solution s’appelle l’acide chlorhydrique.',
  },
  h2o: {
    name: 'Eau',
    tier2Hint:
      'L’oxygène a deux solitaires et partage donc avec les deux atomes d’hydrogène. Ses deux doublets restent en place.',
    propertyLine:
      'L’eau – liquide à température ambiante ; la forme coudée que tu verras l’an prochain vient des deux doublets non liants.',
  },
  nh3: {
    name: 'Ammoniac',
    tier2Hint:
      'L’azote a trois solitaires et un doublet : il partage donc avec les trois atomes d’hydrogène.',
    propertyLine:
      'L’ammoniac – un gaz à l’odeur piquante dont on fait des engrais. L’azote garde un doublet non liant.',
  },
  ch4: {
    name: 'Méthane',
    tier2Hint:
      'Le carbone a quatre solitaires et partage donc avec les quatre atomes d’hydrogène.',
    propertyLine:
      'Le méthane – le gaz naturel. Le carbone n’a aucun doublet non liant : chaque électron externe est partagé.',
  },
  h2s: {
    name: 'Sulfure d’hydrogène',
    tier2Hint:
      'Le soufre est dans la même colonne que l’oxygène : il a donc lui aussi deux solitaires et deux doublets – construis-le comme l’eau.',
    propertyLine:
      'Le sulfure d’hydrogène – le gaz qui sent l’œuf pourri. Même structure que l’eau, parce que le soufre est juste sous l’oxygène.',
  },
  ph3: {
    name: 'Phosphine',
    tier2Hint:
      'Le phosphore est dans la même colonne que l’azote : il a donc trois solitaires – construis-le comme l’ammoniac.',
    propertyLine:
      'La phosphine – un gaz qui luit faiblement à l’air. Même structure que l’ammoniac, parce que le phosphore est juste sous l’azote.',
  },
  o2: {
    name: 'Dioxygène',
    tier2Hint:
      'Chaque oxygène a deux solitaires. Après le premier doublet partagé, il en reste un à chacun – partage encore, cela donne une liaison double.',
    propertyLine:
      'Le dioxygène – le gaz que nous respirons. Deux doublets partagés entre les atomes font une liaison double.',
  },
  co2: {
    name: 'Dioxyde de carbone',
    tier2Hint:
      'Le carbone a quatre solitaires et chaque oxygène en a deux : le carbone partage donc deux fois avec chaque oxygène.',
    propertyLine:
      'Le dioxyde de carbone – le gaz des combustions et de l’expiration. Deux liaisons doubles, et aucun doublet non liant sur le carbone.',
  },
  n2: {
    name: 'Diazote',
    tier2Hint:
      'Chaque azote a trois solitaires. Partage les trois entre les deux mêmes atomes – cela donne une liaison triple.',
    propertyLine:
      'Le diazote – l’essentiel de l’air. La liaison triple est si solide que le diazote ne réagit presque pas.',
  },
  c2h4: {
    name: 'Éthène',
    tier2Hint:
      'Chaque carbone partage avec deux atomes d’hydrogène ; il reste ensuite deux solitaires à chaque carbone – partage deux fois entre eux.',
    propertyLine:
      'L’éthène – le gaz qui fait mûrir les fruits et dont on fait le polyéthylène. C’est la liaison double entre les carbones qui réagit.',
  },
  c2h2: {
    name: 'Éthyne',
    tier2Hint:
      'Chaque carbone partage un doublet avec un hydrogène ; les trois solitaires qui restent à chaque carbone donnent une liaison triple.',
    propertyLine:
      'L’éthyne (acétylène) – le gaz du chalumeau. Une liaison triple relie les deux carbones.',
  },
  c2h6: {
    name: 'Éthane',
    tier2Hint:
      'Les deux carbones partagent un doublet entre eux ; ensuite chaque carbone partage ses trois solitaires restants avec trois atomes d’hydrogène.',
    propertyLine:
      'L’éthane – présent dans le gaz naturel. Toutes les liaisons sont simples et aucun atome n’a de doublet non liant.',
  },
  ccl4: {
    name: 'Tétrachlorométhane',
    tier2Hint:
      'Le carbone a le plus de solitaires (quatre) : il se place donc au milieu et partage un doublet avec chaque chlore.',
    propertyLine:
      'Le tétrachlorométhane – autrefois un solvant de nettoyage à sec. Chaque chlore garde trois doublets non liants.',
  },
  ch3cl: {
    name: 'Chlorométhane',
    tier2Hint:
      'Le carbone a quatre solitaires et se place donc au milieu : il partage trois doublets avec des atomes d’hydrogène et un avec le chlore.',
    propertyLine:
      'Le chlorométhane – du méthane dont un hydrogène a été remplacé par un chlore. Le chlore garde trois doublets non liants.',
  },
  h2o2: {
    name: 'Peroxyde d’hydrogène',
    tier2Hint:
      'L’hydrogène ne peut partager qu’une fois : les deux oxygènes doivent donc partager entre eux, puis prendre chacun un hydrogène.',
    propertyLine:
      'Le peroxyde d’hydrogène – l’oxydant des colorations pour cheveux. La liaison simple entre les deux oxygènes se rompt facilement.',
  },
  c2h5oh: {
    name: 'Éthanol',
    tier2Hint:
      'Enchaîne d’abord les deux carbones et l’oxygène (C-C-O), puis donne ses atomes d’hydrogène à chaque carbone et un à l’oxygène.',
    propertyLine:
      'L’éthanol – l’alcool des boissons et du gel hydroalcoolique. S’il se mélange à l’eau, c’est grâce au bout O-H.',
  },
};
