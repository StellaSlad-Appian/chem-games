// src/i18n/chemistry-names/it.ts
//
// Italian names for the chemistry registries.
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
// What Italian does, all of it fixed in docs/i18n/glossary-it.md:
//
//   * Compounds compose **anion first, then `di` + cation**, as in French and
//     Spanish: *idrossido di sodio*, not German's single word *Natriumhydroxid*
//     and not English's cation-first *sodium hydroxide*.
//   * Binary acids take **-idrico** (HCl *acido cloridrico*, H2S *acido
//     solfidrico*), and the -ous/-ic pair becomes *-oso*/*-ico* (*acido nitroso*
//     / *acido nitrico*). Note the Italian stem is **solfo-**, not "sulfo-".
//   * Ions use the systematic *idrogeno-* prefix where the English data still
//     says *bi-*: bicarbonate is *idrogenocarbonato*.
//   * **Italian diverges from French and Spanish on the diatomic elemental
//     substances, and it is a decision rather than an oversight.** French uses
//     *dihydrogène* because the programme teaches it from 3ᵉ; Spanish used
//     *dihidrógeno* and rated it medium. Italian school textbooks overwhelmingly
//     write plain **idrogeno** for H2, and *diidrogeno* would read as foreign to
//     a fourteen-year-old. So the bare names are used. The cost is the cost
//     English already pays: the Reaction Balancer's **card** (a substance) and
//     its **atom ledger** (atoms) show the same word. English lives with that,
//     so Italian is no worse off than the canonical text. **Rated medium and
//     flagged for a teacher** in it-review.md; if the audience's textbook does
//     teach the *di-* forms, the change is contained to SPECIES_NAMES_IT and
//     LEWIS_MOLECULE_TEXT_IT.
//   * Oxides use the Greek prefixes consistently — **monossido**, **diossido**,
//     **triossido** — so the naming cheat sheet's prefix table and these names
//     agree. *Anidride carbonica* (school) and *biossido di carbonio* (media)
//     are both common Italian for CO2 and are noted in it-review.md.
//
// Two things Italian does NOT need, stated because their absence is a decision,
// and both checked entry by entry rather than inherited from the Spanish result:
// all fourteen `mustDiffer` element names are genuinely translated — **azoto**,
// **zolfo**, **rame**, **stagno**, **argento**, **piombo**, **sodio**,
// **potassio** — so there is no `SAME_AS_ENGLISH` entry; and all 35 compounds
// differ from the English, because N2H4 is **idrazina**, so there is no
// `IDENTICAL_COMPOUNDS_BY_DESIGN` entry either.

/**
 * All 118 elements, keyed by symbol. Verified one at a time rather than
 * pattern-matched from the English, because Italian differs in ways a
 * transliteration would miss — Nitrogen/**azoto**, Iron/**ferro**,
 * Copper/**rame**, Silver/**argento**, Tin/**stagno**, Lead/**piombo**,
 * Sulfur/**zolfo**.
 *
 * Spellings follow Italian school and IUPAC usage: **nichel** (not
 * "nichelio"), **iodio**, **cesio**, **zirconio**, **tungsteno**, **bismuto**,
 * **silicio**, **molibdeno**, **tellurio**, **kripton**, **xeno**,
 * **oganesson**.
 */
export const ELEMENT_NAMES_IT: Record<string, string> = {
  H: 'Idrogeno',
  He: 'Elio',
  Li: 'Litio',
  Be: 'Berillio',
  B: 'Boro',
  C: 'Carbonio',
  N: 'Azoto',
  O: 'Ossigeno',
  F: 'Fluoro',
  Ne: 'Neon',
  Na: 'Sodio',
  Mg: 'Magnesio',
  Al: 'Alluminio',
  Si: 'Silicio',
  P: 'Fosforo',
  S: 'Zolfo',
  Cl: 'Cloro',
  Ar: 'Argon',
  K: 'Potassio',
  Ca: 'Calcio',
  Sc: 'Scandio',
  Ti: 'Titanio',
  V: 'Vanadio',
  Cr: 'Cromo',
  Mn: 'Manganese',
  Fe: 'Ferro',
  Co: 'Cobalto',
  Ni: 'Nichel',
  Cu: 'Rame',
  Zn: 'Zinco',
  Ga: 'Gallio',
  Ge: 'Germanio',
  As: 'Arsenico',
  Se: 'Selenio',
  Br: 'Bromo',
  Kr: 'Kripton',
  Rb: 'Rubidio',
  Sr: 'Stronzio',
  Y: 'Ittrio',
  Zr: 'Zirconio',
  Nb: 'Niobio',
  Mo: 'Molibdeno',
  Tc: 'Tecnezio',
  Ru: 'Rutenio',
  Rh: 'Rodio',
  Pd: 'Palladio',
  Ag: 'Argento',
  Cd: 'Cadmio',
  In: 'Indio',
  Sn: 'Stagno',
  Sb: 'Antimonio',
  Te: 'Tellurio',
  I: 'Iodio',
  Xe: 'Xeno',
  Cs: 'Cesio',
  Ba: 'Bario',
  La: 'Lantanio',
  Ce: 'Cerio',
  Pr: 'Praseodimio',
  Nd: 'Neodimio',
  Pm: 'Promezio',
  Sm: 'Samario',
  Eu: 'Europio',
  Gd: 'Gadolinio',
  Tb: 'Terbio',
  Dy: 'Disprosio',
  Ho: 'Olmio',
  Er: 'Erbio',
  Tm: 'Tulio',
  Yb: 'Itterbio',
  Lu: 'Lutezio',
  Hf: 'Afnio',
  Ta: 'Tantalio',
  W: 'Tungsteno',
  Re: 'Renio',
  Os: 'Osmio',
  Ir: 'Iridio',
  Pt: 'Platino',
  Au: 'Oro',
  Hg: 'Mercurio',
  Tl: 'Tallio',
  Pb: 'Piombo',
  Bi: 'Bismuto',
  Po: 'Polonio',
  At: 'Astato',
  Rn: 'Radon',
  Fr: 'Francio',
  Ra: 'Radio',
  Ac: 'Attinio',
  Th: 'Torio',
  Pa: 'Protoattinio',
  U: 'Uranio',
  Np: 'Nettunio',
  Pu: 'Plutonio',
  Am: 'Americio',
  Cm: 'Curio',
  Bk: 'Berkelio',
  Cf: 'Californio',
  Es: 'Einsteinio',
  Fm: 'Fermio',
  Md: 'Mendelevio',
  No: 'Nobelio',
  Lr: 'Laurenzio',
  Rf: 'Rutherfordio',
  Db: 'Dubnio',
  Sg: 'Seaborgio',
  Bh: 'Bohrio',
  Hs: 'Hassio',
  Mt: 'Meitnerio',
  Ds: 'Darmstadtio',
  Rg: 'Roentgenio',
  Cn: 'Copernicio',
  Nh: 'Nihonio',
  Fl: 'Flerovio',
  Mc: 'Moscovio',
  Lv: 'Livermorio',
  Ts: 'Tennesso',
  Og: 'Oganesson',
};

/**
 * Compound names, keyed by the registry id.
 *
 * Italian composes them anion-first with `di`: *idrossido di sodio*, *cloruro di
 * calcio*. Binary acids take *-idrico* (HCl acido cloridrico, HF acido
 * fluoridrico, HBr acido bromidrico, HI acido iodidrico); the -ous/-ic pair
 * becomes -oso/-ico (HNO2 acido nitroso vs HNO3 acido nitrico, H2SO3 acido
 * solforoso vs H2SO4 acido solforico).
 *
 * All 35 differ from the English, so like Spanish this locale needs no
 * `IDENTICAL_COMPOUNDS_BY_DESIGN` entry: N2H4 is *idrazina* where French and
 * English both say *hydrazine*.
 */
export const COMPOUND_NAMES_IT: Record<string, string> = {
  '1': 'Acido cloridrico',
  '2': 'Acido solforico',
  '3': 'Acido nitrico',
  '4': 'Idrossido di sodio',
  '5': 'Idrossido di potassio',
  '6': 'Cloruro di sodio',
  '7': 'Cloruro di potassio',
  '8': 'Acido fluoridrico',
  '9': 'Acido carbonico',
  '10': 'Acido fosforico',
  '11': 'Ammoniaca',
  '12': 'Cloruro di calcio',
  '13': 'Cloruro di magnesio',
  '14': 'Solfato di sodio',
  '15': 'Acqua',
  '16': 'Idrogenocarbonato di sodio',
  '17': 'Idrogenocarbonato di potassio',
  '18': 'Acido nitroso',
  '19': 'Idrossido di bario',
  '20': 'Nitrato di potassio',
  '21': 'Cloruro di litio',
  '22': 'Acido solforoso',
  '23': 'Idrazina',
  '24': 'Idrossido di litio',
  '25': 'Acido bromidrico',
  '26': 'Nitrato di sodio',
  '27': 'Diidrogenofosfato di sodio',
  '28': 'Idrogenofosfato di disodio',
  '29': 'Acido perclorico',
  '30': 'Acido iodidrico',
  '31': 'Idrossido di cesio',
  '32': 'Acido borico',
  '33': 'Acido silicico',
  '34': 'Idrogenosolfuro di sodio',
  '35': 'Idrogenosolfato di sodio',
};

/**
 * Ion names, keyed by the registry id (monoatomic and polyatomic ids do not
 * overlap, so one map covers both).
 *
 * Italian uses the systematic *idrogeno-* prefix where the English data still
 * uses the older *bi-*: bicarbonate is idrogenocarbonato, bisulfate is
 * idrogenosolfato, bisulfite is idrogenosolfito. A monoatomic cation is *ione* +
 * the element (*ione sodio*), which is why those read as two words where the
 * anions are one.
 */
export const ION_NAMES_IT: Record<string, string> = {
  '1': 'Ione idrogeno',
  '2': 'Cloruro',
  '3': 'Solfato',
  '4': 'Nitrato',
  '5': 'Ione sodio',
  '6': 'Idrossido',
  '7': 'Ione potassio',
  '8': 'Fluoruro',
  '9': 'Idrogenocarbonato',
  '10': 'Diidrogenofosfato',
  '11': 'Ione calcio',
  '12': 'Ione magnesio',
  '13': 'Nitrito',
  '14': 'Ione bario',
  '15': 'Ione litio',
  '16': 'Idrogenosolfito',
  '17': 'Bromuro',
  '18': 'Idrogenofosfato',
  '19': 'Perclorato',
  '20': 'Ioduro',
  '21': 'Ione cesio',
  '22': 'Diidrogenoborato',
  '23': 'Triidrogenosilicato',
  '24': 'Idrogenosolfuro',
  '25': 'Idrogenosolfato',
  '26': 'Ammonio',
  '27': 'Carbonato',
  '28': 'Solfito',
  '29': 'Fosfato',
  '30': 'Etanoato (acetato)',
  '31': 'Cianuro',
  '32': 'Ipoclorito',
  '33': 'Clorito',
  '34': 'Clorato',
  '35': 'Permanganato',
  '36': 'Cromato',
  '37': 'Dicromato',
  '38': 'Tiosolfato',
  '39': 'Perossido',
  '40': 'Ossalato',
};

/**
 * Everyday species names for Reaction Balancer, keyed by bare formula exactly
 * as `SPECIES_NAMES` in src/core-engine/data/reactions.ts is.
 *
 * **No *di-* forms here**, unlike French and Spanish: H2 is *idrogeno*, O2
 * *ossigeno*, N2 *azoto*, Cl2 *cloro*, because that is what an Italian textbook
 * writes. See the header note; this is the one decision in this file a teacher
 * should actually rule on.
 *
 * Note HCl: the substance is **cloruro di idrogeno**, and that is what a
 * compound card shows. Italian calls its aqueous solution **acido cloridrico**,
 * so the reaction descriptions below say that where the reaction is happening in
 * water — the same distinction German draws with Chlorwasserstoff / Salzsäure
 * and English loses.
 */
export const SPECIES_NAMES_IT: Record<string, string> = {
  H2: 'Idrogeno',
  O2: 'Ossigeno',
  H2O: 'Acqua',
  Cl2: 'Cloro',
  HCl: 'Cloruro di idrogeno',
  CaCO3: 'Carbonato di calcio',
  CaO: 'Ossido di calcio',
  CO2: 'Diossido di carbonio',
  O3: 'Ozono',
  Mg: 'Magnesio',
  MgO: 'Ossido di magnesio',
  N2: 'Azoto',
  NH3: 'Ammoniaca',
  H2O2: 'Perossido di idrogeno',
  Fe: 'Ferro',
  Fe2O3: 'Ossido di ferro(III)',
  CH4: 'Metano',
  H2SO4: 'Acido solforico',
  MgSO4: 'Solfato di magnesio',
  Na: 'Sodio',
  NaOH: 'Idrossido di sodio',
  C2H5OH: 'Etanolo',
  SO2: 'Diossido di zolfo',
  SO3: 'Triossido di zolfo',
  NaCl: 'Cloruro di sodio',
  AgNO3: 'Nitrato di argento',
  AgCl: 'Cloruro di argento',
  NaNO3: 'Nitrato di sodio',
  C3H8: 'Propano',
  NaHCO3: 'Idrogenocarbonato di sodio',
  CH3COOH: 'Acido etanoico',
  CH3COONa: 'Etanoato di sodio',
  Cu: 'Rame',
  'Cu(NO3)2': 'Nitrato di rame(II)',
  Ag: 'Argento',
  'Pb(NO3)2': 'Nitrato di piombo(II)',
  KI: 'Ioduro di potassio',
  PbI2: 'Ioduro di piombo(II)',
  KNO3: 'Nitrato di potassio',
  C8H18: 'Ottano',
  NO: 'Monossido di azoto',
  NaClO: 'Ipoclorito di sodio',
  Al: 'Alluminio',
  AlCl3: 'Cloruro di alluminio',
  Al2O3: 'Ossido di alluminio',
  'Al2(SO4)3': 'Solfato di alluminio',
  'Ca(OH)2': 'Idrossido di calcio',
  CaCl2: 'Cloruro di calcio',
  NH4Cl: 'Cloruro di ammonio',
  C: 'Carbonio',
  CO: 'Monossido di carbonio',
  C6H12O6: 'Glucosio',
  H2CO3: 'Acido carbonico',
};

/**
 * Reaction prose, keyed by the id in reactions.ts. Equations, state symbols and
 * level assignments are not here: they are notation and rules, not copy.
 *
 * `hint` is the tier-2 strategy hint; `prompt` is the word equation a Sfida
 * round shows. A reaction with no English prompt must not gain an Italian one,
 * so only the reactions that have one are listed with one.
 *
 * The prompts deliberately use the verbs the catalogue's tier-2 build hint
 * names — «reagisce», «brucia», «si decompone» on the left, «per formare»,
 * «per dare», «produce» on the right — so that hint is actually usable.
 */
export const REACTION_TEXT_IT: Record<
  string,
  { name: string; description: string; hint?: string; prompt?: string }
> = {
  rxn_01: {
    name: 'Sintesi dell’acqua',
    hint: 'L’idrogeno è già a posto. Bilancia l’ossigeno aggiungendo acqua e poi ricontrolla l’idrogeno.',
    description:
      'L’idrogeno brucia nell’ossigeno con una fiamma azzurra pallida e un piccolo scoppio; si forma acqua.',
    prompt: 'L’idrogeno brucia nell’ossigeno per formare acqua liquida.',
  },
  rxn_25: {
    name: 'Sintesi del cloruro di idrogeno',
    hint: 'Conta gli atomi di idrogeno e di cloro. A sinistra stanno tutti e due a coppie.',
    description:
      'L’idrogeno e il cloro si combinano in cloruro di idrogeno, un gas dall’odore pungente.',
    prompt: 'L’idrogeno reagisce con il cloro per formare cloruro di idrogeno gassoso.',
  },
  rxn_31: {
    name: 'Sintesi del cloruro di sodio',
    hint: 'A sinistra il cloro sta a coppie. Fai due cloruri di sodio e poi controlla il sodio.',
    description:
      'Il sodio brucia nel cloro con una fiamma gialla intensa; resta cloruro di sodio bianco, il sale da cucina.',
    prompt: 'Il sodio metallico brucia nel cloro per dare cloruro di sodio solido.',
  },
  rxn_29: {
    name: 'Combustione del magnesio',
    hint: 'Il magnesio è già bilanciato. Guarda l’ossigeno.',
    description:
      'Il magnesio brucia nell’ossigeno con una fiamma bianca accecante; resta una polvere bianca.',
    prompt: 'Il magnesio metallico brucia nell’ossigeno per dare ossido di magnesio solido.',
  },
  rxn_30: {
    name: 'Combustione incompleta del carbonio',
    hint: 'Comincia dal carbonio e passa poi all’ossigeno.',
    description:
      'Quando l’ossigeno scarseggia, il carbonio brucia e dà monossido di carbonio, un gas incolore e tossico.',
    prompt: 'Il carbonio solido brucia con poco ossigeno per dare monossido di carbonio gassoso.',
  },
  rxn_24: {
    name: 'Sintesi del cloruro di alluminio',
    hint: 'Bilancia prima l’alluminio e poi il cloro.',
    description:
      'L’alluminio diventa incandescente quando reagisce direttamente con il cloro e dà cloruro di alluminio bianco.',
    prompt: 'L’alluminio metallico reagisce con il cloro per formare cloruro di alluminio solido.',
  },
  rxn_19: {
    name: 'Formazione dell’ozono',
    hint: 'Basta bilanciare l’ossigeno. Cerca il numero più piccolo divisibile per 2 e per 3.',
    description:
      'L’ossigeno si trasforma in ozono, il gas dall’odore pungente che si sente dopo un temporale.',
  },
  rxn_05: {
    name: 'Processo Haber-Bosch',
    hint: 'Bilancia prima l’azoto e poi l’idrogeno.',
    description:
      'L’azoto e l’idrogeno si combinano ad alta pressione per dare ammoniaca gassosa.',
    prompt: 'L’azoto e l’idrogeno si combinano per formare ammoniaca gassosa.',
  },
  rxn_26: {
    name: 'Elettrolisi dell’acqua',
    hint: 'Bilancia prima l’ossigeno aggiungendo acqua e poi sistema l’idrogeno.',
    description:
      'Una corrente elettrica scompone l’acqua; dagli elettrodi salgono bollicine di idrogeno e di ossigeno.',
    prompt: 'Una corrente elettrica decompone l’acqua liquida per dare idrogeno e ossigeno.',
  },
  rxn_06: {
    name: 'Decomposizione del perossido di idrogeno',
    hint: 'L’idrogeno è già bilanciato. Concentrati sull’ossigeno.',
    description:
      'Il perossido di idrogeno si decompone in acqua e ossigeno; la soluzione fa schiuma mentre il gas se ne va.',
  },
  rxn_08: {
    name: 'Ossidazione del ferro',
    hint: 'Bilancia prima il ferro e poi l’ossigeno.',
    description:
      'Il ferro reagisce lentamente con l’ossigeno e dà ossido di ferro(III): le scaglie bruno-arancioni che chiamiamo ruggine.',
  },
  rxn_04: {
    name: 'Combustione del metano',
    hint: 'In una combustione, comincia dal carbonio, passa all’idrogeno e lascia l’ossigeno per ultimo.',
    description:
      'Il metano brucia nell’ossigeno con una fiamma azzurra e dà diossido di carbonio e vapore acqueo.',
    prompt: 'Il metano brucia nell’ossigeno per formare diossido di carbonio e vapore acqueo.',
  },
  rxn_15: {
    name: 'Processo al contatto (fase 2)',
    hint: 'Lo zolfo è già bilanciato. Guarda l’ossigeno.',
    description:
      'Il diossido di zolfo si ossida a triossido di zolfo su un catalizzatore, una tappa intermedia verso l’acido solforico.',
  },
  rxn_17: {
    name: 'Il sodio nell’acqua',
    hint: 'Bilancia prima l’idrogeno fra l’acqua e l’idrogeno gassoso, e controlla poi il sodio.',
    description:
      'Il sodio sfreccia sfrigolando sulla superficie dell’acqua, libera idrogeno e lascia una soluzione basica.',
    prompt:
      'Il sodio metallico reagisce con l’acqua liquida per dare una soluzione di idrossido di sodio e idrogeno.',
  },
  rxn_32: {
    name: 'Neutralizzazione dell’idrossido di calcio',
    hint: 'Tratta il gruppo idrossido come un’unità. Bilancia prima il cloro e controlla poi l’idrogeno e l’ossigeno.',
    description:
      'L’acqua di calce si neutralizza con acido cloridrico; la miscela si scalda e l’indicatore cambia colore.',
    prompt:
      'Una soluzione di idrossido di calcio reagisce con acido cloridrico per dare una soluzione di cloruro di calcio e acqua.',
  },
  rxn_18: {
    name: 'Combustione dell’etanolo',
    hint: 'Bilancia prima il carbonio, poi l’idrogeno e infine l’ossigeno.',
    description:
      'L’etanolo brucia con una fiamma azzurra e pulita e dà diossido di carbonio e vapore acqueo.',
  },
  rxn_09: {
    name: 'Reazione alluminotermica',
    hint: 'Comincia dal ferro e dall’alluminio.',
    description:
      'L’alluminio strappa l’ossigeno all’ossido di ferro: una pioggia di scintille, e resta ferro liquido.',
  },
  rxn_16: {
    name: 'Processo Ostwald (fase 1)',
    hint: 'Bilancia l’azoto e l’idrogeno prima di occuparti dell’ossigeno.',
    description:
      'L’ammoniaca si ossida su platino caldo: la prima tappa della fabbricazione dell’acido nitrico.',
  },
  rxn_21: {
    name: 'Il rame e il nitrato di argento',
    hint: 'Bilancia i gruppi nitrato come un’unità e controlla poi l’argento.',
    description:
      'Il rame sposta l’argento dal nitrato di argento: sul rame crescono cristalli d’argento e la soluzione diventa azzurra.',
  },
  rxn_23: {
    name: 'Produzione della candeggina',
    hint: 'Comincia dal cloro e bilancia poi il sodio e l’idrogeno.',
    description:
      'Il cloro viene assorbito in una soluzione di idrossido di sodio; si forma la candeggina dell’armadio delle pulizie.',
  },
  rxn_14: {
    name: 'Combustione del propano',
    hint: 'In una combustione, bilancia prima il carbonio, poi l’idrogeno e infine l’ossigeno.',
    description:
      'Il propano brucia nell’ossigeno con una fiamma azzurra molto calda e dà diossido di carbonio e vapore acqueo.',
    prompt: 'Il propano brucia nell’ossigeno per formare diossido di carbonio e vapore acqueo.',
  },
  rxn_22: {
    name: 'La pioggia d’oro',
    hint: 'Conta ogni elemento a parte, compresi i gruppi nitrato, che compaiono più volte.',
    description:
      'Precipita ioduro di piombo di un giallo intenso, che cade in scaglie lucenti come una pioggia d’oro.',
  },
  rxn_33: {
    name: 'L’alluminio nell’acido solforico',
    hint: 'Tratta il solfato come un’unità: tre solfati a destra, quindi tre molecole di acido a sinistra. Controlla poi l’alluminio e l’idrogeno.',
    description:
      'L’alluminio si scioglie lentamente nell’acido solforico tiepido facendo bollicine; se ne va idrogeno e il solfato di alluminio resta in soluzione.',
    prompt:
      'L’alluminio metallico reagisce con acido solforico per dare una soluzione di solfato di alluminio e idrogeno.',
  },
  rxn_02: {
    name: 'Respirazione cellulare',
    hint: 'Bilancia prima il carbonio, poi l’idrogeno e infine l’ossigeno.',
    description:
      'Il glucosio reagisce con l’ossigeno dentro le cellule; si libera energia e si formano diossido di carbonio e acqua.',
  },
  rxn_03: {
    name: 'Fotosintesi',
    hint: 'Confronta prima il carbonio, poi l’idrogeno e infine l’ossigeno.',
    description:
      'Con la luce, le piante fabbricano glucosio a partire da diossido di carbonio e acqua, e liberano ossigeno.',
  },
  rxn_10: {
    name: 'Decomposizione del calcare',
    hint: 'Comincia dal calcio e dal carbonio.',
    description:
      'Il carbonato di calcio si decompone quando viene scaldato molto e libera diossido di carbonio.',
  },
  rxn_12: {
    name: 'Il magnesio nell’acido solforico',
    hint: 'Cerca gli elementi che sono già a posto.',
    description:
      'Il magnesio si scioglie nell’acido solforico mentre salgono bollicine di idrogeno.',
  },
  rxn_07: {
    name: 'Neutralizzazione dell’acido cloridrico',
    hint: 'Conta gli elementi uno per uno.',
    description:
      'L’acido cloridrico reagisce con l’idrossido di sodio e dà cloruro di sodio e acqua; la miscela si scalda.',
  },
  rxn_13: {
    name: 'Precipitazione del cloruro di argento',
    hint: 'Confronta ogni elemento ai due lati.',
    description:
      'Appena le due soluzioni trasparenti si incontrano compare un precipitato bianco di cloruro di argento.',
  },
  rxn_11: {
    name: 'Bicarbonato e aceto',
    hint: 'Comincia dagli elementi che compaiono in un solo composto per lato.',
    description:
      'Il bicarbonato fa schiuma nell’aceto, se ne va diossido di carbonio e l’etanoato di sodio resta in soluzione.',
  },
  rxn_28: {
    name: 'Formazione del cloruro di ammonio',
    hint: 'Confronta l’azoto, l’idrogeno e il cloro.',
    description:
      'L’ammoniaca e il cloruro di idrogeno si incontrano allo stato gassoso; si forma un fumo bianco di cloruro di ammonio.',
  },
  rxn_20: {
    name: 'Decomposizione dell’acido carbonico',
    hint: 'Confronta l’idrogeno, il carbonio e l’ossigeno.',
    description:
      'L’acido carbonico si decompone in acqua e diossido di carbonio: per questo una bibita perde le bollicine.',
  },
  rxn_27: {
    name: 'Combustione dell’ottano',
    hint: 'Bilancia prima il carbonio, poi l’idrogeno e lascia l’ossigeno per ultimo.',
    description:
      'L’ottano brucia nell’ossigeno e dà diossido di carbonio e vapore acqueo: la reazione di un motore a benzina.',
  },
};

/**
 * Lewis molecule prose, keyed by the id in lewis-molecules.ts. `bondLine` and
 * `formula` stay untranslated: they are notation.
 *
 * «Dispari» is the Italian for the game's coined "loner"; it is introduced in
 * the instructions and defined in the glossary, exactly as the English is, and
 * it is deliberately **not** *solitario*, which Italian already uses for a lone
 * pair (*doppietto solitario*), nor *libero*, nor *singolo* — see
 * docs/i18n/glossary-it.md. Names follow Italian IUPAC — **etene** and **etino**
 * rather than the older ethylene/acetylene, **fosfina**, **tetraclorometano**,
 * **solfuro di idrogeno** — and the bare forms for the diatomic elements, per
 * the header note.
 */
export const LEWIS_MOLECULE_TEXT_IT: Record<
  string,
  { name: string; tier2Hint: string; propertyLine: string }
> = {
  h2: {
    name: 'Idrogeno',
    tier2Hint:
      'Ogni idrogeno ha un dispari. Due dispari di due atomi formano un doppietto di legame.',
    propertyLine:
      'L’idrogeno, il gas più leggero che esista. I due atomi condividono un doppietto, quindi tutti e due restano completi con 2.',
  },
  cl2: {
    name: 'Cloro',
    tier2Hint:
      'Il cloro ha 7 elettroni esterni: tre doppietti e un dispari. Ogni cloro condivide quell’unico dispari.',
    propertyLine:
      'Il cloro, un gas di colore giallo-verdastro. Ogni cloro si tiene tre doppietti solitari e ne condivide uno.',
  },
  hcl: {
    name: 'Cloruro di idrogeno',
    tier2Hint:
      'L’idrogeno ha un dispari e il cloro ha un dispari, quindi condividono esattamente un doppietto.',
    propertyLine:
      'Il cloruro di idrogeno, un gas che si scioglie in acqua; quella soluzione la chiamiamo acido cloridrico.',
  },
  h2o: {
    name: 'Acqua',
    tier2Hint:
      'L’ossigeno ha due dispari, quindi condivide con tutti e due gli atomi di idrogeno. Gli altri due doppietti restano fermi.',
    propertyLine:
      'L’acqua, liquida a temperatura ambiente; la forma piegata che studierai l’anno prossimo viene dai due doppietti solitari.',
  },
  nh3: {
    name: 'Ammoniaca',
    tier2Hint:
      'L’azoto ha tre dispari e un doppietto, quindi condivide con tutti e tre gli atomi di idrogeno.',
    propertyLine:
      'L’ammoniaca, un gas dall’odore pungente con cui si fabbricano i concimi. L’azoto si tiene un doppietto solitario.',
  },
  ch4: {
    name: 'Metano',
    tier2Hint:
      'Il carbonio ha quattro dispari, quindi condivide con tutti e quattro gli atomi di idrogeno.',
    propertyLine:
      'Il metano, il gas di città. Il carbonio non ha nessun doppietto solitario: condivide tutti i suoi elettroni esterni.',
  },
  h2s: {
    name: 'Solfuro di idrogeno',
    tier2Hint:
      'Lo zolfo è nella stessa colonna dell’ossigeno, quindi anche lui ha due dispari e due doppietti: costruiscilo come l’acqua.',
    propertyLine:
      'Il solfuro di idrogeno, il gas che puzza di uova marce. Ha la stessa struttura dell’acqua, perché lo zolfo sta subito sotto l’ossigeno.',
  },
  ph3: {
    name: 'Fosfina',
    tier2Hint:
      'Il fosforo è nella stessa colonna dell’azoto, quindi ha tre dispari: costruiscila come l’ammoniaca.',
    propertyLine:
      'La fosfina, un gas che brilla debolmente nell’aria. Ha la stessa struttura dell’ammoniaca, perché il fosforo sta subito sotto l’azoto.',
  },
  o2: {
    name: 'Ossigeno',
    tier2Hint:
      'Ogni ossigeno ha due dispari. Dopo il primo doppietto condiviso ne resta uno per ciascuno: condividi di nuovo e viene un legame doppio.',
    propertyLine:
      'L’ossigeno, il gas che respiriamo. Due doppietti condivisi fra gli atomi fanno un legame doppio.',
  },
  co2: {
    name: 'Diossido di carbonio',
    tier2Hint:
      'Il carbonio ha quattro dispari e ogni ossigeno ne ha due, quindi il carbonio condivide due volte con ogni ossigeno.',
    propertyLine:
      'Il diossido di carbonio, il gas delle combustioni e di quello che espiriamo. Due legami doppi, e nessun doppietto solitario sul carbonio.',
  },
  n2: {
    name: 'Azoto',
    tier2Hint:
      'Ogni azoto ha tre dispari. Condividili tutti e tre fra gli stessi due atomi: viene un legame triplo.',
    propertyLine:
      'L’azoto, la maggior parte dell’aria. Il legame triplo è così forte che l’azoto non reagisce quasi mai.',
  },
  c2h4: {
    name: 'Etene',
    tier2Hint:
      'Ogni carbonio condivide con due atomi di idrogeno; dopo restano due dispari per carbonio: condividili due volte fra loro.',
    propertyLine:
      'L’etene, il gas che fa maturare la frutta e con cui si fabbrica il polietilene. Quello che reagisce è il legame doppio fra i carboni.',
  },
  c2h2: {
    name: 'Etino',
    tier2Hint:
      'Ogni carbonio condivide un doppietto con un idrogeno; i tre dispari che restano a ogni carbonio danno un legame triplo.',
    propertyLine:
      'L’etino (acetilene), il gas del cannello ossiacetilenico. Un legame triplo unisce i due carboni.',
  },
  c2h6: {
    name: 'Etano',
    tier2Hint:
      'I due carboni condividono un doppietto fra loro; poi ogni carbonio condivide i suoi tre dispari rimasti con tre atomi di idrogeno.',
    propertyLine:
      'L’etano, presente nel gas naturale. Tutti i legami sono singoli e nessun atomo ha doppietti solitari.',
  },
  ccl4: {
    name: 'Tetraclorometano',
    tier2Hint:
      'Il carbonio è quello con più dispari (quattro), quindi va al centro e condivide un doppietto con ogni cloro.',
    propertyLine:
      'Il tetraclorometano, che una volta si usava come solvente per il lavaggio a secco. Ogni cloro si tiene tre doppietti solitari.',
  },
  ch3cl: {
    name: 'Clorometano',
    tier2Hint:
      'Il carbonio ha quattro dispari, quindi va al centro: condivide tre doppietti con atomi di idrogeno e uno con il cloro.',
    propertyLine:
      'Il clorometano, metano a cui è stato cambiato un idrogeno con un cloro. Il cloro si tiene tre doppietti solitari.',
  },
  h2o2: {
    name: 'Perossido di idrogeno',
    tier2Hint:
      'L’idrogeno può condividere una volta sola, quindi i due ossigeni devono condividere fra loro e prendersi poi un idrogeno ciascuno.',
    propertyLine:
      'Il perossido di idrogeno, l’ossidante delle tinture per capelli. Il legame singolo fra i due ossigeni si rompe facilmente.',
  },
  c2h5oh: {
    name: 'Etanolo',
    tier2Hint:
      'Metti prima in fila i due carboni e l’ossigeno (C-C-O), e distribuisci dopo gli atomi di idrogeno: quelli che spettano a ogni carbonio e uno all’ossigeno.',
    propertyLine:
      'L’etanolo, l’alcol delle bevande e del gel disinfettante. Si mescola con l’acqua grazie all’estremità O-H.',
  },
};
