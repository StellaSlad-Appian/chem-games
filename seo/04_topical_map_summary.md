# Stage 4 — Topical Map: ChemGames

**Site:** https://chem-games-seven.vercel.app/  
**Market:** US primary (`location_code` 2840), AU secondary (2036)  
**Run date:** 2026-08-26  
**DataForSEO spend this stage: $0.00** — the stage-3 overrun left a $2.22 balance, so this stage was built entirely from data already on disk. No endpoint was called.

---

## 1. Method

| Step | Tool | Detail |
|---|---|---|
| 1. Merge | local | Stage-2 (3,178 relevant kws) + stage-3 (8,654 relevant kws) deduped on lowercased keyword. Stage-2 volumes/classification win on collision; both cluster labels retained; `num_competitors_ranking` and best-ranking competitor carried from stage 3. → **11,532 master keywords** |
| 2. Programmatic extraction | local regex + entity dictionary | 8 entity families detected (element names + symbols, ~60 compounds, 31 polyatomic ions, ~90 formulas, the site's 30 named reactions). Only keywords carrying a **specific entity** route to a template; generic heads stay on the parent guide. → 1,327 keywords into 8 templates |
| 3. Cluster union | local | Stage-2 cluster names resolved to page slugs via their primary keyword (116/116); stage-3 slugs merged in (68 matched, 8 new). → 129 clusters |
| 4. Split proposals | DeepSeek `deepseek-v4-flash` (pydantic-ai, reasoning **disabled**) | 15 over-broad clusters (>200 kws) each given their top 90 + a random tail sample; model proposed 2-8 focused sub-pages with scope statements. → 87 sub-pages |
| 5. Keyword→sub-page assignment | DeepSeek, 50/chunk, `Semaphore(8)` | 7,330 keywords assigned to a sub-page from a constrained menu. Coverage-checked with gap retry — **7,330/7,330, zero fallbacks, zero crashed chunks** |
| 6. Head-term isolation | local regex | Bare navigational periodic-table restatements (`periodic table`, `periodic tables`, `periodic table of elements`…) routed to a single flagged page; 67 mis-filed per-element lookups rescued into `/elements/[element]` |
| 7. Taxonomy | DeepSeek, 40 pages/chunk, full page index in context | Each of 198 pages assigned pillar → sub-topic → page type → final title → canonical slug, merging duplicates. **198/198, zero missing** → merged to 171 |
| 8. Merge + realign | local | 8 documented near-duplicate merges; slug prefixes realigned so `/games/` never holds an article page. → **166 pages** |
| 9. Scoring | local, deterministic | Priority formula below. No LLM involvement in scoring. |

### Spend

| Item | Cost |
|---|---|
| **DataForSEO** | **$0.0000** (hard constraint honoured) |
| DeepSeek pass A — split proposals | 40,470 in / 7,870 out |
| DeepSeek pass B — keyword assignment (158 calls) | 229,023 in / 194,786 out |
| DeepSeek pass C — taxonomy (5 calls) | 39,380 in / 16,742 out |
| **DeepSeek total** | **308,873 in / 219,398 out — ≈$0.4255 at peak v4-flash rates, ≈$0.2128 off-peak** |

---

## 2. Counts

| Metric | Value |
|---|---|
| Master keywords | **11,532** (stage-2 only 2,878 · stage-3 only 8,354 · both 300) |
| Total US volume | 86,586,360/mo |
| Total AU volume | 322,610/mo (stage-2 keywords only — stage-3 keywords were never AU-priced) |
| Pillars | **12** |
| Sub-topics | **81** |
| Pages | **166** |
| Internal link edges | 742 |

**Pages by type**

| Type | Pages |
|---|---|
| guide | 69 |
| game | 66 |
| pillar_hub | 12 |
| blog | 11 |
| programmatic_template | 8 |
| **Total** | **166** |

**Pages by tier**

| Tier | Pages | US volume |
|---|---|---|
| P1 | 27 | 23,123,310 |
| P2 | 40 | 30,162,530 |
| P3 | 58 | 8,294,880 |
| Programmatic | 8 | 9,175,330 |
| Later/Skip | 33 | 15,830,310 |
| **Total** | **166** | **86,586,360** |

### Volume reconciliation

```
master keyword US volume                86,586,360
sum of page total_volume_us             86,586,360   delta +0
  less unwinnable head terms            15,828,500   (19 bare 'periodic table' restatements)
  = targetable volume on the map        70,757,860
volume parked in Later/Skip pages       15,830,310   (18.3%)
volume in P1+P2+P3+Programmatic         70,756,050   (81.7%)
```

Every master keyword maps to exactly one `page_slug` (0 duplicates, 0 unmapped, 0 pointing at a non-existent page); every page has a pillar and a tier; no pillar is empty; no page is isolated in the link graph; 0 dangling `parent_slug` or link endpoints.

---

## 3. Priority formula

Deterministic, computed in Python — no LLM judgement. `targetable_volume = total_volume_us − unwinnable_head_volume`.

```
score = 10 · log10(targetable_volume + 10)      volume base

      + format_fit         +12  page_type = game        (22/23 game SERPs are tool-led; the site's native format)
                           + 8  programmatic_template   (structural gap: 2 competitors deep, template-cheap)
                           + 2  glossary
                           + 0  guide / blog / hub

      + winnability        + 8  >=3 mid-size competitors already rank for these keywords (proves the SERP is takeable)
                           + 4  exactly 2 competitors rank

      + existing_page      +10  exists_on_site = yes    (upgrade beats build)
                           + 5  exists_on_site = partial

      - aio_penalty        - 9  AI-Overview risk high   (measured from stage-3 SERPs where the keyword was probed,
                           - 4  risk med                 otherwise inferred: guide 76% -> high, game 39% -> low)
                           - 0  risk low

      - head_penalty       -18 · (unwinnable_head_volume / total_volume_us)
                                 caps out at -18 for a page that is nothing but mega-head navigational terms
```

**Tiers.** `Programmatic` = all 8 template pages. `Later/Skip` = head share >50% or targetable volume <400. The rest rank by score: **P1** = top 20 **plus the 5 best non-game support pages** (so the pillar structure and link graph have anchors from day one) plus the 2 existing site index pages = 27; **P2** = next 40; **P3** = remaining 58.

> The formula makes P1 game-dominated **by design** — that is stage 3's central finding, not an artefact. 20 of the 27 P1 pages are games or interactive tools. The 5 support guides are included because a games-only build has no topical-authority scaffolding and nothing to internally link from.

---

## 4. Pillar overview

| Pillar | Hub | Pages | Sub-topics | US volume | P1 |
|---|---|---|---|---|---|
| Periodic Table & Elements | `/guides/metals-nonmetals-metalloids-guide` | 22 | 14 | 45,281,640 | 5 |
| Chemical Bonding & Molecular Structure | `/guides/molecular-geometry-vsepr-guide` | 16 | 5 | 9,138,150 | 1 |
| Chemical Reactions & Balancing Equations | `/guides/types-of-chemical-reactions-guide` | 18 | 7 | 6,394,460 | 7 |
| Atomic Structure & Electron Configuration | `/guides/atomic-structure-guide` | 14 | 6 | 5,622,550 | 4 |
| Formulas, Naming & Compounds | `/guides/what-is-a-compound-chemistry` | 19 | 6 | 4,712,110 | 2 |
| Study Skills & Cheat Sheets | `/cheat-sheets` | 19 | 8 | 4,591,770 | 1 |
| Stoichiometry, Moles & Molar Mass | `/guides/chemistry-conversions-practice` | 15 | 9 | 4,040,750 | 2 |
| States of Matter & Physical/Chemical Change | `/guides/chemical-vs-physical-changes-guide` | 6 | 3 | 2,788,570 | 2 |
| Teachers & Classroom | `/guides/periodic-table-worksheet` | 5 | 4 | 1,430,840 | 1 |
| Acids, Bases & pH | `/guides/acids-and-bases-basics` | 9 | 5 | 1,353,060 | 1 |
| Organic Chemistry | `/guides/organic-chemistry-guide` | 9 | 6 | 1,118,260 | 0 |
| Chemistry Games Hub | `/games` | 14 | 8 | 114,200 | 1 |
| **Total** | | **166** | **81** | **86,586,360** | **27** |

> Periodic Table & Elements carries 45.3M of the 86.6M, but 15.8M of that is the unwinnable `periodic table` head parked in `/tools/interactive-periodic-table` (Later/Skip) and 7.2M sits in the `/elements/[element]` template. The hand-built pages in that pillar are worth ~22M.

---

## 5. P1 build list

27 pages, in build order.

| # | Page | Slug | Type | Primary keyword | Primary vol | Page vol | Format | AIO | On site | Beat | Score |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Acids and Bases Quiz - Free Chemistry Quiz Game | `/games/acids-and-bases-quiz` | game | which one of the following is a weak acid | 90,500 | 143,640 | tool | low | yes | chemquiz.net | proprofs.com | teachchemistry.org | 81.6 |
| 2 | Writing Chemical Formulas Practice - Free Game | `/games/chemical-formulas-practice` | game | provide the formula for each compound | 165,000 | 413,140 | tool | low | partial | proprofs.com | chemquiz.net | scichamp.com | 81.2 |
| 3 | Physical & Chemical Changes Quiz - Free Game | `/games/physical-and-chemical-changes-quiz` | game | chemical change | 40,500 | 396,390 | tool | low | partial | wordwall.net | proprofs.com | teachchemistry.org | 81.0 |
| 4 | Chemistry Experiments for High Schoolers: Fun Ideas | `/games/chemistry-experiments-high-school` | game | chemical experiments | 301,000 | 1,231,440 | tool | low | no | teachchemistry.org | teacherspayteachers.com | chemistrytalk.org | 80.9 |
| 5 | Covalent vs Ionic Bonds Quiz - Bonding Practice Game | `/games/covalent-ionic-bonds-game` | game | covalent bond vs ionic | 33,100 | 1,083,890 | tool | low | no | chemistrytalk.org | interactivechemistry.org | 80.3 |
| 6 | Atomic Structure & Mass - Build an Atom Game | `/games/build-an-atom-game` | game | mass of an atom | 33,100 | 820,710 | tool | low | no | teachchemistry.org | scichamp.com | interactivechemistry.org | 79.1 |
| 7 | Interactive Periodic Table - Explore Elements | `/games/interactive-periodic-table` | game | periodic table interactive | 110,000 | 633,250 | tool | low | no | funbrain.com | jetpunk.com | interactivechemistry.org | 78.0 |
| 8 | Atom Basics: Parts, Definitions & Structure Game | `/games/atom-structure-parts-game` | game | atom definition | 49,500 | 1,119,250 | tool | low | no | teacherspayteachers.com | breslyn.org | labxchange.org | 76.5 |
| 9 | Label the Periodic Table Game - Groups & Elements | `/games/label-periodic-table` | game | label periodic table element | 33,100 | 378,710 | tool | low | no | jetpunk.com | funbrain.com | chemistrytalk.org | 75.8 |
| 10 | Balancing Chemical Equations Game - Free Practice | `/games/balancing-chemical-equations-game` | game | chemistry balancing chemical equations | 49,500 | 281,200 | mixed | high | yes | simpop.org | scichamp.com | proprofs.com | 75.5 |
| 11 | Types of Chemical Reactions Game - Virtual Lab | `/games/reaction-types-game` | game | match the reaction with its correct definition | 60,500 | 97,630 | tool | low | partial | teachchemistry.org | interactivechemistry.org | proprofs.com | 74.9 |
| 12 | Chemical Equation Balancer - Balance Reactions Online | `/tools/chemical-equation-balancer` | game | balancing chemical equations balancer | 49,500 | 296,170 | tool | low | no | chemquiz.net | simpop.org | chemicalaid.com | 74.7 |
| 13 | Stoichiometry Practice (Mole-to-Mole & Mass-to-Mass) | `/games/stoichiometry-practice` | game | stoichiometry | 74,000 | 274,750 | article | low | no | chemquiz.net | teachchemistry.org | proprofs.com | 74.4 |
| 14 | Electron Configuration Practice Game | `/games/electron-configuration-orbital-practice` | game | atom configuration | 90,500 | 555,390 | tool | low | no | teachchemistry.org | breslyn.org | coolperiodictable.com | 73.5 |
| 15 | Molar Mass Calculator & Molecular Weight Finder | `/tools/molecular-weight-calculator` | game | molecular weight calculator | 74,000 | 544,960 | tool | low | no | chemquiz.net | chemicalaid.com | 73.4 |
| 16 | Protons Neutrons Electrons Calculator Game | `/games/calculate-protons-neutrons-electrons` | game | how to determine electrons | 12,100 | 169,620 | tool | low | no | breslyn.org | chemquiz.net | teachchemistry.org | 72.3 |
| 17 | Solubility Rules Game - Learn What Dissolves | `/games/solubility-rules-game` | game | solubility | 49,500 | 390,630 | tool | low | no | chemistrytalk.org | teachchemistry.org | labxchange.org | 71.9 |
| 18 | Chemical Reactions Quiz - Free Online Game | `/games/chemical-reactions-quiz` | game | chemistry reactions quiz | 140 | 14,110 | tool | low | yes | proprofs.com | interactivechemistry.org | breslyn.org | 71.5 |
| 19 | States of Matter Game - Free Online Chemistry Game | `/games/states-of-matter-game` | game | state of matter | 40,500 | 340,610 | tool | low | no | scigames.org | sciencetrek.org | 71.3 |
| 20 | Diatomic Elements & Molecules Quiz | `/games/diatomic-elements-molecules-quiz` | game | diatomic atom | 22,200 | 111,880 | tool | low | no | chemistrytalk.org | 70.5 |
| 21 | How to Balance Chemical Equations - Step-by-Step Guide | `/guides/how-to-balance-chemical-equations` | guide | balancing equations chemistry | 49,500 | 690,570 | mixed | high | yes | chemicalaid.com | labxchange.org | simpop.org | 67.4 |
| 22 | Metals, Nonmetals & Metalloids on the Periodic Table | `/guides/metals-nonmetals-metalloids-guide` | pillar_hub | non metals of periodic table | 33,100 | 5,873,850 | article | high | no | coolperiodictable.com | chemistrytalk.org | labxchange.org | 66.7 |
| 23 | Periodic Table Groups & Families Explained | `/guides/periodic-table-groups` | guide | group a elements on the periodic table | 49,500 | 3,463,640 | article | high | no | coolperiodictable.com | chemistrytalk.org | 64.4 |
| 24 | Periodic Table: Protons, Neutrons & Atomic Mass | `/guides/periodic-table-protons-neutrons-guide` | guide | periodic | 49,500 | 3,458,650 | article | high | no | breslyn.org | chemistrytalk.org | periodictable.one | 64.4 |
| 25 | Balancing Chemical Equations Practice Problems | `/guides/balancing-chemical-equations-practice` | guide | chemistry equations | 22,200 | 339,230 | article | high | yes | chemquiz.net | simpop.org | teacherspayteachers.com | 64.3 |
| 26 | Chemistry Games - Free Online Interactive Mini-Games | `/games` | pillar_hub | — | 0 | 0 | tool | low | yes | — | 0.0 |
| 27 | Chemistry Cheat Sheets - Quick Reference Guides | `/cheat-sheets` | pillar_hub | — | 0 | 0 | article | low | yes | — | 0.0 |

---

## 6. Programmatic families

One template page per family, one generated URL per entity. This is the structural gap stage 3 identified: periodictable.one holds 8,802 ranked keywords off one topic, chemicalaid.com 15,992 off calculators.

| Family | Title pattern | Slug pattern | Entities | Keywords | US volume | Data source |
|---|---|---|---|---|---|---|
| `element_page` | {Element} - Symbol, Atomic Number, Mass & Facts | `/elements/[element]` | 88 | 833 | 7,209,900 | Site's own compound library + a public element dataset (symbol, Z, mass, group, config) |
| `electron_configuration` | Electron Configuration of {Element} - Full & Noble Gas Notation | `/guides/electron-configuration/[element]` | 38 | 232 | 745,540 | Derive from atomic number; no external data needed |
| `molar_mass` | Molar Mass of {Compound} - Molecular Weight Calculator | `/tools/molar-mass/[compound]` | 52 | 151 | 885,000 | Site's own ~35-compound library (already carries molarMass) + formula parser |
| `lewis_structure` | {Compound} Lewis Structure - How to Draw It | `/guides/lewis-structure/[compound]` | 12 | 31 | 178,680 | Site's own molecular-geometry bundle data (atoms/bonds/order for H2, O2, N2, Cl2, H2O, HCl, CO2, CH4, NH3, O3, SO2, H2O2) |
| `polyatomic_ions` | {Ion} Ion - Formula, Charge & Naming | `/guides/polyatomic-ions/[ion]` | 9 | 19 | 28,340 | Standard polyatomic ion table; site's Writing Chemical Formulas cheat sheet already lists several |
| `chemical_formula_for` | Chemical Formula for {Compound} | `/guides/chemical-formula/[compound]` | 6 | 11 | 78,500 | Site's own compound library (35 named compounds with formulas) |
| `oxidation_number` | Oxidation Number of {Element} - Common States | `/guides/oxidation-number/[element]` | 15 | 35 | 23,370 | Derive from group/periodic position |
| `named_reaction` | {Reaction} - Balanced Equation & Explanation | `/reactions/[reaction]` | 30 | 15 | 26,000 | Site's OWN 34-reaction Reaction Balancer library (currently trapped in a JS bundle) |
| **Total** | | | **250** | **1327** | **9,175,330** | |

Top-15 entities per family (with the best keyword and generated slug for each) are in `04_programmatic_templates.csv`.

**Build order:** `element_page` first (7.2M volume, 88 entities, only 2 competitors deep, and it feeds the periodic-table games directly), then `molar_mass` (the site already stores `molarMass` for all 35 library compounds), then `electron_configuration` (derivable from atomic number — zero data sourcing). `named_reaction` has thin keyword data here (15 kws) but 30 ready-made entities sitting in the site's own Reaction Balancer bundle — build it for the internal-link equity and the long tail the corpus under-samples.

---

## 7. Internal linking

742 edges in `04_internal_links.csv`. Rules:

| Link type | Edges | Rule |
|---|---|---|
| `hub->spoke` | 154 | Every pillar hub links down to every page in its pillar. |
| `spoke->hub` | 154 | Every page links back up to its pillar hub — the `parent_slug` column. |
| `game<->guide` | 114 | Within a sub-topic, every game/tool page cross-links with every guide page **both ways**. This is the money link: the game absorbs the tool-led SERP, the guide absorbs the article-led one, and each passes the other its intent. |
| `guide->cheatsheet` | 82 | Guides and hubs link to the cheat-sheet page in their pillar (one-way; cheat sheets are terminal reference). |
| `related` | 238 | Same-sub-topic pages not already paired, both ways. |

Programmatic pages inherit hub/spoke edges from their pillar, so all 8 templates are reachable within two hops of the homepage.

---

## 8. Fix the existing site first

No topical map ranks until these are closed. All carried from stage 1; none has been resolved.

| # | Fix | Detail |
|---|---|---|
| 1 | **Move off `*.vercel.app`** | The site sits on a preview-style domain with no custom domain. Every other fix is worth less until this is done. |
| 2 | **Repair `/games/chemical-bonds` (404)** | Linked from `/games` and named 'Bond Builder' on the leaderboard, but the route is unbuilt — the molecular-geometry data (H₂, O₂, N₂, Cl₂, H₂O, HCl, CO₂, CH₄, NH₃, O₃, SO₂, H₂O₂) is already in the JS bundle. This is a P1 game page (`/games/covalent-ionic-bonds-game`, 1,083,890 vol) sitting behind a broken route. |
| 3 | **Unique titles + meta descriptions** | 11 of 17 pages share `ChemGames \| Interactive Chemistry Learning`. The topical map's `page_title` column supplies the replacement for every page. |
| 4 | **Fix missing / placeholder H1s** | `/games/neutralise` and `/games/reaction-balancer` render no `<h1>`; `/games/formula-blaster`'s H1 is literally `Find: Loading...`. |
| 5 | **Ship sitemap.xml, robots.txt, canonicals and JSON-LD** | All four are absent. Games want `VideoGame`/`LearningResource`, cheat sheets want `LearningResource`/`FAQPage`, and the programmatic families want `BreadcrumbList`. |
| 6 | **Server-render the game pages** | Game pages ship 101–375 chars of SSR text. The 34-reaction library and 35-compound library are trapped in client bundles — that content *is* the long tail this map is built on. |
| 7 | **Resolve the AU/UK vs US locale mismatch** | Copy says 'Year 9/10', 'Neutralise', 'Aluminium'; this entire map is US-volume. Either re-voice the copy for the US or re-run volumes at `location_code` 2036. |

---

## 9. Recommended follow-up DataForSEO pulls

Nothing below was run. Costs use the stage-3-corrected rates: `ranked_keywords` ≈ $0.0126 flat + $0.00012/row; `keyword_suggestions` ≈ $0.036 per 200-row task; SERP `live/advanced` $0.002/query at depth 10; Google Ads `search_volume` ≈ $0.00014/keyword. **Balance at time of writing: $2.22** — the first three fit inside it.

| Priority | Pull | Why | Rough cost |
|---|---|---|---|
| 1 | `keyword_suggestions` × 12 seeds — `lewis structure for`, `molar mass of`, `chemical formula for`, `oxidation number of` + compound variants | The entity families are under-sampled here (31 Lewis-structure keywords vs the 219 stage 3 saw). These four templates are cheap to build and currently sized off too little data. | ~$0.43 |
| 2 | `ranked_keywords` on `periodictable.one` + `coolperiodictable.com`, ~2,000 rows, filtered to per-element patterns | Fills out `/elements/[element]` beyond 88 entities toward the full 118, and prices attributes the corpus missed (melting point, density, uses). | ~$0.27 |
| 3 | SERP `live/advanced` on the 27 P1 primary keywords | Replaces inferred `winning_format` / `ai_overview_risk` with measured values before committing build effort. Currently only 10% of pages carry a measured SERP signal. | ~$0.05 |
| 4 | Google Ads `search_volume` at `location_code` 2036 for the 8,354 stage-3-only keywords | The AU column is empty for 72% of the master set, so the AU figures in this map are a floor, not a total. Only worth it if AU is confirmed as the real market. | ~$1.19 |
| 5 | `keyword_suggestions` on the 30 named reactions from the Reaction Balancer library | `named_reaction` has 30 ready entities but only 15 keywords and one distinct entity in the corpus. | ~$0.20 |
| 6 | `ranked_keywords` on `chemquiz.net` + `interactivechemistry.org` restricted to game-intent patterns | The two closest functional twins. Would sharpen the game-vertical long tail, which is where the whole strategy lives. | ~$0.25 |

**Total if all six were run: ≈$2.39.**

---

## 10. Files produced

| File | Contents |
|---|---|
| `04_master_keywords.csv` | 11,532 merged keywords — volumes, CPC, classification, source flag, competitor counts, programmatic family/entity, head flag, and final pillar / sub-topic / page assignment |
| `04_topical_map.csv` | **Main deliverable** — 166 pages, one row each, 23 columns |
| `04_topical_map.json` | Nested pillar → sub-topic → pages tree, plus the 742-edge `links` list and the `programmatic_families` array |
| `04_programmatic_templates.csv` | 8 family rows + top-15 entity rows each (110 rows) with generated slugs |
| `04_internal_links.csv` | 742 edges — from_slug, to_slug, link_type |
| `04_topical_map_summary.md` | This document |

Intermediates (`_s4_*.json`, `_s4_*.py`) are retained for reproducibility and can be deleted.
