# Game Concept Brief: Reaction Balancer (redesign)

**Status:** Approved — rev 2, 2026-09-16 (rev 1 reviewed from a science-teacher perspective; see
"Review notes" at the end)
**Slug (everywhere):** `reaction-balancer` — already in `GameName`, `GameThemeScope`, the route,
`games.id` (inactive) and `concept_games` (`balancing-equations`, primary)
**Concept:** `balancing-equations` (primary); `stoichiometry` lists it as `prerequisite`
**Cheat sheets:** `balancing-equations` (primary), `reaction-types`
**Target year level:** Year 10 (Victorian Curriculum Science Level 10); the optional Challenge
level reaches into VCE Unit 1–2
**Curriculum reference:** Victorian Curriculum Science Level 10 — "chemical reactions … can be
represented by balanced chemical equations"; VCE Chemistry Unit 1 AoS 1 / Unit 2 AoS 1 (writing
balanced equations with state symbols)

## Why redesign the existing game

The current build (`src/components/games/reaction-balancer/GameArena.tsx`) works, but fails four
of our own checks:

1. **Triplet sync** — atom counts are hidden behind an opt-in "Show Atom Balance" button and
   correctness is only revealed on "Check Answer". The framework requires the symbolic and
   particle views to update on every coefficient change.
2. **Chemical accuracy of validation** — answers are compared to the coefficient string parsed
   from `reactions.ts`, not to conservation of atoms. `4H2 + 2O2 → 4H2O` is marked wrong.
   Also `parseFormulaAtoms` ignores brackets (`Ba(OH)2` counts 1 O, 1 H), and seven reactions
   in the dataset are already balanced at all-1 coefficients so "Check" instantly passes.
3. **Scaffolding** — "level" is `reactions[(level − 1) % length]`; the dataset's `difficulty`
   field is ignored and nothing fades.
4. **Platform contract** — no `reaction-balancer-config.ts` (150 points and `maxLevel: 10`
   are hard-coded), `themeScope="neutralise"`, `gameId={"reaction-balancer" as any}`, an unused
   duplicate rules hook (`useReactionBalancer.ts`), instructions never open on first play, and
   `recordGameSession(... 'victory')` fires after *every* reaction, inflating `total_syntheses`.

## Johnstone's Triplet mapping

| Level | In the game |
|---|---|
| Submicroscopic | Each compound card shows its molecules as particle clusters (atoms as coloured circles with the element symbol inside, one cluster per coefficient). Raising a coefficient adds a cluster; the **atom ledger** under the arrow shows, per element, reactant count vs product count and animates the difference |
| Symbolic | The equation with coefficients and state symbols is the primary object; it re-renders on every change. On balance, the equation locks and the lowest-whole-number form is shown (if the player used a multiple, the coach says so and simplifies) |
| Macroscopic | A **mass balance** beam under the ledger, labelled "relative mass in / out", tipping until equal — conservation of mass made visible. It is a supporting visual only; the ledger and coach text carry the learning. From Level 3, a one-line observation for the reaction type (gas bubbles, precipitate, flame) drawn from `reactions.ts` `description` |

## Core loop

A reaction appears unbalanced (all coefficients blank = 1) with the ledger showing per-element
imbalances **in words as well as colour**. The player adjusts coefficients with ▲/▼ (or typing,
or keyboard); the ledger, particle clusters, mass beam **and the coach panel** update in the same
render. When every element's counts match, the equation locks, the beam levels, a chime plays,
and the round ends — **there is no "Check Answer" button**. Points scale with level and with
whether the answer was already in lowest terms.

The chemistry is the physics: the win condition *is* conservation of mass, computed from the
compounds' compositions, so any valid balanced form wins.

## Support for struggling students (text-first)

The visuals alone are not enough for a student who does not yet know what to look at. Three
text layers, all written in the message catalogue below, all readable by a screen reader:

1. **Coach panel** — a one- or two-sentence strip directly under the equation that always says,
   in plain words, *what is unbalanced and what kind of move fixes it*. It is on by default at
   Levels 1–2, on-request (the lightbulb) from Level 3, and can be pinned on for the whole game
   with the **Support mode** toggle in Settings. It never gives the coefficient unless the
   player asks for hint tier 3.
2. **Hint ladder** (lightbulb button, keyboard `H`), three tiers per reaction, each a text
   pop-up over the arena:
   - Tier 1 — *which element*: "Start with the element that appears in the fewest compounds.
     Here that is carbon."
   - Tier 2 — *the strategy* (uses the reaction's `hint` field from `reactions.ts`): "Balance
     carbon first, then hydrogen, and leave oxygen for last."
   - Tier 3 — *one coefficient*: "Put a 2 in front of H₂O. Now check oxygen again." The card
     it refers to pulses.
   Tier 1 is free at every level; tiers 2–3 remove the lowest-terms bonus. `accuracy` recorded
   for the session = reactions locked without a tier-3 hint ÷ reactions played.
3. **Tap-to-explain vocabulary** — the words *coefficient*, *subscript*, *reactant*, *product*,
   *conserved* and each state symbol are dotted-underlined in the instructions, coach and
   hints; tapping shows a one-sentence definition with an example (see Glossary below).

Plus a **guided first reaction**: Level 1, reaction 1 is always `H2 + O2 → H2O` and the coach
walks it in four steps (below), each waiting for the player's move. It is skippable ("I've done
this before") and never shown again once completed.

## Win / lose conditions

- **Round win:** all element counts equal, all coefficients ≥ 1. Bonus if lowest whole-number
  ratio on first lock; otherwise the game simplifies and explains ("Every coefficient can be
  divided by 2 — the simplest form is …").
- **Level pass:** `reactionsPerLevel` (default 3) rounds; then `levelUp` overlay.
- **Victory** after Level 4. Level 5 is an optional **Challenge** offered on the victory
  overlay ("Try the Challenge level?"); it is never required.
- **No lives, no timer.** After `coachAfterSeconds` (default 30) without a coefficient change,
  the coach panel opens itself with tier 1; after `stuckAfterSeconds` (default 90) it offers
  tier 2. Nothing is ever taken away for being slow.
- **Session recording:** one `recordGameSession` call at victory or when the player exits
  (`'abandoned'`), with `levelReached` and `accuracy` as defined above. The Challenge level, if
  played, is a second session.

## Difficulty progression

Each reaction in `reactions.ts` carries `levels: { 'reaction-balancer': n }` — its level in *this*
game (other games add their own key, because a reaction that is trivial to balance can still be
a good stoichiometry problem). `0` means the reaction never appears here: it is already balanced
with every coefficient at 1, or its answer needs a coefficient above `maxCoefficient`. A unit
test enforces both rules and that every level has at least `reactionsPerLevel` reactions.

| Level | Reactions (`levels['reaction-balancer']`) | Scaffolding |
|---|---|---|
| 1 | Two-element synthesis/decomposition with coefficients of 2 or 3: `H2 + O2` (always first — the guided walk-through), `H2 + Cl2`, `Na + Cl2`, `Mg + O2`, `C + O2`, `Al + Cl2`, `O2 → O3` | Coach panel on; ledger, particle clusters and mass beam visible; the element to balance next is highlighted |
| 2 | Fixing one element unbalances another; first three-element reactions, no brackets: `N2 + H2`, `H2O →`, `H2O2 →`, `Fe + O2`, `CH4 + O2`, `SO2 + O2` | Coach panel on; ledger and clusters visible; no next-element highlight |
| 3 | Polyatomic ions as units, the first brackets, four compounds: `Na + H2O`, `Ca(OH)2 + HCl`, `C2H5OH + O2`, `Fe2O3 + Al`, `NH3 + O2`, `Cu + AgNO3`, `Cl2 + NaOH` | Coach on request; ledger visible; clusters collapse to formula only; observation line appears |
| 4 | Larger hydrocarbons, brackets with a subscript outside, four-compound double displacement: `C3H8 + O2`, `Pb(NO3)2 + KI`, `Al + H2SO4 → Al2(SO4)3`, respiration, photosynthesis | Ledger hidden by default (toggle available; using it removes the lowest-terms bonus) |
| 5 — Challenge (optional) | Mixed review over every level-1+ reaction with a word equation; the player builds the equation from a description ("Sodium metal reacts with liquid water to produce…") with a compound picker, then balances it | Hint ladder only |
| 0 — not in this game | `CaCO3 →`, `Mg + H2SO4`, `HCl + NaOH`, `AgNO3 + NaCl`, `NaHCO3 + CH3COOH`, `NH3 + HCl`, `H2CO3 →` (already balanced) and octane combustion (needs 25) | — |

Support mode (Settings) forces Level 1–2 scaffolding at every level with no score penalty; the
session is recorded normally but `accuracy` is not written (null), so it never lowers a
student's profile average.

Config lives in `src/core-engine/config/games/reaction-balancer-config.ts` with the named-preset
+ UAT-tuning-guide convention: `levels.reactionsPerLevel`, `levels.maxLevel` (4),
`levels.challengeLevel` (5), `mechanics.pointsPerLevelMultiplier`, `mechanics.lowestTermsBonus`,
`mechanics.coachAfterSeconds`, `mechanics.stuckAfterSeconds`, `mechanics.maxCoefficient`
(default 12), `visuals.showClustersUntilLevel`, `visuals.coachOnByDefaultUntilLevel`.

## Instructions (shown automatically on first play, paused, `GOT IT` to close)

Follow the Neutralise pattern: a `localStorage` flag (`hasSeenReactionBalancerInstructions`),
the game paused while open, keyboard-and-mouse / touchscreen tabs, reopenable from the footer.

**Title:** How to Play: Reaction Balancer

> **Make the atoms match.** In a chemical reaction atoms are rearranged, never made or lost —
> so both sides of the arrow must have the same number of each atom.
>
> - The **big numbers** in front of a formula are *coefficients*. You change those.
> - The **small numbers** inside a formula are *subscripts*. They are locked — changing them
>   would make a different substance.
> - The **atom ledger** under the arrow counts each element on the left and right. Make every
>   row equal and the equation locks.
> - Stuck? Press the **lightbulb** (or `H`). The first hint is always free.
>
> *Keyboard & mouse:* `Tab` moves between compounds · `↑` / `↓` change a coefficient ·
> type a number directly · `H` hint · `P` pause.
> *Touchscreen:* tap ▲ / ▼ on a card, or tap the number to type.

## Guided first reaction (Level 1, reaction 1 — `H2 + O2 → H2O`)

1. "Look at the ledger. Hydrogen: 2 on the left, 2 on the right — balanced. Oxygen: 2 on the
   left, 1 on the right. Oxygen needs fixing." *(waits)*
2. "We can't change the small 2 in O₂ — that would make a different substance. So add more
   water instead. Press ▲ on H₂O." *(waits for H₂O coefficient = 2)*
3. "Oxygen is now 2 and 2. But look — hydrogen changed: 2 on the left, 4 on the right.
   Balancing one element can unbalance another. Press ▲ on H₂." *(waits for H₂ = 2)*
4. "Every row matches: 4 H and 2 O on each side. The equation is balanced — 2H₂ + O₂ → 2H₂O.
   You just conserved mass." *(lock, chime)*

## Message catalogue (`src/core-engine/config/games/reaction-balancer-messages.ts`)

Reading age ~12, one idea per sentence, never "wrong"/"incorrect" as the whole message.

| Key | When | Text |
|---|---|---|
| `coach.imbalance` | any element unequal | "{Element}: {left} on the left, {right} on the right. Which compound with {element} could you change?" |
| `coach.multiple` | one change unbalanced another | "That fixed {fixed}, but {broken} changed. Balancing one element can unbalance another — check {broken} next." |
| `coach.balanced` | all equal, lowest terms | "Every row matches. Mass is conserved." |
| `coach.balancedNotLowest` | all equal, common factor *k* | "Balanced — and every coefficient can be divided by {k}. The simplest form is {equation}." |
| `hint.tier1` | | "Start with the element that appears in the fewest compounds. Here that is {element}." |
| `hint.tier2` | | reaction's `hint` from `reactions.ts`, e.g. "Balance carbon first, then hydrogen, and leave oxygen for last." |
| `hint.tier3` | | "Put a {n} in front of {formula}. Then check {element} again." |
| `stuck.offer` | `stuckAfterSeconds` | "Want a bigger hint? Press the lightbulb again." |
| `error.zero` | coefficient set to 0 | "A coefficient can't be 0 — that would remove {formula} from the reaction." |
| `error.max` | above `maxCoefficient` | "Coefficients this big are a sign to try smaller numbers. Aim for the simplest ratio." |
| `error.subscriptTap` | tap on a subscript | "Subscripts are locked. H₂O₂ is hydrogen peroxide, not water — change the big number instead." |
| `success.round` | lock | "Balanced! {equation}" |
| `overlay.levelUp` | `customMessages.levelUp` | badge "Mass conserved" · title "Level cleared" · subtitle "Every atom accounted for" · description "Level {n} adds {what changes}." |
| `overlay.victory` | | badge "All objectives complete" · title "Balancing mastered" · description "Try the Challenge level, or open your lab notebook." |
| `notebook.header` | end summary | "Your balanced equations" (list of every locked equation with the hint tier used) |

Glossary (tap-to-explain): **coefficient** "the big number in front of a formula; it multiplies
the whole molecule" · **subscript** "the small number inside a formula; it says how many atoms
are in one molecule" · **reactant** "what you start with (left of the arrow)" · **product**
"what is made (right of the arrow)" · **conserved** "kept the same — atoms are never made or
lost in a reaction" · **(s) (l) (g) (aq)** "solid, liquid, gas, dissolved in water".

## Known misconceptions to guard against

- Changing subscripts to balance — subscripts are not editable and `error.subscriptTap`
  explains why.
- "Coefficient applies to the first atom only" — clusters make it visibly multiply the whole
  molecule; `2Ca(OH)2` shows 4 H in the ledger.
- Mass "disappearing" when a gas forms — the mass beam stays level when balanced, and the
  observation line names the gas.
- Balancing by trial to a huge multiple — `maxCoefficient` caps it and the simplify step teaches
  lowest terms.
- Reading `→` as "equals" — the instructions and glossary say "makes / becomes".

## Platform reuse

- `reactions.ts` (31 reactions, already tagged `intro/beginner/intermediate/advanced`, 30 with
  a `hint`) — fix the seven already-balanced entries by storing the *unbalanced* skeleton and
  the balanced answer separately, or drop them; add state symbols to every equation.
- Composition from `compounds.ts` `elements` where the compound exists; otherwise a shared
  `parseFormulaAtoms()` in `core-engine/utils` that handles brackets — unit-test it against
  every formula in `reactions.ts` (this also fixes known issue #2 in `docs/TESTING.md`).
- `isBalanced()` and `lowestTerms()` pure functions → tests: every reaction's stored answer
  balances; every reaction's all-1 state does **not**; scalar multiples balance and simplify.
- Delete `src/hooks/useReactionBalancer.ts` and `neutralise-levels.ts` if still unused;
  move the rules into `useReactionBalancer` for real and keep `GameArena.tsx` presentational.
- Shared UI: `GameShell` (`themeScope="reaction-balancer"`), `GamesHeader` with
  `progressText="Reaction 2/3"`, `GameOverlay` with `customMessages`, `GameFooter`, both
  modals. New shared candidates: `CoachPanel` and `GlossaryTerm` (both reusable by Ion Forge
  and Mole Foundry). Sounds: `equation-balanced`, `equation-error` (already mapped), add
  `coefficient-tick` → fallback `click`.
- `MoleculeText` renders coefficients, brackets and state symbols already.
- Settings: add the **Support mode** toggle to `game-settings-context` as a per-game boolean
  (same storage pattern as per-game theme) so other games can adopt it.

## Accessibility (from `ACCESSIBILITY.md`)

- Coefficient controls are `<button>`s plus a numeric `<input>`; keyboard map as in the
  instructions.
- Ledger rows have text ("Oxygen: 2 left, 1 right"), not just colour; the mass beam has a
  text readout.
- Coach panel and hints are in an `aria-live="polite"` region; lock/level-up is assertive.
- No timer; `coachAfterSeconds` only *offers*.
- Particle clusters are decorative (`aria-hidden`) — the ledger is the accessible equivalent.
- Glossary pop-overs are focusable buttons, dismiss with `Escape`.

## Definition of done (beyond the generic checklist)

- [ ] `npx vitest run reaction-balancer` green, including `isBalanced`/`lowestTerms`/parser
      specs and the promoted known-issue #2 test.
- [ ] Every message key above exists in `reaction-balancer-messages.ts` and is rendered from
      there (no copy inline in components); a teacher can edit the file without touching JSX.
- [ ] Instructions open automatically on first play and pause the game; guided reaction
      completes and never reappears; Support mode persists across reloads.
- [ ] Every reaction in Levels 1–4 solvable without hints in a manual playthrough; Challenge
      descriptions reviewed for chemical accuracy.
- [ ] `games.is_active = true` for `reaction-balancer` in a new migration; hub card and dashboard
      card show it; one `game_sessions` row per full run in Supabase.
- [ ] `docs/TESTING.md` known issue #2 and the "seven already-balanced reactions" observation
      removed once fixed.

## Review notes (science-teacher pass, 2026-09-16)

What rev 1 got right: no check button, conservation as the win condition, any valid form
accepted, misconception list. What it was missing, now added in rev 2:

- **Opening instructions** were not specified at all; Neutralise auto-opens them on first play
  and this must too. Full text is now in the brief, with keyboard/touch tabs.
- **Support was visual-only.** Struggling students need to be *told* what to look at. Added the
  coach panel (always-on at Levels 1–2, pinnable via Support mode), a three-tier hint ladder
  instead of one hint, a guided first reaction, and tap-to-explain vocabulary — the
  coefficient/subscript confusion is the single most common error and the words must be
  defined in the game, not assumed.
- **All copy is now written down** as a message catalogue with keys, so an agent can't invent
  tone ("Wrong!") and a teacher can edit wording without code.
- **Level 5 made optional.** Writing equations from a description is a stretch for Year 10;
  requiring it for "victory" would stop the students the game is for.
- **Mass beam demoted to a supporting visual** and labelled "relative mass" — molar mass is not
  Year 10 content; the ledger is the primary representation.
- **Support mode never lowers a student's accuracy stat** — otherwise the students who most
  need it would be penalised on their profile.
- Added the **lab notebook** end summary so the balanced equations can be copied into revision
  notes and a teacher can see which hint tier was used.

## Catalogue additions (build, 2026-09-18)

Situations the build can reach that the catalogue above did not name. Each key exists in
`reaction-balancer-messages.ts`; wording is a teacher's to edit.

| Key | When | Text |
|---|---|---|
| `hint.tier3Lower` | tier 3 when the player's coefficient is above the answer | "Take {formula} back to {n}. Then check {element} again." |
| `hint.tier3Balanced` | tier 3 asked for while every row already matches | "Every row already matches — the equation is balanced." |
| `hint.tier1Build` / `tier2Build` / `tier3Build` | the Challenge picker (before the equation is built) | "Read the description again …" · "Substances before 'reacts', 'burns' or 'decomposes' are reactants …" · "Add {name} ({formula}) as a {side}." |
| `error.notANumber` | a letter typed into a coefficient | "Coefficients are whole numbers from 1 upwards. Type a number, or use ▲ and ▼." |
| `challenge.intro` / `notInReaction` / `wrongSide` / `built` | Level 5 compound picker | "Read the description, then build the equation before you balance it." · "{Name} is not part of this reaction. Read the description again — which substances does it name?" · "{Name} is made in this reaction, so it belongs on the right of the arrow — it is a product." (and the reactant mirror) · "That is the equation. Now balance it." |
| `overlay.levelChanges` | `overlay.levelUp` description | 2: "reactions with three elements, and the next-row highlight is gone" · 3: "combustion and displacement reactions; the coach waits until you ask and the clusters give way to formulas" · 4: "brackets, polyatomic ions and four-compound reactions; the ledger stays hidden until you open it" |
| `overlay.victory.subtitle` | `GameOverlay` needs one | "Every atom accounted for" |
| `overlay.challengeComplete` | victory card after Level 5 | badge "Challenge complete" · title "Equations built and balanced" · description "Open your lab notebook to see every equation you balanced." |
| `ledger.*`, `beam.*`, `card.*` | accessible text for the ledger rows ("Oxygen: 2 left, 1 right, 1 more needed on the right"), the beam readout and the card controls ("Coefficient for water, H2O", "Add one water") | see the file |
| `ui.supportModeHelp` | Settings | "Keeps the coach strip and the ledger on at every level. Never lowers your accuracy." |

Conventions in the catalogue: a formula inside `backticks` is typeset by `MoleculeText`
(so `error.subscriptTap` writes `` `H2O2` ``, never Unicode subscripts); `**double stars**`
are bold; glossary words are linked automatically.

## Build notes (2026-09-18)

Built on branch `feature/reaction-balancer-redesign` (`/games/reaction-balancer`). Decisions
taken where the brief and the dataset disagreed — flagged for review, not silently changed:

- **Per-game levels replaced the shared `difficulty` tag** (second commit). The old tag put
  `CH4 + O2` and `Fe + O2` at Level 3 and brackets at Level 4, left Level 2 with no
  three-element reaction, and three of the table's examples (`Na + Cl2`, `Ca(OH)2 + HCl`,
  `Al2(SO4)3`) were not in the dataset. Each reaction now carries
  `levels: { 'reaction-balancer': 0–4 }` (other games add their own key), the three missing
  reactions were added (`2Na + Cl2 → 2NaCl`, `Ca(OH)2 + 2HCl → CaCl2 + 2H2O`,
  `2Al + 3H2SO4 → Al2(SO4)3 + 3H2`), and the table above lists the resulting pools.
- **Level 0 keeps a reaction out of this game entirely**, Challenge included: the seven
  already-balanced reactions (Limestone Decomposition, Magnesium in Sulfuric Acid, Hydrochloric
  Acid Neutralization, Silver Chloride Precipitation, Baking Soda and Vinegar, Ammonium Chloride
  Formation, Carbonic Acid Decomposition) and Octane Combustion (needs 25, above
  `maxCoefficient` 12). They stay in the dataset for the cheat sheets and other games. A unit
  test fails if a level-1+ reaction is already balanced or exceeds the cap, or if a level-0
  reaction has neither reason to be excluded.
- **Challenge sessions** record the cumulative score (Levels 1–4 plus the Challenge) with
  `levelReached = 5`, matching what the header shows; the session limits allow for it.
- **Tier 3 aims at the stored lowest-terms answer.** When a coefficient overshoots it says
  "take it back to n" (`hint.tier3Lower`) rather than pushing towards a larger multiple.
- The `balancing-equations` concept was already Year 10 in the seed; the migration only
  refreshes its description and activates the game.

## Languages

Ships in every locale in `LOCALES` (`docs/i18n/GAMES.md`). English is the canonical text
above; each other locale is a translation of it, checked against `docs/i18n/glossary-<locale>.md`.

**Status (2026-09-18):** the redesign's catalogue is being translated on the `i18n` branch
as part of that branch's catch-up with `master`; the German dictionary's older
`games.reactionBalancer` namespace covered the previous arena. The four language checks are
run as part of that work.

| Locale | Title | Kind | Hub description | Notes / alternative |
|---|---|---|---|---|
| en | Reaction Balancer | — | Make the atoms match on both sides of the arrow. | — |
| de | Gleichungs-Werkstatt | adaptation | Die Atome müssen auf beiden Seiten des Pfeils übereinstimmen. | Proposal. The dictionary currently says *Reaktions-Balancer*, which the German review rates *low* as a clunky coinage and suggests this alternative. Alternative: keep *Reaction Balancer* as a product name. Do **not** describe the goal with *Gleichgewicht* — that is chemical *equilibrium*, a different concept. > YOU DECIDE |
| fr, es, it, ru | — | — | — | filled when the locale is added (`docs/i18n/README.md` § Adding a locale) |

**Terms to fix in each glossary before translating:** coefficient / subscript (de: *Koeffizient*
/ *Index* — the distinction the whole game turns on), reactant / product (*Edukt* / *Produkt*),
conserved / conservation of mass (*Massenerhaltung*), balanced equation, lowest whole-number
ratio, the *atom ledger* (de dictionary: *Atombilanz*), the *mass beam*, *lab notebook*,
*Challenge* level, *word equation*, *Support mode*, the state symbols (kept as `(s) (l) (g) (aq)`,
explained in the glossary in that language).
**Chemistry names the game introduces:** every species `name` in `reactions.ts` (rendered on
cards, in the ledger's accessible text and in the Challenge picker) — overlay by species id;
the reaction names ("Water Synthesis") shown in the header and notebook — overlay by reaction id.
**Dataset prose to overlay:** `reactions.ts` `name`, `description` (the observation line),
`hint` (hint tier 2) and `prompt` (the Challenge word equation) per reaction.
**Count-dependent strings:** the ledger row readouts ("1 more needed on the right"), the
particle-cluster accessible counts, "Reaction {n}/{total}".
