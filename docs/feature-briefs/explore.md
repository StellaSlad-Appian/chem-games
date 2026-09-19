# Feature Brief: Explore

**Status:** draft — `YOU DECIDE` callouts to resolve before this is `Approved`.
**Owner:** Stella. **Written:** 2026-09-19. **Branch:** `feature/explore-page`.

A new top-level page, `/explore`, carrying three rotating editorial sections:
Molecule of the Week, Scientist of the Week, and a short Did-You-Know list.
Ships in every locale in `LOCALES` in the same milestone, like a game does.

Companion documents: [`AGENT_INSTRUCTIONS.md`](../AGENT_INSTRUCTIONS.md) (Part B
is the platform contract this feature obeys too), [`i18n/README.md`](../i18n/README.md),
[`i18n/GAMES.md`](../i18n/GAMES.md) (the every-locale rule and the four language
checks), [`ACCESSIBILITY.md`](../ACCESSIBILITY.md), [`STYLE_GUIDE.md`](../STYLE_GUIDE.md),
[`TESTING.md`](../TESTING.md). The implementation prompt is
[`explore-agent-prompt.md`](./explore-agent-prompt.md).

---

## 1. Review of the concept

### The concept is sound, and it is the cheapest useful thing left to build

The site is five mini-games plus twelve cheat sheets. Both are *task* content:
you arrive with homework and leave when it is done. There is nothing on the site
that rewards coming back on a day when you have no homework, and nothing that
says "chemistry is a thing people do" rather than "chemistry is a thing you are
tested on". Explore fills that gap without touching the game engine, the score
tables, or auth — which makes it low-risk next to every other item on the
roadmap.

It also fills a structural gap. Every current page is either a game or a
reference sheet; search engines see twelve evergreen URLs and five game URLs.
Weekly editorial gives the site a reason to change.

### The one thing that decides whether it works

**Every card must link into a game or a cheat sheet.** A rotating page that only
tells you things is a blog, and a blog on a games site is a dead end: the reader
finishes the paragraph and closes the tab. The same page where each molecule
carries "Practise this in Formula Blaster" and each scientist carries "The
chemistry behind this: Balancing Equations" is a funnel that feeds the thing the
site is actually for.

This is an acceptance criterion below (AC-6), not a nice-to-have. If a candidate
molecule cannot be linked to a cheat sheet or a game, it is the wrong molecule
for this site — pick another.

### Section-by-section

**Molecule of the Week — keep, this is the strongest of the three.** Everyday
molecules are the standard answer to "why am I learning this", they are
inexhaustible, and they map onto the existing compound registry and cheat sheets
for free. Caffeine, citric acid, sodium bicarbonate, capsaicin, ethanol,
paracetamol, ammonia (Haber process), sodium hypochlorite, PET, methane — all of
them land on a cheat sheet the site already has.

**Scientist of the Week — keep, and the gender-balance goal is achievable, but
the mechanism matters.** See §4; the short version is that the balance must be
enforced by a test over a curated schedule, and gender must never appear in the
UI.

**Did You Know — keep, with a guard.** Quick facts are the single most common
carrier of chemistry misinformation on the web ("glass is a slow-moving liquid",
"you only use water to put out fires", "natural means no chemicals"). A fun-fact
section with no sourcing requirement will, over 104 weeks, ship something wrong,
and wrong chemistry on a site aimed at students is worse than no section. So:
every fact carries a source URL in the data, the same way `cheat-sheet-data.ts`
carries verified resource links, and the accuracy bar is the one in
`AGENT_INSTRUCTIONS.md` Part A (100% correct, and no statement that plants a
misconception).

I would also call the section **"Did you know?"** rather than "Fun facts" in
English — it promises the same lightness without promising entertainment the
chemistry cannot always deliver, and it translates cleanly into all five
languages. `YOU DECIDE`.

**Three sections is the right number.** Two feels thin for a top-level nav item;
four starts to look like a newsletter. Stop at three.

### What the concept is missing

- **One clock.** If the molecule changes daily and the scientist weekly, the page
  has two datelines and the reader cannot tell what is new. Everything rotates
  together, on the same Monday, under one "Week of 21 September" dateline.
- **Reachability below `lg`.** `NavBar.tsx` renders its links as
  `hidden … lg:flex` and there is no mobile menu, so on a phone the top bar has
  no links at all — Cheat Sheets is currently reachable only by typing the URL.
  Adding Explore to that nav therefore does *not* make it reachable for phone
  users. AC-2 requires a dashboard entry point as well. (The missing mobile nav
  is a pre-existing bug, not this feature's to fix.)
- **Nav width.** The comment in `NavBar.tsx` records that at 1280px the German
  header was already 1014px of content before gaps, which is why the nav appears
  at `lg` and not `md`. A fifth item is added to that measurement, in the widest
  language. AC-2 requires re-measuring, not assuming.

---

## 2. Decision: weekly, not daily

**Recommendation: weekly, for every section.** The reasons, strongest first:

1. **Cost per slot is multiplied by five.** Every entry is English prose plus
   four translations (six locales once Russian lands), each held to the standard
   the cheat sheets were held to — there is a review document and a glossary per
   language. Daily rotation over the two-year cycle you described is 730 entries
   × 5 locales = **3,650 prose blocks**. Weekly is 104 × 5 = **520**. The second
   number is a large but finite writing project. The first is not a project, it
   is a staffing decision.
2. **Daily only pays off if people return daily.** They will not. A chemistry
   revision site is visited when there is homework or an exam — roughly weekly,
   clustered before assessment. Daily rotation means most entries are never seen
   by anyone, which is the worst possible return on the translation cost.
3. **Weekly matches the 2-year cycle you want exactly.** 104 weeks = 104 entries
   = two years, with the same molecule returning in week 105. Daily needs 730
   before it repeats.
4. **Weekly gives search engines something stable.** A URL whose content changes
   every day accumulates nothing; a week is long enough for a page to be crawled
   and indexed while the content is still on it.
5. **It lets the three sections share one dateline** (above).

Your instinct about the traffic is right, and it points the same way as the cost.

**What weekly does *not* mean:** it does not mean 104 entries before launch. The
cycle length is the pool size, so the feature works from the first week with a
small pool and grows. See §3.

---

## 3. Decision: where the content lives

You suggested the database. **Recommendation: the prose lives in TypeScript, and
the database gets a registry row per entry** — which is precisely the split
`supabase/migrations/20260913_create_concepts.sql` already chose for cheat
sheets, and its own comment explains why:

> Cheat-sheet CONTENT stays in `src/lib/cheat-sheet-data.ts` (it is statically
> rendered). This table is a registry keyed by slug so the DB can link and
> report on sheets; a content column can be added later if editing moves to an
> admin UI.

The same four reasons apply here, and one more:

1. **There is no admin UI.** "In the database" today means writing SQL migration
   files by hand. That is the same writing work with worse tooling — no
   typecheck, no diff review of prose, no editor support.
2. **The i18n gates only exist in code.** `npm test` fails when a locale is
   missing a key, has an empty value, drops a `{placeholder}`, or leaves a string
   byte-identical to the English. Content in Postgres has none of that: a missing
   Italian molecule ships as a blank card or a silent English fallback, and
   nobody finds out.
3. **The site must work with Supabase unconfigured.** `dashboard-data.ts`
   returns empty arrays and pages render empty states in that case. An Explore
   page whose entire content is a database read is a blank page in local
   development and during any Supabase outage.
4. **This content is static and tiny.** It changes when someone writes a new
   entry — i.e. in a pull request — not from user action. That is what source
   control is for.
5. **Reuse.** A molecule already in `compounds.ts` should reference that registry
   id rather than restating its formula, so the two can never disagree. A
   database copy cannot do that.

**So:** prose and structure in `src/lib/explore/*` with per-locale overlays in
`src/i18n/explore/<locale>.ts`, mirroring the cheat-sheet overlay pattern exactly;
plus a migration adding `explore_molecules` / `explore_scientists` registry tables
(slug, active, display order, linked concept) so the DB can report on and link to
them later, and so an admin UI stays possible without a rewrite.

`YOU DECIDE` — if you want DB-first anyway, say so and the prompt changes:
the page reads from Supabase with the TypeScript pool as a build-time seed and
runtime fallback, and AC-8's parity test moves to a migration-time check. Ask for
this only if you expect to be editing entries without a deploy.

### Launch pool size

`YOU DECIDE`, recommendation: **12 molecules, 12 scientists (6 women, 6 men), 24
facts** at launch. That is a 12-week cycle that grows toward 104 as entries are
added, and it is enough content to judge whether the section deserves the other
92. The rotation is `weekIndex % pool.length`, so appending entries is safe at
any time; it does shift which entry a given future week shows, which is fine for
editorial content and is stated in AC-4.

---

## 4. Decision: how the gender balance is enforced

The goal is right and it is worth doing properly, because the naive version of
this fails in two specific ways.

**Failure 1: drift.** Nobody sets out to write eight men in a row; it happens
because the famous names that come to mind first are men, and each individual
choice looks defensible. The fix is mechanical: the schedule is a curated
ordered list, and a test asserts the invariant. AC-7 specifies it —
**for every prefix of the schedule, |women − men| ≤ 1**. Prefix, not total, is
the important part: a pool that is 50/50 overall but front-loads six men is
still six weeks of six men for the readers who were there.

**Failure 2: framing.** The subtler bias is not who is featured but how. The
standard pattern is that men get "discovered X, founded the field of Y" and women
get "was overlooked, was denied credit, worked in a shed". Both stories are true
and the credit stories matter, but if every woman's entry is a story about
injustice and every man's is a story about science, the section teaches that men
do chemistry and women have things done to them. The fix is structural: **every
entry has the same field set, the same word budget, and leads with the science.**
Credit history goes in its own optional field, available to any entry, and the
test asserts it is not used more often for one group than the other (AC-7).

**Gender is never displayed.** No "female chemist" label, no badge, no
separate list. It is scheduling metadata only. Being labelled as the woman is
itself the bias the section is trying to correct, and a reader who wants to
notice the balance can just read the page over a few weeks.

**Pick internationally, not just anglophone.** The site ships in German, French,
Spanish, Italian and soon Russian. A pool of Anglo-American scientists reads, in
those languages, as a translated American site. Including e.g. Marie Curie
(FR/PL), Justus von Liebig (DE), Margarita Salas (ES), Giulio Natta (IT),
Dmitri Mendeleev (RU), Rita Levi-Montalcini (IT), Alice Ball (US),
Tu Youyou (CN) makes each locale feel addressed rather than served a translation.
This is a content instruction in the prompt, and it costs nothing extra.

The `represents` field is `'woman' | 'man' | 'other'`; `'other'` entries take a
slot without counting toward either side of the balance invariant, so a
non-binary scientist can be scheduled without anyone having to decide which
column they belong in.

---

## 5. Freshness

Two clocks, both requested, both mechanical:

- **`reviewedOn` per entry.** A test fails when any *active* entry has not been
  reviewed in **3.5 years**, naming the entries. 3.5 rather than 4 so there is a
  runway before your four-year mark rather than a surprise red build on the day.
- **`sourcesVerifiedOn` per entry.** Source URLs rot. Same convention as
  `cheat-sheet-data.ts` ("all URLs verified 2026-09-13"), reported by the same
  test.

A build that goes red on a date is a deliberate reminder mechanism, not an
accident — the failure message must say so and say exactly which entries and what
to do, or whoever hits it in 2030 will just delete the test.

---

## 6. Acceptance criteria

Numbered so the milestone can be reported against them. "Every locale" means
every entry in `LOCALES` at implementation time (`en`, `de`, `fr`, `es`, `it`).

### AC-1 — The page exists and is localized
- [ ] `/(main)/explore` renders at `/en/explore`, `/de/explore`, `/fr/explore`,
      `/es/explore`, `/it/explore`. The URL segment stays English in every
      locale, like `/cheat-sheets`.
- [ ] It is a Server Component under the `(main)` group, so it gets `NavBar` and
      the footer, and its content never reaches the client bundle.
- [ ] `generateMetadata` supplies a localized title and description and
      `alternates.canonical` + `alternates.languages` from
      `localeAlternates('/explore')`, mirroring the cheat-sheet detail page.
- [ ] The page re-renders at least hourly so the week can turn over without a
      deploy. Use whatever the shipped Next 16 docs in
      `node_modules/next/dist/docs/` prescribe for this — read them first, per
      `AGENTS.md`; do not assume an API from memory.

### AC-2 — It is reachable
- [ ] A fifth entry in the `sections` array in `NavBar.tsx`, label from
      `t.nav.explore`, `lucide-react` icon, `LocaleLink`.
- [ ] The header is re-measured at 360px, 768px, 1024px and 1280px **in the
      widest language** (German or Italian). No horizontal page scroll at any
      width — `ACCESSIBILITY.md` (1.4.10) forbids it. If the fifth item breaks
      the `lg` row, report the measurement and the options rather than shipping
      an overflowing header.
- [ ] Because the nav is hidden below `lg` and there is no mobile menu, the
      dashboard (`(main)/page.tsx`) also gets a link into Explore, so phone users
      can reach it. Match the existing section styling; do not invent a new card
      pattern.

### AC-3 — Three sections, one clock
- [ ] Molecule of the Week, Scientist of the Week, and the quick-facts list, in
      that order, each an `<h2>` under a single `<h1>`.
- [ ] One dateline naming the current week, formatted per locale with `Intl`,
      never a hand-built date string.
- [ ] All three change on the same boundary: **Monday 00:00 UTC**. UTC is chosen
      for determinism (a local-time boundary makes the tests flaky and the
      cached page ambiguous); the dateline is the only thing the reader sees.

### AC-4 — Rotation is pure and deterministic
- [ ] The rotation lives in one module, takes `now: Date` as a parameter, and
      has no I/O. The page passes `new Date()`; tests pass fixed dates.
- [ ] `weekIndex(now)` counts whole weeks from a documented epoch constant;
      selection is `pool[weekIndex % pool.length]`, so a pool of any size ≥ 1
      works and the cycle equals the pool size.
- [ ] Unit tests cover: the epoch week, the Monday boundary (Sunday 23:59:59 UTC
      and Monday 00:00:00 UTC are different weeks), wrap-around past the end of
      the pool, a DST-affected date, and a leap year.
- [ ] Documented in the module: appending entries changes which entry future
      weeks show. It must never produce an empty section.

### AC-5 — Content model
- [ ] English is canonical in `src/lib/explore/` (molecules, scientists, facts,
      rotation). Every other locale contributes a prose overlay in
      `src/i18n/explore/<locale>.ts`, keyed by the same ids, resolved with a
      registry fallback the way `chemistry-names.ts` does.
- [ ] Formulae, element symbols, CAS numbers, IUPAC names, slugs, ids, dates and
      URLs are **never** in an overlay.
- [ ] A molecule that already exists in `src/core-engine/data/compounds.ts` (or
      `elements.ts`) references it by id and does not restate its formula or
      English name. A data-integrity test asserts any denormalized field matches
      the registry, in the style of `core-engine/tests/compounds.test.ts`.
- [ ] Page chrome strings (headings, labels, the dateline pattern, accessible
      names) go in `src/i18n/dictionaries/<locale>.ts` under a new `explore`
      namespace. **Entry prose does not** — it is loaded only by this page, the
      way a game catalogue is, so the shared dictionary stays UI-sized and the
      budget assertion in `dictionary.test.ts` keeps passing.

### AC-6 — Every card links inward
- [ ] Every molecule entry links to at least one cheat sheet or game, through
      `LocaleLink`, with a localized call to action.
- [ ] Every scientist entry links to at least one cheat sheet, game or concept.
- [ ] A test asserts this for every entry, and that every link target actually
      exists (the slug is in `CHEAT_SHEETS`, the game slug is in `GameName`) — a
      typo here is a 404 that nothing else catches.
- [ ] Facts may link, and are not required to.

### AC-7 — Gender balance is enforced, not intended
- [ ] Every scientist entry carries `represents: 'woman' | 'man' | 'other'`.
      It is scheduling metadata and is **never rendered**.
- [ ] The schedule is an explicit ordered list of ids, not a computed shuffle.
- [ ] Tests assert: for every prefix of the schedule, `|women − men| ≤ 1`; no
      two consecutive weeks have the same `represents` value except where an
      `'other'` entry sits between them; and the counts over the full cycle
      differ by at most one.
- [ ] Every entry has the same required fields and a body within the same word
      band (target 120–180 words in English). A test asserts the band.
- [ ] Every entry's body leads with the science. The optional credit-history
      field is used for at most ⌈n/4⌉ entries and is not used more than twice as
      often for one `represents` value as another — asserted by a test.
- [ ] The pool spans more than the anglosphere, and includes at least one
      scientist associated with each shipping locale's language area.

### AC-8 — Every locale, enforced
- [ ] A parity test in the style of `cheat-sheets.test.ts` / `chemistry-names.test.ts`:
      every id is present in every locale, no locale has an id the English pool
      lacks, no empty strings, placeholders preserved, nothing left byte-identical
      to the English except through a documented allowlist entry.
- [ ] `review-notes.ts` gains entries for the `explore` namespace and
      `npm run i18n:review` is re-run so every `<locale>-review.md` covers it.
- [ ] Any chemistry or biography term that is new goes into
      `docs/i18n/glossary-<locale>.md` **before** the prose is translated.
- [ ] The four language checks in `docs/i18n/GAMES.md` are done per locale and
      reported: correctness, reading age ~12, correct chemical naming for that
      language, and whether the section titles sound right in that culture.

### AC-9 — Freshness
- [ ] Every entry carries `writtenOn`, `reviewedOn`, `sourcesVerifiedOn` (ISO
      dates) and at least one `{ label, url }` source. Facts included — especially
      facts.
- [ ] A test fails when an active entry's `reviewedOn` or `sourcesVerifiedOn` is
      more than 3.5 years old, naming the entries and saying what to do.
- [ ] An `isActive` flag lets an entry be retired without deleting it or
      disturbing the ids.

### AC-10 — Accessibility and presentation
- [ ] One `<h1>`, `<h2>` per section, no skipped levels; sections are landmarks
      with accessible names.
- [ ] No horizontal scroll and no clipped text at 360px in every locale.
- [ ] Light and dark both correct, using the existing custom properties from
      `globals.css` — no new hex colours.
- [ ] Formulae are typeset with the existing shared component rather than
      hand-written `<sub>` tags; subscripts and charges render correctly in every
      locale.
- [ ] Content is static, so no live regions; any disclosure control is keyboard
      operable and labelled.
- [ ] No molecular structure diagrams in v1 — formula, name and prose only.
      Diagrams are a separate piece of work with its own alt-text contract.

### AC-11 — Database registry
- [ ] A new migration (never an edit to an existing one) creates
      `public.explore_molecules` and `public.explore_scientists`: slug primary
      key with the same slug regex check the existing tables use, `is_active`,
      `display_order`, optional `concept_id` FK, `created_at`/`updated_at` with
      the shared `set_updated_at` trigger, RLS on, public read of active rows,
      no client writes. Seeded idempotently with `on conflict … do update`.
- [ ] The page does not read these tables in v1, and renders identically with
      Supabase unconfigured. A test or the page's own structure makes that
      obvious.

### AC-12 — Definition of done
- [ ] `npm run lint` (over `src e2e`), `npm run typecheck`, `npm test`,
      `npm run build` all pass.
- [ ] `page.test.tsx` covers: all three sections render, the dateline is right
      for a fixed date, inward links are present, and a pool of size 1 still
      renders.
- [ ] `e2e/explore.spec.ts` covers: the page loads in every locale with the
      right `html lang`, the nav entry navigates there and keeps the locale, the
      language switcher preserves the path, an inward link reaches a real page,
      and there is no horizontal scroll at 360px.
- [ ] Verified in a real browser at `npm run dev` in at least English and German
      — typechecking is not a substitute for looking at it.
- [ ] `docs/feature-briefs/explore.md` updated with anything the build proved
      wrong.

---

## 7. Out of scope for v1

Named so they are not quietly added, and not quietly forgotten:

- Per-entry permalinks and an archive (`/explore/molecules/<slug>`). This is
  where the real SEO value is — 104 URLs instead of 1 — but it is 104 × 5 pages
  and it should follow once the section has proven itself. Design the ids and
  slugs now so it is additive later.
- A `sitemap.ts`. There is none in the repo today, although `routing.ts` already
  exempts `/sitemap.xml` from prefixing. Separate piece of work.
- Molecular structure diagrams (AC-10).
- An admin UI for editing entries.
- The missing mobile navigation menu (§1) — a pre-existing bug this feature must
  work around, not fix.
- Any change to `LOCALES`. Russian arrives on its own branch; when it does, this
  content is part of what that branch translates.
