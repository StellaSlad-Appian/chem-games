# French chemistry glossary

The agreed French term for every chemistry concept that appears on the site. It
exists so the same idea is not called two different things on two different
pages, and so whoever writes the next French string does not have to re-decide.

**If you are adding or editing French copy, use the term in the middle column.**
Where French school practice accepts more than one word, the "Why this one"
column says which we picked and why; the rejected alternative is not wrong, it
is just not ours.

Scope: French for a Year 9–10 audience — **3ᵉ / 2ᵈᵉ**, the collège–lycée
boundary — following the vocabulary of French school textbooks rather than
university French.

One constraint that is easy to miss: the tap-to-explain matcher in
`GlossaryTerm.tsx` finds a term with a JavaScript `\b` word boundary, and `\b`
only knows ASCII letters. **A match word must therefore start and end with an
ASCII letter** — accents *inside* a word are fine (*célibataire*, *réactif*,
*conservée*), but a term that begins with *é* would never match. This bites
French harder than it bit German, because so many French chemistry phrases start
with *électron*: `électrons externes`, `électron de valence` and
`électron célibataire` are all unusable as match words. Where that happens the
match word is the part of the phrase that starts with an ASCII letter
(`externes`, `valence`, `célibataires`), so the chip lands on one word instead of
the whole phrase. `src/i18n/game-messages.test.ts` asserts this for every match
word in every game catalogue, so a term that could never open its pop-over fails
the suite rather than failing silently on screen.

---

## Register and typography

| Rule | Decision |
|---|---|
| Address | Informal **tu** throughout. **Decided by the owner on 2026-09-19; no longer provisional.** It was a real decision rather than an obvious one — French school textbooks and exam papers very often use *vous* ("Vous disposez de…") — and *tu* was chosen because the site is a game, not a worksheet: the English says "Stuck? Press the lightbulb", and *vous* turns that into an invigilator. Every imperative in the dictionary and both catalogues is the *tu* form. |
| Quotation marks | French **« … »**, never `"…"`. A narrow no-break space (U+202F) sits inside both guillemets. |
| Space before `; ! ?` | **Narrow no-break space (U+202F)**, per the Imprimerie nationale and the Unicode recommendation. |
| Space before `:` | **No-break space (U+00A0)**, which is the full-width one. This is the one place French does *not* use the narrow space. |
| Dash | **–** (en dash) for parenthetical dashes, matching the house style already set for German. Not `-`, not `—`. |
| Ellipsis | **…** as a single character. |
| Apostrophe | **’** (U+2019), the typographic apostrophe, not `'`. It also saves escaping inside single-quoted TypeScript strings. |
| Decimals | French **comma**: 6,02 × 10²³, not 6.02. (Prose only; code and formulae keep their own notation.) |
| Thousands | Narrow no-break space (U+202F): 1 000, not 1,000 and not 1.000. |
| Accents on capitals | **Kept**: *É*, *À*, *Ê*. *Equations* is a spelling mistake; *Équations* is not. |
| Ligatures | **œ** where French uses it: *stœchiométrie*, *cœur*. |
| Nouns | Lower case inside a sentence — which is why `LOWERCASES_NAMES_IN_SENTENCE` is `true` for `fr` (see below). |
| Gender | *élève*, *scientifique*, *enseignant* — French has epicene nouns for the two roles that matter most (*élève*, *scientifique*), so the gender-neutral problem German fought with barely arises. No midpoint (*·*) forms, matching the German decision to avoid asterisk forms. |

### `LOWERCASES_NAMES_IN_SENTENCE` is `true` for French

French capitalises only proper nouns, so a chemical name inside a sentence is
lower case: *« deux molécules d’eau »*, not *« deux molécules d’Eau »*. The map
in `src/i18n/chemistry-names.ts` is therefore `true` for `fr`, the same as
English and the opposite of German.

Checked against every call site before setting it: `nameInSentence()` is applied
only to **element names** in the Reaction Balancer catalogue and to **element and
molecule names** in the Share to Fill catalogue. Neither set contains a Roman
numeral, so the naive `.toLowerCase()` cannot turn *fer(III)* into *fer(iii)*.
Species names carrying a Roman numeral (*nitrate de cuivre(II)*) reach the
screen through `speciesName()`, which does **not** lowercase. If a future change
routes a species name through `nameInSentence()`, that is the thing to re-check.

### The article problem, and the device that solves it

This is the biggest structural difference between French and both English and
German, and it shapes dozens of strings.

A placeholder that holds a chemical name cannot be preceded by an article,
because French chooses the article from the name's gender and its first letter:
*l’oxygène* but *le carbone*, *l’eau* but *le méthane*. A template like
*"{atom} a encore 2 solitaires"* has no grammatical French rendering: without an
article it is wrong, and with one it is wrong for half the substitutions.

**The device: put the name in a label position, not in a noun-phrase position.**
Three shapes, used consistently across both catalogues:

| Shape | Example | Where it is used |
|---|---|---|
| Name, then a colon | `{atom} : il reste {count} solitaires.` | coach lines, a11y labels, live-region announcements |
| A generic noun, then a colon, then the name | `Cette substance ne fait pas partie de la réaction : {name}.` | Challenge errors, wrong-pick feedback |
| *l’élément* before the name | `Quel composé contenant l’élément {elementInSentence} ?` | Reaction Balancer coach and hints, where the name is always an element |

*l’élément* works for every element without exception because **every French
element name is masculine** (*le fer*, *l’azote*, *le soufre*), so the pronoun
*il* is safe too. The same is not true of compounds (*l’eau* is feminine), which
is why the compound templates use a colon rather than a pronoun.

Two more consequences worth knowing:

- French chemistry writing *does* drop the article in *« la liaison entre carbone
  et oxygène »*, so `entre {atom1} et {atom2}` is idiomatic and is used as-is.
- *« 0 »* takes the singular in French (*0 solitaire*), and `Intl.PluralRules`
  knows this: `select(0)` returns `one`. Nothing special is needed. French also
  has a CLDR `many` category, but only for numbers from 1 000 000 up; no count
  in this app comes near it, so every plural record supplies `one` and `other`
  and lets `selectPlural()` fall back.

---

## Core chemistry terms

| English | French (use this) | Why this one, and what we rejected |
|---|---|---|
| acid | **acide** | — |
| base | **base** | — |
| basic / alkaline | **basique / alcalin** | Both are taught; *basique* is primary. |
| neutral | **neutre** | — |
| amphoteric | **amphotère** | — |
| pH | **pH** | French says *le pH*, with the article, and never expands it. |
| indicator | **indicateur coloré** | The French school phrase. A bare *indicateur* is ambiguous (an indicator light, an economic indicator). |
| neutralisation | **neutralisation** | — |
| proton donor / acceptor | **donneur / accepteur de proton** | The Brønsted–Lowry pair as French textbooks write it. |
| hydronium ion (H₃O⁺) | **ion oxonium** | GAMES.md left this open for French. French lycée programmes and the textbooks that follow them say *ion oxonium H₃O⁺*; *ion hydronium* exists, is not wrong, and is what a translator reaching for the English cognate would write. **Rated medium — a French chemistry teacher should confirm which their textbook uses**, because the two are genuinely both in circulation and the sheet uses it repeatedly. |
| strong / weak acid | **acide fort / acide faible** | — |
| concentrated / dilute | **concentré / dilué** | — |
| salt | **sel** | — |

## Substances and structure

| English | French (use this) | Why this one, and what we rejected |
|---|---|---|
| compound | **composé** | — |
| molecule | **molécule** | — |
| element | **élément** | — |
| atom | **atome** | — |
| ion | **ion** | — |
| cation / anion | **cation / anion** | — |
| polyatomic ion | **ion polyatomique** | — |
| state of matter | **état de la matière** | *État physique* is the property of one substance; *état de la matière* is the topic, which is what the sheet is about. |
| solid / liquid / gas | **solide / liquide / gaz** (adj. *gazeux*) | — |
| aqueous | **aqueux** / "en solution aqueuse" | — |
| precipitate | **précipité** | — |
| lattice | **réseau** (réseau ionique, réseau métallique, réseau covalent) | *Cristal* names the object; *réseau* names the arrangement, which is what the properties follow from. |
| covalent bond | **liaison covalente** | Unlike German — which teaches *Atombindung* and treats *kovalent* as the second word — French school chemistry says *liaison covalente* and nothing else. No decision to make here. |
| ionic bond | **liaison ionique** | — |
| metallic bond | **liaison métallique** | — |
| valence electrons (formal) | **électrons de valence** | The formal term, used on the cheat sheets. |
| outer electron (running text) | **électron externe** | The transparent word, used in the game's running text, with *électron de valence* glossed beside it — the same two-tier split English makes with "outer (valence) electron". *Électron périphérique* is also correct and is the third term French uses; picked *externe* because it is the shortest and the most transparent. |
| lone pair | **doublet non liant** | The French school term, and the one the brief fixes. **Rejected: *paire libre*** (a calque of the English), **and *doublet libre*** (older French, still seen, but *non liant* is what a current textbook prints and it says what the thing does). |
| bonding pair / shared pair | **doublet liant** | Share to Fill says "shared pair" where a textbook says "bonding pair"; both are *doublet liant*. Do not introduce a second word (*doublet de liaison*, *paire partagée*) for the same thing. |
| unpaired electron (formal term) | **électron célibataire** | The French textbook term — the one used when teaching radicals. Use it in the glossary, on the cheat sheets and anywhere the text is explaining rather than instructing. Note that French's own formal term is already concrete and slightly playful, which is not true of English's "unpaired electron" or German's "ungepaartes Elektron". |
| ~~the game's "loner" (game word)~~ | **dropped 2026-09-19 — use *électron célibataire*** | The game used to give this concept two names: the textbook term above and an invented game word, *solitaire*, with *seul* as the short label on a pulsing dot. **That scheme was abolished on 2026-09-19.** There is now one term per language and it is the formal one, used in the hub line, every coach line, every hint, the glossary and the canvas legend. The reasoning that produced *solitaire* is kept in the section below so that nobody re-proposes it, and the collision warnings in that section are still true — they bind any *new* wording chosen near this term, not just the nickname they originally decided. The width argument that forced the short dot label is also retired: *électron célibataire* renders 116 px at `text-[9px]` uppercase against the ~44 px a per-dot label had, but the label is no longer printed beside every dot — it is printed once, in a legend above the board, where length does not matter. |
| the Level 1 canvas legend | **électron célibataire** | The same formal term, naming the pulsing dot once beside a sample of it, above the board. Present at Level 1 and off from Level 2. |
| octet (eight outer electrons) | **octet** | *La règle de l’octet* is standard from 3ᵉ. |
| duet (hydrogen's two) | **duet** | **French already has this word, and teaches it.** *La règle du duet et de l’octet* is in the French programme: hydrogen, helium, lithium and beryllium follow *la règle du duet*. This is the one place French is in a much better position than German, where Phase 1 had to coin *Duett* and rate it low. **Rated high.** |
| single / double / triple bond | **liaison simple / liaison double / liaison triple** | Note the adjective follows the noun, so these cannot be compounded the way German's *Doppelbindung* is; the match words are three two-word phrases. |
| bond-line drawing | **formule développée** | The H–O–H line. *Formule semi-développée* is the one that hides the C–H bonds and is not what the game draws. |
| Lewis structure | **structure de Lewis** | Also seen: *schéma de Lewis*, *représentation de Lewis*. Picked *structure de Lewis* because it is the brief's term, it matches the cheat-sheet title, and it is what the French Wikipedia article and most lycée textbooks use. |
| octet rule | **règle de l’octet** | — |
| formal charge | **charge formelle** | — |
| electronegativity | **électronégativité** | — |
| delocalised electrons | **électrons libres** | The literal *électrons délocalisés* is correct and is upper-secondary register; *électrons libres* is the school phrasing for the "sea" in a metal and is clearer at this level. |

### The “loner”: French's own two-tier pair — historical, and why it is kept

> **This scheme was abolished on 2026-09-19.** The game no longer has a game
> word, a formal term and a dot label: it has ***électron célibataire*** and nothing else,
> in the hub line, every coach line, every hint, the glossary and the canvas
> legend. Nothing below is current practice.
>
> It is kept for two reasons. First, so that the rejected candidates stay
> rejected — every one of them was ruled out for a stated reason, and a future
> pass that re-proposes one should have to answer that reason. Second, and more
> important, because **the collisions recorded below are facts about French,
> not facts about the old nickname.** They bind any *new* wording chosen
> anywhere near this term, which is why they are repeated in the term table
> above rather than living only here.


English deliberately gives an unpaired outer electron two names — the formal
*unpaired electron* and the game's own *loner* — and teaches the pair, with the
game word fading out as a scaffold (Level 1 labels the dots, Level 2 does not).
German mirrored that split rather than collapsing it. French does the same, but
the two tiers fall differently, because **French's formal term is already the
vivid one**.

| Role | English | German | **French** |
|---|---|---|---|
| Formal term — glossary, cheat sheet, explaining | unpaired electron | ungepaartes Elektron | **électron célibataire** |
| Game word — hub, coach, hints | loner | Einzelelektron | **solitaire** |
| Short label on a dot | loner | einzeln | **seul** |

**Why *solitaire* as the game word.** It nominalises cleanly (*un solitaire*,
*les solitaires*), which is what the coach lines need — they say the word three
times a sentence. It is short enough to repeat. It is everyday French a
14-year-old owns, and it is adjacent enough to *célibataire* that the glossary
chip teaching *« solitaire (électron célibataire) »* reads as two names for one
thing rather than as two different things. And it starts and ends with an ASCII
letter, which *électron célibataire* does not.

**What was rejected.**

- ***célibataire* as the game word.** Tempting, because it is the real French
  term and it is already concrete. Rejected because it collapses the two tiers
  the game is built on: there would be no fading scaffold, just the textbook
  word everywhere, and Level 1's dot labels would carry the same weight as the
  cheat sheet. The English design is a word that is *allowed* to be informal.
- ***orphelin*** (*électron orphelin*). Vivid and it is occasionally used in
  French popular science. Rejected for the reason German rejected *Einzelgänger*:
  it is a word for a child, it carries a sadness the chemistry does not, and it
  would read as cute rather than chemical.
- ***solo*** (*électron solo*). Short and exactly the teenage register.
  Rejected as too slangy to survive a teacher reading it, and it loses the
  chemistry entirely — *solo* says nothing about pairing.
- ***dépareillé***. The best *idea* of the four: it is the everyday French word
  for "not part of a matching pair" (an odd sock), which is precisely the
  chemistry. Rejected because it does not nominalise — *« il reste 2
  dépareillés »* is not French, and the coach lines need a noun.
- ***électron non apparié***. The literal translation of the English formal
  term. Rejected as a term at all: it is a calque, and French already has
  *célibataire*.

**Why *seul* as the dot label.** The canvas has room for one short word beside a
dot. *seul* is four characters, it is the adjective of the same idea, and beside
a single pulsing dot it reads as "on its own". The noun is in the coach line and
in the glossary. Present at Level 1 and off from Level 2 — the label is a
scaffold the brief removes on purpose.

**Rated low, both of them.** Not because they are inaccurate — they are not —
but because this is register, and register is what a native speaker should
decide. The specific risks: a teacher may want *célibataire* throughout and view
*solitaire* as a sloppy synonym rather than a deliberate second tier; and *seul*
can be read as "only" rather than "alone" if the reader is not looking at a
lone dot. If either changes, the edit touches every line of Share to Fill.

## Atomic structure, the periodic table and radioactivity

Added 2026-09-21, when *Atoms, Isotopes & the Periodic Table* split into
*Atoms & the Periodic Table* (Year 9) and *Isotopes & Radioactivity* (Year 10).
The first rows were already in use on the French atomic-structure sheet and are
recorded here so the next writer does not re-decide them; the rest are new with
the split.

| English | French (use this) | Why this one, and what we rejected |
|---|---|---|
| periodic table | **tableau périodique** | The French programme also says *classification périodique des éléments*, which is the formal name; *tableau périodique* is what a classroom says and what the sheet already used. |
| atomic number | **numéro atomique** | — |
| mass number | **nombre de masse** | Note the asymmetry French keeps and English does not: *numéro* for the one that identifies, *nombre* for the one that counts. |
| energy level | **niveau d'énergie** | The sheet says *level*, not *shell*, deliberately. See the next row. |
| electron shell (the curriculum's word) | **couche électronique** | VC2S10U07 says "electron shells", so the sheet names *couche* once as the word the reader's teacher uses, and keeps *niveau d'énergie* as its own term. |
| outer level / outer shell | **niveau extérieur** / **couche externe** | *Couche externe* is the standard French phrase; the sheet uses *niveau extérieur* to stay consistent with *niveau d'énergie* and glosses the other once. |
| Bohr model | **modèle de Bohr** | Named as a *model* every time, per the sheet's own contract. |
| isotope | **isotope** | — |
| group (a column) | **groupe** | The sheet always writes *groupe 1*, *groupe 17*, never a bare *groupe*, because *groupe* also names a functional group. |
| period (a row) | **période** | Not *ligne*, which is the layout word; *période* is the term and pairs with *tableau périodique*. |
| metal | **métal** | — |
| non-metal | **non-métal** | With the hyphen. Plural *non-métaux*. |
| metalloid | **semi-métal** | **The false friend in this whole table, and the reason this row is long.** French *métalloïde* historically means **non-metal** — it is what nineteenth-century French chemistry called everything that was not a metal, and older French textbooks still use it that way. Writing *métalloïde* for silicon would therefore say the opposite of what is meant. **Rated medium**, and worth a teacher's eye: *semi-métal* is unambiguous, but *métalloïde* in the modern English sense is also now current in French, so a reader may meet both. Marked on the sheet as an extension in any case: the curriculum says only "metallic and non-metallic properties". |
| alkali metal | **métal alcalin** | — |
| halogen | **halogène** | — |
| noble gas | **gaz noble** | *Gaz rare* is the traditional French school term and is still widely used; *gaz noble* is the current IUPAC-aligned form and is what recent programmes print. **Rated medium** — an older teacher may expect *gaz rare*. |
| atomic size / atomic radius | **rayon atomique** | *Taille de l'atome* is the everyday phrase and is used once in running prose. |
| reactivity | **réactivité** | — |
| radioactive decay | **désintégration radioactive** | Not *décroissance radioactive*, which names the *decrease* of a sample over time (the curve) rather than the event in one nucleus. The sheet talks about both, so keeping the two words apart matters: *désintégration* for what a nucleus does, *décroissance* only if the curve itself is the subject. |
| alpha particle | **particule alpha** | Written out rather than as α. |
| beta particle | **particule bêta** | With the circumflex, which is how French spells the Greek letter's name. |
| gamma radiation | **rayonnement gamma** | *Rayonnement*, not *rayon*: gamma is radiation, not a particle, and French keeps that straight where "gamma ray" does not. |
| half-life | **demi-vie** | *Période radioactive* is the term used in French physics teaching and in the programme; *demi-vie* is transparent for a fourteen-year-old and is what the sheet already used. **Rated medium** — a physics teacher may prefer *période*. |
| synthetic element / made element | **élément artificiel** | *Élément synthétique* is also correct; *artificiel* is the word French uses for the transuranium elements and pairs with the sheet's "had to be made". |
| radiocarbon dating | **datation au carbone 14** | French writes the isotope as *carbone 14*, with a space and no hyphen, which is why the sheet's prose does too while the formula stays `C-14`. |
| optically stimulated luminescence (OSL) | **luminescence stimulée optiquement (OSL)** | The established French term; the abbreviation is the English one and stays Latin. **Rated low** — a specialist archaeological dating method, rare in French school material. |

## Formulae, equations and naming

| English | French (use this) | Why this one, and what we rejected |
|---|---|---|
| chemical formula | **formule chimique** | — |
| formula of an ionic compound | **formule statistique** | French makes the same distinction German does with *Verhältnisformel*: the formula of an ionic solid is a ratio, not a molecule, and *formule statistique* says so. The `chemical-formulas` sheet is titled with it. **Rated medium** — some textbooks simply say *la formule du composé ionique*. |
| molecular formula | **formule brute** | *Formule moléculaire* is understood, but *formule brute* is the term French schools actually teach, in contrast with *formule développée*. |
| subscript (the small number in a formula) | **indice** | The English "subscript"/"coefficient" contrast becomes **indice**/**coefficient** in French, which is exactly the distinction the balancing topic turns on. **This is why "hint" is not translated as *indice* — see the UI table.** |
| coefficient (stoichiometric) | **coefficient** / **coefficient stœchiométrique** | Note that *coefficient* is spelled identically in English and French, so it is allowlisted in `game-messages.test.ts` as identical-by-design rather than looking like an untranslated string. French programmes since 2019 say *nombre stœchiométrique*; *coefficient* was picked because it is what students and teachers still say out loud and it keeps the *indice / coefficient* pair audible. |
| to balance an equation | **équilibrer une équation** | The brief's term, and the one students use. **Rejected: *ajuster une équation***, which is what the current French programme prints and what some textbooks therefore teach. *Équilibrer* was picked because the game shows a balance beam, because it pairs with *équation équilibrée*, and because it is overwhelmingly the spoken form. **Worth a teacher's eye**: if the audience's textbook says *ajuster*, this is a one-word change across the balancer. |
| balanced equation | **équation équilibrée** | — |
| conservation of mass | **conservation de la masse** | — |
| reactants | **réactifs** | *Réactif* also means "a reagent on the shelf", but the ambiguity exists in French chemistry itself and the arrow makes it unambiguous here. |
| products | **produits** | — |
| reaction arrow | **flèche de réaction** | — |
| atom ledger (the per-element tally) | **bilan des atomes** | The game's own name for the table under the arrow. *Bilan* is exactly right — French says *le bilan de la réaction* — and it pairs with *équilibrer*. |
| lowest terms | **forme la plus simple** | — |
| word equation | **équation en toutes lettres** | Used in the Défi level. Not *équation-bilan*, which in French names the symbolic equation, not the written-out one — using it here would say the opposite of what is meant. |
| state symbol | **symbole d’état** | — |
| synthesis | **synthèse** | — |
| decomposition | **décomposition** | — |
| combustion | **combustion** | — |
| single / double displacement | **déplacement simple / double déplacement** | Also taught: *simple échange / double échange*. Picked the *déplacement* pair because the general forms A + BC → AC + B read as one thing taking another's place, and because *échange* is easy to confuse with the double case. **Rated medium.** |
| precipitation reaction | **réaction de précipitation** | — |
| oxidation / reduction | **oxydation / réduction** | Note the **y**: *oxydation*, *oxydant*, but *oxygène* and *oxyde*. |
| oxidising agent | **oxydant** | — |

## The mole and stoichiometry

| English | French (use this) | Why this one, and what we rejected |
|---|---|---|
| amount of substance (n) | **quantité de matière** | — |
| mole | **mole** | Feminine: *une mole*, *0,5 mol*. |
| Avogadro's number | **constante d’Avogadro** | French says *constante*, not *nombre*, the same shift German makes. |
| relative atomic mass | **masse atomique relative** | — |
| molar mass (M) | **masse molaire** | — |
| concentration | **concentration** | — |
| limiting reagent | **réactif limitant** | Unambiguous and standard; reuses *réactif*, already fixed above. |
| in excess | **en excès** | — |
| theoretical / actual yield | **quantité théorique / quantité obtenue** | **A real structural difference.** English "yield" is both a *mass* ("the theoretical yield is 72 g") and a *ratio* ("percentage yield"). French *rendement* is only the ratio — *« le rendement théorique est de 72 g »* is wrong French. So the two masses are *quantité théorique* and *quantité obtenue*, and *rendement* is reserved for the percentage. The stoichiometry sheet is written that way. |
| percentage yield | **rendement** | *Rendement (en %) = quantité obtenue ÷ quantité théorique × 100.* |

## Organic chemistry

| English | French (use this) | Why this one, and what we rejected |
|---|---|---|
| functional group | **groupe caractéristique** | The term the French lycée programme uses. *Groupe fonctionnel* is a correct calque, is widely understood and appears in university French — but a French student meets *groupe caractéristique* in class, and the sheet is titled with it. |
| homologous series | **famille** (série homologue) | French says *la famille des alcools*. *Série homologue* is glossed once where the sheet defines the idea. |
| hydrocarbon | **hydrocarbure** | — |
| alkane / alkene / alkyne | **alcane / alcène / alcyne** | Note the **c**: *alcane*, not "alkane". |
| haloalkane | **halogénoalcane** | — |
| alcohol | **alcool** | — |
| aldehyde / ketone | **aldéhyde / cétone** | — |
| carboxylic acid | **acide carboxylique** | — |
| ester | **ester** | French names esters *anion first*: **éthanoate de méthyle**, where English says "methyl ethanoate" — the two languages put the halves in opposite order. This is a naming *rule*, not a word, and the organic sheet teaches the French order. |
| amine / amide | **amine / amide** | — |
| esterification | **estérification** | — |
| hydrolysis | **hydrolyse** | — |
| substituent | **substituant** | Note the **a**: *substituant*, not "substituent". |
| chain (carbon chain) | **chaîne / chaîne carbonée** | With the circumflex. |
| locant (position number) | **indice de position** / **numéro** | Prose uses *numéro* at this level. |

---

## Naming: what changes and what does not

| Kind of thing | Translated? | Notes |
|---|---|---|
| Chemical formula (H₂O, Ca(OH)₂, 2H₂ + O₂ → 2H₂O) | **No** | International notation. Structurally impossible to translate in this codebase: formulae are not in the translation overlays at all, and `cheat-sheets.test.ts` asserts they come through byte-identical. |
| Element symbol (Na, Cl, Fe) | **No** | — |
| State symbol ((s), (l), (g), (aq)) | **No** | Kept as the international abbreviations even though the French words differ (*solide*, *liquide*, *gazeux*, *aqueux*) — and note that French's own abbreviations would be the same four letters anyway. |
| Charge notation (2−, +) | **No** | — |
| Element **name** | **Yes** | **The trap is nitrogen: it is *azote*, not "nitrogène".** Others that do not transliterate: Tungsten → *tungstène*, Lead → *plomb*, Tin → *étain*, Mercury → *mercure*, Silver → *argent*, Iron → *fer*, Copper → *cuivre*, Gold → *or*, Sulfur → *soufre*, Potassium → *potassium* and Sodium → *sodium* (these last two are the *same* in French, unlike German's Kalium/Natrium — see the test note below). Full table in `src/i18n/chemistry-names/fr.ts`, verified symbol by symbol rather than pattern-matched. |
| Compound **name** | **Yes** | French composes them **anion first, then *de* + cation**: *hydroxyde de sodium*, *chlorure de calcium*, *sulfate de sodium*. This is the opposite order from German's single compound noun (*Natriumhydroxid*) and from English's two words in cation-first order. Binary acids take *-hydrique*: HCl → *acide chlorhydrique*, HF → *acide fluorhydrique*, HBr → *acide bromhydrique*, HI → *acide iodhydrique*. The *-ous / -ic* pair becomes *-eux / -ique*: HNO₂ *acide nitreux* vs HNO₃ *acide nitrique*; H₂SO₃ *acide sulfureux* vs H₂SO₄ *acide sulfurique*. |
| Ion **name** | **Yes** | French uses the systematic *hydrogéno-* prefix where the English data still uses the older *bi-*: bicarbonate → **hydrogénocarbonate**, bisulfate → **hydrogénosulfate**, bisulfite → **hydrogénosulfite**. Ethanoate/acetate: French says *éthanoate* (systematic) and *acétate* (common), and the table gives both the way the English does. |
| Molecule names of the elements | **Yes, and French insists** | French distinguishes the *element* from the *simple substance*: H is *hydrogène* but H₂ is **dihydrogène**; O₂ is **dioxygène**, N₂ **diazote**, Cl₂ **dichlore**, O₃ **ozone**. This is taught explicitly from 3ᵉ and a French reader notices its absence. The elements table (`ELEMENT_NAMES_FR`) holds the element names; `SPECIES_NAMES_FR` and `LEWIS_MOLECULE_TEXT_FR` hold the *di-* forms, which is exactly where each is needed. |
| IUPAC affixes being *discussed as affixes* (-ate/-ite, hypo-/per-, -ol/-al/-one) | **Partly** | Where the sentence is teaching the naming system, the French affixes are used (*-ate*/*-ite*, *hypo-*/*per-*, *-ol*/*-al*/*-one* — several of which happen to coincide with the English). Where a table is showing the English source affix, it is replaced by the French pattern rather than glossed, because the user chose adaptation over bilingual presentation. Flagged for review — see `fr-review.md`. |
| Spelling convention | — | French IUPAC spellings: **césium** (not caesium), **soufre**, **azote**, **étain**, **plomb**, **iode**, **cobalt**, **bismuth**, **silicium**, **zirconium**, **tungstène**, **aluminium**, **niobium**, **molybdène**. |

### A note for whoever touches `chemistry-names.test.ts`

Two of its assertions were written against German and are not true of French.
Both were widened rather than weakened; the reasoning is recorded here because
the next locale will hit the same wall.

- **`mustDiffer`** listed `Na: 'Sodium'` and `K: 'Potassium'` as false friends
  that any real translation must change. That is right for German
  (*Natrium*, *Kalium*) and **wrong for French**, which calls them *sodium* and
  *potassium* — the same words as English. The list is now per locale: French
  keeps the twelve that do differ (`N` *azote*, `O` *oxygène*, `C` *carbone*,
  `H` *hydrogène*, `Fe` *fer*, `Cu` *cuivre*, `Pb` *plomb*, `W` *tungstène*,
  `Hg` *mercure*, `Ag` *argent*, `Sn` *étain*, `S` *soufre*) and exempts the two
  that do not.
- **"no compound name is identical to the English"** holds for 34 of the 35
  compounds. The exception is **N₂H₄, *hydrazine***, which is the same word in
  both languages. It is now an explicit, documented exemption for `fr`, in the
  same spirit as `IDENTICAL_BY_DESIGN` in `dictionary.test.ts`, so the check
  still runs on the other 34.

---

## Product and UI vocabulary

Not chemistry, but it needs to be consistent too.

| English | French | Note |
|---|---|---|
| ChemGames | **ChemGames** | Brand; never translated. |
| cheat sheet | **antisèche** | The natural French school word and the right register for teenagers — the exact counterpart of the German *Spickzettel* that Phase 1 chose, and of the English "cheat sheet" itself. Feminine: *une antisèche*, *les antisèches*. **Rated medium**: it does carry the cheating connotation the English does, and a teacher may prefer **fiche mémo** or **fiche de révision**, which are the safe alternatives. Deliberately not *aide-mémoire*, which is the register of a reference manual. |
| game | **jeu** | — |
| level | **niveau** | French gaming says *niveau*; no loanword is needed, unlike German's *Level*. |
| score / points | **points**, **score** | *Score final* for "final score". |
| high score | **meilleur score** | Not *high score*: French does not keep this one the way German keeps *Highscore*. |
| leaderboard | **classement** | — |
| rank | **rang** | — |
| hint | **astuce** | **This is the collision the glossary exists to catch.** The obvious translation of "hint" is *indice* — and *indice* is already fixed above as the French for **subscript**, in the one game whose whole teaching point is *indice* vs *coefficient*. A balancer that says *« Indice 1 sur 3 »* above a glossary chip defining *« l’indice est le petit chiffre dans une formule »* is actively confusing. *Astuce* is short (six characters, so it survives the small header badge), informal, and common in French apps and school books. **Rejected: *indice*** (collides), ***coup de pouce*** (warmer and arguably the best register, but thirteen characters — too long for the hint badge and for *Lab Hint*), ***conseil*** (too much like advice from a teacher). |
| lives | **vies** | — |
| wave (of enemies) | **vague** | — |
| Game Over | **Partie terminée** | Keeping the English is common in games, but French is clearer for this audience and *partie* is the right word for one run. |
| pause / resume | **pause / reprendre** | — |
| instructions | **Comment jouer** | Used both as the footer button and as the head of the instructions titles (*Comment jouer : Casse-Formules*), so the two cannot drift apart. *Règles du jeu* was the alternative; *Comment jouer* matches the English's task framing. |
| coach (the in-game hint panel) | **Coach** | An established French loanword, and it has to stay distinct from *astuce*, which is the hint ladder. Identical to the English, so it is allowlisted. |
| support mode | **mode assistance** | Transparent, and *assistance* matches the *Assistance* heading in the settings panel. |
| marking sheet | **feuille de correction** | — |
| lab notebook | **cahier de labo** | *Labo* rather than *laboratoire* throughout: it is what a French student says, and it keeps the strings short. |
| challenge (the bonus level) | **Défi** | Kept in French, unlike German's *Challenge*: French has a short, natural word and does not reach for the English one here. |
| settings | **Paramètres** | — |
| year level | **niveau scolaire**; labels **5ᵉ, 4ᵉ, 3ᵉ, 2ᵈᵉ, 1ʳᵉ–Terminale** | The stored value stays `Year 9`; only the label is French. The mapping is by age: Year 7 ≈ 5ᵉ, Year 8 ≈ 4ᵉ, Year 9 ≈ 3ᵉ, Year 10 ≈ 2ᵈᵉ, Senior ≈ 1ʳᵉ and Terminale. Note that the site's own audience (Year 9–10) therefore straddles **3ᵉ / 2ᵈᵉ**, the collège–lycée boundary — which is why the SEO keywords say *chimie 3e* and *chimie seconde* and **not** *chimie lycée*, the French equivalent of the "Chemie Oberstufe" mistake Phase 1 had to correct. |
| teacher | **enseignant**, plural **enseignants** | — |
| student | **élève** | Epicene in French, so *les élèves* needs no gender work at all — the problem German fought with (*Schülerinnen und Schüler*) simply does not arise. |
| scientist | **scientifique** | Also epicene. |

---

## Game titles

Titles are translated, not transliterated, and every one of them is **rated
low**: these are product-naming calls for the owner, not translation calls. The
rejected candidates are kept as comments above each chosen line in
`src/i18n/dictionaries/fr.ts`, so the reasoning travels with the code.

| Key | English | French (chosen) | Runner-up | Why |
|---|---|---|---|---|
| `acidTitle` | Acid or Base? | **Acide ou base ?** | *Acide, base ou neutre ?* | The direct question works as a title in French exactly as it does in English, and it is what the game asks. The runner-up is more accurate to the four-way sort and too long for the card. |
| `blasterTitle` | Formula Blaster | **Éclate-Formules** | *Casse-Formules* | *Éclater* is what French says bubbles do, and *verbe + nom* (*trouble-fête*, *brise-glace*) is a productive French way to build a product name. The runner-up echoes *casse-brique*, the French name for the Breakout genre, which is a strong arcade signal but names the wrong mechanic. **Rejected: *Formule Blaster*** — a calque in which "Blaster" reads as English filler; **and *Chasse aux formules*** — clear, but it sounds like a worksheet. |
| `neutraliseTitle` | Neutralise! | **Neutralise !** | *Riposte ionique* | Mirrors the English's deliberate imperative, and French imperatives do work as titles. GAMES.md warns that an imperative can read as an instruction rather than a name — that is the risk to check. The runner-up reads more like a product but says "ions" without saying "neutralisation". **Rejected: *Neutralisation*** — a textbook chapter heading. |
| `balancerTitle` | Reaction Balancer | **La balance des atomes** | *Équilibre la réaction* | Names the beam the game actually puts on screen, says the chemistry, and reads as a title. **Rejected: *Équilibreur de réactions*** — *équilibreur* is a machine in French (a wheel balancer), which is precisely the "sounds like a machine for sorting chemicals" trap GAMES.md names; **and *Réaction-Balancer*** — a calque with German-style compounding imposed on French. The runner-up was dropped only because the hub would then have two imperative titles. |
| `lewisTitle` | Share to Fill | **Partage et complète** | *Chacun son doublet* | GAMES.md asks for "a phrase that names the rule in that language". Two short imperatives, natural French, and a 14-year-old reads it instantly. The runner-up plays on *chacun son tour* and is more charming, but it assumes *doublet* is already known — and the game is where you learn it. **Rejected: *Partage pour remplir*** — a calque whose purpose clause is clumsy in French; **and *Deux par deux*** — memorable, but it loses the filling half of the rule. |
| `bondsTitle` | Chemical Bonds | **Liaisons chimiques** | *Les liaisons* | A topic name rather than a coinage, so the direct translation is the right answer. Still rated low with the rest. |

The open question the German review raised — *should game titles be translated
at all, or kept as English product names?* — is unchanged and is answered per
game in the brief, not silently per locale.

---

## Explore : molécule et scientifique de la semaine

Decided for `src/lib/explore/` and used in `src/i18n/explore/fr.ts`. Each term
is used identically in every entry that needs it.

| English | French | Note |
|---|---|---|
| quasicrystal | **quasi-cristal** (pl. *quasi-cristaux*) | Hyphenated, as French crystallography and the Nobel coverage write it. *quasicristal* also circulates; flagged `low–medium`. |
| diffraction pattern | **figure de diffraction** | The school and physics term. *Cliché de diffraction* is the photograph, not the pattern. |
| liquid crystal | **cristal liquide** | Everyone knows it from screens. |
| isotactic | **isotactique** | The IUPAC French term. |
| monolayer | **monocouche** | Used where the English says "a single layer". |
| peroxide bridge / endoperoxide | **pont peroxyde** | *Peroxyde* is already fixed in `cheat-sheets/fr.ts`; *pont* is what French says for this bridge. *Endoperoxyde* is pharmacology register and above this reading age. |
| chirality / mirror-image forms | **chiral**; **formes images l'une de l'autre dans un miroir** | Deliberately **not** *énantiomères*, which is terminale register — the English avoids "enantiomer" too. Identical wording in `limonene` and `vladimir-prelog`. |
| R/S nomenclature | **le système R et S**; **les règles de Cahn–Ingold–Prelog** | R and S are notation and stay as letters. |
| catalytic hydrogenation | **hydrogénation catalytique** | — |
| processivity | *(described: « ne lâche pas la matrice »)* | Term is *processivité*; the English describes rather than names it. |
| strand displacement | *(described: « écarter le brin d'en face »)* | Term is *déplacement de brin*, which is above this reading age. |
| polyatomic vs complex ion | **ion polyatomique** (already above) vs **ion complexe** | `alfred-werner` turns on the contrast: complexes are *une famille d'ions polyatomiques*. |
| latent heat of fusion | *(described: « la fusion absorbe de l'énergie sans que la température monte »)* | Term is *chaleur latente de fusion* if a future entry needs it. |
| incongruent melting | **« il ne fond pas proprement »** | Matches the English's own plain phrasing. Term is *fusion non congruente*. |
| phase-change material | **matériau à changement de phase** | Decided; not used, because the English never names it either. |
| umami | **umami** | Kept, and it does extra work: French has no everyday word for *savoury*, so "savoury rather than salty" becomes **« umami plutôt que salé »**. An adaptation, not a translation. |
| aramid | **aramide** | Recorded; does not occur in the current source. |
| rocket oxidiser | **comburant** | Pairs with *combustible*, which French teaches in combustion. |
| heat of formation | **enthalpie de formation** | Correct, and lycée-terminale vocabulary in a text written for ~12. Flagged `low`; *chaleur de formation* is the gentler alternative. |
| oxidation state | **nombre d'oxydation** | Fixed here so it cannot drift to *degré d'oxydation*. |
| weight for weight | **à masse égale** | Recurs in `kevlar` and `stephanie-kwolek`. |
| Kevlar | **Kevlar** | A registered trade mark, identical to the English and allowlisted in `src/i18n/explore.test.ts`. Never glossed to dodge the gate. |
