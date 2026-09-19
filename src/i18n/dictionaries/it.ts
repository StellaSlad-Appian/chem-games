// src/i18n/dictionaries/it.ts
//
// Italian (it). Register and terminology decisions:
//
//  - Address the reader with informal "tu" throughout. Like Spanish and unlike
//    French this is not contentious: Italian school material addresses students
//    as "tu" as a matter of course, and "Lei" would read as a letter from the
//    bank.
//  - Chemistry terms follow Italian school curriculum usage, not literal
//    translation. Every term is fixed in docs/i18n/glossary-it.md.
//  - **The apostrophe is U+2019 (’), everywhere.** Elision is pervasive in
//    Italian (l’atomo, un’equazione, dell’ossigeno), this file is single-quoted
//    TypeScript, and a straight apostrophe would need a backslash in roughly one
//    string in six. The typographic apostrophe is also what a printed Italian
//    page uses; en.ts already writes "browser’s" the same way.
//  - "Hint" is *indizio*. French had to abandon the obvious word because its
//    *indice* also means a formula subscript; Italian's subscript is *pedice*,
//    so there is no collision. *Suggerimento* is the standard UI word and was
//    rejected at twelve characters — it does not fit the header badge.
//  - "Settings" is *Impostazioni*, and needs none of the care Spanish took: this
//    site's verb for balancing an equation is *bilanciare*, which shares no root
//    with it.
//  - Chemical formulae, element symbols, state symbols and IUPAC notation are
//    never translated. Element and compound *names* are, in
//    src/i18n/chemistry-names/it.ts.
//  - Italian typography: « … » for quotations with no inner spaces, NO space
//    before : ; ! ?, – (en dash) for parenthetical dashes, … as one character,
//    decimal comma, ordinals written 1ª / 1º, and È rather than E’.
//  - **Adjectives and participles agree with the reader.** "Ready for your first
//    result?" has no gender-neutral Italian translation that keeps the
//    adjective, so every such string was rewritten rather than translated — see
//    the glossary's "Adjectives and participles that agree with the reader"
//    table. Italian's own device is the headless relative: *Per chi studia* and
//    *Per chi insegna* where Spanish needed collective nouns.
//  - **Count agreement.** Four Spanish strings compiled, passed every gate and
//    were wrong on screen, because a Romance verb agrees with its count and the
//    strings are flat. The same shapes are invariant here — see games.overlay
//    below.
//  - Italian runs roughly 15–20% longer than English. Where a string sits in a
//    fixed-width control (header badges, nav buttons, category pills) the
//    translation is deliberately shorter than a faithful rendering would be;
//    those entries are flagged in docs/i18n/it-review.md.

import type { Dictionary } from './en';

export const it = {
  meta: {
    siteName: 'ChemGames',
    title: 'ChemGames | Impara la chimica giocando',
    description:
      'Capisci la chimica giocando: minigiochi visivi e interattivi e bigini di ripasso.',
    // Keyword lists are chosen per language, not translated. The age band is
    // the thing to get right: this site is Year 9–10, which is terza media and
    // primo superiore in Italy. A bare "chimica liceo" would repeat the mistake
    // Phase 1 had to correct in German ("Chemie Oberstufe" names ages 16–19).
    // Rated low: these are plausible Italian search terms, not researched ones.
    keywords: [
      'chimica',
      'giochi didattici',
      'molecole',
      'reazioni chimiche',
      'equazioni chimiche',
      'chimica terza media',
      'chimica primo superiore',
    ],
    // Italian does use the loanword "privacy", but "informativa sulla privacy"
    // is the standard name of the document and is a real translation rather
    // than an allowlisted identity.
    privacyTitle: 'Informativa sulla privacy | ChemGames',
    privacyDescription:
      'Che cosa ChemGames conserva su di te, che cosa è pubblico, chi lo tratta e come scaricare o cancellare i tuoi dati.',
    cheatSheetTitle: 'Bigino di {title} | ChemGames',
    cheatSheetNotFound: 'Argomento non trovato – ChemGames',
  },

  common: {
    backToDashboard: 'Torna al pannello',
    dashboard: 'Pannello',
    playNow: 'Gioca',
    cancel: 'Annulla',
    opensInNewTab: '(si apre in una nuova scheda)',
    loading: 'Caricamento…',
  },

  language: {
    /** Labels the switcher; visible in the settings panel, sr-only in the nav. */
    label: 'Lingua',
  },

  nav: {
    sectionsA11y: 'Sezioni del pannello',
    profile: 'Profilo',
    leaderboards: 'Classifiche',
    games: 'Giochi',
    cheatSheets: 'Bigini',
    // Shorter than the English "Log in / Register", the same trade German,
    // French and Spanish make: the pair is the widest thing in the header, and
    // the sign-in page offers both actions anyway.
    login: 'Accedi',
    logout: 'Esci',
    loggingOut: 'Uscita in corso…',
    settingsA11y: 'Apri le impostazioni generali',
    menuOpenA11y: 'Apri il menu',
    menuCloseA11y: 'Chiudi il menu',
    menuTitleA11y: 'Menu del sito',
  },

  footer: {
    tagline: 'ChemGames – la chimica vista, giocata e capita.',
    copyright: '© {year} ChemGames. Tutti i diritti riservati.',
    privacy: 'Informativa privacy',
  },

  home: {
    eyebrow: 'Laboratorio di chimica interattivo',
    heading: 'Impara la chimica giocando.',
    intro:
      'Esplora esperimenti interattivi, tieni d’occhio i tuoi record personali, impara le formule e confronta i tuoi risultati di laboratorio con quelli degli altri.',
    exploreGames: 'Scopri i giochi',
    viewLeaderboards: 'Vedi le classifiche',
    profileHeading: 'Profilo',
    profileDescription: 'La tua identità di laboratorio e i tuoi progressi personali.',
    profileLinkAuthenticated: 'Apri il profilo',
    profileLinkAnonymous: 'Accedi per salvare i progressi',
    leaderboardsHeading: 'Classifiche',
    // "Top scientists" is rendered as a score phrase rather than a person noun:
    // *scienziati* would default to masculine. See the glossary's note on
    // adjectives and nouns that agree with the reader.
    leaderboardsDescription:
      'I migliori punteggi di tutti gli esperimenti di chimica interattivi.',
    leaderboardsLink: 'Vedi tutte le classifiche',
    gamesHeading: 'Minigiochi interattivi',
    gamesDescription: 'Scegli un esperimento e impara le reazioni e le formule chimiche.',
    gamesLink: 'Vedi tutti i giochi',
    emptyProfileAuthenticatedTitle: 'Profilo in costruzione',
    emptyProfileAuthenticatedBody:
      'Il tuo profilo sarà disponibile appena sarà stata eseguita la migrazione dei profili nel database.',
    emptyProfileAnonymousTitle: 'Il tuo profilo comincia qui',
    emptyProfileAnonymousBody:
      'Accedi per salvare i tuoi progressi, gestire i tuoi appunti di laboratorio e costruire il tuo profilo scientifico.',
    emptyProfileCta: 'Accedi / Registrati',
    teaserAcidDetail: 'Classifica le sostanze e i valori di pH',
    teaserBlasterDetail: 'Fai scoppiare i composti e bilancia gli ioni',
    teaserNeutraliseDetail: 'Difendi il laboratorio dalle reazioni fuori controllo',
  },

  gamesHub: {
    heading: 'Giochi',
    intro: 'Scegli un esperimento per cominciare.',
    playNow: 'Gioca →',

    // Every title below is rated low in it-review.md: these are product-naming
    // calls for the owner, not translation calls. The rejected candidates stay
    // here so the reasoning travels with the code — see the "Game titles" table
    // in docs/i18n/glossary-it.md for the full version.

    // acidTitle candidates:
    //   'Acido, base o neutro?'  — truer to the four-way sort, too long for the card
    //   'Il rilevatore di acidi' — names a machine, which is the GAMES.md trap
    acidTitle: 'Acido o base?', // chosen: the question the game actually asks
    acidDescription: 'Classifica le sostanze in base alle loro proprietà.',

    // blasterTitle candidates:
    //   'Formula Blaster'      — calque; "Blaster" reads as English filler in Italian
    //   'Caccia alle formule'  — clear, but it sounds like a worksheet
    //   'Scoppiaformule'       — truer to the popping mechanic (scoppiare is what
    //                            Italian says bubbles do); two characters heavier
    blasterTitle: 'Rompiformule', // chosen: verbo+sostantivo as one word is how
    // Italian builds this kind of name (rompicapo, schiaccianoci, cavatappi),
    // and this one lands on "rompicapo" — it reads as a game on sight
    blasterDescription: 'Fai scoppiare i composti cercati prima che scappino.',

    // neutraliseTitle candidates:
    //   'Neutralizzazione' — a textbook chapter heading
    //   'Difesa ionica'    — reads more like a product, but says "ions" without
    //                        saying "neutralisation"
    neutraliseTitle: 'Neutralizza!', // chosen: mirrors the English's deliberate
    // imperative. GAMES.md's warning applies — check it reads as a name, not an order
    neutraliseDescription: 'Difendi il laboratorio dalle molecole invasori.',

    // balancerTitle candidates:
    //   'Bilanciatore di reazioni' — a "bilanciatore" is a machine in Italian (a
    //                                wheel balancer): the GAMES.md trap
    //   'Equilibrio chimico'       — a real and completely different topic
    //                                (chemical equilibrium); actively misleading
    //   'Bilancia le reazioni'     — good, but the hub would then have two imperatives
    balancerTitle: 'La bilancia degli atomi', // chosen: names the beam the game
    // shows, and carries a second reading — "bilancia" is both the scales and
    // the imperative "balance"
    balancerDescription: 'Fai in modo che gli atomi coincidano ai due lati della freccia.',

    // lewisTitle candidates:
    //   'Condividi per completare' — calque; the purpose clause is clumsy in Italian
    //   'A due a due'              — memorable, but loses the "fill" half of the rule
    //   'Accoppia e completa'      — names the mechanic (pairing the dispari) rather
    //                                than the rule (sharing to fill a shell)
    lewisTitle: 'Condividi e completa', // chosen: names the rule in Italian, two
    // short imperatives, instantly readable at 14
    lewisDescription: 'Accoppia i dispari per costruire una molecola.',

    // bondsTitle candidates:
    //   'I legami'    — too vague
    //   'Atomi uniti' — cute, imprecise
    bondsTitle: 'Legami chimici', // chosen: a topic name, so the direct
    // translation is the right answer here
    bondsDescription: 'Esplora le strutture molecolari e i legami fra gli atomi.',
  },

  auth: {
    backToGames: '← Torna ai giochi',
    // "Bentornato" would address a boy and "Bentornata" a girl, so the greeting
    // drops the participle entirely.
    loginTitle: 'Ciao di nuovo!',
    loginSubtitle: 'Riprendi i tuoi esperimenti da dove li avevi lasciati.',
    registerTitle: 'Entra in ChemGames',
    registerSubtitle: 'Crea un account per salvare i tuoi progressi.',
    continueWithGoogle: 'Continua con Google',
    or: 'oppure',
    email: 'Indirizzo email',
    emailPlaceholder: 'tu@esempio.it',
    // "Password" is the word Italian uses; the alternative ("parola d’ordine")
    // is archaic. Allowlisted as identical-by-design rather than replaced.
    password: 'Password',
    passwordPlaceholder: 'Almeno 6 caratteri',
    loginAction: 'Accedi',
    registerAction: 'Crea un account',
    // "Sei nuovo?" would have to agree with the reader; a question about the
    // visit rather than about the person does not.
    switchToRegisterPrompt: 'È la tua prima volta su ChemGames?',
    switchToRegisterAction: 'Registrati',
    switchToLoginPrompt: 'Hai già un account?',
    switchToLoginAction: 'Accedi',
    checkInbox: 'Controlla la posta per attivare il tuo account ChemGames.',
    unconfiguredClient: 'L’accesso non è configurato in questo momento.',
    unconfiguredNotice:
      'L’accesso ha bisogno delle credenziali di Supabase. Copia .env.example in .env.local e compila i valori.',
    errorVerification: 'Non siamo riusciti a verificare quel link. Riprova.',
    errorConfiguration: 'L’accesso non è ancora configurato.',
  },

  profile: {
    heading: 'Scheda scientifica',
    subheading: 'Identità di laboratorio e traguardi pubblici',
    edit: 'Modifica il profilo',
    missingTitle: 'Non troviamo il tuo profilo di laboratorio',
    missingBody:
      'Non siamo riusciti a recuperare la tua scheda scientifica. Accedi di nuovo oppure crea il tuo profilo.',
    missingAction: 'Torna all’accesso',
    editMissingTitle: 'Non troviamo la tua scheda di laboratorio',
    editMissingBody:
      'Non siamo riusciti a caricare le impostazioni del tuo profilo. Prova ad accedere di nuovo.',
    // "Registered Scientist" has no epicene Italian equivalent: *scienziato* is
    // gendered, Italian has no counterpart to French's *scientifique*, and no
    // collective like Spanish's *alumnado*. This describes a mind rather than a
    // person, which is what makes it work on the reader's own profile badge.
    // Rated low in it-review.md.
    defaultTitle: 'Mente da laboratorio',
    labMember: 'Membro del laboratorio',
    labNotes: 'Appunti di laboratorio',
    labNotesEmpty:
      'Qui si osservano le reazioni in silenzio: per ora non c’è nessun appunto di laboratorio.',
    favouriteCompound: 'Composto preferito',
    achievements: 'Traguardi',
    statExperiments: 'Esperimenti',
    statLevel: 'Livello',
    statStreak: 'Giorni di fila',
    statAccuracy: 'Precisione',

    editHeading: 'Configura l’attrezzatura',
    editIntro:
      'Personalizza le tue preferenze di laboratorio e scegli quali statistiche sono pubbliche.',
    identityHeading: 'Identità scientifica',
    alias: 'Alias',
    aliasPlaceholder: 'es. Argon Curioso 4821',
    aliasHelp:
      'Viene mostrato pubblicamente nelle classifiche. Scegli un soprannome, non il tuo vero nome né il tuo indirizzo email.',
    customTitle: 'Titolo personalizzato',
    customTitlePlaceholder: 'es. Specialista di reazioni',
    country: 'Paese / regione',
    countryPlaceholder: 'es. Australia',
    academicLevel: 'Classe',
    academicLevelPlaceholder: 'Scegli la tua classe…',
    labNotesField: 'Appunti di laboratorio (su di te)',
    visibilityHeading: 'Visibilità delle statistiche di gioco',
    save: 'Salva le modifiche',
    saving: 'Salvataggio…',

    dataHeading: 'I tuoi dati',
    dataIntro:
      'Scarica una copia di quello che ChemGames conserva su di te, oppure cancella il tuo account.',
    exportHeading: 'Scarica i miei dati',
    exportBody:
      'Un file JSON con i dati del tuo account, il tuo profilo, le tue partite e i tuoi progressi.',
    exportAction: 'Scarica i miei dati',
    deleteHeading: 'Cancella l’account',
    deleteBody:
      'Questo cancella subito e per sempre il tuo account, il tuo profilo, i tuoi punteggi, i tuoi progressi e le tue voci nelle classifiche. Non si può annullare.',
    // {word} is the literal confirmation word the server action compares
    // against. It stays untranslated on purpose — see docs/i18n/README.md.
    deleteConfirmLabel: 'Scrivi {word} per confermare',
    deleteAction: 'Cancella il mio account',
    deletePending: 'Cancellazione…',
  },

  profileToggles: {
    showCountry: 'Mostra il Paese sul profilo',
    showYearLevel: 'Rendi pubblica la classe',
    showLabNotes: 'Rendi pubblici gli appunti di laboratorio',
    showTotalSyntheses: 'Mostra il numero di sintesi',
    showAccuracy: 'Mostra la percentuale di risposte esatte',
    showCurrentStreak: 'Mostra i giorni di gioco di fila',
  },

  serverMessages: {
    profileUnconfigured: 'Il collegamento al database non è configurato in questo momento.',
    profileLoginRequired: 'Accedi prima di modificare le tue impostazioni.',
    profileSaveFailed:
      'Non è stato possibile aggiornare le impostazioni del laboratorio. Riprova.',
    profileSaved: 'Impostazioni salvate!',
    profileUnexpected: 'Si è verificato un errore imprevisto durante il salvataggio.',
    aliasLength: 'Il tuo alias deve avere fra {min} e {max} caratteri.',
    aliasAtSign:
      'Il tuo alias non può contenere una chiocciola (@). Scegli un soprannome, non un indirizzo email.',
    yearLevelInvalid: 'Scegli una classe dall’elenco.',

    deleteConfirmRequired: 'Scrivi {word} per confermare che vuoi cancellare il tuo account.',
    deleteUnavailable: 'In questo momento non si può cancellare l’account. Riprova più tardi.',
    deleteLoginRequired: 'Accedi di nuovo prima di cancellare il tuo account.',
    deleteFailed: 'Non siamo riusciti a cancellare il tuo account. Riprova più tardi.',

    exportUnavailable: 'L’esportazione dei dati non è disponibile in questo momento.',
    // "Devi essere connesso" would have to agree in gender; naming the action
    // instead of the state avoids it.
    exportLoginRequired: 'Devi accedere per scaricare i tuoi dati.',
    exportFailed:
      'Non siamo riusciti a preparare l’esportazione dei tuoi dati. Riprova più tardi.',

    feedbackCategoryAndMessage: 'Scegli una categoria e scrivi un messaggio.',
    feedbackCategoryInvalid: 'Scegli una categoria valida.',
    feedbackMessageRequired: 'Scrivi un messaggio.',
    feedbackMessageTooLong: 'Il messaggio è troppo lungo (massimo {max} caratteri).',
    feedbackRateLimited: 'Troppi invii. Riprova più tardi.',
    feedbackUnconfigured:
      'Il servizio delle segnalazioni non è configurato in questo ambiente.',
    feedbackStoreFailed: 'Non è stato possibile salvare la tua segnalazione. Riprova più tardi.',
    feedbackEmailFailed: 'Non è stato possibile inviare la tua segnalazione. Riprova più tardi.',
    feedbackUnexpected:
      'Si è verificato un errore imprevisto durante l’elaborazione della segnalazione.',
  },

  privacy: {
    heading: 'Informativa sulla privacy',
    intro:
      'Che cosa ChemGames conserva su di te, chi può vederlo e come scaricarlo o cancellarlo.',
    effectiveDate: 'In vigore dal {date}.',

    whoWeAreHeading: 'Chi siamo',
    whoWeAreBody:
      'ChemGames è gestito da Stella Slad, titolare del trattamento dei dati descritti in questa pagina. Puoi scriverci a {email}.',

    collectHeading: 'Che cosa raccogliamo',
    // "Account" is the word Italian uses, so this run-in label is identical to
    // the English and is allowlisted rather than paraphrased.
    collectAccountLabel: 'Account.',
    collectAccountBody:
      'Il tuo indirizzo email e l’hash della tua password, conservati da Supabase Auth. Se scegli l’accesso con Google, riceviamo il nome del tuo account Google, il tuo indirizzo email e l’indirizzo della tua immagine di profilo invece di una password.',
    collectProfileLabel: 'Profilo.',
    collectProfileBody:
      'Un alias e i dati facoltativi che vuoi compilare: un titolo, il tuo Paese, la tua classe, gli appunti di laboratorio, un elemento e un composto preferiti e i distintivi che ottieni. Conserviamo anche le tue impostazioni di visibilità, che decidono che cosa possono vedere gli altri. Gli alias sono generati automaticamente e non contengono nessun nome vero. Puoi cambiare il tuo su {link}.',
    collectGameplayLabel: 'Partite.',
    collectGameplayBody:
      'Ogni volta che finisci una partita registriamo di quale gioco si trattava, il tuo punteggio, il livello che hai raggiunto, il risultato, quanto hai giocato e quando. Da qui conserviamo il tuo miglior punteggio e il tuo miglior livello in ogni gioco, e le statistiche che ne derivano sul tuo profilo, come i giorni di fila e la percentuale di risposte esatte.',
    collectFeedbackLabel: 'Segnalazioni.',
    collectFeedbackBody:
      'Quando usi il pulsante delle segnalazioni conserviamo la categoria, il tuo messaggio e la pagina in cui eri. Conserviamo anche l’identificativo del tuo account, se hai effettuato l’accesso, e un identificativo cifrato e non reversibile che serve solo a limitare gli abusi.',

    publicHeading: 'Che cosa è pubblico',
    publicBody1:
      'Il tuo alias e il tuo miglior punteggio in ogni gioco compaiono nelle classifiche pubbliche, che chiunque può vedere.',
    publicBody2:
      'Gli altri dati del profilo, come il tuo Paese, la tua classe, i tuoi appunti di laboratorio e le tue statistiche di gioco, si vedono solo se attivi l’impostazione corrispondente su {link}. A parte la data di iscrizione, tutte le impostazioni sono disattivate all’inizio. Il tuo titolo, il tuo elemento e il tuo composto preferiti e i tuoi distintivi si vedono sempre insieme al tuo alias.',

    cookiesHeading: 'Cookie e memoria locale',
    cookiesBody1:
      'Quando accedi vengono impostati i cookie di sessione di Supabase. Sono strettamente necessari per tenere aperta la sessione.',
    cookiesBody2:
      'Impostiamo anche un cookie di preferenza che ricorda la lingua che hai scelto, così la prossima volta il sito si apre in quella lingua. Non contiene nient’altro che un codice di lingua.',
    cookiesBody3:
      'La memoria locale del tuo browser conserva le tue preferenze di suono, di tema e di «istruzioni già viste». Quei dati restano sul tuo dispositivo e non ci vengono inviati.',
    cookiesBody4: 'Non usiamo analitica, pubblicità né tracciamento di terze parti.',

    processorsHeading: 'Chi tratta questi dati',
    processorSupabaseLabel: 'Supabase',
    processorSupabaseBody: 'ospita il database e gestisce l’accesso.',
    processorResendLabel: 'Resend',
    processorResendBody: 'ci consegna le email delle segnalazioni.',
    processorGoogleLabel: 'Google',
    processorGoogleBody: 'solo se usi l’accesso con Google.',
    processorHosting: 'Il fornitore di hosting che serve il sito.',
    processorsTransport: 'I dati viaggiano su HTTPS.',

    retentionHeading: 'Per quanto tempo li conserviamo',
    retentionBody1: 'Conserviamo i tuoi dati finché esiste il tuo account.',
    retentionBody2:
      'Quando cancelli il tuo account, il tuo profilo, le tue partite, i tuoi progressi e le tue voci nelle classifiche vengono cancellati subito. Le segnalazioni che hai inviato restano, ma in forma anonima, perché il riferimento al tuo account viene rimosso.',

    choicesHeading: 'Le tue scelte',
    choicesEdit: 'Modifica il tuo profilo e le tue impostazioni di visibilità su {link}.',
    choicesDownload: 'Scarica una copia dei tuoi dati dalla stessa pagina.',
    choicesDelete: 'Cancella il tuo account dalla stessa pagina.',
    choicesEmail: 'Oppure scrivici a {email} e ti aiutiamo.',

    childrenHeading: 'Minori e studenti',
    childrenBody1:
      'ChemGames è pensato per la scuola secondaria, quindi raccogliamo il minimo necessario per far funzionare i giochi e per conservare i punteggi.',
    childrenBody2:
      'Non serve nessun nome vero. Gli alias sono generati automaticamente, non contengono nessun nome vero e si possono cambiare su {link}.',
    childrenBody3:
      'Genitori, tutori legali e chi insegna possono scriverci a {email} per chiedere che l’account e i dati di uno studente vengano cancellati.',

    legalHeading: 'Note legali',
    legalBody1:
      'Trattiamo i dati personali in conformità con il Privacy Act 1988 australiano e con gli Australian Privacy Principles.',
    legalBody2:
      'Se hai un reclamo, contattaci prima. Se la nostra risposta non ti soddisfa, puoi rivolgerti all’Office of the Australian Information Commissioner su {link}.',

    changesHeading: 'Modifiche a questa pagina',
    changesBody:
      'Se le nostre pratiche cambiano, aggiorneremo questa pagina e la data di entrata in vigore in alto.',
  },

  cheatSheetCategories: {
    Fundamentals: 'Fondamenti',
    Reactions: 'Reazioni',
    'Acids & Bases': 'Acidi e basi',
    Equations: 'Equazioni',
    Thermodynamics: 'Termodinamica',
    Organic: 'Chimica organica',
    Bonding: 'Legami',
    Nomenclature: 'Nomenclatura',
    Stoichiometry: 'Stechiometria',
  },

  yearLevels: {
    // The stored value stays the English "Year 9"; only the label is Italian.
    // Mapped by age: Year 7 = 1ª media, Year 8 = 2ª media, Year 9 = 3ª media,
    // Year 10 = 1º superiore, Senior = Triennio. The ordinal indicators
    // (ª U+00AA, º U+00BA) are one character each and need no superscript font
    // in a pill — the same reasoning French used for 3e and Spanish for 3º.
    all: 'Tutte',
    'Year 7': '1ª media',
    'Year 8': '2ª media',
    'Year 9': '3ª media',
    'Year 10': '1º superiore',
    Senior: 'Triennio',
  },

  leaderboards: {
    heading: 'Classifiche',
    intro: 'Confronta i migliori punteggi di tutti gli esperimenti.',
    topScientists: 'Migliori punteggi',
    globalNetwork: 'Rete mondiale',
    emptyTitle: 'Il podio è ancora libero.',
    emptyBody: 'Gioca la prima partita e prenditi il primo posto.',
    rank: 'Posizione',
    rankA11y: 'Posizione',
    points: 'Punti',
    recorded: 'Registrato il {date}',
    myResults: 'I miei risultati di laboratorio',
    highScore: 'Miglior punteggio',
    unranked: 'Non in classifica',
    // "Pronto per il tuo primo risultato?" would have to agree with the reader,
    // so the question becomes a statement about the result instead.
    firstResultTitle: 'Il tuo primo risultato ti aspetta.',
    firstResultBody: 'Gioca una partita e segna un punteggio.',
    noData: 'Non è stato ancora sintetizzato niente. Comincia tu!',
  },

  feedback: {
    openA11y: 'Apri il menu delle segnalazioni',
    trigger: 'Segnalazioni',
    heading: 'Segnalazioni su ChemGames',
    closeA11y: 'Chiudi le segnalazioni',
    sentTitle: 'Segnalazione inviata!',
    sentBody: 'Grazie per averci aiutato a migliorare ChemGames.',
    categoryBug: 'Problema',
    categoryChemistry: 'Dati',
    categoryFeature: 'Idea',
    placeholderBug: 'Che cosa non ha funzionato in questa pagina?',
    placeholderChemistry: 'Hai visto una valenza o una formula che non torna?',
    placeholderFeature: 'Che cosa renderebbe migliore questo gioco?',
    submit: 'Invia',
    submitting: 'Invio…',
    genericError: 'Non siamo riusciti a inviare la segnalazione.',
  },

  settings: {
    gameTitle: 'Impostazioni del gioco',
    globalTitle: 'Impostazioni',
    closeA11y: 'Chiudi le impostazioni',
    support: 'Supporto',
    appearance: 'Aspetto',
    thisGame: 'Questo gioco',
    allGamesDefault: 'Valore predefinito per tutti i giochi',
    allGames: 'Tutti i giochi',
    useGlobal: 'Valore predefinito',
    dark: 'Scuro',
    light: 'Chiaro',
    overrideHelp:
      'La scelta fatta per un singolo gioco ha la precedenza sul valore predefinito di tutti i giochi. Scegli «Valore predefinito» per tornare a seguirlo.',
    audio: 'Audio',
    soundEffects: 'Effetti sonori',
    volumeA11y: 'Volume del suono',
  },

  cheatSheets: {
    heading: 'I bigini del laboratorio',
    intro:
      'Formule chimiche, regole delle reazioni ed equazioni in breve, raggruppate per classe.',
    backToList: 'Torna ai bigini',
    count: { one: '{count} argomento', other: '{count} argomenti' },
    exampleFormula: 'Formula di esempio',
    // Italian punctuates a colon exactly as English does — no space before it —
    // so this string is identical to the English and is allowlisted. The key
    // exists only because French needs a no-break space here.
    exampleLabel: '{name}:',
    readReference: 'Consulta',
    practiseThis: 'Esercitati',
    keyConcepts: 'L’essenziale',
    exampleFormulas: 'Formule e reazioni di esempio',
    lookupTables: 'Tabelle di consultazione',
    goingDeeper: 'Per approfondire',
    watchOutFor: 'Errori frequenti',
    learnMore: 'Scopri di più',
    // Headless relatives rather than *gli studenti* / *gli insegnanti*, which
    // would default to masculine. This is Italian's own device, and it is
    // shorter than the collective nouns Spanish had to use.
    forStudents: 'Per chi studia',
    forTeachers: 'Per chi insegna',
    curriculum: 'Programma: ',
    filterA11y: 'Filtra gli argomenti per classe',
  },

  chemistry: {
    acid: 'Acido',
    base: 'Base',
    neutral: 'Neutro',
    amphoteric: 'Anfotero',
    basicAlkaline: 'Basico / alcalino',
  },

  games: {
    shared: {
      progress: 'Avanzamento',
      level: 'Livello',
      score: 'Punti',
      levelValue: 'Livello {level}',
      scoreValue: 'Punti: {score}',
      lives: 'VITE: {lives}/{max}',
      exit: 'Esci',
      exitA11y: 'Esci dalla partita',
      // "indizio", and unlike French this needed no fight: Italian's word for a
      // formula subscript is *pedice*, so there is no collision to dodge.
      hintA11y: 'Vedi un indizio',
      howToPlay: 'Come si gioca',
      closeInstructionsA11y: 'Chiudi le istruzioni',
      settings: 'Impostazioni',
      pause: 'Metti in pausa',
      resume: 'Riprendi la partita',
      gotIt: 'HO CAPITO',
      hint: 'Indizio',
      find: 'Cerca:',
      reactionError: 'Errore di reazione',
      labHint: 'Indizio del laboratorio',
      dismissFeedbackA11y: 'Chiudi il messaggio',
      dismissHintA11y: 'Chiudi l’indizio',
      finalScore: 'Punteggio finale:',
      finalScoreA11y: 'Punteggio finale: {score}',
      levelProgressA11y: 'Avanzamento: livello {level} di {max}',
      keyboardAndMouse: 'Tastiera e mouse',
      touchscreen: 'Schermo touch',
    },

    overlay: {
      pausedBadge: 'Partita in attesa',
      pausedTitle: 'Gioco in pausa',
      pausedSubtitle: 'Fai una pausa dal laboratorio.',
      pausedDescription: 'Il tuo esperimento è congelato esattamente dove l’hai lasciato.',
      failedBadge: 'Esperimento finito',
      failedTitle: 'Partita finita',
      failedSubtitle: 'La tua reazione si è spenta!',
      failedDescription: 'Ripassa le formule e riprova.',
      victoryBadge: 'Tutti gli obiettivi raggiunti',
      victoryTitle: 'Ricerca completata',
      victorySubtitle: 'Laboratorio conquistato!',
      victoryDescription: 'Ottimo lavoro! Hai superato tutti i livelli.',
      levelUpBadge: 'Obiettivo raggiunto',
      levelUpTitle: 'Livello superato',
      levelUpSubtitle: 'Serie completata!',
      // "Pronto per…?" would have to agree with the reader; the first person
      // plural sidesteps it and keeps the encouraging tone.
      levelUpDescription: 'Andiamo avanti con prove più difficili?',
      timeoutDescription: 'Il tempo è finito prima di raggiungere l’obiettivo.',
      statLevel: 'Livello',
      statScore: 'Punti',
      statRound: 'Turno',
      // An Italian adjective agrees with its count, and these are flat strings
      // rather than plural records — so "1 corrette" would be wrong and the
      // shape cannot be changed to fix it (dictionary.test.ts requires that
      // whether a string is count-dependent matches the English in both
      // directions). The colon label is invariant, and it is the same device
      // the article problem already needs everywhere else.
      statRoundValue: 'risposte esatte: {count}',
      levelOfMax: 'Livello {level} di {max} • risposte esatte: {correct}',
      levelUpProgress: 'Livello {level} → {next} • classificate: {correct}',
      resume: 'Riprendi la partita',
      beginLevel: 'Comincia il livello {level}',
      tryAgain: 'Riprova',
      quitToHub: 'Torna ai giochi',
      keyHintResume: 'Premi Esc, Spazio o Invio per continuare',
      keyHintRetry: 'Premi Spazio o Invio per riprovare',
    },

    acidClassification: {
      subtitle: 'CLASSIFICA LA MOLECOLA',
      task: 'Acido, base o neutro?',
      progress: '{correct} / {quota} classificate',
      arenaHeading: 'Classifica il composto',
      registryError: 'Errore: registro dei composti non trovato.',
      instructionsTitle: 'Come si gioca: Acido o base?',
      instructionsSubtitle: 'Analizza la formula chimica e scopri le sue proprietà!',
      stepIdentifyLabel: 'Identifica:',
      stepIdentifyText: 'Guarda il composto che compare nella bolla centrale.',
      stepClassifyLabel: 'Classifica:',
      stepClassifyText: 'Scegli se la sostanza è acida, basica, neutra o anfotera.',
      stepHintLabel: 'Ti serve un indizio?',
      stepHintText: 'Premi la lampadina in alto per vedere il nome chimico.',
      stepCarefulLabel: 'Attenzione:',
      stepCarefulText: 'Al terzo errore il becher si rompe!',
    },

    formulaBlaster: {
      subtitle: 'MOLECOLA BERSAGLIO',
      progress: 'Bersaglio {phase}/3 • Centri: {hits}/{quota}',
      hintHeading: 'Indizio sulla molecola bersaglio',
      instructionsTitle: 'Come si gioca: Rompiformule',
      instructionsIntro:
        'Trova le bolle che corrispondono alla molecola bersaglio in alto e falle scoppiare.',
      instructionsBullet1:
        'Premi la formula giusta per aggiungere un centro al bersaglio attuale.',
      instructionsBullet2:
        'Usa la lampadina in alto se ti serve un indizio sulla composizione.',
      instructionsBullet3:
        'Se tocchi una molecola sbagliata, ti diciamo quale elemento cercare invece.',
      /** Feedback templates. {compound}/{element} are localized names; {formula}/{symbol} never are. */
      // Every one of these is written so no article ever has to precede a name
      // placeholder: Italian would need "il metano" but "l’acqua" and "lo
      // zolfo", and "di il" must contract to "del", "dello" or "dell’".
      hintTemplate: '{compound} – elementi: {elements}.',
      wrongPick: 'Non è quella: {compound} ({formula}).',
      wrongPickLookFor:
        'Non è quella: {compound} ({formula}). Cerca gli atomi di questo elemento: {element} ({symbol}).',
      wrongPickCheckCounts:
        'Non è quella: {compound} ({formula}). Conta gli atomi del bersaglio: {target}.',
    },

    neutralise: {
      subtitleFull: 'OBIETTIVO: neutralizza gli acidi con OH⁻ e le basi con H⁺',
      subtitleShort: 'NEUTRALIZZA',
      progressFull: 'Ondata {wave}/3 | Eliminate {cleared}/{total}',
      progressShort: 'Ondata {wave}/3',
      fire: 'Spara',
      fireA11y: 'Spara',
      switchIonA11yAcid: 'Cambia ione, ora H+ (acido)',
      switchIonA11yBase: 'Cambia ione, ora OH- (base)',
      instructionsTitle: 'Come si gioca: Neutralizza!',
      instructionsIntro: 'Difendi il laboratorio dalle sostanze pericolose in arrivo!',
      keyOneLabel: '1',
      keyOneText: 'Carica {ion} per neutralizzare le basi.',
      keyOneIon: 'H⁺ (acido)',
      keyTwoLabel: '2',
      keyTwoText: 'Carica {ion} per neutralizzare gli acidi.',
      keyTwoIon: 'OH⁻ (base)',
      keySpaceLabel: 'Spazio',
      keySpaceText: 'Spara con il cannone ionico! (Oppure premi sull’arena.)',
      keyArrowsLabel: '←/→',
      keyArrowsText: 'Muovi il cannone (o muovi il mouse).',
      touchDragLabel: 'Trascina',
      touchDragText: 'Fai scorrere il dito sull’arena per puntare il cannone.',
      touchFireLabel: 'Spara',
      touchFireText: 'Tocca il pulsante {button} sotto l’arena.',
      touchSwitchLabel: 'Cambia',
      touchSwitchText: 'Tocca il pulsante dello ione per passare da H⁺ a OH⁻.',
    },
  },
} satisfies Dictionary;

export default it;
