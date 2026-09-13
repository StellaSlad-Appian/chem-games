# Stage 2 — Keyword Research & Page Clustering: ChemGames

**Site:** https://chem-games-seven.vercel.app/  
**Market:** US primary (`location_code` 2840), AU secondary (2036), `language_code` en  
**Run date:** 2026-08-26  
**Ranking signal:** US search volume ONLY. Keyword difficulty and keyword type were deliberately ignored per brief.

---

## 1. Method

| Step | Endpoint | Detail |
|---|---|---|
| 1. Seed expansion | `dataforseo_labs/google/keyword_suggestions/live` | 38 seeds, `limit` 400, in-request filter `search_volume >= 10`, ordered by volume desc |
| 2. Lateral expansion | `dataforseo_labs/google/related_keywords/live` | 14 head seeds at **depth 3**, `limit` 400, same volume filter |
| 3. US volume backfill | `keywords_data/google_ads/search_volume/live` | 1,266 keywords that arrived as bare strings from `related_keywords` had no volume attached |
| 4. AU volume | `keywords_data/google_ads/search_volume/live` | 3,128 relevant keywords re-priced at `location_code` 2036 |
| 5. Relevance + classification | DeepSeek `deepseek-v4-flash` via pydantic-ai (reasoning disabled) | 4,042 keywords, 50/chunk, `Semaphore(8)`, coverage-checked with gap retry — **4,041/4,042 classified** |
| 6. Cluster consolidation | DeepSeek `deepseek-v4-flash` | 131 raw clusters merged to **116 page-level clusters**, each assigned `page_title` + `page_slug` |
| 7. Site-gap mapping | DeepSeek `deepseek-v4-flash` | each cluster scored `exists_on_site` = yes / partial / no against the stage-1 inventory |

No SERP endpoints were called in this stage (none were needed) — competitor discovery is stage 3's job.

### Spend

| Item | Cost |
|---|---|
| Labs keyword_suggestions + related_keywords (probe) | $0.0438 |
| Labs keyword_suggestions x38 + related_keywords depth-3 x14 | $1.0769 |
| Google Ads search_volume — US backfill (1,266 kws) | $0.1800 |
| Google Ads search_volume — AU (3,128 kws) | $0.3600 |
| **DataForSEO total** | **$1.6607** |
| DeepSeek v4-flash (181,858 in / 295,704 out tokens, 4 passes) | ~$0.4703 peak · ~$0.2352 off-peak |

Well inside the $3 budget. DataForSEO balance after the run: ~$5.32.

### Counts

| Metric | Value |
|---|---|
| Unique keywords pulled | **4,840** |
| With US volume >= 10 (sent to classification) | 4,042 |
| Classified relevant | **3,178** |
| Filtered out as irrelevant | 1,662 |
| Page-level clusters | **116** |
| Total US volume across relevant keywords | 5,087,530/mo |
| Total AU volume across relevant keywords | 322,610/mo |
| Content-type split (pages) | 55 game · 52 guide · 9 blog |
| Gap status (pages) | 91 no · 12 partial · 13 yes |

The relevance filter cleanly rejected the noise that depth-3 fan-out drags in — Little Alchemy (246k), BuzzFeed/personality/zodiac quizzes (135k), `z-library`, `openclaw`, and competitor brand terms (`phet`, 110k). Zero junk leaked into the relevant set on audit.

---

## 2. Top 25 pages by US search volume

| # | Page title | Slug | Type | Topic | US vol | AU vol | Kws | Primary keyword | On site? |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Periodic Table Guide & Reference - Free Chemistry Cheat Sheet | `/guides/periodic-table-guide` | guide | periodic table | 4,111,020 | 248,060 | 9 | periodic table | no |
| 2 | Periodic Table Game - Free Online Element Quiz | `/games/periodic-table-game` | game | periodic table | 180,970 | 19,120 | 333 | quiz about the periodic table | no |
| 3 | How to Balance Chemical Equations: Step-by-Step Guide | `/guides/how-to-balance-chemical-equations` | guide | balancing equations | 175,350 | 15,930 | 201 | how to do chemical equations balance | yes |
| 4 | Balancing Chemical Equations Game - Free Online Practice | `/games/balancing-chemical-equations-game` | game | balancing equations | 152,360 | 8,700 | 118 | chemical equation balancer | yes |
| 5 | Chemistry Cheat Sheet - Free Reference Guide & Formulas | `/guides/chemistry-cheat-sheet` | guide | general chemistry | 131,700 | 3,700 | 237 | chemistry formulas | no |
| 6 | Types of Chemical Reactions Guide & Examples | `/guides/types-of-chemical-reactions-guide` | guide | reaction types | 78,650 | 6,990 | 309 | different types of chemical reactions | partial |
| 7 | Naming Compounds Practice - Ionic & Covalent Naming | `/guides/naming-compounds-practice` | guide | chemical formulas/naming | 40,040 | 3,000 | 181 | naming ionic compounds | no |
| 8 | Stoichiometry Practice Problems & Step-by-Step Solutions | `/guides/stoichiometry-practice` | guide | stoichiometry/moles | 31,080 | 1,660 | 312 | practice problems stoichiometry | no |
| 9 | Polyatomic Ions Cheat Sheet - List & Memorization Tips | `/guides/polyatomic-ions-cheat-sheet` | guide | chemical formulas/naming | 29,080 | 1,250 | 7 | polyatomic ions list | partial |
| 10 | AP Chemistry Cheat Sheet - Formula Sheet & Quick Reference | `/guides/ap-chemistry-cheat-sheet` | guide | general chemistry | 18,100 | 40 | 1 | ap chemistry formula sheet | no |
| 11 | What Is Chemistry? - A Simple Guide for Students | `/guides/what-is-chemistry-guide` | guide | general chemistry | 18,100 | 1,300 | 1 | what is chemistry | no |
| 12 | Chemistry Quiz - Free Online General Chemistry Game | `/games/chemistry-quiz` | game | general chemistry | 16,320 | 1,690 | 63 | quiz on chemistry | no |
| 13 | Bonding Practice Game - Lewis Structures & Chemical Bonds | `/games/bonding-practice` | game | bonding | 12,840 | 270 | 16 | lewis structure practice | no |
| 14 | Chemistry Study Tips: How to Study Chemistry & Succeed | `/blog/chemistry-study-tips` | blog | general chemistry | 12,570 | 1,880 | 228 | is chemistry hard | no |
| 15 | Chemistry Games for High School - Free Online Learning | `/games/chemistry-games-for-high-school` | game | general chemistry | 10,860 | 1,530 | 123 | chemistry games | no |
| 16 | Lewis Structure Practice Problems & Drawing Guide | `/guides/lewis-structure-practice` | guide | bonding | 7,540 | 530 | 82 | lewis structure practice problems | no |
| 17 | Chemistry Practice Problems - Free Exercises & Solutions | `/guides/chemistry-practice-problems` | guide | general chemistry | 7,110 | 390 | 126 | practice chemistry problems | no |
| 18 | Chemistry Flashcards - Free Online Study Game | `/games/chemistry-flashcards` | game | general chemistry | 6,490 | 480 | 44 | chemistry flashcards | no |
| 19 | Organic Chemistry Practice Problems & Exercises | `/guides/organic-chemistry-practice` | guide | organic | 6,140 | 350 | 47 | organic chemistry practice problems | no |
| 20 | Free Chemistry Worksheets - Practice Exercises & Answer Keys | `/guides/chemistry-worksheets` | guide | general chemistry | 5,460 | 1,020 | 140 | worksheets for chemistry | no |
| 21 | Chemistry Conversions & Unit Conversion Practice | `/guides/chemistry-conversions-practice` | game | general chemistry | 4,240 | 140 | 14 | practice conversion problems for chemistry | no |
| 22 | Organic Chemistry Quiz - Functional Groups Game | `/games/organic-chemistry-quiz` | game | organic | 3,990 | 350 | 12 | functional groups organic chemistry quiz | no |
| 23 | Balancing Chemical Equations Practice Problems & Answers | `/guides/balancing-chemical-equations-practice` | guide | balancing equations | 3,690 | 330 | 40 | balancing chemical equations answer key | yes |
| 24 | Acids and Bases Practice Problems & Solutions Guide | `/guides/acid-base-practice` | guide | acids & bases | 2,400 | 210 | 49 | acids and bases practice problems | no |
| 25 | Organic Chemistry Cheat Sheet - Free Reference Guide | `/guides/organic-chemistry-cheat-sheet` | guide | organic | 1,840 | 310 | 26 | organic chemistry cheat sheet | no |

> **Caveat on rank 1.** `periodic table` alone is 4,090,000/mo — 99.5% of that cluster's volume and 80% of the entire dataset. It is a navigational-ish head term owned by Ptable/Wikipedia/PubChem and is not realistically winnable. Rank 2 onward (`periodic table game`, 180,970) is where the actionable opportunity starts. Treat rank 1 as a topical-authority signal, not a target page.

### What this says about priorities

- **Periodic table is the single biggest gap.** Ranks 1 and 2 are both periodic-table clusters and the site has *zero* periodic-table content. `periodic table game` (180,970/mo US) is the highest-volume genuinely winnable page in the whole set, and it matches the site's existing game format exactly.
- **The two clusters the site already serves are strong.** `how to balance chemical equations` (175,350) and `balancing chemical equations game` (152,360) are ranks 3 and 4 — the Reaction Balancer game and its cheat sheet are pointed at real demand. Both currently sit behind duplicate titles and client-rendered pages with no H1.
- **Guides out-earn games on volume (52 guide pages vs 55 game pages), but games are the site's differentiator.** The cheat-sheet format is the cheaper win; the game format is the defensible one.
- **Blog is only 9 pages / small volume** — real, but a distant third. `chemistry study tips` (12,570) is the one worth building early.

---

## 3. Seeds used

**38 `keyword_suggestions` seeds:** chemistry games, chemistry games for high school, chemistry games for middle school, online chemistry games, free chemistry games, chemistry quiz, chemistry review games, balancing chemical equations game, how to balance chemical equations, balancing equations practice, periodic table game, periodic table quiz, element symbols quiz, acid base game, acids and bases practice, ph scale game, naming compounds game, chemical formula game, writing chemical formulas practice, types of chemical reactions, ionic and covalent bonds game, states of matter game, chemistry cheat sheet, chemistry formulas list, stoichiometry practice, mole conversion practice, chemistry study tips, how to study chemistry, chemistry classroom games, chemistry games for kids, chemistry activities for students, chemistry worksheets, titration simulation, lewis structure practice, molecule game, chemistry flashcards, chemistry practice problems, chemistry games for teachers

**14 `related_keywords` depth-3 seeds:** chemistry games, periodic table game, balancing chemical equations game, chemistry quiz, acid base game, chemistry cheat sheet, chemical formula game, stoichiometry practice, chemistry games for high school, how to balance chemical equations, naming compounds game, chemistry classroom activities, element quiz, chemistry study tips

Seeds were drawn from the stage-1 handoff's 68 suggestions, consolidated to the strongest heads and extended with the gap topics stage 1 flagged (periodic table, stoichiometry, titration, Lewis structures, flashcards, teacher/classroom).

---

## 4. Notes for stage 3 (competitor research)

Use these **30 head keywords** as SERP probes to discover the real competitive set. They are the highest-volume *relevant* keywords in the dataset, so their SERPs will surface whoever owns this space.

| # | Keyword | US vol | AU vol | Type | Cluster |
|---|---|---|---|---|---|
| 1 | periodic table | 4,090,000 | 246,000 | guide | periodic table guide |
| 2 | chemistry formulas | 110,000 | 1,600 | guide | chemistry cheat sheet |
| 3 | chemical equation balancer | 40,500 | 1,900 | game | balancing chemical equations game |
| 4 | how to do chemical equations balance | 22,200 | 1,900 | guide | how to balance chemical equations guide |
| 5 | chemistry how to balance chemical equations | 22,200 | 1,900 | guide | how to balance chemical equations guide |
| 6 | how to balance chemical equations | 22,200 | 1,900 | guide | how to balance chemical equations guide |
| 7 | how to balance chemical equations in chemistry | 22,200 | 1,900 | guide | how to balance chemical equations guide |
| 8 | how to balance a chemical equations | 22,200 | 1,900 | guide | how to balance chemical equations guide |
| 9 | how to balance the chemical equations | 22,200 | 1,900 | guide | how to balance chemical equations guide |
| 10 | how to balance a chemical equation | 22,200 | 1,900 | guide | how to balance chemical equations guide |
| 11 | different types of chemical reactions | 18,100 | 1,600 | guide | types of chemical reactions guide |
| 12 | chemical types of reactions | 18,100 | 1,600 | guide | types of chemical reactions guide |
| 13 | types of chemical reactions | 18,100 | 1,600 | guide | types of chemical reactions guide |
| 14 | ap chemistry formula sheet | 18,100 | 40 | guide | ap chemistry cheat sheet |
| 15 | polyatomic ions list | 18,100 | 480 | guide | polyatomic ions cheat sheet |
| 16 | what is chemistry | 18,100 | 1,300 | guide | what is chemistry guide |
| 17 | balancing equations | 12,100 | 1,600 | game | balancing chemical equations game |
| 18 | periodic table pdf | 9,900 | 720 | guide | periodic table guide |
| 19 | what are the polyatomic ions | 9,900 | 720 | guide | polyatomic ions cheat sheet |
| 20 | ap chemistry periodic table | 8,100 | 10 | guide | periodic table guide |
| 21 | quiz about the periodic table | 6,600 | 590 | game | periodic table game |
| 22 | elements periodic table quiz | 6,600 | 590 | game | periodic table game |
| 23 | periodic table of the elements quiz | 6,600 | 590 | game | periodic table game |
| 24 | quiz periodic table of elements | 6,600 | 590 | game | periodic table game |
| 25 | periodic table element quiz | 6,600 | 590 | game | periodic table game |
| 26 | quiz periodic table | 6,600 | 590 | game | periodic table game |
| 27 | quiz the periodic table | 6,600 | 590 | game | periodic table game |
| 28 | quiz on the periodic table of elements | 6,600 | 590 | game | periodic table game |
| 29 | periodic table quiz | 6,600 | 590 | game | periodic table game |
| 30 | periodic table elements quiz | 6,600 | 590 | game | periodic table game |

**Guidance for stage 3:**
- Run these at `location_code` 2840, `depth` 10, `/serp/google/organic/live/advanced`. 30 queries at depth 10 is ~$0.06 — cheap.
- **Skip `periodic table` itself** as a competitor probe (rank-1 caveat above) unless you want to confirm Ptable/Wikipedia dominance. `periodic table game` and `periodic table quiz` are the informative ones.
- Stage 1 predicted PhET, Khan Academy, Kahoot/Quizizz/Blooket, Quizlet, ChemLibreTexts, Ptable and Study.com. The dataset backs this: `phet` (110k) and `phet simulation` (60.5k) surfaced as high-volume navigational terms, which means PhET is the brand students already search by name. Validate whether PhET actually ranks for the *generic* game queries or only its own brand.
- Record `item_types` per SERP. AI Overviews on the guide-intent queries (`how to balance chemical equations` and friends) will materially change what a thin cheat sheet can achieve.
- The interesting question for stage 3 is **format**: on `...game` / `...quiz` queries, do interactive tools rank, or do article pages *about* games rank? That determines whether ChemGames' actual product is the right answer to those SERPs.

---

## 5. Files produced

| File | Contents |
|---|---|
| `02_keywords_raw.json` | All 4,840 unique keywords with source seed, endpoint, US + AU volume, CPC, competition, difficulty, and full classification (relevant *and* irrelevant) |
| `02_keywords_classified.csv` | 3,178 relevant keywords — keyword, US vol, AU vol, CPC, content_type, chemistry_topic, cluster, audience, intent |
| `02_pages_by_volume.csv` | **Main deliverable** — 116 page clusters ranked by total US volume, with title, slug, primary + supporting keywords, and `exists_on_site` |
| `02_keyword_research_summary.md` | This document |

Intermediates (`_pull_checkpoint.json`, `_uniq_us.json`, `_classified.json`, `_cluster_map.json`, `_au_volumes.json`, `_exists.json`, `_pages.json`, `_to_classify.json`) are retained for reproducibility and can be deleted.
