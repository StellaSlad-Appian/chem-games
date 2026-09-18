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
    lewisDescription: 'Verbinde die Einzelelektronen zu einem Molekül.',
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
  },
} satisfies Dictionary;

export default de;
