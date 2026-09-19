# Internationalisation

How the multi-language setup works, how to add a language, and how to add a
string. Written for whoever adds Russian next.

Currently shipping: **English** (default), **German**, **French**, **Spanish**,
**Italian** and **Russian**. Russian is the first locale written in anything
but the Latin alphabet; what that cost, and what it found, is in
[Preparing a non-Latin locale](#preparing-a-non-latin-locale).

---

## The short version

- Plain Next.js. **No i18n library**, no `next-intl`, no `i18next`.
- Every page lives under `src/app/[lang]/`. Every URL is prefixed, including
  English: `/en/games`, `/de/games`.
- `src/proxy.ts` sends unprefixed URLs to the right language.
- Strings live in `src/i18n/dictionaries/<locale>.ts`.
- Server components read them with `getDictionary(lang)`; client components read
  them with `useI18n()`.
- `npm test` fails if a locale is missing a key, has an empty value, dropped a
  placeholder, or left a string identical to the English.

This follows the pattern in Next's own guide,
`node_modules/next/dist/docs/01-app/02-guides/internationalization.md`. If the
docs and this file disagree, the shipped docs win — read them first.

---

## Where everything is

```
src/i18n/
  config.ts              the locale list; the one place a language is declared
  locale-match.ts        Accept-Language parsing and matching (no dependencies)
  routing.ts             localizePath / stripLocale / which paths stay unprefixed
  format.ts              {placeholder} interpolation, plurals, `Translated<>`
  dictionaries.ts        getDictionary(lang) — server side
  dictionaries/
    en.ts                the canonical dictionary; `Dictionary` is derived from it
    de.ts                `satisfies Dictionary`
  game-messages/
    <game>/de.ts         one game's copy in one locale, `satisfies <Game>Messages`
    <game>/index.ts      gameMessages(locale) + the shape the components call
  client.tsx             I18nProvider + useI18n() — client side
  server.ts              getRequestLocale/Dictionary for Server Actions & routes
  chemistry-names.ts     element / compound / ion names and game-data prose
  chemistry-names/de.ts
  game-data.ts           applies that overlay to a level plan, once
  cheat-sheets.ts        cheat-sheet prose, by overlay
  cheat-sheets/de.ts
  game-titles.ts         reconciles dictionary titles with Supabase's `games` table
  review-notes.ts        the hand-written half of de-review.md
  *.test.ts              the quality gates

src/core-engine/config/games/
  <game>-messages.ts     a game's English copy, canonical; the type every
                         locale's file satisfies

src/test-utils/
  i18n-parity.ts         the parity checks, shared by the dictionary and the
                         game catalogues

src/components/layout/
  LanguageSwitcher.tsx   the <select> in the nav bar and the settings panel
  LocaleLink.tsx         next/link with the locale prefixed on

scripts/i18n-review.mts  regenerates docs/i18n/de-review.md
```

---

## Routing

### Every URL is prefixed

`/games` redirects to `/en/games`. The default locale is visible in the URL just
like the others.

This costs one redirect on an unprefixed entry, and buys one URL shape to reason
about everywhere else — in the proxy, in `hreflang` alternates, in tests, in
analytics. The alternative ("prefix everything except the default") is where
this pattern usually goes wrong: every helper grows a special case, and the
default-locale path silently diverges from the rest.

### What `src/proxy.ts` does

Next 16 renamed the middleware convention to **proxy** (`src/proxy.ts`,
exporting `proxy()`). On every matched request it:

1. runs Supabase's `updateSession()` to refresh the auth session;
2. returns that response unchanged if the path is already prefixed, or is one of
   the paths that must never be prefixed;
3. otherwise resolves a locale and redirects.

**The bit to be careful with.** Supabase rotates refresh tokens. When
`updateSession()` refreshes, the replacement token exists *only* as a
`Set-Cookie` on the response it built. Returning a bare
`NextResponse.redirect()` throws that away and signs the reader out — not
always, only on the requests that happened to land on a refresh, which makes it
miserable to reproduce. So the redirect copies every cookie off the session
response before returning. `src/proxy.test.ts` asserts this against a faked
refresh; don't delete that test.

### Locale resolution order

1. The prefix in the path, if there is one.
2. The `NEXT_LOCALE` cookie — set by the language switcher, so it means the
   reader chose this.
3. `Accept-Language`, negotiated by q-value with a primary-subtag fallback
   (`de-AT` → `de`).
4. `en`.

An explicit choice always beats the browser header: if someone picked English on
a German machine, they meant it.

### Paths that are never prefixed

Listed in `UNPREFIXED_PATHS` in `routing.ts`:

| Path | Why |
|---|---|
| `/auth/callback` | Registered as a redirect URL in the Supabase dashboard. Changing it breaks OAuth. |
| `/account/export` | Linked as a file download. |
| `/api`, `/_next`, `/favicon.ico`, `/robots.txt`, `/sitemap.xml` | Framework and metadata paths with no localized variant. |

Those two route handlers therefore live at `src/app/auth/callback/route.ts` and
`src/app/account/export/route.ts`, **outside** `[lang]`. They still read the
locale — from the cookie, via `src/i18n/server.ts` — so the callback sends the
reader on to a localized page and the export returns localized error messages.

**Route handlers should not move under `[lang]` unless there is a reason.** A
handler's URL is usually an integration point (a redirect target, a download
link, a webhook), and integration points want stable URLs.

---

## Reading a string

### In a server component

```tsx
export default async function Page(props: PageProps<'/[lang]'>) {
  const { lang } = await props.params;
  const t = await getDictionary(lang);
  return <h1>{t.gamesHub.heading}</h1>;
}
```

### In a client component

```tsx
'use client';
import { useI18n } from '@/i18n/client';

export function Thing() {
  const { t, f, locale, href } = useI18n();
  return <p>{f(t.footer.copyright, { year: 2026 })}</p>;
}
```

`t` is the dictionary, `f` interpolates `{placeholders}`, `locale` is the active
code, `href` prefixes an app path.

The provider is seeded once in `src/app/[lang]/layout.tsx`. `useI18n()` throws
outside it rather than falling back to English — a silent fallback lets an
untranslated subtree ship unnoticed.

### In a Server Action or a route handler

Neither gets route params, so both read the cookie:

```ts
import { getRequestDictionary } from '@/i18n/server';
const t = await getRequestDictionary();
```

### Linking

Use `<LocaleLink href="/games">`, never a bare `next/link` for an internal path.
Write the path the way the route is named; the prefix is added for you. For
imperative navigation, `router.push(href('/games'))` or
`localizePath('/games', locale)`.

---

## Adding a string

**First, where does it go?** A sentence a *player* reads inside Reaction
Balancer or Share to Fill belongs in that game's catalogue
(`src/core-engine/config/games/<game>-messages.ts` and its locale files), not in
the dictionary — see
[What goes where](#what-goes-where-and-why-the-split-matters). The steps are the
same either way; only the file changes.

1. Add the key to `src/i18n/dictionaries/en.ts` (or the game's English
   catalogue), in the namespace where it belongs. Namespaces follow *where the
   string appears*, then *what it is*.
2. Run `npm run typecheck`. Every other locale now fails to compile. That is the
   point.
3. Translate it in each locale file.
4. `npm test` — the parity, empty-value, placeholder and not-actually-translated
   checks all run against the new key automatically, in either place.
5. `npm run i18n:review` and commit the regenerated `de-review.md`. It covers
   the catalogues too, at the dot-paths they had when they lived in the
   dictionary, so a reviewer never has to know where a string is stored.

### Conventions

- **Interpolation is `{name}`** and nothing else. `${}` and `%s` are rejected by
  a test, because they would render as literal text.
- **Accessibility strings sit next to the visible string they belong to**, with
  an `A11y` suffix (`exit` / `exitA11y`). Keeping them apart is how an
  `aria-label` gets left in English.
- **Never build a sentence by concatenation.** Word order differs between
  languages; put the whole sentence in one key with placeholders. Where markup
  interrupts a sentence (a link mid-paragraph), split on a placeholder and
  substitute the element — see `withPlaceholder()` in the privacy page.
- **Chemical formulae, element symbols, state symbols and charges never appear
  in a dictionary.** They come from the core-engine registries. Element,
  compound and ion *names* are translated, in `chemistry-names/`.

---

## What goes where, and why the split matters

| Content | Lives in | Reaches the client? |
|---|---|---|
| UI strings | `dictionaries/<locale>.ts` | **Yes, on every page** — serialized into the RSC payload by `I18nProvider`. Keep it to UI copy. |
| A game's own copy | `core-engine/config/games/<game>-messages.ts` (English) + `i18n/game-messages/<game>/<locale>.ts` | Only in that game's route chunk. |
| Element / compound / ion names | `chemistry-names/<locale>.ts` | Only the names a page renders. |
| Cheat-sheet prose | `cheat-sheets/<locale>.ts` | No — the cheat-sheet pages are Server Components. |

The cheat sheets are roughly ten times the size of the UI dictionary. They are
kept out of the dictionary deliberately so they are never shipped to the
browser. **If you find yourself adding cheat-sheet prose to the dictionary, or
importing `cheat-sheets/de.ts` from a client component, stop** — that is the one
change that would make every page pay for content almost nobody reads.

### The dictionary is a budget, and a game will eat it

`src/app/[lang]/layout.tsx` hands the *whole* dictionary to `I18nProvider`, so
every byte of it is serialized into the RSC payload of **every** page —
including pages with no game on them. A game's copy is the one thing large
enough to matter: Reaction Balancer and Share to Fill together were 22.4 KB of
the German dictionary's 45.6 KB, and a reader on the cheat-sheet index was
downloading all of it.

So each of those two games now keeps its copy in a **per-game catalogue**,
loaded by that game's page and nothing else (`GAMES.md` § Catalogue layout).
The German dictionary is 23.1 KB as a result. Measured on the served HTML
(`next dev`, so the absolute numbers include dev overhead; the delta is the
payload):

| Page | Before | After |
|---|---|---|
| `/de/cheat-sheets` | 174,125 B | 150,120 B |
| `/de` | 102,034 B | 78,029 B |
| `/en/games` | 82,075 B | 61,187 B |
| `/de/games/lewis-structures` | 84,699 B | 60,704 B |

About 24 KB off every German page. The game's *own* page drops by as much: its
copy moved out of the RSC payload and into the route's JS chunk, which the
browser caches. What is still on `/de/cheat-sheets` is `gamesHub.lewisTitle`
and `lewisDescription` — one line for the hub card, which is the point of
keeping them.

What deliberately **stays** in the dictionary:

- **`games.shared`** (progress, level, score, lives, exit, pause, hint) and
  **`games.overlay`** (the paused / game-over / level-up cards). Shared
  components that are not game-specific read them, they are about 2 KB
  together, and a per-game copy would duplicate them five times.
- **`gamesHub.<key>Title` / `<key>Description`**. `game-titles.ts` maps a
  `GameName` onto a dictionary key so a game in the Supabase `games` table that
  the dictionary does not know still shows a title (GAMES.md line 38).

The older games' namespaces (`acidClassification`, `formulaBlaster`,
`neutralise`) are still in the dictionary. They total 3.4 KB, they write their
copy in JSX rather than through a catalogue, and moving them is **a
follow-up**, not part of this split — it would have buried a 22 KB change under
a 3 KB one. `dictionary.test.ts` fails if a *further* game namespace appears,
so the list cannot quietly grow while that follow-up waits.

### Why overlays, not full copies

The chemistry registries and `src/lib/cheat-sheet-data.ts` *are* the English
content. Restating them in an `en` dictionary would create a second source of
truth that can drift from the first. Instead each non-default locale contributes
an **overlay** keyed by the source's own identifiers, and the tests assert
completeness against the live data.

Two things fall out of that, both worth keeping:

- Adding a compound, an ion, a cheat-sheet bullet or a table row in English
  fails the test suite until every locale has it. The shapes have to line up.
- Formulae are *structurally* out of reach of a translator: they are not in the
  overlay at all, and `cheat-sheets.test.ts` asserts they come through
  byte-identical.

---

## Adding a locale

Phase 1 was built so this is small, and the French pass confirmed it. To add
Spanish, with `<x>` standing for the new code:

1. **`src/i18n/config.ts`** — add `'<x>'` to `LOCALES` and to `LOCALE_LABELS`,
   naming the language in itself: a Spanish reader scans for "Español", not for
   "Spanish".
2. **`src/i18n/dictionaries/<x>.ts`** — copy `de.ts` or `fr.ts`, translate, keep
   `satisfies Dictionary`. `npm run typecheck` tells you what is missing.
3. **`src/i18n/dictionaries.ts`** — add the loader entry.
4. **`src/i18n/game-messages/<game>/<x>.ts`** — one per game with a catalogue
   (Reaction Balancer and Share to Fill today), each `satisfies
   <Game>Messages`, plus its entry in that game's `CATALOGUES` map. The
   `Record<Locale, …>` there means adding a code to `LOCALES` fails to compile
   until every game has its file: a game that plays in English only is not
   done (`GAMES.md` § The rule).
5. **`src/i18n/chemistry-names/<x>.ts`** — 118 elements, 35 compounds, 40 ions,
   plus 53 species names, 33 reactions and 18 Lewis molecules of dataset prose.
   Register it in `chemistry-names.ts`, **and set its entry in
   `LOWERCASES_NAMES_IN_SENTENCE`** — getting that wrong is a spelling error in
   every sentence that embeds a substance name.
6. **`src/i18n/cheat-sheets/<x>.ts`** — the twelve sheets. Register it in
   `cheat-sheets.ts`. The test tells you what is missing and what has the wrong
   shape — but see the warning below about what it *cannot* tell you.
7. **`src/i18n/review-notes.ts`** — add an `<x>` entry and an `<x>` summary, then
   add the locale to `LOCALES_TO_REVIEW` in `scripts/i18n-review.mts`. Each
   locale's header is written out in full there on purpose, so adding one
   cannot reflow another locale's file and cost you the "an unchanged review
   file proves no copy changed" property.
8. **`docs/i18n/glossary-<x>.md`** — decide the chemistry terms *before*
   translating, not during.

The proxy, the switcher, the `hreflang` alternates, `generateStaticParams`,
`e2e/warm-up.setup.ts` and most of the tests all read `LOCALES` and need no
edit. Three test files do **not**, and French had to fix each of them:

- **`dictionary.test.ts`** holds a `Record<Locale, unknown>` of dictionaries
  (a compile error until you add yours) and an `IDENTICAL_BY_DESIGN` list per
  locale, for the strings your language genuinely spells the English way.
- **`game-messages.test.ts`** passes its `translations` map explicitly, has a
  per-locale identical-by-design list for each game, and proves the loader
  throws for an unknown locale by asking it for `'xx'` — which used to be
  `'fr'`, and stopped working the day French shipped.
- **`chemistry-names.test.ts`** asserts a list of element names that any real
  translation must change. Which names those are is a property of the *pair* of
  languages: Na/Natrium and K/Kalium are the German examples and are not false
  friends in French at all, so there is a per-locale `SAME_AS_ENGLISH` exemption
  list. The same test requires every compound name to differ from the English,
  with a per-locale `IDENTICAL_COMPOUNDS_BY_DESIGN` for the ones that genuinely
  coincide (French: hydrazine).

> **What `cheat-sheets.test.ts` cannot tell you.** Its shape assertions compare
> the *localized* sheet against the English, and `localizeSheet()` falls back to
> the English section when the overlay has no entry at that index — so the
> lengths always match and an overlay that is one section short passes. It does
> not render short: it shifts every heading onto the wrong body and leaves the
> last section in English. Count your sections against
> `src/lib/cheat-sheet-data.ts` by hand, or fix the test to assert against the
> overlay.

### Before you start

Write the glossary first. The single biggest source of inconsistency in a
translated technical site is the same concept being called two things on two
pages, and that is decided while translating unless it was decided beforehand.

### Right-to-left

Every language in the roadmap is left-to-right, so there is no `dir` handling.
Adding an RTL locale means setting `dir` on `<html>` in the root layout **and**
auditing the fixed left/right positioning in the game shells, which is a real
piece of work, not a one-line change.

---

## Preparing a non-Latin locale

Russian is the sixth locale and the first written in anything but the Latin
alphabet. Five Latin languages in a row hid three assumptions in the code, and
all three failed *silently* — no error, no failing test, just a feature that
quietly does nothing. They are fixed now; this section exists so the next
non-Latin locale costs an afternoon instead of a release.

The pattern is worth naming, because it is the thing to look for: **code that
works on Latin script by accident tends to fail closed, not loudly.** A regex
that matches nothing returns no matches. A font with no glyph falls back. A
missing plural form resolves to another form. Nothing throws.

### 1. Word boundaries must be Unicode, not `\b`

JavaScript's `\b` is defined against `[A-Za-z0-9_]`. It knows one alphabet.

```js
new RegExp('\\b(электрон)\\b', 'gi').test('Это электрон здесь')  // false
```

That is the bare nominative, standing alone with a space on each side, and it
does not match — because neither neighbour is an ASCII word character, so
there is no boundary for `\b` to anchor to. The tap-to-explain matcher in
`GlossaryTerm.tsx` was built this way, so every glossary chip on the Russian
site would have failed to appear, on every page, with nothing in the console.

Use lookarounds and the `u` flag:

```js
new RegExp(`(?<![\\p{L}\\p{N}])(${alternation})(?![\\p{L}\\p{N}])`, 'giu')
```

Three things follow, all covered by tests:

- **`u` makes escaping strict.** `(`, `)`, `*`, `+`, `?`, `\`, `]`, `{` and
  `}` are each a syntax error unescaped, and an *unnecessary* escape is an
  error too. A match word is translator-supplied, so a throw here is a blank
  page rather than a missing chip.
- **Punctuation is still a boundary**, which is what keeps the Italian elision
  *l'elettrone* matching `elettrone`.
- **The boundary no longer falls between a Latin letter and an accented one.**
  `/\bíndice\b/` used to match inside *subíndice*; it no longer does.
  `glossary-es.md` and `glossary-it.md` both recorded that as the pair to
  re-test if the matcher ever went Unicode, and `GlossaryTerm.test.tsx` now
  does. (The Italian note names *perche* ⊂ *perché* and *meta* ⊂ *metà*. Those
  differ in their final letter, so neither was ever a substring and neither
  regex ever matched; the demonstrable form is the prefix, `perch` ⊂ *perché*.)

Grep for `\b` before starting a non-Latin locale. It hides in test helpers,
and a *test* that uses `\b` against Cyrillic passes vacuously rather than
failing — two in this repo did.

### 1a. Two things the Russian gates got wrong until Russian existed

Both were written ahead of their subject and proven against a fixture, which
is the right way to do it — and both had a defect the fixture could not
contain, because the fixture was hand-written Russian and the real files are
translated Russian. Recorded because the *shape* of each mistake generalises
to the next gate somebody writes ahead of its subject.

- **`latinRunsIn()` counted interpolation placeholders as Latin.** `{count}`,
  `{element}` and `{atom1}` are identifiers in the source, never text a reader
  sees — `format()` substitutes them long before the string reaches a page.
  Counting them produced 40 findings on the first real run, on every a11y
  label and every coach line, and the only way to silence it would have been
  an allowlist covering most of the catalogue. Placeholders are stripped
  before the check now, and the fixture has a case for it. *The general
  lesson: a fixture with no placeholders in it cannot exercise a rule about
  strings that nearly all have placeholders in them.*

- **The ё gate's participle rule was not true of Russian.** It read
  `[а-я]енн(ый|ая|ое|ые|ого|ому)` and flagged every `-енный` adjective, but
  only participles with a **stressed** ending take ё. It fired on
  *пропущенный*, *полученный*, *отправленный*, *современный* and
  *обыкновенный* — and on **неспаренный электрон**, which is the formal term
  `glossary-ru.md` is built on, so the rule as written made the required
  terminology unshippable. It is a list of specific participles now, which is
  what that file's own header says the design is; the blanket rule was the one
  thing in it that departed from that. *The general lesson: a rule that fires
  on correct input is worse than no rule, because the fix a reader reaches for
  is to change the correct input.*

### 2. Check the font actually has the script

A Google font serves whatever subsets it has, and the API will tell you which.
Ask with a full Chrome user agent, because the response depends on it:

```bash
curl -s -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 \
  (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" \
  "https://fonts.googleapis.com/css2?family=Oswald:wght@400..700" \
  | grep -oE "/\* [a-z-]+ \*/" | sort -u
```

```
/* cyrillic */  /* cyrillic-ext */  /* latin */  /* latin-ext */  /* vietnamese */
```

The site's own two faces answer `/* latin */ /* latin-ext */` and nothing
else. So on a Russian page **Bebas Neue and DM Sans render no glyph at all**.
Body copy falling back to system-ui is off-brand but readable; headings
falling back to bare `sans-serif` is a broken layout, because Bebas Neue is a
*condensed all-caps* face and the substitute is neither. Every heading would
come out at a different width from the five languages the design is tuned for.

The fix has two halves, deliberately in different files:

- **`src/app/globals.css`** re-points `--font-display` and `--font-body` under
  `html[lang="ru"]`. That selector is (0,1,1), which beats `:root` and both
  `[data-theme]` blocks at (0,1,0), so it wins in either theme without
  `!important` and changes nothing for the other five locales.
- **`src/i18n/fonts.ts`** says which stylesheet a locale needs, and the root
  layout emits a `<link>` only when there is one. Widening the `@import` in
  globals.css would also have worked, but it would put the request on every
  page in every language; this way a Latin locale requests nothing extra.

`src/i18n/fonts.test.ts` asserts both halves; `e2e/i18n.spec.ts` asserts the
half only a browser can see — that a Russian page requests the two faces, that
an English page requests nothing extra, and that a Russian `h1` is actually
*drawn* in Oswald rather than falling back. That last one matters because a
missing glyph is not an error: it is a heading at the wrong width.

> **The body half does not currently reach the page, and it never has — in any
> locale.** `@layer base { body { font-family: var(--font-body) } }` is
> overridden by the Tailwind utility `font-sans` on the `<body>` element in the
> root layout, and a utility beats a base rule. So **DM Sans has never been
> applied to body text either**: measured in a browser, `/en` and `/ru` both
> compute `ui-sans-serif, system-ui, …` and neither DM Sans nor Manrope is
> ever fetched as a used face. The display half is unaffected and works, which
> is the half that breaks a layout.
>
> This is pre-existing and site-wide, not something Russian introduced, and
> Russian is therefore no worse off than the five Latin locales. It is left
> alone deliberately: removing `font-sans` from the body class changes the
> typography of every page in every language, which is the owner's call and
> not a translation pass's. If it is ever fixed, `--font-body` starts working
> and the Russian entry is already correct.

### 3. Plural completeness is a *build-time* gate

`selectPlural()` falls back to `other` when a locale has not supplied the
category a count selects, and that is right: a half-translated page should
render a slightly wrong sentence rather than the word "undefined". But on its
own it means a Russian dictionary with only `one` and `other` — the shape a
translator copying `en.ts` naturally produces — is grammatically wrong on
almost every count while **every gate passes**: no key missing, nothing empty,
nothing identical to the English, every placeholder intact.

So the build refuses what the runtime tolerates.
`describePluralCompleteness()` in `src/test-utils/i18n-parity.ts` requires
every plural record to carry every category its language needs, derived from
`Intl.PluralRules` rather than written down.

One thing to know about the derivation. Reading
`resolvedOptions().pluralCategories` straight off does not work: **French,
Spanish and Italian all declare a `many` category**, and the smallest integer
that selects it is 1,000,000 — it is the compact-decimal rule, "1,5 million de
livres". A gate demanding it would have failed all three shipped Romance
locales on its first run, and a gate that fails on day one gets deleted. The
required set is therefore the categories a count under 1000 can select, plus
`other` — always required, because Russian reaches it only through a fraction.
English and German get `one`/`other`; Russian gets all four.

### 3a. Measure any label that sits in a fixed slot, in a browser

Russian found one layout breakage that no gate in this repo could have seen,
and the shape of it generalises.

The Share to Fill canvas centres a one-word label under each pulsing dot. In
H2 the two dots are **50 px apart**, so the label has to be narrower than that.
It is, in five languages — *loner* 32 px, *impar* 33, *dispari* 40, *einzeln*
41 — and Russian's game word «одиночка» is **59 px**, so the two labels overlap
and read «ОДИНОЧКАДИНОЧКА» on screen. They overlap rather than wrap, because
the span is `whitespace-nowrap` and absolutely positioned, so nothing about it
is visible in a text dump, an accessibility tree or a unit test.

**The budget is about 44 px at `text-[9px]` uppercase.** Measure a candidate in
the page before choosing the word:

```js
const probe = document.createElement('span');
probe.className = document.querySelector('[data-atom-id] span[class*="whitespace-nowrap"]').className;
probe.style.cssText = 'position:fixed;left:-9999px';
probe.textContent = 'кандидат';
document.body.appendChild(probe);
probe.getBoundingClientRect().width;
```

**Postscript, 2026-09-19: this particular label is gone, and how it went is the
more useful half of the lesson.** When the game dropped its invented nicknames
and every locale moved to its formal term, the measurement above stopped having
a solution: *unpaired electron* and its five translations are 102 px (it) to
134 px (ru), two to three times the budget, in every language at once. No
abbreviation was acceptable, because an abbreviation of a formal term is just a
new nickname. Wrapping did not save it either — the longest single word of the
phrase is 51 px (en) to 78 px (ru), still wider than the 50 px gap.

The fix was not a shorter word but **a different place**: the term is now
printed once, in a legend above the board, beside one sample of the pulsing dot
it names, instead of being stamped beside every dot. So the generalisable rule
is narrower than "measure the label", and worth stating on its own:

> A fixed-slot measurement constrains **the layout that created the slot**, not
> the vocabulary. Before you shorten a word to fit a slot, check whether the
> slot has to exist — repeating a label beside every one of four dots is a
> layout choice, and it was the thing that could not survive translation.

Measuring still matters, and measuring is what showed the slot was the problem.
What does not follow from a measurement is that the *word* must give way.

### 4. Dates, numbers and percentages are not strings

Nothing in `src/i18n` can see them, so a page can be word-perfect in five
languages and still write every date the American way. Three were live here:
the privacy effective date was the literal English `'14 September 2026'`; two
percentages were `${n}%` template literals, which is right in exactly one of
the six languages, since German, French and Russian all put a no-break space
before the sign; and the leaderboard formatted with a bare `en`, which CLDR
resolves to **en-US**, so an Australian site wrote "Sep 14, 2026".

Format through `formattingLocale(locale)` from `config.ts`, never the locale
code. CSS percentages (`width: 42%`) must *not* be localised — a decimal comma
makes the declaration invalid and the bar stops drawing.

---

## Where a placeholder may sit

**A placeholder should sit in a position that needs no agreement.** That is a
rule, not a style preference, and it is the most reusable thing three
translation passes have produced.

French found it first. A substance name dropped into a sentence needs an
article, and French chooses between *le*, *la* and *l'* by the name's gender
and first letter — *l'oxygène* but *le carbone*. A template cannot know which,
so `"Ajoute le {name}"` is wrong about half the time. French invented three
label shapes to avoid the article entirely, the simplest of which puts the
name before a colon:

```
{name} : ajoute-le          instead of   Ajoute le {name}
```

Spanish reused all three unchanged for *el/la*, and Italian for elision. Three
languages is enough to call it a device rather than a workaround.

**Russian needs the same device for an entirely different reason,** which is
why the rule belongs here and not in `glossary-fr.md`. A name after a
preposition takes an oblique case — *в воду*, not *в вода* — and the
`chemistry-names` overlay stores nominatives only. Name-then-colon sidesteps
the case exactly as it sidesteps the article: nothing can agree with something
that is not inside the sentence's grammar.

The same reasoning covers counts, and there it has its own gate. A count
interpolated into a sentence is a placeholder that things agree with:
Italian's *"{count} corrette"* is wrong at 1, and Russian numerals govern the
case of the noun after them as well as selecting one of three plural forms.
Either make the string a plural record, or move the count somewhere invariant
— see `GAMES.md` § Count-bearing strings and `src/i18n/count-strings.test.ts`,
which pins the set at 57 so a new one has to be argued for rather than
discovered by a translator.

---

## Plurals

**A count-dependent string is a record keyed by CLDR plural category, and the
category is chosen by `Intl.PluralRules`.** How many forms a string has is a
property of the language, so the call site never decides it.

```ts
// dictionaries/en.ts
count: { one: '{count} topic', other: '{count} topics' }
// dictionaries/de.ts
count: { one: '{count} Thema', other: '{count} Themen' }
// a future ru.ts — same key, four forms, nothing else changes
count: { one: '{count} тема', few: '{count} темы', many: '{count} тем', other: '{count} темы' }
```

```tsx
const { t, p } = useI18n();
<p>{p(t.cheatSheets.count, visible.length)}</p>
```

`p()` fills `{count}` in for you; pass a third argument for anything else the
sentence needs. Outside a client component, `formatPlural(locale, forms, count)`
in `format.ts` is the same function without the context.

### What makes a record a plural

Nothing is marked. A record whose keys are *all* CLDR categories
(`zero`/`one`/`two`/`few`/`many`/`other`) and which supplies `other` is a
plural, everywhere: `isPluralForms()` in `format.ts` applies that rule at
runtime and `IsPluralForms<>` in `dictionaries/en.ts` applies it in the type.
Both have to agree, which is why they are written from the same list.

### The one place locales may differ in their keys

`dictionary.test.ts` normally fails a locale that has a key English does not.
Plural forms are exempt in both directions, because the set of forms is the
language's business:

- every plural in English must be a plural in every locale, and vice versa —
  whether a string is count-dependent at all is *not* negotiable;
- `other` is required, because every language has it and it is the fallback;
- any other category may be present or absent.

So a Russian dictionary adds `few` and `many` and passes. A locale that drops
`other`, or that turns a plural into a flat string, fails.

### The second place, found by Russian: glossary match words

`glossary.<entry>.matches` is exempt from the same check, in both directions,
for the same reason. It is the list of word forms that open a tap-to-explain
pop-over; the matcher does not stem; a language supplies one entry per
inflected form its own copy uses. English needs two for *lone pair*. Russian
needs four for *неподелённая пара*, because the copy uses the nominative, the
genitive singular, the genitive plural and the accusative.

`flatten()` gives every array element its own path, so before this exemption a
fifth Russian form read as an "extra key" and the suite refused it. The five
Latin locales never met it: each happens to need exactly the count English
needs, and this section and GAMES.md both already told the Russian pass to
expect longer lists — so the gate was the thing out of step, not the copy.

The exemption is paid for rather than free. Every match word is still checked
for emptiness; `game-messages.test.ts` still asserts each one starts and ends
with a letter, still asserts that a term linked in the English running text is
linked in the translation's, and now asserts that no locale ships an **empty**
`matches` list — which is the one thing the relaxed key check could otherwise
have hidden.

### Why this shipped before Russian did

Phase 1 used a `…One` / `…Other` key pair and a `count === 1` ternary. That is
correct for English, German, French, Spanish and Italian, and wrong for Russian
roughly two thirds of the time (1 книга, 2 книги, 5 книг, 21 книга, 25 книг),
and for Polish, Arabic and Welsh in their own ways. The shape had to change
*before* the Russian dictionary was written, or the Russian file would have been
written against it.

`src/i18n/plural.test.ts` covers Russian, Welsh and Japanese — languages the
site does not ship — precisely because English and German cannot tell a correct
implementation from a two-form one. It includes a case no pair of forms can
express (1, 2 and 5 all differ in Russian), so the design cannot regress into a
ternary unnoticed.

There is exactly one pluralised string in the shared UI (`cheatSheets.count`,
rendered by `CheatSheetGrid.tsx`); each game catalogue carries its own, and each
brief lists them in its "Languages" section so the Russian pass can find them
all.

---

## Game copy and chemistry data

### Message catalogues

Two games — Reaction Balancer and Share to Fill — write every player-facing
sentence through a **message catalogue** rather than in JSX. A catalogue is
three kinds of file, laid out as `GAMES.md` § Catalogue layout specifies:

```
src/core-engine/config/games/<game>-messages.ts   the English copy, canonical.
                                                  Exports <GAME>_MESSAGES and
                                                  `type <Game>Messages`. No
                                                  runtime imports — the review
                                                  script reads it under Node's
                                                  type stripping.
src/i18n/game-messages/<game>/de.ts               `satisfies <Game>Messages`, so
                                                  a missing key is a compile
                                                  error. One per locale in
                                                  LOCALES, no exceptions.
src/i18n/game-messages/<game>/index.ts            `gameMessages(locale)` — the
                                                  loader, keyed by Locale,
                                                  English for 'en', throwing
                                                  rather than falling back —
                                                  plus the *shape*: which
                                                  sentence takes which values,
                                                  which count selects which
                                                  plural form, which side of an
                                                  arrow picks which sentence.
```

A component calls `useBalancerMessages()` / `useLewisMessages()` and reads
`M.coach.imbalance(element, left, right)`, exactly as when the wording lived in
the dictionary. **Only that game's page loads its catalogue** — never the root
layout, or the payload saving would be undone.

`game-messages.test.ts` runs the same parity gates on a catalogue as
`dictionary.test.ts` runs on the dictionary; both call
`src/test-utils/i18n-parity.ts`, so a catalogue cannot end up with a weaker
version of the same check.

Two things that only show up once a second language exists, both handled here:

- **Case inside a sentence.** English writes "then check oxygen again"; German
  capitalises every noun, so "sauerstoff" is a spelling mistake. The catalogues
  call `nameInSentence(locale, name)`, never `.toLowerCase()`.
- **Which word forms open a glossary pop-over.** Each locale lists its own in
  `glossary.<entry>.matches`, because the German copy uses German inflections.
  The matcher uses a JavaScript `\b`, which only knows ASCII letters, so a match
  word must start and end with one — see `docs/i18n/glossary-de.md`.

### Chemistry data that is prose, not names

`reactions.ts` and `lewis-molecules.ts` carry more than names: a reaction has an
observation, a strategy hint and a word equation; a molecule has a hint and a
property line. All of it is keyed by the dataset's own ids, so it is an
**overlay** in `chemistry-names/<locale>.ts` next to the element and compound
names, not dictionary copy.

`src/i18n/game-data.ts` applies the overlay once, where a level plan is built,
so the rules engines and the components go on reading `round.reaction.name`. A
name therefore cannot be translated in one message and left English in another.
`chemistry-names.test.ts` asserts the overlay is complete against the live
datasets, that equations and bond lines come through byte-identical, and that a
reaction does not gain a German word equation it has no English one for.

---

## Testing

```bash
npm test                              # includes every i18n gate
npx vitest run src/i18n src/proxy      # just the i18n tests
PLAYWRIGHT_PORT=3310 npm run e2e       # includes e2e/i18n.spec.ts
npm run i18n:review                    # regenerate the review table
```

### What the gates catch

| Test | Catches |
|---|---|
| `dictionary.test.ts` | missing keys, extra keys, empty values, values left identical to English, dropped or renamed placeholders, formulae altered in translation, non-`{name}` placeholder syntax, **a game namespace creeping back into the dictionary** |
| `game-messages.test.ts` | the same parity gates on each per-game catalogue, a locale with no catalogue, a glossary match word the ASCII `\b` matcher could never find, and a term linked in the English running text but not in the translation's |
| `chemistry-names.test.ts` | an element, compound, ion, species, reaction or Lewis molecule with no translation in some locale; an overlay entry for something the datasets do not have; an equation or bond line altered in translation |
| `cheat-sheets.test.ts` | a sheet, section, table row, bullet or resource that does not line up with the English; a formula, slug, icon or URL that changed |
| `plural.test.ts` | CLDR plural selection, including languages with three, four and one form |
| `routing.test.ts` | prefix/strip round-trips, idempotence, the unprefixed-path list |
| `locale-match.test.ts` | `Accept-Language` parsing, q-values, regional fallback, cookie precedence |
| `proxy.test.ts` | **Supabase cookies surviving a locale redirect**, negotiation, query preservation, cookie writes |
| `game-titles.test.ts` | a game with no translated title |
| `e2e/i18n.spec.ts` | the redirect, negotiation in a real browser, the switcher (including by keyboard), `<html lang>`, `hreflang`, German rendering on a hub/game/cheat sheet, auth under a prefix |
| `e2e/lewis-structures.spec.ts`, `e2e/reaction-balancer.spec.ts` | both games under a locale prefix, in English and (for the new game) in German |

The "identical to English" check has an allowlist in `dictionary.test.ts` for
words that are genuinely the same in both languages (*Feedback*, *Audio*,
*Base*). Every entry is asserted, so the list cannot rot into a way of silencing
the check: if a string stops being identical, the allowlist entry is flagged.

---

## Known gaps

Things this does **not** solve. None of them are bugs; they are decisions that
need making.

### Game and concept titles come from the database

`src/lib/dashboard-data.ts` reads game titles from the Supabase `games` table,
which has one English `title` column. `src/i18n/game-titles.ts` translates the
ones it recognises by id and falls back to the database value for anything else,
so a game added to the DB but not the dictionary shows in English rather than
blank. `PersonalScoreSummary`'s `conceptTitle` has no such mapping and is always
English.

**Decide before Phase 2:** keep the dictionary as the source of truth for
titles, or add a `games_i18n` table. The dictionary is simpler; a table means
non-engineers can add a game without a deploy.

### Supabase auth errors are English

`AuthForm` surfaces `error.message` from `supabase-js` verbatim ("Invalid login
credentials"). Mapping Supabase's error codes onto translated copy is a
contained piece of work and would remove the last English text from the German
sign-in flow.

### Linked resources are English

Every cheat-sheet resource points at an English-language site. The German and
French descriptions say so, but a reader gets an explanation in their own
language and then English source material. Local equivalents would be a content
task, and the per-locale summaries in `review-notes.ts` suggest candidates.

### Curriculum references are Australian

Every sheet cites the Victorian Curriculum or the VCE study design. Translated,
but not relevant to a German reader.

### No `sitemap.xml` or `robots.txt`

The app generates neither, so there was nothing to make locale-aware. If one is
added, it should list every locale's URL and set the `alternates` — the helper
for that is `localeAlternates()` in `routing.ts`.

### Clear `.next` after moving a route

Worth knowing, because it cost an hour: moving the app under `[lang]` left a
stale Turbopack cache in `.next`, and the moved
`/[lang]/cheat-sheets/[slug]` route then **hung at "Compiling" indefinitely**
in `next dev` — not slow, stuck, with no error. Every other route was fine, and
a nine-line version of the same page still hung, which makes it look convincingly
like a code bug. `rm -rf .next` fixed it; the page then compiled in four
seconds.

If a route hangs at compile after a move, clear `.next` before debugging the
code.

The same stale cache has a second face. When `i18n` was fast-forwarded into
`master` (2026-09-18) and `next dev` was started in a checkout whose `.next`
predated the merge, the server panicked on every HMR check ("Failed to write app
endpoint /(main)/games/page … Cell … no longer exists") and the browser
**reloaded every second or two**. Anyone pulling the `[lang]` move into an
existing checkout hits this. `rm -rf .next` before the first `npm run dev`
after the pull; `docs/TESTING.md` § Troubleshooting item 7 has the details.

### `NEXT_PUBLIC_SITE_URL`

The root layout needs an absolute base for canonical and `hreflang` URLs and
falls back to `http://localhost:3000`. **Set `NEXT_PUBLIC_SITE_URL` in
production** or the alternates will point at localhost.
