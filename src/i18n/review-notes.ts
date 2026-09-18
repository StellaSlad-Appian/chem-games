// src/i18n/review-notes.ts
//
// The hand-written half of docs/i18n/de-review.md: how confident I am in each
// group of translations, and why. The mechanical half — which strings exist and
// what they say — is read from the dictionaries by scripts/i18n-review.ts, so
// the table can never go stale.
//
// Rules are matched by longest dot-path prefix, so a note on
// `games.acidClassification` covers that whole namespace unless a longer prefix
// overrides it. Anything with no matching rule is reported as `medium` with a
// generic note, which is deliberately not silent: an unrated string should look
// unrated.
//
// Ratings are about *this* translation, not about German in general:
//   high   — ordinary UI copy, or a term fixed in docs/i18n/glossary-de.md.
//   medium — correct as far as I can tell, but a native speaker may prefer a
//            different word, or the register may be off for a 14-year-old.
//   low    — genuinely unsure. Have a native speaker or a chemistry teacher
//            check it before the German site goes in front of students.

export type Confidence = 'high' | 'medium' | 'low';

export interface ReviewNote {
  /** Dot-path prefix; the longest matching rule wins. */
  prefix: string;
  confidence: Confidence;
  note: string;
}

export const REVIEW_NOTES: Record<string, ReviewNote[]> = {
  de: [
    // ---------------------------------------------------------------- high --
    {
      prefix: 'common',
      confidence: 'high',
      note: 'Everyday UI words with unambiguous German equivalents.',
    },
    {
      prefix: 'nav',
      confidence: 'high',
      note: 'Standard navigation vocabulary. "Spickzettel" for cheat sheet is the natural school word and the right register for teenagers.',
    },
    {
      prefix: 'language',
      confidence: 'high',
      note: 'Switcher labels; short and unambiguous.',
    },
    {
      prefix: 'auth',
      confidence: 'high',
      note: 'Standard sign-in vocabulary. The placeholder email was localised to a .de domain.',
    },
    {
      prefix: 'feedback',
      confidence: 'high',
      note: '"Feedback" is an established German loanword; the category labels are plain nouns.',
    },
    {
      prefix: 'settings',
      confidence: 'high',
      note: 'Standard settings vocabulary.',
    },
    {
      prefix: 'settings.useGlobal',
      confidence: 'medium',
      note: 'Rendered as "Standard nutzen" rather than a literal "Global übernehmen": German readers understand the concept better as "use the default". settings.overrideHelp quotes the same wording, so the two must change together.',
    },
    {
      prefix: 'footer',
      confidence: 'high',
      note: 'Short; the tagline is a free rendering rather than word-for-word, which suits a tagline.',
    },
    {
      prefix: 'yearLevels',
      confidence: 'high',
      note: '"Klasse 7-10" and "Oberstufe" are the German school-year labels. Note the stored value stays the English "Year 9"; only the label is translated.',
    },
    {
      prefix: 'chemistry',
      confidence: 'high',
      note: 'Fixed in docs/i18n/glossary-de.md. Säure / Base / neutral / amphoter are the German school terms.',
    },
    {
      prefix: 'games.shared',
      confidence: 'high',
      note: 'Short game-chrome labels. "Level" and "Tipp" are the established German gaming words; see the glossary.',
    },
    {
      prefix: 'profileToggles',
      confidence: 'high',
      note: 'Plain switch labels.',
    },
    {
      prefix: 'serverMessages',
      confidence: 'high',
      note: 'Error and confirmation messages in plain German. Note the {word} placeholder stays the literal "DELETE": the action compares it byte for byte.',
    },
    {
      prefix: 'cheatSheets',
      confidence: 'high',
      note: 'Section headings for the reference pages.',
    },
    {
      prefix: 'games.reactionBalancer',
      confidence: 'high',
      note: 'Rewritten from scratch for the redesigned game: the old copy described coefficient arrows and an atom-balance panel that no longer exist. Uses the glossary terms Edukte / Produkte / Koeffizient / Index / Atombilanz / ausgleichen. "Edukte" is the standard German school word for reactants; some Länder teach "Ausgangsstoffe" instead, which is equally correct.',
    },
    {
      prefix: 'games.reactionBalancer.card',
      confidence: 'high',
      note: 'Accessible names for the coefficient controls. The literal "Add one water" cannot be translated with an article, because the compound name that fills the placeholder can be any gender ("Ein Schwefelsäure mehr" is wrong). The German uses a verb instead — "{name} erhöhen" / "{name} verringern" — which is gender-free and reads better on a screen reader.',
    },
    {
      prefix: 'games.reactionBalancer.challenge.wrongSide',
      confidence: 'high',
      note: 'Rephrased away from a pronoun for the same reason: "es ist ein Produkt" needs a gender the placeholder does not supply, so the sentence now ends "auf die Produktseite" / "auf die Eduktseite".',
    },
    {
      prefix: 'games.reactionBalancer.glossary',
      confidence: 'high',
      note: 'The Index / Koeffizient contrast is the whole teaching point of the game, and German makes it more clearly than English does. `matches` lists the German word forms that become tap-to-explain, so it is a different list from the English one rather than a translation of it.',
    },
    {
      prefix: 'games.reactionBalancer.instructions.keyboard',
      confidence: 'high',
      note: 'Column one is the physical key (Tab, H, P) and is deliberately identical to the English; only the description of what the key does is translated.',
    },
    {
      prefix: 'games.formulaBlaster',
      confidence: 'high',
      note: 'The feedback templates keep {formula} and {symbol} untranslated by design; only {compound} and {element} are localised names.',
    },
    {
      prefix: 'games.neutralise',
      confidence: 'high',
      note: 'Ion notation (H⁺, OH⁻) left as-is. "Leertaste" is the German name for the space bar.',
    },

    {
      prefix: 'games.lewisStructures',
      confidence: 'medium',
      note: 'A whole new game. The chemistry terms are glossary-fixed (Lewis-Formel, freies Elektronenpaar, bindendes Elektronenpaar, Atombindung, Oktettregel, Valenzelektronen), but the game deliberately writes around the jargon for a Year 9 reader, and that plain-language layer is mine rather than a textbook’s. Rated medium as a body of work; the specific risks are listed below.',
    },
    {
      prefix: 'games.lewisStructures.instructions.keyboard',
      confidence: 'high',
      note: 'Column one is the physical key and is deliberately identical to the English.',
    },
    {
      prefix: 'games.lewisStructures.glossary.lonePair',
      confidence: 'high',
      note: '"freies Elektronenpaar" is glossary-fixed; the calque "einsames Elektronenpaar" was rejected.',
    },
    {
      prefix: 'games.lewisStructures.counts',
      confidence: 'high',
      note: 'Counted noun phrases with their own plural forms, so the adjective ending is right in both ("1 bindendes Elektronenpaar" / "2 bindende Elektronenpaare"). They are substituted into a sentence after a colon, where the nominative is correct.',
    },

    // -------------------------------------------------------------- medium --
    {
      prefix: 'home',
      confidence: 'medium',
      note: 'Marketing copy. Accurate, but a native speaker may want to punch it up — promotional register is where translated copy most often reads flat.',
    },
    {
      prefix: 'gamesHub',
      confidence: 'medium',
      note: 'Game descriptions. The titles are rated separately below. Two were corrected after review: "Zerplatze die Verbindungen" used zerplatzen transitively, which standard German does not allow (things burst; you do not burst them) — it now says "Lass die … zerplatzen", which the two other blaster strings already did. And the balancer card said "angleichen", introducing a second verb for what the glossary fixes as "ausgleichen"; it now avoids the verb altogether with "ins Gleichgewicht bringen", which also matches the beam the game shows.',
    },
    {
      prefix: 'leaderboards',
      confidence: 'medium',
      note: '"Highscore" and "Bestenliste" are both standard. The empty states are free renderings.',
    },
    {
      prefix: 'profile',
      confidence: 'medium',
      note: 'The "scientist" framing is awkward in gender-neutral German; rendered with neutral forms (Forschende, Forschungs-) throughout. Worth a native read.',
    },
    {
      prefix: 'games.acidClassification',
      confidence: 'medium',
      note: 'Instruction steps for a Year 9-10 reader; the chemistry vocabulary is glossary-fixed but the phrasing is mine.',
    },
    {
      prefix: 'games.overlay',
      confidence: 'medium',
      note: 'Game-state copy with a lab metaphor running through it. The metaphor was kept, but German lab idiom is not identical to English lab idiom.',
    },
    {
      prefix: 'meta',
      confidence: 'medium',
      note: 'Page titles and descriptions.',
    },

    // ----------------------------------------------------------------- low --
    {
      prefix: 'meta.keywords',
      confidence: 'low',
      note: 'SEO keywords are keyword research, not translation. These are plausible German search terms, not researched ones. Someone should check them against actual German search volume before they matter — see the seo/ directory for how the English set was built. One was outright wrong and has been corrected: "Chemie Oberstufe" names Sek II (Klasse 11–13, ages 16–19), and this site is Year 9–10 — Mittelstufe / Sek I. It now says "Chemie Klasse 9", which is also a term German students actually search for.',
    },
    {
      prefix: 'gamesHub.blasterTitle',
      confidence: 'low',
      note: 'Coinage. "Formel-Blaster" keeps the arcade feel and is readable in German, but it is an invented product name, not a translation. Decide whether game titles should be translated at all or kept as English product names.',
    },
    {
      prefix: 'gamesHub.balancerTitle',
      confidence: 'low',
      note: 'Coinage, and the weakest one. "Reaktions-Balancer" is understandable but clunky; a German speaker may prefer something like "Gleichungs-Werkstatt" or simply leaving it in English.',
    },
    {
      prefix: 'gamesHub.neutraliseTitle',
      confidence: 'medium',
      note: '"Neutralisieren!" as an imperative works, but check it reads as a game title and not as an instruction.',
    },
    {
      prefix: 'profile.defaultTitle',
      confidence: 'low',
      note: '"Registriert im Labor" is an invention. The English "Registered Scientist" has no good gender-neutral German equivalent that fits a small badge; every faithful option is either gendered or too long.',
    },
    {
      prefix: 'profile.labNotesEmpty',
      confidence: 'low',
      note: 'Rewritten rather than translated, because the English joke ("observing reactions in silence") does not carry. Check the new one is actually charming in German and not just odd.',
    },
    {
      prefix: 'leaderboards.noData',
      confidence: 'low',
      note: '"Noch nichts synthetisiert. Mach den Anfang!" — the English pun on "synthesized" is half-kept. May read as a non sequitur.',
    },
    {
      prefix: 'games.overlay.levelUpSubtitle',
      confidence: 'low',
      note: '"Charge fertig!" for "Batch complete!". "Charge" is the right lab word for a batch, but as a two-word celebration it may read as jargon to a 14-year-old.',
    },
    {
      prefix: 'games.acidClassification.instructionsTitle',
      confidence: 'low',
      note: '"Chemie-Sortierer" is a coinage for "Chemical Classifier". Understandable, but check it does not sound like a machine for sorting chemicals.',
    },
    {
      prefix: 'games.lewisStructures.glossary.loner',
      confidence: 'medium',
      note: 'German mirrors English\'s two tiers rather than picking one word: **"ungepaartes Elektron"** is the formal term (glossary, cheat sheet, prose), **"Einzelelektron"** is the game word (hub line, coach, hints, canvas), and **"einzeln"** is the short label on a dot. "Einzelelektron" is a real chemistry compound noun, transparent to a 14-year-old, and unambiguously about an electron. **It replaced "Einzelgänger", which was rejected:** that is a word for a *person* (a lone wolf), so it reads as cute rather than chemical, and German has no playful register for this the way English does for "loner". The remaining risk is register, not accuracy: a teacher may want the textbook term throughout.',
    },
    {
      prefix: 'games.lewisStructures.ui.lonerLabel',
      confidence: 'medium',
      note: 'The label printed on a pulsing dot at Level 1 (off from Level 2 — the scaffold is meant to be removed). "einzeln" rather than the full "Einzelelektron" because it has to fit beside a dot: it is the adjective, and the noun it abbreviates is on screen in the coach line and in the glossary. Check it reads as "on its own" rather than "individually" in context.',
    },
    {
      prefix: 'games.lewisStructures.glossary.duet',
      confidence: 'low',
      note: '"Duett" for the two-electron shell of hydrogen. German school chemistry has no settled word here — it usually says "Edelgaskonfiguration des Heliums" or just "voll bei zwei". "Duett" mirrors the English coinage and is short enough for a glossary chip, but a teacher may not recognise it.',
    },
    {
      prefix: 'gamesHub.lewisTitle',
      confidence: 'low',
      note: 'Coinage, and the weakest of the four game titles. "Teilen bis voll" is elliptical — grammatical as a headline, odd as a sentence — and loses the electron sense that "Share to Fill" carries for a reader who already knows the chemistry. Alternatives worth considering: "Teilen macht voll", "Paare bilden", or leaving the English title. Same open question as the other three: should game titles be translated at all?',
    },
    {
      prefix: 'games.lewisStructures.inspect.classmate',
      confidence: 'medium',
      note: 'The English says "Drawn by a classmate". German has no short gender-neutral word for a classmate — "Mitschülerin oder Mitschüler" is far too long for the line — so this says "von jemandem aus deiner Klasse". Correct and neutral, slightly more roundabout than the English.',
    },
    {
      prefix: 'games.lewisStructures.ui.supportMode',
      confidence: 'medium',
      note: '"Unterstützungsmodus" is long but transparent, and matches the "Unterstützung" heading in the settings panel. "Hilfemodus" is shorter but collides with „Spielanleitung“ in a reader’s head.',
    },
    {
      prefix: 'privacy',
      confidence: 'low',
      note: 'Privacy-policy prose. I am not a lawyer and this is not legal review: the German says what the English says, but the phrasing has not been checked against German data-protection conventions. Note also that the page describes Australian law (Privacy Act 1988, the OAIC) — those names deliberately stay English inside German sentences, which is correct but reads oddly. If the site is ever actually offered to German or EU students, this page needs a GDPR/DSGVO review that is out of scope for a translation pass.',
    },
    {
      prefix: 'privacy.cookiesBody2',
      confidence: 'medium',
      note: 'New paragraph, not a translation: the language-preference cookie this feature introduces had to be disclosed. Review the English too.',
    },
  ],

  fr: [
    // ---------------------------------------------------------------- high --
    {
      prefix: 'common',
      confidence: 'high',
      note: 'Everyday UI words with unambiguous French equivalents.',
    },
    {
      prefix: 'nav',
      confidence: 'high',
      note: 'Standard navigation vocabulary. "Connexion" is deliberately shorter than the English "Log in / Register", the same trade the German nav makes: the pair was the widest thing in the header, and the sign-in page offers both actions anyway.',
    },
    {
      prefix: 'nav.cheatSheets',
      confidence: 'medium',
      note: '"Antisèches". This is the exact French counterpart of the German "Spickzettel" Phase 1 chose, and of the English "cheat sheet" itself — the school word, with the same cheeky edge. It does carry the cheating connotation, so a teacher may prefer "fiches mémo" or "fiches de révision". Changing it touches nav, cheatSheets.* and meta.cheatSheetTitle together.',
    },
    {
      prefix: 'language',
      confidence: 'high',
      note: 'Switcher labels; short and unambiguous.',
    },
    {
      prefix: 'auth',
      confidence: 'high',
      note: 'Standard sign-in vocabulary. The placeholder email was localised to a .fr domain. "Te revoilà !" for "Welcome back" avoids the participle agreement that "Content de te revoir" would force onto the speaker.',
    },
    {
      prefix: 'feedback',
      confidence: 'high',
      note: 'Unlike German, French does not keep the English "Feedback": "Avis" is the natural word and is used throughout. "Problème" rather than "Bug" for the same reason.',
    },
    {
      prefix: 'settings',
      confidence: 'high',
      note: 'Standard settings vocabulary. "Paramètres" rather than "Réglages" for the global panel, and "Réglages du jeu" for the per-game one, so the two are distinguishable in speech.',
    },
    {
      prefix: 'settings.useGlobal',
      confidence: 'medium',
      note: 'Rendered as "Valeur par défaut" rather than a literal "Utiliser le global": French readers understand the concept better as "use the default". settings.overrideHelp quotes the same wording inside guillemets, so the two must change together.',
    },
    {
      prefix: 'footer',
      confidence: 'high',
      note: 'Short; the tagline is a free rendering rather than word-for-word, which suits a tagline.',
    },
    {
      prefix: 'yearLevels',
      confidence: 'high',
      note: 'Mapped by age rather than by name: Year 7 = 5e, Year 8 = 4e, Year 9 = 3e, Year 10 = 2de, Senior = 1re-Terminale. The stored value stays the English "Year 9"; only the label is French. Written as plain-text ordinals (3e, 2de) rather than the typographically correct superscripts, so no font in a filter pill has to carry the modifier letters.',
    },
    {
      prefix: 'chemistry',
      confidence: 'high',
      note: 'Fixed in docs/i18n/glossary-fr.md. Acide / base / neutre / amphotère are the French school terms. Note "Base" is the same word as the English and is allowlisted, while "Neutre" is not — the opposite split from German.',
    },
    {
      prefix: 'games.shared',
      confidence: 'high',
      note: 'Short game-chrome labels. "Niveau" rather than a loanword: French gaming has its own word where German borrows "Level".',
    },
    {
      prefix: 'games.shared.hint',
      confidence: 'medium',
      note: '"Astuce", and this is the decision the glossary exists for. The obvious translation of "hint" is *indice* — which is already fixed as the French for a formula **subscript**, in the one game whose entire teaching point is *indice* vs *coefficient*. A balancer reading "Indice 1 sur 3" above a chip defining "l\'indice est le petit chiffre dans une formule" would be actively confusing. "Coup de pouce" is the warmest option and was rejected at thirteen characters: it does not fit the header badge. Check "Astuce" reads as help rather than as a trick.',
    },
    {
      prefix: 'games.shared.labHint',
      confidence: 'medium',
      note: '"Astuce du labo" — follows games.shared.hint, and would change with it.',
    },
    {
      prefix: 'profileToggles',
      confidence: 'high',
      note: 'Plain switch labels.',
    },
    {
      prefix: 'serverMessages',
      confidence: 'high',
      note: 'Error and confirmation messages in plain French. Note the {word} placeholder stays the literal "DELETE": the action compares it byte for byte. exportLoginRequired was rephrased to "Tu dois te connecter" to avoid "connecté", which would have to agree in gender.',
    },
    {
      prefix: 'cheatSheets',
      confidence: 'high',
      note: 'Section headings for the reference pages. "Antisèches" follows nav.cheatSheets and would change with it.',
    },
    {
      prefix: 'games.reactionBalancer',
      confidence: 'high',
      note: 'Uses the glossary terms réactifs / produits / coefficient / indice / bilan des atomes / équilibrer. One open question for a teacher: the current French programme prints *ajuster* where students and teachers say *équilibrer*. The glossary picked *équilibrer* because the game shows a balance beam and because it pairs with "équation équilibrée"; if the audience\'s textbook says *ajuster*, that is a one-word change across this namespace.',
    },
    {
      prefix: 'games.reactionBalancer.coach',
      confidence: 'medium',
      note: 'These carry the French article device. A name placeholder cannot take an article, because French picks it from the name\'s gender and first letter (l\'oxygène but le carbone), so the templates say "l\'élément {element}" — which is safe for every element, since every French element name is masculine. It is correct and slightly more roundabout than the English. coach.multiple also ends "À vérifier maintenant : {broken}", a colon label, for the same reason.',
    },
    {
      prefix: 'games.reactionBalancer.card',
      confidence: 'high',
      note: 'Accessible names for the coefficient controls. "Add one water" cannot be translated with an article for the reason above, so these are colon labels — "Augmenter : {name}" — which are gender-free and read cleanly on a screen reader. Same solution German reached with a verb.',
    },
    {
      prefix: 'games.reactionBalancer.challenge',
      confidence: 'high',
      note: '"Défi" rather than keeping the English "Challenge" as German did: French has a short natural word and uses it. The wrong-side and not-in-reaction messages lead with a generic noun ("Cette substance …") so the compound name can follow a colon instead of needing an article.',
    },
    {
      prefix: 'games.reactionBalancer.glossary',
      confidence: 'high',
      note: 'The indice / coefficient contrast is the whole teaching point of the game, and French makes it as cleanly as German does. `matches` lists French word forms, so it is a different list from the English rather than a translation of it.',
    },
    {
      prefix: 'games.reactionBalancer.glossary.coefficient',
      confidence: 'high',
      note: '"coefficient" is spelled identically in French and English, so the term and both match words are allowlisted as identical-by-design. Worth stating plainly because it looks like an untranslated string and is not: the French really is "coefficient". The current programme says "nombre stœchiométrique"; that was rejected as something nobody says out loud, and it would break the audible indice/coefficient pair.',
    },
    {
      prefix: 'games.reactionBalancer.instructions.keyboard',
      confidence: 'high',
      note: 'Column one is the physical key and stays as printed (Tab, H, P). Only the description of what the key does is translated.',
    },
    {
      prefix: 'games.formulaBlaster',
      confidence: 'high',
      note: 'The feedback templates keep {formula} and {symbol} untranslated by design; only {compound} and {element} are localised names. All four were rewritten so no article ever precedes a name placeholder — "Ce n\'est pas ça : {compound}" rather than "C\'est {compound}", which would need "de l\'eau" but "du méthane".',
    },
    {
      prefix: 'games.neutralise',
      confidence: 'high',
      note: 'Ion notation (H⁺, OH⁻) left as-is. "Espace" is the French name for the space bar.',
    },
    {
      prefix: 'games.lewisStructures',
      confidence: 'medium',
      note: 'A whole new game. The chemistry terms are glossary-fixed (structure de Lewis, doublet non liant, doublet liant, liaison covalente, règle de l\'octet, électrons de valence), but the game deliberately writes around the jargon for a Year 9 reader, and that plain-language layer is mine rather than a textbook\'s. Rated medium as a body of work; the specific risks are listed below.',
    },
    {
      prefix: 'games.lewisStructures.instructions.keyboard',
      confidence: 'high',
      note: 'Column one is the physical key, named the way a French keyboard prints it: "Entrée" and "Échap" rather than Enter and Esc, while Tab, H and P are unchanged. This is the same reasoning that made German write "Leertaste" for the space bar and leave the rest — name the key the reader is looking at.',
    },
    {
      prefix: 'games.lewisStructures.glossary.lonePair',
      confidence: 'high',
      note: '"doublet non liant" is glossary-fixed; the calque "paire libre" and the older "doublet libre" were both rejected.',
    },
    {
      prefix: 'games.lewisStructures.glossary.duet',
      confidence: 'high',
      note: '**The one place French is in a better position than German.** Phase 1 had to coin "Duett" and rate it low, because German school chemistry has no settled word. French does: "la règle du duet et de l\'octet" is in the programme, and hydrogen, helium, lithium and beryllium are taught as following it. Nothing was invented here.',
    },
    {
      prefix: 'games.lewisStructures.counts',
      confidence: 'high',
      note: 'Counted noun phrases with their own plural forms, so the adjective agrees in both ("1 doublet liant" / "2 doublets liants"). French takes the singular at zero as well as at one, and Intl.PluralRules already knows that, so nothing special is needed.',
    },
    {
      prefix: 'games.lewisStructures.coach',
      confidence: 'medium',
      note: 'Almost every line here opens "{atom} : …". That is the article device again: "L\'oxygène a encore 2 solitaires" needs an article the placeholder cannot supply, and a bare "Oxygène a encore…" is not French. A name followed by a colon is idiomatic in a UI and works for every substitution. Worth a native read for rhythm — it is correct, but it is a repeated shape.',
    },

    // -------------------------------------------------------------- medium --
    {
      prefix: 'home',
      confidence: 'medium',
      note: 'Marketing copy. Accurate, but a native speaker may want to punch it up — promotional register is where translated copy most often reads flat.',
    },
    {
      prefix: 'gamesHub',
      confidence: 'medium',
      note: 'Game descriptions. The titles are rated separately below.',
    },
    {
      prefix: 'leaderboards',
      confidence: 'medium',
      note: '"Classement" and "Meilleur score" are both standard — note French does not keep the English "high score" the way German keeps "Highscore". The empty states are free renderings.',
    },
    {
      prefix: 'profile',
      confidence: 'medium',
      note: 'The "scientist" framing works better in French than in German, because *scientifique* and *élève* are both epicene: none of the gender contortions the German page needed are required here. Still worth a native read for register.',
    },
    {
      prefix: 'games.acidClassification',
      confidence: 'medium',
      note: 'Instruction steps for a Year 9-10 reader; the chemistry vocabulary is glossary-fixed but the phrasing is mine.',
    },
    {
      prefix: 'games.overlay',
      confidence: 'medium',
      note: 'Game-state copy with a lab metaphor running through it. The metaphor was kept, but French lab idiom is not identical to English lab idiom.',
    },
    {
      prefix: 'meta',
      confidence: 'medium',
      note: 'Page titles and descriptions.',
    },
    {
      prefix: 'games.lewisStructures.inspect.classmate',
      confidence: 'high',
      note: 'The English says "Drawn by a classmate". French has *élève*, which is epicene, so this is simply "un élève de ta classe" — none of the work German needed to avoid "Mitschülerin oder Mitschüler".',
    },
    {
      prefix: 'games.lewisStructures.glossary.outerElectron',
      confidence: 'medium',
      note: 'The match words are "externes", "externe", "de valence" and "valence" rather than the full phrases, because the tap-to-explain matcher uses a JavaScript \\b, which only knows ASCII letters — and "électrons externes" starts with é. The chip therefore lands on one word instead of the whole phrase. Correct and findable; slightly less tidy on screen than the German or the English.',
    },
    {
      prefix: 'games.lewisStructures.ui.supportMode',
      confidence: 'medium',
      note: '"Mode assistance" is transparent and matches the "Assistance" heading in the settings panel.',
    },

    // ----------------------------------------------------------------- low --
    {
      prefix: 'meta.keywords',
      confidence: 'low',
      note: 'SEO keywords are keyword research, not translation. These are plausible French search terms, not researched ones. The one thing deliberately got right is the age band: the site is Year 9-10, which is 3e/2de in France, so the list says "chimie 3e" and "chimie seconde" and not "chimie lycée" — the French equivalent of the "Chemie Oberstufe" error Phase 1 had to correct.',
    },
    {
      prefix: 'gamesHub.acidTitle',
      confidence: 'low',
      note: '"Acide ou base ?" — the direct question, which works as a title in French exactly as in English and is what the game asks. Rejected: "Acide, base ou neutre ?" (truer to the four-way sort, too long for the card) and "Le tri des acides" (worksheet, and names a machine).',
    },
    {
      prefix: 'gamesHub.blasterTitle',
      confidence: 'low',
      note: 'Coinage. "Éclate-Formules": *éclater* is what French says bubbles do, and verbe+nom (trouble-fête, brise-glace) is a productive way to build a French product name. Runner-up "Casse-Formules" echoes *casse-brique*, the French name for the Breakout genre — a stronger arcade signal but the wrong mechanic. Rejected: "Formule Blaster" (calque; "Blaster" reads as English filler) and "Chasse aux formules" (sounds like a worksheet).',
    },
    {
      prefix: 'gamesHub.neutraliseTitle',
      confidence: 'low',
      note: '"Neutralise !" mirrors the English\'s deliberate imperative, and French imperatives do work as titles. GAMES.md\'s warning is the thing to check: does it read as a name or as an order? Runner-up "Riposte ionique" reads more like a product but says "ions" without saying "neutralisation". Rejected: "Neutralisation" — a textbook chapter heading.',
    },
    {
      prefix: 'gamesHub.balancerTitle',
      confidence: 'low',
      note: '"La balance des atomes" names the beam the game actually shows and says the chemistry. Rejected: "Équilibreur de réactions" — *équilibreur* is a machine in French (a wheel balancer), which is precisely the "sounds like a machine for sorting chemicals" trap GAMES.md names — and "Réaction-Balancer", a calque with German-style compounding imposed on French. "Équilibre la réaction" was dropped only because the hub would then have two imperative titles. At 21 characters it is the longest of the six; it was checked on the hub card and the game header at 360 px.',
    },
    {
      prefix: 'gamesHub.lewisTitle',
      confidence: 'low',
      note: '"Partage et complète" — GAMES.md asks for "a phrase that names the rule in that language", and two short imperatives do that. Runner-up "Chacun son doublet" plays on *chacun son tour* and is more charming, but it assumes *doublet* is already known and the game is where you learn it. Rejected: "Partage pour remplir" (calque; the purpose clause is clumsy in French) and "Deux par deux" (memorable, loses the filling half of the rule).',
    },
    {
      prefix: 'gamesHub.bondsTitle',
      confidence: 'low',
      note: '"Liaisons chimiques" is a topic name rather than a coinage, so the direct translation is right. Rated low only because every title is the owner\'s call.',
    },
    {
      prefix: 'profile.defaultTitle',
      confidence: 'low',
      note: '"Scientifique du labo" is an invention. The English "Registered Scientist" has no faithful French equivalent that fits a small badge without an adjective that would have to agree in gender; *scientifique* being epicene is what makes even this much work.',
    },
    {
      prefix: 'profile.labNotesEmpty',
      confidence: 'low',
      note: 'Rewritten rather than translated, because the English joke ("observing reactions in silence") does not carry. Check the new one is actually charming in French and not just odd.',
    },
    {
      prefix: 'leaderboards.noData',
      confidence: 'low',
      note: '"Rien de synthétisé pour l\'instant. À toi de commencer !" — the English pun on "synthesized" is half-kept. May read as a non sequitur.',
    },
    {
      prefix: 'games.overlay.levelUpSubtitle',
      confidence: 'low',
      note: '"Série terminée !" for "Batch complete!". French lab French for a batch is *un lot* or *une série*; neither is the celebratory register the English has. Same problem German hit with "Charge fertig!".',
    },
    {
      prefix: 'games.acidClassification.instructionsTitle',
      confidence: 'medium',
      note: 'Unlike German, this does not coin a name for the classifier: it reuses the game\'s own title ("Comment jouer : Acide ou base ?"), which avoids the "sounds like a machine" problem "Chemie-Sortierer" ran into.',
    },
    {
      prefix: 'games.lewisStructures.glossary.loner',
      confidence: 'low',
      note: 'French gets its own two-tier pair rather than calquing English or German: **"électron célibataire"** is the formal term (glossary, cheat sheet, prose), **"solitaire"** is the game word (hub line, coach, hints, canvas), and **"seul"** is the short label on a dot. The interesting difference from German is that French\'s *formal* term is already the vivid one — *célibataire* is what a French textbook says about a radical — so *solitaire* had to be the second tier rather than the first. **Rejected: "célibataire" as the game word** (collapses the two tiers the game is built on, and the scaffold stops being a scaffold), **"orphelin"** (a word for a child, cute rather than chemical — the same objection German raised against "Einzelgänger"), **"solo"** (right register, too slangy, and says nothing about pairing) and **"dépareillé"** (the best idea of the four — it is the everyday word for "not part of a matching pair" — but it does not nominalise, and the coach lines need a noun). The risk is register, not accuracy: a teacher may want *célibataire* throughout and read *solitaire* as a sloppy synonym rather than a deliberate second tier. If it changes, the edit touches every line of this game.',
    },
    {
      prefix: 'games.lewisStructures.ui.lonerLabel',
      confidence: 'low',
      note: 'The label printed on a pulsing dot at Level 1 (off from Level 2 — the scaffold is meant to be removed). "seul" rather than the full "solitaire" because it has to fit beside a dot: four characters, and it is the adjective of the same idea. Check it reads as "on its own" rather than "only" in context.',
    },
    {
      prefix: 'privacy',
      confidence: 'low',
      note: 'Privacy-policy prose. I am not a lawyer and this is not legal review: the French says what the English says, but the phrasing has not been checked against French data-protection conventions. Note also that the page describes Australian law (Privacy Act 1988, the OAIC) — those names deliberately stay English inside French sentences, which is correct but reads oddly. If the site is ever actually offered to French or EU students, this page needs an RGPD review that is out of scope for a translation pass.',
    },
    {
      prefix: 'privacy.cookiesBody2',
      confidence: 'medium',
      note: 'The language-preference cookie this feature introduces had to be disclosed; the French follows the German paragraph rather than the original English.',
    },
  ],

  es: [
    // ---------------------------------------------------------------- high --
    {
      prefix: 'common',
      confidence: 'high',
      note: 'Everyday UI words with unambiguous Spanish equivalents.',
    },
    {
      prefix: 'nav',
      confidence: 'high',
      note: 'Standard navigation vocabulary. "Iniciar sesión" is still shorter than the English "Log in / Register", so the header pair that forced German and French to abbreviate is not a problem here.',
    },
    {
      prefix: 'nav.cheatSheets',
      confidence: 'medium',
      note: '"Chuletas". The exact Spanish counterpart of the German "Spickzettel" and the French "antisèche" — the school word, with the same cheeky edge (it also means a pork chop, which is the same kind of joke "cheat sheet" is). Two risks, not one: it carries the cheating connotation, so a teacher may prefer "fichas de repaso"; and **it is the strongest es-ES marker in the whole UI** — Latin America says *acordeón* (MX), *torpedo* (CL) or *machete* (AR). Changing it touches nav, cheatSheets.* and meta.cheatSheetTitle together.',
    },
    {
      prefix: 'language',
      confidence: 'high',
      note: 'Switcher labels; short and unambiguous.',
    },
    {
      prefix: 'auth',
      confidence: 'high',
      note: 'Standard sign-in vocabulary. The placeholder email was localised to a .es domain. Two strings were rewritten rather than translated because Spanish adjectives agree with the reader: "Welcome back" is "¡Hola de nuevo!" (not *Bienvenido*, which addresses a boy) and "New to ChemGames?" asks about the visit rather than the person.',
    },
    {
      prefix: 'feedback',
      confidence: 'high',
      note: 'Like French and unlike German, Spanish does not keep the English "Feedback": "Comentarios" is the natural word. "Problema" rather than "Bug" for the same reason. Note "Idea" is genuinely the same word in both languages and is allowlisted rather than replaced.',
    },
    {
      prefix: 'settings',
      confidence: 'high',
      note: 'Standard settings vocabulary.',
    },
    {
      prefix: 'settings.globalTitle',
      confidence: 'medium',
      note: '**"Opciones", deliberately not "Ajustes"** — and this is one of the decisions the glossary exists to catch. *Ajustes* is the ordinary Spanish for app settings, but *ajustar* is this site\'s verb for balancing an equation (Reaction Balancer, throughout), so a reader would meet the same root meaning two unrelated things on two screens. "Opciones" is what a game calls this panel anyway. *Configuración* was the third option and is four characters longer.',
    },
    {
      prefix: 'settings.useGlobal',
      confidence: 'medium',
      note: 'Rendered as "Valor por defecto" rather than a literal "Usar el global". settings.overrideHelp quotes the same wording inside guillemets, so the two must change together.',
    },
    {
      prefix: 'footer',
      confidence: 'high',
      note: 'Short; the tagline is a free rendering rather than word-for-word, which suits a tagline.',
    },
    {
      prefix: 'yearLevels',
      confidence: 'high',
      note: 'Mapped by age onto the Spanish system: Year 7 = 1º ESO, Year 8 = 2º ESO, Year 9 = 3º ESO, Year 10 = 4º ESO, Senior = Bachillerato. The stored value stays the English "Year 9"; only the label is Spanish. The masculine ordinal indicator (º) is one character and needs no superscript font in a filter pill.',
    },
    {
      prefix: 'chemistry',
      confidence: 'high',
      note: 'Fixed in docs/i18n/glossary-es.md. Ácido / base / neutro / anfótero are the Spanish school terms. Note "Base" is the same word as the English and is allowlisted, while "Neutro" is not — the same split French has, and the opposite of German.',
    },
    {
      prefix: 'games.shared',
      confidence: 'high',
      note: 'Short game-chrome labels. "Nivel" rather than a loanword: Spanish gaming has its own word where German borrows "Level".',
    },
    {
      prefix: 'games.shared.hint',
      confidence: 'high',
      note: '**"Pista", and this is where Spanish is in a better position than French.** The French run had to abandon the obvious word for "hint" (*indice*) because it is also the French for a formula **subscript**, in the one game whose entire teaching point is that contrast — and the handover predicted Spanish would hit the same wall. It does not: a subscript in Spanish is *subíndice* and a hint is *pista*, and the two share no word. *Pista* is five characters, so it fits the header badge that ruled out French\'s *coup de pouce*. Rejected: *indicio* (a clue in a detective sense), *consejo* (advice from a teacher) and *ayuda* (already the word for help in general).',
    },
    {
      prefix: 'profileToggles',
      confidence: 'high',
      note: 'Plain switch labels.',
    },
    {
      prefix: 'serverMessages',
      confidence: 'high',
      note: 'Error and confirmation messages in plain Spanish. Note the {word} placeholder stays the literal "DELETE": the action compares it byte for byte. exportLoginRequired names the action ("Tienes que iniciar sesión") rather than the state, to avoid "estar conectado", which would have to agree in gender.',
    },
    {
      prefix: 'cheatSheets',
      confidence: 'high',
      note: 'Section headings for the reference pages. "Chuletas" follows nav.cheatSheets and would change with it.',
    },
    {
      prefix: 'cheatSheets.forStudents',
      confidence: 'high',
      note: '"Para el alumnado" rather than "Para los alumnos", which would default to masculine. Spanish has exact collective nouns for both audiences, and using them solves the gender problem outright instead of working around it.',
    },
    {
      prefix: 'cheatSheets.forTeachers',
      confidence: 'high',
      note: '"Para el profesorado", the same device as forStudents.',
    },
    {
      prefix: 'games.reactionBalancer',
      confidence: 'high',
      note: 'Uses the glossary terms reactivos / productos / coeficiente / subíndice / recuento de átomos / ajustar. **The one thing to check is the variety, not the translation:** Spain says *ajustar una ecuación* and Latin America says *balancear*. It is the single most visible es-ES marker on the site, it appears in this namespace dozens of times, and the decision is argued at the top of glossary-es.md.',
    },
    {
      prefix: 'games.reactionBalancer.coach',
      confidence: 'medium',
      note: 'These carry the Spanish article device. A name placeholder cannot take an article, because Spanish picks it from the name\'s gender (*el oxígeno* but *la glucosa*) and because *de + el* contracts obligatorily to *del* — so even "de {name}" is unsafe. The templates say "el elemento {element}", which works for **every** element including *la plata*, because the article agrees with *elemento* and the name sits in apposition. That is a stronger guarantee than the French version of the same device, which relies on every French element name being masculine.',
    },
    {
      prefix: 'games.reactionBalancer.card',
      confidence: 'high',
      note: 'Accessible names for the coefficient controls. "Add one water" cannot be translated with an article for the reason above, so these are colon labels — "Aumentar: {name}" — which are gender-free and read cleanly on a screen reader. The same solution French reached, and German reached with a verb.',
    },
    {
      prefix: 'games.reactionBalancer.challenge',
      confidence: 'high',
      note: '"Reto" rather than keeping the English "Challenge" as German did: Spanish has a short natural word and uses it (*Desafío* is the longer synonym). The wrong-side and not-in-reaction messages lead with a generic noun ("Esta sustancia …") so the compound name can follow a colon instead of needing an article.',
    },
    {
      prefix: 'games.reactionBalancer.ledger',
      confidence: 'medium',
      note: '"Recuento de átomos" for the game\'s own name for the table under the arrow. **Rejected: "balance de átomos"**, which is the obvious rendering and would quietly reintroduce *balance*/*balancear* right next to a deliberate *ajustar* — undercutting the variety decision one table at a time. *Recuento* says what the table is: a tally.',
    },
    {
      prefix: 'games.reactionBalancer.glossary',
      confidence: 'high',
      note: 'The subíndice / coeficiente contrast is the whole teaching point of the game, and Spanish makes it as cleanly as German does. Unlike French, nothing here is identical-by-design: the Spanish really is *coeficiente*, not "coefficient".',
    },
    {
      prefix: 'games.reactionBalancer.beam',
      confidence: 'medium',
      note: 'The beam is *la balanza* and "the beam is level" is "La balanza está equilibrada". That is a **different referent** from *ajustar* — a physical object on screen, not the equation — so the two do not compete, and the glossary says so explicitly. Worth a native read to confirm it does not look like a second verb for balancing.',
    },
    {
      prefix: 'games.reactionBalancer.instructions.keyboard',
      confidence: 'high',
      note: 'Column one is the physical key and stays as printed (Tab, H, P). Only the description of what the key does is translated.',
    },
    {
      prefix: 'games.formulaBlaster',
      confidence: 'high',
      note: 'The feedback templates keep {formula} and {symbol} untranslated by design; only {compound} and {element} are localised names. All four were rewritten so no article ever precedes a name placeholder — "No es eso: {compound}" rather than "Es {compound}", which would need "el metano" but "el agua".',
    },
    {
      prefix: 'games.neutralise',
      confidence: 'high',
      note: 'Ion notation (H⁺, OH⁻) left as-is. "Espacio" is the Spanish name for the space bar.',
    },
    {
      prefix: 'games.lewisStructures',
      confidence: 'medium',
      note: 'A whole new game. The chemistry terms are glossary-fixed (estructura de Lewis, par solitario, par enlazante, enlace covalente, regla del octeto, electrones de valencia), but the game deliberately writes around the jargon for a Year 9 reader, and that plain-language layer is mine rather than a textbook\'s. Rated medium as a body of work; the specific risks are listed below.',
    },
    {
      prefix: 'games.lewisStructures.instructions.keyboard',
      confidence: 'high',
      note: 'Column one is the physical key, named the way a Spanish keyboard prints it: "Intro" rather than Enter, while Tab, Esc, H and P are unchanged. The same reasoning that made German write "Leertaste" and French "Entrée" — name the key the reader is looking at.',
    },
    {
      prefix: 'games.lewisStructures.glossary.lonePair',
      confidence: 'high',
      note: '"par solitario" is the Spanish school term and is glossary-fixed. **This entry is load-bearing well beyond itself:** because *solitario* is already taken by the lone pair, it is unavailable as the game\'s word for a single unpaired electron — see games.lewisStructures.glossary.loner. The formal alternative *par no enlazante* is glossed once where the Lewis sheet defines the idea and is not used as a second name in running text.',
    },
    {
      prefix: 'games.lewisStructures.glossary.sharedPair',
      confidence: 'high',
      note: '"par enlazante". **Rejected: "par compartido"**, which is the transparent rendering and was tempting — but the game\'s own verb is *compartir* ("Comparte y completa"), so "comparte un par compartido" is tautological in a way "comparte un par enlazante" is not.',
    },
    {
      prefix: 'games.lewisStructures.glossary.outerElectron',
      confidence: 'high',
      note: '**Where Spanish gets off lighter than French, and the reason is worth knowing.** The tap-to-explain matcher uses a JavaScript \\b, which only knows ASCII letters, so French had to move the chip off "électrons externes" onto a single later word because the phrase begins with é. Spanish\'s accent is *medial*, not initial: *electrón* begins with e and ends with n, and the plural *electrones* has no accent at all. So the full phrases work as match words and the chip lands on the whole term, as it does in English.',
    },
    {
      prefix: 'games.lewisStructures.glossary.duet',
      confidence: 'medium',
      note: 'Spanish sits between the other two here. German had to coin "Duett" and rate it low; French already had "la règle du duet" in its national programme and rated it high. Spanish has **"la regla del dueto"** in circulation — it appears in Spanish-language textbooks, especially Latin American ones — so nothing was invented, but it is not as settled as the octet rule and plenty of teachers simply say hydrogen is full at two. The alternative is "la regla del dúo".',
    },
    {
      prefix: 'games.lewisStructures.counts',
      confidence: 'high',
      note: 'Counted noun phrases with their own plural forms, so the adjective agrees in both ("1 par enlazante" / "2 pares enlazantes"). Note Spanish takes the **plural** at zero ("0 impares"), the opposite of French, and Intl.PluralRules already knows that — nothing special is needed.',
    },
    {
      prefix: 'games.lewisStructures.coach',
      confidence: 'medium',
      note: 'Almost every line here opens "{atom}: …". That is the article device again: "El oxígeno tiene 2 impares" needs an article the placeholder cannot supply, and a bare "Oxígeno tiene…" is not Spanish. A name followed by a colon is idiomatic in a UI and works for every substitution. Worth a native read for rhythm — it is correct, but it is a repeated shape.',
    },
    {
      prefix: 'games.lewisStructures.inspect.classmate',
      confidence: 'high',
      note: 'The English says "Drawn by a classmate". Written as a noun phrase — "Dibujo de alguien de tu clase" — for two reasons: *alguien* is epicene, so none of the work German needed for "Mitschülerin oder Mitschüler" arises; and a participle ("Dibujado…") would have to agree with the thing drawn.',
    },

    // -------------------------------------------------------------- medium --
    {
      prefix: 'home',
      confidence: 'medium',
      note: 'Marketing copy. Accurate, but a native speaker may want to punch it up — promotional register is where translated copy most often reads flat. Note leaderboardsDescription says "las mejores puntuaciones" rather than "los mejores científicos", because the person noun would default to masculine.',
    },
    {
      prefix: 'gamesHub',
      confidence: 'medium',
      note: 'Game descriptions. The titles are rated separately below.',
    },
    {
      prefix: 'leaderboards',
      confidence: 'medium',
      note: '"Clasificación" and "Mejor puntuación" are both standard; Spanish does not keep the English "high score" the way German keeps "Highscore". "Puesto" rather than "Rango" for a position in a ranking. The empty states are free renderings.',
    },
    {
      prefix: 'leaderboards.firstResultTitle',
      confidence: 'medium',
      note: 'Rewritten, not translated: "Ready for your first result?" has no gender-neutral Spanish rendering that keeps the adjective (*¿Listo?* addresses a boy, *¿Lista?* a girl). It is now a statement about the result — "Tu primer resultado te espera." — which loses the direct address and keeps the invitation. Same device as auth.loginTitle and games.overlay.levelUpDescription.',
    },
    {
      prefix: 'profile',
      confidence: 'medium',
      note: 'The "scientist" framing is harder in Spanish than in French: *científico* is gendered and Spanish has no counterpart to the epicene *scientifique*. Handled with epicene and collective nouns where they exist (*miembro*, *estudiante*, *alumnado*). Also note profile.editHeading avoids "Ajustar el equipo": this site reserves *ajustar* for balancing an equation.',
    },
    {
      prefix: 'games.acidClassification',
      confidence: 'medium',
      note: 'Instruction steps for a Year 9-10 reader; the chemistry vocabulary is glossary-fixed but the phrasing is mine.',
    },
    {
      prefix: 'games.acidClassification.instructionsTitle',
      confidence: 'medium',
      note: 'Like French and unlike German, this does not coin a name for the classifier: it reuses the game\'s own title ("Cómo jugar: ¿Ácido o base?"), which avoids the "sounds like a machine" problem "Chemie-Sortierer" ran into.',
    },
    {
      prefix: 'games.overlay',
      confidence: 'medium',
      note: 'Game-state copy with a lab metaphor running through it. The metaphor was kept, but Spanish lab idiom is not identical to English lab idiom.',
    },
    {
      prefix: 'meta',
      confidence: 'medium',
      note: 'Page titles and descriptions.',
    },
    {
      prefix: 'games.lewisStructures.ui.supportMode',
      confidence: 'medium',
      note: '"Modo de apoyo" is transparent and matches the "Apoyo" heading in the settings panel, so the two read as one feature.',
    },
    {
      prefix: 'games.lewisStructures.coach.label',
      confidence: 'medium',
      note: '"Guía" for the coach strip. Spanish does use *coach* as a loanword, but it is business register rather than the naturalised word French has, and *entrenador* and *tutor* both force a gender. "Guía" is epicene, short, and says what the panel does; it does not collide with "Skip guide", which is rendered "Saltar la explicación". Worth a native read.',
    },

    // ----------------------------------------------------------------- low --
    {
      prefix: 'meta.keywords',
      confidence: 'low',
      note: 'SEO keywords are keyword research, not translation. These are plausible Spanish search terms, not researched ones. The one thing deliberately got right is the age band: the site is Year 9-10, which is 3º/4º de ESO in Spain, so the list says "química 3º ESO" and "química 4º ESO" and **not** "química bachillerato" — the Spanish equivalent of the "Chemie Oberstufe" error Phase 1 had to correct, which named ages 16–19 for a 14–16 site.',
    },
    {
      prefix: 'gamesHub.acidTitle',
      confidence: 'low',
      note: '"¿Ácido o base?" — the direct question, which works as a title in Spanish exactly as in English and is what the game asks. Runner-up: "¿Ácido, base o neutro?" (truer to the four-way sort, too long for the card). Rejected: "El detector de ácidos" — names a machine, the GAMES.md trap.',
    },
    {
      prefix: 'gamesHub.blasterTitle',
      confidence: 'low',
      note: 'Coinage. "Rompefórmulas": *verbo + sustantivo* written as one word is how Spanish builds this kind of name — *rompecabezas*, *sacacorchos*, *cascanueces*, *cuentagotas* — and this one lands on *rompecabezas*, the Spanish word for a puzzle, so it reads as a game on sight. Runner-up "Revientafórmulas" is truer to the popping mechanic (*reventar* is what Spanish says bubbles do) and four characters heavier to say. Rejected: "Formula Blaster" (calque; "Blaster" reads as English filler) and "Caza de fórmulas" (sounds like a worksheet).',
    },
    {
      prefix: 'gamesHub.neutraliseTitle',
      confidence: 'low',
      note: '"¡Neutraliza!" mirrors the English\'s deliberate imperative, and Spanish imperatives do work as titles. GAMES.md\'s warning is the thing to check: does it read as a name or as an order? Runner-up "Defensa iónica" reads more like a product but says "ions" without saying "neutralisation". Rejected: "Neutralización" — a textbook chapter heading.',
    },
    {
      prefix: 'gamesHub.balancerTitle',
      confidence: 'low',
      note: '"La balanza de átomos" names the beam the game actually shows and says the chemistry. Rejected: "Ajustador de reacciones" — an *ajustador* is a person or a machine (a fitter, a claims adjuster), precisely the "sounds like a machine for sorting chemicals" trap GAMES.md names — and, more seriously, **"Equilibrio químico", which is a real and completely different topic** (chemical equilibrium) and would mislead any student who has met it. "Ajusta la reacción" was dropped only because the hub would then have two imperative titles.',
    },
    {
      prefix: 'gamesHub.lewisTitle',
      confidence: 'low',
      note: '"Comparte y completa" — GAMES.md asks for "a phrase that names the rule in that language", and two short alliterative imperatives do that. Runner-up "Cada oveja con su pareja" is a real Spanish saying about pairing off and is far more memorable, but it is folksy, 23 characters, and says nothing chemical. Rejected: "Comparte para completar" (calque; the purpose clause is clumsy) and "De dos en dos" (memorable, loses the filling half of the rule).',
    },
    {
      prefix: 'gamesHub.bondsTitle',
      confidence: 'low',
      note: '"Enlaces químicos" is a topic name rather than a coinage, so the direct translation is right. Rated low only because every title is the owner\'s call.',
    },
    {
      prefix: 'profile.defaultTitle',
      confidence: 'low',
      note: '"Mente científica" is an invention, and the gender problem is why. "Registered Scientist" has no epicene Spanish equivalent — *científico* is gendered, and Spanish has no counterpart to French\'s *scientifique* — so every faithful rendering defaults to masculine on the reader\'s own profile badge. This describes a mind rather than a person, which is what makes it work. The literal alternative is "Científico del laboratorio".',
    },
    {
      prefix: 'profile.labNotesEmpty',
      confidence: 'low',
      note: 'Rewritten rather than translated, because the English joke ("observing reactions in silence") does not carry. Check the new one is actually charming in Spanish and not just odd.',
    },
    {
      prefix: 'leaderboards.noData',
      confidence: 'low',
      note: '"Todavía no se ha sintetizado nada. ¡Empieza tú!" — the English pun on "synthesized" is half-kept. May read as a non sequitur.',
    },
    {
      prefix: 'games.overlay.levelUpSubtitle',
      confidence: 'low',
      note: '"¡Tanda completa!" for "Batch complete!". *Tanda* is the right word for a batch, but as a two-word celebration it may read as flat rather than triumphant. The same problem German hit with "Charge fertig!" and French with "Série terminée !".',
    },
    {
      prefix: 'games.lewisStructures.glossary.loner',
      confidence: 'low',
      note: '**Spanish gets its own two-tier pair, and one option was ruled out on chemistry rather than taste.** "electrón desapareado" is the formal term (glossary, cheat sheet, prose), **"impar"** is the game word (hub line, coach, hints, canvas), and *impar* is also the label on a dot. **"solitario" — the French answer — is unavailable**, because Spanish already calls a lone pair a *par solitario*: in the one game that teaches the difference between one unpaired electron and two that stay together, "quedan 2 solitarios" and "quedan 2 pares solitarios" would be adjacent coach lines differing by one word and meaning opposite things. *Impar* is exactly the chemistry ("not one of a pair"), it nominalises (*un impar*, *los impares*), it is five ASCII characters, and it hands the game a root the other three languages do not have: *empareja los impares para formar pares*. **Rejected: "libre"** (*electrón libre* already means a delocalised electron, which the bonding sheet teaches on this same site), **"suelto"** (good, but the bare noun *los sueltos* is Spanish for loose change and the coach lines need the bare noun), **"soltero"** (the literal analogue of French\'s *célibataire*, but Spanish chemistry does not use it and it reads as a joke about bachelors) and **"desparejado"** (the best of them — the everyday word for an odd sock — but twelve characters is too long for a dot label and too heavy to repeat three times a sentence). The risk is register, not accuracy: *impar* is also the everyday word for an **odd number**, so a reader meeting it cold beside a dot may hear "number 3" rather than "unpaired". Check it with a real teenager. If it changes, the edit touches every line of this game.',
    },
    {
      prefix: 'games.lewisStructures.ui.lonerLabel',
      confidence: 'low',
      note: 'The label printed on a pulsing dot at Level 1, off from Level 2 — the scaffold the brief removes on purpose. It is the **same word** as the game word, and that is a fact about Spanish rather than a shortcut: German shortened the noun *Einzelelektron* to the adjective *einzeln* and French shortened *solitaire* to *seul*, but in Spanish the game word already **is** the adjective (*electrón impar* → *impar*), so there is nothing to shorten to and a third word would invent a distinction Spanish does not make. Five characters. Check it reads as "odd one out" beside a single dot.',
    },
    {
      prefix: 'privacy',
      confidence: 'low',
      note: 'Privacy-policy prose. I am not a lawyer and this is not legal review: the Spanish says what the English says, but the phrasing has not been checked against Spanish data-protection conventions. Note also that the page describes Australian law (Privacy Act 1988, the OAIC) — those names deliberately stay English inside Spanish sentences, which is correct but reads oddly. If the site is ever actually offered to Spanish or EU students, this page needs an RGPD/LOPDGDD review that is out of scope for a translation pass.',
    },
    {
      prefix: 'privacy.cookiesBody2',
      confidence: 'medium',
      note: 'The language-preference cookie this feature introduces had to be disclosed; the Spanish follows the German and French paragraphs rather than the original English.',
    },
  ],
};

/**
 * Appended to the generated review document. This is where the assessment that
 * does not fit in a table row goes — the cheat sheets and the chemistry names,
 * which are reviewed as bodies of work rather than string by string.
 */
export const REVIEW_SUMMARY: Record<string, string> = {
  de: `
---

## Chemistry names — \`src/i18n/chemistry-names/de.ts\`

Not in the table above: these are keyed by registry identifier rather than by
dictionary path, and there are 193 of them.

| Group | Count | Confidence | Notes |
|---|---|---|---|
| Element names | 118 | **high** | German element names are standardised and I am confident in the table. The spellings follow German IUPAC usage: Calcium (not Kalzium), Silicium (not Silizium), Iod (not Jod), Caesium (not Cäsium), Cobalt (not Kobalt), Bismut (not Wismut). If the site's audience is Austrian or Swiss rather than German, check whether they prefer the older spellings. |
| Compound names | 35 | **high** for the salts and hydroxides, **medium** for the acids | Salts compose predictably (Natriumhydroxid, Calciumchlorid). The acids are the judgement calls: HCl is **Salzsäure** and HF is **Flusssäure** — German names the common mineral acids after the solution rather than systematically, which is what a school textbook does, but a chemistry teacher may prefer Chlorwasserstoffsäure / Fluorwasserstoffsäure in a formal context. |
| Ion names | 40 | **high** | Note a deliberate modernisation: German uses the systematic *Hydrogen-* prefix where the English source data still uses the older *bi-*. Bicarbonate becomes Hydrogencarbonat, bisulfate becomes Hydrogensulfat. This is correct German but it is not a literal translation of the English, so it is worth knowing about. |

**Specifically worth a second pair of eyes:** \`Ts\` (Tennessine) is given as
"Tenness", which is the IUPAC German form but is rarely written; and
\`H4SiO4\` is "Kieselsäure" where the fully systematic name would be
"Orthokieselsäure".

## Game data — \`src/i18n/chemistry-names/de.ts\`

Also keyed by identifier rather than by dictionary path: the prose the two new
games read straight out of the core-engine datasets. 104 entries, all new in
this pass.

| Group | Count | Confidence | Notes |
|---|---|---|---|
| Species names (\`SPECIES_NAMES_DE\`) | 53 | **high** | Everyday names for the compounds a Reaction Balancer card can show. Composed the German way (Natriumhydrogencarbonat, Kupfer(II)-nitrat). One deliberate decision: HCl is **Chlorwasserstoff**, the substance, because that is what a card labels; the reaction descriptions say **Salzsäure** where the reaction happens in water. English uses "hydrogen chloride" for both and loses that distinction. |
| Reaction prose (\`REACTION_TEXT_DE\`) | 33 × up to 4 | **medium** | Name, macroscopic observation, strategy hint and word equation for every reaction. The observations are the risk: they are short pieces of lab description ("zischt über die Wasseroberfläche", "ein Funkenregen") where a flat translation reads flat. The reaction *names* follow German convention — Haber-Bosch-Verfahren, not "Haber-Verfahren"; Fotosynthese with an F; Zellatmung. |
| Lewis molecule prose (\`LEWIS_MOLECULE_TEXT_DE\`) | 18 × 3 | **medium** | Name, tier-2 hint and property line per molecule. Names follow German IUPAC: **Phosphan** (not Phosphin), **Ethin** (not Ethyn), **Tetrachlormethan**, **Chlormethan**, **Schwefelwasserstoff**. Those five are worth a teacher's eye — the English data uses the older or the British forms. |

**Structurally out of reach of a translator, by design:** equations, formulae,
bond lines, state symbols, atom lists and level assignments are not in the
overlay at all, and \`chemistry-names.test.ts\` asserts they come through
byte-identical. The same test fails the suite if a reaction gains a German word
equation it does not have in English, because the game decides what to show by
whether one exists.

## Cheat sheets — \`src/i18n/cheat-sheets/de.ts\`

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

1. **The two naming sheets** (\`naming-compounds\`, \`organic-nomenclature\`). I
   changed what they teach, because teaching English naming rules in German
   would be worse than useless. That is the right call but it is beyond what a
   translator should decide alone.
2. **Register in the playful copy.** Overlay messages, empty states and the
   marketing hero are where a non-native translation reads as "correct but
   flat". None of it is wrong; some of it may be charmless.
3. **"Einzelelektron" / "einzeln".** The word Share to Fill is built on, in
   every coach line, every hint and on the canvas. It replaced "Einzelgänger",
   which was a word for a *person* and read as cute rather than chemical. The
   split mirrors the English: "ungepaartes Elektron" is the formal term in the
   glossary, "Einzelelektron" is the game word, "einzeln" is the dot label.
   Accuracy is no longer the worry; register is. If a teacher wants the
   textbook term throughout, the edit still touches every line of that game.
4. **Game titles.** Four coinages now, no strong opinion behind any of them.
   "Teilen bis voll" is the weakest.
5. **The privacy page.** Legally unreviewed, and describing Australian law.
6. **Compound acid names.** Salzsäure/Flusssäure is the school convention; a
   more formal audience may expect the systematic names.
`,

  fr: `
---

## Chemistry names — \`src/i18n/chemistry-names/fr.ts\`

Not in the table above: these are keyed by registry identifier rather than by
dictionary path, and there are 193 of them.

| Group | Count | Confidence | Notes |
|---|---|---|---|
| Element names | 118 | **high** | French element names are standardised and I am confident in the table. Two things a reviewer should know. **The trap the brief names is real:** nitrogen is *azote*, never "nitrogène". And **Na and K are *not* false friends in French** — they are *sodium* and *potassium*, the same words as English, where German has Natrium and Kalium. That difference required a change to \`chemistry-names.test.ts\`, which listed both as names any real translation must change. Spellings follow French IUPAC usage: césium, soufre, étain, iode, bismuth, silicium, tungstène, molybdène. |
| Compound names | 35 | **high** for the salts and hydroxides, **medium** for the acids | French composes them the other way round from both other languages: anion first, then *de* and the cation — *hydroxyde de sodium*, where German writes one word and English writes two in the opposite order. The acids are the judgement calls: binary acids take *-hydrique* (*acide chlorhydrique*, *acide fluorhydrique*) and the -ous/-ic pair becomes *-eux*/*-ique* (*acide nitreux* / *acide nitrique*). One name is spelled identically in both languages — N2H4 is *hydrazine* in French too — and it is an explicit, asserted exemption in the test rather than being disguised. |
| Ion names | 40 | **high** | Same modernisation German made: French uses the systematic *hydrogéno-* prefix where the English source data still uses the older *bi-*. Bicarbonate becomes *hydrogénocarbonate*, bisulfate *hydrogénosulfate*. A monoatomic cation is *ion* + the element (*ion sodium*), which is why those read as two words where the anions are one. |

**Specifically worth a second pair of eyes:** \`Ts\` (Tennessine) is given as
"Tennesse", the French IUPAC form, which is rarely written; \`H4SiO4\` is
"Acide silicique" where the fully systematic name would be "acide
orthosilicique"; and \`Lu\` is "Lutécium", which some older French tables spell
"Lutétium".

## Game data — \`src/i18n/chemistry-names/fr.ts\`

Also keyed by identifier rather than by dictionary path: the prose the two new
games read straight out of the core-engine datasets. 104 entries.

| Group | Count | Confidence | Notes |
|---|---|---|---|
| Species names (\`SPECIES_NAMES_FR\`) | 53 | **high** | **This is where French's biggest naming difference lives.** French distinguishes the *element* from the *simple substance*: H is *hydrogène* but H2 is **dihydrogène**, and likewise **dioxygène**, **diazote**, **dichlore**. It is taught explicitly from 3e and its absence is noticeable. The element names in the atom ledger stay bare (*hydrogène*), which is correct, because the ledger counts atoms and a card names a substance. One deliberate decision, mirroring the German: HCl is **chlorure d'hydrogène**, the substance, because that is what a card labels; the reaction descriptions say **acide chlorhydrique** where the reaction happens in water. English uses "hydrogen chloride" for both and loses that distinction. |
| Reaction prose (\`REACTION_TEXT_FR\`) | 33 × up to 4 | **medium** | Name, macroscopic observation, strategy hint and word equation for every reaction. The observations are the risk: they are short pieces of lab description ("file en crépitant à la surface de l'eau", "une pluie d'étincelles") where a flat translation reads flat. The word equations deliberately use the verbs the catalogue's tier-2 build hint names — *réagit*, *brûle*, *se décompose*, *pour former*, *produit*, *donne* — so that hint is actually usable. Reaction names follow French convention: *procédé Haber-Bosch*, *photosynthèse*, *respiration cellulaire*, *réaction aluminothermique* for the thermite reaction. |
| Lewis molecule prose (\`LEWIS_MOLECULE_TEXT_FR\`) | 18 × 3 | **medium** | Name, tier-2 hint and property line per molecule. Names follow French IUPAC: **éthène** and **éthyne** rather than the older ethylene/acetylene, **phosphine**, **tétrachlorométhane**, **sulfure d'hydrogène**, and the *di-* forms throughout. Those are worth a teacher's eye — the English data uses the older or the British forms. |

**Structurally out of reach of a translator, by design:** equations, formulae,
bond lines, state symbols, atom lists and level assignments are not in the
overlay at all, and \`chemistry-names.test.ts\` asserts they come through
byte-identical. The same test fails the suite if a reaction gains a French word
equation it does not have in English, because the game decides what to show by
whether one exists.

## Cheat sheets — \`src/i18n/cheat-sheets/fr.ts\`

Twelve reference sheets, roughly 6,000 words of specialist French. **This is the
highest-risk part of the translation and the part I would most want reviewed
before students see it.**

| Sheet | Confidence | What to look at |
|---|---|---|
| États de la matière | **high** | Ordinary particle-model vocabulary. The six phase changes use the standard French pairs (fusion/solidification, vaporisation/liquéfaction, sublimation/condensation solide). |
| Acides et bases | **high** | Glossary-fixed throughout. **One choice to check, and it is the open question GAMES.md flagged for French:** H3O+ is called **ion oxonium**, which is what the lycée programme and most French textbooks print, where English says hydronium. *Ion hydronium* is also in circulation and is what a translator reaching for the cognate would write. A teacher should confirm which their textbook uses; it recurs through the sheet. |
| Équilibrer les équations | **high** | Turns on the indice/coefficient distinction, which French makes as cleanly as German does. *Équilibrer* chosen over *ajuster* — see the glossary; the current programme prints *ajuster*. |
| Types de réactions | **medium** | *Déplacement simple / double déplacement* for the displacement pair. *Simple échange / double échange* is the other taught pairing; check which matches the reader's textbook. |
| Liaisons chimiques | **high** | Unlike German, there is no decision here: French school chemistry says *liaison covalente* and nothing else, so the Atombindung/kovalent problem simply does not arise. |
| Écrire la formule d'un composé ionique | **medium** | Titled with **formule statistique**, the precise French term for the formula of an ionic solid, which makes the same point German's *Verhältnisformel* does and the English title does not. Some textbooks just say "la formule du composé ionique". Check the cross-over method is called "la méthode de la croix" locally. |
| Ions polyatomiques | **medium** | The naming-pattern bullets are the risk. They happen to work almost unchanged, because the *-ate*/*-ite* and *per-*/*hypo-* patterns are the same in French — which is lucky rather than designed, and deserves a teacher's eye. |
| Nommer les composés inorganiques | **low** | **The hardest sheet, and adapted rather than translated.** The English teaches the English acid system (hydro-…-ic acid, -ous acid). French builds acid names from the anion in its own way: *-ure* → *acide …hydrique*, *-ate* → *acide …ique*, *-ite* → *acide …eux*. I rewrote the acid bullet and the acid-names table to teach the French system. The molecular-naming rule also had to be restated from the other end, because French names molecular compounds anion-first (*dioxyde de carbone*), so "drop mono- on the first element" becomes "drop it on the element named second". **This is a content change, not just a translation, and it needs review.** |
| La mole et la stœchiométrie | **medium** | Terminology is glossary-fixed. **One structural difference worth knowing:** English "yield" is both a mass and a ratio; French *rendement* is only the ratio, so the two masses are *quantité théorique* and *quantité obtenue* and *rendement* is reserved for the percentage. The sheet says so explicitly. Decimal commas throughout the worked examples — check that is what you want, since the formulae around them use points. |
| Structures de Lewis | **medium** | Uses **structure de Lewis** and **doublet non liant**. VSEPR shape names (tétraédrique, pyramidale à base triangulaire, coudée) are standard. Note this sheet has **four** sections in French, matching the English; see the note on the German overlay in the run report. |
| Nommer les composés organiques | **low** | Same problem as the inorganic naming sheet. French names esters the other way round from English — *éthanoate de méthyle*, not "methyl ethanoate" — and writes carboxylic acids as *acide …oïque*. I used the French conventions. **A chemistry teacher must check this sheet.** |
| Groupes caractéristiques | **low** | Titled with **groupe caractéristique**, which is the term the French lycée programme uses, rather than the calque *groupe fonctionnel*. The reference table mixes structure notation (untranslated) with French group names and French reaction descriptions. The ester row in particular follows French ester naming, which is not a translation of the English pattern. |

**Not translated, deliberately:** every linked resource is an English-language
site (Khan Academy, LibreTexts, Chemguide, PubChem, the VCAA data book). Their
titles are left in English so they are findable, and the French descriptions say
"(En anglais.)" so a reader is not surprised. **This is a genuine gap rather
than a solved problem**: a French student gets French explanations and then
English source material. If French is going to be a first-class language, the
resource lists should get French equivalents (e.g. Kartable, Lelivrescolaire.fr,
Maxicours, the CNRS's *Chimie et …* series), which is a content task rather than
a translation task.

**Also not translated:** the curriculum references. Every sheet cites the
Victorian Curriculum or the VCE study design, which is Australian. The
surrounding French is translated but the curriculum itself is not relevant to a
French reader. Worth deciding whether French sheets should show a French
programme reference, or none.

## What I am most likely to have got wrong

Ranked, honestly:

1. **tu vs. vous.** Not a word but a decision, and it is the one that touches
   every other row. French school material often uses *vous*; I chose *tu*
   because this is a game. If that is wrong, almost every imperative changes.
2. **The two naming sheets** (\`naming-compounds\`, \`organic-nomenclature\`). I
   changed what they teach, because teaching English naming rules in French
   would be worse than useless. That is the right call but it is beyond what a
   translator should decide alone.
3. **"solitaire" / "seul".** The word Partage et complète is built on, in every
   coach line, every hint and on the canvas. Accuracy is not the worry —
   *électron célibataire* is genuinely the French term and *solitaire* is
   genuinely adjacent to it. Register is: a teacher may want the textbook word
   throughout and read the game word as sloppiness rather than as the second
   tier the English design asks for.
4. **"astuce" for hint, and "antisèche" for cheat sheet.** Both are register
   calls about school French. *Astuce* exists because *indice* was unavailable —
   it is the French for a formula subscript, and using it for "hint" in the
   balancer would have been genuinely confusing. *Antisèche* is the faithful
   register of "cheat sheet" and carries the same cheeky edge; a teacher may
   want *fiche mémo*.
5. **Game titles.** Six coinages, no strong opinion behind any of them.
   "La balance des atomes" is the longest and "Éclate-Formules" the most
   invented.
6. **Register in the playful copy.** Overlay messages, empty states and the
   marketing hero are where a non-native translation reads as "correct but
   flat". None of it is wrong; some of it may be charmless.
7. **The privacy page.** Legally unreviewed, and describing Australian law.
8. **ion oxonium vs. ion hydronium.** Both are in circulation in French schools;
   I picked the one the programme prints.
`,

  es: `
---

## Chemistry names — \`src/i18n/chemistry-names/es.ts\`

Not in the table above: these are keyed by registry identifier rather than by
dictionary path, and there are 193 of them.

| Group | Count | Confidence | Notes |
|---|---|---|---|
| Element names | 118 | **high** | Spanish element names are standardised and I am confident in the table. Two things a reviewer should know, and both are absences. **The trap that catches French does not exist here:** nitrogen is *nitrógeno*, not *azote*. And **Na and K really are translated** — *sodio* and *potasio* — so unlike French this locale needs no \`SAME_AS_ENGLISH\` exemption in \`chemistry-names.test.ts\`, and all fourteen false friends are checked. Spellings follow RAE/RSEQ usage: **cinc** (not zinc), **yodo** (not iodo), **wolframio** (not tungsteno), **circonio**, **cesio**, **teluro**, **criptón**, **oganesón**. |
| Compound names | 35 | **high** for the salts and hydroxides, **medium** for the acids | Spanish composes them anion-first with *de*, the same way French does and the opposite of both German's single word and English's cation-first pair: *hidróxido de sodio*. The acids are the judgement calls: binary acids take *-hídrico* (*ácido clorhídrico*, *ácido yodhídrico* — note **yod-**, not *iod-*) and the -ous/-ic pair becomes *-oso*/*-ico*. All 35 differ from the English, so no \`IDENTICAL_COMPOUNDS_BY_DESIGN\` entry is needed either: N2H4 is *hidracina* where French and English both say *hydrazine*. |
| Ion names | 40 | **high** | Same modernisation German and French made: the systematic *hidrogeno-* prefix where the English source data still says *bi-*. Bicarbonate becomes *hidrogenocarbonato*, bisulfate *hidrogenosulfato*. *Bicarbonato* is what people actually say and is glossed in the ion table. A monoatomic cation is *ion* + the element (*ion sodio*). *Ion* is written without an accent, per current RAE practice. |

**Specifically worth a second pair of eyes:** \`Ts\` (Tennessine) is given as
"Teneso", the Spanish IUPAC form, which is rarely written; \`H4SiO4\` is "Ácido
silícico" where the fully systematic name would be "ácido ortosilícico"; and
\`Zn\` is "Cinc", which is RAE's preferred form but which plenty of Spanish
chemistry texts still write "Zinc".

## Game data — \`src/i18n/chemistry-names/es.ts\`

Also keyed by identifier rather than by dictionary path: the prose the two new
games read straight out of the core-engine datasets. 104 entries.

| Group | Count | Confidence | Notes |
|---|---|---|---|
| Species names (\`SPECIES_NAMES_ES\`) | 53 | **medium** | **The one decision in this file a teacher should actually rule on.** The *di-* forms are used for the diatomic elemental substances — H2 **dihidrógeno**, O2 **dioxígeno**, N2 **dinitrógeno**, Cl2 **dicloro** — because they are correct IUPAC Spanish (RSEQ) and because they preserve a distinction the Reaction Balancer is built on: a **card** names a *substance* and the **atom ledger** counts *atoms*, and writing *hidrógeno* in both places erases it. But Spanish textbooks are **not** as consistent about this as French ones, which teach *dihydrogène* explicitly from 3ᵉ; a Spanish textbook will often just write *hidrógeno* for H2. If the audience's textbook does, this is a contained change. One further decision, mirroring German and French: HCl is **cloruro de hidrógeno**, the substance, because that is what a card labels; the reaction descriptions say **ácido clorhídrico** where the reaction happens in water. English uses "hydrogen chloride" for both and loses that distinction. |
| Reaction prose (\`REACTION_TEXT_ES\`) | 33 × up to 4 | **medium** | Name, macroscopic observation, strategy hint and word equation for every reaction. The observations are the risk: they are short pieces of lab description ("corretea chisporroteando por la superficie del agua", "una lluvia de chispas") where a flat translation reads flat. The word equations deliberately use the verbs the catalogue's tier-2 build hint names — *reacciona*, *arde*, *se descompone*, *para formar*, *produce*, *da* — so that hint is actually usable. Reaction names follow Spanish convention: *proceso Haber-Bosch*, *fotosíntesis*, *respiración celular*, *reacción aluminotérmica* for the thermite reaction. |
| Lewis molecule prose (\`LEWIS_MOLECULE_TEXT_ES\`) | 18 × 3 | **medium** | Name, tier-2 hint and property line per molecule. Names follow Spanish IUPAC: **eteno** and **etino** rather than the older ethylene/acetylene, **fosfina**, **tetraclorometano**, **sulfuro de hidrógeno**, and the *di-* forms throughout. Those are worth a teacher's eye — the English data uses the older or the British forms. |

**Structurally out of reach of a translator, by design:** equations, formulae,
bond lines, state symbols, atom lists and level assignments are not in the
overlay at all, and \`chemistry-names.test.ts\` asserts they come through
byte-identical. The same test fails the suite if a reaction gains a Spanish word
equation it does not have in English, because the game decides what to show by
whether one exists.

## Cheat sheets — \`src/i18n/cheat-sheets/es.ts\`

Twelve reference sheets, roughly 6,000 words of specialist Spanish. **This is the
highest-risk part of the translation and the part I would most want reviewed
before students see it.**

The overlay has **21 sections, counted by hand against
\`src/lib/cheat-sheet-data.ts\`** — four of them in \`lewis-structures\`. That
count is now also machine-checked: the overlay-shape gate added alongside the
German Lewis fix asserts section, table, row, example and takeaway counts
against the English for every sheet in every locale.

| Sheet | Confidence | What to look at |
|---|---|---|
| Los estados de la materia | **high** | Ordinary particle-model vocabulary. The six phase changes use the standard Spanish pairs (fusión/solidificación, vaporización/condensación, sublimación/sublimación inversa). |
| Ácidos y bases | **high** | Glossary-fixed throughout. **One choice to check, and Spanish lands the opposite way from French:** H3O+ is called **ion hidronio**, which is what Spanish secondary textbooks overwhelmingly print, where the French pass chose *ion oxonium* because the lycée programme prints that. *Ion oxonio* is the IUPAC form and is what a university text uses. It recurs through the sheet. |
| Ajustar ecuaciones químicas | **high** | Turns on the subíndice/coeficiente distinction, which Spanish makes as cleanly as German does. The variety marker *ajustar* (Spain) vs *balancear* (Latin America) is at its densest here. |
| Tipos de reacciones químicas | **medium** | *Desplazamiento simple / doble desplazamiento* for the displacement pair. *Sustitución simple / doble sustitución* is the other taught pairing; check which matches the reader's textbook. |
| Enlaces químicos y estructuras | **high** | Like French and unlike German, there is no decision here: Spanish school chemistry says *enlace covalente* and nothing else, so the Atombindung/kovalent problem simply does not arise. |
| Escribir fórmulas de compuestos iónicos | **medium** | Uses **fórmula empírica** for the formula of an ionic solid, making the same point German's *Verhältnisformel* and French's *formule statistique* do and the English title does not; *unidad fórmula* is the more precise term and many textbooks just say "la fórmula del compuesto iónico". The cross-over method is called **el método del aspa**, which is the Spanish name for it — worth confirming locally. |
| Iones poliatómicos | **medium** | The naming-pattern bullets are the risk. They happen to work almost unchanged, because the *-ato*/*-ito* and *per-*/*hipo-* patterns are the same in Spanish — which is lucky rather than designed, and deserves a teacher's eye. |
| Nombrar compuestos inorgánicos | **low** | **The hardest sheet, and adapted rather than translated.** The English teaches the English acid system (hydro-…-ic acid, -ous acid). Spanish has its own, and unusually an almost exact parallel: *-uro → ácido …hídrico*, *-ato → ácido …ico*, *-ito → ácido …oso*, so the acid-names table maps cleanly. The **molecular** rule did not: Spanish names molecular compounds anion-first (*dióxido de carbono*), so "drop mono- on the first element" had to be restated as "omit it on the element named after *de*", and the Greek-prefix table's examples were rewritten accordingly (*heptaóxido de dicloro*, *decaóxido de tetrafósforo*). The ionic bullet also had to say explicitly that Spanish puts the anion first, because the English rule ("cation name + anion name") is simply the wrong order here. **This is a content change, not just a translation, and it needs review.** |
| El mol y la estequiometría | **medium** | Terminology is glossary-fixed. **One thing that is easier than in French:** English "yield" is both a mass and a ratio, and French *rendement* is only the ratio, which forced the French sheet to rename both masses. Spanish *rendimiento* covers both exactly as English does, so this sheet follows the English structure directly (*rendimiento teórico / real / porcentual*). Decimal commas throughout the worked examples — check that is what you want, since the formulae around them use points. Note *el mol* is masculine, the opposite of French's *une mole*. |
| Estructuras de Lewis | **medium** | Uses **estructura de Lewis** and **par solitario**. VSEPR is **RPECV** in Spanish and the shape names (tetraédrica, piramidal trigonal, angular) are standard. This sheet has **four** sections, matching the English — see the note above. Its first section is the Year 10 layer and is where *impar* appears on a cheat sheet rather than in the game. |
| Nombrar compuestos orgánicos | **low** | Same problem as the inorganic naming sheet. Spanish names esters the other way round from English — *etanoato de metilo*, not "methyl ethanoate" — and writes carboxylic acids as *ácido …oico*. The suffix table teaches the Spanish affixes, and the haloalkane prefix is *yodo-*, not *iodo-*. **A chemistry teacher must check this sheet.** |
| Grupos funcionales | **low** | Unlike French — whose programme insists on *groupe caractéristique* — Spanish says **grupo funcional** and there was no decision to make in the title. The reference table mixes structure notation (untranslated) with Spanish group names and Spanish reaction descriptions. The ester row in particular follows Spanish ester naming, which is not a translation of the English pattern. |

**Not translated, deliberately:** every linked resource is an English-language
site (Khan Academy, LibreTexts, Chemguide, PubChem, the VCAA data book). Their
titles are left in English so they are findable, and the Spanish descriptions say
"(En inglés.)" so a reader is not surprised. **This is a genuine gap rather than
a solved problem**: a Spanish student gets Spanish explanations and then English
source material. If Spanish is going to be a first-class language, the resource
lists should get Spanish equivalents, which is a content task rather than a
translation task.

**Also not translated:** the curriculum references. Every sheet cites the
Victorian Curriculum or the VCE study design, which is Australian. The
surrounding Spanish is translated but the curriculum itself is not relevant to a
Spanish reader. Worth deciding whether Spanish sheets should show a Spanish
currículo reference, or none.

## What I am most likely to have got wrong

Ranked, honestly:

1. **es-ES vs es-419.** Not a word but a decision, and the only one on this list
   that is the owner's rather than a reviewer's. Roughly nine Spanish speakers in
   ten are not in Spain. The eight words that would actually change are listed
   at the top of \`glossary-es.md\` so that reversing it is a day rather than a
   rewrite; *ajustar* vs *balancear* and *chuleta* vs *acordeón/torpedo/machete*
   are the two a reader would notice first.
2. **The two naming sheets** (\`naming-compounds\`, \`organic-nomenclature\`). I
   changed what they teach, because teaching English naming rules in Spanish
   would be worse than useless. That is the right call but it is beyond what a
   translator should decide alone.
3. **"impar".** The word Comparte y completa is built on, in every coach line,
   every hint and on the canvas. The *reason* for it is solid — *solitario* is
   genuinely unavailable, because Spanish already calls a lone pair a *par
   solitario*, and shipping both would have been a real pedagogical bug in the
   one game that teaches the difference. What is uncertain is register: *impar*
   is also the everyday word for an odd number, and a fourteen-year-old meeting
   it beside a pulsing dot may hear "number 3" before "unpaired".
4. **The *di-* forms** (*dihidrógeno*, *dioxígeno*). Correct IUPAC Spanish, and
   they keep a distinction the balancer depends on, but Spanish school practice
   is less settled than French practice and a teacher may find them unusual.
5. **Game titles.** Six coinages, no strong opinion behind any of them.
   "Rompefórmulas" is the most invented and "La balanza de átomos" the longest.
6. **Register in the playful copy.** Overlay messages, empty states and the
   marketing hero are where a non-native translation reads as "correct but
   flat". None of it is wrong; some of it may be charmless.
7. **The privacy page.** Legally unreviewed, and describing Australian law.
8. **"chuleta" for cheat sheet, and "Guía" for the coach.** Both are register
   calls about school Spanish rather than chemistry.
`,
};
