// src/i18n/cheat-sheets/es.ts
//
// Spanish prose for the cheat sheets. See src/i18n/cheat-sheets.ts for how this
// overlays onto the English structure and why it is shaped this way.
//
// Terminology follows docs/i18n/glossary-es.md. The decisions that matter most
// here, because they recur:
//
//   estado de la materia · reactivos / productos · ajustar una ecuación (no
//   «balancear») · coeficiente vs. subíndice (the contrast this topic turns on)
//   · enlace covalente / iónico / metálico · fórmula empírica (the formula of an
//   ionic compound — a ratio, not a molecule) · fórmula molecular vs. fórmula
//   desarrollada · par solitario / par enlazante · estructura de Lewis · ion
//   poliatómico · ion hidronio (H3O+) · masa molar · cantidad de sustancia ·
//   reactivo limitante · rendimiento teórico / real / porcentual · grupo
//   funcional · disolución (not *solución* — an es-ES marker).
//
// Register: informal "tú", school-level vocabulary, Spanish typography
// (mandatory ¿ and ¡, « … » with no inner spaces, NO space before : ; ! ?,
// – for parenthetical dashes, decimal comma, ordinals 3º / 4º).
//
// **This overlay has 21 sections, matching the English exactly**, with four in
// `lewis-structures`. That was counted by hand against
// src/lib/cheat-sheet-data.ts rather than trusted to the test:
// `cheat-sheets.test.ts` compares `localizeSheet()`'s output against its own
// input, and `localizeSheet()` falls back to the English section when the
// overlay is short — so an overlay one section shy passes the suite and then
// renders every heading over the wrong body. The German `lewis-structures`
// overlay shipped with three and did exactly that.
//
// Two sheets are **adapted, not translated** — the user's decision, recorded in
// docs/i18n/GAMES.md and the brief:
//
//   * `naming-compounds`. English teaches "-ide → hydro-…-ic acid". Spanish has
//     its own pattern and, unusually, an almost exact parallel one: *-uro →
//     ácido …hídrico*, *-ato → ácido …ico*, *-ito → ácido …oso*. The acid-names
//     table teaches the Spanish affixes. The molecular-naming rule had to be
//     restated from the other end, because Spanish names molecular compounds
//     **anion first** (*dióxido de carbono*), so "drop mono- on the first
//     element" becomes "drop it on the element named after *de*".
//   * `organic-nomenclature`. Spanish names esters the other way round
//     (*etanoato de metilo*, not "methyl ethanoate") and writes carboxylic acids
//     as *ácido …oico*. The suffix table teaches the Spanish affixes.
//
// `functional-groups` is partially adapted — the suffixes are Spanish, the
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
// The polyatomic-ion table is generated from the ion registry, so its Spanish
// rows are generated too rather than transcribed — that way adding an ion in
// the registry cannot leave a half-translated table behind.
// ---------------------------------------------------------------------------

const POLYATOMIC_ION_NAMES_ES: Record<string, string> = {
  Ammonium: 'Amonio',
  Acetate: 'Acetato',
  'Ethanoate (acetate)': 'Etanoato (acetato)',
  Hydroxide: 'Hidróxido',
  Nitrate: 'Nitrato',
  Nitrite: 'Nitrito',
  Sulfate: 'Sulfato',
  Sulfite: 'Sulfito',
  Carbonate: 'Carbonato',
  Phosphate: 'Fosfato',
  'Dihydrogen Phosphate': 'Dihidrogenofosfato',
  'Hydrogen Phosphate': 'Hidrogenofosfato',
  Perchlorate: 'Perclorato',
  Chlorate: 'Clorato',
  Chlorite: 'Clorito',
  Hypochlorite: 'Hipoclorito',
  Permanganate: 'Permanganato',
  Chromate: 'Cromato',
  Dichromate: 'Dicromato',
  Thiosulfate: 'Tiosulfato',
  Peroxide: 'Peróxido',
  Oxalate: 'Oxalato',
  Cyanide: 'Cianuro',
  'Dihydrogen Borate': 'Dihidrogenoborato',
  'Trihydrogen Silicate': 'Trihidrogenosilicato',
  Hydrosulfide: 'Hidrogenosulfuro',
  'Hydrogen carbonate (bicarbonate)': 'Hidrogenocarbonato (bicarbonato)',
  'Hydrogen sulfite (bisulfite)': 'Hidrogenosulfito (bisulfito)',
  'Hydrogen sulfate (bisulfate)': 'Hidrogenosulfato (bisulfato)',
};

const polyatomicIonRowsEs = POLYATOMIC_ION_TABLE.rows.map((row) => [
  POLYATOMIC_ION_NAMES_ES[row[0]] ?? row[0],
  // Column 1 is the formula (listed in formulaColumns) and column 2 is the
  // charge; both are notation and are passed through untouched.
  row[1],
  row[2],
]);

// ---------------------------------------------------------------------------

export const CHEAT_SHEET_OVERLAY_ES: CheatSheetOverlaySet = {
  'atomic-structure': {
    title: 'Átomos y la tabla periódica',
    summary:
      'De qué está hecho un átomo, por qué el número atómico define el elemento y qué permite predecir el orden de la tabla.',
    keyTakeaways: [
      'Un átomo es un núcleo de protones y neutrones, con electrones repartidos a su alrededor.',
      'El número de protones —el número atómico— es lo que hace que un átomo sea ese elemento. Cámbialo y tienes otro elemento.',
      'Los electrones ocupan niveles de energía, y cuántos hay en el nivel exterior es el criterio con el que está ordenada la tabla.',
      'Un grupo es una columna y un periodo es una fila. Los elementos de un grupo tienen los mismos electrones fuera, así que reaccionan igual.',
      'Los metales están a la izquierda y los no metales a la derecha. Los átomos se encogen hacia la derecha y crecen hacia abajo.',
      'Casi todo el átomo es espacio vacío. Cualquier dibujo de un átomo se equivoca en la escala, también los de aquí.',
    ],
    formulaExampleNames: [
      'Cloro-35',
      'Cloro-37',
      'Ion hidrógeno',
    ],
    sections: [
      {
        heading: 'De qué está hecho un átomo',
        content:
          'Un átomo tiene un núcleo de protones y neutrones, con electrones alrededor. Los protones llevan carga positiva y los electrones una carga negativa igual, así que un átomo neutro tiene el mismo número de cada uno. Los neutrones no llevan carga. Casi toda la masa está en el núcleo, porque un electrón no pesa casi nada al lado de un protón.',
        imageAlt:
          'Un núcleo de protones y neutrones en el centro, rodeado de una nube difusa que muestra dónde es probable que estén los electrones. Una nota avisa de que el núcleo está dibujado demasiado grande para poder verse siquiera.',
      },
      {
        heading: 'Número atómico y número másico',
        content:
          'El número atómico es el número de protones, y es lo que hace que un átomo sea ese elemento. Todo átomo de cloro tiene 17 protones; cualquier cosa con 17 protones es cloro. El número másico es protones más neutrones. Los neutrones pueden variar sin que cambie el elemento. Los dos términos son aquí una ampliación: el currículo de estos cursos no nombra ninguno, y sin ellos no puedes leer una casilla de la tabla.',
        exampleNames: ['Cloro-35', 'Cloro-37'],
        imageAlt:
          'El símbolo del cloro-35 con el número másico 35 escrito encima del número atómico 17, y flechas que señalan: 17 protones, y 35 menos 17 da 18 neutrones.',
      },
      {
        heading: 'Electrones, niveles de energía y la forma de la tabla',
        content:
          'Los electrones ocupan niveles de energía alrededor del núcleo. El primero admite hasta 2, el siguiente hasta 8, y otros 8 en los veinte primeros elementos. Tu profesorado y el currículo quizá digan capas: es lo mismo. Contar los electrones así se llama modelo de Bohr: es útil, y no es una foto de un átomo de verdad. Cuántos hay en el nivel exterior determina cómo reacciona un átomo. Dos elementos van en el mismo grupo cuando tienen el mismo número fuera. Por eso un grupo se comporta de forma parecida.',
        imageAlt:
          'Un núcleo de sodio con 11 protones y 12 neutrones, rodeado de tres bandas difusas que contienen 2, 8 y 1 electrones, dibujados como marcas en ángulos irregulares y no como puntos sobre círculos. Al lado, la disposición 2, 8, 1 con el nivel externo al final. La propia figura dice que es una forma de contar electrones y no una imagen de un átomo, y que el núcleo está dibujado unas 100 000 veces demasiado grande.',
      },
      {
        heading: 'Grupos y periodos',
        content:
          'Un grupo es una columna de la tabla y un periodo es una fila. Los elementos de un mismo grupo tienen el mismo número de electrones en el nivel exterior. La columna predice, por tanto, cómo reacciona un elemento. El grupo 1 son los metales alcalinos, el grupo 17 los halógenos y el grupo 18 los gases nobles. El periodo dice cuántos niveles de energía se usan: un elemento del periodo 3 usa tres. La fila te dice así, más o menos, lo grande que es el átomo.',
      },
      {
        heading: 'Metales y no metales',
        content:
          'Los metales ocupan la izquierda y el centro de la tabla, y los no metales están en la esquina superior derecha. Un metal conduce la electricidad y el calor, tiene la superficie brillante y se deja golpear hasta formar una lámina sin romperse. Casi todos los metales son sólidos a temperatura ambiente; el mercurio es el líquido. Un no metal suele conducir mal, es mate y se rompe si es que llega a ser sólido. Muchos no metales son gases. Ampliación: unos pocos elementos de la escalera que hay entre unos y otros, como el silicio, se comportan en parte como cada uno. Se llaman semimetales, una palabra que el currículo no usa.',
      },
      {
        heading: 'Radio atómico',
        content:
          'Los átomos se hacen más pequeños de izquierda a derecha a lo largo de un periodo. Cada paso añade un protón, y la carga positiva mayor tira del mismo nivel exterior con más fuerza. Los átomos se hacen más grandes hacia abajo dentro de un grupo, porque cada paso hacia abajo estrena un nivel de energía más lejano. Así que los átomos más grandes están abajo a la izquierda de la tabla y los más pequeños arriba a la derecha.',
      },
      {
        heading: 'La reactividad, y por qué un grupo se comporta igual',
        content:
          'Puedes poner a prueba un grupo haciendo reaccionar sus elementos con oxígeno, agua y ácidos: entre ellos se comportan igual. Los metales del grupo 1 reaccionan con el agua y se vuelven más violentos hacia abajo: el litio burbujea, el sodio corretea por la superficie, el potasio se incendia. Esos mismos metales desprenden hidrógeno con un ácido, y todavía más deprisa. Los elementos del grupo 17 van al revés y son menos reactivos hacia abajo. El grupo 18 ya tiene el nivel exterior lleno, así que los gases nobles no reaccionan casi con nada.',
      },
      {
        heading: 'Ordenada por número atómico, no por masa',
        content:
          'Mendeléiev ordenó la tabla por masa, y algunos elementos quedaron en el sitio equivocado. En 1913 Henry Moseley midió la carga del núcleo y encontró el orden que funciona: el número atómico. El teluro es más pesado que el yodo, pero va antes, porque tiene un protón menos.',
        imageAlt:
          'El teluro y el yodo uno al lado del otro. El teluro tiene mayor masa atómica relativa pero menor número atómico, y la tabla lo coloca primero.',
      },
    ],
    tables: [
      {
        heading: 'Las tres partículas',
        columns: ['Partícula', 'Carga', 'Masa relativa', 'Dónde está'],
        rows: [
          ['Protón', '+1', '1', 'en el núcleo'],
          ['Neutrón', '0', '1', 'en el núcleo'],
          ['Electrón', '−1', 'unos 1/1836', 'alrededor del núcleo'],
        ],
      },
    ],
    commonMistakes: [
      'Confundir el número atómico con el número másico. El número atómico son los protones y da nombre al elemento. El número másico son protones más neutrones.',
      'Pensar que un ion es otro elemento. Perder o ganar un electrón cambia la carga, no el número de protones. El sodio y Na+ son los dos sodio.',
    ],
  },
  'isotopes-and-radioactivity': {
    title: 'Isótopos y radiactividad',
    summary:
      'Qué cambia cuando cambia el número de neutrones: isótopos, desintegración, semidesintegración y los elementos que hubo que fabricar.',
    keyTakeaways: [
      'Los isótopos son átomos del mismo elemento con distinto número de neutrones. Químicamente se comportan igual.',
      'La masa atómica relativa es una media ponderada entre los isótopos de un elemento. Por eso tan pocas son números enteros.',
      'Un núcleo inestable se desintegra y emite radiación, y deja detrás un átomo más estable.',
      'Hay tres clases —alfa, beta y gamma— y se diferencian en qué sale y en qué las detiene.',
      'El periodo de semidesintegración es el tiempo que tarda en desintegrarse la mitad de una muestra. Tras tres periodos queda un octavo.',
      'Van desde segundos hasta miles de millones de años, y eso es justo lo que permite datar un pasado remoto.',
    ],
    formulaExampleNames: [
      'Carbono-12',
      'Radón-222',
      'Yodo-131',
      'Cobalto-60',
      'Carbono-14',
      'Uranio-238',
    ],
    sections: [
      {
        heading: 'Los dos números que necesita esta chuleta',
        content:
          'El número atómico es cuántos protones tiene un átomo, y es lo que fija de qué elemento se trata. El número másico es protones más neutrones. Toda esta chuleta va de que el segundo número cambia mientras el primero se queda quieto. Los dos términos son una ampliación: el currículo de estos cursos no nombra ninguno, y sin ellos aquí no funciona nada.',
      },
      {
        heading: 'Isótopos',
        content:
          'Los isótopos son átomos de un mismo elemento con distinto número de neutrones. La química la hacen los electrones, y los isótopos tienen el mismo número, así que reaccionan igual. Lo que cambia es la masa y, a veces, la estabilidad: algunos isótopos son radiactivos y otros no.',
        imageAlt:
          'Tres átomos de hidrógeno uno al lado del otro: uno con un protón, otro con un protón y un neutrón, y otro con un protón y dos neutrones. Los tres tienen un solo electrón.',
      },
      {
        heading: 'Núcleos inestables y las tres clases de radiación',
        content:
          'Algunos núcleos son inestables. Se desintegran por su cuenta, emiten radiación y dejan detrás un átomo más estable. El radón-222 expulsa una partícula alfa, que son dos protones y dos neutrones juntos. El yodo-131 emite una partícula beta, que es un electrón rápido salido del núcleo. El cobalto-60 emite radiación gamma, que es energía y no una partícula. Un papel detiene la alfa, una lámina de aluminio detiene la beta, y la gamma necesita plomo u hormigón grueso.',
      },
      {
        heading: 'Periodo de semidesintegración',
        content:
          'Es el tiempo que tarda en desintegrarse la mitad de una muestra. Tras un periodo queda la mitad, tras dos un cuarto y tras tres un octavo. Para cada isótopo es fijo: calentarlo o hacerlo reaccionar no lo cambia. El carbono-14 tiene un periodo de unos 5730 años. El uranio-238 lo tiene de unos 4500 millones de años, y por eso todavía queda uranio en el suelo.',
        imageAlt:
          'Una curva de desintegración que baja del 100 por ciento al 50, al 25 y al 12,5 por ciento tras uno, dos y tres periodos de semidesintegración, con una línea discontinua hasta el eje en cada punto. Tras tres periodos queda una octava parte. Un periodo son 5730 años para el carbono-14 y unos 4500 millones de años para el uranio-238.',
      },
      {
        heading: 'Datar el pasado, y 65 000 años en Australia',
        content:
          'El carbono-14 se forma en lo alto de la atmósfera y acaba en todo ser vivo. Cuando algo muere deja de tomar más, y el que ya tiene se desintegra. Medir cuánto queda data los restos, hasta unos 50 000 años atrás. Lo más antiguo necesita otro método. La luminiscencia ópticamente estimulada data la última vez que un grano de arena estuvo expuesto a la luz del día, y llega mucho más lejos. En Madjedbebe, un abrigo rocoso en tierras del pueblo mirarr, en el Territorio del Norte, se aplicaron los dos métodos a los mismos depósitos. Sitúan a los pueblos aborígenes australianos y a los isleños del estrecho de Torres en el continente australiano desde hace al menos 65 000 años.',
      },
      {
        heading: 'La radiactividad en medicina y en la industria',
        content:
          'La radiación es útil porque atraviesa lo sólido y se puede dirigir. En medicina se sigue por el cuerpo una dosis pequeña de un isótopo de vida corta para localizar un tumor. Una dosis grande y concentrada sirve para matar células cancerosas, y el cobalto-60 es una de las fuentes que se usan. En la industria se atraviesan con radiación gamma las piezas destinadas a aviones y naves espaciales. Una grieta aparece en la película que hay detrás de la pieza, sin que nadie tenga que abrirla.',
      },
      {
        heading: 'Elementos que hubo que fabricar',
        content:
          'Los elementos posteriores al uranio no tienen isótopos estables y no se encuentran en la naturaleza. Se construyen en aceleradores lanzando un núcleo contra otro, a veces unos pocos átomos cada vez. Muchos duran menos de un segundo y luego se desintegran. Esto es una ampliación: el currículo no pide los elementos fabricados. Están aquí porque así se rellenaron las últimas filas de la tabla periódica.',
      },
    ],
    commonMistakes: [
      'Leer la masa atómica relativa como un recuento de partículas. Es una media entre isótopos: el 35,5 del cloro no es ningún átomo que puedas encontrar.',
      'Sumar las dos masas de los isótopos y dividir entre dos. Para el cloro sale 36, y está mal, porque el cloro-35 es tres veces más abundante que el cloro-37.',
    ],
  },
  'states-of-matter': {
    title: 'Los estados de la materia',
    summary: 'Cómo se colocan las partículas, energía cinética y los seis cambios de estado.',
    keyTakeaways: [
      'Sólidos: las partículas vibran en posiciones fijas; forma fija y volumen fijo.',
      'Líquidos: las partículas se deslizan unas sobre otras; volumen fijo, pero la forma es la del recipiente.',
      'Gases: las partículas se mueven libremente y deprisa; llenan cualquier recipiente y se comprimen con facilidad.',
      'La temperatura mide la energía cinética media de las partículas.',
      'Durante un cambio de estado la temperatura no varía: la energía sirve para romper o formar las atracciones entre partículas, no para acelerarlas.',
    ],
    formulaExampleNames: [
      'Hielo (sólido)',
      'Agua (líquida)',
      'Vapor de agua (gas)',
      'Sal disuelta (en disolución acuosa)',
    ],
    sections: [
      {
        heading: 'Los símbolos de estado en las ecuaciones',
        content:
          'Cada especie de una ecuación química lleva un símbolo de estado: (s) sólido, (l) líquido, (g) gas, (aq) disuelto en agua. «Acuoso» no es un cuarto estado de la materia: quiere decir que hay un soluto disuelto en agua líquida.',
      },
      {
        heading: 'Curvas de calentamiento y de enfriamiento',
        content:
          'En una curva de calentamiento, los tramos horizontales son los cambios de estado (fusión, ebullición). Los tramos que suben corresponden a un solo estado que se calienta. El tramo de la ebullición es más largo que el de la fusión, porque separar del todo las partículas cuesta más energía que solo aflojarlas.',
      },
    ],
    tables: [
      {
        heading: 'Los seis cambios de estado',
        columns: ['Cambio', 'De → A', 'Energía'],
        rows: [
          ['Fusión', 'sólido → líquido', 'absorbida'],
          ['Solidificación', 'líquido → sólido', 'liberada'],
          ['Vaporización / ebullición', 'líquido → gas', 'absorbida'],
          ['Condensación', 'gas → líquido', 'liberada'],
          ['Sublimación', 'sólido → gas', 'absorbida'],
          ['Sublimación inversa', 'gas → sólido', 'liberada'],
        ],
      },
    ],
    commonMistakes: [
      '«Las partículas se dilatan al calentarlas»: las partículas siguen siendo del mismo tamaño; lo que crece son los huecos entre ellas.',
      'Creer que las burbujas del agua hirviendo son aire: son vapor de agua.',
      'Confundir la evaporación (en la superficie, a cualquier temperatura) con la ebullición (en todo el líquido, a la temperatura de ebullición).',
    ],
  },

  'acids-and-bases': {
    title: 'Ácidos y bases',
    summary: 'pH, dadores y aceptores de protones, fuerte o débil, y la neutralización.',
    keyTakeaways: [
      'Ácido: un dador de protones (H+). En agua forma iones hidronio, H3O+. pH < 7.',
      'Base: un aceptor de protones. Las bases solubles (álcalis) liberan iones hidróxido, OH-, en agua. pH > 7.',
      'Neutro: pH 7 a 25 °C; el agua pura y la mayoría de las sales.',
      'Neutralización: ácido + base → sal + agua. La ecuación iónica es siempre H+ + OH- → H2O.',
      'Cada escalón de la escala de pH es un factor 10 en la concentración de H+: un pH 2 es 100 veces más ácido que un pH 4.',
    ],
    formulaExampleNames: [
      'Ácido clorhídrico (fuerte)',
      'Ácido etanoico (débil)',
      'Hidróxido de sodio (base fuerte)',
      'Amoniaco (base débil)',
    ],
    sections: [
      {
        heading: 'Fuerte y débil no es lo mismo que concentrado y diluido',
        content:
          'Los ácidos fuertes se ionizan del todo en agua (HCl, HNO3, H2SO4). Los ácidos débiles solo se ionizan en parte (CH3COOH, H2CO3). «Concentrado» y «diluido» dicen cuánto ácido hay disuelto, no qué proporción se ioniza: existen ácidos fuertes diluidos y ácidos débiles concentrados.',
        exampleNames: ['Ionización de un ácido fuerte', 'Neutralización'],
      },
      {
        heading: 'Las reacciones de los ácidos que hay que reconocer',
        content:
          'Ácido + metal → sal + dihidrógeno. Ácido + carbonato metálico → sal + agua + dióxido de carbono. Ácido + óxido o hidróxido metálico → sal + agua. La sal toma su nombre del metal y del ácido (ácido clorhídrico → cloruro, ácido sulfúrico → sulfato, ácido nítrico → nitrato).',
        exampleNames: ['Ácido + metal', 'Ácido + carbonato'],
      },
    ],
    tables: [
      {
        heading: 'Referencias de la escala de pH',
        columns: ['pH', 'Ejemplo', 'Color del indicador universal'],
        rows: [
          ['0–2', 'Jugo gástrico, ácido de batería', 'Rojo'],
          ['3–6', 'Vinagre, zumo de limón, refrescos', 'Naranja → amarillo'],
          ['7', 'Agua pura', 'Verde'],
          ['8–11', 'Bicarbonato, agua de mar, jabón', 'Azul'],
          ['12–14', 'Limpiahornos, desatascador', 'Violeta'],
        ],
      },
    ],
    commonMistakes: [
      'Escribir que los ácidos «contienen» H+: solo liberan H+ (en forma de H3O+) una vez disueltos en agua.',
      'Creer que todas las bases contienen OH: el amoniaco (NH3) es una base porque acepta un protón.',
      'Creer que la escala de pH se acaba en 0 y en 14: las disoluciones muy concentradas van más allá.',
    ],
  },

  'balancing-equations': {
    title: 'Ajustar ecuaciones químicas',
    summary:
      'Conservación de la masa: entran y salen los mismos átomos. Cambia los coeficientes, nunca los subíndices.',
    keyTakeaways: [
      'En una reacción los átomos se reorganizan, nunca se crean ni se destruyen: cada elemento tiene que estar en el mismo número a los dos lados.',
      'Los coeficientes (los números grandes de delante) multiplican toda la fórmula. Los subíndices (los números pequeños de dentro) definen la sustancia y no deben cambiarse nunca.',
      'Ajusta un elemento cada vez; deja el hidrógeno y el oxígeno para el final; trata un ion poliatómico como una unidad si aparece sin cambios a los dos lados.',
      'Los coeficientes tienen que formar la proporción de números enteros más pequeña.',
      'Escribe siempre los símbolos de estado en la ecuación final.',
    ],
    formulaExampleNames: [
      'Sin ajustar',
      'Ajustada',
      'Con un ion poliatómico tratado como una unidad',
    ],
    sections: [
      {
        heading: 'Un método que funciona siempre',
        content:
          '1. Escribe la fórmula correcta de cada reactivo y de cada producto. 2. Cuenta los átomos de cada elemento a cada lado. 3. Empieza por el elemento que aparece en menos fórmulas. 4. Cambia solo los coeficientes. 5. Si te sale una fracción (por ejemplo 7/2 O2), multiplica todo por 2. 6. Vuelve a contar cada elemento. 7. Añade los símbolos de estado.',
        exampleNames: ['Combustión del propano'],
      },
    ],
    commonMistakes: [
      'Convertir H2O en H2O2 para «tener más oxígeno»: eso es otra sustancia.',
      'Olvidar que un coeficiente multiplica cada átomo de la fórmula (2Ca(OH)2 tiene 4 H).',
      'Parar antes de volver a comprobar cada elemento una segunda vez.',
    ],
  },

  'reaction-types': {
    title: 'Tipos de reacciones químicas',
    summary:
      'Reconocer por su esquema la síntesis, la descomposición, la combustión, el desplazamiento, la precipitación y la neutralización.',
    keyTakeaways: [
      'Síntesis (combinación): dos o más sustancias se unen; A + B → AB.',
      'Descomposición: una sustancia se separa; AB → A + B (muchas veces hace falta calor o corriente eléctrica).',
      'Combustión: combustible + oxígeno → dióxido de carbono + agua (combustión completa); se libera calor.',
      'Desplazamiento simple: un elemento más reactivo ocupa el lugar de otro menos reactivo; A + BC → AC + B.',
      'Doble desplazamiento: los iones intercambian pareja; AB + CD → AD + CB (la precipitación y la neutralización son casos particulares).',
    ],
    formulaExampleNames: [
      'Síntesis',
      'Descomposición',
      'Combustión',
      'Desplazamiento simple',
      'Precipitación',
      'Neutralización',
    ],
    sections: [
      {
        heading: 'Cómo distinguirlas deprisa',
        content:
          'Cuenta los reactivos y los productos. Un solo producto a partir de varios reactivos → síntesis. Varios productos a partir de un solo reactivo → descomposición. O2 a la izquierda y CO2 y H2O a la derecha → combustión. Un elemento y un compuesto que intercambian → desplazamiento simple. Dos compuestos que intercambian iones → doble desplazamiento; si se forma un sólido, es una precipitación; si se forma agua a partir de un ácido y una base, es una neutralización.',
      },
    ],
    tables: [
      {
        heading: 'Formas generales',
        columns: ['Tipo', 'Forma general', 'Pista'],
        rows: [
          ['Síntesis', 'A + B → AB', 'Menos productos que reactivos'],
          ['Descomposición', 'AB → A + B', 'Un solo reactivo'],
          ['Combustión', 'Combustible + O₂ → CO₂ + H₂O', 'Oxígeno como reactivo, se libera calor'],
          ['Desplazamiento simple', 'A + BC → AC + B', 'Elemento + compuesto'],
          ['Doble desplazamiento', 'AB + CD → AD + CB', 'Dos compuestos intercambian iones'],
          ['Precipitación', 'Iones (aq) → sólido', 'Un producto (s) a partir de reactivos (aq)'],
          ['Neutralización', 'Ácido + base → sal + agua', 'H⁺ + OH⁻ → H₂O'],
        ],
      },
    ],
    commonMistakes: [
      'Llamar «combustión» a toda reacción con oxígeno: la herrumbre es una oxidación lenta, no una combustión.',
      'Olvidar que una combustión incompleta da CO o C (hollín) en lugar de CO2.',
    ],
  },

  'chemical-bonds': {
    title: 'Enlaces químicos y estructuras',
    summary:
      'Enlace iónico, covalente y metálico, y cómo la estructura explica las propiedades.',
    keyTakeaways: [
      'Los átomos se enlazan para conseguir una capa externa completa y estable (una configuración de gas noble). El número del grupo te dice cuántos electrones de valencia tiene un elemento representativo.',
      'Iónico: metal + no metal. Se transfieren electrones y se forman iones que quedan sujetos en una red tridimensional por atracción electrostática.',
      'Covalente: no metal + no metal. Los electrones se comparten por pares; cada par compartido es un enlace.',
      'Metálico: átomos de metal en una red de cationes rodeados por un «mar» de electrones libres.',
      'Las propiedades salen de la estructura: las redes son duras y tienen puntos de fusión altos; las moléculas pequeñas funden a baja temperatura porque entre ellas solo actúan fuerzas débiles.',
    ],
    formulaExampleNames: [
      'Compuesto iónico',
      'Molécula covalente',
      'Red covalente',
      'Metal',
    ],
    sections: [
      {
        heading: 'Por qué los compuestos iónicos solo conducen fundidos o disueltos',
        content:
          'En la red sólida los iones están fijos en su sitio, así que no hay partículas cargadas que puedan moverse. Al fundir o al disolver, los iones quedan libres y el líquido conduce. Los metales conducen en todos los estados porque sus electrones libres siempre pueden moverse.',
      },
    ],
    tables: [
      {
        heading: 'Estructura → propiedades',
        columns: ['Tipo', 'Partículas', 'Punto de fusión', '¿Conduce?', 'Ejemplo'],
        rows: [
          ['Red iónica', 'Cationes + aniones', 'Alto', 'Solo fundido o (aq)', 'NaCl, MgO'],
          ['Covalente molecular', 'Moléculas', 'Bajo', 'No', 'H₂O, CO₂'],
          [
            'Red covalente',
            'Átomos (todos enlazados)',
            'Muy alto',
            'No (salvo el grafito)',
            'Diamante, SiO₂',
          ],
          ['Red metálica', 'Cationes + e⁻ libres', 'Alto (variable)', 'Sí, en todos los estados', 'Cu, Fe, Al'],
        ],
      },
    ],
    commonMistakes: [
      'Llamar «molécula» al NaCl: es una red; la fórmula es una proporción, no una molécula.',
      'Creer que los enlaces covalentes son débiles porque las sustancias moleculares funden con facilidad: los enlaces dentro de una molécula son fuertes; las fuerzas entre moléculas son débiles.',
      'Dar por hecho que un enlace es totalmente iónico o totalmente covalente: la diferencia de electronegatividad lo coloca en un abanico de casos intermedios.',
    ],
  },

  'chemical-formulas': {
    title: 'Escribir fórmulas de compuestos iónicos',
    summary:
      'Compensa las cargas: primero el catión, cruza las cargas y pon paréntesis a los iones poliatómicos repetidos.',
    keyTakeaways: [
      'Un compuesto iónico no tiene carga global: la carga positiva total es igual a la carga negativa total.',
      'Escribe primero el catión (el metal o NH4+) y después el anión.',
      'Método del aspa: el valor de la carga de cada ion pasa a ser el subíndice del otro ion; después se simplifica a la proporción más pequeña.',
      'Un ion poliatómico es una unidad. Si necesitas más de uno, va entre paréntesis: Ca(OH)2, no CaOH2.',
      'Los metales con varias cargas posibles (Fe, Cu, Pb, Sn) indican la suya con un número romano en el nombre: hierro(III) = Fe 3+.',
    ],
    formulaExampleNames: [
      'Óxido de aluminio (3+ y 2−)',
      'Hidróxido de calcio (con paréntesis)',
      'Sulfato de amonio',
      'Cloruro de hierro(III)',
      'Óxido de magnesio (2+ y 2− se simplifica)',
    ],
    sections: [
      {
        heading: 'Ejemplo resuelto: sulfato de aluminio',
        content:
          'Al 3+ y SO4 2−. Cruza las cargas: el Al se lleva el subíndice 2 y el sulfato el subíndice 3. El sulfato es poliatómico y se repite, así que necesita paréntesis: Al2(SO4)3. Comprueba: 2 × (+3) = +6 y 3 × (−2) = −6. Neutro.',
        exampleNames: ['Sulfato de aluminio'],
      },
      {
        heading: 'Las cargas más comunes, leídas en la tabla periódica',
        content:
          'Grupo 1 → +1, grupo 2 → +2, Al → +3, grupo 17 → −1, grupo 16 → −2, N y P → −3. Los metales de transición varían: te lo dirá el nombre. Para los iones poliatómicos, usa la tabla de consulta.',
      },
    ],
    commonMistakes: [
      'Olvidar simplificar: Mg2O2 tiene que quedar en MgO.',
      'Poner paréntesis a un ion poliatómico que va solo: NaOH, no Na(OH).',
      'Escribir primero el anión porque en español se nombra antes.',
    ],
  },

  'polyatomic-ions': {
    title: 'Iones poliatómicos',
    summary:
      'La tabla de consulta, más los patrones de nomenclatura que hacen que tengas que memorizar mucho menos de lo que parece.',
    keyTakeaways: [
      'Un ion poliatómico es un grupo de átomos unidos por enlaces covalentes que tiene una carga global y se mueve como una unidad en las reacciones.',
      'El único catión poliatómico común es el amonio, NH4+. Todos los demás son aniones.',
      '«-ato» tiene más oxígeno que «-ito»: sulfato SO4 2− frente a sulfito SO3 2−; nitrato NO3− frente a nitrito NO2−. La carga no cambia.',
      '«per-…-ato» es un oxígeno más que -ato; «hipo-…-ito» es uno menos que -ito (perclorato ClO4−, clorato ClO3−, clorito ClO2−, hipoclorito ClO−).',
      'Añadir H+ a un anión sube su carga en una unidad y añade «hidrogeno» al nombre: carbonato CO3 2− → hidrogenocarbonato HCO3−.',
    ],
    formulaExampleNames: [
      'Nitrato de sodio',
      'Sulfato de cobre(II)',
      'Carbonato de amonio',
      'Permanganato de potasio',
    ],
    tables: [
      {
        heading: 'Iones poliatómicos (los del libro de datos de VCE)',
        caption:
          'Primero los cationes y después los aniones, agrupados por carga. Los nombres entre paréntesis son nombres antiguos que todavía se ven.',
        columns: ['Nombre', 'Fórmula', 'Carga'],
        rows: polyatomicIonRowsEs,
      },
    ],
    sections: [
      {
        heading: 'Cómo aprendértelos',
        content:
          'Aprende primero los iones en «-ato» (sulfato, nitrato, carbonato, fosfato, clorato): todos los demás oxoaniones son un patrón aplicado a esos. Después aprende los cuatro que se salen del patrón: hidróxido OH−, cianuro CN−, amonio NH4+ y peróxido O2 2−.',
      },
      {
        heading: 'Dónde aparecen',
        content:
          'Ácidos: el ácido sulfúrico es H2SO4 porque el sulfato es 2−; el ácido nítrico es HNO3 porque el nitrato es 1−. Precipitación: casi todos los nitratos y todas las sales de amonio son solubles, así que son las parejas «espectadoras» de siempre. Redox: el permanganato y el dicromato son los oxidantes clásicos.',
      },
    ],
    commonMistakes: [
      'Partir el ion dentro de una fórmula (escribir Ca(OH)2 como CaO2H2): va siempre junto.',
      'Tratar la carga como si fuera solo del último átomo: es de todo el grupo.',
      'Confundir la carga (−2) con el número de oxígenos: el sulfato tiene 4 O y carga 2−.',
    ],
  },

  'naming-compounds': {
    title: 'Nombrar compuestos inorgánicos',
    summary:
      'Tres sistemas de nomenclatura —iónico, molecular y ácidos— y cómo saber cuál se aplica.',
    keyTakeaways: [
      'Decide primero el tipo: metal + no metal (o NH4+) → iónico; dos no metales → molecular; H delante y disuelto en agua → ácido.',
      'Iónico: nombre del anión + «de» + nombre del catión; en español el anión va primero, al revés que en inglés. Los aniones monoatómicos acaban en -uro (cloruro, y el caso aparte del óxido); los poliatómicos conservan su nombre (sulfato). Sin prefijos: la proporción ya la fijan las cargas.',
      'Los metales con varias cargas llevan un número romano para la carga del catión: FeCl2 = cloruro de hierro(II), FeCl3 = cloruro de hierro(III). Se deduce a partir del anión.',
      'Molecular: los prefijos griegos dan el número de átomos (CO2 = dióxido de carbono, N2O4 = tetraóxido de dinitrógeno). El prefijo «mono-» se omite en el elemento que va después de «de».',
      'Ácidos, a partir del anión: -uro → ácido …hídrico (HCl = ácido clorhídrico); -ato → ácido …ico (H2SO4 = ácido sulfúrico); -ito → ácido …oso (H2SO3 = ácido sulfuroso).',
    ],
    formulaExampleNames: [
      'Nitruro de magnesio (iónico)',
      'Óxido de cobre(I) (iónico, con número romano)',
      'Pentacloruro de fósforo (molecular)',
      'Ácido nitroso (ácido, a partir del nitrito)',
    ],
    sections: [
      {
        heading: 'Cómo se saca el número romano',
        content:
          'Para Fe2(SO4)3: el sulfato es 2− y hay tres, así que los aniones suman −6. Los dos iones de hierro tienen que sumar +6, o sea +3 cada uno → sulfato de hierro(III). Solo necesitan el número los metales con más de una carga común (Fe, Cu, Pb, Sn, Mn, Cr, Co, Ni); el grupo 1, el grupo 2, el Al, el Cinc y la Plata no lo llevan nunca.',
      },
    ],
    tables: [
      {
        heading: 'Prefijos griegos para los compuestos moleculares',
        columns: ['Número', 'Prefijo', 'Ejemplo'],
        rows: [
          ['1', 'mono- (se omite tras «de»)', 'CO monóxido de carbono'],
          ['2', 'di-', 'CO₂ dióxido de carbono'],
          ['3', 'tri-', 'SO₃ trióxido de azufre'],
          ['4', 'tetra-', 'CCl₄ tetracloruro de carbono'],
          ['5', 'penta-', 'PCl₅ pentacloruro de fósforo'],
          ['6', 'hexa-', 'SF₆ hexafluoruro de azufre'],
          ['7', 'hepta-', 'Cl₂O₇ heptaóxido de dicloro'],
          ['8–10', 'octa-, nona-, deca-', 'P₄O₁₀ decaóxido de tetrafósforo'],
        ],
      },
      {
        heading: 'Nombres de los ácidos a partir del nombre del anión',
        columns: ['Terminación del anión', 'Nombre del ácido', 'Ejemplo'],
        rows: [
          ['-uro', 'ácido …hídrico', 'Cl⁻ cloruro → HCl ácido clorhídrico'],
          ['-ato', 'ácido …ico', 'SO₄²⁻ sulfato → H₂SO₄ ácido sulfúrico'],
          ['-ito', 'ácido …oso', 'NO₂⁻ nitrito → HNO₂ ácido nitroso'],
        ],
      },
    ],
    commonMistakes: [
      'Usar prefijos en los compuestos iónicos: «dicloruro de calcio» está mal; CaCl2 es cloruro de calcio.',
      'Escribir «monoóxido»: la vocal se pierde — monóxido, tetraóxido, pentaóxido.',
      'Poner un número romano al sodio, al cinc o al aluminio: solo tienen una carga.',
    ],
  },

  'relative-formula-mass': {
    title: 'Masa atómica y masa fórmula relativas',
    summary:
      'Qué significa de verdad Ar y cómo sumar los átomos para obtener la Mr de cualquier fórmula, subíndices y paréntesis incluidos.',
    keyTakeaways: [
      'La masa atómica relativa (Ar) es una comparación, no un peso en gramos: un átomo de carbono pesa aproximadamente lo mismo que 12 átomos de hidrógeno. Ar se mide frente al carbono-12, que vale exactamente 12.',
      'Como es una razón, Ar no tiene unidad. Nada de esta chuleta se mide en gramos hasta que lo escalas a una cantidad real.',
      'La masa fórmula relativa (Mr) es la suma de todos los átomos de la fórmula. Nada más: no se multiplica al final ni se hace una media.',
      'Un subíndice multiplica el átomo que va delante. Un paréntesis multiplica todo lo que hay dentro.',
      'Lee Ar en la tabla periódica. No se espera que te la sepas, y una tabla de clase redondea: H 1, C 12, O 16, Cl 35,5.',
      'Para un compuesto iónico vale lo mismo que para una molécula, y por eso es masa fórmula y no molecular: en NaCl no hay ninguna molécula que pesar.',
    ],
    formulaExampleNames: [
      'Agua',
      'Dióxido de carbono',
      'Carbonato de calcio',
      'Hidróxido de magnesio',
      'Nitrato de calcio',
    ],
    sections: [
      {
        heading: 'Qué quiere decir «relativa»',
        content:
          'Los átomos son demasiado ligeros para pesarlos de uno en uno, así que la química los compara. Pon un átomo de carbono en un platillo y átomos de hidrógeno en el otro: hacen falta 12 hidrógenos para que quede equilibrada. Esa es toda la idea: el carbono pesa 12 veces lo que el hidrógeno, así que decimos que su masa atómica relativa es 12. El número responde a «¿cuántos hidrógenos?», y por eso no tiene unidad: es una comparación, no una medida. En rigor, el patrón es el carbono-12, no el hidrógeno: cada masa atómica relativa compara un átomo con la doceava parte de un átomo de carbono-12. El hidrógeno sale casi exactamente 1, y por eso la imagen de la balanza funciona.',
      },
      {
        heading: 'Sumar los átomos',
        content:
          'La masa fórmula relativa (Mr) es la Ar de cada átomo de la fórmula, sumadas. Ve de izquierda a derecha, un elemento cada vez, y escribe el desarrollo: H2O son 2 hidrógenos de 1 cada uno, más 1 oxígeno de 16, o sea 2 + 16 = 18. El orden da igual y al final no se multiplica nada; si necesitas la calculadora para algo más que una suma, algo va mal.',
        exampleNames: ['Amoniaco', 'Metano', 'Ácido sulfúrico'],
      },
      {
        heading: 'Subíndices y paréntesis',
        content:
          'Un subíndice multiplica solo al átomo al que sigue: el 2 de CO2 significa dos oxígenos, no dos de todo. Un paréntesis multiplica todo el grupo que encierra: Mg(OH)2 es un magnesio más dos unidades OH, así que 24 + 2 × 17 = 58, no 24 + 16 + 1. Cuando veas un paréntesis, calcula el grupo una vez y luego multiplica.',
        exampleNames: ['Sulfato de aluminio'],
      },
      {
        heading: 'Por qué la tabla de clase no coincide con internet',
        content:
          'Un libro de datos da el cloro como 35,45 y el hidrógeno como 1,008, porque una muestra real es una mezcla de isótopos. Una tabla de clase redondea: H 1, C 12, N 14, O 16, Cl 35,5. Las dos son correctas: la redondeada se suma más fácil y es bastante exacta para cualquier pregunta que te vayan a hacer. Usa la tabla de tu clase, y di cuál usaste si el resultado queda justo en el límite.',
      },
      {
        heading: 'Para qué sirve',
        content:
          'En cuanto sabes hallar la Mr de los dos lados de una ecuación, puedes demostrar con números que la masa se conserva y escalar una receta: si 4 g de hidrógeno dan 36 g de agua, 8 g dan 72 g. Eso es masa a masa por proporción, y no hace falta ningún mol. El mol llega después, como atajo para el mismo razonamiento.',
      },
    ],
    tables: [
      {
        heading: 'Los valores que usa una clase',
        caption:
          'Redondeados como los redondea una tabla escolar. El cloro y el cobre conservan un medio porque redondearlos al entero estropearía visiblemente un resultado.',
        columns: ['Elemento', 'Símbolo', 'Ar'],
        rows: [
          ['hidrógeno', 'H', '1'],
          ['carbono', 'C', '12'],
          ['nitrógeno', 'N', '14'],
          ['oxígeno', 'O', '16'],
          ['sodio', 'Na', '23'],
          ['magnesio', 'Mg', '24'],
          ['aluminio', 'Al', '27'],
          ['azufre', 'S', '32'],
          ['cloro', 'Cl', '35.5'],
          ['potasio', 'K', '39'],
          ['calcio', 'Ca', '40'],
          ['hierro', 'Fe', '56'],
          ['cobre', 'Cu', '63.5'],
        ],
      },
      {
        heading: 'Ejemplos resueltos',
        columns: ['Fórmula', 'Desarrollo', 'Mr'],
        rows: [
          ['H2', '2 x 1', '2'],
          ['O2', '2 x 16', '32'],
          ['H2O', '2 x 1 + 16', '18'],
          ['NaCl', '23 + 35.5', '58.5'],
          ['MgO', '24 + 16', '40'],
          ['CO2', '12 + 2 x 16', '44'],
          ['CaCO3', '40 + 12 + 3 x 16', '100'],
          ['H2SO4', '2 x 1 + 32 + 4 x 16', '98'],
          ['Mg(OH)2', '24 + 2 x (16 + 1)', '58'],
          ['Ca(NO3)2', '40 + 2 x (14 + 3 x 16)', '164'],
        ],
      },
    ],
    commonMistakes: [
      'Decir que un átomo de carbono «pesa 12»: ¿12 qué? Ar es una comparación con el hidrógeno y no tiene unidad. Los gramos solo aparecen al escalar a una cantidad real.',
      'Aplicar el subíndice a toda la fórmula: en CO2 el 2 es solo del oxígeno.',
      'Pasar por alto un paréntesis, de modo que Mg(OH)2 sale 41 en vez de 58.',
      'Llamar a la Mr «masa molecular» en NaCl o MgO. Ahí no hay molécula, y justo por eso se llama masa fórmula.',
      'Mezclar un valor del libro de datos en un ejercicio hecho con la tabla de clase y luego extrañarse de que el resultado difiera por una fracción.',
      'Hacer la media de las Ar en lugar de sumarlas.',
    ],
  },

  stoichiometry: {
    title: 'El mol y la estequiometría',
    summary:
      'Conversiones de mol, relaciones molares, reactivo limitante y rendimiento porcentual, todo en un sitio.',
    keyTakeaways: [
      'Un mol son 6,02 × 10^23 partículas (la constante de Avogadro, N_A). La masa molar M (g/mol) es la masa de un mol: se suman las masas atómicas de la tabla periódica.',
      'Todos los caminos pasan por el mol: convierte a moles lo que te dan, usa la relación molar de la ecuación ajustada y vuelve a convertir a lo que te piden.',
      'La relación molar es la relación entre los coeficientes, y nada más.',
      'Reactivo limitante: el reactivo que se acaba primero decide cuánto producto se forma. Calcula los moles de cada reactivo y divide entre su coeficiente; el resultado más pequeño es el limitante.',
      'Rendimiento porcentual = (rendimiento real ÷ rendimiento teórico) × 100. El rendimiento teórico sale del reactivo limitante.',
    ],
    formulaExampleNames: ['Combustión del metano', 'Síntesis del amoniaco'],
    tables: [
      {
        heading: 'Las fórmulas de conversión',
        columns: ['Fórmula', 'Úsala cuando conoces…', 'Unidades'],
        rows: [
          ['n = m ÷ M', 'la masa', 'n en mol, m en g, M en g/mol'],
          ['n = N ÷ N_A', 'el número de partículas', 'N_A = 6,02 × 10²³ mol⁻¹'],
          ['n = c × V', 'la concentración de una disolución', 'c en mol/L, V en L'],
          ['n = V ÷ V_m', 'el volumen de un gas en CLE', 'V_m = 24,8 L/mol a 25 °C y 100 kPa'],
          ['PV = nRT', 'un gas en otras condiciones', 'P en kPa, V en L, T en K, R = 8,31'],
        ],
      },
    ],
    sections: [
      {
        heading: 'Ejemplo resuelto: masa → masa',
        content:
          '¿Qué masa de agua se forma cuando arden del todo 8,0 g de hidrógeno? 2H2 + O2 → 2H2O. n(H2) = 8,0 ÷ 2,0 = 4,0 mol. La relación H2 : H2O es 2 : 2, así que n(H2O) = 4,0 mol. m(H2O) = 4,0 × 18,0 = 72 g.',
      },
      {
        heading: 'Ejemplo resuelto: reactivo limitante',
        content:
          '4,0 mol de H2 reaccionan con 1,0 mol de O2. Divide entre los coeficientes: H2 → 4,0 ÷ 2 = 2,0; O2 → 1,0 ÷ 1 = 1,0. El oxígeno es el limitante. n(H2O) = 2 × n(O2) = 2,0 mol; sobran 2,0 mol de H2 (en exceso).',
      },
    ],
    commonMistakes: [
      'Usar la relación de masas en lugar de la relación molar: 2 g de H2 no reaccionan con 1 g de O2.',
      'Elegir como limitante el reactivo que tiene menos masa, sin pasar antes a moles.',
      'Mezclar unidades: un volumen en mL con una c en mol/L da unos moles 1000 veces mayores.',
      'Redondear pronto: mantén toda la precisión hasta el resultado final y da entonces 3 cifras significativas.',
    ],
  },

  'lewis-structures': {
    title: 'Estructuras de Lewis',
    summary:
      'Cuenta los electrones de valencia, comparte hasta completar los octetos y comprueba con la carga formal.',
    keyTakeaways: [
      'Electrones de valencia = número del grupo para los elementos representativos (H 1, C 4, N 5, O 6, halógenos 7). Suma un electrón por cada carga negativa y quita uno por cada carga positiva.',
      'Cada enlace es un par compartido (2 electrones). Simple = 1 par, doble = 2, triple = 3. Los electrones que no forman enlaces se quedan como pares solitarios.',
      'Regla del octeto: casi todos los átomos quieren 8 electrones de valencia a su alrededor. El hidrógeno quiere 2 (el dueto).',
      'Si al átomo central le falta para el octeto después de repartir todos los electrones, convierte pares solitarios de los átomos exteriores en enlaces adicionales.',
      'Carga formal = electrones de valencia − electrones de los pares solitarios − la mitad de los electrones de enlace. La mejor estructura es la que tiene las cargas formales más cerca de cero, con la carga negativa sobre el átomo más electronegativo.',
    ],
    formulaExampleNames: [
      'Agua: 2 enlaces y 2 pares solitarios en el O',
      'Dióxido de carbono: dos enlaces dobles',
      'Dinitrógeno: enlace triple',
      'Ion amonio: 8 electrones (5 + 4 − 1)',
    ],
    sections: [
      {
        heading: 'Lo imprescindible de 4º de ESO',
        content:
          'Cada átomo trae sus electrones externos en forma de puntos. Un punto que está solo es un impar; dos impares de dos átomos distintos forman un par enlazante, que es un enlace (se dibuja como una raya). Los pares que se quedan en un solo átomo son pares solitarios. Un átomo está completo con 8 puntos alrededor (un octeto); el hidrógeno está completo con 2 (un dueto). Comparte dos veces entre los dos mismos átomos para un enlace doble, y tres para uno triple. El número de impares te dice cuántos enlaces forma un átomo: H 1, C 4, N 3, O 2, Cl 1. El azufre se comporta como el oxígeno y el fósforo como el nitrógeno, porque están en los mismos grupos. Todo lo que viene por debajo de esta sección (carga formal, geometría RPECV, excepciones al octeto) es materia de Bachillerato.',
        exampleNames: [
          'Agua: el oxígeno comparte dos veces y conserva 2 pares solitarios',
          'Metano: el carbono comparte sus cuatro impares',
          'Dioxígeno: dos pares compartidos hacen un enlace doble',
        ],
      },
      {
        heading: 'Los cinco pasos',
        content:
          '1. Cuenta el total de electrones de valencia (ajústalo según la carga). 2. Pon en el centro el átomo menos electronegativo (nunca el H). 3. Une cada átomo exterior al central con un enlace simple. 4. Coloca los electrones que queden como pares solitarios, primero en los átomos exteriores y después en el central. 5. Si al central le falta para el octeto, forma enlaces dobles o triples. Comprueba que el total de electrones coincide con el del paso 1.',
      },
      {
        heading: 'De la estructura de Lewis a la geometría (RPECV)',
        content:
          'Cuenta las regiones de electrones alrededor del átomo central (cada enlace, simple o múltiple, cuenta una vez; cada par solitario cuenta una vez). 4 regiones → tetraédrica (109,5°); con 1 par solitario → piramidal trigonal (NH3); con 2 pares solitarios → angular (H2O). 3 regiones → triangular plana (120°). 2 regiones → lineal (180°).',
      },
      {
        heading: 'Excepciones al octeto',
        content:
          'El Be y el B suelen ser estables con menos de 8 (el BF3 tiene 6). A partir del periodo 3 se puede pasar de 8 (el PCl5 tiene 10 y el SF6 tiene 12). El NO y el NO2 tienen un número impar de electrones, así que hay un átomo que no puede completar el octeto.',
      },
    ],
    tables: [
      {
        heading: 'Electrones de valencia por grupo',
        columns: ['Grupo', 'e⁻ de valencia', 'Enlaces que suele formar', 'Ejemplos'],
        rows: [
          ['1 (H)', '1', '1', 'H'],
          ['14', '4', '4', 'C, Si'],
          ['15', '5', '3 (+1 par solitario)', 'N, P'],
          ['16', '6', '2 (+2 pares solitarios)', 'O, S'],
          ['17', '7', '1 (+3 pares solitarios)', 'F, Cl, Br, I'],
          ['18', '8', '0', 'Ne, Ar'],
        ],
      },
    ],
    commonMistakes: [
      'Dibujar los electrones en órbitas como si fueran planetas: los puntos dicen cuántos hay, no dónde están.',
      'Olvidar añadir electrones a un ion negativo (o quitárselos a uno positivo).',
      'Darle al hidrógeno más de un enlace.',
      'Dejar al átomo central con menos de 8 cuando un enlace doble lo arreglaría (CO2, HCN).',
    ],
  },

  'organic-nomenclature': {
    title: 'Nombrar compuestos orgánicos',
    summary:
      'Nombres IUPAC paso a paso: la cadena más larga, los localizadores más bajos, los sustituyentes por orden alfabético y el sufijo del grupo funcional.',
    keyTakeaways: [
      'Busca la cadena de carbonos continua más larga que incluya el grupo funcional de mayor prioridad: puede doblar por las esquinas del dibujo.',
      'Numera la cadena desde el extremo que le dé al grupo funcional el número más bajo; si no hay grupo funcional, dale el número más bajo al primer sustituyente.',
      'Nombra los sustituyentes como prefijos con su localizador: 2-metil, 3-cloro. Usa di-, tri- para los repetidos y ordénalos alfabéticamente (sin contar di-/tri-: etil va antes que dimetil).',
      'La raíz da la longitud de la cadena; el sufijo da el grupo funcional principal: -ano, -eno, -ino, -ol, -al, -ona, ácido …oico, -amina.',
      'Los números se separan de las palabras con guiones y entre sí con comas: 2,2-dimetilpropan-1-ol.',
    ],
    formulaExampleNames: ['Propan-2-ol', 'But-1-eno', '2-metilpropano', 'Ácido etanoico'],
    tables: [
      {
        heading: 'Raíces según el número de carbonos',
        columns: ['Carbonos', 'Raíz', 'Alcano'],
        rows: [
          ['1', 'met-', 'metano CH₄'],
          ['2', 'et-', 'etano C₂H₆'],
          ['3', 'prop-', 'propano C₃H₈'],
          ['4', 'but-', 'butano C₄H₁₀'],
          ['5', 'pent-', 'pentano C₅H₁₂'],
          ['6', 'hex-', 'hexano C₆H₁₄'],
          ['7', 'hept-', 'heptano C₇H₁₆'],
          ['8', 'oct-', 'octano C₈H₁₈'],
          ['9', 'non-', 'nonano C₉H₂₀'],
          ['10', 'dec-', 'decano C₁₀H₂₂'],
        ],
      },
      {
        heading: 'Prioridad de los sufijos (de mayor a menor)',
        columns: ['Grupo', 'Sufijo', 'Ejemplo'],
        rows: [
          ['Ácido carboxílico', 'ácido …-oico', 'ácido propanoico'],
          ['Éster', '-oato de -ilo', 'etanoato de metilo'],
          ['Aldehído', '-al', 'etanal'],
          ['Cetona', '-ona', 'propan-2-ona'],
          ['Alcohol', '-ol', 'butan-2-ol'],
          ['Amina', '-amina', 'etanamina'],
          ['Alqueno / alquino', '-eno / -ino', 'but-2-eno'],
          ['Haloalcano', 'prefijo: fluoro-, cloro-, bromo-, yodo-', '2-cloropropano'],
        ],
      },
    ],
    sections: [
      {
        heading: 'Ejemplo resuelto',
        content:
          'Una cadena de 5 carbonos con un OH en el carbono 2 y un metilo en el carbono 3. Raíz: pent-. Sufijo: -ol con el localizador 2 (numerando desde el extremo más cercano al OH). Sustituyente: 3-metil. Nombre: 3-metilpentan-2-ol.',
      },
    ],
    commonMistakes: [
      'Tomar la cadena tal como está dibujada en horizontal en lugar de la cadena más larga.',
      'Numerar desde el extremo equivocado: el grupo funcional manda sobre los sustituyentes.',
      'Alfabetizar por el multiplicador: «dimetil» va por la m, no por la d.',
      'Olvidar el localizador de -eno, -ol o -ona cuando la cadena tiene 4 carbonos o más.',
    ],
  },

  'functional-groups': {
    title: 'Grupos funcionales',
    summary: 'Qué aspecto tiene cada grupo, cómo se nombra y qué reacciones da.',
    keyTakeaways: [
      'Un grupo funcional es el átomo o el grupo de átomos que le da a una molécula sus reacciones características. Las moléculas con el mismo grupo reaccionan igual.',
      'Una serie homóloga es una familia con el mismo grupo funcional y una fórmula general, en la que cada miembro se diferencia del anterior en un CH2. Las propiedades físicas cambian poco a poco a lo largo de la serie.',
      'Hidrocarburos: alcanos (solo C–C, saturados), alquenos (C=C), alquinos (C≡C). Solo los alquenos y los alquinos dan reacciones de adición.',
      'Grupos con oxígeno: alcohol (–OH), aldehído (–CHO, en el carbono del extremo), cetona (C=O dentro de la cadena), ácido carboxílico (–COOH), éster (–COO–).',
      'Grupos con nitrógeno y con halógeno: amina (–NH2), amida (–CONH2), haloalcano (–F, –Cl, –Br, –I).',
    ],
    formulaExampleNames: [
      'Etanol (alcohol)',
      'Etanal (aldehído)',
      'Propanona (cetona)',
      'Ácido etanoico (ácido carboxílico)',
      'Etanoato de etilo (éster)',
      'Etanamina (amina)',
    ],
    tables: [
      {
        heading: 'Tabla de consulta de los grupos funcionales',
        columns: ['Grupo', 'Estructura', 'Sufijo / prefijo', 'Fórmula general', 'Reacción típica'],
        rows: [
          ['Alcano', 'solo C–C, C–H', '-ano', 'CₙH₂ₙ₊₂', 'Combustión; sustitución con halógenos (UV)'],
          ['Alqueno', 'C=C', '-eno', 'CₙH₂ₙ', 'Adición (H₂, X₂, HX, H₂O)'],
          ['Haloalcano', 'C–X', 'halo-', 'CₙH₂ₙ₊₁X', 'Sustitución con OH⁻ o NH₃'],
          [
            'Alcohol',
            'C–OH',
            '-ol',
            'CₙH₂ₙ₊₁OH',
            'Oxidación (primario → aldehído → ácido; secundario → cetona); esterificación',
          ],
          ['Aldehído', '–CHO', '-al', 'CₙH₂ₙO', 'Se oxida a ácido carboxílico'],
          ['Cetona', 'C=O (interno)', '-ona', 'CₙH₂ₙO', 'Resiste la oxidación'],
          [
            'Ácido carboxílico',
            '–COOH',
            'ácido …-oico',
            'CₙH₂ₙO₂',
            'Ácido débil; esterificación con un alcohol',
          ],
          ['Éster', '–COO–', '-oato de -ilo', '—', 'Hidrólisis, que devuelve el ácido y el alcohol'],
          ['Amina', '–NH₂', '-amina', 'CₙH₂ₙ₊₁NH₂', 'Base débil; forma amidas con los ácidos'],
          ['Amida', '–CONH₂', '-amida', '—', 'Hidrólisis'],
        ],
      },
    ],
    sections: [
      {
        heading: 'El camino de reacción que hay que saberse',
        content:
          'Alqueno → (H2O, con H+ de catalizador) → alcohol. Alqueno → (HX) → haloalcano → (OH−) → alcohol → (Cr2O7 2−/H+) → aldehído → (más oxidación) → ácido carboxílico → (alcohol, con H2SO4 de catalizador) → éster. Los alcoholes primarios se oxidan dos veces, los secundarios se oxidan una vez y dan cetonas, y los terciarios no se oxidan.',
      },
      {
        heading: 'Reconocer un grupo en un espectro',
        content:
          'IR: una banda ancha de O–H hacia 3200–3550 cm⁻¹ indica un alcohol (o, si es muy ancha y se solapa con el C–H, un ácido carboxílico); un C=O intenso cerca de 1670–1750 cm⁻¹ indica un aldehído, una cetona, un ácido, un éster o una amida. El libro de datos de VCE da los intervalos exactos: úsalo.',
      },
    ],
    commonMistakes: [
      'Llamar alcohol a una molécula con –OH sobre un anillo de benceno (es un fenol): queda fuera del temario de VCE, pero es una trampa habitual.',
      'Confundir un aldehído (C=O en el extremo) con una cetona (C=O en medio).',
      'Creer que los ésteres son ácidos porque contienen –COO–: no tienen ningún H ácido.',
    ],
  },
};
