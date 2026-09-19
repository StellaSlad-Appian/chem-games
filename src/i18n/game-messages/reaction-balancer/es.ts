// src/i18n/game-messages/reaction-balancer/es.ts
//
// La balanza de átomos, en español (es-ES). Terminología fijada en
// docs/i18n/glossary-es.md: coeficiente, subíndice, reactivos / productos,
// ajustar (y no «balancear»), recuento de átomos, pista.
//
// Tres decisiones de este archivo que conviene conocer:
//
//   * **ajustar**, no *balancear*. Es el marcador es-ES / es-419 más visible de
//     todo el sitio: España dice *ajustar ecuaciones* y Hispanoamérica dice
//     *balancear*. Está señalado para la propietaria al principio del glosario.
//     Como consecuencia, el panel de opciones se llama **Opciones** y no
//     *Ajustes*: el lector no debe encontrarse la misma raíz queriendo decir dos
//     cosas distintas en dos pantallas.
//   * **coeficiente / subíndice** es el contraste que enseña todo el juego, y en
//     español sale limpio. El francés tuvo que buscarle otra palabra a «hint»
//     porque *indice* significa a la vez «pista» y «subíndice»; el español no
//     tiene ese choque, porque el subíndice es *subíndice* y la pista es
//     *pista*.
//   * **recuento de átomos** para el atom ledger, y no *balance de átomos*, que
//     reintroduciría *balance*/*balancear* justo al lado de un *ajustar*
//     deliberado.
//
// Dos restricciones propias del español, explicadas en el glosario:
//
//   * Ningún artículo puede preceder a un hueco de nombre ({name}, {element}),
//     porque el artículo depende del género (el oxígeno pero la glucosa) y
//     porque *de + el* se contrae obligatoriamente en *del*. De ahí las
//     fórmulas «nombre + dos puntos» y «el elemento {element}», empleadas en
//     todas partes. «El elemento {x}» funciona para todos los elementos sin
//     excepción —también para *la plata*— porque el artículo concuerda con
//     *elemento*, no con el nombre.
//   * Tipografía: ¿ y ¡ de apertura son obligatorios; no hay espacio antes de
//     : ; ! ?, a diferencia del francés.
//
// `satisfies ReactionBalancerMessages` tipa este archivo contra el original
// inglés de src/core-engine/config/games/reaction-balancer-messages.ts: una
// clave que falte es un error de compilación, no una vuelta silenciosa al
// inglés. Nunca añadas `?` ni `Partial<>` para que compile.

import type { ReactionBalancerMessages } from '@/core-engine/config/games/reaction-balancer-messages';

export const es = {
  header: {
    subtitle: 'La balanza de átomos',
    balance: 'Para ajustar: {name}',
    build: 'Para construir y ajustar: {name}',
    progress: 'Reacción {round}/{total}',
    challengeProgress: 'Reto {round}/{total}',
  },

  instructions: {
    title: 'Cómo jugar: La balanza de átomos',
    lead: 'Haz que los átomos coincidan.',
    intro:
      'En una reacción química los átomos se reorganizan, nunca se crean ni se pierden: a los dos lados de la flecha tiene que haber el mismo número de cada átomo.',
    bullets: [
      'Los **números grandes** delante de una fórmula son los coeficientes. Esos son los que cambias.',
      'Los **números pequeños** dentro de una fórmula son los subíndices. Están bloqueados: cambiarlos daría otra sustancia.',
      'El **recuento de átomos** debajo de la flecha cuenta cada elemento a la izquierda y a la derecha. Cuando todas las filas son iguales, la ecuación se bloquea.',
      '¿No sabes por dónde seguir? Pulsa la **bombilla** (o la H). La primera pista siempre es gratis.',
    ],
    arrow: 'La flecha significa «da» o «se convierte en», no «es igual a».',
    keyboard: [
      ['Tab', 'pasa de un compuesto a otro'],
      ['↑ / ↓', 'cambian un coeficiente'],
      ['0–9', 'escriben un número directamente'],
      ['H', 'pista'],
      ['P', 'pausa'],
    ],
    touch: [
      ['Toca', '▲ / ▼ en una tarjeta para cambiar el coeficiente.'],
      ['Toca', 'el número para escribirlo.'],
    ],
    glossaryTitle: 'Las palabras del juego',
  },

  guided: {
    stepLabel: 'Paso {step} de {total}',
    steps: [
      'Mira el recuento. Hidrógeno: 2 a la izquierda, 2 a la derecha; ajustado. Oxígeno: 2 a la izquierda, 1 a la derecha. Hay que corregir el oxígeno.',
      'No podemos cambiar el 2 pequeño de `O2`: sería otra sustancia. Añade más agua. Pulsa ▲ en `H2O`.',
      'El oxígeno está ya a 2 y 2. Pero mira: el hidrógeno ha cambiado, 2 a la izquierda y 4 a la derecha. Ajustar un elemento puede desajustar otro. Pulsa ▲ en `H2`.',
      'Todas las filas coinciden: 4 H y 2 O a cada lado. La ecuación está ajustada – `2H2 + O2 -> 2H2O`. Acabas de comprobar que la masa se conserva.',
    ],
  },

  coach: {
    label: 'Guía',
    // No article before {elementInSentence}: Spanish would need "del oxígeno"
    // but "de la plata". "el elemento" carries the article instead, and it
    // works for every element because it agrees with *elemento*, not with the
    // name — which is what makes it safer than the French justification.
    imbalance:
      '{element}: {left} a la izquierda, {right} a la derecha. ¿Qué compuesto con el elemento {elementInSentence} podrías cambiar?',
    multiple:
      'Eso ha arreglado el elemento {fixed}, pero el elemento {broken} ha cambiado. Ajustar un elemento puede desajustar otro. Ahora toca revisar: {broken}.',
    balanced: 'Todas las filas coinciden. La masa se conserva.',
    balancedNotLowest:
      'Ajustada, y todos los coeficientes se pueden dividir entre {k}. La forma más simple: `{equation}`.',
  },

  hint: {
    label: 'Pista',
    tierLabel: 'Pista {tier} de 3',
    tier1: 'Empieza por el elemento que aparece en menos compuestos. Aquí es el elemento {element}.',
    tier3: 'Pon un {n} delante de `{formula}`. Luego vuelve a revisar el elemento {element}.',
    tier3Lower: 'Devuelve `{formula}` a {n}. Luego vuelve a revisar el elemento {element}.',
    tier3Balanced: 'Todas las filas coinciden ya: la ecuación está ajustada.',
    tier1Build:
      'Vuelve a leer la descripción. Nombra cada sustancia de partida y cada sustancia que se forma.',
    tier2Build:
      'Las sustancias que van antes de «reacciona», «arde» o «se descompone» son reactivos. Las que van después de «para formar», «produce» o «da» son productos.',
    tier3BuildReactant: 'Añade esta sustancia al lado de los reactivos: {name} (`{formula}`).',
    tier3BuildProduct: 'Añade esta sustancia al lado de los productos: {name} (`{formula}`).',
  },
  stuck: {
    offer: '¿Quieres una pista más clara? Pulsa otra vez la bombilla.',
  },

  error: {
    label: 'Ese movimiento no',
    zero: 'Un coeficiente no puede valer 0: `{formula}` desaparecería de la reacción.',
    max: 'Unos coeficientes tan grandes son señal de que hay que probar con números más pequeños. Busca la proporción más simple.',
    subscriptTap:
      'Los subíndices están bloqueados. `H2O2` es peróxido de hidrógeno, no agua: cambia el número grande.',
    notANumber:
      'Los coeficientes son números enteros a partir de 1. Escribe un número, o usa ▲ y ▼.',
  },

  challenge: {
    label: 'Reto',
    intro: 'Lee la descripción y construye la ecuación antes de ajustarla.',
    pickerLabel: 'Compuestos',
    sideLabel: 'Añadir a',
    reactants: 'Reactivos',
    products: 'Productos',
    placeholderReactant: 'añadir un reactivo',
    placeholderProduct: 'añadir un producto',
    // A generic noun before the colon, so the compound name never needs an
    // article of its own.
    notInReaction:
      'Esta sustancia no participa en la reacción: {name}. Vuelve a leer la descripción: ¿qué sustancias nombra?',
    wrongSideProduct:
      'Esta sustancia se forma en la reacción: {name}. Su sitio está a la derecha de la flecha, con los productos.',
    wrongSideReactant:
      'Esta sustancia se consume en la reacción: {name}. Su sitio está a la izquierda de la flecha, con los reactivos.',
    built: 'Esa es la ecuación. Ahora ajústala.',
    addAsReactantA11y: 'Añadir a los reactivos: {name}, {formula}',
    addAsProductA11y: 'Añadir a los productos: {name}, {formula}',
    removeA11y: 'Quitar: {name}, {formula}',
    tileA11y: '{name}, {formula}',
  },

  success: {
    label: 'Ajustada',
    round: '¡Ajustada! `{equation}`',
    points: '+{points}',
    bonus: 'Bonus forma más simple +{points}',
  },

  overlay: {
    levelUpBadge: 'Masa conservada',
    levelUpTitle: 'Nivel superado',
    levelUpSubtitle: 'Todos los átomos contados',
    levelUpDescription: 'El nivel {level} añade {changes}.',
    levelChanges: {
      level2:
        'reacciones en las que corregir un elemento desajusta otro, y la fila siguiente ya no se resalta',
      level3:
        'los iones poliatómicos, los primeros paréntesis y reacciones de cuatro compuestos; la guía ya espera a que preguntes, y los grupos de partículas dejan paso a las fórmulas',
      level4:
        'hidrocarburos más grandes y dobles desplazamientos de cuatro compuestos; el recuento queda oculto hasta que lo abres',
    },
    victoryBadge: 'Todos los objetivos cumplidos',
    victoryTitle: 'Ajuste dominado',
    victorySubtitle: 'Todos los átomos contados',
    victoryDescription: 'Prueba el nivel Reto, o abre tu cuaderno de laboratorio.',
    challengeBadge: 'Reto superado',
    challengeTitle: 'Ecuaciones construidas y ajustadas',
    challengeSubtitle: 'De las palabras a los símbolos',
    challengeDescription:
      'Abre tu cuaderno de laboratorio para ver todas las ecuaciones que has ajustado.',
    pausedBadge: 'Partida en espera',
    pausedTitle: 'Juego en pausa',
    pausedSubtitle: 'Nada va contrarreloj.',
    pausedDescription: 'Tus coeficientes están exactamente donde los dejaste.',
  },

  notebook: {
    header: 'Tus ecuaciones ajustadas',
    columnHint: 'Nivel de pista',
    columnPoints: 'Puntos',
    noHint: 'sin pistas',
    hintTier: 'nivel {tier}',
    lowestTerms: 'forma más simple a la primera',
    simplified: 'simplificada entre {k}',
    challenge: 'construida a partir de las palabras',
    empty: 'Todavía no hay ecuaciones.',
  },

  ledger: {
    title: 'Recuento de átomos',
    left: 'Izquierda',
    right: 'Derecha',
    statusA11y: 'Estado',
    row: '{element}: {left} a la izquierda, {right} a la derecha',
    balancedRow: 'ajustado',
    // Not "faltan {count}": a Spanish verb agrees with its count, and this is a
    // flat string rather than a plural record — the English "{count} more
    // needed" does not inflect, and a locale may not turn a flat string into a
    // plural (dictionary.test.ts enforces that in both directions). At count 1
    // it would read "faltan 1", which is wrong, and the ledger shows exactly
    // that case on the very first reaction. "{count} de menos" is idiomatic and
    // invariant.
    needsMoreLeft: '{count} de menos a la izquierda',
    needsMoreRight: '{count} de menos a la derecha',
    allBalanced: 'Todas las filas coinciden.',
    show: 'Mostrar el recuento de átomos',
    hide: 'Ocultar el recuento de átomos',
    showCost: 'Abrir el recuento en este nivel te hace perder el bonus de forma más simple.',
    nextUp: 'ajusta esta fila a continuación',
  },
  beam: {
    label: 'Masa relativa antes / después',
    readout: 'Masa relativa: {left} antes, {right} después.',
    // The beam is a physical object on screen, so it is *equilibrada*. That is
    // a different referent from *ajustar*, which is what you do to the
    // equation, so the two do not compete — see the glossary.
    level: 'La balanza está equilibrada.',
    tipsLeft: 'La balanza se inclina hacia la izquierda.',
    tipsRight: 'La balanza se inclina hacia la derecha.',
  },
  card: {
    // No article before {name}: "Añadir un agua" is impossible, and "de el"
    // would have to contract. A colon label is gender-free and reads well on a
    // screen reader.
    coefficientA11y: 'Coeficiente: {name}, {formula}',
    increaseA11y: 'Aumentar: {name}',
    decreaseA11y: 'Disminuir: {name}',
    formulaTapA11y: '{name} – los subíndices están bloqueados',
    clustersA11y: { one: '{count} molécula: {name}', other: '{count} moléculas: {name}' },
    reactants: 'Reactivos',
    products: 'Productos',
  },

  glossary: {
    coefficient: {
      // Unlike French — where "coefficient" is spelled exactly as in English and
      // had to be allowlisted — Spanish spells it *coeficiente*, so nothing here
      // is identical-by-design.
      term: 'coeficiente',
      definition: 'el número grande delante de una fórmula; multiplica toda la molécula',
      matches: ['coeficientes', 'coeficiente'],
    },
    subscript: {
      term: 'subíndice',
      definition:
        'el número pequeño dentro de una fórmula; dice cuántos átomos hay en una molécula',
      matches: ['subíndices', 'subíndice'],
    },
    reactant: {
      term: 'reactivo',
      definition: 'con lo que empiezas (a la izquierda de la flecha)',
      matches: ['reactivos', 'reactivo'],
    },
    product: {
      term: 'producto',
      definition: 'lo que se forma (a la derecha de la flecha)',
      matches: ['productos', 'producto'],
    },
    conserved: {
      term: 'conservación de la masa',
      definition: 'los átomos nunca se crean ni se pierden en una reacción',
      matches: ['conserva', 'conservación'],
    },
    stateSymbols: {
      term: '(s) (l) (g) (aq)',
      definition: 'sólido, líquido, gas, disuelto en agua',
      matches: ['símbolos de estado', 'símbolo de estado'],
    },
  },

  ui: {
    nextReaction: 'Reacción siguiente',
    finishLevel: 'Terminar el nivel',
    skipGuide: 'Ya lo he hecho antes',
    nextStep: 'Siguiente',
    tryChallenge: 'Probar el nivel Reto',
    openNotebook: 'Abrir el cuaderno de laboratorio',
    closeNotebook: 'Volver',
    playAgain: 'Jugar otra vez',
    supportMode: 'Modo de apoyo',
    supportModeHelp:
      'Mantiene la guía y el recuento de átomos visibles en todos los niveles. Nunca baja tu precisión.',
    hintButtonA11y: 'Ver una pista',
    dismissHintA11y: 'Cerrar la pista',
    coachRegionA11y: 'Mensajes de la guía',
    observation: 'Lo que verías',
    equationLabelA11y: 'Ecuación: {name}',
    liveChanged: '{name}: ahora {n}.',
    liveLocked: 'Ajustada. {equation}. La ecuación está bloqueada.',
    liveBuilt: 'Ecuación construida. Ahora ajústala.',
  },
} satisfies ReactionBalancerMessages;

export default es;
