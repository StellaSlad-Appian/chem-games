# New Game — Pre-Flight & Sign-Off Checklist

Run through this before calling a new chem-games mini-game "done." Section 1 is pedagogical
(from the design research doc); Section 2 is platform-specific, derived from how the existing
games (`formula-blaster`, `acid-classification`, `neutralise`, `reaction-balancer`) are actually
built. A game should pass both sections, not just compile and run.

## 1. Pedagogical sign-off

### Chemical accuracy
- [ ] Every formula, valence, charge, and stoichiometric ratio used by the game is scientifically
      correct — verified against `core-engine/data/`, not re-derived ad hoc in the component.
- [ ] Thermodynamic signs (exothermic/endothermic, ΔH direction) are correct if the game touches them.
- [ ] Any new data reused a shared registry (`elements.ts`, `compounds.ts`, `ions.ts`, `reactions.ts`)
      instead of forking a private copy inside the game.

### Johnstone's Triplet synchronization
- [ ] Identify the core player action. Does it map to a submicroscopic-level change (charge,
      valence, geometry, bonding)?
- [ ] When that action happens, does the macroscopic visual update in the same interaction
      (no extra click needed to "reveal" the result)?
- [ ] Does the symbolic notation (formula/equation) update simultaneously, not on a delay unless
      that delay is itself the pedagogical point?

### Intrinsic mechanic alignment
- [ ] Remove all chemistry-flavored labels and re-read the core loop. Is it still meaningfully
      *this* chemistry concept, or could you relabel it as a generic matching/shooting/sorting
      game with zero rule changes? If the latter, the mechanic is extrinsic — redesign it so the
      chemistry rule is a physics/constraint, not a skin.
- [ ] Stoichiometric ratios, atomic properties, or thermodynamic values actually drive gameplay
      numbers (speed, resource limits, success conditions) — they are not just flavor text next
      to an arbitrary score value.

### Scaffolding
- [ ] The game has a clear "less help / more help" axis across levels (visual hints fade,
      constraints loosen or tighten) rather than every level feeling identical difficulty.
- [ ] Level 1 of the game is genuinely approachable to a student who has just met the concept —
      not a speed-run of the full mechanic on day one.

### Anti-patterns avoided
- [ ] No extrinsic quiz gate blocking otherwise-unrelated gameplay ("answer this to unlock the
      jump").
- [ ] No misleading visual metaphors (rigid solar-system orbits, solid billiard-ball atoms)
      presented as literal/accurate without a scale disclaimer.
- [ ] UI is low-friction: no cutscenes, no menu-diving required to start playing, minimal reading
      before the core loop begins.
- [ ] If a timer or leaderboard is present, failure is low-stakes: instant, blame-free restart;
      no public shaming of low scores; leaderboard participation reads as optional flavor, not
      the primary goal.

### Cognitive friction
- [ ] A student who has never seen the game can understand the controls in under 30 seconds
      without reading the instructions modal (though the modal should still exist and be good).

### Text & support (struggling students)
- [ ] Instructions open automatically on first play, pause the game, and state the goal, the
      controls (keyboard and touch), and the two or three key terms — text taken from the brief.
- [ ] Every wrong or unproductive move produces a message that says *what* is wrong in chemistry
      terms and *what kind of move* fixes it. Read three of them aloud: none is a bare "Wrong!".
- [ ] A hint ladder exists (what to look at → strategy → one concrete step); the first tier is
      free and asking for help never costs lives.
- [ ] The words the game relies on (e.g. coefficient, subscript, cation) are defined in-game
      (glossary or instructions), not assumed.
- [ ] A student who only reads the text panels — never the colours or meters — can still
      finish Level 1.

### Transferability
- [ ] Winning a round in the game corresponds to correctly solving the equivalent standard
      classroom problem (e.g. successfully balancing an equation in-game = the student could
      write that balanced equation on paper).

## 2. Platform / technical sign-off

- [ ] `GameName` (in `src/core-engine/types/general.ts`) and `GameThemeScope` (in
      `src/context/game-settings-context.tsx`) both include the new slug.
- [ ] Config lives in `src/core-engine/config/games/<game>-config.ts`, follows the named-presets +
      UAT-tuning-guide-comment convention, and no tuning numbers are hardcoded elsewhere.
- [ ] Game page is under `src/app/(gameplay)/games/<slug>/page.tsx` and composes `GameShell`,
      `GamesHeader`, `GameFooter`, `GameOverlay`, `GameSettingsModal`, `GameInstructionsModal` —
      no shared UI was reimplemented from scratch.
- [ ] `themeScope` passed to `GameShell` matches the `GameThemeScope` entry, and the game looks
      correct in both light and dark theme.
- [ ] All player-facing copy lives in `src/core-engine/config/games/<game>-messages.ts` with the
      keys from the brief; nothing is hard-coded in JSX. Instructions use the first-visit
      `localStorage` pattern from Neutralise.
- [ ] New sound effects are registered in `useSound.ts`'s `SoundEffect` union and `SOUND_PATHS`
      (or `SOUND_FALLBACK_MAP` if the asset isn't ready yet).
- [ ] All game colors reference the shared CSS custom properties in `globals.css`, not new
      hardcoded hex values, unless intentionally introducing a new themed token (and if so, it's
      added to both the `:root`/`[data-theme='dark']` and `[data-theme='light']` blocks).
- [ ] A Supabase migration inserts the game's row into `public.games` (idempotent
      `on conflict ... do update`, new migration file, not an edit to an old one).
- [ ] The game is listed in `src/app/(main)/games/page.tsx`'s `games` array with a working `href`
      that matches the actual route slug.
- [ ] `recordGameSession()` is called on game-end with correct `outcome`
      (`'victory' | 'failed' | 'abandoned'`), and a real playthrough was verified to create rows in
      `game_sessions` and `game_progress` in Supabase.
- [ ] Pause/Settings/Instructions modal interplay doesn't double-toggle pause state
      (`pausedByModalRef` pattern from `formula-blaster/page.tsx`).
- [ ] `npm run lint` and `npm run build` both pass.
- [ ] Manually played to a win and to a loss in a real browser via `npm run dev`.
