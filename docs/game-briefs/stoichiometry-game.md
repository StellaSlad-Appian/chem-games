# Game Concept Brief: Reaction Factory (Reacting Quantities, Year 9–10)

**Status:** Draft rev 2, 2026-09-16 — scope decided with the pedagogy owner; expanded from 4 to
8 proper levels after review (one new idea per level; relative formula mass taught from scratch,
not assumed); the mole is Level 9, a badged bonus. No `YOU DECIDE` items remain.
**Proposed slug (everywhere):** `reaction-factory` — this file is named `stoichiometry-game.md`
by request; rename to `reaction-factory.md` on approval so the brief matches the slug like the
others
**Concept:** new `reacting-quantities` (Year 10, strand `Stoichiometry`, no parent) — this game
primary. Existing `stoichiometry` (Senior) keeps Mole Foundry as primary and lists this game as
`prerequisite`
**Cheat sheets:** new `relative-formula-mass` (Year 10) as primary; `balancing-equations`;
the Senior `stoichiometry` sheet is linked only from Level 9
**Target year level:** Year 10 (Levels 1–3 are also suitable for Year 9)

## What Victorian students actually meet, and what this game therefore teaches

| Content | Where it sits | In this game |
|---|---|---|
| Atoms are rearranged in reactions; mass is not created or destroyed | Victorian Curriculum Science **Level 9** (chemical sciences) | Levels 1–3 and the balance under the factory line |
| Periodic table organises elements; different reaction types produce products | **Level 10** | Setting of the whole game; Ar is read from the periodic table drawer |
| Balanced equations as a ratio of particles | Level 9–10 (with Reaction Balancer as the prerequisite game) | Levels 1–2 |
| Relative atomic mass (Ar) and relative formula mass (Mr) | **Not mandated in F–10**; taught in most Year 10 courses as pre-VCE extension; formally VCE Unit 1 | **Taught from scratch** in Levels 3–5 — the game never assumes a student has met Ar |
| Mass-to-mass by proportion (no mole) | Year 10 extension in many schools | Levels 6–8 |
| The mole, `n = m / M` | **VCE Unit 2** | Level 9 only, badged "Senior preview", never required |

(Confirm the exact content descriptions against the current VCAA Victorian Curriculum 2.0
Science document for Levels 9–10 before the game is built; the placement above follows the
long-standing 1.0 descriptions and common Year 10 practice.)

## Learning goals

By the end, a Year 10 student can:

1. Read a balanced equation as a recipe — a ratio of particles — and scale it up or down.
2. Say which reactant runs out first (limiting) and what is left over (excess), and predict
   how much product that allows.
3. Explain what a relative atomic mass is (how heavy one atom is compared with others), read
   it from the periodic table, and add atoms to get a relative formula mass — including
   subscripts and brackets (H₂O = 18, CaCO₃ = 100, Mg(OH)₂ = 58).
4. Show that mass is conserved by adding up relative masses on both sides of an equation.
5. Use the masses in a balanced equation as a ratio to answer "how many grams?" questions by
   proportion, including which reactant is limiting when amounts are given in grams.
6. (Level 9, labelled as Senior preview) recognise `n = m / M` as the shortcut that turns the
   same proportional reasoning into a formula.

## Mechanics considered

| # | Mechanic | Intrinsic? | Triplet | Year 9–10 fit | Verdict |
|---|---|---|---|---|---|
| A | **Mass detective** — reactions on a balance in open/closed vessels; predict the reading after reaction | Yes, for conservation only | Macro strong | Good for conservation, but no ratios, no Mr, no limiting reagent | Absorbed as a *visual* (the factory balance) rather than a game |
| B | **Recipe scaler** — sandwiches first, then equations; scale a recipe, find what runs out (PhET's approach) | Yes | Sub (particles) + sym | Strong for ratio and limiting reagent; the sandwich analogy is a detour students have usually seen | Core idea kept, analogy dropped |
| C | **Weigh the atom / weigh the molecule** — put atoms on a two-pan balance to *discover* relative mass (16 H atoms balance 1 O), then drag element tiles onto a balance to build a formula's relative mass | Yes — mass adds because atoms add; "relative" is literally two pans | Sub + sym (formula ↔ Ar table) + macro (balance) | Teaches Ar and Mr from nothing; short rounds | **Chosen for Levels 3–5** |
| D | **Mass ledger** — multiply each species' Mr by its coefficient; both sides must total the same; then use the two masses as a ratio for "how many grams" | Yes — conservation of mass *is* the check, and the ratio is the physics | Sym + macro (balance) | The legitimate Year 10 route to mass-to-mass without the mole | **Chosen for Levels 6–8** |
| E | **Reaction Factory** — hoppers of reactant particles feed a machine that runs the reaction in its fixed ratio; product bins fill; when one hopper empties the line stops and the other hopper's leftovers go to a waste bin. Player sets hopper amounts to fill an order with least waste; later, must *predict* the output before pressing Run | Yes — the ratio is the machine, limiting reagent is a hopper physically running dry | Sub (particle bundles) + sym (equation, counts) + macro (bins, balance, waste) | Concrete, no analogy needed; "reactions used to produce products" is the Level 10 framing | **Chosen as the core loop** |
| F | **Pick the right formula / answer** (multiple choice) | No | — | Quiz | Rejected (anti-pattern) |
| G | **Calculation race** against a clock | Adds anxiety to arithmetic | — | The students who need this most would freeze | Rejected (anti-pattern) |

**Why E + C + D:** one setting (the factory) carries every skill without changing the mental
model — particles in hoppers (ratios, limiting reagent), a two-pan balance beside the line
(relative mass, conservation), and a mass ledger (proportion, then the mole shortcut). Strip
the chemistry and there is no game: the machine's ratio *is* the balanced equation, and the
balance *is* relative mass.

## Johnstone's Triplet mapping

| Level | In the game |
|---|---|
| Submicroscopic | Reactant particles as small molecule icons in hoppers; the machine pulls them in **bundles** matching the coefficients (2 H₂ + 1 O₂ → 2 H₂O) and the bundles are drawn as they pass through. Leftovers visibly stay in the hopper / drop into the waste bin. In Levels 3–5 single atoms sit on the pans of a balance |
| Symbolic | The balanced equation above the line with a live count under each species ("H₂: 6 loaded · O₂: 3 loaded · H₂O: 6 made"); from Level 4 each species shows its Mr and the breakdown that made it (`2 × 1 + 16`); from Level 6 the mass ledger (coefficient × Mr, side totals) |
| Macroscopic | A **balance** under the line: total mass in vs total mass out — always level once the run finishes (waste counted), which is conservation of mass; product bins fill; the observation line from `reactions.ts` (gas, precipitate, colour) plays on Run |

## Core loop

An **order** arrives ("Make 6 water molecules", later "Weigh CO₂", later "Make 36 g of water",
later "You have 8 g of H₂ and 8 g of O₂ — how much water can you make?"). The player loads
hoppers (▲/▼ or typed count) or builds a mass on the balance, watches the live counts and, from
Level 2, must **predict** the result *before* pressing Run. Run animates the bundles; the bins
and balance show the actual result; the prediction is compared in words. Score = base × level,
with a **no-waste bonus** for exact orders and a **prediction bonus** when the prediction matches.
Waste never fails a round; it just costs the bonus and gets explained.

Arithmetic policy (as agreed): the game computes and shows the numbers at Levels 1–3; the
student enters numbers (calculator allowed, ±1% tolerance, 1 decimal place) from Level 4; the
mole appears only at Level 9.

## Support for struggling students (text-first)

1. **Coach panel** under the line (on at Levels 1–5, on request after, pinnable via Support
   mode; Support mode never lowers `accuracy`): "The recipe is 2 H₂ for every 1 O₂. You loaded
   4 H₂ — how many O₂ will pair with them?"
2. **Hint ladder**: tier 1 *what to look at*, tier 2 *the strategy*, tier 3 *the number*.
   Tier 1 free; tiers 2–3 remove the prediction bonus. `accuracy` = predictions/answers
   correct without tier 3 ÷ attempts.
3. **Always-visible ratio strip**: the coefficients as a coloured bundle diagram
   (2 ◯◯ : 1 ◯ → 2 ◯◯); from Level 6 a second row shows the mass ratio ("4 : 32 → 36").
4. **Periodic table drawer** (Level 3+): the Ar values used in the game, rounded the way Year 10
   textbooks round them — H 1, C 12, N 14, O 16, Na 23, Mg 24, Al 27, S 32, Cl 35.5, K 39,
   Ca 40, Fe 56, Cu 63.5. Tapping an element also shows "1 atom of {X} weighs the same as
   {Ar} hydrogen atoms." A student never has to remember a value.
5. **Worked example card** on every new skill, reopenable from the coach.
6. **Tap-to-explain glossary** (below).
7. **Guided first round** at Levels 1, 3 and 4 (the three places a genuinely new idea starts).

## Win / lose conditions

- **Round win:** order fulfilled (exact count, correct Mr, or mass within ±1%) — or, for
  "how much can you make?" rounds, a correct prediction followed by Run.
- **No lives, no timer.** `coachAfterSeconds` (30) opens tier 1; `stuckAfterSeconds` (90)
  offers tier 2. A wrong prediction is shown against the actual result with the reason and
  the student re-predicts once; then the game moves on with the answer explained.
- **Level pass:** `roundsByLevel` (default `[4, 4, 3, 4, 5, 4, 5, 4, 3]`).
  **Victory after Level 8.** Level 9 is offered on the victory overlay as "Senior preview —
  the mole shortcut" and is never required.
- **Session recording:** one `recordGameSession` at victory or exit (`'abandoned'`); Level 9,
  if played, is a second session so its results don't blend into the Year 10 stats.

## Difficulty progression — one new idea per level

| Level | New idea | Orders | Arithmetic | Scaffolding |
|---|---|---|---|---|
| 1 — Read the recipe | Coefficients are a ratio of particles | "Make 4 water" (guided), "Make 6 NH₃", "Make 4 MgO", "Make 8 HCl": load both hoppers so nothing is wasted | Game computes; counts ≤ 12 | Coach on; ratio strip; bundles animate slowly; waste bin explained the first time it is used |
| 2 — Which runs out? | Limiting reagent and excess | Hoppers preset unequal ("10 H₂, 3 O₂"): predict product count and leftovers, then Run | Game shows the result; student predicts with a counter widget (≤ 20) | Coach on; tier 2 hint gives the divide-by-coefficient rule |
| 3 — Weigh the atom | **What relative atomic mass is** | A two-pan balance: "How many hydrogen atoms balance one carbon atom?" (drag H atoms on until level: 12). Then oxygen (16), then "one oxygen vs how many carbons?" (can't — 16 ≠ 12·n; the game shows 4 C vs 3 O balance instead). Ends by opening the periodic-table drawer: "those numbers are already written down for you" | Game computes; the balance tips | Guided first round; coach explains *relative*: "compared with hydrogen, the lightest atom" |
| 4 — Weigh the molecule | Mr = add up the atoms | Build Mr by dragging element tiles onto the balance for simple formulas with no subscripts beyond 2: H₂ (2), O₂ (32), H₂O (18), CO (28), NH₃ (17), CH₄ (16) | Rounds 1–2 the balance shows the running sum; from round 3 the student types Mr (calculator allowed) | Guided first round (H₂O: "2 hydrogens = 2, one oxygen = 16, total 18"); worked example card; drawer open |
| 5 — Subscripts and brackets | A subscript multiplies its atom; a bracket multiplies the whole group | CO₂ (44), NaCl (58.5), MgO (40), CaCO₃ (100), H₂SO₄ (98), Mg(OH)₂ (58), Ca(NO₃)₂ (164) | Student types Mr | Tiles snap into groups so `(OH)₂` is visibly two OH units; coach line on the first bracket; worked example card |
| 6 — The mass ledger | Conservation of mass in numbers | For each reaction, fill coefficient × Mr on both sides and confirm the totals match (`2×2 + 32 = 2×18`); then Run the factory and watch the balance agree | Student fills the ledger (Mr pre-filled from Levels 4–5 once earned) | Ledger highlights the row being filled; the balance readout matches the ledger total |
| 7 — Mass by proportion | Masses in a balanced equation are a ratio you can scale | "Make 36 g of water", "You have 8 g of H₂ — how much water?", "24 g of Mg burns — how much MgO?", "How much CO₂ from 50 g of CaCO₃?" | Student calculates; ±1% | Ratio strip shows the mass row; worked example card ("4 g → 36 g, so 8 g → 72 g"); coach names the scale factor |
| 8 — Limiting reagent in grams | Combine Levels 2 and 7: the smaller *mass* is not always limiting | "8 g of H₂ and 16 g of O₂: which runs out, and how much water?" (O₂ limits, 18 g), "12 g of Mg and 12 g of O₂ → MgO", "10 g H₂ + 10 g Cl₂" | Student calculates and predicts; then Run in *grams mode* (hoppers show mass) to confirm | Coach: "Turn each mass into batches using the ledger row, then compare" |
| 9 — Bonus: the mole shortcut (Senior preview) | `n = m / M` | The same orders as Levels 7–8, solved the VCE way; the coach shows the proportion method and the mole method side by side and says they give the same answer | Student calculates | Badged "Senior preview" with its own intro overlay; links to the `stoichiometry` cheat sheet and Mole Foundry |

Reactions used (all in `reactions.ts` already or trivially added, all with whole-number
textbook Ar values except Cl): `2H2 + O2 → 2H2O`, `N2 + 3H2 → 2NH3`, `2Mg + O2 → 2MgO`,
`H2 + Cl2 → 2HCl`, `CH4 + 2O2 → CO2 + 2H2O`, `CaCO3 → CaO + CO2`, `2Na + Cl2 → 2NaCl`,
`Fe + S → FeS`, `Mg + 2HCl → MgCl2 + H2`, `2H2O2 → 2H2O + O2`.

Config: `src/core-engine/config/games/reaction-factory-config.ts` — `levels.roundsByLevel`,
`levels.maxLevel` (8), `levels.bonusLevel` (9), `mechanics.pointsPerLevelMultiplier`,
`mechanics.noWasteBonus`, `mechanics.predictionBonus`, `mechanics.massTolerancePercent` (1),
`mechanics.maxHopperCount` (20), `mechanics.coachAfterSeconds`, `mechanics.stuckAfterSeconds`,
`mechanics.studentCalculatesFromLevel` (4), `visuals.bundleAnimationMs`,
`visuals.coachOnByDefaultUntilLevel` (5), named presets + UAT tuning guide.

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
> - Later levels put atoms on the balance to work out how heavy molecules are — the
>   **periodic table drawer** has every number you need.
> - Stuck? Press the **lightbulb** (or `H`). The first hint is always free.
>
> *Keyboard & mouse:* `Tab` moves between hoppers or tiles · `↑` / `↓` change a count · type a
> number · `Enter` = Run / confirm · `H` hint · `P` pause.
> *Touchscreen:* tap ▲ / ▼, or tap the number to type. Drag tiles onto the balance, or tap a
> tile then tap the pan. Tap **Run**.

## Guided rounds

**Level 1, order 1 — `2H2 + O2 → 2H2O`, "Make 4 water":**
1. "Look at the recipe: 2 H₂ and 1 O₂ make 2 H₂O. One batch makes 2 water. You need 4 —
   that's 2 batches." *(waits)*
2. "Two batches need 2 × 2 = 4 H₂. Load 4 H₂." *(waits for H₂ = 4)*
3. "Two batches need 2 × 1 = 2 O₂. Load 2 O₂." *(waits for O₂ = 2)*
4. "Press Run." *(runs)* "4 water made, nothing left over, and the balance is level: 4 H₂ and
   2 O₂ weigh exactly as much as 4 H₂O. Mass is conserved."

**Level 3, round 1 — "Weigh the atom":**
1. "Here is one carbon atom on the right pan. Hydrogen is the lightest atom. Drag hydrogen
   atoms onto the left pan until the balance is level." *(waits; balance tips less each time)*
2. "Level at 12. One carbon atom weighs the same as 12 hydrogen atoms — so we say carbon's
   relative atomic mass is 12. *Relative* means compared with hydrogen."
3. "Now try oxygen." *(waits for 16)* "16. Open the periodic table drawer — every element's
   number is already written down. You never have to weigh them again."

**Level 4, round 1 — "Weigh the molecule": H₂O:**
1. "Water is H₂O: two hydrogens and one oxygen. Drag two H tiles onto the pan." *(waits)*
   "The pan reads 2."
2. "Now one O tile." *(waits)* "2 + 16 = 18. That is the relative formula mass of water: add
   up every atom."

## Message catalogue (`src/core-engine/config/games/reaction-factory-messages.ts`)

| Key | When | Text |
|---|---|---|
| `coach.ratio` | hoppers loaded off-ratio | "The recipe is {a} {R1} for every {b} {R2}. You have {x} {R1} — how many {R2} pair with them?" |
| `coach.limiting` | after Run with leftovers | "{Limiting} ran out after {batches} batches. {Excess} had {left} left over — that's the *excess*." |
| `coach.noWaste` | exact run | "Every particle was used. The recipe was followed exactly." |
| `coach.conserved` | every Run | "Balance level: {massIn} in, {massOut} out (including waste). Mass is conserved." |
| `coach.relative` | Level 3 | "One {element} atom balances {Ar} hydrogen atoms, so its relative atomic mass is {Ar}. Relative means compared with hydrogen." |
| `coach.drawer` | first drawer open | "These are the relative atomic masses. Read them — don't memorise them." |
| `coach.sumMr` | Level 4–5 | "Add the atoms: {breakdown} = {Mr}. That's the relative formula mass of {formula}." |
| `coach.subscript` | first subscript > 2 | "The small {n} means {n} {element} atoms. Multiply: {n} × {Ar} = {product}." |
| `coach.bracket` | first bracket | "The bracket groups {group}; the {n} outside means {n} of the whole group: {n} × ({groupMr}) = {product}." |
| `coach.ledger` | Level 6 | "{coefficient} × {Mr} = {rowTotal} for {formula}. When both sides add up the same, the equation is balanced *and* mass is conserved." |
| `coach.proportion` | Level 7 | "{massA} g of {A} makes {massB} g of {B}. You have {given} g — that's {factor} times as much, so you'll make {factor} × {massB} g." |
| `coach.limitingMass` | Level 8 | "Turn each mass into batches with its ledger row: {massA} ÷ {rowA} = {batchesA}, {massB} ÷ {rowB} = {batchesB}. The smaller number of batches is the reactant that runs out." |
| `coach.moleShortcut` | Level 9 | "Same answer, different route: n = m ÷ M turns grams into batches (moles), the ratio scales them, and m = n × M turns them back." |
| `hint.tier1` | | per level: "Compare each hopper with the number in front of it in the equation." / "Count the atoms of each element in the formula first." / "Which row of the ledger has the substance you were given?" |
| `hint.tier2` | | per level: "Divide what you loaded by its coefficient — the smallest answer runs out first." / "One element at a time: how many, times its Ar." / "Given ÷ its ledger mass = the scale factor; multiply the other row by it." |
| `hint.tier3` | | "Load {n} {formula}." / "{Excess} will have {left} left." / "{formula} = {Mr}." / "The answer is {mass} g." |
| `predict.wrong` | prediction ≠ result | "You predicted {predicted}; the machine made {actual}. {Reason}. Try one more prediction, or Run to see it." |
| `error.overMax` | count > `maxHopperCount` | "Hoppers hold up to {max}. Big orders are done in batches — try the ratio first." |
| `error.massTolerance` | typed mass off by > 1% | "Close, but not within 1%. Check the ratio: {massA} : {massB}." |
| `error.mrOff` | typed Mr wrong | "Not {given}. Count again: {formula} has {atomList}. Add them." |
| `error.unitsMissing` | Level 7–8 blank | "Enter the mass in grams." |
| `success.round` | | "Order filled: {order}." |
| `overlay.levelUp` | `customMessages.levelUp` | badge "Order complete" · title "Level cleared" · subtitle "{skill}" · description "Level {n}: {what changes}." |
| `overlay.victory` | | badge "All objectives complete" · title "Factory manager" · description "Try the Senior preview (the mole shortcut), or open your production log." |
| `overlay.bonusIntro` | entering Level 9 | badge "Senior preview" · title "The mole shortcut" · description "This is VCE Unit 2 content. Everything you did in Levels 7–8 still works — this is just faster." |
| `notebook.header` | end summary | "Your production log" (each order: equation, amounts, product, waste, masses, hint tier) |

Glossary: **reactant / product** · **coefficient** "the big number: how many of that substance
go into one batch" · **ratio** "the recipe — how many of each, compared" · **batch** "one run
of the recipe exactly as the equation says" · **limiting reagent** "the reactant that runs out
first; it decides how much product you get" · **excess** "what's left over when the other
reactant has run out" · **relative atomic mass (Ar)** "how heavy one atom is compared with a
hydrogen atom — read it from the periodic table" · **relative formula mass (Mr)** "add up the
Ar of every atom in the formula" · **subscript** "the small number: how many of that atom in
one formula" · **conserved** "kept the same — mass in equals mass out" · *(Level 9 only)*
**mole** "a counting unit for particles, like a dozen but 6.02 × 10²³; M is the mass of one
mole in grams".

## Known misconceptions to guard against

- **Coefficients are masses** ("2 g of H₂ reacts with 1 g of O₂") — Levels 1–2 are particles
  only; Level 6–7's ratio strip shows the *mass* ratio (4 : 32) next to the *particle* ratio
  (2 : 1) so the difference is explicit.
- **Ar is a mass in grams / an atom "weighs 12"** — Level 3 makes it two pans and the word
  *relative*; grams appear only when an order scales it up (Level 7).
- **A subscript applies only to the last atom / brackets are decoration** — Level 5's snapping
  tile groups and the `coach.bracket` line.
- **The reactant with less mass is limiting** — Level 8's first order (8 g H₂ with 16 g O₂:
  O₂ limits).
- **Mass "disappears" when a gas forms** — the balance counts the gas bin; the observation line
  names it.
- **Excess reactant is "wrong"** — the coach calls it excess and explains why industry often
  uses excess of the cheaper reactant (Level 8 flavour text).
- **The mole is a mass** — Level 9 glossary and coach define it as a count.

## Platform reuse

- `reactions.ts` (equations, `hint`, `description`), `compounds.ts` `molarMass`, `elements.ts`
  `mass` — but Year 10 rounding lives in one place: `core-engine/constants/year10-ar.ts`
  (the table above) so Mr in this game equals what students see in class. Unit-test that
  every reaction's ledger balances with those values (`2 × 2 + 32 = 2 × 18`).
- New data: `src/core-engine/data/games/factory-orders.ts` — per level: reaction id (or
  formula for Levels 3–5), order type (`count` | `predict` | `weigh-atom` | `mr` | `ledger` |
  `mass` | `mass-limiting` | `mole`), quantities, `sameAs` link for the Level 9 mirror of a
  Level 7–8 order.
- Pure functions, tested: `batchesPossible(loaded, coefficients)`, `runFactory()` (products,
  leftovers), `relativeFormulaMass(formula)` with brackets (reuse the parser fixed for
  Reaction Balancer), `massLedger(reaction)`, `massToMass(given, reaction, from, to)`,
  `limitingByMass(masses, reaction)`.
- Shared support components from the Reaction Balancer brief: `CoachPanel`, `GlossaryTerm`,
  Support mode. New shared candidates: `PeriodicDrawer` (Ar lookup; Mole Foundry reuses it),
  `MassBalance` (two-pan and beam modes; Reaction Balancer's beam is the same component).
- Shared UI: `GameShell` (`themeScope="reaction-factory"`), `GamesHeader`
  (`progressText="Order 2/4"`, `customTaskDescription="Make 6 NH3"`), `GameOverlay`
  `customMessages`, `GameFooter`, both modals. Sounds: `machine-run` → fallback
  `lock-element`, `order-complete` → `success-synthesis`, `hopper-tick` → `click`,
  `balance-level` → `pop_01`.
- Registrations: `GameName`, `GameThemeScope`, hub array, `public.games` row
  (`'reaction-factory'`, inactive until done), concept `reacting-quantities` +
  `concept_games` (primary) + `stoichiometry → reaction-factory (prerequisite)`, new cheat
  sheet `relative-formula-mass` (Levels 3–5 content: what Ar is, the Year 10 table, worked Mr
  examples with subscripts and brackets), `GAME_LINKS` + `relatedGames`.

## Accessibility (from `ACCESSIBILITY.md`)

- Hoppers are `<button>` ▲/▼ pairs plus a numeric `<input>`; tiles are buttons with tap-then-
  tap-pan placement; Run is a button; keyboard map in the instructions.
- Counts, batches, leftovers, pan readings and masses are always text; the ratio strip's bundle
  diagram has a text equivalent; the balance has a readout ("left pan 12, right pan 12 —
  level").
- Bundle and balance animations respect `prefers-reduced-motion` (instant with a fade).
- Coach, hints and predictions in an `aria-live="polite"` region; Run result assertive.
- No timer. Typed answers accept `,` or `.` as decimal separator; tolerance ±1%.

## Definition of done (beyond the generic checklist)

- [ ] `npx vitest run reaction-factory` green: every order is achievable; every ledger balances
      with the Year 10 Ar table; Mr for every formula in Levels 4–5 matches a hand table;
      limiting reagent chosen correctly for every Level 2/8 order, including the "smaller mass
      is not limiting" case; `relativeFormulaMass` handles brackets.
- [ ] Every message key exists in `reaction-factory-messages.ts`; instructions auto-open on
      first play; the three guided rounds run once each; Support mode persists; Level 9 is
      badged and skippable.
- [ ] A Year 10 teacher has checked the Ar table, the formula list and the ten reactions
      against the course, and the Level 3 "weigh the atom" wording against how Ar is
      introduced in class.
- [ ] Concept `reacting-quantities` and cheat sheet `relative-formula-mass` seeded;
      `games.is_active = true` in a new migration; one `game_sessions` row per full run and a
      separate one for Level 9.

## Teacher review of this design (applied)

- **Eight proper levels, not four.** Rev 1 introduced relative formula mass and asked students
  to use it in the same level, and combined subscripts, brackets and simple formulas in one
  step. For Year 10 the rule is one new idea per level and a short run of practice before the
  next: Ar (what it *is*) → Mr for simple formulas → subscripts and brackets → the ledger →
  proportion → limiting in grams. A student who has never met Ar now meets it on a balance
  before they see a number for it.
- **Relative formula mass is taught, not assumed.** The F–10 curriculum doesn't mandate it, so
  a Year 10 class may or may not have covered it; the game therefore starts from "how many
  hydrogen atoms balance one carbon?" and only then opens the periodic table. Students who
  already know it will clear Levels 3–4 in minutes; nobody is left behind.
- **The mole is not Year 10.** It stays out of Levels 1–8 entirely and is badged as a Senior
  preview with its own overlay, so no student thinks they've failed Year 10 content by skipping
  it. Mass-to-mass in Levels 7–8 is done by *proportion*, which is legitimately Year 10
  (conservation of mass + ratio).
- **Ratios must come before grams.** Levels 1–2 are particle counts only; the word "gram"
  first appears at Level 7, after Mr is secure, so "coefficient = mass" never gets a foothold.
- **Use the numbers students see in class.** A single Year 10 Ar table (whole numbers, Cl 35.5,
  Cu 63.5) rather than `elements.ts` precision — otherwise H₂O = 18.015 and every worksheet
  answer "disagrees" with the game.
- **Predict-then-run is the learning moment.** Watching the machine is engaging but passive;
  committing to a prediction first is what makes limiting reagent stick. Wrong predictions are
  explained and re-tried, never punished.
- **Arithmetic load managed.** Game computes at Levels 1–3, counter widgets (no typing) for
  Level 2 predictions, calculator allowed from Level 4, ±1% tolerance, no significant-figure
  policing at Year 10.
- **Dropped the sandwich analogy.** Year 10 students have usually seen it; the factory is
  already concrete and stays chemistry from the first second.

## Languages

Ships in every locale in `LOCALES` (`docs/i18n/GAMES.md`). English is the canonical text
above; each other locale is a translation of it, checked against `docs/i18n/glossary-<locale>.md`.
**Decided 2026-09-21** — the table below is the spec; build it verbatim. A native-speaker check
of each row still happens at build time and is reported under Check 4 (`BUILD_PLAN.md` §6); a
row that a native speaker rejects is changed there, with the reason, not silently.

Titles follow the shape the hub already uses in each language: English and German name the
thing (*Formula Blaster*, *Reaktions-Balancer*), the Romance locales take article + noun
(*La balance des atomes*, *La bilancia degli atomi*), and Russian takes noun + genitive
(*Весы реакций*). Hub descriptions are one imperative sentence in the informal second person,
like every other row in `gamesHub`, and carry no colon.

| Locale | Title | Kind | Hub description | Notes / alternative |
|---|---|---|---|---|
| en | Reaction Factory | — | Follow the equation like a recipe and fill every order. | Rewritten from the rev 2 proposal ("Fill the orders: the balanced equation is the recipe."), which was two clauses and a colon where every other hub line is one imperative sentence. Keeps the coined *order*. |
| de | Reaktionsfabrik | translation | Folge der Gleichung wie einem Rezept und erfülle jeden Auftrag. | Closed compound, because German closes native compounds; *Formel-Blaster* and *Reaktions-Balancer* are hyphenated only because the head noun is English. Alternative: *Reaktions-Fabrik*. |
| fr | L'usine à réactions | adaptation | Suis l'équation comme une recette et remplis chaque commande. | *Usine à X* is the idiomatic "factory that turns out X" and matches the article + noun shape of *La balance des atomes*. Alternative: *La fabrique de molécules* (smaller scale, warmer). |
| es | La fábrica de reacciones | translation | Sigue la ecuación como una receta y completa cada pedido. | Mirrors *La balanza de átomos* exactly. es-ES, per `glossary-es.md`. Alternative: *La fábrica de moléculas*. |
| it | La fabbrica delle reazioni | translation | Segui l'equazione come una ricetta e completa ogni ordine. | Mirrors *La bilancia degli atomi* exactly. Alternative: *L'officina delle reazioni* (workshop rather than plant). |
| ru | Фабрика реакций | translation | Следуй уравнению как рецепту и выполняй заказы. | Noun + genitive, like *Весы реакций*; *фабрика* is light manufacturing, which is the register "factory" has here. *ты*, per `glossary-ru.md`. Alternative: *Химический завод* (heavy plant, further from the English). |

The hub descriptions above also fix the coined **order** in each language — *Auftrag*,
*commande*, *pedido*, *ordine*, *заказ* — so the glossary rows are written to match them.

**Terms to fix in each glossary before translating:** the coined **hopper**, **batch**, **order**
and **production log** (de: *Trichter*, *Ansatz* — the review rates *Charge* low for teenagers —
*Auftrag*, *Produktionsprotokoll*; decide), ratio (*Verhältnis*), limiting reagent
(*begrenzendes Edukt*), excess (*im Überschuss*), relative atomic mass Ar (*relative Atommasse*),
relative formula mass Mr (*relative Formelmasse* — German textbooks also say *Molekülmasse*;
decide, and keep the symbols Ar / Mr untranslated), "relative means compared with hydrogen",
subscript (*Index*), bracket, mass balance / mass ledger, mole / molar mass / amount of substance
(*Mol* / *molare Masse* / *Stoffmenge*, Level 9 only), *Senior preview*.
**Chemistry names the game introduces:** the ten reactions' species (all in `reactions.ts` →
chemistry-name overlay by id); the Year 10 Ar table is numbers and symbols, not translated.
**Dataset prose to overlay:** the order texts ("Make 6 NH3" — the number and formula stay,
the verb is translated), the per-level `hint.tier1`/`tier2` variants, the reaction `name` and
`description`, and the Level 9 mole-shortcut copy.
**Count-dependent strings:** "{batches} batches", "{left} left over", "Order {n}/{total}",
the hopper counts — Russian will need the three-form shape for each.
