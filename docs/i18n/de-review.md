<!--
  GENERATED FILE - do not edit by hand.
  Regenerate with:  npm run i18n:review
  The confidence ratings, the notes and the assessment at the end come from
  src/i18n/review-notes.ts; edit them there. Everything else is read from the
  dictionaries, so this table cannot drift from what the site actually says.
-->

# German translation review

Every UI string on the site, with its English source and its German
translation, so a native speaker or a chemistry teacher can review the German
without reading any code.

**424 strings** — 212 high confidence,
151 medium, 61 low.

The confidence column is a judgement about *this* translation, not about German
in general:

- **high** — ordinary UI copy, or a term fixed in [`glossary-de.md`](./glossary-de.md). Low risk.
- **medium** — correct as far as I can tell, but a native speaker may prefer a
  different word, or the register may be slightly off for a 14-year-old. Worth a
  read; not urgent.
- **low** — I am genuinely unsure. Please have a native speaker or a chemistry
  teacher check these before the German site goes in front of students.

The chemistry names and the cheat-sheet prose are **not** in this table — they
are keyed by registry identifier rather than by dictionary path, and they are
assessed as bodies of work in [the section at the end](#chemistry-names--srci18nchemistry-namesdets).

A note on reading the table: `·` marks a non-breaking space, which German
typography needs before units and inside "z. B." and which is otherwise
invisible here.

---

## UI strings

### `meta`

| Key | English | German | Confidence | Notes |
|---|---|---|---|---|
| `meta.siteName` | ChemGames | ChemGames | medium | Page titles and descriptions. |
| `meta.title` | ChemGames \| Interactive Chemistry Learning | ChemGames \| Chemie interaktiv lernen | medium | Page titles and descriptions. |
| `meta.description` | Master chemistry concepts through fun, visual, and interactive mini-games and reference guides. | Chemie verstehen durch Spielen: visuelle, interaktive Minispiele und Nachschlagehilfen. | medium | Page titles and descriptions. |
| `meta.keywords[0]` | chemistry | Chemie | low | SEO keywords are keyword research, not translation. These are plausible German search terms, not researched ones. Someone should check them against actual German search volume before they matter — see the seo/ directory for how the English set was built. |
| `meta.keywords[1]` | education | Schule | low | SEO keywords are keyword research, not translation. These are plausible German search terms, not researched ones. Someone should check them against actual German search volume before they matter — see the seo/ directory for how the English set was built. |
| `meta.keywords[2]` | games | Lernspiele | low | SEO keywords are keyword research, not translation. These are plausible German search terms, not researched ones. Someone should check them against actual German search volume before they matter — see the seo/ directory for how the English set was built. |
| `meta.keywords[3]` | molecules | Moleküle | low | SEO keywords are keyword research, not translation. These are plausible German search terms, not researched ones. Someone should check them against actual German search volume before they matter — see the seo/ directory for how the English set was built. |
| `meta.keywords[4]` | reactions | Reaktionen | low | SEO keywords are keyword research, not translation. These are plausible German search terms, not researched ones. Someone should check them against actual German search volume before they matter — see the seo/ directory for how the English set was built. |
| `meta.keywords[5]` | titration | Titration | low | SEO keywords are keyword research, not translation. These are plausible German search terms, not researched ones. Someone should check them against actual German search volume before they matter — see the seo/ directory for how the English set was built. |
| `meta.keywords[6]` | high school chemistry | Chemie Oberstufe | low | SEO keywords are keyword research, not translation. These are plausible German search terms, not researched ones. Someone should check them against actual German search volume before they matter — see the seo/ directory for how the English set was built. |
| `meta.privacyTitle` | Privacy \| ChemGames | Datenschutz \| ChemGames | medium | Page titles and descriptions. |
| `meta.privacyDescription` | What ChemGames stores about you, what is public, who processes it, and how to download or delete your data. | Was ChemGames über dich speichert, was öffentlich ist, wer die Daten verarbeitet und wie du sie herunterlädst oder löschst. | medium | Page titles and descriptions. |
| `meta.cheatSheetTitle` | {title} Cheat Sheet \| ChemGames | Spickzettel {title} \| ChemGames | medium | Page titles and descriptions. |
| `meta.cheatSheetNotFound` | Topic Not Found - ChemGames | Thema nicht gefunden – ChemGames | medium | Page titles and descriptions. |

### `common`

| Key | English | German | Confidence | Notes |
|---|---|---|---|---|
| `common.backToDashboard` | Back to Dashboard | Zurück zur Übersicht | high | Everyday UI words with unambiguous German equivalents. |
| `common.dashboard` | Dashboard | Übersicht | high | Everyday UI words with unambiguous German equivalents. |
| `common.playNow` | Play now | Jetzt spielen | high | Everyday UI words with unambiguous German equivalents. |
| `common.cancel` | Cancel | Abbrechen | high | Everyday UI words with unambiguous German equivalents. |
| `common.opensInNewTab` | (opens in a new tab) | (öffnet in einem neuen Tab) | high | Everyday UI words with unambiguous German equivalents. |
| `common.loading` | Loading... | Wird geladen … | high | Everyday UI words with unambiguous German equivalents. |

### `language`

| Key | English | German | Confidence | Notes |
|---|---|---|---|---|
| `language.label` | Language | Sprache | high | Switcher labels; short and unambiguous. |

### `nav`

| Key | English | German | Confidence | Notes |
|---|---|---|---|---|
| `nav.sectionsA11y` | Dashboard sections | Bereiche der Übersicht | high | Standard navigation vocabulary. "Spickzettel" for cheat sheet is the natural school word and the right register for teenagers. |
| `nav.profile` | Profile | Profil | high | Standard navigation vocabulary. "Spickzettel" for cheat sheet is the natural school word and the right register for teenagers. |
| `nav.leaderboards` | Leaderboards | Bestenlisten | high | Standard navigation vocabulary. "Spickzettel" for cheat sheet is the natural school word and the right register for teenagers. |
| `nav.games` | Games | Spiele | high | Standard navigation vocabulary. "Spickzettel" for cheat sheet is the natural school word and the right register for teenagers. |
| `nav.cheatSheets` | Cheat Sheets | Spickzettel | high | Standard navigation vocabulary. "Spickzettel" for cheat sheet is the natural school word and the right register for teenagers. |
| `nav.login` | Log in / Register | Anmelden | high | Standard navigation vocabulary. "Spickzettel" for cheat sheet is the natural school word and the right register for teenagers. |
| `nav.logout` | Log out | Abmelden | high | Standard navigation vocabulary. "Spickzettel" for cheat sheet is the natural school word and the right register for teenagers. |
| `nav.loggingOut` | Logging out... | Wird abgemeldet … | high | Standard navigation vocabulary. "Spickzettel" for cheat sheet is the natural school word and the right register for teenagers. |
| `nav.settingsA11y` | Open general settings | Allgemeine Einstellungen öffnen | high | Standard navigation vocabulary. "Spickzettel" for cheat sheet is the natural school word and the right register for teenagers. |

### `footer`

| Key | English | German | Confidence | Notes |
|---|---|---|---|---|
| `footer.tagline` | ChemGames — Making chemistry visual, playful, and intuitive. | ChemGames – Chemie sichtbar, spielerisch und verständlich. | high | Short; the tagline is a free rendering rather than word-for-word, which suits a tagline. |
| `footer.copyright` | © {year} ChemGames. All rights reserved. | © {year} ChemGames. Alle Rechte vorbehalten. | high | Short; the tagline is a free rendering rather than word-for-word, which suits a tagline. |
| `footer.privacy` | Privacy | Datenschutz | high | Short; the tagline is a free rendering rather than word-for-word, which suits a tagline. |

### `home`

| Key | English | German | Confidence | Notes |
|---|---|---|---|---|
| `home.eyebrow` | Interactive Chemistry Laboratory | Interaktives Chemielabor | medium | Marketing copy. Accurate, but a native speaker may want to punch it up — promotional register is where translated copy most often reads flat. |
| `home.heading` | Learn chemistry by playing. | Lerne Chemie beim Spielen. | medium | Marketing copy. Accurate, but a native speaker may want to punch it up — promotional register is where translated copy most often reads flat. |
| `home.intro` | Explore interactive experiments, track your personal best scores, master formulas, and see how your lab results compare. | Erkunde interaktive Experimente, verfolge deine persönlichen Bestwerte, beherrsche Formeln und vergleiche deine Laborergebnisse mit anderen. | medium | Marketing copy. Accurate, but a native speaker may want to punch it up — promotional register is where translated copy most often reads flat. |
| `home.exploreGames` | Explore Games | Spiele entdecken | medium | Marketing copy. Accurate, but a native speaker may want to punch it up — promotional register is where translated copy most often reads flat. |
| `home.viewLeaderboards` | View Leaderboards | Bestenlisten ansehen | medium | Marketing copy. Accurate, but a native speaker may want to punch it up — promotional register is where translated copy most often reads flat. |
| `home.profileHeading` | Profile | Profil | medium | Marketing copy. Accurate, but a native speaker may want to punch it up — promotional register is where translated copy most often reads flat. |
| `home.profileDescription` | Your laboratory identity and personal experiment progress. | Deine Laboridentität und dein persönlicher Forschungsfortschritt. | medium | Marketing copy. Accurate, but a native speaker may want to punch it up — promotional register is where translated copy most often reads flat. |
| `home.profileLinkAuthenticated` | Open profile | Profil öffnen | medium | Marketing copy. Accurate, but a native speaker may want to punch it up — promotional register is where translated copy most often reads flat. |
| `home.profileLinkAnonymous` | Log in to save progress | Anmelden und Fortschritt speichern | medium | Marketing copy. Accurate, but a native speaker may want to punch it up — promotional register is where translated copy most often reads flat. |
| `home.leaderboardsHeading` | Leaderboards | Bestenlisten | medium | Marketing copy. Accurate, but a native speaker may want to punch it up — promotional register is where translated copy most often reads flat. |
| `home.leaderboardsDescription` | Top scientists across all interactive chemistry experiments. | Die besten Forschenden aus allen interaktiven Chemie-Experimenten. | medium | Marketing copy. Accurate, but a native speaker may want to punch it up — promotional register is where translated copy most often reads flat. |
| `home.leaderboardsLink` | Open full leaderboards | Alle Bestenlisten öffnen | medium | Marketing copy. Accurate, but a native speaker may want to punch it up — promotional register is where translated copy most often reads flat. |
| `home.gamesHeading` | Interactive Mini-Games | Interaktive Minispiele | medium | Marketing copy. Accurate, but a native speaker may want to punch it up — promotional register is where translated copy most often reads flat. |
| `home.gamesDescription` | Select an experiment to master chemical reactions and formulas. | Wähle ein Experiment und meistere chemische Reaktionen und Formeln. | medium | Marketing copy. Accurate, but a native speaker may want to punch it up — promotional register is where translated copy most often reads flat. |
| `home.gamesLink` | Browse all games | Alle Spiele ansehen | medium | Marketing copy. Accurate, but a native speaker may want to punch it up — promotional register is where translated copy most often reads flat. |
| `home.emptyProfileAuthenticatedTitle` | Profile setup in progress | Profil wird noch eingerichtet | medium | Marketing copy. Accurate, but a native speaker may want to punch it up — promotional register is where translated copy most often reads flat. |
| `home.emptyProfileAuthenticatedBody` | Your profile will be available after the database profile migration has run. | Dein Profil ist verfügbar, sobald die Profil-Migration der Datenbank gelaufen ist. | medium | Marketing copy. Accurate, but a native speaker may want to punch it up — promotional register is where translated copy most often reads flat. |
| `home.emptyProfileAnonymousTitle` | Your profile starts here | Hier beginnt dein Profil | medium | Marketing copy. Accurate, but a native speaker may want to punch it up — promotional register is where translated copy most often reads flat. |
| `home.emptyProfileAnonymousBody` | Log in to save your progress, manage your lab notes, and build your scientist profile. | Melde dich an, um deinen Fortschritt zu speichern, deine Labornotizen zu verwalten und dein Forschungsprofil aufzubauen. | medium | Marketing copy. Accurate, but a native speaker may want to punch it up — promotional register is where translated copy most often reads flat. |
| `home.emptyProfileCta` | Log in / Register | Anmelden / Registrieren | medium | Marketing copy. Accurate, but a native speaker may want to punch it up — promotional register is where translated copy most often reads flat. |
| `home.teaserAcidDetail` | Classify materials & pH levels | Stoffe und pH-Werte einordnen | medium | Marketing copy. Accurate, but a native speaker may want to punch it up — promotional register is where translated copy most often reads flat. |
| `home.teaserBlasterDetail` | Pop compounds & balance ions | Verbindungen zerplatzen lassen, Ionen ausgleichen | medium | Marketing copy. Accurate, but a native speaker may want to punch it up — promotional register is where translated copy most often reads flat. |
| `home.teaserNeutraliseDetail` | Defend the lab from runaway reactions | Schütze das Labor vor außer Kontrolle geratenen Reaktionen | medium | Marketing copy. Accurate, but a native speaker may want to punch it up — promotional register is where translated copy most often reads flat. |

### `gamesHub`

| Key | English | German | Confidence | Notes |
|---|---|---|---|---|
| `gamesHub.heading` | Games | Spiele | medium | Game descriptions. The titles are rated separately below. |
| `gamesHub.intro` | Choose an experiment to begin. | Wähle ein Experiment, um zu starten. | medium | Game descriptions. The titles are rated separately below. |
| `gamesHub.playNow` | Play now → | Jetzt spielen → | medium | Game descriptions. The titles are rated separately below. |
| `gamesHub.acidTitle` | Acid or Base? | Säure oder Base? | medium | Game descriptions. The titles are rated separately below. |
| `gamesHub.acidDescription` | Classify materials by their properties. | Ordne Stoffe nach ihren Eigenschaften ein. | medium | Game descriptions. The titles are rated separately below. |
| `gamesHub.blasterTitle` | Formula Blaster | Formel-Blaster | low | Coinage. "Formel-Blaster" keeps the arcade feel and is readable in German, but it is an invented product name, not a translation. Decide whether game titles should be translated at all or kept as English product names. |
| `gamesHub.blasterDescription` | Pop target compounds before they escape. | Zerplatze die gesuchten Verbindungen, bevor sie entkommen. | medium | Game descriptions. The titles are rated separately below. |
| `gamesHub.neutraliseTitle` | Neutralise! | Neutralisieren! | medium | "Neutralisieren!" as an imperative works, but check it reads as a game title and not as an instruction. |
| `gamesHub.neutraliseDescription` | Defend the lab from molecule invaders. | Verteidige das Labor gegen Molekül-Invasoren. | medium | Game descriptions. The titles are rated separately below. |
| `gamesHub.balancerTitle` | Reaction Balancer | Reaktions-Balancer | low | Coinage, and the weakest one. "Reaktions-Balancer" is understandable but clunky; a German speaker may prefer something like "Gleichungs-Werkstatt" or simply leaving it in English. |
| `gamesHub.balancerDescription` | Adjust stoichiometric coefficients to balance equations. | Passe die stöchiometrischen Koeffizienten an, um Gleichungen auszugleichen. | medium | Game descriptions. The titles are rated separately below. |
| `gamesHub.bondsTitle` | Chemical Bonds | Chemische Bindungen | medium | Game descriptions. The titles are rated separately below. |
| `gamesHub.bondsDescription` | Explore molecular structures and atomic bonding. | Erkunde Molekülstrukturen und Bindungen zwischen Atomen. | medium | Game descriptions. The titles are rated separately below. |

### `auth`

| Key | English | German | Confidence | Notes |
|---|---|---|---|---|
| `auth.backToGames` | ← Back to games | ← Zurück zu den Spielen | high | Standard sign-in vocabulary. The placeholder email was localised to a .de domain. |
| `auth.loginTitle` | Welcome back | Willkommen zurück | high | Standard sign-in vocabulary. The placeholder email was localised to a .de domain. |
| `auth.loginSubtitle` | Pick up where your experiments left off. | Mach dort weiter, wo deine Experimente aufgehört haben. | high | Standard sign-in vocabulary. The placeholder email was localised to a .de domain. |
| `auth.registerTitle` | Join ChemGames | Bei ChemGames mitmachen | high | Standard sign-in vocabulary. The placeholder email was localised to a .de domain. |
| `auth.registerSubtitle` | Create an account to save your progress. | Erstelle ein Konto, um deinen Fortschritt zu speichern. | high | Standard sign-in vocabulary. The placeholder email was localised to a .de domain. |
| `auth.continueWithGoogle` | Continue with Google | Weiter mit Google | high | Standard sign-in vocabulary. The placeholder email was localised to a .de domain. |
| `auth.or` | or | oder | high | Standard sign-in vocabulary. The placeholder email was localised to a .de domain. |
| `auth.email` | Email | E-Mail | high | Standard sign-in vocabulary. The placeholder email was localised to a .de domain. |
| `auth.emailPlaceholder` | you@example.com | du@beispiel.de | high | Standard sign-in vocabulary. The placeholder email was localised to a .de domain. |
| `auth.password` | Password | Passwort | high | Standard sign-in vocabulary. The placeholder email was localised to a .de domain. |
| `auth.passwordPlaceholder` | At least 6 characters | Mindestens 6 Zeichen | high | Standard sign-in vocabulary. The placeholder email was localised to a .de domain. |
| `auth.loginAction` | Log in | Anmelden | high | Standard sign-in vocabulary. The placeholder email was localised to a .de domain. |
| `auth.registerAction` | Create account | Konto erstellen | high | Standard sign-in vocabulary. The placeholder email was localised to a .de domain. |
| `auth.switchToRegisterPrompt` | New to ChemGames? | Neu bei ChemGames? | high | Standard sign-in vocabulary. The placeholder email was localised to a .de domain. |
| `auth.switchToRegisterAction` | Register | Registrieren | high | Standard sign-in vocabulary. The placeholder email was localised to a .de domain. |
| `auth.switchToLoginPrompt` | Already have an account? | Du hast schon ein Konto? | high | Standard sign-in vocabulary. The placeholder email was localised to a .de domain. |
| `auth.switchToLoginAction` | Log in | Anmelden | high | Standard sign-in vocabulary. The placeholder email was localised to a .de domain. |
| `auth.checkInbox` | Check your inbox to activate your ChemGames account. | Schau in dein Postfach, um dein ChemGames-Konto zu aktivieren. | high | Standard sign-in vocabulary. The placeholder email was localised to a .de domain. |
| `auth.unconfiguredClient` | Authentication client is currently unconfigured. | Die Anmeldung ist zurzeit nicht konfiguriert. | high | Standard sign-in vocabulary. The placeholder email was localised to a .de domain. |
| `auth.unconfiguredNotice` | Authentication needs Supabase credentials. Copy .env.example to .env.local and fill in its values. | Für die Anmeldung werden Supabase-Zugangsdaten benötigt. Kopiere .env.example nach .env.local und trage die Werte ein. | high | Standard sign-in vocabulary. The placeholder email was localised to a .de domain. |
| `auth.errorVerification` | We could not verify that link. Please try again. | Dieser Link konnte nicht überprüft werden. Bitte versuche es noch einmal. | high | Standard sign-in vocabulary. The placeholder email was localised to a .de domain. |
| `auth.errorConfiguration` | Authentication is not configured yet. | Die Anmeldung ist noch nicht eingerichtet. | high | Standard sign-in vocabulary. The placeholder email was localised to a .de domain. |

### `profile`

| Key | English | German | Confidence | Notes |
|---|---|---|---|---|
| `profile.heading` | Scientist Overview | Forschungsübersicht | medium | The "scientist" framing is awkward in gender-neutral German; rendered with neutral forms (Forschende, Forschungs-) throughout. Worth a native read. |
| `profile.subheading` | Laboratory identity & public achievements | Laboridentität und öffentliche Erfolge | medium | The "scientist" framing is awkward in gender-neutral German; rendered with neutral forms (Forschende, Forschungs-) throughout. Worth a native read. |
| `profile.edit` | Edit Profile | Profil bearbeiten | medium | The "scientist" framing is awkward in gender-neutral German; rendered with neutral forms (Forschende, Forschungs-) throughout. Worth a native read. |
| `profile.missingTitle` | Laboratory Profile Missing | Laborprofil nicht gefunden | medium | The "scientist" framing is awkward in gender-neutral German; rendered with neutral forms (Forschende, Forschungs-) throughout. Worth a native read. |
| `profile.missingBody` | We could not retrieve your scientist record. Please sign in again or set up your profile. | Wir konnten deinen Forschungsdatensatz nicht laden. Bitte melde dich erneut an oder richte dein Profil ein. | medium | The "scientist" framing is awkward in gender-neutral German; rendered with neutral forms (Forschende, Forschungs-) throughout. Worth a native read. |
| `profile.missingAction` | Back to Authentication | Zurück zur Anmeldung | medium | The "scientist" framing is awkward in gender-neutral German; rendered with neutral forms (Forschende, Forschungs-) throughout. Worth a native read. |
| `profile.editMissingTitle` | Laboratory Record Not Found | Labor-Datensatz nicht gefunden | medium | The "scientist" framing is awkward in gender-neutral German; rendered with neutral forms (Forschende, Forschungs-) throughout. Worth a native read. |
| `profile.editMissingBody` | We could not load your profile setup. Please try signing in again. | Wir konnten deine Profileinstellungen nicht laden. Bitte melde dich erneut an. | medium | The "scientist" framing is awkward in gender-neutral German; rendered with neutral forms (Forschende, Forschungs-) throughout. Worth a native read. |
| `profile.defaultTitle` | Registered Scientist | Registriert im Labor | low | "Registriert im Labor" is an invention. The English "Registered Scientist" has no good gender-neutral German equivalent that fits a small badge; every faithful option is either gendered or too long. |
| `profile.labMember` | Lab member | Labormitglied | medium | The "scientist" framing is awkward in gender-neutral German; rendered with neutral forms (Forschende, Forschungs-) throughout. Worth a native read. |
| `profile.labNotes` | Lab notes | Labornotizen | medium | The "scientist" framing is awkward in gender-neutral German; rendered with neutral forms (Forschende, Forschungs-) throughout. Worth a native read. |
| `profile.labNotesEmpty` | This scientist is currently observing reactions in silence. | Hier wird gerade still beobachtet – noch keine Labornotizen. | low | Rewritten rather than translated, because the English joke ("observing reactions in silence") does not carry. Check the new one is actually charming in German and not just odd. |
| `profile.favouriteCompound` | Favorite Compound | Lieblingsverbindung | medium | The "scientist" framing is awkward in gender-neutral German; rendered with neutral forms (Forschende, Forschungs-) throughout. Worth a native read. |
| `profile.achievements` | Achievements | Erfolge | medium | The "scientist" framing is awkward in gender-neutral German; rendered with neutral forms (Forschende, Forschungs-) throughout. Worth a native read. |
| `profile.statExperiments` | Experiments | Experimente | medium | The "scientist" framing is awkward in gender-neutral German; rendered with neutral forms (Forschende, Forschungs-) throughout. Worth a native read. |
| `profile.statLevel` | Level | Klasse | medium | The "scientist" framing is awkward in gender-neutral German; rendered with neutral forms (Forschende, Forschungs-) throughout. Worth a native read. |
| `profile.statStreak` | Day Streak | Tage in Folge | medium | The "scientist" framing is awkward in gender-neutral German; rendered with neutral forms (Forschende, Forschungs-) throughout. Worth a native read. |
| `profile.statAccuracy` | Accuracy | Trefferquote | medium | The "scientist" framing is awkward in gender-neutral German; rendered with neutral forms (Forschende, Forschungs-) throughout. Worth a native read. |
| `profile.editHeading` | Configure Equipment | Ausrüstung einstellen | medium | The "scientist" framing is awkward in gender-neutral German; rendered with neutral forms (Forschende, Forschungs-) throughout. Worth a native read. |
| `profile.editIntro` | Customize your laboratory preferences and public stats visibility. | Passe deine Laboreinstellungen an und lege fest, welche Statistiken öffentlich sichtbar sind. | medium | The "scientist" framing is awkward in gender-neutral German; rendered with neutral forms (Forschende, Forschungs-) throughout. Worth a native read. |
| `profile.identityHeading` | Scientist Identity | Forschungsidentität | medium | The "scientist" framing is awkward in gender-neutral German; rendered with neutral forms (Forschende, Forschungs-) throughout. Worth a native read. |
| `profile.alias` | Alias | Alias | medium | The "scientist" framing is awkward in gender-neutral German; rendered with neutral forms (Forschende, Forschungs-) throughout. Worth a native read. |
| `profile.aliasPlaceholder` | e.g. Curious Argon 4821 | z.·B. Neugieriges Argon 4821 | medium | The "scientist" framing is awkward in gender-neutral German; rendered with neutral forms (Forschende, Forschungs-) throughout. Worth a native read. |
| `profile.aliasHelp` | Shown publicly on the leaderboards. Choose a nickname, not your real name or email address. | Wird öffentlich auf den Bestenlisten angezeigt. Wähle einen Spitznamen, nicht deinen echten Namen oder deine E-Mail-Adresse. | medium | The "scientist" framing is awkward in gender-neutral German; rendered with neutral forms (Forschende, Forschungs-) throughout. Worth a native read. |
| `profile.customTitle` | Custom Title | Eigener Titel | medium | The "scientist" framing is awkward in gender-neutral German; rendered with neutral forms (Forschende, Forschungs-) throughout. Worth a native read. |
| `profile.customTitlePlaceholder` | e.g. Research Chemist | z.·B. Laborleitung | medium | The "scientist" framing is awkward in gender-neutral German; rendered with neutral forms (Forschende, Forschungs-) throughout. Worth a native read. |
| `profile.country` | Country / Region | Land / Region | medium | The "scientist" framing is awkward in gender-neutral German; rendered with neutral forms (Forschende, Forschungs-) throughout. Worth a native read. |
| `profile.countryPlaceholder` | e.g. Australia | z.·B. Australien | medium | The "scientist" framing is awkward in gender-neutral German; rendered with neutral forms (Forschende, Forschungs-) throughout. Worth a native read. |
| `profile.academicLevel` | Academic Level | Klassenstufe | medium | The "scientist" framing is awkward in gender-neutral German; rendered with neutral forms (Forschende, Forschungs-) throughout. Worth a native read. |
| `profile.academicLevelPlaceholder` | Select your year level... | Wähle deine Klassenstufe … | medium | The "scientist" framing is awkward in gender-neutral German; rendered with neutral forms (Forschende, Forschungs-) throughout. Worth a native read. |
| `profile.labNotesField` | Lab Notes (Bio) | Labornotizen (Über mich) | medium | The "scientist" framing is awkward in gender-neutral German; rendered with neutral forms (Forschende, Forschungs-) throughout. Worth a native read. |
| `profile.visibilityHeading` | Game Stats Visibility | Sichtbarkeit der Spielstatistiken | medium | The "scientist" framing is awkward in gender-neutral German; rendered with neutral forms (Forschende, Forschungs-) throughout. Worth a native read. |
| `profile.save` | Save Changes | Änderungen speichern | medium | The "scientist" framing is awkward in gender-neutral German; rendered with neutral forms (Forschende, Forschungs-) throughout. Worth a native read. |
| `profile.saving` | Saving... | Wird gespeichert … | medium | The "scientist" framing is awkward in gender-neutral German; rendered with neutral forms (Forschende, Forschungs-) throughout. Worth a native read. |
| `profile.dataHeading` | Your Data | Deine Daten | medium | The "scientist" framing is awkward in gender-neutral German; rendered with neutral forms (Forschende, Forschungs-) throughout. Worth a native read. |
| `profile.dataIntro` | Download a copy of what ChemGames stores about you, or delete your account. | Lade eine Kopie der Daten herunter, die ChemGames über dich speichert, oder lösche dein Konto. | medium | The "scientist" framing is awkward in gender-neutral German; rendered with neutral forms (Forschende, Forschungs-) throughout. Worth a native read. |
| `profile.exportHeading` | Download my data | Meine Daten herunterladen | medium | The "scientist" framing is awkward in gender-neutral German; rendered with neutral forms (Forschende, Forschungs-) throughout. Worth a native read. |
| `profile.exportBody` | A JSON file with your account details, profile, game sessions and progress. | Eine JSON-Datei mit deinen Kontodaten, deinem Profil, deinen Spielsitzungen und deinem Fortschritt. | medium | The "scientist" framing is awkward in gender-neutral German; rendered with neutral forms (Forschende, Forschungs-) throughout. Worth a native read. |
| `profile.exportAction` | Download my data | Meine Daten herunterladen | medium | The "scientist" framing is awkward in gender-neutral German; rendered with neutral forms (Forschende, Forschungs-) throughout. Worth a native read. |
| `profile.deleteHeading` | Delete account | Konto löschen | medium | The "scientist" framing is awkward in gender-neutral German; rendered with neutral forms (Forschende, Forschungs-) throughout. Worth a native read. |
| `profile.deleteBody` | This permanently and immediately removes your account, profile, scores, progress and leaderboard entries. It cannot be undone. | Damit werden dein Konto, dein Profil, deine Punkte, dein Fortschritt und deine Einträge in den Bestenlisten sofort und dauerhaft gelöscht. Das lässt sich nicht rückgängig machen. | medium | The "scientist" framing is awkward in gender-neutral German; rendered with neutral forms (Forschende, Forschungs-) throughout. Worth a native read. |
| `profile.deleteConfirmLabel` | Type {word} to confirm | Gib {word} ein, um zu bestätigen | medium | The "scientist" framing is awkward in gender-neutral German; rendered with neutral forms (Forschende, Forschungs-) throughout. Worth a native read. |
| `profile.deleteAction` | Delete my account | Mein Konto löschen | medium | The "scientist" framing is awkward in gender-neutral German; rendered with neutral forms (Forschende, Forschungs-) throughout. Worth a native read. |
| `profile.deletePending` | Deleting... | Wird gelöscht … | medium | The "scientist" framing is awkward in gender-neutral German; rendered with neutral forms (Forschende, Forschungs-) throughout. Worth a native read. |

### `profileToggles`

| Key | English | German | Confidence | Notes |
|---|---|---|---|---|
| `profileToggles.showCountry` | Show Country on Profile | Land im Profil anzeigen | high | Plain switch labels. |
| `profileToggles.showYearLevel` | Make Academic Level Public | Klassenstufe öffentlich zeigen | high | Plain switch labels. |
| `profileToggles.showLabNotes` | Make Lab Notes Public | Labornotizen öffentlich zeigen | high | Plain switch labels. |
| `profileToggles.showTotalSyntheses` | Show Total Syntheses Count | Anzahl der Synthesen anzeigen | high | Plain switch labels. |
| `profileToggles.showAccuracy` | Show Answer Accuracy % | Trefferquote in Prozent anzeigen | high | Plain switch labels. |
| `profileToggles.showCurrentStreak` | Show Daily Play Streak | Tagesserie anzeigen | high | Plain switch labels. |

### `serverMessages`

| Key | English | German | Confidence | Notes |
|---|---|---|---|---|
| `serverMessages.profileUnconfigured` | Database connection is currently unconfigured. | Die Datenbankverbindung ist zurzeit nicht konfiguriert. | high | Error and confirmation messages in plain German. Note the {word} placeholder stays the literal "DELETE": the action compares it byte for byte. |
| `serverMessages.profileLoginRequired` | Please log in before editing your configuration. | Bitte melde dich an, bevor du deine Einstellungen änderst. | high | Error and confirmation messages in plain German. Note the {word} placeholder stays the literal "DELETE": the action compares it byte for byte. |
| `serverMessages.profileSaveFailed` | Failed to update lab configuration. Please try again. | Die Laboreinstellungen konnten nicht gespeichert werden. Bitte versuche es noch einmal. | high | Error and confirmation messages in plain German. Note the {word} placeholder stays the literal "DELETE": the action compares it byte for byte. |
| `serverMessages.profileSaved` | Equipment configuration saved successfully! | Einstellungen erfolgreich gespeichert! | high | Error and confirmation messages in plain German. Note the {word} placeholder stays the literal "DELETE": the action compares it byte for byte. |
| `serverMessages.profileUnexpected` | An unexpected error occurred while saving changes. | Beim Speichern ist ein unerwarteter Fehler aufgetreten. | high | Error and confirmation messages in plain German. Note the {word} placeholder stays the literal "DELETE": the action compares it byte for byte. |
| `serverMessages.aliasLength` | Your alias must be between {min} and {max} characters. | Dein Alias muss zwischen {min} und {max} Zeichen lang sein. | high | Error and confirmation messages in plain German. Note the {word} placeholder stays the literal "DELETE": the action compares it byte for byte. |
| `serverMessages.aliasAtSign` | Your alias cannot contain an @ sign. Please choose a nickname, not an email address. | Dein Alias darf kein @-Zeichen enthalten. Bitte wähle einen Spitznamen, keine E-Mail-Adresse. | high | Error and confirmation messages in plain German. Note the {word} placeholder stays the literal "DELETE": the action compares it byte for byte. |
| `serverMessages.yearLevelInvalid` | Please choose a year level from the list. | Bitte wähle eine Klassenstufe aus der Liste. | high | Error and confirmation messages in plain German. Note the {word} placeholder stays the literal "DELETE": the action compares it byte for byte. |
| `serverMessages.deleteConfirmRequired` | Type {word} to confirm you want to delete your account. | Gib {word} ein, um zu bestätigen, dass du dein Konto löschen willst. | high | Error and confirmation messages in plain German. Note the {word} placeholder stays the literal "DELETE": the action compares it byte for byte. |
| `serverMessages.deleteUnavailable` | Account deletion is not available right now. Please try again later. | Das Löschen des Kontos ist zurzeit nicht möglich. Bitte versuche es später noch einmal. | high | Error and confirmation messages in plain German. Note the {word} placeholder stays the literal "DELETE": the action compares it byte for byte. |
| `serverMessages.deleteLoginRequired` | Please log in again before deleting your account. | Bitte melde dich erneut an, bevor du dein Konto löschst. | high | Error and confirmation messages in plain German. Note the {word} placeholder stays the literal "DELETE": the action compares it byte for byte. |
| `serverMessages.deleteFailed` | We could not delete your account. Please try again later. | Wir konnten dein Konto nicht löschen. Bitte versuche es später noch einmal. | high | Error and confirmation messages in plain German. Note the {word} placeholder stays the literal "DELETE": the action compares it byte for byte. |
| `serverMessages.exportUnavailable` | Data export is not available right now. | Der Datenexport ist zurzeit nicht verfügbar. | high | Error and confirmation messages in plain German. Note the {word} placeholder stays the literal "DELETE": the action compares it byte for byte. |
| `serverMessages.exportLoginRequired` | You need to be signed in to download your data. | Du musst angemeldet sein, um deine Daten herunterzuladen. | high | Error and confirmation messages in plain German. Note the {word} placeholder stays the literal "DELETE": the action compares it byte for byte. |
| `serverMessages.exportFailed` | We could not prepare your data export. Please try again later. | Wir konnten deinen Datenexport nicht vorbereiten. Bitte versuche es später noch einmal. | high | Error and confirmation messages in plain German. Note the {word} placeholder stays the literal "DELETE": the action compares it byte for byte. |
| `serverMessages.feedbackCategoryAndMessage` | Please choose a category and enter a message. | Bitte wähle eine Kategorie und schreib eine Nachricht. | high | Error and confirmation messages in plain German. Note the {word} placeholder stays the literal "DELETE": the action compares it byte for byte. |
| `serverMessages.feedbackCategoryInvalid` | Please choose a valid feedback category. | Bitte wähle eine gültige Feedback-Kategorie. | high | Error and confirmation messages in plain German. Note the {word} placeholder stays the literal "DELETE": the action compares it byte for byte. |
| `serverMessages.feedbackMessageRequired` | Please enter a message. | Bitte schreib eine Nachricht. | high | Error and confirmation messages in plain German. Note the {word} placeholder stays the literal "DELETE": the action compares it byte for byte. |
| `serverMessages.feedbackMessageTooLong` | Message is too long (maximum {max} characters). | Die Nachricht ist zu lang (höchstens {max} Zeichen). | high | Error and confirmation messages in plain German. Note the {word} placeholder stays the literal "DELETE": the action compares it byte for byte. |
| `serverMessages.feedbackRateLimited` | Too many submissions, please try again later. | Zu viele Einsendungen. Bitte versuche es später noch einmal. | high | Error and confirmation messages in plain German. Note the {word} placeholder stays the literal "DELETE": the action compares it byte for byte. |
| `serverMessages.feedbackUnconfigured` | Feedback service is not currently configured in this environment. | Der Feedback-Dienst ist in dieser Umgebung nicht konfiguriert. | high | Error and confirmation messages in plain German. Note the {word} placeholder stays the literal "DELETE": the action compares it byte for byte. |
| `serverMessages.feedbackStoreFailed` | Could not save your feedback right now. Please try again later. | Dein Feedback konnte gerade nicht gespeichert werden. Bitte versuche es später noch einmal. | high | Error and confirmation messages in plain German. Note the {word} placeholder stays the literal "DELETE": the action compares it byte for byte. |
| `serverMessages.feedbackEmailFailed` | Could not deliver your feedback right now. Please try again later. | Dein Feedback konnte gerade nicht zugestellt werden. Bitte versuche es später noch einmal. | high | Error and confirmation messages in plain German. Note the {word} placeholder stays the literal "DELETE": the action compares it byte for byte. |
| `serverMessages.feedbackUnexpected` | An unexpected error occurred while processing feedback. | Beim Verarbeiten des Feedbacks ist ein unerwarteter Fehler aufgetreten. | high | Error and confirmation messages in plain German. Note the {word} placeholder stays the literal "DELETE": the action compares it byte for byte. |

### `privacy`

| Key | English | German | Confidence | Notes |
|---|---|---|---|---|
| `privacy.heading` | Privacy | Datenschutz | low | Privacy-policy prose. I am not a lawyer and this is not legal review: the German says what the English says, but the phrasing has not been checked against German data-protection conventions. Note also that the page describes Australian law (Privacy Act 1988, the OAIC) — those names deliberately stay English inside German sentences, which is correct but reads oddly. If the site is ever actually offered to German or EU students, this page needs a GDPR/DSGVO review that is out of scope for a translation pass. |
| `privacy.intro` | What ChemGames stores about you, who can see it, and how to download or delete it. | Was ChemGames über dich speichert, wer es sehen kann und wie du es herunterlädst oder löschst. | low | Privacy-policy prose. I am not a lawyer and this is not legal review: the German says what the English says, but the phrasing has not been checked against German data-protection conventions. Note also that the page describes Australian law (Privacy Act 1988, the OAIC) — those names deliberately stay English inside German sentences, which is correct but reads oddly. If the site is ever actually offered to German or EU students, this page needs a GDPR/DSGVO review that is out of scope for a translation pass. |
| `privacy.effectiveDate` | Effective date: {date}. | Gültig ab: {date}. | low | Privacy-policy prose. I am not a lawyer and this is not legal review: the German says what the English says, but the phrasing has not been checked against German data-protection conventions. Note also that the page describes Australian law (Privacy Act 1988, the OAIC) — those names deliberately stay English inside German sentences, which is correct but reads oddly. If the site is ever actually offered to German or EU students, this page needs a GDPR/DSGVO review that is out of scope for a translation pass. |
| `privacy.whoWeAreHeading` | Who we are | Wer wir sind | low | Privacy-policy prose. I am not a lawyer and this is not legal review: the German says what the English says, but the phrasing has not been checked against German data-protection conventions. Note also that the page describes Australian law (Privacy Act 1988, the OAIC) — those names deliberately stay English inside German sentences, which is correct but reads oddly. If the site is ever actually offered to German or EU students, this page needs a GDPR/DSGVO review that is out of scope for a translation pass. |
| `privacy.whoWeAreBody` | ChemGames is run by Stella Slad, who is the data controller for the information described on this page. You can reach us at {email}. | ChemGames wird von Stella Slad betrieben. Sie ist für die auf dieser Seite beschriebenen Daten verantwortlich. Du erreichst uns unter {email}. | low | Privacy-policy prose. I am not a lawyer and this is not legal review: the German says what the English says, but the phrasing has not been checked against German data-protection conventions. Note also that the page describes Australian law (Privacy Act 1988, the OAIC) — those names deliberately stay English inside German sentences, which is correct but reads oddly. If the site is ever actually offered to German or EU students, this page needs a GDPR/DSGVO review that is out of scope for a translation pass. |
| `privacy.collectHeading` | What we collect | Was wir erheben | low | Privacy-policy prose. I am not a lawyer and this is not legal review: the German says what the English says, but the phrasing has not been checked against German data-protection conventions. Note also that the page describes Australian law (Privacy Act 1988, the OAIC) — those names deliberately stay English inside German sentences, which is correct but reads oddly. If the site is ever actually offered to German or EU students, this page needs a GDPR/DSGVO review that is out of scope for a translation pass. |
| `privacy.collectAccountLabel` | Account. | Konto. | low | Privacy-policy prose. I am not a lawyer and this is not legal review: the German says what the English says, but the phrasing has not been checked against German data-protection conventions. Note also that the page describes Australian law (Privacy Act 1988, the OAIC) — those names deliberately stay English inside German sentences, which is correct but reads oddly. If the site is ever actually offered to German or EU students, this page needs a GDPR/DSGVO review that is out of scope for a translation pass. |
| `privacy.collectAccountBody` | Your email address and a password hash, stored by Supabase Auth. If you choose Google sign-in, we receive your Google account name, email address and avatar URL instead of a password. | Deine E-Mail-Adresse und einen Passwort-Hash, gespeichert von Supabase Auth. Wenn du dich mit Google anmeldest, erhalten wir statt eines Passworts deinen Google-Kontonamen, deine E-Mail-Adresse und die URL deines Profilbilds. | low | Privacy-policy prose. I am not a lawyer and this is not legal review: the German says what the English says, but the phrasing has not been checked against German data-protection conventions. Note also that the page describes Australian law (Privacy Act 1988, the OAIC) — those names deliberately stay English inside German sentences, which is correct but reads oddly. If the site is ever actually offered to German or EU students, this page needs a GDPR/DSGVO review that is out of scope for a translation pass. |
| `privacy.collectProfileLabel` | Profile. | Profil. | low | Privacy-policy prose. I am not a lawyer and this is not legal review: the German says what the English says, but the phrasing has not been checked against German data-protection conventions. Note also that the page describes Australian law (Privacy Act 1988, the OAIC) — those names deliberately stay English inside German sentences, which is correct but reads oddly. If the site is ever actually offered to German or EU students, this page needs a GDPR/DSGVO review that is out of scope for a translation pass. |
| `privacy.collectProfileBody` | An alias, plus optional fields you can fill in: a title, your country, year level, lab notes, a favourite element and compound, and any badges you earn. We also store your visibility toggles, which decide what other people can see. Aliases are generated for you and contain no real name. You can change yours at {link}. | Einen Alias sowie optionale Angaben, die du selbst ausfüllen kannst: einen Titel, dein Land, deine Klassenstufe, Labornotizen, ein Lieblingselement und eine Lieblingsverbindung sowie alle Abzeichen, die du sammelst. Außerdem speichern wir deine Sichtbarkeitsschalter, die festlegen, was andere sehen können. Aliasse werden für dich erzeugt und enthalten keinen echten Namen. Du kannst deinen unter {link} ändern. | low | Privacy-policy prose. I am not a lawyer and this is not legal review: the German says what the English says, but the phrasing has not been checked against German data-protection conventions. Note also that the page describes Australian law (Privacy Act 1988, the OAIC) — those names deliberately stay English inside German sentences, which is correct but reads oddly. If the site is ever actually offered to German or EU students, this page needs a GDPR/DSGVO review that is out of scope for a translation pass. |
| `privacy.collectGameplayLabel` | Gameplay. | Spielverlauf. | low | Privacy-policy prose. I am not a lawyer and this is not legal review: the German says what the English says, but the phrasing has not been checked against German data-protection conventions. Note also that the page describes Australian law (Privacy Act 1988, the OAIC) — those names deliberately stay English inside German sentences, which is correct but reads oddly. If the site is ever actually offered to German or EU students, this page needs a GDPR/DSGVO review that is out of scope for a translation pass. |
| `privacy.collectGameplayBody` | Each time you finish a game we record which game it was, your score, the level you reached, the outcome, how long you played and when. From these we keep your best score and level for each game, and derived stats on your profile such as your streak and accuracy. | Jedes Mal, wenn du ein Spiel beendest, speichern wir, welches Spiel es war, deine Punktzahl, das erreichte Level, das Ergebnis, wie lange du gespielt hast und wann. Daraus behalten wir deinen besten Wert und dein höchstes Level je Spiel sowie abgeleitete Statistiken in deinem Profil, etwa deine Serie und deine Trefferquote. | low | Privacy-policy prose. I am not a lawyer and this is not legal review: the German says what the English says, but the phrasing has not been checked against German data-protection conventions. Note also that the page describes Australian law (Privacy Act 1988, the OAIC) — those names deliberately stay English inside German sentences, which is correct but reads oddly. If the site is ever actually offered to German or EU students, this page needs a GDPR/DSGVO review that is out of scope for a translation pass. |
| `privacy.collectFeedbackLabel` | Feedback. | Feedback. | low | Privacy-policy prose. I am not a lawyer and this is not legal review: the German says what the English says, but the phrasing has not been checked against German data-protection conventions. Note also that the page describes Australian law (Privacy Act 1988, the OAIC) — those names deliberately stay English inside German sentences, which is correct but reads oddly. If the site is ever actually offered to German or EU students, this page needs a GDPR/DSGVO review that is out of scope for a translation pass. |
| `privacy.collectFeedbackBody` | When you use the feedback button we store the category, your message and the page you were on. We also store your account id if you are signed in, and a hashed, non-reversible identifier used only to limit abuse. | Wenn du die Feedback-Schaltfläche nutzt, speichern wir die Kategorie, deine Nachricht und die Seite, auf der du warst. Außerdem speichern wir deine Konto-ID, falls du angemeldet bist, und eine gehashte, nicht umkehrbare Kennung, die nur dazu dient, Missbrauch zu begrenzen. | low | Privacy-policy prose. I am not a lawyer and this is not legal review: the German says what the English says, but the phrasing has not been checked against German data-protection conventions. Note also that the page describes Australian law (Privacy Act 1988, the OAIC) — those names deliberately stay English inside German sentences, which is correct but reads oddly. If the site is ever actually offered to German or EU students, this page needs a GDPR/DSGVO review that is out of scope for a translation pass. |
| `privacy.publicHeading` | What is public | Was öffentlich ist | low | Privacy-policy prose. I am not a lawyer and this is not legal review: the German says what the English says, but the phrasing has not been checked against German data-protection conventions. Note also that the page describes Australian law (Privacy Act 1988, the OAIC) — those names deliberately stay English inside German sentences, which is correct but reads oddly. If the site is ever actually offered to German or EU students, this page needs a GDPR/DSGVO review that is out of scope for a translation pass. |
| `privacy.publicBody1` | Your alias and your best score for each game appear on the public leaderboards, which anyone can see. | Dein Alias und dein bester Wert je Spiel erscheinen auf den öffentlichen Bestenlisten, die alle sehen können. | low | Privacy-policy prose. I am not a lawyer and this is not legal review: the German says what the English says, but the phrasing has not been checked against German data-protection conventions. Note also that the page describes Australian law (Privacy Act 1988, the OAIC) — those names deliberately stay English inside German sentences, which is correct but reads oddly. If the site is ever actually offered to German or EU students, this page needs a GDPR/DSGVO review that is out of scope for a translation pass. |
| `privacy.publicBody2` | Other profile fields, such as your country, year level, lab notes and game stats, are only shown where you switch the matching toggle on at {link}. All toggles except the joined date are off by default. Your title, favourite element and compound, and any badges are always shown with your alias. | Andere Profilangaben wie dein Land, deine Klassenstufe, deine Labornotizen und deine Spielstatistiken werden nur angezeigt, wenn du den passenden Schalter unter {link} einschaltest. Außer dem Beitrittsdatum sind alle Schalter standardmäßig aus. Dein Titel, dein Lieblingselement, deine Lieblingsverbindung und deine Abzeichen werden immer zusammen mit deinem Alias angezeigt. | low | Privacy-policy prose. I am not a lawyer and this is not legal review: the German says what the English says, but the phrasing has not been checked against German data-protection conventions. Note also that the page describes Australian law (Privacy Act 1988, the OAIC) — those names deliberately stay English inside German sentences, which is correct but reads oddly. If the site is ever actually offered to German or EU students, this page needs a GDPR/DSGVO review that is out of scope for a translation pass. |
| `privacy.cookiesHeading` | Cookies and local storage | Cookies und lokaler Speicher | low | Privacy-policy prose. I am not a lawyer and this is not legal review: the German says what the English says, but the phrasing has not been checked against German data-protection conventions. Note also that the page describes Australian law (Privacy Act 1988, the OAIC) — those names deliberately stay English inside German sentences, which is correct but reads oddly. If the site is ever actually offered to German or EU students, this page needs a GDPR/DSGVO review that is out of scope for a translation pass. |
| `privacy.cookiesBody1` | Signing in sets Supabase authentication session cookies. They are strictly necessary to keep you logged in. | Beim Anmelden werden Sitzungs-Cookies von Supabase gesetzt. Sie sind unbedingt erforderlich, damit du angemeldet bleibst. | low | Privacy-policy prose. I am not a lawyer and this is not legal review: the German says what the English says, but the phrasing has not been checked against German data-protection conventions. Note also that the page describes Australian law (Privacy Act 1988, the OAIC) — those names deliberately stay English inside German sentences, which is correct but reads oddly. If the site is ever actually offered to German or EU students, this page needs a GDPR/DSGVO review that is out of scope for a translation pass. |
| `privacy.cookiesBody2` | We also set one preference cookie that remembers the language you chose, so the site opens in that language next time. It holds nothing but a language code. | Außerdem setzen wir ein Einstellungs-Cookie, das sich die von dir gewählte Sprache merkt, damit die Seite beim nächsten Mal in dieser Sprache öffnet. Es enthält nichts außer einem Sprachkürzel. | medium | New paragraph, not a translation: the language-preference cookie this feature introduces had to be disclosed. Review the English too. |
| `privacy.cookiesBody3` | Your browser’s local storage holds your sound, theme and “instructions seen” preferences. That data stays on your device and is not sent to us. | Im lokalen Speicher deines Browsers liegen deine Einstellungen für Ton, Design und „Anleitung gesehen“. Diese Daten bleiben auf deinem Gerät und werden nicht an uns gesendet. | low | Privacy-policy prose. I am not a lawyer and this is not legal review: the German says what the English says, but the phrasing has not been checked against German data-protection conventions. Note also that the page describes Australian law (Privacy Act 1988, the OAIC) — those names deliberately stay English inside German sentences, which is correct but reads oddly. If the site is ever actually offered to German or EU students, this page needs a GDPR/DSGVO review that is out of scope for a translation pass. |
| `privacy.cookiesBody4` | We do not use analytics, advertising or third-party tracking. | Wir nutzen keine Analyse-, Werbe- oder Tracking-Dienste von Dritten. | low | Privacy-policy prose. I am not a lawyer and this is not legal review: the German says what the English says, but the phrasing has not been checked against German data-protection conventions. Note also that the page describes Australian law (Privacy Act 1988, the OAIC) — those names deliberately stay English inside German sentences, which is correct but reads oddly. If the site is ever actually offered to German or EU students, this page needs a GDPR/DSGVO review that is out of scope for a translation pass. |
| `privacy.processorsHeading` | Who processes it | Wer die Daten verarbeitet | low | Privacy-policy prose. I am not a lawyer and this is not legal review: the German says what the English says, but the phrasing has not been checked against German data-protection conventions. Note also that the page describes Australian law (Privacy Act 1988, the OAIC) — those names deliberately stay English inside German sentences, which is correct but reads oddly. If the site is ever actually offered to German or EU students, this page needs a GDPR/DSGVO review that is out of scope for a translation pass. |
| `privacy.processorSupabaseLabel` | Supabase | Supabase | low | Privacy-policy prose. I am not a lawyer and this is not legal review: the German says what the English says, but the phrasing has not been checked against German data-protection conventions. Note also that the page describes Australian law (Privacy Act 1988, the OAIC) — those names deliberately stay English inside German sentences, which is correct but reads oddly. If the site is ever actually offered to German or EU students, this page needs a GDPR/DSGVO review that is out of scope for a translation pass. |
| `privacy.processorSupabaseBody` | hosts the database and handles authentication. | betreibt die Datenbank und wickelt die Anmeldung ab. | low | Privacy-policy prose. I am not a lawyer and this is not legal review: the German says what the English says, but the phrasing has not been checked against German data-protection conventions. Note also that the page describes Australian law (Privacy Act 1988, the OAIC) — those names deliberately stay English inside German sentences, which is correct but reads oddly. If the site is ever actually offered to German or EU students, this page needs a GDPR/DSGVO review that is out of scope for a translation pass. |
| `privacy.processorResendLabel` | Resend | Resend | low | Privacy-policy prose. I am not a lawyer and this is not legal review: the German says what the English says, but the phrasing has not been checked against German data-protection conventions. Note also that the page describes Australian law (Privacy Act 1988, the OAIC) — those names deliberately stay English inside German sentences, which is correct but reads oddly. If the site is ever actually offered to German or EU students, this page needs a GDPR/DSGVO review that is out of scope for a translation pass. |
| `privacy.processorResendBody` | delivers feedback emails to us. | stellt uns die Feedback-E-Mails zu. | low | Privacy-policy prose. I am not a lawyer and this is not legal review: the German says what the English says, but the phrasing has not been checked against German data-protection conventions. Note also that the page describes Australian law (Privacy Act 1988, the OAIC) — those names deliberately stay English inside German sentences, which is correct but reads oddly. If the site is ever actually offered to German or EU students, this page needs a GDPR/DSGVO review that is out of scope for a translation pass. |
| `privacy.processorGoogleLabel` | Google | Google | low | Privacy-policy prose. I am not a lawyer and this is not legal review: the German says what the English says, but the phrasing has not been checked against German data-protection conventions. Note also that the page describes Australian law (Privacy Act 1988, the OAIC) — those names deliberately stay English inside German sentences, which is correct but reads oddly. If the site is ever actually offered to German or EU students, this page needs a GDPR/DSGVO review that is out of scope for a translation pass. |
| `privacy.processorGoogleBody` | only if you use Google sign-in. | nur, wenn du die Google-Anmeldung nutzt. | low | Privacy-policy prose. I am not a lawyer and this is not legal review: the German says what the English says, but the phrasing has not been checked against German data-protection conventions. Note also that the page describes Australian law (Privacy Act 1988, the OAIC) — those names deliberately stay English inside German sentences, which is correct but reads oddly. If the site is ever actually offered to German or EU students, this page needs a GDPR/DSGVO review that is out of scope for a translation pass. |
| `privacy.processorHosting` | The hosting provider that serves the site. | Der Hosting-Anbieter, der die Seite ausliefert. | low | Privacy-policy prose. I am not a lawyer and this is not legal review: the German says what the English says, but the phrasing has not been checked against German data-protection conventions. Note also that the page describes Australian law (Privacy Act 1988, the OAIC) — those names deliberately stay English inside German sentences, which is correct but reads oddly. If the site is ever actually offered to German or EU students, this page needs a GDPR/DSGVO review that is out of scope for a translation pass. |
| `privacy.processorsTransport` | Data is transmitted over HTTPS. | Die Daten werden über HTTPS übertragen. | low | Privacy-policy prose. I am not a lawyer and this is not legal review: the German says what the English says, but the phrasing has not been checked against German data-protection conventions. Note also that the page describes Australian law (Privacy Act 1988, the OAIC) — those names deliberately stay English inside German sentences, which is correct but reads oddly. If the site is ever actually offered to German or EU students, this page needs a GDPR/DSGVO review that is out of scope for a translation pass. |
| `privacy.retentionHeading` | How long we keep it | Wie lange wir die Daten speichern | low | Privacy-policy prose. I am not a lawyer and this is not legal review: the German says what the English says, but the phrasing has not been checked against German data-protection conventions. Note also that the page describes Australian law (Privacy Act 1988, the OAIC) — those names deliberately stay English inside German sentences, which is correct but reads oddly. If the site is ever actually offered to German or EU students, this page needs a GDPR/DSGVO review that is out of scope for a translation pass. |
| `privacy.retentionBody1` | We keep your data for as long as your account exists. | Wir speichern deine Daten, solange dein Konto besteht. | low | Privacy-policy prose. I am not a lawyer and this is not legal review: the German says what the English says, but the phrasing has not been checked against German data-protection conventions. Note also that the page describes Australian law (Privacy Act 1988, the OAIC) — those names deliberately stay English inside German sentences, which is correct but reads oddly. If the site is ever actually offered to German or EU students, this page needs a GDPR/DSGVO review that is out of scope for a translation pass. |
| `privacy.retentionBody2` | When you delete your account, your profile, game sessions, progress and leaderboard entries are deleted immediately. Feedback you sent is kept but anonymised, because the reference to your account is removed. | Wenn du dein Konto löschst, werden dein Profil, deine Spielsitzungen, dein Fortschritt und deine Einträge in den Bestenlisten sofort gelöscht. Gesendetes Feedback bleibt erhalten, wird aber anonymisiert, weil der Bezug zu deinem Konto entfernt wird. | low | Privacy-policy prose. I am not a lawyer and this is not legal review: the German says what the English says, but the phrasing has not been checked against German data-protection conventions. Note also that the page describes Australian law (Privacy Act 1988, the OAIC) — those names deliberately stay English inside German sentences, which is correct but reads oddly. If the site is ever actually offered to German or EU students, this page needs a GDPR/DSGVO review that is out of scope for a translation pass. |
| `privacy.choicesHeading` | Your choices | Deine Möglichkeiten | low | Privacy-policy prose. I am not a lawyer and this is not legal review: the German says what the English says, but the phrasing has not been checked against German data-protection conventions. Note also that the page describes Australian law (Privacy Act 1988, the OAIC) — those names deliberately stay English inside German sentences, which is correct but reads oddly. If the site is ever actually offered to German or EU students, this page needs a GDPR/DSGVO review that is out of scope for a translation pass. |
| `privacy.choicesEdit` | Edit your profile and visibility toggles at {link}. | Bearbeite dein Profil und deine Sichtbarkeitsschalter unter {link}. | low | Privacy-policy prose. I am not a lawyer and this is not legal review: the German says what the English says, but the phrasing has not been checked against German data-protection conventions. Note also that the page describes Australian law (Privacy Act 1988, the OAIC) — those names deliberately stay English inside German sentences, which is correct but reads oddly. If the site is ever actually offered to German or EU students, this page needs a GDPR/DSGVO review that is out of scope for a translation pass. |
| `privacy.choicesDownload` | Download a copy of your data from the same page. | Lade auf derselben Seite eine Kopie deiner Daten herunter. | low | Privacy-policy prose. I am not a lawyer and this is not legal review: the German says what the English says, but the phrasing has not been checked against German data-protection conventions. Note also that the page describes Australian law (Privacy Act 1988, the OAIC) — those names deliberately stay English inside German sentences, which is correct but reads oddly. If the site is ever actually offered to German or EU students, this page needs a GDPR/DSGVO review that is out of scope for a translation pass. |
| `privacy.choicesDelete` | Delete your account from the same page. | Lösche dein Konto auf derselben Seite. | low | Privacy-policy prose. I am not a lawyer and this is not legal review: the German says what the English says, but the phrasing has not been checked against German data-protection conventions. Note also that the page describes Australian law (Privacy Act 1988, the OAIC) — those names deliberately stay English inside German sentences, which is correct but reads oddly. If the site is ever actually offered to German or EU students, this page needs a GDPR/DSGVO review that is out of scope for a translation pass. |
| `privacy.choicesEmail` | Or email us at {email} and we will help. | Oder schreib uns an {email}, dann helfen wir dir. | low | Privacy-policy prose. I am not a lawyer and this is not legal review: the German says what the English says, but the phrasing has not been checked against German data-protection conventions. Note also that the page describes Australian law (Privacy Act 1988, the OAIC) — those names deliberately stay English inside German sentences, which is correct but reads oddly. If the site is ever actually offered to German or EU students, this page needs a GDPR/DSGVO review that is out of scope for a translation pass. |
| `privacy.childrenHeading` | Children and students | Kinder und Jugendliche | low | Privacy-policy prose. I am not a lawyer and this is not legal review: the German says what the English says, but the phrasing has not been checked against German data-protection conventions. Note also that the page describes Australian law (Privacy Act 1988, the OAIC) — those names deliberately stay English inside German sentences, which is correct but reads oddly. If the site is ever actually offered to German or EU students, this page needs a GDPR/DSGVO review that is out of scope for a translation pass. |
| `privacy.childrenBody1` | ChemGames is designed for secondary-school students, so we collect the minimum needed to run the games and keep scores. | ChemGames ist für die Sekundarstufe gemacht. Deshalb erheben wir nur das Nötigste, um die Spiele zu betreiben und Punkte zu speichern. | low | Privacy-policy prose. I am not a lawyer and this is not legal review: the German says what the English says, but the phrasing has not been checked against German data-protection conventions. Note also that the page describes Australian law (Privacy Act 1988, the OAIC) — those names deliberately stay English inside German sentences, which is correct but reads oddly. If the site is ever actually offered to German or EU students, this page needs a GDPR/DSGVO review that is out of scope for a translation pass. |
| `privacy.childrenBody2` | No real name is required. Aliases are generated for you, contain no real name, and can be changed at {link}. | Ein echter Name ist nicht erforderlich. Aliasse werden für dich erzeugt, enthalten keinen echten Namen und lassen sich unter {link} ändern. | low | Privacy-policy prose. I am not a lawyer and this is not legal review: the German says what the English says, but the phrasing has not been checked against German data-protection conventions. Note also that the page describes Australian law (Privacy Act 1988, the OAIC) — those names deliberately stay English inside German sentences, which is correct but reads oddly. If the site is ever actually offered to German or EU students, this page needs a GDPR/DSGVO review that is out of scope for a translation pass. |
| `privacy.childrenBody3` | Parents, guardians or teachers can contact us at {email} to ask for a student’s account and data to be deleted. | Eltern, Erziehungsberechtigte oder Lehrkräfte können uns unter {email} schreiben, um das Konto und die Daten einer Schülerin oder eines Schülers löschen zu lassen. | low | Privacy-policy prose. I am not a lawyer and this is not legal review: the German says what the English says, but the phrasing has not been checked against German data-protection conventions. Note also that the page describes Australian law (Privacy Act 1988, the OAIC) — those names deliberately stay English inside German sentences, which is correct but reads oddly. If the site is ever actually offered to German or EU students, this page needs a GDPR/DSGVO review that is out of scope for a translation pass. |
| `privacy.legalHeading` | Legal | Rechtliches | low | Privacy-policy prose. I am not a lawyer and this is not legal review: the German says what the English says, but the phrasing has not been checked against German data-protection conventions. Note also that the page describes Australian law (Privacy Act 1988, the OAIC) — those names deliberately stay English inside German sentences, which is correct but reads oddly. If the site is ever actually offered to German or EU students, this page needs a GDPR/DSGVO review that is out of scope for a translation pass. |
| `privacy.legalBody1` | We handle personal information in line with the Australian Privacy Act 1988 and the Australian Privacy Principles. | Wir gehen mit personenbezogenen Daten im Einklang mit dem australischen Privacy Act 1988 und den Australian Privacy Principles um. | low | Privacy-policy prose. I am not a lawyer and this is not legal review: the German says what the English says, but the phrasing has not been checked against German data-protection conventions. Note also that the page describes Australian law (Privacy Act 1988, the OAIC) — those names deliberately stay English inside German sentences, which is correct but reads oddly. If the site is ever actually offered to German or EU students, this page needs a GDPR/DSGVO review that is out of scope for a translation pass. |
| `privacy.legalBody2` | If you have a complaint, please contact us first. If you are not satisfied with our response, you can complain to the Office of the Australian Information Commissioner at {link}. | Wenn du eine Beschwerde hast, wende dich bitte zuerst an uns. Bist du mit unserer Antwort nicht zufrieden, kannst du dich beim Office of the Australian Information Commissioner unter {link} beschweren. | low | Privacy-policy prose. I am not a lawyer and this is not legal review: the German says what the English says, but the phrasing has not been checked against German data-protection conventions. Note also that the page describes Australian law (Privacy Act 1988, the OAIC) — those names deliberately stay English inside German sentences, which is correct but reads oddly. If the site is ever actually offered to German or EU students, this page needs a GDPR/DSGVO review that is out of scope for a translation pass. |
| `privacy.changesHeading` | Changes to this page | Änderungen an dieser Seite | low | Privacy-policy prose. I am not a lawyer and this is not legal review: the German says what the English says, but the phrasing has not been checked against German data-protection conventions. Note also that the page describes Australian law (Privacy Act 1988, the OAIC) — those names deliberately stay English inside German sentences, which is correct but reads oddly. If the site is ever actually offered to German or EU students, this page needs a GDPR/DSGVO review that is out of scope for a translation pass. |
| `privacy.changesBody` | If our practices change, we will update this page and the effective date at the top. | Wenn sich unsere Abläufe ändern, aktualisieren wir diese Seite und das Datum oben. | low | Privacy-policy prose. I am not a lawyer and this is not legal review: the German says what the English says, but the phrasing has not been checked against German data-protection conventions. Note also that the page describes Australian law (Privacy Act 1988, the OAIC) — those names deliberately stay English inside German sentences, which is correct but reads oddly. If the site is ever actually offered to German or EU students, this page needs a GDPR/DSGVO review that is out of scope for a translation pass. |

### `cheatSheetCategories`

| Key | English | German | Confidence | Notes |
|---|---|---|---|---|
| `cheatSheetCategories.Fundamentals` | Fundamentals | Grundlagen | medium | No specific note; reviewed as ordinary UI copy. |
| `cheatSheetCategories.Reactions` | Reactions | Reaktionen | medium | No specific note; reviewed as ordinary UI copy. |
| `cheatSheetCategories.Acids & Bases` | Acids & Bases | Säuren und Basen | medium | No specific note; reviewed as ordinary UI copy. |
| `cheatSheetCategories.Equations` | Equations | Gleichungen | medium | No specific note; reviewed as ordinary UI copy. |
| `cheatSheetCategories.Thermodynamics` | Thermodynamics | Thermodynamik | medium | No specific note; reviewed as ordinary UI copy. |
| `cheatSheetCategories.Organic` | Organic | Organische Chemie | medium | No specific note; reviewed as ordinary UI copy. |
| `cheatSheetCategories.Bonding` | Bonding | Bindungslehre | medium | No specific note; reviewed as ordinary UI copy. |
| `cheatSheetCategories.Nomenclature` | Nomenclature | Nomenklatur | medium | No specific note; reviewed as ordinary UI copy. |
| `cheatSheetCategories.Stoichiometry` | Stoichiometry | Stöchiometrie | medium | No specific note; reviewed as ordinary UI copy. |

### `yearLevels`

| Key | English | German | Confidence | Notes |
|---|---|---|---|---|
| `yearLevels.all` | All | Alle | high | "Klasse 7-10" and "Oberstufe" are the German school-year labels. Note the stored value stays the English "Year 9"; only the label is translated. |
| `yearLevels.Year 7` | Year 7 | Klasse 7 | high | "Klasse 7-10" and "Oberstufe" are the German school-year labels. Note the stored value stays the English "Year 9"; only the label is translated. |
| `yearLevels.Year 8` | Year 8 | Klasse 8 | high | "Klasse 7-10" and "Oberstufe" are the German school-year labels. Note the stored value stays the English "Year 9"; only the label is translated. |
| `yearLevels.Year 9` | Year 9 | Klasse 9 | high | "Klasse 7-10" and "Oberstufe" are the German school-year labels. Note the stored value stays the English "Year 9"; only the label is translated. |
| `yearLevels.Year 10` | Year 10 | Klasse 10 | high | "Klasse 7-10" and "Oberstufe" are the German school-year labels. Note the stored value stays the English "Year 9"; only the label is translated. |
| `yearLevels.Senior` | Senior | Oberstufe | high | "Klasse 7-10" and "Oberstufe" are the German school-year labels. Note the stored value stays the English "Year 9"; only the label is translated. |

### `leaderboards`

| Key | English | German | Confidence | Notes |
|---|---|---|---|---|
| `leaderboards.heading` | Leaderboards | Bestenlisten | medium | "Highscore" and "Bestenliste" are both standard. The empty states are free renderings. |
| `leaderboards.intro` | Compare high scores across every experiment. | Vergleiche die Highscores aus allen Experimenten. | medium | "Highscore" and "Bestenliste" are both standard. The empty states are free renderings. |
| `leaderboards.topScientists` | Top scientists | Beste Forschende | medium | "Highscore" and "Bestenliste" are both standard. The empty states are free renderings. |
| `leaderboards.globalNetwork` | Global network | Globales Netzwerk | medium | "Highscore" and "Bestenliste" are both standard. The empty states are free renderings. |
| `leaderboards.emptyTitle` | The podium is waiting. | Das Podium wartet. | medium | "Highscore" and "Bestenliste" are both standard. The empty states are free renderings. |
| `leaderboards.emptyBody` | Play the first round and claim the top spot. | Spiel die erste Runde und sichere dir Platz 1. | medium | "Highscore" and "Bestenliste" are both standard. The empty states are free renderings. |
| `leaderboards.rank` | Rank | Platz | medium | "Highscore" and "Bestenliste" are both standard. The empty states are free renderings. |
| `leaderboards.rankA11y` | Rank | Platz | medium | "Highscore" and "Bestenliste" are both standard. The empty states are free renderings. |
| `leaderboards.points` | Points | Punkte | medium | "Highscore" and "Bestenliste" are both standard. The empty states are free renderings. |
| `leaderboards.recorded` | Recorded {date} | Aufgezeichnet am {date} | medium | "Highscore" and "Bestenliste" are both standard. The empty states are free renderings. |
| `leaderboards.myResults` | My lab results | Meine Laborergebnisse | medium | "Highscore" and "Bestenliste" are both standard. The empty states are free renderings. |
| `leaderboards.highScore` | High score | Highscore | medium | "Highscore" and "Bestenliste" are both standard. The empty states are free renderings. |
| `leaderboards.unranked` | Unranked | Ohne Platzierung | medium | "Highscore" and "Bestenliste" are both standard. The empty states are free renderings. |
| `leaderboards.firstResultTitle` | Ready for your first result? | Bereit für dein erstes Ergebnis? | medium | "Highscore" and "Bestenliste" are both standard. The empty states are free renderings. |
| `leaderboards.firstResultBody` | Play a round to set a high score. | Spiel eine Runde und setze einen Highscore. | medium | "Highscore" and "Bestenliste" are both standard. The empty states are free renderings. |
| `leaderboards.noData` | No data synthesized yet. Be the first! | Noch nichts synthetisiert. Mach den Anfang! | low | "Noch nichts synthetisiert. Mach den Anfang!" — the English pun on "synthesized" is half-kept. May read as a non sequitur. |

### `feedback`

| Key | English | German | Confidence | Notes |
|---|---|---|---|---|
| `feedback.openA11y` | Open feedback menu | Feedback-Menü öffnen | high | "Feedback" is an established German loanword; the category labels are plain nouns. |
| `feedback.trigger` | Feedback | Feedback | high | "Feedback" is an established German loanword; the category labels are plain nouns. |
| `feedback.heading` | ChemGames Feedback | ChemGames-Feedback | high | "Feedback" is an established German loanword; the category labels are plain nouns. |
| `feedback.closeA11y` | Close feedback | Feedback schließen | high | "Feedback" is an established German loanword; the category labels are plain nouns. |
| `feedback.sentTitle` | Feedback sent! | Feedback gesendet! | high | "Feedback" is an established German loanword; the category labels are plain nouns. |
| `feedback.sentBody` | Thank you for helping us refine ChemGames. | Danke, dass du hilfst, ChemGames besser zu machen. | high | "Feedback" is an established German loanword; the category labels are plain nouns. |
| `feedback.categoryBug` | Bug | Fehler | high | "Feedback" is an established German loanword; the category labels are plain nouns. |
| `feedback.categoryChemistry` | Data | Daten | high | "Feedback" is an established German loanword; the category labels are plain nouns. |
| `feedback.categoryFeature` | Idea | Idee | high | "Feedback" is an established German loanword; the category labels are plain nouns. |
| `feedback.placeholderBug` | What went wrong on this page? | Was ist auf dieser Seite schiefgelaufen? | high | "Feedback" is an established German loanword; the category labels are plain nouns. |
| `feedback.placeholderChemistry` | Spot an incorrect valency or formula? | Stimmt eine Wertigkeit oder eine Formel nicht? | high | "Feedback" is an established German loanword; the category labels are plain nouns. |
| `feedback.placeholderFeature` | What feature would make this game better? | Welche Funktion würde dieses Spiel besser machen? | high | "Feedback" is an established German loanword; the category labels are plain nouns. |
| `feedback.submit` | Send Feedback | Feedback senden | high | "Feedback" is an established German loanword; the category labels are plain nouns. |
| `feedback.submitting` | Submitting... | Wird gesendet … | high | "Feedback" is an established German loanword; the category labels are plain nouns. |
| `feedback.genericError` | Failed to send feedback. | Feedback konnte nicht gesendet werden. | high | "Feedback" is an established German loanword; the category labels are plain nouns. |

### `settings`

| Key | English | German | Confidence | Notes |
|---|---|---|---|---|
| `settings.gameTitle` | Game Settings | Spieleinstellungen | high | Standard settings vocabulary. |
| `settings.globalTitle` | Settings | Einstellungen | high | Standard settings vocabulary. |
| `settings.closeA11y` | Close settings | Einstellungen schließen | high | Standard settings vocabulary. |
| `settings.appearance` | Appearance | Darstellung | high | Standard settings vocabulary. |
| `settings.thisGame` | This game | Dieses Spiel | high | Standard settings vocabulary. |
| `settings.allGamesDefault` | All games default | Standard für alle Spiele | high | Standard settings vocabulary. |
| `settings.allGames` | All games | Alle Spiele | high | Standard settings vocabulary. |
| `settings.useGlobal` | Use global | Standard nutzen | medium | Rendered as "Standard nutzen" rather than a literal "Global übernehmen": German readers understand the concept better as "use the default". settings.overrideHelp quotes the same wording, so the two must change together. |
| `settings.dark` | Dark | Dunkel | high | Standard settings vocabulary. |
| `settings.light` | Light | Hell | high | Standard settings vocabulary. |
| `settings.overrideHelp` | A game-specific choice overrides the all-games default. Choose “Use global” to follow it again. | Eine Einstellung für ein einzelnes Spiel hat Vorrang vor dem Standard für alle Spiele. Wähle „Standard nutzen“, um wieder dem Standard zu folgen. | high | Standard settings vocabulary. |
| `settings.audio` | Audio | Audio | high | Standard settings vocabulary. |
| `settings.soundEffects` | Sound Effects | Soundeffekte | high | Standard settings vocabulary. |
| `settings.volumeA11y` | Sound volume | Lautstärke | high | Standard settings vocabulary. |

### `cheatSheets`

| Key | English | German | Confidence | Notes |
|---|---|---|---|---|
| `cheatSheets.heading` | Lab Cheat Sheets | Spickzettel fürs Labor | high | Section headings for the reference pages. |
| `cheatSheets.intro` | Quick chemical formulas, reaction rules, and equation references grouped by year level. | Kurze Übersichten zu chemischen Formeln, Reaktionsregeln und Gleichungen – nach Klassenstufe sortiert. | high | Section headings for the reference pages. |
| `cheatSheets.backToList` | Back to Cheat Sheets | Zurück zu den Spickzetteln | high | Section headings for the reference pages. |
| `cheatSheets.countOne` | {count} topic | {count} Thema | high | Section headings for the reference pages. |
| `cheatSheets.countOther` | {count} topics | {count} Themen | high | Section headings for the reference pages. |
| `cheatSheets.exampleFormula` | Example Formula | Beispielformel | high | Section headings for the reference pages. |
| `cheatSheets.readReference` | Read reference | Nachschlagen | high | Section headings for the reference pages. |
| `cheatSheets.practiseThis` | Practise this | Üben | high | Section headings for the reference pages. |
| `cheatSheets.keyConcepts` | Key Concepts | Das Wichtigste | high | Section headings for the reference pages. |
| `cheatSheets.exampleFormulas` | Example Formulas & Reactions | Beispielformeln und Reaktionen | high | Section headings for the reference pages. |
| `cheatSheets.lookupTables` | Lookup Tables | Nachschlagetabellen | high | Section headings for the reference pages. |
| `cheatSheets.goingDeeper` | Going Deeper | Mehr dazu | high | Section headings for the reference pages. |
| `cheatSheets.watchOutFor` | Watch Out For | Typische Fehler | high | Section headings for the reference pages. |
| `cheatSheets.learnMore` | Learn More | Weiterlernen | high | Section headings for the reference pages. |
| `cheatSheets.forStudents` | For students | Für Schülerinnen und Schüler | high | Section headings for the reference pages. |
| `cheatSheets.forTeachers` | For teachers | Für Lehrkräfte | high | Section headings for the reference pages. |
| `cheatSheets.curriculum` | Curriculum:  | Lehrplan:  | high | Section headings for the reference pages. |
| `cheatSheets.filterA11y` | Filter topics by year level | Themen nach Klassenstufe filtern | high | Section headings for the reference pages. |

### `chemistry`

| Key | English | German | Confidence | Notes |
|---|---|---|---|---|
| `chemistry.acid` | Acid | Säure | high | Fixed in docs/i18n/glossary-de.md. Säure / Base / neutral / amphoter are the German school terms. |
| `chemistry.base` | Base | Base | high | Fixed in docs/i18n/glossary-de.md. Säure / Base / neutral / amphoter are the German school terms. |
| `chemistry.neutral` | Neutral | Neutral | high | Fixed in docs/i18n/glossary-de.md. Säure / Base / neutral / amphoter are the German school terms. |
| `chemistry.amphoteric` | Amphoteric | Amphoter | high | Fixed in docs/i18n/glossary-de.md. Säure / Base / neutral / amphoter are the German school terms. |
| `chemistry.basicAlkaline` | Basic / Alkaline | Basisch / alkalisch | high | Fixed in docs/i18n/glossary-de.md. Säure / Base / neutral / amphoter are the German school terms. |

### `games`

| Key | English | German | Confidence | Notes |
|---|---|---|---|---|
| `games.shared.progress` | Progress | Fortschritt | high | Short game-chrome labels. "Level" and "Tipp" are the established German gaming words; see the glossary. |
| `games.shared.level` | Level | Level | high | Short game-chrome labels. "Level" and "Tipp" are the established German gaming words; see the glossary. |
| `games.shared.score` | Score | Punkte | high | Short game-chrome labels. "Level" and "Tipp" are the established German gaming words; see the glossary. |
| `games.shared.levelValue` | Level {level} | Level {level} | high | Short game-chrome labels. "Level" and "Tipp" are the established German gaming words; see the glossary. |
| `games.shared.scoreValue` | Score {score} | Punkte {score} | high | Short game-chrome labels. "Level" and "Tipp" are the established German gaming words; see the glossary. |
| `games.shared.lives` | LIVES: {lives}/{max} | LEBEN: {lives}/{max} | high | Short game-chrome labels. "Level" and "Tipp" are the established German gaming words; see the glossary. |
| `games.shared.exit` | Exit | Beenden | high | Short game-chrome labels. "Level" and "Tipp" are the established German gaming words; see the glossary. |
| `games.shared.exitA11y` | Exit Game Session | Spielsitzung beenden | high | Short game-chrome labels. "Level" and "Tipp" are the established German gaming words; see the glossary. |
| `games.shared.hintA11y` | Get Hint | Tipp anzeigen | high | Short game-chrome labels. "Level" and "Tipp" are the established German gaming words; see the glossary. |
| `games.shared.howToPlay` | How to Play | Spielanleitung | high | Short game-chrome labels. "Level" and "Tipp" are the established German gaming words; see the glossary. |
| `games.shared.settings` | Settings | Einstellungen | high | Short game-chrome labels. "Level" and "Tipp" are the established German gaming words; see the glossary. |
| `games.shared.pause` | Pause Game | Spiel pausieren | high | Short game-chrome labels. "Level" and "Tipp" are the established German gaming words; see the glossary. |
| `games.shared.resume` | Resume Game | Weiterspielen | high | Short game-chrome labels. "Level" and "Tipp" are the established German gaming words; see the glossary. |
| `games.shared.gotIt` | GOT IT | ALLES KLAR | high | Short game-chrome labels. "Level" and "Tipp" are the established German gaming words; see the glossary. |
| `games.shared.hint` | Hint | Tipp | high | Short game-chrome labels. "Level" and "Tipp" are the established German gaming words; see the glossary. |
| `games.shared.find` | Find: | Gesucht: | high | Short game-chrome labels. "Level" and "Tipp" are the established German gaming words; see the glossary. |
| `games.shared.reactionError` | Reaction Error | Reaktionsfehler | high | Short game-chrome labels. "Level" and "Tipp" are the established German gaming words; see the glossary. |
| `games.shared.labHint` | Lab Hint | Labor-Tipp | high | Short game-chrome labels. "Level" and "Tipp" are the established German gaming words; see the glossary. |
| `games.shared.dismissFeedbackA11y` | Dismiss feedback | Hinweis schließen | high | Short game-chrome labels. "Level" and "Tipp" are the established German gaming words; see the glossary. |
| `games.shared.dismissHintA11y` | Dismiss hint | Tipp schließen | high | Short game-chrome labels. "Level" and "Tipp" are the established German gaming words; see the glossary. |
| `games.shared.finalScore` | Final Score: | Endpunktzahl: | high | Short game-chrome labels. "Level" and "Tipp" are the established German gaming words; see the glossary. |
| `games.shared.finalScoreA11y` | Final Score: {score} | Endpunktzahl: {score} | high | Short game-chrome labels. "Level" and "Tipp" are the established German gaming words; see the glossary. |
| `games.shared.levelProgressA11y` | Progress: Level {level} of {max} | Fortschritt: Level {level} von {max} | high | Short game-chrome labels. "Level" and "Tipp" are the established German gaming words; see the glossary. |
| `games.shared.keyboardAndMouse` | Keyboard & mouse | Tastatur und Maus | high | Short game-chrome labels. "Level" and "Tipp" are the established German gaming words; see the glossary. |
| `games.shared.touchscreen` | Touchscreen | Touchscreen | high | Short game-chrome labels. "Level" and "Tipp" are the established German gaming words; see the glossary. |
| `games.overlay.pausedBadge` | Session on hold | Sitzung angehalten | medium | Game-state copy with a lab metaphor running through it. The metaphor was kept, but German lab idiom is not identical to English lab idiom. |
| `games.overlay.pausedTitle` | Game Paused | Spiel pausiert | medium | Game-state copy with a lab metaphor running through it. The metaphor was kept, but German lab idiom is not identical to English lab idiom. |
| `games.overlay.pausedSubtitle` | Take a quick lab break. | Mach eine kurze Laborpause. | medium | Game-state copy with a lab metaphor running through it. The metaphor was kept, but German lab idiom is not identical to English lab idiom. |
| `games.overlay.pausedDescription` | Your experiment is frozen exactly where you left it. | Dein Experiment ist genau dort eingefroren, wo du aufgehört hast. | medium | Game-state copy with a lab metaphor running through it. The metaphor was kept, but German lab idiom is not identical to English lab idiom. |
| `games.overlay.failedBadge` | Experiment ended | Experiment beendet | medium | Game-state copy with a lab metaphor running through it. The metaphor was kept, but German lab idiom is not identical to English lab idiom. |
| `games.overlay.failedTitle` | Game Over | Spiel vorbei | medium | Game-state copy with a lab metaphor running through it. The metaphor was kept, but German lab idiom is not identical to English lab idiom. |
| `games.overlay.failedSubtitle` | Your reaction fizzled! | Deine Reaktion ist verpufft! | medium | Game-state copy with a lab metaphor running through it. The metaphor was kept, but German lab idiom is not identical to English lab idiom. |
| `games.overlay.failedDescription` | Review the formulas and try the run again. | Schau dir die Formeln noch einmal an und starte einen neuen Versuch. | medium | Game-state copy with a lab metaphor running through it. The metaphor was kept, but German lab idiom is not identical to English lab idiom. |
| `games.overlay.victoryBadge` | All objectives complete | Alle Ziele erreicht | medium | Game-state copy with a lab metaphor running through it. The metaphor was kept, but German lab idiom is not identical to English lab idiom. |
| `games.overlay.victoryTitle` | Research Complete | Forschung abgeschlossen | medium | Game-state copy with a lab metaphor running through it. The metaphor was kept, but German lab idiom is not identical to English lab idiom. |
| `games.overlay.victorySubtitle` | Lab Mastered! | Labor gemeistert! | medium | Game-state copy with a lab metaphor running through it. The metaphor was kept, but German lab idiom is not identical to English lab idiom. |
| `games.overlay.victoryDescription` | Splendid work, Researcher! You cleared all levels. | Großartige Arbeit! Du hast alle Level geschafft. | medium | Game-state copy with a lab metaphor running through it. The metaphor was kept, but German lab idiom is not identical to English lab idiom. |
| `games.overlay.levelUpBadge` | Objective secured | Ziel erreicht | medium | Game-state copy with a lab metaphor running through it. The metaphor was kept, but German lab idiom is not identical to English lab idiom. |
| `games.overlay.levelUpTitle` | Level Cleared | Level geschafft | medium | Game-state copy with a lab metaphor running through it. The metaphor was kept, but German lab idiom is not identical to English lab idiom. |
| `games.overlay.levelUpSubtitle` | Batch complete! | Charge fertig! | low | "Charge fertig!" for "Batch complete!". "Charge" is the right lab word for a batch, but as a two-word celebration it may read as jargon to a 14-year-old. |
| `games.overlay.levelUpDescription` | Ready to take on higher level challenges? | Bereit für schwierigere Aufgaben? | medium | Game-state copy with a lab metaphor running through it. The metaphor was kept, but German lab idiom is not identical to English lab idiom. |
| `games.overlay.timeoutDescription` | Time ran out before reaching the quota. | Die Zeit war um, bevor das Ziel erreicht war. | medium | Game-state copy with a lab metaphor running through it. The metaphor was kept, but German lab idiom is not identical to English lab idiom. |
| `games.overlay.statLevel` | Level | Level | medium | Game-state copy with a lab metaphor running through it. The metaphor was kept, but German lab idiom is not identical to English lab idiom. |
| `games.overlay.statScore` | Score | Punkte | medium | Game-state copy with a lab metaphor running through it. The metaphor was kept, but German lab idiom is not identical to English lab idiom. |
| `games.overlay.statRound` | Round | Runde | medium | Game-state copy with a lab metaphor running through it. The metaphor was kept, but German lab idiom is not identical to English lab idiom. |
| `games.overlay.statRoundValue` | {count} correct | {count} richtig | medium | Game-state copy with a lab metaphor running through it. The metaphor was kept, but German lab idiom is not identical to English lab idiom. |
| `games.overlay.levelOfMax` | Level {level} of {max} • {correct} correct | Level {level} von {max} • {correct} richtig | medium | Game-state copy with a lab metaphor running through it. The metaphor was kept, but German lab idiom is not identical to English lab idiom. |
| `games.overlay.levelUpProgress` | Level {level} → {next} • {correct} sorted | Level {level} → {next} • {correct} einsortiert | medium | Game-state copy with a lab metaphor running through it. The metaphor was kept, but German lab idiom is not identical to English lab idiom. |
| `games.overlay.resume` | Resume Game | Weiterspielen | medium | Game-state copy with a lab metaphor running through it. The metaphor was kept, but German lab idiom is not identical to English lab idiom. |
| `games.overlay.beginLevel` | Begin Level {level} | Level {level} starten | medium | Game-state copy with a lab metaphor running through it. The metaphor was kept, but German lab idiom is not identical to English lab idiom. |
| `games.overlay.tryAgain` | Try Again | Noch einmal | medium | Game-state copy with a lab metaphor running through it. The metaphor was kept, but German lab idiom is not identical to English lab idiom. |
| `games.overlay.quitToHub` | Quit to Hub | Zurück zur Übersicht | medium | Game-state copy with a lab metaphor running through it. The metaphor was kept, but German lab idiom is not identical to English lab idiom. |
| `games.overlay.keyHintResume` | Press Escape, Space, or Enter to continue | Drücke Esc, Leertaste oder Enter, um weiterzumachen | medium | Game-state copy with a lab metaphor running through it. The metaphor was kept, but German lab idiom is not identical to English lab idiom. |
| `games.overlay.keyHintRetry` | Press Space or Enter to try again | Drücke Leertaste oder Enter für einen neuen Versuch | medium | Game-state copy with a lab metaphor running through it. The metaphor was kept, but German lab idiom is not identical to English lab idiom. |
| `games.acidClassification.subtitle` | CLASSIFY MOLECULE | MOLEKÜL EINORDNEN | medium | Instruction steps for a Year 9-10 reader; the chemistry vocabulary is glossary-fixed but the phrasing is mine. |
| `games.acidClassification.task` | Acid, Base or Neutral? | Säure, Base oder neutral? | medium | Instruction steps for a Year 9-10 reader; the chemistry vocabulary is glossary-fixed but the phrasing is mine. |
| `games.acidClassification.progress` | {correct} / {quota} Sorted | {correct} / {quota} einsortiert | medium | Instruction steps for a Year 9-10 reader; the chemistry vocabulary is glossary-fixed but the phrasing is mine. |
| `games.acidClassification.arenaHeading` | Classify Compound | Verbindung einordnen | medium | Instruction steps for a Year 9-10 reader; the chemistry vocabulary is glossary-fixed but the phrasing is mine. |
| `games.acidClassification.registryError` | Error: Compounds Registry not found. | Fehler: Verbindungsregister nicht gefunden. | medium | Instruction steps for a Year 9-10 reader; the chemistry vocabulary is glossary-fixed but the phrasing is mine. |
| `games.acidClassification.instructionsTitle` | How to Play: Chemical Classifier | Spielanleitung: Chemie-Sortierer | low | "Chemie-Sortierer" is a coinage for "Chemical Classifier". Understandable, but check it does not sound like a machine for sorting chemicals. |
| `games.acidClassification.instructionsSubtitle` | Analyze the chemical formula and identify its properties! | Untersuche die chemische Formel und bestimme ihre Eigenschaften! | medium | Instruction steps for a Year 9-10 reader; the chemistry vocabulary is glossary-fixed but the phrasing is mine. |
| `games.acidClassification.stepIdentifyLabel` | Identify: | Erkennen: | medium | Instruction steps for a Year 9-10 reader; the chemistry vocabulary is glossary-fixed but the phrasing is mine. |
| `games.acidClassification.stepIdentifyText` | Look at the compound shown in the center bubble. | Sieh dir die Verbindung in der mittleren Blase an. | medium | Instruction steps for a Year 9-10 reader; the chemistry vocabulary is glossary-fixed but the phrasing is mine. |
| `games.acidClassification.stepClassifyLabel` | Classify: | Einordnen: | medium | Instruction steps for a Year 9-10 reader; the chemistry vocabulary is glossary-fixed but the phrasing is mine. |
| `games.acidClassification.stepClassifyText` | Select whether it is an Acid, Base, Neutral, or Amphoteric substance. | Wähle, ob der Stoff sauer, basisch, neutral oder amphoter ist. | medium | Instruction steps for a Year 9-10 reader; the chemistry vocabulary is glossary-fixed but the phrasing is mine. |
| `games.acidClassification.stepHintLabel` | Need a Hint? | Brauchst du einen Tipp? | medium | Instruction steps for a Year 9-10 reader; the chemistry vocabulary is glossary-fixed but the phrasing is mine. |
| `games.acidClassification.stepHintText` | Click the lightbulb icon in the header to reveal the chemical name. | Klicke oben auf das Glühbirnen-Symbol, um den chemischen Namen anzuzeigen. | medium | Instruction steps for a Year 9-10 reader; the chemistry vocabulary is glossary-fixed but the phrasing is mine. |
| `games.acidClassification.stepCarefulLabel` | Careful: | Achtung: | medium | Instruction steps for a Year 9-10 reader; the chemistry vocabulary is glossary-fixed but the phrasing is mine. |
| `games.acidClassification.stepCarefulText` | 3 mistakes and the beaker breaks! | Nach 3 Fehlern zerbricht das Becherglas! | medium | Instruction steps for a Year 9-10 reader; the chemistry vocabulary is glossary-fixed but the phrasing is mine. |
| `games.formulaBlaster.subtitle` | TARGET MOLECULE | ZIELMOLEKÜL | high | The feedback templates keep {formula} and {symbol} untranslated by design; only {compound} and {element} are localised names. |
| `games.formulaBlaster.progress` | Target {phase}/3 • Hits: {hits}/{quota} | Ziel {phase}/3 • Treffer: {hits}/{quota} | high | The feedback templates keep {formula} and {symbol} untranslated by design; only {compound} and {element} are localised names. |
| `games.formulaBlaster.hintHeading` | Target Molecule Hint | Tipp zum Zielmolekül | high | The feedback templates keep {formula} and {symbol} untranslated by design; only {compound} and {element} are localised names. |
| `games.formulaBlaster.instructionsTitle` | How to Play: Formula Blaster | Spielanleitung: Formel-Blaster | high | The feedback templates keep {formula} and {symbol} untranslated by design; only {compound} and {element} are localised names. |
| `games.formulaBlaster.instructionsIntro` | Find and pop bubbles matching the target molecule shown in the header. | Finde die Blasen mit dem Zielmolekül aus der Kopfzeile und lass sie zerplatzen. | high | The feedback templates keep {formula} and {symbol} untranslated by design; only {compound} and {element} are localised names. |
| `games.formulaBlaster.instructionsBullet1` | Click the correct formula to add a hit toward the current target. | Klicke die richtige Formel an, um einen Treffer für das aktuelle Ziel zu sammeln. | high | The feedback templates keep {formula} and {symbol} untranslated by design; only {compound} and {element} are localised names. |
| `games.formulaBlaster.instructionsBullet2` | Use the lightbulb in the header if you need a clue about elemental breakdown. | Nutze die Glühbirne oben, wenn du einen Hinweis zur Zusammensetzung brauchst. | high | The feedback templates keep {formula} and {symbol} untranslated by design; only {compound} and {element} are localised names. |
| `games.formulaBlaster.instructionsBullet3` | Tapping an incorrect molecule reveals what element you should look for instead. | Wenn du ein falsches Molekül antippst, erfährst du, nach welchem Element du stattdessen suchen solltest. | high | The feedback templates keep {formula} and {symbol} untranslated by design; only {compound} and {element} are localised names. |
| `games.formulaBlaster.hintTemplate` | {compound} consists of the elements: {elements}. | {compound} besteht aus den Elementen: {elements}. | high | The feedback templates keep {formula} and {symbol} untranslated by design; only {compound} and {element} are localised names. |
| `games.formulaBlaster.wrongPick` | That's {compound} ({formula})! | Das ist {compound} ({formula})! | high | The feedback templates keep {formula} and {symbol} untranslated by design; only {compound} and {element} are localised names. |
| `games.formulaBlaster.wrongPickLookFor` | That's {compound} ({formula})! Look for {element} ({symbol}) atoms instead. | Das ist {compound} ({formula})! Suche stattdessen nach {element}-Atomen ({symbol}). | high | The feedback templates keep {formula} and {symbol} untranslated by design; only {compound} and {element} are localised names. |
| `games.formulaBlaster.wrongPickCheckCounts` | That's {compound} ({formula})! Check the atom counts for {target}. | Das ist {compound} ({formula})! Prüfe die Atomanzahl von {target}. | high | The feedback templates keep {formula} and {symbol} untranslated by design; only {compound} and {element} are localised names. |
| `games.neutralise.subtitleFull` | OBJECTIVE: Neutralize acids with OH⁻ and bases with H⁺ | ZIEL: Neutralisiere Säuren mit OH⁻ und Basen mit H⁺ | high | Ion notation (H⁺, OH⁻) left as-is. "Leertaste" is the German name for the space bar. |
| `games.neutralise.subtitleShort` | NEUTRALIZE | NEUTRALISIEREN | high | Ion notation (H⁺, OH⁻) left as-is. "Leertaste" is the German name for the space bar. |
| `games.neutralise.progressFull` | Wave {wave}/3 \| Cleared {cleared}/{total} | Welle {wave}/3 \| Geschafft {cleared}/{total} | high | Ion notation (H⁺, OH⁻) left as-is. "Leertaste" is the German name for the space bar. |
| `games.neutralise.progressShort` | Wave {wave}/3 | Welle {wave}/3 | high | Ion notation (H⁺, OH⁻) left as-is. "Leertaste" is the German name for the space bar. |
| `games.neutralise.fire` | Fire | Feuern | high | Ion notation (H⁺, OH⁻) left as-is. "Leertaste" is the German name for the space bar. |
| `games.neutralise.fireA11y` | Fire | Feuern | high | Ion notation (H⁺, OH⁻) left as-is. "Leertaste" is the German name for the space bar. |
| `games.neutralise.switchIonA11yAcid` | Switch ion, currently H+ acid | Ion wechseln, aktuell H+ (Säure) | high | Ion notation (H⁺, OH⁻) left as-is. "Leertaste" is the German name for the space bar. |
| `games.neutralise.switchIonA11yBase` | Switch ion, currently OH- base | Ion wechseln, aktuell OH- (Base) | high | Ion notation (H⁺, OH⁻) left as-is. "Leertaste" is the German name for the space bar. |
| `games.neutralise.instructionsTitle` | How to Play: Neutralize! | Spielanleitung: Neutralisieren! | high | Ion notation (H⁺, OH⁻) left as-is. "Leertaste" is the German name for the space bar. |
| `games.neutralise.instructionsIntro` | Defend the lab from incoming chemical hazards! | Verteidige das Labor gegen anfliegende Gefahrstoffe! | high | Ion notation (H⁺, OH⁻) left as-is. "Leertaste" is the German name for the space bar. |
| `games.neutralise.keyOneLabel` | 1 | 1 | high | Ion notation (H⁺, OH⁻) left as-is. "Leertaste" is the German name for the space bar. |
| `games.neutralise.keyOneText` | Load {ion} to neutralize Bases. | Lade {ion}, um Basen zu neutralisieren. | high | Ion notation (H⁺, OH⁻) left as-is. "Leertaste" is the German name for the space bar. |
| `games.neutralise.keyOneIon` | H⁺ (Acid) | H⁺ (Säure) | high | Ion notation (H⁺, OH⁻) left as-is. "Leertaste" is the German name for the space bar. |
| `games.neutralise.keyTwoLabel` | 2 | 2 | high | Ion notation (H⁺, OH⁻) left as-is. "Leertaste" is the German name for the space bar. |
| `games.neutralise.keyTwoText` | Load {ion} to neutralize Acids. | Lade {ion}, um Säuren zu neutralisieren. | high | Ion notation (H⁺, OH⁻) left as-is. "Leertaste" is the German name for the space bar. |
| `games.neutralise.keyTwoIon` | OH⁻ (Base) | OH⁻ (Base) | high | Ion notation (H⁺, OH⁻) left as-is. "Leertaste" is the German name for the space bar. |
| `games.neutralise.keySpaceLabel` | Space | Leertaste | high | Ion notation (H⁺, OH⁻) left as-is. "Leertaste" is the German name for the space bar. |
| `games.neutralise.keySpaceText` | Fire your ion cannon! (Or click the arena). | Feuere deine Ionenkanone ab! (Oder klicke in die Arena.) | high | Ion notation (H⁺, OH⁻) left as-is. "Leertaste" is the German name for the space bar. |
| `games.neutralise.keyArrowsLabel` | ←/→ | ←/→ | high | Ion notation (H⁺, OH⁻) left as-is. "Leertaste" is the German name for the space bar. |
| `games.neutralise.keyArrowsText` | Move the cannon (or move your mouse). | Bewege die Kanone (oder bewege die Maus). | high | Ion notation (H⁺, OH⁻) left as-is. "Leertaste" is the German name for the space bar. |
| `games.neutralise.touchDragLabel` | Drag | Ziehen | high | Ion notation (H⁺, OH⁻) left as-is. "Leertaste" is the German name for the space bar. |
| `games.neutralise.touchDragText` | Slide your finger on the arena to aim the cannon. | Streiche mit dem Finger über die Arena, um die Kanone auszurichten. | high | Ion notation (H⁺, OH⁻) left as-is. "Leertaste" is the German name for the space bar. |
| `games.neutralise.touchFireLabel` | Fire | Feuern | high | Ion notation (H⁺, OH⁻) left as-is. "Leertaste" is the German name for the space bar. |
| `games.neutralise.touchFireText` | Tap the {button} button below the arena. | Tippe unter der Arena auf die Schaltfläche {button}. | high | Ion notation (H⁺, OH⁻) left as-is. "Leertaste" is the German name for the space bar. |
| `games.neutralise.touchSwitchLabel` | Switch | Wechseln | high | Ion notation (H⁺, OH⁻) left as-is. "Leertaste" is the German name for the space bar. |
| `games.neutralise.touchSwitchText` | Tap the ion button to toggle between H⁺ and OH⁻. | Tippe auf die Ionen-Schaltfläche, um zwischen H⁺ und OH⁻ zu wechseln. | high | Ion notation (H⁺, OH⁻) left as-is. "Leertaste" is the German name for the space bar. |
| `games.reactionBalancer.subtitle` | OBJECTIVE: Adjust coefficients until total atoms balance on both sides | ZIEL: Passe die Koeffizienten an, bis beide Seiten gleich viele Atome haben | high | Uses the glossary terms Edukte / Produkte / Koeffizient / Atombilanz. "Edukte" is the standard German school word for reactants; some Länder teach "Ausgangsstoffe" instead, which is equally correct. |
| `games.reactionBalancer.progress` | Level {level} | Level {level} | high | Uses the glossary terms Edukte / Produkte / Koeffizient / Atombilanz. "Edukte" is the standard German school word for reactants; some Länder teach "Ausgangsstoffe" instead, which is equally correct. |
| `games.reactionBalancer.instructionsTitle` | How to Play: Reaction Balancer | Spielanleitung: Reaktions-Balancer | high | Uses the glossary terms Edukte / Produkte / Koeffizient / Atombilanz. "Edukte" is the standard German school word for reactants; some Länder teach "Ausgangsstoffe" instead, which is equally correct. |
| `games.reactionBalancer.instructionsBody` | Use the {arrows} arrows above each compound to adjust its stoichiometric coefficient until the number of atoms for each element is equal on both sides of the arrow. | Stelle mit den Pfeilen {arrows} über jeder Verbindung ihren stöchiometrischen Koeffizienten so ein, dass von jedem Element auf beiden Seiten des Reaktionspfeils gleich viele Atome stehen. | high | Uses the glossary terms Edukte / Produkte / Koeffizient / Atombilanz. "Edukte" is the standard German school word for reactants; some Länder teach "Ausgangsstoffe" instead, which is equally correct. |
| `games.reactionBalancer.prompt` | Change the coefficients to conserve every atom. | Ändere die Koeffizienten, bis jedes Atom erhalten bleibt. | high | Uses the glossary terms Edukte / Produkte / Koeffizient / Atombilanz. "Edukte" is the standard German school word for reactants; some Länder teach "Ausgangsstoffe" instead, which is equally correct. |
| `games.reactionBalancer.reactants` | Reactants | Edukte | high | Uses the glossary terms Edukte / Produkte / Koeffizient / Atombilanz. "Edukte" is the standard German school word for reactants; some Länder teach "Ausgangsstoffe" instead, which is equally correct. |
| `games.reactionBalancer.products` | Products | Produkte | high | Uses the glossary terms Edukte / Produkte / Koeffizient / Atombilanz. "Edukte" is the standard German school word for reactants; some Länder teach "Ausgangsstoffe" instead, which is equally correct. |
| `games.reactionBalancer.checkAnswer` | Check Answer | Antwort prüfen | high | Uses the glossary terms Edukte / Produkte / Koeffizient / Atombilanz. "Edukte" is the standard German school word for reactants; some Länder teach "Ausgangsstoffe" instead, which is equally correct. |
| `games.reactionBalancer.editableHint` | You can change your coefficients at any time. | Du kannst deine Koeffizienten jederzeit ändern. | high | Uses the glossary terms Edukte / Produkte / Koeffizient / Atombilanz. "Edukte" is the standard German school word for reactants; some Länder teach "Ausgangsstoffe" instead, which is equally correct. |
| `games.reactionBalancer.showAtomBalance` | Show Atom Balance | Atombilanz anzeigen | high | Uses the glossary terms Edukte / Produkte / Koeffizient / Atombilanz. "Edukte" is the standard German school word for reactants; some Länder teach "Ausgangsstoffe" instead, which is equally correct. |
| `games.reactionBalancer.hideAtomBalance` | Hide Atom Balance | Atombilanz ausblenden | high | Uses the glossary terms Edukte / Produkte / Koeffizient / Atombilanz. "Edukte" is the standard German school word for reactants; some Länder teach "Ausgangsstoffe" instead, which is equally correct. |
| `games.reactionBalancer.atomBalance` | Atom Balance | Atombilanz | high | Uses the glossary terms Edukte / Produkte / Koeffizient / Atombilanz. "Edukte" is the standard German school word for reactants; some Länder teach "Ausgangsstoffe" instead, which is equally correct. |
| `games.reactionBalancer.scaleHint` | The scale tilts toward the side with more atoms. | Die Waage neigt sich zur Seite mit mehr Atomen. | high | Uses the glossary terms Edukte / Produkte / Koeffizient / Atombilanz. "Edukte" is the standard German school word for reactants; some Länder teach "Ausgangsstoffe" instead, which is equally correct. |
| `games.reactionBalancer.balanced` | All atoms are balanced | Alle Atome sind ausgeglichen | high | Uses the glossary terms Edukte / Produkte / Koeffizient / Atombilanz. "Edukte" is the standard German school word for reactants; some Länder teach "Ausgangsstoffe" instead, which is equally correct. |
| `games.reactionBalancer.molecules` | Molecules | Moleküle | high | Uses the glossary terms Edukte / Produkte / Koeffizient / Atombilanz. "Edukte" is the standard German school word for reactants; some Länder teach "Ausgangsstoffe" instead, which is equally correct. |
| `games.reactionBalancer.moleculeView` | Molecule view | Molekülansicht | high | Uses the glossary terms Edukte / Produkte / Koeffizient / Atombilanz. "Edukte" is the standard German school word for reactants; some Länder teach "Ausgangsstoffe" instead, which is equally correct. |
| `games.reactionBalancer.coefficientA11y` | Coefficient for {formula} | Koeffizient für {formula} | high | Uses the glossary terms Edukte / Produkte / Koeffizient / Atombilanz. "Edukte" is the standard German school word for reactants; some Länder teach "Ausgangsstoffe" instead, which is equally correct. |
| `games.reactionBalancer.atomBalanceA11y` | {element}: {left} atoms on the reactants side and {right} atoms on the products side | {element}: {left} Atome auf der Eduktseite und {right} Atome auf der Produktseite | high | Uses the glossary terms Edukte / Produkte / Koeffizient / Atombilanz. "Edukte" is the standard German school word for reactants; some Länder teach "Ausgangsstoffe" instead, which is equally correct. |
| `games.reactionBalancer.moleculeA11y` | {formula} molecule | Molekül {formula} | high | Uses the glossary terms Edukte / Produkte / Koeffizient / Atombilanz. "Edukte" is the standard German school word for reactants; some Länder teach "Ausgangsstoffe" instead, which is equally correct. |
| `games.reactionBalancer.particleCountOneA11y` | {count} molecule of {formula} | {count} Molekül {formula} | high | Uses the glossary terms Edukte / Produkte / Koeffizient / Atombilanz. "Edukte" is the standard German school word for reactants; some Länder teach "Ausgangsstoffe" instead, which is equally correct. |
| `games.reactionBalancer.particleCountOtherA11y` | {count} molecules of {formula} | {count} Moleküle {formula} | high | Uses the glossary terms Edukte / Produkte / Koeffizient / Atombilanz. "Edukte" is the standard German school word for reactants; some Länder teach "Ausgangsstoffe" instead, which is equally correct. |

---

## Chemistry names — `src/i18n/chemistry-names/de.ts`

Not in the table above: these are keyed by registry identifier rather than by
dictionary path, and there are 181 of them.

| Group | Count | Confidence | Notes |
|---|---|---|---|
| Element names | 118 | **high** | German element names are standardised and I am confident in the table. The spellings follow German IUPAC usage: Calcium (not Kalzium), Silicium (not Silizium), Iod (not Jod), Caesium (not Cäsium), Cobalt (not Kobalt), Bismut (not Wismut). If the site's audience is Austrian or Swiss rather than German, check whether they prefer the older spellings. |
| Compound names | 35 | **high** for the salts and hydroxides, **medium** for the acids | Salts compose predictably (Natriumhydroxid, Calciumchlorid). The acids are the judgement calls: HCl is **Salzsäure** and HF is **Flusssäure** — German names the common mineral acids after the solution rather than systematically, which is what a school textbook does, but a chemistry teacher may prefer Chlorwasserstoffsäure / Fluorwasserstoffsäure in a formal context. |
| Ion names | 40 | **high** | Note a deliberate modernisation: German uses the systematic *Hydrogen-* prefix where the English source data still uses the older *bi-*. Bicarbonate becomes Hydrogencarbonat, bisulfate becomes Hydrogensulfat. This is correct German but it is not a literal translation of the English, so it is worth knowing about. |

**Specifically worth a second pair of eyes:** `Ts` (Tennessine) is given as
"Tenness", which is the IUPAC German form but is rarely written; and
`H4SiO4` is "Kieselsäure" where the fully systematic name would be
"Orthokieselsäure".

## Cheat sheets — `src/i18n/cheat-sheets/de.ts`

Twelve reference sheets, roughly 6,000 words of specialist German. **This is the
highest-risk part of the translation and the part I would most want reviewed
before students see it.**

| Sheet | Confidence | What to look at |
|---|---|---|
| States of Matter | **high** | Ordinary particle-model vocabulary. The six phase changes use the standard German pairs (Schmelzen/Erstarren, Sublimieren/Resublimieren). |
| Acids & Bases | **high** | Glossary-fixed throughout. One choice to check: H₃O⁺ is called **Oxonium-Ion**, which is the German school term, where English says hydronium. |
| Balancing Equations | **high** | Turns on the Index/Koeffizient distinction, which German makes more clearly than English does. "ausgleichen" chosen over "einrichten" — see the glossary. |
| Reaction Types | **medium** | "Zersetzung" for decomposition (rather than the classical "Analyse") and "Verdrängung" for displacement. Both are taught; check they match the reader's textbook. |
| Chemical Bonds | **medium** | Uses **Atombindung** for covalent bond, with "kovalente Bindung" glossed once. If the audience's textbook says kovalent throughout, swap them. |
| Writing Ionic Formulas | **medium** | Titled with **Verhältnisformel**, which is the precise German term and makes a point the English title does not. Check the cross-over method ("Kreuzregel") is called that locally. |
| Polyatomic Ions | **medium** | The naming-pattern bullets are the risk: they explain *English* suffix patterns (-ate/-ite, per-/hypo-) using German equivalents (-at/-it). A German reader learns the German pattern, so this mostly works, but the mapping deserves a teacher's eye. |
| Naming Inorganic Compounds | **low** | The hardest sheet. The English text teaches the English naming system (hydro-...-ic acid, -ous acid); German names acids differently. I rewrote that bullet and the acid-names table to teach the German system instead of transliterating the English one. **This is a content change, not just a translation, and it needs review.** |
| The Mole & Stoichiometry | **medium** | Terminology is glossary-fixed (Stoffmenge, molare Masse, begrenzendes Edukt). Decimal commas used throughout the worked examples — check that is what you want, since the formulae around them use points. |
| Lewis Structures | **medium** | Uses **Lewis-Formel** and **freies Elektronenpaar**. VSEPR shape names (tetraedrisch, trigonal-pyramidal, gewinkelt) are standard. |
| Naming Organic Compounds | **low** | Same problem as the inorganic naming sheet, worse. IUPAC suffixes differ between the languages (-oic acid vs. -säure, ester naming is structurally different: "Ethansäuremethylester" not "methyl ethanoate"). I used the German conventions. **A chemistry teacher must check this sheet.** |
| Functional Groups | **low** | The reference table mixes structure notation (untranslated) with German group names and German reaction descriptions. The ester row in particular follows German ester naming, which is not a translation of the English pattern. |

**Not translated, deliberately:** every linked resource is an English-language
site (Khan Academy, LibreTexts, Chemguide, PubChem, the VCAA data book). Their
titles are left in English so they are findable, and the German descriptions
say "(Auf Englisch.)" so a reader is not surprised. **This is a genuine gap
rather than a solved problem**: a German student gets German explanations and
then English source material. If German is going to be a first-class language,
the resource lists should get German equivalents (e.g. Chemie.de, LEIFIchemie,
Studyflix), which is a content task rather than a translation task.

**Also not translated:** the curriculum references. Every sheet cites the
Victorian Curriculum or the VCE study design, which is Australian. The
surrounding German is translated but the curriculum itself is not relevant to a
German reader. Worth deciding whether German sheets should show a German
curriculum reference, or none.

## What I am most likely to have got wrong

Ranked, honestly:

1. **The two naming sheets** (`naming-compounds`, `organic-nomenclature`). I
   changed what they teach, because teaching English naming rules in German
   would be worse than useless. That is the right call but it is beyond what a
   translator should decide alone.
2. **Register in the playful copy.** Overlay messages, empty states and the
   marketing hero are where a non-native translation reads as "correct but
   flat". None of it is wrong; some of it may be charmless.
3. **Game titles.** Three coinages, no strong opinion behind them.
4. **The privacy page.** Legally unreviewed, and describing Australian law.
5. **Compound acid names.** Salzsäure/Flusssäure is the school convention; a
   more formal audience may expect the systematic names.
