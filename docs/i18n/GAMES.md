# Games in every language

The contract a game must meet so it ships in every language the site publishes, and the
language checks that are part of testing a game. Companion to
[`README.md`](./README.md) (how the i18n system works and how to add a locale — on the `i18n`
branch until it merges) and `glossary-<locale>.md` (the agreed chemistry terms per language).

**Audience:** whoever writes a brief, builds a game from one, or reviews a milestone.
**Owner:** Stella. **Last updated:** 2026-09-18.

---

## The rule

**A game ships in every locale in `LOCALES` (`src/i18n/config.ts`), from the same brief, in
the same milestone.** Not "English now, the others later": a game that plays in English only
is not done, the same way a game with no instructions modal is not done.

| Locale | Status | What it means for a new game |
|---|---|---|
| `en` | shipping (default) | The brief's text, verbatim. English is the canonical source every other locale is checked against. |
| `de` | shipping | Required at build time. Terms come from [`glossary-de.md`](./glossary-de.md). |
| `fr`, `es`, `it`, `ru` | planned, in that order | Required from the day the locale is added. Adding a locale (README § Adding a locale) includes translating every existing game; adding a game includes every locale that exists. |

Two workflows meet here, and both must leave every game × locale cell filled:

- **Adding a locale** → every game's catalogue, title, dataset prose and chemistry names get
  that locale; every brief's "Languages" table gets a row.
- **Adding a game** (this document) → the new game's text exists in every locale that is in
  `LOCALES` at the time.

---

## What "in every language" means for a game

| Content | English source (canonical) | Other locales | Gate that fails when it is missing |
|---|---|---|---|
| Title and hub description | The brief's "Languages" section | `gamesHub.<key>Title` / `<key>Description` in every `src/i18n/dictionaries/<locale>.ts`; the slug added to `GAME_TITLE_KEYS` in `game-titles.ts` and to `EXPECTED_GAMES` in `game-titles.test.ts` | `npm run typecheck` (`satisfies Dictionary`), `game-titles.test.ts` |
| Message catalogue — instructions, guided rounds, coach, hint tiers, errors, success, overlay, notebook, glossary, accessible names | `src/core-engine/config/games/<game>-messages.ts`, keys from the brief | `src/i18n/game-messages/<game>/<locale>.ts`, one file per non-English locale, `satisfies <Game>Messages` | typecheck; the catalogue parity tests (see [Testing](#testing-a-game-in-every-locale)) |
| Prose inside a dataset — species names, per-item hints, observations, descriptions, Challenge word equations | The dataset in `src/core-engine/data/`, keyed by id | An overlay keyed by the same id, next to the chemistry-name and cheat-sheet overlays (`src/i18n/<dataset>/<locale>.ts`), resolved with fallback to the registry the way `chemistry-names.ts` does | an overlay test in the style of `chemistry-names.test.ts`: every id named in every locale, no id in an overlay that the dataset does not have |
| Element, compound and ion names the game introduces | The registries (`elements.ts`, `compounds.ts`, `ions.ts`) | `src/i18n/chemistry-names/<locale>.ts` | `chemistry-names.test.ts` |
| The cheat sheet the game links | `src/lib/cheat-sheet-data.ts` | `src/i18n/cheat-sheets/<locale>.ts` | `cheat-sheets.test.ts` |
| Chemistry terms the game relies on (coined game words included) | The brief's glossary | A row in `docs/i18n/glossary-<locale>.md`, decided **before** translating | review (no automated gate — that is why it comes first) |
| Confidence notes | — | `src/i18n/review-notes.ts` entries for the new namespace; regenerate `<locale>-review.md` with `npm run i18n:review` | the generated review table shows unrated strings as *medium* with a generic note, so an unrated game is visible |

**Never translated, in any locale:** chemical formulae, element symbols, state symbols,
charges, equations, the game slug, catalogue keys, `localStorage` flags
(`hasSeen<Game>Instructions`), `games.id`, sound-effect names, CSS tokens. A formula inside a
message is written in `` `backticks` `` and typeset by `MoleculeText`; the parity test asserts
it comes through byte-identical in every locale.

### Catalogue layout

The catalogue stays a per-game module (a teacher edits one file per language, not a
site-wide dictionary), loaded only by that game's page, so the shared dictionary stays UI-sized
(README § What goes where):

```
src/core-engine/config/games/<game>-messages.ts     English, canonical; exports <GAME>_MESSAGES
                                                    and `type <Game>Messages = typeof <GAME>_MESSAGES`
src/i18n/game-messages/<game>/de.ts                 `export const de = { ... } satisfies <Game>Messages`
src/i18n/game-messages/<game>/fr.ts                 (one per locale in LOCALES, no exceptions)
src/i18n/game-messages/<game>/index.ts              gameMessages(locale) — a loader keyed by Locale,
                                                    English for 'en', no silent fallback for the rest
```

Conventions, the same as the dictionary's (README § Adding a string), plus a few for games:

- **Placeholders are `{name}`**, not arrow functions. `f()` from `src/i18n/format.ts`
  interpolates them, and the placeholder gate can only check a string. (The two catalogues
  built before this rule, Reaction Balancer's and Share to Fill's, use functions; convert
  them when they are translated.)
- **Count-dependent strings are a `one` / `other` pair** today. Keep them few, and list every
  one in the brief's "Languages" section, because Russian needs a third and fourth form and the
  README's plural fix has to find them all.
- **Accessible names live next to the visible string** with an `A11y` suffix, so an
  `aria-label` cannot stay English while the label around it is translated.
- **No sentence is built by concatenation.** Word order differs; one key holds one sentence.
- **Glossary words are linked by `GlossaryText`** on the *translated* word, so each locale's
  catalogue carries its own glossary keys and match list (`glossaryMatches` in the Reaction
  Balancer catalogue is the pattern).

The locale a game page renders in comes from `useI18n().locale`; the page passes the
matching catalogue down, and every link it renders goes through `LocaleLink` or `href()` so
"Quit to Hub" lands on `/de/games`, not `/games`.

---

## The four language checks

These are part of testing, not a separate translation project. Every milestone report
answers all four for every locale (BUILD_PLAN § 6), with the screenshots to prove it. The
first three are done per locale by the agent and then by a native speaker or a chemistry
teacher who reads that language; the fourth is the owner's decision, prepared by the agent.

### 1. Is the text correct in every language version?

- **Nothing is missing and nothing leaks.** Every key exists in every locale (typecheck),
  no value is empty, no value is identical to the English except the allowlisted ones
  (`IDENTICAL_BY_DESIGN`), no placeholder was dropped or renamed. Then in the browser: play
  the game in each non-English locale and confirm **no English string appears** — the
  instructions, the coach strip, every hint tier, every error you can trigger, the level-up
  and victory overlays, the notebook, the settings panel, the accessible names (inspect the
  `aria-label`s). The e2e spec asserts the English instructions title is *not* visible.
- **Placeholders render as values**, never as `{element}` on screen.
- **Formulae, symbols and equations are unchanged** — `2H₂ + O₂ → 2H₂O` reads the same in
  every locale; only the words around it change.
- **The agreed terms are used** — every chemistry word matches `glossary-<locale>.md`, and the
  same concept is called one thing throughout the game (the glossary exists because
  *coefficient* being *Koeffizient* on one screen and *Vorfaktor* on the next is the most
  common translation bug in a technical app).
- **Register and typography follow the glossary's "Register and typography" table** — the
  informal address the audience expects, that language's quotation marks, dash, ellipsis,
  decimal separator and non-breaking spaces.
- **The layout survives the longer text.** German runs about 30% longer than English, French
  and Russian similar or more; check the header, the coach strip, cards and buttons at
  375 px and at 200% zoom in each locale. Text expansion breaking a card is a real bug the
  German pilot hit (`i18n` branch, "Fix the layout breakage German text expansion exposed").

### 2. Is the text understandable?

- **Reading age ~12 in that language**, one idea per sentence, the way the brief demands of
  the English. A translation can be correct and still be the wrong register: textbook German
  where a 14-year-old needs classroom German, or a calque that a native reader has to
  decode (*"einsames Elektronenpaar"* is a word-for-word *lone pair*; the German term is
  *freies Elektronenpaar*).
- **Read aloud, in each locale:** the instructions, the guided first round, three coach
  messages, all three hint tiers for one round, and one error message. For each, ask: could
  a student who has never seen the game act on this sentence? Does it say what is off *and*
  what to try? Does every sentence make sense without the English beside it?
- **Metaphors and idioms travel or are replaced.** The lab-notebook / "batch complete" /
  "reaction fizzled" idiom in the overlays is English lab talk; each locale keeps the tone but
  uses its own idiom (the German review rates "Charge fertig!" *low* for exactly this reason).
- **The confidence notes are honest.** Every new namespace has `review-notes.ts` entries;
  anything rated *low* is listed in the milestone report for a native speaker, not hidden
  behind a *high*.

### 3. Are the chemical names correct?

- **Names come from the overlays, never from a translator's memory.** Elements, compounds and
  ions render through `elementName()` / `compoundName()` / `ionName()`, so a name is decided
  once, in `chemistry-names/<locale>.ts`, and the test proves every id is covered.
- **The naming system is that language's, not a transliteration of English.** Acids
  (*hydrochloric acid* → *Salzsäure*, not *Chlorwasserstoffsäure*, in school German), the
  *bi-* vs *hydrogen-* prefix (*Hydrogencarbonat*), esters (*Ethansäuremethylester*, not
  "Methylethanoat"), and IUPAC affixes being *taught as affixes* — where the English text
  explains *-ate/-ite*, the translation explains that language's suffixes. When a game teaches
  naming (Ion Forge, Carbon Chain Namer), this is content design per locale, not translation,
  and the brief must say so.
- **Spelling conventions follow that language's IUPAC usage** (German *Calcium*, *Iod*,
  *Cobalt*), not older or regional forms, unless the glossary decides otherwise for the
  audience.
- **Formulae, symbols and state symbols are untouched** even where the language has its own
  words (*fest / flüssig / gasförmig* are never written into an equation).
- **Coined game words have a decided equivalent** — *loner*, *hopper*, *forge*, *batch*: each
  gets a glossary row before the catalogue is translated, so it is one word across the game,
  the cheat sheet and the hub description.
- **A chemistry teacher who teaches in that language checks the names** the game introduces
  and any naming rule it teaches. This is the check most likely to need someone outside the
  team; say in the report whether it happened.

### 4. Does the game name sound right in each culture?

The title is the first thing a student reads and the thing a teacher writes on the board.
Translated, adapted or kept in English is a **decision per game per locale**, recorded in the
brief's "Languages" table with the reason, and made by the owner. The agent prepares it:

- **Propose a title per locale** and say what kind it is: a translation (*Ionenschmiede*), an
  adaptation that keeps the rule-as-name idea (*Share to Fill* → a phrase that names the
  rule in that language), or the English kept as a product name (as *Formula Blaster* might
  be). Give one alternative.
- **Check it does not read as something else**: an instruction rather than a title
  (*Neutralisieren!*), a machine or a job (*Chemie-Sortierer* "sounds like a machine for
  sorting chemicals"), a network device (*Router* in German), a rude, childish or
  unfortunate word, or an existing product, brand or textbook series in that market.
- **Check it still says what the game does.** A student should be able to guess the chemistry
  from the title in every language, as they can from *Reaction Balancer*.
- **Check it fits**: the hub card, the game header on a phone, the `<title>` tag, the
  leaderboard column. Long compound nouns (German) and Cyrillic (wider glyphs) need
  checking on the actual card.
- **Check it is consistent**: the same title in the hub, the header, the instructions modal
  title ("How to Play: …"), the overlay, the leaderboards (which fall back to the English
  `games.title` column for any game the dictionary does not know — so the dictionary must
  know it) and the cheat-sheet cross-links.
- Existing decisions to be consistent with: the German review rates *Formel-Blaster* and
  *Reaktions-Balancer* *low* as coinages and asks whether titles should be translated at all.
  That question is answered per game in the brief, not silently per locale.

---

## Per-language notes for reviewers

Things that are easy to get wrong in each language, so the reviewer knows where to look.
The glossary for the locale is authoritative; these are reminders.

| Locale | Address | Typography | Chemistry naming | Watch for |
|---|---|---|---|---|
| **de** | *du* | „…“ quotes, en dash, decimal comma, non-breaking space before units and in *z. B.* | Compound names are one word (*Natriumhydroxid*); *Index* vs *Koeffizient*; *Edukte* / *Produkte*; *Oxonium-Ion*; German IUPAC spellings | Text ~30% longer; long compound nouns in cards; nominalised verbs capitalised |
| **fr** | *tu* for a school audience (decide once in `glossary-fr.md`) | « … » with spaces; a non-breaking space before `: ; ? !`; decimal comma; accents on capitals (*É*) | *hydroxyde de sodium* (name, then *de* + element); *ion hydronium* / *oxonium* — decide; *acide éthanoïque* | Sentences run long; keep *tu/vous* consistent between the catalogue and the UI dictionary |
| **es** | *tú* — and decide **which Spanish** (Spain vs Latin America) before translating: it changes *vosotros/ustedes*, some vocabulary and the decimal separator | ¿…? ¡…! opening marks; decimal comma (Spain) or point (Mexico and others) | *hidróxido de sodio*; *ácido clorhídrico*; *catión / anión* | Instructions in the imperative (*Arrastra…*); accents on every syllable that needs one |
| **it** | *tu* | «…» or “…”; decimal comma | *idrossido di sodio*; *acido cloridrico*; *legame covalente* | Elisions (*l'atomo*); gendered articles around placeholders — a `{compound}` inside a sentence may force an article, so prefer sentence shapes that do not need one |
| **ru** | *ты* for students (decide in `glossary-ru.md`); the imperative for controls | «…» quotes; decimal comma; Cyrillic throughout, but element **symbols** stay Latin (*натрий*, but *Na*) | *гидроксид натрия* (compound word, then element in the genitive); *соляная / хлороводородная кислота* — decide | **Three plural forms** (1 атом, 2 атома, 5 атомов) — every count string needs the `Intl.PluralRules` shape (README § Plurals) *before* the `ru` files are written; numerals govern the noun's case; text width in Cyrillic |

---

## Testing a game in every locale

**Automatic, once the catalogue is in the layout above:** typecheck (parity), the catalogue
parity tests (empty, identical-to-English, placeholders, formulae), `chemistry-names.test.ts`,
`cheat-sheets.test.ts`, `game-titles.test.ts`. A new game adds its overlay test for any
dataset prose it introduced.

**Page test (`page.test.tsx`):** one flow rendered with `TestProviders` given a non-English
`locale` and `dictionary` — the instructions title, one coach message and one overlay must
show that locale's text (`docs/TESTING.md` § Internationalisation, on the `i18n` branch).

**End-to-end (`e2e/<slug>.spec.ts`):** a `for (const locale of LOCALES)` block, using
`openGame(page, slug, { locale })`, that in each locale:

1. opens the game and reads `<html lang>`;
2. sees the instructions modal titled in that locale, and does **not** see the English title
   (skip the negative check for `en`);
3. closes it with that locale's "GOT IT", plays the first round and sees the coach strip in
   that locale;
4. asks for hint tier 1 and sees it in that locale;
5. pauses and checks the overlay title and that "Quit to Hub" links to `/<locale>/games`.

Keep the full journey spec English-only (it is long); the locale block proves wiring, the
unit gates prove completeness. Title assertions read from the dictionaries, never from
string literals, so a retitled game does not break the test.

**Manual, per locale, in a real browser** (reported in the milestone with a screenshot of the
instructions, a coach message, a hint and the victory overlay for each locale):

- Instructions, the guided round, three coach messages, the three hint tiers, one error,
  level-up, victory and the notebook read correctly and naturally (checks 1 and 2).
- Every species name on screen matches the overlay and the glossary (check 3).
- The hub card, header and overlay show the decided title, and it fits (check 4).
- 375 px width and 200% zoom in the locale with the longest strings (German today).

---

## The "Languages" section every brief carries

Add this to a brief before it is marked `Approved`; the build plan treats a missing or
unresolved table like a `YOU DECIDE`.

```markdown
## Languages

Ships in every locale in `LOCALES` at build time (`docs/i18n/GAMES.md`). English is the
canonical text above; each other locale is a translation of it, checked against
`docs/i18n/glossary-<locale>.md`.

| Locale | Title | Kind | Hub description | Notes / alternative |
|---|---|---|---|---|
| en | <title> | — | <description> | — |
| de | <proposal> | translation / adaptation / kept English | <proposal> | <why; one alternative; what a native speaker should check> |
| fr, es, it, ru | — | — | — | filled when the locale is added (README § Adding a locale) |

**Terms to fix in each glossary before translating:** <the chemistry terms and any coined
game words — e.g. loner, hopper — the catalogue relies on>.
**Chemistry names the game introduces:** <species not yet in the registries → registry +
`chemistry-names/<locale>.ts`>; **naming rules it teaches** (if any) and how they differ per
language.
**Dataset prose to overlay:** <fields in the game's data file that hold text, e.g. `hint`,
`observation`, `prompt`>.
**Count-dependent strings:** <list, for the plural pass>.
```

---

## Milestone report block

Appended to the milestone report template in `BUILD_PLAN.md` § 6:

```markdown
### Languages
- Locales shipped: en, de (all of `LOCALES` at <date>)
- Gates: typecheck / catalogue parity / chemistry-names / game-titles: <green>
- e2e locale block: <green>; page test in `de`: <green>
- Check 1 (text correct): <per locale: what was played through; any leaked English found and fixed>
- Check 2 (understandable): <per locale: read-aloud pass done by <whom>; strings rated low in review-notes: <list>>
- Check 3 (chemical names): <names introduced; who checked them; naming rules taught and how they were localised>
- Check 4 (title): <per locale: proposed title, kind, alternative — for Stella's decision>
- Screenshots per locale: instructions, coach message, hint, victory
- Native-speaker / teacher review: <done by … | NOT done — listed for review>
```
