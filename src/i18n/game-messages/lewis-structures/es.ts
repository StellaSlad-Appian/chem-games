// src/i18n/game-messages/lewis-structures/es.ts
//
// Comparte y completa (estructuras de Lewis), en español (es-ES).
//
// «Impar» es la palabra del juego para un electrón externo sin pareja. El
// término escolar «electrón desapareado» aparece a su lado en el glosario, y
// sobre la zona de dibujo se escribe también «impar», porque en español la
// palabra del juego ya es el adjetivo y no hay nada que acortar.
//
// **Por qué NO «solitario».** El español llama *par solitario* a un lone pair.
// Un juego que enseña precisamente la diferencia entre un electrón suelto y dos
// electrones que van juntos no puede llamar *un solitario* al primero y *un par
// solitario* al segundo: las dos frases se diferencian en una palabra, quieren
// decir cosas opuestas y aparecen en líneas de la guía contiguas. Calcar aquí el
// francés (*solitaire*) habría enviado un error pedagógico real. El
// razonamiento completo, y los candidatos descartados (libre, suelto, soltero,
// desparejado), están en docs/i18n/glossary-es.md § El «loner».
//
// Otros términos fijados por el glosario: par solitario (y no «par libre»), par
// enlazante (y no «par compartido», que choca con el verbo *compartir* del
// propio título), enlace covalente, estructura de Lewis, regla del octeto,
// regla del dueto, electrones externos / electrones de valencia, fórmula
// desarrollada, pista (y no «indicio» ni «consejo»).
//
// Dos cosas propias del español:
//
//   * Ningún artículo puede preceder a un hueco de nombre ({atom}, {name}),
//     porque el artículo depende del género del nombre (el oxígeno pero la
//     glucosa) y porque *de + el* se contrae obligatoriamente en *del*. De ahí
//     la fórmula «nombre + dos puntos», empleada en casi todas las líneas de la
//     guía. Tampoco se usa ningún pronombre: *la plata* es femenino, así que no
//     hay un «él» seguro para todos los elementos.
//   * A diferencia del francés, las palabras de `matches` no necesitan ningún
//     apaño: el acento español es interior, no inicial, así que *electrón*
//     empieza por `e` y termina en `n` y el `\b` ASCII del buscador las
//     encuentra enteras.
//
// `satisfies LewisStructuresMessages` tipa este archivo contra el original
// inglés de src/core-engine/config/games/lewis-structures-messages.ts: una clave
// que falte es un error de compilación, no una vuelta silenciosa al inglés.
// Nunca añadas `?` ni `Partial<>` para que compile.

import type { LewisStructuresMessages } from '@/core-engine/config/games/lewis-structures-messages';

export const es = {
  header: {
    subtitle: 'Comparte y completa',
    build: 'Para construir: {name} ({formula})',
    inspect: 'Para revisar: {name} ({formula})',
    progress: 'Molécula {round}/{total}',
    marking: 'Dibujo {round}/{total}',
  },

  instructions: {
    title: 'Cómo jugar: Comparte y completa',
    lead: 'Empareja los impares.',
    intro:
      'Cada átomo trae sus electrones externos en forma de puntos. Un punto que está solo es un impar: busca pareja. Dos impares de dos átomos distintos forman un par enlazante, es decir, un enlace.',
    bullets: [
      'Arrastra un punto que parpadea hasta un punto que parpadea de otro átomo (o toca uno y luego el otro).',
      'Un átomo está completo cuando tiene 8 puntos alrededor; el hidrógeno está completo con 2.',
      'Comparte dos veces entre los dos mismos átomos y habrás hecho un enlace doble.',
      'La estructura se bloquea sola cuando cada átomo está completo y no queda ningún impar. No hace falta ningún botón.',
      '¿No sabes por dónde seguir? Pulsa la bombilla (o la H). La primera pista siempre es gratis.',
    ],
    disclaimer:
      'Los puntos muestran cuántos electrones externos tiene un átomo, no dónde están en realidad.',
    // Column 1 is the physical key, named the way a Spanish keyboard prints it:
    // «Intro» rather than Enter, while Tab, Esc, H and P are unchanged. Same
    // reasoning that made German write «Leertaste» and French «Entrée».
    keyboard: [
      ['Tab', 'selecciona un átomo'],
      ['← →', 'pasan de un impar a otro'],
      ['Intro', 'empieza un par; Tab + Intro en otro átomo lo termina'],
      ['Esc', 'cancela'],
      ['H', 'pista'],
      ['P', 'pausa'],
    ],
    touch: [
      ['Toca', 'un impar y luego un impar de otro átomo.'],
      ['Toca', 'un par enlazante para deshacerlo.'],
    ],
    glossaryTitle: 'Las palabras del juego',
  },

  guided: {
    stepLabel: 'Paso {step} de {total}',
    h2: [
      'Dos átomos de hidrógeno. Cada uno tiene 1 electrón externo: un impar. Arrastra uno sobre el otro.',
      'Ahora comparten un par. Cuenta alrededor de cada H: 2. El hidrógeno está completo con 2, así que es un enlace simple, H–H.',
    ],
    h2oStep1:
      'El oxígeno tiene 6 electrones externos: dos pares (que se quedan quietos) y dos impares (que parpadean).',
    h2oStep2: 'Empareja un impar del oxígeno con un impar del hidrógeno.',
    h2oStep2After: 'El oxígeno tiene ya 7 alrededor; le falta uno.',
    h2oStep3: 'Empareja el otro impar del oxígeno con el otro hidrógeno.',
    h2oStep4:
      'Oxígeno: 8. Cada hidrógeno: 2. Dos pares enlazantes y dos pares solitarios: eso es el agua, H–O–H.',
  },

  coach: {
    label: 'Guía',
    loners: {
      one: '{atom}: queda {count} impar. Un impar se empareja con un impar de otro átomo.',
      other:
        '{atom}: quedan {count} impares. Los impares se emparejan con impares de otro átomo.',
    },
    needsMore:
      '{atom}: {count} de 8. Le falta otro par enlazante. ¿Qué átomo tiene todavía un impar?',
    shareAgain:
      '{atom1} y {atom2} tienen los dos un impar. Pueden compartir otra vez: eso hace un enlace doble.',
    complete:
      'Cada átomo está completo y no queda ningún impar. Molécula obtenida: {name} – {bonds}, {lonePairs}.',
    sameGroup:
      '{element} está en la misma columna que el elemento {analogue}, así que tiene el mismo número de electrones externos. La estructura será como esta: {analogueMolecule}.',
    central: 'El átomo que tiene más impares suele ir en el centro.',
    deadEnd:
      '{atom}: {count} de 8, pero ningún otro átomo tiene un impar que compartir. Toca un par enlazante para deshacerlo y prueba con otra pareja.',
    isomer:
      'Cada átomo está completo, pero los átomos no están unidos como en la molécula buscada: {name}. Toca un par enlazante para deshacerlo y prueba otra disposición.',
  },

  counts: {
    sharedPairs: { one: '{count} par enlazante', other: '{count} pares enlazantes' },
    lonePairs: { one: '{count} par solitario', other: '{count} pares solitarios' },
    bonds: { one: '{count} enlace', other: '{count} enlaces' },
  },

  hint: {
    label: 'Pista',
    tierLabel: 'Pista {tier} de 3',
    tier1: 'Mira qué átomos tienen todavía puntos que parpadean.',
    tier3: 'Empareja dos impares, uno en cada átomo: {atom1} y {atom2}.',
    tier3Undo: 'Toca el par enlazante entre {atom1} y {atom2} para deshacerlo.',
    offerTier2: '¿Sigues sin verlo? Pulsa otra vez la bombilla para ver la estrategia.',
    noMoreHints: 'Esa era la última pista. Cada átomo está completo: pulsa Siguiente.',
    inspectTier1:
      'Cuenta los puntos alrededor de cada átomo. Cada átomo debería tener 8; el hidrógeno, 2.',
    inspectTier2:
      'Mira primero los átomos con más enlaces. Ahí es donde se esconden los pares que sobran o faltan.',
    inspectTier3: '{atom}: {count}. Tócalo y luego elige qué está mal.',
    inspectTier3Correct:
      'Cada átomo está completo y no sobra nada: pulsa «Este dibujo es correcto».',
    inspectTier3Repair: 'Empareja los impares hasta que cada átomo vuelva a estar completo.',
    // Spanish does not inflect "hay {count}" with the count, so the two forms
    // coincide. Both are supplied rather than dropping `one`, so the review
    // table has a row for each English form.
    inspectTier3CountBonds: {
      one: 'Cada raya entre dos átomos es un enlace. Hay {count}.',
      other: 'Cada raya entre dos átomos es un enlace. Hay {count}.',
    },
    inspectTier3CountLonePairs: {
      one: 'Cada pareja de puntos que no está sobre una raya es un par solitario. Hay {count}.',
      other: 'Cada pareja de puntos que no está sobre una raya es un par solitario. Hay {count}.',
    },
  },

  error: {
    label: 'Ese movimiento no',
    atomFull:
      '{atom}: ya tiene 8. Ese átomo no puede compartir nada más. Busca otro que tenga todavía un impar.',
    hydrogenFull: 'El hidrógeno está completo con 2. Solo puede compartir un par.',
    sameAtom:
      'Esos dos puntos son del mismo átomo: ya forman un par. Un enlace necesita dos átomos distintos.',
    pairedDot:
      'Ese punto ya forma parte de un par. Solo se pueden compartir los impares, los que parpadean.',
  },

  inspect: {
    // "alguien de tu clase" is epicene, so Spanish needs none of the work
    // German did for "Mitschülerin oder Mitschüler". Written as a noun phrase
    // rather than "Dibujada por…", which would have to agree with the drawing.
    classmate: 'Dibujo de alguien de tu clase: {name}.',
    prompt: 'Toca el átomo que te parezca mal, o di que el dibujo es correcto.',
    diagnosisPrompt: '{atom}: ¿qué está mal?',
    diagnosis: {
      tooMany: 'sobran electrones alrededor de este átomo',
      tooFew: 'faltan: se ha dejado un par solitario',
      hydrogenFull: 'el hidrógeno solo puede compartir un par',
      needsDouble: 'estos átomos tienen que compartir dos veces (un enlace doble)',
      leftover: 'ha quedado un electrón desapareado',
      none: 'ningún error',
    },
    wrongAtom: '{atom}: {count}. Ese está bien. Busca un átomo con demasiados o con muy pocos.',
    wrongDiagnosis:
      'No del todo. Cuenta los puntos alrededor de ese átomo – {atom}: {count}. {explanation}',
    explainTooMany: '{atom}: más de {full}. Se ha dibujado un par solitario de más.',
    explainTooFew: '{atom}: menos de 8. Falta un par solitario.',
    explainHydrogenFull: 'El hidrógeno tiene 4: solo puede compartir un par.',
    explainNeedsDouble:
      '{atom1} y {atom2} tienen todavía un impar cada uno: tienen que compartir dos veces.',
    explainLeftover: '{atom}: ha quedado un impar. Se ha dibujado un electrón de más.',
    correctStructure: 'Exacto: cada átomo está completo y no sobra nada.',
    missedCorrect:
      'Este dibujo sí es correcto: cada átomo está completo. No todos los dibujos tienen un fallo.',
    notCorrect:
      'No del todo: hay un átomo que no está bien. Cuenta los puntos alrededor de cada átomo y toca el que falla.',
    repair: 'Ahora corrígelo: empareja los impares hasta que cada átomo esté completo.',
    repaired: 'Corregido: cada átomo vuelve a estar completo.',
    countBonds: '¿Cuántos enlaces hay? Toca cada par enlazante.',
    countLonePairs: '¿Cuántos pares solitarios hay? Toca cada par que no esté compartido.',
    countWrong: 'Has contado {given}; hay {actual}. Los que se te han escapado están resaltados.',
    countWrongDouble:
      'Has contado {given}; hay {actual}. Los que se te han escapado están resaltados: un enlace doble cuenta como un enlace, pero como dos pares enlazantes.',
    countRight: 'Sí: {counted}.',
    countLabel: 'Contados: {counted}',
  },

  success: {
    label: 'Terminada',
    round: 'Molécula terminada: {name} – {bondLine}.',
    bonus: 'Bonus sin pistas +{points}',
    points: '+{points}',
  },

  overlay: {
    levelUpBadge: 'Todos los átomos completos',
    levelUpTitle: 'Nivel superado',
    levelUpSubtitle: 'Todos los impares emparejados',
    levelUpDescription: 'Nivel {level}: {changes}',
    levelChanges: {
      level2:
        'el oxígeno, el nitrógeno y el carbono traen pares solitarios que se quedan quietos, y una de cada tres moléculas es un dibujo de clase para revisar.',
      level3:
        'algunos átomos tienen que compartir dos veces: un enlace doble. La guía ya espera a que preguntes.',
      level4: 'los átomos empiezan sin colocar. Tú eliges cuál va en el centro.',
      level5: 'modo corrección: seis dibujos de clase, sin guía, solo la escalera de pistas.',
    },
    victoryBadge: 'Todos los objetivos cumplidos',
    victoryTitle: 'Estructuras de Lewis dominadas',
    victorySubtitle: 'Todos los impares emparejados',
    victoryDescription: 'Abre tu hoja de corrección para repasar lo que has construido.',
    pausedBadge: 'Partida en espera',
    pausedTitle: 'Juego en pausa',
    pausedSubtitle: 'Nada va contrarreloj.',
    pausedDescription: 'Tu estructura está exactamente donde la dejaste.',
  },

  notebook: {
    header: 'Tus estructuras',
    markingHeader: 'Tu hoja de corrección',
    columnMolecule: 'Molécula',
    columnBondLine: 'Fórmula desarrollada',
    columnCounts: 'Enlaces / pares solitarios',
    columnHint: 'Nivel de pista',
    columnDiagnosis: 'Diagnóstico',
    noHint: 'sin pistas',
    hintTier: 'nivel {tier}',
    diagnosisRow: '{label}',
    diagnosisRowFirstTry: '{label} – a la primera',
    empty: 'Todavía no hay estructuras.',
  },

  glossary: {
    outerElectron: {
      term: 'electrón externo (electrón de valencia)',
      definition: 'un electrón de la capa externa: son los que un átomo comparte',
      // Unlike French, the full phrases work as match words: "electrón" begins
      // with `e` and ends with `n`, and the accent is inside the word where the
      // ASCII \b never looks.
      matches: [
        'electrones externos',
        'electrón externo',
        'electrones de valencia',
        'electrón de valencia',
      ],
    },
    loner: {
      term: 'impar (electrón desapareado)',
      definition: 'un electrón externo sin pareja; solo los impares se pueden compartir',
      matches: ['impares', 'impar', 'electrones desapareados', 'electrón desapareado'],
    },
    lonePair: {
      term: 'par solitario',
      definition: 'dos electrones externos que se quedan en un átomo y no se comparten',
      matches: ['pares solitarios', 'par solitario'],
    },
    sharedPair: {
      term: 'par enlazante (enlace)',
      definition:
        'dos electrones, uno de cada átomo, compartidos entre ellos; se dibujan como una raya',
      matches: ['pares enlazantes', 'par enlazante', 'enlaces', 'enlace'],
    },
    bondOrder: {
      term: 'enlace simple, doble, triple',
      definition: 'uno, dos o tres pares enlazantes entre los dos mismos átomos',
      matches: ['enlace simple', 'enlace doble', 'enlace triple'],
    },
    octet: {
      term: 'octeto',
      definition: 'ocho electrones externos alrededor de un átomo: está completo',
      matches: ['octeto'],
    },
    duet: {
      // Spanish sits between French and German here: «la regla del dueto» does
      // circulate in Spanish-language textbooks, so nothing was coined, but it
      // is not as settled as the octet rule. Rated medium; the alternative is
      // «la regla del dúo».
      term: 'dueto',
      definition: 'dos electrones externos alrededor del hidrógeno: está completo',
      matches: ['dueto'],
    },
    dot: {
      term: 'punto',
      definition: 'muestra cuántos electrones externos hay, no dónde están',
      matches: ['puntos', 'punto'],
    },
  },

  ui: {
    nextMolecule: 'Molécula siguiente',
    nextDrawing: 'Dibujo siguiente',
    finishLevel: 'Terminar el nivel',
    skipGuide: 'Saltar la explicación',
    nextStep: 'Siguiente',
    thisOneIsCorrect: 'Este dibujo es correcto',
    doneCounting: 'He terminado de contar',
    startRepair: 'Corregirlo',
    openMarkingSheet: 'Abrir la hoja de corrección',
    closeMarkingSheet: 'Volver',
    playAgain: 'Jugar otra vez',
    supportMode: 'Modo de apoyo',
    supportModeHelp:
      'Mantiene el panel de la guía abierto en todos los niveles. Nunca baja tu precisión.',
    hintButtonA11y: 'Ver una pista',
    dismissHintA11y: 'Cerrar la pista',
    coachRegionA11y: 'Mensajes de la guía',
    canvasLabelA11y: 'Estructura de Lewis: {name}',
    atomNameA11y: '{element}: {count} de {full}',
    atomCounterA11y: '{symbol}: {count} de {full}',
    atomLonerA11y: '{element}, impar {index} de {total}',
    atomLonePairA11y: '{element}, par solitario {index} de {total}',
    atomOrdinal: '{element} {ordinal}',
    // The short label on a pulsing dot at Level 1, off from Level 2 — the
    // scaffold the brief removes on purpose. German shortened its noun to an
    // adjective and French did the same; in Spanish the game word already IS
    // the adjective (electrón impar → impar), so there is nothing to shorten
    // to and inventing a third word would add a distinction Spanish does not
    // make. Five characters, and beside a single dot it reads as "odd one out".
    lonerLabel: 'impar',
    atomFull: 'completo',
    atomSelectedA11y: '{element}: impar seleccionado. Elige ahora un impar de otro átomo.',
    atomInspectTapA11y: '{element} – toca si este átomo no está bien',
    bondSingleA11y: 'Enlace simple entre {atom1} y {atom2}',
    bondDoubleA11y: 'Enlace doble entre {atom1} y {atom2}',
    bondTripleA11y: 'Enlace triple entre {atom1} y {atom2}',
    bondUndoA11y: 'pulsa para deshacer el último par enlazante',
    bondCountA11y: 'pulsa para contar',
    bondCountedA11y: 'contado',
    livePaired:
      'Par enlazante creado entre {atom1} y {atom2}. {name1}: {count1}; {name2}: {count2}.',
    liveUnpaired: 'Se ha deshecho el par enlazante entre {atom1} y {atom2}.',
    liveLocked: 'Molécula terminada: {name}. La estructura está bloqueada.',
  },
} satisfies LewisStructuresMessages;

export default es;
