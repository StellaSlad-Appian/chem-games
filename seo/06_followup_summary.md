# Stage 6 — Follow-up DataForSEO Pulls

Runs the three pulls recommended in `04_topical_map_summary.md` §9 and folds the results back into the stage-4 map.

## 1. Spend

The first attempt at this stage died mid-run **after** all three pulls had completed and checkpointed. Every raw response was recovered from `seo/raw/_s6_*.json`, so **this run spent $0.00 on DataForSEO**.

| | Balance |
|---|---|
| Before stage 6 (per §9) | $2.22 |
| After the failed run's pulls | $1.5282 |
| After this run | $1.5282 |


| Pull | Endpoint | Calls | Cost | Status |
|---|---|---|---|---|
| 1. Entity expansion | `dataforseo_labs/keyword_suggestions/live` | 6 | $0.35748 | recovered from checkpoint |
| 2. Periodic microsites | `dataforseo_labs/ranked_keywords/live` | 2 | $0.26400 | recovered from checkpoint |
| 3. P1 SERP checks | `serp/google/organic/live/advanced` (depth 10) | 25 | $0.05000 | recovered from checkpoint |
| **Total** | | **33** | **$0.67148** | **under the $1.00 cap** |

DeepSeek (`deepseek-v4-flash`, reasoning disabled) resolved the entity residue the regex parser could not: **in 6,018 / out 11,256 tokens ≈ $0.018** at peak rates. 278 residues, 100% coverage, 0 retries.


## 2. Pull 1 — Entity expansion

6 `keyword_suggestions` tasks (US, `search_volume >= 50`), 2,379 unique keywords. Entities were extracted with a lowercase formula tokenizer plus an element/compound/ion dictionary (**1,839 rows, 92%**); the 278 residues it could not parse went to DeepSeek, which recovered 149 real entities and rejected 129 junk fragments (`definition`, `example`, `photosynthesis`, `vinegar baking soda`).

| Family | Entities before | After | New | Keywords | US volume | Slug pattern |
|---|---|---|---|---|---|---|
| `lewis_structure` | 12 | 108 | **+96** | 763 | 1,255,100 | `/guides/lewis-structure/[compound]` |
| `molar_mass` | 52 | 108 | **+56** | 430 | 535,000 | `/tools/molar-mass/[compound]` |
| `chemical_formula_for` | 6 | 116 | **+110** | 393 | 537,900 | `/guides/chemical-formula/[compound]` |
| `oxidation_number` | 15 | 79 | **+64** | 319 | 80,900 | `/guides/oxidation-number/[element]` |
| `polyatomic_ions` | 9 | 46 | **+37** | 97 | 8,360 | `/guides/polyatomic-ions/[ion]` |
| **Total** | **94** | **457** | **+363** | **2002** | **2,417,260** | |

**1,775 of 2,002 keywords (88%) are new against the 11,532-row master set** — these four templates really were under-sampled, exactly as §9 predicted.

Highest-volume new entities per family:

- **lewis_structure** — `co2` (60,500), `so2` (40,500), `s` (40,500), `hcn` (33,100), `h2o` (33,100), `no2` (33,100)
- **molar_mass** — `co2` (33,100), `naoh` (22,200), `nacl` (18,100), `nh3` (14,800), `c` (12,100), `o2` (12,100)
- **chemical_formula_for** — `nh3` (27,100), `nh4` (27,100), `c6h12o6` (27,100), `ch3cooh` (18,100), `ch4` (14,800), `c2h5oh` (14,800)
- **oxidation_number** — `s` (27,100), `o2` (4,400), `o` (4,400), `c` (2,400), `cl2` (2,400), `cl` (2,400)
- **polyatomic_ions** — `srco3` (1,300), `so4` (590), `co3` (480), `cn` (480), `oh` (390), `po4` (390)

## 3. Pull 2 — Periodic-table microsite competitors

| Domain | Ranked keywords (total) | Pulled | Pos 1 | Pos 2-3 | ETV |
|---|---|---|---|---|---|
| periodictable.one | 20,837 | 1,000 | 743 | 436 | 329,368 |
| coolperiodictable.com | 7,833 | 1,000 | 61 | 57 | 99,884 |

| Domain | Page pattern | Keywords | US volume | in top 10 |
|---|---|---|---|---|
| periodictable.one | per-element | 962 | 14,865,700 | 40 |
| periodictable.one | other | 19 | 1,043,100 | 0 |
| periodictable.one | trend | 14 | 204,200 | 0 |
| periodictable.one | game | 5 | 550,000 | 0 |
| coolperiodictable.com | per-element | 628 | 7,476,200 | 7 |
| coolperiodictable.com | trend | 257 | 4,377,200 | 3 |
| coolperiodictable.com | other | 109 | 1,362,000 | 21 |
| coolperiodictable.com | quiz | 4 | 26,400 | 0 |
| coolperiodictable.com | game | 2 | 220,000 | 0 |

**Findings**

1. **A pure per-element play works.** `periodictable.one` ranks for **20,837** keywords with **743 at position 1**, and 954 of the 1,000 rows pulled sit on a single `/element/*` template. One template, one URL per element, 329k ETV. This validates `element_page` as the correct first build.
2. **`coolperiodictable.com` proves a second axis the map under-weights.** Only 63% of its footprint is per-element; **257 keywords / 4.38M volume are periodic *trend* pages** — groups, periods, noble gases, metals vs nonmetals, inner transition metals — on `/resources/*` URLs. It ranks these at #12-#53, i.e. weakly: the volume is real and the incumbent is beatable.
3. **Attributes worth templating.** Across per-element rows the modifiers carrying volume are `atomic number` (1.83M), `symbol` (1.27M), `chemical symbol` (999k) and `electron configuration` (216k) — the exact fields `/elements/[element]` already plans to carry.
4. **Element coverage.** The two top-1,000 samples name **91 of 118 elements**; 29 (mostly synthetics and lanthanides — californium, dubnium, meitnerium, nihonium) draw no ≥50-volume keywords, so building all 118 is cosmetic beyond ~90.
5. **Neither microsite defends games.** `periodictable.one` has 5 game keywords, `coolperiodictable.com` 2 (and 4 quiz). The interactive angle on periodic-table queries is essentially unguarded by the topic incumbents.


## 4. Pull 3 — P1 SERP checks (the important one)

25 of the 27 P1 pages carry a primary keyword; both hubs (`/games`, `/cheat-sheets`) were skipped. Depth 10, US desktop.

| Signal | Measured |
|---|---|
| AI Overview present | **22/25** |
| Featured snippet | 0/25 |
| Video block | 14/25 |
| People Also Ask | 23/25 |
| **winning_format changed** | **17/25** |
| **ai_overview_risk changed** | **16/25** |

| Format | Inferred (stage 4) | Measured (stage 6) |
|---|---|---|
| tool | 18 | 4 |
| article | 5 | 17 |
| quiz-platform | 0 | 2 |
| mixed | 2 | 2 |

### The headline

Stage 4 inferred `tool` for 18 of 25 P1 pages and `ai_overview_risk = low` for 20. Measured, **only 4 SERPs are genuinely tool-led, 17 are article-led, and 22 of 25 carry an AI Overview.** The map's format and AIO columns were wrong on roughly two-thirds of the P1 build list.

**Root cause, and it is fixable.** The pages were assigned *head* primary keywords — `solubility`, `periodic`, `stoichiometry`, `chemical change`, `atom definition` — which are definitional queries Google answers with a reference article plus an AI Overview. The evidence is clean:

- 16 of 17 article-led SERPs have a primary keyword with **no** interactive modifier.
- 3 of the 4 keywords that *do* carry one (`periodic table interactive`, `balancing chemical equations balancer`, `molecular weight calculator`) return **tool-led** SERPs with 4-5 tools in the top 5.

So the game pages are not wrong — **their primary keywords are.** A game page pointed at `solubility` is competing with Wikipedia, LibreTexts and an AI Overview; pointed at `solubility rules game` it competes with almost nothing. Re-assign the primary keyword to the interactive-modifier variant and keep the head term as a supporting keyword.

### Pages whose priority should change

| Page | Primary keyword | Inferred | Measured | AIO | Tools in top 5 | Implication |
|---|---|---|---|---|---|---|
| `/games/chemistry-experiments-high-school` | chemical experiments | tool | **article** | yes | 1 | **Demote or re-target** — head term is AIO-owned reference intent |
| `/games/chemical-formulas-practice` | provide the formula for each compound | tool | **article** | yes | 0 | **Demote or re-target** — head term is AIO-owned reference intent |
| `/games/electron-configuration-orbital-practice` | atom configuration | tool | **article** | yes | 0 | **Demote or re-target** — head term is AIO-owned reference intent |
| `/games/atom-structure-parts-game` | atom definition | tool | **article** | yes | 0 | **Demote or re-target** — head term is AIO-owned reference intent |
| `/games/solubility-rules-game` | solubility | tool | **article** | yes | 0 | **Demote or re-target** — head term is AIO-owned reference intent |
| `/games/physical-and-chemical-changes-quiz` | chemical change | tool | **article** | yes | 0 | **Demote or re-target** — head term is AIO-owned reference intent |
| `/games/states-of-matter-game` | state of matter | tool | **article** | yes | 0 | **Demote or re-target** — head term is AIO-owned reference intent |
| `/games/covalent-ionic-bonds-game` | covalent bond vs ionic | tool | **article** | yes | 0 | **Demote or re-target** — head term is AIO-owned reference intent |
| `/games/build-an-atom-game` | mass of an atom | tool | **article** | yes | 1 | **Demote or re-target** — head term is AIO-owned reference intent |
| `/games/diatomic-elements-molecules-quiz` | diatomic atom | tool | **article** | yes | 0 | **Demote or re-target** — head term is AIO-owned reference intent |
| `/games/calculate-protons-neutrons-electrons` | how to determine electrons | tool | **article** | yes | 0 | **Demote or re-target** — head term is AIO-owned reference intent |

11 pages sit in that bucket. They keep their volume but lose their format thesis: as built they would publish a game against an article SERP with an AI Overview on top.

**Pages that got *better* than inferred:**

- `/guides/periodic-table-protons-neutrons-guide` (periodic) — inferred `article`, measured **tool** with 4/5 tools (ptable.com | pubchem.ncbi.nlm.nih.gov | periodic-table.rsc.org). **Promote:** an interactive page is the correct format and the incumbents are generic periodic-table utilities.

**The 2 clean SERPs — no AI Overview at all:** `/games/label-periodic-table`, `/tools/chemical-equation-balancer`. These are the safest builds on the list.

**Zero featured snippets across all 25 SERPs.** On this corpus the AI Overview has fully displaced the snippet, so snippet-targeting formatting is wasted effort — target the AI Overview's citation slot instead.


## 5. New page recommendations

1. **Re-point the 17 article-led P1 game pages at their interactive-modifier keyword** before building any of them. This is the single highest-value change in this stage and it costs nothing but a column edit.
2. **Build `/guides/periodic-table-groups` and the trends cluster properly.** `coolperiodictable.com` holds 4.38M volume of group/period/noble-gas/metal-vs-nonmetal keywords at rank #12-#53. Two P1 guides (`/guides/periodic-table-groups`, `/guides/metals-nonmetals-metalloids-guide`) already target this and both measured `article` + AIO — correct format, weak incumbent, worth the effort.
3. **Ship `element_page` first, ~90 entities not 118.** Validated by periodictable.one's 20,837 keywords off one template; the last 29 elements have no ≥50-volume demand.
4. **`chemical_formula_for` is far bigger than the map thought** — 6 entities became 116 (+110) on 537,900 US volume. It was ranked last of the four cheap templates; it should be built alongside `molar_mass`.
5. **`polyatomic_ions` stays small.** 46 entities but only 8,360 US volume — the demand is for the *list/chart* (`polyatomic ion list` 18,100, `polyatomic ion chart` 4,400), not per-ion pages. Build one strong table page, not 46 thin ones.
6. **Take the unguarded interactive angle on periodic-table queries** — neither microsite ranks for games, and `periodic table interactive` measured a 5/5 tool SERP.


## 6. Files

| File | Contents |
|---|---|
| `06_entity_expansion.csv` | 2,002 rows — family, entity, keyword, US volume, CPC, new-vs-master, suggested slug |
| `06_periodic_microsite_keywords.csv` | 2,000 rows — domain, keyword, volume, rank, ranking URL, page pattern |
| `06_p1_serp_checks.csv` | 25 rows — measured format, AIO / snippet / video / PAA flags, top-3 domains, tool count |
| `04_topical_map.csv` | **updated** — 25 P1 rows: measured `winning_format`, `ai_overview_risk`, `competitors_to_beat`, notes tagged `[measured stage6]` |
| `04_programmatic_templates.csv` | **updated** — 443 entity rows appended (`source=stage6`), new `source` column, refreshed `entity_count` |
| `04_topical_map.json` | **updated** — `programmatic_families` carry stage-6 entity lists, counts and volumes |
| `raw/04_*.pre-stage6.*` | pre-stage-6 backups of all three |
| `raw/_s6_*.json` | raw API responses + intermediate checkpoints |
