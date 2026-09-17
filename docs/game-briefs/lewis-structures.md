# Game Concept Brief: Share to Fill (Lewis Structures)

**Status:** Approved — rev 4, 2026-09-17 (rev 3 scope unchanged: Year 10, covalent only,
"interpret" = spot and fix errors; rev 4 removes the symbolic side panel — see "Decisions"
at the end)
**Hub title / description:** Share to Fill — "Pair up the loners to build a molecule."
**Slug (everywhere):** `lewis-structures` — add to `GameName`, `GameThemeScope`, route,
`games.id`, `concept_games`
**Concept:** `lewis-structures` (primary; currently seeded under `chemical-bonding` with
`year_level = 'Senior'` — change the seed to `'Year 10'`)
**Cheat sheets:** `lewis-structures` (primary — its formal-charge and VSEPR sections are
Senior content; add a "Year 10 essentials" section at the top or the game's help link lands
students in material they haven't met), `chemical-bonds`
**Target year level:** Year 10
**Curriculum reference:** Victorian Curriculum Science Level 10 — "the atomic structure and
properties of elements are used to organise them in the periodic table"; "chemical bonding
(ionic and covalent) … electron dot diagrams for simple molecules". Supersedes the earlier
Senior-level "Octet Architect" draft (formal charge, resonance, expanded octets are out of
scope).
**Relationship to Bond Builder:** separate games. Bond Builder answers *which* bonding type and
why (ionic/covalent/metallic, electron transfer); this game builds and reads *covalent*
structures. They share `core-engine` types (`BondOrder`, `BondConnection`,
`ElementData.valenceElectrons`) and one shared atom/bond canvas component.

## Learning goals

By the end, a Year 10 student can:

1. State how many valence electrons an atom has from its group, and how many it can share.
2. Draw a correct electron-dot (Lewis) structure for a simple covalent molecule: every shared
   pair as a bond, every unshared pair as a lone pair, hydrogen with 2, everything else with 8.
3. Read a given structure and check it: count electrons around each atom, spot too many / too
   few / a lone pair on hydrogen / a missing double bond, and fix it.

## Mechanics considered

| # | Mechanic | Intrinsic? | Triplet | Struggling students | Verdict |
|---|---|---|---|---|---|
| A | **Electron budget** — count total valence electrons, then place bonds and lone pairs until the budget is spent and octets satisfied (the earlier Octet Architect draft) | Yes | Sub + sym | Two abstractions at once (a global budget *and* per-atom octets); the budget number is an exam trick, not a Year 10 idea | Too much cognitive load for Year 10; keep for a Senior mode later |
| B | **Share to Fill** — each atom arrives with its own valence electrons drawn as dots; unpaired dots are the only ones that can be shared; drag (or tap-tap) an unpaired dot onto another atom's unpaired dot to make a shared pair. An atom is "full" at 8 (H at 2). Double/triple bonds are just two/three shared pairs | Yes — valence *emerges* from the dot count (O has two unpaired dots, so O makes two bonds); there is no separate rule to remember | Sub (dots, sharing) + sym (formula, bond lines drawn as the pairs form) | Concrete: you move *things*; one idea (pair up the loners) | **Chosen for build mode** |
| C | **Fix the structure** — a structure "drawn by another student" is shown; tap where the error is, choose the diagnosis, then repair it with the same tools as B. One in six is actually correct | Yes — the check *is* the octet rule applied | Sub + sym | Reading is easier than producing; good entry point and the requested interpretation skill | **Chosen for inspect mode** |
| D | **Pick the correct diagram** (three drawn options, choose one) | No — recognition quiz | Sym only | Guessable | Rejected (anti-pattern) |
| E | **Molecule race** — build structures against a countdown | Mechanic B with a timer | — | Anxiety, no gain | Rejected (anti-pattern) |
| F | **Electron marketplace** — atoms trade electrons to "buy" stability | No — a metaphor for the wrong thing (transfer, not sharing) and it embeds the misconception that shared electrons are given away | — | Misleading | Rejected |

**Why B + C:** B makes the chemistry the physics — an atom physically cannot form more bonds
than it has unpaired electrons, so the valence of C/N/O/halogens is discovered rather than
memorised, and the octet is visible as "no unpaired dots left, eight around the atom". C uses
the same objects to teach reading, which is what exams and lab reports actually ask for.

**Scope note on the sharing rule:** pairing unpaired electrons reproduces all 18 molecules in
the list below (H₂, Cl₂, HCl, H₂O, NH₃, CH₄, H₂S, PH₃, O₂, N₂, CO₂, C₂H₄, C₂H₂, C₂H₆, CCl₄,
CH₃Cl, H₂O₂, C₂H₅OH). It does **not** cover dative bonds (CO, NH₄⁺) or octet exceptions —
correctly, those are not Year 10 content and must stay out of the molecule list.

## Johnstone's Triplet mapping

| Level | In the game |
|---|---|
| Submicroscopic (primary) | Atoms as symbols with their valence electrons as dots on four sides (the Lewis convention). Unpaired dots pulse gently; lone pairs sit still. Dragging pairs two unpaired dots into a **shared pair** drawn between the atoms; the atoms slide together. A fill ring around each atom shows its electron count (2/8 for H, n/8 for others) and closes when full |
| Symbolic (live) | The name and formula sit in the header task line ("Build: water (H2O)"). Every shared pair is drawn as a **bond line** between the atoms the moment it forms, so students see that a line *is* a shared pair; the completion message gives the bond-line structure (H–O–H, O=C=O) and the bond / lone-pair counts. Per-atom counts are the text counters under each atom ("O: 8 of 8"). *(Rev 4: no separate formula / bond-line / per-atom text panel beside the canvas.)* |
| Macroscopic | Light touch, name and one property line when a molecule completes ("Water — a liquid at room temperature; the bent shape you'll meet next year comes from those two lone pairs"). No macroscopic simulation: the concept is particulate |

The scale disclaimer required by the design framework sits in the instructions and the
glossary entry for *dot*: "dots show *how many* outer electrons an atom has, not where they are."

## Core loop

**Build mode (Mode A):** the target molecule's name and formula appear with its atoms scattered
on the canvas, each with its own dots. The player pairs unpaired dots between atoms. The round
completes when every atom's ring is full and no unpaired dots remain. The formula, bond-line
drawing and per-atom counts update on every pairing. There is no "check" button: the structure
locks itself when it is complete.

**Inspect mode (Mode B):** a completed structure is shown as "drawn by a classmate". The player
taps the atom they think is wrong (or "This one is correct"), picks the diagnosis from a short
list written in chemistry terms, then repairs it with the Mode A tools. Diagnoses: *too many
electrons around this atom* · *too few — a lone pair is missing* · *hydrogen can only share
one pair* · *these atoms need to share twice (a double bond)* · *an unpaired electron was left
over* · *no error*.

Once the structure is correct (repaired, or confirmed correct), Mode B asks the two questions a
mark scheme asks — **"How many bonds?"** and **"How many lone pairs?"** — answered by tapping
the shared pairs / lone pairs on the structure itself (each tap counts and highlights; the
count is shown as text). This reads the diagram in the other direction (dot structure → bond
count) without turning it into typing. No bond-line typing: it breaks for branched molecules
and tests spelling, not chemistry.

Mode B rounds are interleaved from Level 2 (every third round) and are the whole of Level 5.

## Support for struggling students (text-first)

1. **Coach panel** under the canvas, always on at Levels 1–2, on request from Level 3, pinnable
   with **Support mode** (Settings; never lowers `accuracy`). It names the next thing to look at
   in words: "Oxygen has 6 outer electrons — 2 pairs and 2 loners. Each loner can pair with a
   loner on another atom."
2. **Hint ladder** (lightbulb / `H`): tier 1 *what to look at* ("Which atoms still have loners?
   They pulse."), tier 2 *the strategy* ("Carbon has four loners, so it will share with all four
   hydrogens."), tier 3 *one move* ("Pair the loner on the left oxygen with a loner on carbon."
   — the two dots glow). Tier 1 free; tiers 2–3 cost the no-hint bonus; `accuracy` = rounds
   completed without tier 3 ÷ rounds played.
3. **Tap-to-explain glossary**: *valence (outer) electron*, *unpaired electron / "loner"*,
   *lone pair*, *shared pair / bond*, *single / double / triple bond*, *octet*, *duet*, *dot*.
4. **Guided first molecule** — `H2` then `H2O`, four scripted steps each, skippable, shown once.
5. **Ring counters are text as well as rings** ("O: 8 of 8") so the octet is never colour-only.

## Win / lose conditions

- **Mode A round win:** every atom full (H = 2, others = 8), zero unpaired dots, every atom
  connected. Bonus for no tier-3 hint. Pairing two dots on the *same* atom is not possible (they
  are already a pair); dragging onto a full atom snaps back with `error.atomFull`.
- **Mode B round win:** correct atom (or "correct") + correct diagnosis, a valid repair, then
  both counting questions answered (bonds, lone pairs). A wrong diagnosis shows why in words
  and lets the player try again; a wrong atom highlights the counts on the tapped atom
  ("Carbon has 8 — that one's fine. Check the atoms with fewer."); a wrong count highlights
  the pairs that were missed or double-counted.
- **Level pass:** `roundsByLevel` (default `[3, 5, 5, 5, 6]` — one round per molecule at
  Levels 1–4, six classmate drawings at Level 5). **Victory** after Level 5.
- **No lives, no timer.** `coachAfterSeconds` (30) opens the coach with tier 1;
  `stuckAfterSeconds` (90) offers tier 2.
- **Session recording:** one `recordGameSession` at victory or exit (`'abandoned'`), with
  `levelReached` and `accuracy` (null in Support mode).

## Difficulty progression

Molecules are ordered by familiarity, not by bond type: every one is something a Year 10
student has met by name in the periodic-table or reactions unit, and the two "same group, same
structure" rounds (H₂S after H₂O, PH₃ after NH₃) make the periodic-table point explicitly.

| Level | Molecules (in order) | Mode | Scaffolding |
|---|---|---|---|
| 1 | H₂ (guided), Cl₂, HCl | A | Coach on; loners pulse and are labelled "loner"; ring counters; bond line drawn as you pair |
| 2 | H₂O (guided), NH₃, CH₄, then H₂S ("same as water?") and PH₃ ("same as ammonia?") | A, with a Mode B round every third | Coach on; loner labels off; counters on; the two same-group rounds open with `coach.sameGroup` |
| 3 | O₂, CO₂, N₂, C₂H₄, C₂H₂ | A + B | Coach on request; the "share again" affordance (second pairing between the same atoms draws a double bond) is introduced by the coach on O₂ |
| 4 | C₂H₆, CCl₄, CH₃Cl, H₂O₂, C₂H₅OH (ethanol) | A + B | Counters on hover only; atoms start unplaced (player also chooses which atom is central — the coach explains "the atom with the most loners usually goes in the middle") |
| 5 — Marking mode | Six classmate drawings drawn from all 18 molecules, one in six correct; each ends with the two counting questions | B only | No coach; hint ladder only; ends with a "marking sheet" summary of every diagnosis and count |

Config: `src/core-engine/config/games/lewis-structures-config.ts` — `levels.roundsByLevel`,
`levels.maxLevel`, `levels.inspectEveryNRounds`, `mechanics.pointsPerLevelMultiplier`,
`mechanics.noHintBonus`, `mechanics.coachAfterSeconds`, `mechanics.stuckAfterSeconds`,
`mechanics.correctStructureRatio` (1 in 6), `visuals.pulseUnpairedUntilLevel`,
`visuals.showCountersUntilLevel`, named presets + UAT tuning guide. The molecule order per
level lives in `lewis-molecules.ts` (`level`, `order` fields), not in the config, so a teacher
can swap a molecule without touching tuning numbers.

## Instructions (auto-open on first play, paused; `hasSeenLewisStructuresInstructions`)

**Title:** How to Play: Share to Fill

> **Pair up the loners.** Every atom brings its outer electrons as dots. A dot on its own is a
> *loner* — it wants a partner. Two loners from two different atoms make a **shared pair**,
> which is a bond.
>
> - Drag a pulsing dot onto a pulsing dot on another atom (or tap one, then the other).
> - An atom is full when it has **8** dots around it — hydrogen is full at **2**.
> - Share twice between the same two atoms and you've made a double bond.
> - The structure locks itself when every atom is full and no loners are left. No button needed.
> - Stuck? Press the **lightbulb** (or `H`). The first hint is always free.
>
> The dots show *how many* outer electrons an atom has — not where they really are.
>
> *Keyboard & mouse:* `Tab` selects an atom · `←` `→` picks one of its loners · `Enter` starts
> a pair, `Tab` + `Enter` on another atom finishes it · `Esc` cancels · `H` hint · `P` pause.
> *Touchscreen:* tap a loner, then tap a loner on another atom. Tap a shared pair to undo it.

## Guided first molecules

**H₂ (Level 1, round 1):**
1. "Two hydrogen atoms. Each has 1 outer electron — a loner. Drag one onto the other."
2. "They now share a pair. Count around each H: 2. Hydrogen is full at 2 — that's a single
   bond, H–H." *(lock)*

**H₂O (Level 2, round 1):**
1. "Oxygen has 6 outer electrons: two pairs (they stay put) and two loners (they pulse)."
2. "Pair one oxygen loner with a hydrogen loner." *(waits)* "Oxygen now has 7 around it — one
   more to go."
3. "Pair the other oxygen loner with the other hydrogen." *(waits)*
4. "Oxygen: 8. Each hydrogen: 2. Two shared pairs and two lone pairs — that's water, H–O–H."
   *(lock)*

## Message catalogue (`src/core-engine/config/games/lewis-structures-messages.ts`)

| Key | When | Text |
|---|---|---|
| `coach.loners` | unpaired dots remain | "{Atom} still has {n} loner(s). Loners pair with loners on *another* atom." |
| `coach.needsMore` | atom below full, no loners left elsewhere nearby | "{Atom} has {count} of 8. It needs another shared pair — which atom still has a loner?" |
| `coach.shareAgain` | two bonded atoms both still have loners | "{Atom1} and {Atom2} both still have a loner. They can share again — that makes a double bond." |
| `coach.complete` | lock | "Every atom is full and no loners are left. This is {name}: {bonds} shared pair(s), {lonePairs} lone pair(s)." |
| `hint.tier1` | | "Look for the atoms that still have pulsing dots." |
| `hint.tier2` | | per-molecule text from the dataset, e.g. "Carbon has four loners, so it will share with all four hydrogens." |
| `hint.tier3` | | "Pair the loner on {atom1} with the loner on {atom2}." (dots glow) |
| `error.atomFull` | drop on a full atom | "{Atom} already has 8 — it can't share any more. Try an atom that still has a loner." |
| `error.hydrogenFull` | second pair onto H | "Hydrogen is full at 2. It can only share one pair." |
| `error.sameAtom` | drag within one atom | "Those two dots are on the same atom — they're already a pair. A bond needs two different atoms." |
| `error.pairedDot` | drag a lone-pair dot | "That dot is already part of a pair. Only loners (the pulsing ones) can be shared." |
| `inspect.wrongAtom` | Mode B, tapped a correct atom | "{Atom} has {count} — that one's fine. Check an atom with too few or too many." |
| `inspect.wrongDiagnosis` | | "Not quite. Count the dots around {atom}: {count}. {Explanation of the actual error}." |
| `inspect.correctStructure` | player says "correct" and it is | "Right — every atom is full and nothing is left over." |
| `inspect.missedCorrect` | player tapped an atom on a correct structure | "This one is actually correct: every atom is full. Not every drawing has a mistake." |
| `inspect.countBonds` | after repair / confirm | "How many bonds are there? Tap each shared pair." |
| `inspect.countLonePairs` | | "How many lone pairs? Tap each pair that isn't shared." |
| `inspect.countWrong` | count off | "You counted {given}; there are {actual}. The ones you missed are highlighted — a double bond counts as one bond but two shared pairs." *(second sentence only when relevant)* |
| `coach.sameGroup` | H₂S / PH₃ rounds | "{Element} is in the same group as {analogue}, so it has the same number of outer electrons. Expect the same structure as {analogueMolecule}." |
| `success.round` | | "{Name} complete — {bondLine}." |
| `overlay.levelUp` | `customMessages.levelUp` | badge "All atoms full" · title "Level cleared" · subtitle "Every loner paired" · description "Level {n}: {what changes}." |
| `overlay.victory` | | badge "All objectives complete" · title "Lewis structures mastered" · description "Open your marking sheet, or try Bond Builder next." |
| `notebook.header` | end summary | "Your structures" (each molecule: dot structure, bond-line, bonds / lone pairs, hint tier) |

Glossary: **outer (valence) electron** "an electron in the outside shell — the ones an atom
shares" · **loner (unpaired electron)** "an outer electron without a partner; only loners can be
shared" · **lone pair** "two outer electrons that stay on one atom and are not shared" ·
**shared pair / bond** "two electrons, one from each atom, shared between them — drawn as a
line" · **single / double / triple bond** "one, two or three shared pairs between the same two
atoms" · **octet** "eight outer electrons around an atom — full" · **duet** "two outer electrons
around hydrogen — full" · **dot** "shows how many outer electrons, not where they are".

## Known misconceptions to guard against

- **Planetary orbits / dots as positions** — dots sit on the four sides of the symbol, never on
  rings; disclaimer in instructions and glossary.
- **Shared electrons "belong" to one atom** — the shared pair is drawn *between* the atoms and
  counts toward *both* rings (the counters visibly both go up by 2 on pairing).
- **Hydrogen with 8 / lone pairs on H** — impossible in Mode A (H has one loner), diagnosed in
  Mode B (`hydrogenFull`).
- **Lone pairs are optional / forgotten** — atoms arrive with all their electrons; you can't
  delete them; Mode B's most common injected error is a missing lone pair.
- **"More bonds is always better"** — a full atom refuses further pairs; the coach explains.
- **Any atom can be central** — Level 4 makes the choice explicit with the loner-count heuristic
  (and H is never central because it has one loner).
- **Line drawings and dot drawings are different things** — both are shown side by side and
  update together.

## Platform reuse

- `elements.ts` `valenceElectrons` (present for every element). Unpaired count for Year 10
  main-group non-metals is derived: `unpaired = v < 4 ? v : 8 − v` (H 1, C 4, N 3, O 2,
  halogens 1). Put `getUnpairedElectrons()` in `core-engine/utils/lewis-utils.ts`.
- New data: `src/core-engine/data/lewis-molecules.ts` — for each of the 18 molecules: `id`,
  `name`, `formula`, `atoms` (element symbols), `bonds` (`BondConnection[]` using the existing
  `BondOrder` type), `centralAtomIndex`, `level`, `order`, `tier2Hint`, `propertyLine`,
  optional `sameGroupAs` (molecule id, drives `coach.sameGroup`). Mode B drawings are
  **generated** from the correct graph by mutation (remove a lone pair, add an electron, give
  H two bonds, downgrade a double bond, misplace H as central) — so every wrong drawing has a
  known diagnosis and the generator is unit-tested (`every mutation is detectable`, `no
  mutation is accidentally valid`).
- Pure functions, all tested: `isComplete(structure)`, `countAround(atom)`, `diagnose(structure)`
  (returns the error type or `none`), `generateFlawedStructure(molecule, errorType)`.
- **Shared canvas**: `components/games/shared/AtomCanvas/` (atoms, dots, pairing gesture,
  tap-tap + keyboard) — build it here first; Bond Builder reuses it for ionic transfer later.
  `BondOrder`/`BondConnection`/`ValenceConfig` in `chemistry.ts` are the data model.
- Shared support components from the Reaction Balancer brief: `CoachPanel`, `GlossaryTerm`,
  Support-mode toggle in `game-settings-context`.
- Shared UI: `GameShell` (`themeScope="lewis-structures"`), `GamesHeader`
  (`progressText="Molecule 2/4"`, `customTaskDescription="Build: water (H2O)"`), `GameOverlay`
  `customMessages`, `GameFooter`, both modals. Sounds: `pair-formed` → fallback `pop_01`,
  `structure-complete` → `success-synthesis`, `pair-rejected` → `fizzle`.
- Registrations: `GameName`, `GameThemeScope`, hub `games` array, `public.games` row
  (`'lewis-structures'`, inactive until done), `concept_games` (`lewis-structures`, primary),
  `GAME_LINKS` + `relatedGames` on the `lewis-structures` and `chemical-bonds` cheat sheets.

## Accessibility (from `ACCESSIBILITY.md`)

- Drag has tap-tap and full keyboard equivalents (above); every dot is a focusable button
  with a name ("oxygen, loner 1 of 2").
- Pulsing marks loners but so does the label/pattern (open dot vs filled pair) and the text
  counter; under `prefers-reduced-motion` loners are outlined instead of pulsing.
- Ring counters have text; coach and hints in an `aria-live="polite"` region; lock is assertive.
- Colour never carries meaning: element identity is the symbol, not the colour.
- No timer. Targets ≥ 44 px on touch (`useInputMethod`), dots enlarged on touch.

## Definition of done (beyond the generic checklist)

- [ ] `npx vitest run lewis` green: all 18 molecules complete under `isComplete`; every
      generated flawed drawing is diagnosed correctly and is not `none`; derived unpaired
      counts match a hand table for H, C, N, O, Cl, S, P; bond and lone-pair counts per
      molecule match a hand table (a double bond counts once).
- [ ] Every message key exists in `lewis-structures-messages.ts`; instructions auto-open on
      first play; both guided molecules run once and never again; Support mode persists.
- [ ] Keyboard-only and touch-only playthroughs to victory; reduced-motion playthrough of
      Level 1.
- [ ] Concept seed year level changed to `Year 10`; cheat sheet `lewis-structures` gains a
      Year 10 essentials section; `games.is_active = true` in a new migration; one
      `game_sessions` row per full run.

## Decisions (rev 3, 2026-09-16 — science-teacher call)

1. **Molecule list: 18, ordered by familiarity.** Kept the molecules students meet by name
   (H₂, Cl₂, HCl, H₂O, NH₃, CH₄, CO₂, O₂, N₂, C₂H₆, C₂H₄, ethanol) plus H₂S and PH₃ placed
   *after* their Group 16/15 analogues as deliberate "periodic table predicts bonding" rounds.
   Cut OF₂ and HCN (never met at Year 10; OF₂'s central-atom question is a trap with no
   payoff; C₂H₂ and N₂ already cover triple bonds), F₂ and Br₂ (add nothing Cl₂ doesn't) and
   CH₂O (not in common Year 10 texts); swapped methanol for ethanol (familiar). Every remaining
   molecule is something the student could be asked about in class.
2. **Reading in the other direction — counting, not typing.** Marking mode ends with "how
   many bonds / how many lone pairs", tapped on the structure — exactly what a mark scheme
   checks. Typing `H-O-H` was rejected: it breaks for branched molecules and tests spelling.
   A "draw it as lines" toggle is a possible later feature, not part of this brief.
3. **Title: Share to Fill.** Students remember a game whose name is the rule; "Octet
   Architect" uses a word they haven't learned yet and hides what you do, and the hub uses
   plain titles. *Octet* is still taught — in the glossary and the "8 of 8" counter.

### Rev 4 (2026-09-17 — Stella)

4. **No symbolic side panel.** The card beside the canvas that repeated the formula (already
   in the header), listed the bonds as text ("O-H · O-H") and gave per-atom rows was removed:
   it added no value over the bond lines drawn on the canvas, the text counters under each
   atom, and the completion message's bond-line and counts. The symbolic layer is now those
   three things. (`ui.symbolic.*` keys removed from the catalogue; the marking sheet still
   shows each molecule's formula, bond-line and counts.)

## Catalogue additions (build, 2026-09-17 — for Stella's review)

`AGENT_INSTRUCTIONS.md` step 7b: "If the brief's catalogue is missing a situation the game can
produce, add the key to the brief first, then implement." The build reached the situations
below that rev 3 did not name. All copy lives in `lewis-structures-messages.ts`; none of the
rev 3 keys or wording changed. Please approve or reword.

| Key | When | Text |
|---|---|---|
| `coach.deadEnd` | the only loners left are on one atom (or none), so a shared pair must be undone — e.g. O–O paired first in CO₂ | "{Atom} has {count} of 8, but no other atom has a loner left to share. Tap a shared pair to undo it, then try a different partner." |
| `coach.isomer` | every atom is full but the atoms are joined differently from the target (only ethanol can reach this: dimethyl ether) | "Every atom is full, but the atoms are joined up differently from {name}. Tap a shared pair to undo it and try another arrangement." |
| `coach.central` | Level 4 round start (the brief's "the atom with the most loners usually goes in the middle") | "The atom with the most loners usually goes in the middle." |
| `hint.tier3Undo` | tier 3 when the drawing has wandered off the target | "Tap the shared pair between {atom1} and {atom2} to undo it." |
| `hint.offerTier2` | after `stuckAfterSeconds` | "Still stuck? Press the lightbulb again for the strategy." |
| `hint.noMoreHints` | tier 3 requested on a finished structure | "That was the last hint. Every atom is full — press Next." |
| `hint.inspect.tier1/2/3`, `tier3Correct`, `tier3Count` | the hint ladder in Mode B (Level 5 is "hint ladder only", so the ladder needs Mode B text) | tier 1 "Count the dots around each atom. Every atom should have 8 — hydrogen 2." · tier 2 "Check the atoms with the most bonds first. That is where extra or missing pairs hide." · tier 3 "{Atom} has {count}. Tap it, then choose what is wrong." / "Every atom is full and nothing is left over — press 'This one is correct'." / counting: "Every line between two atoms is one bond. There are {n}." |
| `inspect.classmate`, `inspect.prompt` | Mode B round start | "Drawn by a classmate: {name}." "Tap the atom you think is wrong — or say the drawing is correct." |
| `inspect.diagnosisPrompt` | after tapping an atom | "What is wrong with {atom}?" |
| `inspect.explain.*` | the "{Explanation of the actual error}" slot in `inspect.wrongDiagnosis` | tooMany "{Atom} has more than {full} — an extra lone pair was drawn." · tooFew "{Atom} has fewer than 8 — a lone pair is missing." · hydrogenFull "Hydrogen has 4 — it can only share one pair." · needsDouble "{A} and {B} each still have a loner — they need to share twice." · leftover "{Atom} has a loner left over — an extra electron was drawn." |
| `inspect.notCorrect` | "This one is correct" pressed on a flawed drawing | "Not quite — one atom isn't right. Count the dots around each atom and tap the one that's off." |
| `inspect.repair`, `inspect.repaired` | after the right diagnosis / once repaired | "Now fix it: pair up the loners until every atom is full." "Fixed — every atom is full again." |
| `inspect.countRight`, `inspect.countLabel` | a correct count / the live tally | "Yes — 4 bonds." · "Counted: 4 bonds" |
| `overlay.levelChanges[n]` | the "{what changes}" slot of `overlay.levelUp` | 2 "oxygen, nitrogen and carbon bring lone pairs that stay put, and every third molecule is a classmate's drawing to check." · 3 "some atoms need to share twice — a double bond. The coach now waits until you ask." · 4 "atoms start unplaced. You choose which one goes in the middle." · 5 "marking mode — six classmate drawings, no coach, hint ladder only." |
| `ui.*` | button labels and accessible names | Next molecule · Next drawing · Finish level · Skip guide · Next · This one is correct · Done counting · Open marking sheet · Back · Play again · Support mode (+ help text) · per-dot names ("Oxygen, loner 1 of 2", "Oxygen, lone pair 1 of 2"), bond names ("Single bond between oxygen and hydrogen — press to undo"), live announcements |

Build decisions that touch the pedagogy (also for review):

- **"Misplace H as central" is folded into "give H two bonds".** A bridging-H drawing (X–H–Y)
  leaves *two* atoms wrong (H has 4; X or Y lost a pair), which does not fit the tap-one-atom
  flow. The `hydrogenFull` drawing instead turns a lone pair on hydrogen's partner into a
  second shared pair with that hydrogen (H=X), so hydrogen alone is wrong and the repair is
  local. The diagnosis text is unchanged.
- **Repair = reset the wrong atom, then pair.** Adding or deleting electrons is not a Mode A
  tool, so after a correct diagnosis the wrong atom is reset to its own electrons (partners
  keep theirs as loners) and the player finishes with pairing. `needsDouble` needs no reset.
  `prepareRepair()` is unit-tested: every generated drawing is repairable by pairing alone.
- **"How many bonds?" counts bonds, not shared pairs.** Tapping either line of a double bond
  selects the whole bond, so a double bond can only ever be counted once; the "a double bond
  counts as one bond but two shared pairs" sentence appears when the molecule has one.
- **Rings follow the counters.** The fill ring is the same scaffold as the "O: 6 of 8" text:
  shown while counters are always on (Levels 1–3), hidden with them from Level 4 so marking
  mode is about counting dots.
- `coach.needsMore` is kept in the catalogue but cannot occur in a valence-consistent
  drawing (an atom with no loner is always full), so the dead-end message covers that case.
- `{n} loner(s)` is rendered with real plurals ("1 loner", "2 loners").
- **Molecule `tier2Hint`, `propertyLine` and `bondLine` text** was written during the build
  (the brief specifies the fields, with one example each) — see `lewis-molecules.ts`.

## Languages

Ships in every locale in `LOCALES` (`docs/i18n/GAMES.md`). English is the canonical text
above; each other locale is a translation of it, checked against `docs/i18n/glossary-<locale>.md`.

**Status (2026-09-18):** built in English only. `lewis-structures-messages.ts` has no German
(or other) counterpart yet; the `i18n` branch lists this game under "Known gaps" and notes
the German glossary already fixes its terms (*Lewis-Formel*, *freies Elektronenpaar*,
*Atombindung*, *Valenzelektronen*, *Oktettregel*). Translating the catalogue into every locale
is the open item; the four language checks have not been run.

| Locale | Title | Kind | Hub description | Notes / alternative |
|---|---|---|---|---|
| en | Share to Fill | — | Pair up the loners to build a molecule. | The title is the rule (rev 3 decision). |
| de | Schalen füllen | adaptation | Bring die Einzelgänger zusammen und baue ein Molekül. | Proposal: names the rule (fill the shells) in the imperative pattern the German hub already uses (*Neutralisieren!*). A literal *Teilen* is avoided because it also means *divide*. Alternative: *Volle Schale*. Check it does not read as a chore. > YOU DECIDE |
| fr, es, it, ru | — | — | — | filled when the locale is added (`docs/i18n/README.md` § Adding a locale) |

**Terms to fix in each glossary before translating:** the coined **loner** (unpaired electron —
de candidates: *Einzelgänger* as the game word, glossed as *ungepaartes Elektron*; decide one),
lone pair (*freies Elektronenpaar*), shared pair / bond (*bindendes Elektronenpaar* /
*Atombindung*), single / double / triple bond, octet and **duet** (de: *Oktettregel*; the
hydrogen "full at 2" rule — *Duett-Regel* or *Edelgasregel*, decide), outer / valence electron
(*Valenzelektronen* — the game says *outer electron* at Year 10; keep that register),
Lewis structure (*Lewis-Formel*), the *marking sheet* of inspect mode, *Support mode*.
**Chemistry names the game introduces:** the 18 molecules in `lewis-molecules.ts` — those not in
`compounds.ts` need a name in `chemistry-names/<locale>.ts` keyed by molecule id (H₂, Cl₂, N₂,
O₂ and the hydrides are element names plus a molecular name, e.g. de *Wasserstoff* for H₂).
**Dataset prose to overlay:** `lewis-molecules.ts` `name`, `tier2Hint`, `propertyLine`,
`bondLine` is notation and stays.
**Count-dependent strings:** "{n} loner(s)", the bond and lone-pair counts in `coach.complete`,
`success.round` and the counting questions, "{count} of 8".
