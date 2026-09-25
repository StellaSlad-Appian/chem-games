// scripts/cheat-sheet-diagram-strings.mts
//
// Every word and number printed inside a cheat-sheet diagram, in every locale.
// `scripts/cheat-sheet-diagrams.mts` reads this table and writes one drawing
// per slot per locale; the page shows the reader's. This is a module, not a
// runnable script: importing it must have no effect.
//
// ## Writing a locale's strings
//
// Localise, do not translate: write each label the way a chemistry teacher in
// that country would, using the terms in `docs/i18n/glossary-<lang>.md`, and
// follow `docs/i18n/README.md` §4 for numbers — a decimal comma in de, fr, es,
// it and ru, and a no-break space (U+00A0) before `%` in de, fr, es and ru, and none in it (`12,5%`).
//
// - **Every locale has exactly the keys `en` has.** A missing or extra key
//   fails the run; nothing falls back to English.
// - **`{name}` is a whole number the script fills in** from the chemistry
//   constants at the top of the drawing script (17 protons, 35, 2 8 1 …). Move
//   it wherever the sentence needs it, but keep it. Only whole numbers under
//   1000 are ever filled in this way, because those are written the same in all
//   six languages. The words around a placeholder are yours, for that number:
//   Russian writes «11 протонов», not a plural rule.
// - **Every other number is written out here, in the locale's own format** —
//   `12,5 %`, `127,60`, `1/100 000`. The script parses it back with that
//   locale's separators and fails if it no longer equals the constant, so a
//   typo in a number is caught just as a missing key is. (A string still
//   identical to the English is parsed as English.)
// - **Each label has a fixed amount of room** in the drawing. The script
//   estimates every label's width and fails the run when one is wider than its
//   room, naming the slot, locale and key. Before shortening a word to fit,
//   read README §3a: the measurement constrains the layout that made the slot,
//   not the vocabulary, and moving or re-flowing the label is often the fix.
//   Each run prints the tightest label per slot so near-misses are visible.
// - A line that says `// TODO translate (task 5/6)` is still the English. Take
//   the marker off when the string is written; the run counts what is left.

import type { Locale } from '../src/i18n/config.ts';

export type SlotStrings = Record<Locale, Record<string, string>>;

/** Keyed by `<sheet slug>/<slot>`, the same key the page and the data use. */
export const DIAGRAM_STRINGS: Record<string, SlotStrings> = {
  'atomic-structure/01-inside-an-atom': {
    en: {
      electronCloud: 'electron cloud',
      nucleus: 'nucleus',
      proton: 'proton',
      neutron: 'neutron',
      scale: 'Not to scale: the nucleus is about 1/100,000 of the atom’s width.',
    },
    de: {
      electronCloud: 'Elektronenwolke',
      nucleus: 'Atomkern',
      proton: 'Proton',
      neutron: 'Neutron',
      scale: 'Nicht maßstabsgetreu: Der Kern hat nur etwa 1/100 000 des Atomdurchmessers.',
    },
    fr: {
      electronCloud: 'nuage électronique',
      nucleus: 'noyau',
      proton: 'proton',
      neutron: 'neutron',
      scale: 'Échelle non respectée : le noyau mesure environ 1/100 000 du diamètre de l’atome.',
    },
    es: {
      electronCloud: 'nube electrónica',
      nucleus: 'núcleo',
      proton: 'protón',
      neutron: 'neutrón',
      scale: 'No está a escala: el núcleo mide cerca de 1/100 000 del diámetro del átomo.',
    },
    it: {
      electronCloud: 'nube elettronica',
      nucleus: 'nucleo',
      proton: 'protone',
      neutron: 'neutrone',
      scale: 'Non in scala: il nucleo misura circa 1/100 000 del diametro dell’atomo.',
    },
    ru: {
      electronCloud: 'электронное облако',
      nucleus: 'ядро',
      proton: 'протон',
      neutron: 'нейтрон',
      scale: 'Масштаб не соблюдён: ядро примерно в 100 000 раз меньше атома по диаметру.',
    },
  },
  'atomic-structure/02-atomic-and-mass-number': {
    en: {
      massNumber: 'mass number = protons + neutrons',
      atomicNumber: 'atomic number = protons',
      subtraction: '{mass} − {atomic} = {neutrons} neutrons',
    },
    de: {
      massNumber: 'Massenzahl = Protonen + Neutronen',
      atomicNumber: 'Ordnungszahl = Protonen',
      subtraction: '{mass} − {atomic} = {neutrons} Neutronen',
    },
    fr: {
      massNumber: 'nombre de masse = protons + neutrons',
      atomicNumber: 'numéro atomique = protons',
      subtraction: '{mass} − {atomic} = {neutrons} neutrons',
    },
    es: {
      massNumber: 'número másico = protones + neutrones',
      atomicNumber: 'número atómico = protones',
      subtraction: '{mass} − {atomic} = {neutrons} neutrones',
    },
    it: {
      massNumber: 'numero di massa = protoni + neutroni',
      atomicNumber: 'numero atomico = protoni',
      subtraction: '{mass} − {atomic} = {neutrons} neutroni',
    },
    ru: {
      massNumber: 'массовое число = протоны + нейтроны',
      atomicNumber: 'атомный номер = протоны',
      subtraction: '{mass} − {atomic} = {neutrons} нейтронов',
    },
  },
  'atomic-structure/05-energy-levels': {
    en: {
      outerLevel: 'outer level',
      arrangement: '{first}, {second}, {third}',
      electrons: '{count} electrons',
      countNote: 'A way to count electrons, not a picture of an atom.',
    },
    de: {
      outerLevel: 'äußerste Stufe',
      arrangement: '{first}, {second}, {third}',
      electrons: '{count} Elektronen',
      countNote: 'Eine Art, Elektronen zu zählen – kein Bild eines Atoms.',
    },
    fr: {
      outerLevel: 'niveau extérieur',
      arrangement: '{first}, {second}, {third}',
      electrons: '{count} électrons',
      countNote: 'Une façon de compter les électrons, pas une image de l’atome.',
    },
    es: {
      outerLevel: 'nivel exterior',
      arrangement: '{first}, {second}, {third}',
      electrons: '{count} electrones',
      countNote: 'Una forma de contar electrones, no una imagen del átomo.',
    },
    it: {
      outerLevel: 'livello esterno',
      arrangement: '{first}, {second}, {third}',
      electrons: '{count} elettroni',
      countNote: 'Un modo per contare gli elettroni, non un’immagine dell’atomo.',
    },
    ru: {
      outerLevel: 'внешний уровень',
      arrangement: '{first}, {second}, {third}',
      electrons: '{count} электронов',
      countNote: 'Схема для подсчёта электронов, а не рисунок атома.',
    },
  },
  'atomic-structure/06-ordered-by-atomic-number': {
    en: {
      atomicNumber: 'atomic number',
      relativeAtomicMass: 'relative atomic mass',
      telluriumName: 'Tellurium',
      telluriumMass: '127.60',
      telluriumRank: 'heavier, but first',
      iodineName: 'Iodine',
      iodineMass: '126.90',
      iodineRank: 'lighter, but second',
    },
    de: {
      atomicNumber: 'Ordnungszahl',
      relativeAtomicMass: 'relative Atommasse',
      telluriumName: 'Tellur',
      telluriumMass: '127,60',
      telluriumRank: 'schwerer, steht aber vorn',
      iodineName: 'Iod',
      iodineMass: '126,90',
      iodineRank: 'leichter, steht aber dahinter',
    },
    fr: {
      atomicNumber: 'numéro atomique',
      relativeAtomicMass: 'masse atomique relative',
      telluriumName: 'Tellure',
      telluriumMass: '127,60',
      telluriumRank: 'plus lourd, mais placé avant',
      iodineName: 'Iode',
      iodineMass: '126,90',
      iodineRank: 'plus léger, mais placé après',
    },
    es: {
      atomicNumber: 'número atómico',
      relativeAtomicMass: 'masa atómica relativa',
      telluriumName: 'Teluro',
      telluriumMass: '127,60',
      telluriumRank: 'más pesado, pero va antes',
      iodineName: 'Yodo',
      iodineMass: '126,90',
      iodineRank: 'más ligero, pero va después',
    },
    it: {
      atomicNumber: 'numero atomico',
      relativeAtomicMass: 'massa atomica relativa',
      telluriumName: 'Tellurio',
      telluriumMass: '127,60',
      telluriumRank: 'più pesante, ma viene prima',
      iodineName: 'Iodio',
      iodineMass: '126,90',
      iodineRank: 'più leggero, ma viene dopo',
    },
    ru: {
      atomicNumber: 'атомный номер',
      relativeAtomicMass: 'относительная атомная масса',
      telluriumName: 'Теллур',
      telluriumMass: '127,60',
      telluriumRank: 'тяжелее, но стоит первым',
      iodineName: 'Иод',
      iodineMass: '126,90',
      iodineRank: 'легче, но стоит вторым',
    },
  },
  'isotopes-and-radioactivity/03-isotopes-of-hydrogen': {
    en: {
      proton: 'proton',
      neutron: 'neutron',
      electron: 'electron',
      isotopeName: 'hydrogen-{mass}',
      protium: 'protium',
      deuterium: 'deuterium',
      tritium: 'tritium',
      stable: 'stable',
      radioactive: 'radioactive',
    },
    de: {
      proton: 'Proton',
      neutron: 'Neutron',
      electron: 'Elektron',
      isotopeName: 'Wasserstoff-{mass}',
      protium: 'Protium',
      deuterium: 'Deuterium',
      tritium: 'Tritium',
      stable: 'stabil',
      radioactive: 'radioaktiv',
    },
    fr: {
      proton: 'proton',
      neutron: 'neutron',
      electron: 'électron',
      isotopeName: 'hydrogène {mass}',
      protium: 'protium',
      deuterium: 'deutérium',
      tritium: 'tritium',
      stable: 'stable',
      radioactive: 'radioactif',
    },
    es: {
      proton: 'protón',
      neutron: 'neutrón',
      electron: 'electrón',
      isotopeName: 'hidrógeno-{mass}',
      protium: 'protio',
      deuterium: 'deuterio',
      tritium: 'tritio',
      stable: 'estable',
      radioactive: 'radiactivo',
    },
    it: {
      proton: 'protone',
      neutron: 'neutrone',
      electron: 'elettrone',
      isotopeName: 'idrogeno-{mass}',
      protium: 'prozio',
      deuterium: 'deuterio',
      tritium: 'trizio',
      stable: 'stabile',
      radioactive: 'radioattivo',
    },
    ru: {
      proton: 'протон',
      neutron: 'нейтрон',
      electron: 'электрон',
      isotopeName: 'водород-{mass}',
      protium: 'протий',
      deuterium: 'дейтерий',
      tritium: 'тритий',
      stable: 'стабильный',
      radioactive: 'радиоактивный',
    },
  },
  'isotopes-and-radioactivity/07-decay-and-made-elements': {
    en: {
      axisAmount: 'undecayed nuclei',
      axisTime: 'time, in half-lives',
      percent0: '100%',
      percent1: '50%',
      percent2: '25%',
      percent3: '12.5%',
      percent4: '6.25%',
    },
    de: {
      axisAmount: 'noch nicht zerfallene Kerne',
      axisTime: 'Zeit in Halbwertszeiten',
      percent0: '100 %',
      percent1: '50 %',
      percent2: '25 %',
      percent3: '12,5 %',
      percent4: '6,25 %',
    },
    fr: {
      axisAmount: 'noyaux non désintégrés',
      axisTime: 'temps, en demi-vies',
      percent0: '100 %',
      percent1: '50 %',
      percent2: '25 %',
      percent3: '12,5 %',
      percent4: '6,25 %',
    },
    es: {
      axisAmount: 'núcleos sin desintegrar',
      axisTime: 'tiempo, en periodos de semidesintegración',
      percent0: '100 %',
      percent1: '50 %',
      percent2: '25 %',
      percent3: '12,5 %',
      percent4: '6,25 %',
    },
    it: {
      axisAmount: 'nuclei non ancora decaduti',
      axisTime: 'tempo, in tempi di dimezzamento',
      percent0: '100%',
      percent1: '50%',
      percent2: '25%',
      percent3: '12,5%',
      percent4: '6,25%',
    },
    ru: {
      axisAmount: 'нераспавшиеся ядра',
      axisTime: 'время в периодах полураспада',
      percent0: '100 %',
      percent1: '50 %',
      percent2: '25 %',
      percent3: '12,5 %',
      percent4: '6,25 %',
    },
  },
  // Formulae are written as `MoleculeText` takes them — plain digits, a charge
  // at the end — and the script sets them with real sub- and superscripts
  // (`formulaLabel`). A charge with digits follows its formula after a
  // no-break space, written ` ` so it can be seen: `Cr2O7 2−`.
  // Formulae and the state symbol (aq) are the same in every language; the
  // words round them are not.
  'functional-groups/01-reaction-map': {
    en: {
      alkene: 'alkene',
      haloalkane: 'haloalkane',
      primaryAlcohol: 'primary alcohol',
      secondaryAlcohol: 'secondary alcohol',
      aldehyde: 'aldehyde',
      ketone: 'ketone',
      carboxylicAcid: 'carboxylic acid',
      ester: 'ester',
      hydration: 'H2O, H3PO4 catalyst',
      addition: 'HX',
      substitution: 'OH− (aq)',
      oxidation: 'Cr2O7 2−/H+',
      esterification: 'alcohol, H2SO4 catalyst',
    },
    de: {
      alkene: 'Alken',
      haloalkane: 'Halogenalkan',
      primaryAlcohol: 'primärer Alkohol',
      secondaryAlcohol: 'sekundärer Alkohol',
      aldehyde: 'Aldehyd',
      ketone: 'Keton',
      carboxylicAcid: 'Carbonsäure',
      ester: 'Ester',
      hydration: 'H2O, H3PO4 als Katalysator',
      addition: 'HX',
      substitution: 'OH− (aq)',
      oxidation: 'Cr2O7 2−/H+',
      esterification: 'Alkohol, H2SO4 als Katalysator',
    },
    fr: {
      alkene: 'alcène',
      haloalkane: 'halogénoalcane',
      primaryAlcohol: 'alcool primaire',
      secondaryAlcohol: 'alcool secondaire',
      aldehyde: 'aldéhyde',
      ketone: 'cétone',
      carboxylicAcid: 'acide carboxylique',
      ester: 'ester',
      hydration: 'H2O, catalyseur H3PO4',
      addition: 'HX',
      substitution: 'OH− (aq)',
      oxidation: 'Cr2O7 2−/H+',
      esterification: 'alcool, catalyseur H2SO4',
    },
    es: {
      alkene: 'alqueno',
      haloalkane: 'haloalcano',
      primaryAlcohol: 'alcohol primario',
      secondaryAlcohol: 'alcohol secundario',
      aldehyde: 'aldehído',
      ketone: 'cetona',
      carboxylicAcid: 'ácido carboxílico',
      ester: 'éster',
      hydration: 'H2O, H3PO4 como catalizador',
      addition: 'HX',
      substitution: 'OH− (aq)',
      oxidation: 'Cr2O7 2−/H+',
      esterification: 'alcohol, H2SO4 como catalizador',
    },
    it: {
      alkene: 'alchene',
      haloalkane: 'alogenuro alchilico',
      primaryAlcohol: 'alcol primario',
      secondaryAlcohol: 'alcol secondario',
      aldehyde: 'aldeide',
      ketone: 'chetone',
      carboxylicAcid: 'acido carbossilico',
      ester: 'estere',
      hydration: 'H2O, H3PO4 come catalizzatore',
      addition: 'HX',
      substitution: 'OH− (aq)',
      oxidation: 'Cr2O7 2−/H+',
      esterification: 'alcol, H2SO4 come catalizzatore',
    },
    ru: {
      alkene: 'алкен',
      haloalkane: 'галогеналкан',
      primaryAlcohol: 'первичный спирт',
      secondaryAlcohol: 'вторичный спирт',
      aldehyde: 'альдегид',
      ketone: 'кетон',
      carboxylicAcid: 'карбоновая кислота',
      ester: 'сложный эфир',
      hydration: 'H2O, катализатор H3PO4',
      addition: 'HX',
      substitution: 'OH− (aq)',
      oxidation: 'Cr2O7 2−/H+',
      esterification: 'спирт, катализатор H2SO4',
    },
  },
};
