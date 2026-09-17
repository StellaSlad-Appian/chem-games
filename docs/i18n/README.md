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
  format.ts              {placeholder} interpolation
  dictionaries.ts        getDictionary(lang) — server side
  dictionaries/
    en.ts                the canonical dictionary; `Dictionary` is derived from it
    de.ts                `satisfies Dictionary`
  client.tsx             I18nProvider + useI18n() — client side
  server.ts              getRequestLocale/Dictionary for Server Actions & routes
  chemistry-names.ts     element / compound / ion names, by overlay
  chemistry-names/de.ts
  cheat-sheets.ts        cheat-sheet prose, by overlay
  cheat-sheets/de.ts
  game-titles.ts         reconciles dictionary titles with Supabase's `games` table
  review-notes.ts        the hand-written half of de-review.md
  *.test.ts              the quality gates

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

1. Add the key to `src/i18n/dictionaries/en.ts`, in the namespace where it
   belongs. Namespaces follow *where the string appears*, then *what it is*.
2. Run `npm run typecheck`. Every other locale now fails to compile. That is the
   point.
3. Translate it in each locale file.
4. `npm test` — the parity, empty-value, placeholder and not-actually-translated
   checks all run against the new key automatically.
5. `npm run i18n:review` and commit the regenerated `de-review.md`.

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
| UI strings | `dictionaries/<locale>.ts` | **Yes** — serialized into the RSC payload by `I18nProvider`. Keep it to UI copy. |
| Element / compound / ion names | `chemistry-names/<locale>.ts` | Only the names a page renders. |
| Cheat-sheet prose | `cheat-sheets/<locale>.ts` | No — the cheat-sheet pages are Server Components. |

The cheat sheets are roughly ten times the size of the UI dictionary. They are
kept out of the dictionary deliberately so they are never shipped to the
browser. **If you find yourself adding cheat-sheet prose to the dictionary, or
importing `cheat-sheets/de.ts` from a client component, stop** — that is the one
change that would make every page pay for content almost nobody reads.

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
4. **`src/i18n/chemistry-names/fr.ts`** — 118 elements, 35 compounds, 40 ions.
   Register it in `chemistry-names.ts`. The test tells you what is missing.
5. **`src/i18n/cheat-sheets/fr.ts`** — the twelve sheets. Register it in
   `cheat-sheets.ts`. The test tells you what is missing and what has the wrong
   shape.
6. **`src/i18n/review-notes.ts`** — add a `fr` entry, and extend
   `scripts/i18n-review.mts` to emit `fr-review.md` as well.
7. **`docs/i18n/glossary-fr.md`** — decide the chemistry terms *before*
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

**The current design handles two plural forms, which is enough for English,
German, French, Spanish and Italian — and is not enough for Russian.**

Today, a count-dependent string is a pair of keys and a ternary at the call
site:

```ts
f(count === 1 ? t.cheatSheets.countOne : t.cheatSheets.countOther, { count })
```

Call sites that do this:

| Key pair | Where |
|---|---|
| `cheatSheets.countOne` / `countOther` | `CheatSheetGrid.tsx` |
| `games.reactionBalancer.particleCountOneA11y` / `particleCountOtherA11y` | `ParticlePreview.tsx` |

Russian has three forms (one / few / many), chosen by a rule on the last one and
two digits: 1 книга, 2 книги, 5 книг, 21 книга, 25 книг. A `one`/`other` pair
produces text that is wrong roughly two-thirds of the time.

**The fix, when Russian lands:** change those dictionary entries from two flat
keys to a record keyed by CLDR plural category, and replace the ternary with
`Intl.PluralRules`:

```ts
// dictionary
count: { one: '{count} Thema', other: '{count} Themen' }
// ru: { one: '…', few: '…', many: '…', other: '…' }

// call site
const rule = new Intl.PluralRules(locale).select(count);
f(t.cheatSheets.count[rule] ?? t.cheatSheets.count.other, { count });
```

`Intl.PluralRules` ships with Node and every browser we support, so this needs
no dependency either. Two call sites is a morning's work — but it must happen
*before* the Russian dictionary is written, not after, or the Russian file gets
written against the wrong shape.

There is deliberately no `plural()` helper in `format.ts`. One would only
hard-code the two-form assumption in a third place and make the problem look
solved; `format.ts` says so where someone would go looking for it.

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
| `dictionary.test.ts` | missing keys, extra keys, empty values, values left identical to English, dropped or renamed placeholders, formulae altered in translation, non-`{name}` placeholder syntax |
| `chemistry-names.test.ts` | an element, compound or ion with no name in some locale; an overlay entry for something the registry does not have |
| `cheat-sheets.test.ts` | a sheet, section, table row, bullet or resource that does not line up with the English; a formula, slug, icon or URL that changed |
| `routing.test.ts` | prefix/strip round-trips, idempotence, the unprefixed-path list |
| `locale-match.test.ts` | `Accept-Language` parsing, q-values, regional fallback, cookie precedence |
| `proxy.test.ts` | **Supabase cookies surviving a locale redirect**, negotiation, query preservation, cookie writes |
| `game-titles.test.ts` | a game with no translated title |
| `e2e/i18n.spec.ts` | the redirect, negotiation in a real browser, the switcher (including by keyboard), `<html lang>`, `hreflang`, German rendering on a hub/game/cheat sheet, auth under a prefix |

The "identical to English" check has an allowlist in `dictionary.test.ts` for
words that are genuinely the same in both languages (*Feedback*, *Audio*,
*Base*). Every entry is asserted, so the list cannot rot into a way of silencing
the check: if a string stops being identical, the allowlist entry is flagged.

---

## Known gaps

Things this Phase 1 does **not** solve. None of them are bugs; they are
decisions that need making.

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

### Lewis Structures is not covered

The **Lewis Structures** game is on the in-flight `feature/lewis-structures`
branch and is not on `master`, so it was outside this pass. When that branch
merges, these need extracting into the dictionaries:

```
src/components/games/lewis-structures/**
src/core-engine/config/games/lewis-structures-*.ts
src/core-engine/data/lewis-molecules.ts
src/hooks/useLewisStructures.ts
src/components/games/shared/CoachPanel.tsx
src/components/games/shared/GlossaryTerm.tsx
src/components/games/shared/AtomCanvas/
```

The dictionary is ready for it: add a `games.lewisStructures` namespace
alongside the other four games, and molecule names go in `chemistry-names/`
next to the compounds. The glossary already fixes the terms that game needs —
**Lewis-Formel**, **freies Elektronenpaar**, **Atombindung**,
**Valenzelektronen**, **Oktettregel**, **Formalladung** — so its copy can be
translated without re-deciding any terminology. `CoachPanel` and `GlossaryTerm`
are shared components, so translating them will also benefit any later game.

Note that the `lewis-structures` **cheat sheet** already exists on `master` and
*is* translated; only the game is outstanding.

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

### `NEXT_PUBLIC_SITE_URL`

The root layout needs an absolute base for canonical and `hreflang` URLs and
falls back to `http://localhost:3000`. **Set `NEXT_PUBLIC_SITE_URL` in
production** or the alternates will point at localhost.
