# New Game — Pre-Flight & Sign-Off Checklist

Run through this before calling a new chem-games mini-game "done." Section 1 is pedagogical
(from the design research doc); Section 2 is platform-specific, derived from how the existing
games (`formula-blaster`, `acid-classification`, `neutralise`, `reaction-balancer`) are actually
built; Section 3 is the language sign-off — the site ships in every locale in `LOCALES`, so a
game is checked in each of them, not only in English. A game should pass all three sections,
not just compile and run.

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
- [ ] Game page is under `src/app/[lang]/(gameplay)/games/<slug>/page.tsx` and composes `GameShell`,
      `GamesHeader`, `GameFooter`, `GameOverlay`, `GameSettingsModal`, `GameInstructionsModal` —
      no shared UI was reimplemented from scratch.
- [ ] `themeScope` passed to `GameShell` matches the `GameThemeScope` entry, and the game looks
      correct in both light and dark theme.
- [ ] All player-facing copy lives in `src/core-engine/config/games/<game>-messages.ts` with the
      keys from the brief; nothing is hard-coded in JSX. Instructions use the first-visit
      `localStorage` pattern from Neutralise.
- [ ] The catalogue exists in every other locale (`src/i18n/game-messages/<game>/<locale>.ts`,
      `satisfies` the English type), the title and hub description are in every dictionary
      and in `GAME_TITLE_KEYS`, new species are in `chemistry-names/<locale>.ts`, dataset prose
      is overlaid, and the page picks the catalogue for `useI18n().locale`. Every internal link
      goes through `LocaleLink` / `href()`.
- [ ] New sound effects are registered in `useSound.ts`'s `SoundEffect` union and `SOUND_PATHS`
      (or `SOUND_FALLBACK_MAP` if the asset isn't ready yet).
- [ ] All game colors reference the shared CSS custom properties in `globals.css`, not
      palette classes or hex values, unless intentionally introducing a new token — and if so,
      it follows the three-block rule in `docs/STYLE_GUIDE.md` §2 and carries its measured
      contrast in a comment.
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

## 3. Language sign-off (every locale in `LOCALES`)

Do this once per locale, in the browser, after the automated i18n gates are green. Full
guidance, per-language pitfalls and the e2e pattern: [`i18n/GAMES.md`](./i18n/GAMES.md).
Report the answers per locale in the milestone (`BUILD_PLAN.md` § 6).

### Is the text correct in every language version?
- [ ] Typecheck and the i18n tests pass: no missing key, no empty value, no string left
      identical to English (outside the allowlist), no dropped placeholder, no altered formula.
- [ ] Played through in each non-English locale — instructions, guided round, coach strip,
      all hint tiers, every reachable error, level-up, victory, notebook, settings, `aria-label`s
      — and **no English text appeared** and no `{placeholder}` rendered literally.
- [ ] Every chemistry word matches `docs/i18n/glossary-<locale>.md`; one concept has one name
      throughout the game. Register (informal address) and typography (quotes, dash, decimal
      separator, non-breaking spaces) follow the glossary's table.
- [ ] Header, coach strip, cards, buttons and overlays survive the longer text at 375 px and
      200% zoom in the longest locale.

### Is the text understandable?
- [ ] Reading age ~12 *in that language*, one idea per sentence; no calques a native reader
      has to decode; idioms replaced by that language's own, not translated word for word.
- [ ] Read aloud per locale: the instructions, the guided round, three coach messages, the
      three hint tiers of one round, one error. Each says what is off *and* what to try, and
      a student who has never seen the game could act on it.
- [ ] `review-notes.ts` covers the new namespace honestly; every string rated *low* is listed
      in the milestone for a native speaker.

### Are the chemical names correct?
- [ ] Every element, compound and ion name renders through the `chemistry-names` overlay
      (never typed into a message), and the overlay test covers every id in every locale.
- [ ] Names follow that language's naming system and IUPAC spelling conventions, not a
      transliteration of the English (acids, *bi-*/*hydrogen-*, esters, affixes taught as
      affixes). Where the game *teaches* naming, the per-locale rule is designed, not translated.
- [ ] Formulae, symbols, state symbols, charges and equations are byte-identical in every locale.
- [ ] Every coined game word (*loner*, *hopper*, *forge*, …) has a decided glossary term.
- [ ] A chemistry teacher who teaches in that language has checked the names and any naming
      rule — or the milestone says this has not happened yet.

### Does the game name sound right in each culture?
- [ ] The brief's "Languages" table has a title per locale with its kind (translation,
      adaptation, kept English), a reason and one alternative, and the owner has decided.
- [ ] In each locale the title does not read as an instruction, a machine or job, a network
      device, a childish, rude or unfortunate word, or an existing brand or textbook series.
- [ ] A student can still guess the chemistry from the title; it fits the hub card, the phone
      header, the `<title>` and the leaderboard column; it is the same string in the hub, the
      header, the instructions title, the overlays and the leaderboards.
