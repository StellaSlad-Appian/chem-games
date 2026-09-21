# Redesign: *Atoms, Isotopes & the Periodic Table*

Two reviews of the sheet as it stands, the gaps they agree on, and a technical
plan for fixing them. Two things change: the sheet **splits into two** along the
line the Victorian Curriculum itself draws, and the "first twenty elements"
lookup is replaced by an **interactive periodic table**.

Status: **proposal**. Nothing here is built. The reviews are sections 1–3, the
curriculum research and the split are 4, the architecture is 5–10, the diagram
prompts are 12, and the acceptance criteria are 14.

**The split in one line:** `atomic-structure` keeps its slug and becomes the
Year 9 sheet on **VC2S10U07** (the periodic table and what its organisation
predicts); a new `isotopes-and-radioactivity` sheet takes **VC2S10U06**
(isotopes, decay, half-life, made elements). Both sit in the same Levels 9–10
band — the year labels are this site's sequencing, not a curriculum boundary.
See §4.

Read alongside:
[`atomic-structure-cheat-sheet-prompt.md`](./atomic-structure-cheat-sheet-prompt.md)
(the brief the sheet was built from), [`../CHEAT_SHEET_IMAGES.md`](../CHEAT_SHEET_IMAGES.md),
[`../AGENT_INSTRUCTIONS.md`](../AGENT_INSTRUCTIONS.md) Part A, and
[`../ACCESSIBILITY.md`](../ACCESSIBILITY.md).

---

## 1. Review — a high-school chemistry teacher

What is here is accurate, well-levelled and unusually careful about the
electron-cloud misconception. The prose is genuinely good. What follows is what
a teacher would write in the margin before putting it in front of a class.

### 1.1 The title promises a periodic table the sheet never delivers

Seven sections, two tables, and the reader never sees a periodic table. *Group*
and *period* are never defined. The only sentence that touches the table's
structure is in section 5 — "Elements are placed in the same group when they
have the same outer count" — and it uses "group" before the sheet has said that
a group is a column.

A Year 9 student is expected to be able to *use* the table: find an element,
read its atomic number and relative atomic mass off the cell, identify its group
and period, and predict something from its position. None of that is on the
sheet.

### 1.2 Metals, non-metals and metalloids are absent

This is the first classification a Year 9 class meets and one of the most often
assessed — the staircase, where the metals are, why the left-hand side behaves
differently from the right. The word "metal" does not appear on the sheet.
Neither do *halogen*, *noble gas* or *alkali metal*, despite the sheet's own
argument being that a group behaves alike — which is exactly what those names
are for.

### 1.3 The sheet stops one step short of ions, and ions are the payoff

Section 5 establishes that the outer-level count drives reactivity, and then
stops. It never says *what* atoms do about a part-full outer level: lose or gain
electrons to reach a full one, which is why group 1 forms 1+, group 2 forms 2+,
group 17 forms 1− and group 18 forms nothing.

That single paragraph is the bridge from this sheet to every other sheet on the
site — *Acids & Bases* assumes H+, *Balancing Chemical Equations* assumes
polyatomic ions, *Lewis Structures* assumes valence counting. Without it, this
sheet is a dead end rather than the foundation it is positioned as.
`commonMistakes` even carries "thinking an ion is a different element", so the
sheet asks students to get ions right in a topic it never taught.

### 1.4 Nothing is worked through

Every quantitative claim is asserted. In particular:

- **Relative atomic mass.** The sheet says chlorine averages 35.5 and never
  shows `(0.75 × 35) + (0.25 × 37) = 35.5`. This calculation is examinable. A
  student who reaches for the obvious `(35 + 37) / 2 = 36` has nothing on the
  page to correct them.
- **Neutron count.** "Mass number is protons plus neutrons" is stated; the
  rearrangement a student actually performs — neutrons = mass number − atomic
  number — appears only in the alt text of a diagram that does not exist yet.
- **Half-life.** Defined in one clause, with no number, no example and no "after
  three half-lives, an eighth is left".

### 1.5 The number on the wall chart is not the number on the sheet

The sheet teaches mass number (35) and relative atomic mass (35.5) in adjacent
sections, and never shows the periodic-table cell where a student meets them. So
the sheet creates the classic question — "is chlorine's mass number 35.45?" —
and leaves it unanswered. A labelled cell is the standard fix and is missing.

### 1.6 Isotope notation is taught in one form and examined in another

Everything uses the hyphenated form (`Cl-35`). The nuclide symbol, with the mass
number written above the atomic number, is what appears in VCE papers, and it is
what diagram slot 2 is specified to draw — but the sheet's own `formulaExamples`
never show it, so the diagram will introduce a notation the prose has not. Both
forms should appear, with a sentence saying they mean the same thing.

### 1.7 "Shell" is never mentioned

The sheet says *energy level* throughout, correctly and deliberately. Most
classrooms and most textbooks say *shell*. A student whose teacher says "shell"
will not recognise the sheet as being about the same thing. One clause — "your
teacher may call these shells" — costs nothing and closes the gap, and it is
consistent with the sheet's existing policy of naming models honestly.

### 1.8 The 2, 8, 8 hedge sets a trap

"then 8 again for the first twenty elements" is a careful and correct hedge, but
the student who counts past calcium finds it fails and has no explanation. One
clause — "the third level can actually hold 18; you meet why in Year 11" — turns
a trap into a signpost.

### 1.9 Radioactivity is one paragraph with no vocabulary

Alpha, beta and gamma do not appear. Neither does fission. The sheet exists in
part to unblock twelve Explore scientists — Meitner on a nucleus splitting,
Curie on isolating an element by its radioactivity, Perey on the last element
found in nature — and a teacher following one of those links lands on a
paragraph that cannot support it.

### 1.10 Smaller marks in the margin

- **No practice.** `relatedGames` is empty. On a site whose premise is learning
  by playing, the flagship Year 9 fundamentals sheet is the one page with
  nothing to do. That is honest — no current game practises this — but it is a
  gap, and the interactive table is the obvious answer to it.
- **The curriculum reference is prose, not a code.** Teachers paste these into
  planning documents. `curriculumRef` names "Victorian Curriculum Science
  Level 9" without a content-descriptor code. **Verify before citing one** — do
  not invent a code.
- **No teacher-facing material**: no printable, no misconception diagnostic, no
  suggested sequence. Out of scope here; noted for `TEACHERS_PAGE.md`.

---

## 2. Review — a Year 9 student

Written as the student would say it, because that is the useful form.

> **"Where's the actual periodic table?"** It's in the title. There are 118
> elements on the poster in our classroom and this page has a list of 20 going
> *down*. I can't see any pattern in a list.

> **"2, 8, 1 — is that a code?"** There's a note saying "outer level last" but
> it's small and above the table, and I read the table first. Which end is the
> outside?

> **"Weighted average of what?"** It says three-quarters and one-quarter but
> never does the sum. I tried adding 35 and 37 and halving it, got 36, and I
> don't know why that's wrong.

> **"Relative to what?"** It keeps saying *relative* atomic mass. Carbon-12 is
> mentioned once, in a grey box at the top of the page that I skipped.

> **"Why do I care about isotopes?"** They're the same but heavier. Fine. So?
> Nothing tells me where they show up — carbon dating, smoke alarms, medical
> scans. There's a bit about radioactivity at the bottom but it's one paragraph
> and it doesn't connect to anything.

> **"My teacher says shells. This says energy levels."** Same thing? Different
> thing? The page doesn't say.

> **"All the pictures are missing."** Every section has a grey dashed box that
> says DIAGRAM TO COME. Seven of them. That's what the page actually looks like
> right now.

> **"There's nothing to do."** Every other bit of this site is a game. This is a
> wall of writing and then a link to someone else's website.

> **"Half-life"** is one sentence and I still don't know how to use it.

> **"Some words aren't explained"** — nuclide, abundance, accelerator, decay.
> The games have those dotted-underline words you can tap. This page doesn't.

> **"On my phone"** it's one long scroll with no way to jump, and the
> twenty-element table scrolls sideways inside a page that already scrolls.

---

## 3. What the two reviews agree on

Ranked by how much each one costs a student, highest first.

| # | Gap | Teacher | Student | Fix |
|---|---|---|---|---|
| 1 | No periodic table on a sheet named after one | 1.1 | "where's the table" | §5 — the interactive table |
| 2 | Ion formation never taught; the sheet dead-ends | 1.3 | — | New section + diagram 10 |
| 3 | Nothing worked through (mass, neutrons, half-life) | 1.4 | "weighted average of what" | Worked examples + diagrams 04, 07 |
| 4 | Metals/non-metals/metalloids and family names absent | 1.2 | — | Table view modes |
| 5 | The table cell is never explained | 1.5 | "35 or 35.45?" | New diagram 08 |
| 6 | Seven diagrams are placeholders | — | "all the pictures are missing" | §12 |
| 7 | Isotope vs ion never contrasted | 1.3 | — | New diagram 09 |
| 8 | Two notations, only one taught | 1.6 | — | Prose + `formulaExamples` |
| 9 | "Shell" never mentioned; the 2, 8, 8 trap | 1.7, 1.8 | "my teacher says shells" | Two clauses |
| 10 | Radioactivity has no vocabulary | 1.9 | "so what" | Section rewrite |
| 11 | No practice, nothing interactive | 1.10 | "nothing to do" | The table is the practice surface |
| 12 | No glossary pop-overs | — | "words aren't explained" | Reuse `GlossaryTerm` |

---

## 4. The Victorian Curriculum, researched — and where the split falls

Researched against the live **Victorian Curriculum F–10 Version 2.0** Science
curriculum at
<https://f10.vcaa.vic.edu.au/learning-areas/science/curriculum>, with every band
and every elaboration expanded (about 208,000 characters of rendered text).
Codes and wording below are quoted from that page, not recalled.

### 4.1 The finding that changes the question

**V2.0 Science bands Levels 9 and 10 together.** There is no Level 9 content
description and no Level 10 content description — there is a *Levels 9 and 10*
band, whose codes are all numbered `VC2S10U…`, and a single band achievement
standard beginning "By the end of Level 10…". VCAA's own scope-and-sequence
chart is published as "Science Levels 7–10" and, in its own words, "contains
achievement standards and content descriptions only" — it does not allocate the
band across the two years either.

So "split the sheet along the Year 9 / Year 10 boundary" has no curriculum line
to follow, because the curriculum does not draw one. **But it draws a better
one**: within the 9–10 band, atomic structure is split across *two separate
content descriptions*, and that division maps almost exactly onto the two sheets
you want.

### 4.2 The three content descriptions that matter

**Levels 7 and 8 — the floor this sheet builds on**

> **VC2S8U07** — "the atomic theory of matter can be used to model and explain
> the difference between elements, compounds and mixtures; elements, compounds
> and mixtures can be represented as two-dimensional and three-dimensional
> models, elements can be represented by symbols, and molecules and compounds
> can be represented by chemical formulas"

**Levels 9 and 10 — the two descriptions the sheet spans**

> **VC2S10U06** — "the model of the atom changed following the discovery of
> electrons, protons and neutrons; **natural radioactive decay results in a
> change from unstable to stable atoms**"
>
> Elaborations:
> - comparing the masses and charges of protons, neutrons and electrons, and
>   examining how the discovery of these particles resulted from experimental
>   evidence
> - **explaining that differences in the number of neutrons in atoms of the same
>   element results in isotopes**, and that naturally occurring isotopes of some
>   elements are unstable
> - describing in simple terms how different unstable isotopes decay, such as
>   **radon-222 emitting an alpha particle, iodine-131 emitting a beta particle
>   and cobalt-60 emitting gamma radiation** to form stable atoms
> - **defining half-life**, examining the timescales of decay of different
>   elements such as **carbon-14 and uranium-238**, and simulating or using
>   digital simulations to examine radioactive decay, including half-life
> - researching how radiocarbon and other dating methods including optically
>   stimulated luminescence have been used to establish that **Aboriginal and
>   Torres Strait Islander Peoples have been present on the Australian continent
>   for at least 65,000 years**
> - identifying where applications of radioactivity are used in medicine and
>   industry, such as in diagnosing and treating cancer, and when checking for
>   faults in materials used in aircraft and spacecraft

> **VC2S10U07** — "the organisation of the elements in the periodic table is
> related to the structure and properties of atoms; patterns and trends include
> the significance of **rows and periods**, **metallic and non-metallic
> properties**, **atomic size and reactivity**"
>
> Elaborations:
> - examining the significance of **groups and periods** in the periodic table
> - analysing patterns in chemical reactivity of some elements by reacting them
>   with oxygen, water and acids, to discern that elements in the same group have
>   similar properties
> - investigating the physical properties of some **metals and non-metals**
> - **using the Bohr model of the atom to describe the structure of atoms in
>   terms of electron shells**, and relating the electron arrangements in
>   different atoms to the properties and positions of their elements in the
>   periodic table
> - **deducing that repeating patterns of the periodic table reflect patterns of
>   electrons in outer electron shells**
> - conducting flame tests for a selection of elements and examining emission
>   spectra

("rows and periods" is the wording in the content description; the elaboration
says "groups and periods". Quote the code, use the elaboration's vocabulary.)

**The band achievement standard**, in the two sentences that bear on this sheet:

> "They explain how ideas about the structure of the atom have changed over
> time, and model natural radioactive decay to illustrate how stable atoms are
> formed. They describe patterns and trends in the periodic table."

One sentence per content description — which is the clearest signal that VCAA
treats these as two assessable things.

### 4.3 Words that are *not* in V2.0 F–10 Science at all

Counted across the fully expanded curriculum, all bands, all elaborations:

| Term | Occurrences | Consequence |
|---|---|---|
| `isotope` | 3 | In VC2S10U06's elaborations only — never in a content description |
| `half-life` | 2 | VC2S10U06 elaborations |
| `electron shell` | 2 | VC2S10U07 elaborations — **the curriculum's own word is "shell"** |
| `atomic size` | 2 | In the VC2S10U07 description itself |
| `reactivity` | 3 | In the VC2S10U07 description itself |
| `atomic number` | **0** | Not named anywhere in F–10 |
| `mass number` | **0** | Not named anywhere in F–10 |
| `relative atomic mass` | **0** | Not named anywhere in F–10 — this is VCE Unit 1 |
| `metalloid` | **0** | Only "metallic and non-metallic properties" |
| `valence` | **0** | Not named anywhere in F–10 |

Three things follow.

1. **§1.7 is settled by the curriculum, not by taste.** VC2S10U07 says "electron
   shells" explicitly. The sheet should keep *energy level* as the honest term
   and name *shell* as the curriculum's word, rather than treating them as a
   stylistic choice.
2. **Relative atomic mass, mass number and atomic number are the sheet's own
   extension.** They are not F–10 content. They are indispensable — you cannot
   teach isotopes without them — but the Year 10 sheet should mark the
   weighted-average section as reaching into VCE Unit 1, which is what the
   current sheet's `curriculumRef` already does in prose.
3. **Ion formation (§1.3) is also not in F–10 chemical sciences.** It stays in
   the plan because it is the bridge to the site's other sheets, but it is an
   extension, and the sheet should say so rather than implying it is Year 9
   content.

### 4.4 The split

**Year 9 sheet — VC2S10U07 (plus the particle half of VC2S10U06).**
The atom's parts, how they set an element's position, and everything the
periodic table's organisation predicts.

**Year 10 sheet — VC2S10U06.**
What changes when the neutron count changes: isotopes, stability, decay,
half-life, and the elements that had to be made.

**Say plainly what the year labels are.** Both sheets sit in the same 9–10 band.
`yearLevel` on this site takes a single value, so Year 9 and Year 10 are *this
site's sequencing* — the common Victorian order, and the order the achievement
standard lists them in — not a curriculum boundary. Both sheets'
`curriculumRef` should say so in a clause, because a teacher who checks will
find the band and should not conclude the site got it wrong.

### 4.5 What moves, section by section

Everything currently on the sheet, allocated:

| Current section / field | Goes to | Curriculum basis |
|---|---|---|
| "What an atom is made of" | **Year 9** | VC2S10U06 el. 1 (masses and charges of p/n/e) |
| "The three subatomic particles" table | **Year 9** | VC2S10U06 el. 1 |
| "Atomic number and mass number" | **Year 9**, with a one-line recap on Year 10 | Extension; needed to read a cell and to define a nuclide |
| "Electrons, energy levels and the shape of the table" | **Year 9** | VC2S10U07 el. 4, el. 5 — Bohr shells, outer-shell patterns |
| "Ordered by atomic number, not by mass" | **Year 9** | VC2S10U07 ("organisation … related to the structure of atoms"); also the SHE strand on knowledge changing |
| The interactive periodic table | **Year 9** (embedded on Year 10 with gated modes) | VC2S10U07 entire |
| "Isotopes" | **Year 10** | VC2S10U06 el. 2 — near-verbatim |
| "Why relative atomic mass is rarely a whole number" | **Year 10**, marked as VCE extension | Not in F–10; VCE Unit 1 |
| "Unstable nuclei, and elements that had to be made" | **Year 10**, split into two sections | VC2S10U06 el. 3, 4, 6 |
| "The first twenty elements" table | **Deleted** | Replaced by the widget (Year 9) |
| `commonMistakes`: orbits, scale, model-vs-reality | **Both** — this is the sheet-level pedagogical contract | `AGENT_INSTRUCTIONS.md` Part A |
| `commonMistakes`: atomic vs mass number | **Year 9** | — |
| `commonMistakes`: RAM as a count; halving the two masses | **Year 10** | — |
| `commonMistakes`: an ion is not a different element | **Year 9** (with the new ion section) | Extension |
| PhET *Build an Atom* | **Year 9** | VC2S10U06 el. 1 |
| PhET *Isotopes and Atomic Mass* | **Year 10** | VC2S10U06 el. 2, 4 |

### 4.6 What the curriculum requires that *neither* sheet has yet

This is the part the original review could not have found without the research.

**Year 9 sheet is missing, and VC2S10U07 names explicitly:**

- **Atomic size as a trend.** It is in the content description itself, and the
  sheet does not mention it. `ELEMENTS_REGISTRY` already carries `atomicRadius`
  for all 118 elements, so this is a view mode with no new data.
- **Reactivity as a trend**, and specifically that elements in the same group
  react similarly with **oxygen, water and acids**. The sheet asserts "a group
  behaves alike" and never says what that looks like.
- **Physical properties of metals vs non-metals** — conductivity, lustre,
  malleability, state. Confirms §1.2 and raises it from "nice" to "mandated".
- **Flame tests and emission spectra.** Genuinely optional (one elaboration),
  but it is the one place the curriculum links electron arrangement to something
  a student can see, and it is a natural Explore link.

**Year 10 sheet is missing, and VC2S10U06 names explicitly:**

- **Named decay examples**: radon-222 → alpha, iodine-131 → beta, cobalt-60 →
  gamma. The curriculum names these three; use them rather than inventing
  others.
- **Half-life with real timescales**: carbon-14 and uranium-238 are both named.
- **Radiocarbon dating and the 65,000-year Aboriginal and Torres Strait
  Islander presence on the Australian continent.** This is a cross-curriculum
  priority elaboration, it is specific, and it is the kind of content an
  Australian curriculum-aligned site is expected to carry. It should be a
  section on the Year 10 sheet, written carefully and with a source — not a
  passing clause. Flag it for review before it ships.
- **Applications in medicine and industry**: diagnosing and treating cancer,
  checking for faults in aircraft and spacecraft materials. This answers the
  student's "why do I care about isotopes?" directly, in the curriculum's own
  examples.

Note what is *not* required and can be dropped or demoted: fission (the sheet's
Meitner link would need it, but the curriculum does not), and synthetic elements
beyond "unstable isotopes decay". Both stay — they serve the Explore entries —
but as clearly-marked extension, not as core.

### 4.7 The view modes, revised against the curriculum

§6 D6 proposed six modes from first principles. Five of them turn out to be
curriculum-mandated, and the research adds two:

| Mode | Basis | Change |
|---|---|---|
| Metals / non-metals / metalloids | VC2S10U07 (explicit) | Keep. Metalloid is an extension — label it. |
| Groups and families | VC2S10U07 el. 1, el. 2 | Keep |
| Outer-shell electrons | VC2S10U07 el. 4, el. 5 | Keep — and rename to the curriculum's "outer shell" |
| **Atomic size** | VC2S10U07 (explicit) | **Add.** `atomicRadius` already in the registry |
| **Reactivity** | VC2S10U07 (explicit) | **Add**, for groups 1, 2, 17, 18 only; `null` elsewhere, as `outerElectrons` does |
| Ion formed | Not in F–10 | Keep as the bridge to other sheets; mark as extension |
| State at 25 °C | Not in F–10 | **Cut** unless it earns its place — it was the weakest of the six |
| Natural or made | VC2S10U06 (decay), Explore | Keep; this is the mode the **Year 10** sheet unlocks |

Gating, per the decision already taken: the Year 9 sheet shows metals,
families, outer shell, atomic size, reactivity and ion formed. The Year 10
sheet embeds the same component with *natural or made* plus metals, and a link
back to the full table.

### 4.8 The Explore scientists re-point

Eleven of the twelve theme-A scientists are about isotopes, decay, or elements
that had to be made — they move to the **Year 10** sheet. Only **Henry
Moseley** (the table is ordered by atomic number) belongs on the Year 9 sheet;
**Glenn Seaborg** arguably belongs on both, since redrawing the table's bottom
rows is a periodic-table story about synthetic elements. This is a link-target
edit in `explore-scientists.md` and in the Explore entry data, and it must
happen in the same milestone as the split or eleven entries point at a sheet
that no longer teaches them.

### 4.9 The two sheets at a glance

| | Year 9 sheet | Year 10 sheet |
|---|---|---|
| `slug` | `atomic-structure` *(unchanged — keeps every inbound link)* | `isotopes-and-radioactivity` |
| `title` | Atoms & the Periodic Table | Isotopes & Radioactivity |
| `yearLevel` | `'Year 9'` | `'Year 10'` |
| `category` | `'Fundamentals'` | `'Fundamentals'` |
| Primary code | VC2S10U07 | VC2S10U06 |
| Also draws on | VC2S10U06 el. 1; VC2S8U07 as assumed knowledge | VC2S10U07 for the table; VCE Unit 1 for relative atomic mass |
| Carries the widget | Yes, six modes | Yes, gated to two |

The title changes from *Atoms, Isotopes & the Periodic Table* — "Isotopes" moves
out of it. The slug stays, so nothing breaks; `cheat_sheets.title` in the
migration updates, and all five overlays restate the title.

### 4.10 Codes for the neighbouring sheets, recorded while I was in there

Out of scope for this change, but §1.10 noted that `curriculumRef` is vague
prose across the whole site, and these were on the same page. Quoted exactly, so
nobody has to re-derive them.

| Sheet | Code | Wording |
|---|---|---|
| *States of Matter* | **VC2S8U05** | "the particle and kinetic theories of matter can be used to describe the arrangement and motion of particles in a substance, including the attraction between particles, and to explain the properties and behaviour of substances, including melting point, boiling point, density, compressibility, gas pressure, viscosity, diffusion, sublimation, and expansion and contraction" |
| *States of Matter* (mixtures) | **VC2S8U06** | "matter can be classified as pure substances such as elements and compounds or impure substances such as mixtures (including solutions) … and can be separated based on the properties of their components using techniques including filtration, decantation, evaporation, crystallisation, magnetic separation, distillation and chromatography" |
| — | **VC2S8U08** | "physical changes can be distinguished from chemical changes; a chemical change can be identified by a colour change, a temperature change, the production of a gas … or the formation of a precipitate" |
| *Balancing Chemical Equations* | **VC2S10U08** | "chemical reactions are described by the Law of Conservation of Mass and involve the rearrangement of atoms; they can be modelled using a range of representations, including word and simple balanced chemical equations" |
| *Reaction types / rates* | **VC2S10U09** | "chemical reactions include synthesis, decomposition and displacement reactions and can be classified as exothermic or endothermic; reaction rates are affected by factors including temperature, concentration, surface area of solid reactants, and catalysts" |

Two things worth someone's attention, both outside this change:

- **The Levels 9–10 chemical sciences strand is only U06–U09.** There is no
  acid–base content description in V2.0 F–10 at all; acids appear once, inside
  VC2S10U07's elaboration about reacting elements with "oxygen, water and
  acids". So the *Acids & Bases* sheet's V2.0 basis is thin, and its current
  `curriculumRef` ("Victorian Curriculum Science Level 10") reads as a
  Version 1.0 reference. Worth re-checking before anyone cites a V2.0 code
  there.
- `VC2S10U09` names **reaction rates and catalysts**, which no sheet on the site
  covers. That is a gap in the sheet set, not in this sheet.

---

## 5. Image or interactive?

**Interactive, and it should replace the twenty-element table rather than sit
next to it.** The reasoning, because it is not only "interactive is nicer":

- **A static image cannot answer a question.** A picture of the table shows a
  student where chlorine is. It cannot show them *which elements have seven
  outer electrons*, which is the idea section 5 is actually teaching. A view
  mode can colour all of them at once, and the pattern — one column — is the
  lesson.
- **A static image of 118 cells is unreadable at 320px.** Rendered into the
  page's `max-w-lg` column, a 640px-wide image of the whole table puts each
  symbol at roughly 3 CSS pixels. It would have to become a link to a bigger
  image, which is a link off the sheet.
- **The data already exists.** `ELEMENTS_REGISTRY` has all 118 elements, and
  `src/i18n/chemistry-names/{de,fr,es,it,ru}.ts` already name all 118 in five
  languages with a test asserting completeness. A static image would be six
  images, one per locale, hand-made, and would go stale silently.
- **An image is not accessible.** 118 labels cannot go in one `alt`. A grid of
  buttons is readable cell by cell by a screen reader and navigable by arrow
  key.
- **It absorbs three diagrams.** Slots 5, 6 and 7 are each specified as "…
  beside the periodic table with X highlighted". The widget does that
  highlighting live, so those three diagrams get smaller and more focused
  instead of each carrying its own tiny unreadable table. Fewer diagrams to
  make, and they stop disagreeing with each other.

The twenty-element table then goes. It is not deleted content — everything in it
(symbol, atomic number, electron arrangement) is in the widget for all 118
elements, and the widget can *show* the repeating pattern that the list could
only assert.

---

## 6. Architecture — the periodic table widget

Eight decisions. Each names the alternative it rejects, because most of the cost
here is in getting these wrong.

### D1. It is a real `<table>`, not a CSS grid

**Decision.** One `<tr>` per period, eighteen `<td>` per row, an empty `<td>`
wherever the table has a gap, plus a spacer row and two further rows for the
f-block. `<th scope="col">` for group numbers, `<th scope="row">` for period
numbers, and a `<caption>`.

**Why.** The periodic table is a table: two headed axes and a cell at each
intersection. Using the element gives row/column header association, keyboard
semantics and screen-reader announcement ("group 17, period 3, Chlorine")
without re-implementing any of it in ARIA. The gaps are pedagogically
meaningful — the shape of the table *is* part of the content — and an empty
`<td>` is an honest gap.

**Rejected: `display: grid` with `grid-column: <group>`.** Overriding `display`
on table elements drops table semantics from the accessibility tree in Chromium
and WebKit, which then has to be rebuilt with `role="table"`/`row`/`cell` — all
the cost of the element with none of the benefit. `table-layout: fixed` over 18
equal columns produces the same layout with no override.

**Rejected: a flat list of 118 absolutely positioned buttons.** Loses the axes,
loses reflow, loses zoom.

### D2. The server renders the data; a thin client island owns interaction

**Decision.** The cheat-sheet page is a statically generated Server Component
and stays one. It builds the localised row array on the server — element names
come from `elementName(locale, symbol)` — and passes it to a single
`'use client'` component that owns exactly two pieces of state: `selected`
(a symbol) and `viewMode`.

**Why.** The element symbols and names land in the initial HTML, so the existing
`i18n.spec.ts` and `latin-leakage.spec.ts` assertions keep working, search
engines see the content, and the page stays static. The payload is about 118
rows of eight short fields — on the order of 10 KB uncompressed, a few KB over
the wire.

**No-JS behaviour, stated rather than hidden:** the full table renders with
symbol, atomic number and relative atomic mass in every cell, and the detail
panel shows a default element. Clicking does nothing. That is strictly more than
the twenty-row list it replaces, and it is an acceptable degradation — but it is
a degradation, and this doc should be the place that says so.

**Rejected: a fully client-side widget.** Element names would have to ship as a
client dictionary, and the text would leave the server-rendered HTML.

### D3. It is a shared component, used by the sheet now

**Decision.** `src/components/periodic-table/`, not
`src/components/cheat-sheets/`. Rendered inline in the sheet in this milestone.
A standalone `/[lang]/periodic-table` route is a follow-up, not scope.

**Why.** A projector-friendly full-page table is something teachers will ask
for, and games will want the same grid for element selection. Putting it under
`cheat-sheets/` now means moving it later.

### D4. A section opts into a widget by name, the way it opts into an icon

**Decision.** Add one optional field to `CheatSheetSection`:

```ts
/** Renders an interactive widget under the prose. See WIDGET_REGISTRY. */
widget?: CheatSheetWidgetName;   // 'periodic-table'
```

and a `WIDGET_REGISTRY` in the page's component layer mapping the name to a
component — exactly the pattern `ChemIcon`'s `ICON_REGISTRY` already uses for
`iconName`.

**Why.** `AGENT_INSTRUCTIONS.md` says chemistry facts do not go in components
and the sheet is data. A widget *name* is structural metadata, like `iconName`,
`colorTheme` or an image `src` — it is not prose, so it never enters the
translation overlay, and `cheat-sheets.test.ts` is untouched by it.

**Rejected: rendering the widget from the slug** (`if (slug === 'atomic-structure')`).
Unfindable, untyped, and it puts page-specific chemistry in the route.

### D5. Element teaching data is a new module that joins to the registry

**Decision.** `src/core-engine/data/periodic-table.ts`, keyed by atomic number,
carrying the fields the registry does not have. `ELEMENTS_REGISTRY` stays the
source of symbol, name, mass and atomic number. A test asserts the join is
total.

```ts
export interface PeriodicTableEntry {
  atomicNumber: number;          // joins to ELEMENTS_REGISTRY
  group: number | null;          // 1–18; null for the f-block
  period: number;                // 1–7
  block: 's' | 'p' | 'd' | 'f';
  category: ElementCategory;     // the union already in types/chemistry.ts
  metalClass: 'metal' | 'non-metal' | 'metalloid';
  shells: number[];              // [2, 8, 1] — school electron arrangement
  outerElectrons: number | null; // null for the d- and f-blocks; see below
  commonIonCharge: number | null;
  stateAt25C: 'solid' | 'liquid' | 'gas';
  occurrence: 'natural' | 'synthetic';
}
```

**Why not widen `ElementData`.** It is load-bearing for five games.
Teaching-only fields on it invite a game to read them, and the shape is already
carrying `variableValenceStates` for game reasons.

> **Do not use `valenceElectrons` from `ELEMENTS_REGISTRY` for any of this.**
> It is not a count of outer-level electrons — it is the common combining number
> the games need. The registry has chromium at 3, copper at 2, gold at 1 and
> copernicium at **12**. Rendering that as "electrons in the outer level" would
> teach something false on the one sheet whose whole purpose is not teaching
> false models. `shells` is authored fresh and tested against a hand-checked
> list.

`outerElectrons` is deliberately `null` across the d- and f-blocks rather than
guessed. The view mode greys those cells and the legend says "not a simple count
at this level" — which is true, is the honest Year 9 answer, and stops the sheet
asserting that iron has 2 outer electrons.

### D6. Six view modes over one table, each with a non-colour carrier

**Decision.** A single row of buttons switches what the cells encode:

| Mode | Encodes | Text carrier in the cell | Teaches |
|---|---|---|---|
| Metals | metal / non-metal / metalloid | `M` / `NM` / `MD` badge | §1.2 — the staircase |
| Families | alkali, alkaline earth, transition, halogen, noble gas, … | family initials | §1.2 — why a group behaves alike |
| Outer electrons | `outerElectrons` 1–8 | the number, printed | §1.1 — the group pattern, made visible |
| Ion formed | `commonIonCharge` | `1+`, `2−`, `—` | §1.3 — the bridge to the rest of the site |
| State at 25 °C | solid / liquid / gas | `s` / `l` / `g` | "what am I actually looking at" |
| Natural or made | natural / synthetic | `nat` / `lab` | §1.9 and the Explore scientists |

**Why this is architecture and not a feature list.** Six modes over one
data-driven table is one component. Six pictures is six components. The mode is
a pure function `(entry, mode) => { tone, badge, legendKey }`, which is unit
testable without rendering anything.

**Colour is never alone.** `ACCESSIBILITY.md` §3 requires it, and the repo's own
red/green note names this as the classic failure. Every mode prints a short text
badge in the cell, and every mode renders a legend.

### D7. Keyboard: one tab stop, arrow keys inside

**Decision.** Roving `tabIndex` — exactly one cell in the table has
`tabIndex={0}`, the rest `-1`. Arrow keys move between neighbours, Home/End go
to the ends of a period, PageUp/PageDown to the ends of a group, Enter or Space
selects. The detail panel carries prev/next buttons stepping by atomic number,
which gives a linear path through all 118 without arrowing across gaps.

**Why.** 118 tab stops before the next paragraph is a keyboard trap in all but
name.

### D8. On small screens the grid scrolls; the page does not

**Decision.** The table sits in its own `overflow-x-auto` region with a visible
scroll affordance and an `aria-describedby` hint. The page itself has no
horizontal scroll at 320px.

**Why.** Eighteen columns at the 24×24 CSS px minimum target size (WCAG 2.5.8)
is 432px — wider than 320px, so it cannot fit. WCAG 1.4.10 exempts content
requiring a two-dimensional layout from the reflow requirement, and a periodic
table is the textbook case. The exemption covers the grid, not the page, which
is why the scroll region is scoped to the grid.

**Rejected: a separate small-screen list view.** A second presentation of the
same data is a second thing to translate, test and keep in step.

---

## 7. Data model and where things live

```
src/core-engine/data/periodic-table.ts        PERIODIC_TABLE: PeriodicTableEntry[]
src/core-engine/tests/periodic-table.test.ts  integrity gate (see §13)
src/core-engine/types/chemistry.ts            PeriodicTableEntry; reuse ElementCategory
src/core-engine/types/general.ts              CheatSheetWidgetName; widget? on CheatSheetSection
src/components/periodic-table/
  PeriodicTable.tsx                           'use client' — owns selected + viewMode
  ElementCell.tsx                             one <td>'s button
  ElementDetail.tsx                           the panel
  ViewModeSwitch.tsx                          the mode buttons
  Legend.tsx                                  the active mode's key
  view-modes.ts                               (entry, mode) => { tone, badge, legendKey }
  view-modes.test.ts
src/app/[lang]/(main)/cheat-sheets/[slug]/page.tsx   WIDGET_REGISTRY lookup
src/i18n/dictionaries/*.ts                    periodicTable.* namespace
```

### Two registry corrections this depends on

1. **`Aluminum` → `Aluminium` and `Cesium` → `Caesium`** in
   `src/core-engine/data/elements.ts`, plus `Cesium Hydroxide` in `compounds.ts`
   and `Cesium Ion` in `ions.ts`. `ACCESSIBILITY.md` §5 sets British/IUPAC
   spelling for English, the cheat sheet already writes "Aluminium", and
   `chemistry-names/de.ts` records choosing IUPAC spellings deliberately. Four
   strings; the overlays key on symbol, so no locale is affected.
2. Leave `valenceElectrons` alone. It is correct for what the games use it for.
   The new module simply does not read it.

---

## 8. Content changes to the sheet

Beyond the widget. All of it is data in `src/lib/cheat-sheet-data.ts`.

> **Written before §4, and §4 supersedes the allocation.** Everything below
> still has to be written; what changed is *which of the two sheets it lands
> on*. Read §4.5 for the section-by-section allocation and §4.6 for the content
> the curriculum requires that this list does not yet mention. The three "new
> sections" below all belong on the **Year 9** sheet.

**Removed**

- The *first twenty elements* table, and its counterpart in all five overlays.
  `cheat-sheets.test.ts` compares tables row for row, so this must be deleted in
  six files in the same commit.

**New sections**

1. **"Reading the periodic table"** — a group is a column, a period is a row,
   and what each number in a cell is. Carries diagram 08 and sits immediately
   before the widget.
2. **"Why atoms form ions"** — a full outer level; group 1 → 1+, group 17 → 1−,
   group 18 → nothing. Carries diagram 10. Placed after the energy-level
   section, which it completes.
3. **"Isotope or ion?"** — the contrast pair: what changes, what stays the same,
   what it is called. Carries diagram 09.

**Rewritten**

- **"Why relative atomic mass is rarely a whole number"** — add the worked sum
  as `examples`, and say what the mass is relative to (carbon-12) in the prose
  rather than only in a `formulaExamples` description.
- **"Electrons, energy levels and the shape of the table"** — add "your teacher
  may call these shells", and the one clause about the third level really
  holding 18. Gains the widget.
- **"Unstable nuclei, and elements that had to be made"** — name alpha, beta and
  gamma; give half-life a number (carbon-14, 5730 years) and the
  after-three-half-lives-an-eighth-is-left step; one sentence on fission so the
  Meitner Explore entry has somewhere to land.

**Other fields**

- `formulaExamples`: add the nuclide-symbol form alongside `Cl-35`, and `Na+` /
  `Cl-`, so ion notation appears where the notation examples are. Check first
  that `MoleculeText` renders a leading superscript; if it does not, the nuclide
  symbol belongs in diagram 02 only, and the prose says so.
- `commonMistakes`: add "adding the two isotope masses and halving them" — the
  student in §2 said it, so it is real.
- `keyTakeaways`: one more, on ion formation. Six becomes seven; the original
  brief asked for 4–6, so either trim one or record the deviation.
- `curriculumRef`: **verify** the Victorian Curriculum content descriptor and
  cite the code, or leave the prose as it is. Do not invent one.

**Glossary pop-overs.** `GlossaryTerm` (in `components/games/shared/`) already
does tap-to-explain with Escape handling and a focus-safe pop-over. Reuse it for
*nuclide*, *abundance*, *decay*, *half-life* and *synthetic*. It is a client
component, so the sheet gains a second small island — acceptable, and the same
shape as the widget island.

---

## 9. Internationalisation

This change is almost free for the overlays, and that is by design (D4, D2).

- **No new overlay rows for the widget.** Its strings are UI chrome and go in
  `src/i18n/dictionaries/<locale>.ts` under a new `periodicTable` namespace:
  mode names, legend labels, detail-panel field labels, the scroll hint, the
  keyboard hint. `formulaExampleNames` and table `rows` — the positional arrays
  that break `cheat-sheets.test.ts` — are not involved.
- **Element names are already done.** All 118, in all five locales, with
  `chemistry-names.test.ts` asserting completeness against the live registry.
- **Overlay work that is unavoidable:** the three new sections and three
  rewritten ones need prose in all five locales, and the deleted twenty-element
  table must be deleted in all five.
- **New glossary terms** go in `docs/i18n/glossary-<locale>.md` *before* the
  prose is translated: *group*, *period*, *metalloid*, *noble gas*, *halogen*,
  *alkali metal*, *ion*, *alpha/beta/gamma*, *fission*, *abundance*.
- **Russian:** the rules at the top of `src/i18n/dictionaries/ru.ts` apply —
  « » quotes, decimal comma (so 35,45), ё written out, symbols left in Latin.
  The decimal comma matters here: masses are rendered from data, so the widget
  must format numbers per locale rather than interpolating a JS number.
- Run `npm run i18n:review` and commit the regenerated review files.

---

## 10. Accessibility contract

The sign-off list for this widget, in the style of `ACCESSIBILITY.md` §8.

- **MUST** Every cell is a `<button>` inside a `<td>`, with an accessible name
  that includes the element name, not only the symbol:
  `"Sodium, symbol Na, atomic number 11, group 1, period 3"`. §3 of the
  accessibility doc requires this for formula-only controls, and the same
  reasoning applies to a bare symbol.
- **MUST** One tab stop for the whole table; arrows move; focus is always
  visible (`focus-visible:outline-2 focus-visible:outline-offset-2`).
- **MUST** Every view mode carries a text badge as well as a tone, plus a
  legend. Colour alone never carries the mode.
- **MUST** Tones meet 3:1 against adjacent cells and cell text meets 4.5:1 in
  **both** themes — checked with `data-theme` forced to each, not by trusting
  the OS setting.
- **MUST** Selecting an element updates an `aria-live="polite"` detail panel;
  the panel is not a modal and does not move focus.
- **MUST** Targets ≥ 24×24 CSS px, and ≥ 44×44 when
  `useInputMethod() === 'touch'`.
- **MUST** No page-level horizontal scroll at 320px; the grid's own scroll
  region is allowed under the 1.4.10 two-dimensional-content exemption and is
  announced via `aria-describedby`.
- **SHOULD** Mode switching does not animate; if it does, it is off under
  `prefers-reduced-motion`.

---

## 11. Milestones

Each is independently shippable and leaves the sheet in a working state.

| M | Scope | Why this cut |
|---|---|---|
| **M1** | `periodic-table.ts` + integrity test + the four registry spelling fixes | Pure data. Reviewable on its own; nothing renders yet. |
| **M2** | `widget?` field, `WIDGET_REGISTRY`, the widget rendering with one view mode (Metals), keyboard and a11y complete | The whole architectural risk lands here. One mode proves the pattern. |
| **M3** | The remaining five view modes + legends | Additive; each is a row in `view-modes.ts`. |
| **M4** | **The split**: `atomic-structure` keeps VC2S10U07 content and is retitled; `isotopes-and-radioactivity` is created with the VC2S10U06 content moved into it; migration adds the new `cheat_sheets` row and concept links; the eleven Explore scientists re-point (§4.8) | English only. Moving existing prose before writing new prose keeps the diff readable. |
| **M5** | Content rewrite on both sheets: the new sections, the rewrites, the table deletion, the curriculum-required additions in §4.6, glossary terms — English | Both sheets become correct. |
| **M6** | All five overlays for both sheets, glossary files, `i18n:review` | The every-locale rule. The new sheet needs a full overlay entry in each locale. |
| **M7** | The ten diagrams (§12) | Independent of all the above; can run in parallel from M1. |

---

## 12. Diagrams — and prompts for generating them

### 11.1 The inventory after the redesign

| # | File | Size | Status | What it shows |
|---|---|---|---|---|
| 1 | `01-inside-an-atom.svg` | 640×360 | unchanged | Nucleus + probability cloud + scale note |
| 2 | `02-atomic-and-mass-number.svg` | 640×320 | unchanged | The nuclide symbol, labelled |
| 3 | `03-isotopes-of-hydrogen.svg` | 640×280 | unchanged | Three hydrogen isotopes |
| 4 | `04-weighted-average.svg` | 640×340 | **reworked** | The bar **plus the arithmetic** |
| 5 | `05-energy-levels.svg` | 640×300 | **narrowed** | Sodium 2, 8, 1 only — the widget does the table |
| 6 | `06-ordered-by-atomic-number.svg` | 640×300 | unchanged | Te before I |
| 7 | `07-half-life.svg` | 640×320 | **split + renamed** | The decay curve with numbers; synthetic elements move to the widget |
| 8 | `08-reading-a-table-cell.svg` | 640×300 | **new** | Cell anatomy |
| 9 | `09-isotope-or-ion.svg` | 640×340 | **new** | The contrast pair |
| 10 | `10-why-groups-form-ions.svg` | 640×340 | **new** | Na → Na+, Cl → Cl− |

Renaming 07 and changing sizes means editing `src/lib/cheat-sheet-data.ts` and
the `imageAlt` in all five overlays. `CHEAT_SHEET_IMAGES.md` says so; it is the
step people forget.

### 11.2 Generate SVG source, not raster images

**Use a code-generating model and ask it for SVG source. Do not use an
image-generation model for any of these.** Every one is label-heavy, must be
exactly sized, must stay under 200 KB, must have a transparent background and
must contain chemically exact numbers. Image models get labels wrong, cannot hit
an exact viewBox, and bake in a background. The house rules in
`CHEAT_SHEET_IMAGES.md` are, in effect, a specification for hand-written SVG.

### 11.3 Two constraints the existing placeholders get wrong

Both belong in every prompt.

1. **No `prefers-color-scheme` inside the file.** The site switches themes with
   `data-theme` on the root element, not the OS setting, so a media query inside
   an `<img>`-loaded SVG would desync for anyone who picks light while their OS
   is dark. One palette has to work on both `#f8fafc` and `#09090b`.
2. **The placeholders' text is too small.** They use 12–14px in a 640-wide
   coordinate space, and the page renders the image at 512px — a 0.8× scale, so
   14px draws at about 11 CSS px. Worse, no single grey can meet 4.5:1 against
   both a near-white and a near-black background, so diagram text has to qualify
   as *large* text (≥24px, or ≥19px bold) and clear the 3:1 threshold instead.

   **The 512px is now a floor as well as a cap, and the 0.8× holds at every
   screen size.** It did not at first. The image was `w-full max-w-lg`, which
   gave it the width of the column it sat in, and on a 320px phone that column
   is 236px — the page gutter and the panel padding take 84 between them. The
   20-unit floor below drew at 7.4 CSS px there, on every diagram on both
   sheets. Since 2026-09-21 the image is pinned at 512 and pans sideways inside
   its own box below the `sm` breakpoint, the way the lookup tables on the same
   page already did, so the arithmetic in this section describes what a phone
   reader gets and not just a desktop one. The consequence for whoever is
   drawing a diagram — that a phone shows the left 236px first, so nothing
   load-bearing can live in the right-hand third alone — is in
   `docs/CHEAT_SHEET_IMAGES.md` under *How wide the page draws it*.

### 11.4 The shared preamble

Paste this above every per-diagram prompt.

```
You are writing a single self-contained SVG file for a chemistry cheat sheet
aimed at 14-year-old students. Output ONLY the SVG source: no commentary, no
markdown fence.

Hard constraints:
- Root element exactly: <svg xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 {W} {H}" width="{W}" height="{H}" role="img"
  aria-labelledby="title desc">, containing a <title id="title"> and a
  <desc id="desc">.
- TRANSPARENT background. No <rect> covering the canvas. The page draws this on
  a surface that is #f8fafc in the light theme and #09090b in the dark one, and
  the same file is used for both.
- ONE palette that works on BOTH of those backgrounds. Do NOT use a
  @media (prefers-color-scheme) block - this site switches themes with a
  data-theme attribute, so a media query would desync.
  Use: strokes and body text #6b7280; emphasis text #9aa3b2; a positive accent
  #ef4444 (only where a proton or a positive charge is meant); a negative accent
  #3b82f6 (electrons, negative charge); a neutral accent #a1a1aa (neutrons).
  Never pure black or pure white.
- Colour is never the only carrier of meaning. Anything distinguished by colour
  is also labelled with text or a symbol (+, -, 0) or a hatch pattern.
- ALL text is at least 20px in this coordinate space, and any text carrying a
  load-bearing number or label is at least 24px, or 20px at font-weight 700.
  The image renders at about 0.8x on the page, so small type disappears.
- font-family="DM Sans, ui-sans-serif, system-ui, sans-serif" on text; use
  font-family="ui-monospace, monospace" for numbers inside a formula.
- No <foreignObject>, no external references, no embedded raster, no <script>.
  Under 200 KB; these load on school wifi.
- Flat fills and strokes only; no gradient that assumes a light background.

Pedagogical constraints, non-negotiable:
- Electrons are NEVER dots on a circular track. No solar-system orbits. Where an
  electron's position matters, draw a soft region of probability (a blurred or
  stippled band), not a point on a line.
- The one exception is an explicitly labelled energy-level (Bohr) model used for
  COUNTING electrons per level. When you draw one, the diagram must carry the
  words "a way to count electrons, not a picture of an atom".
- Where a diagram implies a size relationship between nucleus and atom, say in
  the diagram that the scale is wrong: a nucleus is about 1/100,000 of the
  atom's width.
- Every number must be chemically correct. If you are unsure of a value, leave a
  clearly marked TODO comment rather than inventing it.

British/IUPAC spelling: sulfur, aluminium, caesium, neutralise.
```

### 11.5 The per-diagram prompts

> **04 — the weighted average, with the arithmetic** — `04-weighted-average.svg`, 640×340
>
> ```
> Title: "Why chlorine's relative atomic mass is 35.5".
> Top half: one horizontal bar 520 units wide, split at 75.8% / 24.2%. The left
> segment is labelled "chlorine-35" and "75.8%", the right "chlorine-37" and
> "24.2%". Put a tick under the bar at the position of the weighted mean and
> label it "35.5" with a short leader line, clearly nearer the 35 end.
> Bottom half: the sum written out on one line, large, in monospace:
>   (0.758 x 35) + (0.242 x 37) = 35.5
> Under it, in the body colour: "Not (35 + 37) / 2 = 36. The common one counts
> for more." Under that: "No single chlorine atom weighs 35.5."
> The two bar segments must be distinguishable without colour - give the smaller
> segment a diagonal hatch as well as a different fill.
> ```
>
> Before shipping: 75.8 / 24.2 are the standard abundances, and the sheet's
> prose says "about three-quarters". Prose and diagram must not disagree —
> either move the prose to "about 76%" or draw the bar at 75/25 and say the
> figures are rounded.

> **05 — sodium's energy levels, alone** — `05-energy-levels.svg`, 640×300
>
> ```
> Title: "Sodium: 2, 8, 1".
> A sodium nucleus at the centre labelled "11 protons, 12 neutrons". Around it
> three concentric BANDS - not lines. Each band is a soft, slightly blurred
> annulus, and the electrons in it are small marks distributed around the band at
> irregular angles, never evenly spaced on a circle.
> Label the bands from the inside: "level 1: 2", "level 2: 8", "level 3: 1".
> To the right, large: "2, 8, 1", and under it "outer level last".
> Across the bottom, in the emphasis colour, 22px bold:
>   "A way to count electrons, not a picture of an atom. The nucleus is drawn
>    about 100,000 times too big."
> Do NOT draw a periodic table in this diagram.
> ```

> **07 — half-life, with numbers** — `07-half-life.svg`, 640×320
>
> ```
> Title: "Half-life".
> A decay curve on axes: x-axis "time", y-axis "how much is left". Mark four
> points on the curve and drop a dashed line from each to the x-axis: 100%, 50%,
> 25%, 12.5%. Label the x-axis ticks "0", "1 half-life", "2 half-lives",
> "3 half-lives".
> Under the curve, one line: "After 3 half-lives, an eighth is left."
> To the right, boxed: "Carbon-14: one half-life = 5730 years."
> The curve is a smooth exponential, not straight segments.
> ```

> **08 — reading a periodic-table cell** — `08-reading-a-table-cell.svg`, 640×300
>
> ```
> Title: "What the numbers in a cell mean".
> One large rounded square cell, about 260 wide, containing, top to bottom:
> "17" (small, top-left), "Cl" (very large, centred), "Chlorine" (below the
> symbol), "35.45" (below the name).
> Four leader lines to labels outside the cell:
>   17       -> "atomic number = 17 protons. This is what makes it chlorine."
>   Cl       -> "symbol"
>   Chlorine -> "name"
>   35.45    -> "relative atomic mass - an average over the isotopes. NOT a mass
>                number, and not a whole number."
> Along the bottom, in the emphasis colour: "Mass number (35, 37) belongs to one
> atom. Relative atomic mass (35.45) belongs to the element."
> Leader lines must not cross.
> ```
>
> This is the highest-value of the ten. It answers §1.5 and the student's
> "35 or 35.45?" in one picture.

> **09 — isotope or ion?** — `09-isotope-or-ion.svg`, 640×340
>
> ```
> Title: "Isotope or ion?".
> Two columns side by side, each headed by a rounded box.
> Left column, heading "ISOTOPE":
>   Cl-35 -> Cl-37
>   "neutrons change"   "protons stay 17"   "electrons stay 17"
>   "Still chlorine. Still reacts the same. Just heavier."
> Right column, heading "ION":
>   Cl -> Cl- (the minus drawn as a superscript)
>   "electrons change"   "protons stay 17"   "neutrons stay the same"
>   "Still chlorine. Now charged. Now reacts differently."
> Between the columns, a vertical divider and, centred on it, one line:
>   "Protons never change. Change those and it is a different element."
> Use the negative accent only on the electron rows and the charge, and label
> those rows in text as well as colour.
> ```

> **10 — why a group forms the ion it does** — `10-why-groups-form-ions.svg`, 640×340
>
> ```
> Title: "Why atoms form ions".
> Two rows.
> Row 1, sodium: on the left, energy-level bands 2, 8, 1 labelled "1 electron in
> the outer level". An arrow to the right labelled "loses 1". On the right, bands
> 2, 8 labelled "full outer level", and the symbol "Na+" large. Under the row:
> "Group 1 loses 1 -> 1+".
> Row 2, chlorine: on the left, bands 2, 8, 7 labelled "7 in the outer level". An
> arrow to the right labelled "gains 1". On the right, bands 2, 8, 8 labelled
> "full outer level", and the symbol "Cl-" large. Under the row:
> "Group 17 gains 1 -> 1-".
> A bottom line spanning both rows: "Group 18 already has a full outer level, so
> it does neither."
> Same energy-level drawing rules as 05: soft bands, irregular marks, and the
> line "a way to count electrons, not a picture of an atom" once at the bottom.
> ```

Diagrams 01, 02, 03 and 06 are unchanged in specification — generate them from
the preamble plus the "what it should show" column in `CHEAT_SHEET_IMAGES.md`,
which already describes them precisely.

### 11.6 After generating each file

1. Open it on `#f8fafc` and on `#09090b`. Anything that vanishes fails.
2. Check the rendered size: 640 wide into a 512px column. Read it at that size,
   on a phone.
3. Check every number against a source — the abundances, the half-life, the
   masses, the electron arrangements.
4. Make the `alt` in `src/lib/cheat-sheet-data.ts` describe what the file
   actually shows, then update `imageAlt` in all five overlay files. A diagram
   that disagrees with its alt text is worse than a missing diagram.
5. Confirm the file is under 200 KB and contains no `<script>`,
   `<foreignObject>` or external reference.

---

## 13. Testing

Following `docs/TESTING.md` and the repo's existing data-integrity culture —
`chemistry-names.test.ts` asserting an overlay is complete against a live
registry is the model.

**Unit — `periodic-table.test.ts`** (the gate that makes the data trustworthy)

- Exactly 118 entries; atomic numbers 1…118 with no gap and no repeat.
- Every entry joins to `ELEMENTS_REGISTRY` by atomic number, and the symbol
  matches.
- No two entries occupy the same `(period, group)`; the f-block rows are 15
  wide; every `group` is 1–18 or `null`; `group` is `null` if and only if
  `block === 'f'`.
- `shells` sums to `atomicNumber` for every entry.
- `shells` matches a hand-checked literal for the first 20 elements — this is
  the content the deleted table used to carry, and the test is where it goes.
- `outerElectrons` is `null` for every d- and f-block entry and non-null for
  every s- and p-block one.
- Every symbol is named in all five locales, asserted against the live overlays.

**Unit — `view-modes.test.ts`**

- Every mode returns a non-empty `badge` for every one of the 118 entries. This
  is the accessibility rule — colour is never alone — enforced as a test.
- Every `legendKey` a mode can return exists in the English dictionary.

**Component (Vitest + Testing Library)**

- Arrow keys move focus between neighbouring cells; exactly one cell has
  `tabIndex=0` at any time.
- Enter on a cell updates the detail panel's contents.
- Switching mode changes the badges and the legend.
- Cell accessible names contain the element *name*, not only the symbol.

**E2E (Playwright, one spec — `cheat-sheet-atomic-structure.spec.ts`)**

- Keyboard only: tab to the table, arrow to sodium, press Enter, assert the
  panel reads sodium's arrangement.
- At 320px: the page has no horizontal scroll while the grid region does. Assert
  on `document.documentElement.scrollWidth`, not on `toBeVisible()` — a bounding
  box knows nothing about a clipping ancestor, which is how a previous spec on
  this repo passed against clipped content.
- In `ru`: element names render in Cyrillic and masses use a decimal comma;
  `latin-leakage.spec.ts` should already cover the first half.

Per the repo's cadence: typecheck + the scoped Vitest files + this one e2e spec
while building; the full Playwright suite before merging to master.

---

## 14. Acceptance criteria

**A. The periodic table widget**

- [ ] AC-1 All 118 elements render, each showing symbol, atomic number and
      relative atomic mass, in a single semantic `<table>` with group and period
      headers and empty cells at the table's gaps.
- [ ] AC-2 Six view modes work; each colours the cells **and** prints a text
      badge in every cell **and** renders a legend. No mode conveys meaning by
      colour alone.
- [ ] AC-3 Selecting an element — by click, tap, Enter or Space — updates a
      detail panel showing name, symbol, atomic number, relative atomic mass,
      electron arrangement, group, period, metal class, family, common ion and
      whether it occurs naturally.
- [ ] AC-4 The table is one tab stop. Arrow keys move between cells, Home/End
      move along a period, PageUp/PageDown along a group, and focus is visibly
      ringed at all times.
- [ ] AC-5 Every cell's accessible name includes the element's localised name,
      its symbol, its atomic number, its group and its period.
- [ ] AC-6 The detail panel is `aria-live="polite"`, is not a modal, and does
      not steal focus.
- [ ] AC-7 At 320px the **page** has no horizontal scroll; the grid scrolls
      within its own region, and that region is described to assistive
      technology.
- [ ] AC-8 Touch targets are ≥24×24 CSS px always, and ≥44×44 when
      `useInputMethod()` reports touch.
- [ ] AC-9 Cell text meets 4.5:1 and cell tones meet 3:1 against neighbours, in
      **both** themes, verified with `data-theme` forced to each.
- [ ] AC-10 With JavaScript disabled the full table still renders with symbol,
      atomic number and mass, and the detail panel shows a default element.

**B. Data**

- [ ] AC-11 `periodic-table.test.ts` passes every assertion in §13.
- [ ] AC-12 Nothing in the widget reads `valenceElectrons` from
      `ELEMENTS_REGISTRY`.
- [ ] AC-13 `Aluminium`, `Caesium`, `Caesium Hydroxide` and `Caesium Ion` are
      corrected in the registries, and the full suite still passes.
- [ ] AC-14 `outerElectrons` is `null` across the d- and f-blocks, and the
      *Outer electrons* mode greys those cells with a legend entry explaining
      why, rather than showing a number.

**C. Content**

- [ ] AC-15 The *first twenty elements* table is gone from
      `cheat-sheet-data.ts` and from all five overlays, and
      `cheat-sheets.test.ts` passes.
- [ ] AC-16 The three new sections exist — reading a cell, why atoms form ions,
      isotope or ion — each with its diagram.
- [ ] AC-17 The relative-atomic-mass section shows the weighted sum as a worked
      example, and names carbon-12 as the standard in the prose.
- [ ] AC-18 The energy-level section says "shells" is the same thing, and
      explains why the 2, 8, 8 pattern stops at calcium.
- [ ] AC-19 The radioactivity section names alpha, beta and gamma, gives
      half-life a worked number, and says enough about fission for the Meitner
      Explore entry to link honestly.
- [ ] AC-20 Every sentence added is under 30 words, reading age ~12.
- [ ] AC-21 Each of the twelve Explore scientists in theme A links to the sheet
      that now teaches their science, and can do so honestly — the acceptance
      test the original brief set, re-run across both sheets.

**C2. The split** (see §4)

- [ ] AC-21a Two sheets exist: `atomic-structure` (Year 9, retitled *Atoms & the
      Periodic Table*) and `isotopes-and-radioactivity` (Year 10). The Year 9
      slug is unchanged and every previously working URL still resolves.
- [ ] AC-21b Each sheet's `curriculumRef` cites its content-descriptor code —
      VC2S10U07 and VC2S10U06 — and states that both sit in the Levels 9–10
      band, so the year labels are this site's sequencing.
- [ ] AC-21c Content is allocated as §4.5 specifies; nothing is duplicated
      across the two sheets beyond the one-line recap of atomic and mass number.
- [ ] AC-21d The Year 9 sheet covers everything VC2S10U07 names: groups and
      periods, metallic and non-metallic properties, **atomic size** and
      **reactivity**, and the outer-shell pattern via the Bohr model.
- [ ] AC-21e The Year 10 sheet covers everything VC2S10U06 names, using the
      curriculum's own examples: radon-222 (alpha), iodine-131 (beta),
      cobalt-60 (gamma), carbon-14 and uranium-238 for half-life, and the
      medical and industrial applications.
- [ ] AC-21f The Year 10 sheet carries the radiocarbon-dating section covering
      the at-least-65,000-year Aboriginal and Torres Strait Islander presence on
      the Australian continent, sourced and reviewed before it ships.
- [ ] AC-21g Anything not in V2.0 F–10 — relative atomic mass, mass number,
      atomic number, metalloids, ion formation — is present but marked as
      extension rather than implied to be Year 9/10 curriculum content.
- [ ] AC-21h A migration adds the `cheat_sheets` row and concept links for the
      new sheet, updates the retitled one, and is idempotent. Both pages render
      with Supabase unconfigured.
- [ ] AC-21i Both sheets appear in the index grid under the right year filter.

**D. Diagrams**

- [ ] AC-22 All ten files exist, none is a placeholder, and each is under 200 KB
      with a transparent background and no `prefers-color-scheme` block.
- [ ] AC-23 Every diagram is legible rendered into a 512px column on a phone; no
      text below 20px in the 640-wide coordinate space.
- [ ] AC-24 No diagram shows electrons as dots on a circular track. The two that
      use an energy-level model (05, 10) carry the "a way to count electrons,
      not a picture of an atom" line.
- [ ] AC-25 Every `alt` in `cheat-sheet-data.ts` describes the file that
      actually shipped, and every `imageAlt` in all five overlays matches.

**E. Internationalisation**

- [ ] AC-26 The sheet and the widget render fully at
      `/{en,de,fr,es,it,ru}/cheat-sheets/atomic-structure`.
- [ ] AC-27 Element names in the widget come from `chemistry-names` and are
      localised; symbols, formulae and state symbols are not.
- [ ] AC-28 Masses are formatted per locale — Russian shows `35,45`.
- [ ] AC-29 New glossary terms are recorded in `docs/i18n/glossary-<locale>.md`
      before the prose was translated, and `npm run i18n:review` output is
      committed.
- [ ] AC-30 The four language checks in `docs/i18n/GAMES.md` are reported per
      locale, with anything uncertain flagged `low` confidence.

**F. Gates**

- [ ] AC-31 `npm run lint -- src e2e` adds no problems to the 21-problem master
      baseline; `npm run typecheck`, `npm test`, `npm run build` and
      `npm run e2e` all pass.
- [ ] AC-32 No new dependency, no addition to `ICON_REGISTRY`, and no hardcoded
      colours outside the CSS custom properties.

---

## 15. Out of scope, recorded so it is not lost

- A standalone `/[lang]/periodic-table` route. Wanted — teachers will project
  it — but it is a route, an SEO surface and a nav entry, and it should follow
  the widget rather than block it.
- A game that practises this sheet, which would fill the empty `relatedGames`.
  Needs its own brief per `AGENT_INSTRUCTIONS.md` step 1.
- Inlining the diagrams as React components so they can use `currentColor`. It
  would solve the two-theme contrast problem properly, but it breaks the
  "replacing a diagram is replacing a file" contract in
  `CHEAT_SHEET_IMAGES.md`, which is worth keeping.
- Teacher-facing material: printable, misconception diagnostic, lesson sequence.
  Belongs with `TEACHERS_PAGE.md`.
- Per-element isotope abundance data in the widget. Tempting once the data
  module exists; out of level for Year 9.

---

## 16. Open questions

~~1. **Year level.**~~ **Resolved by §4** — two sheets, split on VC2S10U07 /
VC2S10U06, labelled Year 9 and Year 10 as this site's sequencing.

~~3. **The curriculum code.**~~ **Resolved by §4** — VC2S10U07 and VC2S10U06,
quoted from the live V2.0 curriculum, with VC2S8U07 as the assumed floor.

Still open:

1. **Seven takeaways.** The original brief said 4–6. The split gives each sheet
   room, so this may resolve itself — but confirm the range per sheet.
2. **Chlorine abundances.** The prose says "about three-quarters"; diagram 04 is
   specified at 75.8 / 24.2. Which one moves?
3. **The 65,000-year dating elaboration.** VC2S10U06 asks for it by name and it
   deserves care, a source and a review before it ships. Who reviews it?
~~4. **Does the Year 10 sheet get its own `concepts` row?**~~ **Resolved** —
   yes, in `20260921_split_atomic_structure_sheet.sql`. Sharing the Year 9
   concept is not actually expressible: `concept_cheat_sheets_one_primary` is a
   partial unique index on `(concept_id) where is_primary`, so a shared concept
   forces the new sheet to be non-primary. `concepts` also carries `year_level`
   and `curriculum_ref`, and the two sheets differ on both. The new concept
   nests under `atomic-structure` via `parent_id`, the way `polyatomic-ions`
   nests under `ionic-compounds`, and links back to the Year 9 sheet
   non-primary — the same shape as `('stoichiometry', 'balancing-equations',
   false)`. There is deliberately no link the other way.

4. **Flame tests and emission spectra** (VC2S10U07's last elaboration) — a
   section on the Year 9 sheet, an Explore entry, or left out?
5. **`concepts.curriculum_ref` is capped at 300 characters**, and the prose the
   pages render is roughly twice that, so the migration carries an abridged
   version. Two sources of the same sentence is a drift risk. Widen the column
   in a later migration, or accept the abridgement and note it?
