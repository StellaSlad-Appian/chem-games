# Testing guide

Two frameworks, one gate:

| Layer | Tool | Where | Command |
| --- | --- | --- | --- |
| Unit, component and page-flow tests | [Vitest](https://vitest.dev) + React Testing Library (jsdom) | `src/**/*.test.ts(x)` | `npm test` |
| End-to-end tests in a real browser | [Playwright](https://playwright.dev) (Chromium) | `e2e/*.spec.ts` | `npm run e2e` |

`npm run check` runs lint, type-check, unit and end-to-end in sequence. That is the
regression gate: run it before declaring a change done.

## Quick start

```bash
npm test                  # unit + component + page tests, single pass (agents: use this)
npm run test:watch        # same, re-runs on save (humans)
npm run e2e               # Playwright, headless; boots the app itself
npm run e2e:ui            # Playwright UI mode: pick tests, watch them, time-travel (humans)
npm run e2e:headed        # headless off, see the browser
npm run e2e:report        # open the HTML report of the last e2e run
npm run typecheck         # tsc --noEmit (includes the test files)
npm run check             # lint + typecheck + test + e2e
```

Filtering:

```bash
npx vitest run neutralise                      # every unit file whose path contains "neutralise"
npx vitest run src/core-engine                 # only the data-integrity and engine specs
npx playwright test e2e/neutralise.spec.ts     # one e2e file
npx playwright test -g "pause"                 # e2e tests whose title matches
```

Machine-readable output (useful for agents):

```bash
npx vitest run --reporter=json --outputFile=test-results/vitest.json
npx playwright test --reporter=json > test-results/playwright.json
```

In CI (`CI=1`) both runners also write JUnit XML into `test-results/`.

First-time setup on a new machine: `npm install` then `npx playwright install chromium`.

## What runs where

| Layer | Files | What it protects |
| --- | --- | --- |
| Chemistry data integrity | `src/core-engine/tests/compounds-registry.test.ts`, `compounds.test.ts`, `reactions.test.ts`, `game-configs.test.ts` | The answer keys: element counts match formulas, ions are charge-neutral, every balancer equation is balanced and in lowest terms, level pools reference real, non-neutral compounds, configs stay inside sane ranges. |
| Engine logic | `chemical-utils.test.ts`, `collision-utils.test.ts`, `spawn-manager.test.ts`, `level-manager.test.ts` | Classification, health, neutralisation rules, formula parsing, hit detection, lane spawning, wave generation. |
| Hooks and context | `src/hooks/*.test.ts`, `src/context/game-settings-context.test.tsx` | Pause/reset state machine, input detection, persisted settings and themes. |
| Shared components | `src/components/games/shared/*.test.tsx`, `src/components/ui/MoleculeText.test.tsx` | Overlay copy and keyboard handling, header/timer/lives, formula typography. |
| Game arenas | `src/components/games/<game>/GameArena.test.tsx` | Each game's interactive surface in isolation (the Neutralise one drives the real physics loop with fake timers). |
| Game flows | `src/app/(gameplay)/games/<game>/page.test.tsx` | Whole game with a fake clock and a deterministic `Math.random`: scoring, quotas, level-up, game-over, pause, modals, session recording. |
| End-to-end | `e2e/<game>.spec.ts`, `e2e/hub.spec.ts` | The same journeys in a real browser against the running app. No Supabase credentials needed. |

The bugs this suite surfaced when it was first written have been fixed; their regression
tests live in the files above (see "Bugs the suite found" below).

## Adding tests

### Where to put a new test

- Pure logic in `src/core-engine/utils` or data in `src/core-engine/data`: add to
  `src/core-engine/tests/<topic>.test.ts`.
- A hook, context or component: create `Foo.test.tsx` next to `Foo.tsx`.
- A whole game: `src/app/(gameplay)/games/<slug>/page.test.tsx` for the flow,
  `e2e/<slug>.spec.ts` for the browser journey.

### Unit and component tests

- Import from `vitest` explicitly (`describe`, `it`, `expect`, `vi`). Jest-style globals also
  work, which is why the original `compounds.test.ts` runs unchanged.
- Render anything that uses sound, settings or themes through
  `renderWithProviders()` from `src/test-utils/render.tsx`.
- Look compounds up by formula or name with the helpers in `src/test-utils/registry.ts`
  instead of hard-coding registry indices.
- Pages need two mocks, copied verbatim from an existing page test:
  `vi.mock('next/navigation', ...)` for the router and
  `vi.mock('@/lib/actions/game-actions', ...)` for the Supabase server action.
- Make randomness and time deterministic: `vi.spyOn(Math, 'random').mockReturnValue(x)`
  and `vi.useFakeTimers()` + `act(() => vi.advanceTimersByTime(ms))`. Read timings from the
  game's config object rather than typing milliseconds into the test.
- Prefer accessible queries (`getByRole`, `getByLabelText`, `getByTitle`). Where the UI has
  no accessible handle, these `data-testid` hooks exist:

| `data-testid` | Element | Extra attributes |
| --- | --- | --- |
| `molecule-bubble` | Acid classification compound bubble | `data-formula` |
| `blaster-arena`, `blaster-bubble`, `blaster-hint`, `blaster-error` | Formula Blaster arena, floating bubble, hint banner, error tooltip | bubble: `data-formula` |
| `neutralise-arena`, `invader`, `projectile`, `player-cannon` | Neutralise arena and entities | invader: `data-formula`, `data-health`; projectile and cannon: `data-ion` |

  The overlay card is `role="dialog"` named by its title (`Game Paused`, `Level Cleared`,
  `Game Over`, `Research Complete`). Footer buttons are found by title (`Pause Game`,
  `Resume Game`, `How to Play`, `Settings`); note the overlay also has a `Resume Game`
  button, so scope the query with `within(dialog)`.

### End-to-end tests

- Start every test with `openGame(page, slug)` from `e2e/helpers.ts`. It skips Neutralise's
  first-visit instructions unless you pass `{ showNeutraliseIntro: true }`.
- The helpers import the real registries, so a test can compute the right answer
  (`correctVesselFor(formula)`, `ionKeyFor(formula)`, `hitsNeededFor(formula)`).
- Long timers: install `page.clock` before navigating and `page.clock.runFor(ms)` instead of
  waiting (see the timeout and game-over tests).
- Moving targets (Formula Blaster bubbles): a coordinate click can miss an element that is
  still animating, so `clickUntil()` dispatches the click to the element and re-checks.
- `e2e/warm-up.setup.ts` runs first and visits every game route, so `next dev` compiles them
  before any timed test starts. Add new game slugs to `GAME_SLUGS` in `e2e/helpers.ts`.
- The config starts its own `next dev` on port 3210 (`PLAYWRIGHT_PORT` to change it), so it
  never collides with a dev server of this or another project on 3000. If something already
  answers `/games` on that port it is reused. To test a server you are already running (for
  example `npm run dev` on 3000, or a production build started with `npx next start -p 3100`),
  set `PLAYWRIGHT_BASE_URL`. In CI it builds and runs `next start`.

### Pinning a bug you cannot fix right now

Create `src/core-engine/tests/known-issues.test.ts` (it only exists while there are open
issues, because Vitest fails on a test file with no tests) and add an `it.fails(...)` test
with a comment explaining the wrong behaviour. It passes while the bug exists and fails with
"Expected test to fail" the moment someone fixes it, which is the cue to turn it into a
normal test in the proper file. Keep the rest of the suite green by excluding the known-bad
case there, never by loosening the assertion.

## Scenario catalog

### Acid classification (`/games/acid-classification`)

| Scenario | Unit / page test | End-to-end |
| --- | --- | --- |
| Starts at level 1, three lives, score 0, prompt "Acid, Base or Neutral?" | `page.test.tsx` "starts at level 1…" | `acid-classification.spec.ts` "starts with the prompt…" |
| Vessels appear in the order Acid, Neutral, Base and map to the right classification | `GameArena.test.tsx` | (covered by the correct-answer test) |
| Correct answer scores level × 100 and shows the next compound | `page.test.tsx` "awards level × 100…" | "a correct answer scores 100…" |
| Reaching the quota clears the level; "Begin Level 2" continues | "clears the level once the quota is met…" | "reaching the quota clears level 1…" |
| Wrong answer costs a life; third mistake ends the game; Try Again resets | "loses a life per wrong answer…" | "three mistakes end the game…" |
| Clicks are ignored during the feedback animation | "ignores extra clicks…" | (unit only) |
| Hint reveals the compound name | "the hint reveals the compound name" | "the hint reveals the compound name" |
| Pause from the footer, resume from the overlay or Escape | "pauses from the footer…" | "pause and resume from the footer…" |
| Settings opens and pauses; instructions open and close | "opening the settings…", "the instructions modal…" | "instructions and settings modals…" |
| Exit leaves the game | "Exit leaves the game" | — |
| Game over and victory each record one session (score, level, accuracy); level-ups do not | "loses a life per wrong answer…", "records a victory once…" | — (needs Supabase) |
| Every registry compound has a vessel; enough compounds per level for the quota | `game-configs.test.ts`, `compounds-registry.test.ts` | — |

### Formula Blaster (`/games/formula-blaster`)

| Scenario | Unit / page test | End-to-end |
| --- | --- | --- |
| Wave starts with a target, a full timer and an initial burst of bubbles | `page.test.tsx` "starts a wave…" | `formula-blaster.spec.ts` "shows the target…" |
| Countdown ticks once per second; bubbles keep spawning | "the countdown ticks…", "keeps spawning…" | "shows the target…" |
| Popping the target counts a hit and scores level × 100 | "popping the target bubble…" | "popping a target bubble…" |
| Quota met → next target; three targets → level cleared → level 2 | "after the quota the next target starts…" | — (too long for a browser run) |
| Wrong bubble shows a comparative error, no score, tooltip disappears | "a wrong bubble shows…" | "popping a wrong bubble…" |
| Timer runs out → Game Over with timeout message; Try Again restarts | "ends the game when the wave timer runs out…" | "running out of time ends the game" (uses `page.clock`) |
| Game over and victory each record one session with hit accuracy; level-ups do not | "ends the game when the wave timer runs out…", "records a victory once…" | — (needs Supabase) |
| Pause freezes countdown and spawner; resume continues | "pausing freezes…" | "pausing freezes the countdown" |
| Hint lists the target's elements and can be dismissed | "the hint names the elements…" | "the hint describes the elements…" |
| Instructions pause the game and closing resumes it | "opening the instructions…" | — |
| Bubble click payload, wrong-bubble shake, paused animation, expiry | `GameArena.test.tsx` | — |
| Lane cooldown / no stacked spawns | `spawn-manager.test.ts` | — |

### Neutralise (`/games/neutralise`)

| Scenario | Unit / page test | End-to-end |
| --- | --- | --- |
| First visit shows instructions and pauses until "GOT IT"; later visits skip them | `page.test.tsx` "shows the instructions on a first visit…", "skips…" | `neutralise.spec.ts` "first visit shows the instructions…" |
| Header shows wave, cleared count and lives; arena gets the enemy count | "shows the wave…" | "shows wave, lives and an H+ cannon…" |
| Wave advances when every enemy is processed; level-up after wave 3 records a victory | "advances waves…" | — |
| One miss per wave tolerated; second miss ends the game and records a failure; Try Again resets | "tolerates one miss…" | "two invaders reaching the floor end the game…" (uses `page.clock`) |
| After a level-up the next level can still be lost or cleared, and each outcome is recorded | "keeps recording after a level-up…" | — |
| Settings/instructions pause the arena and closing resumes; a manual pause is not undone | "opening the settings…", "closing a modal does not resume…" | — |
| Invaders spawn from the level pool inside the arena | `GameArena.test.tsx` "spawns the requested invaders…" | "shows wave…" (count) |
| Keys 1/2 (and the touch button) switch H+ / OH-; Space (and the Fire button) fires with a cooldown | "loads H+ by default…", "fires with Space…", "the touch controls…" | "…the 1 and 2 keys switch the ion", "Space fires a projectile" |
| Cannon follows arrow keys and the mouse | "moves the cannon…" | (implicit in the hit test) |
| Wrong ion fizzles; right ion neutralises and awards 100 | "a mismatched ion fizzles…", "the matching ion neutralises…" | "neutralising an invader with the matching ion scores 100" |
| Invader reaching the floor costs a hit | "an invader that reaches the floor…" | "two invaders reaching the floor…" |
| Pause freezes invaders and input | "freezes invaders…" | "pausing freezes the invaders…" |
| Hit boxes, health arithmetic, wave generation, level pools | `collision-utils.test.ts`, `level-manager.test.ts`, `game-configs.test.ts` | — |

### Reaction Balancer (`/games/reaction-balancer`)

| Scenario | Unit / page test | End-to-end |
| --- | --- | --- |
| Level 1 shows Water Synthesis with one input per compound | `GameArena.test.tsx`, `page.test.tsx` "starts at level 1…" | `reaction-balancer.spec.ts` "level 1 presents…" |
| Correct coefficients (blank = 1) score 150, record a victory, clear the level; next reaction loads with empty inputs | "balancing the equation scores 150…" | "entering the balanced coefficients…" |
| Unbalanced attempt keeps playing, records nothing | "an unbalanced attempt…" | "an unbalanced attempt does not clear the level" |
| Inputs accept only whole numbers 1–99 | `GameArena.test.tsx` "only accepts whole numbers…" | "coefficient inputs only accept…" |
| Atom balance scaffold toggles and reports "All atoms are balanced" | `GameArena.test.tsx` | "the atom balance scaffold…" |
| Pause and instructions disable the controls | "pausing disables…", "the instructions modal…" | "pausing disables the controls…" |
| Level N loads reaction N and wraps around the list | `GameArena.test.tsx` | — |
| Every equation in `reactions.ts` is balanced, in lowest terms, uses known elements, has a hint | `reactions.test.ts` | — |

### Cross-cutting

| Scenario | Test |
| --- | --- |
| Games hub lists the four games and each page renders header + footer controls | `e2e/hub.spec.ts` |
| Overlay copy, stats, keyboard shortcuts, custom messages | `GameOverlay.test.tsx` |
| Header progress/level/score, hint button, exit fallback | `GamesHeader.test.tsx` |
| Timer formatting and urgency, lives hearts | `GameTimer.test.tsx` |
| Formula typography (subscripts, charges, arrows, states) | `MoleculeText.test.tsx` |
| Settings persistence, volume clamping, per-game theme override | `game-settings-context.test.tsx` |
| Pause/reset state machine | `useGameState.test.ts` |
| Touch vs pointer detection | `useInputMethod.test.ts` |

## Bugs the suite found

All six were found by the first run of this suite and fixed on 2026-09-13. Each has a
regression test now:

1. **`H2CO3`, `H3PO4` and `H2SO3` had inconsistent ionic components** (every proton listed as
   `H+` plus a still-protonated anion). The three acids now reference the carbonate (id 27),
   sulfite (28) and phosphate (29) ions in `ions.ts`. Guarded by the charge-neutrality and
   element-count checks in `compounds-registry.test.ts` and `compounds.test.ts`.
2. **`parseFormulaAtoms` ignored parentheses**, so the balancer's atom-balance scaffold was
   wrong for `Cu(NO3)2` and `Pb(NO3)2`. It now expands bracketed groups; `chemical-utils.test.ts`
   checks every formula in `reactions.ts` against the independent test parser.
3. **Formula Blaster's error tooltip printed "undefined"** because registry elements have no
   `name`. The name is now resolved from `ELEMENTS_REGISTRY`; the test asserts no pair of
   registry compounds ever produces "undefined".
4. **Neutralise waves could not complete from level 5**: the page expected more enemies than
   the level's `maxEnemies` cap allowed the spawner to create. Both now use
   `getEnemiesPerWave()` from `level-manager.ts`; `level-manager.test.ts` proves the spawner can
   always supply what the page waits for.
5. **Neutralise typed amphoteric bases as acids.** Invader type now comes from
   `evaluateChemical`, matching the classifier game; `level-manager.test.ts` checks every level
   pool.
6. **`MoleculeText` rendered `Ca2+` as Ca₂⁺.** A monatomic ion written as symbol + digits +
   sign is now a charge. Convention: `Ca2+`, `NH4+` and `SO4 2-` (space before a charge with
   digits) all render correctly; `MoleculeText.test.tsx` covers each.

Fixed on 2026-09-14, after the suite was in place:

7. **Acid classification and Formula Blaster never saved a session.** Both pages now call
   `recordGameSession` once when a run ends (game over or victory) with score, level,
   accuracy and time; the page tests assert the exact payload for both outcomes and that a
   level-up does not record.
8. **Reaction Balancer sessions were rejected by the database.** `game_sessions.game_id`
   references `public.games`, which only seeded the three original games, so every insert
   failed the foreign key. Migration `20260914_add_reaction_balancer_game.sql` adds the row
   (apply it to your Supabase project).
9. **Neutralise stopped recording, and stopped ending, after the first level-up.** The
   game-over check was skipped whenever the run had already been saved by a level-up. The
   save guard now resets when a new level starts and no longer gates the game-over
   transition; the page test plays level 1, loses on level 2 and checks both records.

Other observations (not fixed):

- In Acid classification, opening Settings pauses the game but closing it does not resume
  (the other games restore the previous state via `pausedByModalRef`).
- Seven balancer reactions are already balanced with every coefficient at 1 (Limestone
  Decomposition, Magnesium in Sulfuric Acid, Hydrochloric Acid Neutralization, Silver Chloride
  Precipitation, Baking Soda and Vinegar, Ammonium Chloride Formation, Carbonic Acid
  Decomposition): clicking "Check Answer" immediately clears them.
- `src/hooks/useReactionBalancer.ts` and `src/core-engine/data/games/neutralise-levels.ts` are
  not imported anywhere.
- `npm run lint` currently reports 21 errors and 7 warnings in existing app code — see
  [Known lint findings](#known-lint-findings) below. The test files are lint-clean, so
  `npm run check` stops at the lint step until those are addressed; run
  `npm run typecheck && npm test && npm run e2e` in the meantime.

## Known lint findings

Inventory as of 2026-09-13 (`eslint-config-next` 16 with the React Compiler `react-hooks`
rules). None of these break the app; they are deferred deliberately. Fix them when you are
already editing the file, not in a sweep — several of the `set-state-in-effect` cases are game
loops where the "fix" is a refactor that needs play-testing, not a mechanical change.

| Rule | Count | Kind | Effort |
|---|---|---|---|
| `react-hooks/set-state-in-effect` | 9 errors | React Compiler: `setState` called synchronously inside `useEffect` (state-sync effects, timers, wave setup) | Per-case refactor; test the game after |
| `@typescript-eslint/no-explicit-any` | 4 errors | Untyped props/params | Trivial (`LucideIcon`, a proper event type) |
| `react-hooks/purity` | 2 errors | `Date.now()`/`Math.random()` during render | Move into `useState` initialiser / `useMemo` / event handler |
| `react/no-unescaped-entities` | 2 errors | `'` in JSX text | Trivial (`&apos;`) |
| `react-hooks/static-components` | 2 errors | Components defined inside render (`LabVesselCard`) | Hoist to module scope |
| `react-hooks/immutability` | 1 error | Mutating `audio.volume` on a pooled element held in a ref (`useSound`) | Deliberate; wrap in an `// eslint-disable-next-line` with a comment, or restructure the pool |
| `prefer-const` | 1 error | | Trivial |
| `@typescript-eslint/no-unused-vars` | 7 warnings | Unused imports, and the unexported alternative config presets (`OPTION_*`) | Presets are intentional: export them or prefix `_`; delete the dead imports |

By file:

- `src/app/(gameplay)/games/acid-classification/page.tsx` — L61, L67 `set-state-in-effect`; L4 unused `useRef`
- `src/app/(gameplay)/games/formula-blaster/page.tsx` — L186, L206 `set-state-in-effect`
- `src/app/(gameplay)/games/neutralise/page.tsx` — L85 `purity`; L97, L260 `set-state-in-effect`
- `src/app/(gameplay)/games/reaction-balancer/page.tsx` — L20 `purity`; L60 `no-explicit-any`
- `src/components/games/reaction-balancer/GameArena.tsx` — L112 `set-state-in-effect`
- `src/components/games/neutralise/GameArena.tsx` — L176 `prefer-const`; L307 `no-explicit-any`
- `src/components/games/acid-classification/ClassificationButton.tsx` — L9 `no-explicit-any` (`icon: any` → `LucideIcon`, which is already imported and flagged unused on L4)
- `src/components/games/acid-classification/GameArena.tsx` — L31 unused `currentLevel`
- `src/components/ui/LabVesselCard.tsx` — L119, L124 `static-components`
- `src/components/social/PublicProfile.tsx` — L157 `no-explicit-any`
- `src/context/game-settings-context.tsx` — L51 `set-state-in-effect` (localStorage hydration; a `useSyncExternalStore` or lazy initialiser is the idiomatic fix)
- `src/hooks/useInputMethod.ts` — L29 `set-state-in-effect` (`matchMedia` sync; same fix as above)
- `src/hooks/useSound.ts` — L103 `immutability`
- `src/app/(main)/profile/page.tsx` L40, `src/app/(main)/profile/edit/page.tsx` L38 — `no-unescaped-entities`
- `src/core-engine/config/games/classifier-games-config.ts` L29, L35 and
  `formula-blaster-config.ts` L36, L56 — unused alternative presets (intentional; see the UAT
  tuning-guide convention in `docs/AGENT_INSTRUCTIONS.md`)

Quick wins if someone has 20 minutes: the 4 `any`s, 2 unescaped quotes, `prefer-const`, the
dead imports, and exporting the `OPTION_*` presets remove 14 of the 28 findings without
touching behaviour. The 9 `set-state-in-effect` and 2 `purity` cases are the ones to leave for
when each game is next worked on.

**CI impact:** the `unit` job in `.github/workflows/test.yml` runs `npm run lint` as a hard
step, so it fails on every push until the errors above reach zero. If a red job is not
acceptable in the meantime, add `continue-on-error: true` to that one step (the typecheck and
unit-test steps still gate), and remove it once lint is clean.

## Continuous integration

`.github/workflows/test.yml` runs on every push and pull request:

- **unit**: `npm ci`, `npm run lint`, `npm run typecheck`, `npm test` (JUnit uploaded).
- **e2e**: installs Chromium, `npm run e2e` against a production build; the HTML report and
  traces are uploaded when something fails.

## Agent workflow

1. Touched `src/core-engine`? Run `npx vitest run src/core-engine`.
2. Touched a game? Run `npx vitest run <slug>` and then `npx playwright test e2e/<slug>.spec.ts`.
3. Before declaring done: `npm run check`.
4. A failing Vitest test prints the assertion diff and the test file location. A failing
   Playwright test writes a trace under `test-results/`; inspect it with
   `npx playwright show-trace test-results/<test-folder>/trace.zip`.
5. If Playwright cannot start the server: something else is listening on port 3210 (set
   `PLAYWRIGHT_PORT`), or the dev server crashed on start (Turbopack occasionally does on
   Windows; just re-run). To bypass the managed server entirely, point the tests at a
   server you started yourself with `PLAYWRIGHT_BASE_URL`.
6. If a `known-issues.test.ts` exists and one of its tests fails with "Expected test to
   fail", you fixed a bug: promote that test to a normal `it` in the right spec file, and
   delete the known-issues file once it is empty.
