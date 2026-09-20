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

**Built and merged**, in five languages. Brief and acceptance criteria in
[`feature-briefs/explore.md`](./feature-briefs/explore.md); the curated pool and the
editorial decisions in
[`feature-briefs/explore-scientists.md`](./feature-briefs/explore-scientists.md).

- [ ] **Write the Russian entry prose.** About 6,500 words: 99 keys across the twenty
      pairs. Russian was added to `LOCALES` mid-build and the every-locale rule would
      have held finished prose behind a translation nobody had scheduled, so it is
      deferred deliberately rather than forgotten — `explore.md` §0c, and
      `EXPLORE_UNTRANSLATED_LOCALES` in `src/i18n/explore.ts`. A Russian reader
      currently gets Russian chrome around English entries, under a line in Russian
      saying so. **Finishing it is: write `src/i18n/explore/ru.ts`, delete `'ru'` from
      that constant, and let the tests say what is missing** — `explore.test.ts`
      asserts the list in both directions, so a finished translation cannot be left
      switched off.
- [ ] **Provide the pictures.** Forty slots, twenty of them molecules and twenty
      scientists, all currently placeholders that print their own path on the page.
      [`EXPLORE_IMAGES.md`](./EXPLORE_IMAGES.md) has the folders and the sizes. **Read
      its portrait warning first**: most of this pool worked in the 20th century, so
      their photographs are very likely still in copyright, and there is no attribution
      line on the card yet — if you use something that needs one, it has to be built,
      not tucked into alt text.
- [ ] **Decide whether entries 21–104 get written.** Twenty pairs is a twenty-week
      cycle: about five months before anything repeats. The remaining 84 are roughly
      67,000 words once the translations are counted, which is why this is a decision
      and not a task. Decided 2026-09-19 to stay at twenty and watch. The pool is
      curated, fact-checked and fully linked, so the work is writing, not choosing.
- [ ] **The archive.** Prompt written and agent started 2026-09-20 —
      [`feature-briefs/explore-archive-prompt.md`](./feature-briefs/explore-archive-prompt.md).
      Permalinks per entry, a recent list capped at ten, and an index. Until it lands,
      each pair is visible for seven days and then gone for five months, and forty
      entries share one URL.

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

## Known defects

- [x] ~~**The NavBar overflows a 320px viewport.**~~ **Fixed by the mobile nav panel.**
      It used to overflow by 33px in English, where "Log in / Register" carried
      `whitespace-nowrap` beside the language `<select>`; the panel moved those
      controls behind a menu button. Re-measured at 320px on `/en/teachers`, `/en`
      and `/en/games`: zero overflow on all three, and the controls are still
      reachable through the menu rather than merely hidden. `e2e/teachers.spec.ts`
      now asserts reflow against `documentElement` instead of the page's own
      `<main>`, which is what its comment said to do once this was fixed.
- [ ] **`scrollWidth <= innerWidth` cannot detect an over-full header**, and two
      documents used to ask for exactly that check. The header row is a flex container
      whose `<nav>` can shrink, so an over-full row does not scroll — it **compresses**,
      and the assertion passes. Every locale passed it while the German header genuinely
      needed 1033px in a 1024px viewport. `e2e/nav.spec.ts` now forces
      `width: max-content` and prints the table; **copy that rather than writing a new
      check**, anywhere a row has to fit.
- [ ] **A flex item with no `min-w-0` has cost three separate bugs now** — the Spanish
      dashboard heading at 320px, every German cheat sheet, and English
      `stoichiometry`. In each case a long unbreakable word set the item's minimum size
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
