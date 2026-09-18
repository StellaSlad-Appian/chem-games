// src/i18n/chemistry-names/es.ts
//
// Spanish names for the chemistry registries.
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
// What Spanish does, all of it fixed in docs/i18n/glossary-es.md:
//
//   * Compounds compose **anion first, then `de` + cation**, as in French:
//     *hidróxido de sodio*, not German's single word *Natriumhydroxid* and not
//     English's cation-first *sodium hydroxide*.
//   * Binary acids take *-hídrico* (HCl *ácido clorhídrico*), and the -ous/-ic
//     pair becomes *-oso*/*-ico* (*ácido nitroso* / *ácido nítrico*).
//   * Ions use the systematic *hidrogeno-* prefix where the English data still
//     says *bi-*: bicarbonate is *hidrogenocarbonato*.
//   * The **di-** forms are used for the diatomic elemental substances
//     (*dihidrógeno*, *dioxígeno*, *dinitrógeno*, *dicloro*). They are correct
//     IUPAC Spanish and they keep the distinction the Reaction Balancer relies
//     on — a card names a *substance*, the atom ledger counts *atoms*. But
//     Spanish textbooks are less consistent about this than French ones, which
//     teach *dihydrogène* explicitly. **Rated medium and flagged for a teacher**
//     in es-review.md; if the audience's textbook writes plain *hidrógeno* for
//     H2, the change is contained to SPECIES_NAMES_ES and LEWIS_MOLECULE_TEXT_ES.
//
// Two things Spanish does NOT need, stated because their absence is a decision:
// **nitrogen is *nitrógeno***, so the trap that catches French (*azote*) does
// not exist; and **Na and K really are translated** — *sodio*, *potasio* — so
// unlike French this locale needs no `SAME_AS_ENGLISH` exemption in
// chemistry-names.test.ts.

/**
 * All 118 elements, keyed by symbol. Verified one at a time rather than
 * pattern-matched from the English, because Spanish differs in ways a
 * transliteration would miss — Iron/**hierro**, Silver/**plata**,
 * Tin/**estaño**, Lead/**plomo**, Sulfur/**azufre**, Tungsten/**wolframio**.
 *
 * Spellings follow Spanish (RAE / RSEQ) usage: **cinc** (not zinc), **yodo**
 * (not iodo), **wolframio** (not tungsteno), **circonio**, **cesio**,
 * **bismuto**, **silicio**, **teluro**, **criptón**, **oganesón**.
 */
export const ELEMENT_NAMES_ES: Record<string, string> = {
  H: 'Hidrógeno',
  He: 'Helio',
  Li: 'Litio',
  Be: 'Berilio',
  B: 'Boro',
  C: 'Carbono',
  N: 'Nitrógeno',
  O: 'Oxígeno',
  F: 'Flúor',
  Ne: 'Neón',
  Na: 'Sodio',
  Mg: 'Magnesio',
  Al: 'Aluminio',
  Si: 'Silicio',
  P: 'Fósforo',
  S: 'Azufre',
  Cl: 'Cloro',
  Ar: 'Argón',
  K: 'Potasio',
  Ca: 'Calcio',
  Sc: 'Escandio',
  Ti: 'Titanio',
  V: 'Vanadio',
  Cr: 'Cromo',
  Mn: 'Manganeso',
  Fe: 'Hierro',
  Co: 'Cobalto',
  Ni: 'Níquel',
  Cu: 'Cobre',
  Zn: 'Cinc',
  Ga: 'Galio',
  Ge: 'Germanio',
  As: 'Arsénico',
  Se: 'Selenio',
  Br: 'Bromo',
  Kr: 'Criptón',
  Rb: 'Rubidio',
  Sr: 'Estroncio',
  Y: 'Itrio',
  Zr: 'Circonio',
  Nb: 'Niobio',
  Mo: 'Molibdeno',
  Tc: 'Tecnecio',
  Ru: 'Rutenio',
  Rh: 'Rodio',
  Pd: 'Paladio',
  Ag: 'Plata',
  Cd: 'Cadmio',
  In: 'Indio',
  Sn: 'Estaño',
  Sb: 'Antimonio',
  Te: 'Teluro',
  I: 'Yodo',
  Xe: 'Xenón',
  Cs: 'Cesio',
  Ba: 'Bario',
  La: 'Lantano',
  Ce: 'Cerio',
  Pr: 'Praseodimio',
  Nd: 'Neodimio',
  Pm: 'Prometio',
  Sm: 'Samario',
  Eu: 'Europio',
  Gd: 'Gadolinio',
  Tb: 'Terbio',
  Dy: 'Disprosio',
  Ho: 'Holmio',
  Er: 'Erbio',
  Tm: 'Tulio',
  Yb: 'Iterbio',
  Lu: 'Lutecio',
  Hf: 'Hafnio',
  Ta: 'Tántalo',
  W: 'Wolframio',
  Re: 'Renio',
  Os: 'Osmio',
  Ir: 'Iridio',
  Pt: 'Platino',
  Au: 'Oro',
  Hg: 'Mercurio',
  Tl: 'Talio',
  Pb: 'Plomo',
  Bi: 'Bismuto',
  Po: 'Polonio',
  At: 'Astato',
  Rn: 'Radón',
  Fr: 'Francio',
  Ra: 'Radio',
  Ac: 'Actinio',
  Th: 'Torio',
  Pa: 'Protactinio',
  U: 'Uranio',
  Np: 'Neptunio',
  Pu: 'Plutonio',
  Am: 'Americio',
  Cm: 'Curio',
  Bk: 'Berkelio',
  Cf: 'Californio',
  Es: 'Einstenio',
  Fm: 'Fermio',
  Md: 'Mendelevio',
  No: 'Nobelio',
  Lr: 'Laurencio',
  Rf: 'Rutherfordio',
  Db: 'Dubnio',
  Sg: 'Seaborgio',
  Bh: 'Bohrio',
  Hs: 'Hasio',
  Mt: 'Meitnerio',
  Ds: 'Darmstadtio',
  Rg: 'Roentgenio',
  Cn: 'Copernicio',
  Nh: 'Nihonio',
  Fl: 'Flerovio',
  Mc: 'Moscovio',
  Lv: 'Livermorio',
  Ts: 'Teneso',
  Og: 'Oganesón',
};

/**
 * Compound names, keyed by the registry id.
 *
 * Spanish composes them anion-first with `de`: *hidróxido de sodio*, *cloruro
 * de calcio*. Binary acids take *-hídrico* (HCl ácido clorhídrico, HF ácido
 * fluorhídrico, HBr ácido bromhídrico, HI ácido yodhídrico — note **yod-**, not
 * *iod-*); the -ous/-ic pair becomes -oso/-ico (HNO2 ácido nitroso vs HNO3
 * ácido nítrico, H2SO3 ácido sulfuroso vs H2SO4 ácido sulfúrico).
 *
 * All 35 differ from the English, so unlike French this locale needs no
 * `IDENTICAL_COMPOUNDS_BY_DESIGN` entry: N2H4 is *hidracina* in Spanish where
 * it is *hydrazine* in both English and French.
 */
export const COMPOUND_NAMES_ES: Record<string, string> = {
  '1': 'Ácido clorhídrico',
  '2': 'Ácido sulfúrico',
  '3': 'Ácido nítrico',
  '4': 'Hidróxido de sodio',
  '5': 'Hidróxido de potasio',
  '6': 'Cloruro de sodio',
  '7': 'Cloruro de potasio',
  '8': 'Ácido fluorhídrico',
  '9': 'Ácido carbónico',
  '10': 'Ácido fosfórico',
  '11': 'Amoniaco',
  '12': 'Cloruro de calcio',
  '13': 'Cloruro de magnesio',
  '14': 'Sulfato de sodio',
  '15': 'Agua',
  '16': 'Hidrogenocarbonato de sodio',
  '17': 'Hidrogenocarbonato de potasio',
  '18': 'Ácido nitroso',
  '19': 'Hidróxido de bario',
  '20': 'Nitrato de potasio',
  '21': 'Cloruro de litio',
  '22': 'Ácido sulfuroso',
  '23': 'Hidracina',
  '24': 'Hidróxido de litio',
  '25': 'Ácido bromhídrico',
  '26': 'Nitrato de sodio',
  '27': 'Dihidrogenofosfato de sodio',
  '28': 'Hidrogenofosfato de disodio',
  '29': 'Ácido perclórico',
  '30': 'Ácido yodhídrico',
  '31': 'Hidróxido de cesio',
  '32': 'Ácido bórico',
  '33': 'Ácido silícico',
  '34': 'Hidrogenosulfuro de sodio',
  '35': 'Hidrogenosulfato de sodio',
};

/**
 * Ion names, keyed by the registry id (monoatomic and polyatomic ids do not
 * overlap, so one map covers both).
 *
 * Spanish uses the systematic *hidrogeno-* prefix where the English data still
 * uses the older *bi-*: bicarbonate is hidrogenocarbonato, bisulfate is
 * hidrogenosulfato, bisulfite is hidrogenosulfito. A monoatomic cation is
 * *ion* + the element (*ion sodio*), which is why those read as two words where
 * the anions are one. *Ion* is written without an accent, per current RAE
 * practice; *catión* and *anión* keep theirs because they are stressed on the
 * last syllable.
 */
export const ION_NAMES_ES: Record<string, string> = {
  '1': 'Ion hidrógeno',
  '2': 'Cloruro',
  '3': 'Sulfato',
  '4': 'Nitrato',
  '5': 'Ion sodio',
  '6': 'Hidróxido',
  '7': 'Ion potasio',
  '8': 'Fluoruro',
  '9': 'Hidrogenocarbonato',
  '10': 'Dihidrogenofosfato',
  '11': 'Ion calcio',
  '12': 'Ion magnesio',
  '13': 'Nitrito',
  '14': 'Ion bario',
  '15': 'Ion litio',
  '16': 'Hidrogenosulfito',
  '17': 'Bromuro',
  '18': 'Hidrogenofosfato',
  '19': 'Perclorato',
  '20': 'Yoduro',
  '21': 'Ion cesio',
  '22': 'Dihidrogenoborato',
  '23': 'Trihidrogenosilicato',
  '24': 'Hidrogenosulfuro',
  '25': 'Hidrogenosulfato',
  '26': 'Amonio',
  '27': 'Carbonato',
  '28': 'Sulfito',
  '29': 'Fosfato',
  '30': 'Etanoato (acetato)',
  '31': 'Cianuro',
  '32': 'Hipoclorito',
  '33': 'Clorito',
  '34': 'Clorato',
  '35': 'Permanganato',
  '36': 'Cromato',
  '37': 'Dicromato',
  '38': 'Tiosulfato',
  '39': 'Peróxido',
  '40': 'Oxalato',
};

/**
 * Everyday species names for Reaction Balancer, keyed by bare formula exactly
 * as `SPECIES_NAMES` in src/core-engine/data/reactions.ts is.
 *
 * The *di-* forms live here: H2 is **dihidrógeno**, O2 **dioxígeno**, N2
 * **dinitrógeno**, Cl2 **dicloro**. The bare element names (hidrógeno,
 * oxígeno) are in ELEMENT_NAMES_ES and are what the atom ledger shows — which
 * is correct, because the ledger counts *atoms* and a card names a *substance*.
 *
 * Note HCl: the substance is **cloruro de hidrógeno**, and that is what a
 * compound card shows. Spanish calls its aqueous solution **ácido
 * clorhídrico**, so the reaction descriptions below say that where the reaction
 * is happening in water — the same distinction German draws with
 * Chlorwasserstoff / Salzsäure and English loses.
 */
export const SPECIES_NAMES_ES: Record<string, string> = {
  H2: 'Dihidrógeno',
  O2: 'Dioxígeno',
  H2O: 'Agua',
  Cl2: 'Dicloro',
  HCl: 'Cloruro de hidrógeno',
  CaCO3: 'Carbonato de calcio',
  CaO: 'Óxido de calcio',
  CO2: 'Dióxido de carbono',
  O3: 'Ozono',
  Mg: 'Magnesio',
  MgO: 'Óxido de magnesio',
  N2: 'Dinitrógeno',
  NH3: 'Amoniaco',
  H2O2: 'Peróxido de hidrógeno',
  Fe: 'Hierro',
  Fe2O3: 'Óxido de hierro(III)',
  CH4: 'Metano',
  H2SO4: 'Ácido sulfúrico',
  MgSO4: 'Sulfato de magnesio',
  Na: 'Sodio',
  NaOH: 'Hidróxido de sodio',
  C2H5OH: 'Etanol',
  SO2: 'Dióxido de azufre',
  SO3: 'Trióxido de azufre',
  NaCl: 'Cloruro de sodio',
  AgNO3: 'Nitrato de plata',
  AgCl: 'Cloruro de plata',
  NaNO3: 'Nitrato de sodio',
  C3H8: 'Propano',
  NaHCO3: 'Hidrogenocarbonato de sodio',
  CH3COOH: 'Ácido etanoico',
  CH3COONa: 'Etanoato de sodio',
  Cu: 'Cobre',
  'Cu(NO3)2': 'Nitrato de cobre(II)',
  Ag: 'Plata',
  'Pb(NO3)2': 'Nitrato de plomo(II)',
  KI: 'Yoduro de potasio',
  PbI2: 'Yoduro de plomo(II)',
  KNO3: 'Nitrato de potasio',
  C8H18: 'Octano',
  NO: 'Monóxido de nitrógeno',
  NaClO: 'Hipoclorito de sodio',
  Al: 'Aluminio',
  AlCl3: 'Cloruro de aluminio',
  Al2O3: 'Óxido de aluminio',
  'Al2(SO4)3': 'Sulfato de aluminio',
  'Ca(OH)2': 'Hidróxido de calcio',
  CaCl2: 'Cloruro de calcio',
  NH4Cl: 'Cloruro de amonio',
  C: 'Carbono',
  CO: 'Monóxido de carbono',
  C6H12O6: 'Glucosa',
  H2CO3: 'Ácido carbónico',
};

/**
 * Reaction prose, keyed by the id in reactions.ts. Equations, state symbols and
 * level assignments are not here: they are notation and rules, not copy.
 *
 * `hint` is the tier-2 strategy hint; `prompt` is the word equation a Reto
 * round shows. A reaction with no English prompt must not gain a Spanish one,
 * so only the reactions that have one are listed with one.
 *
 * The prompts deliberately use the verbs the catalogue's tier-2 build hint
 * names — «reacciona», «arde», «se descompone» on the left, «para formar»,
 * «produce», «da» on the right — so that hint is actually usable.
 */
export const REACTION_TEXT_ES: Record<
  string,
  { name: string; description: string; hint?: string; prompt?: string }
> = {
  rxn_01: {
    name: 'Síntesis del agua',
    hint: 'El hidrógeno ya está bien. Ajusta el oxígeno añadiendo agua y luego vuelve a revisar el hidrógeno.',
    description:
      'El dihidrógeno arde en dioxígeno con una llama azul pálido y una pequeña detonación; se forma agua.',
    prompt: 'El dihidrógeno arde en dioxígeno para formar agua líquida.',
  },
  rxn_25: {
    name: 'Síntesis del cloruro de hidrógeno',
    hint: 'Cuenta los átomos de hidrógeno y de cloro. A la izquierda los dos van de dos en dos.',
    description:
      'El dihidrógeno y el dicloro se combinan en cloruro de hidrógeno, un gas de olor picante.',
    prompt: 'El dihidrógeno reacciona con el dicloro para formar cloruro de hidrógeno gaseoso.',
  },
  rxn_31: {
    name: 'Síntesis del cloruro de sodio',
    hint: 'A la izquierda el cloro va de dos en dos. Haz dos cloruros de sodio y luego revisa el sodio.',
    description:
      'El sodio arde en dicloro con una llama amarilla intensa; queda cloruro de sodio blanco, la sal de mesa.',
    prompt: 'El sodio metálico arde en dicloro para dar cloruro de sodio sólido.',
  },
  rxn_29: {
    name: 'Combustión del magnesio',
    hint: 'El magnesio ya está ajustado. Mira el oxígeno.',
    description:
      'El magnesio arde en dioxígeno con una llama blanca cegadora; queda un polvo blanco.',
    prompt: 'El magnesio metálico arde en dioxígeno para dar óxido de magnesio sólido.',
  },
  rxn_30: {
    name: 'Combustión incompleta del carbono',
    hint: 'Empieza por el carbono y pasa luego al oxígeno.',
    description:
      'Cuando falta dioxígeno, el carbono arde y da monóxido de carbono, un gas incoloro y tóxico.',
    prompt:
      'El carbono sólido arde en poco dioxígeno para dar monóxido de carbono gaseoso.',
  },
  rxn_24: {
    name: 'Síntesis del cloruro de aluminio',
    hint: 'Ajusta primero el aluminio y luego el cloro.',
    description:
      'El aluminio se pone al rojo cuando reacciona directamente con el dicloro y da cloruro de aluminio blanco.',
    prompt: 'El aluminio metálico reacciona con el dicloro para formar cloruro de aluminio sólido.',
  },
  rxn_19: {
    name: 'Formación del ozono',
    hint: 'Solo hay que ajustar el oxígeno. Busca el número más pequeño divisible entre 2 y entre 3.',
    description:
      'El dioxígeno se transforma en ozono, el gas de olor picante que se nota después de una tormenta.',
  },
  rxn_05: {
    name: 'Proceso Haber-Bosch',
    hint: 'Ajusta primero el nitrógeno y luego el hidrógeno.',
    description:
      'El dinitrógeno y el dihidrógeno se combinan a alta presión para dar amoniaco gaseoso.',
    prompt: 'El dinitrógeno y el dihidrógeno se combinan para formar amoniaco gaseoso.',
  },
  rxn_26: {
    name: 'Electrólisis del agua',
    hint: 'Ajusta primero el oxígeno añadiendo agua y corrige luego el hidrógeno.',
    description:
      'Una corriente eléctrica descompone el agua; suben burbujas de dihidrógeno y de dioxígeno por los electrodos.',
    prompt: 'Una corriente eléctrica descompone el agua líquida para dar dihidrógeno y dioxígeno.',
  },
  rxn_06: {
    name: 'Descomposición del peróxido de hidrógeno',
    hint: 'El hidrógeno ya está ajustado. Céntrate en el oxígeno.',
    description:
      'El peróxido de hidrógeno se descompone en agua y dioxígeno; la disolución hace espuma mientras se escapa el gas.',
  },
  rxn_08: {
    name: 'Oxidación del hierro',
    hint: 'Ajusta primero el hierro y luego el oxígeno.',
    description:
      'El hierro reacciona despacio con el dioxígeno y da óxido de hierro(III): las escamas de color pardo anaranjado que llamamos herrumbre.',
  },
  rxn_04: {
    name: 'Combustión del metano',
    hint: 'En una combustión, empieza por el carbono, sigue por el hidrógeno y deja el oxígeno para el final.',
    description:
      'El metano arde en dioxígeno con una llama azul y da dióxido de carbono y vapor de agua.',
    prompt: 'El metano arde en dioxígeno para formar dióxido de carbono y vapor de agua.',
  },
  rxn_15: {
    name: 'Proceso de contacto (etapa 2)',
    hint: 'El azufre ya está ajustado. Mira el oxígeno.',
    description:
      'El dióxido de azufre se oxida a trióxido de azufre sobre un catalizador, una etapa intermedia hacia el ácido sulfúrico.',
  },
  rxn_17: {
    name: 'El sodio en el agua',
    hint: 'Ajusta primero el hidrógeno entre el agua y el dihidrógeno, y comprueba luego el sodio.',
    description:
      'El sodio corretea chisporroteando por la superficie del agua, desprende dihidrógeno y deja una disolución básica.',
    prompt:
      'El sodio metálico reacciona con el agua líquida para dar una disolución de hidróxido de sodio y dihidrógeno.',
  },
  rxn_32: {
    name: 'Neutralización del hidróxido de calcio',
    hint: 'Trata el grupo hidróxido como una unidad. Ajusta primero el cloro y comprueba luego el hidrógeno y el oxígeno.',
    description:
      'El agua de cal se neutraliza con ácido clorhídrico; la mezcla se calienta y el indicador cambia de color.',
    prompt:
      'Una disolución de hidróxido de calcio reacciona con ácido clorhídrico para dar una disolución de cloruro de calcio y agua.',
  },
  rxn_18: {
    name: 'Combustión del etanol',
    hint: 'Ajusta primero el carbono, luego el hidrógeno y después el oxígeno.',
    description:
      'El etanol arde con una llama azul y limpia y da dióxido de carbono y vapor de agua.',
  },
  rxn_09: {
    name: 'Reacción aluminotérmica',
    hint: 'Empieza por el hierro y el aluminio.',
    description:
      'El aluminio le arranca el oxígeno al óxido de hierro: una lluvia de chispas, y queda hierro líquido.',
  },
  rxn_16: {
    name: 'Proceso Ostwald (etapa 1)',
    hint: 'Ajusta el nitrógeno y el hidrógeno antes de ocuparte del oxígeno.',
    description:
      'El amoniaco se oxida sobre platino caliente: la primera etapa de la fabricación del ácido nítrico.',
  },
  rxn_21: {
    name: 'El cobre y el nitrato de plata',
    hint: 'Ajusta los grupos nitrato como una unidad y comprueba luego la plata.',
    description:
      'El cobre desplaza a la plata del nitrato de plata: crecen cristales de plata sobre el cobre y la disolución se vuelve azul.',
  },
  rxn_23: {
    name: 'Fabricación de la lejía',
    hint: 'Empieza por el cloro y ajusta después el sodio y el hidrógeno.',
    description:
      'El dicloro se absorbe en una disolución de hidróxido de sodio; se forma la lejía del armario de la limpieza.',
  },
  rxn_14: {
    name: 'Combustión del propano',
    hint: 'En una combustión, ajusta primero el carbono, luego el hidrógeno y después el oxígeno.',
    description:
      'El propano arde en dioxígeno con una llama azul muy caliente y da dióxido de carbono y vapor de agua.',
    prompt: 'El propano arde en dioxígeno para formar dióxido de carbono y vapor de agua.',
  },
  rxn_22: {
    name: 'La lluvia de oro',
    hint: 'Cuenta cada elemento por separado, incluidos los grupos nitrato, que aparecen varias veces.',
    description:
      'Precipita yoduro de plomo de un amarillo intenso, que cae en escamas brillantes como una lluvia de oro.',
  },
  rxn_33: {
    name: 'El aluminio en el ácido sulfúrico',
    hint: 'Trata el sulfato como una unidad: tres sulfatos a la derecha, así que tres moléculas de ácido a la izquierda. Comprueba luego el aluminio y el hidrógeno.',
    description:
      'El aluminio se disuelve despacio en ácido sulfúrico templado haciendo burbujas; se escapa dihidrógeno y el sulfato de aluminio queda en disolución.',
    prompt:
      'El aluminio metálico reacciona con ácido sulfúrico para dar una disolución de sulfato de aluminio y dihidrógeno.',
  },
  rxn_02: {
    name: 'Respiración celular',
    hint: 'Ajusta primero el carbono, luego el hidrógeno y después el oxígeno.',
    description:
      'La glucosa reacciona con el dioxígeno dentro de las células; se libera energía y se forman dióxido de carbono y agua.',
  },
  rxn_03: {
    name: 'Fotosíntesis',
    hint: 'Compara primero el carbono, luego el hidrógeno y después el oxígeno.',
    description:
      'Con la luz, las plantas fabrican glucosa a partir de dióxido de carbono y agua, y liberan dioxígeno.',
  },
  rxn_10: {
    name: 'Descomposición de la caliza',
    hint: 'Empieza por el calcio y el carbono.',
    description:
      'El carbonato de calcio se descompone al calentarlo mucho y desprende dióxido de carbono.',
  },
  rxn_12: {
    name: 'El magnesio en el ácido sulfúrico',
    hint: 'Busca los elementos que ya estén bien.',
    description:
      'El magnesio se disuelve en ácido sulfúrico mientras suben burbujas de dihidrógeno.',
  },
  rxn_07: {
    name: 'Neutralización del ácido clorhídrico',
    hint: 'Cuenta los elementos uno por uno.',
    description:
      'El ácido clorhídrico reacciona con el hidróxido de sodio y da cloruro de sodio y agua; la mezcla se calienta.',
  },
  rxn_13: {
    name: 'Precipitación del cloruro de plata',
    hint: 'Compara cada elemento a los dos lados.',
    description:
      'En cuanto se juntan las dos disoluciones transparentes aparece un precipitado blanco de cloruro de plata.',
  },
  rxn_11: {
    name: 'Bicarbonato y vinagre',
    hint: 'Empieza por los elementos que solo aparecen en un compuesto de cada lado.',
    description:
      'El bicarbonato hace espuma en el vinagre, se escapa dióxido de carbono y el etanoato de sodio queda en disolución.',
  },
  rxn_28: {
    name: 'Formación del cloruro de amonio',
    hint: 'Compara el nitrógeno, el hidrógeno y el cloro.',
    description:
      'El amoniaco y el cloruro de hidrógeno se encuentran en estado gaseoso; se forma un humo blanco de cloruro de amonio.',
  },
  rxn_20: {
    name: 'Descomposición del ácido carbónico',
    hint: 'Compara el hidrógeno, el carbono y el oxígeno.',
    description:
      'El ácido carbónico se descompone en agua y dióxido de carbono: por eso un refresco pierde el gas.',
  },
  rxn_27: {
    name: 'Combustión del octano',
    hint: 'Ajusta primero el carbono, luego el hidrógeno y deja el oxígeno para el final.',
    description:
      'El octano arde en dioxígeno y da dióxido de carbono y vapor de agua: la reacción de un motor de gasolina.',
  },
};

/**
 * Lewis molecule prose, keyed by the id in lewis-molecules.ts. `bondLine` and
 * `formula` stay untranslated: they are notation.
 *
 * «Impar» is the Spanish for the game's coined "loner"; it is introduced in the
 * instructions and defined in the glossary, exactly as the English is, and it
 * is deliberately **not** *solitario*, which Spanish already uses for a lone
 * pair (*par solitario*). Names follow Spanish IUPAC — **eteno** and **etino**
 * rather than the older ethylene/acetylene, **fosfina**,
 * **tetraclorometano**, **sulfuro de hidrógeno**.
 */
export const LEWIS_MOLECULE_TEXT_ES: Record<
  string,
  { name: string; tier2Hint: string; propertyLine: string }
> = {
  h2: {
    name: 'Dihidrógeno',
    tier2Hint:
      'Cada hidrógeno tiene un impar. Dos impares de dos átomos forman un par enlazante.',
    propertyLine:
      'El dihidrógeno, el gas más ligero que existe. Los dos átomos comparten un par, así que los dos quedan completos con 2.',
  },
  cl2: {
    name: 'Dicloro',
    tier2Hint:
      'El cloro tiene 7 electrones externos: tres pares y un impar. Cada cloro comparte ese único impar.',
    propertyLine:
      'El dicloro, un gas de color verde amarillento. Cada cloro se queda con tres pares solitarios y comparte uno.',
  },
  hcl: {
    name: 'Cloruro de hidrógeno',
    tier2Hint:
      'El hidrógeno tiene un impar y el cloro tiene un impar, así que comparten exactamente un par.',
    propertyLine:
      'El cloruro de hidrógeno, un gas que se disuelve en agua; a esa disolución la llamamos ácido clorhídrico.',
  },
  h2o: {
    name: 'Agua',
    tier2Hint:
      'El oxígeno tiene dos impares, así que comparte con los dos átomos de hidrógeno. Sus otros dos pares se quedan quietos.',
    propertyLine:
      'El agua, líquida a temperatura ambiente; la forma angular que verás el curso que viene viene de los dos pares solitarios.',
  },
  nh3: {
    name: 'Amoniaco',
    tier2Hint:
      'El nitrógeno tiene tres impares y un par, así que comparte con los tres átomos de hidrógeno.',
    propertyLine:
      'El amoniaco, un gas de olor picante con el que se fabrican abonos. El nitrógeno conserva un par solitario.',
  },
  ch4: {
    name: 'Metano',
    tier2Hint:
      'El carbono tiene cuatro impares, así que comparte con los cuatro átomos de hidrógeno.',
    propertyLine:
      'El metano, el gas natural. El carbono no tiene ningún par solitario: comparte todos sus electrones externos.',
  },
  h2s: {
    name: 'Sulfuro de hidrógeno',
    tier2Hint:
      'El azufre está en la misma columna que el oxígeno, así que también tiene dos impares y dos pares: constrúyelo como el agua.',
    propertyLine:
      'El sulfuro de hidrógeno, el gas que huele a huevo podrido. Tiene la misma estructura que el agua, porque el azufre está justo debajo del oxígeno.',
  },
  ph3: {
    name: 'Fosfina',
    tier2Hint:
      'El fósforo está en la misma columna que el nitrógeno, así que tiene tres impares: constrúyelo como el amoniaco.',
    propertyLine:
      'La fosfina, un gas que brilla débilmente en el aire. Tiene la misma estructura que el amoniaco, porque el fósforo está justo debajo del nitrógeno.',
  },
  o2: {
    name: 'Dioxígeno',
    tier2Hint:
      'Cada oxígeno tiene dos impares. Después del primer par compartido le queda uno a cada uno: comparte otra vez y sale un enlace doble.',
    propertyLine:
      'El dioxígeno, el gas que respiramos. Dos pares compartidos entre los átomos hacen un enlace doble.',
  },
  co2: {
    name: 'Dióxido de carbono',
    tier2Hint:
      'El carbono tiene cuatro impares y cada oxígeno tiene dos, así que el carbono comparte dos veces con cada oxígeno.',
    propertyLine:
      'El dióxido de carbono, el gas de las combustiones y de lo que exhalamos. Dos enlaces dobles, y ningún par solitario sobre el carbono.',
  },
  n2: {
    name: 'Dinitrógeno',
    tier2Hint:
      'Cada nitrógeno tiene tres impares. Compártelos los tres entre los dos mismos átomos: sale un enlace triple.',
    propertyLine:
      'El dinitrógeno, la mayor parte del aire. El enlace triple es tan fuerte que el dinitrógeno casi no reacciona.',
  },
  c2h4: {
    name: 'Eteno',
    tier2Hint:
      'Cada carbono comparte con dos átomos de hidrógeno; después le quedan dos impares a cada carbono: compártelos dos veces entre ellos.',
    propertyLine:
      'El eteno, el gas que hace madurar la fruta y con el que se fabrica el polietileno. Lo que reacciona es el enlace doble entre los carbonos.',
  },
  c2h2: {
    name: 'Etino',
    tier2Hint:
      'Cada carbono comparte un par con un hidrógeno; los tres impares que le quedan a cada carbono dan un enlace triple.',
    propertyLine:
      'El etino (acetileno), el gas del soplete. Un enlace triple une los dos carbonos.',
  },
  c2h6: {
    name: 'Etano',
    tier2Hint:
      'Los dos carbonos comparten un par entre ellos; después cada carbono comparte sus tres impares restantes con tres átomos de hidrógeno.',
    propertyLine:
      'El etano, presente en el gas natural. Todos los enlaces son simples y ningún átomo tiene pares solitarios.',
  },
  ccl4: {
    name: 'Tetraclorometano',
    tier2Hint:
      'El carbono es el que más impares tiene (cuatro), así que va en el centro y comparte un par con cada cloro.',
    propertyLine:
      'El tetraclorometano, que antes se usaba como disolvente de limpieza en seco. Cada cloro conserva tres pares solitarios.',
  },
  ch3cl: {
    name: 'Clorometano',
    tier2Hint:
      'El carbono tiene cuatro impares, así que va en el centro: comparte tres pares con átomos de hidrógeno y uno con el cloro.',
    propertyLine:
      'El clorometano, metano al que se le ha cambiado un hidrógeno por un cloro. El cloro conserva tres pares solitarios.',
  },
  h2o2: {
    name: 'Peróxido de hidrógeno',
    tier2Hint:
      'El hidrógeno solo puede compartir una vez, así que los dos oxígenos tienen que compartir entre ellos y quedarse después con un hidrógeno cada uno.',
    propertyLine:
      'El peróxido de hidrógeno, el oxidante de los tintes de pelo. El enlace simple entre los dos oxígenos se rompe con facilidad.',
  },
  c2h5oh: {
    name: 'Etanol',
    tier2Hint:
      'Encadena primero los dos carbonos y el oxígeno (C-C-O), y reparte después los átomos de hidrógeno: los que le tocan a cada carbono y uno al oxígeno.',
    propertyLine:
      'El etanol, el alcohol de las bebidas y del gel hidroalcohólico. Si se mezcla con el agua es gracias al extremo O-H.',
  },
};
