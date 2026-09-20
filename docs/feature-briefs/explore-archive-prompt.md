# Agent prompt: the Explore archive

Copy everything below the line into a fresh agent session.

Context for whoever hands it over: Explore currently shows one week and nothing
else. Twenty pairs of prose, in five languages, each visible for seven days
before disappearing for five months. This makes that investment keep paying, and
turns 40 entries sharing one URL into 40 indexable pages.

---

You are adding an archive to the **Explore** page of **chem-games**, a Next.js 16
+ React 19 + Tailwind 4 + Supabase site of chemistry mini-games and reference
sheets for secondary students. Create a branch named `feature/explore-archive`.

## Before you write anything

1. **Read `AGENTS.md` at the repo root and obey it.** This is not the Next.js in
   your training data — read the relevant guide in `node_modules/next/dist/docs/`
   before touching any framework API. Routing, `generateStaticParams` and
   metadata all matter here.
2. **Read `docs/feature-briefs/explore.md`** — the brief. §0, §0b and §0c record
   what the build proved wrong, the readability rules, and why Russian content is
   deferred. All three constrain you.
3. **Read `docs/feature-briefs/explore-scientists.md`** §2 for the pairing rule.
4. **Read the code you are extending:**
   - `src/lib/explore/rotation.ts` — the pure week→entry function. **The archive
     is derived from this, not from a second list.**
   - `src/lib/explore/schedule.ts` — the 20 curated pairs, in order.
   - `src/i18n/explore.ts` — `getExploreContent`, the overlay resolution, and
     `EXPLORE_UNTRANSLATED_LOCALES`.
   - `src/app/[lang]/(main)/explore/page.tsx` and `src/components/explore/*`.
   - `src/app/[lang]/(main)/cheat-sheets/[slug]/page.tsx` — the closest existing
     example of a localised detail route with `generateStaticParams`.
   - `docs/EXPLORE_IMAGES.md` — every entry already has a picture slot.

## What to build

Three things, and the distinction between the first two is the whole design.

### 1. Permalinks that never expire

```
/[lang]/explore/molecules/[id]
/[lang]/explore/scientists/[id]
```

One page per entry, for **every** entry in the pool — not just recent ones. A
shared link must keep working forever. `id` is the entry's existing id, which is
already stable, already the filename of its picture, and already locale-
independent, so `/de/explore/molecules/sodium-sulfate` is the German page for the
same entry.

Each page shows that entry as the card already renders it, plus the week it was
featured and a link to its pair — the molecule and scientist of a week belong
together and the pair is the unit of meaning.

`generateStaticParams` over the whole pool. These are static pages; nothing here
needs a request.

### 2. A recent list, capped at ten

On `/[lang]/explore`, under the current week: the **ten most recent past weeks**,
newest first, each a compact row linking to both permalinks with the week it ran.
Not the whole pool — ten is a browsing aid, and a list of 104 is a different
page.

**Ten is a display limit, not a lifetime.** An entry that falls off the list keeps
its permalink. Do not implement "expiry" of any kind.

### 3. The index

`/[lang]/explore/archive` — every entry that has been featured, grouped by
month or by rotation order, whichever reads better once you see the data. This is
what makes the pool browsable and what search engines crawl.

## The hard part, and where this will go wrong

**The archive is a function of the same clock the page already uses.** There is
one clock in this feature — `getExploreContent(locale, now)` — and everything
downstream is a pure function of it. Do not add a second source of truth for
"which weeks have happened". Derive the past weeks from `weekIndex(now)` and the
schedule, in the same pure module, taking `now` as a parameter so every test can
pin a date.

Three specific traps:

- **Before the epoch there is no history.** `weekIndex` counts from a documented
  epoch. In the first weeks after launch there are fewer than ten past weeks, and
  at week 0 there are none. The recent list must render correctly with 0, 1 and 9
  past weeks — not just with 10. Test all four.
- **The rotation wraps.** With 20 pairs the cycle repeats every 20 weeks, so
  "eleven weeks ago" and "thirty-one weeks ago" are the *same pair*. The recent
  list must not show the same entry twice, and a permalink must not claim to be
  "the week of" a single date when it has run more than once. Decide what a
  permalink says about dates, and say why in a comment. **This is the thing most
  likely to be got wrong.**
- **Adding pairs shifts the schedule.** `explore.md` AC-4 documents that
  appending entries changes which week shows what. Past weeks computed from
  today's pool are therefore not a historical record — they are "what the
  rotation would have shown". If you want a real record, that is a database
  table and a much larger change; do not build one without asking. Write down
  which of the two you implemented, in the module, where the next reader will
  find it.

## Every locale

`LOCALES` is `['en', 'de', 'fr', 'es', 'it', 'ru']` — **six**.

- Every new string goes in the `explore` namespace of all six dictionaries. The
  parity, empty-value, placeholder and identical-to-English gates all apply;
  `npm test` will tell you.
- **Russian prose is deferred**, listed in `EXPLORE_UNTRANSLATED_LOCALES` in
  `src/i18n/explore.ts` and explained in `explore.md` §0c. Russian gets the
  chrome you write, and the entry prose stays English under the existing notice.
  The archive must honour that: the notice belongs on a permalink page too.
- Dates are formatted with `formattingLocale(locale)` from `src/i18n/config.ts`,
  **never** the raw locale — `Intl.DateTimeFormat('en')` resolves to en-US and
  writes "September 21, 2026" on an Australian site.
- Any new sentence is subject to `src/lib/explore/readability.test.ts`: no
  sentence over its locale's limit (en 30, de 28, fr 34, es 33, it 33).

## Metadata and discoverability

This is half the point of the feature.

- `generateMetadata` on every permalink: a title naming the entry, a description
  from its own prose, and `alternates.canonical` + `alternates.languages` rebuilt
  from `localeAlternates()`. Metadata does **not** deep-merge — returning
  `alternates` replaces the layout's whole object, so it has to be rebuilt for
  the path or every locale inherits the site root's canonical.
- The pictures are already there (`docs/EXPLORE_IMAGES.md`). Consider an
  `openGraph.images` entry per permalink; the files are placeholders today, so
  check what a placeholder looks like when shared before deciding.
- There is still **no `sitemap.ts`** in this repo, and these pages are exactly
  what one is for. Do not build it here — it is separately scoped — but say in
  your report how many URLs this adds, so it can be sized.

## Rules of engagement

- Do **not** add a dependency. No date library; `Intl` covers formatting.
- Do **not** hardcode colours; use the custom properties in `src/app/globals.css`.
- Do **not** duplicate a card. `MoleculeCard` and `ScientistCard` already render
  an entry; reuse them, and if a permalink needs a variant, add a prop rather
  than a second component.
- **Grep before adding a type.** This repo already carries competing
  near-duplicate shapes for reaction data.
- Lint with `npm run lint -- src e2e`, not the repo root. The baseline is 21
  problems, all pre-existing; add none.
- Next 16 refuses a second dev server in one directory. If `npm run e2e`
  collides, start your own on a free port and pass
  `PLAYWRIGHT_BASE_URL=http://localhost:<port>`.
- **Look at the rendered pages**, light and dark, at 320px and desktop, in at
  least English and Russian. Two lessons from this feature's history, both of
  which cost a day: Playwright's `toBeVisible()` is satisfied by a bounding box
  and knows nothing about a clipping ancestor, and `scrollWidth <= innerWidth`
  cannot detect an over-full flex row because the row compresses instead of
  overflowing. Measure natural width with `width: max-content`, the way
  `e2e/nav.spec.ts` does.
- Commit in coherent steps, ending each message with
  `Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>`.

## Definition of done

- [ ] `npm run lint -- src e2e`, `npm run typecheck`, `npm test`,
      `npm run build` all pass; `npm run e2e` passes.
- [ ] Permalinks resolve for **every** entry in **every** locale, and are
      statically generated.
- [ ] The recent list renders correctly with 0, 1, 9 and 10 past weeks, and
      never shows the same entry twice across a rotation wrap.
- [ ] A permalink is honest about dates when its entry has run more than once,
      and a comment says what was decided.
- [ ] No horizontal scroll at 320px in any locale, measured by natural width.
- [ ] `hreflang` alternates are correct on every new route.
- [ ] The Russian untranslated notice appears on permalinks too.
- [ ] The report states: how many URLs this adds, whether the archive is
      derived or recorded, and anything decided that this prompt did not cover.
