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
// symbols, charges, structural notation (C–OH, –CHO), the names of
// English-language linked resources, and the Australian curriculum references
// (only the words around them are Spanish).

import { POLYATOMIC_ION_TABLE } from '@/lib/cheat-sheet-data';
import type { CheatSheetOverlaySet, ResourceDescriptions } from '../cheat-sheets';

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

export const RESOURCE_DESCRIPTIONS_ES: ResourceDescriptions = {
  'https://www.vcaa.vic.edu.au/sites/default/files/2026-02/2026-ChemistryDataBook.pdf':
    'Exactamente las tablas que te dan en el examen: tabla periódica, iones poliatómicos, datos de IR y RMN, constantes. (En inglés.)',
  'https://www.vcaa.vic.edu.au/curriculum/vce/vce-study-designs/chemistry/Pages/index.aspx':
    'El currículo oficial y las competencias esperadas para las Units 1 a 4 (2023–2027). (En inglés.)',
  'https://www.khanacademy.org/science/hs-chemistry':
    'Vídeos cortos y ejercicios; útil para una segunda explicación de cualquier tema de esta página. (En inglés.)',
  'https://chem.libretexts.org/':
    'Libro de texto libre y gratuito; busca cualquier concepto para una explicación más a fondo, a nivel de examen. (En inglés.)',
  'https://www.chemguide.co.uk/':
    'Explicaciones claras y sin rodeos, especialmente buenas para los mecanismos de química orgánica y para el enlace. (En inglés.)',
  'https://ptable.com/':
    'Pulsa un elemento para ver su configuración electrónica, su electronegatividad y sus iones más comunes.',
  'https://phet.colorado.edu/en/simulations/build-an-atom':
    'Añade protones, neutrones y electrones y observa cómo cambian el elemento, la carga y la masa sobre la marcha.',
  'https://phet.colorado.edu/en/simulations/isotopes-and-atomic-mass':
    'Mezcla isótopos en distintas proporciones y mira cómo se desplaza la masa atómica relativa.',
  'https://www.rsc.org/periodic-table':
    'Datos fiables sobre los elementos, con su historia y sus usos: práctico para un trabajo de clase. (En inglés.)',
  'https://molview.org/':
    'Dibuja una molécula y mírala en 3D; muestra los enlaces, la geometría y el nombre IUPAC.',
  'https://pubchem.ncbi.nlm.nih.gov/':
    'Busca cualquier compuesto: estructura, nombre IUPAC, masa molar, propiedades. (En inglés.)',
  'https://goldbook.iupac.org/':
    'Las definiciones de referencia de los términos de la química. (En inglés.)',
  'https://phet.colorado.edu/en/simulations/states-of-matter':
    'Calienta, enfría y comprime átomos y moléculas, y observa el cambio de estado.',
  'https://phet.colorado.edu/en/simulations/ph-scale':
    'Mide el pH de líquidos de todos los días y observa el equilibrio entre H3O+ y OH-.',
  'https://phet.colorado.edu/en/simulations/acid-base-solutions':
    'Compara los ácidos fuertes y los débiles a escala de partículas.',
  'https://phet.colorado.edu/en/simulations/balancing-chemical-equations':
    'Arrastra los coeficientes y mira cómo cambia el número de átomos sobre una balanza.',
  'https://phet.colorado.edu/en/simulations/build-a-molecule':
    'Monta moléculas a partir de átomos y ve sus fórmulas y sus formas en 3D.',
  'https://phet.colorado.edu/en/simulations/molecule-shapes':
    'Añade enlaces y pares solitarios a un átomo central y mira cómo cambia la forma según la RPECV.',
  'https://phet.colorado.edu/en/simulations/reactants-products-and-leftovers':
    'Primero bocadillos y después reacciones de verdad: la forma más clara de ver qué es un reactivo limitante.',
  'https://www.compoundchem.com/2020/02/21/functional-groups/':
    'Una infografía de una página sobre cada grupo funcional, con su estructura y un ejemplo: para imprimir. (En inglés.)',
  'https://www.compoundchem.com/2014/02/17/organic-chemistry-reaction-map/':
    'Los caminos de reacción entre los grupos funcionales, en una sola página. (En inglés.)',
  'https://sdbs.db.aist.go.jp/':
    'Espectros de IR y RMN reales de miles de compuestos orgánicos. (En inglés.)',
  'https://webbook.nist.gov/chemistry/':
    'Espectros de referencia y datos termoquímicos. (En inglés.)',
};

export const CHEAT_SHEET_OVERLAY_ES: CheatSheetOverlaySet = {
  'atomic-structure': {
    title: 'Átomos, isótopos y la tabla periódica',
    summary:
      'De qué está hecho un átomo, por qué el número atómico define el elemento y cómo está ordenada la tabla.',
    curriculumRef:
      'Victorian Curriculum Science nivel 9: el átomo como unidad más pequeña de un elemento, las partículas del núcleo, el número atómico y los isótopos. Las dos últimas secciones se adelantan a 4.º de secundaria y a VCE Unit 1.',
    keyTakeaways: [
      'Un átomo es un núcleo de protones y neutrones, con electrones repartidos a su alrededor.',
      'El número de protones —el número atómico— es lo que hace que un átomo sea ese elemento. Cámbialo y tienes otro elemento.',
      'Los isótopos son átomos del mismo elemento con distinto número de neutrones. Químicamente se comportan igual.',
      'La masa atómica relativa es una media ponderada entre los isótopos de un elemento. Por eso tan pocas son números enteros.',
      'Los electrones ocupan niveles de energía, y cuántos hay en el nivel exterior es el criterio con el que está ordenada la tabla.',
      'Casi todo el átomo es espacio vacío. Cualquier dibujo de un átomo se equivoca en la escala, también los de aquí.',
    ],
    formulaExampleNames: [
      'Cloro-35',
      'Cloro-37',
      'Carbono-12',
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
          'El número atómico es el número de protones, y es lo que hace que un átomo sea ese elemento. Todo átomo de cloro tiene 17 protones; cualquier cosa con 17 protones es cloro. El número másico es protones más neutrones. Los neutrones pueden variar sin que cambie el elemento.',
        exampleNames: ['Cloro-35', 'Cloro-37'],
        imageAlt:
          'El símbolo del cloro-35 con el número másico 35 escrito encima del número atómico 17, y flechas que señalan: 17 protones, y 35 menos 17 da 18 neutrones.',
      },
      {
        heading: 'Isótopos',
        content:
          'Los isótopos son átomos de un mismo elemento con distinto número de neutrones. La química la hacen los electrones, y los isótopos tienen el mismo número, así que reaccionan igual. Lo que cambia es la masa y, a veces, la estabilidad: algunos isótopos son radiactivos y otros no.',
        imageAlt:
          'Tres átomos de hidrógeno uno al lado del otro: uno con un protón, otro con un protón y un neutrón, y otro con un protón y dos neutrones. Los tres tienen un solo electrón.',
      },
      {
        heading: 'Por qué la masa atómica relativa casi nunca es un número entero',
        content:
          'Una muestra de un elemento es una mezcla de sus isótopos, en proporciones fijas. La masa atómica relativa es la media de esa mezcla, ponderada según lo común que es cada isótopo. El cloro es aproximadamente tres cuartas partes cloro-35 y una cuarta parte cloro-37. La media sale 35,5. Ningún átomo de cloro pesa eso.',
        imageAlt:
          'Una barra que muestra un 75 por ciento de cloro-35 y un 25 por ciento de cloro-37, con la media ponderada 35,5 marcada más cerca del extremo del 35.',
      },
      {
        heading: 'Electrones, niveles de energía y la forma de la tabla',
        content:
          'Los electrones ocupan niveles de energía alrededor del núcleo. El primero admite hasta 2, el siguiente hasta 8, y otros 8 en los veinte primeros elementos. Cuántos hay en el nivel exterior determina cómo reacciona un átomo. Dos elementos van en el mismo grupo cuando tienen el mismo número fuera. Por eso un grupo se comporta de forma parecida.',
        imageAlt:
          'Un átomo de sodio dibujado con tres niveles de energía que contienen 2, 8 y 1 electrones, junto a la tabla periódica con el grupo 1 resaltado.',
      },
      {
        heading: 'Ordenada por número atómico, no por masa',
        content:
          'Mendeléiev ordenó la tabla por masa, y algunos elementos quedaron en el sitio equivocado. En 1913 Henry Moseley midió la carga del núcleo y encontró el orden que funciona: el número atómico. El teluro es más pesado que el yodo, pero va antes, porque tiene un protón menos.',
        imageAlt:
          'El teluro y el yodo uno al lado del otro. El teluro tiene mayor masa atómica relativa pero menor número atómico, y la tabla lo coloca primero.',
      },
      {
        heading: 'Núcleos inestables y elementos que hubo que fabricar',
        content:
          'Algunos núcleos son inestables y se desintegran emitiendo radiación. El periodo de semidesintegración es el tiempo que tarda en desintegrarse la mitad de una muestra. Los elementos posteriores al uranio no tienen isótopos estables y no se encuentran en la naturaleza. Se construyen en aceleradores, a veces unos pocos átomos cada vez.',
        imageAlt:
          'Una curva de desintegración que se reduce a la mitad en cada periodo, junto a las últimas filas de la tabla periódica con los elementos que solo existen cuando se fabrican resaltados.',
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
      {
        heading: 'Los veinte primeros elementos',
        caption:
          'La distribución electrónica se escribe del nivel interior al exterior: el sodio es 2, 8, 1.',
        columns: ['Elemento', 'Símbolo', 'Número atómico', 'Distribución electrónica'],
        rows: [
          ['Hidrógeno', 'H', '1', '1'],
          ['Helio', 'He', '2', '2'],
          ['Litio', 'Li', '3', '2, 1'],
          ['Berilio', 'Be', '4', '2, 2'],
          ['Boro', 'B', '5', '2, 3'],
          ['Carbono', 'C', '6', '2, 4'],
          ['Nitrógeno', 'N', '7', '2, 5'],
          ['Oxígeno', 'O', '8', '2, 6'],
          ['Flúor', 'F', '9', '2, 7'],
          ['Neón', 'Ne', '10', '2, 8'],
          ['Sodio', 'Na', '11', '2, 8, 1'],
          ['Magnesio', 'Mg', '12', '2, 8, 2'],
          ['Aluminio', 'Al', '13', '2, 8, 3'],
          ['Silicio', 'Si', '14', '2, 8, 4'],
          ['Fósforo', 'P', '15', '2, 8, 5'],
          ['Azufre', 'S', '16', '2, 8, 6'],
          ['Cloro', 'Cl', '17', '2, 8, 7'],
          ['Argón', 'Ar', '18', '2, 8, 8'],
          ['Potasio', 'K', '19', '2, 8, 8, 1'],
          ['Calcio', 'Ca', '20', '2, 8, 8, 2'],
        ],
      },
    ],
    commonMistakes: [
      'Dibujar los electrones en órbitas circulares, como planetas. No van por una trayectoria. Un nivel es una energía, y un electrón está en algún punto de una región alrededor del núcleo, no sobre una línea.',
      'Creerse el tamaño de los dibujos. Si el núcleo fuera un guisante, el átomo sería un campo de deporte. Cualquier esquema aplasta esa diferencia para que quepa en la página, también los de esta chuleta.',
      'Confundir el número atómico con el número másico. El número atómico son los protones y da nombre al elemento. El número másico son protones más neutrones.',
      'Leer la masa atómica relativa como un recuento de partículas. Es una media entre isótopos: el 35,5 del cloro no es ningún átomo que puedas encontrar.',
      'Pensar que un ion es otro elemento. Perder o ganar un electrón cambia la carga, no el número de protones. El sodio y Na+ son los dos sodio.',
    ],
  },
  'states-of-matter': {
    title: 'Los estados de la materia',
    summary: 'Cómo se colocan las partículas, energía cinética y los seis cambios de estado.',
    curriculumRef:
      'Victorian Curriculum Science: modelo de partículas (Levels 7–8), retomado en Year 9–10 (ciencias químicas).',
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
    curriculumRef:
      'Victorian Curriculum Science Level 10 (reacciones químicas, ácidos incluidos); VCE Unit 2 AoS 1 (Brønsted-Lowry).',
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
    curriculumRef:
      'Victorian Curriculum Science Level 10; VCE Unit 1–2 (escribir ecuaciones ajustadas con los estados).',
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
    curriculumRef: 'Victorian Curriculum Science Level 10; VCE Unit 2 AoS 1–2.',
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
    curriculumRef:
      'Victorian Curriculum Science Level 10; VCE Unit 1 AoS 1 (metales, compuestos iónicos, sustancias covalentes).',
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
    curriculumRef: 'Victorian Curriculum Science Level 10; VCE Unit 1 AoS 1.',
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
    curriculumRef:
      'VCE Unit 1 AoS 1 (fórmulas y nombres de los compuestos iónicos). El libro de datos de VCE incluye esta tabla en el examen.',
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
    curriculumRef: 'VCE Unit 1 AoS 1 (nomenclatura IUPAC de compuestos iónicos y covalentes).',
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

  stoichiometry: {
    title: 'El mol y la estequiometría',
    summary:
      'Conversiones de mol, relaciones molares, reactivo limitante y rendimiento porcentual, todo en un sitio.',
    curriculumRef:
      'VCE Unit 2 AoS 1–2 (el mol, la concentración, la estequiometría); Unit 3 AoS 2 (rendimiento).',
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
    curriculumRef:
      'VCE Unit 1 AoS 1 (enlace covalente, estructuras de Lewis, geometría RPECV).',
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
    curriculumRef: 'VCE Unit 4 AoS 1 (nomenclatura sistemática IUPAC de compuestos orgánicos).',
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
    curriculumRef:
      'VCE Unit 4 AoS 1 (grupos funcionales, series homólogas, caminos de reacción) y AoS 2 (identificación por IR y RMN).',
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
