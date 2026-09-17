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
