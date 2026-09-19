# Instructions: move Profile out of the nav, into Settings

Make room in the header row for the Explore link by removing **Profile** from the
navigation and putting an **Account** section in the global settings popover.

**Status:** approved (owner decisions, 2026-09-19). **Branch:** make one, e.g.
`fix/nav-account-section`. **Prerequisite:** none — this can land before or after
the Explore page, but the Explore branch's AC-2 assumes it has landed.

---

## 1. Why Profile, and the measurement that changes the plan

Profile is the right one to lose. Three of the four nav links (`/#profile`,
`/#leaderboards`, `/#games`) are anchors into the dashboard's own sections rather
than routes — the nav is partly a table of contents for one page. Of those,
Profile is the only one that is *account management* rather than content: a
signed-out visitor, which is most of the traffic, gets an empty-state card.
Account management conventionally lives under the account or settings control,
and this site already has one in the same header row.

**But removing it is not enough on its own, and the reason matters.** Measured
in a real browser at 1024px (the `lg` breakpoint), header content = brand + nav +
controls + 32px gaps + 32px padding:

| Locale | nav items | controls | total | spare |
|---|---|---|---|---|
| **en** | 494 — Profile 99, Leaderboards 150, Games 92, Cheat Sheets 141 | 325 | **1048** | **−24** |
| es | 471 — Perfil 89, Clasificaciones 160, Juegos 96, Chuletas 113 | 306 | 1006 | 18 |
| de | 463 — Profil 92, Bestenlisten 141, Spiele 88, Spickzettel 130 | 278 | 970 | 54 |
| fr | 448 — Profil 92, Classements 139, Jeux 78, Antisèches 127 | 284 | 961 | 63 |
| it | 424 — Profilo 102, Classifiche 128, Giochi 93, Bigini 89 | 252 | 905 | 119 |

Two things follow.

**English already scrolls sideways at 1024px** — 1048px of content in a 1024px
viewport. (Measured before the nav's horizontal padding was reduced. Note the
measurement method below is **not** the one this paragraph originally used — see
the warning in §3, which was learned the hard way.)
That is a live WCAG 1.4.10 failure (`docs/ACCESSIBILITY.md` § Reflow) in the
default language, today, before this change. The comment in `NavBar.tsx` says
"English fits at md; German does not", which is true of the nav labels in
isolation and false of the header as a whole: English's nav *and* its
"Log in / Register" button are both the widest of the five. **Fix that comment
while you are in the file** — a wrong measurement in a comment is worse than no
comment, because the next person trusts it.

**Swapping Profile for Explore is break-even.** Removing Profile frees 89–102px;
an "Explore" label costs roughly the same. So English stays at −24 and Spanish
lands at about +4, which is not a margin. Shortening the longest labels is the
approved fix (§3).

---

## 2. Remove Profile from the navigation

In `src/components/layout/NavBar.tsx`, drop the `/#profile` entry from the
`sections` array. One array feeds both the horizontal row and `NavPanel`, so it
disappears from the phone panel too — which is correct and intended.

Do **not** touch:

- the `#profile` section on the dashboard (`(main)/page.tsx`) — it stays, with
  its heading and its onward link to `/profile`;
- the `/profile` and `/profile/edit` routes, which stay exactly as they are;
- `PROFILE_EDIT_PATH` in `(main)/privacy/page.tsx`, which links to the edit page
  and must keep working;
- `t.nav.profile` in the dictionaries — the Account section reuses it (§4), so
  the key stays and the parity gate stays green.

---

## 3. Shorten the labels that do not fit

**Shorten the nav label only.** The page's `<title>`, its `<h1>`, its URL and its
dictionary `meta` entries do not change. `seo/KEYWORDS.md` targets "cheat sheet"
terms on the cheat-sheet pages themselves; a shorter chip in the header does not
affect that, and this instruction is not licence to rename the pages.

Required, because these two locales have no usable margin:

| Locale | Key | From | To | Frees (est.) |
|---|---|---|---|---|
| en | `nav.leaderboards` | Leaderboards (150px) | **Scores** | ~59px |
| en | `nav.cheatSheets` | Cheat Sheets (141px) | **Guides** | ~50px |
| es | `nav.leaderboards` | Clasificaciones (160px) | **Ranking** | ~63px |

Those are proposals, not decisions — if a better short word exists in that
language, use it and say why. The constraints are: it must still name the thing
(a reader looking for the leaderboard must recognise it), and it must not
collide with the identical-to-English gate. Note `Ranking` is an accepted
Spanish loanword but **is identical in English if English also used it** — since
English is using "Scores", there is no collision. Check `de`, `fr` and `it`
against the same rule if you shorten them too.

Every change here needs:

- the new string in `src/i18n/dictionaries/<locale>.ts`, with a comment saying it
  is shortened for header width and giving the measurement, in the style of the
  existing `login` comments in `de.ts`/`fr.ts`/`es.ts`/`it.ts`;
- a `review-notes.ts` entry explaining the abbreviation, then
  `npm run i18n:review`;
- any test or spec that asserts the old label updated — grep for the literal
  strings in `e2e/` and `src/**/*.test.tsx` before you start.

**Then measure, do not assume — and measure the right quantity.** Every estimate
above is arithmetic on character counts.

> ⚠ **`scrollWidth <= innerWidth` cannot detect this failure, and an earlier
> version of this document asked for exactly that.** The header row is a flex
> container whose `<nav>` is allowed to shrink. An over-full row therefore does
> not overflow the page — it **compresses**, squeezing the nav while
> `scrollWidth` stays exactly equal to the viewport and every assertion passes.
> Found on `feature/explore-page-impl`: every locale passed the `scrollWidth`
> check at every width while the German header genuinely needed **1033px in a
> 1024px viewport**.
>
> **Measure natural width instead.** Set `width: max-content` on the header row,
> which stops anything shrinking, read its `getBoundingClientRect().width`, and
> compare that to the viewport. `e2e/nav.spec.ts` does this and prints the table;
> copy it rather than writing a new check.

Load the real header at **320, 360, 768, 1024 and 1280px in all five locales**,
signed out *and* signed in (the sign-out label differs). Report the table. The
target is at least **20px of natural-width headroom** at 1024px in every locale,
not zero, and not merely "no scrollbar".

---

## 4. The Account section in Settings

`src/components/games/shared/GameSettingsModal.tsx` is the settings UI, rendered
two ways: `variant="popover"` from `GlobalSettingsButton` in the header, and
`variant="modal"` from inside a game with a `gameId`.

**Add the Account section to the popover variant only.** Games have no NavBar, so
their modal is the only chrome they have — but a profile link there navigates
away mid-game and silently discards the run. Gate it on `!isModal`, the way the
existing per-game sections gate on `gameId`.

It is a section of **links**, not the edit form:

- The modal is a client component with no server data. Inlining `EditProfileForm`
  would mean the layout fetching the user's profile on every page, including
  every game page, in case someone opens Settings.
- `/profile/edit` also carries `AccountDangerZone` — irreversible account
  deletion. That does not belong in a popover that closes when you click outside
  it.

Inlining the form later is a separate piece of work; record it rather than
half-doing it now.

### Shape

Follow the existing sections in that file exactly: an `<h3>` with a `lucide-react`
icon and the same `text-xs font-bold uppercase tracking-widest text-[var(--muted)]`
treatment, then the rows.

```
Account                                   ← t.settings.account, <User /> icon
  View profile   → /profile               ← t.nav.profile (reused)
  Edit profile   → /profile/edit          ← t.profile.edit (reused)
```

- Links go through `LocaleLink`, never a bare `<a>`.
- Both links **close the popover** on click, the way `NavPanel`'s links do.
  Navigating with the popover still open leaves it over the destination.
- Rows are at least 44px tall (`min-h-11`), per `docs/ACCESSIBILITY.md`.

### Signed out

The modal does not currently know whether anyone is signed in. `NavBar` does —
it already takes `isAuthenticated` — so thread it through `GlobalSettingsButton`
to the modal as an optional prop.

When signed out, **show one link to `/auth`** using the existing `t.nav.login`,
rather than hiding the section. A signed-out reader who opens Settings looking
for their account should find the way in, not an absence. When the prop is
absent (the in-game modal never passes it), render nothing.

### Strings

Only one new key is needed — everything else is reused:

| Key | en | Notes |
|---|---|---|
| `settings.account` | Account | Section heading. Check each locale against the identical-to-English gate: French and Italian may need an allowlist entry or a different word. |

`t.nav.profile`, `t.profile.edit` and `t.nav.login` already exist in all five
locales. Add a `settings.account` review note per locale and re-run
`npm run i18n:review`.

---

## 5. Tests

- **Unit**, next to the component: the Account section appears in the popover
  variant and **not** in the modal variant; it shows both links when
  authenticated and the sign-in link when not; clicking a link closes the
  popover. There is no `GameSettingsModal.test.tsx` today — follow
  `NavPanel.test.tsx` for the conventions (`renderWithProviders`, assert against
  `en`, mock `next/navigation`).
- **e2e**, extending `e2e/nav.spec.ts` rather than adding a file: Profile is gone
  from the header row and from the phone panel; Settings reaches `/profile/edit`;
  and the reflow loop gains the other three locales, since this change is about
  width in all of them.
- `NavPanel.test.tsx` and `e2e/nav.spec.ts` both assert the four current
  destinations. Update them — do not delete the assertions.

## 6. Definition of done

- [ ] `npm run lint -- src e2e` — no new problems against the master baseline
      (21 at the time of writing: 15 errors, 6 warnings, all pre-existing).
- [ ] `npm run typecheck`, `npm test`, `npm run build` all pass.
- [ ] `npm run e2e` passes. With a dev server already on :3000, run it as
      `PLAYWRIGHT_BASE_URL=http://localhost:3000 npx playwright test` — Next 16
      refuses to start a second dev server in the same directory.
- [ ] The measurement table from §3 reported: five locales × five widths ×
      signed-in and signed-out, with no horizontal scroll anywhere and ≥20px
      spare at 1024px.
- [ ] The wrong measurement in `NavBar.tsx`'s comment corrected.
- [ ] `npm run i18n:review` re-run and the four `<locale>-review.md` files
      committed.
- [ ] Checked in a real browser in at least English and German, signed in and
      signed out.
