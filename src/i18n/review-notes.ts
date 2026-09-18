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
};
