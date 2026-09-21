# Agent prompt: build Reaction Factory in all six languages

Copy everything below the line into a fresh agent session. It assumes nothing from the
conversation that produced it.

Context for whoever is handing it over:

- The spec is [`stoichiometry-game.md`](./stoichiometry-game.md) (Draft rev 2, teacher-reviewed).
  It is **not** the file `stoichiometry.md`, which is the separate Senior game (Mole Foundry).
- The brief's "Languages" table was resolved on 2026-09-21: all six titles and hub descriptions
  are decided, with a kind and an alternative each, and the prompt tells the agent to build them
  verbatim and bring back a native-speaker read rather than a re-translation.
- [`../BUILD_PLAN.md`](../BUILD_PLAN.md) §3 still lists this brief as **not buildable**, because
  its status line reads `Draft rev 2` rather than `Approved`, and §5.1 tells an agent that finds
  a non-`Approved` brief to post an approval request and skip. This prompt hands the agent the
  go-ahead regardless. Set the status line to `Approved` before you hand it over, so the agent
  is not building against a file that tells it to stop.
- The game is large — 9 levels, three new mechanics, six locales — so the prompt splits the work
  into five milestones on one branch, with a report after each.

---

You are building a new game in **chem-games**, a Next.js 16 + React 19 + Tailwind 4 + Supabase
site of chemistry mini-games and cheat sheets for secondary students, aligned to the Victorian
Curriculum and VCE. The site ships in six languages, and a game that plays in English only is
not done.

Create and work on the branch `feature/reaction-factory`, cut from an up-to-date `master`.

## Before you write any code

1. **Read `AGENTS.md` at the repo root and obey it.** This is not the Next.js in your training
   data. Read the relevant guide in `node_modules/next/dist/docs/` before touching any framework
   API — routing, metadata, caching and `params` especially. Where the shipped docs and your
   memory disagree, the shipped docs win. Heed deprecation notices.
2. **Read `docs/game-briefs/stoichiometry-game.md` end to end.** It is your spec — the brief for
   *Reaction Factory*, slug `reaction-factory`. Do not build from `stoichiometry.md`; that is a
   different game (Mole Foundry, Senior), and it matters here only as the thing Level 9 links to.
   The brief's "Definition of done" and "Teacher review of this design (applied)" sections are
   binding: the second records *why* the design is shaped the way it is, and every item in it is
   a change you must not quietly undo.
3. **Read these, and follow them rather than inventing conventions:**
   - `docs/AGENT_INSTRUCTIONS.md` — Part A (the pedagogical contract, including the anti-patterns
     table) and Part B (the platform contract: file layout, registries, the numbered steps,
     gotchas).
   - `docs/BUILD_PLAN.md` §4 (Phase F foundations), §5 (per-game procedure), §6 (how to report),
     §7 (verification standard).
   - `docs/i18n/GAMES.md` — the every-locale rule, the catalogue layout, and the four language
     checks you must report per locale.
   - `docs/i18n/README.md` and all five `docs/i18n/glossary-{de,fr,es,it,ru}.md`.
   - `docs/GAME_DESIGN_CHECKLIST.md`, `docs/ACCESSIBILITY.md`, `docs/STYLE_GUIDE.md`,
     `docs/TESTING.md`, `docs/DATABASE_CONCEPTS.md`.
4. **Read the code you are about to imitate, and imitate it rather than improving on it:**
   - `src/components/games/reaction-balancer/` and `src/hooks/useReactionBalancer.ts` — the
     closest game in both subject and structure: the whole rules engine in one hook, a thin page,
     a `GameArena`.
   - `src/app/[lang]/(gameplay)/games/lewis-structures/page.tsx` — the effect-free first-play
     instructions pattern (`useStoredValue`, `isPaused` derived rather than toggled).
   - `src/components/games/shared/` — `CoachPanel`, `GlossaryTerm`, `RichMessage`, `GameShell`,
     `GamesHeader`, `GameOverlay`, `GameFooter`, both modals — and `src/hooks/useHintLadder.ts`.
   - `src/core-engine/config/games/reaction-balancer-config.ts` and
     `reaction-balancer-messages.ts` — the config-with-UAT-guide convention, and the canonical
     message-catalogue shape (`Translated<>`, no runtime imports).
   - `src/i18n/game-messages/reaction-balancer/` — the per-locale catalogue and its loader.
   - `src/i18n/chemistry-names.ts` and `src/i18n/cheat-sheets.ts` — the canonical-English-plus-
     overlay pattern and the parity tests that gate it.
   - `supabase/migrations/20260918_activate_reaction_balancer.sql` and
     `20260917_add_lewis_structures_game.sql` — the idempotent games/concepts seed pattern.

## What you are building

**Reaction Factory** (`reaction-factory`): hoppers of reactant particles feed a machine that runs
a balanced equation as a recipe; a two-pan balance beside the line teaches relative atomic and
relative formula mass; a mass ledger turns that into mass-by-proportion. Eight levels, one new
idea each, plus Level 9 as a badged, skippable "Senior preview" of the mole. No lives, no timer.

Everything about the design — levels, orders, reactions, arithmetic policy, guided rounds,
message keys, glossary, misconceptions, accessibility — is specified in the brief. Build what it
says. Where the brief and this prompt disagree, the brief wins; report the conflict.

**Decisions already made, which are not yours to revisit:** the slug is `reaction-factory` even
though the brief file is named `stoichiometry-game.md`; there are eight levels, not four; the
mole appears only at Level 9; Levels 1–2 are particle counts with no grams anywhere; Ar comes
from a single Year 10 table rather than `elements.ts` precision; predict-then-run is the learning
moment; the sandwich analogy stays out.

## Milestone 1 — the foundations this game needs that do not exist yet

Land these first, with unit tests, and report before starting the game itself.

- `src/core-engine/constants/year10-ar.ts` — the Year 10 Ar table from the brief (H 1, C 12,
  N 14, O 16, Na 23, Mg 24, Al 27, S 32, Cl 35.5, K 39, Ca 40, Fe 56, Cu 63.5), in one place, so
  the game's Mr equals what students see in class. Unit-test that each of the brief's ten
  reactions has a ledger that balances with these values.
- `MassBalance` shared component (Phase F item F8, named by two briefs, still unbuilt): beam and
  two-pan modes, with the **text readout always present** ("left pan 12, right pan 12 — level").
- `PeriodicDrawer` shared component: the Ar lookup drawer, keyboard reachable, with the
  "1 atom of {X} weighs the same as {Ar} hydrogen atoms" line. Mole Foundry will reuse it, so it
  belongs in `src/components/games/shared/`, not in this game's folder.
- The brief's pure functions, tested before any UI exists: `batchesPossible`, `runFactory`,
  `relativeFormulaMass` (brackets — `parseFormulaAtoms` in
  `src/core-engine/utils/chemical-utils.ts` already handles them, so reuse it; do not write a
  second parser), `massLedger`, `massToMass`, `limitingByMass`.
- `src/core-engine/data/games/factory-orders.ts` — every order for all nine levels, with the
  `sameAs` links from Level 9 back to the Level 7–8 orders it mirrors. Test that every order is
  achievable, and that every Level 2 and Level 8 order resolves to the limiting reagent the brief
  says it does — including the "the smaller mass is not limiting" case (8 g H₂ with 16 g O₂).

Phase F items F1, F2, F3, F4 and F7 already exist (bracket parsing, `CoachPanel`, `GlossaryTerm`,
Support mode, `useHintLadder`). F5 (`useFirstVisitInstructions`) and F9 (the `time_scale` /
`support_mode` migration) do not — do not build them as part of this game. Copy the existing
first-play pattern from `lewis-structures/page.tsx`, and note F9 as still outstanding in your
report.

## Milestone 2 — the game, in English

Follow `AGENT_INSTRUCTIONS.md` step by step. Data and rules first, UI second.

Config in `src/core-engine/config/games/reaction-factory-config.ts` with the fields the brief
lists, named presets, and a UAT TUNING GUIDE block — no tuning number anywhere else. Every string
in `reaction-factory-messages.ts`, carrying every key from the brief's message catalogue table.
Instructions verbatim from the brief. The three guided rounds (Levels 1, 3 and 4) scripted
exactly as written. Route at `src/app/[lang]/(gameplay)/games/reaction-factory/page.tsx`.

If the dev server enters a reload loop after you add the route, `rm -rf .next` and restart: a
stale Turbopack cache after a route addition is a known failure in this checkout, not a bug in
your code.

## Milestone 3 — all six languages

`LOCALES` is `['en','de','fr','es','it','ru']`. All six ship in this milestone. There is no
"English now, translations later".

Work in this order, per `docs/i18n/GAMES.md`:

1. **Glossary terms first, translation second.** The brief names the terms that must be decided
   before anything is translated: the coined **hopper**, **batch**, **order** and **production
   log**, plus ratio, limiting reagent, excess, Ar, Mr, "relative means compared with hydrogen",
   subscript, bracket, mass ledger, and the Level 9 mole terms. Add a row for each to every
   `docs/i18n/glossary-<locale>.md` before you translate a single string, with the kind of
   reasoning the existing rows carry. The symbols Ar and Mr stay untranslated.
2. `src/i18n/game-messages/reaction-factory/{de,fr,es,it,ru}.ts` plus the loader `index.ts`, each
   `satisfies ReactionFactoryMessages`.
3. Title and hub description in all six `src/i18n/dictionaries/<locale>.ts`; the slug added to
   `GAME_TITLE_KEYS` and to `EXPECTED_GAMES`.
4. New species in `src/i18n/chemistry-names/<locale>.ts`; the order prose and the per-level hint
   variants overlaid by id — never a second copy of the dataset per language.
5. The new `relative-formula-mass` cheat sheet in `src/lib/cheat-sheet-data.ts`, and its overlay
   in all five `src/i18n/cheat-sheets/<locale>.ts`, row for row.
6. `src/i18n/review-notes.ts` entries for the new namespace, then `npm run i18n:review` to
   regenerate the `<locale>-review.md` tables.

**Never translated:** formulae, element symbols, state symbols, charges, equations, the slug,
catalogue keys, `hasSeenReactionFactoryInstructions`, `games.id`, sound names, CSS tokens. A
formula inside a message is written in backticks and typeset by `MoleculeText`.

**Russian needs the three-form plural shape** for "{batches} batches", "{left} left over",
"Order {n}/{total}" and the hopper counts. `src/test-utils/i18n-russian.ts` holds the gates that
exist to catch exactly this.

**The brief's Languages table is decided (2026-09-21). Build those titles and hub descriptions
verbatim — do not re-translate them, and do not "improve" them to match a dictionary you like
better.** The one thing you owe them is a native-speaker read: report each row under "Check 4"
in the milestone report with who read it and what they said. If a native speaker rejects a row,
change it *there*, in the brief, with the reason recorded — never silently.

## Milestone 4 — registrations, database, cheat sheet

Slug everywhere (`BUILD_PLAN.md` §5.3): `GameName`, `GameThemeScope`, the route folder,
`games.id`, `concept_games`, the config's `gameId`, `GAME_LINKS`, `GAME_TITLE_KEYS`,
`e2e/helpers.ts` `GAME_SLUGS`, `relatedGames`, the hub array, `DEFAULT_OVERLAY_MESSAGES` and
`PublicLeaderboard.tsx`.

One new migration (never edit an old one), idempotent, following the two named above:

- the `games` row `'reaction-factory'`, **inactive**;
- a new concept `reacting-quantities` (Year 10, strand `Stoichiometry`, no parent) with
  `concept_games` marking this game primary; the existing Senior `stoichiometry` concept gains
  this game as `prerequisite` and keeps Mole Foundry primary;
- a new cheat sheet `relative-formula-mass` (Year 10) as that concept's primary sheet, plus a
  link to `balancing-equations`. The Senior `stoichiometry` sheet is linked only from Level 9.

Flip `is_active` to `true` only after the milestone is approved.

Sessions: one `recordGameSession` at victory or exit (`'abandoned'`), and Level 9 records a
**separate** session, so its results do not blend into the Year 10 statistics.

## Milestone 5 — verification and report

Per `docs/TESTING.md`: targeted runs while you work, the full suite before you ask for review.

```bash
npm run typecheck
npx vitest run reaction-factory
npm test
npx playwright test e2e/reaction-factory.spec.ts
npm run e2e
```

Lint with `npx eslint src e2e` — not the bare repo root, which picks up build output from sibling
worktrees and buries the real findings.

Write an e2e spec in the style of the existing per-game specs, including the locale block the
other games have, and add a scenario section for this game to `docs/TESTING.md` §"Scenario
catalog".

Manual passes you must actually perform, and report honestly: keyboard-only playthrough to
victory; touch layout at 375 px; `prefers-reduced-motion`; light and dark theme; one full
playthrough per locale, checking for leaked English, wrong chemical names, and formulae that came
through translation byte-identical.

Then post the **milestone report** in the exact format of `BUILD_PLAN.md` §6, including the
Languages block with all four checks per locale, and stop for review.

## Definition of done

The brief's own "Definition of done" list, plus `GAME_DESIGN_CHECKLIST.md` §1–3, plus: every
message key present in all six catalogues; instructions auto-open on first play; each of the
three guided rounds runs once; Support mode persists and leaves `accuracy` null; Level 9 badged
and skippable from the victory overlay; no timer anywhere; and every count, batch, leftover, pan
reading and mass available as text.

## How to work

- Commit in coherent steps with real messages, ending each commit message with
  `Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>`.
- There is no `gh` CLI here. Do not try to open the PR — push the branch and give me the GitHub
  compare link, and I will open it.
- Other sessions work in sibling worktrees on this checkout. Re-check `git status` and which
  branch you are on before committing, and never commit another session's files.
- If something in the brief turns out to be wrong or impossible, say so in the report with the
  reason, implement the nearest thing that is right, and update the brief in the same branch —
  never silently deviate.
- Ask before doing anything the brief does not cover that changes an existing game's behaviour.
