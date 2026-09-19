# To-do

Open work that is decided but not built, and decisions waiting on someone other than
a coding agent. Game work is not here — that lives in
[`BUILD_PLAN.md`](./BUILD_PLAN.md) and [`game-briefs/`](./game-briefs/).

An item earns a place here only if it is actionable. "Improve accessibility" is not an
item; "run axe on /teachers and fix what it finds" is.

---

## Build

### Teacher collaborator sign-up

**Built, and waiting on one thing only: the migration.** Acceptance criteria in
[`COLLABORATORS.md`](./COLLABORATORS.md).

Shipped on `feature/collaborators`: `public.collaborators`, the `submit_collaborator`
`SECURITY DEFINER` RPC, the server action, the validator, the form on the For Teachers
page in all six locales, and the privacy entry that § 0 made a precondition. The
dedicated table was kept rather than the lighter "teacher feedback type plus an email
column" option — the form asks seven questions, six of them optional, and hanging that
off `public.feedback` would have meant six nullable columns on a table about something
else.

- [ ] **Run `supabase/migrations/20260919_create_collaborators.sql`** against the live
      project, from the Supabase SQL editor. Nothing in the feature works until this is
      done; the server action answers "not configured" and the form says so. The file
      is idempotent, so a re-run is safe.
- [ ] **Then check the five things no test here can check**, listed in
      [`TESTING.md`](./TESTING.md) § Teacher collaborator sign-up: the RPC's argument
      names, that RLS denies a direct PostgREST insert *and* select, that the rate
      limits fire, that a second sign-up with the same address updates one row, and
      that `PT400` / `PT429` reach the action as `error.code`.
- [ ] **Try the deletion route once, end to end**, from an address with no account.
      `COLLABORATORS.md` § 7 asks for it and it is the one promise on the form that is
      served entirely by hand.
- [ ] **Set `FEEDBACK_HASH_SALT` in production** if it is not set already. Both public
      write paths now share it (`src/lib/utils/client-hash.ts`), so an unset salt is
      two rate limiters degraded rather than one.
- [ ] **Have a native speaker read the new copy** in de / fr / es / it / ru — the form
      labels and the privacy section. The register is formal in all five, matching the
      rest of the For Teachers page rather than the rest of the site.

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
- [ ] **`npm run check` stops at the lint step.** 21 known findings, inventoried in
      [`TESTING.md`](./TESTING.md) § Known lint findings and deferred deliberately. Fix
      them when you are already editing the file, not in a sweep — several are game
      loops where the fix is a refactor that needs play-testing.
