// src/lib/explore/molecules.ts
//
// Molecule of the Week: the canonical English pool.
//
// ## Two kinds of entry, and why
//
// Five of these species are already in `COMPOUNDS_REGISTRY`. Those carry a
// `compoundId` and **no name and no formula of their own** — the registry is
// the single source of truth for both, and `molecules.test.ts` asserts the
// exclusivity in both directions. That is not tidiness: a second copy of
// `NaHCO3` in this file is a second thing to keep right, and the one that
// silently goes wrong is always the copy. It also means those five get their
// translated names from `chemistry-names/<locale>.ts` for free, which already
// covers every registry compound in all five locales.
//
// The other fifteen are not in the registry — it holds the acids, bases and
// salts the games need, not caffeine or Kevlar — so they carry their own
// `name` and `formula`, and their names are translated in the Explore overlay
// like any other prose.
//
// ## Writing rules
//
// `everyday` then `chemistry`, 120–180 English words together, reading age ~12,
// one idea per sentence. Formulae are written as plain ASCII for `MoleculeText`
// (`H2O`, `CH4 + 2O2 -> CO2 + 2H2O`) and are never translated — the parity test
// in src/i18n/explore.test.ts checks that a formula in the English survives
// byte-identical into every overlay.
//
// Every entry links to the cheat sheet or game that teaches the chemistry it is
// actually about. An entry that cannot is the wrong molecule for this site.

import type { ExploreMolecule } from './types';

export const EXPLORE_MOLECULES: ExploreMolecule[] = [
  {
    id: 'benzene',
    image: {
      src: '/explore/molecules/benzene.svg',
      width: 720,
      height: 400,
    },
    name: 'Benzene',
    formula: 'C6H6',
    everyday:
      'Benzene is one of the smaller ingredients of petrol, and it is made in huge quantities as a starting material for plastics, nylon and dyes. You will probably never meet a bottle of it. You meet its ring constantly: that six-carbon hexagon is at the heart of paracetamol, of polystyrene and of several amino acids in your own body. Benzene is a known cause of leukaemia. The law caps it at one per cent by volume in fuel in the UK and the EU. It is also why petrol stations are built to stay ventilated.',
    chemistry:
      'The ring is six carbons in a flat hexagon, each with one hydrogen sticking out. What makes it unusual is that six of its electrons do not belong to any one bond. They are spread around the whole ring, above and below the flat hexagon. That spreading out is why benzene is far less reactive than three double bonds would suggest. It is also why all six carbon-to-carbon bonds are exactly the same length, instead of alternating short and long.',
    link: { kind: 'cheat-sheet', slug: 'chemical-bonds' },
    writtenOn: '2026-09-19',
    reviewedOn: '2026-09-19',
    sourcesVerifiedOn: '2026-09-19',
    sources: [
      {
        label: 'PubChem — Benzene',
        url: 'https://pubchem.ncbi.nlm.nih.gov/compound/241',
      },
    ],
    isActive: true,
  },

  {
    id: 'citric-acid',
    image: {
      src: '/explore/molecules/citric-acid.svg',
      width: 720,
      height: 400,
    },
    name: 'Citric acid',
    formula: 'C6H8O7',
    everyday:
      'Citric acid is what makes a lemon sharp — it is around five per cent of lemon juice by weight. It is also the sour coating on sweets, the tang in a fizzy drink and the active ingredient in kettle descaler. It goes into almost any tinned food too, where it adds flavour and helps keep the contents from spoiling. Most of the citric acid sold is not squeezed out of fruit at all. It is made by feeding sugar to a mould, which produces it by the tonne.',
    chemistry:
      'The molecule carries three carboxylic acid groups, and each one can let go of a hydrogen ion. That makes it a weak acid: in water it gives up its hydrogens only partly, and not all at once. Weak is the useful part. A strong acid at the same concentration would take the enamel off your teeth, while citric acid stops at making your mouth pucker. It also grips metal ions tightly, which is what lifts limescale out of a kettle.',
    link: { kind: 'cheat-sheet', slug: 'acids-and-bases' },
    writtenOn: '2026-09-19',
    reviewedOn: '2026-09-19',
    sourcesVerifiedOn: '2026-09-19',
    sources: [
      {
        label: 'PubChem — Citric acid',
        url: 'https://pubchem.ncbi.nlm.nih.gov/compound/311',
      },
    ],
    isActive: true,
  },

  {
    id: 'silicon-dioxide',
    image: {
      src: '/explore/molecules/silicon-dioxide.svg',
      width: 720,
      height: 400,
    },
    name: 'Silicon dioxide',
    formula: 'SiO2',
    everyday:
      'Silicon dioxide is sand, quartz, and most of the glass around you. A window is roughly 70 per cent silicon dioxide, with sodium and calcium oxides mixed in to bring the melting point down to something a furnace can actually reach. The same compound is in the little sachet marked do not eat in a shoebox, where it has been made porous so that it soaks up water instead.',
    chemistry:
      'In quartz, every silicon atom is bonded to four oxygens and every oxygen bridges two silicons, in a pattern that repeats without end. In glass the same bonds are there but the pattern is not: the network is frozen in a jumble, because the liquid cooled faster than the atoms could line up. That difference is the whole difference between a crystal and a glass. It is also worth killing an old story. Glass is not a slowly moving liquid. Old windows are thicker at the bottom because of how they were made, not because they have flowed.',
    link: { kind: 'cheat-sheet', slug: 'states-of-matter' },
    writtenOn: '2026-09-19',
    reviewedOn: '2026-09-19',
    sourcesVerifiedOn: '2026-09-19',
    sources: [
      {
        label: 'Corning Museum of Glass — does glass flow?',
        url: 'https://www.cmog.org/article/does-glass-flow',
      },
    ],
    isActive: true,
  },

  {
    id: 'monosodium-glutamate',
    image: {
      src: '/explore/molecules/monosodium-glutamate.svg',
      width: 720,
      height: 400,
    },
    name: 'Monosodium glutamate',
    formula: 'C5H8NNaO4',
    everyday:
      'Monosodium glutamate is a white crystal added to soups, crisps, stock cubes and instant noodles. The same ion, as free glutamate, is what makes parmesan, ripe tomatoes, soy sauce and kombu seaweed taste savoury. Your body cannot tell the two apart, because they are chemically identical. A typical serving of a food containing added MSG has less than half a gram of it in.',
    chemistry:
      'Glutamic acid is an amino acid, so it has an amine group at one end and, unusually, two carboxylic acid groups. Take the sodium salt of one of those acid groups and you have monosodium glutamate — mono because one sodium, not two. Dissolved in water it comes apart into a sodium ion and a glutamate ion, and it is the glutamate ion that fits the receptor on your tongue. The sodium is along for the ride, which is why the taste is savoury rather than salty.',
    link: { kind: 'cheat-sheet', slug: 'functional-groups' },
    writtenOn: '2026-09-19',
    reviewedOn: '2026-09-19',
    sourcesVerifiedOn: '2026-09-19',
    sources: [
      {
        label: 'US Food and Drug Administration — questions and answers on MSG',
        url: 'https://www.fda.gov/food/food-additives-petitions/questions-and-answers-monosodium-glutamate-msg',
      },
    ],
    isActive: true,
  },

  {
    id: 'cfc-12',
    image: {
      src: '/explore/molecules/cfc-12.svg',
      width: 720,
      height: 400,
    },
    name: 'Dichlorodifluoromethane',
    formula: 'CCl2F2',
    everyday:
      'Sold as Freon-12, this gas was in almost every fridge and aerosol can from the 1930s to the 1990s. It was chosen because it is astonishingly unreactive: it will not burn, does not corrode anything, is not poisonous, and does nothing at all to whatever it touches. That is what made it safe to put in a kitchen, and it is also what made it a disaster. Making it has been banned in most countries since 1996, and the amount still in the air is falling only slowly.',
    chemistry:
      'Because nothing down here destroys it, a molecule drifts upward for years until it reaches the stratosphere. There the ultraviolet light is finally strong enough to snap off a chlorine atom. That chlorine attacks ozone, O3, and is handed back at the end of the next step. So one chlorine atom can go round and round, destroying thousands of ozone molecules. That is how a gas present in tiny amounts managed to thin a layer the size of a continent.',
    link: { kind: 'cheat-sheet', slug: 'reaction-types' },
    writtenOn: '2026-09-19',
    reviewedOn: '2026-09-19',
    sourcesVerifiedOn: '2026-09-19',
    sources: [
      {
        label: 'US Environmental Protection Agency — ozone-depleting substances',
        url: 'https://www.epa.gov/ozone-layer-protection/ozone-depleting-substances',
      },
    ],
    isActive: true,
  },

  {
    // In COMPOUNDS_REGISTRY as id '11' — no name, no formula here.
    id: 'ammonia',
    image: {
      src: '/explore/molecules/ammonia.svg',
      width: 720,
      height: 400,
    },
    compoundId: '11',
    everyday:
      'Ammonia is a sharp-smelling gas that dissolves very readily in water; the pungent cleaning liquid is a dilute solution of it. Almost all of it — roughly 180 million tonnes a year — ends up as fertiliser, either spread directly or turned into urea or ammonium nitrate first. There is also a little in your own blood, made as your body breaks protein down.',
    chemistry:
      'The nitrogen sits at the centre, with three hydrogens around it and one pair of electrons left over. That spare pair pushes the molecule into a squashed pyramid rather than a flat triangle. That leftover pair is the whole story. It is free to grab a hydrogen ion, which is what makes ammonia a base, and it is what lets ammonia hydrogen-bond to water so well. Industrially it is built from N2 and H2: the nitrogen comes out of the air, the hydrogen usually out of natural gas. That is why making it also produces a great deal of carbon dioxide.',
    link: { kind: 'game', game: 'reaction-balancer' },
    writtenOn: '2026-09-19',
    reviewedOn: '2026-09-19',
    sourcesVerifiedOn: '2026-09-19',
    sources: [
      {
        label: 'International Energy Agency — ammonia technology roadmap',
        url: 'https://www.iea.org/reports/ammonia-technology-roadmap',
      },
    ],
    isActive: true,
  },

  {
    id: 'cholesterol',
    image: {
      src: '/explore/molecules/cholesterol.svg',
      width: 720,
      height: 400,
    },
    name: 'Cholesterol',
    formula: 'C27H46O',
    everyday:
      'Every animal cell you have is wrapped in a membrane with cholesterol sitting in it, and your own liver makes most of what you need. It is also the raw material your body builds vitamin D, bile and several hormones out of. You meet it in eggs, meat and dairy, and it has a reputation it only half deserves. For most people, the cholesterol in their food matters much less to the amount in their blood than the saturated fat does.',
    chemistry:
      'The molecule is four rings fused together — the steroid skeleton — with a short hydrocarbon tail at one end and a single hydroxyl group at the other. That one hydroxyl is the only part of it that likes water. So a cholesterol molecule sits in a cell membrane the right way up, hydroxyl outward where the water is, rings and tail buried among the fatty chains. Wedged in like that, it stops the membrane going too floppy when warm or too stiff when cold.',
    link: { kind: 'cheat-sheet', slug: 'functional-groups' },
    writtenOn: '2026-09-19',
    reviewedOn: '2026-09-19',
    sourcesVerifiedOn: '2026-09-19',
    sources: [
      {
        label: 'PubChem — Cholesterol',
        url: 'https://pubchem.ncbi.nlm.nih.gov/compound/5997',
      },
    ],
    isActive: true,
  },

  {
    id: 'oleic-acid',
    image: {
      src: '/explore/molecules/oleic-acid.svg',
      width: 720,
      height: 400,
    },
    name: 'Oleic acid',
    formula: 'C18H34O2',
    everyday:
      'Oleic acid is the main fatty acid in olive oil — around three-quarters of it — and it is most of what is in rapeseed oil, almonds and avocados too. It is the reason those oils stay liquid in a cupboard. The same molecule is a large part of the oil your own skin produces.',
    chemistry:
      'The molecule is a chain of eighteen carbons with a carboxylic acid group at one end and a single double bond in the middle. That double bond is cis: both halves of the chain leave it on the same side, so the chain has a permanent kink in it. Kinked chains cannot stack neatly against each other, so they stay liquid at temperatures where straight ones have set. That is the whole difference between an oil and a hard fat. Add hydrogen across that double bond over a nickel catalyst and you get stearic acid: eighteen carbons, no kink, solid at room temperature. Done to real fats, that is how a liquid oil is turned into margarine.',
    link: { kind: 'cheat-sheet', slug: 'reaction-types' },
    writtenOn: '2026-09-19',
    reviewedOn: '2026-09-19',
    sourcesVerifiedOn: '2026-09-19',
    sources: [
      {
        label: 'PubChem — Oleic acid',
        url: 'https://pubchem.ncbi.nlm.nih.gov/compound/445639',
      },
    ],
    isActive: true,
  },

  {
    id: 'methane',
    image: {
      src: '/explore/molecules/methane.svg',
      width: 720,
      height: 400,
    },
    name: 'Methane',
    formula: 'CH4',
    everyday:
      'Methane is natural gas. It heats houses, cooks food and generates about a fifth of the world’s electricity. It also seeps out of wetlands, rice paddies and landfill, and comes out of cows. As a greenhouse gas it is far more powerful than carbon dioxide. It does break down in the atmosphere within about a decade, though, which carbon dioxide does not.',
    chemistry:
      'One carbon, four hydrogens, arranged as a tetrahedron because four pairs of electrons push each other as far apart as they can get. Burning it is the simplest combustion there is: CH4 + 2O2 -> CO2 + 2H2O. Count the atoms on each side and you can see why it takes exactly two oxygen molecules and not one. The four hydrogens make two waters, which uses two oxygen atoms, and the carbon takes the other two. That single equation is where most stoichiometry questions begin.',
    link: { kind: 'cheat-sheet', slug: 'stoichiometry' },
    writtenOn: '2026-09-19',
    reviewedOn: '2026-09-19',
    sourcesVerifiedOn: '2026-09-19',
    sources: [
      {
        label: 'NOAA Global Monitoring Laboratory — atmospheric methane',
        url: 'https://gml.noaa.gov/ccgg/trends_ch4/',
      },
    ],
    isActive: true,
  },

  {
    // In COMPOUNDS_REGISTRY as id '15' — no name, no formula here.
    id: 'water',
    image: {
      src: '/explore/molecules/water.svg',
      width: 720,
      height: 400,
    },
    compoundId: '15',
    everyday:
      'Water covers most of the planet and makes up about 60 per cent of you. It is also the only common substance you are likely to meet as a solid, a liquid and a gas on the same day. It is also the reason a pond freezes from the top down: solid water is less dense than liquid water, which is unusual enough to be very nearly unique.',
    chemistry:
      'Oxygen brings six outer electrons and shares two of them, one with each hydrogen. That leaves two pairs unshared — the lone pairs. All four pairs push apart, and because the lone pairs take up more room than the bonding pairs, the molecule ends up bent at about 104.5 degrees rather than straight. A bent molecule with oxygen dragging the electrons its way has a negative end and a positive end, so the molecules stick to each other. That stickiness is why water is still liquid at 80 °C when something that light has no business being anything but a gas.',
    link: { kind: 'game', game: 'lewis-structures' },
    writtenOn: '2026-09-19',
    reviewedOn: '2026-09-19',
    sourcesVerifiedOn: '2026-09-19',
    sources: [
      {
        label: 'PubChem — Water',
        url: 'https://pubchem.ncbi.nlm.nih.gov/compound/962',
      },
    ],
    isActive: true,
  },

  {
    id: 'kevlar',
    image: {
      src: '/explore/molecules/kevlar.svg',
      width: 720,
      height: 400,
    },
    name: 'Kevlar',
    // `(…)n` rather than a bare `C14H10N2O2`. A polymer has no molecular
    // formula, and a repeat unit printed next to the name, in the slot where
    // every other card shows a molecular formula, reads as one — which is a
    // misconception a teacher then has to undo. The prose says so as well, but
    // the notation should not have to be corrected by the paragraph below it.
    // MoleculeText leaves the trailing `n` full size; the brackets carry the
    // meaning.
    formula: '(C14H10N2O2)n',
    everyday:
      'Kevlar is in body armour, motorcycle jackets, cut-resistant gloves, brake pads, tyre belts and the hulls of racing boats. It is sold as a yellow fibre, spun into rope and woven into cloth. Its proper name, poly(para-phenylene terephthalamide), is a description of what it is built from rather than anything a person says out loud.',
    chemistry:
      'The formula above is the unit that repeats: a benzene ring, an amide link, another ring, another amide, over and over, thousands of times along one chain. Two things then make it strong. The rings keep each chain stiff and straight rather than floppy, so a fibre being pulled has nothing left to unfold. And the amide groups on neighbouring chains hydrogen-bond to each other in flat sheets, so the chains cannot slide past one another. Weight for weight it beats steel in a straight pull — steel wins on nearly everything else, including surviving a fire.',
    link: { kind: 'cheat-sheet', slug: 'chemical-bonds' },
    writtenOn: '2026-09-19',
    reviewedOn: '2026-09-19',
    sourcesVerifiedOn: '2026-09-19',
    sources: [
      {
        label: 'Science History Institute — Stephanie L. Kwolek',
        url: 'https://www.sciencehistory.org/education/scientific-biographies/stephanie-l-kwolek/',
      },
    ],
    isActive: true,
  },

  {
    id: 'lithium-cobalt-oxide',
    image: {
      src: '/explore/molecules/lithium-cobalt-oxide.png',
      width: 720,
      height: 400,
    },
    name: 'Lithium cobalt oxide',
    formula: 'LiCoO2',
    everyday:
      'Lithium cobalt oxide is the positive electrode in a great many phone and laptop batteries. You will never see it: it is a black powder, painted onto aluminium foil and rolled up inside the cell. The cobalt in it is the reason battery makers keep trying to use less. About three-quarters of the world’s cobalt is mined in the Democratic Republic of the Congo. Some of that comes from small unregulated mines with real safety and child-labour problems.',
    chemistry:
      'The structure is layers: sheets of cobalt and oxygen, with lithium ions sitting in the gaps between them. Charging pulls lithium ions out from between the layers and drives them to the carbon electrode at the other end; using the battery lets them travel back. The cobalt changes oxidation state each time to keep the charge balanced. Nothing is destroyed and nothing new is built, which is why a cell can be recharged hundreds of times. Pull too many out, though, and the layers collapse — which is why every battery has electronics whose job is to stop you.',
    link: { kind: 'cheat-sheet', slug: 'reaction-types' },
    writtenOn: '2026-09-19',
    reviewedOn: '2026-09-19',
    sourcesVerifiedOn: '2026-09-19',
    sources: [
      {
        label: 'Xie & Lu, A retrospective on lithium-ion batteries, Nature Communications (2020)',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7237495/',
      },
    ],
    isActive: true,
  },

  {
    id: 'adenine',
    image: {
      src: '/explore/molecules/adenine.svg',
      width: 720,
      height: 400,
    },
    name: 'Adenine',
    formula: 'C5H5N5',
    everyday:
      'Adenine is the A in the A, T, C and G of DNA — one of the four bases whose order spells out a gene. There are about three billion of those letters in each of your cells, and roughly a quarter of them are adenine. It is also part of ATP, the molecule your cells use to move energy about, so you are rebuilding and spending it every second of the day.',
    chemistry:
      'The molecule is two rings fused together, one six-membered and one five-membered, with nitrogen atoms built into both. Chemists call that arrangement a purine. Hanging off one ring is an amine group. In DNA, that amine and one of the ring nitrogens make two hydrogen bonds with a thymine on the opposite strand. Exactly two — which is why adenine pairs with thymine and not with cytosine, which needs three. The pairing is not magic. It is hydrogen bonds either fitting or not fitting.',
    link: { kind: 'cheat-sheet', slug: 'functional-groups' },
    writtenOn: '2026-09-19',
    reviewedOn: '2026-09-19',
    sourcesVerifiedOn: '2026-09-19',
    sources: [
      {
        label: 'PubChem — Adenine',
        url: 'https://pubchem.ncbi.nlm.nih.gov/compound/190',
      },
    ],
    isActive: true,
  },

  {
    // In COMPOUNDS_REGISTRY as id '16' — no name, no formula here.
    id: 'sodium-bicarbonate',
    image: {
      src: '/explore/molecules/sodium-bicarbonate.svg',
      width: 720,
      height: 400,
    },
    compoundId: '16',
    everyday:
      'This is baking soda. It makes cakes rise, puts the fizz into a bath bomb and the relief into an indigestion tablet, and it is what many powder fire extinguishers are filled with. The same compound is dissolved in your blood, where its job is to stop the acidity drifting when you exercise.',
    chemistry:
      'It is an ionic compound, so it is not really made of molecules at all: it is sodium ions and hydrogen carbonate ions stacked in a lattice. The hydrogen carbonate ion is the interesting half — four atoms travelling together as a single unit with one negative charge, which is what polyatomic means. Hand it a hydrogen ion from an acid and it falls apart into water and carbon dioxide, and the carbon dioxide is the fizz. Heat it instead and much the same thing happens, which is why it works in a cake with no acid anywhere near it.',
    link: { kind: 'cheat-sheet', slug: 'polyatomic-ions' },
    writtenOn: '2026-09-19',
    reviewedOn: '2026-09-19',
    sourcesVerifiedOn: '2026-09-19',
    sources: [
      {
        label: 'PubChem — Sodium bicarbonate',
        url: 'https://pubchem.ncbi.nlm.nih.gov/compound/516892',
      },
    ],
    isActive: true,
  },

  {
    id: 'urea',
    image: {
      src: '/explore/molecules/urea.svg',
      width: 720,
      height: 400,
    },
    name: 'Urea',
    formula: 'CH4N2O',
    everyday:
      'Urea is how your body gets rid of nitrogen it cannot use: the liver builds it out of ammonia and the kidneys send it out in urine. It is also the most used fertiliser on earth — more than half of all the nitrogen fertiliser spread on fields is urea. And it turns up in face creams, where it helps skin hold on to water.',
    chemistry:
      'The molecule is a single carbon with an oxygen double-bonded to it and an amine group on either side. Almost half its mass is nitrogen, which is why it is worth the cost of shipping it around the world. Industrially it is made from ammonia and carbon dioxide, so its nitrogen came out of the air by way of the Haber process. In 1828 Friedrich Wöhler made urea by heating an inorganic salt, which startled chemists, because urea was supposed to be something only a living thing could produce. The tidy story that this ended the argument overnight is an exaggeration, but the shock was real.',
    link: { kind: 'cheat-sheet', slug: 'balancing-equations' },
    writtenOn: '2026-09-19',
    reviewedOn: '2026-09-19',
    sourcesVerifiedOn: '2026-09-19',
    sources: [
      {
        label: 'PubChem — Urea',
        url: 'https://pubchem.ncbi.nlm.nih.gov/compound/1176',
      },
    ],
    isActive: true,
  },

  {
    id: 'limonene',
    image: {
      src: '/explore/molecules/limonene.svg',
      width: 720,
      height: 400,
    },
    name: 'Limonene',
    formula: 'C10H16',
    everyday:
      'Squeeze an orange peel near a candle and the little flashes are limonene catching fire. It is the main ingredient of citrus peel oil, and it is pressed out of the peel left over from making juice, by the thousand tonnes. From there it goes into cleaning products, paint strippers and the smell of almost anything sold as fresh.',
    chemistry:
      'Limonene is chiral: one of its carbons carries four different groups, so the molecule exists as two forms that are mirror images of each other. Chemists tell them apart with the R and S system. Here is the part most textbooks get wrong. They say one form smells of oranges and the other of lemons. Careful measurements published in 2021 found that orange oil and lemon oil both contain the same form — the R one — at better than 99.9 per cent. Lemons smell of lemon mostly because of a different molecule, citral, and not because of this one.',
    link: { kind: 'cheat-sheet', slug: 'organic-nomenclature' },
    writtenOn: '2026-09-19',
    reviewedOn: '2026-09-19',
    sourcesVerifiedOn: '2026-09-19',
    sources: [
      {
        label: 'Kvittingen et al., Journal of Chemical Education 98 (2021)',
        url: 'https://pubs.acs.org/doi/10.1021/acs.jchemed.1c00363',
      },
    ],
    isActive: true,
  },

  {
    // In COMPOUNDS_REGISTRY as id '14' — no name, no formula here.
    id: 'sodium-sulfate',
    image: {
      src: '/explore/molecules/sodium-sulfate.svg',
      width: 720,
      height: 400,
    },
    compoundId: '14',
    everyday:
      'Sodium sulfate is made by the million tonnes and most of it goes into laundry powder, where it is the bulk that everything else is mixed into. Crystallised with ten water molecules built into its structure, it is known as Glauber’s salt. That form has been used to store heat: it melts in a warm room and freezes again as the room cools.',
    chemistry:
      'The useful thing happens at about 32 °C. Melting takes energy in without the temperature rising, and freezing hands that same energy back out. So a drum of the salt is a heat store that works at room temperature. The catch is that it does not melt cleanly. The crystals split into solid sodium sulfate and a saturated solution. The solid is denser, so it sinks to the bottom, where less of it can rejoin the water on the way back. Each cycle stores a little less than the last. Seventy years on, that is still the problem to solve.',
    link: { kind: 'cheat-sheet', slug: 'states-of-matter' },
    writtenOn: '2026-09-19',
    reviewedOn: '2026-09-19',
    sourcesVerifiedOn: '2026-09-19',
    sources: [
      {
        label: 'Science History Institute — the Sun Queen and the sceptic',
        url: 'https://www.sciencehistory.org/stories/magazine/the-sun-queen-and-the-skeptic-building-the-worlds-first-solar-houses/',
      },
    ],
    isActive: true,
  },

  {
    id: 'polypropylene',
    image: {
      src: '/explore/molecules/polypropylene.svg',
      width: 720,
      height: 400,
    },
    name: 'Polypropylene',
    // See the note on Kevlar. This one is sharper: a bare `C3H6` beside the
    // word "polypropylene" is propene's formula, and the entry's own chemistry
    // paragraph says exactly that.
    formula: '(C3H6)n',
    everyday:
      'Polypropylene is the second most produced plastic in the world. It is bottle caps, yoghurt pots, the food tubs you are allowed to microwave, car bumpers, rope, carpet fibre and the non-woven fabric in a surgical mask. When you see a recycling triangle with a 5 in it, this is what it means.',
    chemistry:
      'The formula above is the repeating unit, and it is the same as propene’s. Nothing is added and nothing is lost when the chains form: each molecule simply opens its double bond and joins on. What decides whether the plastic is any good is which way each methyl group ends up pointing. Made with an ordinary catalyst, the chains are a random tangle and the plastic is soft and weak. Made with a Ziegler–Natta catalyst, every methyl points the same way, the chains coil into regular helices, and those pack together into crystalline regions. That regularity is the difference between a sticky gum and a car bumper.',
    link: { kind: 'cheat-sheet', slug: 'chemical-bonds' },
    writtenOn: '2026-09-19',
    reviewedOn: '2026-09-19',
    sourcesVerifiedOn: '2026-09-19',
    sources: [
      {
        label: 'Nobel Prize — award ceremony speech, Chemistry 1963',
        url: 'https://www.nobelprize.org/prizes/chemistry/1963/ceremony-speech/',
      },
    ],
    isActive: true,
  },

  {
    id: 'artemisinin',
    image: {
      src: '/explore/molecules/artemisinin.svg',
      width: 720,
      height: 400,
    },
    name: 'Artemisinin',
    formula: 'C15H22O5',
    everyday:
      'Artemisinin comes from sweet wormwood, a plant used in Chinese medicine for more than two thousand years. It is now the basis of the standard treatment for malaria. It is always given together with a second drug and never on its own, so that the parasite is less likely to become resistant to it. Most of the world’s supply is still extracted from farmed plants rather than made from scratch.',
    chemistry:
      'Most of the molecule is an unremarkable arrangement of rings. The part that matters is a bridge of two oxygen atoms bonded directly to each other — a peroxide. An oxygen-to-oxygen single bond is weak and unusual, and most of chemistry avoids building one. Inside a malaria parasite, which is full of iron from the haemoglobin it has been digesting, that bridge breaks and produces fragments that wreck the parasite from the inside. Take the bridge out of the molecule and the drug stops working, which is how chemists know it is the business end.',
    link: { kind: 'cheat-sheet', slug: 'functional-groups' },
    writtenOn: '2026-09-19',
    reviewedOn: '2026-09-19',
    sourcesVerifiedOn: '2026-09-19',
    sources: [
      {
        label: 'Zheng et al., Tropical Medicine and Infectious Disease (2024)',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11435542/',
      },
    ],
    isActive: true,
  },

  {
    // In COMPOUNDS_REGISTRY as id '6' — no name, no formula here.
    id: 'sodium-chloride',
    image: {
      src: '/explore/molecules/sodium-chloride.svg',
      width: 720,
      height: 400,
    },
    compoundId: '6',
    everyday:
      'Table salt. It is mined out of rock, evaporated from the sea and scattered on icy roads. The chemical industry uses it as the starting point for chlorine, sodium hydroxide and hydrochloric acid. Your body genuinely needs some, and most people eat a good deal more than some.',
    chemistry:
      'There are no sodium chloride molecules in a grain of salt. The crystal is sodium ions and chloride ions alternating in every direction. Each sodium is surrounded by six chlorides and each chloride by six sodiums, repeating identically for billions of ions in a row. The formula is a ratio, one to one, not a count of atoms in a molecule. That endlessly repeating pattern is what makes it a crystal. It is also why a grain splits into little cubes: you are separating it along planes the ions were already lined up on.',
    link: { kind: 'cheat-sheet', slug: 'states-of-matter' },
    writtenOn: '2026-09-19',
    reviewedOn: '2026-09-19',
    sourcesVerifiedOn: '2026-09-19',
    sources: [
      {
        label: 'PubChem — Sodium chloride',
        url: 'https://pubchem.ncbi.nlm.nih.gov/compound/5234',
      },
    ],
    isActive: true,
  },
];
