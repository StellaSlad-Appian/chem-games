# Agent prompt: the interactive periodic table

Copy everything below the line into a fresh agent session. It assumes nothing
from any prior conversation.

Context for whoever is handing it over: this is **milestones M1–M3** of
[`atomic-structure-redesign.md`](./atomic-structure-redesign.md). M4 (the
curriculum split) has already shipped and is on master — two sheets now exist.
This is the piece that was designed first and built second.

---

You are building an interactive periodic table for **chem-games**, a Next.js 16
+ React 19 + Tailwind 4 + Supabase site of chemistry mini-games and reference
sheets for secondary-school students, aligned to the Victorian Curriculum and
VCE. Create a branch named `feature/periodic-table-widget`.

## Before you write anything

1. **Read `AGENTS.md` at the repo root and obey it.** This is not the Next.js in
   your training data. Read the relevant guide in `node_modules/next/dist/docs/`
   before touching any framework API.
2. **Read `docs/feature-briefs/atomic-structure-redesign.md`.** It is the design
   for this task and you should not re-derive it:
   - **§5** why interactive rather than a picture;
   - **§6** the eight architectural decisions D1–D8, each with the alternative
     it rejects — these are the spec, not suggestions;
   - **§7** the data model and the file layout;
   - **§4.7** the view modes *after* they were checked against the curriculum —
     this supersedes the six in §6 D6;
   - **§10** the accessibility contract;
   - **§13** the tests;
   - **§14** blocks A and B are your acceptance criteria.
   Where you think a decision is wrong, say so in your report and follow it
   anyway, or stop and ask. Do not silently substitute a different design.
3. **Read `docs/ACCESSIBILITY.md`.** This widget is 118 interactive controls in
   a grid; more of that document applies here than to anything else on the site.
4. **Read the code you are extending:**
   - `src/core-engine/data/elements.ts` — all 118 elements already exist.
   - `src/core-engine/types/chemistry.ts` — `ElementData`, `ElementCategory`.
   - `src/core-engine/types/general.ts` — `CheatSheetTopic`, `CheatSheetSection`.
   - `src/lib/cheat-sheet-data.ts` — the two sheets you are adding the widget to.
   - `src/app/[lang]/(main)/cheat-sheets/[slug]/page.tsx` — a Server Component.
   - `src/components/ui/ChemIcon.tsx` — `ICON_REGISTRY` is the precedent for the
     widget registry you are adding.
   - `src/i18n/chemistry-names.ts` — `elementName(locale, symbol)`.
   - `src/hooks/useInputMethod.ts` — touch vs pointer, for target sizing.

## The one trap that will make this teach something false

**Do not use `valenceElectrons` from `ELEMENTS_REGISTRY` for anything the user
sees as an electron count.** It is the common combining number the games need,
not a count of outer-shell electrons. The registry has chromium at 3, copper
at 2, gold at 1 and copernicium at **12**. Rendering that as "electrons in the
outer shell" would teach a falsehood on the sheet whose stated purpose is not
teaching false models.

Author `shells` fresh in the new data module and test it against a hand-checked
literal for the first twenty elements. Leave `valenceElectrons` alone — it is
correct for what the games use it for.

## M1 — the data module

`src/core-engine/data/periodic-table.ts`, keyed by atomic number, joined to
`ELEMENTS_REGISTRY` rather than replacing it. The shape is in §7; do not widen
`ElementData`, which five games depend on.

`outerElectrons` is `null` across the d- and f-blocks rather than guessed. The
view mode greys those cells and the legend says why. That is the honest Year 9
answer and it stops the sheet asserting that iron has 2 outer electrons.

Two curriculum-driven fields that §7 lists and are easy to skip:

- `atomicRadius` already exists on all 118 entries in `ELEMENTS_REGISTRY` — use
  it, do not duplicate it. **VC2S10U07 names "atomic size" in the content
  description itself**, so this mode is mandated, not decorative.
- `reactivity` is only meaningful for groups 1, 2, 17 and 18 at this level.
  Model it as `null` elsewhere, the same way `outerElectrons` does, rather than
  inventing a scale.

Also in M1, four spelling corrections (§7): `Aluminum` → `Aluminium` and
`Cesium` → `Caesium` in `elements.ts`, `Cesium Hydroxide` in `compounds.ts`,
`Cesium Ion` in `ions.ts`. `docs/ACCESSIBILITY.md` §5 sets British/IUPAC
spelling for English and the sheets already write "Aluminium". The overlays key
on symbol and id, so no locale is affected.

`src/core-engine/tests/periodic-table.test.ts` is the gate. Every assertion in
§13 under "Unit — periodic-table.test.ts" must be there. It is what makes the
data trustworthy, and it is where the content of the deleted twenty-element
table goes.

## M2 — the widget, with one view mode

The whole architectural risk is here. One mode (Metals) proves the pattern.

- **D1: a real `<table>`.** One `<tr>` per period, 18 `<td>`, empty `<td>` at
  the table's gaps, `<th scope="col">` group numbers, `<th scope="row">` period
  numbers, a `<caption>`. Do **not** put `display: grid` on it — that drops
  table semantics from the accessibility tree in Chromium and WebKit, and
  `table-layout: fixed` over 18 equal columns gives the same layout with no
  override. The gaps are pedagogically meaningful; an empty `<td>` is an honest
  gap.
- **D2: the server builds the localised rows; a thin `'use client'` island owns
  `selected` and `viewMode`.** Element names come from
  `elementName(locale, symbol)` on the server. Without JavaScript the full table
  still renders with symbol, atomic number and mass, and the detail panel shows
  a default element — say so in your report; it is a stated degradation, not a
  bug to hide.
- **D3:** it lives in `src/components/periodic-table/`, not under
  `cheat-sheets/`. A standalone route is a later milestone, not this one.
- **D4: a section opts in by name.** Add `widget?: CheatSheetWidgetName` to
  `CheatSheetSection` and a `WIDGET_REGISTRY` in the page's component layer,
  exactly as `ChemIcon`'s `ICON_REGISTRY` maps `iconName`. A widget *name* is
  structural metadata like `iconName` or an image `src`, so it never enters the
  translation overlay and `cheat-sheets.test.ts` is untouched by it. Do **not**
  branch on the slug in the route.
- **D7: roving `tabIndex`.** Exactly one cell has `tabIndex={0}`; arrows move,
  Home/End along a period, PageUp/PageDown along a group, Enter or Space
  selects. 118 tab stops is a keyboard trap in all but name.
- **D8:** the grid gets its own `overflow-x-auto` region. 18 columns at the
  24×24 CSS px minimum target size is 432px, wider than 320px, so it cannot
  fit; WCAG 1.4.10 exempts content needing a two-dimensional layout, and that
  exemption covers the grid, not the page. **The page must not scroll
  horizontally at 320px.**

## M3 — the remaining view modes

§4.7 is the list, and it supersedes §6 D6 because it was checked against the
curriculum afterwards. Six modes on the Year 9 sheet: metals, families, outer
shell, **atomic size**, **reactivity**, ion formed. *State at 25 °C* was cut —
do not reinstate it.

The mode is a pure function `(entry, mode) => { tone, badge, legendKey }` in
`view-modes.ts`, unit tested without rendering anything.

**Colour is never the only carrier.** Every mode prints a short text badge in
every cell and renders a legend. `view-modes.test.ts` asserts a non-empty badge
for all 118 entries in every mode — that is the accessibility rule enforced as
a test, so do not weaken it.

## Where the widget goes, now that the sheet has been split

M4 shipped and there are two sheets:

- **`atomic-structure`** (Year 9, *Atoms & the Periodic Table*, VC2S10U07) —
  the widget with all six modes, in the section about the shape of the table.
- **`isotopes-and-radioactivity`** (Year 10, VC2S10U06) — the same component,
  gated via a `modes` prop to *natural or made* plus *metals*, with a link back
  to the Year 9 sheet.

**Delete the "first twenty elements" table in this milestone.** The split
milestone deliberately left it in place so it would not be stranded; the widget
replaces it. It must go from `src/lib/cheat-sheet-data.ts` **and** from the
matching table in all five files under `src/i18n/cheat-sheets/`, in the same
commit — `cheat-sheets.test.ts` compares tables row for row and will fail
otherwise. Everything in it (symbol, atomic number, electron arrangement) is in
the widget for all 118 elements, and the first-twenty arrangements live on in
`periodic-table.test.ts`.

## Internationalisation

The design keeps this cheap on purpose (§9), so do not make it expensive.

- **No new overlay rows.** The widget's strings are UI chrome: a new
  `periodicTable` namespace in `src/i18n/dictionaries/<locale>.ts` — mode names,
  legend labels, detail-panel field labels, the scroll hint, the keyboard hint.
  `formulaExampleNames`, `exampleNames` and table `rows` are positional and are
  not involved.
- **Element names are already done** — all 118 in all five locales, with
  `chemistry-names.test.ts` asserting completeness against the live registry.
- **Format numbers per locale.** Masses are rendered from data and Russian uses
  a decimal comma (`35,45`). Do not interpolate a raw JS number.
- New glossary terms go in `docs/i18n/glossary-<locale>.md` **before** the prose
  is translated. Several were added by the split — check before adding.
- Read the header of `src/i18n/dictionaries/ru.ts` before writing Russian; the
  rules there are enforced by `src/test-utils/i18n-russian.ts`.
- Run `npm run i18n:review` and commit the regenerated review files.

## Rules of engagement

- **Do not add a dependency.** The table is 118 rows of data and an HTML table;
  a periodic-table npm package would be a worse version of `ELEMENTS_REGISTRY`,
  which already has every element.
- Do not add to `ICON_REGISTRY`. Do not hardcode colours — use the custom
  properties in `src/app/globals.css`.
- Do not put chemistry facts in components. The data module is data.
- **Grep before adding a type** — this repo already carries competing
  near-duplicate shapes for reaction data.
- Lint with `npm run lint -- src e2e`, **not** over the repo root: build output
  from in-repo worktrees under `.claude/worktrees/` pollutes it. The master
  baseline is 21 problems, all pre-existing; add none.
- Another session may hold port 3000, and `next dev` refuses a second server in
  one directory. Check what is listening before you start anything, use a free
  port, and pass `PLAYWRIGHT_BASE_URL=http://localhost:<port>`. If routes 404 or
  Turbopack reports an internal error, `rm -rf .next` and restart — that is a
  corrupt cache, not your code.
- Targeted tests while you work (typecheck + scoped vitest + one e2e spec); the
  full Playwright suite once, at the end. Note that the suite is **flaky under
  `next start`** in the locale-negotiation family — those failures are
  pre-existing and unrelated; it is green under `next dev`.
- **Look at the rendered page**: light and dark, 320px and desktop, English and
  Russian. Playwright's `toBeVisible()` is satisfied by a bounding box and knows
  nothing about a clipping ancestor; a spec on this repo once passed against
  clipped content. Assert on `document.documentElement.scrollWidth` for reflow.
- Commit in coherent steps. End each commit message with:
  `Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>`
- There is no `gh` CLI. Do not open a PR; print the compare link.

## Definition of done

§14 blocks A and B of the redesign doc are the acceptance criteria — AC-1 to
AC-14. In addition:

- [ ] `npm run lint -- src e2e`, `npm run typecheck`, `npm test`,
      `npm run build` pass; `npm run e2e` passes under `next dev`.
- [ ] The widget renders on both sheets in all six locales, with the Year 10
      sheet gated to its two modes.
- [ ] The twenty-element table is gone from the English data and all five
      overlays, and `cheat-sheets.test.ts` passes.
- [ ] Keyboard-only: tab to the table, arrow to sodium, Enter, and the panel
      shows sodium's arrangement — no mouse.
- [ ] No page-level horizontal scroll at 320px in any locale, on either sheet.
- [ ] Cell text meets 4.5:1 and tones 3:1 against neighbours, verified with
      `data-theme` forced to each value, not by trusting the OS setting.
- [ ] The milestone report names: the first-twenty `shells` source you checked
      against; anything in §6 you think is wrong and why; the no-JS behaviour
      you observed; and anything you decided that this prompt did not cover.

## Stop and ask

- If a §6 decision turns out to be unworkable rather than merely awkward.
- If `cheat-sheets.test.ts` cannot be satisfied without changing its assertions.
- Before adding any dependency.
