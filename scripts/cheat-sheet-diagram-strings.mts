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
      electrons: 'Electrons',
      electronsLine1: 'are somewhere in this',
      electronsLine2: 'fuzzy region — never',
      electronsLine3: 'on a track or an orbit.',
      nucleus: 'Nucleus',
      nucleusLine1: 'protons and neutrons,',
      nucleusLine2: 'and nearly all the mass.',
      keyProton: 'filled = proton',
      keyNeutron: 'hollow = neutron',
      scaleLine1: 'Nothing here is to scale. A real nucleus is about',
      scaleLine2: '1/100,000 of the atom — far too small to draw.',
    },
    de: {
      electrons: 'Electrons', // TODO translate (task 5/6)
      electronsLine1: 'are somewhere in this', // TODO translate (task 5/6)
      electronsLine2: 'fuzzy region — never', // TODO translate (task 5/6)
      electronsLine3: 'on a track or an orbit.', // TODO translate (task 5/6)
      nucleus: 'Nucleus', // TODO translate (task 5/6)
      nucleusLine1: 'protons and neutrons,', // TODO translate (task 5/6)
      nucleusLine2: 'and nearly all the mass.', // TODO translate (task 5/6)
      keyProton: 'filled = proton', // TODO translate (task 5/6)
      keyNeutron: 'hollow = neutron', // TODO translate (task 5/6)
      scaleLine1: 'Nothing here is to scale. A real nucleus is about', // TODO translate (task 5/6)
      scaleLine2: '1/100,000 of the atom — far too small to draw.', // TODO translate (task 5/6)
    },
    fr: {
      electrons: 'Electrons', // TODO translate (task 5/6)
      electronsLine1: 'are somewhere in this', // TODO translate (task 5/6)
      electronsLine2: 'fuzzy region — never', // TODO translate (task 5/6)
      electronsLine3: 'on a track or an orbit.', // TODO translate (task 5/6)
      nucleus: 'Nucleus', // TODO translate (task 5/6)
      nucleusLine1: 'protons and neutrons,', // TODO translate (task 5/6)
      nucleusLine2: 'and nearly all the mass.', // TODO translate (task 5/6)
      keyProton: 'filled = proton', // TODO translate (task 5/6)
      keyNeutron: 'hollow = neutron', // TODO translate (task 5/6)
      scaleLine1: 'Nothing here is to scale. A real nucleus is about', // TODO translate (task 5/6)
      scaleLine2: '1/100,000 of the atom — far too small to draw.', // TODO translate (task 5/6)
    },
    es: {
      electrons: 'Electrons', // TODO translate (task 5/6)
      electronsLine1: 'are somewhere in this', // TODO translate (task 5/6)
      electronsLine2: 'fuzzy region — never', // TODO translate (task 5/6)
      electronsLine3: 'on a track or an orbit.', // TODO translate (task 5/6)
      nucleus: 'Nucleus', // TODO translate (task 5/6)
      nucleusLine1: 'protons and neutrons,', // TODO translate (task 5/6)
      nucleusLine2: 'and nearly all the mass.', // TODO translate (task 5/6)
      keyProton: 'filled = proton', // TODO translate (task 5/6)
      keyNeutron: 'hollow = neutron', // TODO translate (task 5/6)
      scaleLine1: 'Nothing here is to scale. A real nucleus is about', // TODO translate (task 5/6)
      scaleLine2: '1/100,000 of the atom — far too small to draw.', // TODO translate (task 5/6)
    },
    it: {
      electrons: 'Electrons', // TODO translate (task 5/6)
      electronsLine1: 'are somewhere in this', // TODO translate (task 5/6)
      electronsLine2: 'fuzzy region — never', // TODO translate (task 5/6)
      electronsLine3: 'on a track or an orbit.', // TODO translate (task 5/6)
      nucleus: 'Nucleus', // TODO translate (task 5/6)
      nucleusLine1: 'protons and neutrons,', // TODO translate (task 5/6)
      nucleusLine2: 'and nearly all the mass.', // TODO translate (task 5/6)
      keyProton: 'filled = proton', // TODO translate (task 5/6)
      keyNeutron: 'hollow = neutron', // TODO translate (task 5/6)
      scaleLine1: 'Nothing here is to scale. A real nucleus is about', // TODO translate (task 5/6)
      scaleLine2: '1/100,000 of the atom — far too small to draw.', // TODO translate (task 5/6)
    },
    ru: {
      electrons: 'Electrons', // TODO translate (task 5/6)
      electronsLine1: 'are somewhere in this', // TODO translate (task 5/6)
      electronsLine2: 'fuzzy region — never', // TODO translate (task 5/6)
      electronsLine3: 'on a track or an orbit.', // TODO translate (task 5/6)
      nucleus: 'Nucleus', // TODO translate (task 5/6)
      nucleusLine1: 'protons and neutrons,', // TODO translate (task 5/6)
      nucleusLine2: 'and nearly all the mass.', // TODO translate (task 5/6)
      keyProton: 'filled = proton', // TODO translate (task 5/6)
      keyNeutron: 'hollow = neutron', // TODO translate (task 5/6)
      scaleLine1: 'Nothing here is to scale. A real nucleus is about', // TODO translate (task 5/6)
      scaleLine2: '1/100,000 of the atom — far too small to draw.', // TODO translate (task 5/6)
    },
  },
  'atomic-structure/02-atomic-and-mass-number': {
    en: {
      title: 'Atomic number and mass number',
      massNumber: 'mass number {mass}',
      massNumberMeaning: 'protons + neutrons',
      atomicNumber: 'atomic number {atomic}',
      atomicLine1: '{atomic} protons, which is',
      atomicLine2: 'what makes it chlorine',
      subtraction: '{mass} − {atomic} = {neutrons} neutrons',
    },
    de: {
      title: 'Atomic number and mass number', // TODO translate (task 5/6)
      massNumber: 'mass number {mass}', // TODO translate (task 5/6)
      massNumberMeaning: 'protons + neutrons', // TODO translate (task 5/6)
      atomicNumber: 'atomic number {atomic}', // TODO translate (task 5/6)
      atomicLine1: '{atomic} protons, which is', // TODO translate (task 5/6)
      atomicLine2: 'what makes it chlorine', // TODO translate (task 5/6)
      subtraction: '{mass} − {atomic} = {neutrons} neutrons', // TODO translate (task 5/6)
    },
    fr: {
      title: 'Atomic number and mass number', // TODO translate (task 5/6)
      massNumber: 'mass number {mass}', // TODO translate (task 5/6)
      massNumberMeaning: 'protons + neutrons', // TODO translate (task 5/6)
      atomicNumber: 'atomic number {atomic}', // TODO translate (task 5/6)
      atomicLine1: '{atomic} protons, which is', // TODO translate (task 5/6)
      atomicLine2: 'what makes it chlorine', // TODO translate (task 5/6)
      subtraction: '{mass} − {atomic} = {neutrons} neutrons', // TODO translate (task 5/6)
    },
    es: {
      title: 'Atomic number and mass number', // TODO translate (task 5/6)
      massNumber: 'mass number {mass}', // TODO translate (task 5/6)
      massNumberMeaning: 'protons + neutrons', // TODO translate (task 5/6)
      atomicNumber: 'atomic number {atomic}', // TODO translate (task 5/6)
      atomicLine1: '{atomic} protons, which is', // TODO translate (task 5/6)
      atomicLine2: 'what makes it chlorine', // TODO translate (task 5/6)
      subtraction: '{mass} − {atomic} = {neutrons} neutrons', // TODO translate (task 5/6)
    },
    it: {
      title: 'Atomic number and mass number', // TODO translate (task 5/6)
      massNumber: 'mass number {mass}', // TODO translate (task 5/6)
      massNumberMeaning: 'protons + neutrons', // TODO translate (task 5/6)
      atomicNumber: 'atomic number {atomic}', // TODO translate (task 5/6)
      atomicLine1: '{atomic} protons, which is', // TODO translate (task 5/6)
      atomicLine2: 'what makes it chlorine', // TODO translate (task 5/6)
      subtraction: '{mass} − {atomic} = {neutrons} neutrons', // TODO translate (task 5/6)
    },
    ru: {
      title: 'Atomic number and mass number', // TODO translate (task 5/6)
      massNumber: 'mass number {mass}', // TODO translate (task 5/6)
      massNumberMeaning: 'protons + neutrons', // TODO translate (task 5/6)
      atomicNumber: 'atomic number {atomic}', // TODO translate (task 5/6)
      atomicLine1: '{atomic} protons, which is', // TODO translate (task 5/6)
      atomicLine2: 'what makes it chlorine', // TODO translate (task 5/6)
      subtraction: '{mass} − {atomic} = {neutrons} neutrons', // TODO translate (task 5/6)
    },
  },
  'atomic-structure/05-energy-levels': {
    en: {
      nucleusCounts: '{protons} protons, {neutrons} neutrons',
      arrangement: '{first}, {second}, {third}',
      outerLast: 'outer level last',
      level1: 'level 1: {count} electrons',
      level2: 'level 2: {count} electrons',
      level3: 'level 3: {count} electron',
      countNote: 'A way to count electrons, not a picture of an atom.',
      scaleNote: 'The nucleus is drawn about 100,000 times too big.',
    },
    de: {
      nucleusCounts: '{protons} protons, {neutrons} neutrons', // TODO translate (task 5/6)
      arrangement: '{first}, {second}, {third}', // TODO translate (task 5/6)
      outerLast: 'outer level last', // TODO translate (task 5/6)
      level1: 'level 1: {count} electrons', // TODO translate (task 5/6)
      level2: 'level 2: {count} electrons', // TODO translate (task 5/6)
      level3: 'level 3: {count} electron', // TODO translate (task 5/6)
      countNote: 'A way to count electrons, not a picture of an atom.', // TODO translate (task 5/6)
      scaleNote: 'The nucleus is drawn about 100,000 times too big.', // TODO translate (task 5/6)
    },
    fr: {
      nucleusCounts: '{protons} protons, {neutrons} neutrons', // TODO translate (task 5/6)
      arrangement: '{first}, {second}, {third}', // TODO translate (task 5/6)
      outerLast: 'outer level last', // TODO translate (task 5/6)
      level1: 'level 1: {count} electrons', // TODO translate (task 5/6)
      level2: 'level 2: {count} electrons', // TODO translate (task 5/6)
      level3: 'level 3: {count} electron', // TODO translate (task 5/6)
      countNote: 'A way to count electrons, not a picture of an atom.', // TODO translate (task 5/6)
      scaleNote: 'The nucleus is drawn about 100,000 times too big.', // TODO translate (task 5/6)
    },
    es: {
      nucleusCounts: '{protons} protons, {neutrons} neutrons', // TODO translate (task 5/6)
      arrangement: '{first}, {second}, {third}', // TODO translate (task 5/6)
      outerLast: 'outer level last', // TODO translate (task 5/6)
      level1: 'level 1: {count} electrons', // TODO translate (task 5/6)
      level2: 'level 2: {count} electrons', // TODO translate (task 5/6)
      level3: 'level 3: {count} electron', // TODO translate (task 5/6)
      countNote: 'A way to count electrons, not a picture of an atom.', // TODO translate (task 5/6)
      scaleNote: 'The nucleus is drawn about 100,000 times too big.', // TODO translate (task 5/6)
    },
    it: {
      nucleusCounts: '{protons} protons, {neutrons} neutrons', // TODO translate (task 5/6)
      arrangement: '{first}, {second}, {third}', // TODO translate (task 5/6)
      outerLast: 'outer level last', // TODO translate (task 5/6)
      level1: 'level 1: {count} electrons', // TODO translate (task 5/6)
      level2: 'level 2: {count} electrons', // TODO translate (task 5/6)
      level3: 'level 3: {count} electron', // TODO translate (task 5/6)
      countNote: 'A way to count electrons, not a picture of an atom.', // TODO translate (task 5/6)
      scaleNote: 'The nucleus is drawn about 100,000 times too big.', // TODO translate (task 5/6)
    },
    ru: {
      nucleusCounts: '{protons} protons, {neutrons} neutrons', // TODO translate (task 5/6)
      arrangement: '{first}, {second}, {third}', // TODO translate (task 5/6)
      outerLast: 'outer level last', // TODO translate (task 5/6)
      level1: 'level 1: {count} electrons', // TODO translate (task 5/6)
      level2: 'level 2: {count} electrons', // TODO translate (task 5/6)
      level3: 'level 3: {count} electron', // TODO translate (task 5/6)
      countNote: 'A way to count electrons, not a picture of an atom.', // TODO translate (task 5/6)
      scaleNote: 'The nucleus is drawn about 100,000 times too big.', // TODO translate (task 5/6)
    },
  },
  'atomic-structure/06-ordered-by-atomic-number': {
    en: {
      title: 'Ordered by atomic number, not by mass',
      subtitle: 'The small number counts the protons.',
      telluriumName: 'Tellurium',
      telluriumMass: '127.60',
      telluriumRank: 'heavier, but first',
      iodineName: 'Iodine',
      iodineMass: '126.90',
      iodineRank: 'lighter, but second',
      conclusion: 'Tellurium has one proton fewer, so it goes first.',
    },
    de: {
      title: 'Ordered by atomic number, not by mass', // TODO translate (task 5/6)
      subtitle: 'The small number counts the protons.', // TODO translate (task 5/6)
      telluriumName: 'Tellurium', // TODO translate (task 5/6)
      telluriumMass: '127.60', // TODO translate (task 5/6)
      telluriumRank: 'heavier, but first', // TODO translate (task 5/6)
      iodineName: 'Iodine', // TODO translate (task 5/6)
      iodineMass: '126.90', // TODO translate (task 5/6)
      iodineRank: 'lighter, but second', // TODO translate (task 5/6)
      conclusion: 'Tellurium has one proton fewer, so it goes first.', // TODO translate (task 5/6)
    },
    fr: {
      title: 'Ordered by atomic number, not by mass', // TODO translate (task 5/6)
      subtitle: 'The small number counts the protons.', // TODO translate (task 5/6)
      telluriumName: 'Tellurium', // TODO translate (task 5/6)
      telluriumMass: '127.60', // TODO translate (task 5/6)
      telluriumRank: 'heavier, but first', // TODO translate (task 5/6)
      iodineName: 'Iodine', // TODO translate (task 5/6)
      iodineMass: '126.90', // TODO translate (task 5/6)
      iodineRank: 'lighter, but second', // TODO translate (task 5/6)
      conclusion: 'Tellurium has one proton fewer, so it goes first.', // TODO translate (task 5/6)
    },
    es: {
      title: 'Ordered by atomic number, not by mass', // TODO translate (task 5/6)
      subtitle: 'The small number counts the protons.', // TODO translate (task 5/6)
      telluriumName: 'Tellurium', // TODO translate (task 5/6)
      telluriumMass: '127.60', // TODO translate (task 5/6)
      telluriumRank: 'heavier, but first', // TODO translate (task 5/6)
      iodineName: 'Iodine', // TODO translate (task 5/6)
      iodineMass: '126.90', // TODO translate (task 5/6)
      iodineRank: 'lighter, but second', // TODO translate (task 5/6)
      conclusion: 'Tellurium has one proton fewer, so it goes first.', // TODO translate (task 5/6)
    },
    it: {
      title: 'Ordered by atomic number, not by mass', // TODO translate (task 5/6)
      subtitle: 'The small number counts the protons.', // TODO translate (task 5/6)
      telluriumName: 'Tellurium', // TODO translate (task 5/6)
      telluriumMass: '127.60', // TODO translate (task 5/6)
      telluriumRank: 'heavier, but first', // TODO translate (task 5/6)
      iodineName: 'Iodine', // TODO translate (task 5/6)
      iodineMass: '126.90', // TODO translate (task 5/6)
      iodineRank: 'lighter, but second', // TODO translate (task 5/6)
      conclusion: 'Tellurium has one proton fewer, so it goes first.', // TODO translate (task 5/6)
    },
    ru: {
      title: 'Ordered by atomic number, not by mass', // TODO translate (task 5/6)
      subtitle: 'The small number counts the protons.', // TODO translate (task 5/6)
      telluriumName: 'Tellurium', // TODO translate (task 5/6)
      telluriumMass: '127.60', // TODO translate (task 5/6)
      telluriumRank: 'heavier, but first', // TODO translate (task 5/6)
      iodineName: 'Iodine', // TODO translate (task 5/6)
      iodineMass: '126.90', // TODO translate (task 5/6)
      iodineRank: 'lighter, but second', // TODO translate (task 5/6)
      conclusion: 'Tellurium has one proton fewer, so it goes first.', // TODO translate (task 5/6)
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
