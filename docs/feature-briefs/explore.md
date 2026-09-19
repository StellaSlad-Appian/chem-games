# Feature Brief: Explore

**Status:** draft — `YOU DECIDE` callouts to resolve before this is `Approved`.
**Owner:** Stella. **Written:** 2026-09-19. **Branch:** `feature/explore-page`.

A new top-level page, `/explore`, carrying two rotating editorial sections:
Molecule of the Week and Scientist of the Week. Ships in every locale in
`LOCALES` in the same milestone, like a game does.

The curated 104-week scientist pool, the 50 runner-ups and the link analysis are
in [`explore-scientists.md`](./explore-scientists.md).

Companion documents: [`AGENT_INSTRUCTIONS.md`](../AGENT_INSTRUCTIONS.md) (Part B
is the platform contract this feature obeys too), [`i18n/README.md`](../i18n/README.md),
[`i18n/GAMES.md`](../i18n/GAMES.md) (the every-locale rule and the four language
checks), [`ACCESSIBILITY.md`](../ACCESSIBILITY.md), [`STYLE_GUIDE.md`](../STYLE_GUIDE.md),
[`TESTING.md`](../TESTING.md). The implementation prompt is
[`explore-agent-prompt.md`](./explore-agent-prompt.md).

---

## 0. What the build proved wrong

Added on 2026-09-19, on branch `feature/explore-page-impl`, after implementing
the whole of this brief. Each item is a place where the plan met the code and
the code won. Nothing here is a complaint about the brief; a brief that survives
implementation untouched usually means nobody checked it.

**Arrhenius had to be dropped from the launch twenty**, and the reason is in
this document's own inclusion rule. [`explore-scientists.md`](./explore-scientists.md)
§1 says the work that earns a slot must be 20th or 21st century, and justifies
Arrhenius by his 1903 Nobel — but the electrolytic-dissociation work is his 1884
dissertation, and the greenhouse calculation is 1896. The prize is 20th century;
the work is not. Separately, he was a leading member of the Swedish Society for
Race Hygiene, which campaigned for the state race-biology institute founded in
1921 (Saura, *Hereditas*, 2020). Featuring him honestly costs about a third of a
150-word entry aimed at fourteen-year-olds; featuring him without it is not an
option on a page whose whole point is who gets remembered. **Dan Shechtman** took
the slot, paired with sodium chloride — and the pairing is better than the one it
replaced: a crystal whose pattern repeats, against one that never does.

**Four other leads in `explore-scientists.md` did not survive verification** and
are listed in the milestone report. The one that changes an entry rather than a
detail is **Sabatier**: "the reaction that turns oil into margarine" is Wilhelm
Normann's liquid-phase hydrogenation of 1901, not Sabatier's vapour-phase
method. Both men are now in the entry.

**The 92-ready count held, but the link table is a proposal and two of its
suggestions were not taken.** Sørensen is mapped to the `neutralise` game; the
pH *scale* is taught by the `acids-and-bases` sheet, and that is where his card
goes. Gilbert Lewis is mapped to `lewis-structures` + game; the card links to
the game alone, because "Share to Fill" is literally about placing shared
electron pairs.

**§6 AC-2 assumed `nav-profile-to-settings.md` had landed. It had not** — only
the document was on `master`. It is implemented on this branch, because the
1024px English overflow it describes is a live WCAG 1.4.10 failure that Explore
would have made worse.

**AC-5 says the shared dictionary "asserts a size budget".** It does not, quite:
`dictionary.test.ts` asserts that no *new game namespace* appears in
`en.games`. The constraint the brief means is real and was honoured — no entry
prose is in the dictionary — but nothing would have caught it automatically, and
a future brief should not rely on a gate that is not there.

**A genuine bug this feature exposed, in every language at once.**
`Intl.DateTimeFormat('en', …)` resolves to **en-US** and writes
"September 21, 2026". This site spells things *neutralise* and *sulfur*, follows
the Victorian curriculum, and is read by students who write the day first.
`DATE_LOCALES` in `src/i18n/config.ts` now maps each locale to the BCP 47 tag to
format with (`en` → `en-GB`, `es` → `es-ES`); `<html lang>` and the URL prefix
are untouched. **Any future feature that formats a date or a number needs this
map, not the raw locale.**

**The reflow check that everything passed was measuring the wrong thing.**
AC-2 and `nav-profile-to-settings.md` both ask for `scrollWidth <= innerWidth`,
and every locale passed it at every width, on this branch, throughout. It was
not true that the header fitted. The header row is a flex container whose
`<nav>` can shrink, so an over-full row does not scroll — **it compresses**, and
`scrollWidth` never notices. Forcing `width: max-content` on the row, which stops
anything shrinking, showed the German header needing **1033px in a 1024px
viewport**: over-full at the exact breakpoint where the horizontal nav appears.
French and Spanish had 11px and 12px of real headroom against a target of 20.

That is the same mistake as the wrong comment in `NavBar.tsx`, one level deeper.
That comment was arithmetic mistaken for a measurement; this was a measurement
of a quantity that cannot show the failure. **Any future check on this header
must force `max-content` first**; `e2e/nav.spec.ts` now does, prints the table,
and its failure message says why `scrollWidth` must not be trusted here.

**And one the English could not see.** The Italian "why it mattered" heading was
`Perché è stato importante` — a past participle that agrees with its subject, so
on the ten cards featuring a woman it read as *why **he** was important*. Now
`Perché ha contato`, which has no gender. Worth generalising: this section
deliberately never renders `represents`, but a **grammatically gendered heading
renders it anyway**, in every language that agrees participles and adjectives.
Spanish and Italian both needed a fixed doublet for "Scientist of the Week" for
the same reason; French got away with the epicene *scientifique*; German uses
the substantivised participle *Forschende*.

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

**Fun facts — dropped** (owner's decision, 2026-09-19). Worth recording why it
was a reasonable thing to drop: quick facts are the most common carrier of
chemistry misinformation on the web ("glass is a slow-moving liquid", "natural
means no chemicals"), so the section would have needed a source URL per fact and
the same accuracy review as everything else — a third content pipeline, in five
languages, for the least substantial part of the page. Two well-made sections
beat three thin ones.

If it comes back later, it comes back with the sourcing requirement attached.

**Two sections, deeply done.** The page is now one molecule and one scientist per
week, chosen as a **pair** on the same theme (see
[`explore-scientists.md`](./explore-scientists.md) §2). One page, one idea per
week, two ways into it.

### What the concept is missing

- **One clock.** If the molecule changes daily and the scientist weekly, the page
  has two datelines and the reader cannot tell what is new. Everything rotates
  together, on the same Monday, under one "Week of 21 September" dateline.
- **Reachability below `lg`.** `NavBar.tsx` renders its links as
  `hidden … lg:flex` and there is no mobile menu, so on a phone the top bar has
  no links at all — Cheat Sheets is currently reachable only by typing the URL.
  Adding Explore to that nav therefore does *not* make it reachable for phone
  users. This is why AC-2 now includes the side panel — see §8.
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
5. **It lets both sections share one dateline** (above).

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

**Decided 2026-09-19: 20 molecule-and-scientist pairs** at launch (10 weeks led
by a woman, 10 by a man, strictly alternating). That is a 20-week cycle — most of
a school year before anything repeats — growing toward 104 as pairs are added.

Worth saying plainly what that costs: 40 entries × 5 locales is **200 prose
blocks**, each held to the cheat sheets' standard. It is the largest single
writing task the site has taken on, and the risk is not that it fails but that
the last few entries are visibly thinner than the first few. Whoever reviews it
should read entries 15–20 first. The rotation is
`weekIndex % pool.length`, so appending entries is safe at any time; it does
shift which entry a given future week shows, which is fine for editorial content
and is stated in AC-4.

The 104-week scientist pool already exists — [`explore-scientists.md`](./explore-scientists.md)
— so the launch 12 are chosen from it rather than invented. **92 of the 104 have
a matching link target today**; the other 12 are theme A (atoms, isotopes and the
periodic table) and are blocked on a cheat sheet that does not exist yet.

*(An earlier draft said "76 ready, 28 blocked". That double-counted ten entries
whose link to `chemical-bonds` is loose but perfectly shippable, and it predated
dropping analytical chemistry. 92 / 12 is the real split.)*

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
those languages, as a translated American site. The curated pool in
[`explore-scientists.md`](./explore-scientists.md) covers 28 countries, with
every shipping language area represented, and names its own thin spots (Latin
America, Korea, sub-Saharan Africa) rather than hiding them.

**The pool is 52 women and 52 men**, above the owner's 40% floor and chosen that
way so strict alternation needs no special case. If the pool is ever cut down,
the floor is 42 women and the alternation rule relaxes to a windowed one — say so
explicitly rather than letting it drift. The pool is deliberately not a prize
list: 34 of the 104 have no Nobel, because the prize record is itself the bias
being corrected.

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

### AC-2 — It is reachable, on a phone as well as a laptop
- [ ] A fifth entry in the `sections` array in `NavBar.tsx`, label from
      `t.nav.explore`, `lucide-react` icon, `LocaleLink`.
- [ ] **`docs/feature-briefs/nav-profile-to-settings.md` has landed first**, or
      is landed as part of this work. It removes Profile from the nav and
      shortens the longest English and Spanish labels, which is what makes room
      for Explore. Without it there is no room: measured at 1024px, English is
      already 1048px of content in a 1024px viewport *before* a fifth item.
- [ ] The header is re-measured at 320px, 360px, 768px, 1024px and 1280px **in
      every locale**, signed in and signed out. Not just the "widest language" —
      English turned out to be the widest, contradicting the comment in
      `NavBar.tsx`. No horizontal page scroll at any width — `ACCESSIBILITY.md`
      (1.4.10) forbids it, and at 320px, not 360px. Target ≥20px spare at
      1024px. Report the table rather than shipping an overflowing header.
- [ ] **Below `lg`, the nav becomes a slide-out side panel** (see §8 for the
      reasoning). **This may already exist**: a separate session was started on
      2026-09-19 to build exactly this panel, as a fix for the pre-existing gap.
      Check for it before writing any of it. If it is there, Explore adds its
      link to it and the panel criteria below become a *review* of that work, not
      new work; if two versions exist, reconcile to one rather than shipping
      both. The horizontal row stays as it is at `lg` and above. The panel
      holds the five section links plus the language switcher and settings, so
      one control reaches everything.
- [ ] The panel meets the disclosure contract: a labelled trigger with
      `aria-expanded` and `aria-controls`, focus moved into the panel on open and
      restored to the trigger on close, focus trapped while open, Escape closes
      it, background scroll locked, and the transition respects
      `prefers-reduced-motion`. Tap targets at least 44px tall.
- [ ] The dashboard (`(main)/page.tsx`) also gets a link into Explore. This is
      belt and braces — the panel is new code and the dashboard is where a phone
      reader already is. Match the existing section styling; do not invent a new
      card pattern.
- [ ] The panel fixes a pre-existing bug as a side effect: `/cheat-sheets` was
      reachable only from the hidden nav. Say so in the milestone report.

### AC-3 — Two sections, one clock
- [ ] Molecule of the Week then Scientist of the Week, each an `<h2>` under a
      single `<h1>`.
- [ ] The two are scheduled as a **pair**: the same week's molecule and scientist
      share a theme, and usually a link target. The schedule is a list of pairs,
      not two independent lists.
- [ ] One dateline naming the current week, formatted per locale with `Intl`,
      never a hand-built date string.
- [ ] Both change on the same boundary: **Monday 00:00 UTC**. UTC is chosen
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
- [ ] English is canonical in `src/lib/explore/` (molecules, scientists, the
      paired schedule, rotation). Every other locale contributes a prose overlay in
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

### AC-6 — Every card links inward, and the link matches the content
- [ ] **Every** molecule and scientist entry carries at least one link to a cheat
      sheet or a game, rendered through `LocaleLink` with a localized call to
      action. No entry ships without one — an entry with no link is a dead end,
      and the whole point of the page is to be a way in.
- [ ] **The link is topical, not decorative.** It goes to the sheet or game that
      teaches the chemistry the card is actually about. An entry about the pH
      scale links to `acids-and-bases` or `neutralise`; it does not link to
      `/games` because that is where the games are. If no existing sheet or game
      matches the entry's chemistry, **the entry does not ship yet** — it waits
      for the sheet, or it is replaced by an entry that does match. Do not
      stretch a link to satisfy this criterion; the stretch is the failure mode
      this rule exists to prevent.
- [ ] The link target is a real one: a test asserts every referenced slug exists
      in `CHEAT_SHEETS` and every referenced game slug is in `GameName` **and is
      active**. A typo here is a 404 nothing else catches, and a link to an
      inactive game (`bond-builder`) is worse than no link.
- [ ] The paired molecule and scientist for a week share their link target
      wherever the pairing allows it, so the week points somewhere rather than
      two places.
- [ ] `explore-scientists.md` marks which of the 104 have a matching target
      today (92) and which are blocked on the atoms cheat sheet (12). The launch
      pool is drawn from the 92. If the implementation disagrees with a mapping
      in that table, say so — the table is a proposal, not a fact.

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
      dates) and at least one `{ label, url }` source — for a scientist, one that
      supports the dates and the attribution, not just a general biography.
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
- [ ] `page.test.tsx` covers: both sections render, the dateline is right
      for a fixed date, inward links are present, and a pool of size 1 still
      renders.
- [ ] `e2e/explore.spec.ts` covers: the page loads in every locale with the
      right `html lang`, the nav entry navigates there and keeps the locale, the
      language switcher preserves the path, an inward link reaches a real page,
      the side panel opens, navigates and closes by Escape at 360px, and there is
      no horizontal scroll at 360px.
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
- The **Atoms, isotopes & the periodic table** cheat sheet, which would unlock
  the 12 theme-A scientists. Worth doing on its own merits — the site has no
  atomic-structure content at all — but it is cheat-sheet work, not Explore work.
  See `explore-scientists.md` §7.
- The **pop-out interactive periodic table**. A different artefact from the sheet
  and a bigger one; `seo/KEYWORDS.md` already scopes it as its own P1 page at
  110,000 monthly searches, which is where it should be scoped from, not from
  here. `explore-scientists.md` §7 has the comparison and the three decisions to
  make first.
- Analytical chemistry scientists, dropped on 2026-09-19: a later year level, and
  the site has no content to link them to.
- Fun facts, dropped on 2026-09-19 (§1).
- Any change to `LOCALES`. Russian arrives on its own branch; when it does, this
  content is part of what that branch translates.

The mobile navigation panel is **no longer** out of scope — it moved into AC-2
(§8).

---

## 8. Decision: a side panel below `lg`, not a wider top row

You asked whether the phone navigation should be a side panel rather than a top
bar. **Yes — and it is the right moment to do it, because this feature is what
breaks the current arrangement.**

The argument, in order:

1. **The top row is out of room, and this feature is why.** The measurement in
   `NavBar.tsx` is that German content alone was 1014px at 1280px before gaps.
   That is with four links. Adding Explore makes the row worse at every width,
   and the archive pages in §7 would make it worse again. A panel takes the list
   off the row entirely, so the next thing you add costs nothing.
2. **Below `lg` there is currently no navigation at all.** This is not "the
   phone nav is cramped", it is that the phone nav does not exist — the links are
   `hidden … lg:flex` with no fallback, and `/cheat-sheets` is reachable only by
   typing the URL. Adding a fifth invisible link does not help anyone. So the
   panel is not scope creep on top of a working thing; it is the thing that makes
   the nav work on a phone at all.
3. **A vertical list is a better target than a horizontal one.** Full-width rows
   give you 44px tap targets with the label beside the icon. A horizontal row at
   360px cannot do that in German without truncating or scrolling sideways, and
   `ACCESSIBILITY.md` forbids the sideways scroll.
4. **It can hold what the row cannot.** Language switcher, settings and the five
   links in one place, which is exactly what a reader who cannot find something
   goes looking for. Today those controls compete with the wordmark for the same
   360px.

**Two qualifications.**

**Keep the horizontal row at `lg` and above.** On a laptop the links visible
without a click are worth more than the tidiness, and swapping a working desktop
nav for a hamburger is the standard way this change goes wrong. The panel is a
below-`lg` replacement, not a replacement everywhere.

**Right side rather than left.** `YOU DECIDE` — the convention is a left panel
with a top-left hamburger, but on this header the brand is on the left and every
control (language, settings, account) is already on the right. Putting the
trigger with the other controls and sliding the panel from the same side means
the panel opens where the thumb already is and where the user just tapped,
instead of jumping across the screen. If you prefer the convention, left costs
nothing to switch — it is one set of classes, and none of the roadmap locales
are right-to-left.

**The part that is easy to get wrong** is not the animation, it is the focus
handling: focus into the panel on open, trapped while it is open, restored to the
trigger on close, Escape closes, background scroll locked, and
`prefers-reduced-motion` respected. That is spelled out in AC-2 because a panel
that fails those is worse than the broken nav it replaces — it traps keyboard
and screen-reader users instead of merely hiding links from them.
