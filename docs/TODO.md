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
- [x] ~~**Provide the twenty scientist pictures.**~~ **Done** 2026-09-23. Fifteen of
      the twenty have one; five show no picture at all, which is a supported state and
      not a gap. The rule is *a free portrait → else a free picture of their work →
      else nothing, and never a placeholder*, and all three arms are tested.
      `npm run explore:scientist-images` fetches each file, **re-checks its licence
      against Wikimedia on every run**, and generates `src/lib/explore/scientist-images.ts`;
      do not edit that file or the JPEGs by hand. The attribution line this item warned
      would have to be built *was* built — ten of the fifteen are CC BY or CC BY-SA and
      the credit is the condition on which they may be shown at all.
- [ ] **Find a portrait for Marie Maynard Daly, and for the four dropped on licence.**
      Lonsdale, Blodgett, Sørensen and Natta had pictures and lost them before launch:
      two were Flickr Commons "no known copyright restrictions", which reports that
      nobody has objected rather than granting anything, and two had public-domain
      claims with nothing behind them (`{{PD-old}}` with no author and no date;
      `{{PD-Italy}}`, whose "simple photograph" term is exactly the contested
      question). Daly has never had one. Each rejection is recorded with its reason in
      `NO_PICTURE` in `scripts/scientist-images.mts` — **read it before re-adding a
      file, so the same one is not re-litigated.** A clearly licensed replacement for
      any of the five is a straight win; Lonsdale at the bench and Blodgett
      demonstrating her own apparatus are the two worth most.
- [ ] **Revisit Mária Telkes’s picture if anyone wants a stricter line.** It is kept
      on `{{PD-NYWT&S}}`, a documented rights donation by the newspaper, but the same
      file also carries the Library of Congress’s weaker "no known copyright
      restrictions" tag — the species of claim the four above were dropped for. It is
      the closest call in the set and the first thing to cut if the standard tightens.
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
- [ ] **Rebuild the page as three tabs instead of two columns.** Decided 2026-09-21;
      reasoning, rejected alternatives and acceptance notes in
      [`feature-briefs/explore.md`](./feature-briefs/explore.md) §9, build order in
      [`feature-briefs/explore-tabs-prompt.md`](./feature-briefs/explore-tabs-prompt.md).
      `/explore` becomes the molecule tab, `/explore/scientist` is new, and
      `/explore/archive` moves into an `(tabs)` route group so the permalinks do not
      inherit the strip. Supersedes AC-3's arrangement but none of its substance. The
      change that actually answers the complaint is not the tabs — it is capping the
      picture height and putting the figure beside the prose, which is worth doing
      even if the tabs are dropped.
- [ ] **Filter the archive by what an entry links to. After launch** — decided
      2026-09-23, deliberately not built before it.

      The question a student actually has is "what is here about bonding?", and
      today the only way to answer it is to read all twenty rows. Every entry
      already carries an `ExploreLink` — `{ kind: 'cheat-sheet', slug }` or
      `{ kind: 'game', game }` — so the facet exists in the data and needs no new
      field, no migration and no editorial work. `YearFilter` on the cheat sheets is
      the pattern to copy, down to keeping the filter in the URL so a filtered view
      is shareable and the back button behaves.

      **Not a search box.** Forty items is too few to type at: a text input over a
      list that fits on one page is more chrome than help, and it only answers a
      question you can ask if you already know the name — which is the opposite of
      the problem. Revisit if the pool ever passes the 21–104 decision above.
- [ ] **Look at the tab strip on real hardware before calling it done.** Each entry
      pill carries this week's entry name, so on the active tab the name appears twice
      — once muted at 13px in the pill, once at ~30px as the card heading. Judged
      acceptable in §9 and left deliberately cheap to undo: if it reads as a glitch,
      delete the subtitle and nothing else changes. Not a decision anyone should make
      from a wireframe.

### Atoms cheat sheet

**Built and merged**, in all six languages, and it unblocked the twelve theme-A
scientists — the Explore pool is now 104 ready, 0 blocked.

- [ ] **Run `supabase/migrations/20260920_add_atomic_structure_sheet.sql`** against the
      Supabase project. Nothing breaks until it is run — the page renders from
      TypeScript and the registry is only for linking and reporting — but the concept
      and cheat-sheet rows will not exist.
- [x] ~~**Provide the seven section diagrams.**~~ **Done** — they are generated by
      `npm run cheat-sheets:diagrams` from `scripts/cheat-sheet-diagrams.mts` rather
      than drawn by hand, so they cannot drift from the prose. Six are built now: slot 4
      went with the section it belonged to on 2026-09-22 (below), and slots 8, 9 and 10
      are specified but have no section to sit under, which the script prints on every
      run.
- [ ] **Improve the two atom diagrams so they carry their own caveats.** Decided
      2026-09-22, and this is the item the removals below created. The two sheets used
      to end with common-mistakes bullets that apologised for their own figures —
      *"Drawing electrons on circular tracks, like planets"* and *"Believing the
      pictures about size … including the ones on this sheet"*. Both are gone from
      *Atoms & the Periodic Table* and *Isotopes & Radioactivity*, in all six languages.

      **That makes the diagrams responsible for what the prose used to excuse**, which
      is the right way round — a figure a student has to be warned about is a figure
      worth redrawing. Two things to carry, from
      [`CHEAT_SHEET_IMAGES.md`](./CHEAT_SHEET_IMAGES.md) § One rule these diagrams must
      follow:

      - **No electrons on circular tracks.** A level is an energy, not a lane. The
        script already draws them as a soft band rather than dots on a ring; the
        Bohr-style ring in slot 5 is the deliberate exception and needs to say on the
        figure that it is a model for counting, not a picture of where electrons are.
      - **State the scale, or do not imply one.** If the nucleus were a pea the atom
        would be a sports field, and every slot shrinks that gap to fit the page. Say so
        on the figure — a printed note, or a scale break — rather than in a bullet at
        the bottom of the sheet that a reader meets long after the picture.

      `AGENT_INSTRUCTIONS.md` Part A's ban on solar-system atoms is what is behind both.
      Scope is the script, not the page: nothing here needs new section support.

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
- [x] ~~**Every page has two `<main>` elements.**~~ **Fixed** 2026-09-22. The `(main)`
      layout's wrapper is a `<div className="flex-1">` now; all fourteen pages under the
      group already declared their own `<main>`, so each keeps exactly one landmark and
      the wrapper keeps doing the one job it had — pushing the footer down on a short
      page. The other option, stripping the pages' own `<main>`, would have meant moving
      fourteen sets of layout classes onto one shared element.
- [ ] **`sitemap.ts` is now worth more than it was.** The archive added **246 URLs** and
      there is still no sitemap, and no `robots.ts`. Both are already anticipated by
      `UNPREFIXED_PATHS` in `src/i18n/routing.ts`. Decided 2026-09-19 to do them
      together as one piece of work; the archive is the thing that makes it pay.
- [x] ~~**`scrollWidth <= innerWidth` cannot detect an over-full header.**~~ **Fixed**
      2026-09-22, in the sense that no spec asks for that check alone any more. The
      header row is a flex container whose `<nav>` can shrink, so an over-full row does
      not scroll — it **compresses**, and the assertion passes. Every locale passed it
      while the German header genuinely needed 1033px in a 1024px viewport.
      `scrollsSideways()`, `overhangingElements()` and `expectNoOverflow()` now live in
      `e2e/helpers.ts` with the explanation, instead of being copied into three specs;
      `lewis-structures-journey` and `reaction-balancer-journey`, which still had the
      bare comparison, use `expectNoOverflow()`. `e2e/nav.spec.ts` keeps its
      `width: max-content` table, which is the right tool only where nothing may shrink
      or wrap — `e2e/explore-archive.spec.ts` says at length why it is wrong on a page
      of truncating links.
- [x] ~~**A flex item with no `min-w-0` has cost four separate bugs now.**~~ **Written
      down** 2026-09-22, which was the open half — all four instances were already
      fixed, despite what the line here used to say. The four: the Spanish dashboard
      heading at 320px, every German cheat sheet, English `stoichiometry`, and the
      dashboard's SectionHeading row at 768px in every locale. The fourth is the
      instructive one: the `h2` already had `min-w-0` from fixing the first, and it was
      one level too shallow — the *parent* was the flex item. So the column was fixed
      and the row stayed broken, and every check written at 320px passed. In each case a
      long unbreakable word set the item's minimum size and pushed the whole page
      sideways, and in each case `break-words` alone did nothing.
      [`ACCESSIBILITY.md`](./ACCESSIBILITY.md) § 3 now has the rule, where to apply it,
      and why a 320px check is not where this fails. A lint rule was the other option
      and is not worth it: matching Tailwind classes to flex ancestors in ESLint is
      guesswork that would cry wolf.
- [x] ~~**The language-switcher e2e specs are flaky under parallel load.**~~ **Fixed**
      2026-09-22 with the timeout, not the worker cap. The handler writes the cookie in
      ~370ms and the URL follows seconds later, because `router.replace()` is a
      transition that does not commit until the destination's RSC payload arrives — so
      the failure is a budget problem, not logic. `expectLocaleUrl()` in
      `e2e/helpers.ts` gives those seven assertions 30s against the config's default
      10s. Capping workers was the alternative and was rejected: CI already runs
      `workers: 2`, so it would only have slowed local runs.
- [ ] **`npm run check` still stops at the lint step, on 10 findings** — down from 22
      on 2026-09-22, when everything mechanical was cleared: the `any`s, `prefer-const`,
      the dead imports and unused prop, `LabVesselCard`'s in-render component, and the
      `OPTION_*` tuning presets, which are now exported rather than sitting unused.
      There are no warnings left. What remains is 8 `react-hooks/set-state-in-effect`,
      1 `purity` and 1 `immutability`, all of them game loops or hydration effects where
      the fix is a refactor that needs play-testing — so the standing advice holds: fix
      them when you are already in the file, not in a sweep. Inventory in
      [`TESTING.md`](./TESTING.md) § Known lint findings.
