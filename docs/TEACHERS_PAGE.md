# Acceptance criteria — "For Teachers" page

A public, adults-facing page at `/[lang]/teachers`. It explains what ChemGames is to a
teacher deciding whether to use it in class, states plainly that the site is in beta,
asks for teacher collaborators, and is the one place on the site where money is
mentioned.

**Why the ask lives here:** the site's players are Year 9–10 students, ages 14–16. They
are minors and cannot legally complete a payment, so a funding prompt aimed at whoever
is holding the device is both useless and inappropriate. A page adults have to go
looking for is not. Nothing on this page may be surfaced to students through a popup,
interstitial or timed prompt.

Tiers follow `ACCESSIBILITY.md`: **MUST** blocks sign-off, **SHOULD** is expected unless
there is a written reason.

---

## 1. Route and shell

- [ ] **MUST** Live at `src/app/[lang]/(main)/teachers/page.tsx` → `/en/teachers`,
      `/de/teachers`, and so on. The slug stays English in every locale, exactly as
      `/cheat-sheets` does.
- [ ] **MUST** Sit in the `(main)` route group so it inherits the NavBar and footer from
      `src/app/[lang]/(main)/layout.tsx`.
- [ ] **MUST** Be an async server component reading its copy through
      `getDictionary(lang)`, with a `generateMetadata` returning `t.meta.teachersTitle`
      and `t.meta.teachersDescription`. `src/app/[lang]/(main)/privacy/page.tsx` is the
      reference implementation for the whole file shape.
- [ ] **MUST** Add a footer link beside Privacy in the `(main)` layout, keyed
      `t.footer.teachers`.
- [ ] **SHOULD NOT** add a NavBar entry. The comment at `NavBar.tsx:55` records that
      German labels already put the horizontal nav at 1014px of content at 1280px, and
      `fix/mobile-nav` is in flight. Footer only for now.
- [ ] Out of scope: sitemap and robots entries. Neither file exists in this repo.

## 2. Content

Each bullet is a section on the page. Every claim must match what the repository
actually does — this page is read by people deciding whether to put the site in front of
a class.

- [ ] **MUST** **What this is.** Free browser-based chemistry mini-games. No install, and
      no student account needed to play. Target band **Year 9–10, ages 14–16**, stated
      explicitly; `src/i18n/review-notes.ts:206` treats that band as load-bearing and
      corrects locales that drift off it.
- [ ] **MUST** **Languages.** Names every locale in `src/i18n/config.ts` that actually
      ships — English, German, French, Spanish, Italian, Russian — and says that all
      text, game coaching and cheat sheets are translated while chemical formulae,
      symbols and equations never are. **This bullet used to say "the five locales" and
      "must not list Russian, which is planned and not shipped".** Russian shipped, and
      for one commit the page told a teacher the opposite of the truth about it. Read
      the count off `LOCALES` rather than off this document; `page.test.tsx` now fails
      if the sentence and `LOCALES` disagree. Also worth saying here: the cheat sheets'
      outside links are English-language sites and every sheet cites the Victorian
      Curriculum whatever language it is read in (docs/i18n/README.md § Known gaps), so
      the section says so rather than implying translation reaches further than it does.
- [ ] **MUST** **Student privacy.** No analytics, no advertising, no third-party tracking
      (`src/i18n/dictionaries/en.ts:301`). Playing needs no account. One sentence on what
      a signed-in account stores, then a link to `/privacy` rather than a restatement of
      it.
- [ ] **MUST** **Accessibility.** States the WCAG 2.2 AA target honestly, including that
      it is a target and that some arena games are still pointer-only. Must not claim a
      level of conformance that the gap list in `docs/ACCESSIBILITY.md` contradicts.
- [ ] **MUST** **Beta notice.** Visible without scrolling at desktop width. Says the site
      is in beta and that games and content are still changing.
- [ ] **MUST** **Teacher collaborators.** See §3.
- [ ] **MUST** **Feedback.** Points at the existing feedback button, which is already
      mounted site-wide. Must not duplicate it with a second form.
- [ ] **MUST** **Support.** See §4.
- [ ] **SHOULD** **What's on the site.** The shipped games, each with a line on the skill
      it practises, plus the cheat sheets, each linking to its own page.

## 3. The teacher-collaborator offer

The offer is a promise to real people, so the copy has to be specific enough to honour.

- [ ] **MUST** State what collaboration involves: giving regular feedback on the games,
      and/or contributing ideas for new ones. No minimum commitment, no fixed schedule.
- [ ] **MUST** State the thank-you precisely: **free access to version 1.0 and version
      2.0 of the games.** Both versions named explicitly. Do not write "the next
      version", which is unbounded and would be read differently by every reader.
- [ ] **MUST** Make clear that everything on the site is free during beta, so the offer
      concerns future paid versions, not present access.
- [ ] **MUST** Say how a teacher gets in touch. The cheapest correct route is the
      existing `FeedbackWidget` — no new server action, no new table, and the rate
      limiting and honeypot are already in place. A dedicated "Teacher" category would
      mean extending `FeedbackType` in `src/lib/validation/feedback.ts` plus its error
      strings in five locales; do that only if the inbox needs them separable.
- [ ] **MUST NOT** collect anything beyond what the feedback flow already stores, and
      must not imply a binding contract on either side.
- [ ] **SHOULD** Set a loose expectation on reply time, so silence is not read as
      rejection.
- [ ] **SHOULD** Note that collaborator contact details need to live somewhere durable
      and queryable, or the v1.0 / v2.0 promise cannot actually be honoured later.

## 4. The support ask

- [ ] **MUST** Be one short paragraph, addressed to adults, linking out to a hosted
      payment page. The link target comes from `NEXT_PUBLIC_SUPPORT_URL`; the whole
      section is omitted when that variable is unset, so the page can ship before the
      account exists.
- [ ] **MUST** Link out in a new tab with `rel="noopener noreferrer"`. No payment form,
      widget or card field is ever embedded in this app — that keeps PCI scope, refunds
      and tax entirely outside the codebase.
- [ ] **MUST** Use the language of support, not of charitable donation. The project is
      run by an individual, not a registered charity, and nothing given is
      tax-deductible.
- [ ] **MUST NOT** appear anywhere a student would meet it unprompted.

## 5. Internationalisation

- [ ] **MUST** All copy in a per-page catalogue under `src/i18n/teachers/`, loaded by
      this page alone through `teachersCopy(locale)`. Nothing written inline in JSX.
      Only the three genuinely site-wide keys belong in the shared dictionary:
      `footer.teachers`, `meta.teachersTitle` and `meta.teachersDescription`.

      *This criterion originally said "all copy in a `teachers` namespace in
      `src/i18n/dictionaries/en.ts`", and that was wrong. `src/app/[lang]/layout.tsx`
      hands the whole dictionary to `I18nProvider`, so every byte of it is serialized
      into the RSC payload of every page — including the game pages. Following it put
      8,075 bytes of prose, a quarter of the German dictionary, on every route for the
      sake of one page that exactly one Server Component reads. `docs/i18n/README.md`
      § "The dictionary is a budget, and a game will eat it" sets out the same rule for
      the game catalogues; this page is subject to it too.*
- [ ] **MUST** Ship in all five locales. `TeachersCopy` is derived from the English
      catalogue, so `npm run typecheck` fails every other locale the moment an English
      key lands; that is the intended gate. `teachersCopy()` throws for a locale with
      no file rather than falling back to English.
- [ ] **MUST** Pass the parity checks in `src/i18n/teachers.test.ts`, which runs the
      shared gates from `src/test-utils/i18n-parity.ts` against the catalogue: no missing keys,
      no empty values, no dropped placeholders, and nothing left identical to the English
      unless it is allowlisted with a stated reason.
- [ ] **MUST** Never build a sentence by concatenation. Where a link interrupts a
      sentence, split on a `{link}` placeholder and substitute the element with
      `withPlaceholder()`, as the privacy page does, so word order stays the translator's
      to decide.
- [ ] **MUST** Use `{name}` interpolation and nothing else; `${}` and `%s` are rejected by
      test.
- [ ] **MUST** Run `npm run i18n:review` and commit the regenerated review file.
- [ ] **SHOULD** Render the year band in each locale's own school system rather than
      literally. The review notes are emphatic: Year 9–10 is 3e/2de, 3º/4º de ESO, terza
      media/primo superiore — and **not** Oberstufe, lycée, bachillerato or liceo, all of
      which name ages 16–19.

## 6. Styling and accessibility

- [ ] **MUST** Design tokens only: `bg-(--surface)`, `text-(--muted)`,
      `border-(--border)`. No hardcoded `slate-*`, which `STYLE_GUIDE.md` §9 lists as a
      known defect elsewhere in the codebase.
- [ ] **MUST** `mx-auto max-w-3xl` container; cards
      `rounded-2xl border-2 border-(--border) bg-(--surface)` with `p-6`; section gaps
      `gap-6`.
- [ ] **MUST** Be correct in both themes. Every colour checked in light and dark.
- [ ] **MUST** Text contrast ≥ 4.5:1, or ≥ 3:1 for text ≥ 24px or bold ≥ 19px. Link and
      focus-ring contrast ≥ 3:1 against what is next to them.
- [ ] **MUST** Reflow with no horizontal scrolling at 320px wide and at 200% zoom.
- [ ] **MUST** Visible focus via
      `focus-visible:outline-2 focus-visible:outline-offset-2`. Never a bare
      `outline-none`.
- [ ] **MUST** Interactive targets ≥ 24×24 CSS px, and ≥ 44×44 on touch.
- [ ] **MUST** Icons from `lucide-react` only; decorative ones `aria-hidden="true"`.
- [ ] **MUST NOT** apply `select-none`. Teachers will want to copy the URL and the
      collaborator details.
- [ ] **SHOULD** Line length ≤ 75 characters. No long ALL-CAPS runs; caps are for labels
      of three words or fewer.
- [ ] **SHOULD** One `h1`, then `h2` per section, in order, with no levels skipped.

## 7. Tests

- [ ] **MUST** `src/app/[lang]/(main)/teachers/page.test.tsx`: renders in English and in
      one other locale; every section heading present; link hrefs correct for
      `/privacy`, the games and the cheat sheets; the support section present when
      `NEXT_PUBLIC_SUPPORT_URL` is set and absent when it is not; metadata sourced from
      the dictionary.
- [ ] **MUST** `e2e/teachers.spec.ts`: reachable from the footer link; the beta notice
      visible without scrolling at desktop width; the feedback button present; no console
      errors.
- [ ] **SHOULD** Extend `e2e/i18n.spec.ts` to cover `/de/teachers`, asserting
      `<html lang="de">` and translated copy.
- [ ] **MUST** `npm run check` green. Lint `src e2e`, not the repository root.

## 8. Definition of done

- [ ] Every MUST met. Every SHOULD met, or waived with a written reason.
- [ ] Reviewed at 360px, 768px and 1280px, in both themes.
- [ ] Axe DevTools clean of critical and serious issues.
- [ ] A chemistry teacher has read the English copy and confirms the collaborator ask is
      clear and worth replying to.
