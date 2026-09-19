// src/lib/explore/scientists.ts
//
// Scientist of the Week: the canonical English pool.
//
// Chosen from the curated 104-week pool in
// docs/feature-briefs/explore-scientists.md, from the 92 entries that have a
// cheat sheet or game matching their chemistry today. Every date, nationality
// and attribution in that document is a lead, not a fact; each one here was
// checked against the sources listed on the entry, and the ones that did not
// survive are reported in the milestone rather than quietly corrected.
//
// ## How these are written, and why it is a rule rather than a preference
//
// **Every entry leads with the science.** Not with where the person was born,
// not with what was done to them — with what they found out and how. The
// pattern this avoids is the one where every woman's entry is a story about
// being overlooked and every man's is a story about discovery, which teaches
// exactly the bias this section exists to counter. Where credit was denied,
// that goes in the optional `credit` field, in a sentence, after the science;
// `schedule.test.ts` caps how many entries may use it and checks it is not
// concentrated on one `represents` value.
//
// **`represents` is never rendered.** There is no code path that puts it on
// screen. It exists so `schedule.test.ts` can prove the schedule stays balanced
// week by week, which is a thing a test can do and a good intention cannot.
//
// Reading age ~12, one idea per sentence, `work` + `legacy` between 120 and 180
// words — all three asserted by the tests next door.

import type { ExploreScientist } from './types';

/**
 * Sources shared by more than one entry, so a URL is written once.
 * All URLs verified 2026-09-19.
 */
const SCIENCE_HISTORY = (slug: string, label: string) => ({
  label,
  url: `https://www.sciencehistory.org/education/scientific-biographies/${slug}/`,
});

const NOBEL = (year: string, slug: string, label: string) => ({
  label,
  url: `https://www.nobelprize.org/prizes/chemistry/${year}/${slug}/facts/`,
});

export const EXPLORE_SCIENTISTS: ExploreScientist[] = [
  {
    id: 'kathleen-lonsdale',
    name: 'Kathleen Lonsdale',
    lifespan: '1903–1971',
    represents: 'woman',
    work: 'Chemists had drawn benzene as a ring of six carbons since the 1860s, but nobody had measured one. Kathleen Lonsdale did, in 1929. Benzene is a liquid, so she could not use benzene itself; she chose hexamethylbenzene, a solid built around the same ring. X-rays bouncing off the layers of atoms in a crystal make a pattern, and the pattern says where the atoms are. Her answer was that the six carbons lie flat, at the corners of a regular hexagon. Two years later she measured hexachlorobenzene and found every carbon-to-carbon bond in the ring the same length — about 1.42 ångströms, between a single bond and a double one.',
    legacy: 'That is why your textbook draws a circle inside the benzene hexagon instead of three double bonds: the bonds really are all alike. It also showed that X-ray crystallography could answer questions about molecules, not only about salts. In 1945 Lonsdale and the microbiologist Marjory Stephenson became the first two women elected to the Royal Society.',
    link: { kind: 'cheat-sheet', slug: 'chemical-bonds' },
    writtenOn: '2026-09-19',
    reviewedOn: '2026-09-19',
    sourcesVerifiedOn: '2026-09-19',
    sources: [
      {
        label: 'Royal Society — the first women Fellows, elected 1945',
        url: 'https://royalsociety.org/news/2025/03/marjory-stephenson-kathleen-lonsdale-anniversary/',
      },
      {
        label: 'Chemistry World — Woman of substance',
        url: 'https://www.chemistryworld.com/news/woman-of-substance-/3004326.article',
      },
    ],
    isActive: true,
  },

  {
    id: 'soren-sorensen',
    name: 'Søren Sørensen',
    lifespan: '1868–1939',
    represents: 'man',
    work: 'Acids differ enormously in strength, and in 1909 there was no tidy way to say by how much. Søren Sørensen was studying proteins at the Carlsberg Laboratory in Copenhagen, where small changes in acidity kept ruining his experiments. The number he needed was the concentration of hydrogen ions, and across ordinary solutions that runs over a range of more than a hundred million million. So he took its logarithm and flipped the sign. A solution holding 0.0000001 moles of hydrogen ions per litre became, simply, 7. Each step down the scale means ten times more hydrogen ions, not one more.',
    legacy: 'That is the pH scale, and it has been on every pool test strip, soil kit and blood report since. Sørensen never explained what the p stood for. Chemists still argue about it: power, potential, or just the letter he happened to use for one of his test solutions. Nobody should tell you it is settled.',
    link: { kind: 'cheat-sheet', slug: 'acids-and-bases' },
    writtenOn: '2026-09-19',
    reviewedOn: '2026-09-19',
    sourcesVerifiedOn: '2026-09-19',
    sources: [
      SCIENCE_HISTORY('soren-sorensen', 'Science History Institute — Søren Sørensen'),
      {
        label: 'Carlsberg Group — the pH scale',
        url: 'https://www.carlsberggroup.com/pursuit-of-better/scientific-discoveries/ph-scale/',
      },
    ],
    isActive: true,
  },

  {
    id: 'katharine-blodgett',
    name: 'Katharine Blodgett',
    lifespan: '1898–1979',
    represents: 'woman',
    work: 'Katharine Blodgett worked out how to build a coating one molecule at a time. Her colleague Irving Langmuir had shown that a single layer of a fatty molecule spreads out across water. Blodgett found that if you dip a plate down through that layer and lift it out, the layer comes with it. She also found you can dip it again, and again. In 1938, at General Electric, she stacked 44 layers of barium stearate onto glass and the glass stopped reflecting. Light bouncing off the top of the coating and light bouncing off the glass underneath come back out of step with each other, and cancel.',
    legacy: 'General Electric called it invisible glass, which was advertising: the glass is as visible as ever, the reflections are not. Her films were too soft to sell — you could wipe them off — and modern non-reflective lenses use hard evaporated coatings instead. But Langmuir–Blodgett layers are still how laboratories build a film to order, one molecule at a time.',
    link: { kind: 'cheat-sheet', slug: 'states-of-matter' },
    writtenOn: '2026-09-19',
    reviewedOn: '2026-09-19',
    sourcesVerifiedOn: '2026-09-19',
    sources: [
      {
        label: 'National Inventors Hall of Fame — Katharine Burr Blodgett',
        url: 'https://www.invent.org/inductees/katharine-burr-blodgett',
      },
      {
        label: 'Cavendish Laboratory, Cambridge — the invisible glass legacy',
        url: 'https://www.phy.cam.ac.uk/news/the-invisible-glass-legacy-of-katharine-burr-blodgett/',
      },
    ],
    isActive: true,
  },

  {
    id: 'kikunae-ikeda',
    name: 'Kikunae Ikeda',
    lifespan: '1864–1936',
    represents: 'man',
    work: 'Kikunae Ikeda thought the broth made from kombu seaweed tasted of something that was not sweet, sour, salty or bitter. In 1908, at Tokyo Imperial University, he boiled down about twelve kilograms of dried kelp and pulled roughly thirty grams of crystals out of it. They turned out to be glutamic acid — an amino acid that was already known and already in wheat. What was new was the connection: Ikeda showed that the glutamate ion is what that fifth taste tastes of. He named the taste umami and patented a way of turning glutamate into a seasoning.',
    legacy: 'Monosodium glutamate went on sale the following year and is now in kitchens everywhere. The rest of the world took far longer to agree with him. Umami was only widely accepted as a basic taste around 2000, once the receptors on the tongue that respond to glutamate had been found. Ikeda had been right for ninety years.',
    link: { kind: 'cheat-sheet', slug: 'functional-groups' },
    writtenOn: '2026-09-19',
    reviewedOn: '2026-09-19',
    sourcesVerifiedOn: '2026-09-19',
    sources: [
      {
        label: 'Ikeda, “New Seasonings” (1909), translated in Chemical Senses',
        url: 'https://academic.oup.com/chemse/article/27/9/847/271617',
      },
      {
        label: 'US Food and Drug Administration — questions and answers on MSG',
        url: 'https://www.fda.gov/food/food-additives-petitions/questions-and-answers-monosodium-glutamate-msg',
      },
    ],
    isActive: true,
  },

  {
    id: 'susan-solomon',
    name: 'Susan Solomon',
    lifespan: 'b. 1956',
    represents: 'woman',
    work: 'In 1985 British scientists reported that the ozone layer above Antarctica thinned dramatically every southern spring. Chlorine from CFCs was the obvious suspect, but the reactions chemists knew about, between gases, were far too slow to do that much damage that fast. Susan Solomon’s answer, published in 1986, was that the important reactions were not happening between gases at all. In the Antarctic winter the stratosphere gets cold enough to form clouds of ice and nitric acid. On the surfaces of those cloud particles, chlorine that is locked up harmlessly is converted into forms that the returning spring sunlight tears apart. She then led expeditions to McMurdo Station in 1986 and 1987 and measured the chlorine compounds her explanation predicted.',
    legacy: 'That is why the damage is Antarctic, seasonal and so abrupt — and the answer arrived while governments were deciding what to do about CFCs. The Montreal Protocol was agreed in 1987.',
    link: { kind: 'cheat-sheet', slug: 'reaction-types' },
    writtenOn: '2026-09-19',
    reviewedOn: '2026-09-19',
    sourcesVerifiedOn: '2026-09-19',
    sources: [
      SCIENCE_HISTORY('susan-solomon', 'Science History Institute — Susan Solomon'),
      {
        label: 'NASA Ozone Watch — ozone hole history',
        url: 'https://ozonewatch.gsfc.nasa.gov/facts/history_SH.html',
      },
    ],
    isActive: true,
  },

  {
    id: 'fritz-haber',
    name: 'Fritz Haber',
    lifespan: '1868–1934',
    represents: 'man',
    work: 'Plants need nitrogen, and the air is 78 per cent nitrogen — but as N2, held together by a triple bond that almost nothing will break. In 1909 Fritz Haber broke it. Working with Robert Le Rossignol at Karlsruhe, he pushed nitrogen and hydrogen together over a catalyst at around 200 atmospheres of pressure and 500 °C, and ammonia came out. A bench demonstration is not a factory, though. Carl Bosch at BASF spent the next four years finding a cheap iron catalyst and building steel vessels that could survive the pressure, and the first plant opened in 1913.',
    legacy: 'Almost all the world’s fertiliser starts with this reaction; researchers estimate the nitrogen it supplies feeds about half of everyone alive. Haber also ran Germany’s chemical weapons programme and personally supervised the first mass chlorine attack, at Ypres in April 1915. Both of those are the same man. He was forced out of Germany in 1933 for being Jewish and died the following year.',
    link: { kind: 'game', game: 'reaction-balancer' },
    writtenOn: '2026-09-19',
    reviewedOn: '2026-09-19',
    sourcesVerifiedOn: '2026-09-19',
    sources: [
      SCIENCE_HISTORY('fritz-haber', 'Science History Institute — Fritz Haber'),
      {
        label: 'RSC Education — who really discovered the Haber process?',
        url: 'https://edu.rsc.org/feature/who-really-discovered-the-haber-process/2020277.article',
      },
    ],
    isActive: true,
  },

  {
    id: 'marie-maynard-daly',
    name: 'Marie Maynard Daly',
    lifespan: '1921–2003',
    represents: 'woman',
    work: 'Marie Maynard Daly worked on two quite different problems. At the Rockefeller Institute from 1948, with Alfred Mirsky, she studied the chemistry of the cell nucleus. That meant the histone proteins DNA is wound around, and what nucleic acids are made of. From 1955, with the physician Quentin Deming, she turned to arteries. Their experiments, largely in rats with high blood pressure, were among the earliest to tie together three things that had been studied separately: raised blood pressure, cholesterol, and arteries narrowing.',
    legacy: 'That connection is now the ordinary picture of heart disease. It was built by many groups over several decades, and Daly and Deming supplied some of the first experimental evidence for it. She taught biochemistry for twenty-five years at the Albert Einstein College of Medicine and funded a scholarship for Black students going into science.',
    credit:
      'In 1947 she became the first Black woman in the United States to earn a doctorate in chemistry, at Columbia, in a department with exactly one woman professor.',
    link: { kind: 'cheat-sheet', slug: 'functional-groups' },
    writtenOn: '2026-09-19',
    reviewedOn: '2026-09-19',
    sourcesVerifiedOn: '2026-09-19',
    sources: [
      SCIENCE_HISTORY('marie-maynard-daly', 'Science History Institute — Marie Maynard Daly'),
      {
        label: 'American Academy of Arts and Sciences — Marie Maynard Daly',
        url: 'https://www.amacad.org/person/marie-maynard-daly',
      },
    ],
    isActive: true,
  },

  {
    id: 'paul-sabatier',
    name: 'Paul Sabatier',
    lifespan: '1854–1941',
    represents: 'man',
    work: 'A carbon-to-carbon double bond will not simply take up hydrogen, however much hydrogen you offer it. In 1897, at Toulouse, Paul Sabatier and Jean-Baptiste Senderens found that finely divided nickel changes that completely. The metal grips both the hydrogen and the double bond on its surface, holds them next to each other, and lets them join. At the end the nickel is unchanged: it is a catalyst, and a cheap one. Sabatier’s version worked on vapours. Four years later Wilhelm Normann, in Germany, adapted the same chemistry to liquid oils — and that is the step that turns a runny vegetable oil into a solid fat.',
    legacy: 'Catalytic hydrogenation is now one of the most-used reactions in industry, from margarine to medicines. Sabatier shared the 1912 Nobel Prize with Victor Grignard, for separate work rather than a collaboration.',
    credit:
      'Senderens, who did the 1897 experiments with him, was left out of that prize — an omission chemists still raise on his behalf.',
    link: { kind: 'cheat-sheet', slug: 'reaction-types' },
    writtenOn: '2026-09-19',
    reviewedOn: '2026-09-19',
    sourcesVerifiedOn: '2026-09-19',
    sources: [
      {
        label: 'The Franklin Institute — Paul Sabatier',
        url: 'https://fi.edu/en/awards/laureates/paul-sabatier',
      },
      {
        label: 'American Oil Chemists’ Society — Wilhelm Normann (1870–1939)',
        url: 'https://www.aocs.org/resource/wilhelm-normann-1870-1939/',
      },
    ],
    isActive: true,
  },

  {
    id: 'reatha-clark-king',
    name: 'Reatha Clark King',
    lifespan: 'b. 1938',
    represents: 'woman',
    work: 'To judge whether a rocket propellant is worth using you need a number: exactly how much energy comes out when it burns. Reatha Clark King measured those numbers for fluorine compounds at the National Bureau of Standards in the 1960s. Fluorine is the most reactive element there is, and oxygen difluoride attacks almost anything you try to burn it inside. King designed a nickel burner with a coiled tube, so the flame could be cooled and controlled instead of wrecking the apparatus. With it she got a heat of formation for oxygen difluoride precise enough to publish. It won her the bureau’s award for the year’s best paper.',
    legacy: 'Those numbers fed into the assessment of fluorine compounds as rocket oxidisers. They were never flown: they are too toxic and too corrosive to handle at that scale — and finding that out is exactly what measurements are for. King later became a university president, and then ran the General Mills Foundation.',
    link: { kind: 'cheat-sheet', slug: 'stoichiometry' },
    writtenOn: '2026-09-19',
    reviewedOn: '2026-09-19',
    sourcesVerifiedOn: '2026-09-19',
    sources: [
      {
        label: 'University of Chicago — how an alum’s burning ambition brought her into the space race',
        url: 'https://news.uchicago.edu/story/how-alums-invention-helped-propel-us-space-race',
      },
      {
        label: 'King & Armstrong, Journal of Research of the NBS 72A (1968)',
        url: 'https://archive.org/details/jresv72An2p113',
      },
    ],
    isActive: true,
  },

  {
    id: 'gilbert-lewis',
    name: 'Gilbert N. Lewis',
    lifespan: '1875–1946',
    represents: 'man',
    work: 'Before 1916 a chemical bond was a line drawn on paper with no explanation behind it. Gilbert Lewis supplied one: a bond is a pair of electrons that two atoms share between them. Atoms tend to end up with eight electrons in their outer shell, and sharing is one way to get there. He drew those electrons as dots, which is why a diagram of dots around a chemical symbol is called a Lewis structure. In 1923 he added a second idea: an acid is anything which accepts a pair of electrons, and a base is anything which donates one. That definition covers reactions with no hydrogen in them at all.',
    legacy: 'Irving Langmuir developed and promoted the same picture, gave chemistry the word covalent, and for years it was known as the Lewis–Langmuir theory. Lewis was nominated for a Nobel Prize dozens of times and never won one. Every dot diagram you draw is his.',
    link: { kind: 'game', game: 'lewis-structures' },
    writtenOn: '2026-09-19',
    reviewedOn: '2026-09-19',
    sourcesVerifiedOn: '2026-09-19',
    sources: [
      SCIENCE_HISTORY('gilbert-newton-lewis', 'Science History Institute — Gilbert Newton Lewis'),
      {
        label: 'Lemelson–MIT — Gilbert Lewis',
        url: 'https://lemelson.mit.edu/resources/gilbert-lewis',
      },
    ],
    isActive: true,
  },

  {
    id: 'stephanie-kwolek',
    name: 'Stephanie Kwolek',
    lifespan: '1923–2014',
    represents: 'woman',
    work: 'In 1965, at DuPont, Stephanie Kwolek dissolved a stiff rod-shaped polymer and got a solution that looked wrong. Polymer solutions are thick, syrupy and clear; hers was thin and cloudy. Cloudy usually meant undissolved bits that would block the spinning machine, and the standard response was to pour it away. Kwolek filtered it to show it was clean, and talked the technician into spinning it anyway. The cloudiness turned out to be the whole point: the rigid chains were lining themselves up side by side in the liquid, the way a liquid crystal does. Spun into a fibre, they stayed lined up.',
    legacy: 'That alignment is why the fibre — sold from 1971 as Kevlar — resists being pulled apart so well: weight for weight it outperforms steel. Body armour, cut-resistant gloves, brake pads and boat hulls all rely on it. Turning the discovery into a product took a DuPont team, and in particular Herbert Blades, who found a way to spin it at scale.',
    link: { kind: 'cheat-sheet', slug: 'chemical-bonds' },
    writtenOn: '2026-09-19',
    reviewedOn: '2026-09-19',
    sourcesVerifiedOn: '2026-09-19',
    sources: [
      SCIENCE_HISTORY('stephanie-l-kwolek', 'Science History Institute — Stephanie L. Kwolek'),
      {
        label: 'National Inventors Hall of Fame — Stephanie Kwolek',
        url: 'https://www.invent.org/inductees/stephanie-louise-kwolek',
      },
    ],
    isActive: true,
  },

  {
    id: 'akira-yoshino',
    name: 'Akira Yoshino',
    lifespan: 'b. 1948',
    represents: 'man',
    work: 'Early rechargeable lithium batteries used lithium metal, and lithium metal grows spikes each time it is recharged. Sooner or later a spike reaches the other electrode and the battery catches fire. In 1985 Akira Yoshino, at Asahi Kasei, built a cell with no lithium metal in it at all. He paired John Goodenough’s lithium cobalt oxide as the positive electrode with a carbon material — petroleum coke — as the negative one. Lithium ions slide in and out of both electrodes instead of plating out as metal. Charging pushes them one way; using the battery lets them travel back.',
    legacy: 'That is the lithium-ion battery in your phone, and Sony put the first one on sale in 1991. Yoshino shared the 2019 Nobel Prize with Goodenough and Stanley Whittingham: three people, three stages, one battery.',
    link: { kind: 'cheat-sheet', slug: 'reaction-types' },
    writtenOn: '2026-09-19',
    reviewedOn: '2026-09-19',
    sourcesVerifiedOn: '2026-09-19',
    sources: [
      {
        label: 'Asahi Kasei — Dr Akira Yoshino chosen for the Nobel Prize in Chemistry',
        url: 'https://www.asahi-kasei.com/news/2019/e191009.html',
      },
      {
        label: 'Xie & Lu, A retrospective on lithium-ion batteries, Nature Communications (2020)',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7237495/',
      },
    ],
    isActive: true,
  },

  {
    id: 'margarita-salas',
    name: 'Margarita Salas',
    lifespan: '1938–2019',
    represents: 'woman',
    work: 'Phi29 is a virus that infects bacteria, and Margarita Salas spent thirty years finding out how it copies its DNA. In 1984 her group in Madrid, working with Luis Blanco, isolated its DNA polymerase — the enzyme that does the copying. They found it unusual in three ways at once. It holds onto the template and copies tens of thousands of bases without letting go. It shoulders the opposite strand out of its way as it goes, so it needs no separate enzyme to unzip the helix. And it proofreads what it has written, so it makes very few mistakes.',
    legacy: 'Put those three together and a vanishingly small sample of DNA can be copied into a useful amount, at one steady temperature. There is none of the repeated heating and cooling that PCR needs. It is used on forensic traces, on single cells and on DNA recovered by archaeologists. The patent became the most profitable Spain’s national research council has ever held.',
    link: { kind: 'cheat-sheet', slug: 'functional-groups' },
    writtenOn: '2026-09-19',
    reviewedOn: '2026-09-19',
    sourcesVerifiedOn: '2026-09-19',
    sources: [
      {
        label: 'Chemistry World — Margarita Salas, the marquesa of molecular biology',
        url: 'https://www.chemistryworld.com/culture/margarita-salas-the-marquesa-of-molecular-biology/4013009.article',
      },
      {
        label: 'German Patent and Trade Mark Office — Margarita Salas Falgueras',
        url: 'https://www.dpma.de/english/our_office/publications/ingeniouswomen/salasfalgueras/index.html',
      },
    ],
    isActive: true,
  },

  {
    id: 'alfred-werner',
    name: 'Alfred Werner',
    lifespan: '1866–1919',
    represents: 'man',
    work: 'Some compounds refused to fit the rules. Cobalt chloride with six ammonia molecules attached behaved as though all three of its chlorides were loose; with five ammonias, only two were. In 1893 Alfred Werner, then 26, said the reason is that a metal ion has two separate things going on. One is a charge to balance. The other is a fixed number of places around it where molecules or ions can attach. For cobalt that number is six, arranged at the corners of an octahedron. He could not see any of this. He proved it by counting. An octahedron predicts exactly two forms of a compound with four of one group and two of another, and two was always what he found.',
    legacy: 'Werner won the 1913 Nobel Prize, the first Swiss chemist and the first inorganic chemist to do so. Complex ions like his are one family of polyatomic ion: a metal at the centre with molecules clipped around it. Most of the polyatomic ions you learn, such as sulfate and nitrate, are not complexes at all.',
    link: { kind: 'cheat-sheet', slug: 'polyatomic-ions' },
    writtenOn: '2026-09-19',
    reviewedOn: '2026-09-19',
    sourcesVerifiedOn: '2026-09-19',
    sources: [
      {
        label: 'ETH Library — Alfred Werner (1866–1919)',
        url: 'https://library.ethz.ch/en/collections-and-archives/short-portraits/werner-alfred-1866-1919.html',
      },
      {
        label: 'University of Zurich — Alfred Werner, Nobel Prize in Chemistry 1913',
        url: 'https://www.uzh.ch/en/researchinnovation/excellence/nobelprize/werner.html',
      },
    ],
    isActive: true,
  },

  {
    id: 'johanna-dobereiner',
    name: 'Johanna Döbereiner',
    lifespan: '1924–2000',
    represents: 'woman',
    work: 'Legumes — beans, peas, soybeans — do not have to be given nitrogen. They house bacteria in nodules on their roots, and those bacteria pull N2 straight out of the air and turn it into ammonia the plant can use. Johanna Döbereiner, working in Brazil from 1950, asked whether that could carry a commercial crop in tropical soil. Brazilian farming at the time copied the American model and poured on nitrogen fertiliser. She hunted for strains of Bradyrhizobium suited to Brazilian soils and Brazilian soybean varieties, tested them in the field, and drove the results into a national programme for treating seed. She and her group also named several new nitrogen-fixing species.',
    legacy: 'Brazilian soybeans now take essentially all their nitrogen from bacteria rather than from a bag. One 2021 estimate puts the saving at over fourteen billion US dollars a crop. They still need phosphorus and potassium, so this is not farming without fertiliser — it is farming without nitrogen fertiliser, which is the harder half.',
    link: { kind: 'cheat-sheet', slug: 'balancing-equations' },
    writtenOn: '2026-09-19',
    reviewedOn: '2026-09-19',
    sourcesVerifiedOn: '2026-09-19',
    sources: [
      {
        label: 'Embrapa — who Johanna Döbereiner was',
        url: 'https://www.embrapa.br/en/johanna-dobereiner/quem-foi',
      },
      {
        label: 'Hungria et al., AMB Express 11:71 (2021)',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8141083/',
      },
    ],
    isActive: true,
  },

  {
    id: 'vladimir-prelog',
    name: 'Vladimir Prelog',
    lifespan: '1906–1998',
    represents: 'man',
    work: 'Some molecules come in two forms that are mirror images of each other, like your two hands, and no amount of turning will make one into the other. Chemists could see that; what they had no agreed way to do was say which was which. Vladimir Prelog joined Robert Cahn and Christopher Ingold, and in 1956 the three published rules that settle it. You look at the four groups attached to the carbon and rank them, heaviest atom first. Then you turn the molecule so the lowest-ranked group points away from you, and read the other three: clockwise is R, anticlockwise is S.',
    legacy: 'Those are the Cahn–Ingold–Prelog rules, and they are why an R or an S in a chemical name means the same thing in every laboratory and every language. It matters, because two mirror-image forms of a drug can behave completely differently in a body. Prelog was born in Sarajevo, grew up in Zagreb, escaped to Zurich in 1941, and shared the 1975 Nobel Prize with John Cornforth.',
    link: { kind: 'cheat-sheet', slug: 'organic-nomenclature' },
    writtenOn: '2026-09-19',
    reviewedOn: '2026-09-19',
    sourcesVerifiedOn: '2026-09-19',
    sources: [
      NOBEL('1975', 'prelog', 'Nobel Prize — Vladimir Prelog, facts'),
      {
        label: 'ChemistryViews — 50th anniversary of the Cahn–Ingold–Prelog rules',
        url: 'https://www.chemistryviews.org/details/ezine/9273401/50th_Anniversary_of_the_Cahn-Ingold-Prelog_Rules/',
      },
    ],
    isActive: true,
  },

  {
    id: 'maria-telkes',
    name: 'Mária Telkes',
    lifespan: '1900–1995',
    represents: 'woman',
    work: 'Sunshine arrives in the daytime and you want the heat at night, so a solar house needs somewhere to keep it. Mária Telkes chose a chemical answer instead of a tank of hot water. Glauber’s salt — sodium sulfate crystals with water built into them — melts at about 32 °C. Melting a solid takes in energy without raising its temperature, and that energy comes back out when it freezes again. So a given mass of the salt stores far more heat than the same mass of warmed water. In 1948 she built the Dover Sun House in Massachusetts with the architect Eleanor Raymond, drums of salt packed into its walls.',
    legacy: 'A family lived in it, heated by sunlight alone, for two winters and part of a third. Then it failed. The salt does not melt cleanly, so solid settles out and a little less of it recombines on every cycle, and the salty solution ate through the steel drums. That is chemistry rather than bad building — and it is still the main obstacle to salt heat storage today.',
    link: { kind: 'cheat-sheet', slug: 'states-of-matter' },
    writtenOn: '2026-09-19',
    reviewedOn: '2026-09-19',
    sourcesVerifiedOn: '2026-09-19',
    sources: [
      {
        label: 'Science History Institute — the Sun Queen and the sceptic',
        url: 'https://www.sciencehistory.org/stories/magazine/the-sun-queen-and-the-skeptic-building-the-worlds-first-solar-houses/',
      },
      {
        label: 'National Inventors Hall of Fame — Maria Telkes',
        url: 'https://www.invent.org/inductees/maria-telkes',
      },
    ],
    isActive: true,
  },

  {
    id: 'giulio-natta',
    name: 'Giulio Natta',
    lifespan: '1903–1979',
    represents: 'man',
    work: 'Propene molecules will join up into long chains. If they join facing whichever way they please, the chain is a tangle with methyl groups sticking out on both sides. The plastic is then soft and weak. On 11 March 1954 Giulio Natta, at the Politecnico di Milano, made a chain in which every methyl group points the same way. He used a catalyst of the kind Karl Ziegler had developed, which holds each arriving molecule in a fixed orientation until it has joined. Natta called that regular arrangement isotactic. Regular chains can pack tightly against one another and line up into crystals; tangled ones cannot.',
    legacy: 'It is why polypropylene is stiff, strong and light enough to be everywhere: bottle caps, car bumpers, rope, food tubs, thermal underwear. Natta and Ziegler shared the 1963 Nobel Prize.',
    credit:
      'Ziegler was not pleased about sharing it. Natta had reached the reaction through Ziegler’s catalyst chemistry, and the two sides spent more than twenty years in court over the patents, mostly ending in Ziegler’s favour.',
    link: { kind: 'cheat-sheet', slug: 'chemical-bonds' },
    writtenOn: '2026-09-19',
    reviewedOn: '2026-09-19',
    sourcesVerifiedOn: '2026-09-19',
    sources: [
      {
        label: 'Nobel Prize — Giulio Natta, facts',
        url: 'https://www.nobelprize.org/prizes/chemistry/1963/natta/facts/',
      },
      {
        label: 'Max Planck Society — patent solution in a canning jar',
        url: 'https://www.mpg.de/8361429/flashback-ziegler',
      },
    ],
    isActive: true,
  },

  {
    id: 'tu-youyou',
    name: 'Tu Youyou',
    lifespan: 'b. 1930',
    represents: 'woman',
    work: 'Malaria parasites had become resistant to the usual drugs. In 1969 Tu Youyou was put in charge of her institute’s group inside Project 523, a secret Chinese search for a new one. Her team screened hundreds of plant extracts used in traditional medicine. Sweet wormwood worked sometimes and not others. Reading a fourth-century handbook of emergency prescriptions, she noticed that it said to soak the plant in cold water and wring out the juice — not to boil it. If heat was destroying the active compound, the extraction was the problem. She switched to ether, which boils at 35 °C, and in October 1971 got an extract that killed the parasites every time.',
    legacy: 'The pure compound, artemisinin, followed in 1972. Artemisinin combined with a second drug is now the treatment the World Health Organization recommends, and it has saved millions of lives. Project 523 involved hundreds of scientists across China, and how the credit should be divided is still argued about there.',
    credit:
      'Tu won a Nobel Prize in 2015 with no doctorate, no training abroad and no membership of China’s academies — at home she is called the three-noes scientist.',
    link: { kind: 'cheat-sheet', slug: 'functional-groups' },
    writtenOn: '2026-09-19',
    reviewedOn: '2026-09-19',
    sourcesVerifiedOn: '2026-09-19',
    sources: [
      {
        label: 'Nobel Prize — Tu Youyou, facts',
        url: 'https://www.nobelprize.org/prizes/medicine/2015/tu/facts/',
      },
      {
        label: 'Journal of Clinical Investigation — from branch to bedside',
        url: 'https://www.jci.org/articles/view/60887',
      },
    ],
    isActive: true,
  },

  {
    id: 'dan-shechtman',
    name: 'Dan Shechtman',
    lifespan: 'b. 1941',
    represents: 'man',
    work: 'Crystals repeat. That was not a guess, it was the definition: the atoms sit in a pattern that copies itself over and over in every direction. Such a pattern cannot have fivefold or tenfold symmetry. You cannot tile a floor with pentagons and leave no gaps. On 8 April 1982 Dan Shechtman was on attachment from the Technion in Haifa to a US government laboratory. He fired electrons through a rapidly cooled aluminium–manganese alloy and got a diffraction pattern with tenfold symmetry. His notebook entry for that sample reads “10 fold ???”. The atoms were perfectly ordered — you could say where the next one belonged — but the arrangement never repeated.',
    legacy: 'It took years to be accepted. Linus Pauling argued in print that the sample was simply twinned crystals, and never changed his mind. The evidence piled up anyway, and in 1992 the International Union of Crystallography rewrote its definition of a crystal to make room for patterns that never repeat. Shechtman won the 2011 Nobel Prize in Chemistry. Quasicrystals have since been found in nature, in a meteorite.',
    link: { kind: 'cheat-sheet', slug: 'states-of-matter' },
    writtenOn: '2026-09-19',
    reviewedOn: '2026-09-19',
    sourcesVerifiedOn: '2026-09-19',
    sources: [
      {
        label: 'NIST — the Nobel moment: Dan Shechtman',
        url: 'https://www.nist.gov/nist-and-nobel/dan-shechtman/nobel-moment-dan-shechtman',
      },
      {
        label: 'Shechtman et al., Physical Review Letters 53, 1951 (1984)',
        url: 'https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.53.1951',
      },
    ],
    isActive: true,
  },
];
