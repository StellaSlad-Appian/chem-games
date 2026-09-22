# Spanish chemistry glossary

The agreed Spanish term for every chemistry concept that appears on the site. It
exists so the same idea is not called two different things on two different
pages, and so whoever writes the next Spanish string does not have to re-decide.

**If you are adding or editing Spanish copy, use the term in the middle column.**
Where Spanish school practice accepts more than one word, the "Why this one"
column says which we picked and why; the rejected alternative is not wrong, it
is just not ours.

Scope: Spanish for a Year 9–10 audience — **3º / 4º de ESO**, the last two years
of compulsory secondary in Spain — following the vocabulary of Spanish school
textbooks rather than university Spanish.

---

## ⚠ The variety decision: this is **es-ES** (peninsular Spanish)

**Read this before anything else, and decide whether you agree.** It is the one
choice on this page that a reader will notice on every screen, and it is the one
the owner has to make rather than the translator.

Spanish is shipped under the plain tag `es`, but there is no such thing as plain
Spanish copy — every sentence commits to a variety somewhere. This translation
is written in **es-ES**, per the brief's default. The Latin American alternative
(`es-419`) was considered and not chosen, for these reasons:

- **`es-419` is not one variety.** It is a CLDR umbrella over twenty countries
  that disagree with each other as much as they disagree with Spain. The decimal
  separator alone splits it: Mexico, Colombia, Peru and Central America use a
  point; Argentina, Chile, Uruguay, Paraguay and Venezuela use a comma. Choosing
  "Latin American" would still mean choosing *which* Latin American.
- **The `tú` decision removes the biggest split before it starts.** The whole
  site addresses one reader in the singular, so `vosotros` vs `ustedes` — the
  difference people name first — never arises. Not one string in the dictionary
  or either catalogue is in the second-person plural.
- **The core chemistry vocabulary is pan-Hispanic.** *Enlace covalente*,
  *estructura de Lewis*, *par solitario*, *ácido clorhídrico*, *hidróxido de
  sodio*, *coeficiente*, *subíndice* are the same everywhere. The divergence is
  smaller than the phrase "Spain vs Latin America" suggests.

**But the audience is genuinely split**, and roughly nine Spanish speakers in
ten are not in Spain. So: this is flagged for the owner, and the cost of
reversing it is bounded, because the words that would actually change are listed
here rather than scattered:

| Concept | es-ES (shipped) | es-419 | Where it appears |
|---|---|---|---|
| to balance an equation | **ajustar** | *balancear* | Reaction Balancer, throughout — the single most visible marker |
| cheat sheet | **chuleta** | *acordeón* (MX), *torpedo* (CL), *machete* (AR) | nav, the whole cheat-sheet section, `meta.cheatSheetTitle` |
| a solution | **disolución** | *solución* | cheat sheets, reaction descriptions |
| proton donor | **dador de protones** | *donador de protones* | `acids-and-bases` |
| decimal separator | **coma** (6,02 × 10²³) | point in about half of it | cheat-sheet worked examples |
| to press a button | **pulsa** | *presiona* / *oprime* | instructions, every game |
| zinc | **cinc** | *zinc* | the element table |
| iodine | **yodo** | *yodo* (same) | — |

Everything else was deliberately written in wording both sides accept. Where a
Spain-only turn of phrase was available and a neutral one was equally good, the
neutral one was taken: *toca* rather than *pincha* for a touch target, *vale* and
*guay* avoided entirely, *ir a por* avoided, and **`coger` never appears
anywhere on the site** — it is an ordinary verb in Spain and obscene in much of
Latin America, and a chemistry game for fourteen-year-olds is not the place to
find out.

**If the owner prefers es-419**, the change is the eight rows above plus a pass
over the cheat sheets' decimal commas. That is a day, not a rewrite. If the owner
wants *both*, that is a second locale (`es-419`) and a second set of files, not a
setting.

---

## Register and typography

| Rule | Decision |
|---|---|
| Address | Informal **tú** throughout. **Decided by the owner on 2026-09-19; no longer provisional.** Unlike the French decision this one is not contentious: Spanish school material addresses students as *tú* as a matter of course, and *usted* would read as a bank letter. All imperatives are the *tú* form: *arrastra*, *pulsa*, *toca*, *elige*, *cuenta*, *mira*. |
| Opening `¿` and `¡` | **Mandatory, always.** A question or exclamation that opens without one is a spelling error in Spanish, not a style choice. This includes questions inside a longer sentence: *Ya está ajustada, ¿verdad?* |
| Quotation marks | **« … »** (comillas latinas), which is the RAE's first choice, and **without** the inner spaces French requires. Nested quotes use “ … ”. |
| Space before `: ; ! ?` | **None.** Spanish punctuates like English here, not like French. This is why `cheatSheets.exampleLabel` (`{name}:`) is identical to the English and is allowlisted — the key exists only because French needed a no-break space. |
| Dash | **–** (en dash) for parenthetical dashes, matching the house style already set for German and French. Spanish typography proper would use the raya (**—**); the house style wins so the three locales look like one site. Noted as a deliberate deviation. |
| Ellipsis | **…** as a single character. |
| Apostrophe | Spanish does not use one. Nothing to escape inside single-quoted TypeScript strings, which is a small mercy after French. |
| Decimals | **Comma**: 6,02 × 10²³, not 6.02. (Prose only; code and formulae keep their own notation.) |
| Thousands | A no-break space, per the RAE since 2010: 1 000. Never `1,000` and never `1.000`. |
| Accents on capitals | **Kept**: *Á*, *É*, *Ó*, *Ñ*. *Acidos* is a spelling mistake; *Ácidos* is not. |
| Ordinals | *3º*, *4º* with the masculine ordinal indicator (U+00BA), which is one character and does not need a superscript font — the same reasoning that made French write *3e* rather than *3ᵉ*. |
| Nouns | Lower case inside a sentence — which is why `LOWERCASES_NAMES_IN_SENTENCE` is `true` for `es` (see below). |
| Gender | **The hardest register problem in Spanish, and worse than in French.** No *-e*, *-x* or *@* forms, matching the German and French decisions to avoid nonstandard spellings. Instead: epicene nouns where Spanish has them (**estudiante**, **miembro**, **persona**), collective nouns where it does not (**el alumnado**, **el profesorado**), and sentences rewritten to avoid a predicate adjective that would have to agree with the reader. See the note below — it shaped a dozen strings. |

### Adjectives that agree with the reader

This has no counterpart in English or German and is sharper in Spanish than in
French, because Spanish agreement is audible in almost every adjective.

A sentence like *"Ready for your first result?"* has no gender-neutral Spanish
translation that keeps the adjective: *¿Listo?* addresses a boy, *¿Lista?* a
girl, and *¿Listo/a?* is not something you print in a game. The same trap catches
*Stuck?*, *Welcome back*, *you are signed in* and *Are you sure?*.

Every such string was **rewritten rather than translated**, so that no adjective
ever has to agree with the reader:

| English | Not this | This |
|---|---|---|
| Ready for your first result? | *¿Listo para tu primer resultado?* | **Tu primer resultado te espera.** |
| Welcome back | *Bienvenido de nuevo* | **¡Hola de nuevo!** |
| Stuck? | *¿Atascado?* | **¿No sabes por dónde seguir?** |
| You need to be signed in | *Tienes que estar conectado* | **Tienes que iniciar sesión** |
| if you are signed in | *si estás conectado* | **si has iniciado sesión** |

Worth knowing because it is invisible in review: each of these reads as an
ordinary sentence, and only the English beside it shows that something was
avoided. If a new string is added, check it the same way — *does any adjective
here describe the reader?*

### `LOWERCASES_NAMES_IN_SENTENCE` is `true` for Spanish

Spanish capitalises only proper nouns, so a chemical name inside a sentence is
lower case: *«dos moléculas de agua»*, not *«dos moléculas de Agua»*. The map in
`src/i18n/chemistry-names.ts` is therefore `true` for `es`, the same as English
and French and the opposite of German.

Checked against every call site before setting it, the way the French pass was:
`nameInSentence()` is applied only to **element names** in the Reaction Balancer
catalogue and to **element and molecule names** in the Share to Fill catalogue.
Neither set contains a Roman numeral, so the naive `.toLowerCase()` cannot turn
*hierro(III)* into *hierro(iii)*. Species names that do carry one (*nitrato de
cobre(II)*) reach the screen through `speciesName()`, which does not lowercase.
If a future change routes a species name through `nameInSentence()`, that is the
thing to re-check.

### The article problem, and the device that solves it

Spanish has the same structural problem French has, plus two of its own.

A placeholder holding a chemical name cannot be preceded by an article, because
Spanish picks the article from the name's gender: *el oxígeno* but *la glucosa*,
*el metano* but *la sal*. A template like *"{atom} todavía tiene 2 impares"* has
no grammatical Spanish rendering — without an article it is wrong, and with one
it is wrong for a good fraction of the substitutions.

Two things make it worse than in French:

- **Contractions.** *de + el = del* and *a + el = al* are obligatory, so even
  *"de {name}"* is unsafe: *de el oxígeno* must be *del oxígeno*. A template
  cannot know.
- **There is no safe pronoun, and no safe gender rule.** French could say *il*
  about any element, because every French element name is masculine. Spanish
  cannot: **silver is *la plata***. And even knowing the gender is not enough,
  because a feminine noun beginning with a stressed *a-* takes *el* in the
  singular (*el agua*, *el área*) — so *la agua* is wrong and *el agua* is
  feminine.

**The device: put the name in a label position, not in a noun-phrase position.**
Three shapes, used consistently across both catalogues — the same three French
invented, with the third adjusted:

| Shape | Example | Where it is used |
|---|---|---|
| Name, then a colon | `{atom}: quedan {count} impares.` | coach lines, a11y labels, live-region announcements |
| A generic noun, then a colon, then the name | `Esta sustancia no participa en la reacción: {name}.` | Reto errors, wrong-pick feedback |
| *el elemento* before the name | `¿Qué compuesto con el elemento {elementInSentence} podrías cambiar?` | Reaction Balancer coach and hints, where the name is always an element |

*el elemento {x}* works for **every** element without exception — including
*plata* — because the article agrees with *elemento*, which is masculine, and the
name sits in apposition after it. That is why this shape is safe in Spanish even
though the French justification for it (every element name is masculine) is not.
For the same reason the templates never use *él* or *ella*: there is no pronoun
that is safe for every substitution.

Two smaller consequences:

- Spanish, like French, drops the article in *«el enlace entre carbono y
  oxígeno»*, so `entre {atom1} y {atom2}` is idiomatic and is used as-is.
- *0* takes the plural in Spanish (*0 impares*), which is the opposite of French,
  and `Intl.PluralRules` already knows it: `select(0)` returns `other` for `es`.
  Nothing special is needed. Spanish also has a CLDR `many` category, but only
  for exact millions, so every plural record supplies `one` and `other` and lets
  `selectPlural()` fall back.

### Glossary match words: Spanish gets off lightly

The tap-to-explain matcher in `GlossaryTerm.tsx` finds a term with a JavaScript
`\b`, which only knows ASCII letters, so **a match word must begin and end with
an ASCII letter**. This bit French hard, because so many French chemistry phrases
begin with *électron* and *é* is not an ASCII letter — French had to move the
chip onto a later word (*externes*, *valence*, *célibataires*) instead of the
whole phrase.

**Spanish does not have that problem, and the reason is worth writing down:
Spanish's accent is medial, not initial.** *electrón* begins with `e` and ends
with `n`; the *ó* is inside, where `\b` never looks. The plural *electrones* has
no accent at all. So Spanish can use the full phrases as match words where French
could not:

- `electrones externos`, `electrón externo`, `electrones de valencia` ✓
- `electrón desapareado`, `electrones desapareados` ✓
- `par solitario`, `pares solitarios` ✓
- `subíndice`, `subíndices` ✓ (begins `s`, ends `e`; the `í` is medial)
- `impar`, `impares` ✓ (no accent at all)

`src/i18n/game-messages.test.ts` asserts this for every match word in every game
catalogue, so a term that could never open its pop-over fails the suite rather
than failing silently on screen.

**One near-miss to know about.** `/\bíndice\b/` *would* match inside
*subíndice*, because `b` is an ASCII word character and `í` is not, so `\b`
finds a boundary between them. It never bites us, because *índice* could not be
a match word anyway — it begins with a non-ASCII letter. But if anyone ever
"fixes" the matcher to be Unicode-aware, that is the pair to re-test.

---

## Core chemistry terms

| English | Spanish (use this) | Why this one, and what we rejected |
|---|---|---|
| acid | **ácido** | — |
| base | **base** | Spelled exactly as the English, so it is allowlisted as identical-by-design. |
| basic / alkaline | **básico / alcalino** | Both are taught; *básico* is primary. |
| neutral | **neutro** | Note this is *neutro*, not "neutral" — Spanish differs from the English here where it does not differ for *base*. The opposite split from German. |
| amphoteric | **anfótero** | — |
| pH | **pH** | Spanish says *el pH* and never expands it. |
| indicator | **indicador** | *Indicador universal* where the sheet means that one. Spanish has none of the ambiguity that made French insist on *indicateur coloré*. |
| neutralisation | **neutralización** | — |
| proton donor / acceptor | **dador / aceptor de protones** | The Brønsted–Lowry pair as Spanish textbooks write it. *Donador de protones* is the Latin American form and is equally correct — one of the es-ES markers listed above. |
| hydronium ion (H₃O⁺) | **ion hidronio** | **Spanish lands the other way from French here, and deliberately.** French chose *ion oxonium* because the lycée programme prints it. Spanish secondary textbooks overwhelmingly print **hidronio**; *ion oxonio* is the IUPAC form and is what a university text uses. Picked the school word for a school audience. **Rated medium** — it recurs through the acids sheet, so a teacher should confirm it against their textbook. |
| strong / weak acid | **ácido fuerte / ácido débil** | — |
| concentrated / dilute | **concentrado / diluido** | — |
| salt | **sal** | — |
| ion | **ion** | Without an accent. The RAE now prints *ion* (a monosyllable); *ión* is the older spelling and still widespread. Consistency matters more than either choice here, so: *ion*, everywhere, including *catión* and *anión*, which **do** carry their accent because they are stressed on the last syllable. |

## Substances and structure

| English | Spanish (use this) | Why this one, and what we rejected |
|---|---|---|
| compound | **compuesto** | — |
| molecule | **molécula** | — |
| element | **elemento** | — |
| atom | **átomo** | — |
| cation / anion | **catión / anión** | — |
| polyatomic ion | **ion poliatómico** | — |
| state of matter | **estado de la materia** | *Estado de agregación* is the more precise term and is taught; *estado de la materia* is what the sheet is about and what a Year 9 reader meets first. |
| solid / liquid / gas | **sólido / líquido / gas** (adj. *gaseoso*) | — |
| aqueous | **acuoso** / "en disolución acuosa" | *Disolución*, not *solución* — an es-ES marker. Latin America says *solución*. |
| precipitate | **precipitado** | — |
| lattice | **red** (red iónica, red metálica, red covalente) | *Cristal* names the object; *red* names the arrangement, which is what the properties follow from. Same reasoning as French's *réseau*. |
| covalent bond | **enlace covalente** | Like French and unlike German, there is no decision to make: Spanish school chemistry says *enlace covalente* and nothing else. |
| ionic bond | **enlace iónico** | — |
| metallic bond | **enlace metálico** | — |
| valence electrons (formal) | **electrones de valencia** | The formal term, used on the cheat sheets. |
| outer electron (running text) | **electrón externo** | The transparent word, used in the game's running text, with *electrón de valencia* glossed beside it — the same two-tier split English makes with "outer (valence) electron". *Electrón de la capa externa* is the fully explicit form and is too long to repeat. |
| lone pair | **par solitario** | The Spanish school term, and short enough to survive the counted noun phrases (*2 pares solitarios*) and a notebook column heading. The formal alternative **par no enlazante** is genuinely used and is glossed once, where the Lewis sheet defines the idea; it is not used as a second name for the same thing in running text. **This entry is load-bearing: it is why *solitario* cannot be the game's word for a single unpaired electron — see the long note below.** |
| bonding pair / shared pair | **par enlazante** | Share to Fill says "shared pair" where a textbook says "bonding pair"; both are *par enlazante*. **Rejected: *par compartido***, which is the transparent rendering and was tempting — but the game's own verb is *compartir* ("Comparte y completa"), so *«comparte un par compartido»* is tautological in a way *«comparte un par enlazante»* is not. Do not introduce a second word (*par de enlace*, *par compartido*) for the same thing. |
| unpaired electron (formal term) | **electrón desapareado** | The Spanish textbook term — the one used when teaching radicals. Use it in the glossary, on the cheat sheets and anywhere the text is explaining rather than instructing. |
| ~~the game's "loner" (game word)~~ | **dropped 2026-09-19 — use *electrón desapareado*** | The game used to give this concept two names: the textbook term above and an invented game word, *impar*, with *impar* (the same word) as the short label on a pulsing dot. **That scheme was abolished on 2026-09-19.** There is now one term per language and it is the formal one, used in the hub line, every coach line, every hint, the glossary and the canvas legend. The reasoning that produced *impar* is kept in the section below so that nobody re-proposes it, and the collision warnings in that section are still true — they bind any *new* wording chosen near this term, not just the nickname they originally decided. The width argument that forced the short dot label is also retired: *electrón desapareado* renders 126 px at `text-[9px]` uppercase against the ~44 px a per-dot label had, but the label is no longer printed beside every dot — it is printed once, in a legend above the board, where length does not matter. |
| the Level 1 canvas legend | **electrón desapareado** | The same formal term, naming the pulsing dot once beside a sample of it, above the board. Present at Level 1 and off from Level 2. |
| octet (eight outer electrons) | **octeto** | *La regla del octeto* is standard from 3º ESO. |
| duet (hydrogen's two) | **dueto** | **Spanish is between French and German here.** French already had *la règle du duet* in its national programme and could rate it high; German had nothing and had to coin *Duett*. Spanish has *la regla del dueto* in circulation — it appears in Spanish-language textbooks, especially Latin American ones — but it is not as settled as the octet rule, and plenty of Spanish teachers simply say hydrogen is full at two. **Rated medium.** The alternative is *la regla del dúo*. |
| single / double / triple bond | **enlace simple / enlace doble / enlace triple** | The adjective follows the noun, so these cannot be compounded the way German's *Doppelbindung* is; the match words are three two-word phrases. |
| bond-line drawing | **fórmula desarrollada** | The H–O–H line. *Fórmula semidesarrollada* is the one that hides the C–H bonds and is not what the game draws — the same distinction French makes. |
| Lewis structure | **estructura de Lewis** | The brief's term and the cheat-sheet title. *Diagrama de Lewis* and *notación de Lewis* are both in circulation; *estructura* is what a Spanish textbook prints. |
| octet rule | **regla del octeto** | — |
| formal charge | **carga formal** | — |
| electronegativity | **electronegatividad** | — |
| delocalised electrons | **electrones libres** | The literal *electrones deslocalizados* is correct and is upper-secondary register; *electrones libres* is the school phrasing for the "sea" in a metal. **And it is a second reason *libre* could not be the game's word for a loner** — *electrón libre* already means something else, and something a student meets on the bonding sheet. |

### The “loner”: Spanish's own two-tier pair, and the trap it had to avoid — historical, and why it is kept

> **This scheme was abolished on 2026-09-19.** The game no longer has a game
> word, a formal term and a dot label: it has ***electrón desapareado*** and nothing else,
> in the hub line, every coach line, every hint, the glossary and the canvas
> legend. Nothing below is current practice.
>
> It is kept for two reasons. First, so that the rejected candidates stay
> rejected — every one of them was ruled out for a stated reason, and a future
> pass that re-proposes one should have to answer that reason. Second, and more
> important, because **the collisions recorded below are facts about Spanish,
> not facts about the old nickname.** They bind any *new* wording chosen
> anywhere near this term, which is why they are repeated in the term table
> above rather than living only here.


English deliberately gives an unpaired outer electron two names — the formal
*unpaired electron* and the game's own *loner* — and teaches the pair, with the
game word fading out as a scaffold (Level 1 labels the dots, Level 2 does not).
German mirrored that split with *Einzelelektron*; French with *solitaire*.

**Spanish cannot use *solitario*, and the reason is not stylistic.** Spanish's
term for a **lone pair** is *par solitario*. A game whose entire teaching point
is the difference between *one* unpaired electron and *two* electrons that stay
together cannot call the first one *un solitario* and the second one *un par
solitario*. *«Quedan 2 solitarios»* and *«quedan 2 pares solitarios»* differ by
one word, mean opposite things, and appear in adjacent coach lines. Calquing the
French here would have shipped a genuine pedagogical bug.

| Role | English | German | French | **Spanish** |
|---|---|---|---|---|
| Formal term — glossary, cheat sheet, explaining | unpaired electron | ungepaartes Elektron | électron célibataire | **electrón desapareado** |
| Game word — hub, coach, hints | loner | Einzelelektron | solitaire | **impar** |
| Short label on a dot | loner | einzeln | seul | **impar** |

**Why *impar* as the game word.**

- It is **exactly the chemistry**. *Impar* means "not one of a pair". That is
  the definition of the thing, in one everyday word.
- **Spanish gives this game a root the other languages do not have.** The game
  is about making *pares*; what is left over is *impar*; the verb for doing it is
  *emparejar*. *«Empareja los impares para formar pares»* is the whole rule in
  five words, and a fourteen-year-old parses it without being taught anything.
  Neither *loner*, nor *Einzelelektron*, nor *solitaire* is morphologically
  related to the word for "pair".
- It **nominalises cleanly** — *un impar*, *los impares*, *quedan 2 impares* —
  which is what the coach lines need; they say the word three times a sentence.
- It is **five characters and entirely ASCII**, so it fits beside a pulsing dot
  and needs none of the match-word compromises French had to make.
- *Electrón impar* is **real usage**: Spanish texts on radicals use it.

**Why the dot label is the same word.** German shortened *Einzelelektron* to
*einzeln* and French shortened *solitaire* to *seul*, because in both languages
the game word is a noun that is too long for a canvas label and the adjective is
shorter. In Spanish the game word **is** the adjective — *electrón impar* →
*impar* — so there is nothing to shorten to. Inventing a third word here would
have added a distinction Spanish does not make. The label is *impar*, five
characters, and the noun it stands for is in the coach line and the glossary.

**What was rejected.**

- ***solitario***. The French answer, and the one a translator working from the
  French file would reach for. Rejected for the collision above: it is already
  Spanish for the *lone pair*.
- ***libre*** (*electrón libre*). Short and natural-sounding. Rejected hard:
  *electrón libre* is an established term for a delocalised electron in a metal,
  which the bonding cheat sheet teaches on the same site.
- ***suelto*** (*electrón suelto*). Genuinely used in Spanish popular science and
  pleasingly concrete — "loose, on its own". Rejected because the bare noun does
  not survive: *«los sueltos»* is Spanish for loose change, and the coach lines
  need the bare noun constantly.
- ***soltero***. The literal analogue of French's *célibataire*. Rejected because
  Spanish chemistry does not use it — where *célibataire* is the real French
  textbook term, *electrón soltero* would read as a joke about bachelors.
- ***desparejado***. The everyday word for "not part of a matching pair" (an odd
  sock), and the best of the rejected ideas — it is what French wanted from
  *dépareillé* and, unlike the French word, it does nominalise. Rejected on
  length: twelve characters is too long for a dot label and too heavy to repeat
  three times in a coach line. It survives as a gloss on the bonding sheet.
- ***desapareado*** as the game word. That is the formal term, and using it
  everywhere would collapse the two tiers the game is built on: the scaffold
  would stop being a scaffold.

**Rated low, both rows.** Not because they are inaccurate — the argument above
is strong and the collision argument is objective — but because this is register,
and register is what a native speaker decides. The specific risk: *impar* is also
the everyday word for an **odd number**, and a reader who meets it cold beside a
dot may hear "number 3" rather than "unpaired". The coach line and the glossary
chip both define it immediately, which is the mitigation, but it should be
checked with a real teenager. If it changes, the edit touches every line of Share
to Fill.

## Atomic structure, the periodic table and radioactivity

Added 2026-09-21, when *Atoms, Isotopes & the Periodic Table* split into
*Atoms & the Periodic Table* (Year 9) and *Isotopes & Radioactivity* (Year 10).
The first rows were already in use on the Spanish atomic-structure sheet and are
recorded here so the next writer does not re-decide them; the rest are new with
the split.

| English | Spanish (use this) | Why this one, and what we rejected |
|---|---|---|
| periodic table | **tabla periódica** | — |
| atomic number | **número atómico** | — |
| mass number | **número másico** | Not *número de masa*, which is the calque; *másico* is what a Spanish textbook prints. |
| energy level | **nivel de energía** | The sheet says *level*, not *shell*, deliberately. See the next row. |
| electron shell (the curriculum's word) | **capa electrónica** | VC2S10U07 says "electron shells", so the sheet names *capa* once as the word the reader's teacher uses, and keeps *nivel de energía* as its own term. |
| outer level / outer shell | **nivel exterior** / **última capa** | *Última capa* is what a Spanish classroom says; the sheet uses *nivel exterior* to stay consistent with *nivel de energía*. |
| Bohr model | **modelo de Bohr** | Named as a *model* every time, per the sheet's own contract. |
| isotope | **isótopo** | — |
| group (a column) | **grupo** | The sheet always writes *grupo 1*, *grupo 17*, never a bare *grupo*, because *grupo* also names a functional group. |
| period (a row) | **periodo** | Without the accent: the RAE lists *periodo* and *período* as equally valid, and current Spanish chemistry writing prefers the unaccented form. Not *fila*, which is the layout word. |
| metal | **metal** | — |
| non-metal | **no metal** | Two words, no hyphen. Plural *no metales*. |
| metalloid | **semimetal** | Spanish *metaloide* does mean the staircase elements — it is **not** the false friend that French *métalloïde* is — and both words are current. *Semimetal* is picked because it is transparent for a fourteen-year-old and cannot be confused with the French sense a bilingual reader may carry. **Rated medium.** Marked on the sheet as an extension in any case: the curriculum says only "metallic and non-metallic properties". |
| alkali metal | **metal alcalino** | — |
| halogen | **halógeno** | — |
| noble gas | **gas noble** | — |
| atomic size / atomic radius | **radio atómico** | *Tamaño del átomo* is the everyday phrase and is used once in running prose. |
| reactivity | **reactividad** | — |
| alkaline earth metal | **metal alcalinotérreo** | One word, no hyphen — the spelling Spanish textbooks and the RAE use. Added with the interactive periodic table, whose *Familias* mode names all ten families. |
| transition metal | **metal de transición** | — |
| lanthanide | **lantánido** | *Lantanoide* is the IUPAC form; Spanish school material writes *lantánido*, so that is what a reader will have been taught. **Rated medium.** |
| actinide | **actínido** | Same decision as *lantánido*. |
| picometre (pm) | **picómetro (pm)** | The word is Spanish, the unit symbol stays Latin — as every unit symbol does. |
| radioactive decay | **desintegración radiactiva** | **Note the spelling: *radiactivo*, not *radioactivo*.** Spanish drops the o, and the sheet must be consistent about it — this is the single easiest thing to get wrong in this whole table. |
| alpha particle | **partícula alfa** | Written out rather than as α, and *alfa* with an f. |
| beta particle | **partícula beta** | — |
| gamma radiation | **radiación gamma** | *Radiación*, not *rayo*: gamma is radiation, not a particle. |
| half-life | **periodo de semidesintegración** | The term Spanish textbooks use, and the one the sheet already used. *Semivida* is shorter and is also correct; it was rejected because the longer form says what it measures and the sheet has room. Note it collides with *periodo* (a row of the table) — the sheet never uses the bare word for either. |
| synthetic element / made element | **elemento artificial** | *Elemento sintético* is also correct; *artificial* is what Spanish uses for the transuranium elements. |
| radiocarbon dating | **datación por carbono-14** | Spanish writes the isotope with a hyphen, as the sheet already does for *cloro-35*. |
| optically stimulated luminescence (OSL) | **luminiscencia ópticamente estimulada (OSL)** | Note *luminiscencia*, with an i. The abbreviation is the English one and stays Latin. **Rated low** — a specialist archaeological dating method, rare in Spanish school material. |

## Formulae, equations and naming

| English | Spanish (use this) | Why this one, and what we rejected |
|---|---|---|
| chemical formula | **fórmula química** | — |
| formula of an ionic compound | **fórmula empírica** | Spanish makes the same point German does with *Verhältnisformel* and French with *formule statistique*: the formula of an ionic solid is a ratio, not a molecule. **Rated medium** — *unidad fórmula* is the more precise term and plenty of textbooks simply say *la fórmula del compuesto iónico*. |
| molecular formula | **fórmula molecular** | — |
| subscript (the small number in a formula) | **subíndice** | **This is where Spanish is in a better position than French, and the brief expected otherwise.** The handover warned that Spanish would repeat French's *indice* collision — the French word for "hint" is also the French word for "subscript". **It does not.** Spanish for a formula subscript is *subíndice*, not *índice*; and Spanish for a hint is *pista*, which is not *índice* either. The two words do not touch. See the UI table. |
| coefficient (stoichiometric) | **coeficiente** | The teaching contrast the whole balancing topic turns on is **coeficiente / subíndice**, and it is clean in Spanish. |
| to balance an equation | **ajustar** (una ecuación) | **The es-ES / es-419 marker, and the most visible one on the site.** Spain says *ajustar ecuaciones*; Latin America says *balancear*. Picked *ajustar* with the variety. **Note the knock-on: because *ajustar* is taken, the settings panel is *Opciones*, not *Ajustes*** — the usual Spanish word for app settings — so that the reader never meets *ajustes* meaning two different things on two screens. That is the kind of thing this file exists to catch. |
| balanced equation | **ecuación ajustada** | — |
| the balance beam the game draws | **la balanza** | A physical object, not the chemistry: *«la balanza está equilibrada»* describes the beam on screen. It is a different referent from *ajustar*, which is what you do to the equation, so the two do not compete. Stated explicitly here because *equilibrar* would otherwise look like a second verb for balancing. |
| conservation of mass | **conservación de la masa** | — |
| reactants | **reactivos** | *Reactivo* also means "a reagent on the shelf", exactly as French's *réactif* does, but the ambiguity exists in Spanish chemistry itself and the arrow makes it unambiguous here. |
| products | **productos** | — |
| reaction arrow | **flecha de reacción** | — |
| atom ledger (the per-element tally) | **recuento de átomos** | The game's own name for the table under the arrow. **Rejected: *balance de átomos***, which is the obvious rendering and would quietly reintroduce *balance*/*balancear* next to a deliberate *ajustar*. *Recuento* says what the table is — a tally — in an everyday word. **Rated medium.** |
| lowest terms | **forma más simple** | — |
| word equation | **ecuación en palabras** | Used in the Reto level. |
| state symbol | **símbolo de estado** | — |
| synthesis | **síntesis** | — |
| decomposition | **descomposición** | — |
| combustion | **combustión** | — |
| single / double displacement | **desplazamiento simple / doble desplazamiento** | Also taught: *sustitución simple / doble sustitución*. Picked the *desplazamiento* pair because A + BC → AC + B reads as one thing taking another's place. **Rated medium.** |
| precipitation reaction | **reacción de precipitación** | — |
| oxidation / reduction | **oxidación / reducción** | — |
| oxidising agent | **oxidante** | — |

## The mole and stoichiometry

| English | Spanish (use this) | Why this one, and what we rejected |
|---|---|---|
| amount of substance (n) | **cantidad de sustancia** | — |
| mole | **mol** | **Masculine**: *un mol*, *0,5 mol* — note this is the opposite of French's *une mole*. |
| Avogadro's number | **constante de Avogadro** | *Número de Avogadro* is what most Spanish students are taught and is not wrong; *constante* is the current term and matches the German and French choices. **Rated medium.** |
| relative atomic mass | **masa atómica relativa** | — |
| molar mass (M) | **masa molar** | — |
| concentration | **concentración** | — |
| limiting reagent | **reactivo limitante** | Unambiguous and standard; reuses *reactivo*, already fixed above. |
| in excess | **en exceso** | — |
| theoretical / actual yield | **rendimiento teórico / rendimiento real** | **Spanish does not have the structural problem French has here.** French *rendement* is only a ratio, so the two masses had to be renamed; Spanish *rendimiento* is used for both the mass and the ratio, exactly as English "yield" is. The stoichiometry sheet can therefore follow the English structure directly. |
| percentage yield | **rendimiento porcentual** | *Rendimiento (%) = rendimiento real ÷ rendimiento teórico × 100.* |

## Organic chemistry

| English | Spanish (use this) | Why this one, and what we rejected |
|---|---|---|
| functional group | **grupo funcional** | Unlike French — whose programme insists on *groupe caractéristique* — Spanish says *grupo funcional* and there is no decision to make. |
| homologous series | **serie homóloga** | — |
| hydrocarbon | **hidrocarburo** | — |
| alkane / alkene / alkyne | **alcano / alqueno / alquino** | Note *alqueno* and *alquino* with **qu**. |
| haloalkane | **haloalcano** | — |
| alcohol | **alcohol** | — |
| aldehyde / ketone | **aldehído / cetona** | Note the accent: *aldehído*. |
| carboxylic acid | **ácido carboxílico** | Spanish writes them *ácido …oico*: *ácido etanoico*, *ácido metanoico*. |
| ester | **éster** | Spanish names esters **anion first**, as French does and English does not: **etanoato de metilo**, where English says "methyl ethanoate". This is a naming *rule*, not a word, and the organic sheet teaches the Spanish order. |
| amine / amide | **amina / amida** | — |
| esterification | **esterificación** | — |
| hydrolysis | **hidrólisis** | — |
| substituent | **sustituyente** | Note: *sustituyente*, not "substituyente". |
| chain (carbon chain) | **cadena / cadena carbonada** | — |
| locant (position number) | **localizador** / **número** | Prose uses *número* at this level. |

---

## Naming: what changes and what does not

| Kind of thing | Translated? | Notes |
|---|---|---|
| Chemical formula (H₂O, Ca(OH)₂, 2H₂ + O₂ → 2H₂O) | **No** | International notation. Structurally impossible to translate in this codebase: formulae are not in the translation overlays at all, and `cheat-sheets.test.ts` asserts they come through byte-identical. |
| Element symbol (Na, Cl, Fe) | **No** | — |
| State symbol ((s), (l), (g), (aq)) | **No** | Kept as the international abbreviations even though the Spanish words differ (*sólido*, *líquido*, *gaseoso*, *acuoso*) — and Spanish's own abbreviations would be the same four letters anyway. |
| Charge notation (2−, +) | **No** | — |
| Element **name** | **Yes** | **Spanish keeps *nitrógeno*** — the trap that catches French (*azote*) does not exist here. The ones that do not transliterate: Iron → *hierro*, Copper → *cobre*, Silver → *plata*, Gold → *oro*, Lead → *plomo*, Tin → *estaño*, Sulfur → *azufre*, Tungsten → **wolframio** (not *tungsteno*, in Spain), Iodine → **yodo** (not *iodo*), Zinc → **cinc**. And note that **Na and K *are* translated in Spanish** — *sodio* and *potasio* — unlike French, where they are the same words as the English; see the test note below. Full table in `src/i18n/chemistry-names/es.ts`, verified symbol by symbol rather than pattern-matched. |
| Compound **name** | **Yes** | Spanish composes them **anion first, then *de* + cation**, exactly as French does: *hidróxido de sodio*, *cloruro de calcio*, *sulfato de sodio*. Binary acids take *-hídrico*: HCl → *ácido clorhídrico*, HF → *ácido fluorhídrico*, HBr → *ácido bromhídrico*, HI → *ácido yodhídrico*. The *-ous / -ic* pair becomes *-oso / -ico*: HNO₂ *ácido nitroso* vs HNO₃ *ácido nítrico*; H₂SO₃ *ácido sulfuroso* vs H₂SO₄ *ácido sulfúrico*. |
| Ion **name** | **Yes** | Spanish uses the systematic *hidrogeno-* prefix where the English data still uses the older *bi-*: bicarbonate → **hidrogenocarbonato**, bisulfate → **hidrogenosulfato**, bisulfite → **hidrogenosulfito** — the same modernisation German and French made. *Bicarbonato* is what people actually say and is glossed in the ion table. A monoatomic cation is *ion* + the element (*ion sodio*). |
| Molecule names of the elements | **Yes, with a caveat** | Spanish has the *di-* forms — **dihidrógeno**, **dioxígeno**, **dinitrógeno**, **dicloro** — and they are correct IUPAC Spanish (RSEQ nomenclature). They are used here, for a specific reason: the Reaction Balancer draws a distinction between a **card**, which names a substance, and the **atom ledger**, which counts atoms, and writing *hidrógeno* in both places erases it. **But Spanish school textbooks are not as consistent about this as French ones are** — where *dihydrogène* is taught explicitly from 3ᵉ in France, a Spanish textbook will often just write *hidrógeno* for H₂. **Rated medium and flagged for a teacher**: if the audience's textbook does not use the *di-* forms, this is a contained change in `SPECIES_NAMES_ES` and `LEWIS_MOLECULE_TEXT_ES`. |
| IUPAC affixes being *discussed as affixes* (-ato/-ito, hipo-/per-, -ol/-al/-ona) | **Partly** | Where the sentence is teaching the naming system, the Spanish affixes are used. Where a table was showing the English source affix, it is replaced by the Spanish pattern rather than glossed, because the user chose adaptation over bilingual presentation. Flagged for review — see `es-review.md`. |
| Spelling convention | — | Spanish IUPAC/RAE spellings: **cinc** (not zinc), **yodo** (not iodo), **wolframio** (not tungsteno), **circonio**, **cesio**, **bismuto**, **silicio**, **azufre**, **estaño**, **molibdeno**, **teluro**, **criptón**, **xenón**, **radón**, **oganesón**. |

### A note for whoever touches `chemistry-names.test.ts`

The French pass made two of its assertions per locale. **Spanish needs neither
exemption, and that is worth stating rather than leaving as an absence:**

- **`mustDiffer`** lists fourteen element names any real translation must change.
  French had to exempt `Na` and `K`, because French calls them *sodium* and
  *potassium* exactly as English does. **Spanish translates both** — *sodio* and
  *potasio* — so `SAME_AS_ENGLISH` gets **no `es` entry at all**, and all
  fourteen are checked. The test asserts that exemptions are not stale, so an
  empty list is the correct and self-maintaining state.
- **"no compound name is identical to the English"** holds for all 35 compounds
  in Spanish. French needed an exemption for N₂H₄ (*hydrazine*, the same word in
  both); Spanish says **hidracina**, so `IDENTICAL_COMPOUNDS_BY_DESIGN` gets **no
  `es` entry either**.

Both lists were checked entry by entry rather than assumed. If a later change
makes one necessary, add it with a reason, the way French did.

---

## Product and UI vocabulary

Not chemistry, but it needs to be consistent too.

| English | Spanish | Note |
|---|---|---|
| ChemGames | **ChemGames** | Brand; never translated. |
| cheat sheet | **chuleta** | The natural Spanish school word and the exact register of the English, the German *Spickzettel* and the French *antisèche* — it also means a pork chop, which is the same kind of joke "cheat sheet" is. **Rated medium on two counts**: it carries the cheating connotation, so a teacher may prefer **ficha de repaso**; and it is the strongest es-ES marker in the UI, since Latin America says *acordeón*, *torpedo* or *machete* depending on the country. Feminine: *una chuleta*, *las chuletas*. |
| game | **juego** | — |
| level | **nivel** | Spanish gaming says *nivel*; no loanword is needed, unlike German's *Level*. |
| score / points | **puntuación**, **puntos** | *Puntos* in the narrow header badge, *puntuación final* for "final score". |
| high score | **mejor puntuación** | Not *récord* and not the English. |
| leaderboard | **clasificación** | — |
| rank | **puesto** | *Puesto* is what a Spanish speaker calls a position in a ranking; *rango* means "range" or a military rank. |
| hint | **pista** | **The word French had to fight for, and Spanish gets free.** The handover predicted a repeat of the French *indice* collision. There is none: Spanish's subscript is *subíndice* and Spanish's hint is *pista*, and they share no word. *Pista* is five characters, so it fits the header badge that ruled out French's *coup de pouce*; it is what a Spanish game or quiz says; and it is the everyday word for a clue. **Rejected: *indicio*** (a clue in a detective sense — too forensic), ***consejo*** (advice from a teacher, the same objection French raised), ***ayuda*** (already the word for help in general, and it is what the support-mode and instructions copy needs). |
| lives | **vidas** | — |
| wave (of enemies) | **oleada** | — |
| Game Over | **Partida terminada** | Keeping the English is common in games, but Spanish is clearer for this audience and *partida* is the right word for one run. |
| pause / resume | **pausa / reanudar** | — |
| instructions | **Cómo jugar** | Used both as the footer button and as the head of the instructions titles (*Cómo jugar: Rompefórmulas*), so the two cannot drift apart. *Instrucciones* was the alternative; *Cómo jugar* matches the English's task framing. |
| settings | **Opciones** | **Not *Ajustes*, and not by accident.** *Ajustes* is the ordinary Spanish for app settings, and *ajustar* is this site's verb for balancing an equation — the reader would meet the same root meaning two unrelated things. *Opciones* is what a game calls this panel anyway. *Configuración* was the third option and is four characters longer. |
| coach (the in-game hint panel) | **Guía** | Spanish does use *coach* as a loanword, but it is business register rather than the naturalised word French has. *Entrenador* and *tutor* both force a gender. **Guía** is epicene, short, and says what the panel does. It does not collide with "Skip guide", which is rendered *Saltar la explicación*. **Rated medium.** |
| support mode | **modo de apoyo** | Matches the *Apoyo* heading in the settings panel, so the two read as one feature. |
| marking sheet | **hoja de corrección** | — |
| lab notebook | **cuaderno de laboratorio** | Spanish does not clip *laboratorio* the way French clips *laboratoire* to *labo*, so these strings run longer than the French ones. Checked on the card. |
| challenge (the bonus level) | **Reto** | Short, natural, and the same both sides of the Atlantic. *Desafío* is the longer synonym. Kept in Spanish, unlike German's *Challenge*. |
| feedback | **Comentarios** | Like French and unlike German, Spanish does not keep the English word. *Problema* rather than *Bug* for the same reason. |
| student | **estudiante**; collectively **el alumnado** | *Estudiante* is epicene, so *los estudiantes* needs no gender work. Where the English says "For students" as a section heading, the collective **el alumnado** is used — it is standard, it is epicene, and it avoids the article problem entirely. |
| teacher | **profesor**; collectively **el profesorado** | Same device: "For teachers" is *Para el profesorado*. |
| scientist | **científico** — but see the note | Spanish has no epicene noun here; French's *scientifique* has no Spanish counterpart. Every faithful rendering of "Registered Scientist" is gendered. `profile.defaultTitle` is therefore rendered **"Mente científica"**, which is an invention: it is epicene because it describes a mind rather than a person, and it fits a badge. **Rated low.** The literal alternative is *Científico del laboratorio*, which defaults to masculine on the reader's own profile. |
| year level | **curso**; labels **1º ESO, 2º ESO, 3º ESO, 4º ESO, Bachillerato** | The stored value stays `Year 9`; only the label is Spanish. Mapped by age: Year 7 ≈ 1º ESO, Year 8 ≈ 2º ESO, Year 9 ≈ 3º ESO, Year 10 ≈ 4º ESO, Senior ≈ Bachillerato. The site's own audience (Year 9–10) is therefore **3º / 4º de ESO** — which is why the SEO keywords say *química 3º ESO* and *química 4º ESO* and **not** *química bachillerato*, the Spanish equivalent of the "Chemie Oberstufe" mistake Phase 1 had to correct. |

---

## Game titles

Titles are translated, not transliterated, and every one of them is **rated
low**: these are product-naming calls for the owner, not translation calls. The
rejected candidates are kept as comments above each chosen line in
`src/i18n/dictionaries/es.ts`, so the reasoning travels with the code.

| Key | English | Spanish (chosen) | Runner-up | Why |
|---|---|---|---|---|
| `acidTitle` | Acid or Base? | **¿Ácido o base?** | *¿Ácido, base o neutro?* | The direct question works as a title in Spanish exactly as it does in English, and it is what the game asks. The runner-up is truer to the four-way sort and too long for the card. **Rejected: *El detector de ácidos*** — names a machine, which is the GAMES.md trap. |
| `blasterTitle` | Formula Blaster | **Rompefórmulas** | *Revientafórmulas* | *Verbo + sustantivo* written as one word is how Spanish builds this kind of name — *rompecabezas*, *sacacorchos*, *cascanueces*, *cuentagotas* — and **Rompefórmulas** lands on *rompecabezas*, the Spanish word for a puzzle, so it reads as a game on sight. The runner-up is truer to the popping mechanic (*reventar* is what Spanish says bubbles do) and four characters heavier. **Rejected: *Formula Blaster*** — a calque in which "Blaster" reads as English filler — **and *Caza de fórmulas*** — clear, but it sounds like a worksheet. |
| `neutraliseTitle` | Neutralise! | **¡Neutraliza!** | *Defensa iónica* | Mirrors the English's deliberate imperative, and Spanish imperatives do work as titles. GAMES.md warns that an imperative can read as an instruction rather than a name — that is the risk to check. The runner-up reads more like a product but says "ions" without saying "neutralisation". **Rejected: *Neutralización*** — a textbook chapter heading. |
| `balancerTitle` | Reaction Balancer | **La balanza de átomos** | *Ajusta la reacción* | Names the beam the game actually puts on screen, says the chemistry, and reads as a title. **Rejected: *Ajustador de reacciones*** — an *ajustador* is a person or a machine (a fitter, a claims adjuster), precisely the "sounds like a machine for sorting chemicals" trap — **and *Equilibrio químico***, which is a real and completely different topic (chemical equilibrium) and would mislead a student who has met it. The runner-up was dropped only because the hub would then have two imperative titles. |
| `lewisTitle` | Share to Fill | **Comparte y completa** | *Cada oveja con su pareja* | GAMES.md asks for "a phrase that names the rule in that language". Two short imperatives, alliterative, natural Spanish, and a 14-year-old reads it instantly. The runner-up is a real Spanish saying about pairing off and is far more memorable — but it is folksy, says nothing chemical, and is 23 characters. **Rejected: *Comparte para completar*** — a calque whose purpose clause is clumsy — **and *De dos en dos*** — memorable, but it loses the filling half of the rule. |
| `bondsTitle` | Chemical Bonds | **Enlaces químicos** | *Los enlaces* | A topic name rather than a coinage, so the direct translation is the right answer. Still rated low with the rest. |

The open question the German review raised — *should game titles be translated
at all, or kept as English product names?* — is unchanged and is answered per
game in the brief, not silently per locale.

---

## Explore: molécula y científica o científico de la semana

Decided for `src/lib/explore/` and used in `src/i18n/explore/es.ts`. Each term is
used identically in every entry that needs it.

| English | Spanish | Note |
|---|---|---|
| quasicrystal | **cuasicristal** | Settled Spanish. |
| peroxide bridge / endoperoxide | **un puente de dos átomos de oxígeno … un peróxido** | Matches *Peróxido* in the polyatomic table. *Endoperóxido* is university register and was not used. |
| isotactic | **isotáctico** | Natta's own term, and what Spanish polymer texts print. |
| liquid crystal | **cristal líquido** | One of the few places *cristal* is unambiguous — see the next row. |
| crystal vs glass | **sólido cristalino** vs **vidrio** | **A trap for every Romance locale.** In Spain *cristal* is the everyday word for window glass, so a literal "the difference between a crystal and a glass" reads as "the difference between glass and glass". In `sodium-chloride`, where *cristal* means the object, the ordinary word is kept. |
| latent heat of fusion | **calor latente de fusión** | Used once, as a gloss, in `maria-telkes`. |
| incongruent melting | **no funde de forma limpia** | *Fusión incongruente* is correct and not 3.º ESO vocabulary. Same wording in `sodium-sulfate` and `maria-telkes`, so the pair reads as one idea. |
| chirality / mirror images | **quiral**; **imágenes especulares una de la otra** | The noun *quiralidad* was not needed. |
| R/S nomenclature | **el sistema R/S**; **las reglas de Cahn–Ingold–Prelog** | Letters never translated. |
| processivity | *(paraphrased: «no suelta el molde»)* | *Procesividad* is the real term; flagged `low`, because Spanish readers of the Salas entry are the likeliest to know it. |
| strand displacement | **aparta a su paso la hebra contraria** | A DNA strand is **hebra**, never *cadena* — *cadena* is already this glossary's word for a carbon chain. |
| polyatomic vs complex ion | **ion poliatómico** (already above) vs **ion complejo** | The contrast `alfred-werner` turns on. |
| monolayer | **monocapa** | Glossed in place on first use. |
| catalytic hydrogenation | **hidrogenación catalítica** | — |
| phase-change material | **material de cambio de fase** | — |
| umami | **umami** | Naturalised in Spain; carries `monosodium-glutamate` and `kikunae-ikeda`. |
| diffraction pattern | **patrón de difracción** | Consistent in `kathleen-lonsdale` and `dan-shechtman`. |
| twinned crystals | **una macla de cristales** | The Spanish crystallography word — correct, and probably unknown at 14. Flagged `low`. |
| hydrogen bond | **enlace de hidrógeno** | The IUPAC and modern-textbook form, over *puente de hidrógeno*, which many Spanish teachers still say. Appears in four entries, so a reversal is a visible four-line change. Flagged `medium-low` for a teacher. |
| greenhouse gas | **gas de efecto invernadero** | — |
| fertiliser | **fertilizante** | Over *abono*, which implies manure. |
| heat of formation | **calor de formación** | Chosen over *entalpía de formación* so it sits beside *calor latente*. |
| aramid | **aramida** | Recorded; the Kevlar entry now uses the bare trade mark. |
| Kevlar, urea | **Kevlar**, **Urea** | Identical to the English and allowlisted in `src/i18n/explore.test.ts`. The first draft glossed them (*Kevlar (aramida)*, *Urea (carbamida)*) purely to pass the byte-identity gate; *carbamida* is real Spanish that nobody says and does not belong on a card heading to satisfy a test. |
