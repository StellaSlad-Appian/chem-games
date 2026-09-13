# Stage 3 — Competitor Research: ChemGames

**Site:** https://chem-games-seven.vercel.app/
**Market:** US (`location_code` 2840), `language_code` en
**Run date:** 2026-08-26
**Inputs:** stage-2 30 head keywords + 116 page clusters + 4,840-keyword corpus

---

## 1. Method

| Step | Endpoint | Detail |
|---|---|---|
| 1. SERP discovery | `serp/google/organic/live/advanced` | 48 queries, depth 10, desktop. The 30 stage-2 head keywords **plus 18 supplementary probes**. 48/48 succeeded, 434 organic rows captured. |
| 2. Competitor scoring | local aggregation | 120 unique domains scored on keyword count, **query-group count** (near-duplicate head keywords collapsed), weighted position (Σ 11−rank), best rank, and stage-2 volume captured |
| 3. Competitor keyword pull | `dataforseo_labs/google/ranked_keywords/live` | 26 domains × 34 jobs, US, `rank_absolute <= 30`, `search_volume >= 20`, ordered by volume desc. 21,425 rows / 16,199 unique keywords |
| 4. Chemistry pre-filter | local regex | 16,439 rows → **11,436 unique** chemistry-token keywords, deduped keeping the best-ranking competitor and counting distinct competitors per keyword |
| 5. Classification | DeepSeek `deepseek-v4-flash` via pydantic-ai (reasoning disabled) | 11,436 keywords, 60/chunk, `Semaphore(8)`, coverage-checked — **11,436/11,436, zero missing, zero retries needed** |

**Why 18 supplementary probes were added.** Stage 2's 30 head keywords contain seven literal restatements of *how to balance a chemical equation* and ten of *periodic table quiz* — they return near-identical SERPs. Left alone they would have inflated a handful of domains 10× and left the entire games/tools vertical unprobed. The supplementary set (`chemistry games`, `chemistry quiz`, `periodic table game`, `ph scale game`, `chemistry flashcards`, `stoichiometry practice`, etc.) is what actually surfaced the direct competitor set. Scoring uses collapsed query groups so the duplicates do not distort ranking.

### Spend

| Item | Cost |
|---|---|
| SERP `live/advanced` × 48 @ depth 10 | $0.0960 |
| Labs `ranked_keywords` probe × 2 | $0.0252 |
| Labs `ranked_keywords` × 34 jobs (26 domains) | $2.9790 |
| **DataForSEO total** | **$3.1002** |
| DeepSeek v4-flash (726,729 in / 534,278 out) | ~$1.0250 peak · ~$0.5125 off-peak |

> **⚠️ Budget overrun — $3.10 against a $2.50 target (+$0.60, 24% over).** The cause is a bad per-row cost estimate on `ranked_keywords`. The documented reference point (~$0.016 for 150 rows) implies ~$0.000024/row; the endpoint actually bills **~$0.00012/row**, five times higher, so a 1,000-row pull costs $0.132 rather than the $0.037 I budgeted. All 34 jobs were dispatched in one batch, so the true rate was only visible after the spend. On discovering it I stopped immediately and **cancelled the optional `competitors_domain` cross-check**, which was the only remaining planned DataForSEO call. **Balance: $5.32 → $2.22.** For stage 4, budget `ranked_keywords` at $0.0126 flat + $0.00012/row.

---

## 2. The format answer (stage 2's open question)

Stage 2 asked: *on `...game` / `...quiz` queries, do interactive tools rank, or do articles about games rank?*

**Interactive tools rank — decisively, and it is not close.** Across the 23 game-intent SERPs, the top-5 is dominated by a playable tool or quiz in **22 of 23** cases; the single exception is a video-led SERP. Not one game-intent SERP is led by an article *about* chemistry games. Meanwhile the 25 guide-intent SERPs split the other way: **16 article/guide-led, 7 video-led (YouTube), 2 tool-led**. The two verticals are cleanly separated by format, and ChemGames' actual product — playable browser mini-games — is the correct answer to the game vertical rather than a proxy for it.

Two qualifiers. First, **AI Overviews appear on 28 of 48 SERPs, but the split is lopsided: 19 of 25 guide queries (76%) versus 9 of 23 game queries (39%)** — every `how to balance a chemical equation` variant carries one. A thin cheat sheet competing on definitional guide intent will be answered above the fold before a user ever clicks; a playable game cannot be. This materially strengthens the case for leading with games and treating cheat sheets as support. Second, the winning tool pages are usually **single-purpose**: funbrain.com takes #1 for `periodic table game` on the strength of one game (Proton Don), and interactivechemistry.org takes #1 across four separate `chemistry games` queries. One strong game page beats a games directory.

### Per-keyword format table — 30 head keywords

| Keyword | US vol | Top result | Top-5 format mix | AI Overview |
|---|---|---|---|---|
| periodic table | 4,090,000 | ptable.com — interactive tool | article×4, tool×1 | no |
| chemistry formulas | 110,000 | youtube.com — video | article×3, video×1, download×1 | yes |
| chemical equation balancer | 40,500 | pearson.com — interactive tool | tool×3, app-store×1, video×1 | no |
| how to do chemical equations balance | 22,200 | youtube.com — video | video×2, tool×1, forum×1, article×1 | yes |
| chemistry how to balance chemical equations | 22,200 | youtube.com — video | video×2, tool×1, forum×1, article×1 | yes |
| how to balance chemical equations | 22,200 | youtube.com — video | video×2, article×2, tool×1 | yes |
| how to balance chemical equations in chemistry | 22,200 | youtube.com — video | video×2, forum×1, tool×1, article×1 | yes |
| how to balance a chemical equations | 22,200 | youtube.com — video | video×2, article×2, tool×1 | yes |
| how to balance the chemical equations | 22,200 | youtube.com — video | video×2, article×2, tool×1 | yes |
| how to balance a chemical equation | 22,200 | youtube.com — video | video×2, forum×1, tool×1, article×1 | yes |
| different types of chemical reactions | 18,100 | youtube.com — video | article×4, video×1 | yes |
| chemical types of reactions | 18,100 | chem.libretexts.org — article | article×5 | yes |
| types of chemical reactions | 18,100 | en.wikipedia.org — article | article×5 | yes |
| ap chemistry formula sheet | 18,100 | apcentral.collegeboard.org — article | article×2, video×1, download×1, forum×1 | yes |
| polyatomic ions list | 18,100 | gchem.cm.utexas.edu — article | article×3, video×1, tool×1 | yes |
| what is chemistry | 18,100 | britannica.com — article | article×5 | yes |
| balancing equations | 12,100 | youtube.com — video | video×2, article×2, tool×1 | yes |
| periodic table pdf | 9,900 | acs.org — article | article×4, tool×1 | yes |
| what are the polyatomic ions | 9,900 | gchem.cm.utexas.edu — article | article×3, tool×1, video×1 | yes |
| ap chemistry periodic table | 8,100 | apcentral.collegeboard.org — article | article×3, forum×1, video×1 | yes |
| quiz about the periodic table | 6,600 | sporcle.com — interactive tool | tool×4, app-store×1 | yes |
| elements periodic table quiz | 6,600 | sporcle.com — interactive tool | tool×4, app-store×1 | no |
| periodic table of the elements quiz | 6,600 | sporcle.com — interactive tool | tool×4, app-store×1 | no |
| quiz periodic table of elements | 6,600 | sporcle.com — interactive tool | tool×4, app-store×1 | yes |
| periodic table element quiz | 6,600 | sporcle.com — interactive tool | tool×4, app-store×1 | no |
| quiz periodic table | 6,600 | sporcle.com — interactive tool | tool×4, app-store×1 | yes |
| quiz the periodic table | 6,600 | sporcle.com — interactive tool | tool×4, app-store×1 | no |
| quiz on the periodic table of elements | 6,600 | sporcle.com — interactive tool | tool×4, app-store×1 | yes |
| periodic table quiz | 6,600 | sporcle.com — interactive tool | tool×4, app-store×1 | yes |
| periodic table elements quiz | 6,600 | sporcle.com — interactive tool | tool×4, app-store×1 | no |

### Per-keyword format table — 18 supplementary probes

| Keyword | US vol | Top result | Top-5 format mix | AI Overview |
|---|---|---|---|---|
| chemistry games | 6,600 | interactivechemistry.org — tool | tool×3, forum×1, marketplace×1 | no |
| periodic table game | 5,400 | funbrain.com — tool | tool×4, app-store×1 | no |
| chemistry quiz | 3,600 | chemquiz.net — tool | tool×4, article×1 | no |
| chemistry worksheets | 2,900 | chemistrylearner.com — article | article×5 | no |
| chemistry practice problems | 2,400 | chemquiz.net — tool | tool×3, article×1, video×1 | no |
| lewis structure practice | 2,400 | chem.purdue.edu — article | article×3, tool×1, video×1 | yes |
| balancing chemical equations game | 1,900 | phet.colorado.edu — tool | tool×4, forum×1 | no |
| stoichiometry practice | 1,900 | chemquiz.net — tool | article×3, tool×2 | no |
| naming compounds practice | 1,600 | chemquiz.net — tool | tool×2, article×2, video×1 | yes |
| chemistry flashcards | 1,600 | quizlet.com — tool | tool×4, marketplace×1 | no |
| chemistry games for high school | 1,300 | interactivechemistry.org — tool | tool×3, marketplace×1, forum×1 | no |
| chemistry cheat sheet | 1,300 | scribd.com — marketplace | article×3, marketplace×1, tool×1 | no |
| element symbols quiz | 720 | sporcle.com — tool | tool×4, video×1 | yes |
| acids and bases practice | 590 | khanacademy.org — article | article×3, tool×2 | no |
| online chemistry games | 480 | interactivechemistry.org — tool | tool×4, forum×1 | yes |
| states of matter game | 390 | phet.colorado.edu — tool | tool×4, video×1 | no |
| free chemistry games | 320 | interactivechemistry.org — tool | tool×4, forum×1 | no |
| ph scale game | 210 | phet.colorado.edu — tool | tool×4, video×1 | yes |

---

## 3. The competitive set

120 domains appeared across the 48 SERPs. Classified: **15 direct**, **10 quiz-platform**, **20 edu-platform**, **75 reference**. Keywords were pulled for 26 of them.

### Top 12 direct competitors

| # | Domain | Groups | Best rank | Avg rank | Kws pulled | What it is / what wins |
|---|---|---|---|---|---|---|
| 1 | **interactivechemistry.org** | 5 | 1 | 2.8 | 276 | #1 on *every* `chemistry games` variant (games / for high school / online / free). Playable browser chemistry games, 91% game-intent keywords. The head-on rival. |
| 2 | **chemquiz.net** | 8 | 1 | 2.8 | 742 | #1 `chemistry quiz`, top-5 on practice/naming/stoichiometry. A pure quiz engine, 3.9k ranked keywords. Closest functional twin to ChemGames. |
| 3 | **phet.colorado.edu** | 5 | 1 | 1.6 | 319 | #1 on every simulation query (balancing equations, pH scale, states of matter). `.edu` authority + brand demand (110k/mo for `phet`). Hard to outrank head-on, weak on long tail. |
| 4 | **scichamp.com** | 6 | 2 | 3.3 | 205 | Free chemistry games for middle/high school — exact format and audience match, ranks 2-4 across the games cluster. The most beatable direct rival. |
| 5 | **sporcle.com** | 4 | 1 | **1.4** | 609 | Quiz giant. Best average rank in the entire dataset. #1 `periodic table quiz`, #1 `element symbols quiz`. Owns the timed-recall quiz format. |
| 6 | **periodictable.one** | 2 | 4 | 7.0 | 925 | Single-topic periodic-table microsite, 8.8k ranked keywords. Proves a one-topic site can win a huge long tail (per-element pages). |
| 7 | **chemicalaid.com** | 1 | 6 | 6.0 | 773 | Equation balancer + molar-mass calculators, 16k ranked keywords. The utility-tool playbook; owns molar mass and Lewis structure long tail. |
| 8 | **funbrain.com** | 2 | 1 | 7.5 | 245 | #1 `periodic table game` off a single game (Proton Don). Proof that one strong game page beats a directory. |
| 9 | **coolperiodictable.com** | 1 | 5 | 5.0 | 877 | Periodic-table games/tools microsite, strong on element + acid/base lookups. |
| 10 | **sciencetrek.org** | 5 | 2 | 4.8 | — | Broad science game hub (Idaho PTV). Ranks on chemistry games and states of matter on domain authority, not depth. |
| 11 | **simpop.org** | 1 | 3 | 3.0 | 147 | Chemistry simulators; #3 `balancing chemical equations game`. |
| 12 | **scigames.org** | 1 | 3 | 3.0 | 33 | Science mini-games (Matter Sorter); #3 `states of matter game`. |

### Quiz / activity platforms (format rivals, not topic rivals)

| Domain | Kws pulled | Note |
|---|---|---|
| quizlet.com | 691 | #1 `chemistry flashcards`; 48k chemistry keywords. Owns study-set + homework-answer intent. |
| proprofs.com | 513 | Quiz-maker library, 72% game-intent. |
| jetpunk.com | 418 | Trivia platform — 376 of 418 chemistry keywords are periodic table. |
| wordwall.net | 352 | Teacher-made activities, 83% game-intent. |
| geoguessr.com | 275 | Its map-quiz engine ranks **#2 for `periodic table game`** — 100% of its chemistry keywords are periodic table. A generic quiz engine beating chemistry sites on a chemistry query. |
| purposegames.com | — | User-made quizzes; ranks #2 `ph scale game`. |
| funbrain / studystack / abcya | — | Kids/teen game and flashcard sites. |

### Reference & edu giants (topical-authority context, not attack targets)

| Domain | Kws pulled | Note |
|---|---|---|
| youtube.com | — | Ranks in **53 of 434** organic slots across 17 query groups — the single most present domain. Owns every `how to balance` SERP. |
| chem.libretexts.org | 727 | Open textbook, 63k chemistry keywords. Dominates definitional intent. |
| khanacademy.org | 574 | 55k chemistry keywords; ranks broadly on guide intent. |
| chemistrytalk.org | 770 | 32k ranked keywords. **The content playbook to copy** — a small independent site out-ranking on guide intent. |
| teachchemistry.org (AACT) | 641 | Teacher resources; owns classroom-games intent. 31% game-intent keywords. |
| breslyn.org | 910 | Teacher-built how-to site. 2.4k keywords on formula/naming long tail — a one-person site competing on volume. |
| teacherspayteachers.com | 396 | Marketplace owning `free chemistry games` teacher intent. |
| labxchange.org | 475 | Harvard interactive science assets (pH Scale). |
| reddit.com | — | 11 query groups — recommendation threads for `chemistry games`. |
| pearson.com | — | **#1 for `chemical equation balancer`** (40,500/mo) with a calculator page. |
| britannica.com | — | Ranks #2-3 on quiz queries with its own quiz format. |
| ptable.com / wikipedia / pubchem | — | Own the `periodic table` head term. Confirmed unwinnable, as stage 2 predicted. |

**Stage-1 predictions checked.** PhET, Khan Academy, Quizlet, ChemLibreTexts and Ptable all confirmed. **Kahoot, Blooket, Quizizz, CK-12 and Study.com did not appear in a single SERP** — they are classroom-tool brands, not organic competitors, and should be dropped from the competitive model. PhET ranks for generic simulation queries (`balancing chemical equations game`, `ph scale game`, `states of matter game`), not merely its own brand — so it is a real organic competitor, not just a navigational one.

---

## 4. Gap analysis

**8,654 relevant keywords from 26 competitors; 8,335 (96%) are new versus stage 2.** Content-type split: 6,745 guide, 1,725 game, 184 blog. Topic split is led by periodic table (2,810), atomic structure (1,260), bonding (895), chemical formulas/naming (824).

The classifier mapped 68 of stage 2's 116 clusters and invented only **8 new ones** — stage 2's cluster taxonomy is sound. The gap is **not missing topics, it is missing depth**: competitors rank for thousands of long-tail variants inside clusters stage 2 identified but sized from a much smaller corpus.

### Top 10 new keyword gaps by volume

Volumes are DataForSEO cluster volumes, so near-identical phrasings share a figure; `variants` counts how many distinct phrasings sit at that volume. Mega-head navigational terms (`periodic table` and its restatements at 368k–4.09M, which Khan Academy only reaches at rank 15-26) are excluded as unwinnable.

| # | Canonical keyword | US vol | Variants | Competitors ranking | Type | Cluster |
|---|---|---|---|---|---|---|
| 1 | equation balancer chemistry | 49,500 | 3 | 6 | game | `/games/balancing-chemical-equations-game` |
| 2 | chemical reaction | 49,500 | 14 | 3 | guide | `/guides/types-of-chemical-reactions-guide` |
| 3 | molecular shape and geometry / bond angle | 49,500 | 5 | 6 | guide | `/guides/bonding-guide` |
| 4 | periodic table groups (group A elements) | 49,500 | 14 | 5 | guide | `/guides/periodic-table-guide` |
| 5 | balanced molecular equation | 49,500 | 4 | 3 | guide | `/guides/how-to-balance-chemical-equations` |
| 6 | solubility / solubility rules | 49,500 | 4 | 1 | guide | `/guides/chemistry-cheat-sheet` |
| 7 | chemical change / physical vs chemical change | 40,500 | 8 | 2 | **game** | `/games/physical-and-chemical-changes-quiz` ← new cluster |
| 8 | states of matter | 40,500 | 5 | 2 | **game** | `/games/states-of-matter-game` |
| 9 | lewis diagram | 40,500 | 5 | 2 | guide | `/guides/lewis-structure-practice` |
| 10 | functional groups | 40,500 | 5 | 1 | guide | `/guides/organic-chemistry-guide` |
| 11 | label the periodic table | 33,100 | 7 | 7 | **game** | `/games/periodic-table-game` |
| 12 | per-element lookups (`hg element`, `ar element`…) | 33,100 | 99 | 2 | guide | `/guides/periodic-table-guide` |

### The real finding: competitors win on programmatic page patterns

The long tail is not random — it is **template-driven page families**, one URL per entity. This is the structural gap and it is worth more than any single keyword.

| Pattern | Keywords | Total US vol | New vs stage 2 | Who owns it |
|---|---|---|---|---|
| Electron configuration of X | 483 | 2,550,510 | 483 | periodictable.one, chemicalaid.com, breslyn.org |
| **Per-element pages** (Hg, Ar, Xe, atomic mass of X) | 168 | 1,935,690 | 168 | periodictable.one, coolperiodictable.com |
| Molar mass of X | 192 | 1,024,440 | 192 | chemicalaid.com, breslyn.org, quizlet.com |
| Polyatomic ion lookups | 122 | 1,007,090 | 116 | breslyn.org, quizlet.com, labxchange.org |
| Lewis structure for X | 219 | 991,160 | 209 | chemicalaid.com, chemquiz.net, breslyn.org |
| Quiz / game / interactive | 624 | 846,980 | 416 | proprofs.com, jetpunk.com, geoguessr.com |
| Homework / test answers | 83 | 606,110 | 72 | quizlet.com, teacherspayteachers.com |
| Chemical formula for X | 37 | 437,380 | 37 | chemicalaid.com, chem.libretexts.org |
| Worksheet / printable | 136 | 316,480 | 128 | chemquiz.net, teacherspayteachers.com |
| Is X an acid or base / pH of X | 23 | 215,530 | 23 | coolperiodictable.com, quizlet.com |
| Oxidation number of X | 101 | 199,930 | 101 | coolperiodictable.com, chemicalaid.com |
| Name the compound X | 148 | 172,530 | 126 | breslyn.org, chemquiz.net |

Stage 2 captured essentially none of this because seed expansion returns *phrases*, not *entity families*. periodictable.one holds 8,802 ranked keywords off one topic; chemicalaid.com holds 15,992 off calculators; breslyn.org — a single teacher's site — holds 2,405.

### New game-intent clusters, ranked by winnable volume

Where ChemGames' actual product is the right answer (game-intent keywords ≤60k volume):

| Cluster | New kws | Vol | In stage 2? |
|---|---|---|---|
| `/games/periodic-table-game` | 455 | 713,880 | yes (rank 2) |
| `/games/balancing-chemical-equations-game` | 156 | 367,710 | yes (rank 4) |
| `/games/atomic-structure-quiz` | 136 | 341,660 | yes |
| **`/games/physical-and-chemical-changes-quiz`** | 52 | 335,680 | **no — new** |
| `/games/states-of-matter-game` | 54 | 274,310 | yes |
| `/games/bonding-practice` | 152 | 128,530 | yes (rank 13) |
| `/games/chemical-formulas-practice` | 75 | 46,870 | yes |
| `/games/molecule-builder-game` | 25 | 41,880 | yes |
| `/games/reaction-types-game` | 35 | 34,960 | yes |
| `/games/polyatomic-ions-flashcards` | 23 | 34,300 | yes |
| `/games/acids-and-bases-quiz` | 38 | 30,250 | yes |

**Six brand-new clusters** the classifier had to invent: `/games/physical-and-chemical-changes-quiz`, `/guides/atomic-structure-guide`, `/guides/atomic-structure-practice`, `/guides/atomic-structure-quiz`, `/guides/chemical-formulas-practice`, `/guides/unit-conversions-practice`. Atomic structure appearing three times independently is the signal: **stage 2 under-built atomic structure**, which carries 1,260 relevant competitor keywords and is the second-largest topic in the entire competitor corpus.

---

## 5. Notes for stage 4 (topical map)

1. **Build the game vertical first, and build single-purpose game pages.** 22/23 game SERPs are tool-led, AI Overviews are half as common there (39% vs 76%), and the #1 results are single games, not hubs. `/games/periodic-table-game` (713,880 new-keyword volume) and `/games/balancing-chemical-equations-game` (367,710) are the two anchors — and ChemGames already ships a Reaction Balancer, so the second is a re-optimisation job, not a build.

2. **Treat guide/cheat-sheet pages as support, not as traffic drivers.** 76% of guide SERPs carry an AI Overview, and the winners are Wikipedia, Britannica, LibreTexts, Khan Academy and College Board. A thin cheat sheet on a `.vercel.app` domain will not displace them. Guides should exist to build topical authority and to internally link into the games.

3. **Adopt one programmatic page family in stage 4's map.** Per-element pages are the highest-leverage: 168 keywords / 1.9M volume, only 2 competitors deep, and they feed directly into the periodic table game. Electron configuration (483 kws / 2.55M) and molar mass (192 kws / 1.02M) are the next two. Each is ~120 templated pages, not 120 hand-written ones. This is the single biggest structural gap between ChemGames and its competitors.

4. **Add atomic structure as a first-class topic.** It generated four of the six invented clusters and 1,260 relevant keywords, and stage 2's 116-cluster map treats it only as a sub-topic of the periodic table.

5. **Add `/games/physical-and-chemical-changes-quiz`** — 335,680 new-keyword volume, game intent, genuinely absent from stage 2's map, and a natural fit for the existing mini-game engine.

6. **Model the competitive tiers separately in the map.** Beatable now: scichamp.com, simpop.org, scigames.org, coolperiodictable.com, helpfulgames.com. Beatable with depth: chemquiz.net, interactivechemistry.org, periodictable.one, funbrain.com. Not beatable head-on: PhET, Sporcle, Quizlet, LibreTexts, Khan Academy, Ptable, Wikipedia, YouTube.

7. **Copy chemistrytalk.org and breslyn.org, not PhET.** Both are small independent sites holding 32k and 2.4k ranked keywords through templated topical depth. That is the achievable model for a site with no domain authority.

8. **Skip the homework-answer vertical** (83 kws / 606k volume — `smartwork5 chemistry answers`, `aleks initial knowledge check answers`). Quizlet owns it, it is off-brand for a learning-through-play product, and it attracts the wrong audience.

9. **Two carry-overs from earlier stages still block everything.** The site has no sitemap, no canonicals, duplicate titles on 11 of 17 pages, missing H1s on two game pages, and a 404 on `/games/chemical-bonds`. And it is on a `*.vercel.app` preview domain. No topical map will rank until those are fixed. The AU/UK-vs-US locale mismatch flagged in stage 1 also remains unresolved — this stage was run entirely against US data.

10. **Budget note for stage 4.** `ranked_keywords` bills ~$0.0126 flat + ~$0.00012/row. Remaining DataForSEO balance is **$2.22**, which buys roughly 17,000 more Labs rows. Prefer `keyword_ideas`/`keyword_suggestions` (flat-fee dominated) over large `ranked_keywords` pulls if further keyword volume is needed.

---

## 6. Files produced

| File | Contents |
|---|---|
| `03_serp_results.json` | All 48 SERPs (30 head + 18 supplementary) — 434 organic rows with rank, domain, url, title, description, plus `item_types` / SERP features per query |
| `03_competitors.csv` | 120 domains — type, keywords ranked in SERPs, query groups, avg/best rank, weighted score, volume captured, keywords pulled, sample URLs, notes |
| `03_competitor_keywords.csv` | **Main deliverable** — 8,654 relevant competitor keywords with volume, CPC, difficulty, competitor domain, ranking URL, rank, content_type, chemistry_topic, cluster, is_new_vs_stage2, num_competitors_ranking |
| `03_competitor_keywords_raw.json` | All 11,436 classified keywords including the 2,782 rejected as irrelevant |
| `03_competitor_research_summary.md` | This document |

Intermediates in `raw/`: `_ranked_keywords_raw.json` (all 21,425 raw Labs rows), `_domain_scores.json`, `_serp_formats.json`, `_classified3.json`, `_gaps.json`, `_distinct_gaps.json`, `_top_gaps.json`, `_deepseek_usage3.json`, `_serp_cost.json`, `_labs_cost.json`.
