# Agent prompt: the Explore tab layout

Copy everything below the line into a fresh agent session. It assumes nothing
from any prior conversation.

Context for whoever hands it over: Explore shows the molecule and the scientist
side by side in a two-column grid, and on a laptop the reader scrolls past most
of a screen of one card before reaching anything else. This replaces the grid
with a three-tab sub-navigation and fixes the picture sizing that the grid was
hiding. The reasoning, the alternatives that were rejected, and the one
retreat that is deliberately kept cheap are all in
[`explore.md`](./explore.md) §9 — read it, it is the specification and this
prompt is only the build order.

---

You are changing the layout of the **Explore** page of **chem-games**, a Next.js
16 + React 19 + Tailwind 4 + Supabase site of chemistry mini-games and reference
sheets for secondary-school students. Create a branch named
`feature/explore-tabs`.

This is a layout and navigation change. **No chemistry content changes, no
rotation changes, no new entries, no new pictures.**

## Before you write anything

1. **Read `AGENTS.md` at the repo root and obey it.** This is not the Next.js in
   your training data — read the relevant guide in `node_modules/next/dist/docs/`
   before touching any framework API, and heed deprecation notices. The three
   that matter here are
   `01-app/03-api-reference/04-functions/use-selected-layout-segment.md`,
   `01-app/03-api-reference/03-file-conventions/layout.md`, and route groups.
   Confirm each against those files rather than from memory.
2. **Read `docs/feature-briefs/explore.md` §9** — the decision this prompt
   builds, including what it supersedes in AC-3 and the two alternatives that
   were rejected on purpose. §0, §0b and §0d also still constrain you.
3. **Read `docs/ACCESSIBILITY.md`.** The 320px rule (WCAG 1.4.10) and the 44px
   target rule both bite in a three-pill strip.
4. **Read the code you are changing, and match it rather than improving on it:**
   - `src/app/[lang]/(main)/explore/page.tsx` — read the header comments before
     changing anything. They record why the URL segment stays English in every
     locale and why `revalidate` is the literal `3600`. Both still apply.
   - `src/app/[lang]/(main)/explore/archive/page.tsx` — same; its ordering
     rationale and its "no sitemap" note both survive this change.
   - `src/components/explore/MoleculeCard.tsx` and `ScientistCard.tsx` — in
     particular the `standalone` prop and its doc comment.
   - `src/app/[lang]/(main)/layout.tsx` — the typed-props convention
     (`LayoutProps<'/[lang]'>`, `await props.params`) you are copying.
   - `src/components/layout/LocaleLink.tsx` and `NavBar.tsx`.
   - `src/i18n/dictionary.test.ts` — the gate on the six dictionaries.

## Route structure

Three tabs. `/explore` **is** the molecule tab — no redirect, no fourth URL, no
duplicate content. A layout returns `null` from `useSelectedLayoutSegment` for
its own route, which is the signal you use.

| Tab                   | URL                  |
| --------------------- | -------------------- |
| Molecule of the week  | `/explore`           |
| Scientist of the week | `/explore/scientist` |
| Archive               | `/explore/archive`   |

Segment names stay English in every locale, per the existing convention.

**The tabs layout must not wrap the entry permalinks.** A layout at
`explore/layout.tsx` would also wrap `explore/molecules/[id]` and
`explore/scientists/[id]`, giving them a tab strip and an "Explore" `<h1>` that
collides with the `standalone` mode that makes the entry name the `h1`. Use a
route group, so the URLs are unchanged:

```
src/app/[lang]/(main)/explore/
  (tabs)/
    layout.tsx           NEW — h1, intro, tab strip, <main>
    page.tsx             MOVED from explore/page.tsx — the molecule tab
    scientist/page.tsx   NEW
    archive/page.tsx     MOVED from explore/archive/page.tsx
  molecules/[id]/        unchanged, outside the group
  scientists/[id]/       unchanged, outside the group
```

Move each co-located `page.test.tsx` with its page.

## The layout

`(tabs)/layout.tsx`, a Server Component:

- Owns the `<main>` wrapper and the page container. The child pages render
  section content only, and must not render a second `<main>`.
- Owns the Compass icon, the `<h1>` (`t.explore.heading`) and the intro
  paragraph (`t.explore.intro`), all currently in `explore/page.tsx`.
- Owns the tab strip **and the dateline**, which moves onto the tab row.
- `<h1>` drops from `text-4xl md:text-5xl` to `text-3xl`. Under tabs it is
  wayfinding, and at its current size it competes with the entry name below it.
- Follow the sibling `(main)/layout.tsx` for typed props. Route groups do not
  appear in URLs, so this is `LayoutProps<'/[lang]/explore'>` — verify against
  the generated route types rather than assuming.

## The tab strip

A client component — `src/components/explore/ExploreTabs.tsx` — using
`useSelectedLayoutSegment`, imported into the server layout. Segment values from
`(tabs)/layout.tsx` are `null` for `/explore` (the molecule tab), `'scientist'`,
and `'archive'`.

### Content

Two lines per pill, plus the dateline right-aligned on the same row:

```
[🧪 Molecule    ] [🔬 Scientist   ] [🧭 Archive     ]      Week of 21 Sep 2026
[   Polypropylene] [  Giulio Natta ] [  Every entry ]
```

- **One-word labels on the first line.** Short new dictionary keys, not the
  existing `moleculeHeading` / `scientistHeading` / `archiveHeading` — those are
  full-length section headings, too long for a pill, and longer still in German
  and Russian.
- **The entry name on the second line.** The layout calls
  `getExploreContent(locale, now)` and passes `week.molecule.name` and
  `week.scientist.name` down as plain string props. No client fetching. The
  names are already localised.
- The archive pill gets a subtitle too, so all three pills are the same height —
  the existing `archiveCta` string ("Browse every entry") or a short equivalent.
  Two tall pills and a stub looks unfinished.
- **Every subtitle is uniformly muted** — `--muted`, ~13px, regular weight, on
  the active pill as well as the inactive ones. Show selection through the
  border and the label, never by bolding the name. §9 explains why: the name is
  deliberately allowed to repeat the card heading below, and it only reads as a
  glitch if it takes weight.
- Move the `FlaskConical` / microscope icons out of the cards and into the
  pills. With the eyebrow gone (below) they would otherwise sit undersized next
  to a 30px heading, and in the pills they give the strip its identity.

### Accessibility

This is routed navigation between documents, **not** the ARIA tabs pattern.

- `<nav aria-label="…">` containing `LocaleLink`s, with `aria-current="page"` on
  the active one.
- Do **not** use `role="tablist"` / `role="tab"` / `role="tabpanel"`. Those
  promise a screen reader that the panels are in this document, and they are
  not.
- `min-h-11` targets and the existing
  `focus-visible:outline-2 outline-offset-2 outline-blue-400` focus style.

### Visual treatment

- `rounded-xl` with `border-2`. Not `rounded-full` — a pill radius on a two-line
  box looks like a mistake.
- Steal the state treatment already on the archive CTA at the foot of
  `explore/page.tsx`: inactive is `border-(--border)` on `--surface` with muted
  text, active is `border-blue-500` with a blue label. That is literally its
  existing hover state, so the strip will look native for free.
- **No full-bleed background and no border spanning the viewport.**
  Free-standing pills on the page background, left-aligned to the content
  column. The strip sits directly under the site NavBar and must read as page
  content, not as a second menu bar. This is the single easiest thing to get
  wrong.
- Below `sm`, let the strip **wrap** to two rows rather than truncating the
  names or dropping the subtitles. Mobile is where the chemist is hardest to
  stumble across, so it is the worst place to remove the hint that they exist.

## The clock

This feature is deliberate about one `new Date()` per render tree — see "The
only clock in the whole feature" in `explore/page.tsx`. The layout now needs the
week too, so there will be a second reading. Do not paper over it: either thread
one value through, or add a comment saying that the layout and the page each
take their own reading, that they can only disagree across a Monday midnight
boundary, and that the hourly `revalidate` bounds the staleness. Keep both
testable with a pinned date the way they are now.

## The cards

In both `MoleculeCard.tsx` and `ScientistCard.tsx`:

1. **Drop the eyebrow inside the tabs, keep it on the permalinks.** It answers
   "what am I looking at"; in a tab the active pill answers it, and on a
   permalink nothing else does. `standalone` already carries the distinction.
   The heading tree becomes h1 Explore → h2 name → h3 "Everyday" in a tab, and
   h1 name → h2 "Everyday" on a permalink; `LabelTag`/`NameTag`/`SubTag`
   collapses to a pair, and `aria-labelledby` points at the name.
2. **Picture beside the prose.** The card body becomes a two-column grid from
   `lg` — roughly `lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]`, figure in column
   one, prose in column two — collapsing to one column below `lg`. Use
   `minmax(0,…)`, not `1fr`: a long unbreakable name blows a `1fr` column out,
   which is the same failure the existing `min-w-0` comments guard against.
3. **Cap the picture height** and add `object-contain`, so a tall portrait
   cannot stretch its column.
4. Apply 2 and 3 **unconditionally**, not behind a prop. The permalinks are
   `max-w-4xl` with no second column to borrow from and want this more than the
   tabs do.
5. The picture is optional on both cards. With no picture the layout must
   collapse to full-width prose, not leave an empty column.

Everything else about these components stays: presentational only, no chemistry
facts and no user-facing strings written into them, the formula keeps its
`sr-only` accessible name, the sources list is unchanged.

## The archive tab

- Drops its own `<h1>`, its intro paragraph and its "Back to Explore" link — the
  layout and the strip do all three now. Its heading demotes to `<h2>` and the
  levels below shift with it.
- **Gains the recent-weeks list.** Move `getExploreRecent` and the `WeekRow`
  list out of the molecule page and render it above the full rotation, keeping
  the existing "only render when non-empty" behaviour and the reasoning
  comment that goes with it.
- Keep its ordering rationale and its "no sitemap" note.

## i18n

Six locales — `en`, `de`, `fr`, `es`, `it`, `ru` — in `src/i18n/dictionaries/`.

- Add the three short tab labels plus an `aria-label` for the `<nav>`.
- The `archiveCta` and `backToExplore` strings lose their call sites. Grep for
  them; if nothing else uses them, remove them from all six dictionaries, or
  reuse `archiveCta` as the archive pill's subtitle.
- `src/i18n/dictionary.test.ts` enforces key parity across all six, carries an
  allowlist for strings identical across languages on purpose, and asserts the
  dictionary has stayed UI-sized. Read it before adding keys and keep it green.
- Every locale gets a real translation, not an English placeholder.

## Stale comments to rewrite

These describe a layout that will no longer exist. The house style is to explain
*why*, so update the reasoning rather than deleting the comment:

- The `standalone` doc in both cards: "On /explore two cards sit side by side
  under one page heading". They no longer do, but the heading-level rule is
  still correct — update the premise, keep the rule, and record that the eyebrow
  is now permalink-only.
- "One dateline for both sections" in `explore/page.tsx`. The dateline is now in
  the layout and renders once; the reasoning changes rather than disappears.
- The grid comment ("Side by side from `lg`, stacked below it… `items-start`").
- The archive CTA comment ("Always shown, even with no history…").

## Tests

- Update the molecule and archive `page.test.tsx`; add one for the scientist
  tab; add one for `ExploreTabs` covering the active state, `aria-current`, and
  the dynamic entry names.
- Update the Explore e2e spec for the new navigation.
- Default cadence is **targeted**: `npm run typecheck`, the scoped vitest files
  you touched, and one e2e spec. Run the full Playwright suite only before a
  merge to master.
- Lint with `npm run lint -- src e2e`, **not** the repo root — worktree build
  output pollutes it. Add no new problems to the existing baseline.

## Gotchas specific to this checkout

- **This change moves route files.** Delete `.next` before starting the dev
  server, or you will hit a reload loop or a Turbopack panic.
- **In a fresh worktree, `npm install` is not enough** — run `npx next typegen`
  first, or typecheck reports around 26 spurious `PageProps` errors. You are
  adding new routes, so the generated types must be regenerated before
  `LayoutProps<'/[lang]/explore'>` will resolve.
- Next 16 refuses a second dev server in one directory, and another session may
  already hold port 3000 with a broken server. Check the port; start your own on
  a free one and pass `PLAYWRIGHT_BASE_URL=http://localhost:<port>`.
- **Look at the rendered pages** — light and dark, at 320px, 375px and desktop,
  in at least English, German and Russian. Playwright's `toBeVisible()` is
  satisfied by a bounding box and knows nothing about a clipping ancestor, and
  `scrollWidth <= innerWidth` cannot detect an over-full flex row because the
  row compresses instead of overflowing. Measure natural width with
  `width: max-content`, the way `e2e/nav.spec.ts` does.
- Commit in coherent steps, ending each message with
  `Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>`. **Do not open a pull
  request** — commit locally and leave the compare link to the user.

## Out of scope

- Any change to the entry permalinks beyond the shared card restyle.
- Any change to the rotation, the schedule, the archive ordering, or the
  chemistry data.
- Adding a sitemap.
- New pictures.

## Definition of done

- [ ] `npm run typecheck`, the touched unit tests, one e2e spec, and
      `npm run lint -- src e2e` all pass. Report the actual output.
- [ ] `/explore`, `/explore/scientist` and `/explore/archive` each render under
      one shared header and tab strip, with the correct pill carrying
      `aria-current="page"`.
- [ ] The two entry pills show this week's molecule and scientist names,
      correct in all six locales, wrapping rather than truncating at 320px.
- [ ] The dateline appears once, on the tab row, on all three tabs.
- [ ] `/explore` fits its card above the fold on a 1440×900 laptop, with the
      picture beside the prose and its height capped.
- [ ] The permalinks at `/explore/molecules/[id]` and `/explore/scientists/[id]`
      are unchanged apart from the card restyle: no tab strip, no "Explore"
      heading, entry name still the `h1`, eyebrow still present.
- [ ] Every page has exactly one `<h1>`, one `<main>`, and no skipped heading
      levels.
- [ ] Keyboard: the strip is reachable and operable, focus is visible, targets
      are at least 44px.
- [ ] No horizontal scroll at 320px in any locale, measured by natural width.
- [ ] `hreflang` alternates are still correct on every route, including the
      moved ones.
- [ ] The report states: whether the active pill's repeated name reads as
      deliberate or as a glitch on real hardware (§9 keeps deleting the subtitle
      as a one-line retreat), and anything decided that this prompt did not
      cover.
