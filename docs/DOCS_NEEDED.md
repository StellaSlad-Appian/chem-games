# Documentation Needed for Seamless New-Game Development

What I could reconstruct from the codebase itself is already folded into
[`AGENT_INSTRUCTIONS.md`](./AGENT_INSTRUCTIONS.md) and
[`GAME_DESIGN_CHECKLIST.md`](./GAME_DESIGN_CHECKLIST.md). The items below are things an agent
(or a new human contributor) **cannot** derive from reading the repo — they require a decision
or knowledge that only you have. Roughly ordered by how much a missing answer will stall or
misdirect the work.

## 1. Game Concept Brief (highest priority — build this per new game, not once)

> **Status: drafts exist.** See [`game-briefs/`](./game-briefs/) — one draft per planned topic,
> each with `YOU DECIDE` callouts to resolve before marking it `Approved`.

Without this, an agent will either stall asking clarifying questions or — worse — invent a
plausible-looking mechanic that fails the "intrinsic mechanic" test in the checklist (a
generic shooter/sorter with chemistry skin bolted on). This is the one document that has to
exist *before* any code gets written. Template:

```markdown
## Game Concept Brief: <Game Name>

**Target concept(s):** e.g. covalent bonding & Lewis structures, redox half-reactions, pH/pOH scale
**Target year level / age range:** e.g. Year 10, ages 15-16
**Curriculum reference (if any):** e.g. AQA GCSE Chemistry 4.4, NGSS HS-PS1-2, IB SL Topic 4

**Johnstone's Triplet mapping:**
- Macroscopic: what the player *sees* happen
- Submicroscopic: what particle-level property the player is actually manipulating
- Symbolic: what notation is shown and updates live

**Core loop (one sentence):** the player does X, which chemically means Y, and succeeds when Z.

**Win / lose conditions:**
**Difficulty progression across levels:** what gets harder, and what scaffolding fades
**Known misconceptions to guard against:** (e.g. "electrons don't orbit like planets")
**Relationship to existing games:** does this overlap with Formula Blaster / Acid-Base /
Neutralise / Reaction Balancer / Bond Builder? Should it reuse any of their data or mechanics?
```

Keep a folder of these (e.g. `docs/game-briefs/`) — one per shipped or planned game — so future
agents can see the pattern and so "why does this game work this way" stays answerable after the
person who designed it moves on.

## 2. Curriculum / standards alignment

Which syllabus or standard(s) chem-games is targeting (AQA, OCR, Edexcel, NGSS, IB, a specific
school's own scheme of work, etc.), and which specific topics are still uncovered. Without this,
an agent can't judge whether a proposed game's scope/difficulty/terminology matches what students
actually need, and can't prioritize which game to build next from the README's "Expand the Game
Library" roadmap item.

## 3. Local environment setup / `.env.example`

There's no `.env.example` in the repo, but `src/lib/supabase/{client,server,proxy}.ts` clearly
require Supabase env vars, and `recordGameSession()` needs a real authenticated session to test
end-to-end. An agent needs either:
- A `.env.example` listing required variable names (safe to commit), plus
- Either real (dev-only) Supabase project credentials, or instructions for spinning up the
  `supabase/migrations/` schema against a local/throwaway Supabase project via the Supabase CLI.

Without this, an agent can build the UI but cannot verify session recording, leaderboard writes,
or auth-gated behavior — which the Definition of Done in `AGENT_INSTRUCTIONS.md` requires.

## 4. Visual/brand style reference

> **Status: done** — see [`STYLE_GUIDE.md`](./STYLE_GUIDE.md). Review its §9 "known
> inconsistencies" and decide on the `tailwind.config.ts` question.

`globals.css` has a real but implicit design system (the `--game-*` custom properties, the
`Bebas Neue` + `DM Sans` font pairing, per-chemistry-class colors for acid/base/neutral/
amphoteric). There's no written style guide. A short one — even just "here are the tokens, here's
what a new game's accent color should and shouldn't clash with, here's the icon library
(`lucide-react`) we standardize on" — would stop an agent from inventing a one-off palette or
pulling in a second icon library.

## 5. Accessibility target

> **Status: done** — see [`ACCESSIBILITY.md`](./ACCESSIBILITY.md) (WCAG 2.2 AA, tiered
> MUST/SHOULD/COULD, plus a prioritised list of platform-level gaps to fix).

`GameOverlay.tsx` already implements a real focus trap, `aria-modal`, and keyboard shortcuts —
someone clearly cares about this, but there's no written bar (WCAG 2.1 AA? color-contrast
minimums? motion-reduction support for the shake/pulse animations in `globals.css`?). A one-page
accessibility requirements doc would let an agent know how far to go by default versus needing to
ask.

## 6. UAT / playtesting process

The `formula-blaster-config.ts` UAT-tuning-guide comment block implies a real playtesting loop
exists ("IF PLAYERS SAY X..."), but the process itself isn't documented: who plays it (students?
teachers? both?), how feedback comes back, how a preset gets promoted to the default export. Even
a short paragraph would help an agent write config presets that anticipate the *actual* feedback
categories you've seen before, instead of guessing generic ones.

## 7. Test strategy decision

> **Status: decided — Vitest + Playwright.** As of 2026-09-13 the working tree contains
> `vitest.config.mts`, `vitest.setup.ts`, `playwright.config.ts`, `src/test-utils/` and ~25 spec
> files (uncommitted at time of writing). `package.json` now has `test`, `test:watch`, `e2e`,
> `e2e:ui`, `typecheck` and `check` scripts, and `.github/workflows/test.yml` runs unit and e2e
> on every push. How to run and extend it: `docs/TESTING.md`. Remaining: commit it.

Decide (and document) whether the project standardizes on Jest, Vitest, or Next's built-in test
runner support, so agents stop guessing and don't each install a different one.

## 8. Analytics/telemetry beyond `game_sessions`

`recordGameSession()` covers score/level/outcome/duration. If you want finer-grained learning
analytics later (e.g. which specific misconceptions a student hit, time-to-first-hint, hint usage
rate) that's a schema and event-logging decision that should be made once, centrally, rather than
each new game inventing its own ad hoc tracking.

## 9. Game-library roadmap priority

The README lists Reaction Balancer and Bond Builder as "in development" and gestures at a broader
future library (recognition, classification, balancing, construction, prediction, problem
solving). A short prioritized backlog — even just an ordered list with target dates — prevents an
agent from picking the wrong next game or duplicating in-flight work.

---

**Not needed / already sufficient:** general repo architecture, component conventions, and the
build/lint/dev scripts are all discoverable directly from the code and are already captured in
`AGENT_INSTRUCTIONS.md`. Don't create a separate "how the codebase works" doc — keep that doc as
the single source of truth and update it if the code changes, rather than letting two documents
drift apart.
