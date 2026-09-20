# To-do

Open work that is decided but not built, and decisions waiting on someone other than
a coding agent. Game work is not here — that lives in
[`BUILD_PLAN.md`](./BUILD_PLAN.md) and [`game-briefs/`](./game-briefs/).

An item earns a place here only if it is actionable. "Improve accessibility" is not an
item; "run axe on /teachers and fix what it finds" is.

---

## Build

### Teacher collaborator sign-up

**Built and merged.** Acceptance criteria in [`COLLABORATORS.md`](./COLLABORATORS.md).
What is left is not code.

- [ ] **Run `supabase/migrations/20260919_create_collaborators.sql`** against the
      Supabase project, from the SQL editor. **Until this is run the form fails.** It
      fails politely — a teacher sees "could not save, please try again later" rather
      than a broken page — but it fails, so run the migration before the form is live
      in front of anyone. Read it first; it creates a table, a `SECURITY DEFINER`
      function and RLS with no client policies.
- [ ] **Then verify the five things the test suite cannot reach**, because the e2e
      suite boots without Supabase credentials and never writes a row: that the RPC's
      argument names match what the server action sends, that RLS really denies a
      direct PostgREST insert *and* select, that the limits fire at 3/hour and 10/day,
      that a second sign-up from the same address updates one row instead of making
      two, and that `PT400` / `PT429` arrive as `error.code` rather than only inside
      the message.
- [ ] **Native-speaker review of the sign-up copy** in de, fr, es, it and ru — the form
      labels, the success and error messages, and the new privacy section. Folded into
      the review item below; listed here because it shipped later than the rest of the
      page.

### Explore

**Built and merged**, in all six languages. Brief and acceptance criteria in
[`feature-briefs/explore.md`](./feature-briefs/explore.md); the curated pool and the
editorial decisions in
[`feature-briefs/explore-scientists.md`](./feature-briefs/explore-scientists.md).

- [x] ~~**Write the Russian entry prose.**~~ **Done**, by a concurrent session on
      2026-09-20, before anyone had to schedule the 6,500 words. `src/i18n/explore/ru.ts`
      exists, `EXPLORE_UNTRANSLATED_LOCALES` and the notice that went with it are gone,
      and Explore now ships in all six languages. The deferral is described in
      `explore.md` §0c in the past tense it now belongs in.
- [x] ~~**Provide the molecule pictures.**~~ **Done**, by a concurrent session on
      2026-09-21: all twenty are generated from SMILES by `npm run explore:images`
      rather than hunted for, which sidesteps the licensing problem entirely for that
      half. `scripts/molecule-images.mts`, and do not edit the files by hand.
- [ ] **Provide the twenty scientist pictures.** Still placeholders, each printing its
      own path on the page. [`EXPLORE_IMAGES.md`](./EXPLORE_IMAGES.md) has the folder
      and the sizes. **Read its portrait warning first**: most of this pool worked in
      the 20th century, so their photographs are very likely still in copyright, and
      there is no attribution line on the card — if you use something that needs one,
      it has to be built. A portrait cannot be generated the way a structure can, so
      this half stays manual. Their apparatus or their result is a legitimate answer
      where no usable portrait exists.
- [ ] **Decide whether entries 21–104 get written.** Twenty pairs is a twenty-week
      cycle: about five months before anything repeats. The remaining 84 are roughly
      67,000 words once the translations are counted, which is why this is a decision
      and not a task. Decided 2026-09-19 to stay at twenty and watch. The pool is
      curated, fact-checked and fully linked, so the work is writing, not choosing.
- [x] ~~**The archive.**~~ **Built and merged** 2026-09-21. Permalinks for every entry
      (`/[lang]/explore/molecules/[id]` and `/scientists/[id]`), a recent list capped at
      ten, and an index at `/[lang]/explore/archive`. **246 new URLs.** The archive is
      *derived* from the rotation clock, not recorded: appending a 21st pair silently
      rewrites every date about the past, which is stated at the top of
      `src/lib/explore/archive.ts`. A permalink never claims a single week for an entry
      that has run more than once.
- [ ] **Decide whether the archive should be recorded rather than derived.** Only worth
      doing if the pool grows past twenty, because that is when the dates about the past
      start being wrong. It is a weekly row in Postgres and a migration; not needed now,
      and cheaper to decide before the pool grows than after.

### Atoms cheat sheet

**Built and merged**, in all six languages, and it unblocked the twelve theme-A
scientists — the Explore pool is now 104 ready, 0 blocked.

- [ ] **Run `supabase/migrations/20260920_add_atomic_structure_sheet.sql`** against the
      Supabase project. Nothing breaks until it is run — the page renders from
      TypeScript and the registry is only for linking and reporting — but the concept
      and cheat-sheet rows will not exist.
- [ ] **Provide the seven section diagrams**, or decide the sheet does not need them.
      [`CHEAT_SHEET_IMAGES.md`](./CHEAT_SHEET_IMAGES.md) has the slots. **The one rule
      that matters**: no electrons on circular tracks, and the scale stated, because
      this is the page where `AGENT_INSTRUCTIONS.md` Part A's ban on solar-system atoms
      actually bites. The section image support was built by mistake — the request was
      for Explore — so removing it is also a legitimate answer. It is isolated in
      commit `c5319c9`.

### Chemical Bonds

- [ ] Build it, or decide it is not happening. The placeholder card is off the hub and
      Share to Fill no longer recommends it, so nothing is broken in the meantime. The
      `bondsTitle` / `bondsDescription` strings and the `'bond-builder'` entry in
      `GameName` were deliberately kept for whenever it is built.

---

## Before the site goes in front of a class

- [ ] **Create the support account and set `NEXT_PUBLIC_SUPPORT_URL`.** Ko-fi is the
      recommendation: one-off, pay-what-you-want, 0% platform fee, AUD supported. Until
      the variable is set the support section does not render at all, which is the
      intended state — but it means the ask is currently invisible.
- [ ] **Native-speaker review of the five translated For Teachers catalogues** (de, fr,
      es, it, ru). The tables are generated for exactly this:
      [`i18n/de-review.md`](./i18n/de-review.md) and its siblings. The one line most
      worth an outside opinion is the **Spanish `usted`** — professional Spanish web
      copy often keeps `tú` for adults, and `usted` can read as distant rather than
      respectful. Italian's third-person imperatives under `Lei` are second, and the
      Russian catalogue is the newest and least read.
- [ ] **A chemistry teacher reads the English For Teachers copy** and says whether the
      collaborator ask is worth answering. `TEACHERS_PAGE.md` § 8 sign-off item; only a
      teacher can judge it.
- [ ] **Run axe DevTools on `/teachers`.** `TEACHERS_PAGE.md` § 8 sign-off item. There
      is no axe tooling in the repo, so this is a browser-extension pass by hand.

---

## Privacy and legal

Draft copy for all of this is in
[`PRIVACY_GDPR_DRAFT.md`](./PRIVACY_GDPR_DRAFT.md), written to match what the code
actually does. Everything marked `«TO CONFIRM»` there is a fact only you have.

- [ ] **Find out the Supabase project region**, and the hosting region. Without them the
      international-transfer disclosure cannot be written, and for a reader in the EEA
      that is the disclosure they are most entitled to.
- [ ] **Add the missing GDPR sections**: lawful basis per purpose, where data is held
      and under what transfer mechanism, the rights you already honour named as rights,
      a line saying there is no automated decision-making, and a short "depending on
      where you live" section for EEA/UK, California and Australia.
- [ ] **Pick one age gate for account creation and apply it everywhere.** Germany says
      16, France 15, Spain and Italy 14, the UK 13, and the target band is 14–16.
      Recommendation: take the strictest, 16. Varying it by country means detecting
      country and keeping a table of consent ages current. Little is lost, because
      playing needs no account at all.
- [ ] **Ask a lawyer two questions**: whether an Art. 27 EU/UK representative is
      required for an Australian sole operator serving EU minors (the children's-data
      angle weakens the occasional-processing exemption), and whether "a parent or
      teacher agrees" is sufficient at the age you pick or whether verifiable consent is
      required. This is the only item here that costs money.
- [ ] **Decide what happens to `supabase/dumps/`** before the repository is made public.
      They hold real aliases and user ids. The privacy page promises a deleted account's
      data goes with it, and a dump in git is a copy no deletion will ever reach. See
      the README in that folder for the three options.
- [ ] **Answer the dormancy question.** `retentionBody1` says data is kept "as long as
      your account exists". A reviewer will ask what happens to an account nobody has
      touched for three years. Either state a period and build it, or say there is none
      — both are defensible, silence is not.

---

## Languages

- [ ] **Remove the English sources from Explore in the other five languages.** The
      cheat sheets no longer link out on a non-English page — the links were all to
      English-language sites, and one a student cannot read is worse than none. The
      Explore page still does: its SOURCES list shows titles such as "Science History
      Institute — the Sun Queen and the sceptic" on `/ru/explore`, in every locale.
      Same problem, different page.

      The reason it was not done with the cheat sheets is that these are **citations**,
      not "learn more" links, so dropping them drops attribution. Decide which: remove
      them on non-English locales the way `localizeSheet` withholds resources, or keep
      them and mark the language. Do not translate the titles — the page behind the
      link is still English.

- [ ] **Research locale-appropriate curriculum references and outside links.** Recorded
      in [`i18n/README.md`](./i18n/README.md) § Locale-appropriate content. Non-English
      cheat sheets now cite no curriculum at all, which is honest but empty. Germany
      alone needs one per Land. Subject-expert work, not translation.

- [ ] **German has never had a native-speaker or chemistry-teacher review**, and the
      five later languages inherited its precedents — the two adapted naming sheets
      most of all. Every review table is in [`docs/i18n/`](./i18n/); the low-confidence
      rows are the ones to read first.

## Known defects

- [x] ~~**The NavBar overflows a 320px viewport.**~~ **Fixed by the mobile nav panel.**
      It used to overflow by 33px in English, where "Log in / Register" carried
      `whitespace-nowrap` beside the language `<select>`; the panel moved those
      controls behind a menu button. Re-measured at 320px on `/en/teachers`, `/en`
      and `/en/games`: zero overflow on all three, and the controls are still
      reachable through the menu rather than merely hidden. `e2e/teachers.spec.ts`
      now asserts reflow against `documentElement` instead of the page's own
      `<main>`, which is what its comment said to do once this was fixed.
- [ ] **Every page has two `<main>` elements.** The `(main)` layout wraps children in
      `<main className="flex-1">` and each page then renders its own. Two main landmarks
      is one more than a screen reader should be offered, and it makes a bare
      `page.locator('main')` a strict-mode violation in Playwright — which is how it was
      found. Site-wide, so it is a deliberate small change rather than a drive-by:
      either the layout's wrapper becomes a `<div>`, or the pages stop declaring their
      own.
- [ ] **`sitemap.ts` is now worth more than it was.** The archive added **246 URLs** and
      there is still no sitemap, and no `robots.ts`. Both are already anticipated by
      `UNPREFIXED_PATHS` in `src/i18n/routing.ts`. Decided 2026-09-19 to do them
      together as one piece of work; the archive is the thing that makes it pay.
- [ ] **`scrollWidth <= innerWidth` cannot detect an over-full header**, and two
      documents used to ask for exactly that check. The header row is a flex container
      whose `<nav>` can shrink, so an over-full row does not scroll — it **compresses**,
      and the assertion passes. Every locale passed it while the German header genuinely
      needed 1033px in a 1024px viewport. `e2e/nav.spec.ts` now forces
      `width: max-content` and prints the table; **copy that rather than writing a new
      check**, anywhere a row has to fit.
- [ ] **A flex item with no `min-w-0` has cost four separate bugs now** — the Spanish
      dashboard heading at 320px, every German cheat sheet, English `stoichiometry`,
      and the dashboard's SectionHeading row at 768px in every locale. The fourth is
      the instructive one: the `h2` already had `min-w-0` from fixing the first, and it
      was one level too shallow — the *parent* was the flex item. So the column was
      fixed and the row stayed broken, and every check written at 320px passed. In each case a long unbreakable word set the item's minimum size
      and pushed the whole page sideways, and in each case `break-words` alone did
      nothing. All three are fixed. Worth a lint rule or a line in
      [`ACCESSIBILITY.md`](./ACCESSIBILITY.md) rather than a fourth one-off.
- [ ] **The language-switcher e2e specs are flaky under parallel load.** Documented in
      `e2e/helpers.ts`: the handler runs and writes the cookie in ~370ms, and the URL
      follows seconds later, because `router.replace()` is a transition that does not
      commit until the destination's RSC payload arrives. They pass serially every time.
      Either give those specs a longer expect timeout, or run e2e with `--workers=2`;
      the failures are load, not logic.
- [ ] **`npm run check` stops at the lint step.** 21 known findings, inventoried in
      [`TESTING.md`](./TESTING.md) § Known lint findings and deferred deliberately. Fix
      them when you are already editing the file, not in a sweep — several are game
      loops where the fix is a refactor that needs play-testing.
