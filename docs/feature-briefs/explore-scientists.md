# Scientist of the Week: the curated pool

The 104-week pool for the Scientist of the Week section, plus 50 strong
candidates that did not make it and why. Companion to
[`explore.md`](./explore.md) (the brief) and
[`explore-agent-prompt.md`](./explore-agent-prompt.md).

**Status:** proposal for the owner's review. **Written:** 2026-09-19.

> **✎ marks a lead corrected on 2026-09-19** after `feature/explore-page-impl`
> checked all 104 against citable sources while writing the launch twenty.
> Eleven were wrong or overstated; every correction below is carried by a source
> on the shipped entry in `src/lib/explore/scientists.ts`. About one lead in ten
> did not survive, which is roughly what the verify-before-writing rule exists
> to catch — so the rule below still stands for the 84 not yet written.
>
> **This list is a curation proposal, not verified fact.** Names, dates,
> nationalities and attributions here come from general knowledge and are
> accurate to the best of my knowledge, but **every date and every claim must be
> checked against a citable source before the entry is written** — AC-9 requires
> a source URL and a `sourcesVerifiedOn` date on every entry anyway. Treat a
> date in this table as a lead, not as copy. Flag anything that turns out to be
> wrong here rather than fixing it silently, so the list stays trustworthy.

---

## 1. How the list was built

**Inclusion rule:** the work that earns the slot was done in the **20th or 21st
century**. Several people here were born in the 1860s–1880s; what matters is
when the chemistry happened, so Arrhenius (1903) and Ikeda (1908) are in and
Mendeleev (1869) is not.

**Not a prize list.** 34 of the 104 have no Nobel Prize. The bar is *did
interesting chemistry that a 14-year-old can be told about in 150 words*, and it
is deliberately set lower for the women — not as a concession, but because the
prize record is itself the bias being corrected: the Chemistry Nobel has gone to
women 8 times in 120 years, so using it as a filter would reproduce exactly the
distortion this section exists to undo. What is *not* relaxed is the chemistry:
every person here did real research and it is described accurately.

**52 women, 52 men** — above your 40% floor, and chosen that way so the strict
alternation in AC-7 works without a special case. If the pool is ever cut down,
the floor is 42 women (40% of 104) and the alternation rule relaxes to a
windowed one; say so explicitly rather than letting it drift.

**Grouped by theme, not by gender.** The grouping is the point: it makes visible
whether the women are clustered into biochemistry and the men spread across
everything, which is how these lists usually fail. Every theme here is 4–6
people and balanced within itself. The `Rep` column is scheduling metadata —
per AC-7 it is **never rendered**.

**International on purpose.** The site publishes in English, German, French,
Spanish and Italian, with Russian planned. Language areas represented: Germany
and Austria (9), France (7), Italy (5), Spain (2), Russia/USSR (4), plus Japan
(5), India (4), China (3), Australia (4), Canada (3), Hungary (3), Sweden (3),
Czechia (2), Denmark (2), Switzerland (3), Netherlands (1), Norway (1),
Poland (3), Egypt (1), Turkey (1), Israel (1), Ghana (1), Mauritius (1),
South Africa (1), Brazil (1), Mexico (1), Jordan (1), Ethiopia (1).

**Thin spots, stated rather than hidden:** Latin America (2), Korea (0),
sub-Saharan Africa (3), and no Indigenous scientist. Candidates for all four are
named in §5 and should go into the second cycle.

---

## 2. The link problem, and what it tells you

Your new requirement — *every card links to a game or cheat sheet, and the link
must match the content* — is the right rule, and applying it to the pool found
something useful: **the cheat-sheet library has a hole where atoms should be.**

| Marker | Meaning | Count |
|---|---|---|
| (no marker) | An existing cheat sheet or game genuinely matches. Ready to schedule. | 82 |
| ‡ | Links to `chemical-bonds` honestly but loosely; a dedicated polymers sheet would be better. Also ready. | 10 |
| † | The honest link is a cheat sheet **that does not exist yet**. Cannot be scheduled until it does. | 12 |

> **Correction to an earlier count.** The first version of this document said
> "76 ready, 28 blocked", which double-counted: the ten `‡` entries link to
> `chemical-bonds` honestly enough to ship, so they were never blocked. With
> analytical chemistry now dropped (below), the real numbers are **92 ready and
> 12 blocked**. `explore.md` §3 and AC-6 have been corrected to match.

The one missing sheet is **Atoms, isotopes & the periodic table**, which blocks
all 12 of theme A. The site has no content about atomic structure at all today,
which is a curriculum gap independent of this feature — Moseley's entire story
is *the table is ordered by atomic number, not by mass*, and there is nowhere on
the site to send a reader who wants to know what that means. See §7 for what
that sheet is, and how it differs from the pop-out periodic table tool.

**Analytical chemistry is out** (owner's decision, 2026-09-19). It is a later
year level and the site has no content for it, so a sheet would have to be
written before the scientists could be linked — and unlike atoms, it is not
something the current curriculum coverage is missing. The eight people in that
theme move to §5, where they are the obvious first group to bring back if an
analytical sheet is ever written. One of them does not leave: Darleane Hoffman's
work is nuclear chemistry rather than instrumentation, so she moves into theme A
where she always belonged.

**Pair the two sections.** Since both sections rotate on the same week, curate
the schedule as 104 **pairs**: the week's molecule and the week's scientist share
a theme and usually a link target. Week of caffeine pairs with a natural-products
chemist; week of ammonia pairs with Haber, or better, with Haber one cycle and
Johanna Döbereiner (biological nitrogen fixation) the next. This makes the page
cohere, makes the "match the content" rule easy to satisfy, and means one page
teaches one idea per week instead of two unrelated ones.

---

## 3. The 104

`Rep`: W = woman, M = man. Scheduling metadata only; never displayed.

### A. Atoms, isotopes and the periodic table — 6 W / 6 M †

*All twelve blocked until an atoms/isotopes cheat sheet exists. Worth writing:
this is the single richest theme in the pool, and the sheet is missing
curriculum content regardless (§7).*

| # | Name | Life | Base | The work | Rep | Links to |
|---|---|---|---|---|---|---|
| 1 | Marie Skłodowska-Curie | 1867–1934 | PL / FR | Isolated polonium and radium from tonnes of pitchblende; named radioactivity | W | † |
| 2 | Irène Joliot-Curie | 1897–1956 | FR | Made the first artificial radioactive isotopes by bombarding aluminium | W | † |
| 3 | Lise Meitner | 1878–1968 | AT / SE | Worked out that the nucleus had split, and why the mass was missing | W | † |
| 4 | Ida Noddack | 1896–1978 | DE | Co-discovered rhenium; first to suggest a nucleus could break in two (1934) | W | † |
| 5 | Marguerite Perey | 1909–1975 | FR | Discovered francium, the last element found in nature | W | † |
| 6 | Frederick Soddy | 1877–1956 | UK | Named isotopes: same element, different mass, same chemistry | M | † |
| 7 | Francis Aston | 1877–1945 | UK | Built the mass spectrograph and separated isotopes by weight | M | † |
| 8 | Henry Moseley | 1887–1915 | UK | Showed the periodic table is ordered by atomic number, not mass | M | † |
| 9 | Glenn Seaborg | 1912–1999 | US | Made plutonium and nine more elements; redrew the periodic table's bottom rows | M | † |
| 10 | Yuri Oganessian | b. 1933 | RU | Leads the synthesis of superheavy elements; element 118 carries his name | M | † |
| 11 | Darleane Hoffman | b. 1926 | US | Did chemistry on single atoms of elements that exist for seconds | W | † |
| 12 | Emilio Segrè | 1905–1989 | IT / US | Co-made technetium, the first element made rather than found | M | † |

### B. Bonding and structure — 5 W / 5 M

| # | Name | Life | Base | The work | Rep | Links to |
|---|---|---|---|---|---|---|
| 11 | Kathleen Lonsdale | 1903–1971 | IE / UK | Proved the benzene ring is flat and hexagonal — by solving **hexamethylbenzene**, not benzene ✎ | W | `chemical-bonds` |
| 12 | Dorothy Crowfoot Hodgkin | 1910–1994 | UK | Solved penicillin, vitamin B12 and insulin structures by X-ray crystallography | W | `chemical-bonds` |
| 13 | Rosalind Franklin | 1920–1958 | UK | X-ray diffraction of DNA, coal and virus structure; Photo 51 | W | `chemical-bonds` |
| 14 | Isabella Karle | 1921–2017 | US | Made direct methods work in practice — how structures are solved today | W | `lewis-structures` |
| 15 | Judith Howard | b. 1945 | UK | Variable-temperature and charge-density crystallography: seeing where electrons are | W | `lewis-structures` |
| 16 | Gilbert N. Lewis | 1875–1946 | US | The shared electron pair, the dot diagram, and a broader definition of acids | M | `lewis-structures` + game |
| 17 | Linus Pauling | 1901–1994 | US | Electronegativity, hybridisation, resonance — the language of the bond | M | `chemical-bonds` |
| 18 | Alfred Werner | 1866–1919 | FR / CH ✎ | Worked out how metal complexes are arranged in 3D, with no way to see them | M | `polyatomic-ions` |
| 19 | Harry Kroto | 1939–2016 | UK | Co-discovered C60: 60 carbons in a football, found while looking at stars | M | `chemical-bonds` |
| 20 | Peter Debye | 1884–1966 | NL / US | Dipole moments: measuring how unevenly a molecule shares its electrons | M | `chemical-bonds` |

### C. Acids, bases, solutions and electrochemistry — 5 W / 5 M

| # | Name | Life | Base | The work | Rep | Links to |
|---|---|---|---|---|---|---|
| 21 | Sossina Haile | b. 1966 | ET / US | Invented solid acid fuel cells — an acid that conducts protons as a solid | W | `acids-and-bases` |
| 22 | Lesley Yellowlees | b. 1953 | UK | Electrochemistry of metal complexes; solar energy conversion | W | `acids-and-bases` |
| 23 | Esther Takeuchi | b. 1953 | US | Designed the lithium battery that powers implantable defibrillators | W | `reaction-types` |
| 24 | Kathryn Hach-Darrow | 1922–2022 | US | Made water testing something any town could do, not just a lab | W | `acids-and-bases` + game |
| 25 | ~~Svante Arrhenius~~ **⚠ owner decision — see §8** | 1859–1927 | SE | Salts split into ions in water. Fails this document's own century rule, and there is a second question | M | `acid-classification` game |
| 26 | Johannes Brønsted | 1879–1947 | DK | Acids give protons away, bases take them — the definition schools still use | M | `acids-and-bases` |
| 27 | Søren Sørensen | 1868–1939 | DK | Invented the pH scale, in a brewery laboratory | M | `neutralise` game |
| 28 | George Olah | 1927–2017 | HU / US | Superacids: made carbocations stable enough to look at | M | `acids-and-bases` |
| 28a | Mary Lowe Good | 1931–2019 | US | Coordination and industrial inorganic chemistry, then science policy | W | `polyatomic-ions` |
| 28b | Akira Yoshino | b. 1948 | JP | Made the lithium-ion battery safe enough to sell | M | `reaction-types` |

### D. Reactions, mechanisms and catalysis — 6 W / 6 M

| # | Name | Life | Base | The work | Rep | Links to |
|---|---|---|---|---|---|---|
| 29 | Maud Menten | 1879–1960 | CA | Co-authored the equation that describes how fast an enzyme works | W | `stoichiometry` |
| 30 | Frances Arnold | b. 1956 | US | Directed evolution: breeding enzymes instead of designing them | W | `reaction-types` |
| 31 | Carolyn Bertozzi | b. 1966 | US | Bioorthogonal chemistry — reactions that run inside a living cell and ignore it | W | `reaction-types` |
| 32 | JoAnne Stubbe | b. 1946 | US | Showed an enzyme steers a free radical through a protein, atom by atom | W | `reaction-types` |
| 33 | Jacqueline Barton | b. 1952 | US | Found that the DNA double helix conducts charge along its base stack | W | `chemical-bonds` |
| 34 | María Josefa Molera | 1921–2011 | ES | Gas-phase kinetics and chromatography; built Spanish physical chemistry | W | `reaction-types` |
| 35 | Nikolay Semenov | 1896–1986 | RU | Branched chain reactions: why some reactions run away and explode | M | `reaction-types` |
| 36 | Ahmed Zewail | 1946–2016 | EG / US | Femtochemistry: filmed bonds breaking, at 10⁻¹⁵ s per frame | M | `reaction-types` |
| 37 | Kenichi Fukui | 1918–1998 | JP | Frontier orbitals: only the outermost electrons decide what reacts | M | `lewis-structures` |
| 38 | Gerhard Ertl | b. 1936 | DE | Showed, step by step, what actually happens on the catalyst in ammonia synthesis | M | `reaction-balancer` game |
| 39 | Paul Sabatier | 1854–1941 | FR | Hydrogenation over nickel (1897, with Senderens). **Not** the margarine step — that is Wilhelm Normann, 1901 ✎ | M | `reaction-types` |
| 40 | John Polanyi | b. 1929 | CA | Read the faint infrared glow of a reaction to see where the energy goes | M | `reaction-types` |

### E. Stoichiometry, thermochemistry and measurement — 4 W / 4 M

| # | Name | Life | Base | The work | Rep | Links to |
|---|---|---|---|---|---|---|
| 41 | Ellen Gleditsch | 1879–1968 | NO | Measured radium's half-life accurately enough to settle an argument | W | `stoichiometry` |
| 42 | Alicja Dorabialska | 1897–1975 | PL | Thermochemistry and the heat given off by radioactive decay | W | `stoichiometry` |
| 43 | Reatha Clark King | b. 1938 | US | Flame-calorimetry data for fluorine oxidisers the rocket programme was evaluating — they were never flown ✎ | W | `stoichiometry` |
| 44 | Mildred Cohn | 1913–2009 | US | Used isotopes and NMR to follow individual atoms through a reaction | W | `stoichiometry` |
| 45 | Fritz Pregl | 1869–1930 | AT / SI | Shrank analysis so a few milligrams was enough to work with | M | `stoichiometry` |
| 46 | Jean Perrin | 1870–1942 | FR | Nailed down Avogadro's number and settled whether atoms were real | M | `stoichiometry` |
| 47 | Theodor Svedberg | 1884–1971 | SE | The ultracentrifuge: spinning molecules fast enough to weigh them | M | `stoichiometry` |
| 48 | George de Hevesy | 1885–1966 | HU | Radioactive tracers — following a labelled atom through a body or a plant | M | `stoichiometry` |

### F. Organic chemistry and natural products — 7 W / 7 M

| # | Name | Life | Base | The work | Rep | Links to |
|---|---|---|---|---|---|---|
| 49 | Tu Youyou | b. 1930 | CN | Found artemisinin in sweet wormwood by reading a 1,600-year-old recipe properly | W | `functional-groups` |
| 50 | Asima Chatterjee | 1917–2006 | IN | Structures of plant alkaloids; antiepileptic and antimalarial compounds | W | `functional-groups` |
| 51 | Darshan Ranganathan | 1941–2001 | IN | Designed self-assembling peptides and molecules that imitate enzymes | W | `organic-nomenclature` |
| 52 | Ameenah Gurib-Fakim | b. 1959 | MU | Catalogued the chemistry of Mauritian medicinal plants nobody had analysed | W | `functional-groups` |
| 53 | Michiyo Tsujimura | 1888–1969 | JP | Isolated the catechins and vitamin C in green tea | W | `functional-groups` |
| 54 | Maria Bakunin | 1873–1960 | IT | Organic chemistry of oil shales and the Walden inversion; taught Naples for 50 years | W | `organic-nomenclature` |
| 55 | Vladimir Prelog | 1906–1998 | HR / CH | Co-wrote the CIP rules — how a molecule's handedness gets a name | M | `organic-nomenclature` |
| 56 | Victor Grignard | 1871–1935 | FR | The reagent that lets you bolt one carbon chain onto another | M | `functional-groups` |
| 57 | Robert Robinson | 1886–1975 | UK | Alkaloid structures, and the curly arrow that shows where electrons go | M | `organic-nomenclature` |
| 58 | Arthur Birch | 1915–1995 | AU | The Birch reduction; built organic chemistry research in Australia | M | `functional-groups` |
| 59 | Kikunae Ikeda | 1864–1936 | JP | Identified glutamate as the fifth taste and named it umami | M | `functional-groups` |
| 60 | Percy Julian | 1899–1975 | US | Made cortisone and hormones from soybeans, against everything in his way | M | `functional-groups` |
| 60a | Alice Ball | 1892–1916 | US | Turned chaulmoogra oil into injectable esters — the first leprosy treatment, at 23 | W | `functional-groups` |
| 60b | Ryoji Noyori | b. 1938 | JP | Catalysts that build one mirror image of a molecule and not the other | M | `organic-nomenclature` |

### G. Polymers and materials — 5 W / 5 M ‡

| # | Name | Life | Base | The work | Rep | Links to |
|---|---|---|---|---|---|---|
| 61 | Stephanie Kwolek | 1923–2014 | US | Kevlar — the cloudy solution was standard to discard, and she **refused** to ✎ | W | `chemical-bonds` ‡ |
| 62 | Ruth Benerito | 1916–2013 | US | Chemically cross-linked cotton so it stopped needing an iron | W | `functional-groups` ‡ |
| 63 | Patsy Sherman | 1930–2008 | US | Co-invented Scotchgard after a lab spill refused to wash out | W | `chemical-bonds` ‡ |
| 64 | Sumita Mitra | b. 1940s | IN / US | Put nanoparticles into dental filling material; it is in millions of mouths | W | `chemical-bonds` ‡ |
| 65 | Xie Yi | b. 1967 | CN | Two-dimensional inorganic solids and how their structure sets their properties | W | `chemical-bonds` ‡ |
| 66 | Hermann Staudinger | 1881–1965 | DE | Insisted polymers are genuinely long molecules, not clumps. He was right | M | `chemical-bonds` ‡ |
| 67 | Wallace Carothers | 1896–1937 | US | Nylon and neoprene — the first designed synthetic fibres | M | `functional-groups` ‡ |
| 68 | Giulio Natta | 1903–1979 | IT | Catalysts that build polypropylene chains in a regular order | M | `chemical-bonds` ‡ |
| 69 | Hideki Shirakawa | b. 1936 | JP | Plastic that conducts electricity, from a student's thousand-fold mistake | M | `chemical-bonds` ‡ |
| 70 | Otto Wichterle | 1913–1998 | CZ | Soft contact lenses, spun on apparatus built from a children's construction set | M | `chemical-bonds` ‡ |

### H. States of matter, surfaces and solids — 5 W / 5 M

| # | Name | Life | Base | The work | Rep | Links to |
|---|---|---|---|---|---|---|
| 71 | Katharine Blodgett | 1898–1979 | US | Films one molecule thick. "Invisible glass" is GE's 1938 marketing; that coating never shipped ✎ | W | `states-of-matter` |
| 72 | Mária Telkes | 1900–1995 | HU / US | Stored solar heat in salts that melt and freeze. The Dover Sun House failed in its third winter ✎ | W | `states-of-matter` |
| 73 | Geraldine Richmond | b. 1953 | US | Worked out what water molecules do at the surface, where they behave differently | W | `states-of-matter` |
| 74 | Edith Flanigen | b. 1929 | US | Zeolite Y and molecular sieves — solids with holes that sort molecules by size | W | `states-of-matter` |
| 75 | Lidia Morawska | b. 1952 | PL / AU | Showed how fine particles and aerosols really move through indoor air | W | `states-of-matter` |
| 76 | Irving Langmuir | 1881–1957 | US | Founded surface chemistry; adsorption, monolayers, the gas-filled lamp | M | `states-of-matter` |
| 77 | Dan Shechtman | b. 1941 | IL | Saw a crystal pattern that "could not exist" and held his ground for ten years | M | `states-of-matter` |
| 78 | Richard Robson | b. 1937 | UK / AU | At Melbourne, proposed building crystals like scaffolding — the first MOFs | M | `chemical-bonds` |
| 79 | Omar Yaghi | b. 1965 | JO / US | Reticular chemistry; frameworks that pull drinking water out of desert air | M | `chemical-bonds` |
| 80 | Thomas Mensah | b. 1950 | GH / US | Process chemistry that made optical fibre fast and cheap enough to lay everywhere | M | `states-of-matter` |

### J. Environmental and industrial chemistry — 4 W / 4 M

| # | Name | Life | Base | The work | Rep | Links to |
|---|---|---|---|---|---|---|
| 89 | Susan Solomon | b. 1956 | US | Supplied the **mechanism** for the ozone hole (Farman et al. found it) and led expeditions to **test** the rival hypotheses ✎ | W | `reaction-types` |
| 90 | Johanna Döbereiner | 1924–2000 | DE-speaking CZ / BR ✎ | Bacteria that fix nitrogen for crops — Brazilian soy takes its **nitrogen** from them, not its P and K ✎ | W | `balancing-equations` |
| 91 | Veena Sahajwalla | b. 1966 | IN / AU | "Green steel": feeding old tyres and e-waste into furnaces as a reagent | W | `reaction-types` |
| 92 | Karen Wetterhahn | 1948–1997 | US | Metal toxicology; her death from dimethylmercury rewrote laboratory glove standards | W | `reaction-types` |
| 93 | Fritz Haber | 1868–1934 | DE | Ammonia from air **and fossil hydrogen**; Bosch built the plant. Feeds half the world; he also directed gas warfare ✎ | M | `reaction-balancer` game |
| 94 | Mario Molina | 1943–2020 | MX | Showed CFCs from spray cans destroy ozone, and got them banned | M | `reaction-types` |
| 95 | Primo Levi | 1919–1987 | IT | Industrial chemist and Auschwitz survivor; wrote chemistry as a way of seeing | M | `naming-compounds` |
| 96 | Xu Guangxian | 1920–2015 | CN | Separation theory that made rare-earth elements — in every phone — affordable | M | `reaction-types` |

### K. Biochemistry and medicinal chemistry — 5 W / 5 M

| # | Name | Life | Base | The work | Rep | Links to |
|---|---|---|---|---|---|---|
| 97 | Gertrude Elion | 1918–1999 | US | Designed drugs from how the disease works, not by trial and error; no doctorate | W | `functional-groups` |
| 98 | Marie Maynard Daly | 1921–2003 | US | Linked cholesterol and diet to blocked arteries; first Black woman US chemistry PhD | W | `functional-groups` |
| 99 | Tebello Nyokong | b. 1951 | ZA | Dye molecules that kill tumours when you shine light on them | W | `chemical-bonds` |
| 100 | Margarita Salas | 1938–2019 | ES | The phi29 polymerase, which **amplifies** a speck of DNA. Sequencing is a separate step ✎ | W | `functional-groups` |
| 101 | Frederick Sanger | 1918–2013 | UK | Read the sequence of a protein, then of DNA. Two Nobels, one bench | M | `functional-groups` |
| 102 | Har Gobind Khorana | 1922–2011 | IN / US | Built nucleic acids chemically and cracked how codons are read | M | `functional-groups` |
| 103 | Aziz Sancar | b. 1946 | TR / US | Mapped how cells repair DNA damaged by sunlight | M | `functional-groups` |
| 104 | Albert Szent-Györgyi | 1893–1986 | HU | Isolated vitamin C — in quantity, from Hungarian paprika | M | `functional-groups` |
| 104a | Cecilia Hidalgo | b. 1942 | CL | How oxidation controls the channels that release calcium inside a cell | W | `functional-groups` |
| 104b | Luis Federico Leloir | 1906–1987 | AR | Found how cells activate sugars, on a shoestring in Buenos Aires | M | `functional-groups` |

---

## 4. Balance check

| Theme | W | M | Ready to schedule |
|---|---|---|---|
| A Atoms, isotopes, periodic table | 6 | 6 | no († the sheet does not exist yet) |
| B Bonding and structure | 5 | 5 | yes |
| C Acids, bases, electrochemistry | 5 | 5 | yes |
| D Reactions and catalysis | 6 | 6 | yes |
| E Stoichiometry and measurement | 4 | 4 | yes |
| F Organic and natural products | 7 | 7 | yes |
| G Polymers and materials | 5 | 5 | yes (‡ loose link) |
| H States of matter and solids | 5 | 5 | yes |
| J Environmental and industrial | 4 | 4 | yes |
| K Biochemistry and medicinal | 5 | 5 | yes |
| **Total** | **52** | **52** | **92 ready, 12 blocked** |

Dropping analytical chemistry took out four women and four men, so the balance
held without intervention; the six replacements were chosen in pairs, one woman
and one man into each of three themes, for the same reason. Two of the six
(Hidalgo, Leloir) are Latin American, which takes the pool's thinnest region
from two entries to four.

No theme is majority one gender. Women are not concentrated in biochemistry:
of the 52, 4 are in biochemistry and 48 are in physical, inorganic, organic,
analytical, materials and environmental chemistry.

**The framing check (AC-7).** Entries where injustice or denied credit is part
of the story: Meitner, Noddack, Franklin, Cremer, Daly, Julian, Bakunin. Six
women and one man — which is a real asymmetry, and the reason AC-7 caps the
credit-history field at ⌈n/4⌉ and requires every body to lead with the science.
Write Meitner's entry about how you notice a nucleus has split; the credit line
comes after, in its own field, in one sentence. If you cannot write the entry
that way, the person is in the pool for the wrong reason.

---

## 5. The 50 who did not make it

Excellent candidates, held back for a stated reason. Several are better than
some of the 104 on merit — the constraint is 104 slots, thematic balance, and
one idea per week. Most of these are the first choices for cycle 2.

### Ruled out by the century rule
| Name | Reason |
|---|---|
| Dmitri Mendeleev | Periodic table, 1869 — 19th century |
| Ellen Swallow Richards | Water-quality chemistry, 1880s–90s |
| Agnes Pockels | Surface-tension trough published 1891; a wonderful story, just too early |
| Emil Fischer | Sugars and esterification are 1880s–90s work, despite the 1902 Nobel |
| Adolf von Baeyer | Indigo synthesis, 1880s |

### Ruled out because someone else tells the same story better
| Name | Reason |
|---|---|
| Otto Hahn | Fission — Meitner explains it, and one week should not be spent on it twice |
| Thomas Lowry | Same acid-base definition as Brønsted, arrived at independently |
| Carl Bosch | Scaling ammonia is Haber's week; his own story is engineering |
| Paul Crutzen | Ozone chemistry is already Solomon and Molina |
| Karl Ziegler | The catalyst is Natta's week |
| Alan MacDiarmid | Conducting polymers is Shirakawa's week |
| Richard Synge | Partition chromatography is Martin's week |
| Robert Curl, Richard Smalley | Fullerenes is Kroto's week |
| Susumu Kitagawa | MOFs are already Robson and Yaghi |
| June Lindsey | Her base structures fed the DNA model; overlaps Franklin's week |
| Aaron Klug | Structural methods, overlaps Hodgkin and Franklin |

### Ruled out because the site has no content to link them to
*Owner's decision, 2026-09-19: analytical chemistry is a later year level and,
unlike atomic structure, is not a gap in what the site already teaches. These
eight are the first group to bring back if an analytical sheet is ever written —
they are a coherent theme, already balanced 4 / 4, and every one of them is
about how you know what is in something.*

| Name | Base | The work |
|---|---|---|
| Erika Cremer | DE / AT | Worked out gas chromatography and built the first instrument; published late, ignored longer |
| Carol Robinson | UK | Weighed intact protein machines in a mass spectrometer; returned to science after eight years away |
| Betty Wright Harris | US | Invented the field spot test that identifies TATB explosive safely |
| Alma Levant Hayden | US | Exposed a fake cancer drug by spectroscopy |
| Jaroslav Heyrovský | CZ | Polarography — identifying what is in a solution from a dropping mercury electrode |
| Archer Martin | UK | Partition chromatography: separating a mixture by how it divides between two phases |
| Arne Tiselius | SE | Electrophoresis — pulling proteins apart with an electric field |
| Richard Ernst | CH | Turned NMR into the tool that shows a molecule's skeleton |

### Ruled out as physics, biology or engineering rather than chemistry
| Name | Reason |
|---|---|
| Chien-Shiung Wu | Nuclear physics |
| Rachel Carson | Marine biologist; *Silent Spring* is about chemistry's consequences |
| Rita Levi-Montalcini | Neurobiology |
| Michelle Simmons | Quantum physics |
| Marietta Blau | Particle detection physics |
| Gertrude Neumark | Semiconductor physics |
| Ursula Franklin | Archaeometry and the social study of technology |
| Yvonne Brill | Propulsion engineering |
| Graeme Clark | Biomedical engineering |
| Inge Lehmann | Seismology |

### Ruled out on framing for a school audience
| Name | Reason |
|---|---|
| Albert Hofmann | LSD; not a framing this site should take on for 12–17 year olds |
| Valery Legasov | Chernobyl and his suicide; a serious story that needs more than 150 words |
| Gerhard Schrader | Nerve agents; the same problem without Haber's redeeming half |

### Strong, held for cycle 2 — the first names to add when the pool grows
| Name | Base | Why they are worth a week |
|---|---|---|
| Ada Yonath | IL | Crystallised the ribosome when everyone said it was impossible |
| Jennifer Doudna | US | CRISPR as chemistry: a programmable molecular scissor |
| Emmanuelle Charpentier | FR | The other half of CRISPR, and the RNA insight that started it |
| Florence Seibert | US | Purified tuberculin; made intravenous drips safe |
| Rachel Fuller Brown & Elizabeth Lee Hazen | US | Nystatin, discovered by post between two labs; royalties given away |
| Gerty Cori | CZ / US | Glycogen metabolism; needs a biochemistry sheet |
| Kamala Sohonie | IN | First Indian woman to get a science doctorate, after fighting for admission |
| Lina Stern | RU | Blood–brain barrier; survived a Soviet death sentence |
| Alejandra Bravo | MX | How Bt toxins actually kill an insect |
| Ana María Cetto | MX | Physical chemistry and science for development |
| Segenet Kelemu | ET | Molecular plant pathology across African agriculture |
| Kim Kimoon | KR | Cucurbituril containers — the Korea slot the list is missing |
| Clara Immerwahr | DE | First woman chemistry PhD at Breslau; the ethics of who chemistry serves |
| Margarete von Wrangell | DE | Phosphate uptake in plants; first woman full professor in Germany |
| Remziye Hisar | TR | Turkey's first woman chemist, trained in Marie Curie's Paris |
| Mary Engle Pennington | US | Made refrigerated food transport safe |
| Jean'ne Shreeve | US | Fluorine and energetic materials chemistry |
| Laura Kiessling | US | Why sugar–protein binding depends on how many, not how tight |
| Angela Belcher | US | Grows battery electrodes using engineered viruses |
| Molly Shoichet | CA | Polymer gels that deliver drugs into the eye and spinal cord |
| Osamu Shimomura | JP | Green fluorescent protein, from jellyfish collected by the thousand |
| Jean-Marie Lehn | FR | Supramolecular chemistry — chemistry beyond the molecule |
| Ben Feringa | NL | Molecular motors that actually turn |
| Ilya Prigogine | BE | Order out of chaos in systems far from equilibrium |
| Giacomo Ciamician | IT | Predicted solar chemistry in 1912 and told industry to prepare |
| Prafulla Chandra Ray | IN | Founded Indian chemical industry and research |
| C. N. R. Rao | IN | Six decades of solid-state and materials chemistry |
| Christopher Ingold | UK | SN1 and SN2 — needs a reaction-mechanisms cheat sheet first |
| Robert Burns Woodward | US | Total synthesis as architecture; also needs a mechanisms sheet |
| Roald Hoffmann | PL / US | Orbital symmetry rules; above this site's level, and he is also a poet |
| Peter Mitchell | UK | Chemiosmosis, funded from his own converted manor |
| Max Perutz | AT / UK | Haemoglobin, after twenty years on one structure |
| Nikolai Zelinsky | RU | Charcoal gas mask; needs an adsorption/surfaces sheet |
| Jan Czochralski | PL | The crystal-pulling method behind every silicon chip |
| Leopold Ružička | HR / CH | Terpenes and the chemistry of perfume |

---

## 6. What to do with this

1. **Owner review.** Cross off anyone you do not want; the runner-up list is
   ordered so replacements are easy.
2. **Pick the launch 12** from the 76 unmarked entries, alternating W/M, and
   pair each with that week's molecule (§2).
3. **Verify before writing.** Every date, nationality and claim gets a citable
   source; `sourcesVerifiedOn` records when.
4. **Then translate**, against `docs/i18n/glossary-<locale>.md`, adding any new
   term to the glossary first.
5. **Decide on the atoms cheat sheet.** It unlocks the 12 entries in theme A and
   closes a real gap in the reference library — see §7.

---

## 7. The periodic table: a cheat sheet *and* a pop-out tool

You asked whether the periodic table should be a cheat sheet or something a
player can pop out inside a game. **Both, and they are not alternatives — they
answer different questions and only one of them unblocks these scientists.**

| | Cheat sheet: *Atoms, isotopes & the periodic table* | Pop-out tool: interactive periodic table |
|---|---|---|
| Answers | *Why* is chlorine there? What is an isotope? Why does the table have these shapes? | *What* is chlorine's symbol and mass, right now, while I am mid-question |
| Shape | Prose, tables and worked examples, like the other twelve sheets | A grid, a search box, a detail panel. No prose to read |
| Read when | Revising, away from a game | Mid-task, inside a game, under time pressure |
| Cost | A sheet's worth of writing × 5 locales, on the pattern that already exists | A component, per-game integration, a real design problem at 360px |
| Unblocks theme A | **Yes** | No |

**The scientists need the sheet, not the tool.** A card about Moseley links to
"the table is ordered by atomic number"; sending that reader to a lookup grid
answers a question they did not ask. So if only one gets built, build the sheet:
it is the cheaper of the two, it uses a pattern the repo already has, it unblocks
12 entries, and it fills a gap that exists whether or not Explore ships — there
is currently no atomic-structure content on the site at all, under any heading.

**But the tool has a case of its own, and it is a stronger one than I expected.**
`seo/KEYWORDS.md` already lists "Interactive Periodic Table — Explore Elements"
at `/games/interactive-periodic-table` as a **P1** page at **110,000** monthly
searches — the highest-volume keyword in that file. That is not a reason to bolt
it into the games; it is a reason to treat it as its own page with its own URL,
which a pop-out can then reuse.

If it is built, three things are worth deciding up front:

- **Global, not per-game.** One component, opened from the game footer beside
  Settings and Instructions, reusing the `pausedByModalRef` pattern so opening it
  cannot un-pause a paused game. Reading a reference must never cost points or
  lives — `AGENT_INSTRUCTIONS.md` Part A is explicit about that.
- **It reads `ELEMENTS_REGISTRY`,** not a second copy of the element data, and
  takes its names from `src/i18n/chemistry-names/<locale>.ts` so it is
  multilingual on the day it ships. Symbols and masses are never translated.
- **360px is the hard part.** 118 cells do not fit a phone; a table that needs
  pinch-zoom fails 1.4.10 the same way the header did. Decide the phone layout
  (a searchable list that falls back from the grid is the usual answer) before
  the desktop grid, not after.

**Recommendation:** the sheet now, as part of unblocking theme A; the tool as its
own piece of work, scoped from the SEO case rather than from Explore.

---

## 8. Arrhenius — decided 2026-09-19: **left out**

> **Owner's decision, 2026-09-19: leave him out for now.** Option 1 below. The
> century rule settles it on its own and needs no argument about the man, which
> is the narrowest ground available and the reason it was the recommendation.
> Entry 25 stays struck through in §3 and is not a candidate for cycle 2 unless
> this decision is revisited here.

Entry 25 is struck through in §3 but **not removed**, because half of the case
against him was a judgement that belonged to the owner rather than to whoever
was writing entries. It is recorded here so nobody re-adds him by accident.

**The factual half is settled.** §1 of this document admits a scientist on the
rule that *the work* is 20th or 21st century, and justifies Arrhenius by his
1903 Nobel. But the electrolytic-dissociation work is his 1884 dissertation and
the greenhouse calculation is 1896. The prize is 20th century; the work is not.
By this document's own rule he does not qualify — the same rule that keeps
Mendeleev, Agnes Pockels and Emil Fischer out.

**The second half is yours.** Arrhenius was a leading member of the Swedish
Society for Race Hygiene, which campaigned for the state race-biology institute
founded in 1921 (Saura, *Hereditas*, 2020). A 150-word card for fourteen-year-olds
cannot carry that in a clause, and a page whose subject is *who gets remembered*
cannot leave it out either. That is a decision about what this section is for,
and it should be made once, deliberately, rather than settled by whoever happens
to write the entry.

**What was done, pending that decision:** he was left out of the launch twenty
and **Dan Shechtman** took the slot, paired with sodium chloride — a crystal
whose pattern repeats against one that never does, which is a better pairing
than the one it replaced. Nothing is lost if he comes back; nothing breaks if he
goes.

**The three ways it could have been settled**, in the order I would consider
them — kept because the reasoning is what makes the decision re-examinable:

1. **Leave him out** and say so here in a line. The century rule alone is
   sufficient and needs no argument about the man.
2. **Keep him, with the whole story**, as a deliberate exception to the century
   rule — the section then has to be willing to write that kind of entry, and
   that should be a stated policy, not a one-off.
3. **Keep him on the century rule alone** and say nothing about the rest. This
   is the option I would not take: it is the one that requires the page to know
   something and not say it.

Option 1 was chosen. An unmarked name in a curated pool is an invitation to
re-add him by accident in cycle 2, which is why the strike-through and this
section both stay.

### A pairing correction, while here

§2 suggests pairing a molecule with a thematically matching scientist. One such
pairing in the launch set had to be rewritten rather than dropped: **limonene**
is usually taught as the textbook enantiomer demonstration — orange smells of
one mirror image, lemon of the other. **That contrast is wrong.** Orange and
lemon oil both contain (R)-(+)-limonene at over 99.9% (Kvittingen et al.,
*J. Chem. Educ.* 2021). The card now teaches the correction instead of the myth,
which is a better card. Worth knowing before anyone writes the obvious version
of it again.
