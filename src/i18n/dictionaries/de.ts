// src/i18n/dictionaries/de.ts
//
// German (de). Register and terminology decisions:
//
//  - Address the reader with informal "du" throughout. This is the normal
//    register for German educational software aimed at 14–16 year olds; "Sie"
//    would read as a bank letter.
//  - Chemistry terms follow German school curriculum usage, not literal
//    translation. Every term is fixed in docs/i18n/glossary-de.md; where German
//    school practice offers more than one accepted word (Atombindung vs.
//    kovalente Bindung, Edukte vs. Ausgangsstoffe) the glossary records which
//    one was picked and why.
//  - Chemical formulae, element symbols, state symbols and IUPAC notation are
//    never translated. Element and compound *names* are, in
//    src/i18n/chemistry-names/de.ts.
//  - German typography: „…“ for quotations, – (en dash) for parenthetical
//    dashes, … for ellipsis, and a narrow no-break space ( ) in "z. B."
//    and before units so they never wrap.
//  - German runs roughly 30% longer than English. Where a string sits in a
//    fixed-width control (header badges, footer buttons, category pills) the
//    translation is deliberately shorter than a faithful rendering would be;
//    those entries are flagged in docs/i18n/de-review.md.

import type { Dictionary } from './en';

export const de = {
  meta: {
    siteName: 'ChemGames',
    title: 'ChemGames | Chemie interaktiv lernen',
    description:
      'Chemie verstehen durch Spielen: visuelle, interaktive Minispiele und Nachschlagehilfen.',
    keywords: [
      'Chemie',
      'Schule',
      'Lernspiele',
      'Moleküle',
      'Reaktionen',
      'Titration',
      'Chemie Klasse 9',
    ],
    privacyTitle: 'Datenschutz | ChemGames',
    privacyDescription:
      'Was ChemGames über dich speichert, was öffentlich ist, wer die Daten verarbeitet und wie du sie herunterlädst oder löschst.',
    cheatSheetTitle: 'Spickzettel {title} | ChemGames',
    cheatSheetNotFound: 'Thema nicht gefunden – ChemGames',
  },

  common: {
    backToDashboard: 'Zurück zur Übersicht',
    dashboard: 'Übersicht',
    playNow: 'Jetzt spielen',
    cancel: 'Abbrechen',
    opensInNewTab: '(öffnet in einem neuen Tab)',
    loading: 'Wird geladen …',
  },

  language: {
    /** Labels the switcher; visible in the settings panel, sr-only in the nav. */
    label: 'Sprache',
  },

  nav: {
    sectionsA11y: 'Bereiche der Übersicht',
    profile: 'Profil',
    leaderboards: 'Bestenlisten',
    games: 'Spiele',
    cheatSheets: 'Spickzettel',
    // Deliberately shorter than the English "Log in / Register": the German
    // pair runs 215px against 150px and was the single widest thing in the
    // header. The sign-in page itself offers both actions, so the nav button
    // only has to get the reader there.
    login: 'Anmelden',
    logout: 'Abmelden',
    loggingOut: 'Wird abgemeldet …',
    settingsA11y: 'Allgemeine Einstellungen öffnen',
  },

  footer: {
    tagline: 'ChemGames – Chemie sichtbar, spielerisch und verständlich.',
    copyright: '© {year} ChemGames. Alle Rechte vorbehalten.',
    privacy: 'Datenschutz',
  },

  home: {
    eyebrow: 'Interaktives Chemielabor',
    heading: 'Lerne Chemie beim Spielen.',
    intro:
      'Erkunde interaktive Experimente, verfolge deine persönlichen Bestwerte, beherrsche Formeln und vergleiche deine Laborergebnisse mit anderen.',
    exploreGames: 'Spiele entdecken',
    viewLeaderboards: 'Bestenlisten ansehen',
    profileHeading: 'Profil',
    profileDescription: 'Deine Laboridentität und dein persönlicher Forschungsfortschritt.',
    profileLinkAuthenticated: 'Profil öffnen',
    profileLinkAnonymous: 'Anmelden und Fortschritt speichern',
    leaderboardsHeading: 'Bestenlisten',
    leaderboardsDescription: 'Die besten Forschenden aus allen interaktiven Chemie-Experimenten.',
    leaderboardsLink: 'Alle Bestenlisten öffnen',
    gamesHeading: 'Interaktive Minispiele',
    gamesDescription: 'Wähle ein Experiment und meistere chemische Reaktionen und Formeln.',
    gamesLink: 'Alle Spiele ansehen',
    emptyProfileAuthenticatedTitle: 'Profil wird noch eingerichtet',
    emptyProfileAuthenticatedBody:
      'Dein Profil ist verfügbar, sobald die Profil-Migration der Datenbank gelaufen ist.',
    emptyProfileAnonymousTitle: 'Hier beginnt dein Profil',
    emptyProfileAnonymousBody:
      'Melde dich an, um deinen Fortschritt zu speichern, deine Labornotizen zu verwalten und dein Forschungsprofil aufzubauen.',
    emptyProfileCta: 'Anmelden / Registrieren',
    teaserAcidDetail: 'Stoffe und pH-Werte einordnen',
    teaserBlasterDetail: 'Verbindungen zerplatzen lassen, Ionen ausgleichen',
    teaserNeutraliseDetail: 'Schütze das Labor vor außer Kontrolle geratenen Reaktionen',
  },

  gamesHub: {
    heading: 'Spiele',
    intro: 'Wähle ein Experiment, um zu starten.',
    playNow: 'Jetzt spielen →',
    acidTitle: 'Säure oder Base?',
    acidDescription: 'Ordne Stoffe nach ihren Eigenschaften ein.',
    blasterTitle: 'Formel-Blaster',
    blasterDescription: 'Lass die gesuchten Verbindungen zerplatzen, bevor sie entkommen.',
    neutraliseTitle: 'Neutralisieren!',
    neutraliseDescription: 'Verteidige das Labor gegen Molekül-Invasoren.',
    balancerTitle: 'Reaktions-Balancer',
    balancerDescription: 'Bring die Atome auf beiden Seiten des Pfeils ins Gleichgewicht.',
    lewisTitle: 'Teilen bis voll',
    lewisDescription: 'Bring die Einzelgänger zusammen und baue ein Molekül.',
    bondsTitle: 'Chemische Bindungen',
    bondsDescription: 'Erkunde Molekülstrukturen und Bindungen zwischen Atomen.',
  },

  auth: {
    backToGames: '← Zurück zu den Spielen',
    loginTitle: 'Willkommen zurück',
    loginSubtitle: 'Mach dort weiter, wo deine Experimente aufgehört haben.',
    registerTitle: 'Bei ChemGames mitmachen',
    registerSubtitle: 'Erstelle ein Konto, um deinen Fortschritt zu speichern.',
    continueWithGoogle: 'Weiter mit Google',
    or: 'oder',
    email: 'E-Mail',
    emailPlaceholder: 'du@beispiel.de',
    password: 'Passwort',
    passwordPlaceholder: 'Mindestens 6 Zeichen',
    loginAction: 'Anmelden',
    registerAction: 'Konto erstellen',
    switchToRegisterPrompt: 'Neu bei ChemGames?',
    switchToRegisterAction: 'Registrieren',
    switchToLoginPrompt: 'Du hast schon ein Konto?',
    switchToLoginAction: 'Anmelden',
    checkInbox: 'Schau in dein Postfach, um dein ChemGames-Konto zu aktivieren.',
    unconfiguredClient: 'Die Anmeldung ist zurzeit nicht konfiguriert.',
    unconfiguredNotice:
      'Für die Anmeldung werden Supabase-Zugangsdaten benötigt. Kopiere .env.example nach .env.local und trage die Werte ein.',
    errorVerification: 'Dieser Link konnte nicht überprüft werden. Bitte versuche es noch einmal.',
    errorConfiguration: 'Die Anmeldung ist noch nicht eingerichtet.',
  },

  profile: {
    heading: 'Forschungsübersicht',
    subheading: 'Laboridentität und öffentliche Erfolge',
    edit: 'Profil bearbeiten',
    missingTitle: 'Laborprofil nicht gefunden',
    missingBody:
      'Wir konnten deinen Forschungsdatensatz nicht laden. Bitte melde dich erneut an oder richte dein Profil ein.',
    missingAction: 'Zurück zur Anmeldung',
    editMissingTitle: 'Labor-Datensatz nicht gefunden',
    editMissingBody:
      'Wir konnten deine Profileinstellungen nicht laden. Bitte melde dich erneut an.',
    defaultTitle: 'Registriert im Labor',
    labMember: 'Labormitglied',
    labNotes: 'Labornotizen',
    labNotesEmpty: 'Hier wird gerade still beobachtet – noch keine Labornotizen.',
    favouriteCompound: 'Lieblingsverbindung',
    achievements: 'Erfolge',
    statExperiments: 'Experimente',
    statLevel: 'Klasse',
    statStreak: 'Tage in Folge',
    statAccuracy: 'Trefferquote',

    editHeading: 'Ausrüstung einstellen',
    editIntro:
      'Passe deine Laboreinstellungen an und lege fest, welche Statistiken öffentlich sichtbar sind.',
    identityHeading: 'Forschungsidentität',
    alias: 'Alias',
    aliasPlaceholder: 'z. B. Neugieriges Argon 4821',
    aliasHelp:
      'Wird öffentlich auf den Bestenlisten angezeigt. Wähle einen Spitznamen, nicht deinen echten Namen oder deine E-Mail-Adresse.',
    customTitle: 'Eigener Titel',
    customTitlePlaceholder: 'z. B. Laborleitung',
    country: 'Land / Region',
    countryPlaceholder: 'z. B. Australien',
    academicLevel: 'Klassenstufe',
    academicLevelPlaceholder: 'Wähle deine Klassenstufe …',
    labNotesField: 'Labornotizen (Über mich)',
    visibilityHeading: 'Sichtbarkeit der Spielstatistiken',
    save: 'Änderungen speichern',
    saving: 'Wird gespeichert …',

    dataHeading: 'Deine Daten',
    dataIntro:
      'Lade eine Kopie der Daten herunter, die ChemGames über dich speichert, oder lösche dein Konto.',
    exportHeading: 'Meine Daten herunterladen',
    exportBody:
      'Eine JSON-Datei mit deinen Kontodaten, deinem Profil, deinen Spielsitzungen und deinem Fortschritt.',
    exportAction: 'Meine Daten herunterladen',
    deleteHeading: 'Konto löschen',
    deleteBody:
      'Damit werden dein Konto, dein Profil, deine Punkte, dein Fortschritt und deine Einträge in den Bestenlisten sofort und dauerhaft gelöscht. Das lässt sich nicht rückgängig machen.',
    // {word} is the literal confirmation word the server action compares
    // against. It stays untranslated on purpose — see docs/i18n/README.md.
    deleteConfirmLabel: 'Gib {word} ein, um zu bestätigen',
    deleteAction: 'Mein Konto löschen',
    deletePending: 'Wird gelöscht …',
  },

  profileToggles: {
    showCountry: 'Land im Profil anzeigen',
    showYearLevel: 'Klassenstufe öffentlich zeigen',
    showLabNotes: 'Labornotizen öffentlich zeigen',
    showTotalSyntheses: 'Anzahl der Synthesen anzeigen',
    showAccuracy: 'Trefferquote in Prozent anzeigen',
    showCurrentStreak: 'Tagesserie anzeigen',
  },

  serverMessages: {
    profileUnconfigured: 'Die Datenbankverbindung ist zurzeit nicht konfiguriert.',
    profileLoginRequired: 'Bitte melde dich an, bevor du deine Einstellungen änderst.',
    profileSaveFailed:
      'Die Laboreinstellungen konnten nicht gespeichert werden. Bitte versuche es noch einmal.',
    profileSaved: 'Einstellungen erfolgreich gespeichert!',
    profileUnexpected: 'Beim Speichern ist ein unerwarteter Fehler aufgetreten.',
    aliasLength: 'Dein Alias muss zwischen {min} und {max} Zeichen lang sein.',
    aliasAtSign:
      'Dein Alias darf kein @-Zeichen enthalten. Bitte wähle einen Spitznamen, keine E-Mail-Adresse.',
    yearLevelInvalid: 'Bitte wähle eine Klassenstufe aus der Liste.',

    deleteConfirmRequired: 'Gib {word} ein, um zu bestätigen, dass du dein Konto löschen willst.',
    deleteUnavailable:
      'Das Löschen des Kontos ist zurzeit nicht möglich. Bitte versuche es später noch einmal.',
    deleteLoginRequired: 'Bitte melde dich erneut an, bevor du dein Konto löschst.',
    deleteFailed:
      'Wir konnten dein Konto nicht löschen. Bitte versuche es später noch einmal.',

    exportUnavailable: 'Der Datenexport ist zurzeit nicht verfügbar.',
    exportLoginRequired: 'Du musst angemeldet sein, um deine Daten herunterzuladen.',
    exportFailed:
      'Wir konnten deinen Datenexport nicht vorbereiten. Bitte versuche es später noch einmal.',

    feedbackCategoryAndMessage: 'Bitte wähle eine Kategorie und schreib eine Nachricht.',
    feedbackCategoryInvalid: 'Bitte wähle eine gültige Feedback-Kategorie.',
    feedbackMessageRequired: 'Bitte schreib eine Nachricht.',
    feedbackMessageTooLong: 'Die Nachricht ist zu lang (höchstens {max} Zeichen).',
    feedbackRateLimited: 'Zu viele Einsendungen. Bitte versuche es später noch einmal.',
    feedbackUnconfigured: 'Der Feedback-Dienst ist in dieser Umgebung nicht konfiguriert.',
    feedbackStoreFailed:
      'Dein Feedback konnte gerade nicht gespeichert werden. Bitte versuche es später noch einmal.',
    feedbackEmailFailed:
      'Dein Feedback konnte gerade nicht zugestellt werden. Bitte versuche es später noch einmal.',
    feedbackUnexpected: 'Beim Verarbeiten des Feedbacks ist ein unerwarteter Fehler aufgetreten.',
  },

  privacy: {
    heading: 'Datenschutz',
    intro:
      'Was ChemGames über dich speichert, wer es sehen kann und wie du es herunterlädst oder löschst.',
    effectiveDate: 'Gültig ab: {date}.',

    whoWeAreHeading: 'Wer wir sind',
    whoWeAreBody:
      'ChemGames wird von Stella Slad betrieben. Sie ist für die auf dieser Seite beschriebenen Daten verantwortlich. Du erreichst uns unter {email}.',

    collectHeading: 'Was wir erheben',
    collectAccountLabel: 'Konto.',
    collectAccountBody:
      'Deine E-Mail-Adresse und einen Passwort-Hash, gespeichert von Supabase Auth. Wenn du dich mit Google anmeldest, erhalten wir statt eines Passworts deinen Google-Kontonamen, deine E-Mail-Adresse und die URL deines Profilbilds.',
    collectProfileLabel: 'Profil.',
    collectProfileBody:
      'Einen Alias sowie optionale Angaben, die du selbst ausfüllen kannst: einen Titel, dein Land, deine Klassenstufe, Labornotizen, ein Lieblingselement und eine Lieblingsverbindung sowie alle Abzeichen, die du sammelst. Außerdem speichern wir deine Sichtbarkeitsschalter, die festlegen, was andere sehen können. Aliasse werden für dich erzeugt und enthalten keinen echten Namen. Du kannst deinen unter {link} ändern.',
    collectGameplayLabel: 'Spielverlauf.',
    collectGameplayBody:
      'Jedes Mal, wenn du ein Spiel beendest, speichern wir, welches Spiel es war, deine Punktzahl, das erreichte Level, das Ergebnis, wie lange du gespielt hast und wann. Daraus behalten wir deinen besten Wert und dein höchstes Level je Spiel sowie abgeleitete Statistiken in deinem Profil, etwa deine Serie und deine Trefferquote.',
    collectFeedbackLabel: 'Feedback.',
    collectFeedbackBody:
      'Wenn du die Feedback-Schaltfläche nutzt, speichern wir die Kategorie, deine Nachricht und die Seite, auf der du warst. Außerdem speichern wir deine Konto-ID, falls du angemeldet bist, und eine gehashte, nicht umkehrbare Kennung, die nur dazu dient, Missbrauch zu begrenzen.',

    publicHeading: 'Was öffentlich ist',
    publicBody1:
      'Dein Alias und dein bester Wert je Spiel erscheinen auf den öffentlichen Bestenlisten, die alle sehen können.',
    publicBody2:
      'Andere Profilangaben wie dein Land, deine Klassenstufe, deine Labornotizen und deine Spielstatistiken werden nur angezeigt, wenn du den passenden Schalter unter {link} einschaltest. Außer dem Beitrittsdatum sind alle Schalter standardmäßig aus. Dein Titel, dein Lieblingselement, deine Lieblingsverbindung und deine Abzeichen werden immer zusammen mit deinem Alias angezeigt.',

    cookiesHeading: 'Cookies und lokaler Speicher',
    cookiesBody1:
      'Beim Anmelden werden Sitzungs-Cookies von Supabase gesetzt. Sie sind unbedingt erforderlich, damit du angemeldet bleibst.',
    cookiesBody2:
      'Außerdem setzen wir ein Einstellungs-Cookie, das sich die von dir gewählte Sprache merkt, damit die Seite beim nächsten Mal in dieser Sprache öffnet. Es enthält nichts außer einem Sprachkürzel.',
    cookiesBody3:
      'Im lokalen Speicher deines Browsers liegen deine Einstellungen für Ton, Design und „Anleitung gesehen“. Diese Daten bleiben auf deinem Gerät und werden nicht an uns gesendet.',
    cookiesBody4: 'Wir nutzen keine Analyse-, Werbe- oder Tracking-Dienste von Dritten.',

    processorsHeading: 'Wer die Daten verarbeitet',
    processorSupabaseLabel: 'Supabase',
    processorSupabaseBody: 'betreibt die Datenbank und wickelt die Anmeldung ab.',
    processorResendLabel: 'Resend',
    processorResendBody: 'stellt uns die Feedback-E-Mails zu.',
    processorGoogleLabel: 'Google',
    processorGoogleBody: 'nur, wenn du die Google-Anmeldung nutzt.',
    processorHosting: 'Der Hosting-Anbieter, der die Seite ausliefert.',
    processorsTransport: 'Die Daten werden über HTTPS übertragen.',

    retentionHeading: 'Wie lange wir die Daten speichern',
    retentionBody1: 'Wir speichern deine Daten, solange dein Konto besteht.',
    retentionBody2:
      'Wenn du dein Konto löschst, werden dein Profil, deine Spielsitzungen, dein Fortschritt und deine Einträge in den Bestenlisten sofort gelöscht. Gesendetes Feedback bleibt erhalten, wird aber anonymisiert, weil der Bezug zu deinem Konto entfernt wird.',

    choicesHeading: 'Deine Möglichkeiten',
    choicesEdit: 'Bearbeite dein Profil und deine Sichtbarkeitsschalter unter {link}.',
    choicesDownload: 'Lade auf derselben Seite eine Kopie deiner Daten herunter.',
    choicesDelete: 'Lösche dein Konto auf derselben Seite.',
    choicesEmail: 'Oder schreib uns an {email}, dann helfen wir dir.',

    childrenHeading: 'Kinder und Jugendliche',
    childrenBody1:
      'ChemGames ist für die Sekundarstufe gemacht. Deshalb erheben wir nur das Nötigste, um die Spiele zu betreiben und Punkte zu speichern.',
    childrenBody2:
      'Ein echter Name ist nicht erforderlich. Aliasse werden für dich erzeugt, enthalten keinen echten Namen und lassen sich unter {link} ändern.',
    childrenBody3:
      'Eltern, Erziehungsberechtigte oder Lehrkräfte können uns unter {email} schreiben, um das Konto und die Daten einer Schülerin oder eines Schülers löschen zu lassen.',

    legalHeading: 'Rechtliches',
    legalBody1:
      'Wir gehen mit personenbezogenen Daten im Einklang mit dem australischen Privacy Act 1988 und den Australian Privacy Principles um.',
    legalBody2:
      'Wenn du eine Beschwerde hast, wende dich bitte zuerst an uns. Bist du mit unserer Antwort nicht zufrieden, kannst du dich beim Office of the Australian Information Commissioner unter {link} beschweren.',

    changesHeading: 'Änderungen an dieser Seite',
    changesBody:
      'Wenn sich unsere Abläufe ändern, aktualisieren wir diese Seite und das Datum oben.',
  },

  cheatSheetCategories: {
    Fundamentals: 'Grundlagen',
    Reactions: 'Reaktionen',
    'Acids & Bases': 'Säuren und Basen',
    Equations: 'Gleichungen',
    Thermodynamics: 'Thermodynamik',
    Organic: 'Organische Chemie',
    Bonding: 'Bindungslehre',
    Nomenclature: 'Nomenklatur',
    Stoichiometry: 'Stöchiometrie',
  },

  yearLevels: {
    all: 'Alle',
    'Year 7': 'Klasse 7',
    'Year 8': 'Klasse 8',
    'Year 9': 'Klasse 9',
    'Year 10': 'Klasse 10',
    Senior: 'Oberstufe',
  },

  leaderboards: {
    heading: 'Bestenlisten',
    intro: 'Vergleiche die Highscores aus allen Experimenten.',
    topScientists: 'Beste Forschende',
    globalNetwork: 'Globales Netzwerk',
    emptyTitle: 'Das Podium wartet.',
    emptyBody: 'Spiel die erste Runde und sichere dir Platz 1.',
    rank: 'Platz',
    rankA11y: 'Platz',
    points: 'Punkte',
    recorded: 'Aufgezeichnet am {date}',
    myResults: 'Meine Laborergebnisse',
    highScore: 'Highscore',
    unranked: 'Ohne Platzierung',
    firstResultTitle: 'Bereit für dein erstes Ergebnis?',
    firstResultBody: 'Spiel eine Runde und setze einen Highscore.',
    noData: 'Noch nichts synthetisiert. Mach den Anfang!',
  },

  feedback: {
    openA11y: 'Feedback-Menü öffnen',
    trigger: 'Feedback',
    heading: 'ChemGames-Feedback',
    closeA11y: 'Feedback schließen',
    sentTitle: 'Feedback gesendet!',
    sentBody: 'Danke, dass du hilfst, ChemGames besser zu machen.',
    categoryBug: 'Fehler',
    categoryChemistry: 'Daten',
    categoryFeature: 'Idee',
    placeholderBug: 'Was ist auf dieser Seite schiefgelaufen?',
    placeholderChemistry: 'Stimmt eine Wertigkeit oder eine Formel nicht?',
    placeholderFeature: 'Welche Funktion würde dieses Spiel besser machen?',
    submit: 'Feedback senden',
    submitting: 'Wird gesendet …',
    genericError: 'Feedback konnte nicht gesendet werden.',
  },

  settings: {
    gameTitle: 'Spieleinstellungen',
    globalTitle: 'Einstellungen',
    closeA11y: 'Einstellungen schließen',
    support: 'Unterstützung',
    appearance: 'Darstellung',
    thisGame: 'Dieses Spiel',
    allGamesDefault: 'Standard für alle Spiele',
    allGames: 'Alle Spiele',
    useGlobal: 'Standard nutzen',
    dark: 'Dunkel',
    light: 'Hell',
    overrideHelp:
      'Eine Einstellung für ein einzelnes Spiel hat Vorrang vor dem Standard für alle Spiele. Wähle „Standard nutzen“, um wieder dem Standard zu folgen.',
    audio: 'Audio',
    soundEffects: 'Soundeffekte',
    volumeA11y: 'Lautstärke',
  },

  cheatSheets: {
    heading: 'Spickzettel fürs Labor',
    intro:
      'Kurze Übersichten zu chemischen Formeln, Reaktionsregeln und Gleichungen – nach Klassenstufe sortiert.',
    backToList: 'Zurück zu den Spickzetteln',
    count: { one: '{count} Thema', other: '{count} Themen' },
    exampleFormula: 'Beispielformel',
    readReference: 'Nachschlagen',
    practiseThis: 'Üben',
    keyConcepts: 'Das Wichtigste',
    exampleFormulas: 'Beispielformeln und Reaktionen',
    lookupTables: 'Nachschlagetabellen',
    goingDeeper: 'Mehr dazu',
    watchOutFor: 'Typische Fehler',
    learnMore: 'Weiterlernen',
    forStudents: 'Für Schülerinnen und Schüler',
    forTeachers: 'Für Lehrkräfte',
    curriculum: 'Lehrplan: ',
    filterA11y: 'Themen nach Klassenstufe filtern',
  },

  chemistry: {
    acid: 'Säure',
    base: 'Base',
    neutral: 'Neutral',
    amphoteric: 'Amphoter',
    basicAlkaline: 'Basisch / alkalisch',
  },

  games: {
    shared: {
      progress: 'Fortschritt',
      level: 'Level',
      score: 'Punkte',
      levelValue: 'Level {level}',
      scoreValue: 'Punkte {score}',
      lives: 'LEBEN: {lives}/{max}',
      exit: 'Beenden',
      exitA11y: 'Spielsitzung beenden',
      hintA11y: 'Tipp anzeigen',
      howToPlay: 'Spielanleitung',
      closeInstructionsA11y: 'Spielanleitung schließen',
      settings: 'Einstellungen',
      pause: 'Spiel pausieren',
      resume: 'Weiterspielen',
      gotIt: 'ALLES KLAR',
      hint: 'Tipp',
      find: 'Gesucht:',
      reactionError: 'Reaktionsfehler',
      labHint: 'Labor-Tipp',
      dismissFeedbackA11y: 'Hinweis schließen',
      dismissHintA11y: 'Tipp schließen',
      finalScore: 'Endpunktzahl:',
      finalScoreA11y: 'Endpunktzahl: {score}',
      levelProgressA11y: 'Fortschritt: Level {level} von {max}',
      keyboardAndMouse: 'Tastatur und Maus',
      touchscreen: 'Touchscreen',
    },

    overlay: {
      pausedBadge: 'Sitzung angehalten',
      pausedTitle: 'Spiel pausiert',
      pausedSubtitle: 'Mach eine kurze Laborpause.',
      pausedDescription: 'Dein Experiment ist genau dort eingefroren, wo du aufgehört hast.',
      failedBadge: 'Experiment beendet',
      failedTitle: 'Spiel vorbei',
      failedSubtitle: 'Deine Reaktion ist verpufft!',
      failedDescription: 'Schau dir die Formeln noch einmal an und starte einen neuen Versuch.',
      victoryBadge: 'Alle Ziele erreicht',
      victoryTitle: 'Forschung abgeschlossen',
      victorySubtitle: 'Labor gemeistert!',
      victoryDescription: 'Großartige Arbeit! Du hast alle Level geschafft.',
      levelUpBadge: 'Ziel erreicht',
      levelUpTitle: 'Level geschafft',
      levelUpSubtitle: 'Charge fertig!',
      levelUpDescription: 'Bereit für schwierigere Aufgaben?',
      timeoutDescription: 'Die Zeit war um, bevor das Ziel erreicht war.',
      statLevel: 'Level',
      statScore: 'Punkte',
      statRound: 'Runde',
      statRoundValue: '{count} richtig',
      levelOfMax: 'Level {level} von {max} • {correct} richtig',
      levelUpProgress: 'Level {level} → {next} • {correct} einsortiert',
      resume: 'Weiterspielen',
      beginLevel: 'Level {level} starten',
      tryAgain: 'Noch einmal',
      quitToHub: 'Zurück zur Übersicht',
      keyHintResume: 'Drücke Esc, Leertaste oder Enter, um weiterzumachen',
      keyHintRetry: 'Drücke Leertaste oder Enter für einen neuen Versuch',
    },

    acidClassification: {
      subtitle: 'MOLEKÜL EINORDNEN',
      task: 'Säure, Base oder neutral?',
      progress: '{correct} / {quota} einsortiert',
      arenaHeading: 'Verbindung einordnen',
      registryError: 'Fehler: Verbindungsregister nicht gefunden.',
      instructionsTitle: 'Spielanleitung: Chemie-Sortierer',
      instructionsSubtitle: 'Untersuche die chemische Formel und bestimme ihre Eigenschaften!',
      stepIdentifyLabel: 'Erkennen:',
      stepIdentifyText: 'Sieh dir die Verbindung in der mittleren Blase an.',
      stepClassifyLabel: 'Einordnen:',
      stepClassifyText: 'Wähle, ob der Stoff sauer, basisch, neutral oder amphoter ist.',
      stepHintLabel: 'Brauchst du einen Tipp?',
      stepHintText:
        'Klicke oben auf das Glühbirnen-Symbol, um den chemischen Namen anzuzeigen.',
      stepCarefulLabel: 'Achtung:',
      stepCarefulText: 'Nach 3 Fehlern zerbricht das Becherglas!',
    },

    formulaBlaster: {
      subtitle: 'ZIELMOLEKÜL',
      progress: 'Ziel {phase}/3 • Treffer: {hits}/{quota}',
      hintHeading: 'Tipp zum Zielmolekül',
      instructionsTitle: 'Spielanleitung: Formel-Blaster',
      instructionsIntro:
        'Finde die Blasen mit dem Zielmolekül aus der Kopfzeile und lass sie zerplatzen.',
      instructionsBullet1:
        'Klicke die richtige Formel an, um einen Treffer für das aktuelle Ziel zu sammeln.',
      instructionsBullet2:
        'Nutze die Glühbirne oben, wenn du einen Hinweis zur Zusammensetzung brauchst.',
      instructionsBullet3:
        'Wenn du ein falsches Molekül antippst, erfährst du, nach welchem Element du stattdessen suchen solltest.',
      hintTemplate: '{compound} besteht aus den Elementen: {elements}.',
      wrongPick: 'Das ist {compound} ({formula})!',
      wrongPickLookFor:
        'Das ist {compound} ({formula})! Suche stattdessen nach {element}-Atomen ({symbol}).',
      wrongPickCheckCounts:
        'Das ist {compound} ({formula})! Prüfe die Atomanzahl von {target}.',
    },

    neutralise: {
      subtitleFull: 'ZIEL: Neutralisiere Säuren mit OH⁻ und Basen mit H⁺',
      subtitleShort: 'NEUTRALISIEREN',
      progressFull: 'Welle {wave}/3 | Geschafft {cleared}/{total}',
      progressShort: 'Welle {wave}/3',
      fire: 'Feuern',
      fireA11y: 'Feuern',
      switchIonA11yAcid: 'Ion wechseln, aktuell H+ (Säure)',
      switchIonA11yBase: 'Ion wechseln, aktuell OH- (Base)',
      instructionsTitle: 'Spielanleitung: Neutralisieren!',
      instructionsIntro: 'Verteidige das Labor gegen anfliegende Gefahrstoffe!',
      keyOneLabel: '1',
      keyOneText: 'Lade {ion}, um Basen zu neutralisieren.',
      keyOneIon: 'H⁺ (Säure)',
      keyTwoLabel: '2',
      keyTwoText: 'Lade {ion}, um Säuren zu neutralisieren.',
      keyTwoIon: 'OH⁻ (Base)',
      keySpaceLabel: 'Leertaste',
      keySpaceText: 'Feuere deine Ionenkanone ab! (Oder klicke in die Arena.)',
      keyArrowsLabel: '←/→',
      keyArrowsText: 'Bewege die Kanone (oder bewege die Maus).',
      touchDragLabel: 'Ziehen',
      touchDragText: 'Streiche mit dem Finger über die Arena, um die Kanone auszurichten.',
      touchFireLabel: 'Feuern',
      touchFireText: 'Tippe unter der Arena auf die Schaltfläche {button}.',
      touchSwitchLabel: 'Wechseln',
      touchSwitchText:
        'Tippe auf die Ionen-Schaltfläche, um zwischen H⁺ und OH⁻ zu wechseln.',
    },

    /**
     * Reaktions-Balancer. Terminologie nach docs/i18n/glossary-de.md:
     * Koeffizient (nicht „Vorzahl“), Index (nicht „tiefgestellte Zahl“),
     * Edukte / Produkte, ausgleichen (nicht „einrichten“), Atombilanz.
     */
    reactionBalancer: {
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
    },

    /**
     * Teilen bis voll (Lewis-Formeln). „Einzelgänger“ ist das Spielwort für ein
     * ungepaartes Außenelektron – bewusst so umgangssprachlich wie das
     * englische „loner“, und im Glossar erklärt. Fachbegriffe sonst nach
     * docs/i18n/glossary-de.md: Lewis-Formel, freies Elektronenpaar,
     * bindendes Elektronenpaar, Atombindung, Oktettregel, Valenzelektronen.
     */
    lewisStructures: {
      header: {
        subtitle: 'Teilen bis voll',
        build: 'Bau: {name} ({formula})',
        inspect: 'Prüf nach: {name} ({formula})',
        progress: 'Molekül {round}/{total}',
        marking: 'Zeichnung {round}/{total}',
      },

      instructions: {
        title: 'Spielanleitung: Teilen bis voll',
        lead: 'Bring die Einzelgänger zu Paaren zusammen.',
        intro:
          'Jedes Atom bringt seine Außenelektronen als Punkte mit. Ein Punkt, der allein steht, ist ein Einzelgänger – er sucht einen Partner. Zwei Einzelgänger von zwei verschiedenen Atomen ergeben ein bindendes Elektronenpaar, also eine Bindung.',
        bullets: [
          'Zieh einen pulsierenden Punkt auf einen pulsierenden Punkt eines anderen Atoms (oder tippe erst den einen an, dann den anderen).',
          'Ein Atom ist voll, wenn 8 Punkte um es herum stehen – Wasserstoff ist schon bei 2 voll.',
          'Teilen sich dieselben zwei Atome zweimal, hast du eine Doppelbindung gebaut.',
          'Die Formel rastet von selbst ein, sobald jedes Atom voll ist und kein Einzelgänger mehr übrig ist. Du brauchst keinen Knopf.',
          'Du kommst nicht weiter? Drück auf die Glühbirne (oder H). Der erste Tipp ist immer umsonst.',
        ],
        disclaimer:
          'Die Punkte zeigen, wie viele Außenelektronen ein Atom hat – nicht, wo sie wirklich sind.',
        keyboard: [
          ['Tab', 'wählt ein Atom aus'],
          ['← →', 'gehen zu seinen Einzelgängern'],
          ['Enter', 'beginnt ein Paar; Tab + Enter auf einem anderen Atom macht es fertig'],
          ['Esc', 'bricht ab'],
          ['H', 'Tipp'],
          ['P', 'Pause'],
        ],
        touch: [
          ['Tippen', 'auf einen Einzelgänger, dann auf einen Einzelgänger eines anderen Atoms.'],
          ['Tippen', 'auf ein bindendes Elektronenpaar löst es wieder.'],
        ],
        glossaryTitle: 'Wörter, die im Spiel vorkommen',
      },

      guided: {
        stepLabel: 'Schritt {step} von {total}',
        h2: [
          'Zwei Wasserstoffatome. Jedes hat 1 Außenelektron – einen Einzelgänger. Zieh den einen auf den anderen.',
          'Jetzt teilen sie sich ein Paar. Zähl um jedes H herum: 2. Wasserstoff ist bei 2 voll – das ist eine Einfachbindung, H–H.',
        ],
        h2oStep1:
          'Sauerstoff hat 6 Außenelektronen: zwei Paare (die bleiben, wo sie sind) und zwei Einzelgänger (die pulsieren).',
        h2oStep2: 'Bring einen Einzelgänger des Sauerstoffs mit einem Einzelgänger des Wasserstoffs zusammen.',
        h2oStep2After: 'Um den Sauerstoff stehen jetzt 7 – eines fehlt noch.',
        h2oStep3: 'Bring den anderen Einzelgänger des Sauerstoffs mit dem anderen Wasserstoff zusammen.',
        h2oStep4:
          'Sauerstoff: 8. Jeder Wasserstoff: 2. Zwei bindende und zwei freie Elektronenpaare – das ist Wasser, H–O–H.',
      },

      coach: {
        label: 'Coach',
        loners: {
          one: '{atom} hat noch {count} Einzelgänger. Einzelgänger paaren sich mit Einzelgängern eines anderen Atoms.',
          other:
            '{atom} hat noch {count} Einzelgänger. Einzelgänger paaren sich mit Einzelgängern eines anderen Atoms.',
        },
        needsMore:
          '{atom} hat {count} von 8. Es braucht noch ein bindendes Elektronenpaar – welches Atom hat noch einen Einzelgänger?',
        shareAgain:
          '{atom1} und {atom2} haben beide noch einen Einzelgänger. Sie können noch einmal teilen – das ergibt eine Doppelbindung.',
        complete:
          'Jedes Atom ist voll und kein Einzelgänger ist übrig. Das ist {name}: {bonds}, {lonePairs}.',
        sameGroup:
          '{element} steht in derselben Gruppe wie {analogue} und hat deshalb gleich viele Außenelektronen. Erwarte dieselbe Struktur wie bei {analogueMolecule}.',
        central: 'Das Atom mit den meisten Einzelgängern steht meistens in der Mitte.',
        deadEnd:
          '{atom} hat {count} von 8, aber kein anderes Atom hat noch einen Einzelgänger zum Teilen. Tipp auf ein bindendes Elektronenpaar, um es zu lösen, und versuch es mit einem anderen Partner.',
        isomer:
          'Jedes Atom ist voll, aber die Atome hängen anders zusammen als bei {name}. Tipp auf ein bindendes Elektronenpaar, um es zu lösen, und versuch eine andere Anordnung.',
      },

      counts: {
        sharedPairs: {
          one: '{count} bindendes Elektronenpaar',
          other: '{count} bindende Elektronenpaare',
        },
        lonePairs: { one: '{count} freies Elektronenpaar', other: '{count} freie Elektronenpaare' },
        bonds: { one: '{count} Bindung', other: '{count} Bindungen' },
      },

      hint: {
        label: 'Tipp',
        tierLabel: 'Tipp {tier} von 3',
        tier1: 'Schau, bei welchen Atomen noch Punkte pulsieren.',
        tier3: 'Bring den Einzelgänger an {atom1} mit dem Einzelgänger an {atom2} zusammen.',
        tier3Undo: 'Tipp auf das bindende Elektronenpaar zwischen {atom1} und {atom2}, um es zu lösen.',
        offerTier2: 'Immer noch fest? Drück noch einmal auf die Glühbirne, dann kommt die Strategie.',
        noMoreHints: 'Das war der letzte Tipp. Jedes Atom ist voll – drück auf Weiter.',
        inspectTier1:
          'Zähl die Punkte um jedes Atom. Jedes Atom sollte 8 haben – Wasserstoff 2.',
        inspectTier2:
          'Schau zuerst die Atome mit den meisten Bindungen an. Dort verstecken sich zusätzliche oder fehlende Paare.',
        inspectTier3: '{atom} hat {count}. Tipp es an und wähl dann aus, was nicht stimmt.',
        inspectTier3Correct:
          'Jedes Atom ist voll und nichts ist übrig – drück auf „Die stimmt“.',
        inspectTier3Repair: 'Bring die Einzelgänger zu Paaren zusammen, bis jedes Atom wieder voll ist.',
        inspectTier3CountBonds: {
          one: 'Jede Linie zwischen zwei Atomen ist eine Bindung. Hier ist es {count}.',
          other: 'Jede Linie zwischen zwei Atomen ist eine Bindung. Hier sind es {count}.',
        },
        inspectTier3CountLonePairs: {
          one: 'Jedes Punktepaar, das nicht auf einer Linie liegt, ist ein freies Elektronenpaar. Hier ist es {count}.',
          other:
            'Jedes Punktepaar, das nicht auf einer Linie liegt, ist ein freies Elektronenpaar. Hier sind es {count}.',
        },
      },

      error: {
        label: 'So nicht',
        atomFull:
          '{atom} hat schon 8 – mehr kann dieses Atom nicht teilen. Nimm ein Atom, das noch einen Einzelgänger hat.',
        hydrogenFull: 'Wasserstoff ist bei 2 voll. Er kann nur ein Paar teilen.',
        sameAtom:
          'Die beiden Punkte gehören zum selben Atom – sie sind schon ein Paar. Für eine Bindung braucht es zwei verschiedene Atome.',
        pairedDot:
          'Dieser Punkt gehört schon zu einem Paar. Nur Einzelgänger (die pulsierenden) lassen sich teilen.',
      },

      inspect: {
        classmate: 'Gezeichnet von jemandem aus deiner Klasse: {name}.',
        prompt: 'Tipp das Atom an, bei dem etwas nicht stimmt – oder sag, dass die Zeichnung stimmt.',
        diagnosisPrompt: 'Was stimmt bei {atom} nicht?',
        diagnosis: {
          tooMany: 'zu viele Elektronen um dieses Atom',
          tooFew: 'zu wenige – ein freies Elektronenpaar fehlt',
          hydrogenFull: 'Wasserstoff kann nur ein Paar teilen',
          needsDouble: 'diese Atome müssen zweimal teilen (eine Doppelbindung)',
          leftover: 'ein ungepaartes Elektron ist übrig geblieben',
          none: 'kein Fehler',
        },
        wrongAtom:
          '{atom} hat {count} – das passt schon. Schau dir ein Atom mit zu wenigen oder zu vielen an.',
        wrongDiagnosis: 'Nicht ganz. Zähl die Punkte um {atom}: {count}. {explanation}',
        explainTooMany: '{atom} hat mehr als {full} – da wurde ein freies Elektronenpaar zu viel gezeichnet.',
        explainTooFew: '{atom} hat weniger als 8 – ein freies Elektronenpaar fehlt.',
        explainHydrogenFull: 'Wasserstoff hat 4 – er kann nur ein Paar teilen.',
        explainNeedsDouble:
          '{atom1} und {atom2} haben beide noch einen Einzelgänger – sie müssen zweimal teilen.',
        explainLeftover: 'Bei {atom} ist ein Einzelgänger übrig – da wurde ein Elektron zu viel gezeichnet.',
        correctStructure: 'Richtig – jedes Atom ist voll und nichts ist übrig.',
        missedCorrect:
          'Diese hier stimmt wirklich: Jedes Atom ist voll. Nicht in jeder Zeichnung steckt ein Fehler.',
        notCorrect:
          'Nicht ganz – bei einem Atom stimmt es nicht. Zähl die Punkte um jedes Atom und tipp das an, bei dem es nicht passt.',
        repair: 'Jetzt reparier sie: Bring die Einzelgänger zu Paaren zusammen, bis jedes Atom voll ist.',
        repaired: 'Repariert – jedes Atom ist wieder voll.',
        countBonds: 'Wie viele Bindungen sind es? Tipp jedes bindende Elektronenpaar an.',
        countLonePairs: 'Wie viele freie Elektronenpaare sind es? Tipp jedes Paar an, das nicht geteilt wird.',
        countWrong:
          'Du hast {given} gezählt; es sind {actual}. Die, die du übersehen hast, sind hervorgehoben.',
        countWrongDouble:
          'Du hast {given} gezählt; es sind {actual}. Die, die du übersehen hast, sind hervorgehoben – eine Doppelbindung zählt als eine Bindung, aber als zwei bindende Elektronenpaare.',
        countRight: 'Ja – {counted}.',
        countLabel: 'Gezählt: {counted}',
      },

      success: {
        label: 'Fertig',
        round: '{name} fertig – {bondLine}.',
        bonus: 'Bonus ohne Tipp +{points}',
        points: '+{points}',
      },

      overlay: {
        levelUpBadge: 'Alle Atome voll',
        levelUpTitle: 'Level geschafft',
        levelUpSubtitle: 'Jeder Einzelgänger hat einen Partner',
        levelUpDescription: 'Level {level}: {changes}',
        levelChanges: {
          level2:
            'Sauerstoff, Stickstoff und Kohlenstoff bringen freie Elektronenpaare mit, die bleiben, wo sie sind – und jedes dritte Molekül ist eine Zeichnung aus deiner Klasse zum Nachprüfen.',
          level3:
            'manche Atome müssen zweimal teilen – eine Doppelbindung. Der Coach wartet jetzt, bis du fragst.',
          level4: 'die Atome liegen am Anfang lose herum. Du entscheidest, welches in die Mitte kommt.',
          level5: 'Korrekturmodus – sechs Zeichnungen aus deiner Klasse, kein Coach, nur die Tipp-Leiter.',
        },
        victoryBadge: 'Alle Ziele erreicht',
        victoryTitle: 'Lewis-Formeln gemeistert',
        victorySubtitle: 'Jeder Einzelgänger hat einen Partner',
        victoryDescription: 'Öffne deinen Korrekturbogen oder probier als Nächstes Bond Builder.',
        pausedBadge: 'Sitzung angehalten',
        pausedTitle: 'Spiel pausiert',
        pausedSubtitle: 'Nichts läuft auf Zeit.',
        pausedDescription: 'Deine Formel steht genau da, wo du sie gelassen hast.',
      },

      notebook: {
        header: 'Deine Lewis-Formeln',
        markingHeader: 'Dein Korrekturbogen',
        columnMolecule: 'Molekül',
        columnBondLine: 'Strichformel',
        columnCounts: 'Bindungen / freie Elektronenpaare',
        columnHint: 'Tipp-Stufe',
        columnDiagnosis: 'Befund',
        noHint: 'ohne Tipp',
        hintTier: 'Stufe {tier}',
        diagnosisRow: '{label}',
        diagnosisRowFirstTry: '{label} – auf Anhieb',
        empty: 'Noch keine Lewis-Formeln.',
      },

      glossary: {
        outerElectron: {
          term: 'Außenelektron (Valenzelektron)',
          definition: 'ein Elektron auf der äußersten Schale – genau die teilt ein Atom',
          matches: ['Außenelektronen', 'Außenelektron', 'Valenzelektronen', 'Valenzelektron'],
        },
        loner: {
          term: 'Einzelgänger (ungepaartes Elektron)',
          definition: 'ein Außenelektron ohne Partner; nur Einzelgänger lassen sich teilen',
          matches: ['Einzelgängern', 'Einzelgänger', 'ungepaarte Elektronen', 'ungepaartes Elektron'],
        },
        lonePair: {
          term: 'freies Elektronenpaar',
          definition: 'zwei Außenelektronen, die bei einem Atom bleiben und nicht geteilt werden',
          matches: ['freie Elektronenpaare', 'freies Elektronenpaar'],
        },
        sharedPair: {
          term: 'bindendes Elektronenpaar (Atombindung)',
          definition:
            'zwei Elektronen, eines von jedem Atom, die sich beide teilen – gezeichnet als Strich',
          matches: ['bindende Elektronenpaare', 'bindendes Elektronenpaar', 'Bindungen', 'Bindung'],
        },
        bondOrder: {
          term: 'Einfach-, Doppel- und Dreifachbindung',
          definition: 'ein, zwei oder drei bindende Elektronenpaare zwischen denselben zwei Atomen',
          matches: ['Einfachbindung', 'Doppelbindung', 'Dreifachbindung'],
        },
        octet: {
          term: 'Oktett',
          definition: 'acht Außenelektronen um ein Atom – dann ist es voll',
          matches: ['Oktett'],
        },
        duet: {
          term: 'Duett',
          definition: 'zwei Außenelektronen um den Wasserstoff – dann ist er voll',
          matches: ['Duett'],
        },
        dot: {
          term: 'Punkt',
          definition: 'zeigt, wie viele Außenelektronen es sind, nicht wo sie liegen',
          matches: ['Punkte', 'Punkt'],
        },
      },

      ui: {
        nextMolecule: 'Nächstes Molekül',
        nextDrawing: 'Nächste Zeichnung',
        finishLevel: 'Level abschließen',
        skipGuide: 'Erklärung überspringen',
        nextStep: 'Weiter',
        thisOneIsCorrect: 'Die stimmt',
        doneCounting: 'Fertig gezählt',
        startRepair: 'Reparieren',
        openMarkingSheet: 'Korrekturbogen öffnen',
        closeMarkingSheet: 'Zurück',
        playAgain: 'Noch einmal spielen',
        supportMode: 'Unterstützungsmodus',
        supportModeHelp:
          'Lässt den Coach in jedem Level offen. Deine Trefferquote wird dadurch nie schlechter.',
        hintButtonA11y: 'Tipp anzeigen',
        dismissHintA11y: 'Tipp schließen',
        coachRegionA11y: 'Nachrichten vom Coach',
        canvasLabelA11y: 'Lewis-Formel von {name}',
        atomNameA11y: '{element}: {count} von {full}',
        atomCounterA11y: '{symbol}: {count} von {full}',
        atomLonerA11y: '{element}, Einzelgänger {index} von {total}',
        atomLonePairA11y: '{element}, freies Elektronenpaar {index} von {total}',
        atomOrdinal: '{element} {ordinal}',
        lonerLabel: 'Einzelgänger',
        atomFull: 'voll',
        atomSelectedA11y:
          'Einzelgänger an {element} ausgewählt. Wähl jetzt einen Einzelgänger an einem anderen Atom.',
        atomInspectTapA11y: '{element} – antippen, wenn bei diesem Atom etwas nicht stimmt',
        bondSingleA11y: 'Einfachbindung zwischen {atom1} und {atom2}',
        bondDoubleA11y: 'Doppelbindung zwischen {atom1} und {atom2}',
        bondTripleA11y: 'Dreifachbindung zwischen {atom1} und {atom2}',
        bondUndoA11y: 'drücken, um das letzte bindende Elektronenpaar zu lösen',
        bondCountA11y: 'drücken zum Zählen',
        bondCountedA11y: 'gezählt',
        livePaired:
          'Zwischen {atom1} und {atom2} ist ein bindendes Elektronenpaar entstanden. {name1} hat jetzt {count1}; {name2} hat {count2}.',
        liveUnpaired: 'Das bindende Elektronenpaar zwischen {atom1} und {atom2} ist gelöst.',
        liveLocked: '{name} fertig. Die Formel ist eingerastet.',
      },
    },
  },
} satisfies Dictionary;

export default de;
