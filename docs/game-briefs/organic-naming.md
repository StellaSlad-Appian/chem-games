# Game Concept Brief: Carbon Chain Namer (Organic Chemistry & IUPAC Naming)

**Status:** Draft — needs your review. Highest-effort brief; build after Functional Groups.
**Proposed slug:** `chain-namer`
**Target concept(s):** IUPAC naming of simple organic molecules — longest carbon chain (root),
saturation (-ane/-ene/-yne) and position, substituents (methyl/ethyl/halo) with locants and
alphabetical order, and functional-group suffixes (-ol, -al, -one, -oic acid); the reverse
skill (name → structure).
**Target year level:** Senior (Year 11–12)
**Curriculum reference:** _TBD_

## Johnstone's Triplet mapping

- **Symbolic (primary):** the IUPAC name is assembled from tokens: locants (`2`, `2,3-`),
  multipliers (`di-`), substituents (`methyl`, `chloro`), root (`but-`), unsaturation (`-2-en-`),
  suffix (`-ol`, `-oic acid`).
- **Submicroscopic (live-linked):** the structure is on screen. Every token placed highlights
  exactly what it names: `but-` pulses the longest 4-carbon chain (and if the player picked
  `prop-`, the game shows the longer chain they missed); a locant highlights the numbered carbon
  and shows the numbering direction; `di-` highlights both substituents.
- **Macroscopic:** minimal — a bottle label is printed on success. (Optionally boiling-point
  ordering as a later "properties" mode.)

## Core loop

Mode A (structure → name): a structure is shown; the player builds the name from the tray in
IUPAC order. The rules are the physics: the tray's root options are validated against the actual
longest chain; locant options are validated against lowest-locant numbering; the game will not
accept `3-methylbutane` when numbering from the other end gives `2-`.

Mode B (name → structure): a name is given; the player builds the carbon skeleton on a small
grid (add carbon, add bond order, add substituent). The name derived from their structure is
shown live; win when it matches.

## Win / lose conditions

- Round win: name exactly correct (tolerate hyphen/comma formatting; enforce order and locants).
- Mistakes are diagnostic and structural ("Your chain has 4 carbons, but there's a 5-carbon path
  through the branch — highlighted"). No hard fail.

## Difficulty progression

| Level | Content | Scaffolding |
|---|---|---|
| 1 | Straight-chain alkanes C1–C8 | Chain auto-numbered; tray has only roots |
| 2 | One methyl/ethyl branch → locants, lowest-locant rule | Numbering shown both ways; player picks |
| 3 | Alkenes/alkynes with position (but-1-ene vs but-2-ene), simple halo | No auto-numbering |
| 4 | Multiple substituents: `di-`/`tri-`, alphabetical order (ethyl before methyl, ignore di-) | Alphabet hint on request |
| 5 | Functional-group suffixes: alcohols (propan-2-ol), aldehydes, ketones, carboxylic acids; suffix takes numbering priority | None |
| 6 (stretch) | Mode B name → structure; geometric (cis/trans) isomers | None |

## Known misconceptions to guard against

- Choosing the *drawn* horizontal chain as the parent rather than the longest chain — the
  highlight of the missed longer path is the core teaching moment.
- Numbering from the wrong end (lowest locants; suffix group gets priority over substituents).
- Alphabetising with the multiplier (`dimethyl` under *d*) — it goes under *m*.
- `-ene` position vs substituent position confusion.
- Treating `CH3` on the end of a chain as a "methyl group".

## Scope decision (important)

Two ways to build the validator:

1. **Curated dataset, no naming engine (recommended MVP):** ~60–100 molecules in
   `organic-molecules.ts` each with a structure (graph or SMILES-like string), the correct name
   *as an ordered token list*, and precomputed metadata (longest chain carbons, valid numbering
   direction). Highlight behaviour is data-driven. Mode A fully works; Mode B is limited to
   molecules in the dataset.
2. **Rule-based IUPAC engine for a restricted grammar** (acyclic, ≤ C8, ≤ 3 substituents, one
   functional group): longest-chain search, lowest-locant tie-breaks, alphabetical ordering,
   suffix priority. Needed for a free-form Mode B. Substantial, must be unit-tested against
   hundreds of cases; naming edge cases (rings, multiple functional groups, E/Z) are out of
   scope.

> YOU DECIDE: MVP with the curated dataset, engine later? (Recommended.)

## Platform reuse

- Shared `organic-molecules.ts` with Functional Groups (Reagent Bench) — same molecules, add
  `iupacTokens[]`.
- Token tray component shared with Name Assembler / Ion Forge.
- Structure renderer: condensed formulas via `MoleculeText` first; skeletal SVG renderer is the
  README's "shared molecular visualisation component" and would serve this, Reagent Bench, and
  Bond Builder — worth building once, properly.

## Accessibility notes

Token assembly via keyboard; every highlight has a text equivalent ("longest chain: carbons
1–5"). Structure grid in Mode B must be keyboard-navigable (arrow keys move, Enter places).
No timer.

## Open questions for you

1. Structural representation: skeletal (zig-zag), displayed (all H), or condensed (`CH3CH2OH`)?
   Skeletal matches Senior exams but needs the SVG renderer.
2. Which functional groups are in your syllabus for naming (esters and amines are often named
   differently)?
3. Is cis/trans (or E/Z) required?
