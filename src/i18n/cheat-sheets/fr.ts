// src/i18n/cheat-sheets/fr.ts
//
// French prose for the cheat sheets. See src/i18n/cheat-sheets.ts for how this
// overlays onto the English structure and why it is shaped this way.
//
// Terminology follows docs/i18n/glossary-fr.md. The decisions that matter most
// here, because they recur:
//
//   état de la matière · réactifs / produits · équilibrer une équation ·
//   coefficient vs. indice (the subscript/coefficient contrast this topic turns
//   on) · liaison covalente / ionique / métallique · formule statistique (the
//   formula of an ionic compound — a ratio, not a molecule) · formule brute vs.
//   formule développée · doublet non liant / doublet liant · structure de Lewis
//   · ion polyatomique · ion oxonium (H3O+) · masse molaire · quantité de
//   matière · réactif limitant · quantité théorique / quantité obtenue vs.
//   rendement · groupe caractéristique.
//
// Register: informal "tu", school-level vocabulary, French typography (« … »
// with a narrow no-break space inside, U+202F before ; ! ?, U+00A0 before :,
// – for parenthetical dashes, ’ for apostrophes, decimal comma).
//
// Two sheets are **adapted, not translated** — the user's decision, recorded in
// docs/i18n/GAMES.md and the brief:
//
//   * `naming-compounds`. English teaches "-ide → hydro-…-ic acid". French has
//     no such pattern; it says *-ure → acide …hydrique*, *-ate → acide …ique*,
//     *-ite → acide …eux*. The acid-names table and the bullet that introduces
//     it now teach the French system. Molecular names are also anion-first in
//     French (*dioxyde de carbone*), so the "drop mono- on the first element"
//     rule had to be restated from the other end.
//   * `organic-nomenclature`. French names esters the other way round
//     (*éthanoate de méthyle*, not "methyl ethanoate") and writes carboxylic
//     acids as *acide …oïque*. The suffix table teaches the French affixes.
//
// `functional-groups` is partially adapted — the suffixes are French, the
// chemistry is not. There are **no English glosses in parentheses** anywhere:
// the user chose adaptation, not bilingual presentation.
//
// Not translated anywhere in this file: formulae, element symbols, state
// symbols, charges and structural notation (C–OH, –CHO).
//
// **This file carries no `curriculumRef` and no resource descriptions.** Both
// were here until 2026-09-20 and both were translated: the curriculum line
// cites one Australian state's syllabus, and every linked resource is an
// English-language page. Translating them put material in front of a student
// that the student cannot use. `src/i18n/cheat-sheets.ts` now withholds both
// from every locale but English, and the note there says why; the follow-up
// research is in docs/i18n/README.md § Locale-appropriate content.

import { POLYATOMIC_ION_TABLE } from '@/lib/cheat-sheet-data';
import type { CheatSheetOverlaySet } from '../cheat-sheets';

// ---------------------------------------------------------------------------
// The polyatomic-ion table is generated from the ion registry, so its French
// rows are generated too rather than transcribed — that way adding an ion in
// the registry cannot leave a half-translated table behind.
// ---------------------------------------------------------------------------

const POLYATOMIC_ION_NAMES_FR: Record<string, string> = {
  Ammonium: 'Ammonium',
  Acetate: 'Acétate',
  'Ethanoate (acetate)': 'Éthanoate (acétate)',
  Hydroxide: 'Hydroxyde',
  Nitrate: 'Nitrate',
  Nitrite: 'Nitrite',
  Sulfate: 'Sulfate',
  Sulfite: 'Sulfite',
  Carbonate: 'Carbonate',
  Phosphate: 'Phosphate',
  'Dihydrogen Phosphate': 'Dihydrogénophosphate',
  'Hydrogen Phosphate': 'Hydrogénophosphate',
  Perchlorate: 'Perchlorate',
  Chlorate: 'Chlorate',
  Chlorite: 'Chlorite',
  Hypochlorite: 'Hypochlorite',
  Permanganate: 'Permanganate',
  Chromate: 'Chromate',
  Dichromate: 'Dichromate',
  Thiosulfate: 'Thiosulfate',
  Peroxide: 'Peroxyde',
  Oxalate: 'Oxalate',
  Cyanide: 'Cyanure',
  'Dihydrogen Borate': 'Dihydrogénoborate',
  'Trihydrogen Silicate': 'Trihydrogénosilicate',
  Hydrosulfide: 'Hydrogénosulfure',
  'Hydrogen carbonate (bicarbonate)': 'Hydrogénocarbonate (bicarbonate)',
  'Hydrogen sulfite (bisulfite)': 'Hydrogénosulfite (bisulfite)',
  'Hydrogen sulfate (bisulfate)': 'Hydrogénosulfate (bisulfate)',
};

const polyatomicIonRowsFr = POLYATOMIC_ION_TABLE.rows.map((row) => [
  POLYATOMIC_ION_NAMES_FR[row[0]] ?? row[0],
  // Column 1 is the formula (listed in formulaColumns) and column 2 is the
  // charge; both are notation and are passed through untouched.
  row[1],
  row[2],
]);

// ---------------------------------------------------------------------------

export const CHEAT_SHEET_OVERLAY_FR: CheatSheetOverlaySet = {
  'atomic-structure': {
    title: 'Atomes et tableau périodique',
    summary:
      'De quoi un atome est fait, pourquoi le numéro atomique définit l’élément, et ce que la disposition du tableau permet de prévoir.',
    keyTakeaways: [
      'Un atome, c’est un noyau de protons et de neutrons, avec des électrons répartis autour.',
      'Le nombre de protons – le numéro atomique – fait qu’un atome est cet élément-là. Change-le et tu as un autre élément.',
      'Les électrons occupent des niveaux d’énergie. Le nombre d’électrons du niveau extérieur est ce qui range le tableau périodique.',
      'Un groupe est une colonne, une période est une ligne. Les éléments d’un groupe ont autant d’électrons à l’extérieur, donc ils réagissent pareil.',
      'Les métaux sont à gauche, les non-métaux à droite. Les atomes rétrécissent vers la droite et grandissent vers le bas.',
      'Un atome est presque entièrement vide. Toutes les images d’atome se trompent sur l’échelle, y compris celles d’ici.',
    ],
    formulaExampleNames: [
      'Chlore 35',
      'Chlore 37',
      'Ion hydrogène',
    ],
    formulaExampleDescriptions: [
      '17 protons, 18 neutrons',
      '17 protons, 20 neutrons',
      'un atome d’hydrogène qui a perdu son unique électron – il ne reste qu’un proton',
    ],
    sections: [
      {
        heading: 'De quoi un atome est fait',
        content:
          'Un atome a un noyau de protons et de neutrons, avec des électrons autour. Les protons portent une charge positive et les électrons une charge négative égale. Un atome neutre en a donc autant des uns que des autres. Les neutrons ne portent aucune charge. Presque toute la masse est dans le noyau, parce qu’un électron ne pèse presque rien à côté d’un proton.',
        imageAlt:
          'Un noyau de protons et de neutrons au centre, entouré d’un nuage flou montrant où les électrons se trouvent probablement. Une note précise que le noyau est dessiné bien trop gros pour être visible.',
      },
      {
        heading: 'Numéro atomique et nombre de masse',
        content:
          'Le numéro atomique est le nombre de protons, et c’est lui qui fait qu’un atome est cet élément. Tout atome de chlore a 17 protons ; tout ce qui a 17 protons est du chlore. Le nombre de masse, c’est les protons plus les neutrons. Le nombre de neutrons peut varier sans changer l’élément. Les deux mots sont ici un prolongement : le programme de ces années-là n’en nomme aucun, et sans eux tu ne peux pas lire une case du tableau.',
        exampleNames: ['Chlore 35', 'Chlore 37'],
        imageAlt:
          'Le symbole du chlore 35 avec le nombre de masse 35 écrit au-dessus du numéro atomique 17, et des flèches : 17 protons, et 35 moins 17 donne 18 neutrons.',
      },
      {
        heading: 'Électrons, niveaux d’énergie et forme du tableau',
        content:
          'Les électrons occupent des niveaux d’énergie autour du noyau. Le premier en contient jusqu’à 2, le suivant jusqu’à 8, puis 8 encore pour les vingt premiers éléments. Ton prof et le programme disent peut-être couches : c’est la même chose. Compter les électrons ainsi s’appelle le modèle de Bohr : il est utile, et ce n’est pas une image d’un vrai atome. Le nombre d’électrons du niveau extérieur décide de la façon dont un atome réagit. Deux éléments sont dans le même groupe quand ils en ont autant à l’extérieur. C’est pour cela qu’un groupe se comporte de la même manière.',
        imageAlt:
          'Un noyau de sodium de 11 protons et 12 neutrons, entouré de trois bandes floues portant 2, 8 et 1 électrons, dessinés comme des marques à des angles irréguliers et non comme des points sur des cercles. À côté, l’arrangement 2, 8, 1 avec le niveau externe en dernier. La figure précise elle-même qu’elle est une façon de compter les électrons et non une image d’un atome, et que le noyau est dessiné environ 100 000 fois trop gros.',
      },
      {
        heading: 'Groupes et périodes',
        content:
          'Un groupe est une colonne du tableau et une période est une ligne. Les éléments d’un même groupe ont le même nombre d’électrons au niveau extérieur. La colonne prévoit donc la façon dont un élément réagit. Le groupe 1, ce sont les métaux alcalins, le groupe 17 les halogènes et le groupe 18 les gaz nobles. La période dit combien de niveaux d’énergie sont utilisés : un élément de la période 3 en utilise trois. La ligne te dit donc à peu près quelle est la taille de l’atome.',
      },
      {
        heading: 'Métaux et non-métaux',
        content:
          'Les métaux remplissent la gauche et le milieu du tableau, et les non-métaux occupent le coin en haut à droite. Un métal conduit l’électricité et la chaleur, a une surface brillante, et se laisse marteler en feuille sans se briser. Presque tous les métaux sont solides à température ambiante ; le mercure est celui qui est liquide. Un non-métal conduit mal, est terne, et casse net s’il est solide. Beaucoup de non-métaux sont des gaz. Prolongement : quelques éléments situés sur l’escalier entre les deux, comme le silicium, se comportent un peu comme l’un et un peu comme l’autre. On les appelle semi-métaux, un mot que le programme n’emploie pas.',
      },
      {
        heading: 'Rayon atomique',
        content:
          'Les atomes deviennent plus petits de gauche à droite le long d’une période. Chaque pas ajoute un proton, et la charge positive plus grande tire le même niveau extérieur plus près. Les atomes deviennent plus grands vers le bas d’un groupe, parce que chaque pas vers le bas ouvre un nouveau niveau d’énergie plus loin. Les plus gros atomes sont donc en bas à gauche du tableau, et les plus petits en haut à droite.',
      },
      {
        heading: 'La réactivité, et pourquoi un groupe se comporte pareil',
        content:
          'Tu peux tester un groupe en faisant réagir ses éléments avec le dioxygène, l’eau et les acides : entre eux, ils se comportent de la même façon. Les métaux du groupe 1 réagissent avec l’eau et deviennent plus violents vers le bas : le lithium pétille, le sodium file à la surface, le potassium prend feu. Les mêmes métaux dégagent du dihydrogène avec un acide, et encore plus vite. Les éléments du groupe 17 vont dans l’autre sens et deviennent moins réactifs vers le bas. Le groupe 18 a déjà un niveau extérieur plein, donc les gaz nobles ne réagissent presque avec rien.',
      },
      {
        heading: 'Rangé par numéro atomique, pas par masse',
        content:
          'Mendeleïev a rangé le tableau par masse, et quelques éléments se sont retrouvés au mauvais endroit. En 1913, Henry Moseley a mesuré la charge du noyau et a trouvé l’ordre qui marche : le numéro atomique. Le tellure est plus lourd que l’iode, mais il passe avant, parce qu’il a un proton de moins.',
        imageAlt:
          'Le tellure et l’iode côte à côte. Le tellure a la masse atomique relative la plus grande mais le numéro atomique le plus petit, et le tableau le place en premier.',
      },
    ],
    tables: [
      {
        heading: 'Les trois particules',
        columns: ['Particule', 'Charge', 'Masse relative', 'Où elle se trouve'],
        rows: [
          ['Proton', '+1', '1', 'dans le noyau'],
          ['Neutron', '0', '1', 'dans le noyau'],
          ['Électron', '−1', 'environ 1/1836', 'autour du noyau'],
        ],
      },
    ],
    commonMistakes: [
      'Confondre numéro atomique et nombre de masse. Le numéro atomique, ce sont les protons, et il nomme l’élément. Le nombre de masse, ce sont les protons plus les neutrons.',
      'Prendre un ion pour un autre élément. Perdre ou gagner un électron change la charge, pas le nombre de protons. Le sodium et Na+ sont tous les deux du sodium.',
    ],
  },
  'isotopes-and-radioactivity': {
    title: 'Isotopes et radioactivité',
    summary:
      'Ce qui change quand le nombre de neutrons change : isotopes, désintégration, demi-vie, et les éléments qu’il a fallu fabriquer.',
    keyTakeaways: [
      'Les isotopes sont des atomes du même élément avec des nombres de neutrons différents. Chimiquement, ils se comportent pareil.',
      'La masse atomique relative est une moyenne pondérée sur les isotopes d’un élément. C’est pour cela que si peu sont des nombres entiers.',
      'Un noyau instable se désintègre en émettant un rayonnement, et il laisse derrière lui un atome plus stable.',
      'Il y a trois sortes – alpha, bêta et gamma – et elles diffèrent par ce qui sort et par ce qui l’arrête.',
      'La demi-vie est le temps qu’il faut pour que la moitié d’un échantillon se désintègre. Après trois demi-vies, il reste un huitième.',
      'Les demi-vies vont de la seconde au milliard d’années. C’est exactement ce qui permet de dater un passé lointain.',
    ],
    formulaExampleNames: [
      'Carbone 12',
      'Radon 222',
      'Iode 131',
      'Cobalt 60',
      'Carbone 14',
      'Uranium 238',
    ],
    formulaExampleDescriptions: [
      'l’étalon auquel on compare toutes les autres masses',
      'se désintègre en émettant une particule alpha',
      'se désintègre en émettant une particule bêta',
      'émet un rayonnement gamma',
      'demi-vie d’environ 5730 ans',
      'demi-vie d’environ 4,5 milliards d’années',
    ],
    sections: [
      {
        heading: 'Les deux nombres dont cette antisèche a besoin',
        content:
          'Le numéro atomique est le nombre de protons, et c’est lui qui fixe l’élément. Le nombre de masse, c’est les protons plus les neutrons. Toute cette antisèche parle du deuxième nombre qui change pendant que le premier reste en place. Les deux mots sont un prolongement : le programme de ces années-là n’en nomme aucun, et sans eux rien ici ne fonctionne.',
      },
      {
        heading: 'Les isotopes',
        content:
          'Les isotopes sont des atomes d’un même élément avec des nombres de neutrons différents. La chimie, ce sont les électrons qui la font, et les isotopes en ont le même nombre. Ils réagissent donc de la même façon. Ce qui change, c’est la masse, et parfois la stabilité : certains isotopes sont radioactifs, d’autres non.',
        imageAlt:
          'Trois atomes d’hydrogène côte à côte : un proton, puis un proton et un neutron, puis un proton et deux neutrons. Tous les trois ont un seul électron.',
      },
      {
        heading: 'Noyaux instables et les trois sortes de rayonnement',
        content:
          'Certains noyaux sont instables. Ils se désintègrent tout seuls, émettent un rayonnement et laissent derrière eux un atome plus stable. Le radon 222 éjecte une particule alpha, c’est-à-dire deux protons et deux neutrons ensemble. L’iode 131 émet une particule bêta, c’est-à-dire un électron rapide parti du noyau. Le cobalt 60 émet un rayonnement gamma, qui est de l’énergie et pas une particule. Une feuille de papier arrête l’alpha, une plaque d’aluminium arrête le bêta, et le gamma demande du plomb ou du béton épais.',
      },
      {
        heading: 'La demi-vie',
        content:
          'La demi-vie est le temps qu’il faut pour que la moitié d’un échantillon se désintègre. Après une demi-vie il en reste la moitié, après deux un quart, après trois un huitième. Elle est fixe pour chaque isotope : chauffer l’échantillon ou le faire réagir n’y change rien. Le carbone 14 a une demi-vie d’environ 5730 ans. L’uranium 238 en a une d’environ 4,5 milliards d’années, et c’est pour cela qu’il y a encore de l’uranium dans le sol.',
        imageAlt:
          'Une courbe de désintégration qui tombe de 100 pour cent à 50, 25 puis 12,5 pour cent après une, deux et trois demi-vies, avec à chaque fois un trait en pointillés descendant jusqu’à l’axe. Après trois demi-vies, il reste un huitième. Une demi-vie vaut 5730 ans pour le carbone 14 et environ 4,5 milliards d’années pour l’uranium 238.',
      },
      {
        heading: 'Dater le passé, et 65 000 ans en Australie',
        content:
          'Le carbone 14 se forme haut dans l’air et se retrouve dans tout ce qui vit. Quand un être vivant meurt, il n’en absorbe plus, et celui qu’il contient se désintègre. Mesurer ce qu’il en reste date les vestiges, jusqu’à environ 50 000 ans. Au-delà, il faut une autre méthode. La luminescence stimulée optiquement date le dernier moment où un grain de sable a vu la lumière du jour, et elle remonte bien plus loin. À Madjedbebe, un abri sous roche sur les terres du peuple mirarr, dans le Territoire du Nord, les deux méthodes ont été appliquées aux mêmes couches. Elles placent les peuples aborigènes et insulaires du détroit de Torrès sur le continent australien depuis au moins 65 000 ans.',
      },
      {
        heading: 'La radioactivité en médecine et dans l’industrie',
        content:
          'Le rayonnement est utile parce qu’il traverse la matière solide et qu’on peut le diriger. En médecine, on suit une petite dose d’un isotope de courte durée à travers le corps pour repérer une tumeur. Une forte dose concentrée sert à tuer des cellules cancéreuses, et le cobalt 60 est l’une des sources utilisées pour cela. Dans l’industrie, on traverse au rayonnement gamma des pièces destinées aux avions et aux engins spatiaux. Une fissure apparaît sur le film placé derrière la pièce, sans que personne ait à l’ouvrir.',
      },
      {
        heading: 'Les éléments qu’il a fallu fabriquer',
        content:
          'Les éléments après l’uranium n’ont aucun isotope stable et ne se trouvent pas dans la nature. On les construit dans des accélérateurs en projetant un noyau sur un autre, parfois quelques atomes à la fois. Beaucoup tiennent moins d’une seconde avant de se désintégrer. C’est un prolongement : le programme ne demande pas les éléments fabriqués. Ils sont ici parce que c’est ainsi que les dernières lignes du tableau périodique ont été remplies.',
      },
    ],
    commonMistakes: [
      'Lire la masse atomique relative comme un compte de particules. C’est une moyenne sur les isotopes : les 35,5 du chlore ne correspondent à aucun atome que tu pourrais trouver.',
      'Additionner les deux masses des isotopes et diviser par deux. Cela donne 36 pour le chlore, et c’est faux, parce que le chlore 35 est trois fois plus abondant que le chlore 37.',
    ],
  },
  'states-of-matter': {
    title: 'États de la matière',
    summary: 'Disposition des particules, énergie cinétique et les six changements d’état.',
    keyTakeaways: [
      'Solides : les particules vibrent à des positions fixes – forme fixe et volume fixe.',
      'Liquides : les particules glissent les unes sur les autres – volume fixe, mais la forme est celle du récipient.',
      'Gaz : les particules se déplacent librement et vite – ils remplissent tout récipient et se compriment facilement.',
      'La température mesure l’énergie cinétique moyenne des particules.',
      'Pendant un changement d’état, la température reste constante : l’énergie sert à rompre ou à former des interactions entre les particules, pas à les accélérer.',
    ],
    formulaExampleNames: [
      'Glace (solide)',
      'Eau (liquide)',
      'Vapeur d’eau (gaz)',
      'Sel dissous (en solution aqueuse)',
    ],
    sections: [
      {
        heading: 'Les symboles d’état dans les équations',
        content:
          'Chaque espèce d’une équation chimique porte un symbole d’état : (s) solide, (l) liquide, (g) gaz, (aq) dissous dans l’eau. « Aqueux » n’est pas un quatrième état de la matière : cela veut dire qu’un soluté est dissous dans l’eau liquide.',
      },
      {
        heading: 'Courbes de chauffage et de refroidissement',
        content:
          'Sur une courbe de chauffage, les paliers horizontaux sont les changements d’état (fusion, ébullition). Les portions qui montent correspondent à un seul état qui se réchauffe. Le palier de l’ébullition est plus long que celui de la fusion, parce que séparer complètement les particules demande plus d’énergie que simplement les desserrer.',
      },
    ],
    tables: [
      {
        heading: 'Les six changements d’état',
        columns: ['Changement', 'De → Vers', 'Énergie'],
        rows: [
          ['Fusion', 'solide → liquide', 'absorbée'],
          ['Solidification', 'liquide → solide', 'libérée'],
          ['Vaporisation / ébullition', 'liquide → gaz', 'absorbée'],
          ['Liquéfaction', 'gaz → liquide', 'libérée'],
          ['Sublimation', 'solide → gaz', 'absorbée'],
          ['Condensation solide', 'gaz → solide', 'libérée'],
        ],
      },
    ],
    commonMistakes: [
      '« Les particules se dilatent quand on chauffe » – les particules gardent la même taille ; ce sont les espaces entre elles qui augmentent.',
      'Croire que les bulles de l’eau bouillante sont de l’air – c’est de la vapeur d’eau.',
      'Confondre l’évaporation (à la surface, à n’importe quelle température) et l’ébullition (dans tout le liquide, à la température d’ébullition).',
    ],
  },

  'acids-and-bases': {
    title: 'Acides et bases',
    summary: 'pH, donneurs et accepteurs de proton, fort ou faible, et la neutralisation.',
    keyTakeaways: [
      'Acide : un donneur de proton (H+). Dans l’eau, il forme des ions oxonium, H3O+. pH < 7.',
      'Base : un accepteur de proton. Les bases solubles libèrent des ions hydroxyde, OH-, dans l’eau. pH > 7.',
      'Neutre : pH 7 à 25 °C – l’eau pure et la plupart des sels.',
      'Neutralisation : acide + base → sel + eau. L’équation ionique est toujours H+ + OH- → H2O.',
      'Chaque graduation de l’échelle de pH correspond à un facteur 10 sur la concentration en H+ : un pH 2 est 100 fois plus acide qu’un pH 4.',
    ],
    formulaExampleNames: [
      'Acide chlorhydrique (fort)',
      'Acide éthanoïque (faible)',
      'Hydroxyde de sodium (base forte)',
      'Ammoniac (base faible)',
    ],
    sections: [
      {
        heading: 'Fort et faible, ce n’est pas la même chose que concentré et dilué',
        content:
          'Les acides forts s’ionisent totalement dans l’eau (HCl, HNO3, H2SO4). Les acides faibles ne s’ionisent que partiellement (CH3COOH, H2CO3). « Concentré » et « dilué » disent quelle quantité d’acide est dissoute, pas quelle proportion s’ionise : il existe des acides forts dilués et des acides faibles concentrés.',
        exampleNames: ['Ionisation d’un acide fort', 'Neutralisation'],
      },
      {
        heading: 'Les réactions des acides à reconnaître',
        content:
          'Acide + métal → sel + dihydrogène. Acide + carbonate métallique → sel + eau + dioxyde de carbone. Acide + oxyde ou hydroxyde métallique → sel + eau. Le sel tire son nom du métal et de l’acide (acide chlorhydrique → chlorure, acide sulfurique → sulfate, acide nitrique → nitrate).',
        exampleNames: ['Acide + métal', 'Acide + carbonate'],
      },
    ],
    tables: [
      {
        heading: 'Repères sur l’échelle de pH',
        columns: ['pH', 'Exemple', 'Couleur de l’indicateur universel'],
        rows: [
          ['0–2', 'Suc gastrique, acide de batterie', 'Rouge'],
          ['3–6', 'Vinaigre, jus de citron, sodas', 'Orange → jaune'],
          ['7', 'Eau pure', 'Vert'],
          ['8–11', 'Bicarbonate, eau de mer, savon', 'Bleu'],
          ['12–14', 'Décapant four, déboucheur', 'Violet'],
        ],
      },
    ],
    commonMistakes: [
      'Écrire que les acides « contiennent » des H+ – ils ne libèrent des H+ (sous forme de H3O+) qu’une fois dissous dans l’eau.',
      'Croire que toutes les bases contiennent OH – l’ammoniac (NH3) est une base parce qu’il capte un proton.',
      'Croire que l’échelle de pH s’arrête à 0 et à 14 – des solutions très concentrées vont au-delà.',
    ],
  },

  'balancing-equations': {
    title: 'Équilibrer les équations chimiques',
    summary:
      'Conservation de la masse : les mêmes atomes entrent et sortent – change les coefficients, jamais les indices.',
    keyTakeaways: [
      'Dans une réaction, les atomes sont réorganisés, jamais créés ni détruits – chaque élément doit être présent en même nombre des deux côtés.',
      'Les coefficients (les grands chiffres devant) multiplient toute la formule. Les indices (les petits chiffres dedans) définissent la substance et ne doivent jamais changer.',
      'Équilibre un élément à la fois ; garde l’hydrogène et l’oxygène pour la fin ; traite un ion polyatomique comme une unité s’il apparaît inchangé des deux côtés.',
      'Les coefficients doivent former le plus petit rapport de nombres entiers.',
      'Écris toujours les symboles d’état dans l’équation finale.',
    ],
    formulaExampleNames: [
      'Non équilibrée',
      'Équilibrée',
      'Avec un ion polyatomique traité comme une unité',
    ],
    sections: [
      {
        heading: 'Une méthode qui marche à tous les coups',
        content:
          '1. Écris la formule correcte de chaque réactif et de chaque produit. 2. Compte les atomes de chaque élément de chaque côté. 3. Commence par l’élément qui apparaît dans le moins de formules. 4. Ne change que les coefficients. 5. Si tu obtiens une fraction (par exemple 7/2 O2), multiplie tout par 2. 6. Recompte chaque élément. 7. Ajoute les symboles d’état.',
        exampleNames: ['Combustion du propane'],
      },
    ],
    commonMistakes: [
      'Transformer H2O en H2O2 pour « avoir plus d’oxygène » – c’est une autre substance.',
      'Oublier qu’un coefficient multiplie chaque atome de la formule (2Ca(OH)2 contient 4 H).',
      'S’arrêter avant d’avoir revérifié chaque élément une deuxième fois.',
    ],
  },

  'reaction-types': {
    title: 'Types de réactions chimiques',
    summary:
      'Reconnaître à leur schéma la synthèse, la décomposition, la combustion, le déplacement, la précipitation et la neutralisation.',
    keyTakeaways: [
      'Synthèse (combinaison) : deux substances ou plus s’assemblent – A + B → AB.',
      'Décomposition : une substance se sépare – AB → A + B (il faut souvent de la chaleur ou du courant).',
      'Combustion : combustible + dioxygène → dioxyde de carbone + eau (combustion complète) – de la chaleur est libérée.',
      'Déplacement simple : un élément plus réactif prend la place d’un élément moins réactif – A + BC → AC + B.',
      'Double déplacement : les ions échangent leurs partenaires – AB + CD → AD + CB (la précipitation et la neutralisation en sont des cas particuliers).',
    ],
    formulaExampleNames: [
      'Synthèse',
      'Décomposition',
      'Combustion',
      'Déplacement simple',
      'Précipitation',
      'Neutralisation',
    ],
    sections: [
      {
        heading: 'Comment les distinguer vite',
        content:
          'Compte les réactifs et les produits. Un seul produit à partir de plusieurs réactifs → synthèse. Plusieurs produits à partir d’un seul réactif → décomposition. O2 à gauche, CO2 et H2O à droite → combustion. Un élément et un composé qui échangent → déplacement simple. Deux composés qui échangent leurs ions → double déplacement ; s’il se forme un solide, c’est une précipitation ; si de l’eau se forme à partir d’un acide et d’une base, c’est une neutralisation.',
      },
    ],
    tables: [
      {
        heading: 'Formes générales',
        columns: ['Type', 'Forme générale', 'Indice'],
        rows: [
          ['Synthèse', 'A + B → AB', 'Moins de produits que de réactifs'],
          ['Décomposition', 'AB → A + B', 'Un seul réactif'],
          [
            'Combustion',
            'Combustible + O₂ → CO₂ + H₂O',
            'Dioxygène en réactif, chaleur libérée',
          ],
          ['Déplacement simple', 'A + BC → AC + B', 'Élément + composé'],
          ['Double déplacement', 'AB + CD → AD + CB', 'Deux composés échangent leurs ions'],
          ['Précipitation', 'Ions (aq) → solide', 'Un produit (s) à partir de réactifs (aq)'],
          ['Neutralisation', 'Acide + base → sel + eau', 'H⁺ + OH⁻ → H₂O'],
        ],
      },
    ],
    commonMistakes: [
      'Appeler « combustion » toute réaction avec du dioxygène – la rouille est une oxydation lente, pas une combustion.',
      'Oublier qu’une combustion incomplète donne du CO ou du C (suie) au lieu de CO2.',
    ],
  },

  'chemical-bonds': {
    title: 'Liaisons chimiques et structures',
    summary:
      'Liaison ionique, covalente et métallique – et comment la structure explique les propriétés.',
    keyTakeaways: [
      'Les atomes se lient pour atteindre une couche externe stable et complète (la configuration d’un gaz noble). Pour un élément d’un groupe principal, le numéro de colonne donne le nombre d’électrons de valence.',
      'Ionique : métal + non-métal. Des électrons sont transférés ; les ions formés sont maintenus dans un réseau à trois dimensions par l’attraction électrostatique.',
      'Covalente : non-métal + non-métal. Les électrons sont partagés par doublets ; chaque doublet partagé est une liaison.',
      'Métallique : des cations métalliques dans un réseau, entourés d’une « mer » d’électrons libres.',
      'Les propriétés découlent de la structure : un réseau est dur et fond à haute température ; les petites molécules fondent bas parce que seules des forces faibles agissent entre elles.',
    ],
    formulaExampleNames: [
      'Composé ionique',
      'Molécule covalente',
      'Réseau covalent',
      'Métal',
    ],
    sections: [
      {
        heading: 'Pourquoi les composés ioniques ne conduisent que fondus ou dissous',
        content:
          'Dans le réseau solide, les ions sont bloqués sur place : aucune particule chargée ne peut se déplacer. La fusion ou la dissolution libère les ions, et le liquide conduit. Les métaux conduisent dans tous les états, parce que leurs électrons libres sont toujours mobiles.',
      },
    ],
    tables: [
      {
        heading: 'Structure → propriétés',
        columns: ['Type', 'Particules', 'Température de fusion', 'Conduit ?', 'Exemple'],
        rows: [
          [
            'Réseau ionique',
            'Cations + anions',
            'Élevée',
            'Seulement fondu ou (aq)',
            'NaCl, MgO',
          ],
          ['Covalent moléculaire', 'Molécules', 'Basse', 'Non', 'H₂O, CO₂'],
          [
            'Réseau covalent',
            'Atomes (tous liés)',
            'Très élevée',
            'Non (sauf le graphite)',
            'Diamant, SiO₂',
          ],
          [
            'Réseau métallique',
            'Cations + e⁻ libres',
            'Élevée (variable)',
            'Oui, dans tous les états',
            'Cu, Fe, Al',
          ],
        ],
      },
    ],
    commonMistakes: [
      'Appeler NaCl une « molécule » – c’est un réseau ; la formule est une formule statistique, pas une molécule.',
      'Croire que les liaisons covalentes sont faibles parce que les substances moléculaires fondent facilement – les liaisons à l’intérieur d’une molécule sont fortes ; ce sont les forces entre molécules qui sont faibles.',
      'Croire qu’une liaison est soit totalement ionique, soit totalement covalente – la différence d’électronégativité en fait un continuum.',
    ],
  },

  'chemical-formulas': {
    title: 'Écrire la formule d’un composé ionique',
    summary:
      'Équilibre les charges : le cation d’abord, les charges en croix, des parenthèses autour d’un ion polyatomique répété.',
    keyTakeaways: [
      'Un composé ionique n’a pas de charge globale : la charge positive totale égale la charge négative totale.',
      'Écris le cation (le métal ou NH4+) en premier dans la formule, puis l’anion.',
      'Méthode de la croix : la valeur absolue de la charge de chaque ion devient l’indice de l’autre, puis on simplifie au plus petit rapport.',
      'Un ion polyatomique forme une unité. S’il t’en faut plus d’un, mets-le entre parenthèses : Ca(OH)2, et non CaOH2.',
      'Les métaux à charge variable (Fe, Cu, Pb, Sn) portent leur charge en chiffres romains dans le nom : fer(III) = Fe 3+.',
    ],
    formulaExampleNames: [
      'Oxyde d’aluminium (3+ et 2−)',
      'Hydroxyde de calcium (parenthèses)',
      'Sulfate d’ammonium',
      'Chlorure de fer(III)',
      'Oxyde de magnésium (2+ et 2− se simplifient)',
    ],
    sections: [
      {
        heading: 'Exemple guidé : le sulfate d’aluminium',
        content:
          'Al 3+ et SO4 2−. En croix : Al prend l’indice 2, le sulfate prend l’indice 3. Le sulfate est polyatomique et répété, il lui faut donc des parenthèses : Al2(SO4)3. Vérification : 2 × (+3) = +6 et 3 × (−2) = −6. L’ensemble est neutre.',
        exampleNames: ['Sulfate d’aluminium'],
      },
      {
        heading: 'Les charges courantes lues dans le tableau périodique',
        content:
          'Colonne 1 → +1, colonne 2 → +2, Al → +3, colonne 17 → −1, colonne 16 → −2, N et P → −3. Les métaux de transition varient – le nom te le dit. Pour les ions polyatomiques, utilise le tableau de référence.',
      },
    ],
    commonMistakes: [
      'Oublier de simplifier : Mg2O2 doit devenir MgO.',
      'Mettre des parenthèses autour d’un ion polyatomique unique : NaOH, et non Na(OH).',
      'Écrire l’anion en premier dans la formule parce qu’on le nomme en premier à l’oral.',
    ],
  },

  'polyatomic-ions': {
    title: 'Ions polyatomiques',
    summary:
      'Le tableau de référence, et les schémas de nommage qui font que tu as bien moins à apprendre par cœur que tu ne le crois.',
    keyTakeaways: [
      'Un ion polyatomique est un groupe d’atomes liés par des liaisons covalentes, qui porte une charge globale et se déplace comme une seule unité au cours d’une réaction.',
      'Le seul cation polyatomique courant est l’ammonium, NH4+. Tous les autres sont des anions.',
      'La terminaison « -ate » signifie plus d’oxygène que « -ite » : sulfate SO4 2− contre sulfite SO3 2− ; nitrate NO3− contre nitrite NO2−. La charge, elle, ne change pas.',
      '« Per-…-ate » a un oxygène de plus que « -ate », et « hypo-…-ite » un de moins que « -ite » (perchlorate ClO4−, chlorate ClO3−, chlorite ClO2−, hypochlorite ClO−).',
      'Ajouter un H+ à un anion augmente sa charge de un et met « hydrogéno » devant son nom : carbonate CO3 2− → hydrogénocarbonate HCO3−.',
    ],
    formulaExampleNames: [
      'Nitrate de sodium',
      'Sulfate de cuivre(II)',
      'Carbonate d’ammonium',
      'Permanganate de potassium',
    ],
    sections: [
      {
        heading: 'Comment les apprendre',
        content:
          'Apprends d’abord les ions en « -ate » (sulfate, nitrate, carbonate, phosphate, chlorate) – tous les autres oxanions n’en sont qu’une variation. Apprends ensuite les quatre qui sortent du schéma : hydroxyde OH−, cyanure CN−, ammonium NH4+ et peroxyde O2 2−.',
      },
      {
        heading: 'Où tu les rencontres',
        content:
          'Les acides : l’acide sulfurique est H2SO4 parce que le sulfate porte 2− ; l’acide nitrique est HNO3 parce que le nitrate porte 1−. La précipitation : presque tous les nitrates et tous les sels d’ammonium sont solubles, ce sont donc les ions spectateurs habituels. L’oxydoréduction : le permanganate et le dichromate sont les oxydants classiques.',
      },
    ],
    tables: [
      {
        heading: 'Ions polyatomiques (sélection du livret de données du VCE)',
        caption:
          'Les cations d’abord, puis les anions groupés par charge. Les noms entre parenthèses sont des noms plus anciens que tu peux encore rencontrer.',
        columns: ['Nom', 'Formule', 'Charge'],
        rows: polyatomicIonRowsFr,
      },
    ],
    commonMistakes: [
      'Couper l’ion dans la formule (écrire Ca(OH)2 sous la forme CaO2H2) – il reste d’un seul tenant.',
      'Attribuer la charge au dernier atome seulement – elle appartient au groupe entier.',
      'Confondre la charge (−2) avec le nombre d’atomes d’oxygène – le sulfate a 4 O et une charge de 2−.',
    ],
  },

  'naming-compounds': {
    title: 'Nommer les composés inorganiques',
    summary:
      'Trois systèmes de nommage – ionique, moléculaire, acides – et comment savoir lequel s’applique.',
    keyTakeaways: [
      'Détermine d’abord le type : métal + non-métal (ou NH4+) → ionique ; deux non-métaux → moléculaire ; H en tête et dissous dans l’eau → acide.',
      'Ionique : en français, le nom de l’anion vient d’abord, puis « de » et le nom du cation – chlorure de sodium, sulfate de calcium. Les anions monoatomiques prennent la terminaison -ure (chlorure, bromure) sauf l’oxygène, qui donne oxyde ; les anions polyatomiques gardent leur propre nom. Pas de préfixes numériques : le rapport découle des charges.',
      'Les métaux à charge variable prennent un chiffre romain pour la charge du cation : FeCl2 = chlorure de fer(II), FeCl3 = chlorure de fer(III). Déduis-le de l’anion.',
      'Moléculaire : des préfixes grecs donnent le nombre d’atomes, et là encore l’ordre est inversé par rapport à l’anglais – CO2 est le dioxyde de carbone, N2O4 le tétroxyde de diazote. Le préfixe « mono- » se supprime sur l’élément nommé en second.',
      'Acides : en français, le nom se construit sur le nom de l’anion – un anion en -ure donne « acide …hydrique » (Cl⁻ chlorure → HCl acide chlorhydrique), un anion en -ate donne « acide …ique » (SO4 2− sulfate → H2SO4 acide sulfurique), un anion en -ite donne « acide …eux » (NO2− nitrite → HNO2 acide nitreux).',
    ],
    formulaExampleNames: [
      'Nitrure de magnésium (ionique)',
      'Oxyde de cuivre(I) (ionique, chiffre romain)',
      'Pentachlorure de phosphore (moléculaire)',
      'Acide nitreux (acide, à partir du nitrite)',
    ],
    sections: [
      {
        heading: 'Déterminer un chiffre romain',
        content:
          'Pour Fe2(SO4)3 : le sulfate porte 2−, et il y en a trois, donc les anions totalisent −6. Les deux ions fer doivent totaliser +6, chacun est donc en +3 → sulfate de fer(III). Seuls les métaux qui ont plus d’une charge courante (Fe, Cu, Pb, Sn, Mn, Cr, Co, Ni) ont besoin du chiffre ; la colonne 1, la colonne 2, Al, Zn et Ag n’en ont jamais besoin.',
      },
    ],
    tables: [
      {
        heading: 'Préfixes grecs des composés moléculaires',
        columns: ['Nombre', 'Préfixe', 'Exemple'],
        rows: [
          ['1', 'mono- (supprimé sur l’élément nommé en second)', 'CO monoxyde de carbone'],
          ['2', 'di-', 'CO₂ dioxyde de carbone'],
          ['3', 'tri-', 'SO₃ trioxyde de soufre'],
          ['4', 'tétra-', 'CCl₄ tétrachlorure de carbone'],
          ['5', 'penta-', 'PCl₅ pentachlorure de phosphore'],
          ['6', 'hexa-', 'SF₆ hexafluorure de soufre'],
          ['7', 'hepta-', 'Cl₂O₇ heptoxyde de dichlore'],
          ['8–10', 'octa-, nona-, déca-', 'P₄O₁₀ décoxyde de tétraphosphore'],
        ],
      },
      {
        heading: 'Le nom de l’acide à partir du nom de l’anion',
        columns: ['Terminaison de l’anion', 'Nom de l’acide', 'Exemple'],
        rows: [
          ['-ure', 'acide …hydrique', 'Cl⁻ chlorure → HCl acide chlorhydrique'],
          ['-ate', 'acide …ique', 'SO₄²⁻ sulfate → H₂SO₄ acide sulfurique'],
          ['-ite', 'acide …eux', 'NO₂⁻ nitrite → HNO₂ acide nitreux'],
        ],
      },
    ],
    commonMistakes: [
      'Utiliser des préfixes numériques sur un composé ionique : « dichlorure de calcium » est faux – CaCl2 est le chlorure de calcium.',
      'Garder la voyelle : on dit monoxyde, tétroxyde, pentoxyde – pas « monooxyde ».',
      'Mettre un chiffre romain sur le sodium, le zinc ou l’aluminium – ils n’ont qu’une seule charge.',
    ],
  },

  'relative-formula-mass': {
    title: 'Masse atomique et masse formulaire relatives',
    summary:
      'Ce que Ar veut vraiment dire, et comment additionner les atomes pour trouver la Mr d’une formule – indices et parenthèses compris.',
    keyTakeaways: [
      'La masse atomique relative (Ar) est une comparaison, pas un poids en grammes : un atome de carbone pèse à peu près autant que 12 atomes d’hydrogène. Ar se mesure par rapport au carbone 12, qui vaut exactement 12.',
      'Comme c’est un rapport, Ar n’a pas d’unité. Rien sur cette fiche ne se mesure en grammes tant que tu n’es pas passé à une quantité réelle.',
      'La masse formulaire relative (Mr) est la somme de tous les atomes de la formule. Rien d’autre : on ne multiplie pas à la fin, on ne fait pas de moyenne.',
      'Un indice multiplie l’atome qui le précède. Une parenthèse multiplie tout ce qu’elle contient.',
      'Lis Ar dans le tableau périodique. On ne te demande pas de la retenir, et un tableau de classe arrondit : H 1, C 12, O 16, Cl 35,5.',
      'Pour un composé ionique c’est la même idée que pour une molécule – d’où formulaire et non moléculaire : dans NaCl, il n’y a aucune molécule à peser.',
    ],
    formulaExampleNames: [
      'Eau',
      'Dioxyde de carbone',
      'Carbonate de calcium',
      'Hydroxyde de magnésium',
      'Nitrate de calcium',
    ],
    formulaExampleDescriptions: [
      '2 × 1 + 16 = 18',
      '12 + 2 × 16 = 44',
      '40 + 12 + 3 × 16 = 100',
      '24 + 2 × (16 + 1) = 58',
      '40 + 2 × (14 + 3 × 16) = 164',
    ],
    sections: [
      {
        heading: 'Ce que « relative » veut dire',
        content:
          'Les atomes sont bien trop légers pour être pesés un par un : les chimistes les comparent. Pose un atome de carbone sur un plateau et des atomes d’hydrogène sur l’autre — il en faut 12 pour que la balance soit à l’équilibre. Toute l’idée est là : le carbone est 12 fois plus lourd que l’hydrogène, donc on dit que sa masse atomique relative vaut 12. Le nombre répond à la question « combien d’hydrogènes ? », et c’est pour cela qu’il n’a pas d’unité : c’est une comparaison, pas une mesure. En toute rigueur, l’étalon est le carbone 12, pas l’hydrogène : chaque masse atomique relative compare un atome à un douzième d’un atome de carbone 12. L’hydrogène tombe sur presque exactement 1, et c’est pour cela que l’image de la balance fonctionne.',
      },
      {
        heading: 'Additionner les atomes',
        content:
          'La masse formulaire relative (Mr) est la somme des Ar de tous les atomes de la formule. Va de gauche à droite, un élément à la fois, et écris le calcul : H2O, c’est 2 hydrogènes à 1 chacun, plus 1 oxygène à 16, donc 2 + 16 = 18. L’ordre n’a pas d’importance et on ne multiplie rien à la fin — si tu sors la calculatrice pour autre chose qu’une addition, quelque chose cloche.',
        exampleNames: ['Ammoniac', 'Méthane', 'Acide sulfurique'],
        exampleDescriptions: [
          '14 + 3 × 1 = 17',
          '12 + 4 × 1 = 16',
          '2 × 1 + 32 + 4 × 16 = 98',
        ],
      },
      {
        heading: 'Indices et parenthèses',
        content:
          'Un indice ne multiplie que l’atome qu’il suit : le 2 de CO2 veut dire deux oxygènes, pas deux de tout. Une parenthèse multiplie tout le groupe qu’elle contient : Mg(OH)2, c’est un magnésium plus deux groupes OH, donc 24 + 2 × 17 = 58, et non 24 + 16 + 1. Quand tu vois une parenthèse, calcule le groupe une fois, puis multiplie.',
        exampleNames: ['Sulfate d’aluminium'],
        exampleDescriptions: [
          '2 × 27 + 3 × (32 + 4 × 16) = 342',
        ],
      },
      {
        heading: 'Pourquoi le tableau de la classe ne colle pas à Internet',
        content:
          'Un recueil de données donne le chlore à 35,45 et l’hydrogène à 1,008, parce qu’un échantillon réel est un mélange d’isotopes. Un tableau de classe arrondit : H 1, C 12, N 14, O 16, Cl 35,5. Les deux sont justes — la version arrondie s’additionne plus facilement et reste assez précise pour toutes les questions qu’on te posera. Utilise le tableau de ta classe, et précise lequel si le résultat est juste à la limite.',
      },
      {
        heading: 'À quoi ça sert',
        content:
          'Dès que tu sais calculer la Mr des deux côtés d’une équation, tu peux montrer en chiffres que la masse se conserve, et mettre une recette à l’échelle : si 4 g d’hydrogène donnent 36 g d’eau, alors 8 g en donnent 72 g. C’est du masse à masse par proportion, sans aucune mole. La mole viendra plus tard, comme raccourci du même raisonnement.',
      },
    ],
    tables: [
      {
        heading: 'Les valeurs utilisées en classe',
        caption:
          'Arrondies comme les arrondit un tableau scolaire. Le chlore et le cuivre gardent un demi, parce que les arrondir à l’entier abîmerait visiblement un résultat.',
        columns: ['Élément', 'Symbole', 'Ar'],
        rows: [
          ['hydrogène', 'H', '1'],
          ['carbone', 'C', '12'],
          ['azote', 'N', '14'],
          ['oxygène', 'O', '16'],
          ['sodium', 'Na', '23'],
          ['magnésium', 'Mg', '24'],
          ['aluminium', 'Al', '27'],
          ['soufre', 'S', '32'],
          ['chlore', 'Cl', '35,5'],
          ['potassium', 'K', '39'],
          ['calcium', 'Ca', '40'],
          ['fer', 'Fe', '56'],
          ['cuivre', 'Cu', '63,5'],
        ],
      },
      {
        heading: 'Exemples résolus',
        columns: ['Formule', 'Calcul', 'Mr'],
        rows: [
          ['H2', '2 × 1', '2'],
          ['O2', '2 × 16', '32'],
          ['H2O', '2 × 1 + 16', '18'],
          ['NaCl', '23 + 35,5', '58,5'],
          ['MgO', '24 + 16', '40'],
          ['CO2', '12 + 2 × 16', '44'],
          ['CaCO3', '40 + 12 + 3 × 16', '100'],
          ['H2SO4', '2 × 1 + 32 + 4 × 16', '98'],
          ['Mg(OH)2', '24 + 2 × (16 + 1)', '58'],
          ['Ca(NO3)2', '40 + 2 × (14 + 3 × 16)', '164'],
        ],
      },
    ],
    commonMistakes: [
      'Dire qu’un atome de carbone « pèse 12 » — 12 quoi ? Ar est une comparaison avec l’hydrogène et n’a pas d’unité. Les grammes n’arrivent qu’au moment où tu passes à une quantité réelle.',
      'Appliquer l’indice à toute la formule : dans CO2, le 2 ne concerne que l’oxygène.',
      'Oublier une parenthèse, si bien que Mg(OH)2 donne 41 au lieu de 58.',
      'Appeler la Mr « masse moléculaire » pour NaCl ou MgO. Il n’y a pas de molécule, et c’est précisément pour cela qu’on dit masse formulaire.',
      'Mélanger une valeur du recueil de données à un exercice bâti sur le tableau de la classe, puis s’étonner que le résultat diffère d’une fraction de celui du corrigé.',
      'Faire la moyenne des Ar au lieu de les additionner.',
    ],
  },

  stoichiometry: {
    title: 'La mole et la stœchiométrie',
    summary:
      'Conversions avec la mole, rapports molaires, réactif limitant et rendement, au même endroit.',
    keyTakeaways: [
      'Une mole, c’est 6,02 × 10^23 entités (constante d’Avogadro, N_A). La masse molaire M (g/mol) est la masse d’une mole – additionne les masses atomiques lues dans le tableau périodique.',
      'Tous les chemins passent par la quantité de matière : convertis la donnée en moles, utilise le rapport molaire lu dans l’équation équilibrée, puis reconvertis vers la grandeur demandée.',
      'Le rapport molaire est le rapport des coefficients – rien d’autre.',
      'Réactif limitant : le réactif qui s’épuise en premier décide de la quantité de produit formée. Calcule la quantité de matière de chaque réactif et divise-la par son coefficient ; le plus petit résultat désigne le réactif limitant.',
      'Rendement = (quantité obtenue ÷ quantité théorique) × 100. La quantité théorique se calcule à partir du réactif limitant. Attention : en français, « rendement » est toujours le rapport, jamais la masse elle-même.',
    ],
    formulaExampleNames: ['Combustion du méthane', 'Synthèse de l’ammoniac'],
    tables: [
      {
        heading: 'Les formules de conversion',
        columns: ['Formule', 'À utiliser quand tu connais…', 'Unités'],
        rows: [
          ['n = m ÷ M', 'la masse', 'n en mol, m en g, M en g/mol'],
          ['n = N ÷ N_A', 'le nombre d’entités', 'N_A = 6,02 × 10²³ mol⁻¹'],
          ['n = c × V', 'la concentration d’une solution', 'c en mol/L, V en L'],
          [
            'n = V ÷ V_m',
            'le volume d’un gaz dans les conditions SLC',
            'V_m = 24,8 L/mol à 25 °C et 100 kPa',
          ],
          ['PV = nRT', 'un gaz dans d’autres conditions', 'P en kPa, V en L, T en K, R = 8,31'],
        ],
      },
    ],
    sections: [
      {
        heading: 'Exemple guidé : masse → masse',
        content:
          'Quelle masse d’eau se forme quand 8,0 g de dihydrogène brûlent complètement ? 2H2 + O2 → 2H2O. n(H2) = 8,0 ÷ 2,0 = 4,0 mol. Rapport H2 : H2O = 2 : 2, donc n(H2O) = 4,0 mol. m(H2O) = 4,0 × 18,0 = 72 g.',
      },
      {
        heading: 'Exemple guidé : réactif limitant',
        content:
          '4,0 mol de H2 réagissent avec 1,0 mol de O2. Divise par les coefficients : H2 → 4,0 ÷ 2 = 2,0 ; O2 → 1,0 ÷ 1 = 1,0. Le dioxygène est le réactif limitant. n(H2O) = 2 × n(O2) = 2,0 mol ; il reste 2,0 mol de H2 (en excès).',
      },
    ],
    commonMistakes: [
      'Utiliser le rapport des masses au lieu du rapport molaire – 2 g de H2 ne réagissent pas avec 1 g de O2.',
      'Désigner comme limitant le réactif dont la masse est la plus petite, sans convertir en moles.',
      'Mélanger les unités : un volume en mL avec une c en mol/L donne une quantité de matière 1 000 fois trop grande.',
      'Arrondir trop tôt – garde toute la précision jusqu’au résultat final, puis donne trois chiffres significatifs.',
    ],
  },

  'lewis-structures': {
    title: 'Structures de Lewis',
    summary:
      'Compter les électrons de valence, les partager pour satisfaire l’octet, puis vérifier avec la charge formelle.',
    keyTakeaways: [
      'Électrons de valence = numéro de colonne pour les éléments des groupes principaux (H 1, C 4, N 5, O 6, halogènes 7). Ajoute un électron par charge négative, enlève-en un par charge positive.',
      'Chaque liaison est un doublet partagé (2 électrons). Simple = 1 doublet, double = 2, triple = 3. Les électrons qui ne sont pas dans une liaison forment des doublets non liants.',
      'Règle de l’octet : la plupart des atomes veulent 8 électrons de valence autour d’eux. L’hydrogène en veut 2 (règle du duet).',
      'S’il manque des électrons à l’atome central pour compléter son octet une fois tous les électrons placés, transforme des doublets non liants des atomes périphériques en liaisons supplémentaires.',
      'Charge formelle = électrons de valence − électrons des doublets non liants − la moitié des électrons de liaison. La meilleure structure est celle dont les charges formelles sont les plus proches de zéro, une charge négative se plaçant sur l’atome le plus électronégatif.',
    ],
    formulaExampleNames: [
      'Eau – 2 liaisons, 2 doublets non liants sur O',
      'Dioxyde de carbone – deux liaisons doubles',
      'Diazote – liaison triple',
      'Ion ammonium – 8 électrons (5 + 4 − 1)',
    ],
    sections: [
      // Four sections, matching the English structure exactly. `localizeSheet()`
      // maps overlay sections onto English sections *by index*, so a short list
      // does not fail a test — it silently shifts every heading onto the wrong
      // body and leaves the last section in English. See the note in the run's
      // report about the German overlay, which has three.
      {
        heading: 'L’essentiel pour la 2de',
        content:
          'Chaque atome apporte ses électrons externes sous forme de points. Un point tout seul est un solitaire ; deux solitaires venant de deux atomes différents forment un doublet partagé, c’est-à-dire une liaison (dessinée par un trait). Les doublets qui restent sur un seul atome sont des doublets non liants. Un atome est complet avec 8 points autour de lui (un octet) – l’hydrogène est complet à 2 (un duet). Partage deux fois entre les deux mêmes atomes pour une liaison double, trois fois pour une liaison triple. Le nombre de solitaires te dit combien de liaisons un atome forme : H 1, C 4, N 3, O 2, Cl 1. Le soufre se comporte comme l’oxygène et le phosphore comme l’azote, parce qu’ils sont dans les mêmes colonnes. Tout ce qui suit cette section (charge formelle, formes VSEPR, exceptions à l’octet) relève du lycée.',
        exampleNames: [
          'Eau – l’oxygène partage deux fois et garde 2 doublets non liants',
          'Méthane – le carbone partage ses quatre solitaires',
          'Dioxygène – deux doublets partagés font une liaison double',
        ],
      },
      {
        heading: 'Les cinq étapes',
        content:
          '1. Compte tous les électrons de valence (ajuste selon la charge). 2. Place l’atome le moins électronégatif au centre (jamais H). 3. Relie chaque atome périphérique au centre par une liaison simple. 4. Place les électrons restants en doublets non liants, d’abord sur les atomes périphériques, puis sur le centre. 5. S’il manque l’octet au centre, forme des liaisons doubles ou triples. Vérifie que le total d’électrons correspond à l’étape 1.',
      },
      {
        heading: 'De la structure de Lewis à la forme (VSEPR)',
        content:
          'Compte les zones électroniques autour de l’atome central (chaque liaison compte pour une, simple ou multiple ; chaque doublet non liant compte pour une). 4 zones → tétraédrique (109,5°) ; avec 1 doublet non liant → pyramidale à base triangulaire (NH3) ; avec 2 doublets non liants → coudée (H2O). 3 zones → triangulaire plane (120°). 2 zones → linéaire (180°).',
      },
      {
        heading: 'Les exceptions à la règle de l’octet',
        content:
          'Be et B sont souvent stables avec moins de 8 (BF3 en a 6). À partir de la période 3, on peut dépasser 8 (PCl5 en a 10, SF6 en a 12). NO et NO2 ont un nombre impair d’électrons, donc un atome ne peut pas avoir son octet.',
      },
    ],
    tables: [
      {
        heading: 'Électrons de valence par colonne',
        columns: ['Colonne', 'e⁻ de valence', 'Liaisons formées d’habitude', 'Exemples'],
        rows: [
          ['1 (H)', '1', '1', 'H'],
          ['14', '4', '4', 'C, Si'],
          ['15', '5', '3 (+1 doublet non liant)', 'N, P'],
          ['16', '6', '2 (+2 doublets non liants)', 'O, S'],
          ['17', '7', '1 (+3 doublets non liants)', 'F, Cl, Br, I'],
          ['18', '8', '0', 'Ne, Ar'],
        ],
      },
    ],
    commonMistakes: [
      'Dessiner les électrons sur des orbites, comme des planètes – les points disent combien il y en a, pas où ils sont.',
      'Oublier d’ajouter des électrons pour un ion négatif (ou d’en enlever pour un ion positif).',
      'Donner plus d’une liaison à l’hydrogène.',
      'Laisser l’atome central avec moins de 8 électrons alors qu’une liaison double réglerait le problème (CO2, HCN).',
    ],
  },

  'organic-nomenclature': {
    title: 'Nommer les composés organiques',
    summary:
      'Les noms IUPAC pas à pas : la chaîne la plus longue, les plus petits numéros, les substituants par ordre alphabétique, la terminaison du groupe caractéristique.',
    keyTakeaways: [
      'Cherche la chaîne carbonée continue la plus longue qui contient le groupe caractéristique prioritaire – elle peut tourner les angles du dessin.',
      'Numérote la chaîne à partir de l’extrémité qui donne le plus petit numéro au groupe caractéristique ; s’il n’y a pas de groupe caractéristique, donne le plus petit numéro au premier substituant.',
      'Nomme les substituants en préfixes, avec leur numéro : 2-méthyl, 3-chloro. Utilise di-, tri- pour les répétitions et classe par ordre alphabétique (les multiplicateurs ne comptent pas dans le classement : éthyl avant diméthyl).',
      'La racine donne la longueur de la chaîne ; la terminaison donne le groupe caractéristique principal : -ane, -ène, -yne, -ol, -al, -one, acide -oïque, -amine.',
      'Les chiffres sont séparés des mots par des traits d’union et les uns des autres par des virgules : 2,2-diméthylpropan-1-ol.',
    ],
    formulaExampleNames: ['Propan-2-ol', 'But-1-ène', '2-méthylpropane', 'Acide éthanoïque'],
    tables: [
      {
        heading: 'Les racines',
        columns: ['Carbones', 'Racine', 'Alcane'],
        rows: [
          ['1', 'méth-', 'méthane CH₄'],
          ['2', 'éth-', 'éthane C₂H₆'],
          ['3', 'prop-', 'propane C₃H₈'],
          ['4', 'but-', 'butane C₄H₁₀'],
          ['5', 'pent-', 'pentane C₅H₁₂'],
          ['6', 'hex-', 'hexane C₆H₁₄'],
          ['7', 'hept-', 'heptane C₇H₁₆'],
          ['8', 'oct-', 'octane C₈H₁₈'],
          ['9', 'non-', 'nonane C₉H₂₀'],
          ['10', 'déc-', 'décane C₁₀H₂₂'],
        ],
      },
      {
        heading: 'Priorité des terminaisons (la plus haute d’abord)',
        columns: ['Groupe', 'Terminaison', 'Exemple'],
        rows: [
          ['Acide carboxylique', 'acide …-oïque', 'acide propanoïque'],
          // French names an ester the other way round from English: the acid
          // part first, then "de" and the alkyl group.
          ['Ester', '…-oate de …-yle', 'éthanoate de méthyle'],
          ['Aldéhyde', '-al', 'éthanal'],
          ['Cétone', '-one', 'propan-2-one'],
          ['Alcool', '-ol', 'butan-2-ol'],
          ['Amine', '-amine', 'éthanamine'],
          ['Alcène / alcyne', '-ène / -yne', 'but-2-ène'],
          ['Halogénoalcane', 'préfixe : fluoro-, chloro-, bromo-, iodo-', '2-chloropropane'],
        ],
      },
    ],
    sections: [
      {
        heading: 'Exemple guidé',
        content:
          'Une chaîne de 5 carbones, avec un OH sur le carbone 2 et un méthyle sur le carbone 3. Racine : pent-. Terminaison : -ol avec le numéro 2 (en numérotant depuis l’extrémité la plus proche du OH). Substituant : 3-méthyl. Nom : 3-méthylpentan-2-ol.',
      },
    ],
    commonMistakes: [
      'Prendre la chaîne dessinée à l’horizontale au lieu de la chaîne la plus longue.',
      'Numéroter par la mauvaise extrémité – le groupe caractéristique passe avant les substituants.',
      'Classer par le multiplicateur : « diméthyl » se classe à m, pas à d.',
      'Oublier le numéro de position de -ène, -ol ou -one quand la chaîne a 4 carbones ou plus.',
    ],
  },

  'functional-groups': {
    title: 'Groupes caractéristiques',
    summary:
      'À quoi ressemble chaque groupe, comment il se nomme et quelles réactions il subit.',
    keyTakeaways: [
      'Un groupe caractéristique est l’atome ou le groupe d’atomes qui donne à une molécule ses réactions typiques. Deux molécules qui portent le même groupe réagissent de la même façon.',
      'Une famille (série homologue) réunit les molécules qui ont le même groupe caractéristique et une formule générale ; d’un membre au suivant, la différence est un CH2. Les propriétés physiques évoluent progressivement le long de la famille.',
      'Hydrocarbures : alcanes (uniquement C–C, saturés), alcènes (C=C), alcynes (C≡C). Seuls les alcènes et les alcynes donnent des réactions d’addition.',
      'Groupes oxygénés : alcool (–OH), aldéhyde (–CHO, sur le carbone de bout de chaîne), cétone (C=O à l’intérieur de la chaîne), acide carboxylique (–COOH), ester (–COO–).',
      'Groupes azotés et halogénés : amine (–NH2), amide (–CONH2), halogénoalcane (–F, –Cl, –Br, –I).',
    ],
    formulaExampleNames: [
      'Éthanol (alcool)',
      'Éthanal (aldéhyde)',
      'Propanone (cétone)',
      'Acide éthanoïque (acide carboxylique)',
      'Éthanoate d’éthyle (ester)',
      'Éthanamine (amine)',
    ],
    tables: [
      {
        heading: 'Tableau des groupes caractéristiques',
        columns: [
          'Groupe',
          'Structure',
          'Terminaison / préfixe',
          'Formule générale',
          'Réaction typique',
        ],
        rows: [
          [
            'Alcane',
            'C–C, C–H uniquement',
            '-ane',
            'CₙH₂ₙ₊₂',
            'Combustion ; substitution par les halogènes (UV)',
          ],
          ['Alcène', 'C=C', '-ène', 'CₙH₂ₙ', 'Addition (H₂, X₂, HX, H₂O)'],
          ['Halogénoalcane', 'C–X', 'halogéno-', 'CₙH₂ₙ₊₁X', 'Substitution par OH⁻ ou NH₃'],
          [
            'Alcool',
            'C–OH',
            '-ol',
            'CₙH₂ₙ₊₁OH',
            'Oxydation (primaire → aldéhyde → acide ; secondaire → cétone) ; estérification',
          ],
          ['Aldéhyde', '–CHO', '-al', 'CₙH₂ₙO', 'S’oxyde en acide carboxylique'],
          ['Cétone', 'C=O (interne)', '-one', 'CₙH₂ₙO', 'Résiste à l’oxydation'],
          [
            'Acide carboxylique',
            '–COOH',
            'acide -oïque',
            'CₙH₂ₙO₂',
            'Acide faible ; estérification avec un alcool',
          ],
          ['Ester', '–COO–', '…-oate de …-yle', '—', 'Hydrolyse en acide + alcool'],
          [
            'Amine',
            '–NH₂',
            '-amine',
            'CₙH₂ₙ₊₁NH₂',
            'Base faible ; forme des amides avec les acides',
          ],
          ['Amide', '–CONH₂', '-amide', '—', 'Hydrolyse'],
        ],
      },
    ],
    sections: [
      {
        heading: 'Le chemin de réaction à connaître',
        content:
          'Alcène → (H2O, catalyseur H+) → alcool. Alcène → (HX) → halogénoalcane → (OH−) → alcool → (Cr2O7 2−/H+) → aldéhyde → (oxydation supplémentaire) → acide carboxylique → (alcool, catalyseur H2SO4) → ester. Les alcools primaires s’oxydent deux fois, les alcools secondaires une fois en cétone, les alcools tertiaires ne s’oxydent pas.',
      },
      {
        heading: 'Repérer les groupes sur un spectre',
        content:
          'IR : une bande O–H large vers 3200–3550 cm⁻¹ signale un alcool (ou, très large et superposée aux C–H, un acide carboxylique) ; une bande C=O intense vers 1670–1750 cm⁻¹ signale un aldéhyde, une cétone, un acide, un ester ou un amide. Les intervalles exacts sont dans le livret de données du VCE – sers-t’en.',
      },
    ],
    commonMistakes: [
      'Appeler alcool une molécule qui porte un –OH sur un cycle benzénique (c’est un phénol) – hors programme VCE, mais c’est un piège classique.',
      'Confondre un aldéhyde (C=O en bout de chaîne) et une cétone (C=O au milieu).',
      'Prendre les esters pour des acides parce qu’ils contiennent –COO– – ils n’ont pas de H acide.',
    ],
  },
};
