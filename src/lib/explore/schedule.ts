// src/lib/explore/schedule.ts
//
// The twenty weeks, in order. A twenty-week cycle: most of a school year before
// anything comes round again.
//
// ## Why this is a hand-written list and not a computed shuffle
//
// Nobody sets out to schedule eight men in a row. It happens because the famous
// names that come to mind first are men and each individual choice looks
// defensible, and by the time anyone notices, a reader who was there for those
// eight weeks has already had the lesson. So the order is written down, and
// `schedule.test.ts` asserts the invariant that matters: **for every prefix of
// this list, the number of women and the number of men differ by at most one.**
// Prefix, not total. A pool that is fifty-fifty overall but front-loads six men
// is still six weeks of six men for whoever was reading.
//
// Here that falls out of strict alternation, which is the simplest thing that
// satisfies it and the easiest to check by eye.
//
// ## Why pairs
//
// Both sections turn over on the same Monday, so the week may as well be about
// one thing. The molecule and the scientist share a theme, and in most weeks
// they share a destination too — so the page points somewhere, rather than
// pointing in two directions at once.
//
// ## Appending is safe; reordering is not
//
// The rotation is `weekIndex % pool.length`, so adding a twenty-first pair is
// harmless — it lengthens the cycle. It does change which pair a given future
// week shows, which is fine for editorial content and is stated in
// `rotation.ts`. Reordering or removing a pair does the same thing, but also
// breaks the balance invariant unless you re-check it; the test will tell you.

import type { ExplorePair } from './types';

export const EXPLORE_SCHEDULE: ExplorePair[] = [
  {
    theme: 'What the shape of a molecule really is, and how anyone found out',
    moleculeId: 'benzene',
    scientistId: 'kathleen-lonsdale',
  },
  {
    theme: 'Measuring how acidic something is',
    moleculeId: 'citric-acid',
    scientistId: 'soren-sorensen',
  },
  {
    theme: 'Solids that are ordered, and solids that only look it',
    moleculeId: 'silicon-dioxide',
    scientistId: 'katharine-blodgett',
  },
  {
    theme: 'Taste is a molecule fitting a receptor',
    moleculeId: 'monosodium-glutamate',
    scientistId: 'kikunae-ikeda',
  },
  {
    theme: 'A reaction that runs on a surface, and a molecule too stable for its own good',
    moleculeId: 'cfc-12',
    scientistId: 'susan-solomon',
  },
  {
    theme: 'Taking nitrogen out of the air',
    moleculeId: 'ammonia',
    scientistId: 'fritz-haber',
  },
  {
    theme: 'One hydroxyl group, and what a cell membrane does with it',
    moleculeId: 'cholesterol',
    scientistId: 'marie-maynard-daly',
  },
  {
    theme: 'Adding hydrogen across a double bond',
    moleculeId: 'oleic-acid',
    scientistId: 'paul-sabatier',
  },
  {
    theme: 'Putting a number on how much energy a reaction gives out',
    moleculeId: 'methane',
    scientistId: 'reatha-clark-king',
  },
  {
    theme: 'Shared pairs, lone pairs, and the shape they force',
    moleculeId: 'water',
    scientistId: 'gilbert-lewis',
  },
  {
    theme: 'Why a chain that lines up is stronger than one that does not',
    moleculeId: 'kevlar',
    scientistId: 'stephanie-kwolek',
  },
  {
    theme: 'Ions moving in and out of a solid, over and over',
    moleculeId: 'lithium-cobalt-oxide',
    scientistId: 'akira-yoshino',
  },
  {
    theme: 'Copying DNA, one hydrogen-bonded pair at a time',
    moleculeId: 'adenine',
    scientistId: 'margarita-salas',
  },
  {
    theme: 'Groups of atoms that travel as one ion',
    moleculeId: 'sodium-bicarbonate',
    scientistId: 'alfred-werner',
  },
  {
    theme: 'Getting nitrogen into a crop without a factory',
    moleculeId: 'urea',
    scientistId: 'johanna-dobereiner',
  },
  {
    theme: 'Mirror-image molecules, and how to name which is which',
    moleculeId: 'limonene',
    scientistId: 'vladimir-prelog',
  },
  {
    theme: 'Storing heat in a change of state',
    moleculeId: 'sodium-sulfate',
    scientistId: 'maria-telkes',
  },
  {
    theme: 'Regular chains, and the catalyst that makes them regular',
    moleculeId: 'polypropylene',
    scientistId: 'giulio-natta',
  },
  {
    theme: 'A weak bond that turns out to be the whole point',
    moleculeId: 'artemisinin',
    scientistId: 'tu-youyou',
  },
  {
    theme: 'What a crystal is, and what happens when one breaks the rules',
    moleculeId: 'sodium-chloride',
    scientistId: 'dan-shechtman',
  },
];
