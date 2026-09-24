// src/lib/cheat-sheet-data.ts

import type {
  CheatSheetResource,
  CheatSheetTable,
  CheatSheetTopic,
  GameName,
} from '@/core-engine/types/general';
import { POLYATOMIC_IONS } from '@/core-engine/data/ions';

// ---------------------------------------------------------------------------
// Shared resources (all URLs verified 2026-09-13)
// ---------------------------------------------------------------------------

const VCAA_DATA_BOOK: CheatSheetResource = {
  label: 'VCAA VCE Chemistry Data Book (2026)',
  url: 'https://www.vcaa.vic.edu.au/sites/default/files/2026-02/2026-ChemistryDataBook.pdf',
  description: 'The exact tables you get in the exam: periodic table, polyatomic ions, IR/NMR data, constants.',
  audience: 'student',
};

const VCAA_STUDY_DESIGN: CheatSheetResource = {
  label: 'VCAA VCE Chemistry Study Design',
  url: 'https://www.vcaa.vic.edu.au/curriculum/vce/vce-study-designs/chemistry/Pages/index.aspx',
  description: 'Official key knowledge and skills for Units 1–4 (2023–2027).',
  audience: 'teacher',
};

const KHAN_HS_CHEM: CheatSheetResource = {
  label: 'Khan Academy — High School Chemistry',
  url: 'https://www.khanacademy.org/science/hs-chemistry',
  description: 'Short videos and practice exercises; good for a second explanation of any topic here.',
  audience: 'student',
};

const LIBRETEXTS: CheatSheetResource = {
  label: 'Chemistry LibreTexts',
  url: 'https://chem.libretexts.org/',
  description: 'Free open textbook; search any concept for a deeper, exam-level explanation.',
  audience: 'student',
};

const CHEMGUIDE: CheatSheetResource = {
  label: 'Chemguide (Jim Clark)',
  url: 'https://www.chemguide.co.uk/',
  description: 'Clear, no-nonsense explanations, especially strong for organic mechanisms and bonding.',
  audience: 'student',
};

const PTABLE: CheatSheetResource = {
  label: 'Ptable — interactive periodic table',
  url: 'https://ptable.com/',
  description: 'Click any element for electron configuration, electronegativity and common ions.',
  audience: 'student',
};

const RSC_PTABLE: CheatSheetResource = {
  label: 'Royal Society of Chemistry periodic table',
  url: 'https://www.rsc.org/periodic-table',
  description: 'Reliable element data with history and uses — good for projects.',
  audience: 'student',
};

const MOLVIEW: CheatSheetResource = {
  label: 'MolView',
  url: 'https://molview.org/',
  description: 'Draw a molecule and see it in 3D; shows bonds, geometry and the IUPAC name.',
  audience: 'student',
};

const PUBCHEM: CheatSheetResource = {
  label: 'PubChem',
  url: 'https://pubchem.ncbi.nlm.nih.gov/',
  description: 'Look up any compound: structure, IUPAC name, molar mass, properties.',
  audience: 'student',
};

const IUPAC_GOLD_BOOK: CheatSheetResource = {
  label: 'IUPAC Gold Book',
  url: 'https://goldbook.iupac.org/',
  description: 'The authoritative definitions of chemistry terms.',
  audience: 'teacher',
};

/**
 * The source for the 65,000-year dating section on the isotopes sheet.
 *
 * VC2S10U06's elaboration asks for radiocarbon and optically stimulated
 * luminescence "establishing that Aboriginal and Torres Strait Islander Peoples
 * have been present on the Australian continent for at least 65,000 years", and
 * this is the peer-reviewed paper that figure comes from — the Madjedbebe
 * excavation on Mirarr Country, dated by OSL on the sediments and radiocarbon
 * on charcoal. Cited rather than paraphrased from memory, because a
 * cross-curriculum priority elaboration is the last place to assert a number
 * without saying where it came from. The abstract is readable without a
 * subscription; the full text is not, which the description says.
 */
const MADJEDBEBE: CheatSheetResource = {
  label: 'Clarkson et al. (2017), “Human occupation of northern Australia by 65,000 years ago”, Nature 547',
  url: 'https://www.nature.com/articles/nature22968',
  description:
    'The excavation and the dating behind the 65,000-year figure, at Madjedbebe on Mirarr Country. (Abstract free; full text behind a paywall.)',
  audience: 'teacher',
};

const PHET = (slug: string, label: string, description: string): CheatSheetResource => ({
  label: `PhET simulation — ${label}`,
  url: `https://phet.colorado.edu/en/simulations/${slug}`,
  description,
  audience: 'student',
});

// ---------------------------------------------------------------------------
// Polyatomic ion lookup table — generated from the core-engine registry so the
// cheat sheet can never drift from the data the games use.
// ---------------------------------------------------------------------------

// Ions kept in the registry for older game data but not in the VCE data book.
const NON_VCE_ION_IDS = new Set(['22', '23', '24']);

const ION_DISPLAY_NAMES: Record<string, string> = {
  Bicarbonate: 'Hydrogen carbonate (bicarbonate)',
  Bisulfite: 'Hydrogen sulfite (bisulfite)',
  Bisulfate: 'Hydrogen sulfate (bisulfate)',
};

function formatIonFormula(formula: string, charge: number): string {
  const magnitude = Math.abs(charge);
  const sign = charge > 0 ? '+' : '-';
  // MoleculeText treats a trailing "+"/"-" on the same token as a superscript;
  // multi-digit charges need a space so the digit isn't read as a subscript.
  return magnitude === 1 ? `${formula}${sign}` : `${formula} ${magnitude}${sign}`;
}

function formatCharge(charge: number): string {
  const magnitude = Math.abs(charge);
  const sign = charge > 0 ? '+' : '−';
  return magnitude === 1 ? sign : `${magnitude}${sign}`;
}

export const POLYATOMIC_ION_TABLE: CheatSheetTable = {
  heading: 'Polyatomic ions (VCE data book set)',
  caption: 'Cations first, then anions grouped by charge. Names in brackets are older names you may still see.',
  columns: ['Name', 'Formula', 'Charge'],
  formulaColumns: [1],
  rows: [...POLYATOMIC_IONS]
    .filter((ion) => !NON_VCE_ION_IDS.has(ion.id))
    .sort((a, b) => b.charge - a.charge || a.name.localeCompare(b.name))
    .map((ion) => [
      ION_DISPLAY_NAMES[ion.name] ?? ion.name,
      formatIonFormula(ion.formula, ion.charge),
      formatCharge(ion.charge),
    ]),
};

// ---------------------------------------------------------------------------
// Game links used by the "Practise this" panel
// ---------------------------------------------------------------------------

export const GAME_LINKS: Partial<Record<GameName, { title: string; href: string }>> = {
  'acid-classification': { title: 'Acid or Base?', href: '/games/acid-classification' },
  'formula-blaster': { title: 'Formula Blaster', href: '/games/formula-blaster' },
  neutralise: { title: 'Neutralise!', href: '/games/neutralise' },
  'reaction-balancer': { title: 'Reaction Balancer', href: '/games/reaction-balancer' },
  'lewis-structures': { title: 'Share to Fill', href: '/games/lewis-structures' },
};

// ---------------------------------------------------------------------------
// Cheat sheets
// ---------------------------------------------------------------------------

/**
 * Folder holding this sheet's diagrams, under `public/`.
 *
 * Every section below points at a file in here, and every one of those files is
 * **generated** by `scripts/cheat-sheet-diagrams.mts`:
 *
 * ```
 * npm run cheat-sheets:diagrams              write the files
 * npm run cheat-sheets:diagrams -- --check   fail if a file on disk is stale
 * ```
 *
 * So changing a diagram is changing that script's drawing function and
 * re-running it — not editing the SVG, which the next run overwrites. The
 * `--check` mode is what stops a hand-edit surviving unnoticed.
 *
 * Note this is not how a *new* sheet's diagrams have to work: the page shows
 * whatever is at the filename, so dropping a file in still works elsewhere.
 * These seven are generated because they have to hold one measured palette
 * across both themes and keep their numbers agreeing with the prose.
 *
 * docs/CHEAT_SHEET_IMAGES.md lists every slot and its size, and the script's
 * own header carries the reasoning.
 */
const ATOMIC_STRUCTURE_DIAGRAMS = '/cheat-sheets/atomic-structure/';

/**
 * The same arrangement for the Year 10 sheet the atomic-structure sheet split
 * into. Three of the original seven diagrams teach isotopes, the weighted
 * average and decay, so they moved with the prose rather than being served to
 * the new sheet out of the old sheet's folder. One folder per slug is what
 * docs/CHEAT_SHEET_IMAGES.md documents.
 *
 * The redesign brief wanted slot 7 renamed to `07-half-life.svg` and its
 * synthetic-element half split into a second file. Neither happened, and
 * neither should: the filename is the contract the images doc is built on, and
 * the synthetic elements moved to the periodic table widget's *natural or made*
 * view mode rather than to another diagram. `07-decay-and-made-elements.svg` is
 * now the decay curve alone, under the Half-life section. The note under "The
 * slots on Isotopes & Radioactivity" in docs/CHEAT_SHEET_IMAGES.md is the
 * current version of this.
 */
const ISOTOPE_DIAGRAMS = '/cheat-sheets/isotopes-and-radioactivity/';

export const CHEAT_SHEETS: CheatSheetTopic[] = [
  {
    slug: 'atomic-structure',
    title: 'Atoms & the Periodic Table',
    yearLevel: 'Year 9',
    category: 'Fundamentals',
    summary: 'What an atom is made of, why atomic number defines the element, and what the table’s arrangement predicts.',
    iconName: 'Atom',
    colorTheme: 'border-violet-500 text-violet-500',
    curriculumRef:
      'Victorian Curriculum F–10 Version 2.0, Science VC2S10U07: the organisation of the elements in the periodic table is related to the structure and properties of atoms — rows and periods, metallic and non-metallic properties, atomic size and reactivity. Version 2.0 bands Levels 9 and 10 together and writes no separate Level 9 description, so “Year 9” here is this site’s sequencing rather than a curriculum boundary; the companion sheet Isotopes & Radioactivity takes VC2S10U06 from the same band. Atomic number, mass number, metalloid and ion formation are this site’s extension — Version 2.0 names none of them.',
    keyTakeaways: [
      'An atom is a nucleus of protons and neutrons, with electrons spread around it.',
      'The number of protons — the atomic number — is what makes an atom that element. Change it and you have a different element.',
      'Electrons sit in energy levels, and how many are in the outer level is what the periodic table is arranged by.',
      'A group is a column and a period is a row. Elements in one group share an outer-level count, so they react alike.',
      'Metals sit on the left and non-metals on the right. Atoms shrink across a period and grow down a group.',
      'Almost all of an atom is empty space. Every picture of one, including the ones here, is wrong about scale.',
    ],
    formulaExamples: [
      { name: 'Chlorine-35', formula: 'Cl-35', description: '17 protons, 18 neutrons' },
      { name: 'Chlorine-37', formula: 'Cl-37', description: '17 protons, 20 neutrons' },
      { name: 'Hydrogen ion', formula: 'H+', description: 'a hydrogen atom that has lost its one electron — a bare proton' },
    ],
    sections: [
      {
        heading: 'What an atom is made of',
        content:
          'An atom has a nucleus of protons and neutrons, with electrons around it. Protons carry a positive charge and electrons an equal negative one, so a neutral atom has the same number of each. Neutrons carry no charge. Nearly all the mass is in the nucleus, because an electron weighs almost nothing next to a proton.',
        image: {
          src: `${ATOMIC_STRUCTURE_DIAGRAMS}01-inside-an-atom.svg`,
          width: 640,
          height: 360,
          alt: 'A nucleus of protons and neutrons at the centre, with a fuzzy cloud around it showing where electrons are likely to be. A note says the nucleus is drawn far too large to be seen at all.',
        },
      },
      {
        heading: 'Atomic number and mass number',
        content:
          'The atomic number is the number of protons, and it is what makes an atom that element. Every chlorine atom has 17 protons; anything with 17 protons is chlorine. The mass number is protons plus neutrons. Neutrons can vary without changing which element it is. Both terms are an extension here: the curriculum for these years names neither, and you cannot read a table cell without them.',
        examples: [
          { name: 'Chlorine-35', formula: 'Cl-35' },
          { name: 'Chlorine-37', formula: 'Cl-37' },
        ],
        image: {
          src: `${ATOMIC_STRUCTURE_DIAGRAMS}02-atomic-and-mass-number.svg`,
          width: 640,
          height: 320,
          alt: 'The symbol for chlorine-35 with the mass number 35 written above the atomic number 17, and arrows labelling each: 17 protons, and 35 minus 17 giving 18 neutrons.',
        },
      },
      {
        heading: 'Electrons, energy levels and the shape of the table',
        content:
          'Electrons occupy energy levels around the nucleus. The first holds up to 2, the next up to 8, then 8 again for the first twenty elements. Your teacher and the curriculum may call these shells, and it means the same thing. Counting electrons this way is called the Bohr model: it is useful, and it is not a picture of a real atom. The number in the outer level sets how an atom reacts. Elements are placed in the same group when they have the same outer count, which is why a group behaves alike.',
        image: {
          src: `${ATOMIC_STRUCTURE_DIAGRAMS}05-energy-levels.svg`,
          width: 640,
          height: 300,
          alt: 'A sodium nucleus of 11 protons and 12 neutrons, surrounded by three soft bands holding 2, 8 and 1 electrons as marks at irregular angles rather than dots on circles. Beside it, the arrangement 2, 8, 1 with the outer level last. The diagram says it is a way to count electrons, not a picture of an atom, and that the nucleus is drawn about 100,000 times too big.',
        },
        /*
         * The interactive table, all six modes. It sits here rather than under
         * "Groups and periods" because this is the paragraph that says the
         * outer count is what the columns are built on, and *Outer shell* is
         * the mode that shows a student that claim is true — one column at a
         * time, for all 118 elements.
         *
         * It replaces the twenty-element lookup table this sheet used to
         * carry. Everything in that table — symbol, atomic number, electron
         * arrangement — is in the widget for every element, and the first
         * twenty arrangements are pinned in
         * src/core-engine/tests/periodic-table.test.ts so they cannot drift.
         */
        widget: 'periodic-table',
      },
      {
        heading: 'Groups and periods',
        content:
          'A group is a column of the table and a period is a row. Elements in one group have the same number of electrons in their outer level, so the column predicts how an element reacts. Group 1 is the alkali metals, group 17 the halogens and group 18 the noble gases. A period tells you how many energy levels are in use: an element in period 3 uses three of them. So the row tells you roughly how big the atom is.',
      },
      {
        heading: 'Metals and non-metals',
        content:
          'Metals fill the left and the middle of the table, and non-metals sit in the top right corner. A metal conducts electricity and heat, has a shiny surface, and can be hammered into a sheet without shattering. Almost every metal is solid at room temperature; mercury is the liquid one. A non-metal is usually a poor conductor, dull, and brittle if it is solid at all. Many non-metals are gases. Extension: a few elements along the staircase between the two, such as silicon, behave partly like each. They are called metalloids, which is a word the curriculum does not use.',
      },
      {
        heading: 'Atomic size',
        content:
          'Atoms get smaller from left to right across a period. Each step adds a proton, and the larger positive charge pulls the same outer level in tighter. Atoms get larger down a group, because each step down starts a new energy level further out. So the largest atoms sit at the bottom left of the table and the smallest at the top right.',
      },
      {
        heading: 'Reactivity, and why a group behaves alike',
        content:
          'You can test a group by reacting its elements with oxygen, water and acids, and they behave the same way as each other. Group 1 metals react with water and get more violent down the group: lithium fizzes, sodium darts about, potassium catches fire. The same metals with an acid give off hydrogen, faster still. Group 17 elements run the other way and get less reactive down the group. Group 18 already has a full outer level, so the noble gases react with almost nothing.',
      },
      {
        heading: 'Ordered by atomic number, not by mass',
        content:
          'Mendeleev arranged the table by mass, and a few elements came out in the wrong place. In 1913 Henry Moseley measured the charge on the nucleus and found the order that works: atomic number. Tellurium is heavier than iodine but comes before it, because it has one proton fewer.',
        image: {
          src: `${ATOMIC_STRUCTURE_DIAGRAMS}06-ordered-by-atomic-number.svg`,
          width: 640,
          height: 300,
          alt: 'Tellurium and iodine side by side. Tellurium has the larger relative atomic mass but the smaller atomic number, and the table places it first.',
        },
      },
    ],
    tables: [
      {
        heading: 'The three subatomic particles',
        columns: ['Particle', 'Charge', 'Relative mass', 'Where it is'],
        rows: [
          ['Proton', '+1', '1', 'in the nucleus'],
          ['Neutron', '0', '1', 'in the nucleus'],
          ['Electron', '−1', 'about 1/1836', 'around the nucleus'],
        ],
      },
      /*
       * "The first twenty elements" was the second table here, and the widget
       * above replaced it. Every column it carried — element, symbol, atomic
       * number, electron arrangement — the widget gives for all 118, and it
       * can *show* the repeating pattern the list could only assert. The
       * arrangements themselves live on as an assertion in
       * src/core-engine/tests/periodic-table.test.ts.
       *
       * It was deleted from all five overlays in the same commit. It had to
       * be: src/i18n/cheat-sheets.test.ts compares tables row for row.
       */
    ],
    commonMistakes: [
      'Confusing atomic number with mass number. Atomic number is protons and names the element. Mass number is protons plus neutrons.',
      'Thinking an ion is a different element. Losing or gaining an electron changes the charge, not the number of protons. Sodium and Na+ are both sodium.',
    ],
    resources: [
      PHET('build-an-atom', 'Build an Atom', 'Add protons, neutrons and electrons and watch the element, charge and mass change as you go.'),
      RSC_PTABLE,
      VCAA_DATA_BOOK,
      KHAN_HS_CHEM,
    ],
  },
  {
    slug: 'isotopes-and-radioactivity',
    title: 'Isotopes & Radioactivity',
    yearLevel: 'Year 10',
    category: 'Fundamentals',
    summary: 'What changes when the neutron count changes: isotopes, decay, half-life, and the elements that had to be made.',
    iconName: 'Timer',
    colorTheme: 'border-red-500 text-red-500',
    curriculumRef:
      'Victorian Curriculum F–10 Version 2.0, Science VC2S10U06: the model of the atom changed following the discovery of electrons, protons and neutrons, and natural radioactive decay results in a change from unstable to stable atoms. Version 2.0 bands Levels 9 and 10 together and writes no separate Level 10 description, so “Year 10” here is this site’s sequencing rather than a curriculum boundary; the companion sheet Atoms & the Periodic Table takes VC2S10U07 from the same band. Atomic number, mass number and relative atomic mass are this site’s extension — Version 2.0 names none of them, and relative atomic mass is VCE Unit 1.',
    keyTakeaways: [
      'Isotopes are atoms of the same element with different numbers of neutrons. They behave the same chemically.',
      'Relative atomic mass is a weighted average across an element’s isotopes, which is why so few are whole numbers.',
      'An unstable nucleus decays and gives out radiation, leaving a more stable atom behind.',
      'The three kinds are alpha, beta and gamma, and they differ in what comes out and what stops it.',
      'Half-life is the time for half a sample to decay. After three half-lives, an eighth is left.',
      'Half-lives run from seconds to billions of years, which is what makes dating the distant past possible.',
    ],
    formulaExamples: [
      { name: 'Carbon-12', formula: 'C-12', description: 'the standard all other masses are measured against' },
      { name: 'Radon-222', formula: 'Rn-222', description: 'decays by giving out an alpha particle' },
      { name: 'Iodine-131', formula: 'I-131', description: 'decays by giving out a beta particle' },
      { name: 'Cobalt-60', formula: 'Co-60', description: 'gives out gamma radiation' },
      { name: 'Carbon-14', formula: 'C-14', description: 'half-life about 5730 years' },
      { name: 'Uranium-238', formula: 'U-238', description: 'half-life about 4.5 billion years' },
    ],
    sections: [
      {
        heading: 'The two numbers this sheet needs',
        content:
          'The atomic number is how many protons an atom has, and it fixes which element it is. The mass number is protons plus neutrons. Everything on this sheet is about the second number changing while the first stays put. Both terms are an extension: the curriculum for these years names neither, and nothing here works without them.',
      },
      {
        heading: 'Isotopes',
        content:
          'Isotopes are atoms of one element with different numbers of neutrons. Chemistry is done by electrons, and isotopes have the same number of those, so they react identically. What differs is mass, and sometimes stability: some isotopes are radioactive and some are not.',
        image: {
          src: `${ISOTOPE_DIAGRAMS}03-isotopes-of-hydrogen.svg`,
          width: 640,
          height: 280,
          alt: 'Three hydrogen atoms side by side: one proton, one proton and one neutron, and one proton and two neutrons. All three have a single electron.',
        },
      },
      {
        heading: 'Unstable nuclei, and the three kinds of radiation',
        content:
          'Some nuclei are unstable. They break down on their own, give out radiation, and leave a more stable atom behind. Radon-222 throws out an alpha particle, which is two protons and two neutrons stuck together. Iodine-131 gives out a beta particle, which is a fast electron thrown from the nucleus. Cobalt-60 gives out gamma radiation, which is energy rather than a particle. Paper stops alpha, a sheet of aluminium stops beta, and gamma needs lead or thick concrete.',
      },
      {
        heading: 'Half-life',
        content:
          'Half-life is the time it takes for half of a sample to decay. After one half-life half is left, after two a quarter, and after three an eighth. The number is fixed for each isotope, and heating it or reacting it does not change it. Carbon-14 has a half-life of about 5730 years. Uranium-238 has one of about 4.5 billion years, which is why there is still uranium in the ground.',
        image: {
          src: `${ISOTOPE_DIAGRAMS}07-decay-and-made-elements.svg`,
          width: 640,
          height: 320,
          alt: 'A decay curve falling from 100 per cent to 50, 25 and 12.5 per cent at one, two and three half-lives, with a dashed line down to the axis at each. After three half-lives an eighth is left. One half-life is 5730 years for carbon-14 and about 4.5 billion years for uranium-238.',
        },
      },
      {
        heading: 'Dating the past, and 65,000 years in Australia',
        content:
          'Carbon-14 forms high in the air and ends up in every living thing. When something dies it takes in no more, and the carbon-14 already in it decays. Measuring how much is left dates the remains, back to roughly 50,000 years. Older material needs another method. Optically stimulated luminescence dates the last time a grain of sand was exposed to daylight, and it reaches much further back. At Madjedbebe, a rock shelter on Mirarr Country in the Northern Territory, both methods were used on the same deposits. They place Aboriginal and Torres Strait Islander Peoples on the Australian continent for at least 65,000 years.',
      },
      {
        heading: 'Radioactivity in medicine and industry',
        content:
          'Radiation is useful because it passes through solid things and can be aimed. In medicine, a small dose of a short-lived isotope is tracked through the body to find a tumour. A large focused dose is used to kill cancer cells, and cobalt-60 is one source used for that. In industry, gamma radiation is shone through parts made for aircraft and spacecraft. A crack shows up on the film behind the part, without anyone cutting it open.',
      },
      {
        heading: 'Elements that had to be made',
        content:
          'Elements past uranium have no stable isotopes and are not found in nature. They are built in accelerators by firing one nucleus at another, sometimes a few atoms at a time. Many last less than a second before they decay. This is an extension: the curriculum does not ask for made elements. They are here because they are how the bottom rows of the periodic table were filled in.',
        /*
         * The same component as the Year 9 sheet, gated to two modes: *natural
         * or made*, which is this paragraph, and *metals* for orientation. The
         * other four belong to VC2S10U07, so the widget links back to the
         * sheet that teaches them rather than teaching them twice.
         */
        widget: 'periodic-table-occurrence',
      },
    ],
    commonMistakes: [
      'Reading relative atomic mass as a count of particles. It is an average over isotopes, so chlorine’s 35.5 is not any atom you could find.',
      'Adding the two isotope masses and halving them. That gives 36 for chlorine, and it is wrong because chlorine-35 is three times as common as chlorine-37.',
    ],
    resources: [
      PHET('isotopes-and-atomic-mass', 'Isotopes and Atomic Mass', 'Mix isotopes in different proportions and see the relative atomic mass move.'),
      MADJEDBEBE,
      VCAA_DATA_BOOK,
      KHAN_HS_CHEM,
    ],
  },
  {
    slug: 'states-of-matter',
    title: 'States of Matter',
    yearLevel: 'Year 9',
    category: 'Fundamentals',
    summary: 'Particle arrangement, kinetic energy, and the six phase changes.',
    iconName: 'Shapes',
    colorTheme: 'border-(--link) text-(--link)',
    curriculumRef: 'Victorian Curriculum Science: particle model (Levels 7–8), revisited in Year 9–10 chemical sciences.',
    keyTakeaways: [
      'Solids: particles vibrate in fixed positions — fixed shape and fixed volume.',
      'Liquids: particles slide past each other — fixed volume, takes the shape of the container.',
      'Gases: particles move freely and fast — fills any container, easily compressed.',
      'Temperature is a measure of the average kinetic energy of the particles.',
      'During a phase change the temperature stays constant: energy goes into breaking or forming attractions between particles, not into speeding them up.',
    ],
    formulaExamples: [
      { name: 'Ice (solid)', formula: 'H2O (s)' },
      { name: 'Water (liquid)', formula: 'H2O (l)' },
      { name: 'Steam (gas)', formula: 'H2O (g)' },
      { name: 'Dissolved salt (aqueous)', formula: 'NaCl (aq)' },
    ],
    sections: [
      {
        heading: 'State symbols in equations',
        content: 'Every species in a chemical equation carries a state symbol: (s) solid, (l) liquid, (g) gas, (aq) dissolved in water. "Aqueous" is not a fourth state of matter — it means a solute dissolved in liquid water.',
      },
      {
        heading: 'Heating and cooling curves',
        content: 'On a heating curve the flat sections are phase changes (melting, boiling). The sloped sections are one state warming up. The flat section for boiling is longer than for melting because separating particles completely takes more energy than loosening them.',
      },
    ],
    tables: [
      {
        heading: 'The six phase changes',
        columns: ['Change', 'From → To', 'Energy'],
        rows: [
          ['Melting', 'solid → liquid', 'absorbed'],
          ['Freezing', 'liquid → solid', 'released'],
          ['Evaporation / boiling', 'liquid → gas', 'absorbed'],
          ['Condensation', 'gas → liquid', 'released'],
          ['Sublimation', 'solid → gas', 'absorbed'],
          ['Deposition', 'gas → solid', 'released'],
        ],
      },
    ],
    commonMistakes: [
      '"Particles expand when heated" — the particles stay the same size; the spaces between them grow.',
      'Thinking bubbles in boiling water are air — they are water vapour.',
      'Confusing evaporation (surface, any temperature) with boiling (throughout, at the boiling point).',
    ],
    resources: [
      PHET('states-of-matter', 'States of Matter', 'Heat, cool and compress atoms and molecules and watch the phase change.'),
      KHAN_HS_CHEM,
    ],
  },
  {
    slug: 'acids-and-bases',
    title: 'Acids & Bases',
    yearLevel: 'Year 9',
    category: 'Acids & Bases',
    summary: 'pH, proton donors and acceptors, strong vs weak, and neutralisation.',
    iconName: 'TestTube',
    colorTheme: 'border-purple-500 text-purple-500',
    curriculumRef: 'Victorian Curriculum Science Level 10 (chemical reactions incl. acids); VCE Unit 2 AoS 1 (Brønsted–Lowry).',
    relatedGames: ['acid-classification', 'neutralise'],
    keyTakeaways: [
      'Acid: a proton (H+) donor. In water it produces hydronium ions, H3O+. pH < 7.',
      'Base: a proton acceptor. Soluble bases (alkalis) release hydroxide ions, OH-, in water. pH > 7.',
      'Neutral: pH 7 at 25 °C — pure water and most salts.',
      'Neutralisation: acid + base → salt + water. The ionic equation is always H+ + OH- → H2O.',
      'Each step on the pH scale is a ×10 change in H+ concentration: pH 2 is 100× more acidic than pH 4.',
    ],
    formulaExamples: [
      { name: 'Hydrochloric acid (strong)', formula: 'HCl' },
      { name: 'Ethanoic acid (weak)', formula: 'CH3COOH' },
      { name: 'Sodium hydroxide (strong base)', formula: 'NaOH' },
      { name: 'Ammonia (weak base)', formula: 'NH3' },
    ],
    sections: [
      {
        heading: 'Strong vs weak is not the same as concentrated vs dilute',
        content: 'Strong acids ionise completely in water (HCl, HNO3, H2SO4). Weak acids only partly ionise (CH3COOH, H2CO3). "Concentrated" and "dilute" describe how much acid is dissolved, not how much of it ionises — you can have a dilute strong acid or a concentrated weak acid.',
        examples: [
          { name: 'Strong acid ionising', formula: 'HCl (aq) + H2O (l) -> H3O+ (aq) + Cl- (aq)' },
          { name: 'Neutralisation', formula: 'HCl (aq) + NaOH (aq) -> NaCl (aq) + H2O (l)' },
        ],
      },
      {
        heading: 'Reactions of acids to recognise',
        content: 'Acid + metal → salt + hydrogen. Acid + metal carbonate → salt + water + carbon dioxide. Acid + metal oxide/hydroxide → salt + water. The salt takes its name from the metal and the acid (hydrochloric → chloride, sulfuric → sulfate, nitric → nitrate).',
        examples: [
          { name: 'Acid + metal', formula: 'Mg (s) + 2HCl (aq) -> MgCl2 (aq) + H2 (g)' },
          { name: 'Acid + carbonate', formula: 'CaCO3 (s) + 2HCl (aq) -> CaCl2 (aq) + H2O (l) + CO2 (g)' },
        ],
      },
    ],
    tables: [
      {
        heading: 'pH scale landmarks',
        columns: ['pH', 'Example', 'Indicator colour (universal)'],
        rows: [
          ['0–2', 'Stomach acid, battery acid', 'Red'],
          ['3–6', 'Vinegar, lemon juice, fizzy drinks', 'Orange → yellow'],
          ['7', 'Pure water', 'Green'],
          ['8–11', 'Baking soda, seawater, soap', 'Blue'],
          ['12–14', 'Oven cleaner, drain cleaner', 'Purple'],
        ],
      },
    ],
    commonMistakes: [
      'Writing that acids "contain" H+ — they produce H+ (as H3O+) only when dissolved in water.',
      'Assuming all bases contain OH — ammonia (NH3) is a base because it accepts a proton.',
      'Thinking the pH scale stops at 0 and 14 — very concentrated solutions can go beyond.',
    ],
    resources: [
      PHET('ph-scale', 'pH Scale', 'Test the pH of everyday liquids and see the H3O+ / OH- balance.'),
      PHET('acid-base-solutions', 'Acid-Base Solutions', 'Compare strong and weak acids at the particle level.'),
      KHAN_HS_CHEM,
      LIBRETEXTS,
    ],
  },
  {
    slug: 'balancing-equations',
    title: 'Balancing Chemical Equations',
    yearLevel: 'Year 10',
    category: 'Equations',
    summary: 'Conservation of mass: same atoms in, same atoms out — change coefficients, never subscripts.',
    iconName: 'Scale',
    colorTheme: 'border-emerald-500 text-emerald-500',
    curriculumRef: 'Victorian Curriculum Science Level 10; VCE Unit 1–2 (writing balanced equations with states).',
    relatedGames: ['reaction-balancer'],
    keyTakeaways: [
      'Atoms are rearranged in a reaction, never created or destroyed — every element must have the same count on both sides.',
      'Coefficients (the big numbers in front) multiply the whole formula. Subscripts (the small numbers inside) define the substance and must never change.',
      'Balance one element at a time; leave hydrogen and oxygen for last; balance a polyatomic ion as one unit if it appears unchanged on both sides.',
      'Coefficients should be the smallest whole-number ratio.',
      'Always include state symbols in the final equation.',
    ],
    formulaExamples: [
      { name: 'Unbalanced', formula: 'H2 + O2 -> H2O' },
      { name: 'Balanced', formula: '2H2 (g) + O2 (g) -> 2H2O (l)' },
      { name: 'With a polyatomic ion as a unit', formula: 'Al2(SO4)3 + 3Ba(NO3)2 -> 2Al(NO3)3 + 3BaSO4' },
    ],
    sections: [
      {
        heading: 'A method that always works',
        content: '1. Write correct formulas for every reactant and product. 2. Count atoms of each element on each side. 3. Start with the element that appears in the fewest formulas. 4. Adjust coefficients only. 5. If you end up with a fraction (e.g. 7/2 O2), multiply everything by 2. 6. Recount every element. 7. Add state symbols.',
        examples: [
          { name: 'Combustion of propane', formula: 'C3H8 (g) + 5O2 (g) -> 3CO2 (g) + 4H2O (l)' },
        ],
      },
    ],
    commonMistakes: [
      'Changing H2O to H2O2 to "get more oxygen" — that is a different substance.',
      'Forgetting that a coefficient multiplies every atom in the formula (2Ca(OH)2 has 4 H).',
      'Stopping before checking every element a second time.',
    ],
    resources: [
      PHET('balancing-chemical-equations', 'Balancing Chemical Equations', 'Drag coefficients and watch the atom counts update on a balance.'),
      KHAN_HS_CHEM,
    ],
  },
  {
    slug: 'reaction-types',
    title: 'Types of Chemical Reactions',
    yearLevel: 'Year 10',
    category: 'Reactions',
    summary: 'Recognise synthesis, decomposition, combustion, displacement, precipitation and neutralisation from their patterns.',
    iconName: 'Flame',
    colorTheme: 'border-amber-500 text-amber-500',
    curriculumRef: 'Victorian Curriculum Science Level 10; VCE Unit 2 AoS 1–2.',
    relatedGames: ['reaction-balancer', 'neutralise'],
    keyTakeaways: [
      'Synthesis (combination): two or more substances join — A + B → AB.',
      'Decomposition: one substance breaks apart — AB → A + B (often needs heat or electricity).',
      'Combustion: fuel + oxygen → carbon dioxide + water (complete) — releases heat.',
      'Single displacement: a more reactive element takes the place of a less reactive one — A + BC → AC + B.',
      'Double displacement: ions swap partners — AB + CD → AD + CB (precipitation and neutralisation are special cases).',
    ],
    formulaExamples: [
      { name: 'Synthesis', formula: '2Mg (s) + O2 (g) -> 2MgO (s)' },
      { name: 'Decomposition', formula: 'CaCO3 (s) -> CaO (s) + CO2 (g)' },
      { name: 'Combustion', formula: 'CH4 (g) + 2O2 (g) -> CO2 (g) + 2H2O (l)' },
      { name: 'Single displacement', formula: 'Zn (s) + CuSO4 (aq) -> ZnSO4 (aq) + Cu (s)' },
      { name: 'Precipitation', formula: 'AgNO3 (aq) + NaCl (aq) -> AgCl (s) + NaNO3 (aq)' },
      { name: 'Neutralisation', formula: 'HCl (aq) + NaOH (aq) -> NaCl (aq) + H2O (l)' },
    ],
    sections: [
      {
        heading: 'How to tell them apart quickly',
        content: 'Count the reactants and products. One product from several reactants → synthesis. Several products from one reactant → decomposition. O2 on the left with CO2 and H2O on the right → combustion. An element and a compound swapping → single displacement. Two compounds swapping ions → double displacement; if a solid forms, it is precipitation; if water forms from an acid and base, it is neutralisation.',
      },
    ],
    tables: [
      {
        heading: 'General forms',
        columns: ['Type', 'General form', 'Clue'],
        rows: [
          ['Synthesis', 'A + B → AB', 'Fewer products than reactants'],
          ['Decomposition', 'AB → A + B', 'One reactant'],
          ['Combustion', 'Fuel + O₂ → CO₂ + H₂O', 'Oxygen reactant, heat released'],
          ['Single displacement', 'A + BC → AC + B', 'Element + compound'],
          ['Double displacement', 'AB + CD → AD + CB', 'Two compounds swap ions'],
          ['Precipitation', 'Ions (aq) → solid', 'A (s) product from (aq) reactants'],
          ['Neutralisation', 'Acid + base → salt + water', 'H⁺ + OH⁻ → H₂O'],
        ],
      },
    ],
    commonMistakes: [
      'Calling every reaction with oxygen "combustion" — rusting is a slow oxidation, not combustion.',
      'Forgetting that incomplete combustion gives CO or C (soot) instead of CO2.',
    ],
    resources: [KHAN_HS_CHEM, LIBRETEXTS],
  },
  {
    slug: 'chemical-bonds',
    title: 'Chemical Bonds & Structure',
    yearLevel: 'Year 10',
    category: 'Bonding',
    summary: 'Ionic, covalent and metallic bonding — and how the structure explains the properties.',
    iconName: 'Atom',
    colorTheme: 'border-cyan-500 text-cyan-500',
    curriculumRef: 'Victorian Curriculum Science Level 10; VCE Unit 1 AoS 1 (metals, ionic compounds, covalent substances).',
    keyTakeaways: [
      'Atoms bond to reach a stable, full outer shell (a noble-gas configuration). The group number tells you how many valence electrons a main-group element has.',
      'Ionic: metal + non-metal. Electrons are transferred, forming ions held in a 3D lattice by electrostatic attraction.',
      'Covalent: non-metal + non-metal. Electrons are shared in pairs; each shared pair is one bond.',
      'Metallic: metal atoms in a lattice of cations surrounded by a "sea" of delocalised electrons.',
      'Properties follow from structure: lattices are hard with high melting points; small molecules have low melting points because only weak forces act between molecules.',
    ],
    formulaExamples: [
      { name: 'Ionic compound', formula: 'NaCl (s)' },
      { name: 'Covalent molecule', formula: 'CO2 (g)' },
      { name: 'Covalent network', formula: 'SiO2 (s)' },
      { name: 'Metal', formula: 'Cu (s)' },
    ],
    sections: [
      {
        heading: 'Why ionic compounds conduct only when molten or dissolved',
        content: 'In the solid lattice the ions are locked in place, so no charged particles can move. Melting or dissolving frees the ions, and the liquid conducts. Metals conduct in all states because their delocalised electrons are always free to move.',
      },
    ],
    tables: [
      {
        heading: 'Structure → properties',
        columns: ['Type', 'Particles', 'Melting point', 'Conducts?', 'Example'],
        rows: [
          ['Ionic lattice', 'Cations + anions', 'High', 'Molten or (aq) only', 'NaCl, MgO'],
          ['Covalent molecular', 'Molecules', 'Low', 'No', 'H₂O, CO₂'],
          ['Covalent network', 'Atoms (all bonded)', 'Very high', 'No (except graphite)', 'Diamond, SiO₂'],
          ['Metallic lattice', 'Cations + delocalised e⁻', 'High (varies)', 'Yes, all states', 'Cu, Fe, Al'],
        ],
      },
    ],
    commonMistakes: [
      'Calling NaCl a "molecule" — it is a lattice; the formula is a ratio, not a molecule.',
      'Thinking covalent bonds are weak because molecular substances melt easily — the bonds inside a molecule are strong; the forces between molecules are weak.',
      'Assuming bonding is either fully ionic or fully covalent — electronegativity difference puts it on a spectrum.',
    ],
    resources: [
      PHET('build-a-molecule', 'Build a Molecule', 'Assemble molecules from atoms and see their formulas and 3D shapes.'),
      PTABLE,
      CHEMGUIDE,
    ],
    relatedGames: ['lewis-structures'],
  },
  {
    slug: 'chemical-formulas',
    title: 'Writing Ionic Formulas',
    yearLevel: 'Year 10',
    category: 'Nomenclature',
    summary: 'Balance the charges: cation first, cross-over the charges, brackets around repeated polyatomic ions.',
    iconName: 'Zap',
    colorTheme: 'border-rose-500 text-rose-500',
    curriculumRef: 'Victorian Curriculum Science Level 10; VCE Unit 1 AoS 1.',
    relatedGames: ['formula-blaster'],
    keyTakeaways: [
      'An ionic compound has no overall charge: total positive charge = total negative charge.',
      'Write the cation (metal or NH4+) first, then the anion.',
      'Cross-over method: the size of each ion\'s charge becomes the subscript of the other ion, then simplify to the lowest ratio.',
      'A polyatomic ion is one unit. If you need more than one, put it in brackets: Ca(OH)2, not CaOH2.',
      'Variable-charge metals (Fe, Cu, Pb, Sn) show their charge with a Roman numeral in the name: iron(III) = Fe 3+.',
    ],
    formulaExamples: [
      { name: 'Aluminium oxide (3+ and 2−)', formula: 'Al2O3' },
      { name: 'Calcium hydroxide (brackets)', formula: 'Ca(OH)2' },
      { name: 'Ammonium sulfate', formula: '(NH4)2SO4' },
      { name: 'Iron(III) chloride', formula: 'FeCl3' },
      { name: 'Magnesium oxide (2+ and 2− simplifies)', formula: 'MgO' },
    ],
    sections: [
      {
        heading: 'Worked example: aluminium sulfate',
        content: 'Al 3+ and SO4 2−. Cross over: Al gets subscript 2, sulfate gets subscript 3. Sulfate is polyatomic and repeated, so it needs brackets: Al2(SO4)3. Check: 2 × (+3) = +6 and 3 × (−2) = −6. Neutral.',
        examples: [{ name: 'Aluminium sulfate', formula: 'Al2(SO4)3' }],
      },
      {
        heading: 'Common ion charges from the periodic table',
        content: 'Group 1 → +1, Group 2 → +2, Al → +3, Group 17 → −1, Group 16 → −2, N and P → −3. Transition metals vary — the name will tell you. For polyatomic ions use the lookup table.',
      },
    ],
    commonMistakes: [
      'Forgetting to simplify: Mg2O2 must become MgO.',
      'Brackets around a single polyatomic ion: NaOH, not Na(OH).',
      'Writing the anion first because it sounds first in casual speech.',
    ],
    resources: [VCAA_DATA_BOOK, KHAN_HS_CHEM],
  },
  {
    slug: 'polyatomic-ions',
    title: 'Polyatomic Ions',
    yearLevel: 'Year 10',
    category: 'Nomenclature',
    summary: 'The lookup table, plus the naming patterns that mean you memorise far less than you think.',
    iconName: 'Orbit',
    colorTheme: 'border-indigo-500 text-indigo-500',
    curriculumRef: 'VCE Unit 1 AoS 1 (formulas and naming of ionic compounds). The VCE data book provides this table in the exam.',
    relatedGames: ['neutralise', 'formula-blaster'],
    keyTakeaways: [
      'A polyatomic ion is a group of covalently bonded atoms that carries an overall charge and moves as one unit in reactions.',
      'The only common polyatomic cation is ammonium, NH4+. All the rest are anions.',
      '"-ate" has more oxygen than "-ite": sulfate SO4 2− vs sulfite SO3 2−; nitrate NO3− vs nitrite NO2−. The charge stays the same.',
      '"per-…-ate" is one more oxygen than -ate; "hypo-…-ite" is one fewer than -ite (perchlorate ClO4−, chlorate ClO3−, chlorite ClO2−, hypochlorite ClO−).',
      'Adding H+ to an anion raises its charge by one and adds "hydrogen" to the name: carbonate CO3 2− → hydrogen carbonate HCO3−.',
    ],
    formulaExamples: [
      { name: 'Sodium nitrate', formula: 'NaNO3' },
      { name: 'Copper(II) sulfate', formula: 'CuSO4' },
      { name: 'Ammonium carbonate', formula: '(NH4)2CO3' },
      { name: 'Potassium permanganate', formula: 'KMnO4' },
    ],
    tables: [POLYATOMIC_ION_TABLE],
    sections: [
      {
        heading: 'How to learn them',
        content: 'Learn the "-ate" ions first (sulfate, nitrate, carbonate, phosphate, chlorate) — every other oxyanion is a pattern applied to those. Then learn the four that break the pattern: hydroxide OH−, cyanide CN−, ammonium NH4+ and peroxide O2 2−.',
      },
      {
        heading: 'Where they show up',
        content: 'Acids: sulfuric acid is H2SO4 because sulfate is 2−; nitric acid is HNO3 because nitrate is 1−. Precipitation: most nitrates and all ammonium salts are soluble, so they are the usual "spectator" partners. Redox: permanganate and dichromate are the classic oxidising agents.',
      },
    ],
    commonMistakes: [
      'Splitting the ion in a formula (writing Ca(OH)2 as CaO2H2) — it stays together.',
      'Treating the charge as belonging to the last atom only — it belongs to the whole group.',
      'Confusing the charge (−2) with the number of oxygens — sulfate has 4 O and charge 2−.',
    ],
    resources: [VCAA_DATA_BOOK, KHAN_HS_CHEM, IUPAC_GOLD_BOOK],
  },
  {
    slug: 'naming-compounds',
    title: 'Naming Inorganic Compounds',
    yearLevel: 'Year 10',
    category: 'Nomenclature',
    summary: 'Three naming systems — ionic, molecular, acids — and how to tell which one applies.',
    iconName: 'TestTubes',
    colorTheme: 'border-fuchsia-500 text-fuchsia-500',
    curriculumRef: 'VCE Unit 1 AoS 1 (IUPAC naming of ionic and covalent compounds).',
    relatedGames: ['formula-blaster'],
    keyTakeaways: [
      'First decide the type: metal + non-metal (or NH4+) → ionic; two non-metals → molecular; H first and dissolved in water → acid.',
      'Ionic: cation name + anion name. Monatomic anions end in -ide (chloride, oxide); polyatomic anions keep their own name (sulfate). No prefixes — the ratio is implied by the charges.',
      'Variable-charge metals get a Roman numeral for the cation charge: FeCl2 = iron(II) chloride, FeCl3 = iron(III) chloride. Work it out from the anion.',
      'Molecular: Greek prefixes give the atom counts (CO2 = carbon dioxide, N2O4 = dinitrogen tetroxide). Drop "mono-" on the first element only.',
      'Acids: -ide → hydro…ic acid (HCl = hydrochloric); -ate → …ic acid (H2SO4 = sulfuric); -ite → …ous acid (H2SO3 = sulfurous).',
    ],
    formulaExamples: [
      { name: 'Magnesium nitride (ionic)', formula: 'Mg3N2' },
      { name: 'Copper(I) oxide (ionic, Roman numeral)', formula: 'Cu2O' },
      { name: 'Phosphorus pentachloride (molecular)', formula: 'PCl5' },
      { name: 'Nitrous acid (acid, from nitrite)', formula: 'HNO2' },
    ],
    sections: [
      {
        heading: 'Working out a Roman numeral',
        content: 'For Fe2(SO4)3: sulfate is 2−, and there are three, so the anions total −6. Two iron ions must total +6, so each is +3 → iron(III) sulfate. Only metals with more than one common charge (Fe, Cu, Pb, Sn, Mn, Cr, Co, Ni) need the numeral; Group 1, Group 2, Al, Zn and Ag never do.',
      },
    ],
    tables: [
      {
        heading: 'Greek prefixes for molecular compounds',
        columns: ['Count', 'Prefix', 'Example'],
        rows: [
          ['1', 'mono- (2nd element only)', 'CO carbon monoxide'],
          ['2', 'di-', 'CO₂ carbon dioxide'],
          ['3', 'tri-', 'SO₃ sulfur trioxide'],
          ['4', 'tetra-', 'CCl₄ carbon tetrachloride'],
          ['5', 'penta-', 'PCl₅ phosphorus pentachloride'],
          ['6', 'hexa-', 'SF₆ sulfur hexafluoride'],
          ['7', 'hepta-', 'Cl₂O₇ dichlorine heptoxide'],
          ['8–10', 'octa-, nona-, deca-', 'P₄O₁₀ tetraphosphorus decoxide'],
        ],
      },
      {
        heading: 'Acid names from anion names',
        columns: ['Anion ending', 'Acid name', 'Example'],
        rows: [
          ['-ide', 'hydro-…-ic acid', 'Cl⁻ chloride → HCl hydrochloric acid'],
          ['-ate', '…-ic acid', 'SO₄²⁻ sulfate → H₂SO₄ sulfuric acid'],
          ['-ite', '…-ous acid', 'NO₂⁻ nitrite → HNO₂ nitrous acid'],
        ],
      },
    ],
    commonMistakes: [
      'Using prefixes on ionic compounds: "calcium dichloride" is wrong — CaCl2 is calcium chloride.',
      'Writing "carbon monooxide" — the vowel is dropped: monoxide, tetroxide, pentoxide.',
      'Putting a Roman numeral on sodium, zinc or aluminium — they have only one charge.',
    ],
    resources: [VCAA_DATA_BOOK, KHAN_HS_CHEM, IUPAC_GOLD_BOOK],
  },
  {
    slug: 'relative-formula-mass',
    title: 'Relative Atomic & Formula Mass',
    yearLevel: 'Year 10',
    category: 'Stoichiometry',
    summary:
      'What Ar really means, and how to add atoms up to get the Mr of any formula — subscripts and brackets included.',
    iconName: 'Scale',
    colorTheme: 'border-sky-500 text-sky-500',
    curriculumRef:
      'Not in the Victorian Curriculum F–10: Levels 9 and 10 cover conservation of mass and balanced equations (VC2S10U08), and relative atomic mass is not named. Most Year 10 courses teach it as pre-VCE extension, and it is formally VCE Unit 1.',
    // No relatedGames yet: the game that practises this (Mass Production,
    // slug reacting-quantities) is built but lives on its own branch until
    // its visuals are finished and a native speaker has read the five
    // translations. Relinking it is one line.
    keyTakeaways: [
      'Relative atomic mass (Ar) is a comparison, not a weight in grams: one carbon atom weighs about the same as 12 hydrogen atoms. Ar is measured against carbon-12, which is exactly 12.',
      'Because it is a ratio, Ar has no unit. Nothing in this sheet is measured in grams until you scale it up to a real amount.',
      'Relative formula mass (Mr) is every atom in the formula added up. Nothing else: no multiplying, no averaging.',
      'A subscript multiplies the atom before it. A bracket multiplies everything inside it.',
      'Read Ar off the periodic table. You are not expected to remember it, and a class table rounds it — H 1, C 12, O 16, Cl 35.5.',
      'Mr is the same idea for an ionic compound as for a molecule, which is why it is formula mass and not molecular mass: NaCl has no molecule to weigh.',
    ],
    formulaExamples: [
      { name: 'Water', formula: 'H2O', description: '2 × 1 + 16 = 18' },
      { name: 'Carbon dioxide', formula: 'CO2', description: '12 + 2 × 16 = 44' },
      { name: 'Calcium carbonate', formula: 'CaCO3', description: '40 + 12 + 3 × 16 = 100' },
      { name: 'Magnesium hydroxide', formula: 'Mg(OH)2', description: '24 + 2 × (16 + 1) = 58' },
      { name: 'Calcium nitrate', formula: 'Ca(NO3)2', description: '40 + 2 × (14 + 3 × 16) = 164' },
    ],
    sections: [
      {
        heading: 'What "relative" actually means',
        content:
          'Atoms are far too light to weigh one at a time, so chemists compare them instead. Put one carbon atom on one pan of a balance and hydrogen atoms on the other: it takes 12 hydrogens to make it level. That is the whole idea — carbon is 12 times as heavy as hydrogen, so we say its relative atomic mass is 12. The number answers "how many hydrogens?", which is why it has no unit: it is a comparison, not a measurement. Strictly, the standard is carbon-12, not hydrogen: every Ar compares an atom against one twelfth of a carbon-12 atom. Hydrogen lands on almost exactly 1, which is why the balance picture works.',
      },
      {
        heading: 'Adding the atoms up',
        content:
          'Relative formula mass (Mr) is the Ar of every atom in the formula, added together. Work left to right, one element at a time, and write the working down: H2O is 2 hydrogens at 1 each, plus 1 oxygen at 16, so 2 + 16 = 18. The order does not matter and nothing gets multiplied at the end — if you are reaching for a calculator for anything harder than a sum, something has gone wrong.',
        examples: [
          { name: 'Ammonia', formula: 'NH3', description: '14 + 3 × 1 = 17' },
          { name: 'Methane', formula: 'CH4', description: '12 + 4 × 1 = 16' },
          { name: 'Sulfuric acid', formula: 'H2SO4', description: '2 × 1 + 32 + 4 × 16 = 98' },
        ],
      },
      {
        heading: 'Subscripts and brackets',
        content:
          'A subscript multiplies only the atom it follows: the 2 in CO2 means two oxygens, not two of everything. A bracket multiplies the whole group inside it: Mg(OH)2 is one magnesium plus two OH units, so 24 + 2 × 17 = 58, not 24 + 16 + 1. When you see a bracket, work out the group once and then multiply.',
        examples: [
          { name: 'Aluminium sulfate', formula: 'Al2(SO4)3', description: '2 × 27 + 3 × (32 + 4 × 16) = 342' },
        ],
      },
      {
        heading: 'Why the table in class disagrees with the internet',
        content:
          'A data book gives chlorine as 35.45 and hydrogen as 1.008, because a real sample is a mixture of isotopes. A Year 10 table rounds: H 1, C 12, N 14, O 16, Cl 35.5. Both are right — the rounded one is easier to add up and accurate enough for every question you will be asked. Use the table your class uses, and say which one you used if the answer is close to a boundary.',
      },
      {
        heading: 'What it is for',
        content:
          'Once you can find the Mr of both sides of an equation, you can show mass is conserved in numbers, and you can scale a recipe: if 4 g of hydrogen makes 36 g of water, then 8 g makes 72 g. That is mass-to-mass by proportion, and it needs no mole at all. The mole comes later, as a shortcut for the same reasoning.',
      },
    ],
    tables: [
      {
        heading: 'The values a Year 10 class uses',
        caption:
          'Rounded the way a school table rounds them. Chlorine and copper keep a half because rounding them to a whole number would visibly spoil an answer.',
        columns: ['Element', 'Symbol', 'Ar'],
        rows: [
          ['Hydrogen', 'H', '1'],
          ['Carbon', 'C', '12'],
          ['Nitrogen', 'N', '14'],
          ['Oxygen', 'O', '16'],
          ['Sodium', 'Na', '23'],
          ['Magnesium', 'Mg', '24'],
          ['Aluminium', 'Al', '27'],
          ['Sulfur', 'S', '32'],
          ['Chlorine', 'Cl', '35.5'],
          ['Potassium', 'K', '39'],
          ['Calcium', 'Ca', '40'],
          ['Iron', 'Fe', '56'],
          ['Copper', 'Cu', '63.5'],
        ],
        formulaColumns: [1],
      },
      {
        heading: 'Worked examples',
        columns: ['Formula', 'Adding up', 'Mr'],
        rows: [
          ['H2', '2 × 1', '2'],
          ['O2', '2 × 16', '32'],
          ['H2O', '2 × 1 + 16', '18'],
          ['NaCl', '23 + 35.5', '58.5'],
          ['MgO', '24 + 16', '40'],
          ['CO2', '12 + 2 × 16', '44'],
          ['CaCO3', '40 + 12 + 3 × 16', '100'],
          ['H2SO4', '2 × 1 + 32 + 4 × 16', '98'],
          ['Mg(OH)2', '24 + 2 × (16 + 1)', '58'],
          ['Ca(NO3)2', '40 + 2 × (14 + 3 × 16)', '164'],
        ],
        formulaColumns: [0],
      },
    ],
    commonMistakes: [
      'Saying an atom of carbon "weighs 12" — 12 what? Ar is a comparison with hydrogen and has no unit. Grams only appear once you scale up to a real amount.',
      'Applying a subscript to the whole formula: in CO2 the 2 belongs to the oxygen alone.',
      'Ignoring a bracket, so Mg(OH)2 comes out as 41 instead of 58.',
      'Calling Mr the "molecular mass" for something like NaCl or MgO. There is no molecule there, which is exactly why it is called formula mass.',
      'Mixing a data-book value into a question built on the class table, then wondering why the answer disagrees with the worksheet by a fraction.',
      'Averaging the Ar values instead of adding them.',
    ],
    resources: [VCAA_DATA_BOOK, KHAN_HS_CHEM],
  },
  {
    slug: 'stoichiometry',
    title: 'The Mole & Stoichiometry',
    yearLevel: 'Senior',
    category: 'Stoichiometry',
    summary: 'Mole conversions, mole ratios, limiting reagents and percentage yield in one place.',
    iconName: 'Gauge',
    colorTheme: 'border-orange-500 text-orange-500',
    curriculumRef: 'VCE Unit 2 AoS 1–2 (the mole, concentration, stoichiometry); Unit 3 AoS 2 (yield).',
    relatedGames: ['reaction-balancer'],
    keyTakeaways: [
      'One mole is 6.02 × 10^23 particles (Avogadro\'s number, N_A). Molar mass M (g/mol) is the mass of one mole — add up the atomic masses from the periodic table.',
      'All roads go through moles: convert what you are given into moles, use the mole ratio from the balanced equation, then convert back to what is asked.',
      'The mole ratio is the ratio of coefficients — nothing else.',
      'Limiting reagent: the reactant that runs out first decides how much product forms. Find moles of each reactant, divide by its coefficient; the smallest result is limiting.',
      'Percentage yield = (actual yield ÷ theoretical yield) × 100. Theoretical yield comes from the limiting reagent.',
    ],
    formulaExamples: [
      { name: 'Combustion of methane', formula: 'CH4 (g) + 2O2 (g) -> CO2 (g) + 2H2O (l)' },
      { name: 'Ammonia synthesis', formula: 'N2 (g) + 3H2 (g) -> 2NH3 (g)' },
    ],
    tables: [
      {
        heading: 'The conversion formulas',
        columns: ['Formula', 'Use when you know…', 'Units'],
        rows: [
          ['n = m ÷ M', 'mass', 'n in mol, m in g, M in g/mol'],
          ['n = N ÷ N_A', 'number of particles', 'N_A = 6.02 × 10²³ mol⁻¹'],
          ['n = c × V', 'concentration of a solution', 'c in mol/L, V in L'],
          ['n = V ÷ V_m', 'volume of a gas at SLC', 'V_m = 24.8 L/mol at 25 °C and 100 kPa'],
          ['PV = nRT', 'gas at other conditions', 'P in kPa, V in L, T in K, R = 8.31'],
        ],
      },
    ],
    sections: [
      {
        heading: 'Worked example: mass → mass',
        content: 'What mass of water forms when 8.0 g of hydrogen burns completely? 2H2 + O2 → 2H2O. n(H2) = 8.0 ÷ 2.0 = 4.0 mol. Ratio H2 : H2O = 2 : 2, so n(H2O) = 4.0 mol. m(H2O) = 4.0 × 18.0 = 72 g.',
      },
      {
        heading: 'Worked example: limiting reagent',
        content: '4.0 mol H2 reacts with 1.0 mol O2. Divide by coefficients: H2 → 4.0 ÷ 2 = 2.0; O2 → 1.0 ÷ 1 = 1.0. Oxygen is limiting. n(H2O) = 2 × n(O2) = 2.0 mol; 2.0 mol of H2 is left over (in excess).',
      },
    ],
    commonMistakes: [
      'Using the mass ratio instead of the mole ratio — 2 g of H2 does not react with 1 g of O2.',
      'Picking the reactant with the smaller mass as limiting without converting to moles.',
      'Mixing units: volume in mL with c in mol/L gives moles ×1000 too big.',
      'Rounding early — keep full precision until the final answer, then give 3 significant figures.',
    ],
    resources: [
      PHET('reactants-products-and-leftovers', 'Reactants, Products and Leftovers', 'Sandwiches first, then real reactions — the clearest limiting-reagent visual there is.'),
      VCAA_DATA_BOOK,
      KHAN_HS_CHEM,
      LIBRETEXTS,
    ],
  },
  {
    slug: 'lewis-structures',
    title: 'Lewis Structures',
    yearLevel: 'Senior',
    category: 'Bonding',
    summary: 'Count the valence electrons, share to satisfy octets, check with formal charge.',
    iconName: 'Atom',
    colorTheme: 'border-teal-500 text-teal-500',
    curriculumRef: 'VCE Unit 1 AoS 1 (covalent bonding, Lewis structures, VSEPR shapes).',
    keyTakeaways: [
      'Valence electrons = group number for main-group elements (H 1, C 4, N 5, O 6, halogens 7). Add one electron per negative charge, remove one per positive charge.',
      'Each bond is a shared pair (2 electrons). Single = 1 pair, double = 2, triple = 3. Electrons not in bonds sit as lone pairs.',
      'Octet rule: most atoms want 8 valence electrons around them. Hydrogen wants 2 (duet).',
      'If the central atom is short of an octet after using all electrons, convert lone pairs on outer atoms into extra bonds.',
      'Formal charge = valence electrons − lone-pair electrons − half the bonding electrons. The best structure has formal charges closest to zero, with any negative charge on the most electronegative atom.',
    ],
    formulaExamples: [
      { name: 'Water — 2 bonds, 2 lone pairs on O', formula: 'H2O' },
      { name: 'Carbon dioxide — two double bonds', formula: 'CO2' },
      { name: 'Nitrogen — triple bond', formula: 'N2' },
      { name: 'Ammonium ion — 8 electrons (5 + 4 − 1)', formula: 'NH4+' },
    ],
    sections: [
      {
        heading: 'Year 10 essentials',
        content:
          'Every atom brings its outer electrons as dots. A dot on its own is a loner; two loners from two different atoms make a shared pair, which is one bond (drawn as a line). Pairs that stay on one atom are lone pairs. An atom is full at 8 dots around it (an octet) — hydrogen is full at 2 (a duet). Share twice between the same two atoms for a double bond, three times for a triple. The number of loners tells you how many bonds an atom makes: H 1, C 4, N 3, O 2, Cl 1. Sulfur behaves like oxygen and phosphorus like nitrogen because they are in the same groups. Everything below this section (formal charge, VSEPR shapes, octet exceptions) is Senior content.',
        examples: [
          { name: 'Water — oxygen shares twice, keeps 2 lone pairs', formula: 'H2O' },
          { name: 'Methane — carbon shares all four loners', formula: 'CH4' },
          { name: 'Oxygen — two shared pairs make a double bond', formula: 'O2' },
        ],
      },
      {
        heading: 'The five steps',
        content: '1. Count total valence electrons (adjust for charge). 2. Put the least electronegative atom in the centre (never H). 3. Join every outer atom to the centre with a single bond. 4. Place remaining electrons as lone pairs on outer atoms first, then the centre. 5. If the centre lacks an octet, make double/triple bonds. Check the total electron count matches step 1.',
      },
      {
        heading: 'From Lewis structure to shape (VSEPR)',
        content: 'Count electron regions around the central atom (each bond, single or multiple, counts once; each lone pair counts once). 4 regions → tetrahedral (109.5°); with 1 lone pair → trigonal pyramidal (NH3); with 2 lone pairs → bent (H2O). 3 regions → trigonal planar (120°). 2 regions → linear (180°).',
      },
      {
        heading: 'Exceptions to the octet',
        content: 'Be and B are often stable with fewer than 8 (BF3 has 6). Period 3 and below can exceed 8 (PCl5 has 10, SF6 has 12). NO and NO2 have an odd number of electrons, so one atom cannot have an octet.',
      },
    ],
    tables: [
      {
        heading: 'Valence electrons by group',
        columns: ['Group', 'Valence e⁻', 'Bonds usually formed', 'Examples'],
        rows: [
          ['1 (H)', '1', '1', 'H'],
          ['14', '4', '4', 'C, Si'],
          ['15', '5', '3 (+1 lone pair)', 'N, P'],
          ['16', '6', '2 (+2 lone pairs)', 'O, S'],
          ['17', '7', '1 (+3 lone pairs)', 'F, Cl, Br, I'],
          ['18', '8', '0', 'Ne, Ar'],
        ],
      },
    ],
    commonMistakes: [
      'Drawing electrons on rings like planets — the dots show how many, not where they are.',
      'Forgetting to add electrons for a negative ion (or remove for a positive one).',
      'Giving hydrogen more than one bond.',
      'Leaving the central atom with fewer than 8 when a double bond would fix it (CO2, HCN).',
    ],
    resources: [
      PHET('molecule-shapes', 'Molecule Shapes', 'Add bonds and lone pairs to a central atom and watch the VSEPR shape change.'),
      PHET('build-a-molecule', 'Build a Molecule', 'Practise assembling molecules from atoms.'),
      MOLVIEW,
      CHEMGUIDE,
    ],
    relatedGames: ['lewis-structures'],
  },
  {
    slug: 'organic-nomenclature',
    title: 'Naming Organic Compounds',
    yearLevel: 'Senior',
    category: 'Organic',
    summary: 'IUPAC names step by step: longest chain, lowest locants, alphabetical substituents, functional-group suffix.',
    iconName: 'Dna',
    colorTheme: 'border-lime-500 text-lime-500',
    curriculumRef: 'VCE Unit 4 AoS 1 (IUPAC systematic naming of organic compounds).',
    keyTakeaways: [
      'Find the longest continuous carbon chain that includes the highest-priority functional group — it might bend around corners of the drawing.',
      'Number the chain from the end that gives the functional group the lowest number; if there is no functional group, give the first substituent the lowest number.',
      'Name substituents as prefixes with their locants: 2-methyl, 3-chloro. Use di-, tri- for repeats and list alphabetically (ignore di-/tri- when ordering: ethyl before dimethyl).',
      'The root gives the chain length; the suffix gives the main functional group: -ane, -ene, -yne, -ol, -al, -one, -oic acid, -amine.',
      'Numbers are separated from words by hyphens and from each other by commas: 2,2-dimethylpropan-1-ol.',
    ],
    formulaExamples: [
      { name: 'Propan-2-ol', formula: 'CH3CH(OH)CH3' },
      { name: 'But-1-ene', formula: 'CH2=CHCH2CH3' },
      { name: '2-methylpropane', formula: 'CH3CH(CH3)CH3' },
      { name: 'Ethanoic acid', formula: 'CH3COOH' },
    ],
    tables: [
      {
        heading: 'Root names',
        columns: ['Carbons', 'Root', 'Alkane'],
        rows: [
          ['1', 'meth-', 'methane CH₄'],
          ['2', 'eth-', 'ethane C₂H₆'],
          ['3', 'prop-', 'propane C₃H₈'],
          ['4', 'but-', 'butane C₄H₁₀'],
          ['5', 'pent-', 'pentane C₅H₁₂'],
          ['6', 'hex-', 'hexane C₆H₁₄'],
          ['7', 'hept-', 'heptane C₇H₁₆'],
          ['8', 'oct-', 'octane C₈H₁₈'],
          ['9', 'non-', 'nonane C₉H₂₀'],
          ['10', 'dec-', 'decane C₁₀H₂₂'],
        ],
      },
      {
        heading: 'Suffix priority (highest first)',
        columns: ['Group', 'Suffix', 'Example'],
        rows: [
          ['Carboxylic acid', '-oic acid', 'propanoic acid'],
          ['Ester', '-yl …-oate', 'methyl ethanoate'],
          ['Aldehyde', '-al', 'ethanal'],
          ['Ketone', '-one', 'propan-2-one'],
          ['Alcohol', '-ol', 'butan-2-ol'],
          ['Amine', '-amine', 'ethanamine'],
          ['Alkene / alkyne', '-ene / -yne', 'but-2-ene'],
          ['Haloalkane', 'prefix: fluoro-, chloro-, bromo-, iodo-', '2-chloropropane'],
        ],
      },
    ],
    sections: [
      {
        heading: 'Worked example',
        content: 'A 5-carbon chain with an OH on carbon 2 and a methyl on carbon 3. Root: pent-. Suffix: -ol with locant 2 (numbering from the end nearest the OH). Substituent: 3-methyl. Name: 3-methylpentan-2-ol.',
      },
    ],
    commonMistakes: [
      'Taking the chain as drawn horizontally instead of the longest chain.',
      'Numbering from the wrong end — the functional group beats the substituents.',
      'Alphabetising by the multiplier: "dimethyl" files under m, not d.',
      'Forgetting the locant for -ene, -ol, -one when the chain has 4 or more carbons.',
    ],
    resources: [CHEMGUIDE, MOLVIEW, PUBCHEM, KHAN_HS_CHEM, IUPAC_GOLD_BOOK],
  },
  {
    slug: 'functional-groups',
    title: 'Functional Groups',
    yearLevel: 'Senior',
    category: 'Organic',
    summary: 'What each group looks like, how it is named, and the reactions it undergoes.',
    iconName: 'FlaskConical',
    colorTheme: 'border-pink-500 text-pink-500',
    curriculumRef: 'VCE Unit 4 AoS 1 (functional groups, homologous series, reaction pathways) and AoS 2 (identification by IR/NMR).',
    keyTakeaways: [
      'A functional group is the atom or group of atoms that gives a molecule its characteristic reactions. Molecules with the same group react in the same way.',
      'A homologous series is a family with the same functional group and a general formula, each member differing by CH2. Physical properties change gradually along the series.',
      'Hydrocarbons: alkanes (C–C only, saturated), alkenes (C=C), alkynes (C≡C). Only alkenes and alkynes undergo addition reactions.',
      'Oxygen groups: alcohol (–OH), aldehyde (–CHO, on the end carbon), ketone (C=O inside the chain), carboxylic acid (–COOH), ester (–COO–).',
      'Nitrogen and halogen groups: amine (–NH2), amide (–CONH2), haloalkane (–F, –Cl, –Br, –I).',
    ],
    formulaExamples: [
      { name: 'Ethanol (alcohol)', formula: 'CH3CH2OH' },
      { name: 'Ethanal (aldehyde)', formula: 'CH3CHO' },
      { name: 'Propanone (ketone)', formula: 'CH3COCH3' },
      { name: 'Ethanoic acid (carboxylic acid)', formula: 'CH3COOH' },
      { name: 'Ethyl ethanoate (ester)', formula: 'CH3COOCH2CH3' },
      { name: 'Ethanamine (amine)', formula: 'CH3CH2NH2' },
    ],
    tables: [
      {
        heading: 'Functional group reference',
        columns: ['Group', 'Structure', 'Suffix / prefix', 'General formula', 'Typical reaction'],
        rows: [
          ['Alkane', 'C–C, C–H only', '-ane', 'CₙH₂ₙ₊₂', 'Combustion; substitution with halogens (UV)'],
          ['Alkene', 'C=C', '-ene', 'CₙH₂ₙ', 'Addition (H₂, X₂, HX, H₂O)'],
          ['Haloalkane', 'C–X', 'halo-', 'CₙH₂ₙ₊₁X', 'Substitution with OH⁻ or NH₃'],
          ['Alcohol', 'C–OH', '-ol', 'CₙH₂ₙ₊₁OH', 'Oxidation (1° → aldehyde → acid; 2° → ketone); esterification'],
          ['Aldehyde', '–CHO', '-al', 'CₙH₂ₙO', 'Oxidises to carboxylic acid'],
          ['Ketone', 'C=O (internal)', '-one', 'CₙH₂ₙO', 'Resists oxidation'],
          ['Carboxylic acid', '–COOH', '-oic acid', 'CₙH₂ₙO₂', 'Weak acid; esterification with alcohol'],
          ['Ester', '–COO–', 'alkyl …-oate', '—', 'Hydrolysis back to acid + alcohol'],
          ['Amine', '–NH₂', '-amine', 'CₙH₂ₙ₊₁NH₂', 'Weak base; forms amides with acids'],
          ['Amide', '–CONH₂', '-amide', '—', 'Hydrolysis'],
        ],
      },
    ],
    sections: [
      {
        heading: 'The reaction pathway you must know',
        content: 'Alkene → (H2O, H+ catalyst) → alcohol. Alkene → (HX) → haloalkane → (OH−) → alcohol → (Cr2O7 2−/H+) → aldehyde → (further oxidation) → carboxylic acid → (alcohol, H2SO4 catalyst) → ester. Primary alcohols oxidise twice, secondary alcohols oxidise once to ketones, tertiary alcohols do not oxidise.',
      },
      {
        heading: 'Spotting groups in a spectrum',
        content: 'IR: a broad O–H stretch around 3200–3550 cm⁻¹ means alcohol (or, very broad and overlapping C–H, carboxylic acid); a strong C=O near 1670–1750 cm⁻¹ means aldehyde, ketone, acid, ester or amide. The VCE data book lists the exact ranges — use it.',
      },
    ],
    commonMistakes: [
      'Calling a molecule with –OH on a benzene ring an alcohol (it is a phenol) — outside VCE scope, but a common trap.',
      'Confusing an aldehyde (C=O at the end) with a ketone (C=O in the middle).',
      'Thinking esters are acids because they contain –COO– — they have no acidic H.',
    ],
    resources: [
      {
        label: 'Compound Interest — functional groups chart',
        url: 'https://www.compoundchem.com/2020/02/21/functional-groups/',
        description: 'A one-page infographic of every group with structure and example — print it.',
        audience: 'student',
      },
      {
        label: 'Compound Interest — organic reaction map',
        url: 'https://www.compoundchem.com/2014/02/17/organic-chemistry-reaction-map/',
        description: 'The reaction pathways between groups on one page.',
        audience: 'student',
      },
      CHEMGUIDE,
      VCAA_DATA_BOOK,
      {
        label: 'SDBS spectral database (AIST)',
        url: 'https://sdbs.db.aist.go.jp/',
        description: 'Real IR and NMR spectra for thousands of organic compounds.',
        audience: 'teacher',
      },
      {
        label: 'NIST Chemistry WebBook',
        url: 'https://webbook.nist.gov/chemistry/',
        description: 'Reference spectra and thermochemical data.',
        audience: 'teacher',
      },
    ],
  },
];

// Keep the study design link discoverable from every sheet without repeating it in each list.
export const GLOBAL_TEACHER_RESOURCES: CheatSheetResource[] = [VCAA_STUDY_DESIGN, RSC_PTABLE];

/** Helper query functions for App Router pages & tests */
export function getCheatSheetBySlug(slug: string): CheatSheetTopic | undefined {
  return CHEAT_SHEETS.find((sheet) => sheet.slug === slug);
}

export function getAllCheatSheetSlugs(): string[] {
  return CHEAT_SHEETS.map((sheet) => sheet.slug);
}
