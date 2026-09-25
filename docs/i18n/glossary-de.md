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
| Address | Informal **du** throughout. **Decided by the owner on 2026-09-19**, alongside *tu* / *tú* / *tu* / *ты* for the other locales. Normal for German educational software aimed at 14–16 year olds; *Sie* reads like a letter from a bank. |
| Quotation marks | German **„…“** (low-high), not `"…"`. |
| Dash | **–** (en dash) for parenthetical dashes, not `-` or `—`. |
| Ellipsis | **…** as a single character. |
| Units and abbreviations | Non-breaking space (` `) before a unit and inside `z. B.`, so "8,0 g" and "z. B." never wrap. |
| Decimals | German **comma**: 6,02 × 10²³, not 6.02. (Applies to prose; code and formulae keep their own notation.) |
| Multiplication in a worked sum | **×** (U+00D7) with a space either side: *2 × 1 + 16 = 18*. Never the letter x, which a student who has just met *x* as an unknown reads as algebra. Decided 2026-09-24, when the example cards started showing the formula-mass working. |
| Four-digit numbers | **No separator**: *5730 Jahre*. A no-break space groups from five digits on (*65 000*), which is how the sheets already write it. DIN 5008 allows either for four digits; unseparated matches the isotopes prose. |
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
| ~~the game's "loner" (game word)~~ | **dropped 2026-09-19 — use *ungepaartes Elektron*** | The game used to give this concept two names: the textbook term above and an invented game word, *Einzelelektron*, with *einzeln* as the short label on a pulsing dot. **That scheme was abolished on 2026-09-19.** There is now one term per language and it is the formal one, used in the hub line, every coach line, every hint, the glossary and the canvas legend. The reasoning that produced *Einzelelektron* is kept in the section below so that nobody re-proposes it, and the collision warnings in that section are still true — they bind any *new* wording chosen near this term, not just the nickname they originally decided. The width argument that forced the short dot label is also retired: *ungepaartes Elektron* renders 125 px at `text-[9px]` uppercase against the ~44 px a per-dot label had, but the label is no longer printed beside every dot — it is printed once, in a legend above the board, where length does not matter. |
| the Level 1 canvas legend | **ungepaartes Elektron** | The same formal term. It names the pulsing dot once, beside a sample of it, above the board — not beside each dot. Present at Level 1 and off from Level 2: the legend is a scaffold the brief removes on purpose. **Rejected historically: *Einzelgänger* as the game word** — a word for a *person* (a lone wolf), so in a chemistry sentence it read as cute rather than chemical. Note that gender follows the noun: *das* ungepaarte Elektron. |
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
| VSEPR shapes: linear, trigonal planar, tetrahedral, trigonal pyramidal, bent | **linear, trigonal-planar, tetraedrisch, trigonal-pyramidal, gewinkelt** | Added 2026-09-25 with the Lewis sheet's shape diagram (`lewis-structures/02-vsepr-shapes`). The terms German school books print, and the ones the sheet's VSEPR paragraph already used, so the drawing and the prose above it agree. *V-förmig* for bent is also seen and is not used. The compounds keep their hyphen (*trigonal-planar*); the diagram never breaks a line at it. Angles take the decimal comma and no space before the degree sign: *109,5°*, *104,5°*. |
| bond angle | **Bindungswinkel** | Added 2026-09-25. |
| wedge / hashed wedge (a bond towards / away from the viewer) | **Keil / gestrichelter Keil** | Added 2026-09-25, for alt text. The drawing convention is the *Keilstrichformel*. |
| lone-pair lobe (in a VSEPR drawing) | **Keule** | Added 2026-09-25, for alt text: *das freie Elektronenpaar ist als Keule gezeichnet*. The word German uses for an orbital's lobe. |

## Atomic structure, the periodic table and radioactivity

Added 2026-09-21, when *Atoms, Isotopes & the Periodic Table* split into
*Atoms & the Periodic Table* (Year 9) and *Isotopes & Radioactivity* (Year 10).
The first eight rows were already in use on the German atomic-structure sheet
and are recorded here so the next writer does not re-decide them; the rest are
new with the split.

| English | German (use this) | Why this one, and what we rejected |
|---|---|---|
| periodic table | **Periodensystem** | The full form is *Periodensystem der Elemente* (PSE); the short form is what a German classroom says. Not *periodische Tafel*, which is a calque. |
| atomic number | **Ordnungszahl** | *Kernladungszahl* is equally correct and says more (it is the nuclear charge), but *Ordnungszahl* is the word a Year 9 textbook prints and the one the sheet already used. |
| mass number | **Massenzahl** | — |
| energy level | **Energiestufe** | The sheet deliberately says *level*, not *shell*, because a shell is a picture and a level is an energy. See the next row. |
| electron shell (the curriculum's word) | **Schale** / **Elektronenschale** | VC2S10U07 says "electron shells", so the sheet names *Schale* once as the word the reader's teacher will use and keeps *Energiestufe* as its own term. Do not swap one for the other halfway through a sheet. Since 2026-09-25 the sentence credits the word to the teacher alone (*Deine Lehrkraft sagt dazu vielleicht Schalen*); it no longer mentions the Lehrplan. |
| outer level / outer shell | **äußerste Stufe**, electrons in it: **Außenelektronen** | Follows the *Außenelektron* row above. |
| Bohr model | **Bohrsches Atommodell** | Named as a *model* every time it appears, per the sheet's own contract: it is how you count electrons, not what an atom looks like. |
| isotope | **Isotop** | — |
| group (a column) | **Gruppe** | German uses the same word for a column of the table and for a functional group; context separates them, and the sheet always writes *Gruppe 1*, *Gruppe 17*, never bare *Gruppe*. |
| valence electrons from the group number | **die letzte Ziffer der Gruppennummer** (*Cl steht in Gruppe 17: 7 Valenzelektronen*), einmal ergänzt um *das ist die Nummer der Hauptgruppe (VII. Hauptgruppe)* | Added 2026-09-25. The site numbers the groups 1–18, so the old sentence *die Hauptgruppennummer sagt dir, wie viele Valenzelektronen …* was only true in the I–VIII Hauptgruppen system German textbooks also use. The bonding and Lewis sheets now state the 1–18 rule and name the Hauptgruppe once, on the bonding sheet, as the bridge to the textbook. **Never write *Hauptgruppe 17*:** it mixes the two systems. The Lewis table's column is *Gruppe* for the same reason. |
| period (a row) | **Periode** | Not *Reihe*. *Periode* is the technical term and pairs with *Periodensystem*. |
| metal | **Metall** | — |
| non-metal | **Nichtmetall** | One word, no hyphen. |
| metalloid | **Halbmetall** | The German school word. *Metalloid* exists in German but historically meant *non-metal*, which is the opposite of what is meant here — so it is not usable. Marked on the sheet as an extension: the curriculum says only "metallic and non-metallic properties". |
| alkali metal | **Alkalimetall** | — |
| halogen | **Halogen** | — |
| noble gas | **Edelgas** | — |
| atomic size / atomic radius | **Atomradius** | *Atomgröße* is the everyday word and is used once in running prose; *Atomradius* is the term. |
| reactivity | **Reaktivität** | *Reaktionsfreudigkeit* is the more transparent school word and reads better in a sentence about group 1; both are in use, and the sheet uses *Reaktivität* for the heading and either in the body. |
| alkaline earth metal | **Erdalkalimetall** | One word. Added with the interactive periodic table, whose *Familien* mode names all ten families. |
| transition metal | **Übergangsmetall** | — |
| lanthanide | **Lanthanoid** | The IUPAC-aligned form. *Lanthanid* is older and still common in school books, so a reader may meet either. **Rated medium.** |
| actinide | **Actinoid** | Same decision as *Lanthanoid*, and note the c: *Aktinoid* also occurs in German, but IUPAC German spells it with c. **Rated low.** |
| picometre (pm) | **Pikometer (pm)** | The word is German, the unit symbol stays Latin — as every unit symbol does. |
| radioactive decay | **radioaktiver Zerfall** | Verb: *zerfallen*. Not *Verfall*, which is decay in the sense of a building falling down. |
| alpha particle | **Alphateilchen** | Written out rather than as α, so a screen reader says something. |
| beta particle | **Betateilchen** | — |
| beta decay | **Betazerfall** | Added 2026-09-25, for how reactors make neptunium and plutonium. Formed like *Betateilchen*; *β-Zerfall* is the same word in symbols and is fine in a formula context. |
| gamma radiation | **Gammastrahlung** | Gamma is radiation, not a particle, and the German word keeps that straight where the English "gamma ray" does not. |
| shielding gamma ("reduces, never stops") | **abschwächen**: *Blei oder dicker Beton schwächen sie stark ab* | Added 2026-09-24. Gamma radiation is attenuated, not stopped, and German physics and chemistry books say *abschwächen* for exactly that (*Abschwächung von Gammastrahlung*). Alpha and beta keep *aufhalten*. |
| half-life | **Halbwertszeit** | — |
| synthetic element / made element | **künstlich erzeugtes Element** | Not *synthetisches Element*, which in German suggests a manufactured material rather than a nucleus built in an accelerator. |
| radiocarbon dating | **Radiokarbonmethode** | Also *C-14-Methode*, which is shorter and is what a museum label says. Either is fine; do not use both on one sheet. |
| optically stimulated luminescence (OSL) | **optisch stimulierte Lumineszenz (OSL)** | The established German term; the abbreviation is the English one and stays Latin. **Rated low** — this is a specialist archaeological dating method and the phrase is rare in German school material. |
| electron cloud (diagram label) | **Elektronenwolke** | Added 2026-09-25 with the redrawn atom diagrams. The textbook word for the probability picture of the Atomhülle. |
| not to scale (diagram caveat) | **nicht maßstabsgetreu**, and the ratio as **1/100 000 des Atomdurchmessers** | Added 2026-09-25 with the redrawn atom diagrams. Says *Durchmesser* on purpose: "1/100 000 des Atoms" is ambiguous, and by volume the ratio is about 10⁻¹⁵. *100 000-mal kleiner* was rejected: common in class, but it does not say what is being compared. |
| heavier, but first / lighter, but second (06) | **schwerer, steht aber vorn** / **leichter, steht aber dahinter** | Added 2026-09-25 with the redrawn atom diagrams. *steht vorn* is how a German teacher talks about a place in the Periodensystem; a literal *aber zuerst / aber an zweiter Stelle* reads like a race. |
| the counting-model caveat (05) | **Eine Art, Elektronen zu zählen – kein Bild eines Atoms.** | Added 2026-09-25 with the redrawn atom diagrams. A no-break space sits before the dash, so a wrapped line never starts with it. |
| electron arrangement written out | **2, 8, 1** | Added 2026-09-25 with the redrawn atom diagrams. The comma list is kept in a decimal-comma locale: every item is a whole number and a space follows each comma, so it cannot be read as a decimal. **Rated medium**: some German textbooks write the shells as K2 L8 M1; the sheet does not use shell letters anywhere. |
| a cell of the periodic table (alt text) | **Feld** (*das Tellur-Feld*) | Added 2026-09-25 with the redrawn atom diagrams. |
| hydrogen-1, -2, -3 (03) | **Wasserstoff-1**, **Wasserstoff-2**, **Wasserstoff-3** | Added 2026-09-25 with the redrawn isotope diagrams. The mass-number form the sheet already uses for *Kohlenstoff-14*. |
| protium / deuterium / tritium (03) | **Protium** / **Deuterium** / **Tritium** | Added 2026-09-25 with the redrawn isotope diagrams. Printed under the mass-number name, because German textbooks name hydrogen's isotopes this way (*schwerer Wasserstoff* is Deuterium). |
| stable / radioactive, of one isotope (03) | **stabil** / **radioaktiv** | Added 2026-09-25 with the redrawn isotope diagrams. Predicative, so uninflected. |
| undecayed nuclei (07, vertical axis) | **noch nicht zerfallene Kerne** | Added 2026-09-25 with the redrawn isotope diagrams. The quantity German physics plots in the decay law (*Anzahl der noch nicht zerfallenen Kerne N(t)*). Replaces "how much is left", which suggests the sample itself disappears. *Unzerfallene Kerne* is shorter and also used; *noch nicht* says they will. |
| time in half-lives (07, horizontal axis) | **Zeit in Halbwertszeiten** | Added 2026-09-25 with the redrawn isotope diagrams. Localised, not translated: a German axis is labelled *Größe in Einheit*, as in *Zeit t in Halbwertszeiten*, rather than with the bare unit. |

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
| significant figures | **gültige Ziffern** | Added 2026-09-25. The phrase German physics and chemistry lessons use for the rounding rule (*so viele gültige Ziffern wie die ungenaueste Angabe*). *Signifikante Stellen*, which the stoichiometry sheet used before, is understood but reads like a translation. |
| the VCE data book | **withheld** | Added 2026-09-25. It is one Australian exam's booklet. The IR sentence on the functional-groups sheet now points to *eine IR-Tabelle*, and the polyatomic-ion table is headed *Die wichtigsten mehratomigen Ionen*. The *Tafelwerk* is the German equivalent for most data, but it was not named for IR ranges because not every Tafelwerk prints them. |

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

---

## Explore: Molekül und Forschende der Woche

Decided for `src/lib/explore/` and used in `src/i18n/explore/de.ts`. Each term is
used identically in every entry that needs it — the same concept called two
things on two cards is the single most common translation bug in a technical
app, and that is what this table exists to stop.

| English | German | Note |
|---|---|---|
| quasicrystal | **Quasikristall** | No competing form. |
| tenfold / fivefold symmetry | **zehnzählige / fünfzählige Symmetrie** | German crystallography says *-zählig*, never *-fach*. |
| twinned crystals | **verzwillingte Kristalle** | What Pauling's objection is actually called in German. |
| diffraction pattern | **Beugungsmuster** | *Beugungsbild* is equally correct; *Muster* is transparent to a 14-year-old. |
| X-ray crystallography | **Röntgenstrukturanalyse** | The German term; *Röntgenkristallographie* is a calque. |
| peroxide bridge | **Peroxidbrücke** | Builds on *Peroxid*, already fixed above. *Endoperoxid* is university register, and the English avoids it too. |
| isotactic | **isotaktisch** | Natta's own coinage; the same word in both languages. |
| liquid crystal | **Flüssigkristall** | — |
| heat of fusion / latent heat store | **Schmelzwärme**; **Wärmespeicher**, **Latentwärmespeicher** | Both entries describe the effect rather than naming it, as the English does. |
| incongruent melting | **„es schmilzt nicht sauber“** (prose) | *Inkongruentes Schmelzen* is correct and far above reading age 12. Recorded so nobody reaches for it. |
| chirality / mirror images | **chiral**; **„wie Bild und Spiegelbild“** | The German textbook phrase. *Spiegelbildformen* reads as a translation. |
| R/S nomenclature | **R/S-System**, **Cahn-Ingold-Prelog-Regeln** | **German joins personal names in a compound with hyphens, not en dashes** — likewise *Ziegler-Natta-Katalysator*, *Langmuir-Blodgett-Schichten*, *Lewis-Langmuir-Theorie*, *Haber-Bosch-Verfahren*. The en dash in the typography table above is for parenthetical dashes only; do not over-apply it here. |
| processivity | **„hält die Vorlage fest und lässt nicht los“** | The term is *Prozessivität*; the English describes rather than names it, so the German does too. |
| strand displacement | **„schiebt den Gegenstrang aus dem Weg“** | The term is *Strangverdrängung*. Same reasoning. |
| complex ion | **Komplex-Ion** | Hyphenated to match *Oxonium-Ion*. One family of *mehratomiges Ion*, which is already fixed above. |
| monolayer | **Moleküllage**; noun form **Monoschicht** | The Blodgett entry needs the plain word („44 Lagen“). |
| catalytic hydrogenation | **katalytische Hydrierung** | Not *Hydrogenierung*. |
| heat of formation | **Bildungsenthalpie** | Correct and standard — and above reading age 12, which is why the review rates it `low`. |
| CFCs | **FCKW** | **The important one.** A German reader knows no other abbreviation; "CFC" is opaque. |
| Haber process | **Haber-Bosch-Verfahren** | German names it after both men; *Haber-Verfahren* alone reads as a mistake. |
| oxidation state | **Oxidationszahl** | The school term. |
| –OH / –COOH / –NH2 groups | **Hydroxygruppe / Carboxygruppe / Aminogruppe** | Current German IUPAC forms, not *Hydroxyl-/Carboxyl-/Amin-*. Older textbooks differ; flagged for a teacher. |
| umami | **Umami** | Loanword, capitalised as a German noun. |
| aramid | **Aramid**, **Aramidfaser** | — |
| benzene | **Benzol** | The school and everyday word; *Benzen* is the German IUPAC form no Year 10 textbook uses, and `cheat-sheets/de.ts` already says *Benzol*. The entry adds a clause the English has no reason to carry, because **Benzol/Benzin** is a confusion German readers actually have. |
| citric acid | **Citronensäure** | The chemical spelling. *Zitronensäure* is what a student reads on an ingredients list; flagged `medium` for a teacher to settle. |
| cholesterol | **Cholesterin** | **Never *Cholesterol*** — a real trap when translating from English. |
| baking soda | **Natron** | The everyday word. *Backpulver* is a different product, so it would be a factual error. |
| table salt / rock salt | **Kochsalz / Steinsalz** | — |
| Glauber's salt | **Glaubersalz** | One word, no genitive. |
| urea | **Harnstoff** | — |
| limonene | **Limonen** | Correct, and a homograph of the plural of *Limone* (lime) inside an entry about citrus. No better option exists; flagged. |
| oleic acid / stearic acid | **Ölsäure / Stearinsäure** | — |
