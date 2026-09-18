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

import type { PluralCategory, PluralForms } from '../format';

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
    profile: 'Profile',
    leaderboards: 'Leaderboards',
    games: 'Games',
    cheatSheets: 'Cheat Sheets',
    login: 'Log in / Register',
    logout: 'Log out',
    loggingOut: 'Logging out...',
    settingsA11y: 'Open general settings',
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
  },

  cheatSheets: {
    heading: 'Lab Cheat Sheets',
    intro:
      'Quick chemical formulas, reaction rules, and equation references grouped by year level.',
    backToList: 'Back to Cheat Sheets',
    count: { one: '{count} topic', other: '{count} topics' },
    exampleFormula: 'Example Formula',
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

    /**
     * Reaction Balancer, redesigned around conservation of atoms. The shape
     * mirrors the message catalogue in
     * src/core-engine/config/games/reaction-balancer-messages.ts, which turns
     * these templates back into the functions the components call.
     *
     * Formulae and equations inside `backticks` are typeset by MoleculeText and
     * must survive translation byte for byte; **double stars** are bold.
     */
    reactionBalancer: {
      header: {
        subtitle: 'Reaction Balancer',
        balance: 'Balance: {name}',
        build: 'Build and balance: {name}',
        progress: 'Reaction {round}/{total}',
        challengeProgress: 'Challenge {round}/{total}',
      },

      instructions: {
        title: 'How to Play: Reaction Balancer',
        lead: 'Make the atoms match.',
        intro:
          'In a chemical reaction atoms are rearranged, never made or lost — so both sides of the arrow must have the same number of each atom.',
        bullets: [
          'The **big numbers** in front of a formula are coefficients. You change those.',
          'The **small numbers** inside a formula are subscripts. They are locked — changing them would make a different substance.',
          'The **atom ledger** under the arrow counts each element on the left and right. Make every row equal and the equation locks.',
          'Stuck? Press the **lightbulb** (or H). The first hint is always free.',
        ],
        arrow: 'The arrow means "makes" or "becomes", not "equals".',
        /** Column 1 is the physical key and is never translated. */
        keyboard: [
          ['Tab', 'moves between compounds'],
          ['↑ / ↓', 'change a coefficient'],
          ['0–9', 'type a number directly'],
          ['H', 'hint'],
          ['P', 'pause'],
        ],
        touch: [
          ['Tap', '▲ / ▼ on a card to change a coefficient.'],
          ['Tap', 'the number to type one.'],
        ],
        glossaryTitle: 'Words the game uses',
      },

      /** The guided walk-through of the first reaction, `2H2 + O2 -> 2H2O`. */
      guided: {
        stepLabel: 'Guided step {step} of {total}',
        steps: [
          'Look at the ledger. Hydrogen: 2 on the left, 2 on the right — balanced. Oxygen: 2 on the left, 1 on the right. Oxygen needs fixing.',
          "We can't change the small 2 in `O2` — that would make a different substance. So add more water instead. Press ▲ on `H2O`.",
          'Oxygen is now 2 and 2. But look — hydrogen changed: 2 on the left, 4 on the right. Balancing one element can unbalance another. Press ▲ on `H2`.',
          'Every row matches: 4 H and 2 O on each side. The equation is balanced — `2H2 + O2 -> 2H2O`. You just conserved mass.',
        ],
      },

      coach: {
        label: 'Coach',
        imbalance:
          '{element}: {left} on the left, {right} on the right. Which compound with {elementInSentence} could you change?',
        multiple:
          'That fixed {fixed}, but {broken} changed. Balancing one element can unbalance another — check {broken} next.',
        balanced: 'Every row matches. Mass is conserved.',
        balancedNotLowest:
          'Balanced — and every coefficient can be divided by {k}. The simplest form is `{equation}`.',
      },

      hint: {
        label: 'Hint',
        tierLabel: 'Hint {tier} of 3',
        tier1: 'Start with the element that appears in the fewest compounds. Here that is {element}.',
        // Tier 2 is the reaction's own hint, translated in chemistry-names/.
        tier3: 'Put a {n} in front of `{formula}`. Then check {element} again.',
        tier3Lower: 'Take `{formula}` back to {n}. Then check {element} again.',
        tier3Balanced: 'Every row already matches — the equation is balanced.',
        tier1Build:
          'Read the description again. It names every substance you start with and every substance that is made.',
        tier2Build:
          'Substances before "reacts", "burns" or "decomposes" are reactants. Substances after "to form", "produce" or "into" are products.',
        tier3BuildReactant: 'Add {name} (`{formula}`) as a reactant.',
        tier3BuildProduct: 'Add {name} (`{formula}`) as a product.',
      },
      stuck: {
        offer: 'Want a bigger hint? Press the lightbulb again.',
      },

      error: {
        label: 'Not that move',
        zero: "A coefficient can't be 0 — that would remove `{formula}` from the reaction.",
        max: 'Coefficients this big are a sign to try smaller numbers. Aim for the simplest ratio.',
        subscriptTap:
          'Subscripts are locked. `H2O2` is hydrogen peroxide, not water — change the big number instead.',
        notANumber: 'Coefficients are whole numbers from 1 upwards. Type a number, or use ▲ and ▼.',
      },

      /** The Challenge level: build the equation from a word equation first. */
      challenge: {
        label: 'Challenge',
        intro: 'Read the description, then build the equation before you balance it.',
        pickerLabel: 'Compounds',
        sideLabel: 'Add to',
        reactants: 'Reactants',
        products: 'Products',
        placeholderReactant: 'add a reactant',
        placeholderProduct: 'add a product',
        notInReaction:
          '{name} is not part of this reaction. Read the description again — which substances does it name?',
        wrongSideProduct:
          '{name} is made in this reaction, so it belongs on the right of the arrow — it is a product.',
        wrongSideReactant:
          '{name} is used up in this reaction, so it belongs on the left of the arrow — it is a reactant.',
        built: 'That is the equation. Now balance it.',
        addAsReactantA11y: 'Add {name}, {formula}, as a reactant',
        addAsProductA11y: 'Add {name}, {formula}, as a product',
        removeA11y: 'Remove {name}, {formula}',
        tileA11y: '{name}, {formula}',
      },

      success: {
        label: 'Balanced',
        round: 'Balanced! `{equation}`',
        points: '+{points}',
        bonus: 'Lowest-terms bonus +{points}',
      },

      overlay: {
        levelUpBadge: 'Mass conserved',
        levelUpTitle: 'Level cleared',
        levelUpSubtitle: 'Every atom accounted for',
        levelUpDescription: 'Level {level} adds {changes}.',
        /** What each level adds, following the reaction levels in reactions.ts. */
        levelChanges: {
          level2: 'reactions where fixing one element unbalances another, and the next-row highlight is gone',
          level3:
            'polyatomic ions, the first brackets and four-compound reactions; the coach waits until you ask and the clusters give way to formulas',
          level4:
            'bigger hydrocarbons and four-compound double displacements; the ledger stays hidden until you open it',
        },
        victoryBadge: 'All objectives complete',
        victoryTitle: 'Balancing mastered',
        victorySubtitle: 'Every atom accounted for',
        victoryDescription: 'Try the Challenge level, or open your lab notebook.',
        challengeBadge: 'Challenge complete',
        challengeTitle: 'Equations built and balanced',
        challengeSubtitle: 'From words to symbols',
        challengeDescription: 'Open your lab notebook to see every equation you balanced.',
        pausedBadge: 'Session on hold',
        pausedTitle: 'Game Paused',
        pausedSubtitle: 'Nothing is timed.',
        pausedDescription: 'Your coefficients are exactly where you left them.',
      },

      notebook: {
        header: 'Your balanced equations',
        columnHint: 'Hint tier',
        columnPoints: 'Points',
        noHint: 'no hints',
        hintTier: 'tier {tier}',
        lowestTerms: 'lowest terms first go',
        simplified: 'simplified by {k}',
        challenge: 'built from words',
        empty: 'No equations yet.',
      },

      ledger: {
        title: 'Atom ledger',
        left: 'Left',
        right: 'Right',
        statusA11y: 'Status',
        row: '{element}: {left} left, {right} right',
        balancedRow: 'balanced',
        needsMoreLeft: '{count} more needed on the left',
        needsMoreRight: '{count} more needed on the right',
        allBalanced: 'Every row matches.',
        show: 'Show atom ledger',
        hide: 'Hide atom ledger',
        showCost: 'Opening the ledger on this level costs the lowest-terms bonus.',
        nextUp: 'balance this row next',
      },
      beam: {
        label: 'Relative mass in / out',
        readout: 'Relative mass: {left} in, {right} out.',
        level: 'The beam is level.',
        tipsLeft: 'The beam tips to the left.',
        tipsRight: 'The beam tips to the right.',
      },
      card: {
        coefficientA11y: 'Coefficient for {name}, {formula}',
        increaseA11y: 'Add one {name}',
        decreaseA11y: 'Remove one {name}',
        formulaTapA11y: '{name} — the subscripts are locked',
        clustersA11y: { one: '{count} molecule of {name}', other: '{count} molecules of {name}' },
        reactants: 'Reactants',
        products: 'Products',
      },

      /**
       * Tap-to-explain vocabulary. `term` is the pop-over heading, `matches`
       * are the words in running text that open it — so the matches must be
       * the exact word forms this locale's copy actually uses.
       */
      glossary: {
        coefficient: {
          term: 'coefficient',
          definition: 'the big number in front of a formula; it multiplies the whole molecule',
          matches: ['coefficients', 'coefficient'],
        },
        subscript: {
          term: 'subscript',
          definition: 'the small number inside a formula; it says how many atoms are in one molecule',
          matches: ['subscripts', 'subscript'],
        },
        reactant: {
          term: 'reactant',
          definition: 'what you start with (left of the arrow)',
          matches: ['reactants', 'reactant'],
        },
        product: {
          term: 'product',
          definition: 'what is made (right of the arrow)',
          matches: ['products', 'product'],
        },
        conserved: {
          term: 'conserved',
          definition: 'kept the same — atoms are never made or lost in a reaction',
          matches: ['conserved', 'conserve'],
        },
        stateSymbols: {
          term: '(s) (l) (g) (aq)',
          definition: 'solid, liquid, gas, dissolved in water',
          matches: ['state symbols', 'state symbol'],
        },
      },

      ui: {
        nextReaction: 'Next reaction',
        finishLevel: 'Finish level',
        skipGuide: "I've done this before",
        nextStep: 'Next',
        tryChallenge: 'Try the Challenge level',
        openNotebook: 'Open lab notebook',
        closeNotebook: 'Back',
        playAgain: 'Play again',
        supportMode: 'Support mode',
        supportModeHelp:
          'Keeps the coach strip and the ledger on at every level. Never lowers your accuracy.',
        hintButtonA11y: 'Get Hint',
        dismissHintA11y: 'Dismiss hint',
        coachRegionA11y: 'Coach messages',
        observation: 'What you would see',
        equationLabelA11y: 'Equation for {name}',
        liveChanged: '{name} is now {n}.',
        liveLocked: 'Balanced. {equation}. The equation is locked.',
        liveBuilt: 'Equation built. Now balance it.',
      },
    },

    /**
     * Share to Fill (Lewis structures). Mirrors the catalogue in
     * src/core-engine/config/games/lewis-structures-messages.ts.
     *
     * "Loner" is the game's own word for an unpaired outer electron; it is
     * introduced in the instructions and defined in the glossary, so each
     * locale picks a word of the same register rather than the textbook term.
     */
    lewisStructures: {
      header: {
        subtitle: 'Share to Fill',
        build: 'Build: {name} ({formula})',
        inspect: 'Check: {name} ({formula})',
        progress: 'Molecule {round}/{total}',
        marking: 'Drawing {round}/{total}',
      },

      instructions: {
        title: 'How to Play: Share to Fill',
        lead: 'Pair up the loners.',
        intro:
          'Every atom brings its outer electrons as dots. A dot on its own is a loner — it wants a partner. Two loners from two different atoms make a shared pair, which is a bond.',
        bullets: [
          'Drag a pulsing dot onto a pulsing dot on another atom (or tap one, then the other).',
          'An atom is full when it has 8 dots around it — hydrogen is full at 2.',
          "Share twice between the same two atoms and you've made a double bond.",
          'The structure locks itself when every atom is full and no loners are left. No button needed.',
          'Stuck? Press the lightbulb (or H). The first hint is always free.',
        ],
        disclaimer: 'The dots show how many outer electrons an atom has — not where they really are.',
        /** Column 1 is the physical key and is never translated. */
        keyboard: [
          ['Tab', 'selects an atom'],
          ['← →', 'picks one of its loners'],
          ['Enter', 'starts a pair; Tab + Enter on another atom finishes it'],
          ['Esc', 'cancels'],
          ['H', 'hint'],
          ['P', 'pause'],
        ],
        touch: [
          ['Tap', 'a loner, then tap a loner on another atom.'],
          ['Tap', 'a shared pair to undo it.'],
        ],
        glossaryTitle: 'Words the game uses',
      },

      guided: {
        stepLabel: 'Guided step {step} of {total}',
        h2: [
          'Two hydrogen atoms. Each has 1 outer electron — a loner. Drag one onto the other.',
          "They now share a pair. Count around each H: 2. Hydrogen is full at 2 — that's a single bond, H–H.",
        ],
        h2oStep1: 'Oxygen has 6 outer electrons: two pairs (they stay put) and two loners (they pulse).',
        h2oStep2: 'Pair one oxygen loner with a hydrogen loner.',
        h2oStep2After: 'Oxygen now has 7 around it — one more to go.',
        h2oStep3: 'Pair the other oxygen loner with the other hydrogen.',
        h2oStep4:
          "Oxygen: 8. Each hydrogen: 2. Two shared pairs and two lone pairs — that's water, H–O–H.",
      },

      coach: {
        label: 'Coach',
        loners: {
          one: '{atom} still has {count} loner. Loners pair with loners on another atom.',
          other: '{atom} still has {count} loners. Loners pair with loners on another atom.',
        },
        needsMore: '{atom} has {count} of 8. It needs another shared pair — which atom still has a loner?',
        shareAgain:
          '{atom1} and {atom2} both still have a loner. They can share again — that makes a double bond.',
        complete: 'Every atom is full and no loners are left. This is {name}: {bonds}, {lonePairs}.',
        sameGroup:
          '{element} is in the same group as {analogue}, so it has the same number of outer electrons. Expect the same structure as {analogueMolecule}.',
        central: 'The atom with the most loners usually goes in the middle.',
        deadEnd:
          '{atom} has {count} of 8, but no other atom has a loner left to share. Tap a shared pair to undo it, then try a different partner.',
        isomer:
          'Every atom is full, but the atoms are joined up differently from {name}. Tap a shared pair to undo it and try another arrangement.',
      },

      /** Noun phrases counted inside a sentence, so each has its own plural. */
      counts: {
        sharedPairs: { one: '{count} shared pair', other: '{count} shared pairs' },
        lonePairs: { one: '{count} lone pair', other: '{count} lone pairs' },
        bonds: { one: '{count} bond', other: '{count} bonds' },
      },

      hint: {
        label: 'Hint',
        tierLabel: 'Hint {tier} of 3',
        tier1: 'Look for the atoms that still have pulsing dots.',
        // Tier 2 is the molecule's own hint, translated in chemistry-names/.
        tier3: 'Pair the loner on {atom1} with the loner on {atom2}.',
        tier3Undo: 'Tap the shared pair between {atom1} and {atom2} to undo it.',
        offerTier2: 'Still stuck? Press the lightbulb again for the strategy.',
        noMoreHints: 'That was the last hint. Every atom is full — press Next.',
        inspectTier1: 'Count the dots around each atom. Every atom should have 8 — hydrogen 2.',
        inspectTier2:
          'Check the atoms with the most bonds first. That is where extra or missing pairs hide.',
        inspectTier3: '{atom} has {count}. Tap it, then choose what is wrong.',
        inspectTier3Correct: "Every atom is full and nothing is left over — press 'This one is correct'.",
        inspectTier3Repair: 'Pair up the loners until every atom is full again.',
        inspectTier3CountBonds: {
          one: 'Every line between two atoms is one bond. There is {count}.',
          other: 'Every line between two atoms is one bond. There are {count}.',
        },
        inspectTier3CountLonePairs: {
          one: 'Every pair of dots that is not on a line is a lone pair. There is {count}.',
          other: 'Every pair of dots that is not on a line is a lone pair. There are {count}.',
        },
      },

      error: {
        label: 'Not that move',
        atomFull: "{atom} already has 8 — it can't share any more. Try an atom that still has a loner.",
        hydrogenFull: 'Hydrogen is full at 2. It can only share one pair.',
        sameAtom:
          "Those two dots are on the same atom — they're already a pair. A bond needs two different atoms.",
        pairedDot: 'That dot is already part of a pair. Only loners (the pulsing ones) can be shared.',
      },

      inspect: {
        classmate: 'Drawn by a classmate: {name}.',
        prompt: 'Tap the atom you think is wrong — or say the drawing is correct.',
        diagnosisPrompt: 'What is wrong with {atom}?',
        diagnosis: {
          tooMany: 'too many electrons around this atom',
          tooFew: 'too few — a lone pair is missing',
          hydrogenFull: 'hydrogen can only share one pair',
          needsDouble: 'these atoms need to share twice (a double bond)',
          leftover: 'an unpaired electron was left over',
          none: 'no error',
        },
        wrongAtom: "{atom} has {count} — that one's fine. Check an atom with too few or too many.",
        wrongDiagnosis: 'Not quite. Count the dots around {atom}: {count}. {explanation}',
        explainTooMany: '{atom} has more than {full} — an extra lone pair was drawn.',
        explainTooFew: '{atom} has fewer than 8 — a lone pair is missing.',
        explainHydrogenFull: 'Hydrogen has 4 — it can only share one pair.',
        explainNeedsDouble: '{atom1} and {atom2} each still have a loner — they need to share twice.',
        explainLeftover: '{atom} has a loner left over — an extra electron was drawn.',
        correctStructure: 'Right — every atom is full and nothing is left over.',
        missedCorrect:
          'This one is actually correct: every atom is full. Not every drawing has a mistake.',
        notCorrect:
          "Not quite — one atom isn't right. Count the dots around each atom and tap the one that's off.",
        repair: 'Now fix it: pair up the loners until every atom is full.',
        repaired: 'Fixed — every atom is full again.',
        countBonds: 'How many bonds are there? Tap each shared pair.',
        countLonePairs: "How many lone pairs? Tap each pair that isn't shared.",
        countWrong: 'You counted {given}; there are {actual}. The ones you missed are highlighted.',
        countWrongDouble:
          'You counted {given}; there are {actual}. The ones you missed are highlighted — a double bond counts as one bond but two shared pairs.',
        countRight: 'Yes — {counted}.',
        countLabel: 'Counted: {counted}',
      },

      success: {
        label: 'Complete',
        round: '{name} complete — {bondLine}.',
        bonus: 'No-hint bonus +{points}',
        points: '+{points}',
      },

      overlay: {
        levelUpBadge: 'All atoms full',
        levelUpTitle: 'Level cleared',
        levelUpSubtitle: 'Every loner paired',
        levelUpDescription: 'Level {level}: {changes}',
        levelChanges: {
          level2:
            "oxygen, nitrogen and carbon bring lone pairs that stay put, and every third molecule is a classmate's drawing to check.",
          level3: 'some atoms need to share twice — a double bond. The coach now waits until you ask.',
          level4: 'atoms start unplaced. You choose which one goes in the middle.',
          level5: 'marking mode — six classmate drawings, no coach, hint ladder only.',
        },
        victoryBadge: 'All objectives complete',
        victoryTitle: 'Lewis structures mastered',
        victorySubtitle: 'Every loner paired',
        victoryDescription: 'Open your marking sheet, or try Bond Builder next.',
        pausedBadge: 'Session on hold',
        pausedTitle: 'Game Paused',
        pausedSubtitle: 'Nothing is timed.',
        pausedDescription: 'Your structure is exactly where you left it.',
      },

      notebook: {
        header: 'Your structures',
        markingHeader: 'Your marking sheet',
        columnMolecule: 'Molecule',
        columnBondLine: 'Bond-line',
        columnCounts: 'Bonds / lone pairs',
        columnHint: 'Hint tier',
        columnDiagnosis: 'Diagnosis',
        noHint: 'no hints',
        hintTier: 'tier {tier}',
        diagnosisRow: '{label}',
        diagnosisRowFirstTry: '{label} — first try',
        empty: 'No structures yet.',
      },

      glossary: {
        outerElectron: {
          term: 'outer (valence) electron',
          definition: 'an electron in the outside shell — the ones an atom shares',
          matches: ['outer electrons', 'outer electron', 'valence electrons', 'valence electron'],
        },
        loner: {
          term: 'loner (unpaired electron)',
          definition: 'an outer electron without a partner; only loners can be shared',
          matches: ['loners', 'loner', 'unpaired electrons', 'unpaired electron'],
        },
        lonePair: {
          term: 'lone pair',
          definition: 'two outer electrons that stay on one atom and are not shared',
          matches: ['lone pairs', 'lone pair'],
        },
        sharedPair: {
          term: 'shared pair / bond',
          definition: 'two electrons, one from each atom, shared between them — drawn as a line',
          matches: ['shared pairs', 'shared pair', 'bonds', 'bond'],
        },
        bondOrder: {
          term: 'single / double / triple bond',
          definition: 'one, two or three shared pairs between the same two atoms',
          matches: ['single bond', 'double bond', 'triple bond'],
        },
        octet: {
          term: 'octet',
          definition: 'eight outer electrons around an atom — full',
          matches: ['octet'],
        },
        duet: {
          term: 'duet',
          definition: 'two outer electrons around hydrogen — full',
          matches: ['duet'],
        },
        dot: {
          term: 'dot',
          definition: 'shows how many outer electrons, not where they are',
          matches: ['dots', 'dot'],
        },
      },

      ui: {
        nextMolecule: 'Next molecule',
        nextDrawing: 'Next drawing',
        finishLevel: 'Finish level',
        skipGuide: 'Skip guide',
        nextStep: 'Next',
        thisOneIsCorrect: 'This one is correct',
        doneCounting: 'Done counting',
        startRepair: 'Fix it',
        openMarkingSheet: 'Open marking sheet',
        closeMarkingSheet: 'Back',
        playAgain: 'Play again',
        supportMode: 'Support mode',
        supportModeHelp: 'Keeps the coach panel open on every level. Never lowers your accuracy.',
        hintButtonA11y: 'Get Hint',
        dismissHintA11y: 'Dismiss hint',
        coachRegionA11y: 'Coach messages',
        canvasLabelA11y: 'Dot structure of {name}',
        atomNameA11y: '{element}: {count} of {full}',
        atomCounterA11y: '{symbol}: {count} of {full}',
        atomLonerA11y: '{element}, loner {index} of {total}',
        atomLonePairA11y: '{element}, lone pair {index} of {total}',
        atomOrdinal: '{element} {ordinal}',
        lonerLabel: 'loner',
        atomFull: 'full',
        atomSelectedA11y: '{element} loner selected. Now choose a loner on another atom.',
        atomInspectTapA11y: '{element} — tap if this atom is wrong',
        bondSingleA11y: 'Single bond between {atom1} and {atom2}',
        bondDoubleA11y: 'Double bond between {atom1} and {atom2}',
        bondTripleA11y: 'Triple bond between {atom1} and {atom2}',
        bondUndoA11y: 'press to undo the last shared pair',
        bondCountA11y: 'press to count',
        bondCountedA11y: 'counted',
        livePaired: 'Shared pair made between {atom1} and {atom2}. {name1} now has {count1}; {name2} has {count2}.',
        liveUnpaired: 'Shared pair between {atom1} and {atom2} undone.',
        liveLocked: '{name} complete. The structure is locked.',
      },
    },
  },
} as const;

/**
 * True for a record keyed only by CLDR plural categories that supplies
 * `other`. Mirrors `isPluralForms()` in format.ts, which is what picks the form
 * at runtime — the two rules have to agree.
 */
type IsPluralForms<T> = [keyof T] extends [PluralCategory]
  ? 'other' extends keyof T
    ? true
    : false
  : false;

/**
 * Widens the literal types `as const` produced back to `string`, recursively,
 * so a translation is not required to be byte-identical to the English source
 * to type-check.
 *
 * Plural records are the one exception to "every locale has exactly the same
 * keys": how many forms a count-dependent string has is a property of the
 * language, not of the string. Only `other` is required; a locale supplies the
 * categories it actually uses. English and German need `one` and `other`;
 * Russian will add `few` and `many` to the same keys without touching this file.
 */
type Translated<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly Translated<U>[]
    : IsPluralForms<T> extends true
      ? PluralForms
      : { readonly [K in keyof T]: Translated<T[K]> };

/**
 * The shape every locale must provide. Derived from English so the two can
 * never drift: adding a key here makes every other locale fail to compile until
 * it is translated, which is exactly the Phase 2 workflow we want.
 */
export type Dictionary = Translated<typeof en>;

export default en;
