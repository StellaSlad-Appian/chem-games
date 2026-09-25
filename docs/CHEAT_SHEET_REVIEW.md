# Cheat sheet review — changes to make

Reviewed 2026-09-24 on branch `cheatsheet-review`, reading all 15 sheets in
`src/lib/cheat-sheet-data.ts` and rendering each of the six diagrams, both as a
file and on the page at desktop width.

This is a list of changes. Nothing in it has been made yet.

**Priority**
- **P1**: wrong or misleading science, or something broken on the page. Fix first.
- **P2**: clarity: too much text, repetition, or a layout that fights the reader.
- **P3**: an improvement, usually a diagram the sheet is missing.

---

## All diagrams (applies to every sheet)

The complaint is right, and it has one root cause. Every text element in all six
SVGs is **bold (700)** and set at 20–28 units, which draws at **16–22 CSS px bold**.
The prose directly above each diagram is `text-sm`, which is **14 px regular**. So
the labels inside a diagram are larger and heavier than the paragraph that
explains them, and the figure reads as a block of text with a picture attached.

The script does this on purpose (`scripts/cheat-sheet-diagrams.mts`, `MIN_TEXT` /
`MIN_LARGE`). An SVG loaded through `<img>` cannot follow the site's light/dark
toggle, so no single grey passes normal-text contrast on both backgrounds. The
workaround was to make every glyph count as WCAG "large text", which means bold
and big. The type size is a symptom of the loading method.

1. **P2: Render the diagrams as inline SVG, not `<img>`.** Inline SVG can use
   `currentColor` and the page's `--muted` / `--foreground` tokens, which already
   pass 7:1 in both themes. Once it does, the large-text workaround is no longer
   needed. (Another option: ship a light and a dark file and show one with
   `[data-theme]` CSS.) This is what makes items 2 and 3 possible.
2. **P2: New type scale for diagrams.** Labels regular weight at about 14 CSS px
   (≈ 17–18 units in the 640 space), the same as the prose. Keep large, bold type
   only for the **one focal item** per diagram: the `Cl` symbol, `2, 8, 1`, the
   `Te`/`I` tiles. Relax the `MIN_TEXT = 20` / `MIN_LARGE` rules to match.
3. **P2: Remove the in-diagram titles.** 02 and 06 repeat the section heading that
   sits directly above them, word for word. 03 and 07 have a title-plus-subtitle.
   01 and 05 have none. Remove all of them. The heading already does that job.
4. **P2: Cap each diagram at about 6 short labels and no full sentences.** A
   sentence that explains the figure belongs in the prose, and each diagram
   currently repeats its paragraph (details below). A good test: cover the
   paragraph, and the figure should still make sense from labels alone.
5. **P2: One typeface.** 02, 06 and 07 mix a monospace font into the sans-serif
   (`35 − 17 = 18 neutrons`, `127.60`). Use the sans-serif, with tabular figures if
   alignment matters.
6. **P2: The diagram text is English on every locale.** `/de/…` shows English
   labels inside the images, with only the alt text translated. That is another
   reason to cut words. Whatever text remains either has to be generated per locale
   (the script could take a strings table) or kept to numbers and symbols.
7. **P2: Labels on the right are cut off on phones.** `docs/CHEAT_SHEET_IMAGES.md`
   says not to put anything load-bearing in the right-hand side, because a phone
   shows only the left ~236–290 px of 512. But 01 (`Electrons` / `Nucleus`), 02 (all
   labels) and 05 (`2, 8, 1`) have every label in the right half. On a phone the
   reader sees a picture with no labels. Put labels under or beside the object on
   its left, or stack the layout vertically.
8. **P2: Consistent key.** "Filled = proton, hollow = neutron" appears as a legend
   in 01 and as a sentence in 03. Label particles directly (a short leader line to
   one proton and one neutron) and remove the key in both.

---

## Atoms & the Periodic Table (`atomic-structure`, Year 9)

### Diagram 01: Inside an atom
- **P2** Cut text from 11 lines to about 3. Keep `electron cloud`, `nucleus` and a
  short scale note (`not to scale: nucleus ≈ 1/100,000 of the atom's width`).
  Remove "are somewhere in this fuzzy region — never on a track or an orbit" and
  "protons and neutrons, and nearly all the mass": the paragraph above says both.
- **P1** The scale note says "1/100,000 of the atom" without saying of what. By
  volume it is about 10⁻¹⁵. Say **width** (or diameter).
- **P2** The electron cloud has an empty ring around the nucleus, so it reads as a
  thick orbit, which is the misconception the figure is meant to prevent. Let the
  dot density fade continuously outward from the nucleus, with no gap.
- **P3** The nucleus is 3 protons + 4 neutrons (lithium-7) but nothing says so.
  Either name it (`lithium-7`) or say it is a generic atom in the alt text.

### Diagram 02: Atomic and mass number
- **P2** Remove the title (it repeats the heading directly above).
- **P2** Shorten the labels to `mass number = protons + neutrons` and
  `atomic number = protons`. "17 protons, which is what makes it chlorine" repeats
  the prose.
- **P2** `35 − 17 = 18 neutrons` is the right thing to show, but in monospace it
  looks like code. Use the sans-serif (see item 5 above).
- **P2** The alt text says "arrows", but the drawing has plain lines without
  arrowheads. Add arrowheads or change the alt text (in all six languages).

### Diagram 05: Energy levels (sodium)
- **P1** **The element is never named in the picture.** The only place "sodium"
  appears is the file's `<title>`. Put `Na` in the nucleus or label it `sodium`.
- **P1** "The nucleus is drawn about 100,000 times too big" is not correct for
  this drawing. The nucleus radius is 17 units and the outer band is 88 units, so
  the nucleus is drawn at about 1/5 of the atom instead of 1/100,000, which is
  about **20,000×** too big. Either say "far too big (a real nucleus is 1/100,000
  of the atom's width)" or give the correct factor.
- **P2** `2, 8, 1` and the three `level n: x electrons` lines say the same thing.
  Keep the big `2, 8, 1` and remove the three lines, or keep the lines and remove
  `outer level last`.
- **P2** Replace `11 protons, 12 neutrons` with `11 electrons` (or remove it).
  Neutrons have nothing to do with the electron arrangement, and the count that
  matters here is the 11 electrons.
- **P2** The bands are too faint to tell which dot belongs to which level at
  512 px, and showing that is the whole purpose of the figure. Give each band a
  visible edge, and give the single outer electron a different colour or a
  callout, because it is the one the paragraph is about.
- **P2** Shorten the caveat to one line, e.g. `A way to count electrons, not a
  picture of an atom.`

### Diagram 06: Ordered by atomic number
- **P2** Remove the title and the subtitle "The small number counts the
  protons". Label the red number directly as `atomic number`.
- **P2** Remove the bottom sentence "Tellurium has one proton fewer, so it goes
  first." It is the third time the figure says this: `heavier, but first` /
  `lighter, but second`, and the prose too.
- **P1** `127.60` / `126.90` have no label. A Year 9 student will not know what
  that number is. Label it `relative atomic mass` (or `mass`) once.
- **P3** An arrow between the two tiles (`→ order in the table`) would show the
  order without needing text.

### Sheet content
- **P1** Key takeaway 3 says the outer-level count "is what the periodic table is
  arranged by". That contradicts the sheet's own last section: the table is
  **ordered by atomic number**, and the outer-level count decides the
  **group**. Suggested fix: "…and how many are in the outer level decides which
  group (column) an element is in."
- **P1** *Groups and periods*: "So the row tells you roughly how big the atom is"
  conflicts with *Atomic size* two sections later (atoms shrink across a row: Na
  is nearly twice the radius of Cl). Suggested fix: "…so atoms get bigger as you
  go down to a new row."
- **P1** *Reactivity*: "The same metals with an acid give off hydrogen, faster
  still." True, but it reads like a class experiment. Add "(far too violent to
  try in a school lab)".
- **P2** Curriculum commentary in student prose: "Both terms are an extension
  here: the curriculum for these years names neither…" and "…which is a word the
  curriculum does not use." A student does not need this. It is already in
  `curriculumRef`, so remove it from the section text. (The same applies to the
  isotopes sheet.)
- **P1 (page bug, all sheets)** The descriptions on the example cards are never
  rendered. `formulaExamples[].description` and `sections[].examples[].description`
  are in the data, but `page.tsx` shows only `name` + `formula`. Here that loses
  "17 protons, 18 neutrons" under Cl-35/Cl-37. See *Relative Atomic & Formula
  Mass*, where it matters most.
- **P2 (page bug)** The section example cards show the name and formula run
  together ("Chlorine-35Cl-35"), because `MoleculeText` is inline and its `mt-1`
  does nothing. Make the card `flex flex-col` like the formula-example cards.

---

## Isotopes & Radioactivity (`isotopes-and-radioactivity`, Year 10)

### Diagram 03: Isotopes of hydrogen
- **P2** Remove both header lines ("All three are hydrogen: 1 proton, 1
  electron." and the key sentence). The labels underneath already say
  1 proton / 1 neutron / 2 neutrons.
- **P2** "outer mark = electron" is awkward. Label one electron directly.
- **P3** Replace one text line with something the paragraph needs. It says "some
  isotopes are radioactive and some are not", so tag hydrogen-3 `radioactive` and
  the other two `stable`. That is more useful than the key.
- **P3** Optional: add the traditional names (protium, deuterium, tritium)
  underneath in small type. Students will meet "deuterium" elsewhere.

### Diagram 07: Half-life
- **P2** Remove the title "Half-life: half of what is left, every time", the line
  "After 3 half-lives, an eighth is left." (the 12.5 % point shows it), and the
  whole carbon-14 / uranium-238 box. The paragraph directly above gives both
  numbers, and so do the example cards at the top of the page. That removes 4 of
  the 14 text elements.
- **P1** The y-axis label "how much is left" is vague, and it feeds a real
  misconception: that the sample itself disappears. Label it `radioactive atoms
  left` (or `undecayed nuclei`).
- **P2** Extend the curve to 4 half-lives (6.25 %) so it visibly keeps going
  without reaching zero. Many students believe that "after two half-lives it's
  all gone".
- **P2** The `100%` label sits on the y-axis and the start point. Move it clear.

### Sheet content
- **P1** **The two common mistakes are about a topic the sheet no longer
  teaches.** Both are about relative atomic mass / chlorine 35.5. That section
  (and diagram 04) was removed on 2026-09-22, and key takeaway 2 still promises
  it. **Decided 2026-09-24: remove the takeaway and both mistakes for now,
  without replacements.** The options that were considered were putting a
  short weighted-average section back, or writing radioactivity mistakes such as:
  - "Thinking that after two half-lives everything has decayed. A quarter is
    still left."
  - "Thinking an object that has been irradiated becomes radioactive.
    Irradiation is not contamination."
  - "Thinking isotopes are different elements. Same protons, same element."
- **P1** *Elements that had to be made*: "Elements past uranium have no stable
  isotopes and are not found in nature". Neptunium and plutonium occur in trace
  amounts in uranium ores, and technetium (43) and promethium (61) have no stable
  isotopes either. Suggested fix: "…are not found in nature in any useful amount".
- **P2** *Three kinds of radiation*: cobalt-60 is a beta emitter whose daughter
  gives out the gamma rays. Simplifying it to "gives out gamma" is common in
  schools, but a sharp student will find the contradiction. Consider "gives out
  beta and gamma radiation; it is used for its gamma". Also: lead and concrete
  **reduce** gamma rather than stop it completely.
- **P2** Remove the curriculum commentary from the prose, as on the Year 9 sheet
  ("Both terms are an extension…", "This is an extension: the curriculum does not
  ask for made elements…").
- **P1 (page bug)** The example descriptions ("half-life about 5730 years",
  "decays by giving out an alpha particle") are not shown. See the page bug
  under *Atoms & the Periodic Table*.

---

## States of Matter (`states-of-matter`, Year 9)

- **P3, highest-value new diagram on the site.** *Heating and cooling curves*
  describes a graph ("the flat sections… the sloped sections… the flat section
  for boiling is longer") and does not show one. Add a heating curve with the
  two plateaus labelled `melting` / `boiling` and nothing else.
- **P3** A three-panel particle diagram (solid / liquid / gas) would replace most
  of the first three key takeaways. Use labels only, no sentences.
- **P2** Takeaway 3 says gases "move freely and fast". Liquid particles are about
  as fast at the same temperature. Say "move freely, far apart".

## Acids & Bases (`acids-and-bases`, Year 9)

- **P1** "Neutral: pH 7 at 25 °C — pure water and most salts." Many salts are not
  neutral in solution (sodium carbonate, ammonium chloride, sodium ethanoate). Say
  "pure water, and solutions of salts like NaCl".
- **P2** "pH 2 is 100× more acidic than pH 4": say "has 100× the H⁺
  concentration". "More acidic" is vague.
- **P3** The pH-landmark table would work better as a single colour bar diagram
  (0–14, universal-indicator colours, with 4–5 everyday examples).

## Balancing Chemical Equations (`balancing-equations`, Year 10)

- **P2** Takeaway 5 says "Always include state symbols", but two of the three
  top examples have none. Add them, or label those as "(states omitted)".
- **P3** A particle picture of 2H₂ + O₂ → 2H₂O (atoms drawn and counted on each
  side) is the standard visual for this topic, and the sheet has no picture.

## Types of Chemical Reactions (`reaction-types`, Year 10)

- **P1** The synthesis example `2Mg + O₂ → 2MgO` is also a combustion (magnesium
  burning), and the sheet's own quick-tell rule classifies by "O₂ on the left".
  A student applying the sheet gets two answers. Use a synthesis that is not a
  combustion, e.g. `Fe + S → FeS` or `N₂ + 3H₂ → 2NH₃`.
- **P2** The combustion takeaway says "fuel + oxygen → CO₂ + H₂O". Add "(for a
  hydrocarbon fuel)", because magnesium and hydrogen combust too.

## Chemical Bonds & Structure (`chemical-bonds`, Year 10)

- **P1** "The group number tells you how many valence electrons a main-group
  element has." With 1–18 group numbering (the one the site uses: "group 17 the
  halogens") this is wrong for groups 13–18. Chlorine is group 17 with 7 valence
  electrons. Say "the last digit of the group number".
- **P3** A three-panel diagram (ion lattice / shared-pair molecule / cations in a
  sea of electrons) would show the three models the table can only name.

## Writing Ionic Formulas (`chemical-formulas`, Year 10)

- **P2** Common mistake 3, "Writing the anion first because it sounds first in
  casual speech", is unclear. In English the cation is said first ("sodium
  chloride"). Either explain it or remove it.
- **P3** A small cross-over diagram (Al³⁺ and SO₄²⁻ with the charges crossing
  down to subscripts) is the standard visual and needs almost no text.

## Polyatomic Ions (`polyatomic-ions`, Year 10)

- **P2** "Adding H⁺ to an anion raises its charge by one". Students read "raises"
  as a bigger number (2 → 3). Say "makes the charge one less negative (2− → 1−)".
- **P2** "Most nitrates and all ammonium salts are soluble". At this level
  **all** nitrates are soluble, which is the rule students are taught.
- **P2** Common mistake 3 writes the charge "(−2)", but the rest of the sheet uses
  "2−". Make it consistent.
- **P2** "The only common polyatomic cation is ammonium" sits next to an acids
  sheet built on H₃O⁺. Add "(apart from hydronium, H₃O⁺, in acid chemistry)".

## Naming Inorganic Compounds (`naming-compounds`, Year 10)

- **P3** Takeaway 1 is a decision tree written out as prose (ionic / molecular /
  acid). A small flowchart diagram would carry it with about 10 words.

## Relative Atomic & Formula Mass (`relative-formula-mass`, Year 10)

- **P1 (page bug, worst affected sheet)** All the working in the example cards
  is **invisible**: "2 x 1 + 16 = 18", "14 + 3 x 1 = 17", "2 x 27 + 3 x (32 +
  4 x 16) = 342". Those descriptions are the content of the cards, and without
  them each card is a formula with no answer. Checked on the running page: the
  text is not in the DOM.
- **P1** Common mistake 1 says "Ar is a comparison with hydrogen". Takeaway 1 and
  the first section both say the standard is carbon-12. Change it to "Ar is a
  comparison and has no unit".
- **P2** Use the multiplication sign × instead of the letter x throughout
  (Stoichiometry already does).
- **P2** Six common mistakes is a lot for a cheat sheet. The data-book-vs-class-
  table one repeats a section. Cut it to four.
- **P3** *What "relative" actually means* describes a picture (one carbon atom on
  a balance against 12 hydrogens) and does not show one. It would make a good
  diagram with almost no text.

## The Mole & Stoichiometry (`stoichiometry`, Senior)

- **P2** Takeaway 1 writes "6.02 × 10^23" with a caret. The table uses a proper
  superscript. Use 10²³.
- **P1** "…then give 3 significant figures" as a blanket rule is wrong for VCE.
  The answer should match the least precise data given. Reword.
- **P3** A "mole map" diagram (mass ↔ moles ↔ particles / gas volume /
  concentration, with the mole ratio bridging reactant and product) is the
  standard summary for this topic.

## Lewis Structures (`lewis-structures`, Senior)

- **P1** Takeaway 1: "Valence electrons = group number (… N 5, O 6, halogens 7)".
  The sheet's own table lists N in **group 15** and O in **16**. Same fix as
  Chemical Bonds: "the last digit of the group number".
- **P3, high value.** A sheet about drawing structures has no drawings. Add one
  diagram with H₂O, CO₂ and NH₃ as Lewis structures (lone pairs shown), and
  ideally a second one with the VSEPR shapes and angles.
  **Done 2026-09-25:** `lewis-structures/01-lewis-structures` (H₂O, NH₃, CO₂,
  CH₄) and `lewis-structures/02-vsepr-shapes` (the five shapes with angles);
  see `docs/CHEAT_SHEET_IMAGES.md`.
- **P2** "Loner" is a made-up term. Introduce it as "an unpaired electron (a
  'loner')" the first time, so students can match it to their textbook.

## Naming Organic Compounds (`organic-nomenclature`, Senior)

- **P1** Common mistake 4: "Forgetting the locant for -ene, -ol, -one when the
  chain has 4 or more carbons". It is wrong for -ol: propan-1-ol and propan-2-ol
  are 3 carbons and need the locant. Reword: "whenever the group could be in more
  than one position".
- **P2** The suffix-priority table has no amide, but the Functional Groups sheet
  teaches amides. Add it (between ester and aldehyde).
- **P3** The worked example ("a 5-carbon chain with an OH on carbon 2 and a methyl
  on carbon 3") needs a skeletal or condensed structure with the chain numbered.
  Naming is a visual skill.

## Functional Groups (`functional-groups`, Senior)

- **P3** *The reaction pathway you must know* is a chain of nine arrows written
  as a paragraph. It is the clearest candidate on the site for a reaction-map
  diagram (boxes for the groups, arrows labelled with reagents).
- **P2** Ester general formula is "—". CₙH₂ₙO₂ (the same as carboxylic acids)
  is correct and makes a good exam point about isomers.

---

## Suggested order of work

1. The page bug: render `description` on both kinds of example card, and fix the
   run-together name/formula (one small change in `page.tsx`).
2. The P1 content fixes above. They are text-only edits in
   `src/lib/cheat-sheet-data.ts` **and** the five overlays in
   `src/i18n/cheat-sheets/*.ts`.
3. Diagram rendering (inline SVG), then the new type scale, then cutting text in
   the six existing diagrams. Update the alt text in all six languages when a
   diagram changes (see `docs/CHEAT_SHEET_IMAGES.md`).
4. New diagrams (P3), starting with States of Matter (heating curve) and Lewis
   Structures, then Functional Groups (reaction map).
