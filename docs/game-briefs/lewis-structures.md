# Game Concept Brief: Octet Architect (Lewis Structures)

**Status:** Draft — needs your review. **Resolve the Bond Builder overlap first.**
**Proposed slug:** `octet-architect` (or fold into `bond-builder`)
**Target concept(s):** Counting valence electrons; drawing Lewis (electron-dot) structures;
single/double/triple bonds; lone pairs; octet/duet rule; formal charge; polyatomic ions;
(Senior) octet exceptions.
**Target year level:** Year 10 → Senior
> YOU DECIDE: README says Bond Builder is in development and `chemistry.ts` already defines
> `BondOrder`, `ValenceConfig`, `BondConnection`. Is Lewis Structures a *mode* of Bond Builder,
> a replacement, or a separate game? Building both separately would duplicate the atom/bond canvas.
**Curriculum reference:** _TBD_

## Johnstone's Triplet mapping

- **Submicroscopic (primary):** atoms with valence electrons as dots in an electron-cloud style
  halo (not planetary orbits — see anti-patterns). The player drags electrons between atoms to
  form shared pairs, or converts lone pairs into bonds.
- **Symbolic (live):** the structure's formula, total electron count used/available
  (`used 8 / 8`), bond orders, and per-atom formal charge update on every move. For ions the
  overall charge is shown in square brackets.
- **Macroscopic:** a "stability" meter — the molecule visibly relaxes/glows steady when every
  atom satisfies its octet (duet for H) with the correct total electron count; unsatisfied atoms
  jitter. The meter is a metaphor for energy, labelled as such.

## Core loop

Target: "Build CO₂." The player is given the atoms and an electron budget equal to the total
valence electrons (from `elements.ts`). They place bonds and lone pairs. The rules *are* the
physics: you cannot exceed the electron budget, and the molecule doesn't stabilise until every
atom's octet is satisfied and formal charges are minimised. Wrong-but-legal structures (e.g.
C=O with a lone pair on C) don't crash — they show a non-zero formal charge and a hint.

## Win / lose conditions

- Round win: valid structure (electron count exact, octets satisfied, minimal formal charges).
  Where resonance exists, any valid resonance form wins and the others are shown afterwards.
- No hard fail. Mistake feedback is diagnostic ("Oxygen has 6 electrons — it needs 2 more. Try
  converting a lone pair on carbon into a second bond").

## Difficulty progression

| Level | Content | Scaffolding |
|---|---|---|
| 1 | Diatomics & simple singles: H₂, Cl₂, HCl, H₂O, NH₃, CH₄ | Electron budget shown; octet counter per atom visible |
| 2 | Double & triple bonds: O₂, CO₂, N₂, HCN, C₂H₄ | Budget shown; octet counters visible |
| 3 | Polyatomic ions: OH⁻, NH₄⁺, NO₃⁻ (resonance), CO₃²⁻, SO₄²⁻ | Budget adjusted for charge (explained once); counters on hover |
| 4 | Formal charge decides: CO, N₂O, SCN⁻ | No counters; formal charge readout only |
| 5 (Senior) | Exceptions: BF₃ (incomplete), PCl₅/SF₆ (expanded), NO (odd electron) | Explicit "exceptions" banner — see misconceptions |

## Known misconceptions to guard against

- **Planetary orbits** — render electrons as dots in a soft cloud, never on rings. Add the scale
  disclaimer ("dots show valence electrons, not positions").
- "Octet is a law" — Level 5 exists to show it's a rule of thumb; don't teach exceptions before
  the rule is solid.
- Formal charge ≠ oxidation state — label carefully; keep oxidation state out of this game.
- Lone pairs "don't count" — the electron budget makes them count.
- Equating bond count with stability — the stability meter must reflect octet + formal charge,
  not "more bonds = better".

## Platform reuse

- `elements.ts` has `valenceElectrons` for every element; `ValenceConfig.maxBonds` and
  `preferredGeometry` exist in `chemistry.ts` (unused so far).
- `BondConnection`/`BondOrder` types — use them; this is the intended data model for Bond Builder.
- Validation is a pure function `validateLewis(structure)` → unit-test heavily (octet, duet,
  budget, formal charge = V − N − B/2).
- Geometry (VSEPR) is out of scope here; leave a hook for a later "Shape" game.

## Accessibility notes

Drag electrons must have a click/keyboard alternative: select atom → choose "add bond to…" /
"add lone pair" from a small menu. Announce per-atom electron counts via live region.
The stability meter needs a text state ("stable" / "2 atoms need electrons").

## Open questions for you

1. Merge with Bond Builder? (Recommendation: yes — Lewis structures *are* the bonding canvas; add
   ionic transfer as a separate mode later.)
2. Resonance: show all forms, or accept one and move on?
3. Level 5 exceptions — in scope for your Senior course?
