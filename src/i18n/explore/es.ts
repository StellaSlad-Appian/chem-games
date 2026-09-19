// src/i18n/explore/es.ts
//
// Spanish prose for the Explore page. See src/i18n/explore.ts for how this
// overlays onto the English pool, and why the ids, the formulae, the dates and
// the names of people are not here.
//
// Terminology follows docs/i18n/glossary-es.md. The decisions that recur in
// this file, including the ones taken here because the glossary does not cover
// them yet (all listed in the milestone report so they can be added):
//
//   enlace de hidrógeno (not «puente de hidrógeno») · par solitario / par
//   enlazante · electrones externos · ion (no accent) · ion poliatómico vs. ion
//   complejo · disolución (an es-ES marker) · fertilizante · grupo amino /
//   grupo hidroxilo / grupo ácido carboxílico · gas de efecto invernadero ·
//   cuasicristal · patrón de difracción · cristal líquido · monocapa ·
//   isotáctico · quiral / imágenes especulares · el sistema R/S · peróxido
//   (puente de dos oxígenos) · hidrogenación catalítica · calor latente de
//   fusión · material de cambio de fase · umami · aramida · hebra (of DNA) ·
//   macla.
//
// Register: informal "tú", school-level vocabulary, Spanish typography
// (mandatory ¿ and ¡, « … » with no inner spaces, NO space before : ; ! ?,
// – for parenthetical dashes, … as one character, decimal comma, accents kept
// on capitals). No -e / -x / @ forms: epicene nouns and rewriting instead, so
// no adjective ever has to agree with the reader. The verb the glossary bans
// outright appears nowhere in the prose: «forma la sal de sodio», never the
// other verb, in monosodium-glutamate.
//
// **Two shapes of molecule entry, and the difference is load-bearing.** The
// five registry species – ammonia, water, sodium-bicarbonate, sodium-sulfate,
// sodium-chloride – carry **no `name`**: their Spanish name comes from
// chemistry-names/es.ts (*amoniaco*, *agua*, *hidrogenocarbonato de sodio*,
// *sulfato de sodio*, *cloruro de sodio*) and restating it here would be a
// second copy that can disagree with the first. The other fifteen have one.
//
// Adaptations rather than translations, because a calque would be wrong or
// misleading in Spanish:
//
//   * **«un cristal y un vidrio»** does not work in silicon-dioxide. In Spain
//     *cristal* is the everyday word for window glass, so the English contrast
//     would read as "the difference between glass and glass". Rendered
//     **«un sólido cristalino y un vidrio»**. In sodium-chloride, where
//     *cristal* means the object, the ordinary word is kept.
//   * **«more than a hundred million million»** in the Sørensen entry is 10^14,
//     which in Spanish is **cien billones** – a Spanish *billón* is 10^12. Not
//     *cien millones de millones*, and never *cien trillones*.
//   * **The benzene limit** is given as the EU limit, since the English pairs
//     the UK with it and a Spanish reader is in neither market by default.
//   * **Kevlar** and **urea** are the two names Spanish does not change, and
//     they are left plain. The first draft glossed them — *Kevlar (aramida)*,
//     *Urea (carbamida)* — purely so that no string would be byte-identical to
//     the English and the parity gate would pass. That is the one thing the
//     gate's allowlist exists to prevent, so both are now listed in
//     `identicalByDesign` in src/i18n/explore.test.ts instead. *Carbamida* is
//     a real Spanish word that nobody says; it does not belong on a card
//     heading to satisfy a test.
//
// Not translated anywhere in this file: formulae (CH4 + 2O2 -> CO2 + 2H2O, O3,
// N2, H2), element symbols, the names of people, institutions and places, and
// Shechtman's notebook entry, which is quoted in his own words.

import type { ExploreOverlay } from '../explore';

export const EXPLORE_OVERLAY_ES = {
  molecules: {
    benzene: {
      name: 'Benceno',
      everyday:
        'El benceno es uno de los componentes ligeros de la gasolina, y se fabrica en cantidades enormes como materia prima de plásticos, nailon y colorantes. Seguramente nunca tengas delante un frasco de benceno. Su anillo, en cambio, lo tienes cerca todo el rato: ese hexágono de seis carbonos está en el corazón del paracetamol, del poliestireno y de varios aminoácidos de tu propio cuerpo. El benceno es una causa reconocida de leucemia, y por eso la ley de la Unión Europea limita al uno por ciento en volumen la cantidad que puede llevar el combustible, y por eso las gasolineras se construyen para estar siempre ventiladas.',
      chemistry:
        'El anillo son seis carbonos en un hexágono plano, cada uno con un hidrógeno hacia fuera. Lo raro es que seis de sus electrones no pertenecen a ningún enlace concreto. Están repartidos por todo el anillo, por encima y por debajo del hexágono. Ese reparto explica que el benceno sea mucho menos reactivo de lo que harían pensar tres enlaces dobles, y que los seis enlaces entre carbonos midan exactamente lo mismo en lugar de alternar cortos y largos.',
    },

    'citric-acid': {
      name: 'Ácido cítrico',
      everyday:
        'El ácido cítrico es lo que hace que un limón pique: supone alrededor del cinco por ciento del peso del zumo de limón. También es el polvo agrio que recubre las chucherías, el punto ácido de un refresco, el ingrediente activo del antical de la cafetera y un añadido de casi cualquier conserva, donde da sabor y ayuda a que el contenido no se estropee. La mayor parte del ácido cítrico que se vende no se exprime de ninguna fruta: se obtiene alimentando con azúcar a un moho que lo produce por toneladas.',
      chemistry:
        'La molécula lleva tres grupos ácido carboxílico, y cada uno puede soltar un ion hidrógeno. Eso la convierte en un ácido débil: en agua cede sus hidrógenos solo en parte, y no todos a la vez. Lo útil es justo esa debilidad. Un ácido fuerte a la misma concentración te levantaría el esmalte de los dientes; el ácido cítrico se queda en hacerte poner cara de limón. Además sujeta con fuerza los iones metálicos, que es lo que arranca la cal de una cafetera.',
    },

    'silicon-dioxide': {
      name: 'Dióxido de silicio',
      everyday:
        'El dióxido de silicio es la arena, el cuarzo y casi todo el vidrio que te rodea. Una ventana es un 70 por ciento dióxido de silicio, con óxidos de sodio y de calcio mezclados para bajar el punto de fusión hasta algo que un horno pueda alcanzar de verdad. El mismo compuesto va dentro de esas bolsitas con el aviso de no comer que aparecen en las cajas de zapatos: allí se ha fabricado poroso para que absorba el agua.',
      chemistry:
        'En el cuarzo, cada átomo de silicio se une a cuatro oxígenos y cada oxígeno hace de puente entre dos silicios, en un patrón que se repite sin fin. En el vidrio están los mismos enlaces, pero no el patrón: la red se ha quedado congelada en desorden, porque el líquido se enfrió más deprisa de lo que los átomos tardaban en colocarse. Esa diferencia es toda la diferencia entre un sólido cristalino y un vidrio. Y conviene enterrar un cuento muy repetido: el vidrio no es un líquido que fluye despacio, y las ventanas antiguas son más gruesas por abajo por cómo se fabricaron, no porque hayan escurrido.',
    },

    'monosodium-glutamate': {
      name: 'Glutamato monosódico',
      everyday:
        'El glutamato monosódico es un cristal blanco que se añade a sopas, patatas fritas de bolsa, pastillas de caldo y fideos instantáneos. Ese mismo ion, como glutamato libre, es lo que hace que el parmesano, el tomate maduro, la salsa de soja y el alga kombu sepan a umami – y tu cuerpo no distingue entre los dos, porque son químicamente idénticos. Una ración normal de un alimento con glutamato añadido lleva menos de medio gramo.',
      chemistry:
        'El ácido glutámico es un aminoácido, así que tiene un grupo amino en un extremo y, cosa rara, dos grupos ácido carboxílico. Forma la sal de sodio de uno de esos dos grupos ácidos y ya tienes glutamato monosódico: mono porque lleva un sodio, no dos. Disuelto en agua se separa en un ion sodio y un ion glutamato, y es el ion glutamato el que encaja en el receptor de tu lengua. El sodio va de acompañante, y por eso el sabor es sabroso y no salado.',
    },

    'cfc-12': {
      name: 'Diclorodifluorometano',
      everyday:
        'Vendido como freón-12, este gas estuvo en casi todas las neveras y en casi todos los aerosoles desde los años treinta hasta los noventa. Se eligió porque es asombrosamente poco reactivo: no arde, no corroe nada, no es venenoso y no le hace absolutamente nada a lo que toca. Eso es lo que hacía seguro meterlo en una cocina, y es también lo que lo convirtió en un desastre. Fabricarlo está prohibido en casi todos los países desde 1996, y la cantidad que queda en el aire baja muy despacio.',
      chemistry:
        'Como aquí abajo no hay nada que lo destruya, una molécula sube durante años hasta llegar a la estratosfera. Allí la luz ultravioleta es por fin lo bastante fuerte como para arrancarle un átomo de cloro. Ese cloro ataca al ozono, O3, y se recupera intacto al final del paso siguiente, así que un solo átomo de cloro puede dar vueltas y más vueltas y destruir miles de moléculas de ozono. Así es como un gas presente en cantidades mínimas consiguió adelgazar una capa del tamaño de un continente.',
    },

    ammonia: {
      everyday:
        'El amoniaco es un gas de olor penetrante que se disuelve con muchísima facilidad en agua; el limpiador que huele tan fuerte es una disolución diluida de amoniaco. Casi todo el que se fabrica – unos 180 millones de toneladas al año – acaba de fertilizante, esparcido directamente o convertido antes en urea o en nitrato de amonio. También llevas un poco en la sangre, porque tu cuerpo lo produce al degradar las proteínas.',
      chemistry:
        'El nitrógeno se coloca en el centro con tres hidrógenos alrededor y un par de electrones que le sobra, y ese par empuja la molécula hasta darle forma de pirámide achatada en lugar de triángulo plano. Ese par sobrante lo explica todo. Está libre para capturar un ion hidrógeno, que es lo que hace del amoniaco una base, y es lo que le permite unirse tan bien al agua por enlaces de hidrógeno. En la industria se construye a partir de N2 y H2: el nitrógeno sale del aire y el hidrógeno suele salir del gas natural, y por eso fabricarlo produce además muchísimo dióxido de carbono.',
    },

    cholesterol: {
      name: 'Colesterol',
      everyday:
        'Todas las células animales que tienes están envueltas en una membrana con colesterol metido dentro, y tu propio hígado fabrica casi todo el que necesitas. Además es la materia prima con la que tu cuerpo construye la vitamina D, la bilis y varias hormonas. Te lo encuentras en los huevos, en la carne y en los lácteos, y tiene una fama que solo se merece a medias: en la mayoría de las personas, el colesterol de la comida influye mucho menos en el de la sangre que la cantidad de grasa saturada.',
      chemistry:
        'La molécula son cuatro anillos fusionados – el esqueleto esteroideo – con una cola corta de hidrocarburo en un extremo y un único grupo hidroxilo en el otro. Ese hidroxilo es la única parte a la que le gusta el agua. Por eso una molécula de colesterol se coloca en la membrana siempre del derecho: el hidroxilo hacia fuera, donde está el agua, y los anillos y la cola enterrados entre las cadenas grasas. Encajada así, impide que la membrana se vuelva demasiado blanda con el calor o demasiado rígida con el frío.',
    },

    'oleic-acid': {
      name: 'Ácido oleico',
      everyday:
        'El ácido oleico es el ácido graso principal del aceite de oliva – alrededor de tres cuartas partes – y también es casi todo lo que hay en el aceite de colza, en las almendras y en los aguacates. Es la razón de que esos aceites sigan líquidos dentro del armario. La misma molécula es buena parte de la grasa que produce tu propia piel.',
      chemistry:
        'La molécula es una cadena de dieciocho carbonos con un grupo ácido carboxílico en un extremo y un único enlace doble en mitad de la cadena. Ese enlace doble es cis: las dos mitades de la cadena salen por el mismo lado, así que la cadena lleva un codo permanente. Las cadenas con codo no pueden apilarse bien unas contra otras, de modo que siguen líquidas a temperaturas en las que las rectas ya han solidificado, y esa es toda la diferencia entre un aceite y una grasa dura. Añade hidrógeno a ese enlace doble sobre un catalizador de níquel y obtienes ácido esteárico: dieciocho carbonos, sin codo, sólido a temperatura ambiente. Hecho sobre grasas de verdad, así es como un aceite líquido se convierte en margarina.',
    },

    methane: {
      name: 'Metano',
      everyday:
        'El metano es el gas natural. Calienta casas, cocina la comida y genera alrededor de la quinta parte de la electricidad del mundo. También se escapa de las marismas, de los arrozales y de los vertederos, y sale de las vacas, y es un gas de efecto invernadero mucho más potente que el dióxido de carbono, aunque se descompone en la atmósfera en cosa de una década, cosa que el dióxido de carbono no hace.',
      chemistry:
        'Un carbono, cuatro hidrógenos, colocados como un tetraedro porque cuatro pares de electrones se empujan entre sí todo lo que pueden. Quemarlo es la combustión más sencilla que existe: CH4 + 2O2 -> CO2 + 2H2O. Cuenta los átomos de cada lado y verás por qué hacen falta exactamente dos moléculas de oxígeno y no una: los cuatro hidrógenos dan dos aguas, que se llevan dos átomos de oxígeno, y el carbono se queda con los otros dos. Esa única ecuación es el punto de partida de casi todos los problemas de estequiometría.',
    },

    water: {
      everyday:
        'El agua cubre casi todo el planeta, es alrededor del 60 por ciento de ti y es la única sustancia corriente que puedes encontrarte sólida, líquida y gaseosa el mismo día. También es la razón de que un estanque se hiele empezando por la superficie: el agua sólida es menos densa que la líquida, algo tan poco habitual que casi no tiene ningún otro ejemplo.',
      chemistry:
        'El oxígeno aporta seis electrones externos y comparte dos, uno con cada hidrógeno. Le quedan dos pares sin compartir: los pares solitarios. Los cuatro pares se empujan entre sí, y como los pares solitarios ocupan más sitio que los pares enlazantes, la molécula acaba doblada, con un ángulo de unos 104,5 grados en lugar de quedar recta. Una molécula doblada y con un oxígeno que tira de los electrones hacia sí tiene un extremo negativo y otro positivo, así que las moléculas se pegan unas a otras. Esa pegajosidad explica que el agua siga líquida a 80 °C, cuando algo tan ligero no tendría por qué ser otra cosa que un gas.',
    },

    kevlar: {
      // Marca registrada, igual en los dos idiomas. Está en la lista de
      // excepciones de src/i18n/explore.test.ts.
      name: 'Kevlar',
      everyday:
        'El Kevlar está en los chalecos antibalas, en las chaquetas de moto, en los guantes anticorte, en las pastillas de freno, en los cinturones de los neumáticos y en los cascos de las lanchas de competición. Se vende como una fibra amarilla que se trenza en cuerda y se teje en tela. Su nombre propio, poli(parafenilentereftalamida), describe aquello con lo que está construido más que ninguna otra cosa; nadie lo dice en voz alta.',
      chemistry:
        'La fórmula de arriba es la unidad que se repite: un anillo de benceno, un enlace amida, otro anillo, otra amida, una y otra vez, miles de veces a lo largo de una misma cadena. A partir de ahí, dos cosas lo hacen resistente. Los anillos mantienen cada cadena rígida y estirada en lugar de blanda, así que a una fibra de la que se tira no le queda nada por desplegar. Y los grupos amida de cadenas vecinas se unen entre sí por enlaces de hidrógeno formando láminas planas, de modo que las cadenas no pueden deslizarse unas sobre otras. A igualdad de peso gana al acero cuando se tira de él; el acero gana en casi todo lo demás, incluido sobrevivir a un incendio.',
    },

    'lithium-cobalt-oxide': {
      name: 'Óxido de litio y cobalto',
      everyday:
        'El óxido de litio y cobalto es el electrodo positivo de muchísimas baterías de móvil y de portátil. Nunca lo vas a ver: es un polvo negro, pintado sobre una lámina de aluminio y enrollado dentro de la pila. El cobalto que lleva es la razón de que los fabricantes de baterías intenten usar cada vez menos: alrededor de tres cuartas partes del cobalto del mundo se extrae en la República Democrática del Congo, y parte viene de minas pequeñas y sin control, con problemas reales de seguridad y de trabajo infantil.',
      chemistry:
        'La estructura son capas: láminas de cobalto y oxígeno con iones litio alojados en los huecos que quedan entre ellas. Al cargar la batería, los iones litio salen de entre las capas y viajan hasta el electrodo de carbono del otro extremo; al usarla, vuelven. El cobalto cambia de estado de oxidación cada vez para mantener la carga equilibrada. No se destruye nada y no se construye nada nuevo, y por eso una pila puede recargarse cientos de veces. Pero si se sacan demasiados iones, las capas se hunden, y por eso toda batería lleva una electrónica cuyo trabajo es impedírtelo.',
    },

    adenine: {
      name: 'Adenina',
      everyday:
        'La adenina es la A de la A, la T, la C y la G del ADN: una de las cuatro bases cuyo orden deletrea un gen. En cada una de tus células hay unos tres mil millones de esas letras, y más o menos la cuarta parte son adenina. También forma parte del ATP, la molécula con la que tus células mueven la energía de un sitio a otro, así que la estás reconstruyendo y gastando a cada segundo del día.',
      chemistry:
        'La molécula son dos anillos fusionados, uno de seis miembros y otro de cinco, con átomos de nitrógeno incrustados en los dos. Los químicos llaman purina a esa disposición. De uno de los anillos cuelga un grupo amino. En el ADN, ese grupo amino y uno de los nitrógenos del anillo forman dos enlaces de hidrógeno con una timina de la hebra de enfrente: exactamente dos, y por eso la adenina se empareja con la timina y no con la citosina, que necesita tres. El emparejamiento no tiene nada de magia. Son enlaces de hidrógeno que encajan o no encajan.',
    },

    'sodium-bicarbonate': {
      everyday:
        'Esto es el bicarbonato de toda la vida. Hace que los bizcochos suban, pone las burbujas en una bomba de baño y el alivio en una pastilla para la acidez de estómago, y es lo que llevan dentro muchos extintores de polvo. El mismo compuesto está disuelto en tu sangre, donde su trabajo es evitar que la acidez se descontrole cuando haces ejercicio.',
      chemistry:
        'Es un compuesto iónico, así que en realidad no está hecho de moléculas: son iones sodio e iones hidrogenocarbonato apilados en una red. El ion hidrogenocarbonato es la mitad interesante: cuatro átomos que viajan juntos como una sola unidad con una carga negativa, que es justo lo que quiere decir poliatómico. Dale un ion hidrógeno de un ácido y se deshace en agua y dióxido de carbono, y ese dióxido de carbono son las burbujas. Caliéntalo y pasa prácticamente lo mismo, y por eso funciona en un bizcocho aunque no haya ningún ácido cerca.',
    },

    urea: {
      // La misma palabra en los dos idiomas; «carbamida» existe pero nadie la
      // usa. Está en la lista de excepciones de src/i18n/explore.test.ts.
      name: 'Urea',
      everyday:
        'La urea es la forma en que tu cuerpo se deshace del nitrógeno que no puede aprovechar: el hígado la construye a partir de amoniaco y los riñones la expulsan con la orina. Además es el fertilizante más usado del planeta: más de la mitad de todo el nitrógeno que se echa a los campos se echa como urea. Y aparece en las cremas para la cara, donde ayuda a que la piel retenga el agua.',
      chemistry:
        'La molécula es un solo carbono con un oxígeno unido por un enlace doble y un grupo amino a cada lado. Casi la mitad de su masa es nitrógeno, y por eso compensa pagar el transporte de la urea de un extremo a otro del mundo. En la industria se fabrica a partir de amoniaco y dióxido de carbono, así que su nitrógeno salió del aire por la vía del proceso de Haber. En 1828, Friedrich Wöhler obtuvo urea calentando una sal inorgánica, y aquello dejó pasmados a los químicos, porque se suponía que la urea solo podía salir de un ser vivo. La versión bonita según la cual aquel experimento zanjó la discusión de un día para otro es una exageración, pero el susto fue real.',
    },

    limonene: {
      name: 'Limoneno',
      everyday:
        'Aprieta la piel de una naranja cerca de una vela y esos pequeños destellos son limoneno ardiendo. Es el ingrediente principal del aceite de la piel de los cítricos, y se prensa por miles de toneladas a partir de las cáscaras que sobran de hacer zumo. De ahí pasa a los productos de limpieza, a los quitapinturas y al olor de casi cualquier cosa que se venda como fresca.',
      chemistry:
        'El limoneno es quiral: uno de sus carbonos lleva cuatro grupos distintos, así que la molécula existe en dos formas que son imágenes especulares una de la otra. Los químicos las distinguen con el sistema R/S. Y aquí viene la parte que casi todos los libros de texto cuentan mal. Dicen que una forma huele a naranja y la otra a limón. Unas medidas cuidadosas publicadas en 2021 encontraron que el aceite de naranja y el de limón contienen los dos la misma forma – la R – con una pureza superior al 99,9 por ciento. El limón huele a limón sobre todo por otra molécula, el citral, y no por esta.',
    },

    'sodium-sulfate': {
      everyday:
        'El sulfato de sodio se fabrica por millones de toneladas y la mayor parte va al detergente en polvo, donde es el relleno con el que se mezcla todo lo demás. Cristalizado con diez moléculas de agua dentro de su estructura se conoce como sal de Glauber, y esa forma se ha usado para almacenar calor: funde en una habitación templada y vuelve a solidificar a medida que la habitación se enfría.',
      chemistry:
        'Lo interesante ocurre a unos 32 °C. Fundir consume energía sin que suba la temperatura, y solidificar devuelve esa misma energía, así que un bidón de esta sal es un almacén de calor que funciona a temperatura ambiente. El problema es que no funde de forma limpia. Los cristales se separan en sulfato de sodio sólido y una disolución saturada, y el sólido, que es más denso, se va al fondo, donde ya menos cantidad puede volver a unirse al agua en el camino de vuelta. Cada ciclo almacena un poco menos que el anterior. Setenta años después, ese sigue siendo el problema por resolver.',
    },

    polypropylene: {
      name: 'Polipropileno',
      everyday:
        'El polipropileno es el segundo plástico más producido del mundo. Es el tapón de una botella, el vaso de yogur, los táperes que puedes meter en el microondas, los parachoques de un coche, la cuerda, la fibra de una moqueta y la tela sin tejer de una mascarilla quirúrgica. Cuando veas un triángulo de reciclaje con un 5 dentro, esto es lo que significa.',
      chemistry:
        'La fórmula de arriba es la unidad que se repite, y es la misma que la del propeno, porque al formarse las cadenas no se añade ni se pierde nada: cada molécula simplemente abre su enlace doble y se engancha a la siguiente. Lo que decide si el plástico sirve para algo es hacia dónde acaba apuntando cada grupo metilo. Con un catalizador corriente, las cadenas quedan hechas un enredo al azar y el plástico sale blando y débil. Con un catalizador Ziegler–Natta, todos los metilos apuntan hacia el mismo lado, las cadenas se enrollan en hélices regulares y esas hélices se empaquetan formando zonas cristalinas. Esa regularidad es la diferencia entre un chicle pegajoso y el parachoques de un coche.',
    },

    artemisinin: {
      name: 'Artemisinina',
      everyday:
        'La artemisinina viene del ajenjo dulce, una planta usada en la medicina china desde hace más de dos mil años. Hoy es la base del tratamiento estándar contra la malaria: se da siempre junto con un segundo medicamento y nunca sola, para que el parásito tenga menos probabilidades de hacerse resistente. Casi todo lo que se usa en el mundo se sigue extrayendo de plantas cultivadas, en lugar de fabricarse desde cero.',
      chemistry:
        'Casi toda la molécula es una disposición de anillos sin nada de particular. La parte que importa es un puente de dos átomos de oxígeno unidos directamente entre sí: un peróxido. Un enlace simple entre dos oxígenos es débil y poco corriente, y casi toda la química evita construir uno. Dentro de un parásito de la malaria, que va lleno del hierro de la hemoglobina que se ha ido comiendo, ese puente se rompe y produce fragmentos que destrozan al parásito desde dentro. Quítale el puente a la molécula y el medicamento deja de funcionar, que es como saben los químicos que ahí está la parte que hace el trabajo.',
    },

    'sodium-chloride': {
      everyday:
        'Sal de mesa. Se extrae de minas de roca, se evapora del mar, se esparce sobre las carreteras heladas y la industria química la usa como punto de partida para el cloro, el hidróxido de sodio y el ácido clorhídrico. Tu cuerpo necesita algo de sal de verdad, y la mayoría de la gente toma bastante más que algo.',
      chemistry:
        'En un grano de sal no hay moléculas de cloruro de sodio. El cristal son iones sodio e iones cloruro alternándose en todas las direcciones, cada sodio rodeado de seis cloruros y cada cloruro de seis sodios, repitiéndose igual durante miles de millones de iones seguidos. La fórmula es una proporción, uno a uno, no un recuento de los átomos de una molécula. Ese patrón que se repite sin fin es lo que lo convierte en un cristal, y es la razón de que un grano se parta en cubitos: lo estás separando por los planos sobre los que los iones ya estaban alineados.',
    },
  },

  scientists: {
    'kathleen-lonsdale': {
      work: 'Los químicos llevaban dibujando el benceno como un anillo de seis carbonos desde la década de 1860, pero nadie lo había medido. Kathleen Lonsdale sí lo midió, en 1929. El benceno es líquido, así que no podía usar benceno mismo; eligió el hexametilbenceno, un sólido construido alrededor del mismo anillo. Los rayos X que rebotan en las capas de átomos de un cristal forman un patrón de difracción, y ese patrón dice dónde están los átomos. Su respuesta fue que los seis carbonos están en un plano, en los vértices de un hexágono regular. Dos años después midió el hexaclorobenceno y encontró que todos los enlaces entre carbonos del anillo miden lo mismo: unos 1,42 ångströms, entre un enlace simple y uno doble.',
      legacy:
        'Por eso tu libro de texto dibuja un círculo dentro del hexágono del benceno en lugar de tres enlaces dobles: los enlaces son de verdad todos iguales. También demostró que la cristalografía de rayos X podía responder preguntas sobre moléculas, y no solo sobre sales. En 1945, Lonsdale y la microbióloga Marjory Stephenson fueron las dos primeras mujeres elegidas miembros de la Royal Society.',
    },

    'soren-sorensen': {
      work: 'Los ácidos se diferencian enormemente en fuerza, y en 1909 no había ninguna manera ordenada de decir cuánto. Søren Sørensen estudiaba proteínas en el Laboratorio Carlsberg de Copenhague, donde pequeños cambios de acidez le estropeaban un experimento tras otro. El número que necesitaba era la concentración de iones hidrógeno, y entre las disoluciones corrientes esa concentración abarca un intervalo de más de cien billones. Así que tomó su logaritmo y le cambió el signo. Una disolución con 0,0000001 moles de iones hidrógeno por litro pasó a ser, sencillamente, 7. Cada escalón hacia abajo significa diez veces más iones hidrógeno, no uno más.',
      legacy:
        'Esa es la escala de pH, y desde entonces está en cada tira para medir el agua de una piscina, en cada kit de análisis de suelo y en cada informe de sangre. Sørensen nunca explicó qué significaba la p. Los químicos todavía discuten: potencia, potencial o sencillamente la letra que le tocó a una de sus disoluciones de prueba. Que nadie te diga que es un asunto cerrado.',
    },

    'katharine-blodgett': {
      work: 'Katharine Blodgett descubrió cómo construir un recubrimiento molécula a molécula. Su colega Irving Langmuir había demostrado que cierta molécula grasa se extiende sobre el agua formando una monocapa, una capa con el grosor de una sola molécula. Blodgett vio que, si metes una placa a través de esa capa y la vuelves a sacar, la capa se va con ella – y que puedes repetirlo una y otra vez. En 1938, en General Electric, apiló 44 capas de estearato de bario sobre un vidrio y el vidrio dejó de reflejar. La luz que rebota en la parte de arriba del recubrimiento y la que rebota en el vidrio de debajo salen desfasadas entre sí, y se anulan.',
      legacy:
        'General Electric lo llamó vidrio invisible, que era publicidad: el vidrio se ve igual que siempre; los reflejos, no. Sus películas eran demasiado blandas para venderse – se quitaban pasando un trapo – y las lentes antirreflejos de hoy llevan recubrimientos duros hechos por evaporación. Pero las capas de Langmuir–Blodgett siguen siendo la forma en que un laboratorio construye una película a medida, molécula a molécula.',
    },

    'kikunae-ikeda': {
      work: 'A Kikunae Ikeda le parecía que el caldo hecho con alga kombu sabía a algo que no era dulce, ni ácido, ni salado, ni amargo. En 1908, en la Universidad Imperial de Tokio, coció unos doce kilos de alga seca hasta reducirlos y sacó de ahí unos treinta gramos de cristales. Resultaron ser ácido glutámico, un aminoácido que ya se conocía y que ya se sabía que estaba en el trigo. Lo nuevo era la conexión: Ikeda demostró que ese quinto sabor es el sabor del ion glutamato. Llamó umami a ese sabor y patentó una manera de convertir el glutamato en un condimento.',
      legacy:
        'El glutamato monosódico salió a la venta al año siguiente y hoy está en cocinas de todo el mundo. Al resto del planeta le costó mucho más darle la razón. El umami no se aceptó de forma general como sabor básico hasta alrededor del año 2000, cuando se encontraron en la lengua los receptores que responden al glutamato. Ikeda llevaba noventa años teniendo razón.',
    },

    'susan-solomon': {
      work: 'En 1985, un grupo de científicos británicos informó de que la capa de ozono sobre la Antártida se adelgazaba drásticamente cada primavera austral. El cloro de los CFC era el sospechoso evidente, pero las reacciones que los químicos conocían, entre gases, eran demasiado lentas para hacer tanto daño tan deprisa. La respuesta de Susan Solomon, publicada en 1986, fue que las reacciones importantes no ocurrían entre gases. En el invierno antártico, la estratosfera se enfría lo suficiente para formar nubes de hielo y ácido nítrico. Sobre la superficie de esas partículas, el cloro que está retenido de forma inofensiva se transforma en compuestos que la luz del sol de la primavera siguiente rompe en pedazos. Después dirigió expediciones a la base McMurdo en 1986 y 1987 y midió los compuestos de cloro que predecía su explicación.',
      legacy:
        'Eso explica por qué el daño es antártico, estacional y tan brusco – y la respuesta llegó justo mientras los gobiernos decidían qué hacer con los CFC. El Protocolo de Montreal se acordó en 1987.',
    },

    'fritz-haber': {
      work: 'Las plantas necesitan nitrógeno, y el aire es un 78 por ciento nitrógeno, pero en forma de N2, sujeto por un enlace triple que casi nada rompe. En 1909, Fritz Haber lo rompió. Trabajando con Robert Le Rossignol en Karlsruhe, empujó nitrógeno e hidrógeno a través de un catalizador a unas 200 atmósferas de presión y 500 °C, y salió amoniaco. Pero una demostración de laboratorio no es una fábrica. Carl Bosch, en BASF, dedicó los cuatro años siguientes a encontrar un catalizador de hierro barato y a construir recipientes de acero capaces de aguantar esa presión, y la primera planta abrió en 1913.',
      legacy:
        'Casi todo el fertilizante del mundo empieza con esta reacción; se calcula que el nitrógeno que aporta alimenta a alrededor de la mitad de las personas vivas. Haber dirigió además el programa alemán de armas químicas y supervisó en persona el primer ataque masivo con cloro, en Ypres, en abril de 1915. Las dos cosas son el mismo hombre. En 1933 lo expulsaron de Alemania por ser judío y murió al año siguiente.',
    },

    'marie-maynard-daly': {
      work: 'Marie Maynard Daly trabajó en dos problemas bastante distintos. En el Instituto Rockefeller, desde 1948 y junto a Alfred Mirsky, estudió la química del núcleo celular: las proteínas histonas alrededor de las cuales se enrolla el ADN, y de qué están hechos los ácidos nucleicos. A partir de 1955, con el médico Quentin Deming, se pasó a las arterias. Sus experimentos, hechos sobre todo con ratas con la tensión alta, estuvieron entre los primeros que ataron entre sí tres cosas que se habían estudiado por separado: la tensión arterial alta, el colesterol y el estrechamiento de las arterias.',
      legacy:
        'Esa conexión es hoy la explicación habitual de las enfermedades del corazón. La construyeron muchos grupos a lo largo de varias décadas, y Daly y Deming aportaron algunas de las primeras pruebas experimentales. Daly dio clases de bioquímica durante veinticinco años en el Albert Einstein College of Medicine y financió una beca para estudiantes negros que quisieran dedicarse a la ciencia.',
      credit:
        'En 1947 se convirtió en la primera mujer negra de Estados Unidos que obtuvo un doctorado en química, en la Universidad de Columbia, en un departamento con exactamente una profesora.',
    },

    'paul-sabatier': {
      work: 'Un enlace doble entre dos carbonos no capta hidrógeno sin más, por mucho hidrógeno que le ofrezcas. En 1897, en Toulouse, Paul Sabatier y Jean-Baptiste Senderens descubrieron que el níquel finamente dividido cambia eso por completo. El metal sujeta sobre su superficie tanto el hidrógeno como el enlace doble, los mantiene uno al lado del otro y deja que se unan. Al final el níquel sigue igual: es un catalizador, y barato. La versión de Sabatier funcionaba con vapores. Cuatro años después, Wilhelm Normann, en Alemania, adaptó la misma química a los aceites líquidos, y ese es el paso que convierte un aceite vegetal que gotea en una grasa sólida.',
      legacy:
        'La hidrogenación catalítica es hoy una de las reacciones más usadas de la industria, de la margarina a los medicamentos. Sabatier compartió el Premio Nobel de 1912 con Victor Grignard, por trabajos separados y no por una colaboración.',
      credit:
        'Senderens, que hizo con él los experimentos de 1897, se quedó fuera de aquel premio, una omisión que los químicos siguen reivindicando en su nombre.',
    },

    'reatha-clark-king': {
      work: 'Para juzgar si un propulsante de cohete merece la pena hace falta un número: cuánta energía sale exactamente cuando arde. Reatha Clark King midió esos números para compuestos de flúor en la Oficina Nacional de Normas de Estados Unidos, en los años sesenta. El flúor es el elemento más reactivo que existe, y el difluoruro de oxígeno ataca casi cualquier cosa dentro de la que intentes quemarlo. King diseñó un quemador de níquel con un tubo en espiral que permitía enfriar y controlar la llama en lugar de destrozar el aparato, y obtuvo un calor de formación del difluoruro de oxígeno lo bastante preciso como para publicarlo. Le valió el premio de la oficina al mejor artículo del año.',
      legacy:
        'Aquellos números sirvieron para evaluar los compuestos de flúor como oxidantes de cohete. Nunca llegaron a volar: son demasiado tóxicos y demasiado corrosivos para manejarlos a esa escala, y averiguar eso es exactamente para lo que sirven las medidas. King llegó después a rectora de una universidad y más tarde dirigió la Fundación General Mills.',
    },

    'gilbert-lewis': {
      work: 'Antes de 1916, un enlace químico era una raya dibujada en un papel sin ninguna explicación detrás. Gilbert Lewis dio una: un enlace es un par de electrones que dos átomos comparten. Los átomos tienden a acabar con ocho electrones en su capa externa, y compartir es una manera de llegar. Él dibujaba esos electrones como puntos, y por eso un diagrama de puntos alrededor de un símbolo químico se llama estructura de Lewis. En 1923 añadió una segunda idea: que un ácido es todo aquello que acepta un par de electrones y una base todo aquello que lo cede, una definición que abarca reacciones en las que no hay ni un hidrógeno.',
      legacy:
        'Irving Langmuir desarrolló y difundió la misma imagen, le dio a la química la palabra covalente y durante años se la conoció como la teoría de Lewis–Langmuir. A Lewis lo propusieron para el Premio Nobel decenas de veces y no lo ganó nunca. Cada diagrama de puntos que dibujas es suyo.',
    },

    'stephanie-kwolek': {
      work: 'En 1965, en DuPont, Stephanie Kwolek disolvió un polímero rígido con forma de varilla y obtuvo una disolución que tenía mal aspecto. Las disoluciones de polímero son espesas, como un jarabe, y transparentes; la suya era fluida y turbia. Lo turbio solía significar trozos sin disolver que atascarían la máquina de hilar, y la reacción habitual era tirarla por el desagüe. Kwolek la filtró para demostrar que estaba limpia y convenció al técnico para que la hilara de todos modos. La turbidez resultó ser justo lo importante: las cadenas rígidas se estaban alineando unas junto a otras dentro del líquido, igual que hace un cristal líquido. Hiladas en forma de fibra, siguieron alineadas.',
      legacy:
        'Esa alineación explica que la fibra – vendida desde 1971 como Kevlar – aguante tan bien que tiren de ella: a igualdad de peso supera al acero. Los chalecos antibalas, los guantes anticorte, las pastillas de freno y los cascos de las lanchas dependen de ella. Convertir el descubrimiento en un producto exigió a todo un equipo de DuPont, y en particular a Herbert Blades, que encontró la manera de hilarlo a gran escala.',
    },

    'akira-yoshino': {
      work: 'Las primeras baterías recargables de litio usaban litio metálico, y el litio metálico forma púas cada vez que se recarga. Antes o después una púa llega al otro electrodo y la batería arde. En 1985, Akira Yoshino, en Asahi Kasei, construyó una pila sin nada de litio metálico dentro. Emparejó el óxido de litio y cobalto de John Goodenough como electrodo positivo con un material de carbono – coque de petróleo – como electrodo negativo. Los iones litio entran y salen de los dos electrodos en lugar de depositarse como metal. Al cargar, los empujas hacia un lado; al usar la batería, vuelven.',
      legacy:
        'Esa es la batería de iones de litio de tu móvil, y Sony puso la primera a la venta en 1991. Yoshino compartió el Premio Nobel de 2019 con Goodenough y con Stanley Whittingham: tres personas, tres etapas, una sola batería.',
    },

    'margarita-salas': {
      work: 'El phi29 es un virus que infecta bacterias, y Margarita Salas dedicó treinta años a averiguar cómo copia su ADN. En 1984, su grupo de Madrid, junto a Luis Blanco, aisló su ADN polimerasa – la enzima que hace la copia – y la encontró rara por tres motivos a la vez. No suelta el molde: copia decenas de miles de bases sin despegarse de él. Aparta a su paso la hebra contraria, de modo que no necesita ninguna otra enzima que abra la doble hélice. Y corrige lo que acaba de escribir, así que comete poquísimos errores.',
      legacy:
        'Junta esas tres cosas y una cantidad minúscula de ADN puede copiarse hasta obtener una cantidad útil, a una temperatura constante y sin los ciclos de calentar y enfriar que necesita la PCR. Se usa con restos forenses, con células individuales y con ADN recuperado por arqueólogos. Su patente ha sido la más rentable de cuantas ha tenido el CSIC, el Consejo Superior de Investigaciones Científicas.',
    },

    'alfred-werner': {
      work: 'Algunos compuestos se negaban a encajar en las reglas. El cloruro de cobalto con seis moléculas de amoniaco unidas se comportaba como si sus tres cloruros estuvieran sueltos; con cinco amoniacos, solo lo estaban dos. En 1893, Alfred Werner, que tenía entonces 26 años, dijo que la razón es que un ion metálico tiene dos cosas distintas en juego: una carga que equilibrar y un número fijo de sitios a su alrededor donde pueden engancharse moléculas o iones. Para el cobalto ese número es seis, colocados en los vértices de un octaedro. Werner no podía ver nada de esto. Lo demostró contando: un octaedro predice exactamente dos formas de un compuesto con cuatro grupos de una clase y dos de otra, y dos era siempre lo que encontraba.',
      legacy:
        'Werner ganó el Premio Nobel de 1913, el primer químico suizo y el primer químico inorgánico en conseguirlo. Los iones complejos como los suyos son una familia de ion poliatómico: un metal en el centro con moléculas enganchadas alrededor. La mayoría de los iones poliatómicos que estudias, como el sulfato y el nitrato, no son complejos.',
    },

    'johanna-dobereiner': {
      work: 'Las leguminosas – judías, guisantes, soja – no necesitan que les des nitrógeno. Alojan bacterias en unos nódulos de sus raíces, y esas bacterias toman N2 directamente del aire y lo convierten en amoniaco que la planta puede usar. Johanna Döbereiner, que trabajaba en Brasil desde 1950, se preguntó si aquello podía sostener un cultivo comercial en suelo tropical; la agricultura brasileña de entonces copiaba el modelo estadounidense y echaba fertilizante nitrogenado a espuertas. Buscó cepas de Bradyrhizobium adaptadas a los suelos brasileños y a las variedades brasileñas de soja, las probó en el campo y llevó los resultados hasta un programa nacional de tratamiento de la semilla. Su grupo describió además varias especies fijadoras de nitrógeno nuevas.',
      legacy:
        'Hoy la soja brasileña toma prácticamente todo su nitrógeno de las bacterias y no de un saco. Una estimación de 2021 cifra el ahorro en más de catorce mil millones de dólares por cosecha. Las plantas siguen necesitando fósforo y potasio, así que esto no es agricultura sin fertilizantes: es agricultura sin fertilizante nitrogenado, que es la mitad difícil.',
    },

    'vladimir-prelog': {
      work: 'Algunas moléculas existen en dos formas que son imágenes especulares una de la otra, como tus dos manos, y por mucho que las gires no conseguirás convertir una en la otra. Los químicos veían eso; lo que no tenían era una manera acordada de decir cuál era cuál. Vladimir Prelog se unió a Robert Cahn y a Christopher Ingold, y en 1956 los tres publicaron unas reglas que lo resuelven. Miras los cuatro grupos unidos al carbono y los ordenas, primero el átomo más pesado. Después giras la molécula hasta que el grupo de menor orden apunte hacia el lado contrario a ti y lees los otros tres: en el sentido de las agujas del reloj es R; en sentido contrario, S.',
      legacy:
        'Esas son las reglas de Cahn–Ingold–Prelog, y son la razón de que una R o una S en el nombre de un compuesto signifiquen lo mismo en cualquier laboratorio y en cualquier idioma. Importa, porque dos formas especulares de un medicamento pueden comportarse de manera completamente distinta dentro de un cuerpo. Prelog nació en Sarajevo, creció en Zagreb, escapó a Zúrich en 1941 y compartió el Premio Nobel de 1975 con John Cornforth.',
    },

    'maria-telkes': {
      work: 'El sol llega de día y el calor lo quieres de noche, así que una casa solar necesita algún sitio donde guardarlo. Mária Telkes eligió una respuesta química en lugar de un depósito de agua caliente. La sal de Glauber – cristales de sulfato de sodio con agua incorporada a su estructura – funde a unos 32 °C. Fundir un sólido consume energía sin que su temperatura suba, que es lo que se llama calor latente de fusión, y esa energía vuelve a salir cuando solidifica otra vez. Así, una masa dada de esa sal almacena mucho más calor que la misma masa de agua caliente. En 1948 construyó la Dover Sun House, en Massachusetts, con la arquitecta Eleanor Raymond: bidones de sal metidos en las paredes.',
      legacy:
        'Una familia vivió en ella, calentada solo por el sol, durante dos inviernos y parte de un tercero. Después falló. La sal no funde de forma limpia, así que el sólido se deposita en el fondo y en cada ciclo se recombina un poco menos, y la disolución salada acabó comiéndose los bidones de acero. Eso es química, y no mala construcción, y sigue siendo hoy el obstáculo principal del almacenamiento de calor con sales, los llamados materiales de cambio de fase.',
    },

    'giulio-natta': {
      work: 'Las moléculas de propeno se unen formando cadenas largas, pero si se unen orientadas como les apetece, la cadena queda hecha un lío con grupos metilo sobresaliendo por los dos lados, y el plástico sale blando y débil. El 11 de marzo de 1954, Giulio Natta, en el Politécnico de Milán, fabricó una cadena en la que todos los grupos metilo apuntan hacia el mismo lado. Usó un catalizador del tipo que había desarrollado Karl Ziegler, que sujeta cada molécula que llega en una orientación fija hasta que se ha unido. Natta llamó isotáctica a esa disposición regular. Las cadenas regulares pueden empaquetarse bien unas contra otras y alinearse formando cristales; las enredadas, no.',
      legacy:
        'Por eso el polipropileno es rígido, resistente y lo bastante ligero como para estar en todas partes: tapones de botella, parachoques, cuerda, táperes, ropa térmica. Natta y Ziegler compartieron el Premio Nobel de 1963.',
      credit:
        'A Ziegler no le hizo ninguna gracia compartirlo. Natta había llegado a la reacción a partir de la química de catalizadores de Ziegler, y las dos partes pasaron más de veinte años en los tribunales por las patentes, casi siempre con sentencias favorables a Ziegler.',
    },

    'tu-youyou': {
      work: 'Los parásitos de la malaria se habían hecho resistentes a los medicamentos habituales y, en 1969, Tu Youyou quedó al frente del grupo de su instituto dentro del Proyecto 523, una búsqueda china y secreta de uno nuevo. Su equipo probó cientos de extractos de plantas usadas en la medicina tradicional. El ajenjo dulce funcionaba unas veces sí y otras no. Leyendo un manual de recetas de urgencia del siglo IV, se fijó en que decía que había que dejar la planta en agua fría y escurrir el jugo, y no hervirla. Si el calor destruía el compuesto activo, el problema estaba en la extracción. Cambió al éter, que hierve a 35 °C, y en octubre de 1971 obtuvo un extracto que mataba a los parásitos todas las veces.',
      legacy:
        'El compuesto puro, la artemisinina, llegó en 1972. La artemisinina combinada con un segundo medicamento es hoy el tratamiento que recomienda la Organización Mundial de la Salud, y ha salvado millones de vidas. En el Proyecto 523 participaron cientos de científicos de toda China, y allí todavía se discute cómo debería repartirse el mérito.',
      credit:
        'Tu ganó un Premio Nobel en 2015 sin doctorado, sin haberse formado en el extranjero y sin pertenecer a ninguna academia china: en su país la llaman la científica de los tres noes.',
    },

    'dan-shechtman': {
      work: 'Los cristales se repiten. Eso no era una suposición, era la definición: los átomos se colocan en un patrón que se copia a sí mismo una y otra vez en todas las direcciones, y un patrón así no puede tener simetría de orden cinco ni de orden diez – no puedes embaldosar un suelo con pentágonos sin dejar huecos. El 8 de abril de 1982, destinado por el Technion de Haifa a un laboratorio del Gobierno estadounidense, Dan Shechtman disparó electrones a través de una aleación de aluminio y manganeso enfriada muy deprisa y obtuvo un patrón de difracción con simetría de orden diez. La anotación de su cuaderno para esa muestra dice «10 fold ???». Los átomos estaban perfectamente ordenados – podías decir dónde tocaba el siguiente – pero la disposición no se repetía nunca.',
      legacy:
        'Tardó años en aceptarse. Linus Pauling defendió por escrito que la muestra era sencillamente una macla de cristales, y nunca cambió de opinión. Las pruebas se fueron acumulando de todos modos y, en 1992, la Unión Internacional de Cristalografía reescribió su definición de cristal para dar cabida a patrones que no se repiten nunca. Shechtman ganó el Premio Nobel de Química de 2011. Desde entonces se han encontrado cuasicristales en la naturaleza, dentro de un meteorito.',
    },
  },
} satisfies ExploreOverlay;
