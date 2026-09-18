# German chemistry glossary

The agreed German term for every chemistry concept that appears on the site. It
exists so the same idea is not called two different things on two different
pages, and so whoever writes the next German string does not have to re-decide.

**If you are adding or editing German copy, use the term in the middle column.**
Where German school practice accepts more than one word, the "Why this one"
column says which we picked and why; the rejected alternative is not wrong, it
is just not ours.

Scope: German for a Year 9–10 audience, informal *du*, following the vocabulary
used in German school textbooks rather than university German.

One constraint that is easy to miss: the tap-to-explain matcher in
`GlossaryTerm.tsx` finds a term with a JavaScript `\b` word boundary, and `\b`
only knows ASCII letters. **A match word must therefore start and end with an
ASCII letter** — umlauts and `ß` inside a word are fine (*Außenelektron*,
*Verhältnisformel*), but a term that begins with *Ä*, *Ö*, *Ü* would never
match. `src/i18n/game-messages.test.ts` asserts this for every match word in
every game catalogue, so a term that could never open its pop-over fails the
suite rather than failing silently on screen.

---

## Register and typography

| Rule | Decision |
|---|---|
| Address | Informal **du** throughout. Normal for German educational software aimed at 14–16 year olds; *Sie* reads like a letter from a bank. |
| Quotation marks | German **„…“** (low-high), not `"…"`. |
| Dash | **–** (en dash) for parenthetical dashes, not `-` or `—`. |
| Ellipsis | **…** as a single character. |
| Units and abbreviations | Non-breaking space (` `) before a unit and inside `z. B.`, so "8,0 g" and "z. B." never wrap. |
| Decimals | German **comma**: 6,02 × 10²³, not 6.02. (Applies to prose; code and formulae keep their own notation.) |
| Nouns | Capitalised, including nominalised adjectives (*das Ausgleichen*). |
| Gender | Prefer a neutral plural or a role noun (*Forschende*, *Lehrkräfte*, *Schülerinnen und Schüler*) over a gendered singular. No asterisk or colon forms. |

---

## Core chemistry terms

| English | German (use this) | Why this one, and what we rejected |
|---|---|---|
| acid | **Säure** | — |
| base | **Base** | *Lauge* is specifically an alkaline *solution*, so it is wrong for a solid hydroxide or for ammonia. |
| basic / alkaline | **basisch / alkalisch** | Both are used in school; "basisch" is primary. |
| neutral | **neutral** | — |
| amphoteric | **amphoter** | — |
| pH | **pH-Wert** | German says "the pH value", not bare "pH". |
| indicator | **Indikator** | — |
| neutralisation | **Neutralisation** | Not *Neutralisierung*, which is the everyday/political word. |
| proton donor / acceptor | **Protonendonator / Protonenakzeptor** | The Brønsted-Lowry pair as German textbooks write it. |
| hydronium ion (H₃O⁺) | **Oxonium-Ion** | German school chemistry uses *Oxonium*; *Hydronium* is an anglicism that appears but is not the textbook term. |
| strong / weak acid | **starke / schwache Säure** | — |
| concentrated / dilute | **konzentriert / verdünnt** | — |
| salt | **Salz** | — |

## Substances and structure

| English | German (use this) | Why this one, and what we rejected |
|---|---|---|
| compound | **Verbindung** | — |
| molecule | **Molekül** | — |
| element | **Element** | — |
| atom | **Atom** | — |
| ion | **Ion** | — |
| cation / anion | **Kation / Anion** | — |
| polyatomic ion | **mehratomiges Ion** | *Molekülion* is also correct but less common in Year 10 material. |
| state of matter | **Aggregatzustand** | Not *Zustand der Materie*, which is a literal translation nobody uses. |
| solid / liquid / gas | **fest / flüssig / gasförmig** | — |
| aqueous | **wässrig** / "in Wasser gelöst" | — |
| precipitate | **Niederschlag** | — |
| lattice | **Gitter** (Ionengitter, Metallgitter, Atomgitter) | — |
| covalent bond | **Atombindung** | The standard German school term. *Kovalente Bindung* is understood and is glossed once on the bonding sheet, but *Atombindung* is what a German Year 10 textbook says. |
| ionic bond | **Ionenbindung** | — |
| metallic bond | **Metallbindung** | — |
| valence electrons | **Valenzelektronen** | *Außenelektronen* is the other common term; Valenzelektronen matches the Lewis/VSEPR vocabulary used alongside it. |
| lone pair | **freies Elektronenpaar** | Not *einsames Elektronenpaar*, which is a calque. |
| bonding pair / shared pair | **bindendes Elektronenpaar** | The Share to Fill game says "shared pair" where a textbook says "bonding pair"; both are *bindendes Elektronenpaar* in German. Do not introduce a second word (*gemeinsames Elektronenpaar*) for the same thing. |
| unpaired electron (formal term) | **ungepaartes Elektron** | The textbook term. Use it in the glossary, on the cheat sheets and anywhere the text is explaining rather than instructing. |
| the game's "loner" (game word) | **Einzelelektron** | English gives this concept two names — the formal *unpaired electron* and the game's own *loner* — and teaches the pair. German mirrors that instead of collapsing it: *Einzelelektron* is a real chemistry compound noun, transparent to a 14-year-old, light enough to repeat in every coach line, and unambiguously about an electron. **Rejected: *Einzelgänger*.** It is a word for a *person* (a lone wolf), so in a chemistry sentence it reads as cute rather than chemical; German has no playful register here the way English does. Note the gender changes with the word: *das* Einzelelektron, not *der* Einzelgänger. |
| the short label on a pulsing dot | **einzeln** | The canvas has room for one word beside a dot. *einzeln* is the adjective of the same idea; the noun is in the coach line and the glossary. Present at Level 1 and off from Level 2 — the label is a scaffold the brief removes on purpose. |
| outer electron | **Außenelektron** | The transparent everyday word, used in the game's running text; *Valenzelektron* stays the formal term and the two are glossed together. |
| octet (eight outer electrons) | **Oktett** | — |
| duet (hydrogen's two) | **Duett** | German school chemistry has no settled word; it says *Edelgaskonfiguration des Heliums* or nothing at all. *Duett* mirrors the English coinage and fits a glossary chip. **Rated low.** |
| single / double / triple bond | **Einfachbindung / Doppelbindung / Dreifachbindung** | — |
| bond-line drawing | **Strichformel** | — |
| Lewis structure | **Lewis-Formel** | German schools also say *Valenzstrichformel* and *Elektronenformel*. Picked *Lewis-Formel* because it is transparent, matches the (upcoming) game's name, and is the term the VCE-derived source material uses. |
| octet rule | **Oktettregel** | — |
| formal charge | **Formalladung** | — |
| electronegativity | **Elektronegativität** | — |
| delocalised electrons | **frei bewegliche Elektronen** | The literal *delokalisierte Elektronen* is correct but is upper-secondary register; the school phrasing is clearer at this level. |

## Formulae, equations and naming

| English | German (use this) | Why this one, and what we rejected |
|---|---|---|
| chemical formula | **chemische Formel** | — |
| formula of an ionic compound | **Verhältnisformel** | This distinction matters in German: an ionic "formula" is explicitly *not* a *Molekülformel*, because there is no molecule. The `chemical-formulas` sheet is titled with it. |
| molecular formula | **Molekülformel** | — |
| subscript (the small number in a formula) | **Index** | The English "subscript"/"coefficient" contrast becomes **Index**/**Koeffizient** in German, which is exactly the distinction the balancing topic turns on. |
| coefficient (stoichiometric) | **Koeffizient** / **stöchiometrischer Koeffizient** | — |
| to balance an equation | **eine Gleichung ausgleichen** | The German school standard. *Einrichten* also exists (and is common in some Länder) but *ausgleichen* is the more widely taught verb and pairs naturally with *Atombilanz*. |
| balanced equation | **ausgeglichene Gleichung** | — |
| conservation of mass | **Massenerhaltung** | — |
| reactants | **Edukte** | *Ausgangsstoffe* is the other accepted term, common in earlier years. Picked *Edukte* because it pairs with *Produkte* and is standard from about Year 8 in German curricula. |
| products | **Produkte** | — |
| reaction arrow | **Reaktionspfeil** | — |
| atom ledger (the per-element tally) | **Atombilanz** | The game's own name for the table under the arrow. Pairs with *ausgleichen*. |
| lowest terms | **einfachste Form** | "Gekürzt" is used for the act of simplifying (*durch 3 gekürzt*); *einfachste Form* for the state. |
| word equation | **Wortgleichung** | Used in the Challenge level; the game shows it as prose rather than naming it. |
| state symbol | **Zustandssymbol** | — |
| synthesis | **Synthese** | — |
| decomposition | **Zersetzung** | *Analyse* is the classical counterpart to *Synthese* in German teaching, but *Zersetzung* is clearer and is what modern textbooks use. |
| combustion | **Verbrennung** | — |
| single / double displacement | **einfache / doppelte Verdrängung** | — |
| precipitation reaction | **Fällungsreaktion** | — |
| oxidation / reduction | **Oxidation / Reduktion** | — |
| oxidising agent | **Oxidationsmittel** | — |

## The mole and stoichiometry

| English | German (use this) | Why this one, and what we rejected |
|---|---|---|
| amount of substance (n) | **Stoffmenge** | — |
| mole | **Mol** | — |
| Avogadro's number | **Avogadro-Konstante** | German uses *Konstante*, not *Zahl*. |
| relative atomic mass | **relative Atommasse** | — |
| molar mass (M) | **molare Masse** | *Molmasse* is common shorthand and acceptable, but the sheets use the full form to match the symbol M. |
| concentration | **Konzentration** | — |
| limiting reagent | **begrenzendes Edukt** | Also seen: *limitierender Reaktant*, *Mangelkomponente*. Picked *begrenzendes Edukt* because it reuses *Edukt*, already fixed above. |
| in excess | **im Überschuss** | — |
| theoretical / actual yield | **theoretische / tatsächliche Ausbeute** | — |
| percentage yield | **prozentuale Ausbeute** | — |

## Organic chemistry

| English | German (use this) | Why this one, and what we rejected |
|---|---|---|
| functional group | **funktionelle Gruppe** | — |
| homologous series | **homologe Reihe** | — |
| hydrocarbon | **Kohlenwasserstoff** | — |
| alkane / alkene / alkyne | **Alkan / Alken / Alkin** | Note *Alkin*, not "Alkyn". |
| haloalkane | **Halogenalkan** | — |
| alcohol | **Alkohol** | — |
| aldehyde / ketone | **Aldehyd / Keton** | — |
| carboxylic acid | **Carbonsäure** | — |
| ester | **Ester** | German names esters as *…säure…ester* (Essigsäureethylester), not with the English "-oate" pattern. |
| amine / amide | **Amin / Amid** | — |
| esterification | **Veresterung** | — |
| hydrolysis | **Hydrolyse** | — |
| substituent | **Substituent** | — |
| chain (carbon chain) | **Kette / Kohlenstoffkette** | — |
| locant (position number) | **Nummer** / **Stellungsziffer** | Prose uses "Nummer" at this level. |

---

## Naming: what changes and what does not

| Kind of thing | Translated? | Notes |
|---|---|---|
| Chemical formula (H₂O, Ca(OH)₂, 2H₂ + O₂ → 2H₂O) | **No** | International notation. Structurally impossible to translate in this codebase: formulae are not in the translation overlays at all, and `cheat-sheets.test.ts` asserts they come through byte-identical. |
| Element symbol (Na, Cl, Fe) | **No** | — |
| State symbol ((s), (l), (g), (aq)) | **No** | Kept as the international abbreviations even though the German words differ (*fest*, *flüssig*, *gasförmig*, *wässrig*), because that is what appears in equations. |
| Charge notation (2−, +) | **No** | — |
| Element **name** | **Yes** | Sodium → Natrium, Potassium → Kalium, Nitrogen → Stickstoff, Oxygen → Sauerstoff, Lead → Blei, Tungsten → Wolfram, Mercury → Quecksilber. Full table in `src/i18n/chemistry-names/de.ts`. |
| Compound **name** | **Yes** | Sodium hydroxide → Natriumhydroxid (one word). Hydrochloric acid → **Salzsäure**, not "Chlorwasserstoffsäure": German names the common mineral acids after the solution. Likewise HF → **Flusssäure**. |
| Ion **name** | **Yes** | Note German uses the systematic *Hydrogen-* prefix where the English data still uses the older *bi-*: bicarbonate → **Hydrogencarbonat**, bisulfate → **Hydrogensulfat**. |
| IUPAC affixes being *discussed as affixes* (-ate/-ite, hypo-/per-, -ol/-al/-one) | **Partly** | Where the sentence is teaching the German naming system, the German affixes are used (*-at*/*-it*, *-säure*/*-ige Säure*). Where a table is showing the English source affix, it is kept and the German equivalent given alongside. Flagged for review — see `de-review.md`. |
| Spelling convention | — | German IUPAC spellings: **Calcium** (not Kalzium), **Silicium** (not Silizium), **Iod** (not Jod), **Caesium** (not Cäsium), **Cobalt** (not Kobalt), **Bismut** (not Wismut). |

---

## Product and UI vocabulary

Not chemistry, but it needs to be consistent too.

| English | German | Note |
|---|---|---|
| ChemGames | **ChemGames** | Brand; never translated. |
| cheat sheet | **Spickzettel** | The natural German school word, and the right register for teenagers. |
| game | **Spiel** | — |
| level | **Level** | Established German gaming loanword; *Stufe* would read as a school year. |
| score / points | **Punkte**, **Punktzahl** | *Endpunktzahl* for "final score". |
| high score | **Highscore** | Established loanword in German gaming. |
| leaderboard | **Bestenliste** | — |
| rank | **Platz** | — |
| hint | **Tipp** | Not *Hinweis*, which is more formal/administrative. |
| lives | **Leben** | — |
| wave (of enemies) | **Welle** | — |
| Game Over | **Spiel vorbei** | Keeping the English is common in games, but German is clearer for this audience. |
| pause / resume | **pausieren / weiterspielen** | — |
| instructions | **Spielanleitung** | — |
| coach (the in-game hint panel) | **Coach** | Established German gaming loanword, and it has to stay distinct from *Tipp*, which is the hint ladder. |
| support mode | **Unterstützungsmodus** | Long but transparent, and matches the *Unterstützung* heading in the settings panel. *Hilfemodus* collides with *Spielanleitung*. |
| marking sheet | **Korrekturbogen** | — |
| lab notebook | **Laborheft** | — |
| challenge (the bonus level) | **Challenge** | Kept as the level's name, like *Level*. |
| settings | **Einstellungen** | — |
| year level | **Klassenstufe**, labels **Klasse 7–10**, **Oberstufe** | The stored value stays `Year 9`; only the label is German. |
| teacher | **Lehrkraft / Lehrkräfte** | Gender-neutral. |
| student | **Schülerin / Schüler**, plural **Schülerinnen und Schüler** | — |
