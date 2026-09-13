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

Known bugs are pinned in `src/core-engine/tests/known-issues.test.ts` (see below).

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
- Moving targets (Formula Blaster bubbles): click with `{ force: true }` and re-check, as in
  `clickUntil()`.
- The config reuses a dev server already listening on port 3000 if `/games` answers, and
  starts `npm run dev` otherwise. Set `PLAYWRIGHT_BASE_URL` to test another server (for
  example a production build started with `npx next start -p 3100`). In CI it builds and
  runs `next start`.

### Pinning a bug you cannot fix right now

Add an `it.fails(...)` test to `src/core-engine/tests/known-issues.test.ts` with a comment
explaining the wrong behaviour. It passes while the bug exists and fails with
"Expected test to fail" the moment someone fixes it, which is the cue to turn it into a
normal test in the proper file.

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

## Known issues

Found while writing these tests; each is pinned with `it.fails` in
`src/core-engine/tests/known-issues.test.ts`:

1. **Three compounds have inconsistent ionic components.** `H2CO3`, `H3PO4` and `H2SO3` list
   every proton as `H+` but pair it with an anion that still carries hydrogen
   (`HCO3-`, `H2PO4-`, `HSO3-`), so the ions add up to extra hydrogen and a positive net
   charge. Fix: add `CO3 2-`, `PO4 3-` and `SO3 2-` to `ions.ts` and reference them. Until
   then those three are excluded from the two data-integrity checks via
   `KNOWN_INCONSISTENT_IONIC_FORMULAS` in `src/core-engine/tests/helpers/formula.ts`.
2. **`parseFormulaAtoms` ignores parentheses.** `Ba(OH)2` parses as one O and one H. The
   balancer's "Show Atom Balance" scaffold is therefore wrong for the reactions with
   `Cu(NO3)2` and `Pb(NO3)2` (answers are still checked by coefficient, so the level is
   winnable).
3. **Formula Blaster error tooltip prints "undefined".** `generateComparativeError` uses
   `element.name`, but registry elements only carry `symbol`. Players see
   "Look for undefined (K) atoms instead."
4. **Neutralise waves cannot complete from level 5.** The page waits for
   `baseEnemiesPerWave + (level − 1) × scaling` enemies, but `getLevelSpawns` caps the wave
   at `NEUTRALISE_LEVEL_DATA[level].maxEnemies` (5), so from level 5 the wave never ends.
5. **Neutralise types amphoteric compounds as acids.** `level-manager` marks an invader as an
   acid whenever `pKa` is defined, so `NaHCO3`, `Na2HPO4` and `NaHS` (bases per
   `evaluateChemical`, and taught as such in the classifier) must be shot with OH⁻.
6. **`MoleculeText` renders `Ca2+` as Ca₂⁺.** Digits after a symbol are taken as a subscript
   before the charge is considered. Only single-character charges (`H+`, `OH-`) render
   correctly; the games currently only use those.

Other observations (not pinned as tests):

- Acid classification and Formula Blaster never call `recordGameSession`, so their scores
  are not saved; Neutralise and Reaction Balancer do.
- In Acid classification, opening Settings pauses the game but closing it does not resume
  (the other games restore the previous state via `pausedByModalRef`).
- Seven balancer reactions are already balanced with every coefficient at 1 (Limestone
  Decomposition, Magnesium in Sulfuric Acid, Hydrochloric Acid Neutralization, Silver Chloride
  Precipitation, Baking Soda and Vinegar, Ammonium Chloride Formation, Carbonic Acid
  Decomposition): clicking "Check Answer" immediately clears them.
- `src/hooks/useReactionBalancer.ts` and `src/core-engine/data/games/neutralise-levels.ts` are
  not imported anywhere.
- `src/core-engine/data/games/neutralise-levels_{BASE,LOCAL,REMOTE,BACKUP}_2307.ts` and
  `neutralise-levels.ts.master-backup` are mergetool leftovers; the `_BACKUP_` file still
  contains conflict markers and breaks `tsc`/`next build`, so they are excluded in
  `tsconfig.json` and `eslint.config.mjs`. Deleting them is the real fix.
- `npm run lint` currently reports 21 errors in existing app code (React Compiler rules such
  as `react-hooks/set-state-in-effect`, a few `any`s, unescaped quotes). The new test files
  are lint-clean.

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
5. If Playwright cannot start the server: a dev server already running on port 3000 is only
   reused when `http://localhost:3000/games` answers. A crashed one has to be stopped, or
   point the tests elsewhere with `PLAYWRIGHT_BASE_URL`.
6. A test in `known-issues.test.ts` failing with "Expected test to fail" means you fixed a
   bug: promote that test to a normal `it` in the right spec file.
