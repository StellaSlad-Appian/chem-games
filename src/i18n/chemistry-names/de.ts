// src/i18n/chemistry-names/de.ts
//
// German names for the chemistry registries.
//
// This is kept apart from the UI dictionary on purpose. The English names are
// already the canonical data in src/core-engine/data/, so duplicating them into
// an `en` dictionary would create a second source of truth that can drift from
// the registry. Instead each non-default locale supplies an *overlay*, keyed by
// the registry's own identifiers, and `src/i18n/chemistry-names.test.ts` asserts
// the overlay is complete against the live registries — a stronger guarantee
// than key parity, because adding a compound to the registry fails the suite
// until it is named in every locale.
//
// What is NOT here, and must never be: formulae (H2SO4), element symbols (Na),
// state symbols ((aq), (s)) and charges. Those are international notation.
// Names are translated; notation is not.

/**
 * All 118 elements, keyed by symbol. German school chemistry differs from
 * English in ways that break a naive transliteration — Sodium/Natrium,
 * Potassium/Kalium, Nitrogen/Stickstoff, Tungsten/Wolfram, Lead/Blei — so the
 * whole table is spelled out rather than only the "obvious" ones.
 *
 * Spellings follow the German IUPAC recommendations used in school textbooks:
 * Calcium (not Kalzium), Silicium (not Silizium), Iod (not Jod), Caesium (not
 * Cäsium), Cobalt (not Kobalt), Bismut (not Wismut).
 */
export const ELEMENT_NAMES_DE: Record<string, string> = {
  H: 'Wasserstoff',
  He: 'Helium',
  Li: 'Lithium',
  Be: 'Beryllium',
  B: 'Bor',
  C: 'Kohlenstoff',
  N: 'Stickstoff',
  O: 'Sauerstoff',
  F: 'Fluor',
  Ne: 'Neon',
  Na: 'Natrium',
  Mg: 'Magnesium',
  Al: 'Aluminium',
  Si: 'Silicium',
  P: 'Phosphor',
  S: 'Schwefel',
  Cl: 'Chlor',
  Ar: 'Argon',
  K: 'Kalium',
  Ca: 'Calcium',
  Sc: 'Scandium',
  Ti: 'Titan',
  V: 'Vanadium',
  Cr: 'Chrom',
  Mn: 'Mangan',
  Fe: 'Eisen',
  Co: 'Cobalt',
  Ni: 'Nickel',
  Cu: 'Kupfer',
  Zn: 'Zink',
  Ga: 'Gallium',
  Ge: 'Germanium',
  As: 'Arsen',
  Se: 'Selen',
  Br: 'Brom',
  Kr: 'Krypton',
  Rb: 'Rubidium',
  Sr: 'Strontium',
  Y: 'Yttrium',
  Zr: 'Zirconium',
  Nb: 'Niob',
  Mo: 'Molybdän',
  Tc: 'Technetium',
  Ru: 'Ruthenium',
  Rh: 'Rhodium',
  Pd: 'Palladium',
  Ag: 'Silber',
  Cd: 'Cadmium',
  In: 'Indium',
  Sn: 'Zinn',
  Sb: 'Antimon',
  Te: 'Tellur',
  I: 'Iod',
  Xe: 'Xenon',
  Cs: 'Caesium',
  Ba: 'Barium',
  La: 'Lanthan',
  Ce: 'Cer',
  Pr: 'Praseodym',
  Nd: 'Neodym',
  Pm: 'Promethium',
  Sm: 'Samarium',
  Eu: 'Europium',
  Gd: 'Gadolinium',
  Tb: 'Terbium',
  Dy: 'Dysprosium',
  Ho: 'Holmium',
  Er: 'Erbium',
  Tm: 'Thulium',
  Yb: 'Ytterbium',
  Lu: 'Lutetium',
  Hf: 'Hafnium',
  Ta: 'Tantal',
  W: 'Wolfram',
  Re: 'Rhenium',
  Os: 'Osmium',
  Ir: 'Iridium',
  Pt: 'Platin',
  Au: 'Gold',
  Hg: 'Quecksilber',
  Tl: 'Thallium',
  Pb: 'Blei',
  Bi: 'Bismut',
  Po: 'Polonium',
  At: 'Astat',
  Rn: 'Radon',
  Fr: 'Francium',
  Ra: 'Radium',
  Ac: 'Actinium',
  Th: 'Thorium',
  Pa: 'Protactinium',
  U: 'Uran',
  Np: 'Neptunium',
  Pu: 'Plutonium',
  Am: 'Americium',
  Cm: 'Curium',
  Bk: 'Berkelium',
  Cf: 'Californium',
  Es: 'Einsteinium',
  Fm: 'Fermium',
  Md: 'Mendelevium',
  No: 'Nobelium',
  Lr: 'Lawrencium',
  Rf: 'Rutherfordium',
  Db: 'Dubnium',
  Sg: 'Seaborgium',
  Bh: 'Bohrium',
  Hs: 'Hassium',
  Mt: 'Meitnerium',
  Ds: 'Darmstadtium',
  Rg: 'Roentgenium',
  Cn: 'Copernicium',
  Nh: 'Nihonium',
  Fl: 'Flerovium',
  Mc: 'Moscovium',
  Lv: 'Livermorium',
  Ts: 'Tenness',
  Og: 'Oganesson',
};

/**
 * Compound names, keyed by the registry id.
 *
 * German names the binary acids after the solution, the way school textbooks
 * do: HCl is Salzsäure (not "Chlorwasserstoffsäure") and HF is Flusssäure. The
 * -ous/-ic pair becomes the adjectival pair: HNO3 Salpetersäure vs. HNO2
 * salpetrige Säure, H2SO4 Schwefelsäure vs. H2SO3 schweflige Säure. Because
 * these are used as standalone labels the adjective is capitalised here.
 */
export const COMPOUND_NAMES_DE: Record<string, string> = {
  '1': 'Salzsäure',
  '2': 'Schwefelsäure',
  '3': 'Salpetersäure',
  '4': 'Natriumhydroxid',
  '5': 'Kaliumhydroxid',
  '6': 'Natriumchlorid',
  '7': 'Kaliumchlorid',
  '8': 'Flusssäure',
  '9': 'Kohlensäure',
  '10': 'Phosphorsäure',
  '11': 'Ammoniak',
  '12': 'Calciumchlorid',
  '13': 'Magnesiumchlorid',
  '14': 'Natriumsulfat',
  '15': 'Wasser',
  '16': 'Natriumhydrogencarbonat',
  '17': 'Kaliumhydrogencarbonat',
  '18': 'Salpetrige Säure',
  '19': 'Bariumhydroxid',
  '20': 'Kaliumnitrat',
  '21': 'Lithiumchlorid',
  '22': 'Schweflige Säure',
  '23': 'Hydrazin',
  '24': 'Lithiumhydroxid',
  '25': 'Bromwasserstoffsäure',
  '26': 'Natriumnitrat',
  '27': 'Natriumdihydrogenphosphat',
  '28': 'Dinatriumhydrogenphosphat',
  '29': 'Perchlorsäure',
  '30': 'Iodwasserstoffsäure',
  '31': 'Caesiumhydroxid',
  '32': 'Borsäure',
  '33': 'Kieselsäure',
  '34': 'Natriumhydrogensulfid',
  '35': 'Natriumhydrogensulfat',
};

/**
 * Ion names, keyed by the registry id (monoatomic and polyatomic ids do not
 * overlap, so one map covers both).
 *
 * German uses the systematic "Hydrogen-" prefix where English still uses the
 * older "bi-": bicarbonate is Hydrogencarbonat, bisulfate is Hydrogensulfat.
 * The English data keeps the older names, so this is a rename, not a
 * transliteration.
 */
export const ION_NAMES_DE: Record<string, string> = {
  '1': 'Wasserstoff-Ion',
  '2': 'Chlorid',
  '3': 'Sulfat',
  '4': 'Nitrat',
  '5': 'Natrium-Ion',
  '6': 'Hydroxid',
  '7': 'Kalium-Ion',
  '8': 'Fluorid',
  '9': 'Hydrogencarbonat',
  '10': 'Dihydrogenphosphat',
  '11': 'Calcium-Ion',
  '12': 'Magnesium-Ion',
  '13': 'Nitrit',
  '14': 'Barium-Ion',
  '15': 'Lithium-Ion',
  '16': 'Hydrogensulfit',
  '17': 'Bromid',
  '18': 'Hydrogenphosphat',
  '19': 'Perchlorat',
  '20': 'Iodid',
  '21': 'Caesium-Ion',
  '22': 'Dihydrogenborat',
  '23': 'Trihydrogensilicat',
  '24': 'Hydrogensulfid',
  '25': 'Hydrogensulfat',
  '26': 'Ammonium',
  '27': 'Carbonat',
  '28': 'Sulfit',
  '29': 'Phosphat',
  '30': 'Ethanoat (Acetat)',
  '31': 'Cyanid',
  '32': 'Hypochlorit',
  '33': 'Chlorit',
  '34': 'Chlorat',
  '35': 'Permanganat',
  '36': 'Chromat',
  '37': 'Dichromat',
  '38': 'Thiosulfat',
  '39': 'Peroxid',
  '40': 'Oxalat',
};

/**
 * Everyday species names for Reaction Balancer, keyed by bare formula exactly
 * as `SPECIES_NAMES` in src/core-engine/data/reactions.ts is.
 *
 * Note HCl: the substance is **Chlorwasserstoff**, and that is what a compound
 * card shows. German calls its aqueous solution **Salzsäure**, so the reaction
 * descriptions below say Salzsäure where the reaction is happening in water.
 * English uses "hydrogen chloride" for both and loses that distinction.
 */
export const SPECIES_NAMES_DE: Record<string, string> = {
  H2: 'Wasserstoff',
  O2: 'Sauerstoff',
  H2O: 'Wasser',
  Cl2: 'Chlor',
  HCl: 'Chlorwasserstoff',
  CaCO3: 'Calciumcarbonat',
  CaO: 'Calciumoxid',
  CO2: 'Kohlenstoffdioxid',
  O3: 'Ozon',
  Mg: 'Magnesium',
  MgO: 'Magnesiumoxid',
  N2: 'Stickstoff',
  NH3: 'Ammoniak',
  H2O2: 'Wasserstoffperoxid',
  Fe: 'Eisen',
  Fe2O3: 'Eisen(III)-oxid',
  CH4: 'Methan',
  H2SO4: 'Schwefelsäure',
  MgSO4: 'Magnesiumsulfat',
  Na: 'Natrium',
  NaOH: 'Natriumhydroxid',
  C2H5OH: 'Ethanol',
  SO2: 'Schwefeldioxid',
  SO3: 'Schwefeltrioxid',
  NaCl: 'Natriumchlorid',
  AgNO3: 'Silbernitrat',
  AgCl: 'Silberchlorid',
  NaNO3: 'Natriumnitrat',
  C3H8: 'Propan',
  NaHCO3: 'Natriumhydrogencarbonat',
  CH3COOH: 'Essigsäure',
  CH3COONa: 'Natriumacetat',
  Cu: 'Kupfer',
  'Cu(NO3)2': 'Kupfer(II)-nitrat',
  Ag: 'Silber',
  'Pb(NO3)2': 'Blei(II)-nitrat',
  KI: 'Kaliumiodid',
  PbI2: 'Blei(II)-iodid',
  KNO3: 'Kaliumnitrat',
  C8H18: 'Octan',
  NO: 'Stickstoffmonoxid',
  NaClO: 'Natriumhypochlorit',
  Al: 'Aluminium',
  AlCl3: 'Aluminiumchlorid',
  Al2O3: 'Aluminiumoxid',
  'Al2(SO4)3': 'Aluminiumsulfat',
  'Ca(OH)2': 'Calciumhydroxid',
  CaCl2: 'Calciumchlorid',
  NH4Cl: 'Ammoniumchlorid',
  C: 'Kohlenstoff',
  CO: 'Kohlenstoffmonoxid',
  C6H12O6: 'Glucose',
  H2CO3: 'Kohlensäure',
};

/**
 * Reaction prose, keyed by the id in reactions.ts. Equations, state symbols and
 * level assignments are not here: they are notation and rules, not copy.
 *
 * `hint` is the tier-2 strategy hint; `prompt` is the word equation a Challenge
 * round shows. A reaction with no English prompt must not gain a German one, so
 * only the reactions that have one are listed with one.
 */
export const REACTION_TEXT_DE: Record<
  string,
  { name: string; description: string; hint?: string; prompt?: string }
> = {
  rxn_01: {
    name: 'Wasser-Synthese',
    hint: 'Wasserstoff passt schon. Gleiche den Sauerstoff aus, indem du mehr Wasser nimmst, und prüf danach den Wasserstoff noch einmal.',
    description:
      'Wasserstoff verbrennt in Sauerstoff mit blassblauer Flamme und einem Knall; dabei entsteht Wasser.',
    prompt: 'Wasserstoffgas verbrennt in Sauerstoffgas zu flüssigem Wasser.',
  },
  rxn_25: {
    name: 'Chlorwasserstoff-Synthese',
    hint: 'Zähl die Wasserstoff- und die Chloratome. Links kommen beide paarweise vor.',
    description:
      'Wasserstoff und Chlor verbinden sich zu Chlorwasserstoff, einem stechend riechenden Gas.',
    prompt: 'Wasserstoffgas reagiert mit Chlorgas zu Chlorwasserstoffgas.',
  },
  rxn_31: {
    name: 'Natriumchlorid-Synthese',
    hint: 'Chlor kommt links paarweise vor. Mach zwei Natriumchlorid daraus und prüf danach das Natrium.',
    description:
      'Natrium verbrennt in Chlor mit leuchtend gelber Flamme; zurück bleibt weißes Natriumchlorid – Kochsalz.',
    prompt: 'Natriummetall verbrennt in Chlorgas zu festem Natriumchlorid.',
  },
  rxn_29: {
    name: 'Magnesium-Verbrennung',
    hint: 'Magnesium ist schon ausgeglichen. Schau auf den Sauerstoff.',
    description:
      'Magnesium verbrennt in Sauerstoff mit grell weißer Flamme; zurück bleibt ein weißes Pulver.',
    prompt: 'Magnesiummetall verbrennt in Sauerstoffgas zu festem Magnesiumoxid.',
  },
  rxn_30: {
    name: 'Unvollständige Verbrennung von Kohlenstoff',
    hint: 'Fang mit dem Kohlenstoff an, dann kommt der Sauerstoff.',
    description:
      'Kohlenstoff verbrennt bei zu wenig Sauerstoff zu Kohlenstoffmonoxid, einem farblosen und giftigen Gas.',
    prompt: 'Fester Kohlenstoff verbrennt in wenig Sauerstoffgas zu Kohlenstoffmonoxidgas.',
  },
  rxn_24: {
    name: 'Aluminiumchlorid-Synthese',
    hint: 'Gleiche zuerst das Aluminium aus, dann das Chlor.',
    description:
      'Aluminium glüht auf, wenn es direkt mit Chlor zu weißem Aluminiumchlorid reagiert.',
    prompt: 'Aluminiummetall reagiert mit Chlorgas zu festem Aluminiumchlorid.',
  },
  rxn_19: {
    name: 'Ozon-Bildung',
    hint: 'Es gibt nur Sauerstoff auszugleichen. Such die kleinste Zahl, die sowohl durch 2 als auch durch 3 teilbar ist.',
    description:
      'Aus zweiatomigem Sauerstoff wird Ozon – das Gas, das nach einem Gewitter stechend riecht.',
  },
  rxn_05: {
    name: 'Haber-Bosch-Verfahren',
    hint: 'Gleiche zuerst den Stickstoff aus, dann den Wasserstoff.',
    description: 'Stickstoff und Wasserstoff verbinden sich unter hohem Druck zu Ammoniakgas.',
    prompt: 'Stickstoffgas und Wasserstoffgas verbinden sich zu Ammoniakgas.',
  },
  rxn_26: {
    name: 'Elektrolyse von Wasser',
    hint: 'Gleiche zuerst den Sauerstoff aus, indem du mehr Wasser nimmst, und korrigier danach den Wasserstoff.',
    description:
      'Ein elektrischer Strom spaltet Wasser; an den Elektroden steigen Blasen aus Wasserstoff- und Sauerstoffgas auf.',
    prompt: 'Ein elektrischer Strom spaltet flüssiges Wasser in Wasserstoffgas und Sauerstoffgas.',
  },
  rxn_06: {
    name: 'Zersetzung von Wasserstoffperoxid',
    hint: 'Wasserstoff ist schon ausgeglichen. Konzentrier dich auf den Sauerstoff.',
    description:
      'Wasserstoffperoxid zerfällt zu Wasser und Sauerstoff; die Lösung schäumt auf, während das Gas entweicht.',
  },
  rxn_08: {
    name: 'Rosten von Eisen',
    hint: 'Gleiche zuerst das Eisen aus, dann den Sauerstoff.',
    description:
      'Eisen reagiert langsam mit Sauerstoff zu Eisen(III)-oxid – den orangebraunen Flocken, die wir Rost nennen.',
  },
  rxn_04: {
    name: 'Methan-Verbrennung',
    hint: 'Bei einer Verbrennung nimmst du am besten zuerst den Kohlenstoff, dann den Wasserstoff und zum Schluss den Sauerstoff.',
    description:
      'Methan verbrennt in Sauerstoff mit blauer Flamme zu Kohlenstoffdioxid und Wasserdampf.',
    prompt: 'Methangas verbrennt in Sauerstoffgas zu Kohlenstoffdioxidgas und Wasserdampf.',
  },
  rxn_15: {
    name: 'Kontaktverfahren (Schritt 2)',
    hint: 'Schwefel ist schon ausgeglichen. Schau auf den Sauerstoff.',
    description:
      'Schwefeldioxid wird an einem Katalysator zu Schwefeltrioxid oxidiert – ein Zwischenschritt auf dem Weg zur Schwefelsäure.',
  },
  rxn_17: {
    name: 'Natrium in Wasser',
    hint: 'Gleiche den Wasserstoff zuerst über das Wasser und das Wasserstoffgas aus und prüf dann das Natrium.',
    description:
      'Natrium zischt über die Wasseroberfläche, setzt Wasserstoffgas frei und lässt eine alkalische Lösung zurück.',
    prompt:
      'Natriummetall reagiert mit flüssigem Wasser zu Natriumhydroxid-Lösung und Wasserstoffgas.',
  },
  rxn_32: {
    name: 'Neutralisation von Calciumhydroxid',
    hint: 'Behandle die Hydroxid-Gruppe als Einheit. Gleiche zuerst das Chlor aus und prüf dann Wasserstoff und Sauerstoff.',
    description:
      'Kalkwasser wird von Salzsäure neutralisiert; die Mischung erwärmt sich und der Indikator schlägt um.',
    prompt:
      'Calciumhydroxid-Lösung reagiert mit Salzsäure zu Calciumchlorid-Lösung und Wasser.',
  },
  rxn_18: {
    name: 'Ethanol-Verbrennung',
    hint: 'Gleiche zuerst den Kohlenstoff aus, dann den Wasserstoff, dann den Sauerstoff.',
    description:
      'Ethanol verbrennt mit sauberer blauer Flamme zu Kohlenstoffdioxid und Wasserdampf.',
  },
  rxn_09: {
    name: 'Thermit-Reaktion',
    hint: 'Fang mit dem Eisen und dem Aluminium an.',
    description:
      'Aluminium reißt dem Eisenoxid den Sauerstoff weg – ein Funkenregen, und übrig bleibt flüssiges Eisen.',
  },
  rxn_16: {
    name: 'Ostwald-Verfahren (Schritt 1)',
    hint: 'Gleiche Stickstoff und Wasserstoff aus, bevor du dich an den Sauerstoff machst.',
    description:
      'Ammoniak wird an heißem Platin oxidiert – der erste Schritt zur Herstellung von Salpetersäure.',
  },
  rxn_21: {
    name: 'Kupfer und Silbernitrat',
    hint: 'Gleiche die Nitrat-Gruppen als Einheit aus und prüf danach das Silber.',
    description:
      'Kupfer verdrängt Silber aus Silbernitrat: Auf dem Kupfer wachsen Silberkristalle und die Lösung färbt sich blau.',
  },
  rxn_23: {
    name: 'Herstellung von Bleichmittel',
    hint: 'Fang mit dem Chlor an und gleiche danach Natrium und Wasserstoff aus.',
    description:
      'Chlorgas wird von Natriumhydroxid-Lösung aufgenommen; dabei entsteht das Bleichmittel aus dem Haushalt.',
  },
  rxn_14: {
    name: 'Propan-Verbrennung',
    hint: 'Bei einer Verbrennung gleichst du zuerst den Kohlenstoff aus, dann den Wasserstoff, dann den Sauerstoff.',
    description:
      'Propan verbrennt in Sauerstoff mit heißer blauer Flamme zu Kohlenstoffdioxid und Wasserdampf.',
    prompt: 'Propangas verbrennt in Sauerstoffgas zu Kohlenstoffdioxidgas und Wasserdampf.',
  },
  rxn_22: {
    name: 'Goldregen-Reaktion',
    hint: 'Zähl jedes Element einzeln – auch die Nitrat-Gruppen, die mehrfach vorkommen.',
    description: 'Leuchtend gelbes Bleiiodid fällt aus und rieselt herab wie goldener Regen.',
  },
  rxn_33: {
    name: 'Aluminium in Schwefelsäure',
    hint: 'Behandle das Sulfat als Einheit: Drei Sulfate rechts bedeuten drei Säuremoleküle links. Prüf danach Aluminium und Wasserstoff.',
    description:
      'Aluminium löst sich langsam und unter Blasenbildung in warmer Schwefelsäure; Wasserstoffgas entweicht und Aluminiumsulfat bleibt gelöst zurück.',
    prompt:
      'Aluminiummetall reagiert mit Schwefelsäure zu Aluminiumsulfat-Lösung und Wasserstoffgas.',
  },
  rxn_02: {
    name: 'Zellatmung',
    hint: 'Gleiche zuerst den Kohlenstoff aus, dann den Wasserstoff, dann den Sauerstoff.',
    description:
      'Glucose reagiert in den Zellen mit Sauerstoff; dabei wird Energie frei und es entstehen Kohlenstoffdioxid und Wasser.',
  },
  rxn_03: {
    name: 'Fotosynthese',
    hint: 'Vergleich zuerst den Kohlenstoff, dann den Wasserstoff, dann den Sauerstoff.',
    description:
      'Pflanzen machen aus Kohlenstoffdioxid und Wasser mit Lichtenergie Glucose und setzen dabei Sauerstoff frei.',
  },
  rxn_10: {
    name: 'Zersetzung von Kalkstein',
    hint: 'Fang mit dem Calcium und dem Kohlenstoff an.',
    description: 'Calciumcarbonat zerfällt beim starken Erhitzen und gibt Kohlenstoffdioxidgas ab.',
  },
  rxn_12: {
    name: 'Magnesium in Schwefelsäure',
    hint: 'Such nach Elementen, die schon passen.',
    description: 'Magnesium löst sich in Schwefelsäure, während Blasen aus Wasserstoffgas aufsteigen.',
  },
  rxn_07: {
    name: 'Neutralisation von Salzsäure',
    hint: 'Zähl am besten ein Element nach dem anderen.',
    description:
      'Salzsäure reagiert mit Natriumhydroxid zu Natriumchlorid und Wasser; die Mischung erwärmt sich dabei.',
  },
  rxn_13: {
    name: 'Fällung von Silberchlorid',
    hint: 'Vergleich jedes Element auf beiden Seiten.',
    description:
      'In dem Moment, in dem die beiden klaren Lösungen zusammenkommen, fällt weißes Silberchlorid aus.',
  },
  rxn_11: {
    name: 'Natron und Essig',
    hint: 'Fang mit den Elementen an, die auf jeder Seite nur in einer Verbindung vorkommen.',
    description:
      'Natron schäumt in Essig auf, Kohlenstoffdioxidgas entweicht und Natriumacetat bleibt gelöst zurück.',
  },
  rxn_28: {
    name: 'Bildung von Ammoniumchlorid',
    hint: 'Vergleich Stickstoff, Wasserstoff und Chlor.',
    description:
      'Ammoniak und Chlorwasserstoff treffen als Gase aufeinander; dabei entsteht ein weißer Nebel aus Ammoniumchlorid.',
  },
  rxn_20: {
    name: 'Zersetzung von Kohlensäure',
    hint: 'Vergleich Wasserstoff, Kohlenstoff und Sauerstoff.',
    description:
      'Kohlensäure zerfällt zu Wasser und Kohlenstoffdioxid – deshalb wird Sprudel mit der Zeit schal.',
  },
  rxn_27: {
    name: 'Octan-Verbrennung',
    hint: 'Gleiche den Kohlenstoff zuerst aus, dann den Wasserstoff und zum Schluss den Sauerstoff.',
    description:
      'Octan verbrennt in Sauerstoff zu Kohlenstoffdioxid und Wasserdampf – die Reaktion in einem Benzinmotor.',
  },
};

/**
 * Lewis molecule prose, keyed by the id in lewis-molecules.ts. `bondLine` and
 * `formula` stay untranslated: they are notation.
 *
 * „Einzelelektron“ is the German for the game's coined "loner"; it is introduced
 * in the instructions and defined in the glossary, exactly as the English is.
 */
export const LEWIS_MOLECULE_TEXT_DE: Record<
  string,
  { name: string; tier2Hint: string; propertyLine: string }
> = {
  h2: {
    name: 'Wasserstoff',
    tier2Hint:
      'Jeder Wasserstoff hat ein Einzelelektron. Zwei Einzelelektronen von zwei Atomen ergeben ein bindendes Elektronenpaar.',
    propertyLine:
      'Wasserstoff – das leichteste Gas überhaupt. Die beiden Atome teilen sich ein Paar und sind damit beide bei 2 voll.',
  },
  cl2: {
    name: 'Chlor',
    tier2Hint:
      'Chlor hat 7 Außenelektronen: drei Paare und ein Einzelelektron. Jedes Chlor teilt dieses eine Einzelelektron.',
    propertyLine:
      'Chlor – ein gelbgrünes Gas. Jedes Chlor behält drei freie Elektronenpaare und teilt eines.',
  },
  hcl: {
    name: 'Chlorwasserstoff',
    tier2Hint:
      'Wasserstoff hat ein Einzelelektron und Chlor hat ein Einzelelektron, also teilen sie sich genau ein Paar.',
    propertyLine:
      'Chlorwasserstoff – ein Gas, das sich in Wasser löst; die Lösung heißt Salzsäure.',
  },
  h2o: {
    name: 'Wasser',
    tier2Hint:
      'Sauerstoff hat zwei Einzelelektronen und teilt deshalb mit beiden Wasserstoffatomen. Seine zwei Paare bleiben, wo sie sind.',
    propertyLine:
      'Wasser – bei Raumtemperatur flüssig; die gewinkelte Form, die du nächstes Jahr kennenlernst, kommt von den beiden freien Elektronenpaaren.',
  },
  nh3: {
    name: 'Ammoniak',
    tier2Hint:
      'Stickstoff hat drei Einzelelektronen und ein Paar, teilt also mit allen drei Wasserstoffatomen.',
    propertyLine:
      'Ammoniak – ein stechend riechendes Gas, aus dem Dünger gemacht wird. Stickstoff behält ein freies Elektronenpaar.',
  },
  ch4: {
    name: 'Methan',
    tier2Hint: 'Kohlenstoff hat vier Einzelelektronen und teilt deshalb mit allen vier Wasserstoffatomen.',
    propertyLine:
      'Methan – Erdgas. Kohlenstoff hat überhaupt kein freies Elektronenpaar: Jedes Außenelektron wird geteilt.',
  },
  h2s: {
    name: 'Schwefelwasserstoff',
    tier2Hint:
      'Schwefel steht in derselben Gruppe wie Sauerstoff und hat deshalb ebenfalls zwei Einzelelektronen und zwei Paare – bau ihn wie Wasser.',
    propertyLine:
      'Schwefelwasserstoff – das Gas, das nach faulen Eiern riecht. Gleiche Struktur wie Wasser, weil Schwefel unter dem Sauerstoff steht.',
  },
  ph3: {
    name: 'Phosphan',
    tier2Hint:
      'Phosphor steht in derselben Gruppe wie Stickstoff und hat deshalb drei Einzelelektronen – bau ihn wie Ammoniak.',
    propertyLine:
      'Phosphan – ein Gas, das an der Luft schwach leuchtet. Gleiche Struktur wie Ammoniak, weil Phosphor unter dem Stickstoff steht.',
  },
  o2: {
    name: 'Sauerstoff',
    tier2Hint:
      'Jeder Sauerstoff hat zwei Einzelelektronen. Nach dem ersten geteilten Paar hat jeder noch einen übrig – teil noch einmal, das gibt eine Doppelbindung.',
    propertyLine:
      'Sauerstoff – das Gas, das wir einatmen. Zwei geteilte Paare zwischen den Atomen ergeben eine Doppelbindung.',
  },
  co2: {
    name: 'Kohlenstoffdioxid',
    tier2Hint:
      'Kohlenstoff hat vier Einzelelektronen und jeder Sauerstoff zwei, also teilt der Kohlenstoff mit jedem Sauerstoff zweimal.',
    propertyLine:
      'Kohlenstoffdioxid – das Gas beim Verbrennen und beim Ausatmen. Zwei Doppelbindungen, und am Kohlenstoff kein freies Elektronenpaar.',
  },
  n2: {
    name: 'Stickstoff',
    tier2Hint:
      'Jeder Stickstoff hat drei Einzelelektronen. Teil alle drei zwischen denselben zwei Atomen – das gibt eine Dreifachbindung.',
    propertyLine:
      'Stickstoff – der größte Teil der Luft. Die Dreifachbindung ist so stark, dass Stickstoff kaum reagiert.',
  },
  c2h4: {
    name: 'Ethen',
    tier2Hint:
      'Jeder Kohlenstoff teilt mit zwei Wasserstoffatomen; danach haben die beiden Kohlenstoffatome noch je zwei Einzelelektronen – teil zweimal zwischen ihnen.',
    propertyLine:
      'Ethen – das Gas, das Obst reifen lässt und aus dem Polyethylen wird. Reagieren tut die Doppelbindung zwischen den Kohlenstoffatomen.',
  },
  c2h2: {
    name: 'Ethin',
    tier2Hint:
      'Jeder Kohlenstoff teilt ein Paar mit einem Wasserstoff; die drei Einzelelektronen, die jedem Kohlenstoff bleiben, ergeben eine Dreifachbindung.',
    propertyLine:
      'Ethin (Acetylen) – das Gas im Schweißbrenner. Zwischen den Kohlenstoffatomen sitzt eine Dreifachbindung.',
  },
  c2h6: {
    name: 'Ethan',
    tier2Hint:
      'Die beiden Kohlenstoffatome teilen ein Paar miteinander; danach teilt jeder Kohlenstoff seine drei übrigen Einzelelektronen mit drei Wasserstoffatomen.',
    propertyLine:
      'Ethan – steckt im Erdgas. Alle Bindungen sind Einfachbindungen und kein Atom hat ein freies Elektronenpaar.',
  },
  ccl4: {
    name: 'Tetrachlormethan',
    tier2Hint:
      'Kohlenstoff hat die meisten Einzelelektronen (vier), steht also in der Mitte und teilt mit jedem Chlor ein Paar.',
    propertyLine:
      'Tetrachlormethan – früher ein Reinigungsmittel in der Textilreinigung. Jedes Chlor behält drei freie Elektronenpaare.',
  },
  ch3cl: {
    name: 'Chlormethan',
    tier2Hint:
      'Kohlenstoff hat vier Einzelelektronen und steht deshalb in der Mitte: drei Paare teilt er mit Wasserstoffatomen, eines mit dem Chlor.',
    propertyLine:
      'Chlormethan – Methan, bei dem ein Wasserstoff gegen ein Chlor getauscht ist. Chlor behält drei freie Elektronenpaare.',
  },
  h2o2: {
    name: 'Wasserstoffperoxid',
    tier2Hint:
      'Wasserstoff kann nur einmal teilen, also müssen die beiden Sauerstoffatome miteinander teilen und sich danach je einen Wasserstoff holen.',
    propertyLine:
      'Wasserstoffperoxid – das Bleichmittel im Haarfärbemittel. Die Einfachbindung zwischen den beiden Sauerstoffatomen bricht leicht.',
  },
  c2h5oh: {
    name: 'Ethanol',
    tier2Hint:
      'Häng erst die beiden Kohlenstoffatome und den Sauerstoff aneinander (C-C-O), gib dann jedem Kohlenstoff seine Wasserstoffatome und dem Sauerstoff einen.',
    propertyLine:
      'Ethanol – der Alkohol in Getränken und im Handdesinfektionsmittel. Dass es sich mit Wasser mischt, liegt am O-H-Ende.',
  },
};
