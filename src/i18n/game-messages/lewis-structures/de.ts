// src/i18n/game-messages/lewis-structures/de.ts
//
// Teilen bis voll (Lewis-Formeln) auf Deutsch. „Einzelelektron“ ist das
// Spielwort für ein ungepaartes Außenelektron – so umgangssprachlich wie das
// englische „loner“, aber eindeutig chemisch. Der Fachbegriff „ungepaartes
// Elektron“ steht im Glossar daneben, und auf der Zeichenfläche steht nur
// „einzeln“. Fachbegriffe sonst nach docs/i18n/glossary-de.md: Lewis-Formel,
// freies Elektronenpaar, bindendes Elektronenpaar, Atombindung, Oktettregel,
// Valenzelektronen.
//
// `satisfies LewisStructuresMessages` typt diese Datei gegen das englische
// Original in src/core-engine/config/games/lewis-structures-messages.ts: ein
// fehlender Schlüssel ist ein Compile-Fehler, kein stiller Rückfall aufs
// Englische. Niemals `?` oder `Partial<>` ergänzen, damit es kompiliert.

import type { LewisStructuresMessages } from '@/core-engine/config/games/lewis-structures-messages';

export const de = {
  header: {
    subtitle: 'Teilen bis voll',
    build: 'Bau: {name} ({formula})',
    inspect: 'Prüf nach: {name} ({formula})',
    progress: 'Molekül {round}/{total}',
    marking: 'Zeichnung {round}/{total}',
  },

  instructions: {
    title: 'Spielanleitung: Teilen bis voll',
    lead: 'Bring die Einzelelektronen zu Paaren zusammen.',
    intro:
      'Jedes Atom bringt seine Außenelektronen als Punkte mit. Ein Punkt, der allein steht, ist ein Einzelelektron – es sucht einen Partner. Zwei Einzelelektronen von zwei verschiedenen Atomen ergeben ein bindendes Elektronenpaar, also eine Bindung.',
    bullets: [
      'Zieh einen pulsierenden Punkt auf einen pulsierenden Punkt eines anderen Atoms (oder tippe erst den einen an, dann den anderen).',
      'Ein Atom ist voll, wenn 8 Punkte um es herum stehen – Wasserstoff ist schon bei 2 voll.',
      'Teilen sich dieselben zwei Atome zweimal, hast du eine Doppelbindung gebaut.',
      'Die Formel rastet von selbst ein, sobald jedes Atom voll ist und kein Einzelelektron mehr übrig ist. Du brauchst keinen Knopf.',
      'Du kommst nicht weiter? Drück auf die Glühbirne (oder H). Der erste Tipp ist immer umsonst.',
    ],
    disclaimer:
      'Die Punkte zeigen, wie viele Außenelektronen ein Atom hat – nicht, wo sie wirklich sind.',
    keyboard: [
      ['Tab', 'wählt ein Atom aus'],
      ['← →', 'gehen zu seinen Einzelelektronen'],
      ['Enter', 'beginnt ein Paar; Tab + Enter auf einem anderen Atom macht es fertig'],
      ['Esc', 'bricht ab'],
      ['H', 'Tipp'],
      ['P', 'Pause'],
    ],
    touch: [
      ['Tippen', 'auf ein Einzelelektron, dann auf ein Einzelelektron eines anderen Atoms.'],
      ['Tippen', 'auf ein bindendes Elektronenpaar löst es wieder.'],
    ],
    glossaryTitle: 'Wörter, die im Spiel vorkommen',
  },

  guided: {
    stepLabel: 'Schritt {step} von {total}',
    h2: [
      'Zwei Wasserstoffatome. Jedes hat 1 Außenelektron – ein Einzelelektron. Zieh den einen auf den anderen.',
      'Jetzt teilen sie sich ein Paar. Zähl um jedes H herum: 2. Wasserstoff ist bei 2 voll – das ist eine Einfachbindung, H–H.',
    ],
    h2oStep1:
      'Sauerstoff hat 6 Außenelektronen: zwei Paare (die bleiben, wo sie sind) und zwei Einzelelektronen (die pulsieren).',
    h2oStep2: 'Bring ein Einzelelektron des Sauerstoffs mit einem Einzelelektron des Wasserstoffs zusammen.',
    h2oStep2After: 'Um den Sauerstoff stehen jetzt 7 – eines fehlt noch.',
    h2oStep3: 'Bring das andere Einzelelektron des Sauerstoffs mit dem anderen Wasserstoff zusammen.',
    h2oStep4:
      'Sauerstoff: 8. Jeder Wasserstoff: 2. Zwei bindende und zwei freie Elektronenpaare – das ist Wasser, H–O–H.',
  },

  coach: {
    label: 'Coach',
    loners: {
      one: '{atom} hat noch {count} Einzelelektron. Einzelelektronen paaren sich mit Einzelelektronen eines anderen Atoms.',
      other:
        '{atom} hat noch {count} Einzelelektronen. Einzelelektronen paaren sich mit Einzelelektronen eines anderen Atoms.',
    },
    needsMore:
      '{atom} hat {count} von 8. Es braucht noch ein bindendes Elektronenpaar – welches Atom hat noch ein Einzelelektron?',
    shareAgain:
      '{atom1} und {atom2} haben beide noch ein Einzelelektron. Sie können noch einmal teilen – das ergibt eine Doppelbindung.',
    complete:
      'Jedes Atom ist voll und kein Einzelelektron ist übrig. Das ist {name}: {bonds}, {lonePairs}.',
    sameGroup:
      '{element} steht in derselben Gruppe wie {analogue} und hat deshalb gleich viele Außenelektronen. Erwarte dieselbe Struktur wie bei {analogueMolecule}.',
    central: 'Das Atom mit den meisten Einzelelektronen steht meistens in der Mitte.',
    deadEnd:
      '{atom} hat {count} von 8, aber kein anderes Atom hat noch ein Einzelelektron zum Teilen. Tipp auf ein bindendes Elektronenpaar, um es zu lösen, und versuch es mit einem anderen Partner.',
    isomer:
      'Jedes Atom ist voll, aber die Atome hängen anders zusammen als bei {name}. Tipp auf ein bindendes Elektronenpaar, um es zu lösen, und versuch eine andere Anordnung.',
  },

  counts: {
    sharedPairs: {
      one: '{count} bindendes Elektronenpaar',
      other: '{count} bindende Elektronenpaare',
    },
    lonePairs: { one: '{count} freies Elektronenpaar', other: '{count} freie Elektronenpaare' },
    bonds: { one: '{count} Bindung', other: '{count} Bindungen' },
  },

  hint: {
    label: 'Tipp',
    tierLabel: 'Tipp {tier} von 3',
    tier1: 'Schau, bei welchen Atomen noch Punkte pulsieren.',
    tier3: 'Bring das Einzelelektron an {atom1} mit dem Einzelelektron an {atom2} zusammen.',
    tier3Undo: 'Tipp auf das bindende Elektronenpaar zwischen {atom1} und {atom2}, um es zu lösen.',
    offerTier2: 'Immer noch fest? Drück noch einmal auf die Glühbirne, dann kommt die Strategie.',
    noMoreHints: 'Das war der letzte Tipp. Jedes Atom ist voll – drück auf Weiter.',
    inspectTier1:
      'Zähl die Punkte um jedes Atom. Jedes Atom sollte 8 haben – Wasserstoff 2.',
    inspectTier2:
      'Schau zuerst die Atome mit den meisten Bindungen an. Dort verstecken sich zusätzliche oder fehlende Paare.',
    inspectTier3: '{atom} hat {count}. Tipp es an und wähl dann aus, was nicht stimmt.',
    inspectTier3Correct:
      'Jedes Atom ist voll und nichts ist übrig – drück auf „Die stimmt“.',
    inspectTier3Repair: 'Bring die Einzelelektronen zu Paaren zusammen, bis jedes Atom wieder voll ist.',
    inspectTier3CountBonds: {
      one: 'Jede Linie zwischen zwei Atomen ist eine Bindung. Hier ist es {count}.',
      other: 'Jede Linie zwischen zwei Atomen ist eine Bindung. Hier sind es {count}.',
    },
    inspectTier3CountLonePairs: {
      one: 'Jedes Punktepaar, das nicht auf einer Linie liegt, ist ein freies Elektronenpaar. Hier ist es {count}.',
      other:
        'Jedes Punktepaar, das nicht auf einer Linie liegt, ist ein freies Elektronenpaar. Hier sind es {count}.',
    },
  },

  error: {
    label: 'So nicht',
    atomFull:
      '{atom} hat schon 8 – mehr kann dieses Atom nicht teilen. Nimm ein Atom, das noch ein Einzelelektron hat.',
    hydrogenFull: 'Wasserstoff ist bei 2 voll. Er kann nur ein Paar teilen.',
    sameAtom:
      'Die beiden Punkte gehören zum selben Atom – sie sind schon ein Paar. Für eine Bindung braucht es zwei verschiedene Atome.',
    pairedDot:
      'Dieser Punkt gehört schon zu einem Paar. Nur Einzelelektronen (die pulsierenden) lassen sich teilen.',
  },

  inspect: {
    classmate: 'Gezeichnet von jemandem aus deiner Klasse: {name}.',
    prompt: 'Tipp das Atom an, bei dem etwas nicht stimmt – oder sag, dass die Zeichnung stimmt.',
    diagnosisPrompt: 'Was stimmt bei {atom} nicht?',
    diagnosis: {
      tooMany: 'zu viele Elektronen um dieses Atom',
      tooFew: 'zu wenige – ein freies Elektronenpaar fehlt',
      hydrogenFull: 'Wasserstoff kann nur ein Paar teilen',
      needsDouble: 'diese Atome müssen zweimal teilen (eine Doppelbindung)',
      leftover: 'ein ungepaartes Elektron ist übrig geblieben',
      none: 'kein Fehler',
    },
    wrongAtom:
      '{atom} hat {count} – das passt schon. Schau dir ein Atom mit zu wenigen oder zu vielen an.',
    wrongDiagnosis: 'Nicht ganz. Zähl die Punkte um {atom}: {count}. {explanation}',
    explainTooMany: '{atom} hat mehr als {full} – da wurde ein freies Elektronenpaar zu viel gezeichnet.',
    explainTooFew: '{atom} hat weniger als 8 – ein freies Elektronenpaar fehlt.',
    explainHydrogenFull: 'Wasserstoff hat 4 – er kann nur ein Paar teilen.',
    explainNeedsDouble:
      '{atom1} und {atom2} haben beide noch ein Einzelelektron – sie müssen zweimal teilen.',
    explainLeftover: 'Bei {atom} ist ein Einzelelektron übrig – da wurde ein Elektron zu viel gezeichnet.',
    correctStructure: 'Richtig – jedes Atom ist voll und nichts ist übrig.',
    missedCorrect:
      'Diese hier stimmt wirklich: Jedes Atom ist voll. Nicht in jeder Zeichnung steckt ein Fehler.',
    notCorrect:
      'Nicht ganz – bei einem Atom stimmt es nicht. Zähl die Punkte um jedes Atom und tipp das an, bei dem es nicht passt.',
    repair: 'Jetzt reparier sie: Bring die Einzelelektronen zu Paaren zusammen, bis jedes Atom voll ist.',
    repaired: 'Repariert – jedes Atom ist wieder voll.',
    countBonds: 'Wie viele Bindungen sind es? Tipp jedes bindende Elektronenpaar an.',
    countLonePairs: 'Wie viele freie Elektronenpaare sind es? Tipp jedes Paar an, das nicht geteilt wird.',
    countWrong:
      'Du hast {given} gezählt; es sind {actual}. Die, die du übersehen hast, sind hervorgehoben.',
    countWrongDouble:
      'Du hast {given} gezählt; es sind {actual}. Die, die du übersehen hast, sind hervorgehoben – eine Doppelbindung zählt als eine Bindung, aber als zwei bindende Elektronenpaare.',
    countRight: 'Ja – {counted}.',
    countLabel: 'Gezählt: {counted}',
  },

  success: {
    label: 'Fertig',
    round: '{name} fertig – {bondLine}.',
    bonus: 'Bonus ohne Tipp +{points}',
    points: '+{points}',
  },

  overlay: {
    levelUpBadge: 'Alle Atome voll',
    levelUpTitle: 'Level geschafft',
    levelUpSubtitle: 'Jedes Einzelelektron hat einen Partner',
    levelUpDescription: 'Level {level}: {changes}',
    levelChanges: {
      level2:
        'Sauerstoff, Stickstoff und Kohlenstoff bringen freie Elektronenpaare mit, die bleiben, wo sie sind – und jedes dritte Molekül ist eine Zeichnung aus deiner Klasse zum Nachprüfen.',
      level3:
        'manche Atome müssen zweimal teilen – eine Doppelbindung. Der Coach wartet jetzt, bis du fragst.',
      level4: 'die Atome liegen am Anfang lose herum. Du entscheidest, welches in die Mitte kommt.',
      level5: 'Korrekturmodus – sechs Zeichnungen aus deiner Klasse, kein Coach, nur die Tipp-Leiter.',
    },
    victoryBadge: 'Alle Ziele erreicht',
    victoryTitle: 'Lewis-Formeln gemeistert',
    victorySubtitle: 'Jedes Einzelelektron hat einen Partner',
    victoryDescription: 'Öffne deinen Korrekturbogen oder probier als Nächstes Bond Builder.',
    pausedBadge: 'Sitzung angehalten',
    pausedTitle: 'Spiel pausiert',
    pausedSubtitle: 'Nichts läuft auf Zeit.',
    pausedDescription: 'Deine Formel steht genau da, wo du sie gelassen hast.',
  },

  notebook: {
    header: 'Deine Lewis-Formeln',
    markingHeader: 'Dein Korrekturbogen',
    columnMolecule: 'Molekül',
    columnBondLine: 'Strichformel',
    columnCounts: 'Bindungen / freie Elektronenpaare',
    columnHint: 'Tipp-Stufe',
    columnDiagnosis: 'Befund',
    noHint: 'ohne Tipp',
    hintTier: 'Stufe {tier}',
    diagnosisRow: '{label}',
    diagnosisRowFirstTry: '{label} – auf Anhieb',
    empty: 'Noch keine Lewis-Formeln.',
  },

  glossary: {
    outerElectron: {
      term: 'Außenelektron (Valenzelektron)',
      definition: 'ein Elektron auf der äußersten Schale – genau die teilt ein Atom',
      matches: ['Außenelektronen', 'Außenelektron', 'Valenzelektronen', 'Valenzelektron'],
    },
    loner: {
      term: 'Einzelelektron (ungepaartes Elektron)',
      definition: 'ein Außenelektron ohne Partner; nur Einzelelektronen lassen sich teilen',
      matches: ['Einzelelektronen', 'Einzelelektron', 'ungepaarte Elektronen', 'ungepaartes Elektron'],
    },
    lonePair: {
      term: 'freies Elektronenpaar',
      definition: 'zwei Außenelektronen, die bei einem Atom bleiben und nicht geteilt werden',
      matches: ['freie Elektronenpaare', 'freies Elektronenpaar'],
    },
    sharedPair: {
      term: 'bindendes Elektronenpaar (Atombindung)',
      definition:
        'zwei Elektronen, eines von jedem Atom, die sich beide teilen – gezeichnet als Strich',
      matches: ['bindende Elektronenpaare', 'bindendes Elektronenpaar', 'Bindungen', 'Bindung'],
    },
    bondOrder: {
      term: 'Einfach-, Doppel- und Dreifachbindung',
      definition: 'ein, zwei oder drei bindende Elektronenpaare zwischen denselben zwei Atomen',
      matches: ['Einfachbindung', 'Doppelbindung', 'Dreifachbindung'],
    },
    octet: {
      term: 'Oktett',
      definition: 'acht Außenelektronen um ein Atom – dann ist es voll',
      matches: ['Oktett'],
    },
    duet: {
      term: 'Duett',
      definition: 'zwei Außenelektronen um den Wasserstoff – dann ist er voll',
      matches: ['Duett'],
    },
    dot: {
      term: 'Punkt',
      definition: 'zeigt, wie viele Außenelektronen es sind, nicht wo sie liegen',
      matches: ['Punkte', 'Punkt'],
    },
  },

  ui: {
    nextMolecule: 'Nächstes Molekül',
    nextDrawing: 'Nächste Zeichnung',
    finishLevel: 'Level abschließen',
    skipGuide: 'Erklärung überspringen',
    nextStep: 'Weiter',
    thisOneIsCorrect: 'Die stimmt',
    doneCounting: 'Fertig gezählt',
    startRepair: 'Reparieren',
    openMarkingSheet: 'Korrekturbogen öffnen',
    closeMarkingSheet: 'Zurück',
    playAgain: 'Noch einmal spielen',
    supportMode: 'Unterstützungsmodus',
    supportModeHelp:
      'Lässt den Coach in jedem Level offen. Deine Trefferquote wird dadurch nie schlechter.',
    hintButtonA11y: 'Tipp anzeigen',
    dismissHintA11y: 'Tipp schließen',
    coachRegionA11y: 'Nachrichten vom Coach',
    canvasLabelA11y: 'Lewis-Formel von {name}',
    atomNameA11y: '{element}: {count} von {full}',
    atomCounterA11y: '{symbol}: {count} von {full}',
    atomLonerA11y: '{element}, Einzelelektron {index} von {total}',
    atomLonePairA11y: '{element}, freies Elektronenpaar {index} von {total}',
    atomOrdinal: '{element} {ordinal}',
    lonerLabel: 'einzeln',
    atomFull: 'voll',
    atomSelectedA11y:
      'Einzelelektron an {element} ausgewählt. Wähl jetzt ein Einzelelektron an einem anderen Atom.',
    atomInspectTapA11y: '{element} – antippen, wenn bei diesem Atom etwas nicht stimmt',
    bondSingleA11y: 'Einfachbindung zwischen {atom1} und {atom2}',
    bondDoubleA11y: 'Doppelbindung zwischen {atom1} und {atom2}',
    bondTripleA11y: 'Dreifachbindung zwischen {atom1} und {atom2}',
    bondUndoA11y: 'drücken, um das letzte bindende Elektronenpaar zu lösen',
    bondCountA11y: 'drücken zum Zählen',
    bondCountedA11y: 'gezählt',
    livePaired:
      'Zwischen {atom1} und {atom2} ist ein bindendes Elektronenpaar entstanden. {name1} hat jetzt {count1}; {name2} hat {count2}.',
    liveUnpaired: 'Das bindende Elektronenpaar zwischen {atom1} und {atom2} ist gelöst.',
    liveLocked: '{name} fertig. Die Formel ist eingerastet.',
  },
} satisfies LewisStructuresMessages;

export default de;
