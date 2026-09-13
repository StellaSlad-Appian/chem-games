# ChemGames — Master Keyword List

**Site:** ChemGames — free browser chemistry mini-games + "Lab Cheat Sheet" reference pages for Year 9–10 / US high-school chemistry students (`https://chem-games-seven.vercel.app/`, see `01_site_context.md`).
**Market:** US primary (`location_code` 2840), AU secondary (2036), `language_code` en.
**Data source:** DataForSEO Labs (`keyword_suggestions`, `related_keywords`, `ranked_keywords`), DataForSEO Google Ads `search_volume`, and DataForSEO Google SERP `organic/live/advanced` (depth 10). Topic/intent classification and clustering by DeepSeek `deepseek-v4-flash`.
**Collected:** 2026-08-26 (all stages ran the same day). Volumes are monthly Google searches at pull time.
**Totals:** **14,230 unique keywords** across **12 topic clusters**, 112,227,920 combined US monthly searches.

This file is a *consolidation only* — it re-organises data already in `seo/`. No API was called to build it.

### Where each column comes from

| Stage file | What it contributed | Rows |
|---|---|---|
| `02_keywords_classified.csv` | Seed + lateral expansion, US **and** AU volume, CPC, intent, audience, chemistry topic | 3,178 |
| `03_competitor_keywords.csv` | Competitor ranked keywords — the only source of **keyword difficulty** and competitor/ranking-URL data | 8,654 |
| `04_master_keywords.csv` | Stage 2 + 3 deduped and mapped onto the topical map: **cluster (pillar)**, sub-topic, target page, priority tier | 11,532 |
| `04_topical_map.csv` | The 166 planned pages (pillar → sub-topic → slug), primary keyword + priority score per page | 166 |
| `06_entity_expansion.csv` | Programmatic entity keywords (Lewis structure / molar mass / formula / oxidation number / polyatomic ion) | 2,002 |
| `06_periodic_microsite_keywords.csv` | Ranked keywords of two periodic-table microsite competitors | 2,000 |
| `08_page_optimisation.csv` | The per-page target keyword actually implemented on the live site (live URL wins the `target_page`) | 16 |

**Machine-readable twin:** `seo/keywords_master.csv` — every keyword in this file, one row each, columns `keyword, search_volume_us, search_volume_au, cpc, difficulty, intent, cluster, sub_topic, target_page, target_page_status, priority_tier, source_stage`. The tables below are the readable top slice; the CSV is the complete set. Raw API responses live in `seo/raw/` (`_s6_kwsugg_*.json`, `_s8_kwsugg_*.json`, `_ranked_keywords_raw.json`, …); stage method and spend are documented in each `0N_*_summary.md`.

**Reading the tables.** `US` / `AU` = monthly searches. `KD` = DataForSEO keyword difficulty 0–100 (**only present for stage-3 competitor keywords**, 8,654 of 14,230). `AU` volume was only ever pulled for stage-2 and stage-8 keywords (2,139 of 14,230) — a blank AU cell means *not measured*, not zero. Intent: `info` / `comm` / `trans` / `nav`. `Target` is the live URL where the page already exists (stage 8) and otherwise the **planned** slug from the topical map.

---

## Contents

1. [Priority / P1 targets — the live pages](#1-priority--p1-targets--the-live-pages)
2. [Cluster index](#2-cluster-index)
3. [Highest-volume keywords overall](#3-highest-volume-keywords-overall)
4. [Periodic Table & Elements](#4-periodic-table--elements)
5. [Chemical Bonding & Molecular Structure](#5-chemical-bonding--molecular-structure)
6. [Formulas, Naming & Compounds](#6-formulas-naming--compounds)
7. [Chemical Reactions & Balancing Equations](#7-chemical-reactions--balancing-equations)
8. [Atomic Structure & Electron Configuration](#8-atomic-structure--electron-configuration)
9. [Stoichiometry, Moles & Molar Mass](#9-stoichiometry-moles--molar-mass)
10. [Study Skills & Cheat Sheets](#10-study-skills--cheat-sheets)
11. [States of Matter & Physical/Chemical Change](#11-states-of-matter--physicalchemical-change)
12. [Teachers & Classroom](#12-teachers--classroom)
13. [Acids, Bases & pH](#13-acids-bases--ph)
14. [Organic Chemistry](#14-organic-chemistry)
15. [Chemistry Games Hub](#15-chemistry-games-hub)
16. [Competitor gap keywords (stage 3)](#16-competitor-gap-keywords-stage-3)
17. [Periodic-table microsite keywords (stage 6)](#17-periodic-table-microsite-keywords-stage-6)
18. [Programmatic entity keywords (stage 4 + 6)](#18-programmatic-entity-keywords-stage-4--6)
19. [Caveats](#19-caveats)

---

## 1. Priority / P1 targets — the live pages

One target keyword per live page, from `08_page_optimisation.csv` (the on-page spec implemented on this branch). 13 content pages; 3 utility pages (`/auth`, `/profile`, `/leaderboards`) carry no keyword and are recommended `noindex`.

| Live page | Tier | Type | Primary keyword | US | AU | KD | SERP format measured | AI overview |
|---|---|---|---|---:|---:|---:|---|---|
| `/cheat-sheets/balancing-equations` | **P1** | guide | how to balance chemical equations | 22,200 | 1,900 | 0 | article/video (cached 03: 3× YouTube, labxchange… | yes |
| `/games/reaction-balancer` | **P1** | game | balancing chemical equations practice | 5,400 | 210 | 4 | practice/tool mixed: chemquiz, khanacademy… | yes |
| `/games` | **P1** | pillar_hub | chemistry games | 1,900 | 170 | 2 | portal/list, mixed (cached 03… | no |
| `/cheat-sheets` | **P1** | pillar_hub | chemistry cheat sheet | 720 | 70 | — | article/PDF list (cached 03: scribd PDF, albert.io… | no |
| `/games/formula-blaster` | **P1** | game | naming compounds quiz | 210 | 10 | 0 | quiz-platform: 10/10 organic are quizzes/practice… | no |
| `/` | **P1** | homepage | online chemistry games | 170 | 20 | — | portal/list of game sites (cached 03… | yes |
| `/games/acid-classification` | **P1** | game | acids and bases quiz | 170 | 20 | 0 | quiz-platform: 9/9 organic are quizzes… | yes |
| `/cheat-sheets/states-of-matter` | **P2** | guide | states of matter | 40,500 | 3,600 | 16 | article: wikipedia, ebsco, NASA, purdue… | yes |
| `/cheat-sheets/chemical-bonds` | **P2** | guide | ionic vs covalent bonds | 33,100 | 1,300 | 6 | article: chemistrytalk, reddit, libretexts… | yes |
| `/cheat-sheets/acids-and-bases` | **P2** | guide | acids and bases | 18,100 | 1,600 | 20 | article: wikipedia, ebsco, khanacademy, reddit… | yes |
| `/cheat-sheets/reaction-types` | **P2** | guide | types of chemical reactions | 18,100 | 1,600 | 6 | article (cached 03: wikipedia, khanacademy… | yes |
| `/games/neutralise` | **P2** | game | acid base neutralization reaction | 1,900 | 110 | — | article: 8/8 organic are explainers (libretexts… | yes |
| `/cheat-sheets/chemical-formulas` | **P3** | guide | how to write a chemical formula | 1,300 | 140 | — | article/how-to: nde-ed, wikipedia, my-gcsescience… | yes |

### Supporting keywords per live page

- **`/cheat-sheets/balancing-equations`** — *how to balance chemical equations* (22,200 US) → recommended title: “How to Balance Chemical Equations: Steps & Cheat Sheet”
  - supporting: balancing chemical equations, balancing equations, how to balance chemical equations step by step, balanced chemical equation, how to balance chemical equations easy, balancing chemical equations examples, law of conservation of mass, coefficients and subscripts
- **`/games/reaction-balancer`** — *balancing chemical equations practice* (5,400 US) → recommended title: “Balancing Chemical Equations Practice Game \| ChemGames”
  - supporting: balancing chemical equations game, balancing chemical equations, balancing equations practice, balancing chemical equations practice problems, balancing chemical equations practice online, chemistry games balancing equations, balance chemical equations, balancing chemical equations practice with answers
- **`/games`** — *chemistry games* (1,900 US) → recommended title: “Free Online Chemistry Games for High School \| ChemGames”
  - supporting: chemistry games online, fun chemistry games, chemistry games for high school, chemistry quiz game, chemistry review games, chemistry reaction games, chemistry games balancing equations, chemistry games app
- **`/cheat-sheets`** — *chemistry cheat sheet* (720 US) → recommended title: “Free Chemistry Cheat Sheets for High School \| ChemGames”
  - supporting: cheat sheet for chemistry, general chemistry cheat sheet, chemistry formulas cheat sheet, chemistry cheat sheet pdf, chemistry formula sheet, chemistry cheat sheet for final, high school chemistry cheat sheet
- **`/games/formula-blaster`** — *naming compounds quiz* (210 US) → recommended title: “Naming Compounds Quiz Game: Formula Blaster \| ChemGames”
  - supporting: chemical formula quiz, chemistry naming practice, naming chemical compounds quiz, naming ionic compounds quiz, compounds game, chemical formula practice quiz, naming compounds practice
- **`/`** — *online chemistry games* (170 US) → recommended title: “ChemGames: Free Online Chemistry Games for Students”
  - supporting: chemistry games, free chemistry games, interactive chemistry games, chemistry learning games, chemistry games for students, chemistry games for high school, fun chemistry games
- **`/games/acid-classification`** — *acids and bases quiz* (170 US) → recommended title: “Acids and Bases Quiz: Acid, Base or Neutral? \| ChemGames”
  - supporting: acid or base quiz, acid base quiz, strong acids and bases quiz, identifying acids and bases quiz, acid base game, acid and base ph scale, which one of the following is a weak acid, acids and bases practice
- **`/cheat-sheets/states-of-matter`** — *states of matter* (40,500 US) → recommended title: “States of Matter Cheat Sheet: Solids, Liquids & Gases”
  - supporting: three states of matter, what are the three states of matter, how many states of matter are there, states of matter definition, states of matter examples, states of matter plasma, phase changes, solid liquid gas
- **`/cheat-sheets/chemical-bonds`** — *ionic vs covalent bonds* (33,100 US) → recommended title: “Ionic vs Covalent Bonds: Differences, Examples & Cheat Sheet”
  - supporting: ionic and covalent bonds, covalent vs ionic compounds, how to tell ionic vs covalent, difference between ionic and covalent bonds, covalent bonding, ionic bonding, valence electrons, types of chemical bonds
- **`/cheat-sheets/acids-and-bases`** — *acids and bases* (18,100 US) → recommended title: “Acids and Bases Cheat Sheet: pH, Strong & Weak Lists”
  - supporting: strong acids and bases, weak acids and bases, ph scale acids and bases, what are acids and bases, acids and bases examples, properties of acids and bases, acids and bases cheat sheet, ph scale chart
- **`/cheat-sheets/reaction-types`** — *types of chemical reactions* (18,100 US) → recommended title: “Types of Chemical Reactions Cheat Sheet (With Examples)”
  - supporting: 5 types of chemical reactions, five types of chemical reactions, types of chemical reactions examples, 4 types of chemical reactions, what are the 5 types of chemical reactions, synthesis reaction, decomposition reaction, combustion reaction
- **`/games/neutralise`** — *acid base neutralization reaction* (1,900 US) → recommended title: “Acid-Base Neutralization Reaction Game: Neutralise!”
  - supporting: neutralization reaction, what is a neutralization reaction, neutralization reaction examples, what are the products of a neutralization reaction, neutralization reaction equation, acid base game, ph scale game
- **`/cheat-sheets/chemical-formulas`** — *how to write a chemical formula* (1,300 US) → recommended title: “How to Write a Chemical Formula: Rules & Cheat Sheet”
  - supporting: writing chemical formulas, how to write chemical formula for ionic compounds, chemical formula, polyatomic ions list, chemical formulas list, how do you write the chemical formula of a compound, chemical formula examples, subscripts in chemical formulas

### Highest-priority pages that do not exist yet

P1 rows from `04_topical_map.csv` with `exists_on_site = no` — the build queue, sorted by the stage-4 priority score.

| Planned page | Slug | Type | Primary keyword | US | Cluster |
|---|---|---|---|---:|---|
| Chemistry Experiments for High Schoolers: Fun Ideas | `/games/chemistry-experiments-high-school` | game | chemical experiments | 301,000 | Teachers & Classroom |
| Covalent vs Ionic Bonds Quiz - Bonding Practice Game | `/games/covalent-ionic-bonds-game` | game | covalent bond vs ionic | 33,100 | Chemical Bonding & Molecular Structure |
| Atomic Structure & Mass - Build an Atom Game | `/games/build-an-atom-game` | game | mass of an atom | 33,100 | Atomic Structure & Electron Configuration |
| Interactive Periodic Table - Explore Elements | `/games/interactive-periodic-table` | game | periodic table interactive | 110,000 | Periodic Table & Elements |
| Atom Basics: Parts, Definitions & Structure Game | `/games/atom-structure-parts-game` | game | atom definition | 49,500 | Atomic Structure & Electron Configuration |
| Label the Periodic Table Game - Groups & Elements | `/games/label-periodic-table` | game | label periodic table element | 33,100 | Periodic Table & Elements |
| Chemical Equation Balancer - Balance Reactions Online | `/tools/chemical-equation-balancer` | game | balancing chemical equations balancer | 49,500 | Chemical Reactions & Balancing Equations |
| Stoichiometry Practice (Mole-to-Mole & Mass-to-Mass) | `/games/stoichiometry-practice` | game | stoichiometry | 74,000 | Stoichiometry, Moles & Molar Mass |
| Electron Configuration Practice Game | `/games/electron-configuration-orbital-practice` | game | atom configuration | 90,500 | Atomic Structure & Electron Configuration |
| Molar Mass Calculator & Molecular Weight Finder | `/tools/molecular-weight-calculator` | game | molecular weight calculator | 74,000 | Stoichiometry, Moles & Molar Mass |
| Protons Neutrons Electrons Calculator Game | `/games/calculate-protons-neutrons-electrons` | game | how to determine electrons | 12,100 | Atomic Structure & Electron Configuration |
| Solubility Rules Game - Learn What Dissolves | `/games/solubility-rules-game` | game | solubility | 49,500 | Chemical Reactions & Balancing Equations |
| States of Matter Game - Free Online Chemistry Game | `/games/states-of-matter-game` | game | state of matter | 40,500 | States of Matter & Physical/Chemical Change |
| Diatomic Elements & Molecules Quiz | `/games/diatomic-elements-molecules-quiz` | game | diatomic atom | 22,200 | Formulas, Naming & Compounds |
| Metals, Nonmetals & Metalloids on the Periodic Table | `/guides/metals-nonmetals-metalloids-guide` | pillar_hub | non metals of periodic table | 33,100 | Periodic Table & Elements |
| Periodic Table Groups & Families Explained | `/guides/periodic-table-groups` | guide | group a elements on the periodic table | 49,500 | Periodic Table & Elements |
| Periodic Table: Protons, Neutrons & Atomic Mass | `/guides/periodic-table-protons-neutrons-guide` | guide | periodic | 49,500 | Periodic Table & Elements |


---

## 2. Cluster index

Clusters are the stage-4 **pillars** (`pillar` in `04_master_keywords.csv` / `04_topical_map.csv`) — kept exactly as the pipeline named them.

| # | Cluster | Keywords | US volume/mo | Planned pages | P1 pages | Live pages targeted |
|---|---|---:|---:|---:|---:|---:|
| 4 | [Periodic Table & Elements](#4-periodic-table--elements) | 4,579 | 57,523,610 | 22 | 5 | 1 |
| 5 | [Chemical Bonding & Molecular Structure](#5-chemical-bonding--molecular-structure) | 1,721 | 19,441,450 | 16 | 1 | 1 |
| 6 | [Formulas, Naming & Compounds](#6-formulas-naming--compounds) | 1,468 | 6,527,590 | 19 | 2 | 2 |
| 7 | [Chemical Reactions & Balancing Equations](#7-chemical-reactions--balancing-equations) | 1,488 | 6,394,460 | 18 | 7 | 4 |
| 8 | [Atomic Structure & Electron Configuration](#8-atomic-structure--electron-configuration) | 760 | 5,622,550 | 14 | 4 | 0 |
| 9 | [Stoichiometry, Moles & Molar Mass](#9-stoichiometry-moles--molar-mass) | 1,301 | 5,269,050 | 15 | 2 | 0 |
| 10 | [Study Skills & Cheat Sheets](#10-study-skills--cheat-sheets) | 1,323 | 4,629,430 | 19 | 1 | 7 |
| 11 | [States of Matter & Physical/Chemical Change](#11-states-of-matter--physicalchemical-change) | 324 | 2,788,570 | 6 | 2 | 1 |
| 12 | [Teachers & Classroom](#12-teachers--classroom) | 118 | 1,430,840 | 5 | 1 | 0 |
| 13 | [Acids, Bases & pH](#13-acids-bases--ph) | 378 | 1,353,060 | 9 | 1 | 3 |
| 14 | [Organic Chemistry](#14-organic-chemistry) | 288 | 1,118,260 | 9 | 0 | 0 |
| 15 | [Chemistry Games Hub](#15-chemistry-games-hub) | 482 | 129,050 | 14 | 1 | 6 |
| | **Total** | **14,230** | **112,227,920** | **166** | **27** | **13** |

---

## 3. Highest-volume keywords overall

The top 40 by US volume across every stage. Most of these are head terms the stage-4 scoring flagged as unwinnable for a new site — they are here for context, not as targets. The realistic targets are in §1.

| Keyword | US | AU | CPC | KD | Intent | Cluster | Target |
|---|---:|---:|---:|---:|---|---|---|
| chemistry table of elements | 4,090,000 | — | 0.09 | 45 | info | Periodic Table & Elements | `/tools/interactive-periodic-table` |
| periodic table | 4,090,000 | 246,000 | 0.07 | 71 | info | Periodic Table & Elements | `/tools/interactive-periodic-table` |
| periodic tables | 4,090,000 | — | 0.09 | 53 | info | Periodic Table & Elements | `/tools/interactive-periodic-table` |
| element i on periodic table | 368,000 | — | — | — | — | Periodic Table & Elements | `/elements/[element]` |
| elements chemistry table | 368,000 | — | 0.07 | 35 | info | Periodic Table & Elements | `/tools/interactive-periodic-table` |
| elements on the periodic table | 368,000 | — | 0.07 | 25 | info | Periodic Table & Elements | `/tools/interactive-periodic-table` |
| elements periodic table | 368,000 | — | 0.07 | 48 | info | Periodic Table & Elements | `/tools/interactive-periodic-table` |
| periodic table and elements | 368,000 | — | 0.07 | 70 | info | Periodic Table & Elements | `/tools/interactive-periodic-table` |
| periodic table as element | 368,000 | — | 0.07 | 40 | info | Periodic Table & Elements | `/tools/interactive-periodic-table` |
| periodic table be element | 368,000 | — | 0.07 | 40 | info | Periodic Table & Elements | `/tools/interactive-periodic-table` |
| periodic table of chemical element | 368,000 | — | 0.07 | 45 | info | Periodic Table & Elements | `/tools/interactive-periodic-table` |
| periodic table of chemical elements | 368,000 | — | 0.07 | 42 | info | Periodic Table & Elements | `/tools/interactive-periodic-table` |
| periodic table of elements | 368,000 | — | 0.07 | 54 | info | Periodic Table & Elements | `/tools/interactive-periodic-table` |
| chemical experiments | 301,000 | — | 5.78 | 6 | info | Teachers & Classroom | `/games/chemistry-experiments-high-school` |
| chemistry an experiment | 301,000 | — | 5.78 | 0 | info | Teachers & Classroom | `/games/chemistry-experiments-high-school` |
| chemistry science experiment | 301,000 | — | 5.78 | 0 | info | Teachers & Classroom | `/games/chemistry-experiments-high-school` |
| chemistry science experiments | 301,000 | — | 5.78 | 6 | info | Teachers & Classroom | `/games/chemistry-experiments-high-school` |
| alchemical | 246,000 | — | 1.23 | 28 | info | Study Skills & Cheat Sheets | `/blog/fun-chemistry-facts` |
| atoms | 246,000 | — | 6.16 | 23 | info | Atomic Structure & Electron Configuration | `/games/atom-structure-parts-game` |
| smartwork5 chemistry answers | 246,000 | — | 0.00 | 0 | info | Study Skills & Cheat Sheets | `/guides/chemistry-practice-problems` |
| barf acronym chemistry | 201,000 | — | 0.00 | 0 | info | Chemical Reactions & Balancing Equations | `/guides/balancing-chemical-equations-practice` |
| chemistry | 201,000 | — | 8.57 | 100 | info | Study Skills & Cheat Sheets | `/guides/what-is-chemistry-guide` |
| chemistry and chemicals | 201,000 | — | 8.57 | 5 | info | Study Skills & Cheat Sheets | `/guides/what-is-chemistry-guide` |
| match the following compounds to their likely solubility in water | 201,000 | — | 0.00 | 0 | info | Formulas, Naming & Compounds | `/games/chemical-formulas-practice` |
| aleks initial knowledge check answers chemistry | 165,000 | — | 0.00 | 0 | info | Study Skills & Cheat Sheets | `/guides/chemistry-practice-problems` |
| provide the formula for each compound | 165,000 | — | 0.00 | 0 | info | Formulas, Naming & Compounds | `/games/chemical-formulas-practice` |
| chemical element pa | 135,000 | — | 0.00 | 14 | info | Periodic Table & Elements | `/elements/[element]` |
| kinetics equation | 135,000 | — | 3.31 | 4 | info | Study Skills & Cheat Sheets | `/guides/chemistry-formulas-cheat-sheet` |
| kinetics equations | 135,000 | — | 3.31 | 7 | info | Study Skills & Cheat Sheets | `/guides/chemistry-formulas-cheat-sheet` |
| pa element | 135,000 | — | 0.00 | 15 | info | Periodic Table & Elements | `/elements/[element]` |
| protactinium element | 135,000 | — | — | — | — | Periodic Table & Elements | `/elements/[element]` |
| chemical ionization | 110,000 | — | 12.02 | 0 | info | States of Matter & Physical/Chemical Change | `/guides/chemical-energy-and-properties-guide` |
| chemistry formulas | 110,000 | 1,600 | 31.76 | 26 | info | Study Skills & Cheat Sheets | `/guides/chemistry-formulas-cheat-sheet` |
| compound | 110,000 | — | 1.15 | 63 | info | Formulas, Naming & Compounds | `/guides/what-is-a-compound-chemistry` |
| compounds | 110,000 | — | 1.15 | 44 | info | Formulas, Naming & Compounds | `/guides/what-is-a-compound-chemistry` |
| element lanthanum | 110,000 | — | — | — | — | Periodic Table & Elements | `/elements/[element]` |
| interactive periodic table | 110,000 | — | 2.21 | 41 | info | Periodic Table & Elements | `/games/interactive-periodic-table` |
| interactive periodic table of elements | 110,000 | — | 1.84 | 67 | info | Periodic Table & Elements | `/games/interactive-periodic-table` |
| interactive periodic tables | 110,000 | — | 1.84 | 41 | info | Periodic Table & Elements | `/games/interactive-periodic-table` |
| interactive table of elements | 110,000 | — | 1.84 | 67 | info | Periodic Table & Elements | `/games/interactive-periodic-table` |

---

## 4. Periodic Table & Elements

**4,579 keywords · 57,523,610 US searches/mo · 22 planned pages · 18 sub-topics.**
Keywords in this cluster already assigned to a live page: `/cheat-sheets/chemical-bonds`.

**Planned pages** (from `04_topical_map.csv`, by priority score)

| Page | Slug | Type | Tier | Primary keyword | US | Kws | Exists |
|---|---|---|---|---|---:|---:|---|
| [Element] - Properties, Uses & Facts | `/elements/[element]` | programmatic_template | Programmatic | elements po | 60,500 | 833 | no |
| Interactive Periodic Table - Explore Elements | `/games/interactive-periodic-table` | game | P1 | periodic table interactive | 110,000 | 90 | no |
| Label the Periodic Table Game - Groups & Elements | `/games/label-periodic-table` | game | P1 | label periodic table element | 33,100 | 46 | no |
| Elements Quiz - Best Guess-the-Element Challenge | `/games/element-quiz` | game | P2 | element quiz | 1,600 | 214 | no |
| Metals, Nonmetals & Metalloids on the Periodic Table | `/guides/metals-nonmetals-metalloids-guide` | pillar_hub | P1 | non metals of periodic table | 33,100 | 486 | no |
| Periodic Table Flashcards - Learn Elements by Symbol | `/games/periodic-table-flashcards` | game | P2 | two letter symbol from the periodic table | 4,400 | 69 | no |
| Periodic Table Game - Free Online Element Quiz | `/games/periodic-table-game` | game | P2 | quiz about the periodic table | 6,600 | 334 | no |
| Periodic Table Groups & Families Explained | `/guides/periodic-table-groups` | guide | P1 | group a elements on the periodic table | 49,500 | 236 | no |
| Periodic Table: Protons, Neutrons & Atomic Mass | `/guides/periodic-table-protons-neutrons-guide` | guide | P1 | periodic | 49,500 | 274 | no |
| Periodic Table Charges & Valence Electrons Guide | `/guides/periodic-table-charges-valence-guide` | guide | P2 | periodic table of elements and charges | 60,500 | 272 | no |
| How To Read The Periodic Table | `/guides/how-to-read-the-periodic-table` | guide | P2 | periodic table and labels | 33,100 | 239 | no |
| Periodic Table Trends - Interactive Practice | `/guides/periodic-table-trends` | guide | P2 | periodic table by electronegativity | 33,100 | 95 | no |

*…and 10 more pages in this pillar — see `04_topical_map.csv`.*

**Top 30 keywords by US volume**

| Keyword | US | AU | CPC | KD | Intent | Target | Stage |
|---|---:|---:|---:|---:|---|---|---|
| chemistry table of elements | 4,090,000 | — | 0.09 | 45 | info | `/tools/interactive-periodic-table` | 03 |
| periodic table | 4,090,000 | 246,000 | 0.07 | 71 | info | `/tools/interactive-periodic-table` | 02+03 |
| periodic tables | 4,090,000 | — | 0.09 | 53 | info | `/tools/interactive-periodic-table` | 03 |
| element i on periodic table | 368,000 | — | — | — | — | `/elements/[element]` | 06-microsite |
| elements chemistry table | 368,000 | — | 0.07 | 35 | info | `/tools/interactive-periodic-table` | 03 |
| elements on the periodic table | 368,000 | — | 0.07 | 25 | info | `/tools/interactive-periodic-table` | 03+06-microsite |
| elements periodic table | 368,000 | — | 0.07 | 48 | info | `/tools/interactive-periodic-table` | 03 |
| periodic table and elements | 368,000 | — | 0.07 | 70 | info | `/tools/interactive-periodic-table` | 03 |
| periodic table as element | 368,000 | — | 0.07 | 40 | info | `/tools/interactive-periodic-table` | 03 |
| periodic table be element | 368,000 | — | 0.07 | 40 | info | `/tools/interactive-periodic-table` | 03 |
| periodic table of chemical element | 368,000 | — | 0.07 | 45 | info | `/tools/interactive-periodic-table` | 03+06-microsite |
| periodic table of chemical elements | 368,000 | — | 0.07 | 42 | info | `/tools/interactive-periodic-table` | 03 |
| periodic table of elements | 368,000 | — | 0.07 | 54 | info | `/tools/interactive-periodic-table` | 03 |
| chemical element pa | 135,000 | — | 0.00 | 14 | info | `/elements/[element]` | 03+06-microsite |
| pa element | 135,000 | — | 0.00 | 15 | info | `/elements/[element]` | 03+06-microsite |
| protactinium element | 135,000 | — | — | — | — | `/elements/[element]` | 06-microsite |
| element lanthanum | 110,000 | — | — | — | — | `/elements/[element]` | 06-microsite |
| interactive periodic table | 110,000 | — | 2.21 | 41 | info | `/games/interactive-periodic-table` | 03+06-microsite |
| interactive periodic table of elements | 110,000 | — | 1.84 | 67 | info | `/games/interactive-periodic-table` | 03+06-microsite |
| interactive periodic tables | 110,000 | — | 1.84 | 41 | info | `/games/interactive-periodic-table` | 03+06-microsite |
| interactive table of elements | 110,000 | — | 1.84 | 67 | info | `/games/interactive-periodic-table` | 03+06-microsite |
| lanthanum | 110,000 | — | — | — | — | `/elements/[element]` | 06-microsite |
| lanthanum element | 110,000 | — | — | — | — | `/elements/[element]` | 06-microsite |
| na sodium | 110,000 | — | — | — | — | `/elements/[element]` | 06-microsite |
| natrium element | 110,000 | — | — | — | — | `/elements/[element]` | 06-microsite |
| periodic table interactive | 110,000 | — | 1.84 | 45 | info | `/games/interactive-periodic-table` | 03+06-microsite |
| sodium na | 110,000 | — | — | — | — | `/elements/[element]` | 06-microsite |
| bi element | 90,500 | — | — | — | — | `/elements/[element]` | 06-microsite |
| element bi | 90,500 | — | 0.23 | 12 | info | `/elements/[element]` | 03+06-microsite |
| helium | 90,500 | — | — | — | — | `/elements/[element]` | 06-microsite |

*4,549 further keywords in this cluster — `seo/keywords_master.csv`, filter `cluster == "Periodic Table & Elements"` (their combined US volume is 39,687,110/mo).*

Sub-topics: Element Profiles (878) · Reading the Table (785) · Microsite gap (per-element) (743) · Element Quiz Games (548) · Element Classification (486) · Oxidation number (programmatic) (294) · Groups & Families (236) · Interactive Tool (109) · +10 more

---

## 5. Chemical Bonding & Molecular Structure

**1,721 keywords · 19,441,450 US searches/mo · 16 planned pages · 6 sub-topics.**
Keywords in this cluster already assigned to a live page: `/cheat-sheets/chemical-bonds`.

**Planned pages** (from `04_topical_map.csv`, by priority score)

| Page | Slug | Type | Tier | Primary keyword | US | Kws | Exists |
|---|---|---|---|---|---:|---:|---|
| Covalent vs Ionic Bonds Quiz - Bonding Practice Game | `/games/covalent-ionic-bonds-game` | game | P1 | covalent bond vs ionic | 33,100 | 64 | no |
| Molecule Builder Game - Build Molecules Free | `/games/molecule-builder-game` | game | P2 | phet molecule shapes | 6,600 | 29 | partial |
| Molecular Shape Builder Game - Build & Identify Molecules | `/games/molecular-shape-builder` | game | P2 | molecular shape phet | 6,600 | 10 | no |
| Chemical Bonding Basics - Molecule Definition & Bond Types | `/guides/bonding-basics-guide` | guide | P2 | covalent bonding | 90,500 | 149 | no |
| Bonding Practice Game - Lewis Structures & Chemical Bonds | `/games/bonding-practice` | game | P2 | classify these bonds as ionic or covalent | 22,200 | 170 | no |
| Molecular Geometry & VSEPR Guide - Shapes, Bond Angles | `/guides/molecular-geometry-vsepr-guide` | pillar_hub | P2 | chemical geometry | 49,500 | 112 | no |
| Electronegativity & Polar Molecules Guide - Bond Polarity Chart | `/guides/electronegativity-polarity-guide` | guide | P2 | chart of electronegativity | 49,500 | 74 | no |
| Intermolecular Forces Guide - Hydrogen Bonding & More | `/guides/intermolecular-forces-guide` | guide | P2 | identifying the intermolecular forces between atoms ions and molecules | 33,100 | 43 | no |
| Lewis Dot Structures & Diagrams Guide (Electron Dot Formulas) | `/guides/lewis-dot-structures` | guide | P2 | lewis bond structure | 40,500 | 105 | no |
| [Compound] Lewis Structure | `/guides/lewis-structure/[compound]` | programmatic_template | Programmatic | lewis dot structure for bf3 | 18,100 | 31 | no |
| Lewis Structure Practice Game (Dot Diagram Quiz) | `/games/lewis-structure-practice` | game | P2 | lewis diagrams practice | 3,600 | 106 | no |
| Lewis Structure Builder Tool | `/tools/lewis-structure-generator` | game | P2 | lewis dot structure generator | 5,400 | 4 | no |

*…and 4 more pages in this pillar — see `04_topical_map.csv`.*

**Top 30 keywords by US volume**

| Keyword | US | AU | CPC | KD | Intent | Target | Stage |
|---|---:|---:|---:|---:|---|---|---|
| molecules | 110,000 | — | 2.22 | 20 | info | `/guides/bonding-basics-guide` | 03 |
| bond | 90,500 | — | 6.70 | 67 | info | `/guides/bonding-basics-guide` | 03 |
| covalent bond | 90,500 | — | 0.00 | 20 | info | `/guides/bonding-basics-guide` | 03 |
| covalent bond bond | 90,500 | — | 0.00 | 37 | info | `/guides/bonding-basics-guide` | 03 |
| covalent bonding | 90,500 | 6,600 | 0.00 | 15 | info | `/cheat-sheets/chemical-bonds` | 03+08 |
| covalent chemical bond | 90,500 | — | 0.00 | 24 | info | `/guides/bonding-basics-guide` | 03 |
| covalent chemical bonds | 90,500 | — | 0.00 | 24 | info | `/guides/bonding-basics-guide` | 03 |
| covalently bonded | 90,500 | — | 0.00 | 10 | info | `/guides/bonding-basics-guide` | 03 |
| quantum bonding | 74,000 | — | 0.54 | 2 | info | `/guides/bonding-basics-guide` | 03 |
| co2 lewis dot structure | 60,500 | — | — | — | — | `/guides/lewis-structure/co2` | 06-entity |
| co2 lewis structure | 60,500 | — | — | — | — | `/guides/lewis-structure/co2` | 06-entity |
| lewis co2 structure | 60,500 | — | — | — | — | `/guides/lewis-structure/co2` | 06-entity |
| lewis dot structure co2 | 60,500 | — | — | — | — | `/guides/lewis-structure/co2` | 06-entity |
| lewis dot structure for co2 | 60,500 | — | — | — | — | `/guides/lewis-structure/co2` | 06-entity |
| lewis dot structure of co2 | 60,500 | — | — | — | — | `/guides/lewis-structure/co2` | 06-entity |
| lewis structure co2 | 60,500 | — | — | — | — | `/guides/lewis-structure/co2` | 06-entity |
| lewis structure for co2 | 60,500 | — | — | — | — | `/guides/lewis-structure/co2` | 06-entity |
| lewis structure of co2 | 60,500 | — | — | — | — | `/guides/lewis-structure/co2` | 06-entity |
| atom geometry | 49,500 | — | 0.00 | 27 | info | `/guides/molecular-geometry-vsepr-guide` | 03 |
| atomic geometry | 49,500 | — | 0.00 | 12 | info | `/guides/molecular-geometry-vsepr-guide` | 03 |
| bond angle molecular geometry | 49,500 | — | 0.00 | 9 | info | `/guides/molecular-geometry-vsepr-guide` | 03 |
| bond angles | 49,500 | — | 0.00 | 2 | info | `/guides/molecular-geometry-vsepr-guide` | 03 |
| bonding of hydrogen | 49,500 | — | 0.69 | 5 | info | `/guides/intermolecular-forces-guide` | 03 |
| bonds in hydrogen | 49,500 | — | 0.69 | 27 | info | `/guides/intermolecular-forces-guide` | 03 |
| chart of electronegativity | 49,500 | — | 0.00 | 9 | info | `/guides/electronegativity-polarity-guide` | 03 |
| chemical geometry | 49,500 | — | 0.00 | 16 | info | `/guides/molecular-geometry-vsepr-guide` | 03 |
| chemistry geometry | 49,500 | — | 0.00 | 16 | info | `/guides/molecular-geometry-vsepr-guide` | 03 |
| electron geometry | 49,500 | — | 0.00 | 5 | info | `/guides/molecular-geometry-vsepr-guide` | 03 |
| electron geometry bond angles | 49,500 | — | 0.00 | 7 | info | `/guides/molecular-geometry-vsepr-guide` | 03 |
| electronegativity chart | 49,500 | — | 0.00 | 9 | info | `/guides/electronegativity-polarity-guide` | 03 |

*1,691 further keywords in this cluster — `seo/keywords_master.csv`, filter `cluster == "Chemical Bonding & Molecular Structure"` (their combined US volume is 17,485,450/mo).*

Sub-topics: Lewis structure (programmatic) (733) · Bonding Basics (384) · Lewis Structures (294) · Molecular Geometry (193) · Bond Polarity (74) · Intermolecular Forces (43)

---

## 6. Formulas, Naming & Compounds

**1,468 keywords · 6,527,590 US searches/mo · 19 planned pages · 8 sub-topics.**
Keywords in this cluster already assigned to a live page: `/cheat-sheets/chemical-formulas`, `/games/formula-blaster`.

**Planned pages** (from `04_topical_map.csv`, by priority score)

| Page | Slug | Type | Tier | Primary keyword | US | Kws | Exists |
|---|---|---|---|---|---:|---:|---|
| Writing Chemical Formulas Practice - Free Game | `/games/chemical-formulas-practice` | game | P1 | provide the formula for each compound | 165,000 | 80 | partial |
| Diatomic Elements & Molecules Quiz | `/games/diatomic-elements-molecules-quiz` | game | P1 | diatomic atom | 22,200 | 6 | no |
| Polyatomic Ions Flashcards - Free Online Game | `/games/polyatomic-ions-flashcards` | game | P2 | determine the name or formula for each polyatomic ion | 22,200 | 24 | no |
| Ionic Compound Naming Game: Cations, Anions & Transition Metals | `/games/ionic-compound-naming-game` | game | P2 | ionic compound | 27,100 | 20 | no |
| Polyatomic Ions Guide - List, Chart & Naming Rules | `/guides/polyatomic-ions-guide` | guide | P2 | polyatomic compound | 60,500 | 109 | partial |
| What Is a Compound? Chemistry Definition & Examples | `/guides/what-is-a-compound-chemistry` | pillar_hub | P2 | compound | 110,000 | 93 | no |
| Writing Chemical Formulas Practice - Worksheet & Answers | `/guides/writing-chemical-formulas-practice` | guide | P3 | chemical formula | 90,500 | 72 | no |
| Ionic & Covalent Naming Practice - Naming Compounds Game | `/games/naming-compounds-practice` | game | P3 | naming compounds chemistry practice | 1,300 | 104 | no |
| [Compound] Chemical Formula | `/guides/chemical-formula/[compound]` | programmatic_template | Programmatic | chemical formula for glucose | 27,100 | 11 | no |
| Chemical Formula Guide: Empirical vs Molecular Formula | `/guides/chemical-formula-empirical-molecular` | guide | P3 | empirical chemical formula | 33,100 | 79 | no |
| Writing Chemical Equations from Words | `/guides/writing-chemical-equations-from-words` | guide | P3 | molecular ionic net ionic equations | 18,100 | 10 | no |
| Naming Ionic & Covalent Compounds: Rules & Prefixes | `/guides/naming-compounds-rules-prefixes` | guide | P3 | ionic bond naming | 6,600 | 185 | no |

*…and 7 more pages in this pillar — see `04_topical_map.csv`.*

**Top 30 keywords by US volume**

| Keyword | US | AU | CPC | KD | Intent | Target | Stage |
|---|---:|---:|---:|---:|---|---|---|
| match the following compounds to their likely solubility in water | 201,000 | — | 0.00 | 0 | info | `/games/chemical-formulas-practice` | 03 |
| provide the formula for each compound | 165,000 | — | 0.00 | 0 | info | `/games/chemical-formulas-practice` | 03 |
| compound | 110,000 | — | 1.15 | 63 | info | `/guides/what-is-a-compound-chemistry` | 03 |
| compounds | 110,000 | — | 1.15 | 44 | info | `/guides/what-is-a-compound-chemistry` | 03 |
| chemical formula | 90,500 | 1,600 | 7.93 | 12 | info | `/cheat-sheets/chemical-formulas` | 03+08 |
| chemical formulae | 90,500 | — | 7.93 | 11 | info | `/guides/writing-chemical-formulas-practice` | 03 |
| chemistry formula | 90,500 | — | 7.93 | 13 | info | `/guides/writing-chemical-formulas-practice` | 03 |
| cn compound | 74,000 | — | 1.37 | 3 | info | `/guides/what-is-a-compound-chemistry` | 03 |
| ion polyatomic | 60,500 | — | 0.00 | 0 | info | `/guides/polyatomic-ions-guide` | 03 |
| polyatomic anion | 60,500 | — | 0.00 | 0 | info | `/guides/polyatomic-ions-guide` | 03 |
| polyatomic anions | 60,500 | — | 0.00 | 2 | info | `/guides/polyatomic-ions-guide` | 03 |
| polyatomic cation | 60,500 | — | 0.00 | 0 | info | `/guides/polyatomic-ions-guide` | 03 |
| polyatomic cations | 60,500 | — | 0.00 | 0 | info | `/guides/polyatomic-ions-guide` | 03 |
| polyatomic compound | 60,500 | — | 0.00 | 0 | info | `/guides/polyatomic-ions-guide` | 03 |
| polyatomic compounds | 60,500 | — | 0.00 | 0 | info | `/guides/polyatomic-ions-guide` | 03 |
| polyatomic formulas | 60,500 | — | 0.00 | 0 | info | `/guides/polyatomic-ions-guide` | 03 |
| polyatomic ion | 60,500 | — | 0.00 | 0 | info | `/guides/polyatomic-ions-guide` | 03 |
| polyatomic ions | 60,500 | — | 0.00 | 0 | info | `/guides/polyatomic-ions-guide` | 03 |
| chemical c | 40,500 | — | 0.00 | 42 | info | `/guides/what-is-a-compound-chemistry` | 03 |
| chemical ch | 40,500 | — | 0.00 | 15 | info | `/guides/what-is-a-compound-chemistry` | 03 |
| ho compound | 40,500 | — | 2.37 | 7 | info | `/guides/what-is-a-compound-chemistry` | 03 |
| compounded definition | 33,100 | — | 0.00 | 37 | info | `/guides/what-is-a-compound-chemistry` | 03 |
| compounds definition | 33,100 | — | 0.00 | 11 | info | `/guides/what-is-a-compound-chemistry` | 03 |
| definition of a compound | 33,100 | — | 0.00 | 6 | info | `/guides/what-is-a-compound-chemistry` | 03 |
| empirical chemical formula | 33,100 | — | 0.00 | 1 | info | `/guides/chemical-formula-empirical-molecular` | 03 |
| what are compound | 33,100 | — | 0.00 | 20 | info | `/guides/what-is-a-compound-chemistry` | 03 |
| what are compounds | 33,100 | — | 0.00 | 26 | info | `/guides/what-is-a-compound-chemistry` | 03 |
| what is a compound | 33,100 | — | 0.00 | 27 | info | `/guides/what-is-a-compound-chemistry` | 03 |
| what is a compound chemistry | 33,100 | — | 0.00 | 18 | info | `/guides/what-is-a-compound-chemistry` | 03 |
| what is compound chemistry | 33,100 | — | 0.00 | 9 | info | `/guides/what-is-a-compound-chemistry` | 03 |

*1,438 further keywords in this cluster — `seo/keywords_master.csv`, filter `cluster == "Formulas, Naming & Compounds"` (their combined US volume is 4,571,690/mo).*

Sub-topics: Naming Compounds (482) · Chemical formula (programmatic) (380) · Formula Writing (242) · Polyatomic Ions (152) · Compound Basics (102) · Polyatomic ions (programmatic) (88) · Equation Writing (21) · compound nomenclature (1)

---

## 7. Chemical Reactions & Balancing Equations

**1,488 keywords · 6,394,460 US searches/mo · 18 planned pages · 7 sub-topics.**
Keywords in this cluster already assigned to a live page: `/cheat-sheets/balancing-equations`, `/cheat-sheets/reaction-types`, `/games`, `/games/reaction-balancer`.

**Planned pages** (from `04_topical_map.csv`, by priority score)

| Page | Slug | Type | Tier | Primary keyword | US | Kws | Exists |
|---|---|---|---|---|---:|---:|---|
| Balancing Chemical Equations Game - Free Practice | `/games/balancing-chemical-equations-game` | game | P1 | chemistry balancing chemical equations | 49,500 | 243 | yes |
| Types of Chemical Reactions Game - Virtual Lab | `/games/reaction-types-game` | game | P1 | match the reaction with its correct definition | 60,500 | 67 | partial |
| Chemical Equation Balancer - Balance Reactions Online | `/tools/chemical-equation-balancer` | game | P1 | balancing chemical equations balancer | 49,500 | 94 | no |
| Solubility Rules Game - Learn What Dissolves | `/games/solubility-rules-game` | game | P1 | solubility | 49,500 | 16 | no |
| Chemical Reactions Quiz - Free Online Game | `/games/chemical-reactions-quiz` | game | P1 | chemistry reactions quiz | 140 | 36 | yes |
| How to Balance Chemical Equations - Step-by-Step Guide | `/guides/how-to-balance-chemical-equations` | guide | P1 | balancing equations chemistry | 49,500 | 117 | yes |
| Balancing Chemical Equations Practice Problems | `/guides/balancing-chemical-equations-practice` | guide | P1 | chemistry equations | 22,200 | 104 | yes |
| Types of Chemical Reactions Guide & Examples | `/guides/types-of-chemical-reactions-guide` | pillar_hub | P2 | different types of chemical reactions | 18,100 | 387 | partial |
| Balancing Chemical Equations Worksheet & Practice | `/games/balancing-chemical-equations-worksheet` | game | P2 | balancing chemical equations worksheet | 3,600 | 23 | yes |
| Chemical Reaction Basics Guide & Definitions | `/guides/chemical-reaction-basics-guide` | guide | P2 | chemical and reactions | 49,500 | 90 | no |
| Redox Reactions & Oxidation-Reduction Guide | `/guides/redox-reactions-guide` | guide | P2 | oxidation redox reaction | 27,100 | 91 | no |
| Endothermic vs Exothermic Reactions Guide | `/guides/endothermic-vs-exothermic-guide` | guide | P3 | endothermic reaction vs exothermic reaction | 33,100 | 29 | no |

*…and 6 more pages in this pillar — see `04_topical_map.csv`.*

**Top 30 keywords by US volume**

| Keyword | US | AU | CPC | KD | Intent | Target | Stage |
|---|---:|---:|---:|---:|---|---|---|
| barf acronym chemistry | 201,000 | — | 0.00 | 0 | info | `/guides/balancing-chemical-equations-practice` | 03 |
| complete each ionization equation | 60,500 | — | 0.00 | 0 | info | `/guides/types-of-chemical-reactions-practice` | 03 |
| match the reaction with its correct definition | 60,500 | — | 0.00 | 0 | info | `/games/reaction-types-game` | 03 |
| abbreviated qualitative analysis scheme | 49,500 | — | 0.00 | 0 | info | `/games/solubility-rules-game` | 03 |
| balanced molecular equation | 49,500 | — | 3.02 | 9 | info | `/tools/chemical-equation-balancer` | 03 |
| balancing chemical equations | 49,500 | 1,900 | 3.02 | 6 | info | `/cheat-sheets/balancing-equations` | 03+08 |
| balancing chemical equations balancer | 49,500 | — | 3.02 | 16 | info | `/tools/chemical-equation-balancer` | 03 |
| balancing chemistry formulas | 49,500 | — | 3.02 | 5 | info | `/guides/how-to-balance-chemical-equations` | 03 |
| balancing equations chemistry | 49,500 | — | 3.02 | 13 | info | `/guides/how-to-balance-chemical-equations` | 03 |
| chemical and reactions | 49,500 | — | 4.93 | 23 | info | `/guides/chemical-reaction-basics-guide` | 03 |
| chemical equations and balancing | 49,500 | — | 3.02 | 1 | info | `/guides/how-to-balance-chemical-equations` | 03 |
| chemical reaction | 49,500 | — | 4.93 | 19 | info | `/guides/chemical-reaction-basics-guide` | 03 |
| chemical reaction and | 49,500 | — | 4.93 | 32 | info | `/guides/chemical-reaction-basics-guide` | 03 |
| chemical reaction reaction | 49,500 | — | 4.93 | 22 | info | `/guides/chemical-reaction-basics-guide` | 03 |
| chemical reactions | 49,500 | — | 4.93 | 26 | info | `/guides/chemical-reaction-basics-guide` | 03 |
| chemical reactions and | 49,500 | — | 4.93 | 32 | info | `/guides/chemical-reaction-basics-guide` | 03 |
| chemistry balancing chemical equations | 49,500 | — | 3.02 | 8 | info | `/games/balancing-chemical-equations-game` | 03 |
| chemistry balancing equations | 49,500 | — | 3.02 | 0 | info | `/guides/how-to-balance-chemical-equations` | 03 |
| chemistry of reaction | 49,500 | — | 4.93 | 25 | info | `/guides/chemical-reaction-basics-guide` | 03 |
| chemistry reaction | 49,500 | — | 4.93 | 39 | info | `/guides/chemical-reaction-basics-guide` | 03 |
| chemistry reactions | 49,500 | — | 4.93 | 35 | info | `/guides/chemical-reaction-basics-guide` | 03 |
| equation balancer chemistry | 49,500 | — | 3.02 | 10 | info | `/tools/chemical-equation-balancer` | 03 |
| reacting chemicals | 49,500 | — | 4.93 | 30 | info | `/guides/chemical-reaction-basics-guide` | 03 |
| reaction chemistry | 49,500 | — | 4.93 | 27 | info | `/guides/chemical-reaction-basics-guide` | 03 |
| reaction of chemical | 49,500 | — | 2.60 | 26 | info | `/guides/chemical-reaction-basics-guide` | 03 |
| reactions chemistry | 49,500 | — | 4.93 | 25 | info | `/guides/chemical-reaction-basics-guide` | 03 |
| reactions of chemicals | 49,500 | — | 2.60 | 27 | info | `/guides/chemical-reaction-basics-guide` | 03 |
| science reactions | 49,500 | — | 2.60 | 23 | info | `/guides/chemical-reaction-basics-guide` | 03 |
| solubility | 49,500 | — | 0.00 | 16 | info | `/games/solubility-rules-game` | 03 |
| chemical equation balancer | 40,500 | 1,900 | 2.43 | 12 | trans | `/tools/chemical-equation-balancer` | 02+03 |

*1,458 further keywords in this cluster — `seo/keywords_master.csv`, filter `cluster == "Chemical Reactions & Balancing Equations"` (their combined US volume is 4,744,960/mo).*

Sub-topics: balancing equations (663) · Reaction Types (559) · Practice & Worksheets (128) · Reaction Fundamentals (90) · Energy & Reactions (29) · Solubility (16) · Thermodynamics (3)

---

## 8. Atomic Structure & Electron Configuration

**760 keywords · 5,622,550 US searches/mo · 14 planned pages · 6 sub-topics.**

**Planned pages** (from `04_topical_map.csv`, by priority score)

| Page | Slug | Type | Tier | Primary keyword | US | Kws | Exists |
|---|---|---|---|---|---:|---:|---|
| Atomic Structure & Mass - Build an Atom Game | `/games/build-an-atom-game` | game | P1 | mass of an atom | 33,100 | 102 | no |
| Atom Basics: Parts, Definitions & Structure Game | `/games/atom-structure-parts-game` | game | P1 | atom definition | 49,500 | 91 | no |
| Electron Configuration Practice Game | `/games/electron-configuration-orbital-practice` | game | P1 | atom configuration | 90,500 | 77 | no |
| Protons Neutrons Electrons Calculator Game | `/games/calculate-protons-neutrons-electrons` | game | P1 | how to determine electrons | 12,100 | 37 | no |
| [Element] Electron Configuration | `/guides/electron-configuration/[element]` | programmatic_template | Programmatic | electron configuration chlorine | 8,100 | 232 | no |
| Atom Model History - Bohr, Dalton & Thomson Guide | `/guides/atomic-models-history` | guide | P2 | bohr atomic | 74,000 | 124 | no |
| Subatomic Particles Game & Crossword - Free Practice | `/games/subatomic-particles-puzzle` | game | P2 | subatomic particle with a negative charge | 1,600 | 48 | no |
| Atomic Structure Diagram Game - Label Parts of an Atom | `/games/label-the-atom` | game | P2 | atom to label | 2,400 | 13 | no |
| Isotopes Game - Identify & Build Isotope Sets | `/games/isotopes-identify` | game | P2 | which set of atoms are isotopes | 12,100 | 10 | no |
| Isotope & Atomic Mass Calculator - Free Tool | `/tools/average-atomic-mass-calculator` | game | P3 | average atomic mass calculator | 1,600 | 3 | no |
| Atomic Structure Quiz | `/guides/atomic-structure-quiz` | guide | P3 | shape of atomic orbital | 18,100 | 2 | no |
| Atomic Structure Guide | `/guides/atomic-structure-guide` | pillar_hub | P3 | atomic model hydrogen | 1,300 | 18 | no |

*…and 2 more pages in this pillar — see `04_topical_map.csv`.*

**Top 30 keywords by US volume**

| Keyword | US | AU | CPC | KD | Intent | Target | Stage |
|---|---:|---:|---:|---:|---|---|---|
| atoms | 246,000 | — | 6.16 | 23 | info | `/games/atom-structure-parts-game` | 03 |
| atom configuration | 90,500 | — | 1.38 | 7 | info | `/games/electron-configuration-orbital-practice` | 03 |
| atomic configuration | 90,500 | — | 1.38 | 3 | info | `/games/electron-configuration-orbital-practice` | 03 |
| atom bohr | 74,000 | — | 0.40 | 7 | info | `/guides/atomic-models-history` | 03 |
| bohr atom | 74,000 | — | 0.00 | 13 | info | `/guides/atomic-models-history` | 03 |
| bohr atom model | 74,000 | — | 0.40 | 15 | info | `/guides/atomic-models-history` | 03 |
| bohr atomic | 74,000 | — | 0.40 | 12 | info | `/guides/atomic-models-history` | 03 |
| bohr atomic model | 74,000 | — | 0.40 | 17 | info | `/guides/atomic-models-history` | 03 |
| bohr model for atom | 74,000 | — | 0.40 | 14 | info | `/guides/atomic-models-history` | 03 |
| bohr's atom | 74,000 | — | 0.40 | 8 | info | `/guides/atomic-models-history` | 03 |
| bohr's atomic model | 74,000 | — | 0.40 | 17 | info | `/guides/atomic-models-history` | 03 |
| model atom bohr | 74,000 | — | 0.40 | 15 | info | `/guides/atomic-models-history` | 03 |
| model of atom bohr | 74,000 | — | 0.40 | 13 | info | `/guides/atomic-models-history` | 03 |
| electrons and valence electrons | 60,500 | — | 0.00 | 22 | info | `/guides/atomic-models-history` | 03 |
| electrons valence | 60,500 | — | 0.00 | 18 | info | `/guides/atomic-models-history` | 03 |
| atom definition | 49,500 | — | 0.00 | 29 | info | `/games/atom-structure-parts-game` | 03 |
| atomic fusion | 49,500 | — | 2.29 | 48 | info | `/games/atom-structure-parts-game` | 03 |
| atoms definition | 49,500 | — | 0.00 | 27 | info | `/games/atom-structure-parts-game` | 03 |
| define atoms | 49,500 | — | 0.00 | 36 | info | `/games/atom-structure-parts-game` | 03 |
| definition for atom | 49,500 | — | 0.00 | 28 | info | `/games/atom-structure-parts-game` | 03 |
| definition of an atom | 49,500 | — | 0.00 | 17 | info | `/games/atom-structure-parts-game` | 03 |
| definition of atom | 49,500 | — | 0.00 | 29 | info | `/games/atom-structure-parts-game` | 03 |
| definition of atoms | 49,500 | — | 0.00 | 30 | info | `/games/atom-structure-parts-game` | 03 |
| what are ion | 40,500 | — | 0.00 | 12 | info | `/games/atom-structure-parts-game` | 03 |
| what are ions | 40,500 | — | 0.00 | 8 | info | `/games/atom-structure-parts-game` | 03 |
| what is an ions | 40,500 | — | 0.00 | 8 | info | `/games/atom-structure-parts-game` | 03 |
| atomic mass | 33,100 | — | 0.00 | 28 | info | `/games/build-an-atom-game` | 03 |
| atomic mass of an atom | 33,100 | — | 0.00 | 13 | info | `/games/calculate-protons-neutrons-electrons` | 03 |
| atomic size and atomic radius | 33,100 | — | 0.00 | 9 | info | `/games/build-an-atom-game` | 03 |
| mass of an atom | 33,100 | — | 0.00 | 22 | info | `/games/build-an-atom-game` | 03 |

*730 further keywords in this cluster — `seo/keywords_master.csv`, filter `cluster == "Atomic Structure & Electron Configuration"` (their combined US volume is 3,684,650/mo).*

Sub-topics: electron configuration (309) · atom parts (191) · atomic models (144) · atom builder (102) · isotopes (13) · Nuclear Chemistry (1)

---

## 9. Stoichiometry, Moles & Molar Mass

**1,301 keywords · 5,269,050 US searches/mo · 15 planned pages · 10 sub-topics.**

**Planned pages** (from `04_topical_map.csv`, by priority score)

| Page | Slug | Type | Tier | Primary keyword | US | Kws | Exists |
|---|---|---|---|---|---:|---:|---|
| Stoichiometry Practice (Mole-to-Mole & Mass-to-Mass) | `/games/stoichiometry-practice` | game | P1 | stoichiometry | 74,000 | 298 | no |
| Molar Mass Calculator & Molecular Weight Finder | `/tools/molecular-weight-calculator` | game | P1 | molecular weight calculator | 74,000 | 15 | no |
| Molar Mass of [Compound] | `/tools/molar-mass/[compound]` | programmatic_template | Programmatic | molar mass for naoh | 22,200 | 151 | no |
| Chemistry Conversions & Unit Conversion Practice | `/guides/chemistry-conversions-practice` | pillar_hub | P3 | molecular mass | 33,100 | 133 | no |
| Molarity & Mole Ratio Formula Guide | `/guides/molarity-and-mole-ratio` | guide | P3 | equation for molarity | 33,100 | 59 | no |
| Mole Conversion Practice - Worksheet & Answers | `/guides/mole-conversion-practice` | guide | P3 | mole to g | 14,800 | 160 | no |
| Percent Yield & Theoretical Yield Formula | `/guides/percent-yield-chemistry` | guide | P3 | chemistry yield formula | 22,200 | 24 | no |
| Molar Mass & Atomic Mass: How to Calculate | `/guides/molar-mass-calculations` | guide | P3 | molar weight | 40,500 | 93 | no |
| Moles to Grams & Grams to Moles Conversion | `/guides/moles-to-grams-conversion` | guide | P3 | how to convert moles to grams and grams to moles | 8,100 | 65 | no |
| Unit Conversions Practice - Chemistry Quiz Game | `/games/unit-conversions-practice` | game | P3 | unit conversion chemistry practice | 260 | 8 | no |
| Moles Quiz - Free Online Chemistry Practice Game | `/games/moles-quiz` | game | Later/Skip | moles quiz chemistry | 20 | 5 | no |
| Solutions Quiz - Free Online Chemistry Practice Game | `/games/solutions-quiz` | game | Later/Skip | chemistry quiz solutions | 20 | 5 | no |

*…and 3 more pages in this pillar — see `04_topical_map.csv`.*

**Top 30 keywords by US volume**

| Keyword | US | AU | CPC | KD | Intent | Target | Stage |
|---|---:|---:|---:|---:|---|---|---|
| molecular weight calculator | 74,000 | — | 0.00 | 18 | info | `/tools/molecular-weight-calculator` | 03 |
| stoichiometric | 74,000 | — | 1.12 | 2 | info | `/games/stoichiometry-practice` | 03 |
| stoichiometry | 74,000 | — | 1.12 | 15 | info | `/games/stoichiometry-practice` | 03 |
| stoichiometry stoichiometry | 74,000 | — | 1.12 | 0 | info | `/games/stoichiometry-practice` | 03 |
| calculate molecular weights | 60,500 | — | 0.00 | 12 | info | `/tools/molecular-weight-calculator` | 03 |
| calculate the molecular mass | 60,500 | — | 0.00 | 11 | info | `/tools/molecular-weight-calculator` | 03 |
| calculation molecular weight | 60,500 | — | 0.00 | 10 | info | `/tools/molecular-weight-calculator` | 03 |
| chemical weight calculator | 60,500 | — | 0.00 | 14 | info | `/tools/molecular-weight-calculator` | 03 |
| molecular weight calculations | 60,500 | — | 0.00 | 15 | info | `/tools/molecular-weight-calculator` | 03 |
| molecular weight calculators | 60,500 | — | 0.00 | 0 | info | `/tools/molecular-weight-calculator` | 03 |
| molecular weight finder | 60,500 | — | 0.00 | 9 | info | `/tools/molecular-weight-calculator` | 03 |
| molar weight | 40,500 | — | 2.00 | 13 | info | `/guides/molar-mass-calculations` | 03 |
| equation for molarity | 33,100 | — | 0.00 | 13 | info | `/guides/molarity-and-mole-ratio` | 03 |
| equation of molarity | 33,100 | — | 0.00 | 13 | info | `/guides/molarity-and-mole-ratio` | 03 |
| mass molecular weight | 33,100 | — | 0.00 | 24 | info | `/tools/molecular-weight-calculator` | 03 |
| molar mass co2 | 33,100 | — | — | — | — | `/tools/molar-mass/co2` | 06-entity |
| molar mass for co2 | 33,100 | — | — | — | — | `/tools/molar-mass/co2` | 06-entity |
| molar mass of co2 | 33,100 | — | — | — | — | `/tools/molar-mass/co2` | 06-entity |
| molar masses | 33,100 | — | 0.00 | 3 | info | `/guides/molar-mass-calculations` | 03 |
| molarity equation | 33,100 | — | 0.00 | 19 | info | `/guides/molarity-and-mole-ratio` | 03 |
| molarity equations | 33,100 | — | 0.00 | 12 | info | `/guides/molarity-and-mole-ratio` | 03 |
| molecular mass | 33,100 | — | 0.00 | 7 | info | `/guides/chemistry-conversions-practice` | 03 |
| molecular mass and molecular weight | 33,100 | — | 0.00 | 13 | info | `/guides/chemistry-conversions-practice` | 03 |
| molecular masses | 33,100 | — | 0.00 | 10 | info | `/guides/chemistry-conversions-practice` | 03 |
| molecular weight | 33,100 | — | 0.00 | 19 | info | `/guides/chemistry-conversions-practice` | 03 |
| molecular weight and molecular mass | 33,100 | — | 0.00 | 9 | info | `/guides/chemistry-conversions-practice` | 03 |
| molecular weight co2 | 33,100 | — | 0.00 | 17 | info | `/tools/molar-mass/[compound]` | 03 |
| molecular weight for co2 | 33,100 | — | 0.00 | 15 | info | `/tools/molar-mass/[compound]` | 03 |
| molecular weight s | 33,100 | — | 0.00 | 17 | info | `/guides/chemistry-conversions-practice` | 03 |
| molecular weights | 33,100 | — | 0.00 | 17 | info | `/guides/chemistry-conversions-practice` | 03 |

*1,271 further keywords in this cluster — `seo/keywords_master.csv`, filter `cluster == "Stoichiometry, Moles & Molar Mass"` (their combined US volume is 3,913,250/mo).*

Sub-topics: Conversion Practice (358) · Stoichiometry Practice (303) · Molar mass (programmatic) (280) · Molar Mass Tools (259) · Molarity & Ratios (61) · Yield Calculations (24) · Conversions (8) · Solutions & Molarity (5) · +2 more

---

## 10. Study Skills & Cheat Sheets

**1,323 keywords · 4,629,430 US searches/mo · 19 planned pages · 8 sub-topics.**
Keywords in this cluster already assigned to a live page: `/cheat-sheets`, `/cheat-sheets/acids-and-bases`, `/cheat-sheets/balancing-equations`, `/cheat-sheets/chemical-bonds`, `/cheat-sheets/chemical-formulas`, `/cheat-sheets/reaction-types`, `/cheat-sheets/states-of-matter`.

**Planned pages** (from `04_topical_map.csv`, by priority score)

| Page | Slug | Type | Tier | Primary keyword | US | Kws | Exists |
|---|---|---|---|---|---:|---:|---|
| What Is Chemistry? A Simple Guide for Students | `/guides/what-is-chemistry-guide` | guide | P2 | what are the matters | 49,500 | 153 | no |
| Chemistry Formulas Cheat Sheet - Equations & Reference | `/guides/chemistry-formulas-cheat-sheet` | guide | P2 | chemistry formulas | 110,000 | 356 | no |
| Chemistry Practice Problems - Free Exercises & Solutions | `/guides/chemistry-practice-problems` | guide | P2 | equation for potential energy | 22,200 | 195 | no |
| Fun Chemistry Facts: Amazing & Weird Science Trivia | `/blog/fun-chemistry-facts` | blog | P3 | alchemical | 246,000 | 42 | no |
| Free Chemistry Worksheets - Practice & Answer Keys | `/guides/chemistry-worksheets` | guide | P3 | electron configuration worksheets | 1,000 | 156 | no |
| Free Printable Chemistry Practice Worksheets | `/guides/chemistry-practice-worksheets` | guide | P3 | atom worksheets | 1,900 | 49 | no |
| AP Chemistry Cheat Sheet - Quick Reference | `/guides/ap-chemistry-cheat-sheet` | guide | P3 | ap chemistry formula sheet | 18,100 | 14 | no |
| Chemistry Quiz Questions with Answers - Free Practice | `/guides/chemistry-quiz-questions` | guide | P3 | easy chemistry questions | 480 | 20 | no |
| How to Study Chemistry: Tips & Exam Strategies | `/blog/how-to-study-chemistry` | blog | P3 | chemistry part 1 | 18,100 | 215 | no |
| AP Chemistry Practice Problems - By Unit & Topic | `/guides/ap-chemistry-practice` | guide | P3 | ap chemistry chemical kinetics | 880 | 9 | no |
| Chemistry of Everyday Life: Kitchen & Baking Fun | `/blog/chemistry-of-everyday-life` | blog | P3 | do salt melt ice | 4,400 | 41 | no |
| Is Chemistry Hard? Comparisons & Fun Hacks | `/blog/is-chemistry-hard` | blog | P3 | chem-is-try | 14,800 | 23 | no |

*…and 7 more pages in this pillar — see `04_topical_map.csv`.*

**Top 30 keywords by US volume**

| Keyword | US | AU | CPC | KD | Intent | Target | Stage |
|---|---:|---:|---:|---:|---|---|---|
| alchemical | 246,000 | — | 1.23 | 28 | info | `/blog/fun-chemistry-facts` | 03 |
| smartwork5 chemistry answers | 246,000 | — | 0.00 | 0 | info | `/guides/chemistry-practice-problems` | 03 |
| chemistry | 201,000 | — | 8.57 | 100 | info | `/guides/what-is-chemistry-guide` | 03 |
| chemistry and chemicals | 201,000 | — | 8.57 | 5 | info | `/guides/what-is-chemistry-guide` | 03 |
| aleks initial knowledge check answers chemistry | 165,000 | — | 0.00 | 0 | info | `/guides/chemistry-practice-problems` | 03 |
| kinetics equation | 135,000 | — | 3.31 | 4 | info | `/guides/chemistry-formulas-cheat-sheet` | 03 |
| kinetics equations | 135,000 | — | 3.31 | 7 | info | `/guides/chemistry-formulas-cheat-sheet` | 03 |
| chemistry formulas | 110,000 | 1,600 | 31.76 | 26 | info | `/guides/chemistry-formulas-cheat-sheet` | 02+03 |
| c h formula | 90,500 | — | 7.93 | 40 | info | `/guides/chemistry-formulas-cheat-sheet` | 03 |
| homogeneous chemistry | 90,500 | — | 0.00 | 10 | info | `/guides/chemistry-formulas-cheat-sheet` | 03 |
| ideal gas laws | 60,500 | — | 6.74 | 28 | info | `/guides/chemistry-formulas-cheat-sheet` | 03 |
| chemistry interactions | 49,500 | — | 4.93 | 1 | info | `/guides/chemistry-formulas-cheat-sheet` | 03 |
| what are the matters | 49,500 | — | 0.00 | 18 | info | `/guides/what-is-chemistry-guide` | 03 |
| what is matter what is matter | 49,500 | — | 0.00 | 10 | info | `/guides/what-is-chemistry-guide` | 03 |
| atom what is it | 40,500 | — | 0.00 | 23 | info | `/guides/what-is-chemistry-guide` | 03 |
| water molecular | 40,500 | — | 1.99 | 23 | info | `/guides/what-is-chemistry-guide` | 03 |
| water molecules | 40,500 | — | 1.82 | 26 | info | `/guides/what-is-chemistry-guide` | 03 |
| what are atoms | 40,500 | — | 0.00 | 27 | info | `/guides/what-is-chemistry-guide` | 03 |
| what atom is | 40,500 | — | 0.00 | 24 | info | `/guides/what-is-chemistry-guide` | 03 |
| what is a an atom | 40,500 | — | 0.00 | 20 | info | `/guides/what-is-chemistry-guide` | 03 |
| what is an atom | 40,500 | — | 0.00 | 23 | info | `/guides/what-is-chemistry-guide` | 03 |
| what is an atom atom | 40,500 | — | 0.00 | 24 | info | `/guides/what-is-chemistry-guide` | 03 |
| what is an atom what is an atom | 40,500 | — | 0.00 | 21 | info | `/guides/what-is-chemistry-guide` | 03 |
| what is an atomic | 40,500 | — | 0.00 | 18 | info | `/guides/what-is-chemistry-guide` | 03 |
| what is an atoms | 40,500 | — | 0.00 | 31 | info | `/guides/what-is-chemistry-guide` | 03 |
| what is molecular | 40,500 | — | 0.00 | 15 | info | `/guides/what-is-chemistry-guide` | 03 |
| what is the atom | 40,500 | — | 0.00 | 24 | info | `/guides/what-is-chemistry-guide` | 03 |
| define solution | 33,100 | — | 10.06 | 24 | info | `/guides/what-is-chemistry-guide` | 03 |
| what is a compounds | 33,100 | — | 0.00 | 24 | info | `/guides/what-is-chemistry-guide` | 03 |
| and chemical properties | 27,100 | — | 0.00 | 3 | info | `/guides/what-is-chemistry-guide` | 03 |

*1,293 further keywords in this cluster — `seo/keywords_master.csv`, filter `cluster == "Study Skills & Cheat Sheets"` (their combined US volume is 2,180,630/mo).*

Sub-topics: Practice & Worksheets (400) · Cheat Sheets (370) · General Chemistry Intro (239) · Study Skills (238) · worksheets (49) · Stage 8 on-page target (23) · Study Techniques (3) · Study Tools (1)

---

## 11. States of Matter & Physical/Chemical Change

**324 keywords · 2,788,570 US searches/mo · 6 planned pages · 3 sub-topics.**
Keywords in this cluster already assigned to a live page: `/cheat-sheets/states-of-matter`.

**Planned pages** (from `04_topical_map.csv`, by priority score)

| Page | Slug | Type | Tier | Primary keyword | US | Kws | Exists |
|---|---|---|---|---|---:|---:|---|
| Physical & Chemical Changes Quiz - Free Game | `/games/physical-and-chemical-changes-quiz` | game | P1 | chemical change | 40,500 | 54 | partial |
| States of Matter Game - Free Online Chemistry Game | `/games/states-of-matter-game` | game | P1 | state of matter | 40,500 | 82 | no |
| Physical vs Chemical Change Game - Classify It | `/games/physical-vs-chemical-change-game` | game | P2 | physical change vs chemical change | 12,100 | 10 | no |
| Chemical Changes & Physical Changes Guide | `/guides/chemical-vs-physical-changes-guide` | pillar_hub | P2 | chemistry changes | 40,500 | 97 | no |
| Chemical Energy & Properties Reference Guide | `/guides/chemical-energy-and-properties-guide` | guide | P2 | chemical ionization | 110,000 | 78 | no |
| Matter Quiz - Free Online Chemistry Game | `/games/matter-quiz` | game | Later/Skip | chemistry matter quiz | 20 | 3 | no |

**Top 30 keywords by US volume**

| Keyword | US | AU | CPC | KD | Intent | Target | Stage |
|---|---:|---:|---:|---:|---|---|---|
| chemical ionization | 110,000 | — | 12.02 | 0 | info | `/guides/chemical-energy-and-properties-guide` | 03 |
| which of the changes are chemical changes chegg | 60,500 | — | 0.00 | 0 | info | `/games/physical-and-chemical-changes-quiz` | 03 |
| law of conservation matter | 49,500 | — | 5.22 | 3 | info | `/guides/chemical-energy-and-properties-guide` | 03 |
| law of conservation of matter mass | 49,500 | — | 5.22 | 10 | info | `/guides/chemical-energy-and-properties-guide` | 03 |
| matter conservation | 49,500 | — | 5.22 | 5 | info | `/guides/chemical-energy-and-properties-guide` | 03 |
| and chemical changes | 40,500 | — | 0.00 | 8 | info | `/guides/chemical-vs-physical-changes-guide` | 03 |
| change chemical | 40,500 | — | 0.00 | 0 | info | `/guides/chemical-vs-physical-changes-guide` | 03 |
| change chemically | 40,500 | — | 0.00 | 0 | info | `/guides/chemical-vs-physical-changes-guide` | 03 |
| change in chemistry | 40,500 | — | 0.00 | 0 | info | `/guides/chemical-vs-physical-changes-guide` | 03 |
| chemical and chemical changes | 40,500 | — | 0.00 | 20 | info | `/guides/chemical-vs-physical-changes-guide` | 03 |
| chemical change | 40,500 | — | 0.00 | 0 | info | `/games/physical-and-chemical-changes-quiz` | 03 |
| chemical change change | 40,500 | — | 0.00 | 0 | info | `/games/physical-and-chemical-changes-quiz` | 03 |
| chemical change chemistry | 40,500 | — | 0.00 | 15 | info | `/games/physical-and-chemical-changes-quiz` | 03 |
| chemical change in chemistry | 40,500 | — | 0.00 | 8 | info | `/games/physical-and-chemical-changes-quiz` | 03 |
| chemical changes | 40,500 | — | 0.00 | 0 | info | `/games/physical-and-chemical-changes-quiz` | 03 |
| chemical changes chemistry | 40,500 | — | 0.00 | 0 | info | `/games/physical-and-chemical-changes-quiz` | 03 |
| chemical changes in chemistry | 40,500 | — | 0.00 | 17 | info | `/games/physical-and-chemical-changes-quiz` | 03 |
| chemicals changes | 40,500 | — | 0.00 | 14 | info | `/games/physical-and-chemical-changes-quiz` | 03 |
| chemistry change | 40,500 | — | 0.00 | 8 | info | `/guides/chemical-vs-physical-changes-guide` | 03 |
| chemistry changes | 40,500 | — | 0.00 | 15 | info | `/guides/chemical-vs-physical-changes-guide` | 03 |
| forms of matter | 40,500 | — | 2.07 | 15 | info | `/games/states-of-matter-game` | 03 |
| state of matter | 40,500 | — | 0.03 | 20 | info | `/games/states-of-matter-game` | 03 |
| state of matters | 40,500 | — | 2.07 | 12 | info | `/games/states-of-matter-game` | 03 |
| states of matter | 40,500 | 3,600 | 2.07 | 16 | info | `/cheat-sheets/states-of-matter` | 03+08 |
| states of matter and | 40,500 | — | 2.07 | 11 | info | `/games/states-of-matter-game` | 03 |
| chemical change and example | 27,100 | — | 0.00 | 2 | info | `/guides/chemical-vs-physical-changes-guide` | 03 |
| chemical change ex | 27,100 | — | 0.00 | 0 | info | `/guides/chemical-vs-physical-changes-guide` | 03 |
| chemical change example | 27,100 | — | 0.00 | 0 | info | `/guides/chemical-vs-physical-changes-guide` | 03 |
| chemical change examples | 27,100 | — | 0.00 | 1 | info | `/guides/chemical-vs-physical-changes-guide` | 03 |
| chemical change examples chemistry | 27,100 | — | 0.00 | 0 | info | `/guides/chemical-vs-physical-changes-guide` | 03 |

*294 further keywords in this cluster — `seo/keywords_master.csv`, filter `cluster == "States of Matter & Physical/Chemical Change"` (their combined US volume is 1,524,070/mo).*

Sub-topics: Change Types (161) · States of Matter (85) · Energy & Properties (78)

---

## 12. Teachers & Classroom

**118 keywords · 1,430,840 US searches/mo · 5 planned pages · 4 sub-topics.**

**Planned pages** (from `04_topical_map.csv`, by priority score)

| Page | Slug | Type | Tier | Primary keyword | US | Kws | Exists |
|---|---|---|---|---|---:|---:|---|
| Chemistry Experiments for High Schoolers: Fun Ideas | `/games/chemistry-experiments-high-school` | game | P1 | chemical experiments | 301,000 | 15 | no |
| Periodic Table Worksheet - Free PDF Printables | `/guides/periodic-table-worksheet` | pillar_hub | P3 | table of elements printable | 27,100 | 34 | no |
| Periodic Table Project Ideas for Students | `/blog/periodic-table-project-ideas` | blog | P3 | lyrics periodic table song | 6,600 | 57 | no |
| Fun Chemistry Review Games for the Classroom | `/blog/chemistry-review-games` | blog | Later/Skip | chemistry review games jeopardy | 10 | 7 | no |
| Chemistry Games Ideas - Printable Classroom Activities | `/blog/chemistry-games-ideas` | blog | Later/Skip | chemistry games ideas | 10 | 5 | no |

**Top 30 keywords by US volume**

| Keyword | US | AU | CPC | KD | Intent | Target | Stage |
|---|---:|---:|---:|---:|---|---|---|
| chemical experiments | 301,000 | — | 5.78 | 6 | info | `/games/chemistry-experiments-high-school` | 03 |
| chemistry an experiment | 301,000 | — | 5.78 | 0 | info | `/games/chemistry-experiments-high-school` | 03 |
| chemistry science experiment | 301,000 | — | 5.78 | 0 | info | `/games/chemistry-experiments-high-school` | 03 |
| chemistry science experiments | 301,000 | — | 5.78 | 6 | info | `/games/chemistry-experiments-high-school` | 03 |
| table of elements printable | 27,100 | — | 0.23 | 14 | info | `/guides/periodic-table-worksheet` | 03 |
| elephant toothpaste chemistry experiment | 22,200 | — | 0.00 | 7 | info | `/games/chemistry-experiments-high-school` | 03 |
| elements research | 14,800 | — | 0.47 | 24 | info | `/blog/periodic-table-project-ideas` | 03 |
| blank element table | 6,600 | — | 0.17 | 0 | info | `/guides/periodic-table-worksheet` | 03 |
| blank periodic table | 6,600 | — | 0.17 | 0 | info | `/guides/periodic-table-worksheet` | 03 |
| lyrics periodic table song | 6,600 | — | 0.00 | 0 | info | `/blog/periodic-table-project-ideas` | 03 |
| periodic table element song lyrics | 6,600 | — | 0.00 | 0 | info | `/blog/periodic-table-project-ideas` | 03 |
| periodic table elements song lyrics | 6,600 | — | 0.00 | 0 | info | `/blog/periodic-table-project-ideas` | 03 |
| periodic table lyrics | 6,600 | — | 0.00 | 0 | info | `/blog/periodic-table-project-ideas` | 03 |
| periodic table lyrics song | 6,600 | — | 0.00 | 0 | info | `/blog/periodic-table-project-ideas` | 03 |
| periodic table of elements lyrics | 6,600 | — | 0.00 | 0 | info | `/blog/periodic-table-project-ideas` | 03 |
| periodic table of elements song lyrics | 6,600 | — | 0.00 | 0 | info | `/blog/periodic-table-project-ideas` | 03 |
| periodic table of elements song with lyrics | 6,600 | — | 0.00 | 0 | info | `/blog/periodic-table-project-ideas` | 03 |
| periodic table song lyrics | 6,600 | — | 0.00 | 0 | info | `/blog/periodic-table-project-ideas` | 03 |
| periodic table song with lyrics | 6,600 | — | 0.00 | 0 | info | `/blog/periodic-table-project-ideas` | 03 |
| periodic table song words | 6,600 | — | 0.00 | 0 | info | `/blog/periodic-table-project-ideas` | 03 |
| text tuesday the periodic table and elements answer key | 5,400 | — | 0.00 | 0 | info | `/guides/periodic-table-worksheet` | 03 |
| colorable periodic table | 3,600 | — | 0.04 | 1 | info | `/guides/periodic-table-worksheet` | 03 |
| periodic table of elements with charges printable | 3,600 | — | 0.52 | 1 | info | `/guides/periodic-table-worksheet` | 03 |
| periodic table printable with charges | 3,600 | — | 0.52 | 0 | info | `/guides/periodic-table-worksheet` | 03 |
| periodic table with charges printable | 3,600 | — | 0.52 | 1 | info | `/guides/periodic-table-worksheet` | 03 |
| printable periodic table of elements with charges | 3,600 | — | 0.52 | 0 | info | `/guides/periodic-table-worksheet` | 03 |
| printable periodic table with charges | 3,600 | — | 0.52 | 4 | info | `/guides/periodic-table-worksheet` | 03 |
| electron configuration and periodic properties lab report sheet | 1,900 | — | 0.00 | 0 | info | `/guides/periodic-table-worksheet` | 03 |
| hunting the elements nova | 1,900 | — | 1.95 | 0 | info | `/blog/periodic-table-project-ideas` | 03 |
| nova hunting the elements | 1,900 | — | 1.95 | 0 | info | `/blog/periodic-table-project-ideas` | 03 |

*88 further keywords in this cluster — `seo/keywords_master.csv`, filter `cluster == "Teachers & Classroom"` (their combined US volume is 44,240/mo).*

Sub-topics: Project Ideas (57) · Worksheets (34) · Lab Experiments (15) · Classroom Activities (12)

---

## 13. Acids, Bases & pH

**378 keywords · 1,353,060 US searches/mo · 9 planned pages · 5 sub-topics.**
Keywords in this cluster already assigned to a live page: `/cheat-sheets/acids-and-bases`, `/games/acid-classification`, `/games/neutralise`.

**Planned pages** (from `04_topical_map.csv`, by priority score)

| Page | Slug | Type | Tier | Primary keyword | US | Kws | Exists |
|---|---|---|---|---|---:|---:|---|
| Acids and Bases Quiz - Free Chemistry Quiz Game | `/games/acids-and-bases-quiz` | game | P1 | which one of the following is a weak acid | 90,500 | 120 | yes |
| Acid-Base Titration Simulation - Free Virtual Lab | `/games/acid-base-titration-simulation` | game | P2 | titration | 60,500 | 38 | no |
| Henderson-Hasselbalch Equation & Acid Strength | `/guides/henderson-hasselbalch-acid-strength` | guide | P3 | hasselbalch equation | 33,100 | 20 | no |
| Acids and Bases: Definitions, pH Scale & Solubility | `/guides/acids-and-bases-basics` | pillar_hub | P3 | acids | 60,500 | 58 | no |
| pH Scale & Titration Quiz Game | `/games/acids-bases-ph-titration-game` | game | P3 | ph of salt | 1,000 | 11 | no |
| pH Scale of Acids and Bases - Chart, Ranges & Examples | `/guides/ph-scale-acids-bases` | guide | P3 | acids ph level | 2,900 | 94 | no |
| Titration Curves & Lab Guide - Graphs, Formulas, Setup | `/guides/titration-curves-lab` | guide | P3 | titration graph | 9,900 | 28 | no |
| Acid-Base Organic Chemistry Practice Problems | `/guides/acid-base-organic-chemistry-practice` | guide | P3 | organic chemistry acid-base reactions practice problems | 90 | 8 | no |
| Acids & Bases Cheat Sheet - Quick Reference Guide | `/guides/acids-bases-cheat-sheet` | guide | Later/Skip | ap chemistry acids and bases practice test | 30 | 1 | yes |

**Top 30 keywords by US volume**

| Keyword | US | AU | CPC | KD | Intent | Target | Stage |
|---|---:|---:|---:|---:|---|---|---|
| which one of the following is a weak acid | 90,500 | 1,600 | 0.00 | 0 | info | `/games/acid-classification` | 03+08 |
| acid | 60,500 | — | 1.32 | 21 | info | `/guides/acids-and-bases-basics` | 03 |
| acids | 60,500 | — | 1.32 | 12 | info | `/guides/acids-and-bases-basics` | 03 |
| titration | 60,500 | — | 0.00 | 6 | info | `/games/acid-base-titration-simulation` | 03 |
| acid rain acids | 40,500 | — | 3.59 | 20 | info | `/guides/acids-and-bases-basics` | 03 |
| hasselbalch equation | 33,100 | — | 0.00 | 6 | info | `/guides/henderson-hasselbalch-acid-strength` | 03 |
| henderson--hasselbalch formula | 33,100 | — | 0.00 | 14 | info | `/guides/henderson-hasselbalch-acid-strength` | 03 |
| henderson-hasselbalch equation | 33,100 | — | 0.00 | 8 | info | `/guides/henderson-hasselbalch-acid-strength` | 03 |
| acid strength | 27,100 | — | 0.44 | 0 | info | `/guides/henderson-hasselbalch-acid-strength` | 03 |
| acids strong | 27,100 | — | 0.44 | 6 | info | `/guides/henderson-hasselbalch-acid-strength` | 03 |
| hf acidity | 27,100 | — | 3.10 | 19 | info | `/guides/henderson-hasselbalch-acid-strength` | 03 |
| strength of acid | 27,100 | — | 0.44 | 6 | info | `/guides/henderson-hasselbalch-acid-strength` | 03 |
| strength of acids | 27,100 | — | 0.44 | 6 | info | `/guides/henderson-hasselbalch-acid-strength` | 03 |
| strength of an acid | 27,100 | — | 0.44 | 6 | info | `/guides/henderson-hasselbalch-acid-strength` | 03 |
| strong acid | 27,100 | — | 0.44 | 2 | info | `/guides/henderson-hasselbalch-acid-strength` | 03 |
| strong acid chemistry | 27,100 | — | 0.44 | 6 | info | `/guides/henderson-hasselbalch-acid-strength` | 03 |
| strong acids | 27,100 | — | 0.44 | 0 | info | `/guides/henderson-hasselbalch-acid-strength` | 03 |
| strongest acids | 27,100 | — | 0.44 | 5 | info | `/guides/henderson-hasselbalch-acid-strength` | 03 |
| define solubility | 22,200 | — | 0.00 | 10 | info | `/guides/acids-and-bases-basics` | 03 |
| definition of solubility | 22,200 | — | 0.00 | 18 | info | `/guides/acids-and-bases-basics` | 03 |
| acetic acid equation | 18,100 | — | 7.41 | 15 | info | `/guides/henderson-hasselbalch-acid-strength` | 03 |
| acid and base chemistry | 18,100 | — | 0.02 | 21 | info | `/guides/acids-and-bases-basics` | 03 |
| acid and bases | 18,100 | — | 2.84 | 16 | info | `/guides/acids-and-bases-basics` | 03 |
| acid and bases chemistry | 18,100 | — | 2.84 | 14 | info | `/guides/acids-and-bases-basics` | 03 |
| acid to base | 18,100 | — | 2.84 | 3 | info | `/guides/acids-and-bases-basics` | 03 |
| acid-base chemistry | 18,100 | — | 2.84 | 31 | info | `/guides/acids-and-bases-basics` | 03 |
| acidity of a base | 18,100 | — | 2.84 | 0 | info | `/guides/acids-and-bases-basics` | 03 |
| acidity of base | 18,100 | — | 2.84 | 3 | info | `/guides/acids-and-bases-basics` | 03 |
| acids and bases | 18,100 | 1,600 | 2.84 | 20 | info | `/cheat-sheets/acids-and-bases` | 03+08 |
| acids and bases chemistry | 18,100 | — | 2.84 | 12 | info | `/guides/acids-and-bases-basics` | 03 |

*348 further keywords in this cluster — `seo/keywords_master.csv`, filter `cluster == "Acids, Bases & pH"` (their combined US volume is 444,860/mo).*

Sub-topics: acid-base quiz (131) · ph scale (94) · acid-base basics (67) · titration (66) · acid strength (20)

---

## 14. Organic Chemistry

**288 keywords · 1,118,260 US searches/mo · 9 planned pages · 6 sub-topics.**

**Planned pages** (from `04_topical_map.csv`, by priority score)

| Page | Slug | Type | Tier | Primary keyword | US | Kws | Exists |
|---|---|---|---|---|---:|---:|---|
| Organic Chemistry Quiz - Functional Groups Game | `/games/organic-chemistry-quiz` | game | P2 | functional groups organic chemistry quiz | 590 | 39 | no |
| Organic Nomenclature Quiz - IUPAC Naming Game | `/games/organic-nomenclature-quiz` | game | P2 | organic compound namer | 1,900 | 20 | no |
| Organic Chemistry Guide - Introduction & Basics | `/guides/organic-chemistry-guide` | pillar_hub | P3 | chemistry and organic chemistry | 40,500 | 64 | no |
| Functional Group Flashcards - Organic Chemistry Game | `/games/functional-groups-flashcards` | game | P3 | functional group practice | 880 | 10 | no |
| Organic Chemistry Cheat Sheet - Free Reference Guide | `/guides/organic-chemistry-cheat-sheet` | guide | P3 | organic chemistry functional groups | 14,800 | 36 | no |
| Organic Chemistry Practice Problems & Exercises | `/guides/organic-chemistry-practice` | guide | P3 | arrange the organic compounds from most soluble in water | 8,100 | 107 | no |
| Organic Chemistry Flashcards - Reactions Game | `/games/organic-chemistry-flashcard-game` | game | P3 | organic chemistry reactions flashcards | 90 | 6 | no |
| Resonance Structures Practice - Organic Chem | `/guides/resonance-structures-practice` | guide | P3 | which of these molecules or ions exhibit resonance | 1,000 | 5 | no |
| Organic Chemistry Worksheets - Free PDF Printables | `/guides/organic-chemistry-worksheets` | guide | Later/Skip | organic chemistry worksheets | 170 | 1 | no |

**Top 30 keywords by US volume**

| Keyword | US | AU | CPC | KD | Intent | Target | Stage |
|---|---:|---:|---:|---:|---|---|---|
| carboxylic acid | 60,500 | — | 1.00 | 29 | info | `/guides/organic-chemistry-guide` | 03 |
| carboxylic acid acidity | 60,500 | — | 1.00 | 0 | info | `/guides/organic-chemistry-guide` | 03 |
| carboxylic acids | 60,500 | — | 1.00 | 30 | info | `/guides/organic-chemistry-guide` | 03 |
| carboxylic acids acidity | 60,500 | — | 1.00 | 3 | info | `/guides/organic-chemistry-guide` | 03 |
| chemistry and organic chemistry | 40,500 | — | 6.18 | 34 | info | `/guides/organic-chemistry-guide` | 03 |
| chemistry organic | 40,500 | — | 6.18 | 60 | info | `/guides/organic-chemistry-guide` | 03 |
| functional groups | 40,500 | — | 0.00 | 17 | info | `/guides/organic-chemistry-guide` | 03 |
| organic chemicals | 40,500 | — | 6.18 | 14 | info | `/guides/organic-chemistry-guide` | 03 |
| organic chemistry | 40,500 | — | 4.36 | 59 | info | `/guides/organic-chemistry-guide` | 03 |
| you have unknowns that are carboxylic acid an ester | 33,100 | — | 0.00 | 0 | info | `/guides/organic-chemistry-practice` | 03 |
| carboxyl functional group | 22,200 | — | 0.00 | 9 | info | `/guides/organic-chemistry-guide` | 03 |
| alkenes | 18,100 | — | 0.00 | 12 | info | `/guides/organic-chemistry-guide` | 03 |
| alkenes and alkynes are called unsaturated compounds because | 18,100 | — | 0.00 | 0 | info | `/guides/organic-chemistry-guide` | 03 |
| carbonyl chemical compound | 18,100 | — | 0.00 | 3 | info | `/guides/organic-chemistry-guide` | 03 |
| carbonyl compound | 18,100 | — | 0.00 | 3 | info | `/guides/organic-chemistry-guide` | 03 |
| carbonyl compounds | 18,100 | — | 0.00 | 0 | info | `/guides/organic-chemistry-guide` | 03 |
| carbonyl functional group | 18,100 | — | 0.00 | 8 | info | `/guides/organic-chemistry-guide` | 03 |
| carbonyl functional groups | 18,100 | — | 0.00 | 8 | info | `/guides/organic-chemistry-guide` | 03 |
| glucose molecular | 18,100 | — | 0.00 | 16 | info | `/guides/organic-chemistry-guide` | 03 |
| grignard chemistry | 18,100 | — | 0.00 | 42 | info | `/guides/organic-chemistry-guide` | 03 |
| grignard reaction | 18,100 | — | 0.00 | 48 | info | `/guides/organic-chemistry-guide` | 03 |
| grignard reaction reagents | 18,100 | — | 0.00 | 42 | info | `/guides/organic-chemistry-guide` | 03 |
| grignard reactions | 18,100 | — | 0.00 | 41 | info | `/guides/organic-chemistry-guide` | 03 |
| functional group in organic chemistry | 14,800 | — | 16.56 | 7 | info | `/guides/organic-chemistry-guide` | 03 |
| functional group of organic chemistry | 14,800 | — | 16.56 | 11 | info | `/guides/organic-chemistry-guide` | 03 |
| functional group organic chemistry | 14,800 | — | 16.56 | 7 | info | `/guides/organic-chemistry-guide` | 03 |
| functional groups for organic chemistry | 14,800 | — | 16.56 | 9 | info | `/guides/organic-chemistry-guide` | 03 |
| functional groups in organic chemistry | 14,800 | — | 16.56 | 15 | info | `/guides/organic-chemistry-guide` | 03 |
| functional groups ochem | 14,800 | — | 16.56 | 13 | info | `/guides/organic-chemistry-guide` | 03 |
| functional groups of organic chemistry | 14,800 | — | 16.56 | 10 | info | `/guides/organic-chemistry-guide` | 03 |

*258 further keywords in this cluster — `seo/keywords_master.csv`, filter `cluster == "Organic Chemistry"` (their combined US volume is 297,660/mo).*

Sub-topics: Practice Problems (112) · Core Concepts (64) · Functional Groups Games (55) · Cheat Sheets (36) · Nomenclature Games (20) · Worksheets (1)

---

## 15. Chemistry Games Hub

**482 keywords · 129,050 US searches/mo · 14 planned pages · 8 sub-topics.**
Keywords in this cluster already assigned to a live page: `/`, `/cheat-sheets`, `/games`, `/games/acid-classification`, `/games/formula-blaster`, `/games/neutralise`.

**Planned pages** (from `04_topical_map.csv`, by priority score)

| Page | Slug | Type | Tier | Primary keyword | US | Kws | Exists |
|---|---|---|---|---|---:|---:|---|
| Chemistry Quiz - Free Online General Chemistry Game | `/games/chemistry-quiz` | game | P2 | chemquiz | 5,400 | 182 | no |
| Chemistry Games for High School - Free Online Learning | `/games/chemistry-games-for-high-school` | game | P2 | chemistry games | 1,900 | 170 | no |
| Lab Safety Quiz - Free Online Chemistry Lab Safety Game | `/games/lab-safety-quiz` | game | P3 | chem lab | 8,100 | 21 | no |
| Chemistry Flashcards - Free Online Study Game | `/games/chemistry-flashcards` | game | P3 | chemistry flashcards | 880 | 48 | no |
| Lab Equipment Quiz - Free Chemistry Quiz Game | `/games/lab-equipment-quiz` | game | P3 | chemistry lab equipment | 4,400 | 16 | no |
| General Chemistry Practice Problems - Free Game | `/games/general-chemistry-practice` | game | P3 | gas laws phet | 1,000 | 6 | no |
| Chemistry Basics Quiz - Test Your Knowledge Free | `/games/chemistry-basics-quiz` | game | P3 | basics of chemistry quiz | 110 | 9 | no |
| Chemistry Review Games Online - Free for Finals | `/games/chemistry-review-games` | game | Later/Skip | ap chemistry review games | 10 | 3 | partial |
| Science Simulation Online - Free Chemistry Labs | `/games/science-simulation-online` | game | Later/Skip | science simulation online | 70 | 1 | no |
| Organic Chemistry Games Online - Naming & Learning | `/games/organic-chemistry-games` | game | Later/Skip | organic chemistry learning games | 10 | 4 | no |
| Simple Chemistry Games - Free for Beginners & Kids | `/games/chemistry-games-beginners` | game | Later/Skip | chemistry games for beginners | 10 | 4 | no |
| Virtual Chemistry Lab - Free Online Simulations | `/games/virtual-chemistry-lab` | game | Later/Skip | virtual chemistry lab free download | 10 | 3 | no |

*…and 2 more pages in this pillar — see `04_topical_map.csv`.*

**Top 30 keywords by US volume**

| Keyword | US | AU | CPC | KD | Intent | Target | Stage |
|---|---:|---:|---:|---:|---|---|---|
| chem lab | 8,100 | — | 8.85 | 14 | info | `/games/lab-safety-quiz` | 03 |
| neutralization reaction | 8,100 | 1,300 | — | — | — | `/games/neutralise` | 08 |
| chemquiz | 5,400 | — | 0.00 | 1 | info | `/games/chemistry-quiz` | 03 |
| chemistry lab equipment | 4,400 | — | 3.13 | 23 | info | `/games/lab-equipment-quiz` | 03 |
| laboratory equipments in chemistry | 4,400 | — | 3.13 | 4 | info | `/games/lab-equipment-quiz` | 03 |
| crucible chemistry | 2,400 | — | 14.35 | 3 | info | `/games/lab-equipment-quiz` | 03 |
| doctor doe chemistry quiz | 2,400 | — | 0.00 | 0 | info | `/games/chemistry-quiz` | 03 |
| doctor doe's chemistry quiz | 2,400 | — | 0.00 | 0 | info | `/games/chemistry-quiz` | 03 |
| dr doe chemical quiz | 2,400 | — | 0.00 | 0 | info | `/games/chemistry-quiz` | 03 |
| what is a neutralization reaction | 2,400 | 480 | — | — | — | `/games/neutralise` | 08 |
| acid base neutralization reaction | 1,900 | 110 | — | — | — | `/games/neutralise` | 08 |
| chemical game | 1,900 | — | 2.44 | 29 | info | `/games/chemistry-games-for-high-school` | 03 |
| chemical question | 1,900 | — | 8.51 | 0 | info | `/games/chemistry-quiz` | 03 |
| chemistry games | 1,900 | 170 | 2.16 | 2 | info | `/games` | 02+03+08 |
| chemistry questions | 1,900 | — | 8.51 | 0 | info | `/games/chemistry-quiz` | 03 |
| chemistry quiz | 1,900 | 210 | 2.52 | 0 | info | `/games/chemistry-quiz` | 02+03 |
| chemistry science questions | 1,900 | — | 8.51 | 1 | info | `/games/chemistry-quiz` | 03 |
| chemistry science quiz | 1,900 | 210 | 2.52 | — | info | `/games/chemistry-quiz` | 02 |
| chemistry test | 1,900 | — | 4.97 | 0 | info | `/games/chemistry-quiz` | 03 |
| chemistry the game | 1,900 | — | 2.44 | 0 | info | `/games/chemistry-games-for-high-school` | 03 |
| games in chemistry | 1,900 | 170 | 2.16 | — | info | `/games/chemistry-games-for-high-school` | 02 |
| games with chemistry | 1,900 | 170 | 2.16 | — | info | `/games/chemistry-games-for-high-school` | 02 |
| questions of chemistry | 1,900 | — | 8.51 | 0 | info | `/games/chemistry-quiz` | 03 |
| quiz about chemistry | 1,900 | 210 | 2.24 | — | info | `/games/chemistry-quiz` | 02 |
| quiz chemistry | 1,900 | 210 | 2.24 | — | info | `/games/chemistry-quiz` | 02 |
| quiz for chemistry | 1,900 | 210 | 2.52 | — | info | `/games/chemistry-quiz` | 02 |
| quiz on chemistry | 1,900 | 210 | 2.24 | — | info | `/games/chemistry-quiz` | 02 |
| quizzes for chemistry | 1,900 | — | 2.24 | 0 | info | `/games/chemistry-quiz` | 03 |
| quizzes in chemistry | 1,900 | — | 2.24 | 0 | info | `/games/chemistry-quiz` | 03 |
| gas laws phet | 1,000 | — | 0.00 | 2 | info | `/games/general-chemistry-practice` | 03 |

*452 further keywords in this cluster — `seo/keywords_master.csv`, filter `cluster == "Chemistry Games Hub"` (their combined US volume is 49,550/mo).*

Sub-topics: General Chemistry Games (245) · Hubs & Collections (174) · Lab Skills Games (40) · Stage 8 on-page target (13) · Organic Hub (4) · Review Games (3) · Hub Blog (2) · Simulations (1)

---

## 16. Competitor gap keywords (stage 3)

`03_competitor_keywords.csv` — 8,654 chemistry keywords that 26 scored competitor domains already rank for in the US top 30. **8,335 of them (96%) never appeared in the stage-2 seed expansion**, so this is the true gap set. They carry the only keyword-difficulty data in the project. All are folded into the cluster tables above and into `keywords_master.csv` (`source_stage` contains `03`).

**Top competitor domains** (`03_competitors.csv`, by weighted SERP score)

| Domain | Type | Kws in SERPs | Best rank | Avg rank | Volume captured | Relevant kws pulled |
|---|---|---:|---:|---:|---:|---:|
| youtube.com | reference | 53 | 2 | 6.5 | 246,420 | — |
| sporcle.com | quiz-platform | 13 | 1 | 1.4 | 16,320 | 609 |
| quizlet.com | quiz-platform | 21 | 1 | 5.3 | 52,220 | 691 |
| britannica.com | reference | 13 | 2 | 2.3 | 29,020 | — |
| play.google.com | reference | 16 | 2 | 4.6 | 62,040 | — |
| khanacademy.org | edu-platform | 19 | 1 | 6.8 | 95,290 | 574 |
| reddit.com | reference | 16 | 2 | 6.7 | 91,600 | — |
| chemquiz.net | direct | 8 | 1 | 2.8 | 54,890 | 742 |
| jetpunk.com | quiz-platform | 11 | 3 | 5.3 | 7,320 | 418 |
| cen.acs.org | reference | 10 | 4 | 5.5 | 6,600 | — |
| pearson.com | reference | 12 | 1 | 7.0 | 203,610 | — |
| chem.libretexts.org | reference | 9 | 3 | 5.8 | 96,590 | 727 |
| phet.colorado.edu | direct | 5 | 1 | 1.6 | 55,100 | 319 |
| scichamp.com | direct | 6 | 2 | 3.3 | 10,990 | 202 |
| en.wikipedia.org | reference | 8 | 2 | 5.2 | 4,254,300 | — |

**Top 30 gap keywords by US volume**

| Keyword | US | CPC | KD | Best competitor | Rank | Competitors | Cluster |
|---|---:|---:|---:|---|---:|---:|---|
| chemistry table of elements | 4,090,000 | 0.09 | 45 | khanacademy.org | 15 | 1 | Periodic Table & Elements |
| periodic tables | 4,090,000 | 0.09 | 53 | khanacademy.org | 20 | 1 | Periodic Table & Elements |
| elements on the periodic table | 368,000 | 0.07 | 25 | chemistrytalk.org | 10 | 2 | Periodic Table & Elements |
| periodic table and elements | 368,000 | 0.07 | 70 | khanacademy.org | 20 | 2 | Periodic Table & Elements |
| periodic table be element | 368,000 | 0.07 | 40 | khanacademy.org | 19 | 2 | Periodic Table & Elements |
| periodic table of elements | 368,000 | 0.07 | 54 | chemistrytalk.org | 17 | 2 | Periodic Table & Elements |
| elements chemistry table | 368,000 | 0.07 | 35 | khanacademy.org | 18 | 1 | Periodic Table & Elements |
| elements periodic table | 368,000 | 0.07 | 48 | khanacademy.org | 26 | 1 | Periodic Table & Elements |
| periodic table as element | 368,000 | 0.07 | 40 | khanacademy.org | 19 | 1 | Periodic Table & Elements |
| periodic table of chemical element | 368,000 | 0.07 | 45 | khanacademy.org | 21 | 1 | Periodic Table & Elements |
| periodic table of chemical elements | 368,000 | 0.07 | 42 | khanacademy.org | 20 | 1 | Periodic Table & Elements |
| chemical experiments | 301,000 | 5.78 | 6 | chem.libretexts.org | 29 | 1 | Teachers & Classroom |
| chemistry an experiment | 301,000 | 5.78 | 0 | chem.libretexts.org | 22 | 1 | Teachers & Classroom |
| chemistry science experiment | 301,000 | 5.78 | 0 | teacherspayteachers.com | 14 | 1 | Teachers & Classroom |
| chemistry science experiments | 301,000 | 5.78 | 6 | teacherspayteachers.com | 30 | 1 | Teachers & Classroom |
| smartwork5 chemistry answers | 246,000 | 0.00 | 0 | quizlet.com | 3 | 1 | Study Skills & Cheat Sheets |
| alchemical | 246,000 | 1.23 | 28 | chem.libretexts.org | 27 | 1 | Study Skills & Cheat Sheets |
| atoms | 246,000 | 6.16 | 23 | khanacademy.org | 12 | 1 | Atomic Structure & Electron Configuration |
| barf acronym chemistry | 201,000 | 0.00 | 0 | quizlet.com | 21 | 1 | Chemical Reactions & Balancing Equations |
| chemistry | 201,000 | 8.57 | 100 | khanacademy.org | 4 | 2 | Study Skills & Cheat Sheets |
| chemistry and chemicals | 201,000 | 8.57 | 5 | chem.libretexts.org | 2 | 2 | Study Skills & Cheat Sheets |
| match the following compounds to their likely solubility in water | 201,000 | 0.00 | 0 | quizlet.com | 5 | 2 | Formulas, Naming & Compounds |
| aleks initial knowledge check answers chemistry | 165,000 | 0.00 | 0 | quizlet.com | 1 | 1 | Study Skills & Cheat Sheets |
| provide the formula for each compound | 165,000 | 0.00 | 0 | chem.libretexts.org | 5 | 2 | Formulas, Naming & Compounds |
| chemical element pa | 135,000 | 0.00 | 14 | periodictable.one | 23 | 1 | Periodic Table & Elements |
| pa element | 135,000 | 0.00 | 15 | periodictable.one | 24 | 1 | Periodic Table & Elements |
| kinetics equation | 135,000 | 3.31 | 4 | chem.libretexts.org | 11 | 2 | Study Skills & Cheat Sheets |
| kinetics equations | 135,000 | 3.31 | 7 | chem.libretexts.org | 6 | 2 | Study Skills & Cheat Sheets |
| periodic table interactive | 110,000 | 1.84 | 45 | chemistrytalk.org | 19 | 2 | Periodic Table & Elements |
| interactive periodic table | 110,000 | 2.21 | 41 | chemistrytalk.org | 16 | 1 | Periodic Table & Elements |

**Lower-difficulty gap keywords worth taking first** — gap keywords with US volume ≥ 500 and KD ≤ 30, top 25 by volume.

| Keyword | US | KD | Best competitor | Rank |
|---|---:|---:|---|---:|
| elements on the periodic table | 368,000 | 25 | chemistrytalk.org | 10 |
| chemical experiments | 301,000 | 6 | chem.libretexts.org | 29 |
| chemistry an experiment | 301,000 | 0 | chem.libretexts.org | 22 |
| chemistry science experiment | 301,000 | 0 | teacherspayteachers.com | 14 |
| chemistry science experiments | 301,000 | 6 | teacherspayteachers.com | 30 |
| smartwork5 chemistry answers | 246,000 | 0 | quizlet.com | 3 |
| alchemical | 246,000 | 28 | chem.libretexts.org | 27 |
| atoms | 246,000 | 23 | khanacademy.org | 12 |
| barf acronym chemistry | 201,000 | 0 | quizlet.com | 21 |
| chemistry and chemicals | 201,000 | 5 | chem.libretexts.org | 2 |
| match the following compounds to their likely solubility in water | 201,000 | 0 | quizlet.com | 5 |
| aleks initial knowledge check answers chemistry | 165,000 | 0 | quizlet.com | 1 |
| provide the formula for each compound | 165,000 | 0 | chem.libretexts.org | 5 |
| chemical element pa | 135,000 | 14 | periodictable.one | 23 |
| pa element | 135,000 | 15 | periodictable.one | 24 |
| kinetics equation | 135,000 | 4 | chem.libretexts.org | 11 |
| kinetics equations | 135,000 | 7 | chem.libretexts.org | 6 |
| chemical ionization | 110,000 | 0 | chem.libretexts.org | 3 |
| molecules | 110,000 | 20 | khanacademy.org | 15 |
| element bi | 90,500 | 12 | periodictable.one | 27 |
| homogeneous chemistry | 90,500 | 10 | chem.libretexts.org | 4 |
| chemistry formula | 90,500 | 13 | chem.libretexts.org | 15 |
| which one of the following is a weak acid | 90,500 | 0 | quizlet.com | 5 |
| atom configuration | 90,500 | 7 | chem.libretexts.org | 6 |
| atomic configuration | 90,500 | 3 | khanacademy.org | 11 |

> **Read this list critically.** DataForSEO reports KD 0 for many homework/answer-key queries (`smartwork5 chemistry answers`, `aleks initial knowledge check answers chemistry`, `match the following compounds…`) because nobody competes for them on merit. Stage 8 rejected exactly this class of keyword as off-audience for a games site — they are easy *and* worthless here. The usable rows are the concept and element queries.

*5,566 more low-difficulty gap keywords — filter `03_competitor_keywords.csv` on `is_new_vs_stage2 = True`, `difficulty <= 30`.*

---

## 17. Periodic-table microsite keywords (stage 6)

`06_periodic_microsite_keywords.csv` — the top-1,000 ranked US keywords of each of two single-purpose periodic-table microsites (`periodictable.one`, `coolperiodictable.com`), pulled with DataForSEO Labs `ranked_keywords`. 2,000 rows / **1,589 unique keywords**; 887 of them appear in no other stage. They are the evidence behind the `/elements/[element]` programmatic template — a per-element page pattern is what these two sites monetise, and per-element queries are 1,590 of the 2,000 rows.

| Page pattern | Rows | What it is |
|---|---:|---|
| `per-element` | 1,590 | A query about one specific element (`/elements/[element]` template) |
| `trend` | 271 | Periodic trend / property query (electronegativity, atomic radius…) |
| `other` | 128 | Whole-table, navigational or uncategorised |
| `game` | 7 | Periodic-table game query |
| `quiz` | 4 | Periodic-table quiz query |

**Top 30 microsite keywords by US volume**

| Keyword | US | Pattern | Ranked by | Rank | Ranking URL |
|---|---:|---|---|---:|---|
| element i on periodic table | 368,000 | per-element | periodictable.one | 65 | https://www.periodictable.one/ |
| elements on the periodic table | 368,000 | other | periodictable.one | 50 | https://www.periodictable.one/ |
| periodic table of chemical element | 368,000 | other | periodictable.one | 67 | https://www.periodictable.one/elements |
| chemical element pa | 135,000 | per-element | periodictable.one | 23 | https://www.periodictable.one/element/91 |
| pa element | 135,000 | per-element | periodictable.one | 24 | https://www.periodictable.one/element/91 |
| protactinium element | 135,000 | per-element | coolperiodictable.com | 60 | https://www.coolperiodictable.com/protactinium/ |
| element lanthanum | 110,000 | per-element | periodictable.one | 40 | https://www.periodictable.one/element/57 |
| interactive periodic table | 110,000 | game | periodictable.one | 65 | https://www.periodictable.one/ |
| interactive periodic table of elements | 110,000 | game | periodictable.one | 83 | https://www.periodictable.one/ |
| interactive periodic tables | 110,000 | game | periodictable.one | 86 | https://www.periodictable.one/ |
| interactive table of elements | 110,000 | game | periodictable.one | 66 | https://www.periodictable.one/ |
| lanthanum | 110,000 | per-element | periodictable.one | 23 | https://www.periodictable.one/element/57 |
| lanthanum element | 110,000 | per-element | periodictable.one | 38 | https://www.periodictable.one/element/57 |
| na sodium | 110,000 | per-element | periodictable.one | 52 | https://www.periodictable.one/element/11 |
| natrium element | 110,000 | per-element | periodictable.one | 61 | https://www.periodictable.one/element/11 |
| periodic table interactive | 110,000 | game | periodictable.one | 71 | https://www.periodictable.one/ |
| sodium na | 110,000 | per-element | periodictable.one | 44 | https://www.periodictable.one/element/11 |
| bi element | 90,500 | per-element | periodictable.one | 33 | https://www.periodictable.one/element/83 |
| element bi | 90,500 | per-element | periodictable.one | 27 | https://www.periodictable.one/element/83 |
| helium | 90,500 | per-element | periodictable.one | 67 | https://www.periodictable.one/element/2 |
| hydrogen element | 90,500 | per-element | periodictable.one | 55 | https://www.periodictable.one/element/1 |
| which compound has the atom with the highest oxidation number | 90,500 | other | coolperiodictable.com | 48 | https://www.coolperiodictable.com/resources/chemical-formu… |
| chlorine element | 74,000 | per-element | periodictable.one | 48 | https://www.periodictable.one/element/17 |
| nitrogen | 74,000 | per-element | periodictable.one | 52 | https://www.periodictable.one/element/7 |
| element fr | 60,500 | per-element | periodictable.one | 38 | https://www.periodictable.one/element/87 |
| element po | 60,500 | per-element | periodictable.one | 26 | https://www.periodictable.one/element/84 |
| elements po | 60,500 | per-element | periodictable.one | 27 | https://www.periodictable.one/element/84 |
| francium | 60,500 | per-element | periodictable.one | 33 | https://www.periodictable.one/element/87 |
| francium element | 60,500 | per-element | periodictable.one | 31 | https://www.periodictable.one/element/87 |
| francium metal | 60,500 | per-element | periodictable.one | 42 | https://www.periodictable.one/element/87 |

*1,559 more — `06_periodic_microsite_keywords.csv`, or filter `keywords_master.csv` on `source_stage` containing `06-microsite`.*

---

## 18. Programmatic entity keywords (stage 4 + 6)

Eight entity families where one page template × N entities covers a large long tail. Stage 4 detected the families in the master set; stage 6 re-pulled five of them with `keyword_suggestions` and added **1,775 keywords that were new against the 11,532-row master set** (`06_entity_expansion.csv`).

| Family | Page template | Slug pattern | Entities | US volume/mo |
|---|---|---|---:|---:|
| `element_page` | {Element} - Symbol, Atomic Number, Mass & Facts | `/elements/[element]` | 88 | 7,209,900 |
| `molar_mass` | Molar Mass of {Compound} - Molecular Weight Calculator | `/tools/molar-mass/[compound]` | 115 | 885,000 |
| `electron_configuration` | Electron Configuration of {Element} - Full & Noble Gas Notation | `/guides/electron-configuration/[element]` | 38 | 745,540 |
| `lewis_structure` | {Compound} Lewis Structure - How to Draw It | `/guides/lewis-structure/[compound]` | 114 | 178,680 |
| `chemical_formula_for` | Chemical Formula for {Compound} | `/guides/chemical-formula/[compound]` | 122 | 78,500 |
| `polyatomic_ions` | {Ion} Ion - Formula, Charge & Naming | `/guides/polyatomic-ions/[ion]` | 55 | 28,340 |
| `named_reaction` | {Reaction} - Balanced Equation & Explanation | `/reactions/[reaction]` | 30 | 26,000 |
| `oxidation_number` | Oxidation Number of {Element} - Common States | `/guides/oxidation-number/[element]` | 94 | 23,370 |

**Top 30 entities by US volume** — one row per entity (its highest-volume keyword; an entity typically has 5–10 phrasings, all in `06_entity_expansion.csv`).

| Entity | Family | Top keyword | US | Kws | Suggested page | New? |
|---|---|---|---:|---:|---|---|
| `co2` | `lewis_structure` | co2 lewis dot structure | 60,500 | 15 | `/guides/lewis-structure/co2` | yes |
| `so2` | `lewis_structure` | lewis dot structure for so2 | 40,500 | 16 | `/guides/lewis-structure/so2` | yes |
| `s` | `lewis_structure` | lewis structure s | 40,500 | 1 | `/guides/lewis-structure/s` | yes |
| `hcn` | `lewis_structure` | h c n lewis structure | 33,100 | 14 | `/guides/lewis-structure/hcn` | yes |
| `h2o` | `lewis_structure` | h2o lewis dot structure | 33,100 | 17 | `/guides/lewis-structure/h2o` | yes |
| `no2` | `lewis_structure` | lewis dot structure for no2 | 33,100 | 13 | `/guides/lewis-structure/no2` | yes |
| `co2` | `molar_mass` | molar mass co2 | 33,100 | 6 | `/tools/molar-mass/co2` | yes |
| `nh3` | `chemical_formula_for` | ammonia chemical formula | 27,100 | 9 | `/guides/chemical-formula/nh3` | yes |
| `nh4` | `chemical_formula_for` | ammonium chemical formula | 27,100 | 4 | `/guides/chemical-formula/nh4` | yes |
| `c6h12o6` | `chemical_formula_for` | chemical formula for glucose | 27,100 | 10 | `/guides/chemical-formula/c6h12o6` | no |
| `co` | `lewis_structure` | c o lewis structure | 27,100 | 15 | `/guides/lewis-structure/co` | yes |
| `ch4` | `lewis_structure` | ch4 lewis dot structure | 27,100 | 14 | `/guides/lewis-structure/ch4` | yes |
| `n2` | `lewis_structure` | lewis dot structure for n2 | 27,100 | 12 | `/guides/lewis-structure/n2` | yes |
| `nh3` | `lewis_structure` | lewis dot structure for nh3 | 27,100 | 18 | `/guides/lewis-structure/nh3` | yes |
| `o3` | `lewis_structure` | lewis dot structure for o3 | 27,100 | 13 | `/guides/lewis-structure/o3` | yes |
| `s` | `oxidation_number` | oxidation number s | 27,100 | 13 | `/guides/oxidation-number/sulfur` | yes |
| `o2` | `lewis_structure` | 02 lewis dot structure | 22,200 | 14 | `/guides/lewis-structure/o2` | yes |
| `no3` | `lewis_structure` | lewis dot structure for no3 | 22,200 | 10 | `/guides/lewis-structure/no3` | yes |
| `so3` | `lewis_structure` | lewis dot structure for so3 | 22,200 | 16 | `/guides/lewis-structure/so3` | yes |
| `o` | `lewis_structure` | lewis structure for oxygen | 22,200 | 11 | `/guides/lewis-structure/o` | yes |
| `naoh` | `molar_mass` | molar mass for naoh | 22,200 | 7 | `/tools/molar-mass/naoh` | no |
| `ch3cooh` | `chemical_formula_for` | acetic acid chemical formula | 18,100 | 9 | `/guides/chemical-formula/ch3cooh` | yes |
| `c2h2` | `lewis_structure` | acetylene lewis structure | 18,100 | 15 | `/guides/lewis-structure/c2h2` | yes |
| `bf3` | `lewis_structure` | bf3 lewis dot structure | 18,100 | 12 | `/guides/lewis-structure/bf3` | yes |
| `c2h4` | `lewis_structure` | c2h4 lewis dot structure | 18,100 | 17 | `/guides/lewis-structure/c2h4` | yes |
| `h2c2` | `lewis_structure` | h2c2 lewis structure | 18,100 | 2 | `/guides/lewis-structure/h2c2` | yes |
| `co3` | `lewis_structure` | lewis dot structure of co3 2 | 18,100 | 6 | `/guides/lewis-structure/co3` | yes |
| `co32` | `lewis_structure` | lewis dot structure of co32 | 18,100 | 5 | `/guides/lewis-structure/co32` | yes |
| `nacl` | `molar_mass` | nacl molar mass | 18,100 | 9 | `/tools/molar-mass/nacl` | yes |
| `ch4` | `chemical_formula_for` | chemical formula ch4 | 14,800 | 6 | `/guides/chemical-formula/ch4` | yes |

*457 entities / 2,002 keywords in this stage-6 set in total — the remaining 427 entities are in `06_entity_expansion.csv`.*

---

## 19. Caveats

- **AU volume is sparse by design.** Only stage-2 (3,178 kws) and the stage-8 batch (107 kws) were ever priced at `location_code` 2036 — 2,139 keywords in this file carry a non-zero AU figure (supporting-keyword volumes recovered from `raw/_s8_keyword_volumes.json`, which the stage-8 CSV omits). Stage-3/4/6 keywords were never AU-priced, so a blank AU cell means *not measured*.
- **Keyword difficulty exists only for stage-3 keywords** (8,654 of 14,230). It comes from DataForSEO `ranked_keywords`; nothing else in the pipeline pulled it.
- **Intent is DeepSeek-classified, not measured**, and only for the 11,532 stage-2/3 keywords. It is overwhelmingly `informational` (11,496); stage-6 and stage-8-only keywords have no intent value.
- **Head terms are mostly unattainable.** Stage 4 flagged 19 keywords as `is_unwinnable_head` (bare `periodic table` restatements, 4.09M/mo). Volume in §3 and in the Periodic Table cluster is dominated by them; treat cluster volume totals as ceilings, not forecasts.
- **The volume of a cluster is not the volume it can win.** `04_topical_map.csv` carries a separate `targetable_volume_us` per page, which is the honest number.
- **Locale mismatch (from `01_site_context.md`).** The site copy is British/Australian English against an AU curriculum ("Year 9", "Neutralise") while this research is US-phrased. Either the copy or the target market still needs a decision.
- **Target pages are proposals.** Only the 16 live paths in §1 exist (13 with a keyword target, 3 utility). Everything else in the `target_page` column is a planned slug from the topical map; `target_page_status` distinguishes `live` from `planned`.
- **`keywords_master.csv` dedupes on the lowercased keyword**, keeping the highest US volume and the most complete classification (stage 4 wins, then stage 8, then stage 6). `source_stage` lists every stage a keyword appeared in.

*Generated from the stage files listed above; 14,230 keywords, 12 clusters. To rebuild after a new research stage, re-merge the stage CSVs on the lowercased keyword in the same precedence order.*
