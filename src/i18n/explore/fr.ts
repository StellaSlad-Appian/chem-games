// src/i18n/explore/fr.ts
//
// French prose for the Explore page. See src/i18n/explore.ts for how this
// overlays onto the English pool in src/lib/explore/, and for what an overlay
// is deliberately not allowed to carry.
//
// Terminology follows docs/i18n/glossary-fr.md. The decisions that recur here,
// because a term used twice with two words is the bug this file is written to
// avoid:
//
//   liaison double · doublet non liant / doublet liant · groupe caractéristique
//   · acide carboxylique · groupe amine · groupe hydroxyle · ion polyatomique ·
//   réseau · liaison hydrogène · chaîne carbonée · acide aminé · catalyseur ·
//   nombre d’oxydation · combustion · masse molaire is never needed, but
//   « à masse égale » is the phrase used for the English "weight for weight".
//
// Terms the glossary does not cover yet. Each is fixed here and used the same
// way in every entry that needs it; they are listed in the milestone report so
// they can be added to docs/i18n/glossary-fr.md:
//
//   quasicrystal            quasi-cristal (pl. quasi-cristaux)
//   diffraction pattern     figure de diffraction
//   liquid crystal          cristal liquide
//   isotactic               isotactique
//   monolayer               monocouche
//   peroxide bridge         pont peroxyde
//   chiral / mirror images  chiral · formes images l’une de l’autre dans un
//                           miroir (never « énantiomères » — that word is
//                           lycée-terminale register and the English avoids it)
//   R/S nomenclature        le système R et S · les règles de Cahn–Ingold–Prelog
//   catalytic hydrogenation hydrogénation catalytique
//   strand displacement     écarter le brin d’en face (described, not named:
//                           « déplacement de brin » is the technical term and
//                           is above this reading age)
//   complex ion             ion complexe, a family of ion polyatomique
//   oxidiser (rocket)       comburant — the school word, paired with combustible
//   heat of formation       enthalpie de formation
//   umami                   umami — kept. French has no everyday word for
//                           « savoury », which is why the English gloss
//                           « savoury rather than salty » becomes
//                           « umami plutôt que salé ». This is an adaptation.
//
// Register: informal "tu", school vocabulary, one idea per sentence, French
// typography (« … » with a narrow no-break space inside, U+202F before ; ! ?,
// U+00A0 before :, – for parenthetical dashes, ’ for apostrophes, decimal
// comma, œ in stœchiométrie).
//
// Chemical names follow the French rules, not the English word order: anion
// first, then de + cation (dioxyde de silicium, oxyde de cobalt et de lithium),
// and the simple substances take their di- forms (dichlore for Cl2, N2 stays
// N2 in the formula but is « l’azote » in prose).
//
// Not translated anywhere in this file: formulae (O3, N2, H2,
// CH4 + 2O2 -> CO2 + 2H2O), element symbols, state symbols, charges, and the
// names of people. Kevlar is a trade mark and is the same word in both
// languages, so molecules.kevlar.name is identical to the English by design —
// the same exemption chemistry-names.test.ts already grants « hydrazine » for
// fr. If the parity test forbids identical strings, that one needs an
// allowlist entry, not a mangled trade mark.
//
// The five species with a compoundId (ammonia, water, sodium-bicarbonate,
// sodium-sulfate, sodium-chloride) have no name here on purpose: theirs comes
// from chemistry-names/fr.ts.

import type { ExploreOverlay } from '../explore';

export const EXPLORE_OVERLAY_FR = {
  molecules: {
    benzene: {
      name: 'Benzène',
      everyday:
        'Le benzène est l’un des constituants les plus légers de l’essence, et on en fabrique des quantités énormes pour produire des plastiques, du nylon et des colorants. Tu n’en verras sans doute jamais un flacon. Son cycle, en revanche, tu le croises sans arrêt : cet hexagone de six carbones est au cœur du paracétamol, du polystyrène et de plusieurs acides aminés de ton propre corps. Le benzène provoque des leucémies, et c’est pour cela que sa teneur dans les carburants est plafonnée par la loi à un pour cent en volume au Royaume-Uni et dans l’Union européenne, et que les stations-service sont conçues pour rester ventilées.',
      chemistry:
        'Le cycle est fait de six carbones dans un hexagone plat, chacun portant un hydrogène. Ce qui le rend si particulier, c’est que six de ses électrons n’appartiennent à aucune liaison précise. Ils sont répartis sur tout le cycle, au-dessus et au-dessous de l’hexagone plat. Cette répartition explique pourquoi le benzène est bien moins réactif que trois liaisons doubles ne le laisseraient croire, et pourquoi les six liaisons entre carbones ont exactement la même longueur, au lieu d’alterner courte et longue.',
    },

    'citric-acid': {
      name: 'Acide citrique',
      everyday:
        'L’acide citrique est ce qui rend un citron si acidulé – il représente environ cinq pour cent du jus de citron en masse. C’est aussi la poudre acide qui enrobe les bonbons, le piquant d’un soda, le principe actif d’un détartrant à bouilloire, et un ingrédient de presque toutes les conserves, où il apporte du goût et empêche le contenu de s’abîmer. La plus grande partie de l’acide citrique vendu n’est pas pressée à partir de fruits. On le fabrique en nourrissant une moisissure avec du sucre, et elle en produit des tonnes.',
      chemistry:
        'La molécule porte trois groupes acide carboxylique, et chacun peut céder un ion hydrogène. Cela en fait un acide faible : dans l’eau, il ne cède ses hydrogènes que partiellement, et pas tous en même temps. C’est justement sa faiblesse qui le rend utile. Un acide fort à la même concentration attaquerait l’émail de tes dents, alors que l’acide citrique se contente de te faire faire la grimace. Il retient aussi très fermement les ions métalliques, et c’est ce qui décolle le calcaire d’une bouilloire.',
    },

    'silicon-dioxide': {
      name: 'Dioxyde de silicium',
      everyday:
        'Le dioxyde de silicium, c’est le sable, le quartz et la plus grande partie du verre qui t’entoure. Une vitre en contient environ 70 pour cent, avec des oxydes de sodium et de calcium ajoutés pour abaisser la température de fusion jusqu’à ce qu’un four puisse réellement l’atteindre. Le même composé remplit le petit sachet marqué ne pas avaler d’une boîte à chaussures, où il a été rendu poreux pour absorber l’eau à la place.',
      chemistry:
        'Dans le quartz, chaque atome de silicium est lié à quatre oxygènes et chaque oxygène fait le pont entre deux siliciums, selon un motif qui se répète sans fin. Dans le verre, les mêmes liaisons existent mais le motif, lui, a disparu : le réseau est figé en désordre, parce que le liquide a refroidi plus vite que les atomes ne pouvaient s’aligner. Cette différence, c’est toute la différence entre un cristal et un verre. Il faut aussi en finir avec une vieille histoire : le verre n’est pas un liquide qui coule lentement, et les vitres anciennes sont plus épaisses en bas à cause de la façon dont on les fabriquait, pas parce qu’elles auraient coulé.',
    },

    'monosodium-glutamate': {
      name: 'Glutamate monosodique',
      everyday:
        'Le glutamate monosodique est un cristal blanc ajouté aux soupes, aux chips, aux bouillons cubes et aux nouilles instantanées. Le même ion, sous forme de glutamate libre, donne leur goût umami au parmesan, aux tomates mûres, à la sauce soja et à l’algue kombu – et ton corps ne fait aucune différence entre les deux, puisqu’ils sont chimiquement identiques. Une portion normale d’un aliment contenant du glutamate ajouté en apporte moins d’un demi-gramme.',
      chemistry:
        'L’acide glutamique est un acide aminé : il porte donc un groupe amine à une extrémité et, fait plus rare, deux groupes acide carboxylique. Prends le sel de sodium de l’un de ces deux groupes acides et tu obtiens le glutamate monosodique – mono parce qu’il n’y a qu’un seul sodium, et pas deux. Dissous dans l’eau, il se sépare en un ion sodium et un ion glutamate, et c’est l’ion glutamate qui se loge dans le récepteur de ta langue. Le sodium n’est là qu’en passager, et c’est pourquoi le goût est umami plutôt que salé.',
    },

    'cfc-12': {
      name: 'Dichlorodifluorométhane',
      everyday:
        'Vendu sous le nom de Fréon-12, ce gaz se trouvait dans presque tous les réfrigérateurs et toutes les bombes aérosol, des années 1930 aux années 1990. On l’avait choisi parce qu’il est étonnamment peu réactif : il ne brûle pas, ne corrode rien, n’est pas toxique et ne fait absolument rien à ce qu’il touche. Voilà ce qui le rendait sûr dans une cuisine, et voilà aussi ce qui en a fait une catastrophe. Sa fabrication est interdite dans la plupart des pays depuis 1996, et la quantité encore présente dans l’air ne diminue que lentement.',
      chemistry:
        'Comme rien ne le détruit ici-bas, une molécule monte pendant des années jusqu’à atteindre la stratosphère. Là-haut, le rayonnement ultraviolet est enfin assez intense pour lui arracher un atome de chlore. Ce chlore attaque l’ozone, O3, et il est rendu à la fin de l’étape suivante – un seul atome de chlore peut donc tourner en boucle et détruire des milliers de molécules d’ozone. C’est ainsi qu’un gaz présent en quantité minuscule a réussi à amincir une couche grande comme un continent.',
    },

    ammonia: {
      everyday:
        'L’ammoniac est un gaz à l’odeur piquante qui se dissout très facilement dans l’eau ; le produit ménager qui pique le nez en est une solution diluée. La quasi-totalité de sa production – environ 180 millions de tonnes par an – finit en engrais, soit épandue directement, soit transformée d’abord en urée ou en nitrate d’ammonium. Il y en a aussi un peu dans ton sang, fabriqué quand ton corps dégrade les protéines.',
      chemistry:
        'L’azote occupe le centre, avec trois hydrogènes autour de lui et, en plus, un doublet non liant, ce qui pousse la molécule vers la forme d’une pyramide écrasée plutôt que d’un triangle plat. Ce doublet, c’est toute l’histoire. Il est libre de capter un ion hydrogène, et c’est ce qui fait de l’ammoniac une base ; c’est aussi ce qui lui permet de former d’aussi bonnes liaisons hydrogène avec l’eau. Dans l’industrie, on le fabrique à partir de N2 et de H2 – l’azote vient de l’air, l’hydrogène vient le plus souvent du gaz naturel, et c’est pourquoi sa production dégage aussi énormément de dioxyde de carbone.',
    },

    cholesterol: {
      name: 'Cholestérol',
      everyday:
        'Chacune de tes cellules est entourée d’une membrane dans laquelle se glisse du cholestérol, et ton propre foie fabrique l’essentiel de ce dont tu as besoin. C’est aussi la matière première à partir de laquelle ton corps construit la vitamine D, la bile et plusieurs hormones. Tu en rencontres dans les œufs, la viande et les produits laitiers, et il a une réputation qu’il ne mérite qu’à moitié : chez la plupart des gens, la quantité de cholestérol contenue dans les aliments compte bien moins, pour le taux dans le sang, que la quantité de graisses saturées.',
      chemistry:
        'La molécule est faite de quatre cycles soudés – le squelette stéroïde – avec une courte chaîne carbonée à une extrémité et un seul groupe hydroxyle à l’autre. Ce groupe hydroxyle est la seule partie de la molécule qui aime l’eau. Une molécule de cholestérol se place donc dans la membrane dans le bon sens : l’hydroxyle tourné vers l’extérieur, là où se trouve l’eau, les cycles et la chaîne enfouis parmi les chaînes grasses. Coincée ainsi, elle empêche la membrane de devenir trop molle à la chaleur ou trop rigide au froid.',
    },

    'oleic-acid': {
      name: 'Acide oléique',
      everyday:
        'L’acide oléique est le principal acide gras de l’huile d’olive – il en représente environ les trois quarts – et il constitue aussi l’essentiel de l’huile de colza, des amandes et des avocats. C’est lui qui fait que ces huiles restent liquides dans un placard. La même molécule forme une grande partie du sébum que ta peau produit.',
      chemistry:
        'La molécule est une chaîne de dix-huit carbones portant un groupe acide carboxylique à une extrémité et une seule liaison double au milieu. Cette liaison double est cis : les deux moitiés de la chaîne en partent du même côté, si bien que la chaîne garde un coude permanent. Des chaînes coudées ne peuvent pas s’empiler proprement les unes contre les autres, et elles restent donc liquides à des températures où des chaînes droites ont déjà figé – c’est toute la différence entre une huile et une graisse dure. Ajoute de l’hydrogène sur cette liaison double, avec du nickel comme catalyseur, et tu obtiens l’acide stéarique : dix-huit carbones, aucun coude, solide à température ambiante. Appliqué à de vraies matières grasses, c’est ainsi qu’une huile liquide devient de la margarine.',
    },

    methane: {
      name: 'Méthane',
      everyday:
        'Le méthane, c’est le gaz naturel. Il chauffe les maisons, fait cuire les aliments et produit environ un cinquième de l’électricité mondiale. Il s’échappe aussi des zones humides, des rizières et des décharges, et il sort des vaches. C’est un gaz à effet de serre bien plus puissant que le dioxyde de carbone – même s’il se décompose dans l’atmosphère en une dizaine d’années, ce que le dioxyde de carbone ne fait pas.',
      chemistry:
        'Un carbone, quatre hydrogènes, disposés en tétraèdre parce que quatre doublets d’électrons se repoussent aussi loin que possible les uns des autres. Sa combustion est la plus simple qui soit : CH4 + 2O2 -> CO2 + 2H2O. Compte les atomes de chaque côté et tu vois pourquoi il faut exactement deux molécules de dioxygène, et non une seule : les quatre hydrogènes donnent deux molécules d’eau, ce qui consomme deux atomes d’oxygène, et le carbone prend les deux autres. C’est par cette équation que commencent la plupart des exercices de stœchiométrie.',
    },

    water: {
      everyday:
        'L’eau recouvre la plus grande partie de la planète, représente environ 60 pour cent de toi, et c’est la seule substance courante que tu risques de rencontrer solide, liquide et gazeuse le même jour. C’est aussi la raison pour laquelle un étang gèle en commençant par le dessus : l’eau solide est moins dense que l’eau liquide, ce qui est assez rare pour être presque unique.',
      chemistry:
        'L’oxygène apporte six électrons externes et en partage deux, un avec chaque hydrogène. Il lui reste donc deux doublets non liants. Les quatre doublets se repoussent, et comme les doublets non liants prennent plus de place que les doublets liants, la molécule finit coudée à environ 104,5 degrés au lieu d’être droite. Une molécule coudée, avec un oxygène qui tire les électrons de son côté, a une extrémité négative et une extrémité positive : les molécules se collent donc les unes aux autres. Cette adhérence explique pourquoi l’eau est encore liquide à 80 °C, alors qu’une molécule aussi légère n’aurait aucune raison d’être autre chose qu’un gaz.',
    },

    kevlar: {
      // Trade mark, identical in both languages. See the note at the top.
      name: 'Kevlar',
      everyday:
        'Le Kevlar équipe les gilets pare-balles, les blousons de moto, les gants anticoupure, les plaquettes de frein, les ceintures de pneus et les coques des bateaux de course. Il se vend sous forme de fibre jaune, tressée en cordage et tissée en toile. Son nom exact, le poly(paraphénylène téréphtalamide), décrit ce à partir de quoi il est construit plutôt que quoi que ce soit qu’on prononce à voix haute.',
      chemistry:
        'La formule ci-dessus est le motif qui se répète : un cycle benzénique, une liaison amide, un autre cycle, un autre amide, et ainsi de suite des milliers de fois le long d’une même chaîne. Deux choses le rendent ensuite résistant. Les cycles maintiennent chaque chaîne raide et droite au lieu de molle, si bien qu’une fibre qu’on tire n’a plus rien à déplier. Et les groupes amide de chaînes voisines forment entre eux des liaisons hydrogène, en feuillets plats, ce qui empêche les chaînes de glisser les unes sur les autres. À masse égale, il bat l’acier en traction – l’acier gagne sur presque tout le reste, à commencer par le fait de survivre à un incendie.',
    },

    'lithium-cobalt-oxide': {
      name: 'Oxyde de cobalt et de lithium',
      everyday:
        'L’oxyde de cobalt et de lithium est l’électrode positive d’un très grand nombre de batteries de téléphones et d’ordinateurs portables. Tu ne le verras jamais : c’est une poudre noire, étalée sur une feuille d’aluminium et enroulée à l’intérieur de la cellule. Le cobalt qu’il contient est la raison pour laquelle les fabricants de batteries cherchent sans cesse à en mettre moins : environ les trois quarts du cobalt mondial sont extraits en République démocratique du Congo, et une partie vient de petites mines non contrôlées, avec de vrais problèmes de sécurité et de travail des enfants.',
      chemistry:
        'La structure est faite de couches : des feuillets de cobalt et d’oxygène, avec des ions lithium logés dans les espaces entre eux. La charge tire les ions lithium d’entre les couches et les pousse jusqu’à l’électrode de carbone, à l’autre bout ; l’utilisation de la batterie les laisse revenir. Le cobalt change de nombre d’oxydation à chaque fois, pour que la charge reste équilibrée. Rien n’est détruit et rien de nouveau n’est construit, et c’est pourquoi une cellule peut être rechargée des centaines de fois. Si l’on en retire trop, en revanche, les couches s’effondrent – d’où l’électronique présente dans toute batterie, dont le travail est justement de t’en empêcher.',
    },

    adenine: {
      name: 'Adénine',
      everyday:
        'L’adénine est le A des A, T, C et G de l’ADN – l’une des quatre bases dont l’ordre écrit un gène. Il y a environ trois milliards de ces lettres dans chacune de tes cellules, et à peu près un quart d’entre elles sont des adénines. Elle fait aussi partie de l’ATP, la molécule que tes cellules utilisent pour déplacer l’énergie : tu en reconstruis et tu en dépenses à chaque seconde de la journée.',
      chemistry:
        'La molécule est faite de deux cycles soudés, l’un à six atomes et l’autre à cinq, avec des atomes d’azote intégrés dans les deux. Les chimistes appellent cet assemblage une purine. Sur l’un des cycles pend un groupe amine. Dans l’ADN, ce groupe amine et l’un des azotes du cycle forment deux liaisons hydrogène avec une thymine du brin d’en face – exactement deux, et c’est pourquoi l’adénine s’apparie avec la thymine et non avec la cytosine, qui en réclame trois. L’appariement n’a rien de magique. Ce sont des liaisons hydrogène qui tombent juste, ou qui ne tombent pas juste.',
    },

    'sodium-bicarbonate': {
      everyday:
        'C’est le bicarbonate de soude. Il fait lever les gâteaux, met les bulles dans une bombe de bain et le soulagement dans un comprimé contre les brûlures d’estomac, et c’est lui qui remplit beaucoup d’extincteurs à poudre. Le même composé est dissous dans ton sang, où il a pour rôle d’empêcher l’acidité de dériver quand tu fais du sport.',
      chemistry:
        'C’est un composé ionique : il n’est donc pas vraiment fait de molécules, mais d’ions sodium et d’ions hydrogénocarbonate empilés en réseau. L’ion hydrogénocarbonate est la moitié intéressante – quatre atomes qui voyagent ensemble comme une seule unité portant une charge négative, et c’est exactement ce que veut dire polyatomique. Donne-lui un ion hydrogène venu d’un acide et il se défait en eau et en dioxyde de carbone, et le dioxyde de carbone, ce sont les bulles. Chauffe-le et il se passe à peu près la même chose, ce qui explique qu’il fonctionne dans un gâteau sans le moindre acide à proximité.',
    },

    urea: {
      name: 'Urée',
      everyday:
        'L’urée est la façon dont ton corps se débarrasse de l’azote qu’il ne peut pas utiliser : le foie la fabrique à partir de l’ammoniac et les reins l’évacuent dans l’urine. C’est aussi l’engrais le plus utilisé sur Terre – plus de la moitié de tout l’engrais azoté épandu dans les champs est de l’urée. Et on en trouve dans les crèmes pour le visage, où elle aide la peau à retenir l’eau.',
      chemistry:
        'La molécule est un seul carbone, avec un oxygène qui lui est lié par une liaison double et un groupe amine de chaque côté. Près de la moitié de sa masse est de l’azote, et c’est pourquoi il vaut la peine de la transporter d’un bout à l’autre du monde. Dans l’industrie, on la fabrique à partir d’ammoniac et de dioxyde de carbone : son azote vient donc de l’air, en passant par le procédé Haber. En 1828, Friedrich Wöhler a obtenu de l’urée en chauffant un sel minéral, ce qui a stupéfié les chimistes, car l’urée était censée être une chose que seul un être vivant pouvait produire. L’histoire bien nette selon laquelle cela aurait clos le débat du jour au lendemain est exagérée, mais le choc, lui, a bien eu lieu.',
    },

    limonene: {
      name: 'Limonène',
      everyday:
        'Presse une écorce d’orange près d’une bougie : les petites étincelles sont du limonène qui s’enflamme. C’est le constituant principal de l’huile essentielle d’écorce d’agrume, et on le presse par milliers de tonnes à partir des écorces qui restent après la fabrication du jus. De là, il part dans les produits ménagers, les décapants pour peinture et l’odeur de presque tout ce qui se vend comme « frais ».',
      chemistry:
        'Le limonène est chiral : l’un de ses carbones porte quatre groupes différents, si bien que la molécule existe sous deux formes images l’une de l’autre dans un miroir. Les chimistes les distinguent grâce au système R et S. Voici le point que la plupart des manuels ratent. Ils affirment qu’une forme sent l’orange et l’autre le citron. Des mesures soignées publiées en 2021 ont montré que l’huile d’orange et l’huile de citron contiennent toutes les deux la même forme – la forme R – à plus de 99,9 pour cent. Si le citron sent le citron, c’est surtout à cause d’une autre molécule, le citral, et non à cause de celle-ci.',
    },

    'sodium-sulfate': {
      everyday:
        'Le sulfate de sodium est produit par millions de tonnes, et l’essentiel part dans les lessives en poudre, où il constitue la masse dans laquelle tout le reste est mélangé. Cristallisé avec dix molécules d’eau intégrées à sa structure, il est connu sous le nom de sel de Glauber, et cette forme-là a servi à stocker de la chaleur : elle fond dans une pièce chaude et se solidifie à nouveau quand la pièce refroidit.',
      chemistry:
        'Ce qui est utile se produit vers 32 °C. La fusion absorbe de l’énergie sans que la température monte, et la solidification restitue cette même énergie : un fût de ce sel est donc un réservoir de chaleur qui fonctionne à température ambiante. Le problème, c’est qu’il ne fond pas proprement. Les cristaux se séparent en sulfate de sodium solide et en solution saturée, et le solide, plus dense, tombe au fond, où une part plus petite peut rejoindre l’eau au retour. Chaque cycle stocke un peu moins que le précédent. Soixante-dix ans plus tard, c’est toujours le problème à résoudre.',
    },

    polypropylene: {
      name: 'Polypropylène',
      everyday:
        'Le polypropylène est le deuxième plastique le plus produit au monde. Ce sont les bouchons de bouteilles, les pots de yaourt, les boîtes alimentaires que tu as le droit de passer au micro-ondes, les pare-chocs de voiture, les cordages, les fibres de moquette et le tissu non tissé d’un masque chirurgical. Quand tu vois un triangle de recyclage avec un 5 dedans, c’est de lui qu’il s’agit.',
      chemistry:
        'La formule ci-dessus est le motif qui se répète, et c’est la même que celle du propène, parce que rien n’est ajouté et rien n’est perdu quand les chaînes se forment : chaque molécule ouvre simplement sa liaison double et s’accroche à la suite. Ce qui décide si le plastique est bon ou non, c’est le sens dans lequel pointe chaque groupe méthyle. Avec un catalyseur ordinaire, les chaînes forment un enchevêtrement au hasard et le plastique est mou et fragile. Avec un catalyseur Ziegler–Natta, tous les méthyles pointent du même côté, les chaînes s’enroulent en hélices régulières, et celles-ci s’empilent en zones cristallines. Cette régularité, c’est toute la différence entre une pâte collante et un pare-chocs.',
    },

    artemisinin: {
      name: 'Artémisinine',
      everyday:
        'L’artémisinine vient de l’armoise annuelle, une plante utilisée en médecine chinoise depuis plus de deux mille ans. Elle est aujourd’hui à la base du traitement de référence du paludisme – toujours donnée avec un second médicament et jamais seule, pour que le parasite ait moins de chances de devenir résistant. L’essentiel de la production mondiale est encore extrait de plantes cultivées plutôt que fabriqué de toutes pièces.',
      chemistry:
        'La plus grande partie de la molécule est un assemblage de cycles sans rien de remarquable. Ce qui compte, c’est un pont de deux atomes d’oxygène directement liés l’un à l’autre : un pont peroxyde. Une liaison simple entre deux oxygènes est faible et inhabituelle, et la chimie évite le plus souvent d’en construire une. À l’intérieur d’un parasite du paludisme, gorgé du fer de l’hémoglobine qu’il vient de digérer, ce pont se rompt et donne des fragments qui détruisent le parasite de l’intérieur. Retire le pont de la molécule et le médicament cesse d’agir : c’est ainsi que les chimistes savent que c’est là que tout se joue.',
    },

    'sodium-chloride': {
      everyday:
        'Le sel de table. On l’extrait de la roche, on le récupère en faisant évaporer l’eau de mer, on le répand sur les routes verglacées, et l’industrie chimique s’en sert comme point de départ pour le dichlore, l’hydroxyde de sodium et l’acide chlorhydrique. Ton corps en a réellement besoin d’un peu, et la plupart des gens en mangent nettement plus qu’un peu.',
      chemistry:
        'Il n’y a aucune molécule de chlorure de sodium dans un grain de sel. Le cristal, ce sont des ions sodium et des ions chlorure qui alternent dans toutes les directions, chaque sodium entouré de six chlorures et chaque chlorure de six sodiums, à l’identique sur des milliards d’ions d’affilée. La formule est un rapport, un pour un, et non un décompte d’atomes dans une molécule. Ce motif qui se répète sans fin est ce qui en fait un cristal, et c’est pourquoi un grain se brise en petits cubes : tu le sépares le long de plans sur lesquels les ions étaient déjà alignés.',
    },
  },

  scientists: {
    'kathleen-lonsdale': {
      work: 'Les chimistes dessinaient le benzène comme un cycle de six carbones depuis les années 1860, mais personne n’en avait jamais mesuré un. Kathleen Lonsdale l’a fait, en 1929. Le benzène est un liquide, elle ne pouvait donc pas se servir du benzène lui-même ; elle a choisi l’hexaméthylbenzène, un solide bâti autour du même cycle. Les rayons X qui rebondissent sur les couches d’atomes d’un cristal donnent une figure de diffraction, et cette figure dit où sont les atomes. Sa réponse : les six carbones sont dans un même plan, aux sommets d’un hexagone régulier. Deux ans plus tard, elle a mesuré l’hexachlorobenzène et trouvé que toutes les liaisons entre carbones du cycle avaient la même longueur – environ 1,42 ångström, entre une liaison simple et une liaison double.',
      legacy:
        'Voilà pourquoi ton manuel dessine un cercle à l’intérieur de l’hexagone du benzène au lieu de trois liaisons doubles : les liaisons sont vraiment toutes pareilles. Cela a aussi montré que la cristallographie aux rayons X pouvait répondre à des questions sur les molécules, et pas seulement sur les sels. En 1945, Lonsdale et la microbiologiste Marjory Stephenson sont devenues les deux premières femmes élues à la Royal Society.',
    },

    'soren-sorensen': {
      work: 'Les acides diffèrent énormément par leur force, et en 1909 il n’existait aucune façon simple de dire de combien. Søren Sørensen étudiait les protéines au laboratoire Carlsberg, à Copenhague, où de petites variations d’acidité ruinaient sans arrêt ses expériences. Le nombre dont il avait besoin était la concentration en ions hydrogène, et d’une solution ordinaire à l’autre elle varie dans un rapport de plus de cent millions de millions. Il en a donc pris le logarithme, puis il a changé le signe. Une solution contenant 0,0000001 mole d’ions hydrogène par litre est devenue, tout simplement, 7. Chaque graduation vers le bas signifie dix fois plus d’ions hydrogène, et non un de plus.',
      legacy:
        'C’est l’échelle de pH, et elle figure depuis sur toutes les bandelettes de piscine, tous les kits d’analyse de sol et tous les bilans sanguins. Sørensen n’a jamais expliqué ce que voulait dire le p. Les chimistes en discutent encore : puissance, potentiel, ou simplement la lettre qu’il employait pour l’une de ses solutions d’essai. Que personne ne te dise que la question est tranchée.',
    },

    'katharine-blodgett': {
      work: 'Katharine Blodgett a trouvé comment construire un revêtement une molécule à la fois. Son collègue Irving Langmuir avait montré qu’une monocouche de molécules grasses s’étale à la surface de l’eau. Blodgett a découvert qu’en plongeant une plaque à travers cette couche puis en la ressortant, la couche vient avec elle – et qu’on peut recommencer, encore et encore. En 1938, chez General Electric, elle a empilé 44 couches de stéarate de baryum sur du verre, et le verre a cessé de réfléchir. La lumière qui rebondit sur le dessus du revêtement et celle qui rebondit sur le verre en dessous ressortent décalées l’une par rapport à l’autre, et elles s’annulent.',
      legacy:
        'General Electric a parlé de « verre invisible », ce qui relevait de la publicité : le verre est aussi visible qu’avant, ce sont les reflets qui ne le sont plus. Ses films étaient trop fragiles pour être vendus – on pouvait les essuyer d’un coup de chiffon – et les verres antireflets modernes utilisent plutôt des couches dures déposées par évaporation. Mais les couches de Langmuir–Blodgett restent la façon dont les laboratoires fabriquent un film sur mesure, une molécule à la fois.',
    },

    'kikunae-ikeda': {
      work: 'Kikunae Ikeda trouvait que le bouillon préparé avec de l’algue kombu avait le goût de quelque chose qui n’était ni sucré, ni acide, ni salé, ni amer. En 1908, à l’université impériale de Tokyo, il a fait réduire environ douze kilogrammes de varech séché et en a tiré une trentaine de grammes de cristaux. C’était de l’acide glutamique – un acide aminé déjà connu et déjà présent dans le blé. Ce qui était nouveau, c’était le lien : Ikeda a montré que c’est l’ion glutamate qui porte cette cinquième saveur. Il l’a appelée umami et il a breveté un moyen de transformer le glutamate en condiment.',
      legacy:
        'Le glutamate monosodique a été mis en vente l’année suivante et il est aujourd’hui dans les cuisines du monde entier. Le reste du monde a mis bien plus longtemps à lui donner raison. L’umami n’a été largement reconnu comme saveur de base que vers 2000, une fois découverts les récepteurs de la langue qui répondent au glutamate. Ikeda avait eu raison pendant quatre-vingt-dix ans.',
    },

    'susan-solomon': {
      work: 'En 1985, des scientifiques britanniques ont rapporté que la couche d’ozone au-dessus de l’Antarctique s’amincissait fortement à chaque printemps austral. Le chlore des CFC était le suspect évident, mais les réactions que les chimistes connaissaient, entre gaz, étaient bien trop lentes pour faire autant de dégâts aussi vite. La réponse de Susan Solomon, publiée en 1986, fut que les réactions importantes n’avaient pas lieu entre gaz du tout. Pendant l’hiver antarctique, la stratosphère devient assez froide pour former des nuages de glace et d’acide nitrique. À la surface de ces particules, du chlore qui était piégé sans danger se transforme en espèces que le soleil du printemps revenu déchire. Elle a ensuite mené des expéditions à la base de McMurdo en 1986 et en 1987, et mesuré les composés chlorés que son explication prévoyait.',
      legacy:
        'Voilà pourquoi les dégâts sont antarctiques, saisonniers et si brutaux – et la réponse est arrivée pendant que les gouvernements décidaient quoi faire des CFC. Le protocole de Montréal a été adopté en 1987.',
    },

    'fritz-haber': {
      work: 'Les plantes ont besoin d’azote, et l’air en contient 78 pour cent – mais sous forme de N2, tenu par une liaison triple que presque rien ne casse. En 1909, Fritz Haber l’a cassée. Avec Robert Le Rossignol, à Karlsruhe, il a forcé l’azote et l’hydrogène à se rencontrer sur un catalyseur, sous environ 200 atmosphères et à 500 °C, et de l’ammoniac en est sorti. Une démonstration de paillasse n’est pourtant pas une usine. Carl Bosch, chez BASF, a passé les quatre années suivantes à trouver un catalyseur au fer bon marché et à construire des réacteurs en acier capables de supporter la pression, et la première usine a ouvert en 1913.',
      legacy:
        'Presque tout l’engrais du monde part de cette réaction ; les chercheurs estiment que l’azote qu’elle fournit nourrit environ la moitié des personnes vivantes. Haber a aussi dirigé le programme d’armes chimiques allemand et supervisé en personne la première attaque massive au chlore, à Ypres, en avril 1915. Les deux, c’est le même homme. Il a été chassé d’Allemagne en 1933 parce qu’il était juif, et il est mort l’année suivante.',
    },

    'marie-maynard-daly': {
      work: 'Marie Maynard Daly a travaillé sur deux problèmes très différents. À l’Institut Rockefeller, à partir de 1948, avec Alfred Mirsky, elle a étudié la chimie du noyau de la cellule – les protéines histones autour desquelles l’ADN s’enroule, et ce dont sont faits les acides nucléiques. À partir de 1955, avec le médecin Quentin Deming, elle s’est tournée vers les artères. Leurs expériences, menées surtout sur des rats hypertendus, ont été parmi les premières à relier trois choses qu’on avait étudiées séparément : la pression sanguine élevée, le cholestérol et le rétrécissement des artères.',
      legacy:
        'Ce lien est aujourd’hui l’image ordinaire des maladies du cœur. Il a été construit par de nombreuses équipes sur plusieurs dizaines d’années, et Daly et Deming en ont fourni quelques-unes des premières preuves expérimentales. Elle a enseigné la biochimie pendant vingt-cinq ans à l’Albert Einstein College of Medicine et elle a financé une bourse pour les étudiants noirs qui se lançaient dans les sciences.',
      credit:
        'En 1947, elle est devenue la première femme noire des États-Unis à obtenir un doctorat de chimie, à Columbia, dans un département qui comptait exactement une femme professeure.',
    },

    'paul-sabatier': {
      work: 'Une liaison double entre deux carbones ne fixe pas l’hydrogène toute seule, quelle que soit la quantité d’hydrogène qu’on lui propose. En 1897, à Toulouse, Paul Sabatier et Jean-Baptiste Senderens ont découvert que du nickel finement divisé change tout. Le métal retient à sa surface l’hydrogène et la liaison double, les tient l’un à côté de l’autre et les laisse s’unir. À la fin, le nickel est inchangé : c’est un catalyseur, et un catalyseur bon marché. La méthode de Sabatier fonctionnait sur des vapeurs. Quatre ans plus tard, Wilhelm Normann, en Allemagne, a adapté la même chimie aux huiles liquides – et c’est cette étape qui transforme une huile végétale fluide en graisse solide.',
      legacy:
        'L’hydrogénation catalytique est aujourd’hui l’une des réactions les plus utilisées dans l’industrie, de la margarine aux médicaments. Sabatier a partagé le prix Nobel de 1912 avec Victor Grignard, pour des travaux distincts et non pour une collaboration.',
      credit:
        'Senderens, qui avait mené avec lui les expériences de 1897, a été laissé de côté dans ce prix – une omission que les chimistes rappellent encore en son nom.',
    },

    'reatha-clark-king': {
      work: 'Pour juger si un carburant de fusée vaut la peine d’être utilisé, il faut un nombre : exactement combien d’énergie sort quand il brûle. Reatha Clark King a mesuré ces nombres pour des composés du fluor au National Bureau of Standards, dans les années 1960. Le fluor est l’élément le plus réactif qui soit, et le difluorure d’oxygène attaque à peu près tout ce dans quoi on essaie de le brûler. King a conçu un brûleur en nickel muni d’un tube enroulé, qui permettait de refroidir et de maîtriser la flamme au lieu de laisser l’appareil se faire détruire, et elle a obtenu pour le difluorure d’oxygène une enthalpie de formation assez précise pour être publiée. Cela lui a valu le prix du meilleur article de l’année du bureau.',
      legacy:
        'Ces nombres ont servi à évaluer les composés du fluor comme comburants pour fusées. Ils n’ont jamais volé : ils sont trop toxiques et trop corrosifs pour être manipulés à cette échelle – et le découvrir, c’est exactement à cela que servent les mesures. King est ensuite devenue présidente d’université, puis elle a dirigé la fondation General Mills.',
    },

    'gilbert-lewis': {
      work: 'Avant 1916, une liaison chimique était un trait tracé sur le papier, sans rien derrière pour l’expliquer. Gilbert Lewis en a donné une : une liaison, c’est un doublet d’électrons que deux atomes partagent. Les atomes tendent à se retrouver avec huit électrons sur leur couche externe, et le partage est un moyen d’y arriver. Il dessinait ces électrons sous forme de points, et c’est pourquoi un schéma de points autour d’un symbole chimique s’appelle une structure de Lewis. En 1923, il a ajouté une seconde idée : un acide est tout ce qui accepte un doublet d’électrons et une base tout ce qui en donne un, une définition qui couvre des réactions où il n’y a pas le moindre hydrogène.',
      legacy:
        'Irving Langmuir a développé et fait connaître la même image, a donné à la chimie le mot covalent, et pendant des années on a parlé de la théorie de Lewis–Langmuir. Lewis a été proposé des dizaines de fois pour un prix Nobel et n’en a jamais reçu. Chaque schéma de points que tu traces est le sien.',
    },

    'stephanie-kwolek': {
      work: 'En 1965, chez DuPont, Stephanie Kwolek a dissous un polymère rigide, en forme de bâtonnet, et a obtenu une solution qui avait l’air ratée. Les solutions de polymères sont épaisses, sirupeuses et transparentes ; la sienne était fluide et trouble. Trouble voulait d’habitude dire qu’il restait des morceaux non dissous qui boucheraient la filière, et la réaction normale était de tout jeter. Kwolek a filtré sa solution pour montrer qu’elle était propre, et elle a convaincu le technicien de la filer quand même. Ce trouble était justement le point essentiel : les chaînes rigides s’alignaient côte à côte dans le liquide, comme le fait un cristal liquide. Filées en fibre, elles sont restées alignées.',
      legacy:
        'Cet alignement explique pourquoi la fibre – vendue depuis 1971 sous le nom de Kevlar – résiste si bien à la traction : à masse égale, elle fait mieux que l’acier. Les gilets pare-balles, les gants anticoupure, les plaquettes de frein et les coques de bateaux en dépendent. Transformer la découverte en produit a demandé toute une équipe chez DuPont, et en particulier Herbert Blades, qui a trouvé comment la filer à grande échelle.',
    },

    'akira-yoshino': {
      work: 'Les premières batteries rechargeables au lithium utilisaient du lithium métallique, et le lithium métallique fait pousser des pointes à chaque recharge. Tôt ou tard, une pointe atteint l’autre électrode et la batterie prend feu. En 1985, Akira Yoshino, chez Asahi Kasei, a construit une cellule qui ne contenait pas du tout de lithium métallique. Il a associé l’oxyde de cobalt et de lithium de John Goodenough, à l’électrode positive, à un matériau carboné – du coke de pétrole – à l’électrode négative. Les ions lithium se glissent dans les deux électrodes et en ressortent, au lieu de se déposer sous forme de métal. La charge les pousse dans un sens ; l’utilisation de la batterie les laisse revenir.',
      legacy:
        'C’est la batterie lithium-ion de ton téléphone, et Sony a mis la première en vente en 1991. Yoshino a partagé le prix Nobel 2019 avec Goodenough et Stanley Whittingham : trois personnes, trois étapes, une seule batterie.',
    },

    'margarita-salas': {
      work: 'Phi29 est un virus qui infecte les bactéries, et Margarita Salas a passé trente ans à comprendre comment il copie son ADN. En 1984, son équipe de Madrid, avec Luis Blanco, a isolé son ADN polymérase – l’enzyme qui fait la copie – et l’a trouvée inhabituelle sur trois points à la fois. Elle reste accrochée à la matrice et copie des dizaines de milliers de bases sans lâcher prise. Elle écarte le brin d’en face sur son passage, si bien qu’aucune autre enzyme n’est nécessaire pour ouvrir l’hélice. Et elle relit ce qu’elle vient d’écrire, ce qui lui fait commettre très peu d’erreurs.',
      legacy:
        'Mets ces trois qualités ensemble et un échantillon d’ADN minuscule peut être copié jusqu’à une quantité utile, à température constante, sans les cycles de chauffage et de refroidissement qu’exige la PCR. On s’en sert sur des traces médico-légales, sur des cellules isolées et sur de l’ADN retrouvé par des archéologues. Ce brevet est devenu le plus rentable qu’ait jamais détenu le conseil national de la recherche espagnol.',
    },

    'alfred-werner': {
      work: 'Certains composés refusaient d’entrer dans les règles. Le chlorure de cobalt portant six molécules d’ammoniac se comportait comme si ses trois chlorures étaient libres ; avec cinq ammoniacs, deux seulement l’étaient. En 1893, Alfred Werner, alors âgé de 26 ans, a affirmé que la raison tient à deux choses distinctes qu’un ion métallique fait en même temps : il a une charge à compenser, et il a un nombre fixe de places autour de lui où des molécules ou des ions peuvent s’accrocher. Pour le cobalt, ce nombre est six, aux sommets d’un octaèdre. Il ne pouvait rien voir de tout cela. Il l’a prouvé en comptant : un octaèdre prévoit exactement deux formes pour un composé portant quatre groupes d’une sorte et deux d’une autre, et c’est toujours deux qu’il trouvait.',
      legacy:
        'Werner a reçu le prix Nobel de 1913, premier chimiste suisse et premier chimiste inorganicien à l’obtenir. Les ions complexes comme les siens forment une famille d’ions polyatomiques : un métal au centre, avec des molécules accrochées autour. La plupart des ions polyatomiques que tu apprends, comme le sulfate et le nitrate, ne sont pas du tout des complexes.',
    },

    'johanna-dobereiner': {
      work: 'Les légumineuses – haricots, pois, soja – n’ont pas besoin qu’on leur apporte de l’azote. Elles hébergent des bactéries dans des nodosités sur leurs racines, et ces bactéries tirent le N2 directement de l’air pour en faire de l’ammoniac utilisable par la plante. Johanna Döbereiner, qui travaillait au Brésil depuis 1950, s’est demandé si cela pouvait suffire à une grande culture en sol tropical ; l’agriculture brésilienne copiait alors le modèle américain et déversait de l’engrais azoté. Elle a cherché des souches de Bradyrhizobium adaptées aux sols brésiliens et aux variétés de soja brésiliennes, les a testées au champ, et a poussé les résultats jusqu’à un programme national de traitement des semences. Son groupe et elle ont aussi décrit plusieurs espèces fixatrices d’azote nouvelles.',
      legacy:
        'Le soja brésilien tire aujourd’hui la quasi-totalité de son azote des bactéries plutôt que d’un sac. Une estimation de 2021 chiffre l’économie à plus de quatorze milliards de dollars américains par récolte. Il faut toujours du phosphore et du potassium, donc ce n’est pas une agriculture sans engrais : c’est une agriculture sans engrais azoté, et c’est la moitié la plus difficile.',
    },

    'vladimir-prelog': {
      work: 'Certaines molécules existent sous deux formes images l’une de l’autre dans un miroir, comme tes deux mains, et aucune rotation ne transformera l’une en l’autre. Les chimistes le voyaient bien ; ce qu’ils n’avaient aucun moyen convenu de faire, c’était de dire laquelle est laquelle. Vladimir Prelog s’est associé à Robert Cahn et Christopher Ingold, et en 1956 les trois ont publié des règles qui tranchent la question. Tu regardes les quatre groupes attachés au carbone et tu les classes, l’atome le plus lourd d’abord. Puis tu tournes la molécule pour que le groupe classé dernier pointe à l’opposé de toi, et tu lis les trois autres : dans le sens des aiguilles d’une montre, c’est R ; dans l’autre sens, c’est S.',
      legacy:
        'Ce sont les règles de Cahn–Ingold–Prelog, et c’est grâce à elles qu’un R ou un S dans un nom chimique veut dire la même chose dans tous les laboratoires et dans toutes les langues. Cela compte, parce que deux formes images l’une de l’autre d’un médicament peuvent se comporter de façon complètement différente dans un corps. Prelog est né à Sarajevo, a grandi à Zagreb, s’est réfugié à Zurich en 1941 et a partagé le prix Nobel de 1975 avec John Cornforth.',
    },

    'maria-telkes': {
      work: 'Le soleil arrive dans la journée et c’est la nuit qu’on veut la chaleur : une maison solaire a donc besoin d’un endroit où la garder. Mária Telkes a choisi une réponse chimique plutôt qu’un réservoir d’eau chaude. Le sel de Glauber – des cristaux de sulfate de sodium avec de l’eau intégrée – fond vers 32 °C. Faire fondre un solide absorbe de l’énergie sans élever sa température, et cette énergie ressort quand il se solidifie à nouveau. Une masse donnée de ce sel stocke donc bien plus de chaleur que la même masse d’eau chauffée. En 1948, elle a construit la Dover Sun House, dans le Massachusetts, avec l’architecte Eleanor Raymond : des fûts de sel étaient logés dans ses murs.',
      legacy:
        'Une famille y a vécu, chauffée par le seul soleil, pendant deux hivers et une partie d’un troisième. Puis cela a échoué. Le sel ne fond pas proprement, donc du solide se dépose et un peu moins se recombine à chaque cycle, et la solution salée a rongé les fûts d’acier. C’est de la chimie, pas une mauvaise construction – et c’est encore aujourd’hui le principal obstacle au stockage de chaleur par les sels.',
    },

    'giulio-natta': {
      work: 'Les molécules de propène s’unissent en longues chaînes, mais si elles s’unissent orientées n’importe comment, la chaîne est un enchevêtrement avec des groupes méthyle qui dépassent des deux côtés, et le plastique est mou et fragile. Le 11 mars 1954, Giulio Natta, au Politecnico di Milano, a fabriqué une chaîne dans laquelle tous les groupes méthyle pointent du même côté. Il a employé un catalyseur du type de ceux qu’avait mis au point Karl Ziegler, qui maintient chaque molécule qui arrive dans une orientation fixe jusqu’à ce qu’elle se soit accrochée. Natta a appelé isotactique cet arrangement régulier. Des chaînes régulières peuvent s’empiler serré les unes contre les autres et s’ordonner en cristaux ; des chaînes emmêlées, non.',
      legacy:
        'Voilà pourquoi le polypropylène est rigide, solide et assez léger pour être partout : bouchons de bouteilles, pare-chocs, cordages, boîtes alimentaires, sous-vêtements thermiques. Natta et Ziegler ont partagé le prix Nobel de 1963.',
      credit:
        'Ziegler n’a pas apprécié de le partager. Natta était arrivé à la réaction grâce à la chimie des catalyseurs de Ziegler, et les deux camps ont passé plus de vingt ans en procès sur les brevets, le plus souvent à l’avantage de Ziegler.',
    },

    'tu-youyou': {
      work: 'Les parasites du paludisme étaient devenus résistants aux médicaments habituels, et en 1969 Tu Youyou s’est vu confier le groupe de son institut au sein du Projet 523, une recherche chinoise secrète d’un nouveau traitement. Son équipe a testé des centaines d’extraits de plantes utilisées en médecine traditionnelle. L’armoise annuelle marchait parfois, et parfois non. En lisant un manuel de prescriptions d’urgence du IVe siècle, elle a remarqué qu’il disait de faire tremper la plante dans l’eau froide et d’en exprimer le jus, et non de la faire bouillir. Si la chaleur détruisait le composé actif, c’était l’extraction qui posait problème. Elle est passée à l’éther, qui bout à 35 °C, et en octobre 1971 elle a obtenu un extrait qui tuait les parasites à tous les coups.',
      legacy:
        'Le composé pur, l’artémisinine, est arrivé en 1972. L’artémisinine associée à un second médicament est aujourd’hui le traitement que recommande l’Organisation mondiale de la santé, et il a sauvé des millions de vies. Le Projet 523 a mobilisé des centaines de scientifiques à travers la Chine, et la façon dont le mérite devrait être partagé y est encore discutée.',
      credit:
        'Tu a reçu un prix Nobel en 2015 sans doctorat, sans formation à l’étranger et sans appartenir aux académies chinoises – chez elle, on l’appelle la scientifique aux trois non.',
    },

    'dan-shechtman': {
      work: 'Les cristaux se répètent. Ce n’était pas une supposition, c’était la définition : les atomes occupent un motif qui se recopie indéfiniment dans toutes les directions, et un tel motif ne peut pas avoir de symétrie d’ordre cinq ou dix – on ne peut pas carreler un sol avec des pentagones sans laisser de trous. Le 8 avril 1982, détaché du Technion de Haïfa dans un laboratoire public américain, Dan Shechtman a envoyé des électrons à travers un alliage aluminium–manganèse refroidi très vite, et il a obtenu une figure de diffraction de symétrie d’ordre dix. Son cahier porte, pour cet échantillon, la mention « 10 fold ??? ». Les atomes étaient parfaitement ordonnés – on pouvait dire où devait se placer le suivant – mais l’arrangement ne se répétait jamais.',
      legacy:
        'Il a fallu des années pour que cela soit accepté. Linus Pauling a soutenu par écrit que l’échantillon n’était que des cristaux maclés, et il n’a jamais changé d’avis. Les preuves se sont accumulées malgré tout, et en 1992 l’Union internationale de cristallographie a réécrit sa définition du cristal pour faire place aux motifs qui ne se répètent jamais. Shechtman a reçu le prix Nobel de chimie 2011. On a depuis trouvé des quasi-cristaux dans la nature, dans une météorite.',
    },
  },
} satisfies ExploreOverlay;
