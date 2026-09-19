// src/i18n/game-messages/lewis-structures/it.ts
//
// Condividi e completa (strutture di Lewis), in italiano.
//
// «Elettrone spaiato» è l'unico nome che il gioco dà a un elettrone esterno
// senza compagno: ovunque, anche sopra il punto che lampeggia. La parola del
// gioco «dispari» è stata ritirata il 19/09/2026.
//
// Restano valide le collisioni che a suo tempo scartarono le alternative, e
// vanno ancora evitate: l'italiano chiama *doppietto solitario* un lone pair
// (e *coppia solitaria* è l'altra dicitura corrente), *doppietto libero* è un
// altro nome dello stesso concetto, *elettroni liberi* sono quelli
// delocalizzati e *legame singolo* è il single bond, insegnato tre righe più
// in là in questo stesso gioco. Il ragionamento completo, e i candidati
// scartati (solo, scompagnato, celibe, orfano), sono in
// docs/i18n/glossary-it.md.
//
// Altri termini fissati dal glossario: doppietto solitario, doppietto di legame
// (e non «doppietto condiviso», che cozza con il verbo *condividere* del titolo
// stesso), legame covalente, struttura di Lewis, regola dell'ottetto, regola del
// duetto, elettroni esterni / elettroni di valenza, formula di struttura,
// indizio (e non «suggerimento», troppo lungo per il badge dell'intestazione).
//
// Tre cose proprie dell'italiano:
//
//   * Nessun articolo può precedere un segnaposto di nome ({atom}, {name}),
//     perché l'articolo dipende dal genere e dal suono iniziale (il carbonio, ma
//     lo zolfo e l'ossigeno) e perché *di + il* si contrae obbligatoriamente in
//     *del*, *dello*, *dell'*. Di qui la formula «nome + due punti», usata in
//     quasi tutte le righe della guida.
//   * Le parole di `matches` non hanno bisogno di nessun aggiustamento: gli
//     accenti italiani sono finali, non iniziali, e nessuno di questi termini ne
//     porta uno. Il `\b` ASCII del cercatore li trova interi. L'elisione aiuta:
//     *l'elettrone* contiene un confine di parola prima di *elettrone*.
//   * L'apostrofo è sempre U+2019, così nessuna stringa ha bisogno di un
//     backslash.
//
// `satisfies LewisStructuresMessages` tipa questo file contro l'originale
// inglese di src/core-engine/config/games/lewis-structures-messages.ts: una
// chiave mancante è un errore di compilazione, non un ritorno silenzioso
// all'inglese. Non aggiungere mai `?` né `Partial<>` per farlo compilare.

import type { LewisStructuresMessages } from '@/core-engine/config/games/lewis-structures-messages';

export const it = {
  header: {
    subtitle: 'Condividi e completa',
    build: 'Da costruire: {name} ({formula})',
    inspect: 'Da controllare: {name} ({formula})',
    progress: 'Molecola {round}/{total}',
    marking: 'Disegno {round}/{total}',
  },

  instructions: {
    title: 'Come si gioca: Condividi e completa',
    lead: 'Accoppia gli elettroni spaiati.',
    intro:
      'Ogni atomo porta i suoi elettroni esterni sotto forma di punti. Un punto da solo è un elettrone spaiato: cerca un compagno. Due elettroni spaiati di due atomi diversi formano un doppietto di legame, cioè un legame.',
    bullets: [
      'Trascina un punto che lampeggia su un punto che lampeggia di un altro atomo (oppure tocca prima uno e poi l’altro).',
      'Un atomo è completo quando ha 8 punti intorno; l’idrogeno è completo con 2.',
      'Condividi due volte fra gli stessi due atomi e avrai fatto un legame doppio.',
      'La struttura si blocca da sola quando ogni atomo è completo e non resta nessun elettrone spaiato. Non serve nessun pulsante.',
      'Non sai come andare avanti? Premi la lampadina (o la H). Il primo indizio è sempre gratis.',
    ],
    disclaimer:
      'I punti mostrano quanti elettroni esterni ha un atomo, non dove si trovano davvero.',
    // Column 1 is the physical key, named the way an Italian keyboard prints it:
    // «Invio» rather than Enter, while Tab, Esc, H and P are unchanged. Same
    // reasoning that made German write «Leertaste» and French «Entrée».
    keyboard: [
      ['Tab', 'seleziona un atomo'],
      ['← →', 'passano da un elettrone spaiato all’altro'],
      ['Invio', 'comincia un doppietto; Tab + Invio su un altro atomo lo finisce'],
      ['Esc', 'annulla'],
      ['H', 'indizio'],
      ['P', 'pausa'],
    ],
    touch: [
      ['Tocca', 'un elettrone spaiato, poi uno di un altro atomo.'],
      ['Tocca', 'un doppietto di legame per disfarlo.'],
    ],
    glossaryTitle: 'Le parole del gioco',
  },

  guided: {
    stepLabel: 'Passo {step} di {total}',
    h2: [
      'Due atomi di idrogeno. Ognuno ha 1 elettrone esterno: un elettrone spaiato. Trascina uno sull’altro.',
      'Ora condividono un doppietto. Conta intorno a ogni H: 2. L’idrogeno è completo con 2, quindi è un legame singolo, H–H.',
    ],
    h2oStep1:
      'L’ossigeno ha 6 elettroni esterni: due doppietti (che restano fermi) e due elettroni spaiati (che lampeggiano).',
    h2oStep2: 'Accoppia un elettrone spaiato dell’ossigeno con uno dell’idrogeno.',
    h2oStep2After: 'L’ossigeno ora ne ha 7 intorno: ne manca uno.',
    h2oStep3: 'Accoppia l’altro elettrone spaiato dell’ossigeno con l’altro idrogeno.',
    h2oStep4:
      'Ossigeno: 8. Ogni idrogeno: 2. Due doppietti di legame e due doppietti solitari: questa è l’acqua, H–O–H.',
  },

  coach: {
    label: 'Guida',
    loners: {
      one: '{atom}: resta {count} elettrone spaiato. Si accoppia con un elettrone spaiato di un altro atomo.',
      other:
        '{atom}: restano {count} elettroni spaiati. Si accoppiano con gli elettroni spaiati di un altro atomo.',
    },
    // No pronoun: "gli serve" would be safe (every Italian element name is
    // masculine) but the impersonal form needs no such argument.
    needsMore:
      '{atom}: {count} su 8. Serve un altro doppietto di legame. Quale atomo ha ancora un elettrone spaiato?',
    shareAgain:
      '{atom1} e {atom2} hanno tutti e due un elettrone spaiato. Possono condividere di nuovo: così si fa un legame doppio.',
    complete:
      'Ogni atomo è completo e non resta nessun elettrone spaiato. Molecola ottenuta: {name} – {bonds}, {lonePairs}.',
    // A colon label rather than "{element} è nella stessa colonna…": a bare name
    // as the subject of an Italian sentence wants an article the placeholder
    // cannot supply.
    sameGroup:
      '{element}: stessa colonna dell’elemento {analogue}, quindi stesso numero di elettroni esterni. La struttura sarà come questa: {analogueMolecule}.',
    central: 'L’atomo con più elettroni spaiati di solito va al centro.',
    deadEnd:
      '{atom}: {count} su 8, ma nessun altro atomo ha un elettrone spaiato da condividere. Tocca un doppietto di legame per disfarlo e prova con un’altra coppia.',
    isomer:
      'Ogni atomo è completo, ma gli atomi non sono uniti come nella molecola cercata: {name}. Tocca un doppietto di legame per disfarlo e prova un’altra disposizione.',
  },

  counts: {
    sharedPairs: { one: '{count} doppietto di legame', other: '{count} doppietti di legame' },
    lonePairs: { one: '{count} doppietto solitario', other: '{count} doppietti solitari' },
    bonds: { one: '{count} legame', other: '{count} legami' },
  },

  hint: {
    label: 'Indizio',
    tierLabel: 'Indizio {tier} di 3',
    tier1: 'Guarda quali atomi hanno ancora punti che lampeggiano.',
    tier3: 'Accoppia due elettroni spaiati, uno per atomo: {atom1} e {atom2}.',
    tier3Undo: 'Tocca il doppietto di legame fra {atom1} e {atom2} per disfarlo.',
    offerTier2: 'Ancora non lo vedi? Premi di nuovo la lampadina per la strategia.',
    noMoreHints: 'Quello era l’ultimo indizio. Ogni atomo è completo: premi Avanti.',
    inspectTier1:
      'Conta i punti intorno a ogni atomo. Ogni atomo dovrebbe averne 8; l’idrogeno 2.',
    inspectTier2:
      'Guarda prima gli atomi con più legami. È lì che si nascondono i doppietti di troppo o quelli che mancano.',
    inspectTier3: '{atom}: {count}. Toccalo, poi scegli che cosa non va.',
    inspectTier3Correct:
      'Ogni atomo è completo e non avanza niente: premi «Questo disegno è giusto».',
    inspectTier3Repair: 'Accoppia gli elettroni spaiati finché ogni atomo non è di nuovo completo.',
    // Italian *does* inflect "ce n'è" / "ce ne sono" with the count, and this is
    // a plural record, so both forms are written out rather than forced into one
    // invariant shape.
    inspectTier3CountBonds: {
      one: 'Ogni linea fra due atomi è un legame. Ce n’è {count}.',
      other: 'Ogni linea fra due atomi è un legame. Ce ne sono {count}.',
    },
    inspectTier3CountLonePairs: {
      one: 'Ogni coppia di punti che non sta su una linea è un doppietto solitario. Ce n’è {count}.',
      other:
        'Ogni coppia di punti che non sta su una linea è un doppietto solitario. Ce ne sono {count}.',
    },
  },

  error: {
    label: 'Questa mossa no',
    atomFull:
      '{atom}: ha già 8. Quell’atomo non può condividere altro. Cerca un atomo che abbia ancora un elettrone spaiato.',
    hydrogenFull: 'L’idrogeno è completo con 2. Può condividere un solo doppietto.',
    sameAtom:
      'Quei due punti sono dello stesso atomo: formano già un doppietto. Un legame ha bisogno di due atomi diversi.',
    pairedDot:
      'Quel punto fa già parte di un doppietto. Si possono condividere solo gli elettroni spaiati, quelli che lampeggiano.',
  },

  inspect: {
    // "qualcuno della tua classe" is epicene, so Italian needs none of the work
    // German did for "Mitschülerin oder Mitschüler". Written as a noun phrase
    // rather than "Disegnato da…", which would have to agree with the drawing.
    classmate: 'Disegno di qualcuno della tua classe: {name}.',
    prompt: 'Tocca l’atomo che secondo te è sbagliato, oppure di’ che il disegno è giusto.',
    diagnosisPrompt: '{atom}: che cosa non va?',
    diagnosis: {
      tooMany: 'ci sono troppi elettroni intorno a questo atomo',
      tooFew: 'ce ne sono troppo pochi: manca un doppietto solitario',
      hydrogenFull: 'l’idrogeno può condividere un solo doppietto',
      needsDouble: 'questi atomi devono condividere due volte (un legame doppio)',
      leftover: 'è rimasto un elettrone spaiato',
      none: 'nessun errore',
    },
    wrongAtom: '{atom}: {count}. Questo va bene. Cerca un atomo con troppi o troppo pochi.',
    wrongDiagnosis:
      'Non proprio. Conta i punti intorno a quell’atomo – {atom}: {count}. {explanation}',
    explainTooMany: '{atom}: più di {full}. È stato disegnato un doppietto solitario in più.',
    explainTooFew: '{atom}: meno di 8. Manca un doppietto solitario.',
    explainHydrogenFull: 'L’idrogeno ha 4: può condividere un solo doppietto.',
    explainNeedsDouble:
      '{atom1} e {atom2} hanno ancora un elettrone spaiato ciascuno: devono condividere due volte.',
    explainLeftover: '{atom}: è rimasto un elettrone spaiato. È stato disegnato un elettrone in più.',
    correctStructure: 'Esatto: ogni atomo è completo e non avanza niente.',
    missedCorrect:
      'Questo disegno è davvero giusto: ogni atomo è completo. Non tutti i disegni hanno un errore.',
    notCorrect:
      'Non proprio: c’è un atomo che non va. Conta i punti intorno a ogni atomo e tocca quello sbagliato.',
    repair: 'Ora correggilo: accoppia gli elettroni spaiati finché ogni atomo non è completo.',
    repaired: 'Corretto: ogni atomo è di nuovo completo.',
    countBonds: 'Quanti legami ci sono? Tocca ogni doppietto di legame.',
    countLonePairs: 'Quanti doppietti solitari ci sono? Tocca ogni doppietto non condiviso.',
    // "Ne hai contati {given}" would be wrong at 1 (*contato*), so the clitic
    // goes and the participle stops agreeing. Same class of bug as the ledger's
    // "mancano 1" — see docs/i18n/glossary-it.md § Count agreement.
    countWrong: 'Hai contato {given}; sono {actual}. Quelli che ti sono sfuggiti sono evidenziati.',
    countWrongDouble:
      'Hai contato {given}; sono {actual}. Quelli che ti sono sfuggiti sono evidenziati: un legame doppio conta come un legame, ma come due doppietti di legame.',
    countRight: 'Sì: {counted}.',
    // "Contati: {counted}" would agree with whatever noun {counted} carries, so
    // the label names the act instead of the things counted.
    countLabel: 'Conteggio: {counted}',
  },

  success: {
    label: 'Completata',
    // A colon label: "{name} completata" would have to agree with the molecule
    // name, which can be masculine (metano) or feminine (acqua).
    round: 'Molecola completata: {name} – {bondLine}.',
    bonus: 'Bonus senza indizi +{points}',
    points: '+{points}',
  },

  overlay: {
    levelUpBadge: 'Tutti gli atomi completi',
    levelUpTitle: 'Livello superato',
    levelUpSubtitle: 'Non resta nessun elettrone spaiato',
    levelUpDescription: 'Livello {level}: {changes}',
    levelChanges: {
      level2:
        'l’ossigeno, l’azoto e il carbonio portano doppietti solitari che restano fermi, e una molecola su tre è un disegno di classe da controllare.',
      level3:
        'alcuni atomi devono condividere due volte: un legame doppio. La guida ora aspetta che tu chieda.',
      level4: 'gli atomi partono senza posizione. Scegli tu quale va al centro.',
      level5:
        'modalità correzione: sei disegni di classe, niente guida, solo la scala degli indizi.',
    },
    victoryBadge: 'Tutti gli obiettivi raggiunti',
    victoryTitle: 'Strutture di Lewis conquistate',
    victorySubtitle: 'Non resta nessun elettrone spaiato',
    victoryDescription: 'Apri la tua scheda di correzione per rivedere quello che hai costruito.',
    pausedBadge: 'Partita in attesa',
    pausedTitle: 'Gioco in pausa',
    pausedSubtitle: 'Niente va a tempo.',
    pausedDescription: 'La tua struttura è esattamente dove l’hai lasciata.',
  },

  notebook: {
    header: 'Le tue strutture',
    markingHeader: 'La tua scheda di correzione',
    columnMolecule: 'Molecola',
    columnBondLine: 'Formula di struttura',
    columnCounts: 'Legami / doppietti solitari',
    columnHint: 'Livello di indizio',
    columnDiagnosis: 'Diagnosi',
    noHint: 'senza indizi',
    hintTier: 'livello {tier}',
    diagnosisRow: '{label}',
    diagnosisRowFirstTry: '{label} – al primo colpo',
    empty: 'Ancora nessuna struttura.',
  },

  glossary: {
    outerElectron: {
      term: 'elettrone esterno (elettrone di valenza)',
      definition: 'un elettrone del guscio esterno: sono quelli che un atomo condivide',
      // Like Spanish and unlike French, the full phrases work as match words:
      // "elettrone" begins with `e` and ends with `e`, and Italian's accents are
      // final rather than initial — none of these carries one.
      matches: [
        'elettroni esterni',
        'elettrone esterno',
        'elettroni di valenza',
        'elettrone di valenza',
      ],
    },
    unpairedElectron: {
      term: 'elettrone spaiato',
      definition: 'un elettrone esterno senza compagno; solo quelli si possono condividere',
      // Longest phrases first, so a chip covers the whole term where the copy
      // uses it; the bare adjective is kept for a sentence that elides the
      // noun. *dispari* is gone with the game word — it now means only "odd
      // number" to a reader of this page.
      matches: ['elettroni spaiati', 'elettrone spaiato', 'spaiati', 'spaiato'],
    },
    lonePair: {
      term: 'doppietto solitario',
      definition: 'due elettroni esterni che restano su un atomo e non vengono condivisi',
      matches: ['doppietti solitari', 'doppietto solitario'],
    },
    sharedPair: {
      term: 'doppietto di legame (legame)',
      definition:
        'due elettroni, uno per atomo, condivisi fra loro; si disegnano come una linea',
      matches: ['doppietti di legame', 'doppietto di legame', 'legami', 'legame'],
    },
    bondOrder: {
      term: 'legame singolo, doppio, triplo',
      definition: 'uno, due o tre doppietti di legame fra gli stessi due atomi',
      matches: ['legame singolo', 'legame doppio', 'legame triplo'],
    },
    octet: {
      term: 'ottetto',
      definition: 'otto elettroni esterni intorno a un atomo: è completo',
      matches: ['ottetto'],
    },
    duet: {
      // Italian sits with Spanish, between French and German: «la regola del
      // duetto» does circulate in Italian textbooks, so nothing was coined, but
      // it is not as settled as the octet rule. Rated medium. Note what is *not*
      // available: *doppietto*, which is already the lone pair.
      term: 'duetto',
      definition: 'due elettroni esterni intorno all’idrogeno: è completo',
      matches: ['duetto'],
    },
    dot: {
      term: 'punto',
      definition: 'mostra quanti elettroni esterni ci sono, non dove si trovano',
      matches: ['punti', 'punto'],
    },
  },

  ui: {
    nextMolecule: 'Molecola successiva',
    nextDrawing: 'Disegno successivo',
    finishLevel: 'Finisci il livello',
    skipGuide: 'Salta la spiegazione',
    nextStep: 'Avanti',
    thisOneIsCorrect: 'Questo disegno è giusto',
    doneCounting: 'Ho finito di contare',
    startRepair: 'Correggilo',
    openMarkingSheet: 'Apri la scheda di correzione',
    closeMarkingSheet: 'Indietro',
    playAgain: 'Gioca di nuovo',
    supportMode: 'Modalità supporto',
    supportModeHelp:
      'Tiene aperto il pannello della guida a ogni livello. Non abbassa mai la tua precisione.',
    hintButtonA11y: 'Vedi un indizio',
    dismissHintA11y: 'Chiudi l’indizio',
    coachRegionA11y: 'Messaggi della guida',
    canvasLabelA11y: 'Struttura di Lewis: {name}',
    atomNameA11y: '{element}: {count} su {full}',
    atomCounterA11y: '{symbol}: {count} su {full}',
    atomLonerA11y: '{element}, elettrone spaiato {index} di {total}',
    atomLonePairA11y: '{element}, doppietto solitario {index} di {total}',
    atomOrdinal: '{element} {ordinal}',
    // The Level 1 scaffold, off from Level 2. Since 2026-09-19 this is the
    // full formal term in every language: it is no longer stamped beside each
    // dot, but printed once in the canvas legend, so its length is free.
    unpairedLabel: 'elettrone spaiato',
    atomFull: 'completo',
    atomSelectedA11y:
      '{element}: elettrone spaiato selezionato. Ora scegli un elettrone spaiato di un altro atomo.',
    atomInspectTapA11y: '{element} – tocca se questo atomo non va',
    bondSingleA11y: 'Legame singolo fra {atom1} e {atom2}',
    bondDoubleA11y: 'Legame doppio fra {atom1} e {atom2}',
    bondTripleA11y: 'Legame triplo fra {atom1} e {atom2}',
    bondUndoA11y: 'premi per disfare l’ultimo doppietto di legame',
    bondCountA11y: 'premi per contare',
    bondCountedA11y: 'contato',
    livePaired:
      'Doppietto di legame creato fra {atom1} e {atom2}. {name1}: {count1}; {name2}: {count2}.',
    liveUnpaired: 'Doppietto di legame fra {atom1} e {atom2} disfatto.',
    liveLocked: 'Molecola completata: {name}. La struttura è bloccata.',
  },
} satisfies LewisStructuresMessages;

export default it;
