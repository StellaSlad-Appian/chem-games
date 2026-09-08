# 05 — Exact-Match Domain (EMD) Availability Report

**Project:** chem-games SEO · **Generated:** 2026-08-26 · **TLD scope:** `.com` only

---

## 1. Method

**Seeds.** Candidates were generated from the 116 stage-2 page clusters in `02_pages_by_volume.csv`, taking three fields per cluster:

1. the cluster's `primary_keyword`
2. the `page_slug`, de-hyphenated (e.g. `/games/periodic-table-game` → `periodic table game`)
3. the top 5 `supporting_keywords` by US search volume, restricted to phrases of 3 words or fewer

Ten brand-level exact matches were added on top: *chemistry games, chem games, chemistry game, chemgames, chemistry quiz, chemistry quizzes, periodic table game, periodic table games, chemistry practice, chemistry cheat sheet*.

**Shape.** Exact match only — lowercase, ASCII, all spaces and punctuation stripped, no prefixes, suffixes or hyphens. `balancing chemical equations game` → `balancingchemicalequationsgame.com`. Candidates were dropped if the label exceeded 30 characters or the source keyword contained digits or non-ASCII characters.

**Verification.** Three independent layers, in order:

| Layer | Source | Signal |
|---|---|---|
| 1. DNS screen | `NS` then `A` lookups across 8.8.8.8 / 1.1.1.1 / 9.9.9.9 | `resolves` = certainly registered; `nxdomain` = *possibly* free |
| 2. Registry RDAP | `https://rdap.verisign.com/com/v1/domain/{domain}` | HTTP 404 = available, 200 = registered |
| 3. Registry WHOIS | `whois -h whois.verisign-grs.com {domain}` | `No match for domain` = available |

RDAP was run against **every** candidate, not just the DNS-negative ones — and that mattered: `whatischemistry.com` returned `NXDOMAIN` at DNS (no nameservers delegated) but is in fact registered to MarkMonitor since 2005. A DNS-only check would have reported it as a free 18,100/mo domain.

Every candidate then received a WHOIS query as a second registry opinion. **RDAP and WHOIS agreed on all 252 domains** — 228 available / 228 no-match, 24 registered / 24 registered. Every domain in this report therefore carries `rdap+whois` verification; none rest on DNS alone.

**Two implementation notes for anyone re-running this.** Calling Verisign RDAP through `curl_cffi` with Chrome impersonation causes the server to reset the connection on *unregistered* domains instead of returning a clean 404 — plain `httpx` with an `Accept: application/rdap+json` header behaves correctly and was used instead. And bare `whois {domain}` follows the IANA → registrar chain, which silently returns nothing when a registrar's WHOIS server is down (this happened on `periodictablequiz.com`); querying `whois.verisign-grs.com` directly avoids that failure mode.

---

## 2. Counts

| Metric | Count |
|---|---|
| Seed keywords extracted from clusters + brand list | 341 |
| Seeds skipped at generation (too long / digits / non-ASCII) | 54 |
| Unique exact-match labels after dedupe | 252 |
| `.com` domains checked | 252 |
| **AVAILABLE** | **228** |
| REGISTERED | 24 |
| UNKNOWN | 0 |
| DNS-vs-registry disagreements caught | 1 |

Skip reasons at generation:

| Reason | Count |
|---|---|
| skipped: too long | 44 |
| skipped: digits; skipped: too long | 5 |
| skipped: digits | 5 |

`.com.au` and `.au` were dropped from scope; 504 generated `.au` candidates remain in `05_emd_candidates_raw.json` marked `SKIPPED` and appear in neither CSV.

---

## 3. Top 25 available EMDs

Sorted by US monthly search volume of the exact keyword.

| # | Domain | Exact keyword | US vol/mo | Cluster |
|---|---|---|---|---|
| 1 | `howtobalancechemicalequations.com` | how to balance chemical equations | 22,200 | How to Balance Chemical Equations: Step-by-Step Guid |
| 2 | `polyatomicionslist.com` | polyatomic ions list | 18,100 | Polyatomic Ions Cheat Sheet - List & Memorization Ti |
| 3 | `apchemistryformulasheet.com` | ap chemistry formula sheet | 18,100 | AP Chemistry Cheat Sheet - Formula Sheet & Quick Ref |
| 4 | `quizperiodictable.com` | quiz periodic table | 6,600 | Periodic Table Game - Free Online Element Quiz |
| 5 | `namingioniccompounds.com` | naming ionic compounds | 6,600 | Naming Compounds Practice - Ionic & Covalent Naming |
| 6 | `quizabouttheperiodictable.com` | quiz about the periodic table | 6,600 | Periodic Table Game - Free Online Element Quiz |
| 7 | `ioniccompoundsexamples.com` | ionic compounds examples | 5,400 | Naming Compounds Practice - Ionic & Covalent Naming |
| 8 | `practicebalancingequations.com` | practice balancing equations | 5,400 | Balancing Chemical Equations Game - Free Online Prac |
| 9 | `balancingequationspractice.com` | balancing equations practice | 5,400 | Balancing Chemical Equations Practice - Worksheet &  |
| 10 | `practiceproblemsstoichiometry.com` | practice problems stoichiometry | 4,400 | Stoichiometry Practice Problems & Step-by-Step Solut |
| 11 | `practicestoichiometryproblems.com` | practice stoichiometry problems | 4,400 | Stoichiometry Practice Problems & Step-by-Step Solut |
| 12 | `stoichiometrypracticeproblems.com` | stoichiometry practice problems | 4,400 | Stoichiometry Practice Problems & Step-by-Step Solut |
| 13 | `lewisstructurepractice.com` | lewis structure practice | 3,600 | Bonding Practice Game - Lewis Structures & Chemical  |
| 14 | `practicelewisstructure.com` | practice lewis structure | 3,600 | Bonding Practice Game - Lewis Structures & Chemical  |
| 15 | `namingcovalentcompounds.com` | naming covalent compounds | 3,600 | Naming Compounds Practice - Ionic & Covalent Naming |
| 16 | `namingcompoundschemistry.com` | naming compounds chemistry | 3,600 | Naming Compounds Practice - Ionic & Covalent Naming |
| 17 | `ischemistryhard.com` | is chemistry hard | 2,400 | Chemistry Study Tips: How to Study Chemistry & Succe |
| 18 | `quizchemistry.com` | quiz chemistry | 1,900 | Chemistry Quiz - Free Online General Chemistry Game |
| 19 | `quizonchemistry.com` | quiz on chemistry | 1,900 | Chemistry Quiz - Free Online General Chemistry Game |
| 20 | `quizforchemistry.com` | quiz for chemistry | 1,900 | Chemistry Quiz - Free Online General Chemistry Game |
| 21 | `gamesinchemistry.com` | games in chemistry | 1,900 | Chemistry Games for High School - Free Online Learni |
| 22 | `quizaboutchemistry.com` | quiz about chemistry | 1,900 | Chemistry Quiz - Free Online General Chemistry Game |
| 23 | `gameswithchemistry.com` | games with chemistry | 1,900 | Chemistry Games for High School - Free Online Learni |
| 24 | `chemistrysciencequiz.com` | chemistry science quiz | 1,900 | Chemistry Quiz - Free Online General Chemistry Game |
| 25 | `namingpolyatomicions.com` | naming polyatomic ions | 1,600 | Naming Compounds Practice - Ionic & Covalent Naming |

---

## 4. Brandable shortlist

The volume-sorted list above optimises for one metric. This shortlist weighs exact-match value *against* how the name actually reads as a brand — favouring short labels, head terms, and the "game / quiz / chemistry" vocabulary the site is built around.

| # | Domain | US vol/mo | Label len | Why |
|---|---|---|---|---|
| 1 | `quizperiodictable.com` | 6,600 | 17 | Highest-volume available quiz EMD. `periodictablequiz.com` and `periodictablegame.com` are both taken, so this is the only free exact match on the site's flagship game topic. |
| 2 | `polyatomicionslist.com` | 18,100 | 18 | Highest-volume available EMD full stop, and it maps to a real cheat-sheet page. Reads like a reference resource rather than a spammy match. |
| 3 | `quizchemistry.com` | 1,900 | 13 | Shortest strong brandable — two head words, no filler. `chemistryquiz.com` is taken; the inversion is nearly as brandable and still an exact match. |
| 4 | `gamesinchemistry.com` | 1,900 | 16 | Closest available substitute for the taken `chemistrygames.com`. Head-term brandable, works as a whole-site name. |
| 5 | `chemistrycheatsheet.com` | 720 | 19 | The only one of the ten brand-level seeds still free. Broad enough to head a whole cheat-sheet section, and 'cheat sheet' is a high-intent chemistry query family. |
| 6 | `molesquiz.com` | 0* | 9 | 9-char label, instantly memorable, exact match for a real quiz page. *Zero recorded volume on the bare phrase, but the mole cluster carries traffic and the domain is genuinely brandable. |
| 7 | `ionsquiz.com` | 0* | 8 | Shortest available label in the entire set (8 chars). Same reasoning as molesquiz — buy for brand quality, not for the exact-match volume. |
| 8 | `acidbasegame.com` | 30 | 12 | Short, pronounceable, and 'game' signals the product. Both `acidsandbasesgame.com` and `acidsbasesgame.com` are also free if you want the longer literal match. |
| 9 | `bondingpractice.com` | 0* | 15 | Clean two-word label that generalises past one quiz — could front the whole bonding topic cluster. |
| 10 | `labsafetyquiz.com` | 0* | 13 | Short, unambiguous, and lab-safety quizzes are a well-defined evergreen search need in the school market. |

Entries marked `0*` have no recorded volume on the bare phrase — they are recommended on brandability and topical fit, with the exact match as a bonus rather than the reason.

---

## 5. What's already taken

All 24 registered domains, i.e. the exact matches you cannot have:

| Domain | Exact keyword | US vol/mo |
|---|---|---|
| `periodictable.com` | periodic table | 4,090,000 |
| `chemistryformulas.com` | chemistry formulas | 110,000 |
| `chemicalequationbalancer.com` | chemical equation balancer | 40,500 |
| `whatischemistry.com` | what is chemistry | 18,100 |
| `balancingequations.com` | balancing equations | 12,100 |
| `periodictablepdf.com` | periodic table pdf | 9,900 |
| `periodictablequiz.com` | periodic table quiz | 6,600 |
| `orgo.com` | orgo | 5,400 |
| `periodictablegame.com` | periodic table game | 2,900 |
| `chemistryquiz.com` | chemistry quiz | 1,900 |
| `chemistrygames.com` | chemistry games | 1,900 |
| `chemistryflashcards.com` | chemistry flashcards | 880 |
| `chemistryworksheets.com` | chemistry worksheets | 720 |
| `moleculegame.com` | molecule game | 260 |
| `periodictableguide.com` | periodic table guide | 0 |
| `organicchemistryguide.com` | organic chemistry guide | 0 |
| `chemistryquizzes.com` | chemistry quizzes | 0 |
| `cheatsheet.com` | cheat sheet | 0 |
| `chemistrypractice.com` | chemistry practice | 0 |
| `bondinggame.com` | bonding game | 0 |
| `periodictableproject.com` | periodic table project | 0 |
| `chemgames.com` | chem games | 0 |
| `chemistrygame.com` | chemistry game | 0 |
| `periodictablegames.com` | periodic table games | 0 |

**The pattern is unambiguous: every high-value head term is gone.** The top 3 keywords by volume — `periodic table` (4.09M), `chemistry formulas` (110K), `chemical equation balancer` (40.5K) — are all registered, as are `chemistryquiz.com`, `chemistrygames.com`, `chemistrygame.com`, `chemgames.com`, `periodictablegame.com`, `periodictablequiz.com` and `chemistrypractice.com`. Nine of the ten brand-level seeds are taken; only `chemistrycheatsheet.com` survives.

That is the expected outcome for a mature niche, and it carries a strategic implication: **there is no available EMD that would work as the site's primary brand domain.** The realistic uses for this list are (a) a secondary//microsite domain on a specific high-volume topic, or (b) defensive registration. A registered domain is not necessarily unavailable to *buy* — `periodictablequiz.com`, for instance, sits at Sav.com, a domain broker — but that is an acquisition negotiation, not a registration.

---

## 6. Validation performed

- Every one of the 252 candidates carries a final status; **zero UNKNOWN**, so no re-run with backoff was needed.
- RDAP and WHOIS agreed on 252/252 domains (100%).
- Independent spot-check of 3 AVAILABLE domains via a second WHOIS path (default IANA → registrar chain, distinct from the registry query used in the main run): `howtobalancechemicalequations.com`, `polyatomicionslist.com`, `quizperiodictable.com` — all three returned `No match for domain`.
- Independent spot-check of 3 REGISTERED domains: `balancingequations.com` (created 2002-01-20, GoDaddy), `whatischemistry.com` (created 2005-09-06, MarkMonitor), `periodictablequiz.com` (created 2017-10-25, Sav.com — its registrar WHOIS server was unresponsive, confirmed instead via registry WHOIS and RDAP 200).

---

## 7. Files

| File | Contents |
|---|---|
| `05_emd_candidates_raw.json` | All 810 records — every checked `.com`, every generation-skipped seed, every out-of-scope `.au` — with DNS / RDAP / WHOIS status and timestamps |
| `05_emd_available.csv` | The 228 AVAILABLE domains, volume-sorted — **the main deliverable** |
| `05_emd_all.csv` | All 252 checked `.com` candidates with final status, so registered ones stay visible |
| `05_emd_summary.md` | This document |

*Availability was true at the time of checking (2026-08-26). Domains turn over daily — re-verify at the registrar before purchase.*
