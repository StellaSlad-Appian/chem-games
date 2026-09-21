// src/i18n/game-messages/reaction-balancer/de.ts
//
// Reaktions-Balancer auf Deutsch. Terminologie nach docs/i18n/glossary-de.md:
// Koeffizient (nicht „Vorzahl“), Index (nicht „tiefgestellte Zahl“),
// Edukte / Produkte, ausgleichen (nicht „einrichten“), Atombilanz.
//
// `satisfies ReactionBalancerMessages` typt diese Datei gegen das englische
// Original in src/core-engine/config/games/reaction-balancer-messages.ts: ein
// fehlender Schlüssel ist ein Compile-Fehler, kein stiller Rückfall aufs
// Englische. Niemals `?` oder `Partial<>` ergänzen, damit es kompiliert.

import type { ReactionBalancerMessages } from '@/core-engine/config/games/reaction-balancer-messages';

export const de = {
  header: {
    subtitle: 'Reaktions-Balancer',
    balance: 'Gleiche aus: {name}',
    build: 'Aufstellen und ausgleichen: {name}',
    progress: 'Reaktion {round}/{total}',
    challengeProgress: 'Challenge {round}/{total}',
  },

  instructions: {
    title: 'Spielanleitung: Reaktions-Balancer',
    lead: 'Sorge dafür, dass die Atome zusammenpassen.',
    intro:
      'Bei einer chemischen Reaktion werden Atome nur umgeordnet, nie erzeugt und nie vernichtet – auf beiden Seiten des Reaktionspfeils muss also von jedem Atom gleich viel stehen.',
    bullets: [
      'Die **großen Zahlen** vor einer Formel sind die Koeffizienten. Die änderst du.',
      'Die **kleinen Zahlen** in einer Formel sind die Indizes. Sie sind gesperrt – würdest du sie ändern, wäre es ein anderer Stoff.',
      'Die **Atombilanz** unter dem Pfeil zählt jedes Element links und rechts. Sind alle Zeilen gleich, rastet die Gleichung ein.',
      'Du kommst nicht weiter? Drück auf die **Glühbirne** (oder H). Der erste Tipp ist immer umsonst.',
    ],
    arrow: 'Der Pfeil bedeutet „wird zu“, nicht „ist gleich“.',
    keyboard: [
      ['Tab', 'springt von Verbindung zu Verbindung'],
      ['↑ / ↓', 'ändern einen Koeffizienten'],
      ['0–9', 'Zahl direkt eintippen'],
      ['H', 'Tipp'],
      ['P', 'Pause'],
    ],
    touch: [
      ['Tippen', 'auf ▲ / ▼ einer Karte ändert den Koeffizienten.'],
      ['Tippen', 'auf die Zahl, um sie einzugeben.'],
    ],
    compact: [
      'Ändere die **großen Zahlen** vor einer Formel. Die kleinen sind gesperrt.',
      'Sind alle Zeilen der **Atombilanz** gleich, rastet die Gleichung ein.',
      'Du kommst nicht weiter? Tipp auf die **Glühbirne**. Der erste Tipp ist umsonst.',
    ],
    glossaryTitle: 'Wörter, die im Spiel vorkommen',
  },

  guided: {
    stepLabel: 'Schritt {step} von {total}',
    steps: [
      'Schau auf die Atombilanz. Wasserstoff: 2 links, 2 rechts – ausgeglichen. Sauerstoff: 2 links, 1 rechts. Beim Sauerstoff stimmt es noch nicht.',
      'Die kleine 2 in `O2` dürfen wir nicht ändern – das wäre ein anderer Stoff. Nimm stattdessen mehr Wasser. Drück ▲ bei `H2O`.',
      'Sauerstoff steht jetzt 2 zu 2. Aber sieh dir den Wasserstoff an: 2 links, 4 rechts. Gleichst du ein Element aus, kann ein anderes aus dem Gleichgewicht geraten. Drück ▲ bei `H2`.',
      'Jede Zeile passt: 4 H und 2 O auf jeder Seite. Die Gleichung ist ausgeglichen – `2H2 + O2 -> 2H2O`. Du hast gerade die Masse erhalten.',
    ],
  },

  coach: {
    label: 'Coach',
    imbalance:
      '{element}: {left} links, {right} rechts. Welche Verbindung mit {elementInSentence} könntest du ändern?',
    multiple:
      'Damit stimmt {fixed}, aber {broken} hat sich verändert. Gleichst du ein Element aus, kann ein anderes aus dem Gleichgewicht geraten – schau als Nächstes auf {broken}.',
    balanced: 'Jede Zeile passt. Die Masse bleibt erhalten.',
    balancedNotLowest:
      'Ausgeglichen – und alle Koeffizienten lassen sich durch {k} teilen. Am einfachsten ist `{equation}`.',
  },

  hint: {
    label: 'Tipp',
    tierLabel: 'Tipp {tier} von 3',
    tier1:
      'Fang mit dem Element an, das in den wenigsten Verbindungen vorkommt. Das ist hier {element}.',
    tier3: 'Schreib eine {n} vor `{formula}`. Prüf danach {element} noch einmal.',
    tier3Lower: 'Setz `{formula}` zurück auf {n}. Prüf danach {element} noch einmal.',
    tier3Balanced: 'Alle Zeilen passen schon – die Gleichung ist ausgeglichen.',
    tier1Build:
      'Lies die Beschreibung noch einmal. Sie nennt jeden Stoff, mit dem du startest, und jeden Stoff, der entsteht.',
    tier2Build:
      'Stoffe vor „reagiert“, „verbrennt“ oder „zersetzt sich“ sind Edukte. Stoffe nach „zu“, „bildet“ oder „entsteht“ sind Produkte.',
    tier3BuildReactant: 'Füge {name} (`{formula}`) als Edukt hinzu.',
    tier3BuildProduct: 'Füge {name} (`{formula}`) als Produkt hinzu.',
  },
  stuck: {
    offer: 'Brauchst du einen größeren Tipp? Drück noch einmal auf die Glühbirne.',
  },

  error: {
    label: 'So nicht',
    zero: 'Ein Koeffizient kann nicht 0 sein – dann wäre `{formula}` gar nicht mehr dabei.',
    max: 'So große Koeffizienten sind ein Zeichen, es mit kleineren Zahlen zu versuchen. Ziel ist das einfachste Verhältnis.',
    subscriptTap:
      'Die Indizes sind gesperrt. `H2O2` ist Wasserstoffperoxid, nicht Wasser – ändere lieber die große Zahl.',
    notANumber: 'Koeffizienten sind ganze Zahlen ab 1. Tipp eine Zahl ein oder nimm ▲ und ▼.',
  },

  challenge: {
    label: 'Challenge',
    intro: 'Lies die Beschreibung und stell die Gleichung auf, bevor du sie ausgleichst.',
    pickerLabel: 'Verbindungen',
    sideLabel: 'Hinzufügen zu',
    reactants: 'Edukte',
    products: 'Produkte',
    placeholderReactant: 'Edukt hinzufügen',
    placeholderProduct: 'Produkt hinzufügen',
    notInReaction:
      '{name} kommt in dieser Reaktion nicht vor. Lies die Beschreibung noch einmal – welche Stoffe nennt sie?',
    wrongSideProduct:
      '{name} entsteht bei dieser Reaktion und gehört deshalb rechts vom Pfeil, auf die Produktseite.',
    wrongSideReactant:
      '{name} wird bei dieser Reaktion verbraucht und gehört deshalb links vom Pfeil, auf die Eduktseite.',
    built: 'Das ist die Gleichung. Jetzt gleich sie aus.',
    addAsReactantA11y: '{name}, {formula}, als Edukt hinzufügen',
    addAsProductA11y: '{name}, {formula}, als Produkt hinzufügen',
    removeA11y: '{name}, {formula}, entfernen',
    tileA11y: '{name}, {formula}',
  },

  success: {
    label: 'Ausgeglichen',
    round: 'Ausgeglichen! `{equation}`',
    points: '+{points}',
    bonus: 'Bonus für die einfachste Form +{points}',
  },

  overlay: {
    levelUpBadge: 'Masse erhalten',
    levelUpTitle: 'Level geschafft',
    levelUpSubtitle: 'Jedes Atom stimmt',
    levelUpDescription: 'Level {level} bringt {changes}.',
    levelChanges: {
      level2:
        'Reaktionen, bei denen ein Element aus dem Gleichgewicht gerät, während du ein anderes ausgleichst – und die nächste Zeile ist nicht mehr hervorgehoben',
      level3:
        'mehratomige Ionen, die ersten Klammern und Reaktionen mit vier Verbindungen; der Coach wartet jetzt, bis du fragst, und statt der Teilchen siehst du Formeln',
      level4:
        'größere Kohlenwasserstoffe und doppelte Verdrängungen mit vier Verbindungen; die Atombilanz bleibt zu, bis du sie öffnest',
    },
    victoryBadge: 'Alle Ziele erreicht',
    victoryTitle: 'Ausgleichen gemeistert',
    victorySubtitle: 'Jedes Atom stimmt',
    victoryDescription: 'Probier die Challenge oder öffne dein Laborheft.',
    challengeBadge: 'Challenge geschafft',
    challengeTitle: 'Gleichungen aufgestellt und ausgeglichen',
    challengeSubtitle: 'Von Worten zu Symbolen',
    challengeDescription: 'Öffne dein Laborheft und sieh dir alle Gleichungen an, die du ausgeglichen hast.',
    pausedBadge: 'Sitzung angehalten',
    pausedTitle: 'Spiel pausiert',
    pausedSubtitle: 'Nichts läuft auf Zeit.',
    pausedDescription: 'Deine Koeffizienten stehen genau da, wo du sie gelassen hast.',
  },

  notebook: {
    header: 'Deine ausgeglichenen Gleichungen',
    columnHint: 'Tipp-Stufe',
    columnPoints: 'Punkte',
    noHint: 'ohne Tipp',
    hintTier: 'Stufe {tier}',
    lowestTerms: 'gleich in der einfachsten Form',
    simplified: 'durch {k} gekürzt',
    challenge: 'aus Worten aufgestellt',
    empty: 'Noch keine Gleichungen.',
  },

  ledger: {
    title: 'Atombilanz',
    left: 'Links',
    right: 'Rechts',
    statusA11y: 'Stand',
    row: '{element}: {left} links, {right} rechts',
    balancedRow: 'ausgeglichen',
    needsMoreLeft: 'links fehlen noch {count}',
    needsMoreRight: 'rechts fehlen noch {count}',
    allBalanced: 'Jede Zeile passt.',
    show: 'Atombilanz anzeigen',
    hide: 'Atombilanz ausblenden',
    showCost: 'Wenn du die Atombilanz in diesem Level öffnest, verlierst du den Bonus für die einfachste Form.',
    nextUp: 'gleich als Nächstes diese Zeile aus',
  },
  beam: {
    label: 'Relative Masse vorher / nachher',
    readout: 'Relative Masse: {left} vorher, {right} nachher.',
    level: 'Die Waage steht waagerecht.',
    tipsLeft: 'Die Waage neigt sich nach links.',
    tipsRight: 'Die Waage neigt sich nach rechts.',
  },
  card: {
    coefficientA11y: 'Koeffizient für {name}, {formula}',
    increaseA11y: '{name} erhöhen',
    decreaseA11y: '{name} verringern',
    formulaTapA11y: '{name} – die Indizes sind gesperrt',
    clustersA11y: { one: '{count} Molekül {name}', other: '{count} Moleküle {name}' },
    reactants: 'Edukte',
    products: 'Produkte',
  },

  glossary: {
    coefficient: {
      term: 'Koeffizient',
      definition: 'die große Zahl vor einer Formel; sie vervielfacht das ganze Molekül',
      matches: ['Koeffizienten', 'Koeffizient'],
    },
    subscript: {
      term: 'Index',
      definition: 'die kleine Zahl in einer Formel; sie sagt, wie viele Atome in einem Molekül stecken',
      matches: ['Indizes', 'Index'],
    },
    reactant: {
      term: 'Edukt',
      definition: 'der Stoff, mit dem du startest (links vom Pfeil)',
      matches: ['Edukte', 'Edukt'],
    },
    product: {
      term: 'Produkt',
      definition: 'der Stoff, der entsteht (rechts vom Pfeil)',
      matches: ['Produkte', 'Produkt'],
    },
    conserved: {
      term: 'Massenerhaltung',
      definition: 'Atome gehen bei einer Reaktion nie verloren und kommen nie dazu',
      matches: ['erhalten', 'Massenerhaltung'],
    },
    stateSymbols: {
      term: '(s) (l) (g) (aq)',
      definition: 'fest, flüssig, gasförmig, in Wasser gelöst',
      matches: ['Zustandssymbole', 'Zustandssymbol'],
    },
  },

  ui: {
    nextReaction: 'Nächste Reaktion',
    finishLevel: 'Level abschließen',
    skipGuide: 'Das kenne ich schon',
    nextStep: 'Weiter',
    tryChallenge: 'Challenge ausprobieren',
    openNotebook: 'Laborheft öffnen',
    closeNotebook: 'Zurück',
    playAgain: 'Noch einmal spielen',
    supportMode: 'Unterstützungsmodus',
    supportModeHelp:
      'Lässt den Coach und die Atombilanz in jedem Level an. Deine Trefferquote wird dadurch nie schlechter.',
    hintButtonA11y: 'Tipp anzeigen',
    dismissHintA11y: 'Tipp schließen',
    coachRegionA11y: 'Nachrichten vom Coach',
    observation: 'Was du sehen würdest',
    equationLabelA11y: 'Gleichung für {name}',
    liveChanged: '{name} steht jetzt auf {n}.',
    liveLocked: 'Ausgeglichen. {equation}. Die Gleichung ist eingerastet.',
    liveBuilt: 'Gleichung aufgestellt. Jetzt gleich sie aus.',
  },
  // The reaction-class badge. Terms from docs/i18n/glossary-de.md § reaction
  // types; "Fällung" is the bare noun to match the English badge's register,
  // where the glossary's full phrase is "Fällungsreaktion".
  reactionType: {
    Synthesis: 'Synthese',
    Decomposition: 'Zersetzung',
    'Single Replacement': 'Einfache Verdrängung',
    'Double Replacement': 'Doppelte Verdrängung',
    Combustion: 'Verbrennung',
    'Acid-Base': 'Säure-Base',
    // International, and what a German textbook writes: Redoxreaktion.
    Redox: 'Redox',
    Precipitation: 'Fällung',
  },
} satisfies ReactionBalancerMessages;

export default de;
