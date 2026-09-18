# Build Plan: Implementing the Game Briefs

**Audience:** a coding agent (Claude Code CLI on a server, or equivalent) starting from a fresh
clone of `https://github.com/StellaSlad/chem-games.git` (`origin`).
**Owner / reviewer:** Stella (pedagogy owner). The agent builds; Stella approves briefs and
reviews milestones.
**Last updated:** 2026-09-18 (languages: every game ships in every locale)

This plan tells the agent what to build, in what order, how to know a brief is buildable, how
to verify work, and where to stop and wait for a human. It does not repeat the how-to: that is
in the documents listed under "Read first".

## 0. Ground rules (read before anything else)

1. **Never resolve a `YOU DECIDE` yourself.** A brief with any `YOU DECIDE` marker or a status
   other than `Approved` is **not buildable**. Post the open items as a review request (see §6)
   and move to the next buildable brief. Guessing pedagogy is the one failure mode this whole
   documentation set exists to prevent.
2. **The brief is the spec; `AGENT_INSTRUCTIONS.md` is the contract.** If they conflict, stop
   and ask. If the code conflicts with either, the code is wrong unless the doc is provably
   stale — then fix the doc in the same commit.
3. **One long-lived integration branch**, `build/game-briefs`, cut from `origin/master`. All
   work goes there, game after game, foundations first. One pull request is opened after
   foundations and stays open; each finished game is a milestone on that PR (§6). Never commit
   to `master`; never force-push; never rebase the branch once the PR is open (merge
   `origin/master` in instead).
4. **Do not touch** `.claude/`, `supabase/migrations/*_rows.sql` (data dumps), or any
   `neutralise-levels*` file other than `neutralise-levels.ts`. Do not add a second test
   runner, icon library, or state library.
5. **Every game ships its text — in every language.** Instructions that auto-open on first
   play and a `<game>-messages.ts` catalogue are mandatory (`AGENT_INSTRUCTIONS.md` steps 7
   and 7b). No copy in JSX. The catalogue, the title and hub description, the chemistry
   names and any dataset prose exist in **every locale in `LOCALES`**
   (`src/i18n/config.ts`) before the milestone is reported, and the four language checks in
   `docs/i18n/GAMES.md` are done per locale. A brief without a resolved "Languages" table is
   treated like a brief with a `YOU DECIDE`: not buildable.
6. **Secrets never enter git.** `.env.local` is gitignored; if credentials are supplied, they
   go there and nowhere else.

## 1. Setup

```bash
git clone https://github.com/StellaSlad/chem-games.git
cd chem-games
git remote add fork https://github.com/StellaSlad-Appian/chem-games.git   # optional: Stella's review fork, read-only for you
node --version        # CI uses Node 24 (.github/workflows/test.yml); use 22+ locally
npm ci
git checkout -b build/game-briefs origin/master
npm run typecheck && npm test        # must be green before you change anything
```

**Supabase:** no credentials are provided by default. `src/lib/supabase/config.ts` makes every
data call degrade to empty results when `NEXT_PUBLIC_SUPABASE_URL` /
`NEXT_PUBLIC_SUPABASE_ANON_KEY` are unset, so the app runs, but session recording, progress,
leaderboards and the concept links **cannot be verified end to end**. Each game's milestone
report must list what was verified with a live database and what was not. If Stella supplies a
dev project's URL and anon key, put them in `.env.local`, apply `supabase/migrations/*.sql` in
filename order (skipping `*_rows.sql`) via the Supabase SQL editor or `supabase db push`, and
then verify the session/progress rows for real.

**Dev server:** `npm run dev` (port 3000). If Turbopack panics with exit code `0xc0000142` on
Windows, that is a process-spawn issue, not code — restart. Never run `npm run build` while
`npm run dev` is running in the same checkout; it corrupts the dev server's cache.

## 2. Read first (in this order)

| Document | Why |
|---|---|
| `AGENTS.md` / `CLAUDE.md` | Next.js 16 differs from training data — read `node_modules/next/dist/docs/` before writing routes |
| `docs/AGENT_INSTRUCTIONS.md` | The 13-step build procedure, text-content rules, gotchas |
| `docs/GAME_DESIGN_CHECKLIST.md` | What "done" means, pedagogically and technically |
| `docs/STYLE_GUIDE.md`, `docs/ACCESSIBILITY.md` | Tokens, z-index ladder, motion, WCAG 2.2 AA requirements |
| `docs/TESTING.md` | Vitest/Playwright layout, known issues (several are fixed by this plan), lint status |
| `docs/i18n/GAMES.md` | What "in every language" means for a game, the catalogue layout per locale, the four language checks and the e2e pattern |
| `docs/i18n/README.md`, `docs/i18n/glossary-<locale>.md` | How the i18n system works; the agreed chemistry terms per language — read the glossary *before* translating a catalogue (both on the `i18n` branch until it merges) |
| `docs/DATABASE_CONCEPTS.md` | `concepts` / `concept_games` / `cheat_sheets` schema and seeds |
| `docs/game-briefs/README.md` | Index, status of every brief, decisions already made |
| The brief you are about to build | The spec |

## 3. Brief status board

Status is read from the `**Status:**` line of each brief at the moment you start it — not from
this table, which is a snapshot.

| Order | Brief | Slug | Status (2026-09-16) | Buildable? | Blocks on |
|---|---|---|---|---|---|
| F | *Foundations* (§4) | — | — | **Yes** | — |
| 1 | `reaction-balancer.md` | `reaction-balancer` | Approved rev 2 — built; translation in progress on `i18n` | **Yes** | F; German title decision in the brief's "Languages" table |
| 2 | `lewis-structures.md` | `lewis-structures` | Approved rev 3 — built; translation in progress on `i18n` | **Yes** | F (`AtomCanvas` is built *inside* this game and promoted to shared); German title decision |
| 3 | `stoichiometry-game.md` | `reaction-factory` | Draft rev 2, titles per locale to decide | **No — needs `Approved`** | F, Stella's approval incl. the "Languages" table; reuses the bracket-aware parser from 1 |
| 4 | `ion-forge.md` | `ion-forge` | Draft, 3 `YOU DECIDE` | No | Stella resolves tray size, hydrates, molecular/acid naming placement |
| 5 | `stoichiometry.md` (Mole Foundry) | `mole-foundry` | Draft, open questions | No | Stella; should be re-aligned with Reaction Factory Level 9 first |
| 6 | `synthesis-router.md` | `synthesis-router` | Planned, 4 open questions | No | Stella confirms R15/R16, Markovnikov, exam-mode placement |
| 7 | `organic-naming.md` | `chain-namer` | Draft | No | Stella; reuses the organic dataset from 6 |
| — | `functional-groups.md` | — | Superseded (options record) | Never | — |

**Rule:** build in order among the buildable briefs. When you reach a non-buildable brief,
post its open items (§6, "approval request"), then continue with the next buildable one. If
nothing is buildable, finish the current milestone, post the report, and stop.

## 4. Phase F — Foundations (build once, before any game)

These are named in several briefs; build them first so games don't each grow a private copy.
Land them as the first milestone on the PR and wait for sign-off (§6) before starting a game.

| # | Deliverable | Spec source | Acceptance |
|---|---|---|---|
| F1 | `parseFormulaAtoms()` handles brackets (`Ca(OH)2`, `Al2(SO4)3`) in `src/core-engine/utils/` | `TESTING.md` known issue #2; Reaction Balancer + Reaction Factory briefs | Unit tests over every formula in `reactions.ts` and `compounds.ts`; promote the `it.fails` in `known-issues.test.ts` to a passing test |
| F2 | `CoachPanel` shared component | Reaction Balancer brief §Support | Text strip with `aria-live="polite"`, on/on-request/pinned modes, reads messages from a `<game>-messages.ts` catalogue |
| F3 | `GlossaryTerm` shared component | Same | Dotted-underline trigger → focusable pop-over with one-sentence definition, `Escape` closes |
| F4 | Support mode per game in `game-settings-context.tsx` + toggle in `GameSettingsModal` | Same; `ACCESSIBILITY.md` | Persists like per-game theme; games read it; `accuracy` is `null` when on |
| F5 | First-play instructions helper (`useFirstVisitInstructions(gameSlug)`) | `AGENT_INSTRUCTIONS.md` step 7; Neutralise page | `localStorage` flag `hasSeen<Game>Instructions`, pauses via `pausedByModalRef`, keyboard/touch tabs in `GameInstructionsModal` |
| F6 | `prefers-reduced-motion` guard in `globals.css` + `aria-label` on the icon-only footer/header buttons | `ACCESSIBILITY.md` §2 items 1–2 | Existing games unaffected visually with motion on; animations off under the media query |
| F7 | Hint ladder helper (`useHintLadder(tiers)`) | Reaction Balancer brief | Tier state, "tier 3 used" flag for accuracy, reset per round |
| F8 | `MassBalance` (beam and two-pan modes) | Reaction Balancer + Reaction Factory briefs | Text readout always present |
| F9 | Migration adding `game_sessions.time_scale numeric default 1` and `support_mode boolean default false` | `DATABASE_CONCEPTS.md` suggested change 2; Support mode | Idempotent; `recordGameSession` accepts and writes them |

Foundations do **not** change existing game behaviour except F6's motion guard and the
`aria-label`s. Run the full suite and a manual pass of the three live games afterwards.

## 5. Per-game procedure

For each buildable brief, in order:

1. Re-read the brief's `**Status:**` line. Not `Approved` → §6 approval request, skip.
2. Follow `AGENT_INSTRUCTIONS.md` steps 1–13 exactly. The brief's "Platform reuse",
   "Registrations" and "Definition of done" sections tell you which files, slugs, migrations,
   cheat-sheet links and tests this game needs beyond the generic steps.
3. Slug everywhere: `GameName`, `GameThemeScope`, route folder, `games.id`, `concept_games`,
   config `gameId`, `GAME_LINKS`, `GAME_TITLE_KEYS`, `e2e/helpers.ts` `GAME_SLUGS`, the brief.
   Reaction Factory's brief file is named `stoichiometry-game.md` on purpose; its slug is
   still `reaction-factory`.
4. Data and rules first, UI second: the brief's pure functions and datasets with their unit
   tests before any component.
5. Text: `<game>-messages.ts` with every key from the brief's message catalogue; instructions
   verbatim from the brief; guided rounds as scripted in the brief. Then the same catalogue in
   every other locale (`src/i18n/game-messages/<game>/<locale>.ts`), the title and hub
   description from the brief's "Languages" table in every dictionary, new species in
   `chemistry-names/<locale>.ts`, dataset prose overlaid, review notes added — glossary terms
   first, translation second (`docs/i18n/GAMES.md`).
6. Database: a new migration (never edit old ones) inserting the `games` row **inactive**, the
   concept / `concept_games` / `concept_cheat_sheets` rows the brief names, and any new cheat
   sheet registry row. Flip `is_active` to `true` in the same migration only after the
   milestone is approved (§6).
7. Verify (§7). Then §6 milestone report.

Expected order of milestones on the PR: **F → Reaction Balancer → Share to Fill →** (then
whichever of 3–7 has become `Approved`, in listed order).

## 6. Review gates and how to ask

All communication happens on the single PR `build/game-briefs → master` on
`StellaSlad/chem-games` (the repo you cloned; `origin`). Open it as a **draft** right after
Foundations are pushed,
with the PR body listing the milestones as a checklist.

**Milestone report** (post as a PR comment, then wait — do not start the next game until
Stella replies "approved" on that comment):

```
## Milestone: <Foundations | Game name> — ready for review
Brief: docs/game-briefs/<file>.md (status: Approved rev N)
Commits: <first>..<last>

### Checklist
- [x] GAME_DESIGN_CHECKLIST §1 items ... (list each with a one-line note)
- [x] GAME_DESIGN_CHECKLIST §2 items ...
- [x] Brief's Definition of done items ...

### Verified
- npm run typecheck / test / e2e: <results>
- Manual: keyboard-only playthrough to victory and to a loss; touch layout at 375 px;
  reduced-motion; light + dark theme
- Live database: <verified | NOT verified — no credentials; what remains unverified>

### Languages
- Locales shipped: <every locale in LOCALES at this date, e.g. en, de>
- Gates: typecheck / catalogue parity / chemistry-names / game-titles: <green>
- e2e locale block: <green>; page test in a non-English locale: <green>
- Check 1 (text correct): <per locale — what was played through; any leaked English found and fixed>
- Check 2 (understandable): <per locale — read-aloud pass by whom; strings rated low in review-notes>
- Check 3 (chemical names): <names introduced; who checked them; naming rules taught and how they were localised>
- Check 4 (title): <per locale — proposed title, kind, alternative; for Stella's decision>
- Native-speaker / teacher review: <done by … | NOT done — listed for review>

### Deviations from the brief
<none, or each one with the reason and the doc updated>

### Screenshots
<instructions modal, Level 1, a coach message, a hint tier 3, victory overlay — in English,
then instructions, a coach message, a hint and the victory overlay in each other locale>
```

**Approval request** (for a non-buildable brief; post once per brief, as a PR comment):

```
## Needs approval before build: <brief file>
Current status line: <quote>
Open items:
1. <YOU DECIDE text or open question, quoted>
...
I will not build this until the status line reads Approved and the items above are resolved
in the brief.
```

When Stella changes a brief's status on `master`, merge `origin/master` into
`build/game-briefs` and re-check §3.

## 7. Verification standard (every milestone)

```bash
npm run typecheck   # must pass
npm test            # must pass; new specs for every pure function and dataset in the brief
npm run e2e         # must pass for the new game's spec (add e2e/<slug>.spec.ts, see TESTING.md)
npm run lint        # report the count; pre-existing findings are documented in TESTING.md.
                    # Your new files must be lint-clean. Do not fix unrelated findings in a
                    # game milestone; if you fix any, do it in a separate commit.
```

Manual, in a real browser via `npm run dev`: golden path to victory, a loss/abandon path,
pause/settings/instructions interplay (`pausedByModalRef` — no double pause), every hint tier,
Support mode on, keyboard-only, touch preset, `prefers-reduced-motion`, light and dark theme.
Then the per-game checklist in `ACCESSIBILITY.md` §8. Then, **in every other locale**
(switch with the language selector in Settings, or open `/<locale>/games/<slug>`): the four
language checks in `GAME_DESIGN_CHECKLIST.md` §3 — text correct with no English leaking,
understandable at reading age ~12 in that language, chemical names right for that language,
title reads well — and the layout at 375 px in the longest locale.

Language gates (all part of `npm test`): the catalogue parity tests, `chemistry-names.test.ts`,
`cheat-sheets.test.ts`, `game-titles.test.ts`; plus the locale block in `e2e/<slug>.spec.ts`
(`docs/i18n/GAMES.md` § Testing).

Data integrity: any new chemistry data gets a spec in `src/core-engine/tests/` in the style of
`compounds.test.ts`; the brief's Definition of done names the specific assertions.

## 8. Things that will look like problems and aren't

- `npm run lint` fails with ~21 pre-existing errors (`TESTING.md` "Known lint findings"). CI
  runs lint with `continue-on-error`. Don't "fix" them inside a game milestone.
- `reaction-balancer` and `bond-builder` already exist as **inactive** rows in `games` and in
  `concept_games`; `reaction-balancer` also has a route, arena and hook that the brief says to
  replace. Keep the slug, replace the implementation.
- `classifier-games-config.ts` contains unused configs with ids like `acid-base-classifier`
  that don't match `games.id`. Ignore unless a brief tells you to use one, and then use the
  `games.id` slug.
- Two `ChemicalReaction` types exist (`types/chemistry.ts` and `data/reactions.ts`), and
  `useReactionBalancer.ts` is unused — the Reaction Balancer brief tells you which to keep.
- `docs/game-briefs/functional-groups.md` is an options record, not a brief to build.

## 9. Definition of done for this plan

- All Approved briefs implemented, each with an approved milestone comment.
- Every non-buildable brief has an approval-request comment listing its open items.
- Foundations F1–F9 merged and used by every new game (no private copies of
  `CoachPanel`/`GlossaryTerm`/parser/`MassBalance`).
- Every built game plays in every locale in `LOCALES`, with its four language checks reported
  per locale and its title per locale decided in the brief.
- `TESTING.md` known issues fixed by this work are removed and their `it.fails` tests promoted.
- `docs/game-briefs/README.md` index updated with each game's real status and slug;
  `AGENT_INSTRUCTIONS.md` updated wherever the code and the doc drifted during the build.
- PR body checklist complete; PR marked ready for review (not merged — Stella merges).
