# Russian chemistry glossary

The agreed Russian term for every chemistry concept that appears on the site. It
exists so the same idea is not called two different things on two different
pages, and so whoever writes the next Russian string does not have to re-decide.

**If you are adding or editing Russian copy, use the term in the middle column.**
Where Russian school practice accepts more than one word, the "Why this one"
column says which we picked and why; the rejected alternative is not wrong, it
is just not ours.

Scope: Russian for a Year 9–10 audience — **8–9 класс**, which is where the
Russian curriculum introduces valency, bonding and equation balancing —
following the vocabulary of Russian school textbooks rather than university
Russian.

Russian is the sixth locale and the **first written in anything but the Latin
alphabet**. Three sections below exist only because of that, and none of them is
a style preference:

- [Case government, and the device that solves it](#case-government-and-the-device-that-solves-it)
  — the overlay stores nominatives, and a Russian sentence wants six cases.
- [Counts, plurals and the 57 invariant strings](#counts-plurals-and-the-57-invariant-strings)
  — measured, not assumed.
- [Gender agreement on an interpolated noun](#gender-agreement-on-an-interpolated-noun)
  — the thing that is ungrammatical in Russian and fine in all five Latin locales.

One constraint that is **no longer** a problem, and is recorded here so nobody
reintroduces the workaround: the tap-to-explain matcher in `GlossaryTerm.tsx`
used a JavaScript `\b`, which is defined against `[A-Za-z0-9_]` and can never
find a Cyrillic word. The preparation pass replaced it with `\p{L}`/`\p{N}`
lookarounds under the `u` flag. **A Russian match word therefore works** — but it
must still be the bare standalone form, and **every inflected form the copy
actually uses has to be listed**, which in a language with six cases and three
genders means longer `matches` arrays than any previous locale needed. See
[Glossary match words](#glossary-match-words).

---

## Register and typography

| Rule | Decision |
|---|---|
| Address | Informal **ты** throughout. **Decided by the owner on 2026-09-19; no longer provisional.** Russian school textbooks mix *ты* and impersonal constructions, and formal *вы* appears mostly in exam rubrics and teacher-facing material. This site is a game: the English says "Stuck? Press the lightbulb", and *вы* turns that into an invigilator. Every imperative in the dictionary and both catalogues is second-person singular (*нажми*, *посчитай*, *соедини*). |
| Quotation marks | Russian **« … »** (ёлочки), with **no inner spaces** — unlike French. Nested quotes would be „ … “, but nothing on the site nests. `src/test-utils/i18n-russian.ts` fails on `"`, `“` and `”`, so this is enforced rather than remembered. |
| Dash | **—** (em dash, U+2014) with a space on each side, which is Russian's parenthetical and its zero-copula dash (*Вода — это H2O*). **Not** the en dash the German and French glossaries chose: Russian typography uses the em dash for both jobs, and the en dash only between numerals. |
| Hyphen vs dash | A hyphen `-` joins words (*кислотно-основная*); it is never a dash. |
| Ellipsis | **…** as a single character (U+2026). Enforced by the typography gate. |
| **ё** | **Written explicitly, everywhere.** Russian print often folds ё to е and for adult readers that is defensible; for fourteen-year-olds it is not, because ё is always the stressed vowel. *твёрдый*, *заряжённый*, *неподелённая*, *учёный*, *приведённый*. The gate lists the words this site cannot avoid. |
| Decimals | Russian **comma**: 6,02 × 10²³, not 6.02. (Prose only; code, formulae and version numbers keep their own notation, and the gate's lookbehind ignores a digit-dot-digit that follows a Latin letter.) |
| Thousands | **No-break space** (U+00A0): 1 000, not 1,000 and not 1.000. `Intl.NumberFormat('ru-RU')` produces exactly this, so never hand-format. |
| Multiplication in a worked sum | **×** (U+00D7) with a space either side: *2 × 1 + 16 = 18*. Never the letter x, which a student who has just met *x* as an unknown reads as algebra. Decided 2026-09-24, when the example cards started showing the formula-mass working. |
| Four-digit numbers | **No separator**: *5730 лет*. Russian typesetting writes four-digit numbers solid and groups from five digits on (*65 000*). |
| Non-breaking space | Before a unit (`8,0 г`), inside `и т. д.`, and between a numeral and what it counts where the pair must not break. |
| Nouns | Lower case inside a sentence — which is why `LOWERCASES_NAMES_IN_SENTENCE` is `true` for `ru` (see below). Russian capitalises far less than English: not months, not days, not nationalities, not the names of school subjects. |
| Gender of the reader | **Never inflected for.** Russian past-tense verbs and short adjectives agree with the speaker's gender, so *«ты насчитал»* is wrong for half the readers. Every such string is rewritten in the present tense or as a noun phrase — see [Adjectives, participles and past tenses that would agree with the reader](#adjectives-participles-and-past-tenses-that-would-agree-with-the-reader). |
| Element symbols | Stay **Latin** (*Na*, *Cl*, *H₂O*), even in Cyrillic prose. Element *names* are Cyrillic (*натрий*). This is Russian chemistry's own convention, not a shortcut. |

### `LOWERCASES_NAMES_IN_SENTENCE` is `true` for Russian

Russian capitalises only proper nouns, so a chemical name inside a sentence is
lower case: «две молекулы воды», not «две молекулы Воды». The map in
`src/i18n/chemistry-names.ts` is therefore `true` for `ru`, the same as English,
French, Spanish and Italian, and the opposite of German.

Checked against every call site before setting it, the way French, Spanish and
Italian each were: `nameInSentence()` is applied only to **element names** in the
Reaction Balancer catalogue and to **element and molecule names** in the Share to
Fill catalogue. Neither set contains a Roman numeral, so the naive
`.toLowerCase()` cannot turn *железо(III)* into *железо(iii)*. Species names
carrying a Roman numeral (*нитрат меди(II)*) reach the screen through
`speciesName()`, which does **not** lowercase. If a future change routes a
species name through `nameInSentence()`, that is the thing to re-check.

One extra Russian-specific reason to be sure of this: `.toLowerCase()` on a
Cyrillic string is well defined and lossless in JavaScript (`'Натрий'` →
`'натрий'`), and **Ё lowercases to ё rather than to е**, so the yo convention
above survives the call. Verified, because it is the kind of thing that would
silently fold ё on every coach line.

---

## Case government, and the device that solves it

This is the biggest structural difference between Russian and all five languages
that came before it, and it shapes dozens of strings.

**The `chemistry-names` overlay stores nominatives only.** `elementName()`,
`compoundName()`, `speciesName()` and `localizeLewisMolecule()` each return one
form: *кислород*, *гидроксид натрия*, *вода*. A Russian sentence wants whichever
of six cases the position calls for:

```
проверь кислород        accusative  — happens to equal the nominative
проверь серу            accusative  — does NOT (сера is feminine)
в воду                  accusative after в
с кислородом            instrumental after с
молекула воды           genitive
```

So a template like *«Проверь {element} ещё раз»* is right for *кислород*,
*водород*, *углерод*, *азот*, *хлор*, *натрий* and *железо*, and **wrong for
*сера*, *сурьма* and every other feminine name** the dataset can produce. It
compiles, it passes every parity gate, and it is a grammar mistake on screen —
precisely the class of bug the Italian count strings were.

**The device: put the name in a position that governs nothing.** French invented
it for its article problem, Spanish reused it for *el/la*, Italian for elision;
README § Where a placeholder may sit calls it a device rather than a workaround
for exactly that reason. It solves case government too, and for the same
underlying reason: *nothing can agree with something that is not inside the
sentence's grammar.*

Four shapes, used consistently across both catalogues:

| Shape | Example | Where it is used |
|---|---|---|
| Name, then a colon | `Потом снова проверь: {element}.` | hints, coach lines, anywhere the English has the name as a verb's object |
| Name, then a dash, then the fact | `{atom} — {count} из 8.` | coach lines, a11y labels, live-region announcements |
| A generic noun, then a colon, then the name | `Этого вещества нет в реакции: {name}.` | Challenge errors, wrong-pick feedback |
| A relative clause with the name as **subject** | `Измени вещество, в котором есть {elementInSentence}.` | Reaction Balancer coach, where English says "which compound with {element}" |

The fourth is Russian's own addition to the list, and it is worth naming: a
subject is nominative, so a `который`-clause takes any name the overlay can
supply without touching it. It reads as ordinary Russian rather than as a
translator dodging something, which the colon shapes occasionally do not.

Two consequences worth knowing:

- **`{elementInSentence}` could not keep its French treatment.** French wrote
  *« l'élément {elementInSentence} »*, leaning on every French element name being
  masculine. Russian element names are masculine (*кислород*), neuter (*железо*,
  *серебро*, *олово*, *золото*) and feminine (*сера*, *медь*, *ртуть*,
  *сурьма*, *платина*), so no article-like crutch exists and no pronoun is safe.
  The relative clause is what replaced it.
- **Prepositions are the hard failure, colons the easy one.** *в {name}*,
  *с {name}*, *из {name}* are all ungrammatical with a nominative. There is no
  such construction left in the Russian copy: every one was rewritten. If a new
  English string puts a name after a preposition, it needs one of the four
  shapes above before it can be translated.

### Nothing structural was left unresolved

Every interpolation of a chemistry name in the dictionary and both catalogues
was audited one at a time against this rule. None of them needed a template
change in the English source, and none had to be left awkward. The shapes above
were enough.

---

## Counts, plurals and the 57 invariant strings

### Measured, not assumed

```js
new Intl.PluralRules('ru').resolvedOptions().pluralCategories
// → ['one', 'few', 'many', 'other']
```

| n | 0 | 1 | 2 | 3 | 4 | 5 | 11 | 20 | 21 | 22 | 25 | 101 | 102 | 1,5 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| category | many | one | few | few | few | many | many | many | one | few | many | one | few | **other** |

Three things fall out of that table, all of which the Russian copy depends on:

- **`other` is reachable only through a fraction.** Every integer is `one`, `few`
  or `many`. `other` is still required — it is the type's only mandatory form and
  the runtime fallback — and `requiredPluralCategories()` in `i18n-parity.ts`
  adds it unconditionally for exactly this reason. Its Russian wording should
  match `few`, because that is what a fraction takes (*1,5 связи*).
- **0 is `many`, not `one`.** French's *0 solitaire* singular has no Russian
  counterpart: *0 связей*, genitive plural.
- **The categories are the case the numeral governs.** `one` → nominative
  singular (1 связь), `few` → genitive singular (2 связи), `many` → genitive
  plural (5 связей). Writing a plural record in Russian is therefore not
  "pick three wordings", it is "decline the noun three ways", and it is
  mechanical once you see it that way.

Never hand-roll a modulo. `Intl.PluralRules` already encodes the 11–14 exception
(*11 связей*, not *11 связь*), which is the single most common mistake in
hand-written Russian pluralisation.

### The 57 that are not plural records

`src/i18n/count-strings.test.ts` pins 57 strings that interpolate a number and
are **not** plural records. Each one has exactly one form, and that form has to
be right at 1, at 2 and at 25. This is the hardest single constraint in the
Russian pass, because Russian is the first locale where the usual escape hatches
do not work: a Romance language can often dodge with an infinitive, and Russian
numerals govern case as well as selecting one of three plural forms.

**All 57 were worked through before any prose was translated**, and all 57 are
phrasable invariantly. None needed to become a plural record, and none needed an
English template change. Four patterns cover the set:

| Pattern | Shape | Example |
|---|---|---|
| **Numeral last, after a colon** | `<label>: {count}` | «Верно: {count}», «Слева не хватает: {count}» |
| **Numeral between two other numbers** | `{a} / {b}`, `{a} из {b}` | «Уровень {level} из {max}», «Подсказка {tier} из 3» |
| **Numeral after a noun it does not govern** | `<noun> {n}` | «Уровень {level}», «Волна {wave}/3», «Шаг {step} из {total}» |
| **Numeral governed by a preposition, not by a noun** | `на {k}`, `+{points}` | «Сокращено на {k}», «Бонус без подсказок +{points}» |

The second pattern is the one that does most of the work and is worth stating as
a rule: **a Russian numeral governs the noun that follows it, so a numeral with
no noun after it governs nothing.** «Уровень 1 из 5», «Уровень 2 из 5»,
«Уровень 25 из 40» are all correct, because *уровень* precedes the numeral and
*из 5* is a preposition phrase, not a counted noun. This is why the site's
progress readouts translate almost for free while «{count} correct» does not.

Three worth calling out individually, because the naive Russian is wrong:

| Key | English | Naive Russian (**wrong**) | Shipped Russian |
|---|---|---|---|
| `games.overlay.statRoundValue` | `{count} correct` | *{count} верных* — wrong at 1 (*верный*) and at 2 (*верных* vs *верных ответа*) | «Верно: {count}» |
| `serverMessages.aliasLength` | `must be between {min} and {max} characters` | *от {min} до {max} символов* — wrong at 21 (*до 21 символа*) | «Длина псевдонима в символах: от {min} до {max}.» |
| `lewis-structures:inspect.countWrong` | `You counted {given}; there are {actual}` | *ты насчитал {given}* — agrees with the **reader's** gender, not the count | «Твой ответ: {given}, а на самом деле {actual}.» |

The third is the one that generalises: in Russian, a count string can be wrong
for a reason the count has nothing to do with.

### The plural records themselves

There are few, and they are listed here so the next change to them is deliberate.

| Where | Key | Russian forms |
|---|---|---|
| dictionary | `cheatSheets.count` | {count} тема / {count} темы / {count} тем / {count} темы |
| lewis | `coach.loners` | неспаренный электрон / неспаренных электрона / неспаренных электронов / неспаренного электрона — masculine, so `one` takes «остался» and the rest «осталось» |
| lewis | `counts.sharedPairs`, `counts.lonePairs`, `counts.bonds` | общая пара / пары / пар; неподелённая пара / пары / пар; связь / связи / связей |
| lewis | `hint.inspectTier3CountBonds`, `…CountLonePairs` | … (with «Их {count}» rather than an English-style "There is/are") |
| balancer | `card.clustersA11y` | молекула / молекулы / молекул |

`cheatSheets.count.one` was briefly written «одна тема», on the argument that
the grid only ever shows twelve topics so the `one` category's numeral is
always literally one. **The placeholder gate refused it**, because a
translation may not drop a placeholder the English source has — and the gate
was right twice over: «{count} тема» is correct at 1, at 21 and at 101, and the
prettier wording would have been silently wrong the day a thirteenth sheet was
added. Worth recording as the one place where a gate overruled a deliberate
translation choice and improved it.

---

## Gender agreement on an interpolated noun

A template that embeds a chemical name may need an adjective or a past-tense verb
to agree with it. `"{compound} is correct"` works in all five Latin-script
locales — Romance adjectives agree, but the three Romance locales all reach for
the colon label anyway — and is simply ungrammatical in Russian, where
*вода готова*, *кислород готов* and *железо готово* are three different words.

Every interpolated string was audited. The findings:

- **No adjective or participle anywhere in the Russian copy agrees with an
  interpolated name.** Where the English has one, the Russian uses a noun
  predicate, a colon label or an impersonal construction: «{name} — готово» is
  avoided in favour of «Готово: {name}» or «{name}: всё верно».
- **No past-tense verb takes an interpolated name as its subject.** Russian past
  tenses agree in gender and number with the subject, so this is the same bug in
  a different part of speech. The present tense and the impersonal do not agree,
  and both were used.
- **The reader is never the subject of a past tense either** — see the register
  table. This is a separate problem with the same shape and it bit harder,
  because it applies to strings with no placeholder in them at all.

### Adjectives, participles and past tenses that would agree with the reader

Italian rewrote these strings because a Romance participle agrees with the
speaker; Spanish used collective nouns; Russian's own device is the **present
tense and the verbal noun**.

| English | Not this | This |
|---|---|---|
| Ready for your first result? | *Готов к первому результату?* (masc. only) | «Готов сыграть первый раунд?» → rewritten as «Первый результат ещё впереди» |
| You counted {given} | *Ты насчитал {given}* | «Твой ответ: {given}» |
| Splendid work, Researcher! You cleared all levels. | *Ты прошёл все уровни* | «Все уровни пройдены.» (impersonal passive) |
| Logging out… | — | «Выходим…» (first person plural, gender-free) |

The impersonal passive (*пройдены*, *сохранено*, *разобрано*) is the workhorse
here. It is also the register a Russian game actually uses, so this is not a
compromise.

---

## Glossary match words

The matcher is Unicode-safe now, so a Cyrillic match word works. Two rules still
bind, and the second is what makes Russian expensive:

1. **A match word must be the bare standalone form**, starting and ending with a
   letter. `game-messages.test.ts` asserts it for every locale.
2. **Every inflected form the copy actually uses must be listed.** The matcher
   does not stem. Russian nouns have twelve slots (six cases × two numbers) and
   adjectives far more, so a term that appears in three cases across the
   catalogue needs three entries.

In practice the lists run two to three times longer than the German ones. The
rule followed here: list the forms **the copy uses**, verified by the
"cover the running text" assertion in `game-messages.test.ts`, not every form the
grammar allows. A list of every theoretical form is unmaintainable and the test
cannot tell it from a correct one.

Worth noting what Russian does **not** suffer from: French lost whole phrases
because they began with *é*, and Italian could not use *elettronegatività*
because it ends in an accent. Neither constraint exists any more, and neither
would have applied to Cyrillic even under the old rule's spirit. The Russian
lists are long for a grammatical reason, not a technical one.

---

## Core chemistry terms

| English | Russian (use this) | Why this one, and what we rejected |
|---|---|---|
| acid | **кислота** | — |
| base | **основание** | **Not *база***, which in Russian means a base of operations or a database and is not the chemistry word. This is the trap English–Russian sets that none of the Latin locales had. |
| basic / alkaline | **основный / щелочной** | Both are taught. *Основный* describes the class (*основные оксиды*); *щелочной* describes the solution. Note *основнЫй* (chemistry) vs *оснОвный* (principal) differ only in stress — unavoidable, and school texts live with it. |
| alkali (the substance) | **щёлочь** | A soluble base. Not interchangeable with *основание*: NH₃ and an insoluble hydroxide are bases and not щёлочи. |
| neutral | **нейтральный** | — |
| amphoteric | **амфотерный** | — |
| pH | **pH** | Written in Latin in Russian chemistry, exactly as here. *Водородный показатель* is the full term and appears once, on the acids sheet, as a gloss. |
| indicator | **индикатор** | — |
| neutralisation | **нейтрализация** | — |
| proton donor / acceptor | **донор / акцептор протонов** | The Brønsted–Lowry pair as Russian textbooks write it. |
| hydronium ion (H₃O⁺) | **ион гидроксония** | *Гидроксоний* is the Russian school term. *Гидроний* is an anglicism that appears in translated material and is not what a Russian textbook prints. |
| strong / weak acid | **сильная / слабая кислота** | — |
| concentrated / dilute | **концентрированный / разбавленный** | — |
| salt | **соль** | — |
| solution | **раствор** | — |

## Substances and structure

| English | Russian (use this) | Why this one, and what we rejected |
|---|---|---|
| substance | **вещество** | The general word, and the one the Challenge picker uses. |
| compound | **соединение** | *Вещество* is broader and is used where the text means "a substance" rather than "a compound specifically". |
| molecule | **молекула** | — |
| element | **элемент** | — |
| atom | **атом** | — |
| ion | **ион** | — |
| cation / anion | **катион / анион** | — |
| polyatomic ion | **многоатомный ион** | *Сложный ион* also occurs; *многоатомный* is transparent and matches the English. |
| state of matter | **агрегатное состояние** | — |
| solid / liquid / gas | **твёрдый / жидкий / газообразный** | Note **твёрдый**, with ё. The gate enforces it. |
| aqueous | **водный раствор** / «растворённый в воде» | — |
| precipitate | **осадок** | — |
| lattice | **решётка** (кристаллическая, ионная, металлическая) | Note ё. |
| covalent bond | **ковалентная связь** | The standard Russian school term, unlike German, which prefers *Atombindung* over the Latin form. |
| ionic bond | **ионная связь** | — |
| metallic bond | **металлическая связь** | — |
| valence electrons | **валентные электроны** | — |
| outer electron | **внешний электрон** | The transparent everyday word, used in the game's running text; *валентный электрон* stays the formal term and the two are glossed together. |
| lone pair | **неподелённая электронная пара** | The Russian school term. Short form *неподелённая пара* where the sentence has already said "electron". Note ё. *Свободная электронная пара* is the other term in circulation and is **rejected** — see the loner note below for what it would have cost. *Одинокая пара* is a calque of the English and is not Russian chemistry. |
| bonding pair / shared pair | **общая электронная пара** | Short form *общая пара*. The Share to Fill game says "shared pair" where a textbook says "bonding pair"; both are *общая электронная пара*. Do not introduce a second word (*связывающая пара*) for the same thing. |
| unpaired electron (formal term) | **неспаренный электрон** | The Russian textbook term, the one used when teaching radicals. Use it in the glossary, on the cheat sheets and anywhere the text is explaining rather than instructing. |
| ~~the game's "loner" (game word)~~ | **dropped 2026-09-19 — use *неспаренный электрон*** | The game used to give this concept two names: the textbook term above and an invented game word, *одиночка*, with a third word, *соло*, as the short label on a pulsing dot. **That scheme was abolished on 2026-09-19.** There is now one term per language and it is the formal one, used in the hub line, every coach line, every hint, the glossary and the canvas legend. The reasoning that produced *одиночка* is kept in the section below so that nobody re-proposes it, and the collision warnings in that section are still true — they bind any *new* wording chosen near this term, not just the nickname they originally decided. |
| the Level 1 canvas legend | **неспаренный электрон** | The same formal term, naming the pulsing dot once beside a sample of it, above the board. **Russian no longer needs a third word.** The 44 px that ruled out every transparent Russian rendering (*непарный* 59, *без пары* 51, *не в паре* 52, *одинок* 44 but colliding with *одинокая пара*) was the budget for a label stamped beside *each* dot 50 px from its neighbour — not a limit on the term's length. There is no such label any more, and *неспаренный электрон* renders 134 px on a 312 px line at 360 px viewport with room to spare. Present at Level 1 and off from Level 2. |
| octet (eight outer electrons) | **октет** | *Правило октета* is standard from 8 класс. |
| duet (hydrogen's two) | **дублет** | **Russian sits with German, not with French.** French has *la règle du duet* in its national programme; Russian school chemistry has **no settled word at all** — it says «завершённый внешний уровень, как у гелия» or nothing. *Дублет* is a real Russian scientific word meaning a pair (спектральный дублет), so it is transparent and it is not a coinage. **Rejected: *дуэт*** — the direct calque of the English and German word, which in Russian reads purely musical and would be the only jokey term in a serious glossary. **Rated low.** A teacher may well prefer to drop the word and say «два электрона, как у гелия». |
| single / double / triple bond | **одинарная / двойная / тройная связь** | **одинарная**, not *одиночная* — a real and common mistake, and one reason *одиночный* could not be the loner word. |
| bond-line drawing | **структурная формула** | — |
| Lewis structure | **формула Льюиса** | Russian also says *электронная формула* and *структура Льюиса*. Picked *формула Льюиса* because it is transparent, names the person the sheet names, and pairs with *структурная формула* without collision. |
| dot structure | **точечная формула** | Used once, in the canvas a11y label. |
| octet rule | **правило октета** | — |
| formal charge | **формальный заряд** | — |
| electronegativity | **электроотрицательность** | Long (21 letters) but there is no alternative; it appears in prose only, never in a fixed-width control. |
| delocalised electrons | **свободные электроны** | The school phrasing for the "sea" in a metal (*электронный газ* is the other). The literal *делокализованные электроны* is upper-secondary register. **And this is the second reason *свободный* could not be the game's word for a loner**: it already means something else, and something a student meets on the bonding sheet. |
| particle | **частица** | Added 2026-09-25 for the States of Matter diagrams. |
| melting / boiling (a heating curve's plateaus) | **плавление / кипение** | As in the sheet's table of phase changes. Added 2026-09-25 for the States of Matter diagrams. |
| heating curve | **кривая нагревания** | Matches the sheet's section heading. Added 2026-09-25 for the States of Matter diagrams. |
| energy added (a graph's axis) | **полученная энергия** | Russian school physics speaks of the heat a body *receives* (*количество теплоты, полученное телом*). *Добавленная энергия* is a calque. Added 2026-09-25 for the States of Matter diagrams. |
| solid / liquid / gas as nouns in prose | **твёрдое тело / жидкость / газ** | The textbook nouns, used in the section *Частицы в разных агрегатных состояниях*. The diagram labels keep the adjectives *твёрдое / жидкое / газообразное*, which match the sheet's takeaways. Added 2026-09-25 for the States of Matter diagrams. |
| VSEPR shapes: linear, trigonal planar, tetrahedral, trigonal pyramidal, bent | **линейная форма, плоский треугольник, тетраэдр, тригональная пирамида, уголковая форма** | Added 2026-09-25 with the Lewis sheet's shape diagram (`lewis-structures/02-vsepr-shapes`). Russian names a shape by the figure (*молекула имеет форму тетраэдра*), and these are the words the sheet's paragraph already used. **Bent is *уголковая*, not *угловая***: both are in school books; the paragraph directly above the drawing says *уголковая*, so the drawing does too. The acronym VSEPR is not used on a Russian page (*теория отталкивания электронных пар* if it must be named). Angles: *109,5°*. |
| bond angle | **валентный угол** | Added 2026-09-25. The school term; *угол связи* is a calque. |
| wedge / hashed wedge (a bond towards / away from the viewer) | **сплошной клин / штрихованный клин** | Added 2026-09-25, for alt text. |
| lone-pair lobe (in a VSEPR drawing) | **электронное облако** | Added 2026-09-25, for alt text: Russian school books draw a lone pair as an *облако*, the word the atom sheets already use for electrons. |

### The “loner”: Russian's own two-tier pair, and the four words it could not use — historical, and why it is kept

> **This scheme was abolished on 2026-09-19.** The game no longer has a game
> word, a formal term and a dot label: it has ***неспаренный электрон*** and nothing else,
> in the hub line, every coach line, every hint, the glossary and the canvas
> legend. Nothing below is current practice.
>
> It is kept for two reasons. First, so that the rejected candidates stay
> rejected — every one of them was ruled out for a stated reason, and a future
> pass that re-proposes one should have to answer that reason. Second, and more
> important, because **the collisions recorded below are facts about Russian,
> not facts about the old nickname.** They bind any *new* wording chosen
> anywhere near this term, which is why they are repeated in the term table
> above rather than living only here.


> **Everything from here to the end of this section is history, kept on
> purpose.** It describes the two-tier naming scheme the site used until
> 2026-09-19. That scheme no longer exists: there is one term per language and
> it is the formal one. Read on for *why each candidate was rejected* — those
> constraints still bind any new wording near this term — not for what the
> product says today.

English used to give an unpaired outer electron two names — the formal
*unpaired electron* and the game's own *loner* — and taught the pair, with the
game word fading out as a scaffold (Level 1 labels the dots, Level 2 does not).
German mirrored that split with *Einzelelektron*; French with *solitaire*;
Spanish with *impar*; Italian with *dispari*.

Every one of those languages was constrained by what it already calls a **lone
pair**, and Russian is no exception — but it is constrained differently, and the
difference is the whole reason it could not calque any of the five.

| Role | English | German | French | Spanish | Italian | **Russian** |
|---|---|---|---|---|---|---|
| Formal term — glossary, cheat sheet, explaining | unpaired electron | ungepaartes Elektron | électron célibataire | electrón desapareado | elettrone spaiato | **неспаренный электрон** |
| ~~Game word — hub, coach, hints~~ *(dropped 2026-09-19)* | ~~loner~~ | ~~Einzelelektron~~ | ~~solitaire~~ | ~~impar~~ | ~~dispari~~ | ~~**одиночка**~~ |
| ~~Short label on a dot~~ *(now a single legend, see README)* | ~~loner~~ | ~~einzeln~~ | ~~seul~~ | ~~impar~~ | ~~dispari~~ | ~~**соло**~~ |

**The four words Russian could not use, and why.**

- ***свободный***. The obvious first reach, and doubly blocked: *свободная
  электронная пара* is a live synonym for a **lone pair**, and *свободные
  электроны* are the **delocalised** electrons in a metal, which is on the
  bonding sheet this game links to. This is precisely the trap Spanish hit with
  *libre* and Italian with *libero*, arrived at independently.
- ***одинокий***. *Одинокая пара* circulates as a calque of *lone pair* in
  translated material. Spanish rejected *solitario* for the identical reason.
- ***одиночный***. One letter and one suffix away from **одинарная связь**
  (single bond), which the same game teaches three levels later. A student who
  learns *одиночный электрон* in Level 1 and meets *одинарная связь* in Level 3
  has been set up to confuse them.
- ***непарный***. This is the closest Russian counterpart to Spanish *impar* and
  Italian *dispari* — the everyday "unmatched" word, as in *непарный носок* —
  and it was the runner-up. It lost for a reason neither Spanish nor Italian
  had to weigh: *непарный* and the formal *неспаренный* share the root *пар-*
  and differ by one prefix and one suffix. The English pair is *loner* /
  *unpaired electron*, two visibly different words, and the whole point of the
  two-tier design is that a student can see they are two names for one thing.
  *Непарный* / *неспаренный* does not read as two names; it reads as one word
  spelled two ways. It would collapse the scaffold rather than build it.

**Why *одиночка*.**

- It is a **noun**, which is what the coach lines need. They say the word three
  times a sentence and they count it: *одна одиночка, две одиночки, пять
  одиночек*. An adjective would need a head noun every time or would have to be
  nominalised, and a nominalised *непарный* in a game aimed at fourteen-year-olds
  reads as clipped textbook Russian.
- It is **morphologically unrelated to *пара***, so the game word and the formal
  term look like two different words, which is the design.
- It is **concrete and already general**. *Одиночка* is not only a person-word
  the way German's *Einzelgänger* is: Russian applies it freely to things
  (*камера-одиночка*, *лодка-одиночка*), so it carries "the one that is on its
  own" without dragging in a personality. That is exactly the distinction German
  could not find and had to abandon *Einzelgänger* over.
- It **counts and declines**, which the canvas label cannot make use of but
  every coach line can.

**The dot label is *соло*, not *одиночка*, and that was measured rather than
preferred.** The canvas centres the label under its dot, and in H2 the two dots
sit 50 px apart. At `text-[9px]` uppercase, *одиночка* renders **59 px** and the
two labels overlap by 9 px — on screen it reads «ОДИНОЧКАДИНОЧКА». The other
five locales fit because their words are short: *loner* 32 px, *impar* 33,
*dispari* 40, *einzeln* 41. The real budget is about **44 px**, and Russian has
no transparent one-word rendering of the concept inside it: *непарный* is 59,
*без пары* 51, *не в паре* 52, and *одинок* is exactly 44 but collides with
*одинокая пара*, which is the word this glossary already rejected.

So Russian does what German did — a different, shorter word on the dot —
rather than what Spanish and Italian did. **Соло** is 28 px, it is a word every
Russian fourteen-year-old uses (*играть соло*), it means precisely "on its own",
and unlike every adjective available it collides with no chemistry term. The
cost is that it shares no root with *одиночка* the way *einzeln* shares one with
*Einzelelektron*, so the label teaches the concept rather than the word; the
coach line and the glossary carry the game word, and the label is a Level 1
scaffold the brief removes at Level 2 anyway.

**Worth writing down for the next non-Latin locale:** a dot label must render at
**44 px or less at `text-[9px]` uppercase**. Measure it in the browser before
choosing the word — the unit gates cannot see this, and the two labels overlap
rather than wrap, so it is invisible in any text-only check.

**Rated low, and flagged for a native speaker and a chemistry teacher.** It is a
coinage in the sense that no Russian textbook uses it for this; it is not a
coinage in the sense that every Russian speaker already knows the word. The
formal term beside it (*неспаренный электрон*) is not in doubt.

## Atomic structure, the periodic table and radioactivity

Added 2026-09-21, when *Atoms, Isotopes & the Periodic Table* split into
*Atoms & the Periodic Table* (Year 9) and *Isotopes & Radioactivity* (Year 10).
The first rows were already in use on the Russian atomic-structure sheet and are
recorded here so the next writer does not re-decide them; the rest are new with
the split.

| English | Russian (use this) | Why this one, and what we rejected |
|---|---|---|
| periodic table | **периодическая таблица** | *Таблица Менделеева* is what everybody in Russia actually says and *Периодическая система химических элементов* is the formal name. The sheet uses *периодическая таблица* because it is what the existing Russian overlay used and it reads neutrally to a reader outside Russia. |
| atomic number | **атомный номер** | *Порядковый номер* is the standard Russian school term and is arguably the better one. **The sheet already shipped with *атомный номер***, so that is what this table records; changing it means changing both sheets and the review file together, not one sentence. **Rated medium** for that reason, not because the term is wrong. |
| mass number | **массовое число** | — |
| energy level | **энергетический уровень** | The sheet says *level*, not *shell*, deliberately. See the next row. |
| electron shell (the curriculum's word) | **электронная оболочка** | VC2S10U07 says "electron shells", so the sheet names *оболочка* once as the word the reader's teacher uses, and keeps *энергетический уровень* as its own term. Since 2026-09-25 the sentence credits the word to the teacher alone (*Учитель может называть их электронными оболочками*); it no longer mentions the программа. |
| outer level / outer shell | **внешний уровень** | Consistent with *энергетический уровень*. |
| Bohr model | **модель Бора** | Named as a *model* every time, per the sheet's own contract. Note the genitive: *модель Бора*, never *модель Бор*. |
| isotope | **изотоп** | — |
| group (a column) | **группа** | The sheet always writes *группа 1*, *группа 17*, never a bare *группа*. Russian numbers the groups with Arabic numerals here rather than the older Roman-numeral-plus-letter system, because that is what the periodic table in the rest of the site shows. |
| valence electrons from the group number | **последняя цифра номера группы** (*Cl в группе 17 — 7 валентных электронов*), once with *в короткой таблице это VII группа* | Added 2026-09-25. Russian schools still teach from the short table (groups I–VIII with main and secondary subgroups), where the group number itself is the valence-electron count of a main-subgroup element. The site shows groups 1–18, so the bonding and Lewis sheets state the last-digit rule, and the bonding sheet names the short-table group once as the bridge to the textbook. *Главная подгруппа* is kept: it is the term a Russian student knows for main-group elements. |
| period (a row) | **период** | Collides with *период полураспада* below; the sheet never uses the bare word for the half-life. |
| metal | **металл** | Two л. |
| non-metal | **неметалл** | One word, no hyphen. |
| metalloid | **полуметалл** | *Металлоид* is also current in Russian and means the same thing. *Полуметалл* is picked because it is transparent and because *металлоид* has a second, older sense (non-metal) in some languages a bilingual reader may carry. **Rated medium.** Marked on the sheet as an extension in any case: the curriculum says only "metallic and non-metallic properties". |
| alkali metal | **щелочной металл** | — |
| halogen | **галоген** | — |
| noble gas | **благородный газ** | *Инертный газ* is the older Russian school term and is still common; *благородный* is the current one and matches the other five locales. **Rated medium.** |
| atomic size / atomic radius | **атомный радиус** | *Размер атома* is the everyday phrase and is used once in running prose. |
| reactivity | **химическая активность** | Not *реакционная способность*, which is correct but is upper-secondary register. *Активность* alone is ambiguous on this sheet, because it also means radioactive activity — so the adjective is not optional here. |
| alkaline earth metal | **щёлочноземельный металл** | With **ё**, per the typography rule at the top of this file. Added with the interactive periodic table, whose *Семейства* mode names all ten families. |
| transition metal | **переходный металл** | — |
| lanthanide | **лантаноид** | *Лантанид* is the older Russian form and is still met; *лантаноид* is what current textbooks print, and it matches the IUPAC-aligned choice made for German. **Rated medium.** |
| actinide | **актиноид** | Same decision as *лантаноид*. |
| picometre (pm) | **пикометр (пм)** | **The unit symbol is Cyrillic here**, unlike the element symbols: Russian writes *пм*, not *pm*, and the widget's *Размер атома* legend uses *пм*. This is the one place on the site where a unit symbol is not left in Latin, and it is not an oversight. |
| radioactive decay | **радиоактивный распад** | Verb: *распадаться*. Note **распад**, not *разложение*, which is chemical decomposition. |
| alpha particle | **альфа-частица** | Written out rather than as α, with a hyphen, as Russian compounds it. |
| beta particle | **бета-частица** | — |
| beta decay | **бета-распад** | Added 2026-09-25, for how reactors make neptunium and plutonium. Hyphenated like *бета-частица*. |
| gamma radiation | **гамма-излучение** | *Излучение*, not *луч*: gamma is radiation, not a particle. |
| shielding gamma ("reduces, never stops") | **ослаблять**: *свинец или толстый бетон лишь сильно его ослабляют* | Added 2026-09-24. *Ослабление гамма-излучения* is how Russian school physics puts it; alpha and beta keep *задерживать*. |
| half-life | **период полураспада** | The standard term. Long, but there is no short form. |
| synthetic element / made element | **искусственно полученный элемент** | Or *искусственный элемент* where the sentence needs it shorter. Not *синтетический*, which in Russian suggests a manufactured material. |
| radiocarbon dating | **радиоуглеродное датирование** | *Датирование*, not *датировка*: the first is the method, the second is the resulting date. |
| optically stimulated luminescence (OSL) | **оптически стимулированная люминесценция (ОСЛ)** | The established Russian term, and the abbreviation is Cyrillic — ОСЛ, not OSL — because Russian archaeology writes it that way. **Rated low** — a specialist dating method, rare in Russian school material, and the abbreviation in particular deserves a check. |
| electron cloud (diagram label) | **электронное облако** | Added 2026-09-25 with the redrawn atom diagrams. The standard school term. |
| not to scale (diagram caveat) | **Масштаб не соблюдён**, and the ratio as **в 100 000 раз меньше атома по диаметру** | Added 2026-09-25 with the redrawn atom diagrams. Localised, not translated: a Russian textbook writes a ratio as *в N раз меньше*, not as a fraction *1/100 000*, and *по диаметру* says what is compared (by volume the ratio is about 10⁻¹⁵). *Не в масштабе* is a calque. |
| the counting-model caveat (05) | **Схема для подсчёта электронов, а не рисунок атома.** | Added 2026-09-25 with the redrawn atom diagrams. *Схема* is the word Russian textbooks use for exactly this kind of drawing (*схема строения атома*), so it says "model, not picture" without a second noun. |
| heavier, but first / lighter, but second (06) | **тяжелее, но стоит первым** / **легче, но стоит вторым** | Added 2026-09-25 with the redrawn atom diagrams. *Стоять* for a place in the table. *Первым / вторым* agree with *теллур* and *иод*, not with the reader. |
| atomic number in the diagrams | **атомный номер** | Added 2026-09-25 with the redrawn atom diagrams. The review brief suggested *порядковый номер*; the row above keeps *атомный номер* until both sheets change together, and a diagram label that disagreed with its own heading would be worse than either term. |
| a cell of the periodic table | **клетка** (*клетка теллура*) | Added 2026-09-25 with the redrawn atom diagrams. |
| hydrogen-1, -2, -3 (03) | **водород-1**, **водород-2**, **водород-3** | Added 2026-09-25 with the redrawn isotope diagrams. Cyrillic with the number after a hyphen, per the typography note below. |
| protium / deuterium / tritium (03) | **протий** / **дейтерий** / **тритий** | Added 2026-09-25 with the redrawn isotope diagrams. Printed under the mass-number name. In a Russian textbook these names come first — *изотопы водорода: протий, дейтерий, тритий* — so they matter more here than in any other locale. |
| stable / radioactive, of one isotope (03) | **стабильный** / **радиоактивный** | Added 2026-09-25 with the redrawn isotope diagrams. Full adjectives, agreeing with *водород*; the short form *радиоактивен* would be a sentence, not a label. |
| undecayed nuclei (07, vertical axis) | **нераспавшиеся ядра** | Added 2026-09-25 with the redrawn isotope diagrams. The quantity Russian physics plots in the decay law (*число нераспавшихся ядер N(t)*). Replaces "how much is left", which suggests the sample disappears. |
| time in half-lives (07, horizontal axis) | **время в периодах полураспада** | Added 2026-09-25 with the redrawn isotope diagrams. Localised, not translated: a Russian axis says *величина в единицах*, as a German one does. |

**Typography on this pair of sheets.** Two things recur and both are easy to
get wrong inside an English-shaped file. Large round numbers take a
non-breaking space and not a comma, so the English "65,000 years" is
*65 000 лет* and "50,000" is *50 000*. And a half-life written as a decimal
takes a comma: uranium-238 is *4,5 миллиарда лет*, never *4.5*. Isotope names
are Cyrillic with the number after a hyphen — *углерод-14*, *радон-222* — while
the symbol in a formula stays Latin, exactly as `C-14` and `Rn-222` do in the
`formulaExamples` this file never touches.

## Formulae, equations and naming

| English | Russian (use this) | Why this one, and what we rejected |
|---|---|---|
| chemical formula | **химическая формула** | — |
| molecular formula | **молекулярная формула** | — |
| empirical / ionic formula | **простейшая формула** | Russian does not draw German's *Verhältnisformel* / *Molekülformel* distinction as sharply; the `chemical-formulas` sheet teaches the ionic case explicitly instead. |
| subscript (the small number in a formula) | **индекс** | The English "subscript"/"coefficient" contrast becomes **индекс**/**коэффициент**, which is exactly the distinction the balancing topic turns on, and both are the standard Russian school words. Convenient: no false friend, unlike French, where *indice* also means a clue. |
| coefficient (stoichiometric) | **коэффициент** | — |
| to balance an equation | **уравнять** (уравнение, реакцию) | The verb the site uses throughout. Russian school more often says «расставить коэффициенты», which is fuller and is used in the instructions and the guided steps where there is room; *уравнять* is what the short strings and the success label need, and the two must not drift — *уравнять* is the decided term and *расставить коэффициенты* is its expansion, never a second concept. |
| balanced (the success label) | **уравнено** | Impersonal, so nothing agrees with it. *Уравнение уравнено* is tautological and was rejected. |
| conservation of mass | **закон сохранения массы** | — |
| reactants | **реагенты** | *Исходные вещества* is the fuller school term and is used once, in the instructions, where the concept is introduced. **Picked *реагенты* as the term** because it pairs with *продукты*, and because *исходные вещества* is seventeen characters and will not fit a column heading or a picker tab — the same reasoning German used to pick *Edukte* over *Ausgangsstoffe*. |
| products | **продукты** | — |
| reaction arrow | **стрелка реакции** | — |
| atom ledger (the game's own name for the tally table) | **баланс атомов** | Names what the table shows and pairs with *уравнять*. *Таблица атомов* was rejected as saying nothing. Note this is why *баланс* is **not** available as the game's title — see the titles table. |
| lowest terms | **простейший вид** | «Сократить» is the act (*сокращено на 3*); *простейший вид* is the state. |
| word equation | **описание реакции словами** | Used in the Challenge level; the game shows the description as prose rather than naming it, so this term appears only in the glossary and the cheat sheet. |
| state symbol | **обозначение состояния** | The symbols themselves — (s), (l), (g), (aq) — stay Latin. |
| synthesis | **соединение** (реакция соединения) | The Russian class name. Note the collision with *соединение* meaning "a compound": Russian genuinely uses one word for both, and the badge is unambiguous in context because it sits above an equation. Flagged in `ru-review.md`. |
| decomposition | **разложение** | — |
| combustion | **горение** | — |
| single / double displacement | **замещение / обмен** | The Russian school names: *реакция замещения* and *реакция обмена*. Not a calque of "single/double" — Russian does not build the pair that way, and inventing *одинарное замещение* would be wrong. |
| precipitation reaction | **осаждение** | — |
| acid–base reaction | **кислотно-основная** | Hyphen, not dash. |
| oxidation / reduction | **окисление / восстановление** | — |
| redox | **окислительно-восстановительная** | Thirty characters, and the badge is CSS-uppercased — the longest string in the file that sits in a fixed-width control, so it is the one to re-check on the rendered card at 360 px. *Редокс* exists in Russian (*редокс-реакция*) and would have been five characters, but it is laboratory jargon rather than school vocabulary, and the other seven badges are all the words a textbook prints. |
| oxidising agent | **окислитель** | — |
| name order vs formula order | formula **cation first**, name **anion first**: *хлорид натрия*, NaCl | Added 2026-09-25. The English common mistake "writing the anion first because it sounds first" was removed, since in English the cation is said first. In Russian the trap is real, but an overlay must keep the English list lengths, so the point lives in takeaway 2 of *Writing Ionic Formulas* instead. |

## The mole and stoichiometry

| English | Russian (use this) | Why this one, and what we rejected |
|---|---|---|
| amount of substance (n) | **количество вещества** | — |
| mole | **моль** | Masculine: *один моль*, *два моля*, *пять молей*. |
| Avogadro's number | **постоянная Авогадро** | The modern term. *Число Авогадро* is still common and is not wrong; *постоянная* matches the symbol N_A being a constant. |
| relative atomic mass | **относительная атомная масса** | — |
| molar mass (M) | **молярная масса** | — |
| concentration | **концентрация** | — |
| limiting reagent | **реагент в недостатке** | Also seen: *лимитирующий реагент* (a loan), *вещество, взятое в недостатке* (the full school phrase). Picked the middle form because it reuses *реагент*, already fixed above. |
| in excess | **в избытке** | — |
| theoretical / actual yield | **теоретический / практический выход** | Russian says *практический*, not *фактический*, for the measured yield. |
| percentage yield | **выход в процентах** | — |
| significant figures | **значащие цифры** | Added 2026-09-25. The stoichiometry sheet phrases the rule as *столько значащих цифр, сколько их в наименее точном из данных значений*, not a fixed three. Russian school chemistry drills this less than the English-speaking systems do, but the term and the rule are the physics-class ones. **Rated medium.** |
| the VCE data book | **withheld** | Added 2026-09-25. It is one Australian exam's booklet (the sheets had called it *справочник VCE*). The IR sentence now points to *таблицы ИК-спектроскопии*, and the polyatomic-ion table is headed *Основные многоатомные ионы*. |

## Organic chemistry

| English | Russian (use this) | Why this one, and what we rejected |
|---|---|---|
| functional group | **функциональная группа** | — |
| homologous series | **гомологический ряд** | — |
| hydrocarbon | **углеводород** | — |
| alkane / alkene / alkyne | **алкан / алкен / алкин** | — |
| haloalkane | **галогеналкан** | — |
| alcohol | **спирт** | *Алкоголь* in Russian means the drink, not the class. A real false friend. |
| aldehyde / ketone | **альдегид / кетон** | — |
| carboxylic acid | **карбоновая кислота** | — |
| ester | **сложный эфир** | Two words, and it must be both: *эфир* alone means an ether (*простой эфир*) or the airwaves. Russian names esters *метилацетат*, *этилацетат* — the alkyl group first, then the acid residue, which is the opposite order from German's *Essigsäureethylester* and the same order as the English "-oate" pattern. |
| amine / amide | **амин / амид** | — |
| esterification | **этерификация** | Note the spelling: *этерификация*, not *эстерификация*. |
| hydrolysis | **гидролиз** | — |
| substituent | **заместитель** | — |
| chain (carbon chain) | **цепь / углеродная цепь** | — |
| locant (position number) | **номер** / **цифра положения** | Prose uses *номер* at this level. |
| primary / secondary / tertiary alcohol | **первичный / вторичный / третичный спирт** | Added 2026-09-25 with the reaction-map diagram. |
| catalyst | **катализатор** | Added 2026-09-25. On the reaction map it comes before the formula: *катализатор H₃PO₄*. |

---

## Naming: what changes and what does not

| Kind of thing | Translated? | Notes |
|---|---|---|
| Chemical formula (H₂O, Ca(OH)₂, 2H₂ + O₂ → 2H₂O) | **No** | International notation. Structurally impossible to translate in this codebase: formulae are not in the translation overlays at all, and `cheat-sheets.test.ts` asserts they come through byte-identical. |
| Element symbol (Na, Cl, Fe) | **No** | Latin on a Cyrillic page, which is what Russian chemistry does. The Latin-leakage e2e gate exempts them by building its pattern from the real element registry. |
| State symbol ((s), (l), (g), (aq)) | **No** | Kept as the international abbreviations even though the Russian words differ (*тв.*, *ж.*, *г.*, *р-р*). Russian textbooks print both; equations on this site use the Latin set. |
| Charge notation (2−, +) | **No** | — |
| Element **name** | **Yes** | Sodium → **натрий**, Potassium → **калий**, Nitrogen → **азот**, Oxygen → **кислород**, Carbon → **углерод**, Iron → **железо**, Copper → **медь**, Silver → **серебро**, Tin → **олово**, Lead → **свинец**, Tungsten → **вольфрам**, Mercury → **ртуть**, Sulfur → **сера**. Like German and unlike English, the Latin stems win for Na and K. All 118 verified one at a time in `src/i18n/chemistry-names/ru.ts`. |
| Compound **name** | **Yes** | Anion first, then the cation **in the genitive**: *гидроксид натрия*, *хлорид кальция*. This is the same shape French, Spanish and Italian use with *de/di*, achieved with a case ending rather than a preposition — which is exactly why the overlay's nominative-only storage is a problem for sentences and not for names: the genitive is baked into the stored string. |
| Acid names | **Yes** | HCl → **соляная кислота**, the name Russian school chemistry gives the aqueous acid, with *хлороводородная кислота* as the systematic alternative. The **gas** HCl is *хлороводород*. This is the same distinction German draws with *Salzsäure* / *Chlorwasserstoff* and English loses. Likewise HF → **плавиковая кислота** (gas: *фтороводород*). |
| Ion **name** | **Yes** | Russian uses the systematic *гидро-* prefix where the English data still says *bi-*: bicarbonate → **гидрокарбонат**, bisulfate → **гидросульфат**, bisulfite → **гидросульфит**, hydrosulfide → **гидросульфид**. A monoatomic cation is *ион* + the element in the genitive (*ион натрия*), which is why those read as two words where the anions are one. |
| IUPAC affixes being *discussed as affixes* (-ate/-ite, hypo-/per-, -ol/-al/-one) | **Partly** | Where the sentence teaches the Russian naming system, the Russian affixes are used (*-ат*/*-ит*, *гипо-*/*пер-*). Where a table shows the English source affix, it is kept and the Russian equivalent given alongside. Flagged for review — see `ru-review.md`. |
| Spelling convention | — | Russian chemical usage: **иод** (not *йод*, which is the pharmacy word), **сера** (not *сульфур*), **кремний**, **висмут**, **вольфрам**, **цезий**, **оганесон** (one с). |

---

## Product and UI vocabulary

Not chemistry, but it needs to be consistent too.

| English | Russian | Note |
|---|---|---|
| ChemGames | **ChemGames** | Brand; never translated, and never transliterated. One of the few Latin strings on a Russian page, and every key that carries it is listed in `LATIN_BY_DESIGN` in `cyrillic.test.ts`. |
| cheat sheet | **шпаргалка** | The natural Russian school word and exactly the right register for teenagers — the same call German made with *Spickzettel*. *Справочник* would be a reference manual. |
| game | **игра** | — |
| level | **уровень** | Russian does not need the loanword. *Левел* is gamer slang and would read as slang; *ступень* would read as a school year. |
| score | **счёт** | — |
| points | **очки** | — |
| high score | **рекорд** | — |
| leaderboard | **таблица лидеров** | — |
| rank | **место** | — |
| hint | **подсказка** | — |
| lives | **жизни** | — |
| wave (of enemies) | **волна** | — |
| Game Over | **игра окончена** | — |
| pause / resume | **пауза / продолжить** | — |
| instructions | **как играть** | Matches the English heading shape rather than inventing a noun (*инструкция* reads like an appliance manual). |
| coach (the in-game hint panel) | **наставник** | It has to stay distinct from *подсказка*, which is the hint ladder. *Тренер* is a sports coach and names a person; *помощник* is vague; *наставник* is a mentor and reads as a role the panel plays. Spanish and Italian reached the same place with *Guía* / *Guida*; German and French kept the loanword, which Russian cannot — *коуч* is business jargon. |
| support mode | **режим поддержки** | — |
| marking sheet | **лист проверки** | — |
| lab notebook | **лабораторный журнал** | Long, and it is the real Russian word; the buttons that open it say «Журнал» where the control is narrow. |
| challenge (the bonus level) | **испытание** | — |
| settings | **настройки** | — |
| year level | **класс**, labels **7–10 класс**, **старшие классы** | The stored value stays `Year 9`; only the label is Russian. Note the site's audience is Year 9–10 ≈ **8–9 класс** in the Russian system, and the SEO keywords say so. |
| teacher | **учитель / учителя** | — |
| student | **ученик / ученики**, **школьники** | — |
| scientist | **учёный** | Note ё. |

---

## Game titles

Every title below is rated **low** in `ru-review.md`: these are product-naming
calls for the owner, not translation calls. GAMES.md § 4 is the checklist each
was run through — does it read as an instruction rather than a title, as a
machine or a job, as an existing product, and does it still say what the game
does.

| Game | English | Russian (chosen) | Kind | Runners-up and why they lost |
|---|---|---|---|---|
| Acid or Base? | Acid or Base? | **Кислота или основание?** | translation | *Кислота или щёлочь?* — shorter, but щёлочь is a soluble base specifically and the game also sorts ammonia and solid hydroxides, so it narrows the chemistry. *Определи вещество* — reads as a worksheet instruction. |
| Formula Blaster | Formula Blaster | **Охота на формулы** | adaptation | *Формула-бластер* — calque; *бластер* is a sci-fi loan that reads as English filler and says nothing about chemistry. *Лопни формулу* — truer to the popping mechanic, but the hub would then carry two imperative titles. *Формулы на мушке* — vivid, and too long for the card. |
| Neutralise! | Neutralise! | **Нейтрализуй!** | translation | *Нейтрализация* — a textbook chapter heading, which is the trap GAMES.md names. *Ионная оборона* — reads more like a product but drops the word the game teaches. The English is a deliberate imperative and Russian carries it directly; GAMES.md's warning about titles that read as orders applies and is flagged. |
| Reaction Balancer | Reaction Balancer | **Весы реакций** | adaptation | *Балансировщик реакций* — **a *балансировщик* in Russian is a machine or a job** (wheel balancer, load balancer): the exact GAMES.md trap, and the same one Italian hit with *bilanciatore*. *Уравняй реакцию* — good, but a second imperative in the hub. *Баланс атомов* — already this glossary's term for the ledger table inside the game, so the title would name a component of itself. |
| Share to Fill | Share to Fill | **Делись и заполняй** | adaptation | *Поделись, чтобы заполнить* — calque; the purpose clause is heavy in Russian and does not fit the card. *Пара к паре* — memorable, loses the "fill" half of the rule. *Общая пара* — names the mechanic, reads as a glossary entry. |
| Chemical Bonds | Chemical Bonds | **Химические связи** | translation | *Связи* — ambiguous (connections, contacts). *Мир связей* — marketing. A topic name is the one case where the direct translation is the right answer. |

**What the owner is most likely to change.** *Весы реакций* and *Охота на
формулы* are the two that move furthest from the English. *Нейтрализуй!* is the
one most likely to be judged an instruction rather than a name. All six were
chosen short enough for the hub card, the game header at 360 px and the
leaderboard column, and that has to be confirmed on the rendered pages rather
than assumed — Cyrillic sets wider than Latin at the same point size.

---

## SEO keywords

Rated **low**: these are plausible Russian search terms, not researched ones.
The one thing they get deliberately right is the **age band**. Phase 1 shipped
"Chemie Oberstufe" for a Year 9–10 site, which names ages 16–19; Year 9–10 in the
Australian system is **8–9 класс** in the Russian one, and the keyword list says
that rather than a bare «химия в школе».

```
химия, химия 8 класс, химия 9 класс, обучающие игры, молекулы,
химические реакции, шпаргалки по химии
```
