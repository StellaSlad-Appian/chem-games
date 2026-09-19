// src/i18n/dictionaries/es.ts
//
// Spanish (es). Register and terminology decisions:
//
//  - **This is es-ES (peninsular Spanish).** Spanish ships under the plain `es`
//    tag, but no Spanish sentence is variety-neutral, and the choice is visible
//    on every screen. The reasoning, the alternative (es-419) and the complete
//    list of words that would change are at the top of
//    docs/i18n/glossary-es.md, flagged for the owner.
//  - Address the reader with informal "tú" throughout. Unlike the French
//    tu/vous call this is not contentious: Spanish school material addresses
//    students as "tú" as a matter of course. **The one exception is the
//    `teachers` namespace**, the site's only adults-facing page, which uses
//    "usted": the argument for "tú" is about school material read by a
//    student, and that is not who reads it. This is the more debatable of the
//    four locales — Spanish professional web copy often keeps "tú" — so it is
//    flagged for a native reviewer. That copy now lives in
//    src/i18n/teachers/es.ts; the reasoning is at the top of it.
//  - Chemistry terms follow Spanish school curriculum usage, not literal
//    translation. Every term is fixed in docs/i18n/glossary-es.md.
//  - "Hint" is *pista*. The French run warned that Spanish would repeat its
//    *indice* collision (French for "hint" is also French for a formula
//    subscript). It does not: Spanish for a subscript is *subíndice* and
//    Spanish for a hint is *pista*, and the two share no word.
//  - "Settings" is *Opciones*, **not** *Ajustes* — because *ajustar* is this
//    site's verb for balancing an equation, and the reader must not meet the
//    same root meaning two unrelated things.
//  - Chemical formulae, element symbols, state symbols and IUPAC notation are
//    never translated. Element and compound *names* are, in
//    src/i18n/chemistry-names/es.ts.
//  - Spanish typography: opening ¿ and ¡ are mandatory, « … » for quotations
//    with no inner spaces, NO space before : ; ! ?, – (en dash) for
//    parenthetical dashes, … as one character, decimal comma, ordinals written
//    3º / 4º.
//  - **Adjectives agree with the reader.** "Ready for your first result?" has no
//    gender-neutral Spanish translation that keeps the adjective, so every such
//    string was rewritten rather than translated — see the glossary's
//    "Adjectives that agree with the reader" table. Epicene nouns (estudiante,
//    miembro) and collectives (el alumnado, el profesorado) do the rest.
//  - Spanish runs roughly 20–25% longer than English. Where a string sits in a
//    fixed-width control (header badges, nav buttons, category pills) the
//    translation is deliberately shorter than a faithful rendering would be;
//    those entries are flagged in docs/i18n/es-review.md.

import type { Dictionary } from './en';

export const es = {
  meta: {
    siteName: 'ChemGames',
    title: 'ChemGames | Aprende química jugando',
    description:
      'Entiende la química jugando: minijuegos visuales e interactivos y chuletas de repaso.',
    // Keyword lists are chosen per language, not translated. The age band is
    // the thing to get right: this site is Year 9–10, which is 3º/4º de ESO in
    // Spain. A bare "química bachillerato" would repeat the mistake Phase 1 had
    // to correct in German ("Chemie Oberstufe" names ages 16–19). Rated low:
    // these are plausible Spanish search terms, not researched ones.
    keywords: [
      'química',
      'juegos educativos',
      'moléculas',
      'reacciones químicas',
      'ecuaciones químicas',
      'química 3º ESO',
      'química 4º ESO',
    ],
    privacyTitle: 'Privacidad | ChemGames',
    privacyDescription:
      'Qué guarda ChemGames sobre ti, qué es público, quién lo trata y cómo descargar o borrar tus datos.',
    teachersTitle: 'Para el profesorado | ChemGames',
    teachersDescription:
      'Qué es ChemGames, en qué seis idiomas existe, cómo trata los datos del alumnado, en qué punto está la accesibilidad y cómo el profesorado puede ayudar a darle forma durante la beta.',
    cheatSheetTitle: 'Chuleta de {title} | ChemGames',
    cheatSheetNotFound: 'Tema no encontrado – ChemGames',
  },

  common: {
    backToDashboard: 'Volver al panel',
    dashboard: 'Panel',
    playNow: 'Jugar',
    cancel: 'Cancelar',
    opensInNewTab: '(se abre en una pestaña nueva)',
    loading: 'Cargando…',
  },

  language: {
    /** Labels the switcher; visible in the settings panel, sr-only in the nav. */
    label: 'Idioma',
  },

  nav: {
    sectionsA11y: 'Secciones del panel',
    profile: 'Perfil',
    leaderboards: 'Clasificaciones',
    games: 'Juegos',
    cheatSheets: 'Chuletas',
    // Shorter than the English "Log in / Register", the same trade German and
    // French make: the pair is the widest thing in the header, and the sign-in
    // page offers both actions anyway.
    login: 'Iniciar sesión',
    logout: 'Cerrar sesión',
    loggingOut: 'Cerrando sesión…',
    settingsA11y: 'Abrir las opciones generales',
    menuOpenA11y: 'Abrir el menú',
    menuCloseA11y: 'Cerrar el menú',
    menuTitleA11y: 'Menú del sitio',
  },

  footer: {
    tagline: 'ChemGames – la química en imágenes, jugando y sin líos.',
    copyright: '© {year} ChemGames. Todos los derechos reservados.',
    privacy: 'Privacidad',
    teachers: 'Para el profesorado',
  },

  home: {
    eyebrow: 'Laboratorio de química interactivo',
    heading: 'Aprende química jugando.',
    intro:
      'Explora experimentos interactivos, sigue tus mejores puntuaciones, domina las fórmulas y compara tus resultados de laboratorio con los de los demás.',
    exploreGames: 'Descubrir los juegos',
    viewLeaderboards: 'Ver las clasificaciones',
    profileHeading: 'Perfil',
    profileDescription: 'Tu identidad de laboratorio y tu progreso personal.',
    profileLinkAuthenticated: 'Abrir el perfil',
    profileLinkAnonymous: 'Inicia sesión para guardar tu progreso',
    leaderboardsHeading: 'Clasificaciones',
    // "Top scientists" is rendered as a score phrase rather than a person noun:
    // *científicos* would default to masculine. See the glossary's note on
    // adjectives and nouns that agree with the reader.
    leaderboardsDescription:
      'Las mejores puntuaciones de todos los experimentos de química interactivos.',
    leaderboardsLink: 'Ver todas las clasificaciones',
    gamesHeading: 'Minijuegos interactivos',
    gamesDescription: 'Elige un experimento y domina las reacciones y las fórmulas químicas.',
    gamesLink: 'Ver todos los juegos',
    emptyProfileAuthenticatedTitle: 'Perfil en construcción',
    emptyProfileAuthenticatedBody:
      'Tu perfil estará disponible en cuanto se ejecute la migración de perfiles en la base de datos.',
    emptyProfileAnonymousTitle: 'Tu perfil empieza aquí',
    emptyProfileAnonymousBody:
      'Inicia sesión para guardar tu progreso, gestionar tus notas de laboratorio y construir tu perfil científico.',
    emptyProfileCta: 'Iniciar sesión / Registrarse',
    teaserAcidDetail: 'Clasifica sustancias y valores de pH',
    teaserBlasterDetail: 'Revienta compuestos y ajusta iones',
    teaserNeutraliseDetail: 'Defiende el laboratorio de reacciones descontroladas',
  },

  gamesHub: {
    heading: 'Juegos',
    intro: 'Elige un experimento para empezar.',
    playNow: 'Jugar →',

    // Every title below is rated low in es-review.md: these are product-naming
    // calls for the owner, not translation calls. The rejected candidates stay
    // here so the reasoning travels with the code — see the "Game titles" table
    // in docs/i18n/glossary-es.md for the full version.

    // acidTitle candidates:
    //   '¿Ácido, base o neutro?' — truer to the four-way sort, too long for the card
    //   'El detector de ácidos'  — names a machine, which is the GAMES.md trap
    acidTitle: '¿Ácido o base?', // chosen: the question the game actually asks
    acidDescription: 'Clasifica las sustancias según sus propiedades.',

    // blasterTitle candidates:
    //   'Formula Blaster'   — calque; "Blaster" reads as English filler in Spanish
    //   'Caza de fórmulas'  — clear, but it sounds like a worksheet
    //   'Revientafórmulas'  — truer to the popping mechanic (reventar is what
    //                         Spanish says bubbles do); four characters heavier
    blasterTitle: 'Rompefórmulas', // chosen: verbo+sustantivo as one word is how
    // Spanish builds this kind of name (rompecabezas, sacacorchos, cascanueces),
    // and this one lands on "rompecabezas" — it reads as a game on sight
    blasterDescription: 'Revienta los compuestos buscados antes de que se escapen.',

    // neutraliseTitle candidates:
    //   'Neutralización'  — a textbook chapter heading
    //   'Defensa iónica'  — reads more like a product, but says "ions" without
    //                       saying "neutralisation"
    neutraliseTitle: '¡Neutraliza!', // chosen: mirrors the English's deliberate
    // imperative. GAMES.md's warning applies — check it reads as a name, not an order
    neutraliseDescription: 'Defiende el laboratorio de las moléculas invasoras.',

    // balancerTitle candidates:
    //   'Ajustador de reacciones' — an "ajustador" is a person or a machine (a
    //                               fitter, a claims adjuster): the GAMES.md trap
    //   'Equilibrio químico'      — a real and completely different topic
    //                               (chemical equilibrium); actively misleading
    //   'Ajusta la reacción'      — good, but the hub would then have two imperatives
    balancerTitle: 'La balanza de átomos', // chosen: names the beam the game shows
    balancerDescription: 'Haz que los átomos coincidan a los dos lados de la flecha.',

    // lewisTitle candidates:
    //   'Comparte para completar'   — calque; the purpose clause is clumsy in Spanish
    //   'De dos en dos'             — memorable, but loses the "fill" half of the rule
    //   'Cada oveja con su pareja'  — a real Spanish saying about pairing off and
    //                                 far more memorable, but folksy, 23 characters,
    //                                 and it says nothing chemical
    lewisTitle: 'Comparte y completa', // chosen: names the rule in Spanish, two
    // short alliterative imperatives, instantly readable at 14
    lewisDescription: 'Empareja los electrones desapareados para construir una molécula.',

    // bondsTitle candidates:
    //   'Los enlaces'  — too vague
    //   'Átomos unidos' — cute, imprecise
    bondsTitle: 'Enlaces químicos', // chosen: a topic name, so the direct
    // translation is the right answer here
    bondsDescription: 'Explora las estructuras moleculares y los enlaces entre átomos.',
  },

  auth: {
    backToGames: '← Volver a los juegos',
    // "Bienvenido de nuevo" would address a boy and "Bienvenida" a girl, so the
    // greeting drops the adjective entirely.
    loginTitle: '¡Hola de nuevo!',
    loginSubtitle: 'Retoma tus experimentos donde los dejaste.',
    registerTitle: 'Únete a ChemGames',
    registerSubtitle: 'Crea una cuenta para guardar tu progreso.',
    continueWithGoogle: 'Continuar con Google',
    or: 'o',
    email: 'Correo electrónico',
    emailPlaceholder: 'tu@ejemplo.es',
    password: 'Contraseña',
    passwordPlaceholder: 'Al menos 6 caracteres',
    loginAction: 'Iniciar sesión',
    registerAction: 'Crear cuenta',
    // "¿Eres nuevo?" would have to agree with the reader; a question about the
    // visit rather than about the person does not.
    switchToRegisterPrompt: '¿Es tu primera vez en ChemGames?',
    switchToRegisterAction: 'Registrarse',
    switchToLoginPrompt: '¿Ya tienes una cuenta?',
    switchToLoginAction: 'Iniciar sesión',
    checkInbox: 'Mira en tu correo para activar tu cuenta de ChemGames.',
    unconfiguredClient: 'El inicio de sesión no está configurado en este momento.',
    unconfiguredNotice:
      'El inicio de sesión necesita las credenciales de Supabase. Copia .env.example en .env.local y rellena los valores.',
    errorVerification: 'No hemos podido verificar ese enlace. Inténtalo de nuevo.',
    errorConfiguration: 'El inicio de sesión todavía no está configurado.',
  },

  profile: {
    heading: 'Ficha científica',
    subheading: 'Identidad de laboratorio y logros públicos',
    edit: 'Editar el perfil',
    missingTitle: 'No encontramos tu perfil de laboratorio',
    missingBody:
      'No hemos podido recuperar tu ficha científica. Vuelve a iniciar sesión o crea tu perfil.',
    missingAction: 'Volver al inicio de sesión',
    editMissingTitle: 'No encontramos tu ficha de laboratorio',
    editMissingBody:
      'No hemos podido cargar la configuración de tu perfil. Vuelve a iniciar sesión.',
    // "Registered Scientist" has no epicene Spanish equivalent: *científico*
    // is gendered and Spanish has no counterpart to French's *scientifique*.
    // This describes a mind rather than a person, which is what makes it work
    // on the reader's own profile badge. Rated low in es-review.md.
    defaultTitle: 'Mente científica',
    labMember: 'Miembro del laboratorio',
    labNotes: 'Notas de laboratorio',
    labNotesEmpty:
      'Aquí se observan las reacciones en silencio: todavía no hay ninguna nota de laboratorio.',
    favouriteCompound: 'Compuesto favorito',
    achievements: 'Logros',
    statExperiments: 'Experimentos',
    statLevel: 'Nivel',
    statStreak: 'Días seguidos',
    statAccuracy: 'Precisión',

    // "Ajustar el equipo" would be the literal rendering and is avoided: this
    // site reserves *ajustar* for balancing an equation.
    editHeading: 'Configurar el equipo',
    editIntro:
      'Personaliza tus preferencias de laboratorio y elige qué estadísticas son públicas.',
    identityHeading: 'Identidad científica',
    alias: 'Alias',
    aliasPlaceholder: 'p. ej. Argón Curioso 4821',
    aliasHelp:
      'Se muestra públicamente en las clasificaciones. Elige un apodo, no tu nombre real ni tu correo electrónico.',
    customTitle: 'Título personalizado',
    customTitlePlaceholder: 'p. ej. Especialista en reacciones',
    country: 'País / región',
    countryPlaceholder: 'p. ej. Australia',
    academicLevel: 'Curso',
    academicLevelPlaceholder: 'Elige tu curso…',
    labNotesField: 'Notas de laboratorio (sobre ti)',
    visibilityHeading: 'Visibilidad de las estadísticas de juego',
    save: 'Guardar los cambios',
    saving: 'Guardando…',

    dataHeading: 'Tus datos',
    dataIntro: 'Descarga una copia de lo que ChemGames guarda sobre ti, o borra tu cuenta.',
    exportHeading: 'Descargar mis datos',
    exportBody:
      'Un archivo JSON con los datos de tu cuenta, tu perfil, tus partidas y tu progreso.',
    exportAction: 'Descargar mis datos',
    deleteHeading: 'Borrar la cuenta',
    deleteBody:
      'Esto borra de forma permanente e inmediata tu cuenta, tu perfil, tus puntuaciones, tu progreso y tus entradas en las clasificaciones. No se puede deshacer.',
    // {word} is the literal confirmation word the server action compares
    // against. It stays untranslated on purpose — see docs/i18n/README.md.
    deleteConfirmLabel: 'Escribe {word} para confirmar',
    deleteAction: 'Borrar mi cuenta',
    deletePending: 'Borrando…',
  },

  profileToggles: {
    showCountry: 'Mostrar el país en el perfil',
    showYearLevel: 'Hacer público el curso',
    showLabNotes: 'Hacer públicas las notas de laboratorio',
    showTotalSyntheses: 'Mostrar el número de síntesis',
    showAccuracy: 'Mostrar el porcentaje de aciertos',
    showCurrentStreak: 'Mostrar la racha de días jugados',
  },

  serverMessages: {
    profileUnconfigured: 'La conexión con la base de datos no está configurada en este momento.',
    profileLoginRequired: 'Inicia sesión antes de editar tu configuración.',
    profileSaveFailed:
      'No se ha podido actualizar la configuración del laboratorio. Inténtalo de nuevo.',
    profileSaved: '¡Configuración guardada!',
    profileUnexpected: 'Se ha producido un error inesperado al guardar los cambios.',
    aliasLength: 'Tu alias debe tener entre {min} y {max} caracteres.',
    aliasAtSign:
      'Tu alias no puede contener una arroba (@). Elige un apodo, no una dirección de correo.',
    yearLevelInvalid: 'Elige un curso de la lista.',

    deleteConfirmRequired: 'Escribe {word} para confirmar que quieres borrar tu cuenta.',
    deleteUnavailable: 'Ahora mismo no se puede borrar la cuenta. Inténtalo más tarde.',
    deleteLoginRequired: 'Vuelve a iniciar sesión antes de borrar tu cuenta.',
    deleteFailed: 'No hemos podido borrar tu cuenta. Inténtalo más tarde.',

    exportUnavailable: 'La exportación de datos no está disponible en este momento.',
    // "Tienes que estar conectado" would have to agree in gender; naming the
    // action instead of the state avoids it.
    exportLoginRequired: 'Tienes que iniciar sesión para descargar tus datos.',
    exportFailed: 'No hemos podido preparar tu exportación de datos. Inténtalo más tarde.',

    feedbackCategoryAndMessage: 'Elige una categoría y escribe un mensaje.',
    feedbackCategoryInvalid: 'Elige una categoría válida.',
    feedbackMessageRequired: 'Escribe un mensaje.',
    feedbackMessageTooLong: 'El mensaje es demasiado largo (máximo {max} caracteres).',
    feedbackRateLimited: 'Demasiados envíos. Inténtalo más tarde.',
    feedbackUnconfigured: 'El servicio de comentarios no está configurado en este entorno.',
    feedbackStoreFailed: 'No se han podido guardar tus comentarios. Inténtalo más tarde.',
    feedbackEmailFailed: 'No se han podido enviar tus comentarios. Inténtalo más tarde.',
    feedbackUnexpected: 'Se ha producido un error inesperado al procesar los comentarios.',
  },

  privacy: {
    heading: 'Privacidad',
    intro: 'Qué guarda ChemGames sobre ti, quién puede verlo y cómo descargarlo o borrarlo.',
    effectiveDate: 'En vigor desde el {date}.',

    whoWeAreHeading: 'Quiénes somos',
    whoWeAreBody:
      'ChemGames lo gestiona Stella Slad, responsable de los datos que se describen en esta página. Puedes escribirnos a {email}.',

    collectHeading: 'Qué recogemos',
    collectAccountLabel: 'Cuenta.',
    collectAccountBody:
      'Tu dirección de correo electrónico y un hash de tu contraseña, almacenados por Supabase Auth. Si eliges el acceso con Google, recibimos el nombre de tu cuenta de Google, tu dirección de correo y la dirección de tu foto de perfil en lugar de una contraseña.',
    collectProfileLabel: 'Perfil.',
    collectProfileBody:
      'Un alias y los datos opcionales que quieras rellenar: un título, tu país, tu curso, notas de laboratorio, un elemento y un compuesto favoritos, y las insignias que consigas. También guardamos tus opciones de visibilidad, que deciden qué pueden ver los demás. Los alias se generan automáticamente y no contienen ningún nombre real. Puedes cambiar el tuyo en {link}.',
    collectGameplayLabel: 'Partidas.',
    collectGameplayBody:
      'Cada vez que terminas una partida registramos de qué juego se trataba, tu puntuación, el nivel que alcanzaste, el resultado, cuánto tiempo jugaste y cuándo. De ahí guardamos tu mejor puntuación y tu mejor nivel en cada juego, y estadísticas derivadas en tu perfil, como tu racha y tu porcentaje de aciertos.',
    collectFeedbackLabel: 'Comentarios.',
    collectFeedbackBody:
      'Cuando usas el botón de comentarios guardamos la categoría, tu mensaje y la página en la que estabas. También guardamos el identificador de tu cuenta si has iniciado sesión, y un identificador cifrado e irreversible que solo sirve para limitar los abusos.',

    publicHeading: 'Qué es público',
    publicBody1:
      'Tu alias y tu mejor puntuación en cada juego aparecen en las clasificaciones públicas, que puede ver cualquiera.',
    publicBody2:
      'Los demás datos del perfil, como tu país, tu curso, tus notas de laboratorio y tus estadísticas de juego, solo se muestran si activas la opción correspondiente en {link}. Salvo la fecha de registro, todas las opciones están desactivadas por defecto. Tu título, tu elemento y tu compuesto favoritos y tus insignias se muestran siempre junto a tu alias.',

    cookiesHeading: 'Cookies y almacenamiento local',
    cookiesBody1:
      'Al iniciar sesión se instalan las cookies de sesión de Supabase. Son estrictamente necesarias para mantener la sesión abierta.',
    cookiesBody2:
      'También instalamos una cookie de preferencia que recuerda el idioma que has elegido, para que el sitio se abra en ese idioma la próxima vez. No contiene nada más que un código de idioma.',
    cookiesBody3:
      'El almacenamiento local de tu navegador guarda tus preferencias de sonido, de tema y de «instrucciones ya vistas». Esos datos se quedan en tu dispositivo y no se nos envían.',
    cookiesBody4: 'No usamos analítica, publicidad ni rastreo de terceros.',

    processorsHeading: 'Quién trata estos datos',
    processorSupabaseLabel: 'Supabase',
    processorSupabaseBody: 'aloja la base de datos y gestiona el inicio de sesión.',
    processorResendLabel: 'Resend',
    processorResendBody: 'nos entrega los correos de comentarios.',
    processorGoogleLabel: 'Google',
    processorGoogleBody: 'solo si usas el acceso con Google.',
    processorHosting: 'El proveedor de alojamiento que sirve el sitio.',
    processorsTransport: 'Los datos se transmiten por HTTPS.',

    retentionHeading: 'Cuánto tiempo los guardamos',
    retentionBody1: 'Guardamos tus datos mientras exista tu cuenta.',
    retentionBody2:
      'Cuando borras tu cuenta, tu perfil, tus partidas, tu progreso y tus entradas en las clasificaciones se borran inmediatamente. Los comentarios que enviaste se conservan, pero anonimizados, porque se elimina la referencia a tu cuenta.',

    choicesHeading: 'Tus opciones',
    choicesEdit: 'Edita tu perfil y tus opciones de visibilidad en {link}.',
    choicesDownload: 'Descarga una copia de tus datos desde la misma página.',
    choicesDelete: 'Borra tu cuenta desde la misma página.',
    choicesEmail: 'O escríbenos a {email} y te ayudamos.',

    childrenHeading: 'Menores y estudiantes',
    childrenBody1:
      'ChemGames está pensado para la educación secundaria, así que recogemos lo mínimo necesario para que los juegos funcionen y para guardar las puntuaciones.',
    childrenBody2:
      'No hace falta ningún nombre real. Los alias se generan automáticamente, no contienen ningún nombre real y se pueden cambiar en {link}.',
    childrenBody3:
      'Madres, padres, tutores legales y profesorado pueden escribirnos a {email} para pedir que se borren la cuenta y los datos de un estudiante.',

    legalHeading: 'Aviso legal',
    legalBody1:
      'Tratamos los datos personales conforme a la Privacy Act 1988 australiana y a los Australian Privacy Principles.',
    legalBody2:
      'Si tienes una reclamación, contacta antes con nosotros. Si nuestra respuesta no te satisface, puedes reclamar ante la Office of the Australian Information Commissioner en {link}.',

    changesHeading: 'Cambios en esta página',
    changesBody:
      'Si nuestras prácticas cambian, actualizaremos esta página y la fecha de entrada en vigor de arriba.',
  },

  cheatSheetCategories: {
    Fundamentals: 'Fundamentos',
    Reactions: 'Reacciones',
    'Acids & Bases': 'Ácidos y bases',
    Equations: 'Ecuaciones',
    Thermodynamics: 'Termodinámica',
    Organic: 'Química orgánica',
    Bonding: 'Enlaces',
    Nomenclature: 'Nomenclatura',
    Stoichiometry: 'Estequiometría',
  },

  yearLevels: {
    // The stored value stays the English "Year 9"; only the label is Spanish.
    // Mapped by age: Year 7 = 1º ESO, Year 8 = 2º ESO, Year 9 = 3º ESO,
    // Year 10 = 4º ESO, Senior = Bachillerato. The masculine ordinal indicator
    // (º, U+00BA) is one character and needs no superscript font in a pill.
    all: 'Todos',
    'Year 7': '1º ESO',
    'Year 8': '2º ESO',
    'Year 9': '3º ESO',
    'Year 10': '4º ESO',
    Senior: 'Bachillerato',
  },

  leaderboards: {
    heading: 'Clasificaciones',
    intro: 'Compara las mejores puntuaciones de todos los experimentos.',
    topScientists: 'Mejores puntuaciones',
    globalNetwork: 'Red mundial',
    emptyTitle: 'El podio está esperando.',
    emptyBody: 'Juega la primera ronda y quédate con el primer puesto.',
    rank: 'Puesto',
    rankA11y: 'Puesto',
    points: 'Puntos',
    recorded: 'Registrado el {date}',
    myResults: 'Mis resultados de laboratorio',
    highScore: 'Mejor puntuación',
    unranked: 'Sin clasificar',
    // "¿Listo para tu primer resultado?" would have to agree with the reader,
    // so the question becomes a statement about the result instead.
    firstResultTitle: 'Tu primer resultado te espera.',
    firstResultBody: 'Juega una ronda y marca una puntuación.',
    noData: 'Todavía no se ha sintetizado nada. ¡Empieza tú!',
  },

  feedback: {
    openA11y: 'Abrir el menú de comentarios',
    trigger: 'Comentarios',
    heading: 'Comentarios sobre ChemGames',
    closeA11y: 'Cerrar los comentarios',
    sentTitle: '¡Comentario enviado!',
    sentBody: 'Gracias por ayudarnos a mejorar ChemGames.',
    categoryBug: 'Problema',
    categoryChemistry: 'Datos',
    categoryFeature: 'Idea',
    placeholderBug: '¿Qué ha fallado en esta página?',
    placeholderChemistry: '¿Has visto una valencia o una fórmula que no cuadra?',
    placeholderFeature: '¿Qué mejoraría este juego?',
    submit: 'Enviar',
    submitting: 'Enviando…',
    genericError: 'No se han podido enviar los comentarios.',
  },

  settings: {
    // "Opciones", never "Ajustes": *ajustar* is this site's verb for balancing
    // an equation, and the reader must not meet the same root meaning two
    // unrelated things. See docs/i18n/glossary-es.md § Product and UI vocabulary.
    gameTitle: 'Opciones del juego',
    globalTitle: 'Opciones',
    closeA11y: 'Cerrar las opciones',
    support: 'Apoyo',
    appearance: 'Apariencia',
    thisGame: 'Este juego',
    allGamesDefault: 'Por defecto en todos los juegos',
    allGames: 'Todos los juegos',
    useGlobal: 'Valor por defecto',
    dark: 'Oscuro',
    light: 'Claro',
    overrideHelp:
      'La elección de un juego concreto tiene prioridad sobre el valor por defecto de todos los juegos. Elige «Valor por defecto» para volver a seguirlo.',
    audio: 'Audio',
    soundEffects: 'Efectos de sonido',
    volumeA11y: 'Volumen del sonido',
  },

  cheatSheets: {
    heading: 'Chuletas del laboratorio',
    intro:
      'Fórmulas químicas, reglas de reacción y ecuaciones en breve, agrupadas por curso.',
    backToList: 'Volver a las chuletas',
    count: { one: '{count} tema', other: '{count} temas' },
    exampleFormula: 'Fórmula de ejemplo',
    // Spanish punctuates a colon exactly as English does — no space before it —
    // so this string is identical to the English and is allowlisted. The key
    // exists only because French needs a no-break space here.
    exampleLabel: '{name}:',
    readReference: 'Consultar',
    practiseThis: 'Practicar',
    keyConcepts: 'Lo esencial',
    exampleFormulas: 'Fórmulas y reacciones de ejemplo',
    lookupTables: 'Tablas de consulta',
    goingDeeper: 'Para profundizar',
    watchOutFor: 'Errores frecuentes',
    learnMore: 'Saber más',
    // Collective nouns rather than *los alumnos* / *los profesores*, which
    // would default to masculine.
    forStudents: 'Para el alumnado',
    forTeachers: 'Para el profesorado',
    curriculum: 'Currículo: ',
    filterA11y: 'Filtrar los temas por curso',
  },

  chemistry: {
    acid: 'Ácido',
    base: 'Base',
    neutral: 'Neutro',
    amphoteric: 'Anfótero',
    basicAlkaline: 'Básico / alcalino',
  },

  games: {
    shared: {
      progress: 'Progreso',
      level: 'Nivel',
      score: 'Puntos',
      levelValue: 'Nivel {level}',
      scoreValue: 'Puntos: {score}',
      lives: 'VIDAS: {lives}/{max}',
      exit: 'Salir',
      exitA11y: 'Salir de la partida',
      // "pista", and unlike French this needed no fight: Spanish's word for a
      // formula subscript is *subíndice*, so there is no collision to dodge.
      hintA11y: 'Ver una pista',
      howToPlay: 'Cómo jugar',
      closeInstructionsA11y: 'Cerrar las instrucciones',
      settings: 'Opciones',
      pause: 'Pausar la partida',
      resume: 'Reanudar la partida',
      gotIt: 'ENTENDIDO',
      hint: 'Pista',
      find: 'Busca:',
      reactionError: 'Error de reacción',
      labHint: 'Pista del laboratorio',
      dismissFeedbackA11y: 'Cerrar el mensaje',
      dismissHintA11y: 'Cerrar la pista',
      finalScore: 'Puntuación final:',
      finalScoreA11y: 'Puntuación final: {score}',
      levelProgressA11y: 'Progreso: nivel {level} de {max}',
      keyboardAndMouse: 'Teclado y ratón',
      touchscreen: 'Pantalla táctil',
    },

    overlay: {
      pausedBadge: 'Partida en espera',
      pausedTitle: 'Juego en pausa',
      pausedSubtitle: 'Tómate un descanso de laboratorio.',
      pausedDescription: 'Tu experimento está congelado exactamente donde lo dejaste.',
      failedBadge: 'Experimento terminado',
      failedTitle: 'Partida terminada',
      failedSubtitle: '¡Tu reacción se ha quedado en nada!',
      failedDescription: 'Repasa las fórmulas y vuelve a intentarlo.',
      victoryBadge: 'Todos los objetivos cumplidos',
      victoryTitle: 'Investigación terminada',
      victorySubtitle: '¡Laboratorio dominado!',
      victoryDescription: '¡Buen trabajo! Has superado todos los niveles.',
      levelUpBadge: 'Objetivo cumplido',
      levelUpTitle: 'Nivel superado',
      levelUpSubtitle: '¡Tanda completa!',
      // "¿Listo para…?" would have to agree with the reader; the first person
      // plural sidesteps it and keeps the encouraging tone.
      levelUpDescription: '¿Seguimos con retos más difíciles?',
      timeoutDescription: 'Se acabó el tiempo antes de llegar al objetivo.',
      statLevel: 'Nivel',
      statScore: 'Puntos',
      statRound: 'Ronda',
      // A Spanish participle agrees with its count, and these are flat strings
      // rather than plural records — so "1 correctas" would be wrong and the
      // shape cannot be changed to fix it. The colon label is invariant, and it
      // is the same device the article problem already needs everywhere else.
      statRoundValue: 'aciertos: {count}',
      levelOfMax: 'Nivel {level} de {max} • aciertos: {correct}',
      levelUpProgress: 'Nivel {level} → {next} • clasificadas: {correct}',
      resume: 'Reanudar la partida',
      beginLevel: 'Empezar el nivel {level}',
      tryAgain: 'Volver a intentarlo',
      quitToHub: 'Volver a los juegos',
      keyHintResume: 'Pulsa Escape, Espacio o Intro para continuar',
      keyHintRetry: 'Pulsa Espacio o Intro para volver a intentarlo',
    },

    acidClassification: {
      subtitle: 'CLASIFICA LA MOLÉCULA',
      task: '¿Ácido, base o neutro?',
      progress: '{correct} / {quota} clasificadas',
      arenaHeading: 'Clasifica el compuesto',
      registryError: 'Error: no se encuentra el registro de compuestos.',
      instructionsTitle: 'Cómo jugar: ¿Ácido o base?',
      instructionsSubtitle: '¡Analiza la fórmula química y descubre sus propiedades!',
      stepIdentifyLabel: 'Identifica:',
      stepIdentifyText: 'Mira el compuesto que aparece en la burbuja central.',
      stepClassifyLabel: 'Clasifica:',
      stepClassifyText: 'Elige si la sustancia es ácida, básica, neutra o anfótera.',
      stepHintLabel: '¿Necesitas una pista?',
      stepHintText: 'Pulsa la bombilla de arriba para ver el nombre químico.',
      stepCarefulLabel: 'Cuidado:',
      stepCarefulText: '¡A los 3 fallos el vaso de precipitados se rompe!',
    },

    formulaBlaster: {
      subtitle: 'MOLÉCULA OBJETIVO',
      progress: 'Objetivo {phase}/3 • Aciertos: {hits}/{quota}',
      hintHeading: 'Pista sobre la molécula objetivo',
      instructionsTitle: 'Cómo jugar: Rompefórmulas',
      instructionsIntro:
        'Busca las burbujas que coinciden con la molécula objetivo de arriba y reviéntalas.',
      instructionsBullet1: 'Pulsa la fórmula correcta para sumar un acierto al objetivo actual.',
      instructionsBullet2:
        'Usa la bombilla de arriba si necesitas una pista sobre la composición.',
      instructionsBullet3:
        'Si tocas una molécula equivocada, te decimos qué elemento buscar en su lugar.',
      /** Feedback templates. {compound}/{element} are localized names; {formula}/{symbol} never are. */
      // Every one of these is written so no article ever has to precede a name
      // placeholder: Spanish would need "el metano" but "el agua" (feminine),
      // and "de el" must contract to "del".
      hintTemplate: '{compound} – elementos: {elements}.',
      wrongPick: 'No es eso: {compound} ({formula}).',
      wrongPickLookFor:
        'No es eso: {compound} ({formula}). Busca átomos de este elemento: {element} ({symbol}).',
      wrongPickCheckCounts:
        'No es eso: {compound} ({formula}). Cuenta los átomos del objetivo: {target}.',
    },

    neutralise: {
      subtitleFull: 'OBJETIVO: neutraliza los ácidos con OH⁻ y las bases con H⁺',
      subtitleShort: 'NEUTRALIZA',
      progressFull: 'Oleada {wave}/3 | Eliminadas {cleared}/{total}',
      progressShort: 'Oleada {wave}/3',
      fire: 'Disparar',
      fireA11y: 'Disparar',
      switchIonA11yAcid: 'Cambiar de ion, ahora H+ (ácido)',
      switchIonA11yBase: 'Cambiar de ion, ahora OH- (base)',
      instructionsTitle: 'Cómo jugar: ¡Neutraliza!',
      instructionsIntro: '¡Defiende el laboratorio de los productos peligrosos que llegan!',
      keyOneLabel: '1',
      keyOneText: 'Carga {ion} para neutralizar las bases.',
      keyOneIon: 'H⁺ (ácido)',
      keyTwoLabel: '2',
      keyTwoText: 'Carga {ion} para neutralizar los ácidos.',
      keyTwoIon: 'OH⁻ (base)',
      keySpaceLabel: 'Espacio',
      keySpaceText: '¡Dispara tu cañón de iones! (O pulsa en la arena.)',
      keyArrowsLabel: '←/→',
      keyArrowsText: 'Mueve el cañón (o mueve el ratón).',
      touchDragLabel: 'Arrastrar',
      touchDragText: 'Desliza el dedo por la arena para apuntar con el cañón.',
      touchFireLabel: 'Disparar',
      touchFireText: 'Toca el botón {button} debajo de la arena.',
      touchSwitchLabel: 'Cambiar',
      touchSwitchText: 'Toca el botón de ion para pasar de H⁺ a OH⁻.',
    },
  },
} satisfies Dictionary;

export default es;
