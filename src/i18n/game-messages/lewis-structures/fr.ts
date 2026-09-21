// src/i18n/game-messages/lewis-structures/fr.ts
//
// Partage et complète (structures de Lewis), en français.
//
// « Électron célibataire » est le seul nom que le jeu donne à un
// électron externe sans partenaire – partout, y compris sur la zone de dessin.
// Le mot du jeu « solitaire » (anglais « loner ») a été supprimé le
// 19/09/2026 ; le raisonnement, et les candidats écartés (orphelin, solo,
// dépareillé), restent dans docs/i18n/glossary-fr.md.
//
// Autres termes fixés par le glossaire : doublet non liant (et non « paire
// libre », qui est un calque), doublet liant, liaison covalente, structure de
// Lewis, règle de l’octet, règle du duet, électrons externes / électrons de
// valence, formule développée, astuce (et non « indice »).
//
// Deux contraintes propres au français :
//
//   * Aucun article ne peut précéder un porte-nom ({atom}, {name}), parce que
//     l’article dépend du genre et de la première lettre du nom (l’oxygène
//     mais le carbone, l’eau mais le méthane). D’où la tournure
//     « nom + deux-points » employée dans presque toutes les lignes du coach.
//   * Les mots de `matches` doivent commencer et finir par une lettre, dans
//     n’importe quel alphabet : le moteur de recherche utilise des
//     délimiteurs `\p{L}` avec le drapeau `u`, et non le `\b` de
//     JavaScript. Une expression qui commence par un accent, comme
//     « électron célibataire », est donc désormais utilisable telle quelle
//     (ce qui n’était pas le cas quand le `\b` ASCII a forcé `outerElectron`
//     sur « externes » et « valence »).
//
// `satisfies LewisStructuresMessages` type ce fichier contre l’original
// anglais dans src/core-engine/config/games/lewis-structures-messages.ts : une
// clé manquante est une erreur de compilation, pas un retour silencieux à
// l’anglais. Ne jamais ajouter `?` ni `Partial<>` pour que ça compile.

import type { LewisStructuresMessages } from '@/core-engine/config/games/lewis-structures-messages';

export const fr = {
  header: {
    subtitle: 'Partage et complète',
    build: 'À construire : {name} ({formula})',
    inspect: 'À vérifier : {name} ({formula})',
    progress: 'Molécule {round}/{total}',
    marking: 'Dessin {round}/{total}',
  },

  instructions: {
    title: 'Comment jouer : Partage et complète',
    lead: 'Associe les électrons célibataires.',
    intro:
      'Chaque atome apporte ses électrons externes sous forme de points. Un point tout seul est un électron célibataire – il cherche un partenaire. Deux électrons célibataires venant de deux atomes différents forment un doublet liant, c’est-à-dire une liaison.',
    bullets: [
      'Fais glisser un point qui clignote sur un point qui clignote d’un autre atome (ou appuie sur l’un, puis sur l’autre).',
      'Un atome est complet quand il a 8 points autour de lui – l’hydrogène est complet à 2.',
      'Partage deux fois entre les deux mêmes atomes et tu obtiens une liaison double.',
      'La structure se verrouille toute seule quand chaque atome est complet et qu’il ne reste aucun électron célibataire. Pas besoin de bouton.',
      'Tu bloques ? Appuie sur l’ampoule (ou sur H). La première astuce est toujours gratuite.',
    ],
    disclaimer:
      'Les points montrent combien d’électrons externes a un atome – pas où ils se trouvent vraiment.',
    // Column 1 is the physical key. It is named the way a French keyboard
    // names it — an AZERTY keyboard is printed « Entrée » and « Échap » — the
    // same reasoning that made German translate "Space" to "Leertaste" while
    // leaving Tab, H and P alone.
    keyboard: [
      ['Tab', 'sélectionne un atome'],
      ['← →', 'passent d’un électron célibataire à l’autre'],
      ['Entrée', 'commence un doublet ; Tab + Entrée sur un autre atome le termine'],
      ['Échap', 'annule'],
      ['H', 'astuce'],
      ['P', 'met le jeu en pause'],
    ],
    touch: [
      ['Appuie', 'sur un électron célibataire, puis sur celui d’un autre atome.'],
      ['Appuie', 'sur un doublet liant pour le défaire.'],
    ],
    compact: [
      'Appuie sur un point célibataire, puis sur un point d’un autre atome.',
      'Un atome est complet à 8 points – l’hydrogène à 2.',
      'Ça se verrouille tout seul quand chaque atome est complet. Pas de bouton.',
    ],
    glossaryTitle: 'Les mots du jeu',
  },

  guided: {
    stepLabel: 'Étape {step} sur {total}',
    h2: [
      'Deux atomes d’hydrogène. Chacun a 1 électron externe – un électron célibataire. Fais glisser l’un sur l’autre.',
      'Ils partagent maintenant un doublet. Compte autour de chaque H : 2. L’hydrogène est complet à 2 – c’est une liaison simple, H–H.',
    ],
    h2oStep1:
      'L’oxygène a 6 électrons externes : deux doublets (qui restent en place) et deux électrons célibataires (qui clignotent).',
    h2oStep2: 'Associe un électron célibataire de l’oxygène avec un électron célibataire de l’hydrogène.',
    h2oStep2After: 'L’oxygène en a maintenant 7 autour de lui – il en manque encore un.',
    h2oStep3: 'Associe l’autre électron célibataire de l’oxygène avec l’autre hydrogène.',
    h2oStep4:
      'Oxygène : 8. Chaque hydrogène : 2. Deux doublets liants et deux doublets non liants – c’est l’eau, H–O–H.',
  },

  coach: {
    label: 'Coach',
    loners: {
      one: '{atom} : il reste {count} électron célibataire. Il s’associe avec un électron célibataire d’un autre atome.',
      other:
        '{atom} : il reste {count} électrons célibataires. Ils s’associent avec les électrons célibataires d’un autre atome.',
    },
    needsMore:
      '{atom} : {count} sur 8. Il manque un doublet liant – quel atome a encore un électron célibataire ?',
    shareAgain:
      '{atom1} et {atom2} ont chacun encore un électron célibataire. Ils peuvent partager une deuxième fois : cela fait une liaison double.',
    complete:
      'Chaque atome est complet et il ne reste aucun électron célibataire. Molécule obtenue : {name} – {bonds}, {lonePairs}.',
    sameGroup:
      '{element} est dans la même colonne que l’élément {analogue} : il a donc le même nombre d’électrons externes. La structure sera la même que celle-ci : {analogueMolecule}.',
    central: 'L’atome qui a le plus d’électrons célibataires se place généralement au milieu.',
    deadEnd:
      '{atom} : {count} sur 8, mais aucun autre atome n’a d’électron célibataire à partager. Appuie sur un doublet liant pour le défaire, puis essaie un autre partenaire.',
    isomer:
      'Chaque atome est complet, mais les atomes ne sont pas reliés comme dans la molécule attendue : {name}. Appuie sur un doublet liant pour le défaire et essaie un autre agencement.',
  },

  counts: {
    sharedPairs: { one: '{count} doublet liant', other: '{count} doublets liants' },
    lonePairs: { one: '{count} doublet non liant', other: '{count} doublets non liants' },
    bonds: { one: '{count} liaison', other: '{count} liaisons' },
  },

  hint: {
    label: 'Astuce',
    tierLabel: 'Astuce {tier} sur 3',
    tier1: 'Regarde quels atomes ont encore des points qui clignotent.',
    tier3: 'Associe deux électrons célibataires, un sur chaque atome – {atom1} et {atom2}.',
    tier3Undo: 'Appuie sur le doublet liant entre {atom1} et {atom2} pour le défaire.',
    offerTier2: 'Toujours bloqué ? Appuie encore sur l’ampoule pour avoir la stratégie.',
    noMoreHints: 'C’était la dernière astuce. Chaque atome est complet – appuie sur Suivant.',
    inspectTier1:
      'Compte les points autour de chaque atome. Chaque atome devrait en avoir 8 – l’hydrogène 2.',
    inspectTier2:
      'Regarde d’abord les atomes qui ont le plus de liaisons. C’est là que se cachent les doublets en trop ou manquants.',
    inspectTier3: '{atom} : {count}. Appuie dessus, puis choisis ce qui ne va pas.',
    inspectTier3Correct:
      'Chaque atome est complet et il ne reste rien – appuie sur « Celle-ci est correcte ».',
    inspectTier3Repair:
      'Associe les électrons célibataires jusqu’à ce que chaque atome soit de nouveau complet.',
    // French does not inflect "il y en a {count}" with the count, so the two
    // forms coincide. They are both supplied rather than dropping `one`, so the
    // review table has a row for each English form.
    inspectTier3CountBonds: {
      one: 'Chaque trait entre deux atomes est une liaison. Il y en a {count}.',
      other: 'Chaque trait entre deux atomes est une liaison. Il y en a {count}.',
    },
    inspectTier3CountLonePairs: {
      one: 'Chaque paire de points qui n’est pas sur un trait est un doublet non liant. Il y en a {count}.',
      other:
        'Chaque paire de points qui n’est pas sur un trait est un doublet non liant. Il y en a {count}.',
    },
  },

  error: {
    label: 'Pas ce coup-là',
    atomFull:
      '{atom} : déjà 8 électrons. Cet atome ne peut plus rien partager. Prends un atome qui a encore un électron célibataire.',
    hydrogenFull: 'L’hydrogène est complet à 2. Il ne peut partager qu’un seul doublet.',
    sameAtom:
      'Ces deux points appartiennent au même atome – ils forment déjà un doublet. Une liaison demande deux atomes différents.',
    pairedDot:
      'Ce point fait déjà partie d’un doublet. Seuls les électrons célibataires (ceux qui clignotent) peuvent être partagés.',
  },

  inspect: {
    // "élève" is epicene in French, so this needs none of the gender work the
    // German line had to do for "Mitschülerin oder Mitschüler".
    classmate: 'Dessiné par un élève de ta classe : {name}.',
    prompt: 'Appuie sur l’atome qui te semble faux – ou dis que le dessin est correct.',
    diagnosisPrompt: '{atom} : qu’est-ce qui ne va pas ?',
    diagnosis: {
      tooMany: 'trop d’électrons autour de cet atome',
      tooFew: 'pas assez – il manque un doublet non liant',
      hydrogenFull: 'l’hydrogène ne peut partager qu’un seul doublet',
      needsDouble: 'ces atomes doivent partager deux fois (une liaison double)',
      leftover: 'un électron célibataire est resté',
      none: 'aucune erreur',
    },
    wrongAtom:
      '{atom} : {count} – celui-là est bon. Cherche un atome qui en a trop ou pas assez.',
    wrongDiagnosis:
      'Pas tout à fait. Compte les points autour de cet atome – {atom} : {count}. {explanation}',
    explainTooMany:
      '{atom} : plus de {full} électrons – un doublet non liant a été dessiné en trop.',
    explainTooFew: '{atom} : moins de 8 électrons – il manque un doublet non liant.',
    explainHydrogenFull: 'L’hydrogène en a 4 – il ne peut partager qu’un seul doublet.',
    explainNeedsDouble:
      '{atom1} et {atom2} ont chacun encore un électron célibataire – ils doivent partager deux fois.',
    explainLeftover: '{atom} : il reste un électron célibataire – un électron a été dessiné en trop.',
    correctStructure: 'Exact – chaque atome est complet et il ne reste rien.',
    missedCorrect:
      'Celle-ci est vraiment correcte : chaque atome est complet. Tous les dessins ne contiennent pas une erreur.',
    notCorrect:
      'Pas tout à fait – un atome n’est pas bon. Compte les points autour de chaque atome et appuie sur celui qui cloche.',
    repair: 'Maintenant, corrige : associe les électrons célibataires jusqu’à ce que chaque atome soit complet.',
    repaired: 'Corrigé – chaque atome est de nouveau complet.',
    countBonds: 'Combien y a-t-il de liaisons ? Appuie sur chaque doublet liant.',
    countLonePairs:
      'Combien y a-t-il de doublets non liants ? Appuie sur chaque doublet qui n’est pas partagé.',
    countWrong:
      'Tu en as compté {given} ; il y en a {actual}. Ceux que tu as ratés sont mis en évidence.',
    countWrongDouble:
      'Tu en as compté {given} ; il y en a {actual}. Ceux que tu as ratés sont mis en évidence – une liaison double compte pour une liaison, mais pour deux doublets liants.',
    countRight: 'Oui – {counted}.',
    countLabel: 'Compté : {counted}',
  },

  success: {
    label: 'Terminée',
    round: 'Molécule terminée : {name} – {bondLine}.',
    bonus: 'Bonus sans astuce +{points}',
    points: '+{points}',
  },

  overlay: {
    levelUpBadge: 'Tous les atomes complets',
    levelUpTitle: 'Niveau réussi',
    levelUpSubtitle: 'Chaque électron célibataire a trouvé un partenaire',
    levelUpDescription: 'Niveau {level} : {changes}',
    levelChanges: {
      level2:
        'l’oxygène, l’azote et le carbone apportent des doublets non liants qui restent en place, et une molécule sur trois est un dessin d’élève à vérifier.',
      level3:
        'certains atomes doivent partager deux fois – une liaison double. Le coach attend maintenant que tu demandes.',
      level4: 'les atomes ne sont plus placés au départ. C’est toi qui choisis lequel va au milieu.',
      level5: 'mode correction – six dessins d’élèves, pas de coach, seulement l’échelle d’astuces.',
    },
    victoryBadge: 'Tous les objectifs atteints',
    victoryTitle: 'Structures de Lewis maîtrisées',
    victorySubtitle: 'Chaque électron célibataire a trouvé un partenaire',
    victoryDescription: 'Ouvre ta feuille de correction pour revoir ce que tu as construit.',
    pausedBadge: 'Partie suspendue',
    pausedTitle: 'Jeu en pause',
    pausedSubtitle: 'Rien n’est chronométré.',
    pausedDescription: 'Ta structure est exactement là où tu l’as laissée.',
  },

  notebook: {
    header: 'Tes structures',
    markingHeader: 'Ta feuille de correction',
    columnMolecule: 'Molécule',
    columnBondLine: 'Formule développée',
    columnCounts: 'Liaisons / doublets non liants',
    columnHint: 'Niveau d’astuce',
    columnDiagnosis: 'Diagnostic',
    noHint: 'sans astuce',
    hintTier: 'niveau {tier}',
    diagnosisRow: '{label}',
    diagnosisRowFirstTry: '{label} – du premier coup',
    empty: 'Pas encore de structures.',
  },

  glossary: {
    outerElectron: {
      term: 'électron externe (électron de valence)',
      definition: 'un électron de la couche externe – ce sont ceux qu’un atome partage',
      // "électrons externes" starts with é, which the ASCII \b matcher can
      // never find, so the chip lands on the adjective instead.
      matches: ['externes', 'externe', 'de valence', 'valence'],
    },
    unpairedElectron: {
      term: 'électron célibataire',
      definition: 'un électron externe sans partenaire ; seuls ceux-là peuvent être partagés',
      matches: [
        'électrons célibataires',
        'électron célibataire',
        'célibataires',
        'célibataire',
      ],
    },
    lonePair: {
      term: 'doublet non liant',
      definition: 'deux électrons externes qui restent sur un atome et ne sont pas partagés',
      matches: ['doublets non liants', 'doublet non liant'],
    },
    sharedPair: {
      term: 'doublet liant (liaison)',
      definition:
        'deux électrons, un de chaque atome, partagés entre eux – dessinés sous la forme d’un trait',
      matches: ['doublets liants', 'doublet liant', 'liaisons', 'liaison'],
    },
    bondOrder: {
      term: 'liaison simple, double, triple',
      definition: 'un, deux ou trois doublets liants entre les deux mêmes atomes',
      matches: ['liaison simple', 'liaison double', 'liaison triple'],
    },
    octet: {
      // "octet" is the same word in French and English, so the term and the
      // match word are allowlisted as identical-by-design.
      term: 'octet',
      definition: 'huit électrons externes autour d’un atome – il est complet',
      matches: ['octet'],
    },
    duet: {
      // Unlike German, French school chemistry already has this word and
      // teaches it: « la règle du duet et de l’octet ». Nothing was coined.
      term: 'duet',
      definition: 'deux électrons externes autour de l’hydrogène – il est complet',
      matches: ['duet'],
    },
    dot: {
      term: 'point',
      definition: 'montre combien il y a d’électrons externes, pas où ils se trouvent',
      matches: ['points', 'point'],
    },
  },

  ui: {
    nextMolecule: 'Molécule suivante',
    nextDrawing: 'Dessin suivant',
    finishLevel: 'Terminer le niveau',
    skipGuide: 'Passer l’explication',
    nextStep: 'Suivant',
    thisOneIsCorrect: 'Celle-ci est correcte',
    doneCounting: 'Fini de compter',
    startRepair: 'Corriger',
    openMarkingSheet: 'Ouvrir la feuille de correction',
    closeMarkingSheet: 'Retour',
    playAgain: 'Rejouer',
    supportMode: 'Mode assistance',
    supportModeHelp:
      'Garde le panneau du coach ouvert à tous les niveaux. Ne fait jamais baisser ta précision.',
    hintButtonA11y: 'Afficher une astuce',
    dismissHintA11y: 'Fermer l’astuce',
    coachRegionA11y: 'Messages du coach',
    canvasLabelA11y: 'Structure de Lewis : {name}',
    atomNameA11y: '{element} : {count} sur {full}',
    atomCounterA11y: '{symbol} : {count} sur {full}',
    atomLonerA11y: '{element}, électron célibataire {index} sur {total}',
    atomLonePairA11y: '{element}, doublet non liant {index} sur {total}',
    atomOrdinal: '{element} {ordinal}',
    // The short label on a pulsing dot at Level 1, off from Level 2 — the
    // scaffold the brief removes on purpose. Four characters, and beside a
    // single dot it reads as "on its own".
    unpairedLabel: 'électron célibataire',
    atomFull: 'complet',
    atomSelectedA11y:
      '{element} : électron célibataire sélectionné. Choisis maintenant un électron célibataire sur un autre atome.',
    atomInspectTapA11y: '{element} – appuie si cet atome n’est pas bon',
    bondSingleA11y: 'Liaison simple entre {atom1} et {atom2}',
    bondDoubleA11y: 'Liaison double entre {atom1} et {atom2}',
    bondTripleA11y: 'Liaison triple entre {atom1} et {atom2}',
    bondUndoA11y: 'appuie pour défaire le dernier doublet liant',
    bondCountA11y: 'appuie pour compter',
    bondCountedA11y: 'compté',
    livePaired:
      'Doublet liant créé entre {atom1} et {atom2}. {name1} : {count1} ; {name2} : {count2}.',
    liveUnpaired: 'Le doublet liant entre {atom1} et {atom2} a été défait.',
    liveLocked: 'Molécule terminée : {name}. La structure est verrouillée.',
  },
} satisfies LewisStructuresMessages;

export default fr;
