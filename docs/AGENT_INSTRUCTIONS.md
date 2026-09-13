# Agent Instructions: Building a New Chemistry Game

Give this file (plus [`GAME_DESIGN_CHECKLIST.md`](./GAME_DESIGN_CHECKLIST.md),
[`STYLE_GUIDE.md`](./STYLE_GUIDE.md), [`ACCESSIBILITY.md`](./ACCESSIBILITY.md), and the
**approved** brief for the game from [`game-briefs/`](./game-briefs/)) to any agent — human or
AI — tasked with adding a new mini-game to chem-games. It has two halves:

1. **Part A — pedagogical contract.** What makes a chem-games mini-game "good" and not
   chocolate-covered broccoli. Non-negotiable.
2. **Part B — platform contract.** The concrete files, registries, and conventions this
   Next.js + Supabase codebase actually uses. Derived from reading the working games
   (`formula-blaster`, `acid-classification`, `neutralise`, the in-progress `reaction-balancer`),
   not aspirational — if code and doc disagree, trust the code and update this doc.

---

## Part A — Pedagogical Contract

Source: internal design research doc, "Design Guidelines for Educational Chemistry Games."
Full framework retained in [`GAME_DESIGN_CHECKLIST.md`](./GAME_DESIGN_CHECKLIST.md); the essentials:

### Core philosophy: Intrinsic Learning Integration

Chemical rules must define the **physics, constraints, and victory conditions** of the game —
not gate access to an unrelated arcade mechanic. If you can strip out all the chemistry and the
game still plays the same, the mechanic has failed.

### Johnstone's Triplet — every core mechanic should touch at least two of:

| Level | What it is | Example |
|---|---|---|
| Macroscopic | Observable phenomena | color change, precipitate, gas release |
| Submicroscopic | Particulate interactions | ionic charge, valence electrons, molecular geometry |
| Symbolic | Notation | formulas, balanced equations, reaction arrows |

**Concretely in this codebase:** when a player action changes a submicroscopic property, the UI
must update the macroscopic visual *and* the symbolic notation in the same render — not on a
delay, not behind a "check answer" button, unless the mechanic is specifically a delayed-feedback
one (see Neutralise/Formula Blaster's `feedback_latency_ms: 0` default). `reaction-balancer`
already does this correctly: `useReactionBalancer.ts`'s `leftAtoms`/`rightAtoms` memo recomputes
on every coefficient keystroke, so the atom-inventory UI and the balance state are always in sync
with what's on screen — model new games on that pattern, not on a "submit and see" pattern.

### Progressive scaffolding (Cognitive Load Theory)

1. **Exploration** — pattern recognition with active visual hints, generous feedback.
2. **Guided Application** — apply a rule (octet rule, conservation of mass) with fading hints.
3. **Unassisted Synthesis** — multi-step chains, yield prediction, sandbox optimization.

Map this to the existing per-game `levels`/`maxLevel` config pattern (see Part B) rather than
inventing a separate scaffolding system.

### Anti-patterns — reject these even if requested

| Anti-pattern | Why it fails | Do instead |
|---|---|---|
| Chocolate-covered broccoli (quiz bolted onto unrelated gameplay) | Kills intrinsic motivation | Chemistry logic *is* the physics/win-condition |
| Rigid solar-system orbits / solid billiard-ball atoms | Embeds lasting misconceptions | Electron density clouds / probability models, with explicit scale disclaimers |
| Extraneous UI, heavy cutscenes, bloated menus | Burns working memory the student needs for chemistry | Keep controls learnable in <30s (see Cognitive Friction Check) |
| High-stakes timers / public leaderboards as the primary loop | Anxiety, especially for struggling students | Self-paced, mastery-based progression as the default; if a public leaderboard is used (this platform already has one — `LeaderBoard.tsx`, `PublicLeaderboard.tsx`), treat it as optional flavor, never the thing blocking progress |

**Existing tension to be aware of:** Formula Blaster and Neutralise already use wave countdowns
(`baseWaveTimeSeconds`) and the platform has a public leaderboard. Follow the platform's existing
convention (timers are per-wave and forgiving, restart is instant and blame-free) rather than
introducing a stricter or more punishing timer for a new game — check `GameOverlay.tsx`'s
low-stakes "Try Again" framing for the tone to match.

### Pre-flight validation (condensed — full version in the checklist doc)

1. Chemical accuracy: 100% correct formulas, valences, thermodynamic signs, stoichiometry.
2. Triplet sync: changing a particle updates visuals + symbolic notation together.
3. Mechanic alignment: the primary input maps to a real chemistry action, not generic score-attack.
4. Cognitive friction: controls learnable in under 30 seconds, no manual required.
5. Transferability: winning the game should look like solving the equivalent classroom problem.

---

## Part B — Platform Contract (chem-games specifics)

**Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Supabase
(auth + Postgres), no external state-management library. No test runner is currently installed
(see Gotchas).

### Where things live

```
src/
  app/
    (main)/...              marketing/dashboard pages, layout has NavBar
    (gameplay)/
      layout.tsx             gameplay-only layout (no NavBar chrome)
      games/<game-slug>/
        page.tsx              THE game's entry point — composes shared UI + GameArena
  components/
    games/
      shared/                 GameShell, GamesHeader, GameFooter, GameOverlay,
                               GameSettingsModal, GameInstructionsModal, GameStats,
                               GameTimer, GameLives, ErrorBanner, FeedbackBanner
      <game-slug>/             game-specific components (GameArena.tsx + smaller pieces)
    ui/                        generic widgets (ScoreBadge, LevelProgress, ChemIcon, ...)
    social/                    LeaderBoard, PublicLeaderboard, PublicProfile
  core-engine/
    data/                      shared scientific data: elements.ts, compounds.ts, ions.ts,
                               reactions.ts — reuse this, don't fork copies into your game
    config/games/<game>-config.ts   tunable gameplay numbers (see "Config file convention")
    types/                     chemistry.ts (domain types), general.ts (GameState, GameName, ...)
    constants/                 chemical-classifications.ts, chemical-labels.ts, ui-constants.ts
    utils/                     spawn-manager.ts, collision-utils.ts, level-manager.ts, etc.
    tests/                     Jest-style specs validating data integrity (see Gotchas)
  hooks/                       useGameState, useSound, useInputMethod, and any game-specific hook
  context/
    game-settings-context.tsx  mute/volume + per-game theme override (GameThemeScope)
  lib/
    actions/game-actions.ts     recordGameSession() — Supabase writes for score/progress
    supabase/                   client/server/proxy Supabase setup
supabase/
  migrations/                   SQL migrations — see "Database registration" below
```

### Step-by-step: adding a new game

Do these roughly in order; several steps have hard cross-file dependencies (e.g. the DB insert
must exist before `recordGameSession` will succeed, because `game_id` is a foreign key).

1. **Get/confirm the concept brief.** Do not invent the chemistry concept, target year level, or
   core mechanic yourself — that must come from a filled-in brief (template in
   `DOCS_NEEDED.md`). If none exists, stop and ask for one; guessing here is how you end up
   building a technically polished but pedagogically hollow game.

2. **Register the type-level identity of the game:**
   - Add the slug to `GameName` in `src/core-engine/types/general.ts`.
   - Add the slug to `GameThemeScope` in `src/context/game-settings-context.tsx`.
   - Grep for every other place `GameName` or the theme scope union is switched over
     exhaustively (e.g. `LeaderBoard.tsx`, `PublicLeaderboard.tsx`) — TypeScript will not
     always catch a missing case in a plain `Record`, so check `DEFAULT_OVERLAY_MESSAGES` too.

3. **Add or extend chemistry data** in `src/core-engine/data/` rather than inlining chemical
   facts inside components. If the game needs a data shape that doesn't exist yet (e.g. bond
   geometries, activation energies), add types to `src/core-engine/types/chemistry.ts` —
   **first grep for an existing type that already covers it.** This codebase currently has at
   least one case of a duplicate/competing shape (see Gotchas) — don't add a second one.

4. **Create the config file** at `src/core-engine/config/games/<game>-config.ts`. Follow the
   established convention exactly (see `formula-blaster-config.ts`):
   - Define 2–3 named preset objects (e.g. `OPTION_1_SMOOTH`, `OPTION_2_ARCADE`) covering
     different difficulty/pacing feels, each `as const`.
   - Export one `<GAME>_CONFIG` const that points at the chosen default preset, with a comment
     telling a non-engineer which export line to change.
   - Lead the file with a **UAT TUNING GUIDE** comment block: "IF PLAYERS SAY X, change field Y."
     This is a strong, repeated pattern in this repo — the config file is meant to be handed to
     a teacher/playtester, not just an engineer.
   - Never hardcode tuning numbers (speeds, spawn rates, time limits, level counts) directly in
     components or page files — they always come from this config.

5. **Build the game-specific components** under `src/components/games/<game-slug>/`. For
   anything beyond a trivial game, separate the interactive loop into a `GameArena.tsx` (owns
   the play-field rendering + per-frame/per-tick logic) and keep the page responsible only for
   coordinating state, config, and shared chrome. Reuse shared primitives from
   `components/games/shared/` and `components/ui/` — don't rebuild a settings modal, overlay,
   header, or score badge.

6. **Wire game state** via `useGameState()` (score/level/pause primitives) plus a dedicated hook
   if the game's logic is nontrivial (see `useReactionBalancer.ts` as the pattern for "encapsulate
   the whole rules engine in one hook, keep the page thin"). `GameState` is the fixed union
   `'playing' | 'paused' | 'failed' | 'victory' | 'levelUp'` — don't invent new states; express
   game-specific nuance (e.g. `failReason`) as extra props alongside it, the way
   `GameOverlay`'s `failReason` prop does.

7. **Compose the page** (`src/app/(gameplay)/games/<game-slug>/page.tsx`) using, in this order:
   `GameShell` (root layout + theme scope) → `GamesHeader` → `<GameArena />` → `GameFooter` →
   `GameOverlay` (only rendered when no modal is open) → `GameSettingsModal` →
   `GameInstructionsModal`. Pass `themeScope="<game-slug>"` to `GameShell` so the per-game theme
   override in Settings works. Write real, specific instructions text — the existing
   `GameInstructionsModal` bodies are short, concrete bullet lists, not generic copy.

8. **Sound:** add any new effect names to the `SoundEffect` union and `SOUND_PATHS` in
   `src/hooks/useSound.ts`. If you don't have the actual audio file yet, add an entry to
   `SOUND_FALLBACK_MAP` pointing at the closest existing sound rather than leaving it silent —
   that's the established pattern for missing assets, not a hack to avoid.

9. **Theming:** use the existing CSS custom properties in `src/app/globals.css`
   (`--game-panel`, `--game-panel-border`, `--surface`, `--foreground`, `--muted`,
   `--correct`/`--wrong`, `--acid-color`/`--base-color`/`--neutral-color`/`--amphoteric-color`,
   etc.) for both light and dark themes. Don't hardcode hex colors in components except for
   one-off accent classes already used elsewhere (e.g. Tailwind's `amber-500` for a hero panel).
   `--acid-color`/`--base-color`/etc. are explicitly "theme-neutral" — chemistry meaning must
   never change appearance between light/dark, per the comment in `globals.css`.

10. **Register the game with the database.** `game_sessions.game_id` and `game_progress.game_id`
    are foreign keys against `public.games.id` (see
    `supabase/migrations/202607180002_create_games_and_progress.sql`). **`recordGameSession()`
    will fail silently into an error return, not a crash, if you skip this** — add a new
    migration file that inserts your game's row (id, title, description, icon, theme_color,
    display_order) using the same `on conflict (id) do update set ...` idempotent pattern as the
    existing seed insert. Do not edit old migration files — add a new one.

11. **Add the game to the hub:** append an entry (`href`, `title`, `description`, `Icon` from
    `lucide-react`) to the `games` array in `src/app/(main)/games/page.tsx`. Check this array
    first — it may already contain a placeholder entry for your game slug (it currently lists
    `reaction-balancer` and `chemical-bonds`, the latter of which doesn't match the
    `bond-builder` slug used elsewhere — verify slug consistency before trusting this file as a
    source of truth).

12. **Session recording:** call `recordGameSession()` from `src/lib/actions/game-actions.ts` on
    game-over/victory with `gameId`, `score`, `levelReached`, `accuracy` (0–100), `timeSpentSeconds`,
    and `outcome`. This is what powers personal bests, streaks, and the public leaderboard —
    don't skip it just because the UI works without it.

13. **Data-integrity tests (if your game adds new chemistry data):** follow the pattern in
    `src/core-engine/tests/compounds.test.ts` — assert that any denormalized/derived data (e.g.
    hardcoded element counts) actually matches what the underlying ion/element registries say,
    so a future data edit can't silently desync the chemistry.

### Config file convention (copy this shape)

```ts
// src/core-engine/config/games/<game>-config.ts

/*
 ==============================================================================
  USER ACCEPTANCE TESTING (UAT) TUNING GUIDE
 ==============================================================================
 IF PLAYERS SAY: "<complaint>"
    Change `<path.to.field>` (e.g. 7.2 -> 8.5) — <what this does>
 ==============================================================================
*/

const OPTION_1_DEFAULT = { /* ... */ } as const;
const OPTION_2_ALT = { /* ... */ } as const;

// CHANGE THIS ONE EXPORT TO SWITCH PRESETS:
export const <GAME>_CONFIG = OPTION_1_DEFAULT;
```

### Gotchas found while reading this codebase (fix opportunistically, don't silently work around)

- **Test runner is Vitest (+ Playwright for e2e), landing as of 2026-09-13.** The working tree
  gained `vitest.config.mts`, `vitest.setup.ts`, `playwright.config.ts`, `src/test-utils/`, and
  `*.test.ts(x)` files next to components and under `src/core-engine/tests/`, plus the matching
  `package.json` devDependencies — check `git log` to see whether that has been committed yet.
  Write new specs with Vitest's `describe/it/expect` (Jest-compatible) co-located with the code
  (`Foo.test.tsx`) or in `src/core-engine/tests/` for data-integrity checks. Don't add a second
  runner.
- **`npm run build` currently fails on master** because
  `src/core-engine/data/games/neutralise-levels_BACKUP_2307.ts` contains unresolved merge-conflict
  markers (`<<<<<<< HEAD`). The `_BASE_2307` / `_LOCAL_2307` / `_REMOTE_2307` / `_BACKUP_2307`
  files are mergetool leftovers; only `neutralise-levels.ts` is real. Until they are deleted,
  verify your work with `npx tsc --noEmit` filtered to your files and `npm run dev`, not `build`.
- **Duplicate/competing type shapes for reaction data:** `src/core-engine/types/chemistry.ts`
  defines `BalancerReaction`/`ReactionParticipant` for the balancer, `src/core-engine/data/reactions.ts`
  defines its own separate `ChemicalReaction` (different from the one also named
  `ChemicalReaction` in `chemistry.ts`), and `useReactionBalancer.ts` defines yet another local
  `Compound`/`ReactionLevel` pair and doesn't use any of the above. **Grep for existing types
  before adding a new one that "sounds right"** — this repo already has near-duplicates that
  disagree with each other.
- **Stray backup file:** `src/core-engine/data/games/neutralise-levels_BACKUP_2307.ts` — don't
  treat filenames like this as a real convention; it's leftover, not a pattern to copy.
- **`src/app/(main)/games/page.tsx`** contains a large commented-out previous version above the
  live component — don't be misled by it, and clean it up if you're touching that file anyway.
- **No `.env.example`** exists despite Supabase requiring env vars (`lib/supabase/client.ts`,
  `server.ts`, `proxy.ts`). You will need real credentials or a documented local setup to test
  auth-gated flows like `recordGameSession` end-to-end — see `DOCS_NEEDED.md`.

### Definition of done

- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.
- [ ] Game reachable from `/games` hub and playable start-to-finish (win path and lose path) via
      `npm run dev` in an actual browser — type-checking is not a substitute for playing it.
- [ ] Pause, Settings, and Instructions modals all open/close correctly and don't double-pause or
      un-pause a game that was already paused (see `pausedByModalRef` pattern).
- [ ] Light and dark theme both look correct for this game specifically (per-game theme override
      in Settings).
- [ ] Every pedagogical pre-flight check in `GAME_DESIGN_CHECKLIST.md` is answered "yes."
- [ ] A row exists for the game in `public.games` and a full playthrough successfully writes a
      `game_sessions` row and updates `game_progress` (verify in Supabase, not just "no error
      thrown").
