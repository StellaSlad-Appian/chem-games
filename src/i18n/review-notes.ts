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
    {
      prefix: 'teachers',
      confidence: 'low',
      note: '**The one namespace on the site that uses formal "Sie".** Everything else uses "du", and the glossary\'s reason for that is the 14–16 audience; this page is the only one written for an adult, so that reason does not reach it, and "du" to a Lehrkraft would read as presumptuous rather than friendly. It is a register decision a German teacher should confirm, and it is why the whole namespace is rated low rather than particular strings. The terminology itself is settled: Lehrkraft / Lehrkräfte (glossary); "ungepaartes Elektron" and "freies Elektronenpaar", the formal terms, correct here because this page explains rather than instructs (the game word "Einzelelektron" stays in the game); and **Klasse 9–10** for the year band, never "Oberstufe", which names Klasse 11–13, ages 16–19.',
    },
    {
      prefix: 'teachers.supportBody',
      confidence: 'low',
      note: 'Money copy, and the one paragraph where the wrong register costs something real: it has to ask without begging, and it has to be clear that this is one person\'s project and not a gemeinnütziger Verein. "Spende" was avoided throughout for that reason, in favour of "beisteuern" and "unterstützen". Not legal review either — whether the sentence about steuerliche Absetzbarkeit is phrased the way a German reader expects has not been checked.',
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
    {
      prefix: 'teachers',
      confidence: 'low',
      note: '**The one namespace on the site that uses "vous".** The glossary fixes "tu" everywhere and already flags that call for review; its argument is about a teenage player reading "Stuck? Press the lightbulb", and this page has no teenage reader — it is written for the adult deciding whether to use the site in class. "vous" is what a French teacher would expect here, but the site now mixes the two registers on purpose, and that is the thing to confirm. Terminology is settled: enseignant (glossary); "électron célibataire" and "doublet non liant", the formal terms, correct here because this page explains rather than instructs (the game word *solitaire* stays in the game); *astuce* and never *indice* for a hint; and **3e / 2de** for the year band, never *lycée*, which names ages 16–19.',
    },
    {
      prefix: 'teachers.supportBody',
      confidence: 'low',
      note: 'Money copy, and the one paragraph where the wrong register costs something real: it has to ask without begging, and it has to be clear that this is one person\'s project and not an *association reconnue d\'utilité publique*. *Don* and *faire un don* were avoided in favour of *soutenir* and *contribuer* for exactly that reason. Not legal review either — whether the sentence about déductibilité fiscale reads the way a French reader expects has not been checked.',
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
    {
      prefix: 'teachers',
      confidence: 'low',
      note: '**The one namespace on the site that uses "usted", and the least clear-cut of the four locales.** The rest of es.ts uses "tú", and rightly: Spanish school material addresses a student that way as a matter of course. This page has no student reader, so that argument does not reach it — but unlike German "Sie" and French "vous", Spanish professional web copy very often keeps "tú" even when writing to adults, and "usted" can read as distant rather than respectful. **This is the single decision on the page most worth a peninsular Spanish speaker\'s opinion.** The terminology is settled: *el profesorado* / *el alumnado*, the collective nouns the glossary uses to stay gender-neutral; "electrón desapareado" and "par solitario", the formal terms, correct here because this page explains rather than instructs (the game word *impar* stays in the game); *ajustar* for balancing an equation; and **3º / 4º de ESO** for the year band, never *bachillerato*, which names ages 16–19.',
    },
    {
      prefix: 'teachers.supportBody',
      confidence: 'low',
      note: 'Money copy, and the one paragraph where the wrong register costs something real: it has to ask without begging, and it has to be clear that this is one person\'s project and not an *entidad benéfica registrada*. *Donar* and *donación* were avoided in favour of *apoyar* and *aportar* for exactly that reason. Not legal review either — whether the sentence about desgravación is phrased the way a Spanish reader expects has not been checked.',
    },
  ],

  it: [
    // ---------------------------------------------------------------- high --
    {
      prefix: 'common',
      confidence: 'high',
      note: 'Everyday UI words with unambiguous Italian equivalents.',
    },
    {
      prefix: 'nav',
      confidence: 'high',
      note: 'Standard navigation vocabulary. "Accedi" is much shorter than the English "Log in / Register", so the header pair that forced German and French to abbreviate is not a problem here.',
    },
    {
      prefix: 'nav.cheatSheets',
      confidence: 'medium',
      note: '"Bigini". The Italian counterpart of the German "Spickzettel", the French "antiseche" and the Spanish "chuleta" - the school word for a crib, with the same cheeky edge. **Two risks:** it carries the cheating connotation, so a teacher may prefer "schede di ripasso"; and it is mildly dated, so it is worth checking with an actual fourteen-year-old that it does not read as their grandparents’ word. Changing it touches nav, cheatSheets.* and meta.cheatSheetTitle together.',
    },
    {
      prefix: 'language',
      confidence: 'high',
      note: 'Switcher labels; short and unambiguous.',
    },
    {
      prefix: 'auth',
      confidence: 'high',
      note: 'Standard sign-in vocabulary. The placeholder email was localised to a .it domain. Two strings were rewritten rather than translated because Italian participles agree with the reader: "Welcome back" is "Ciao di nuovo!" (not *Bentornato*, which addresses a boy) and "New to ChemGames?" asks about the visit rather than about the person. "Password" is genuinely the Italian word and is allowlisted rather than replaced by the archaic *parola d’ordine*.',
    },
    {
      prefix: 'feedback',
      confidence: 'high',
      note: 'Italian does use the loanword *feedback*, and keeping it would have meant allowlisting the trigger and the heading the way German does. "Segnalazioni" is what an Italian site calls the button that reports a problem or sends an idea, and it covers all three categories. "Problema" rather than "Bug" for the same reason. Note "Idea" is genuinely the same word in both languages and is allowlisted rather than replaced.',
    },
    {
      prefix: 'settings',
      confidence: 'high',
      note: 'Standard settings vocabulary. **Worth stating what Italian does not have to do here:** Spanish had to call this panel *Opciones* rather than *Ajustes*, because *ajustar* is its verb for balancing an equation. Italian balances with *bilanciare*, which shares no root with *Impostazioni*, so no dodge is needed.',
    },
    {
      prefix: 'settings.useGlobal',
      confidence: 'medium',
      note: 'Rendered as "Valore predefinito" rather than a literal "Usa il globale". settings.overrideHelp quotes the same wording inside guillemets, so the two must change together.',
    },
    {
      prefix: 'footer',
      confidence: 'high',
      note: 'Short; the tagline is a free rendering rather than word-for-word, which suits a tagline.',
    },
    {
      prefix: 'yearLevels',
      confidence: 'high',
      note: 'Mapped by age onto the Italian system: Year 7 = 1a media, Year 8 = 2a media, Year 9 = 3a media, Year 10 = 1o superiore, Senior = Triennio. The stored value stays the English "Year 9"; only the label is Italian. The ordinal indicators are one character each and need no superscript font in a filter pill.',
    },
    {
      prefix: 'chemistry',
      confidence: 'high',
      note: 'Fixed in docs/i18n/glossary-it.md. Acido / base / neutro / anfotero are the Italian school terms. Note "Base" is the same word as the English and is allowlisted, while "Neutro" is not - the same split French and Spanish have, and the opposite of German.',
    },
    {
      prefix: 'games.shared',
      confidence: 'high',
      note: 'Short game-chrome labels. "Livello" rather than a loanword: Italian gaming has its own word where German borrows "Level". "Schermo touch" rather than the bare English "Touchscreen".',
    },
    {
      prefix: 'games.shared.hint',
      confidence: 'medium',
      note: '**"Indizio", and Italian gets this free for a different reason than Spanish did.** The French run had to abandon the obvious word for "hint" (*indice*) because it is also the French for a formula **subscript**, in the one game whose entire teaching point is that contrast. Italian’s subscript is *pedice* (with *apice* for a superscript), so the two words do not touch at all. *Indizio* is seven characters, fits the header badge that ruled out French’s *coup de pouce*, and is what an Italian quiz, escape room or board game says for a clue. **Rejected: *suggerimento***, which is the standard Italian UI word and is twelve characters - too long for the badge and for "Indizio {tier} di 3"; ***consiglio*** (advice from a teacher, the same objection French raised); and ***aiuto***, already the word for help in general. If the badge can take twelve characters, *suggerimento* is the safer choice.',
    },
    {
      prefix: 'profileToggles',
      confidence: 'high',
      note: 'Plain switch labels.',
    },
    {
      prefix: 'serverMessages',
      confidence: 'high',
      note: 'Error and confirmation messages in plain Italian. Note the {word} placeholder stays the literal "DELETE": the action compares it byte for byte. exportLoginRequired names the action ("Devi accedere") rather than the state, to avoid "essere connesso", which would have to agree in gender.',
    },
    {
      prefix: 'cheatSheets',
      confidence: 'high',
      note: 'Section headings for the reference pages. "Bigini" follows nav.cheatSheets and would change with it.',
    },
    {
      prefix: 'cheatSheets.forStudents',
      confidence: 'high',
      note: '"Per chi studia" rather than "Per gli studenti", which would default to masculine. **This is Italian’s own device and it is better than the workaround Spanish needed:** the headless relative *chi* + verb is ordinary Italian, completely epicene, and shorter than any collective noun - Italian has no exact counterpart to *el alumnado*.',
    },
    {
      prefix: 'cheatSheets.forTeachers',
      confidence: 'high',
      note: '"Per chi insegna", the same device as forStudents. (*Insegnante* is genuinely epicene and is used in prose; the heading uses the relative so the pair reads as one construction.)',
    },
    {
      prefix: 'games.reactionBalancer',
      confidence: 'high',
      note: 'Uses the glossary terms reagenti / prodotti / coefficiente / pedice / conteggio degli atomi / bilanciare. There is no variety decision to make here and no collision to dodge - the namespace that was hardest in French (indice) and in Spanish (ajustar/ajustes) is the straightforward one in Italian.',
    },
    {
      prefix: 'games.reactionBalancer.coach',
      confidence: 'medium',
      note: 'These carry the Italian article device, and Italian needs it more than either of the other two Romance locales. A name placeholder cannot take an article, because Italian picks it from gender *and* the sound the name starts with (*il carbonio*, but *lo zolfo* and *l’ossigeno*) and because every preposition contracts obligatorily (*del*, *dello*, *dell’*). The templates say "l’elemento {element}", which is **safer in Italian than the Spanish version of the same device**: *elemento* is masculine and begins with a vowel, so the article is always l’ and each preposition contracts to exactly one form. There is no branch left to get wrong. Correct and slightly more roundabout than the English; worth a native read for rhythm.',
    },
    {
      prefix: 'games.reactionBalancer.card',
      confidence: 'high',
      note: 'Accessible names for the coefficient controls. "Add one water" cannot be translated with an article for the reason above, so these are colon labels - "Aumenta: {name}" - which are gender-free and read cleanly on a screen reader. The same solution French and Spanish reached, and German reached with a verb.',
    },
    {
      prefix: 'games.reactionBalancer.challenge',
      confidence: 'high',
      note: '"Sfida" rather than keeping the English "Challenge" as German did: Italian has a short natural word and uses it. The wrong-side and not-in-reaction messages lead with a generic noun ("Questa sostanza ...") so the compound name can follow a colon instead of needing an article.',
    },
    {
      prefix: 'games.reactionBalancer.ledger',
      confidence: 'medium',
      note: '"Conteggio degli atomi" for the game’s own name for the table under the arrow. **Rejected: "bilancio degli atomi"** - not harmful in Italian the way *balance de atomos* was in Spanish, but it reuses the balancing root for a *different* thing (the table, not the act), and keeping one root for one idea is what this glossary is for. *Conteggio* says what the table is: a tally.',
    },
    {
      prefix: 'games.reactionBalancer.ledger.needsMoreLeft',
      confidence: 'medium',
      note: '**The string the whole handover was about, and the one Spanish only caught in a browser.** "mancano {count}" is the natural Italian and is wrong at 1 ("mancano 1"), which the ledger shows on the very first reaction of the very first level. This is a flat string, not a plural record, and dictionary.test.ts requires that whether a string is count-dependent matches the English in both directions - so the shape cannot be changed and the wording has to be invariant. "{count} da aggiungere a sinistra" is: *da* + infinitive never agrees with anything. It is also **better than the Spanish fix** ("{count} de menos"), because it says which way the shortfall runs; "{count} in meno" was rejected as ambiguous between "five short" and "five too many".',
    },
    {
      prefix: 'games.reactionBalancer.ledger.needsMoreRight',
      confidence: 'medium',
      note: 'The same string on the other side; see needsMoreLeft.',
    },
    {
      prefix: 'games.reactionBalancer.glossary',
      confidence: 'high',
      note: 'The pedice / coefficiente contrast is the whole teaching point of the game, and Italian makes it as cleanly as German does. Unlike French, nothing here is identical-by-design: the Italian really is *coefficiente*, not "coefficient".',
    },
    {
      prefix: 'games.reactionBalancer.beam',
      confidence: 'high',
      note: 'The beam is *la bilancia* and "the beam is level" is "La bilancia e in equilibrio". **Where Spanish had to keep its beam word away from its balancing verb, Italian gets to share the root and it helps:** you *bilanci* the equation, and the *bilancia* on screen goes *in equilibrio*. One idea, one root.',
    },
    {
      prefix: 'games.reactionBalancer.instructions.keyboard',
      confidence: 'high',
      note: 'Column one is the physical key and stays as printed (Tab, H, P). Only the description of what the key does is translated.',
    },
    {
      prefix: 'games.formulaBlaster',
      confidence: 'high',
      note: 'The feedback templates keep {formula} and {symbol} untranslated by design; only {compound} and {element} are localised names. All four were rewritten so no article ever precedes a name placeholder - "Non e quella: {compound}" rather than "E {compound}", which would need "il metano" but "l’acqua" and "lo zolfo".',
    },
    {
      prefix: 'games.neutralise',
      confidence: 'high',
      note: 'Ion notation (H+, OH-) left as-is. "Spazio" is the Italian name for the space bar.',
    },
    {
      prefix: 'games.lewisStructures',
      confidence: 'medium',
      note: 'A whole new game. The chemistry terms are glossary-fixed (struttura di Lewis, doppietto solitario, doppietto di legame, legame covalente, regola dell’ottetto, elettroni di valenza), but the game deliberately writes around the jargon for a Year 9 reader, and that plain-language layer is mine rather than a textbook’s. Rated medium as a body of work; the specific risks are listed below.',
    },
    {
      prefix: 'games.lewisStructures.instructions.keyboard',
      confidence: 'high',
      note: 'Column one is the physical key, named the way an Italian keyboard prints it: "Invio" rather than Enter, while Tab, Esc, H and P are unchanged. The same reasoning that made German write "Leertaste" and French "Entree" - name the key the reader is looking at.',
    },
    {
      prefix: 'games.lewisStructures.glossary.lonePair',
      confidence: 'high',
      note: '"doppietto solitario" is the Italian school term and is glossary-fixed. **This entry is load-bearing well beyond itself:** because *solitario* is already taken by the lone pair, it is unavailable as the game’s word for a single unpaired electron - see games.lewisStructures.glossary.loner. Note the collision does not depend on which phrasing a textbook prints: the other common one, *coppia solitaria*, uses the same adjective. *Doppietto libero* and *doppietto non condiviso* are also in circulation, and the first of those is a second reason *libero* is unavailable.',
    },
    {
      prefix: 'games.lewisStructures.glossary.sharedPair',
      confidence: 'high',
      note: '"doppietto di legame". **Rejected: "doppietto condiviso"**, which is the transparent rendering and was tempting - but the game’s own verb is *condividere* ("Condividi e completa"), so "condividi un doppietto condiviso" is tautological in a way "condividi un doppietto di legame" is not. Exactly the objection Spanish raised to *par compartido*.',
    },
    {
      prefix: 'games.lewisStructures.glossary.outerElectron',
      confidence: 'high',
      note: '**Italian gets off as lightly as Spanish here, and for a different reason worth knowing.** The tap-to-explain matcher uses a JavaScript word boundary, which only knows ASCII letters, so French had to move the chip off "electrons externes" onto a single later word because the phrase begins with an accented letter. Italian’s accents are **final** (*perche*, *citta*, *piu*), so the Italian failure mode would be a match word that *ends* in one - and none of the terms this site needs does. The full phrases therefore work, and the chip lands on the whole term as it does in English. A bonus from elision: "l’elettrone" contains a word boundary before *elettrone*, so no *l’* variant has to be listed.',
    },
    {
      prefix: 'games.lewisStructures.glossary.duet',
      confidence: 'medium',
      note: 'Italian sits with Spanish, between the other two. German had to coin "Duett" and rate it low; French already had "la regle du duet" in its national programme and rated it high. Italian has **"la regola del duetto"** in circulation in textbooks, so nothing was invented, but it is not as settled as the octet rule and plenty of teachers simply say hydrogen is full at two. **Note what was *not* available: *doppietto*.** It is the obvious word for "a pair of electrons" and it is already this glossary’s word for a lone pair, so "la regola del doppietto" would mean something else on the very sheet that defines both.',
    },
    {
      prefix: 'games.lewisStructures.counts',
      confidence: 'high',
      note: 'Counted noun phrases with their own plural forms, so the noun and adjective agree in both ("1 doppietto solitario" / "2 doppietti solitari"). Italian takes the **plural** at zero ("0 dispari"), like Spanish and unlike French, and Intl.PluralRules already knows that. Italian also has a CLDR many category; it was measured rather than assumed and fires only at exact millions, so nothing here needs a third form.',
    },
    {
      prefix: 'games.lewisStructures.coach',
      confidence: 'medium',
      note: 'Almost every line here opens "{atom}: ...". That is the article device again: "L’ossigeno ha ancora 2 dispari" needs an article the placeholder cannot supply, and a bare "Ossigeno ha ancora..." is not Italian. A name followed by a colon is idiomatic in a UI and works for every substitution. Note coach.sameGroup also became a colon label for the same reason, where the Spanish version left the name as a bare subject. Worth a native read for rhythm - it is correct, but it is a repeated shape.',
    },
    {
      prefix: 'games.lewisStructures.inspect.classmate',
      confidence: 'high',
      note: 'The English says "Drawn by a classmate". Written as a noun phrase - "Disegno di qualcuno della tua classe" - for two reasons: *qualcuno* is epicene, so none of the work German needed for "Mitschuelerin oder Mitschueler" arises; and a participle ("Disegnato...") would have to agree with the thing drawn.',
    },
    {
      prefix: 'games.lewisStructures.inspect.countWrong',
      confidence: 'medium',
      note: '**A second instance of the count-agreement class, and one Spanish did not have to face.** The natural Italian is "Ne hai contati {given}", where the participle agrees with the clitic *ne* - and is wrong at 1 (*contato*). Dropping the clitic drops the agreement: "Hai contato {given}" is invariant and still idiomatic.',
    },
    {
      prefix: 'games.lewisStructures.inspect.countLabel',
      confidence: 'medium',
      note: '**A third instance.** "Contati: {counted}" would agree with whatever noun {counted} carries, and {counted} is filled from the counts.* records ("1 legame", "3 doppietti solitari"). Naming the act instead - "Conteggio: {counted}" - is invariant.',
    },
    {
      prefix: 'games.lewisStructures.ui.supportMode',
      confidence: 'medium',
      note: '"Modalita supporto" is transparent and matches the "Supporto" heading in the settings panel, so the two read as one feature.',
    },
    {
      prefix: 'games.lewisStructures.coach.label',
      confidence: 'medium',
      note: '"Guida" for the coach strip. Italian does use *coach* as a loanword, but it is sport or business register; *allenatore* and *tutor* both force a gender or a register. "Guida" is short, works as a role noun for a person of any gender, and says what the panel does; it does not collide with "Skip guide", which is rendered "Salta la spiegazione". Worth a native read.',
    },

    // -------------------------------------------------------------- medium --
    {
      prefix: 'home',
      confidence: 'medium',
      note: 'Marketing copy. Accurate, but a native speaker may want to punch it up - promotional register is where translated copy most often reads flat. Note leaderboardsDescription says "i migliori punteggi" rather than "i migliori scienziati", because the person noun would default to masculine.',
    },
    {
      prefix: 'gamesHub',
      confidence: 'medium',
      note: 'Game descriptions. The titles are rated separately below.',
    },
    {
      prefix: 'leaderboards',
      confidence: 'medium',
      note: '"Classifica" and "Miglior punteggio" are both standard; Italian does not keep the English "high score" the way German keeps "Highscore", and *record* would have had to be allowlisted. "Posizione" rather than "Rango" for a place in a ranking. The empty states are free renderings.',
    },
    {
      prefix: 'leaderboards.firstResultTitle',
      confidence: 'medium',
      note: 'Rewritten, not translated: "Ready for your first result?" has no gender-neutral Italian rendering that keeps the adjective (*Pronto?* addresses a boy, *Pronta?* a girl). It is now a statement about the result - "Il tuo primo risultato ti aspetta." - which loses the direct address and keeps the invitation. Same device as auth.loginTitle and games.overlay.levelUpDescription.',
    },
    {
      prefix: 'profile',
      confidence: 'medium',
      note: 'The "scientist" framing is as hard in Italian as in Spanish and harder than in French: *scienziato* is gendered, Italian has no counterpart to the epicene *scientifique*, and no collective like *el alumnado*. Handled with epicene nouns where they exist (*membro*, *insegnante*, *qualcuno*) and with the headless relative (*chi studia*, *chi insegna*) where they do not.',
    },
    {
      prefix: 'games.acidClassification',
      confidence: 'medium',
      note: 'Instruction steps for a Year 9-10 reader; the chemistry vocabulary is glossary-fixed but the phrasing is mine.',
    },
    {
      prefix: 'games.acidClassification.instructionsTitle',
      confidence: 'medium',
      note: 'Like French and Spanish and unlike German, this does not coin a name for the classifier: it reuses the game’s own title ("Come si gioca: Acido o base?"), which avoids the "sounds like a machine" problem "Chemie-Sortierer" ran into.',
    },
    {
      prefix: 'games.overlay',
      confidence: 'medium',
      note: 'Game-state copy with a lab metaphor running through it. The metaphor was kept, but Italian lab idiom is not identical to English lab idiom.',
    },
    {
      prefix: 'games.overlay.statRoundValue',
      confidence: 'medium',
      note: '**The same count-agreement class as the ledger, in the shared UI.** "{count} corrette" agrees with its number and is wrong at 1. The colon label "risposte esatte: {count}" is invariant, and it is the same device the article problem already forces everywhere else. levelOfMax and levelUpProgress carry the same fix.',
    },
    {
      prefix: 'meta',
      confidence: 'medium',
      note: 'Page titles and descriptions. Note privacyTitle and privacy.heading say "informativa sulla privacy", which is the standard Italian name of the document, rather than the bare loanword "Privacy" the English uses.',
    },

    // ----------------------------------------------------------------- low --
    {
      prefix: 'meta.keywords',
      confidence: 'low',
      note: 'SEO keywords are keyword research, not translation. These are plausible Italian search terms, not researched ones. The one thing deliberately got right is the age band: the site is Year 9-10, which is terza media and primo superiore in Italy, so the list says "chimica terza media" and "chimica primo superiore" and **not** "chimica liceo" - the Italian equivalent of the "Chemie Oberstufe" error Phase 1 had to correct, which named ages 16-19 for a 14-16 site.',
    },
    {
      prefix: 'gamesHub.acidTitle',
      confidence: 'low',
      note: '"Acido o base?" - the direct question, which works as a title in Italian exactly as in English and is what the game asks. Runner-up: "Acido, base o neutro?" (truer to the four-way sort, too long for the card). Rejected: "Il rilevatore di acidi" - names a machine, the GAMES.md trap.',
    },
    {
      prefix: 'gamesHub.blasterTitle',
      confidence: 'low',
      note: 'Coinage. "Rompiformule": *verbo + sostantivo* written as one word is how Italian builds this kind of name - *rompicapo*, *schiaccianoci*, *cavatappi*, *portacenere* - and this one lands on *rompicapo*, the Italian word for a puzzle, so it reads as a game on sight. Runner-up "Scoppiaformule" is truer to the popping mechanic (*scoppiare* is what Italian says bubbles do) and two characters heavier. Rejected: "Formula Blaster" (calque; "Blaster" reads as English filler) and "Caccia alle formule" (sounds like a worksheet).',
    },
    {
      prefix: 'gamesHub.neutraliseTitle',
      confidence: 'low',
      note: '"Neutralizza!" mirrors the English’s deliberate imperative, and Italian imperatives do work as titles. GAMES.md’s warning is the thing to check: does it read as a name or as an order? Runner-up "Difesa ionica" reads more like a product but says "ions" without saying "neutralisation". Rejected: "Neutralizzazione" - a textbook chapter heading.',
    },
    {
      prefix: 'gamesHub.balancerTitle',
      confidence: 'low',
      note: '"La bilancia degli atomi" names the beam the game actually shows, says the chemistry, and carries a second reading - *bilancia* is both the scales and the imperative "balance". Rejected: "Bilanciatore di reazioni" - a *bilanciatore* is a machine in Italian (a wheel balancer), precisely the "sounds like a machine for sorting chemicals" trap GAMES.md names - and, more seriously, **"Equilibrio chimico", which is a real and completely different topic** (chemical equilibrium) and would mislead any student who has met it. "Bilancia le reazioni" was dropped only because the hub would then have two imperative titles. At 22 characters it is the longest of the six; it was checked on the hub card and the game header at 360 px.',
    },
    {
      prefix: 'gamesHub.lewisTitle',
      confidence: 'low',
      note: '"Condividi e completa" - GAMES.md asks for "a phrase that names the rule in that language", and two short imperatives do that. Runner-up "Accoppia e completa" names the *mechanic* (pairing the dispari) rather than the *rule* (sharing to fill a shell), which is a real argument for it; it was dropped because the rule is what the game teaches and the mechanic is what it shows. Rejected: "Condividi per completare" (calque; the purpose clause is clumsy) and "A due a due" (memorable, loses the filling half of the rule).',
    },
    {
      prefix: 'gamesHub.bondsTitle',
      confidence: 'low',
      note: '"Legami chimici" is a topic name rather than a coinage, so the direct translation is right. Rated low only because every title is the owner’s call.',
    },
    {
      prefix: 'profile.defaultTitle',
      confidence: 'low',
      note: '"Mente da laboratorio" is an invention, and the gender problem is why. "Registered Scientist" has no epicene Italian equivalent - *scienziato* is gendered, Italian has no counterpart to French’s *scientifique*, and no collective noun to fall back on - so every faithful rendering defaults to masculine on the reader’s own profile badge. This describes a mind rather than a person, which is what makes it work. The literal alternative is "Scienziato del laboratorio".',
    },
    {
      prefix: 'profile.labNotesEmpty',
      confidence: 'low',
      note: 'Rewritten rather than translated, because the English joke ("observing reactions in silence") does not carry. Check the new one is actually charming in Italian and not just odd.',
    },
    {
      prefix: 'leaderboards.noData',
      confidence: 'low',
      note: '"Non e stato ancora sintetizzato niente. Comincia tu!" - the English pun on "synthesized" is half-kept. May read as a non sequitur.',
    },
    {
      prefix: 'games.overlay.levelUpSubtitle',
      confidence: 'low',
      note: '"Serie completata!" for "Batch complete!". Italian lab Italian for a batch is *lotto* or *partita*; neither is the celebratory register the English has, and *partita* is already this dictionary’s word for one run of a game. The same problem German hit with "Charge fertig!", French with "Serie terminee !" and Spanish with "Tanda completa!".',
    },
    {
      prefix: 'games.lewisStructures.glossary.loner',
      confidence: 'low',
      note: '**Italian gets its own two-tier pair, and three options were ruled out on chemistry rather than on taste.** "elettrone spaiato" is the formal term (glossary, cheat sheet, prose), **"dispari"** is the game word (hub line, coach, hints, canvas), and *dispari* is also the label on a dot. **"solitario" - the French answer - is unavailable**, because Italian already calls a lone pair a *doppietto solitario* (and *coppia solitaria*, same adjective): in the one game that teaches the difference between one unpaired electron and two that stay together, "restano 2 solitari" and "restano 2 doppietti solitari" would be adjacent coach lines differing by one word and meaning opposite things. **"libero" is unavailable twice over** (*doppietto libero* is also a lone pair, *elettroni liberi* are the delocalised ones the bonding sheet teaches), and **"singolo" is unavailable** because *legame singolo* is the single bond, taught three lines away in this same game. *Dispari* is exactly the chemistry (*dis-* + *pari*, "not one of a pair"), it is real usage for a radical, it nominalises (*un dispari*, *i dispari*), it is entirely ASCII, and it is **invariant** - which in a language where a flat count string cannot agree with its number is worth a great deal. **Rejected: "solo"** (four characters, and it would have fixed the dot-label width - but the bare plural *i soli* is Italian for "the suns" and the coach lines need the bare noun constantly), **"spaiato" as the game word** (that is the formal term, and using it everywhere would collapse the two tiers the game is built on; it is the closest call here, and it is the word to collapse onto if the owner decides Italian does not need two tiers), **"scompagnato"** (the everyday word for an odd sock, the best of the rejected ideas, but eleven characters) and **"celibe"** (the literal analogue of French’s *celibataire*, but Italian chemistry does not use it and it would read as a joke). The risk is register, not accuracy: *dispari* is also the everyday word for an **odd number**, and in Italian that is doubly salient because *pari o dispari* is a children’s game. Check it with a real teenager. If it changes, the edit touches every line of this game.',
    },
    {
      prefix: 'games.lewisStructures.ui.lonerLabel',
      confidence: 'low',
      note: 'The label printed on a pulsing dot at Level 1, off from Level 2 - the scaffold the brief removes on purpose. It is the **same word** as the game word, and that is a fact about Italian rather than a shortcut: German shortened the noun *Einzelelektron* to the adjective *einzeln* and French shortened *solitaire* to *seul*, but in Italian the game word already **is** the adjective (*elettrone dispari* -> *dispari*), so there is nothing to shorten to. **The honest cost is width:** seven characters, which is the German (EINZELN) end of the range the pre-existing Lewis layout note describes, where French’s SEUL clears it and Spanish’s IMPAR sits between. That was weighed rather than discovered - the only shorter Italian candidate is *solo*, rejected above - and checked on screen at 360 px.',
    },
    {
      prefix: 'privacy',
      confidence: 'low',
      note: 'Privacy-policy prose. I am not a lawyer and this is not legal review: the Italian says what the English says, but the phrasing has not been checked against Italian data-protection conventions. Note also that the page describes Australian law (Privacy Act 1988, the OAIC) - those names deliberately stay English inside Italian sentences, which is correct but reads oddly. If the site is ever actually offered to Italian or EU students, this page needs a GDPR / Codice privacy review that is out of scope for a translation pass.',
    },
    {
      prefix: 'privacy.cookiesBody2',
      confidence: 'medium',
      note: 'The language-preference cookie this feature introduces had to be disclosed; the Italian follows the German, French and Spanish paragraphs rather than the original English.',
    },
    {
      prefix: 'teachers',
      confidence: 'low',
      note: '**The one namespace on the site that uses "Lei".** The rest of it.ts uses "tu", and rightly: Italian school material addresses a student that way. This page has no student reader — it is written for the adult deciding whether to use the site in class — so "Lei" is the register, but the site now mixes the two on purpose and that is the thing to confirm. A second thing to watch while reading it: "Lei" takes third-person verbs, so the imperatives here are *provi*, *usi*, *scelga*, *cominci*, and a single slip into *prova* or *usa* would be audible. Terminology is settled: *chi insegna* / *chi studia*, the headless relatives the glossary uses to stay gender-neutral; "elettrone spaiato" and "doppietto solitario", the formal terms, correct here because this page explains rather than instructs (the game word *dispari* stays in the game); *indizio* for a hint; and **terza media / primo superiore** for the year band, never *liceo*, which names ages 16–19.',
    },
    {
      prefix: 'teachers.supportBody',
      confidence: 'low',
      note: 'Money copy, and the one paragraph where the wrong register costs something real: it has to ask without begging, and it has to be clear that this is one person\'s project and not an *ente benefico riconosciuto*. *Donazione* and *donare* were avoided in favour of *sostenere* and *contribuire* for exactly that reason. Not legal review either — whether the sentence about detraibilità is phrased the way an Italian reader expects has not been checked.',
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
  it: `
---

## Chemistry names -- \`src/i18n/chemistry-names/it.ts\`

Not in the table above: these are keyed by registry identifier rather than by
dictionary path, and there are 193 of them.

| Group | Count | Confidence | Notes |
|---|---|---|---|
| Element names | 118 | **high** | Italian element names are standardised and I am confident in the table. Two things a reviewer should know. **Italian follows French here, not Spanish:** nitrogen is *azoto*, never "nitrogeno". And **Na and K really are translated** -- *sodio* and *potassio* -- so unlike French this locale needs no \`SAME_AS_ENGLISH\` exemption in \`chemistry-names.test.ts\`, and all fourteen false friends are checked. Spellings follow Italian school and IUPAC usage: **nichel** (not "nichelio"), **zolfo**, **stagno**, **rame**, **piombo**, **iodio**, **cesio**, **zirconio**, **tungsteno**, **tellurio**, **kripton**, **xeno**, **oganesson**. |
| Compound names | 35 | **high** for the salts and hydroxides, **medium** for the acids | Italian composes them anion-first with *di*, the same way French and Spanish do and the opposite of both German's single word and English's cation-first pair: *idrossido di sodio*. The acids are the judgement calls: binary acids take **-idrico** (*acido cloridrico*, *acido iodidrico*, *acido solfidrico*) and the -ous/-ic pair becomes *-oso*/*-ico*. Note the Italian stem is **solfo-**, not "sulfo-". All 35 differ from the English, so no \`IDENTICAL_COMPOUNDS_BY_DESIGN\` entry is needed either: N2H4 is *idrazina* where French and English both say *hydrazine*. |
| Ion names | 40 | **high** | Same modernisation German, French and Spanish made: the systematic *idrogeno-* prefix where the English source data still says *bi-*. Bicarbonate becomes *idrogenocarbonato*, bisulfate *idrogenosolfato*. *Bicarbonato* is what people actually say and is glossed in the ion table. A monoatomic cation is *ione* + the element (*ione sodio*). |

**Specifically worth a second pair of eyes:** \`Ts\` (Tennessine) is given as
"Tennesso", the Italian IUPAC form, which is rarely written; \`H4SiO4\` is "Acido
silicico" where the fully systematic name would be "acido ortosilicico"; and
\`Ni\` is "Nichel", which is the modern Italian form but which older tables still
write "Nichelio".

## Game data -- \`src/i18n/chemistry-names/it.ts\`

Also keyed by identifier rather than by dictionary path: the prose the two new
games read straight out of the core-engine datasets. 104 entries.

| Group | Count | Confidence | Notes |
|---|---|---|---|
| Species names (\`SPECIES_NAMES_IT\`) | 53 | **medium** | **The one decision in this file a teacher should actually rule on, and Italian lands the other way from French and Spanish.** French uses *dihydrogene* because the programme teaches it from 3e; Spanish used *dihidrogeno* and rated it medium. **Italian keeps the bare names** -- H2 *idrogeno*, O2 *ossigeno*, N2 *azoto*, Cl2 *cloro* -- because Italian textbooks overwhelmingly write plain *idrogeno* for H2 and *diidrogeno* would read as foreign to a fourteen-year-old. The cost is the cost English already pays: the Reaction Balancer's **card** (a substance) and its **atom ledger** (atoms) show the same word, and English lives with that. If the audience's textbook does teach the *di-* forms, this is a contained change. One further decision, mirroring the other three locales: HCl is **cloruro di idrogeno**, the substance, because that is what a card labels; the reaction descriptions say **acido cloridrico** where the reaction happens in water. Oxides use the Greek prefixes consistently (*monossido*, *diossido*, *triossido*) so that they agree with the naming sheet's prefix table; *anidride carbonica* (school) and *biossido di carbonio* (media) are both common Italian for CO2 and are the alternatives a teacher may prefer. |
| Reaction prose (\`REACTION_TEXT_IT\`) | 33 x up to 4 | **medium** | Name, macroscopic observation, strategy hint and word equation for every reaction. The observations are the risk: they are short pieces of lab description ("sfreccia sfrigolando sulla superficie dell'acqua", "una pioggia di scintille") where a flat translation reads flat. The word equations deliberately use the verbs the catalogue's tier-2 build hint names -- *reagisce*, *brucia*, *si decompone*, *per formare*, *per dare*, *produce* -- so that hint is actually usable. Reaction names follow Italian convention: *processo Haber-Bosch*, *fotosintesi*, *respirazione cellulare*, *reazione alluminotermica* for the thermite reaction, *processo al contatto*. |
| Lewis molecule prose (\`LEWIS_MOLECULE_TEXT_IT\`) | 18 x 3 | **medium** | Name, tier-2 hint and property line per molecule. Names follow Italian IUPAC: **etene** and **etino** rather than the older ethylene/acetylene, **fosfina**, **tetraclorometano**, **solfuro di idrogeno**. Those are worth a teacher's eye -- the English data uses the older or the British forms. |

**Structurally out of reach of a translator, by design:** equations, formulae,
bond lines, state symbols, atom lists and level assignments are not in the
overlay at all, and \`chemistry-names.test.ts\` asserts they come through
byte-identical. The same test fails the suite if a reaction gains an Italian word
equation it does not have in English, because the game decides what to show by
whether one exists.

## Cheat sheets -- \`src/i18n/cheat-sheets/it.ts\`

Twelve reference sheets, roughly 6,000 words of specialist Italian. **This is the
highest-risk part of the translation and the part I would most want reviewed
before students see it.**

The overlay has **21 sections, counted by hand against
\`src/lib/cheat-sheet-data.ts\`** -- four of them in \`lewis-structures\`. That count
is also machine-checked by the overlay-shape gate.

| Sheet | Confidence | What to look at |
|---|---|---|
| Gli stati della materia | **high** | Ordinary particle-model vocabulary. The six phase changes use the standard Italian pairs (fusione/solidificazione, vaporizzazione/condensazione, sublimazione/brinamento). *Brinamento* for deposition is the school word and is worth confirming. |
| Acidi e basi | **high** | Glossary-fixed throughout. **One choice to check, and Italian lands with Spanish rather than French:** H3O+ is called **ione idronio**, which is what Italian secondary textbooks print, where the French pass chose *ion oxonium* because the lycee programme prints that. *Ione ossonio* is the IUPAC form and is what a university text uses. It recurs through the sheet. |
| Bilanciare le equazioni chimiche | **high** | Turns on the pedice/coefficiente distinction, which Italian makes as cleanly as German does, and there is no variety marker and no collision anywhere in it. |
| Tipi di reazioni chimiche | **medium** | *Scambio semplice / doppio scambio* for the displacement pair. *Sostituzione semplice / doppia sostituzione* is the other pairing in circulation; check which matches the reader's textbook. |
| Legami chimici e strutture | **high** | Like French and Spanish and unlike German, there is no decision here: Italian school chemistry says *legame covalente* and nothing else, so the Atombindung/kovalent problem simply does not arise. |
| Scrivere le formule dei composti ionici | **medium** | Uses **formula minima** for the formula of an ionic solid, making the same point German's *Verhaeltnisformel*, French's *formule statistique* and Spanish's *formula empirica* do and the English title does not; *unita formula* is the more precise term and many textbooks just say "la formula del composto ionico". The cross-over method is called **il metodo dell'incrocio** -- worth confirming locally. |
| Ioni poliatomici | **medium** | The naming-pattern bullets are the risk. They happen to work almost unchanged, because the *-ato*/*-ito* and *per-*/*ipo-* patterns are the same in Italian -- which is lucky rather than designed, and deserves a teacher's eye. |
| Dare il nome ai composti inorganici | **low** | **The hardest sheet, and adapted rather than translated.** The English teaches the English acid system (hydro-...-ic acid, -ous acid). Italian has its own, and like Spanish an almost exact parallel: *-uro -> acido ...idrico*, *-ato -> acido ...ico*, *-ito -> acido ...oso*, so the acid-names table maps cleanly. The **molecular** rule did not: Italian names molecular compounds anion-first (*diossido di carbonio*), so "drop mono- on the first element" had to be restated as "omit it on the element named after *di*", and the Greek-prefix table's examples were rewritten accordingly (*eptaossido di dicloro*, *decaossido di tetrafosforo*, and note *esa-*/*epta-*/*otta-* rather than the Latin-looking forms). The ionic bullet also had to say explicitly that Italian puts the anion first, because the English rule ("cation name + anion name") is simply the wrong order here. **This is a content change, not just a translation, and it needs review.** |
| La mole e la stechiometria | **medium** | Terminology is glossary-fixed. **One thing that is easier than in French:** English "yield" is both a mass and a ratio, and French *rendement* is only the ratio, which forced the French sheet to rename both masses. Italian *resa* covers both exactly as English does, so this sheet follows the English structure directly (*resa teorica / effettiva / percentuale*). Decimal commas throughout the worked examples -- check that is what you want, since the formulae around them use points. Note *la mole* is feminine, like French's *une mole* and unlike Spanish's *el mol*. |
| Strutture di Lewis | **medium** | Uses **struttura di Lewis** and **doppietto solitario**. VSEPR is kept as the English acronym, which is what Italian textbooks print (Spanish localises it to RPECV); the shape names (tetraedrica, piramidale trigonale, angolare) are standard. This sheet has **four** sections, matching the English. Its first section is the Year 9-10 layer and is where *dispari* appears on a cheat sheet rather than in the game. |
| Dare il nome ai composti organici | **low** | Same problem as the inorganic naming sheet. Italian names esters the other way round from English -- *etanoato di metile*, not "methyl ethanoate" -- writes carboxylic acids as *acido ...oico* and amines as *-ammina* (double m). The root table is the Italian one (*es-*, *ept-*, *ott-*), not a transliteration, and the haloalkane prefix is *iodo-*. **A chemistry teacher must check this sheet.** |
| Gruppi funzionali | **low** | Unlike French -- whose programme insists on *groupe caracteristique* -- Italian says **gruppo funzionale** and there was no decision to make in the title. The reference table mixes structure notation (untranslated) with Italian group names and Italian reaction descriptions. The ester and amide rows in particular follow Italian naming, which is not a translation of the English pattern. |

**Not translated, deliberately:** every linked resource is an English-language
site (Khan Academy, LibreTexts, Chemguide, PubChem, the VCAA data book). Their
titles are left in English so they are findable, and the Italian descriptions say
"(In inglese.)" so a reader is not surprised. **This is a genuine gap rather than
a solved problem**: an Italian student gets Italian explanations and then English
source material. If Italian is going to be a first-class language, the resource
lists should get Italian equivalents (Zanichelli's Aula di Scienze, Chimica
Online, Openfisica and the like), which is a content task rather than a
translation task.

**Also not translated:** the curriculum references. Every sheet cites the
Victorian Curriculum or the VCE study design, which is Australian. The
surrounding Italian is translated but the curriculum itself is not relevant to an
Italian reader. Worth deciding whether Italian sheets should show an Italian
*Indicazioni nazionali* reference, or none.

## What I am most likely to have got wrong

Ranked, honestly:

1. **The two naming sheets** (\`naming-compounds\`, \`organic-nomenclature\`). I
   changed what they teach, because teaching English naming rules in Italian
   would be worse than useless. That is the right call but it is beyond what a
   translator should decide alone.
2. **"dispari".** The word Condividi e completa is built on, in every coach line,
   every hint and on the canvas. The *reason* for it is solid and it is stronger
   than the Spanish case: three separate words are genuinely unavailable
   (*solitario* and *libero* are both already lone pairs, *singolo* is the single
   bond), and shipping any of them would have been a real pedagogical bug in the
   one game that teaches those differences. What is uncertain is register:
   *dispari* is also the everyday word for an odd number, and *pari o dispari* is
   a children's game, so a fourteen-year-old meeting it beside a pulsing dot may
   hear "number 3" before "unpaired". It is also seven characters on a dot label
   that the layout note says overlaps beyond about four.
3. **The bare diatomic names** (*idrogeno* for H2, not *diidrogeno*). A
   deliberate divergence from French and Spanish, made because Italian school
   practice is what it is, and the one place a teacher's answer would change the
   file.
4. **Game titles.** Six coinages, no strong opinion behind any of them.
   "Rompiformule" is the most invented and "La bilancia degli atomi" the longest.
5. **Register in the playful copy.** Overlay messages, empty states and the
   marketing hero are where a non-native translation reads as "correct but
   flat". None of it is wrong; some of it may be charmless.
6. **The privacy page.** Legally unreviewed, and describing Australian law.
7. **"bigino" for cheat sheet, "indizio" for hint, and "Guida" for the coach.**
   All three are register calls about school Italian rather than chemistry, and
   *bigino* is the one a fourteen-year-old might find dated.
`,
};
