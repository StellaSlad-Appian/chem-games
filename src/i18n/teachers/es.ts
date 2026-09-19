// src/i18n/teachers/es.ts
//
// Spanish (es) copy for the For Teachers page.
//
// This is a per-page catalogue, not part of the shared dictionary, because
// src/app/[lang]/layout.tsx hands the whole dictionary to I18nProvider and so
// serializes every byte of it into the RSC payload of every page. This page is
// the copy's only reader and it is a Server Component, so none of it needs to
// travel anywhere else — see docs/i18n/README.md § "The dictionary is a budget,
// and a game will eat it", which is the same reasoning that moved the game
// catalogues out.
//
// La página «Para el profesorado».
//
// **Address: formal "usted", and only here.** The rest of es.ts uses "tú",
// and rightly: Spanish school material addresses a student that way as a
// matter of course. This page has no student reader — it is written for the
// adult deciding whether to use the site in class. Of the four locales this
// is the least clear-cut call, because Spanish professional web copy often
// keeps "tú"; it is flagged for a native reviewer, and the edit back to "tú"
// is contained to these keys.
//
// Terms: el profesorado / el alumnado, the collective nouns the glossary
// uses to stay gender-neutral; "electrón desapareado" and "par solitario"
// (the formal terms, correct for explaining prose — the game word *impar*
// belongs in the game); "ajustar" for balancing an equation, per the
// glossary. The year band is **3º/4º de ESO**, never *bachillerato*, which
// names ages 16–19.

import type { TeachersCopy } from './en';

export const es = {
  heading: 'Para el profesorado',
  intro:
    'Qué es ChemGames, qué hay en el sitio y cómo puede usted ayudar a darle forma. Todas las demás páginas están escritas para el alumnado que juega; esta está escrita para usted.',

  betaHeading: 'El sitio está en beta',
  betaBody:
    'ChemGames todavía se está construyendo. Los juegos cambian, llegan otros nuevos y la redacción de una pista o de una chuleta puede ser distinta el mes que viene. Todo funciona y todo es gratuito, pero pruebe una partida antes de llevar un juego a clase.',

  whatHeading: 'De qué se trata',
  whatBody1:
    'Un conjunto de minijuegos de química gratuitos que funcionan en el navegador. No hay nada que instalar ni ninguna cuenta que crear: se abre un juego y se empieza.',
  whatBody2:
    'Están pensados para 3º y 4º de ESO, es decir, de 14 a 16 años. Cada juego practica una sola destreza en partidas cortas y, ante una respuesta incorrecta, explica qué falló y qué probar a continuación en lugar de limitarse a marcarla.',
  whatBody3:
    'La cuenta es opcional. Guarda las puntuaciones y el progreso y pone un alias en las clasificaciones; los juegos en sí no cambian en nada.',

  onSiteHeading: 'Qué hay en el sitio',
  gamesIntro: 'Hay cinco juegos terminados. Cada uno practica una sola cosa:',
  gameAcid: 'Clasificar un compuesto como ácido, base o neutro solo a partir de su fórmula.',
  gameBlaster: 'Leer fórmulas a toda velocidad y distinguir las que se parecen casi del todo.',
  gameNeutralise: 'Elegir H⁺ u OH⁻ para neutralizar lo que se acerca al laboratorio.',
  gameBalancer:
    'Ajustar una ecuación coeficiente a coeficiente, con el recuento de átomos de cada lado a la vista.',
  gameLewis:
    'Emparejar electrones desapareados en enlaces y pares solitarios para construir una estructura de Lewis.',
  sheetsIntro:
    'Doce chuletas reúnen el material de consulta en el que se apoyan los juegos. Cada una ocupa una sola página, se ve bien en el proyector y se puede imprimir:',

  languagesHeading: 'Idiomas',
  languagesBody1:
    'El sitio existe en seis idiomas: inglés, alemán, francés, español, italiano y ruso. El selector está en la barra de navegación y la elección se recuerda en ese navegador.',
  languagesBody2:
    'Todo lo que lee el alumnado está traducido: la interfaz, el acompañamiento y las pistas dentro de los juegos, y las chuletas. Las fórmulas químicas, los símbolos de los elementos y las ecuaciones no se traducen nunca; una ecuación se escribe igual en todos los idiomas.',
  languagesBody3:
    'Dos cosas no cambian con el idioma: los enlaces externos de las chuletas llevan todos a sitios en inglés, y cada chuleta cita el Victorian Curriculum, un currículo australiano. Conviene saberlo si usted sigue otro currículo.',

  privacyHeading: 'Privacidad del alumnado',
  privacyBody1:
    'En este sitio no hay analítica, ni publicidad, ni rastreadores de terceros. Lo que alguien hace aquí no se mide para nadie más.',
  privacyBody2:
    'Jugar no requiere cuenta. Quien juega sin ella no deja nada detrás, salvo las preferencias de sonido y de tema que guarda su propio navegador.',
  privacyBody3:
    'Quien sí inicia sesión facilita una dirección de correo y recibe un alias generado – nunca un nombre real –, y a partir de ahí el sitio guarda sus puntuaciones, los niveles que alcanza, los campos opcionales del perfil que decida rellenar y sus opciones de visibilidad. Qué parte de eso es pública, y cómo borrar una cuenta y cuanto contiene, se explica en la página de {link}.',
  privacyLinkLabel: 'privacidad',

  accessibilityHeading: 'Accesibilidad',
  accessibilityBody1:
    'El objetivo es el nivel AA de las WCAG 2.2. Es un objetivo y no una garantía: el sitio no ha pasado ninguna auditoría y hay partes que todavía no llegan a ese listón.',
  accessibilityBody2:
    'Lo que sí se cumple hoy: el color nunca es lo único que transmite significado, los botones que solo llevan icono tienen un nombre en texto para los lectores de pantalla, las páginas se reorganizan en la pantalla de un móvil y al 200 % de zoom sin desplazamiento horizontal, el foco se ve siempre y casi todas las animaciones se apagan solas cuando el sistema pide menos movimiento.',
  accessibilityBody3:
    'Lo que no, y conviene saberlo antes de preparar una clase: {blaster} necesita ratón o dedo, porque a sus burbujas en movimiento no se llega con el teclado. Las cuentas atrás de {blaster} y {neutralise} todavía no se pueden ralentizar ni desactivar. Los cambios de puntuación, de pista o de mensaje de error no se anuncian a los lectores de pantalla. El uso del teclado en los tres juegos de arcade no se ha comprobado juego por juego: considérelo sin verificar en lugar de admitido.',
  accessibilityBody4:
    '{balancer} y {lewis} son los dos que se construyeron pensando primero en el teclado y se probaron así. Si en su clase hay alguien que trabaja con el teclado, empiece por ahí.',

  collaborateHeading: 'Profesorado colaborador',
  collaborateWhat:
    'Busco a unas cuantas personas que den clase y quieran ayudar a dar forma a esto. Se trata de una de estas dos cosas, o de las dos: contarme cómo fue de verdad un juego con una clase – qué confundió al alumnado, qué redacción no funcionó, qué resultó demasiado fácil – y proponer juegos que faltan y que merecerían la pena.',
  collaborateCommitment:
    'No hay compromiso mínimo ni calendario. Un mensaje por trimestre sirve. Un único mensaje, una sola vez, también sirve.',
  collaborateThanks:
    'A cambio, quienes colaboren tendrán acceso gratuito a la versión 1.0 y a la versión 2.0 de los juegos en cuanto esas versiones existan.',
  collaborateFreeNow:
    'Para que quede claro cuánto vale eso: ahora mismo todo el sitio es gratuito y lo seguirá siendo durante toda la beta. La oferta se refiere a las versiones de pago que vendrán después, no a nada por lo que estuviera pagando hoy.',
  collaborateHow:
    'Para apuntarse, use el botón de comentarios de la esquina inferior derecha de cualquier página, elija la categoría «{category}» y diga que da clase y que le gustaría ayudar. Ese es todo el trámite: no hay un segundo formulario y no se recoge nada más de lo que ya recoge ese botón.',
  collaborateReply:
    'Lo leo todo y contesto, pero aquí trabaja una sola persona y lo hace al margen de su empleo: cuente con un par de semanas más que con un par de días, y no lea el silencio como una negativa.',
  collaborateRecords:
    'Una salvedad práctica, mejor dicha ahora que descubierta después: los comentarios llegan a un buzón, no a una lista de personas colaboradoras. Le responderé pidiéndole una dirección para guardarla, porque sin un sitio estable donde conservarla no podría cumplir la promesa de la 1.0 y la 2.0.',

  feedbackHeading: 'Avisar de un error',
  feedbackBody1:
    'El botón de comentarios está en la esquina inferior derecha de todas las páginas y funciona sin cuenta. Ofrece tres categorías: un problema, un error de química o de datos, o una idea.',
  feedbackBody2:
    'Envía también la página en la que estaba, así que no hace falta describir dónde ocurrió. Lo que más me interesa saber son los errores de química: una valencia equivocada delante de una clase es lo peor que puede hacer este sitio.',

  supportHeading: 'Apoyar este proyecto',
  supportBody:
    'Espero que los juegos hayan resultado útiles y que por el camino se haya quedado algo de química. En este proyecto hay mucho cuidado y ninguna financiación: ni subvención, ni institución, ni publicidad. Si quiere ayudar a mantenerlo gratuito y sin anuncios, puede aportar la cantidad que le parezca en {link}. Es el proyecto de una sola persona y no una entidad benéfica registrada: nada de lo que aporte desgrava y nada se da por supuesto; los juegos seguirán siendo gratuitos en cualquier caso.',
  supportLinkLabel: 'la página de apoyo',
} satisfies TeachersCopy;
