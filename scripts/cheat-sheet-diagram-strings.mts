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
// it and ru, and a no-break space (U+00A0) before `%` in de, fr and ru.
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
      title: 'All three are hydrogen: 1 proton, 1 electron.',
      key: 'Filled = proton, hollow = neutron, outer mark = electron.',
      isotopeName: 'hydrogen-{mass}',
      oneProton: '1 proton',
      oneNeutron: '1 neutron',
      twoNeutrons: '2 neutrons',
    },
    de: {
      title: 'All three are hydrogen: 1 proton, 1 electron.', // TODO translate (task 5/6)
      key: 'Filled = proton, hollow = neutron, outer mark = electron.', // TODO translate (task 5/6)
      isotopeName: 'hydrogen-{mass}', // TODO translate (task 5/6)
      oneProton: '1 proton', // TODO translate (task 5/6)
      oneNeutron: '1 neutron', // TODO translate (task 5/6)
      twoNeutrons: '2 neutrons', // TODO translate (task 5/6)
    },
    fr: {
      title: 'All three are hydrogen: 1 proton, 1 electron.', // TODO translate (task 5/6)
      key: 'Filled = proton, hollow = neutron, outer mark = electron.', // TODO translate (task 5/6)
      isotopeName: 'hydrogen-{mass}', // TODO translate (task 5/6)
      oneProton: '1 proton', // TODO translate (task 5/6)
      oneNeutron: '1 neutron', // TODO translate (task 5/6)
      twoNeutrons: '2 neutrons', // TODO translate (task 5/6)
    },
    es: {
      title: 'All three are hydrogen: 1 proton, 1 electron.', // TODO translate (task 5/6)
      key: 'Filled = proton, hollow = neutron, outer mark = electron.', // TODO translate (task 5/6)
      isotopeName: 'hydrogen-{mass}', // TODO translate (task 5/6)
      oneProton: '1 proton', // TODO translate (task 5/6)
      oneNeutron: '1 neutron', // TODO translate (task 5/6)
      twoNeutrons: '2 neutrons', // TODO translate (task 5/6)
    },
    it: {
      title: 'All three are hydrogen: 1 proton, 1 electron.', // TODO translate (task 5/6)
      key: 'Filled = proton, hollow = neutron, outer mark = electron.', // TODO translate (task 5/6)
      isotopeName: 'hydrogen-{mass}', // TODO translate (task 5/6)
      oneProton: '1 proton', // TODO translate (task 5/6)
      oneNeutron: '1 neutron', // TODO translate (task 5/6)
      twoNeutrons: '2 neutrons', // TODO translate (task 5/6)
    },
    ru: {
      title: 'All three are hydrogen: 1 proton, 1 electron.', // TODO translate (task 5/6)
      key: 'Filled = proton, hollow = neutron, outer mark = electron.', // TODO translate (task 5/6)
      isotopeName: 'hydrogen-{mass}', // TODO translate (task 5/6)
      oneProton: '1 proton', // TODO translate (task 5/6)
      oneNeutron: '1 neutron', // TODO translate (task 5/6)
      twoNeutrons: '2 neutrons', // TODO translate (task 5/6)
    },
  },
  'isotopes-and-radioactivity/07-decay-and-made-elements': {
    en: {
      title: 'Half-life: half of what is left, every time',
      axisAmount: 'how much is left',
      axisTime: 'half-lives',
      percent0: '100%',
      percent1: '50%',
      percent2: '25%',
      percent3: '12.5%',
      eighth: 'After 3 half-lives, an eighth is left.',
      carbon: 'Carbon-14: one half-life is 5730 years.',
      uranium: 'Uranium-238: one half-life is 4.5 billion years.',
    },
    de: {
      title: 'Half-life: half of what is left, every time', // TODO translate (task 5/6)
      axisAmount: 'how much is left', // TODO translate (task 5/6)
      axisTime: 'half-lives', // TODO translate (task 5/6)
      percent0: '100%', // TODO translate (task 5/6)
      percent1: '50%', // TODO translate (task 5/6)
      percent2: '25%', // TODO translate (task 5/6)
      percent3: '12.5%', // TODO translate (task 5/6)
      eighth: 'After 3 half-lives, an eighth is left.', // TODO translate (task 5/6)
      carbon: 'Carbon-14: one half-life is 5730 years.', // TODO translate (task 5/6)
      uranium: 'Uranium-238: one half-life is 4.5 billion years.', // TODO translate (task 5/6)
    },
    fr: {
      title: 'Half-life: half of what is left, every time', // TODO translate (task 5/6)
      axisAmount: 'how much is left', // TODO translate (task 5/6)
      axisTime: 'half-lives', // TODO translate (task 5/6)
      percent0: '100%', // TODO translate (task 5/6)
      percent1: '50%', // TODO translate (task 5/6)
      percent2: '25%', // TODO translate (task 5/6)
      percent3: '12.5%', // TODO translate (task 5/6)
      eighth: 'After 3 half-lives, an eighth is left.', // TODO translate (task 5/6)
      carbon: 'Carbon-14: one half-life is 5730 years.', // TODO translate (task 5/6)
      uranium: 'Uranium-238: one half-life is 4.5 billion years.', // TODO translate (task 5/6)
    },
    es: {
      title: 'Half-life: half of what is left, every time', // TODO translate (task 5/6)
      axisAmount: 'how much is left', // TODO translate (task 5/6)
      axisTime: 'half-lives', // TODO translate (task 5/6)
      percent0: '100%', // TODO translate (task 5/6)
      percent1: '50%', // TODO translate (task 5/6)
      percent2: '25%', // TODO translate (task 5/6)
      percent3: '12.5%', // TODO translate (task 5/6)
      eighth: 'After 3 half-lives, an eighth is left.', // TODO translate (task 5/6)
      carbon: 'Carbon-14: one half-life is 5730 years.', // TODO translate (task 5/6)
      uranium: 'Uranium-238: one half-life is 4.5 billion years.', // TODO translate (task 5/6)
    },
    it: {
      title: 'Half-life: half of what is left, every time', // TODO translate (task 5/6)
      axisAmount: 'how much is left', // TODO translate (task 5/6)
      axisTime: 'half-lives', // TODO translate (task 5/6)
      percent0: '100%', // TODO translate (task 5/6)
      percent1: '50%', // TODO translate (task 5/6)
      percent2: '25%', // TODO translate (task 5/6)
      percent3: '12.5%', // TODO translate (task 5/6)
      eighth: 'After 3 half-lives, an eighth is left.', // TODO translate (task 5/6)
      carbon: 'Carbon-14: one half-life is 5730 years.', // TODO translate (task 5/6)
      uranium: 'Uranium-238: one half-life is 4.5 billion years.', // TODO translate (task 5/6)
    },
    ru: {
      title: 'Half-life: half of what is left, every time', // TODO translate (task 5/6)
      axisAmount: 'how much is left', // TODO translate (task 5/6)
      axisTime: 'half-lives', // TODO translate (task 5/6)
      percent0: '100%', // TODO translate (task 5/6)
      percent1: '50%', // TODO translate (task 5/6)
      percent2: '25%', // TODO translate (task 5/6)
      percent3: '12.5%', // TODO translate (task 5/6)
      eighth: 'After 3 half-lives, an eighth is left.', // TODO translate (task 5/6)
      carbon: 'Carbon-14: one half-life is 5730 years.', // TODO translate (task 5/6)
      uranium: 'Uranium-238: one half-life is 4.5 billion years.', // TODO translate (task 5/6)
    },
  },
};
