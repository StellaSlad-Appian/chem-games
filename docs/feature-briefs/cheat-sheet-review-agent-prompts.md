# Sub-agent prompts for the cheat sheet review

These prompts implement [`docs/CHEAT_SHEET_REVIEW.md`](../CHEAT_SHEET_REVIEW.md).
They are drafts for review, and nothing has been launched. Edit anything here.
When you are happy with them, I'll launch them exactly as written.

---

## How the work is split

| # | Agent | Touches | Depends on |
|---|---|---|---|
| 1 | Example cards show their descriptions (page bug) | `page.tsx`, overlay type, 6 locale files, test | — |
| 2 | Science fixes: the two atom sheets | `cheat-sheet-data.ts`, 5 overlays | 1 |
| 3 | Science fixes: the other 13 sheets | `cheat-sheet-data.ts`, 5 overlays | 2 |
| 4 | Diagram pipeline: inline SVG, lighter type, text per language | script, `page.tsx`, CSS, docs, e2e | 3 |
| 5 | Rework diagrams 01, 02, 05, 06 (Atoms & the Periodic Table) | script, alt text ×6 | 4 |
| 6 | Rework diagrams 03, 07 (Isotopes & Radioactivity) | script, alt text ×6 | 5 |
| 7 | New diagrams: States of Matter | script, data, 6 locales | 6 |
| 8 | New diagrams: Lewis Structures | script, data, 6 locales | 7 |
| 9 | New diagram: Functional Groups reaction map | script, data, 6 locales | 8 |
| 10a / 10b | The remaining P3 diagrams, four each (**on hold**) | script, data, 6 locales | 9, plus the owner's go-ahead |

**They run one after another, each branch cut from the previous one's tip.**
Every agent edits some of the same six files (`cheat-sheet-data.ts` and the five
overlays), and 4–10 all edit one 1,200-line script. The i18n rollout tried
parallel agents and dropped them for the same reason: shared files, plus several
Playwright runs at once overload this machine. A chain means no merges. If you
want speed anyway, **1 and 4 are the only pair that could safely run side by
side**: they meet only in `page.tsx`, in different blocks.

**Before each launch, I** create a sibling worktree off the previous branch,
run `npm install` and `npx next typegen` there, check that the dev-server port is
free, and fill in the `<WORKTREE>`, `<BRANCH>`, `<BASE>` and `<PORT>` placeholders.
After each agent finishes, I bring you its report before starting the next one,
so you can stop the chain at any point.

### Decisions (taken 2026-09-24)

1. **Isotopes sheet, common mistakes (prompt 2).** Remove the outdated parts
   only: the weighted-average key takeaway and both relative-atomic-mass
   mistakes. Add no replacements and do not restore the section, for now.
2. **Curriculum commentary in student prose (prompts 2 and 3).** Remove it from
   the prose. It is already in `curriculumRef`.
3. **Diagram text in other languages (prompt 4).** One output per language.
4. **Which P3 diagrams.** Prompts 7, 8 and 9. **10a/10b are on hold** until the
   owner has seen the first three.
5. **Translation review.** Still open. Every prompt writes German, French,
   Spanish, Italian and Russian text that no native speaker has checked. Each
   agent lists its new strings in its report so they can be passed on.

---

## Shared rules (prepended to every prompt below)

```text
You are working on chem-games, a Next.js 16 chemistry-learning site in six
languages (en, de, fr, es, it, ru). This is NOT the Next.js in your training
data: before writing any Next-specific code, read the relevant guide in
node_modules/next/dist/docs/ and heed deprecation notices.

WHERE YOU WORK
- Your worktree is <WORKTREE>, on branch <BRANCH> (cut from <BASE>). It is
  already set up: npm install and npx next typegen have run. Work only there.
- Other Claude sessions share this repository. Never run git checkout/switch,
  git reset, or anything that touches another worktree. Run
  `git branch --show-current` immediately before every commit and check the
  branch name in the commit output.
- Stage by explicit path (`git add -- <paths>`), never `git add -A` alone.
- Commit locally when done. Do NOT push, do NOT merge, do NOT open a PR.
- If you need a dev server, run `npx next dev -p <PORT>` in your worktree. Never
  use port 3000 or 3010, and never kill a process you did not start. Check
  first: `Get-NetTCPConnection -LocalPort <PORT>` (PowerShell).

READ FIRST
- docs/CHEAT_SHEET_REVIEW.md: the review this task comes from. Your items are
  copied below; the review has the reasoning.
- src/lib/cheat-sheet-data.ts: the English cheat sheets (source of truth).
- src/i18n/cheat-sheets.ts: how the five translations overlay the English. The
  overlays in src/i18n/cheat-sheets/{de,fr,es,it,ru}.ts must match the English
  shape item for item; src/i18n/cheat-sheets.test.ts enforces this.
- docs/i18n/glossary-{de,fr,es,it,ru}.md: terminology for each language. Follow
  them. Register is informal (du / tu / tú / tu / ты) and school-level.

CHANGING TEXT IN SIX LANGUAGES
- Every English change must be mirrored in all five overlays in the same commit.
- Some overlays are adapted rather than literal (the German naming sheets
  especially). Read the overlay's current sentence before changing it. If the
  error you are fixing is not in that language's version, leave it alone, and
  say so in your report.
- Formulae, element symbols, state symbols and charges are never translated.

LOCALISE, DON'T JUST TRANSLATE
Write each language the way a chemistry teacher in that country would write
it for their own students, not as a word-for-word rendering of the English.
- The glossary decides first. docs/i18n/glossary-<lang>.md already settles
  many conventions: group numbering 1–18, the × sign, decimal commas, year
  labels (Klasse 10, 2ᵈᵉ, 9 класс…), and terms such as "groupe
  caractéristique" or "сложный эфир". Where it has decided, follow it even if
  your instinct differs. Where it is silent, choose what that country's school
  textbooks use, and ADD the decision to the glossary (term | choice | reason)
  in the same commit, so the next agent inherits it.
- Numbers, units and typography, following docs/i18n/README.md §4 and each
  glossary:
  - decimal comma in de/fr/es/it/ru (35,5; 12,5 %; 6,02 × 10²³);
  - that language's thousands separator (100 000 or 100.000, as the glossary
    says);
  - a no-break space between a number and its unit, and before % where the
    language uses one;
  - the language's own quotation marks („…“, « … », «…»);
  - French no-break spaces before : ; ! ?
  Formulae and equations keep their own notation.
- Chemical names in the form students meet in that country's school: the
  local IUPAC form and the usual school name where they differ, e.g.
  Eisen(III)-chlorid, acide éthanoïque, этановая кислота. Use the country's own
  word order for esters and Roman-numeral names; do not copy the English
  order.
- Everyday examples (household products, foods, places) should be familiar in
  that country. Swap an example only if the chemistry stays exactly the same
  (same pH band, same reaction), and report each swap.
- Anything tied to Australia or to English (Victorian Curriculum, VCE, "the
  VCE data book", "Year 10 class table", English-only resources) is
  withheld or adapted, never translated. See docs/i18n/README.md §
  "Locale-appropriate content". "Use the data book" becomes whatever that
  country's students actually have (for example the German Tafelwerk or
  Formelsammlung), or it is dropped. Never invent a local curriculum
  reference.
- Diagram labels and other text in fixed spaces: measure the text in the
  browser for every language. If a label does not fit, change the layout (see
  README §3a: "a fixed-slot measurement constrains the layout that created the
  slot, not the vocabulary"). Do not use an abbreviation nobody uses.
- In your report, list every place where you localised rather than
  translated (a different example, a changed convention, withheld content),
  with the reason, separately from the plain list of strings.

CHEMISTRY
- You are writing for students aged 14–18. Every statement must be correct at
  that level, and not merely simplified into something false. If one of the
  fixes below seems wrong to you, do not apply it: explain why in your report.

VERIFY (targeted, not the full suite)
- npm run typecheck
- npx eslint <the files you touched>   (read $? directly; never pipe it)
- npx vitest run src/i18n              (plus any test dir you touched)
- The one Playwright spec named in your task, against your own dev server:
  PLAYWRIGHT_BASE_URL=http://localhost:<PORT> npx playwright test <spec>
- A VISUAL CHECK is mandatory: screenshot the pages you changed in English and
  German, desktop and 375 px wide, light and dark theme where colours changed.
  Use a short Playwright script that saves screenshots, then read the PNGs.
  (The built-in browser pane cannot preview a second worktree while port 3000
  is taken.) Visual checks have caught more bugs on this project than tests.

REPORT (your final message; the user reads it)
- Branch and commit sha(s).
- What you changed, one line per item, in the order of your task list.
- Anything you did not do or did differently, and why.
- Every new or changed non-English string, grouped by language, so a native
  speaker can review them.
- Test and lint results with real exit codes, and the screenshot paths.
```

---

## Prompt 1: Example cards show their descriptions

```text
TASK: The cheat-sheet pages never show the `description` of an example card,
and the section example cards run the name and formula together. Fix both, in
all six languages.

WHAT IS WRONG
1. src/app/[lang]/(main)/cheat-sheets/[slug]/page.tsx renders
   `sheet.formulaExamples` (the "Example formulas" panel) and
   `section.examples` (cards under a section) with only `name` and `formula`.
   `FormulaExample.description` (src/core-engine/types/general.ts) is in the
   data but never rendered. On *Relative Atomic & Formula Mass* the lost
   descriptions are the actual working ("2 x 1 + 16 = 18"), so every card there
   is a formula with no answer. Elsewhere it loses "17 protons, 18 neutrons",
   "half-life about 5730 years", etc.
2. The section example card puts `<span>{name}</span>` next to an inline
   `MoleculeText` whose `mt-1` does nothing, so it reads "Chlorine-35Cl-35".
   The formula-example card above it uses `flex flex-col` and is fine. Make
   them consistent.
3. The overlays carry no descriptions at all. `CheatSheetOverlay` has
   `formulaExampleNames` and `CheatSheetSectionOverlay` has `exampleNames`, but
   there is nothing for descriptions, so a German reader would get English.

DO
- Render `description` on both kinds of card, under the formula, in
  `text-xs text-(--muted)`. Where a description is a calculation, it must read
  as maths: see the next point.
- On the Relative Atomic & Formula Mass sheet, replace the letter "x" used as
  a multiplication sign with "×" everywhere it appears: descriptions, the
  "Worked examples" table's "Adding up" column, and the prose ("24 + 2 x 17").
  The Stoichiometry sheet already uses ×.
- Extend the overlay types with `formulaExampleDescriptions?: string[]` and
  `exampleDescriptions?: string[]` (English order, same length as the English
  list; use '' for an example that has none, or pick a cleaner shape and
  explain why). Wire them through getCheatSheet in src/i18n/cheat-sheets.ts.
- Translate every description into de, fr, es, it, ru. Calculations keep their
  numbers but follow each language's number format (German/French/Spanish/
  Italian/Russian use a decimal comma: 35,5; check the glossary and the
  existing overlays for what has been used so far, and match it).
- Extend src/i18n/cheat-sheets.test.ts: a translated sheet must have a
  description wherever English has one, and numbers in a calculation must
  agree with the English (after normalising the decimal separator).

DO NOT
- Change any other wording. Science fixes are later tasks.

PLAYWRIGHT SPEC: e2e/cheat-sheet-atomic-structure.spec.ts
VISUAL CHECK: /en and /de for relative-formula-mass, atomic-structure,
isotopes-and-radioactivity, at desktop and 375 px.
```

---

## Prompt 2: Science fixes on the two atom sheets

```text
TASK: Apply the review's content fixes to two sheets, "Atoms & the Periodic
Table" (slug atomic-structure) and "Isotopes & Radioactivity" (slug
isotopes-and-radioactivity), in English and the five overlays. Text only: do
not touch the diagrams, the script or page.tsx.

These two sheets were redesigned recently and carefully. Read the comments
in src/lib/cheat-sheet-data.ts around them and docs/CHEAT_SHEET_IMAGES.md
before changing anything, so you don't undo a decision that was made on
purpose.

ATOMS & THE PERIODIC TABLE
1. Key takeaway 3 says the outer-level count "is what the periodic table is
   arranged by". That contradicts the sheet's last section: the table is
   ORDERED by atomic number, and the outer count decides the GROUP. Suggested:
   "…and how many are in the outer level decides which group (column) an
   element is in."
2. "Groups and periods" ends "So the row tells you roughly how big the atom
   is." That conflicts with "Atomic size" (atoms shrink across a row; Na is
   nearly twice the radius of Cl). Suggested: "…so atoms get bigger as you go
   down to a new row."
3. "Reactivity…": "The same metals with an acid give off hydrogen, faster
   still." Add that this is far too violent to try in a school lab.
4. Remove curriculum commentary from the student
   prose: "Both terms are an extension here: the curriculum for these years
   names neither, and you cannot read a table cell without them." and
   "…They are called metalloids, which is a word the curriculum does not
   use." Keep the chemistry in each sentence; `curriculumRef` already records
   the curriculum point.

ISOTOPES & RADIOACTIVITY
5. Key takeaway 2 ("Relative atomic mass is a weighted average…") and both
   common mistakes are about relative atomic mass as a weighted average. The
   section that taught it was removed on 2026-09-22 (see
   docs/CHEAT_SHEET_IMAGES.md, "Slot 4 is gone"), so they refer to something
   the sheet no longer explains.
   The owner's decision: REMOVE takeaway 2 and both common mistakes, in
   English and all five overlays. Do NOT write replacements and do NOT restore
   the section. If that leaves `commonMistakes` empty, check that the page
   hides the "Watch out for" panel cleanly (page.tsx renders it only when the
   list is non-empty) and that the overlay shape test still passes; adjust
   the overlays (omit the key, or use an empty array) to match whatever the
   English ends up as.
   Leave the Carbon-12 example card, but check it still makes sense on its
   own, and report if it does not.
6. "Elements that had to be made": "Elements past uranium have no stable
   isotopes and are not found in nature". Np and Pu occur in trace amounts in
   uranium ores. Suggested: "…are not found in nature in any useful amount."
7. "Unstable nuclei…": cobalt-60 is a beta emitter whose daughter nucleus gives
   out the gamma rays. Reword so it is not false, e.g. "Cobalt-60 gives out
   beta and gamma radiation, and it is used for its gamma." Also lead and thick
   concrete REDUCE gamma rather than stop it completely; say so briefly.
8. Same as item 4 for this sheet: "Both terms are an extension: the curriculum
   for these years names neither, and nothing here works without them." and
   "This is an extension: the curriculum does not ask for made elements. They
   are here because…" (keep the second half's reason if it helps a student).

ALSO
- Update any `alt`/`imageAlt` whose meaning changes as a result. It probably
  won't.

PLAYWRIGHT SPEC: e2e/cheat-sheet-atomic-structure.spec.ts
VISUAL CHECK: both sheets in /en and /de, desktop.
```

---

## Prompt 3: Science fixes on the other 13 sheets

```text
TASK: Apply the review's content fixes to the remaining cheat sheets, in
English and the five overlays. Text only. The atom sheets are done already,
and the "x" → "×" change on Relative Atomic & Formula Mass is also done
already.

ACIDS & BASES (acids-and-bases)
1. Takeaway "Neutral: pH 7 at 25 °C — pure water and most salts." Many salt
   solutions are not neutral (Na2CO3, NH4Cl, sodium ethanoate). → "pure water,
   and solutions of salts like NaCl".
2. "pH 2 is 100× more acidic than pH 4" → "has 100× the H+ concentration of
   pH 4".

STATES OF MATTER (states-of-matter)
3. Gas takeaway "particles move freely and fast". At the same temperature,
   liquid particles are about as fast. → "move freely and are far apart".

BALANCING CHEMICAL EQUATIONS (balancing-equations)
4. Takeaway 5 says "Always include state symbols", but the "Balanced" example
   is the only one with states. Add states to the polyatomic-ion example
   (Al2(SO4)3 (aq) + 3Ba(NO3)2 (aq) -> 2Al(NO3)3 (aq) + 3BaSO4 (s)). Leave
   "Unbalanced" without them and add "(no states yet)" to its name.

TYPES OF CHEMICAL REACTIONS (reaction-types)
5. The synthesis example 2Mg + O2 → 2MgO is also a combustion, and the sheet's
   own quick-tell rule then gives two answers. Replace it with a synthesis that
   is not a combustion: Fe (s) + S (s) -> FeS (s), or N2 (g) + 3H2 (g) ->
   2NH3 (g). Check that the "How to tell them apart" section still holds.
6. Combustion takeaway: "fuel + oxygen → carbon dioxide + water" → add
   "(for a hydrocarbon fuel)".

CHEMICAL BONDS & STRUCTURE (chemical-bonds)
7. "The group number tells you how many valence electrons a main-group
   element has." The site uses 1–18 numbering ("group 17 the halogens"), so
   this is wrong for groups 13–18. → "the last digit of the group number (Cl is
   in group 17: 7 valence electrons)".

WRITING IONIC FORMULAS (chemical-formulas)
8. Common mistake "Writing the anion first because it sounds first in casual
   speech." In English the cation is said first. Remove it, unless you can
   find a language overlay where the point is real. If so, keep it there only
   if the overlay shape allows it; otherwise remove it everywhere and report.

POLYATOMIC IONS (polyatomic-ions)
9. "Adding H+ to an anion raises its charge by one" → "makes its charge one
   less negative (CO3 2− → HCO3−)".
10. "most nitrates and all ammonium salts are soluble" → "all nitrates and all
    ammonium salts".
11. Common mistake 3 writes "(−2)"; the rest of the sheet writes "2−". Use 2−.
12. "The only common polyatomic cation is ammonium" → add "(apart from
    hydronium, H3O+, which you meet in acids)".

RELATIVE ATOMIC & FORMULA MASS (relative-formula-mass)
13. Common mistake 1 says "Ar is a comparison with hydrogen"; takeaway 1 and
    the first section say the standard is carbon-12. → "Ar is a comparison and
    has no unit."
14. Six common mistakes is too many. Remove "Mixing a data-book value into a
    question built on the class table…" (it repeats a section) and
    "Averaging the Ar values instead of adding them." (it repeats a takeaway),
    leaving four.

THE MOLE & STOICHIOMETRY (stoichiometry)
15. Takeaway 1 writes "6.02 × 10^23". Use "6.02 × 10²³".
16. Common mistake "…then give 3 significant figures" is wrong as a blanket
    rule. → "…then round to the same number of significant figures as the
    least precise value you were given."

LEWIS STRUCTURES (lewis-structures)
17. Takeaway 1 "Valence electrons = group number (…N 5, O 6, halogens 7)".
    The sheet's own table puts N in group 15. Same fix as item 7.
18. "Year 10 essentials" introduces "loner" as if it were standard. Introduce
    it as "an unpaired electron (a 'loner')" the first time. See the "loner"
    decisions in docs/i18n/glossary-*.md: several languages deliberately do
    NOT use a nickname. Follow each glossary.

NAMING ORGANIC COMPOUNDS (organic-nomenclature)
19. Common mistake "Forgetting the locant for -ene, -ol, -one when the chain
    has 4 or more carbons". Wrong for -ol: propan-1-ol vs propan-2-ol. →
    "…whenever the group could sit in more than one position (propan-1-ol vs
    propan-2-ol)".
20. The suffix-priority table has no amide. Add a row "Amide | -amide |
    ethanamide" between Ester and Aldehyde. Tables are compared row for row:
    add the row to every overlay.

FUNCTIONAL GROUPS (functional-groups)
21. The Ester row's "General formula" is "—". → "CₙH₂ₙO₂" (the same as
    carboxylic acids, which makes a good isomer point).

TWO LEFTOVERS FROM THE ATOM SHEETS (found by the previous agent)
22. Isotopes & Radioactivity, "Elements that had to be made": "They are built
    in accelerators by firing one nucleus at another". That is wrong for the
    first ones: neptunium and plutonium are made in nuclear reactors, when
    uranium captures neutrons. Only the heavier ones come from accelerators.
    Suggested: "The first few, such as plutonium, are made in nuclear reactors
    by adding neutrons to uranium. The heavier ones are built in accelerators
    by firing one nucleus at another, sometimes a few atoms at a time."
23. Atoms & the Periodic Table, "Electrons, energy levels…": "Your teacher and
    the curriculum may call these shells, and it means the same thing." This
    is curriculum commentary too. → "Your teacher may call these shells; it
    means the same thing." Use each language's school word for "shell" (see
    the glossary).

As on the atom sheets, remove any curriculum commentary from the student
prose on these sheets (it belongs in `curriculumRef`). Report where you found
it.

PLAYWRIGHT SPEC: none specific. Run e2e/cheat-sheet-atomic-structure.spec.ts
as a smoke test.
VISUAL CHECK: /en and /de for every sheet you changed, desktop only; look
especially at the tables you added rows to.
```

---

## Prompt 4: Diagram pipeline: inline SVG, lighter type, text per language

```text
TASK: Change how cheat-sheet diagrams are rendered so their text can be
regular weight at the size of the surrounding prose, and so a diagram's labels
can be in the reader's language. This is infrastructure. The six existing
diagrams keep their current content; tasks 5 and 6 redraw them.

THE PROBLEM
Every text element in all six SVGs is bold (700) at 20–28 units, which draws
at 16–22 CSS px bold. The prose above each diagram is 14 px regular, so a
diagram reads as a block of text with a picture attached. The cause is in
scripts/cheat-sheet-diagrams.mts (MIN_TEXT, MIN_LARGE and their comments). The
diagrams are loaded with <img>, and an <img> SVG cannot follow the site's
[data-theme] light/dark toggle. No single grey passes 4.5:1 on both
backgrounds, so every glyph was made WCAG "large text" instead (bold, ≥20
units). Also, the text inside the images is English on every locale.

READ FIRST
- scripts/cheat-sheet-diagrams.mts (all of it, header first) and
  scripts/diagram-palette.mts
- docs/CHEAT_SHEET_IMAGES.md
- src/app/[lang]/(main)/cheat-sheets/[slug]/page.tsx (the image block and its
  long comment) and src/components/cheat-sheets/PannableBox.tsx
- e2e/cheat-sheet-diagrams.spec.ts
- src/app/globals.css ([data-theme] blocks; --muted passes 7:1 in both themes)

GOAL
1. Diagrams render as INLINE SVG in the page, so their colours come from CSS
   custom properties that change with [data-theme]. Define diagram tokens
   (ink, muted ink, proton, neutron, electron, accent line, …) in globals.css
   for both themes. Text tokens must reach 4.5:1 and graphic tokens 3:1
   against the diagram's background, in BOTH themes. Measure them and put the
   ratios in a comment.
2. New type scale: labels regular weight (400) at about 14 CSS px, i.e.
   ≈17–18 units in the 640-wide space drawn at 512 px. Allow bold/large ONLY
   for a slot's single focal item. Replace MIN_TEXT/MIN_LARGE with rules that
   match, still enforced mechanically by the script (it should refuse a label
   below the floor, and refuse more than one bold "focal" element per slot).
3. Labels per language (decided: one output per language). The drawing
   functions take their strings from a per-slot strings table with en, de, fr,
   es, it, ru entries, and the script writes one output per slot per locale.
   The page picks the reader's locale. Missing strings must fail the script,
   not fall back to English silently. For now, fill the non-English entries
   with the English text and mark each one `// TODO translate (task 5/6)`; the
   next tasks rewrite all of these labels anyway.
4. Accessibility: the accessible name must come from the translated
   `section.image.alt` the page already has (role="img" + aria-label, or
   aria-labelledby pointing at a translated element), not from the English
   <title>/<desc> inside the file. The IDs in each SVG must be unique on the
   page.
5. Keep: the 512 px pinned width, PannableBox panning on phones, the
   "draw it twice and compare" determinism, the --check mode, and "no baked
   background".

HOW (you choose; justify it in the script header)
- The generated output must work in the static prerender and on the deploy
  target without depending on reading public/ at request time. One good option
  is for the script to emit TypeScript modules (e.g. a generated map of slot →
  locale → SVG markup string) that the page imports. Check the Next 16 docs in
  node_modules/next/dist/docs/ for anything that affects this.
- If you use dangerouslySetInnerHTML: the markup is generated at build time
  from strings in this repository, never from user input. Say that in a
  comment, and keep the script's esc() on every string.
- Decide what happens to a future hand-made diagram dropped into public/ (the
  "drop in a file" contract in docs/CHEAT_SHEET_IMAGES.md). Keeping <img> as the
  fallback for non-generated files is fine.

UPDATE
- docs/CHEAT_SHEET_IMAGES.md (the size/contrast reasoning, the new tokens, and
  how to add a locale string), the script header, and the page.tsx comment.
  Delete reasoning that is no longer true rather than adding to it.
- e2e/cheat-sheet-diagrams.spec.ts: keep the 512 px and 320 px-reflow checks,
  and add one that the diagram text on /de is the German entry (it will equal
  English until task 5, so assert against the strings table, not a literal).

DO NOT
- Change what any diagram shows, or its wording. That is tasks 5 and 6.

PLAYWRIGHT SPEC: e2e/cheat-sheet-diagrams.spec.ts
VISUAL CHECK: every diagram on both sheets, light AND dark theme, desktop and
375 px. Compare against the current versions and confirm the type is now
visibly lighter than, or equal to, the paragraph text.
```

---

## Prompt 5: Rework diagrams 01, 02, 05, 06 (Atoms & the Periodic Table)

```text
TASK: Redraw the four diagrams on "Atoms & the Periodic Table" (slug
atomic-structure) using the new pipeline from task 4, with far less text, and
translate their labels into all six languages.

Read the header of scripts/cheat-sheet-diagrams.mts and docs/CHEAT_SHEET_IMAGES.md
first. The house rules there (probability cloud, not orbits; say the scale;
a Bohr-style ring only when labelled as a counting model) still apply.

RULES FOR EVERY DIAGRAM
- No in-image title. The section heading directly above already names it.
- At most about 6 short labels, and no full sentences except one short
  caveat line where the house rules require one.
- Nothing that only the paragraph needs: if the paragraph says it, cut it.
- A phone shows only the left ~236–290 of 512 px first. Put labels beside or
  under the object on the LEFT, or stack the layout vertically. The right-hand
  third may repeat or decorate, but nothing load-bearing goes only there.
- One typeface: no monospace. Use tabular figures if you need alignment.
- Label particles directly (a short leader to one proton, one neutron, one
  electron) instead of a "filled = proton, hollow = neutron" key.
- After each redraw, update `alt` in src/lib/cheat-sheet-data.ts and
  `imageAlt` in all five overlays so they describe what is now drawn.

01 INSIDE AN ATOM (01-inside-an-atom)
- Cut the 11 text lines to about 3: "electron cloud", "nucleus", and one
  scale line: "not to scale: the nucleus is about 1/100,000 of the atom's
  width". Say WIDTH (or diameter): "of the atom" alone is ambiguous, and by
  volume the ratio is about 10⁻¹⁵.
- The cloud has an empty ring around the nucleus, so it reads as a thick
  orbit. Make the dot density fall off continuously outward from the nucleus,
  with no gap.
- The nucleus is 3 p + 4 n (lithium-7) but unnamed. Either label it
  "lithium-7" in small type or make it clearly generic. State which in the
  alt text.

02 ATOMIC AND MASS NUMBER (02-atomic-and-mass-number)
- Remove the title. Labels become "mass number = protons + neutrons" and
  "atomic number = protons". Keep "35 − 17 = 18 neutrons" in the sans-serif.
- The alt text says "arrows": either draw arrowheads on the leaders or change
  the alt text in all six languages.
- The labels are currently all on the right. See the phone rule.

05 ENERGY LEVELS, SODIUM (05-energy-levels)
- The element is never named in the picture. Put "Na" in the nucleus (or
  label "sodium").
- The caveat "The nucleus is drawn about 100,000 times too big" is wrong for
  this drawing: nucleus r = 17, outer band r ≈ 88, so it is drawn at ~1/5 of
  the atom instead of 1/100,000, i.e. ~20,000× too big. Use one line:
  "A way to count electrons, not a picture of an atom." If you keep a scale
  remark, compute it from the drawing's own constants in the script so it
  cannot drift.
- "2, 8, 1" and the three "level n: x electrons" lines say the same thing.
  Keep the big "2, 8, 1" (the one focal item) and remove the three lines.
- Replace "11 protons, 12 neutrons" with "11 electrons", or remove it.
- The bands are too faint to tell which dot is in which level at 512 px. Give
  each band a visible edge, and make the single outer electron stand out
  (colour or a callout reading "outer level"). It is what the paragraph is
  about.

06 ORDERED BY ATOMIC NUMBER (06-ordered-by-atomic-number)
- Remove the title, the subtitle "The small number counts the protons" and the
  bottom sentence "Tellurium has one proton fewer, so it goes first."
- Label the red number "atomic number" once, and the unlabelled 127.60/126.90
  "relative atomic mass" once. A Year 9 student will not know what those are.
- Keep "heavier, but first" / "lighter, but second". Consider an arrow between
  the tiles for the order in the table.
- Mass values in the sans-serif, not monospace.

TRANSLATION: fill the de/fr/es/it/ru entries for these four slots in the
strings table (remove the TODO markers). Use the glossaries. Keep labels short:
a German label is often 30–40 % longer than English, so check that nothing
collides in any locale, and report the longest one per slot.

PLAYWRIGHT SPEC: e2e/cheat-sheet-diagrams.spec.ts
VISUAL CHECK: all four diagrams in all SIX locales at desktop, plus en and de
at 375 px, plus en in the dark theme.
```

---

## Prompt 6: Rework diagrams 03, 07 (Isotopes & Radioactivity)

```text
TASK: Redraw the two diagrams on "Isotopes & Radioactivity" (slug
isotopes-and-radioactivity) with far less text, and translate their labels.
The same RULES FOR EVERY DIAGRAM apply as in the previous task:

- No in-image title.
- At most about 6 short labels.
- Nothing the paragraph already says.
- Load-bearing content on the left.
- One typeface.
- Label particles directly instead of using a key.
- Update alt and imageAlt in all six languages.

03 ISOTOPES OF HYDROGEN (03-isotopes-of-hydrogen)
- Remove both header lines ("All three are hydrogen: 1 proton, 1 electron."
  and the key sentence). The labels under each atom already say it.
- Replace "outer mark = electron" with a direct label on one electron.
- The paragraph says "some isotopes are radioactive and some are not", so tag
  hydrogen-3 "radioactive" and the other two "stable".
- Optional, small type: protium / deuterium / tritium under the names.
  Include it only if it fits without crowding in German and Russian.

07 HALF-LIFE (07-decay-and-made-elements; do NOT rename the file)
- Remove the title, the line "After 3 half-lives, an eighth is left.", and the
  whole carbon-14 / uranium-238 box. The paragraph and the example cards give
  both half-lives.
- The y-axis label "how much is left" is vague and feeds the misconception
  that the sample disappears. Relabel it "radioactive atoms left" (or
  "undecayed nuclei"; pick one and use the same idea in every language).
- Extend the curve to 4 half-lives (6.25 %), so it visibly keeps going and
  never reaches zero.
- Move the "100%" label clear of the y-axis and the start point.
- Keep the halving points exact: the script should compute them, not hard-code
  them.

TRANSLATION: fill the de/fr/es/it/ru strings for both slots. Percentages
follow each language's convention (German "12,5 %").

PLAYWRIGHT SPEC: e2e/cheat-sheet-diagrams.spec.ts
VISUAL CHECK: both diagrams in all six locales at desktop, en and de at
375 px, en in the dark theme.
```

---

## Prompts 7–10: New diagrams

These share one block of rules:

```text
NEW-DIAGRAM RULES (prepended to prompts 7–10, after the shared rules)
- Draw with scripts/cheat-sheet-diagrams.mts and its conventions from task 4:
  theme tokens, the type scale, per-locale strings, the determinism check.
  Put each new sheet's output in its own folder, named by slug, and number
  its slots from 01.
- Add `image` to the section in src/lib/cheat-sheet-data.ts, and `imageAlt`
  to that section in all five overlays. Add the slot to the table in
  docs/CHEAT_SHEET_IMAGES.md.
- The diagram does what the paragraph cannot: it SHOWS. No in-image title, at
  most about 6 short labels (a diagram that needs more should be two
  diagrams), no sentences, load-bearing content on the left for phones, one
  typeface, one focal item at most in bold.
- Every label in all six languages; no TODO left behind.
- Chemistry must be right to the pixel: counts, angles, lone pairs and charges
  are checked by a teacher. Where a proportion is drawn, compute it in the
  script from named constants.
- If a new section is needed to hold a diagram, keep its prose to 2–3
  sentences, and add it to all five overlays in the same position. The shape
  test will fail otherwise.
- Playwright spec: e2e/cheat-sheet-diagrams.spec.ts. Extend it only if you
  add something it does not already cover.
- Visual check: each new diagram in all six locales at desktop, en and de at
  375 px, en in the dark theme.
```

### Prompt 7: States of Matter

```text
TASK: Add two diagrams to "States of Matter" (slug states-of-matter). This
sheet describes a graph it does not show.

A. HEATING CURVE, on the section "Heating and cooling curves".
   - Temperature (y) against energy added (x), for water, from ice below 0 °C
     to steam above 100 °C.
   - Two flat plateaus labelled "melting" and "boiling", at 0 °C and 100 °C
     (the only two numbers on the y-axis). The sloped parts are labelled
     "solid", "liquid" and "gas". That makes 5 labels plus 2 tick values.
   - The boiling plateau must be clearly longer than the melting plateau. The
     true ratio is about 6.8 : 1 (2260 vs 334 J/g). Draw it true if it stays
     legible; otherwise make it at least 3 : 1 and put no numbers on the
     energy axis.
   - No arrow of time: the axis is energy added.

B. PARTICLES IN EACH STATE: three panels (solid / liquid / gas).
   - Add a new first section, "Particles in each state", with 2–3 sentences
     (in all six languages).
   - Solid: a regular, touching arrangement. Liquid: touching but irregular,
     with gaps. Gas: few particles, far apart, with short motion marks.
   - The SAME particle size in all three panels. "Particles expand when
     heated" is one of the sheet's common mistakes, and the diagram must not
     teach it.
   - Labels: the three state names only.
```

### Prompt 8: Lewis Structures

```text
TASK: Add two diagrams to "Lewis Structures" (slug lewis-structures). A
sheet about drawing structures currently has no drawings.

Before drawing, look at how the "Share to Fill" game draws electrons, bonds
and lone pairs (src/components/games/lewis-structures and its route under
src/app/[lang]/(gameplay)/games/lewis-structures), and match its visual
language where it makes sense, so a student sees one convention.

A. LEWIS STRUCTURES, on the section "Year 10 essentials".
   - H2O, NH3, CO2 (and CH4 if it fits), side by side. Bonds as lines, lone
     pairs as pairs of dots on the correct atoms: O in H2O has 2, N in NH3 has
     1, each O in CO2 has 2, C in CO2 has 0.
   - Labels: the formula under each, and one leader labelling "lone pair" and
     one labelling "bond". Nothing else.

B. VSEPR SHAPES, on the section "From Lewis structure to shape (VSEPR)".
   - Linear (CO2, 180°), trigonal planar (BF3, 120°), tetrahedral (CH4,
     109.5°), trigonal pyramidal (NH3, ~107°), bent (H2O, ~104.5°).
   - Use wedge/dash for 3D, and show lone pairs as lobes on NH3 and H2O.
   - One label per shape: name + angle. If five shapes do not fit 640 units
     legibly, use two rows, which makes the diagram taller. Do not shrink the
     type.
```

### Prompt 9: Functional Groups reaction map

```text
TASK: Add a reaction-map diagram to "Functional Groups" (slug
functional-groups), on the section "The reaction pathway you must know". That
section is currently nine arrows written as a paragraph.

- Boxes: alkene, haloalkane, primary alcohol, aldehyde, carboxylic acid,
  ester; and secondary alcohol → ketone as a side branch.
- Arrows labelled with reagents only, short form: H2O / H3PO4 catalyst (check
  against the paragraph, which says "H+ catalyst", and against the VCE data
  book convention; make the prose and the diagram agree), HX, OH− (aq),
  Cr2O7 2− / H+ (or MnO4− / H+), alcohol + H2SO4 catalyst.
- Tertiary alcohol: a short "no oxidation" stub, or leave it to the prose.
  Your call; say which in the report.
- The layout flows top to bottom or in a left-aligned zigzag, so a phone
  shows the start of the pathway first. A 640-wide map read left to right
  would put the ending off-screen.
- The group names are the labels, so the 6-label cap does not apply to the
  boxes. Keep the reagent labels short.
- Reagents use MoleculeText-style sub/superscripts inside the SVG (real
  <tspan> baseline shifts), never "Cr2O7 2-" as plain text.
```

### Prompt 10a / 10b: The remaining P3 diagrams

```text
TASK: Add one small diagram to each of the four sheets below. Each is a
standard teaching visual that the sheet currently describes in words. Keep
each to the new-diagram rules; most need 3–5 labels.

10a
1. Relative Atomic & Formula Mass, section "What 'relative' actually means":
   a balance with one carbon atom on one pan and 12 hydrogen atoms on the
   other, level. Carbon drawn larger than hydrogen, but NOT 12× the area; add
   a small "not to scale" if needed.
2. Balancing Chemical Equations, section "A method that always works":
   2H2 + O2 → 2H2O as particle pictures, with the atom counts (H 4 | 4, O 2 | 2)
   underneath.
3. Chemical Bonds & Structure, section "Why ionic compounds conduct only when
   molten or dissolved": three small panels (ion lattice; a molecule with a
   shared pair; metal cations in a sea of electrons). Labels: ionic, covalent,
   metallic.
4. Acids & Bases, beside the "pH scale landmarks" table (add to the first
   section, or add a short section): a 0–14 bar in universal-indicator
   colours, with 4–5 everyday examples placed on it. The colours must stay
   distinguishable in both themes and for red-green colour blindness: mark
   the numbers, and don't rely on hue alone.

10b
5. Writing Ionic Formulas, section "Worked example: aluminium sulfate": the
   cross-over. Al³⁺ and SO₄²⁻, the charges crossing down to become the
   subscripts, and the result Al₂(SO₄)₃.
6. Naming Inorganic Compounds: a small flowchart (metal + non-metal → ionic;
   two non-metals → molecular; H first, in water → acid), about 10 words.
   It needs a short new first section, "Which naming system?".
7. The Mole & Stoichiometry: the "mole map" (mass ↔ moles ↔ particles / gas
   volume / concentration, with the mole ratio bridging reactant and product
   moles). Formulas on the arrows: n = m/M, n = N/N_A, n = cV, n = V/V_m.
8. Naming Organic Compounds, section "Worked example": the skeletal (or
   condensed) structure of 3-methylpentan-2-ol, with the main chain numbered
   1–5 and the OH and the methyl marked.
```
