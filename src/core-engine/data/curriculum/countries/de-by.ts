// src/core-engine/data/curriculum/countries/de-by.ts
//
// Bavaria, Gymnasium (G9, LehrplanPLUS). Source:
// docs/curriculum/countries/germany-bavaria.md, §2–3.
//
// Researched in depth for organic chemistry, kinetics, energetics and
// equilibrium (`coveredAreas`); other placements below are facts from the same
// Lehrplan pages, but those areas were not swept for completeness.
//
// Routes. The main route is the non-NTG Gymnasium (HG, SG, MuG, WSG): chemistry
// in Jgst. 9 and 10 only. `ntg` is the science track, which starts chemistry in
// Jgst. 8, meets the Jgst. 10 organic content a year early, and alone has
// chemistry in Jgst. 11. An NTG student querying with `track: 'ntg'` also sees
// the main-route Jgst. 10 placements, which they met in Jgst. 9.
// In the Oberstufe (Jgst. 12–13) chemistry is chosen at `ga` (grundlegendes
// Anforderungsniveau, 3 h) or `ea` (erhöhtes, the Leistungsfach, about 5 h).
// Content common to both is placed twice, once per track, via `both()`.

import type { Depth, JurisdictionCurriculum, Placement, SchoolYear } from '../../../types/curriculum';
import { at } from '../placement';

const ntg = { track: 'ntg' } as const;
const ga = { track: 'ga' } as const;
const ea = { track: 'ea' } as const;

/** A placement on both Oberstufe courses. */
const both = (years: SchoolYear | readonly [SchoolYear, SchoolYear], depth: Depth, note?: string): Placement[] => [
  at(years, depth, { ...ga, note }),
  at(years, depth, { ...ea, note }),
];

export const DE_BY: JurisdictionCurriculum = {
  code: 'DE-BY',
  country: 'DE',
  coveredAreas: ['organic', 'kinetics', 'energetics', 'equilibrium'],
  name: 'Germany — Bavaria (Gymnasium)',
  basis: 'LehrplanPLUS Gymnasium Chemie (G9): Jgst. 8 NTG, 9 and 10 (NTG and non-NTG), 11 NTG, 12 and 13 at gA and eA; ISB Kontaktbriefe 2024–2026.',
  researchedOn: '2026-09-24',
  report: 'docs/curriculum/countries/germany-bavaria.md',
  reviewedByTeacher: false,
  years: [
    { year: 7, localLabel: 'Jgst. 7', localLabelEn: '7. Klasse', typicalAgeAtStart: 12, stage: 'Unterstufe', delivery: 'integrated-science', note: 'Natur und Technik; its chemistry content was not researched.' },
    { year: 8, localLabel: 'Jgst. 8', localLabelEn: '8. Klasse', typicalAgeAtStart: 13, stage: 'Mittelstufe', delivery: 'optional', note: 'Chemistry for NTG students only.' },
    { year: 9, localLabel: 'Jgst. 9', localLabelEn: '9. Klasse', typicalAgeAtStart: 14, stage: 'Mittelstufe', delivery: 'separate', note: 'First chemistry year for non-NTG tracks (2 h); second for NTG.' },
    { year: 10, localLabel: 'Jgst. 10', localLabelEn: '10. Klasse', typicalAgeAtStart: 15, stage: 'Mittelstufe', delivery: 'separate', note: 'Non-NTG 3 h; the main organic chemistry year for non-NTG tracks.' },
    { year: 11, localLabel: 'Jgst. 11', localLabelEn: '11. Klasse (Einführungsphase)', typicalAgeAtStart: 16, stage: 'Einführungsphase', delivery: 'optional', note: 'Chemistry for NTG only: food chemistry and pharmacy.' },
    { year: 12, localLabel: 'Q12', localLabelEn: 'Jgst. 12 (Qualifikationsphase)', typicalAgeAtStart: 17, stage: 'Qualifikationsphase (Profil- und Leistungsstufe)', delivery: 'optional', note: 'Chemistry at gA (3 h) or as eA Leistungsfach (about 5 h, unverified).' },
    { year: 13, localLabel: 'Q13', localLabelEn: 'Jgst. 13 (Abitur year)', typicalAgeAtStart: 18, stage: 'Qualifikationsphase (Profil- und Leistungsstufe)', delivery: 'optional', note: 'Abitur from the joint IQB task pool.' },
  ],
  tracks: {
    ntg: 'Naturwissenschaftlich-technologisches Gymnasium: chemistry from Jgst. 8, one year ahead in 8–10, plus Jgst. 11',
    ga: 'Oberstufe chemistry at grundlegendes Anforderungsniveau (gA), Jgst. 12–13',
    ea: 'Oberstufe chemistry as Leistungsfach, erhöhtes Anforderungsniveau (eA), Jgst. 12–13',
  },
  change: {
    stability: 'stable',
    reason: 'The G9 LehrplanPLUS reached Jgst. 13 in 2025/26 and the ISB announced no content changes for 2026/27.',
    lastMajorRevision: { year: 2017, what: 'LehrplanPLUS for the new G9, introduced year by year from Jgst. 5 (2017) to Jgst. 13 (2025/26)' },
    typicalIntervalYears: [10, 15],
    mechanism: 'ad-hoc',
    minorUpdates: 'ISB Kontaktbriefe and support materials each September; Abitur tasks from the IQB pool from 2026.',
    upcoming: [],
    recheckBy: '2027-09-30',
  },
  placements: {
    // ── Organic ──────────────────────────────────────────────────────────────
    'organic-intro': [at(9, 'intro', { note: 'Combustion and names of the alkanes (LB3)' }), at(8, 'intro', { ...ntg, status: 'unverified' })],
    hydrocarbons: [
      at(9, 'intro', { note: 'Alkanes' }),
      at(10, 'develop', { note: 'Branched and cyclic hydrocarbons; alkenes and alkynes (LB2)' }),
      at(9, 'develop', ntg),
    ],
    'crude-oil-fuels': [at(10, 'intro', { note: 'Erdölprodukte (LB3)' }), at(9, 'intro', ntg)],
    'homologous-series': [at(10, 'develop', { status: 'unverified', note: 'Implied by alkane naming; not named in the Lehrplan text read' })],
    'functional-groups': [at(10, 'develop', { note: 'Alcohol, aldehyde, ketone, carboxylic acid (LB3)' }), at(9, 'develop', ntg)],
    'oxygen-organics': [
      at(10, 'develop', { note: 'Redox series of the alcohols; ester condensation and hydrolysis (LB5–LB6)' }),
      ...both(12, 'develop', 'Acidity of alcohols vs carboxylic acids revisited'),
    ],
    'nitrogen-organics': [at(11, 'intro', { ...ntg, note: 'Carboxamides (Pharmazie)' }), ...both(13, 'develop', '2-Aminocarbonsäuren')],
    'aromatic-compounds': [at(12, 'extend', { ...ea, note: 'Benzene, mesomerism energy, electrophilic aromatic substitution' })],
    isomerism: [at(10, 'develop', { note: 'Konstitutionsisomerie' }), at(9, 'develop', ntg)],
    'geometric-isomerism': [at(10, 'develop', { note: 'E/Z, not cis/trans' }), at(9, 'develop', ntg)],
    'optical-isomerism': [
      at(11, 'develop', { ...ntg, note: 'Fischer projection, D/L' }),
      at(13, 'extend', { ...ea, note: 'Not in 13 gA' }),
    ],
    'organic-reaction-types': [...both(12, 'develop', 'Radical substitution, electrophilic addition (LB5)')],
    'reaction-mechanisms': [
      at(10, 'intro', { note: 'Acid-catalysed ester condensation, base-induced hydrolysis; ring closure of sugars (LB6)' }),
      ...both(12, 'develop', 'Homolysis/heterolysis; radical substitution and electrophilic addition'),
      at(12, 'extend', { ...ea, note: 'Nucleophilic substitution (eA only)' }),
      ...both(13, 'develop', 'Radical polymerisation with mechanism'),
    ],
    'reaction-pathways': [at(11, 'intro', { ...ntg, note: 'Simple retrosynthesis (steps only)' })],
    'organic-nomenclature': [
      at(9, 'intro', { note: 'Names of the alkanes' }),
      at(10, 'develop', { note: 'ISB rules: Propan-2-ol, Hex-2-en-1,4-diol; trivial names alongside' }),
      at(9, 'develop', ntg),
    ],
    'functional-group-tests': [
      at(10, 'intro', { note: 'Fehling, Tollens (Silberspiegel), Schiff (LB5)' }),
      ...both(12, 'develop', 'Bromwasser, DNPH, Fehling, Tollens, Schiff, BTB (LB3 Analytik)'),
    ],
    'structural-formulas': [at(10, 'develop', { note: 'Valenzstrich-, Keilstrich-, Halbstruktur-, Skelett-, Projektionsformel (LB1)' }), at(9, 'develop', ntg)],
    'intermolecular-forces': [at(10, 'develop'), at(9, 'develop', ntg), ...both(12, 'develop', 'All interaction types compared (LB4)')],
    'oxidation-states': [at(10, 'develop', { note: 'Oxidationszahlen in inorganic and organic particles' })],
    'organic-synthesis-techniques': [at(11, 'develop', { ...ntg, note: 'Synthesis and extraction of ASS; co-chromatography' })],
    chromatography: [at(11, 'develop', { ...ntg, note: 'TLC, Rf' }), at(12, 'extend', { ...ea, note: 'TLC, HPLC, GC' })],
    'addition-polymerisation': [...both(13, 'develop', 'Radical polymerisation')],
    'condensation-polymerisation': [...both(13, 'develop', 'Polyester, polyamide')],
    'polymers-intro': [...both(13, 'develop', 'Werkstoffe nach Maß')],
    carbohydrates: [at(10, 'intro', { note: 'Glucose, fructose, sucrose' }), at(11, 'develop', { ...ntg, note: 'Haworth projection, glycosidic bond, polysaccharides' })],
    lipids: [at(10, 'intro', { note: 'Fats as esters' }), at(10, 'develop', { ...ntg, note: 'Fats, soaps, tensides (Profil)' })],
    'amino-acids-proteins': [at(10, 'intro', { note: 'Peptide bond' }), at(11, 'develop', ntg), ...both(13, 'develop', 'Protein structure, enzymes')],
    // ── Energetics ───────────────────────────────────────────────────────────
    'exo-endothermic': [
      at(9, 'intro', { note: '"Reaktionsenergie" only; no enthalpy before Jgst. 12' }),
      at(8, 'intro', ntg),
      ...both(12, 'develop', 'Systems; Reaktionsenergie vs Reaktionsenthalpie (LB5)'),
    ],
    'reaction-profiles': [
      at(9, 'intro', { note: 'Activation, energy diagrams, catalysed reactions (LB3)' }),
      at(8, 'intro', ntg),
      ...both(12, 'develop'),
    ],
    'enthalpy-calorimetry': [at(10, 'intro', { ...ntg, note: 'Heat of neutralisation (Profil)' }), ...both(12, 'develop', 'Calorimetry, Brennwert (LB5)')],
    'hess-law': [...both(12, 'develop', 'Standard reaction enthalpies')],
    'bond-energies': [...both(12, 'develop', 'Reaction enthalpy explained from bonding')],
    'entropy-gibbs': [
      at(12, 'develop', { ...ga, note: 'Gibbs–Helmholtz qualitative only' }),
      at(12, 'extend', { ...ea, note: 'Qualitative and quantitative; exergonic/endergonic' }),
    ],
    'fuels-energy': [at(8, 'intro', { ...ntg, note: 'Evaluating energy sources' }), ...both(12, 'develop', 'Fossil and renewable feedstocks, Power-to-Gas')],
    combustion: [at(9, 'intro', { note: 'Combustion of simple hydrocarbons' })],
    // ── Kinetics (12 LB6; no rate law, order or Arrhenius — unverified against the ISB 12.6 supplement) ──
    'rate-factors': [...both(12, 'develop', 'Concentration, pressure, temperature (RGT-Regel), Zerteilungsgrad, catalyst')],
    'collision-theory': [...both(12, 'develop', 'Stoßtheorie: orientation, speed, Mindestenergie')],
    catalysts: [at(9, 'intro'), at(8, 'intro', ntg), ...both(12, 'develop', 'Homogeneous and heterogeneous catalysis')],
    'measuring-rate': [...both(12, 'develop', 'Mean and instantaneous rate from graphs')],
    'maxwell-boltzmann': [...both(12, 'develop')],
    // ── Equilibrium (12 LB7) ─────────────────────────────────────────────────
    'reversible-reactions': [at(10, 'intro', { note: 'Reversibility, the equilibrium arrow' }), ...both(12, 'develop')],
    'le-chatelier': [...both(12, 'develop', 'A catalyst does not shift the equilibrium')],
    'equilibrium-constant': [
      at(12, 'develop', { ...ga, note: 'Given values plugged into the MWG' }),
      at(12, 'extend', { ...ea, note: 'Equilibrium concentrations calculated first' }),
    ],
    'solubility-product': [at(12, 'extend', { ...ea, note: 'KL, common-ion effect' })],
    'industrial-processes': [...both(12, 'develop', 'Haber–Bosch')],
    // ── Electrochemistry (12 LB8), placed for completeness of the energetics link ──
    'electrochemical-cells': [...both(12, 'develop')],
    'electrode-potentials': [...both(12, 'develop'), at(12, 'extend', { ...ea, note: 'Nernst equation' })],
  },
  outsideRange: [
    'Jgst. 13 content outside the covered areas: colour and dyes (azo coupling eA), acid–base equilibria with pKS and buffers, corrosion, sustainability.',
  ],
};
