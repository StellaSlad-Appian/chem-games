// src/i18n/game-messages/reaction-balancer/fr.ts
//
// La balance des atomes, en français. Terminologie fixée dans
// docs/i18n/glossary-fr.md : coefficient (et non « nombre stœchiométrique »),
// indice (et non « petit chiffre »), réactifs / produits, équilibrer (et non
// « ajuster »), bilan des atomes, astuce (et non « indice », qui est déjà pris
// par l’indice d’une formule — c’est précisément la distinction que ce jeu
// enseigne).
//
// Deux contraintes propres au français, expliquées dans le glossaire :
//
//   * Aucun article ne peut précéder un porte-nom ({name}, {element}), parce
//     que l’article dépend du genre et de la première lettre du nom
//     (l’oxygène mais le carbone, l’eau mais le méthane). D’où les tournures
//     « nom + deux-points » et « l’élément {element} », employées partout.
//   * Typographie : espace fine insécable (U+202F) avant ; ! ? et à
//     l’intérieur des guillemets, espace insécable (U+00A0) avant :.
//
// `satisfies ReactionBalancerMessages` type ce fichier contre l’original
// anglais dans src/core-engine/config/games/reaction-balancer-messages.ts : une
// clé manquante est une erreur de compilation, pas un retour silencieux à
// l’anglais. Ne jamais ajouter `?` ni `Partial<>` pour que ça compile.

import type { ReactionBalancerMessages } from '@/core-engine/config/games/reaction-balancer-messages';

export const fr = {
  header: {
    subtitle: 'La balance des atomes',
    balance: 'À équilibrer : {name}',
    build: 'À construire puis équilibrer : {name}',
    progress: 'Réaction {round}/{total}',
    challengeProgress: 'Défi {round}/{total}',
  },

  instructions: {
    title: 'Comment jouer : La balance des atomes',
    lead: 'Fais correspondre les atomes.',
    intro:
      'Dans une réaction chimique, les atomes sont réorganisés, jamais créés ni perdus – des deux côtés de la flèche, il doit donc y avoir le même nombre de chaque atome.',
    bullets: [
      'Les **grands chiffres** devant une formule sont les coefficients. Ce sont eux que tu changes.',
      'Les **petits chiffres** dans une formule sont les indices. Ils sont verrouillés : les changer donnerait une autre substance.',
      'Le **bilan des atomes** sous la flèche compte chaque élément à gauche et à droite. Quand toutes les lignes sont égales, l’équation se verrouille.',
      'Tu bloques ? Appuie sur l’**ampoule** (ou sur H). La première astuce est toujours gratuite.',
    ],
    arrow: 'La flèche veut dire « donne » ou « devient », pas « égale ».',
    keyboard: [
      ['Tab', 'passe d’un composé à l’autre'],
      ['↑ / ↓', 'changent un coefficient'],
      ['0–9', 'tapent un nombre directement'],
      ['H', 'astuce'],
      ['P', 'met le jeu en pause'],
    ],
    touch: [
      ['Appuie', 'sur ▲ / ▼ d’une carte pour changer le coefficient.'],
      ['Appuie', 'sur le nombre pour le taper.'],
    ],
    glossaryTitle: 'Les mots du jeu',
  },

  guided: {
    stepLabel: 'Étape {step} sur {total}',
    steps: [
      'Regarde le bilan. Hydrogène : 2 à gauche, 2 à droite – équilibré. Oxygène : 2 à gauche, 1 à droite. C’est l’oxygène qu’il faut corriger.',
      'On ne peut pas changer le petit 2 de `O2` : ce serait une autre substance. Ajoute plutôt de l’eau. Appuie sur ▲ au-dessus de `H2O`.',
      'L’oxygène est maintenant à 2 et 2. Mais regarde : l’hydrogène a bougé, 2 à gauche et 4 à droite. Équilibrer un élément peut en déséquilibrer un autre. Appuie sur ▲ au-dessus de `H2`.',
      'Toutes les lignes correspondent : 4 H et 2 O de chaque côté. L’équation est équilibrée – `2H2 + O2 -> 2H2O`. Tu viens de vérifier la conservation de la masse.',
    ],
  },

  coach: {
    label: 'Coach',
    // No article before {elementInSentence}: French would need "de l'oxygène"
    // but "du carbone". "l'élément" carries the article instead, and it works
    // for every element because every French element name is masculine.
    imbalance:
      '{element} : {left} à gauche, {right} à droite. Quel composé contenant l’élément {elementInSentence} pourrais-tu modifier ?',
    multiple:
      'C’est bon pour l’élément {fixed}, mais l’élément {broken} a bougé. Équilibrer un élément peut en déséquilibrer un autre. À vérifier maintenant : {broken}.',
    balanced: 'Toutes les lignes correspondent. La masse est conservée.',
    balancedNotLowest:
      'Équilibrée – et tous les coefficients sont divisibles par {k}. La forme la plus simple : `{equation}`.',
  },

  hint: {
    label: 'Astuce',
    tierLabel: 'Astuce {tier} sur 3',
    tier1:
      'Commence par l’élément qui apparaît dans le moins de composés. Ici, c’est l’élément {element}.',
    tier3: 'Mets un {n} devant `{formula}`. Puis revérifie l’élément {element}.',
    tier3Lower: 'Remets `{formula}` à {n}. Puis revérifie l’élément {element}.',
    tier3Balanced: 'Toutes les lignes correspondent déjà – l’équation est équilibrée.',
    tier1Build:
      'Relis la description. Elle nomme chaque substance de départ et chaque substance formée.',
    tier2Build:
      'Les substances placées avant « réagit », « brûle » ou « se décompose » sont des réactifs. Celles placées après « pour former », « produit » ou « donne » sont des produits.',
    tier3BuildReactant: 'Ajoute cette substance du côté des réactifs : {name} (`{formula}`).',
    tier3BuildProduct: 'Ajoute cette substance du côté des produits : {name} (`{formula}`).',
  },
  stuck: {
    offer: 'Il te faut une astuce plus précise ? Appuie encore sur l’ampoule.',
  },

  error: {
    label: 'Pas ce coup-là',
    zero: 'Un coefficient ne peut pas valoir 0 – `{formula}` disparaîtrait de la réaction.',
    max: 'Des coefficients aussi grands sont un signe qu’il faut essayer des nombres plus petits. Vise le rapport le plus simple.',
    subscriptTap:
      'Les indices sont verrouillés. `H2O2` est du peroxyde d’hydrogène, pas de l’eau – change plutôt le grand chiffre.',
    notANumber:
      'Les coefficients sont des nombres entiers à partir de 1. Tape un nombre, ou utilise ▲ et ▼.',
  },

  challenge: {
    label: 'Défi',
    intro: 'Lis la description, puis construis l’équation avant de l’équilibrer.',
    pickerLabel: 'Composés',
    sideLabel: 'Ajouter à',
    reactants: 'Réactifs',
    products: 'Produits',
    placeholderReactant: 'ajouter un réactif',
    placeholderProduct: 'ajouter un produit',
    notInReaction:
      'Cette substance ne fait pas partie de la réaction : {name}. Relis la description – quelles substances nomme-t-elle ?',
    wrongSideProduct:
      'Cette substance est formée par la réaction : {name}. Sa place est donc à droite de la flèche, du côté des produits.',
    wrongSideReactant:
      'Cette substance est consommée par la réaction : {name}. Sa place est donc à gauche de la flèche, du côté des réactifs.',
    built: 'C’est bien l’équation. Maintenant, équilibre-la.',
    addAsReactantA11y: 'Ajouter aux réactifs : {name}, {formula}',
    addAsProductA11y: 'Ajouter aux produits : {name}, {formula}',
    removeA11y: 'Retirer : {name}, {formula}',
    tileA11y: '{name}, {formula}',
  },

  success: {
    label: 'Équilibrée',
    round: 'Équilibrée ! `{equation}`',
    points: '+{points}',
    bonus: 'Bonus forme la plus simple +{points}',
  },

  overlay: {
    levelUpBadge: 'Masse conservée',
    levelUpTitle: 'Niveau réussi',
    levelUpSubtitle: 'Chaque atome est compté',
    levelUpDescription: 'Le niveau {level} ajoute {changes}.',
    levelChanges: {
      level2:
        'des réactions où corriger un élément en déséquilibre un autre, et la ligne suivante n’est plus mise en évidence',
      level3:
        'les ions polyatomiques, les premières parenthèses et des réactions à quatre composés ; le coach attend maintenant que tu demandes, et les amas de particules laissent la place aux formules',
      level4:
        'des hydrocarbures plus gros et des doubles déplacements à quatre composés ; le bilan reste fermé tant que tu ne l’ouvres pas',
    },
    victoryBadge: 'Tous les objectifs atteints',
    victoryTitle: 'Équilibrage maîtrisé',
    victorySubtitle: 'Chaque atome est compté',
    victoryDescription: 'Essaie le niveau Défi, ou ouvre ton cahier de labo.',
    challengeBadge: 'Défi réussi',
    challengeTitle: 'Équations construites et équilibrées',
    challengeSubtitle: 'Des mots aux symboles',
    challengeDescription:
      'Ouvre ton cahier de labo pour revoir toutes les équations que tu as équilibrées.',
    pausedBadge: 'Partie suspendue',
    pausedTitle: 'Jeu en pause',
    pausedSubtitle: 'Rien n’est chronométré.',
    pausedDescription: 'Tes coefficients sont exactement là où tu les as laissés.',
  },

  notebook: {
    header: 'Tes équations équilibrées',
    columnHint: 'Niveau d’astuce',
    columnPoints: 'Points',
    noHint: 'sans astuce',
    hintTier: 'niveau {tier}',
    lowestTerms: 'forme la plus simple du premier coup',
    simplified: 'simplifiée par {k}',
    challenge: 'construite à partir des mots',
    empty: 'Pas encore d’équations.',
  },

  ledger: {
    title: 'Bilan des atomes',
    left: 'Gauche',
    right: 'Droite',
    statusA11y: 'État',
    row: '{element} : {left} à gauche, {right} à droite',
    balancedRow: 'équilibré',
    needsMoreLeft: 'il en manque {count} à gauche',
    needsMoreRight: 'il en manque {count} à droite',
    allBalanced: 'Toutes les lignes correspondent.',
    show: 'Afficher le bilan des atomes',
    hide: 'Masquer le bilan des atomes',
    showCost:
      'Ouvrir le bilan à ce niveau te fait perdre le bonus forme la plus simple.',
    nextUp: 'équilibre cette ligne ensuite',
  },
  beam: {
    label: 'Masse relative avant / après',
    readout: 'Masse relative : {left} avant, {right} après.',
    level: 'La balance est à l’horizontale.',
    tipsLeft: 'La balance penche à gauche.',
    tipsRight: 'La balance penche à droite.',
  },
  card: {
    // No article before {name}: "Ajouter un eau" is impossible. A colon label
    // is gender-free and reads well on a screen reader.
    coefficientA11y: 'Coefficient : {name}, {formula}',
    increaseA11y: 'Augmenter : {name}',
    decreaseA11y: 'Diminuer : {name}',
    formulaTapA11y: '{name} – les indices sont verrouillés',
    clustersA11y: { one: '{count} molécule : {name}', other: '{count} molécules : {name}' },
    reactants: 'Réactifs',
    products: 'Produits',
  },

  glossary: {
    coefficient: {
      // "coefficient" is spelled the same in French and English, so the term
      // and both match words are allowlisted as identical-by-design rather
      // than looking like an untranslated string.
      term: 'coefficient',
      definition: 'le grand chiffre devant une formule ; il multiplie la molécule entière',
      matches: ['coefficients', 'coefficient'],
    },
    subscript: {
      term: 'indice',
      definition:
        'le petit chiffre dans une formule ; il dit combien d’atomes il y a dans une molécule',
      matches: ['indices', 'indice'],
    },
    reactant: {
      term: 'réactif',
      definition: 'ce avec quoi tu pars (à gauche de la flèche)',
      matches: ['réactifs', 'réactif'],
    },
    product: {
      term: 'produit',
      definition: 'ce qui est formé (à droite de la flèche)',
      matches: ['produits', 'produit'],
    },
    conserved: {
      term: 'conservation de la masse',
      definition: 'les atomes ne sont jamais créés ni perdus au cours d’une réaction',
      matches: ['conservée', 'conservation'],
    },
    stateSymbols: {
      term: '(s) (l) (g) (aq)',
      definition: 'solide, liquide, gaz, dissous dans l’eau',
      matches: ['symboles d’état', 'symbole d’état'],
    },
  },

  ui: {
    nextReaction: 'Réaction suivante',
    finishLevel: 'Terminer le niveau',
    skipGuide: 'Je connais déjà',
    nextStep: 'Suivant',
    tryChallenge: 'Essayer le niveau Défi',
    openNotebook: 'Ouvrir le cahier de labo',
    closeNotebook: 'Retour',
    playAgain: 'Rejouer',
    supportMode: 'Mode assistance',
    supportModeHelp:
      'Garde le coach et le bilan des atomes affichés à tous les niveaux. Ne fait jamais baisser ta précision.',
    hintButtonA11y: 'Afficher une astuce',
    dismissHintA11y: 'Fermer l’astuce',
    coachRegionA11y: 'Messages du coach',
    observation: 'Ce que tu verrais',
    equationLabelA11y: 'Équation : {name}',
    liveChanged: '{name} : maintenant {n}.',
    liveLocked: 'Équilibrée. {equation}. L’équation est verrouillée.',
    liveBuilt: 'Équation construite. Maintenant, équilibre-la.',
  },
} satisfies ReactionBalancerMessages;

export default fr;
