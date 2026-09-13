# Stage 8 — Per-Page On-Page Optimisation Spec: ChemGames

**Site:** https://chem-games-seven.vercel.app/  ·  **Date:** 2026-08-26  ·  **Scope:** all 14 public content pages from `01_site_pages.json` (+ 3 utility pages listed with a noindex recommendation).
**Spec only — no page code was changed.** Outputs: `08_page_optimisation.csv` (one row per page), this document, and raw API responses under `raw/_s8_*.json`.
**Total DataForSEO spend this stage: $0.3957** (cap $3.00; account balance at start $1.52).

---

## 1. Method

1. **Reconcile** each live URL to a `04_topical_map.csv` row. Ten map rows carry `exists_on_site=true` but use *planned* slugs (`/games/acids-and-bases-quiz`) rather than *live* ones (`/games/acid-classification`); reconciliation used the `notes`, `page_title` and topic columns. Three live pages have no map row at all (`/`, `/games/neutralise`, `/cheat-sheets/states-of-matter`) and were keyworded from `04_master_keywords.csv` by topic + volume.
2. **Choose one primary keyword** per page that the page's *actual content* can honestly satisfy. Five map primaries were rejected on this test — they are homework/Q&A queries ("which one of the following is a weak acid", "provide the formula for each compound"), off-audience ("ap chemistry acids and bases practice test") or trivially small ("10 examples of ionic compounds in everyday life", 50/mo). Rejections are recorded in each page's Notes.
3. **Widen supporting keywords** with DataForSEO Labs `keyword_suggestions` (13 seeds, limit 100, US) on top of the map's supporting set; 3–8 kept per page.
4. **Measure the SERP** for each primary with `serp/google/organic/live/advanced` (US, desktop, depth 10) — organic top-10 domains, AI-overview / featured-snippet / PAA / video presence, and PAA question text. **6 of 13 primaries were exact matches in `03_serp_results.json` and were not re-pulled** (per brief). Those cached records hold organic + feature types but no PAA text, so FAQs for those six pages were derived from question-form keywords in the suggestion pulls instead of PAA.
5. **Pull AU volume** for the final primary + supporting set (107 keywords) in one `keywords_data/google_ads/search_volume/live` call at `location_code 2036`.
6. **Write the spec**: title (≤60 chars), meta (≤155), H1, ordered H2 outline, FAQ, internal links (from `04_internal_links.csv` mapped to live slugs, plus hub/spoke gaps among live pages), schema.org types, and before → after for title/meta/H1. Lengths were machine-checked.

### Spend

| # | Call | Endpoint | Location | Cost |
|---|---|---|---|---|
| 1–13 | `keyword_suggestions` × 13 seeds (limit 100, volume > 0): chemistry games · acids and bases quiz · chemical formula quiz · neutralization reaction · balancing chemical equations practice · chemistry cheat sheet · states of matter · acids and bases · how to balance chemical equations · types of chemical reactions · ionic vs covalent · write chemical formula · formula game | `/dataforseo_labs/google/keyword_suggestions/live` | 2840 | $0.2897 |
| 14–21 | Google SERP advanced, depth 10 × 8: acids and bases quiz · naming compounds quiz · acid base neutralization reaction · balancing chemical equations practice · states of matter · acids and bases · ionic vs covalent bonds · how to write a chemical formula | `/serp/google/organic/live/advanced` | 2840 | $0.0160 |
| 22 | Google Ads search volume, 107 keywords, one batched task | `/keywords_data/google_ads/search_volume/live` | 2036 | $0.0900 |
| | **Total** | | | **$0.3957** |

Skipped (cached in `03_serp_results.json`): online chemistry games · chemistry games · chemistry cheat sheet · how to balance chemical equations · types of chemical reactions (5 keywords, 6 pages — the homepage and `/games` share the cached "chemistry games" family). The "formula game" seed returned Formula 1 racing keywords and was discarded.

Raw files: `raw/_s8_kwsugg_*.json` (13), `raw/_s8_kwsugg_summary.json`, `raw/_s8_serps.json`, `raw/_s8_au_volumes_raw.json`, `raw/_s8_au_volumes.json`, `raw/_s8_keyword_volumes.json`, `raw/_s8_page_keywords.json`, `raw/_s8_cost.json`, `raw/_s8_build_spec.py` (generator for the CSV + per-page blocks).

Volume convention below: **US / AU** monthly searches. US from `04_master_keywords.csv` or the suggestion pull; AU from the Stage 8 batch. `n/a` = keyword absent from the US datasets (AU still measured).

---

## 2. Reconciliation — live URL → topical-map row

| Live URL | Map row (planned slug) | Tier · score | How reconciled | Primary keyword (US/AU) |
|---|---|---|---|---|
| `/` | — none | P1 (site) | No homepage row in the map; treated as brand + site hub | online chemistry games (170/20) |
| `/games` | `/games` | P1 · hub | Exact (pillar_hub, exists=true) | chemistry games (1900/170) |
| `/games/acid-classification` | `/games/acids-and-bases-quiz` | P1 · 81.57 | Notes "Flagship acid-base quiz game"; game = Acid or Base? | acids and bases quiz (170/20) — map primary rejected |
| `/games/formula-blaster` | `/games/chemical-formulas-practice` | P1 · partial | Notes "Game despite type=guide"; only formula-recognition game | naming compounds quiz (210/10) — map primary rejected |
| `/games/neutralise` | — none | P2 (assigned) | No neutralisation row; nearest planned `/games/acids-bases-ph-titration-game` (P3, unbuilt) | acid base neutralization reaction (1900/110) |
| `/games/reaction-balancer` | `/games/balancing-chemical-equations-game` | P1 · 75.49 | Notes "Flagship balancing game". Also absorbs `/games/balancing-chemical-equations-worksheet` (P2, exists=true), `/games/chemical-reactions-quiz` (P1, exists=true) and `/games/reaction-types-game` (P1, partial) — those flags all point at this page's 34-reaction library; no worksheet or quiz page exists | balancing chemical equations practice (5400/210) |
| `/cheat-sheets` | `/cheat-sheets` | P1 · hub | Exact (pillar_hub, exists=true) | chemistry cheat sheet (720/70) |
| `/cheat-sheets/states-of-matter` | — none | P2 (assigned) | No guide row; planned `/games/states-of-matter-game` (P1, unbuilt) measured as an article SERP in stage 6 | states of matter (40500/3600) |
| `/cheat-sheets/acids-and-bases` | `/guides/acids-bases-cheat-sheet` | Later/Skip | Notes "Quick-reference cheat sheet" | acids and bases (18100/1600) — map primary rejected |
| `/cheat-sheets/balancing-equations` | `/guides/how-to-balance-chemical-equations` | P1 · 67.39 | Notes "Flagship balancing how-to guide". Also absorbs `/guides/balancing-chemical-equations-practice` (P1 · 64.31, exists=true) as a practice-problems H2 | how to balance chemical equations (22200/1900) |
| `/cheat-sheets/reaction-types` | `/guides/types-of-chemical-reactions-guide` | P2 · partial | Notes "Core reaction-type guide" | types of chemical reactions (18100/1600) |
| `/cheat-sheets/chemical-bonds` | `/guides/bonding-cheat-sheet` | Later/Skip | Notes "Low volume cheat sheet support"; keyword taken from `/games/covalent-ionic-bonds-game` (P1) because stage 6 measured that SERP as article format | ionic vs covalent bonds (33100/1300) — map primary rejected |
| `/cheat-sheets/chemical-formulas` | `/guides/writing-chemical-formulas-practice` | P3 · unbuilt | Nearest guide row; `/games/chemical-formulas-practice` went to Formula Blaster | how to write a chemical formula (1300/140) |
| `/auth` `/profile` `/leaderboards` | — none | n/a | Utility pages — noindex (see §3 end) | — |

"(assigned)" tiers are mine for pages with no map row, set by volume and SERP winnability.

---

## 3. Per-page recommendations

### /  ·  homepage  ·  P1
**Map row:** `(no map row)`  |  **Primary:** `online chemistry games` — 170 US / 20 AU
**Supporting (US/AU):** chemistry games (1900/170) · free chemistry games (20/10) · interactive chemistry games (40/10) · chemistry learning games (50/10) · chemistry games for students (20/10) · chemistry games for high school (n/a/n/a) · fun chemistry games (110/10)

| | Before | After |
|---|---|---|
| Title | ChemGames \| Interactive Chemistry Learning | ChemGames: Free Online Chemistry Games for Students (51) |
| Meta | Master chemistry concepts through fun, visual, and interactive mini-games and reference guides. | Free online chemistry games: sort acids and bases, blast formulas, balance equations and climb the leaderboard. Made for high-school chemistry. (143) |
| H1 | Learn chemistry by playing. | Free Online Chemistry Games — Learn Chemistry by Playing |

**H2 outline**
1. Interactive chemistry mini-games (4 cards: Acid or Base?, Formula Blaster, Neutralise!, Reaction Balancer)
2. Chemistry cheat sheets for Year 9–10 / high school
3. How ChemGames works (play, score, leaderboard — ~150 words)
4. Who ChemGames is for (students, teachers, revision)
5. Leaderboards
6. FAQ

**FAQ**
- Are ChemGames chemistry games free to play?
- What chemistry topics do the games cover?
- Do I need an account to play?
- What grade or year level are the games for?

**Internal links to add:** `/games/reaction-balancer`, `/cheat-sheets/acids-and-bases`, `/cheat-sheets/balancing-equations`, `/cheat-sheets/chemical-formulas`, `/cheat-sheets/reaction-types`, `/cheat-sheets/chemical-bonds`, `/cheat-sheets/states-of-matter`
**Schema:** WebSite + Organization; ItemList of VideoGame; FAQPage
**SERP (measured):** portal/list of game sites (cached 03: interactivechemistry.org, scichamp, littlealchemy, helpfulgames) — AI overview: true, featured snippet: false
**Content gaps:** Only 1,250 SSR chars, dominated by Profile/Leaderboards H2s; no text saying what the games teach; Reaction Balancer missing from featured cards; leaderboard tab for dead 'Bond Builder'; no og:/twitter: tags. Add ~250 words + FAQ block.
**Notes:** Map has no homepage row; /games hub owns the head term 'chemistry games' (1900/170) so the homepage takes the brand + 'online chemistry games' variant to avoid home-vs-hub cannibalisation. SERP skipped (exact keyword cached in 03_serp_results.json).

### /games  ·  pillar_hub  ·  P1
**Map row:** `/games`  |  **Primary:** `chemistry games` — 1900 US / 170 AU
**Supporting (US/AU):** chemistry games online (170/20) · fun chemistry games (110/10) · chemistry games for high school (n/a/n/a) · chemistry quiz game (30/10) · chemistry review games (70/10) · chemistry reaction games (90/10) · chemistry games balancing equations (390/40) · chemistry games app (260/10)

| | Before | After |
|---|---|---|
| Title | ChemGames \| Interactive Chemistry Learning | Free Online Chemistry Games for High School \| ChemGames (55) |
| Meta | Master chemistry concepts through fun, visual, and interactive mini-games and reference guides. | Four free chemistry games: an acids and bases quiz, a formula blaster, a neutralisation defender and an equation balancer. No download, instant play. (149) |
| H1 | Games | Free Online Chemistry Games |

**H2 outline**
1. Acid or Base? — acids and bases quiz game (80-word blurb + what you learn)
2. Formula Blaster — naming compounds quiz game
3. Neutralise! — acid-base neutralization game
4. Reaction Balancer — balancing chemical equations practice game
5. Chemistry games by topic (acids & bases, formulas, equations, reactions) with links to the matching cheat sheet
6. Chemistry games for the classroom (teacher blurb: no login, 5-minute rounds, leaderboard)
7. FAQ

**FAQ**
- What are good chemistry games for high school students?
- Are these chemistry games free?
- Which chemistry game helps with balancing equations?
- Can I play chemistry games online without downloading anything?

**Internal links to add:** `/cheat-sheets`, `/cheat-sheets/acids-and-bases`, `/cheat-sheets/balancing-equations`, `/cheat-sheets/chemical-formulas`, `/cheat-sheets/reaction-types`
**Schema:** CollectionPage + ItemList (VideoGame items); BreadcrumbList; FAQPage
**SERP (measured):** portal/list, mixed (cached 03: interactivechemistry.org, reddit, teachchemistry.org, scichamp, amazon, sciencetrek); PAA present — AI overview: false, featured snippet: false
**Content gaps:** 582 SSR chars; 5 cards with one-liners only; links to 404 /games/chemical-bonds — remove the card until the route ships. Each game needs an H2 + 60–100 words; add topic grouping and FAQ.
**Notes:** Map row says 'not a keyword target' but the SERP is a low-KD (kd 2) list of game portals — a hub with real descriptions can rank. Planned /games/chemistry-games-for-high-school (P2) also targets 'chemistry games': retarget it to 'chemistry games for high school' only. SERP skipped (cached).

### /games/acid-classification  ·  game  ·  P1
**Map row:** `/games/acids-and-bases-quiz`  |  **Primary:** `acids and bases quiz` — 170 US / 20 AU
**Supporting (US/AU):** acid or base quiz (170/20) · acid base quiz (170/20) · strong acids and bases quiz (70/10) · identifying acids and bases quiz (10/10) · acid base game (30/10) · acid and base ph scale (1900/110) · which one of the following is a weak acid (90500/1600) · acids and bases practice (90/10)

| | Before | After |
|---|---|---|
| Title | ChemGames \| Interactive Chemistry Learning | Acids and Bases Quiz: Acid, Base or Neutral? \| ChemGames (56) |
| Meta | Master chemistry concepts through fun, visual, and interactive mini-games and reference guides. | Free acids and bases quiz game: sort 35 real compounds (HCl, NaOH, NaCl) into acid, base or neutral before you lose 3 lives. Hints and a leaderboard. (149) |
| H1 | Acid, Base or Neutral? | Acids and Bases Quiz: Acid, Base or Neutral? |

**H2 outline**
1. How to play (3 lives, hint lightbulb, levels)
2. What this acids and bases quiz covers (strong/weak acids, bases, neutral salts, pH)
3. Strong acids and bases to memorise (table of the 7 strong acids + strong bases from the compound library)
4. How to tell if a compound is an acid or a base (~300 words: H⁺ donors, OH⁻ releasers, salts)
5. Acid and base pH scale (mini chart 0–14)
6. Compounds in this quiz (35 names + formulas)
7. Keep learning (Acids & Bases cheat sheet, Neutralise!)
8. FAQ

**FAQ**
- Which one of the following is a weak acid: HF, HCl, HBr or HNO3?
- Is NaCl an acid, a base or neutral?
- What are the 7 strong acids?
- How do you know if something is an acid or a base?
- Is NH3 an acid or a base?

**Internal links to add:** `/cheat-sheets/acids-and-bases`, `/games/neutralise`, `/games`, `/leaderboards`
**Schema:** VideoGame (+ LearningResource); BreadcrumbList; FAQPage
**SERP (measured):** quiz-platform: 9/9 organic are quizzes (chemistry.coach, quizlet, chemquiz, khanacademy practice, sporcle, wayground) — AI overview: true, featured snippet: false
**Content gaps:** 124 SSR chars; no explainer, no compound list, hint text only in JS. Format already matches the SERP (all quizzes) — the missing piece is crawlable text: rules, compound table, strong/weak lists, FAQ.
**Notes:** Map primary 'which one of the following is a weak acid' (90,500) is a homework/Q&A query (quizlet + askfilo SERP, AIO) that a game page cannot honestly satisfy — demoted to an FAQ entry. 'acids and bases quiz' (170/20, kd 0) matches the page exactly.

### /games/formula-blaster  ·  game  ·  P1
**Map row:** `/games/chemical-formulas-practice`  |  **Primary:** `naming compounds quiz` — 210 US / 10 AU
**Supporting (US/AU):** chemical formula quiz (50/10) · chemistry naming practice (1900/10) · naming chemical compounds quiz (210/10) · naming ionic compounds quiz (880/10) · compounds game (140/10) · chemical formula practice quiz (10/0) · naming compounds practice (1300/20)

| | Before | After |
|---|---|---|
| Title | ChemGames \| Interactive Chemistry Learning | Naming Compounds Quiz Game: Formula Blaster \| ChemGames (55) |
| Meta | Master chemistry concepts through fun, visual, and interactive mini-games and reference guides. | A 45-second naming compounds quiz: match chemical names to formulas and pop the right bubbles. 35 acids, bases and salts over 5 levels. Free, no sign-up. (153) |
| H1 | Find: Loading... | Formula Blaster: Naming Compounds Quiz Game |

**H2 outline**
1. How to play (45-second timer, 3 hits per target, 3 targets per level)
2. What you practise (name → formula recognition, ions, subscripts)
3. Chemical formulas in this game (table: name, formula, acid/base/salt)
4. How to read a chemical formula (~250 words: symbols, subscripts, polyatomic ions, brackets)
5. Tips to memorise chemical formulas
6. Keep learning (Writing Chemical Formulas cheat sheet)
7. FAQ

**FAQ**
- How do you name chemical compounds?
- What is the chemical formula for sodium hydroxide?
- What is the difference between naming ionic and covalent compounds?
- Where can I practise naming compounds for free?

**Internal links to add:** `/cheat-sheets/chemical-formulas`, `/cheat-sheets/chemical-bonds`, `/games`, `/games/acid-classification`
**Schema:** VideoGame (+ LearningResource); BreadcrumbList; FAQPage
**SERP (measured):** quiz-platform: 10/10 organic are quizzes/practice tools (chemquiz, proprofs, khanacademy, quizlet, sporcle, purposegames, breslyn, quia); no AI overview — AI overview: false, featured snippet: false
**Content gaps:** H1 is the placeholder 'Find: Loading...' — make the target readout a live-region <p>, not the H1. 101 SSR chars. Needs static H1, rules, compound table, explainer, FAQ.
**Notes:** Map primary 'provide the formula for each compound' (165,000) is an ALEKS/homework query (article SERP, AIO) — rejected. 'naming compounds quiz' (210/10) is small but the only AIO-free, all-tool SERP among the 13 pages: cleanest format match on the site. 'chemistry naming practice' (1,900) kept as supporting.

### /games/neutralise  ·  game  ·  P2
**Map row:** `(no map row)`  |  **Primary:** `acid base neutralization reaction` — 1900 US / 110 AU
**Supporting (US/AU):** neutralization reaction (8100/1300) · what is a neutralization reaction (2400/480) · neutralization reaction examples (1000/170) · what are the products of a neutralization reaction (590/40) · neutralization reaction equation (720/40) · acid base game (30/10) · ph scale game (20/10)

| | Before | After |
|---|---|---|
| Title | ChemGames \| Interactive Chemistry Learning | Acid-Base Neutralization Reaction Game: Neutralise! (51) |
| Meta | Master chemistry concepts through fun, visual, and interactive mini-games and reference guides. | Fire H+ and OH- ions at incoming acids and bases in this free arcade game, then learn how acid-base neutralization reactions make a salt and water. (147) |
| H1 | (none) | Neutralise! — Acid-Base Neutralization Reaction Game |

**H2 outline**
1. How to play (H⁺ vs OH⁻ ammo, 3 waves, lives, keyboard + mouse)
2. What is an acid-base neutralization reaction? (acid + base → salt + water, ~150 words)
3. Neutralization reaction examples (table of 10: HCl + NaOH, H₂SO₄ + 2NaOH, baking soda + vinegar, antacids...)
4. What happens when HCl and NaOH neutralize?
5. Which ion neutralises which? (why OH⁻ hits acids and H⁺ hits bases)
6. Keep learning (Acids & Bases sheet, Reaction Balancer neutralisation level)
7. FAQ

**FAQ**
- Can you give 10 examples of neutralization reactions?
- What happens when HCl and NaOH neutralize?
- How do you neutralize an acid and a base?
- Is an acid-base reaction the same as neutralization?
- What are the products of a neutralization reaction?

**Internal links to add:** `/cheat-sheets/acids-and-bases`, `/cheat-sheets/reaction-types`, `/games/acid-classification`, `/games/reaction-balancer`, `/games`
**Schema:** VideoGame (+ LearningResource); BreadcrumbList; FAQPage
**SERP (measured):** article: 8/8 organic are explainers (libretexts, unizin, pathwayz, sciencedirect, physicsclassroom, wikipedia, study.com); AI overview + knowledge graph + PAA + video — AI overview: true, featured snippet: false
**Content gaps:** No H1 at all; 150 SSR chars. SERP is 100% article, so the game alone cannot rank: add a 300–400-word explainer + examples table under the canvas. High AIO risk on definitional queries — the examples table and 'which ion' section are the differentiators.
**Notes:** No map row for neutralisation (nearest planned: /games/acids-bases-ph-titration-game, P3). 'neutralization reaction' (8,100/1,300) kept as supporting head; the two-word-narrower 'acid base neutralization reaction' (1,900/110, kd 5) matches the mechanic. Brand name keeps AU spelling 'Neutralise!'; body copy should use US 'neutralization' at least once per section.

### /games/reaction-balancer  ·  game  ·  P1
**Map row:** `/games/balancing-chemical-equations-game`  |  **Primary:** `balancing chemical equations practice` — 5400 US / 210 AU
**Supporting (US/AU):** balancing chemical equations game (390/40) · balancing chemical equations (49500/1900) · balancing equations practice (5400/210) · balancing chemical equations practice problems (480/10) · balancing chemical equations practice online (210/10) · chemistry games balancing equations (390/40) · balance chemical equations (6600/1900) · balancing chemical equations practice with answers (70/10)

| | Before | After |
|---|---|---|
| Title | ChemGames \| Interactive Chemistry Learning | Balancing Chemical Equations Practice Game \| ChemGames (54) |
| Meta | Master chemistry concepts through fun, visual, and interactive mini-games and reference guides. | Balancing chemical equations practice with 34 real reactions, from water synthesis to the Haber process. Adjust coefficients, check atom counts, get hints. (155) |
| H1 | (none) | Balancing Chemical Equations Practice Game |

**H2 outline**
1. How to play (coefficient steppers, Atom Balance panel, Check Answer, hints)
2. Current reaction — keep the dynamic level name here (e.g. 'Level 1: Water Synthesis')
3. How to balance a chemical equation in 4 steps (~200 words, link to cheat sheet)
4. All 34 reactions in this game (table: name, unbalanced → balanced, type, difficulty)
5. Balancing equations by reaction type (synthesis, decomposition, combustion, single/double replacement, redox, acid-base)
6. Common mistakes (changing subscripts, forgetting diatomics)
7. FAQ

**FAQ**
- How do you practise balancing chemical equations?
- What are the steps to balance a chemical equation?
- Why can't you change subscripts when balancing an equation?
- What is the balanced equation for photosynthesis?
- Is there a free balancing chemical equations game?

**Internal links to add:** `/cheat-sheets/balancing-equations`, `/cheat-sheets/reaction-types`, `/cheat-sheets/chemical-formulas`, `/games/neutralise`, `/games`
**Schema:** VideoGame (+ LearningResource); ItemList of the 34 reactions; BreadcrumbList; FAQPage
**SERP (measured):** practice/tool mixed: chemquiz, khanacademy practice, IXL, PhET, sciencegeek, libretexts practice + 2 YouTube; AI overview + images — AI overview: true, featured snippet: false
**Content gaps:** No H1 (only H2 'Water Synthesis'); 375 SSR chars; the 34-reaction library — the richest content asset on the site — is invisible to crawlers. Rendering the reaction table server-side turns one page into 34 long-tail landing points.
**Notes:** Map primary 'chemistry balancing chemical equations' (49,500) is a video-dominated, AIO head term; the 'practice' variant (5,400/210, kd 4) matches the page and its SERP has 5 interactive tools in the top 10. Absorbs three other 'exists' map rows that point at this library: /games/balancing-chemical-equations-worksheet (P2), /games/chemical-reactions-quiz (P1), /games/reaction-types-game (P1, partial) — none of those pages actually exist.

### /cheat-sheets  ·  pillar_hub  ·  P1
**Map row:** `/cheat-sheets`  |  **Primary:** `chemistry cheat sheet` — 720 US / 70 AU
**Supporting (US/AU):** cheat sheet for chemistry (720/70) · general chemistry cheat sheet (140/10) · chemistry formulas cheat sheet (140/10) · chemistry cheat sheet pdf (90/10) · chemistry formula sheet (n/a/2900) · chemistry cheat sheet for final (110/10) · high school chemistry cheat sheet (n/a/n/a)

| | Before | After |
|---|---|---|
| Title | ChemGames \| Interactive Chemistry Learning | Free Chemistry Cheat Sheets for High School \| ChemGames (55) |
| Meta | Master chemistry concepts through fun, visual, and interactive mini-games and reference guides. | Six free chemistry cheat sheets for Year 9–10 / high school: states of matter, acids and bases, bonds, formulas, balancing equations and reaction types. (152) |
| H1 | Lab Cheat Sheets | Chemistry Cheat Sheets |

**H2 outline**
1. Year 9 fundamentals (States of Matter, Chemical Bonds & Structure — 40-word summaries)
2. Year 9 acids & bases (Acids & Bases)
3. Year 10 equations (Balancing Chemical Equations, Writing Chemical Formulas)
4. Year 10 reactions (Types of Chemical Reactions)
5. Practise each topic with a game (sheet → game pairs)
6. How to use these cheat sheets (print, revise, test)
7. FAQ

**FAQ**
- What should a high school chemistry cheat sheet include?
- Are these chemistry cheat sheets free and printable?
- Which cheat sheet covers balancing equations?
- What year level are the cheat sheets written for?

**Internal links to add:** `/games`, `/games/acid-classification`, `/games/reaction-balancer`, `/games/formula-blaster`, `/games/neutralise`
**Schema:** CollectionPage + ItemList; BreadcrumbList; FAQPage
**SERP (measured):** article/PDF list (cached 03: scribd PDF, albert.io, studocu, toomey, dummies, cliffsnotes, TpT); images block; no AI overview — AI overview: false, featured snippet: false
**Content gaps:** Cards are H3 with no H2 structure; no print/PDF option although the SERP is PDF-heavy ('chemistry cheat sheet pdf' 90). Add year-level H2 groups, a print stylesheet, and game cross-links.
**Notes:** Map assigns 'chemistry cheat sheet' to the planned /guides/chemistry-formulas-cheat-sheet (P2) — the live hub should own it; retarget that planned page to 'chemistry formulas cheat sheet' (140/10). 'chemistry formula sheet' has 2,900 AU volume (US n/a in our data). SERP skipped (cached).

### /cheat-sheets/states-of-matter  ·  guide  ·  P2
**Map row:** `(no map row)`  |  **Primary:** `states of matter` — 40500 US / 3600 AU
**Supporting (US/AU):** three states of matter (8100/590) · what are the three states of matter (5400/260) · how many states of matter are there (5400/390) · states of matter definition (4400/140) · states of matter examples (1000/50) · states of matter plasma (6600/720) · phase changes (n/a/320) · solid liquid gas (n/a/1600)

| | Before | After |
|---|---|---|
| Title | States of Matter Cheat Sheet \| ChemGames | States of Matter Cheat Sheet: Solids, Liquids & Gases (53) |
| Meta | Particle arrangement, energy levels, and phase changes in solids, liquids, and gases. | States of matter cheat sheet: particles in solids, liquids and gases, how many states exist, phase changes and examples, with (s)/(l)/(g) state symbols. (152) |
| H1 | States of Matter | States of Matter Cheat Sheet |

**H2 outline**
1. The three states of matter (table: shape, volume, particle arrangement, energy)
2. How many states of matter are there? (plasma, Bose–Einstein condensate — answers the 4th/5th/7th/22 PAA)
3. Phase changes (melting, freezing, evaporation, condensation, sublimation, deposition — diagram)
4. The particle model of matter
5. State symbols in chemical equations: (s), (l), (g), (aq)
6. Examples of each state of matter
7. Practise (Reaction Balancer uses state symbols — no dedicated game yet)
8. FAQ

**FAQ**
- What are the three main states of matter?
- How many states of matter are there?
- What is the fifth state of matter?
- Are there really 7 (or 22) states of matter?
- What are examples of solids, liquids and gases?

**Internal links to add:** `/cheat-sheets`, `/cheat-sheets/chemical-bonds`, `/cheat-sheets/balancing-equations`, `/games`
**Schema:** Article (LearningResource); BreadcrumbList; FAQPage
**SERP (measured):** article: wikipedia, ebsco, NASA, purdue, livescience, letstalkscience + 2 YouTube; AI overview + images + PAA — AI overview: true, featured snippet: false
**Content gaps:** 631 SSR chars vs a Wikipedia/NASA SERP: needs 600–900 words, a comparison table, a phase-change diagram and the 'how many states' section. Largest AU volume on the site (3,600) and no matching game (site gap flagged in stage 1).
**Notes:** No guide row in the map; the planned /games/states-of-matter-game (P1, not built) was measured as an article SERP in stage 6, so the live cheat sheet is the honest target. Head term (kd 16) is aspirational — the question-form supporting keywords (5,400 each) are the realistic entry.

### /cheat-sheets/acids-and-bases  ·  guide  ·  P2
**Map row:** `/guides/acids-bases-cheat-sheet`  |  **Primary:** `acids and bases` — 18100 US / 1600 AU
**Supporting (US/AU):** strong acids and bases (9900/170) · weak acids and bases (5400/390) · ph scale acids and bases (1900/110) · what are acids and bases (2400/260) · acids and bases examples (n/a/90) · properties of acids and bases (1600/210) · acids and bases cheat sheet (n/a/10) · ph scale chart (1600/210)

| | Before | After |
|---|---|---|
| Title | Acids & Bases Cheat Sheet \| ChemGames | Acids and Bases Cheat Sheet: pH, Strong & Weak Lists (52) |
| Meta | Understanding the pH scale, proton donors (acids), and hydroxide release (bases). | Acids and bases cheat sheet: the pH scale, H+ and OH- ions, strong and weak acid lists, neutralisation and everyday examples. Year 9 quick reference. (149) |
| H1 | Acids & Bases | Acids and Bases Cheat Sheet |

**H2 outline**
1. What are acids and bases? (Arrhenius definition, H⁺ / OH⁻)
2. The pH scale for acids and bases (0–14 chart with everyday examples)
3. Strong acids and bases list (table)
4. Weak acids and bases (HF, CH₃COOH, NH₃ — with pKa from the compound library)
5. Properties of acids vs bases (comparison table)
6. Neutralisation: acid + base → salt + water
7. Examples of acids and bases in everyday life (20 — answers the PAA)
8. Test yourself: Acid or Base? quiz game
9. FAQ

**FAQ**
- What are acids and bases?
- What are 5 examples of acids and bases?
- What are the 7 strong acids?
- Is water an acid or a base?
- What is the pH of a neutral solution?

**Internal links to add:** `/games/acid-classification`, `/games/neutralise`, `/cheat-sheets/reaction-types`, `/cheat-sheets`
**Schema:** Article (LearningResource); BreadcrumbList; FAQPage
**SERP (measured):** article: wikipedia, ebsco, khanacademy, reddit, purdue, chemicals.co.uk; AI overview + PAA + video + product_considerations — AI overview: true, featured snippet: false
**Content gaps:** 575 SSR chars, 3 bullets, 3 formulas. Needs the strong/weak lists (the compound library already holds pKa/pKb for 35 compounds), a pH chart, properties table and examples list. 'strong acids and bases' (9,900, kd 0) is the most winnable sub-section.
**Notes:** Map row is Later/Skip with primary 'ap chemistry acids and bases practice test' (30) — rejected as off-audience. Planned /guides/acids-and-bases-basics (P3) and /guides/ph-scale-acids-bases (P3) overlap this page: let the live sheet act as the acids-and-bases hub until they exist, then link down to them.

### /cheat-sheets/balancing-equations  ·  guide  ·  P1
**Map row:** `/guides/how-to-balance-chemical-equations`  |  **Primary:** `how to balance chemical equations` — 22200 US / 1900 AU
**Supporting (US/AU):** balancing chemical equations (49500/1900) · balancing equations (12100/1600) · how to balance chemical equations step by step (880/40) · balanced chemical equation (6600/1900) · how to balance chemical equations easy (390/40) · balancing chemical equations examples (880/70) · law of conservation of mass (n/a/2900) · coefficients and subscripts (n/a/30)

| | Before | After |
|---|---|---|
| Title | Balancing Chemical Equations Cheat Sheet \| ChemGames | How to Balance Chemical Equations: Steps & Cheat Sheet (54) |
| Meta | Applying the Law of Conservation of Mass so atom counts match on both sides. | How to balance chemical equations step by step: count atoms, adjust coefficients (never subscripts), check both sides. Examples and practice problems. (150) |
| H1 | Balancing Chemical Equations | How to Balance Chemical Equations (Step-by-Step Cheat Sheet) |

**H2 outline**
1. The law of conservation of mass — why equations must balance
2. How to balance a chemical equation in 4 steps
3. Worked example: H₂ + O₂ → H₂O
4. Coefficients vs subscripts: the golden rule
5. Balancing equations with polyatomic ions and brackets
6. Tips for balancing quickly (odd–even trick, balance O and H last)
7. Practice problems with answers (10 equations drawn from the Reaction Balancer library)
8. Practise in the game
9. FAQ

**FAQ**
- What are the steps to balance a chemical equation?
- Why do chemical equations need to be balanced?
- Can you change subscripts when balancing an equation?
- How do you balance equations with polyatomic ions?
- What is the easiest way to balance chemical equations?

**Internal links to add:** `/games/reaction-balancer`, `/cheat-sheets/reaction-types`, `/cheat-sheets/chemical-formulas`, `/cheat-sheets`
**Schema:** HowTo (steps) + Article; BreadcrumbList; FAQPage
**SERP (measured):** article/video (cached 03: 3× YouTube, labxchange, chadsprep, khanacademy video, reddit, instructables '7 steps', pasco 'rules'); AI overview + PAA + Q&A — AI overview: true, featured snippet: false
**Content gaps:** 611 SSR chars, one worked example. The SERP rewards numbered steps + multiple worked examples + a rules list; add HowTo schema. Fold the map's separate 'practice problems' page (P1) in as an H2 with answers until a dedicated page exists.
**Notes:** Highest-value keyword on the site with real AU demand (22,200 US / 1,900 AU). Map primary 'balancing equations chemistry' (49,500) is the same cluster head — 'how to' phrasing is the honest intent for a cheat sheet. Also absorbs /guides/balancing-chemical-equations-practice (P1, exists=true in map). SERP skipped (cached).

### /cheat-sheets/reaction-types  ·  guide  ·  P2
**Map row:** `/guides/types-of-chemical-reactions-guide`  |  **Primary:** `types of chemical reactions` — 18100 US / 1600 AU
**Supporting (US/AU):** 5 types of chemical reactions (1300/40) · five types of chemical reactions (1600/40) · types of chemical reactions examples (390/10) · 4 types of chemical reactions (480/40) · what are the 5 types of chemical reactions (720/10) · synthesis reaction (n/a/720) · decomposition reaction (n/a/1000) · combustion reaction (27100/2900)

| | Before | After |
|---|---|---|
| Title | Types of Chemical Reactions Cheat Sheet \| ChemGames | Types of Chemical Reactions Cheat Sheet (With Examples) (55) |
| Meta | Identifying Synthesis, Decomposition, Combustion, and Neutralisation reactions. | Types of chemical reactions cheat sheet: synthesis, decomposition, replacement, combustion and neutralisation, with general forms and balanced examples. (152) |
| H1 | Types of Chemical Reactions | Types of Chemical Reactions Cheat Sheet |

**H2 outline**
1. The main types of chemical reactions at a glance (table: type, general form, example)
2. Synthesis reactions
3. Decomposition reactions
4. Single replacement reactions
5. Double replacement (incl. precipitation) reactions
6. Combustion reactions
7. Acid-base (neutralisation) reactions
8. Redox reactions (brief)
9. How to identify the type of a reaction (flowchart)
10. Practise: balance one of each type in Reaction Balancer
11. FAQ

**FAQ**
- What are the 5 types of chemical reactions?
- What are the 4 types of chemical reactions?
- How do you identify the type of a chemical reaction?
- Is combustion a synthesis reaction?
- What type of reaction is HCl + NaOH?

**Internal links to add:** `/games/reaction-balancer`, `/games/neutralise`, `/cheat-sheets/balancing-equations`, `/cheat-sheets/acids-and-bases`, `/cheat-sheets`
**Schema:** Article (LearningResource); BreadcrumbList; FAQPage
**SERP (measured):** article (cached 03: wikipedia, khanacademy, chemistrytalk, pearson, byjus, quizlet, thoughtco); AI overview + PAA + video — AI overview: true, featured snippet: false
**Content gaps:** Covers 4 types; US searchers expect 5 (synthesis, decomposition, single/double replacement, combustion). The Reaction Balancer already tags 8 types with 34 named reactions — pull one worked example per type from it. 590 SSR chars → target 800+.
**Notes:** Map row is exists=partial ('core reaction-type guide'); reconcile it to this live slug. 'combustion reaction' (27,100/2,900) is a separate planned guide (P3) — keep it as a section here, not the primary. SERP skipped (cached).

### /cheat-sheets/chemical-bonds  ·  guide  ·  P2
**Map row:** `/guides/bonding-cheat-sheet`  |  **Primary:** `ionic vs covalent bonds` — 33100 US / 1300 AU
**Supporting (US/AU):** ionic and covalent bonds (8100/720) · covalent vs ionic compounds (33100/1300) · how to tell ionic vs covalent (110/10) · difference between ionic and covalent bonds (8100/480) · covalent bonding (90500/6600) · ionic bonding (33100/3600) · valence electrons (60500/2400) · types of chemical bonds (6600/480)

| | Before | After |
|---|---|---|
| Title | Chemical Bonds & Structure Cheat Sheet \| ChemGames | Ionic vs Covalent Bonds: Differences, Examples & Cheat Sheet (60) |
| Meta | Understanding how atoms share or transfer electrons to form stable compounds. | Ionic vs covalent bonds cheat sheet: electron transfer vs sharing, how to tell them apart, properties compared side by side, with NaCl and CO2 examples. (152) |
| H1 | Chemical Bonds & Structure | Ionic vs Covalent Bonds: Chemical Bonding Cheat Sheet |

**H2 outline**
1. What is a chemical bond? (valence electrons, full outer shell)
2. Ionic bonds (metal + non-metal, electron transfer, NaCl)
3. Covalent bonds (non-metals share electrons, CO₂, H₂O)
4. Ionic vs covalent bonds compared (table: electrons, elements, melting point, conductivity, solubility)
5. How to tell if a bond is ionic or covalent (metal/non-metal rule, electronegativity)
6. Is H₂O ionic or covalent? — and 10 other common compounds
7. Metallic bonds (brief)
8. Molecular structure basics (link to Bond Builder once the route exists)
9. FAQ

**FAQ**
- How do you know if a bond is ionic or covalent?
- How can I remember the difference between ionic and covalent bonds?
- Is H2O a covalent or ionic compound?
- What is the difference between ionic, covalent and coordinate bonds?
- What are 5 examples of ionic and covalent compounds?

**Internal links to add:** `/cheat-sheets/chemical-formulas`, `/cheat-sheets/states-of-matter`, `/games/formula-blaster`, `/cheat-sheets`
**Schema:** Article (LearningResource); BreadcrumbList; FAQPage
**SERP (measured):** article: chemistrytalk, reddit, libretexts, pearson, quizlet, giroscience, labxchange, study.com; AI overview + PAA + Q&A + video — AI overview: true, featured snippet: false
**Content gaps:** 704 SSR chars, two examples. SERP top-10 all carry a comparison table and a 'how to tell' section — add both plus the H₂O/common-compounds section (direct PAA match). Do not link the 404 /games/chemical-bonds until it ships.
**Notes:** Map row is Later/Skip with primary '10 examples of ionic compounds in everyday life' (50) — rejected. The 33,100 'ionic vs covalent' cluster was assigned to the planned /games/covalent-ionic-bonds-game (P1), but stage 6 measured that SERP as article format, so the live cheat sheet is the honest home; retarget the planned game to 'ionic vs covalent quiz/game'.

### /cheat-sheets/chemical-formulas  ·  guide  ·  P3
**Map row:** `/guides/writing-chemical-formulas-practice`  |  **Primary:** `how to write a chemical formula` — 1300 US / 140 AU
**Supporting (US/AU):** writing chemical formulas (880/110) · how to write chemical formula for ionic compounds (140/10) · chemical formula (90500/1600) · polyatomic ions list (18100/480) · chemical formulas list (n/a/20) · how do you write the chemical formula of a compound (210/10) · chemical formula examples (n/a/70) · subscripts in chemical formulas (n/a/10)

| | Before | After |
|---|---|---|
| Title | Writing Chemical Formulas Cheat Sheet \| ChemGames | How to Write a Chemical Formula: Rules & Cheat Sheet (52) |
| Meta | Translating chemical names into standardized symbolic formulas. | How to write a chemical formula: cation first, balance the charges, add subscripts and brackets for polyatomic ions. Rules, examples and an ion list. (149) |
| H1 | Writing Chemical Formulas | How to Write a Chemical Formula (Cheat Sheet) |

**H2 outline**
1. What a chemical formula tells you (symbols, subscripts, example)
2. How to write a chemical formula in 4 steps (criss-cross method)
3. Writing formulas for ionic compounds
4. Writing formulas for covalent compounds (prefixes)
5. Polyatomic ions you need to know (table of ~15)
6. Brackets and subscripts: Ca(OH)₂ explained
7. Common chemical formulas list (20 from the compound library)
8. Practise with Formula Blaster
9. FAQ

**FAQ**
- What is an example of a chemical formula?
- How do I write a chemical formula for a compound?
- What order do you write the elements in a chemical formula?
- How do you write a formula with a polyatomic ion?
- How do you work out a chemical formula from the charges?

**Internal links to add:** `/games/formula-blaster`, `/cheat-sheets/chemical-bonds`, `/cheat-sheets/balancing-equations`, `/cheat-sheets`
**Schema:** HowTo + Article; BreadcrumbList; FAQPage
**SERP (measured):** article/how-to: nde-ed, wikipedia, my-gcsescience 'top tips', ck12, slideshare, libretexts ionic formulas + 2 YouTube; AI overview + PAA + Q&A + video — AI overview: true, featured snippet: false
**Content gaps:** 648 SSR chars, two examples. Needs the numbered method, an ionic vs covalent split, a polyatomic ion table ('polyatomic ions list' 18,100/480) and a formulas list. HowTo schema fits the SERP.
**Notes:** Nearest map row is a P3 guide (not built) with the unwinnable head 'chemical formula' (90,500); the 'how to write' cluster (1,300/140, kd 12) is the honest target. /games/chemical-formulas-practice (P1) was reconciled to Formula Blaster instead.

### Utility pages

| Page | Recommendation |
|---|---|
| `/auth` | noindex,follow — login form; keep out of the index, give it a unique <title> ('Log in \| ChemGames') so it never duplicates the homepage. |
| `/profile` | noindex,follow — auth-gated, renders the login form; same as /auth. Remove from any sitemap. |
| `/leaderboards` | noindex,follow until real data replaces the hardcoded demo scores; remove the dead 'Bond Builder' tab; keep internal links to the 4 live games. |
---

## 4. Site-wide findings

### 4.1 Title and meta patterns
- **11 of 17 pages share one title and one meta description** today. The spec gives every page a unique pair. Pattern used: games → `{Keyword}: {Game name} | ChemGames`; hubs → `{Keyword} | ChemGames`; cheat sheets → `{Keyword} Cheat Sheet: {benefit}` (brand dropped where it would push past 60 chars — the six sheets are 52–60 chars without it).
- Recommended titles are 51–60 chars; metas 143–155 chars (checked by script). Each title opens with the primary keyword or the game name, never with "ChemGames" except the homepage.
- The AU/UK vs US spelling split ("Neutralise!", "neutralisation" vs "neutralization") is handled by keeping the AU spelling in product names and Year 9/10 labels and using the US spelling in keyword-bearing copy at least once per page.

### 4.2 Missing H1s and placeholder H1s
`/games/neutralise` and `/games/reaction-balancer` render no `<h1>`; `/games/formula-blaster`'s H1 is `Find: Loading...`. All three need a static, server-rendered H1 above the canvas; the dynamic target/level readouts should move to `<p aria-live="polite">` or an H2.

### 4.3 Schema (none exists today)
| Page group | Add |
|---|---|
| Every page | `BreadcrumbList` |
| `/` | `WebSite` + `Organization`, `ItemList` of the 4 games |
| `/games`, `/cheat-sheets` | `CollectionPage` + `ItemList` |
| 4 game pages | `VideoGame` (`applicationCategory: EducationalApplication`, `isAccessibleForFree: true`, `educationalLevel`), optionally `LearningResource` |
| 6 cheat sheets | `Article`/`LearningResource`; `HowTo` on balancing-equations and chemical-formulas |
| Any page that gets the FAQ block | `FAQPage` (mirror the on-page questions exactly) |
| `/games/reaction-balancer` | `ItemList` of the 34 reactions once they are server-rendered |

### 4.4 Internal-link gaps (the biggest structural defect)
- **All four game pages have zero outbound internal links** (`internal_links_out: []`). Every cheat sheet links only to `/cheat-sheets`. There is not a single game ↔ cheat-sheet link on the site. The spec adds the pairs below; each pair should be a visible "Learn the theory / Practise this" module, not a footer link.

| Game | Paired cheat sheet(s) |
|---|---|
| `/games/acid-classification` | `/cheat-sheets/acids-and-bases` (+ `/games/neutralise`) |
| `/games/neutralise` | `/cheat-sheets/acids-and-bases`, `/cheat-sheets/reaction-types` |
| `/games/reaction-balancer` | `/cheat-sheets/balancing-equations`, `/cheat-sheets/reaction-types`, `/cheat-sheets/chemical-formulas` |
| `/games/formula-blaster` | `/cheat-sheets/chemical-formulas`, `/cheat-sheets/chemical-bonds` |
| (no game) | `/cheat-sheets/states-of-matter` → link to Reaction Balancer for state symbols |

- The homepage omits Reaction Balancer from its featured cards (the deepest game on the site) and shows a leaderboard tab for the dead "Bond Builder".
- `/games` links to `/games/chemical-bonds`, which 404s. Remove the card and the leaderboard tab until the route ships; do not link it from `/cheat-sheets/chemical-bonds` either.
- `04_internal_links.csv` has no rows for `/`, and its rows for the reconciled pages point at planned guides (`/guides/acids-and-bases-basics`, `/guides/types-of-chemical-reactions-guide`, `/tools/chemical-equation-balancer`) that do not exist. The spec maps each to the nearest live page; when those guides are built, the links should be re-pointed.

### 4.5 Cannibalisation risks
| Pair | Risk | Resolution in this spec |
|---|---|---|
| `/` vs `/games` (vs planned `/games/chemistry-games-for-high-school`) | Three pages on "chemistry games" | `/games` owns "chemistry games" (1900/170); `/` takes brand + "online chemistry games"; retarget the planned page to "chemistry games for high school" only |
| `/games/reaction-balancer` vs `/cheat-sheets/balancing-equations` | Same cluster, both P1 | Game = "practice / game" intent (tool SERP); sheet = "how to" intent (article/video SERP). Keep the how-to H2 on the game page short and link to the sheet |
| `/cheat-sheets/acids-and-bases` vs `/games/acid-classification` vs `/games/neutralise` | Acids-and-bases cluster | Reference head ("acids and bases") · quiz ("acids and bases quiz") · neutralization ("acid base neutralization reaction") — three distinct intents |
| `/cheat-sheets` vs planned `/guides/chemistry-formulas-cheat-sheet` | Map gives "chemistry cheat sheet" to the planned page | Live hub owns it; retarget planned page to "chemistry formulas cheat sheet" (140/10) |
| `/cheat-sheets/chemical-bonds` vs planned `/games/covalent-ionic-bonds-game` | Map gives the 33,100 cluster to an unbuilt game whose SERP is article-format | Live sheet owns "ionic vs covalent bonds"; planned game should target "ionic vs covalent quiz/game" |
| `/cheat-sheets/reaction-types` vs `/guides/types-of-chemical-reactions-guide` | Same page under two slugs | Mark the map row `exists_on_site=true` at the live slug |
| `/cheat-sheets/chemical-formulas` vs `/games/formula-blaster` | Formulas cluster | How-to vs quiz — distinct |

### 4.6 SERP format and AI-overview exposure
- **AI overviews appear on 10 of the 13 primary SERPs.** The three without: "naming compounds quiz" (Formula Blaster), "chemistry games" (`/games`) and "chemistry cheat sheet" (`/cheat-sheets`). The two game SERPs that are 100% quiz/tool results (acids and bases quiz, naming compounds quiz) are the site's cleanest format matches — the interactive pages are the AIO-resistant wedge.
- **Article-format SERPs with AIO** cover every cheat sheet and `/games/neutralise`. Those pages need 600–900 words, a comparison table and the PAA-driven FAQ to have a chance; the thin 150-word template cannot compete.
- No featured snippets were measured on any of the 13 SERPs (cached or fresh).

### 4.7 Locale
AU demand is real for the cheat sheets — states of matter 3,600, how to balance chemical equations 1,900, acids and bases 1,600, types of chemical reactions 1,600, ionic vs covalent bonds 1,300 — while the game keywords are almost entirely US. The "Year 9 / Year 10" labels are an AU asset; keep them and add "(high school)" alongside for US readers rather than replacing them.

### 4.8 Technical prerequisites (from Stage 1, restated because the spec depends on them)
No sitemap, no robots.txt, no canonicals, no og:/twitter: tags, `*.vercel.app` preview domain. None of the per-page work will index reliably until a custom domain, canonicals and a sitemap exist.

---

## 5. Implementation order

Ordered by priority tier, then primary US volume. Effort is a rough size of the copy/structure work per page.

| # | Page | Tier | Primary (US/AU) | Effort | Why now |
|---|---|---|---|---|---|
| 1 | `/cheat-sheets/balancing-equations` | P1 | how to balance chemical equations (22200/1900) | M | Highest honest volume on the site with real AU demand; HowTo schema + practice section |
| 2 | `/games/reaction-balancer` | P1 | balancing chemical equations practice (5400/210) | M | No H1; exposing the 34-reaction table creates 34 long-tail entry points |
| 3 | `/games` | P1 | chemistry games (1900/170) | S | Low-KD portal SERP; also fixes the 404 card |
| 4 | `/cheat-sheets` | P1 | chemistry cheat sheet (720/70) | S | Hub; AIO-free SERP; add print/PDF |
| 5 | `/games/formula-blaster` | P1 | naming compounds quiz (210/10) | S | Placeholder H1; AIO-free all-tool SERP |
| 6 | `/games/acid-classification` | P1 | acids and bases quiz (170/20) | S | Map's top-scored page; all-quiz SERP |
| 7 | `/` | P1 | online chemistry games (170/20) | S | Unique title/meta, add Reaction Balancer, remove Bond Builder tab |
| 8 | `/cheat-sheets/states-of-matter` | P2 | states of matter (40500/3600) | L | Largest AU volume; needs a full rewrite to article depth |
| 9 | `/cheat-sheets/chemical-bonds` | P2 | ionic vs covalent bonds (33100/1300) | L | Comparison table + "how to tell" section match the PAA exactly |
| 10 | `/cheat-sheets/acids-and-bases` | P2 | acids and bases (18100/1600) | L | Strong/weak lists already exist in the compound data (pKa/pKb) |
| 11 | `/cheat-sheets/reaction-types` | P2 | types of chemical reactions (18100/1600) | M | Expand 4 → 6 types using the balancer's library |
| 12 | `/games/neutralise` | P2 | acid base neutralization reaction (1900/110) | M | No H1; article SERP means a 300–400-word explainer is mandatory |
| 13 | `/cheat-sheets/chemical-formulas` | P3 | how to write a chemical formula (1300/140) | M | HowTo + polyatomic ion table |
| — | `/auth`, `/profile`, `/leaderboards` | n/a | — | XS | `noindex,follow`; unique titles |

**Quick wins that cut across the order:** (a) unique `<title>`/meta on all 13 pages in one pass, (b) static H1s on the three broken game pages, (c) remove the two references to the 404 `/games/chemical-bonds`, (d) the game ↔ cheat-sheet link module on all 10 content pages, (e) `BreadcrumbList` everywhere. Those five items alone address every defect in the Stage 1 "Technical SEO state" table except the missing sitemap/canonicals/domain.

---

## 6. Implementation log (2026-08-26)

Spec implemented in the Next.js 16 app (`bun run build` and `bun run lint` green; every route verified against a production server).

**Cross-cutting (Phase A)**
- Unique `<title>` / meta description / canonical / Open Graph / Twitter on every page from `src/lib/seo/pages.ts` (titles 51–60, metas 143–155 chars, machine-checked). `metadataBase` reads `NEXT_PUBLIC_SITE_URL` (fallback `https://chem-games-seven.vercel.app`). `/auth`, `/profile`, `/profile/edit`, `/leaderboards` are `noindex,follow` with unique titles.
- Static server-rendered H1 on all four game pages (`GamePageHeader`); the `GamesHeader` task readout ("Find: …") is now a `<p aria-live="polite">`. Recommended H1 applied on all 13 content pages.
- Both `/games/chemical-bonds` references removed (`/games` card, "Bond Builder" leaderboard tab via `ACTIVE_GAMES`); Reaction Balancer added to the homepage cards; `Games` nav item now points at `/games`.
- Game ↔ cheat-sheet link module (`LearnPractiseLinks`) on all 4 games and 6 sheets using the §4.4 pairs; visible breadcrumbs everywhere.
- `app/robots.ts` (disallows the 3 utility pages) and `app/sitemap.ts` (13 content URLs).
- JSON-LD per §4.3 via `JsonLd`: BreadcrumbList on every page; WebSite + Organization + ItemList (home); CollectionPage + ItemList (hubs); VideoGame + LearningResource (games, `EducationalApplication`, `isAccessibleForFree`); Article + LearningResource (sheets); HowTo on balancing-equations and chemical-formulas; ItemList of the reactions on Reaction Balancer; FAQPage generated from the same array that renders the on-page FAQ.
- Print stylesheet (white palette, chrome hidden) for the cheat sheets.

**Per-page content (Phase B)** — `src/content/{games,cheat-sheets}/*.tsx`, H2 outline + FAQ per row of the CSV: balancing-equations (4-step HowTo, 3 worked examples, 10 practice problems with answers), reaction-balancer (full reaction table server-rendered from `reactions.ts`, by-type sections, common mistakes), formula-blaster and acid-classification (35-compound tables classified by the game's own `evaluateChemical`, strong/weak lists, pH chart), neutralise (explainer + 10-example table), states-of-matter, chemical-bonds and acids-and-bases (comparison tables, strong/weak lists from `compounds.ts`), reaction-types (7 types with examples from the reaction library), chemical-formulas (criss-cross HowTo, 15 polyatomic ions, 20-formula list). Server-rendered word counts now 1,400–2,500 per content page (was 100–700 chars).

**Deviations from the spec**
- The reaction library holds **30** reactions, not 34; copy, meta and schema use 30.
- `/profile` redirects to `/auth` when signed out, so its canonical only appears for signed-in users.
- Site-wide `title.template` not used: the spec's titles are complete strings, so each page sets its title verbatim.
- Custom domain, DNS and deploy are not part of this change (see §4.8).
