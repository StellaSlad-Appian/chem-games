# Internationalisation

How the multi-language setup works, how to add a language, and how to add a
string. Written for whoever adds French next.

Currently shipping: **English** (default) and **German**.
Planned: French, Spanish, Italian, Russian — see [Adding a locale](#adding-a-locale)
and [Plurals](#plurals), which is the one thing Russian will break.

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

Phase 1 was built so this is small. To add French:

1. **`src/i18n/config.ts`** — add `'fr'` to `LOCALES` and to `LOCALE_LABELS`,
   naming the language in itself: a French reader scans for "Français", not for
   "French".
2. **`src/i18n/dictionaries/fr.ts`** — copy `de.ts`, translate, keep
   `satisfies Dictionary`. `npm run typecheck` tells you what is missing.
3. **`src/i18n/dictionaries.ts`** — add the loader entry.
4. **`src/i18n/game-messages/<game>/fr.ts`** — one per game with a catalogue
   (Reaction Balancer and Share to Fill today), each `satisfies
   <Game>Messages`, plus its entry in that game's `CATALOGUES` map. The
   `Record<Locale, …>` there means adding `'fr'` to `LOCALES` fails to compile
   until every game has its file: a game that plays in English only is not
   done (`GAMES.md` § The rule).
5. **`src/i18n/chemistry-names/fr.ts`** — 118 elements, 35 compounds, 40 ions.
   Register it in `chemistry-names.ts`. The test tells you what is missing.
6. **`src/i18n/cheat-sheets/fr.ts`** — the twelve sheets. Register it in
   `cheat-sheets.ts`. The test tells you what is missing and what has the wrong
   shape.
7. **`src/i18n/review-notes.ts`** — add a `fr` entry, and extend
   `scripts/i18n-review.mts` to emit `fr-review.md` as well.
8. **`docs/i18n/glossary-fr.md`** — decide the chemistry terms *before*
   translating, not during.

Nothing else. The proxy, the switcher, the `hreflang` alternates,
`generateStaticParams`, the tests and the e2e suite all read `LOCALES`.

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

Every cheat-sheet resource points at an English-language site. The German
descriptions say so, but a German student gets German explanations and English
source material. German equivalents would be a content task.

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
