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
    'Qué es Games in Chemistry, qué hay en el sitio y cómo puede usted ayudar a darle forma. Todas las demás páginas están escritas para el alumnado que juega; esta está escrita para usted.',

  betaHeading: 'El sitio está en beta',
  betaBody:
    'Games in Chemistry todavía se está construyendo. Los juegos cambian, llegan otros nuevos y la redacción de una pista o de una chuleta puede ser distinta el mes que viene. Todo funciona y todo es gratuito, pero pruebe una partida antes de llevar un juego a clase.',

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
  sheetsHeading: 'Chuletas',
  sheetsIntro:
    'Quince chuletas reúnen el material de consulta en el que se apoyan los juegos. Cada una ocupa una sola página, se ve bien en el proyector y se puede imprimir:',

  exploreHeading: 'Explorar',
  exploreBody1:
    'Cada lunes, una molécula nueva y una persona nueva de la química, explicadas en unas pocas secciones breves: dónde aparece en la vida diaria, cómo funciona y por qué importó la persona que hay detrás.',
  exploreBody2:
    'Una vez pasada su semana, cada ficha conserva un enlace permanente, y el archivo las guarda todas, así que una clase puede señalar una molécula o una persona de hace meses con la misma facilidad que la de esta semana. La semana actual está en {link}.',
  exploreLinkLabel: 'la página de Explorar',

  languagesHeading: 'Idiomas',
  languagesBody1:
    'El sitio existe en seis idiomas: inglés, alemán, francés, español, italiano y ruso. El selector está en la barra de navegación y la elección se recuerda en ese navegador.',
  languagesBody2:
    'Todo lo que lee el alumnado está traducido: la interfaz, el acompañamiento y las pistas dentro de los juegos, y las chuletas. Las fórmulas químicas, los símbolos de los elementos y las ecuaciones no se traducen nunca; una ecuación se escribe igual en todos los idiomas.',
  languagesBody3:
    'En una chuleta en cualquier idioma que no sea el inglés faltan dos cosas. No lleva ningún enlace externo, porque todos los sitios a los que enlazamos están en inglés, y no cita ningún currículo, porque el único que tenemos es el Victorian Curriculum, que es australiano. Poner delante del alumnado material que no puede usar es peor que dejarlo fuera, así que ambas cosas se retienen en vez de traducirse. Los equivalentes locales —una correspondencia curricular por país y enlaces que el alumnado pueda leer— todavía no se han buscado.',

  privacyHeading: 'Privacidad del alumnado',
  privacyBody1:
    'En este sitio no hay analítica, ni publicidad, ni rastreadores de terceros. Lo que alguien hace aquí no se mide para nadie más.',
  privacyBody2:
    'Jugar no requiere cuenta. De quien juega sin ella no queda registro en el sitio: su propio navegador guarda las preferencias de sonido, de tema y de accesibilidad, y si ya ha visto las instrucciones de cada juego, y una sola cookie viaja con sus peticiones — solo contiene el idioma elegido.',
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
  collaborateCta: 'Para ofrecerse, rellene el formulario en la página de {link}.',
  collaborateCtaLinkLabel: 'alta',

  collaborateMetaTitle:
    'Darse de alta como docente colaborador | Para el profesorado | Games in Chemistry',
  collaborateMetaDescription:
    'Dé su opinión sobre los juegos o proponga otros nuevos, y reciba a cambio acceso gratuito a la versión 1.0 y a la versión 2.0.',
  backToTeachers: 'Volver a «Para el profesorado»',
  collaborateHow:
    'Para ofrecerse, rellene el formulario de abajo. La dirección de correo electrónico es lo único que necesito de verdad; lo demás está ahí para que yo sepa algo de su clase antes de responderle, y puede dejarlo todo en blanco.',
  collaborateReply:
    'Lo leo todo y contesto, pero aquí trabaja una sola persona y lo hace al lado de otro empleo: cuente con un par de semanas, no con un par de días, y por favor no lea el silencio como un no.',
  collaborateRecords:
    'Por qué un formulario y no el botón de comentarios, que es adonde apuntaba antes esta página: los comentarios llegan a una bandeja de entrada, y una bandeja de entrada no es una lista. Sin un sitio duradero donde guardar una dirección, la oferta de las versiones 1.0 y 2.0 no sería una que pudiera cumplir. Esa es toda la razón por la que aquí se pide una dirección.',

  // El formulario de alta. La página pasa sus cadenas como props a
  // `CollaboratorForm`; el componente nunca importa este catálogo — véase
  // docs/COLLABORATORS.md § 4.
  formHeading: 'Darse de alta como docente colaborador',
  formIntro:
    'Aquí no hay nada obligatorio salvo la dirección de correo electrónico. Deje el resto en blanco si lo prefiere: los demás campos están para ayudarme a mí y ninguno es condición de nada.',
  formUse:
    'Su dirección se usa para escribirle sobre los juegos y para darle acceso a la versión 1.0 y a la versión 2.0. Nada más, y nunca se cede a nadie. Tampoco se envía ningún correo de confirmación: lo siguiente que reciba de mí será una respuesta escrita a mano.',
  formDelete:
    'Puede pedir que se borren sus datos cuando quiera, y para eso no necesita ni cuenta ni formulario: escriba a {email} diciendo que quiere salir de la lista y el registro se elimina.',
  formOptional: 'opcional',

  formEmailLabel: 'Dirección de correo electrónico',
  formEmailHelp: 'La dirección a la que prefiere que le escriba.',
  formNameLabel: 'Su nombre',
  formSchoolLabel: 'Centro',
  formCountryLabel: 'País',
  formYearLevelsLabel: 'Cursos a los que da clase',
  formYearLevelsHelp: 'Como los llame su centro; por ejemplo, 3º y 4º de ESO.',
  formSubjectsLabel: 'Materias que imparte',
  formSubjectsHelp: 'Por ejemplo, Física y Química en la ESO.',
  formMessageLabel: 'En qué le gustaría ayudar',
  formMessageHelp:
    'Cómo ha ido un juego con una clase, una idea para uno que todavía no existe, o las dos cosas. Con una frase basta.',

  formSubmit: 'Me ofrezco',
  formSubmitting: 'Enviando…',
  formSuccessTitle: 'Gracias, ya está en la lista.',
  formSuccessBody:
    'Mientras tanto no pasa nada más: no hay ningún correo de confirmación en camino y su dirección no se usa para otra cosa que no sea responderle.',
  formGenericError:
    'Algo ha ido mal y el alta no se ha guardado. Inténtelo de nuevo dentro de un momento.',

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
