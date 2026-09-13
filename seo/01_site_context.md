# Stage 1 — Site Context Handoff: ChemGames

**Site:** https://chem-games-seven.vercel.app/
**Scraped:** 2026-08-26
**Raw HTML:** `/Users/jasper/Desktop/chem-games/seo/raw/` (17 pages + 20 JS chunks in `raw/js/`)
**Structured inventory:** `/Users/jasper/Desktop/chem-games/seo/01_site_pages.json`
**Crawl result:** 17/17 pages fetched successfully (16 via BFS crawl + `/profile` probed directly). 28 additional candidate routes probed; all 404 except `/profile`. Zero fetch failures.

---

## 1. Site summary

**What it is.** ChemGames is a small, single-purpose interactive chemistry learning web app: a set of browser-based mini-games ("experiments") plus a set of short reference pages ("Lab Cheat Sheets"). The framing is a virtual laboratory — you play experiments, earn scores, and compare them on global leaderboards. Tagline in the H1: *"Learn chemistry by playing."* Meta description: *"Master chemistry concepts through fun, visual, and interactive mini-games and reference guides."* Footer strapline: *"ChemGames — Making chemistry visual, playful, and intuitive."*

**Who it's for.** Secondary-school chemistry students, roughly ages 14–16. This is stated explicitly and unambiguously in the cheat-sheet taxonomy, which tags every reference page as **Year 9** or **Year 10** (Year 9 Fundamentals, Year 9 Acids & Bases, Year 10 Equations, Year 10 Reactions). The content depth confirms it: pH scale basics, ionic vs covalent bonding, conservation of mass, four reaction types. Nothing here reaches AP/IB/college level — no equilibrium, no thermodynamics, no kinetics, no organic chemistry, no gas laws, no stoichiometric mass calculations.

**⚠️ Locale mismatch — important for the keyword agent.** The site is written in **British/Australian English against an AU/UK curriculum**, but the brief for this pipeline specifies **US-market phrasing**. Evidence: "Year 9"/"Year 10" (AU/UK) rather than "8th grade"/"9th grade"/"high school chemistry" (US); spellings "Neutralise!", "Neutralisation", "Aluminium", "oxidised", "standardised". Note that the JS also contains US spellings in places ("Aluminum Chloride Synthesis", "Hydrochloric Acid Neutralization"), so the codebase is already inconsistent. **Recommendation for the next agent:** research US phrasing as instructed (US search volume dwarfs AU/UK for these terms), but flag to the site owner that on-page copy currently uses AU/UK conventions and either the copy or the target market needs to change. If AU is the real target, a parallel AU-locale run (`location_code: 2036`) on "Year 9 / Year 10 chemistry" phrasing would be worth costing.

**Tone.** Playful arcade-lab. Games are framed as "experiments", users as "scientists", the leaderboard as "Top scientists / Global network". Copy is punchy and imperative: "Pop target compounds before they escape", "Defend the lab from molecule invaders", "Choose an experiment to begin". Visually it's a dark slate/blue UI with heavy uppercase black type.

**Monetisation.** **None visible.** No pricing page, no ads, no affiliate links, no donation prompt, no premium tier, no paywall. Every game is fully free and playable without an account. The only account benefit is progress-saving and leaderboard placement. There is a "Feedback" widget in the footer of every page. Treat this as a pre-monetisation product — commercial-intent keywords are low priority; top-of-funnel volume and teacher/classroom discovery are the realistic goals.

**Tech stack.** Next.js App Router (React Server Components, Turbopack build) deployed on **Vercel**, on the default `*.vercel.app` preview-style domain. Tailwind CSS v4 (`bg-(--background)` CSS-variable syntax), `lucide-react` icons. Auth is **Supabase** (Google OAuth + email/password) — and the JS bundle contains the strings *"Authentication client is currently unconfigured"* and *"Authentication needs Supabase credentials"*, so **login is not actually wired up in this deployment**. Leaderboard entries ("A. Curie", "Molecule Maven", "Ion Pilot") are hardcoded demo data. This is a demo/MVP build, not a live production property.

### Technical SEO state — critical context for keyword targeting

This site is currently **incapable of ranking** for anything. The next agent should know that keyword targets here are aspirational, not gap-analysis against existing rankings.

| Issue | Detail |
|---|---|
| No sitemap | `/sitemap.xml` → 404 |
| No robots.txt | `/robots.txt` → 404 |
| No canonical tags | Zero `<link rel="canonical">` on any page |
| No structured data | Zero JSON-LD anywhere (no `VideoGame`, `LearningResource`, `Quiz`, `FAQPage`, `BreadcrumbList`) |
| **Duplicate titles** | 11 of 17 pages share the identical title `ChemGames \| Interactive Chemistry Learning`. Only the 6 cheat-sheet detail pages have unique titles. Homepage, `/games`, and all 4 playable game pages are title-duplicated. |
| **Duplicate meta descriptions** | Same 11 pages share the identical description. Only cheat-sheet details differ. |
| Missing H1s | `/games/neutralise` and `/games/reaction-balancer` render no `<h1>` at all |
| Placeholder H1 | `/games/formula-blaster` H1 is literally `Find: Loading...` |
| Thin SSR content | Game pages ship 101–375 chars of server-rendered text; cheat sheets 575–704 chars. Nothing exceeds ~1,400 chars. |
| **Broken internal link** | `/games/chemical-bonds` is linked from `/games` and referenced as "Bond Builder" on the leaderboard, but returns **404** |
| No og:/twitter: tags | No social meta on any page |
| Preview domain | `*.vercel.app` — no custom domain, minimal trust/authority signal |
| Legacy meta keywords | `chemistry,education,games,molecules,reactions,titration,high school chemistry` — note **"titration"** appears here but **no titration content exists anywhere on the site** (stale intent signal) |

---

## 2. Full page inventory

| URL | Type | Title | H1 | Topic | Notes |
|---|---|---|---|---|---|
| `/` | homepage | ChemGames \| Interactive Chemistry Learning | Learn chemistry by playing. | Chemistry games hub | Dashboard layout: Profile card, Leaderboards card, 3 featured game cards. H2s: Profile, Leaderboards, Top scientists, Interactive Mini-Games |
| `/games` | game-category | ChemGames \| Interactive Chemistry Learning *(dupe)* | Games | All games index | "Choose an experiment to begin." Lists all 5 games as H2 cards |
| `/games/acid-classification` | game | *(dupe)* | Acid, Base or Neutral? | Acids/bases, pH, classification | Client-rendered. 124 chars SSR. Lives system, hint lightbulb |
| `/games/formula-blaster` | game | *(dupe)* | **Find: Loading...** | Chemical formulas, compound ID | Client-rendered. 101 chars SSR. 45-second timer, bubble-popping |
| `/games/neutralise` | game | *(dupe)* | **(none)** | Acid-base neutralisation, ions | Client-rendered. 150 chars SSR. Wave-based, H⁺/OH⁻ ion cannon |
| `/games/reaction-balancer` | game | *(dupe)* | **(none)** — H2 "Water Synthesis" | Balancing equations, stoichiometry | Client-rendered. 375 chars SSR. Coefficient stepper + atom-balance panel |
| `/games/chemical-bonds` | game | — | — | Bonding, molecular structure | **404 — BROKEN.** Linked from `/games`; leaderboard calls it "Bond Builder" |
| `/cheat-sheets` | guide | *(dupe)* | Lab Cheat Sheets | Reference hub | "Quick chemical formulas, reaction rules, and equation references grouped by year level." 6 H3 cards |
| `/cheat-sheets/states-of-matter` | guide | States of Matter Cheat Sheet \| ChemGames | States of Matter | Phase changes, particle model | Year 9 Fundamentals. 3 key concepts + H₂O(l)/(s)/(g) |
| `/cheat-sheets/acids-and-bases` | guide | Acids & Bases Cheat Sheet \| ChemGames | Acids & Bases | pH scale, H⁺/OH⁻ | Year 9 Acids & Bases. HCl, NaOH, H₂SO₄ examples |
| `/cheat-sheets/balancing-equations` | guide | Balancing Chemical Equations Cheat Sheet \| ChemGames | Balancing Chemical Equations | Conservation of mass | Year 10 Equations. "Adjust coefficients, NEVER subscripts" |
| `/cheat-sheets/reaction-types` | guide | Types of Chemical Reactions Cheat Sheet \| ChemGames | Types of Chemical Reactions | Reaction classification | Year 10 Reactions. Synthesis / Decomposition / Neutralisation / Combustion |
| `/cheat-sheets/chemical-bonds` | guide | Chemical Bonds & Structure Cheat Sheet \| ChemGames | Chemical Bonds & Structure | Ionic vs covalent, valence | Year 9 Fundamentals. CO₂ covalent, NaCl ionic |
| `/cheat-sheets/chemical-formulas` | guide | Writing Chemical Formulas Cheat Sheet \| ChemGames | Writing Chemical Formulas | Nomenclature → formula | Year 10 Equations. Polyatomic ions, brackets, CaCO₃, Al₂O₃ |
| `/leaderboards` | other | *(dupe)* | Leaderboards | High scores | Tabs for all 5 games (incl. "Bond Builder"). Hardcoded demo scores |
| `/auth` | other | *(dupe)* | Welcome back | Login / register | Supabase, currently unconfigured |
| `/profile` | other | *(dupe)* | Welcome back | Profile (auth-gated) | Renders the login form when logged out. Not in nav; found by probe |

**Counts:** 1 homepage · 1 game-category hub · 5 games (4 playable, 1 broken) · 7 guides (1 hub + 6 detail) · 3 other (leaderboards, auth, profile). **No blog. No about page. No privacy/terms. No contact page.**

---

## 3. Game inventory

Extracted from server-rendered HTML plus the JS chunks in `raw/js/` (the extension for the browser-render endpoint was down, so game data was mined from the bundles directly — this actually yielded the full underlying content libraries).

| Game | URL | Chemistry topic | Mechanic | Audience | Free/paid | Content depth found in bundle |
|---|---|---|---|---|---|---|
| **Acid or Base?** (H1: "Acid, Base or Neutral?") | `/games/acid-classification` | Acids, bases, neutral salts, pH, pKa/pKb | Timed **classification quiz** — 3-way sorting (Acid / Neutral / Base) of a shown formula; 3 lives; optional hint reveals chemical name | Year 9–10 / US middle→high school | Free | ~35-compound library with `pKa`, `pKb`, `molarMass`, `stateAtRoomTemp`, `difficulty` 1–5 |
| **Formula Blaster** | `/games/formula-blaster` | Chemical formulas, compound recognition, ion identification | **Timed arcade / bubble-shooter** — 45-second countdown, pop floating bubbles matching a target molecule, 3 hits per target, 3 targets per level | Year 9–10 | Free | Same compound library. "Find and pop bubbles matching the target molecule shown in the header." Mis-tap reveals which element to look for |
| **Neutralise!** | `/games/neutralise` | Acid–base neutralisation, H⁺/OH⁻ ions | **Tower-defense / space-invaders** — move an ion cannon, toggle between H⁺ and OH⁻ ammunition, fire at descending molecules; waves (1/3), cleared-count, 3 lives; keyboard + mouse | Year 9–10 | Free | "Defend the lab from incoming chemical hazards!" Correct ion must match the incoming compound's acid/base character |
| **Reaction Balancer** | `/games/reaction-balancer` | Balancing chemical equations, stoichiometric coefficients, reaction types | **Stepper puzzle** — increment/decrement coefficients until atom counts match; expandable "Atom Balance" inventory panel; "Check Answer"; per-level hints | Year 10 (deepest content on the site) | Free | **34 named real-world reactions** across 8 types and 4 difficulty tiers |
| **Chemical Bonds / "Bond Builder"** | `/games/chemical-bonds` | Bonding, molecular structure, valence | Unknown — card says "Explore molecular structures and atomic bonding" | Year 9 | Free | **Page 404s.** Only the leaderboard tab and the `/games` card exist. Molecular-geometry data (`atoms`/`bonds`/`order` for H₂, O₂, N₂, Cl₂, H₂O, HCl, CO₂, CH₄, NH₃, O₃, SO₂, H₂O₂) IS present in the bundle, so the renderer exists but the route is unbuilt |

### Reaction Balancer content library (34 equations — the richest asset on the site)

**Types:** Synthesis · Decomposition · Combustion · Single Replacement · Double Replacement · Precipitation · Redox · Acid-Base
**Difficulty tiers:** intro · beginner · intermediate · advanced

Water Synthesis · Hydrogen Chloride Synthesis · Aluminum Chloride Synthesis · Ammonium Chloride Formation · Bleach Synthesis · Ozone Formation · Limestone Decomposition · Carbonic Acid Decomposition · Hydrogen Peroxide Decomposition · Water Electrolysis · Methane Combustion · Propane Combustion · Octane Combustion · Ethanol Combustion · Magnesium Combustion · Incomplete Carbon Combustion · Iron Rusting · Thermite Reaction · Golden Rain Reaction · Silver Chloride Precipitation · Copper and Silver Nitrate · Sodium in Water · Magnesium in Sulfuric Acid · Hydrochloric Acid Neutralization · Baking Soda and Vinegar · Haber Process · Ostwald Process (Step 1) · Contact Process (Step 2) · Photosynthesis · Cellular Respiration

**Why this matters for keywords:** each of these is a recognisable, individually-searched query ("how to balance the combustion of methane", "thermite reaction equation", "photosynthesis balanced equation"). This library is a ready-made content cluster the site is currently not exposing to search at all — every one of them lives inside a JS bundle behind a client-rendered page with no H1.

### Compound library (~35 named compounds, shared across three games)

Acids: HCl, HBr, HI, HF, HNO₃, HNO₂, H₂SO₄, H₂SO₃, H₃PO₄, H₂CO₃, HClO₄, H₃BO₃, H₄SiO₄
Bases: NaOH, KOH, LiOH, CsOH, Ba(OH)₂, NH₃, N₂H₄
Salts/neutral: NaCl, KCl, LiCl, CaCl₂, MgCl₂, Na₂SO₄, NaNO₃, KNO₃, NaHCO₃, KHCO₃, NaHSO₄, Na₂HPO₄, NaH₂PO₄, NaHS, H₂O
Each carries `pKa`/`pKb`, `molarMass`, `stateAtRoomTemp`, `difficulty` 1–5.

---

## 4. Content themes & chemistry topics

### Covered (with real content)

| Topic | Games | Cheat sheets | Overall depth |
|---|---|---|---|
| **Acids, bases, pH** | Acid or Base?, Neutralise! | Acids & Bases | **Strongest theme** — 2 of 4 playable games + a sheet |
| **Chemical formulas / nomenclature** | Formula Blaster | Writing Chemical Formulas | Strong |
| **Balancing equations & coefficients** | Reaction Balancer | Balancing Chemical Equations | Strong (34-equation library) |
| **Reaction types** | Reaction Balancer (8 types tagged) | Types of Chemical Reactions | Strong |
| **Chemical bonding (ionic/covalent), valence** | Chemical Bonds (**404**) | Chemical Bonds & Structure | Sheet only — the game is broken |
| **States of matter / phase changes** | — | States of Matter | Sheet only, no game |
| **Ions & polyatomic ions** | Neutralise!, Formula Blaster | Chemical Formulas (partial) | Implicit, never taught directly |
| **Molecular structure / geometry** | (renderer exists in bundle) | Chemical Bonds (partial) | Data exists, no page surfaces it |

### Obvious gaps (no content at all)

These are the biggest content opportunities and the next agent should treat them as expansion territory, not as things to validate against existing pages:

- **Periodic table** — zero coverage. No element pages, no periodic-table game, no trends (electronegativity, atomic radius, ionization energy). This is by far the highest-volume chemistry-games search territory and the site has nothing.
- **Moles & stoichiometry** — molar masses are in the data but there is no mole game, no mole cheat sheet, no mass-to-mole calculation content.
- **Titration** — appears in the legacy `meta keywords` tag but has **no page, no game, no sheet**.
- **Electron configuration / orbitals / Lewis structures** — none.
- **Gas laws** (Boyle, Charles, ideal gas) — none.
- **Organic chemistry** — none (hydrocarbons appear only as combustion reactants).
- **Solutions, molarity, concentration, dilution** — none.
- **Redox / oxidation numbers** — tagged as a reaction type but never taught.
- **Thermochemistry, equilibrium, kinetics** — none.
- **Element symbols memorisation / flashcards** — none (a very common game format).
- **Lab safety, lab equipment** — none, despite the "lab" theme.
- **Teacher/classroom material** — no lesson plans, worksheets, printables, or "for teachers" page. No about, contact, privacy, or terms page either.

### Existing guide/blog topics

There is **no blog and no article-style content**. The only editorial surface is the 6 "Lab Cheat Sheets", each ~150 words of bullet points:

1. States of Matter *(Year 9 Fundamentals)*
2. Acids & Bases *(Year 9 Acids & Bases)*
3. Chemical Bonds & Structure *(Year 9 Fundamentals)*
4. Balancing Chemical Equations *(Year 10 Equations)*
5. Types of Chemical Reactions *(Year 10 Reactions)*
6. Writing Chemical Formulas *(Year 10 Equations)*

Every sheet follows the same template: badge (year + category) → H1 → one-line summary → **Key Concepts** (3–4 bullets) → **Example Formulas & Reactions** (2–3 worked formulas). This template is a good scaffold for scaled content but each page is far too thin to compete as-is.

---

## 5. Seed keyword suggestions for the next agent

68 seeds, US-market phrasing, grounded in what the site actually has (or has the data to build). Grouped as requested. Items marked **[gap]** have no supporting page yet — include them for opportunity sizing, not for ranking analysis.

### A. Chemistry games — general (11)

1. chemistry games
2. chemistry games for students
3. online chemistry games
4. free chemistry games
5. interactive chemistry games
6. chemistry games for high school
7. chemistry games for middle school
8. fun chemistry games
9. chemistry learning games
10. chemistry review games
11. chemistry games for the classroom

### B. Specific game types & formats (13)

12. chemistry quiz game
13. chemistry matching game
14. chemistry puzzle games
15. chemistry flashcards online **[gap]**
16. chemistry simulation games
17. chemistry arcade game
18. timed chemistry quiz
19. chemistry trivia game
20. chemistry practice games online
21. chemical formula game
22. molecule game online
23. chemistry drag and drop activity
24. chemistry game with leaderboard

### C. Chemistry topics — matched to existing games & sheets (21)

**Acids & bases (strongest on-site theme)**
25. acid base game
26. acids and bases practice
27. pH scale practice game
28. acid or base quiz
29. strong acids and bases list
30. neutralization reaction game
31. acid base neutralization practice

**Balancing equations & reaction types**
32. balancing chemical equations game
33. balancing equations practice
34. balancing equations practice problems with answers
35. how to balance chemical equations
36. chemical equation balancer practice
37. types of chemical reactions game
38. types of chemical reactions practice
39. synthesis decomposition combustion reactions

**Formulas, bonding, states of matter**
40. writing chemical formulas practice
41. naming compounds game
42. chemical formula quiz
43. ionic vs covalent bonds game
44. chemical bonding practice
45. states of matter game

### D. Topic gaps worth sizing (7)

46. periodic table game **[gap]**
47. periodic table quiz **[gap]**
48. element symbols game **[gap]**
49. stoichiometry practice game **[gap]**
50. mole conversion practice **[gap]**
51. titration simulation **[gap]** *(already in the site's meta keywords)*
52. lewis structure practice **[gap]**

### E. Guides / how-to (10)

53. how to balance chemical equations step by step
54. how to write chemical formulas
55. how to tell if a compound is an acid or base
56. chemistry cheat sheet
57. acids and bases cheat sheet
58. chemical reactions cheat sheet
59. chemistry formulas list
60. common polyatomic ions list
61. law of conservation of mass explained
62. ionic vs covalent bonding explained

### F. Blog / education angles (6)

63. best chemistry games for students
64. how to study chemistry effectively
65. chemistry games for teachers **[gap]**
66. gamified chemistry learning
67. chemistry classroom activities **[gap]**
68. how to memorize chemical formulas

### Named-reaction long tails (bonus cluster — from the Reaction Balancer library)

Not counted in the 68, but this cluster is the site's single biggest untapped asset. Each of the 34 equations is an individually-searched query. Suggested probes: *balance the combustion of methane · thermite reaction equation · haber process equation · photosynthesis balanced equation · cellular respiration equation · hydrogen peroxide decomposition equation · baking soda and vinegar reaction equation · iron rusting chemical equation · water electrolysis equation · silver chloride precipitation reaction*.

### Notes for the keyword agent

- **Locale:** brief says US (`location_code: 2840`). Consider a small parallel AU run (`2036`) on "year 9 chemistry" / "year 10 chemistry" phrasing given the site's actual curriculum framing — cheap to test, and it may be the true audience.
- **Intent skew:** no monetisation exists, so weight informational + "practice/play" intent over commercial. Ignore transactional modifiers (buy, pricing, best software).
- **Audience modifiers to layer:** for kids, for students, for high school, for middle school, 8th grade, 9th grade, for teachers, for classroom, online, free, no download, printable.
- **Do not run gap analysis against current rankings.** The site has no sitemap, no canonicals, duplicate titles on 11/17 pages, and sits on a `*.vercel.app` preview domain — it ranks for nothing. Treat every seed as greenfield.

---

## 6. Competitors

**No competitor is named, linked, or referenced anywhere on the site.** There are zero external links, no comparison content, no "alternative to" copy, and no attribution to any other platform. The only third-party services present are infrastructure (Vercel, Supabase, Google OAuth, lucide-react).

**Implied competitive set** (inferred from format and audience, for the next agent to validate against SERPs — not sourced from the site):

- **Free chemistry-game sites:** PhET Interactive Simulations (Colorado) — the dominant free interactive-chemistry incumbent; Legends of Learning; Turtle Diary; Sheppard Software; Funbrain-style education-game portals.
- **Quiz/gamified learning platforms:** Kahoot!, Quizizz, Blooket, Gimkit, Quizlet — direct competitors for the classroom-game and flashcard queries.
- **Chemistry reference/practice sites** (for the cheat-sheet and how-to cluster): ChemLibreTexts, Khan Academy, ChemCollective, Study.com, ChemTeam, Socratic-style Q&A sites.
- **Periodic-table-specific:** Ptable, Periodic Videos, "element quiz" game sites — relevant only if the site builds the missing periodic-table content.

Expect PhET and Khan Academy to dominate the informational SERPs, and Kahoot/Quizizz/Blooket to dominate anything with "classroom" or "for teachers" intent. The realistic wedge for ChemGames is the specific-mechanic long tail — "balancing equations game", "acid or base quiz game", "chemical formula game" — where the site has genuine matching product.

---

## 7. Files produced

- `/Users/jasper/Desktop/chem-games/seo/01_site_context.md` (this document)
- `/Users/jasper/Desktop/chem-games/seo/01_site_pages.json` (17-page structured inventory)
- `/Users/jasper/Desktop/chem-games/seo/raw/*.html` (raw HTML, 17 pages)
- `/Users/jasper/Desktop/chem-games/seo/raw/js/*.js` (20 JS chunks + `_all.js` concatenation — source of the game content libraries)
- `/Users/jasper/Desktop/chem-games/seo/raw/_crawl.json`, `_pages_parsed.json` (crawl intermediates)
