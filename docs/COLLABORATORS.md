# Acceptance criteria — teacher collaborator sign-up

The For Teachers page asks teachers to help shape the site and promises them free
access to version 1.0 and version 2.0 in return. Right now the only way to answer is
the feedback button, which lands in an inbox. An inbox is not a list, and a promise
made to people you cannot enumerate is a promise you cannot keep.

This adds the list: a `collaborators` table, a sign-up form on the For Teachers page,
and a write path as hardened as the feedback one.

Tiers follow `ACCESSIBILITY.md`: **MUST** blocks sign-off, **SHOULD** is expected
unless there is a written reason.

---

## 0. Read this first: it changes what the site holds about people

Every other thing this site stores about a person is pseudonymous by construction.
Aliases are generated and contain no real name; the privacy page says so, and the
children's-data posture rests on it.

**An email address is not pseudonymous, and a school name next to it is less so
still.** This table would be the first directly identifying personal data the site
holds outside Supabase Auth. That is fine — the people filling it in are adults
volunteering deliberately — but it is not free:

- [ ] **MUST** The privacy page gains an entry for it before this ships: what is
      collected, why, the lawful basis (**consent**, freely given and withdrawable),
      how long it is kept, and how to get it deleted.
- [ ] **MUST** There is a deletion route that does not require an account, because a
      collaborator need not have one. An email address to write to is enough, but it
      has to be stated on the form itself, not only in the policy.
- [ ] **MUST** The form says plainly what the address will be used for and what it
      will not be used for. "To contact you about the games and to give you v1.0 and
      v2.0 access. Nothing else, and never passed to anyone."
- [ ] **SHOULD** Nothing on the form is required except the email address. Every other
      field helps you and costs them, so let them skip it.

`docs/PRIVACY_GDPR_DRAFT.md` (the draft additions for lawful basis, transfers and
named rights) should be updated in the same change rather than after it.

## 1. Schema

- [ ] **MUST** New dated migration in `supabase/migrations/`, idempotent throughout so
      it can be re-run from the Supabase SQL editor — the house style, see
      `20260914_feedback_rate_limit.sql`.
- [ ] **MUST** `public.collaborators`:

      | Column | Type | Notes |
      |---|---|---|
      | `id` | uuid pk | `gen_random_uuid()` |
      | `created_at` | timestamptz | `now()`, not null |
      | `email` | text | **not null**, the only required field |
      | `name` | text | optional |
      | `school` | text | optional |
      | `country` | text | optional |
      | `year_levels` | text | optional, free text — school systems differ per locale and an enum would be wrong in four of them |
      | `subjects` | text | optional |
      | `message` | text | optional: what they want to help with |
      | `locale` | text | which language they signed up in, so you write to them in it |
      | `status` | text | `new` \| `contacted` \| `active` \| `declined`, default `new` |
      | `user_id` | uuid | `references auth.users on delete set null`, set server-side from `auth.uid()`, never from the client |
      | `client_hash` | text | salted SHA-256 of the IP, for rate limiting. **Never the raw IP** |

- [ ] **MUST** Length caps on every text column, as `profiles` does, so a single
      submission cannot be a megabyte.
- [ ] **MUST** Indexes on `(client_hash, created_at desc)` and `(email)`.
- [ ] **SHOULD** A unique index on `lower(email)`, so a teacher who signs up twice
      updates their row rather than creating a duplicate you will email twice.

## 2. The write path

Copy the feedback hardening exactly. It exists because the open `with check (true)`
policy it replaced let anyone with the anon key insert anything.

- [ ] **MUST** RLS enabled with **no client policies at all**. Direct insert and select
      through PostgREST must both be denied.
- [ ] **MUST** A `public.submit_collaborator(...)` `SECURITY DEFINER` function is the
      only write path. It re-validates every input, sets `user_id` from `auth.uid()`
      itself, and counts before inserting.
- [ ] **MUST** Rate limits in the function, in the shape feedback uses: a small number
      per hour per client hash or signed-in user, and a daily ceiling per client hash.
- [ ] **MUST** Raise `PT400` for invalid input and `PT429` for rate limiting, so
      PostgREST maps them to the right HTTP status and the server action can tell them
      apart.
- [ ] **MUST** A honeypot field, kept in the DOM and off-screen, skipped by the tab
      order and `aria-hidden` — the `FeedbackWidget` pattern, which works.
- [ ] **MUST NOT** email the address any kind of confirmation without saying on the
      form that it will. A surprise email from a site a teacher just met is the wrong
      first impression.
- [ ] **SHOULD** Notify the maintainer through Resend, as feedback does, so a sign-up
      is not something you have to remember to go and look for.

## 3. Validation

- [ ] **MUST** `src/lib/validation/collaborator.ts`, unit-tested, mirroring
      `src/lib/validation/feedback.ts`: length caps as exported constants, a real
      email-shape check, trimming, and blank optional fields mapped to null.
- [ ] **MUST** Validated in both places. The server action rejects before touching the
      database; the SQL function re-validates because it is `SECURITY DEFINER` and
      cannot trust its caller.
- [ ] **MUST** Error messages say what was wrong and what to do, per
      `ACCESSIBILITY.md` § Understandable. Not "Invalid input".

## 4. The form

- [ ] **MUST** A client component, mounted by the For Teachers page in the
      collaborators section.
- [ ] **MUST** **Its copy is passed in as props from the Server Component**, which
      reads it from `teachersCopy(locale)`. The catalogue in `src/i18n/teachers/` is
      server-only and importing it from a client component would put the whole page's
      prose into the client bundle — undoing
      `docs/i18n/README.md` § "The dictionary is a budget". This is the one rule most
      likely to be broken by accident, so a test should assert the catalogue is not
      reachable from a `'use client'` module.
- [ ] **MUST** Work without an account, and pre-fill nothing from one.
- [ ] **MUST** Labelled inputs (`<label for>`, not placeholder-as-label), a visible
      focus ring, targets ≥ 24×24 CSS px and ≥ 44×44 on touch, and errors associated
      with their field via `aria-describedby`.
- [ ] **MUST** Announce success and failure to a screen reader, not only visually —
      `role="status"` for success, `role="alert"` for failure.
- [ ] **MUST** Keep working with the section's existing styling: tokens only,
      `rounded-xl` inner rows, both themes checked.
- [ ] **SHOULD** Disable the submit button while in flight and say so, as the feedback
      widget does.

## 5. Internationalisation

- [ ] **MUST** Every new string in `src/i18n/teachers/<locale>.ts`, all five locales,
      passing the parity gates in `src/i18n/teachers.test.ts`.
- [ ] **MUST** Server-action error strings go wherever the feedback ones live
      (`errors.feedback*` in the shared dictionary), because a server action has no
      access to the page catalogue.
- [ ] **MUST** Formal address in the four translated locales, matching the rest of the
      page — `Sie` / `vous` / `usted` / `Lei`. The reasoning is at the top of each
      catalogue file.
- [ ] **MUST** `npm run i18n:review`, regenerated file committed.
- [ ] **SHOULD** Label the year-levels field in each locale's own school system, as the
      rest of the page does. Never *Oberstufe* / *lycée* / *bachillerato* / *liceo*.

## 6. Tests

- [ ] **MUST** `src/lib/validation/collaborator.test.ts`: caps, email shapes, trimming,
      blank-to-null.
- [ ] **MUST** A form component test: renders, validates, submits, shows the success
      and error states, honeypot present and hidden from assistive technology.
- [ ] **MUST** The page test covers the section rendering in two locales.
- [ ] **MUST** An e2e that fills and submits the form against the running app.
- [ ] **MUST** A test that the server-only catalogue is not imported from any
      `'use client'` module (see §4).
- [ ] **MUST** `npm run typecheck`, `npm test`, `npx eslint src e2e` (not the repo
      root), `npm run e2e` all green. Lint is at a known 21-problem baseline
      documented in `docs/TESTING.md`; add nothing to it.

## 7. Definition of done

- [ ] Every MUST met; every SHOULD met or waived in writing.
- [ ] The migration has been run against the live project and a real submission lands.
- [ ] The privacy page describes the table, and the deletion route has been tried once.
- [ ] You can answer, in one SQL query, "who do I owe v1.0 access to?" — which is the
      only reason any of this exists.
