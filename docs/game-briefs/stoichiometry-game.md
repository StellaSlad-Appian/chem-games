# Game Concept Brief: Reaction Factory (Reacting Quantities, Year 9–10)

**Status:** Draft rev 1, 2026-09-16 — scope decided with the pedagogy owner; teacher review
applied (see end); `YOU DECIDE` items marked
**Proposed slug (everywhere):** `reaction-factory` — this file is named `stoichiometry-game.md`
by request; rename to `reaction-factory.md` when approved so the brief matches the slug like the
others
**Concept:** new `reacting-quantities` (Year 10, strand `Stoichiometry`, no parent) — this game
primary. Existing `stoichiometry` (Senior) keeps Mole Foundry as primary and lists this game as
`prerequisite`
**Cheat sheets:** new `relative-formula-mass` (Year 10) as primary; `balancing-equations`;
the Senior `stoichiometry` sheet is linked only from the bonus level
**Target year level:** Year 10 (Levels 1–2 are also suitable for Year 9)
**Curriculum reference:** Victorian Curriculum Science Level 10 — "chemical reactions involve
rearranging atoms to form new substances; during a chemical reaction mass is not created or
destroyed" and "different types of chemical reactions are used to produce a range of products".
Relative formula mass is common Year 10 extension content. **The mole is VCE Unit 2** and
appears here only as a clearly labelled bonus level.
**Relationship to other games:** Reaction Balancer is the prerequisite (equations arrive
already balanced here). Mole Foundry (`stoichiometry.md`, Senior) is the sequel; its Level 1–2
content overlaps this game's bonus level on purpose, so the hand-off is smooth.

## Learning goals

By the end, a Year 10 student can:

1. Read a balanced equation as a recipe — a ratio of particles — and scale it up or down.
2. Say which reactant runs out first (limiting) and what is left over (excess), and predict
   how much product that allows.
3. Work out a relative formula mass from the periodic table (H₂O = 18, CO₂ = 44, CaCO₃ = 100).
4. Show that mass is conserved by adding up relative masses on both sides of an equation, and
   use those masses as a ratio to answer "how many grams?" questions by proportion.
5. (Bonus, labelled as Senior preview) recognise `n = m / M` as the shortcut that turns the
   same proportional reasoning into a formula.

## Mechanics considered

| # | Mechanic | Intrinsic? | Triplet | Year 9–10 fit | Verdict |
|---|---|---|---|---|---|
| A | **Mass detective** — reactions on a balance in open/closed vessels; predict the reading after reaction | Yes, for conservation only | Macro strong | Good for conservation, but no ratios, no Mr, no limiting reagent | Absorbed as a *visual* (the factory balance) rather than a game |
| B | **Recipe scaler** — sandwiches first, then equations; scale a recipe, find what runs out (PhET's approach) | Yes | Sub (particles) + sym | Strong for ratio and limiting reagent; the sandwich analogy is a detour students have usually seen | Core idea kept, analogy dropped |
| C | **Weigh the molecule** — drag element tiles from a periodic table onto a balance to build a formula's relative mass | Yes — mass adds because atoms add | Sub + sym (formula ↔ Ar table) | Exactly the Mr skill; short rounds | **Chosen as the Level 3 sub-mechanic** |
| D | **Mass ledger** — multiply each species' Mr by its coefficient; both sides must total the same; then use the two masses as a ratio for "how many grams" | Yes — conservation of mass *is* the check, and the ratio is the physics | Sym + macro (balance) | The legitimate Year 10 route to mass-to-mass without the mole | **Chosen as Level 4** |
| E | **Reaction Factory** — hoppers of reactant particles feed a machine that runs the reaction in its fixed ratio; product bins fill; when one hopper empties the line stops and the other hopper's leftovers go to a waste bin. Player sets hopper amounts to fill an order with least waste; later, must *predict* the output before pressing Run | Yes — the ratio is the machine, limiting reagent is a hopper physically running dry | Sub (particle bundles) + sym (equation, counts) + macro (bins, balance, waste) | Concrete, no analogy needed; "reactions used to produce products" is the Level 10 framing | **Chosen as the core loop** |
| F | **Pick the right formula / answer** (multiple choice) | No | — | Quiz | Rejected (anti-pattern) |
| G | **Calculation race** against a clock | Adds anxiety to arithmetic | — | The students who need this most would freeze | Rejected (anti-pattern) |

**Why E + C + D:** one setting (the factory) carries every skill without changing the mental
model — particles in hoppers (ratios, limiting reagent), a balance under the line (conservation,
relative mass), and a mass ledger (proportion, then the mole shortcut). Strip the chemistry
and there is no game: the machine's ratio *is* the balanced equation.

## Johnstone's Triplet mapping

| Level | In the game |
|---|---|
| Submicroscopic | Reactant particles as small molecule icons in hoppers; the machine pulls them in **bundles** matching the coefficients (2 H₂ + 1 O₂ → 2 H₂O) and the bundles are drawn as they pass through. Leftovers visibly stay in the hopper / drop into the waste bin |
| Symbolic | The balanced equation sits above the line with a live count under each species ("H₂: 6 loaded · O₂: 3 loaded · H₂O: 6 made"); from Level 3 each species also shows its relative formula mass; Level 4 shows the mass ledger (coefficient × Mr, side totals) |
| Macroscopic | A **balance** under the line: total mass in vs total mass out — always level once the run finishes (waste counted), which is conservation of mass; product bins fill; the observation line from `reactions.ts` (gas, precipitate, colour) plays on Run |

## Core loop

An **order** arrives ("Make 6 water molecules", later "Make 36 g of water", later "You have 10
H₂ and 3 O₂ — how much water can you make?"). The player loads hoppers (▲/▼ or typed count),
watches the live counts and, from Level 2, must **predict** the result *before* pressing Run
(products made, what's left). Run animates the bundles; the bins and balance show the actual
result; the prediction is compared in words. Score = base × level, with a **no-waste bonus** for
exact orders and a **prediction bonus** when the prediction matches. Waste never fails a round;
it just costs the bonus and gets explained.

The arithmetic policy follows the agreed mix: the game computes and shows the numbers at Levels
1–2; the student enters numbers (calculator allowed, ±1% tolerance, 1 decimal place) from
Level 3; Level 5 is the only place the mole appears.

## Support for struggling students (text-first)

1. **Coach panel** under the line (on at Levels 1–2, on request after, pinnable via Support
   mode; Support mode never lowers `accuracy`): "The recipe is 2 H₂ for every 1 O₂. You loaded
   4 H₂ — how many O₂ will pair with them?"
2. **Hint ladder**: tier 1 *what to look at* ("Compare each hopper with the number in front of
   it in the equation"), tier 2 *the strategy* ("Divide what you loaded by the coefficient —
   the smallest answer is the hopper that runs out first"), tier 3 *the number* ("Load 3 O₂."
   / "There are 2 O₂ left."). Tier 1 free; tiers 2–3 remove the prediction bonus.
   `accuracy` = predictions correct without tier 3 ÷ predictions made.
3. **Always-visible ratio strip**: the coefficients rendered as a coloured bundle diagram
   (2 ◯◯ : 1 ◯ → 2 ◯◯) so the ratio is never only a number.
4. **Periodic table drawer** (Level 3+): the Ar values used in the game, rounded the way Year 10
   textbooks round them (H 1, C 12, N 14, O 16, Na 23, Mg 24, Al 27, S 32, Cl 35.5, K 39,
   Ca 40, Fe 56, Cu 63.5) — a student never has to remember one.
5. **Worked example card** on every new skill (Level 3: "H₂O = 2 × 1 + 16 = 18"; Level 4:
   "4 g H₂ → 36 g H₂O, so 8 g → 72 g") that can be reopened from the coach.
6. **Tap-to-explain glossary**: *reactant, product, coefficient, ratio, limiting reagent
   ("runs out first"), excess ("left over"), relative atomic mass (Ar), relative formula mass
   (Mr), conserved*, and — bonus level only — *mole*.
7. **Guided first order** (Level 1, order 1: `2H2 + O2 → 2H2O`, "make 4 water").

## Win / lose conditions

- **Round win:** order fulfilled (exact count, or mass within ±1%) — or, for "how much can you
  make?" rounds, a correct prediction followed by Run.
- **No lives, no timer.** `coachAfterSeconds` (30) opens tier 1; `stuckAfterSeconds` (90)
  offers tier 2. A wrong prediction is shown against the actual result with the reason
  ("O₂ ran out after 3 bundles; 4 H₂ were left") and the round continues — the student
  re-predicts once, then the game moves on with the answer explained.
- **Level pass:** `roundsByLevel` (default `[4, 4, 5, 5, 3]`). **Victory after Level 4.**
  Level 5 (bonus) is offered on the victory overlay as "Senior preview — the mole shortcut" and
  is never required.
- **Session recording:** one `recordGameSession` at victory or exit (`'abandoned'`); the bonus
  level, if played, is a second session so its results don't blend into the Year 10 stats.

## Difficulty progression

| Level | Skill | Orders | Arithmetic | Scaffolding |
|---|---|---|---|---|
| 1 — Scale the recipe | Ratio from coefficients (particles) | "Make 4 water" (guided), "Make 6 NH₃", "Make 4 MgO", "Make 8 HCl": load both hoppers so nothing is wasted | Game computes; counts ≤ 12 | Coach on; ratio strip; bundles animate slowly; waste bin explained the first time it's used |
| 2 — Which runs out? | Limiting reagent & excess (particles) | Hoppers preset unequal ("10 H₂, 3 O₂"): predict product count and leftovers, then Run | Game shows the result; student predicts with a counter widget (≤ 20) | Coach on; tier 2 hint gives the divide-by-coefficient rule |
| 3 — Weigh the molecule | Relative formula mass | Drag element tiles onto the balance to build Mr for each species of the current reaction (H₂O, CO₂, MgO, CaCO₃, NaCl, H₂SO₄); first two rounds the balance shows the total, then the student types Mr | Student calculates from Level 3 round 3 (calculator allowed) | Periodic table drawer; worked example card; the balance shows the running sum until round 3 |
| 4 — The mass ledger | Conservation of mass in numbers; mass-to-mass by proportion | Fill the ledger (coefficient × Mr each side) and confirm totals match; then orders in grams: "Make 36 g of water", "You have 8 g of H₂ — how much water?", "24 g of Mg burns — how much MgO?" | Student calculates; ±1% tolerance | Ledger pre-fills Mr from Level 3; ratio strip now shows masses ("4 : 32 → 36"); worked example card |
| 5 — Bonus: the mole shortcut (Senior preview) | `n = m / M`; mass-to-mass via moles; limiting reagent in moles | Same factory, same orders as Level 4, now solved the VCE way; the coach shows the proportion method and the mole method side by side and says they give the same answer | Student calculates | Clearly badged "Senior preview"; links to the `stoichiometry` cheat sheet and Mole Foundry |

Reactions used (all in `reactions.ts` already or trivially added, all with whole-number
textbook Ar values): `2H2 + O2 → 2H2O`, `N2 + 3H2 → 2NH3`, `2Mg + O2 → 2MgO`, `H2 + Cl2 → 2HCl`,
`CH4 + 2O2 → CO2 + 2H2O`, `CaCO3 → CaO + CO2`, `2Na + Cl2 → 2NaCl`, `Fe + S → FeS`,
`Mg + 2HCl → MgCl2 + H2`, `2H2O2 → 2H2O + O2`.

> **YOU DECIDE:** does your Year 10 course teach relative formula mass? If not, Levels 3–4
> become the bonus tier alongside the mole, and victory comes after Level 2.

Config: `src/core-engine/config/games/reaction-factory-config.ts` — `levels.roundsByLevel`,
`levels.maxLevel` (4), `levels.bonusLevel` (5), `mechanics.pointsPerLevelMultiplier`,
`mechanics.noWasteBonus`, `mechanics.predictionBonus`, `mechanics.massTolerancePercent` (1),
`mechanics.maxHopperCount` (20), `mechanics.coachAfterSeconds`, `mechanics.stuckAfterSeconds`,
`mechanics.studentCalculatesFromLevel` (3), `visuals.bundleAnimationMs`, named presets + UAT
tuning guide.

## Instructions (auto-open on first play, paused; `hasSeenReactionFactoryInstructions`)

**Title:** How to Play: Reaction Factory

> **Run the reaction like a recipe.** The balanced equation tells the machine how many of each
> reactant go into one batch — 2 H₂ and 1 O₂ make 2 H₂O, every time.
>
> - Load the **hoppers** with ▲ / ▼ (or type a number). The counts under the equation update
>   as you go.
> - Press **Run**. The machine takes reactants in batches until one hopper is empty. Whatever
>   is left goes to the **waste bin** — no mass disappears, it just isn't product.
> - From Level 2, **predict first**: how much product, and what's left? Then Run and compare.
> - The **balance** under the line always ends level: mass in = mass out. That's conservation
>   of mass.
> - Stuck? Press the **lightbulb** (or `H`). The first hint is always free.
>
> *Keyboard & mouse:* `Tab` moves between hoppers · `↑` / `↓` change a count · type a number ·
> `Enter` = Run · `H` hint · `P` pause.
> *Touchscreen:* tap ▲ / ▼, or tap the number to type. Tap **Run**.

## Guided first order (Level 1, order 1 — `2H2 + O2 → 2H2O`, "Make 4 water")

1. "Look at the recipe: 2 H₂ and 1 O₂ make 2 H₂O. One batch makes 2 water. You need 4 —
   that's 2 batches." *(waits)*
2. "Two batches need 2 × 2 = 4 H₂. Load 4 H₂." *(waits for H₂ = 4)*
3. "Two batches need 2 × 1 = 2 O₂. Load 2 O₂." *(waits for O₂ = 2)*
4. "Press Run." *(runs)* "4 water made, nothing left over, and the balance is level: 4 H₂ and
   2 O₂ weigh exactly as much as 4 H₂O. Mass is conserved."

## Message catalogue (`src/core-engine/config/games/reaction-factory-messages.ts`)

| Key | When | Text |
|---|---|---|
| `coach.ratio` | hoppers loaded off-ratio | "The recipe is {a} {R1} for every {b} {R2}. You have {x} {R1} — how many {R2} pair with them?" |
| `coach.limiting` | after Run with leftovers | "{Limiting} ran out after {batches} batches. {Excess} had {left} left over — that's the *excess*." |
| `coach.noWaste` | exact run | "Every particle was used. The recipe was followed exactly." |
| `coach.conserved` | every Run | "Balance level: {massIn} in, {massOut} out (including waste). Mass is conserved." |
| `coach.sumMr` | Level 3 | "Add the atoms: {breakdown} = {Mr}. That's the relative formula mass of {formula}." |
| `coach.proportion` | Level 4 | "{massA} g of {A} makes {massB} g of {B}. You have {given} g — that's {factor} times as much, so you'll make {factor} × {massB} g." |
| `coach.moleShortcut` | Level 5 | "Same answer, different route: n = m ÷ M turns grams into batches (moles), the ratio scales them, and m = n × M turns them back." |
| `hint.tier1` | | "Compare each hopper with the number in front of it in the equation." |
| `hint.tier2` | | "Divide what you loaded by its coefficient. The smallest answer is the hopper that runs out first." (per-level variants for Mr: "One atom at a time: how many of each, times its Ar") |
| `hint.tier3` | | "Load {n} {formula}." / "{Excess} will have {left} left." / "{formula} = {Mr}." |
| `predict.wrong` | prediction ≠ result | "You predicted {predicted}; the machine made {actual}. {Reason}. Try one more prediction, or Run to see it." |
| `error.overMax` | count > `maxHopperCount` | "Hoppers hold up to {max}. Big orders are done in batches — try the ratio first." |
| `error.massTolerance` | typed mass off by > 1% | "Close, but not within 1%. Check the ratio: {massA} : {massB}." |
| `error.unitsMissing` | Level 4 blank | "Enter the mass in grams." |
| `success.round` | | "Order filled: {order}." |
| `overlay.levelUp` | `customMessages.levelUp` | badge "Order complete" · title "Level cleared" · subtitle "{skill}" · description "Level {n}: {what changes}." |
| `overlay.victory` | | badge "All objectives complete" · title "Factory manager" · description "Try the Senior preview (the mole shortcut), or open your production log." |
| `overlay.bonusIntro` | entering Level 5 | badge "Senior preview" · title "The mole shortcut" · description "This is VCE Unit 2 content. Everything you did in Level 4 still works — this is just faster." |
| `notebook.header` | end summary | "Your production log" (each order: equation, amounts loaded, product, waste, masses, hint tier) |

Glossary: **reactant / product** · **coefficient** "the big number: how many of that substance go into one batch" · **ratio** "the recipe — how many of each, compared" · **limiting reagent** "the reactant that runs out first; it decides how much product you get" · **excess** "what's left over when the other reactant has run out" · **relative atomic mass (Ar)** "how heavy one atom is compared with others — read it from the periodic table" · **relative formula mass (Mr)** "add up the Ar of every atom in the formula" · **conserved** "kept the same — mass in equals mass out" · *(Level 5 only)* **mole** "a counting unit for particles, like a dozen but 6.02 × 10²³; M is the mass of one mole in grams".

## Known misconceptions to guard against

- **Coefficients are masses** ("2 g of H₂ reacts with 1 g of O₂") — Levels 1–2 are particles
  only; Level 4's ratio strip shows the *mass* ratio (4 : 32) next to the *particle* ratio
  (2 : 1) so the difference is explicit.
- **The reactant with less mass is limiting** — Level 4 includes an order where the smaller
  mass is *not* limiting (e.g. 4 g H₂ with 16 g O₂: O₂ limits).
- **Mass "disappears" when a gas forms** — the balance counts the gas bin; the observation line
  names it.
- **Excess reactant is "wasted" energy/wrong** — the coach calls it excess and explains why
  industry often uses excess of the cheaper reactant (Level 4 flavour text).
- **Mr is the mass of one molecule in grams** — the glossary says "relative"; grams appear only
  when scaled by an order.
- **The mole is a mass** — bonus level glossary and coach define it as a count.

## Platform reuse

- `reactions.ts` (equations, `hint`, `description`), `compounds.ts` `molarMass`, `elements.ts`
  `mass` — but Year 10 rounding lives in one place: `core-engine/constants/year10-ar.ts`
  (the table above) so Mr in this game equals what students see in class. Unit-test that
  every reaction's ledger balances with those values (`2 × 2 + 32 = 2 × 18`).
- New data: `src/core-engine/data/games/factory-orders.ts` — per level: reaction id, order
  type (`count` | `predict` | `mr` | `mass` | `mole`), quantities, `sameAs` link for the
  Level 5 mirror of a Level 4 order.
- Pure functions, tested: `batchesPossible(loaded, coefficients)`, `runFactory()` (products,
  leftovers), `relativeFormulaMass(formula)` (brackets handled — reuse the parser fixed for
  Reaction Balancer), `massLedger(reaction)`, `massToMass(given, reaction, from, to)`.
- Shared support components from the Reaction Balancer brief: `CoachPanel`, `GlossaryTerm`,
  Support mode. New shared candidates: `PeriodicDrawer` (Ar lookup; Mole Foundry reuses it),
  `MassBalance` (the beam; Reaction Balancer's is the same component).
- Shared UI: `GameShell` (`themeScope="reaction-factory"`), `GamesHeader`
  (`progressText="Order 2/4"`, `customTaskDescription="Make 6 NH3"`), `GameOverlay`
  `customMessages`, `GameFooter`, both modals. Sounds: `machine-run` → fallback
  `lock-element`, `order-complete` → `success-synthesis`, `hopper-tick` → `click`.
- Registrations: `GameName`, `GameThemeScope`, hub array, `public.games` row
  (`'reaction-factory'`, inactive until done), concept `reacting-quantities` +
  `concept_games` (primary) + `stoichiometry → reaction-factory (prerequisite)`, new cheat
  sheet `relative-formula-mass`, `GAME_LINKS` + `relatedGames`.

## Accessibility (from `ACCESSIBILITY.md`)

- Hoppers are `<button>` ▲/▼ pairs plus a numeric `<input>`; Run is a button; keyboard map in
  the instructions.
- Counts, batches, leftovers and masses are always text; the ratio strip's bundle diagram has
  a text equivalent; the balance has a readout.
- Bundle animation respects `prefers-reduced-motion` (bins fill instantly with a fade).
- Coach, hints and predictions in an `aria-live="polite"` region; Run result assertive.
- No timer. Typed answers accept `,` or `.` as decimal separator; tolerance ±1%.

## Definition of done (beyond the generic checklist)

- [ ] `npx vitest run reaction-factory` green: every order is achievable; every ledger balances
      with the Year 10 Ar table; limiting reagent chosen correctly for every Level 2/4 order,
      including the "smaller mass is not limiting" case; `relativeFormulaMass` handles brackets.
- [ ] Every message key exists in `reaction-factory-messages.ts`; instructions auto-open on
      first play; guided order runs once; Support mode persists; the bonus level is badged and
      skippable.
- [ ] A Year 10 teacher has checked the Ar table and the ten reactions against the course.
- [ ] Concept `reacting-quantities` and cheat sheet `relative-formula-mass` seeded;
      `games.is_active = true` in a new migration; one `game_sessions` row per full run and a
      separate one for the bonus level.

## Teacher review of this design (applied)

- **The mole is not Year 10.** The brief keeps it out of Levels 1–4 entirely and badges Level 5
  as a Senior preview with its own overlay, so no student thinks they've failed Year 10 content
  by skipping it. Mass-to-mass in Level 4 is done by *proportion*, which is legitimately
  Year 10 (conservation of mass + ratio).
- **Ratios must come before grams.** Levels 1–2 are particle counts only; the word "gram"
  first appears at Level 4, after Mr, so "coefficient = mass" never gets a foothold.
- **Use the numbers students see in class.** A single Year 10 Ar table (whole numbers, Cl 35.5,
  Cu 63.5) rather than `elements.ts` precision — otherwise H₂O = 18.015 and every worksheet
  answer "disagrees" with the game.
- **Predict-then-run is the learning moment.** Watching the machine is engaging but passive;
  committing to a prediction first is what makes limiting reagent stick. Wrong predictions are
  explained and re-tried, never punished.
- **Arithmetic load managed.** Game computes at Levels 1–2, counter widgets (no typing) for
  Level 2 predictions, calculator allowed from Level 3, ±1% tolerance, no significant-figure
  policing at Year 10.
- **Dropped the sandwich analogy.** Year 10 students have usually seen it; the factory is
  already concrete and stays chemistry from the first second.
- **Still to confirm with you:** whether relative formula mass is taught in your Year 10 course
  (see `YOU DECIDE`), and whether `H2SO4` (Level 3) is too early for your class — swap for
  `NaCl`/`MgCl2` if so.
