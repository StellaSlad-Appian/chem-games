// src/i18n/dictionaries/en.ts
//
// The canonical dictionary. Every other locale is typed against this one
// (`satisfies Dictionary` in de.ts), so a missing or misspelled key is a
// compile error rather than a string that quietly falls back to English.
//
// Conventions (full version in docs/i18n/README.md):
//  - Keys are namespaced by where the string appears, then by what it is.
//  - Interpolation is `{name}`; the same placeholders must appear in every
//    locale (enforced by src/i18n/dictionary.test.ts).
//  - Accessibility strings live next to the visible string they belong to,
//    suffixed `A11y`, so nobody translates the label and forgets the aria-label.
//  - Chemical formulae and element symbols never appear here — they come from
//    the core-engine registries. Element and compound *names* are translated in
//    src/i18n/chemistry-names/, not here.
//  - A count-dependent string is a record keyed by CLDR plural category
//    ({ one, other }), never a `…One` / `…Other` key pair. See format.ts.
//
// This file is UI copy only, and it is *the* budget to watch: the root layout
// hands the whole dictionary to I18nProvider, so every byte here is serialized
// into the RSC payload of every page. A game's own copy therefore lives in a
// per-game catalogue that only that game's page loads — see
// docs/i18n/GAMES.md § Catalogue layout. `games.shared`, `games.overlay` and
// the `gamesHub` titles stay here on purpose: shared components read them,
// they are small, and per-game copies would duplicate them.

import type { Translated } from '../format';

export const en = {
  meta: {
    siteName: 'ChemGames',
    title: 'ChemGames | Interactive Chemistry Learning',
    description:
      'Master chemistry concepts through fun, visual, and interactive mini-games and reference guides.',
    keywords: [
      'chemistry',
      'education',
      'games',
      'molecules',
      'reactions',
      'titration',
      'high school chemistry',
    ],
    privacyTitle: 'Privacy | ChemGames',
    privacyDescription:
      'What ChemGames stores about you, what is public, who processes it, and how to download or delete your data.',
    cheatSheetTitle: '{title} Cheat Sheet | ChemGames',
    cheatSheetNotFound: 'Topic Not Found - ChemGames',
  },

  common: {
    backToDashboard: 'Back to Dashboard',
    dashboard: 'Dashboard',
    playNow: 'Play now',
    cancel: 'Cancel',
    opensInNewTab: '(opens in a new tab)',
    loading: 'Loading...',
  },

  language: {
    /** Labels the switcher; visible in the settings panel, sr-only in the nav. */
    label: 'Language',
  },

  nav: {
    sectionsA11y: 'Dashboard sections',
    /**
     * No longer in the navigation row — Profile moved into the Settings
     * popover's Account section (docs/feature-briefs/nav-profile-to-settings.md
     * §2). The key stays because that section reuses it, and because the
     * dashboard still has a `#profile` section of its own.
     */
    profile: 'Profile',
    /**
     * "Scores", not "Leaderboards", and "Guides", not "Cheat Sheets": nav
     * labels only, shortened for header width. Measured in a real browser at
     * 1024px, the English header was 1048px of content in a 1024px viewport —
     * a live WCAG 1.4.10 failure before Explore was added at all. The page
     * headings, the <title>, the URLs and the `cheatSheets.*` copy are
     * untouched; this is the chip in the header, not the name of the page.
     * See docs/feature-briefs/nav-profile-to-settings.md §3.
     */
    leaderboards: 'Scores',
    games: 'Games',
    cheatSheets: 'Guides',
    explore: 'Explore',
    login: 'Log in / Register',
    logout: 'Log out',
    loggingOut: 'Logging out...',
    settingsA11y: 'Open general settings',
    // The phone navigation panel. `sectionsA11y` is reused for the <nav> inside
    // it, so the list of destinations has one name in both places.
    menuOpenA11y: 'Open menu',
    menuCloseA11y: 'Close menu',
    menuTitleA11y: 'Site menu',
  },

  footer: {
    tagline: 'ChemGames — Making chemistry visual, playful, and intuitive.',
    copyright: '© {year} ChemGames. All rights reserved.',
    privacy: 'Privacy',
  },

  home: {
    eyebrow: 'Interactive Chemistry Laboratory',
    heading: 'Learn chemistry by playing.',
    intro:
      'Explore interactive experiments, track your personal best scores, master formulas, and see how your lab results compare.',
    exploreGames: 'Explore Games',
    viewLeaderboards: 'View Leaderboards',
    profileHeading: 'Profile',
    profileDescription: 'Your laboratory identity and personal experiment progress.',
    profileLinkAuthenticated: 'Open profile',
    profileLinkAnonymous: 'Log in to save progress',
    leaderboardsHeading: 'Leaderboards',
    leaderboardsDescription: 'Top scientists across all interactive chemistry experiments.',
    leaderboardsLink: 'Open full leaderboards',
    gamesHeading: 'Interactive Mini-Games',
    gamesDescription: 'Select an experiment to master chemical reactions and formulas.',
    gamesLink: 'Browse all games',
    /**
     * The dashboard's way into /explore. Belt and braces: the nav panel is new
     * code, and the dashboard is where a phone reader already is.
     * The section's heading and description reuse `explore.heading` and
     * `explore.intro`, so only these two strings are new.
     */
    exploreLink: 'Open Explore',
    exploreDetail:
      'A new molecule and a new chemist every Monday, each with a way into the chemistry behind it.',
    emptyProfileAuthenticatedTitle: 'Profile setup in progress',
    emptyProfileAuthenticatedBody:
      'Your profile will be available after the database profile migration has run.',
    emptyProfileAnonymousTitle: 'Your profile starts here',
    emptyProfileAnonymousBody:
      'Log in to save your progress, manage your lab notes, and build your scientist profile.',
    emptyProfileCta: 'Log in / Register',
    teaserAcidDetail: 'Classify materials & pH levels',
    teaserBlasterDetail: 'Pop compounds & balance ions',
    teaserNeutraliseDetail: 'Defend the lab from runaway reactions',
  },

  gamesHub: {
    heading: 'Games',
    intro: 'Choose an experiment to begin.',
    playNow: 'Play now →',
    acidTitle: 'Acid or Base?',
    acidDescription: 'Classify materials by their properties.',
    blasterTitle: 'Formula Blaster',
    blasterDescription: 'Pop target compounds before they escape.',
    neutraliseTitle: 'Neutralise!',
    neutraliseDescription: 'Defend the lab from molecule invaders.',
    balancerTitle: 'Reaction Balancer',
    balancerDescription: 'Make the atoms match on both sides of the arrow.',
    lewisTitle: 'Share to Fill',
    lewisDescription: 'Pair up the loners to build a molecule.',
    bondsTitle: 'Chemical Bonds',
    bondsDescription: 'Explore molecular structures and atomic bonding.',
  },

  auth: {
    backToGames: '← Back to games',
    loginTitle: 'Welcome back',
    loginSubtitle: 'Pick up where your experiments left off.',
    registerTitle: 'Join ChemGames',
    registerSubtitle: 'Create an account to save your progress.',
    continueWithGoogle: 'Continue with Google',
    or: 'or',
    email: 'Email',
    emailPlaceholder: 'you@example.com',
    password: 'Password',
    passwordPlaceholder: 'At least 6 characters',
    loginAction: 'Log in',
    registerAction: 'Create account',
    switchToRegisterPrompt: 'New to ChemGames?',
    switchToRegisterAction: 'Register',
    switchToLoginPrompt: 'Already have an account?',
    switchToLoginAction: 'Log in',
    checkInbox: 'Check your inbox to activate your ChemGames account.',
    unconfiguredClient: 'Authentication client is currently unconfigured.',
    unconfiguredNotice:
      'Authentication needs Supabase credentials. Copy .env.example to .env.local and fill in its values.',
    errorVerification: 'We could not verify that link. Please try again.',
    errorConfiguration: 'Authentication is not configured yet.',
  },

  profile: {
    heading: 'Scientist Overview',
    subheading: 'Laboratory identity & public achievements',
    edit: 'Edit Profile',
    missingTitle: 'Laboratory Profile Missing',
    missingBody:
      'We could not retrieve your scientist record. Please sign in again or set up your profile.',
    missingAction: 'Back to Authentication',
    editMissingTitle: 'Laboratory Record Not Found',
    editMissingBody: 'We could not load your profile setup. Please try signing in again.',
    defaultTitle: 'Registered Scientist',
    labMember: 'Lab member',
    labNotes: 'Lab notes',
    labNotesEmpty: 'This scientist is currently observing reactions in silence.',
    favouriteCompound: 'Favorite Compound',
    achievements: 'Achievements',
    statExperiments: 'Experiments',
    statLevel: 'Level',
    statStreak: 'Day Streak',
    statAccuracy: 'Accuracy',

    editHeading: 'Configure Equipment',
    editIntro: 'Customize your laboratory preferences and public stats visibility.',
    identityHeading: 'Scientist Identity',
    alias: 'Alias',
    aliasPlaceholder: 'e.g. Curious Argon 4821',
    aliasHelp:
      'Shown publicly on the leaderboards. Choose a nickname, not your real name or email address.',
    customTitle: 'Custom Title',
    customTitlePlaceholder: 'e.g. Research Chemist',
    country: 'Country / Region',
    countryPlaceholder: 'e.g. Australia',
    academicLevel: 'Academic Level',
    academicLevelPlaceholder: 'Select your year level...',
    labNotesField: 'Lab Notes (Bio)',
    visibilityHeading: 'Game Stats Visibility',
    save: 'Save Changes',
    saving: 'Saving...',

    dataHeading: 'Your Data',
    dataIntro: 'Download a copy of what ChemGames stores about you, or delete your account.',
    exportHeading: 'Download my data',
    exportBody: 'A JSON file with your account details, profile, game sessions and progress.',
    exportAction: 'Download my data',
    deleteHeading: 'Delete account',
    deleteBody:
      'This permanently and immediately removes your account, profile, scores, progress and leaderboard entries. It cannot be undone.',
    deleteConfirmLabel: 'Type {word} to confirm',
    deleteAction: 'Delete my account',
    deletePending: 'Deleting...',
  },

  /** Labels on the visibility switches in the profile editor. */
  profileToggles: {
    showCountry: 'Show Country on Profile',
    showYearLevel: 'Make Academic Level Public',
    showLabNotes: 'Make Lab Notes Public',
    showTotalSyntheses: 'Show Total Syntheses Count',
    showAccuracy: 'Show Answer Accuracy %',
    showCurrentStreak: 'Show Daily Play Streak',
  },

  /**
   * Strings returned by server actions and validators. These are produced on
   * the server with no route params to hand, so they are looked up through
   * `getRequestDictionary()` in src/i18n/server.ts, which reads the locale
   * cookie the proxy maintains.
   */
  serverMessages: {
    profileUnconfigured: 'Database connection is currently unconfigured.',
    profileLoginRequired: 'Please log in before editing your configuration.',
    profileSaveFailed: 'Failed to update lab configuration. Please try again.',
    profileSaved: 'Equipment configuration saved successfully!',
    profileUnexpected: 'An unexpected error occurred while saving changes.',
    aliasLength: 'Your alias must be between {min} and {max} characters.',
    aliasAtSign:
      'Your alias cannot contain an @ sign. Please choose a nickname, not an email address.',
    yearLevelInvalid: 'Please choose a year level from the list.',

    deleteConfirmRequired: 'Type {word} to confirm you want to delete your account.',
    deleteUnavailable: 'Account deletion is not available right now. Please try again later.',
    deleteLoginRequired: 'Please log in again before deleting your account.',
    deleteFailed: 'We could not delete your account. Please try again later.',

    exportUnavailable: 'Data export is not available right now.',
    exportLoginRequired: 'You need to be signed in to download your data.',
    exportFailed: 'We could not prepare your data export. Please try again later.',

    feedbackCategoryAndMessage: 'Please choose a category and enter a message.',
    feedbackCategoryInvalid: 'Please choose a valid feedback category.',
    feedbackMessageRequired: 'Please enter a message.',
    feedbackMessageTooLong: 'Message is too long (maximum {max} characters).',
    feedbackRateLimited: 'Too many submissions, please try again later.',
    feedbackUnconfigured: 'Feedback service is not currently configured in this environment.',
    feedbackStoreFailed: 'Could not save your feedback right now. Please try again later.',
    feedbackEmailFailed: 'Could not deliver your feedback right now. Please try again later.',
    feedbackUnexpected: 'An unexpected error occurred while processing feedback.',
  },

  // The privacy page is one long document. Its paragraphs are split at the
  // points where the JSX embeds a link or a <strong>, so the translator sees
  // whole sentences rather than fragments around markup. Australian legal
  // references (Privacy Act 1988, the OAIC) are proper nouns and stay English
  // in every locale — see docs/i18n/de-review.md.
  privacy: {
    heading: 'Privacy',
    intro: 'What ChemGames stores about you, who can see it, and how to download or delete it.',
    effectiveDate: 'Effective date: {date}.',

    whoWeAreHeading: 'Who we are',
    whoWeAreBody:
      'ChemGames is run by Stella Slad, who is the data controller for the information described on this page. You can reach us at {email}.',

    collectHeading: 'What we collect',
    collectAccountLabel: 'Account.',
    collectAccountBody:
      'Your email address and a password hash, stored by Supabase Auth. If you choose Google sign-in, we receive your Google account name, email address and avatar URL instead of a password.',
    collectProfileLabel: 'Profile.',
    collectProfileBody:
      'An alias, plus optional fields you can fill in: a title, your country, year level, lab notes, a favourite element and compound, and any badges you earn. We also store your visibility toggles, which decide what other people can see. Aliases are generated for you and contain no real name. You can change yours at {link}.',
    collectGameplayLabel: 'Gameplay.',
    collectGameplayBody:
      'Each time you finish a game we record which game it was, your score, the level you reached, the outcome, how long you played and when. From these we keep your best score and level for each game, and derived stats on your profile such as your streak and accuracy.',
    collectFeedbackLabel: 'Feedback.',
    collectFeedbackBody:
      'When you use the feedback button we store the category, your message and the page you were on. We also store your account id if you are signed in, and a hashed, non-reversible identifier used only to limit abuse.',

    publicHeading: 'What is public',
    publicBody1:
      'Your alias and your best score for each game appear on the public leaderboards, which anyone can see.',
    publicBody2:
      'Other profile fields, such as your country, year level, lab notes and game stats, are only shown where you switch the matching toggle on at {link}. All toggles except the joined date are off by default. Your title, favourite element and compound, and any badges are always shown with your alias.',

    cookiesHeading: 'Cookies and local storage',
    cookiesBody1:
      'Signing in sets Supabase authentication session cookies. They are strictly necessary to keep you logged in.',
    cookiesBody2:
      'We also set one preference cookie that remembers the language you chose, so the site opens in that language next time. It holds nothing but a language code.',
    cookiesBody3:
      'Your browser’s local storage holds your sound, theme and “instructions seen” preferences. That data stays on your device and is not sent to us.',
    cookiesBody4: 'We do not use analytics, advertising or third-party tracking.',

    processorsHeading: 'Who processes it',
    processorSupabaseLabel: 'Supabase',
    processorSupabaseBody: 'hosts the database and handles authentication.',
    processorResendLabel: 'Resend',
    processorResendBody: 'delivers feedback emails to us.',
    processorGoogleLabel: 'Google',
    processorGoogleBody: 'only if you use Google sign-in.',
    processorHosting: 'The hosting provider that serves the site.',
    processorsTransport: 'Data is transmitted over HTTPS.',

    retentionHeading: 'How long we keep it',
    retentionBody1: 'We keep your data for as long as your account exists.',
    retentionBody2:
      'When you delete your account, your profile, game sessions, progress and leaderboard entries are deleted immediately. Feedback you sent is kept but anonymised, because the reference to your account is removed.',

    choicesHeading: 'Your choices',
    choicesEdit: 'Edit your profile and visibility toggles at {link}.',
    choicesDownload: 'Download a copy of your data from the same page.',
    choicesDelete: 'Delete your account from the same page.',
    choicesEmail: 'Or email us at {email} and we will help.',

    childrenHeading: 'Children and students',
    childrenBody1:
      'ChemGames is designed for secondary-school students, so we collect the minimum needed to run the games and keep scores.',
    childrenBody2:
      'No real name is required. Aliases are generated for you, contain no real name, and can be changed at {link}.',
    childrenBody3:
      'Parents, guardians or teachers can contact us at {email} to ask for a student’s account and data to be deleted.',

    legalHeading: 'Legal',
    legalBody1:
      'We handle personal information in line with the Australian Privacy Act 1988 and the Australian Privacy Principles.',
    legalBody2:
      'If you have a complaint, please contact us first. If you are not satisfied with our response, you can complain to the Office of the Australian Information Commissioner at {link}.',

    changesHeading: 'Changes to this page',
    changesBody:
      'If our practices change, we will update this page and the effective date at the top.',
  },

  /**
   * Cheat-sheet categories. Like the year levels, the stored value stays the
   * canonical English one (it is a `CheatSheetCategory` union member used as
   * data); only the label is translated.
   */
  cheatSheetCategories: {
    Fundamentals: 'Fundamentals',
    Reactions: 'Reactions',
    'Acids & Bases': 'Acids & Bases',
    Equations: 'Equations',
    Thermodynamics: 'Thermodynamics',
    Organic: 'Organic',
    Bonding: 'Bonding',
    Nomenclature: 'Nomenclature',
    Stoichiometry: 'Stoichiometry',
  },

  yearLevels: {
    all: 'All',
    'Year 7': 'Year 7',
    'Year 8': 'Year 8',
    'Year 9': 'Year 9',
    'Year 10': 'Year 10',
    Senior: 'Senior',
  },

  leaderboards: {
    heading: 'Leaderboards',
    intro: 'Compare high scores across every experiment.',
    topScientists: 'Top scientists',
    globalNetwork: 'Global network',
    emptyTitle: 'The podium is waiting.',
    emptyBody: 'Play the first round and claim the top spot.',
    rank: 'Rank',
    rankA11y: 'Rank',
    points: 'Points',
    recorded: 'Recorded {date}',
    myResults: 'My lab results',
    highScore: 'High score',
    unranked: 'Unranked',
    firstResultTitle: 'Ready for your first result?',
    firstResultBody: 'Play a round to set a high score.',
    noData: 'No data synthesized yet. Be the first!',
  },

  feedback: {
    openA11y: 'Open feedback menu',
    trigger: 'Feedback',
    heading: 'ChemGames Feedback',
    closeA11y: 'Close feedback',
    sentTitle: 'Feedback sent!',
    sentBody: 'Thank you for helping us refine ChemGames.',
    categoryBug: 'Bug',
    categoryChemistry: 'Data',
    categoryFeature: 'Idea',
    placeholderBug: 'What went wrong on this page?',
    placeholderChemistry: 'Spot an incorrect valency or formula?',
    placeholderFeature: 'What feature would make this game better?',
    submit: 'Send Feedback',
    submitting: 'Submitting...',
    genericError: 'Failed to send feedback.',
  },

  settings: {
    gameTitle: 'Game Settings',
    globalTitle: 'Settings',
    closeA11y: 'Close settings',
    support: 'Support',
    appearance: 'Appearance',
    thisGame: 'This game',
    allGamesDefault: 'All games default',
    allGames: 'All games',
    useGlobal: 'Use global',
    dark: 'Dark',
    light: 'Light',
    overrideHelp:
      'A game-specific choice overrides the all-games default. Choose “Use global” to follow it again.',
    audio: 'Audio',
    soundEffects: 'Sound Effects',
    volumeA11y: 'Sound volume',
    /**
     * Heading of the Account section, which the header's Settings popover
     * shows and the in-game modal does not: a profile link inside a game
     * navigates away mid-run and discards it.
     */
    account: 'Account',
  },

  cheatSheets: {
    heading: 'Lab Cheat Sheets',
    intro:
      'Quick chemical formulas, reaction rules, and equation references grouped by year level.',
    backToList: 'Back to Cheat Sheets',
    count: { one: '{count} topic', other: '{count} topics' },
    exampleFormula: 'Example Formula',
    /**
     * The example's name and the colon after it. One key rather than
     * `{name}:` in JSX, because French puts a no-break space before a colon
     * and English and German do not — the separator is part of the
     * translation, not part of the markup.
     */
    exampleLabel: '{name}:',
    readReference: 'Read reference',
    practiseThis: 'Practise this',
    keyConcepts: 'Key Concepts',
    exampleFormulas: 'Example Formulas & Reactions',
    lookupTables: 'Lookup Tables',
    goingDeeper: 'Going Deeper',
    watchOutFor: 'Watch Out For',
    learnMore: 'Learn More',
    forStudents: 'For students',
    forTeachers: 'For teachers',
    curriculum: 'Curriculum: ',
    filterA11y: 'Filter topics by year level',
  },

  /**
   * Page chrome for /explore — headings, labels, the dateline pattern and the
   * calls to action. **The entries themselves are not here**, and must not be:
   * the root layout hands this whole dictionary to `I18nProvider`, so every
   * byte of it is serialized into the RSC payload of every page on the site.
   * Forty entries of prose in five languages would be carried by the games,
   * the leaderboards and the privacy page alike.
   *
   * The prose lives in `src/lib/explore/` (canonical English) with per-locale
   * overlays in `src/i18n/explore/`, loaded only by the Explore page, exactly
   * as a game's catalogue is. See docs/i18n/README.md § What goes where.
   */
  explore: {
    heading: 'Explore',
    intro: 'One molecule and one chemist, new every Monday.',
    /**
     * The dateline both sections share. `{date}` is formatted with `Intl` in
     * the reader's locale, never assembled by hand — so the pattern has to
     * carry whatever preposition and word order that language needs, which is
     * why this is one key and not "Week of" + a date.
     */
    dateline: 'Week of {date}',
    moleculeHeading: 'Molecule of the Week',
    scientistHeading: 'Scientist of the Week',
    formulaLabel: 'Formula',
    /** Accessible name for the formula, read before the name of the compound. */
    formulaA11y: '{name}, formula {formula}',
    everydayHeading: 'Where you meet it',
    chemistryHeading: 'Why it works',
    workHeading: 'What they did',
    legacyHeading: 'Why it mattered',
    /**
     * The optional credit-history field. Available to any entry and used
     * sparingly — a section where every woman's story is about being
     * overlooked and every man's is about discovery teaches the bias this
     * section exists to counter. AC-7 caps and balances its use.
     */
    creditHeading: 'Credit where it was due',
    moleculeCta: 'Practise this: {target}',
    scientistCta: 'The chemistry behind this: {target}',
    sourcesHeading: 'Sources',
    sourcesNote: 'Source links last checked {date}.',
  },

  chemistry: {
    acid: 'Acid',
    base: 'Base',
    neutral: 'Neutral',
    amphoteric: 'Amphoteric',
    basicAlkaline: 'Basic / Alkaline',
  },

  games: {
    shared: {
      progress: 'Progress',
      level: 'Level',
      score: 'Score',
      levelValue: 'Level {level}',
      scoreValue: 'Score {score}',
      lives: 'LIVES: {lives}/{max}',
      exit: 'Exit',
      exitA11y: 'Exit Game Session',
      hintA11y: 'Get Hint',
      howToPlay: 'How to Play',
      closeInstructionsA11y: 'Close instructions',
      settings: 'Settings',
      pause: 'Pause Game',
      resume: 'Resume Game',
      gotIt: 'GOT IT',
      hint: 'Hint',
      find: 'Find:',
      reactionError: 'Reaction Error',
      labHint: 'Lab Hint',
      dismissFeedbackA11y: 'Dismiss feedback',
      dismissHintA11y: 'Dismiss hint',
      finalScore: 'Final Score:',
      finalScoreA11y: 'Final Score: {score}',
      levelProgressA11y: 'Progress: Level {level} of {max}',
      keyboardAndMouse: 'Keyboard & mouse',
      touchscreen: 'Touchscreen',
    },

    overlay: {
      pausedBadge: 'Session on hold',
      pausedTitle: 'Game Paused',
      pausedSubtitle: 'Take a quick lab break.',
      pausedDescription: 'Your experiment is frozen exactly where you left it.',
      failedBadge: 'Experiment ended',
      failedTitle: 'Game Over',
      failedSubtitle: 'Your reaction fizzled!',
      failedDescription: 'Review the formulas and try the run again.',
      victoryBadge: 'All objectives complete',
      victoryTitle: 'Research Complete',
      victorySubtitle: 'Lab Mastered!',
      victoryDescription: 'Splendid work, Researcher! You cleared all levels.',
      levelUpBadge: 'Objective secured',
      levelUpTitle: 'Level Cleared',
      levelUpSubtitle: 'Batch complete!',
      levelUpDescription: 'Ready to take on higher level challenges?',
      timeoutDescription: 'Time ran out before reaching the quota.',
      statLevel: 'Level',
      statScore: 'Score',
      statRound: 'Round',
      statRoundValue: '{count} correct',
      levelOfMax: 'Level {level} of {max} • {correct} correct',
      levelUpProgress: 'Level {level} → {next} • {correct} sorted',
      resume: 'Resume Game',
      beginLevel: 'Begin Level {level}',
      tryAgain: 'Try Again',
      quitToHub: 'Quit to Hub',
      keyHintResume: 'Press Escape, Space, or Enter to continue',
      keyHintRetry: 'Press Space or Enter to try again',
    },

    acidClassification: {
      subtitle: 'CLASSIFY MOLECULE',
      task: 'Acid, Base or Neutral?',
      progress: '{correct} / {quota} Sorted',
      arenaHeading: 'Classify Compound',
      registryError: 'Error: Compounds Registry not found.',
      instructionsTitle: 'How to Play: Chemical Classifier',
      instructionsSubtitle: 'Analyze the chemical formula and identify its properties!',
      stepIdentifyLabel: 'Identify:',
      stepIdentifyText: 'Look at the compound shown in the center bubble.',
      stepClassifyLabel: 'Classify:',
      stepClassifyText:
        'Select whether it is an Acid, Base, Neutral, or Amphoteric substance.',
      stepHintLabel: 'Need a Hint?',
      stepHintText: 'Click the lightbulb icon in the header to reveal the chemical name.',
      stepCarefulLabel: 'Careful:',
      stepCarefulText: '3 mistakes and the beaker breaks!',
    },

    formulaBlaster: {
      subtitle: 'TARGET MOLECULE',
      progress: 'Target {phase}/3 • Hits: {hits}/{quota}',
      hintHeading: 'Target Molecule Hint',
      instructionsTitle: 'How to Play: Formula Blaster',
      instructionsIntro:
        'Find and pop bubbles matching the target molecule shown in the header.',
      instructionsBullet1: 'Click the correct formula to add a hit toward the current target.',
      instructionsBullet2:
        'Use the lightbulb in the header if you need a clue about elemental breakdown.',
      instructionsBullet3:
        'Tapping an incorrect molecule reveals what element you should look for instead.',
      /** Feedback templates. {compound}/{element} are localized names; {formula}/{symbol} never are. */
      hintTemplate: '{compound} consists of the elements: {elements}.',
      wrongPick: "That's {compound} ({formula})!",
      wrongPickLookFor:
        "That's {compound} ({formula})! Look for {element} ({symbol}) atoms instead.",
      wrongPickCheckCounts: "That's {compound} ({formula})! Check the atom counts for {target}.",
    },

    neutralise: {
      subtitleFull: 'OBJECTIVE: Neutralize acids with OH⁻ and bases with H⁺',
      subtitleShort: 'NEUTRALIZE',
      progressFull: 'Wave {wave}/3 | Cleared {cleared}/{total}',
      progressShort: 'Wave {wave}/3',
      fire: 'Fire',
      fireA11y: 'Fire',
      switchIonA11yAcid: 'Switch ion, currently H+ acid',
      switchIonA11yBase: 'Switch ion, currently OH- base',
      instructionsTitle: 'How to Play: Neutralize!',
      instructionsIntro: 'Defend the lab from incoming chemical hazards!',
      keyOneLabel: '1',
      keyOneText: 'Load {ion} to neutralize Bases.',
      keyOneIon: 'H⁺ (Acid)',
      keyTwoLabel: '2',
      keyTwoText: 'Load {ion} to neutralize Acids.',
      keyTwoIon: 'OH⁻ (Base)',
      keySpaceLabel: 'Space',
      keySpaceText: 'Fire your ion cannon! (Or click the arena).',
      keyArrowsLabel: '←/→',
      keyArrowsText: 'Move the cannon (or move your mouse).',
      touchDragLabel: 'Drag',
      touchDragText: 'Slide your finger on the arena to aim the cannon.',
      touchFireLabel: 'Fire',
      touchFireText: 'Tap the {button} button below the arena.',
      touchSwitchLabel: 'Switch',
      touchSwitchText: 'Tap the ion button to toggle between H⁺ and OH⁻.',
    },
  },
} as const;

/**
 * The shape every locale must provide. Derived from English so the two can
 * never drift: adding a key here makes every other locale fail to compile until
 * it is translated, which is exactly the Phase 2 workflow we want.
 */
export type Dictionary = Translated<typeof en>;

export default en;
