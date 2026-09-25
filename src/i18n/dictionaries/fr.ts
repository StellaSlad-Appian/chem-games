// src/i18n/dictionaries/fr.ts
//
// French (fr). Register and terminology decisions:
//
//  - Address the reader with informal "tu" throughout. French school textbooks
//    often use "vous", so this is a real decision rather than an obvious one:
//    it is recorded at the top of docs/i18n/glossary-fr.md and flagged there
//    for review. The site is a game, not a worksheet, and "vous" turns "Stuck?
//    Press the lightbulb" into an invigilator. **The one exception is the
//    `teachers` namespace**, the site's only adults-facing page, which uses
//    "vous": the argument for "tu" is about a teenage player, and that is not
//    who reads it. That copy now lives in src/i18n/teachers/fr.ts; the
//    reasoning is at the top of it.
//  - Chemistry terms follow French school curriculum usage, not literal
//    translation. Every term is fixed in docs/i18n/glossary-fr.md; where French
//    school practice offers more than one accepted word (ion oxonium vs. ion
//    hydronium, equilibrer vs. ajuster) the glossary records which one was
//    picked and why.
//  - "Hint" is *astuce*, never *indice*: `indice` is the French for a formula
//    subscript, and Reaction Balancer's whole teaching point is the
//    indice/coefficient contrast. See the glossary's UI table.
//  - Chemical formulae, element symbols, state symbols and IUPAC notation are
//    never translated. Element and compound *names* are, in
//    src/i18n/chemistry-names/fr.ts.
//  - French typography: « … » for quotations with a narrow no-break space
//    (U+202F) inside, U+202F before ; ! ?, a full no-break space (U+00A0)
//    before :, – (en dash) for parenthetical dashes, … as one character,
//    ’ (U+2019) for apostrophes, and a decimal comma.
//  - French runs roughly 20–25% longer than English. Where a string sits in a
//    fixed-width control (header badges, nav buttons, category pills) the
//    translation is deliberately shorter than a faithful rendering would be;
//    those entries are flagged in docs/i18n/fr-review.md.

import type { Dictionary } from './en';

export const fr = {
  meta: {
    siteName: 'Games in Chemistry',
    title: 'Games in Chemistry | Apprendre la chimie en jouant',
    description:
      'Comprendre la chimie en jouant : des mini-jeux visuels et interactifs et des fiches de référence.',
    // Keyword lists are chosen per language, not translated. The age band is
    // the thing to get right: this site is Year 9–10, which is 3e/2de in
    // France — the college–lycee boundary. A bare "chimie lycee" would repeat
    // the mistake Phase 1 had to correct in German ("Chemie Oberstufe" names
    // ages 16–19). Rated low: these are plausible French search terms, not
    // researched ones.
    keywords: [
      'chimie',
      'jeux éducatifs',
      'molécules',
      'réactions chimiques',
      'équations chimiques',
      'chimie 3e',
      'chimie seconde',
    ],
    privacyTitle: 'Confidentialité | Games in Chemistry',
    privacyDescription:
      'Ce que Games in Chemistry enregistre sur toi, ce qui est public, qui traite ces données et comment les télécharger ou les supprimer.',
    teachersTitle: 'Pour les enseignants | Games in Chemistry',
    teachersDescription:
      'Ce qu’est Games in Chemistry, les six langues dans lesquelles il existe, la façon dont il traite les données des élèves, où en est l’accessibilité et comment les enseignants peuvent contribuer pendant la bêta.',
    cheatSheetTitle: 'Antisèche {title} | Games in Chemistry',
    cheatSheetNotFound: 'Sujet introuvable – Games in Chemistry',
    exploreEntryNotFound: 'Fiche introuvable – Games in Chemistry',
  },

  common: {
    backToDashboard: 'Retour au tableau de bord',
    dashboard: 'Tableau de bord',
    playNow: 'Jouer',
    cancel: 'Annuler',
    opensInNewTab: '(s’ouvre dans un nouvel onglet)',
    loading: 'Chargement…',
  },

  language: {
    /** Labels the switcher; visible in the settings panel, sr-only in the nav. */
    label: 'Langue',
  },

  nav: {
    sectionsA11y: 'Sections du tableau de bord',
    profile: 'Profil',
    // Not shortened, for the reason given in de.ts: French had 63px spare at
    // 1024px before Explore, so there is no width argument for giving up the
    // words the reader recognises.
    leaderboards: 'Classements',
    games: 'Jeux',
    cheatSheets: 'Antisèches',
    explore: 'Explorer',
    // Deliberately shorter than the English "Log in / Register", for the same
    // reason German is: the pair is the widest thing in the header. The
    // sign-in page itself offers both actions.
    login: 'Connexion',
    logout: 'Déconnexion',
    loggingOut: 'Déconnexion…',
    settingsA11y: 'Ouvrir les paramètres généraux',
    menuOpenA11y: 'Ouvrir le menu',
    menuCloseA11y: 'Fermer le menu',
    menuTitleA11y: 'Menu du site',
  },

  footer: {
    tagline: 'Games in Chemistry – la chimie en images, en jeu et en clair.',
    copyright: '© {year} Games in Chemistry. Tous droits réservés.',
    privacy: 'Confidentialité',
    teachers: 'Pour les enseignants',
  },

  home: {
    eyebrow: 'Laboratoire de chimie interactif',
    heading: 'Apprends la chimie en jouant.',
    intro:
      'Explore des expériences interactives, suis tes meilleurs scores, maîtrise les formules et compare tes résultats de labo à ceux des autres.',
    heroHook: 'Gratuit. Sans inscription. Ouvre un jeu et commence.',
    exploreGames: 'Découvrir les jeux',
    viewLeaderboards: 'Voir les classements',
    profileLinkAuthenticated: 'Ouvrir le profil',
    leaderboardsHeading: 'Classements',
    leaderboardsDescription:
      'Les meilleurs scientifiques de toutes les expériences de chimie interactives.',
    leaderboardsLink: 'Ouvrir tous les classements',
    gamesHeading: 'Choisis ton jeu',
    gamesDescription:
      'Choisis une expérience et maîtrise les réactions et les formules chimiques.',
    gamesLink: 'Voir tous les jeux',
    cheatSheetsLink: 'Voir toutes les antisèches',
    exploreLink: 'Ouvrir Explorer',
    exploreDetail:
      'Chaque lundi, une nouvelle molécule et une nouvelle personne de la chimie – et à chaque fois une porte d’entrée vers la chimie qui va avec.',
    emptyProfileAuthenticatedTitle: 'Profil en cours de création',
    emptyProfileAuthenticatedBody:
      'Ton profil sera disponible dès que la migration des profils aura été faite dans la base de données.',
    emptyProfileAnonymousTitle: 'Ton profil commence ici',
    emptyProfileAnonymousBody:
      'Connecte-toi pour garder tes progrès, gérer tes notes de labo et construire ton profil de scientifique.',
    emptyProfileCta: 'Connexion / Inscription',
  },

  gamesHub: {
    heading: 'Jeux',
    intro: 'Choisis une expérience pour commencer.',
    searchLabel: 'Rechercher un jeu',
    searchPlaceholder: 'Rechercher un jeu ou une notion',
    filterA11y: 'Filtrer les jeux par niveau scolaire',
    noResultsTitle: 'Aucun jeu ne correspond.',
    noResultsBody: 'Essaie un autre niveau ou un autre mot.',
    clearFilters: 'Effacer les filtres',
    playNow: 'Jouer →',

    // Every title below is rated low in fr-review.md: these are product-naming
    // calls for the owner, not translation calls. The rejected candidates stay
    // here so the reasoning travels with the code — see the "Game titles"
    // table in docs/i18n/glossary-fr.md for the full version.

    // acidTitle candidates:
    //   'Acide, base ou neutre ?' — truer to the four-way sort, too long for the card
    //   'Le tri des acides'       — sounds like a worksheet, and names a machine
    acidTitle: 'Acide ou base ?', // chosen: the question the game actually asks
    acidDescription: 'Classe les substances selon leurs propriétés.',

    // blasterTitle candidates:
    //   'Formule Blaster'     — calque; "Blaster" reads as English filler in French
    //   'Chasse aux formules' — clear, but it sounds like a worksheet
    //   'Casse-Formules'      — echoes "casse-brique" (the French name for the
    //                           Breakout genre); strong arcade signal, wrong mechanic
    blasterTitle: 'Éclate-Formules', // chosen: "éclater" is what French says bubbles do,
    // and verbe+nom (trouble-fête, brise-glace) is a productive French product-name shape
    blasterDescription: 'Fais éclater les composés cherchés avant qu’ils ne s’échappent.',

    // neutraliseTitle candidates:
    //   'Neutralisation'  — a textbook chapter heading
    //   'Riposte ionique' — reads more like a product, but says "ions" without
    //                       saying "neutralisation"
    neutraliseTitle: 'Neutralise !', // chosen: mirrors the English's deliberate
    // imperative. GAMES.md's warning applies — check it reads as a name, not an order
    neutraliseDescription: 'Défends le labo contre les molécules envahissantes.',

    // balancerTitle candidates:
    //   'Équilibreur de réactions' — "équilibreur" is a machine in French (a wheel
    //                                balancer): exactly the GAMES.md trap
    //   'Réaction-Balancer'        — calque, German-style compounding on French
    //   'Équilibre la réaction'    — good, but the hub would then have two imperatives
    balancerTitle: 'La balance des atomes', // chosen: names the beam the game shows
    balancerDescription: 'Fais correspondre les atomes des deux côtés de la flèche.',

    // lewisTitle candidates:
    //   'Partage pour remplir' — calque; the purpose clause is clumsy in French
    //   'Deux par deux'        — memorable, but loses the "fill" half of the rule
    //   'Chacun son doublet'   — charming (plays on "chacun son tour"), but assumes
    //                            "doublet" is already known, and the game is where
    //                            you learn it
    lewisTitle: 'Partage et complète', // chosen: names the rule in French, two short
    // imperatives, instantly readable at 14
    lewisDescription: 'Associe les électrons célibataires pour construire une molécule.',

    // bondsTitle candidates:
    //   'Les liaisons' — too vague
    //   'Atomes liés'  — cute, imprecise
    bondsTitle: 'Liaisons chimiques', // chosen: a topic name, so the direct
    // translation is the right answer here
    bondsDescription: 'Explore les structures moléculaires et les liaisons entre atomes.',
  },

  auth: {
    backToGames: '← Retour aux jeux',
    loginTitle: 'Te revoilà !',
    loginSubtitle: 'Reprends tes expériences là où tu les as laissées.',
    registerTitle: 'Rejoins Games in Chemistry',
    registerSubtitle: 'Crée un compte pour garder tes progrès.',
    continueWithGoogle: 'Continuer avec Google',
    or: 'ou',
    email: 'E-mail',
    emailPlaceholder: 'toi@exemple.fr',
    password: 'Mot de passe',
    passwordPlaceholder: 'Au moins 6 caractères',
    loginAction: 'Se connecter',
    registerAction: 'Créer un compte',
    switchToRegisterPrompt: 'Nouveau sur Games in Chemistry ?',
    switchToRegisterAction: 'S’inscrire',
    switchToLoginPrompt: 'Tu as déjà un compte ?',
    switchToLoginAction: 'Se connecter',
    checkInbox: 'Regarde dans ta boîte mail pour activer ton compte Games in Chemistry.',
    unconfiguredClient: 'La connexion n’est pas configurée pour le moment.',
    unconfiguredNotice:
      'La connexion a besoin des identifiants Supabase. Copie .env.example vers .env.local et remplis les valeurs.',
    errorVerification: 'Ce lien n’a pas pu être vérifié. Réessaie.',
    errorConfiguration: 'La connexion n’est pas encore configurée.',
  },

  profile: {
    heading: 'Fiche de scientifique',
    subheading: 'Identité de labo et réussites publiques',
    edit: 'Modifier le profil',
    missingTitle: 'Profil de labo introuvable',
    missingBody:
      'Nous n’avons pas pu charger ta fiche de scientifique. Reconnecte-toi ou crée ton profil.',
    missingAction: 'Retour à la connexion',
    editMissingTitle: 'Fiche de labo introuvable',
    editMissingBody:
      'Nous n’avons pas pu charger les réglages de ton profil. Reconnecte-toi.',
    // "Registered Scientist" has no short gender-neutral French equivalent that
    // fits a badge, so this is a free rendering. "scientifique" is epicene,
    // which is what makes it work at all. Rated low in fr-review.md.
    defaultTitle: 'Scientifique du labo',
    labMember: 'Membre du labo',
    labNotes: 'Notes de labo',
    labNotesEmpty: 'Ici, on observe les réactions en silence – aucune note de labo pour l’instant.',
    favouriteCompound: 'Composé préféré',
    achievements: 'Réussites',
    statExperiments: 'Expériences',
    statLevel: 'Niveau',
    statStreak: 'Jours d’affilée',

    editHeading: 'Régler le matériel',
    editIntro:
      'Personnalise tes préférences de labo et choisis les statistiques visibles publiquement.',
    identityHeading: 'Identité de scientifique',
    alias: 'Alias',
    aliasPlaceholder: 'ex. Argon Curieux 4821',
    aliasHelp:
      'Affiché publiquement dans les classements. Choisis un pseudo, pas ton vrai nom ni ton adresse e-mail.',
    customTitle: 'Titre personnalisé',
    customTitlePlaceholder: 'ex. Chimiste de recherche',
    country: 'Pays / région',
    countryPlaceholder: 'ex. Australie',
    academicLevel: 'Niveau scolaire',
    academicLevelPlaceholder: 'Choisis ton niveau scolaire…',
    labNotesField: 'Notes de labo (à propos)',
    visibilityHeading: 'Visibilité des statistiques de jeu',
    save: 'Enregistrer les modifications',
    saving: 'Enregistrement…',

    dataHeading: 'Tes données',
    dataIntro:
      'Télécharge une copie de ce que Games in Chemistry enregistre sur toi, ou supprime ton compte.',
    exportHeading: 'Télécharger mes données',
    exportBody:
      'Un fichier JSON avec les informations de ton compte, ton profil, tes parties et tes progrès.',
    exportAction: 'Télécharger mes données',
    deleteHeading: 'Supprimer le compte',
    deleteBody:
      'Cela supprime définitivement et immédiatement ton compte, ton profil, tes scores, tes progrès et tes entrées dans les classements. C’est irréversible.',
    // {word} is the literal confirmation word the server action compares
    // against. It stays untranslated on purpose — see docs/i18n/README.md.
    deleteConfirmLabel: 'Tape {word} pour confirmer',
    deleteAction: 'Supprimer mon compte',
    deletePending: 'Suppression…',
  },

  profileToggles: {
    showCountry: 'Afficher le pays sur le profil',
    showYearLevel: 'Rendre le niveau scolaire public',
    showLabNotes: 'Rendre les notes de labo publiques',
    showTotalSyntheses: 'Afficher le nombre de synthèses',
    showCurrentStreak: 'Afficher la série de jours joués',
  },

  serverMessages: {
    profileUnconfigured: 'La connexion à la base de données n’est pas configurée pour le moment.',
    profileLoginRequired: 'Connecte-toi avant de modifier tes réglages.',
    profileSaveFailed: 'Les réglages du labo n’ont pas pu être enregistrés. Réessaie.',
    profileSaved: 'Réglages enregistrés !',
    profileUnexpected: 'Une erreur inattendue s’est produite pendant l’enregistrement.',
    aliasLength: 'Ton alias doit faire entre {min} et {max} caractères.',
    aliasAtSign:
      'Ton alias ne peut pas contenir d’arobase (@). Choisis un pseudo, pas une adresse e-mail.',
    yearLevelInvalid: 'Choisis un niveau scolaire dans la liste.',

    deleteConfirmRequired: 'Tape {word} pour confirmer que tu veux supprimer ton compte.',
    deleteUnavailable:
      'La suppression du compte n’est pas possible pour le moment. Réessaie plus tard.',
    deleteLoginRequired: 'Reconnecte-toi avant de supprimer ton compte.',
    deleteFailed: 'Nous n’avons pas pu supprimer ton compte. Réessaie plus tard.',

    exportUnavailable: 'L’export des données n’est pas disponible pour le moment.',
    exportLoginRequired: 'Tu dois te connecter pour télécharger tes données.',
    exportFailed: 'Nous n’avons pas pu préparer ton export de données. Réessaie plus tard.',

    feedbackCategoryAndMessage: 'Choisis une catégorie et écris un message.',
    feedbackCategoryInvalid: 'Choisis une catégorie valide.',
    feedbackMessageRequired: 'Écris un message.',
    feedbackMessageTooLong: 'Le message est trop long ({max} caractères maximum).',
    feedbackRateLimited: 'Trop d’envois. Réessaie plus tard.',
    feedbackUnconfigured: 'Le service d’avis n’est pas configuré dans cet environnement.',
    feedbackStoreFailed: 'Ton avis n’a pas pu être enregistré. Réessaie plus tard.',
    feedbackEmailFailed: 'Ton avis n’a pas pu être transmis. Réessaie plus tard.',
    feedbackUnexpected:
      'Une erreur inattendue s’est produite pendant le traitement de l’avis.',

    // Teacher collaborator sign-up. Formal address, unlike the rest of this
    // namespace: these appear only on the For Teachers page, which is written
    // for an adult. See the note on the English keys and the header of
    // src/i18n/teachers/<locale>.ts.
    collaboratorEmailRequired:
      'Veuillez indiquer une adresse e-mail, afin qu’il y ait un endroit où vous répondre.',
    collaboratorEmailInvalid:
      'Cela ne ressemble pas à une adresse e-mail. Il faut un @ suivi d’un domaine — par exemple name@school.edu.au.',
    collaboratorTooLong:
      'C’est plus long que ce champ ne l’autorise ({max} caractères maximum). Veuillez raccourcir.',
    collaboratorRateLimited:
      'Trop d’inscriptions depuis cette connexion. Veuillez réessayer plus tard.',
    collaboratorUnconfigured:
      'La liste des enseignants partenaires n’est pas configurée dans cet environnement : rien n’a été enregistré.',
    collaboratorStoreFailed:
      'Votre inscription n’a pas pu être enregistrée pour le moment. Veuillez réessayer plus tard.',
    collaboratorUnexpected:
      'Une erreur est survenue pendant l’enregistrement de votre inscription.',
  },

  privacy: {
    heading: 'Confidentialité',
    intro:
      'Ce que Games in Chemistry enregistre sur toi, qui peut le voir et comment le télécharger ou le supprimer.',
    effectiveDate: 'En vigueur depuis le {date}.',

    whoWeAreHeading: 'Qui nous sommes',
    whoWeAreBody:
      'Games in Chemistry est géré par Stella Slad, responsable des données décrites sur cette page. Tu peux nous écrire à {email}.',

    collectHeading: 'Ce que nous collectons',
    collectAccountLabel: 'Compte.',
    collectAccountBody:
      'Ton adresse e-mail et une empreinte de ton mot de passe, stockées par Supabase Auth. Si tu choisis la connexion Google, nous recevons le nom de ton compte Google, ton adresse e-mail et l’adresse de ton image de profil à la place d’un mot de passe.',
    collectProfileLabel: 'Profil.',
    collectProfileBody:
      'Un alias, ainsi que des informations facultatives que tu peux remplir : un titre, ton pays, ton niveau scolaire, des notes de labo, un élément et un composé préférés, et les badges que tu obtiens. Nous enregistrons aussi tes réglages de visibilité, qui décident de ce que les autres peuvent voir. Les alias sont générés pour toi et ne contiennent aucun vrai nom. Tu peux changer le tien sur {link}.',
    collectGameplayLabel: 'Parties.',
    collectGameplayBody:
      'Chaque fois que tu termines une partie, nous enregistrons de quel jeu il s’agissait, ton score, le niveau atteint, le résultat, la durée et la date. Nous en gardons ton meilleur score et ton meilleur niveau par jeu, ainsi que des statistiques calculées sur ton profil, comme ta série et ton pourcentage de bonnes réponses.',
    collectFeedbackLabel: 'Avis.',
    collectFeedbackBody:
      'Quand tu utilises le bouton d’avis, nous enregistrons la catégorie, ton message et la page où tu étais. Nous enregistrons aussi l’identifiant de ton compte si tu es connecté, ainsi qu’un identifiant haché et non réversible qui sert uniquement à limiter les abus.',
    collectCollaboratorLabel: 'Enseignants partenaires.',
    collectCollaboratorBody:
      'Si vous êtes enseignant et que vous vous portez volontaire sur la page « Pour les enseignants », nous conservons l’adresse e-mail que vous indiquez, ainsi que tout ce que vous choisissez d’ajouter : votre nom, votre établissement, votre pays, les niveaux et les matières que vous enseignez, et un message. Seule l’adresse est obligatoire. Nous conservons aussi la langue dans laquelle vous vous êtes inscrit, l’identifiant de votre compte si vous étiez connecté, et le même identifiant haché et irréversible qui sert à limiter les abus.',


    collaboratorsHeading: 'La liste des enseignants partenaires',
    collaboratorsWhy:
      'C’est la seule chose sur ce site qui identifie une personne directement plutôt que par un alias généré, d’où une section à part. Des enseignants se portent volontaires pour aider à façonner les jeux, et les promesses qui leur sont faites ne peuvent être tenues que s’il existe une adresse où leur écrire.',
    collaboratorsBasis:
      'La base légale est votre consentement, donné en remplissant ce formulaire. Il est libre : rien ici n’est refusé à qui ne s’inscrit pas, et tout reste gratuit dans les deux cas. Vous pouvez le retirer quand vous voulez, et le retirer ne vous coûte rien.',
    collaboratorsUse:
      'L’adresse sert à vous contacter au sujet des jeux et à vous donner l’accès promis. Elle n’est jamais vendue, jamais transmise à qui que ce soit et jamais ajoutée à une liste de diffusion, et aucun e-mail automatique ne lui est jamais envoyé.',
    collaboratorsRetention:
      'Nous conservons l’entrée jusqu’à ce que vous en demandiez la suppression, ou jusqu’à ce que la collaboration soit manifestement terminée — selon ce qui vient en premier. La liste n’est publiée nulle part et aucune page de ce site ne l’affiche. Supprimer un compte ne l’enlève pas, car l’entrée n’appartient à aucun compte ; demandez plutôt ci-dessous.',
    collaboratorsDelete:
      'Vous n’avez pas besoin de compte pour la faire supprimer, et la plupart des partenaires n’en ont pas. Écrivez à {email} que vous souhaitez sortir de la liste, et l’entrée est supprimée. Vous n’avez pas à donner de raison.',

    publicHeading: 'Ce qui est public',
    publicBody1:
      'Ton alias et ton meilleur score dans chaque jeu apparaissent dans les classements publics, que tout le monde peut voir.',
    publicBody2:
      'Les autres informations du profil, comme ton pays, ton niveau scolaire, tes notes de labo et tes statistiques de jeu, ne s’affichent que si tu actives le réglage correspondant sur {link}. À part la date d’inscription, tous les réglages sont désactivés par défaut. Ton titre, ton élément et ton composé préférés et tes badges sont toujours affichés avec ton alias.',

    cookiesHeading: 'Cookies et stockage local',
    cookiesBody1:
      'La connexion dépose des cookies de session Supabase. Ils sont strictement nécessaires pour te garder connecté.',
    cookiesBody2:
      'Nous déposons aussi un cookie de préférence qui retient la langue que tu as choisie, pour que le site s’ouvre dans cette langue la prochaine fois. Il ne contient rien d’autre qu’un code de langue.',
    cookiesBody3:
      'Le stockage local de ton navigateur garde tes préférences de son, de thème et de « règles déjà lues ». Ces données restent sur ton appareil et ne nous sont pas envoyées.',
    cookiesBody4:
      'Nous n’utilisons ni mesure d’audience, ni publicité, ni pistage par des tiers.',

    processorsHeading: 'Qui traite ces données',
    processorSupabaseLabel: 'Supabase',
    processorSupabaseBody: 'héberge la base de données et gère la connexion.',
    processorResendLabel: 'Resend',
    processorResendBody: 'nous transmet par e-mail les avis et les inscriptions des enseignants partenaires.',
    processorGoogleLabel: 'Google',
    processorGoogleBody: 'uniquement si tu utilises la connexion Google.',
    processorHosting: 'L’hébergeur qui met le site en ligne.',
    processorsTransport: 'Les données sont transmises en HTTPS.',

    retentionHeading: 'Combien de temps nous les gardons',
    retentionBody1: 'Nous gardons tes données tant que ton compte existe.',
    retentionBody2:
      'Quand tu supprimes ton compte, ton profil, tes parties, tes progrès et tes entrées dans les classements sont supprimés immédiatement. Les avis que tu as envoyés sont conservés mais anonymisés, car le lien vers ton compte est retiré.',

    choicesHeading: 'Tes possibilités',
    choicesEdit: 'Modifie ton profil et tes réglages de visibilité sur {link}.',
    choicesDownload: 'Télécharge une copie de tes données depuis la même page.',
    choicesDelete: 'Supprime ton compte depuis la même page.',
    choicesEmail: 'Ou écris-nous à {email} et nous t’aiderons.',

    childrenHeading: 'Enfants et élèves',
    childrenBody1:
      'Games in Chemistry est conçu pour le secondaire. Nous collectons donc le strict minimum nécessaire pour faire tourner les jeux et garder les scores.',
    childrenBody2:
      'Aucun vrai nom n’est demandé. Les alias sont générés pour toi, ne contiennent aucun vrai nom et peuvent être changés sur {link}.',
    childrenBody3:
      'Les parents, les responsables légaux et les enseignants peuvent nous écrire à {email} pour demander la suppression du compte et des données d’un élève.',

    legalHeading: 'Mentions légales',
    legalBody1:
      'Nous traitons les données personnelles conformément au Privacy Act 1988 australien et aux Australian Privacy Principles.',
    legalBody2:
      'Si tu as une réclamation, contacte-nous d’abord. Si notre réponse ne te satisfait pas, tu peux saisir l’Office of the Australian Information Commissioner sur {link}.',

    changesHeading: 'Modifications de cette page',
    changesBody:
      'Si nos pratiques changent, nous mettrons à jour cette page et la date en haut.',
  },

  cheatSheetCategories: {
    Fundamentals: 'Fondamentaux',
    Reactions: 'Réactions',
    'Acids & Bases': 'Acides et bases',
    Equations: 'Équations',
    Thermodynamics: 'Thermodynamique',
    Organic: 'Chimie organique',
    Bonding: 'Liaisons',
    Nomenclature: 'Nomenclature',
    Stoichiometry: 'Stœchiométrie',
  },

  yearLevels: {
    // The stored value stays the English "Year 9"; only the label is French.
    // Mapped by age: Year 7 = 5e, Year 8 = 4e, Year 9 = 3e, Year 10 = 2de,
    // Senior = 1re and Terminale. Plain-text ordinals rather than superscript
    // (5ᵉ, 2ᵈᵉ) so no font has to carry the modifier letters in a filter pill.
    all: 'Tous',
    'Year 7': '5e',
    'Year 8': '4e',
    'Year 9': '3e',
    'Year 10': '2de',
    Senior: '1re–Terminale',
  },

  leaderboards: {
    heading: 'Classements',
    intro: 'Compare les meilleurs scores de toutes les expériences.',
    topScientists: 'Meilleurs scientifiques',
    globalNetwork: 'Réseau mondial',
    emptyTitle: 'Le podium attend.',
    emptyBody: 'Joue la première manche et prends la première place.',
    rank: 'Rang',
    rankA11y: 'Rang',
    points: 'Points',
    recorded: 'Enregistré le {date}',
    myResults: 'Mes résultats de labo',
    highScore: 'Meilleur score',
    unranked: 'Non classé',
    firstResultTitle: 'Prêt pour ton premier résultat ?',
    firstResultBody: 'Joue une manche et pose un meilleur score.',
    noData: 'Rien de synthétisé pour l’instant. À toi de commencer !',
  },

  feedback: {
    openA11y: 'Ouvrir le menu d’avis',
    trigger: 'Avis',
    heading: 'Ton avis sur Games in Chemistry',
    closeA11y: 'Fermer les avis',
    sentTitle: 'Avis envoyé !',
    sentBody: 'Merci de nous aider à améliorer Games in Chemistry.',
    categoryBug: 'Problème',
    categoryChemistry: 'Données',
    categoryFeature: 'Idée',
    placeholderBug: 'Qu’est-ce qui n’a pas marché sur cette page ?',
    placeholderChemistry: 'Une valence ou une formule qui cloche ?',
    placeholderFeature: 'Quelle fonctionnalité rendrait ce jeu meilleur ?',
    submit: 'Envoyer',
    submitting: 'Envoi…',
    genericError: 'L’avis n’a pas pu être envoyé.',
  },

  settings: {
    gameTitle: 'Réglages du jeu',
    globalTitle: 'Paramètres',
    closeA11y: 'Fermer les paramètres',
    support: 'Assistance',
    appearance: 'Apparence',
    thisGame: 'Ce jeu',
    allGamesDefault: 'Par défaut pour tous les jeux',
    allGames: 'Tous les jeux',
    useGlobal: 'Valeur par défaut',
    dark: 'Sombre',
    light: 'Clair',
    device: 'Appareil',
    overrideHelp:
      'Un réglage propre à un jeu l’emporte sur la valeur par défaut de tous les jeux. Choisis « Valeur par défaut » pour la suivre à nouveau.',
    audio: 'Audio',
    soundEffects: 'Effets sonores',
    volumeA11y: 'Volume du son',
    account: 'Compte',
  },

  cheatSheets: {
    heading: 'Antisèches du labo',
    intro:
      'Formules chimiques, règles de réaction et équations en bref, classées par niveau scolaire.',
    backToList: 'Retour aux antisèches',
    count: { one: '{count} sujet', other: '{count} sujets' },
    exampleFormula: 'Formule exemple',
    // French puts a no-break space before a colon. This is the only reason
    // the separator is a dictionary string at all.
    exampleLabel: '{name} :',
    readReference: 'Consulter',
    practiseThis: 'S’entraîner',
    keyConcepts: 'L’essentiel',
    exampleFormulas: 'Formules et réactions exemples',
    lookupTables: 'Tableaux de référence',
    goingDeeper: 'Pour aller plus loin',
    watchOutFor: 'Erreurs fréquentes',
    learnMore: 'En savoir plus',
    forStudents: 'Pour les élèves',
    forTeachers: 'Pour les enseignants',
    curriculum: 'Programme : ',
    filterA11y: 'Filtrer les sujets par niveau scolaire',
    panHint: 'Faites défiler latéralement pour voir la suite',
  },

  periodicTable: {
    caption: 'Le tableau périodique — les 118 éléments, classés par numéro atomique',
    modeLabel: 'Colorer le tableau selon',
    legendHeading: 'Légende',
    scrollHint:
      'Le tableau est plus large qu’un écran de téléphone : il défile latéralement de son côté. Le groupe 1 est à gauche et le groupe 18 à droite.',
    keyboardHint:
      'Les flèches déplacent d’un élément à l’autre. Origine et Fin vont aux extrémités d’une période, Page préc. et Page suiv. aux extrémités d’un groupe, et Entrée ou Espace ouvre un élément.',
    cellA11y: '{name}, symbole {symbol}, numéro atomique {n}, groupe {group}, période {period}',
    cellA11yFBlock: '{name}, symbole {symbol}, numéro atomique {n}, {family}, période {period}',
    groupHeaderA11y: 'Groupe {group}',
    periodHeaderA11y: 'Période {period}',
    detailHeading: 'Élément sélectionné',
    previous: 'Élément précédent',
    next: 'Élément suivant',
    fullTableLink: 'Les six vues du tableau sont sur la fiche de 4e',
    reactivityNote:
      'La réactivité se compare uniquement à l’intérieur d’un groupe. Un 3 du groupe 1 et un 3 du groupe 17 ne décrivent pas la même réaction.',
    sizeNote: 'Chaque pastille donne le rayon de cet atome en picomètres.',
    modes: {
      metals: 'Métaux et non-métaux',
      families: 'Familles',
      outerShell: 'Couche externe',
      atomicSize: 'Taille de l’atome',
      reactivity: 'Réactivité',
      ionFormed: 'Ion formé',
      occurrence: 'Naturel ou fabriqué',
    },
    badge: {
      metal: 'M',
      nonMetal: 'NM',
      metalloid: 'MD',
      alkali: 'Alc',
      alkalineEarth: 'AT',
      transition: 'MT',
      postTransition: 'MPT',
      lanthanide: 'Ln',
      actinide: 'An',
      halogen: 'Hal',
      nobleGas: 'GN',
      natural: 'nat',
      synthetic: 'labo',
      none: '—',
    },
    legend: {
      metal: 'Métal',
      'non-metal': 'Non-métal',
      metalloid:
        'Métalloïde — se comporte en partie comme l’un et en partie comme l’autre (approfondissement)',
      'alkali-metal': 'Métal alcalin',
      'alkaline-earth': 'Métal alcalino-terreux',
      'transition-metal': 'Métal de transition',
      lanthanide: 'Lanthanide',
      actinide: 'Actinide',
      'post-transition-metal': 'Autre métal',
      'other-non-metal': 'Autre non-métal',
      halogen: 'Halogène',
      'noble-gas': 'Gaz noble',
      'outer-count': 'Électrons sur la couche externe : {n}',
      'outer-none':
        'Pas un compte simple à ce niveau — chez les métaux de transition et dans les deux dernières lignes, c’est une couche interne qui se remplit, donc aucun nombre externe unique à donner.',
      'size-smallest': 'Les plus petits — moins de 100 pm',
      'size-small': 'Petits — de 100 à 150 pm',
      'size-medium': 'Moyens — de 150 à 200 pm',
      'size-large': 'Grands — de 200 à 250 pm',
      'size-largest': 'Les plus grands — plus de 250 pm',
      'reactivity-unreactive': '0 — ne réagit presque avec rien',
      'reactivity-low': '1 — réagit lentement',
      'reactivity-moderate': '2 — réagit régulièrement',
      'reactivity-high': '3 — réagit vite',
      'reactivity-very-high': '4 — réagit violemment',
      'reactivity-none':
        'Non classée — la réactivité n’est aussi simple que dans les groupes 1, 2, 17 et 18',
      'ion-positive': 'Perd des électrons et forme un ion positif',
      'ion-negative': 'Gagne des électrons et forme un ion négatif',
      'ion-none':
        'Pas d’ion unique — les gaz nobles n’en forment aucun, et un métal de transition en forme plusieurs',
      natural: 'Présent dans la nature',
      synthetic: 'Fabriqué en laboratoire',
    },
    fields: {
      symbol: 'Symbole',
      atomicNumber: 'Numéro atomique',
      mass: 'Masse atomique relative',
      arrangement: 'Répartition des électrons',
      group: 'Groupe',
      period: 'Période',
      metalClass: 'Métal ou non-métal',
      family: 'Famille',
      ion: 'Ion formé',
      occurrence: 'Naturel ou fabriqué',
    },
    values: {
      fBlockGroup: 'En dehors des groupes numérotés',
    },
  },

  explore: {
    heading: 'Explorer',
    intro: 'Une molécule et une personne de la chimie, chaque lundi.',
    dateline: 'Semaine du {date}',
    // Sans article, pour les deux titres : « Scientifique de la semaine »
    // évite de choisir entre « la » et « le » chaque semaine, et
    // « scientifique » est épicène (glossary-fr.md § Registre).
    moleculeHeading: 'Molécule de la semaine',
    scientistHeading: 'Scientifique de la semaine',
    // La sous-navigation d’Explorer : un mot par onglet, et non les intitulés
    // de section complets — voir le commentaire dans en.ts. « Scientifique »
    // est épicène, donc l’onglet n’a pas besoin d’un doublet.
    tabsA11y: 'Sections d’Explorer',
    tabMolecule: 'Molécule',
    tabScientist: 'Scientifique',
    tabArchive: 'Archives',
    formulaLabel: 'Formule',
    formulaA11y: '{name}, formule {formula}',
    everydayHeading: 'Où on la rencontre',
    chemistryHeading: 'Ce qu’il y a de particulier',
    workHeading: 'Ses travaux',
    legacyHeading: 'Pourquoi c’était important',
    creditHeading: 'À qui revient le mérite',
    // Espace insécable avant les deux-points (U+00A0), comme partout ailleurs.
    moleculeCta: 'S’entraîner : {target}',
    scientistCta: 'La chimie derrière : {target}',
    moleculeImageA11y: 'Schéma\u00a0: {name}',
    scientistImageA11y: 'Image\u00a0: {name}',
    scientistWorkImageA11y: 'Image de ses travaux\u00a0: {name}',
    imageSourceLabel: 'Source',
    sourcesHeading: 'Sources',
    sourcesNote: 'Liens vérifiés le {date}.',

    // Les archives.
    recentHeading: 'Semaines précédentes',
    archiveCta: 'Voir toutes les fiches',
    archiveHeading: 'Archives d’Explorer',
    archiveIntro:
      'Toutes les molécules et toutes les personnes de la chimie, les plus récentes d’abord.',
    archiveThisWeek: 'Cette semaine',
    backToExplore: 'Retour à Explorer',
    backToArchive: 'Retour aux Archives',
    // « De la même semaine » plutôt que « En binôme avec » : le titre précède
    // un nom, et la formulation reste vraie même quand la paire est déjà
    // passée cinq fois. Voir le commentaire dans en.ts.
    sameWeekHeading: 'De la même semaine',
    featuredNever: 'Pas encore à l’affiche. Première apparition la semaine du {date}.',
  },

  chemistry: {
    acid: 'Acide',
    base: 'Base',
    neutral: 'Neutre',
    amphoteric: 'Amphotère',
    basicAlkaline: 'Basique / alcalin',
  },

  games: {
    shared: {
      progress: 'Progression',
      level: 'Niveau',
      score: 'Score',
      levelValue: 'Niveau {level}',
      scoreValue: 'Score : {score}',
      lives: 'VIES : {lives}/{max}',
      exit: 'Quitter',
      exitA11y: 'Quitter la partie',
      // "astuce", never "indice": see docs/i18n/glossary-fr.md § Product and UI
      // vocabulary. "indice" is the French for a formula subscript, and the
      // balancer's whole teaching point is the indice/coefficient contrast.
      hintA11y: 'Afficher une astuce',
      howToPlay: 'Comment jouer',
      closeInstructionsA11y: 'Fermer les règles',
      settings: 'Paramètres',
      pause: 'Mettre en pause',
      resume: 'Reprendre',
      gotIt: 'C’EST COMPRIS',
      hint: 'Astuce',
      find: 'Cherche :',
      reactionError: 'Erreur de réaction',
      labHint: 'Astuce du labo',
      dismissFeedbackA11y: 'Fermer le message',
      dismissHintA11y: 'Fermer l’astuce',
      finalScore: 'Score final :',
      finalScoreA11y: 'Score final : {score}',
      levelProgressA11y: 'Progression : niveau {level} sur {max}',
      keyboardAndMouse: 'Clavier et souris',
      touchscreen: 'Écran tactile',
    },

    overlay: {
      pausedBadge: 'Partie suspendue',
      pausedTitle: 'Jeu en pause',
      pausedSubtitle: 'Fais une petite pause labo.',
      pausedDescription: 'Ton expérience est figée exactement où tu l’as laissée.',
      failedBadge: 'Expérience terminée',
      failedTitle: 'Partie terminée',
      failedSubtitle: 'Ta réaction a fait long feu !',
      failedDescription: 'Revois les formules et retente l’expérience.',
      victoryBadge: 'Tous les objectifs atteints',
      victoryTitle: 'Recherche terminée',
      victorySubtitle: 'Labo maîtrisé !',
      victoryDescription: 'Beau travail ! Tu as réussi tous les niveaux.',
      levelUpBadge: 'Objectif atteint',
      levelUpTitle: 'Niveau réussi',
      levelUpSubtitle: 'Série terminée !',
      levelUpDescription: 'Prêt pour des défis plus difficiles ?',
      statLevel: 'Niveau',
      statScore: 'Score',
      statRound: 'Manche',
      statRoundValue: '{count} correctes',
      levelOfMax: 'Niveau {level} sur {max} • {correct} correctes',
      levelUpProgress: 'Niveau {level} → {next} • {correct} classées',
      resume: 'Reprendre',
      beginLevel: 'Commencer le niveau {level}',
      tryAgain: 'Réessayer',
      quitToHub: 'Retour aux jeux',
      keyHintResume: 'Appuie sur Échap, Espace ou Entrée pour continuer',
      keyHintRetry: 'Appuie sur Espace ou Entrée pour réessayer',
    },

    acidClassification: {
      subtitle: 'CLASSER LA MOLÉCULE',
      task: 'Acide, base ou neutre ?',
      progress: '{correct} / {quota} classées',
      arenaHeading: 'Classer le composé',
      registryError: 'Erreur : registre des composés introuvable.',
      instructionsTitle: 'Comment jouer : Acide ou base ?',
      instructionsSubtitle: 'Analyse la formule chimique et trouve ses propriétés !',
      instructionsCompact: [
        'Lis la formule dans la bulle.',
        'Dis si la substance est acide, basique, neutre ou amphotère.',
        'Au bout de 3 erreurs, le bécher se casse. L’ampoule donne le nom.',
      ],
      stepIdentifyLabel: 'Repérer :',
      stepIdentifyText: 'Regarde le composé affiché dans la bulle centrale.',
      stepClassifyLabel: 'Classer :',
      stepClassifyText:
        'Choisis si la substance est acide, basique, neutre ou amphotère.',
      stepHintLabel: 'Besoin d’une astuce ?',
      stepHintText: 'Clique sur l’ampoule en haut pour afficher le nom chimique.',
      stepCarefulLabel: 'Attention :',
      stepCarefulText: 'Au bout de 3 erreurs, le bécher se casse !',
    },

    formulaBlaster: {
      subtitle: 'MOLÉCULE CIBLE',
      progress: 'Cible {phase}/3 • Touches : {hits}/{quota}',
      hintHeading: 'Astuce sur la molécule cible',
      /** Label above the clock: it is a bonus, never a deadline. */
      speedBonus: 'Bonus de vitesse',
      instructionsTitle: 'Comment jouer : Éclate-Formules',
      instructionsIntro:
        'Trouve les bulles qui correspondent à la molécule cible affichée en haut et fais-les éclater.',
      instructionsBullet1:
        'Clique sur la bonne formule pour marquer un point sur la cible en cours.',
      instructionsBullet2:
        'Utilise l’ampoule en haut s’il te faut un indice sur la composition.',
      instructionsBullet3:
        'Si tu touches une mauvaise molécule, on te dit quel élément chercher à la place.',
      /** Feedback templates. {compound}/{element} are localized names; {formula}/{symbol} never are. */
      // Every one of these is written so no article ever has to precede a name
      // placeholder: French would need "de l'eau" but "du méthane".
      instructionsCompact: [
        'La molécule cible est affichée en haut.',
        'Appuie sur les bulles dont la formule correspond.',
        'Une mauvaise bulle t’indique quel élément chercher à la place.',
      ],
      hintTemplate: '{compound} – éléments : {elements}.',
      wrongPick: 'Ce n’est pas ça : {compound} ({formula}) !',
      wrongPickLookFor:
        'Ce n’est pas ça : {compound} ({formula}) ! Cherche plutôt des atomes de cet élément : {element} ({symbol}).',
      wrongPickCheckCounts:
        'Ce n’est pas ça : {compound} ({formula}) ! Compte les atomes de la cible : {target}.',
    },

    neutralise: {
      subtitleFull: 'OBJECTIF : neutralise les acides avec OH⁻ et les bases avec H⁺',
      subtitleShort: 'NEUTRALISE',
      progressFull: 'Vague {wave}/3 | Éliminées {cleared}/{total}',
      progressShort: 'Vague {wave}/3',
      fire: 'Tirer',
      fireA11y: 'Tirer',
      switchIonA11yAcid: 'Changer d’ion, actuellement H+ (acide)',
      switchIonA11yBase: 'Changer d’ion, actuellement OH- (base)',
      instructionsTitle: 'Comment jouer : Neutralise !',
      instructionsIntro: 'Défends le labo contre les produits dangereux qui arrivent !',
      instructionsCompact: [
        'Des acides et des bases arrivent d’en haut.',
        'Charge l’ion qui annule celui qui arrive.',
        'Tire. Touché, il est neutralisé ; raté, il passe.',
      ],
      keyOneLabel: '1',
      keyOneText: 'Charge {ion} pour neutraliser les bases.',
      keyOneIon: 'H⁺ (acide)',
      keyTwoLabel: '2',
      keyTwoText: 'Charge {ion} pour neutraliser les acides.',
      keyTwoIon: 'OH⁻ (base)',
      keySpaceLabel: 'Espace',
      keySpaceText: 'Tire avec ton canon à ions ! (Ou clique dans l’arène.)',
      keyArrowsLabel: '←/→',
      keyArrowsText: 'Déplace le canon (ou déplace la souris).',
      touchDragLabel: 'Glisser',
      touchDragText: 'Fais glisser ton doigt sur l’arène pour viser avec le canon.',
      touchFireLabel: 'Tirer',
      touchFireText: 'Appuie sur le bouton {button} sous l’arène.',
      touchSwitchLabel: 'Changer',
      touchSwitchText: 'Appuie sur le bouton d’ion pour passer de H⁺ à OH⁻.',
    },
  },
} satisfies Dictionary;

export default fr;
