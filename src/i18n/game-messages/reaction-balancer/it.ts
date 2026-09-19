// src/i18n/game-messages/reaction-balancer/it.ts
//
// La bilancia degli atomi, in italiano. Terminologia fissata in
// docs/i18n/glossary-it.md: coefficiente, pedice, reagenti / prodotti,
// bilanciare, conteggio degli atomi, indizio.
//
// Tre decisioni di questo file che conviene conoscere:
//
//   * **coefficiente / pedice** è il contrasto su cui gira tutto il gioco, e in
//     italiano viene pulito. Il francese ha dovuto cercare un'altra parola per
//     «hint» perché *indice* vuol dire insieme «indizio» e «pedice»; l'italiano
//     non ha quel cozzo, perché il pedice è *pedice* e l'indizio è *indizio*.
//   * **bilanciare** è il verbo, e a differenza dello spagnolo non costringe a
//     niente altrove: lo spagnolo ha dovuto chiamare *Opciones* il pannello
//     delle impostazioni, perché *ajustar* (bilanciare) e *ajustes*
//     (impostazioni) hanno la stessa radice. In italiano *Impostazioni* non
//     tocca *bilanciare*.
//   * **la bilancia** è l'oggetto sullo schermo, e qui la radice comune è un
//     pregio invece che un problema: bilanci l'equazione, e la bilancia va in
//     equilibrio. Un'idea sola, una radice sola.
//   * **conteggio degli atomi** per l'atom ledger, e non *bilancio degli atomi*,
//     che riuserebbe la radice del bilanciamento per una cosa diversa (la
//     tabella, non l'azione).
//
// Tre vincoli propri dell'italiano, spiegati nel glossario:
//
//   * Nessun articolo può precedere un segnaposto di nome ({name}, {element}),
//     perché l'articolo dipende dal genere e dal suono iniziale (il carbonio, ma
//     lo zolfo e l'ossigeno) e perché ogni preposizione si contrae
//     obbligatoriamente con l'articolo (*del*, *dello*, *dell'*, *al*, *allo*,
//     *all'*). Di qui le formule «nome + due punti» e «l'elemento {element}».
//     *L'elemento {x}* è ancora più sicuro in italiano che in spagnolo: essendo
//     *elemento* maschile e iniziante per vocale, l'articolo è sempre `l’` e
//     ogni preposizione si contrae in una forma sola.
//   * **Accordo con il numero.** `ledger.needsMore*` non dice «mancano {count}»:
//     un verbo italiano si accorda con il suo numero, e questa è una stringa
//     piatta, non un record di plurali. A 1 si leggerebbe «mancano 1», ed è
//     esattamente il caso che il conteggio mostra alla primissima reazione.
//   * Tipografia: nessuno spazio prima di : ; ! ?, a differenza del francese; e
//     l'apostrofo è sempre U+2019.
//
// `satisfies ReactionBalancerMessages` tipa questo file contro l'originale
// inglese di src/core-engine/config/games/reaction-balancer-messages.ts: una
// chiave mancante è un errore di compilazione, non un ritorno silenzioso
// all'inglese. Non aggiungere mai `?` né `Partial<>` per farlo compilare.

import type { ReactionBalancerMessages } from '@/core-engine/config/games/reaction-balancer-messages';

export const it = {
  header: {
    subtitle: 'La bilancia degli atomi',
    balance: 'Da bilanciare: {name}',
    build: 'Da costruire e bilanciare: {name}',
    progress: 'Reazione {round}/{total}',
    challengeProgress: 'Sfida {round}/{total}',
  },

  instructions: {
    title: 'Come si gioca: La bilancia degli atomi',
    lead: 'Fai coincidere gli atomi.',
    intro:
      'In una reazione chimica gli atomi si riorganizzano, non si creano e non si perdono mai: ai due lati della freccia ci deve essere lo stesso numero di ogni atomo.',
    bullets: [
      'I **numeri grandi** davanti a una formula sono i coefficienti. Sono quelli che cambi.',
      'I **numeri piccoli** dentro una formula sono i pedici. Sono bloccati: cambiarli darebbe un’altra sostanza.',
      'Il **conteggio degli atomi** sotto la freccia conta ogni elemento a sinistra e a destra. Quando tutte le righe sono uguali, l’equazione si blocca.',
      'Non sai come andare avanti? Premi la **lampadina** (o la H). Il primo indizio è sempre gratis.',
    ],
    arrow: 'La freccia vuol dire «dà» o «diventa», non «è uguale a».',
    keyboard: [
      ['Tab', 'passa da un composto all’altro'],
      ['↑ / ↓', 'cambiano un coefficiente'],
      ['0–9', 'scrivono un numero direttamente'],
      ['H', 'indizio'],
      ['P', 'pausa'],
    ],
    touch: [
      ['Tocca', '▲ / ▼ su una carta per cambiare il coefficiente.'],
      ['Tocca', 'il numero per scriverlo.'],
    ],
    glossaryTitle: 'Le parole del gioco',
  },

  guided: {
    stepLabel: 'Passo {step} di {total}',
    steps: [
      'Guarda il conteggio. Idrogeno: 2 a sinistra, 2 a destra; bilanciato. Ossigeno: 2 a sinistra, 1 a destra. Bisogna sistemare l’ossigeno.',
      'Non possiamo cambiare il 2 piccolo di `O2`: sarebbe un’altra sostanza. Aggiungi più acqua. Premi ▲ su `H2O`.',
      'L’ossigeno ora è 2 e 2. Ma guarda: l’idrogeno è cambiato, 2 a sinistra e 4 a destra. Bilanciare un elemento può sbilanciarne un altro. Premi ▲ su `H2`.',
      'Tutte le righe coincidono: 4 H e 2 O per lato. L’equazione è bilanciata – `2H2 + O2 -> 2H2O`. Hai appena verificato che la massa si conserva.',
    ],
  },

  coach: {
    label: 'Guida',
    // No article before {elementInSentence}: Italian would need "dell’ossigeno"
    // but "dello zolfo" and "del carbonio". "l’elemento" carries the article
    // instead, and because *elemento* begins with a vowel there is only ever one
    // form of it — no branch left to get wrong.
    imbalance:
      '{element}: {left} a sinistra, {right} a destra. Quale composto con l’elemento {elementInSentence} potresti cambiare?',
    multiple:
      'Questo ha sistemato l’elemento {fixed}, ma l’elemento {broken} è cambiato. Bilanciare un elemento può sbilanciarne un altro. Ora tocca controllare: {broken}.',
    balanced: 'Tutte le righe coincidono. La massa si conserva.',
    balancedNotLowest:
      'Bilanciata, e tutti i coefficienti si possono dividere per {k}. La forma più semplice: `{equation}`.',
  },

  hint: {
    label: 'Indizio',
    tierLabel: 'Indizio {tier} di 3',
    tier1:
      'Comincia dall’elemento che compare in meno composti. Qui è l’elemento {element}.',
    tier3: 'Metti un {n} davanti a `{formula}`. Poi ricontrolla l’elemento {element}.',
    tier3Lower: 'Riporta `{formula}` a {n}. Poi ricontrolla l’elemento {element}.',
    tier3Balanced: 'Tutte le righe coincidono già: l’equazione è bilanciata.',
    tier1Build:
      'Rileggi la descrizione. Nomina ogni sostanza di partenza e ogni sostanza che si forma.',
    // The three verbs on each side are the ones the word equations in
    // chemistry-names/it.ts actually use, so this hint is usable rather than
    // decorative.
    tier2Build:
      'Le sostanze che vengono prima di «reagisce», «brucia» o «si decompone» sono reagenti. Quelle che vengono dopo «per formare», «per dare» o «produce» sono prodotti.',
    tier3BuildReactant:
      'Aggiungi questa sostanza dalla parte dei reagenti: {name} (`{formula}`).',
    tier3BuildProduct:
      'Aggiungi questa sostanza dalla parte dei prodotti: {name} (`{formula}`).',
  },
  stuck: {
    offer: 'Vuoi un indizio più chiaro? Premi di nuovo la lampadina.',
  },

  error: {
    label: 'Questa mossa no',
    zero: 'Un coefficiente non può valere 0: `{formula}` sparirebbe dalla reazione.',
    max: 'Coefficienti così grandi sono il segno che conviene provare con numeri più piccoli. Cerca il rapporto più semplice.',
    subscriptTap:
      'I pedici sono bloccati. `H2O2` è perossido di idrogeno, non acqua: cambia il numero grande.',
    notANumber:
      'I coefficienti sono numeri interi a partire da 1. Scrivi un numero, oppure usa ▲ e ▼.',
  },

  challenge: {
    label: 'Sfida',
    intro: 'Leggi la descrizione e costruisci l’equazione prima di bilanciarla.',
    pickerLabel: 'Composti',
    sideLabel: 'Aggiungi a',
    reactants: 'Reagenti',
    products: 'Prodotti',
    placeholderReactant: 'aggiungi un reagente',
    placeholderProduct: 'aggiungi un prodotto',
    // A generic noun before the colon, so the compound name never needs an
    // article of its own.
    notInReaction:
      'Questa sostanza non partecipa alla reazione: {name}. Rileggi la descrizione: quali sostanze nomina?',
    wrongSideProduct:
      'Questa sostanza si forma nella reazione: {name}. Il suo posto è a destra della freccia, con i prodotti.',
    wrongSideReactant:
      'Questa sostanza si consuma nella reazione: {name}. Il suo posto è a sinistra della freccia, con i reagenti.',
    built: 'Questa è l’equazione. Ora bilanciala.',
    addAsReactantA11y: 'Aggiungi ai reagenti: {name}, {formula}',
    addAsProductA11y: 'Aggiungi ai prodotti: {name}, {formula}',
    removeA11y: 'Togli: {name}, {formula}',
    tileA11y: '{name}, {formula}',
  },

  success: {
    label: 'Bilanciata',
    round: 'Bilanciata! `{equation}`',
    points: '+{points}',
    bonus: 'Bonus forma più semplice +{points}',
  },

  overlay: {
    levelUpBadge: 'Massa conservata',
    levelUpTitle: 'Livello superato',
    levelUpSubtitle: 'Tutti gli atomi contati',
    levelUpDescription: 'Il livello {level} aggiunge {changes}.',
    levelChanges: {
      level2:
        'reazioni in cui sistemare un elemento ne sbilancia un altro, e la riga successiva non è più evidenziata',
      level3:
        'gli ioni poliatomici, le prime parentesi e reazioni con quattro composti; la guida ora aspetta che tu chieda, e i gruppi di particelle lasciano il posto alle formule',
      level4:
        'idrocarburi più grandi e doppi scambi con quattro composti; il conteggio resta nascosto finché non lo apri',
    },
    victoryBadge: 'Tutti gli obiettivi raggiunti',
    victoryTitle: 'Bilanciamento conquistato',
    victorySubtitle: 'Tutti gli atomi contati',
    victoryDescription:
      'Prova il livello Sfida, oppure apri il tuo quaderno di laboratorio.',
    challengeBadge: 'Sfida superata',
    challengeTitle: 'Equazioni costruite e bilanciate',
    challengeSubtitle: 'Dalle parole ai simboli',
    challengeDescription:
      'Apri il tuo quaderno di laboratorio per vedere tutte le equazioni che hai bilanciato.',
    pausedBadge: 'Partita in attesa',
    pausedTitle: 'Gioco in pausa',
    pausedSubtitle: 'Niente va a tempo.',
    pausedDescription: 'I tuoi coefficienti sono esattamente dove li hai lasciati.',
  },

  notebook: {
    header: 'Le tue equazioni bilanciate',
    columnHint: 'Livello di indizio',
    columnPoints: 'Punti',
    noHint: 'senza indizi',
    hintTier: 'livello {tier}',
    lowestTerms: 'forma più semplice al primo colpo',
    simplified: 'semplificata per {k}',
    challenge: 'costruita dalle parole',
    empty: 'Ancora nessuna equazione.',
  },

  ledger: {
    title: 'Conteggio degli atomi',
    left: 'Sinistra',
    right: 'Destra',
    statusA11y: 'Stato',
    row: '{element}: {left} a sinistra, {right} a destra',
    balancedRow: 'bilanciato',
    // Not "mancano {count}": an Italian verb agrees with its count, and this is
    // a flat string rather than a plural record — the English "{count} more
    // needed" does not inflect, and a locale may not turn a flat string into a
    // plural (dictionary.test.ts enforces that in both directions). At count 1
    // it would read "mancano 1", which is wrong, and the ledger shows exactly
    // that case on the very first reaction. "{count} da aggiungere" is
    // idiomatic, invariant — `da` + infinitive never agrees with anything — and,
    // unlike Spanish's "{count} de menos", it also says which way the shortfall
    // runs. ("{count} in meno" was rejected as ambiguous between "five short"
    // and "five too many", which is the one thing a ledger must not be.)
    needsMoreLeft: '{count} da aggiungere a sinistra',
    needsMoreRight: '{count} da aggiungere a destra',
    allBalanced: 'Tutte le righe coincidono.',
    show: 'Mostra il conteggio degli atomi',
    hide: 'Nascondi il conteggio degli atomi',
    showCost:
      'Aprire il conteggio a questo livello ti fa perdere il bonus della forma più semplice.',
    nextUp: 'bilancia questa riga adesso',
  },
  beam: {
    label: 'Massa relativa prima / dopo',
    readout: 'Massa relativa: {left} prima, {right} dopo.',
    // The beam is a physical object on screen. Unlike Spanish — where *la
    // balanza* had to be kept explicitly distinct from *ajustar* — this is the
    // same root as *bilanciare*, and that is a feature: you balance the
    // equation and the scales go level.
    level: 'La bilancia è in equilibrio.',
    tipsLeft: 'La bilancia pende a sinistra.',
    tipsRight: 'La bilancia pende a destra.',
  },
  card: {
    // No article before {name}: "Aggiungi un acqua" is impossible, and every
    // preposition would have to contract. A colon label is gender-free and reads
    // well on a screen reader.
    coefficientA11y: 'Coefficiente: {name}, {formula}',
    increaseA11y: 'Aumenta: {name}',
    decreaseA11y: 'Diminuisci: {name}',
    formulaTapA11y: '{name} – i pedici sono bloccati',
    clustersA11y: { one: '{count} molecola: {name}', other: '{count} molecole: {name}' },
    reactants: 'Reagenti',
    products: 'Prodotti',
  },

  glossary: {
    coefficient: {
      // Unlike French — where "coefficient" is spelled exactly as in English and
      // had to be allowlisted — Italian spells it *coefficiente*, so nothing here
      // is identical-by-design.
      term: 'coefficiente',
      definition: 'il numero grande davanti a una formula; moltiplica tutta la molecola',
      matches: ['coefficienti', 'coefficiente'],
    },
    subscript: {
      term: 'pedice',
      definition:
        'il numero piccolo dentro una formula; dice quanti atomi ci sono in una molecola',
      matches: ['pedici', 'pedice'],
    },
    reactant: {
      term: 'reagente',
      definition: 'quello da cui parti (a sinistra della freccia)',
      matches: ['reagenti', 'reagente'],
    },
    product: {
      term: 'prodotto',
      definition: 'quello che si forma (a destra della freccia)',
      matches: ['prodotti', 'prodotto'],
    },
    conserved: {
      term: 'conservazione della massa',
      definition: 'gli atomi non si creano né si perdono mai in una reazione',
      matches: ['conserva', 'conservazione'],
    },
    stateSymbols: {
      term: '(s) (l) (g) (aq)',
      definition: 'solido, liquido, gas, sciolto in acqua',
      matches: ['simboli di stato', 'simbolo di stato'],
    },
  },

  ui: {
    nextReaction: 'Reazione successiva',
    finishLevel: 'Finisci il livello',
    skipGuide: 'L’ho già fatto altre volte',
    nextStep: 'Avanti',
    tryChallenge: 'Prova il livello Sfida',
    openNotebook: 'Apri il quaderno di laboratorio',
    closeNotebook: 'Indietro',
    playAgain: 'Gioca di nuovo',
    supportMode: 'Modalità supporto',
    supportModeHelp:
      'Tiene visibili la guida e il conteggio degli atomi a ogni livello. Non abbassa mai la tua precisione.',
    hintButtonA11y: 'Vedi un indizio',
    dismissHintA11y: 'Chiudi l’indizio',
    coachRegionA11y: 'Messaggi della guida',
    observation: 'Che cosa vedresti',
    equationLabelA11y: 'Equazione: {name}',
    liveChanged: '{name}: ora {n}.',
    liveLocked: 'Bilanciata. {equation}. L’equazione è bloccata.',
    liveBuilt: 'Equazione costruita. Ora bilanciala.',
  },
  // The reaction-class badge. Terms from docs/i18n/glossary-it.md § reaction
  // types, including the *scambio* pair Italian school chemistry teaches in
  // preference to *spostamento*.
  reactionType: {
    Synthesis: 'Sintesi',
    Decomposition: 'Decomposizione',
    'Single Replacement': 'Scambio semplice',
    'Double Replacement': 'Doppio scambio',
    Combustion: 'Combustione',
    'Acid-Base': 'Acido-base',
    // International: Italian says *reazione redox* and never expands it.
    Redox: 'Redox',
    Precipitation: 'Precipitazione',
  },
} satisfies ReactionBalancerMessages;

export default it;
