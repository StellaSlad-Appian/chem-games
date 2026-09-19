# Italian chemistry glossary

The agreed Italian term for every chemistry concept that appears on the site. It
exists so the same idea is not called two different things on two different
pages, and so whoever writes the next Italian string does not have to re-decide.

**If you are adding or editing Italian copy, use the term in the middle column.**
Where Italian school practice accepts more than one word, the "Why this one"
column says which we picked and why; the rejected alternative is not wrong, it
is just not ours.

Scope: Italian for a Year 9–10 audience — **terza media** and the **primo anno
di scuola secondaria di secondo grado** (the first year of an Italian
upper-secondary school), following the vocabulary of Italian school textbooks
rather than university Italian.

Unlike Spanish, Italian needs no variety decision: there is one standard written
Italian and one school vocabulary, so the choice that opens `glossary-es.md`
simply does not arise here. What takes its place is the **article problem**,
which is worse in Italian than in any of the other three languages, and the
**loner** decision, which Italian's own lone-pair term constrains in exactly the
way Spanish's did.

---

## Register and typography

| Rule | Decision |
|---|---|
| Address | Informal **tu** throughout, as the brief fixes. Like Spanish and unlike French, this is not contentious: Italian school material addresses students as *tu* as a matter of course, and *Lei* would read as a letter from the bank. All imperatives are the *tu* form: *trascina*, *tocca*, *premi*, *scegli*, *conta*, *guarda*. |
| Quotation marks | **« … »** (caporali), which is the Italian printing standard, and **without** the inner spaces French requires. Nested quotes use “ … ”. |
| Space before `: ; ! ?` | **None.** Italian punctuates like English and Spanish here, not like French. This is why `cheatSheets.exampleLabel` (`{name}:`) is identical to the English and is allowlisted — the key exists only because French needs a no-break space. |
| Apostrophe | **U+2019 (’), always** — *l’atomo*, *un’equazione*, *dell’ossigeno*. This is not only typography: elision is everywhere in Italian, the dictionaries are single-quoted TypeScript, and `'l\'atomo'` would put a backslash in front of roughly one string in six. Using the typographic apostrophe means **no Italian string ever needs an escape**, and it is what a printed Italian page uses anyway. `en.ts` already writes *browser’s* the same way. |
| Elision | **Watch it on every string with a following vowel.** *un’equazione* (feminine, elided) but *un elemento* (masculine, **no** apostrophe — a common native error). *dell’atomo*, *all’ossigeno*, *l’idrogeno*, *nell’acqua*. |
| Dash | **–** (en dash) for parenthetical dashes, matching the house style already set for German, French and Spanish. |
| Ellipsis | **…** as a single character. |
| Decimals | **Comma**: 6,02 × 10²³, not 6.02. (Prose only; code and formulae keep their own notation.) |
| Thousands | A no-break space: 1 000. The traditional Italian point (1.000) was rejected because the same sheets print decimal commas and the two conventions collide for a reader who meets both in one worked example; the SI space is unambiguous and matches the Spanish decision. |
| Accents on capitals | **Kept, and this one is a spelling rule.** *È* is a letter, and *E’* is a typewriter workaround that Italian style guides reject. Every sentence-initial *È* on the site is U+00C8. |
| Accents, generally | Italian accents are **final** (*perché*, *città*, *più*, *lunedì*), and the grave/acute distinction matters: *perché*, *poiché*, *né*, *sé* take an acute; *è*, *città*, *però*, *più* take a grave. |
| Nouns | Lower case inside a sentence — which is why `LOWERCASES_NAMES_IN_SENTENCE` is `true` for `it` (see below). |
| Gender | Italian agreement is as audible as Spanish's, and Italian has **fewer** epicene nouns to escape with. The devices used are listed below; no *-*, *-x*, schwa (*ə*) or *@* forms, matching the decisions taken for the other three locales. |

### Adjectives and participles that agree with the reader

Same class of problem as Spanish, and Italian has no *estudiante* /
*alumnado* / *profesorado* to fall back on: *studente* has *studentessa* beside
it, and *alunni* / *professori* default to masculine.

A sentence like *"Ready for your first result?"* has no gender-neutral Italian
translation that keeps the adjective: *Pronto?* addresses a boy, *Pronta?* a
girl, and *Pronto/a?* is not something you print in a game. The same trap
catches *Welcome back*, *Stuck?*, *you are signed in* and *Are you sure?*.

**The device Italian has and Spanish does not: the headless relative.** *Chi
studia* ("whoever studies") and *chi insegna* ("whoever teaches") are ordinary,
short, completely epicene Italian, and they solve the two section headings that
forced Spanish to reach for collective nouns.

| English | Not this | This |
|---|---|---|
| Ready for your first result? | *Pronto per il tuo primo risultato?* | **Il tuo primo risultato ti aspetta.** |
| Welcome back | *Bentornato* | **Ciao di nuovo!** |
| Stuck? | *Sei bloccato?* | **Non sai come andare avanti?** |
| You need to be signed in | *Devi essere connesso* | **Devi accedere** |
| if you are signed in | *se sei connesso* | **se hai effettuato l’accesso** |
| For students | *Per gli alunni* | **Per chi studia** |
| For teachers | *Per i professori* | **Per chi insegna** |
| Drawn by a classmate | *Disegnato da un compagno* | **Disegno di qualcuno della tua classe** |

Worth knowing because it is invisible in review: each of these reads as an
ordinary sentence, and only the English beside it shows that something was
avoided. If a new string is added, check it the same way — *does any adjective
or past participle here describe the reader?*

### `LOWERCASES_NAMES_IN_SENTENCE` is `true` for Italian

Italian capitalises only proper nouns, so a chemical name inside a sentence is
lower case: *«due molecole di acqua»*, not *«due molecole di Acqua»*. The map in
`src/i18n/chemistry-names.ts` is therefore `true` for `it`, the same as English,
French and Spanish and the opposite of German.

Checked against every call site before setting it, the way the French and
Spanish passes were: `nameInSentence()` is applied only to **element names** in
the Reaction Balancer catalogue and to **element and molecule names** in the
Share to Fill catalogue. Neither set contains a Roman numeral, so the naive
`.toLowerCase()` cannot turn *ferro(III)* into *ferro(iii)*. Species names that
do carry one (*nitrato di rame(II)*) reach the screen through `speciesName()`,
which does not lowercase. If a future change routes a species name through
`nameInSentence()`, that is the thing to re-check.

### The article problem: Italian has the worst case of it, and the same cure

A placeholder holding a chemical name cannot be preceded by an article. French
picks the article from gender and first letter (*l’oxygène* / *le carbone*);
Spanish adds *el* / *la*; **Italian adds a third axis on top of both**:

- **Three masculine singular forms**, chosen by the *sound* the noun starts
  with: *il carbonio*, *il ferro*, *il rame*, but **lo zolfo**, **lo zinco**,
  **lo stagno** (before z and s + consonant), and **l’ossigeno**, **l’azoto**,
  **l’idrogeno**, **l’argento** (before a vowel). Three of the fourteen element
  names the parity test insists on translating fall in the *lo* class.
- **Elision**, which changes the article's *spelling*, not just its choice.
- **Obligatory contraction with every preposition**: *di + il = del*, *di + lo =
  dello*, *di + l’ = dell’*, *a + il = al*, *a + lo = allo*, *a + l’ = all’*,
  *in + il = nel*, *da + lo = dallo*. So even *"di {name}"* is unsafe in a way
  it is not in French, where only *de le → du* and *de les → des* contract.

There is no safe pronoun either, and no safe default: *lo* is wrong for
*carbonio*, *il* is wrong for *zolfo*, and *l’* is wrong for both.

**The device: put the name in a label position, not in a noun-phrase position.**
The same three shapes French invented and Spanish adjusted, and they survive
Italian unchanged:

| Shape | Example | Where it is used |
|---|---|---|
| Name, then a colon | `{atom}: restano {count} dispari.` | coach lines, a11y labels, live-region announcements |
| A generic noun, then a colon, then the name | `Questa sostanza non partecipa alla reazione: {name}.` | Sfida errors, wrong-pick feedback |
| *l’elemento* before the name | `Quale composto con l’elemento {elementInSentence} potresti cambiare?` | Reaction Balancer coach and hints, where the name is always an element |

***l’elemento {x}* is, if anything, safer in Italian than in Spanish**, and for a
reason worth writing down: the article agrees with *elemento*, and *elemento*
begins with a vowel, so the article is **always** `l’` and every preposition
contracts to exactly one form — `dell’elemento`, `all’elemento`,
`nell’elemento`. There is no branch left to get wrong. Spanish's *el elemento*
still had to be checked against *el agua*; Italian's has nothing to check.

Two smaller consequences:

- Italian, like French and Spanish, drops the article in *«il legame tra
  carbonio e ossigeno»*, so `tra {atom1} e {atom2}` is idiomatic and is used
  as-is.
- *0* takes the plural in Italian (*0 dispari*), as in Spanish and unlike
  French, and `Intl.PluralRules` already knows it. Italian also has a CLDR
  **`many`** category, and it was worth checking rather than assuming, because
  Italian's preposition-elision rule (*degli 8 atomi*) looks as though it ought
  to drive one. **It does not.** Measured against the runtime this project
  actually uses:

  ```
  node -e "const p=new Intl.PluralRules('it');
           for (const n of [0,1,2,5,8,11,80,800,1e6]) console.log(n, p.select(n))"
  0 other · 1 one · 2 other · 5 other · 8 other · 11 other · 80 other ·
  800 other · 1000000 many
  ```

  `many` fires only at exact millions, exactly as it does for Spanish. No count
  on this site reaches a million, so every plural record supplies `one` and
  `other` and `selectPlural()` never has to fall back.

### Count agreement: the bug class that compiles, passes and is still wrong

**Read this before writing a single count-bearing string.** Four Spanish strings
shipped, passed every parity gate, and were ungrammatical on screen, because a
Romance verb or participle agrees with its count and the strings are flat rather
than plural records. English *{count} more needed* does not inflect, so a flat
string is correct in English and silently wrong in Italian. `dictionary.test.ts`
requires that *whether* a string is count-dependent matches the English in both
directions, so the shape cannot be changed to fix it: **the wording has to be
invariant.**

Every count-bearing Italian string on the site was written or rewritten to be
invariant. The ones that needed it:

| Key | English | Naive Italian (wrong at 1) | Shipped |
|---|---|---|---|
| `ledger.needsMoreLeft` / `Right` | {count} more needed on the left | *mancano {count} a sinistra* → "mancano 1" | **{count} da aggiungere a sinistra** |
| `overlay.statRoundValue` | {count} correct | *{count} corrette* → "1 corrette" | **risposte esatte: {count}** |
| `overlay.levelOfMax` | Level {level} of {max} • {correct} correct | *{correct} corrette* | **… • risposte esatte: {correct}** |
| `overlay.levelUpProgress` | Level {level} → {next} • {correct} sorted | *{correct} classificate* | **… • classificate: {correct}** |

*da aggiungere* is the key move in the first row: **`da` + infinitive never
agrees with anything**, so "1 da aggiungere" and "5 da aggiungere" are both
correct, and unlike Spanish's *{count} de menos* it also says which direction
the shortfall runs. (*{count} in meno* was rejected precisely because it is
ambiguous between "five short" and "five too many", which is the one thing the
ledger must not be.)

The colon label does the rest, and it is the same device the article problem
already forces everywhere else: a label is a heading, not a predicate, so
nothing has to agree with the number after it.

Every other count-bearing string was checked the same way rather than assumed.
`{count} di 8`, `ce ne sono {count}`, `{correct} / {quota} classificate` (which
agrees with *risposte*, supplied by the quota, not by the count) and every
`counts.*` record (which **is** a plural record, so both forms are written out)
are invariant or correctly inflected as they stand.

### Glossary match words: Italian's accents are final, and that is the risk

The tap-to-explain matcher in `GlossaryTerm.tsx` finds a term with a JavaScript
`\b`, which only knows ASCII letters, so **a match word must begin and end with
an ASCII letter**. French was bitten at the *start* (*électron*); Spanish escaped
because its accents are medial (*electrón* → `e`…`n`).

**Italian's accents are final** — *perché*, *città*, *più*, *lunedì* — so the
Italian failure mode is a match word that *ends* in one. Checked every word
before writing it down; none of the terms this site needs carries a final
accent, so Italian, like Spanish, can use the full phrases:

- `elettroni esterni`, `elettrone esterno`, `elettroni di valenza` ✓
- `elettrone spaiato`, `elettroni spaiati` ✓
- `doppietto solitario`, `doppietti solitari` ✓
- `doppietto di legame`, `doppietti di legame` ✓
- `dispari` ✓ (invariant, seven ASCII letters, no accent)
- `pedice`, `pedici`, `coefficiente`, `coefficienti` ✓
- `ottetto`, `duetto`, `punto`, `punti` ✓

`src/i18n/game-messages.test.ts` asserts this for every match word in every game
catalogue, so a term that could never open its pop-over fails the suite rather
than failing silently on screen.

**Two Italian near-misses to know about.**

1. **Elision helps rather than hurts.** `\belettrone\b` *does* match inside
   *l’elettrone*, because the apostrophe is not an ASCII word character and `\b`
   finds a boundary there. That is the behaviour we want, and it is why no match
   word needs an *l’* variant.
2. **The accented tail is a false boundary in the other direction.** For the
   same reason `\bperche\b` would match inside *perché*, and `\bmeta\b` inside
   *metà*: the boundary sits between the ASCII letter and the accented one. This
   is the Italian form of the `/\bíndice\b/` ⊂ *subíndice* near-miss Spanish
   documented. It bites nothing today because no match word is a prefix of an
   accented Italian word, but it is the pair to re-test if anyone ever makes the
   matcher Unicode-aware.

---

## Core chemistry terms

| English | Italian (use this) | Why this one, and what we rejected |
|---|---|---|
| acid | **acido** | — |
| base | **base** | Spelled exactly as the English, so it is allowlisted as identical-by-design. |
| basic / alkaline | **basico / alcalino** | Both are taught; *basico* is primary. |
| neutral | **neutro** | *Neutro*, not "neutrale" — Italian differs from the English here where it does not differ for *base*. The same split French and Spanish have, and the opposite of German. |
| amphoteric | **anfotero** | Stressed *anfòtero*; written without an accent. |
| pH | **pH** | Italian says *il pH* and never expands it. |
| indicator | **indicatore** | *Indicatore universale* where the sheet means that one. Italian has none of the ambiguity that made French insist on *indicateur coloré*. |
| neutralisation | **neutralizzazione** | Double z. |
| proton donor / acceptor | **donatore / accettore di protoni** | The Brønsted–Lowry pair as Italian textbooks write it. Note *accettore* with two t's. |
| hydronium ion (H₃O⁺) | **ione idronio** | Italian lands where Spanish did, not where French did. Italian secondary textbooks print **idronio**; *ione ossonio* is the IUPAC form and is what a university text uses. Picked the school word for a school audience. **Rated medium** — it recurs through the acids sheet, so a teacher should confirm it against their textbook. |
| strong / weak acid | **acido forte / acido debole** | — |
| concentrated / dilute | **concentrato / diluito** | — |
| salt | **sale** | Plural *sali*. |
| ion | **ione** | *Ione*, plural *ioni*; *catione* / *anione*. Italian keeps the final *-e* where Spanish drops it, so none of the RAE accent question arises. |

## Substances and structure

| English | Italian (use this) | Why this one, and what we rejected |
|---|---|---|
| compound | **composto** | — |
| molecule | **molecola** | — |
| element | **elemento** | Also the noun that carries the article in the *l’elemento {x}* device above. |
| atom | **atomo** | — |
| cation / anion | **catione / anione** | — |
| polyatomic ion | **ione poliatomico** | — |
| state of matter | **stato della materia** | *Stato di aggregazione* is the more precise term and is taught; *stato della materia* is what the sheet is about and what a Year 9 reader meets first. |
| solid / liquid / gas | **solido / liquido / gas** (adj. *gassoso*) | Note *gassoso*, two s. |
| aqueous | **acquoso** / "in soluzione acquosa" | Italian says *soluzione*; none of the *disolución* / *solución* split Spanish has. |
| precipitate | **precipitato** | — |
| lattice | **reticolo** (reticolo ionico, reticolo metallico) | *Cristallo* names the object; *reticolo* names the arrangement, which is what the properties follow from. Same reasoning as French's *réseau* and Spanish's *red*. |
| covalent bond | **legame covalente** | Like French and Spanish and unlike German, there is no decision to make: Italian school chemistry says *legame covalente* and nothing else. |
| ionic bond | **legame ionico** | — |
| metallic bond | **legame metallico** | — |
| valence electrons (formal) | **elettroni di valenza** | The formal term, used on the cheat sheets. |
| outer electron (running text) | **elettrone esterno** | The transparent word, used in the game's running text, with *elettrone di valenza* glossed beside it — the same two-tier split English makes with "outer (valence) electron". |
| lone pair | **doppietto solitario** | The Italian school term. **This entry is load-bearing: it is why *solitario* cannot be the game's word for a single unpaired electron — see the long note below.** *Coppia solitaria* is the other common phrasing and uses the same adjective, so the collision holds either way; *doppietto libero* and *doppietto non condiviso* are also in circulation. *Doppietto libero* is a second reason *libero* is unavailable. |
| bonding pair / shared pair | **doppietto di legame** | Share to Fill says "shared pair" where a textbook says "bonding pair"; both are *doppietto di legame*. **Rejected: *doppietto condiviso***, the transparent rendering — the game's own verb is *condividere* (*«Condividi e completa»*), so *«condividi un doppietto condiviso»* is tautological in a way *«condividi un doppietto di legame»* is not. Exactly the objection Spanish raised to *par compartido*. |
| unpaired electron (formal term) | **elettrone spaiato** | The Italian textbook term — the one used when teaching radicals. Use it in the glossary, on the cheat sheets and anywhere the text is explaining rather than instructing. |
| the game's "loner" (game word) | **dispari** | See the long note below. |
| the short label on a pulsing dot | **dispari** | Same word; see below for why Italian has nothing shorter to shorten to. |
| octet (eight outer electrons) | **ottetto** | *La regola dell’ottetto* is standard. |
| duet (hydrogen's two) | **duetto** | **Italian sits with Spanish, between French and German.** *La regola del duetto* is in circulation in Italian textbooks, so nothing was coined, but it is not as settled as the octet rule and plenty of teachers simply say hydrogen is full at two. **Rated medium.** **Note what is *not* available: *doppietto*.** It is the obvious word for "a pair of electrons" and it is already this glossary's word for a lone pair — *la regola del doppietto* would mean something else on the very sheet that defines both. |
| single / double / triple bond | **legame singolo / legame doppio / legame triplo** | The adjective follows the noun, so these cannot be compounded the way German's *Doppelbindung* is; the match words are three two-word phrases. **And *singolo* is therefore spoken for**, which is the third reason it could not be the game word. |
| bond-line drawing | **formula di struttura** | The H–O–H line. *Formula condensata* is the one that hides the C–H bonds and is not what the game draws — the same distinction French and Spanish make. |
| Lewis structure | **struttura di Lewis** | The brief's term and the cheat-sheet title. *Formula di Lewis* and *simbologia di Lewis* are both in circulation; *struttura* is what an Italian textbook prints. |
| octet rule | **regola dell’ottetto** | — |
| formal charge | **carica formale** | — |
| electronegativity | **elettronegatività** | Final accent — fine in prose, but **never usable as a glossary match word** (see above). |
| delocalised electrons | **elettroni delocalizzati** | The school phrasing for the "sea" in a metal is *mare di elettroni*; *elettroni liberi* is also used, **and that is the second reason *libero* could not be the game's word for a loner** — it already means something else, and something a student meets on the bonding sheet. |

### The "loner": Italian's own two-tier pair, and the three words it could not use

English deliberately gives an unpaired outer electron two names — the formal
*unpaired electron* and the game's own *loner* — and teaches the pair, with the
game word fading out as a scaffold (Level 1 labels the dots, Level 2 does not).
German mirrored that split with *Einzelelektron*; French with *solitaire*;
Spanish with *impar*.

**Italian cannot use *solitario*, and the check the brief asked for came back
positive.** Italian's term for a **lone pair** is *doppietto solitario* — and the
alternative phrasing *coppia solitaria* uses the same adjective, so the
collision does not depend on which one a textbook prints. A game whose entire
teaching point is the difference between *one* unpaired electron and *two*
electrons that stay together cannot call the first *un solitario* and the second
*un doppietto solitario*. *«Restano 2 solitari»* and *«restano 2 doppietti
solitari»* differ by one word, mean opposite things, and appear in adjacent
coach lines.

Italian then rules out **two more** words that were available in at least one of
the other languages:

- ***libero***. *Doppietto libero* is a name for the lone pair, and *elettroni
  liberi* is the school phrase for the delocalised electrons in a metal, which
  the bonding cheat sheet teaches on this same site. Barred twice over. (Spanish
  barred it once.)
- ***singolo***. The obvious "single". But *legame singolo* is the single bond,
  taught three lines away in the same game. Barred.

| Role | English | German | French | Spanish | **Italian** |
|---|---|---|---|---|---|
| Formal term — glossary, cheat sheet, explaining | unpaired electron | ungepaartes Elektron | électron célibataire | electrón desapareado | **elettrone spaiato** |
| Game word — hub, coach, hints | loner | Einzelelektron | solitaire | impar | **dispari** |
| Short label on a dot | loner | einzeln | seul | impar | **dispari** |

**Why *dispari* as the game word.**

- It is **exactly the chemistry**. *Dispari* is *dis-* + *pari*: "not one of a
  pair". That is the definition of the thing, in one everyday word, and
  *elettrone dispari* is real Italian usage — it is what Italian texts on
  radicals write.
- It is **morphologically invariant**, which no other candidate is. *Un
  elettrone dispari*, *due elettroni dispari*, *i dispari*: the word never
  changes. In a language where the count-agreement bug above is a live hazard,
  a game word that cannot disagree with its number is worth a lot.
- It **nominalises cleanly** — *un dispari*, *i dispari*, *restano 2 dispari* —
  which is what the coach lines need; they say the word three times a sentence.
- It is **entirely ASCII**, so it needs none of the match-word compromises
  French had to make, and it pairs with the game's own verb: *«Accoppia i
  dispari per costruire una molecola»* is the whole rule in six words.
- It collides with **none** of the three terms the game teaches beside it.

**Why the dot label is the same word.** German shortened *Einzelelektron* to
*einzeln* and French shortened *solitaire* to *seul*, because in both languages
the game word is a noun that is too long for a canvas label and the adjective is
shorter. In Italian the game word **is** the adjective — *elettrone dispari* →
*dispari* — so there is nothing to shorten to, exactly as in Spanish.

**The honest cost: seven characters, and it was measured.** The pre-existing
Lewis layout note says the dot label overlaps the atom ring at 360 px beyond
about four characters. Measured in a browser at 360 px, on the H₂ round where
both labels sit between the two atoms:

| Locale | Label | Label width | Overlap with the ring |
|---|---|---|---|
| es | `IMPAR` | 33 px | **8 px** |
| it | `DISPARI` | 40 px | **11 px** |

So Italian is three pixels worse than Spanish on a limitation Spanish already
trips, not a new breakage — and the overlap falls on the ring stroke, not on
the element letter, so both stay readable. It was weighed rather than
discovered: the only shorter candidates Italian offers are *solo* (4) and
*libero* (6), and both are rejected below on meaning. Reported as
pre-existing-and-inherited rather than fixed.

**What was rejected.**

- ***solitario***. The French answer, and the one a translator working from the
  French or Spanish file would reach for. Rejected for the collision above: it
  is already Italian for the *lone pair*, under either of that term's two
  common phrasings.
- ***libero*** and ***singolo***. Rejected above, on the lone pair and the
  single bond respectively.
- ***solo***. Four characters, the direct analogue of French's *seul*, and the
  only candidate that would have fixed the label width. Rejected on the bare
  noun, which the coach lines need constantly: ***i soli*** is Italian for "the
  suns" and, read the other way, for "the only ones". A word that cannot be
  pluralised as a noun cannot carry this game.
- ***spaiato*** as the game word. That is the formal term, and using it
  everywhere would collapse the two tiers the game is built on: the scaffold
  would stop being a scaffold. It is, though, the closest call in this table —
  *spaiato* is transparent to a 14-year-old in a way *unpaired electron* is not
  in English, so Italian's formal tier is already half the way to being a game
  word. If the owner decides the two tiers are not worth keeping in Italian,
  *spaiato* is the word to collapse them onto, and it is the same seven
  characters.
- ***scompagnato***. The everyday word for "not part of a matching pair" (an odd
  sock), and the best of the rejected ideas — it is what French wanted from
  *dépareillé* and, unlike the French word, it nominalises. Rejected on length:
  eleven characters is impossible on a dot and heavy three times in a sentence.
  It survives as a gloss.
- ***celibe***. The literal analogue of French's *célibataire*. Rejected because
  Italian chemistry does not use it — where *célibataire* is the real French
  textbook term, *elettrone celibe* would read as a joke.
- ***orfano***. A word for a *child*: cute rather than chemical, which is the
  objection German raised against *Einzelgänger*.

**Rated low, both rows.** Not because they are inaccurate — the three collision
arguments are objective — but because this is register, and register is what a
native speaker decides. The specific risk is the same one Spanish flagged for
*impar*: *dispari* is also the everyday word for an **odd number**, and in
Italian it is doubly salient because *pari o dispari* is a children's game. A
reader who meets it cold beside a dot may hear "number 3" rather than
"unpaired". The coach line and the glossary chip both define it immediately,
which is the mitigation, but it should be checked with a real teenager. If it
changes, the edit touches every line of Share to Fill.

## Formulae, equations and naming

| English | Italian (use this) | Why this one, and what we rejected |
|---|---|---|
| chemical formula | **formula chimica** | — |
| formula of an ionic compound | **formula minima** | Italian makes the same point German does with *Verhältnisformel*, French with *formule statistique* and Spanish with *fórmula empírica*: the formula of an ionic solid is a ratio, not a molecule. *Formula minima* is the standard Italian school term for it. **Rated medium** — *unità formula* is the more precise term and plenty of textbooks simply say *la formula del composto ionico*. |
| molecular formula | **formula molecolare** | — |
| subscript (the small number in a formula) | **pedice** | **Italian has its own word for this and it collides with nothing.** French's *indice* means both "hint" and "subscript"; Italian's subscript is *pedice* (with *apice* for a superscript), and Italian's hint is *indizio*. The two do not touch, so the fight French had and the one the handover expected Spanish to have does not happen here either. |
| coefficient (stoichiometric) | **coefficiente** | The teaching contrast the whole balancing topic turns on is **coefficiente / pedice**, and it is clean in Italian. |
| to balance an equation | **bilanciare** (un’equazione) | The brief's term and the only one in Italian school use. **Note what Italian gets for free that Spanish had to work around**: Spanish had to rename its settings panel, because *ajustar* (balance) and *ajustes* (settings) share a root. Italian's settings are *Impostazioni*, which has nothing to do with *bilanciare*, so no dodge is needed. |
| balanced equation | **equazione bilanciata** | — |
| the balance beam the game draws | **la bilancia** | The physical object on screen. Unlike Spanish — where *la balanza* had to be kept explicitly distinct from *ajustar* — this is the *same* root as *bilanciare*, and that is a feature rather than a problem: you *bilanci* the equation and the *bilancia* on screen then *è in equilibrio*. One idea, one root, in a language where that happens to line up. |
| conservation of mass | **conservazione della massa** | — |
| reactants | **reagenti** | *Reagente* also means "a reagent on the shelf", exactly as French's *réactif* and Spanish's *reactivo* do, but the ambiguity exists in Italian chemistry itself and the arrow makes it unambiguous here. |
| products | **prodotti** | — |
| reaction arrow | **freccia di reazione** | — |
| atom ledger (the per-element tally) | **conteggio degli atomi** | The game's own name for the table under the arrow. *Conteggio* says what the table is — a tally. **Rejected: *bilancio degli atomi***, the obvious rendering: it is not harmful in Italian the way *balance de átomos* was in Spanish, but it reuses the balancing root for a *different* thing (the table, not the act), which is exactly what a glossary is for. **Rated medium.** |
| lowest terms | **forma più semplice** | — |
| word equation | **equazione a parole** | Used in the Sfida level. |
| state symbol | **simbolo di stato** | — |
| synthesis | **sintesi** | — |
| decomposition | **decomposizione** | — |
| combustion | **combustione** | — |
| single / double displacement | **scambio semplice / doppio scambio** | Italian school chemistry teaches these as *scambio* rather than *spostamento*; *sostituzione semplice / doppia sostituzione* is the other pairing in circulation. **Rated medium** — check which matches the reader's textbook. |
| precipitation reaction | **reazione di precipitazione** | — |
| oxidation / reduction | **ossidazione / riduzione** | — |
| oxidising agent | **ossidante** | — |

## The mole and stoichiometry

| English | Italian (use this) | Why this one, and what we rejected |
|---|---|---|
| amount of substance (n) | **quantità di sostanza** | — |
| mole | **la mole** | **Feminine**: *una mole*, *0,5 mol* — the same as French's *une mole* and the opposite of Spanish's *el mol*. The symbol stays *mol*. |
| Avogadro's number | **costante di Avogadro** | *Numero di Avogadro* is what most Italian students are taught and is not wrong; *costante* is the current term and matches the German, French and Spanish choices. **Rated medium.** |
| relative atomic mass | **massa atomica relativa** | — |
| molar mass (M) | **massa molare** | — |
| concentration | **concentrazione** | — |
| limiting reagent | **reagente limitante** | Unambiguous and standard; reuses *reagente*, already fixed above. |
| in excess | **in eccesso** | — |
| theoretical / actual yield | **resa teorica / resa effettiva** | **Italian does not have the structural problem French has here.** French *rendement* is only a ratio, so the two masses had to be renamed; Italian *resa* is used for both the mass and the ratio, exactly as English "yield" and Spanish *rendimiento* are. The stoichiometry sheet can therefore follow the English structure directly. |
| percentage yield | **resa percentuale** | *Resa (%) = resa effettiva ÷ resa teorica × 100.* |

## Organic chemistry

| English | Italian (use this) | Why this one, and what we rejected |
|---|---|---|
| functional group | **gruppo funzionale** | Unlike French — whose programme insists on *groupe caractéristique* — Italian says *gruppo funzionale* and there is no decision to make. |
| homologous series | **serie omologa** | — |
| hydrocarbon | **idrocarburo** | — |
| alkane / alkene / alkyne | **alcano / alchene / alchino** | Note the **ch** in *alchene* and *alchino*, which is how Italian keeps the hard c. |
| haloalkane | **alogenuro alchilico** | *Alogenoalcano* is the systematic form and is also taught; *alogenuro alchilico* is what an Italian school textbook prints. **Rated medium.** |
| alcohol | **alcol** | *Alcol*, not "alcool" — the modern Italian spelling, and the one Italian chemistry uses. |
| aldehyde / ketone | **aldeide / chetone** | Note *chetone* with **ch**. |
| carboxylic acid | **acido carbossilico** | Italian writes them *acido …oico*: *acido etanoico*, *acido metanoico*. Note the double s in *carbossilico*. |
| ester | **estere** | Italian names esters **anion first**, as French and Spanish do and English does not: **etanoato di metile**, where English says "methyl ethanoate". This is a naming *rule*, not a word, and the organic sheet teaches the Italian order. |
| amine / amide | **ammina / ammide** | Double m in both — a common spelling error. |
| esterification | **esterificazione** | — |
| hydrolysis | **idrolisi** | — |
| substituent | **sostituente** | Note *sostituente*, not "substituente". |
| chain (carbon chain) | **catena / catena carboniosa** | — |
| locant (position number) | **numero di posizione** / **numero** | Prose uses *numero* at this level. |

---

## Naming: what changes and what does not

| Kind of thing | Translated? | Notes |
|---|---|---|
| Chemical formula (H₂O, Ca(OH)₂, 2H₂ + O₂ → 2H₂O) | **No** | International notation. Structurally impossible to translate in this codebase: formulae are not in the translation overlays at all, and `cheat-sheets.test.ts` asserts they come through byte-identical. |
| Element symbol (Na, Cl, Fe) | **No** | — |
| State symbol ((s), (l), (g), (aq)) | **No** | Kept as the international abbreviations even though the Italian words differ (*solido*, *liquido*, *gassoso*, *acquoso*) — and Italian's own abbreviations would be the same four letters anyway. |
| Charge notation (2−, +) | **No** | — |
| Element **name** | **Yes** | **Italian follows French here, not Spanish: nitrogen is *azoto***, never "nitrogeno". The others that do not transliterate: Iron → *ferro*, Copper → *rame*, Silver → *argento*, Gold → *oro*, Lead → *piombo*, Tin → *stagno*, Sulfur → *zolfo*, Mercury → *mercurio*, Tungsten → *tungsteno*, Sodium → *sodio*, Potassium → *potassio*. All fourteen names `chemistry-names.test.ts` insists on are genuinely translated in Italian, so the locale needs **no `SAME_AS_ENGLISH` entry** — see the test note below. Full table in `src/i18n/chemistry-names/it.ts`, verified symbol by symbol rather than pattern-matched. |
| Compound **name** | **Yes** | Italian composes them **anion first, then *di* + cation**, as French and Spanish do: *idrossido di sodio*, *cloruro di calcio*, *solfato di sodio*. Binary acids take **-idrico**: HCl → *acido cloridrico*, HF → *acido fluoridrico*, HBr → *acido bromidrico*, HI → *acido iodidrico*, H₂S → *acido solfidrico*. The *-ous / -ic* pair becomes *-oso / -ico*: HNO₂ *acido nitroso* vs HNO₃ *acido nitrico*; H₂SO₃ *acido solforoso* vs H₂SO₄ *acido solforico*. Note the Italian stem is **solfo-**, not "sulfo-". |
| Ion **name** | **Yes** | Italian uses the systematic *idrogeno-* prefix where the English data still uses the older *bi-*: bicarbonate → **idrogenocarbonato**, bisulfate → **idrogenosolfato**, bisulfite → **idrogenosolfito** — the same modernisation German, French and Spanish made. *Bicarbonato* is what people actually say and is glossed in the ion table. A monoatomic cation is *ione* + the element (*ione sodio*). |
| Molecule names of the elements | **Yes, and Italian diverges from French and Spanish here** | French uses *dihydrogène* because the programme teaches it from 3ᵉ; Spanish used *dihidrógeno* and rated it medium. **Italian uses the bare names — *idrogeno*, *ossigeno*, *azoto*, *cloro* — and that is a decision, not an oversight.** Italian school textbooks overwhelmingly write *idrogeno* for H₂; *diidrogeno* is correct IUPAC Italian and would read as foreign to the audience. The cost is the same cost English pays: the Reaction Balancer's **card** (a substance) and its **atom ledger** (atoms) use the same word. English already lives with that, so Italian is no worse off than the canonical text. **Rated medium and flagged for a teacher**: if the audience's textbook does use the *di-* forms, this is a contained change in `SPECIES_NAMES_IT` and `LEWIS_MOLECULE_TEXT_IT`. |
| IUPAC affixes being *discussed as affixes* (-ato/-ito, ipo-/per-, -olo/-ale/-one) | **Partly** | Where the sentence is teaching the naming system, the Italian affixes are used. Where a table was showing the English source affix, it is replaced by the Italian pattern rather than glossed, because the user chose adaptation over bilingual presentation. Flagged for review — see `it-review.md`. |
| Spelling convention | — | Italian IUPAC/school spellings: **zolfo**, **stagno**, **azoto**, **nichel** (not "nichelio"), **iodio**, **cesio**, **zirconio**, **tungsteno**, **bismuto**, **silicio**, **molibdeno**, **tellurio**, **kripton**, **xeno**, **radon**, **oganesson**. |

### A note for whoever touches `chemistry-names.test.ts`

The French pass made two of its assertions per locale, and the Spanish pass
needed neither exemption. **Italian needs neither either, and both were checked
entry by entry rather than inherited:**

- **`mustDiffer`** lists fourteen element names any real translation must change.
  French had to exempt `Na` and `K`, because French calls them *sodium* and
  *potassium* exactly as English does. **Italian translates both** — *sodio* and
  *potassio* — so `SAME_AS_ENGLISH` gets **no `it` entry at all**, and all
  fourteen are checked.
- **"no compound name is identical to the English"** holds for all 35 compounds
  in Italian. French needed an exemption for N₂H₄ (*hydrazine*, the same word in
  both); Italian says **idrazina**, so `IDENTICAL_COMPOUNDS_BY_DESIGN` gets **no
  `it` entry either**.

The test asserts that exemptions are not stale, so an empty list is the correct
and self-maintaining state. If a later change makes one necessary, add it with a
reason, the way French did.

---

## Product and UI vocabulary

Not chemistry, but it needs to be consistent too.

| English | Italian | Note |
|---|---|---|
| ChemGames | **ChemGames** | Brand; never translated. |
| cheat sheet | **bigino** | The Italian school word for a crib — a one-page summary you keep beside you — with the same cheeky edge as the English *cheat sheet*, the German *Spickzettel*, the French *antisèche* and the Spanish *chuleta*. Masculine: *un bigino*, *i bigini*. **Rated medium**: it carries the cheating connotation, so a teacher may prefer **scheda di ripasso**; and it is mildly dated, so it is worth checking with an actual fourteen-year-old. Changing it touches nav, `cheatSheets.*` and `meta.cheatSheetTitle` together. |
| game | **gioco**; one run of it **partita** | The distinction matters: *Game Settings* is *Impostazioni del gioco*, *Game Over* is *Partita finita*. |
| level | **livello** | Italian gaming says *livello*; no loanword is needed, unlike German's *Level*. |
| score / points | **punteggio**, **punti** | *Punti* in the narrow header badge, *punteggio finale* for "final score". |
| high score | **miglior punteggio** | Not *record*, which is an English loanword Italian does use but which would have to be allowlisted as identical-by-design to avoid saying anything. |
| leaderboard | **classifica** | — |
| rank | **posizione** | *Posizione* is what an Italian speaker calls a place in a ranking; *rango* is military or mathematical. |
| hint | **indizio** | **The word French had to fight for, and Italian gets free**, for a different reason than Spanish: Italian's subscript is *pedice*, so *indizio* and the subscript share nothing. *Indizio* is seven characters, fits the header badge that ruled out French's *coup de pouce*, and is what an Italian quiz, escape room or board game says for a clue. **Rejected: *suggerimento***, which is the standard Italian UI word for a hint and is twelve characters — too long for the badge and for *Indizio {tier} di 3*; ***consiglio*** (advice from a teacher, the same objection French raised); and ***aiuto***, which is already the word for help in general. **Rated medium** — *suggerimento* is the safer choice if the badge can take it. |
| lives | **vite** | — |
| wave (of enemies) | **ondata** | — |
| Game Over | **Partita finita** | Keeping the English is common in Italian games, but it would have to be allowlisted, and *partita* is the right word for one run. |
| pause / resume | **pausa / riprendi** | — |
| instructions | **Come si gioca** | Used both as the footer button and as the head of the instructions titles (*Come si gioca: Rompiformule*), so the two cannot drift apart. *Istruzioni* was the alternative; *Come si gioca* matches the English's task framing. |
| settings | **Impostazioni** | Standard, and — unlike Spanish's *Ajustes* — it shares no root with the site's verb for balancing an equation, so no dodge is needed. |
| coach (the in-game hint panel) | **Guida** | Italian does use *coach* as a loanword, but it is sport or business register. *Allenatore* and *tutor* both force a gender or a register. **Guida** is feminine-invariant as a role noun (*la guida* is used of a person of any gender), short, and says what the panel does. It does not collide with "Skip guide", which is rendered *Salta la spiegazione*. **Rated medium.** |
| support mode | **Modalità supporto** | Matches the *Supporto* heading in the settings panel, so the two read as one feature. |
| marking sheet | **scheda di correzione** | — |
| lab notebook | **quaderno di laboratorio** | Italian does not clip *laboratorio* the way French clips *laboratoire* to *labo*, so these strings run long — the same problem Spanish has. Checked on the card. |
| challenge (the bonus level) | **Sfida** | Short, natural and unambiguous. Kept in Italian, unlike German's *Challenge*. |
| feedback | **Segnalazioni** | Italian does use *feedback* as a loanword, and keeping it would mean allowlisting the trigger and the heading as identical-by-design, as German does. *Segnalazioni* is the word an Italian site uses for the button that reports a problem or sends an idea, and it covers all three categories. *Problema* rather than *Bug* for the same reason. **Note *Idea* is genuinely the same word in both languages and is allowlisted rather than replaced** — swapping in *Proposta* only to dodge the check is the one thing that allowlist exists to prevent. |
| student | **studente**; as an audience **chi studia** | *Studente* has *studentessa* beside it, so it cannot do the work Spanish's *estudiante* does. Where the English says "For students" as a section heading, the headless relative **Per chi studia** is used: ordinary Italian, completely epicene, and shorter than any collective noun. |
| teacher | **insegnante**; as an audience **chi insegna** | *Insegnante* is genuinely epicene (*l’insegnante*, any gender), so it is usable in prose. The heading uses **Per chi insegna** to match *Per chi studia*. |
| scientist | **scienziato** — but see the note | Italian has no epicene noun here; French's *scientifique* has no Italian counterpart and Italian has no collective like *el alumnado*. Every faithful rendering of "Registered Scientist" is gendered. `profile.defaultTitle` is therefore rendered **"Mente da laboratorio"**, which is an invention: it is epicene because it describes a mind rather than a person, and it fits a badge. **Rated low.** The literal alternative is *Scienziato del laboratorio*, which defaults to masculine on the reader's own profile. |
| year level | **classe**; labels **1ª media, 2ª media, 3ª media, 1º superiore, Triennio** | The stored value stays `Year 9`; only the label is Italian. Mapped by age: Year 7 ≈ 1ª media, Year 8 ≈ 2ª media, Year 9 ≈ 3ª media, Year 10 ≈ 1º superiore, Senior ≈ Triennio. The site's own audience (Year 9–10) is therefore **terza media / primo superiore** — which is why the SEO keywords say *chimica terza media* and *chimica primo superiore* and **not** *chimica liceo*, the Italian equivalent of the "Chemie Oberstufe" mistake Phase 1 had to correct. The ordinal indicators (ª, º — U+00AA and U+00BA) are one character each and need no superscript font, the same reasoning French used for *3e* and Spanish for *3º*. |

---

## Game titles

Titles are translated, not transliterated, and every one of them is **rated
low**: these are product-naming calls for the owner, not translation calls. The
rejected candidates are kept as comments above each chosen line in
`src/i18n/dictionaries/it.ts`, so the reasoning travels with the code.

| Key | English | Italian (chosen) | Runner-up | Why |
|---|---|---|---|---|
| `acidTitle` | Acid or Base? | **Acido o base?** | *Acido, base o neutro?* | The direct question works as a title in Italian exactly as it does in English, and it is what the game asks. The runner-up is truer to the four-way sort and too long for the card. **Rejected: *Il rilevatore di acidi*** — names a machine, which is the GAMES.md trap. |
| `blasterTitle` | Formula Blaster | **Rompiformule** | *Scoppiaformule* | *Verbo + sostantivo* written as one word is how Italian builds this kind of name — *rompicapo*, *schiaccianoci*, *cavatappi*, *portacenere* — and **Rompiformule** lands on *rompicapo*, the Italian word for a puzzle, so it reads as a game on sight. The runner-up is truer to the popping mechanic (*scoppiare* is what Italian says bubbles do) and two characters heavier. **Rejected: *Formula Blaster*** — a calque in which "Blaster" reads as English filler — **and *Caccia alle formule*** — clear, but it sounds like a worksheet. |
| `neutraliseTitle` | Neutralise! | **Neutralizza!** | *Difesa ionica* | Mirrors the English's deliberate imperative, and Italian imperatives do work as titles. GAMES.md warns that an imperative can read as an instruction rather than a name — that is the risk to check. The runner-up reads more like a product but says "ions" without saying "neutralisation". **Rejected: *Neutralizzazione*** — a textbook chapter heading. |
| `balancerTitle` | Reaction Balancer | **La bilancia degli atomi** | *Bilancia le reazioni* | Names the beam the game actually puts on screen, says the chemistry, and reads as a title — and it carries a second reading, because *bilancia* is both the scales and the imperative "balance". **Rejected: *Bilanciatore di reazioni*** — a *bilanciatore* is a machine in Italian (a wheel balancer), precisely the "sounds like a machine for sorting chemicals" trap — **and *Equilibrio chimico***, which is a real and completely different topic (chemical equilibrium) and would mislead a student who has met it. The runner-up was dropped only because the hub would then have two imperative titles. At 22 characters it is the longest of the six and was checked on the hub card and the game header at 360 px. |
| `lewisTitle` | Share to Fill | **Condividi e completa** | *Accoppia e completa* | GAMES.md asks for "a phrase that names the rule in that language". Two short imperatives, natural Italian, and a 14-year-old reads it instantly. The runner-up names the *mechanic* (pairing the *dispari*) rather than the *rule* (sharing to fill a shell), which is a real argument for it — it was dropped because the rule is what the game teaches and the mechanic is what it shows. **Rejected: *Condividi per completare*** — a calque whose purpose clause is clumsy — **and *A due a due*** — memorable, but it loses the filling half of the rule. |
| `bondsTitle` | Chemical Bonds | **Legami chimici** | *I legami* | A topic name rather than a coinage, so the direct translation is the right answer. Still rated low with the rest. |

The open question the German review raised — *should game titles be translated
at all, or kept as English product names?* — is unchanged and is answered per
game in the brief, not silently per locale.

---

## Explore: molecola e chimica o chimico della settimana

Decided for `src/lib/explore/` and used in `src/i18n/explore/it.ts`. Each term is
used identically in every entry that needs it.

| English | Italian | Note |
|---|---|---|
| quasicrystal | **quasicristallo** | Standard and transparent. |
| peroxide bridge / endoperoxide | **ponte perossidico**; the group is a **perossido** | Matches *Perossido* in the polyatomic table in `cheat-sheets/it.ts`. |
| isotactic | **isotattico** | Natta's own Italian word. Double t, as in *tattico*. |
| liquid crystal | **cristallo liquido** | Noun then adjective, the only Italian form. |
| latent heat / heat of formation | **calore latente**; **calore di formazione** | *Calore di formazione* over *entalpia di formazione*: school register, and the English says "heat", not "enthalpy". |
| incongruent melting | **non fonde in modo pulito** | The English avoids the term in both entries, so the Italian does too. Term is *fusione incongruente*. |
| chirality / mirror images | **chirale**, **chiralità**; **l'una l'immagine speculare dell'altra** | *Immagine speculare* is the school phrase; identical in `limonene` and `vladimir-prelog`. |
| R/S nomenclature | **il sistema R/S**; **regole di Cahn–Ingold–Prelog**; **in senso orario / antiorario** | R and S stay as letters. |
| processivity | *(described: «si tiene stretta allo stampo … senza mollare la presa»)* | Term would be *processività*. |
| strand displacement | *(described: «scosta da sé il filamento opposto»)* | Term would be *spiazzamento del filamento*; flagged `low` on register. |
| polyatomic vs complex ion | **ione poliatomico** (already above) vs **ione complesso** | Werner's entry says complexes are *una famiglia di ioni poliatomici*, as the English does. |
| monolayer / thin film | **monostrato**; **pellicola** | *Pellicola* beats *film* for a 14-year-old and avoids the cinema loanword. |
| catalytic hydrogenation | **idrogenazione catalitica** | — |
| phase-change heat store | **accumulo di calore** | The English never names the material class, and neither does the Italian. |
| umami | **umami** | The plain taste word is **saporito** (the MSG entry); *umami* is its name (the Ikeda entry). |
| diffraction pattern | **figura di diffrazione** | The Italian physics term; *pattern di diffrazione* is a loan. Flagged `medium`. |
| twinned crystals | **cristalli geminati** | Standard crystallography Italian. |
| hydrogen bond | **legame a idrogeno** | Used in four entries; was not in this glossary. |
| hydroxyl group | **gruppo ossidrilico** / **ossidrile** | *Gruppo idrossilico* is equally current; flagged `medium`. |
| oxidation state | **numero di ossidazione** | The school term, not *stato di ossidazione*. |
| fertiliser | **fertilizzante**, **fertilizzante azotato** | Over *concime*, so that one word covers ammonia, urea, Haber and Döbereiner. |
| rocket oxidiser | **ossidante** | Reuses the glossary's *ossidante*; *comburente* is combustion-specific. |
| aramid | **arammide** | Double m, as in *ammide*. Kevlar's systematic name is **poli(parafenilentereftalammide)**. |
| benzene, urea, limonene, Kevlar | **Benzene**, **Urea**, **Limonene**, **Kevlar** | All four are byte-identical to the English because that is what Italian calls them — three from the same Latin and Greek roots, one a trade mark. Allowlisted in `src/i18n/explore.test.ts`; never gloss one to dodge the gate. |
